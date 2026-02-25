/**
 * COWLEY ROAD STUDIOS: ENHANCED DIGITAL SIGNAGE
 * Route: /signage-enhanced
 * Purpose: Full-screen auto-rotating carousel for 55" Yodeck displays
 * Features: 
 * - Auto-rotating carousel (8s per slide, 1.2s fade)
 * - QR codes on each slide
 * - Skeuomorphic hardware aesthetic
 * - WCAG 2.1 AA compliant
 * - Scroll-linked animations
 * - Performance optimized (WebP/AVIF)
 * - Offline fallback support
 */

const rackModules = [
  {
    title: 'COWLEY ROAD REHEARSAL',
    subtitle: '118 Cowley Road · Oxford',
    description: 'Professional rehearsal room with backline',
    pricing: '£45 (2hrs) | £60 (3hrs) | £65 (4hrs)',
    image: '/static/machined-assets/cowley-rehearsal-optimized.webp',
    imageAlt: 'Cowley Road Rehearsal - Professional band rehearsal space',
    qrUrl: 'https://cowleyroadstudios.com/rehearsal-rooms-oxford',
    qrLabel: 'BOOK REHEARSAL',
    category: 'REHEARSAL',
    channel: 'CH-01',
    color: 'yellow',
    colorHex: '#FFDB58'
  },
  {
    title: 'CRICKET ROAD REHEARSAL',
    subtitle: 'Cricket Road Studio · 10 min walk',
    description: 'Live room with Yamaha CLP piano, drums, backline',
    pricing: '£40 (2hrs) | £55 (3hrs) | £60 (4hrs)',
    image: '/static/machined-assets/cricket-rehearsal-magenta-optimized.webp',
    imageAlt: 'Cricket Road Rehearsal - Intimate jam space',
    qrUrl: 'https://cowleyroadstudios.com/rehearsal-rooms-oxford',
    qrLabel: 'BOOK REHEARSAL',
    category: 'REHEARSAL',
    channel: 'CH-08',
    color: 'magenta',
    colorHex: '#FF006E'
  },
  {
    title: 'CONTROL ROOM HIRE',
    subtitle: 'Cricket Road · Self-Operated',
    description: 'Professional mixing environment, dry hire',
    pricing: '£30/hr (2hr minimum)',
    image: '/static/machined-assets/cricket-control-room-optimized.webp',
    imageAlt: 'Control Room - Professional monitoring and mixing',
    qrUrl: 'https://cowleyroadstudios.com/recording-studio-oxford',
    qrLabel: 'BOOK CONTROL ROOM',
    category: 'CONTROL ROOM',
    channel: 'CH-02',
    color: 'cyan',
    colorHex: '#00D9FF'
  },
  {
    title: 'RECORDING SERVICES',
    subtitle: 'Cowley Road HQ',
    description: 'Engineer-led sessions, multi-room tracking',
    pricing: 'From £35/hr (2hr minimum)',
    image: '/static/machined-assets/cowley-pods-rack.webp',
    imageAlt: 'Recording Services - Professional studio with engineer',
    qrUrl: 'https://cowleyroadstudios.com/recording-studio-oxford',
    qrLabel: 'BOOK RECORDING',
    category: 'RECORDING',
    channel: 'CH-03',
    color: 'green',
    colorHex: '#39FF14'
  },
  {
    title: 'WORKSHOP CAFÉ',
    subtitle: '118 Cowley Road · Oxford',
    description: 'Coffee · Repairs · Coworking · Venue Hire',
    pricing: 'Opening Spring 2026',
    image: '/static/machined-assets/workshop-cafe-optimized.webp',
    imageAlt: 'Workshop Café - Creative community space',
    qrUrl: 'https://cowleyroadstudios.com/workshop-cafe',
    qrLabel: 'LEARN MORE',
    category: 'CAFÉ',
    channel: 'CH-04',
    color: 'amber',
    colorHex: '#F59E0B'
  }
];

export const SignageEnhanced = () => {
  return (
    <>
      {/* Full-Screen Carousel Container */}
      <div class="signage-enhanced-container" role="region" aria-label="Cowley Road Studios Services">
        
        {/* Carousel Wrapper */}
        <div class="signage-carousel-wrapper" id="signageCarousel">
          
          {rackModules.map((module, index) => (
            <div 
              class={`signage-slide ${index === 0 ? 'active' : ''}`} 
              data-slide={index}
              data-channel={module.channel}
              role="group"
              aria-roledescription="slide"
              aria-label={`${module.title} - Slide ${index + 1} of ${rackModules.length}`}
            >
              
              {/* Background Layer: Rack Image */}
              <div class="signage-slide-background">
                <picture>
                  <source srcset={module.image.replace('.webp', '.avif')} type="image/avif" />
                  <source srcset={module.image} type="image/webp" />
                  <img 
                    src={module.image.replace('.webp', '.jpg')}
                    alt={module.imageAlt}
                    class="rack-asset"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
                
                {/* SVG Waveform Animation */}
                <svg viewBox="0 0 200 60" class="signage-waveform" aria-hidden="true">
                  <defs>
                    <filter id={`waveform-glow-${index}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path 
                    d="M0,30 Q10,10 20,30 T40,30 T60,30 T80,50 T100,30 T120,10 T140,30 T160,30 T180,45 T200,30"
                    fill="none"
                    stroke={module.colorHex}
                    stroke-width="3"
                    filter={`url(#waveform-glow-${index})`}
                    class="signage-pulse"
                  />
                </svg>
              </div>
              
              {/* Content Overlay */}
              <div class="signage-slide-overlay">
                
                {/* Top Section: Channel + LED */}
                <div class="signage-header">
                  <div class="channel-badge" style={`border-color: ${module.colorHex};`}>
                    <span class="channel-label" style={`color: ${module.colorHex};`}>{module.channel}</span>
                    <span class="category-label">{module.category}</span>
                  </div>
                  <div 
                    class="led-indicator pulse"
                    style={`background: radial-gradient(circle, ${module.colorHex} 60%, rgba(0,0,0,0.8) 100%); box-shadow: 0 0 12px ${module.colorHex}, 0 0 24px ${module.colorHex};`}
                    aria-label="Status: Online"
                  ></div>
                </div>
                
                {/* Center Section: Title + Info */}
                <div class="signage-content">
                  <h1 class="signage-title" style={`color: ${module.colorHex}; text-shadow: 0 0 20px ${module.colorHex};`}>
                    {module.title}
                  </h1>
                  <p class="signage-subtitle">{module.subtitle}</p>
                  <p class="signage-description">{module.description}</p>
                  <p class="signage-pricing" style={`color: ${module.colorHex};`}>{module.pricing}</p>
                </div>
                
                {/* Bottom Section: QR Code */}
                <div class="signage-qr-section">
                  <div class="qr-container">
                    <div 
                      class="qr-code" 
                      data-url={module.qrUrl}
                      role="img"
                      aria-label={`QR code to ${module.qrLabel}`}
                    ></div>
                    <p class="qr-label">{module.qrLabel}</p>
                  </div>
                  
                  {/* CRS Logo Badge */}
                  <div class="crs-badge">
                    <span class="crs-logo-text">CRS</span>
                    <span class="crs-logo-subtitle">COWLEY ROAD STUDIOS</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div class="signage-progress" aria-hidden="true">
                <div class="progress-bar" style={`background: linear-gradient(90deg, ${module.colorHex}, rgba(255,255,255,0.2));`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div class="signage-indicators" role="tablist" aria-label="Slide navigation">
          {rackModules.map((_, index) => (
            <button 
              class={`indicator ${index === 0 ? 'active' : ''}`}
              data-slide={index}
              role="tab"
              aria-selected={index === 0 ? 'true' : 'false'}
              aria-label={`Go to slide ${index + 1}`}
              tabindex={index === 0 ? '0' : '-1'}
            ></button>
          ))}
        </div>
        
        {/* Status Bar */}
        <div class="signage-status-bar" role="status" aria-live="polite">
          <div class="status-item">
            <span class="status-label">STATUS:</span>
            <span class="status-value live">LIVE</span>
          </div>
          <div class="status-item">
            <span class="status-label">LOCATION:</span>
            <span class="status-value">118 COWLEY ROAD, OXFORD</span>
          </div>
          <div class="status-item">
            <span class="status-label">BOOKINGS:</span>
            <span class="status-value">ONLINE & PHONE</span>
          </div>
        </div>
      </div>
      
      {/* Load Enhanced Signage CSS */}
      <link href="/static/signage-enhanced.css" rel="stylesheet" />
      
      {/* Load Carousel Engine */}
      <script src="/static/signage-carousel-enhanced.js" defer />
      
      {/* Load QR Code Generator */}
      <script src="/static/signage-qr.js" defer />
      
      {/* Inline Critical Scripts */}
      <script dangerouslySetInnerHTML={{__html: `
        // Accessibility: Skip to content link
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            document.querySelector('.signage-slide.active')?.focus();
          }
        });
        
        // Night Mode Auto-Trigger (10pm-6am)
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 6) {
          document.documentElement.classList.add('night-mode');
        }
        
        // Reduced Motion Support
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          document.documentElement.classList.add('reduced-motion');
        }
      `}} />
    </>
  );
};
