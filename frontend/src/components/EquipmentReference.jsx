import React, { useMemo, useState, useCallback } from 'react'
import { Search, Package, X } from 'lucide-react'
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

export default function EquipmentReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  // Load static equipment data - instant, no loading needed
  const { data: allEquipment = [] } = useEncyclopedia('equipment')

  const categories = useMemo(() => {
    const cats = new Set(['all'])
    allEquipment.forEach(item => {
      if (item.equipment_category?.name) {
        cats.add(item.equipment_category.name)
      }
    })
    return Array.from(cats).sort()
  }, [allEquipment])

  // Filter equipment by category and search query - all client-side
  const filteredEquipment = useMemo(() => {
    let result = allEquipment

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item =>
        item.equipment_category?.name === selectedCategory
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.desc?.some(d => {
          const text = typeof d === 'string' ? d : d?.value || ''
          return text.toLowerCase().includes(query)
        })
      )
    }

    return result
  }, [allEquipment, selectedCategory, searchQuery])

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item)
  }, [])

  const renderDescription = (desc) => {
    if (!desc) return null
    if (typeof desc === 'string') return desc
    if (desc.value) return desc.value
    return ''
  }

  const renderProperties = (properties) => {
    if (!properties || properties.length === 0) return null
    return properties.map((prop, idx) => {
      const text = typeof prop === 'string' ? prop : prop?.value || ''
      return <div key={idx} style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>• {text}</div>
    })
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .equipment-container {
            grid-template-columns: 1fr !important;
          }
          .equipment-panel {
            position: relative !important;
            top: auto !important;
            width: 100% !important;
            max-width: none !important;
            max-height: none !important;
          }
          .equipment-list {
            display: none !important;
          }
          .equipment-list.active {
            display: flex !important;
          }
        }
      `}</style>
      <div className="equipment-container" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '1rem',
        minHeight: '100%',
        alignItems: 'start',
      }}>
        <div className="equipment-list active" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
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
                Equipo & Armas
              </h2>
              <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
                Equipamiento oficial de D&D 5e
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.slice(0, 6).map((cat) => (
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
                {cat}
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
              placeholder="Buscar equipo..."
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

          {/* Equipment List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingRight: '0.5rem',
          }}>
            {filteredEquipment.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
                <Package size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>No se encontró equipo</p>
              </div>
            ) : (
              filteredEquipment.map((item) => (
                <button
                  key={item.index}
                  onClick={() => handleSelectItem(item)}
                  style={{
                    background: selectedItem?.index === item.index ? 'rgba(217,83,30,0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedItem?.index === item.index ? '2px solid rgba(217,83,30,0.5)' : '1px solid rgba(255,255,255,0.08)',
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
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(226,209,166,0.5)', margin: 0 }}>
                    {item.equipment_category?.name || 'Equipo'}
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
            Total: {filteredEquipment.length} artículos encontrados
          </div>
        </div>

        {/* Detail Panel */}
        <div className="equipment-panel" style={rightColumnStyle}>
          {selectedItem ? (
            <div style={detailPanelStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                <h2 style={{
                  fontFamily: 'Almendra, serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--fantasy-gold)',
                  margin: 0,
                }}>
                  {selectedItem.name}
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
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
                {selectedItem.equipment_category && (
                  <div style={metaBoxStyle}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Categoría</div>
                    <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedItem.equipment_category.name}</div>
                  </div>
                )}
                {selectedItem.weight !== undefined && (
                  <div style={metaBoxStyle}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Peso</div>
                    <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{selectedItem.weight} lbs</div>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedItem.desc && (
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
                    {Array.isArray(selectedItem.desc) ? (
                      selectedItem.desc.map((paragraph, idx) => {
                        const text = renderDescription(paragraph)
                        return (
                          <p key={idx} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{text}</p>
                        )
                      })
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>{renderDescription(selectedItem.desc)}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Properties */}
              {selectedItem.properties && selectedItem.properties.length > 0 && (
                <div>
                  <h3 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '1rem 0 0.5rem 0',
                  }}>
                    Propiedades
                  </h3>
                  <div style={{ color: 'rgba(226,209,166,0.75)' }}>
                    {renderProperties(selectedItem.properties)}
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
              Selecciona un artículo para ver sus detalles.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
