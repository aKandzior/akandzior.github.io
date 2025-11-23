self.__PRO_TOUR_APP_SHELL__ = ["/","/index.html","/manifest.webmanifest","/assets/favicon-LQZvGMMh.ico","/assets/index-39BuHyYj.css","/assets/index-CBamHJzV.js","/assets/manifest-PevZigR7.webmanifest","/icons/apple-touch-icon.png","/icons/favicon-96x96.png","/icons/icon-192.svg","/icons/icon-512.svg"];
const APP_VERSION = "pro-tour-v0.9.1";
const APP_SHELL_CACHE = `pro-tour-shell-${APP_VERSION}`;
const DATA_CACHE = `pro-tour-data-${APP_VERSION}`;
const DEV_APP_SHELL_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "/manifest.webmanifest",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
];
const APP_SHELL_ASSETS = self.__PRO_TOUR_APP_SHELL__ ?? DEV_APP_SHELL_ASSETS;
const APP_SHELL_ASSET_SET = new Set(APP_SHELL_ASSETS);
const SCHEDULE_PATHNAME = "/data/pro-tour-schedule.js";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_SHELL_CACHE);
      await cache.addAll(APP_SHELL_ASSETS);
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map((cacheName) => {
          if (cacheName === APP_SHELL_CACHE || cacheName === DATA_CACHE) {
            return Promise.resolve();
          }
          if (!cacheName.startsWith("pro-tour-shell-") && !cacheName.startsWith("pro-tour-data-")) {
            return Promise.resolve();
          }
          return caches.delete(cacheName);
        })
      );
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
  if (url.origin !== self.location.origin) {
    return;
  }
  if (isScheduleRequest(url)) {
    event.respondWith(networkFirstSchedule(request));
    return;
  }
  if (request.mode === "navigate" || APP_SHELL_ASSET_SET.has(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});

function isScheduleRequest(url) {
  return url.pathname === SCHEDULE_PATHNAME;
}

async function cacheFirst(request) {
  const cache = await caches.open(APP_SHELL_CACHE);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  const networkResponse = await fetch(request);
  if (networkResponse && networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

async function networkFirstSchedule(request) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}
