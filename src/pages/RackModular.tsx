import { RackModule } from '../components/rack/RackModule';
import { SplitRackRow } from '../components/rack/SplitRackRow';
import { RackNav } from '../components/rack/RackNav';
import { TestimonialsRackModule } from '../components/rack/TestimonialsRackModule';
import { rackServices, getAllRows, getServicesByRow, getSplitServices } from '../data/services';

/**
 * Rack Modular Page: Complete 12-row rack system
 * Design Philosophy: Industrial rack aesthetic with sage green, mustard accents
 * FixLogic: 16px fonts, 44px touch targets, high contrast
 * Phase 2: Sticky nav, entrance animations, future-proofing
 * Phase 3: Social proof, CTA optimization, pricing transparency
 * Built by Manus - Clean implementation
 */

export const RackModular = () => {
  const allRows = getAllRows();

  return (
    <>
      {/* Skip Navigation Link for Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Phase 2: Sticky Navigation */}
      <RackNav />
      
      {/* Header with semantic markup */}
      <header>
        <img 
          src="https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/rack%20parts/rack%201%20CRS%20Header.png"
          alt="Cowley Road Studios - Professional Recording Studio Oxford. Modular rack system interface showing available services including rehearsal space, control rooms, and music production facilities."
          style="width: 100%; display: block; max-width: 1200px; margin: 0 auto;"
        />
      </header>
      
      {/* Main content landmark */}
      <main id="main-content" className="rack-container" role="main" aria-label="Cowley Road Studios Services">
      {allRows.map((rowNumber) => {
        const services = getServicesByRow(rowNumber);
        
        // Insert Testimonials Module after Row 2 (BOOK NOW)
        const testimonialsAfterRow2 = rowNumber === 2 ? <TestimonialsRackModule key="testimonials" /> : null;
        
        // Check if this row has split modules
        const hasSplitModules = services.some(s => s.isSplit);
        
        if (hasSplitModules) {
          const { left, right } = getSplitServices(rowNumber);
          
          if (!left || !right) {
            console.error(`Split row ${rowNumber} missing left or right module`);
            return null;
          }
          
          return (
            <>
              <SplitRackRow
                key={`row-${rowNumber}`}
                left={{
                  label: left.label,
                  title: left.title,
                  description: left.description,
                  bookingUrl: left.url,
                  ledColor: left.ledColor,
                  instruction: left.instruction,
                }}
                right={{
                  label: right.label,
                  title: right.title,
                  description: right.description,
                  bookingUrl: right.url,
                  ledColor: right.ledColor,
                  instruction: right.instruction,
                }}
              />
              {testimonialsAfterRow2}
            </>
          );
        }
        
        // Regular full-width module
        return (
          <>
            {services.map((service) => (
              <RackModule
                key={service.id}
                label={service.label}
                title={service.title}
                description={service.description}
                bookingUrl={service.url}
                ledColor={service.ledColor}
                instruction={service.instruction}
                dropdownServices={service.dropdownServices}
                visible={service.visible}
                priority={service.priority}
                status={service.status}
                row={service.row}
                ctaText={service.ctaText}
              />
            ))}
            {testimonialsAfterRow2}
          </>
        );
      })}
    </main>
    </>
  );
};
