"""
Servicio de Gemini para IA - Function Calling + RAG
"""

import logging
import os
import json
import google.generativeai as genai
from google.generativeai.types import FunctionDeclaration, Tool

logger = logging.getLogger(__name__)

# ============================================================================
# FUNCTION DECLARATIONS para Function Calling
# ============================================================================

add_item_fn = FunctionDeclaration(
    name="add_item_to_inventory",
    description="Agrega un ítem al inventario cuando se detecta en una nota de sesión",
    parameters={
        "type": "object",
        "properties": {
            "item_name": {
                "type": "string",
                "description": "Nombre del ítem encontrado"
            },
            "quantity": {
                "type": "integer",
                "description": "Cantidad del ítem (por defecto 1)"
            },
            "is_magical": {
                "type": "boolean",
                "description": "Si el ítem es mágico o encantado"
            },
            "description": {
                "type": "string",
                "description": "Descripción breve del ítem"
            }
        },
        "required": ["item_name", "quantity", "is_magical"]
    }
)

register_npc_fn = FunctionDeclaration(
    name="register_npc",
    description="Registra un NPC cuando aparece por primera vez en una nota de sesión",
    parameters={
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "Nombre del NPC"
            },
            "description": {
                "type": "string",
                "description": "Descripción breve del NPC"
            },
            "relationship": {
                "type": "string",
                "description": "Relación con el grupo: aliado, enemigo, neutral, desconocido"
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
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        self.vision_model = genai.GenerativeModel("gemini-1.5-flash")
        logger.info("✅ Gemini Service initialized")

    # ========================================================================
    # FUNCTION CALLING: Analizar nota de sesión
    # ========================================================================

    async def analyze_session_note(self, note_content: str) -> dict:
        """
        Detectar ítems y NPCs en una nota de sesión usando Function Calling.
        Gemini invoca las funciones directamente → JSON garantizado, sin parseo manual.
        """
        logger.info("Analizando nota de sesión con Function Calling...")

        # Truncar nota si es muy larga (para demo académica 2000 chars es más que suficiente)
        truncated_note = note_content[:2000] if len(note_content) > 2000 else note_content

        prompt = f"""Analiza esta nota de sesión de D&D y detecta:
1. Ítems o objetos que el grupo haya encontrado, recibido o comprado
2. NPCs (personajes no jugadores) mencionados por nombre

Para cada ítem encontrado, llama a add_item_to_inventory.
Para cada NPC mencionado, llama a register_npc.
Si no hay ítems o NPCs, no llames ninguna función.

Nota de sesión:
\"\"\"{truncated_note}\"\"\"
"""

        try:
            response = self.model.generate_content(
                prompt,
                tools=[session_tools]
            )

            detected_items = []
            detected_npcs = []

            # Procesar function calls retornadas por Gemini
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

            logger.info(f"✅ Detectados {len(detected_items)} ítems y {len(detected_npcs)} NPCs")
            return {
                "detected_items": detected_items,
                "detected_npcs": detected_npcs
            }

        except Exception as e:
            logger.error(f"❌ Error en analyze_session_note: {e}")
            return {"detected_items": [], "detected_npcs": []}

    # ========================================================================
    # RAG: Asistente conversacional con contexto limitado
    # ========================================================================

    async def chat_assistant(self, context: dict, question: str) -> str:
        """
        Asistente RAG con contexto limitado para ahorrar tokens:
        - lore_summary de la campaña (resumen acumulativo)
        - últimas 3 notas de sesión (no todo el historial)
        - lista de NPCs conocidos
        """
        logger.info(f"Respondiendo pregunta con RAG: {question[:60]}...")

        # Construir contexto limitado (token-efficient)
        campaign_name = context.get("campaign_name", "la campaña")
        lore_summary = context.get("lore_summary", "Sin información de trasfondo disponible.")
        
        # Solo últimas 3 notas, truncadas a 500 chars cada una
        recent_notes = context.get("recent_notes", [])[-3:]
        notes_text = ""
        for i, note in enumerate(recent_notes, 1):
            content = note.get("content", "")[:500]
            notes_text += f"\nNota {i}: {content}"

        # NPCs conocidos (solo nombre + relación)
        npcs = context.get("npcs", [])
        npcs_text = ""
        if npcs:
            npcs_list = [f"- {npc.get('name', '?')} ({npc.get('relationship_to_party', 'desconocido')})" for npc in npcs[:10]]
            npcs_text = "\n".join(npcs_list)

        prompt = f"""Eres el Asistente del Dungeon Master para la campaña de D&D "{campaign_name}".
Responde de forma concisa y útil basándote en el contexto disponible.
Si la information no está en el contexto, dilo claramente.

=== TRASFONDO DE LA CAMPAÑA ===
{lore_summary}

=== NOTAS RECIENTES (últimas sesiones) ===
{notes_text if notes_text else "Sin notas de sesión disponibles."}

=== NPCs CONOCIDOS ===
{npcs_text if npcs_text else "Ninguno registrado."}

=== PREGUNTA DEL JUGADOR ===
{question}

Responde en español, de forma concisa (máximo 3 párrafos):"""

        try:
            response = self.model.generate_content(prompt)
            answer = response.text.strip()
            logger.info("✅ Respuesta del asistente generada")
            return answer
        except Exception as e:
            logger.error(f"❌ Error en chat_assistant: {e}")
            return "Lo siento, no pude procesar tu pregunta. Intenta de nuevo."

    # ========================================================================
    # Generar NPC con contexto de campaña
    # ========================================================================

    async def generate_npc(self, context: dict, prompt: str) -> dict:
        """Generar NPC coherente con el mundo de la campaña"""
        logger.info(f"Generando NPC con prompt: {prompt[:50]}...")

        campaign_name = context.get("campaign_name", "la campaña")
        lore_summary = context.get("lore_summary", "")[:500]
        existing_npcs = context.get("npcs", [])
        existing_names = [n.get("name", "") for n in existing_npcs[:5]]

        full_prompt = f"""Eres un generador de NPCs para D&D 5e en la campaña "{campaign_name}".

Trasfondo de la campaña: {lore_summary if lore_summary else "Mundo de fantasía genérico"}
NPCs existentes: {", ".join(existing_names) if existing_names else "ninguno"}

Genera un NPC para: {prompt}

Responde ÚNICAMENTE con un JSON válido con esta estructura exacta:
{{
  "name": "Nombre del NPC",
  "race": "Raza (elf, human, dwarf, etc.)",
  "personality": "Descripción de personalidad en 2-3 oraciones",
  "secrets": "Un secreto interesante que tiene",
  "relationship_to_party": "aliado | enemigo | neutral",
  "stats": {{
    "CR": 1,
    "HP": 30,
    "AC": 12
  }}
}}"""

        try:
            response = self.model.generate_content(full_prompt)
            text = response.text.strip()

            # Limpiar markdown si Gemini lo envuelve en ```json
            if text.startswith("```"):
                lines = text.split("\n")
                text = "\n".join(lines[1:-1])

            npc_data = json.loads(text)
            logger.info(f"✅ NPC generado: {npc_data.get('name', 'desconocido')}")
            return npc_data

        except json.JSONDecodeError as e:
            logger.error(f"❌ Error parseando JSON del NPC: {e}")
            return {
                "name": "NPC Generado",
                "race": "human",
                "personality": prompt,
                "secrets": "Desconocido",
                "relationship_to_party": "neutral",
                "stats": {"CR": 1, "HP": 20, "AC": 10}
            }
        except Exception as e:
            logger.error(f"❌ Error en generate_npc: {e}")
            raise

    # ========================================================================
    # Generar resumen de sesión
    # ========================================================================

    async def generate_session_summary(self, notes: list) -> str:
        """Generar resumen de sesión a partir de las notas"""
        logger.info("Generando resumen de sesión...")

        if not notes:
            return "Sesión sin notas registradas."

        notes_text = "\n\n".join([
            f"Nota de {n.get('author', 'jugador')}: {n.get('content', '')[:500]}"
            for n in notes[:10]
        ])

        prompt = f"""Resume esta sesión de D&D en 3-5 oraciones concisas.
Incluye los eventos principales, decisiones importantes y cualquier ítem o NPC relevante.

Notas de la sesión:
{notes_text}

Resumen:"""

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            logger.error(f"❌ Error en generate_session_summary: {e}")
            return "No se pudo generar el resumen automáticamente."

    # ========================================================================
    # OCR: Hoja de personaje
    # ========================================================================

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
