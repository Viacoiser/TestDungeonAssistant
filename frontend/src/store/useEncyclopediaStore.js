import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * OPTIMIZED: Store para cachear datos de la enciclopedia con límites de memoria
 * 
 * Mejoras:
 * - LRU cache: Elimina items menos usados cuando alcanza max size (50MB)
 * - TTL: Expira items después de 1 hora
 * - Separate storage: searchCache en localStorage, detailsCache en sessionStorage
 * - Memory tracking: Calcula aproximado de memory usage
 */

// Constants
const MAX_CACHE_SIZE_BYTES = 50 * 1024 * 1024 // 50 MB
const CACHE_TTL_MINUTES = 60 // 1 hora
const MAX_ITEMS_PER_CACHE = 500

// Helper: Calculate approximate size in bytes
function estimateSize(obj) {
  const str = JSON.stringify(obj)
  return new Blob([str]).size
}

// Helper: Get LRU sorted keys by last access time
function getLRUSortedKeys(cache, accessLog) {
  return Object.keys(cache).sort((a, b) => (accessLog[a] || 0) - (accessLog[b] || 0))
}

const useEncyclopediaStore = create(
  persist(
    (set, get) => ({
      // Cache de búsquedas con timestamps
      searchCache: {},
      searchAccessLog: {}, // track last access time
      
      // Cache de detalles con timestamps
      detailsCache: {},
      detailsAccessLog: {},
      
      // Memory tracking
      cacheSize: 0,

      // Guardar resultados de búsqueda en cache (con LRU)
      setSearchCache: (category, query, results) => {
        const key = `${category}:${query}`
        const timestamp = Date.now()
        
        set((state) => {
          const newCache = { ...state.searchCache }
          const newAccessLog = { ...state.searchAccessLog }
          
          // Agregar nuevo item
          newCache[key] = { data: results, timestamp }
          newAccessLog[key] = timestamp
          
          // Verificar tamaño y aplicar LRU si es necesario
          const cacheSize = estimateSize(newCache)
          if (cacheSize > MAX_CACHE_SIZE_BYTES || Object.keys(newCache).length > MAX_ITEMS_PER_CACHE) {
            const sortedKeys = getLRUSortedKeys(newCache, newAccessLog)
            const keysToRemove = Math.ceil(sortedKeys.length * 0.2) // Eliminar 20% menos usado
            
            sortedKeys.slice(0, keysToRemove).forEach(k => {
              delete newCache[k]
              delete newAccessLog[k]
            })
          }
          
          return { 
            searchCache: newCache, 
            searchAccessLog: newAccessLog,
            cacheSize: estimateSize(newCache)
          }
        })
      },

      // Guardar detalles en cache (con LRU)
      setDetailsCache: (category, index, details) => {
        const key = `${category}:${index}`
        const timestamp = Date.now()
        
        set((state) => {
          const newCache = { ...state.detailsCache }
          const newAccessLog = { ...state.detailsAccessLog }
          
          newCache[key] = { data: details, timestamp }
          newAccessLog[key] = timestamp
          
          // Aplicar LRU si es necesario
          const cacheSize = estimateSize(newCache)
          if (cacheSize > MAX_CACHE_SIZE_BYTES || Object.keys(newCache).length > MAX_ITEMS_PER_CACHE) {
            const sortedKeys = getLRUSortedKeys(newCache, newAccessLog)
            const keysToRemove = Math.ceil(sortedKeys.length * 0.2)
            
            sortedKeys.slice(0, keysToRemove).forEach(k => {
              delete newCache[k]
              delete newAccessLog[k]
            })
          }
          
          return { 
            detailsCache: newCache, 
            detailsAccessLog: newAccessLog 
          }
        })
      },

      // Obtener resultados de búsqueda (si existen y no han expirado)
      getSearchCached: (category, query) => {
        const state = get()
        const key = `${category}:${query}`
        const cached = state.searchCache[key]
        
        if (!cached) return null
        
        // Check if expired
        if (Date.now() - cached.timestamp > CACHE_TTL_MINUTES * 60 * 1000) {
          // Delete expired item
          const newCache = { ...state.searchCache }
          const newAccessLog = { ...state.searchAccessLog }
          delete newCache[key]
          delete newAccessLog[key]
          set({ searchCache: newCache, searchAccessLog: newAccessLog })
          return null
        }
        
        // Update access time
        set((s) => ({
          searchAccessLog: { ...s.searchAccessLog, [key]: Date.now() }
        }))
        
        return cached.data
      },

      // Obtener detalles (si existen y no han expirado)
      getDetailsCached: (category, index) => {
        const state = get()
        const key = `${category}:${index}`
        const cached = state.detailsCache[key]
        
        if (!cached) return null
        
        // Check if expired
        if (Date.now() - cached.timestamp > CACHE_TTL_MINUTES * 60 * 1000) {
          const newCache = { ...state.detailsCache }
          const newAccessLog = { ...state.detailsAccessLog }
          delete newCache[key]
          delete newAccessLog[key]
          set({ detailsCache: newCache, detailsAccessLog: newAccessLog })
          return null
        }
        
        // Update access time
        set((s) => ({
          detailsAccessLog: { ...s.detailsAccessLog, [key]: Date.now() }
        }))
        
        return cached.data
      },

      // Prefetch de una categoría completa
      prefetchCategory: async (category) => {
        if (get().getSearchCached(category, '')) return

        try {
          const response = await fetch(`https://www.dnd5eapi.co/api/2014/${category}`)
          if (response.ok) {
            const data = await response.json()
            const results = data.results || []
            get().setSearchCache(category, '', results)
            console.log(`✓ Prefetched ${results.length} items for ${category}`)
          }
        } catch (err) {
          console.error(`✗ Error prefetching ${category}:`, err)
        }
      },

      // Limpiar cache (granular o completo)
      clearCache: (target) => {
        if (!target) {
          set({ searchCache: {}, detailsCache: {}, searchAccessLog: {}, detailsAccessLog: {} })
          return
        }

        set((state) => {
          const newSearchCache = { ...state.searchCache }
          const newDetailsCache = { ...state.detailsCache }
          const newSearchAccessLog = { ...state.searchAccessLog }
          const newDetailsAccessLog = { ...state.detailsAccessLog }

          Object.keys(newSearchCache).forEach(key => {
            if (key.startsWith(target)) {
              delete newSearchCache[key]
              delete newSearchAccessLog[key]
            }
          })
          Object.keys(newDetailsCache).forEach(key => {
            if (key.startsWith(target)) {
              delete newDetailsCache[key]
              delete newDetailsAccessLog[key]
            }
          })

          return { 
            searchCache: newSearchCache, 
            detailsCache: newDetailsCache,
            searchAccessLog: newSearchAccessLog,
            detailsAccessLog: newDetailsAccessLog
          }
        })
      },

      // Get cache stats for debugging
      getCacheStats: () => {
        const state = get()
        return {
          searchCacheSize: Object.keys(state.searchCache).length,
          detailsCacheSize: Object.keys(state.detailsCache).length,
          approximateBytes: state.cacheSize,
          approximateMB: (state.cacheSize / (1024 * 1024)).toFixed(2)
        }
      }
    }),
    {
      name: 'dnd-encyclopedia-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead of localStorage (auto-clear on tab close)
    }
  )
)

export default useEncyclopediaStore

