import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def test_assistant():
    # 1. Register a test user
    print("Registering test user...")
    test_email = "test_assistant1@example.com"
    test_password = "password123"
    
    register_data = {
        "email": test_email,
        "password": test_password,
        "username": "tester"
    }
    
    res = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    # Ignore 400 if already exists
    
    # 2. Login
    print("Logging in...")
    login_data = {"email": test_email, "password": test_password}
    res = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    
    if res.status_code != 200:
        print(f"Login failed: {res.text}")
        return
        
    token = res.json()["access_token"]
    print(f"Got token: {token[:20]}...")
    
    # 3. Call assistant
    print("Calling assistant...")
    headers = {"Authorization": f"Bearer {token}"}
    chat_data = {
        "campaign_id": "test_campaign_id",
        "question": "hola asistente"
    }
    
    res = requests.post(f"{BASE_URL}/assistant/chat", json=chat_data, headers=headers)
    print(f"Assistant Status: {res.status_code}")
    print(f"Assistant Response: {res.text}")

if __name__ == "__main__":
    test_assistant()
