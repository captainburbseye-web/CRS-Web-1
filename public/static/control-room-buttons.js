/**
 * Control Room Booking Buttons - Interactive Behavior
 * Adds sound effects, click feedback, and booking flow
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    soundEnabled: true,
    clickSound: '/static/sounds/button-click.mp3', // Optional
    hoverSound: '/static/sounds/button-hover.mp3', // Optional
    bookingUrls: {
      cowley: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services',
      cricket: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services'
    }
  };
  
  /**
   * Play sound effect (if available)
   */
  function playSound(soundUrl) {
    if (!CONFIG.soundEnabled) return;
    
    try {
      const audio = new Audio(soundUrl);
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Silently fail if sound can't play
      });
    } catch (err) {
      // Sound not available, continue silently
    }
  }
  
  /**
   * Add tactile feedback to button
   */
  function addTactileFeedback(button) {
    // Vibrate on mobile (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Visual feedback
    button.style.transition = 'transform 0.1s ease-out';
  }
  
  /**
   * Track booking click event
   */
  function trackBookingClick(location) {
    // Analytics tracking (if needed)
    if (window.gtag) {
      window.gtag('event', 'booking_button_click', {
        'event_category': 'Control Room',
        'event_label': location,
        'value': 1
      });
    }
    
    console.log(`📅 Booking initiated: ${location} Control Room`);
  }
  
  /**
   * Handle button click
   */
  function handleButtonClick(event) {
    const button = event.currentTarget;
    const location = button.dataset.location;
    
    // Play click sound
    playSound(CONFIG.clickSound);
    
    // Add tactile feedback
    addTactileFeedback(button);
    
    // Track analytics
    trackBookingClick(location);
    
    // Disable button temporarily to prevent double-clicks
    button.disabled = true;
    
    // Navigate to booking page
    const url = CONFIG.bookingUrls[location];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    // Re-enable button after delay
    setTimeout(() => {
      button.disabled = false;
    }, 1000);
  }
  
  /**
   * Handle button hover
   */
  function handleButtonHover(event) {
    const button = event.currentTarget;
    
    // Play hover sound (optional)
    // playSound(CONFIG.hoverSound);
    
    // Update LED indicator
    const location = button.dataset.location;
    const led = document.querySelector(`.led-${location}`);
    if (led) {
      led.style.animationDuration = '0.5s';
    }
  }
  
  /**
   * Handle button unhover
   */
  function handleButtonUnhover(event) {
    const button = event.currentTarget;
    const location = button.dataset.location;
    const led = document.querySelector(`.led-${location}`);
    if (led) {
      led.style.animationDuration = '2s';
    }
  }
  
  /**
   * Update LED status indicators
   */
  function updateLEDStatus() {
    // Check availability status (could be connected to real-time API)
    const statusLED = document.querySelector('.led-status');
    if (statusLED) {
      // For now, always show as available (green)
      statusLED.classList.remove('led-red', 'led-amber');
      statusLED.classList.add('led-green');
    }
  }
  
  /**
   * Initialize control room buttons
   */
  function init() {
    // Find all booking buttons
    const buttons = document.querySelectorAll('.booking-button');
    
    if (!buttons.length) {
      return;
    }
    
    // Add event listeners
    buttons.forEach(button => {
      // Click event
      button.addEventListener('click', handleButtonClick);
      
      // Hover events
      button.addEventListener('mouseenter', handleButtonHover);
      button.addEventListener('mouseleave', handleButtonUnhover);
      
      // Touch events for mobile
      button.addEventListener('touchstart', () => {
        button.classList.add('touch-active');
        addTactileFeedback(button);
      });
      
      button.addEventListener('touchend', () => {
        button.classList.remove('touch-active');
      });
      
      // Keyboard accessibility
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
    
    // Update LED status
    updateLEDStatus();
    
    // Update status periodically (every 30 seconds)
    setInterval(updateLEDStatus, 30000);
    
    console.log('🎛️ Control Room buttons initialized');
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose API for external control
  window.ControlRoomButtons = {
    updateStatus: updateLEDStatus,
    setBookingUrl: (location, url) => {
      CONFIG.bookingUrls[location] = url;
    },
    enableSound: () => {
      CONFIG.soundEnabled = true;
    },
    disableSound: () => {
      CONFIG.soundEnabled = false;
    }
  };
  
})();
