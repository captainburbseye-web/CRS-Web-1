# ✅ GLOBAL RACK RESET — Complete Implementation

**Applied:** 2026-03-08  
**Commit:** `c3ca7c9`  
**Status:** ✅ LIVE on production (https://cowleyroadstudios.com)

---

## 🎯 Problem Statement

User reported multiple issues with rack UI:
1. **Rack outline drifting** with unwanted grey/black backgrounds
2. **Vertical spacing gaps** between rack modules
3. **Button/label misalignment** across all racks
4. **Booking link confusion** — users couldn't tell there were TWO location options

---

## 🔧 Solution: Three-Phase Fix

### Phase 1: Global Rack Reset (This Commit)
**File:** `/public/static/crs-consolidated-rack.css`

```css
/* GLOBAL RACK RESET - ZERO-DRIFT FOUNDATION */
.master-rack-chassis {
    display: flex !important;
    flex-direction: column !important;
    line-height: 0 !important;      /* Kills descender gap */
    font-size: 0 !important;        /* Kills inline spacing */
    background-color: #111 !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
}

.rack-module-graphic {
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    position: relative !important;  /* Hotspot anchor */
}

.rack-module-img {
    display: block !important;      /* Physical block behavior */
    width: 100% !important;
    height: auto !important;
}
```

**Key Technical Decisions:**
- **`line-height: 0`** — Eliminates invisible baseline/descender spacing below images
- **`font-size: 0`** — Removes inline-block whitespace between elements
- **`display: block`** — Forces images to behave like physical hardware units
- **All `!important`** — Overrides 20+ conflicting legacy CSS files

---

### Phase 2: Two-Location Visual Feedback (Previous Commit)
**File:** `/public/static/rack-emergency-fixes.css`  
**Commit:** `48f1c18`

**Problem:** Both Cowley & Cricket booking links were present in HTML, but users couldn't see TWO clickable zones.

**Solution:**
1. **Hover Labels** — Show "COWLEY ROAD" (green) / "CRICKET ROAD" (purple) on hover
2. **Border Glow** — Top panel gets green glow, bottom panel gets purple glow
3. **Z-index Fix** — Ensure both panels are at `z-index: 10`

```css
.recording-cowley-panel::after {
  content: 'COWLEY ROAD';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  color: rgba(76, 175, 80, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.recording-cowley-panel:hover::after {
  opacity: 1;
}
```

**Result:** Users now clearly see two clickable areas per rack.

---

### Phase 3: Button Alignment (Pending User Instructions)

**Current Status:** ⏳ Awaiting detailed instructions

**Known Issues:**
- ODRO buttons/labels "slightly to the right of their target"
- User will provide specific positioning requirements

**Prepared Fix Strategy:**
- Adjust ODRO button percentages (currently `left: 27%, 50%, 73%`)
- Fine-tune label `top: 120%` offset to sit precisely on yellow strips
- Verify Welcome rack button alignment (currently `left: 8%, 25%, 42%, 59%, 76%`)

---

## 📊 Technical Specifications

### CSS Load Order (from `src/renderer.tsx`)
1. **Preload:** `crs-consolidated-rack.css` (line 93)
2. **Critical Load:** Line 99, 105
3. **Emergency Fixes:** `rack-emergency-fixes.css` (line 175)
4. **Manifesto:** `rack-ui-manifesto.css` (line 176)

**Priority:** Global reset loads first, emergency fixes override last.

---

## 🧪 Testing Checklist

### ✅ Completed
- [x] Zero vertical gaps between rack modules
- [x] No unwanted grey/black backgrounds
- [x] Both location links visible on hover (Recording & Rehearsal racks)
- [x] Wooden frame consistency
- [x] ODRO rack no longer cut off at bottom

### ⏳ Pending User Verification
- [ ] ODRO button lights clickable at correct position
- [ ] ODRO labels sit precisely on yellow strips
- [ ] Welcome rack buttons aligned with wood frame graphics
- [ ] Control Room buttons aligned with button graphics

---

## 🔗 Deployment URLs

- **Production:** https://cowleyroadstudios.com (commit `c3ca7c9`)
- **Sandbox:** https://5173-izpk336dk1tjnllvoqcmk-5c13a017.sandbox.novita.ai

---

## 📁 Modified Files

### This Commit (c3ca7c9)
```
public/static/crs-consolidated-rack.css  +39 -7 lines
```

### Previous Related Commits
```
48f1c18  fix: add hover labels for two-location booking
41fe982  fix: emergency rack UI corrections (ODRO cutoff, alignment)
37ffc8e  feat: implement SSL/Cricket hybrid vintage console aesthetic
0520122  feat: implement Rack UI Manifesto (10 Laws of Zero-Drift)
```

---

## 🎨 Visual Design System

### Rack Chassis
- **Max Width:** 1200px (centered)
- **Background:** #111 (dark charcoal)
- **Rack Ears:** 20px left/right padding (metal rails via pseudo-elements)
- **Vertical Gaps:** 0px (enforced via global reset)

### Location Color Coding
- **Cowley Road:** Green (#4CAF50) glow
- **Cricket Road:** Purple (#9C27B0) glow

### Typography
- **Labels:** JetBrains Mono, uppercase, 1.5rem (location labels)
- **ODRO Labels:** 10px, 700 weight, black on yellow strip

---

## 🚀 Next Steps

1. **User provides detailed button positioning instructions**
2. Apply precise percentage adjustments to ODRO/Welcome/Control Room buttons
3. Fine-tune label offsets
4. Test on production
5. Create final "Rack UI Battle-Tested" certification document

---

## 📝 Notes

- All fixes use `!important` to override 20+ legacy CSS files
- Metal rack rails use `pointer-events: none` to preserve booking hotspots
- Global reset is the foundation — all future rack work builds on this
- User feedback loop: Screenshot → Markup → Percentage adjustment → Test

---

**Last Updated:** 2026-03-08  
**Next Review:** After user provides detailed button positioning instructions
