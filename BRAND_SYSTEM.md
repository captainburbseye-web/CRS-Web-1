# CRS Brand System & Component Reference

## 1. Brand Metaphor

This is a **live console**. A working system. Not a marketing site.

Every element serves operational clarity. No decoration. No speculation. No future promises.

---

## 2. Component Map

| Component | Purpose | Usage |
|-----------|---------|-------|
| `.rack-module` | Heavyweight institutional panel | Applied deliberately to revenue-driving sections (Band Rehearsals, AV Services) |
| `.technical-label` | Status indicator / label | Monospace, uppercase, mustard color (#E3B04B) |
| `.button-primary` | Command action / CTA | Orange border (#FF9F1C), transparent background, glow effect |
| `.rack-led` | Availability signal | Green (active), Orange (status), Yellow (studio), Red (inactive) |
| `.rack-copy` | Body text inside panels | White, 1.25rem, max 72ch width, calm and readable |

---

## 3. Typography + Scale

### Header
- **Logo:** 128px (locked, non-negotiable)
- **Navigation:** 12px uppercase, Oswald font
- **BOOK NOW button:** 16px, Oswald, orange border

### Rack Modules
- **H2 (Desktop):** 4.2rem, uppercase, white, line-height 0.95
- **H2 (Mobile):** 2.4rem, uppercase, white
- **Body text:** 1.25rem, white, rgba(255,255,255,0.9)
- **Technical labels:** 1.05rem, mono, uppercase, mustard
- **Microcopy:** 0.875rem, secondary text, rgba(255,255,255,0.65)

### Mobile Breakpoint
- **Breakpoint:** 768px
- **Rack padding (mobile):** 2rem (reduced from 4rem)
- **H2 size (mobile):** 2.4rem (reduced from 4.2rem)

---

## 4. Section Order Standard

**Homepage sections must appear in this order:**

1. **System Status** (operational status, available services)
2. **Studio Sessions** (recording/production)
3. **Band Rehearsals — Cowley Road** (primary location, rack-module applied)
4. **Band Rehearsals — Cricket Road** (secondary location)
5. **Workshop Café** (public access, events)
6. **AV Services & Live Sound** (technical services, rack-module applied)
7. **Public Access & Community** (contact, subsidized rates)

---

## 5. System Rules

### CTA Hierarchy
- **One primary CTA per module** — no competing buttons
- **Primary CTAs:** BOOK SESSION, BOOK REHEARSAL (both locations), LEARN MORE (secondary)
- **Visual distinction:** Primary buttons are orange with glow; secondary buttons are muted

### Booking & Links
- **Canonical Square links only** — no hardcoded booking pages
- **Cowley Road rehearsals:** `https://square.link/u/UQidDzE0`
- **Cricket Road rehearsals:** `/book` (internal booking system)
- **All booking CTAs open in new tab** (`target="_blank"`)

### Copy Standards
- **No "coming soon" language** — if it's not live, don't mention it
- **No hardcoded pricing** — use microcopy format: "£45 / 2 hours · Rehearsal use only"
- **No future promises** — no pre-sale language, no speculative services
- **No marketing fluff** — every sentence serves operational clarity

### Rack-Module Application
- **Applied deliberately, never globally**
- **Current modules:** System Status, Band Rehearsals (Cowley Road), AV Services
- **Future rollout:** Only after visual validation and strategic decision
- **Do not apply to:** Workshop Café, Contact pages, Booking flows, Footer

---

## 6. What Is Already Locked

### Locked Components
- ✅ Rack-module system (CSS, spacing, typography)
- ✅ Booking flow (Square integration, post-checkout redirect)
- ✅ Header scale (128px logo, sticky positioning)
- ✅ No Chaos policy (scheduled access, signal-managed capacity)
- ✅ Section order (Cowley Road first, then Cricket Road, then services)

### Locked Design Decisions
- ✅ Monospace typography for technical labels (JetBrains Mono)
- ✅ Mustard accent color (#E3B04B) for status/labels
- ✅ Orange primary button color (#FF9F1C)
- ✅ Dark background (#0D1912, #1a1a1a)
- ✅ Rack aesthetic (borders, LED indicators, hardware metaphor)

### Locked Operational Standards
- ✅ Cowley Road is primary location (always listed first)
- ✅ Cricket Road is secondary/overflow
- ✅ Workshop Café is public-facing community space
- ✅ AV Services is technical/hire offering
- ✅ No speculative language about future phases

---

## 7. Deployment Checklist

Before any change goes live:

- [ ] Copy matches operational reality (no future-facing language)
- [ ] CTAs are unambiguous (one primary per section)
- [ ] Mobile padding and font sizes are correct
- [ ] Booking links resolve to live Square or internal system
- [ ] Signage and website tell the same operational truth
- [ ] No global CSS changes (only scoped modifications)
- [ ] Header remains sticky and visible
- [ ] Rack-module styling is applied only where intended

---

## 8. Future Rollout Decisions

### Rack-Module Phase 3+ (Pending Validation)
- **Phase 1:** System Status ✅ (deployed)
- **Phase 2:** Band Rehearsals (Cowley Road) ✅ (deployed)
- **Phase 2:** AV Services ✅ (deployed)
- **Phase 3:** Contact / Public Access (pending visual review)
- **Phase 4+:** Only after explicit approval and strategic alignment

### Copy & Messaging Updates
- All updates must be validated against operational reality
- No "coming soon" language without explicit approval
- Pricing must be reviewed by management before deployment
- Signage updates must be synchronized with website updates

---

## 9. Contact & Governance

**System Owner:** Cowley Road Studios Web Team  
**Last Updated:** 2026-02-02  
**Status:** Live Operations  

For changes to this system, contact the development team.

---

## 10. Quick Reference: Component Classes

```css
/* Apply to sections that need heavyweight institutional weight */
<section class="rack-module">

/* Apply to status labels and technical indicators */
<span class="technical-label">AVAILABLE NOW</span>

/* Apply to primary booking buttons */
<a class="button-primary">BOOK SESSION</a>

/* Apply to LED status indicators */
<span class="rack-led led-active"></span>

/* Apply to body text inside rack modules */
<p class="rack-copy">...</p>
```

---

**This document is the canonical reference for CRS brand and system standards. All changes must be approved and documented here.**
