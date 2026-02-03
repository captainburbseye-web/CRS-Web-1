/**
 * CRS Booking Router v4.1
 * Central routing map for all booking flows
 * Maintains hardware-first UX with progressive enhancement fallback
 * 
 * Features:
 * - Anchor tag fallback for no-JS scenarios
 * - Click sound FX with graceful degradation
 * - Fire-red actuation state (200ms delay for visual feedback)
 * - Centralized routing map for easy platform migration
 */

const CRS_ROUTING_MAP = {
  'rehearsals-cowley': 'https://square.link/u/UQidDzE0?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=rehearsals_cowley',
  'rehearsals-cricket': 'https://square.link/u/WPqRFIGW?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=rehearsals_cricket',
  'control-room': 'https://square.link/u/bCOHXtdl?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=control_room',
  'av-services': 'https://square.link/u/bCOHXtdl?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=av_services',
  'workshop-cafe': 'https://square.link/u/UQidDzE0?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=workshop_cafe',
  'contact': '/contact',
}

/**
 * Initialize power-switch routing
 * Intercepts clicks on .power-switch buttons for hardware-authentic UX
 * Falls back to href if JS fails or is disabled
 */
function initPowerSwitches() {
  document.querySelectorAll('.power-switch').forEach(button => {
    button.addEventListener('click', function(e) {
      // Prevent immediate navigation (allow animation to play)
      e.preventDefault()
      
      // Get route key from button or parent anchor
      const routeKey = this.getAttribute('data-route')
      const parentLink = this.closest('a')?.href
      
      // Resolve final URL: use routing map if available, fall back to parent href
      let finalUrl = parentLink || CRS_ROUTING_MAP[routeKey] || CRS_ROUTING_MAP['contact']
      
      // Visual feedback: activate fire-red state
      this.classList.add('active')
      
      // Audio feedback: play switch click if available
      const sfx = document.getElementById('click-sfx')
      if (sfx) {
        sfx.currentTime = 0
        sfx.play().catch(() => {}) // Fail silently if audio blocked
      }
      
      // Relay delay for physical feel (200ms allows fire-red flash to register)
      setTimeout(() => {
        window.location.href = finalUrl
      }, 200)
    })
  })
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPowerSwitches)
} else {
  initPowerSwitches()
}

// Export for testing or manual invocation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CRS_ROUTING_MAP, initPowerSwitches }
}
