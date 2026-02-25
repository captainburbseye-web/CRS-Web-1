/**
 * CRS SIGNAGE ENHANCED V3 - FRAME CONTROLLER
 * 
 * Manages 75-90 second loop with 8 frames
 * Soft transitions, no hard cuts
 * Continuous ambient motion layer
 */

(function() {
  'use strict';

  // ========================================
  // STATE
  // ========================================
  
  let currentFrame = 0;
  let frameTimeout;
  let totalLoopDuration = 0;
  
  const frames = document.querySelectorAll('.signage-frame');
  const totalFrames = frames.length;

  // ========================================
  // INIT
  // ========================================
  
  function init() {
    console.log('[SignageV3] Initializing brand-aligned signage reel...');
    
    if (totalFrames === 0) {
      console.error('[SignageV3] No frames found');
      return;
    }

    // Calculate total loop duration
    frames.forEach((frame) => {
      const duration = parseInt(frame.dataset.duration) || 8000;
      totalLoopDuration += duration;
    });
    
    console.log(`[SignageV3] Total loop duration: ${totalLoopDuration}ms (${(totalLoopDuration / 1000).toFixed(1)}s)`);
    
    // Start parallax effect
    initParallax();
    
    // Start frame rotation
    showFrame(0);
    scheduleNextFrame();
  }

  // ========================================
  // FRAME TRANSITIONS
  // ========================================
  
  function showFrame(index) {
    console.log(`[SignageV3] Showing frame ${index + 1}/${totalFrames}`);
    
    // Hide all frames
    frames.forEach((frame) => {
      frame.classList.remove('active');
    });
    
    // Show current frame
    const currentFrameElement = frames[index];
    currentFrameElement.classList.add('active');
    
    // Restart progress bar animation
    const progressFill = currentFrameElement.querySelector('.progress-fill');
    if (progressFill) {
      const duration = parseInt(currentFrameElement.dataset.duration) || 8000;
      progressFill.style.setProperty('--frame-duration', `${duration}ms`);
      progressFill.style.animation = 'none';
      setTimeout(() => {
        progressFill.style.animation = `progress-advance ${duration}ms linear`;
      }, 10);
    }
  }

  function scheduleNextFrame() {
    const currentFrameElement = frames[currentFrame];
    const duration = parseInt(currentFrameElement.dataset.duration) || 8000;
    
    frameTimeout = setTimeout(() => {
      currentFrame = (currentFrame + 1) % totalFrames;
      showFrame(currentFrame);
      scheduleNextFrame();
    }, duration);
  }

  // ========================================
  // PARALLAX EFFECT (MAX 3 LAYERS, SLOW MOTION)
  // ========================================
  
  function initParallax() {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Smooth parallax animation
    function updateParallax() {
      // Smooth interpolation (slow, mechanical)
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      
      // Apply to active frame's parallax layers
      const activeFrame = document.querySelector('.signage-frame.active');
      if (activeFrame) {
        const layers = activeFrame.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          const depth = parseFloat(layer.dataset.depth) || 0;
          const moveX = targetX * depth * 20; // Reduced movement (was 30)
          const moveY = targetY * depth * 20;
          layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      }
      
      requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
  }

  // ========================================
  // KEYBOARD CONTROLS (DEV ONLY)
  // ========================================
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      // Skip to next frame
      clearTimeout(frameTimeout);
      currentFrame = (currentFrame + 1) % totalFrames;
      showFrame(currentFrame);
      scheduleNextFrame();
    } else if (e.key === 'ArrowLeft') {
      // Go to previous frame
      clearTimeout(frameTimeout);
      currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
      showFrame(currentFrame);
      scheduleNextFrame();
    } else if (e.key === 'r' || e.key === 'R') {
      // Restart from beginning
      clearTimeout(frameTimeout);
      currentFrame = 0;
      showFrame(currentFrame);
      scheduleNextFrame();
    }
  });

  // ========================================
  // AUTO-PAUSE WHEN WINDOW HIDDEN
  // ========================================
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('[SignageV3] Window hidden - pausing');
      clearTimeout(frameTimeout);
    } else {
      console.log('[SignageV3] Window visible - resuming');
      scheduleNextFrame();
    }
  });

  // ========================================
  // START
  // ========================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
