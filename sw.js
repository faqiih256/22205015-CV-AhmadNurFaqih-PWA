var cacheName = 'cv-pwa';
var filesToCache = [
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
