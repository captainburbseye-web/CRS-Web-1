/**
 * RackModule Component - Manus's Clean Implementation
 * Design Philosophy: Industrial rack hardware aesthetic
 * - Sage green dominant with mustard accents
 * - Warm browns for structure
 * - Red used sparingly and playfully
 * - Soft industrial feel, not militarized
 * - FixLogic: 16px fonts, 44px touch targets, high contrast
 */

export interface RackModuleProps {
  label: string;
  title: string;
  description: string;
  bookingUrl: string;
  ledColor?: 'green' | 'amber' | 'red';
  instruction?: string;
  dropdownServices?: Array<{ name: string; url: string }>;
  // Phase 2: Future-proofing props
  visible?: boolean;
  priority?: 'high' | 'normal' | 'low';
  status?: 'online' | 'offline' | 'maintenance';
  row?: number;  // Row number for nav targeting
}

export const RackModule = ({
  label,
  title,
  description,
  bookingUrl,
  ledColor = 'green',
  instruction = '[ INSTRUCTION: SELECT SERVICE FROM LIST ]',
  dropdownServices,
  visible = true,
  priority = 'normal',
  status = 'online',
  row,
}: RackModuleProps) => {
  // Construct LED class based on color prop
  const ledClass = `led-indicator${ledColor !== 'green' ? ` led-${ledColor}` : ''}`;

  // Simple button text - no brackets, no underscores
  const buttonText = `BOOK NOW`;

  // Determine rack type and location from label for differentiation
  const getDataAttributes = () => {
    const attrs: Record<string, string> = {};
    
    // Phase 2: Add future-proofing attributes
    attrs['data-visible'] = String(visible);
    attrs['data-priority'] = priority;
    attrs['data-status'] = status;
    
    // Add row number for navigation targeting
    if (row !== undefined) {
      attrs['data-row'] = String(row);
    }
    
    if (label.includes('COWLEY')) {
      attrs['data-location'] = 'cowley';
    } else if (label.includes('CRICKET')) {
      attrs['data-location'] = 'cricket';
    }
    
    if (label.includes('CONTROL') || title.includes('CONTROL')) {
      attrs['data-type'] = 'control';
    } else if (label.includes('WORKSHOP_CAFE') || title.includes('CAFÉ')) {
      attrs['data-type'] = 'cafe';
    } else if (label.includes('SYSTEM') || label.includes('MASTER_BUS')) {
      attrs['data-type'] = 'system';
    } else if (title.includes('BOOK NOW') || title.includes('BOOKING HUB')) {
      attrs['data-type'] = 'command';
    }
    
    return attrs;
  };

  const dataAttrs = getDataAttributes();

  return (
    <div class="rack-module" {...dataAttrs}>
      <div class="rack-label-strip">
        <span class={ledClass}></span>
        <span class="rack-label">{label}</span>
      </div>

      <h2 class="rack-title">{title}</h2>

      <p class="rack-description">{description}</p>

      {/* Hide UI elements for header/passive modules (e.g., Row 1) */}
      {title !== 'COWLEY ROAD STUDIOS' && (
        <div class="rack-button-group">
          <span class="booking-instruction">{instruction}</span>
          
          {dropdownServices ? (
          // Dropdown button
          <div class="rack-dropdown">
            <button
              class="rack-button rack-dropdown-trigger"
              data-dropdown-trigger
              aria-haspopup="true"
              aria-expanded="false"
            >
              {buttonText}
            </button>
            <div
              class="rack-dropdown-menu"
              data-dropdown-menu
              role="menu"
              aria-hidden="true"
            >
              {dropdownServices.map((service) => (
                <a
                  href={service.url}
                  class="rack-dropdown-item"
                  role="menuitem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {service.name}
                </a>
              ))}
            </div>
          </div>
        ) : (
          // Regular button
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="rack-button"
          >
            {buttonText}
          </a>
        )}
      </div>
      )}
    </div>
  );
};
