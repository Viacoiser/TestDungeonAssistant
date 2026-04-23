import React, { useState, useRef } from 'react'
import { Upload, ZoomIn, ZoomOut, Move, RotateCcw, Trash2 } from 'lucide-react'

export default function ImageCustomizer({ currentImageUrl, onImageUpdate, onImageRemove }) {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || null)
  const [zoom, setZoom] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewUrl(event.target.result)
        setZoom(1)
        setOffsetX(0)
        setOffsetY(0)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    setOffsetX(prev => Math.max(-100, Math.min(100, prev + deltaX * 0.5)))
    setOffsetY(prev => Math.max(-100, Math.min(100, prev + deltaY * 0.5)))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.1))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.1))
  }

  const handleReset = () => {
    setZoom(1)
    setOffsetX(0)
    setOffsetY(0)
  }

  const handleSave = async () => {
    if (!previewUrl) return

    // Dibujar en canvas para capturar la imagen ajustada
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Limpiar canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar imagen ajustada
      const scaledWidth = img.width * zoom
      const scaledHeight = img.height * zoom

      const x = (canvas.width - scaledWidth) / 2 + offsetX * 2
      const y = (canvas.height - scaledHeight) / 2 + offsetY * 2

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

      // Obtener URL de la imagen ajustada
      const adjustedImageUrl = canvas.toDataURL('image/png')
      onImageUpdate(adjustedImageUrl)
    }

    img.src = previewUrl
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    setZoom(1)
    setOffsetX(0)
    setOffsetY(0)
    onImageRemove?.()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {/* Título */}
      <div>
        <h3 style={{
          color: 'rgba(226,209,166,0.8)',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: '0 0 1rem 0',
          fontWeight: 700,
        }}>
          🖼️ Personalización de Imagen
        </h3>
      </div>

      {/* Preview Area */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '2px dashed rgba(217,83,30,0.4)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : previewUrl ? 'grab' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      >
        {previewUrl ? (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`,
                transform: `scale(${zoom})`,
                transformOrigin: 'center',
                transition: isDragging ? 'none' : 'transform 0.2s ease',
              }}
            />
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            color: 'rgba(226,209,166,0.5)',
          }}>
            <Upload size={32} style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Sube una imagen</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(226,209,166,0.3)' }}>o haz clic para seleccionar</p>
          </div>
        )}
      </div>

      {/* Hidden Canvas para procesamiento */}
      <canvas ref={canvasRef} width={120} height={120} style={{ display: 'none' }} />

      {/* Upload Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: 'rgba(217,83,30,0.3)',
          border: '1px solid rgba(217,83,30,0.4)',
          borderRadius: 8,
          color: '#fbbf24',
          cursor: 'pointer',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s',
          fontSize: '0.9rem',
        }}
        onMouseEnter={e => {
          e.target.style.background = 'rgba(217,83,30,0.4)'
        }}
        onMouseLeave={e => {
          e.target.style.background = 'rgba(217,83,30,0.3)'
        }}
      >
        <Upload size={18} />
        {previewUrl ? 'Cambiar Imagen' : 'Subir Imagen'}
      </button>

      {/* Controls */}
      {previewUrl && (
        <div>
          <h4 style={{
            color: 'rgba(226,209,166,0.6)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 0.75rem 0',
            fontWeight: 700,
          }}>
            Ajustes
          </h4>

          {/* Zoom Control */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.5rem',
            }}>
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                style={{
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  background: zoom > 0.5 ? 'rgba(217,83,30,0.3)' : 'rgba(255,255,255,0.05)',
                  border: zoom > 0.5 ? '1px solid rgba(217,83,30,0.4)' : 'none',
                  borderRadius: 6,
                  color: zoom > 0.5 ? '#fbbf24' : 'rgba(226,209,166,0.3)',
                  cursor: zoom > 0.5 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <ZoomOut size={16} />
              </button>

              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={e => setZoom(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: 3,
                  background: 'rgba(217,83,30,0.2)',
                  outline: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                }}
              />

              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                style={{
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  background: zoom < 3 ? 'rgba(217,83,30,0.3)' : 'rgba(255,255,255,0.05)',
                  border: zoom < 3 ? '1px solid rgba(217,83,30,0.4)' : 'none',
                  borderRadius: 6,
                  color: zoom < 3 ? '#fbbf24' : 'rgba(226,209,166,0.3)',
                  cursor: zoom < 3 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <div style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'rgba(226,209,166,0.5)',
            }}>
              Zoom: {(zoom * 100).toFixed(0)}%
            </div>
          </div>

          {/* Position Info */}
          <div style={{
            background: 'rgba(217,83,30,0.1)',
            border: '1px solid rgba(217,83,30,0.2)',
            borderRadius: 8,
            padding: '0.75rem',
            marginBottom: '1rem',
            fontSize: '0.75rem',
            color: 'rgba(226,209,166,0.6)',
          }}>
            <p style={{ margin: '0 0 0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Move size={14} />
              Arrastra para ajustar la posición
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.5rem',
          }}>
            <button
              onClick={handleReset}
              style={{
                padding: '0.6rem',
                background: 'rgba(34,197,94,0.2)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 6,
                color: '#86efac',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.75rem',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(34,197,94,0.3)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(34,197,94,0.2)'
              }}
            >
              <RotateCcw size={14} />
              Reiniciar
            </button>

            <button
              onClick={handleSave}
              style={{
                padding: '0.6rem',
                background: 'rgba(59,130,246,0.3)',
                border: '1px solid rgba(59,130,246,0.4)',
                borderRadius: 6,
                color: '#3b82f6',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.75rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(59,130,246,0.4)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(59,130,246,0.3)'
              }}
            >
              Guardar
            </button>

            <button
              onClick={handleRemove}
              style={{
                padding: '0.6rem',
                background: 'rgba(239,68,68,0.2)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 6,
                color: '#fca5a5',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.75rem',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(239,68,68,0.3)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(239,68,68,0.2)'
              }}
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          </div>
        </div>
      )}

      {/* Info Text */}
      <p style={{
        fontSize: '0.75rem',
        color: 'rgba(226,209,166,0.4)',
        margin: 0,
        textAlign: 'center',
      }}>
        Formatos soportados: JPG, PNG, WebP • Tamaño máximo: 5MB
      </p>
    </div>
  )
}
