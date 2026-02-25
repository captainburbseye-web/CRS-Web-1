/**
 * CRS SIGNAGE TIMELINE — Frame Sequence Controller
 * 
 * Total Loop: 96 seconds (8s infrastructure + 88s original)
 * Transitions: Fade only (2s crossfade)
 * Motion: Slow, mechanical, calm
 * 
 * Frame 0: OX4 Creative Infrastructure (NEW)
 * Frames 1-8: Original brand-compliant loop
 */

export interface SignageFrame {
  id: string;
  duration: number;      // Milliseconds
  title: string;
  subtitle?: string;
  body: string;
  color: string;         // CRS palette token
  warm: boolean;         // Warm/cool overlay
  vuMeter?: boolean;     // VU animation flag
  qrCode?: boolean;      // QR code visible flag
  background: string;    // Asset path
  infrastructure?: boolean;  // Infrastructure frame flag
  sequence?: Array<{         // Text sequence for infrastructure
    text: string;
    delay: number;
    duration: number;
    fontSize?: string;
    fontWeight?: number;
    opacity?: number;
    position?: string;
  }>;
}

/**
 * Design Tokens (Hard-coded)
 */
export const DESIGN_TOKENS = {
  // Base colors
  chassisBlack: '#0E0E0E',
  charcoalSlate: '#23272B',
  vegGreen: '#2E473B',
  nettleGreen: '#4F7942',
  billetMustard: '#C2A85A',
  
  // Signal LEDs (minimal use only)
  signalActive: '#39FF14',
  signalStandby: '#FFA500',
  
  // Text
  textPrimary: '#E5E5E5',
  textSubdued: '#B8B8B8',
  
  // Typography
  fontFamily: '"JetBrains Mono", monospace',
  
  // Timing
  fadeDuration: 2000,    // 2s fade
  qrPulse: 6000,         // 6s pulse cycle
} as const;

/**
 * Signage Frame Timeline
 * 
 * Total: 96 seconds (8 + 7 + 12 + 12 + 10 + 10 + 12 + 15 + 10)
 * Seamless loop: end state matches start state
 */
export const SIGNAGE_TIMELINE: SignageFrame[] = [
  // Frame 0 — OX4 Creative Infrastructure (8s) [NEW]
  {
    id: 'infrastructure',
    duration: 8000,
    title: '', // Handled by sequence
    body: '',  // Handled by sequence
    color: DESIGN_TOKENS.textPrimary,
    warm: false,
    background: '#000000', // Pure black (not #0E0E0E)
    infrastructure: true,
    sequence: [
      {
        text: "Oxford's music scene",
        delay: 0,
        duration: 2000,
        fontSize: '2.5rem',
        fontWeight: 300,
        opacity: 1,
      },
      {
        text: "We build the rooms",
        delay: 2000,
        duration: 2000,
        fontSize: '2.5rem',
        fontWeight: 300,
        opacity: 1,
      },
      {
        text: "OX4\nCreative Infrastructure",
        delay: 4000,
        duration: 2000,
        fontSize: '1rem',
        fontWeight: 300,
        opacity: 0.7,
        position: 'lower-third',
      },
    ],
  },
  
  // Frame 1 — Establishment (7s)
  {
    id: 'establishment',
    duration: 7000,
    title: 'COWLEY ROAD STUDIOS',
    subtitle: 'Oxford',
    body: 'Serious sound. Open doors.',
    color: DESIGN_TOKENS.billetMustard,
    warm: false,
    background: '/static/rack-images/welcome-rack-1920w.webp',
  },
  
  // Frame 2 — Positioning (12s)
  {
    id: 'positioning',
    duration: 12000,
    title: 'A creative grassroots infrastructure',
    subtitle: 'evolving in the heart of Oxford.',
    body: 'Built for:\n• Musicians\n• Engineers\n• Independent artists\n• Student bands\n\nRecording. Rehearsal. Live capture.\nCommunity space.',
    color: DESIGN_TOKENS.nettleGreen,
    warm: false,
    background: '/static/machined-assets/cowley-pods-rack.webp',
  },
  
  // Frame 3 — Recording Engine (12s)
  {
    id: 'recording-engine',
    duration: 12000,
    title: 'Professional recording rooms',
    subtitle: 'Acoustically treated · Precision monitoring',
    body: 'Full-band tracking\nSolo sessions\nMixing & production',
    color: DESIGN_TOKENS.billetMustard,
    warm: false,
    vuMeter: true,
    background: '/static/rack-images/recording-services-1920w.webp',
  },
  
  // Frame 4 — Rehearsal System (10s)
  {
    id: 'rehearsal-system',
    duration: 10000,
    title: 'Reliable rehearsal spaces',
    subtitle: 'Clear signal paths · Proper backline',
    body: 'Build your set.\nThen capture it properly.',
    color: DESIGN_TOKENS.nettleGreen,
    warm: false,
    background: '/static/rack-images/rehearsal-combi-1920w.webp',
  },
  
  // Frame 5 — Live Capture & Showcase (10s)
  {
    id: 'live-capture',
    duration: 10000,
    title: 'Filmed sessions',
    subtitle: 'Live capture · Grassroots showcases',
    body: 'From rehearsal room\nto live audience.',
    color: DESIGN_TOKENS.billetMustard,
    warm: false,
    background: '/static/machined-assets/cricket-control-room-optimized.webp',
  },
  
  // Frame 6 — Workshop Café Interface (12s)
  {
    id: 'workshop-cafe',
    duration: 12000,
    title: 'Workshop Café',
    subtitle: 'A front-of-house creative space',
    body: 'For talks, events, collaboration\nand coffee between sessions.',
    color: DESIGN_TOKENS.billetMustard,
    warm: true, // Warmth shift
    background: '/static/workshop-cafe-assets/logo-3d-render-dark.jpg',
  },
  
  // Frame 7 — Ecosystem (15s) [The Heart]
  {
    id: 'ecosystem',
    duration: 15000,
    title: "We're building a connected creative system",
    subtitle: '',
    body: '• Session musicians\n• Engineers\n• Student talent\n• Local circuits\n• Independent projects\n\nStructured. Independent. Sustainable.\nBuilt to support serious music at grassroots level.',
    color: DESIGN_TOKENS.nettleGreen,
    warm: false,
    background: '/static/machined-assets/cowley-rehearsal-optimized.webp',
  },
  
  // Frame 8 — Invitation (10s)
  {
    id: 'invitation',
    duration: 10000,
    title: 'Book rehearsal · Book recording',
    subtitle: 'Explore the space',
    body: 'crsoxford.com',
    color: DESIGN_TOKENS.billetMustard,
    warm: false,
    qrCode: true, // QR visible on Frame 8
    background: '/static/rack-images/control-room-1920w.webp',
  },
];

/**
 * Total loop duration in milliseconds
 */
export const TOTAL_LOOP_DURATION = SIGNAGE_TIMELINE.reduce(
  (sum, frame) => sum + frame.duration,
  0
); // 96,000ms = 96 seconds (8s infrastructure + 88s original)

/**
 * Day/Night Mode Tokens
 */
export const DAY_MODE = {
  textBrightness: 1.15,
  ledIntensity: 1.0,
  overlayOpacity: 0.85,
} as const;

export const NIGHT_MODE = {
  textBrightness: 0.9,
  ledIntensity: 0.6,
  overlayOpacity: 0.9,
  warmShift: 1.1, // Slightly more mustard
} as const;

/**
 * Determine if current time is day or night
 * Day: 06:00-20:00, Night: 20:00-06:00
 */
export function isNightMode(): boolean {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 20;
}

/**
 * Get current mode based on URL param or auto-detect
 */
export function getCurrentMode(searchParams?: URLSearchParams): 'day' | 'night' {
  if (searchParams) {
    const mode = searchParams.get('mode');
    if (mode === 'day' || mode === 'night') {
      return mode;
    }
  }
  return isNightMode() ? 'night' : 'day';
}
