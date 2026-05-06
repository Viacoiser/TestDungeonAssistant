import React from 'react'
import { getSpellSaveDC, getProficiencyBonus, getAbilityModifier, formatModifier } from '../../utils/normalizeCharacter'

const ABILITY_ABBR = {
  strength: 'STR', dexterity: 'DEX', constitution: 'CON',
  intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
}

export default function SpellcastingPanel({ character }) {
  const sc       = character.spellcasting ?? {}
  const slots    = sc.slots  ?? {}
  const cantrips = sc.cantrips ?? []
  const spells   = sc.spells   ?? []

  const hasSpells  = cantrips.length > 0 || spells.length > 0
  const hasAnySlot = Object.values(slots).some(s => s.total > 0)
  const hasContent = sc.class || hasAnySlot || hasSpells

  const abilityKey  = sc.ability?.toLowerCase() ?? null
  const abilityMod  = abilityKey ? getAbilityModifier(character.stats?.[abilityKey] ?? 10) : null
  const prof        = getProficiencyBonus(character.level ?? 1)
  const saveDC      = sc.save_dc || (abilityMod !== null ? 8 + prof + abilityMod : '—')
  const atkBonus    = sc.attack_bonus || (abilityMod !== null ? prof + abilityMod : '—')

  return (
    <div className="cs-spells-section">
      <div className="cs-spells-section__header">Spellcasting</div>

      {!hasContent ? (
        <div className="cs-empty-text">No spellcasting information</div>
      ) : (
        <>
          {/* Spellcasting info row */}
          <div className="cs-spell-info">
            <div className="cs-mini-box">
              <div className="cs-mini-box__label">Class</div>
              <div className="cs-mini-box__value" style={{ fontSize: '0.85rem' }}>
                {sc.class || '—'}
              </div>
            </div>
            <div className="cs-mini-box">
              <div className="cs-mini-box__label">Ability</div>
              <div className="cs-mini-box__value" style={{ fontSize: '0.85rem' }}>
                {abilityKey ? ABILITY_ABBR[abilityKey] ?? sc.ability : '—'}
              </div>
            </div>
            <div className="cs-mini-box">
              <div className="cs-mini-box__label">Save DC</div>
              <div className="cs-mini-box__value">{saveDC}</div>
            </div>
            <div className="cs-mini-box">
              <div className="cs-mini-box__label">Atk Bonus</div>
              <div className="cs-mini-box__value">
                {typeof atkBonus === 'number' ? formatModifier(atkBonus) : atkBonus}
              </div>
            </div>
          </div>

          {/* Spell slots by level */}
          {hasAnySlot && (
            <>
              <div style={{ fontSize: '0.52rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--cs-text-dim)', marginBottom: '0.4rem' }}>
                Spell Slots
              </div>
              <div className="cs-spell-slots-grid">
                {Array.from({ length: 9 }, (_, i) => String(i + 1)).map(lvl => {
                  const s    = slots[lvl] ?? { total: 0, used: 0 }
                  const isEmpty = s.total === 0
                  return (
                    <div key={lvl} className={`cs-slot-col${isEmpty ? ' cs-slot-col--empty' : ''}`}>
                      <div className="cs-slot-col__level">Lvl {lvl}</div>
                      <div className="cs-slot-col__used">{s.total - s.used}</div>
                      <div className="cs-slot-col__total">/{s.total}</div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* Cantrips */}
          {cantrips.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="cs-field__label" style={{ marginBottom: '0.4rem' }}>Cantrips</div>
              <div className="cs-spell-list">
                {cantrips.map((c, i) => (
                  <span key={i} className="cs-spell-tag">
                    {typeof c === 'string' ? c : c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prepared spells */}
          {spells.length > 0 && (
            <div>
              <div className="cs-field__label" style={{ marginBottom: '0.4rem' }}>Spells</div>
              <div className="cs-spell-list">
                {spells.map((s, i) => {
                  const name     = typeof s === 'string' ? s : s.name
                  const prepared = typeof s === 'object' ? s.prepared : false
                  const level    = typeof s === 'object' ? s.level : null
                  return (
                    <span key={i} className={`cs-spell-tag${prepared ? ' cs-spell-tag--prepared' : ''}`}>
                      {level ? `(${level}) ` : ''}{name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
