import React, { useMemo, useState } from 'react'
import { Search, Skull, X } from 'lucide-react'
import monstersData from '../data/dnd-monsters.json'

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

export default function MonstersReference() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedMonster, setSelectedMonster] = useState(null)

  const monsterTypes = useMemo(() => {
    return ['all', ...new Set(monstersData.results.map((monster) => monster.type))]
  }, [])

  const filteredMonsters = monstersData.results.filter((monster) => {
    const matchesSearch = monster.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || monster.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 380px',
      gap: '1rem',
      minHeight: '100%',
      alignItems: 'start',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
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
            Monstruos
          </h2>
          <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '0.95rem', margin: 0 }}>
            Bestiario base con descripciones rápidas para consulta en sesión.
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

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {monsterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                fontFamily: 'Almendra, serif',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: selectedType === type ? '2px solid var(--fantasy-gold)' : '1px solid rgba(255,255,255,0.1)',
                background: selectedType === type ? 'rgba(226,209,166,0.1)' : 'rgba(255,255,255,0.03)',
                color: selectedType === type ? 'var(--fantasy-gold)' : 'rgba(226,209,166,0.6)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
            >
              {type === 'all' ? 'Todos' : type}
            </button>
          ))}
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
              <p>No se encontraron monstruos para "{searchQuery}"</p>
            </div>
          ) : (
            filteredMonsters.map((monster) => (
              <button
                key={monster.index}
                onClick={() => setSelectedMonster(monster)}
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
                <p style={{ fontSize: '0.8rem', color: 'rgba(226,209,166,0.5)', margin: 0, textTransform: 'capitalize' }}>
                  {monster.type} · CR {monster.challenge_rating}
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
          Total: {filteredMonsters.length} de {monstersData.count} monstruos
        </div>
      </div>

      <div style={rightColumnStyle}>
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

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.7rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(226,209,166,0.75)',
              textTransform: 'capitalize',
            }}>
              Tipo: {selectedMonster.type}
            </span>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.7rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(226,209,166,0.75)',
            }}>
              Tamaño: {selectedMonster.size}
            </span>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.7rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(226,209,166,0.75)',
            }}>
              CR: {selectedMonster.challenge_rating}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.75rem',
          }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Armor Class</div>
              <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{selectedMonster.armor_class}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Hit Points</div>
              <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{selectedMonster.hit_points}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Hit Dice</div>
              <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{selectedMonster.hit_dice}</div>
            </div>
            <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', color: 'rgba(226,209,166,0.35)', marginBottom: 4 }}>Speed</div>
              <div style={{ color: 'var(--fantasy-gold)', fontWeight: 700, textAlign: 'center' }}>{selectedMonster.speed}</div>
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
                    {selectedMonster[ability]}
                  </div>
                </div>
              ))}
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
              Resistencias y Vulnerabilidades
            </h3>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              <div><strong>Vulnerabilidades:</strong> {formatList(selectedMonster.damage_vulnerabilities)}</div>
              <div><strong>Resistencias:</strong> {formatList(selectedMonster.damage_resistances)}</div>
              <div><strong>Inmunidades al daño:</strong> {formatList(selectedMonster.damage_immunities)}</div>
              <div><strong>Inmunidades a estados:</strong> {formatList(selectedMonster.condition_immunities)}</div>
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
              Descripción
            </h3>
            <div style={{ color: 'rgba(226,209,166,0.75)', lineHeight: 1.6 }}>
              {selectedMonster.desc.map((paragraph, idx) => (
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
            Selecciona un monstruo para ver su descripción detallada.
          </div>
        )}
      </div>
    </div>
  )
}
