import { simplifiedServices } from '../data/services-simplified';

/**
 * Pure Rack Module Interface
 * Hardware panels only - no text blocks
 * Full visual immersion with studio equipment graphics
 */

export const RackAccordion = () => {
  return (
    <div class="master-rack-chassis">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" class="skip-to-content">Skip to main content</a>
      
      {/* WELCOME RACK - Primary navigation (moved to top) */}
      <div class="rack-module-graphic welcome-rack-container" id="main-content" role="main">
        <picture>
          <source 
            type="image/webp" 
            srcset="/static/rack-images/welcome-rack-1920w.webp 1920w, /static/rack-images/welcome-rack-1280w.webp 1280w, /static/rack-images/welcome-rack-640w.webp 640w"
            sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          />
          <img 
            src="/static/rack-images/welcome-rack.webp"
            alt="CRS Welcome Rack - Main navigation and booking" 
            class="rack-module-img"
            width="1920"
            height="auto"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        
        {/* Clickable hotspots for dropdown navigation + BOOK NOW */}
        <div class="welcome-hotspots">
          {/* HOME button */}
          <a 
            href="/"
            class="welcome-button welcome-button-home"
            aria-label="Home - Return to homepage"
          >
            <span class="sr-only">Home</span>
          </a>
          
          {/* ABOUT button */}
          <a 
            href="/about"
            class="welcome-button welcome-button-about"
            aria-label="About - Learn about Cowley Road Studios"
          >
            <span class="sr-only">About</span>
          </a>
          
          {/* WORKSHOP CAFE button */}
          <a 
            href="/workshop-cafe"
            class="welcome-button welcome-button-cafe"
            aria-label="Workshop Café - Coffee, repairs, and coworking space"
          >
            <span class="sr-only">Workshop Café</span>
          </a>
          
          {/* CONTACT button */}
          <a 
            href="/contact"
            class="welcome-button welcome-button-contact"
            aria-label="Contact - Get in touch with us"
          >
            <span class="sr-only">Contact</span>
          </a>
          
          {/* BOOK NOW button (right side) */}
          <a 
            href="https://app.squareup.com/appointments/buyer/widget/g3in5i1879joft/L1MAM4DDPHKXX"
            target="_blank"
            rel="noopener noreferrer"
            class="welcome-button welcome-button-booknow"
            aria-label="Book Now - View all services and book online"
          >
            <span class="sr-only">Book Now</span>
          </a>
        </div>
      </div>

      {/* CRS HEADER RACK - Branding banner (moved after Welcome Rack) */}
      <div class="rack-module-graphic crs-header-container" id="crs-header">
        <picture>
          <source 
            type="image/webp" 
            srcset="/static/rack-images/crs-header-1920w.webp 1920w, /static/rack-images/crs-header-1280w.webp 1280w, /static/rack-images/crs-header-640w.webp 640w"
            sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          />
          <img 
            src="/static/rack-images/crs-header.webp"
            alt="Cowley Road Studios - Branding Header" 
            class="rack-module-img"
            width="1920"
            height="auto"
            loading="eager"
          />
        </picture>
        
        {/* Clickable hotspot for COWLEY ROAD STUDIOS text */}
        <div class="crs-header-hotspots">
          <a 
            href="/"
            class="crs-header-logo-hotspot"
            aria-label="Cowley Road Studios - Return to home"
          >
            <span class="sr-only">Cowley Road Studios Home</span>
          </a>
        </div>
      </div>


      {/* RECORDING SERVICES TITLE RACK */}
      <div class="rack-module-graphic title-rack-container" data-section="recording-title">
        <picture>
          <source 
            type="image/webp" 
            srcset="/static/rack-images/recording-title-rack-1920w.webp 1920w, /static/rack-images/recording-title-rack-1280w.webp 1280w, /static/rack-images/recording-title-rack-640w.webp 640w"
            sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          />
          <img 
            src="/static/rack-images/recording-title-rack.webp"
            alt="Recording Services Title" 
            class="rack-module-img title-rack-img"
            width="1920"
            height="auto"
            loading="lazy"
          />
        </picture>
      </div>

      {/* RECORDING SERVICES DOUBLE RACK - Simple clickable panels */}
      <div class="rack-module-graphic recording-services-container" id="recording-services" data-section="recording">
        {/* Main visual rack panel */}
        <div class="recording-rack-visual">
          <picture>
            <source 
              type="image/webp" 
              srcset="/static/rack-images/recording-services-1920w.webp 1920w, /static/rack-images/recording-services-1280w.webp 1280w, /static/rack-images/recording-services-640w.webp 640w"
              sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
            />
            <img 
              src="/static/rack-images/recording-services.webp"
              alt="Recording Services - Cowley Road & Cricket Road Studios" 
              class="rack-module-img"
              width="1920"
              height="auto"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Simple 2-panel clickable overlay */}
        <div class="recording-hotspots-overlay">
          {/* COWLEY ROAD RECORDING (Top Half) */}
          <a 
            href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX"
            target="_blank"
            rel="noopener noreferrer"
            class="recording-panel recording-cowley-panel"
            data-location="cowley"
            aria-label="Book Cowley Road Recording - Professional recording, mixing, mastering, and production services"
          >
          </a>

          {/* CRICKET ROAD RECORDING (Bottom Half) */}
          <a 
            href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX"
            target="_blank"
            rel="noopener noreferrer"
            class="recording-panel recording-cricket-panel"
            data-location="cricket"
            aria-label="Book Cricket Road Recording - Professional recording, mixing, mastering, and production services"
          >
          </a>
        </div>
      </div>



      {/* REHEARSAL SERVICES TITLE RACK */}
      <div class="rack-module-graphic title-rack-container" data-section="rehearsal-title">
        <picture>
          <source 
            type="image/webp" 
            srcset="/static/rack-images/rehearsal-title-rack-1920w.webp 1920w, /static/rack-images/rehearsal-title-rack-1280w.webp 1280w, /static/rack-images/rehearsal-title-rack-640w.webp 640w"
            sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          />
          <img 
            src="/static/rack-images/rehearsal-title-rack.webp"
            alt="Rehearsal Services Title" 
            class="rack-module-img title-rack-img"
            width="1920"
            height="auto"
            loading="lazy"
          />
        </picture>
      </div>

      {/* REHEARSAL COMBI RACK - Cowley + Cricket combined */}
      <div class="rack-module-graphic rehearsal-combi-container" id="rehearsal-combi" data-section="rehearsal">
        <picture>
          <source 
            type="image/webp" 
            srcset="/static/rack-images/rehearsal-combi-1920w.webp 1920w, /static/rack-images/rehearsal-combi-1280w.webp 1280w, /static/rack-images/rehearsal-combi-640w.webp 640w"
            sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          />
          <img 
            src="/static/rack-images/rehearsal-combi.webp"
            alt="Rehearsal Rooms - Cowley Road & Cricket Road" 
            class="rack-module-img"
            width="1920"
            height="auto"
            loading="lazy"
          />
        </picture>
        
        {/* Clickable hotspots for Cowley and Cricket rehearsal */}
        <div class="rehearsal-hotspots">
          {/* COWLEY ROAD REHEARSAL (Top Half) */}
          <a 
            href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
            target="_blank"
            rel="noopener noreferrer"
            class="rehearsal-panel rehearsal-cowley-panel"
            data-location="cowley"
            aria-label="Book Cowley Road Rehearsal - £45 for 2 hours, £60 for 3 hours, £65 for 4 hours. Max 4 members."
          >
          </a>

          {/* CRICKET ROAD REHEARSAL (Bottom Half) */}
          <a 
            href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX"
            target="_blank"
            rel="noopener noreferrer"
            class="rehearsal-panel rehearsal-cricket-panel"
            data-location="cricket"
            aria-label="Book Cricket Road Rehearsal - Fully equipped live room with drums, backline, and PA system."
          >
          </a>
        </div>
      </div>



      {/* CONTROL ROOM BOOKING BUTTONS ONLY */}
      <div class="rack-module-graphic control-room-module" id="control-room" data-section="control-room">
        {/* Interactive booking buttons rack panel */}
        <div class="control-room-buttons-rack">
          <picture>
            <source 
              type="image/webp" 
              srcset="/static/rack-images/control-room-buttons-1920w.webp 1920w, /static/rack-images/control-room-buttons-1280w.webp 1280w, /static/rack-images/control-room-buttons-640w.webp 640w"
              sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
            />
            <img 
              src="/static/rack-images/control-room-buttons.webp"
              alt="Control Room Booking Buttons - Cowley Road and Cricket Road" 
              class="rack-module-img"
              width="1920"
              height="auto"
              loading="lazy"
            />
          </picture>
          
          {/* Clickable hotspot overlays for booking buttons */}
          <div class="button-hotspots">
            <a 
              href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX"
              target="_blank"
              rel="noopener noreferrer"
              class="booking-hotspot booking-hotspot-cowley"
              data-location="cowley"
              aria-label="Book Cowley Road Control Room - Professional monitoring environment"
            >
              <span class="sr-only">Book Cowley Road</span>
            </a>
            <a 
              href="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX"
              target="_blank"
              rel="noopener noreferrer"
              class="booking-hotspot booking-hotspot-cricket"
              data-location="cricket"
              aria-label="Book Cricket Road Control Room - Professional monitoring environment"
            >
              <span class="sr-only">Book Cricket Road</span>
            </a>
          </div>
        </div>
      </div>

      {/* WORKSHOP CAFE RACK */}
      <div class="rack-module-graphic" id="workshop-cafe" data-section="cafe">
        <a 
          href="/workshop-cafe" 
          aria-label="Workshop Café - Coffee, repairs, musical curios, and coworking spaces - Learn more"
        >
          <picture>
            <source 
              type="image/webp" 
              srcset="/static/rack-images/workshop-cafe-1920w.webp 1920w, /static/rack-images/workshop-cafe-1280w.webp 1280w, /static/rack-images/workshop-cafe-640w.webp 640w"
              sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
            />
            <img 
              src="/static/rack-images/workshop-cafe.webp"
              alt="Workshop Café - VU meters, pressure gauges, spectrum analyzer" 
              class="rack-module-img"
              width="1920"
              height="auto"
              loading="lazy"
            />
          </picture>
          <span class="rack-tooltip" aria-hidden="true">Click for Workshop Café info →</span>
        </a>
      </div>





      {/* MAP EMBED */}
      <div class="map-embed-container">
        <div class="map-embed-header">
          <h3 class="map-embed-title">FIND US IN OXFORD</h3>
          <p class="map-embed-subtitle">Cowley Road Studios / Workshop Cafe · 118 Cowley Road · OX4 1JE</p>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.123!2d-1.2384!3d51.7466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a42c8c7c3f%3A0x5c5e5e5e5e5e5e5e!2s118%20Cowley%20Road%2C%20Oxford%20OX4%201JE!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk" 
          width="100%" 
          height="400" 
          style="border:0; border-radius: 8px;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Cowley Road Studios Location Map"
        ></iframe>
      </div>

      {/* MOBILE NAV */}
      <nav class="mobile-nav mono">
        <a href="#services">SERVICES</a>
        <a href="/contact">CONTACT</a>
      </nav>

      {/* SYSTEM STATUS */}
      <div class="system-status-strip">
        CRS SYSTEM STATUS: OPERATIONAL · BOOKINGS OPEN · 118 COWLEY ROAD, OXFORD OX4 1JE
      </div>

      {/* FOOTER LINKS */}
      <div class="rack-footer-links">
        <a href="/recording-studio-oxford" class="rack-footer-link">Recording Studio in Oxford</a>
        <a href="/rehearsal-rooms-oxford" class="rack-footer-link">Rehearsal Rooms in Oxford</a>
        <a href="/av-services-oxford" class="rack-footer-link">Live Sound & AV Services in Oxford</a>
        <a href="/venue-hire-oxford" class="rack-footer-link">Venue Hire in Cowley Road, Oxford</a>
      </div>

      {/* FOOTER */}
      <footer class="site-footer">
        <div class="terminal-status-footer">
          <div class="terminal-status-section nap-section">
            <div class="terminal-status-label">COWLEY ROAD STUDIOS</div>
            <div class="terminal-status-line" style="font-weight: 600; margin-bottom: 0.5rem;">
              Independent Recording Studio & Rehearsal Rooms – Oxford
            </div>
            <div class="terminal-status-line nap-address">118 Cowley Road, Oxford</div>
            <div class="terminal-status-line" style="margin-top: 0.75rem; opacity: 0.7;">
              Formerly Soundworks Oxford (1999–2024)
            </div>
            <div class="terminal-status-line nap-phone" style="margin-top: 0.75rem;">
              <a href="tel:+441865722027">+44 (0)1865 722027</a>
            </div>
            <div class="terminal-status-line nap-email">
              <a href="mailto:info@crsoxford.com">info@crsoxford.com</a>
            </div>
            <div class="terminal-status-line" style="margin-top: 0.5rem;">
              <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">
                @cowleyroadstudios.ox
              </a>
            </div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-label">SYSTEM STATUS</div>
            <div class="terminal-status-line">MODE: LIVE</div>
            <div class="terminal-status-line">SERVICES: OPERATIONAL</div>
            <div class="terminal-status-line">ACCESS: SCHEDULED ONLY</div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-label">LOCATION</div>
            <div class="terminal-status-line">COORDINATES: 51.7466 N, 1.2384 W</div>
            <div class="terminal-status-line">AREA: EAST OXFORD</div>
            <div class="terminal-status-line">POSTCODE: OX4 1JE</div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-label">CONNECT</div>
            <div class="terminal-status-line">
              <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">Instagram</a>
            </div>
            <div class="terminal-status-line">
              <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener">
                Google Maps
              </a>
            </div>
          </div>

          <div class="terminal-status-section terminal-truth-line">
            <div class="terminal-status-line">
              Built by people restoring a working studio to Cowley Road, piece by piece.
            </div>
            <div class="terminal-status-line">
              Continuing the Soundworks Oxford legacy (1999–2024).
            </div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-label">SERVICES</div>
            <div class="terminal-status-line">Independent Recording Studio – Oxford</div>
            <div class="terminal-status-line">Rehearsal Rooms – Cowley Road</div>
            <div class="terminal-status-line">Recording Sessions – Cricket Road</div>
            <div class="terminal-status-line" style="margin-top: 0.5rem; opacity: 0.7;">
              Formerly Soundworks Oxford (1999–2024)
            </div>
          </div>

          <div class="terminal-status-section footer-branding">
            <img 
              src="/static/images/crs-control-panel-badge.jpg" 
              alt="CRS Control Panel" 
              class="footer-badge"
            />
            <div class="terminal-status-line">
              © 2026 Cowley Road Studios / Workshop Cafe · POWERED BY 0DR0 ENGINEERING
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
