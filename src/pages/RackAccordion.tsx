import { useState } from 'hono/jsx';
import { rackServices } from '../data/services';

/**
 * Rack Accordion: Hardware rack with expandable modules
 * Click any module to expand it, others stay collapsed
 * Hardware aesthetic with LED indicators
 */

export const RackAccordion = () => {
  // Filter out header service
  const services = rackServices.filter(s => s.id !== 'header');
  
  return (
    <div className="rack-accordion-viewport">
      <div className="system-badge">
        <span className="system-led"></span>
        CRS RACK SYSTEM — ONLINE
      </div>
      
      <div className="rack-accordion-container">
        {services.map((service) => (
          <details 
            key={service.id}
            className={`rack-accordion-module rack-${service.variant || 'rack'}`}
            data-variant={service.variant || 'rack'}
            data-led-color={service.ledColor}
          >
            <summary className="rack-accordion-header">
              <span className="rack-led" data-color={service.ledColor}></span>
              <span className="rack-label">{service.label}</span>
              <span className="rack-title">{service.title}</span>
              <span className="rack-chevron">›</span>
            </summary>
            
            <div className="rack-accordion-content">
              <div className="rack-content-inner">
                <p className="rack-description">{service.description}</p>
                
                {service.dropdownServices && service.dropdownServices.length > 0 ? (
                  <div className="rack-services-list">
                    <div className="services-label">AVAILABLE SERVICES:</div>
                    {service.dropdownServices.map((s, i) => (
                      <a 
                        key={i}
                        href={s.url} 
                        className="rack-service-link"
                      >
                        <span className="service-bullet">▸</span>
                        {s.name}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a href={service.url} className="rack-cta-button">
                    <span className="button-led">●</span>
                    {service.ctaText || 'BOOK NOW'}
                  </a>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
      
      <div className="system-status-strip">
        SYSTEM: ONLINE · {services.length} MODULES · CRS v1.0
      </div>
    </div>
  );
};
