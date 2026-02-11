/**
 * RackNav - Sticky Navigation for Quick Access
 * Phase 2 Enhancement: Quick scroll links to major services
 * Design: Minimal, hardware-inspired, sage green aesthetic
 * NOTE: Pure JavaScript (no React hooks) - loads via client-side script
 */

// This component is injected as a static element
// Visibility and scroll behavior handled by inline script

export const RackNav = () => {
  return (
    <>
      <nav class="rack-nav" id="rack-nav" style="display: none;">
        <button onclick="scrollToRackRow(2)" class="rack-nav-button">
          <span class="rack-nav-led" />
          Book
        </button>
        <button onclick="scrollToRackRow(5)" class="rack-nav-button">
          <span class="rack-nav-led" />
          Studio
        </button>
        <button onclick="scrollToRackRow(9)" class="rack-nav-button">
          <span class="rack-nav-led" />
          Café
        </button>
        <button onclick="scrollToRackRow(11)" class="rack-nav-button">
          <span class="rack-nav-led" />
          Contact
        </button>
        <button onclick="scrollToRackRow(12)" class="rack-nav-button">
          <span class="rack-nav-led" />
          Status
        </button>
      </nav>

      {/* Inline script for sticky nav behavior */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const nav = document.getElementById('rack-nav');
            
            // Show/hide based on scroll position
            window.addEventListener('scroll', function() {
              const shouldShow = window.scrollY > 600;
              nav.style.display = shouldShow ? 'flex' : 'none';
            });

            // Smooth scroll to rack module
            window.scrollToRackRow = function(row) {
              const modules = document.querySelectorAll('.rack-module');
              if (modules[row - 1]) {
                modules[row - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            };
          })();
        `
      }} />
    </>
  );
};
