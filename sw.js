// Service worker: guarda só os arquivos estáticos. Dados do Supabase NUNCA são cacheados.
const VERSAO = "wheaton-v2";
const ARQUIVOS = ["./", "./index.html", "./conferente.html", "./config.js",
  "./manifest.webmanifest", "./conferente.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return; // Supabase/CDNs: direto na rede
  // rede primeiro (sempre a versão mais nova), cache como reserva offline
  e.respondWith(fetch(req).then(r => {
    const copia = r.clone();
    caches.open(VERSAO).then(c => c.put(req, copia));
    return r;
  }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
});
