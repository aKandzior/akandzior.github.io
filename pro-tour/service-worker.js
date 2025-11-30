const REDIRECT_PATH = "/pro-tour/index.html";
const REDIRECT_URL = new URL(REDIRECT_PATH, self.location.origin).href;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      await self.registration.unregister();
      await self.clients.claim().catch(() => undefined);
      const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      await Promise.all(clients.map((client) => client.navigate(REDIRECT_URL).catch(() => undefined)));
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(Response.redirect(REDIRECT_URL));
  }
});
