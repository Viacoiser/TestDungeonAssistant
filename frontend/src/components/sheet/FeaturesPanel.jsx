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

export default function FeaturesPanel({ character }) {
  return (
    <div className="cs-section">
      <div className="cs-section__header">Features, Traits &amp; Languages</div>
      <div className="cs-section__body">
        <TextField
          label="Features &amp; Traits"
          value={character.features_traits}
          placeholder="No features or traits listed"
        />
        <TextField
          label="Other Proficiencies &amp; Languages"
          value={character.other_proficiencies}
          placeholder="No proficiencies or languages listed"
        />
        {character.additional_features && (
          <TextField
            label="Additional Features"
            value={character.additional_features}
          />
        )}
      </div>
    </div>
  )
}
