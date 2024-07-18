const assets = [
  "/atb_media/",
  "/atb_media/static/css/main.8dafeec7.css",
  "/atb_media/static/js/main.3bba4eaf.js",
  "/atb_media/static/media/logo.cd6b60c18b342209faa8.png",
  "/atb_media/static/css/main.8dafeec7.css.map",
  "/atb_media/static/js/main.3bba4eaf.js.map",
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
