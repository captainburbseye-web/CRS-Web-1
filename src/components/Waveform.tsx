/**
 * SVG Waveform Component
 * The living pulse of the audio rack - replaces heavy video assets
 * 
 * THE 208th LAW: "A knob tells you what you are doing; a waveform tells you 
 *                 what is happening. If the signal doesn't move, the machine 
 *                 is off. Give the user a pulse, and they will stay to watch 
 *                 the heart beat."
 * 
 * Performance: <1KB | No load penalty | Infinitely scalable
 */

interface WaveformProps {
  channel?: string
  amplitude?: number
  frequency?: number
  color?: string
  style?: 'oscilloscope' | 'spectrum' | 'pulse'
}

export const Waveform = ({ 
  channel = '1', 
  amplitude = 1,
  frequency = 1,
  color,
  style = 'oscilloscope' 
}: WaveformProps) => {
  
  // Channel-specific colors (matches neon system)
  const channelColors: Record<string, string> = {
    '1': 'var(--neon-orange)',
    '2': 'var(--neon-orange)',
    '3': 'var(--neon-magenta)',
    '4': 'var(--clay)', // Nature Distilled override
    '5': 'var(--neon-amber)',
    '6': 'var(--neon-white)',
    '7': 'var(--neon-green)'
  }
  
  const strokeColor = color || channelColors[channel] || 'var(--neon-cyan)'
  
  // Waveform path generators
  const oscilloscopePath = () => {
    // Sharp, digital oscilloscope reading
    const segments = 20
    const width = 200
    const centerY = 30
    const maxAmplitude = 25 * amplitude
    
    let path = `M0,${centerY}`
    
    for (let i = 1; i <= segments; i++) {
      const x = (width / segments) * i
      const variance = Math.sin((i / segments) * Math.PI * 4 * frequency) * maxAmplitude
      const y = centerY + variance
      const control = i % 2 === 0 ? 5 : -5
      
      path += ` Q${x - 5},${y + control} ${x},${y}`
    }
    
    return path
  }
  
  const spectrumPath = () => {
    // Vertical bars like a spectrum analyzer
    const bars = 20
    const width = 200
    const barWidth = width / bars
    const maxHeight = 50
    
    let path = ''
    
    for (let i = 0; i < bars; i++) {
      const x = i * barWidth
      const height = Math.random() * maxHeight * amplitude
      const y = 60 - height
      
      path += `M${x + 2},60 L${x + 2},${y} `
    }
    
    return path
  }
  
  const pulsePath = () => {
    // Heartbeat-style pulse
    return `M0,30 L20,30 L30,10 L40,50 L50,30 L200,30`
  }
  
  const getPath = () => {
    switch (style) {
      case 'spectrum': return spectrumPath()
      case 'pulse': return pulsePath()
      default: return oscilloscopePath()
    }
  }
  
  return (
    <svg 
      viewBox="0 0 200 60" 
      xmlns="http://www.w3.org/2000/svg" 
      class="waveform-svg"
      aria-label={`Channel ${channel} signal waveform`}
      role="img"
    >
      <defs>
        {/* Glow filter for phosphor screen effect */}
        <filter id={`waveform-glow-${channel}`}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Grid overlay for technical aesthetic */}
        <pattern id={`waveform-grid-${channel}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
        </pattern>
      </defs>
      
      {/* Background grid */}
      <rect width="200" height="60" fill={`url(#waveform-grid-${channel})`} opacity="0.3"/>
      
      {/* Center reference line */}
      <line 
        x1="0" 
        y1="30" 
        x2="200" 
        y2="30" 
        stroke="rgba(255,255,255,0.1)" 
        stroke-width="1"
        stroke-dasharray="2,2"
      />
      
      {/* Waveform path */}
      <path 
        d={getPath()}
        fill="none" 
        stroke={strokeColor}
        stroke-width="2" 
        filter={`url(#waveform-glow-${channel})`}
        class={`waveform-path waveform-${style}`}
        data-channel={channel}
      />
      
      {/* Scan line effect for CRT aesthetic */}
      <line 
        x1="0" 
        y1="0" 
        x2="0" 
        y2="60" 
        stroke="rgba(255,255,255,0.3)" 
        stroke-width="1"
        class="waveform-scanline"
      />
    </svg>
  )
}
