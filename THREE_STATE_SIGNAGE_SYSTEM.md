# 🎛️ CRS THREE-STATE SIGNAGE SYSTEM

**Industrial Labels + Safety Plates — NO GRAPHICS NEEDED**

This document describes the CRS signage system using **HTML/CSS routes only** — no PNG uploads, no asset management, no version control split.

---

## 🎯 THE THREE STATES

| Route | Purpose | When to Use | Xibo Config |
|-------|---------|-------------|-------------|
| `/signage` | **PRIMARY** — Live system display | Default, always-on | Default Layout (Web Page widget) |
| `/signage/fallback` | **SYSTEM SAFE PLATE** — Dignified offline state | When web fails or testing | Fallback Layout (Web Page widget) |
| `/signage/build` | **BUILD STATUS** — Construction/testing | During builds, soft launches | Manual Layout (schedule as needed) |

---

## 1️⃣ PRIMARY: `/signage`

**Live system display with dynamic data**

### What It Shows:
- CRS badge
- Current status (live from `/signals/status.json`)
- NOW ACTIVE services (Rehearsals, Studio, Café)
- State bars (green/amber/red)
- Upcoming schedule (if available)
- QR code + booking URL

### Technical Details:
- Polls `/signals/status.json` every 60 seconds
- Polls `/signals/services.json` every 60 seconds  
- Polls `/signals/schedule.json` every 60 seconds
- Falls back to static content if API fails
- No animations (instant updates)
- Railway departure board aesthetic

### Xibo Configuration:
```
Layout: Default Layout
Widget: Web Page
URL: https://cowleyroadstudios.com/signage
Update Interval: 300s (5 minutes)
```

---

## 2️⃣ FALLBACK: `/signage/fallback`

**System safe plate — dignified offline state**

### What It Shows:
```
[CRS BADGE]

COWLEY ROAD STUDIOS
SYSTEM LIVE
Updating shortly
```

### Technical Details:
- **100% static HTML/CSS** — no JavaScript
- **No API calls** — no network dependencies
- Centered layout
- Same color palette as primary signage
- Green accent (#00B400) for "SYSTEM LIVE"

### When to Use:
- Xibo fallback layout (automatic when primary fails)
- Network testing
- System maintenance
- Power cycling displays

### Xibo Configuration:
```
Layout: Fallback Layout
Widget: Web Page
URL: https://cowleyroadstudios.com/signage/fallback
Update Interval: N/A (static)
```

---

## 3️⃣ BUILD: `/signage/build`

**Build status plate — construction/testing**

### What It Shows:
```
[CRS BADGE]

COWLEY ROAD STUDIOS
BUILD IN PROGRESS
Systems online shortly
```

### Technical Details:
- **100% static HTML/CSS** — no JavaScript
- **No API calls** — no network dependencies
- Centered layout
- Same color palette as primary signage
- Amber accent (#FFA000) for "BUILD IN PROGRESS"

### When to Use:
- Construction visible from street
- Testing new features
- Soft launches
- Workshop Café prep days

### Xibo Configuration:
```
Layout: Build Status Layout
Widget: Web Page
URL: https://cowleyroadstudios.com/signage/build
Schedule: Manual (publish when needed)
```

---

## 🔧 XIBO IMPLEMENTATION

### Step 1: Create Three Layouts

**A. Default Layout** (Primary)
1. Xibo → Layouts → Add Layout
2. Name: "CRS Primary Signage"
3. Add Region (full screen, 1920×1080)
4. Add Widget: Web Page
   - URL: `https://cowleyroadstudios.com/signage`
   - Duration: 300 seconds
   - Update Interval: 300 seconds
   - Mode: Open Natively
   - JavaScript: ✅ Enabled
   - Reload: 300 seconds
5. Save → Publish

**B. Fallback Layout** (System Safe)
1. Xibo → Layouts → Add Layout
2. Name: "CRS Fallback"
3. Add Region (full screen, 1920×1080)
4. Add Widget: Web Page
   - URL: `https://cowleyroadstudios.com/signage/fallback`
   - Duration: indefinite
   - Mode: Open Natively
   - JavaScript: ❌ Disabled (static)
5. Save → Publish

**C. Build Layout** (Build Status)
1. Xibo → Layouts → Add Layout
2. Name: "CRS Build Status"
3. Add Region (full screen, 1920×1080)
4. Add Widget: Web Page
   - URL: `https://cowleyroadstudios.com/signage/build`
   - Duration: indefinite
   - Mode: Open Natively
   - JavaScript: ❌ Disabled (static)
5. Save → Publish

### Step 2: Configure Display Settings

**Display Profile:**
```
Operating Hours: 06:00 - 23:00
Default Layout: CRS Primary Signage
Fallback Layout: CRS Fallback
Collect Interval: 300 seconds (5 minutes)
```

### Step 3: Schedule Management

**Default Schedule:**
- **06:00 - 23:00**: CRS Primary Signage (always)
- **23:00 - 06:00**: CRS Fallback (overnight)

**Manual Override (when needed):**
- Publish "CRS Build Status" with priority
- Set duration (e.g., 1 week)
- Reverts to primary when override expires

---

## ✅ ADVANTAGES OF THIS APPROACH

### vs. Static PNG Graphics:

| Concern | Static PNGs | HTML Routes (This Approach) |
|---------|-------------|----------------------------|
| **Updates** | Re-design, re-export, re-upload | Edit code, deploy instantly |
| **Version Control** | Split (code + images) | Single codebase |
| **Cache Issues** | Must clear Xibo cache | Standard web cache rules |
| **Styling Consistency** | Manual color matching | CSS variables, guaranteed match |
| **Text Changes** | Photoshop/Canva edit | Change one line of code |
| **Multi-Location** | Duplicate PNGs for each location | Query params (`?location=cricket`) |
| **Localization** | Separate graphics per language | Browser language detection |
| **Accessibility** | None (raster image) | Semantic HTML, screen readers |

---

## 🎨 DESIGN CONSISTENCY

All three routes use:
- **Font**: JetBrains Mono (monospace)
- **Background**: `#0D1912` (dark slate)
- **Text**: `#e5e5e5` (light gray)
- **Accent Green**: `#00B400` (live/system states)
- **Accent Amber**: `#FFA000` (build/standby states)
- **Accent Red**: `#DC0000` (offline/error states)

**CRS Badge:** Same image across all three routes  
**Typography:** Same sizes, weights, letter-spacing  
**Spacing:** Same padding, gaps, margins

---

## 📊 FILE SIZE COMPARISON

| Asset Type | Size | Notes |
|------------|------|-------|
| **Static PNG (1920×1080)** | ~500KB - 2MB | Per image × 3 states = 1.5MB - 6MB total |
| **HTML/CSS Routes** | ~5KB | Per route × 3 states = ~15KB total |

**Bandwidth saved**: 99% reduction  
**Xibo cache load**: Minimal (text content)  
**Update speed**: Instant (web cache rules)

---

## 🚀 DEPLOYMENT CHECKLIST

- [x] `/signage` route created (primary, live data)
- [x] `/signage/fallback` route created (system safe plate)
- [x] `/signage/build` route created (build status)
- [x] All routes use same CRS aesthetic
- [x] Build successful (154.57 kB)
- [x] Commit to `genspark_ai_developer` branch
- [ ] Push to GitHub
- [ ] Deploy to Cloudflare Pages
- [ ] Test all three URLs in browser
- [ ] Configure Xibo layouts
- [ ] Test on physical display
- [ ] Document Xibo schedule

---

## 🧪 TESTING PROTOCOL

### Browser Testing (Before Xibo):
1. Visit `https://cowleyroadstudios.com/signage`
   - ✅ Shows live data (services, status, schedule)
   - ✅ State bars visible (green/amber/red)
   - ✅ Updates every 60 seconds
   - ✅ QR code visible

2. Visit `https://cowleyroadstudios.com/signage/fallback`
   - ✅ Shows "SYSTEM LIVE" (green)
   - ✅ Centered, calm, no flicker
   - ✅ CRS badge visible

3. Visit `https://cowleyroadstudios.com/signage/build`
   - ✅ Shows "BUILD IN PROGRESS" (amber)
   - ✅ Centered, calm, no flicker
   - ✅ CRS badge visible

### Xibo Testing:
1. Create all three layouts
2. Publish primary layout
3. Verify display shows live data
4. Disconnect network → verify fallback appears
5. Reconnect → verify primary returns
6. Manually schedule build layout → verify it appears
7. Let build schedule expire → verify primary returns

---

## 📐 RESPONSIVE NOTES

All three routes are designed for **1920×1080 (16:9) displays**.

If you need other resolutions:
- **Portrait (9:16)**: Add media query to adjust layout
- **4K (3840×2160)**: Scale fonts 2× using `font-size: 200%` on body
- **1280×720**: No changes needed (CSS rem units scale)

---

## 🔐 GOVERNANCE NOTE

> **This document is authoritative.**  
> If signage behavior differs from what's described here, update the system — not the expectations.

**Signage is a read-only viewport.**  
Content lives in `/signals/*.json`, Google Calendar, and CRS admin.  
Signage displays inside CRS aesthetic — it does not generate content.

---

## 🎯 NEXT STEPS

### This Week:
1. ✅ Build three signage routes
2. ⏳ Push to GitHub
3. ⏳ Deploy to Cloudflare Pages
4. ⏳ Test all three URLs in browser

### Next Week:
1. Configure Xibo Cloud account
2. Create three layouts (Primary, Fallback, Build)
3. Connect display to Xibo
4. Test scheduling and fallback behavior

### Month 2:
1. Add `/signals/events.json` endpoint
2. Add MODE 02 — EVENTS to primary signage
3. Test event promotion workflow
4. Add MODE 03 — COMMUNITY
5. Add MODE 04 — PULSE (generative visuals)

---

## 📸 VISUAL REFERENCES

### Primary Signage (`/signage`):
```
┌────────────────────────────────────────────────────────────┐
│ [CRS Badge]  CRS — SYSTEM STATUS                          │
│              BUILD PHASE · OPERATIONAL BY ENQUIRY          │
├────────────────────────────────────────────────────────────┤
│ NOW ACTIVE                                                 │
│ ▮ Rehearsals                                    BOOKABLE   │
│ ▮ Studio Sessions                                 ENQUIRY  │
│ ▮ Workshop Café                            PRIVATE HIRE    │
├────────────────────────────────────────────────────────────┤
│ FOR DETAILS & BOOKINGS                              [QR]  │
│ cowleyroadstudios.com                                      │
└────────────────────────────────────────────────────────────┘
```

### Fallback (`/signage/fallback`):
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                      [CRS BADGE]                           │
│                                                            │
│                 COWLEY ROAD STUDIOS                        │
│                    SYSTEM LIVE                             │
│                  Updating shortly                          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Build Status (`/signage/build`):
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                      [CRS BADGE]                           │
│                                                            │
│                 COWLEY ROAD STUDIOS                        │
│                 BUILD IN PROGRESS                          │
│               Systems online shortly                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🙏 MESSAGE TO DANNY

**You were right** — industrial labels + safety plates, not marketing posters.

**This approach:**
- ✅ No PNG uploads
- ✅ No asset versioning
- ✅ Instant updates via code deploy
- ✅ Same CRS aesthetic across all states
- ✅ Fallback is dignified, not embarrassing
- ✅ Build state shows progress, not chaos

**All three states live at URLs:**
- `https://cowleyroadstudios.com/signage`
- `https://cowleyroadstudios.com/signage/fallback`
- `https://cowleyroadstudios.com/signage/build`

**Ready to push and deploy.** 🚀

---

*Generated: 2026-01-19*  
*Location: 118 Cowley Road*  
*Status: OPERATIONAL*  
*Build: 154.57 kB*
