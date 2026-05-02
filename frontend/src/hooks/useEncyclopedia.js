/**
 * Hook: useEncyclopedia
 * 
 * Interfaz React para acceder a la enciclopedia D&D 5e
 * - Sin peticiones HTTP
 * - Datos cargados al iniciar app
 * - Búsqueda instantánea
 * 
 * @example
 * const races = useEncyclopedia('races')
 * const spells = useEncyclopedia('spells')
 * const results = useEncyclopedia().search('fire', 'spells')
 */

import { useEffect, useState } from 'react'
import encyclopediaService from '@/services/encyclopediaService'

export function useEncyclopedia(category = null) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Esperar a que se inicialice el servicio
    encyclopediaService.initPromise
      .then(() => {
        if (category) {
          // Obtener categoría específica
          const categoryData = encyclopediaService.getCategory(category)
          setData(categoryData)
        } else {
          // Obtener todos los items
          const allItems = encyclopediaService.getAllItems()
          setData(allItems)
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error cargando enciclopedia:', err)
        setError(err.message)
        setIsLoading(false)
      })
  }, [category])

  return { data, isLoading, error }
}

/**
 * Hook: useEncyclopediaSearch
 * 
 * Para búsqueda reactiva
 * 
 * @example
 * const { results, isSearching } = useEncyclopediaSearch('fire', 'spells')
 */
export function useEncyclopediaSearch(query, category = null) {
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResults([])
      return
    }

    setIsSearching(true)

    encyclopediaService.initPromise
      .then(() => {
        const searchResults = encyclopediaService.search(query, category)
        setResults(searchResults)
        setIsSearching(false)
      })
      .catch(err => {
        console.error('Error en búsqueda:', err)
        setIsSearching(false)
      })
  }, [query, category])

  return { results, isSearching }
}

/**
 * Hook: useEncyclopediaItem
 * 
 * Para obtener un item específico
 * 
 * @example
 * const spell = useEncyclopediaItem('spells', 'fire-bolt')
 */
export function useEncyclopediaItem(category, index) {
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    encyclopediaService.initPromise
      .then(() => {
        const foundItem = encyclopediaService.getItem(category, index)
        setItem(foundItem)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error cargando item:', err)
        setIsLoading(false)
      })
  }, [category, index])

  return { item, isLoading }
}

/**
 * Hook: useEncyclopediaStats
 * 
 * Para obtener estadísticas
 * 
 * @example
 * const stats = useEncyclopediaStats()
 * console.log(stats.counts.races) // 9
 */
export function useEncyclopediaStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    encyclopediaService.initPromise
      .then(() => {
        const statsData = encyclopediaService.getStats()
        setStats(statsData)
      })
      .catch(err => {
        console.error('Error cargando stats:', err)
      })
  }, [])

  return stats
}

export default useEncyclopedia
