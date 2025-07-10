const assets = [
  "/atb_media/",
  "/atb_media/static/css/main.bd6fcd1c.css",
  "/atb_media/static/js/main.ccf60e25.js",
  "/atb_media/static/css/459.388e9f2f.chunk.css",
  "/atb_media/static/js/459.972871e0.chunk.js",
  "/atb_media/static/css/169.388e9f2f.chunk.css",
  "/atb_media/static/js/169.ab7199de.chunk.js",
  "/atb_media/static/css/935.388e9f2f.chunk.css",
  "/atb_media/static/js/935.ff4cfb41.chunk.js",
  "/atb_media/static/css/966.388e9f2f.chunk.css",
  "/atb_media/static/js/966.fb7310f0.chunk.js",
  "/atb_media/static/js/172.2313d320.chunk.js",
  "/atb_media/static/js/284.bb32a28c.chunk.js",
  "/atb_media/static/media/logo.cd6b60c18b342209faa8.png",
  "/atb_media/static/css/main.bd6fcd1c.css.map",
  "/atb_media/static/js/main.ccf60e25.js.map",
  "/atb_media/static/css/459.388e9f2f.chunk.css.map",
  "/atb_media/static/js/459.972871e0.chunk.js.map",
  "/atb_media/static/css/169.388e9f2f.chunk.css.map",
  "/atb_media/static/js/169.ab7199de.chunk.js.map",
  "/atb_media/static/css/935.388e9f2f.chunk.css.map",
  "/atb_media/static/js/935.ff4cfb41.chunk.js.map",
  "/atb_media/static/css/966.388e9f2f.chunk.css.map",
  "/atb_media/static/js/966.fb7310f0.chunk.js.map",
  "/atb_media/static/js/172.2313d320.chunk.js.map",
  "/atb_media/static/js/284.bb32a28c.chunk.js.map",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("atb-media").then((cache) => {
      cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.startsWith("https://i.ytimg.com")) {
        event.respondWith(fetch(event.request));
        return;
      }

      const cache = await caches.open("atb-media");

      const cachedResponse = await cache.match(event.request);

      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => {
          return new Response(
            "Network error and no cached data available. see the browser's console for more information",
            {
              status: 503,
              statusText: "Service Unavailable.",
            }
          );
        });

      return cachedResponse || fetchPromise;
    })()
  );
});
