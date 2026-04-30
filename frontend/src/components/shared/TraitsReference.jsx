import React, { useState, useEffect, useRef } from 'react'
import { Search, Info, RefreshCw, CheckCircle, Loader2, BookOpen, X } from 'lucide-react'
import useEncyclopediaStore from '../../store/useEncyclopediaStore'
import SyncEncyclopedia from './SyncEncyclopedia'

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

export default function TraitsReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTrait, setSelectedTrait] = useState(null)
  const [traitDetails, setTraitDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [loadingCategory, setLoadingCategory] = useState(false)

  // Categorías disponibles
  const categories = ['all', 'races', 'classes', 'features', 'traits', 'feats', 'backgrounds', 'proficiencies']

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedTrait(null)
    setTraitDetails(null)
    setSearchQuery('')
    // Búsqueda instantánea al cambiar de categoría
    searchTraits('', category)
  }

  // Obtener métodos del store de cache
  const { setSearchCache, getSearchCached, setDetailsCache, getDetailsCached } = useEncyclopediaStore()

  const abortControllerRef = React.useRef(null)

  // Función auxiliar de búsqueda
  const searchTraits = async (query, category) => {
    // Cancelar petición anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    // 1. Verificar cache primero
    const cachedResults = getSearchCached(category, query)
    if (cachedResults) {
      setCategoryData(cachedResults)
      return
    }

    setLoadingCategory(true)
    try {
      const traitCategories = ['races', 'classes', 'features', 'traits', 'feats', 'backgrounds', 'proficiencies']
      const catParam = category === 'all' 
        ? `&categories=${traitCategories.join(',')}` 
        : `&categories=${category}`
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dnd5e/search?q=${query}${catParam}&limit=50`,
        { signal: abortControllerRef.current.signal }
      )
      if (response.ok) {
        const data = await response.json()
        const results = data.results.map(r => ({ 
          ...r.data, 
          index: r.index,      // Usar el índice de la DB
          category: r.category // Usar la categoría de la DB
        })) || []
        
        // 2. Guardar en cache
        setSearchCache(category, query, results)
        setCategoryData(results)
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('Error searching traits:', err)
    } finally {
      setLoadingCategory(false)
    }
  }

  // Filtrar rasgos por búsqueda (Frontend side filter for responsiveness)
  const filteredTraits = categoryData.filter(trait =>
    trait.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Carga inicial
  useEffect(() => {
    searchTraits('', 'all')
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  // Efecto solo para la búsqueda por texto (con debounce)
  useEffect(() => {
    if (searchQuery === '') return // Evitamos disparar si está vacío porque handleCategoryChange ya lo hizo

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchTraits(searchQuery, selectedCategory)
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Cargar detalles del rasgo
  const handleSelectTrait = async (trait) => {
    setSelectedTrait(trait)
    
    // 1. Verificar cache primero
    const category = trait.category || selectedCategory
    const cachedDetails = getDetailsCached(category, trait.index)
    if (cachedDetails) {
      setTraitDetails(cachedDetails)
      return
    }

    setLoadingDetails(true)
    setTraitDetails(null)

    try {
      // Usar nuestro endpoint de detalle local
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dnd5e/detail/${category}/${trait.index}`

      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        
        // 2. Guardar en cache
        setDetailsCache(category, trait.index, data)
        setTraitDetails(data)
      } else {
        setTraitDetails({ error: true })
      }
    } catch (err) {
      console.error('Error loading trait details:', err)
      setTraitDetails({ error: true })
    } finally {
      setLoadingDetails(false)
    }
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
      {/* Lista de Rasgos - Lado Izquierdo */}
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
              Rasgos & Características
            </h2>
            <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
              Consulta las pasivas y características especiales de D&D 5e
            </p>
          </div>
          <SyncEncyclopedia 
            category={selectedCategory === 'all' ? null : selectedCategory} 
            categories={selectedCategory === 'all' ? ['races', 'classes', 'features', 'traits', 'feats', 'backgrounds', 'proficiencies'] : null}
            onComplete={() => searchTraits(searchQuery, selectedCategory)}
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
            placeholder="Buscar rasgo..."
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

        {/* Filtros por categoría */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              disabled={loadingCategory}
              style={{
                fontFamily: 'Almendra, serif',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: selectedCategory === category
                  ? '2px solid var(--fantasy-gold)'
                  : '1px solid rgba(255,255,255,0.1)',
                background: selectedCategory === category
                  ? 'rgba(226,209,166,0.1)'
                  : 'rgba(255,255,255,0.03)',
                color: selectedCategory === category
                  ? 'var(--fantasy-gold)'
                  : 'rgba(226,209,166,0.6)',
                cursor: loadingCategory ? 'not-allowed' : 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                opacity: loadingCategory && selectedCategory !== category ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category && !loadingCategory) {
                  e.currentTarget.style.borderColor = 'rgba(217,83,30,0.3)'
                  e.currentTarget.style.color = 'var(--fantasy-gold)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(226,209,166,0.6)'
                }
              }}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        {/* Indicador de carga */}
        {loadingCategory && (
          <div style={{ textAlign: 'center', padding: '1rem', color: 'rgba(226,209,166,0.4)', fontSize: '0.9rem' }}>
            Cargando categoría...
          </div>
        )}

        {/* Lista de Rasgos */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          paddingRight: '0.5rem',
        }}>
          {filteredTraits.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
              <BookOpen size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No se encontraron rasgos para "{searchQuery}"</p>
            </div>
          ) : (
            filteredTraits.map((trait) => (
              <button
                key={trait.index}
                onClick={() => handleSelectTrait(trait)}
                style={{
                  background: selectedTrait?.index === trait.index
                    ? 'rgba(217,83,30,0.15)'
                    : 'rgba(255,255,255,0.03)',
                  border: selectedTrait?.index === trait.index
                    ? '2px solid rgba(217,83,30,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '1rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (selectedTrait?.index !== trait.index) {
                    e.currentTarget.style.background = 'rgba(217,83,30,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(217,83,30,0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTrait?.index !== trait.index) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }
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
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(226,209,166,0.5)',
                  margin: 0,
                }}>
                  Haz clic para ver detalles
                </p>
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
          Total: {filteredTraits.length} de {categoryData.length} en {selectedCategory === 'all' ? 'todas las categorías' : selectedCategory}
        </div>
      </div>

      {/* Columna Derecha Sticky */}
      <div className="traits-panel" style={rightColumnStyle}>
        {selectedTrait ? (
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
              {selectedTrait.name}
            </h2>
            <button
              onClick={() => {
                setSelectedTrait(null)
                setTraitDetails(null)
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
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fantasy-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(226,209,166,0.5)'}
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido */}
          {loadingDetails ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(226,209,166,0.4)' }}>
              <div style={{
                display: 'inline-block',
                width: 24,
                height: 24,
                border: '3px solid rgba(217,83,30,0.2)',
                borderTop: '3px solid var(--fantasy-gold)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ marginTop: '1rem' }}>Cargando detalles...</p>
            </div>
          ) : traitDetails?.error ? (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10,
              padding: '1rem',
              color: '#fca5a5',
              fontSize: '0.9rem',
            }}>
              No se pudieron cargar los detalles de este rasgo. Verifica tu conexión.
            </div>
                     ) : traitDetails ? (
            <>
              {/* Descripción - maneja diferentes formatos de la API */}
              {traitDetails && (
                <div>
                  <h4 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '0 0 0.75rem 0',
                  }}>
                    Información
                  </h4>
                  <div style={{ color: 'rgba(226,209,166,0.75)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {/* Descripción general */}
                    {traitDetails.desc && traitDetails.desc.length > 0 && traitDetails.desc.map((paragraph, idx) => (
                      <p key={idx} style={{ margin: '0.5rem 0' }}>{paragraph}</p>
                    ))}

                    {/* Para Razas: edad, alineamiento, tamaño, idiomas */}
                    {traitDetails.age && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Edad:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.age}</p>
                      </>
                    )}
                    {traitDetails.alignment && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Alineamiento:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.alignment}</p>
                      </>
                    )}
                    {traitDetails.size_description && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Tamaño:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.size_description}</p>
                      </>
                    )}
                    {traitDetails.language_desc && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Idiomas:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.language_desc}</p>
                      </>
                    )}

                    {/* Para Clases: hit die, saving throws */}
                    {traitDetails.hit_die && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Dado de Golpe:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>d{traitDetails.hit_die}</p>
                      </>
                    )}
                    {traitDetails.saving_throws && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Tiradas de Salvación:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.saving_throws.map(st => st.name).join(', ')}</p>
                      </>
                    )}

                    {traitDetails.ability_score && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Aumento de Puntuación de Habilidad:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>+{traitDetails.ability_score.increase} {traitDetails.ability_score.name}</p>
                      </>
                    )}
                    {traitDetails.talent && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Talento:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.talent.name}</p>
                      </>
                    )}

                    {/* Para Backgrounds */}
                    {traitDetails.feature && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Característica:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.feature.name}</p>
                      </>
                    )}

                    {/* Para Proficiencies */}
                    {traitDetails.type && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Tipo:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.type}</p>
                      </>
                    )}
                    {traitDetails.classes && traitDetails.classes.length > 0 && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Clases:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.classes.map(c => c.name).join(', ')}</p>
                      </>
                    )}
                    {traitDetails.races && traitDetails.races.length > 0 && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Razas:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{traitDetails.races.map(r => r.name).join(', ')}</p>
                      </>
                    )}

                    {/* Para Feats: Prerrequisitos */}
                    {traitDetails.prerequisites && traitDetails.prerequisites.length > 0 && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Prerrequisitos:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                          {traitDetails.prerequisites.map(p => {
                            if (typeof p === 'string') return p;
                            if (p.ability_score && p.minimum_score) {
                              const scoreName = typeof p.ability_score === 'object' ? p.ability_score.name : p.ability_score;
                              return `${scoreName} ${p.minimum_score}`;
                            }
                            if (p.feature) return p.feature;
                            return JSON.stringify(p);
                          }).join(', ')}
                        </p>
                      </>
                    )}

                    {/* Para Backgrounds: Rasgos, Ideales, Vínculos, Defectos */}
                    {traitDetails.personality_traits && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Rasgos de Personalidad:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                          {(traitDetails.personality_traits.from?.options?.length || traitDetails.personality_traits.length || 0)} opciones disponibles
                        </p>
                      </>
                    )}
                    {traitDetails.ideals && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Ideales:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                          {(traitDetails.ideals.from?.options?.length || traitDetails.ideals.length || 0)} opciones disponibles
                        </p>
                      </>
                    )}
                    {traitDetails.bonds && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Vínculos:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                          {(traitDetails.bonds.from?.options?.length || traitDetails.bonds.length || 0)} opciones disponibles
                        </p>
                      </>
                    )}
                    {traitDetails.flaws && (
                      <>
                        <p style={{ margin: '0.5rem 0', fontWeight: 700, color: 'rgba(226,209,166,0.9)' }}>Defectos:</p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                          {(traitDetails.flaws.from?.options?.length || traitDetails.flaws.length || 0)} opciones disponibles
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Proficiencias - maneja starting_proficiencies para razas y proficiencies para clases */}
              {(traitDetails.proficiencies || traitDetails.starting_proficiencies) && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <h4 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '0 0 0.5rem 0',
                  }}>
                    Proficiencias
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {(traitDetails.proficiencies || traitDetails.starting_proficiencies).map((prof, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(217,83,30,0.15)',
                        border: '1px solid rgba(217,83,30,0.3)',
                        borderRadius: 6,
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.8rem',
                        color: 'rgba(226,209,166,0.8)',
                      }}>
                        {prof.name || prof.item?.name || prof}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bonificaciones de habilidad */}
              {traitDetails.ability_bonuses && traitDetails.ability_bonuses.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <h4 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '0 0 0.5rem 0',
                  }}>
                    Bonificaciones de Habilidad
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(226,209,166,0.7)' }}>
                    {traitDetails.ability_bonuses.map((bonus, idx) => (
                      <div key={idx}>+{bonus.bonus} {bonus.ability_score?.name || bonus.ability_score?.index || 'N/A'}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Traits (para razas) */}
              {traitDetails.traits && traitDetails.traits.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <h4 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '0 0 0.5rem 0',
                  }}>
                    Rasgos
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {traitDetails.traits.map((trait, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(226,209,166,0.1)',
                        border: '1px solid rgba(226,209,166,0.2)',
                        borderRadius: 6,
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.8rem',
                        color: 'rgba(226,209,166,0.8)',
                      }}>
                        {trait.name || trait}
                      </span>
                    ))}
                  </div>
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
                Fuente: D&D 5e API - {selectedCategory === 'all' ? 'traits' : selectedCategory}
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
            Selecciona un rasgo para ver su descripción detallada.
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    </>
  )
}
