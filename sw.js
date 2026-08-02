// Service worker for JEE Battle Royale Tracker — enables offline / installed-PWA use.
// Strategy: cache the app shell on install, then "network first, fall back to cache"
// so a hosted update is picked up automatically when online, and the last-cached
// version still works with no connection at all.

const CACHE_NAME = 'jee-tracker-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './screenshots/narrow-daily.png',
  './screenshots/narrow-advanced.png',
  './screenshots/wide-dashboard.png',
  './sounds/click.mp3',
  './sounds/check.mp3',
  './sounds/uncheck.mp3',
  './sounds/success.mp3',
  './sounds/levelup.mp3',
  './sounds/streak.mp3',
  './sounds/delete.mp3',
  './sounds/error.mp3',
  './sounds/whoosh.mp3',
  './sounds/notification.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle same-origin GET requests — let everything else (Firebase, fonts, etc.) pass through normally.
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
