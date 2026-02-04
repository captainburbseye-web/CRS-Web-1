/* ====================================================================
   CRS RACK UI — BOOK NOW DROPDOWN BEHAVIOR
   - Outside click closes
   - ESC key closes
   - Keyboard navigation (Arrow keys + Enter)
   - ARIA compliant
   ==================================================================== */

(function() {
  const trigger = document.querySelector('[data-dropdown-trigger]');
  const menu = document.querySelector('[data-dropdown-menu]');
  
  if (!trigger || !menu) return;

  const items = Array.from(menu.querySelectorAll('a'));
  let currentIndex = -1;

  // Toggle dropdown
  function toggleDropdown() {
    const isOpen = menu.getAttribute('aria-hidden') === 'false';
    
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function openDropdown() {
    menu.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    currentIndex = -1;
    
    // Focus first item after a short delay
    setTimeout(() => {
      if (items[0]) items[0].focus();
      currentIndex = 0;
    }, 50);
  }

  function closeDropdown() {
    menu.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    currentIndex = -1;
  }

  // Click trigger
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  });

  // Outside click
  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      closeDropdown();
    }
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      trigger.focus();
    }
  });

  // Keyboard navigation
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      items[currentIndex].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[currentIndex]) {
        items[currentIndex].click();
      }
    } else if (e.key === 'Tab') {
      closeDropdown();
    }
  });
})();
