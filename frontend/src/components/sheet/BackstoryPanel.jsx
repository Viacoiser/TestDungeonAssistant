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

export default function BackstoryPanel({ character }) {
  const allies = character.allies_organizations ?? {}
  const alliesText = allies.text || ''

  const physicalFields = [
    { label: 'Age',    value: character.age    },
    { label: 'Height', value: character.height },
    { label: 'Weight', value: character.weight },
    { label: 'Eyes',   value: character.eyes   },
    { label: 'Skin',   value: character.skin   },
    { label: 'Hair',   value: character.hair   },
  ].filter(f => f.value)

  const hasPhysical = physicalFields.length > 0

  return (
    <>
      <div className="cs-section">
        <div className="cs-section__header">Backstory</div>
        <div className="cs-section__body">
          <TextField
            label="Character Backstory"
            value={character.backstory}
            placeholder="No backstory written yet"
          />
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-section__header">Allies &amp; Organizations</div>
        <div className="cs-section__body">
          <TextField
            label="Allies &amp; Organizations"
            value={alliesText}
            placeholder="No allies or organizations noted"
          />
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-section__header">Physical Appearance</div>
        <div className="cs-section__body">
          {hasPhysical && (
            <div className="cs-appearance-grid" style={{ marginBottom: physicalFields.length > 0 ? '0.6rem' : 0 }}>
              {physicalFields.map(({ label, value }) => (
                <div key={label} className="cs-appearance-item">
                  <div className="cs-appearance-item__label">{label}</div>
                  <div className="cs-appearance-item__value">{value}</div>
                </div>
              ))}
            </div>
          )}
          {character.appearance
            ? <div className="cs-field__text" style={{ marginTop: hasPhysical ? '0.5rem' : 0 }}>{character.appearance}</div>
            : !hasPhysical && <div className="cs-field__text--empty">No appearance described</div>}
        </div>
      </div>
    </>
  )
}
