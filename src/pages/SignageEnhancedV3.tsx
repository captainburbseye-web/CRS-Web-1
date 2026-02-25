/**
 * CRS SIGNAGE ENHANCED V3 - BRAND-ALIGNED REEL
 * Route: /signage-enhanced
 * 
 * 75-90 second loop • 8 frames • Soft transitions
 * Calm, structured, professional grassroots infrastructure
 * 
 * Brand Parameters:
 * - Base: #0E0E0E / #23272B
 * - Structural: #2E473B, #4F7942
 * - Highlight: #C2A85A
 * - Typography: JetBrains Mono
 * - Motion: Slow, mechanical, calm
 */

const frames = [
  {
    id: 'opening',
    duration: 6000, // 6 seconds
    title: 'COWLEY ROAD STUDIOS',
    subtitle: 'Oxford',
    body: 'Serious sound. Open doors.',
    bgImage: '/static/rack-images/welcome-rack-1920w.webp',
    accent: '#C2A85A'
  },
  {
    id: 'who-we-are',
    duration: 10000, // 10 seconds
    title: 'GRASSROOTS CREATIVE INFRASTRUCTURE',
    body: `Recording · Rehearsal · Live Sessions
Community Space for Oxford Musicians`,
    bgImage: '/static/rack-images/crs-header-1920w.webp',
    accent: '#4F7942'
  },
  {
    id: 'the-studio',
    duration: 11000, // 11 seconds
    title: 'PROFESSIONAL RECORDING',
    body: `Engineer-Friendly Control Room
Full-Band Tracking
Mixing & Production`,
    bgImage: '/static/rack-images/recording-services-1920w.webp',
    accent: '#C2A85A',
    showVU: true
  },
  {
    id: 'rehearsals',
    duration: 9000, // 9 seconds
    title: 'REHEARSAL SPACE',
    body: `Proper Backline · Clear Signal Paths
Tighten Your Set
Then Record It`,
    bgImage: '/static/rack-images/rehearsal-combi-1920w.webp',
    accent: '#2E473B'
  },
  {
    id: 'live-showcase',
    duration: 9000, // 9 seconds
    title: 'LIVE & SHOWCASE',
    body: `Filmed Sessions
Live Capture
Grassroots Showcases

Connecting rehearsal
to real performance.`,
    bgImage: '/static/rack-images/rehearsal-combi-1920w.webp',
    accent: '#4F7942'
  },
  {
    id: 'workshop-cafe',
    duration: 9000, // 9 seconds
    title: 'WORKSHOP CAFÉ',
    body: `Coffee · Repairs · Events
Coworking · Collaborations
Warm · Open · Independent`,
    bgImage: '/static/rack-images/workshop-cafe-1920w.webp',
    accent: '#C2A85A',
    warmTone: true
  },
  {
    id: 'community',
    duration: 10000, // 10 seconds
    title: 'EVOLVING ECOSYSTEM',
    body: `Session Players · Engineers
Student Bands · Local Artists
Live Circuits

Serious Music · Grassroots Level`,
    bgImage: '/static/rack-images/crs-header-1920w.webp',
    accent: '#2E473B'
  },
  {
    id: 'cta',
    duration: 9000, // 9 seconds
    title: 'BOOK NOW',
    body: `Rehearsal · Recording
Scan for Rates

crsoxford.com`,
    bgImage: '/static/rack-images/welcome-rack-1920w.webp',
    accent: '#C2A85A',
    showQR: true
  }
];

export const SignageEnhancedV3 = () => {
  return (
    <div class="signage-v3-container">
      {/* Ambient Background Layer (Continuous) */}
      <div class="signage-ambient-layer" aria-hidden="true">
        <div class="ambient-rack-drift"></div>
      </div>

      {/* Content Frames */}
      <div class="signage-frames" id="signageFrames">
        {frames.map((frame, index) => (
          <div 
            class={`signage-frame ${index === 0 ? 'active' : ''}`} 
            data-frame={index}
            data-duration={frame.duration}
            style={`background-image: url('${frame.bgImage}')`}
          >
            {/* Background Overlay */}
            <div class={`frame-overlay ${frame.warmTone ? 'warm' : ''}`}></div>

            {/* Parallax Layers (Max 3) */}
            <div class="parallax-layers">
              <div class="parallax-layer layer-1" data-depth="0.1"></div>
              <div class="parallax-layer layer-2" data-depth="0.3"></div>
              <div class="parallax-layer layer-3" data-depth="0.5"></div>
            </div>

            {/* Content Panel */}
            <div class="frame-content">
              {/* CRS Badge (Persistent) */}
              <div class="crs-badge-persistent">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="#C2A85A" stroke-width="2" fill="rgba(14,14,14,0.8)"/>
                  <text x="50" y="58" font-family="JetBrains Mono, monospace" font-size="28" font-weight="bold" fill="#C2A85A" text-anchor="middle">CRS</text>
                </svg>
              </div>

              {/* Main Content */}
              <div class="frame-main">
                <h1 class="frame-title" style={`color: ${frame.accent}`}>
                  {frame.title}
                </h1>
                {frame.subtitle && (
                  <p class="frame-subtitle">{frame.subtitle}</p>
                )}
                <p class="frame-body">{frame.body}</p>
              </div>

              {/* VU Meters (Studio Frame Only) */}
              {frame.showVU && (
                <div class="vu-meters-minimal" aria-hidden="true">
                  <div class="vu-bar" style="animation-delay: 0s"></div>
                  <div class="vu-bar" style="animation-delay: 0.2s"></div>
                  <div class="vu-bar" style="animation-delay: 0.4s"></div>
                </div>
              )}

              {/* QR Code (CTA Frame Only) */}
              {frame.showQR && (
                <div class="qr-container-persistent">
                  <div class="qr-code-box" data-url="https://crsoxford.com">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="10" width="20" height="20" fill="#C2A85A"/>
                      <rect x="40" y="10" width="20" height="20" fill="#C2A85A"/>
                      <rect x="70" y="10" width="20" height="20" fill="#C2A85A"/>
                      <rect x="10" y="40" width="20" height="20" fill="#C2A85A"/>
                      <rect x="40" y="40" width="20" height="20" fill="#C2A85A"/>
                      <rect x="70" y="40" width="20" height="20" fill="#C2A85A"/>
                      <rect x="10" y="70" width="20" height="20" fill="#C2A85A"/>
                      <rect x="40" y="70" width="20" height="20" fill="#C2A85A"/>
                      <rect x="70" y="70" width="20" height="20" fill="#C2A85A"/>
                    </svg>
                  </div>
                  <p class="qr-label">Scan for rates</p>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div class="frame-progress">
              <div class="progress-fill" style={`background: ${frame.accent}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* System Status Bar (Persistent) */}
      <div class="system-status-bar">
        <div class="status-item">
          <div class="status-led"></div>
          <span class="status-label">LIVE</span>
        </div>
        <div class="status-item">
          <span class="status-label">118 COWLEY ROAD · OXFORD</span>
        </div>
        <div class="status-item">
          <span class="status-label">CRSOXFORD.COM</span>
        </div>
      </div>
    </div>
  );
};
