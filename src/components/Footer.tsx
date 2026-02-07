export const Footer = () => (
  <>
    {/* MOBILE NAVIGATION (FIXED BOTTOM) */}
    <nav class="mobile-nav mono">
      <a href="/locations">LOCATIONS</a>
      <a href="/book">BOOK</a>
      <a href="/contact">CONTACT</a>
    </nav>

    {/* FOOTER TERMINATION PANEL: 1U Rack Unit at Bottom */}
    <div class="rack-footer-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20BOTTOM.png" 
        alt="Cowley Road Studios Footer Rack" 
        class="rack-footer-img"
        aria-label="Footer: OX4 Studio Network - No Chaos Policy - System Ready. Cowley Road Studios, Oxford."
      />
    </div>

    {/* CONSOLIDATED FOOTER — ALL INFORMATION BELOW RACK VISUAL */}
    <footer class="site-footer">
      <div class="terminal-status-footer">
        
        {/* SYSTEM STATUS */}
        <div class="terminal-status-section">
          <div class="terminal-status-label">SYSTEM STATUS</div>
          <div class="terminal-status-line">MODE: OPERATIONAL</div>
          <div class="terminal-status-line">PHASE: COMMISSIONING</div>
          <div class="terminal-status-line">ACCESS: SCHEDULED ONLY</div>
          <div class="terminal-status-line">CAPACITY: SIGNAL-MANAGED</div>
          <div class="terminal-status-line">ENTRY: ALLOCATED ONLY</div>
        </div>

        {/* LOCATION */}
        <div class="terminal-status-section">
          <div class="terminal-status-label">LOCATION</div>
          <div class="terminal-status-line">118 COWLEY ROAD, OXFORD, OX4 1JE</div>
          <div class="terminal-status-line">COORDINATES: 51.7466 N, 1.2384 W</div>
        </div>

        {/* CONTACT */}
        <div class="terminal-status-section">
          <div class="terminal-status-label">CONTACT</div>
          <div class="terminal-status-line">EMAIL: <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></div>
          <div class="terminal-status-line">PHONE: <a href="tel:+441865722027">+44 1865 722027</a></div>
          <div class="terminal-status-line">SOCIAL: <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">@cowleyroadstudios.ox</a></div>
        </div>

        {/* TRUTH LINE */}
        <div class="terminal-status-section terminal-truth-line">
          <div class="terminal-status-line">Built by people restoring a working studio to Cowley Road, piece by piece.</div>
        </div>

        {/* COPYRIGHT & ENGINEERING */}
        <div class="terminal-status-section">
          <div class="terminal-status-line">© 2026 CRS · POWERED BY 0DR0 ENGINEERING</div>
        </div>

      </div>
    </footer>
  </>
)
