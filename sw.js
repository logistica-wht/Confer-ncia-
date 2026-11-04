// Service worker do Portal Wheaton + Conferencia Digital.
// Estrategia: rede primeiro (sempre a versao mais nova do site) e,
// se estiver sem internet, usa a ultima copia guardada.
const CACHE = 'wheaton-v6';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;           // Supabase e CDNs: direto da rede
  e.respondWith(
    fetch(req, { cache: 'no-store' })
      .then(res => {
        if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(ch => ch.put(req, c)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
  );
});
