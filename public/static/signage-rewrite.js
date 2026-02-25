/**
 * CRS SIGNAGE REWRITE - CONTROLLER SCRIPT
 * 
 * Handles:
 * - Frame transitions (75-90 second loop)
 * - QR code generation (persistent bottom-right)
 * - VU meter animation (subtle)
 * - Progress bars
 * - Keyboard controls (Escape = reset)
 * 
 * Motion: Slow, mechanical, calm. No bounce or flash.
 */

(function() {
  'use strict';

  let currentFrame = 0;
  let frames = [];
  let frameInterval = null;
  let progressInterval = null;

  // Initialize on DOM ready
  function init() {
    // Get all frames
    frames = Array.from(document.querySelectorAll('.signage-frame'));
    
    if (frames.length === 0) {
      console.warn('[CRS Signage] No frames found');
      return;
    }

    console.log(`[CRS Signage] Initialized with ${frames.length} frames`);

    // Generate persistent QR code
    generateQRCode();

    // Start the carousel
    startCarousel();

    // Start VU meter animation
    animateVUMeters();

    // Keyboard controls
    setupKeyboardControls();
  }

  // Generate QR code (bottom-right, persistent)
  function generateQRCode() {
    const qrContainer = document.querySelector('.qr-code-persistent');
    if (!qrContainer) return;

    const qrUrl = qrContainer.dataset.url || 'https://cowleyroadstudios.com/book';

    // Clear existing QR
    qrContainer.innerHTML = '';

    // Generate new QR
    try {
      new QRCode(qrContainer, {
        text: qrUrl,
        width: 140,
        height: 140,
        colorDark: '#0E0E0E',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
      console.log('[CRS Signage] QR code generated:', qrUrl);
    } catch (err) {
      console.error('[CRS Signage] QR generation failed:', err);
    }
  }

  // Start the carousel loop
  function startCarousel() {
    // Show first frame
    showFrame(0);

    function nextFrame() {
      const current = frames[currentFrame];
      const duration = parseInt(current.dataset.duration, 10) || 8000;

      // Start progress bar
      startProgressBar(duration);

      // Schedule next frame
      frameInterval = setTimeout(() => {
        currentFrame = (currentFrame + 1) % frames.length;
        showFrame(currentFrame);
        nextFrame(); // Recursive loop
      }, duration);
    }

    nextFrame();
  }

  // Show a specific frame
  function showFrame(index) {
    frames.forEach((frame, i) => {
      if (i === index) {
        frame.classList.add('active');
      } else {
        frame.classList.remove('active');
      }
    });

    console.log(`[CRS Signage] Frame ${index + 1}/${frames.length} active`);
  }

  // Animate progress bar
  function startProgressBar(duration) {
    const activeFrame = frames[currentFrame];
    const progressFill = activeFrame.querySelector('.progress-fill');

    if (!progressFill) return;

    // Reset progress
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';

    // Force reflow
    void progressFill.offsetWidth;

    // Animate to 100%
    progressFill.style.transition = `width ${duration}ms linear`;
    progressFill.style.width = '100%';
  }

  // Animate VU meters (subtle pulse)
  function animateVUMeters() {
    const vuMeters = document.querySelectorAll('.vu-meter-minimal');

    vuMeters.forEach(meter => {
      const bars = meter.querySelectorAll('.vu-bar');

      bars.forEach((bar, i) => {
        // Stagger animation delays
        const delay = i * 120; // ms
        const speed = 800 + (i * 150); // Slower for higher bars

        setInterval(() => {
          const randomHeight = 10 + Math.random() * 70; // 10-80%
          bar.style.height = `${randomHeight}%`;
        }, speed);

        // Initial delay
        setTimeout(() => {
          bar.style.transition = 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, delay);
      });
    });
  }

  // Keyboard controls
  function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      // Escape = reset to frame 1
      if (e.key === 'Escape') {
        console.log('[CRS Signage] Reset to frame 1');
        clearTimeout(frameInterval);
        clearInterval(progressInterval);
        currentFrame = 0;
        showFrame(0);
        startCarousel();
      }

      // Arrow keys = manual navigation (optional)
      if (e.key === 'ArrowRight') {
        clearTimeout(frameInterval);
        currentFrame = (currentFrame + 1) % frames.length;
        showFrame(currentFrame);
      }

      if (e.key === 'ArrowLeft') {
        clearTimeout(frameInterval);
        currentFrame = (currentFrame - 1 + frames.length) % frames.length;
        showFrame(currentFrame);
      }
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
