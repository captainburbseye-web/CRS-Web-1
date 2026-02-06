# 🎛️ WORKSHOP CAFÉ MODE — DEPLOYMENT COMPLETE

## ✅ PRODUCTION STATUS

**Production URL:** https://cowleyroadstudios.com/workshop-cafe  
**Latest Build:** https://da77ab31.cowleyroadstudios.pages.dev  
**Commit Hash:** `ec575c2`  
**Status:** 🟢 **LIVE IN PRODUCTION**

---

## 🎯 WHAT WAS DEPLOYED

### Mode Switch Implementation

**Trigger:** Navigate to `/workshop-cafe`  
**Effect:** Apply `.wsc-mode` class to `<body>`  
**Scope:** Page-specific, no cross-route contamination  
**Reversibility:** Leave page = exit mode

### Visual Changes (Controlled Warmth)

| Element | CRS Default | WSC Mode |
|---------|-------------|----------|
| Panel BG | `#2d4a2d` | `#3a4a3a` (warmer) |
| LED Color | `#44ff44` (green) | `#ffaa44` (amber) |
| Shadows | Hard | Softer |
| Spacing | Tight | +0.5rem open |

### Components Added

1. **Venue Welcome Rack**
   - Orange LED indicator
   - Capacity: 25 seated / 60 standing
   - Use-case grid (hardware labels)
   - CTA: [ BOOK WORKSHOP CAFÉ ]

2. **Use-Case Grid** (Hardware Label Style)
   ```
   [ listening sessions ]
   [ film screenings ]
   [ workshops & classes ]
   [ talks & discussions ]
   [ private bookings ]
   ```

3. **Capacity Specs** (Terminal Data Format)
   - Displayed as technical specifications
   - No promotional language

---

## 🔒 BOUNDARIES MAINTAINED

### Does NOT Ship
- ❌ "Oxford's most adaptable..."
- ❌ "Run your thing"
- ❌ Cycling text / animation
- ❌ Emojis
- ❌ Video tiles
- ❌ Icon grids
- ❌ Marketing tone

### Does Ship
- ✅ Same rack structure
- ✅ Same navigation
- ✅ Operational language only
- ✅ Warmth via color + spacing
- ✅ Hardware discipline maintained

---

## 📦 FILES CHANGED

```
/public/static/crs-wsc-mode.css   ← NEW (3.4 KB)
/src/index.tsx                     ← Updated Workshop Café route
/src/renderer.tsx                  ← Added CSS link
.gitignore                         ← Added deploy.sh
deploy.sh                          ← NEW (deployment helper)
.dev.vars                          ← Added wrangler token
```

---

## 🚀 DEPLOYMENT PROCESS

### Tokens Configured
- ✅ **MailChannels token:** `cBv0GhhmxNAmiRu0tkt800uxUau-VbHd0spMX0ck` (Worker API use)
- ✅ **Wrangler token:** `oTUVovh8rdXxkM6gc4Pmi2d-HhZ5uXu-P7Vzq85q` (deployment)

### Quick Deploy Command
```bash
cd /home/user/webapp
./deploy.sh
```

Or manual:
```bash
cd /home/user/webapp
npm run build
export CLOUDFLARE_API_TOKEN="oTUVovh8rdXxkM6gc4Pmi2d-HhZ5uXu-P7Vzq85q"
npx wrangler pages deploy dist --project-name cowleyroadstudios
```

---

## 🧪 VERIFICATION

### Check Mode is Active
```bash
curl -s https://cowleyroadstudios.com/workshop-cafe | grep "wsc-mode"
```

### Check Use-Case Labels
```bash
curl -s https://cowleyroadstudios.com/workshop-cafe | grep "listening sessions"
```

### Visual Inspection
1. Visit: https://cowleyroadstudios.com/workshop-cafe
2. Check for:
   - Orange LED on rack unit
   - Warmer panel background
   - Use-case label grid
   - Capacity specifications
   - [ BOOK WORKSHOP CAFÉ ] CTA

---

## 🎚️ MODE SWITCH ARCHITECTURE

### CSS Variable Overrides
```css
body.wsc-mode {
  --panel-green: #3a4a3a;         /* warmer vs #2d4a2d */
  --panel-green-light: #4a5a4a;
  --panel-green-dark: #2a3a2a;
  --led-green: #ffaa44;            /* amber vs #44ff44 */
  --led-glow: rgba(255, 170, 68, 0.6);
  --panel-shadow: rgba(0, 0, 0, 0.5);  /* softer */
  --text-gold: #e8b84d;            /* warmer */
  --text-cream: #f8ecd8;
}
```

### Component Classes
- `.wsc-use-case-grid` - Grid layout for labels
- `.wsc-use-case-label` - Hardware label styling
- `.wsc-capacity-spec` - Capacity display
- `.wsc-event-log` - Event log panel (optional, not yet implemented)

---

## 📧 MAILCHANNELS STATUS

**Implementation:** ✅ Complete  
**DNS Records:** 🟡 Pending (SPF + DMARC)  
**Token Required:** ❌ No (MailChannels is free for Workers)

### Required DNS Records

**Record 1: SPF**
```
Type:     TXT
Name:     @
Content:  v=spf1 include:relay.mailchannels.net ~all
```

**Record 2: DMARC**
```
Type:     TXT
Name:     _dmarc
Content:  v=DMARC1; p=none; rua=mailto:dmarc@cowleyroadstudios.com
```

After adding records:
1. Wait 5-10 minutes for propagation
2. Test: https://cowleyroadstudios.com/contact
3. Check: info@cowleyroadstudios.com inbox

---

## 🎯 NEXT SAFE OPTIONS

**1)** Event Log Panel (terminal readout style)  
**2)** Booking form copy specific to Workshop Café  
**3)** Workshop Café signage copy (matches mode aesthetic)  
**4)** Internal capacity/pricing table (for Oli)

---

## 🔐 SECURITY NOTES

- ✅ `.dev.vars` gitignored (contains tokens)
- ✅ `deploy.sh` gitignored (contains token)
- ✅ Tokens stored locally only
- ✅ No tokens in Git history
- ✅ No tokens in client-side code

---

**Deployed:** 2026-01-15 18:00 UTC  
**Build Size:** 133.11 kB  
**Deployment Time:** ~10 seconds  
**Status:** 🟢 PRODUCTION STABLE
