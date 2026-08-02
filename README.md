# 🔥 JEE Battle Royale Tracker

A gamified JEE Mains + Advanced prep tracker: chapter checklists, a "Solo Leveling"
style Advanced zone, test logging, streaks, weak-spot radar, and an optional live
leaderboard. Installable as a PWA (works offline once loaded).

## What's in this zip

| File | Purpose |
|---|---|
| `index.html` | The entire app — HTML, CSS, and JS in one file. |
| `manifest.json` | Full PWA manifest — see "Manifest / PWABuilder score" below. |
| `sw.js` | Service worker — caches the app shell so it works offline once installed. |
| `icon-192.png` / `icon-512.png` | App icon, generated from the logo you provided (each has an `"any"` and a `"maskable"` entry in the manifest). |
| `screenshots/` | 3 real screenshots of the running app (2 phone-size, 1 wide/tablet-size), referenced by the manifest's `screenshots` field. |
| `README.md` | This file. |

## Running it

Any static file host works — there's no build step and no backend required.

- **Quickest test:** open `index.html` directly in a browser (some install/offline
  features need a real server, but the app itself works fine).
- **Proper hosting:** upload all 5 files to the **same folder** on any static host
  (GitHub Pages, Netlify, Vercel, Cloudflare Pages, a plain web server, etc.) and
  visit `index.html`. Keep the filenames exactly as they are — `manifest.json`,
  `sw.js`, and the icons are referenced by name from `index.html`.
- **Install as an app:** once hosted over HTTPS, most browsers show an "Install"
  / "Add to Home Screen" prompt automatically.

## What was fixed: laggy Advanced section

The Advanced tab's background had a "system window" glow effect (`.advanced-zone::before`)
that animated `box-shadow` and `border-color` directly, on an infinite 3.6s loop.
That pseudo-element stretches across the **entire** Advanced tab — including every
chapter card inside it — so the browser was repainting that whole (often very tall)
area on every animation frame, forever, any time the tab was open. That's what caused
the jank/lag.

**Fix:** the glow now only animates `opacity`, which is GPU-composited and effectively
free, instead of the underlying box-shadow/border values. The static "peak brightness"
look is baked in once, and the pulse is a fade rather than a color recompute. The
drifting particle effect (`::after`) was already transform/opacity-based and untouched.
Also added:
- `contain: layout style` on `.advanced-zone` so paint work inside it can't force the
  browser to re-check layout elsewhere on the page.
- `will-change: opacity` hints on the animated pseudo-elements.
- A `prefers-reduced-motion` rule that turns these decorative animations off entirely
  for users who've asked their OS/browser to reduce motion.

No feature, data, or layout logic was touched — this is a pure rendering-performance fix.
The Advanced tab should now scroll and interact smoothly, especially on phones.

## Manifest / PWABuilder score

`manifest.json` was expanded to cover essentially every field PWABuilder's
report card checks for:

- **Required:** `name`, `short_name`, `icons` (incl. a real 512×512), `start_url`.
- **Recommended:** `description`, `display`, `background_color`, `theme_color`,
  `orientation`, `screenshots` (real ones — see below), a maskable icon,
  `categories`, `shortcuts`.
- **Optional / extra credit:** `id`, `scope`, `lang`, `dir`, `display_override`,
  `prefer_related_applications` + `related_applications`, `launch_handler`.

Two things worth knowing:

1. **Screenshots are real, not placeholders.** I rendered the actual app (phone
   size ×2, tablet/wide size ×1) and saved them into `screenshots/`. If you
   redesign a tab significantly, swap in fresh ones — PWABuilder checks that
   the files exist and match their declared `sizes`, not that they're
   necessarily current.
2. **`iarc_rating_id` was intentionally left out.** That field has to be a real
   ID issued by the IARC after you fill out their age-rating questionnaire
   (free, ~5 min, at https://www.globalratings.com) — a made-up value would
   either be ignored or flagged as invalid. Add it once you have one; it's
   the one recommended/optional field this manifest doesn't cover.
3. **The maskable icons currently just reuse the full-bleed icon files.** That
   passes PWABuilder's "has a maskable icon" check, but a *true* maskable icon
   keeps its important content inside the center ~80% safe zone so Android
   doesn't crop it into a circle/squircle awkwardly. Worth generating a
   properly-padded maskable version later (e.g. via
   https://maskable.app/editor) — swap the two `"purpose": "maskable"` icon
   entries in `manifest.json` to point at it.

## Optional: live shared leaderboard (Firebase)

Everything in the app — checklists, tests, streaks, coaching log, daily targets —
is stored **locally on-device** and works with zero setup. The only feature that
needs an external service is the **live, cross-device leaderboard**. It's optional;
without it, the leaderboard tab still works but only shows data from that one device.

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
- All 5 files must stay in the same folder for icons/manifest/service worker paths
  to resolve correctly.
