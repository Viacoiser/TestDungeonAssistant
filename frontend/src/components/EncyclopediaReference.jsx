/**
 * Componente: EncyclopediaReference
 * 
 * Ejemplo de cómo usar la enciclopedia estática
 * Sin sincronización, datos offline-first
 */

import React, { useState } from 'react'
import { useEncyclopedia, useEncyclopediaSearch } from '@/hooks/useEncyclopedia'
import { LoadingSpinner } from './LoadingSpinner'

export function EncyclopediaReference() {
  const [activeTab, setActiveTab] = useState('races')
  const [searchQuery, setSearchQuery] = useState('')

  // Obtener datos de la categoría activa
  const { data: categoryData, isLoading } = useEncyclopedia(activeTab)

  // Búsqueda reactiva
  const { results: searchResults } = useEncyclopediaSearch(searchQuery, activeTab)

  // Datos a mostrar (búsqueda o categoría completa)
  const displayData = searchQuery ? searchResults : categoryData

  const categories = [
    { id: 'races', label: 'Razas', icon: '👤' },
    { id: 'classes', label: 'Clases', icon: '⚔️' },
    { id: 'spells', label: 'Hechizos', icon: '✨' },
    { id: 'traits', label: 'Rasgos', icon: '🎯' },
    { id: 'monsters', label: 'Monstruos', icon: '👹' },
    { id: 'equipment', label: 'Equipamiento', icon: '🛡️' },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-900">📚 Enciclopedia D&D 5e</h2>
        <p className="text-sm text-gray-600">Datos offline • Sin sincronización • Acceso instant</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveTab(cat.id)
              setSearchQuery('')
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === cat.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={`Buscar en ${categories.find(c => c.id === activeTab)?.label}...`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {searchQuery && (
          <p className="text-xs text-gray-600 mt-1">
            {displayData.length} resultado{displayData.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-3">
          {displayData.length > 0 ? (
            displayData.map(item => (
              <div
                key={item.index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="font-bold text-primary-900">{item.name}</h3>
                {item.level !== undefined && (
                  <p className="text-xs text-gray-600">
                    Nivel: {item.level} • Escuela: {item.school}
                  </p>
                )}
                {item.type && (
                  <p className="text-xs text-gray-600">
                    Tipo: {item.type} • CR: {item.challenge_rating}
                  </p>
                )}
                {item.damage && (
                  <p className="text-xs text-gray-600">
                    Daño: {item.damage}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              {searchQuery ? 'No se encontraron resultados' : 'No hay datos'}
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-xs text-blue-900">
        ✅ <strong>Offline-first:</strong> Todos los datos se cargan localmente.
        No se requiere sincronización. Acceso instant desde cualquier lugar.
      </div>
    </div>
  )
}

export default EncyclopediaReference
