/**
 * CRS SIGNAGE STREET - TRUCK/MOSTRO AUDIENCE OPTIMIZED
 * Route: /signage-street
 * 
 * Target Audience:
 * - Truck Record Store patrons (20-45 min dwell time)
 * - Mostro Coffee House customers (music-savvy, creative)
 * - Cowley Road cultural community
 * 
 * Design Principles:
 * ✅ Minimalist, slow, non-invasive
 * ✅ Deep black base, off-white text, mustard/nettle accents
 * ✅ Curiosity-driven prompts, civic micro-messages
 * ✅ Subtle visual cues, massive negative space
 * ✅ 6-12s holds, slow fades, no flashy animations
 * ✅ Scene-appropriate, locally resonant
 * 
 * Peak Hours:
 * - Weekdays: 15:00-18:30
 * - Weekends: 11:00-16:00
 * 
 * Research: Jamini Paris, DUMBO Brooklyn, Bloomingdale's Manhattan
 */

const frames = [
  // CURIOSITY-DRIVEN FRAME 1
  {
    id: 'curiosity-behind-cafe',
    duration: 10000, // 10 seconds - longer for absorption
    type: 'curiosity',
    title: "What's happening behind the café?",
    subtitle: null,
    body: null, // Pure intrigue - no explanation yet
    visual: 'layered-peek',
    accent: '#D4AF37', // Mustard
    showArrow: true
  },

  // CIVIC MICRO-MESSAGE FRAME 2
  {
    id: 'civic-oxford',
    duration: 8000, // 8 seconds
    type: 'civic',
    title: 'Oxford.',
    subtitle: 'Still making things.',
    body: null,
    visual: 'minimal',
    accent: '#4F7942', // Nettle green
    underlineColor: '#D4AF37'
  },

  // PRE-OPENING TRANSPARENCY FRAME 3
  {
    id: 'workshop-cafe-opening',
    duration: 12000, // 12 seconds - key info
    type: 'pre-opening',
    title: 'WORKSHOP CAFÉ',
    subtitle: 'Opening Next Month',
    body: 'Recording studios behind the café — Cowley Road · Cricket Road',
    visual: 'subtle-arrow',
    accent: '#D4AF37',
    showArrow: true,
    badge: 'OPENING SOON'
  },

  // COMMUNITY RESPECT FRAME 4
  {
    id: 'musicians-walking-past',
    duration: 10000,
    type: 'civic',
    title: 'To the musicians walking past',
    subtitle: 'Respect.',
    body: null,
    visual: 'minimal',
    accent: '#4F7942'
  },

  // SPATIAL CONTEXT FRAME 5
  {
    id: 'studio-behind-cafe',
    duration: 10000,
    type: 'informational',
    title: 'Studio just behind the Workshop Café',
    subtitle: 'Opening soon',
    body: 'crsoxford.com',
    visual: 'layered-depth',
    accent: '#D4AF37',
    showArrow: true
  },

  // QR CODE / WAITLIST FRAME 6
  {
    id: 'scan-for-updates',
    duration: 12000,
    type: 'qr-code',
    title: 'Scan for updates',
    subtitle: '& early access',
    body: null,
    visual: 'qr-minimal',
    accent: '#D4AF37',
    showQR: true,
    qrURL: 'https://crsoxford.com/waitlist'
  },

  // CIVIC PULSE FRAME 7
  {
    id: 'cowley-road-noise',
    duration: 8000,
    type: 'civic',
    title: 'Cowley Road.',
    subtitle: 'Still making noise.',
    body: null,
    visual: 'minimal',
    accent: '#4F7942',
    underlineColor: '#D4AF37'
  },

  // CURIOSITY FOLLOW-UP FRAME 8
  {
    id: 'final-touches',
    duration: 10000,
    type: 'pre-opening',
    title: 'Final touches underway',
    subtitle: 'Stay tuned.',
    body: '@cowleyroadstudios',
    visual: 'fade-minimal',
    accent: '#D4AF37'
  },

  // AMBIENT RESPECT FRAME 9
  {
    id: 'reading-this-care-music',
    duration: 10000,
    type: 'civic',
    title: 'If you care about music',
    subtitle: 'We do too.',
    body: null,
    visual: 'minimal',
    accent: '#4F7942'
  }
];

// Station ID - subtle, off to side
const stationIDs = [
  { type: 'website', value: 'crsoxford.com', icon: 'web' },
  { type: 'instagram', value: '@cowleyroadstudios', icon: 'instagram' },
  { type: 'instagram', value: '@workshopcafe.ox', icon: 'instagram' }
];

export const SignageStreet = () => {
  return (
    <html lang="en" class="signage-mode">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRS Signage - Street Mode</title>
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Styles */}
        <link rel="stylesheet" href="/static/signage-street.css" />
      </head>
      
      <body>
        <div class="signage-street-container" id="signageContainer">
          
          {/* Frames Container */}
          <div class="signage-frames" id="signageFrames">
            {frames.map((frame, index) => (
              <div
                class={`signage-frame ${frame.type === 'civic' ? 'frame-civic' : ''} ${frame.type === 'curiosity' ? 'frame-curiosity' : ''} ${index === 0 ? 'active' : ''}`}
                data-frame={index}
                data-duration={frame.duration}
                data-type={frame.type}
                role="article"
                aria-label={`${frame.title} - ${frame.type} frame`}
              >
                {/* Background - minimal, mostly negative space */}
                <div class="frame-bg" aria-hidden="true"></div>

                {/* Content */}
                <div class="frame-content">
                  
                  {/* Badge (if present) */}
                  {frame.badge && (
                    <div class="frame-badge" style={`color: ${frame.accent}`}>
                      {frame.badge}
                    </div>
                  )}

                  {/* Main Text */}
                  <div class="frame-main">
                    {frame.title && (
                      <h1 class="frame-title" style={`color: ${frame.accent}`}>
                        {frame.title}
                      </h1>
                    )}
                    
                    {frame.underlineColor && (
                      <div class="frame-underline" style={`background: ${frame.underlineColor}`}></div>
                    )}
                    
                    {frame.subtitle && (
                      <p class="frame-subtitle">{frame.subtitle}</p>
                    )}
                    
                    {frame.body && (
                      <p class="frame-body">{frame.body}</p>
                    )}
                  </div>

                  {/* Subtle Arrow (spatial cue) */}
                  {frame.showArrow && (
                    <div class="frame-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5L12 19M12 19L6 13M12 19L18 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={`color: ${frame.accent}`}/>
                      </svg>
                    </div>
                  )}

                  {/* QR Code (minimal, off to side) */}
                  {frame.showQR && (
                    <div class="frame-qr-minimal" aria-label="Scan for updates and early access">
                      <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg">
                        <path stroke={frame.accent} d="M1 1.5h7m3 0h1m2 0h1m4 0h7M1 2.5h1m5 0h1m3 0h2m1 0h3m2 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m1 0h2m5 0h2m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h3m2 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h1m3 0h2m1 0h1m2 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M9 8.5h4m2 0h1M1 9.5h1m1 0h5m2 0h2m2 0h4m1 0h5M2 10.5h2m4 0h4m1 0h2m2 0h2m1 0h1m3 0h1M4 11.5h5m3 0h1m1 0h4m1 0h4m1 0h2M4 12.5h2m2 0h1m3 0h2m1 0h1m1 0h1m7 0h1M1 13.5h5m1 0h1m2 0h1m1 0h4m2 0h2m1 0h1m1 0h3M1 14.5h3m1 0h2m1 0h3m3 0h1m2 0h2m1 0h1m1 0h1m1 0h1M1 15.5h1m2 0h1m2 0h1m1 0h2m1 0h2m1 0h2m2 0h4m1 0h2M1 16.5h1m1 0h1m1 0h1m3 0h2m1 0h1m2 0h1m1 0h2m1 0h2m3 0h1M1 17.5h1m1 0h1m2 0h2m1 0h1m2 0h1m3 0h6m1 0h1M9 18.5h1m3 0h2m1 0h2m3 0h2M1 19.5h7m2 0h1m3 0h2m1 0h1m1 0h1m1 0h1m1 0h3M1 20.5h1m5 0h1m1 0h1m1 0h1m1 0h2m2 0h1m3 0h2m1 0h2M1 21.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h7m1 0h3M1 22.5h1m1 0h3m1 0h1m1 0h2m5 0h1m1 0h2m1 0h5M1 23.5h1m1 0h3m1 0h1m1 0h2m1 0h2m2 0h2m4 0h2m1 0h1M1 24.5h1m5 0h1m4 0h1m2 0h1m1 0h2m1 0h3m2 0h1M1 25.5h7m1 0h1m2 0h1m5 0h1m1 0h6"/>
                      </svg>
                      <span class="qr-label">crsoxford.com/waitlist</span>
                    </div>
                  )}
                </div>

                {/* Progress bar (very subtle) */}
                <div class="frame-progress">
                  <div class="progress-fill" style={`background: ${frame.accent}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Station ID Badge (subtle, bottom-right) */}
          <div class="station-id-minimal" id="stationIDMinimal">
            {stationIDs.map((station, index) => (
              <div 
                class={`station-badge ${index === 0 ? 'active' : ''}`}
                data-station={index}
              >
                {station.icon === 'web' && <span class="icon">→</span>}
                {station.icon === 'instagram' && <span class="icon">@</span>}
                <span class="station-value">{station.value}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Controller Script */}
        <script src="/static/signage-street.js" defer=""></script>
      </body>
    </html>
  );
};
