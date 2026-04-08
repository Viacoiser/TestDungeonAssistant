/**
 * DungeonAssistant - Schema SQL para Supabase
 * Ejecutar en SQL Editor de Supabase para crear tablas
 */

-- ============================================================================
-- TABLA: users
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: campaigns
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    lore_summary TEXT,
    invite_code TEXT UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Si la tabla ya existe, agregar la columna con el siguiente comando:
-- ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE;

-- ============================================================================
-- TABLA: campaign_members
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaign_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('GM', 'PLAYER')),
    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'PENDING_ROLE_CHANGE')) DEFAULT 'ACTIVE',
    requested_role TEXT CHECK (requested_role IN ('GM', 'PLAYER')),
    joined_at TIMESTAMPTZ DEFAULT now()
);

-- Restricción: solo un GM activo por campaña (usando UNIQUE INDEX)
CREATE UNIQUE INDEX one_gm_per_campaign 
ON campaign_members(campaign_id, role) 
WHERE role = 'GM' AND status = 'ACTIVE';

-- ============================================================================
-- TABLA: characters
-- ============================================================================
CREATE TABLE IF NOT EXISTS characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    race TEXT NOT NULL,
    class TEXT NOT NULL,
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 20),
    background TEXT,
    alignment TEXT,
    stats JSONB NOT NULL,
    hp_max INTEGER NOT NULL,
    hp_current INTEGER NOT NULL,
    armor_class INTEGER,
    initiative INTEGER,
    speed INTEGER DEFAULT 30,
    proficiency_bonus INTEGER,
    hit_dice TEXT,
    death_saves JSONB DEFAULT '{"successes": 0, "failures": 0}',
    saving_throws JSONB DEFAULT '{}',
    skills JSONB DEFAULT '{}',
    passive_perception INTEGER,
    attacks JSONB DEFAULT '[]',
    personality_traits TEXT,
    ideals TEXT,
    bonds TEXT,
    flaws TEXT,
    other_proficiencies TEXT,
    equipment TEXT,
    features_traits TEXT,
    age TEXT,
    height TEXT,
    weight TEXT,
    eyes TEXT,
    skin TEXT,
    hair TEXT,
    appearance TEXT,
    backstory TEXT,
    allies_organizations JSONB DEFAULT '{}',
    additional_features TEXT,
    treasure TEXT,
    spellcasting JSONB DEFAULT '{}',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: inventories
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    description TEXT,
    is_magical BOOLEAN DEFAULT false,
    added_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: sessions
-- ============================================================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    session_number INTEGER NOT NULL,
    title TEXT,
    date DATE DEFAULT CURRENT_DATE,
    summary TEXT,
    is_active BOOLEAN DEFAULT false,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: factions (debe ir ANTES de npcs)
-- ============================================================================
CREATE TABLE IF NOT EXISTS factions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    alignment TEXT,
    goals TEXT,
    symbol TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: npcs
-- ============================================================================
CREATE TABLE IF NOT EXISTS npcs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    race TEXT,
    class TEXT,
    personality TEXT,
    secrets TEXT,
    stats JSONB,
    relationship_to_party TEXT,
    faction_id UUID REFERENCES factions(id),
    is_alive BOOLEAN DEFAULT true,
    generated_by_ai BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: session_notes
-- ============================================================================
CREATE TABLE IF NOT EXISTS session_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    detected_items JSONB DEFAULT '[]',
    detected_npcs JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: role_change_requests
-- ============================================================================
CREATE TABLE IF NOT EXISTS role_change_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id),
    requested_role TEXT NOT NULL CHECK (requested_role IN ('GM', 'PLAYER')),
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
    resolved_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_campaign_members_user_id ON campaign_members(user_id);
CREATE INDEX IF NOT EXISTS idx_campaign_members_campaign_id ON campaign_members(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_invite_code ON campaigns(invite_code);
CREATE INDEX IF NOT EXISTS idx_characters_player_id ON characters(player_id);
CREATE INDEX IF NOT EXISTS idx_characters_campaign_id ON characters(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sessions_campaign_id ON sessions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_session_id ON session_notes(session_id);
CREATE INDEX IF NOT EXISTS idx_npcs_campaign_id ON npcs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_role_change_requests_campaign_id ON role_change_requests(campaign_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_change_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS: users - Solo el usuario puede ver/insertar su propio perfil
-- ============================================================================
CREATE POLICY "Authenticated users can view any profile"
ON users FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- RLS: campaigns - Solo miembros pueden ver campaña
-- ============================================================================
CREATE POLICY "Campaign members can view"
ON campaigns FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = campaigns.id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.status = 'ACTIVE'
    )
);

CREATE POLICY "Any authenticated user can insert campaigns"
ON campaigns FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- RLS: campaign_members - Miembros pueden ver
-- ============================================================================
CREATE POLICY "Members can view campaign members"
ON campaign_members FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM campaign_members cm
        WHERE cm.campaign_id = campaign_members.campaign_id
        AND cm.user_id = auth.uid()
        AND cm.status = 'ACTIVE'
    )
);

CREATE POLICY "Any authenticated user can insert campaign members"
ON campaign_members FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- RLS: characters - Owner o GM puede ver/editar
-- ============================================================================
CREATE POLICY "Character owner or GM can view"
ON characters FOR SELECT
USING (
    auth.uid() = player_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = characters.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
        AND campaign_members.status = 'ACTIVE'
    )
);

CREATE POLICY "Character owner or GM can update"
ON characters FOR UPDATE
USING (
    auth.uid() = player_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = characters.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
        AND campaign_members.status = 'ACTIVE'
    )
);

-- ============================================================================
-- RLS: sessions - Campaign members can view
-- ============================================================================
CREATE POLICY "Campaign members can view sessions"
ON sessions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = sessions.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.status = 'ACTIVE'
    )
);

-- ============================================================================
-- RLS: session_notes - Members can view, anyone can add
-- ============================================================================
CREATE POLICY "Members can view notes"
ON session_notes FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM sessions
        WHERE sessions.id = session_notes.session_id
        AND EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_members.campaign_id = sessions.campaign_id
            AND campaign_members.user_id = auth.uid()
            AND campaign_members.status = 'ACTIVE'
        )
    )
);

CREATE POLICY "Members can add notes"
ON session_notes FOR INSERT
WITH CHECK (
    auth.uid() = author_id
    AND EXISTS (
        SELECT 1 FROM sessions
        WHERE sessions.id = session_notes.session_id
        AND EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_members.campaign_id = sessions.campaign_id
            AND campaign_members.user_id = auth.uid()
            AND campaign_members.status = 'ACTIVE'
        )
    )
);

-- ============================================================================
-- RLS: npcs - Only GM can create/edit
-- ============================================================================
CREATE POLICY "Members can view NPCs"
ON npcs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = npcs.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.status = 'ACTIVE'
    )
);

CREATE POLICY "Only GM can insert NPCs"
ON npcs FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = npcs.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
        AND campaign_members.status = 'ACTIVE'
    )
);

-- ============================================================================
-- RLS: role_change_requests - GM can approve
-- ============================================================================
CREATE POLICY "Members can view role requests"
ON role_change_requests FOR SELECT
USING (
    auth.uid() = requester_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = role_change_requests.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
        AND campaign_members.status = 'ACTIVE'
    )
);

-- ============================================================================
-- TRIGGERS - Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Schema SQL - READY TO USE
-- Copiar y pegar en Supabase SQL Editor
-- ============================================================================
