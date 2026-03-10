/**
 * Button Sound Effects & Enhanced Interactions
 * Adds tactile audio feedback to all interactive buttons
 */

(function() {
  'use strict';

  // Audio context for button sounds
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let clickSoundLoaded = false;
  let clickSoundBuffer = null;

  /**
   * Generate synthetic click sound (no external file needed)
   */
  function generateClickSound() {
    const duration = 0.1;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 30);
      const frequency = 800 * (1 - t * 5);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * decay * 0.3;
    }
    
    return buffer;
  }

  /**
   * Play button click sound
   */
  function playClickSound() {
    if (!clickSoundBuffer) {
      clickSoundBuffer = generateClickSound();
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = clickSoundBuffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0);
  }

  /**
   * Add ripple effect on click
   */
  function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      left: ${x}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  /**
   * Add haptic feedback for mobile devices
   */
  function triggerHaptic() {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }

  /**
   * Initialize button enhancements
   */
  function initButtonEnhancements() {
    // Select all interactive buttons
    const buttons = document.querySelectorAll(`
      .rack-button-enhanced,
      .booking-hotspot,
      .welcome-button,
      .crs-button,
      button:not([disabled]),
      a.button
    `);

    buttons.forEach(button => {
      // Add click sound
      button.addEventListener('click', function(e) {
        // Don't play sound for disabled buttons
        if (button.disabled || button.classList.contains('disabled')) {
          return;
        }
        
        // Resume audio context if suspended (Chrome autoplay policy)
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        
        playClickSound();
        triggerHaptic();
        createRipple(e);
      });

      // Add keyboard accessibility
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });

      // Ensure proper ARIA attributes
      if (!button.hasAttribute('aria-label') && !button.hasAttribute('aria-labelledby')) {
        const text = button.textContent.trim() || button.getAttribute('title');
        if (text) {
          button.setAttribute('aria-label', text);
        }
      }

      // Make sure button is keyboard focusable
      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', '0');
      }
    });
  }

  /**
   * Add CSS for ripple animation
   */
  function injectRippleStyles() {
    if (document.getElementById('ripple-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectRippleStyles();
      initButtonEnhancements();
    });
  } else {
    injectRippleStyles();
    initButtonEnhancements();
  }

  // Re-initialize on dynamic content changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        initButtonEnhancements();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Global API for manual sound triggering
  window.CRSButtons = {
    playClick: playClickSound,
    enableSound: () => audioContext.resume(),
    disableSound: () => audioContext.suspend()
  };
})();
