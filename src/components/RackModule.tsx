import React from 'react';
import BookingButton from './BookingButton';

export const RackModule = ({ label, type = 'standard', className, children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel }) => (
  <section class={`rack-unit device-${type} ${className}`}>
    <div class="rack-unit-header">
      <div class="rack-unit-led">
        {/* Placeholder for LED status */}
        <span class="led" style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: #ccc;"></span>
      </div>
      <h2 class="rack-unit-title">{label}</h2>
    </div>
    
    <div class="rack-unit-content">
      {children}
      
      {/* Booking Button */}
      {bookingUrl && (
        <BookingButton label={label} bookingUrl={bookingUrl} buttonLabel={buttonLabel || 'BOOK NOW'} />
      )}
    </div>
  </section>
);
