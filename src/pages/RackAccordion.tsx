import { rackServices } from '../data/services';

/**
 * Rack Accordion: Hardware rack with expandable modules
 * Click any module to expand it, others stay collapsed
 * Hardware aesthetic with LED indicators
 * With full branding (header + footer)
 */

export const RackAccordion = () => {
  // Filter out header service
  const services = rackServices.filter(s => s.id !== 'header');
  
  return (
    <>
      {/* HEADER: Master Rack Unit + Navigation */}
      <div class="rack-header-container">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
          alt="Cowley Road Studios Master Rack" 
          class="rack-header-img"
        />
      </div>
      
      <header class="rack-header">
        <button class="mobile-menu-toggle" aria-label="Open menu">
          <span class="hamburger-icon">☰</span>
        </button>
        
        <nav class="rack-header-nav">
          <a href="/studio">Studio</a>
          <span class="separator">|</span>
          <a href="/workshop-cafe">Workshop Café</a>
          <span class="separator">|</span>
          <a href="/av-services">AV</a>
          <span class="separator">|</span>
          <a href="/about">About</a>
          <span class="separator">|</span>
          <a href="/contact">Contact</a>
        </nav>
        
        <div class="rack-header-cta">
          <a href="/book" class="book-now-button">BOOK NOW</a>
        </div>
      </header>

      {/* MAIN ACCORDION RACK */}
      <div class="rack-accordion-viewport">
        <div class="system-badge">
          <span class="system-led"></span>
          CRS RACK SYSTEM — ONLINE
        </div>
        
        <div class="rack-accordion-container">
          {services.map((service) => (
            <details 
              key={service.id}
              class={`rack-accordion-module rack-${service.variant || 'rack'}`}
              data-variant={service.variant || 'rack'}
              data-led-color={service.ledColor}
            >
              <summary class="rack-accordion-header">
                <span class="rack-led" data-color={service.ledColor}></span>
                <span class="rack-label">{service.label}</span>
                <span class="rack-title">{service.title}</span>
                <span class="rack-chevron">›</span>
              </summary>
              
              <div class="rack-accordion-content">
                <div class="rack-content-inner">
                  <p class="rack-description">{service.description}</p>
                  
                  {service.dropdownServices && service.dropdownServices.length > 0 ? (
                    <div class="rack-services-list">
                      <div class="services-label">AVAILABLE SERVICES:</div>
                      {service.dropdownServices.map((s, i) => (
                        <a 
                          key={i}
                          href={s.url} 
                          class="rack-service-link"
                        >
                          <span class="service-bullet">▸</span>
                          {s.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a href={service.url} class="rack-cta-button">
                      <span class="button-led">●</span>
                      {service.ctaText || 'BOOK NOW'}
                    </a>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
        
        <div class="system-status-strip">
          SYSTEM: ONLINE · {services.length} MODULES · CRS v1.0
        </div>
      </div>

      {/* FOOTER: Map + Contact Info + Rack Bottom */}
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
        ></iframe>
      </div>

      <nav class="mobile-nav mono">
        <a href="/studio">STUDIO</a>
        <a href="/book">BOOK</a>
        <a href="/contact">CONTACT</a>
      </nav>

      <div class="rack-footer-container">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20BOTTOM.png" 
          alt="Cowley Road Studios Footer Rack" 
          class="rack-footer-img"
        />
      </div>

      <footer class="site-footer">
        <div class="terminal-status-footer">
          
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

          <div class="terminal-status-section">
            <div class="terminal-status-label">SYSTEM STATUS</div>
            <div class="terminal-status-line">MODE: OPERATIONAL</div>
            <div class="terminal-status-line">PHASE: COMMISSIONING</div>
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
              <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener">Google Maps</a>
            </div>
          </div>

          <div class="terminal-status-section terminal-truth-line">
            <div class="terminal-status-line">Built by people restoring a working studio to Cowley Road, piece by piece.</div>
            <div class="terminal-status-line">Continuing the Soundworks Oxford legacy (1999–2024).</div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-line">© 2026 Cowley Road Studios / Workshop Cafe · POWERED BY 0DR0 ENGINEERING</div>
          </div>

        </div>
      </footer>
    </>
  );
};
