import React from 'react';

export const BuildStatusBanner: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#2d5016', // Dark nettle green
      color: '#f4f4f4',
      padding: '12px 20px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      borderBottom: '2px solid #d4a017', // Mustard accent
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <span style={{ marginRight: '8px' }}>🏗️</span>
      <strong>Cowley Road Studios is currently in build-out mode (Opening March 2026).</strong>
      {' '}All immediate bookings are hosted at our Cricket Road facility.
    </div>
  );
};
