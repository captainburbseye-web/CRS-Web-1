# CRS COMPLIANCE VIOLATION CHECKLIST

**2-Minute Audit Tool**

Use this checklist to verify brand compliance in under 2 minutes.

---

## 🔍 QUICK AUDIT

**Run this before any deployment or after any changes.**

---

### ✅ HEADER (10 seconds)

- [ ] Left side shows: `CRS | Studio · Venue · AV`
- [ ] Right side shows: `Locations | Book | Contact`
- [ ] No logo image present
- [ ] No location text displayed
- [ ] No status indicators
- [ ] No dropdowns or buttons

**PASS:** Header is text-only, administrative, boring  
**FAIL:** Any decoration, branding, or emphasis detected

---

### ✅ HOMEPAGE HERO (10 seconds)

- [ ] Shows ONLY: "CRS operates studio and venue facilities in Oxford."
- [ ] Single sentence, no additional content
- [ ] No taglines
- [ ] No descriptions
- [ ] No images
- [ ] No CTAs in hero

**PASS:** One operational sentence only  
**FAIL:** Any expansion, decoration, or explanation

---

### ✅ LOCATION NAMING (20 seconds)

Check all instances of location references:

- [ ] All locations use format: `CRS — [Road Name]`
- [ ] No location-first naming (e.g., "Cowley Road Studios")
- [ ] No area names as primary identifiers (e.g., "Florence Park")
- [ ] Road names appear only after CRS
- [ ] Consistent separator: dash with spaces ` — `

**PASS:** CRS always appears first, roads second  
**FAIL:** Any location-first or CRS-absent naming

---

### ✅ PAGE TITLES (10 seconds)

Check browser tab titles:

- [ ] Format: `CRS — [Road Name]` or `CRS | [Page Name]`
- [ ] CRS appears first in all titles
- [ ] No reversed order (e.g., "Cowley Road | CRS")

**PASS:** CRS-first in all page titles  
**FAIL:** Any reversed or location-first titles

---

### ✅ FOOTER (15 seconds)

- [ ] Shows: "CRS Locations"
- [ ] Lists: "– Cowley Road"
- [ ] Lists: "– Cricket Road"
- [ ] Dash-prefixed list format
- [ ] No inline concatenation (e.g., "Cowley Road & Cricket Road")
- [ ] No explanation text

**PASS:** Quiet list format, no emphasis  
**FAIL:** Inline format or explanatory text

---

### ✅ BOOKING LANGUAGE (15 seconds)

Check all booking-related text:

- [ ] All booking references include "CRS" first
- [ ] Format: "Book CRS — [Location]" or "Select CRS location"
- [ ] No location-first booking (e.g., "Book Cowley Road")
- [ ] No "at" phrasing (e.g., "Book at Cricket Road")

**PASS:** CRS-first booking language  
**FAIL:** Location-first or "at" phrasing

---

### ✅ VISUAL COMPLIANCE (20 seconds)

Quick scan for prohibited elements:

- [ ] No animations on page load
- [ ] No fade effects
- [ ] No scale/zoom effects
- [ ] No hover motion (color change only acceptable)
- [ ] No accent color emphasis (beyond system palette)
- [ ] No card/panel metaphors
- [ ] No hero images or banners

**PASS:** Static, institutional, administrative feel  
**FAIL:** Any motion, emphasis, or decoration

---

### ✅ COPY VIOLATIONS (20 seconds)

Scan for prohibited language:

- [ ] No mention of "expansion", "growth", or "new location"
- [ ] No use of "network", "hub", "empire", "family"
- [ ] No explanatory text about CRS acronym
- [ ] No storytelling or narrative copy
- [ ] No qualifying adjectives (e.g., "premier", "leading")

**PASS:** Operational, factual, institutional tone  
**FAIL:** Marketing, storytelling, or explanatory language

---

### ✅ STRUCTURE VIOLATIONS (20 seconds)

Check for structural drift:

- [ ] No logo images anywhere (text-only branding)
- [ ] No location-specific custom branding
- [ ] No maps in hero sections
- [ ] No status indicators/lights
- [ ] No multiple CTAs above fold
- [ ] No descriptive hero content

**PASS:** Minimal, structural, system-first  
**FAIL:** Decoration, emphasis, or custom elements

---

## 🎯 SCORING

**Count violations:**

- **0 violations:** ✅ FULL COMPLIANCE
- **1-2 violations:** ⚠️ MINOR DRIFT — Fix immediately
- **3-5 violations:** 🚨 MODERATE DRIFT — Audit required
- **6+ violations:** ❌ CRITICAL DRIFT — Full rebuild needed

---

## 🔧 COMMON VIOLATIONS & FIXES

### ❌ VIOLATION: Location-first naming
**Example:** "Cowley Road Studios"  
**Fix:** Change to "CRS — Cowley Road"

### ❌ VIOLATION: Hero expansion
**Example:** Tagline + description + CTA  
**Fix:** Replace with single operational sentence

### ❌ VIOLATION: Footer concatenation
**Example:** "CRS — Cowley Road & Cricket Road"  
**Fix:** Change to list format with "CRS Locations" header

### ❌ VIOLATION: Logo image in header
**Example:** Hardware asset image  
**Fix:** Replace with text "CRS" in Archivo Black

### ❌ VIOLATION: Explanatory copy
**Example:** "CRS operates across two locations..."  
**Fix:** Remove explanation, let structure communicate

### ❌ VIOLATION: Booking button emphasis
**Example:** Colored button with animation  
**Fix:** Plain text link with subtle color change only

---

## 📋 PRE-DEPLOYMENT CHECKLIST

**Before any push to production:**

1. [ ] Run full 2-minute audit
2. [ ] Check git diff for prohibited changes
3. [ ] Verify no new HTML/CSS decorations added
4. [ ] Confirm no marketing copy introduced
5. [ ] Test on mobile for structure integrity
6. [ ] Review BRAND_GOVERNANCE.md if uncertain

**Only deploy if audit shows FULL COMPLIANCE.**

---

## ⚡ EMERGENCY AUDIT

**If site "feels wrong" but you can't identify why:**

1. Check header — Is it text-only?
2. Check hero — Is it one sentence?
3. Check footer — Is it a list?
4. Check naming — Is CRS always first?

**If any answer is "no", refer to BRAND_GOVERNANCE.md immediately.**

---

## 🎯 REMEMBER

**The structure enforces authority.**  
**Violations reintroduce uncertainty.**  
**Uncertainty destroys credibility.**

**When in doubt, delete.**

---

*Last Updated: 2026-01-11*  
*Version: 1.0.0*  
*Use this before every deployment.*
