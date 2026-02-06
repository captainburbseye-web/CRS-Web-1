import React from 'react';
import BookingButton from './BookingButton';

interface ButtonContainerProps {
  buttonLabel: string;
  bookingUrl?: string;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ buttonLabel, bookingUrl }) => {
  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <BookingButton label="Standard" bookingUrl={bookingUrl} buttonLabel={buttonLabel} />
      <BookingButton label="Parent" bookingUrl={bookingUrl} buttonLabel={buttonLabel} />
      <BookingButton label="Sub-Rack" bookingUrl={bookingUrl} buttonLabel={buttonLabel} />
    </div>
  );
};

export default ButtonContainer;
