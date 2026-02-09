/**
 * RACK TEST - STRUCTURAL ASSEMBLY
 * 19-inch equipment rack with live waveforms
 * Zero-gap brick stacking with chassis rails
 */

export function RackTestPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 0' }}>
      {/* CHASSIS CONTAINER - The Frame */}
      <div 
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          borderLeft: '16px solid #222',
          borderRight: '16px solid #222',
          position: 'relative'
        }}
      >
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
        />

        {/* CH3 - PODCAST POD (with waveform) */}
        <RackUnit
          imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png"
          linkUrl="/book/podcast"
          label="CH3 - Podcast Pod"
          showWaveform={true}
          waveformColor="#00ffff"
        />

        {/* CH4 - WORKSHOP CAFÉ */}
        <RackUnit
          imageUrl="/static/machined-assets/workshop-cafe-optimized.webp"
          linkUrl="/cafe"
          label="CH4 - Workshop Café"
        />

        {/* CH6 - CONTACT */}
        <RackUnit
          imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/Contact%20rack%20ui.png"
          linkUrl="mailto:captainburbseye@gmail.com"
          label="CH6 - Contact"
        />

        {/* CH7 - SYSTEM STATUS / BOTTOM */}
        <RackUnit
          imageUrl="https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/ch7%20rack%20bottom%20ui.png"
          linkUrl="/status"
          label="CH7 - System Status"
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
}

function RackUnit({ imageUrl, linkUrl, label, showWaveform = false, waveformColor = '#00ffff' }: RackUnitProps) {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        margin: 0,
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
            width: '30%',
            height: '40%',
            top: '30%',
            left: '35%',
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
          const img = e.currentTarget.previousElementSibling?.previousElementSibling as HTMLElement
          if (img) {
            img.style.filter = 'brightness(1.1) saturate(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.previousElementSibling?.previousElementSibling as HTMLElement
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
