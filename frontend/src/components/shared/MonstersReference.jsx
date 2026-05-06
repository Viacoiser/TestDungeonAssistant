import React, { useMemo, useState, useEffect } from 'react'
import { Search, Skull, X, Info, RefreshCw, CheckCircle, Loader2, BookOpen } from 'lucide-react'
import monstersData from '../../data/encyclopedia/monsters.json'
const abilityLabels = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
}

const formatList = (values) => {
  if (!values || values.length === 0) return 'Ninguna'
  return values.join(', ')
}

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

export default function MonstersReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedMonster, setSelectedMonster] = useState(null)
  const [monsterDetails, setMonsterDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [loadingCategory, setLoadingCategory] = useState(false)

  const searchMonsters = (query) => {
    setLoadingCategory(true)
    let results = monstersData
    
    if (query) {
      results = results.filter(m => m.name.toLowerCase().includes(query.toLowerCase()))
    }
    
    setCategoryData(results)
    setLoadingCategory(false)
  }

  // Cargar detalles
  const handleSelectMonster = (monster) => {
    setSelectedMonster(monster)
    setMonsterDetails(monster)
  }

  // Efecto para búsqueda (con debounce) y carga inicial
  useEffect(() => {
    if (searchQuery === '') {
      searchMonsters('')
      return
    }

    const delayDebounceFn = setTimeout(() => {
      searchMonsters(searchQuery)
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const filteredMonsters = categoryData

  return (
    <>
    <div className="w-full max-w-7xl mx-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6 h-full items-start">
      {/* Lista de Monstruos - Lado Izquierdo */}
      <div className={`${!selectedMonster ? 'flex' : 'hidden md:flex'} flex-col gap-6 min-w-0`}>
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
              Bestiario & Monstruos
            </h2>
            <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
              Consulta las estadísticas de criaturas y monstruos de D&D 5e
            </p>
          </div>
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
                key={monster.id || monster.index}
                onClick={() => handleSelectMonster(monster)}
                style={{
                  background: selectedMonster?.id === monster.id ? 'rgba(217,83,30,0.15)' : 'rgba(255,255,255,0.03)',
                  border: selectedMonster?.id === monster.id ? '2px solid rgba(217,83,30,0.5)' : '1px solid rgba(255,255,255,0.08)',
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

      {/* Columna Derecha Sticky */}
      <div className={`${selectedMonster ? 'block' : 'hidden md:block'} md:sticky md:top-0 w-full`}>
        {selectedMonster ? (
          <div style={detailPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h2 style={{
                fontFamily: 'Almendra, serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--fantasy-gold)',
                margin: 0,
              }}>
                {selectedMonster.name}
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedMonster(null)
                setMonsterDetails(null)
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
              setSelectedMonster(null)
              setMonsterDetails(null)
            }}
            className="md:hidden flex items-center justify-center gap-2 w-full py-3 mt-2 bg-white/5 border border-white/10 rounded-xl text-fantasy-gold hover:bg-white/10 transition-colors"
          >
            <CheckCircle size={16} />
            Volver a la lista
          </button>

          {loadingDetails ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>
          ) : monsterDetails ? (
            <>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.7rem',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(226,209,166,0.75)',
                  textTransform: 'capitalize',
                }}>
                  Tipo: {monsterDetails.type}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.7rem',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(226,209,166,0.75)',
                }}>
                  Tamaño: {monsterDetails.size}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.7rem',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(226,209,166,0.75)',
                }}>
                  CR: {monsterDetails.challenge_rating}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '0.75rem',
              }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Armor Class</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{monsterDetails.armor_class}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Hit Points</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{monsterDetails.hit_points}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Hit Dice</div>
                  <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{monsterDetails.hit_dice}</div>
                </div>
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'Almendra, serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'rgba(226,209,166,0.9)',
                  margin: '0 0 0.75rem 0',
                }}>
                  Stats
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '0.5rem' }}>
                  {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability) => (
                    <div key={ability} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.65rem 0.35rem' }}>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>
                        {abilityLabels[ability]}
                      </div>
                      <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>
                        {monsterDetails[ability]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {monsterDetails.actions && monsterDetails.actions.length > 0 && (
                <div>
                  <h3 style={{
                    fontFamily: 'Almendra, serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.9)',
                    margin: '1rem 0 0.75rem 0',
                  }}>
                    Acciones
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {monsterDetails.actions.map((action, i) => (
                      <div key={i} style={{ fontSize: '0.9rem', borderLeft: '2px solid rgba(217,83,30,0.3)', paddingLeft: '0.75rem' }}>
                        <strong style={{ color: 'var(--fantasy-gold)' }}>{action.name}:</strong> {action.desc}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
            Selecciona un monstruo para ver su descripción detallada.
          </div>
        )}
      </div>
      </div>
    </div>
    </>
  )
}
