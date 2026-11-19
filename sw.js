// 筋骨格アトラスの Service Worker: 3Dモデルと計算用の共通データ(models/data.<hash>.js)だけを保存しておき、2回目からは通信せずに使う。
// ファイル名に中身のハッシュが入っているので、名前が同じなら中身も同じ。新しい名前を保存したら古いものは消す。ページの HTML などは触らない
const CACHE = 'kinlab-models-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('kinlab-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !/\/models\/data\.[0-9a-f]+\.js$/.test(url.pathname)) return;
  e.respondWith(caches.open(CACHE).then((c) => c.match(url.pathname).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok && res.type === 'basic') {
      c.put(url.pathname, res.clone()).then(() => c.keys()).then((ks) => ks.forEach((k) => { if (new URL(k.url).pathname !== url.pathname) c.delete(k); }));
    }
    return res;
  }))));
});
