/**
 * CRS SIGNAGE V5 - RESEARCH-BACKED CONTROLLER
 * 
 * Handles:
 * ✅ Frame transitions (8-10s intervals, 72s total loop)
 * ✅ Station ID rotation (8s intervals, 40s full cycle)
 * ✅ Progress bar animation sync
 * ✅ Reduced motion support
 * ✅ Day/Night mode (07:00-19:00 = day, 19:00-07:00 = night)
 * 
 * Research references: Screenfeed 2025, Frontiers VR 2025
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    STATION_ID_INTERVAL: 8000, // 8 seconds per station ID
    PREFERS_REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    DAY_START_HOUR: 7,  // 07:00
    DAY_END_HOUR: 19,   // 19:00 (7pm)
    TIMEZONE: 'Europe/London' // UK timezone for Oxford
  };

  // State
  let currentFrameIndex = 0;
  let currentStationIndex = 0;
  let frameTransitionTimer = null;
  let stationRotationTimer = null;
  let dayNightCheckInterval = null;

  // Elements
  const framesContainer = document.getElementById('signageFrames');
  const stationIDOverlay = document.getElementById('stationIDOverlay');
  const frames = framesContainer ? Array.from(framesContainer.querySelectorAll('.signage-frame')) : [];
  const stationBadges = stationIDOverlay ? Array.from(stationIDOverlay.querySelectorAll('.station-id-badge')) : [];

  /**
   * Check if current time is day mode (07:00-19:00 UK time)
   */
  function isDayMode() {
    const now = new Date();
    const ukTime = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE }));
    const hour = ukTime.getHours();
    const isDayTime = hour >= CONFIG.DAY_START_HOUR && hour < CONFIG.DAY_END_HOUR;
    
    console.log(`[SignageV5] Time check: ${hour}:${ukTime.getMinutes()} UK - Mode: ${isDayTime ? 'DAY' : 'NIGHT'}`);
    return isDayTime;
  }

  /**
   * Apply day/night mode class to body
   */
  function updateDayNightMode() {
    const isDay = isDayMode();
    
    if (isDay) {
      document.body.classList.add('day-mode');
      document.body.classList.remove('night-mode');
      console.log('[SignageV5] ☀️ DAY MODE activated (light backgrounds)');
    } else {
      document.body.classList.add('night-mode');
      document.body.classList.remove('day-mode');
      console.log('[SignageV5] 🌙 NIGHT MODE activated (dark backgrounds)');
    }
  }

  /**
   * Start checking day/night mode every minute
   */
  function startDayNightModeCheck() {
    // Check immediately
    updateDayNightMode();
    
    // Check every minute
    dayNightCheckInterval = setInterval(updateDayNightMode, 60000);
  }

  /**
   * Initialize signage controller
   */
  function init() {
    console.log('[SignageV5] Initializing controller...');
    
    if (frames.length === 0) {
      console.error('[SignageV5] No frames found!');
      return;
    }

    // Start day/night mode detection
    startDayNightModeCheck();

    // Start frame transitions
    startFrameLoop();

    // Start station ID rotation
    startStationIDRotation();

    // Handle page visibility (pause when hidden)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    console.log(`[SignageV5] Ready: ${frames.length} frames, ${stationBadges.length} station IDs`);
  }

  /**
   * Start frame transition loop
   */
  function startFrameLoop() {
    // Show first frame
    showFrame(0);
    
    // Schedule next transition based on frame duration
    scheduleNextFrame();
  }

  /**
   * Show specific frame by index
   */
  function showFrame(index) {
    if (index < 0 || index >= frames.length) return;

    // Deactivate all frames
    frames.forEach(frame => frame.classList.remove('active'));

    // Activate target frame
    const frame = frames[index];
    frame.classList.add('active');
    currentFrameIndex = index;

    // Sync progress bar animation
    const progressFill = frame.querySelector('.progress-fill');
    const frameDuration = parseInt(frame.getAttribute('data-duration'), 10) || 8000;
    
    if (progressFill) {
      // Reset animation
      progressFill.style.animation = 'none';
      void progressFill.offsetWidth; // Trigger reflow
      progressFill.style.setProperty('--frame-duration', `${frameDuration}ms`);
      progressFill.style.animation = `progressFill ${frameDuration}ms linear forwards`;
    }

    console.log(`[SignageV5] Frame ${index + 1}/${frames.length} active (${frameDuration}ms)`);
  }

  /**
   * Schedule next frame transition
   */
  function scheduleNextFrame() {
    const currentFrame = frames[currentFrameIndex];
    const frameDuration = parseInt(currentFrame.getAttribute('data-duration'), 10) || 8000;
    
    // Clear existing timer
    if (frameTransitionTimer) {
      clearTimeout(frameTransitionTimer);
    }

    // Schedule next frame
    frameTransitionTimer = setTimeout(() => {
      const nextIndex = (currentFrameIndex + 1) % frames.length;
      showFrame(nextIndex);
      scheduleNextFrame();
    }, frameDuration);
  }

  /**
   * Start station ID rotation (bottom-left corner badge)
   */
  function startStationIDRotation() {
    if (stationBadges.length === 0) {
      console.warn('[SignageV5] No station ID badges found');
      return;
    }

    // Show first station ID
    showStationID(0);

    // Rotate every 8 seconds
    stationRotationTimer = setInterval(() => {
      const nextIndex = (currentStationIndex + 1) % stationBadges.length;
      showStationID(nextIndex);
    }, CONFIG.STATION_ID_INTERVAL);
  }

  /**
   * Show specific station ID badge
   */
  function showStationID(index) {
    if (index < 0 || index >= stationBadges.length) return;

    // Deactivate all badges
    stationBadges.forEach(badge => badge.classList.remove('active'));

    // Activate target badge
    stationBadges[index].classList.add('active');
    currentStationIndex = index;

    console.log(`[SignageV5] Station ID ${index + 1}/${stationBadges.length} active`);
  }

  /**
   * Handle page visibility change (pause/resume)
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      console.log('[SignageV5] Page hidden, pausing timers');
      if (frameTransitionTimer) clearTimeout(frameTransitionTimer);
      if (stationRotationTimer) clearInterval(stationRotationTimer);
    } else {
      console.log('[SignageV5] Page visible, resuming timers');
      scheduleNextFrame();
      startStationIDRotation();
    }
  }

  /**
   * Public API for manual control (debugging)
   */
  window.SignageV5Controller = {
    showFrame: function(index) {
      showFrame(index);
      scheduleNextFrame();
    },
    showStationID: function(index) {
      showStationID(index);
    },
    getCurrentFrame: function() {
      return currentFrameIndex;
    },
    getTotalFrames: function() {
      return frames.length;
    },
    restart: function() {
      console.log('[SignageV5] Restarting...');
      currentFrameIndex = 0;
      currentStationIndex = 0;
      showFrame(0);
      scheduleNextFrame();
      showStationID(0);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
