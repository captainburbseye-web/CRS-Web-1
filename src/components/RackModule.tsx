import React from 'react';
import BookingButton from './BookingButton';

export const RackModule = ({ label, type = 'standard', children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel }) => (
  <section>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
      <img src={videoId || qrLink} alt={label} style={{ display: 'block', width: '100%' }} />
      
      {children}
      
      {/* Booking Button */}
      {bookingUrl && (
        <BookingButton label={label} bookingUrl={bookingUrl} buttonLabel={buttonLabel || 'BOOK NOW'} />
      )}
    </div>
  </section>
);
