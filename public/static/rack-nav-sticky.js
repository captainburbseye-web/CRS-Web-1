/**
 * Sticky Rack Navigation
 * Hardware-inspired section tracker with glowing LED indicators
 */

(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRackNav);
  } else {
    initRackNav();
  }

  function initRackNav() {
    // Check if we're on a page that should have rack nav
    if (!document.querySelector('.master-rack-chassis')) {
      return;
    }

    // Create sticky nav HTML
    const navHTML = `
      <nav class="rack-nav-sticky" id="rack-nav-sticky" aria-label="Section navigation">
        <div class="rack-nav-inner">
          <div class="rack-nav-logo">CRS RACK</div>
          <div class="rack-nav-sections" role="navigation">
            <a href="#cowley-services" class="rack-nav-item" data-section="cowley-services">
              <span class="rack-nav-led" aria-hidden="true"></span>
              <span>COWLEY</span>
            </a>
            <a href="#cricket-services" class="rack-nav-item" data-section="cricket-services">
              <span class="rack-nav-led" aria-hidden="true"></span>
              <span>CRICKET</span>
            </a>
            <a href="#rehearsal" class="rack-nav-item" data-section="rehearsal">
              <span class="rack-nav-led" aria-hidden="true"></span>
              <span>REH</span>
            </a>
            <a href="#control-room" class="rack-nav-item" data-section="control-room">
              <span class="rack-nav-led" aria-hidden="true"></span>
              <span>CTRL</span>
            </a>
            <a href="#workshop-cafe" class="rack-nav-item" data-section="cafe">
              <span class="rack-nav-led" aria-hidden="true"></span>
              <span>CAFÉ</span>
            </a>
            <a href="/contact" class="rack-nav-item" data-section="contact">
              <span class="rack-nav-led" aria-hidden="true"></span>
              <span>CONTACT</span>
            </a>
          </div>
          <a href="#services" class="rack-nav-cta">BOOK NOW</a>
        </div>
        <div class="rack-nav-progress" aria-hidden="true"></div>
      </nav>
    `;

    // Insert nav at top of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    const nav = document.getElementById('rack-nav-sticky');
    const progressBar = nav.querySelector('.rack-nav-progress');
    const navItems = nav.querySelectorAll('.rack-nav-item');
    
    let isVisible = false;
    let ticking = false;

    // Show/hide nav on scroll
    function updateNav() {
      const scrollY = window.scrollY || window.pageYOffset;
      const shouldShow = scrollY > 300;

      if (shouldShow !== isVisible) {
        isVisible = shouldShow;
        nav.classList.toggle('visible', isVisible);
      }

      // Update progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(scrollPercent, 100) + '%';

      // Update active section
      updateActiveSection();

      ticking = false;
    }

    // Find which section is currently in view
    function updateActiveSection() {
      const sections = [];
      navItems.forEach(item => {
        const sectionId = item.getAttribute('data-section');
        const element = document.getElementById(sectionId) || 
                       document.querySelector(`[data-section="${sectionId}"]`) ||
                       findSectionByContent(sectionId);
        if (element) {
          sections.push({
            element: element,
            navItem: item,
            top: element.getBoundingClientRect().top
          });
        }
      });

      // Find the section closest to the top of viewport
      let activeSection = null;
      sections.forEach(section => {
        if (section.top <= 150 && section.top > -500) {
          if (!activeSection || section.top > activeSection.top) {
            activeSection = section;
          }
        }
      });

      // Update active state
      navItems.forEach(item => item.classList.remove('active'));
      if (activeSection) {
        activeSection.navItem.classList.add('active');
      }
    }

    // Fallback: find section by content keywords
    function findSectionByContent(sectionId) {
      const keywords = {
        'cowley-services': ['cowley', 'cowley road services', 'recording'],
        'cricket-services': ['cricket', 'cricket road services'],
        'rehearsal': ['rehearsal', 'band', 'live room'],
        'control-room': ['control room', 'dry hire', 'monitoring'],
        'cafe': ['workshop', 'café', 'cafe', 'coffee'],
        'contact': ['contact', 'enquir']
      };

      const searchTerms = keywords[sectionId] || [];
      const blocks = document.querySelectorAll('.service-block, .rack-module-graphic');
      
      for (let block of blocks) {
        const text = block.textContent.toLowerCase();
        if (searchTerms.some(term => text.includes(term))) {
          // Add ID for future reference
          if (!block.id) {
            block.id = sectionId;
          }
          return block;
        }
      }
      return null;
    }

    // Throttled scroll handler
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }

    // Smooth scroll for nav links
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-section');
        const target = document.getElementById(targetId) || findSectionByContent(targetId);
        
        if (target) {
          const yOffset = -80; // Account for sticky nav height
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      });
    });

    // Listen for scroll
    window.addEventListener('scroll', onScroll, {passive: true});
    
    // Initial check
    updateNav();
  }
})();
