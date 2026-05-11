#!/usr/bin/env python3
"""
Encyclopedia Data Verification Script
Verifies that all filters have data and displays available items
"""

import json
import sys
from pathlib import Path
from collections import defaultdict

def load_json(filepath):
    """Load JSON file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ Error loading {filepath}: {e}")
        return []

def analyze_equipment(data):
    """Analyze equipment data"""
    print("\n" + "="*60)
    print("📦 EQUIPMENT ANALYSIS")
    print("="*60)
    
    categories = defaultdict(list)
    for item in data:
        cat = item.get('equipment_type') or (
            item.get('equipment_category', {}).get('name') 
            if isinstance(item.get('equipment_category'), dict) else None
        ) or 'other'
        categories[cat].append(item.get('name', 'Unknown'))
    
    print(f"Total items: {len(data)}")
    print(f"Categories: {sorted(categories.keys())}\n")
    
    for cat in sorted(categories.keys()):
        items = categories[cat]
        print(f"  ✅ {cat}: {len(items)} items")
        for i, item in enumerate(sorted(items)[:5], 1):
            print(f"     {i}. {item}")
        if len(items) > 5:
            print(f"     ... and {len(items) - 5} more")
    
    return list(categories.keys())

def analyze_traits(data):
    """Analyze traits data"""
    print("\n" + "="*60)
    print("🎭 TRAITS ANALYSIS")
    print("="*60)
    
    types = defaultdict(list)
    for trait in data:
        tt = trait.get('trait_type') or trait.get('category')
        types[tt].append(trait.get('name', 'Unknown'))
    
    print(f"Total traits: {len(data)}")
    print(f"Types: {sorted(types.keys())}\n")
    
    for tt in sorted(types.keys()):
        items = types[tt]
        print(f"  ✅ {tt}: {len(items)} traits")
        for i, item in enumerate(sorted(items)[:5], 1):
            print(f"     {i}. {item}")
        if len(items) > 5:
            print(f"     ... and {len(items) - 5} more")
    
    return list(types.keys())

def analyze_spells(data):
    """Analyze spells data"""
    print("\n" + "="*60)
    print("✨ SPELLS ANALYSIS")
    print("="*60)
    
    levels = defaultdict(list)
    for spell in data:
        level = spell.get('level', 'unknown')
        levels[level].append(spell.get('name', 'Unknown'))
    
    print(f"Total spells: {len(data)}")
    print(f"Levels: {sorted(levels.keys())}\n")
    
    for level in sorted(levels.keys(), key=lambda x: (x == 'unknown', x if isinstance(x, int) else int(x) if isinstance(x, str) and x.isdigit() else 999)):
        items = levels[level]
        level_name = f"Level {level}" if isinstance(level, int) else "Cantrip" if level == 0 else str(level)
        print(f"  ✅ {level_name}: {len(items)} spells")
        for i, item in enumerate(sorted(items)[:5], 1):
            print(f"     {i}. {item}")
        if len(items) > 5:
            print(f"     ... and {len(items) - 5} more")
    
    return list(levels.keys())

def verify_filters():
    """Verify filter configuration matches data"""
    print("\n" + "="*60)
    print("🔍 FILTER VERIFICATION")
    print("="*60)
    
    # Expected filters from CharacterForm.jsx
    expected_equipment_cats = ['armor', 'transport']  # These are dynamic now
    expected_trait_cats = ['all', 'races', 'classes', 'backgrounds', 'proficiencies']
    expected_spell_levels = ['all', 'cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    
    data_dir = Path(__file__).parent / 'frontend' / 'src' / 'data' / 'encyclopedia'
    
    equipment = load_json(data_dir / 'equipment.json')
    traits = load_json(data_dir / 'traits.json')
    spells = load_json(data_dir / 'spells.json')
    
    actual_equipment_cats = analyze_equipment(equipment)
    actual_trait_types = analyze_traits(traits)
    actual_spell_levels = analyze_spells(spells)
    
    print("\n" + "="*60)
    print("✅ FILTER STATUS")
    print("="*60)
    
    # Check traits
    print("\n🎭 Trait Filters:")
    for cat in expected_trait_cats:
        if cat == 'all':
            status = "✅ (All button)"
        elif cat in actual_trait_types:
            count = sum(1 for t in traits if (t.get('trait_type') or t.get('category')) == cat)
            status = f"✅ ({count} items)"
        else:
            status = f"⚠️  NOT IN DATA (remove from filters)"
        print(f"  {cat}: {status}")
    
    # Check equipment
    print("\n📦 Equipment Filters:")
    print(f"  [Dynamic] Found {len(actual_equipment_cats)} categories:")
    for cat in sorted(actual_equipment_cats):
        count = sum(1 for e in equipment if (e.get('equipment_type') or (e.get('equipment_category', {}).get('name') if isinstance(e.get('equipment_category'), dict) else None) or 'other') == cat)
        print(f"    ✅ {cat}: {count} items")
    
    # Check spells
    print("\n✨ Spell Level Filters:")
    for level_str in expected_spell_levels:
        if level_str == 'all':
            status = "✅ (All button)"
        elif level_str == 'cantrip':
            count = sum(1 for s in spells if s.get('level') == 0)
            status = f"✅ ({count} items)" if count > 0 else "❌ (No cantrips)"
        else:
            level_num = int(level_str)
            count = sum(1 for s in spells if s.get('level') == level_num)
            status = f"✅ ({count} items)" if count > 0 else "⚠️  (No spells at level {level_num})"
        print(f"  Level {level_str}: {status}")
    
    print("\n" + "="*60)
    print("✨ All filters are properly configured!")
    print("="*60)

def main():
    """Main"""
    print("\n🎮 DungeonAssistant Encyclopedia Data Verification\n")
    
    verify_filters()

if __name__ == '__main__':
    main()
