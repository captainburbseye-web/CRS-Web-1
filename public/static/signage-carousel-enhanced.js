/**
 * ENHANCED SIGNAGE CAROUSEL ENGINE
 * Features:
 * - Auto-rotation (8s per slide, 1.2s fade)
 * - Keyboard navigation (arrows, space, escape)
 * - Touch/swipe support
 * - Pause on visibility change
 * - ARIA live region updates
 * - Progress bar synchronization
 * - Reduced motion support
 */

(function() {
  'use strict';
  
  // ============================================
  // CONFIGURATION
  // ============================================
  
  const CONFIG = {
    SLIDE_DURATION: 8000,        // 8 seconds per slide
    TRANSITION_DURATION: 1200,   // 1.2 seconds fade
    AUTO_ROTATE: true,           // Enable auto-rotation
    PAUSE_ON_HOVER: true,        // Pause when mouse over
    KEYBOARD_CONTROLS: true,     // Enable keyboard navigation
    TOUCH_CONTROLS: true,        // Enable touch/swipe
  };
  
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  let state = {
    currentSlide: 0,
    totalSlides: 0,
    isPlaying: true,
    isPaused: false,
    intervalId: null,
    touchStartX: 0,
    touchEndX: 0,
  };
  
  // ============================================
  // DOM ELEMENTS
  // ============================================
  
  let elements = {
    carousel: null,
    slides: [],
    indicators: [],
    progressBars: [],
  };
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }
  
  function setup() {
    // Cache DOM elements
    elements.carousel = document.getElementById('signageCarousel');
    if (!elements.carousel) {
      console.error('Signage carousel not found');
      return;
    }
    
    elements.slides = Array.from(document.querySelectorAll('.signage-slide'));
    elements.indicators = Array.from(document.querySelectorAll('.indicator'));
    elements.progressBars = Array.from(document.querySelectorAll('.progress-bar'));
    
    state.totalSlides = elements.slides.length;
    
    if (state.totalSlides === 0) {
      console.error('No slides found');
      return;
    }
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      CONFIG.TRANSITION_DURATION = 10;
      CONFIG.AUTO_ROTATE = false;
    }
    
    // Setup event listeners
    setupKeyboardControls();
    setupIndicatorControls();
    setupVisibilityChange();
    setupTouchControls();
    
    // Start auto-rotation
    if (CONFIG.AUTO_ROTATE) {
      startAutoRotation();
    }
    
    // Announce to screen readers
    announceSlide(state.currentSlide);
  }
  
  // ============================================
  // SLIDE NAVIGATION
  // ============================================
  
  function goToSlide(index) {
    if (index < 0 || index >= state.totalSlides) return;
    if (index === state.currentSlide) return;
    
    // Remove active class from current slide
    elements.slides[state.currentSlide]?.classList.remove('active');
    elements.indicators[state.currentSlide]?.classList.remove('active');
    elements.indicators[state.currentSlide]?.setAttribute('aria-selected', 'false');
    elements.indicators[state.currentSlide]?.setAttribute('tabindex', '-1');
    
    // Reset progress bar animation
    if (elements.progressBars[state.currentSlide]) {
      elements.progressBars[state.currentSlide].style.animation = 'none';
      setTimeout(() => {
        elements.progressBars[state.currentSlide].style.animation = '';
      }, 10);
    }
    
    // Update current slide
    state.currentSlide = index;
    
    // Add active class to new slide
    elements.slides[state.currentSlide]?.classList.add('active');
    elements.indicators[state.currentSlide]?.classList.add('active');
    elements.indicators[state.currentSlide]?.setAttribute('aria-selected', 'true');
    elements.indicators[state.currentSlide]?.setAttribute('tabindex', '0');
    
    // Restart progress bar animation
    if (elements.progressBars[state.currentSlide]) {
      elements.progressBars[state.currentSlide].style.animation = 'progress-fill 8s linear forwards';
    }
    
    // Announce to screen readers
    announceSlide(state.currentSlide);
    
    // Restart auto-rotation timer
    if (CONFIG.AUTO_ROTATE && !state.isPaused) {
      resetAutoRotation();
    }
  }
  
  function nextSlide() {
    const nextIndex = (state.currentSlide + 1) % state.totalSlides;
    goToSlide(nextIndex);
  }
  
  function previousSlide() {
    const prevIndex = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
    goToSlide(prevIndex);
  }
  
  // ============================================
  // AUTO-ROTATION
  // ============================================
  
  function startAutoRotation() {
    if (state.intervalId) clearInterval(state.intervalId);
    
    state.intervalId = setInterval(() => {
      if (!state.isPaused) {
        nextSlide();
      }
    }, CONFIG.SLIDE_DURATION);
    
    state.isPlaying = true;
  }
  
  function stopAutoRotation() {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
    state.isPlaying = false;
  }
  
  function resetAutoRotation() {
    stopAutoRotation();
    startAutoRotation();
  }
  
  function pauseAutoRotation() {
    state.isPaused = true;
  }
  
  function resumeAutoRotation() {
    state.isPaused = false;
  }
  
  // ============================================
  // KEYBOARD CONTROLS
  // ============================================
  
  function setupKeyboardControls() {
    if (!CONFIG.KEYBOARD_CONTROLS) return;
    
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextSlide();
          break;
          
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          previousSlide();
          break;
          
        case ' ':
        case 'Spacebar':
          e.preventDefault();
          if (state.isPaused) {
            resumeAutoRotation();
          } else {
            pauseAutoRotation();
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          goToSlide(0);
          break;
          
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
          
        case 'End':
          e.preventDefault();
          goToSlide(state.totalSlides - 1);
          break;
      }
    });
  }
  
  // ============================================
  // INDICATOR CONTROLS
  // ============================================
  
  function setupIndicatorControls() {
    elements.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
      
      indicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToSlide(index);
        }
      });
    });
  }
  
  // ============================================
  // VISIBILITY CHANGE (Pause when hidden)
  // ============================================
  
  function setupVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseAutoRotation();
      } else {
        resumeAutoRotation();
      }
    });
  }
  
  // ============================================
  // TOUCH CONTROLS (Swipe)
  // ============================================
  
  function setupTouchControls() {
    if (!CONFIG.TOUCH_CONTROLS) return;
    
    elements.carousel.addEventListener('touchstart', (e) => {
      state.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    elements.carousel.addEventListener('touchend', (e) => {
      state.touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = state.touchStartX - state.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left (next)
        nextSlide();
      } else {
        // Swipe right (previous)
        previousSlide();
      }
    }
  }
  
  // ============================================
  // ACCESSIBILITY: SCREEN READER ANNOUNCEMENTS
  // ============================================
  
  function announceSlide(index) {
    const slide = elements.slides[index];
    if (!slide) return;
    
    const title = slide.querySelector('.signage-title')?.textContent || '';
    const channel = slide.getAttribute('data-channel') || '';
    const slideNumber = index + 1;
    
    const announcement = `${title}, ${channel}, Slide ${slideNumber} of ${state.totalSlides}`;
    
    // Create or update ARIA live region
    let liveRegion = document.getElementById('carousel-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'carousel-live-region';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = announcement;
  }
  
  // ============================================
  // START
  // ============================================
  
  init();
  
  // ============================================
  // EXPOSE PUBLIC API
  // ============================================
  
  window.SignageCarousel = {
    goToSlide,
    nextSlide,
    previousSlide,
    pause: pauseAutoRotation,
    resume: resumeAutoRotation,
    getCurrentSlide: () => state.currentSlide,
    getTotalSlides: () => state.totalSlides,
  };
  
})();
