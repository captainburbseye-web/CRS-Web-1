/** @jsxImportSource react */
import React from 'react';

// ==========================================
// 1. HARDWARE PRIMITIVES & MICRO-BRANDING
// ==========================================

const HexBolt = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`srd-bolt ${className}`} aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#444" stroke="#111" strokeWidth="4"/>
    <circle cx="50" cy="50" r="25" fill="#222" />
    <circle cx="50" cy="50" r="15" fill="#111" />
  </svg>
);

const BrandBadge = ({ kind, className = "" }) => {
  if (kind === "crs") {
    return (
      <div aria-hidden="true" className={`crs-badge-mini ${className}`}>
        <div className="crs-badge-mini-text">CRS</div>
        <div className="crs-badge-mini-bars">
          <div className="crs-badge-mini-bar crs-badge-mini-bar--green"></div>
          <div className="crs-badge-mini-bar crs-badge-mini-bar--red"></div>
        </div>
      </div>
    );
  }
  if (kind === "cricket") {
    return (
      <div aria-hidden="true" className={`cricket-badge-mini ${className}`}>
        <img src="/static/cricket-logo.png" alt="Cricket" className="cricket-badge-mini-img" />
      </div>
    );
  }
  if (kind === "odro") {
    return (
      <div aria-hidden="true" className={`srd-badge srd-badge--odro ${className}`}>
        <span className="srd-badge-text">AV</span>
      </div>
    );
  }
  if (kind === "cafe") {
    return (
      <div aria-hidden="true" className={`srd-badge srd-badge--cafe ${className}`}>
        <span className="srd-badge-text">W/C</span>
      </div>
    );
  }
  return null;
};

const LedIndicator = ({ variant, active = false }) => {
  const ledClass = active 
    ? `srd-led srd-led--${variant}-on`
    : `srd-led srd-led--${variant}-off`;
  return (
    <div aria-hidden="true" className={ledClass} />
  );
};

const EngravedLabel = ({ children, id, className = "", style = {} }) => (
  <h2 
    id={id} 
    className={`srd-module-title ${className}`}
    style={style}
  >
    {children}
  </h2>
);

// ==========================================
// 2. IDENTITY MODULES — MANUFACTURER PLATE
// ==========================================

const SignalStripe = () => (
  <div className="srd-signal-group" aria-hidden="true" role="status" aria-label="System Status Indicators">
    <div className="srd-signal-bulb srd-signal-bulb--green" title="System Available">
      <div className="srd-bulb-glow"></div>
    </div>
    <div className="srd-signal-bulb srd-signal-bulb--gold" title="Workspace Active">
      <div className="srd-bulb-glow"></div>
    </div>
    <div className="srd-signal-bulb srd-signal-bulb--red" title="Recording Live">
      <div className="srd-bulb-glow"></div>
    </div>
  </div>
);

const CRSStreetSign = () => (
  <a href="/" className="crs-master-plate-link" aria-label="Return to Cowley Road Studios Home">
    <div className="crs-master-plate">
      <div className="crs-street-sign-line1">COWLEY ROAD</div>
      <div className="crs-street-sign-line2">STUDIOS</div>
    </div>
  </a>
);

const MasterFaceplate = () => (
  <header className="srd-master-faceplate">
    <div className="srd-faceplate-header">
      {/* Physical Location Strip */}
      <div className="srd-location-strip">
        118 COWLEY ROAD • OXFORD • OX4 1JE • UNITED KINGDOM
      </div>
      
      {/* Street Sign + Signal LEDs */}
      <div className="srd-faceplate-main">
        <div className="srd-faceplate-title-group">
          <CRSStreetSign />
          <SignalStripe />
        </div>
      </div>
    </div>
  </header>
);

const StatusPlacard = () => (
  <section className="srd-status-module">
    <div className="srd-lcd-screen">
      <div className="srd-lcd-content">
        <div className="srd-lcd-sysinfo">
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> DESTA-GEN3 ONLINE // GUARDIANS OF THE SIGNAL // PRESERVING OXFORD'S SOUND SYSTEM HERITAGE
        </div>
        <div className="srd-lcd-header">SELECT MODULE // CREATIVE OPERATING SYSTEM</div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-crs">●</span>
          <span>CRS = LEFT CHANNEL</span>
        </div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-cricket">●</span>
          <span>CRICKET = RIGHT CHANNEL</span>
        </div>
        <div className="srd-lcd-footer">118 COWLEY ROAD, OXFORD OX4 1JE • GUARDIANS OF THE SIGNAL • DESTA-GEN3 PRESERVATION // NO CHAOS MODE</div>
      </div>
    </div>
  </section>
);

// Sound System Signal Chain — Destination Sound Inspired
// CRS Creative Infrastructure Description
const SignalChainModule = () => (
  <section className="srd-module srd-module--sound-system" style={{ marginTop: '2rem', padding: '3rem 2rem' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      
      {/* Signal Strength Speakers (Traffic Light System) */}
      <div className="srd-signal-speakers">
        <div className="srd-speaker-cone srd-speaker-cone--green" title="Low Signal"></div>
        <div className="srd-speaker-cone srd-speaker-cone--yellow srd-speaker-cone--active" title="Mid Signal"></div>
        <div className="srd-speaker-cone srd-speaker-cone--orange" title="High Signal"></div>
      </div>

      {/* CRS Badge */}
      <div className="srd-destination-badge" title="CRS Sound System">
        CRS
      </div>

      {/* Sub-Bass Indicator */}
      <div className="srd-sub-indicator" title="Sub-Bass Activity">
        <div className="srd-sub-bar"></div>
        <div className="srd-sub-bar"></div>
        <div className="srd-sub-bar"></div>
        <div className="srd-sub-bar"></div>
        <div className="srd-sub-bar"></div>
        <div className="srd-sub-bar"></div>
      </div>

      {/* Creative Infrastructure Description */}
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
        lineHeight: '1.6',
        color: '#fff',
        fontSize: '16px',
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#ff5522',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Oxford Creative Infrastructure
        </div>
        
        <p style={{ margin: '0 0 1rem 0' }}>
          <strong style={{ color: '#ffd700' }}>Recording Studios</strong> at 118 Cowley Road from £35/hr. 
          Multi-track sessions, vocal tracking, analog-hybrid mixing.
        </p>
        
        <p style={{ margin: '0 0 1rem 0' }}>
          <strong style={{ color: '#ffd700' }}>Rehearsal Spaces</strong> at Cricket Road from £40/2hr. 
          Acoustically treated rooms for band practice and pre-production.
        </p>
        
        <p style={{ margin: '0 0 1rem 0' }}>
          <strong style={{ color: '#ffd700' }}>Control Room Hire</strong> from £20/hr. 
          Hybrid studio access for independent producers.
        </p>
        
        <p style={{ margin: '0 0 1rem 0' }}>
          <strong style={{ color: '#ffd700' }}>Workshop Café</strong> venue hire £150/5hr. 
          Creative hub and community space opening April 2026.
        </p>
        
        <p style={{ margin: '0 0 1rem 0' }}>
          <strong style={{ color: '#ffd700' }}>ODRO Engineering</strong> AV servicing and repairs. 
          Protecting the signal chain across Oxford venues.
        </p>
        
        <div style={{
          marginTop: '2rem',
          fontSize: '14px',
          fontWeight: 700,
          color: '#ff5522',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          Guardians of the Signal • Est. 2012 • Grassroots Infrastructure
        </div>
      </div>
    </div>
  </section>
);

// Entry Action CTA — Emergency Start Button
const EntryActionCTA = () => (
  <section className="srd-entry-action">
    <a href="#modules" className="srd-emergency-btn">
      <span className="srd-emergency-label">EXPLORE THE SYSTEM</span>
      <span className="srd-emergency-icon">▶</span>
    </a>
  </section>
);

// Top Mounting Rail — Site Header
const TopRail = () => (
  <div className="srd-top-rail">
    <div className="srd-rail-meta">EST. 2012 | OXFORD UK</div>
  </div>
);

// UNIT 0: Identity Plate (SEO Integration) 
const IdentityPlate = () => (
  <section className="srd-unit-0" aria-label="Unit Identification" style={{ display: 'none' }}>
  </section>
);

// ==========================================
// 3. MAIN PAGE ASSEMBLY
// ==========================================

export default function StudioServicesRack() {
  return (
    <main className="srd-page">
      <TopRail />
      
      <RackChassis>
        <IdentityPlate />
        <MasterFaceplate />
        <StatusPlacard />
        <SignalChainModule />
      </RackChassis>
      
      {/* Technical Manual SEO Footer */}
      <section className="tech-manual-footer">
        <div className="manual-header">DOCUMENTATION // REF: 118-CR-OX4</div>
        
        <h2>Recording Studio & Rehearsal Rooms in Oxford</h2>
        <p>
          Cowley Road Studios (CRS) provides the <strong>grassroots infrastructure</strong> for the Oxford music scene. 
          Located at <strong>118 Cowley Road</strong>, our facility offers professional <strong>recording sessions</strong>, 
          vocal tracking, and analog-hybrid mixing. 
        </p>

        <p>
          Our network extends to managed <strong>rehearsal rooms at Cricket Road</strong>, providing acoustically treated 
          spaces for band practice, pre-production, and creative development. The <strong>Workshop Café</strong> serves 
          as our on-site creative hub and community venue for the OX4 area.
        </p>

        <div className="manual-specs">
          <span>LOCATION: 118 COWLEY ROAD, OXFORD, OX4 1JE</span>
          <span>NETWORK: CRICKET ROAD / WORKSHOP CAFÉ</span>
          <span>ESTABLISHED: 2012</span>
        </div>
      </section>
    </main>
  );
}
