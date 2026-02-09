/**
 * RACK TEST - NUCLEAR OVERWRITE
 * Hardcoded inline styles - bypasses all CSS issues
 * Fixed header, forced overlap, zero tolerance
 */

export function RackTestPage() {
  // NUCLEAR STYLE OBJECTS (Immutable)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#000',
    borderLeft: '24px solid #222',
    borderRight: '24px solid #222',
    minHeight: '100vh',
    boxShadow: 'inset 10px 0 20px #000'
  }

  const brickStyle = {
    display: 'block',
    width: '100%',
    margin: '0',
    padding: '0',
    border: 'none',
    lineHeight: '0',
    verticalAlign: 'top' as const,
    marginTop: '-1px',
    position: 'relative' as const,
    zIndex: 1
  }

  // Live Waveform Component (Internal)
  const LiveWaveform = ({ style }: { style: any }) => (
    <div style={{
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 10,
      ...style
    }}>
      <svg viewBox="0 0 200 60" style={{
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0 0 5px cyan)'
      }}>
        <path
          d="M0,30 Q10,5 20,30 T40,30 T60,30 T80,55 T100,30 T120,5 T140,30 T160,30 T180,45 T200,30"
          stroke="#00ffff"
          strokeWidth="2"
          fill="none"
          style={{
            animation: 'pulse 2s infinite'
          }}
        />
      </svg>
    </div>
  )

  return (
    <div style={{
      backgroundColor: '#050505',
      minHeight: '100vh',
      padding: '0'
    }}>
      {/* THE CHASSIS */}
      <div style={containerStyle}>
        {/* UNIT 0: HEADER (CSS TEXT FALLBACK) */}
        <div style={{
          ...brickStyle,
          background: '#111',
          height: 'auto',
          padding: '20px 0',
          borderBottom: '2px solid #333',
          zIndex: 2
        }}>
          <h1 style={{
            color: '#ddd',
            fontFamily: 'monospace',
            textAlign: 'center',
            margin: 0,
            fontSize: '2rem',
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }}>
            COWLEY ROAD STUDIOS
          </h1>
        </div>

        {/* UNIT 1: COWLEY REHEARSAL */}
        <a href="/book/rehearsal" style={brickStyle}>
          <img
            src="/static/machined-assets/cowley-rehearsal-optimized.webp"
            alt="CH1"
            style={{ width: '100%', display: 'block' }}
          />
        </a>

        {/* UNIT 8: CRICKET REHEARSAL */}
        <a href="/book/rehearsal" style={brickStyle}>
          <img
            src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
            alt="CH8"
            style={{ width: '100%', display: 'block' }}
          />
        </a>

        {/* UNIT 2: CONTROL ROOM + WAVEFORM */}
        <a href="/book/control-room" style={brickStyle}>
          <img
            src="/static/machined-assets/cricket-control-room-optimized.webp"
            alt="CH2"
            style={{ width: '100%', display: 'block' }}
          />
          <LiveWaveform style={{
            top: '35%',
            left: '35%',
            width: '25%',
            opacity: 0.8
          }} />
        </a>

        {/* UNIT 3: PODCAST + WAVEFORM */}
        <a href="/book/podcast" style={brickStyle}>
          <img
            src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png"
            alt="CH3"
            style={{ width: '100%', display: 'block' }}
          />
          <LiveWaveform style={{
            top: '30%',
            left: '42%',
            width: '25%',
            opacity: 0.8,
            filter: 'drop-shadow(0 0 5px magenta)'
          }} />
        </a>

        {/* UNIT 4: CAFE */}
        <a href="/cafe" style={brickStyle}>
          <img
            src="/static/machined-assets/workshop-cafe-optimized.webp"
            alt="CH4"
            style={{ width: '100%', display: 'block' }}
          />
        </a>

        {/* UNIT 6: CONTACT (Dual Hitboxes) */}
        <div style={brickStyle}>
          <img
            src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/Contact%20rack%20ui.png"
            alt="CH6"
            style={{ width: '100%', display: 'block' }}
          />
          {/* XLR Hitbox */}
          <a
            href="mailto:captainburbseye@gmail.com"
            style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '15%',
              height: '60%',
              background: 'transparent'
            }}
          />
          {/* Jack Hitbox */}
          <a
            href="mailto:captainburbseye@gmail.com"
            style={{
              position: 'absolute',
              top: '20%',
              right: '15%',
              width: '15%',
              height: '60%',
              background: 'transparent'
            }}
          />
        </div>

        {/* UNIT 7: MASTER BUS */}
        <a href="/status" style={brickStyle}>
          <img
            src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/ch7%20rack%20bottom%20ui.png"
            alt="CH7"
            style={{ width: '100%', display: 'block' }}
          />
        </a>

        {/* BLANKING FILLER */}
        <div style={{
          ...brickStyle,
          flexGrow: 1,
          backgroundImage: 'url(https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/blanking_panel.png)',
          backgroundRepeat: 'repeat-y',
          minHeight: '200px'
        }} />
      </div>

      {/* INLINE CSS FOR WAVEFORM ANIMATION */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
