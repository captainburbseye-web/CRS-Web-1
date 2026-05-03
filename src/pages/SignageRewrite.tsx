/**
 * CRS SIGNAGE REWRITE - BRAND-COMPLIANT VERSION
 * Route: /signage-rewrite
 * 
 * Tone: Professional + Human
 * Positioning: Grassroots creative infrastructure
 * Duration: 75-90 second loop
 * 
 * Brand Parameters:
 * - Base: #0E0E0E / #23272B
 * - Structural: #2E473B / #4F7942
 * - Highlight: #C2A85A
 * - No neon glow, no gradients
 * - Slow, mechanical, calm motion
 * - JetBrains Mono typography
 */

const frames = [
  {
    id: 'opening',
    duration: 6000, // 6 seconds
    title: 'COWLEY ROAD STUDIOS',
    subtitle: 'Oxford',
    body: 'Serious sound. Open doors.',
    background: '/static/rack-images/welcome-rack-1920w.webp',
    color: '#C2A85A',
    warm: false
  },
  {
    id: 'who-we-are',
    duration: 10000, // 10 seconds
    title: 'A Creative Grassroots Infrastructure',
    subtitle: '',
    body: 'Built for Oxford\'s musicians, engineers\nand independent artists.\n\nRecording. Rehearsal. Live sessions.\nCommunity space.',
    background: '/static/machined-assets/cowley-pods-rack.webp',
    color: '#4F7942',
    warm: false
  },
  {
    id: 'the-studio',
    duration: 11000, // 11 seconds
    title: 'Professional Recording Rooms',
    subtitle: 'Acoustically Treated · Engineer-Friendly Control Room',
    body: 'Full-band tracking\nSolo artists\nMixing & production',
    background: '/static/rack-images/recording-services-1920w.webp',
    color: '#C2A85A',
    warm: false,
    vuMeter: true
  },
  {
    id: 'rehearsals',
    duration: 9000, // 9 seconds
    title: 'Reliable Rehearsal Space',
    subtitle: 'Proper backline · Clear signal paths',
    body: 'Tighten your set.\nThen record it properly.',
    background: '/static/rack-images/rehearsal-combi-1920w.webp',
    color: '#4F7942',
    warm: false
  },
  {
    id: 'live-showcase',
    duration: 9000, // 9 seconds
    title: 'Filmed Sessions · Live Capture',
    subtitle: 'Grassroots Showcases',
    body: 'Connecting rehearsal\nto real performance.',
    background: '/static/machined-assets/cricket-control-room-optimized.webp',
    color: '#C2A85A',
    warm: false
  },
  {
    id: 'workshop-cafe',
    duration: 9000, // 9 seconds
    title: 'Workshop Café',
    subtitle: 'A front-of-house creative space',
    body: 'For talks, events, collaborations\nand coffee between sessions.\n\nWarm. Open. Independent.',
    background: '/static/workshop-cafe-assets/logo-3d-render-dark.jpg',
    color: '#E89B3C',
    warm: true
  },
  {
    id: 'community',
    duration: 10000, // 10 seconds
    title: 'We\'re evolving a connected ecosystem',
    subtitle: '',
    body: '• Session players\n• Engineers\n• Student bands\n• Local artists\n• Live circuits\n\nBuilt to support serious music\nat grassroots level.',
    background: '/static/machined-assets/cowley-rehearsal-optimized.webp',
    color: '#4F7942',
    warm: false
  },
  {
    id: 'cta',
    duration: 9000, // 9 seconds
    title: 'Book Rehearsal · Book Recording',
    subtitle: 'Scan for Rates & Availability',
    body: 'crsoxford.com',
    background: '/static/rack-images/control-room-1920w.webp',
    color: '#C2A85A',
    warm: false,
    showQR: true
  }
];

export const SignageRewrite = () => {
  return (
    <>
      {/* Signage Container */}
      <div class="signage-rewrite-container" id="signageRewrite">
        
        {/* Persistent QR Code (bottom-right) */}
        <div class="persistent-qr-container">
          <div class="qr-code-persistent" data-url="https://cowleyroadstudios.com/book"></div>
          <p class="qr-label-persistent">SCAN TO BOOK</p>
        </div>
        
        {/* Frame Carousel */}
        <div class="frame-carousel">
          {frames.map((frame, index) => (
            <div 
              class={`signage-frame ${index === 0 ? 'active' : ''}`}
              data-frame={index + 1}
              data-duration={frame.duration}
              style={`background-image: url('${frame.background}')`}
            >
              {/* Background Overlay */}
              <div class={`frame-overlay ${frame.warm ? 'warm' : 'cool'}`}></div>
              
              {/* Parallax Layers (subtle depth) */}
              <div class="parallax-layers">
                <div class="parallax-layer layer-1" data-depth="0.1"></div>
                <div class="parallax-layer layer-2" data-depth="0.3"></div>
                <div class="parallax-layer layer-3" data-depth="0.5"></div>
              </div>
              
              {/* Content */}
              <div class="frame-content">
                
                {/* CRS Badge (persistent, subtle) */}
                <div class="crs-badge-persistent">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke={frame.color} stroke-width="2" fill="rgba(14,14,14,0.8)"></circle>
                    <text x="50" y="58" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="28" font-weight="bold" fill={frame.color} text-anchor="middle">CRS</text>
                  </svg>
                </div>
                
                {/* Main Content */}
                <div class="frame-main">
                  <h1 class="frame-title" style={`color: ${frame.color}`}>{frame.title}</h1>
                  {frame.subtitle && <p class="frame-subtitle">{frame.subtitle}</p>}
                  <p class="frame-body">{frame.body}</p>
                </div>
                
                {/* VU Meter (only on studio frame) */}
                {frame.vuMeter && (
                  <div class="vu-meter-minimal">
                    <div class="vu-bar"></div>
                    <div class="vu-bar"></div>
                    <div class="vu-bar"></div>
                    <div class="vu-bar"></div>
                    <div class="vu-bar"></div>
                  </div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div class="frame-progress">
                <div class="progress-fill" style={`background: ${frame.color}`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* System Status (bottom) */}
        <div class="system-status-minimal">
          <span class="status-item">CRS SYSTEM</span>
          <span class="status-separator">·</span>
          <span class="status-item">118 COWLEY ROAD</span>
          <span class="status-separator">·</span>
          <span class="status-item">OXFORD OX4 1JE</span>
        </div>
      </div>
      
      {/* Load Styles */}
      <link href="/static/signage-rewrite.css" rel="stylesheet" />
      
      {/* Load Scripts */}
      <script src="/static/signage-rewrite.js" defer />
      <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js" defer />
    </>
  );
};
