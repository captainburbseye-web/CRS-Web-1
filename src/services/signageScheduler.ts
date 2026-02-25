/**
 * CRS SIGNAGE SCHEDULER
 * 
 * Automated time-based route selection, day/night mode switching,
 * and micro-refresh management.
 * 
 * Usage:
 * - Call getActiveRoute() to determine which signage to show
 * - Call getCurrentMode() to get day/night/dusk mode
 * - Call shouldRefresh() to check if micro-refresh is due
 */

export interface ScheduleResult {
  route: string;
  mode: 'day' | 'dusk' | 'night';
  isAudioInterlude: boolean;
  nextChange: Date;
  config: any;
}

// Inline config (will be replaced with KV in Phase 2)
const signageConfig = {
  version: "1.0.0",
  routes: {
    ambient: "/signage-enhanced",
    parallax: "/signagesignal",
    audioReactive: "/signage-enhanced?mode=audio"
  },
  schedule: {
    "monday-thursday": {
      "07:00-11:00": "ambient",
      "11:00-16:00": "parallax",
      "16:00-22:30": "ambient",
      "22:30-07:00": "ambient-night"
    },
    "friday-saturday": {
      "07:00-12:00": "ambient",
      "12:00-18:00": "parallax",
      "18:00-23:30": "ambient",
      "23:30-07:00": "ambient-night"
    },
    "sunday": {
      "09:00-18:00": "ambient",
      "18:00-22:00": "parallax",
      "22:00-09:00": "ambient-night"
    }
  },
  audioReactiveInterludes: [
    { time: "13:00", duration: 10 },
    { time: "17:00", duration: 10 },
    { time: "20:00", duration: 10 }
  ],
  dayNightModes: {
    day: {
      start: "07:00",
      end: "18:00",
      textBrightness: 1.15,
      ledIntensity: 1.0,
      qrBorder: "2px"
    },
    dusk: {
      start: "18:00",
      end: "22:30",
      textBrightness: 1.0,
      ledIntensity: 0.8,
      warmthBoost: 1.1
    },
    night: {
      start: "22:30",
      end: "07:00",
      textBrightness: 0.85,
      ledIntensity: 0.6,
      overlays: "minimal"
    }
  },
  microRefresh: {
    enabled: true,
    intervalMinutes: 15
  },
  healthCheck: {
    enabled: true,
    intervalMinutes: 5,
    endpoint: "/api/health"
  }
};

const pricingConfig = {
  version: "1.0.0",
  lastUpdated: "2026-02-25",
  currency: "GBP",
  services: {
    rehearsal: {
      cowleyRoad: {
        name: "Cowley Road Rehearsal Room",
        location: "118 Cowley Road, Oxford",
        rates: { "2hours": 45, "3hours": 60, "4hours": 65 }
      }
    }
  }
};

const eventsConfig = {
  version: "1.0.0",
  lastUpdated: "2026-02-25T00:00:00Z",
  events: []
};

const offersConfig = {
  version: "1.0.0",
  active: [],
  counters: {}
};

/**
 * Get current day of week (0 = Sunday, 1 = Monday, etc.)
 */
function getDayOfWeek(): number {
  const now = new Date();
  // Convert to Europe/London timezone
  const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  return londonTime.getDay();
}

/**
 * Get current time as HH:MM string in Europe/London
 */
function getCurrentTime(): string {
  const now = new Date();
  const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  const hours = londonTime.getHours().toString().padStart(2, '0');
  const minutes = londonTime.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Parse time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if current time is within a time range
 */
function isInTimeRange(start: string, end: string, current: string): boolean {
  const currentMinutes = timeToMinutes(current);
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  // Handle overnight ranges (e.g., 22:30-07:00)
  if (endMinutes < startMinutes) {
    return currentMinutes >= startMinutes || currentMinutes < endMinutes;
  }

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Get schedule key for current day
 */
function getScheduleKey(): keyof typeof signageConfig.schedule {
  const day = getDayOfWeek();

  // Sunday = 0, Monday = 1, ..., Saturday = 6
  if (day === 0) {
    return 'sunday';
  } else if (day >= 1 && day <= 4) {
    return 'monday-thursday';
  } else {
    return 'friday-saturday';
  }
}

/**
 * Check if currently in an audio-reactive interlude
 */
function isAudioInterludeActive(): boolean {
  const currentTime = getCurrentTime();
  const currentMinutes = timeToMinutes(currentTime);

  for (const interlude of signageConfig.audioReactiveInterludes) {
    const interludeMinutes = timeToMinutes(interlude.time);
    const endMinutes = interludeMinutes + interlude.duration;

    if (currentMinutes >= interludeMinutes && currentMinutes < endMinutes) {
      return true;
    }
  }

  return false;
}

/**
 * Get active route based on schedule
 */
export function getActiveRoute(): string {
  // Check if in audio interlude first
  if (isAudioInterludeActive()) {
    return signageConfig.routes.audioReactive;
  }

  const scheduleKey = getScheduleKey();
  const schedule = signageConfig.schedule[scheduleKey];
  const currentTime = getCurrentTime();

  // Find matching time slot
  for (const [timeRange, routeKey] of Object.entries(schedule)) {
    const [start, end] = timeRange.split('-');

    if (isInTimeRange(start, end, currentTime)) {
      // Map route key to actual route
      const routeMap: Record<string, string> = {
        'ambient': signageConfig.routes.ambient,
        'ambient-night': signageConfig.routes.ambient + '?mode=night',
        'parallax': signageConfig.routes.parallax,
      };

      return routeMap[routeKey] || signageConfig.routes.ambient;
    }
  }

  // Default fallback
  return signageConfig.routes.ambient;
}

/**
 * Get current day/night mode
 */
export function getCurrentMode(): 'day' | 'dusk' | 'night' {
  const currentTime = getCurrentTime();
  const modes = signageConfig.dayNightModes;

  if (isInTimeRange(modes.day.start, modes.day.end, currentTime)) {
    return 'day';
  } else if (isInTimeRange(modes.dusk.start, modes.dusk.end, currentTime)) {
    return 'dusk';
  } else {
    return 'night';
  }
}

/**
 * Get full schedule result
 */
export function getScheduleResult(): ScheduleResult {
  const route = getActiveRoute();
  const mode = getCurrentMode();
  const isAudioInterlude = isAudioInterludeActive();
  const config = signageConfig.dayNightModes[mode];

  // Calculate next change time (simplified - next hour)
  const now = new Date();
  const nextChange = new Date(now);
  nextChange.setHours(nextChange.getHours() + 1, 0, 0, 0);

  return {
    route,
    mode,
    isAudioInterlude,
    nextChange,
    config,
  };
}

/**
 * Check if micro-refresh is due
 */
export function shouldRefresh(): boolean {
  if (!signageConfig.microRefresh.enabled) {
    return false;
  }

  const now = new Date();
  const minutes = now.getMinutes();
  const interval = signageConfig.microRefresh.intervalMinutes;

  // Refresh every 15 minutes (at :00, :15, :30, :45)
  return minutes % interval === 0;
}

/**
 * Get pricing data
 */
export function getPricing() {
  return pricingConfig;
}

/**
 * Get events data
 */
export function getEvents() {
  return eventsConfig;
}

/**
 * Get offers data
 */
export function getOffers() {
  return offersConfig;
}

/**
 * Health check function
 */
export function healthCheck() {
  try {
    const schedule = getScheduleResult();
    const pricing = getPricing();
    const events = getEvents();
    const offers = getOffers();

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      schedule: {
        route: schedule.route,
        mode: schedule.mode,
        isAudioInterlude: schedule.isAudioInterlude,
      },
      configs: {
        pricing: pricing.version,
        events: events.version,
        offers: offers.version,
      },
    };
  } catch (error) {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
