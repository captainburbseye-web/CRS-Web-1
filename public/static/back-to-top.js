/**
 * BACK TO TOP BUTTON - SCROLL DETECTION & SMOOTH ANIMATION
 * 
 * Features:
 * - Shows button after 800px scroll
 * - Smooth scroll animation to top
 * - Debounced scroll listener for performance
 * - Keyboard accessible (Enter/Space to activate)
 */

(function() {
  'use strict';
  
  // Configuration
  const SCROLL_THRESHOLD = 800; // Show button after 800px scroll
  const DEBOUNCE_DELAY = 100;   // Debounce scroll events (ms)
  
  // State
  let scrollTimeout = null;
  let backToTopButton = null;
  
  /**
   * Initialize back-to-top button functionality
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Find button element
    backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) {
      console.warn('[BackToTop] Button element not found');
      return;
    }
    
    // Attach event listeners
    attachEventListeners();
    
    // Initial check (in case page loads scrolled down)
    checkScrollPosition();
  }
  
  /**
   * Attach all event listeners
   */
  function attachEventListeners() {
    // Scroll detection (debounced)
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Click handler
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Keyboard accessibility
    backToTopButton.addEventListener('keydown', handleKeydown);
  }
  
  /**
   * Handle scroll events (debounced for performance)
   */
  function handleScroll() {
    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Set new timeout
    scrollTimeout = setTimeout(checkScrollPosition, DEBOUNCE_DELAY);
  }
  
  /**
   * Check current scroll position and show/hide button
   */
  function checkScrollPosition() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollY > SCROLL_THRESHOLD) {
      showButton();
    } else {
      hideButton();
    }
  }
  
  /**
   * Show back-to-top button with fade-in animation
   */
  function showButton() {
    if (!backToTopButton.classList.contains('visible')) {
      backToTopButton.classList.add('visible');
      backToTopButton.setAttribute('aria-hidden', 'false');
    }
  }
  
  /**
   * Hide back-to-top button with fade-out animation
   */
  function hideButton() {
    if (backToTopButton.classList.contains('visible')) {
      backToTopButton.classList.remove('visible');
      backToTopButton.setAttribute('aria-hidden', 'true');
    }
  }
  
  /**
   * Scroll to top with smooth animation
   */
  function scrollToTop(event) {
    event.preventDefault();
    
    // Use native smooth scroll if supported
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Fallback: Manual smooth scroll animation
      smoothScrollPolyfill();
    }
  }
  
  /**
   * Manual smooth scroll implementation (fallback for older browsers)
   */
  function smoothScrollPolyfill() {
    const startPosition = window.pageYOffset;
    const duration = 600; // Animation duration (ms)
    const startTime = performance.now();
    
    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, startPosition * (1 - easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  /**
   * Handle keyboard events for accessibility
   */
  function handleKeydown(event) {
    // Activate on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop(event);
    }
  }
  
  // Initialize on load
  init();
  
})();
