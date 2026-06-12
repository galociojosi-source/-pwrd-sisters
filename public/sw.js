const CACHE = 'pwrd-v1';
const SHELL = [
  '/index.html',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css',
];

// Instala e faz cache do shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

// Remove caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estratégia: Network first, fallback cache
// Firebase/Firestore sempre vai pela rede (dados em tempo real)
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Firebase sempre pela rede — não cachear dados
  if(url.includes('firestore.googleapis.com') ||
     url.includes('firebase') ||
     url.includes('identitytoolkit')) {
    return; // passa direto para a rede
  }

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Só cacheia respostas válidas de GET
        if(e.request.method === 'GET' && res.status === 200){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
