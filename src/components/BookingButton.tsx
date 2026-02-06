import React from 'react';

interface BookingButtonProps {
  label: string;
  bookingUrl?: string;
  buttonLabel?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ label, bookingUrl = '/contact?service=venue', buttonLabel = 'Book Now' }) => {
  return (
    <a
      href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
      style={{
        backgroundColor: '#006aff',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '4px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: '0.2s',
      }}
    >
      {buttonLabel}
    </a>
  );
};

export default BookingButton;
