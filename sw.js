const CACHE_NAME = 'bloomummy-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/styles/main.css',
  '/assets/images/photo.jpg',
  '/assets/images/clothes1.jpg',
  '/assets/images/clothes2.webp',
  '/assets/images/clothes3.jpg',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/hoodie.html',
  '/pages/shorts.html',
  '/pages/zip.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});