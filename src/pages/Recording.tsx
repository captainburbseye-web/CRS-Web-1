/**
 * Recording Page - Professional tracking, mixing and production
 * Cowley Road Studios recording services with engineer support
 */

export const RecordingPage = () => {
  return (
    <>
      {/* HEADER: Master Rack Unit Only */}
      <div class="rack-header-container">
        <a href="/" aria-label="Home">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
            alt="Cowley Road Studios Master Rack" 
            class="rack-header-img"
          />
        </a>
      </div>
      
      {/* HERO */}
      <div class="studio-intro">
        <h1>Recording Studio Oxford</h1>
        <p>Professional tracking, mixing and production at Cowley Road Studios.</p>
      </div>

      {/* MAIN CONTENT */}
      <div class="recording-page-content">
        
        {/* SECTION 1 — RECORDING WITH ENGINEER */}
        <div class="recording-section primary-section">
          <h2>Guided Recording Sessions</h2>
          
          <div class="best-for">
            <p style="margin-bottom: 1rem; font-weight: 600;">Best for:</p>
            <ul>
              <li>Vocalists</li>
              <li>Acoustic artists</li>
              <li>Songwriters</li>
              <li>Solo performers</li>
              <li>Small ensembles</li>
            </ul>
          </div>

          <div class="locations-pricing">
            <div class="location-price-card">
              <h3>Cowley Road (Main Facility)</h3>
              <div class="price-display">
                <span class="price-value">£35</span>
                <span class="price-unit">per hour</span>
              </div>
              <p class="price-note">Minimum 2 hours</p>
            </div>

            <div class="location-price-card">
              <h3>Cricket Road</h3>
              <div class="price-display">
                <span class="price-value">£30</span>
                <span class="price-unit">per hour</span>
              </div>
              <p class="price-note">Minimum 2 hours</p>
            </div>
          </div>

          <div class="includes-section">
            <p style="font-weight: 600; margin-bottom: 1rem;">Includes:</p>
            <ul>
              <li>Professional mic setup</li>
              <li>Gain staging</li>
              <li>Signal chain management</li>
              <li>Session oversight</li>
              <li>File delivery</li>
            </ul>
          </div>

          <div class="session-statement">
            <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">
              Sessions are engineer-led.
            </p>
            <p style="font-style: italic; color: var(--hardware-green);">
              You perform. We capture it properly.
            </p>
          </div>

          <div class="cta-inline">
            <a href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services" class="book-button" target="_blank" rel="noopener noreferrer">
              <span class="button-led">●</span>
              BOOK STUDIO SESSION
            </a>
          </div>
        </div>

        {/* SECTION 2 — CONTROL ROOM */}
        <div class="recording-section control-room-section">
          <h2>Control Room — Dry Hire</h2>
          <p class="section-intro">For experienced engineers and producers.</p>
          
          <ul class="features-list">
            <li>Professional monitoring</li>
            <li>Hybrid analogue / digital workflow</li>
            <li>Clean routing</li>
            <li>Stable signal chain</li>
          </ul>

          <div class="important-note">
            <p style="font-weight: 600; margin-bottom: 0.5rem;">Dry hire does not include engineer.</p>
            <p style="font-size: 0.95rem;">Support available to get you started if needed.</p>
          </div>

          <div class="launch-status">
            <p style="font-size: 1.1rem; font-weight: 600; color: var(--hardware-green);">
              Control Room launch: Very soon.
            </p>
          </div>

          <div class="cta-inline">
            <a href="/contact" class="book-button-secondary">
              ENQUIRE ABOUT CONTROL ROOM
            </a>
          </div>
        </div>

        {/* SECTION 3 — LIVE ROOM & BIG BOOTH */}
        <div class="recording-section live-room-section">
          <h2>Large Live Room</h2>
          
          <div class="ideal-for">
            <p style="margin-bottom: 1rem; font-weight: 600;">Ideal for:</p>
            <ul>
              <li>Bands</li>
              <li>Full drum kits</li>
              <li>Live tracking</li>
              <li>Performance video</li>
            </ul>
          </div>

          <div class="rehearsal-pricing-note">
            <p style="font-weight: 600; margin-bottom: 1rem;">Rehearsal pricing:</p>
            <div class="price-row">
              <span>2 hours — £40</span>
              <span>3 hours — £55</span>
              <span>4 hours — £60</span>
            </div>
          </div>

          <div class="important-note">
            <p style="font-weight: 600; color: var(--hardware-green);">
              Engineer support not included for rehearsal bookings.
            </p>
          </div>

          <div class="cta-inline">
            <a href="/rehearsal" class="book-button-secondary">
              BOOK REHEARSAL
            </a>
          </div>
        </div>

        {/* SECTION 4 — WHAT SETS CRS APART */}
        <div class="recording-section heritage-section">
          <h2>Built on 25 Years of Oxford Sound</h2>
          
          <div class="heritage-content">
            <p style="margin-bottom: 1rem;">
              Originally founded as Soundworks in 1999.<br/>
              Now operating as Cowley Road Studios.
            </p>
            
            <div class="equipment-philosophy">
              <p>Boutique vintage equipment.</p>
              <p>Modern workflow.</p>
              <p>Independent access.</p>
            </div>
            
            <div class="positioning-statement">
              <p>No gatekeeping.</p>
              <p>No institutional barriers.</p>
              <p style="font-weight: 600; color: var(--hardware-green);">Just proper infrastructure.</p>
            </div>
          </div>
        </div>

      </div>

      {/* CTA BLOCK */}
      <div class="booking-footer-info">
        <h3>Ready to record?</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; margin: 2rem 0;">
          <a href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services" class="book-button-large" target="_blank" rel="noopener noreferrer">
            <span class="button-led">●</span>
            BOOK STUDIO SESSION
          </a>
          
          <a href="/rehearsal" class="book-button-secondary">
            BOOK REHEARSAL
          </a>
          
          <a href="/contact" class="book-button-secondary">
            CONTACT CRS
          </a>
        </div>

        <div style="margin-top: 2rem;">
          <p>Email: <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></p>
          <p>Phone: <a href="tel:+441865722027">+44 (0)1865 722027</a></p>
        </div>
      </div>

      {/* FOOTER */}
      <div class="rack-footer-container">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20BOTTOM.png" 
          alt="Cowley Road Studios Footer Rack" 
          class="rack-footer-img"
        />
      </div>
    </>
  );
};
