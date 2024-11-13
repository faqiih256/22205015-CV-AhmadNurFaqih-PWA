const cacheName = 'cv-pwa-v1'; // Tambahkan versi untuk mempermudah pengelolaan cache
const filesToCache = [
    '/',
    'index.html',
    'styles.css',
    'manifest.json',
    'firebase-messaging-sw.js',
    'notifikasi.js',
    'images/Desktop.png',
    'images/Fakih.jpeg',
    'images/Logo_CV_128.png',
    'images/Logo_CV_144.png',
    'images/Logo_CV_152.png',
    'images/Logo_CV_192.png',
    'images/Logo_CV_256.png',
    'images/Logo_CV_512.png',
    'images/Logo_CV.png',
    'images/Lonceng.png',
    'images/Mobile.png',
    'js/main.js',
    'js/indexdb.js'
];

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching files');
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

// Activate event: hapus cache lama
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(name) {
                    if (name !== cacheName) {
                        console.log('[Service Worker] Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event: fallback ke cache jika offline
self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).catch(() => caches.match('index.html'));
        })
    );
});
