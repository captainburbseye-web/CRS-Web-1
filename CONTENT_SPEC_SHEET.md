# CRS CONTENT SPECIFICATION SHEET
**ODRO Engineering Standard · Content Layer Upgrade**  
**Date: 2026-02-24**

---

## MISSION BRIEF

Add information density to rack interface without breaking aesthetic coherence.  
**Format:** Console-style spec sheets in JetBrains Mono.  
**Voice:** Direct, technical, confident — no fluff.  
**Goal:** Answer "what/why/how much" in under 5 seconds per panel.

---

## CH-01: RECORDING SERVICES

### COWLEY ROAD STUDIOS

```
┌─────────────────────────────────────────────┐
│ CH-01A :: COWLEY ROAD RECORDING             │
├─────────────────────────────────────────────┤
│ [CAPACITY]      1-5 musicians + engineer    │
│ [ROOM TYPE]     Control + live isolation    │
│ [ENGINEER]      Included in all sessions    │
│ [SESSION]       Half-day / full-day blocks  │
│ [STANDARD]      ODRO Engineering Protocol   │
│ [POLICY]        No Chaos — see /about       │
├─────────────────────────────────────────────┤
│ Professional recording with experienced     │
│ engineer. Analog & digital hybrid workflow. │
│ Mixing, tracking, overdubs, vocal sessions. │
└─────────────────────────────────────────────┘
```

### CRICKET ROAD STUDIO

```
┌─────────────────────────────────────────────┐
│ CH-01B :: CRICKET ROAD RECORDING            │
├─────────────────────────────────────────────┤
│ [CAPACITY]      1-4 musicians + engineer    │
│ [ROOM TYPE]     Compact control + booth     │
│ [ENGINEER]      Included in all sessions    │
│ [SESSION]       Half-day / full-day blocks  │
│ [STANDARD]      ODRO Engineering Protocol   │
│ [SPECIALTY]     Vocals, overdubs, podcasts  │
├─────────────────────────────────────────────┤
│ Intimate recording space. Perfect for solo  │
│ artists, voice work, and focused sessions.  │
│ Same engineering standard, tighter workflow.│
└─────────────────────────────────────────────┘
```

---

## CH-02: REHEARSAL SERVICES

### COWLEY ROAD REHEARSAL

```
┌─────────────────────────────────────────────┐
│ CH-02A :: COWLEY ROAD REHEARSAL             │
├─────────────────────────────────────────────┤
│ [CAPACITY]      4-6 piece band              │
│ [EQUIPMENT]     Backline provided           │
│ [PA SYSTEM]     Full monitoring available   │
│ [DURATION]      2hr / 3hr / 4hr blocks      │
│ [PRICING]       £45 (2h) · £60 (3h) · £65 (4h)│
│ [ACCESS]        Load-in at ground level     │
├─────────────────────────────────────────────┤
│ Full-size rehearsal room with professional  │
│ backline and PA. Drum kit, bass/guitar amps,│
│ mics, monitors. Book online via Square.     │
└─────────────────────────────────────────────┘
```

### CRICKET ROAD REHEARSAL

```
┌─────────────────────────────────────────────┐
│ CH-02B :: CRICKET ROAD REHEARSAL            │
├─────────────────────────────────────────────┤
│ [CAPACITY]      3-5 piece band              │
│ [EQUIPMENT]     Backline provided           │
│ [PA SYSTEM]     Monitoring available        │
│ [DURATION]      2hr / 3hr / 4hr blocks      │
│ [PRICING]       £45 (2h) · £60 (3h) · £65 (4h)│
│ [ACCESS]        Compact load-in             │
├─────────────────────────────────────────────┤
│ Tighter rehearsal space for focused work.   │
│ Same gear standard, smaller footprint.      │
│ Book online via Square.                     │
└─────────────────────────────────────────────┘
```

---

## CH-03: CONTROL ROOM HIRE

### PRODUCTION / MIXING SESSIONS

```
┌─────────────────────────────────────────────┐
│ CH-03 :: CONTROL ROOM (ENGINEER-FREE)       │
├─────────────────────────────────────────────┤
│ [MODE]          Self-operated / BYO engineer│
│ [EQUIPMENT]     Full control room access    │
│ [USE CASES]     Mixing, mastering, editing  │
│ [SESSION]       Hourly or day rate          │
│ [STANDARD]      ODRO-spec monitoring & signal│
│ [SUPPORT]       Tech support available      │
├─────────────────────────────────────────────┤
│ For producers and engineers who want the    │
│ room without our engineer. Full access to   │
│ control environment. Contact for pricing.   │
└─────────────────────────────────────────────┘
```

---

## CH-04: WORKSHOP CAFÉ

```
┌─────────────────────────────────────────────┐
│ CH-04 :: WORKSHOP CAFÉ & COWORKING          │
├─────────────────────────────────────────────┤
│ [MODE]          Café · Repairs · Workspace  │
│ [HOURS]         TUE-SAT 10:00-18:00         │
│ [COFFEE]        Specialty roast available   │
│ [REPAIRS]       Guitar setup, soldering, mods│
│ [WORKSPACE]     Desk hire by the day        │
│ [CAPACITY]      25 seated / 60 standing (events)│
├─────────────────────────────────────────────┤
│ Coffee, workbenches, musical curios. Bring  │
│ your laptop or your broken amp. Available   │
│ for private hire. Contact for bookings.     │
└─────────────────────────────────────────────┘
```

---

## SYSTEM STATUS TICKER

### CURRENT (HARMFUL):
```
INFRASTRUCTURE: BUILD PHASE 92% COMPLETE
```

### REPLACEMENT (OPERATIONAL):
```
CRS SYSTEM STATUS: OPERATIONAL · BOOKINGS OPEN · 118 COWLEY ROAD, OXFORD OX4 1JE
```

**Rationale:**  
- Signals confidence, not construction  
- Removes doubt about availability  
- Includes address for SEO + local search  
- Maintains console aesthetic  

---

## META DESCRIPTIONS (Per Page)

### Homepage
```
Cowley Road Studios — Independent recording studio, rehearsal rooms, and AV services in Oxford. ODRO Engineering Standard. No Chaos Policy. Book online.
```

### /about
```
About Cowley Road Studios — Oxford's engineer-led recording and rehearsal facility. ODRO Engineering Standard. No Chaos Policy. Honest, transparent, professional.
```

### /contact
```
Contact Cowley Road Studios — Get in touch for bookings, repairs, or enquiries. 118 Cowley Road, Oxford OX4 1JE. Email, phone, or visit the Workshop Café.
```

### /workshop-cafe (NEW PAGE NEEDED)
```
Workshop Café — Coffee, repairs, coworking, and events at Cowley Road Studios. Tue-Sat 10:00-18:00. 118 Cowley Road, Oxford.
```

---

## VISUAL INTEGRATION NOTES

**Where to place spec sheets:**  
- **Option A:** Immediately below each rack panel image as a `<div class="rack-spec-sheet">`  
- **Option B:** Slide-out panel triggered by "INFO" button on rack  
- **Option C:** Integrated into the rack graphic itself (requires image rework)

**Recommended:** Option A — fastest to implement, SEO-friendly, doesn't break existing hotspots.

**CSS Treatment:**
```css
.rack-spec-sheet {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(212, 160, 23, 0.3);
  border-radius: 4px;
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 800px;
  color: #d4d4d8;
}

.rack-spec-sheet pre {
  margin: 0;
  white-space: pre-wrap;
  color: #2d8a1f; /* green for spec text */
}
```

---

## PRICING VISIBILITY

### Current State
Pricing is hidden in Square widget hints (accessible to screen readers but not visually displayed).

### Proposed Change
Add pricing line to each rehearsal spec sheet (already included above):
```
[PRICING]       £45 (2h) · £60 (3h) · £65 (4h)
```

For recording/control room (pricing varies by session):
```
[PRICING]       Contact for quote
```

---

## WORKSHOP CAFÉ PAGE CONTENT

### New Route Needed: `/workshop-cafe`

**Content Structure:**
```markdown
# WORKSHOP CAFÉ
## Coffee · Repairs · Coworking · Events

### HOURS
Tuesday - Saturday  
10:00 - 18:00

### SERVICES

#### CAFÉ
Specialty coffee, tea, soft drinks.  
Workbench seating, standing tables, outdoor space.

#### REPAIRS & TECH
Guitar setups, pedal repair, cable soldering, amp diagnostics.  
Honest quotes, transparent work. By appointment or walk-in.

#### COWORKING
Day desk hire available.  
Power, Wi-Fi, quiet environment.  
£10/day or free with coffee purchase.

#### EVENTS & HIRE
Capacity: 25 seated / 60 standing  
PA system available  
Contact for private bookings.

### LOCATION
118 Cowley Road  
Oxford OX4 1JE

[BOOK / ENQUIRE]
```

---

## IMPLEMENTATION ORDER

1. ✅ **Change ticker** (line 342 in RackAccordion.tsx)
2. ✅ **Add spec sheets below each rack panel** (4 panels)
3. ✅ **Create /workshop-cafe page** (new route + content)
4. ✅ **Add meta descriptions** (renderer.tsx or per-route)
5. ⏳ **Review all changes** (before deployment)
6. ⏳ **Deploy** (when Danny says go)

---

## VOICE & TONE REFERENCE

**DO:**
- Direct, factual, specific
- Console/spec-sheet language
- Engineer-to-engineer clarity
- No fluff, no hype

**DON'T:**
- Marketing superlatives ("amazing", "world-class")
- Vague claims ("state-of-the-art")
- Corporate jargon ("solutions", "leverage")
- Unnecessary personality injection

**Example of correct voice:**
> "Professional recording with experienced engineer. Analog & digital hybrid workflow."

**Example of wrong voice:**
> "Experience world-class recording in our amazing studio space with cutting-edge equipment!"

---

**END OF SPEC SHEET**

*This document defines the content layer upgrade for CRS rack interface.  
All copy written in ODRO/CRS voice: honest, technical, no-nonsense.*
