export const Header = () => (
  <>
    {/* MASTER RACK HEADER: 1U Rack Unit AT THE TOP */}
    <div class="rack-header-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
        alt="Cowley Road Studios Master Rack" 
        class="rack-header-img"
      />
    </div>
    
    <header class="rack-header">
      {/* MOBILE MENU TOGGLE */}
      <button class="mobile-menu-toggle" aria-label="Open menu">
        <span class="hamburger-icon">☰</span>
      </button>
      
      {/* NAVIGATION */}
      <nav class="rack-header-nav">
        <a href="/studio">Studio</a>
        <span class="separator">|</span>
        <a href="/workshop-cafe">Workshop Café</a>
        <span class="separator">|</span>
        <a href="/av-services">AV</a>
        <span class="separator">|</span>
        <a href="/about">About</a>
        <span class="separator">|</span>
        <a href="/work">Work</a>
        <span class="separator">|</span>
        <a href="/contact">Contact</a>
      </nav>
      
      {/* RIGHT ZONE: Book Now (Action) */}
      <div class="rack-header-cta" style="position: relative;">
        <button 
          class="book-dropdown-trigger"
          data-dropdown-trigger
          aria-expanded="false"
          aria-controls="book-dropdown-menu"
        >
          BOOK NOW
        </button>
        <div 
          id="book-dropdown-menu"
          class="book-dropdown-menu"
          data-dropdown-menu
          role="menu"
          aria-hidden="true"
        >
          <a href="/book" role="menuitem"><span class="signal-active"></span>Studio & Rehearsal</a>
          <a href="/contact?service=av" role="menuitem">AV Services (Enquiry)</a>
          <a href="/contact?service=venue" role="menuitem">Venue Hire (Enquiry)</a>
          <a href="/contact?service=repairs" role="menuitem">Repairs (Enquiry)</a>
        </div>
      </div>
    </header>
  </>
)
