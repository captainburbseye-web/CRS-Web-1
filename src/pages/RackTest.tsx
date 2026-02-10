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
    maxWidth: '100%',
    width: '100%',
    margin: '0',
    backgroundColor: '#000',
    minHeight: '100vh'
  }

  const brickStyle = {
    display: 'block',
    width: '100%',
    margin: '0',
    padding: '0',
    border: 'none',
    lineHeight: '0',
    verticalAlign: 'top' as const,
    marginTop: '-5px',
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
        {/* UNIT 0: HEADER IMAGE */}
        <div style={brickStyle}>
          <img
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png"
            alt="Cowley Road Studios"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </div>

        {/* UNIT 1: COWLEY REHEARSAL */}
        <a href="/book/rehearsal" style={brickStyle}>
          <img
            src="/static/machined-assets/cowley-rehearsal-optimized.webp"
            alt="CH1"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </a>

        {/* UNIT 8: CRICKET REHEARSAL */}
        <a href="/book/rehearsal" style={brickStyle}>
          <img
            src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
            alt="CH8"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </a>

        {/* UNIT 2: CONTROL ROOM + WAVEFORM */}
        <a href="/book/control-room" style={brickStyle}>
          <img
            src="/static/machined-assets/cricket-control-room-optimized.webp"
            alt="CH2"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
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
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
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
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </a>

        {/* UNIT 6: CONTACT (Dual Hitboxes) */}
        <div style={brickStyle}>
          <img
            src="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/Contact%20rack%20ui.png"
            alt="CH6"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
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
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
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
