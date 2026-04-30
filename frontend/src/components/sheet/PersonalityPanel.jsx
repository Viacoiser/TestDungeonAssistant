import React from 'react'

function TextField({ label, value, placeholder = 'Not set' }) {
  return (
    <div className="cs-field">
      <div className="cs-field__label">{label}</div>
      {value
        ? <div className="cs-field__text">{value}</div>
        : <div className="cs-field__text--empty">{placeholder}</div>}
    </div>
  )
}

export default function PersonalityPanel({ character }) {
  return (
    <div className="cs-section">
      <div className="cs-section__header">Personality</div>
      <div className="cs-section__body">
        <TextField label="Personality Traits" value={character.personality_traits} placeholder="No personality traits" />
        <TextField label="Ideals"              value={character.ideals}            placeholder="No ideals" />
        <TextField label="Bonds"               value={character.bonds}             placeholder="No bonds" />
        <TextField label="Flaws"               value={character.flaws}             placeholder="No flaws" />
      </div>
    </div>
  )
}
