import React from 'react'

export default function AttacksTable({ character }) {
  const attacks = character.attacks ?? []

  return (
    <div className="cs-section">
      <div className="cs-section__header">Attacks &amp; Spellcasting</div>
      <div className="cs-section__body" style={{ padding: '0.5rem' }}>
        <table className="cs-attacks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Atk Bonus</th>
              <th>Damage / Type</th>
            </tr>
          </thead>
          <tbody>
            {attacks.map((atk, i) => (
              <tr key={i}>
                <td>
                  {atk.name
                    ? atk.name
                    : <span className="cs-empty">—</span>}
                </td>
                <td>{atk.attack_bonus || '—'}</td>
                <td>
                  {atk.damage
                    ? `${atk.damage}${atk.damage_type ? ` ${atk.damage_type}` : ''}`
                    : <span className="cs-empty">—</span>}
                </td>
              </tr>
            ))}
            {attacks.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', color: 'var(--cs-text-dim)', fontStyle: 'italic' }}>
                  No attacks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
