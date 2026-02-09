/**
 * RACK TEST - STRUCTURAL ASSEMBLY V.2.06
 * 19-inch equipment rack with live waveforms
 * Zero-gap brick stacking with full-height chassis
 * Final calibration: Header, blanking panel, refined hitboxes
 */

export function RackTestPage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* CHASSIS CONTAINER - Full Height Frame */}
      <div 
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          borderLeft: '16px solid #222',
          borderRight: '16px solid #222',
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* 1U HEADER PLATE - System Identification */}
        <div 
          style={{
            width: '100%',
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
            padding: '12px 0',
            textAlign: 'center',
            borderBottom: '2px solid #333',
            fontFamily: '"Courier New", "Courier", monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#FFBF00',
            letterSpacing: '2px',
            textShadow: '0 0 8px rgba(255, 191, 0, 0.6)',
            lineHeight: 1
          }}
        >
          CRS STUDIO NETWORK — SYSTEM V.2.06
        </div>

        {/* RACK UNITS STACK */}
        <div style={{ flex: '0 0 auto' }}>
          {/* CH1 - COWLEY ROAD REHEARSAL */}
          <RackUnit
            imageUrl="/static/machined-assets/cowley-rehearsal-optimized.webp"
            linkUrl="/book/rehearsal"
            label="CH1 - Cowley Road Rehearsal"
          />

          {/* CH8 - CRICKET ROAD REHEARSAL */}
          <RackUnit
            imageUrl="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
            linkUrl="/book/rehearsal"
            label="CH8 - Cricket Road Rehearsal"
          />

          {/* CH2 - CONTROL ROOM (with waveform) */}
          <RackUnit
            imageUrl="/static/machined-assets/cricket-control-room-optimized.webp"
            linkUrl="/book/control-room"
            label="CH2 - Control Room"
            showWaveform={true}
            waveformColor="#00ffff"
            waveformLeft="35%"
            waveformWidth="30%"
          />

          {/* CH3 - PODCAST POD (with adjusted waveform) */}
          <RackUnit
            imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png"
            linkUrl="/book/podcast"
            label="CH3 - Podcast Pod"
            showWaveform={true}
            waveformColor="#00ffff"
            waveformLeft="42%"
            waveformWidth="25%"
          />

          {/* CH4 - WORKSHOP CAFÉ */}
          <RackUnit
            imageUrl="/static/machined-assets/workshop-cafe-optimized.webp"
            linkUrl="/cafe"
            label="CH4 - Workshop Café"
          />

          {/* CH6 - CONTACT (with dual XLR/Phone hitboxes) */}
          <RackUnitContact
            imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/Contact%20rack%20ui.png"
            label="CH6 - Contact"
          />

          {/* CH7 - SYSTEM STATUS / BOTTOM */}
          <RackUnit
            imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/ch7%20rack%20bottom%20ui.png"
            linkUrl="/status"
            label="CH7 - System Status"
          />
        </div>

        {/* BLANKING PANEL - Fills remaining vertical space */}
        <div 
          style={{
            flex: '1 1 auto',
            backgroundImage: 'url(https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/blanking_panel.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            minHeight: '100px'
          }}
        />
      </div>

      {/* INLINE CSS FOR WAVEFORM ANIMATION */}
      <style>{`
        @keyframes pulse-waveform {
          0%, 100% { 
            opacity: 0.6;
            transform: scaleX(1);
          }
          50% { 
            opacity: 0.8;
            transform: scaleX(1.02);
          }
        }

        .animate-pulse-waveform {
          animation: pulse-waveform 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

/**
 * RACK UNIT COMPONENT
 * Zero-gap brick with optional live waveform
 */
interface RackUnitProps {
  imageUrl: string
  linkUrl: string
  label: string
  showWaveform?: boolean
  waveformColor?: string
  waveformLeft?: string
  waveformWidth?: string
}

function RackUnit({ 
  imageUrl, 
  linkUrl, 
  label, 
  showWaveform = false, 
  waveformColor = '#00ffff',
  waveformLeft = '35%',
  waveformWidth = '30%'
}: RackUnitProps) {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        margin: 0,
        marginTop: '-1px', // Gap fix
        padding: 0,
        lineHeight: 0,
        fontSize: 0
      }}
    >
      {/* THE IMAGE - Zero gap brick */}
      <img 
        src={imageUrl}
        alt={label}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          margin: 0,
          padding: 0,
          border: 'none'
        }}
      />

      {/* LIVE WAVEFORM (CH2 & CH3 only) */}
      {showWaveform && (
        <svg 
          viewBox="0 0 200 60" 
          style={{
            position: 'absolute',
            width: waveformWidth,
            height: '40%',
            top: '30%',
            left: waveformLeft,
            opacity: 0.6,
            mixBlendMode: 'screen',
            pointerEvents: 'none'
          }}
        >
          <path 
            d="M0,30 Q10,5 20,30 T40,30 T60,30 T80,55 T100,30 T120,5 T140,30 T160,30 T180,45 T200,30" 
            stroke={waveformColor}
            strokeWidth="2"
            fill="none"
            className="animate-pulse-waveform"
          />
        </svg>
      )}

      {/* GHOST HITBOX - Tactile interaction layer */}
      <a 
        href={linkUrl}
        aria-label={label}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'block'
        }}
        onMouseEnter={(e) => {
          const container = e.currentTarget.parentElement
          const img = container?.querySelector('img') as HTMLElement
          if (img) {
            img.style.filter = 'brightness(1.1) saturate(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          const container = e.currentTarget.parentElement
          const img = container?.querySelector('img') as HTMLElement
          if (img) {
            img.style.filter = 'none'
          }
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.99)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      />
    </div>
  )
}

/**
 * CONTACT RACK UNIT - Dual Hitbox (XLR + Phone Jack)
 * Tactile "plug-in" interaction zones
 */
interface RackUnitContactProps {
  imageUrl: string
  label: string
}

function RackUnitContact({ imageUrl, label }: RackUnitContactProps) {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        margin: 0,
        marginTop: '-1px', // Gap fix
        padding: 0,
        lineHeight: 0,
        fontSize: 0
      }}
    >
      {/* THE IMAGE */}
      <img 
        src={imageUrl}
        alt={label}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          margin: 0,
          padding: 0,
          border: 'none'
        }}
      />

      {/* HITBOX 1: XLR INPUT (Left side, circular) */}
      <a 
        href="mailto:captainburbseye@gmail.com"
        aria-label="Contact via XLR Input"
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          top: '50%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'block'
        }}
        onMouseEnter={(e) => {
          const container = e.currentTarget.parentElement
          const img = container?.querySelector('img') as HTMLElement
          if (img) {
            img.style.filter = 'brightness(1.1) saturate(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          const container = e.currentTarget.parentElement
          const img = container?.querySelector('img') as HTMLElement
          if (img) {
            img.style.filter = 'none'
          }
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.95)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
        }}
      />

      {/* HITBOX 2: PHONE JACK (Right side, circular) */}
      <a 
        href="mailto:captainburbseye@gmail.com"
        aria-label="Contact via Phone Jack"
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          top: '50%',
          left: '75%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'block'
        }}
        onMouseEnter={(e) => {
          const container = e.currentTarget.parentElement
          const img = container?.querySelector('img') as HTMLElement
          if (img) {
            img.style.filter = 'brightness(1.1) saturate(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          const container = e.currentTarget.parentElement
          const img = container?.querySelector('img') as HTMLElement
          if (img) {
            img.style.filter = 'none'
          }
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.95)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
        }}
      />
    </div>
  )
}
