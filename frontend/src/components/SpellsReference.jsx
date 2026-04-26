import React, { useMemo, useState } from 'react'
import { Search, Sparkles, X } from 'lucide-react'
import spellsData from '../data/dnd-spells.json'

const detailPanelStyle = {
  position: 'sticky',
  top: '6.5rem',
  right: 'auto',
  width: '100%',
  maxWidth: '380px',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(217,83,30,0.2)',
  borderRadius: 15,
  maxHeight: 'calc(100vh - 7.5rem)',
  overflowY: 'auto',
  zIndex: 30,
  minWidth: 0,
}

const rightColumnStyle = {
  width: '380px',
  alignSelf: 'flex-start',
  flexShrink: 0,
}

export default function SpellsReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSpell, setSelectedSpell] = useState(null)

  const levels = useMemo(() => ['all', 'cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9'], [])

  const filteredSpells = spellsData.results.filter((spell) => {
    const matchesSearch = spell.name.toLowerCase().includes(searchQuery.toLowerCase())
    const normalizedLevel = spell.level === 0 ? 'cantrip' : String(spell.level)
    const matchesLevel = selectedLevel === 'all' || normalizedLevel === selectedLevel
    return matchesSearch && matchesLevel
  })

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .spells-container {
            grid-template-columns: 1fr !important;
          }
          .spells-panel {
            position: relative !important;
            top: auto !important;
            width: 100% !important;
            max-width: none !important;
            max-height: none !important;
          }
          .spells-list {
            display: none !important;
          }
          .spells-list.active {
            display: flex !important;
          }
        }
      `}</style>
    <div className="spells-container" style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 380px',
      gap: '1rem',
      minHeight: '100%',
      alignItems: 'start',
    }}>
      <div className="spells-list active" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
        <div style={{ animation: 'fadeInUp 0.4s ease forwards' }}>
          <h2 style={{
            fontFamily: 'Almendra, serif',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--fantasy-gold)',
            margin: 0,
            marginBottom: '0.5rem',
            textShadow: '0 0 30px rgba(217,83,30,0.2)',
          }}>
            Spells
          </h2>
          <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
            Biblioteca de hechizos centrada en consulta de descripción y datos clave.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={17} style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(226,209,166,0.35)',
            pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Buscar hechizo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '0.7rem 1rem 0.7rem 2.5rem',
              color: 'var(--fantasy-gold)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s, background 0.2s',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(226,209,166,0.5)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: 0,
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              style={{
                fontFamily: 'Almendra, serif',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: selectedLevel === level ? '2px solid var(--fantasy-gold)' : '1px solid rgba(255,255,255,0.1)',
                background: selectedLevel === level ? 'rgba(226,209,166,0.1)' : 'rgba(255,255,255,0.03)',
                color: selectedLevel === level ? 'var(--fantasy-gold)' : 'rgba(226,209,166,0.6)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
            >
              {level === 'all' ? 'Todos' : level}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          paddingRight: '0.5rem',
        }}>
          {filteredSpells.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
              <Sparkles size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No se encontraron hechizos para "{searchQuery}"</p>
            </div>
          ) : (
            filteredSpells.map((spell) => (
              <button
                key={spell.index}
                onClick={() => setSelectedSpell(spell)}
                style={{
                  background: selectedSpell?.index === spell.index ? 'rgba(217,83,30,0.15)' : 'rgba(255,255,255,0.03)',
                  border: selectedSpell?.index === spell.index ? '2px solid rgba(217,83,30,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '1rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <h3 style={{
                  fontFamily: 'Almendra, serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--fantasy-gold)',
                  margin: '0 0 0.3rem 0',
                }}>
                  {spell.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(226,209,166,0.5)', margin: 0 }}>
                  Nivel {spell.level === 0 ? 'Cantrip' : spell.level} · {spell.school}
                </p>
              </button>
            ))
          )}
        </div>

        <div style={{
          textAlign: 'center',
          padding: '1rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 8,
          fontSize: '0.8rem',
          color: 'rgba(226,209,166,0.3)',
        }}>
          Total: {filteredSpells.length} de {spellsData.count} hechizos
        </div>
      </div>

      <div className="spells-panel" style={rightColumnStyle}>
        {selectedSpell ? (
          <div style={detailPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
            <h2 style={{
              fontFamily: 'Almendra, serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--fantasy-gold)',
              margin: 0,
            }}>
              {selectedSpell.name}
            </h2>
            <button
              onClick={() => setSelectedSpell(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(226,209,166,0.5)',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <div style={metaBoxStyle}>Nivel: {selectedSpell.level === 0 ? 'Cantrip' : selectedSpell.level}</div>
            <div style={metaBoxStyle}>Escuela: {selectedSpell.school}</div>
            <div style={metaBoxStyle}>Tiempo: {selectedSpell.casting_time}</div>
            <div style={metaBoxStyle}>Alcance: {selectedSpell.range}</div>
            <div style={{ ...metaBoxStyle, gridColumn: '1 / -1' }}>Duración: {selectedSpell.duration}</div>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Almendra, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'rgba(226,209,166,0.9)',
              margin: '0 0 0.75rem 0',
            }}>
              Descripción
            </h3>
            <div style={{ color: 'rgba(226,209,166,0.75)', lineHeight: 1.6 }}>
              {selectedSpell.desc.map((paragraph, idx) => (
                <p key={idx} style={{ margin: '0.5rem 0' }}>{paragraph}</p>
              ))}
            </div>
          </div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            borderRadius: 15,
            border: '1px dashed rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.02)',
            padding: '1.25rem',
            color: 'rgba(226,209,166,0.45)',
            fontSize: '0.9rem',
          }}>
            Selecciona un hechizo para ver su descripción detallada.
          </div>
        )}
      </div>
    </div>
    </>
  )
}

const metaBoxStyle = {
  fontSize: '0.8rem',
  borderRadius: 8,
  padding: '0.65rem 0.75rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: 'rgba(226,209,166,0.75)',
}
