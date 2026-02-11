/**
 * CRS Rack Modular - Interactive Features
 * Collapsible rack modules for focused service exploration
 */

(function() {
  'use strict';

  // ====================================================================
  // 1. COLLAPSIBLE RACK MODULES
  // ====================================================================

  function initCollapsibleRacks() {
    const rackModules = document.querySelectorAll('.rack-module');
    
    // Make all modules except header collapsible
    rackModules.forEach((module, index) => {
      // Skip header module (first module with priority="high")
      if (index === 0 && module.getAttribute('data-priority') === 'high') {
        return;
      }
      
      // Add collapsible class
      module.classList.add('collapsible');
      module.setAttribute('tabindex', '0');
      module.setAttribute('role', 'button');
      module.setAttribute('aria-expanded', 'false');
      module.setAttribute('aria-label', `Expand ${module.querySelector('.rack-title')?.textContent || 'service'} details`);
      
      // Toggle on click
      module.addEventListener('click', (e) => {
        // Don't toggle if clicking on button or link
        if (e.target.closest('.rack-button') || e.target.closest('.rack-dropdown')) {
          return;
        }
        
        toggleRackModule(module);
      });
      
      // Toggle on Enter/Space key
      module.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleRackModule(module);
        }
      });
    });
  }

  function toggleRackModule(module) {
    const isExpanded = module.classList.contains('expanded');
    
    // Collapse all other modules
    document.querySelectorAll('.rack-module.expanded').forEach(m => {
      if (m !== module) {
        m.classList.remove('expanded');
        m.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle this module
    if (isExpanded) {
      module.classList.remove('expanded');
      module.setAttribute('aria-expanded', 'false');
    } else {
      module.classList.add('expanded');
      module.setAttribute('aria-expanded', 'true');
      
      // Smooth scroll to module (if needed)
      setTimeout(() => {
        const rect = module.getBoundingClientRect();
        const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (!isFullyVisible) {
          module.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
    }
    
    // Announce to screen readers
    announceToScreenReader(
      isExpanded ? 'Module collapsed' : 'Module expanded'
    );
  }

  // ====================================================================
  // 2. ENHANCED DROPDOWN BEHAVIOR
  // ====================================================================

  function enhanceDropdowns() {
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
    
    dropdownTriggers.forEach(trigger => {
      const menu = trigger.nextElementSibling;
      
      if (!menu || !menu.hasAttribute('data-dropdown-menu')) return;
      
      // Close on Escape key
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
          closeDropdown(trigger, menu);
        }
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !menu.contains(e.target)) {
          if (trigger.getAttribute('aria-expanded') === 'true') {
            closeDropdown(trigger, menu);
          }
        }
      });
    });
  }

  function closeDropdown(trigger, menu) {
    trigger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.style.display = 'none';
  }

  // ====================================================================
  // 3. SMOOTH SCROLL FOR RACK NAV
  // ====================================================================

  function initRackNav() {
    const navButtons = document.querySelectorAll('.rack-nav-button');
    
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetRow = button.getAttribute('data-target-row');
        const targetModule = document.querySelector(`[data-row="${targetRow}"]`);
        
        if (targetModule) {
          // Expand module if collapsible
          if (targetModule.classList.contains('collapsible')) {
            targetModule.classList.add('expanded');
            targetModule.setAttribute('aria-expanded', 'true');
          }
          
          // Smooth scroll
          targetModule.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Focus for keyboard users
          targetModule.focus();
        }
      });
    });
  }

  // ====================================================================
  // 4. ACCESSIBILITY ANNOUNCEMENTS
  // ====================================================================

  function announceToScreenReader(message) {
    const announcement = document.getElementById('sr-announcements');
    if (announcement) {
      announcement.textContent = message;
      
      // Clear after 3 seconds
      setTimeout(() => {
        announcement.textContent = '';
      }, 3000);
    }
  }

  // ====================================================================
  // 5. PERFORMANCE OPTIMIZATIONS
  // ====================================================================

  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Lazy load animations on scroll
  function initLazyAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.rack-module').forEach(module => {
      observer.observe(module);
    });
  }

  // ====================================================================
  // 6. INITIALIZE ON DOM READY
  // ====================================================================

  function init() {
    // Create screen reader announcement region if not exists
    if (!document.getElementById('sr-announcements')) {
      const announcer = document.createElement('div');
      announcer.id = 'sr-announcements';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }

    // Initialize features
    initCollapsibleRacks();
    enhanceDropdowns();
    initRackNav();
    initLazyAnimations();

    console.log('[CRS Rack] Interactive features initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
