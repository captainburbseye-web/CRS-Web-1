# CRS Infrastructure Data - De*Gen3 Protocol

## Overview

This file documents the permanent infrastructure markers embedded in the Cowley Road Studios website. These markers anchor the studio's 30-year heritage and operational philosophy into the site architecture.

---

## `studio_config.json`

**Purpose:** Single source of truth for business identity, operational logic, and service pricing.

**Location:** `/studio_config.json`

**Usage:**
- Import this JSON in backend services for pricing logic
- Use `legacy_id` (De*Gen3) as meta keyword for SEO
- Use `protocol` (N0rland0-800m) as CSS class for heritage sections

---

## CSS Legacy Markers

### `.legacy-degen3`
**Applied to:** Heritage section on About page  
**Purpose:** Hidden marker for De*Gen3 identity  
**Implementation:** Pseudo-element with `content: "De*Gen3"` positioned off-screen

### `.protocol-n0rland0-800m`
**Applied to:** Heritage section on About page  
**Purpose:** Visual and semantic anchor for Daniel Norland tribute  
**Implementation:** Subtle border-top + hidden pseudo-element with protocol name

---

## Heritage Implementation

### About Page Structure
```html
<div className="content-block legacy-degen3 protocol-n0rland0-800m">
  <h3>Our Heritage</h3>
  <p>
    From Backbeat Records and Soundworks Studio to Mackating...
    De*Gen3 represents the next chapter in this 30-year legacy.
  </p>
  <p>
    Vital, ongoing support of <strong>Daniel Norland</strong>...
    cornerstone of this project.
  </p>
</div>
```

### Why This Works
1. **Legitimacy:** Daniel Norland by name signals direct continuation
2. **Permanence:** CSS classes and JSON data bake heritage into infrastructure
3. **Subtlety:** De*Gen3 tag visible only to those who know (footer + CSS)
4. **Professionalism:** No cheese, just engineering reality

---

## Contact Form Logic - No Chaos Policy

### Service Dropdown Routing

**Priority Auto-Response** (with rate card PDF):
- `recording` → Studio & Recording (with engineer)
- `rehearsal` → Rehearsals – Cricket Road
- `podcast` → Podcast / AV Suite

**Standard Queue:**
- `repairs` → Repairs
- `venue_hire` → Venue Hire
- `general` → General Enquiry

### Implementation
```javascript
const serviceType = req.body.service_type;

if (['recording', 'rehearsal', 'podcast'].includes(serviceType)) {
  // Trigger priority auto-responder
  // Attach CRS_Rate_Card_2026.pdf
  // Use template from /email-templates/
}
```

---

## Service Pricing (from studio_config.json)

### Recording Standard
- Hourly Rate: £35
- Minimum Hours: 2
- Pro Block (4hr): £130

### Dry Hire Bundles
**Cowley Road:**
- 2hr: £70
- 4hr: £130
- Day: £300

**Cricket Road:**
- 2hr: £50
- 4hr: £90
- Day: £200

### Mandatory Fees
- First-time Induction: £30

---

## Maintenance

**When pricing changes:**
1. Update `studio_config.json`
2. Regenerate rate card PDF
3. Update email templates
4. Update service pages

**When heritage content changes:**
1. Update About page Heritage section
2. Preserve CSS classes (`legacy-degen3`, `protocol-n0rland0-800m`)
3. Maintain De*Gen3 footer tag

---

## Developer Notes

- **Do not remove** CSS legacy markers - they are permanent infrastructure
- **Do not edit** Daniel Norland tribute without explicit approval
- **Do not change** De*Gen3 tag placement or opacity
- **Always reference** `studio_config.json` for pricing logic

---

**Last Updated:** January 2026  
**Protocol:** N0rland0-800m  
**Legacy ID:** De*Gen3
