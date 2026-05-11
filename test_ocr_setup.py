"""
🧪 Script de prueba - Verificar instalación de Google Cloud Vision + Gemini
"""

import os
import sys
from pathlib import Path

# Cargar variables de entorno
from dotenv import load_dotenv
env_path = Path(__file__).parent / 'backend' / '.env'
load_dotenv(env_path)

print("═" * 70)
print("🧪 VERIFICACIÓN DE CONFIGURACIÓN - DUNGEON ASSISTANT")
print("═" * 70)

# Test 1: Vision API
print("\n1️⃣  Google Cloud Vision API")
print("-" * 70)
try:
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    print("✅ Biblioteca google-cloud-vision importada correctamente")
    print("   - Cliente Vision inicializado")
except ImportError as e:
    print(f"❌ Error importando google-cloud-vision: {e}")
    sys.exit(1)
except Exception as e:
    print(f"⚠️  Warning Vision: {e}")

# Test 2: Gemini API
print("\n2️⃣  Google Generative AI (Gemini 1.5 Pro)")
print("-" * 70)
try:
    import google.generativeai as genai
    print("✅ Biblioteca google-generativeai importada correctamente")
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("⚠️  GEMINI_API_KEY no está configurada en .env")
    else:
        print(f"✅ GEMINI_API_KEY encontrada ({len(api_key)} caracteres)")
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-1.5-pro')
            print("✅ Gemini 1.5 Pro configurado correctamente")
        except Exception as e:
            print(f"⚠️  Error configurando Gemini: {e}")
except ImportError as e:
    print(f"❌ Error importando google.generativeai: {e}")
    sys.exit(1)

# Test 3: Archivo de credenciales
print("\n3️⃣  Credenciales de Google Cloud")
print("-" * 70)
creds_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if not creds_path:
    print("⚠️  GOOGLE_APPLICATION_CREDENTIALS no está definida en .env")
else:
    print(f"📂 Ruta configurada: {creds_path}")
    full_path = Path(__file__).parent / 'backend' / creds_path
    if full_path.exists():
        print(f"✅ Archivo encontrado en: {full_path}")
    else:
        print(f"❌ Archivo NO encontrado en: {full_path}")
        print("   Acción: Descargar desde Google Cloud Console y copiar")

# Test 4: Variables de entorno críticas
print("\n4️⃣  Variables de Entorno (.env)")
print("-" * 70)
required_vars = [
    "GOOGLE_APPLICATION_CREDENTIALS",
    "GOOGLE_PROJECT_ID",
    "GEMINI_API_KEY"
]

missing = []
for var in required_vars:
    value = os.getenv(var)
    if not value or value.startswith("tu-"):
        print(f"⚠️  {var}: No configurada")
        missing.append(var)
    else:
        masked = value[:10] + "..." if len(str(value)) > 10 else value
        print(f"✅ {var}: {masked}")

# Test 5: Dependencias Python
print("\n5️⃣  Dependencias Python")
print("-" * 70)
try:
    import fastapi
    print(f"✅ FastAPI {fastapi.__version__}")
except:
    print("❌ FastAPI no instalado")

try:
    import pydantic
    print(f"✅ Pydantic {pydantic.__version__}")
except:
    print("❌ Pydantic no instalado")

try:
    import dotenv
    print("✅ python-dotenv")
except:
    print("❌ python-dotenv no instalado")

# Test 6: Estructura de carpetas
print("\n6️⃣  Estructura de Carpetas")
print("-" * 70)
required_dirs = [
    "backend",
    "backend/secrets",
    "frontend/src/components/CharacterCreation"
]

for dir_path in required_dirs:
    full_path = Path(__file__).parent / dir_path
    if full_path.exists():
        print(f"✅ {dir_path}/")
    else:
        print(f"❌ {dir_path}/ NO existe")

# Resumen final
print("\n" + "═" * 70)
if not missing:
    print("✨ ¡CONFIGURACIÓN COMPLETA! Listo para OCR de hojas D&D")
    print("═" * 70)
    print("\n🚀 Próximos pasos:")
    print("   1. Abrir proyecto en VS Code")
    print("   2. Iniciar backend:  python -m uvicorn main:socket_app --reload")
    print("   3. Iniciar frontend: npm run dev")
    print("   4. Acceder a http://localhost:5173")
    print("   5. Ir a 'Crear Personaje' → '📸 Escanear Hoja'")
else:
    print(f"⚠️  FALTAN {len(missing)} configuraciones obligatorias:")
    for var in missing:
        print(f"   - {var}")
    print("\n📋 ACCIÓN REQUERIDA:")
    print("   1. Ir a https://console.cloud.google.com/")
    print("   2. Crear proyecto y habilitar APIs")
    print("   3. Descargar credenciales JSON")
    print("   4. Actualizar backend/.env con los valores")

print("═" * 70)
