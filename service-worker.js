const cacheName = 'pwa-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/Grid_Images/R1.png'
  '/Grid_Images/B1.png'
  '/Grid_Images/G1.png'
  '/Grid_Images/Y1.png'
  '/Grid_Images/P1.png'
  '/Grid_Images/RB1.png'
  '/Grid_Images/Empty.png'
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event: Cache assets for offline use
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
  );
});

// Activate event: Clean up old caches if necessary
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event: Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
