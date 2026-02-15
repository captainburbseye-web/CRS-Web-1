import { simplifiedServices } from '../data/services-simplified';

/**
 * Rack Accordion: Service-First Approach
 * Simplified structure: 9 main services instead of 13 modules
 * Services with multiple locations show expandable location cards
 * Hardware aesthetic with LED indicators
 */

export const RackAccordion = () => {
  return (
    <div class="master-rack-chassis">
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
      
      {/* NAVIGATION BAR */}
      <header class="rack-header">
        <nav class="rack-header-nav">
          <a href="/studio">RECORDING</a>
          <span class="separator">|</span>
          <a href="/rehearsal">REHEARSAL</a>
          <span class="separator">|</span>
          <a href="/about">ABOUT</a>
          <span class="separator">|</span>
          <a href="/contact">CONTACT</a>
        </nav>
        
        <div class="rack-header-cta">
          <a href="/book" class="book-now-button">BOOK SESSION</a>
        </div>
      </header>
      
      {/* STUDIO INTRODUCTION */}
      <div class="studio-intro">
        <p class="tagline">Independent creative infrastructure in the heart of Cowley Road, Oxford.</p>
        <div class="hero-ctas">
          <a href="#services" class="cta-secondary">VIEW SERVICES</a>
        </div>
      </div>

      {/* SECTION 1 — RECORDING */}
      <div class="service-block recording-block">
        <h2>Recording Services</h2>
        <p class="service-tagline">From Source to Master.</p>
        <p class="service-intro">Professional recording at two locations:</p>
        
        <div class="location-pricing-grid">
          <div class="location-card">
            <h3>Cowley Road</h3>
            <p class="service-desc">Engineer-led sessions</p>
            <div class="price-highlight">£35/hr</div>
            <p class="price-note">(2hr min)</p>
          </div>
          
          <div class="location-card">
            <h3>Cricket Road</h3>
            <p class="service-desc">Engineer-led sessions</p>
            <div class="price-highlight">£30/hr</div>
            <p class="price-note">(2hr min)</p>
          </div>
        </div>

        <p class="service-summary">Acoustic sessions, vocals, band tracking and production.</p>
        
        <div class="service-cta">
          <a href="/studio" class="cta-service">BOOK STUDIO SESSION</a>
        </div>
      </div>

      {/* SECTION 2 — REHEARSAL */}
      <div class="service-block rehearsal-block">
        <h2>Band Rehearsals</h2>
        <p class="service-intro">Cowley Road Live Room & Cricket Road</p>
        
        <div class="pricing-simple">
          <div class="price-row">2 hours — £40</div>
          <div class="price-row">3 hours — £55</div>
          <div class="price-row">4 hours — £60</div>
        </div>

        <ul class="feature-list">
          <li>Large treated space</li>
          <li>Drum kit ready</li>
          <li>Backline available</li>
        </ul>
        
        <div class="service-cta">
          <a href="/rehearsal" class="cta-service">BOOK REHEARSAL</a>
        </div>
      </div>

      {/* SECTION 3 — PODCAST & AV */}
      <div class="service-block podcast-block">
        <h2>Podcast & AV Suite</h2>
        <p class="service-intro">Spoken word, interviews, broadcast content.</p>
        
        <ul class="feature-list">
          <li>Engineer-assisted recording available</li>
          <li>Professional signal chain</li>
          <li>Clean delivery</li>
        </ul>
        
        <div class="service-cta">
          <a href="/av-services" class="cta-service">BOOK PODCAST SESSION</a>
        </div>
      </div>

      {/* SECTION 4 — REPAIRS */}
      <div class="service-block repairs-block">
        <h2>Audio & AV Repairs</h2>
        
        <div class="price-highlight-inline">
          <span>Bench diagnostics — </span>
          <span class="price">£60 flat rate</span>
        </div>

        <p class="service-intro">Vintage amps, mixers, signal issues. Professional fault tracing and restoration.</p>
        
        <div class="service-cta">
          <a href="/contact" class="cta-service">BOOK REPAIR</a>
        </div>
      </div>

      {/* SECTION 5 — ABOUT PREVIEW */}
      <div class="service-block about-preview-block">
        <h2>Built on Oxford Sound Since 1999</h2>
        <p class="service-intro">Cowley Road Studios continues the Soundworks legacy founded in 1999.</p>
        <p class="heritage-note">25+ years of independent infrastructure serving Oxford's creative community.</p>
        
        <ul class="philosophy-list">
          <li>Boutique vintage equipment</li>
          <li>Modern workflow</li>
          <li>No institutional barriers</li>
        </ul>
        
        <div class="service-cta">
          <a href="/about" class="cta-service">READ OUR STORY</a>
        </div>
      </div>

      {/* SERVICES ANCHOR */}
      <div id="services" class="services-anchor">
        <h2>Services</h2>
        <p class="services-intro">Cowley Road Studios operates across two Oxford locations.</p>
        <p class="services-intro-note">All pricing is transparent. All bookings are direct.</p>
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

      {/* SYSTEM STATUS STRIP - Bottom of page */}
      <div class="status-strip">
        <div class="status-header">SYSTEM STATUS</div>
        <div class="status-items">
          <div class="status-item">
            <span class="status-led green"></span>
            <span>Cowley Road Live Room — Operational</span>
          </div>
          <div class="status-item">
            <span class="status-led green"></span>
            <span>Cricket Road Studio — Operational</span>
          </div>
          <div class="status-item">
            <span class="status-led amber"></span>
            <span>Control Room — Coming Online</span>
          </div>
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
            <div class="terminal-status-line" style="font-weight: 600; margin-bottom: 0.5rem;">Independent Recording Studio & Rehearsal Rooms – Oxford</div>
            <div class="terminal-status-line nap-address">118 Cowley Road, Oxford</div>
            <div class="terminal-status-line" style="margin-top: 0.75rem; opacity: 0.7;">Formerly Soundworks Oxford (1999–2024)</div>
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
              <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener">Google Maps</a>
            </div>
          </div>

          <div class="terminal-status-section terminal-truth-line">
            <div class="terminal-status-line">Built by people restoring a working studio to Cowley Road, piece by piece.</div>
            <div class="terminal-status-line">Continuing the Soundworks Oxford legacy (1999–2024).</div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-label">SERVICES</div>
            <div class="terminal-status-line">Independent Recording Studio – Oxford</div>
            <div class="terminal-status-line">Rehearsal Rooms – Cowley Road</div>
            <div class="terminal-status-line">Recording Sessions – Cricket Road</div>
            <div class="terminal-status-line" style="margin-top: 0.5rem; opacity: 0.7;">Formerly Soundworks Oxford (1999–2024)</div>
          </div>

          <div class="terminal-status-section footer-branding">
            <img src="/static/images/crs-control-panel-badge.jpg" alt="CRS Control Panel" class="footer-badge" />
            <div class="terminal-status-line">© 2026 Cowley Road Studios / Workshop Cafe · POWERED BY 0DR0 ENGINEERING</div>
          </div>

        </div>
      </footer>
    </div>
  );
};
