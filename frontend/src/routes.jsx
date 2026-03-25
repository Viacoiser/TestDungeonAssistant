import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

/**
 * Router Configuration
 * Define todas las rutas de la aplicación
 * Rutas públicas: /login, /
 * Rutas protegidas: /dashboard
 * 
 * Habilitamos v7_startTransition para preparar para React Router v7
 * que envolverá las actualizaciones de estado en React.startTransition
 */
const router = createBrowserRouter(
  [
    // Ruta raíz - Welcome page (pantalla de bienvenida)
    {
      path: '/',
      element: <Welcome />,
    },

    // Rutas públicas (desautenticadas)
    {
      path: '/login',
      element: <Login />,
    },

    // Rutas protegidas (requieren autenticación)
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },

    // Ruta 404 - capturar todas las rutas no definidas → llevar a Welcome
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
)

export default router
