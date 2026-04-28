import React, { useState, useEffect } from 'react'
import { useDndData } from '../hooks/useDndData'
import { useDnd5eAPI } from '../hooks/useDnd5eAPI'
import { Save, AlertCircle, Plus, Trash2, Search, Upload, X } from 'lucide-react'
import { commonItems } from '../services/equipmentService'
import {
  getProficiencyBonus,
} from '../utils/normalizeCharacter'

// ── Helpers de defaults JSONB ──────────────────────────────────────────────────

function makeSavingThrows() {
  return Object.fromEntries(
    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
      .map(s => [s, { proficient: false }])
  )
}

function makeSkills() {
  return Object.fromEntries(
    [
      'acrobatics', 'animal_handling', 'arcana', 'athletics',
      'deception', 'history', 'insight', 'intimidation',
      'investigation', 'medicine', 'nature', 'perception',
      'performance', 'persuasion', 'religion', 'sleight_of_hand',
      'stealth', 'survival',
    ].map(s => [s, { proficient: false, expertise: false }])
  )
}

function makeAttacks() {
  return Array(3).fill(null).map(() => ({
    name: '', attack_bonus: '+0', damage: '', damage_type: '',
  }))
}

function makeSpellcasting() {
  return {
    class: '', ability: '', save_dc: 0, attack_bonus: 0,
    slots: Object.fromEntries(
      Array.from({ length: 9 }, (_, i) => [String(i + 1), { total: 0, used: 0 }])
    ),
    cantrips: [], spells: [],
  }
}

export default function CharacterForm({ campaignId, onSubmit, loading }) {
  const { races, classes, backgrounds, alignments } = useDndData()
  const { calculateBaseStats, calculateMaxHP } = useDnd5eAPI()

  const [formData, setFormData] = useState({
    // ── Identificación ─────────────────────────────────────────────────────────
    name: '',
    race: '',
    class_: '',
    level: 1,
    background: '',
    alignment: '',
    experience_points: 0,
    player_name: '',

    // ── Stats ──────────────────────────────────────────────────────────────────
    stats: {
      strength: 10, dexterity: 10, constitution: 10,
      intelligence: 10, wisdom: 10, charisma: 10,
    },

    // ── Combate ────────────────────────────────────────────────────────────────
    hp_max: 10,
    hp_current: 10,
    hp_temporary: 0,
    armor_class: 10,
    initiative: 0,
    speed: 30,
    proficiency_bonus: 2,
    hit_dice: '1d8',
    hit_dice_used: 0,
    passive_perception: 10,
    inspiration: false,

    // ── Tiradas de salvación y habilidades ─────────────────────────────────────
    saving_throws: makeSavingThrows(),
    skills: makeSkills(),

    // ── Death saves ────────────────────────────────────────────────────────────
    death_saves: { successes: 0, failures: 0 },

    // ── Ataques ────────────────────────────────────────────────────────────────
    attacks: makeAttacks(),

    // ── Equipo e inventario ────────────────────────────────────────────────────
    equipment: '',
    currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    treasure: '',

    // ── Spellcasting ───────────────────────────────────────────────────────────
    spellcasting: makeSpellcasting(),

    // ── Personalidad ───────────────────────────────────────────────────────────
    personality_traits: '',
    ideals: '',
    bonds: '',
    flaws: '',

    // ── Rasgos y características ────────────────────────────────────────────────
    features_traits: '',
    other_proficiencies: '',
    additional_features: '',

    // ── Trasfondo ──────────────────────────────────────────────────────────────
    backstory: '',
    allies_organizations: { text: '', symbol: '' },

    // ── Apariencia física ──────────────────────────────────────────────────────
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',
    appearance: '',

    // ── Imagen ────────────────────────────────────────────────────────────────
    image_url: null,
  })

  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [startingEquipment, setStartingEquipment] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('weapon')
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = React.useRef(null)

  // Get unique categories
  const categories = [...new Set(commonItems.map(item => item.category))].sort()

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? parseInt(value) || 0 : value

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: parsedValue
      }

      // Si cambió la raza, actualizar stats base
      if (name === 'race' && value) {
        const baseStats = calculateBaseStats(value)
        updated.stats = baseStats
      }

      // Si cambió la clase o el nivel, recalcular HP y prof bonus
      if ((name === 'class_' || name === 'level') && updated.class_) {
        const className = name === 'class_' ? value : updated.class_
        const level = name === 'level' ? parsedValue : updated.level
        const constitution = updated.stats.constitution

        const maxHP = calculateMaxHP(className, level, constitution)
        updated.hp_max = maxHP
        updated.hp_current = maxHP
        updated.proficiency_bonus = getProficiencyBonus(level)
        updated.hit_dice_used = 0
      }

      return updated
    })
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleStatChange = (stat, value) => {
    const parsedValue = parseInt(value) || 3
    const clampedValue = Math.min(20, Math.max(3, parsedValue))

    setFormData(prev => {
      const updated = {
        ...prev,
        stats: {
          ...prev.stats,
          [stat]: clampedValue
        }
      }

      // Si cambió CON, recalcular HP
      if (stat === 'constitution') {
        const maxHP = calculateMaxHP(prev.class_, prev.level, clampedValue)
        updated.hp_max = maxHP
        updated.hp_current = maxHP
      }

      return updated
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    if (!formData.race) {
      newErrors.race = 'La raza es requerida'
    }
    if (!formData.class_) {
      newErrors.class_ = 'La clase es requerida'
    }
    if (formData.hp_max < 1) {
      newErrors.hp_max = 'Los HP máximos deben ser al menos 1'
    }
    if (formData.level < 1 || formData.level > 20) {
      newErrors.level = 'El nivel debe estar entre 1 y 20'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tamaño
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'La imagen no debe superar 5MB' }))
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target.result)
        setFormData(prev => ({ ...prev, image_url: event.target.result }))
        setErrors(prev => ({ ...prev, image: '' }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image_url: null }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Preparar datos para enviar al backend — todos los campos del contrato
      const submitData = {
        // ── Identificación ────────────────────────────────────────────────────
        campaign_id:       campaignId || formData.campaign_id,
        name:              formData.name,
        class:             formData.class_,   // BD usa "class", no "class_"
        race:              formData.race,
        level:             formData.level,
        background:        formData.background,
        alignment:         formData.alignment,
        experience_points: formData.experience_points,
        player_name:       formData.player_name,

        // ── Stats ─────────────────────────────────────────────────────────────
        stats: formData.stats,

        // ── Combate ───────────────────────────────────────────────────────────
        hp_max:            formData.hp_max,
        hp_current:        formData.hp_current,
        hp_temporary:      formData.hp_temporary,
        armor_class:       formData.armor_class,
        initiative:        formData.initiative,
        speed:             formData.speed,
        proficiency_bonus: formData.proficiency_bonus,
        hit_dice:          formData.hit_dice,
        hit_dice_used:     formData.hit_dice_used,
        passive_perception:formData.passive_perception,
        inspiration:       formData.inspiration,

        // ── JSONB estructurados ────────────────────────────────────────────────
        saving_throws:     formData.saving_throws,
        skills:            formData.skills,
        death_saves:       formData.death_saves,
        attacks:           formData.attacks,
        spellcasting:      formData.spellcasting,
        currency:          formData.currency,
        allies_organizations: formData.allies_organizations,

        // ── Equipo ────────────────────────────────────────────────────────────
        // Si seleccionó ítems del picker, serializarlos; si no, el texto del campo
        equipment: startingEquipment.length > 0
          ? JSON.stringify(startingEquipment)
          : formData.equipment,
        treasure: formData.treasure,

        // ── Personalidad ──────────────────────────────────────────────────────
        personality_traits: formData.personality_traits,
        ideals:             formData.ideals,
        bonds:              formData.bonds,
        flaws:              formData.flaws,

        // ── Rasgos ────────────────────────────────────────────────────────────
        features_traits:     formData.features_traits,
        other_proficiencies: formData.other_proficiencies,
        additional_features: formData.additional_features,

        // ── Trasfondo ─────────────────────────────────────────────────────────
        backstory: formData.backstory,

        // ── Apariencia ────────────────────────────────────────────────────────
        age:        formData.age,
        height:     formData.height,
        weight:     formData.weight,
        eyes:       formData.eyes,
        skin:       formData.skin,
        hair:       formData.hair,
        appearance: formData.appearance,

        // ── Imagen ────────────────────────────────────────────────────────────
        image_url: formData.image_url,
      }
      onSubmit(submitData)
    }
  }


  const handleAddEquipment = (item) => {
    const newItem = {
      id: Date.now().toString(),
      ...item,
      quantity: 1,
    }
    setStartingEquipment([...startingEquipment, newItem])
  }

  const handleRemoveEquipment = (itemId) => {
    setStartingEquipment(startingEquipment.filter(item => item.id !== itemId))
  }

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveEquipment(itemId)
    } else {
      setStartingEquipment(startingEquipment.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(quantity) || 1 } : item
      ))
    }
  }

  const filteredItems = searchTerm 
    ? commonItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : commonItems.filter(item => item.category === selectedCategory)

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-6">Información Básica</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Personaje *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Aragorn, Merlin, etc..."
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nivel *
            </label>
            <input
              type="number"
              name="level"
              min="1"
              max="20"
              value={formData.level}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-yellow-600 ${
                errors.level ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.level && <p className="text-red-400 text-sm mt-1">{errors.level}</p>}
          </div>

          {/* Race */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Raza *
            </label>
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-yellow-600 ${
                errors.race ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="" style={{ background: '#1a1a1a', color: '#fff' }}>Seleccionar raza...</option>
              {races.map((race) => (
                <option key={race.index} value={race.index} style={{ background: '#1a1a1a', color: '#fff' }}>
                  {race.name}
                </option>
              ))}
            </select>
            {errors.race && <p className="text-red-400 text-sm mt-1">{errors.race}</p>}
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Clase *
            </label>
            <select
              name="class_"
              value={formData.class_}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-yellow-600 ${
                errors.class_ ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="" style={{ background: '#1a1a1a', color: '#fff' }}>Seleccionar clase...</option>
              {classes.map((cls) => (
                <option key={cls.index} value={cls.index} style={{ background: '#1a1a1a', color: '#fff' }}>
                  {cls.name}
                </option>
              ))}
            </select>
            {errors.class_ && <p className="text-red-400 text-sm mt-1">{errors.class_}</p>}
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Trasfondo
            </label>
            <select
              name="background"
              value={formData.background}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            >
              <option value="" style={{ background: '#1a1a1a', color: '#fff' }}>Seleccionar trasfondo...</option>
              {backgrounds.map((bg) => (
                <option key={bg.index} value={bg.index} style={{ background: '#1a1a1a', color: '#fff' }}>
                  {bg.name}
                </option>
              ))}
            </select>
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Alineación
            </label>
            <select
              name="alignment"
              value={formData.alignment}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            >
              <option value="" style={{ background: '#1a1a1a', color: '#fff' }}>Seleccionar alineación...</option>
              {alignments.map((align) => (
                <option key={align.index} value={align.index} style={{ background: '#1a1a1a', color: '#fff' }}>
                  {align.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-6">🖼️ Imagen del Personaje</h2>

        {/* Image Preview */}
        <div className="mb-4">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Vista previa del personaje"
                className="w-full h-48 object-cover rounded-lg border border-gray-600"
              />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-300 font-medium">Haz clic para subir una imagen</p>
                <p className="text-gray-500 text-sm">PNG, JPG, WebP • Máx 5MB</p>
              </div>
            </div>
          )}
        </div>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Upload size={18} />
          {imagePreview ? 'Cambiar Imagen' : 'Subir Imagen'}
        </button>

        {errors.image && <p className="text-red-400 text-sm mt-2">{errors.image}</p>}

        <p className="text-gray-400 text-sm mt-4 text-center">
          La imagen se mostrará en la tarjeta del personaje y será visible para otros jugadores
        </p>
      </div>

      {/* Abilities Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-6">Habilidades (Abilities)</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(formData.stats).map(([stat, value]) => (
            <div key={stat}>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                {stat.slice(0, 3)}
              </label>
              <input
                type="number"
                min="3"
                max="20"
                value={value}
                onChange={(e) => handleStatChange(stat, e.target.value)}
                className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center focus:outline-none focus:border-yellow-600"
              />
              <p className="text-xs text-gray-400 mt-1 text-center">
                {value > 10 ? '+' : ''}{Math.floor((value - 10) / 2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Combat Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-6">Combate</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* HP Max */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              HP Máximos *
            </label>
            <input
              type="number"
              name="hp_max"
              min="1"
              value={formData.hp_max}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-yellow-600 ${
                errors.hp_max ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.hp_max && <p className="text-red-400 text-sm mt-1">{errors.hp_max}</p>}
          </div>

          {/* HP Current */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              HP Actuales
            </label>
            <input
              type="number"
              name="hp_current"
              min="0"
              max={formData.hp_max}
              value={formData.hp_current}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* AC */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Clase de Armadura (AC)
            </label>
            <input
              type="number"
              name="armor_class"
              value={formData.armor_class}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Initiative */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Iniciativa
            </label>
            <input
              type="number"
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Speed */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Velocidad
            </label>
            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Proficiency Bonus */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bonificación de Pericia
            </label>
            <input
              type="number"
              name="proficiency_bonus"
              value={formData.proficiency_bonus}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Hit Dice */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dado de Golpe
            </label>
            <input
              type="text"
              name="hit_dice"
              value={formData.hit_dice}
              onChange={handleChange}
              placeholder="1d8"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Passive Perception */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Percepción Pasiva
            </label>
            <input
              type="number"
              name="passive_perception"
              value={formData.passive_perception}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-600"
            />
          </div>
        </div>
      </div>

      {/* Character Details Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-6">Detalles del Personaje</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personality Traits */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rasgos de Personalidad
            </label>
            <textarea
              name="personality_traits"
              value={formData.personality_traits}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="Describe los rasgos de personalidad..."
            />
          </div>

          {/* Ideals */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ideales
            </label>
            <textarea
              name="ideals"
              value={formData.ideals}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="¿Qué ideales defiende tu personaje?"
            />
          </div>

          {/* Bonds */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vínculos
            </label>
            <textarea
              name="bonds"
              value={formData.bonds}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="¿A qué personas u organizaciones está vinculado?"
            />
          </div>

          {/* Flaws */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Defectos
            </label>
            <textarea
              name="flaws"
              value={formData.flaws}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="¿Cuáles son sus debilidades o defectos?"
            />
          </div>

          {/* Other Proficiencies */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Otras Pericias
            </label>
            <textarea
              name="other_proficiencies"
              value={formData.other_proficiencies}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="Idiomas, herramientas, etc..."
            />
          </div>

          {/* Equipment */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Equipo
            </label>
            <textarea
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="Armas, armaduras, objetos especiales..."
            />
          </div>

          {/* Features & Traits */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rasgos y Características
            </label>
            <textarea
              name="features_traits"
              value={formData.features_traits}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="Habilidades especiales, talentos, etc..."
            />
          </div>

          {/* Backstory */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Trasfondo (Historia)
            </label>
            <textarea
              name="backstory"
              value={formData.backstory}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              placeholder="Cuéntanos la historia de tu personaje..."
            />
          </div>
        </div>
      </div>

      {/* Starting Equipment Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-6">⚔️ Inventario Inicial</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar objetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
            />
          </div>
        </div>

        {/* Category Tabs */}
        {!searchTerm && (
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
                className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Available Items List */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Objetos Disponibles</h3>
          <div className="max-h-48 overflow-y-auto bg-gray-700/20 border border-gray-600/30 rounded-lg p-3 space-y-1">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleAddEquipment(item)}
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-700/40 hover:bg-yellow-600/30 border border-gray-600/50 hover:border-yellow-600/50 rounded text-left text-sm text-gray-200 hover:text-yellow-300 transition-colors"
                >
                  <span>{item.name}</span>
                  <Plus size={16} className="text-yellow-500" />
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                No hay items que coincidan
              </p>
            )}
          </div>
        </div>

        {/* Selected Equipment */}
        <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            {startingEquipment.length === 0 
              ? 'Sin objetos. Agrega algunos para comenzar.' 
              : `Equipamiento (${startingEquipment.length} objetos)`}
          </h3>

          {startingEquipment.length > 0 && (
            <div className="space-y-2">
              {startingEquipment.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-600/30 border border-gray-500/30 rounded px-3 py-2"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-gray-400 text-xs">{item.type}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min="1"
                      className="w-12 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-center text-sm focus:outline-none focus:border-yellow-600"
                    />
                    <button
                      onClick={() => handleRemoveEquipment(item.id)}
                      type="button"
                      className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold rounded-lg transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save size={20} />
          {loading ? 'Creando...' : 'Crear Personaje'}
        </button>
      </div>
    </form>
  )
}
