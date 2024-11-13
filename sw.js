const cacheName = 'cv-pwa';
const filesToCache = [
    '/',
    'index.html',
    'manifest.json',
    'styles.css',
    'firebase-messaging-sw.js',
    'notifikasi.js',
    'images/Desktop.png',
    'images/Fakih.jpeg',
    'images/Logo_CV.png',
    'images/Logo_CV_128.png',
    'images/Logo_CV_144.png',
    'images/Logo_CV_152.png',
    'images/Logo_CV_192.png',
    'images/Logo_CV_256.png',
    'images/Logo_CV_512.png',
    'images/Lonceng.png',
    'images/Mobile.png',
    'js/indexdb.js',
    'js/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// Activate event (cache cleanup)
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Fetch event (cache-first strategy)
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(e.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(e.request, responseToCache);
        });
        return response;
      });
    }).catch(function() {
      // Fallback to offline content
      return caches.match('/offline.html');
    })
  );
});
