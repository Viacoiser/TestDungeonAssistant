/**
 * Utilidad de Búsqueda Fuzzy (tolerante a typos)
 * Implementación ligera de similitud de strings
 */

/**
 * Calcular distancia de Levenshtein entre dos strings
 * (cantidad mínima de ediciones para transformar un string en otro)
 */
export function levenshteinDistance(str1, str2) {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Calcular similaridad entre dos strings (0-1)
 */
export function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

/**
 * Búsqueda fuzzy en un array de objetos
 * @param {string} query - Término de búsqueda
 * @param {Array} items - Items a buscar
 * @param {string} searchField - Campo a buscar (ej: 'name')
 * @param {number} threshold - Umbral mínimo de similaridad (0-1)
 * @returns {Array} Items ordenados por relevancia
 */
export function fuzzysort(query, items = [], searchField = 'name', threshold = 0.4) {
  if (!query || !items.length) return []

  const queryLower = query.toLowerCase()

  const scored = items.map(item => {
    const fieldValue = item[searchField]?.toLowerCase() || ''

    // Puntuaciones:
    let score = 0

    // Coincidencia exacta
    if (fieldValue === queryLower) {
      score = 1.0
    }
    // Comienza con query
    else if (fieldValue.startsWith(queryLower)) {
      score = 0.9
    }
    // Contiene palabra completa
    else if (fieldValue.includes(` ${queryLower}`) || fieldValue.includes(`-${queryLower}`)) {
      score = 0.8
    }
    // Contiene query
    else if (fieldValue.includes(queryLower)) {
      score = 0.7
    }
    // Similitud fuzzy
    else {
      score = calculateSimilarity(queryLower, fieldValue)
    }

    return { ...item, fuzzyscore: score }
  })

  // Filtrar por umbral
  return scored
    .filter(item => item.fuzzyscore >= threshold)
    .sort((a, b) => b.fuzzyscore - a.fuzzyscore)
}

/**
 * Resaltar coincidencias en un string
 */
export function highlightMatch(text, query) {
  if (!query) return text

  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export default {
  levenshteinDistance,
  calculateSimilarity,
  fuzzysort,
  highlightMatch
}
