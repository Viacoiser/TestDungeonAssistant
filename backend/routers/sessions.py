"""
Router para sesiones de juego
"""

from fastapi import APIRouter

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.post("")
async def create_session(campaign_id: str, session_number: int, title: str = None):
    """Crear nueva sesión"""
    # TODO: Implementar
    return {"message": "Sesión creada"}


@router.post("/{session_id}/start")
async def start_session(session_id: str):
    """Iniciar sesión"""
    # TODO: Implementar con Socket.io broadcast
    return {"message": "Sesión iniciada"}


@router.post("/{session_id}/end")
async def end_session(session_id: str):
    """Terminar sesión y generar resumen con IA"""
    # TODO: Implementar con Gemini
    return {"message": "Sesión terminada"}


@router.post("/{session_id}/notes")
async def add_session_note(session_id: str, content: str):
    """Agregar nota a sesión (detecta ítems/NPCs con IA)"""
    # TODO: Implementar con Gemini
    return {"message": "Nota guardada"}


@router.get("/{session_id}/notes")
async def get_session_notes(session_id: str):
    """Listar notas de sesión"""
    # TODO: Implementar
    return {"notes": []}
