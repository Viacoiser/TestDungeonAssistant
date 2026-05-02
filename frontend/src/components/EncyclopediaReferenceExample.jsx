/**
 * EJEMPLO DE INTEGRACIÓN: EncyclopediaReference Mejorado
 * 
 * Este archivo muestra cómo integrar los componentes de sincronización
 * en tu aplicación existente. Es un ejemplo, adapta según tus necesidades.
 */

import React, { useState } from 'react'
import { useEncyclopedia } from '@/hooks/useEncyclopedia'
import EncyclopediaSyncBadge from '@/components/EncyclopediaSyncBadge'
import EncyclopediaSyncStatus from '@/components/EncyclopediaSyncStatus'
import { LoadingSpinner } from './LoadingSpinner'

export function EncyclopediaReferenceWithSync() {
  const [activeTab, setActiveTab] = useState('spells')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSyncModal, setShowSyncModal] = useState(false)

  // Obtener datos de la categoría activa
  const { data: categoryData = [], isLoading } = useEncyclopedia(activeTab)

  // Búsqueda simple
  const displayData = searchQuery
    ? categoryData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryData

  const categories = [
    { id: 'races', label: 'Razas', icon: '👤' },
    { id: 'classes', label: 'Clases', icon: '⚔️' },
    { id: 'spells', label: 'Hechizos', icon: '✨' },
    { id: 'traits', label: 'Rasgos', icon: '🎯' },
    { id: 'monsters', label: 'Monstruos', icon: '👹' },
    { id: 'equipment', label: 'Equipamiento', icon: '🛡️' },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-slate-950">
      {/* ─── HEADER CON SYNC BADGE ─── */}
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-400">📚 Enciclopedia D&D 5e</h2>
          <p className="text-xs text-slate-400">
            Datos desde dnd5eapi.co • Caché automático • Actualización en background
          </p>
        </div>

        {/* Badge de sincronización */}
        <div className="flex items-center gap-3">
          <EncyclopediaSyncBadge />
          <button
            onClick={() => setShowSyncModal(true)}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 
                       text-slate-300 text-sm transition-colors border border-slate-600"
          >
            ℹ️ Detalles
          </button>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div className="px-4 pt-4 flex gap-2 overflow-x-auto pb-3">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveTab(cat.id)
              setSearchQuery('')
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === cat.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* ─── SEARCH ─── */}
      <div className="px-4 py-3 border-b border-slate-700">
        <input
          type="text"
          placeholder={`Buscar ${categories.find(c => c.id === activeTab)?.label?.toLowerCase()}...`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg 
                     text-white placeholder-slate-500 focus:outline-none 
                     focus:ring-2 focus:ring-amber-500 transition-colors"
        />
        {searchQuery && (
          <p className="text-xs text-slate-400 mt-2">
            {displayData.length} resultado{displayData.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* ─── CONTENIDO ─── */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner text="Cargando datos..." />
          </div>
        ) : displayData.length > 0 ? (
          <div className="grid gap-3">
            {displayData.map(item => (
              <div
                key={item.index}
                className="p-4 bg-slate-800 border border-slate-700 rounded-lg 
                           hover:border-amber-500/50 hover:bg-slate-800/80 
                           transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-amber-400 group-hover:text-amber-300">
                      {item.name}
                    </h3>

                    {/* Spell Info */}
                    {item.level !== undefined && (
                      <p className="text-xs text-slate-400 mt-1">
                        Nivel {item.level} • {item.school}
                      </p>
                    )}

                    {/* Monster Info */}
                    {item.type && (
                      <p className="text-xs text-slate-400 mt-1">
                        {item.size} {item.type} • CR {item.challenge_rating}
                      </p>
                    )}

                    {/* Equipment Info */}
                    {item.equipment_category && (
                      <p className="text-xs text-slate-400 mt-1">
                        {item.equipment_category.name}
                      </p>
                    )}

                    {/* Race/Class Info */}
                    {!item.level && !item.type && !item.equipment_category && item.ability_bonuses && (
                      <p className="text-xs text-slate-400 mt-1">
                        Bonificaciones de habilidad disponibles
                      </p>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="flex-shrink-0 px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                    {item.index}
                  </div>
                </div>

                {/* Description Preview */}
                {item.desc && (
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {typeof item.desc === 'string'
                      ? item.desc
                      : item.desc[0]}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-slate-400">
            <p className="text-lg mb-2">😕 Sin resultados</p>
            <p className="text-xs">Prueba con otro término de búsqueda</p>
          </div>
        )}
      </div>

      {/* ─── MODAL DE SINCRONIZACIÓN ─── */}
      <EncyclopediaSyncStatus 
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
      />
    </div>
  )
}
