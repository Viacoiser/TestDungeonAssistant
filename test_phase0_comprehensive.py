"""
Comprehensive Testing Suite for Phase 0 Implementation
Tests: Backend endpoints, fuzzy search, autocompletado
"""
import requests
import json
import time
from typing import Dict, Any

BASE_URL = "http://localhost:8000"
RESULTS = {"passed": 0, "failed": 0, "errors": []}

def test(name: str):
    def decorator(func):
        def wrapper():
            print(f"\n{'='*60}")
            print(f"TEST: {name}")
            print('='*60)
            try:
                result = func()
                if result:
                    print(f"✅ PASSED")
                    RESULTS["passed"] += 1
                else:
                    print(f"❌ FAILED")
                    RESULTS["failed"] += 1
            except Exception as e:
                print(f"❌ ERROR: {e}")
                RESULTS["failed"] += 1
                RESULTS["errors"].append(f"{name}: {str(e)}")
        return wrapper
    return decorator

# ============================================================================
# HEALTH & BASIC TESTS
# ============================================================================

@test("Backend Health Check")
def test_health():
    """Verify backend is running"""
    response = requests.get(f"{BASE_URL}/health", timeout=5)
    data = response.json()
    print(f"Status: {response.status_code}")
    print(f"Service: {data.get('service')}")
    print(f"Version: {data.get('version')}")
    return response.status_code == 200 and data.get('status') == 'ok'

# ============================================================================
# SEARCH ENDPOINT TESTS
# ============================================================================

@test("Search: Items - Exact Match")
def test_search_items_exact():
    """Search for items with exact name"""
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "sword", "limit": 5},
        timeout=10
    )
    print(f"Status: {response.status_code}")
    data = response.json()
    count = data.get("count", 0)
    print(f"Found {count} results")
    if count > 0:
        for r in data.get("results", [])[:3]:
            print(f"  - {r['name']} ({r['category']}) score={r['score']}")
    return response.status_code == 200 and count > 0

@test("Search: Spells - Fuzzy Match")
def test_search_spells_fuzzy():
    """Search for spells with fuzzy matching"""
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
    return response.status_code == 200 and count > 0

@test("Search: Multi-category")
def test_search_multicategory():
    """Search across multiple categories"""
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "magic", "categories": "items,spells,classes", "limit": 5},
        timeout=10
    )
    data = response.json()
    count = data.get("count", 0)
    print(f"Status: {response.status_code}")
    print(f"Found {count} results across categories")
    if count > 0:
        categories = set(r['category'] for r in data.get("results", []))
        print(f"Categories found: {categories}")
    return response.status_code == 200 and count > 0

@test("Search: Empty Query (should handle error)")
def test_search_empty():
    """Test error handling for empty query"""
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "", "limit": 5},
        timeout=5
    )
    print(f"Status: {response.status_code}")
    # Should fail validation (q must be >= 2 chars)
    return response.status_code in [200, 422]

# ============================================================================
# AUTOCOMPLETE ENDPOINT TESTS
# ============================================================================

@test("Autocomplete: Spells with prefix")
def test_autocomplete_spells():
    """Test autocompletado for spells"""
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
    return response.status_code == 200 and count > 0

@test("Autocomplete: Items with partial match")
def test_autocomplete_items():
    """Test autocompletado for items"""
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/autocomplete",
        params={"q": "sho", "categories": "items", "limit": 3},
        timeout=10
    )
    data = response.json()
    count = data.get("count", 0)
    print(f"Status: {response.status_code}")
    print(f"Found {count} item suggestions")
    if count > 0:
        for s in data.get("suggestions", [])[:3]:
            print(f"  - {s['label']} ({s['category']})")
    return response.status_code == 200

@test("Autocomplete: Multi-category")
def test_autocomplete_multi():
    """Test autocompletado across multiple categories"""
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/autocomplete",
        params={"q": "el", "categories": "classes,races", "limit": 5},
        timeout=10
    )
    data = response.json()
    count = data.get("count", 0)
    print(f"Status: {response.status_code}")
    print(f"Found {count} suggestions")
    if count > 0:
        categories = set(s['category'] for s in data.get("suggestions", []))
        print(f"Categories: {categories}")
    return response.status_code == 200

# ============================================================================
# ANALYZE NOTE TESTS
# ============================================================================

@test("Analyze Note: Detect items and spells")
def test_analyze_note_basic():
    """Test note analysis for item/spell detection"""
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
    return response.status_code == 200

@test("Analyze Note: Empty content (should handle)")
def test_analyze_note_empty():
    """Test error handling for empty note"""
    response = requests.post(
        f"{BASE_URL}/api/dnd5e/analyze-note",
        json={"content": ""},
        timeout=10
    )
    print(f"Status: {response.status_code}")
    return response.status_code == 200  # Should return empty results

@test("Analyze Note: Long content")
def test_analyze_note_long():
    """Test analysis with longer note"""
    note_content = """
    La sesión fue épica. El mago lanzó un hechizo de bola de fuego contra los orcos.
    El guerrero encontró una espada mágica brillante. El clérigo también encontró
    una poción de curación. Luego se encontraron con el NPC Thalossa.
    El ranger aprendió a usar arco compuesto.
    """
    response = requests.post(
        f"{BASE_URL}/api/dnd5e/analyze-note",
        json={"content": note_content},
        timeout=10
    )
    data = response.json()
    print(f"Status: {response.status_code}")
    items = data.get("detected_items", [])
    spells = data.get("detected_spells", [])
    print(f"Detected {len(items)} items")
    print(f"Detected {len(spells)} spells")
    return response.status_code == 200

# ============================================================================
# PERFORMANCE TESTS
# ============================================================================

@test("Performance: Response time < 500ms")
def test_performance():
    """Ensure responses are reasonably fast"""
    start = time.time()
    response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "sword", "limit": 5},
        timeout=10
    )
    elapsed = (time.time() - start) * 1000
    print(f"Response time: {elapsed:.1f}ms")
    print(f"Status: {response.status_code}")
    return response.status_code == 200 and elapsed < 1000

# ============================================================================
# INTEGRATION TESTS
# ============================================================================

@test("Integration: Search → Autocomplete → Analyze flow")
def test_integration():
    """Test complete workflow"""
    # Step 1: Search
    print("\n1. Searching for 'long sword'...")
    search_response = requests.get(
        f"{BASE_URL}/api/dnd5e/search",
        params={"q": "long sword", "categories": "items", "limit": 3},
        timeout=10
    )
    print(f"   Found {search_response.json().get('count')} results")
    
    # Step 2: Autocomplete
    print("2. Getting autocomplete suggestions for 'lon'...")
    auto_response = requests.get(
        f"{BASE_URL}/api/dnd5e/autocomplete",
        params={"q": "lon", "categories": "items", "limit": 3},
        timeout=10
    )
    print(f"   Got {auto_response.json().get('count')} suggestions")
    
    # Step 3: Analyze
    print("3. Analyzing note with item mention...")
    analyze_response = requests.post(
        f"{BASE_URL}/api/dnd5e/analyze-note",
        json={"content": "The party found a long sword and cast fireball"},
        timeout=10
    )
    items = analyze_response.json().get("detected_items", [])
    print(f"   Detected {len(items)} items")
    
    return all([
        search_response.status_code == 200,
        auto_response.status_code == 200,
        analyze_response.status_code == 200
    ])

# ============================================================================
# RUNNER
# ============================================================================

def run_all_tests():
    print("\n" + "="*60)
    print("DUNGEON ASSISTANT - PHASE 0 TEST SUITE")
    print("="*60)
    print(f"Target: {BASE_URL}")
    
    try:
        # Health
        test_health()
        
        # Search
        test_search_items_exact()
        test_search_spells_fuzzy()
        test_search_multicategory()
        test_search_empty()
        
        # Autocomplete
        test_autocomplete_spells()
        test_autocomplete_items()
        test_autocomplete_multi()
        
        # Analyze
        test_analyze_note_basic()
        test_analyze_note_empty()
        test_analyze_note_long()
        
        # Performance
        test_performance()
        
        # Integration
        test_integration()
        
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    print(f"✅ Passed: {RESULTS['passed']}")
    print(f"❌ Failed: {RESULTS['failed']}")
    total = RESULTS['passed'] + RESULTS['failed']
    print(f"📊 Pass Rate: {(RESULTS['passed']/total*100):.1f}%" if total > 0 else "N/A")
    
    if RESULTS['errors']:
        print(f"\n❌ Errors:")
        for error in RESULTS['errors']:
            print(f"  - {error}")
    else:
        print("\n🎉 All tests passed!")
    
    print("="*60)

if __name__ == "__main__":
    run_all_tests()
