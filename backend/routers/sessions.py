"""
Router para sesiones de juego
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from middleware.auth import get_current_user
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/sessions", tags=["sessions"])


def get_supabase():
    from services.supabase import SupabaseClient
    return SupabaseClient()


def get_gemini():
    from services.gemini import GeminiService
    return GeminiService()


class SessionCreate(BaseModel):
    campaign_id: str
    session_number: int
    title: str = None


class NoteCreate(BaseModel):
    content: str


# ============================================================================
# Crear sesión
# ============================================================================

@router.post("")
async def create_session(
    data: SessionCreate,
    current_user: dict = Depends(get_current_user)
):
    """Crear nueva sesión para una campaña"""
    try:
        supabase = get_supabase()

        result = supabase.client.table("sessions").insert({
            "campaign_id": data.campaign_id,
            "session_number": data.session_number,
            "title": data.title,
            "is_active": False
        }).execute()

        session = result.data[0] if result.data else None
        if not session:
            raise HTTPException(status_code=500, detail="Error creando sesión")

        logger.info(f"✅ Sesión {data.session_number} creada para campaña {data.campaign_id}")
        return session

    except Exception as e:
        logger.error(f"❌ Error creando sesión: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Listar sesiones de una campaña
# ============================================================================

@router.get("/campaign/{campaign_id}")
async def list_sessions(
    campaign_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Listar sesiones de una campaña"""
    try:
        supabase = get_supabase()
        result = supabase.client.table("sessions") \
            .select("*") \
            .eq("campaign_id", campaign_id) \
            .order("session_number", desc=False) \
            .execute()

        return result.data or []

    except Exception as e:
        logger.error(f"❌ Error listando sesiones: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Iniciar sesión
# ============================================================================

@router.post("/{session_id}/start")
async def start_session(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Iniciar sesión (marcarla como activa)"""
    try:
        supabase = get_supabase()
        from datetime import datetime, timezone

        supabase.client.table("sessions").update({
            "is_active": True,
            "started_at": datetime.now(timezone.utc).isoformat()
        }).eq("id", session_id).execute()

        logger.info(f"✅ Sesión {session_id} iniciada")
        return {"message": "Sesión iniciada", "session_id": session_id}

    except Exception as e:
        logger.error(f"❌ Error iniciando sesión: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Terminar sesión + generar resumen con IA
# ============================================================================

@router.post("/{session_id}/end")
async def end_session(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Terminar sesión y generar resumen automático con Gemini"""
    try:
        supabase = get_supabase()
        gemini = get_gemini()
        from datetime import datetime, timezone

        # Obtener notas de la sesión
        notes_result = supabase.client.table("session_notes") \
            .select("content, author_id") \
            .eq("session_id", session_id) \
            .execute()

        notes = notes_result.data or []

        # Generar resumen con Gemini
        summary = await gemini.generate_session_summary(notes)

        # Marcar sesión como inactiva y guardar resumen
        supabase.client.table("sessions").update({
            "is_active": False,
            "ended_at": datetime.now(timezone.utc).isoformat(),
            "summary": summary
        }).eq("id", session_id).execute()

        logger.info(f"✅ Sesión {session_id} terminada con resumen generado")
        return {"message": "Sesión terminada", "summary": summary}

    except Exception as e:
        logger.error(f"❌ Error terminando sesión: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Agregar nota con análisis de IA (Function Calling)
# ============================================================================

@router.post("/{session_id}/notes")
async def add_session_note(
    session_id: str,
    data: NoteCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Agregar nota a sesión.
    Gemini analiza el texto y detecta ítems/NPCs automáticamente via Function Calling.
    """
    try:
        supabase = get_supabase()
        gemini = get_gemini()

        # Analizar nota con Gemini Function Calling
        analysis = await gemini.analyze_session_note(data.content)
        detected_items = analysis.get("detected_items", [])
        detected_npcs = analysis.get("detected_npcs", [])

        # Guardar nota en BD con los datos detectados
        note_result = supabase.client.table("session_notes").insert({
            "session_id": session_id,
            "author_id": current_user["id"],
            "content": data.content,
            "detected_items": detected_items,
            "detected_npcs": detected_npcs
        }).execute()

        note = note_result.data[0] if note_result.data else {}

        logger.info(
            f"✅ Nota guardada — {len(detected_items)} ítems, {len(detected_npcs)} NPCs detectados"
        )

        return {
            "note": note,
            "analysis": {
                "detected_items": detected_items,
                "detected_npcs": detected_npcs,
                "items_count": len(detected_items),
                "npcs_count": len(detected_npcs)
            }
        }

    except Exception as e:
        logger.error(f"❌ Error guardando nota: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Listar notas de una sesión
# ============================================================================

@router.get("/{session_id}/notes")
async def get_session_notes(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Listar notas de sesión"""
    try:
        supabase = get_supabase()
        result = supabase.client.table("session_notes") \
            .select("*") \
            .eq("session_id", session_id) \
            .order("created_at", desc=False) \
            .execute()

        return {"notes": result.data or []}

    except Exception as e:
        logger.error(f"❌ Error obteniendo notas: {e}")
        raise HTTPException(status_code=500, detail=str(e))
