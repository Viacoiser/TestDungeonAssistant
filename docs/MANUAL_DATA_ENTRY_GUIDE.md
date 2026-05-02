# 📖 Guía: Agregar Datos Manualmente a la Enciclopedia

Esta guía te muestra exactamente cómo agregar más hechizos, monstruos, razas, etc a la enciclopedia de forma manual.

---

## 🎯 Patrón General

Todos los archivos de enciclopedia siguen el mismo patrón:

```javascript
/**
 * [Categoría] de D&D 5e - Base de Datos Compilada
 * Total de items: N
 */

export const [nombreArray] = [
  // Item 1
  {
    index: "unique-identifier",
    name: "Nombre del Item",
    // ... propiedades específicas
  },
  // Item 2
  {
    index: "another-identifier",
    name: "Otro Item",
    // ... propiedades específicas
  },
  // ... más items
]

export default [nombreArray]
```

---

## ✨ Ejemplo 1: Agregar Hechizo

**Archivo:** `/frontend/src/data/compiled/spells.js`

### Estructura de Hechizo
```javascript
{
  index: "magic-missile",              // ID único (sin espacios, kebab-case)
  name: "Magic Missile",               // Nombre visible
  level: 1,                            // Nivel del hechizo (0-9)
  school: "Evocation",                 // Escuela de magia
  casting_time: "1 action",            // Tiempo de lanzamiento
  range: "120 feet",                   // Rango
  duration: "Instantaneous",           // Duración
  concentration: false,                // Requiere concentración
  ritual: false,                       // Se puede lanzar como ritual
  components: ["V", "S"],              // V=Verbal, S=Somatic, M=Material
  material: null,                      // Material necesario (null si no)
  desc: [
    "A missile of magical force darts toward a creature or object within range.",
    "You can hurl up to three missiles."
  ],                                   // Descripción (array de párrafos)
  higher_level: [
    "When you cast this spell using a spell slot of 2nd level or higher, " +
    "the spell creates one more dart for each slot level above 1st."
  ],                                   // Efectos con slots superiores
  damage: {
    damage_type: {
      index: "force",
      name: "Force"
    },
    damage_at_slot_level: {
      "1": "1d4+1",
      "2": "2d4+2",
      "3": "3d4+3"
    }
  },                                   // Información de daño
  area_of_effect: null,                // Si tiene área (sphere, cone, etc)
  classes: [
    {
      index: "wizard",
      name: "Wizard",
      url: "/api/classes/wizard"
    },
    {
      index: "sorcerer",
      name: "Sorcerer",
      url: "/api/classes/sorcerer"
    }
  ]                                    // Qué clases pueden lanzarlo
}
```

### Cómo agregar un hechizo

1. Abre `/frontend/src/data/compiled/spells.js`
2. Busca el array `export const spells = [`
3. Agrega tu nuevo hechizo **antes del cierre del array:**

```javascript
export const spells = [
  // ... hechizos existentes ...
  
  // TU NUEVO HECHIZO AQUÍ
  {
    index: "firebolt",
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    casting_time: "1 action",
    range: "120 feet",
    duration: "Instantaneous",
    concentration: false,
    ritual: false,
    components: ["V", "S"],
    material: null,
    desc: [
      "You hurl a mote of fire at a creature or object you can see within range.",
      "On a hit, the target takes 1d10 fire damage."
    ],
    higher_level: [
      "This spell's damage increases by 1d10 when you reach 5th level (2d10), " +
      "11th level (3d10), and 17th level (4d10)."
    ],
    damage: {
      damage_type: {
        index: "fire",
        name: "Fire"
      },
      damage_at_slot_level: {
        "0": "1d10"
      }
    },
    area_of_effect: null,
    classes: [
      { index: "sorcerer", name: "Sorcerer", url: "/api/classes/sorcerer" },
      { index: "wizard", name: "Wizard", url: "/api/classes/wizard" }
    ]
  }
  
  // ... más hechizos ...
]

export default spells
```

---

## 👹 Ejemplo 2: Agregar Monstruo

**Archivo:** `/frontend/src/data/compiled/monsters.js`

### Estructura de Monstruo

```javascript
{
  index: "goblin",                          // ID único
  name: "Goblin",                           // Nombre
  size: "Small",                            // Tamaño: Tiny, Small, Medium, Large, Huge, Gargantuan
  type: "humanoid",                         // Tipo: humanoid, beast, dragon, undead, etc
  alignment: "neutral evil",                // Alineamiento
  armor_class: [
    {
      type: "leather",
      value: 15
    }
  ],                                        // Clase de armadura
  hit_points: 7,                            // Puntos de vida
  hit_dice: "2d6",                          // Dados de vida
  hit_points_roll: "2d6+2",                 // Fórmula de HP
  speed: {
    walk: "30 ft."
  },                                        // Velocidades
  ability_scores: {
    strength: 8,                            // -1 modificador
    dexterity: 14,                          // +2 modificador
    constitution: 10,                       // +0 modificador
    intelligence: 10,                       // +0 modificador
    wisdom: 8,                              // -1 modificador
    charisma: 8                             // -1 modificador
  },                                        // Puntuaciones de habilidad
  proficiencies: [
    {
      proficiency: {
        index: "skill-stealth",
        name: "Skill: Stealth"
      },
      value: 4
    }
  ],                                        // Habilidades
  damage_vulnerabilities: [],               // Vulnerabilidades
  damage_resistances: [],                   // Resistencias
  damage_immunities: [],                    // Inmunidades
  condition_immunities: [],                 // Inmunidades a condiciones
  senses: "darkvision 60 ft., passive Perception 9",  // Sentidos
  challenge: 0.25,                          // CR (Challenge Rating)
  traits: [
    {
      name: "Nimble Escape",
      desc: "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
    }
  ],                                        // Habilidades especiales
  actions: [
    {
      action_name: "Scimitar",
      count: 1,
      type: "melee",
      attack_bonus: 4,
      damage_dice: "1d6",
      damage_bonus: 2,
      damage_type: {
        index: "slashing",
        name: "Slashing"
      }
    },
    {
      action_name: "Shortbow",
      count: 1,
      type: "ranged",
      attack_bonus: 4,
      damage_dice: "1d6",
      damage_bonus: 2,
      damage_type: {
        index: "piercing",
        name: "Piercing"
      }
    }
  ]                                         // Acciones
}
```

### Cómo agregar un monstruo

1. Abre `/frontend/src/data/compiled/monsters.js`
2. Agrega en el array `export const monsters = [`

```javascript
export const monsters = [
  // ... monstruos existentes ...
  
  {
    index: "orc",
    name: "Orc",
    size: "Medium",
    type: "humanoid",
    alignment: "chaotic evil",
    armor_class: [{ type: "hide", value: 13 }],
    hit_points: 15,
    hit_dice: "2d8+6",
    hit_points_roll: "2d8+6",
    speed: { walk: "30 ft." },
    ability_scores: {
      strength: 16,
      dexterity: 12,
      constitution: 16,
      intelligence: 7,
      wisdom: 11,
      charisma: 10
    },
    damage_resistances: [],
    senses: "darkvision 60 ft., passive Perception 10",
    challenge: 1,
    traits: [
      {
        name: "Aggressive",
        desc: "As a bonus action, the orc can move up to its speed toward a hostile creature that it can see."
      }
    ],
    actions: [
      {
        action_name: "Greataxe",
        count: 1,
        type: "melee",
        attack_bonus: 5,
        damage_dice: "1d12",
        damage_bonus: 3,
        damage_type: { index: "slashing", name: "Slashing" }
      }
    ]
  }
  
  // ... más monstruos ...
]

export default monsters
```

---

## ⚔️ Ejemplo 3: Agregar Equipo/Arma

**Archivo:** `/frontend/src/data/compiled/equipment.js`

### Estructura de Equipamiento

```javascript
{
  index: "longsword",                       // ID único
  name: "Longsword",                        // Nombre
  equipment_category: {
    index: "melee-weapons",
    name: "Melee Weapons"
  },                                        // Categoría
  cost: {
    quantity: 15,
    unit: "gp"                              // gp = gold pieces
  },                                        // Costo
  damage: {
    dice_count: 1,
    dice_value: 8,                          // 1d8
    type: {
      index: "slashing",
      name: "Slashing"
    }
  },                                        // Daño
  two_handed_damage: {
    dice_count: 1,
    dice_value: 10                          // 1d10 si se usa con dos manos
  },                                        // Daño con dos manos
  properties: [
    {
      index: "versatile",
      name: "Versatile"
    }
  ],                                        // Propiedades especiales
  weight: 3,                                // Peso en libras
  range: {
    normal: 5,                              // Rango normal
    long: null                              // Rango largo (null si no)
  },                                        // Rango
  rarity: "Common",                         // Raridad
  desc: [
    "A longsword is a basic melee weapon.",
    "It can be used with one or two hands."
  ]                                         // Descripción
}
```

### Cómo agregar equipo

```javascript
export const equipment = [
  // ... equipos existentes ...
  
  {
    index: "wand-of-fireballs",
    name: "Wand of Fireballs",
    equipment_category: {
      index: "wondrous-items",
      name: "Wondrous Items"
    },
    cost: {
      quantity: 10000,
      unit: "gp"
    },
    weight: 1,
    rarity: "Rare",
    desc: [
      "This wand has 7 charges.",
      "While you are holding it, you can use an action to expend 1 charge...",
      "The wand regains 1d6+1 expended charges daily at dawn."
    ]
  }
  
  // ... más equipos ...
]

export default equipment
```

---

## 👤 Ejemplo 4: Agregar Raza

**Archivo:** `/frontend/src/data/compiled/races.js`

### Estructura de Raza

```javascript
{
  index: "human",                           // ID único
  name: "Human",                            // Nombre
  speed: 30,                                // Velocidad base
  ability_bonuses: [
    {
      ability_score: {
        index: "str",
        name: "STR"
      },
      bonus: 1
    },
    // ... +1 a todas las habilidades
  ],                                        // Bonificaciones
  age: "Humans reach adulthood...",         // Descripción de edad
  alignment: "Humans tend toward...",       // Alineamiento típico
  size: "Medium",                           // Tamaño
  size_description: "Humans vary widely...", // Descripción de tamaño
  languages: [
    {
      index: "common",
      name: "Common"
    }
  ],                                        // Lenguajes
  language_desc: "Typically speak Common...", // Descripción de lenguajes
  traits: [
    {
      name: "Versatile",
      desc: "Humans are remarkably adaptable..."
    }
  ]                                         // Rasgos especiales
}
```

---

## 🎓 Ejemplo 5: Agregar Clase

**Archivo:** `/frontend/src/data/compiled/classes.js`

### Estructura de Clase

```javascript
{
  index: "wizard",                          // ID único
  name: "Wizard",                           // Nombre
  hit_die: 6,                               // Dado de vida (d6, d8, d10, d12)
  class_levels: "/api/classes/wizard/levels", // Link a niveles
  multi_classing: {
    prerequisite_ability: {
      ability_score: {
        index: "int",
        name: "INT"
      },
      minimum_score: 13
    },
    proficiencies: []
  },                                        // Requisitos multiclass
  spellcasting: {
    spellcasting_ability: {
      index: "intelligence",
      name: "Intelligence"
    }
  },                                        // Info de lanzamiento
  spells: "/api/classes/wizard/spells",    // Hechizos disponibles
  features: "/api/classes/wizard/features", // Rasgos de clase
  subclasses: [
    {
      index: "abjuration",
      name: "Abjuration"
    }
  ]                                         // Subcaminos/Especialidades
}
```

---

## ✅ Validación

Después de agregar datos, verifica:

1. **Sintaxis JSON correcta**
   - Comillas dobles en todos lados
   - Comas separando elementos
   - Keine trailing commas al final

2. **Estructura consistente**
   - Todos los items de la misma categoría tienen campos iguales
   - Los indices son únicos

3. **Build compila**
   ```bash
   cd /frontend
   npm run build
   ```

4. **Datos cargados**
   Abre DevTools → Console:
   ```javascript
   import('./src/data/compiled/spells.js')
     .then(m => console.log('Spells:', m.default.length))
   ```

---

## 📐 Patrón Rápido: Copiar y Pegar

### Template Hechizo
```javascript
{
  index: "your-spell-id",
  name: "Your Spell Name",
  level: 1,
  school: "Evocation",
  casting_time: "1 action",
  range: "Self",
  duration: "Concentration, up to 1 minute",
  concentration: true,
  ritual: false,
  components: ["V", "S"],
  material: null,
  desc: ["Description paragraph 1", "Description paragraph 2"],
  higher_level: [],
  classes: []
}
```

### Template Monstruo
```javascript
{
  index: "your-monster-id",
  name: "Your Monster Name",
  size: "Medium",
  type: "humanoid",
  alignment: "neutral",
  armor_class: [{ type: "natural", value: 13 }],
  hit_points: 27,
  hit_dice: "5d8+5",
  hit_points_roll: "5d8+5",
  speed: { walk: "30 ft." },
  ability_scores: { strength: 16, dexterity: 12, constitution: 14, intelligence: 8, wisdom: 10, charisma: 10 },
  senses: "passive Perception 10",
  challenge: 1,
  traits: [],
  actions: []
}
```

### Template Equipo
```javascript
{
  index: "your-item-id",
  name: "Your Item Name",
  equipment_category: { index: "melee-weapons", name: "Melee Weapons" },
  cost: { quantity: 15, unit: "gp" },
  weight: 3,
  desc: ["Description"]
}
```

---

## 💡 Tips

1. **Mantén orden:** Los items no necesitan estar ordenados, pero es más fácil leer si están
2. **Indices únicos:** Usa kebab-case (spell-name, no Spell Name)
3. **Referencias correctas:** Los indexes que referencian deben existir
4. **Descripciones claras:** Copia del D&D 5e Player's Handbook cuando sea posible
5. **Incrementa contador:** Actualiza `Total de items: N` en el comentario del archivo

---

## 🚀 Siguiente Paso

Una vez que agreges datos manualmente:

```bash
# Compilar para verificar
npm run build

# Ver datos en consola
npm run dev
# Abre DevTools → Console
```

Los datos se cargarán automáticamente en los componentes de referencia.

---

**Preguntas frecuentes:**

**P: ¿Dónde obtengo la información de hechizos/monstruos?**  
R: D&D 5e Player's Handbook, Monster Manual, o [dnd5eapi.co](https://dnd5eapi.co)

**P: ¿Se requiere que tenga todos los campos?**  
R: No, puedes dejar campos vacíos (null, [], "") pero mantén la estructura

**P: ¿Cómo agrego imágenes?**  
R: Agreg URL en un campo `url` o `image_url` en el objeto

**P: ¿Se actualiza automáticamente?**  
R: Sí, cambios en los archivos se reflejan en componentes que usan el hook
