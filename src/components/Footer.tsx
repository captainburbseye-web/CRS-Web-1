export const Footer = () => (
  <>
    {/* MOBILE NAVIGATION (FIXED BOTTOM) */}
    <nav class="mobile-nav mono">
      <a href="/locations">LOCATIONS</a>
      <a href="/book">BOOK</a>
      <a href="/contact">CONTACT</a>
    </nav>

    {/* RACK FOOTER — HORIZONTAL BACK PANEL */}
    <footer class="site-footer">
      <div class="rack-footer">
        <div class="rack-footer-row">
          
          {/* LOCATION */}
          <div class="rack-footer-item">
            <span class="rack-footer-label">LOCATION</span>
            <span>118 Cowley Road · Oxford</span>
          </div>

          {/* STATUS */}
          <div class="rack-footer-item">
            <span class="rack-footer-label">STATUS</span>
            <span>Operational</span>
          </div>

          {/* CONTACT */}
          <div class="rack-footer-item">
            <span class="rack-footer-label">CONTACT</span>
            <a href="mailto:info@crsoxford.com">info@crsoxford.com</a>
          </div>

          {/* PHONE */}
          <div class="rack-footer-item">
            <span class="rack-footer-label">PHONE</span>
            <a href="tel:+441865722027">+44 1865 722027</a>
          </div>

          {/* SOCIAL */}
          <div class="rack-footer-item">
            <span class="rack-footer-label">SOCIAL</span>
            <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">@cowleyroadstudios.ox</a>
          </div>

          {/* COPYRIGHT */}
          <div class="rack-footer-item">
            <span class="rack-footer-label">© 2026</span>
            <span>CRS · 0DR0 ENGINEERING</span>
          </div>

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

    {/* REVISION STAMP: Manufacturing metadata - absolute bottom like chassis serial */}
    <div class="footer-revision-stamp">
      <p class="revision-stamp-text">CRS-SYS-FOOTER v2.0 · RACK FOOTER NORMALISATION</p>
    </div>
  </>
)
