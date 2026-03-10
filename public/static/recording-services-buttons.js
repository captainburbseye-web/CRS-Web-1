/**
 * RECORDING SERVICES DOUBLE RACK - Simple Panel System
 * Cowley Road Studios
 * Handles click tracking and analytics for 2 recording panels
 */

(function() {
  'use strict';

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecordingPanels);
  } else {
    initRecordingPanels();
  }

  function initRecordingPanels() {
    const panels = document.querySelectorAll('.recording-panel');
    
    if (panels.length === 0) {
      console.log('⚡ Recording Services: No panels found on this page');
      return;
    }

    console.log(`⚡ Recording Services: Initializing ${panels.length} booking panels`);

    // Add click handlers
    panels.forEach(panel => {
      panel.addEventListener('click', handlePanelClick);
      panel.addEventListener('keydown', handleKeyboardActivation);
      
      // Touch feedback for mobile
      panel.addEventListener('touchstart', handleTouchStart, { passive: true });
      panel.addEventListener('touchend', handleTouchEnd, { passive: true });
    });

    console.log('✅ Recording Services: All booking panels initialized');
  }

  function handlePanelClick(event) {
    const panel = event.currentTarget;
    const location = panel.dataset.location;
    const href = panel.getAttribute('href');

    console.log(`📞 Recording booking clicked: ${location}`);
    
    // Analytics tracking (if available)
    if (typeof gtag === 'function') {
      gtag('event', 'recording_booking_click', {
        'event_category': 'booking',
        'event_label': `${location}_recording`,
        'value': location === 'cowley' ? 1 : 2
      });
    }
    
    // Optional: Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  function handleKeyboardActivation(event) {
    // Enter or Space activates the link
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  function handleTouchStart(event) {
    const panel = event.currentTarget;
    panel.style.opacity = '0.95';
  }

  function handleTouchEnd(event) {
    const panel = event.currentTarget;
    setTimeout(() => {
      panel.style.opacity = '';
    }, 200);
  }

  // Export for external use if needed
  if (typeof window !== 'undefined') {
    window.RecordingServicesPanels = {
      init: initRecordingPanels
    };
  }
})();
