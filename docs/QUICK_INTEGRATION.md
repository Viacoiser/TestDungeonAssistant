# ⚡ Integración Rápida - Copiar y Pegar

## 1️⃣ Badge en Header (30 segundos)

Encuentra tu archivo de header/navbar y agrega esto:

```jsx
import EncyclopediaSyncBadge from '@/components/EncyclopediaSyncBadge'

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <div>Logo aquí</div>
      <EncyclopediaSyncBadge />  {/* ← Agrega esta línea */}
    </header>
  )
}
```

**Resultado**: Pequeño badge que muestra estado de sincronización con botón de refresh.

---

## 2️⃣ Modal Completo (60 segundos)

En la página de Enciclopedia o Settings:

```jsx
import { useState } from 'react'
import EncyclopediaSyncStatus from '@/components/EncyclopediaSyncStatus'

export default function EncyclopediaPage() {
  const [showSync, setShowSync] = useState(false)

  return (
    <>
      {/* Botón para abrir modal */}
      <button onClick={() => setShowSync(true)}>
        📊 Ver Estado de Enciclopedia
      </button>

      {/* Modal */}
      <EncyclopediaSyncStatus 
        isOpen={showSync}
        onClose={() => setShowSync(false)}
      />
    </>
  )
}
```

**Resultado**: Modal con estadísticas completas, botones de control.

---

## 3️⃣ Hook para Lógica Personalizada

Si necesitas acceso a los datos de sincronización:

```jsx
import { useSyncStatus } from '@/hooks/useSyncStatus'

function MyComponent() {
  const { syncing, isCached, minutesAgo, forceSync } = useSyncStatus()

  return (
    <div>
      {syncing && <p>⏳ Sincronizando...</p>}
      {isCached && <p>💾 Datos de hace {minutesAgo} minutos</p>}
      
      <button onClick={forceSync} disabled={syncing}>
        Actualizar Ahora
      </button>
    </div>
  )
}
```

---

## 4️⃣ Monitoreo en Consola

Ejecuta en DevTools → Console:

```javascript
// Ver estado actual
encyclopediaService.getSyncStatus()

// Forzar actualización
encyclopediaService.forceSync()

// Ver datos
console.log(encyclopediaService.getCategory('spells'))

// Limpiar cache
encyclopediaService.clearCache()
```

---

## 5️⃣ Ejemplo Completo Integrado

Ver archivo: `EncyclopediaReferenceExample.jsx`

Copia y adapta según necesites.

---

## 🎨 Personalizar Estilos

### Badge
Edita `/src/components/EncyclopediaSyncBadge.jsx`:
```jsx
<div className="flex items-center gap-2 px-3 py-2 ...">
  {/* Modifica los estilos aquí */}
</div>
```

### Modal
Edita `/src/components/EncyclopediaSyncStatus.jsx`:
```jsx
<div className="fixed inset-0 bg-black/50 ...">
  {/* Modifica los estilos aquí */}
</div>
```

---

## ✅ Verificación

Después de agregar los componentes:

1. ✅ Run: `npm run build`
2. ✅ Debe compilar sin errores
3. ✅ Abre la app
4. ✅ Debe haber indicador de sincronización
5. ✅ Abre Console → debe decir "✅ Cache cargado" o "🔄 Descargando datos"

---

## 🚀 Listo

¡Ya está! Los componentes se integran automáticamente. El servicio funciona en background sin que tengas que hacer nada más.

Si los componentes no son suficientes, puedes:
- Editar `encyclopediaService.js` directamente
- Crear tus propios componentes usando `useSyncStatus()`
- Agregar lógica en tu app donde necesites

Cualquier duda, revisa los archivos de documentación.
