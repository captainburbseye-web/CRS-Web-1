/**
 * SIGNAGE SIGNAL ENHANCED - MULTI-MODE CONTROLLER
 * Handles mode switching, carousel rotation, particle effects, parallax, and audio visualization
 */

(function() {
  'use strict';

  // ========================================
  // STATE
  // ========================================
  
  let currentMode = 'ambient'; // ambient | audio | parallax
  let currentSlide = 0;
  let isPaused = false;
  let autoRotateInterval;
  const SLIDE_DURATION = 8000; // 8 seconds per slide
  const TRANSITION_DURATION = 1200; // 1.2 seconds fade
  
  const modes = ['ambient', 'audio', 'parallax'];
  let modeIndex = 0;

  // ========================================
  // INIT
  // ========================================
  
  function init() {
    console.log('[SignageSignal] Initializing multi-mode signage...');
    
    // Setup mode switching
    setupKeyboardControls();
    
    // Start ambient mode (default)
    startAmbientMode();
    
    // Generate QR codes
    generateQRCodes();
    
    console.log('[SignageSignal] Ready - Press M to cycle modes, P to pause');
  }

  // ========================================
  // MODE SWITCHING
  // ========================================
  
  function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') {
        cycleMode();
      } else if (e.key === 'p' || e.key === 'P') {
        togglePause();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    });
  }

  function cycleMode() {
    modeIndex = (modeIndex + 1) % modes.length;
    const newMode = modes[modeIndex];
    switchMode(newMode);
  }

  function switchMode(mode) {
    console.log(`[SignageSignal] Switching to ${mode} mode`);
    
    // Stop current mode
    stopCurrentMode();
    
    // Hide all modes
    document.querySelectorAll('.signage-mode').forEach(el => {
      el.classList.remove('active');
    });
    
    // Show new mode
    const modeElement = document.getElementById(`mode${capitalize(mode)}`);
    if (modeElement) {
      modeElement.classList.add('active');
    }
    
    // Update indicator
    showModeIndicator(mode);
    
    // Start new mode
    currentMode = mode;
    startCurrentMode();
  }

  function showModeIndicator(mode) {
    const indicator = document.getElementById('modeIndicator');
    if (indicator) {
      indicator.textContent = `MODE: ${mode.toUpperCase()}`;
      indicator.classList.add('show');
      setTimeout(() => {
        indicator.classList.remove('show');
      }, 2000);
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ========================================
  // AMBIENT MODE (E)
  // ========================================
  
  function startAmbientMode() {
    console.log('[Ambient] Starting ambient cinematic mode');
    startCarousel('.ambient-slide', '.ambient-indicators .indicator');
  }

  function stopAmbientMode() {
    clearInterval(autoRotateInterval);
  }

  // ========================================
  // AUDIO-REACTIVE MODE (A)
  // ========================================
  
  function startAudioMode() {
    console.log('[Audio] Starting audio-reactive mode');
    startCarousel('.audio-slide', '.audio-indicators .indicator');
    initAudioVisualizer();
    initParticles();
  }

  function stopAudioMode() {
    clearInterval(autoRotateInterval);
    // Stop audio context if running
  }

  function initAudioVisualizer() {
    const canvas = document.getElementById('audioCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Simulated audio waveform (in production, connect to real audio source)
    function drawWaveform() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#39FF14';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + Date.now() * 0.003) * 50 * Math.random();
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      requestAnimationFrame(drawWaveform);
    }
    
    drawWaveform();
  }

  function initParticles() {
    const slides = document.querySelectorAll('.audio-slide');
    slides.forEach((slide) => {
      const canvas = slide.querySelector('.particle-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      const particleCount = 50;
      const color = slide.querySelector('.audio-card').style.borderColor || '#39FF14';
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
      
      function animateParticles() {
        if (!slide.classList.contains('active')) {
          requestAnimationFrame(animateParticles);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;
        
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
      }
      
      animateParticles();
    });
  }

  // ========================================
  // PARALLAX MODE (B)
  // ========================================
  
  function startParallaxMode() {
    console.log('[Parallax] Starting parallax layers mode');
    startCarousel('.parallax-slide', '.parallax-indicators .indicator');
    initParallaxEffect();
  }

  function stopParallaxMode() {
    clearInterval(autoRotateInterval);
  }

  function initParallaxEffect() {
    const scene = document.getElementById('parallaxScene');
    if (!scene) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function updateParallax() {
      const slides = document.querySelectorAll('.parallax-slide.active');
      slides.forEach((slide) => {
        const layers = slide.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          const depth = parseFloat(layer.dataset.depth) || 0;
          const moveX = mouseX * depth * 30;
          const moveY = mouseY * depth * 30;
          layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
      
      requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
  }

  // ========================================
  // CAROUSEL CONTROL (SHARED)
  // ========================================
  
  function startCarousel(slideSelector, indicatorSelector) {
    const slides = document.querySelectorAll(slideSelector);
    const indicators = document.querySelectorAll(indicatorSelector);
    
    if (slides.length === 0) return;
    
    currentSlide = 0;
    showSlide(slides, indicators, currentSlide);
    
    autoRotateInterval = setInterval(() => {
      if (!isPaused) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(slides, indicators, currentSlide);
      }
    }, SLIDE_DURATION);
    
    // Setup indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(slides, indicators, currentSlide);
        resetAutoRotate();
      });
    });
  }

  function showSlide(slides, indicators, index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    // Restart progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar) => {
      bar.style.animation = 'none';
      setTimeout(() => {
        bar.style.animation = `progress-fill ${SLIDE_DURATION}ms linear`;
      }, 10);
    });
  }

  function nextSlide() {
    const slides = document.querySelectorAll(`.signage-mode.active .${currentMode}-slide`);
    const indicators = document.querySelectorAll(`.signage-mode.active .${currentMode}-indicators .indicator`);
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(slides, indicators, currentSlide);
    resetAutoRotate();
  }

  function prevSlide() {
    const slides = document.querySelectorAll(`.signage-mode.active .${currentMode}-slide`);
    const indicators = document.querySelectorAll(`.signage-mode.active .${currentMode}-indicators .indicator`);
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(slides, indicators, currentSlide);
    resetAutoRotate();
  }

  function togglePause() {
    isPaused = !isPaused;
    console.log(`[SignageSignal] ${isPaused ? 'Paused' : 'Resumed'}`);
  }

  function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startCurrentMode();
  }

  // ========================================
  // MODE LIFECYCLE
  // ========================================
  
  function startCurrentMode() {
    switch (currentMode) {
      case 'ambient':
        startAmbientMode();
        break;
      case 'audio':
        startAudioMode();
        break;
      case 'parallax':
        startParallaxMode();
        break;
    }
  }

  function stopCurrentMode() {
    switch (currentMode) {
      case 'ambient':
        stopAmbientMode();
        break;
      case 'audio':
        stopAudioMode();
        break;
      case 'parallax':
        stopParallaxMode();
        break;
    }
  }

  // ========================================
  // QR CODE GENERATION
  // ========================================
  
  function generateQRCodes() {
    const qrContainers = document.querySelectorAll('[data-url]');
    qrContainers.forEach((container) => {
      const url = container.dataset.url;
      if (!url) return;
      
      // In production, use a QR library like qrcode.js
      // For now, placeholder
      const placeholder = container.querySelector('.qr-code-placeholder');
      if (placeholder) {
        placeholder.innerHTML = `<svg viewBox="0 0 100 100" style="width:100%;height:100%">
          <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
          <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
          <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
          <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
          <rect x="40" y="40" width="20" height="20" fill="currentColor"/>
          <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
          <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
          <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
          <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
        </svg>`;
      }
    });
  }

  // ========================================
  // START
  // ========================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
