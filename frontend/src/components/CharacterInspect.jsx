import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, Save, X, Backpack, Skull, AlertCircle } from 'lucide-react'
import { characterAPI } from '../services/api'
import { useDnd5eAPI } from '../hooks/useDnd5eAPI'
import EquipmentModal from './EquipmentModal'

/**
 * CharacterInspect - Hoja de personaje estilo D&D 5e oficial completa
 * Inspirado en el layout oficial del sistema de D&D 5ª edición
 * CON TABS para organizar: Main Sheet, Abilities, Personality, Feats, Spells, Equipment
 * Soporta modo modal y split-view
 */
export default function CharacterInspect({ character, campaignId, onClose, onUpdate, isGM, mode = 'modal' }) {
  const { calculateMaxHP } = useDnd5eAPI()

  const [editedCharacter, setEditedCharacter] = useState(character)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showEquipment, setShowEquipment] = useState(false)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [activeTab, setActiveTab] = useState('main')

  useEffect(() => {
    setEditedCharacter(character)
    setActiveTab('main')
    setError('')
    setSuccess('')
  }, [character.id])

  useEffect(() => {
    if (isGM) {
      loadHistory()
    }
  }, [character.id])

  const loadHistory = async () => {
    setLoadingHistory(true)
    try {
      const res = await characterAPI.getHistory(character.id)
      setHistory(res.data?.history || [])
    } catch (e) {
      console.error('Error loading history:', e)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleMarkDead = async () => {
    if (!window.confirm(`¿Marcar "${editedCharacter.name}" como difunto?`)) {
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await characterAPI.updateStatus(character.id, false)
      setEditedCharacter(prev => ({ ...prev, is_alive: false }))
      setSuccess('💀 Personaje marcado como difunto')
      await loadHistory()
      setTimeout(() => {
        onUpdate?.({ ...editedCharacter, is_alive: false })
      }, 500)
    } catch (e) {
      console.error('Error marking character as dead:', e)
      setError(e?.response?.data?.detail || 'Error al marcar personaje')
    } finally {
      setLoading(false)
    }
  }

  const handleRevive = async () => {
    if (!window.confirm(`¿Revivir "${editedCharacter.name}"?`)) {
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await characterAPI.updateStatus(character.id, true)
      setEditedCharacter(prev => ({ ...prev, is_alive: true }))
      setSuccess('✨ Personaje revivido')
      await loadHistory()
      setTimeout(() => {
        onUpdate?.({ ...editedCharacter, is_alive: true })
      }, 500)
    } catch (e) {
      console.error('Error reviving character:', e)
      setError(e?.response?.data?.detail || 'Error al revivir personaje')
    } finally {
      setLoading(false)
    }
  }

  const handleLevelChange = (delta) => {
    const newLevel = Math.max(1, Math.min(20, editedCharacter.level + delta))
    const newMaxHP = calculateMaxHP(editedCharacter.class_, newLevel, editedCharacter.stats?.constitution || 10)
    let profBonus = 2
    if (newLevel >= 5) profBonus = 3
    if (newLevel >= 9) profBonus = 4
    if (newLevel >= 13) profBonus = 5
    if (newLevel >= 17) profBonus = 6

    setEditedCharacter(prev => ({
      ...prev,
      level: newLevel,
      hp_max: newMaxHP,
      hp_current: newMaxHP,
      proficiency_bonus: profBonus,
    }))
  }

  const handleHPChange = (value) => {
    const hp = Math.max(0, Math.min(editedCharacter.hp_max, parseInt(value) || 0))
    setEditedCharacter(prev => ({ ...prev, hp_current: hp }))
  }

  const getModifier = (stat) => Math.floor((stat - 10) / 2)
  const getModifierString = (modifier) => {
    const sign = modifier >= 0 ? '+' : ''
    return `${sign}${modifier}`
  }

  const handleStatChange = (stat, newValue) => {
    const val = Math.max(3, Math.min(20, newValue))
    setEditedCharacter(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: val }
    }))
  }

  const handleStatIncrement = (stat, delta) => {
    const current = editedCharacter.stats?.[stat] || 10
    handleStatChange(stat, current + delta)
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const updateData = {
        level: editedCharacter.level,
        hp_max: editedCharacter.hp_max,
        hp_current: editedCharacter.hp_current,
        proficiency_bonus: editedCharacter.proficiency_bonus,
        stats: editedCharacter.stats,
        armor_class: editedCharacter.armor_class,
        initiative: editedCharacter.initiative,
        speed: editedCharacter.speed,
        personality_traits: editedCharacter.personality_traits,
        ideals: editedCharacter.ideals,
        bonds: editedCharacter.bonds,
        flaws: editedCharacter.flaws,
        feats: editedCharacter.feats,
        spell_slots: editedCharacter.spell_slots,
      }

      await characterAPI.update(character.id, updateData)
      setSuccess('✅ Personaje actualizado')

      setTimeout(() => {
        onUpdate?.(editedCharacter)
        onClose()
      }, 1000)
    } catch (e) {
      console.error('Error updating character:', e)
      setError(e?.response?.data?.detail || 'Error al actualizar personaje')
    } finally {
      setLoading(false)
    }
  }

  const handleEquipmentUpdate = async (equipmentData) => {
    try {
      await characterAPI.update(character.id, equipmentData)
      setEditedCharacter(prev => ({ ...prev, ...equipmentData }))
      setSuccess('✅ Equipamiento actualizado')
    } catch (e) {
      console.error('Error updating equipment:', e)
      setError(e?.response?.data?.detail || 'Error al actualizar equipamiento')
    }
  }

  const hpPercent = Math.max(0, (editedCharacter.hp_current / editedCharacter.hp_max) * 100)

  const StatBox = ({ label, value, stat }) => (
    <div style={{
      border: '2px solid rgba(217,83,30,0.3)',
      borderRadius: 4,
      padding: '0.75rem',
      textAlign: 'center',
      background: 'rgba(255,255,255,0.02)',
    }}>
      <div style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'rgba(226,209,166,0.5)',
        marginBottom: '0.5rem',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '1.4rem',
        fontWeight: 900,
        color: '#fbbf24',
        fontFamily: 'monospace',
      }}>
        {value}
      </div>
    </div>
  )

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: mode === 'split-view' ? '0.5rem 1rem' : '0.75rem 1.5rem',
        background: activeTab === id ? 'rgba(217,83,30,0.3)' : 'rgba(255,255,255,0.05)',
        border: activeTab === id ? '1px solid rgba(217,83,30,0.5)' : '1px solid rgba(255,255,255,0.1)',
        color: activeTab === id ? '#fbbf24' : 'rgba(226,209,166,0.6)',
        cursor: 'pointer',
        fontWeight: activeTab === id ? 700 : 400,
        fontSize: mode === 'split-view' ? '0.8rem' : '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderRadius: 4,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={mode === 'modal' ? {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      overflowY: 'auto',
      padding: '1rem',
    } : {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      margin: 0,
    }}>
      <div style={mode === 'modal' ? {
        background: '#1a1a1a',
        border: '2px solid rgba(217,83,30,0.4)',
        width: '100%',
        maxWidth: '1400px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        fontFamily: 'Almendra, serif',
      } : {
        background: '#1a1a1a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        fontFamily: 'Almendra, serif',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* ENCABEZADO */}
        <div style={{
          background: 'linear-gradient(to bottom, rgba(217,83,30,0.25), rgba(26,26,26,0.5))',
          borderBottom: '2px solid rgba(217,83,30,0.4)',
          padding: mode === 'split-view' ? '1rem 1.5rem' : '1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: mode === 'split-view' ? '1fr 80px' : '1fr 1fr 1fr 60px',
          gap: mode === 'split-view' ? '1rem' : '2rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontSize: mode === 'split-view' ? '0.6rem' : '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(226,209,166,0.5)',
              marginBottom: '0.2rem',
            }}>
              {editedCharacter.name}
            </div>
            <div style={{
              fontSize: mode === 'split-view' ? '0.9rem' : '1.2rem',
              fontWeight: 700,
              color: mode === 'split-view' ? 'var(--fantasy-gold)' : '#fff',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}>
              Lvl {editedCharacter.level} {editedCharacter.class_} • {editedCharacter.race}
            </div>
          </div>

          {mode === 'modal' && (
            <>
              <div>
                <div style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'rgba(226,209,166,0.5)',
                  marginBottom: '0.3rem',
                }}>
                  Class & Level
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  {editedCharacter.class_} • Lvl {editedCharacter.level}
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'rgba(226,209,166,0.5)',
                  marginBottom: '0.3rem',
                }}>
                  Race
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  {editedCharacter.race}
                </div>
              </div>
            </>
          )}

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(226,209,166,0.5)',
              cursor: 'pointer',
              fontSize: '1.8rem',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(217,83,30,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(226,209,166,0.5)'}
          >
            <X size={32} />
          </button>
        </div>

        {/* TABS */}
        <div style={{
          background: 'rgba(26,26,26,0.8)',
          borderBottom: '2px solid rgba(217,83,30,0.2)',
          padding: mode === 'split-view' ? '0.75rem 1.5rem' : '1rem 2rem',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
        }}>
          <TabButton id="main" label="Sheet" />
          <TabButton id="abilities" label="Abilities" />
          <TabButton id="traits" label="Personality" />
          <TabButton id="feats" label="Feats" />
          <TabButton id="spells" label="Spells" />
          <TabButton id="equipment" label="Equipment" />
        </div>

        {/* Mensajes */}
        {(error || success) && (
          <div style={{ padding: '0 2rem', paddingTop: '1rem' }}>
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 4,
                padding: '0.75rem',
                color: '#fca5a5',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
              }}>
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div style={{
                background: 'rgba(34,197,94,0.15)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 4,
                padding: '0.75rem',
                color: '#86efac',
                fontSize: '0.9rem',
              }}>
                {success}
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: mode === 'split-view' ? '1rem 1.5rem' : '2rem',
        }}>
          {/* TAB: MAIN CHARACTER SHEET */}
          {activeTab === 'main' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '250px 1fr',
              gap: '2rem',
            }}>
              {/* Columna izquierda: Atributos */}
              <div style={{
                background: 'rgba(217,83,30,0.08)',
                border: '2px solid rgba(217,83,30,0.2)',
                borderRadius: 4,
                padding: '1.5rem',
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  color: 'rgba(226,209,166,0.5)',
                  marginBottom: '1rem',
                }}>
                  Ability Scores
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(stat => {
                    const value = editedCharacter.stats?.[stat] || 10
                    const modifier = getModifier(value)
                    const labels = {
                      strength: 'STR',
                      dexterity: 'DEX',
                      constitution: 'CON',
                      intelligence: 'INT',
                      wisdom: 'WIS',
                      charisma: 'CHA',
                    }

                    return (
                      <div key={stat} style={{
                        border: '2px solid rgba(217,83,30,0.3)',
                        borderRadius: 4,
                        padding: '0.6rem',
                        textAlign: 'center',
                      }}>
                        <div style={{
                          fontSize: '0.6rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'rgba(226,209,166,0.5)',
                          marginBottom: '0.3rem',
                        }}>
                          {labels[stat]}
                        </div>
                        <input
                          type="number"
                          value={value}
                          onChange={e => handleStatChange(stat, parseInt(e.target.value) || 10)}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: '#fbbf24',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            marginBottom: '0.3rem',
                            outline: 'none',
                          }}
                          min="3"
                          max="20"
                        />
                        <div style={{
                          fontSize: '0.8rem',
                          color: modifier >= 0 ? '#86efac' : '#fca5a5',
                          fontWeight: 700,
                        }}>
                          {getModifierString(modifier)}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid rgba(217,83,30,0.2)' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.5)',
                    marginBottom: '0.75rem',
                  }}>
                    Proficiency Bonus
                  </div>
                  <div style={{
                    border: '2px solid rgba(217,83,30,0.3)',
                    borderRadius: 4,
                    padding: '0.75rem',
                    textAlign: 'center',
                    background: 'rgba(217,83,30,0.1)',
                  }}>
                    <div style={{
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: '#fbbf24',
                    }}>
                      +{editedCharacter.proficiency_bonus || 2}
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha: Stats principales */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}>
                  <StatBox label="ARMOR CLASS" value={editedCharacter.armor_class || 10} />
                  <StatBox label="INITIATIVE" value={getModifierString(editedCharacter.initiative !== undefined ? editedCharacter.initiative : getModifier(editedCharacter.stats?.dexterity || 10))} />
                  <StatBox label="SPEED" value={`${editedCharacter.speed || 30} ft`} />
                  <StatBox label="HIT POINT MAXIMUM" value={editedCharacter.hp_max} />
                </div>

                {/* HP ACTUAL */}
                <div style={{
                  border: '3px solid rgba(239,68,68,0.4)',
                  borderRadius: 4,
                  padding: '1.5rem',
                  background: 'rgba(239,68,68,0.08)',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: 700,
                    color: 'rgba(226,209,166,0.5)',
                    marginBottom: '0.75rem',
                  }}>
                    Current Hit Points
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                    <input
                      type="number"
                      value={editedCharacter.hp_current}
                      onChange={e => handleHPChange(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 4,
                        padding: '0.75rem',
                        color: '#f87171',
                        fontSize: '1.8rem',
                        fontWeight: 900,
                        textAlign: 'center',
                      }}
                    />
                    <div style={{
                      fontSize: '1.4rem',
                      color: 'rgba(226,209,166,0.4)',
                      fontWeight: 700,
                    }}>
                      / {editedCharacter.hp_max}
                    </div>
                  </div>

                  {/* HP Bar */}
                  <div style={{
                    height: '20px',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: 2,
                    border: '1px solid rgba(239,68,68,0.3)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      background: hpPercent > 50 ? '#22c55e' : hpPercent > 25 ? '#f59e0b' : '#ef4444',
                      width: `${hpPercent}%`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>

                {/* HIT DICE Y LEVEL */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}>
                  <div style={{
                    border: '2px solid rgba(217,83,30,0.3)',
                    borderRadius: 4,
                    padding: '1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontWeight: 700,
                      color: 'rgba(226,209,166,0.5)',
                      marginBottom: '0.5rem',
                    }}>
                      Hit Dice
                    </div>
                    <div style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#fbbf24',
                    }}>
                      d{editedCharacter.hit_dice_size || 6}
                    </div>
                  </div>

                  <div style={{
                    border: '2px solid rgba(217,83,30,0.3)',
                    borderRadius: 4,
                    padding: '1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontWeight: 700,
                      color: 'rgba(226,209,166,0.5)',
                      marginBottom: '0.5rem',
                    }}>
                      Level
                    </div>
                    <div style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#fbbf24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}>
                      {editedCharacter.level}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <button
                          onClick={() => handleLevelChange(1)}
                          disabled={editedCharacter.level >= 20 || loading}
                          style={{
                            width: '20px',
                            height: '12px',
                            padding: 0,
                            background: editedCharacter.level < 20 ? 'rgba(217,83,30,0.4)' : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            borderRadius: 2,
                            color: '#fff',
                            cursor: editedCharacter.level < 20 ? 'pointer' : 'not-allowed',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleLevelChange(-1)}
                          disabled={editedCharacter.level <= 1 || loading}
                          style={{
                            width: '20px',
                            height: '12px',
                            padding: 0,
                            background: editedCharacter.level > 1 ? 'rgba(217,83,30,0.4)' : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            borderRadius: 2,
                            color: '#fff',
                            cursor: editedCharacter.level > 1 ? 'pointer' : 'not-allowed',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                          }}
                        >
                          −
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status si muerto */}
                {!editedCharacter.is_alive && (
                  <div style={{
                    background: 'rgba(239,68,68,0.15)',
                    border: '2px solid rgba(239,68,68,0.3)',
                    borderRadius: 4,
                    padding: '1rem',
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      color: '#fca5a5',
                    }}>
                      💀 DEATH SAVES
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: ABILITY SCORES */}
          {activeTab === 'abilities' && (
            <div>
              <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '1.5rem' }}>Saving Throws</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
              }}>
                {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(stat => {
                  const value = editedCharacter.stats?.[stat] || 10
                  const modifier = getModifier(value)
                  const labels = {
                    strength: 'Strength',
                    dexterity: 'Dexterity',
                    constitution: 'Constitution',
                    intelligence: 'Intelligence',
                    wisdom: 'Wisdom',
                    charisma: 'Charisma',
                  }

                  return (
                    <div key={stat} style={{
                      border: '2px solid rgba(217,83,30,0.3)',
                      borderRadius: 4,
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span style={{ color: 'rgba(226,209,166,0.7)' }}>{labels[stat]}</span>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: modifier >= 0 ? '#86efac' : '#fca5a5',
                      }}>
                        {getModifierString(modifier)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB: PERSONALITY TRAITS */}
          {activeTab === 'traits' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              <div>
                <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                  Personality Traits
                </h3>
                <textarea
                  value={editedCharacter.personality_traits || ''}
                  onChange={e => setEditedCharacter(prev => ({ ...prev, personality_traits: e.target.value }))}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    padding: '1rem',
                    color: 'rgba(226,209,166,0.8)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Describe los rasgos de personalidad..."
                />
              </div>

              <div>
                <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                  Ideals
                </h3>
                <textarea
                  value={editedCharacter.ideals || ''}
                  onChange={e => setEditedCharacter(prev => ({ ...prev, ideals: e.target.value }))}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    padding: '1rem',
                    color: 'rgba(226,209,166,0.8)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Los ideales del personaje..."
                />
              </div>

              <div>
                <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                  Bonds
                </h3>
                <textarea
                  value={editedCharacter.bonds || ''}
                  onChange={e => setEditedCharacter(prev => ({ ...prev, bonds: e.target.value }))}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    padding: '1rem',
                    color: 'rgba(226,209,166,0.8)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Los vínculos del personaje..."
                />
              </div>

              <div>
                <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                  Flaws
                </h3>
                <textarea
                  value={editedCharacter.flaws || ''}
                  onChange={e => setEditedCharacter(prev => ({ ...prev, flaws: e.target.value }))}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    padding: '1rem',
                    color: 'rgba(226,209,166,0.8)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Los defectos del personaje..."
                />
              </div>
            </div>
          )}

          {/* TAB: FEATS & SKILLS */}
          {activeTab === 'feats' && (
            <div>
              <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '1.5rem' }}>Feats & Traits</h3>
              <textarea
                value={editedCharacter.feats || ''}
                onChange={e => setEditedCharacter(prev => ({ ...prev, feats: e.target.value }))}
                style={{
                  width: '100%',
                  minHeight: '300px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '1.5rem',
                  color: 'rgba(226,209,166,0.8)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
                placeholder="Feats, rasgos especiales, características de clase, etc..."
              />
            </div>
          )}

          {/* TAB: SPELLCASTING */}
          {activeTab === 'spells' && (
            <div>
              <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '1.5rem' }}>Spell Slots</h3>
              <textarea
                value={editedCharacter.spell_slots || ''}
                onChange={e => setEditedCharacter(prev => ({ ...prev, spell_slots: e.target.value }))}
                style={{
                  width: '100%',
                  minHeight: '300px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '1.5rem',
                  color: 'rgba(226,209,166,0.8)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
                placeholder="Slots de hechizo, cantrips, hechizos preparados, etc..."
              />
            </div>
          )}

          {/* TAB: EQUIPMENT */}
          {activeTab === 'equipment' && (
            <div>
              <h3 style={{ marginTop: 0, color: 'rgba(226,209,166,0.8)', marginBottom: '1.5rem' }}>Equipment & Inventory</h3>
              <button
                onClick={() => setShowEquipment(true)}
                style={{
                  padding: '1rem 2rem',
                  background: 'rgba(59,130,246,0.7)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.5rem',
                }}
              >
                <Backpack size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Manage Equipment
              </button>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                padding: '1.5rem',
              }}>
                <h4 style={{ marginTop: 0, color: 'rgba(226,209,166,0.7)', marginBottom: '1rem' }}>Equipment List</h4>
                <textarea
                  value={editedCharacter.equipment || ''}
                  onChange={e => setEditedCharacter(prev => ({ ...prev, equipment: e.target.value }))}
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    padding: '1rem',
                    color: 'rgba(226,209,166,0.8)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Describe el equipo del personaje..."
                />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER CON BOTONES */}
        <div style={{
          borderTop: '2px solid rgba(217,83,30,0.2)',
          background: 'rgba(26,26,26,0.5)',
          padding: mode === 'split-view' ? '1rem 1.5rem' : '1.5rem 2rem',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: mode === 'split-view' ? 'flex-end' : 'flex-end',
        }}>
          {isGM && (
            <button
              onClick={editedCharacter.is_alive ? handleMarkDead : handleRevive}
              disabled={loading}
              style={{
                padding: mode === 'split-view' ? '0.5rem 1rem' : '0.75rem 1.5rem',
                background: editedCharacter.is_alive ? 'rgba(239,68,68,0.7)' : 'rgba(34,197,94,0.7)',
                border: 'none',
                color: '#fff',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: mode === 'split-view' ? '0.8rem' : '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              <Skull size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              {editedCharacter.is_alive ? 'Death' : 'Revive'}
            </button>
          )}

          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: mode === 'split-view' ? '0.5rem 1rem' : '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(226,209,166,0.8)',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: mode === 'split-view' ? '0.8rem' : '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Close
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: mode === 'split-view' ? '0.5rem 1rem' : '0.75rem 1.5rem',
              background: loading ? 'rgba(217,83,30,0.4)' : 'rgba(217,83,30,0.8)',
              border: '1px solid rgba(217,83,30,0.6)',
              color: '#fff',
              borderRadius: 4,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              fontSize: mode === 'split-view' ? '0.8rem' : '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Save size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        {/* Equipment Modal */}
        {showEquipment && (
          <EquipmentModal
            character={editedCharacter}
            onClose={() => setShowEquipment(false)}
            onUpdate={handleEquipmentUpdate}
          />
        )}
      </div>
    </div>
  )
}
