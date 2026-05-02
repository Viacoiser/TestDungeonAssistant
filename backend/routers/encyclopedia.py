"""
Router para Enciclopedia D&D 5e - Bundle unificado
Sirve datos estáticos de D&D compilados
"""

import logging
from fastapi import APIRouter, Query
from typing import Optional, List

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/encyclopedia", tags=["encyclopedia"])


# Datos estáticos de D&D 5e (pre-cargados)
RACES = [
    {"index": "dragonborn", "name": "Dragonborn", "category": "races"},
    {"index": "dwarf", "name": "Dwarf", "category": "races"},
    {"index": "elf", "name": "Elf", "category": "races"},
    {"index": "gnome", "name": "Gnome", "category": "races"},
    {"index": "half-elf", "name": "Half-Elf", "category": "races"},
    {"index": "half-orc", "name": "Half-Orc", "category": "races"},
    {"index": "halfling", "name": "Halfling", "category": "races"},
    {"index": "human", "name": "Human", "category": "races"},
    {"index": "tiefling", "name": "Tiefling", "category": "races"},
]

CLASSES = [
    {"index": "barbarian", "name": "Barbarian", "category": "classes"},
    {"index": "bard", "name": "Bard", "category": "classes"},
    {"index": "cleric", "name": "Cleric", "category": "classes"},
    {"index": "druid", "name": "Druid", "category": "classes"},
    {"index": "fighter", "name": "Fighter", "category": "classes"},
    {"index": "monk", "name": "Monk", "category": "classes"},
    {"index": "paladin", "name": "Paladin", "category": "classes"},
    {"index": "ranger", "name": "Ranger", "category": "classes"},
    {"index": "rogue", "name": "Rogue", "category": "classes"},
    {"index": "sorcerer", "name": "Sorcerer", "category": "classes"},
    {"index": "warlock", "name": "Warlock", "category": "classes"},
    {"index": "wizard", "name": "Wizard", "category": "classes"},
]

SPELLS = [
    {
        "index": "fire-bolt",
        "name": "Fire Bolt",
        "level": 0,
        "school": "Evocation",
        "category": "spells"
    },
    {
        "index": "mage-hand",
        "name": "Mage Hand",
        "level": 0,
        "school": "Conjuration",
        "category": "spells"
    },
    {
        "index": "magic-missile",
        "name": "Magic Missile",
        "level": 1,
        "school": "Evocation",
        "category": "spells"
    },
]

TRAITS = [
    {"index": "darkvision", "name": "Darkvision", "category": "traits"},
    {"index": "breath-weapon", "name": "Breath Weapon", "category": "traits"},
    {"index": "brave", "name": "Brave", "category": "traits"},
]

MONSTERS = [
    {
        "index": "goblin",
        "name": "Goblin",
        "type": "humanoid",
        "challenge_rating": 0.25,
        "category": "monsters"
    },
    {
        "index": "orc",
        "name": "Orc",
        "type": "humanoid",
        "challenge_rating": 0.5,
        "category": "monsters"
    },
]

EQUIPMENT = [
    {"index": "longsword", "name": "Longsword", "type": "weapon", "category": "equipment"},
    {"index": "plate-armor", "name": "Plate Armor", "type": "armor", "category": "equipment"},
    {"index": "shield", "name": "Shield", "type": "armor", "category": "equipment"},
]


@router.get("/bundle", tags=["encyclopedia"])
async def get_encyclopedia_bundle():
    """
    Obtener TODA la enciclopedia de D&D 5e en un único bundle
    
    Idealmente esto se carga UNA SOLA VEZ en la app y se cachea
    No hay sincronización por apartado, es todo-o-nada
    
    Respuesta: ~200KB (muy liviana)
    """
    logger.info("📚 Sirviendo bundle de enciclopedia D&D 5e")
    
    return {
        "status": "success",
        "version": "5e-2024",
        "timestamp": __import__("datetime").datetime.utcnow().isoformat(),
        "data": {
            "races": RACES,
            "classes": CLASSES,
            "spells": SPELLS,
            "traits": TRAITS,
            "monsters": MONSTERS,
            "equipment": EQUIPMENT,
        },
        "counts": {
            "races": len(RACES),
            "classes": len(CLASSES),
            "spells": len(SPELLS),
            "traits": len(TRAITS),
            "monsters": len(MONSTERS),
            "equipment": len(EQUIPMENT),
        }
    }


@router.get("/search", tags=["encyclopedia"])
async def search_encyclopedia(
    q: str = Query(..., min_length=1, max_length=100, description="Término de búsqueda"),
    category: Optional[str] = Query(None, description="Categoría: races, classes, spells, traits, monsters, equipment"),
    limit: int = Query(20, ge=1, le=100, description="Máximo de resultados")
):
    """
    Búsqueda en la enciclopedia D&D 5e
    
    Ejemplo: GET /api/encyclopedia/search?q=fire&category=spells
    """
    query_lower = q.lower()
    results = []
    
    # Categorías disponibles
    categories = {
        "races": RACES,
        "classes": CLASSES,
        "spells": SPELLS,
        "traits": TRAITS,
        "monsters": MONSTERS,
        "equipment": EQUIPMENT,
    }
    
    # Buscar en categoría específica
    if category and category in categories:
        results = [
            item for item in categories[category]
            if query_lower in item.get("name", "").lower()
            or query_lower in item.get("index", "").lower()
        ]
    else:
        # Buscar en todas las categorías
        for cat_name, items in categories.items():
            for item in items:
                if query_lower in item.get("name", "").lower() or query_lower in item.get("index", "").lower():
                    results.append(item)
    
    logger.info(f"🔍 Búsqueda '{q}': {len(results)} resultados")
    
    return {
        "query": q,
        "category": category,
        "results": results[:limit],
        "count": len(results),
        "truncated": len(results) > limit
    }


@router.get("/category/{category}", tags=["encyclopedia"])
async def get_category(category: str):
    """
    Obtener todos los items de una categoría
    
    Categorías: races, classes, spells, traits, monsters, equipment
    """
    categories = {
        "races": RACES,
        "classes": CLASSES,
        "spells": SPELLS,
        "traits": TRAITS,
        "monsters": MONSTERS,
        "equipment": EQUIPMENT,
    }
    
    if category not in categories:
        return {
            "error": f"Categoría '{category}' no encontrada",
            "available": list(categories.keys())
        }
    
    items = categories[category]
    
    logger.info(f"📚 Sirviendo categoría '{category}': {len(items)} items")
    
    return {
        "category": category,
        "count": len(items),
        "items": items
    }


@router.get("/status", tags=["encyclopedia"])
async def encyclopedia_status():
    """
    Estado de la enciclopedia (sin carga de datos)
    """
    return {
        "status": "operational",
        "available_categories": ["races", "classes", "spells", "traits", "monsters", "equipment"],
        "version": "5e-2024",
        "timestamp": __import__("datetime").datetime.utcnow().isoformat(),
        "counts": {
            "races": len(RACES),
            "classes": len(CLASSES),
            "spells": len(SPELLS),
            "traits": len(TRAITS),
            "monsters": len(MONSTERS),
            "equipment": len(EQUIPMENT),
            "total": len(RACES) + len(CLASSES) + len(SPELLS) + len(TRAITS) + len(MONSTERS) + len(EQUIPMENT)
        }
    }
