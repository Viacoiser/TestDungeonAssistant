import React from 'react'

const COIN_COLORS = {
  cp: '#b87333', sp: '#c0c0c0', ep: '#b0c4de', gp: '#ffd700', pp: '#e5e4e2',
}

export default function EquipmentPanel({ character }) {
  const currency  = character.currency  ?? {}
  const equipment = character.equipment ?? ''
  const treasure  = character.treasure  ?? ''

  // Try to parse JSON equipment (from CharacterForm's item picker)
  let equipmentText = equipment
  try {
    const parsed = JSON.parse(equipment)
    if (Array.isArray(parsed) && parsed.length > 0) {
      equipmentText = parsed.map(item => `${item.quantity ?? 1}× ${item.name}`).join('\n')
    }
  } catch { /* plain text, keep as-is */ }

  return (
    <div className="cs-section">
      <div className="cs-section__header">Equipment &amp; Treasure</div>
      <div className="cs-section__body">
        {/* Currency */}
        <div className="cs-currency" style={{ marginBottom: '0.75rem' }}>
          {['cp','sp','ep','gp','pp'].map(coin => (
            <div key={coin} className="cs-coin" style={{ borderColor: `${COIN_COLORS[coin]}44` }}>
              <div className="cs-coin__type" style={{ color: COIN_COLORS[coin] }}>{coin.toUpperCase()}</div>
              <div className="cs-coin__val">{currency[coin] ?? 0}</div>
            </div>
          ))}
        </div>

        {/* Equipment list */}
        <div className="cs-field">
          <div className="cs-field__label">Equipment</div>
          {equipmentText
            ? <pre className="cs-field__text" style={{ margin: 0, fontFamily: 'inherit' }}>{equipmentText}</pre>
            : <span className="cs-field__text--empty">No equipment listed</span>}
        </div>

        {/* Treasure */}
        {treasure && (
          <div className="cs-field">
            <div className="cs-field__label">Treasure</div>
            <div className="cs-field__text">{treasure}</div>
          </div>
        )}
      </div>
    </div>
  )
}
