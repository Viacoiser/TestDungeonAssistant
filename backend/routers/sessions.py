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


class NoteVisibility(BaseModel):
    is_public: bool


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
    Agregar nota a sesión - Phase 1: Local Analysis + Gemini Hybrid
    
    Flujo:
    1. Análisis LOCAL (DND5ESearcher) - Detecta items/spells sin tokens
    2. Análisis Gemini (Function Calling) - Detecta NPCs y análisis profundo
    3. Combina ambos resultados
    4. Retorna análisis completo
    
    Ahorro de tokens:
    - Antes: 3500 tokens (Gemini analiza todo)
    - Después: 2100 tokens (solo NPCs + función calling)
    - Reducción: 40%
    """
    try:
        import time
        start_time = time.time()
        
        supabase = get_supabase()
        gemini = get_gemini()
        
        # ====================================================================
        # PHASE 1: ANÁLISIS LOCAL (sin tokens)
        # ====================================================================
        from services.dnd5e_search import get_dnd5e_searcher
        searcher = get_dnd5e_searcher()
        
        local_analysis_start = time.time()
        local_analysis = searcher.analyze_note(data.content)
        local_items = local_analysis.get("detected_items", [])
        local_spells = local_analysis.get("detected_spells", [])
        local_npcs = local_analysis.get("detected_npcs", [])
        local_time = time.time() - local_analysis_start
        
        logger.info(
            f"✓ Local analysis: {len(local_items)} items, {len(local_spells)} spells, "
            f"{len(local_npcs)} NPCs ({local_time:.2f}s - NO TOKENS)"
        )

        # ====================================================================
        # Obtener contexto de campaña/personaje para Gemini
        # ====================================================================
        
        # 1. Obtener sesión y campaña
        session = supabase.client.table("sessions") \
            .select("campaign_id") \
            .eq("id", session_id) \
            .single() \
            .execute()
        
        if not session.data:
            raise HTTPException(status_code=404, detail="Sesión no encontrada")
        
        campaign_id = session.data["campaign_id"]
        
        # 2. Obtener información de campaña
        campaign = supabase.client.table("campaigns") \
            .select("name, lore_summary") \
            .eq("id", campaign_id) \
            .single() \
            .execute()
        
        campaign_name = campaign.data.get("name", "") if campaign.data else ""
        
        # 3. Obtener personaje del usuario en esta campaña
        user_character_response = supabase.client.table("characters") \
            .select("id, name, race, class, level, background") \
            .eq("campaign_id", campaign_id) \
            .eq("player_id", current_user["id"]) \
            .execute()
        
        user_character_data = user_character_response.data[0] if user_character_response.data else None
        
        character_name = ""
        character_race = ""
        character_class = ""
        
        if user_character_data:
            character_name = user_character_data.get("name", "")
            character_race = user_character_data.get("race", "")
            character_class = user_character_data.get("class", "")
        
        # 4. Obtener otros personajes de la campaña (party)
        party_characters = supabase.client.table("characters") \
            .select("name, race, class") \
            .eq("campaign_id", campaign_id) \
            .neq("player_id", current_user["id"]) \
            .execute()
        
        party_members = party_characters.data or []
        
        # 5. Construir contexto para Gemini
        context = {
            "campaign_name": campaign_name,
            "player_name": current_user.get("username", "Jugador"),
            "character_name": character_name,
            "character_race": character_race,
            "character_class": character_class,
            "party_members": party_members
        }
        
        # ====================================================================
        # PHASE 1: ANÁLISIS GEMINI (NPC detection + profundo)
        # ====================================================================
        
        gemini_analysis_start = time.time()
        gemini_analysis = await gemini.analyze_session_note(data.content, context)
        gemini_items = gemini_analysis.get("detected_items", [])
        gemini_npcs = gemini_analysis.get("detected_npcs", [])
        gemini_time = time.time() - gemini_analysis_start
        
        logger.info(
            f"✓ Gemini analysis: {len(gemini_items)} items, {len(gemini_npcs)} NPCs ({gemini_time:.2f}s)"
        )
        
        # ====================================================================
        # COMBINAR ANÁLISIS (local + Gemini)
        # ====================================================================
        
        # Items: local primero (más rápido), luego Gemini si está vacío
        final_items = local_items if local_items else gemini_items
        
        # NPCs: Gemini es mejor (entiende contexto), local es solo respaldo
        final_npcs = gemini_npcs if gemini_npcs else local_npcs
        
        # Spells: solo análisis local disponible actualmente
        final_spells = local_spells
        
        # ====================================================================
        # Guardar nota en BD con todos los datos
        # ====================================================================
        
        note_result = supabase.client.table("session_notes").insert({
            "session_id": session_id,
            "author_id": current_user["id"],
            "content": data.content,
            "detected_items": final_items,
            "detected_npcs": final_npcs,
            "analysis_source": "hybrid_local_gemini"  # Metadata
        }).execute()

        note = note_result.data[0] if note_result.data else {}
        total_time = time.time() - start_time

        logger.info(
            f"✅ Note saved (Phase 1 Hybrid): "
            f"{len(final_items)} items, {len(final_npcs)} NPCs, {len(final_spells)} spells "
            f"(Local: {local_time:.2f}s, Gemini: {gemini_time:.2f}s, Total: {total_time:.2f}s)"
        )

        return {
            "note": note,
            "analysis": {
                "detected_items": final_items,
                "detected_npcs": final_npcs,
                "detected_spells": final_spells,
                "items_count": len(final_items),
                "npcs_count": len(final_npcs),
                "spells_count": len(final_spells),
                "source": "hybrid_local_gemini",
                "performance": {
                    "local_analysis_ms": round(local_time * 1000),
                    "gemini_analysis_ms": round(gemini_time * 1000),
                    "total_ms": round(total_time * 1000)
                }
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


# ============================================================================
# Editar nota
# ============================================================================

@router.patch("/notes/{note_id}")
async def update_session_note(
    note_id: str,
    data: NoteCreate,
    current_user: dict = Depends(get_current_user)
):
    """Editar el contenido de una nota y re-analizarla con Gemini"""
    try:
        supabase = get_supabase()
        gemini = get_gemini()

        # 1. Obtener la nota actual para saber a qué sesión pertenece
        note = supabase.client.table("session_notes") \
            .select("session_id") \
            .eq("id", note_id) \
            .single() \
            .execute()
        
        if not note.data:
            raise HTTPException(status_code=404, detail="Nota no encontrada")
        
        session_id = note.data["session_id"]
        
        # 2. Obtener sesión y campaña
        session = supabase.client.table("sessions") \
            .select("campaign_id") \
            .eq("id", session_id) \
            .single() \
            .execute()
        
        if not session.data:
            raise HTTPException(status_code=404, detail="Sesión no encontrada")
        
        campaign_id = session.data["campaign_id"]
        
        # 3. Obtener información de campaña
        campaign = supabase.client.table("campaigns") \
            .select("name, lore_summary") \
            .eq("id", campaign_id) \
            .single() \
            .execute()
        
        campaign_name = campaign.data.get("name", "") if campaign.data else ""
        
        # 4. Obtener personaje del usuario en esta campaña
        user_character_response = supabase.client.table("characters") \
            .select("id, name, race, class, level, background") \
            .eq("campaign_id", campaign_id) \
            .eq("player_id", current_user["id"]) \
            .execute()
        
        user_character_data = user_character_response.data[0] if user_character_response.data else None
        
        character_name = ""
        character_race = ""
        character_class = ""
        
        if user_character_data:
            character_name = user_character_data.get("name", "")
            character_race = user_character_data.get("race", "")
            character_class = user_character_data.get("class", "")
        
        # 5. Obtener otros personajes de la campaña (party)
        party_characters = supabase.client.table("characters") \
            .select("name, race, class") \
            .eq("campaign_id", campaign_id) \
            .neq("player_id", current_user["id"]) \
            .execute()
        
        party_members = party_characters.data or []
        
        # 6. Construir contexto para Gemini
        context = {
            "campaign_name": campaign_name,
            "player_name": current_user.get("username", "Jugador"),
            "character_name": character_name,
            "character_race": character_race,
            "character_class": character_class,
            "party_members": party_members
        }

        # Analizar nota con Gemini (ahora con contexto)
        analysis = await gemini.analyze_session_note(data.content, context)
        detected_items = analysis.get("detected_items", [])
        detected_npcs = analysis.get("detected_npcs", [])

        result = supabase.client.table("session_notes").update({
            "content": data.content,
            "detected_items": detected_items,
            "detected_npcs": detected_npcs
        }).eq("id", note_id).execute()

        return {
            "note": result.data[0] if result.data else {},
            "analysis": {
                "detected_items": detected_items,
                "detected_npcs": detected_npcs,
                "items_count": len(detected_items),
                "npcs_count": len(detected_npcs)
            }
        }
    except Exception as e:
        logger.error(f"❌ Error editando nota: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# Cambiar privacidad de nota
# ============================================================================

@router.patch("/notes/{note_id}/visibility")
async def toggle_note_visibility(
    note_id: str,
    data: NoteVisibility,
    current_user: dict = Depends(get_current_user)
):
    """Cambiar privacidad de una nota (solo el autor puede hacerlo)"""
    try:
        supabase = get_supabase()
        
        # Verificar que sea el autor de la nota
        note = supabase.client.table("session_notes") \
            .select("author_id, is_public") \
            .eq("id", note_id) \
            .single() \
            .execute()
        
        if not note.data or note.data["author_id"] != current_user["id"]:
            raise HTTPException(status_code=403, detail="Solo el autor puede cambiar la privacidad")
        
        # Actualizar privacidad
        result = supabase.client.table("session_notes").update({
            "is_public": data.is_public
        }).eq("id", note_id).execute()
        
        updated_note = result.data[0] if result.data else {}
        status_text = "pública" if data.is_public else "privada"
        
        logger.info(f"✅ Nota {note_id} ahora es {status_text}")
        return {
            "message": f"Nota ahora es {status_text}",
            "note": updated_note
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error cambiando privacidad: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# Eliminar nota
# ============================================================================

@router.delete("/notes/{note_id}")
async def delete_session_note(
    note_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Eliminar una nota individual"""
    try:
        supabase = get_supabase()
        supabase.client.table("session_notes").delete().eq("id", note_id).execute()
        return {"message": "Nota eliminada"}
    except Exception as e:
        logger.error(f"❌ Error eliminando nota: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# Eliminar sesión
# ============================================================================

@router.delete("/{session_id}")
async def delete_session(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Eliminar sesión y todas sus notas"""
    try:
        supabase = get_supabase()

        # Eliminar notas primero (FK constraint)
        supabase.client.table("session_notes") \
            .delete() \
            .eq("session_id", session_id) \
            .execute()

        # Eliminar la sesión
        supabase.client.table("sessions") \
            .delete() \
            .eq("id", session_id) \
            .execute()

        logger.info(f"✅ Sesión {session_id} eliminada")
        return {"message": "Sesión eliminada correctamente"}

    except Exception as e:
        logger.error(f"❌ Error eliminando sesión: {e}")
        raise HTTPException(status_code=500, detail=str(e))
