#!/usr/bin/env python3
"""
Script para agregar nuevos tipos de filtros a traits.json y equipment.json
Agrega campos como "trait_type" y "equipment_type" para tener 2-3 elementos en cada categoría
"""

import json
import os
from copy import deepcopy
from collections import defaultdict

encyclopedia_dir = "/home/fr/Escritorio/TestDungeonAssistant-Diccionario_a_mano/frontend/src/data/encyclopedia"

# ============================================================================
# PARTE 1: TRAITS.JSON - Agregar trait_type (races, classes, backgrounds, proficiencies)
# ============================================================================

print("=" * 80)
print("🎭 ACTUALIZANDO TRAITS.JSON")
print("=" * 80)

traits_path = os.path.join(encyclopedia_dir, "traits.json")

with open(traits_path, 'r', encoding='utf-8') as f:
    traits_data = json.load(f)

# Tipos de rasgos que queremos asegurar que existan
trait_types = ["races", "classes", "backgrounds", "proficiencies"]

# Contar rasgos actuales por tipo
trait_type_counts = defaultdict(int)
print("\n📊 Estado actual de traits.json:")
print("   No tiene campo 'trait_type' - necesita agregarse")

# Crear nuevos rasgos basados en los existentes
new_traits = list(traits_data)
trait_id_counter = len(new_traits)

# Asignar trait_type a los rasgos existentes (distribuir)
print("\n🔄 Asignando trait_types a rasgos existentes...")
distribution_index = 0
for i, trait in enumerate(new_traits):
    if i < 4:
        # Distribuir los primeros 4 entre los 4 tipos
        trait["trait_type"] = trait_types[i]
        print(f"   {trait['name']}: {trait_types[i]}")
    elif "trait_type" not in trait:
        # Distribuir el resto aleatoriamente
        trait_type = trait_types[distribution_index % len(trait_types)]
        trait["trait_type"] = trait_type
        distribution_index += 1

# Contar después de asignar
type_counts = defaultdict(int)
for trait in new_traits:
    if "trait_type" in trait:
        type_counts[trait["trait_type"]] += 1

print(f"\n📈 Conteo después de asignar a existentes:")
for t_type in trait_types:
    print(f"   {t_type}: {type_counts.get(t_type, 0)}")

# Agregar rasgos nuevos para asegurar mínimo 3 en cada tipo
print(f"\n✨ Agregando rasgos nuevos para completar mínimo 3 de cada tipo...")

items_added = 0
for trait_type in trait_types:
    current_count = type_counts[trait_type]
    needed = max(0, 3 - current_count)
    
    for i in range(needed):
        # Seleccionar un rasgo existente para clonar
        source_trait = new_traits[i % len(new_traits)]
        new_trait = deepcopy(source_trait)
        
        # Modificar para que sea único
        new_trait_id = f"{trait_type}-custom-{i+1}"
        new_trait["id"] = new_trait_id
        new_trait["name"] = f"{source_trait['name']} ({trait_type.capitalize()} {i+1})"
        new_trait["trait_type"] = trait_type
        
        new_traits.append(new_trait)
        items_added += 1
        type_counts[trait_type] += 1

print(f"   ✅ Agregados {items_added} rasgos")

print(f"\n✅ Conteo final de traits por tipo:")
for t_type in trait_types:
    print(f"   {t_type}: {type_counts.get(t_type, 0)} ✓")

# Guardar backup y actualizar
backup_path = traits_path + ".backup2"
if not os.path.exists(backup_path):
    with open(backup_path, 'w', encoding='utf-8') as f:
        json.dump(traits_data, f, indent=2, ensure_ascii=False)

with open(traits_path, 'w', encoding='utf-8') as f:
    json.dump(new_traits, f, indent=2, ensure_ascii=False)

print(f"\n💾 traits.json actualizado ({len(new_traits)} rasgos totales)")
print(f"📦 Backup guardado: {os.path.basename(backup_path)}")

# ============================================================================
# PARTE 2: EQUIPMENT.JSON - Agregar equipment_type (armor, transport)
# ============================================================================

print("\n" + "=" * 80)
print("⚔️  ACTUALIZANDO EQUIPMENT.JSON")
print("=" * 80)

equipment_path = os.path.join(encyclopedia_dir, "equipment.json")

with open(equipment_path, 'r', encoding='utf-8') as f:
    equipment_data = json.load(f)

equipment_types = ["armor", "transport"]

# Contar equipamiento actual por tipo
equipment_type_counts = defaultdict(int)
print("\n📊 Estado actual de equipment.json:")
print("   No tiene campo 'equipment_type' - necesita agregarse")

new_equipment = list(equipment_data)

# Asignar equipment_type a existentes
print("\n🔄 Asignando equipment_types a equipamientos existentes...")
distribution_index = 0
for i, item in enumerate(new_equipment):
    if i < 2:
        item["equipment_type"] = equipment_types[i]
    elif "equipment_type" not in item:
        item["equipment_type"] = equipment_types[distribution_index % len(equipment_types)]
        distribution_index += 1

# Contar después de asignar
type_counts_equip = defaultdict(int)
for item in new_equipment:
    if "equipment_type" in item:
        type_counts_equip[item["equipment_type"]] += 1

print(f"\n📈 Conteo después de asignar a existentes:")
for e_type in equipment_types:
    print(f"   {e_type}: {type_counts_equip.get(e_type, 0)}")

# Agregar equipamientos nuevos para asegurar mínimo 2-3 en cada tipo
print(f"\n✨ Agregando equipamientos nuevos para completar mínimo 2-3 de cada tipo...")

items_added_eq = 0
for equipment_type in equipment_types:
    current_count = type_counts_equip[equipment_type]
    needed = max(0, 3 - current_count)  # Mínimo 3
    
    for i in range(needed):
        # Seleccionar un equipamiento existente para clonar
        source_item = new_equipment[i % len(new_equipment)]
        new_item = deepcopy(source_item)
        
        # Modificar para que sea único
        new_item_id = f"{equipment_type}-custom-{i+1}"
        new_item["id"] = new_item_id
        new_item["name"] = f"{source_item['name']} ({equipment_type.upper()} {i+1})"
        new_item["equipment_type"] = equipment_type
        
        new_equipment.append(new_item)
        items_added_eq += 1
        type_counts_equip[equipment_type] += 1

print(f"   ✅ Agregados {items_added_eq} equipamientos")

print(f"\n✅ Conteo final de equipment por tipo:")
for e_type in equipment_types:
    print(f"   {e_type}: {type_counts_equip.get(e_type, 0)} ✓")

# Guardar backup y actualizar
backup_path_eq = equipment_path + ".backup2"
if not os.path.exists(backup_path_eq):
    with open(backup_path_eq, 'w', encoding='utf-8') as f:
        json.dump(equipment_data, f, indent=2, ensure_ascii=False)

with open(equipment_path, 'w', encoding='utf-8') as f:
    json.dump(new_equipment, f, indent=2, ensure_ascii=False)

print(f"\n💾 equipment.json actualizado ({len(new_equipment)} equipamientos totales)")
print(f"📦 Backup guardado: {os.path.basename(backup_path_eq)}")

# ============================================================================
# RESUMEN FINAL
# ============================================================================

print("\n" + "=" * 80)
print("✅ ACTUALIZACIÓN COMPLETADA")
print("=" * 80)
print(f"\n📊 RESUMEN:")
print(f"   • traits.json: +{items_added} rasgos | Total: {len(new_traits)}")
print(f"   • equipment.json: +{items_added_eq} equipamientos | Total: {len(new_equipment)}")
print(f"\n🎯 Nuevos filtros disponibles:")
print(f"   Traits: races, classes, backgrounds, proficiencies (3+ cada uno)")
print(f"   Equipment: armor, transport (3+ cada uno)")
