import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Obtener instancia de axios para hacer llamadas raw
 * Útil para operaciones como validación de token en App.jsx
 */
export const getAuthAPI = () => api

// Auth
export const authAPI = {
  register: (email, password, username) =>
    api.post('/auth/register', { email, password, username }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
}

// Campaigns
export const campaignAPI = {
  create: (name, description) =>
    api.post('/campaigns', { name, description }),
  list: () => api.get('/campaigns'),
  getDetail: (campaignId) =>
    api.get(`/campaigns/${campaignId}`),
  join: (campaignId, role) =>
    api.post(`/campaigns/${campaignId}/join`, { role }),
  getMembers: (campaignId) =>
    api.get(`/campaigns/${campaignId}/members`),
}

// Characters
export const characterAPI = {
  create: (data) => api.post('/characters', data),
  list: (campaignId) =>
    api.get(`/characters?campaign_id=${campaignId}`),
  getDetail: (characterId) =>
    api.get(`/characters/${characterId}`),
  update: (characterId, data) =>
    api.put(`/characters/${characterId}`, data),
}

// Sessions
export const sessionAPI = {
  create: (campaignId, sessionNumber, title) =>
    api.post('/sessions', { campaign_id: campaignId, session_number: sessionNumber, title }),
  start: (sessionId) =>
    api.post(`/sessions/${sessionId}/start`),
  end: (sessionId) =>
    api.post(`/sessions/${sessionId}/end`),
  addNote: (sessionId, content) =>
    api.post(`/sessions/${sessionId}/notes`, { content }),
  getNotes: (sessionId) =>
    api.get(`/sessions/${sessionId}/notes`),
}

// NPCs
export const npcAPI = {
  list: (campaignId) =>
    api.get(`/campaigns/${campaignId}/npcs`),
  generate: (campaignId, prompt) =>
    api.post(`/campaigns/${campaignId}/npcs`, { prompt }),
}

// Assistant
export const assistantAPI = {
  chat: (campaignId, question) =>
    api.post('/assistant/chat', { campaign_id: campaignId, question }),
}

// Vision / OCR
export const visionAPI = {
  digitize: (campaignId, imageUrl) =>
    api.post('/vision/digitize', { campaign_id: campaignId, image_url: imageUrl }),
}

export default api
