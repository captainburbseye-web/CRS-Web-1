# CRS Digital Signage — Developer Handoff
## Repo: captainburbseye-web/crs-signage
## Live URL: https://captainburbseye-web.github.io/crs-signage/
## Branch: gh-pages (this is the live branch — main has a separate React/Vite project, ignore it)
## Current commit: 9e6df78

---

## What this is

A standalone static signage display for Cowley Road Studios, designed to run fullscreen on a 16:9 screen (1920×1080) via Yodeck kiosk mode. No framework. No build step. Five plain files.

The screen sits in a public-facing window on Cowley Road, Oxford. People read it from the street, in daylight, from 3–5 metres. Text must be enormous. Hierarchy must be brutal. This is not a web app — it is a broadcast monitor.

---

## File structure (everything in repo root on gh-pages)

```
index.html          — shell, fonts, DOM structure
styles.css          — all layout and visual styling
app.js              — slide rendering, rotation, nav, ticker
content.js          — ALL copy lives here. This is the only file that should need regular edits.
assets/
  qr-cowleyroadstudios.svg   — QR code pointing to cowleyroadstudios.com
```

No package.json. No node_modules. No build. Edit files, push to gh-pages, done.

---

## How it works

`content.js` exports two things:

**`tickerItems`** — array of strings that loop in the bottom ticker bar continuously.

**`slides`** — array of 8 slide objects. Each slide has:
```js
{
  id: 'hero',              // unique string, used for logic (qr: true on cta slide)
  slide: '01',             // display number (string, zero-padded)
  status: 'LIVE NOW',      // status pill text — appears top-left of every slide
  title: 'COWLEY ROAD\nSTUDIOS',  // \n = line break, rendered large
  sub: 'Recording Studio · Rehearsal Rooms · Creative Production',
  detail: 'Cowley Road OX4 1JE · Cricket Road OX4 3DJ',
  bullets: ['item one', 'item two', 'item three'],  // right panel — 3 items
  accent: 'gold',          // 'gold' = gold headline + warm tint | 'default' = off-white
  qr: true                 // OPTIONAL — only on cta slide, replaces bullets with QR block
}
```

`app.js` reads `content.js`, builds all 8 slides into the DOM on init, and uses CSS opacity to show/hide the active one. Auto-advances every 8000ms. Arrow keys and dot nav also work.

---

## Current 8-slide reel (do not change order without client sign-off)

| # | id | status | headline |
|---|---|---|---|
| 01 | hero | LIVE NOW | COWLEY ROAD STUDIOS |
| 02 | recording | SESSIONS ACTIVE | PROFESSIONAL RECORDING |
| 03 | rehearsal | BOOK NOW | REHEARSAL ROOMS |
| 04 | facilities | FULLY EQUIPPED | BUILT FOR BANDS & MAKERS |
| 05 | odro | ENQUIRIES OPEN | ODRO ENGINEERING |
| 06 | cafe | BOOKINGS OPEN NOW | WORKSHOP CAFÉ |
| 07 | legacy | EST. 1999 | SINCE 1999 |
| 08 | cta | SCAN TO BOOK | BOOK ONLINE + QR |

---

## Layout

Two-column grid at ≥1100px:
- **Left column** — status pill → massive headline → gold divider → sub → detail
- **Right column** — dark panel, 3 bullets separated by ruled lines (or QR block on slide 08)

Below 1100px the right panel is hidden (display:none), full-bleed left column only. This is fine for tablet/mobile but the Yodeck display is always 1920×1080 landscape so the panel is always visible in production.

---

## Typography

Fonts: **Oswald** (headlines, sub, bullets, ticker) + **JetBrains Mono** (body, UI labels). Both loaded from Google Fonts in index.html.

Key sizes (do NOT reduce — these are calibrated for daylight street reading at distance):
- Headline: `clamp(5.5rem, 12vw, 13rem)` — ~230px tall at 1920px. Non-negotiable.
- Sub-line: `clamp(1.6rem, 3vw, 3.2rem)`
- Detail: `clamp(1rem, 1.6vw, 1.5rem)`
- Bullets: `clamp(1.1rem, 1.8vw, 1.9rem)`
- Ticker: `clamp(1rem, 1.4vw, 1.35rem)`

---

## Colour palette

```css
--bg:        #0e1210   /* near-black background */
--bg-panel:  #141a16   /* right panel — slightly lighter */
--line:      rgba(212, 175, 55, 0.15)  /* gold-tinted dividers */
--line-hi:   rgba(212, 175, 55, 0.4)
--gold:      #d4af37   /* primary accent */
--gold-dim:  #a8872a   /* muted gold for dividers and borders */
--gold-pale: #e8d27a   /* status pill text */
--text:      #ede8d8   /* off-white body text */
--muted:     #6e6a5e   /* secondary/label text */
```

Gold accent (`accent: 'gold'`) applies to slides: hero, cafe, cta. Headline becomes `var(--gold)` and a warm radial glow is added. All other slides use `--text` (off-white) headlines.

---

## What to improve next (priority order from client brief)

These were scored against the brief and are the remaining gaps:

**1. Slide transitions**
Currently a hard 180ms opacity cut. The brief says "hard cuts or rapid fades" so this is intentional, but if the client wants a crossfade or a push, it's in `.slide { transition: opacity 180ms ease }` in styles.css and the `is-active` class toggle in `renderSlide()` in app.js.

**2. Progress bar per slide**
No per-slide countdown indicator. A thin gold bar depleting left-to-right over 8 seconds would reinforce the broadcast-system feel. Implement as a CSS animation reset on each slide transition.

**3. Slide-specific imagery**
Currently all slides are typography only. The client has photographic assets (recording studio, rehearsal rooms, Workshop Café). These could be used as low-opacity background textures on individual slides. Add a `bg` property to the slide object in content.js and apply it as `background-image` in app.js.

**4. Workshop Café status update**
Slide 06 currently reads "Bookings Open Now · Regular Hours Coming Soon". When regular hours are confirmed, update `sub` and `status` in content.js and push. This is the single most time-sensitive piece of copy.

**5. Live events feed**
The main CRS website at cowleyroadstudios.com serves `/events.json`. A future version of the signage could fetch this and inject upcoming events into a dedicated slide or a secondary ticker. Not in scope yet but the architecture supports it (static JS, fetch from external URL).

**6. Yodeck-specific kiosk hardening**
Currently there is no cursor-hiding, no scroll prevention beyond `overflow: hidden`, and no auto-reload. For a proper Yodeck deploy consider adding to index.html:
```html
<style>* { cursor: none !important; }</style>
```
And a page reload every 24h to pick up content pushes:
```js
setTimeout(() => location.reload(), 1000 * 60 * 60 * 24);
```

---

## Deployment

Push to `gh-pages` branch. GitHub Pages auto-deploys within ~60 seconds.

```bash
git clone https://github.com/captainburbseye-web/crs-signage.git
cd crs-signage
git checkout gh-pages
# make changes to content.js (or any file)
git add .
git commit -m "update: [describe what changed]"
git push origin gh-pages
```

Content-only updates (copy, status pills, ticker items) only require editing `content.js`. No touching app.js or styles.css.

---

## What NOT to touch

**Do not merge gh-pages into main.** The `main` branch is a separate React/Vite/TypeScript project (a different signage experiment from earlier). They are entirely independent. The live static site lives only on `gh-pages`.

**Do not add a bundler or framework.** The whole point of this repo is zero build step. If you need component reuse, use JS functions. If you need more slides, add objects to the array in content.js.

**Do not reduce font sizes.** Every size was set deliberately after a client review where text was flagged as too small for street reading. The headline at 13rem max is correct.

---

## Relationship to main CRS website

The main CRS website lives at a separate repo: `captainburbseye-web/CRS-Web-1`, deployed on Cloudflare Pages at `cowleyroadstudios.com`. It is a Hono/React SSR app, currently at v5.35.

There is also a secondary signage page embedded in the main website at `/signage-v2` (a self-contained HTML file at `public/signage-v2.html`). That is separate from this repo and managed by whoever works on the main site. Do not confuse the two.

This repo (`crs-signage`) is the canonical Yodeck-pointed display. It is the one that matters for the physical screen.

---

## Contact / context

Business: Cowley Road Studios, 118 Cowley Road, Oxford OX4 1JE. Also Cricket Road OX4 3DJ.
Website: cowleyroadstudios.com
Workshop Café bookings: workshopcafe@crsoxford.com
GitHub org: captainburbseye-web
