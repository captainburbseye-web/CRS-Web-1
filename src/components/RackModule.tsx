import React, { useMemo } from 'react';
import BookingButton from './BookingButton';

interface RackModuleProps {
  label: string;
  type?: 'standard' | 'parent' | 'sub-rack';
  children?: any;
  videoId?: number;
  qrLink?: string;
  bookingRoute?: string;
  bookingUrl?: string;
  buttonLabel?: string;
}

const RackModule: React.FC<RackModuleProps> = ({ label, type = 'standard', children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel }) => {
  const imageSrc = useMemo(() => videoId || qrLink, [videoId, qrLink]);

  return (
    <section>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
        <img src={imageSrc} alt={label} style={{ display: 'block', width: '100%' }} />
        
        {children}
        
        {/* Booking Button */}
        {bookingUrl && (
          <BookingButton label={label} bookingUrl={bookingUrl} buttonLabel={buttonLabel || 'BOOK NOW'} />
        )}
      </div>
    </section>
  );
};

export default RackModule;
