# 🔥 JEE Battle Royale Tracker

A single-page PWA for tracking JEE prep — chapters, tests, daily question logs, streaks, leagues, and a leaderboard.

## Deploying on GitHub Pages

1. Create a new GitHub repo and upload every file in this folder to the **root** of the repo (keep the `icons/` folder structure intact).
2. Go to **Settings → Pages** → set source to the `main` branch, root folder.
3. Your app will be live at `https://<your-username>.github.io/<repo-name>/`.
4. Open it on Android Chrome → menu → **"Add to Home screen"** to install it as an app.

## Files

- `index.html` — the entire app (UI, styles, logic).
- `manifest.json` — PWA config: app name, colors, and icons used for install/home-screen.
- `icon-192.png`, `icon-512.png`, `icon-192-maskable.png`, `icon-512-maskable.png` — default app icon (red "V"), in the sizes Android/iOS expect.
- `icons/` — alternate icon color options offered in-app under **Data & Settings → Change Icon**.

## Optional: live/shared leaderboard

By default the leaderboard runs in local mode (per-device). To make it a real shared leaderboard across devices, set up a free Firebase project and fill in the `firebaseConfig` object near the top of `index.html`. Full steps were given in-chat — short version:

1. Create a Firebase project → enable **Anonymous** sign-in (Authentication → Sign-in method).
2. Create a Firestore database (test mode) with this rule:
   ```
   match /leaderboard/{uid} {
     allow read: if true;
     allow write: if request.auth.uid == uid;
   }
   ```
3. Copy your web app's `firebaseConfig` values into `index.html`, replacing the `YOUR_...` placeholders.
