/**
 * SVG Waveform Component (Framework-agnostic inline version)
 * For use in Hono JSX
 */

export interface WaveformProps {
  color?: string;
  amplitude?: number;
  frequency?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export function Waveform({
  color = '#c8ff41',
  amplitude = 0.3,
  frequency = 2,
  width = 200,
  height = 60,
  strokeWidth = 2,
}: WaveformProps) {
  // Generate static waveform path
  const points: string[] = [];
  const segments = 50;
  
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const t = (i / segments) * Math.PI * 2 * frequency;
    const y = Math.sin(t) * amplitude * (height / 2) + (height / 2);
    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  
  const pathData = points.join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      class="waveform"
      style="display: block;"
    >
      {/* Background grid */}
      <defs>
        <pattern
          id={`grid-${Date.now()}`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="currentColor"
            stroke-width="0.5"
            opacity="0.1"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#grid-${Date.now()})`} />
      
      {/* Waveform trace */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
        style={`filter: drop-shadow(0 0 4px ${color}); animation: waveform-pulse 2s ease-in-out infinite;`}
      />
    </svg>
  );
}
