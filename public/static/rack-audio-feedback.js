/**
 * Rack Button Audio Feedback - Fallout Vault‑Tec Style
 * Terminal click sounds for tactile interaction
 */

(function() {
  'use strict';

  // Audio feedback system
  class RackAudioFeedback {
    constructor() {
      this.sounds = {
        click: null,
        hover: null
      };
      
      this.enabled = true;
      this.volume = 0.3; // 30% volume - subtle
      
      // Check user preference
      this.checkPreferences();
      
      // Preload sounds
      this.preloadSounds();
      
      // Initialize listeners
      this.initializeListeners();
    }

    checkPreferences() {
      // Respect reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.enabled = false;
        return;
      }

      // Check localStorage preference
      const audioPreference = localStorage.getItem('rack-audio-enabled');
      if (audioPreference !== null) {
        this.enabled = audioPreference === 'true';
      }
    }

    preloadSounds() {
      if (!this.enabled) return;

      // Create audio instances
      this.sounds.click = new Audio('/static/sounds/click.mp3');
      this.sounds.click.volume = this.volume;
      this.sounds.click.preload = 'auto';

      // Optional hover sound (lighter click)
      // this.sounds.hover = new Audio('/static/sounds/hover.mp3');
      // this.sounds.hover.volume = this.volume * 0.5;
      // this.sounds.hover.preload = 'auto';

      // Handle audio loading errors gracefully
      this.sounds.click.addEventListener('error', () => {
        console.info('Click sound not available - continuing without audio feedback');
        this.enabled = false;
      });
    }

    playSound(soundName) {
      if (!this.enabled || !this.sounds[soundName]) return;

      try {
        // Clone and play to allow rapid clicks
        const sound = this.sounds[soundName].cloneNode();
        sound.volume = this.volume;
        
        // Play promise handling for modern browsers
        const playPromise = sound.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play policy blocked - this is fine
            console.debug('Audio playback prevented:', error.message);
          });
        }
      } catch (error) {
        console.debug('Audio playback error:', error.message);
      }
    }

    initializeListeners() {
      // Target all interactive rack elements
      const selectors = [
        '.recording-cowley-panel',
        '.recording-cricket-panel',
        '.rehearsal-cowley-panel',
        '.rehearsal-cricket-panel',
        '.welcome-button',
        '.booking-hotspot',
        '.booking-button',
        '.crs-header-logo-hotspot'
      ];

      const elements = document.querySelectorAll(selectors.join(', '));

      elements.forEach(element => {
        // Click/tap feedback
        element.addEventListener('click', (e) => {
          this.playSound('click');
          this.addClickEffect(element);
        }, { passive: true });

        // Keyboard activation (Enter/Space)
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.playSound('click');
            this.addClickEffect(element);
            
            // Trigger click after brief delay
            setTimeout(() => {
              element.click();
            }, 50);
          }
        });

        // Optional: Hover sound (disabled by default)
        // element.addEventListener('mouseenter', () => {
        //   this.playSound('hover');
        // }, { passive: true });
      });

      // Add audio toggle control (console/debug)
      window.toggleRackAudio = () => {
        this.enabled = !this.enabled;
        localStorage.setItem('rack-audio-enabled', this.enabled);
        console.info(`Rack audio feedback: ${this.enabled ? 'enabled' : 'disabled'}`);
        return this.enabled;
      };

      window.setRackAudioVolume = (vol) => {
        this.volume = Math.max(0, Math.min(1, vol));
        console.info(`Rack audio volume set to: ${Math.round(this.volume * 100)}%`);
      };
    }

    addClickEffect(element) {
      // Visual ripple effect (Vault-Tec style)
      const ripple = document.createElement('span');
      ripple.className = 'rack-button-ripple';
      
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      
      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      // Trigger animation
      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(2)';
        ripple.style.opacity = '0';
      });

      // Cleanup
      setTimeout(() => ripple.remove(), 600);
    }
  }

  // Ripple effect CSS (injected dynamically)
  const rippleStyles = document.createElement('style');
  rippleStyles.textContent = `
    .rack-button-ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212, 160, 23, 0.4) 0%, transparent 70%);
      pointer-events: none;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform, opacity;
    }

    @media (prefers-reduced-motion: reduce) {
      .rack-button-ripple {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(rippleStyles);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new RackAudioFeedback();
    });
  } else {
    new RackAudioFeedback();
  }

  // Re-initialize when new content is loaded (for SPA behavior)
  window.addEventListener('rack-content-loaded', () => {
    new RackAudioFeedback();
  });

})();
