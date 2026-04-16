#!/usr/bin/env python3
"""
Direct test of searcher - debug why items aren't detected via HTTP
"""
import sys
sys.path.insert(0, '/backend')

from backend.services.dnd5e_search import get_dnd5e_searcher

print("Testing searcher directly...")
print("=" * 70)

searcher = get_dnd5e_searcher()
print("✓ Searcher initialized")

# Test 1: Direct search
print("\n[Test 1] Direct search for 'sword':")
results = searcher.search("sword", categories=["items"], limit=5)
print(f"  Results: {len(results)}")
for r in results[:2]:
    print(f"    - {r['name']} ({r['score']}%)")

# Test 2: analyze_note
print("\n[Test 2] Analyze note: 'Encontramos una espada de acero':")
result = searcher.analyze_note("Encontramos una espada de acero")
print(f"  Items: {result['detected_items']}")
print(f"  Spells: {result['detected_spells']}")
print(f"  NPCs: {result['detected_npcs']}")

# Test 3: Another example
print("\n[Test 3] Analyze note: 'longsword is here':")
result = searcher.analyze_note("longsword is here")
print(f"  Items: {result['detected_items']}")

# Test 4: Spanish test
print("\n[Test 4] Analyze note: 'We found a longsword and cast fireball':")
result = searcher.analyze_note("We found a longsword and cast fireball")
print(f"  Items: {result['detected_items']}")

print("\n" + "=" * 70)
