import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  BookOpen,
  MessageSquare,
  Users,
  Settings,
  Theater,
  Camera,
  Mic,
  User,
} from 'lucide-react'
import { campaignAPI, characterAPI } from '../../services/api'
import { useAuthStore } from '../../store/useAuthStore'
import {
  NotesTab,
  NpcsTab,
  CharactersTab,
  AssistantTab,
  MembersTab,
  SettingsTab,
  OCRTab,
} from '../../pages/CampaignView'
import CharacterInspect from '../CharacterInspect'
import DiceBoxRoller from '../desktop/DiceBoxRoller'

// ── Animación de tab ────────────────────────────────────────────────────────
const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.15, ease: 'easeIn' } },
}

// ── Definición de tabs ───────────────────────────────────────────────────────
function buildTabs(isGM) {
  return [
    { id: 'notas', label: 'Notas', Icon: BookOpen },
    { id: 'personajes', label: 'Personajes', Icon: Users },
    { id: 'dice', label: 'Dados 3D', Icon: MessageSquare },
    ...(isGM ? [{ id: 'npcs', label: 'NPCs', Icon: Theater }] : []),
    { id: 'asistente', label: 'Asistente', Icon: MessageSquare },
    { id: 'ocr', label: 'OCR', Icon: Camera },
    { id: 'miembros', label: 'Miembros', Icon: Users },
    ...(isGM ? [{ id: 'configuracion', label: 'Configuración', Icon: Settings }] : []),
  ]
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function CampaignDetail({ campaign: initialCampaign, userRole, onBack }) {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('notas')
  const [campaign, setCampaign] = useState(initialCampaign)
  const [viewingCharacter, setViewingCharacter] = useState(null)
  const [playerName, setPlayerName] = useState(null)

  const isGM = userRole === 'GM'
  const tabs  = buildTabs(isGM)

  // Sincronizar si el padre actualiza la campaña
  useEffect(() => { setCampaign(initialCampaign) }, [initialCampaign])

  // Cargar nombre del personaje del jugador
  useEffect(() => {
    if (!isGM && initialCampaign?.id) {
      const savedPlayerName = localStorage.getItem(`campaign_${initialCampaign.id}_player_name`)
      if (savedPlayerName) {
        setPlayerName(savedPlayerName)
      }
    }
  }, [initialCampaign?.id, isGM])

  // Actualizar playerName cuando se selecciona un personaje
  const handleSelectCharacter = (charId, charName) => {
    if (!isGM && charName) {
      setPlayerName(charName)
      localStorage.setItem(`campaign_${initialCampaign.id}_player_name`, charName)
    }
    setViewingCharacter(charId)
  }

  // Monitorear cambios en localStorage para playerName (cuando se selecciona personaje en CharactersTab)
  useEffect(() => {
    const handleStorageChange = () => {
      if (!isGM && initialCampaign?.id) {
        const savedPlayerName = localStorage.getItem(`campaign_${initialCampaign.id}_player_name`)
        if (savedPlayerName) {
          setPlayerName(savedPlayerName)
        }
      }
    }

    // Escuchar cambios de storage desde otras pestañas
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [initialCampaign?.id, isGM])

  // Actualizar playerName cuando se abre la pestaña de personajes
  useEffect(() => {
    if (activeTab === 'personajes' && !isGM && initialCampaign?.id) {
      const savedPlayerName = localStorage.getItem(`campaign_${initialCampaign.id}_player_name`)
      if (savedPlayerName) {
        setPlayerName(savedPlayerName)
      }
    }
  }, [activeTab, initialCampaign?.id, isGM])

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      background: 'transparent',
    }}>

      {/* ── Campaign Header ─────────────────────────────────────────────── */}
      <header style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.75rem',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        {/* Back button */}
        <button
          onClick={onBack}
          title="Volver"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(226,209,166,0.55)',
            cursor: 'pointer', transition: 'all 0.18s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = 'var(--fantasy-gold)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.color = 'rgba(226,209,166,0.55)'
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Campaign info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.25rem', fontWeight: 700,
              color: '#fff', margin: 0,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {campaign?.name || 'Campaña'}
            </h2>
            <span style={{
              fontSize: '0.6rem', fontWeight: 800,
              padding: '0.15rem 0.55rem', borderRadius: 20,
              border: `1px solid ${isGM ? 'rgba(251,191,36,0.45)' : 'rgba(139,92,246,0.45)'}`,
              background: isGM ? 'rgba(251,191,36,0.12)' : 'rgba(139,92,246,0.12)',
              color: isGM ? '#fbbf24' : '#a78bfa',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              flexShrink: 0,
            }}>
              {isGM ? 'GM' : 'Jugador'}
            </span>
          </div>
          {campaign?.description && (
            <p style={{
              fontSize: '0.78rem', color: 'rgba(226,209,166,0.4)',
              margin: '0.15rem 0 0', whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {campaign.description}
            </p>
          )}
        </div>

        {/* User Info Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
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
              flexShrink: 0
            }}>
              <User size={18} color="var(--fantasy-gold)" />
            </div>
          </div>
          {!isGM && playerName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.75rem', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 600, padding: '0.35rem 0.8rem',
                borderRadius: 16, border: '1px solid rgba(168,85,247,0.4)',
                background: 'rgba(168,85,247,0.1)',
                color: '#d8b4fe', letterSpacing: '0.03em',
                whiteSpace: 'nowrap', flexShrink: 0
              }}>
                {playerName}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Sub-Tabs Bar ────────────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        padding: '0 1.75rem',
        background: 'rgba(0,0,0,0.22)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflowX: 'auto',
      }}
        className="no-scrollbar"
      >
        {tabs.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.95rem 1.1rem',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${active ? 'var(--fantasy-accent)' : 'transparent'}`,
                color: active ? 'var(--fantasy-accent)' : 'rgba(226,209,166,0.4)',
                cursor: 'pointer',
                fontSize: '0.82rem', fontWeight: active ? 600 : 500,
                letterSpacing: '0.01em',
                transition: 'all 0.18s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.color = 'rgba(226,209,166,0.7)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.color = 'rgba(226,209,166,0.4)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Tab Content ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'absolute', inset: 0,
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Inner scroll wrapper for each tab */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '1.5rem 1.75rem',
              height: '100%',
            }}>
              {activeTab === 'notas' && <NotesTab campaignId={campaign?.id} />}
              {activeTab === 'personajes' && <CharactersTab campaignId={campaign?.id} isGM={isGM} user={user} onSelectCharacter={setViewingCharacter} />}
              {activeTab === 'dice' && (
                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <DiceBoxRoller />
                </div>
              )}
              {activeTab === 'npcs' && <NpcsTab campaignId={campaign?.id} isGM={isGM} />}
              {activeTab === 'asistente'      && <AssistantTab campaignId={campaign?.id} />}
              {activeTab === 'ocr'            && <OCRTab />}
              {activeTab === 'miembros'       && <MembersTab   campaignId={campaign?.id} />}
              {activeTab === 'configuracion'  && (
                <SettingsTab
                  campaign={campaign}
                  onUpdate={setCampaign}
                  isGM={isGM}
                  onCampaignDeleted={onBack}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {viewingCharacter && (
        <CharacterInspect
          character={viewingCharacter}
          campaignId={campaign?.id}
          onClose={() => setViewingCharacter(null)}
          onUpdate={(updated) => {
            setViewingCharacter(null)
          }}
          isGM={isGM}
        />
      )}
    </div>
  )
}
