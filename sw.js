/* Kaxi POS Service Worker */
const CACHE_VERSION = 'kaxi-pos-v2.1.2';
const ASSETS = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache=> cache.addAll(ASSETS)).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=> k !== CACHE_VERSION).map(k=> caches.delete(k)))
    ).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (event)=>{
  const req = event.request;
  if(req.method !== 'GET') return;
  // network-first for html to catch updates quickly, cache-first for the rest
  if(req.mode === 'navigate' || req.destination === 'document'){
    event.respondWith(
      fetch(req).then(res=>{
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then(cache=> cache.put(req, resClone));
        return res;
      }).catch(()=> caches.match(req).then(r=> r || caches.match('./index.html')))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(res=>{
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then(cache=> cache.put(req, resClone));
        return res;
      }).catch(()=> cached);
    })
  );
});

self.addEventListener('message', (event)=>{
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});
