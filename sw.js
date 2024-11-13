const cacheName = 'cv-pwa';
const filesToCache = [
    '/',
    'index.html',
    'manifest.json',
    'notifikasi.js',
    'styles.css',
    'sw.js',
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
  

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});
