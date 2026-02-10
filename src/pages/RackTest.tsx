import React from 'react';

export const RackTestPage = () => {
  // 1. THE CHASSIS CONTAINER (Hydraulic Press Edition)
  const chassisStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '1400px', 
    margin: '0 auto',
    backgroundColor: '#000',
    // KEY FIX: The borders + content-box ensure the rails sit OUTSIDE the 1400px content area
    borderLeft: '32px solid #222',  
    borderRight: '32px solid #222', 
    boxSizing: 'content-box' as const, 
    boxShadow: 'inset 10px 0 20px #000',
  };

  // 2. THE BRICK STYLE (Force Full Stretch)
  const brickStyle = {
    display: 'block',
    width: '100%',      // Forces image to hit the rails
    height: 'auto',
    margin: '0',
    padding: '0',
    border: 'none',
    lineHeight: '0',
    verticalAlign: 'top' as const,
    marginBottom: '-5px', // MAXIMUM HYDRAULIC PRESS (Forces overlap)
    position: 'relative' as const,
    zIndex: 1,
    objectFit: 'cover' as const, // Ensures no aspect ratio gaps
  };

  // Live Waveform Component
  const LiveWaveform = ({ style }: { style: React.CSSProperties }) => (
    <div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10, ...style }}>
      <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 5px cyan)' }}>
        <path d="M0,30 Q10,5 20,30 T40,30 T60,30 T80,55 T100,30 T120,5 T140,30 T160,30 T180,45 T200,30"
              fill="none" stroke="#00ffff" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" from="0, 400" to="400, 0" dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '0', margin: '0' }}>
      <div style={chassisStyle}>

        {/* UNIT 0: BRAND HEADER (Restored) */}
        <div style={{...brickStyle, background: '#111', zIndex: 2}}>
             <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
                alt="Cowley Road Studios" 
                style={brickStyle}
             />
        </div>

        {/* UNIT 1: COWLEY REHEARSAL */}
        <a href="/book/rehearsal" style={brickStyle}>
          <img src="/static/machined-assets/cowley-rehearsal-optimized.webp" alt="Cowley" style={brickStyle} />
        </a>

        {/* UNIT 8: CRICKET REHEARSAL */}
        <a href="/book/rehearsal" style={brickStyle}>
          <img src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp" alt="Cricket" style={brickStyle} />
        </a>

        {/* UNIT 2: CONTROL ROOM + WAVEFORM */}
        <a href="/book/control-room" style={brickStyle}>
          <img src="/static/machined-assets/cricket-control-room-optimized.webp" alt="Control Room" style={brickStyle} />
          <LiveWaveform style={{ top: '35%', left: '35%', width: '25%', opacity: 0.8 }} />
        </a>

        {/* UNIT 3: PODCAST + WAVEFORM */}
        <a href="/book/podcast" style={brickStyle}>
          <img src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png" alt="Podcast" style={brickStyle} />
          <LiveWaveform style={{ top: '30%', left: '42%', width: '25%', opacity: 0.8, filter: 'drop-shadow(0 0 5px magenta)' }} />
        </a>

        {/* UNIT 4: CAFE */}
        <a href="/cafe" style={brickStyle}>
          <img src="/static/machined-assets/workshop-cafe-optimized.webp" alt="Cafe" style={brickStyle} />
        </a>

        {/* UNIT 6: CONTACT */}
        <div style={brickStyle}>
          <img src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/Contact%20rack%20ui.png" alt="Contact" style={brickStyle} />
          <a href="mailto:captainburbseye@gmail.com" style={{ position: 'absolute', top: '20%', left: '15%', width: '15%', height: '60%' }}></a>
          <a href="mailto:captainburbseye@gmail.com" style={{ position: 'absolute', top: '20%', right: '15%', width: '15%', height: '60%' }}></a>
        </div>

        {/* UNIT 7: MASTER BUS */}
        <a href="/status" style={brickStyle}>
          <img src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/ch7%20rack%20bottom%20ui.png" alt="Bottom" style={brickStyle} />
        </a>

        {/* BLANKING PANEL */}
        <div style={{ ...brickStyle, flexGrow: 1, minHeight: '50vh', backgroundImage: 'url(https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/blanking_panel.png)', backgroundRepeat: 'repeat' }}></div>

      </div>
    </div>
  );
};
