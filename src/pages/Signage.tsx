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
        {/* WORKSHOP CAFÉ CIRCULAR BADGE — Hardware Seal (Z-Index 10005) */}
        <div class="cafe-billet-badge">
          <img 
            src="https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/no_bkground_workshop_cafe_png.png" 
            alt="Workshop Café — Specialty Coffee & Creative Workspace"
            loading="eager"
          />
        </div>

        {/* CRS MUSTARD STAMP — 250px Anchor (Static during transitions) */}
        <div class="signage-stamp">
          <img 
            src="https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/1024FINAL_CRS_WEB_HEADER_2.png" 
            alt="Cowley Road Studios"
            width="250"
            height="250"
            loading="eager"
          />
        </div>

        {/* BOOK NOW BUTTON — Only Moving Element (1.5s Industrial Pulse) */}
        <a href="https://cowleyroadstudios.com" class="book-now-btn signage-cta" target="_blank">
          BOOK NOW
        </a>

        {/* MODULE 1: STUDIO HQ */}
        <div class="signage-module module-studio" id="module-studio" data-module="studio" style="display: flex; opacity: 1;">
          {/* VIDEO BACKGROUND: Tascam VU Meter Rack Loop */}
          <video autoplay loop muted playsinline class="signage-video-bg active">
            <source src="https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/20260118_2231_Remix%20Video_remix_01kf9kq0cxea1tn65695jjpzab.mp4" type="video/mp4" />
          </video>
          
          <div class="module-content">
            <div class="status-led led-active">
              <span class="led-dot"></span>
              <span class="led-label">[ SYSTEM_STATUS: OPERATIONAL ]</span>
            </div>
            
            <h1 class="module-title">ANALOG-FIRST PRODUCTION</h1>
            <p class="module-subtitle" style="font-size: 48px; font-weight: 700; letter-spacing: 0.2em; color: #FFFFFF; text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); margin-top: 20px; text-transform: uppercase;">STUDIO HQ</p>
            
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
        <div class="signage-module module-cafe" id="module-cafe" data-module="cafe" style="display: none; opacity: 0;">
          <div class="module-content">
            <div class="status-led led-active">
              <span class="led-dot"></span>
              <span class="led-label">[ NODE_STATUS: ONLINE ]</span>
            </div>
            
            <h1 class="module-title">WORKSHOP CAFÉ</h1>
            <p class="module-subtitle">ENGINEERED FOR EVENTS</p>
            
            <div class="module-specs">
              <div class="spec-line">
                <span class="spec-label">COFFEE:</span>
                <span class="spec-value">SPECIALTY ROASTS</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">WORKSPACE:</span>
                <span class="spec-value">FLEXIBLE CREATIVE SPACE</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">AV SERVICES:</span>
                <span class="spec-value">POD HIRE · LIGHTING · SOUND · PROJECTION</span>
              </div>
              <div class="spec-line">
                <span class="spec-label">COMMUNITY:</span>
                <span class="spec-value">WORKSHOPS · EVENTS · OPEN MIC</span>
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
