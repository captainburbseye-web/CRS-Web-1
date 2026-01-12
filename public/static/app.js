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
})
