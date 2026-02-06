import React from 'react';

interface BookingButtonProps {
  label: string;
  bookingUrl?: string;
  buttonLabel?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ label, bookingUrl = '/contact?service=venue', buttonLabel = 'VIEW_DETAILS' }) => {
  return (
    <a
      href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
      style={{
        backgroundColor: '#000',
        color: '#377867',
        border: '1px solid #377867',
        padding: '12px 24px',
        borderRadius: '4px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecoration: 'none',
        display: 'inline-block',
        fontFamily: 'monospace'
      }}
    >
      {buttonLabel}
    </a>
  );
};

export default BookingButton;
