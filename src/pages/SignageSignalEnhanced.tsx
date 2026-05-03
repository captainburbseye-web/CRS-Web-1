/**
 * SIGNAGE SIGNAL - ENHANCED MULTI-MODE DISPLAY
 * /signagesignal - Three display modes (A/B/E) for 55" Yodeck
 * 
 * MODE A: Audio-Reactive (particle effects, waveforms)
 * MODE B: Parallax Layers (3D depth rack stack)
 * MODE E: Ambient Cinematic (smooth video loops)
 * 
 * Press 'M' to cycle modes | Press 'P' to pause
 */

const slides = [
  {
    id: 'rehearsal-cowley',
    title: 'COWLEY ROAD REHEARSAL',
    subtitle: '118 Cowley Road · Oxford',
    description: 'Professional rehearsal room with backline',
    pricing: '£45 (2hrs) | £60 (3hrs) | £65 (4hrs)',
    image: '/static/rack-images/rehearsal-combi-1920w.webp',
    qrUrl: 'https://cowleyroadstudios.com/rehearsal-rooms-oxford',
    color: '#FFDB58',
    channel: 'CH-01',
    category: 'REHEARSAL'
  },
  {
    id: 'recording',
    title: 'RECORDING SERVICES',
    subtitle: 'Cowley Road HQ',
    description: 'Engineer-led sessions, multi-room tracking',
    pricing: 'From £35/hr (2hr minimum)',
    image: '/static/rack-images/recording-services-1920w.webp',
    qrUrl: 'https://cowleyroadstudios.com/recording-studio-oxford',
    color: '#39FF14',
    channel: 'CH-03',
    category: 'RECORDING'
  },
  {
    id: 'control-room',
    title: 'CONTROL ROOM HIRE',
    subtitle: 'Cricket Road · Self-Operated',
    description: 'Professional mixing environment, dry hire',
    pricing: '£30/hr (2hr minimum)',
    image: '/static/rack-images/control-room-1920w.webp',
    qrUrl: 'https://cowleyroadstudios.com/recording-studio-oxford',
    color: '#00D9FF',
    channel: 'CH-02',
    category: 'CONTROL ROOM'
  },
  {
    id: 'workshop-cafe',
    title: 'WORKSHOP CAFÉ',
    subtitle: 'The Billet Building · 118 Cowley Road',
    description: 'Coffee • Repairs • Musical Curios • Work Spaces',
    pricing: 'Opening Spring 2026 · Sell Your Art Here!',
    image: '/static/workshop-cafe-assets/logo-3d-render-dark.jpg',
    qrUrl: 'https://cowleyroadstudios.com/workshop-cafe',
    color: '#E89B3C',
    channel: 'CH-04',
    category: 'CAFÉ'
  },
  {
    id: 'welcome',
    title: 'COWLEY ROAD STUDIOS',
    subtitle: '118 Cowley Road · Oxford OX4 1JE',
    description: 'Recording · Rehearsal · Control Room · Café',
    pricing: 'Book Online or Call 01865 722027',
    image: '/static/rack-images/welcome-rack-1920w.webp',
    qrUrl: 'https://cowleyroadstudios.com',
    color: '#D4AF37',
    channel: 'CH-00',
    category: 'INFO'
  }
];

export const SignageSignalEnhanced = () => {
  return (
    <div class="signage-multi-mode" data-mode="ambient" id="signageContainer">
      {/* Mode Switcher (hidden, keyboard-activated) */}
      <div class="mode-indicator" id="modeIndicator">MODE: AMBIENT</div>
      
      {/* Ambient Mode (E) - Default */}
      <div class="signage-mode signage-mode-ambient active" id="modeAmbient">
        <div class="ambient-carousel">
          {slides.map((slide, index) => (
            <div class={`ambient-slide ${index === 0 ? 'active' : ''}`} data-slide={index} data-color={slide.color}>
              {/* Background Image with Subtle Parallax */}
              <div class="ambient-background" style={`background-image: url('${slide.image}')`}>
                <div class="ambient-overlay"></div>
                {/* Subtle Film Grain */}
                <div class="ambient-grain" aria-hidden="true"></div>
                {/* CRS Wordmark Watermark */}
                <div class="crs-wordmark-watermark" aria-hidden="true">
                  <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="10" y="50" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="36" font-weight="bold" fill="white" fill-opacity="0.03">COWLEY ROAD STUDIOS</text>
                  </svg>
                </div>
              </div>
              
              {/* Minimal Content Overlay */}
              <div class="ambient-content">
                {/* CRS Badge Logo (Top-Left) */}
                <div class="crs-branding-badge">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke={slide.color} stroke-width="3" fill="rgba(0,0,0,0.7)"/>
                    <text x="50" y="60" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="32" font-weight="bold" fill={slide.color} text-anchor="middle">CRS</text>
                  </svg>
                </div>
                
                <div class="ambient-header">
                  <span class="ambient-channel" style={`color: ${slide.color}`}>{slide.channel}</span>
                  <span class="ambient-category">{slide.category}</span>
                  {/* LED Indicator */}
                  <div class="ambient-led pulse" style={`background: radial-gradient(circle, ${slide.color} 60%, rgba(0,0,0,0.8) 100%); box-shadow: 0 0 12px ${slide.color}, 0 0 24px ${slide.color}`} aria-label="Status: Live"></div>
                </div>
                
                <div class="ambient-main">
                  <h1 class="ambient-title" style={`color: ${slide.color}; text-shadow: 0 0 40px ${slide.color}`}>
                    {slide.title}
                  </h1>
                  <p class="ambient-subtitle">{slide.subtitle}</p>
                  <p class="ambient-description">{slide.description}</p>
                  <p class="ambient-pricing" style={`color: ${slide.color}`}>{slide.pricing}</p>
                </div>
                
                <div class="ambient-footer">
                  <div class="ambient-qr" data-url={slide.qrUrl}>
                    <div class="qr-code-placeholder" style={`border-color: ${slide.color}`}></div>
                    <span class="qr-label">SCAN TO BOOK</span>
                  </div>
                  <div class="ambient-badge">
                    <span class="badge-logo">CRS</span>
                    <span class="badge-text">COWLEY ROAD STUDIOS</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div class="ambient-progress">
                <div class="progress-bar" style={`background: ${slide.color}`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div class="ambient-indicators">
          {slides.map((_, index) => (
            <button class={`indicator ${index === 0 ? 'active' : ''}`} data-slide={index}></button>
          ))}
        </div>
      </div>
      
      {/* Audio-Reactive Mode (A) */}
      <div class="signage-mode signage-mode-audio" id="modeAudio">
        <canvas id="audioCanvas" class="audio-canvas"></canvas>
        <div class="audio-carousel">
          {slides.map((slide, index) => (
            <div class={`audio-slide ${index === 0 ? 'active' : ''}`} data-slide={index}>
              {/* Background with Particle Field */}
              <div class="audio-background" style={`background-image: url('${slide.image}')`}>
                <canvas class="particle-canvas" data-color={slide.color}></canvas>
              </div>
              
              {/* Floating Content */}
              <div class="audio-content">
                <div class="audio-waveform" data-color={slide.color}>
                  {/* SVG waveform generated by JS */}
                </div>
                
                <div class="audio-card" style={`border-color: ${slide.color}; box-shadow: 0 0 30px ${slide.color}40`}>
                  <span class="audio-channel">{slide.channel}</span>
                  <h1 class="audio-title" style={`color: ${slide.color}`}>{slide.title}</h1>
                  <p class="audio-description">{slide.description}</p>
                  <p class="audio-pricing" style={`color: ${slide.color}`}>{slide.pricing}</p>
                </div>
                
                <div class="audio-qr-glow" data-url={slide.qrUrl} style={`box-shadow: 0 0 40px ${slide.color}`}>
                  <div class="qr-code-placeholder" style={`border-color: ${slide.color}`}></div>
                  <span class="qr-label">SCAN TO BOOK</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Parallax Mode (B) */}
      <div class="signage-mode signage-mode-parallax" id="modeParallax">
        <div class="parallax-scene" id="parallaxScene">
          {slides.map((slide, index) => (
            <div class={`parallax-slide ${index === 0 ? 'active' : ''}`} data-slide={index}>
              {/* 5 Layers - Different Depths */}
              <div class="parallax-layer parallax-layer-5" data-depth="0.1" style={`background-image: url('${slide.image}')`}></div>
              <div class="parallax-layer parallax-layer-4" data-depth="0.3">
                <div class="layer-glow" style={`box-shadow: 0 0 200px ${slide.color}80`}></div>
              </div>
              <div class="parallax-layer parallax-layer-3" data-depth="0.5">
                <div class="parallax-card" style={`border-color: ${slide.color}; box-shadow: 0 0 40px ${slide.color}60`}>
                  <h2 class="parallax-title" style={`color: ${slide.color}`}>{slide.title}</h2>
                  <p class="parallax-description">{slide.description}</p>
                </div>
              </div>
              <div class="parallax-layer parallax-layer-2" data-depth="0.7">
                <div class="parallax-vu-meter" data-color={slide.color}>
                  {/* VU meter bars */}
                  <div class="vu-bar"></div>
                  <div class="vu-bar"></div>
                  <div class="vu-bar"></div>
                </div>
              </div>
              <div class="parallax-layer parallax-layer-1" data-depth="0.9">
                <div class="parallax-pricing" style={`color: ${slide.color}`}>{slide.pricing}</div>
                <div class="parallax-qr" data-url={slide.qrUrl}>
                  <div class="qr-code-placeholder" style={`border-color: ${slide.color}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status Bar (Visible in All Modes) */}
      <div class="signage-status-bar">
        <div class="status-item">
          <div class="status-led led-green"></div>
          <span class="status-label">MODE:</span>
          <span class="status-value live">LIVE</span>
        </div>
        <div class="status-item">
          <span class="status-label">LOCATION:</span>
          <span class="status-value">118 COWLEY ROAD · OXFORD OX4 1JE</span>
        </div>
        <div class="status-item">
          <span class="status-label">BOOKINGS:</span>
          <span class="status-value">ONLINE · PHONE · WALK-IN</span>
        </div>
        <div class="status-item">
          <span class="status-label">SYSTEM:</span>
          <span class="status-value">CRS-SIGNAL-ENHANCED v3.0 MULTI-MODE</span>
        </div>
      </div>
    </div>
  );
};
