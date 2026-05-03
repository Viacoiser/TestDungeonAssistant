import { Castle, Users, BookOpen, Settings, LogOut, ChevronUp } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NAV_ITEMS = [
  { icon: Castle, label: 'Campañas', id: 'campaigns' },
  { icon: Users, label: 'Personajes', id: 'characters' },
  { icon: BookOpen, label: 'Enciclopedia', id: 'encyclopedia', isMenu: true },
  { icon: Settings, label: 'Ajustes', id: 'settings' },
]

const ENCYCLOPEDIA_ITEMS = [
  { label: 'Rasgos', id: 'traits' },
  { label: 'Equipamiento', id: 'equipment' },
  { label: 'Monstruos', id: 'monsters' },
  { label: 'Hechizos', id: 'spells' },
  { label: 'Dice 3D', id: 'dicebox' },
]

export default function BottomNav({ activeTab, setActiveTab }) {
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
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-md border-t border-white/10 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                (activeTab === item.id || (item.isMenu && showEncyclopedia))
                  ? 'text-orange-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={22} />
            <span className="text-xs font-medium">Salir</span>
          </button>
        </div>
      </nav>

      {/* Encyclopedia Menu */}
      {showEncyclopedia && (
        <div className="fixed bottom-16 left-0 right-0 lg:hidden bg-gradient-to-t from-black/95 to-black/80 backdrop-blur-md border-t border-white/10 z-40">
          <div className="grid grid-cols-2 gap-2 p-3">
            {ENCYCLOPEDIA_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleEncyclopediaSelect(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-500/30 text-orange-400 border border-orange-500'
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
