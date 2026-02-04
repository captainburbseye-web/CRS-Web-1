# CRS BRAND GOVERNANCE

**Structural Brand Authority (Multi-Location, Web-First)**

---

## ROLE

This document enforces **brand authority through structure, hierarchy, naming, repetition, and symmetry**.

This is not marketing. This is system law.

If something feels expressive, clever, promotional, or explanatory — **it violates this governance**.

---

## CORE BRAND RULE (LOCKED)

**CRS is the brand.**  
**Roads are locations.**

This hierarchy is absolute and must never be inverted.

### ✅ Correct

* CRS — Cowley Road
* CRS — Cricket Road

### ❌ Incorrect

* Cowley Road Studios (as primary brand)
* Cricket Road Studio
* Any location-first naming
* Any road name without CRS preceding it

**CRS must always appear first.**

---

## IMPLEMENTATION RULES

### 1️⃣ GLOBAL HEADER (ALL PAGES)

Persistent header across the entire site.

**Left:**
```
CRS | Studio · Venue · AV
```

**Right:**
```
Locations | Book | Contact
```

**Rules:**
* "Locations" is always plural
* No animation
* No emphasis
* No descriptive copy
* Header must feel administrative

**Current Implementation:**
```html
<header class="crs-header">
  <div class="header-left">
    <a href="/" class="header-brand">CRS</a>
    <nav class="header-services">
      <a href="/studio">Studio</a>
      <span class="separator">·</span>
      <a href="/venue">Venue</a>
      <span class="separator">·</span>
      <a href="/av-services">AV</a>
    </nav>
  </div>
  <nav class="header-actions">
    <a href="/locations">Locations</a>
    <span class="separator">|</span>
    <a href="/book">Book</a>
    <span class="separator">|</span>
    <a href="/contact">Contact</a>
  </nav>
</header>
```

---

### 2️⃣ LOCATION SELECTOR (ANYWHERE USED)

Always display locations as:

* CRS — Cowley Road
* CRS — Cricket Road

**Rules:**
* No icons
* No maps
* No explanation
* Neutral ordering
* Identical typography and weight

This must feel like selecting a terminal, not discovering a venue.

---

### 3️⃣ PAGE TITLES & METADATA

All page titles must follow this exact format:

```
CRS — [Road Name]
```

**Never reverse the order.**

**Never:**
* Cowley Road Studios | CRS
* CRS at Cowley Road
* Any variation that foregrounds the location

Meta descriptions must use the **same sentence structure** across all locations, differing only by road name.

---

### 4️⃣ HOMEPAGE (ABOVE THE FOLD)

One sentence only:

> **CRS operates studio and venue facilities in Oxford.**

**Rules:**
* No expansion
* No qualification
* No future language
* No explanation

This sentence must stand alone.

**Current Implementation:**
```html
<section class="crs-hero">
  <div style="max-width: 600px; margin: 0 auto; padding: 4rem 2rem;">
    <p class="operational-statement">CRS operates studio and venue facilities in Oxford.</p>
  </div>
</section>
```

---

### 5️⃣ LOCATION PAGES (MANDATORY SYMMETRY)

All CRS location pages must share **identical structure**, regardless of differences in facilities.

**Required order:**

1. H1: `CRS — [Road Name]`
2. Address block (plain, utility tone)
3. "What operates here" (bullet list only)
4. Booking CTA
5. Access / hours
6. Global footer

**Identical layout = perceived system.**  
Do not customise structure per location.

---

### 6️⃣ BOOKING LANGUAGE

All booking language must reference CRS first.

**Correct:**
* "Book CRS — Cowley Road"
* "Select CRS location"

**Incorrect:**
* "Book Cowley Road Studio"
* "Book at Cricket Road"

Booking must feel procedural, not experiential.

---

### 7️⃣ FOOTER (QUIET SCALE SIGNAL)

Footer must include:

```
CRS Locations
– Cowley Road
– Cricket Road
```

**Rules:**
* No additional copy
* No explanation
* No emphasis
* Repetition is the authority signal

**Current Implementation:**
```html
<div class="footer-bottom">
  <p class="footer-locations-header">CRS Locations</p>
  <p class="footer-location-item">– Cowley Road</p>
  <p class="footer-location-item">– Cricket Road</p>
  <p class="footer-contact">
    CONTACT: <a href="mailto:info@cowleyroadstudios.com">info@cowleyroadstudios.com</a>
  </p>
</div>
```

---

## STRICT PROHIBITIONS (NON-NEGOTIABLE)

❌ Do not explain the CRS acronym  
❌ Do not reference expansion, growth, or second locations  
❌ Do not use "network", "hub", "empire", or similar language  
❌ Do not introduce bespoke branding per road  
❌ Do not use maps as hero elements  
❌ Do not add animation, motion, or narrative  
❌ Do not add "helpful" explanatory text  

**If something feels clever — remove it.**

---

## CSS PROHIBITIONS

❌ No animations  
❌ No fades  
❌ No scale  
❌ No hover motion  
❌ No accent colors (beyond existing system)  
❌ No background panels  
❌ No card metaphors  

**If it looks designed, you've gone too far.**

---

## DESIGN PHILOSOPHY (ENFORCEMENT)

Multiple locations should feel **boring**.

**Boring = operational**  
**Operational = credible**  
**Credible = authority**

CRS should feel like it quietly owns the map because the structure assumes it does.

---

## SUCCESS TEST (INTERNAL)

A first-time visitor must immediately understand:

* CRS is the system
* CRS operates on more than one road
* This is already normal

**If any of this requires explanation, simplify further.**

---

## FINAL INSTRUCTION

Optimise for **inevitability through structure**.

Do not optimise for excitement, storytelling, or novelty.

**CRS first.**  
**Roads second.**  
**Always.**

---

## GOVERNANCE ENFORCEMENT

This document supersedes all design preferences, marketing instincts, and creative impulses.

**Violations must be corrected immediately.**

Reference this document before:
* Adding any new content
* Modifying navigation
* Creating new pages
* Writing any copy
* Making any layout changes

**If it's not in this document, it's probably wrong.**

---

*Last Updated: 2026-01-11*  
*Version: 1.0.0*  
*Status: LOCKED*
