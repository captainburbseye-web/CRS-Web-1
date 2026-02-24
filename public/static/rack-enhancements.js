/**
 * RACK INTERACTIVE ENHANCEMENTS
 * Cowley Road Studios
 * Lightweight vanilla JS for enhanced UX
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🎛️ Initializing rack enhancements...');
    
    // 1. Smooth scroll for anchor links
    initSmoothScroll();
    
    // 2. Click sound effects (optional)
    initClickSounds();
    
    // 3. Button press effects
    initButtonEffects();
    
    // 4. Analytics tracking
    initAnalytics();
    
    console.log('✅ Rack enhancements ready');
  }

  /**
   * Smooth scroll for anchor links (header navigation)
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page jump
        history.pushState(null, '', href);
        
        // Track navigation
        trackEvent('navigation', 'smooth_scroll', href);
      });
    });
  }

  /**
   * Click sound effects (lightweight, optional)
   * Only loads if user interacts
   */
  let clickSound = null;
  let soundEnabled = false;
  
  function initClickSounds() {
    // Check if user wants sound (localStorage)
    soundEnabled = localStorage.getItem('crs-sound-enabled') === 'true';
    
    // Listen for first user interaction to enable sound
    document.addEventListener('click', function enableSound(e) {
      // Only for booking buttons
      if (e.target.closest('.header-button, .recording-panel, .booking-hotspot, .rack-module-graphic a')) {
        playClickSound();
      }
    }, { once: false });
  }

  function playClickSound() {
    if (!soundEnabled) return;
    
    // Lazy load sound on first use
    if (!clickSound) {
      clickSound = new Audio();
      clickSound.src = 'data:audio/wav;base64,UklGRhIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQA='; // Minimal click
      clickSound.volume = 0.3;
    }
    
    // Clone and play (allows overlapping clicks)
    const sound = clickSound.cloneNode();
    sound.play().catch(() => {
      // Silently fail if audio blocked
    });
  }

  /**
   * Enhanced button press effects
   */
  function initButtonEffects() {
    const buttons = document.querySelectorAll(
      '.header-button, .recording-panel, .booking-hotspot, .rack-module-graphic a'
    );
    
    buttons.forEach(button => {
      // Add press class on mousedown/touchstart
      button.addEventListener('mousedown', () => {
        button.classList.add('button-pressed');
      });
      
      button.addEventListener('touchstart', () => {
        button.classList.add('button-pressed');
      }, { passive: true });
      
      // Remove press class on mouseup/touchend
      const removePress = () => {
        button.classList.remove('button-pressed');
      };
      
      button.addEventListener('mouseup', removePress);
      button.addEventListener('mouseleave', removePress);
      button.addEventListener('touchend', removePress);
      button.addEventListener('touchcancel', removePress);
      
      // Haptic feedback on mobile
      button.addEventListener('touchstart', () => {
        if ('vibrate' in navigator) {
          navigator.vibrate(10); // Very brief haptic
        }
      }, { passive: true });
    });
  }

  /**
   * Analytics tracking helper
   */
  function trackEvent(category, action, label) {
    // Google Analytics (if available)
    if (typeof gtag === 'function') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    
    // Console log for debugging
    console.log(`📊 Event: ${category} > ${action} > ${label}`);
  }

  /**
   * Initialize analytics for booking buttons
   */
  function initAnalytics() {
    // Track header button clicks
    document.querySelectorAll('.header-button').forEach(button => {
      button.addEventListener('click', function() {
        const label = this.getAttribute('aria-label') || 'unknown';
        trackEvent('header_navigation', 'click', label);
      });
    });
    
    // Track recording panel clicks
    document.querySelectorAll('.recording-panel').forEach(panel => {
      panel.addEventListener('click', function() {
        const location = this.dataset.location;
        trackEvent('recording_booking', 'click', location);
      });
    });
    
    // Track control room button clicks
    document.querySelectorAll('.booking-hotspot').forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        const location = this.dataset.location;
        trackEvent('control_room_booking', 'click', location);
      });
    });
  }

  /**
   * Prefers-reduced-motion support
   */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }

  /**
   * Export functions for external use
   */
  if (typeof window !== 'undefined') {
    window.CRSEnhancements = {
      enableSound: () => {
        soundEnabled = true;
        localStorage.setItem('crs-sound-enabled', 'true');
      },
      disableSound: () => {
        soundEnabled = false;
        localStorage.setItem('crs-sound-enabled', 'false');
      },
      trackEvent: trackEvent
    };
  }
})();
