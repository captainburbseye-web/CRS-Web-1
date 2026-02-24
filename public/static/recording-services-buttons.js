/**
 * RECORDING SERVICES DOUBLE RACK - Interactive Button System
 * Cowley Road Studios
 * Handles click sounds, animations, and analytics
 */

(function() {
  'use strict';

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecordingButtons);
  } else {
    initRecordingButtons();
  }

  function initRecordingButtons() {
    const hotspots = document.querySelectorAll('.recording-hotspot');
    
    if (hotspots.length === 0) {
      console.log('⚡ Recording Services: No hotspots found on this page');
      return;
    }

    console.log(`⚡ Recording Services: Initializing ${hotspots.length} booking buttons`);

    // Add click handlers
    hotspots.forEach(hotspot => {
      // Click sound (optional - can add later)
      hotspot.addEventListener('click', handleButtonClick);
      
      // Keyboard support
      hotspot.addEventListener('keydown', handleKeyboardActivation);
      
      // Touch feedback for mobile
      hotspot.addEventListener('touchstart', handleTouchStart, { passive: true });
      hotspot.addEventListener('touchend', handleTouchEnd, { passive: true });
    });

    console.log('✅ Recording Services: All booking buttons initialized');
  }

  function handleButtonClick(event) {
    const button = event.currentTarget;
    const location = button.dataset.location;
    const service = button.dataset.service;
    const href = button.getAttribute('href');

    console.log(`📞 Booking clicked: ${location} - ${service}`);
    
    // Visual feedback
    addClickAnimation(button);
    
    // Analytics tracking (if available)
    if (typeof gtag === 'function') {
      gtag('event', 'recording_booking_click', {
        'event_category': 'booking',
        'event_label': `${location}_${service}`,
        'value': location === 'cowley' ? 1 : 2
      });
    }
    
    // Optional: Play click sound
    // playClickSound();
    
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
    const button = event.currentTarget;
    button.style.opacity = '0.9';
  }

  function handleTouchEnd(event) {
    const button = event.currentTarget;
    setTimeout(() => {
      button.style.opacity = '';
    }, 200);
  }

  function addClickAnimation(button) {
    button.classList.add('button-clicked');
    setTimeout(() => {
      button.classList.remove('button-clicked');
    }, 300);
  }

  // Optional: Click sound function (uncomment if you add audio file)
  /*
  let clickSound = null;
  
  function playClickSound() {
    if (!clickSound) {
      clickSound = new Audio('/static/sounds/button-click.mp3');
      clickSound.volume = 0.3;
    }
    
    // Clone and play to allow overlapping sounds
    const sound = clickSound.cloneNode();
    sound.play().catch(err => {
      console.log('Could not play sound:', err);
    });
  }
  */

  // Service availability checking (future enhancement)
  function checkServiceAvailability(location, service) {
    // This would connect to Square API to show real-time availability
    console.log(`Checking availability for ${location} - ${service}`);
    // Implementation would go here
  }

  // Export for external use if needed
  if (typeof window !== 'undefined') {
    window.RecordingServicesButtons = {
      init: initRecordingButtons,
      checkAvailability: checkServiceAvailability
    };
  }
})();
