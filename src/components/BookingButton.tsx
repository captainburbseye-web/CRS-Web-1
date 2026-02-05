import React from 'react';
import { Button } from '@mui/material';

interface BookingButtonProps {
  label: string;
  bookingUrl?: string;
  buttonLabel?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ label, bookingUrl = '/contact?service=venue', buttonLabel = 'Book Now' }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        backgroundColor: '#006aff',
        '&:hover': {
          backgroundColor: '#0056b3',
          transform: 'scale(1.02)', // Slightly lift the button
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle glow effect
        },
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase', // Use uppercase text
        letterSpacing: '1px', // Slightly tracked-out text
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add transitions for smooth effects
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default BookingButton;
