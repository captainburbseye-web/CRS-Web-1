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
        backgroundColor: '#007bff',
        '&:hover': {
          backgroundColor: '#0056b3',
        },
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'none',
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default BookingButton;
