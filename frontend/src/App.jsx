import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { useEffect, useState } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { initSocket } from './services/socket'
import { getAuthAPI } from './services/api'

function App() {
  const { setUser, setToken, token } = useAuthStore()
  const [isHydrating, setIsHydrating] = useState(true)

  useEffect(() => {
    /**
     * Auto-login: Restaurar sesión desde localStorage
     * Se ejecuta una sola vez al montar la app
     */
    const restoreSession = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token')
        
        if (storedToken) {
          // Validar token con backend
          const authAPI = getAuthAPI()
          try {
            const response = await authAPI.get('/auth/me')
            const userData = response.data

            // Restaurar estado de Zustand
            setToken(storedToken)
            setUser(userData)

            // Inicializar Socket.io con usuario autenticado
            initSocket()
          } catch (error) {
            // Token inválido o expirado
            console.log('Token inválido, limpiando sesión')
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
          }
        }
      } catch (error) {
        console.error('Error restaurando sesión:', error)
      } finally {
        setIsHydrating(false)
      }
    }

    restoreSession()
  }, [setUser, setToken])

  // Mostrar pantalla de carga mientras se restaura la sesión y valida el token
  if (isHydrating) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-purple-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando DungeonAssistant...</p>
        </div>
      </div>
    )
  }

  return <RouterProvider router={router} />
}

export default App
