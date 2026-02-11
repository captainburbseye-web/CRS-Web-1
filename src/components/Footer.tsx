export const Footer = () => (
  <>
    {/* GOOGLE MAPS EMBED - WEB-TO-MAP SOLDER */}
    <div class="map-embed-container">
      <div class="map-embed-header">
        <h3 class="map-embed-title">FIND US IN OXFORD</h3>
        <p class="map-embed-subtitle">Cowley Road Studios / Workshop Cafe · 118 Cowley Road · OX41JE</p>
      </div>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.123!2d-1.2384!3d51.7466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ0JzQ3LjgiTiAxwrAxNCcxOC4yIlc!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk&q=118+Cowley+Road,+Oxford,+OX4+1JE"
        width="100%"
        height="400"
        style="border:0; border-radius: 8px;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Cowley Road Studios Location Map"
        aria-label="Google Maps showing Cowley Road Studios at 118 Cowley Road, Oxford OX4 1JE"
      ></iframe>
    </div>

    {/* MOBILE NAVIGATION (FIXED BOTTOM) */}
    <nav class="mobile-nav mono">
      <a href="/locations">LOCATIONS</a>
      <a href="/book">BOOK</a>
      <a href="/contact">CONTACT</a>
    </nav>

    {/* FOOTER TERMINATION PANEL: 1U Rack Unit at Bottom */}
    <div class="rack-footer-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20BOTTOM.png" 
        alt="Cowley Road Studios Footer Rack" 
        class="rack-footer-img"
        aria-label="Footer: OX4 Studio Network - No Chaos Policy - System Ready. Cowley Road Studios, Oxford."
      />
    </div>

    {/* CONSOLIDATED FOOTER — ALL INFORMATION BELOW RACK VISUAL */}
    <footer class="site-footer">
      <div class="terminal-status-footer">
        
        {/* NAP DATA - EXACT MATCH TO GOOGLE MY BUSINESS */}
        <div class="terminal-status-section nap-section">
          <div class="terminal-status-label">COWLEY ROAD STUDIOS / WORKSHOP CAFE</div>
          <div class="terminal-status-line nap-address">118 Cowley Road, Oxford OX41JE</div>
          <div class="terminal-status-line nap-phone">
            <a href="tel:+441865722027">01865 722027</a>
          </div>
          <div class="terminal-status-line nap-email">
            <a href="mailto:info@crsoxford.com">info@crsoxford.com</a>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div class="terminal-status-section">
          <div class="terminal-status-label">SYSTEM STATUS</div>
          <div class="terminal-status-line">MODE: OPERATIONAL</div>
          <div class="terminal-status-line">PHASE: COMMISSIONING</div>
          <div class="terminal-status-line">ACCESS: SCHEDULED ONLY</div>
          <div class="terminal-status-line">CAPACITY: SIGNAL-MANAGED</div>
          <div class="terminal-status-line">ENTRY: ALLOCATED ONLY</div>
        </div>

        {/* LOCATION DETAILS */}
        <div class="terminal-status-section">
          <div class="terminal-status-label">LOCATION</div>
          <div class="terminal-status-line">COORDINATES: 51.7466 N, 1.2384 W</div>
          <div class="terminal-status-line">AREA: EAST OXFORD</div>
          <div class="terminal-status-line">POSTCODE: OX4 1JE</div>
        </div>

        {/* SOCIAL & LINKS */}
        <div class="terminal-status-section">
          <div class="terminal-status-label">CONNECT</div>
          <div class="terminal-status-line">
            <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">Instagram</a>
          </div>
          <div class="terminal-status-line">
            <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener">Google Maps</a>
          </div>
        </div>

        {/* TRUTH LINE */}
        <div class="terminal-status-section terminal-truth-line">
          <div class="terminal-status-line">Built by people restoring a working studio to Cowley Road, piece by piece.</div>
          <div class="terminal-status-line">Continuing the Soundworks Oxford legacy (1999–2024).</div>
        </div>

        {/* COPYRIGHT & ENGINEERING */}
        <div class="terminal-status-section">
          <div class="terminal-status-line">© 2026 Cowley Road Studios / Workshop Cafe · POWERED BY 0DR0 ENGINEERING</div>
        </div>

      </div>
    </footer>

    {/* STRUCTURED DATA - LOCALBUSINESS SCHEMA */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicVenue",
        "name": "Cowley Road Studios / Workshop Cafe",
        "alternateName": ["CRS Oxford", "Workshop Cafe"],
        "description": "Professional recording studio, rehearsal space, and creative workspace in East Oxford. Continuing the Soundworks Oxford legacy.",
        "image": "https://pub-991d8d2677374c528678829280f50c98.r2.dev/512crs_badge_dark%20fixed%20for%20web.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "118 Cowley Road",
          "addressLocality": "Oxford",
          "addressRegion": "Oxfordshire",
          "postalCode": "OX41JE",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.7466",
          "longitude": "-1.2384"
        },
        "telephone": "+441865722027",
        "email": "info@crsoxford.com",
        "url": "https://cowleyroadstudios.com",
        "sameAs": [
          "https://instagram.com/cowleyroadstudios.ox"
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "23:00"
        },
        "priceRange": "££",
        "hasMap": "https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX41JE",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1"
        }
      })}
    </script>
  </>
)
