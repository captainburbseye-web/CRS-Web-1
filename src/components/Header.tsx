export const Header = () => (
  <>
    {/* MASTER RACK HEADER: 1U Rack Unit AT THE TOP */}
    <div class="rack-header-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
        alt="Cowley Road Studios Master Rack" 
        class="rack-header-img"
      />
    </div>

    {/* ── PERSISTENT LCD STATUS BAR ─────────────────────────── */}
    <div class="crs-lcd-status-bar" aria-live="polite" aria-label="Studio status">
      <div class="crs-lcd-status-inner">
        <span class="crs-lcd-dot" aria-hidden="true"></span>
        <span class="crs-lcd-text">
          OXFORD HQ: FULLY OPERATIONAL&nbsp;&nbsp;/&nbsp;&nbsp;BOOKINGS OPEN
        </span>
        <span class="crs-lcd-dot" aria-hidden="true"></span>
      </div>
    </div>
    
    <header class="rack-header">
      {/* MOBILE MENU TOGGLE */}
      <button class="mobile-menu-toggle" aria-label="Open menu">
        <span class="hamburger-icon">☰</span>
      </button>
      
      {/* NAVIGATION — desktop full / mobile 5 links */}
      <nav class="rack-header-nav" aria-label="Main navigation">
        {/* Desktop links */}
        <a href="/" class="nav-link nav-link--desktop-only">Studio</a>
        <span class="separator nav-link--desktop-only">|</span>
        <a href="/work" class="nav-link nav-link--desktop-only">Work</a>
        <span class="separator nav-link--desktop-only">|</span>
        <a href="/workshop-cafe" class="nav-link nav-link--desktop-only">Workshop Café</a>
        <span class="separator nav-link--desktop-only">|</span>
        <a href="/av-services" class="nav-link nav-link--desktop-only">AV</a>
        <span class="separator nav-link--desktop-only">|</span>

        {/* Mobile-visible core 5: Home · Rehearsal · Recording · Repairs · Contact */}
        <a href="/" class="nav-link nav-link--mobile">Home</a>
        <span class="separator nav-link--mobile">|</span>
        <a href="/#rehearsal" class="nav-link nav-link--mobile">Rehearsal</a>
        <span class="separator nav-link--mobile">|</span>
        <a href="/#recording" class="nav-link nav-link--mobile">Recording</a>
        <span class="separator nav-link--mobile">|</span>
        <a href="/#repairs" class="nav-link nav-link--mobile">Repairs</a>
        <span class="separator nav-link--mobile">|</span>
        <a href="/contact" class="nav-link">Contact</a>
      </nav>
      
      {/* RIGHT ZONE — 3-button CTA hierarchy */}
      <div class="rack-header-cta rack-header-cta--triple">
        <a
          href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
          target="_blank"
          rel="noopener noreferrer"
          class="crs-cta crs-cta--primary"
          aria-label="Book a rehearsal room"
        >
          BOOK REHEARSAL
        </a>
        <a
          href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX"
          target="_blank"
          rel="noopener noreferrer"
          class="crs-cta crs-cta--secondary"
          aria-label="Book a recording session"
        >
          BOOK RECORDING
        </a>
        <a
          href="/contact"
          class="crs-cta crs-cta--tertiary"
          aria-label="Send a general enquiry"
        >
          GENERAL ENQUIRY
        </a>
      </div>
    </header>
  </>
)
