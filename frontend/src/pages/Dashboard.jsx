import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { campaignAPI } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout, setToken, setUser } = useAuthStore()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    /**
     * Cargar las campañas del usuario
     */
    const loadCampaigns = async () => {
      try {
        const response = await campaignAPI.list()
        setCampaigns(response.data || [])
      } catch (err) {
        console.error('Error cargando campañas:', err)
        setError('No se pudieron cargar las campañas')
      } finally {
        setLoading(false)
      }
    }

    loadCampaigns()
  }, [])

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')

    // Limpiar Zustand
    setToken(null)
    setUser(null)
    logout()

    // Redirigir a login
    navigate('/login')
  }

  const handleCreateCampaign = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError('El nombre de la campaña es requerido')
      return
    }

    setCreating(true)
    try {
      await campaignAPI.create(formData.name, formData.description)
      setShowModal(false)
      setFormData({ name: '', description: '' })
      setError('')
      
      // Recargar las campañas
      const response = await campaignAPI.list()
      setCampaigns(response.data || [])
    } catch (err) {
      console.error('Error creando campaña:', err)
      setError('Error al crear la campaña')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-black/50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-2">
              🐉 DungeonAssistant
            </h1>
            <p className="text-purple-300 text-sm mt-1">
              Bienvenido, <span className="font-semibold">{user?.username || user?.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Mis Campañas</h2>
            <p className="text-gray-400">Gestiona tus campañas de D&D aquí</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
          >
            ➕ Nueva Campaña
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-purple-300 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Cargando campañas...</p>
          </div>
        ) : campaigns.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏰</div>
            <h3 className="text-xl font-semibold text-white mb-2">No tienes campañas aún</h3>
            <p className="text-gray-400 mb-6">
              Crea una nueva campaña para comenzar tu aventura
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
              ➕ Crear Primera Campaña
            </button>
          </div>
        ) : (
          /* Campaign Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition duration-200 cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                      {campaign.name}
                    </h3>
                    <p className="text-purple-300 text-sm mt-1">
                      {campaign.role === 'gm' ? '👑 Dungeon Master' : '⚔️ Jugador'}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {campaign.role === 'gm' ? '👑' : '⚔️'}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {campaign.description || 'Sin descripción'}
                </p>

                <div className="text-xs text-gray-400 mb-4">
                  {campaign.member_count || 1} miembro{campaign.member_count !== 1 ? 's' : ''}
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                  Entrar a Campaña
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal para crear campaña */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Crear Nueva Campaña</h2>
            
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Nombre de la Campaña *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: El Reino Perdido"
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción sobre tu campaña..."
                  rows="4"
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  disabled={creating}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                  disabled={creating}
                >
                  {creating ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
