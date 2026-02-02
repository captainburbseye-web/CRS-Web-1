# 🧾 SIGNAGE OVERLAY INSTRUCTIONS

**Cowley Road Studios — Video Signage Overlay System**  
**Status:** ✅ Approved for deployment  
**Maintainer:** `@cowleyroadstudios`  
**Contact:** [info@crsoxford.com](mailto:info@crsoxford.com)

---

## 🧠 OVERVIEW

The signage content is **overlayed** on top of the video signage reel hosted at:

```
https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/Signage%20Videos/
```

This system is designed for **Yodeck players** and `/signage/reel` routes.

Text overlays behave like **console labels** — legible, brief, and functionally meaningful.

---

## 🎨 DESIGN SYSTEM

| Layer | Rules |
|-------|-------|
| **Font** | `JetBrains Mono`, monospace fallback |
| **Colors** | `White` (info), `#E3B04B` (mustard, labels), `#FF9F1C` (amber, CTAs) |
| **Position** | Bottom ticker (configurable via CSS) |
| **Animation** | Fade in/out, 1s transition |
| **Timing** | Rotate text every 12 seconds |
| **Background** | Black translucent overlay (`rgba(0,0,0,0.6)`) |

---

## 🔠 OVERLAY TEXT ROTATION LIST

These 23 messages rotate continuously on the signage display:

```
1.  [ COWLEY ROAD STUDIOS · OXFORD ]
2.  [ WORKSHOP CAFÉ · EVENTS + TECH ]
3.  REHEARSALS — COWLEY ROAD — BOOK NOW
4.  REHEARSALS — CRICKET ROAD — PAY ONLINE
5.  CONTROL ROOM — DRY HIRE — 24HR ACCESS
6.  AV HIRE & REPAIR — INFO@CRSOXFORD.COM
7.  FOLLOW @COWLEYROADSTUDIOS
8.  @WORKSHOPCAFE.OX — LIVE EVENTS + SPECIALS
9.  CONTACT → INFO@CRSOXFORD.COM
10. BOOK ONLINE → COWLEYROADSTUDIOS.COM
11. → SCAN TO BOOK YOUR SESSION
12. → NEED GEAR? ASK ABOUT AV SERVICES
13. → HOT DRINK + WARM SOUND — WORKSHOP CAFÉ
14. → DRY HIRE YOUR MIX ROOM — 2HR · 3HR · 4HR
15. → BRING YOUR OWN ENGINEER — CRICKET ROAD
16. [ REHEARSAL ROOM — AVAILABLE NOW ]
17. [ MIXING ROOM — BOOK ONLINE ]
18. [ EVENTS THIS WEEK — WORKSHOP CAFÉ ]
19. [ AV SUPPORT — INFO@CRSOXFORD.COM ]
20. [ STUDIO 1 · STATUS: ACTIVE ]
21. [ SYSTEM VIDEO MODE ]
22. [ SQUARE VERIFIED BOOKING ONLY ]
23. [ LIVE VENUE · CREATIVE SPACE ]
```

---

## ⚙️ IMPLEMENTATION

### Files

- **Engine:** `/public/static/signage-overlay-engine.js`
- **Config:** `/public/static/signage-overlay.json`
- **Route:** `/signage` (pulls both engine and config)

### How It Works

1. **Engine loads** when `/signage` route is accessed
2. **Overlay container** is created at bottom of screen
3. **Text rotates** every 12 seconds with 1s fade transition
4. **Loop continues** indefinitely until page is closed

### Configuration

Edit `signage-overlay.json` to adjust:

```json
{
  "rotationInterval": 12000,      // milliseconds between text changes
  "fadeTransitionMs": 1000,       // fade animation duration
  "position": "bottom",           // "bottom" or "top"
  "fontSize": "32px",             // overlay text size
  "fontFamily": "JetBrains Mono"  // mono typeface
}
```

---

## 🎮 OPERATOR CONTROLS

### Via Browser Console

```javascript
// Start rotation
SignageOverlay.start();

// Stop rotation
SignageOverlay.stop();

// Force next message
SignageOverlay.next();

// View current config
console.log(SignageOverlay.config);

// View all messages
console.log(SignageOverlay.texts);
```

### Via Query Parameter

Disable overlay:

```
https://cowleyroadstudios.com/signage?overlay=off
```

---

## 🔒 YODECK INTEGRATION

### Setup

1. Add `/signage` route to Yodeck player
2. Set rotation interval to **12 seconds** (matches overlay timing)
3. Enable fullscreen mode
4. Disable screensaver and power saving

### URL Format

```
https://cowleyroadstudios.com/signage
```

### Fallback

If internet drops, static fallback displays:

```
COWLEY ROAD STUDIOS
AVAILABLE NOW
REHEARSALS · AV SERVICES
Scan to book
```

---

## ✅ DEFINITION OF DONE

- [x] Overlay rotates above video feed
- [x] Social handles and contact info appear every 30–60s
- [x] No marketing fluff
- [x] Overlay can be toggled off via query param
- [x] Matches CRS rack branding
- [x] Yodeck compatible
- [x] Survives browser refresh
- [x] Works in kiosk mode

---

## 🚨 TROUBLESHOOTING

### Overlay not appearing

1. Check browser console for errors: `F12` → Console
2. Verify JavaScript is enabled
3. Check network tab for `signage-overlay-engine.js` loading
4. Reload page: `Ctrl+Shift+R` (hard refresh)

### Text not rotating

1. Check `rotationInterval` in `signage-overlay.json`
2. Verify `SignageOverlay.start()` was called
3. Check browser console for `[SIGNAGE OVERLAY] Engine initialized`

### Overlay position wrong

1. Edit `position` in `signage-overlay.json` ("bottom" or "top")
2. Adjust `bottom: 40px;` or `top: 40px;` in CSS
3. Hard refresh page

---

## 📝 MAINTENANCE

### Adding New Messages

1. Edit `OVERLAY_TEXTS` array in `/public/static/signage-overlay-engine.js`
2. Keep line length under 40 characters for readability
3. Commit and push to GitHub
4. Yodeck will pull updated content on next refresh

### Updating Colors

Edit `colors` object in `signage-overlay-engine.js`:

```javascript
colors: {
  text: '#FFFFFF',        // white
  mustard: '#E3B04B',     // mustard label
  amber: '#FF9F1C',       // amber action
  background: 'rgba(0, 0, 0, 0.6)'  // translucent black
}
```

---

## 🔗 RELATED DOCUMENTATION

- `CRS_SIGNAGE_RULESET.md` — Physical signage design rules
- `BRAND_SYSTEM.md` — Typography and color discipline
- `SERVICE_TAXONOMY.md` — Canonical services and routing

---

**Status:** LIVE SIGNAGE OVERLAY SYSTEM  
**Last Updated:** 2026-02-02  
**Owner:** Cowley Road Studios Web Team  

---

**This is the canonical reference for signage overlay content. All changes must be tested and committed before deployment.**
