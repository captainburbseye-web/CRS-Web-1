/**
 * CRS SIGNAGE STREET - CONTROLLER
 * 
 * Peak Hours Optimization:
 * - Weekdays: 15:00-18:30 (high window occupancy)
 * - Weekends: 11:00-16:00 (longest dwell)
 * 
 * Timing Strategy:
 * - 6-12s holds per frame
 * - 2s slow fades between frames
 * - Rotate content every 2-3 minutes
 * - Station ID rotates every 10s
 * 
 * Target: Truck Record Store & Mostro Coffee House patrons
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    STATION_ID_INTERVAL: 10000, // 10 seconds per station ID
    TIMEZONE: 'Europe/London',
    PEAK_WEEKDAY_START: 15, // 15:00
    PEAK_WEEKDAY_END: 18.5, // 18:30
    PEAK_WEEKEND_START: 11, // 11:00
    PEAK_WEEKEND_END: 16, // 16:00
    PREFERS_REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  // State
  let currentFrameIndex = 0;
  let currentStationIndex = 0;
  let frameTransitionTimer = null;
  let stationRotationTimer = null;
  let peakHoursCheckInterval = null;

  // Elements
  const framesContainer = document.getElementById('signageFrames');
  const stationIDMinimal = document.getElementById('stationIDMinimal');
  const frames = framesContainer ? Array.from(framesContainer.querySelectorAll('.signage-frame')) : [];
  const stationBadges = stationIDMinimal ? Array.from(stationIDMinimal.querySelectorAll('.station-badge')) : [];

  /**
   * Check if current time is peak window hours
   */
  function isPeakHours() {
    const now = new Date();
    const ukTime = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE }));
    const hour = ukTime.getHours();
    const minutes = ukTime.getMinutes();
    const decimalHour = hour + (minutes / 60);
    const dayOfWeek = ukTime.getDay(); // 0=Sunday, 6=Saturday

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      // Weekend: 11:00-16:00
      return decimalHour >= CONFIG.PEAK_WEEKEND_START && decimalHour < CONFIG.PEAK_WEEKEND_END;
    } else {
      // Weekday: 15:00-18:30
      return decimalHour >= CONFIG.PEAK_WEEKDAY_START && decimalHour < CONFIG.PEAK_WEEKDAY_END;
    }
  }

  /**
   * Log current peak hours status
   */
  function logPeakStatus() {
    const isPeak = isPeakHours();
    const now = new Date();
    const ukTime = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE }));
    const hour = ukTime.getHours();
    const minutes = ukTime.getMinutes();
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][ukTime.getDay()];

    console.log(
      `[SignageStreet] ${dayName} ${hour}:${minutes.toString().padStart(2, '0')} UK - ` +
      `${isPeak ? '🎯 PEAK HOURS (high dwell time)' : '⏸️  Off-peak'}`
    );
  }

  /**
   * Initialize signage controller
   */
  function init() {
    console.log('[SignageStreet] Initializing minimalist signage for Truck/Mostro audience...');
    
    if (frames.length === 0) {
      console.error('[SignageStreet] No frames found!');
      return;
    }

    // Log peak hours status
    logPeakStatus();
    
    // Check peak hours every 5 minutes
    peakHoursCheckInterval = setInterval(logPeakStatus, 300000);

    // Start frame transitions
    startFrameLoop();

    // Start station ID rotation
    startStationIDRotation();

    // Handle page visibility (pause when hidden)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    console.log(`[SignageStreet] Ready: ${frames.length} frames, ${stationBadges.length} station IDs`);
    console.log('[SignageStreet] Design: Minimalist, slow fades, curiosity-driven');
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

    // Log frame transition
    const frameType = frame.dataset.type || 'unknown';
    console.log(`[SignageStreet] Frame ${index + 1}/${frames.length}: ${frameType}`);

    // Reset progress bar animation
    const progressFill = frame.querySelector('.progress-fill');
    if (progressFill) {
      const duration = parseInt(frame.dataset.duration) || 10000;
      progressFill.style.animation = 'none';
      // Force reflow
      void progressFill.offsetWidth;
      progressFill.style.animation = `progress-fill ${duration}ms linear forwards`;
    }
  }

  /**
   * Schedule next frame transition
   */
  function scheduleNextFrame() {
    if (frameTransitionTimer) {
      clearTimeout(frameTransitionTimer);
    }

    const currentFrame = frames[currentFrameIndex];
    const duration = parseInt(currentFrame.dataset.duration) || 10000;

    frameTransitionTimer = setTimeout(() => {
      const nextIndex = (currentFrameIndex + 1) % frames.length;
      showFrame(nextIndex);
      scheduleNextFrame();
    }, duration);
  }

  /**
   * Start station ID rotation
   */
  function startStationIDRotation() {
    if (stationBadges.length === 0) return;

    // Show first badge
    showStationBadge(0);

    // Rotate every 10 seconds
    stationRotationTimer = setInterval(() => {
      const nextIndex = (currentStationIndex + 1) % stationBadges.length;
      showStationBadge(nextIndex);
    }, CONFIG.STATION_ID_INTERVAL);
  }

  /**
   * Show specific station badge
   */
  function showStationBadge(index) {
    if (index < 0 || index >= stationBadges.length) return;

    // Deactivate all badges
    stationBadges.forEach(badge => badge.classList.remove('active'));

    // Activate target badge
    const badge = stationBadges[index];
    badge.classList.add('active');
    currentStationIndex = index;
  }

  /**
   * Handle page visibility change (pause when hidden)
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      console.log('[SignageStreet] Page hidden - pausing timers');
      if (frameTransitionTimer) clearTimeout(frameTransitionTimer);
      if (stationRotationTimer) clearInterval(stationRotationTimer);
      if (peakHoursCheckInterval) clearInterval(peakHoursCheckInterval);
    } else {
      console.log('[SignageStreet] Page visible - resuming');
      scheduleNextFrame();
      startStationIDRotation();
      logPeakStatus();
      peakHoursCheckInterval = setInterval(logPeakStatus, 300000);
    }
  }

  /**
   * Cleanup on page unload
   */
  function cleanup() {
    if (frameTransitionTimer) clearTimeout(frameTransitionTimer);
    if (stationRotationTimer) clearInterval(stationRotationTimer);
    if (peakHoursCheckInterval) clearInterval(peakHoursCheckInterval);
    console.log('[SignageStreet] Cleanup complete');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on unload
  window.addEventListener('beforeunload', cleanup);

})();
