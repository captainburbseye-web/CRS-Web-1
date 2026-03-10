/**
 * SIGNAGE VU METER ANIMATIONS
 * Scroll-linked and interactive VU meter needle movements
 * Based on detailed design feedback
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    SCROLL_SENSITIVITY: 0.5,
    NEEDLE_MIN_ANGLE: -45,
    NEEDLE_MAX_ANGLE: 45,
    ANIMATION_DURATION: 300,
    IDLE_BOUNCE: true,
    IDLE_BOUNCE_INTERVAL: 3000,
  };
  
  // State
  let lastScrollY = window.scrollY;
  let idleTimeout = null;
  let vuMeters = [];
  
  // Initialize
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }
  
  // Setup VU meters
  function setup() {
    vuMeters = Array.from(document.querySelectorAll('.vu-meter-needle'));
    
    if (vuMeters.length === 0) {
      console.info('No VU meters found on page');
      return;
    }
    
    console.log(`Found ${vuMeters.length} VU meters`);
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.info('Reduced motion preference detected - disabling VU animations');
      return;
    }
    
    // Setup scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Setup hover effects
    vuMeters.forEach(needle => {
      const container = needle.closest('.vu-meter');
      if (container) {
        container.addEventListener('mouseenter', () => animateNeedle(needle, 'bounce'));
        container.addEventListener('click', () => animateNeedle(needle, 'peak'));
      }
    });
    
    // Start idle animation
    if (CONFIG.IDLE_BOUNCE) {
      startIdleAnimation();
    }
    
    // Initial animation
    animateAllNeedles('random');
  }
  
  // Handle scroll events
  function handleScroll() {
    const scrollY = window.scrollY;
    const scrollDelta = Math.abs(scrollY - lastScrollY);
    const scrollDirection = scrollY > lastScrollY ? 1 : -1;
    
    // Calculate needle angle based on scroll speed
    const scrollSpeed = Math.min(scrollDelta * CONFIG.SCROLL_SENSITIVITY, 90);
    const targetAngle = (scrollSpeed / 90) * (CONFIG.NEEDLE_MAX_ANGLE - CONFIG.NEEDLE_MIN_ANGLE);
    const angle = scrollDirection > 0 ? targetAngle : -targetAngle;
    
    // Animate all needles
    vuMeters.forEach(needle => {
      setNeedleAngle(needle, angle);
    });
    
    lastScrollY = scrollY;
    
    // Reset to center after scroll stops
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      resetAllNeedles();
    }, 500);
  }
  
  // Set needle angle
  function setNeedleAngle(needle, angle) {
    const clampedAngle = Math.max(CONFIG.NEEDLE_MIN_ANGLE, Math.min(CONFIG.NEEDLE_MAX_ANGLE, angle));
    needle.style.transform = `translateX(-50%) rotate(${clampedAngle}deg)`;
  }
  
  // Animate needle with preset patterns
  function animateNeedle(needle, pattern) {
    switch(pattern) {
      case 'bounce':
        // Quick bounce animation
        animateNeedleSequence(needle, [
          { angle: -30, duration: 100 },
          { angle: 30, duration: 100 },
          { angle: -15, duration: 100 },
          { angle: 15, duration: 100 },
          { angle: 0, duration: 200 }
        ]);
        break;
        
      case 'peak':
        // Peak and return
        animateNeedleSequence(needle, [
          { angle: CONFIG.NEEDLE_MAX_ANGLE, duration: 150 },
          { angle: CONFIG.NEEDLE_MIN_ANGLE, duration: 150 },
          { angle: 0, duration: 200 }
        ]);
        break;
        
      case 'random':
        // Random movement
        const randomAngle = Math.random() * (CONFIG.NEEDLE_MAX_ANGLE - CONFIG.NEEDLE_MIN_ANGLE) + CONFIG.NEEDLE_MIN_ANGLE;
        animateNeedleSequence(needle, [
          { angle: randomAngle, duration: 300 },
          { angle: 0, duration: 300 }
        ]);
        break;
        
      case 'idle':
        // Subtle idle movement
        const idleAngle = (Math.random() - 0.5) * 30;
        animateNeedleSequence(needle, [
          { angle: idleAngle, duration: 600 },
          { angle: 0, duration: 600 }
        ]);
        break;
    }
  }
  
  // Animate needle through a sequence of angles
  function animateNeedleSequence(needle, sequence) {
    let delay = 0;
    
    sequence.forEach(step => {
      setTimeout(() => {
        needle.style.transition = `transform ${step.duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        setNeedleAngle(needle, step.angle);
      }, delay);
      delay += step.duration;
    });
  }
  
  // Animate all needles
  function animateAllNeedles(pattern) {
    vuMeters.forEach((needle, index) => {
      setTimeout(() => {
        animateNeedle(needle, pattern);
      }, index * 100);
    });
  }
  
  // Reset all needles to center
  function resetAllNeedles() {
    vuMeters.forEach(needle => {
      needle.style.transition = `transform ${CONFIG.ANIMATION_DURATION}ms ease-out`;
      setNeedleAngle(needle, 0);
    });
  }
  
  // Idle animation loop
  function startIdleAnimation() {
    setInterval(() => {
      // Only animate if user is idle (no scroll for 3+ seconds)
      if (Date.now() - lastScrollY > 3000) {
        animateAllNeedles('idle');
      }
    }, CONFIG.IDLE_BOUNCE_INTERVAL);
  }
  
  // Public API
  window.VUMeter = {
    animateAll: animateAllNeedles,
    reset: resetAllNeedles,
    setConfig: (key, value) => {
      if (CONFIG.hasOwnProperty(key)) {
        CONFIG[key] = value;
      }
    }
  };
  
  // Start
  init();
  
})();
