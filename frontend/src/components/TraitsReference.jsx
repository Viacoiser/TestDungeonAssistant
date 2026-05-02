import React, { useMemo, useState, useCallback } from 'react'
import { Search, BookOpen, X } from 'lucide-react'
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

export default function TraitsReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('traits')
  const [selectedTrait, setSelectedTrait] = useState(null)

  // Load static traits data - instant, no loading needed
  const { data: allTraits = [] } = useEncyclopedia('traits')

  const categories = ['traits', 'races', 'classes', 'features']

  // Filter traits by category and search query - all client-side
  const filteredTraits = useMemo(() => {
    let result = allTraits

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(trait => {
        const category = trait.category || trait.type || 'traits'
        return category.toLowerCase().includes(selectedCategory.toLowerCase())
      })
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(trait =>
        trait.name.toLowerCase().includes(query) ||
        trait.desc?.some(d => {
          const text = typeof d === 'string' ? d : d?.value || ''
          return text.toLowerCase().includes(query)
        })
      )
    }

    return result
  }, [allTraits, selectedCategory, searchQuery])

  const handleSelectTrait = useCallback((trait) => {
    setSelectedTrait(trait)
  }, [])

  const renderDescription = (desc) => {
    if (!desc) return null
    if (typeof desc === 'string') return desc
    if (desc.value) return desc.value
    return ''
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .traits-container {
            grid-template-columns: 1fr !important;
          }
          .traits-panel {
            position: relative !important;
            top: auto !important;
            width: 100% !important;
            max-width: none !important;
            max-height: none !important;
          }
          .traits-list {
            display: none !important;
          }
          .traits-list.active {
            display: flex !important;
          }
        }
      `}</style>
      <div className="traits-container" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '1rem',
        minHeight: '100%',
        alignItems: 'start',
      }}>
        <div className="traits-list active" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
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
                Características & Rasgos
              </h2>
              <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
                Habilidades raciales y de clase de D&D 5e
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setSearchQuery('')
                }}
                style={{
                  fontFamily: 'Almendra, serif',
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  border: selectedCategory === cat ? '2px solid var(--fantasy-gold)' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedCategory === cat ? 'rgba(226,209,166,0.1)' : 'rgba(255,255,255,0.03)',
                  color: selectedCategory === cat ? 'var(--fantasy-gold)' : 'rgba(226,209,166,0.6)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat === 'all' ? 'Todos' : cat}
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
              placeholder="Buscar característica..."
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

          {/* Traits List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingRight: '0.5rem',
          }}>
            {filteredTraits.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
                <BookOpen size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>No se encontraron características</p>
              </div>
            ) : (
              filteredTraits.map((trait) => (
                <button
                  key={trait.index}
                  onClick={() => handleSelectTrait(trait)}
                  style={{
                    background: selectedTrait?.index === trait.index ? 'rgba(217,83,30,0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedTrait?.index === trait.index ? '2px solid rgba(217,83,30,0.5)' : '1px solid rgba(255,255,255,0.08)',
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
                    {trait.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(226,209,166,0.5)', margin: 0 }}>
                    {trait.category || trait.type || 'Rasgo'}
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
            Total: {filteredTraits.length} características encontradas
          </div>
        </div>

        {/* Detail Panel */}
        <div className="traits-panel" style={rightColumnStyle}>
          {selectedTrait ? (
            <div style={detailPanelStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                <h2 style={{
                  fontFamily: 'Almendra, serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--fantasy-gold)',
                  margin: 0,
                }}>
                  {selectedTrait.name}
                </h2>
                <button
                  onClick={() => setSelectedTrait(null)}
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
              {(selectedTrait.category || selectedTrait.type || selectedTrait.parent) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {selectedTrait.category && (
                    <div style={metaBoxStyle}>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Categoría</div>
                      <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedTrait.category}</div>
                    </div>
                  )}
                  {selectedTrait.type && (
                    <div style={metaBoxStyle}>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Tipo</div>
                      <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedTrait.type}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {selectedTrait.desc && (
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
                    {Array.isArray(selectedTrait.desc) ? (
                      selectedTrait.desc.map((paragraph, idx) => {
                        const text = renderDescription(paragraph)
                        return (
                          <p key={idx} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{text}</p>
                        )
                      })
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>{renderDescription(selectedTrait.desc)}</p>
                    )}
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
              Selecciona una característica para ver sus detalles.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
