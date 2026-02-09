/**
 * RACK TEST - NUCLEAR ZERO-GAP BUILD
 * NO GAPS. NO SPACES. SOLID STEEL WALL.
 * 19-inch equipment rack - structural assembly
 */

export function RackTestPage() {
  return (
    <div style={{ 
      background: '#050505', 
      minHeight: '100vh',
      lineHeight: 0,
      fontSize: 0
    }}>
      {/* CHASSIS CONTAINER - FLEX STACK (NO GRID) */}
      <div 
        className="rack-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: '1200px',
          margin: '0 auto',
          borderLeft: '24px solid #222',
          borderRight: '24px solid #222',
          position: 'relative',
          minHeight: '100vh',
          lineHeight: 0,
          fontSize: 0,
          padding: 0,
          background: '#000'
        }}
      >
        {/* COWLEY ROAD STUDIOS BRAND HEADER - UNIT 0 */}
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png"
          alt="Cowley Road Studios"
          className="rack-unit-img"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0,
            border: 'none',
            borderRadius: 0,
            verticalAlign: 'top'
          }}
        />

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

        {/* CH7 - MASTER BUS / SYSTEM STATUS */}
        <RackUnit
          imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/ch7%20rack%20bottom%20ui.png"
          linkUrl="/status"
          label="CH7 - Master Bus"
        />

        {/* BLANKING PANEL - Fills remaining space */}
        <div 
          style={{
            width: '100%',
            minHeight: '200px',
            backgroundImage: 'url(https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/blanking_panel.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
      </div>

      {/* NUCLEAR CSS - KILL ALL GAPS */}
      <style>{`
        /* WAVEFORM ANIMATION */
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

        /* NUCLEAR ZERO-GAP ENFORCEMENT */
        body {
          line-height: 0 !important;
          font-size: 0 !important;
        }

        img, .rack-unit-img {
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          vertical-align: top !important;
          line-height: 0 !important;
        }

        .rack-container {
          display: flex !important;
          flex-direction: column !important;
          gap: 0 !important;
        }
      `}</style>
    </div>
  )
}

/**
 * RACK UNIT COMPONENT - NUCLEAR ZERO-GAP
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
        marginTop: '-2px', // NUCLEAR OVERLAP
        padding: 0,
        lineHeight: 0,
        fontSize: 0,
        display: 'block'
      }}
    >
      {/* THE IMAGE - NUCLEAR ZERO-GAP */}
      <img 
        src={imageUrl}
        alt={label}
        className="rack-unit-img"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          margin: 0,
          padding: 0,
          border: 'none',
          borderRadius: 0,
          verticalAlign: 'top'
        }}
      />

      {/* LIVE WAVEFORM */}
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

      {/* GHOST HITBOX */}
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
        marginTop: '-2px', // NUCLEAR OVERLAP
        padding: 0,
        lineHeight: 0,
        fontSize: 0,
        display: 'block'
      }}
    >
      {/* THE IMAGE */}
      <img 
        src={imageUrl}
        alt={label}
        className="rack-unit-img"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          margin: 0,
          padding: 0,
          border: 'none',
          borderRadius: 0,
          verticalAlign: 'top'
        }}
      />

      {/* HITBOX 1: XLR INPUT */}
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

      {/* HITBOX 2: PHONE JACK */}
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
