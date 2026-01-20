// src/routes/rack-demo.tsx
import { Hono } from 'hono'

export const rackDemo = new Hono()

// 🔒 CRITICAL CSS — INLINE (No external dependencies)
const CRS_RACK_CSS = `
/* =========================================================
   CRS RACK UNIT — CANONICAL REFERENCE
   Purpose: Single source of truth for rack module styling
   ========================================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0a0a;
  font-family: 'JetBrains Mono', 'Space Mono', 'Courier New', monospace;
  color: #f5f5f5;
  padding: 2rem;
  line-height: 1.6;
}

.rack-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Vertical rails visual cue */
  position: relative;
  padding: 0 1rem;
}

.rack-container::before,
.rack-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(212, 160, 23, 0.15);
}

.rack-container::before {
  left: 0;
}

.rack-container::after {
  right: 0;
}

/* ================================
   RACK UNIT — CORE MODULE
   ================================ */
.rack-unit {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(28, 28, 28, 0.95) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  border: 1px solid rgba(60, 60, 60, 0.4);
  border-left: 3px solid rgba(212, 160, 23, 0.3);
  border-radius: 4px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  
  /* Depth physics */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.3);
  
  /* Noise texture */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}

/* ================================
   RACK SCREWS (4-CORNER MOUNTING)
   ================================ */
.screw {
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #888 30%, #444 70%);
  border-radius: 50%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
  pointer-events: none; /* Don't intercept clicks */
}

.screw::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 1px;
  background: rgba(0, 0, 0, 0.4);
}

.screw.top-left {
  top: 12px;
  left: 12px;
}

.screw.top-right {
  top: 12px;
  right: 12px;
}

.screw.bottom-left {
  bottom: 12px;
  left: 12px;
}

.screw.bottom-right {
  bottom: 12px;
  right: 12px;
}

/* ================================
   RACK HEADER
   ================================ */
.rack-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(212, 160, 23, 0.2);
}

.rack-label {
  font-family: 'Oswald', 'Arial Black', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(212, 160, 23, 0.9);
}

/* ================================
   RACK INDICATORS (STATUS LEDs)
   ================================ */
.rack-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
  flex-shrink: 0;
}

.rack-indicator.green {
  background: #4CAF50;
  color: #4CAF50;
}

.rack-indicator.yellow {
  background: #FFD700;
  color: #FFD700;
}

.rack-indicator.orange {
  background: #FF8C00;
  color: #FF8C00;
}

.rack-indicator.red {
  background: #DC143C;
  color: #DC143C;
}

/* LED pulse animation (live state only) */
@keyframes pulse-led {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.rack-indicator.pulse {
  animation: pulse-led 2s ease-in-out infinite;
}

/* ================================
   RACK CONTENT
   ================================ */
.rack-content {
  font-size: 0.9375rem;
  color: rgba(245, 245, 245, 0.85);
  line-height: 1.7;
}

.rack-content p {
  margin-bottom: 1rem;
}

.rack-content strong {
  color: #FFD700;
  font-weight: 700;
}

/* ================================
   RACK SPEC LIST (TECHNICAL DETAILS)
   ================================ */
.rack-spec {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgba(245, 245, 245, 0.75);
}

.rack-spec li {
  padding: 0.5rem 0;
  border-top: 1px solid rgba(60, 60, 60, 0.3);
}

.rack-spec li:first-child {
  border-top: none;
  padding-top: 0;
}

.rack-spec strong {
  color: rgba(212, 160, 23, 0.8);
  font-weight: 700;
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ================================
   ACCESSIBILITY & REDUCED MOTION
   ================================ */
@media (prefers-reduced-motion: reduce) {
  .rack-indicator.pulse {
    animation: none;
  }
}

/* ================================
   MOBILE RESPONSIVE
   ================================ */
@media (max-width: 767px) {
  body {
    padding: 1rem;
  }
  
  .rack-unit {
    padding: 1.5rem 1rem 1rem 1rem;
  }
  
  .rack-label {
    font-size: 0.75rem;
  }
  
  .rack-content {
    font-size: 0.875rem;
  }
  
  .rack-spec {
    font-size: 0.8125rem;
  }
  
  .screw {
    width: 8px;
    height: 8px;
  }
  
  .screw.top-left,
  .screw.top-right {
    top: 10px;
  }
  
  .screw.bottom-left,
  .screw.bottom-right {
    bottom: 10px;
  }
  
  .screw.top-left,
  .screw.bottom-left {
    left: 10px;
  }
  
  .screw.top-right,
  .screw.bottom-right {
    right: 10px;
  }
}
`

// 🏗️ CANONICAL RACK UNIT HTML (Your structure)
const RACK_UNIT_HTML = `
<section class="rack-unit" aria-labelledby="rack-signal-path">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-signal-path">
      01 / SIGNAL PATH
    </span>
    <span class="rack-indicator green" aria-label="System active"></span>
  </header>

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

<section class="rack-unit" aria-labelledby="rack-monitoring">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-monitoring">
      02 / MONITORING
    </span>
    <span class="rack-indicator green" aria-label="System active"></span>
  </header>

  <div class="rack-content">
    <p>
      Transparent, fatigue-resistant monitoring for extended sessions. Multiple reference points available.
    </p>

    <ul class="rack-spec">
      <li><strong>Mains:</strong> Neumann KH 120 (stereo field reference)</li>
      <li><strong>Subs:</strong> Yamaha HS8 (low-end detail)</li>
      <li><strong>Alternative:</strong> Auratone 5C (mix translation check)</li>
    </ul>
  </div>
</section>

<section class="rack-unit" aria-labelledby="rack-outboard">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-outboard">
      03 / OUTBOARD
    </span>
    <span class="rack-indicator yellow" aria-label="Partially available"></span>
  </header>

  <div class="rack-content">
    <p>
      Curated selection of character processors for tone-shaping and colour.
    </p>

    <ul class="rack-spec">
      <li><strong>Compression:</strong> Tube / FET / VCA topologies</li>
      <li><strong>EQ:</strong> Pultec-style curves, API-style surgical</li>
      <li><strong>Saturation:</strong> Tape / transformer emulation units</li>
    </ul>
  </div>
</section>

<section class="rack-unit" aria-labelledby="rack-status">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-status">
      04 / SYSTEM STATUS
    </span>
    <span class="rack-indicator orange pulse" aria-label="Build phase"></span>
  </header>

  <div class="rack-content">
    <p>
      <strong>STATUS:</strong> Final phase installation in progress<br>
      <strong>AVAILABLE NOW:</strong> Band rehearsals (Cricket Road), Equipment repairs, AV services<br>
      <strong>COMING SOON:</strong> Recording sessions, Production rooms, Workshop Café
    </p>
  </div>
</section>
`

rackDemo.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CRS — Rack Unit Demo</title>

  <!-- 🔒 CRITICAL CSS — INLINE (Zero flash, institutional UI) -->
  <style>
${CRS_RACK_CSS}
  </style>
</head>

<body>
  <main class="rack-container">
    ${RACK_UNIT_HTML}
  </main>
</body>
</html>`)
})
