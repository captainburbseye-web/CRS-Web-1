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
  gap: 0;
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
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 0.5rem;
  
  /* Depth physics */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.3);
  
  /* Noise texture */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}

/* Device type indicator (left border) */
.rack-unit.device-status {
  border-left: 4px solid #FF8C00; /* Orange — status/alert */
}

.rack-unit.device-studio {
  border-left: 4px solid #FFD700; /* Gold — premium */
}

.rack-unit.device-av {
  border-left: 4px solid #1E90FF; /* Blue — technical */
}

.rack-unit.device-cafe {
  border-left: 4px solid #32CD32; /* Green — community */
}

/* ================================
   RACK SCREWS (DECORATIVE)
   ================================ */
.rack-unit::before,
.rack-unit::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #888 30%, #444 70%);
  border-radius: 50%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
  pointer-events: none; /* Don't intercept clicks */
}

.rack-unit::before {
  left: 8px;
}

.rack-unit::after {
  right: 8px;
}

/* ================================
   RACK UNIT HEADER
   ================================ */
.rack-unit-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(212, 160, 23, 0.2);
}

.rack-unit-title {
  font-family: 'Oswald', 'Arial Black', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(212, 160, 23, 0.9);
  margin: 0;
}

/* ================================
   LED INDICATORS (STATUS ONLY)
   ================================ */
.rack-unit-led {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.led {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.led.green {
  background: #4CAF50;
  color: #4CAF50;
}

.led.yellow {
  background: #FFD700;
  color: #FFD700;
}

.led.orange {
  background: #FF8C00;
  color: #FF8C00;
}

.led.red {
  background: #DC143C;
  color: #DC143C;
}

/* LED pulse animation (live state only) */
@keyframes pulse-led {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.led.pulse {
  animation: pulse-led 2s ease-in-out infinite;
}

/* ================================
   RACK UNIT CONTENT
   ================================ */
.rack-unit-content {
  font-size: 0.9375rem;
  color: rgba(245, 245, 245, 0.85);
}

.rack-unit-content p {
  margin-bottom: 1rem;
}

.rack-unit-content strong {
  color: #FFD700;
  font-weight: 700;
}

/* ================================
   CTA BUTTON (HARDWARE CONTROL)
   ================================ */
.cta-button {
  display: inline-block;
  padding: 0.65rem 1.5rem;
  background: rgba(212, 160, 23, 0.1);
  border: 2px solid rgba(212, 160, 23, 0.4);
  border-radius: 3px;
  color: rgba(212, 160, 23, 0.95);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.15s ease;
  cursor: pointer;
}

.cta-button:hover {
  background: rgba(212, 160, 23, 0.2);
  border-color: rgba(212, 160, 23, 0.6);
  color: #FFD700;
  transform: translateY(-1px);
}

.cta-button:active {
  transform: translateY(0);
}

/* ================================
   ACCESSIBILITY & REDUCED MOTION
   ================================ */
@media (prefers-reduced-motion: reduce) {
  .led.pulse {
    animation: none;
  }
  
  .cta-button {
    transition: none;
  }
  
  .cta-button:hover {
    transform: none;
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
    padding: 1rem;
  }
  
  .rack-unit-title {
    font-size: 0.875rem;
  }
  
  .rack-unit-content {
    font-size: 0.875rem;
  }
}
`

// 🏗️ CANONICAL RACK UNIT HTML
const RACK_UNIT_HTML = `
<section class="rack-unit device-status">
  <div class="rack-unit-header">
    <div class="rack-unit-led">
      <span class="led orange pulse"></span>
    </div>
    <h2 class="rack-unit-title">/// SYSTEM STATUS — COWLEY ROAD BUILD</h2>
  </div>
  <div class="rack-unit-content">
    <p><strong style="color: #FF8C00;">STATUS:</strong> Final phase installation in progress</p>
    <p><strong style="color: #FF8C00;">AVAILABLE NOW:</strong> Band rehearsals (Cricket Road) · Equipment repairs · AV services</p>
    <p><strong style="color: #FF8C00;">COMING SOON:</strong> Recording sessions · Production rooms · Workshop Café public hours</p>
    <p style="margin-bottom: 1.5rem;"><strong style="color: #FF8C00;">PRE-SALE:</strong> Book studio time now at discounted rates to support the build</p>
    <div style="text-align: center;">
      <a href="/studio" class="cta-button" style="border-color: #FF8C00; color: #FF8C00;">VIEW STUDIO PRE-SALE</a>
    </div>
  </div>
</section>

<section class="rack-unit device-studio">
  <div class="rack-unit-header">
    <div class="rack-unit-led">
      <span class="led yellow"></span>
    </div>
    <h2 class="rack-unit-title">STUDIO SESSIONS</h2>
  </div>
  <div class="rack-unit-content">
    <p>Purpose-built recording and production environments designed for reliable, repeatable results. From vocal tracking to full-band production, we provide the technical certainty you need to focus on your performance.</p>
    <div style="text-align: center;">
      <a href="/studio" class="cta-button">BOOK SESSION</a>
    </div>
  </div>
</section>

<section class="rack-unit device-av">
  <div class="rack-unit-header">
    <div class="rack-unit-led">
      <span class="led green"></span>
    </div>
    <h2 class="rack-unit-title">AV SERVICES & LIVE SOUND</h2>
  </div>
  <div class="rack-unit-content">
    <p>Engineer-led live sound, installations, and technical support for community venues, cultural events, and public gatherings. We provide the technical backbone for your event, so you can focus on your audience.</p>
    <div style="text-align: center;">
      <a href="/av-services" class="cta-button">AV SERVICES</a>
    </div>
  </div>
</section>

<section class="rack-unit device-cafe">
  <div class="rack-unit-header">
    <div class="rack-unit-led">
      <span class="led green"></span>
    </div>
    <h2 class="rack-unit-title">WORKSHOP CAFÉ</h2>
  </div>
  <div class="rack-unit-content">
    <p>The public-facing space of CRS — a café, workspace, and small venue supporting community events and creative activity in the heart of East Oxford. Available for private hire and public programming.</p>
    <div style="text-align: center;">
      <a href="/workshop-cafe" class="cta-button">HIRE THE VENUE</a>
    </div>
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
