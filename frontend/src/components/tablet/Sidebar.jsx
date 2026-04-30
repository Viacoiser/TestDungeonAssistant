import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import {
  Castle,
  Users,
  Dices,
  Settings,
  LogOut,
  ChevronDown,
  BookOpen,
  SmilePlus,
  Sword,
  Dice6,
  Skull,
  Sparkles,
  BarChart2,
} from 'lucide-react'

const NAV_SECTIONS = [
  {
    items: [
      { icon: Castle, label: 'Campañas', id: 'campaigns' },
      { icon: Users, label: 'Personajes', id: 'characters' },
      { icon: BarChart2, label: 'Estadísticas', id: 'stats' },
    ]
  },
  {
    title: 'Enciclopedia',
    icon: BookOpen,
    collapsible: true,
    items: [
      { icon: SmilePlus, label: 'Rasgos', id: 'traits' },
      { icon: Sword, label: 'Equipamiento y Objetos', id: 'equipment' },
      { icon: Skull, label: 'Monstruos', id: 'monsters' },
      { icon: Sparkles, label: 'Hechizos', id: 'spells' },
    ]
  },
  {
    items: [
      { icon: Dice6, label: 'Dados', id: 'dice' },
      { icon: Dices, label: 'Dice Box', id: 'dicebox' },
    ]
  },
  {
    items: [
      { icon: Settings, label: 'Ajustes', id: 'settings' },
    ]
  },
]

/**
 * ✅ Sidebar (Tablet) - Versión Tailwind pura, responsive
 * - hidden md:flex lg:hidden → Invisible en móvil y desktop, visible solo en tablet
 * - md:w-64 → 256px en tablets
 */
export default function TabletSidebar({ activeTab, setActiveTab }) {
  const [expandedSections, setExpandedSections] = useState({ 'Enciclopedia': true })

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <aside className="hidden md:flex lg:hidden md:flex-col md:w-64 sticky top-0 h-screen bg-black/60 z-40 flex-shrink-0 overflow-y-auto">
      
      {/* Logo */}
      <div
        onClick={() => setActiveTab?.('campaigns')}
        className="p-6 mb-2 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
      >
        <div className="flex flex-col leading-tight">
          <span className="font-display text-xl font-black text-fantasy-gold tracking-widest">
            DUNGEON
          </span>
          <span className="font-display italic text-lg font-semibold text-fantasy-accent ml-8 tracking-widest -mt-1.5">
            ASSISTANT
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-2 px-3 py-2">
        {NAV_SECTIONS.map((section, secIdx) => (
          <div key={secIdx} className="flex flex-col gap-1">
            
            {/* Section Header (if collapsible) */}
            {section.title && (
              <button
                onClick={() => toggleSection(section.title)}
                className="font-display font-bold text-xs uppercase flex items-center gap-2 px-4 py-2 rounded-lg text-fantasy-gold/40 hover:text-fantasy-gold/70 transition-colors duration-200 tracking-widest bg-transparent hover:bg-white/5"
              >
                {section.icon && <section.icon size={14} />}
                <span className="flex-1 text-left">{section.title}</span>
                {section.collapsible && (
                  <ChevronDown 
                    size={14}
                    className={`transition-transform duration-200 ${
                      expandedSections[section.title] ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                )}
              </button>
            )}

            {/* Section Items */}
            {(!section.collapsible || expandedSections[section.title]) && (
              <div className={`flex flex-col gap-1 ${section.title ? 'pl-2' : ''}`}>
                {section.items.map((item) => {
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab?.(item.id)}
                      className={`
                        font-display font-semibold text-base
                        flex items-center gap-5 px-4 py-3 rounded-2xl
                        relative transition-all duration-300 tracking-widest
                        group
                        ${
                          isActive
                            ? 'bg-fantasy-accent/12 text-fantasy-accent'
                            : 'text-fantasy-gold/55 hover:text-fantasy-gold hover:bg-white/4'
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 w-1 h-6 bg-fantasy-accent rounded-r-md" />
                      )}
                      
                      <item.icon 
                        size={20}
                        className={`flex-shrink-0 ${
                          isActive ? 'drop-shadow-[0_0_6px_rgba(217,83,30,0.4)]' : 'group-hover:text-fantasy-gold/70'
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-3 font-display">
        <TabletSidebarLogoutButton />
      </div>
    </aside>
  )
}

function TabletSidebarLogoutButton() {
  const navigate = useNavigate()
  const { logout, setToken, setUser } = useAuthStore()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setToken(null)
    setUser(null)
    logout()
    navigate('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="
        w-full flex items-center gap-4 px-4 py-3
        rounded-2xl font-bold text-sm
        text-red-400/70 hover:text-red-300 hover:bg-red-500/10
        transition-all duration-200 tracking-widest
      "
    >
      <LogOut size={20} />
      <span>Cerrar Sesión</span>
    </button>
  )
}
