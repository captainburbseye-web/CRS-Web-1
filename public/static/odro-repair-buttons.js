/**
 * ODRO Repair Panel - Interactive Buttons & Terms Modal
 */

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initODRORepair);
  } else {
    initODRORepair();
  }
  
  function initODRORepair() {
    // Support both old class selector and new data-attribute selector
    const termsButton = document.querySelector('[data-action="open-modal"][data-target="odro-terms-modal"], .odro-button-terms, .odro-hotspot-left');
    const modal = document.getElementById('odro-terms-modal');
    const closeButton = document.querySelector('.odro-terms-close');
    const overlay = document.querySelector('.odro-terms-overlay');
    
    if (!termsButton || !modal) return;
    
    // Open modal when Terms button is clicked
    termsButton.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
    
    // Close modal handlers
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });
    
    // Open modal function
    function openModal() {
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      
      // Focus the close button for accessibility
      setTimeout(() => {
        if (closeButton) closeButton.focus();
      }, 100);
    }
    
    // Close modal function
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scroll
      
      // Return focus to Terms button
      if (termsButton) termsButton.focus();
    }
    
    // Trap focus inside modal when open
    modal.addEventListener('keydown', function(e) {
      if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Tab') {
        trapFocus(e, modal);
      }
    });
    
    function trapFocus(e, container) {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }
})();
