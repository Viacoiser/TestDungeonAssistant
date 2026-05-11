#!/usr/bin/env python3
import json
import os
from collections import defaultdict

encyclopedia_dir = "/home/fr/Escritorio/TestDungeonAssistant-Diccionario_a_mano/frontend/src/data/encyclopedia"

# Analyze each file
files_to_analyze = {
    "spells.json": ["school", "level"],
    "equipment.json": ["category", "equipment_category"],
    "monsters.json": ["type", "size", "challenge_rating"],
    "traits.json": ["category"]
}

for file_name, filter_keys in files_to_analyze.items():
    file_path = os.path.join(encyclopedia_dir, file_name)
    
    if not os.path.exists(file_path):
        print(f"❌ {file_name} not found")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\n{'='*60}")
    print(f"📋 FILE: {file_name} (Total items: {len(data)})")
    print(f"{'='*60}")
    
    for filter_key in filter_keys:
        counts = defaultdict(int)
        
        for item in data:
            # Handle nested keys like equipment_category
            if "." in filter_key:
                parts = filter_key.split(".")
                value = item
                for part in parts:
                    if isinstance(value, dict):
                        value = value.get(part)
                    else:
                        value = None
                        break
            else:
                value = item.get(filter_key)
            
            if isinstance(value, dict):
                # Get 'name' or 'index' from dict
                value = value.get("name") or value.get("index") or str(value)
            
            if value:
                counts[value] += 1
        
        print(f"\n🔍 Filter: {filter_key}")
        print(f"   Total categories: {len(counts)}")
        
        # Sort by count
        sorted_counts = sorted(counts.items(), key=lambda x: x[1])
        
        # Show categories with 0 (won't show here since we're iterating items)
        # Show categories with 1-2 items
        low_count = [c for c in sorted_counts if c[1] <= 2]
        if low_count:
            print(f"   ⚠️  Categories with ≤2 items: {len(low_count)}")
            for cat, count in low_count:
                print(f"      - {cat}: {count}")
        
        # Show top categories
        print(f"   📊 Top 5 categories:")
        for cat, count in sorted_counts[-5:]:
            print(f"      - {cat}: {count}")
