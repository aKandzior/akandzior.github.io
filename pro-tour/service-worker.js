const RELOCATION_VERSION = "relocate-v4";
importScripts("/pro-tour/notice-content.js");

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await clearCaches();
      self.skipWaiting();
    })()
  );
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

  if (!isProTour) {
    return;
  }

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(renderNotice());
    return;
  }

  event.respondWith(fetch(request, { cache: "no-store" }));
});

function renderNotice() {
  return new Response(self.NOTICE_HTML || "", {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "sw-version": RELOCATION_VERSION,
    },
  });
}

async function clearCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}
