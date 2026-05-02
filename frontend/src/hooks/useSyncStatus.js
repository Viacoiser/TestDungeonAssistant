/**
 * Hook: useSyncStatus
 * 
 * Monitorea el estado de sincronización de la enciclopedia
 * Permite forzar actualización desde API
 * 
 * @example
 * const { syncing, lastSync, minutesAgo, forceSync } = useSyncStatus()
 */

import { useEffect, useState, useCallback } from 'react'
import encyclopediaService from '@/services/encyclopediaService'

export function useSyncStatus() {
  const [syncStatus, setSyncStatus] = useState({
    syncing: false,
    lastSyncTime: null,
    isCached: false,
    minutesAgo: null
  })

  // Monitorear estado de sincronización
  useEffect(() => {
    const interval = setInterval(() => {
      const status = encyclopediaService.getSyncStatus()
      setSyncStatus(status)
    }, 1000) // Actualizar cada segundo

    return () => clearInterval(interval)
  }, [])

  // Forzar sincronización
  const forceSync = useCallback(async () => {
    setSyncStatus(prev => ({ ...prev, syncing: true }))
    try {
      await encyclopediaService.forceSync()
      const status = encyclopediaService.getSyncStatus()
      setSyncStatus(status)
      return true
    } catch (error) {
      console.error('Error forzando sincronización:', error)
      const status = encyclopediaService.getSyncStatus()
      setSyncStatus(status)
      return false
    }
  }, [])

  return {
    ...syncStatus,
    forceSync,
    // Aliases útiles
    syncing: syncStatus.syncing,
    lastSync: syncStatus.lastSyncTime,
    minutesAgo: syncStatus.minutesAgo,
    isCached: syncStatus.isCached
  }
}
