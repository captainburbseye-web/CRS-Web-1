// CRS Layout Shell — Canonical Infrastructure Frame
// Purpose: Enforce institutional render path for all CRS pages
// Rules: CSS inline, JS optional, deterministic FCP, slot-based contract

import { html } from 'hono/html'

interface CRSShellProps {
  pageTitle: string
  systemStatus?: string
  children: any
}

// 🔒 CRITICAL CSS — CRS INFRASTRUCTURE BASELINE
// Inline in <head>, loads before any content
// DO NOT MOVE TO EXTERNAL FILE
const CRS_CRITICAL_CSS = `
/* ================================
   CRS LAYOUT SHELL — CANONICAL
   DO NOT MODIFY WITHOUT GOVERNANCE APPROVAL
   ================================ */

/* -------- RESET (HEADER + BODY SAFE) -------- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: #0e0e0e;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.5;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

/* -------- CRS SHELL -------- */

.crs-shell {
  min-height: 100vh;
  background: #0e0e0e;
}

.crs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 2px solid #1f1f1f;
  background: #121212;
}

.crs-logo {
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 700;
}

.crs-status {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #9e9e9e;
  text-transform: uppercase;
}

.crs-main {
  padding: 32px 24px 64px;
  max-width: 1200px;
  margin: 0 auto;
}

/* -------- RACK CONTAINER -------- */

.rack-container {
  position: relative;
  background: linear-gradient(to bottom, #111, #1b1b1b);
  padding: 48px 24px;
  border-left: 2px solid rgba(255,255,255,0.04);
  border-right: 2px solid rgba(255,255,255,0.04);
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

/* -------- FOOTER -------- */

.crs-footer {
  border-top: 2px solid #1f1f1f;
  padding: 16px 24px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7a7a;
  background: #121212;
  text-align: center;
}

/* ================================
   CANONICAL RACK UNIT (INLINE)
   ================================ */

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

/* -------- RACK SCREWS (MOUNTING HARDWARE) -------- */

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

.screw.top-left { top: 8px; left: 8px; }
.screw.top-right { top: 8px; right: 8px; }
.screw.bottom-left { bottom: 8px; left: 8px; }
.screw.bottom-right { bottom: 8px; right: 8px; }

/* -------- RACK INDICATORS (STATUS LEDs) -------- */

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

/* -------- ACCESSIBILITY & REDUCED MOTION -------- */

@media (prefers-reduced-motion: reduce) {
  .rack-indicator.pulse {
    animation: none;
  }
}

/* -------- MOBILE RESPONSIVE -------- */

@media (max-width: 767px) {
  .crs-header {
    flex-direction: column;
    gap: 8px;
    padding: 16px;
  }
  
  .crs-status {
    font-size: 10px;
  }
  
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
  
  .screw.top-left,
  .screw.top-right {
    top: 6px;
  }
  
  .screw.bottom-left,
  .screw.bottom-right {
    bottom: 6px;
  }
  
  .screw.top-left,
  .screw.bottom-left {
    left: 6px;
  }
  
  .screw.top-right,
  .screw.bottom-right {
    right: 6px;
  }
}
`

/**
 * CRS Layout Shell — Canonical Infrastructure Frame
 * 
 * Enforces institutional render path for all CRS infrastructure pages.
 * 
 * SLOT CONTRACT (Non-Negotiable):
 * - pageTitle: Human + SEO readable title
 * - systemStatus: Factual operational status (default: "OPERATIONAL")
 * - children: One or more canonical rack units ONLY
 * 
 * GOVERNANCE RULES:
 * - CSS inline in <head> (cannot fail on FCP)
 * - JS optional, never required
 * - Rack aesthetic scoped to CRS pages only
 * - Workshop Café must use different layout
 * - No ad-hoc wrappers, no layout overrides, no CMS cards
 * 
 * @param pageTitle - Page title (e.g., "Studio Sessions")
 * @param systemStatus - System status text (default: "OPERATIONAL")
 * @param children - Page content (rack units only)
 */
export function CRSShell({ pageTitle, systemStatus = 'OPERATIONAL', children }: CRSShellProps) {
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle} — Cowley Road Studios</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0e0e0e" />
  
  <!-- 🔒 CRITICAL CSS — INLINE (Institutional UI, cannot fail) -->
  <style>
${CRS_CRITICAL_CSS}
  </style>
</head>

<body>
  <div class="crs-shell">
    <!-- HEADER -->
    <header class="crs-header">
      <a href="/" class="crs-home-link" title="Back to Homepage">
        <div class="crs-logo">CRS</div>
      </a>
      <div class="crs-status">
        SYSTEM STATUS — ${systemStatus.toUpperCase()}
      </div>
    </header>

    <!-- MAIN -->
    <main class="crs-main">
      ${children}
    </main>

    <!-- FOOTER -->
    <footer class="crs-footer">
      REF: 118_OX_BILLET · COWLEY ROAD STUDIOS · OPERATIONAL DOCUMENT
    </footer>
  </div>
</body>
</html>`
}
