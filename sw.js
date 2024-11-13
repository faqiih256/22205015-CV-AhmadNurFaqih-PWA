const CACHE_NAME = 'cv-pwa';
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'manifest.json',
    'firebase-messaging-sw.js',
    'main.js',
    'images/Fakih.jpeg',
    'images/Logo_CV_128.png',
    'images/Logo_CV_144.png',
    'images/Logo_CV_152.png',
    'images/Logo_CV_192.png',
    'images/Logo_CV_256.png',
    'images/Logo_CV_512.png',
    'images/Logo_CV.png',
    'images/Lonceng.png',
    'js/indexdb.js',
    'js/main.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch cached assets
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});

// Activate new cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((CACHE_NAME) => {
            return Promise.all(
                CACHE_NAME.filter((CACHE_NAME) => {
                    return cacheName !== CACHE_NAME;
                }).map((CACHE_NAME) => caches.delete(CACHE_NAME))
            );
        })
    );
});
