"""
Phase 0 Test Suite - Windows Compatible (No emojis)
"""
import requests
import json
import time

BASE_URL = "http://localhost:8000"
results = {"passed": 0, "failed": 0}

def test_section(name):
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print('='*60)

def test_result(passed, message=""):
    global results
    if passed:
        print(f"[PASS] {message}" if message else "[PASS]")
        results["passed"] += 1
    else:
        print(f"[FAIL] {message}" if message else "[FAIL]")
        results["failed"] += 1

print("\n" + "="*60)
print("DUNGEON ASSISTANT - PHASE 0 TEST SUITE")
print("="*60)
print(f"Target: {BASE_URL}\n")

# === HEALTH CHECK ===
test_section("Backend Health Check")
try:
    response = requests.get(f"{BASE_URL}/health", timeout=5)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Service: {data.get('service')}")
    test_result(response.status_code == 200, "Health check OK")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Health check FAILED")

# === SEARCH: Exact Match ===
test_section("Search: Items - Exact Match for 'sword'")
try:
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "sword", "limit": 5},
        timeout=10
    )
    data = response.json()
    count = data.get("count", 0)
    print(f"Status: {response.status_code}")
    print(f"Found {count} results")
    if count > 0:
        for r in data.get("results", [])[:3]:
            print(f"  - {r['name']} ({r['category']}) score={r['score']}")
    test_result(count > 0, f"Found {count} items")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Search failed")

# === SEARCH: Fuzzy Match ===
test_section("Search: Spells - Fuzzy Match for 'fireball'")
try:
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "fireball", "categories": "spells", "limit": 5},
        timeout=10
    )
    data = response.json()
    count = data.get("count", 0)
    print(f"Status: {response.status_code}")
    print(f"Found {count} spell results")
    if count > 0:
        for r in data.get("results", [])[:3]:
            print(f"  - {r['name']} score={r['score']}")
    test_result(count > 0, f"Found {count} spells")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Spell search failed")

# === AUTOCOMPLETE ===
test_section("Autocomplete: Spells with prefix 'fir'")
try:
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/autocomplete",
        params={"q": "fir", "categories": "spells", "limit": 5},
        timeout=10
    )
    data = response.json()
    count = data.get("count", 0)
    print(f"Status: {response.status_code}")
    print(f"Found {count} suggestions")
    if count > 0:
        for s in data.get("suggestions", [])[:5]:
            print(f"  - {s['label']} ({s['category']})")
    test_result(count > 0, f"Got {count} autocomplete suggestions")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Autocomplete failed")

# === ANALYZE NOTE ===
test_section("Analyze Note: Detect items and spells")
try:
    note_content = "Los aventureros encontraron una espada y aprendieron fireball"
    response = requests.post(
        f"{BASE_URL}/api/dnd5e/analyze-note",
        json={"content": note_content},
        timeout=10
    )
    data = response.json()
    print(f"Status: {response.status_code}")
    items = data.get("detected_items", [])
    spells = data.get("detected_spells", [])
    print(f"Detected {len(items)} items: {[i['name'] for i in items]}")
    print(f"Detected {len(spells)} spells: {[s['name'] for s in spells]}")
    test_result(response.status_code == 200, f"Analysis OK ({len(items)} items, {len(spells)} spells)")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Note analysis failed")

# === PERFORMANCE ===
test_section("Performance: Response time < 1 second")
try:
    start = time.time()
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "sword", "limit": 5},
        timeout=10
    )
    elapsed = (time.time() - start) * 1000
    print(f"Response time: {elapsed:.1f}ms")
    test_result(elapsed < 1000, f"Response in {elapsed:.0f}ms")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Performance test failed")

# === INTEGRATION ===
test_section("Integration: Search -> Autocomplete -> Analyze")
try:
    # Search
    search_response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "long sword", "categories": "items", "limit": 3},
        timeout=10
    )
    search_ok = search_response.status_code == 200
    print(f"1. Search: {search_response.json().get('count')} results found")
    
    # Autocomplete
    auto_response = requests.get(
        f"{BASE_URL}/api/dnd5e/autocomplete",
        params={"q": "lon", "categories": "items", "limit": 3},
        timeout=10
    )
    auto_ok = auto_response.status_code == 200
    print(f"2. Autocomplete: {auto_response.json().get('count')} suggestions")
    
    # Analyze
    analyze_response = requests.post(
        f"{BASE_URL}/api/dnd5e/analyze-note",
        json={"content": "The party found a long sword and cast fireball"},
        timeout=10
    )
    analyze_ok = analyze_response.status_code == 200
    items = analyze_response.json().get("detected_items", [])
    print(f"3. Analyze: {len(items)} items detected")
    
    test_result(search_ok and auto_ok and analyze_ok, "Full workflow OK")
except Exception as e:
    print(f"Error: {e}")
    test_result(False, "Integration test failed")

# === SUMMARY ===
print("\n" + "="*60)
print("TEST SUMMARY")
print("="*60)
total = results['passed'] + results['failed']
print(f"Passed: {results['passed']}")
print(f"Failed: {results['failed']}")
if total > 0:
    pass_rate = (results['passed'] / total * 100)
    print(f"Pass Rate: {pass_rate:.1f}%")
else:
    print("Pass Rate: N/A")
print("="*60)

if results['failed'] == 0:
    print("\nAll tests passed! Phase 0 is working correctly.")
else:
    print(f"\nSome tests failed: {results['failed']} failures.")
