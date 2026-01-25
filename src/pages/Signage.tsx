/**
 * SIGNAGE ROUTE — DIGITAL BROADCAST TERMINAL
 * 
 * Critical Infrastructure Deployment for 55" Street Display
 * Hardware Profile: 3840×2160px (4K), True Black (#000000), 80px Safe Zone
 * 
 * This is NOT a website — it is a Digital Signage Appliance.
 * Headless architecture: No global header/footer inheritance.
 * 
 * DATA SANITIZATION: "No Chaos Theory" Standard
 * All content verified against operational facts [cite: 2025-01-31, 2025-07-01]
 * Zero filler, zero placeholder text, zero marketing fluff.
 * 
 * Deployment: /signage
 * Mode: Kiosk (Chrome --kiosk --disable-infobars)
 * Rotation: 15s cycle, 1s cross-fade
 */

export function Signage() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage Terminal</title>
        
        {/* Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&display=swap" rel="stylesheet" />
        
        {/* Signage Stylesheets */}
        <link href="/static/signage-mode.css" rel="stylesheet" />
        <link href="/static/signage-led-indicators.css" rel="stylesheet" />
      </head>
      
      <body class="signage-mode">
        {/* SVG SQUARE STAMP — 250px Anchor (Static during transitions) */}
        <div class="signage-stamp">
          <svg width="250" height="250" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* CRS Square Stamp SVG */}
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="#E89B3C" stroke-width="2" />
            <rect x="15" y="15" width="70" height="70" fill="none" stroke="#E89B3C" stroke-width="1" />
            <text x="50" y="55" font-family="JetBrains Mono" font-size="20" font-weight="800" fill="#E89B3C" text-anchor="middle">CRS</text>
          </svg>
        </div>

        {/* BOOK NOW BUTTON — Only Moving Element (1.5s Industrial Pulse) */}
        <a href="https://cowleyroadstudios.com" class="book-now-btn signage-cta" target="_blank">
          BOOK NOW
        </a>

        {/* MODULE 1: STUDIO HQ */}
        <div class="signage-module module-studio" style="display: flex; opacity: 1;">
          <div class="module-content">
            <div class="status-led led-active">
              <span class="led-dot"></span>
              <span class="led-label">[ SYSTEM_STATUS: OPERATIONAL ]</span>
            </div>
            
            <h1 class="module-title">STUDIO HQ</h1>
            
            <div class="module-specs">
              <div class="spec-line">
                <span class="spec-label">CONSOLE:</span>
                <span class="spec-value">SSL ORIGIN 32-CHANNEL</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">MONITORING:</span>
                <span class="spec-value">GENELEC 8351B</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">SERVICES:</span>
                <span class="spec-value">PRODUCTION · RECORDING · MIXING</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">RATE:</span>
                <span class="spec-value">£45/HR · £320/DAY</span>
              </div>
            </div>
            
            <div class="module-footer">
              <span class="footer-label">118 COWLEY ROAD · OXFORD · OX4 1JE</span>
            </div>
          </div>
        </div>

        {/* MODULE 2: WORKSHOP CAFÉ */}
        <div class="signage-module module-cafe" style="display: none; opacity: 0;">
          <div class="module-content">
            <div class="status-led led-active">
              <span class="led-dot"></span>
              <span class="led-label">[ NODE_STATUS: ONLINE ]</span>
            </div>
            
            <h1 class="module-title">WORKSHOP CAFÉ</h1>
            
            <div class="module-specs">
              <div class="spec-line">
                <span class="spec-label">FUNCTION:</span>
                <span class="spec-value">SPECIALTY COFFEE</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">WORKSPACE:</span>
                <span class="spec-value">FLEXIBLE CREATIVE WORKSPACE</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">SERVICES:</span>
                <span class="spec-value">AV/POD HIRE · COMMUNITY HUB</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">RATE:</span>
                <span class="spec-value">FROM £25/HR</span>
              </div>
            </div>
            
            <div class="module-footer">
              <span class="footer-label">118 COWLEY ROAD · OXFORD · OX4 1JE</span>
            </div>
          </div>
        </div>

        {/* MODULE 3: REHEARSAL NODE */}
        <div class="signage-module module-node" style="display: none; opacity: 0;">
          <div class="module-content">
            <div class="status-led led-active">
              <span class="led-dot"></span>
              <span class="led-label">[ REHEARSAL_NODE: READY ]</span>
            </div>
            
            <h1 class="module-title">REHEARSAL NODE</h1>
            
            <div class="module-specs">
              <div class="spec-line">
                <span class="spec-label">PA SYSTEM:</span>
                <span class="spec-value">QSC PA SYSTEM</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">BACKLINE:</span>
                <span class="spec-value">FULL BACKLINE AVAILABLE</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">LOCATION:</span>
                <span class="spec-value">CRICKET RD · OX4 NODE</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">RATE:</span>
                <span class="spec-value">£15/HR</span>
              </div>
            </div>
            
            <div class="module-footer">
              <span class="footer-label">CRICKET ROAD · OXFORD · OX4 3NE</span>
            </div>
          </div>
        </div>

        {/* ROTATION ENGINE — 15s Cycle / 1s Cross-Fade */}
        <script src="/static/signage-engine.js"></script>
      </body>
    </html>
  );
}
