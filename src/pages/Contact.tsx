/**
 * Contact Page - Optimized for conversion
 * No friction, no confusion, clear booking routes
 */

export const ContactPage = () => {
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
        <h1>Contact Cowley Road Studios</h1>
        <p class="tagline">Two locations. Clear booking routes. Direct communication.</p>
      </div>

      {/* MAIN CONTENT */}
      <div class="contact-content">
        
        {/* LOCATIONS */}
        <div class="contact-section">
          <h2>📍 Locations</h2>
          
          <div class="location-blocks">
            <div class="location-block">
              <h3>Cowley Road Studios</h3>
              <p class="address">118 Cowley Road<br/>Oxford</p>
              <ul class="status-list">
                <li><span class="status-dot green"></span> Rehearsal Room — Live</li>
                <li><span class="status-dot green"></span> Large Booth — Live</li>
                <li><span class="status-dot amber"></span> Control Room — Coming Online</li>
              </ul>
            </div>

            <div class="location-block">
              <h3>Cricket Road Studio</h3>
              <p class="address">Oxford</p>
              <ul class="status-list">
                <li><span class="status-dot green"></span> Recording — Live</li>
                <li><span class="status-dot green"></span> Rehearsals — Live</li>
                <li><span class="status-dot green"></span> Podcast — Live</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIRECT CONTACT */}
        <div class="contact-section contact-direct">
          <h2>📩 Direct Contact</h2>
          
          <div class="contact-methods">
            <div class="contact-item">
              <span class="contact-label">Email:</span>
              <a href="mailto:info@crsoxford.com" class="contact-value">info@crsoxford.com</a>
            </div>
            
            <div class="contact-item">
              <span class="contact-label">Phone:</span>
              <a href="tel:+441865722027" class="contact-value">+44 (0)1865 722027</a>
            </div>
            
            <div class="contact-item">
              <span class="contact-label">Instagram:</span>
              <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener" class="contact-value">@cowleyroadstudios.ox</a>
            </div>
            
            <div class="contact-item">
              <span class="contact-label">Facebook:</span>
              <a href="https://facebook.com/cowleyroadstudios" target="_blank" rel="noopener" class="contact-value">facebook.com/cowleyroadstudios</a>
            </div>
          </div>
        </div>

        {/* BOOKING ROUTES */}
        <div class="contact-section booking-routes">
          <h2>🎛 Booking Routes</h2>
          <p class="section-intro">To avoid delays, use the correct route:</p>
          
          <div class="booking-route-grid">
            <div class="booking-route-item">
              <span class="route-label">Recording (with engineer)</span>
              <a href="/studio" class="route-button">BOOK RECORDING</a>
            </div>
            
            <div class="booking-route-item">
              <span class="route-label">Rehearsal</span>
              <a href="/rehearsal" class="route-button">BOOK REHEARSAL</a>
            </div>
            
            <div class="booking-route-item">
              <span class="route-label">Control Room (dry hire)</span>
              <a href="/contact?enquiry=control-room" class="route-button">BOOK CONTROL ROOM</a>
            </div>
            
            <div class="booking-route-item">
              <span class="route-label">Repairs</span>
              <a href="/contact?enquiry=repairs" class="route-button">BOOK REPAIR</a>
            </div>
            
            <div class="booking-route-item">
              <span class="route-label">Venue Hire</span>
              <a href="/contact?enquiry=venue" class="route-button">ENQUIRE ABOUT HIRE</a>
            </div>
          </div>

          <div class="email-note">
            <p>If unsure, email with subject line:</p>
            <p class="subject-example">"Booking Enquiry – [Service Needed]"</p>
          </div>
        </div>

        {/* IMPORTANT NOTES */}
        <div class="contact-section important-notes">
          <h2>🧾 Important Notes</h2>
          <ul class="notes-list">
            <li>Recording sessions include engineer.</li>
            <li>Rehearsal and dry hire do not include engineer.</li>
            <li>2-hour minimum on recording sessions.</li>
            <li>Induction required for control room dry hire.</li>
          </ul>
        </div>

        {/* PROFESSIONAL ENQUIRIES */}
        <div class="contact-section professional-enquiries">
          <h2>🎚 Professional Enquiries</h2>
          <p>Promoters, venues, councils, and technical clients:</p>
          <p class="pro-note">Email directly with project outline and dates.</p>
          <a href="mailto:info@crsoxford.com?subject=Professional Enquiry" class="pro-cta">EMAIL FOR PROFESSIONAL ENQUIRIES</a>
        </div>

        {/* LEGACY NOTE */}
        <div class="legacy-divider">
          <span>Formerly Soundworks Oxford (1999–2024)</span>
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
