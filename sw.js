/* Central Med — service worker
   Guarda o app no aparelho para abrir sem internet.
   Trocou algum arquivo? Suba o número da versão abaixo e o celular pega a versão nova. */

var VERSAO = "central-med-v2";

var ARQUIVOS = [
  "./",
  "./index.html",
  "./assets/css/app.css",
  "./assets/js/data.js",
  "./assets/js/app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSAO).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.map(function (n) { return n === VERSAO ? null : caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;

  var url = new URL(e.request.url);

  /* Fontes do Google: usa o que estiver guardado e atualiza em segundo plano. */
  if (url.origin.indexOf("fonts.googleapis.com") > -1 || url.origin.indexOf("fonts.gstatic.com") > -1) {
    e.respondWith(
      caches.open(VERSAO + "-fontes").then(function (c) {
        return c.match(e.request).then(function (achou) {
          var rede = fetch(e.request).then(function (r) { c.put(e.request, r.clone()); return r; }).catch(function () { return achou; });
          return achou || rede;
        });
      })
    );
    return;
  }

  /* Arquivos do app: rede primeiro (para pegar atualizações), cache como rede de segurança. */
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copia = r.clone();
      caches.open(VERSAO).then(function (c) { c.put(e.request, copia); }).catch(function () {});
      return r;
    }).catch(function () {
      return caches.match(e.request).then(function (achou) {
        return achou || caches.match("./index.html");
      });
    })
  );
});
