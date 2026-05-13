"""
DungeonAssistant Backend - FastAPI + Socket.io
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

# Cargar entorno
env_file = Path(__file__).parent / '.env'
load_dotenv(env_file, override=True)

from routers import auth, campaigns, player, sessions, vision, gamemaster, realtime, assistant, dnd5e_search, rag, voice

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=['*'],
    logger=logger,
    engineio_logger=logger
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("DungeonAssistant Backend starting...")
    yield
    logger.info("DungeonAssistant Backend shutting down...")

fastapi_app = FastAPI(
    title="DungeonAssistant API",
    description="Gestión de campañas D&D 5e",
    version="0.1.0",
    lifespan=lifespan
)

# Configuración de CORS
env_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in env_origins.split(",") if origin.strip()]

default_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:3000",
]

final_origins = list(set(allowed_origins + default_origins))

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=final_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@fastapi_app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "ok",
        "service": "DungeonAssistant API",
        "version": "0.1.0"
    }

@fastapi_app.get("/", tags=["System"])
async def root():
    return {
        "message": "DungeonAssistant API",
        "docs": "/docs"
    }

fastapi_app.include_router(auth.router)
fastapi_app.include_router(campaigns.router)
fastapi_app.include_router(player.router)
fastapi_app.include_router(sessions.router)
fastapi_app.include_router(vision.router)
fastapi_app.include_router(gamemaster.router)
fastapi_app.include_router(realtime.router)
fastapi_app.include_router(assistant.router)
fastapi_app.include_router(dnd5e_search.router)
fastapi_app.include_router(rag.router)
fastapi_app.include_router(voice.router)

# Estado de Socket.io
connected_users = {} # { sid: { user_id, username, campaign_id, email } }
campaign_rooms = {}  # { campaign_id: [sid1, sid2, ...] }

@sio.event
async def connect(sid: str, environ: dict):
    logger.info(f"Cliente conectado: {sid}")
    await sio.emit("connected", {"sid": sid}, to=sid)

@sio.event
async def disconnect(sid: str):
    if sid in connected_users:
        user_info = connected_users.pop(sid)
        campaign_id = user_info.get("campaign_id")
        
        if campaign_id:
            await sio.emit(
                "user_left",
                {
                    "user_id": user_info.get("user_id"),
                    "username": user_info.get("username"),
                    "campaign_id": campaign_id
                },
                to=f"campaign_{campaign_id}"
            )
            
            sio.leave_room(sid, f"campaign_{campaign_id}")
            
            if campaign_id in campaign_rooms:
                if sid in campaign_rooms[campaign_id]:
                    campaign_rooms[campaign_id].remove(sid)
                if not campaign_rooms[campaign_id]:
                    del campaign_rooms[campaign_id]
            
            logger.info(f"Usuario {user_info.get('username')} abandonó campaña {campaign_id}")

@sio.event
async def identify_user(sid: str, data: dict):
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
        
        logger.info(f"Usuario identificado: {username} ({user_id})")
        await sio.emit("user_identified", {"status": "ok"}, to=sid)
        
    except Exception as e:
        logger.error(f"Error identificando usuario: {e}")
        await sio.emit("error", {"message": str(e)}, to=sid)

@sio.event
async def join_campaign(sid: str, data: dict):
    try:
        campaign_id = data.get("campaign_id")
        user_id = data.get("user_id")
        username = data.get("username")
        
        if not campaign_id:
            raise ValueError("campaign_id es requerido")
        
        if sid in connected_users:
            connected_users[sid]["campaign_id"] = campaign_id
        
        sio.enter_room(sid, f"campaign_{campaign_id}")
        
        if campaign_id not in campaign_rooms:
            campaign_rooms[campaign_id] = []
        if sid not in campaign_rooms[campaign_id]:
            campaign_rooms[campaign_id].append(sid)
        
        active_users = []
        for user_sid in campaign_rooms.get(campaign_id, []):
            if user_sid in connected_users:
                active_users.append({
                    "user_id": connected_users[user_sid].get("user_id"),
                    "username": connected_users[user_sid].get("username"),
                    "email": connected_users[user_sid].get("email")
                })
        
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
        
        logger.info(f"{username} se unió a campaña {campaign_id}")
        
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
        logger.error(f"Error en join_campaign: {e}")
        await sio.emit("error", {"message": str(e)}, to=sid)

@sio.event
async def leave_campaign(sid: str, data: dict):
    try:
        campaign_id = data.get("campaign_id")
        if sid not in connected_users:
            return
        
        user_info = connected_users[sid]
        username = user_info.get("username")
        
        sio.leave_room(sid, f"campaign_{campaign_id}")
        
        if campaign_id in campaign_rooms and sid in campaign_rooms[campaign_id]:
            campaign_rooms[campaign_id].remove(sid)
            if not campaign_rooms[campaign_id]:
                del campaign_rooms[campaign_id]
        
        connected_users[sid]["campaign_id"] = None
        
        await sio.emit(
            "user_left",
            {
                "user_id": user_info.get("user_id"),
                "username": username,
                "campaign_id": campaign_id
            },
            to=f"campaign_{campaign_id}"
        )
        
        logger.info(f"{username} abandonó campaña {campaign_id}")
        
    except Exception as e:
        logger.error(f"Error en leave_campaign: {e}")

@sio.event
async def get_active_users(sid: str, data: dict):
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
        logger.error(f"Error en get_active_users: {e}")
        await sio.emit("error", {"message": str(e)}, to=sid)

@sio.event
async def broadcast_message(sid: str, data: dict):
    try:
        campaign_id = data.get("campaign_id")
        message = data.get("message")
        message_type = data.get("type", "chat")
        
        if sid not in connected_users:
            return
        
        user_info = connected_users[sid]
        
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
        logger.error(f"Error en broadcast_message: {e}")

app = socketio.ASGIApp(sio, fastapi_app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
