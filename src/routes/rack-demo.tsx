// src/routes/rack-demo.tsx
import { Hono } from 'hono'

export const rackDemo = new Hono()

// 🔒 CRITICAL CSS — INLINE (No external dependencies)
const CRS_RACK_CSS = `
/* ================================
   CRS RACK UNIT — CANONICAL
   ================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #0f0f0f;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.rack-container {
  position: relative;
  background: linear-gradient(to bottom, #111, #1b1b1b);
  padding: 48px 24px;
  min-height: 100vh;
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

.rack-unit {
  position: relative;
  background-color: #1a1a1a;
  border: 2px solid #333;
  border-top-color: #444;
  border-bottom-color: #222;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 32px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  box-shadow:
    inset 0 1px 3px rgba(255,255,255,0.05),
    0 4px 12px rgba(0,0,0,0.3);
}

.rack-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.rack-label {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: #e0e0e0;
  background-color: #222;
  padding: 4px 12px;
  border: 1px solid #444;
  text-transform: uppercase;
}

.rack-content {
  line-height: 1.6;
}

.rack-content p {
  margin: 0 0 12px 0;
  color: #cfcfcf;
  line-height: 1.6;
}

.rack-spec {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
}

.rack-spec li {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  color: #bdbdbd;
  margin-bottom: 6px;
  padding: 6px 0;
  border-top: 1px solid rgba(255,255,255,0.03);
}

.rack-spec li:first-child {
  border-top: none;
  padding-top: 0;
}

.rack-spec strong {
  color: #ffffff;
  font-weight: 500;
}

.screw {
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #666 30%, #333 70%);
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.5);
}

.screw::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 1px;
  background: rgba(0, 0, 0, 0.6);
}

.top-left { top: 8px; left: 8px; }
.top-right { top: 8px; right: 8px; }
.bottom-left { bottom: 8px; left: 8px; }
.bottom-right { bottom: 8px; right: 8px; }

.rack-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.6);
  flex-shrink: 0;
}

.rack-indicator.green {
  background: radial-gradient(circle, #66ff66, #0a5f0a);
  box-shadow: 0 0 6px rgba(102,255,102,0.4);
}

.rack-indicator.yellow {
  background: radial-gradient(circle, #ffff66, #9a7f0a);
  box-shadow: 0 0 6px rgba(255,255,102,0.4);
}

.rack-indicator.orange {
  background: radial-gradient(circle, #ff9966, #8a3f0a);
  box-shadow: 0 0 6px rgba(255,153,102,0.4);
}

.rack-indicator.red {
  background: radial-gradient(circle, #ff6666, #8a0a0a);
  box-shadow: 0 0 6px rgba(255,102,102,0.4);
}

/* LED pulse animation (live state only) */
@keyframes pulse-led {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.rack-indicator.pulse {
  animation: pulse-led 2s ease-in-out infinite;
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
  .rack-container {
    padding: 24px 16px;
  }
  
  .rack-container::after {
    left: 24px;
    right: 24px;
  }
  
  .rack-unit {
    padding: 20px 16px;
    margin-bottom: 24px;
  }
  
  .rack-label {
    font-size: 11px;
    padding: 3px 8px;
  }
  
  .rack-content p {
    font-size: 14px;
  }
  
  .rack-spec li {
    font-size: 12px;
  }
  
  .screw {
    width: 8px;
    height: 8px;
  }
  
  .top-left,
  .top-right {
    top: 6px;
  }
  
  .bottom-left,
  .bottom-right {
    bottom: 6px;
  }
  
  .top-left,
  .bottom-left {
    left: 6px;
  }
  
  .top-right,
  .bottom-right {
    right: 6px;
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
