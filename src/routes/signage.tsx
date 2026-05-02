import { Hono } from 'hono'

const signage = new Hono()

signage.get('/', (c) => {
  return c.html(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=1920, initial-scale=1.0" />
  <title>CRS Signage | Display Mode</title>
  <meta name="robots" content="noindex, nofollow" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    html, body {
      background: #0a0a0a;
      color: #fff;
      font-family: 'JetBrains Mono', monospace;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
    }
    
    /* ==========================================
       SLIDE CONTAINER
       ========================================== */
    .signage-container {
      width: 100vw;
      height: 100vh;
      position: relative;
      background: linear-gradient(180deg, #0d1a0f 0%, #0a0a0a 100%);
    }
    
    .slide {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      padding: 40px 60px;
    }
    
    .slide.active {
      opacity: 1;
    }
    
    /* ==========================================
       HEADER BAR - Persistent across all slides
       ========================================== */
    .header-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, transparent 100%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      z-index: 100;
    }
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .header-logo {
      height: 50px;
      width: auto;
    }
    
    .header-address {
      font-size: 14px;
      letter-spacing: 0.15em;
      color: #8a9479;
      text-transform: uppercase;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 30px;
    }
    
    .live-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      letter-spacing: 0.2em;
      color: #4ade80;
    }
    
    .live-dot {
      width: 10px;
      height: 10px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 0 0 10px #4ade80;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(0.9); }
    }
    
    /* ==========================================
       SLIDE CONTENT LAYOUTS
       ========================================== */
    .slide-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 80px;
      text-align: center;
    }
    
    .brand-logo {
      max-height: 280px;
      max-width: 500px;
      width: auto;
      margin-bottom: 40px;
      filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5));
    }
    
    .brand-logo.large {
      max-height: 350px;
      max-width: 600px;
    }
    
    .slide-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 72px;
      letter-spacing: 0.08em;
      color: #f5f0d8;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
      margin-bottom: 20px;
    }
    
    .slide-subtitle {
      font-size: 28px;
      letter-spacing: 0.1em;
      color: #c2a85a;
      margin-bottom: 30px;
    }
    
    .slide-body {
      font-size: 22px;
      line-height: 1.6;
      color: #b7c2a7;
      max-width: 800px;
    }
    
    .price-tag {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #ffd700;
      margin-top: 20px;
      text-shadow: 0 0 20px rgba(255,215,0,0.3);
    }
    
    .opening-badge {
      background: linear-gradient(135deg, #c2a85a 0%, #8a6914 100%);
      color: #000;
      padding: 12px 30px;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.15em;
      border-radius: 4px;
      margin-top: 30px;
    }
    
    /* ==========================================
       FOOTER BAR
       ========================================== */
    .footer-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.95) 100%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      z-index: 100;
    }
    
    .footer-contact {
      font-size: 16px;
      letter-spacing: 0.1em;
      color: #8a9479;
    }
    
    .footer-contact span {
      color: #c2a85a;
      margin-left: 20px;
    }
    
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: #4ade80;
      width: 0%;
      transition: width 0.1s linear;
    }
    
    /* ==========================================
       SPECIFIC SLIDE BACKGROUNDS
       ========================================== */
    .slide-crs {
      background: linear-gradient(135deg, #1a2818 0%, #0d1a0f 50%, #0a0a0a 100%);
    }
    
    .slide-cricket {
      background: linear-gradient(135deg, #2a1f35 0%, #1a1525 50%, #0a0a0a 100%);
    }
    
    .slide-workshop {
      background: linear-gradient(135deg, #2a2518 0%, #1a1a0f 50%, #0a0a0a 100%);
    }
    
    .slide-repair {
      background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #0a0a0a 100%);
    }
    
    /* Service features list */
    .features-list {
      display: flex;
      gap: 40px;
      margin-top: 30px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .feature-item {
      font-size: 18px;
      color: #8a9479;
      letter-spacing: 0.1em;
    }
    
    .feature-item::before {
      content: '◆';
      color: #c2a85a;
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <div class="signage-container">
    
    <!-- HEADER BAR (Persistent) -->
    <div class="header-bar">
      <div class="header-left">
        <img src="/static/crs-badge-square.png" alt="CRS" class="header-logo" />
        <span class="header-address">118 Cowley Road · Oxford · OX4 1JE</span>
      </div>
      <div class="header-right">
        <div class="live-indicator">
          <div class="live-dot"></div>
          LIVE
        </div>
      </div>
    </div>
    
    <!-- SLIDE 1: CRS Welcome -->
    <div class="slide slide-crs active" data-duration="10000">
      <div class="slide-content">
        <img src="/static/crs-wooden-sign.svg" alt="Cowley Road Studios" class="brand-logo large" />
        <h1 class="slide-title">RECORDING STUDIO & REHEARSAL ROOMS</h1>
        <p class="slide-subtitle">Oxford's Grassroots Music Infrastructure</p>
        <div class="features-list">
          <span class="feature-item">Recording</span>
          <span class="feature-item">Rehearsal</span>
          <span class="feature-item">Production</span>
        </div>
      </div>
    </div>
    
    <!-- SLIDE 2: Recording Services (CRS) -->
    <div class="slide slide-crs" data-duration="10000">
      <div class="slide-content">
        <picture><source srcset="/static/crs-rack-badge.webp" type="image/webp" /><img src="/static/crs-rack-badge.png" alt="CRS" class="brand-logo" /></picture>
        <h1 class="slide-title">RECORDING STUDIO</h1>
        <p class="slide-subtitle">Cowley Road · Full Production Facility</p>
        <p class="slide-body">
          Professional tracking, mixing & mastering<br />
          Analog-hybrid workflow · Experienced engineers
        </p>
        <div class="price-tag">FROM £35/HR</div>
      </div>
    </div>
    
    <!-- SLIDE 3: Rehearsal (Cricket Road) -->
    <div class="slide slide-cricket" data-duration="10000">
      <div class="slide-content">
        <img src="/static/cricket-road-sign.png" alt="Cricket Road" class="brand-logo" />
        <h1 class="slide-title">REHEARSAL ROOMS</h1>
        <p class="slide-subtitle">Cricket Road · OX4 3DJ</p>
        <p class="slide-body">
          Soundproofed rooms · Full backline provided<br />
          Weekly resident slots available
        </p>
        <div class="price-tag">FROM £40/2HR SESSION</div>
      </div>
    </div>
    
    <!-- SLIDE 4: Workshop Café -->
    <div class="slide slide-workshop" data-duration="10000">
      <div class="slide-content">
        <img src="/static/workshop-cafe-logo.png" alt="Workshop Café" class="brand-logo large" />
        <h1 class="slide-title">THE WORKSHOP CAFÉ</h1>
        <p class="slide-subtitle">118 Cowley Road · Front Space</p>
        <div class="features-list">
          <span class="feature-item">Coffee</span>
          <span class="feature-item">Venue Hire</span>
          <span class="feature-item">Music Events</span>
          <span class="feature-item">Workshops</span>
        </div>
        <div class="opening-badge">OPENING APRIL 2026</div>
      </div>
    </div>
    
    <!-- SLIDE 5: Repair Service -->
    <div class="slide slide-repair" data-duration="10000">
      <div class="slide-content">
        <img src="/static/crs-badge-square.png" alt="CRS" class="brand-logo" />
        <h1 class="slide-title">REPAIR SERVICE</h1>
        <p class="slide-subtitle">Instruments & AV Equipment</p>
        <p class="slide-body">
          Guitar, bass & amp repairs<br />
          PA systems · Venue tech support<br />
          Synth & electronic repair
        </p>
        <div class="price-tag">FROM £60 MINIMUM</div>
      </div>
    </div>
    
    <!-- SLIDE 6: Contact / CTA -->
    <div class="slide slide-crs" data-duration="8000">
      <div class="slide-content">
        <img src="/static/crs-wooden-sign.svg" alt="Cowley Road Studios" class="brand-logo" />
        <h1 class="slide-title">BOOK NOW</h1>
        <p class="slide-subtitle">crsoxford.com · 01865 722027</p>
        <p class="slide-body">
          info@crsoxford.com<br />
          @cowleyroadstudios
        </p>
      </div>
    </div>
    
    <!-- FOOTER BAR (Persistent) -->
    <div class="footer-bar">
      <div class="footer-contact">
        crsoxford.com <span>info@crsoxford.com</span> <span>01865 722027</span>
      </div>
      <div class="progress-bar" id="progressBar"></div>
    </div>
    
  </div>
  
  <script>
    (function() {
      const slides = document.querySelectorAll('.slide');
      const progressBar = document.getElementById('progressBar');
      let currentIndex = 0;
      let progressInterval;
      
      function showSlide(index) {
        slides.forEach((s, i) => {
          s.classList.toggle('active', i === index);
        });
        
        // Reset progress bar
        const duration = parseInt(slides[index].dataset.duration) || 10000;
        progressBar.style.width = '0%';
        
        clearInterval(progressInterval);
        let progress = 0;
        const step = 100 / (duration / 100);
        
        progressInterval = setInterval(() => {
          progress += step;
          progressBar.style.width = progress + '%';
          
          if (progress >= 100) {
            clearInterval(progressInterval);
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
          }
        }, 100);
      }
      
      // Start
      setTimeout(() => showSlide(0), 1000);
      
      // ESC to exit
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.location.href = '/';
      });
    })();
  </script>
</body>
</html>`
  )
})

export { signage }
