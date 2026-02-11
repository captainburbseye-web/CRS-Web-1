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
}

export const RackModule = ({
  label,
  title,
  description,
  bookingUrl,
  ledColor = 'green',
  instruction = '[ INSTRUCTION: SELECT SERVICE FROM LIST ]',
  dropdownServices,
}: RackModuleProps) => {
  // Construct LED class based on color prop
  const ledClass = `led-indicator${ledColor !== 'green' ? ` led-${ledColor}` : ''}`;

  // Auto-generate button text from title
  const buttonText = `BOOK_${title.toUpperCase().replace(/\s+/g, '_')}_NOW`;

  return (
    <div class="rack-module">
      <div class="rack-label-strip">
        <span class={ledClass}></span>
        <span class="rack-label">{label}</span>
      </div>

      <h2 class="rack-title">{title}</h2>

      <p class="rack-description">{description}</p>

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
              [ {buttonText} ]
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
            [ {buttonText} ]
          </a>
        )}
      </div>
    </div>
  );
};
