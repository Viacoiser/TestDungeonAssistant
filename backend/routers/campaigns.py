"""
Router para gestión de campañas
"""

from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from pydantic import BaseModel
from middleware.auth import get_current_user
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


class CampaignCreate(BaseModel):
    name: str
    description: str = None


class CampaignResponse(BaseModel):
    id: str
    name: str
    description: str = None
    is_active: bool


def get_supabase():
    """Obtener instancia de Supabase (lazy loading)"""
    from services.supabase import SupabaseClient
    return SupabaseClient()


@router.post("", response_model=CampaignResponse)
async def create_campaign(data: CampaignCreate, current_user: dict = Depends(get_current_user)):
    """Crear nueva campaña"""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]
        
        # Crear campaña en Supabase
        campaign_data = {
            "name": data.name,
            "description": data.description,
            "is_active": True
        }
        
        response = supabase.client.table("campaigns").insert(campaign_data).execute()
        campaign = response.data[0] if response.data else None
        
        if not campaign:
            raise HTTPException(status_code=500, detail="Error creando campaña")
        
        # Agregar usuario como GM de la campaña
        member_data = {
            "campaign_id": campaign["id"],
            "user_id": user_id,
            "role": "GM",
            "status": "ACTIVE"
        }
        
        supabase.client.table("campaign_members").insert(member_data).execute()
        
        logger.info(f"✅ Campaña creada: {campaign['id']} por {user_id}")
        
        return {
            "id": campaign["id"],
            "name": campaign["name"],
            "description": campaign["description"],
            "is_active": campaign["is_active"]
        }
        
    except Exception as e:
        logger.error(f"❌ Error creando campaña: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
async def list_campaigns(current_user: dict = Depends(get_current_user)):
    """Listar campañas del usuario via join directo"""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]

        # Obtener membresías del usuario con datos de campaña
        response = supabase.client.table("campaign_members") \
            .select("role, campaigns(id, name, description, is_active, created_at)") \
            .eq("user_id", user_id) \
            .eq("status", "ACTIVE") \
            .execute()

        # Aplanar la respuesta: { role, campaigns: {...} } → { ...campaign, user_role }
        campaigns = []
        for item in (response.data or []):
            campaign_data = item.get("campaigns")
            if campaign_data:
                campaigns.append({
                    **campaign_data,
                    "user_role": item.get("role", "PLAYER")
                })

        return campaigns

    except Exception as e:
        logger.error(f"❌ Error listando campañas: {str(e)}")
        return []


@router.get("/{campaign_id}")
async def get_campaign(campaign_id: str, current_user: dict = Depends(get_current_user)):
    """Obtener detalle de campaña"""
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


@router.post("/{campaign_id}/join")
async def join_campaign(campaign_id: str, role: str):
    """Unirse a una campaña"""
    # TODO: Implementar join
    return {"message": "Te uniste a la campaña", "role": role}


@router.get("/{campaign_id}/members")
async def get_campaign_members(campaign_id: str):
    """Listar miembros de campaña"""
    # TODO: Implementar listado de miembros
    return []


@router.post("/{campaign_id}/role-requests")
async def request_role_change(campaign_id: str, requested_role: str):
    """Solicitar cambio de rol"""
    # TODO: Implementar solicitud
    return {"message": "Solicitud enviada"}


@router.get("/{campaign_id}/role-requests")
async def get_role_requests(campaign_id: str):
    """Listar solicitudes de cambio de rol (solo GM)"""
    # TODO: Implementar listado
    return {"requests": []}


@router.patch("/{campaign_id}/role-requests/{req_id}")
async def approve_role_request(campaign_id: str, req_id: str, approved: bool):
    """Aprobar o rechazar cambio de rol"""
    # TODO: Implementar aprobación
    return {"message": "Solicitud procesada", "approved": approved}


class NpcGenerateRequest(BaseModel):
    prompt: str


@router.post("/{campaign_id}/npcs")
async def generate_npc(
    campaign_id: str,
    data: NpcGenerateRequest,
    current_user: dict = Depends(get_current_user)
):
    """Generar NPC con IA y guardarlo en BD"""
    try:
        supabase = get_supabase()
        from services.gemini import GeminiService
        gemini = GeminiService()

        # Obtener contexto de la campaña para el NPC
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

        # Generar NPC con Gemini
        npc_data = await gemini.generate_npc(context, data.prompt)

        # Guardar en BD
        insert_result = supabase.client.table("npcs").insert({
            "campaign_id": campaign_id,
            "name": npc_data.get("name", "NPC"),
            "race": npc_data.get("race", ""),
            "personality": npc_data.get("personality", ""),
            "secrets": npc_data.get("secrets", ""),
            "relationship_to_party": npc_data.get("relationship_to_party", "neutral"),
            "stats": npc_data.get("stats", {}),
            "is_alive": True,
            "generated_by_ai": True
        }).execute()

        saved_npc = insert_result.data[0] if insert_result.data else npc_data
        logger.info(f"✅ NPC generado y guardado: {npc_data.get('name')}")
        return saved_npc

    except Exception as e:
        logger.error(f"❌ Error generando NPC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{campaign_id}/npcs")
async def list_npcs(campaign_id: str, current_user: dict = Depends(get_current_user)):
    """Listar NPCs de campaña"""
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
