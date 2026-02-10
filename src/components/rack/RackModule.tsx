import React from 'react';

export interface RackModuleProps {
  label: string;
  title: string;
  description: string;
  bookingUrl: string;
  ledColor?: 'green' | 'amber' | 'red';
  variant?: 'command' | 'rack' | 'passive';
  instruction?: string;
}

export const RackModule: React.FC<RackModuleProps> = ({
  label,
  title,
  description,
  bookingUrl,
  ledColor = 'green',
  variant = 'rack',
  instruction = '[ INSTRUCTION: SELECT SERVICE FROM LIST ]',
}) => {
  // Construct LED class based on color prop
  const ledClass = ledColor !== 'green' 
    ? `led-indicator led-${ledColor}` 
    : 'led-indicator';

  // Construct module class with variant
  const moduleClass = `rack-module rack-${variant}`;

  // Auto-generate button text from title
  const buttonText = `BOOK_${title.toUpperCase().replace(/\s/g, '_')}_NOW`;

  return (
    <div className={moduleClass}>
      <div className="rack-label-strip">
        <span className={ledClass}></span>
        <span className="rack-label">{label}</span>
      </div>

      <h2 className="rack-title">{title}</h2>

      <p className="rack-description">{description}</p>

      <div className="rack-button-group">
        <span className="booking-instruction">{instruction}</span>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rack-button"
        >
          [ {buttonText} ]
        </a>
      </div>
    </div>
  );
};
