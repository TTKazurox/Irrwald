const V='irrwald-v1';
const SHELL=['./','index.html','kontakt.html','impressum.html','datenschutz.html','blockbow.html','blockbow-square.webp','blockbow-landscape.webp','icon-192.png','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* Netzwerk zuerst (neue Versionen erscheinen sofort), Cache nur als Notlösung ohne Internet */
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin||r.headers.has('range'))return;
  e.respondWith(fetch(r).then(res=>{
    if(res.status===200){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}
    return res;
  }).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
