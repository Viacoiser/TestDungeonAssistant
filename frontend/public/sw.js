/**
 * Service Worker para DungeonAssistant
 * Proporciona funcionalidad offline básica y caching
 */

const CACHE_NAME = 'dungeon-assistant-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
]

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {
        // Ignorar errores si no se pueden cachear todos los archivos
        console.log('Algunos archivos no pudieron ser cacheados')
      })
    })
  )
  self.skipWaiting()
})

// Activar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Interceptar requests y servir desde cache
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // No cachear requests a API
  if (event.request.url.includes('/api') || event.request.url.includes('localhost:8000')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      return fetch(event.request).then((response) => {
        // No cachear si no es una respuesta válida
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Cachear respuesta válida
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})
