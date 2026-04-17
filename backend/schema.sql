/**
 * DungeonAssistant - Schema SQL Limpio para Supabase
 * Ejecutar en SQL Editor de Supabase
 * COPIAR Y PEGAR TODO DE UNA VEZ
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
    is_active BOOLEAN DEFAULT true,
    invitation_code VARCHAR(6) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

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
    joined_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id, user_id)
);

-- ============================================================================
-- TABLA: characters
-- ============================================================================
CREATE TABLE IF NOT EXISTS characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    player_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    race TEXT NOT NULL,
    class TEXT NOT NULL,
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 20),
    background TEXT,
    alignment TEXT,
    stats JSONB NOT NULL DEFAULT '{"strength": 10, "dexterity": 10, "constitution": 10, "intelligence": 10, "wisdom": 10, "charisma": 10}',
    hp_max INTEGER NOT NULL,
    hp_current INTEGER NOT NULL,
    armor_class INTEGER DEFAULT 10,
    initiative INTEGER DEFAULT 0,
    speed INTEGER DEFAULT 30,
    proficiency_bonus INTEGER DEFAULT 2,
    hit_dice TEXT DEFAULT '1d8',
    death_saves JSONB DEFAULT '{"successes": 0, "failures": 0}',
    saving_throws JSONB DEFAULT '{}',
    skills JSONB DEFAULT '{}',
    passive_perception INTEGER DEFAULT 10,
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
    is_alive BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: character_history
-- ============================================================================
CREATE TABLE IF NOT EXISTS character_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    changed_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    change_type TEXT NOT NULL CHECK (change_type IN ('LEVEL_UP', 'HP_CHANGE', 'STATUS_CHANGE', 'STAT_CHANGE', 'DIED', 'REVIVED')),
    old_value TEXT,
    new_value TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
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
-- TABLA: session_notes
-- ============================================================================
CREATE TABLE IF NOT EXISTS session_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    detected_items JSONB DEFAULT '[]',
    detected_npcs JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- TABLA: factions
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
    faction_id UUID REFERENCES factions(id) ON DELETE SET NULL,
    is_alive BOOLEAN DEFAULT true,
    generated_by_ai BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
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
-- TABLA: role_change_requests
-- ============================================================================
CREATE TABLE IF NOT EXISTS role_change_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_role TEXT NOT NULL CHECK (requested_role IN ('GM', 'PLAYER')),
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- ============================================================================
-- ÍNDICES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_campaigns_invitation_code ON campaigns(invitation_code);
CREATE INDEX IF NOT EXISTS idx_campaign_members_user_id ON campaign_members(user_id);
CREATE INDEX IF NOT EXISTS idx_campaign_members_campaign_id ON campaign_members(campaign_id);
CREATE INDEX IF NOT EXISTS idx_characters_player_id ON characters(player_id);
CREATE INDEX IF NOT EXISTS idx_characters_campaign_id ON characters(campaign_id);
CREATE INDEX IF NOT EXISTS idx_character_history_character_id ON character_history(character_id);
CREATE INDEX IF NOT EXISTS idx_character_history_created_at ON character_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_campaign_id ON sessions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_session_id ON session_notes(session_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_author_id ON session_notes(author_id);
CREATE INDEX IF NOT EXISTS idx_factions_campaign_id ON factions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_npcs_campaign_id ON npcs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_npcs_faction_id ON npcs(faction_id);
CREATE INDEX IF NOT EXISTS idx_inventories_character_id ON inventories(character_id);
CREATE INDEX IF NOT EXISTS idx_role_change_requests_campaign_id ON role_change_requests(campaign_id);

-- ============================================================================
-- TRIGGERS - Auto-update updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE factions ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventories ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_change_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS: users
-- ============================================================================
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- RLS: campaigns
-- ============================================================================
CREATE POLICY "Campaign members can view"
ON campaigns FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert campaigns"
ON campaigns FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- RLS: campaign_members
-- ============================================================================
CREATE POLICY "Members can view campaign members"
ON campaign_members FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert members"
ON campaign_members FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Members can update their own role requests"
ON campaign_members FOR UPDATE
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM campaign_members cm
    WHERE cm.campaign_id = campaign_members.campaign_id
    AND cm.user_id = auth.uid()
    AND cm.role = 'GM'
));

-- ============================================================================
-- RLS: characters
-- ============================================================================
CREATE POLICY "Users can view own or GM campaign characters"
ON characters FOR SELECT
USING (
    auth.uid() = player_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = characters.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

CREATE POLICY "Authenticated users can insert characters"
ON characters FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = player_id);

CREATE POLICY "Owner or GM can update characters"
ON characters FOR UPDATE
USING (
    auth.uid() = player_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = characters.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

CREATE POLICY "Owner or GM can delete characters"
ON characters FOR DELETE
USING (
    auth.uid() = player_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = characters.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

-- ============================================================================
-- RLS: character_history
-- ============================================================================
CREATE POLICY "Users can view character history"
ON character_history FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM characters
        WHERE characters.id = character_history.character_id
        AND (auth.uid() = characters.player_id OR EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_members.campaign_id = characters.campaign_id
            AND campaign_members.user_id = auth.uid()
        ))
    )
);

CREATE POLICY "Users can insert character history"
ON character_history FOR INSERT
WITH CHECK (auth.uid() = changed_by);

-- ============================================================================
-- RLS: sessions
-- ============================================================================
CREATE POLICY "Campaign members can view sessions"
ON sessions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = sessions.campaign_id
        AND campaign_members.user_id = auth.uid()
    )
);

CREATE POLICY "GM can insert sessions"
ON sessions FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = sessions.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

-- ============================================================================
-- RLS: session_notes
-- ============================================================================
CREATE POLICY "Campaign members can view notes"
ON session_notes FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM sessions
        WHERE sessions.id = session_notes.session_id
        AND EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_members.campaign_id = sessions.campaign_id
            AND campaign_members.user_id = auth.uid()
        )
    )
);

CREATE POLICY "Members can insert notes"
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
        )
    )
);

-- ============================================================================
-- RLS: npcs
-- ============================================================================
CREATE POLICY "Campaign members can view NPCs"
ON npcs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = npcs.campaign_id
        AND campaign_members.user_id = auth.uid()
    )
);

CREATE POLICY "GM can insert NPCs"
ON npcs FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = npcs.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

CREATE POLICY "GM can update NPCs"
ON npcs FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = npcs.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

-- ============================================================================
-- RLS: inventories
-- ============================================================================
CREATE POLICY "Users can view own or campaign inventories"
ON inventories FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM characters
        WHERE characters.id = inventories.character_id
        AND (auth.uid() = characters.player_id OR EXISTS (
            SELECT 1 FROM campaign_members
            WHERE campaign_members.campaign_id = characters.campaign_id
            AND campaign_members.user_id = auth.uid()
        ))
    )
);

CREATE POLICY "Users can manage own inventory"
ON inventories FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM characters
        WHERE characters.id = inventories.character_id
        AND auth.uid() = characters.player_id
    )
);

CREATE POLICY "Users can update own inventory"
ON inventories FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM characters
        WHERE characters.id = inventories.character_id
        AND auth.uid() = characters.player_id
    )
);

CREATE POLICY "Users can delete own inventory"
ON inventories FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM characters
        WHERE characters.id = inventories.character_id
        AND auth.uid() = characters.player_id
    )
);

-- ============================================================================
-- RLS: role_change_requests
-- ============================================================================
CREATE POLICY "Users can view own requests or if GM"
ON role_change_requests FOR SELECT
USING (
    auth.uid() = requester_id
    OR EXISTS (
        SELECT 1 FROM campaign_members
        WHERE campaign_members.campaign_id = role_change_requests.campaign_id
        AND campaign_members.user_id = auth.uid()
        AND campaign_members.role = 'GM'
    )
);

CREATE POLICY "Authenticated users can insert requests"
ON role_change_requests FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================