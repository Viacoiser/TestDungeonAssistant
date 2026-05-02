/**
 * EncyclopediaSyncStatus
 * 
 * Panel completo de información de sincronización
 * - Estado actual de datos
 * - Última actualización
 * - Cantidad de items en cada categoría
 * - Botón para forzar sincronización
 * - Botón para limpiar caché
 * 
 * @example
 * <EncyclopediaSyncStatus isOpen={showSync} onClose={() => setShowSync(false)} />
 */

import React from 'react'
import { X, RefreshCw, Trash2, Cloud, HardDrive, Zap } from 'lucide-react'
import { useSyncStatus } from '@/hooks/useSyncStatus'
import encyclopediaService from '@/services/encyclopediaService'

export default function EncyclopediaSyncStatus({ isOpen, onClose }) {
  const { syncing, isCached, minutesAgo, forceSync } = useSyncStatus()

  if (!isOpen) return null

  const handleForceSync = async () => {
    await forceSync()
  }

  const handleClearCache = () => {
    if (
      window.confirm(
        '¿Estás seguro? Esto limpiará el caché y descargará los datos nuevamente.'
      )
    ) {
      encyclopediaService.clearCache()
      // Forzar recarga
      window.location.reload()
    }
  }

  const spells = encyclopediaService.getCategory('spells')
  const monsters = encyclopediaService.getCategory('monsters')
  const equipment = encyclopediaService.getCategory('equipment')
  const races = encyclopediaService.getCategory('races')
  const classes = encyclopediaService.getCategory('classes')
  const traits = encyclopediaService.getCategory('traits')

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md 
                     shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Estado de Sincronización
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status */}
        <div className="space-y-4 mb-6">
          {/* Current Status */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <div className="font-medium mb-2 text-slate-300">Estado Actual</div>
            {syncing ? (
              <div className="flex items-center gap-2 text-yellow-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sincronizando con API...
              </div>
            ) : isCached ? (
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">
                  Usando caché local ({minutesAgo}m ago)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-4 h-4" />
                Cargando datos iniciales...
              </div>
            )}
          </div>

          {/* Data Statistics */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <div className="font-medium mb-3 text-slate-300">Datos Cargados</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Hechizos</span>
                <span className="text-emerald-400 font-medium">{spells.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monstruos</span>
                <span className="text-emerald-400 font-medium">{monsters.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Equipo</span>
                <span className="text-emerald-400 font-medium">{equipment.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Razas</span>
                <span className="text-emerald-400 font-medium">{races.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clases</span>
                <span className="text-emerald-400 font-medium">{classes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rasgos</span>
                <span className="text-emerald-400 font-medium">{traits.length}</span>
              </div>
              <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-amber-400">
                  {spells.length +
                    monsters.length +
                    equipment.length +
                    races.length +
                    classes.length +
                    traits.length}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-sm text-blue-300">
            <p>
              ℹ️ Los datos se descargan de{' '}
              <a
                href="https://www.dnd5eapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200"
              >
                dnd5eapi.co
              </a>{' '}
              y se guardan localmente en tu navegador.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleForceSync}
            disabled={syncing}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                       text-white font-medium py-2 rounded-lg transition-colors 
                       disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {syncing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sincronizando...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Forzar Sincronización
              </>
            )}
          </button>

          <button
            onClick={handleClearCache}
            disabled={syncing}
            className="px-4 bg-red-600/20 hover:bg-red-600/30 disabled:opacity-50 
                       text-red-400 font-medium py-2 rounded-lg transition-colors 
                       disabled:cursor-not-allowed flex items-center gap-2"
            title="Limpiar caché y recargar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full mt-4 text-slate-400 hover:text-slate-300 text-sm py-2 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
