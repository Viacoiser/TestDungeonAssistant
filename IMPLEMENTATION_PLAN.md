# Orden de Implementación - DungeonAssistant

## ✅ FASE 1: SETUP BASE (Completado)

- [x] Estructura de carpetas frontend y backend
- [x] package.json + requirements.txt
- [x] Pydantic schemas
- [x] Main.py con FastAPI base + Socket.io
- [x] Zustand stores (auth, campaign, character, socket)
- [x] API service con axios
- [x] Socket.io client service
- [x] Web Speech API wrapper
- [x] Tailwind + Vite config
- [x] Páginas base (Login, Register, Dashboard)
- [x] Componentes base (Sidebar, BottomNav)

## 📋 FASE 2: SUPABASE & AUTENTICACIÓN

### Backend
- [ ] Conectar a Supabase
- [ ] Implementar auth router (register, login, logout)
- [ ] JWT validation middleware
- [ ] Role de usuario (sin rol global, por campaña)

### Frontend
- [ ] Login page funcional
- [ ] Register page funcional
- [ ] Token storage en localStorage
- [ ] Auth middleware en react-router
- [ ] Useeffect para recuperar usuario en reload

### BD
- [ ] Crear tabla `users`
- [ ] Configurar Supabase Auth
- [ ] RLS policies básicas

---

## 📋 FASE 3: CRUD CAMPAÑAS + MEMBRESÍA

### Backend
- [ ] Implementar campaigns router CRUD
- [ ] create_campaign: usuario es GM por defecto
- [ ] join_campaign: usuario elige rol (GM/PLAYER)
- [ ] get_campaign_members (con roles)
- [ ] Restricción: solo 1 GM activo por campaña

### Frontend
- [ ] Dashboard con listado de campañas
- [ ] Crear campaña (modal/form)
- [ ] Unirse a campaña (elegir rol)
- [ ] Vista de detalles de campaña
- [ ] Listar miembros de campaña
- [ ] Sincronización con Socket.io

### BD
- [ ] Crear tabla `campaigns`
- [ ] Crear tabla `campaign_members`
- [ ] RLS policies
- [ ] Index para GM único

---

## 📋 FASE 4: SISTEMA DE ROLES Y CAMBIO DE ROL

### Backend
- [ ] role_change_requests router
- [ ] Solicitar cambio de rol (PLAYER solicita)
- [ ] GM aprueba/rechaza solicitud
- [ ] Transferencia de GM (GM cede a otro)
- [ ] Socket.io: notificaciones de cambios de rol

### Frontend
- [ ] RoleRequestBadge en sidebar/navbar
- [ ] Modal para ver/gestionar solicitudes de rol
- [ ] Aprobar/Rechazar requestor
- [ ] Validación: solo 1 GM activo
- [ ] Notificaciones en tiempo real

### BD
- [ ] Crear tabla `role_change_requests`
- [ ] RLS policies

---

## 📋 FASE 5: CRUD PERSONAJES + VALIDACIÓN D&D 5E

### Backend
- [ ] dnd5e.py: wrapper de dnd5eapi.co
- [ ] validate_class() y validate_race()
- [ ] characters router CRUD
- [ ] create_character: validar against dnd5eapi.co
- [ ] update_character: solo propietario y GM

### Frontend
- [ ] CharacterSheet.jsx (visualización)
- [ ] Crear personaje (validación en vivo)
- [ ] Editar personaje (inline editing)
- [ ] Stats calculator (modificadores automáticos)
- [ ] HP bar dinámica (color según % HP)
- [ ] Colapsables: skills, spells, traits

### BD
- [ ] Crear tabla `characters`
- [ ] Crear tabla `inventories`
- [ ] RLS policies

---

## 📋 FASE 6: SESIONES EN TIEMPO REAL

### Backend
- [ ] sessions router
- [ ] create_session
- [ ] start_session (Socket.io broadcast)
- [ ] end_session (generar resumen)
- [ ] session_notes router

### Frontend
- [ ] SessionView.jsx
- [ ] Iniciar sesión (notificación a todos)
- [ ] Agregar notas en vivo
- [ ] Resumen auto-generado al terminar
- [ ] Sincronización con Socket.io

### Socket.io events
- [ ] session_started
- [ ] session_ended
- [ ] note_added
- [ ] character_updated
- [ ] inventory_updated

### BD
- [ ] Crear tabla `sessions`
- [ ] Crear tabla `session_notes`

---

## 📋 FASE 7: GENERADOR DE NPCS CON GEMINI

### Backend
- [ ] gemini.py: servicio centralizado
- [ ] generate_npc: RAG con contexto
- [ ] Recuperar últimos 5 session summaries
- [ ] Recuperar NPCs existentes
- [ ] Recuperar facciones activas

### Frontend
- [ ] NPCGenerator.jsx
- [ ] Input: prompt descriptivo
- [ ] Modal con NPC generado
- [ ] Edición de NPC antes de guardar

### BD
- [ ] Crear tabla `npcs`
- [ ] Crear tabla `factions`
- [ ] RLS: solo GM puede crear/editar

---

## 📋 FASE 8: ASISTENTE CONVERSACIONAL

### Backend
- [ ] gemini.py: chat_assistant()
- [ ] Recuperar: notas de sesiones + NPCs + inventarios + facciones
- [ ] Prompt RAG con contexto completo

### Frontend
- [ ] ChatAssistant.jsx
- [ ] Input de pregunta
- [ ] Histórico de conversación
- [ ] Fuentes consultadas (si aplica)

---

## 📋 FASE 9: OCR CON GEMINI VISION

### Backend
- [ ] gemini.py: ocr_character_sheet()
- [ ] Prompt específico para hoja oficial D&D 5e
- [ ] Parsear JSON con confianza
- [ ] Campos con low_confidence
- [ ] Campos unreadable

### Frontend
- [ ] OCRUploader.jsx
- [ ] Captura de cámara (mobile) o archivo (desktop)
- [ ] Preview de imagen
- [ ] Skeleton loading
- [ ] Formulario de revisión con sistema de semáforo
  - Verde: alta confianza
  - Amarillo ⚠️: low_confidence
  - Rojo: null o unreadable
- [ ] Validación contra dnd5eapi.co

---

## 📋 FASE 10: ENTRADA DE VOZ

### Frontend
- [ ] VoiceInput.jsx
- [ ] initSpeechRecognition (lenguaje: es-CL)
- [ ] Botón pulsante al grabar
- [ ] Transcripción visible en tiempo real
- [ ] Auto-enviar nota al terminar

### Backend
- [ ] Procesar nota de voz (igual que nota de texto)

---

## 📋 FASE 11: PWA CONFIG

- [ ] manifest.json vía vite-plugin-pwa
- [ ] Icons (192x192, 512x512)
- [ ] Service Worker automático
- [ ] Offline support
- [ ] Install button (web app)

---

## 📋 FASE 12: PULIDO UI/UX

### Mobile (< md)
- [ ] Bottom navigation fija
- [ ] Floating Action Button (+)
- [ ] Cards apiladas verticalmente
- [ ] Botones con py-4 (accesibles)
- [ ] Tipografía mobile-first

### Desktop (>= md)
- [ ] Sidebar fijo izquierda
- [ ] Grid de 2-3 columnas
- [ ] Panel lateral derecha (asistente)
- [ ] Tooltips y help texts

### General
- [ ] Paleta de colores coherente
- [ ] Iconografía (lucide-react)
- [ ] Animaciones suaves
- [ ] Loading states y skeletons
- [ ] Error handling
- [ ] Toast notifications

---

## 📋 FASE 13: TESTING & DEPLOYMENT

- [ ] Unit tests backend
- [ ] Integration tests frontend
- [ ] E2E tests con Cypress
- [ ] Deploy backend (Railway, Heroku, etc.)
- [ ] Deploy frontend (Vercel, Netlify, etc.)
- [ ] CI/CD pipeline

---

## 📊 Hitos Clave

1. ✅ Setup Base - Estructura y dependencias
2. ⏳ Fase 2-3 - Autenticación + campañas
3. ⏳ Fase 4-5 - Roles y personajes
4. ⏳ Fase 6-9 - Sesiones, IA y OCR
5. ⏳ Fase 10-13 - Voz, PWA y pulido
