/**
 * CRS SIGNAGE FRAMES — Including Infrastructure Statement
 * 
 * Frame 0: OX4 Creative Infrastructure (NEW)
 * - 8 seconds
 * - Pure black field
 * - Maximum negative space
 * - No animation for first 3 seconds
 * - Subtle ambient drift after
 * 
 * Frames 1-8: Original 88s loop (unchanged)
 * 
 * Total: 96 seconds (8s + 88s)
 */

export const INFRASTRUCTURE_FRAME = {
  id: 'infrastructure',
  duration: 8000, // 8 seconds
  sequence: [
    {
      text: "Oxford's music scene",
      delay: 0,
      duration: 2000,
      fontSize: '2.5rem',
      fontWeight: 300,
      opacity: 1,
      stillness: true
    },
    {
      text: "We build the rooms",
      delay: 2000,
      duration: 2000,
      fontSize: '2.5rem',
      fontWeight: 300,
      opacity: 1,
      stillness: true
    },
    {
      text: "OX4\nCreative Infrastructure",
      delay: 4000,
      duration: 2000,
      fontSize: '1rem',
      fontWeight: 300,
      opacity: 0.7,
      position: 'lower-third',
      stillness: true
    },
    {
      // Ambient drift begins
      delay: 6000,
      duration: 2000,
      animation: 'ambient-drift'
    }
  ],
  background: '#000000', // Pure black (not #0E0E0E)
  noQR: true,
  noLED: true,
  noVU: true,
  noProgress: true,
  minimalist: true
};

export const FULL_SIGNAGE_TIMELINE = [
  INFRASTRUCTURE_FRAME,
  // ... then existing 8 frames (88s)
];

/**
 * Dual Mode Configuration
 * 
 * Mode A: Full loop (96s) — Weekdays 07:00-22:30
 * Mode B: Infrastructure only (8s loop) — Weekdays 22:30-07:00, Sundays
 */
export const SIGNAGE_MODES = {
  full: {
    frames: ['infrastructure', ...EXISTING_FRAMES],
    duration: 96000, // 96 seconds
    schedule: {
      'weekdays': '07:00-22:30',
      'saturday': '07:00-23:30'
    }
  },
  minimal: {
    frames: ['infrastructure'],
    duration: 8000, // 8 seconds (loops)
    schedule: {
      'weekdays': '22:30-07:00',
      'sunday': '00:00-23:59'
    }
  }
};

/**
 * Typography Specs (Infrastructure Frame)
 */
export const INFRASTRUCTURE_TYPOGRAPHY = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  primarySize: '2.5rem',      // "Oxford's music scene" / "We build the rooms"
  secondarySize: '1rem',      // "OX4 / Creative Infrastructure"
  fontWeight: 300,            // Light
  letterSpacing: '0.02em',
  lineHeight: 1.6,
  textAlign: 'center',
  color: '#E5E5E5',
  secondaryColor: 'rgba(229, 229, 229, 0.7)',
};

/**
 * Animation Rules (Infrastructure Frame)
 */
export const INFRASTRUCTURE_ANIMATION = {
  initialStillness: 3000,     // No motion for 3 seconds
  ambientDriftStart: 6000,    // Drift begins at 6s
  driftSpeed: 'very-slow',    // 120s cycle
  driftDistance: '±1px',      // Subtle
  fadeInDuration: 1000,       // 1s fade
  fadeOutDuration: 1000,      // 1s fade
};

/**
 * Behavioral Rules (Infrastructure Layer)
 */
export const INFRASTRUCTURE_RULES = {
  discipline: {
    calmCommunication: true,
    longTermThinking: true,
    noTrendChasing: true,
    noDesperateEnergy: true,
    consistentVisualLanguage: true
  },
  appearance: {
    website: {
      footer: "Cowley Road Studios\nOX4 Creative Infrastructure",
      position: 'center-bottom',
      fontSize: '0.875rem',
      color: 'var(--crs-text-dim)'
    },
    email: {
      signature: "Cowley Road Studios | OX4 Creative Infrastructure\n118 Cowley Road, Oxford OX4 1JE",
      format: 'plain-text'
    },
    press: {
      boilerplate: "Cowley Road Studios operates as OX4 Creative Infrastructure — building recording, rehearsal, and community spaces for Oxford's independent music scene.",
      tone: 'institutional'
    },
    social: {
      bio: "OX4 Creative Infrastructure\nRecording · Rehearsal · Community\n118 Cowley Road, Oxford",
      noEmoji: true
    }
  }
};

/**
 * Implementation Options
 */
export const IMPLEMENTATION_OPTIONS = {
  A: {
    name: 'Quiet Integration',
    description: 'Add as Frame 0 to existing loop (96s total)',
    deployment: 'immediate',
    rationale: 'Infrastructure doesn\'t announce itself. It just is.'
  },
  B: {
    name: 'Intentional Launch',
    description: 'Replace loop for 72 hours, then prepend as Frame 0',
    deployment: 'phased',
    rationale: 'Signals a shift. People notice.'
  },
  C: {
    name: 'Dual Mode',
    description: 'Full loop during day, infrastructure-only at night/Sundays',
    deployment: 'scheduled',
    rationale: 'Infrastructure speaks differently at different times.'
  }
};
