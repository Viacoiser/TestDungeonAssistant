"""
Simple quick test to verify backend is responding
"""
import requests
import time

print("Testing backend response...")
try:
    print("Connecting to http://localhost:8000/health...")
    start = time.time()
    response = requests.get("http://localhost:8000/health", timeout=20)
    elapsed = time.time() - start
    print(f"✅ Response in {elapsed:.2f}s")
    print(f"Status: {response.status_code}")
    print(f"Data: {response.json()}")
except requests.exceptions.Timeout:
    print("❌ TIMEOUT - Backend is not responding quickly")
except requests.exceptions.ConnectionError as e:
    print(f"❌ CONNECTION ERROR - Backend might not be running: {e}")
except Exception as e:
    print(f"❌ ERROR: {e}")
