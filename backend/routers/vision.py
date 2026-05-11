"""
Router para visión y OCR
Procesa imágenes de hojas de personaje con múltiples modelos Gemini con fallback automático
"""

import os
import re
import json
import logging
from pathlib import Path
from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import Optional
from PIL import Image, ImageEnhance, ImageFilter
import io

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/vision", tags=["vision"])

# Inicializar Gemini
GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")

try:
    import google.generativeai as genai
    if GOOGLE_API_KEY:
        genai.configure(api_key=GOOGLE_API_KEY)
        logger.info("✅ Gemini API configurado correctamente")
    else:
        logger.warning(f"⚠️ GEMINI_API_KEY no encontrada en variables de entorno")
except Exception as e:
    logger.error(f"❌ Error al configurar Gemini API: {e}", exc_info=True)


class VisionService:
    """Servicio de visión con múltiples modelos y fallback automático"""
    
    def __init__(self):
        # Modelos para visión en orden de preferencia
        # IMPORTANTE: Solo modelos verificados con ListModels API
        # Cada familia (2.0, 2.5, 3.x) tiene cuotas SEPARADAS en free tier
        self.vision_models = [
            "gemini-2.0-flash",               # Preferido (rápido, estable)
            "gemini-2.0-flash-lite",          # 2.0 lite
            "gemini-2.5-flash-lite",          # 2.5 lite
            "gemini-2.5-flash",              # 2.5 (puede dar 403)
            "gemini-2.5-pro",                # 2.5 pro
            "gemini-3.1-flash-lite",          # 3.x (cuota separada)
            "gemini-3-flash-preview",         # 3.x alternativa
        ]
        
        self.exhausted_models = set()
        self.current_model = None
        self.current_model_name = None
        
        # Intentar inicializar
        self._initialize_model()
    
    def _initialize_model(self):
        """Encontrar el primer modelo disponible"""
        for model_name in self.vision_models:
            if model_name in self.exhausted_models:
                continue
            try:
                self.current_model = genai.GenerativeModel(model_name)
                self.current_model_name = model_name
                logger.info(f"✅ Vision model initialized: {model_name}")
                return True
            except Exception as e:
                logger.debug(f"Model {model_name} unavailable: {str(e)[:80]}")
                continue
        
        logger.error("❌ No vision models available!")
        return False
    
    def _rotate_model_on_quota_error(self):
        """Cambiar al siguiente modelo cuando se agota la cuota"""
        logger.warning(f"⚠️ Model {self.current_model_name} exhausted! Rotating...")
        self.exhausted_models.add(self.current_model_name)
        
        for model_name in self.vision_models:
            if model_name in self.exhausted_models:
                continue
            try:
                self.current_model = genai.GenerativeModel(model_name)
                self.current_model_name = model_name
                logger.info(f"✅ Rotated to {model_name}")
                return True
            except Exception as e:
                logger.debug(f"Failed to rotate to {model_name}: {str(e)[:80]}")
                self.exhausted_models.add(model_name)
                continue
        
        logger.error("❌ All vision models exhausted!")
        return False
    
    async def extract_text_from_image(self, image: Image.Image) -> str:
        """Extraer texto de imagen con fallback automático"""
        if not self.current_model:
            self._initialize_model()
        
        if not self.current_model:
            raise ValueError("No vision models available")
        
        max_retries = len(self.vision_models)
        for attempt in range(max_retries):
            try:
                logger.info(f"🔍 Extracting text with {self.current_model_name} (attempt {attempt + 1})")
                response = self.current_model.generate_content([
                    "Extrae TODO el texto que ves en esta imagen. Sé exhaustivo y preciso. Incluye TODA la información visible.",
                    image
                ])
                
                if response.text:
                    logger.info(f"✅ Text extracted ({len(response.text)} chars)")
                    return response.text
                else:
                    logger.warning("⚠️ No text returned from model")
                    return ""
                    
            except Exception as e:
                error_str = str(e)
                error_type = str(type(e).__name__)
                is_quota_error = "429" in error_str or "ResourceExhausted" in error_type or "quota" in error_str.lower()
                is_model_not_found = "404" in error_str or "not found" in error_str.lower() or "not supported" in error_str.lower()
                is_permission_denied = "403" in error_str or "PermissionDenied" in error_type or "denied access" in error_str.lower()
                
                if is_quota_error:
                    logger.warning(f"⚠️ Quota error: {error_str[:100]}")
                    if self._rotate_model_on_quota_error():
                        continue  # Retry with new model
                    else:
                        raise
                elif is_model_not_found or is_permission_denied:
                    logger.warning(f"⚠️ Model unavailable ({self.current_model_name}): {error_str[:100]}")
                    self.exhausted_models.add(self.current_model_name)
                    if self._rotate_model_on_quota_error():
                        continue
                    else:
                        raise
                else:
                    logger.error(f"❌ Vision error: {error_str[:200]}")
                    raise
        
        raise ValueError("Failed to extract text after all retries")


# Instancia global del servicio de visión
vision_service = None

def get_vision_service():
    """Obtener o crear instancia del servicio de visión"""
    global vision_service
    if vision_service is None:
        vision_service = VisionService()
    return vision_service


def enhance_image_for_ocr(image: Image.Image) -> Image.Image:
    """Mejora la imagen para OCR: contraste, agudeza, brillo"""
    try:
        logger.info("🎨 Mejorando imagen para OCR...")
        
        # Convertir a RGB si es necesario
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # 1. Aumentar contraste (1.5 = 50% más contraste)
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(1.8)
        
        # 2. Aumentar agudeza (2.0 = 100% más agudeza)
        enhancer = ImageEnhance.Sharpness(image)
        image = enhancer.enhance(2.0)
        
        # 3. Aumentar brillo ligeramente (1.1 = 10% más brillo)
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(1.15)
        
        # 4. Aplicar filtro SHARPEN adicional
        image = image.filter(ImageFilter.SHARPEN)
        
        logger.info("✅ Imagen mejorada correctamente")
        return image
        
    except Exception as e:
        logger.warning(f"⚠️ Error al mejorar imagen: {e}, usando imagen original")
        return image


@router.post("/digitize")
async def digitize_character_sheet(
    file: UploadFile = File(...),
    campaign_id: Optional[str] = None
):
    """
    OCR de hoja de personaje física con Tesseract (GRATIS) + Gemini 1.5 Pro (GRATIS)
    
    Recibe: Foto de hoja de D&D
    Retorna: Datos estructurados (nombre, race, class, level, stats, etc)
    """
    
    # Verificar que Gemini esté disponible
    if not GOOGLE_API_KEY:
        return {
            "success": False,
            "message": "Gemini API no configurada. Configura GEMINI_API_KEY en .env",
            "data": None
        }
    
    try:
        # Paso 1: Leer imagen
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Paso 1.5: MEJORAR IMAGEN PARA OCR (contraste, agudeza, brillo)
        image = enhance_image_for_ocr(image)
        
        # Paso 2: Extraer texto con múltiples modelos Gemini (con fallback automático)
        logger.info("🔍 Extrayendo texto con Gemini Vision...")
        vision_svc = get_vision_service()
        raw_text = await vision_svc.extract_text_from_image(image)
        
        if not raw_text or len(raw_text.strip()) < 20:
            logger.warning("⚠️ No se detectó suficiente texto en la imagen")
            return {
                "success": False,
                "message": "No se pudo detectar texto en la imagen. Asegúrate que sea clara.",
                "data": None
            }
        
        logger.info(f"✅ Texto extraído ({len(raw_text)} caracteres)")
        
        # Paso 3: Procesar con Gemini Pro para extraer datos estructurados
        logger.info("🤖 Procesando con Gemini Pro...")
        vision_svc = get_vision_service()
        model = vision_svc.current_model
        
        if not model:
            raise ValueError("No vision model available for processing")
        
        prompt = f"""
        TAREA: Eres un experto en hojas de personaje de D&D 5e. Extrae TODOS los datos de esta hoja.
        
        TEXTO OCR DETECTADO:
        {raw_text}
        
        INSTRUCCIONES:
        1. Lee cuidadosamente todo el texto OCR
        2. Localiza CADA CAMPO mencionado abajo
        3. Si está en blanco o ilegible, pon null
        4. Para números, extrae SOLO el valor numérico
        5. Para booleanos (proficient/expertise), marca true si hay un punto relleno (●) o marca junto al nombre
        6. Los MODIFIERS (±números pequeños) NO son los ability scores. Los scores son los números GRANDES (3-20).
        
        === SECCIÓN 1: IDENTIFICACIÓN (arriba de la hoja) ===
        - name: Nombre del personaje (CHARACTER NAME)
        - race: Raza (RACE)
        - class_name: Clase principal (CLASS & LEVEL) - solo la clase, ej: "Fighter"
        - subclass: Subclase si aparece (ej: "Champion", "Evocation")
        - level: Nivel (LEVEL) - número 1-20
        - background: Trasfondo (BACKGROUND)
        - alignment: Alineamiento (ALIGNMENT) - ej: "Chaotic Good"
        - experience_points: Experiencia (EXPERIENCE POINTS) - número
        - player_name: Nombre del jugador (PLAYER NAME) - NO del personaje
        
        === SECCIÓN 2: ABILITY SCORES (6 números grandes, columna izquierda) ===
        stats: Los SCORES son los números GRANDES (generalmente 8-20), NO los modificadores
          strength: Número en STRENGTH
          dexterity: Número en DEXTERITY
          constitution: Número en CONSTITUTION
          intelligence: Número en INTELLIGENCE
          wisdom: Número en WISDOM
          charisma: Número en CHARISMA
        
        === SECCIÓN 3: SAVING THROWS (debajo de ability scores) ===
        saving_throws: Para cada stat, indica si tiene PROFICIENCY (punto relleno ● = true)
          strength: boolean
          dexterity: boolean
          constitution: boolean
          intelligence: boolean
          wisdom: boolean
          charisma: boolean
        
        === SECCIÓN 4: SKILLS (lista de 18 habilidades) ===
        skills: Para cada skill, indica si tiene proficiency (●) y/o expertise (doble ●)
          acrobatics, animal_handling, arcana, athletics, deception, history,
          insight, intimidation, investigation, medicine, nature, perception,
          performance, persuasion, religion, sleight_of_hand, stealth, survival
        
        === SECCIÓN 5: COMBATE (lado derecho superior) ===
        - ac: Armor Class - número
        - hp_max: Hit Point Maximum - número
        - hp_current: Current Hit Points - número (si visible)
        - hp_temporary: Temporary Hit Points - número
        - proficiency_bonus: Proficiency Bonus - número (generalmente +2 a +6)
        - initiative: Initiative - número
        - speed: Speed - número (generalmente 25-35)
        - hit_dice: Hit Dice - texto (ej: "1d10", "5d8")
        - passive_perception: Passive Wisdom (Perception) - número
        - inspiration: Inspiration - boolean (si hay marca)
        
        === SECCIÓN 6: ATAQUES (tabla de 3 filas) ===
        attacks: Lista de ataques con nombre, bonus, daño y tipo
        
        === SECCIÓN 7: EQUIPO E INVENTARIO ===
        - equipment: Lista de items/equipo (texto libre)
        - currency: Monedas - CP, SP, EP, GP, PP (5 números)
        
        === SECCIÓN 8: PERSONALIDAD ===
        - personality_traits: Texto de PERSONALITY TRAITS
        - ideals: Texto de IDEALS
        - bonds: Texto de BONDS
        - flaws: Texto de FLAWS
        
        === SECCIÓN 9: RASGOS Y CARACTERÍSTICAS ===
        - features_traits: Texto de FEATURES & TRAITS
        - other_proficiencies: Texto de OTHER PROFICIENCIES & LANGUAGES
        
        === SECCIÓN 10: SPELLCASTING (si aplica) ===
        - spellcasting_class: Clase de hechicería
        - spellcasting_ability: Habilidad de hechicería (ej: "intelligence", "wisdom", "charisma")
        - spell_save_dc: Spell Save DC - número
        - spell_attack_bonus: Spell Attack Bonus - número
        - cantrips: Lista de cantrips (nombres)
        - spells: Lista de hechizos conocidos/preparados (nombres)
        
        === SECCIÓN 11: APARIENCIA (página 2, si visible) ===
        - age: Edad
        - height: Altura
        - weight: Peso
        - eyes: Color de ojos
        - skin: Color de piel
        - hair: Color de pelo
        - backstory: CHARACTER BACKSTORY (texto)
        
        RESPONDE CON JSON VÁLIDO (SOLO JSON, sin explicaciones ni markdown):
        {{
            "name": "valor_o_null",
            "race": "valor_o_null",
            "class_name": "valor_o_null",
            "subclass": "valor_o_null",
            "level": número_o_null,
            "background": "valor_o_null",
            "alignment": "valor_o_null",
            "experience_points": número_o_null,
            "player_name": "valor_o_null",
            "stats": {{
                "strength": número_o_null,
                "dexterity": número_o_null,
                "constitution": número_o_null,
                "intelligence": número_o_null,
                "wisdom": número_o_null,
                "charisma": número_o_null
            }},
            "saving_throws": {{
                "strength": true_o_false,
                "dexterity": true_o_false,
                "constitution": true_o_false,
                "intelligence": true_o_false,
                "wisdom": true_o_false,
                "charisma": true_o_false
            }},
            "skills": {{
                "acrobatics": {{"proficient": bool, "expertise": bool}},
                "animal_handling": {{"proficient": bool, "expertise": bool}},
                "arcana": {{"proficient": bool, "expertise": bool}},
                "athletics": {{"proficient": bool, "expertise": bool}},
                "deception": {{"proficient": bool, "expertise": bool}},
                "history": {{"proficient": bool, "expertise": bool}},
                "insight": {{"proficient": bool, "expertise": bool}},
                "intimidation": {{"proficient": bool, "expertise": bool}},
                "investigation": {{"proficient": bool, "expertise": bool}},
                "medicine": {{"proficient": bool, "expertise": bool}},
                "nature": {{"proficient": bool, "expertise": bool}},
                "perception": {{"proficient": bool, "expertise": bool}},
                "performance": {{"proficient": bool, "expertise": bool}},
                "persuasion": {{"proficient": bool, "expertise": bool}},
                "religion": {{"proficient": bool, "expertise": bool}},
                "sleight_of_hand": {{"proficient": bool, "expertise": bool}},
                "stealth": {{"proficient": bool, "expertise": bool}},
                "survival": {{"proficient": bool, "expertise": bool}}
            }},
            "ac": número_o_null,
            "hp_max": número_o_null,
            "hp_current": número_o_null,
            "hp_temporary": número_o_null,
            "proficiency_bonus": número_o_null,
            "initiative": número_o_null,
            "speed": número_o_null,
            "hit_dice": "texto_o_null",
            "passive_perception": número_o_null,
            "inspiration": bool,
            "attacks": [
                {{"name": "nombre", "attack_bonus": "+N", "damage": "XdY+Z", "damage_type": "tipo"}}
            ],
            "equipment": "texto_o_null",
            "currency": {{"cp": 0, "sp": 0, "ep": 0, "gp": 0, "pp": 0}},
            "personality_traits": "texto_o_null",
            "ideals": "texto_o_null",
            "bonds": "texto_o_null",
            "flaws": "texto_o_null",
            "features_traits": "texto_o_null",
            "other_proficiencies": "texto_o_null",
            "spellcasting_class": "texto_o_null",
            "spellcasting_ability": "texto_o_null",
            "spell_save_dc": número_o_null,
            "spell_attack_bonus": número_o_null,
            "cantrips": ["nombre1", "nombre2"],
            "spells": ["nombre1", "nombre2"],
            "age": "texto_o_null",
            "height": "texto_o_null",
            "weight": "texto_o_null",
            "eyes": "texto_o_null",
            "skin": "texto_o_null",
            "hair": "texto_o_null",
            "backstory": "texto_o_null",
            "confidence": 0.85,
            "warnings": []
        }}
        """
        
        # Intentar generar respuesta con fallback automático en caso de cuota agotada
        max_processing_retries = len(vision_svc.vision_models)
        for attempt in range(max_processing_retries):
            try:
                logger.info(f"Attempt {attempt + 1} to process with {vision_svc.current_model_name}")
                gemini_response = model.generate_content(prompt)
                response_text = gemini_response.text
                break
            except Exception as e:
                error_str = str(e)
                error_type = str(type(e).__name__)
                is_quota_error = "429" in error_str or "ResourceExhausted" in error_type or "quota" in error_str.lower()
                is_model_not_found = "404" in error_str or "not found" in error_str.lower() or "not supported" in error_str.lower()
                is_permission_denied = "403" in error_str or "PermissionDenied" in error_type or "denied access" in error_str.lower()
                
                if (is_quota_error or is_model_not_found or is_permission_denied) and attempt < max_processing_retries - 1:
                    logger.warning(f"⚠️ Error on {vision_svc.current_model_name}, rotating...")
                    vision_svc.exhausted_models.add(vision_svc.current_model_name)
                    if vision_svc._rotate_model_on_quota_error():
                        model = vision_svc.current_model
                        continue
                
                logger.error(f"❌ Error processing: {error_str[:200]}")
                raise
        
        # Limpiar respuesta (puede tener ```json ... ```)
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        extracted_data = json.loads(response_text)
        logger.info("✅ Datos extraídos con éxito")
        
        # Construir saving_throws en formato del schema ({stat: {proficient: bool}})
        raw_st = extracted_data.get("saving_throws", {})
        saving_throws = {}
        for stat in ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]:
            if isinstance(raw_st.get(stat), bool):
                saving_throws[stat] = {"proficient": raw_st[stat]}
            elif isinstance(raw_st.get(stat), dict):
                saving_throws[stat] = raw_st[stat]
            else:
                saving_throws[stat] = {"proficient": False}
        
        # Construir skills en formato del schema ({skill: {proficient: bool, expertise: bool}})
        raw_skills = extracted_data.get("skills", {})
        skills = {}
        for skill_name in [
            "acrobatics", "animal_handling", "arcana", "athletics",
            "deception", "history", "insight", "intimidation",
            "investigation", "medicine", "nature", "perception",
            "performance", "persuasion", "religion", "sleight_of_hand",
            "stealth", "survival"
        ]:
            if isinstance(raw_skills.get(skill_name), dict):
                skills[skill_name] = {
                    "proficient": raw_skills[skill_name].get("proficient", False),
                    "expertise": raw_skills[skill_name].get("expertise", False),
                }
            else:
                skills[skill_name] = {"proficient": False, "expertise": False}
        
        # Construir attacks (normalizar a 3 filas mínimo)
        raw_attacks = extracted_data.get("attacks", [])
        attacks = []
        if isinstance(raw_attacks, list):
            for atk in raw_attacks:
                if isinstance(atk, dict) and atk.get("name"):
                    attacks.append({
                        "name": atk.get("name", ""),
                        "attack_bonus": atk.get("attack_bonus", "+0"),
                        "damage": atk.get("damage", ""),
                        "damage_type": atk.get("damage_type", ""),
                    })
        while len(attacks) < 3:
            attacks.append({"name": "", "attack_bonus": "+0", "damage": "", "damage_type": ""})
        
        # Construir currency
        raw_currency = extracted_data.get("currency", {})
        currency = {
            "cp": int(raw_currency.get("cp", 0) or 0),
            "sp": int(raw_currency.get("sp", 0) or 0),
            "ep": int(raw_currency.get("ep", 0) or 0),
            "gp": int(raw_currency.get("gp", 0) or 0),
            "pp": int(raw_currency.get("pp", 0) or 0),
        }
        
        # Construir spellcasting
        spellcasting = {
            "class": extracted_data.get("spellcasting_class") or "",
            "ability": extracted_data.get("spellcasting_ability") or "",
            "save_dc": extracted_data.get("spell_save_dc") or 0,
            "attack_bonus": extracted_data.get("spell_attack_bonus") or 0,
            "slots": {str(lvl): {"total": 0, "used": 0} for lvl in range(1, 10)},
            "cantrips": extracted_data.get("cantrips") or [],
            "spells": extracted_data.get("spells") or [],
        }
        
        return {
            "success": True,
            "message": "Datos extraídos correctamente con OCR + Gemini",
            "data": {
                # Identificación
                "character_name": extracted_data.get("name"),
                "race": extracted_data.get("race"),
                "class": extracted_data.get("class_name"),
                "subclass": extracted_data.get("subclass"),
                "level": extracted_data.get("level"),
                "background": extracted_data.get("background"),
                "alignment": extracted_data.get("alignment"),
                "experience_points": extracted_data.get("experience_points"),
                "player_name": extracted_data.get("player_name"),
                
                # Stats
                "stats": extracted_data.get("stats", {}),
                
                # Combate
                "hp_max": extracted_data.get("hp_max"),
                "hp_current": extracted_data.get("hp_current"),
                "hp_temporary": extracted_data.get("hp_temporary"),
                "armor_class": extracted_data.get("ac"),
                "proficiency_bonus": extracted_data.get("proficiency_bonus"),
                "initiative": extracted_data.get("initiative"),
                "speed": extracted_data.get("speed"),
                "hit_dice": extracted_data.get("hit_dice"),
                "passive_perception": extracted_data.get("passive_perception"),
                "inspiration": extracted_data.get("inspiration", False),
                
                # Saving throws y skills (estructurados)
                "saving_throws": saving_throws,
                "skills": skills,
                
                # Ataques
                "attacks": attacks,
                
                # Equipo
                "equipment": extracted_data.get("equipment"),
                "currency": currency,
                
                # Personalidad
                "personality_traits": extracted_data.get("personality_traits"),
                "ideals": extracted_data.get("ideals"),
                "bonds": extracted_data.get("bonds"),
                "flaws": extracted_data.get("flaws"),
                
                # Rasgos
                "features_traits": extracted_data.get("features_traits"),
                "other_proficiencies": extracted_data.get("other_proficiencies"),
                
                # Spellcasting
                "spellcasting": spellcasting,
                
                # Apariencia
                "age": extracted_data.get("age"),
                "height": extracted_data.get("height"),
                "weight": extracted_data.get("weight"),
                "eyes": extracted_data.get("eyes"),
                "skin": extracted_data.get("skin"),
                "hair": extracted_data.get("hair"),
                "backstory": extracted_data.get("backstory"),
                
                # Metadata
                "confidence": extracted_data.get("confidence", 0.85),
                "low_confidence_fields": extracted_data.get("warnings", []),
                "unreadable_fields": []
            }
        }
        
    except json.JSONDecodeError as e:
        logger.error(f"❌ Error parsing Gemini JSON response: {str(e)}")
        return {
            "success": False,
            "message": "Error al procesar respuesta de IA",
            "data": None
        }
    except Exception as e:
        error_str = str(e)
        error_type = str(type(e).__name__)
        
        # Detectar error de cuota agotada y devolver respuesta amigable
        is_quota = "429" in error_str or "ResourceExhausted" in error_type or "quota" in error_str.lower()
        is_access = "403" in error_str or "PermissionDenied" in error_type
        is_not_found = "404" in error_str and "not found" in error_str.lower()
        
        if is_quota or is_access or is_not_found:
            # Extraer retry delay si existe
            retry_match = re.search(r'retry in ([\d.]+)s', error_str)
            retry_seconds = int(float(retry_match.group(1))) if retry_match else 60
            
            logger.warning(f"⚠️ Todos los modelos agotados. Reintentar en {retry_seconds}s")
            
            # Resetear modelos agotados para el próximo intento
            vision_svc = get_vision_service()
            vision_svc.exhausted_models.clear()
            vision_svc.current_model = None
            vision_svc.current_model_name = None
            
            return {
                "success": False,
                "message": f"⏳ Cuota de IA agotada temporalmente. Intenta de nuevo en {retry_seconds} segundos.",
                "retry_after_seconds": retry_seconds,
                "data": None
            }
        
        logger.error(f"❌ Error en digitize_character_sheet: {error_str}", exc_info=True)
        raise HTTPException(status_code=500, detail=error_str)
