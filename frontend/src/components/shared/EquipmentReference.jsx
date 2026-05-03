import React, { useState, useEffect, useRef } from 'react'
import { Search, Package, X, Info, RefreshCw, CheckCircle, Loader2 } from 'lucide-react'
import equipmentData from '../../data/encyclopedia/equipment.json'
const detailPanelStyle = {
  position: 'sticky',
  top: 0,
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

export default function EquipmentReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [itemDetails, setItemDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [loadingCategory, setLoadingCategory] = useState(false)
  const abortControllerRef = useRef(null)

  // Categorías funcionales unificadas
  const types = ['all', 'weapon', 'armor', 'adventuring-gear', 'tools', 'magic', 'mounts-and-vehicles']

  const searchItems = (query, type) => {
    setLoadingCategory(true)
    let results = equipmentData
    
    if (type !== 'all') {
      results = results.filter(item => {
        const itemType = item.equipment_category?.index || item.category;
        return itemType === type || (type === 'magic' && itemType === 'magic-items');
      });
    }
    
    if (query) {
      results = results.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    }
    
    setCategoryData(results)
    setLoadingCategory(false)
  }

  // Carga inicial
  useEffect(() => {
    searchItems('', 'all')
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  // Cargar detalles
  const handleSelectItem = (item) => {
    setSelectedItem(item)
    setItemDetails(item)
  }

  // Efecto para la búsqueda por texto (con debounce) y carga inicial
  useEffect(() => {
    if (searchQuery === '') {
      searchItems('', selectedType)
      return
    }

    const delayDebounceFn = setTimeout(() => {
      searchItems(searchQuery, selectedType)
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, selectedType])

  // Filtrar equipamiento local (opcional para responsividad inmediata)
  const filteredItems = categoryData

  return (
    <>
    <div className="w-full max-w-7xl mx-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6 h-full items-start">
      {/* Lista de Equipamiento - Lado Izquierdo */}
      <div className={`${!selectedItem ? 'flex' : 'hidden md:flex'} flex-col gap-6 min-w-0`}>
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
              Equipamiento
            </h2>
            <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
              Armas, armaduras y objetos mágicos de D&D 5e
            </p>
          </div>
        </div>

        {/* Buscador */}
        <div style={{ position: 'relative' }}>
          <Search size={17} style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(226,209,166,0.35)',
            pointerEvents: 'none'
          }} />
          <input
            type="text"
            placeholder="Buscar equipamiento..."
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
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(217,83,30,0.5)'
              e.target.style.background = 'rgba(255,255,255,0.08)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)'
              e.target.style.background = 'rgba(255,255,255,0.05)'
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

        {/* Filtros por tipo */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type)
                setSearchQuery('')
                searchItems('', type)
              }}
              style={{
                fontFamily: 'Almendra, serif',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: selectedType === type
                  ? '2px solid var(--fantasy-gold)'
                  : '1px solid rgba(255,255,255,0.1)',
                background: selectedType === type
                  ? 'rgba(226,209,166,0.1)'
                  : 'rgba(255,255,255,0.03)',
                color: selectedType === type
                  ? 'var(--fantasy-gold)'
                  : 'rgba(226,209,166,0.6)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedType !== type) {
                  e.currentTarget.style.borderColor = 'rgba(217,83,30,0.3)'
                  e.currentTarget.style.color = 'var(--fantasy-gold)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedType !== type) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(226,209,166,0.6)'
                }
              }}
            >
              {type === 'all' ? 'Todos' : 
               type === 'adventuring-gear' ? 'Gear' : 
               type === 'tools' ? 'Tools' : 
               type === 'magic' ? 'Magic' : 
               type === 'mounts-and-vehicles' ? 'Transport' :
               type}
            </button>
          ))}
        </div>

        {/* Lista de Equipamiento */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          paddingRight: '0.5rem',
        }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
              <Package size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No se encontró equipamiento</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectItem(item)}
                style={{
                  background: selectedItem?.id === item.id || selectedItem?.index === item.index
                    ? 'rgba(217,83,30,0.15)'
                    : 'rgba(255,255,255,0.03)',
                  border: selectedItem?.id === item.id || selectedItem?.index === item.index
                    ? '2px solid rgba(217,83,30,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
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
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'rgba(226,209,166,0.5)', flexWrap: 'wrap' }}>
                  {item.equipment_category?.name && <span>📦 {item.equipment_category.name}</span>}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Info */}
        <div style={{
          textAlign: 'center',
          padding: '1rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 8,
          fontSize: '0.8rem',
          color: 'rgba(226,209,166,0.3)',
        }}>
          Total: {filteredItems.length} objetos encontrados
        </div>
      </div>

      {/* Columna Derecha Sticky */}
      <div className={`${selectedItem ? 'block' : 'hidden md:block'} md:sticky md:top-0 w-full`}>
        {selectedItem ? (
          <div style={detailPanelStyle}>
          {/* Header del Panel */}
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
              onClick={() => {
                setSelectedItem(null)
                setItemDetails(null)
              }}
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

          {/* Botón Volver a la lista (Solo móvil) */}
          <button
            onClick={() => {
              setSelectedItem(null)
              setItemDetails(null)
            }}
            className="md:hidden flex items-center justify-center gap-2 w-full py-3 mt-2 bg-white/5 border border-white/10 rounded-xl text-fantasy-gold hover:bg-white/10 transition-colors"
          >
            <CheckCircle size={16} />
            Volver a la lista
          </button>

          {/* Información del Item */}
          {loadingDetails ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>
          ) : itemDetails ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(226,209,166,0.75)', lineHeight: 1.6 }}>
              {/* Tipo */}
              <div>
                <h3 style={{
                  fontFamily: 'Almendra, serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'rgba(226,209,166,0.9)',
                  margin: '0 0 0.5rem 0',
                }}>
                  Clasificación
                </h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(217,83,30,0.2)', padding: '0.5rem 1rem', borderRadius: 6, fontSize: '0.9rem', textTransform: 'capitalize', fontWeight: 600 }}>
                    {itemDetails.equipment_category?.name}
                  </span>
                  {itemDetails.gear_category?.name && (
                    <span style={{ background: 'rgba(217,83,30,0.15)', padding: '0.5rem 1rem', borderRadius: 6, fontSize: '0.9rem' }}>
                      {itemDetails.gear_category.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Costo y Peso */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>Costo</p>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--fantasy-gold)' }}>
                    {itemDetails.cost?.quantity} {itemDetails.cost?.unit}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>Peso</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>{itemDetails.weight} lb.</p>
                </div>
              </div>

              {/* Propiedades de Armas */}
              {itemDetails.damage && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <h3 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '0 0 0.5rem 0',
                  }}>
                    Daño
                  </h3>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fantasy-gold)' }}>
                    {itemDetails.damage.damage_dice} {itemDetails.damage.damage_type?.name}
                  </p>
                  {itemDetails.properties && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {itemDetails.properties.map(p => (
                        <span key={p.index} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                          {p.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Descripción */}
              {itemDetails.desc && itemDetails.desc.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Descripción:</p>
                  {itemDetails.desc.map((d, i) => <p key={i} style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>{d}</p>)}
                </div>
              )}

              {/* Fuente */}
              <div style={{
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.75rem',
                color: 'rgba(226,209,166,0.3)',
              }}>
                Fuente: Enciclopedia Local (D&D 5e)
              </div>
            </div>
          ) : null}
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
            Selecciona un objeto para ver su descripción detallada.
          </div>
        )}
      </div>
      </div>
    </div>
    </>
  )
}
