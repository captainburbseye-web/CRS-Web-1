/**
 * SIGNAGE OVERLAY ENGINE
 * Rotates text overlays on signage video feed
 * Designed for Yodeck integration and kiosk mode
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    rotationInterval: 12000, // 12 seconds per overlay
    fadeTransitionMs: 1000,  // 1 second fade
    position: 'bottom',      // bottom, top, ticker
    fontSize: '32px',
    fontFamily: 'JetBrains Mono, monospace',
    colors: {
      text: '#FFFFFF',
      mustard: '#E3B04B',
      amber: '#FF9F1C',
      background: 'rgba(0, 0, 0, 0.6)'
    }
  };

  const OVERLAY_TEXTS = [
    "[ COWLEY ROAD STUDIOS · OXFORD ]",
    "[ WORKSHOP CAFÉ · EVENTS + TECH ]",
    "REHEARSALS — COWLEY ROAD — BOOK NOW",
    "REHEARSALS — CRICKET ROAD — PAY ONLINE",
    "CONTROL ROOM — DRY HIRE — 24HR ACCESS",
    "AV HIRE & REPAIR — INFO@CRSOXFORD.COM",
    "FOLLOW @COWLEYROADSTUDIOS",
    "@WORKSHOPCAFE.OX — LIVE EVENTS + SPECIALS",
    "CONTACT → INFO@CRSOXFORD.COM",
    "BOOK ONLINE → COWLEYROADSTUDIOS.COM",
    "→ SCAN TO BOOK YOUR SESSION",
    "→ NEED GEAR? ASK ABOUT AV SERVICES",
    "→ HOT DRINK + WARM SOUND — WORKSHOP CAFÉ",
    "→ DRY HIRE YOUR MIX ROOM — 2HR · 3HR · 4HR",
    "→ BRING YOUR OWN ENGINEER — CRICKET ROAD",
    "[ REHEARSAL ROOM — AVAILABLE NOW ]",
    "[ MIXING ROOM — BOOK ONLINE ]",
    "[ EVENTS THIS WEEK — WORKSHOP CAFÉ ]",
    "[ AV SUPPORT — INFO@CRSOXFORD.COM ]",
    "[ STUDIO 1 · STATUS: ACTIVE ]",
    "[ SYSTEM VIDEO MODE ]",
    "[ SQUARE VERIFIED BOOKING ONLY ]",
    "[ LIVE VENUE · CREATIVE SPACE ]"
  ];

  let currentIndex = 0;
  let overlayElement = null;
  let rotationInterval = null;

  /**
   * Initialize overlay container
   */
  function initOverlay() {
    // Create overlay container
    overlayElement = document.createElement('div');
    overlayElement.id = 'signage-overlay-ticker';
    overlayElement.style.cssText = `
      position: fixed;
      ${CONFIG.position === 'bottom' ? 'bottom: 40px;' : 'top: 40px;'}
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      font-family: ${CONFIG.fontFamily};
      font-size: ${CONFIG.fontSize};
      color: ${CONFIG.colors.text};
      background: ${CONFIG.colors.background};
      padding: 16px 32px;
      border-radius: 4px;
      text-align: center;
      max-width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.05em;
      opacity: 0;
      transition: opacity ${CONFIG.fadeTransitionMs}ms ease-in-out;
      font-weight: 600;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    `;

    document.body.appendChild(overlayElement);
  }

  /**
   * Update overlay text
   */
  function updateOverlay() {
    if (!overlayElement) return;

    const text = OVERLAY_TEXTS[currentIndex];
    
    // Fade out
    overlayElement.style.opacity = '0';

    // Update text after fade
    setTimeout(() => {
      overlayElement.textContent = text;
      // Fade in
      overlayElement.style.opacity = '1';
    }, CONFIG.fadeTransitionMs / 2);

    // Advance index
    currentIndex = (currentIndex + 1) % OVERLAY_TEXTS.length;
  }

  /**
   * Start rotation
   */
  function startRotation() {
    updateOverlay(); // Show first text immediately
    rotationInterval = setInterval(updateOverlay, CONFIG.rotationInterval);
  }

  /**
   * Stop rotation
   */
  function stopRotation() {
    if (rotationInterval) {
      clearInterval(rotationInterval);
      rotationInterval = null;
    }
  }

  /**
   * Toggle overlay via query param
   */
  function checkQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('overlay') === 'off') {
      if (overlayElement) {
        overlayElement.style.display = 'none';
      }
      stopRotation();
    }
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initOverlay();
    checkQueryParams();
    startRotation();

    // Log for debugging
    console.log('[SIGNAGE OVERLAY] Engine initialized');
    console.log('[SIGNAGE OVERLAY] Rotation interval: ' + CONFIG.rotationInterval + 'ms');
    console.log('[SIGNAGE OVERLAY] Total overlays: ' + OVERLAY_TEXTS.length);
  }

  // Start initialization
  init();

  // Expose API for debugging/control
  window.SignageOverlay = {
    start: startRotation,
    stop: stopRotation,
    next: updateOverlay,
    config: CONFIG,
    texts: OVERLAY_TEXTS
  };
})();
