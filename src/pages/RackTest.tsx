import React from 'react';

export const RackTestPage = () => {
  // 1. THE DARK ROOM (Viewport)
  const viewportStyle: React.CSSProperties = {
    backgroundColor: '#050505',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Anchors rack to top
    padding: '20px 0', 
    overflowX: 'hidden',
  };

  // 2. THE CHASSIS CONTAINER (Holds the Monolith)
  const chassisStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '600px', // Adjusts to screen size naturally
    boxShadow: '0 0 100px rgba(0,0,0,0.9)', // Deep industrial shadow
  };

  // 3. FULL WIDTH HITBOX MAKER
  const hitbox = (top: string, height: string) => ({
    position: 'absolute' as const,
    left: '0',
    width: '100%',
    top: top,
    height: height,
    cursor: 'pointer',
    zIndex: 10,
    // border: '1px solid rgba(0, 255, 0, 0.2)', // UNCOMMENT TO DEBUG ZONES
  });

  // 4. SPLIT HITBOX MAKER (For Hybrid Units)
  const splitHitbox = (top: string, height: string, side: 'left' | 'right') => ({
    position: 'absolute' as const,
    left: side === 'left' ? '0%' : '50%',
    width: '50%',
    top: top,
    height: height,
    cursor: 'pointer',
    zIndex: 10,
    // border: '1px solid rgba(255, 0, 0, 0.2)', // UNCOMMENT TO DEBUG ZONES
  });

  return (
    <div style={viewportStyle}>
      <div style={chassisStyle}>
        
        {/* --- THE MONOLITH: ONE IMAGE, ZERO GAPS --- */}
        <img 
          src="https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/rack%20parts/rack%20ui%20webpage%20crs.png" 
          alt="Cowley Road Studios Oxford"
          style={{ width: '100%', display: 'block', borderRadius: '2px' }} 
        />

        {/* --- INVISIBLE CLICK ZONES (Assuming 8 Equal Rows of ~12.5%) --- */}

        {/* ROW 1: HEADER LOGO (Home) */}
        <a href="/" style={hitbox('0%', '12.5%')} title="Home"></a>

        {/* ROW 2: SUB-HEADER / BOOKING TEXT */}
        <a href="/book" style={hitbox('12.5%', '12.5%')} title="Book Now"></a>

        {/* ROW 3: REHEARSAL (Split: Cowley Green / Cricket Purple) */}
        <a href="/book/rehearsal?location=cowley" style={splitHitbox('25%', '12.5%', 'left')} title="Cowley Rehearsal"></a>
        <a href="/book/rehearsal?location=cricket" style={splitHitbox('25%', '12.5%', 'right')} title="Cricket Rehearsal"></a>

        {/* ROW 4: CONTROL ROOM (Split: Analog / Digital) */}
        <a href="/book/control-room?location=cowley" style={splitHitbox('37.5%', '12.5%', 'left')} title="Cowley Control Room"></a>
        <a href="/book/control-room?location=cricket" style={splitHitbox('37.5%', '12.5%', 'right')} title="Cricket Control Room"></a>

        {/* ROW 5: RECORDING SERVICES (Tape Machine) */}
        <a href="/book/recording" style={hitbox('50%', '12.5%')} title="Recording Services"></a>

        {/* ROW 6: AV HIRE (Video Matrix) */}
        <a href="/av-services" style={hitbox('62.5%', '12.5%')} title="AV Hire"></a>

        {/* ROW 7: COMMUNITY (Split: Cafe / Contact) */}
        <a href="/cafe" style={splitHitbox('75%', '12.5%', 'left')} title="Workshop Cafe"></a>
        <a href="/contact" style={splitHitbox('75%', '12.5%', 'right')} title="Contact Us"></a>

        {/* ROW 8: MASTER BUS (Status) */}
        <a href="/status" style={hitbox('87.5%', '12.5%')} title="System Status"></a>

      </div>
    </div>
  );
};
