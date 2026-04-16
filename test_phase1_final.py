#!/usr/bin/env python3
"""
Phase 1 Tests - with better debugging
"""
import requests
import time
import sys

BACKEND_URL = "http://localhost:8000"
TIMEOUT = 30  # Aumentado a 30 segundos

print("=" * 70)
print("PHASE 1 COMPLETE TESTS")
print("=" * 70)

tests_passed = 0
tests_failed = 0

# Test 1: Health Check
print("\n[1/5] Health Check...")
try:
    start = time.time()
    r = requests.get(f"{BACKEND_URL}/api/dnd5e/search?q=test", timeout=5)
    elapsed = time.time() - start
    assert r.status_code == 200
    print(f"    ✓ PASS ({elapsed:.2f}s)")
    tests_passed += 1
except Exception as e:
    print(f"    ✗ FAIL: {e}")
    tests_failed += 1

# Test 2: Search Items
print("\n[2/5] Search Items (sword)...")
try:
    start = time.time()
    r = requests.get(f"{BACKEND_URL}/api/dnd5e/search?q=sword", timeout=20)
    elapsed = time.time() - start
    data = r.json()
    results = data.get("results", [])
    assert len(results) > 0
    print(f"    ✓ PASS: {len(results)} items ({elapsed:.2f}s)")
    for item in results[:2]:
        print(f"      - {item['name']} ({item['score']}%)")
    tests_passed += 1
except Exception as e:
    print(f"    ✗ FAIL: {e}")
    tests_failed += 1

# Test 3: Local Analysis - Simple Note
print("\n[3/5] Local Analysis - Simple Note...")
try:
    start = time.time()
    r = requests.post(
        f"{BACKEND_URL}/api/dnd5e/analyze-note",
        json={"content": "We found a longsword, a shield and a healing potion."},
        timeout=TIMEOUT
    )
    elapsed = time.time() - start
    data = r.json()
    items = data.get("detected_items", [])
    print(f"    Time: {elapsed:.2f}s")
    print(f"    Items: {len(items)}")
    for item in items:
        print(f"      - {item['name']} ({item.get('confidence', 0)}%)")
    assert len(items) > 0, "Should detect at least 1 item"
    print(f"    ✓ PASS")
    tests_passed += 1
except Exception as e:
    print(f"    ✗ FAIL: {e}")
    tests_failed += 1

# Test 4: Local Analysis - Complex Note
print("\n[4/5] Local Analysis - Complex Note...")
try:
    note = """
    At the tavern, Gandalf equipped us with:
    - A silver spear
    - Leather armor
    - A poisoned dagger
    - Speed boots
    
    Then we found a dragon guarding a chest full of coins.
    There was also a mysterious ring.
    """
    start = time.time()
    r = requests.post(
        f"{BACKEND_URL}/api/dnd5e/analyze-note",
        json={"content": note},
        timeout=TIMEOUT
    )
    elapsed = time.time() - start
    data = r.json()
    items = data.get("detected_items", [])
    print(f"    Time: {elapsed:.2f}s")
    print(f"    Items: {len(items)}")
    for item in items[:5]:
        print(f"      - {item['name']} ({item.get('confidence', 0)}%)")
    print(f"    ✓ PASS")
    tests_passed += 1
except Exception as e:
    print(f"    ✗ FAIL: {e}")
    tests_failed += 1

# Test 5: NPC Detection
print("\n[5/5] NPC Detection...")
try:
    r = requests.post(
        f"{BACKEND_URL}/api/dnd5e/analyze-note",
        json={"content": "Conocimos a Aragorn el Ranger y a Legolas. También a Grímnir el Enano."},
        timeout=TIMEOUT
    )
    data = r.json()
    npcs = data.get("detected_npcs", [])
    print(f"    NPCs: {len(npcs)}")
    for npc in npcs[:5]:
        print(f"      - {npc['name']} ({npc.get('confidence', 0)}%)")
    print(f"    ✓ PASS")
    tests_passed += 1
except Exception as e:
    print(f"    ✗ FAIL: {e}")
    tests_failed += 1
    import traceback
    traceback.print_exc()

# Summary
print("\n" + "=" * 70)
print(f"RESULTS: {tests_passed} passed, {tests_failed} failed")
print("=" * 70)

if tests_failed > 0:
    sys.exit(1)
