#!/usr/bin/env python3
"""
Script para redistribuir datos en la enciclopedia.
Asegura que cada filtro tenga al menos 3-5 elementos randomizando la asignación.
"""

import json
import os
import random
from collections import defaultdict
from copy import deepcopy

encyclopedia_dir = "/home/fr/Escritorio/TestDungeonAssistant-Diccionario_a_mano/frontend/src/data/encyclopedia"

def redistribute_by_category(file_path, category_key, min_items=3, max_items=5):
    """Redistribuye items de un archivo JSON entre categorías para asegurar cantidad mínima"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Obtener todas las categorías únicas
    categories = set()
    for item in data:
        cat = item.get(category_key)
        if cat:
            categories.add(cat)
    
    print(f"\n📊 Analizando {os.path.basename(file_path)} - Categoría: {category_key}")
    print(f"   Categorías encontradas: {len(categories)}")
    print(f"   Total items: {len(data)}")
    
    # Contar items por categoría
    category_counts = defaultdict(int)
    category_items = defaultdict(list)
    
    for item in data:
        cat = item.get(category_key)
        if cat:
            category_counts[cat] += 1
            category_items[cat].append(item)
    
    # Encontrar categorías con pocos items
    low_categories = {cat: count for cat, count in category_counts.items() if count < min_items}
    
    if low_categories:
        print(f"   ⚠️  Categorías con <{min_items} items: {len(low_categories)}")
        for cat, count in sorted(low_categories.items(), key=lambda x: x[1]):
            print(f"      - {cat}: {count} items")
    else:
        print(f"   ✅ Todas las categorías tienen ≥{min_items} items")
        return None
    
    # Redistribuir items
    print(f"\n   🔄 Redistribuyendo items...")
    
    # Obtener items que no pertenecen a categorías deficitarias
    available_items = []
    fixed_items = []
    
    for item in data:
        cat = item.get(category_key)
        if cat in low_categories:
            fixed_items.append(item)
        else:
            available_items.append(item)
    
    # Crear nueva distribución
    new_data = []
    
    # Añadir todos los items "fijos"
    for item in fixed_items:
        new_data.append(item)
    
    # Redistribuir items disponibles para llenar categorías deficitarias
    random.shuffle(available_items)
    item_index = 0
    
    for category in low_categories:
        current_count = category_counts[category]
        needed = random.randint(min_items, max_items) - current_count
        
        for _ in range(needed):
            if item_index < len(available_items):
                item = deepcopy(available_items[item_index])
                item[category_key] = category
                new_data.append(item)
                item_index += 1
    
    # Añadir items restantes
    while item_index < len(available_items):
        new_data.append(available_items[item_index])
        item_index += 1
    
    # Verificar nueva distribución
    new_counts = defaultdict(int)
    for item in new_data:
        cat = item.get(category_key)
        if cat:
            new_counts[cat] += 1
    
    print(f"\n   ✅ Nueva distribución:")
    for cat in sorted(new_counts.keys()):
        print(f"      - {cat}: {new_counts[cat]} items")
    
    return new_data

# Configurar redistribuciones para cada archivo
redistribution_config = {
    "traits.json": ("category", 3, 5),
    "spells.json": ("school", 3, 5),
    "equipment.json": ("category", 3, 5),
    "monsters.json": ("type", 3, 5),
}

print("="*70)
print("🎲 ANALIZANDO Y REDISTRIBUYENDO ENCICLOPEDIA")
print("="*70)

for file_name, (category_key, min_items, max_items) in redistribution_config.items():
    file_path = os.path.join(encyclopedia_dir, file_name)
    
    if not os.path.exists(file_path):
        print(f"❌ {file_name} no encontrado")
        continue
    
    new_data = redistribute_by_category(file_path, category_key, min_items, max_items)
    
    if new_data:
        # Guardar archivo actualizado
        backup_path = file_path + ".backup"
        os.rename(file_path, backup_path)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, indent=2, ensure_ascii=False)
        
        print(f"   💾 Guardado: {file_name}")
        print(f"   📦 Backup: {os.path.basename(backup_path)}")

print("\n" + "="*70)
print("✅ REDISTRIBUCIÓN COMPLETADA")
print("="*70)
