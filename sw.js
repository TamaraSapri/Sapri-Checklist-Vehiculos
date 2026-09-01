const CACHE='sapri-control-v5';
const ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',event=>{
  event.respondWith(
    fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html')))
  );
});
