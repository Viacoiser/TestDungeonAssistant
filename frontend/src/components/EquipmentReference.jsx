import React, { useState, useEffect, useRef } from 'react'
import { Search, Package, X, Info, RefreshCw, CheckCircle, Loader2 } from 'lucide-react'
import useEncyclopediaStore from '../store/useEncyclopediaStore'
import SyncEncyclopedia from './SyncEncyclopedia'

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

  // Obtener store
  const { setSearchCache, getSearchCached, setDetailsCache, getDetailsCached } = useEncyclopediaStore()

  // Función de búsqueda en el backend
  const searchItems = async (query, type) => {
    // Cancelar petición anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    // 1. Verificar cache
    const cached = getSearchCached('equipment', `${type}:${query}`)
    if (cached) {
      setCategoryData(cached)
      return
    }

    setLoadingCategory(true)
    try {
      const searchCats = 'equipment,magic-items'
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dnd5e/search?q=${query}&categories=${searchCats}&limit=500`, { signal: abortControllerRef.current.signal })
      if (response.ok) {
        const data = await response.json()
        let results = data.results.map(r => ({ 
          ...r.data, 
          index: r.index, 
          category: r.category 
        }))
        if (type !== 'all') {
          results = results.filter(item => {
            const catIndex = item.equipment_category?.index?.toLowerCase() || '';
            const itemType = item.type?.toLowerCase() || '';
            const itemName = item.name?.toLowerCase() || '';
            const targetType = type.toLowerCase();
            
            // Lógica especial para armas (fusionar normales y mágicas)
            if (targetType === 'weapon') {
              const isWeapon = 
                catIndex.includes('weapon') || 
                itemType.includes('weapon') ||
                item.weapon_range || 
                item.damage ||
                // Búsqueda por palabras clave (más robusta)
                ['sword', 'axe', 'bow', 'dagger', 'mace', 'spear', 'staff', 'warhammer', 'club', 'glaive', 'halberd', 'lance', 'maul', 'pike', 'rapier', 'scimitar', 'trident', 'whip', 'blowgun', 'dart', 'sling'].some(w => itemName.includes(w));
              return isWeapon;
            }

            // Lógica especial para armaduras
            if (targetType === 'armor') {
              return catIndex.includes('armor') || item.armor_class || itemType.includes('armor');
            }
            
            // Lógica especial para Gear (fusionar equipo común y consumibles mágicos)
            if (targetType === 'adventuring-gear') {
              const isGear = 
                catIndex.includes('gear') || 
                catIndex.includes('kit') ||
                itemType.includes('gear') ||
                // Incluir pociones y pergaminos mágicos aquí
                ['potion', 'scroll'].some(t => catIndex.includes(t) || itemName.includes(t));
              return isGear;
            }
            
            // Para objetos mágicos (pestaña Magic), mostrar lo que NO es arma/armadura/gear
            if (targetType === 'magic') {
              const isCommonType = 
                catIndex.includes('weapon') || item.weapon_range || item.damage ||
                catIndex.includes('armor') || item.armor_class ||
                ['potion', 'scroll'].some(t => catIndex.includes(t) || itemName.includes(t));
                
              return (item.category === 'magic-items' || itemType.includes('magic')) && !isCommonType;
            }
            
            return catIndex.includes(targetType) || 
                   itemType.includes(targetType) ||
                   (targetType === 'adventuring-gear' && (catIndex.includes('gear') || catIndex.includes('kit')));
          })
        }
        
        // 2. Guardar en cache
        setSearchCache('equipment', `${type}:${query}`, results)
        setCategoryData(results)
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('Error searching equipment:', err)
    } finally {
      setLoadingCategory(false)
    }
  }

  // Carga inicial
  useEffect(() => {
    searchItems('', 'all')
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  // Cargar detalles
  const handleSelectItem = async (item) => {
    setSelectedItem(item)
    
    // 1. Verificar cache
    const cachedDetails = getDetailsCached('equipment', item.index)
    if (cachedDetails) {
      setItemDetails(cachedDetails)
      return
    }

    setLoadingDetails(true)
    setItemDetails(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dnd5e/detail/equipment/${item.index}`)
      if (response.ok) {
        const data = await response.json()
        
        // 2. Guardar en cache
        setDetailsCache('equipment', item.index, data)
        setItemDetails(data)
      }
    } catch (err) {
      console.error('Error loading item details:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  // Efecto solo para la búsqueda por texto (con debounce)
  useEffect(() => {
    if (searchQuery === '') return

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchItems(searchQuery, selectedType)
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Filtrar equipamiento local (opcional para responsividad inmediata)
  const filteredItems = categoryData

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
      {/* Lista de Equipamiento - Lado Izquierdo */}
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
              Equipamiento
            </h2>
            <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
              Armas, armaduras y objetos mágicos de D&D 5e
            </p>
          </div>
          <SyncEncyclopedia 
            category={
              selectedType === 'all' ? null : 
              selectedType === 'magic' ? 'magic-items' : 
              `equipment-categories/${selectedType}`
            } 
            categories={
              selectedType === 'all' ? ['equipment', 'magic-items'] : 
              (selectedType === 'weapon' || selectedType === 'armor' || selectedType === 'adventuring-gear') ? [`equipment-categories/${selectedType}`, 'magic-items'] : 
              selectedType === 'magic' ? ['magic-items'] :
              null
            }
            onComplete={() => searchItems(searchQuery, selectedType)}
          />
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
                  background: selectedItem?.index === item.index
                    ? 'rgba(217,83,30,0.15)'
                    : 'rgba(255,255,255,0.03)',
                  border: selectedItem?.index === item.index
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
                  {item.cost && <span>💰 {item.cost.quantity}{item.cost.unit}</span>}
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
      <div className="equipment-panel" style={rightColumnStyle}>
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
    </>
  )
}
