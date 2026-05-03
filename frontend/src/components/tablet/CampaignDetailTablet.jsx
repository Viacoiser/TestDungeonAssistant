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
import DiceBoxRollerResponsive from '../shared/DiceBoxRollerResponsive'

// ── Animación de tab ────────────────────────────────────────────────────────
const tabVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -20, transition: { duration: 0.2, ease: 'easeIn' } },
}

// ── Definición de tabs ───────────────────────────────────────────────────────
function buildTabs(isGM) {
  return [
    { id: 'notes', label: 'Notas', Icon: BookOpen },
    { id: 'characters', label: 'Personajes', Icon: Users },
    { id: 'dice', label: 'Dados 3D', Icon: MessageSquare },
    ...(isGM ? [{ id: 'npcs', label: 'NPCs', Icon: Theater }] : []),
    { id: 'assistant', label: 'Asistente', Icon: MessageSquare },
    { id: 'ocr', label: 'OCR', Icon: Camera },
    { id: 'members', label: 'Miembros', Icon: Users },
    ...(isGM ? [{ id: 'settings', label: 'Configuración', Icon: Settings }] : []),
  ]
}

/**
 * ✅ CampaignDetailTablet - Exclusivo para TABLET (md a lg)
 * - Layout optimizado para pantallas medianas
 * - Usa los estilos consistentes de CampaignView
 * - Solo se muestra en md: y se oculta en lg:
 */
export default function CampaignDetailTablet({ campaign: initialCampaign, userRole, onBack }) {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('notes')
  const [campaign, setCampaign] = useState(initialCampaign)
  const [playerName, setPlayerName] = useState(null)

  const isGM = userRole === 'GM'
  const tabs = buildTabs(isGM)

  useEffect(() => { setCampaign(initialCampaign) }, [initialCampaign])

  useEffect(() => {
    if (!isGM && initialCampaign?.id) {
      const savedPlayerName = localStorage.getItem(`campaign_${initialCampaign.id}_player_name`)
      if (savedPlayerName) setPlayerName(savedPlayerName)
    }
  }, [initialCampaign?.id, isGM])

  return (
    <div className="hidden md:flex lg:hidden h-full w-full flex-col bg-transparent overflow-hidden border-l border-white/5">

      {/* ── Floating Sub-Tabs Bar (Modern & Centered) ── */}
      <div className="flex-shrink-0 z-10 w-full px-4 py-4 mt-2 flex justify-center">
        <div className="relative flex items-center justify-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {tabs.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
                    layoutId="tabletActiveCampaignTab"
                    className="absolute inset-0 bg-gradient-to-r from-[rgba(217,83,30,0.8)] to-[#c9873c] rounded-xl shadow-[0_0_15px_rgba(217,83,30,0.4)] border border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.Icon size={18} className={active ? 'text-white drop-shadow-md' : 'text-fantasy-gold/50'} />
                  <span className="tracking-wide">{tab.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <main className="flex-1 overflow-hidden p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            <div className="h-full overflow-y-auto no-scrollbar rounded-xl bg-black/40 border border-white/5 p-4 shadow-inner">
              {activeTab === 'notes' && <NotesTab campaignId={campaign?.id} />}
              {activeTab === 'characters' && <CharactersTab campaignId={campaign?.id} isGM={isGM} user={user} />}
              {activeTab === 'dice' && (
                <div className="h-full flex flex-col">
                  <DiceBoxRollerResponsive />
                </div>
              )}
              {activeTab === 'npcs' && <NpcsTab campaignId={campaign?.id} isGM={isGM} />}
              {activeTab === 'assistant' && <AssistantTab campaignId={campaign?.id} />}
              {activeTab === 'ocr' && <OCRTab />}
              {activeTab === 'members' && <MembersTab campaignId={campaign?.id} />}
              {activeTab === 'settings' && (
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
      </main>
    </div>
  )
}
