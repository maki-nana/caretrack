// CareTrack Service Worker v3 - Network-first, no stale cache
const CACHE = 'caretrack-v3';

// Install: skip waiting immediately
self.addEventListener('install', () => self.skipWaiting());

// Activate: delete ALL old caches, claim clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: always try network first, only cache as fallback
self.addEventListener('fetch', e => {
  // Skip non-GET requests
  if (e.request.method !== 'GET') return;
  
  // Skip Google API calls
  if (e.request.url.includes('googleapis.com') || 
      e.request.url.includes('accounts.google.com') ||
      e.request.url.includes('gstatic.com')) return;

  e.respondWith(
    fetch(e.request)
      .then(resp => {
        // Cache successful responses
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      })
      .catch(() => {
        // Only use cache when truly offline
        return caches.match(e.request);
      })
  );
});