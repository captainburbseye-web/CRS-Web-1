/**
 * High-Performance Rack Module Image Loader
 * Implements lazy loading, progressive loading, and performance optimization
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    rootMargin: '200px', // Start loading 200px before image enters viewport
    threshold: 0.01,
    fadeInDuration: 300,
    preloadCount: 2, // Number of images to preload immediately
    useWebP: true // Attempt to use WebP if supported
  };

  // Track loaded images to avoid reprocessing
  const loadedImages = new Set();

  /**
   * Check if browser supports WebP
   */
  function supportsWebP() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }

  const hasWebPSupport = supportsWebP();

  /**
   * Create blur-up placeholder
   */
  function createPlaceholder(img) {
    const placeholder = document.createElement('div');
    placeholder.className = 'rack-img-placeholder';
    placeholder.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
      background-size: 400% 400%;
      animation: placeholderShimmer 2s ease-in-out infinite;
      z-index: 1;
    `;
    
    // Add loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'rack-img-spinner';
    spinner.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="#FFB300" stroke-width="3" stroke-dasharray="90 90" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div class="loading-text">LOADING RACK MODULE...</div>
    `;
    placeholder.appendChild(spinner);
    
    return placeholder;
  }

  /**
   * Load image with progress tracking
   */
  function loadImage(img, src) {
    return new Promise((resolve, reject) => {
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = src;
        img.dataset.loaded = 'true';
        loadedImages.add(src);
        resolve(img);
      };
      
      tempImg.onerror = () => {
        console.error('Failed to load rack image:', src);
        reject(new Error(`Failed to load: ${src}`));
      };
      
      tempImg.src = src;
    });
  }

  /**
   * Fade in image after load
   */
  function fadeInImage(img, placeholder) {
    img.style.opacity = '0';
    img.style.transition = `opacity ${CONFIG.fadeInDuration}ms ease-in-out`;
    
    // Remove placeholder with fade out
    if (placeholder) {
      placeholder.style.transition = `opacity ${CONFIG.fadeInDuration}ms ease-in-out`;
      placeholder.style.opacity = '0';
      
      setTimeout(() => {
        placeholder.remove();
      }, CONFIG.fadeInDuration);
    }
    
    // Fade in actual image
    requestAnimationFrame(() => {
      img.style.opacity = '1';
    });
  }

  /**
   * Handle intersection for lazy loading
   */
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const img = container.querySelector('img.rack-module-img, img.rack-header-img');
        
        if (!img || img.dataset.loaded === 'true') {
          observer.unobserve(container);
          return;
        }
        
        const src = img.dataset.src || img.src;
        const placeholder = container.querySelector('.rack-img-placeholder');
        
        loadImage(img, src)
          .then(() => {
            fadeInImage(img, placeholder);
            observer.unobserve(container);
          })
          .catch(err => {
            console.error('Image load error:', err);
            if (placeholder) {
              placeholder.innerHTML = '<div class="load-error">⚠ LOAD ERROR</div>';
            }
          });
      }
    });
  }

  /**
   * Initialize lazy loading for rack images
   */
  function initLazyLoading() {
    // Find all rack module containers
    const rackModules = document.querySelectorAll('.rack-module-graphic, .rack-header-container');
    
    if (!rackModules.length) {
      console.warn('No rack modules found');
      return;
    }
    
    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: CONFIG.rootMargin,
      threshold: CONFIG.threshold
    });
    
    rackModules.forEach((module, index) => {
      const img = module.querySelector('img.rack-module-img, img.rack-header-img');
      
      if (!img) return;
      
      // Preload critical above-the-fold images immediately
      if (index < CONFIG.preloadCount) {
        const src = img.src;
        img.dataset.src = src;
        img.dataset.priority = 'high';
        
        // Load immediately without lazy loading
        loadImage(img, src)
          .then(() => {
            img.style.opacity = '1';
          })
          .catch(err => console.error('Critical image load error:', err));
        
        return;
      }
      
      // For other images, set up lazy loading
      const src = img.src;
      img.dataset.src = src;
      
      // Make image container relative for positioning
      if (getComputedStyle(module).position === 'static') {
        module.style.position = 'relative';
      }
      
      // Add placeholder
      const placeholder = createPlaceholder(img);
      module.appendChild(placeholder);
      
      // Clear src to prevent immediate load
      img.removeAttribute('src');
      img.style.opacity = '0';
      
      // Observe for lazy loading
      observer.observe(module);
    });
    
    console.log(`🎯 Rack Image Loader initialized: ${rackModules.length} modules`);
    console.log(`⚡ Preloading ${CONFIG.preloadCount} critical images`);
    console.log(`🔄 Lazy loading ${rackModules.length - CONFIG.preloadCount} deferred images`);
  }

  /**
   * Preload critical CSS for rack images
   */
  function injectCriticalCSS() {
    if (document.getElementById('rack-loader-css')) return;
    
    const style = document.createElement('style');
    style.id = 'rack-loader-css';
    style.textContent = `
      @keyframes placeholderShimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .rack-img-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
      }
      
      .rack-img-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        z-index: 2;
      }
      
      .rack-img-spinner svg {
        filter: drop-shadow(0 0 8px rgba(255, 179, 0, 0.5));
      }
      
      .loading-text {
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 0.75rem;
        color: #FFB300;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        opacity: 0.8;
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      
      .load-error {
        font-family: 'JetBrains Mono', monospace;
        color: #ff4444;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      /* Optimize image rendering */
      .rack-module-img,
      .rack-header-img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        will-change: opacity;
      }
      
      /* Reduce layout shift */
      .rack-module-graphic,
      .rack-header-container {
        min-height: 200px;
      }
    `;
    
    document.head.appendChild(style);
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        injectCriticalCSS();
        setTimeout(initLazyLoading, 100); // Small delay to ensure CSS is applied
      });
    } else {
      injectCriticalCSS();
      setTimeout(initLazyLoading, 100);
    }
  }

  // Start
  init();
  
  // Expose for debugging
  window.RackImageLoader = {
    reinit: initLazyLoading,
    config: CONFIG,
    loadedImages: loadedImages
  };
  
})();
