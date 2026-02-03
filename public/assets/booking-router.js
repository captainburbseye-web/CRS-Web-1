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

// v4.2: Commissioning Allocations Framework
// Operational services (Cricket Road — Live Now) + Commissioning phase (Cowley Road HQ — Pre-Build)
const CRS_ROUTING_MAP = {
  // --- OPERATIONAL SERVICES (Cricket Road — Live Now) ---
  'recording-live': 'https://square.link/u/bCOHXtdl?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=recording_live',
  'rehearsals-cricket': 'https://square.link/u/WPqRFIGW?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=rehearsals_cricket',
  'podcast-live': 'https://square.link/u/bCOHXtdl?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=podcast_live',
  
  // --- COMMISSIONING ALLOCATIONS (Cowley Road HQ — Pre-Build) ---
  'commission-studio': 'https://square.link/u/commission-link-1?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=commission_studio',
  'commission-podcast': 'https://square.link/u/commission-link-2?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=commission_podcast',
  'allocation-av': 'https://square.link/u/commission-link-3?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=allocation_av',
  
  // --- SYSTEM ROUTES ---
  'rack': '/rack',
  'workshop': '/workshop-cafe',
  'about': '/about',
  'contact': '/contact',
  
  // --- LEGACY ROUTES (Fallback for backward compatibility) ---
  'rehearsals-cowley': 'https://square.link/u/UQidDzE0?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=rehearsals_cowley',
  'control-room': 'https://square.link/u/bCOHXtdl?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=control_room',
  'av-services': 'https://square.link/u/bCOHXtdl?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=av_services',
  'workshop-cafe': 'https://square.link/u/UQidDzE0?utm_source=rack_ui&utm_medium=power_switch&utm_campaign=workshop_cafe',
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
