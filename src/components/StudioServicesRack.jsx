/** @jsxImportSource react */
import React from 'react';

// ==========================================
// STUDIO SERVICES RACK - Restored to uploaded HTML version
// Green/Purple dual-channel button layout
// ==========================================

// ==========================================
// SQUARE BOOKING URLS
// ==========================================
const SQUARE_URLS = {
  COWLEY_REC: "https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX",
  CRICKET_REC: "https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX",
  COWLEY_REHEARSAL: "https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX",
  CRICKET_REHEARSAL: "https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX",
  COWLEY_CTRL: "https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX",
  CRICKET_CTRL: "https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX",
  WORKSHOP_CAFE: "https://crsoxford.com/book",
};

// ==========================================
// 1. HARDWARE PRIMITIVES
// ==========================================

const HexBolt = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`srd-bolt ${className}`} aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#444" stroke="#111" strokeWidth="4"/>
    <circle cx="50" cy="50" r="25" fill="#222" />
    <circle cx="50" cy="50" r="15" fill="#111" />
  </svg>
);

const RackRail = ({ side = "left" }) => {
  const bolts = Array(12).fill(null);
  return (
    <div className={`srd-rail ${side === "right" ? "srd-rail--right" : ""}`} aria-hidden="true">
      {bolts.map((_, i) => <HexBolt key={i} />)}
    </div>
  );
};

// ==========================================
// 2. VU METER
// ==========================================

const VuMeter = ({ label = "L" }) => (
  <div className={`srd-vu srd-vu--${label.toLowerCase()}`} aria-hidden="true">
    <div className="srd-vu-body">
      <div className="srd-vu-face">
        <div className="srd-vu-glow"></div>
        <svg viewBox="0 0 100 50" className="srd-vu-scale">
          <path d="M 15 45 A 35 35 0 0 1 85 45" fill="none" stroke="#222" strokeWidth="0.5" />
          <line x1="22" y1="32" x2="24" y2="35" stroke="#222" strokeWidth="1" />
          <line x1="35" y1="20" x2="36" y2="24" stroke="#222" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="20" stroke="#222" strokeWidth="1.5" />
          <line x1="65" y1="20" x2="64" y2="24" stroke="#222" strokeWidth="1" />
          <line x1="78" y1="32" x2="76" y2="35" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M 72 26 A 35 35 0 0 1 85 45" fill="none" stroke="#dc2626" strokeWidth="2" />
        </svg>
        <div className="srd-vu-needle">
          <div className="srd-vu-needle-tip"></div>
        </div>
        <div className="srd-vu-needle-pivot"></div>
        <span className="srd-vu-label">{label}</span>
        <div className="srd-vu-shine"></div>
      </div>
    </div>
  </div>
);

const VuMeterPair = () => (
  <div className="srd-meters">
    <VuMeter label="L" />
    <VuMeter label="R" />
  </div>
);

// ==========================================
// 3. BADGES
// ==========================================

const CrsBadge = ({ className = "" }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--crs ${className}`}>
    <svg viewBox="0 0 24 24" className="srd-badge-svg">
      <path d="M4 4 L12 2 L20 4 L20 12 L12 22 L4 12 Z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="bevel" />
      <circle cx="12" cy="12" r="3" fill="white" />
    </svg>
  </div>
);

const CricketBadge = ({ className = "" }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--cricket ${className}`}>
    <img src="/static/cricket-logo.png" alt="Cricket" className="cricket-badge-img" />
  </div>
);

const OdroBadge = ({ className = "" }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--odro ${className}`}>
    <span className="srd-badge-text">AV</span>
  </div>
);

const CafeBadge = ({ className = "" }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--cafe ${className}`}>
    <span className="srd-badge-text">W/C</span>
  </div>
);

// ==========================================
// 4. LED INDICATORS
// ==========================================

const Led = ({ variant = "crs" }) => (
  <div aria-hidden="true" className={`srd-led srd-led--${variant}-off`} />
);

// ==========================================
// 5. SERVICE BUTTONS - Green CRS / Purple Cricket
// ==========================================

const ServiceButton = ({ variant = "crs", service, location, href, badge, onClick, type = "link" }) => {
  const ButtonTag = type === "button" ? "button" : "a";
  const props = type === "button" 
    ? { type: "button", onClick } 
    : { href, target: href?.startsWith("http") ? "_blank" : undefined, rel: href?.startsWith("http") ? "noopener noreferrer" : undefined };
  
  const ariaLabel = location 
    ? `Book ${variant === 'crs' ? 'CRS' : 'Cricket'} ${service} at ${location}`
    : service;

  return (
    <ButtonTag className={`srd-btn srd-btn--${variant}`} aria-label={ariaLabel} {...props}>
      <div className="srd-btn-content">
        {badge}
        <div className="srd-btn-labels">
          <span className="srd-btn-service">{service}</span>
          {location && <span className="srd-btn-location">{location}</span>}
        </div>
      </div>
      <Led variant={variant} />
    </ButtonTag>
  );
};

// ==========================================
// 6. TOP RAIL
// ==========================================

const TopRail = () => (
  <div className="srd-top-rail">
    <div className="srd-home-indicator">HOME</div>
    <div className="srd-rail-address">118 COWLEY ROAD | OXFORD | OX4 1JE</div>
    <div className="srd-rail-meta">EST. 2012 | OXFORD UK</div>
  </div>
);

// ==========================================
// 7. MASTER FACEPLATE
// ==========================================

const MasterFaceplate = () => (
  <header className="srd-master-faceplate">
    <div className="srd-faceplate-header">
      <div className="srd-location-strip">
        118 COWLEY ROAD • OXFORD • OX4 1JE • UNITED KINGDOM
      </div>
      <div className="srd-faceplate-main">
        <div className="srd-faceplate-title-group">
          <div className="srd-logo-plate" aria-label="CRS Logo">
            <img src="/static/crs-logo.png" alt="CRS" className="crs-logo-img" />
          </div>
          <div className="srd-signal-group" aria-hidden="true">
            <div className="srd-signal-dot srd-signal-dot--red"></div>
            <div className="srd-signal-dot srd-signal-dot--yellow"></div>
            <div className="srd-signal-dot srd-signal-dot--green"></div>
          </div>
          <div className="srd-faceplate-text-stack">
            <h1 className="srd-faceplate-title">
              <img 
                src="/static/crs-wooden-sign.png" 
                alt="Cowley Road Studios" 
                className="srd-wooden-sign-img"
              />
            </h1>
            <p className="srd-faceplate-subtitle">OXFORD GRASSROOTS CREATIVE INFRASTRUCTURE</p>
          </div>
        </div>
        <div className="srd-faceplate-meta">
          <div className="srd-meta-row">
            <div className="srd-faceplate-model">CRS-CONSOLE-01</div>
            <div className="srd-faceplate-routing">Audio • Rehearsal • Control</div>
            <div className="srd-micro-label">FIRMWARE: CAPTAIN BURBSEYE / TEST PASS: N0RLAND0B00M</div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// ==========================================
// 8. STATUS MODULE - LCD
// ==========================================

const StatusModule = () => (
  <section className="srd-status-module">
    <div className="srd-lcd-screen">
      <div className="srd-lcd-content">
        <div className="srd-lcd-sysinfo">
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> CRS INFRASTRUCTURE ACTIVE // RECORDING @ 118 COWLEY RD // REHEARSAL @ CRICKET ROAD (OX4 3DJ) // WORKSHOP CAFÉ OPENING APRIL 2026 // VENUE TECH ON-CALL
        </div>
        <div className="srd-lcd-header">SELECT SERVICE MODULE</div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-crs">●</span>
          <span>CRS = LEFT CHANNEL</span>
        </div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-cricket">●</span>
          <span>CRICKET = RIGHT CHANNEL</span>
        </div>
        <div className="srd-lcd-footer">DEEPEND PROTOCOL ACTIVE // NO CHAOS MODE</div>
      </div>
    </div>
  </section>
);

// ==========================================
// 9. SERVICE MODULES - Green/Purple Layout
// ==========================================

const RecordingModule = () => (
  <section className="srd-module srd-module--nettle" aria-labelledby="module-recording">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-recording" className="srd-module-title">Recording</h2>
        <p className="srd-module-subtitle">Cowley Road • 118 Cowley Rd • Main Studio & Control Room</p>
        <div className="srd-pricing">FROM £35/HR</div>
      </div>
      <VuMeterPair />
    </div>
    <div className="srd-btn-group">
      <ServiceButton
        variant="crs"
        service="Recording"
        location="Cowley Road"
        href={SQUARE_URLS.COWLEY_REC}
        badge={<CrsBadge />}
      />
      <ServiceButton
        variant="cricket"
        service="Recording"
        location="Cricket Road"
        href={SQUARE_URLS.CRICKET_REC}
        badge={<CricketBadge />}
      />
    </div>
  </section>
);

const RehearsalModule = () => (
  <section className="srd-module srd-module--purple" aria-labelledby="module-rehearsal">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-rehearsal" className="srd-module-title">Rehearsal</h2>
        <p className="srd-module-subtitle">Cricket Road • OX4 3DJ • Managed Production</p>
        <div className="srd-pricing">COWLEY £45/2HR • CRICKET £40/2HR</div>
      </div>
    </div>
    <div className="srd-btn-group">
      <ServiceButton
        variant="crs"
        service="Rehearsal"
        location="Cowley Road"
        href={SQUARE_URLS.COWLEY_REHEARSAL}
        badge={<CrsBadge />}
      />
      <ServiceButton
        variant="cricket"
        service="Rehearsal"
        location="Cricket Road"
        href={SQUARE_URLS.CRICKET_REHEARSAL}
        badge={<CricketBadge />}
      />
    </div>
  </section>
);

const ControlRoomModule = () => (
  <section className="srd-module srd-module--nettle" aria-labelledby="module-control-room">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-control-room" className="srd-module-title">Control Room</h2>
        <p className="srd-module-subtitle">Hybrid Studio Hire • Multi-Track Recording & Production</p>
        <div className="srd-pricing">COWLEY £20/HR • CRICKET £40/5HR</div>
      </div>
      <VuMeterPair />
    </div>
    <div className="srd-btn-group">
      <ServiceButton
        variant="crs"
        service="Control Room"
        location="Cowley Road"
        href={SQUARE_URLS.COWLEY_CTRL}
        badge={<CrsBadge />}
      />
      <ServiceButton
        variant="cricket"
        service="Control Room"
        location="Cricket Road"
        href={SQUARE_URLS.CRICKET_CTRL}
        badge={<CricketBadge />}
      />
    </div>
  </section>
);

// ==========================================
// 10. CRS AV SUPPORT MODULE - Vintage Rack Equipment Style
// ==========================================

const CrsAvSupportModule = () => (
  <section className="srd-module srd-module--av-rack" aria-labelledby="module-crs-av">
    {/* Corner rack mount holes */}
    <div className="av-rack-hole av-rack-hole--tl" aria-hidden="true"></div>
    <div className="av-rack-hole av-rack-hole--tr" aria-hidden="true"></div>
    <div className="av-rack-hole av-rack-hole--bl" aria-hidden="true"></div>
    <div className="av-rack-hole av-rack-hole--br" aria-hidden="true"></div>
    
    {/* Main Vintage Label Panel - Polaroid/Land style */}
    <div className="av-vintage-panel">
      {/* Left Logo Block */}
      <div className="av-logo-block">
        <span className="av-logo-main">CRS</span>
        <span className="av-logo-sub">AV</span>
      </div>
      
      {/* Rainbow Stripes - Iconic */}
      <div className="av-rainbow-stripes">
        <div className="av-rainbow av-rainbow--red"></div>
        <div className="av-rainbow av-rainbow--orange"></div>
        <div className="av-rainbow av-rainbow--yellow"></div>
        <div className="av-rainbow av-rainbow--green"></div>
        <div className="av-rainbow av-rainbow--blue"></div>
      </div>
      
      {/* Service Title */}
      <div className="av-service-block">
        <h2 id="module-crs-av" className="av-service-title">LIVE SERVICES</h2>
        <p className="av-service-sub">PRODUCTION • PA SYSTEMS • EVENTS</p>
      </div>
    </div>
    
    {/* Tech Specifications Bar */}
    <div className="av-spec-bar">
      <div className="av-spec-item">
        <span className="av-spec-label">MODEL</span>
        <span className="av-spec-value">LIVE-AV-02</span>
      </div>
      <div className="av-spec-led" aria-hidden="true">
        <span className="av-spec-led-label">PWR</span>
        <div className="av-spec-led-light"></div>
      </div>
      <div className="av-spec-item">
        <span className="av-spec-label">SERIAL</span>
        <span className="av-spec-value">CRS-OX4-93</span>
      </div>
    </div>
    
    {/* Action Buttons */}
    <div className="srd-btn-group">
      <ServiceButton
        variant="crs"
        service="Tech Support"
        location="Events & Venues"
        href="/contact?service=av-support"
        badge={<CrsBadge />}
      />
      <ServiceButton
        variant="crs"
        service="Equipment Hire"
        location="PA / Backline"
        href="/contact?service=hire"
        badge={<CrsBadge />}
      />
    </div>
  </section>
);

// ==========================================
// 10b. ODRO ENGINEERING MODULE
// ==========================================

const OdroEngineeringModule = () => (
  <section className="srd-module srd-module--dark" aria-labelledby="module-odro-engineering">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-odro-engineering" className="srd-module-title">ODRO Engineering</h2>
        <p className="srd-module-subtitle">AV & Instrument Repairs • Workshop Services</p>
        <div className="srd-pricing">FROM £60 BENCH FEE</div>
      </div>
    </div>
    <div className="srd-micro-label">DESTA-GEN3 SERVICE LOOP</div>
    <div className="srd-btn-group">
      <ServiceButton
        variant="neutral"
        service="Repair Request"
        href="/contact?service=repairs"
        badge={<OdroBadge />}
      />
      <ServiceButton
        variant="neutral"
        service="Get Quote"
        href="/contact?service=repair-quote"
      />
    </div>
  </section>
);

// ==========================================
// 11. WORKSHOP CAFÉ MODULE - Vintage Mixer Style
// ==========================================

const MixerKnob = ({ size = "md" }) => (
  <div className={`wc-knob wc-knob--${size}`} aria-hidden="true">
    <div className="wc-knob-body">
      <div className="wc-knob-indicator"></div>
    </div>
  </div>
);

const MixerFader = ({ level = 70 }) => (
  <div className="wc-fader" aria-hidden="true">
    <div className="wc-fader-track">
      <div className="wc-fader-level" style={{ height: `${level}%` }}></div>
      <div className="wc-fader-handle" style={{ bottom: `${level - 5}%` }}></div>
    </div>
    <div className="wc-fader-leds">
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`wc-fader-led ${i < Math.floor(level / 12.5) ? 'wc-fader-led--on' : ''} ${i >= 6 ? 'wc-fader-led--red' : ''}`}></div>
      ))}
    </div>
  </div>
);

const SpectrumBar = ({ height }) => (
  <div className="wc-spectrum-bar" style={{ height: `${height}%` }} aria-hidden="true"></div>
);

const WorkshopCafeModule = () => (
  <section className="srd-module srd-module--workshop" aria-labelledby="module-workshop-cafe">
    {/* Brushed metal corner screws */}
    <div className="wc-corner-screw wc-corner-screw--tl" aria-hidden="true"></div>
    <div className="wc-corner-screw wc-corner-screw--tr" aria-hidden="true"></div>
    <div className="wc-corner-screw wc-corner-screw--bl" aria-hidden="true"></div>
    <div className="wc-corner-screw wc-corner-screw--br" aria-hidden="true"></div>
    
    {/* VU Meters Row */}
    <div className="wc-vu-row">
      <VuMeter label="L" />
      <VuMeter label="R" />
    </div>
    
    {/* Main Title Panel - Mustard background */}
    <div className="wc-title-panel">
      <h2 id="module-workshop-cafe" className="wc-title">THE WORKSHOP CAFE</h2>
      <p className="wc-tagline">COFFEE ◆ REPAIRS ◆ MUSICAL CURIOS ◆ WORK SPACES</p>
      <div className="wc-opening-badge">OPENING APRIL 2026</div>
      <div className="wc-pricing">VENUE HIRE FROM £150/5HR</div>
    </div>
    
    {/* Mixer Controls Row */}
    <div className="wc-controls-row">
      {/* Knobs */}
      <div className="wc-knobs-section">
        {[...Array(10)].map((_, i) => (
          <MixerKnob key={i} size={i < 2 ? "lg" : "md"} />
        ))}
      </div>
      
      {/* Faders */}
      <div className="wc-faders-section">
        <MixerFader level={85} />
        <MixerFader level={70} />
        <MixerFader level={95} />
        <MixerFader level={60} />
        <MixerFader level={75} />
        <MixerFader level={50} />
      </div>
      
      {/* Spectrum Analyzer */}
      <div className="wc-spectrum">
        {[45, 65, 80, 55, 70, 90, 75, 60, 85, 50, 70, 80, 65, 55, 40].map((h, i) => (
          <SpectrumBar key={i} height={h} />
        ))}
      </div>
    </div>
    
    {/* CTA Button */}
    <div className="wc-cta-row">
      <a 
        href={SQUARE_URLS.WORKSHOP_CAFE} 
        target="_blank" 
        rel="noopener noreferrer"
        className="wc-book-btn"
      >
        [ BOOK WORKSPACE / CAFE HIRE ]
      </a>
    </div>
  </section>
);

// ==========================================
// 12. COMMUNICATIONS BUS - CONTACT FORM
// ==========================================

const CommunicationsBusModule = () => (
  <section className="srd-module srd-module--dark" aria-labelledby="module-communications-bus">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-communications-bus" className="srd-module-title">Communications Bus</h2>
        <p className="srd-module-subtitle">Venue Hire & Custom Enquiries</p>
      </div>
    </div>
    <form className="srd-comms-form" action="/contact" method="post">
      <div className="srd-input-group">
        <label htmlFor="comms-name" className="srd-input-label">Name</label>
        <input id="comms-name" type="text" className="srd-input-bay" placeholder="Full Name" required name="name" />
      </div>
      <div className="srd-input-group">
        <label htmlFor="comms-email" className="srd-input-label">Email</label>
        <input id="comms-email" type="email" className="srd-input-bay" placeholder="your.email@domain.com" required name="email" />
      </div>
      <div className="srd-input-group">
        <label htmlFor="comms-message" className="srd-input-label">Message</label>
        <textarea id="comms-message" name="message" className="srd-input-bay" placeholder="Describe your booking requirements or technical query..." required></textarea>
      </div>
      <button type="submit" className="srd-submit-btn">Transmit</button>
    </form>
  </section>
);

// ==========================================
// 13. FOOTER
// ==========================================

const TrustRail = () => (
  <footer className="srd-trust-rail">
    <div className="srd-trust-content">
      <span>118 Cowley Road, Oxford OX4 1JE, United Kingdom</span>
      <a href="tel:+441865722027" className="srd-phone-link">01865 722027</a>
      <a href="mailto:info@crsoxford.com" className="srd-email-link">info@crsoxford.com</a>
    </div>
    <div className="srd-social-links">
      <a href="https://instagram.com/cowleyroadstudios" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
      <a href="https://facebook.com/cowleyroadstudios" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
    </div>
  </footer>
);

const TechManualFooter = () => (
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
);

// ==========================================
// 14. MAIN PAGE ASSEMBLY
// ==========================================

export default function StudioServicesRack() {
  return (
    <main className="srd-page">
      
      <TopRail />
      
      <div className="srd-chassis">
        <RackRail side="left" />
        
        <div className="srd-modules">
          <MasterFaceplate />
          <StatusModule />
          
          {/* Service Modules - Green/Purple dual-channel buttons */}
          <RecordingModule />
          <RehearsalModule />
          <ControlRoomModule />
          
          {/* Support Services */}
          <CrsAvSupportModule />
          <OdroEngineeringModule />
          <WorkshopCafeModule />
          <CommunicationsBusModule />
        </div>
        
        <RackRail side="right" />
      </div>
      
      <TrustRail />
      <TechManualFooter />
    </main>
  );
}
