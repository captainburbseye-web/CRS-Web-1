// ============================================
// OFFLINE SIGNAGE BACKUP - VANILLA JS
// ============================================

// Configuration
const SLIDE_DURATION = 10000; // 10 seconds per slide
const FADE_DURATION = 500;    // 0.5s transition

// Playlist (Order matters - this is the loop)
const playlist = [
  {
    id: 'ch1',
    channel: '1',
    title: 'Cowley Rehearsal',
    description: '118 Cowley Road · Studio Services',
    asset: 'assets/cowley-rehearsal-optimized.webp',
    label: 'CH1 · COWLEY ROAD'
  },
  {
    id: 'ch8',
    channel: '8',
    title: 'Cricket Rehearsal',
    description: 'Cricket Road · Rehearsal Studio',
    asset: 'assets/cricket-rehearsal-magenta-optimized.webp',
    label: 'CH8 · CRICKET ROAD'
  },
  {
    id: 'ch2',
    channel: '2',
    title: 'Control Room',
    description: 'Cricket Road · Professional Recording',
    asset: 'assets/cricket-control-room-optimized.webp',
    label: 'CH2 · CONTROL ROOM'
  },
  {
    id: 'ch4',
    channel: '4',
    title: 'Workshop Café',
    description: 'Cowley Road · Creative Community Space',
    asset: 'assets/workshop-cafe-optimized.webp',
    label: 'CH4 · WORKSHOP CAFÉ'
  },
  {
    id: 'ch7',
    channel: '7',
    title: 'System Status',
    description: 'Master Bus · All Systems Operational',
    asset: 'assets/master-bus-ch7-optimized.webp',
    label: 'CH7 · MASTER BUS'
  }
];

// State
let currentIndex = 0;

// DOM Elements
const slideContainer = document.getElementById('slide-container');
const progressBar = document.getElementById('progress-bar');

// Initialize slides
function initSlides() {
  playlist.forEach((slide, index) => {
    const slideEl = createSlideElement(slide, index === 0);
    slideContainer.appendChild(slideEl);
  });
}

// Create slide element
function createSlideElement(slide, isActive) {
  const slideDiv = document.createElement('div');
  slideDiv.className = `slide ${isActive ? 'active' : ''}`;
  slideDiv.dataset.channel = slide.channel;
  slideDiv.dataset.index = playlist.indexOf(slide);
  
  slideDiv.innerHTML = `
    <!-- Layer 1: Background Glow -->
    <div class="slide-bg-glow"></div>
    
    <!-- Layer 2: Asset -->
    <img src="${slide.asset}" alt="${slide.title}" class="slide-asset" loading="lazy" />
    
    <!-- Layer 3: Grain Filter -->
    <div class="slide-grain"></div>
    
    <!-- Layer 4: UI Overlay -->
    <div class="slide-ui-overlay">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <span class="slide-label">${slide.label}</span>
        <div class="status-led"></div>
      </div>
      
      <div class="slide-content">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-description">${slide.description}</p>
      </div>
    </div>
  `;
  
  return slideDiv;
}

// Transition to next slide
function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  const currentSlide = slides[currentIndex];
  
  // Calculate next index
  const nextIndex = (currentIndex + 1) % playlist.length;
  const nextSlide = slides[nextIndex];
  
  // Fade out current
  currentSlide.classList.remove('active');
  
  // Fade in next after delay
  setTimeout(() => {
    nextSlide.classList.add('active');
    currentIndex = nextIndex;
  }, FADE_DURATION);
  
  // Restart progress bar animation
  restartProgressBar();
}

// Restart progress bar
function restartProgressBar() {
  progressBar.classList.add('restart');
  void progressBar.offsetWidth; // Trigger reflow
  progressBar.classList.remove('restart');
  progressBar.style.animation = 'none';
  void progressBar.offsetWidth; // Trigger reflow
  progressBar.style.animation = `progress ${SLIDE_DURATION}ms linear forwards`;
}

// Start the loop
function startLoop() {
  // Initial progress bar
  restartProgressBar();
  
  // Set interval for slide changes
  setInterval(() => {
    nextSlide();
  }, SLIDE_DURATION);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSlides();
  startLoop();
});

// Error handling for missing assets
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    console.error('Failed to load asset:', e.target.src);
    // Optionally: Replace with fallback image or text
    e.target.style.display = 'none';
  }
}, true);
