/**
 * Digital Signage Channel - /signagesignal
 * Optimized for 55" Yodeck displays (1920×1080)
 * Full-screen carousel with rack modules
 */

const rackModules = [
  {
    title: 'COWLEY ROAD REHEARSAL',
    image: '/static/rack-images/rehearsal-combi-1920w.webp',
    description: 'Professional rehearsal room • £45-£65 per session',
    qrUrl: 'https://cowleyroadstudios.com/book',
    category: 'REHEARSAL'
  },
  {
    title: 'RECORDING SERVICES',
    image: '/static/rack-images/recording-services-1920w.webp',
    description: 'Professional recording with engineer included',
    qrUrl: 'https://cowleyroadstudios.com/book',
    category: 'RECORDING'
  },
  {
    title: 'CONTROL ROOM HIRE',
    image: '/static/rack-images/control-room-buttons-1920w.webp',
    description: 'Self-operated mixing • Professional monitoring',
    qrUrl: 'https://cowleyroadstudios.com/book',
    category: 'CONTROL ROOM'
  },
  {
    title: 'WORKSHOP CAFÉ',
    image: '/static/rack-images/workshop-cafe-1920w.webp',
    description: 'Coffee • Repairs • Coworking • Venue Hire',
    qrUrl: 'https://cowleyroadstudios.com/workshop-cafe',
    category: 'CAFÉ'
  },
  {
    title: 'CRS WELCOME',
    image: '/static/rack-images/welcome-rack-1920w.webp',
    description: '118 Cowley Road • Oxford OX4 1JE',
    qrUrl: 'https://cowleyroadstudios.com',
    category: 'INFO'
  }
];

export const SignageSignal = () => {
  return (
    <div class="signage-signal-container">
      <div class="signage-carousel" id="signageCarousel">
        {rackModules.map((module, index) => (
          <div class={`signage-slide ${index === 0 ? 'active' : ''}`} data-slide={index}>
            <div class="signage-background" style={`background-image: url('${module.image}')`} role="img" aria-label={module.title} />
            <div class="signage-overlay">
              <div class="signage-category">{module.category}</div>
              <h1 class="signage-title">{module.title}</h1>
              <p class="signage-description">{module.description}</p>
              <div class="signage-qr-container">
                <div class="signage-qr-code" data-url={module.qrUrl}></div>
                <p class="signage-qr-label">SCAN TO BOOK</p>
              </div>
              <div class="signage-logo">
                <span class="signage-logo-text">CRS</span>
                <span class="signage-logo-subtitle">COWLEY ROAD STUDIOS</span>
              </div>
            </div>
            <div class="signage-progress"><div class="signage-progress-bar"></div></div>
          </div>
        ))}
      </div>
      <div class="signage-indicators">
        {rackModules.map((_, index) => (
          <button class={`signage-indicator ${index === 0 ? 'active' : ''}`} data-slide={index} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>
      <div class="signage-status-bar">
        <div class="signage-status-item"><span class="signage-status-label">STATUS:</span><span class="signage-status-value live">LIVE</span></div>
        <div class="signage-status-item"><span class="signage-status-label">LOCATION:</span><span class="signage-status-value">118 COWLEY ROAD, OXFORD</span></div>
        <div class="signage-status-item"><span class="signage-status-label">BOOKINGS:</span><span class="signage-status-value">ONLINE & PHONE</span></div>
      </div>
    </div>
  );
};
