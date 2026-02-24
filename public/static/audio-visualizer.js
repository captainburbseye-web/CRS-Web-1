/**
 * Simulated Audio Visualizer - Workshop Café Ambient Effect
 * Lightweight canvas-based visualizer with random animation
 * No microphone access required - pure visual effect
 */

(function() {
  'use strict';

  class AudioVisualizer {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.bars = 50;
      this.barWidth = 5;
      this.barSpacing = 8;
      this.heights = new Array(this.bars).fill(0);
      this.targetHeights = new Array(this.bars).fill(0);
      this.animationId = null;
      
      // Set canvas size
      this.canvas.width = this.bars * this.barSpacing;
      this.canvas.height = 100;
      
      // Check for reduced motion preference
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!this.reducedMotion) {
        this.start();
      }
    }

    randomizeTargets() {
      this.targetHeights = this.targetHeights.map(() => 
        Math.random() * this.canvas.height * 0.8
      );
    }

    draw() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw bars
      for (let i = 0; i < this.bars; i++) {
        // Smooth animation towards target
        const diff = this.targetHeights[i] - this.heights[i];
        this.heights[i] += diff * 0.1;
        
        const x = i * this.barSpacing;
        const height = this.heights[i];
        const y = this.canvas.height - height;
        
        // Gradient fill (lime green with glow)
        const gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#39FF14');  // Bright lime
        gradient.addColorStop(0.5, '#2ecc0f');
        gradient.addColorStop(1, '#1a8000');  // Dark green
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, this.barWidth, height);
        
        // Glow effect on top
        this.ctx.fillStyle = 'rgba(57, 255, 20, 0.3)';
        this.ctx.fillRect(x, y, this.barWidth, 3);
      }
      
      this.animationId = requestAnimationFrame(() => this.draw());
    }

    start() {
      this.randomizeTargets();
      this.draw();
      
      // Update targets periodically
      setInterval(() => {
        if (!this.reducedMotion) {
          this.randomizeTargets();
        }
      }, 1500);
    }

    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Look for visualizer canvas in Workshop Café section
    const visualizerCanvas = document.getElementById('cafe-visualizer');
    if (visualizerCanvas) {
      new AudioVisualizer('cafe-visualizer');
    }
  }

  // Expose for debugging
  window.AudioVisualizer = AudioVisualizer;

})();
