/* Service worker — rend La Savane Gourmande installable et garde la coquille en cache. */
const CACHE = "savane-shell-v1";
const SHELL = ["./restaurant.html","./restaurant.css","./restaurant.js","./manifest-restaurant.json","./icons/logo-192.png","./icons/logo-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(n => Promise.all(n.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { if(r.ok && new URL(e.request.url).origin === location.origin){ const cl=r.clone(); caches.open(CACHE).then(c => c.put(e.request, cl)); } return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("./restaurant.html"))));
});
