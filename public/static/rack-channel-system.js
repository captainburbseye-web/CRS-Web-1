/**
 * RACK CHANNEL SYSTEM - Interactive Logic
 * 
 * Handles:
 * - Channel switching (click/tap to activate different service)
 * - Keyboard navigation (Arrow keys, Home/End, Enter/Space)
 * - ARIA state management (aria-selected, aria-hidden, tabindex)
 * - Smooth transitions with power-on/power-down animations
 * - Focus management (move focus to panel content on activation)
 * - Horizontal scroll snapping on mobile
 * - Reduced motion support
 * 
 * Philosophy:
 * - Feels like operating hardware, not navigating a website
 * - Mechanical transitions (LED switch, panel fade)
 * - Single focus (only one channel active at a time)
 */

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the rack channel system
 * Called when DOM is ready
 */
function initRackChannelSystem() {
  const system = document.querySelector('[data-component="rack-channel-system"]');
  
  if (!system) {
    console.warn('Rack Channel System not found');
    return;
  }
  
  const channelButtons = system.querySelectorAll('.rack-channel-button');
  const panels = system.querySelectorAll('.rack-bay-panel');
  
  if (channelButtons.length === 0 || panels.length === 0) {
    console.warn('No channel buttons or panels found');
    return;
  }
  
  // Set up click handlers
  channelButtons.forEach(button => {
    button.addEventListener('click', handleChannelClick);
  });
  
  // Set up keyboard navigation
  const selector = system.querySelector('.rack-channel-selector');
  if (selector) {
    selector.addEventListener('keydown', handleKeyboardNavigation);
  }
  
  // Set up "View Details" button handlers (if any)
  panels.forEach(panel => {
    const detailsButtons = panel.querySelectorAll('[data-action="view-details"]');
    detailsButtons.forEach(btn => {
      btn.addEventListener('click', handleViewDetails);
    });
  });
  
  console.log(`✅ Rack Channel System initialized: ${channelButtons.length} channels`);
}

// ============================================
// CHANNEL SWITCHING
// ============================================

/**
 * Handle channel button click
 * @param {Event} e - Click event
 */
function handleChannelClick(e) {
  const button = e.currentTarget;
  const channelId = button.getAttribute('data-channel-id');
  
  if (!channelId) {
    console.warn('No channel ID found on button');
    return;
  }
  
  // If already active, do nothing (already selected)
  if (button.classList.contains('active')) {
    return;
  }
  
  activateChannel(channelId);
}

/**
 * Activate a specific channel (the core switching logic)
 * @param {string} channelId - ID of channel to activate
 */
function activateChannel(channelId) {
  const system = document.querySelector('[data-component="rack-channel-system"]');
  
  if (!system) return;
  
  // Find target button and main bay
  const targetButton = system.querySelector(`.rack-channel-button[data-channel-id="${channelId}"]`);
  const mainBay = system.querySelector('.rack-main-bay');
  
  if (!targetButton || !mainBay) {
    console.warn(`Channel not found: ${channelId}`);
    return;
  }
  
  // Get all buttons
  const allButtons = system.querySelectorAll('.rack-channel-button');
  
  // Deactivate all buttons
  allButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
    btn.setAttribute('tabindex', '-1');
    
    // Switch LED to inactive
    const led = btn.querySelector('.channel-led');
    if (led) {
      led.setAttribute('data-led-state', 'inactive');
    }
  });
  
  // Activate target button
  targetButton.classList.add('active');
  targetButton.setAttribute('aria-selected', 'true');
  targetButton.setAttribute('tabindex', '0');
  
  // Switch LED to active
  const targetLed = targetButton.querySelector('.channel-led');
  if (targetLed) {
    targetLed.setAttribute('data-led-state', 'active');
  }
  
  // Update main bay data attribute (for CSS transitions)
  mainBay.setAttribute('data-active-channel', channelId);
  
  // CRITICAL: Fetch and render new panel content dynamically
  // In SSR context, we trigger a page refresh with hash
  // JavaScript framework would handle this client-side
  // For now, we'll just scroll to top and let CSS handle visibility
  mainBay.scrollTop = 0;
  
  // Move focus to main bay for screen readers
  setTimeout(() => {
    const activePanel = mainBay.querySelector('.rack-bay-panel');
    if (activePanel) {
      activePanel.focus({ preventScroll: true });
    }
  }, 50);
  
  // Scroll button into view if needed (mobile horizontal scroll)
  scrollChannelIntoView(targetButton);
  
  // Update URL hash for shareable links
  if (history.replaceState) {
    history.replaceState(null, null, `#${channelId}`);
  }
  
  // Log for debugging
  console.log(`🎛️ Channel activated: ${channelId}`);
}

/**
 * Scroll channel button into view (for horizontal mobile scroll)
 * @param {HTMLElement} button - Button to scroll into view
 */
function scrollChannelIntoView(button) {
  const selector = button.closest('.rack-channel-selector');
  
  if (!selector) return;
  
  // Check if button is in view
  const buttonRect = button.getBoundingClientRect();
  const selectorRect = selector.getBoundingClientRect();
  
  const isInView = (
    buttonRect.left >= selectorRect.left &&
    buttonRect.right <= selectorRect.right
  );
  
  if (!isInView) {
    // Smooth scroll to button
    button.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

/**
 * Handle keyboard navigation for channel selector
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardNavigation(e) {
  const system = document.querySelector('[data-component="rack-channel-system"]');
  
  if (!system) return;
  
  const allButtons = Array.from(system.querySelectorAll('.rack-channel-button'));
  const activeButton = system.querySelector('.rack-channel-button.active');
  
  if (!activeButton) return;
  
  const currentIndex = allButtons.indexOf(activeButton);
  let targetIndex = currentIndex;
  
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      // Next channel
      e.preventDefault();
      targetIndex = (currentIndex + 1) % allButtons.length;
      break;
      
    case 'ArrowLeft':
    case 'ArrowUp':
      // Previous channel
      e.preventDefault();
      targetIndex = (currentIndex - 1 + allButtons.length) % allButtons.length;
      break;
      
    case 'Home':
      // First channel
      e.preventDefault();
      targetIndex = 0;
      break;
      
    case 'End':
      // Last channel
      e.preventDefault();
      targetIndex = allButtons.length - 1;
      break;
      
    case 'Enter':
    case ' ':
      // Activate current channel (redundant if already active, but good for consistency)
      e.preventDefault();
      const channelId = activeButton.getAttribute('data-channel-id');
      if (channelId) {
        activateChannel(channelId);
      }
      return;
      
    default:
      // Ignore other keys
      return;
  }
  
  // Activate target channel
  const targetButton = allButtons[targetIndex];
  if (targetButton) {
    const channelId = targetButton.getAttribute('data-channel-id');
    if (channelId) {
      activateChannel(channelId);
      
      // Move keyboard focus to new button
      targetButton.focus();
    }
  }
}

// ============================================
// VIEW DETAILS HANDLER
// ============================================

/**
 * Handle "View Details" button click
 * @param {Event} e - Click event
 */
function handleViewDetails(e) {
  e.preventDefault();
  
  const button = e.currentTarget;
  const channelId = button.getAttribute('data-channel-id');
  
  if (!channelId) {
    console.warn('No channel ID found on details button');
    return;
  }
  
  // For now, just log (in real implementation, could open a modal or navigate)
  console.log(`📋 View details requested for: ${channelId}`);
  
  // Example: Could trigger a modal, expand additional info, or navigate to detail page
  // showDetailsModal(channelId);
  // OR: window.location.href = `/services/${channelId}`;
  
  alert(`Full specifications for ${channelId} would be displayed here.\n\nIn production, this could:\n- Open a detailed modal\n- Navigate to a dedicated specs page\n- Expand additional info within the panel`);
}

// ============================================
// URL HASH SUPPORT (Optional Enhancement)
// ============================================

/**
 * Check URL hash on load and activate corresponding channel
 * Example: /rack-modular#recording-services
 */
function activateChannelFromHash() {
  const hash = window.location.hash.substring(1); // Remove #
  
  if (!hash) return;
  
  const system = document.querySelector('[data-component="rack-channel-system"]');
  
  if (!system) return;
  
  const targetButton = system.querySelector(`.rack-channel-button[data-channel-id="${hash}"]`);
  
  if (targetButton) {
    activateChannel(hash);
    console.log(`🔗 Activated channel from URL hash: ${hash}`);
  }
}

/**
 * Update URL hash when channel changes (optional, for shareable links)
 * @param {string} channelId - ID of active channel
 */
function updateUrlHash(channelId) {
  if (history.replaceState) {
    history.replaceState(null, null, `#${channelId}`);
  } else {
    window.location.hash = channelId;
  }
}

// ============================================
// REDUCED MOTION SUPPORT
// ============================================

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if reduced motion is preferred
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Disable animations if user prefers reduced motion
 */
function applyReducedMotionPreference() {
  if (prefersReducedMotion()) {
    const system = document.querySelector('[data-component="rack-channel-system"]');
    
    if (system) {
      system.setAttribute('data-reduced-motion', 'true');
      console.log('⚡ Reduced motion mode enabled');
    }
  }
}

// ============================================
// AUTO-INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyReducedMotionPreference();
    initRackChannelSystem();
    activateChannelFromHash();
  });
} else {
  // DOM already loaded
  applyReducedMotionPreference();
  initRackChannelSystem();
  activateChannelFromHash();
}

// Re-activate from hash on hash change (back/forward navigation)
window.addEventListener('hashchange', () => {
  activateChannelFromHash();
});

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initRackChannelSystem,
    activateChannel,
    handleKeyboardNavigation,
  };
}
