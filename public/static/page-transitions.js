/**
 * Smooth Page Transitions - Fade Effect
 * Handles navigation with cross-fade animation
 * Fallback for browsers without View Transitions API
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for View Transitions API support
  const supportsViewTransitions = 'startViewTransition' in document;

  class PageTransitions {
    constructor() {
      this.transitionDuration = reducedMotion ? 0 : 300;
      this.isTransitioning = false;
      
      if (!reducedMotion) {
        this.initialize();
      }
    }

    initialize() {
      // Intercept same-origin navigation links
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        // Only handle internal links
        if (!link || !link.href) return;
        if (link.target === '_blank') return;
        if (link.hostname !== window.location.hostname) return;
        if (link.hasAttribute('data-no-transition')) return;

        // Don't intercept Square booking widgets or external links
        if (link.href.includes('squareup.com') || link.href.includes('square.site')) return;

        e.preventDefault();
        this.navigateTo(link.href);
      }, { capture: true });

      // Handle browser back/forward buttons
      window.addEventListener('popstate', () => {
        this.navigateTo(window.location.href, false);
      });
    }

    navigateTo(url, pushState = true) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      // Use View Transitions API if available
      if (supportsViewTransitions && !reducedMotion) {
        document.startViewTransition(() => {
          if (pushState) {
            window.history.pushState({}, '', url);
          }
          return this.loadPage(url);
        }).finished.finally(() => {
          this.isTransitioning = false;
        });
      } else {
        // Fallback: CSS fade transition
        this.fallbackTransition(url, pushState);
      }
    }

    async loadPage(url) {
      try {
        const response = await fetch(url);
        const html = await response.text();
        
        // Parse new HTML
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        
        // Replace title
        document.title = newDoc.title;
        
        // Replace body content
        document.body.innerHTML = newDoc.body.innerHTML;
        
        // Re-initialize scripts
        this.reinitializeScripts();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
      } catch (error) {
        console.error('[Transitions] Failed to load page:', error);
        // Fallback to normal navigation
        window.location.href = url;
      }
    }

    fallbackTransition(url, pushState) {
      // Add fade-out class
      document.body.classList.add('page-fade-out');
      
      setTimeout(() => {
        if (pushState) {
          window.history.pushState({}, '', url);
        }
        
        this.loadPage(url).then(() => {
          // Remove fade-out, trigger fade-in
          document.body.classList.remove('page-fade-out');
          document.body.classList.add('page-fade-in');
          
          setTimeout(() => {
            document.body.classList.remove('page-fade-in');
            this.isTransitioning = false;
          }, this.transitionDuration);
        });
      }, this.transitionDuration);
    }

    reinitializeScripts() {
      // Dispatch custom event for other scripts to reinitialize
      window.dispatchEvent(new CustomEvent('page-transition-complete'));
      
      // Re-initialize common components
      if (window.toggleSwitchManager) {
        window.toggleSwitchManager.initialize();
      }
      if (window.RackAudioFeedback) {
        new window.RackAudioFeedback();
      }
      if (window.AudioVisualizer) {
        const canvas = document.getElementById('cafe-visualizer');
        if (canvas) new window.AudioVisualizer('cafe-visualizer');
      }
    }
  }

  // CSS for fallback transitions
  const styles = document.createElement('style');
  styles.textContent = `
    /* Fade transition styles */
    body {
      opacity: 1;
      transition: opacity ${reducedMotion ? 0 : 300}ms ease-in-out;
    }

    body.page-fade-out {
      opacity: 0;
    }

    body.page-fade-in {
      opacity: 0;
      animation: fade-in ${reducedMotion ? 0 : 300}ms ease-in-out forwards;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* View Transitions API styles (for supported browsers) */
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: ${reducedMotion ? '0ms' : '300ms'};
      animation-timing-function: ease-in-out;
    }

    ::view-transition-old(root) {
      animation-name: fade-out;
    }

    ::view-transition-new(root) {
      animation-name: fade-in;
    }

    @keyframes fade-out {
      to {
        opacity: 0;
      }
    }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      body,
      body.page-fade-out,
      body.page-fade-in,
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(styles);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new PageTransitions();
    });
  } else {
    new PageTransitions();
  }

})();
