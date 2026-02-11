import { RackModule } from '../components/rack/RackModule';
import { SplitRackRow } from '../components/rack/SplitRackRow';
import { rackServices, getAllRows, getServicesByRow, getSplitServices } from '../data/services';

/**
 * Rack Modular Page: Complete 12-row rack system
 * Design Philosophy: Industrial rack aesthetic with sage green, mustard accents
 * FixLogic: 16px fonts, 44px touch targets, high contrast
 * Built by Manus - Clean implementation
 */

export const RackModular = () => {
  const allRows = getAllRows();

  return (
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
          />
        ));
      })}
    </div>
  );
};
