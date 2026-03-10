# 🎯 CRS WEB HANDOVER BRIEF – DEV 2
**Date**: 2026-02-25  
**From**: Dev 1 (AI Agent)  
**To**: Dev 2 (Human/AI)  
**Project**: Cowley Road Studios Web Platform  
**Status**: PRODUCTION LIVE ✅

---

## 🚨 CRITICAL – READ THIS FIRST

**DO NOT:**
- ❌ Re-add `.welcome-button` class to any CSS files (causes yellow blob overlays)
- ❌ Use CSS `background-image` for rack images (causes black bars) – use `<img>` with `object-fit: cover`
- ❌ Re-enable tooltips on `.booking-hotspot::after` or `::before` (causes yellow blobs)
- ❌ Change welcome rack image – we just fixed it (rastafari stripes version)
- ❌ Deploy without testing sandbox first
- ❌ Push to GitHub without calling `setup_github_environment` first
- ❌ Deploy to Cloudflare without calling `setup_cloudflare_api_key` first

---

## 📦 PROJECT OVERVIEW

**Tech Stack:**
- **Framework**: Hono (Cloudflare Workers/Pages)
- **Frontend**: Vanilla JS, TailwindCSS (CDN), HTML rendered server-side
- **Deployment**: Cloudflare Pages (edge runtime)
- **Git**: GitHub → Auto-deploy to Cloudflare Pages
- **Process Manager**: PM2 (sandbox only, not production)

**Key Directories:**
```
/home/user/webapp/
├── src/
│   ├── index.tsx           # Main Hono app (routes)
│   └── pages/              # Page components (TSX)
├── public/static/
│   ├── rack-images/        # Rack panel images (WebP)
│   ├── *.css               # CSS files
│   └── *.js                # Frontend JS
├── dist/                   # Build output (Vite SSR)
├── ecosystem.config.cjs    # PM2 config (sandbox only)
├── wrangler.jsonc          # Cloudflare config
└── package.json
```

---

## 🔥 WHAT WE FIXED TODAY (DO NOT UNDO)

### **1. Yellow Blob Overlays (FIXED)**
**Issue**: Gold gradient tooltips appearing on control room booking buttons.

**Root Cause**:
- `.booking-hotspot::after` had gold tooltip (`#FFB300`) on hover
- `.booking-hotspot::before` had arrow tooltip
- `.welcome-button` class had gold gradient in `rack-button-enhanced.css`

**Fix Applied**:
- **Disabled all `.booking-hotspot::after` and `::before` pseudo-elements** in `/public/static/control-room-hotspots.css`
- **Removed `.welcome-button` from gold gradient selectors** in `/public/static/rack-button-enhanced.css` (11 instances removed)
- Set `display: none` on all tooltip styles

**Files Changed**:
- `public/static/control-room-hotspots.css` (lines 101-150)
- `public/static/rack-button-enhanced.css` (removed `.welcome-button` from 11 selectors)

**Git Commits**:
- `ec26dbd` – "KILL YELLOW BLOBS: Disable all tooltip overlays"
- `84e39a1` – "FIX: Remove .welcome-button from rack-button-enhanced.css"

---

### **2. Black Space Between Racks (FIXED)**
**Issue**: Black bars visible between rack images (top/bottom padding from source images).

**Root Cause**:
- Used CSS `background-image: url(...)` with `background-size: cover` which centers images but shows black if image doesn't fill viewport
- Source images had black space baked in

**Fix Applied**:
- **Switched to `<img>` tags with `object-fit: cover`** in `/src/pages/SignageEnhancedV3.tsx`
- Added `.frame-bg-image` CSS class with `object-fit: cover` in `/public/static/signage-v3-enhanced.css`
- Images now seamlessly fill viewport and crop black bars automatically

**Files Changed**:
- `src/pages/SignageEnhancedV3.tsx` (line 114-121)
- `public/static/signage-v3-enhanced.css` (lines 70-87)

**Git Commit**:
- `9aae633` – "FIX: Black space between racks - switch to <img> tags with object-fit: cover"

---

### **3. Wrong Welcome Rack Image (FIXED)**
**Issue**: Old plain welcome rack was being used instead of rastafari-stripe version.

**Fix Applied**:
- **Replaced welcome rack images** with proper version:
  - Green panel with rastafari stripes (green/yellow/red horizontal bands)
  - "CRS WELCOME" text
  - "OXFORD GRASSROOTS CREATIVE INFRASTRUCTURE" tagline
- Generated 3 WebP sizes: 1920w, 1280w, 640w

**Files Changed**:
- `public/static/rack-images/welcome-rack-1920w.webp`
- `public/static/rack-images/welcome-rack-1280w.webp`
- `public/static/rack-images/welcome-rack-640w.webp`

**Git Commit**:
- `5b66f59` – "UPDATE: Replace welcome rack with proper rastafari-stripe version"

---

## 🎨 SIGNAGE SYSTEM (V3 – BRAND-ALIGNED)

**Route**: `/signage-enhanced`

**Purpose**: 55" Yodeck screen display for street window (high visibility from Cowley Road).

**Design Specs**:
- **75-90 second loop** (8 frames)
- **Typography**: JetBrains Mono, 7rem titles (112px), 2.2rem body (35px)
- **Colors**: CRS brand palette only
  - Base: `#0E0E0E`, `#23272B`
  - Structural: `#2E473B`, `#4F7942`
  - Highlight: `#C2A85A` (gold)
- **Motion**: Slow, mechanical, calm – NO gradients, NO neon, NO excessive motion
- **Contact Strip**: Email, website, phone at bottom (70px high)
- **Status Bar**: LIVE indicator, location, website (60px high)

**Frame Structure**:
1. Opening (6s) – "COWLEY ROAD STUDIOS"
2. Who We Are (10s) – "GRASSROOTS CREATIVE INFRASTRUCTURE"
3. The Studio (11s) – "PROFESSIONAL RECORDING" + VU meters
4. Rehearsals (9s) – "REHEARSAL SPACE"
5. Live & Showcase (9s) – "LIVE & SHOWCASE"
6. Workshop Café (9s) – "WORKSHOP CAFÉ"
7. Community (10s) – "EVOLVING ECOSYSTEM"
8. CTA (9s) – "BOOK NOW" + QR code

**Files**:
- `src/pages/SignageEnhancedV3.tsx`
- `public/static/signage-v3-enhanced.css`
- `public/static/signage-v3-enhanced.js`

**Key Features**:
- `object-fit: cover` for seamless image fill (no black bars)
- Persistent CRS badge (top-left)
- Ambient rack drift animation
- 3-layer parallax (max, slow motion)
- Keyboard controls: `→` (next), `←` (prev), `R` (restart)

---

## 🚀 DEPLOYMENT WORKFLOW

### **Sandbox Testing (REQUIRED BEFORE PRODUCTION)**

```bash
# 1. Build
cd /home/user/webapp && npm run build

# 2. Start with PM2
cd /home/user/webapp && pm2 restart cowleyroadstudios

# 3. Test
curl http://localhost:3000
# Or visit: https://3000-i120gm47ob6pt5yl54vy3-2e1b9533.sandbox.novita.ai

# 4. Check logs (non-blocking)
pm2 logs --nostream
```

**CRITICAL**: Always set **300s+ timeout** for npm commands (build, install, create).

---

### **Production Deployment (Cloudflare Pages)**

**Step 1: Setup Authentication** (REQUIRED)
```bash
# Call setup_cloudflare_api_key tool first
# This configures CLOUDFLARE_API_TOKEN environment variable
# If it fails, guide user to Deploy tab to set up API key
```

**Step 2: Git Push** (triggers auto-deploy)
```bash
cd /home/user/webapp
git add -A
git commit -m "Your commit message"

# IMPORTANT: Call setup_github_environment first if pushing fails
git push origin main
```

**Step 3: Manual Deploy** (if auto-deploy fails)
```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN="<token>"
npx wrangler pages deploy dist --project-name crs-web-1
```

**Step 4: Verify**
```bash
curl https://crs-web-1.pages.dev
curl https://cowleyroadstudios.com
```

---

## 🌍 LIVE URLS

**Production**:
- Main: https://crs-web-1.pages.dev
- Custom Domain: https://cowleyroadstudios.com
- Signage: https://cowleyroadstudios.com/signage-enhanced

**Sandbox**:
- https://3000-i120gm47ob6pt5yl54vy3-2e1b9533.sandbox.novita.ai

**GitHub**:
- https://github.com/captainburbseye-web/CRS-Web-1

---

## 🎨 BRAND ASSETS (READY TO USE)

Danny sent these assets – not yet integrated, but ready:

1. **CRS Badge Panel** – https://www.genspark.ai/api/files/s/heLqeUJz
   - Green industrial panel with CRS logo, traffic light buttons
   - Use for: signage header/badge replacement

2. **Cricket Warning Sign** – https://www.genspark.ai/api/files/s/ONr2ZXMF
   - Yellow diamond warning sign with cricket + guitar character
   - Use for: playful Oxford-focused signage

3. **Workshop Café Rack Panel** – https://www.genspark.ai/api/files/s/iobJd4v0
   - "THE BILLET BUILDING" header, waveform logo, level/volume knobs
   - "COFFEE • REPAIRS • MUSICAL CURIOS • TECH SOLUTIONS"
   - Use for: Workshop Café landing page or signage frame

4. **CRS Wordmark** – https://www.genspark.ai/api/files/s/ESMXtByt
   - Clean black background, white text, orange stripe
   - Use for: site header, footer, high-contrast contexts

5. **Stop CRS Traffic Controller** – https://www.genspark.ai/api/files/s/FMiYZtGt
   - Oxford street scene with cricket character as traffic warden
   - Use for: guerrilla marketing, social media, playful signage

---

## 🔧 COMMON ISSUES & SOLUTIONS

### **Issue: Yellow blobs appearing on buttons**
**Solution**: Check if `.welcome-button`, `.booking-hotspot::after`, or `.booking-hotspot::before` have been re-added. Remove immediately.

### **Issue: Black bars between rack images**
**Solution**: Ensure using `<img>` tags with `object-fit: cover`, NOT CSS `background-image`.

### **Issue: Git push rejected**
**Solution**: Call `setup_github_environment` first, then pull/rebase:
```bash
git pull --rebase origin main
git push origin main
```

### **Issue: Cloudflare deployment fails with auth error**
**Solution**: Call `setup_cloudflare_api_key` tool first. If still fails, guide user to Deploy tab.

### **Issue: PM2 process won't start**
**Solution**: Kill port 3000 first:
```bash
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart cowleyroadstudios
```

### **Issue: Wrangler build errors**
**Solution**: Clear cache and rebuild:
```bash
rm -rf .wrangler dist node_modules/.vite
npm run build
```

---

## 📝 GIT STATUS

**Latest Commits** (most recent first):
1. `5b66f59` – "UPDATE: Replace welcome rack with proper rastafari-stripe version"
2. `ec26dbd` – "KILL YELLOW BLOBS: Disable all tooltip overlays"
3. `73b1005` – Previous work
4. `9aae633` – "FIX: Black space between racks - switch to <img> tags"
5. `84e39a1` – "FIX: Remove .welcome-button from rack-button-enhanced.css"

**Branch**: `main` (production branch)

---

## 🎯 WHAT'S WORKING (DON'T BREAK)

✅ **Signage V3** – Brand-aligned 8-frame loop, street-visible text  
✅ **Control Room Hotspots** – Transparent hover states, no yellow blobs  
✅ **Welcome Rack** – Rastafari stripe version with proper tagline  
✅ **Rack Images** – Seamless viewport fill via `object-fit: cover`  
✅ **GitHub Auto-Deploy** – Push to main triggers Cloudflare Pages rebuild  
✅ **PM2 Daemon** – Sandbox service runs in background  

---

## 🚀 RECOMMENDED NEXT STEPS

1. **Integrate Brand Assets**:
   - Swap CRS badge in signage (use badge panel asset)
   - Add Workshop Café panel to signage frame
   - Create "Street Mode" signage variant (cricket sign + traffic controller)

2. **Workshop Café Landing Page**:
   - Dedicated route `/workshop-cafe`
   - Feature the rack panel asset prominently
   - "COFFEE • REPAIRS • MUSICAL CURIOS • TECH SOLUTIONS"

3. **Homepage Refinements**:
   - Update header/footer with CRS wordmark asset
   - Add cricket warning sign to footer (playful touch)

4. **Performance Optimization**:
   - Review WebP compression settings
   - Lazy load non-critical images
   - Minify CSS/JS if not already done

5. **Accessibility Audit**:
   - Test with screen readers
   - Verify WCAG 2.1 AA compliance
   - Check keyboard navigation

---

## 🤝 COORDINATION PROTOCOL

**If You Need to Make Breaking Changes**:
1. **Read this document first** – understand what's fixed
2. **Test in sandbox** before pushing to production
3. **Commit frequently** with clear messages
4. **Use feature branches** if making large changes
5. **Document your changes** in commit messages

**If You See Issues**:
- Check if they're related to today's fixes (yellow blobs, black bars, welcome rack)
- Review Git history: `git log --oneline -10`
- Check PM2 logs: `pm2 logs --nostream`
- Test sandbox before assuming production is broken

---

## 📊 PROJECT HEALTH CHECK

**Status**: ✅ STABLE  
**Build**: ✅ Passing  
**Deployment**: ✅ Auto-deploy active  
**Git**: ✅ Synced with GitHub  
**Production**: ✅ Live and accessible  

**Token Usage**: ~68k/200k used (32% remaining)

---

## 🎨 BRAND PHILOSOPHY (FROM DANNY)

**Tone**: Professional, human, grassroots creative infrastructure  
**Avoid**: Corporate tech hype, agency aesthetics, club flyer vibes  
**Colors**: CRS palette only – no gradients, no neon, no excessive motion  
**Typography**: JetBrains Mono (industrial, clean, panel-like)  
**Motion**: Slow, mechanical, calm – max 3 parallax layers  
**Messaging**: Serious sound. Open doors. Grassroots. Built for musicians.

---

## 📞 HANDOVER COMPLETE

**Summary**: Three critical fixes deployed today (yellow blobs, black bars, welcome rack). All production-ready. Signage system is brand-aligned and street-visible. GitHub/Cloudflare auto-deploy is active. PM2 runs sandbox. DO NOT re-enable tooltip overlays or switch back to CSS background-images.

**Good luck, Dev 2. Keep it tight, keep it clean, keep it grassroots.** 🎯🔧

---

**– Dev 1 (AI Agent), 2026-02-25**
