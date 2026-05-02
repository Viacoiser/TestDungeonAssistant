# ✅ Checklist - Verificación de Sistema

## 1. Verificación de Instalación

- [ ] `npm run build` compila sin errores
- [ ] No hay mensajes de "module not found"
- [ ] Todos los archivos están creados:
  - [ ] `/src/services/encyclopediaService.js`
  - [ ] `/src/hooks/useSyncStatus.js`
  - [ ] `/src/components/EncyclopediaSyncBadge.jsx`
  - [ ] `/src/components/EncyclopediaSyncStatus.jsx`

## 2. Verificación en Consola del Navegador

Abre DevTools → Console y verifica que veas mensajes como:

- [ ] `"✅ Inicializando enciclopedia..."`
- [ ] `"✅ Cache cargado (...)"`  O  `"🔄 Descargando datos de API..."`
- [ ] NO deben haber errores en rojo

Si todo funciona, verás algo como:
```
✅ Inicializando enciclopedia...
✅ Cache cargado (5 minutos de antigüedad)
```

O en primera visita:
```
✅ Inicializando enciclopedia...
🔄 Descargando datos de API...
✅ API descargada: 450 hechizos, 360 monstruos, 200 items...
💾 Cache guardado en localStorage
```

## 3. Verificación de localStorage

Abre DevTools → Application → Storage → Local Storage:

- [ ] Existe entrada `encyclopedia_cache`
- [ ] Contiene datos JSON con estructura:
```json
{
  "data": {
    "spells": [...],
    "monsters": [...],
    "equipment": [...]
  },
  "version": "1.0",
  "timestamp": 1704067200000
}
```

## 4. Verificación de Funcionalidad

### Componente Badge
Si integraste `EncyclopediaSyncBadge`:
- [ ] Muestra indicador visual (spinner, checkmark, etc.)
- [ ] Botón de refresh es clickeable
- [ ] Muestra "Cache local (Xm)" después de cargar

### Componente Modal
Si integraste `EncyclopediaSyncStatus`:
- [ ] Modal abre al hacer click en botón
- [ ] Muestra cantidad de items por categoría
- [ ] Botón "Forzar Sincronización" funciona
- [ ] Botón "Limpiar Cache" limpia y recarga

## 5. Verificación de Datos

Ejecuta en consola:

```javascript
// Ver cantidad de items
console.log(encyclopediaService.getCategory('spells').length)   // Debe ser > 0
console.log(encyclopediaService.getCategory('monsters').length)  // Debe ser > 0
console.log(encyclopediaService.getCategory('equipment').length) // Debe ser > 0

// Ver estado
console.log(encyclopediaService.getSyncStatus())
// Debe retornar: { syncing: false, isCached: true, lastSyncTime: ..., ... }
```

## 6. Verificación de Sincronización

- [ ] **Primer acceso**: Toma 2-3 segundos en descargar
- [ ] **Accesos siguientes**: Carga en <100ms desde localStorage
- [ ] **Botón de refresh**: Descarga nuevamente desde API
- [ ] **Después de 7 días**: Cache se invalida automáticamente

## 7. Verificación de API

La app debe conectarse a: `https://www.dnd5eapi.co/api`

Para verificar:
```javascript
// En consola, prueba una llamada
fetch('https://www.dnd5eapi.co/api/spells')
  .then(r => r.json())
  .then(d => console.log('✅ API accesible:', d.results.length, 'items'))
  .catch(e => console.error('❌ API no accesible:', e))
```

- [ ] Retorna datos exitosamente
- [ ] NO muestra errores de CORS

## 8. Verificación de Componentes de Enciclopedia

Si usas componentes como `SpellsReference`:

- [ ] Componente carga sin errores
- [ ] Muestra datos (spells, monsters, equipment)
- [ ] Search/filter funciona instantáneamente
- [ ] Sin llamadas HTTP (todo client-side)

Verifica en DevTools → Network:
- [ ] NO debe haber peticiones GET a `/api/` (o las antiguas eliminadas)
- [ ] Solo peticiones a `dnd5eapi.co` en background

## 9. Verificación de Offline

1. Desconecta Internet (o simula offline en DevTools)
2. Recarga la página
3. [ ] Los datos siguen siendo accesibles desde localStorage
4. [ ] Badge muestra "Cache local"
5. [ ] Componentes funcionan normalmente

## 10. Verificación de Límpieza

```javascript
// En consola, ejecuta:
encyclopediaService.clearCache()
```

- [ ] localStorage se limpia
- [ ] Página recarga
- [ ] Intenta descargar de nuevo desde API
- [ ] O muestra fallback compilado si no hay conexión

---

## 🎯 Estado General

**Todo está funcionando si:**

✅ Console muestra logs de carga exitosa
✅ localStorage tiene datos guardados
✅ Componentes muestran datos sin errores
✅ Búsqueda es instantánea
✅ Badge muestra estado
✅ Offline sigue funcionando
✅ Build compila sin errores

**Problema potencial si:**

❌ Console muestra errores en rojo
❌ NO aparece entrada en localStorage
❌ Componentes muestran "sin datos"
❌ API call en Network panel NO aparece (debería aparecer)
❌ Badge dice "Sin datos aún" permanentemente

---

## 🆘 Si Algo No Funciona

### Paso 1: Revisa Console
```
¿Ves mensajes de error? → Revisa qué dice el error
¿Ves mensajes de API? → OK, está intentando descargar
¿No ves nada? → Revisa que los console.log estén activos
```

### Paso 2: Revisa Network
1. Abre DevTools → Network
2. Recarga la página
3. Busca "dnd5eapi.co"
4. ¿Aparece? → Excelente
5. ¿NO aparece? → Revisa que API esté disponible

### Paso 3: Revisa localStorage
1. DevTools → Application
2. Local Storage → dominio
3. Busca `encyclopedia_cache`
4. ¿Existe? → Haz click para ver contenido
5. ¿NO existe? → Aún no se ha sincronizado

### Paso 4: Prueba Forzar Sync
En consola:
```javascript
encyclopediaService.forceSync()
  .then(() => console.log('✅ Sincronización completada'))
  .catch(e => console.error('❌ Error:', e))
```

¿Funciona? → El sistema está OK, solo necesita tiempo
¿Error? → Revisa el mensaje de error

---

## 📞 Información para Support

Si necesitas ayuda, proporciona:
1. Output de consola (copy-paste)
2. Screenshot de Network tab
3. Screenshot de localStorage
4. ¿Qué navegador y versión?
5. ¿Qué errores exactos ves?

---

**Última verificación**: El build debe compilar sin errores ✅

`npm run build` → Si termina con "✓ built in Xs" → ¡Todo bien!
