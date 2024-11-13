const cacheName = 'cv-pwa-v1';
const filesToCache = [
    '/',
    'index.html',
    'styles.css',
    'manifest.json',
    'firebase-messaging-sw.js',
    'main.js',
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
    'js/indexdb.js',
    'js/main.js'
];

// Install event - cache semua resource
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Opening cache and adding files...');
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

// Activate event - hapus cache lama jika ada perubahan
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== cacheName) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim(); 
});

// Fetch event - serve dari cache, fallback ke index.html jika offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Jika request ada di cache, gunakan cache
            if (response) return response;
            return fetch(event.request).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
