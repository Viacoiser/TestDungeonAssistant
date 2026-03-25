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
    """Listar campañas del usuario"""
    try:
        supabase = get_supabase()
        user_id = current_user["id"]
        
        # Obtener campañas donde el usuario es miembro
        response = supabase.client.rpc(
            "get_user_campaigns",
            {"user_id_param": user_id}
        ).execute()
        
        campaigns = response.data if response.data else []
        return campaigns
        
    except Exception as e:
        logger.error(f"❌ Error listando campañas: {str(e)}")
        # Si la función RPC no existe, devolver array vacío
        return []


@router.get("/{campaign_id}")
async def get_campaign(campaign_id: str):
    """Obtener detalle de campaña"""
    # TODO: Implementar detalle
    return {"campaign_id": campaign_id}


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


@router.post("/{campaign_id}/npcs")
async def generate_npc(campaign_id: str, prompt: str):
    """Generar NPC con IA"""
    # TODO: Implementar generación con Gemini
    return {"message": "NPC generado"}


@router.get("/{campaign_id}/npcs")
async def list_npcs(campaign_id: str):
    """Listar NPCs de campaña"""
    # TODO: Implementar listado
    return {"npcs": []}


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
