# 🔥 JEE Battle Royale Tracker

A gamified JEE Mains + Advanced prep tracker: chapter checklists, a "Solo Leveling"
style Advanced zone, test logging, streaks, weak-spot radar, an optional live
leaderboard, and now a **Notes** section for reference material. Installable as a
PWA (works offline once loaded — except the Notes/Organic Reactions page, which
needs internet).

## What's in this zip

| File | Purpose |
|---|---|
| `index.html` | The entire tracker app — HTML, CSS, and JS in one file. |
| `organic.html` | JEE Organic Chemistry field guide (457 reactions, 12 chapters), embedded into the tracker via the Notes tab. |
| `manifest.json` | PWA manifest — name, icons, theme colors, install shortcuts. |
| `sw.js` | Service worker — caches the app shell so it works offline once installed. |
| `README.md` | This file. |

**Note:** `icon-192.png`, `icon-512.png`, and their maskable variants are **not**
included in this zip — the manifest and service worker reference them by filename,
so make sure your existing icon files (already in your repo) stay in the same
folder as these files.

## Running it

Any static file host works — there's no build step and no backend required.

- **Quickest test:** open `index.html` directly in a browser (some install/offline
  features need a real server, but the app itself works fine).
- **Proper hosting:** upload all files (these 4 + your existing icon files) to the
  **same folder** on any static host (GitHub Pages, Netlify, Vercel, Cloudflare
  Pages, a plain web server, etc.) and visit `index.html`. Keep the filenames
  exactly as they are — `organic.html`, `manifest.json`, `sw.js`, and the icons
  are all referenced by name from `index.html`.
- **Install as an app:** once hosted over HTTPS, most browsers show an "Install" /
  "Add to Home Screen" prompt automatically.

## What's new: the Notes tab

A new **📓 Notes** section was added as its own nav category (in both the desktop
sidebar and the mobile bottom nav), separate from the checklist/XP-tracked
Physics/Chemistry/Maths tabs — it's meant to hold reference material you browse
rather than track progress against.

Right now it has one card:

- **⚗ Organic Reactions** — opens as its own sub-page (with a "← Back to Notes"
  button) embedding `organic.html` in an iframe. This is a separate single-file
  site (see its own section below) that needs an internet connection to load,
  since it pulls Tailwind CSS, Font Awesome, and MathJax from CDNs.

More reference material can be added later as additional cards in the same Notes
grid without touching the rest of the app.

A **Notes** shortcut was also added to `manifest.json`, alongside the existing
Mark Present / Daily Qs / Battle Log / Data shortcuts, so long-pressing the
installed app icon can jump straight to Notes.

## About `organic.html` (Organic Reactions field guide)

A single-file, self-contained reference site for JEE Main & Advanced Organic
Chemistry:

- **457 reactions** across 12 chapters (Alkanes → General Organic Chemistry), each
  with a mechanism, mnemonic ("Read Aloud" text-to-speech), intermediate type, and
  JEE exam notes.
- **Virtualized list UI** — only the rows currently scrolled into view are ever
  real DOM elements, so the page stays smooth even with hundreds of entries.
- Search + classification/level filters.
- Click any reaction to open its full detail (LaTeX-rendered equation via
  MathJax) in the side panel.
- Text-to-speech ("Read Aloud") uses the browser's built-in Speech Synthesis API —
  availability and voice quality vary by browser/OS.
- **Requires internet on first load** — Tailwind CSS, Font Awesome, and MathJax
  are loaded from CDNs.

It can also be opened standalone (just visit `organic.html` directly) — it doesn't
depend on the tracker to function.

## Manifest / PWABuilder notes

- **Icons:** this manifest points at `icon-192.png` / `icon-512.png` (+ maskable
  variants) — same filenames as before, so your existing icon files don't need to
  change.
- **`screenshots`** is intentionally left out — no screenshot images were included
  in this bundle. Add real screenshots later and add a `screenshots` array (plus
  matching entries in `sw.js`'s `ASSETS` list) if you want that PWABuilder credit.
- **`iarc_rating_id`** is also left out — it has to be a real ID issued by the IARC
  after filling out their free age-rating questionnaire at
  https://www.globalratings.com. A made-up value would be ignored or flagged.

## Optional: live shared leaderboard (Firebase)

Everything in the tracker — checklists, tests, streaks, coaching log, daily
targets — is stored **locally on-device** and works with zero setup. The only
feature that needs an external service is the **live, cross-device leaderboard**.
It's optional; without it, the leaderboard tab still works but only shows data
from that one device.

To enable it, search `index.html` for `firebaseConfig` (there are two — a primary
config for login + leaderboard, and a secondary one for analytics) and follow the
numbered setup steps in the comment directly above it. In short:

1. Create a free Firebase project at https://console.firebase.google.com
2. Enable **Authentication → Sign-in method → Google**
3. Enable **Firestore Database** (test mode, or use the suggested rule in the comment)
4. Copy your web app's `firebaseConfig` values into the placeholders in `index.html`
5. Add your hosting domain (or `localhost` while testing) under
   **Authentication → Settings → Authorized domains**

## Notes

- The service worker (`sw.js`) only activates once the app is actually hosted (not
  when opened as a local file or previewed in a sandboxed environment) — this is
  expected and by design.
- All files (this bundle + your icon files) must stay in the same folder for
  icons/manifest/service worker/organic.html paths to resolve correctly.
- The Organic Reactions page is cached by the service worker as part of the app
  shell, but its CDN dependencies (Tailwind/Font Awesome/MathJax) are not — so it
  still requires a live connection to render properly, even once installed.
