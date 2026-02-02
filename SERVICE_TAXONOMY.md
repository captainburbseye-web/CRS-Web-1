# CRS Service Taxonomy & Routing Lock (Phase 4)

## Purpose

Define all live services by **intent**, **location**, and **routing** to prevent user confusion and operational drift.

---

## Canonical Service Types (DO NOT DEVIATE)

| Intent | Location | Type | Routing | Square Link |
|--------|----------|------|---------|------------|
| Band rehearsal | Cowley Road | Fixed, bookable | Square direct | `https://square.link/u/UQidDzE0` |
| Band rehearsal | Cricket Road | Fixed, bookable | Square direct | `https://square.link/u/WPqRFIGW` |
| Control Room — Dry Hire | Cricket Road | Fixed, bookable | Square direct | `https://square.link/u/bCOHXtdl` |
| Recording session | Cricket Road | Variable | Contact intake | `/contact?service=recording` |
| Recording session | Cowley Road (Big Booth) | Variable | Contact intake | `/contact?service=recording` |
| AV hire & repair | N/A | Consultative | Contact intake | `/contact?service=av` |

---

## Live Services (Square-Bookable)

### 1. Band Rehearsals — Cowley Road

**Address:** 118 Cowley Road, Oxford OX4 1JE  
**Type:** Fixed service, fixed duration  
**Button Label:** `BOOK REHEARSAL — COWLEY ROAD`  
**Square Link:** `https://square.link/u/UQidDzE0`  
**Microcopy:** `Rehearsal use only · Cowley Road`  

---

### 2. Band Rehearsals — Cricket Road

**Address:** 92 Cricket Road, Oxford OX4 3DJ  
**Type:** Fixed service, fixed duration  
**Button Label:** `BOOK REHEARSAL — CRICKET ROAD`  
**Square Link:** `https://square.link/u/WPqRFIGW`  
**Microcopy:** `Rehearsal use only · Cricket Road`  

---

### 3. Control Room — Dry Hire

**Address:** 92 Cricket Road, Oxford OX4 3DJ  
**Type:** Fixed service, bookable, no engineer  
**Button Label:** `BOOK CONTROL ROOM — DRY HIRE`  
**Square Link:** `https://square.link/u/bCOHXtdl`  
**Microcopy:** `Dry hire only · No engineer included`  
**Description:** Monitoring and control room access. No engineer included. Ideal for independent production, mixing, and mastering work.

---

## Contact-Intake Services (NOT Square-Bookable Yet)

### Recording Sessions

**Locations:** Cricket Road, Cowley Road (Big Booth)  
**Type:** Variable, consultative  
**Routing:** `/contact?service=recording`  
**Reason:** Rates, engineer availability, and session scope are not yet deterministic.

**When to move to Square:**
- Rates are locked
- Engineer availability is predictable
- Session scope is standardized

---

### AV Services & Live Sound

**Type:** Consultative, custom scoping  
**Routing:** `/contact?service=av`  
**Reason:** Each project requires scope discussion; no calendar-based booking.

---

## Master Routing Rule

> **If it has a predictable calendar → Square direct link**  
> **If it requires scope discussion → Contact intake**

---

## Implementation Standards

### Button Wording (Verbatim)

All buttons must use exact wording everywhere (website + signage):

- `BOOK REHEARSAL — COWLEY ROAD`
- `BOOK REHEARSAL — CRICKET ROAD`
- `BOOK CONTROL ROOM — DRY HIRE`

No variations. No abbreviations.

### Address Display

All service pages must clearly display the physical address in monospace font:

```
118 Cowley Road, Oxford OX4 1JE
```

or

```
92 Cricket Road, Oxford OX4 3DJ
```

### Square Link Protocol

- All links must be **direct** (no intermediate "select service" flows)
- Links must open in **new tab** (`target="_blank"`)
- Links must be **canonical** (no shortened URLs)
- No hardcoded pricing (use Square as source of truth)

---

## Non-Bookable Services (Future)

These services are **NOT** available for booking yet:

- ❌ Recording sessions (contact-led)
- ❌ Big Booth sessions (contact-led)
- ❌ Studio sessions (contact-led)

These may move to Square in the future, but **only after** rates and scope are locked.

---

## Deployment Checklist

Before any service goes live:

- [ ] Service has a clear, single intent
- [ ] Routing is unambiguous (Square OR Contact)
- [ ] Button wording matches this document verbatim
- [ ] Address is displayed on the service page
- [ ] Square link is tested and resolves correctly
- [ ] No future-facing language ("coming soon", "launching", etc.)
- [ ] Signage matches website copy exactly

---

## Why This Matters

This taxonomy prevents:

- ❌ User confusion (multiple ways to book same service)
- ❌ Underpriced recording (no calendar chaos)
- ❌ Mixed calendars (one service = one calendar)
- ❌ Future rewrites (clear rules for expansion)

---

## Future Expansion

When recording services move to Square:

1. Rates must be locked
2. Engineer availability must be deterministic
3. Session scope must be standardized
4. New Square services must be created
5. This document must be updated
6. Website and signage must be synchronized

---

**Status:** LIVE OPERATIONS ROUTING LOCK  
**Last Updated:** 2026-02-02  
**Owner:** Cowley Road Studios Web Team  

---

**This is the canonical reference for all service routing. All changes must be approved and documented here.**
