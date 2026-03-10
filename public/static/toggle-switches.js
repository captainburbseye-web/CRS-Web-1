/**
 * Toggle Switches JavaScript
 * Handles state management and persistence
 */

(function() {
  'use strict';

  class ToggleSwitchManager {
    constructor() {
      this.switches = new Map();
      this.initialize();
    }

    initialize() {
      // Find all toggle switches
      document.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach(input => {
        const switchId = input.id || input.dataset.switch;
        if (!switchId) return;

        // Restore saved state from localStorage
        const savedState = localStorage.getItem(`toggle-${switchId}`);
        if (savedState !== null) {
          input.checked = savedState === 'true';
        }

        // Add change listener
        input.addEventListener('change', (e) => {
          this.handleToggle(switchId, e.target.checked);
        });

        // Store reference
        this.switches.set(switchId, input);

        // Trigger initial state event
        if (input.checked) {
          this.handleToggle(switchId, true, true);
        }
      });
    }

    handleToggle(switchId, isOn, skipEvent = false) {
      // Save state to localStorage
      localStorage.setItem(`toggle-${switchId}`, isOn);

      // Dispatch custom event for other scripts to listen to
      if (!skipEvent) {
        window.dispatchEvent(new CustomEvent('toggle-change', {
          detail: { switchId, isOn }
        }));
      }

      console.log(`[Toggle] ${switchId}: ${isOn ? 'ON' : 'OFF'}`);
    }

    // Public API
    getState(switchId) {
      const input = this.switches.get(switchId);
      return input ? input.checked : null;
    }

    setState(switchId, isOn) {
      const input = this.switches.get(switchId);
      if (input) {
        input.checked = isOn;
        this.handleToggle(switchId, isOn);
      }
    }

    getAllStates() {
      const states = {};
      this.switches.forEach((input, switchId) => {
        states[switchId] = input.checked;
      });
      return states;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    window.toggleSwitchManager = new ToggleSwitchManager();
  }

  // Example usage helper
  window.createToggleSwitch = function(options = {}) {
    const {
      id = 'toggle-' + Date.now(),
      label = 'Toggle',
      checked = false,
      variant = '', // '', 'amber', 'red'
      onChange = null
    } = options;

    const container = document.createElement('div');
    container.className = 'toggle-switch-container';
    container.innerHTML = `
      <label class="toggle-switch ${variant ? 'variant-' + variant : ''}">
        <input type="checkbox" id="${id}" data-switch="${id}" ${checked ? 'checked' : ''}>
        <span class="toggle-switch-track"></span>
        <span class="toggle-switch-knob"></span>
      </label>
      <span class="toggle-switch-label">${label}</span>
    `;

    if (onChange) {
      const input = container.querySelector('input');
      input.addEventListener('change', (e) => onChange(e.target.checked));
    }

    return container;
  };

})();
