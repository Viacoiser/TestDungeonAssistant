"""
DungeonAssistant Backend - FastAPI + Socket.io
Gestión inteligente de campañas D&D 5e
"""

import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import socketio

# Load environment FIRST
load_dotenv(Path(__file__).parent / '.env')

# Import routers AFTER loading environment
from routers import auth, campaigns, player, sessions, vision, gamemaster, realtime, assistant, dnd5e_search, rag, voice

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Socket.io
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=['*'],
    logger=logger,
    engineio_logger=logger
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manejo del ciclo de vida de la aplicación"""
    logger.info("🚀 DungeonAssistant Backend starting...")
    yield
    logger.info("🛑 DungeonAssistant Backend shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="DungeonAssistant API",
    description="PWA inteligente para gestión de campañas D&D 5e",
    version="0.1.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health", tags=["System"])
async def health_check():
    """Verificar estado del backend"""
    return {
        "status": "ok",
        "service": "DungeonAssistant API",
        "version": "0.1.0"
    }

# Root endpoint
@app.get("/", tags=["System"])
async def root():
    """Root endpoint"""
    return {
        "message": "DungeonAssistant API",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }

# Include routers
app.include_router(auth.router)
app.include_router(campaigns.router)
app.include_router(player.router)
app.include_router(sessions.router)
app.include_router(vision.router)
app.include_router(gamemaster.router)
app.include_router(realtime.router)
app.include_router(assistant.router)
app.include_router(dnd5e_search.router)
app.include_router(rag.router)
app.include_router(voice.router)

# ============================================================================
# Socket.io State Management
# ============================================================================
# Track connected users and their associated campaigns
# Structure: { sid: { user_id, username, campaign_id, email } }
connected_users = {}
# Structure: { campaign_id: [sid1, sid2, ...] }
campaign_rooms = {}

# ============================================================================
# Socket.io Events
# ============================================================================

@sio.event
async def connect(sid: str, environ: dict):
    """Usuario se conecta al socket"""
    logger.info(f"✅ Cliente conectado: {sid}")
    # Enviar un evento para que el cliente se identifique
    await sio.emit("connected", {"sid": sid}, to=sid)

@sio.event
async def disconnect(sid: str):
    """Usuario se desconecta del socket"""
    logger.info(f"❌ Cliente desconectado: {sid}")
    
    # Obtener info del usuario desconectado
    if sid in connected_users:
        user_info = connected_users.pop(sid)
        campaign_id = user_info.get("campaign_id")
        
        if campaign_id:
            # Notificar a los otros usuarios en la campaña
            await sio.emit(
                "user_left",
                {
                    "user_id": user_info.get("user_id"),
                    "username": user_info.get("username"),
                    "campaign_id": campaign_id
                },
                to=f"campaign_{campaign_id}"
            )
            
            # Remover de la sala
            sio.leave_room(sid, f"campaign_{campaign_id}")
            
            # Actualizar lista de salas
            if campaign_id in campaign_rooms:
                campaign_rooms[campaign_id].remove(sid)
                if not campaign_rooms[campaign_id]:
                    del campaign_rooms[campaign_id]
            
            logger.info(f"Usuario {user_info.get('username')} abandonó campaña {campaign_id}")


@sio.event
async def identify_user(sid: str, data: dict):
    """Cliente se identifica con su información (JWT + username)"""
    try:
        user_id = data.get("user_id")
        username = data.get("username")
        email = data.get("email")
        
        connected_users[sid] = {
            "user_id": user_id,
            "username": username,
            "email": email,
            "campaign_id": None
        }
        
        logger.info(f"✅ Usuario identificado: {username} ({user_id})")
        await sio.emit("user_identified", {"status": "ok"}, to=sid)
        
    except Exception as e:
        logger.error(f"❌ Error identificando usuario: {e}")
        await sio.emit("error", {"message": str(e)}, to=sid)


@sio.event
async def join_campaign(sid: str, data: dict):
    """Usuario se une a una sala de campaña"""
    try:
        campaign_id = data.get("campaign_id")
        user_id = data.get("user_id")
        username = data.get("username")
        
        if not campaign_id:
            raise ValueError("campaign_id es requerido")
        
        # Actualizar estado del usuario
        if sid in connected_users:
            connected_users[sid]["campaign_id"] = campaign_id
        
        # Agregar a sala Socket.io
        sio.enter_room(sid, f"campaign_{campaign_id}")
        
        # Mantener registro de usuarios por campaña
        if campaign_id not in campaign_rooms:
            campaign_rooms[campaign_id] = []
        campaign_rooms[campaign_id].append(sid)
        
        # Obtener lista de usuarios activos en la campaña
        active_users = []
        for user_sid in campaign_rooms.get(campaign_id, []):
            if user_sid in connected_users:
                active_users.append({
                    "user_id": connected_users[user_sid].get("user_id"),
                    "username": connected_users[user_sid].get("username"),
                    "email": connected_users[user_sid].get("email")
                })
        
        # Notificar a TODOS en la campaña (incluyendo el que se acaba de unir)
        await sio.emit(
            "user_joined",
            {
                "user_id": user_id,
                "username": username,
                "campaign_id": campaign_id,
                "active_users": active_users
            },
            to=f"campaign_{campaign_id}"
        )
        
        logger.info(f"👤 {username} se unió a campaña {campaign_id}. Usuarios activos: {len(active_users)}")
        
        # Enviar confirmación al usuario
        await sio.emit(
            "joined_campaign",
            {
                "campaign_id": campaign_id,
                "active_users": active_users,
                "user_count": len(active_users)
            },
            to=sid
        )
        
    except Exception as e:
        logger.error(f"❌ Error en join_campaign: {e}")
        await sio.emit("error", {"message": str(e)}, to=sid)


@sio.event
async def leave_campaign(sid: str, data: dict):
    """Usuario abandona una campaña"""
    try:
        campaign_id = data.get("campaign_id")
        
        if sid not in connected_users:
            return
        
        user_info = connected_users[sid]
        username = user_info.get("username")
        
        # Remover de la sala
        sio.leave_room(sid, f"campaign_{campaign_id}")
        
        # Actualizar registro
        if campaign_id in campaign_rooms and sid in campaign_rooms[campaign_id]:
            campaign_rooms[campaign_id].remove(sid)
            if not campaign_rooms[campaign_id]:
                del campaign_rooms[campaign_id]
        
        # Actualizar estado del usuario
        connected_users[sid]["campaign_id"] = None
        
        # Notificar a otros usuarios
        await sio.emit(
            "user_left",
            {
                "user_id": user_info.get("user_id"),
                "username": username,
                "campaign_id": campaign_id
            },
            to=f"campaign_{campaign_id}"
        )
        
        logger.info(f"👤 {username} abandonó campaña {campaign_id}")
        
    except Exception as e:
        logger.error(f"❌ Error en leave_campaign: {e}")


@sio.event
async def get_active_users(sid: str, data: dict):
    """Obtener lista de usuarios activos en una campaña"""
    try:
        campaign_id = data.get("campaign_id")
        
        active_users = []
        for user_sid in campaign_rooms.get(campaign_id, []):
            if user_sid in connected_users:
                active_users.append({
                    "user_id": connected_users[user_sid].get("user_id"),
                    "username": connected_users[user_sid].get("username"),
                    "email": connected_users[user_sid].get("email")
                })
        
        await sio.emit(
            "active_users",
            {
                "campaign_id": campaign_id,
                "users": active_users,
                "count": len(active_users)
            },
            to=sid
        )
        
    except Exception as e:
        logger.error(f"❌ Error en get_active_users: {e}")
        await sio.emit("error", {"message": str(e)}, to=sid)


@sio.event
async def broadcast_message(sid: str, data: dict):
    """Broadcast mensaje a todos en la campaña"""
    try:
        campaign_id = data.get("campaign_id")
        message = data.get("message")
        message_type = data.get("type", "chat")  # chat, system, action, etc
        
        if sid not in connected_users:
            return
        
        user_info = connected_users[sid]
        
        # Enviar mensaje a toda la campaña
        await sio.emit(
            "message",
            {
                "campaign_id": campaign_id,
                "user_id": user_info.get("user_id"),
                "username": user_info.get("username"),
                "message": message,
                "type": message_type,
                "timestamp": __import__("datetime").datetime.utcnow().isoformat()
            },
            to=f"campaign_{campaign_id}"
        )
        
    except Exception as e:
        logger.error(f"❌ Error en broadcast_message: {e}")

# Mount Socket.io app
socket_app = socketio.ASGIApp(sio, app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:socket_app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
