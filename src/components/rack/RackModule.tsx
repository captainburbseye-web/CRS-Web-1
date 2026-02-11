export interface RackModuleProps {
  label: string;
  title: string;
  description: string;
  bookingUrl: string;
  ledColor?: 'green' | 'amber' | 'red';
  variant?: 'command' | 'rack' | 'passive';
  instruction?: string;
  children?: any;
}

export const RackModule = ({
  label,
  title,
  description,
  bookingUrl,
  ledColor = 'green',
  variant = 'rack',
  instruction = '[ INSTRUCTION: SELECT SERVICE FROM LIST ]',
  children,
}: RackModuleProps) => {
  // Construct LED class based on color prop
  const ledClass = ledColor !== 'green' 
    ? `led-indicator led-${ledColor}` 
    : 'led-indicator';

  // Construct module class with variant
  const moduleClass = `rack-module rack-${variant}`;

  // Auto-generate button text from title
  const buttonText = `BOOK_${title.toUpperCase().replace(/\s/g, '_')}_NOW`;

  return (
    <div class={moduleClass}>
      <div class="rack-label-strip">
        <span class={ledClass}></span>
        <span class="rack-label">{label}</span>
      </div>

      <h2 class="rack-title">{title}</h2>

      <p class="rack-description">{description}</p>

      {/* Children slot for waveforms, visualizations, etc. */}
      {children && (
        <div class="rack-module-content">
          {children}
        </div>
      )}

      <div class="rack-button-group">
        <span class="booking-instruction">{instruction}</span>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="rack-button"
        >
          [ {buttonText} ]
        </a>
      </div>
    </div>
  );
};
