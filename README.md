# JEE Battle Royale Tracker

## Hosting on GitHub Pages

1. Create a new GitHub repo (public, so Pages is free) and upload every file in
   this zip to the **root** of the repo — keep them all in the same folder,
   don't nest them in a subfolder, so the relative paths in `index.html`,
   `manifest.json`, and `sw.js` keep working:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `icon-192-maskable.png`
   - `icon-512-maskable.png`
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", pick
   your default branch (e.g. `main`) and folder `/ (root)`, then **Save**.
4. GitHub gives you a URL like `https://<username>.github.io/<repo-name>/` —
   wait a minute or two for the first deploy, then open it.
5. **Firebase Authorized domains**: in the Firebase console →
   Authentication → Settings → Authorized domains, add your
   `<username>.github.io` domain, or Google sign-in's popup will fail.

## Installing as an app

Once hosted, open the GitHub Pages URL on your phone and use "Add to Home
Screen" (iOS Safari) or the install prompt (Android Chrome). It'll install
using the pink "V" icon and work offline for anything that doesn't need the
live leaderboard.

## Notes

- `sw.js` is a minimal offline-caching service worker — it only activates once
  the app is actually hosted (it's a no-op in sandboxed previews).
- The Firebase config already in `index.html` points at a real project — make
  sure Google sign-in is enabled there (Authentication → Sign-in method) and
  Firestore rules match what's outlined near the top of the Firebase section
  of `index.html`.
