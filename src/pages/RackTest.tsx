import React from 'react';

// V9: PRODUCTION RACK - USING ACTUAL R2 ASSETS
// Clean implementation with real hybrid rack images

export const RackTestPage = () => {
  
  const viewportStyle: React.CSSProperties = {
    backgroundColor: '#050505', 
    minHeight: '100vh', 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0', 
    margin: '0',
    overflowX: 'hidden',
  };

  const chassisStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '1048px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/blanking_panel.png)',
    backgroundRepeat: 'repeat',
    boxShadow: '0 0 80px rgba(0,0,0,0.9)',
    margin: '0 auto',
  };

  const brickStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
    margin: '0',
    padding: '0',
    border: 'none',
    lineHeight: '0',
    verticalAlign: 'top',
    marginBottom: '-2px',
    position: 'relative',
    zIndex: 2,
  };

  const headerStyle: React.CSSProperties = {
    ...brickStyle,
    background: 'rgba(10,10,10, 0.95)',
    zIndex: 3,
  };

  // Base R2 URL for rack parts
  const R2_BASE = 'https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/rack%20parts';

  return (
    <div style={viewportStyle}>
      <style>{`
        body, html { margin: 0; padding: 0; background: #050505; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={chassisStyle}>
        
        {/* RACK 0: CRS BRANDING */}
        <div style={headerStyle}>
          <img 
            src={`${R2_BASE}/rack%200%20crs.png`}
            alt="CRS" 
            style={brickStyle}
          />
        </div>

        {/* RACK 1: HEADER */}
        <a href="/" style={brickStyle}>
          <img 
            src={`${R2_BASE}/rack%201%20CRS%20Header.png`}
            alt="CRS Oxford Studio Network" 
            style={brickStyle}
          />
        </a>

        {/* RACK 3: CONTROL ROOMS (HYBRID) */}
        <div style={brickStyle}>
          <img 
            src={`${R2_BASE}/rack%203%20control%20rooms.png`}
            alt="Control Rooms" 
            style={brickStyle}
          />
          {/* Split hitboxes - left/right */}
          <a href="/book/control-room?location=cowley" 
             style={{
               position: 'absolute', left: '0', width: '50%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Cowley Control Room" />
          <a href="/book/control-room?location=cricket" 
             style={{
               position: 'absolute', left: '50%', width: '50%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Cricket Control Room" />
        </div>

        {/* RACK 4: RECORDING SERVICES / MIXING SERVICES (HYBRID) */}
        <div style={brickStyle}>
          <img 
            src={`${R2_BASE}/rack%204%20Recording%20srvices%20mixing%20services%20hybrid.png`}
            alt="Recording & Mixing Services" 
            style={brickStyle}
          />
          {/* Split hitboxes - left/right */}
          <a href="/book/recording" 
             style={{
               position: 'absolute', left: '0', width: '50%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Recording Services" />
          <a href="/book/mixing" 
             style={{
               position: 'absolute', left: '50%', width: '50%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Mixing Services" />
        </div>

        {/* RACK 5: AV HIRE */}
        <a href="/av-services" style={brickStyle}>
          <img 
            src={`${R2_BASE}/rack%205%20av.png`}
            alt="AV Hire" 
            style={brickStyle}
          />
        </a>

        {/* RACK 6: CAFE / VENUE / CONTACT (TRIPLE?) */}
        <div style={brickStyle}>
          <img 
            src={`${R2_BASE}/rack%206%20%20cafe%20venue%20%20contact.png`}
            alt="Café, Venue & Contact" 
            style={brickStyle}
          />
          {/* Triple split hitboxes - thirds */}
          <a href="/cafe" 
             style={{
               position: 'absolute', left: '0', width: '33.33%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Workshop Café" />
          <a href="/venue-hire" 
             style={{
               position: 'absolute', left: '33.33%', width: '33.33%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Venue Hire" />
          <a href="mailto:captainburbseye@gmail.com" 
             style={{
               position: 'absolute', left: '66.66%', width: '33.34%', 
               top: '0', height: '100%', cursor: 'pointer', zIndex: 10
             }} 
             title="Contact" />
        </div>

        {/* RACK 7: POWER (BOTTOM) */}
        <a href="/status" style={brickStyle}>
          <img 
            src={`${R2_BASE}/rack%207%20power%20at%20the%20bottom.png`}
            alt="System Power" 
            style={brickStyle}
          />
        </a>

        {/* FILLER */}
        <div style={{ ...brickStyle, minHeight: '300px', flexGrow: 1 }}></div>

      </div>
    </div>
  );
};
