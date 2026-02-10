import React from 'react';

export const RackTestPage = () => {
  // 1. THE CHASSIS CONTAINER (Refined Edition)
  const chassisStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '900px', 
    margin: '0 auto',
    backgroundColor: '#000',
    // Refined rails - subtle but visible
    borderLeft: '20px solid #222',  
    borderRight: '20px solid #222', 
    boxSizing: 'content-box' as const, 
    boxShadow: 'inset 10px 0 20px #000',
  };

  // 2. THE BRICK STYLE (Refined Seal)
  const brickStyle = {
    display: 'block',
    width: '100%',
    height: 'auto',
    margin: '0',
    padding: '0',
    border: 'none',
    lineHeight: '0',
    verticalAlign: 'top' as const,
    marginBottom: '-3px', // Refined overlap - tight but not crushed
    position: 'relative' as const,
    zIndex: 1,
    objectFit: 'cover' as const,
  };

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

        {/* UNIT 2: CONTROL ROOM */}
        <a href="/book/control-room" style={brickStyle}>
          <img src="/static/machined-assets/cricket-control-room-optimized.webp" alt="Control Room" style={brickStyle} />
        </a>

        {/* UNIT 3: PODCAST */}
        <a href="/book/podcast" style={brickStyle}>
          <img src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png" alt="Podcast" style={brickStyle} />
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
