# DungeonAssistant 🐉

Ecosistema Inteligente de Gestión RPG - PWA mobile-first para campañas D&D 5e con IA

## 📋 Proyecto

[Ver especificación completa](./DungeonAssistant_BuildPrompt_v2.md)

## 🏗️ Estructura

```
DungeonAssistant/
├── backend/              # Python FastAPI
│   ├── routers/         # Endpoints
│   ├── services/        # Lógica de negocio
│   ├── models/          # Pydantic schemas
│   ├── main.py          # App principal
│   └── requirements.txt
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── pages/       # Componentes de página
│   │   ├── components/  # Componentes reutilizables
│   │   ├── store/       # Zustand stores
│   │   ├── services/    # API, Socket.io, Speech
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Backend
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Editar .env con tus credenciales

python -m uvicorn main:socket_app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Editar .env con tus URLs

npm run dev
```

## 🔧 Stack Tecnológico

### Frontend
- React 18 + Vite
- Tailwind CSS (mobile-first)
- Zustand (estado global)
- Socket.io (tiempo real)
- Web Speech API
- PWA (vite-plugin-pwa)

### Backend
- Python 3.11+
- FastAPI
- Pydantic v2
- Socket.io (WebSockets)

### Datos & IA
- PostgreSQL vía Supabase
- Google Gemini API
- Gemini Vision (OCR)
- dnd5eapi.co

## 📱 Features

✅ Autenticación sin roles globales (roles por campaña)
✅ Gestión de personajes con validación D&D 5e
✅ OCR de hojas físicas con Gemini Vision
✅ Generador de NPCs con RAG
✅ Asistente conversacional
✅ Entrada de voz (Web Speech API)
✅ Sincronización en tiempo real (Socket.io)
✅ PWA con offline support

## 📝 Estado

Construcción en progreso - Fase 1: Setup base
