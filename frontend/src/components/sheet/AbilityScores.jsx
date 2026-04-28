import React from 'react'
import { getAbilityModifier, formatModifier } from '../../utils/normalizeCharacter'

const STAT_LABELS = {
  strength: 'STR', dexterity: 'DEX', constitution: 'CON',
  intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
}
const STATS = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']

export default function AbilityScores({ character }) {
  const profBonus = character.proficiency_bonus ?? 2

  return (
    <>
      <div className="cs-section">
        <div className="cs-section__header">Ability Scores</div>
        <div className="cs-section__body">
          <div className="cs-stats-grid">
            {STATS.map(stat => {
              const score = character.stats?.[stat] ?? 10
              const mod = getAbilityModifier(score)
              return (
                <div key={stat} className="cs-stat-box">
                  <div className="cs-stat-box__label">{STAT_LABELS[stat]}</div>
                  <div className="cs-stat-box__value">{score}</div>
                  <div className="cs-stat-box__mod">{formatModifier(mod)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="cs-prof-bonus">
        <div className="cs-prof-bonus__label">Proficiency Bonus</div>
        <div className="cs-prof-bonus__value">{formatModifier(profBonus)}</div>
      </div>

      {character.inspiration && (
        <div className="cs-inspiration">✦ Inspiration</div>
      )}
    </>
  )
}
