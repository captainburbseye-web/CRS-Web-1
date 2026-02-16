import { simplifiedServices } from '../data/services-simplified';

/**
 * Book Accordion: Same design as homepage but focused on booking
 * Shows all services in accordion format with direct booking links
 */

export const BookAccordion = () => {
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
      
      {/* BOOKING INTRODUCTION */}
      <div class="studio-intro">
        <h1>Book Your Session</h1>
        <p>Choose your service below and book instantly. All sessions include professional equipment and flexible scheduling. Click any service to see booking options.</p>
      </div>

      {/* MAIN ACCORDION RACK */}
      <div class="rack-accordion-viewport">
        <div class="system-badge">
          <img src="/static/images/crs-badge-dark.webp" alt="CRS" class="system-badge-logo" />
          <span class="system-led"></span>
          BOOKING SYSTEM — ONLINE
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
                    /* Single booking option */
                    <a href={service.url || '#'} class="rack-cta-button">
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
          BOOKING: OPEN · {simplifiedServices.length} SERVICES · CRS v1.0
        </div>
      </div>

      {/* CONTACT INFO */}
      <div class="booking-footer-info">
        <h3>Need Help Booking?</h3>
        <p>Call us: <a href="tel:+441865722027">01865 722027</a></p>
        <p>Email: <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></p>
        <p><a href="/">← Back to Homepage</a></p>
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
