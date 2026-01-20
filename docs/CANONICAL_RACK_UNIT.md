# CRS CANONICAL RACK UNIT
**Reference Object — DO NOT MODIFY WITHOUT GOVERNANCE APPROVAL**

## 🔒 PURPOSE

This is the **single source of truth** for CRS rack unit structure, styling, and behavior.

Everything else either:
- **Inherits this** (Studio, AV Services, Infrastructure pages)
- **Deliberately does not** (Workshop Café — uses flat cards)
- **Sits on top of it** (Brewforce CTAs — overlays only)

---

## 🧱 HTML STRUCTURE (Canonical)

```html
<section class="rack-unit" aria-labelledby="rack-signal-path">
  <!-- Physical Fasteners -->
  <span class="screw top-left" aria-hidden="true"></span>
  <span class="screw top-right" aria-hidden="true"></span>
  <span class="screw bottom-left" aria-hidden="true"></span>
  <span class="screw bottom-right" aria-hidden="true"></span>

  <!-- Rack Label -->
  <header class="rack-header">
    <span class="rack-label" id="rack-signal-path">
      01 / SIGNAL PATH
    </span>

    <!-- Optional Status Indicator -->
    <span class="rack-indicator green" aria-label="System active"></span>
  </header>

  <!-- Rack Content -->
  <div class="rack-content">
    <p>
      Hybrid analogue / digital workflow integrating vintage harmonic character
      with modern precision and recall.
    </p>

    <ul class="rack-spec">
      <li><strong>Front End:</strong> Audient console architecture</li>
      <li><strong>Preamps:</strong> Boutique tube &amp; Neve-style circuits</li>
      <li><strong>Tracking:</strong> Low-noise, phase-coherent signal chain</li>
    </ul>
  </div>
</section>
```

---

## 🎨 CSS (CRS-Only — Do Not Globalise)

```css
/* ================================
   CRS RACK UNIT — CANONICAL
   Layer: CRS / Infrastructure
   ================================ */

.rack-unit {
  position: relative;
  background-color: #1a1a1a;
  border: 2px solid #333;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 32px;

  box-shadow:
    inset 0 1px 3px rgba(255,255,255,0.05),
    0 4px 12px rgba(0,0,0,0.3);
}

/* ----------------
   Header / Label
   ---------------- */

.rack-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.rack-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: #e0e0e0;
  background-color: #222;
  padding: 4px 12px;
  border: 1px solid #444;
  text-transform: uppercase;
}

/* ----------------
   Content
   ---------------- */

.rack-content p {
  margin: 0 0 12px 0;
  color: #cfcfcf;
  line-height: 1.6;
}

.rack-spec {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rack-spec li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #bdbdbd;
  margin-bottom: 6px;
}

.rack-spec strong {
  color: #ffffff;
  font-weight: 500;
}

/* ----------------
   Fasteners (Physical Cue)
   ---------------- */

.screw {
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #666 30%, #333 70%);
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
}

.top-left { top: 8px; left: 8px; }
.top-right { top: 8px; right: 8px; }
.bottom-left { bottom: 8px; left: 8px; }
.bottom-right { bottom: 8px; right: 8px; }

/* ----------------
   Status Indicators (Optional)
   ---------------- */

.rack-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.6);
}

.rack-indicator.green {
  background: radial-gradient(circle, #66ff66, #0a5f0a);
  box-shadow: 0 0 6px rgba(102,255,102,0.4);
}

.rack-indicator.yellow {
  background: radial-gradient(circle, #ffeb3b, #bfa700);
  box-shadow: 0 0 6px rgba(255,235,59,0.4);
}

.rack-indicator.red {
  background: radial-gradient(circle, #ff4a4a, #800000);
  box-shadow: 0 0 6px rgba(255,74,74,0.4);
}

/* ----------------
   Accessibility / Motion Safety
   ---------------- */

@media (prefers-reduced-motion: reduce) {
  .rack-unit,
  .rack-indicator {
    transition: none;
    animation: none;
  }
}
```

---

## 📐 OPTIONAL: Rack Container (Blueprint Rail Context)

**Use only on CRS pages.**

```css
.rack-container {
  position: relative;
  background: linear-gradient(to bottom, #111, #1b1b1b);
  padding: 48px 24px;
}

.rack-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 48px;
  right: 48px;
  height: 100%;
  border-left: 1px solid rgba(255,255,255,0.05);
  border-right: 1px solid rgba(255,255,255,0.05);
  pointer-events: none;
}
```

---

## 🚫 GOVERNANCE RULES (DO NOT IGNORE)

### ✅ **CRS Only — Never Global**

This CSS lives in:
- `src/layouts/crs-shell.tsx` (inline critical CSS)
- Scoped to CRS infrastructure pages only
- Workshop Café must NOT inherit rack units

### ❌ **No Animations Beyond Subtle Fades**

Rack units are static infrastructure. Only status indicators may pulse.

### ❌ **No Colour Accents Beyond Greys**

Status indicators use color (green/yellow/red). Everything else: grey scale only.

### ❌ **No Brewforce Language Inside Rack Units**

Brewforce CTAs sit **on top of** or **below** rack units, never inside them.

### ❌ **No "Cards", "Tiles", or "Panels" Language**

This is **hardware**, not UI decoration.

---

## 🎯 WHY THIS IS THE CANONICAL UNIT

This snippet:
- **Feels manufactured**, not styled
- **Implies maintenance**, standards, and longevity
- **Reads as load-bearing**
- **Scales vertically** without visual fatigue
- **Survives** accessibility, performance, and future edits

Everything else on the site either:
1. **Inherits this** (CRS pages)
2. **Intentionally does not** (Workshop Café)
3. **Sits on top of it** (Brewforce CTAs)

**That's the system holding.**

---

## 📋 NEXT LOGICAL STEPS (Only When Ready)

1. **Create CRS-only component namespace**
   - TypeScript-typed `<RackUnit>` component
   - Props: `label`, `indicator`, `children`

2. **Define Workshop Café flat-card equivalent**
   - Layer 2 warmth: no screws, softer palette
   - Proves governance prevents bleed

3. **Define Brewforce CTA overlay component**
   - Sits on top of rack units
   - Layer 3: conversion energy

---

## 🔗 LIVE REFERENCE

**Demo Page:** https://cowleyroadstudios.pages.dev/rack-demo

This page exists to validate the canonical structure. If it renders incorrectly, Cloudflare itself is broken.

---

## 📝 VERSION HISTORY

- **v1.0** (2026-01-20): Initial canonical specification
- Extracted from `/rack-demo` route
- Inline CSS in `crs-shell.tsx`
- Governance rules locked

---

**END OF CANONICAL SPECIFICATION**

Any modifications to this structure require:
1. Documentation update here
2. Git commit with clear reasoning
3. Verification on `/rack-demo` page
4. Approval from Danny (governance holder)
