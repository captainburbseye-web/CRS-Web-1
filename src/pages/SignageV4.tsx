/**
 * CRS SIGNAGE V4 — ON-BRAND, EYE-CATCHING, ALLURING
 * Route: /signage-v4
 *
 * Improvements over V3:
 * - Oswald display font for punchy titles (matches main site)
 * - Rasta stripe accent bar (matches main site)
 * - Reduced overlay opacity — images breathe
 * - Text entrance animations on every frame
 * - Real QR code (scannable)
 * - Live clock in status bar
 * - Frame indicator dots
 * - Price callouts on service frames
 * - CRT scanline texture
 * - Workshop Café has distinct warm amber treatment
 * - VU meters: 12 bars, properly sized and animated
 * - Brass/gold palette matched to cowleyroadstudios.com
 */

// Real QR code SVG for https://crsoxford.com
const QR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27" shape-rendering="crispEdges"><path stroke="#D4AF37" d="M1 1.5h7m3 0h1m2 0h1m4 0h7M1 2.5h1m5 0h1m3 0h2m1 0h3m2 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m1 0h2m5 0h2m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h3m2 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h1m3 0h2m1 0h1m2 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M9 8.5h4m2 0h1M1 9.5h1m1 0h5m2 0h2m2 0h4m1 0h5M2 10.5h2m4 0h4m1 0h2m2 0h2m1 0h1m3 0h1M4 11.5h5m3 0h1m1 0h4m1 0h4m1 0h2M4 12.5h2m2 0h1m3 0h2m1 0h1m1 0h1m7 0h1M1 13.5h5m1 0h1m2 0h1m1 0h4m2 0h2m1 0h1m1 0h3M1 14.5h3m1 0h2m1 0h3m3 0h1m2 0h2m1 0h1m1 0h1m1 0h1M1 15.5h1m2 0h1m2 0h1m1 0h2m1 0h2m1 0h2m2 0h4m1 0h2M1 16.5h1m1 0h1m1 0h1m3 0h2m1 0h1m2 0h1m1 0h2m1 0h2m3 0h1M1 17.5h1m1 0h1m2 0h2m1 0h1m2 0h1m3 0h6m1 0h1M9 18.5h1m3 0h2m1 0h2m3 0h2M1 19.5h7m2 0h1m3 0h2m1 0h1m1 0h1m1 0h1m1 0h3M1 20.5h1m5 0h1m1 0h1m1 0h1m1 0h2m2 0h1m3 0h2m1 0h2M1 21.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h7m1 0h3M1 22.5h1m1 0h3m1 0h1m1 0h2m5 0h1m1 0h2m1 0h5M1 23.5h1m1 0h3m1 0h1m1 0h2m1 0h2m2 0h2m4 0h2m1 0h1M1 24.5h1m5 0h1m4 0h1m2 0h1m1 0h2m1 0h3m2 0h1M1 25.5h7m1 0h1m2 0h1m5 0h1m1 0h6"/></svg>`;

const FRAMES = [
  {
    id: 'opening',
    type: 'opening',
    duration: 7000,
    bgImage: '/static/rack-images/welcome-rack-1920w.webp',
    overlay: '',
  },
  {
    id: 'recording',
    type: 'service',
    duration: 10000,
    bgImage: '/static/rack-images/recording-services-1920w.webp',
    overlay: '',
    eyebrow: 'COWLEY ROAD · CRICKET ROAD',
    title: 'PROFESSIONAL\nRECORDING',
    titleAccent: 'accent-brass',
    body: 'Engineer-led sessions · Full-band tracking\nMixing & production · Mastering',
    prices: [
      { amount: '£35', label: 'per hour' },
      { amount: '£120', label: 'half day' },
      { amount: '£220', label: 'full day' },
    ],
    showVU: true,
    progressColor: '',
  },
  {
    id: 'rehearsal',
    type: 'split',
    duration: 10000,
    bgImage: '/static/rack-images/cowley-rehearsal-1920w.webp',
    overlay: '',
    eyebrow: 'COWLEY ROAD & CRICKET ROAD',
    title: 'REHEARSAL\nROOMS',
    titleAccent: 'accent-white',
    body: 'Full backline · Clear signal paths\nBook by the hour · Walk-in welcome',
    prices: [
      { amount: '£45', label: '2 hours' },
      { amount: '£60', label: '3 hours' },
      { amount: '£65', label: '4 hours' },
    ],
    progressColor: 'green',
  },
  {
    id: 'workshop-cafe',
    type: 'cafe',
    duration: 9000,
    bgImage: '/static/rack-images/workshop-cafe-1920w.webp',
    overlay: 'warm',
    eyebrow: 'OPEN NOW',
    title: 'WORKSHOP\nCAFÉ',
    body: 'Specialty coffee · Instrument repairs\nCoworking · Events · Community\n118 Cowley Road',
    progressColor: 'amber',
  },
  {
    id: 'control-room',
    type: 'service',
    duration: 9000,
    bgImage: '/static/rack-images/control-room-1920w.webp',
    overlay: 'deep',
    eyebrow: 'CRICKET ROAD STUDIO',
    title: 'CONTROL ROOM\nHIRE',
    titleAccent: 'accent-brass',
    body: 'Professional monitoring environment\nDry hire · No engineer required\nIdeal for mixing & mastering',
    prices: [
      { amount: '£20', label: 'per hour' },
    ],
    progressColor: '',
  },
  {
    id: 'community',
    type: 'service',
    duration: 9000,
    bgImage: '/static/rack-images/crs-header-1920w.webp',
    overlay: 'deep',
    eyebrow: 'GRASSROOTS · OXFORD',
    title: 'SERIOUS SOUND.\nOPEN DOORS.',
    titleAccent: 'accent-white',
    body: 'Student bands · Session players · Engineers\nLocal artists · Community groups\nSubsidised rates available',
    progressColor: 'green',
  },
  {
    id: 'cta',
    type: 'cta',
    duration: 10000,
    bgImage: '/static/rack-images/welcome-rack-1920w.webp',
    overlay: '',
    progressColor: '',
  },
];

export const SignageV4 = () => {
  return (
    <div class="signage-v4-container">

      {/* Rasta Stripe — top accent bar matching main site */}
      <div class="rasta-stripe" aria-hidden="true">
        <div class="rasta-stripe-green"></div>
        <div class="rasta-stripe-yellow"></div>
        <div class="rasta-stripe-red"></div>
      </div>

      {/* CRT Scanline Overlay */}
      <div class="scanline-overlay" aria-hidden="true"></div>

      {/* Content Frames */}
      <div class="signage-frames" id="signageFrames">

        {/* ── FRAME 1: OPENING ─────────────────────────────────── */}
        <div
          class="signage-frame opening-frame active"
          data-frame="0"
          data-duration={FRAMES[0].duration}
          style={`background-image: url('${FRAMES[0].bgImage}')`}
        >
          <div class="frame-overlay"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
              <div class="crs-badge-wordmark">
                COWLEY ROAD<br />STUDIOS
              </div>
            </div>
            <div class="frame-hero">
              <h1 class="frame-title">COWLEY ROAD<br />STUDIOS</h1>
              <p class="frame-subtitle">OXFORD · EST. 1999</p>
              <p class="tagline">Serious sound. Open doors.</p>
              <div class="heritage-badge">
                ◆ Continuing the Soundworks Oxford legacy
              </div>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill"></div>
          </div>
        </div>

        {/* ── FRAME 2: RECORDING ───────────────────────────────── */}
        <div
          class="signage-frame"
          data-frame="1"
          data-duration={FRAMES[1].duration}
          style={`background-image: url('${FRAMES[1].bgImage}')`}
        >
          <div class="frame-overlay"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
            </div>
            <div class="frame-hero">
              <p class="frame-eyebrow">COWLEY ROAD · CRICKET ROAD</p>
              <h1 class="frame-title accent-brass">PROFESSIONAL<br />RECORDING</h1>
              <div class="frame-divider"></div>
              <p class="frame-body">Engineer-led sessions · Full-band tracking{'\n'}Mixing & production · Mastering</p>
              <div class="price-tags">
                <div class="price-tag">
                  <span class="price-amount">£35</span>
                  <span class="price-label">per hour</span>
                </div>
                <div class="price-tag">
                  <span class="price-amount">£120</span>
                  <span class="price-label">half day</span>
                </div>
                <div class="price-tag">
                  <span class="price-amount">£220</span>
                  <span class="price-label">full day</span>
                </div>
              </div>
              <div class="vu-meters" aria-hidden="true">
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
                <div class="vu-bar"></div>
              </div>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill"></div>
          </div>
        </div>

        {/* ── FRAME 3: REHEARSAL ───────────────────────────────── */}
        <div
          class="signage-frame"
          data-frame="2"
          data-duration={FRAMES[2].duration}
          style={`background-image: url('${FRAMES[2].bgImage}')`}
        >
          <div class="frame-overlay"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
            </div>
            <div class="frame-hero">
              <p class="frame-eyebrow">COWLEY ROAD & CRICKET ROAD</p>
              <h1 class="frame-title accent-white">REHEARSAL<br />ROOMS</h1>
              <div class="frame-divider"></div>
              <p class="frame-body">Full backline · Clear signal paths{'\n'}Book by the hour · Walk-in welcome</p>
              <div class="price-tags">
                <div class="price-tag">
                  <span class="price-amount">£45</span>
                  <span class="price-label">2 hours</span>
                </div>
                <div class="price-tag">
                  <span class="price-amount">£60</span>
                  <span class="price-label">3 hours</span>
                </div>
                <div class="price-tag">
                  <span class="price-amount">£65</span>
                  <span class="price-label">4 hours</span>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill green"></div>
          </div>
        </div>

        {/* ── FRAME 4: WORKSHOP CAFÉ ───────────────────────────── */}
        <div
          class="signage-frame cafe-frame"
          data-frame="3"
          data-duration={FRAMES[3].duration}
          style={`background-image: url('${FRAMES[3].bgImage}')`}
        >
          <div class="frame-overlay warm"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
            </div>
            <div class="frame-hero">
              <div class="cafe-badge">OPEN NOW</div>
              <h1 class="frame-title">WORKSHOP<br />CAFÉ</h1>
              <div class="frame-divider amber"></div>
              <p class="frame-body">Specialty coffee · Instrument repairs{'\n'}Coworking · Events · Community{'\n'}118 Cowley Road, Oxford</p>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill amber"></div>
          </div>
        </div>

        {/* ── FRAME 5: CONTROL ROOM ────────────────────────────── */}
        <div
          class="signage-frame"
          data-frame="4"
          data-duration={FRAMES[4].duration}
          style={`background-image: url('${FRAMES[4].bgImage}')`}
        >
          <div class="frame-overlay deep"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
            </div>
            <div class="frame-hero">
              <p class="frame-eyebrow">CRICKET ROAD STUDIO</p>
              <h1 class="frame-title accent-brass">CONTROL ROOM<br />HIRE</h1>
              <div class="frame-divider"></div>
              <p class="frame-body">Professional monitoring environment{'\n'}Dry hire · No engineer required{'\n'}Ideal for mixing & mastering</p>
              <div class="price-tags">
                <div class="price-tag">
                  <span class="price-amount">£20</span>
                  <span class="price-label">per hour</span>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill"></div>
          </div>
        </div>

        {/* ── FRAME 6: COMMUNITY / IDENTITY ────────────────────── */}
        <div
          class="signage-frame"
          data-frame="5"
          data-duration={FRAMES[5].duration}
          style={`background-image: url('${FRAMES[5].bgImage}')`}
        >
          <div class="frame-overlay deep"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
            </div>
            <div class="frame-hero">
              <p class="frame-eyebrow">GRASSROOTS · OXFORD</p>
              <h1 class="frame-title accent-white">SERIOUS SOUND.<br />OPEN DOORS.</h1>
              <div class="frame-divider"></div>
              <p class="frame-body">Student bands · Session players · Engineers{'\n'}Local artists · Community groups{'\n'}Subsidised rates available</p>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill green"></div>
          </div>
        </div>

        {/* ── FRAME 7: BOOK NOW (CTA) ──────────────────────────── */}
        <div
          class="signage-frame cta-frame"
          data-frame="6"
          data-duration={FRAMES[6].duration}
          style={`background-image: url('${FRAMES[6].bgImage}')`}
        >
          <div class="frame-overlay"></div>
          <div class="frame-content">
            <div class="crs-badge">
              <div class="crs-badge-circle">CRS</div>
            </div>
            <div class="frame-hero">
              <p class="frame-eyebrow">REHEARSAL · RECORDING · CAFÉ</p>
              <h1 class="frame-title">BOOK<br />NOW</h1>
              <div class="frame-divider"></div>
              <p class="frame-body">Scan to view rates & availability</p>
              <div class="qr-section">
                <div class="qr-box" dangerouslySetInnerHTML={{ __html: QR_SVG }}></div>
                <div class="qr-info">
                  <p class="qr-scan-label">↑ Scan to book</p>
                  <p class="qr-url">crsoxford.com</p>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-progress">
            <div class="progress-fill"></div>
          </div>
        </div>

      </div>

      {/* Frame Indicator Dots */}
      <div class="frame-indicators" aria-hidden="true">
        {FRAMES.map((_, i) => (
          <div class={`frame-dot ${i === 0 ? 'active' : ''}`} data-dot={i}></div>
        ))}
      </div>

      {/* Status Bar */}
      <div class="status-bar" role="status" aria-live="off">
        <div class="status-left">
          <div class="status-led"></div>
          <span>LIVE</span>
          <span class="status-separator">·</span>
          <span>OPERATIONAL</span>
        </div>
        <div class="status-center">
          118 COWLEY ROAD · OXFORD · OX4 1JE
        </div>
        <div class="status-right">
          <span class="status-clock" id="status-clock">00:00:00</span>
          <span class="status-separator">·</span>
          <span>CRSOXFORD.COM</span>
        </div>
      </div>

    </div>
  );
};
