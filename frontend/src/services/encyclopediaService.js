/**
 * Servicio de Enciclopedia D&D 5e
 * 
 * Arquitectura:
 * 1. Intenta descargar desde API (dnd5eapi.co)
 * 2. Guarda en localStorage para offline
 * 3. Si API falla, usa localStorage en caché
 * 4. Si falla todo, fallback a datos compilados locales
 * 
 * Beneficios:
 * - Datos siempre actualizados desde API
 * - Carga offline gracias a localStorage
 * - Sin esperas en recargas (usa caché local)
 * - Búsqueda instantánea con fuzzy
 */

import encyclopedia from '@/data/compiled/index.js'
import { fuzzysort } from './fuzzySort.js'

const API_BASE = 'https://www.dnd5eapi.co/api'
const CACHE_KEY = 'encyclopedia_cache'
const CACHE_VERSION = '1.0'
const CACHE_TIMEOUT = 7 * 24 * 60 * 60 * 1000 // 7 días

class EncyclopediaService {
  constructor() {
    this.data = encyclopedia
    this.memoryCache = {}
    this.initialized = false
    this.syncing = false
    this.lastSyncTime = null
    this.initPromise = this.init()
  }

  /**
   * Inicializar el servicio
   * Estrategia: API → localStorage → datos compilados
   */
  async init() {
    try {
      console.log('📚 Inicializando enciclopedia...')
      
      // Primero, intentar cargar desde localStorage (rápido)
      const fromCache = this.loadFromLocalStorage()
      if (fromCache) {
        console.log('✅ Enciclopedia cargada desde cache local')
        this.initialized = true
      }

      // Luego, intentar actualizar desde API en background
      // (sin esperar a que termine)
      this.syncWithAPI().catch(error => {
        console.warn('⚠️ No se pudo sincronizar con API:', error.message)
        // Si no tenemos caché y la API falló, usar fallback compilado
        if (!fromCache) {
          this.loadCompiledData()
        }
      })

      return true
    } catch (error) {
      console.error('❌ Error inicializando enciclopedia:', error)
      return false
    }
  }

  /**
   * Descargar datos desde API dnd5eapi.co
   */
  async fetchFromAPI() {
    console.log('🔄 Descargando datos de API...')
    const data = {
      races: [],
      classes: [],
      spells: [],
      monsters: [],
      equipment: [],
      traits: []
    }

    try {
      // Descargar razas
      const racesRes = await fetch(`${API_BASE}/races`)
      if (racesRes.ok) {
        const racesData = await racesRes.json()
        data.races = racesData.results || []
      }

      // Descargar clases
      const classesRes = await fetch(`${API_BASE}/classes`)
      if (classesRes.ok) {
        const classesData = await classesRes.json()
        data.classes = classesData.results || []
      }

      // Descargar hechizos
      const spellsRes = await fetch(`${API_BASE}/spells`)
      if (spellsRes.ok) {
        const spellsData = await spellsRes.json()
        data.spells = spellsData.results || []
      }

      // Descargar monstruos
      const monstersRes = await fetch(`${API_BASE}/monsters`)
      if (monstersRes.ok) {
        const monstersData = await monstersRes.json()
        data.monsters = monstersData.results || []
      }

      // Descargar equipo
      const equipmentRes = await fetch(`${API_BASE}/equipment`)
      if (equipmentRes.ok) {
        const equipmentData = await equipmentRes.json()
        data.equipment = equipmentData.results || []
      }

      console.log(
        `✅ API descargada: ${data.spells.length} hechizos, ` +
        `${data.monsters.length} monstruos, ${data.equipment.length} items, ` +
        `${data.races.length} razas, ${data.classes.length} clases`
      )

      return data
    } catch (error) {
      console.error('❌ Error descargando de API:', error)
      throw error
    }
  }

  /**
   * Sincronizar con API (actualizar datos)
   */
  async syncWithAPI() {
    if (this.syncing) {
      console.log('⏳ Sincronización ya en progreso...')
      return
    }

    this.syncing = true
    try {
      const newData = await this.fetchFromAPI()
      
      this.memoryCache = newData
      this.initialized = true
      this.lastSyncTime = Date.now()
      
      // Guardar en localStorage
      this.saveToLocalStorage()
      
      console.log('✅ Sincronización completada')
      return true
    } catch (error) {
      console.error('❌ Error en sincronización:', error)
      throw error
    } finally {
      this.syncing = false
    }
  }

  /**
   * Cargar datos compilados como fallback
   */
  loadCompiledData() {
    console.log('📦 Cargando datos compilados como fallback...')
    this.memoryCache = {
      races: this.data.races || [],
      classes: this.data.classes || [],
      spells: this.data.spells || [],
      traits: this.data.traits || [],
      monsters: this.data.monsters || [],
      equipment: this.data.equipment || [],
    }
    this.initialized = true
    console.log('✅ Datos compilados cargados')
  }

  /**
   * Obtener todos los items de una categoría
   * @param {string} category - Categoría (races, classes, spells, traits, monsters, equipment)
   * @returns {Array}
   */
  getCategory(category) {
    if (!this.initialized) {
      console.warn('⚠️ Enciclopedia no inicializada aún')
      return []
    }

    return this.memoryCache[category] || this.data.getCategory(category) || []
  }

  /**
   * Buscar items por nombre
   * @param {string} query - Término de búsqueda
   * @param {string} category - Categoría específica (opcional)
   * @returns {Array} Items que coinciden
   */
  search(query, category = null) {
    if (!query || query.trim().length === 0) {
      return category ? this.getCategory(category) : []
    }

    const queryLower = query.toLowerCase()

    if (category) {
      const items = this.getCategory(category)
      return items.filter(item =>
        item.name.toLowerCase().includes(queryLower) ||
        item.index?.toLowerCase().includes(queryLower)
      )
    }

    // Buscar en todas las categorías
    return this.data.search(query)
  }

  /**
   * Obtener item específico
   * @param {string} category - Categoría
   * @param {string} index - Índice del item
   * @returns {Object|null}
   */
  getItem(category, index) {
    const items = this.getCategory(category)
    return items.find(item => item.index === index) || null
  }

  /**
   * Búsqueda Fuzzy (tolerante a typos)
   * @param {string} query - Término de búsqueda
   * @param {string} category - Categoría específica
   * @returns {Array} Resultados ordenados por relevancia
   */
  fuzzySearch(query, category = null) {
    if (!query || query.trim().length < 1) {
      return []
    }

    const items = category ? this.getCategory(category) : this.getAllItems()

    // Buscar por nombre
    const results = items
      .map(item => ({
        ...item,
        score: this.calculateFuzzyScore(query.toLowerCase(), item.name.toLowerCase())
      }))
      .filter(item => item.score > 0.3) // Umbral mínimo
      .sort((a, b) => b.score - a.score)
      .slice(0, 20) // Máximo 20 resultados

    return results
  }

  /**
   * Calcular score fuzzy simple (editar distancia)
   */
  calculateFuzzyScore(query, target) {
    // Coincidencia exacta
    if (target === query) return 1.0

    // Coincidencia al inicio
    if (target.startsWith(query)) return 0.8

    // Contiene la palabra
    if (target.includes(query)) return 0.6

    // Similitud parcial
    let matches = 0
    for (let char of query) {
      if (target.includes(char)) matches++
    }
    return matches / query.length
  }

  /**
   * Obtener todos los items de todas las categorías
   */
  getAllItems() {
    return [
      ...this.getCategory('races'),
      ...this.getCategory('classes'),
      ...this.getCategory('spells'),
      ...this.getCategory('traits'),
      ...this.getCategory('monsters'),
      ...this.getCategory('equipment')
    ]
  }

  /**
   * Obtener estadísticas de la enciclopedia
   */
  getStats() {
    return {
      ...this.data.getCounts(),
      version: this.data.version,
      lastUpdated: this.data.lastUpdated,
      initialized: this.initialized
    }
  }

  /**
   * Filtrar por propiedades
   * @example filterBy('spells', 'level', 0) → Todos los cantrips
   */
  filterBy(category, property, value) {
    const items = this.getCategory(category)
    return items.filter(item => item[property] === value)
  }

  /**
   * Obtener items ordenados
   */
  sortBy(category, property = 'name', order = 'asc') {
    const items = [...this.getCategory(category)]
    items.sort((a, b) => {
      const aVal = a[property]
      const bVal = b[property]

      if (typeof aVal === 'string') {
        return order === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      return order === 'asc' ? aVal - bVal : bVal - aVal
    })

    return items
  }

  /**
   * Guardar en localStorage con timestamp de validación
   */
  saveToLocalStorage() {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: this.memoryCache,
          version: CACHE_VERSION,
          timestamp: Date.now()
        })
      )
      console.log('💾 Cache guardado en localStorage')
    } catch (error) {
      console.warn('⚠️ No se pudo guardar en localStorage:', error)
    }
  }

  /**
   * Cargar desde localStorage si existe y es válido
   */
  loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) {
        console.log('ℹ️ No hay cache en localStorage')
        return false
      }

      const { data, timestamp, version } = JSON.parse(cached)
      
      // Verificar antigüedad del cache (más de 7 días)
      const age = Date.now() - timestamp
      if (age > CACHE_TIMEOUT) {
        console.log('⏰ Cache expirado (más de 7 días)')
        localStorage.removeItem(CACHE_KEY)
        return false
      }

      this.memoryCache = data
      this.initialized = true
      this.lastSyncTime = timestamp
      console.log(
        `✅ Cache cargado (${Math.floor(age / 1000 / 60)} minutos de antigüedad)`
      )
      return true
    } catch (error) {
      console.error('❌ Error recuperando desde localStorage:', error)
      return false
    }
  }

  /**
   * Limpiar cache y forzar resincronización
   */
  clearCache() {
    this.memoryCache = {}
    localStorage.removeItem(CACHE_KEY)
    this.initialized = false
    this.lastSyncTime = null
    console.log('🗑️ Cache limpiado')
  }

  /**
   * Forzar actualización desde API (sin esperar)
   */
  forceSync() {
    console.log('🔄 Forzando sincronización...')
    return this.syncWithAPI()
  }

  /**
   * Obtener estado de sincronización
   */
  getSyncStatus() {
    return {
      syncing: this.syncing,
      lastSyncTime: this.lastSyncTime,
      initialized: this.initialized,
      isCached: this.lastSyncTime !== null,
      minutesAgo: this.lastSyncTime 
        ? Math.floor((Date.now() - this.lastSyncTime) / 1000 / 60)
        : null
    }
  }
}

// Instancia singleton
const encyclopediaService = new EncyclopediaService()

export default encyclopediaService
