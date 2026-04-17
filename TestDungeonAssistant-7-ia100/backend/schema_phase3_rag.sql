/**
 * DungeonAssistant - Phase 3: RAG Structure (Simple, no compression)
 * Agregar a Supabase DESPUÉS de ejecutar schema_optimized_supabase.sql
 * 
 * ESTRUCTURA:
 * - rag_entities: Entidades inmutables (NPCs, locations, quests, items)
 * - rag_relationships: Relaciones entre entidades
 * - rag_events: Resumen de sesiones
 * - token_usage: Analytics de consumo
 */

-- ============================================================================
-- TABLAS RAG (Retrieval-Augmented Generation)
-- ============================================================================

-- Tabla: rag_entities
-- Entidades inmutables de la campaña (nunca se editan, solo se actualizan mentions)
CREATE TABLE IF NOT EXISTS rag_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('NPC', 'LOCATION', 'QUEST', 'ITEM', 'FACTION', 'EVENT')),
    entity_name TEXT NOT NULL,
    description TEXT,
    attributes JSONB DEFAULT '{}',  -- Custom fields por tipo
    first_seen TIMESTAMPTZ DEFAULT now(),
    last_updated TIMESTAMPTZ DEFAULT now(),
    mention_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id, entity_type, entity_name)
);

COMMENT ON TABLE rag_entities IS 'Entidades inmutables de campaña. Se actualiza mention_count pero nunca se elimina.';
COMMENT ON COLUMN rag_entities.entity_type IS 'Tipo: NPC, LOCATION, QUEST, ITEM, FACTION, EVENT';
COMMENT ON COLUMN rag_entities.mention_count IS 'Cantidad de veces mencionada. Usado para ordenar por relevancia.';
COMMENT ON COLUMN rag_entities.attributes IS 'JSON con datos específicos por tipo (ej: NPC.role, LOCATION.terrain, QUEST.reward)';

-- Tabla: rag_relationships
-- Relaciones entre entidades (NPC X aliado de Y, Location X contiene Y, etc)
CREATE TABLE IF NOT EXISTS rag_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    source_entity_id UUID NOT NULL REFERENCES rag_entities(id) ON DELETE CASCADE,
    target_entity_id UUID NOT NULL REFERENCES rag_entities(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL,  -- 'works_for', 'enemies_with', 'located_in', 'owns', 'seeking', etc
    strength INTEGER DEFAULT 50 CHECK (strength >= 0 AND strength <= 100),  -- Confidence 0-100
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id, source_entity_id, target_entity_id, relationship_type)
);

COMMENT ON TABLE rag_relationships IS 'Relaciones entre entidades. Dirigidas: source -> target.';
COMMENT ON COLUMN rag_relationships.strength IS 'Confianza de relación (0=débil/uncertain, 100=confirmado)';

-- Tabla: rag_events
-- Resumen ultra-comprimido de sesiones (1-2 líneas cada una)
CREATE TABLE IF NOT EXISTS rag_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    session_number INTEGER,
    event_title TEXT,  -- "Session 5: The Dragon's Lair"
    event_summary TEXT,  -- Resumen de sesión
    involved_entities JSONB DEFAULT '[]',  -- Array de entity_ids
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id, session_number)
);

COMMENT ON TABLE rag_events IS 'Resumen ultra-comprimido de cada sesión. Se mantiene histórico.';
COMMENT ON COLUMN rag_events.event_summary IS 'Ultra-comprimido. Máx 50 palabras. Ej: "Party defeated goblin tribe, found map to ancient temple."';

-- token_usage table removed (not tracking token metrics)

-- ============================================================================
-- ÍNDICES OPTIMIZADOS PARA RAG
-- ============================================================================

-- Búsquedas por tipo de entidad
CREATE INDEX IF NOT EXISTS idx_rag_entities_campaign_type 
ON rag_entities(campaign_id, entity_type);

-- Búsquedas por nombre (full-text search Spanish)
CREATE INDEX IF NOT EXISTS idx_rag_entities_name_tsvector 
ON rag_entities USING GIN (to_tsvector('spanish', entity_name));

-- Top entities by mentions
CREATE INDEX IF NOT EXISTS idx_rag_entities_mention_count 
ON rag_entities(campaign_id, mention_count DESC);

-- Relaciones por source entity (para búsquedas de conocidos)
CREATE INDEX IF NOT EXISTS idx_rag_relationships_source 
ON rag_relationships(campaign_id, source_entity_id);

-- Eventos ordenados cronológicamente
CREATE INDEX IF NOT EXISTS idx_rag_events_session_number 
ON rag_events(campaign_id, session_number DESC);

-- Token indices removed

-- ============================================================================
-- VISTAS PARA ANALYTICS
-- ============================================================================

-- Vista: Token usage stats por día
CREATE OR REPLACE VIEW token_usage_daily AS
SELECT
    campaign_id,
    entity_type,
    entity_name,
    mention_count,
    RANK() OVER (PARTITION BY campaign_id, entity_type ORDER BY mention_count DESC) as rank_in_type
FROM rag_entities
ORDER BY campaign_id, entity_type, mention_count DESC;

-- ============================================================================
-- TRIGGERS - Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_rag_entities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_rag_entities_updated_at ON rag_entities;
CREATE TRIGGER update_rag_entities_updated_at 
BEFORE UPDATE ON rag_entities
FOR EACH ROW EXECUTE FUNCTION update_rag_entities_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) PARA RAG TABLES
-- Backend valida acceso a campaña (patrón consistente con resto del schema)
-- ============================================================================

ALTER TABLE rag_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;

-- RAG_ENTITIES: El backend valida acceso
CREATE POLICY "RAG entities SELECT permissive"
ON rag_entities FOR SELECT
USING (true);

-- RAG_RELATIONSHIPS: El backend valida acceso
CREATE POLICY "RAG relationships SELECT permissive"  
ON rag_relationships FOR SELECT
USING (true);

-- RAG_EVENTS: El backend valida acceso
CREATE POLICY "RAG events SELECT permissive"
ON rag_events FOR SELECT

-- TOKEN_USAGE: Solo usuarios autenticados pueden insertar
CREATE POLICY "Token usage INSERT permissive"
ON token_usage FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- FIN PHASE 3 SCHEMA
-- ============================================================================
-- Schema RAG completado. Listo para:
-- 1. RAGManager Service (Python)
-- 2. Auto-populate desde session_notes
-- 3. Token tracking
