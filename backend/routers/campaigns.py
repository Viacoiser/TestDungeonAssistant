"""
Router para gestión de campañas
"""

import logging
import random
import string

from fastapi import APIRouter, HTTPException, status, Depends
from typing import List, Optional
from pydantic import BaseModel
from middleware.auth import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def generate_invite_code(length: int = 8) -> str:
    """Genera un código de invitación alfanumérico único (en mayúsculas)."""
    chars = string.ascii_uppercase + string.digits
    return "".join(random.choices(chars, k=length))


def get_supabase():
    """Obtener instancia de Supabase (lazy loading)"""
    from services.supabase import SupabaseClient
    return SupabaseClient()


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class CampaignCreate(BaseModel):
    name: str
    description: str = None


class CampaignUpdate(BaseModel):
    name: str = None
    description: str = None
    lore_summary: str = None


class CampaignResponse(BaseModel):
    id: str
    name: str
    description: str = None
    is_active: bool
    invite_code: str = None


class JoinCampaignRequest(BaseModel):
    invite_code: str


class NpcGenerateRequest(BaseModel):
    prompt: str


class NpcUpdate(BaseModel):
    name: str = None
    race: str = None
    personality: str = None
    secrets: str = None
    relationship_to_party: str = None
    stats: dict = None
    is_alive: bool = None


# ---------------------------------------------------------------------------
# Endpoints - Campañas
# ---------------------------------------------------------------------------

@router.post("", response_model=CampaignResponse)
async def create_campaign(data: CampaignCreate, current_user: dict = Depends(get_current_user)):
    """Crear nueva campaña. El creador queda asignado como GM automáticamente."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Generar invite_code único
        invite_code = generate_invite_code()
        # Intentar regenerar si ya existe (colisión muy improbable)
        for _ in range(5):
            check = supabase.client.table("campaigns") \
                .select("id") \
                .eq("invite_code", invite_code) \
                .execute()
            if not check.data:
                break
            invite_code = generate_invite_code()

        # Crear campaña
        campaign_data = {
            "name": data.name,
            "description": data.description,
            "invite_code": invite_code,
            "is_active": True
        }

        response = supabase.client.table("campaigns").insert(campaign_data).execute()
        campaign = response.data[0] if response.data else None

        if not campaign:
            raise HTTPException(status_code=500, detail="Error creando campaña")

        # Agregar usuario como GM
        member_data = {
            "campaign_id": campaign["id"],
            "user_id": user_id,
            "role": "GM",
            "status": "ACTIVE"
        }
        supabase.client.table("campaign_members").insert(member_data).execute()

        logger.info(f"✅ Campaña creada: {campaign['id']} (código: {invite_code}) por {user_id}")

        return {
            "id": campaign["id"],
            "name": campaign["name"],
            "description": campaign["description"],
            "is_active": campaign["is_active"],
            "invite_code": campaign["invite_code"]
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error creando campaña: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
async def list_campaigns(current_user: dict = Depends(get_current_user)):
    """Listar campañas del usuario con su rol en cada una."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        response = supabase.client.table("campaign_members") \
            .select("role, campaigns(id, name, description, is_active, invite_code, created_at)") \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        campaigns = []
        for item in (response.data or []):
            campaign_data = item.get("campaigns")
            if campaign_data:
                user_role = item.get("role", "PLAYER")
                entry = {
                    **campaign_data,
                    "user_role": user_role,
                }
                # Solo exponer invite_code si el usuario es GM
                if user_role != "GM":
                    entry.pop("invite_code", None)
                campaigns.append(entry)

        return campaigns

    except Exception as e:
        logger.error(f"❌ Error listando campañas: {str(e)}")
        return []


@router.post("/join")
async def join_campaign_by_code(
    data: JoinCampaignRequest,
    current_user: dict = Depends(get_current_user)
):
    """Unirse a una campaña mediante código de invitación (como PLAYER)."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]
        invite_code = data.invite_code.strip().upper()

        # Buscar campaña por código
        camp_result = supabase.client.table("campaigns") \
            .select("id, name, is_active") \
            .eq("invite_code", invite_code) \
            .execute()

        if not camp_result.data:
            raise HTTPException(
                status_code=404,
                detail="Código de invitación inválido. Verifica el código e intenta de nuevo."
            )

        campaign = camp_result.data[0]

        if not campaign.get("is_active"):
            raise HTTPException(status_code=400, detail="Esta campaña no está activa.")

        # Verificar si el usuario ya es miembro
        member_check = supabase.client.table("campaign_members") \
            .select("id, role") \
            .eq("campaign_id", campaign["id"]) \
            .eq("user_id", user_id) \
            .execute()

        if member_check.data:
            existing_role = member_check.data[0].get("role", "PLAYER")
            raise HTTPException(
                status_code=409,
                detail=f"Ya eres miembro de esta campaña con el rol {existing_role}."
            )

        # Agregar como PLAYER
        supabase.client.table("campaign_members").insert({
            "campaign_id": campaign["id"],
            "user_id": user_id,
            "role": "PLAYER",
            "status": "ACTIVE"
        }).execute()

        logger.info(f"✅ Usuario {user_id} se unió a campaña {campaign['id']} como PLAYER")

        return {
            "message": f"Te uniste a la campaña '{campaign['name']}' correctamente.",
            "campaign_id": campaign["id"],
            "campaign_name": campaign["name"],
            "role": "PLAYER"
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error uniéndose a campaña: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{campaign_id}")
async def get_campaign(campaign_id: str, current_user: dict = Depends(get_current_user)):
    """Obtener detalle de campaña."""
    try:
        supabase = get_supabase()
        result = supabase.client.table("campaigns") \
            .select("*") \
            .eq("id", campaign_id) \
            .single() \
            .execute()
        return result.data
    except Exception as e:
        logger.error(f"❌ Error obteniendo campaña: {e}")
        raise HTTPException(status_code=404, detail="Campaña no encontrada")


@router.post("/{campaign_id}/regenerate-code")
async def regenerate_invite_code(
    campaign_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Regenerar el código de invitación de la campaña (solo GM)."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Verificar que sea GM
        member = supabase.client.table("campaign_members") \
            .select("role") \
            .eq("campaign_id", campaign_id) \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        if not member.data or member.data[0].get("role") != "GM":
            raise HTTPException(status_code=403, detail="Solo el GM puede regenerar el código.")

        # Generar nuevo código único
        new_code = generate_invite_code()
        for _ in range(5):
            check = supabase.client.table("campaigns") \
                .select("id") \
                .eq("invite_code", new_code) \
                .execute()
            if not check.data:
                break
            new_code = generate_invite_code()

        result = supabase.client.table("campaigns") \
            .update({"invite_code": new_code}) \
            .eq("id", campaign_id) \
            .execute()

        updated = result.data[0] if result.data else {}
        logger.info(f"🔄 Código regenerado para campaña {campaign_id}: {new_code}")

        return {"invite_code": new_code, "campaign_id": campaign_id}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error regenerando código: {e}")
        raise HTTPException(status_code=500, detail=str(e))



@router.patch("/{campaign_id}")
async def update_campaign(
    campaign_id: str,
    data: CampaignUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Actualizar campaña (solo GM)."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Verificar que sea GM
        member = supabase.client.table("campaign_members") \
            .select("role") \
            .eq("campaign_id", campaign_id) \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        if not member.data or member.data[0].get("role") != "GM":
            raise HTTPException(status_code=403, detail="Solo el GM puede actualizar la campaña.")

        update_data = {}
        if data.name is not None:
            update_data["name"] = data.name
        if data.description is not None:
            update_data["description"] = data.description
        if data.lore_summary is not None:
            update_data["lore_summary"] = data.lore_summary

        if not update_data:
            return {"message": "Sin cambios"}

        result = supabase.client.table("campaigns") \
            .update(update_data) \
            .eq("id", campaign_id) \
            .execute()

        return result.data[0] if result.data else {}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error actualizando campaña: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{campaign_id}")
async def delete_campaign(
    campaign_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Eliminar campaña (solo GM)."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Verificar que sea GM
        member = supabase.client.table("campaign_members") \
            .select("role") \
            .eq("campaign_id", campaign_id) \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        if not member.data or member.data[0].get("role") != "GM":
            raise HTTPException(status_code=403, detail="Solo el GM puede eliminar la campaña.")

        supabase.client.table("campaigns") \
            .delete() \
            .eq("id", campaign_id) \
            .execute()

        return {"message": "Campaña eliminada"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error eliminando campaña: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{campaign_id}/members")
async def get_campaign_members(
    campaign_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Listar miembros de la campaña con sus roles."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Verificar que el usuario sea miembro
        own_membership = supabase.client.table("campaign_members") \
            .select("role") \
            .eq("campaign_id", campaign_id) \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        if not own_membership.data:
            raise HTTPException(status_code=403, detail="No eres miembro de esta campaña.")

        user_role = own_membership.data[0].get("role", "PLAYER")

        # Obtener todos los miembros con datos de usuario
        members_result = supabase.client.table("campaign_members") \
            .select("role, status, joined_at, users(id, username, email)") \
            .eq("campaign_id", campaign_id) \
            .eq("status", "ACTIVE") \
            .execute()

        members = []
        for m in (members_result.data or []):
            user_data = m.get("users") or {}
            members.append({
                "user_id": user_data.get("id"),
                "username": user_data.get("username"),
                "email": user_data.get("email"),
                "role": m.get("role"),
                "joined_at": m.get("joined_at"),
            })

        return {
            "campaign_id": campaign_id,
            "user_role": user_role,
            "members": members
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error obteniendo miembros: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------------------------
# Endpoints - NPCs
# ---------------------------------------------------------------------------

@router.post("/{campaign_id}/npcs")
async def generate_npc(
    campaign_id: str,
    data: NpcGenerateRequest,
    current_user: dict = Depends(get_current_user)
):
    """Generar NPC con IA y guardarlo en BD (solo GM)."""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Verificar rol GM
        member = supabase.client.table("campaign_members") \
            .select("role") \
            .eq("campaign_id", campaign_id) \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        if not member.data or member.data[0].get("role") != "GM":
            raise HTTPException(status_code=403, detail="Solo el GM puede generar NPCs.")

        from services.gemini import GeminiService
        gemini = GeminiService()

        campaign_result = supabase.client.table("campaigns") \
            .select("name, lore_summary") \
            .eq("id", campaign_id) \
            .single() \
            .execute()
        campaign = campaign_result.data or {}

        npcs_result = supabase.client.table("npcs") \
            .select("name") \
            .eq("campaign_id", campaign_id) \
            .execute()

        context = {
            "campaign_name": campaign.get("name", ""),
            "lore_summary": campaign.get("lore_summary", ""),
            "npcs": npcs_result.data or []
        }

        npc_data = await gemini.generate_npc(context, data.prompt)

        stats = npc_data.get("stats") or {}
        stats["_prompt"] = data.prompt

        skills = npc_data.get("skills")
        if skills:
            stats["Habilidades"] = skills

        insert_result = supabase.client.table("npcs").insert({
            "campaign_id": campaign_id,
            "name": npc_data.get("name", "NPC"),
            "race": npc_data.get("race", ""),
            "personality": npc_data.get("personality", ""),
            "secrets": npc_data.get("secrets", ""),
            "relationship_to_party": npc_data.get("relationship_to_party", "neutral"),
            "stats": stats,
            "is_alive": True,
            "generated_by_ai": True
        }).execute()

        if not insert_result.data:
            fallback_res = supabase.client.table("npcs").select("*") \
                .eq("campaign_id", campaign_id) \
                .order("created_at", desc=True) \
                .limit(1) \
                .execute()
            saved_npc = fallback_res.data[0] if fallback_res.data else npc_data
        else:
            saved_npc = insert_result.data[0]

        logger.info(f"✅ NPC generado: {saved_npc.get('name')} ID: {saved_npc.get('id')}")
        return saved_npc

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error generando NPC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{campaign_id}/npcs")
async def list_npcs(campaign_id: str, current_user: dict = Depends(get_current_user)):
    """Listar NPCs de campaña."""
    try:
        supabase = get_supabase()
        result = supabase.client.table("npcs") \
            .select("*") \
            .eq("campaign_id", campaign_id) \
            .order("created_at", desc=False) \
            .execute()
        return result.data or []
    except Exception as e:
        logger.error(f"❌ Error listando NPCs: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{campaign_id}/npcs/{npc_id}")
async def update_npc(
    campaign_id: str,
    npc_id: str,
    data: NpcUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Actualizar campos de un NPC (solo GM)."""
    try:
        supabase = get_supabase()
        update_data = {k: v for k, v in data.dict(exclude_unset=True).items() if v is not None}

        if not update_data:
            return {"message": "Sin cambios"}

        result = supabase.client.table("npcs").update(update_data).eq("id", npc_id).execute()
        return result.data[0] if result.data else {}
    except Exception as e:
        logger.error(f"❌ Error actualizando NPC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{campaign_id}/npcs/{npc_id}")
async def delete_npc(
    campaign_id: str,
    npc_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Eliminar NPC (solo GM)."""
    try:
        supabase = get_supabase()
        supabase.client.table("npcs").delete().eq("id", npc_id).execute()
        return {"message": "NPC eliminado"}
    except Exception as e:
        logger.error(f"❌ Error eliminando NPC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{campaign_id}/npcs/{npc_id}/trait")
async def generate_npc_trait_endpoint(
    campaign_id: str,
    npc_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Generar rasgo distintivo para NPC (solo GM)."""
    try:
        supabase = get_supabase()
        npc_result = supabase.client.table("npcs").select("*").eq("id", npc_id).single().execute()
        npc = npc_result.data
        if not npc:
            raise HTTPException(status_code=404, detail="NPC no encontrado")

        context_str = f"Nombre: {npc.get('name')}, Raza: {npc.get('race')}, Personalidad: {npc.get('personality')}, Secretos: {npc.get('secrets')}"

        from services.gemini import GeminiService
        gemini = GeminiService()
        trait = await gemini.generate_npc_trait(context_str)

        old_personality = npc.get('personality') or ""
        new_personality = f"{old_personality}\n[Rasgo] {trait}".strip()

        supabase.client.table("npcs").update({"personality": new_personality}).eq("id", npc_id).execute()

        npc["personality"] = new_personality
        return {"trait": trait, "npc": npc}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error generando rasgo NPC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------------------------
# Endpoints - Facciones (placeholder)
# ---------------------------------------------------------------------------

@router.post("/{campaign_id}/factions")
async def create_faction(campaign_id: str, name: str, description: str = None):
    """Crear facción"""
    # TODO: Implementar creación
    return {"message": "Facción creada", "name": name}


@router.get("/{campaign_id}/factions")
async def list_factions(campaign_id: str):
    """Listar facciones de campaña"""
    # TODO: Implementar listado
    return {"factions": []}
