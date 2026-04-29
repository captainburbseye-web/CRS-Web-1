/**
 * AV Services Page - Rack-Based Structure
 * No templates, no headers/footers - pure rack aesthetic
 */

export const AVServicesPage = () => (
  <div class="master-rack-chassis">
    {/* Skip to content for accessibility */}
    <a href="#av-services-content" class="skip-to-content">Skip to main content</a>

    {/* BACK TO HOME RACK */}
    <div style="padding: 1rem 0; text-align: center; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(212,160,23,0.2);">
      <a 
        href="/" 
        style="color: var(--mustard, #d4a017); font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;"
      >
        ← HOME
      </a>
    </div>

    {/* AV SERVICES HEADER RACK */}
    <div 
      id="av-services-content"
      class="rack-module-graphic" 
      style="
        background: linear-gradient(180deg, #0A0A0A 0%, #1a1a1a 100%);
        padding: 3rem 2rem;
        text-align: center;
        border-bottom: 2px solid rgba(212,160,23,0.3);
      "
    >
      <h1 
        style="
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--mustard, #d4a017);
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        "
      >
        AV SERVICES
      </h1>
      <p 
        style="
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          color: rgba(245,245,245,0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        "
      >
        Live sound, installations, hybrid events, and technical support. Engineer-led. Field-tested. Zero compromises.
      </p>
    </div>

    {/* WHAT WE DO RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: rgba(0,0,0,0.3);
        padding: 3rem 2rem;
        margin: 0;
        border-bottom: 1px solid rgba(212,160,23,0.2);
      "
    >
      <div style="max-width: 900px; margin: 0 auto;">
        <h2 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            color: var(--mustard, #d4a017);
            text-transform: uppercase;
            margin-bottom: 2rem;
            font-weight: 700;
          "
        >
          /// WHAT WE DO
        </h2>
        <ul style="list-style: none; padding: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 2; color: rgba(245,245,245,0.9);">
          <li style="margin-bottom: 0.75rem;">→ Live sound for talks, gigs, launches, and community events</li>
          <li style="margin-bottom: 0.75rem;">→ Temporary and permanent AV installations</li>
          <li style="margin-bottom: 0.75rem;">→ Hybrid and streamed events</li>
          <li style="margin-bottom: 0.75rem;">→ On-site engineers and technical support</li>
        </ul>
        <p style="margin-top: 1.5rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.85); font-style: italic;">
          Every job is handled in-house by people who do this for real.
        </p>
      </div>
    </div>

    {/* HOW IT WORKS RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: rgba(0,0,0,0.5);
        padding: 3rem 2rem;
        margin: 0;
        border-bottom: 1px solid rgba(212,160,23,0.2);
      "
    >
      <div style="max-width: 900px; margin: 0 auto;">
        <h2 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            color: var(--mustard, #d4a017);
            text-transform: uppercase;
            margin-bottom: 2rem;
            font-weight: 700;
          "
        >
          /// HOW IT WORKS
        </h2>
        <ol style="padding-left: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 2; color: rgba(245,245,245,0.9);">
          <li style="margin-bottom: 0.75rem;">You tell us what's happening</li>
          <li style="margin-bottom: 0.75rem;">We assess the space and requirements</li>
          <li style="margin-bottom: 0.75rem;">We handle the technical side</li>
          <li style="margin-bottom: 0.75rem;">The event runs smoothly</li>
        </ol>
        <p style="margin-top: 1.5rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.85); font-style: italic;">
          You focus on the room. We handle the signal.
        </p>
      </div>
    </div>

    {/* CAPABILITY RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: rgba(0,0,0,0.3);
        padding: 3rem 2rem;
        margin: 0;
        border-bottom: 1px solid rgba(212,160,23,0.2);
      "
    >
      <div style="max-width: 900px; margin: 0 auto;">
        <h2 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            color: var(--mustard, #d4a017);
            text-transform: uppercase;
            margin-bottom: 2rem;
            font-weight: 700;
          "
        >
          /// CAPABILITY
        </h2>
        <ul style="list-style: none; padding: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 2; color: rgba(245,245,245,0.9);">
          <li style="margin-bottom: 0.75rem;">→ Built for live pressure</li>
          <li style="margin-bottom: 0.75rem;">→ Engineered signal paths</li>
          <li style="margin-bottom: 0.75rem;">→ Calm under failure conditions</li>
          <li style="margin-bottom: 0.75rem;">→ Human-led, not automated</li>
        </ul>
      </div>
    </div>

    {/* TECHNICAL OPERATIONS RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: rgba(0,0,0,0.5);
        padding: 3rem 2rem;
        margin: 0;
        border-bottom: 1px solid rgba(212,160,23,0.2);
      "
    >
      <div style="max-width: 900px; margin: 0 auto;">
        <h2 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            color: var(--mustard, #d4a017);
            text-transform: uppercase;
            margin-bottom: 2rem;
            font-weight: 700;
          "
        >
          /// TECHNICAL OPERATIONS
        </h2>
        <p style="margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.9);">
          CRS provides ongoing technical management and AV support for external venues.
        </p>
        <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: rgba(245,245,245,0.7);">
          Current supported sites:
        </p>
        <ul style="list-style: none; padding: 0; font-size: 0.875rem; color: rgba(245,245,245,0.6); font-family: 'JetBrains Mono', monospace;">
          <li style="margin-bottom: 0.25rem;">– Bossaphonik</li>
          <li style="margin-bottom: 0.25rem;">– The King's Centre</li>
          <li style="margin-bottom: 0.25rem;">– Cowley Workers' Club</li>
        </ul>
      </div>
    </div>

    {/* PRICING CONTEXT RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: rgba(0,0,0,0.3);
        padding: 3rem 2rem;
        margin: 0;
        border-bottom: 1px solid rgba(212,160,23,0.2);
      "
    >
      <div style="max-width: 900px; margin: 0 auto;">
        <h2 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            color: var(--mustard, #d4a017);
            text-transform: uppercase;
            margin-bottom: 2rem;
            font-weight: 700;
          "
        >
          /// PRICING CONTEXT
        </h2>
        <p style="margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.9);">
          AV services are quoted per project. Typical jobs range from <strong style="color: var(--mustard, #d4a017);">£250–£1,500</strong> depending on scale and equipment requirements.
        </p>
        <p style="font-size: 0.9375rem; color: rgba(245,245,245,0.85); line-height: 1.6; font-family: 'JetBrains Mono', monospace;">
          Use the contact form to outline your event and production needs for a quote.
        </p>
      </div>
    </div>

    {/* REPAIRS BRIDGE RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: rgba(0,0,0,0.5);
        padding: 3rem 2rem;
        margin: 0;
        border-bottom: 2px solid rgba(212,160,23,0.3);
      "
    >
      <div style="max-width: 700px; margin: 0 auto; text-align: center;">
        <p 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 1rem;
            line-height: 1.6;
            color: rgba(245,245,245,0.9);
            margin-bottom: 2rem;
            font-style: italic;
          "
        >
          Behind every clean live setup is a deep technical bench.
        </p>
        <a 
          href="/av-services/repairs" 
          style="
            display: inline-block;
            padding: 1rem 2rem;
            background: var(--mustard, #d4a017);
            color: #000;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            text-decoration: none;
            transition: all 0.2s ease;
          "
        >
          REPAIRS & TECHNICAL BENCH
        </a>
      </div>
    </div>

    {/* CONTACT CTA RACK */}
    <div 
      class="rack-module-graphic" 
      style="
        background: linear-gradient(180deg, #1a1a1a 0%, #0A0A0A 100%);
        padding: 3rem 2rem;
        text-align: center;
      "
    >
      <a 
        href="/contact?enquiry=av" 
        style="
          display: inline-block;
          padding: 1.25rem 3rem;
          background: var(--mustard, #d4a017);
          color: #000;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.2s ease;
        "
      >
        [ REQUEST AV QUOTE ]
      </a>
    </div>

    {/* FOOTER */}
    <footer class="site-footer">
      <div class="terminal-status-footer">
        <div class="terminal-status-section">
          <div class="terminal-status-label">COWLEY ROAD STUDIOS</div>
          <div class="terminal-status-line" style="font-weight: 600; margin-bottom: 0.5rem;">
            Independent Recording Studio & Rehearsal Rooms – Oxford
          </div>
          <div class="terminal-status-line">118 Cowley Road, Oxford</div>
          <div class="terminal-status-line" style="margin-top: 0.75rem;">
            <a href="tel:+441865722027">+44 (0)1865 722027</a>
          </div>
          <div class="terminal-status-line">
            <a href="mailto:info@crsoxford.com">info@crsoxford.com</a>
          </div>
        </div>

        <div class="terminal-status-section">
          <div class="terminal-status-label">CONNECT</div>
          <div class="terminal-status-line">
            <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">Instagram</a>
          </div>
          <div class="terminal-status-line">
            <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener">
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
)
