/**
 * CRS SIGNAGE V2 — Timeline Controller
 * 
 * Requirements:
 * - 96-second seamless loop (8s infrastructure + 88s original)
 * - Fade transitions only (2s)
 * - No scrollbars, no hover dependencies
 * - Works in Chrome kiosk, Yodeck, normal browsers
 * - QR code on Frame 9 only (Frame 8 in old numbering)
 * - VU meter animation on Frame 4 (Frame 3 in old numbering)
 * - Debug mode: ?debug=1 shows frame name + countdown
 * - Day/Night mode: auto-detect or ?mode=day|night
 * - Frame 0: OX4 Creative Infrastructure with sequenced text
 */

(function() {
  'use strict';

  // State
  let currentFrameIndex = 0;
  let frames = [];
  let frameTimeout = null;
  let vuInterval = null;
  let debugMode = false;
  let dayNightMode = 'day';

  // Initialize
  function init() {
    console.log('[CRS Signage V2] Initializing...');

    // Get all frames
    frames = Array.from(document.querySelectorAll('.signage-frame'));
    
    if (frames.length === 0) {
      console.error('[CRS Signage V2] No frames found');
      return;
    }

    console.log(`[CRS Signage V2] Loaded ${frames.length} frames`);

    // Check debug mode
    const params = new URLSearchParams(window.location.search);
    debugMode = params.get('debug') === '1';
    
    // Check day/night mode
    const modeParam = params.get('mode');
    if (modeParam === 'day' || modeParam === 'night') {
      dayNightMode = modeParam;
    } else {
      dayNightMode = isNightTime() ? 'night' : 'day';
    }
    
    document.querySelector('.signage-container')?.setAttribute('data-mode', dayNightMode);
    console.log(`[CRS Signage V2] Mode: ${dayNightMode}`);

    // Generate QR code
    generateQRCode();

    // Start timeline
    startTimeline();

    // Start VU meter animation
    animateVUMeters();

    // Debug overlay
    if (debugMode) {
      createDebugOverlay();
    }
  }

  // Determine if current time is night (20:00-06:00)
  function isNightTime() {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 20;
  }

  // Generate QR code (visible on Frame 8 only)
  function generateQRCode() {
    const qrCodeElement = document.querySelector('.qr-code');
    if (!qrCodeElement) return;

    const qrUrl = 'https://cowleyroadstudios.com/book';

    try {
      // Clear existing QR
      qrCodeElement.innerHTML = '';

      // Generate new QR
      new QRCode(qrCodeElement, {
        text: qrUrl,
        width: 140,
        height: 140,
        colorDark: '#0E0E0E',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });

      console.log('[CRS Signage V2] QR code generated');
    } catch (err) {
      console.error('[CRS Signage V2] QR generation failed:', err);
    }
  }

  // Start timeline loop
  function startTimeline() {
    showFrame(0);
    scheduleNextFrame();
  }

  // Show specific frame
  function showFrame(index) {
    currentFrameIndex = index;
    const frame = frames[index];
    
    if (!frame) return;

    // Update active state
    frames.forEach((f, i) => {
      if (i === index) {
        f.classList.add('active');
      } else {
        f.classList.remove('active');
      }
    });

    // Handle infrastructure frame (Frame 0) with text sequence
    if (index === 0 && frame.dataset.frameId === 'infrastructure') {
      animateInfrastructureFrame(frame);
    }

    // Show/hide QR code (Frame 9 only = Frame 8 in old numbering)
    const qrContainer = document.querySelector('.qr-container');
    if (qrContainer) {
      // Frame 9 is the last frame (index 8 with infrastructure frame)
      if (index === 8) { // Frame 9 (0-indexed)
        qrContainer.classList.add('visible');
      } else {
        qrContainer.classList.remove('visible');
      }
    }

    // Update debug overlay
    if (debugMode) {
      updateDebugOverlay(frame);
    }

    console.log(`[CRS Signage V2] Frame ${index + 1}/${frames.length} active: ${frame.dataset.frameId || 'unknown'}`);
  }

  // Schedule next frame
  function scheduleNextFrame() {
    const frame = frames[currentFrameIndex];
    if (!frame) return;

    const duration = parseInt(frame.dataset.duration, 10) || 8000;

    frameTimeout = setTimeout(() => {
      const nextIndex = (currentFrameIndex + 1) % frames.length;
      showFrame(nextIndex);
      scheduleNextFrame();
    }, duration);
  }

  // Animate VU meters (Frame 3 only)
  function animateVUMeters() {
    const vuMeters = document.querySelectorAll('.vu-meter');
    
    vuMeters.forEach(meter => {
      const bars = meter.querySelectorAll('.vu-bar');
      
      bars.forEach((bar, i) => {
        const baseHeight = 60; // px
        const updateSpeed = 400 + (i * 100); // Stagger
        
        setInterval(() => {
          // Gentle, low amplitude (30-70% of base height)
          const randomHeight = baseHeight * (0.3 + Math.random() * 0.4);
          bar.style.height = `${randomHeight}px`;
        }, updateSpeed);
      });
    });
  }

  // Animate infrastructure frame text sequence
  function animateInfrastructureFrame(frame) {
    // Text sequence defined in SIGNAGE_TIMELINE
    const sequence = [
      {
        text: "Oxford's music scene",
        delay: 0,
        duration: 2000,
      },
      {
        text: "We build the rooms",
        delay: 2000,
        duration: 2000,
      },
      {
        text: "OX4\nCreative Infrastructure",
        delay: 4000,
        duration: 2000,
        className: 'lower-third',
      }
    ];

    const contentDiv = frame.querySelector('.frame-content');
    if (!contentDiv) return;

    // Clear existing content
    contentDiv.innerHTML = '';

    // Create text elements for each sequence item
    sequence.forEach((item, i) => {
      const textElement = document.createElement('div');
      textElement.className = `infrastructure-text ${item.className || ''}`;
      textElement.style.opacity = '0';
      textElement.textContent = item.text;
      contentDiv.appendChild(textElement);

      // Fade in at specified delay
      setTimeout(() => {
        textElement.style.transition = 'opacity 1s ease-in-out';
        textElement.style.opacity = '1';
      }, item.delay);

      // Fade out before next (except last)
      if (i < sequence.length - 1) {
        setTimeout(() => {
          textElement.style.opacity = '0';
        }, item.delay + item.duration - 500);
      }
    });

    // Start ambient drift after 6 seconds
    setTimeout(() => {
      frame.classList.add('drift');
    }, 6000);
  }

  // Create debug overlay
  function createDebugOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'debug-overlay';
    overlay.innerHTML = `
      <div class="debug-frame-name">FRAME: <span id="debug-frame">1</span></div>
      <div class="debug-countdown">TIME: <span id="debug-time">0</span>s</div>
    `;
    document.body.appendChild(overlay);
  }

  // Update debug overlay
  function updateDebugOverlay(frame) {
    const frameNameEl = document.getElementById('debug-frame');
    const timeEl = document.getElementById('debug-time');
    
    if (!frameNameEl || !timeEl) return;

    const frameName = frame.dataset.frameId || 'unknown';
    const duration = parseInt(frame.dataset.duration, 10) || 8000;
    
    frameNameEl.textContent = frameName.toUpperCase();
    
    // Countdown timer
    let remaining = duration / 1000;
    timeEl.textContent = remaining.toFixed(1);
    
    const countdownInterval = setInterval(() => {
      remaining -= 0.1;
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        return;
      }
      timeEl.textContent = remaining.toFixed(1);
    }, 100);
  }

  // Keyboard controls (optional)
  document.addEventListener('keydown', (e) => {
    // Escape = reset to frame 1
    if (e.key === 'Escape') {
      clearTimeout(frameTimeout);
      showFrame(0);
      scheduleNextFrame();
    }

    // Arrow keys = manual navigation (pauses auto-advance)
    if (e.key === 'ArrowRight') {
      clearTimeout(frameTimeout);
      const nextIndex = (currentFrameIndex + 1) % frames.length;
      showFrame(nextIndex);
    }

    if (e.key === 'ArrowLeft') {
      clearTimeout(frameTimeout);
      const prevIndex = (currentFrameIndex - 1 + frames.length) % frames.length;
      showFrame(prevIndex);
    }

    // 'R' = resume auto-advance
    if (e.key === 'r' || e.key === 'R') {
      clearTimeout(frameTimeout);
      scheduleNextFrame();
    }
  });

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
