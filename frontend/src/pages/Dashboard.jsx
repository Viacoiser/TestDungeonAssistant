import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { campaignAPI } from '../services/api'
import Sidebar from '../components/desktop/Sidebar'
import CampaignDetail from '../components/desktop/CampaignDetail'
import {
  Search,
  Settings,
  Crown,
  User,
  Plus,
  Users,
  Clock,
  ChevronRight,
  Filter,
  BarChart2,
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout, setToken, setUser } = useAuthStore()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('campaigns')

  // Modal: Crear campaña
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createForm, setCreateForm] = useState({ name: '', description: '' })
  const [creating, setCreating] = useState(false)

  // Modal: Unirse a campaña
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [joinError, setJoinError] = useState('')
  const [joining, setJoining] = useState(false)
  const [joinSuccess, setJoinSuccess] = useState('')

  // Búsqueda
  const [searchQuery, setSearchQuery] = useState('')

  // Modal Settings
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // ── Campaña seleccionada (navegación interna) ─────────────────────────────
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [selectedUserRole, setSelectedUserRole] = useState('PLAYER')
  const [enteringCampaign, setEnteringCampaign] = useState(null) // id loading

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

  useEffect(() => {
    loadCampaigns()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setToken(null)
    setUser(null)
    logout()
    navigate('/login')
  }

  const handleCreateCampaign = async (e) => {
    e.preventDefault()
    if (!createForm.name.trim()) {
      setError('El nombre de la campaña es requerido')
      return
    }
    setCreating(true)
    try {
      await campaignAPI.create(createForm.name, createForm.description)
      setShowCreateModal(false)
      setCreateForm({ name: '', description: '' })
      setError('')
      setLoading(true)
      await loadCampaigns()
    } catch (err) {
      console.error('Error creando campaña:', err)
      setError('Error al crear la campaña')
    } finally {
      setCreating(false)
    }
  }

  const handleJoinCampaign = async (e) => {
    e.preventDefault()
    if (!joinCode.trim()) {
      setJoinError('Ingresa un código de invitación')
      return
    }
    setJoining(true)
    setJoinError('')
    setJoinSuccess('')
    try {
      const res = await campaignAPI.joinByCode(joinCode.trim().toUpperCase())
      setJoinSuccess(res.data?.message || '¡Te uniste a la campaña!')
      setJoinCode('')
      await loadCampaigns()
      setTimeout(() => {
        setShowJoinModal(false)
        setJoinSuccess('')
      }, 1500)
    } catch (err) {
      const detail = err.response?.data?.detail || 'Código inválido o ya eres miembro de esta campaña.'
      setJoinError(detail)
    } finally {
      setJoining(false)
    }
  }

  const isGM = (campaign) => campaign.user_role === 'GM'

  // ── Abrir campaña como navegación interna ────────────────────────────────
  const handleEnterCampaign = async (campaign) => {
    setEnteringCampaign(campaign.id)
    try {
      const membersRes = await campaignAPI.getMembers(campaign.id)
      setSelectedUserRole(membersRes.data?.user_role || 'PLAYER')
      setSelectedCampaign(campaign)
    } catch (e) {
      console.error('Error cargando campaña:', e)
    } finally {
      setEnteringCampaign(null)
    }
  }

  const handleBackFromCampaign = () => {
    setSelectedCampaign(null)
    setSelectedUserRole('PLAYER')
  }

  // Quick stats
  const gmCount = campaigns.filter(c => c.user_role === 'GM').length
  const playerCount = campaigns.filter(c => c.user_role !== 'GM').length

  // Filtered campaigns by search
  const filteredCampaigns = campaigns.filter(c =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--fantasy-bg)', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Sidebar ── */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab)
          if (selectedCampaign) {
            setSelectedCampaign(null)
            setSelectedUserRole('PLAYER')
          }
        }}
      />

      {selectedCampaign ? (
        <CampaignDetail
          campaign={selectedCampaign}
          userRole={selectedUserRole}
          onBack={handleBackFromCampaign}
        />
      ) : (
        <>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

            {/* Background image overlay */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.08, pointerEvents: 'none' }}>
              <img
                src="https://picsum.photos/seed/dungeon-bg/1920/1080?blur=8"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--fantasy-bg) 0%, transparent 50%, var(--fantasy-bg) 100%)' }} />
            </div>

            {/* ── Header ── */}
            <header style={{
              position: 'sticky', top: 0, zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.1rem 2rem',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(226,209,166,0.35)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Buscar campañas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                    color: 'var(--fantasy-gold)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    width: 280,
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(217,83,30,0.5)'
                    e.target.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.target.style.background = 'rgba(255,255,255,0.05)'
                  }}
                />
              </div>

              {/* User info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingRight: '1rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(226,209,166,0.35)' }}>Jugando como</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--fantasy-gold)' }}>{user?.username || user?.email}</div>
                  </div>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    overflow: 'hidden',
                    border: '2px solid rgba(217,83,30,0.4)',
                    boxShadow: '0 0 12px var(--fantasy-accent-glow)',
                    background: 'rgba(217,83,30,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <User size={18} color="var(--fantasy-gold)" />
                  </div>
                </div>
                <button
                  onClick={() => setShowSettingsModal(true)}
                  style={{
                    padding: '0.55rem', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10,
                    color: 'rgba(226,209,166,0.5)', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--fantasy-gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(226,209,166,0.5)' }}
                >
                  <Settings size={19} />
                </button>
              </div>
            </header>

            {/* ── Main ── */}
            <main style={{ flex: 1, padding: '2.5rem 2rem 3rem', overflowY: 'auto', position: 'relative', zIndex: 10 }}>
              <div style={{ maxWidth: 960, margin: '0 auto' }}>

                {/* ── Contenido por Tab ── */}
                {activeTab !== 'campaigns' ? (
                  <SidebarTabContent tab={activeTab} />
                ) : (
                  <>
                    {/* Section header */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2.5rem' }}>
                      <div style={{ animation: 'fadeInUp 0.4s ease forwards' }}>
                        <h2 style={{
                          fontFamily: 'Cinzel, serif',
                          fontSize: '2.8rem', fontWeight: 800,
                          color: 'var(--fantasy-gold)', margin: 0, marginBottom: '0.4rem',
                          textShadow: '0 0 40px rgba(217,83,30,0.25)',
                        }}>
                          Mis Campañas
                        </h2>
                        <p style={{ color: 'rgba(226,209,166,0.55)', fontSize: '1rem', margin: 0 }}>
                          Bienvenido, <strong style={{ color: 'var(--fantasy-gold)' }}>{user?.username || 'Aventurero'}</strong>. Tus mundos te esperan.
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          onClick={() => { setShowJoinModal(true); setJoinCode(''); setJoinError(''); setJoinSuccess('') }}
                          style={btnStyles.secondary}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        >
                          <Filter size={15} />
                          Unirse con Código
                        </button>
                        <button
                          onClick={() => setShowCreateModal(true)}
                          style={btnStyles.primary}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,83,30,0.85)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'var(--fantasy-accent)'}
                        >
                          <Plus size={17} />
                          Nueva Campaña
                        </button>
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: 12, padding: '0.9rem 1.25rem', marginBottom: '1.5rem' }}>
                        <p style={{ color: '#fca5a5', margin: 0, fontSize: '0.9rem' }}>{error}</p>
                      </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 0' }}>
                        <div style={{
                          width: 48, height: 48,
                          border: '3px solid rgba(217,83,30,0.2)',
                          borderTop: '3px solid var(--fantasy-accent)',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                          marginBottom: '1.25rem',
                        }} />
                        <p style={{ color: 'rgba(226,209,166,0.45)', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                          Cargando campañas...
                        </p>
                      </div>

                    ) : filteredCampaigns.length === 0 && searchQuery ? (
                      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ color: 'rgba(226,209,166,0.4)', fontFamily: 'Cinzel, serif' }}>No se encontraron campañas para «{searchQuery}»</p>
                      </div>

                    ) : campaigns.length === 0 ? (
                      /* Empty state */
                      <div style={{ textAlign: 'center', padding: '5rem 0', animation: 'fadeInUp 0.4s ease forwards' }}>
                        <div style={{
                          width: 80, height: 80, borderRadius: '50%',
                          border: '2px dashed rgba(217,83,30,0.35)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 1.5rem',
                          color: 'rgba(217,83,30,0.4)',
                          fontSize: '2rem',
                        }}>
                          🏰
                        </div>
                        <h3 style={{ color: '#fff', fontFamily: 'Cinzel, serif', fontSize: '1.4rem', marginBottom: 8 }}>
                          No tienes campañas aún
                        </h3>
                        <p style={{ color: 'rgba(226,209,166,0.45)', marginBottom: '2rem' }}>
                          Crea una o únete a una campaña existente
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                          <button onClick={() => setShowJoinModal(true)} style={btnStyles.secondary}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                          >
                            🔗 Unirse con Código
                          </button>
                          <button onClick={() => setShowCreateModal(true)} style={btnStyles.primary}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,83,30,0.85)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--fantasy-accent)'}
                          >
                            ✨ Crear Primera Campaña
                          </button>
                        </div>
                      </div>

                    ) : (
                      /* Campaign grid */
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {filteredCampaigns.map((campaign, idx) => (
                          <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            isGM={isGM(campaign)}
                            index={idx}
                            loading={enteringCampaign === campaign.id}
                            onEnter={() => handleEnterCampaign(campaign)}
                          />
                        ))}

                        {/* Add new placeholder */}
                        {!searchQuery && (
                          <button
                            onClick={() => setShowCreateModal(true)}
                            style={{
                              border: '2px dashed rgba(255,255,255,0.08)',
                              borderRadius: 20,
                              padding: '2rem',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.75rem',
                              color: 'rgba(226,209,166,0.2)',
                              background: 'transparent',
                              cursor: 'pointer',
                              minHeight: 220,
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = 'rgba(217,83,30,0.3)'
                              e.currentTarget.style.color = 'rgba(217,83,30,0.5)'
                              e.currentTarget.style.background = 'rgba(217,83,30,0.04)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                              e.currentTarget.style.color = 'rgba(226,209,166,0.2)'
                              e.currentTarget.style.background = 'transparent'
                            }}
                          >
                            <div style={{
                              width: 52, height: 52,
                              borderRadius: '50%',
                              border: '2px dashed currentColor',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <Plus size={26} />
                            </div>
                            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
                              Crear Nuevo Mundo
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </main>
          </div>

          {/* ── Right Panel: Quick Stats ── */}
          <aside style={{
            width: 260,
            background: 'rgba(0,0,0,0.35)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            height: '100vh',
            position: 'sticky',
            top: 0,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            overflowY: 'auto',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <BarChart2 size={17} color="var(--fantasy-accent)" />
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Mis Stats
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <StatCard label="Total Campañas" value={campaigns.length} />
                </div>
                <StatCard label="Como GM" value={gmCount} accent />
                <StatCard label="Como Jugador" value={playerCount} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

            {/* Role legend */}
            <div>
              <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.35)', marginBottom: '1rem', fontWeight: 600 }}>
                Leyenda de Roles
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'rgba(226,209,166,0.65)' }}>
                  <Crown size={14} color="#d97706" />
                  <span>Dungeon Master</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'rgba(226,209,166,0.65)' }}>
                  <Users size={14} color="rgba(226,209,166,0.5)" />
                  <span>Jugador</span>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ── Modal: Crear campaña ── */}
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)} title="Nueva Campaña">
          <form onSubmit={handleCreateCampaign}>
            <label style={labelStyle}>Nombre de la Campaña *</label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
              placeholder="Ej: El Reino Perdido"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(217,83,30,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              autoFocus
            />
            <label style={{ ...labelStyle, marginTop: '1rem' }}>Descripción</label>
            <textarea
              value={createForm.description}
              onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
              placeholder="Describe tu campaña..."
              rows={4}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(217,83,30,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setShowCreateModal(false)} style={btnStyles.ghost} disabled={creating}>
                Cancelar
              </button>
              <button type="submit" style={btnStyles.primary} disabled={creating}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,83,30,0.85)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--fantasy-accent)'}
              >
                {creating ? 'Creando...' : '✨ Crear Campaña'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Modal: Unirse con código ── */}
      {showJoinModal && (
        <Modal onClose={() => setShowJoinModal(false)} title="Unirse a Campaña">
          <p style={{ color: 'rgba(226,209,166,0.55)', marginBottom: '1.25rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Ingresa el código de invitación que te compartió el Dungeon Master.
          </p>
          <form onSubmit={handleJoinCampaign}>
            <label style={labelStyle}>Código de Invitación</label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Ej: AB3X9KPQ"
              maxLength={8}
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '1.3rem', letterSpacing: '0.25em', textAlign: 'center', textTransform: 'uppercase' }}
              onFocus={e => e.target.style.borderColor = 'rgba(217,83,30,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              autoFocus
            />

            {joinError && (
              <div style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.35)', borderRadius: 10, padding: '0.75rem 1rem', marginTop: '0.75rem' }}>
                <p style={{ color: '#fca5a5', margin: 0, fontSize: '0.875rem' }}>{joinError}</p>
              </div>
            )}
            {joinSuccess && (
              <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 10, padding: '0.75rem 1rem', marginTop: '0.75rem' }}>
                <p style={{ color: '#86efac', margin: 0, fontSize: '0.875rem' }}>✅ {joinSuccess}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setShowJoinModal(false)} style={btnStyles.ghost} disabled={joining}>
                Cancelar
              </button>
              <button type="submit" style={btnStyles.accent} disabled={joining}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {joining ? 'Uniéndose...' : 'Unirme'}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {/* ── Modal: Settings ── */}
      {showSettingsModal && (
        <Modal onClose={() => setShowSettingsModal(false)} title="Ajustes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--fantasy-gold)', fontWeight: 700, margin: 0, fontSize: '0.9rem' }}>{user?.username || 'Aventurero'}</p>
                <p style={{ color: 'rgba(226,209,166,0.4)', margin: '2px 0 0', fontSize: '0.78rem' }}>{user?.email}</p>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(217,83,30,0.2)', border: '1px solid rgba(217,83,30,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} color="var(--fantasy-gold)" />
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{ ...btnStyles.ghost, color: 'rgba(248,113,113,0.8)', borderColor: 'rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', flex: 'none', width: '100%', boxSizing: 'border-box' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.1)'; e.currentTarget.style.color = '#f87171' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(248,113,113,0.8)' }}
            >
              Cerrar Sesión
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ── Sidebar Tab Content Placeholder ── */
function SidebarTabContent({ tab }) {
  const tabLabels = {
    characters: { label: 'Personajes', icon: '🧙' },
    traits: { label: 'Rasgos', icon: '📜' },
    equipment: { label: 'Equipamiento', icon: '🎒' },
    dice: { label: 'Dados', icon: '🎲' },
    settings: { label: 'Ajustes', icon: '⚙️' },
  }
  const info = tabLabels[tab] || { label: tab, icon: '⭐' }

  if (tab === 'dice') return <DiceRoller />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>{info.icon}</div>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>{info.label}</h2>
      <p style={{ color: 'rgba(226,209,166,0.4)', fontSize: '0.95rem', maxWidth: 360 }}>Esta sección está en construcción. Vuelve pronto para descubrir nuevas funcionalidades.</p>
    </div>
  )
}

/* ── Dice Roller ── */
function DiceRoller() {
  const [result, setResult] = React.useState(null)
  const [lastDie, setLastDie] = React.useState(null)
  const [rolling, setRolling] = React.useState(false)
  const dice = [4, 6, 8, 10, 12, 20, 100]

  const roll = (sides) => {
    setRolling(true)
    setLastDie(sides)
    setTimeout(() => {
      setResult(Math.floor(Math.random() * sides) + 1)
      setRolling(false)
    }, 350)
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 0' }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>🎲 Lanzador de Dados</h2>
      <p style={{ color: 'rgba(226,209,166,0.4)', marginBottom: '2rem', fontSize: '0.9rem' }}>Selecciona un dado para lanzar.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {dice.map(d => (
          <button
            key={d}
            onClick={() => roll(d)}
            style={{
              background: lastDie === d ? 'rgba(217,83,30,0.25)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${lastDie === d ? 'rgba(217,83,30,0.6)' : 'rgba(255,255,255,0.1)'}`,
              color: lastDie === d ? 'var(--fantasy-accent)' : 'var(--fantasy-gold)',
              borderRadius: 12, padding: '0.75rem 1.1rem',
              fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '1rem',
              cursor: 'pointer', transition: 'all 0.18s',
              minWidth: 60, textAlign: 'center',
            }}
          >
            d{d}
          </button>
        ))}
      </div>
      {result !== null && (
        <div style={{ textAlign: 'center', animation: 'fadeInUp 0.25s ease' }}>
          <p style={{ color: 'rgba(226,209,166,0.45)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            {rolling ? 'Lanzando...' : `Resultado — d${lastDie}`}
          </p>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: rolling ? '3rem' : '5rem',
            fontWeight: 900,
            color: result === lastDie ? '#fbbf24' : result === 1 ? '#f87171' : 'var(--fantasy-gold)',
            textShadow: result === lastDie ? '0 0 30px rgba(251,191,36,0.5)' : result === 1 ? '0 0 30px rgba(248,113,113,0.4)' : '0 0 20px rgba(217,83,30,0.3)',
            transition: 'all 0.35s ease',
            display: 'block',
            lineHeight: 1,
          }}>
            {rolling ? '•••' : result}
          </span>
          {!rolling && result === lastDie && <p style={{ color: '#fbbf24', marginTop: '0.5rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>✨ CRÍTICO!</p>}
          {!rolling && result === 1 && <p style={{ color: '#f87171', marginTop: '0.5rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>💥 Pifia!</p>}
        </div>
      )}
    </div>
  )
}

/* ── Campaign Card ── */
function CampaignCard({ campaign, isGM, onEnter, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(26,26,26,0.65)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hovered
          ? isGM ? 'rgba(217,119,6,0.5)' : 'rgba(217,83,30,0.4)'
          : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 20,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'default',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? isGM ? '0 12px 40px rgba(217,119,6,0.18)' : '0 12px 40px rgba(217,83,30,0.18)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
        animation: `fadeInUp 0.4s ease ${index * 0.08}s forwards`,
        opacity: 0,
      }}
    >
      {/* Decorative glow */}
      <div style={{
        position: 'absolute', right: -24, top: -24,
        width: 100, height: 100,
        background: isGM ? 'rgba(217,119,6,0.07)' : 'rgba(217,83,30,0.06)',
        borderRadius: '50%',
        filter: 'blur(24px)',
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0,
      }} />

      {/* Title + role */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div>
          <h3 style={{
            fontFamily: 'Almendra, serif',
            fontSize: '1.25rem', fontWeight: 700,
            color: hovered ? 'var(--fantasy-gold)' : '#fff',
            margin: 0, marginBottom: '0.3rem',
            transition: 'color 0.2s',
          }}>
            {campaign.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 500, color: isGM ? 'rgba(217,119,6,0.8)' : 'rgba(226,209,166,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {isGM ? <Crown size={14} /> : <Users size={14} />}
            <span>{isGM ? 'Dungeon Master' : 'Jugador'}</span>
          </div>
        </div>
        <div style={{
          padding: '0.4rem', borderRadius: 8,
          background: 'rgba(255,255,255,0.04)',
          color: hovered ? 'var(--fantasy-gold)' : 'rgba(226,209,166,0.3)',
          transition: 'color 0.2s',
          flexShrink: 0,
        }}>
          <ChevronRight size={18} />
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'Almendra, serif',
        color: 'rgba(226,209,166,0.65)',
        fontSize: '1rem',
        margin: 0,
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        minHeight: 48,
      }}>
        {campaign.description || 'Sin descripción'}
      </p>

      {/* Divider info */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.3)', marginBottom: 4 }}>Estado</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'rgba(226,209,166,0.65)' }}>
            <Clock size={11} />
            <span>Activa</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(226,209,166,0.3)', marginBottom: 4 }}>Código</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(226,209,166,0.65)', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
            {campaign.invite_code || '—'}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onEnter}
        style={{
          width: '100%',
          background: isGM
            ? 'linear-gradient(135deg, #78350f, #d97706)'
            : 'linear-gradient(135deg, rgba(217,83,30,0.8), var(--fantasy-accent))',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '0.7rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontSize: '0.85rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          transition: 'opacity 0.2s',
          boxShadow: isGM ? '0 4px 16px rgba(217,119,6,0.25)' : '0 4px 16px var(--fantasy-accent-glow)',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {isGM ? 'Gestionar Campaña' : 'Entrar a Campaña'}
      </button>
    </div>
  )
}

/* ── Quick Stats Card ── */
function StatCard({ label, value, accent }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12,
      padding: '1.25rem 0.75rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.35rem',
      transition: 'all 0.2s ease',
    }}>
      <span style={{
        fontSize: '0.65rem',
        color: 'rgba(226,209,166,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontWeight: 600,
        textAlign: 'center'
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '1.75rem',
        fontWeight: 900,
        color: accent ? 'var(--fantasy-accent)' : 'var(--fantasy-gold)',
        textShadow: accent ? '0 0 15px rgba(217,83,30,0.3)' : '0 0 15px rgba(226,209,166,0.1)',
        lineHeight: 1,
      }}>
        {value}
      </span>
    </div>
  )
}

/* ── Modal wrapper ── */
function Modal({ onClose, title, children }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
        backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{
        background: 'linear-gradient(160deg, #181818, #0d0d0d)',
        border: '1px solid rgba(217,83,30,0.25)',
        borderRadius: 22,
        padding: '2rem',
        width: '100%',
        maxWidth: 480,
        animation: 'fadeInScale 0.22s ease forwards',
        boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(217,83,30,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#fff', fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(226,209,166,0.4)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: 4, borderRadius: 6, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fantasy-gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(226,209,166,0.4)'}
          >✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ── Shared styles ── */
const btnStyles = {
  primary: {
    background: 'var(--fantasy-accent)',
    color: '#fff', border: 'none', borderRadius: 12,
    padding: '0.65rem 1.25rem',
    fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'background 0.2s',
    boxShadow: '0 0 15px var(--fantasy-accent-glow)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  secondary: {
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--fantasy-gold)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '0.65rem 1.25rem',
    fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'background 0.2s',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  accent: {
    background: 'linear-gradient(135deg, #065f46, #059669)',
    color: '#fff', border: 'none', borderRadius: 12,
    padding: '0.65rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', flex: 1,
    transition: 'opacity 0.2s',
  },
  ghost: {
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(226,209,166,0.55)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: '0.65rem 1.25rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', flex: 1,
    transition: 'background 0.2s',
  },
}

const labelStyle = {
  display: 'block', color: 'rgba(226,209,166,0.8)', fontWeight: 600, fontSize: '0.825rem', marginBottom: '0.5rem', letterSpacing: '0.05em',
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '0.7rem 1rem',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}
