/**
 * Rehearsal Spaces Page - Detailed view of both locations
 * Shows Cowley Road and Cricket Road rehearsal rooms with booking links
 */

export const RehearsalSpaces = () => {
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
      
      {/* REHEARSAL INTRODUCTION */}
      <div class="studio-intro">
        <h1>Rehearsal Rooms in Oxford</h1>
        <p>Cowley Road Studios — Now Live</p>
        <p style="margin-top: 0.75rem; font-size: 0.95rem;">Professional rehearsal space in central Oxford. Simple pricing. Book online. No gatekeeping.</p>
      </div>

      {/* MAIN CONTENT */}
      <div class="rehearsal-page-content">
        
        {/* PRICING SECTION */}
        <div class="pricing-hero">
          <h2>Band Rehearsal Rates</h2>
          <div class="price-grid">
            <div class="price-item-large">
              <span class="price-value">£40</span>
              <span class="price-duration">2 Hours</span>
            </div>
            <div class="price-item-large">
              <span class="price-value">£55</span>
              <span class="price-duration">3 Hours</span>
            </div>
            <div class="price-item-large">
              <span class="price-value">£60</span>
              <span class="price-duration">4 Hours</span>
            </div>
          </div>
          <p class="pricing-note">That's it. No hidden fees.</p>
          <p class="pricing-note">Need regular slots? Ask about weekly bookings.</p>
        </div>

        {/* WHAT YOU GET */}
        <div class="what-you-get-section">
          <h2>The Space</h2>
          <ul>
            <li>Treated rehearsal room</li>
            <li>PA system</li>
            <li>Vocal microphones</li>
            <li>Backline options available</li>
            <li>Clean, secure environment</li>
          </ul>
          <p style="margin-top: 1rem;">Located at Cowley Road Studios, central Oxford.</p>
          <p>Easy access from Cowley, St Clements, and city centre.</p>
        </div>

        {/* WHO IT'S FOR */}
        <div class="who-its-for-section">
          <h2>Built for Real Bands</h2>
          <div class="band-types">
            <span>Independent artists</span>
            <span>Student bands</span>
            <span>Working musicians</span>
            <span>Tour rehearsals</span>
            <span>Acoustic or amplified</span>
          </div>
          <p style="margin-top: 1.5rem; font-weight: 600;">No university ballots. No faculty approval. Just book and play.</p>
        </div>
        
        {/* CRICKET ROAD CLARITY */}
        <div class="cricket-road-section">
          <h2>Additional Rehearsal & Recording – Cricket Road</h2>
          <p>Cricket Road remains fully operational for:</p>
          <ul>
            <li>Recording sessions (£30/hr with engineer)</li>
            <li>Pod hire</li>
            <li>Smaller rehearsal formats</li>
          </ul>
          <p style="margin-top: 1rem;">If you need recording + rehearsal back-to-back, we can structure that.</p>
        </div>

      </div>

      {/* CTA BLOCK */}
      <div class="booking-footer-info">
        <h3>Ready to rehearse?</h3>
        <a href="https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services" class="rehearsal-book-button-large" target="_blank" rel="noopener noreferrer">
          <span class="button-led">●</span>
          REHEARSE NOW
        </a>
        <p style="margin-top: 1.5rem; font-weight: 600; color: var(--hardware-green);">Rehearsal and dry hire sessions do not include engineer support.</p>
        <h4 style="margin-top: 2rem;">Questions?</h4>
        <p>Email: <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></p>
        <p>Phone: <a href="tel:+441865722027">+44 (0)1865 722027</a></p>
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
