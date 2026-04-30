import React, { useMemo, useState, useEffect } from 'react'
import { Search, Sparkles, X, Info, RefreshCw, CheckCircle, Loader2, BookOpen } from 'lucide-react'
import useEncyclopediaStore from '../../store/useEncyclopediaStore'
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

export default function SpellsReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSpell, setSelectedSpell] = useState(null)
  const [spellDetails, setSpellDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [loadingCategory, setLoadingCategory] = useState(false)

  const levels = useMemo(() => ['all', 'cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9'], [])

  // Obtener store
  const { setSearchCache, getSearchCached, setDetailsCache, getDetailsCached } = useEncyclopediaStore()

  // Función de búsqueda en el backend
  const searchSpells = async (query, level) => {
    // 1. Verificar cache
    const cached = getSearchCached('spells', `${level}:${query}`)
    if (cached) {
      setCategoryData(cached)
      return
    }

    setLoadingCategory(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dnd5e/search?q=${query}&categories=spells&limit=50`)
      if (response.ok) {
        const data = await response.json()
        let results = data.results.map(r => ({ 
          ...r.data, 
          index: r.index, 
          category: r.category 
        }))
        
        // Filtrar por nivel si no es 'all'
        if (level !== 'all') {
          results = results.filter(spell => {
            const spellLevel = spell.level === 0 ? 'cantrip' : String(spell.level)
            return spellLevel === level
          })
        }
        
        // 2. Guardar en cache
        setSearchCache('spells', `${level}:${query}`, results)
        setCategoryData(results)
      }
    } catch (err) {
      console.error('Error searching spells:', err)
    } finally {
      setLoadingCategory(false)
    }
  }

  // Cargar detalles
  const handleSelectSpell = async (spell) => {
    setSelectedSpell(spell)
    
    // 1. Verificar cache
    const cachedDetails = getDetailsCached('spells', spell.index)
    if (cachedDetails) {
      setSpellDetails(cachedDetails)
      return
    }

    setLoadingDetails(true)
    setSpellDetails(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dnd5e/detail/spells/${spell.index}`)
      if (response.ok) {
        const data = await response.json()
        
        // 2. Guardar en cache
        setDetailsCache('spells', spell.index, data)
        setSpellDetails(data)
      }
    } catch (err) {
      console.error('Error loading spell details:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  // Efecto solo para la búsqueda por texto (con debounce)
  useEffect(() => {
    if (searchQuery === '') return

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchSpells(searchQuery, selectedLevel)
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const filteredSpells = categoryData

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
              Hechizos & Magia
            </h2>
            <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
              Conjuros y rituales arcanos de D&D 5e
            </p>
          </div>
          <SyncEncyclopedia 
            category="spells" 
            onComplete={() => searchSpells(searchQuery, selectedLevel)}
          />
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
              onClick={() => {
                setSelectedLevel(level)
                setSearchQuery('')
                searchSpells('', level)
              }}
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
              <p>No se encontraron hechizos</p>
            </div>
          ) : (
            filteredSpells.map((spell) => (
              <button
                key={spell.index}
                onClick={() => handleSelectSpell(spell)}
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
                  Nivel {spell.level === 0 ? 'Cantrip' : spell.level}
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
          Total: {filteredSpells.length} hechizos encontrados
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
              onClick={() => {
                setSelectedSpell(null)
                setSpellDetails(null)
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

          {loadingDetails ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>
          ) : spellDetails ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={metaBoxStyle}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Nivel</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{spellDetails.level === 0 ? 'Cantrip' : spellDetails.level}</div>
                </div>
                <div style={metaBoxStyle}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Escuela</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{spellDetails.school?.name}</div>
                </div>
                <div style={metaBoxStyle}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Tiempo</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{spellDetails.casting_time}</div>
                </div>
                <div style={metaBoxStyle}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Alcance</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700 }}>{spellDetails.range}</div>
                </div>
              </div>

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
                  {spellDetails.desc?.map((paragraph, idx) => (
                    <p key={idx} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{paragraph}</p>
                  ))}
                  {spellDetails.higher_level && spellDetails.higher_level.length > 0 && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(217,83,30,0.1)', borderRadius: 8 }}>
                      <strong style={{ color: 'var(--fantasy-gold)', fontSize: '0.8rem' }}>A niveles superiores:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>{spellDetails.higher_level[0]}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
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
