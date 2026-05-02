/**
 * EncyclopediaSyncBadge
 * 
 * Componente pequeño que muestra estado de sincronización
 * - Indicador visual de si está usando caché
 * - Botón para forzar sincronización
 * - Muestra último tiempo de actualización
 * 
 * @example
 * <EncyclopediaSyncBadge />
 */

import React from 'react'
import { RefreshCw, Check, AlertCircle, Loader } from 'lucide-react'
import { useSyncStatus } from '@/hooks/useSyncStatus'

export default function EncyclopediaSyncBadge() {
  const { syncing, isCached, minutesAgo, forceSync } = useSyncStatus()

  const handleRefresh = async () => {
    await forceSync()
  }

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm 
                   bg-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 
                   transition-colors"
    >
      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        {syncing ? (
          <>
            <Loader className="w-4 h-4 text-yellow-500 animate-spin" />
            <span className="text-yellow-500/80">Sincronizando...</span>
          </>
        ) : isCached ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-green-500/80">
              Cache local ({minutesAgo}m)
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500/80">Sin datos aún</span>
          </>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        disabled={syncing}
        className="ml-2 p-1 rounded hover:bg-slate-700/50 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors"
        title="Forzar sincronización desde API"
      >
        <RefreshCw
          className={`w-4 h-4 transition-colors ${
            syncing
              ? 'text-yellow-500 animate-spin'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        />
      </button>
    </div>
  )
}
