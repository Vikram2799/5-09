# project-509

A one-page love story for Vaishnavi. Pure HTML/CSS/JS, no frameworks, no build step.

## 1. Add your 10 photos

Drop these files into `/assets` using these exact names (until you do, each spot shows a
tasteful gold-on-dark placeholder labelled with the filename it's waiting for, so nothing
looks broken):

| File | Used for |
|---|---|
| `hero.jpg` | Act 3 — the big opening portrait |
| `gallery1.jpg` | Staircase |
| `gallery2.jpg` | Walking |
| `gallery3.jpg` | Holding hands |
| `gallery4.jpg` | Ring close-up |
| `gallery5.jpg` | Office selfie (deliberately the visual center of the gallery) |
| `gallery6.jpg` | Swing |
| `gallery7.jpg` | Standing portrait |
| `gallery8.jpg` | Ring thumbs-up |
| `gallery9.jpg` | Final portrait |

`favicon.png` is already generated (a small gold interlocked-rings mark).

Tips: export photos at reasonable web sizes (roughly 1600px on the long edge is plenty),
and use `.jpg` at ~80% quality so the page stays fast on mobile data.

## 2. Check the two dates in `script.js`

Right near the top:

```js
var SAID_YES = new Date(2026, 5, 25, 17, 9, 0);   // 25 June 2026, 5:09 PM
var WEDDING  = new Date(2026, 10, 20, 6, 15, 0);  // 20 November 2026, 6:15 AM
```

Both timers, and the finale, are calculated live from these — nothing else needs updating.
After 20 November 2026 passes, Card 2 and the finale automatically switch from a countdown
to "Married For," counting up — no design changes needed, exactly as planned.

## 3. Preview locally

Just open `index.html` in a browser — no server or build tool required. (Opening it
directly with `file://` works, but if your browser blocks anything, run
`python3 -m http.server` in this folder and visit `http://localhost:8000`.)

## 4. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Project 5:09"
git branch -M main
git remote add origin https://github.com/<you>/project-509.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Deploy from branch → main → / (root)**.
Your link will be `https://<you>.github.io/project-509/`.

## Notes

- The browser tab intentionally just says **"5:09 PM"** — no page title is shown on-screen,
  and there's no OG/share metadata, so a link preview stays as quiet and cryptic as the
  page itself.
- Respects `prefers-reduced-motion`: the cinematic pacing compresses automatically for
  anyone with that setting on, without losing any content.
