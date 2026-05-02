// ============================================================
//  Le Grimoire Culinaire — Service Worker PWA v3
//  Cache-first pour assets statiques
//  Network-first pour les images externes (Unsplash, CDN)
// ============================================================

const CACHE_NAME = 'grimoire-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/recipes.js',
  '/manifest.json',
  '/favicon.png',
];

// ── Installation ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url))))
      .then(() => {
        console.log('[SW v3] Assets statiques mis en cache.');
      })
  );
  self.skipWaiting();
});

// ── Activation — purge des anciens caches ────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => {
      console.log('[SW v3] Anciens caches supprimés.');
    })
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignorer les requêtes vers des domaines externes (CDN React, Unsplash, etc.)
  // Elles ne doivent pas bloquer l'app hors-ligne
  if (url.origin !== self.location.origin) return;

  // Pour les assets locaux : cache-first, réseau en fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Ne mettre en cache que les réponses valides et non-opaques
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Fallback hors-ligne : retourner index.html pour la navigation SPA
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
          // Pour les autres ressources manquantes, on laisse échouer proprement
        });
    })
  );
});
