import { simplifiedServices } from '../data/services-simplified';

/**
 * Rack Accordion: Service-First Approach
 * Simplified structure: 9 main services instead of 13 modules
 * Services with multiple locations show expandable location cards
 * Hardware aesthetic with LED indicators
 */

export const RackAccordion = () => {
  return (
    <>
      {/* HEADER: Master Rack Unit Only - No Navigation */}
      <div class="rack-header-container">
        <a href="/" aria-label="Home">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
            alt="Cowley Road Studios Master Rack" 
            class="rack-header-img"
          />
        </a>
      </div>
      
      {/* STUDIO INTRODUCTION */}
      <div class="studio-intro">
        <h1>Independent Creative Infrastructure</h1>
        <p>Recording • Rehearsal • Technical Repair<br/>Oxford — Est. 1999 (as Soundworks)</p>
      </div>

      {/* INFRASTRUCTURE FRAME */}
      <div class="infrastructure-frame">
        <h2 class="infrastructure-title">The Infrastructure</h2>
        <p>Cowley Road Studios provides recording, rehearsal, and technical services across Oxford.</p>
        <p>Originally founded as Soundworks in 1999, the studio now operates across two locations:</p>
        <ul class="infrastructure-list">
          <li><strong>Cowley Road</strong> — Commissioning 2026</li>
          <li><strong>Cricket Road</strong> — Operational rehearsal & podcast facility</li>
        </ul>
        <p>All services are independently operated. No institutional affiliation required.</p>
      </div>

      {/* MAIN ACCORDION RACK */}
      <div class="rack-accordion-viewport">
        <div class="system-badge">
          <img src="/static/images/crs-badge-dark.webp" alt="CRS" class="system-badge-logo" />
          <span class="system-led"></span>
          CRS RACK SYSTEM — ONLINE
        </div>
        
        <div class="rack-accordion-container">
          {simplifiedServices.map((service) => (
            <details 
              key={service.id}
              class={`rack-accordion-module rack-${service.variant}`}
              data-variant={service.variant}
              data-led-color={service.ledColor}
            >
              <summary class="rack-accordion-header">
                <span class="rack-led" data-color={service.ledColor}></span>
                <span class="rack-icon">{service.icon}</span>
                <span class="rack-title">{service.title}</span>
                <span class="rack-chevron">›</span>
              </summary>
              
              <div class="rack-accordion-content">
                <div class="rack-content-inner">
                  <p class="rack-description">{service.description}</p>
                  
                  {/* If service has multiple locations */}
                  {service.locations && service.locations.length > 0 ? (
                    <div class="location-options">
                      {service.locations.map((location, i) => (
                        <div key={i} class="location-card">
                          <div class="location-card-header">
                            <h4 class="location-name">{location.location}</h4>
                            <span class="location-price">{location.price}</span>
                          </div>
                          <p class="location-description">{location.description}</p>
                          
                          {location.features && location.features.length > 0 && (
                            <ul class="location-features">
                              {location.features.map((feature, j) => (
                                <li key={j}>
                                  <span class="feature-bullet">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          <a href={location.url} class="location-cta">
                            <span class="button-led">●</span>
                            BOOK {location.location}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Single action service */
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
          SYSTEM: ONLINE · {simplifiedServices.length} SERVICES · CRS v1.0
        </div>
      </div>

      {/* FOOTER: Map + Contact Info + Rack Bottom */}
      <div class="map-embed-container">
        <div class="map-embed-header">
          <h3 class="map-embed-title">FIND US IN OXFORD</h3>
          <p class="map-embed-subtitle">Cowley Road Studios / Workshop Cafe · 118 Cowley Road · OX41JE</p>
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
            <div class="terminal-status-label">COWLEY ROAD STUDIOS</div>
            <div class="terminal-status-line nap-address">118 Cowley Road, Oxford</div>
            <div class="terminal-status-line" style="margin-top: 0.5rem; opacity: 0.7;">Formerly Soundworks Oxford (1999–2023)</div>
            <div class="terminal-status-line" style="opacity: 0.7;">Continuing the Oxford Sound & Light 722027 lineage</div>
            <div class="terminal-status-line nap-phone" style="margin-top: 0.75rem;">
              <a href="tel:+441865722027">+44 (0)1865 722027</a>
            </div>
            <div class="terminal-status-line nap-email">
              <a href="mailto:info@crsoxford.com">info@crsoxford.com</a>
            </div>
            <div class="terminal-status-line" style="margin-top: 0.5rem;">
              <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">@cowleyroadstudios.ox</a>
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

          <div class="terminal-status-section footer-branding">
            <img src="/static/images/crs-control-panel-badge.jpg" alt="CRS Control Panel" class="footer-badge" />
            <div class="terminal-status-line">© 2026 Cowley Road Studios / Workshop Cafe · POWERED BY 0DR0 ENGINEERING</div>
          </div>

        </div>
      </footer>
    </>
  );
};
