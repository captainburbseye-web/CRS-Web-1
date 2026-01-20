// CRS Layout Shell — Canonical Infrastructure Frame
// Purpose: Enforce institutional render path for all CRS pages
// Rules: CSS inline, JS optional, deterministic FCP

import { html } from 'hono/html'

interface CRSShellProps {
  title: string
  description?: string
  children: any
}

// 🔒 CRITICAL CSS — CRS INFRASTRUCTURE BASELINE
// Inline in <head>, loads before any content
const CRS_CRITICAL_CSS = `
/* ================================
   CRS INFRASTRUCTURE BASELINE
   DO NOT MOVE TO EXTERNAL FILE
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
  color: #cfcfcf;
  line-height: 1.6;
}

/* ================================
   RACK CONTAINER (CRS PAGES ONLY)
   ================================ */
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

/* ================================
   RACK UNIT (MOUNTED MODULE)
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

/* ================================
   RACK SCREWS (MOUNTING HARDWARE)
   ================================ */
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

/* ================================
   RACK INDICATORS (STATUS LEDs)
   ================================ */
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
 * CRS Layout Shell
 * 
 * Enforces institutional render path for all CRS infrastructure pages.
 * 
 * Rules:
 * - CSS inline in <head> (cannot fail on FCP)
 * - JS optional, never required
 * - Rack aesthetic scoped to CRS pages only
 * - Workshop Café must use different layout
 * 
 * @param title - Page title (e.g., "Studio Sessions")
 * @param description - Meta description for SEO
 * @param children - Page content (rack units, CTAs, etc.)
 */
export function CRSShell({ title, description, children }: CRSShellProps) {
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — CRS Oxford</title>
  ${description ? html`<meta name="description" content="${description}" />` : ''}
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0f0f0f" />
  
  <!-- 🔒 CRITICAL CSS — INLINE (Institutional UI, cannot fail) -->
  <style>
${CRS_CRITICAL_CSS}
  </style>
</head>

<body>
  ${children}
</body>
</html>`
}
