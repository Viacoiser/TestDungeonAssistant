import React, { useMemo, useState, useCallback } from 'react'
import { Search, Skull, X } from 'lucide-react'
import { useEncyclopedia } from '@/hooks/useEncyclopedia'

const detailPanelStyle = {
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
  position: 'sticky',
  top: 0,
  alignSelf: 'flex-start',
  flexShrink: 0,
  height: 'fit-content',
}

const metaBoxStyle = {
  fontSize: '0.8rem',
  borderRadius: 8,
  padding: '0.65rem 0.75rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: 'rgba(226,209,166,0.75)',
}

export default function MonstersReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCR, setSelectedCR] = useState('all')
  const [selectedMonster, setSelectedMonster] = useState(null)

  // Load static monsters data - instant, no loading needed
  const { data: allMonsters = [] } = useEncyclopedia('monsters')

  // Extract unique CR values
  const crValues = useMemo(() => {
    const crs = new Set(['all'])
    allMonsters.forEach(monster => {
      if (monster.challenge_rating !== undefined) {
        crs.add(String(monster.challenge_rating))
      }
    })
    return Array.from(crs).sort((a, b) => {
      if (a === 'all') return -1
      if (b === 'all') return 1
      return parseFloat(a) - parseFloat(b)
    })
  }, [allMonsters])

  // Filter monsters by CR and search query - all client-side
  const filteredMonsters = useMemo(() => {
    let result = allMonsters

    // Filter by CR
    if (selectedCR !== 'all') {
      result = result.filter(monster =>
        String(monster.challenge_rating) === selectedCR
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(monster =>
        monster.name.toLowerCase().includes(query) ||
        monster.type.toLowerCase().includes(query)
      )
    }

    return result
  }, [allMonsters, selectedCR, searchQuery])

  const handleSelectMonster = useCallback((monster) => {
    setSelectedMonster(monster)
  }, [])

  const renderDescription = (desc) => {
    if (!desc) return null
    if (typeof desc === 'string') return desc
    if (desc.value) return desc.value
    return ''
  }

  const renderAction = (action) => {
    if (!action) return null
    const text = typeof action === 'string' ? action : action?.value || ''
    return text
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .monsters-container {
            grid-template-columns: 1fr !important;
          }
          .monsters-panel {
            position: relative !important;
            top: auto !important;
            width: 100% !important;
            max-width: none !important;
            max-height: none !important;
          }
          .monsters-list {
            display: none !important;
          }
          .monsters-list.active {
            display: flex !important;
          }
        }
      `}</style>
      <div className="monsters-container" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '1rem',
        minHeight: '100%',
        alignItems: 'start',
      }}>
        <div className="monsters-list active" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          {/* Header */}
          <div style={{ 
            animation: 'fadeInUp 0.4s ease forwards', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start' 
          }}>
            <div>
              <h2 style={{
                fontFamily: 'Almendra, serif',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--fantasy-gold)',
                margin: 0,
                marginBottom: '0.5rem',
                textShadow: '0 0 30px rgba(217,83,30,0.2)',
              }}>
                Criaturas & Monstruos
              </h2>
              <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
                Bestiario completo de D&D 5e
              </p>
            </div>
          </div>

          {/* CR Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {crValues.slice(0, 8).map((cr) => (
              <button
                key={cr}
                onClick={() => {
                  setSelectedCR(cr)
                  setSearchQuery('')
                }}
                style={{
                  fontFamily: 'Almendra, serif',
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  border: selectedCR === cr ? '2px solid var(--fantasy-gold)' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedCR === cr ? 'rgba(226,209,166,0.1)' : 'rgba(255,255,255,0.03)',
                  color: selectedCR === cr ? 'var(--fantasy-gold)' : 'rgba(226,209,166,0.6)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {cr === 'all' ? 'Todos' : `CR ${cr}`}
              </button>
            ))}
          </div>

          {/* Search Box */}
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
              placeholder="Buscar monstruo..."
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

          {/* Monsters List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingRight: '0.5rem',
          }}>
            {filteredMonsters.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
                <Skull size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>No se encontraron monstruos</p>
              </div>
            ) : (
              filteredMonsters.map((monster) => (
                <button
                  key={monster.index}
                  onClick={() => handleSelectMonster(monster)}
                  style={{
                    background: selectedMonster?.index === monster.index ? 'rgba(217,83,30,0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedMonster?.index === monster.index ? '2px solid rgba(217,83,30,0.5)' : '1px solid rgba(255,255,255,0.08)',
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
                    {monster.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(226,209,166,0.5)', margin: 0 }}>
                    {monster.type} • CR {monster.challenge_rating}
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
            Total: {filteredMonsters.length} monstruos encontrados
          </div>
        </div>

        {/* Detail Panel */}
        <div className="monsters-panel" style={rightColumnStyle}>
          {selectedMonster ? (
            <div style={detailPanelStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                <h2 style={{
                  fontFamily: 'Almendra, serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--fantasy-gold)',
                  margin: 0,
                }}>
                  {selectedMonster.name}
                </h2>
                <button
                  onClick={() => setSelectedMonster(null)}
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

              {/* Meta Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={metaBoxStyle}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Tipo</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedMonster.type}</div>
                </div>
                <div style={metaBoxStyle}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>CR</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedMonster.challenge_rating}</div>
                </div>
                {selectedMonster.armor_class && (
                  <div style={metaBoxStyle}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>CA</div>
                    <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedMonster.armor_class}</div>
                  </div>
                )}
                {selectedMonster.hit_points && (
                  <div style={metaBoxStyle}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>PV</div>
                    <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedMonster.hit_points}</div>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedMonster.desc && (
                <div>
                  <h3 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '1rem 0 0.75rem 0',
                  }}>
                    Descripción
                  </h3>
                  <div style={{ color: 'rgba(226,209,166,0.75)', lineHeight: 1.6 }}>
                    {Array.isArray(selectedMonster.desc) ? (
                      selectedMonster.desc.map((paragraph, idx) => {
                        const text = renderDescription(paragraph)
                        return (
                          <p key={idx} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{text}</p>
                        )
                      })
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>{renderDescription(selectedMonster.desc)}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedMonster.actions && selectedMonster.actions.length > 0 && (
                <div>
                  <h3 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '1rem 0 0.5rem 0',
                  }}>
                    Acciones
                  </h3>
                  <div style={{ color: 'rgba(226,209,166,0.75)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {selectedMonster.actions.map((action, idx) => (
                      <div key={idx} style={{ marginBottom: '0.75rem' }}>
                        <strong style={{ color: 'var(--fantasy-gold)' }}>{action.name}:</strong>
                        <p style={{ margin: '0.25rem 0 0 0' }}>{renderAction(action.desc)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              Selecciona un monstruo para ver sus detalles.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
