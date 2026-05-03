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
import CharacterInspect from '../shared/CharacterInspect'
import DiceBoxRoller from './DiceBoxRoller'

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

      {/* ── Floating Sub-Tabs Bar (Modern & Centered) ── */}
      <div className="flex-shrink-0 z-10 w-full px-4 py-4 flex justify-center">
        <div className="relative flex items-center justify-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {tabs.map(({ id, label, Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  relative flex items-center justify-center gap-2 px-5 py-2.5 
                  text-sm font-semibold rounded-xl whitespace-nowrap
                  transition-colors duration-300 outline-none select-none
                  ${active ? 'text-white' : 'text-fantasy-gold/60 hover:text-fantasy-gold/90'}
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Active Indicator Background */}
                {active && (
                  <motion.div
                    layoutId="desktopActiveCampaignTab"
                    className="absolute inset-0 bg-gradient-to-r from-[rgba(217,83,30,0.8)] to-[#c9873c] rounded-xl shadow-[0_0_15px_rgba(217,83,30,0.4)] border border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} className={active ? 'text-white drop-shadow-md' : 'text-fantasy-gold/50'} />
                  <span className="tracking-wide">{label}</span>
                </span>
              </button>
            )
          })}
        </div>
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
