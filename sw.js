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

// Install event: cache semua file yang diperlukan
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('Caching all resources');
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting(); // Memastikan service worker langsung aktif setelah instalasi
});

// Activate event: hapus cache lama jika ada pembaruan
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(name) {
                    if (name !== cacheName) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Memastikan service worker langsung aktif di semua tab
});

// Fetch event: fallback ke cache jika offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(fetchResponse => {
                // Jika berhasil mengambil dari jaringan, tambahkan ke cache
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }).catch(() => {
                // Fallback ke halaman utama jika offline
                if (event.request.mode === 'navigate') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
