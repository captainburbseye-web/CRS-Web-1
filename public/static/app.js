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
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
  const mobileNav = document.querySelector('.mobile-nav')
  
  if (mobileMenuToggle && mobileNav) {
    // Toggle mobile menu visibility
    mobileMenuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active')
      mobileMenuToggle.classList.toggle('active')
      document.body.classList.toggle('mobile-menu-open')
      
      // Update aria-label
      const isOpen = mobileNav.classList.contains('active')
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
    })
    
    // Close when clicking a nav link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active')
        mobileMenuToggle.classList.remove('active')
        document.body.classList.remove('mobile-menu-open')
      })
    })
  }
})
