# CRS Signage Routes Status & URLs

**Last Updated:** 2026-02-25
**Current Status:** Only `/signage-enhanced` is production-ready with OX4 Infrastructure Frame 0

---

## 📋 Signage Routes Table

| Mode | Route | Status | Description | Key Features | URL (Dev) |
|------|-------|--------|-------------|--------------|-----------|
| **OX4 Infrastructure** | `/signage-enhanced` | ✅ **LIVE** | Main production signage with Frame 0 | 96s loop, 8 frames + infrastructure, JetBrains Mono, ODRO panel texture | https://5174-izpk336dk1tjnllvoqcmk-5c13a017.sandbox.novita.ai/signage-enhanced |
| **Night Edition** | `/signage-night` | ❌ **NOT CREATED** | 18:00-07:00 dusk/night mode | 70-80s loop, 65-75% brightness, mustard halo ≤4%, 8 frames | *Needs implementation* |
| **Student Mode** | `/signage-student` | ❌ **NOT CREATED** | Wed 18:30-23:30 youth focus | 60-70s loop, teal #008C91 & orange #E94E1B, vertical scan bar, 7 frames | *Needs implementation* |
| **Mostro Mode** | `/signage-mostro` | ❌ **NOT CREATED** | Weekday 15:00-18:30, Weekend 11:00-16:00 | 80-90s loop, left-aligned text, strict margins, poetic line, 6 frames | *Needs implementation* |
| **Micro Interrupt** | `/signage-micro` | ❌ **NOT CREATED** | 3s pulse during Student Mode | Black field, teal edge, mustard underline, QR pulse, inject every 45-60s | *Needs implementation* |
| **Civic Greeting** | `/signage-civic` | ❌ **NOT CREATED** | Random rare inject (lowest priority) | 7s duration, 6 variant texts, "Oxford. Keep making things.", inject every 6-8 loops | *Needs implementation* |
| Smart Router | `/signage` | ⚠️ **BASIC** | Auto-switches based on schedule | Detects time/day and redirects to appropriate mode | https://5174-izpk336dk1tjnllvoqcmk-5c13a017.sandbox.novita.ai/signage |

---

## 🧪 Experimental/Legacy Routes (Not Part of System)

| Route | Status | Description |
|-------|--------|-------------|
| `/signage-loop` | 🟡 **OLD** | Original broadcast loop (superseded) |
| `/signagesignal` | 🟡 **OLD** | Multi-mode display with E/A/B modes (superseded) |
| `/signage-v4` | 🟡 **OLD** | V4 experimental design (superseded) |
| `/signage-rewrite` | 🟡 **OLD** | Brand-compliant rewrite (superseded by enhanced) |

---

## 🎯 What Was Promised vs. What Exists

### ✅ Delivered:
- **Infrastructure Mode** (Frame 0 + 8 original frames) — LIVE at `/signage-enhanced`
- Full spec document with all 6 modes defined
- ODRO panel integration
- Smart scheduler API at `/api/signage/schedule`

### ❌ Not Yet Built:
- **Night Edition** route/component
- **Student Mode** route/component
- **Mostro Mode** route/component  
- **Micro Interrupt** route/component
- **Civic Greeting** route/component
- Smart router logic (currently just shows basic signage)

---

## 📐 Next Steps to Complete the System

### Phase 1: Create Separate Route Components
```bash
# Need to create 5 new signage components:
src/pages/SignageNight.tsx
src/pages/SignageStudent.tsx  
src/pages/SignageMostro.tsx
src/pages/SignageMicro.tsx
src/pages/SignageCivic.tsx
```

### Phase 2: Create Timeline Data Files
```bash
src/data/nightTimeline.ts
src/data/studentTimeline.ts
src/data/mostroTimeline.ts
src/data/microTimeline.ts
src/data/civicTimeline.ts
```

### Phase 3: Add Routes to index.tsx
```typescript
app.get('/signage-night', (c) => { /* render SignageNight */ })
app.get('/signage-student', (c) => { /* render SignageStudent */ })
app.get('/signage-mostro', (c) => { /* render SignageMostro */ })
app.get('/signage-micro', (c) => { /* render SignageMicro */ })
app.get('/signage-civic', (c) => { /* render SignageCivic */ })
```

### Phase 4: Implement Smart Router
Update `/signage` route to check time/day and serve correct mode.

---

## 🔗 Quick Reference URLs

### Production (after next deploy)
- Main: `https://f61e0738.crs-web-1.pages.dev/signage-enhanced`
- Custom domain: `https://cowleyroadstudios.com/signage-enhanced`

### Development (current)
- Main: `https://5174-izpk336dk1tjnllvoqcmk-5c13a017.sandbox.novita.ai/signage-enhanced`
- Test with debug: `?debug=1`
- Test with mode: `?mode=day` or `?mode=night`

---

**Summary:** You have ONE fully working signage URL with OX4 Infrastructure. The other 5 modes were designed in the spec doc but never actually built as separate routes/components. We need to build them if you want distinct URLs for each style.
