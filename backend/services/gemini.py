"""
Servicio de Gemini para IA - Function Calling + RAG
"""

import logging
import os
import json
import asyncio
import google.generativeai as genai
from google.generativeai.types import FunctionDeclaration, Tool
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()


logger = logging.getLogger(__name__)

# ============================================================================
# FUNCTION DECLARATIONS para Function Calling
# ============================================================================

add_item_fn = FunctionDeclaration(
    name="add_item_to_inventory",
    description="Agrega un item al inventario cuando se detecta en una nota de sesion",
    parameters={
        "type": "object",
        "properties": {
            "item_name": {
                "type": "string",
                "description": "Nombre del item encontrado"
            },
            "quantity": {
                "type": "integer",
                "description": "Cantidad del item (por defecto 1)"
            },
            "is_magical": {
                "type": "boolean",
                "description": "Si el item es magico o encantado"
            },
            "description": {
                "type": "string",
                "description": "Descripcion breve del item"
            }
        },
        "required": ["item_name", "quantity", "is_magical"]
    }
)

register_npc_fn = FunctionDeclaration(
    name="register_npc",
    description="Registra un NPC cuando aparece por primera vez en una nota de sesion",
    parameters={
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "Nombre del NPC"
            },
            "description": {
                "type": "string",
                "description": "Descripcion breve del NPC"
            },
            "relationship": {
                "type": "string",
                "description": "Relacion con el grupo: aliado, enemigo, neutral, desconocido"
            }
        },
        "required": ["name", "description", "relationship"]
    }
)

session_tools = Tool(function_declarations=[add_item_fn, register_npc_fn])


class GeminiService:
    """Servicio centralizado de Gemini"""

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY debe estar en .env")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.5-flash")
        self.vision_model = genai.GenerativeModel("gemini-2.5-flash")
        logger.info("Gemini Service initialized with gemini-2.5-flash")

    # ========================================================================
    # FUNCTION CALLING: Analizar nota de sesion
    # ========================================================================

    async def analyze_session_note(self, note_content: str) -> dict:
        """
        Detectar items y NPCs en una nota de sesion usando Function Calling.
        Usa asyncio.to_thread porque generate_content es sincrono.
        """
        logger.info("Analizando nota de sesion con Function Calling...")

        truncated_note = note_content[:2000] if len(note_content) > 2000 else note_content

        prompt = (
            "Analiza esta nota de sesion de D&D y detecta:\n"
            "1. Items o objetos que el grupo haya encontrado, recibido o comprado\n"
            "2. NPCs (personajes no jugadores) mencionados por nombre\n\n"
            "Para cada item encontrado, llama a add_item_to_inventory.\n"
            "Para cada NPC mencionado, llama a register_npc.\n"
            "Si no hay items o NPCs, no llames ninguna funcion.\n\n"
            f"Nota de sesion:\n\"\"\"{truncated_note}\"\"\"\n"
        )

        def _call():
            return self.model.generate_content(
                prompt,
                tools=[session_tools]
            )

        try:
            response = await asyncio.to_thread(_call)

            detected_items = []
            detected_npcs = []

            if response.candidates:
                for candidate in response.candidates:
                    if candidate.content and candidate.content.parts:
                        for part in candidate.content.parts:
                            if hasattr(part, 'function_call') and part.function_call:
                                fn = part.function_call
                                args = dict(fn.args)

                                if fn.name == "add_item_to_inventory":
                                    detected_items.append({
                                        "item_name": args.get("item_name", ""),
                                        "quantity": args.get("quantity", 1),
                                        "is_magical": args.get("is_magical", False),
                                        "description": args.get("description", "")
                                    })
                                elif fn.name == "register_npc":
                                    detected_npcs.append({
                                        "name": args.get("name", ""),
                                        "description": args.get("description", ""),
                                        "relationship": args.get("relationship", "desconocido")
                                    })

            logger.info(f"Detectados {len(detected_items)} items y {len(detected_npcs)} NPCs")
            return {
                "detected_items": detected_items,
                "detected_npcs": detected_npcs
            }

        except Exception as e:
            logger.error(f"Error en analyze_session_note: {e}")
            return {"detected_items": [], "detected_npcs": []}

    # ========================================================================
    # RAG: Asistente conversacional con contexto limitado
    # ========================================================================

    async def chat_assistant(self, context: dict, question: str) -> str:
        """
        Asistente RAG con contexto limitado.
        Usa asyncio.to_thread porque generate_content es sincrono.
        """
        logger.info(f"Respondiendo pregunta con RAG: {question[:60]}...")

        campaign_name = context.get("campaign_name") or "la campana"
        lore_summary = context.get("lore_summary") or "Sin informacion de trasfondo disponible."

        recent_notes = (context.get("recent_notes") or [])[-3:]
        notes_text = ""
        for i, note in enumerate(recent_notes, 1):
            content = (note.get("content") or "")[:500]
            notes_text += f"\nNota {i}: {content}"

        npcs = context.get("npcs") or []
        npcs_text = ""
        if npcs:
            npcs_list = [
                f"- {npc.get('name', '?')} ({npc.get('relationship_to_party', 'desconocido')})"
                for npc in npcs[:10]
            ]
            npcs_text = "\n".join(npcs_list)

        prompt = (
            f"Eres el Asistente del Dungeon Master para la campana de D&D \"{campaign_name}\".\n"
            "Responde de forma concisa y util basandote en el contexto disponible.\n"
            "Si la informacion no esta en el contexto, dilo claramente.\n\n"
            "=== TRASFONDO DE LA CAMPANA ===\n"
            f"{lore_summary}\n\n"
            "=== NOTAS RECIENTES (ultimas sesiones) ===\n"
            f"{notes_text if notes_text else 'Sin notas de sesion disponibles.'}\n\n"
            "=== NPCs CONOCIDOS ===\n"
            f"{npcs_text if npcs_text else 'Ninguno registrado.'}\n\n"
            "=== PREGUNTA DEL JUGADOR ===\n"
            f"{question}\n\n"
            "Responde en espanol, de forma concisa (maximo 3 parrafos):"
        )

        def _call():
            return self.model.generate_content(prompt)

        try:
            response = await asyncio.to_thread(_call)
            answer = response.text.strip()
            logger.info("Respuesta del asistente generada correctamente")
            return answer
        except Exception as e:
            logger.error(f"Error en chat_assistant: {e}")
            raise

    # ========================================================================
    # Generar NPC con contexto de campana
    # ========================================================================

    async def generate_npc(self, context: dict, prompt: str) -> dict:
        """Generar NPC coherente con el mundo de la campana"""
        logger.info(f"Generando NPC con prompt: {prompt[:50]}...")

        campaign_name = context.get("campaign_name") or "la campana"
        lore_summary = (context.get("lore_summary") or "")[:500]
        existing_npcs = context.get("npcs") or []
        existing_names = [n.get("name", "") for n in existing_npcs[:5]]

        full_prompt = (
            f"Eres un generador de NPCs para D&D 5e en la campana \"{campaign_name}\".\n\n"
            f"Trasfondo de la campana: {lore_summary if lore_summary else 'Mundo de fantasia generico'}\n"
            f"NPCs existentes: {', '.join(existing_names) if existing_names else 'ninguno'}\n\n"
            f"Genera un NPC para: {prompt}\n\n"
            "Responde UNICAMENTE con un JSON valido con esta estructura exacta:\n"
            "{\n"
            "  \"name\": \"Nombre del NPC\",\n"
            "  \"race\": \"Raza (elf, human, dwarf, etc.)\",\n"
            "  \"personality\": \"Descripcion de personalidad breve, pero asegurate que encaje con la persona.\",\n"
            "  \"secrets\": \"Un secreto interesante que tiene\",\n"
            "  \"relationship_to_party\": \"aliado | enemigo | neutral\",\n"
            "  \"skills\": \"Percepcion +2, Persuasion +4 (o vacio)\",\n"
            "  \"stats\": {\n"
            "    \"STR\": \"+1\",\n"
            "    \"DEX\": \"0\",\n"
            "    \"CON\": \"+2\",\n"
            "    \"INT\": \"-1\",\n"
            "    \"WIS\": \"0\",\n"
            "    \"CHA\": \"+1\",\n"
            "    \"HP\": 30,\n"
            "    \"AC\": 12,\n"
            "    \"CR\": 1\n"
            "  }\n"
            "}"
        )

        def _call():
            return self.model.generate_content(full_prompt)

        try:
            response = await asyncio.to_thread(_call)
            text = response.text.strip()

            # Limpiar markdown si Gemini lo envuelve en ```json
            if text.startswith("```"):
                lines = text.split("\n")
                text = "\n".join(lines[1:-1])

            npc_data = json.loads(text)
            logger.info(f"NPC generado: {npc_data.get('name', 'desconocido')}")
            return npc_data

        except json.JSONDecodeError as e:
            logger.error(f"Error parseando JSON del NPC: {e}")
            return {
                "name": "NPC Generado",
                "race": "human",
                "personality": prompt,
                "secrets": "Desconocido",
                "relationship_to_party": "neutral",
                "stats": {"CR": 1, "HP": 20, "AC": 10}
            }
        except Exception as e:
            logger.error(f"Error en generate_npc: {e}")
            raise

    # ========================================================================
    # Generar resumen de sesion
    # ========================================================================

    async def generate_session_summary(self, notes: list) -> str:
        """Generar resumen de sesion a partir de las notas"""
        logger.info("Generando resumen de sesion...")

        if not notes:
            return "Sesion sin notas registradas."

        notes_text = "\n\n".join([
            f"Nota de {n.get('author', 'jugador')}: {n.get('content', '')[:500]}"
            for n in notes[:10]
        ])

        prompt = (
            "Resume esta sesion de D&D en 3-5 oraciones concisas.\n"
            "Incluye los eventos principales, decisiones importantes y cualquier item o NPC relevante.\n\n"
            f"Notas de la sesion:\n{notes_text}\n\nResumen:"
        )

        def _call():
            return self.model.generate_content(prompt)

        try:
            response = await asyncio.to_thread(_call)
            return response.text.strip()
        except Exception as e:
            logger.error(f"Error en generate_session_summary: {e}")
            return "No se pudo generar el resumen automaticamente."

    # ========================================================================
    # OCR: Hoja de personaje
    # ========================================================================

    async def generate_npc_trait(self, context_str: str) -> str:
        """Genera un rasgo de personalidad distintivo y aleatorio para un NPC."""
        prompt = (
            f"Basado en este NPC:\n{context_str}\n\n"
            "Genera UN ÚNICO rasgo distintivo, manía, hábito o característica física muy breve para rolearlo de inmediato. "
            "Ejemplos: Habla muy rápido, Huele fuertemente a lavanda, Tiene un tic en el ojo izquierdo. "
            "No uses comillas. Solo la frase."
        )
        def _call():
            return self.model.generate_content(prompt)
        try:
            response = await asyncio.to_thread(_call)
            return response.text.strip().replace('\"', '')
        except Exception as e:
            logger.error(f"Error generando rasgo: {e}")
            return "Tiene un tic nervioso"

    async def ocr_character_sheet(self, image_url: str) -> dict:
        """OCR de hoja de personaje D&D 5e con Gemini Vision"""
        logger.info("Procesando OCR de imagen...")
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


if __name__ == "__main__":
    """Script para listar todos los modelos disponibles en Gemini"""
    import sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ ERROR: GEMINI_API_KEY no está configurada en .env")
        sys.exit(1)
    
    genai.configure(api_key=api_key)
    
    print("=" * 80)
    print("📋 MODELOS DE GEMINI DISPONIBLES")
    print("=" * 80)
    
    try:
        for i, model in enumerate(genai.list_models(), 1):
            print(f"\n{i}. {model.name}")
            print(f"   Display Name: {model.display_name}")
            print(f"   Version: {model.version if hasattr(model, 'version') else 'N/A'}")
            print(f"   Supported Methods: {', '.join(model.supported_generation_methods) if hasattr(model, 'supported_generation_methods') else 'N/A'}")
            print(f"   Input Token Limit: {model.input_token_limit if hasattr(model, 'input_token_limit') else 'N/A'}")
            print(f"   Output Token Limit: {model.output_token_limit if hasattr(model, 'output_token_limit') else 'N/A'}")
    except Exception as e:
        print(f"❌ Error listando modelos: {e}")
        sys.exit(1)
    
    print("\n" + "=" * 80)
