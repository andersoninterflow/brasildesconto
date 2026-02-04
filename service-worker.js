/* ============================================
   BRASIL DESCONTO - Service Worker
   Cache First + Network Fallback
   ============================================ */

const CACHE_NAME = 'brasil-desconto-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/assets/css/app.css',
  '/assets/css/admin.css',
  '/assets/js/app.js',
  '/assets/js/pwa.js',
  '/assets/js/admin.js',
  '/assets/img/logo-oficial.svg'
];

// Install: pré-cachear recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Erro ao cachear:', error);
      })
  );
  
  self.skipWaiting();
});

// Activate: limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  
  self.clients.claim();
});

// Fetch: Cache First, Network Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Não cachear data/*.json (sempre fresh)
  if (url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }
  
  // Cache First para outros recursos
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(request)
          .then((response) => {
            // Validar resposta
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar resposta
            const responseToCache = response.clone();
            
            // Adicionar ao cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Fallback offline
            if (request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            return null;
          });
      })
  );
});

// Message: atualizar cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker registrado');
