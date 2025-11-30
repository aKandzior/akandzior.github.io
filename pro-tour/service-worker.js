importScripts("/pro-tour/notice-content.js");

self.addEventListener("install", (event) => {
  event.waitUntil(clearCaches().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await clearCaches();
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const isProTour = url.origin === self.location.origin && url.pathname.startsWith("/pro-tour/");

  if (request.mode === "navigate" && isProTour) {
    event.respondWith(renderNotice());
    return;
  }

  if (isProTour) {
    event.respondWith(fetch(request, { cache: "no-store" }));
  }
});

self.addEventListener("message", (event) => {
  if (event.data === "clear-caches") {
    event.waitUntil(clearCaches());
  }
  if (event.data === "skip-waiting") {
    self.skipWaiting();
  }
});

function renderNotice() {
  return new Response(self.NOTICE_HTML || "", {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function clearCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}
