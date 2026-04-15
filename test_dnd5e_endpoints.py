"""
Script de prueba para validar endpoints D&D5e
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_search():
    print("\n=== Testing /api/dnd5e/search ===")
    response = requests.get(f"{BASE_URL}/api/dnd5e/search", params={
        "q": "sword",
        "categories": "items,spells",
        "limit": 5
    })
    print(f"Status: {response.status_code}")
    print(f"Results: {json.dumps(response.json(), indent=2)}")

def test_autocomplete():
    print("\n=== Testing /api/dnd5e/autocomplete ===")
    response = requests.get(f"{BASE_URL}/api/dnd5e/autocomplete", params={
        "q": "fir",
        "categories": "spells",
        "limit": 5
    })
    print(f"Status: {response.status_code}")
    print(f"Results: {json.dumps(response.json(), indent=2)}")

def test_health():
    print("\n=== Testing /health ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Results: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    try:
        test_health()
        test_search()
        test_autocomplete()
        print("\n✅ All tests passed!")
    except Exception as e:
        print(f"\n❌ Error: {e}")
