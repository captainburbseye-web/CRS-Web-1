// BOOK NOW PANEL INTERACTION - Hover + Click Hybrid
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('book-now-trigger')
  const dropdown = document.getElementById('book-now-dropdown')
  const panel = document.getElementById('book-now-panel')
  
  if (trigger && dropdown && panel) {
    let hoverTimeout;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      // DESKTOP: Hover behavior with delay
      panel.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        panel.classList.add('active');
      });
      
      panel.addEventListener('mouseleave', () => {
        // 300ms delay allows mouse travel to dropdown
        hoverTimeout = setTimeout(() => {
          panel.classList.remove('active');
        }, 300);
      });
    } else {
      // MOBILE/TOUCH: Click to toggle
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        panel.classList.toggle('active');
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!panel.contains(e.target)) {
          panel.classList.remove('active');
        }
      });
    }
    
    // Close on ESC (both desktop and mobile)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        panel.classList.remove('active');
      }
    });
    
    // Close dropdown when link is clicked
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        panel.classList.remove('active');
      });
    });
  }

  // MOBILE NAVIGATION TOGGLE
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle')
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay')
  const mobileNavClose = document.getElementById('mobile-nav-close')
  
  if (mobileMenuToggle && mobileNavOverlay && mobileNavClose) {
    // Open mobile menu
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavOverlay.classList.add('active')
      document.body.classList.add('mobile-menu-open')
    })
    
    // Close mobile menu
    const closeMobileMenu = () => {
      mobileNavOverlay.classList.remove('active')
      document.body.classList.remove('mobile-menu-open')
    }
    
    mobileNavClose.addEventListener('click', closeMobileMenu)
    
    // Close on overlay background click
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        closeMobileMenu()
      }
    })
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
        closeMobileMenu()
      }
    })
    
    // Close mobile menu when nav link is clicked
    mobileNavOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu()
      })
    })
  }
})
