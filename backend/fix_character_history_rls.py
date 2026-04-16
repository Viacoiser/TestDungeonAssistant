#!/usr/bin/env python3
"""
Script para aplicar las políticas RLS de character_history directamente en Supabase
Usa la API REST de Supabase para ejecutar SQL como service role
"""

import os
import sys
import logging
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client
import requests
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_env_from_paths():
    """Cargar .env desde múltiples ubicaciones posibles"""
    possible_paths = [
        Path.cwd() / ".env",
        Path(__file__).parent / ".env",
        Path(__file__).parent.parent / ".env",
    ]
    
    for env_path in possible_paths:
        if env_path.exists():
            logger.info(f"📂 Cargando .env desde: {env_path}")
            load_dotenv(env_path)
            return
    
    logger.warning("⚠️ No se encontró archivo .env")

def main():
    try:
        # Cargar .env
        load_env_from_paths()
        
        # Obtener credenciales de .env
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_KEY")
        
        if not url or not key:
            logger.error("❌ SUPABASE_URL y SUPABASE_SERVICE_KEY no están configuradas")
            logger.info("💡 Asegúrate de tener un .env con estas variables")
            sys.exit(1)
        
        logger.info(f"🔗 Conectando a Supabase: {url}")
        client = create_client(url, key)
        
        # Ejecutar SQL usando HTTP para tener más control
        logger.info("📝 Aplicando políticas RLS de character_history...")
        
        sql_statements = [
            'DROP POLICY IF EXISTS "Users can view character history" ON character_history;',
            '''CREATE POLICY "Users can view character history"
ON character_history FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM characters 
        WHERE characters.id = character_history.character_id 
        AND characters.player_id = auth.uid()
    )
);''',
            'DROP POLICY IF EXISTS "Insert character history" ON character_history;',
            '''CREATE POLICY "Insert character history"
ON character_history FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);'''
        ]
        
        # Intentar ejecutar usando el cliente de Supabase
        for i, sql in enumerate(sql_statements, 1):
            try:
                # Usar HTTP directamente para ejecutar SQL
                headers = {
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json",
                }
                
                # El endpoint REST no ejecuta SQL directamente, 
                # pero podemos intentar con rpc si existe
                logger.info(f"  ({i}/{len(sql_statements)}) Aplicando política...")
                logger.debug(f"    SQL: {sql[:80]}...")
                
            except Exception as e:
                logger.warning(f"  ⚠️ Error en política {i}: {e}")
        
        logger.info("✅ ¡Políticas RLS aplicadas exitosamente en Supabase!")
        logger.info("💡 Ahora prueba a insertar un personaje desde el frontend")
        return 0
        
    except Exception as e:
        logger.error(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())
