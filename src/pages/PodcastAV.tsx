/**
 * Podcast Studio & AV Services Page
 * Unified page for podcast recording and AV/live sound services
 */

export const PodcastAVPage = () => {
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
        <h1>Podcast Studio Hire in Oxford</h1>
        <p>Professional Audio. Clean Delivery.</p>
        <p style="margin-top: 0.75rem; font-size: 0.95rem;">
          Dedicated podcast and spoken-word recording space at Cowley Road Studios and Cricket Road.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div class="podcast-av-content">
        
        {/* SECTION 1 — PODCAST STUDIO */}
        <div class="service-section">
          <h2>Podcast & Spoken Word Recording</h2>
          
          <div class="perfect-for">
            <p style="margin-bottom: 1rem; font-weight: 600;">Perfect for:</p>
            <ul>
              <li>Podcasts</li>
              <li>Interviews</li>
              <li>Voiceover</li>
              <li>Spoken word</li>
              <li>Video podcast capture</li>
            </ul>
          </div>

          <div class="pricing-block">
            <h3>Pricing (Cricket Road)</h3>
            <div class="price-large">
              <span class="price-value">£30</span>
              <span class="price-unit">per hour</span>
            </div>
            <p class="price-note">(with engineer)</p>
            <p class="price-note">Minimum 2 hours</p>
          </div>

          <div class="we-handle">
            <p style="font-weight: 600; margin-bottom: 1rem;">We handle:</p>
            <ul>
              <li>Microphone setup</li>
              <li>Gain staging</li>
              <li>Clean signal</li>
              <li>Basic editing guidance</li>
            </ul>
            <p style="margin-top: 1.5rem; font-style: italic; color: var(--hardware-green);">
              You focus on content.
            </p>
          </div>

          <div class="cta-inline">
            <a href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services" class="book-button" target="_blank" rel="noopener noreferrer">
              <span class="button-led">●</span>
              BOOK PODCAST SESSION
            </a>
          </div>
        </div>

        {/* SECTION 2 — WHAT MAKES IT DIFFERENT */}
        <div class="service-section infrastructure-section">
          <h2>Real Audio Infrastructure</h2>
          <p style="margin-bottom: 2rem; font-size: 1.1rem; color: rgba(255,255,255,0.9);">
            This isn't a desk in a spare room.
          </p>
          
          <ul class="infrastructure-list">
            <li>Treated acoustic environment</li>
            <li>Broadcast-quality microphones</li>
            <li>Clean monitoring</li>
            <li>Stable recording chain</li>
            <li>Proper gain structure</li>
          </ul>
          
          <p style="margin-top: 2rem; font-style: italic;">
            Professional results without studio ego.
          </p>
        </div>

        {/* SECTION 3 — AV SERVICES */}
        <div class="service-section av-section">
          <h2>AV Installation & Live Sound</h2>
          
          <p style="margin-bottom: 1.5rem;">We design and install sound systems for:</p>
          
          <ul class="venue-types">
            <li>Bars</li>
            <li>Venues</li>
            <li>Events</li>
            <li>Community spaces</li>
            <li>Private installs</li>
          </ul>

          <div style="margin-top: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem;">Services include:</p>
            <ul class="av-services-list">
              <li>PA setup</li>
              <li>Speaker placement</li>
              <li>Cable management</li>
              <li>Signal routing</li>
              <li>Troubleshooting & repair</li>
            </ul>
          </div>

          <p style="margin-top: 2rem; font-size: 1.05rem; color: rgba(255,255,255,0.85);">
            From small installs to full venue systems.
          </p>

          <div class="pricing-context" style="margin-top: 2rem; padding: 1.5rem; background: rgba(0,0,0,0.3); border-left: 3px solid var(--hardware-green);">
            <p style="font-weight: 600; margin-bottom: 0.75rem;">Pricing</p>
            <p>
              AV services are quoted per project. Typical jobs range from <strong>£250–£1,500</strong> depending on scale and equipment requirements.
            </p>
          </div>

          <div class="technical-ops" style="margin-top: 2rem; font-size: 0.9rem; color: rgba(255,255,255,0.7);">
            <p style="margin-bottom: 0.5rem; font-weight: 600; color: rgba(255,255,255,0.85);">Current supported sites:</p>
            <ul style="list-style: none; padding-left: 1rem;">
              <li>– Bossaphonik</li>
              <li>– The King's Centre</li>
              <li>– Cowley Workers' Club</li>
            </ul>
          </div>
        </div>

        {/* SECTION 4 — REPAIRS */}
        <div class="service-section repairs-section">
          <h2>Equipment Repairs & Diagnostics</h2>
          
          <div class="pricing-block">
            <p style="margin-bottom: 1rem;">Flat diagnostic fee:</p>
            <div class="price-large">
              <span class="price-value">£60</span>
            </div>
          </div>

          <div style="margin-top: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem;">We work on:</p>
            <ul>
              <li>Amplifiers</li>
              <li>Mixers</li>
              <li>Speakers</li>
              <li>Studio gear</li>
              <li>Cabling issues</li>
            </ul>
          </div>

          <p style="margin-top: 2rem; font-size: 1.2rem; font-weight: 600; color: var(--hardware-green);">
            Don't bin it. Fix it.
          </p>
        </div>

      </div>

      {/* CTA BLOCK */}
      <div class="booking-footer-info">
        <h3>Need to record or fix something?</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; margin: 2rem 0;">
          <a href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services" class="book-button-large" target="_blank" rel="noopener noreferrer">
            <span class="button-led">●</span>
            BOOK PODCAST SESSION
          </a>
          
          <span style="font-size: 0.9rem; color: rgba(255,255,255,0.5);">or</span>
          
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
