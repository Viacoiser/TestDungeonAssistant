import React, { useMemo } from 'react'
import { X } from 'lucide-react'
import './CharacterSheet5e.css'
import { normalizeCharacter } from '../../utils/normalizeCharacter'
import AbilityScores     from './AbilityScores'
import SavingThrows      from './SavingThrows'
import SkillList         from './SkillList'
import CombatStats       from './CombatStats'
import AttacksTable      from './AttacksTable'
import EquipmentPanel    from './EquipmentPanel'
import PersonalityPanel  from './PersonalityPanel'
import FeaturesPanel     from './FeaturesPanel'
import BackstoryPanel    from './BackstoryPanel'
import SpellcastingPanel from './SpellcastingPanel'

/* ── Header bar ────────────────────────────────────────────── */
function SheetHeader({ character, onClose, isGM, mode }) {
  const classDisplay = [
    character.class_,
    character.subclass,
  ].filter(Boolean).join(' — ')

  const alignmentMap = {
    'lawful-good': 'Lawful Good', 'neutral-good': 'Neutral Good',
    'chaotic-good': 'Chaotic Good', 'lawful-neutral': 'Lawful Neutral',
    'true-neutral': 'True Neutral', 'chaotic-neutral': 'Chaotic Neutral',
    'lawful-evil': 'Lawful Evil', 'neutral-evil': 'Neutral Evil',
    'chaotic-evil': 'Chaotic Evil',
  }
  const alignment = alignmentMap[character.alignment] ?? character.alignment ?? '—'

  const xpDisplay = character.experience_points != null
    ? `${character.experience_points.toLocaleString()} XP`
    : null

  return (
    <div className="cs-header">
      {/* Avatar */}
      <div className="cs-avatar">
        {character.image_url
          ? <img src={character.image_url} alt={character.name} />
          : (character.name?.[0]?.toUpperCase() ?? '?')}
      </div>

      {/* Identity */}
      <div className="cs-identity">
        <div className="cs-identity__name">{character.name || 'Unnamed Character'}</div>
        <div className="cs-identity__class">
          Lvl {character.level} {classDisplay} · {character.race}
        </div>
        <div className="cs-identity__meta">
          {character.background && (
            <div className="cs-meta-item">
              <span className="cs-meta-item__label">Background</span>
              <span className="cs-meta-item__value">{character.background}</span>
            </div>
          )}
          <div className="cs-meta-item">
            <span className="cs-meta-item__label">Alignment</span>
            <span className="cs-meta-item__value">{alignment}</span>
          </div>
          {xpDisplay && (
            <div className="cs-meta-item">
              <span className="cs-meta-item__label">Experience</span>
              <span className="cs-meta-item__value">{xpDisplay}</span>
            </div>
          )}
          {character.player_name && (
            <div className="cs-meta-item">
              <span className="cs-meta-item__label">Player</span>
              <span className="cs-meta-item__value">{character.player_name}</span>
            </div>
          )}
          {!character.is_alive && (
            <div className="cs-meta-item">
              <span className="cs-meta-item__value" style={{ color: '#e05252' }}>💀 Dead</span>
            </div>
          )}
        </div>
      </div>

      {/* Close */}
      <button className="cs-close" onClick={onClose} title="Close">
        <X size={22} />
      </button>
    </div>
  )
}

/* ── Main CharacterSheet5e ─────────────────────────────────── */
export default function CharacterSheet5e({
  character: rawCharacter,
  campaignId,
  onClose,
  onUpdate,   // kept for future interactivity phase
  isGM,
  mode = 'modal',
}) {
  // Always normalize — handles legacy data and applies all defaults
  const character = useMemo(() => normalizeCharacter(rawCharacter), [rawCharacter])

  if (!character) return null

  const isModal = mode === 'modal'

  const content = (
    <div
      className={`cs-root cs-container${isModal ? '' : ' cs-container--split'}`}
    >
      {/* Header */}
      <SheetHeader character={character} onClose={onClose} isGM={isGM} mode={mode} />

      {/* Scrollable body */}
      <div className="cs-body">

        {/* 3-column grid */}
        <div className="cs-grid">

          {/* ── COL LEFT: Stats / Saves / Skills ── */}
          <div className="cs-col">
            <AbilityScores character={character} />
            <SavingThrows  character={character} />
            <SkillList     character={character} />
          </div>

          {/* ── COL CENTER: Combat / Attacks / Equipment ── */}
          <div className="cs-col">
            <div className="cs-section">
              <div className="cs-section__header">Combat</div>
              <div className="cs-section__body">
                <CombatStats character={character} />
              </div>
            </div>

            <AttacksTable   character={character} />
            <EquipmentPanel character={character} />
          </div>

          {/* ── COL RIGHT: Personality / Features / Backstory ── */}
          <div className="cs-col">
            <PersonalityPanel character={character} />
            <FeaturesPanel    character={character} />
            <BackstoryPanel   character={character} />
          </div>
        </div>

        {/* Spellcasting — full width below grid */}
        <SpellcastingPanel character={character} />
      </div>
    </div>
  )

  if (isModal) {
    return (
      <div className="cs-overlay" onClick={e => { if (e.target === e.currentTarget) onClose?.() }}>
        {content}
      </div>
    )
  }

  return content
}
