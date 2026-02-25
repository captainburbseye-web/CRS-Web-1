/**
 * CRS SIGNAGE V4 — FRAME CONTROLLER
 *
 * Features:
 * - Smooth 1.4s cross-fade transitions
 * - Live clock in status bar
 * - Frame indicator dots
 * - Keyboard navigation (dev mode)
 * - Auto-pause when tab hidden
 * - Text entrance animations reset on each frame
 */

(function () {
  'use strict';

  // ─── STATE ────────────────────────────────────────────────────────────────
  let currentFrame = 0;
  let frameTimeout = null;
  let clockInterval = null;

  const frames = document.querySelectorAll('.signage-frame');
  const dots   = document.querySelectorAll('.frame-dot');
  const totalFrames = frames.length;

  // ─── CLOCK ────────────────────────────────────────────────────────────────
  function updateClock() {
    const el = document.getElementById('status-clock');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }

  // ─── FRAME TRANSITION ─────────────────────────────────────────────────────
  function showFrame(index) {
    // Deactivate all frames
    frames.forEach((f) => f.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));

    // Activate target frame
    const frame = frames[index];
    frame.classList.add('active');

    // Update indicator dot
    if (dots[index]) dots[index].classList.add('active');

    // Reset & restart progress bar
    const fill = frame.querySelector('.progress-fill');
    if (fill) {
      const duration = parseInt(frame.dataset.duration) || 8000;
      fill.style.setProperty('--frame-duration', `${duration}ms`);
      fill.style.animation = 'none';
      // Force reflow
      void fill.offsetWidth;
      fill.style.animation = `progress-advance ${duration}ms linear`;
    }

    // Re-trigger text entrance animations by cloning animated elements
    const animated = frame.querySelectorAll(
      '.frame-eyebrow, .frame-title, .frame-divider, .frame-body, ' +
      '.price-tags, .vu-meters, .qr-section, .cafe-badge, ' +
      '.opening-frame .frame-subtitle, .opening-frame .tagline, .heritage-badge'
    );
    animated.forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  }

  // ─── SCHEDULER ────────────────────────────────────────────────────────────
  function scheduleNext() {
    const frame = frames[currentFrame];
    const duration = parseInt(frame.dataset.duration) || 8000;

    frameTimeout = setTimeout(() => {
      currentFrame = (currentFrame + 1) % totalFrames;
      showFrame(currentFrame);
      scheduleNext();
    }, duration);
  }

  // ─── KEYBOARD CONTROLS (DEV) ──────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      clearTimeout(frameTimeout);
      currentFrame = (currentFrame + 1) % totalFrames;
      showFrame(currentFrame);
      scheduleNext();
    } else if (e.key === 'ArrowLeft') {
      clearTimeout(frameTimeout);
      currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
      showFrame(currentFrame);
      scheduleNext();
    } else if (e.key === 'r' || e.key === 'R') {
      clearTimeout(frameTimeout);
      currentFrame = 0;
      showFrame(0);
      scheduleNext();
    }
  });

  // ─── VISIBILITY HANDLING ──────────────────────────────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(frameTimeout);
      clearInterval(clockInterval);
    } else {
      updateClock();
      clockInterval = setInterval(updateClock, 1000);
      scheduleNext();
    }
  });

  // ─── INIT ─────────────────────────────────────────────────────────────────
  function init() {
    if (totalFrames === 0) {
      console.error('[SignageV4] No frames found');
      return;
    }

    // Start clock
    updateClock();
    clockInterval = setInterval(updateClock, 1000);

    // Show first frame
    showFrame(0);
    scheduleNext();

    console.log(`[SignageV4] Running — ${totalFrames} frames`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
