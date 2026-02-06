import React from 'react';
import BookingButton from './BookingButton';

export const RackModule = ({ label, type = 'standard', children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel }) => (
  <section>
    <div>
      <div>
        {/* Placeholder for LED status */}
        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: #ccc;"></span>
      </div>
      <h2>{label}</h2>
    </div>
    
    <div>
      {children}
      
      {/* Booking Button */}
      {bookingUrl && (
        <BookingButton label={label} bookingUrl={bookingUrl} buttonLabel={buttonLabel || 'BOOK NOW'} />
      )}
    </div>
  </section>
);
