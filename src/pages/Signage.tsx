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
 * 
 * CINEMATIC RACK AESTHETIC: Video playback at 0.6x speed for atmospheric presence
 */

export function Signage() {
  return (
    <div className="signage-container">
      {/* WORKSHOP CAFÉ CIRCULAR BADGE — Hardware Seal (Z-Index 10005) */}
      <div className="cafe-billet-badge">
        <img 
          src="https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/no_bkground_workshop_cafe_png.png" 
          alt="Workshop Café — Specialty Coffee & Creative Workspace"
          loading="eager"
        />
      </div>

      {/* CRS MUSTARD STAMP — 250px Anchor (Static during transitions) */}
      <div className="signage-stamp">
        <img 
          src="https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/1024FINAL_CRS_WEB_HEADER_2.png" 
          alt="Cowley Road Studios"
          width={250}
          height={250}
          loading="eager"
        />
      </div>

      {/* BOOK NOW BUTTON — Only Moving Element (1.5s Industrial Pulse) */}
      <a href="https://cowleyroadstudios.com" className="book-now-btn signage-cta" target="_blank" rel="noreferrer">
        BOOK NOW
      </a>

      {/* MODULE 1: STUDIO HQ */}
      <div className="signage-module module-studio" id="module-studio" data-module="studio" style={{display: 'flex', opacity: 1}}>
        {/* VIDEO BACKGROUND: Tascam VU Meter Rack Loop */}
        <video autoPlay loop muted playsInline className="signage-video-bg active">
          <source src="https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/20260118_2231_Remix%20Video_remix_01kf9kq0cxea1tn65695jjpzab.mp4" type="video/mp4" />
        </video>
        
        <div className="module-content">
          <div className="status-led led-active">
            <span className="led-dot"></span>
            <span className="led-label">[ SYSTEM_STATUS: OPERATIONAL ]</span>
          </div>
          
          <h1 className="module-title">ANALOG-FIRST PRODUCTION</h1>
          <p className="module-subtitle" style={{fontSize: '48px', fontWeight: '700', letterSpacing: '0.2em', color: '#FFFFFF', textShadow: '0 0 20px rgba(255, 255, 255, 0.5)', marginTop: '20px', textTransform: 'uppercase'}}>STUDIO HQ</p>
          
          <div className="module-specs">
            <div className="spec-line">
              <span className="spec-label">CONSOLE:</span>
              <span className="spec-value">SSL ORIGIN 32-CHANNEL</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">MONITORING:</span>
              <span className="spec-value">GENELEC 8351B</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">SERVICES:</span>
              <span className="spec-value">PRODUCTION · RECORDING · MIXING</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">RATE:</span>
              <span className="spec-value">£45/HR · £320/DAY</span>
            </div>
          </div>
          
          <div className="module-footer">
            <span className="footer-label">118 COWLEY ROAD · OXFORD · OX4 1JE</span>
          </div>
        </div>
      </div>

      {/* MODULE 2: WORKSHOP CAFÉ */}
      <div className="signage-module module-cafe" id="module-cafe" data-module="cafe" style={{display: 'none', opacity: 0}}>
        <div className="module-content">
          <div className="status-led led-active">
            <span className="led-dot"></span>
            <span className="led-label">[ NODE_STATUS: ONLINE ]</span>
          </div>
          
          <h1 className="module-title">WORKSHOP CAFÉ</h1>
          <p className="module-subtitle">ENGINEERED FOR EVENTS</p>
          
          <div className="module-specs">
            <div className="spec-line">
              <span className="spec-label">COFFEE:</span>
              <span className="spec-value">SPECIALTY ROASTS</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">WORKSPACE:</span>
              <span className="spec-value">FLEXIBLE CREATIVE SPACE</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">AV SERVICES:</span>
              <span className="spec-value">POD HIRE · LIGHTING · SOUND · PROJECTION</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">COMMUNITY:</span>
              <span className="spec-value">WORKSHOPS · EVENTS · OPEN MIC</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">RATE:</span>
              <span className="spec-value">FROM £25/HR</span>
            </div>
          </div>
          
          <div className="module-footer">
            <span className="footer-label">118 COWLEY ROAD · OXFORD · OX4 1JE</span>
          </div>
        </div>
      </div>

      {/* MODULE 3: REHEARSAL NODE */}
      <div className="signage-module module-node" style={{display: 'none', opacity: 0}}>
        <div className="module-content">
          <div className="status-led led-active">
            <span className="led-dot"></span>
            <span className="led-label">[ REHEARSAL_NODE: READY ]</span>
          </div>
          
          <h1 className="module-title">REHEARSAL NODE</h1>
          
          <div className="module-specs">
            <div className="spec-line">
              <span className="spec-label">PA SYSTEM:</span>
              <span className="spec-value">QSC PA SYSTEM</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">BACKLINE:</span>
              <span className="spec-value">FULL BACKLINE AVAILABLE</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">LOCATION:</span>
              <span className="spec-value">CRICKET RD · OX4 NODE</span>
            </div>
            <div className="spec-line">
              <span className="spec-label">RATE:</span>
              <span className="spec-value">£15/HR</span>
            </div>
          </div>
          
          <div className="module-footer">
            <span className="footer-label">CRICKET ROAD · OXFORD · OX4 3NE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
