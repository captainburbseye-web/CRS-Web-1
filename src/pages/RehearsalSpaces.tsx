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
        <h1>Rehearsal Spaces</h1>
        <p>Professional rehearsal rooms at two Oxford locations. Full backline, PA systems, and flexible hourly rates. Book your session below.</p>
      </div>

      {/* MAIN CONTENT */}
      <div class="rehearsal-page-content">
        
        {/* Cowley Road Rehearsal */}
        <div class="rehearsal-location-card">
          <div class="rehearsal-header">
            <h2>Cowley Road Rehearsal Space</h2>
            <div class="rehearsal-address">118 Cowley Road, Oxford OX4 1JE</div>
          </div>

          <div class="rehearsal-pricing">
            <div class="price-item">
              <span class="price">£40</span>
              <span class="duration">2 hours</span>
            </div>
            <div class="price-item">
              <span class="price">£55</span>
              <span class="duration">3 hours</span>
            </div>
            <div class="price-item">
              <span class="price">£60</span>
              <span class="duration">4 hours</span>
            </div>
          </div>

          <div class="rehearsal-description">
            <p>Commissioning allocation. Full professional setup. Perfect for bands up to 4 members.</p>
          </div>

          <div class="rehearsal-features">
            <h3>Included Equipment:</h3>
            <ul>
              <li><span class="feature-icon">✓</span> Full backline (bass amp, guitar amp, drum kit)</li>
              <li><span class="feature-icon">✓</span> Professional PA system</li>
              <li><span class="feature-icon">✓</span> Monitoring and foldback</li>
              <li><span class="feature-icon">✓</span> Central Oxford location</li>
              <li><span class="feature-icon">✓</span> Maximum 4 band members</li>
            </ul>
          </div>

          <a 
            href="https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services" 
            class="rehearsal-book-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="button-led">●</span>
            BOOK COWLEY ROAD
          </a>
        </div>

        {/* Cricket Road Rehearsal */}
        <div class="rehearsal-location-card">
          <div class="rehearsal-header">
            <h2>Cricket Road Rehearsal Space</h2>
            <div class="rehearsal-address">Cricket Road, Oxford</div>
          </div>

          <div class="rehearsal-pricing">
            <div class="price-item">
              <span class="price">£40</span>
              <span class="duration">2 hours</span>
            </div>
            <div class="price-item">
              <span class="price">£55</span>
              <span class="duration">3 hours</span>
            </div>
            <div class="price-item">
              <span class="price">£60</span>
              <span class="duration">4 hours</span>
            </div>
          </div>

          <div class="rehearsal-description">
            <p>Operational. 6m × 4m live room with quality equipment. 4-hour rate = £15/hour.</p>
          </div>

          <div class="rehearsal-features">
            <h3>Included Equipment:</h3>
            <ul>
              <li><span class="feature-icon">✓</span> Yamaha CLP digital piano</li>
              <li><span class="feature-icon">✓</span> Full drum kit with cymbals</li>
              <li><span class="feature-icon">✓</span> Backline amplifiers</li>
              <li><span class="feature-icon">✓</span> Vocal microphones</li>
              <li><span class="feature-icon">✓</span> Intimate rehearsal environment</li>
            </ul>
          </div>

          <a 
            href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services" 
            class="rehearsal-book-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="button-led">●</span>
            BOOK CRICKET ROAD
          </a>
        </div>

      </div>

      {/* CONTACT INFO */}
      <div class="booking-footer-info">
        <h3>Questions About Rehearsal Spaces?</h3>
        <p>Call us: <a href="tel:+441865722027">01865 722027</a></p>
        <p>Email: <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></p>
        <p><a href="/">← Back to Homepage</a> | <a href="/book">View All Services</a></p>
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
