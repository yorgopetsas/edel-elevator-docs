/* ==========================================================================
   EDEL Elevator Controller Documentation — Service Worker (Offline PWA)
   Provides 100% offline availability for elevator shafts, machine rooms & field sites.
   ========================================================================== */

const CACHE_NAME = 'edel-docs-v1.0.1';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data_es.js',
  './encyclopedia.js',
  './interactive_tools.js',
  './configurator_portal.js',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './images/system_block_diagram.jpg',
  './images/can_bus_network.jpg',
  './images/can_message_flow.jpg',
  './images/elevator_anatomy_zones.jpg',
  './images/safety_chain_diagram.jpg',
  './images/power_circuits_schematic.jpg',
  './images/pcb_k2_64278_layout.png',
  './images/pcb_k2_64278_schematic.png',
  './images/pcb_k2_64290_layout.png',
  './images/pcb_k2_64291_layout.png',
  './images/pcb_k2_64280_layout.png',
  './images/pcb_k2_64281_layout.png',
  './images/pcb_k2_64296_layout.png',
  './images/pcb_k2_64299_layout.png',
  './images/pcb_k2_consola_top.jpg'
];

// --- INSTALL EVENT: Pre-cache all core documentation assets ---
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[SW] Pre-caching core EDEL documentation assets...');
      for (const asset of PRECACHE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[SW] Could not pre-cache asset:', asset, err);
        }
      }
      console.log('[SW] Pre-caching complete. Portal is ready for 100% offline use.');
    })
  );
});

// --- ACTIVATE EVENT: Clean up stale caches and claim clients immediately ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// --- FETCH EVENT: Stale-While-Revalidate with full offline fallback ---
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback for navigation: return cached index.html
          return caches.match('./index.html').then((cached) => cached || caches.match('./'));
        })
    );
    return;
  }

  // 2. Same-origin assets: Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Fetch from network in background to update cache
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failure is expected when offline in elevator shaft/pit
            return null;
          });

        // Return cached version immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Third-party font assets (Google Fonts, etc.)
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }).catch(() => null);
      })
    );
    return;
  }
});

// --- MESSAGE LISTENER: Support skipWaiting for instant client updates ---
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
