/**
 * Interactive Switch Toggle Component
 * Hardware-style switches with state persistence
 */

(function() {
  'use strict';

  class RackSwitch {
    constructor(element) {
      this.element = element;
      this.state = element.dataset.state || 'off';
      this.storageKey = element.dataset.storageKey || null;
      this.onChange = null;
      
      this.init();
    }

    init() {
      // Restore state from localStorage
      if (this.storageKey) {
        const saved = localStorage.getItem(`switch_${this.storageKey}`);
        if (saved) {
          this.state = saved;
        }
      }
      
      this.updateUI();
      this.attachListeners();
    }

    attachListeners() {
      this.element.addEventListener('click', () => this.toggle());
      
      // Keyboard accessibility
      this.element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
      
      // Make focusable
      if (!this.element.hasAttribute('tabindex')) {
        this.element.setAttribute('tabindex', '0');
      }
      
      // ARIA attributes
      this.element.setAttribute('role', 'switch');
      this.element.setAttribute('aria-checked', this.state === 'on');
    }

    toggle() {
      this.state = this.state === 'on' ? 'off' : 'on';
      this.updateUI();
      this.saveState();
      this.triggerChange();
      this.playSound();
    }

    updateUI() {
      this.element.dataset.state = this.state;
      this.element.setAttribute('aria-checked', this.state === 'on');
      
      const toggle = this.element.querySelector('.toggle');
      if (toggle) {
        toggle.style.transform = this.state === 'on' ? 'translateX(20px)' : 'translateX(0)';
        toggle.style.background = this.state === 'on' ? '#00FF00' : '#FF0000';
      }
    }

    saveState() {
      if (this.storageKey) {
        localStorage.setItem(`switch_${this.storageKey}`, this.state);
      }
    }

    triggerChange() {
      if (typeof this.onChange === 'function') {
        this.onChange(this.state);
      }
      
      this.element.dispatchEvent(new CustomEvent('switchchange', {
        detail: { state: this.state },
        bubbles: true
      }));
    }

    playSound() {
      // Generate switch toggle sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = this.state === 'on' ? 600 : 400;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }

    setState(newState) {
      if (newState !== this.state) {
        this.state = newState;
        this.updateUI();
        this.saveState();
        this.triggerChange();
      }
    }

    getState() {
      return this.state;
    }
  }

  /**
   * Initialize all switches on the page
   */
  function initSwitches() {
    const switches = document.querySelectorAll('.rack-switch');
    const instances = new Map();
    
    switches.forEach(switchEl => {
      const instance = new RackSwitch(switchEl);
      const id = switchEl.id || switchEl.dataset.id;
      if (id) {
        instances.set(id, instance);
      }
    });
    
    return instances;
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitches);
  } else {
    initSwitches();
  }

  // Global API
  window.CRSSwitches = {
    init: initSwitches,
    RackSwitch: RackSwitch
  };
})();
