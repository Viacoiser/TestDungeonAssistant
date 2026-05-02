# 📚 Enciclopedia D&D 5e - Sistema de Sincronización

## Arquitectura Implementada

El nuevo sistema de enciclopedia funciona con la siguiente lógica:

### 🔄 Flujo de Carga (init)
1. **Intenta localStorage primero** → Carga instantánea si hay datos cacheados
2. **Inicia sincronización con API en background** → Descarga datos frescos de `dnd5eapi.co`
3. **Guarda en localStorage** → Para la siguiente carga sin esperas
4. **Fallback a datos compilados** → Si API falla y no hay cache

### ✨ Beneficios

- ✅ **Datos Actualizados**: Siempre obtiene lo más reciente de la API
- ✅ **Carga Rápida**: Usa localStorage para cargas subsecuentes (<100ms)
- ✅ **Offline**: Si no hay internet, usa cache del navegador
- ✅ **Sin Botón de Sync**: Sincroniza automáticamente en background
- ✅ **Usuario No Espera**: Muestra datos de caché mientras descarga nuevos

---

## Componentes Nuevos

### 1. Hook: `useSyncStatus`

Monitorea el estado de sincronización.

```javascript
import { useSyncStatus } from '@/hooks/useSyncStatus'

function MyComponent() {
  const { syncing, isCached, minutesAgo, forceSync } = useSyncStatus()

  return (
    <div>
      {syncing && <p>Sincronizando...</p>}
      {isCached && <p>Datos de hace {minutesAgo} minutos</p>}
      <button onClick={forceSync}>Refrescar</button>
    </div>
  )
}
```

**Propiedades devueltas:**
- `syncing: boolean` - Si está sincronizando en este momento
- `isCached: boolean` - Si usa datos del cache
- `minutesAgo: number | null` - Minutos desde última sincronización
- `forceSync(): Promise<boolean>` - Forzar sincronización inmediata
- `lastSync: number | null` - Timestamp de última sincronización
- `initialized: boolean` - Si el servicio está inicializado

---

### 2. Componente: `EncyclopediaSyncBadge`

Badge pequeño que muestra estado de sincronización. Ideal para Header o TopBar.

```javascript
import EncyclopediaSyncBadge from '@/components/EncyclopediaSyncBadge'

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1>Mi Aplicación</h1>
      <EncyclopediaSyncBadge />
    </header>
  )
}
```

**Muestra:**
- 🔄 "Sincronizando..." si está descargando
- 💾 "Cache local (5m)" si usa datos cacheados
- ⚡ "Sin datos aún" si aún no se han cargado

**Incluye:**
- Botón para forzar sincronización
- Indicador visual de estado

---

### 3. Componente: `EncyclopediaSyncStatus`

Modal completo con información detallada de sincronización.

```javascript
import { useState } from 'react'
import EncyclopediaSyncStatus from '@/components/EncyclopediaSyncStatus'

export default function SettingsPage() {
  const [showSync, setShowSync] = useState(false)

  return (
    <>
      <button onClick={() => setShowSync(true)}>
        Ver Estado de Enciclopedia
      </button>
      <EncyclopediaSyncStatus 
        isOpen={showSync} 
        onClose={() => setShowSync(false)} 
      />
    </>
  )
}
```

**Muestra:**
- Estado actual de sincronización
- Cantidad de items por categoría
- Última actualización
- Botón para forzar sincronización
- Botón para limpiar cache

---

## Modificaciones al Servicio

### `encyclopediaService.js`

**Nuevos métodos:**

```javascript
// Sincronizar manualmente con API
await encyclopediaService.syncWithAPI()

// Forzar actualización (lo mismo que syncWithAPI)
await encyclopediaService.forceSync()

// Obtener estado actual
const status = encyclopediaService.getSyncStatus()
// Retorna: { syncing, isCached, lastSyncTime, minutesAgo, initialized }

// Limpiar cache y offline data
encyclopediaService.clearCache()
```

**Métodos existentes (sin cambios):**
- `getCategory(category)` - Obtener items de una categoría
- `search(query, category)` - Buscar items
- `getItem(category, index)` - Obtener item específico
- `fuzzySearch(query, category)` - Búsqueda fuzzy

---

## Ejemplo de Integración Completa

```javascript
import React, { useState } from 'react'
import EncyclopediaSyncBadge from '@/components/EncyclopediaSyncBadge'
import EncyclopediaSyncStatus from '@/components/EncyclopediaSyncStatus'
import { useEncyclopedia } from '@/hooks/useEncyclopedia'

export default function SpellsPage() {
  const [showSyncModal, setShowSyncModal] = useState(false)
  const { data: spells = [] } = useEncyclopedia('spells')

  return (
    <div>
      {/* Header con badge de sincronización */}
      <header className="flex justify-between items-center p-4 bg-slate-900 rounded">
        <h1>🧙 Hechizos</h1>
        <div className="flex items-center gap-4">
          <EncyclopediaSyncBadge />
          <button 
            onClick={() => setShowSyncModal(true)}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Detalles
          </button>
        </div>
      </header>

      {/* Contenido */}
      <div className="p-4">
        <p>Total de hechizos: {spells.length}</p>
        {/* ... resto del contenido */}
      </div>

      {/* Modal de sincronización */}
      <EncyclopediaSyncStatus 
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
      />
    </div>
  )
}
```

---

## Cómo Funciona el Cache

### localStorage

```json
{
  "encyclopedia_cache": {
    "data": {
      "spells": [...],
      "monsters": [...],
      "equipment": [...],
      "races": [...],
      "classes": [...],
      "traits": [...]
    },
    "version": "1.0",
    "timestamp": 1704067200000
  }
}
```

**Expiración:**
- Cache válido por 7 días
- Después de 7 días, se invalida automáticamente
- Al refrescar la página, intenta actualizar desde API

---

## Flujos de Usuario

### Primer Acceso
1. Usuario abre la app
2. Muestra datos compilados mientras carga
3. encyclopediaService inicia descarga desde API en background
4. Una vez completada, muestra datos actualizados automáticamente
5. Datos se guardan en localStorage

### Accesos Subsecuentes (dentro de 7 días)
1. Usuario abre la app
2. Carga instantánea desde localStorage (<100ms)
3. Muestra "Cache local (5m)" en badge
4. encyclopediaService intenta actualizar desde API en background
5. Si hay datos nuevos, se actualizan sin recargar

### Accesos Subsecuentes (después de 7 días)
1. Cache expirado
2. encyclopediaService intenta actualizar desde API
3. Si API disponible, usa nuevos datos
4. Si API no disponible, muestra fallback compilado

### Forzar Actualización Manual
1. Usuario hace clic en botón de refresh
2. encyclopediaService descarga nuevamente desde API
3. localStorage se actualiza con nuevos datos
4. Componentes se actualizan automáticamente

---

## Variables de Entorno

Asegúrate de que el `.env` tenga:

```env
DND5E_API_BASE=https://www.dnd5eapi.co/api
```

El servicio usa `https://www.dnd5eapi.co/api` por defecto.

---

## Consideraciones de Performance

- **Primera carga:** 2-3 segundos (depende de conexión internet)
- **Recargas (con cache):** <100ms
- **Sincronización en background:** No bloquea UI
- **Tamaño de cache:** ~2-3 MB (en localStorage)

---

## Troubleshooting

### Los datos no se actualizan
1. Verifica que `dnd5eapi.co` esté disponible
2. Abre DevTools → Console
3. Ejecuta `encyclopediaService.forceSync()`
4. Revisa los logs en consola

### Cache corrupto
1. Abre DevTools → Application → localStorage
2. Elimina la entrada `encyclopedia_cache`
3. Recarga la página

### Datos vacíos
1. Revisa que `useEncyclopedia()` esté inicializado
2. Verifica logs: "✅ API descargada: X hechizos..."
3. Si no aparece, la API no está disponible

---

## API Endpoints Usados

El servicio descarga de estos endpoints:
- `https://www.dnd5eapi.co/api/races`
- `https://www.dnd5eapi.co/api/classes`
- `https://www.dnd5eapi.co/api/spells`
- `https://www.dnd5eapi.co/api/monsters`
- `https://www.dnd5eapi.co/api/equipment`

Todos son GET públicos, sin autenticación requerida.

---

## Próximas Mejoras Opcionales

- ✨ Versioning de datos (detectar si datos desactualizados)
- ✨ Delta sync (descargar solo cambios, no todo)
- ✨ Compresión de datos en localStorage
- ✨ Service Worker para offline completo
- ✨ Estadísticas de uso
