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
        <div style={{
          position: 'relative',
          border: '1px solid #377867',
          borderRadius: '4px'
        }}>
          <img src={imageSrc} alt={label} style={{ display: 'block', width: '100%', height: 'auto' }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
            pointerEvents: 'none'
          }}></div>
        </div>
        
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
