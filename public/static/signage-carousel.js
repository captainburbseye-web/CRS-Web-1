/**
 * Signage Carousel Controller
 * Vanilla JS carousel for digital signage displays
 */

(function() {
  'use strict';

  class SignageCarousel {
    constructor() {
      this.slides = document.querySelectorAll('.signage-slide');
      this.indicators = document.querySelectorAll('.signage-indicator');
      this.currentIndex = 0;
      this.interval = null;
      this.duration = 8000; // 8 seconds per slide
      this.isTransitioning = false;
      
      this.init();
    }

    init() {
      // Set first slide as active
      if (this.slides.length > 0) {
        this.showSlide(0);
      }
      
      // Add indicator click handlers
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => this.goToSlide(index));
      });
      
      // Add keyboard navigation
      document.addEventListener('keydown', (e) => this.handleKeyboard(e));
      
      // Start autoplay
      this.startAutoplay();
      
      // Pause on visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopAutoplay();
        } else {
          this.startAutoplay();
        }
      });
    }

    showSlide(index) {
      if (this.isTransitioning) return;
      
      this.isTransitioning = true;
      
      // Remove active from all
      this.slides.forEach(slide => slide.classList.remove('active'));
      this.indicators.forEach(ind => ind.classList.remove('active'));
      
      // Add active to current
      this.slides[index].classList.add('active');
      this.indicators[index].classList.add('active');
      
      this.currentIndex = index;
      
      // Reset progress bar
      const progressBar = this.slides[index].querySelector('.signage-progress-bar');
      if (progressBar) {
        progressBar.style.animation = 'none';
        // Force reflow
        void progressBar.offsetWidth;
        progressBar.style.animation = 'signage-progress 8s linear forwards';
      }
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 1200); // Match CSS transition duration
    }

    nextSlide() {
      const next = (this.currentIndex + 1) % this.slides.length;
      this.showSlide(next);
    }

    prevSlide() {
      const prev = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.showSlide(prev);
    }

    goToSlide(index) {
      if (index !== this.currentIndex) {
        this.showSlide(index);
        this.resetAutoplay();
      }
    }

    startAutoplay() {
      if (this.interval) return;
      
      this.interval = setInterval(() => {
        this.nextSlide();
      }, this.duration);
    }

    stopAutoplay() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }

    handleKeyboard(e) {
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          this.nextSlide();
          this.resetAutoplay();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          this.prevSlide();
          this.resetAutoplay();
          break;
        case ' ':
        case 'Spacebar':
          e.preventDefault();
          if (this.interval) {
            this.stopAutoplay();
          } else {
            this.startAutoplay();
          }
          break;
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new SignageCarousel();
    });
  } else {
    new SignageCarousel();
  }

  // Add signage mode class to html element
  document.documentElement.classList.add('signage-mode');

  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable text selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';

  // Prevent accidental zooming
  document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // Global API
  window.SignageCarousel = SignageCarousel;
})();
