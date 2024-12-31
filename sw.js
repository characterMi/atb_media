const assets = [
  "/atb_media/",
  "/atb_media/static/css/main.d65564e9.css",
  "/atb_media/static/js/main.6868be14.js",
  "/atb_media/static/css/430.07514bdf.chunk.css",
  "/atb_media/static/js/430.784776c4.chunk.js",
  "/atb_media/static/css/169.07514bdf.chunk.css",
  "/atb_media/static/js/169.7a79a7ba.chunk.js",
  "/atb_media/static/css/935.07514bdf.chunk.css",
  "/atb_media/static/js/935.401dcd54.chunk.js",
  "/atb_media/static/css/966.07514bdf.chunk.css",
  "/atb_media/static/js/966.9f699054.chunk.js",
  "/atb_media/static/js/117.ae8ffe3c.chunk.js",
  "/atb_media/static/js/592.11a1d601.chunk.js",
  "/atb_media/static/media/logo.cd6b60c18b342209faa8.png",
  "/atb_media/static/css/main.d65564e9.css.map.map",
  "/atb_media/static/js/main.6868be14.js.map.map",
  "/atb_media/static/css/430.07514bdf.chunk.css.map",
  "/atb_media/static/js/430.784776c4.chunk.js.map",
  "/atb_media/static/css/169.07514bdf.chunk.css.map",
  "/atb_media/static/js/169.7a79a7ba.chunk.js.map",
  "/atb_media/static/css/935.07514bdf.chunk.css.map",
  "/atb_media/static/js/935.401dcd54.chunk.js.map",
  "/atb_media/static/css/966.07514bdf.chunk.css.map",
  "/atb_media/static/js/966.9f699054.chunk.js.map",
  "/atb_media/static/js/117.ae8ffe3c.chunk.js.map",
  "/atb_media/static/js/592.11a1d601.chunk.js.map",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("atb-media").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          return caches.open("atb-media").then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch((e) => {
          console.error(e);

          return new Response(
            "Network error and no cached data available. see the browser's console for more information",
            {
              status: 503,
              statusText: "Service Unavailable.",
            }
          );
        });
      // We use the currently cached version if it's there
      return response || fetchPromise; // cached or a network fetch
    })
  );
});
