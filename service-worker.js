diff --git a/service-worker.js b/service-worker.js
index 6f862ba2f6a09d831e7a0db983b1908ad3f082fe..c30fa423e21aa2676dcde8ca001c3b53184f4b14 100644
--- a/service-worker.js
+++ b/service-worker.js
@@ -1,27 +1,27 @@
 // ============================================================
-//  Le Grimoire Culinaire — Service Worker PWA v5
+//  Cook Note — Service Worker PWA v5
 //  Cache-first pour assets statiques
 //  Network-first pour les images externes (Unsplash, CDN)
 // ============================================================
 
 const CACHE_NAME = 'grimoire-v5';
 const STATIC_ASSETS = [
   '/',
   '/index.html',
   '/style.css',
   '/app.js',
   '/recipes.js',
   '/recipe.html',
   '/recipe.js',
   '/manifest.json',
   '/favicon.png',
 ];
 
 // ── Installation ─────────────────────────────────────────────
 self.addEventListener('install', (event) => {
   event.waitUntil(
     caches.open(CACHE_NAME)
       .then(cache => Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url))))
       .then(() => {
         console.log('[SW v5] Assets statiques mis en cache.');
       })
