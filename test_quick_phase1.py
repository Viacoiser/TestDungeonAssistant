#!/usr/bin/env python3
"""
Quick Phase 1 Test - Diagnóstico rápido
"""
import requests
import time
import json

BACKEND_URL = "http://localhost:8000"

print("=" * 70)
print("QUICK PHASE 1 TEST")
print("=" * 70)

# Test 1: Health check
print("\n[TEST 1] Health Check...")
try:
    r = requests.get(f"{BACKEND_URL}/api/dnd5e/search?q=test", timeout=5)
    print(f"  ✓ Backend responding (Status {r.status_code})")
except Exception as e:
    print(f"  ✗ Backend not responding: {e}")
    exit(1)

# Test 2: Local search
print("\n[TEST 2] Local Search (sword)...")
try:
    start = time.time()
    r = requests.get(f"{BACKEND_URL}/api/dnd5e/search?q=sword", params={"category": "items"}, timeout=10)
    elapsed = time.time() - start
    data = r.json()
    results = data.get("results", [])
    print(f"  Time: {elapsed:.3f}s")
    print(f"  Results: {len(results)} items")
    for item in results[:2]:
        print(f"    - {item['name']} ({item['score']}%)")
    assert len(results) > 0, "No results found"
    print(f"  ✓ PASS")
except Exception as e:
    print(f"  ✗ FAIL: {e}")

# Test 3: Direct Python search without HTTP
print("\n[TEST 3] Direct Python Search (no HTTP)...")
try:
    from backend.services.dnd5e_search import get_dnd5e_searcher
    
    start = time.time()
    searcher = get_dnd5e_searcher()
    elapsed = time.time() - start
    print(f"  Searcher initialized: {elapsed:.3f}s")
    
    # Test analyze_note directly
    start = time.time()
    result = searcher.analyze_note("We found a longsword and cast fireball")
    elapsed = time.time() - start
    print(f"  Analysis time: {elapsed:.3f}s")
    print(f"  Items detected: {len(result['detected_items'])}")
    print(f"  Spells detected: {len(result['detected_spells'])}")
    print(f"  NPCs detected: {len(result['detected_npcs'])}")
    print(f"  ✓ PASS")
except Exception as e:
    print(f"  ✗ FAIL: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
print("Test diagnostics complete")
