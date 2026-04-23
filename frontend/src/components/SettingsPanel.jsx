import React, { useState, useEffect } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { characterAPI } from '../services/api'

// Lista de imágenes disponibles
const AVAILABLE_IMAGES = [
  // JPG images (100-138)
  ...Array.from({ length: 39 }, (_, i) => ({
    id: i + 100,
    name: `image${i + 100}`,
    path: `/images/image${i + 100}.jpg`
  })),
  // PNG images (139-145)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 139,
    name: `image${i + 139}`,
    path: `/images/image${i + 139}.png`
  }))
]

export default function SettingsPanel({ characters = [], onCharacterUpdated }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Auto-select first character if available
  useEffect(() => {
    if (characters.length > 0 && !selectedCharacter) {
      setSelectedCharacter(characters[0])
    }
  }, [characters])

  const handleSelectImage = async (imagePath) => {
    if (!selectedCharacter) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Only send the fields that CharacterUpdate accepts
      const updateData = {
        image_url: imagePath,
      }

      await characterAPI.update(selectedCharacter.id, updateData)

      // Update local state
      setSelectedCharacter({ ...selectedCharacter, image_url: imagePath })
      setSuccess('Imagen actualizada correctamente ✨')

      // Reload characters from parent
      if (onCharacterUpdated) {
        onCharacterUpdated()
      }

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error updating character image:', err)
      setError(err.response?.data?.detail || 'Error al actualizar la imagen')
      setTimeout(() => setError(''), 4000)
    } finally {
      setLoading(false)
    }
  }

  if (characters.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>⚙️</div>
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1.6rem',
          color: '#fff',
          marginBottom: '0.75rem',
        }}>
          Ajustes
        </h2>
        <p style={{
          color: 'rgba(226,209,166,0.4)',
          fontSize: '0.95rem',
          maxWidth: 360,
        }}>
          Crea un personaje primero para personalizar su imagen
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h2 style={{
          fontFamily: 'Almendra, serif',
          fontStyle: 'normal',
          fontSize: '3.5rem',
          fontWeight: 700,
          color: 'var(--fantasy-gold)',
          margin: 0,
          marginBottom: '0.4rem',
          textShadow: '0 0 40px rgba(217,83,30,0.25)',
        }}>
          Ajustes
        </h2>
        <p style={{
          color: 'rgba(226,209,166,0.55)',
          fontSize: '1rem',
          margin: 0,
        }}>
          Personaliza la imagen de tu personaje
        </p>
      </div>

      {/* Character Selector */}
      <div>
        <label style={{
          display: 'block',
          color: 'rgba(226,209,166,0.8)',
          fontWeight: 600,
          fontSize: '0.875rem',
          marginBottom: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Selecciona un Personaje
        </label>
        <select
          value={selectedCharacter?.id || ''}
          onChange={(e) => {
            const char = characters.find(c => c.id === e.target.value)
            setSelectedCharacter(char)
          }}
          style={{
            width: '100%',
            maxWidth: 400,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '0.7rem 1rem',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(217,83,30,0.6)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          {characters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name} - Nivel {char.level} {char.class} ({char.race})
            </option>
          ))}
        </select>
      </div>

      {/* Current Selection Info */}
      {selectedCharacter && (
        <div style={{
          background: 'rgba(217,83,30,0.08)',
          border: '1px solid rgba(217,83,30,0.3)',
          borderRadius: 12,
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            background: 'rgba(217,83,30,0.15)',
            border: '1px solid rgba(217,83,30,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            {selectedCharacter.image_url ? (
              <img
                src={selectedCharacter.image_url}
                alt={selectedCharacter.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <span style={{
                fontFamily: 'Almendra, serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fbbf24',
                textShadow: '0 0 10px rgba(217,83,30,0.5)',
              }}>
                {selectedCharacter.name[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 style={{
              fontFamily: 'Almendra, serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              marginBottom: '0.25rem',
            }}>
              {selectedCharacter.name}
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(226,209,166,0.6)',
              margin: 0,
            }}>
              Nivel {selectedCharacter.level} • {selectedCharacter.race} {selectedCharacter.class}
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {success && (
        <div style={{
          background: 'rgba(34,197,94,0.12)',
          border: '1px solid rgba(34,197,94,0.35)',
          borderRadius: 10,
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#86efac',
          fontSize: '0.875rem',
        }}>
          <Check size={16} />
          {success}
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(220,38,38,0.12)',
          border: '1px solid rgba(220,38,38,0.35)',
          borderRadius: 10,
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#fca5a5',
          fontSize: '0.875rem',
        }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Image Gallery */}
      <div>
        <h3 style={{
          color: 'rgba(226,209,166,0.8)',
          fontWeight: 600,
          fontSize: '0.875rem',
          marginBottom: '1rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: '0 0 1rem 0',
        }}>
          Galería de Imágenes ({AVAILABLE_IMAGES.length})
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
        }}>
          {AVAILABLE_IMAGES.map((img) => (
            <button
              key={img.id}
              onClick={() => handleSelectImage(img.path)}
              disabled={loading}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                borderRadius: 12,
                border:
                  selectedCharacter?.image_url === img.path
                    ? '2px solid var(--fantasy-accent)'
                    : '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.3)',
                overflow: 'hidden',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: loading ? 0.5 : 1,
                transform:
                  selectedCharacter?.image_url === img.path
                    ? 'scale(1.05)'
                    : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = 'rgba(217,83,30,0.5)'
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(217,83,30,0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor =
                    selectedCharacter?.image_url === img.path
                      ? '2px solid var(--fantasy-accent)'
                      : '1px solid rgba(255,255,255,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              <img
                src={img.path}
                alt={img.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  // Fallback if image not found
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              <div
                style={{
                  display: 'none',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(217,83,30,0.15)',
                  fontSize: '0.75rem',
                  color: 'rgba(226,209,166,0.5)',
                  textAlign: 'center',
                  padding: '0.5rem',
                }}
              >
                {img.name}
              </div>

              {/* Selection checkmark */}
              {selectedCharacter?.image_url === img.path && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(217,83,30,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--fantasy-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={18} color="#000" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: 12,
        padding: '1rem',
        fontSize: '0.875rem',
        color: '#93c5fd',
      }}>
        💡 Selecciona una imagen de la galería para personalizar el avatar de tu personaje. Los cambios se guardan automáticamente.
      </div>
    </div>
  )
}
