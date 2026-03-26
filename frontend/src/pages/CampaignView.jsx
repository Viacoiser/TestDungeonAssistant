import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { campaignAPI, sessionAPI, npcAPI, assistantAPI } from '../services/api'

// ============================================================================
// Iconos inline SVG para evitar dependencias extra
// ============================================================================
const Icon = {
  back: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  scroll: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  npc: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  chat: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  send: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  sword: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  magic: () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
}

// ============================================================================
// Tab: Notas de Sesión (con análisis IA)
// ============================================================================
function NotesTab({ campaignId }) {
  const [sessions, setSessions] = useState([])
  const [activeSession, setActiveSession] = useState(null)
  const [notes, setNotes] = useState([])
  const [noteText, setNoteText] = useState('')
  const [sending, setSending] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [creatingSession, setCreatingSession] = useState(false)

  useEffect(() => {
    loadSessions()
  }, [campaignId])

  const loadSessions = async () => {
    try {
      const res = await sessionAPI.listByCampaign(campaignId)
      setSessions(res.data || [])
    } catch {
      setSessions([])
    } finally {
      setLoadingSessions(false)
    }
  }

  const loadNotes = async (sessionId) => {
    try {
      const res = await sessionAPI.getNotes(sessionId)
      setNotes(res.data?.notes || [])
    } catch {
      setNotes([])
    }
  }

  const selectSession = (session) => {
    setActiveSession(session)
    setAnalysis(null)
    loadNotes(session.id)
  }

  const handleCreateSession = async () => {
    setCreatingSession(true)
    try {
      const nextNumber = (sessions.length || 0) + 1
      await sessionAPI.create(campaignId, nextNumber, `Sesión ${nextNumber}`)
      await loadSessions()
    } catch (e) {
      console.error(e)
    } finally {
      setCreatingSession(false)
    }
  }

  const handleAddNote = async () => {
    if (!noteText.trim() || !activeSession) return
    setSending(true)
    setAnalysis(null)
    try {
      const res = await sessionAPI.addNote(activeSession.id, noteText)
      const data = res.data

      setAnalysis(data.analysis)
      setNoteText('')
      await loadNotes(activeSession.id)
    } catch (e) {
      console.error('Error agregando nota:', e)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex gap-4 h-full">
      {/* Lista de sesiones */}
      <div className="w-48 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Sesiones</span>
          <button
            onClick={handleCreateSession}
            disabled={creatingSession}
            className="p-1 rounded bg-purple-600/40 hover:bg-purple-600/70 text-purple-300 transition"
            title="Nueva sesión"
          >
            <Icon.plus />
          </button>
        </div>
        {loadingSessions ? (
          <div className="text-gray-500 text-sm">Cargando...</div>
        ) : sessions.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-6">
            <div className="text-2xl mb-2">📜</div>
            <p>Sin sesiones</p>
            <button
              onClick={handleCreateSession}
              className="mt-2 text-purple-400 hover:text-purple-300 text-xs underline"
            >
              Crear Sesión 1
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map(s => (
              <button
                key={s.id}
                onClick={() => selectSession(s)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  activeSession?.id === s.id
                    ? 'bg-purple-600/60 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div className="font-medium">
                  {s.is_active && <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1" />}
                  {s.title || `Sesión ${s.session_number}`}
                </div>
                {s.summary && (
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{s.summary}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Panel de notas */}
      <div className="flex-1 flex flex-col min-h-0">
        {!activeSession ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-3">📖</div>
              <p>Selecciona una sesión para ver sus notas</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-white font-semibold">
                {activeSession.title || `Sesión ${activeSession.session_number}`}
              </h3>
              {activeSession.is_active && (
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                  En curso
                </span>
              )}
            </div>

            {/* Lista de notas */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3 min-h-0">
              {notes.length === 0 ? (
                <div className="text-gray-500 text-sm text-center py-8">
                  Sin notas en esta sesión. ¡Escribe la primera!
                </div>
              ) : (
                notes.map(note => (
                  <div key={note.id} className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
                    <p className="text-gray-200 text-sm whitespace-pre-wrap">{note.content}</p>

                    {/* Ítems detectados */}
                    {note.detected_items?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {note.detected_items.map((item, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              item.is_magical
                                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {item.is_magical && <Icon.magic />}
                            {item.item_name} {item.quantity > 1 && `×${item.quantity}`}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* NPCs detectados */}
                    {note.detected_npcs?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {note.detected_npcs.map((npc, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          >
                            👤 {npc.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(note.created_at).toLocaleString('es-CL')}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Resultado del análisis IA (flash) */}
            {analysis && (
              <div className="mb-3 bg-purple-900/30 border border-purple-500/40 rounded-lg p-3 text-sm">
                <div className="text-purple-300 font-semibold mb-1">🤖 Gemini detectó:</div>
                <div className="flex flex-wrap gap-2">
                  {analysis.detected_items.map((item, i) => (
                    <span key={i} className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs border border-amber-500/30">
                      📦 {item.item_name}
                    </span>
                  ))}
                  {analysis.detected_npcs.map((npc, i) => (
                    <span key={i} className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs border border-blue-500/30">
                      👤 {npc.name}
                    </span>
                  ))}
                  {analysis.items_count === 0 && analysis.npcs_count === 0 && (
                    <span className="text-gray-400 text-xs">Ningún ítem o NPC detectado en esta nota.</span>
                  )}
                </div>
              </div>
            )}

            {/* Input de nota */}
            <div className="flex gap-2">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Escribe la nota de sesión... Gemini detectará ítems y NPCs automáticamente."
                rows={3}
                className="flex-1 bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none"
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.ctrlKey) handleAddNote()
                }}
              />
              <button
                onClick={handleAddNote}
                disabled={sending || !noteText.trim()}
                className="px-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-lg transition flex items-center gap-1 text-sm font-medium"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Icon.send />
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Ctrl+Enter para enviar</p>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Tab: NPCs
// ============================================================================
function NpcsTab({ campaignId }) {
  const [npcs, setNpcs] = useState([])
  const [loading, setLoading] = useState(true)
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [selectedNpc, setSelectedNpc] = useState(null)

  const relationColors = {
    aliado: 'text-green-300 border-green-500/30 bg-green-500/10',
    enemigo: 'text-red-300 border-red-500/30 bg-red-500/10',
    neutral: 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10',
    desconocido: 'text-gray-300 border-gray-500/30 bg-gray-500/10',
  }

  useEffect(() => {
    loadNpcs()
  }, [campaignId])

  const loadNpcs = async () => {
    try {
      const res = await npcAPI.list(campaignId)
      setNpcs(res.data || [])
    } catch {
      setNpcs([])
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    try {
      const res = await npcAPI.generate(campaignId, prompt)
      const newNpc = res.data
      setNpcs(prev => [...prev, newNpc])
      setSelectedNpc(newNpc)
      setPrompt('')
    } catch (e) {
      console.error('Error generando NPC:', e)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex gap-4 h-full">
      {/* Lista de NPCs */}
      <div className="w-52 flex-shrink-0 flex flex-col">
        <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">NPCs de campaña</span>

        {loading ? (
          <div className="text-gray-500 text-sm">Cargando...</div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-1 mb-3">
            {npcs.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-6">
                <div className="text-2xl mb-2">🎭</div>
                <p>Sin NPCs registrados</p>
              </div>
            ) : (
              npcs.map(npc => (
                <button
                  key={npc.id}
                  onClick={() => setSelectedNpc(npc)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    selectedNpc?.id === npc.id
                      ? 'bg-purple-600/60 text-white'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{npc.is_alive ? '🟢' : '💀'}</span>
                    <span className="font-medium truncate">{npc.name}</span>
                  </div>
                  {npc.race && <div className="text-xs text-gray-400">{npc.race}</div>}
                </button>
              ))
            )}
          </div>
        )}

        {/* Generar NPC */}
        <div className="border-t border-gray-700/50 pt-3">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ej: Un mercader enano corrupto..."
            rows={3}
            className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generando...
              </>
            ) : (
              <>✨ Generar NPC</>
            )}
          </button>
        </div>
      </div>

      {/* Detalle del NPC */}
      <div className="flex-1">
        {!selectedNpc ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-3">🎭</div>
              <p>Selecciona un NPC o genera uno nuevo</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedNpc.name}</h3>
                {selectedNpc.race && (
                  <span className="text-purple-300 text-sm">{selectedNpc.race}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedNpc.generated_by_ai && (
                  <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                    ✨ IA
                  </span>
                )}
                <span className={`px-2 py-0.5 text-xs border rounded-full ${
                  relationColors[selectedNpc.relationship_to_party] || relationColors.desconocido
                }`}>
                  {selectedNpc.relationship_to_party || 'desconocido'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedNpc.personality && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Personalidad</h4>
                  <p className="text-gray-200 text-sm">{selectedNpc.personality}</p>
                </div>
              )}

              {selectedNpc.secrets && (
                <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">🔒 Secreto</h4>
                  <p className="text-gray-300 text-sm">{selectedNpc.secrets}</p>
                </div>
              )}

              {selectedNpc.stats && Object.keys(selectedNpc.stats).length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stats</h4>
                  <div className="flex gap-3">
                    {Object.entries(selectedNpc.stats).map(([key, val]) => (
                      <div key={key} className="text-center bg-gray-700/50 rounded-lg px-3 py-2">
                        <div className="text-lg font-bold text-white">{val}</div>
                        <div className="text-xs text-gray-400">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Tab: Asistente Chat (RAG)
// ============================================================================
function AssistantTab({ campaignId }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: '¡Hola! Soy el asistente de tu campaña. Pregúntame sobre NPCs, eventos pasados, el trasfondo del mundo o cualquier detalle de la campaña.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const question = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: question }])
    setLoading(true)

    try {
      const res = await assistantAPI.chat(campaignId, question)
      const { answer } = res.data

      setMessages(prev => [...prev, { role: 'assistant', text: answer }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Hubo un error al consultar el asistente. Verifica que el backend esté corriendo.',
        error: true
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-purple-600/50 border border-purple-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-1 text-sm">
                🐉
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-purple-600/70 text-white rounded-tr-sm'
                : msg.error
                  ? 'bg-red-900/30 border border-red-500/30 text-red-200 rounded-tl-sm'
                  : 'bg-gray-700/70 text-gray-100 border border-gray-600/50 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-8 h-8 rounded-full bg-purple-600/50 border border-purple-500/50 flex items-center justify-center text-sm">
              🐉
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="¿Quién es Aldric el Sombrío? ¿Qué pasó en la sesión 2?..."
          className="flex-1 bg-gray-800 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl transition"
        >
          <Icon.send />
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// CampaignView — Pantalla principal
// ============================================================================
export default function CampaignView() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('notes')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await campaignAPI.getDetail(campaignId)
        setCampaign(res.data)
      } catch {
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [campaignId])

  const tabs = [
    { id: 'notes', label: 'Notas', icon: <Icon.scroll /> },
    { id: 'npcs', label: 'NPCs', icon: <Icon.npc /> },
    { id: 'assistant', label: 'Asistente', icon: <Icon.chat /> },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-purple-300 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-black/60 border-b border-purple-500/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition"
          >
            <Icon.back />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{campaign?.name || 'Campaña'}</h1>
            {campaign?.description && (
              <p className="text-sm text-gray-400 mt-0.5 truncate max-w-xl">{campaign.description}</p>
            )}
          </div>
          <div className="text-2xl">🐉</div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex-shrink-0 bg-black/30 border-b border-gray-700/50 px-6">
        <div className="max-w-6xl mx-auto flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition border-b-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <main className="flex-1 overflow-hidden px-6 py-5">
        <div className="max-w-6xl mx-auto h-full">
          {activeTab === 'notes' && <NotesTab campaignId={campaignId} />}
          {activeTab === 'npcs' && <NpcsTab campaignId={campaignId} />}
          {activeTab === 'assistant' && <AssistantTab campaignId={campaignId} />}
        </div>
      </main>
    </div>
  )
}
