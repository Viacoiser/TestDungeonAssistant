"""
Router para asistente conversacional
"""

from fastapi import APIRouter

router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/chat")
async def chat(campaign_id: str, question: str):
    """Asistente conversacional con RAG"""
    # TODO: Implementar con Gemini
    return {
        "answer": "Respuesta del asistente",
        "sources": []
    }


@router.post("/search")
async def search_campaign_history(campaign_id: str, query: str):
    """Búsqueda en historial de campaña (lenguaje natural)"""
    # TODO: Implementar búsqueda
    return {"results": []}
