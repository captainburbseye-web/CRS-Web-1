/**
 * Equipment Repairs Page - Rack-Based Structure
 * No templates, no headers/footers - pure rack aesthetic
 */

export const AVRepairsPage = () => (
  <div class="master-rack-chassis">
    {/* Skip to content for accessibility */}
    <a href="#repairs-content" class="skip-to-content">Skip to main content</a>

    {/* BACK TO AV SERVICES */}
    <div style="padding: 1rem 0; text-align: center; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(212,160,23,0.2);">
      <a 
        href="/av-services" 
        style="color: var(--mustard, #d4a017); font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;"
      >
        ← BACK TO AV SERVICES
      </a>
    </div>

    {/* REPAIRS HEADER RACK */}
    <div 
      id="repairs-content"
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
        EQUIPMENT REPAIRS
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
        In-house repair bench. No cosmetic fixes. No guesswork. Diagnosis-led repair work by ODRO Engineering.
      </p>

      {/* STATUS NOTE */}
      <div 
        style="
          margin-top: 2rem;
          padding: 1rem 1.5rem;
          background: rgba(196, 30, 58, 0.2);
          border: 1px solid rgba(196, 30, 58, 0.4);
          border-radius: 4px;
          display: inline-block;
        "
      >
        <span 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            color: rgba(245,245,245,0.9);
          "
        >
          ⚠️ Repairs currently paused · 
          <a 
            href="/repairs/status" 
            style="
              color: var(--mustard, #d4a017);
              text-decoration: underline;
              margin-left: 0.5rem;
            "
          >
            View status
          </a>
        </span>
      </div>
    </div>

    {/* OVERVIEW RACK */}
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
          /// OVERVIEW
        </h2>
        <p style="margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.9);">
          Repairs and system fixes are handled in-house by our technical bench.
        </p>
        <p style="font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.85); font-style: italic; font-family: 'JetBrains Mono', monospace;">
          Led by <strong style="color: var(--mustard, #d4a017);">ODRO</strong>, our in-house engineer responsible for repairs and deep technical problem-solving.
        </p>
      </div>
    </div>

    {/* WHAT WE REPAIR RACK */}
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
          /// WHAT WE REPAIR
        </h2>
        <ul style="list-style: none; padding: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 2; color: rgba(245,245,245,0.9);">
          <li style="margin-bottom: 0.75rem;">→ Mixers and interfaces</li>
          <li style="margin-bottom: 0.75rem;">→ Amplifiers and speakers</li>
          <li style="margin-bottom: 0.75rem;">→ Cabling and connectors</li>
          <li style="margin-bottom: 0.75rem;">→ Power and signal faults</li>
        </ul>
        <p style="margin-top: 1.5rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.85); font-family: 'JetBrains Mono', monospace;">
          If it's part of a signal chain, we'll assess it honestly.
        </p>
      </div>
    </div>

    {/* THE PROCESS RACK */}
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
          /// THE PROCESS
        </h2>
        <ol style="padding-left: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; line-height: 2; color: rgba(245,245,245,0.9);">
          <li style="margin-bottom: 0.75rem;">Diagnose</li>
          <li style="margin-bottom: 0.75rem;">Repair</li>
          <li style="margin-bottom: 0.75rem;">Test</li>
          <li style="margin-bottom: 0.75rem;">Return</li>
        </ol>
        <p style="margin-top: 1.5rem; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,245,0.85); font-family: 'JetBrains Mono', monospace;">
          No cosmetic fixes. No guesswork.
        </p>
        <div 
          style="
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(212,160,23,0.1);
            border-left: 3px solid var(--mustard, #d4a017);
          "
        >
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245,245,245,0.9);">
            <strong style="color: var(--mustard, #d4a017);">REPAIR DIAGNOSTICS:</strong> £60 flat rate (credited toward repair if you proceed)
          </p>
        </div>
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
        href="/contact?enquiry=repairs" 
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
        [ START REPAIR ENQUIRY ]
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
