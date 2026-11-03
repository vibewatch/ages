/* Offline support (written to dist/sw.js by the `serviceWorker` plugin in vite.config.ts, which fills in VERSION and
 * PRECACHE per build).
 * Same-origin GETs only; cross-origin requests (Wikipedia, terrain tiles, music) go straight to the network.
 * - install: the shell and every build file (all eras' model packs, workers, terrain, shapes) are fetched atomically;
 *   an incomplete install leaves the previous worker in place;
 * - the app shell and build files: cache first, so an active worker serves one consistent build;
 * - other pages under the scope: left to the network.
 * Updates wait for existing clients to close before activating and dropping the previous cache for this scope. */
const VERSION = '__VERSION__';
const PRECACHE = [/* __PRECACHE__ */];
const SCOPE = new URL(self.registration.scope);
const PREFIX = `ages:${encodeURIComponent(SCOPE.pathname)}:`;
const CACHE = `${PREFIX}${VERSION}`;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll([SCOPE.href, ...PRECACHE.map(f => new URL(f, SCOPE).href)]
      .map(u => new Request(u, { cache: 'no-cache' }))))
    .catch(async err => {
      try { await caches.delete(CACHE); } catch (cleanupErr) { console.warn('Failed to remove incomplete offline cache.', cleanupErr); }
      throw err;
    }));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// install-time copies carry no Origin header, while module scripts and CSS are fetched in CORS mode with one: a server
// that sends `Vary: Origin` (vite preview, some CDNs) would make every precached copy miss, so match on the URL alone
const match = req => caches.open(CACHE).then(c => c.match(req, { ignoreVary: true }));
const put = async (key, res) => {
  if (res.ok && res.type === 'basic') {
    try { await (await caches.open(CACHE)).put(key, res.clone()); }
    catch (err) { console.warn('Failed to update offline cache.', err); }
  }
  return res;
};

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname) || req.headers.has('range')) return;

  if (req.mode === 'navigate') {
    if (url.pathname !== SCOPE.pathname && url.pathname !== `${SCOPE.pathname}index.html`) return;
    // One shell for every query/hash deep link: the app reads its state from the URL.
    e.respondWith(match(SCOPE.href).then(hit => hit ?? fetch(req).then(res => put(SCOPE.href, res))));
    return;
  }
  e.respondWith(match(req).then(hit => hit ?? fetch(req).then(res => put(req, res))));
});
