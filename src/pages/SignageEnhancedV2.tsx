/**
 * CRS SIGNAGE ENHANCED V2 — Brand-Compliant Display
 * Route: /signage-enhanced
 * 
 * Technical Requirements:
 * - Full viewport (100vw × 100vh, no scrollbars)
 * - 96-second seamless loop (9 frames: 8s infrastructure + 88s original)
 * - Fade transitions only (2s)
 * - Works in Chrome kiosk, Yodeck, normal browsers
 * 
 * Design Tokens:
 * - Chassis Black #0E0E0E
 * - Charcoal Slate #23272B
 * - Veg Green #2E473B / Nettle Green #4F7942
 * - Billet Mustard #C2A85A
 * - Signal LEDs: Active #39FF14, Standby #FFA500
 * 
 * Motion Rules:
 * - Slow, mechanical, calm
 * - No bounce, elastic, rotation
 * - Allowed: ambient drift, VU meters, LED pulse, text fade
 * 
 * Frame 0 (NEW): OX4 Creative Infrastructure
 * - Pure black background (#000000)
 * - Sequenced text: "Oxford's music scene" → "We build the rooms" → "OX4 Creative Infrastructure"
 * - No animation first 3s, ambient drift after 6s
 */

import { SIGNAGE_TIMELINE, DESIGN_TOKENS } from '../data/signageTimeline';

export const SignageEnhancedV2 = () => {
  return (
    <div class="signage-container" data-mode="day">
      
      {/* LED Indicator (Minimal) */}
      <div class="led-indicator" aria-label="System Active"></div>
      
      {/* Frame Carousel */}
      <div class="frame-carousel">
        {SIGNAGE_TIMELINE.map((frame, index) => (
          <div 
            class={`signage-frame ${index === 0 ? 'active' : ''}`}
            data-frame-id={frame.id}
            data-duration={frame.duration}
            style={frame.infrastructure ? `background: ${frame.background}` : `background-image: url('${frame.background}')`}
          >
            {/* Skip overlays and depth layers for infrastructure frame */}
            {!frame.infrastructure && (
              <>
                {/* Overlay (Cool/Warm) */}
                <div class={`frame-overlay ${frame.warm ? 'warm' : 'cool'}`}></div>
                
                {/* Depth Layer (Cable Schematic / Waveform Outlines) */}
                <div class="depth-layer"></div>
              </>
            )}
            
            {/* Content */}
            <div class="frame-content">
              
              {/* CRS Logo Watermark (Bottom-Left) - Not on infrastructure frame */}
              {!frame.infrastructure && (
                <div class="crs-logo-watermark" aria-hidden="true"></div>
              )}
              
              {/* Main Content - Infrastructure frame handled by JS, regular frames use title/subtitle/body */}
              {!frame.infrastructure && (
                <div class="frame-main">
                  <h1 class="frame-title" style={`color: ${frame.color}`}>
                    {frame.title}
                  </h1>
                  
                  {frame.subtitle && (
                    <h2 class="frame-subtitle">{frame.subtitle}</h2>
                  )}
                  
                  <p class="frame-body">{frame.body}</p>
                </div>
              )}
              
              {/* VU Meter (Frame 3 only) */}
              {frame.vuMeter && (
                <div class="vu-meter" role="img" aria-label="Audio level meter">
                  <div class="vu-bar"></div>
                  <div class="vu-bar"></div>
                  <div class="vu-bar"></div>
                  <div class="vu-bar"></div>
                  <div class="vu-bar"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* QR Code (Visible on Frame 8) */}
      <div class="qr-container" role="img" aria-label="QR code: Book online at crsoxford.com">
        <div class="qr-code" data-url="https://cowleyroadstudios.com/book"></div>
        <p class="qr-label">Scan to Book</p>
      </div>
      
      {/* Load Styles */}
      <link href="/static/signage-v2.css" rel="stylesheet" />
      
      {/* Load Scripts */}
      <script src="/static/signage-v2.js" defer />
      <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js" defer />
    </div>
  );
};
