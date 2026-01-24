export const Footer = () => (
  <>
    {/* MOBILE NAVIGATION (FIXED BOTTOM) */}
    <nav class="mobile-nav mono">
      <a href="/locations">LOCATIONS</a>
      <a href="/book">BOOK</a>
      <a href="/contact">CONTACT</a>
    </nav>

    <footer class="crs-footer-technical mono">
      {/* Technical Footer: Legal-Spec Datasheet Format */}
      <div class="footer-metadata">
        
        {/* Revision Header */}
        <div class="footer-revision-header">
          <p class="footer-revision-id">CRS-SYS-FOOTER v1.2</p>
          <p class="footer-revision-date">LAST REVISED: 2026-01-21</p>
        </div>
        
        {/* Section Label */}
        <p class="footer-section-label">OPERATIONAL PARAMETERS</p>
        
        {/* Primary Entity */}
        <div class="footer-data-block">
          <p class="footer-data-line">COWLEY ROAD STUDIOS (CRS) · 118 Cowley Road, Oxford, OX4 1JE, United Kingdom</p>
          <p class="footer-data-line">COORDINATES: 51.7436 N, 1.2304 W</p>
        </div>
        
        {/* System Status */}
        <div class="footer-data-block">
          <p class="footer-data-label">STATUS</p>
          <p class="footer-data-line">Hybrid commissioning. Infrastructure operational. Build phase in progress.</p>
        </div>
        
        {/* Operating Protocol */}
        <div class="footer-data-block">
          <p class="footer-data-label">PROTOCOL</p>
          <p class="footer-data-line">No-chaos operation. Scheduled access only. Signal-managed capacity. Unallocated entry not supported.</p>
        </div>
        
        {/* Access Terms */}
        <div class="footer-data-block">
          <p class="footer-data-label">ACCESS</p>
          <p class="footer-data-line">Studio sessions: allocation-based. Dry hire: subject to clearance. Public services: within posted parameters.</p>
        </div>
        
        {/* Contact */}
        <div class="footer-data-block">
          <p class="footer-data-label">CONTACT</p>
          <p class="footer-data-line">✉️ <a href="mailto:info@crsoxford.com" class="footer-link">info@crsoxford.com</a></p>
          <p class="footer-data-line">☎️ <a href="tel:+441865722027" class="footer-link">+44 (0)1865 722027</a></p>
          <p class="footer-data-line">📸 <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener" class="footer-link">@cowleyroadstudios.ox</a></p>
          <p class="footer-data-line">🔗 <a href="https://facebook.com/cowleyroadstudios" target="_blank" rel="noopener" class="footer-link">facebook.com/cowleyroadstudios</a></p>
        </div>
        
        {/* System Signature */}
        <div class="footer-data-block footer-signature-block">
          <p class="footer-data-line">© 2026 CRS · POWERED BY <span class="footer-highlight">0DR0</span> ENGINEERING</p>
        </div>
        
      </div>
    </footer>

    {/* FOOTER TERMINATION PANEL: 1U Rack Unit at Bottom */}
    <div class="rack-footer-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20BOTTOM.png" 
        alt="Cowley Road Studios Footer Rack" 
        class="rack-footer-img"
        aria-label="Footer: OX4 Studio Network - No Chaos Policy - System Ready. Cowley Road Studios, Oxford."
      />
    </div>
  </>
)
