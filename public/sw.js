const assets = [
  "/atb_media/",
  // Add the js, css files after build + images in media folder.
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
