"""
Servicio de búsqueda D&D5e con Fuzzy Matching
Busca items, hechizos, clases, razas, etc. localmente sin usar Gemini
"""

import json
import os
import logging
from pathlib import Path
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

logger = logging.getLogger(__name__)


class DND5ESearcher:
    """Búsqueda fuzzy local para datos D&D5e"""

    def __init__(self):
        """Inicializar pero NO cargar datos hasta la primera búsqueda (lazy loading)"""
        # Ruta: backend/services/dnd5e_search.py -> parent.parent.parent = raiz -> frontend/src/data
        self.data_path = Path(__file__).parent.parent.parent / "frontend" / "src" / "data"
        self.cache = {}
        self._loaded = False
        logger.info(f"DND5ESearcher initialized (lazy loading from {self.data_path})")

    def _ensure_loaded(self):
        """Lazy load: cargar datos solo si no están cargados"""
        if self._loaded:
            return
        logger.info(f"Loading D&D5e data on first use...")
        self._load_all_data()
        self._loaded = True

    def _load_all_data(self):
        """Cargar todos los JSONs disponibles"""
        json_files = {
            "items": "items.json",
            "classes": "classes.json",
            "races": "races.json",
            "feats": "dnd-feats.json",
            "spells": "dnd-classes.json",  # TODO: cambiar a archivo de spells cuando disponible
            "backgrounds": "backgrounds.json",
            "subclasses": "dnd-subclasses.json",
            "traits": "dnd-traits.json",
        }

        for key, filename in json_files.items():
            filepath = self.data_path / filename
            if filepath.exists():
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    
                    # Handle nested structure
                    if isinstance(data, dict):
                        if key in data:
                            self.cache[key] = data[key]
                        elif "results" in data:
                            # API response format
                            self.cache[key] = data["results"]
                        else:
                            self.cache[key] = data
                    else:
                        self.cache[key] = data
                    
                    entry_count = len(self.cache[key]) if isinstance(self.cache[key], list) else len(self.cache[key])
                    logger.info(f"Loaded {key}: {filename} ({entry_count} entries)")
                except Exception as e:
                    logger.error(f"Error loading {filename}: {e}")
            else:
                logger.warning(f"File not found: {filepath}")

    def search(self, query: str, categories: list = None, limit: int = 5) -> list:
        """
        Búsqueda fuzzy en categorías específicas o todas.
        
        Args:
            query: Término de búsqueda (ej: "sword", "fireball")
            categories: Lista de categorías (ej: ["items", "spells"]) o None para todas
            limit: Cantidad de resultados
        
        Returns:
            Lista de resultados con score de similitud
        """
        self._ensure_loaded()
        
        if not categories:
            categories = list(self.cache.keys())

        query_lower = query.lower()
        results = []

        for category in categories:
            if category not in self.cache:
                logger.warning(f"Category {category} not found")
                continue

            data = self.cache[category]
            candidates = self._extract_names(data, category)

            if not candidates:
                continue

            # Fuzzy matching con fuzzywuzzy
            matches = process.extract(
                query_lower,
                candidates,
                scorer=fuzz.token_set_ratio,
                limit=limit
            )

            for match_name, score in matches:
                if score >= 60:  # Solo resultados con 60% similitud o más
                    results.append({
                        "name": match_name,
                        "category": category,
                        "score": score,
                        "data": self._get_full_data(category, match_name)
                    })

        # Ordenar por score descendente
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:limit]

    def _extract_names(self, data: list, category: str) -> list:
        """Extraer nombres de items/spells/etc según categoría"""
        names = []

        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    # Intentar varios campos comunes de nombre
                    name = (
                        item.get("name") or
                        item.get("title") or
                        item.get("index") or
                        ""
                    )
                    if name:
                        names.append(name.lower())
        elif isinstance(data, dict):
            # Si es diccionario, obtener las llaves como nombres
            for key in data.keys():
                names.append(key.lower())

        return names

    def _get_full_data(self, category: str, name: str) -> dict:
        """Obtener datos completos de un item/spell/etc"""
        data = self.cache.get(category, [])

        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    item_name = (
                        item.get("name") or
                        item.get("title") or
                        item.get("index") or
                        ""
                    ).lower()
                    if item_name == name.lower():
                        return item
        elif isinstance(data, dict):
            if name.lower() in data or name in data:
                return data.get(name, {})

        return {}

    def analyze_note(self, note_content: str) -> dict:
        """
        Analizar nota buscando items, hechizos, etc.
        Retorna items y hechizos detectados sin usar Gemini.
        """
        self._ensure_loaded()
        logger.info("Analyzing note for D&D5e entities...")

        words = note_content.lower().split()
        detected_items = []
        detected_spells = []

        # Buscar cada palabra en items y spells
        for word in set(words):
            if len(word) < 3:  # Ignorar palabras muy cortas
                continue

            # Buscar en items
            item_results = self.search(word, categories=["items"], limit=1)
            if item_results and item_results[0]["score"] >= 70:
                detected_items.append({
                    "name": item_results[0]["name"],
                    "confidence": item_results[0]["score"]
                })

            # Buscar en hechizos
            spell_results = self.search(word, categories=["spells"], limit=1)
            if spell_results and spell_results[0]["score"] >= 70:
                detected_spells.append({
                    "name": spell_results[0]["name"],
                    "confidence": spell_results[0]["score"]
                })

        # Remover duplicados manteniendo el de mayor score
        detected_items = self._deduplicate(detected_items)
        detected_spells = self._deduplicate(detected_spells)

        logger.info(f"Detected {len(detected_items)} items and {len(detected_spells)} spells")
        return {
            "detected_items": detected_items,
            "detected_spells": detected_spells
        }

    def _deduplicate(self, items: list) -> list:
        """Remover duplicados por nombre, manteniendo el de mayor score"""
        seen = {}
        for item in items:
            name = item["name"].lower()
            if name not in seen or item["confidence"] > seen[name]["confidence"]:
                seen[name] = item
        return list(seen.values())


def get_dnd5e_searcher() -> DND5ESearcher:
    """Factory para obtener instancia del buscador"""
    return DND5ESearcher()
