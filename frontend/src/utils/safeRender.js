/**
 * Utilidad para Renderizado Seguro de Datos de API
 * 
 * Maneja diferentes formatos de datos que puede retornar la API:
 * - Strings directos
 * - Objetos con estructura {type, value}
 * - Arrays de strings o objetos
 * - Valores null/undefined
 */

/**
 * Convertir cualquier valor a string seguro para React
 * @param {any} value - Valor a convertir
 * @returns {string} String seguro para renderizar en JSX
 */
export function toRenderableString(value) {
  if (value === null || value === undefined) {
    return ''
  }

  // Si es string, retorna directamente
  if (typeof value === 'string') {
    return value
  }

  // Si es un objeto con propiedad 'value'
  if (typeof value === 'object' && value.value !== undefined) {
    return String(value.value)
  }

  // Si es número o booleano, convertir a string
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  // Para otros objetos, usar JSON.stringify como último recurso
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch (e) {
      return '[Unable to render object]'
    }
  }

  return String(value)
}

/**
 * Renderizar array de texto (strings o objetos {type, value})
 * @param {Array} items - Array de items
 * @param {Function} renderFn - Función para renderizar cada item (opcional)
 * @returns {Array} Array de strings seguros
 */
export function renderableArray(items) {
  if (!Array.isArray(items)) {
    return [toRenderableString(items)]
  }

  return items.map(item => toRenderableString(item))
}

/**
 * Hook React para obtener strings seguros (en componentes)
 */
export function useSafeText(value) {
  return toRenderableString(value)
}

/**
 * Componente de texto seguro
 */
export function SafeText({ value, ...props }) {
  const text = toRenderableString(value)
  return <>{text}</>
}

/**
 * Componente para renderizar párrafos seguros
 */
export function SafeParagraphs({ items, className = '', style = {} }) {
  if (!Array.isArray(items)) {
    return <p style={style} className={className}>{toRenderableString(items)}</p>
  }

  return items.map((item, idx) => (
    <p key={idx} style={style} className={className}>
      {toRenderableString(item)}
    </p>
  ))
}

/**
 * Renderizar lista de acciones (estructura {name, desc})
 */
export function SafeActionList({ actions, nameStyle = {}, descStyle = {} }) {
  if (!Array.isArray(actions)) {
    return null
  }

  return actions.map((action, idx) => (
    <div key={idx} style={{ marginBottom: '0.75rem' }}>
      <strong style={nameStyle}>{toRenderableString(action.name)}:</strong>{' '}
      <span style={descStyle}>{toRenderableString(action.desc)}</span>
    </div>
  ))
}

/**
 * Renderizar meta información de objeto (key: value)
 */
export function SafeMeta({ data = {}, fields = [], style = {} }) {
  return fields.map((field) => (
    <div key={field} style={{ marginBottom: '0.5rem', ...style }}>
      <strong>{field}:</strong> {toRenderableString(data[field])}
    </div>
  ))
}

export default {
  toRenderableString,
  renderableArray,
  useSafeText,
  SafeText,
  SafeParagraphs,
  SafeActionList,
  SafeMeta
}
