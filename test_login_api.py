#!/usr/bin/env python3
"""
Script de prueba para verificar el endpoint de login
"""
import requests
import json

# Variables de prueba
API_URL = "http://localhost:8000"
EMAIL = "demo@example.com"
PASSWORD = "DemoPassword123!"

print("=" * 50)
print("PRUEBA DE LOGIN API")
print("=" * 50)

# 1. Verificar que el backend está corriendo
print("\n1. Verificando que el backend está corriendo...")
try:
    response = requests.get(f"{API_URL}/health")
    if response.status_code == 200:
        print("✅ Backend está corriendo")
        print(f"   Response: {response.json()}")
    else:
        print(f"❌ Backend retornó: {response.status_code}")
except Exception as e:
    print(f"❌ Error conectando al backend: {e}")
    exit(1)

# 2. Intentar login
print(f"\n2. Intentando login con {EMAIL}...")
try:
    login_data = {
        "email": EMAIL,
        "password": PASSWORD
    }
    response = requests.post(
        f"{API_URL}/auth/login",
        json=login_data,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"   Status Code: {response.status_code}")
    print(f"   Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        print("✅ Login exitoso")
        data = response.json()
        print(f"   - Token: {data.get('access_token', 'N/A')[:50]}...")
        print(f"   - Usuario: {data.get('user', {}).get('email', 'N/A')}")
    else:
        print(f"❌ Login falló: {response.json()}")
        
except Exception as e:
    print(f"❌ Error durante login: {e}")

print("\n" + "=" * 50)
