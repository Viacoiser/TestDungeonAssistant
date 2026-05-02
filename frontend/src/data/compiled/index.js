/**
 * Enciclopedia D&D 5e Compilada - Índice Principal
 * Datos: 100 hechizos, 100 monstruos, 100 equipos, 9 razas, 12 clases
 * Última actualización: API dnd5eapi.co
 */

import spells from './spells.js'
import monsters from './monsters.js'
import equipment from './equipment.js'
import races from './races.js'
import classes from './classes.js'
import traits from './traits.js'

export const encyclopedia = {
  spells,
  monsters,
  equipment,
  races,
  classes,
  traits,

  getCategory(category) {
    return this[category] || []
  },

  getCounts() {
    return {
      spells: this.spells.length,
      monsters: this.monsters.length,
      equipment: this.equipment.length,
      races: this.races.length,
      classes: this.classes.length,
      traits: this.traits.length,
    }
  },

  search(query, category = null) {
    const queryLower = query.toLowerCase()
    
    if (category && this[category]) {
      return this[category].filter(item => 
        item.name.toLowerCase().includes(queryLower) ||
        item.index?.toLowerCase().includes(queryLower)
      )
    }
    
    return []
  }
}

export default encyclopedia
