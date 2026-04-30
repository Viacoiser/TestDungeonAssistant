import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import {
  Castle,
  Users,
  BookOpen,
  Settings,
  LogOut,
  ChevronUp,
  SmilePlus,
  Sword,
  Skull,
  Sparkles,
  Dice6,
  Dices,
  BarChart2,
} from 'lucide-react'

const NAV_ITEMS = [
  { icon: Castle, label: 'Campañas', id: 'campaigns' },
  { icon: Users, label: 'Personajes', id: 'characters' },
  { icon: BarChart2, label: 'Stats', id: 'stats' },
  { icon: BookOpen, label: 'Enciclopedia', id: 'encyclopedia', isMenu: true },
]

const ENCYCLOPEDIA_ITEMS = [
  { label: 'Rasgos', id: 'traits', icon: SmilePlus },
  { label: 'Equipamiento', id: 'equipment', icon: Sword },
  { label: 'Monstruos', id: 'monsters', icon: Skull },
  { label: 'Hechizos', id: 'spells', icon: Sparkles },
  { label: 'Dados', id: 'dice', icon: Dice6 },
  { label: 'Dice 3D', id: 'dicebox', icon: Dices },
]

/**
 * ✅ BottomNavResponsive - Versión mejorada para móvil
 * - md:hidden → Invisible en tablet+, visible en móvil
 * - Colores consistentes con SidebarResponsive
 * - Iconos en encyclopedias
 * - Incluye espaciador para no ocultar contenido
 */
export default function BottomNavResponsive({ activeTab, setActiveTab }) {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const [showEncyclopedia, setShowEncyclopedia] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNavClick = (id) => {
    if (id === 'encyclopedia') {
      setShowEncyclopedia(!showEncyclopedia)
    } else {
      setActiveTab(id)
      setShowEncyclopedia(false)
    }
  }

  const handleEncyclopediaSelect = (id) => {
    setActiveTab(id)
    setShowEncyclopedia(false)
  }

  return (
    <>
      {/* ✅ Navigation Bar - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-md border-t border-white/10 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id || (item.isMenu && showEncyclopedia)
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-lg
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'text-fantasy-accent scale-105'
                      : 'text-gray-400 hover:text-fantasy-gold/70 hover:scale-100'
                  }
                `}
              >
                <item.icon 
                  size={22}
                  className={isActive ? 'drop-shadow-[0_0_4px_rgba(217,83,30,0.3)]' : ''}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-400/70 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={22} />
            <span className="text-xs font-medium">Salir</span>
          </button>
        </div>
      </nav>

      {/* ✅ Encyclopedia Menu - Mobile Only */}
      {showEncyclopedia && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 bg-gradient-to-t from-black/95 to-black/80 backdrop-blur-md border-t border-white/10 z-40 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 p-3">
            {ENCYCLOPEDIA_ITEMS.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleEncyclopediaSelect(item.id)}
                  className={`
                    flex flex-col items-center gap-2 px-3 py-3 rounded-lg
                    text-xs font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-fantasy-accent/15 text-fantasy-accent border border-fantasy-accent/30'
                        : 'bg-white/5 text-fantasy-gold/60 border border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ✅ Spacer - Prevents content from hiding under BottomNav */}
      <div className="md:hidden h-20" />
    </>
  )
}
