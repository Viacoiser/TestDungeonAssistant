"""
Servicio de Gemini para IA
"""

import logging
import os
import google.generativeai as genai

logger = logging.getLogger(__name__)


class GeminiService:
    """Servicio centralizado de Gemini"""

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY debe estar en .env")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        self.vision_model = genai.GenerativeModel("gemini-1.5-flash")
        logger.info("✅ Gemini Service initialized")

    async def generate_npc(self, context: dict, prompt: str) -> dict:
        """Generar NPC con RAG"""
        # TODO: Implementar con contexto de campaña
        logger.info(f"Generando NPC con prompt: {prompt[:50]}...")
        return {
            "name": "NPC Generado",
            "personality": "Personalidad del NPC",
        }

    async def analyze_session_note(self, note_content: str) -> dict:
        """Detectar ítems y NPCs en nota de sesión"""
        # TODO: Implementar análisis
        logger.info(f"Analizando nota de sesión...")
        return {
            "detected_items": [],
            "detected_npcs": [],
        }

    async def generate_session_summary(self, notes: list) -> str:
        """Generar resumen de sesión"""
        # TODO: Implementar resumen
        logger.info(f"Generando resumen de sesión...")
        return "Resumen generado"

    async def chat_assistant(self, context: dict, question: str) -> str:
        """Asistente conversacional RAG"""
        # TODO: Implementar asistente
        logger.info(f"Respondiendo pregunta: {question[:50]}...")
        return "Respuesta del asistente"

    async def ocr_character_sheet(self, image_url: str) -> dict:
        """OCR de hoja de personaje D&D 5e"""
        # TODO: Implementar OCR con Gemini Vision
        logger.info(f"Procesando OCR de imagen...")
        return {
            "character_name": None,
            "race": None,
            "class": None,
            "stats": None,
            "low_confidence_fields": [],
            "unreadable_fields": [],
        }


def get_gemini_service() -> GeminiService:
    """Obtener instancia del servicio Gemini"""
    return GeminiService()
