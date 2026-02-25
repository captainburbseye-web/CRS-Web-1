/**
 * VU Meter Scroll-Reactive Animation
 * Needle moves based on scroll position or audio input
 */

(function() {
  'use strict';

  class VUMeter {
    constructor(element) {
      this.element = element;
      this.needle = element.querySelector('.vu-meter-needle');
      this.mode = element.dataset.mode || 'scroll'; // 'scroll' or 'audio'
      this.min = parseFloat(element.dataset.min || '-45');
      this.max = parseFloat(element.dataset.max || '45');
      this.smoothing = 0.15;
      this.currentRotation = this.min;
      this.targetRotation = this.min;
      
      this.init();
    }

    init() {
      if (this.mode === 'scroll') {
        this.initScrollMode();
      } else if (this.mode === 'audio') {
        this.initAudioMode();
      }
      
      this.animate();
    }

    initScrollMode() {
      window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const clampedPercent = Math.max(0, Math.min(1, scrollPercent));
        this.targetRotation = this.min + (this.max - this.min) * clampedPercent;
      });
    }

    initAudioMode() {
      // Future: Web Audio API integration for real audio reactivity
      console.log('Audio mode VU meter initialized');
    }

    animate() {
      // Smooth interpolation
      this.currentRotation += (this.targetRotation - this.currentRotation) * this.smoothing;
      
      if (this.needle) {
        this.needle.style.transform = `rotate(${this.currentRotation}deg)`;
      }
      
      requestAnimationFrame(() => this.animate());
    }

    setRotation(degrees) {
      this.targetRotation = Math.max(this.min, Math.min(this.max, degrees));
    }
  }

  /**
   * Initialize all VU meters on the page
   */
  function initVUMeters() {
    const meters = document.querySelectorAll('.vu-meter');
    const instances = [];
    
    meters.forEach(meter => {
      instances.push(new VUMeter(meter));
    });
    
    return instances;
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVUMeters);
  } else {
    initVUMeters();
  }

  // Expose API
  window.CRSVUMeter = {
    init: initVUMeters,
    VUMeter: VUMeter
  };
})();
