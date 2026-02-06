/**
 * THE 202nd LAW: THE PROTECTIVE PANE
 * 
 * Machined Window Glass Overlay Component
 * Creates skeuomorphic depth with SVG gradient and grain texture
 * 
 * Usage:
 *   <div className="rack-window-container">
 *     <video src="..." />
 *     <GlassOverlay />
 *   </div>
 */

export function GlassOverlay() {
  return (
    <svg 
      className="rack-window-glass"
      viewBox="0 0 800 400" 
      xmlns="http://www.w3.org/2000/svg" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Main glass glare gradient - simulates studio overhead lighting */}
        <linearGradient id="glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="30%" stopColor="white" stopOpacity="0.02" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Fractal noise for "lived-in digital" grain (201st LAW) */}
        <filter id="glass-grain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            result="noise" 
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" in2="noise" mode="soft-light" />
        </filter>
      </defs>

      {/* Main glass pane with glare and grain */}
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#glass-glare)" 
        filter="url(#glass-grain)" 
      />
      
      {/* Top-edge highlight: bezel reflection */}
      <line 
        x1="0" 
        y1="1" 
        x2="100%" 
        y2="1" 
        stroke="white" 
        strokeOpacity="0.15" 
        strokeWidth="2" 
      />
    </svg>
  )
}
