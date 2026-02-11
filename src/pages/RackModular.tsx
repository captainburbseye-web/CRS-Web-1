import { RackModule } from '../components/rack/RackModule';
import { SplitRackRow } from '../components/rack/SplitRackRow';
import { RackNav } from '../components/rack/RackNav';
import { rackServices, getAllRows, getServicesByRow, getSplitServices } from '../data/services';

/**
 * Rack Modular Page: Complete 12-row rack system
 * Design Philosophy: Industrial rack aesthetic with sage green, mustard accents
 * FixLogic: 16px fonts, 44px touch targets, high contrast
 * Phase 2: Sticky nav, entrance animations, future-proofing
 * Built by Manus - Clean implementation
 */

export const RackModular = () => {
  const allRows = getAllRows();

  return (
    <>
      {/* Phase 2: Sticky Navigation */}
      <RackNav />
      
      {/* CRS Rack Header Image */}
      <img 
        src="https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/rack%20parts/rack%201%20CRS%20Header.png"
        alt="Cowley Road Studios Rack Header"
        style="width: 100%; display: block; max-width: 1200px; margin: 0 auto;"
      />
      
      <div className="rack-container">
      {allRows.map((rowNumber) => {
        const services = getServicesByRow(rowNumber);
        
        // Check if this row has split modules
        const hasSplitModules = services.some(s => s.isSplit);
        
        if (hasSplitModules) {
          const { left, right } = getSplitServices(rowNumber);
          
          if (!left || !right) {
            console.error(`Split row ${rowNumber} missing left or right module`);
            return null;
          }
          
          return (
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
          );
        }
        
        // Regular full-width module
        return services.map((service) => (
          <RackModule
            key={service.id}
            label={service.label}
            title={service.title}
            description={service.description}
            bookingUrl={service.url}
            ledColor={service.ledColor}
            instruction={service.instruction}
            dropdownServices={service.dropdownServices}
          />
        ));
      })}
    </div>
    </>
  );
};
