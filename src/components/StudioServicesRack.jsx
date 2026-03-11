/** @jsxImportSource react */
import React, { useState } from 'react';

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
      <div aria-hidden="true" className={`srd-badge srd-badge--crs ${className}`}>
        <svg viewBox="0 0 24 24" className="srd-badge-svg">
          <path d="M4 4 L12 2 L20 4 L20 12 L12 22 L4 12 Z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="bevel"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      </div>
    );
  }
  if (kind === "cricket") {
    return (
      <div aria-hidden="true" className={`srd-badge srd-badge--cricket ${className}`}>
        <svg viewBox="0 0 24 24" style={{ transform: 'rotate(-45deg)', width: '90%', height: '90%' }}>
          {/* Cricket Head and Mandibles */}
          <path 
            d="M12 7c-1.5 0-3 1-3 3s1 2 1 4c0 2 1 3 2 3s2-1 2-3c0-2 1-2 1-4s-1.5-3-3-3z" 
            fill="black" 
          />
          {/* High-fidelity Antennae */}
          <path 
            d="M9 8L6 4M15 8l3-4" 
            stroke="black" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />
          {/* Segmented Body Detail */}
          <line x1="10" y1="12" x2="14" y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        </svg>
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
  <div className="srd-signal-group" aria-hidden="true">
    <div className="srd-signal-dot srd-signal-dot--red" />
    <div className="srd-signal-dot srd-signal-dot--yellow" />
    <div className="srd-signal-dot srd-signal-dot--green" />
  </div>
);

const CRSBlockLogo = () => (
  <div className="srd-logo-plate" aria-label="CRS Logo">
    
    {/* Steel Bolts - Rack Mount Hardware */}
    <svg className="srd-logo-bolt srd-logo-bolt--tl" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="#1a1a1a" />
      <circle cx="4" cy="4" r="2" fill="#2a2a2a" />
      <line x1="2" y1="4" x2="6" y2="4" stroke="#0a0a0a" strokeWidth="0.5" />
      <line x1="4" y1="2" x2="4" y2="6" stroke="#0a0a0a" strokeWidth="0.5" />
    </svg>
    <svg className="srd-logo-bolt srd-logo-bolt--tr" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="#1a1a1a" />
      <circle cx="4" cy="4" r="2" fill="#2a2a2a" />
      <line x1="2" y1="4" x2="6" y2="4" stroke="#0a0a0a" strokeWidth="0.5" />
      <line x1="4" y1="2" x2="4" y2="6" stroke="#0a0a0a" strokeWidth="0.5" />
    </svg>
    <svg className="srd-logo-bolt srd-logo-bolt--bl" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="#1a1a1a" />
      <circle cx="4" cy="4" r="2" fill="#2a2a2a" />
      <line x1="2" y1="4" x2="6" y2="4" stroke="#0a0a0a" strokeWidth="0.5" />
      <line x1="4" y1="2" x2="4" y2="6" stroke="#0a0a0a" strokeWidth="0.5" />
    </svg>
    <svg className="srd-logo-bolt srd-logo-bolt--br" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="#1a1a1a" />
      <circle cx="4" cy="4" r="2" fill="#2a2a2a" />
      <line x1="2" y1="4" x2="6" y2="4" stroke="#0a0a0a" strokeWidth="0.5" />
      <line x1="4" y1="2" x2="4" y2="6" stroke="#0a0a0a" strokeWidth="0.5" />
    </svg>
    
    {/* Left Block: CR (Cream/White) */}
    <div className="srd-logo-block-left">
      <span className="srd-logo-text">
        CR
      </span>
      {/* Green Underline */}
      <div className="srd-logo-underline"></div>
    </div>

    {/* Right Block: S (Mustard Yellow) */}
    <div className="srd-logo-block-right">
      <span className="srd-logo-text">
        S
      </span>
    </div>

  </div>
);

const MasterFaceplate = () => (
  <header className="srd-master-faceplate">
    <div className="srd-faceplate-header">
      {/* Physical Location Strip */}
      <div className="srd-location-strip">
        118 COWLEY ROAD • OXFORD • OX4 1JE • UNITED KINGDOM
      </div>
      
      <div className="srd-faceplate-main">
        <div className="srd-faceplate-title-group">
          <CRSBlockLogo />
          <SignalStripe />
          <div className="srd-faceplate-text-stack">
            <h1 className="srd-faceplate-title">COWLEY ROAD STUDIOS</h1>
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

const StatusPlacard = () => (
  <section className="srd-status-module">
    <div className="srd-lcd-screen">
      <div className="srd-lcd-content">
        <div className="srd-lcd-sysinfo">
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> CRS INFRASTRUCTURE ACTIVE // RECORDING @ 118 COWLEY RD // REHEARSAL @ CRICKET RD // WORKSHOP CAFÉ OPEN // VENUE TECH ON-CALL
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

// Top Mounting Rail — Site Header
const TopRail = () => (
  <div className="srd-top-rail">
    <div className="srd-home-indicator">HOME</div>
    <div className="srd-rail-address">118 COWLEY ROAD | OXFORD | OX4 1JE</div>
    <div className="srd-rail-meta">EST. 2012 | OXFORD UK</div>
  </div>
);

const VuMeter = ({ label = "VU", channel }) => (
  <div className={`srd-vu ${channel ? `srd-vu--${channel}` : ''}`} aria-hidden="true">
    <div className="srd-vu-body">
      <div className="srd-vu-face">
        <div className="srd-vu-glow" />
        
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
           <div className="srd-vu-needle-tip" />
        </div>
        <div className="srd-vu-needle-pivot" />
        <span className="srd-vu-label">{label}</span>
        <div className="srd-vu-shine" />
      </div>
    </div>
  </div>
);

// ==========================================
// 2. CORE ARCHITECTURE COMPONENTS
// ==========================================

const HardwareButton = ({ variant, serviceName, locationName, href, onClick, external = false, ariaLabel, icon, ledMode = "hover-on" }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isLink = Boolean(href);
  const Element = isLink ? "a" : "button";

  const activeLed = ledMode === "always-on" ? true : ledMode === "hover-on" ? hovered || pressed : false;

  const sharedProps = {
    className: `srd-btn srd-btn--${variant}`,
    "aria-label": ariaLabel,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onFocus: () => setHovered(true),
    onBlur: () => { setHovered(false); setPressed(false); },
  };

  const content = (
    <>
      <div className="srd-btn-content">
        {icon && <BrandBadge kind={icon} />}
        <div className="srd-btn-labels">
          <span className="srd-btn-service">
            {serviceName}
          </span>
          {locationName && (
            <span className="srd-btn-location">
              {locationName}
            </span>
          )}
        </div>
      </div>
      <LedIndicator variant={variant} active={activeLed} />
    </>
  );

  if (isLink) {
    return (
      <Element {...sharedProps} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </Element>
    );
  }

  return (
    <Element {...sharedProps} type="button" onClick={onClick}>
      {content}
    </Element>
  );
};

const ServiceButtonGroup = ({ children }) => (
  <div className="srd-btn-group">
    {children}
  </div>
);

const RackModule = ({ title, subtitle, theme = "standard", meters = true, children }) => {
  const labelId = `module-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const moduleClass = theme === "dark" ? "srd-module srd-module--dark" : "srd-module";
  
  return (
    <section 
      className={moduleClass}
      aria-labelledby={labelId}
    >
      <div className="srd-module-header">
        <div className="srd-module-title-group">
          <EngravedLabel id={labelId}>{title}</EngravedLabel>
          {subtitle && <p className="srd-module-subtitle">{subtitle}</p>}
        </div>
        {meters && (
          <div className="srd-meters">
            <VuMeter label="L" channel="left" />
            <VuMeter label="R" channel="right" />
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

const RackChassis = ({ children }) => (
  <div className="srd-chassis">
    
    <div className="srd-rail" aria-hidden="true">
      {[...Array(12)].map((_, i) => <HexBolt key={`l-${i}`} />)}
    </div>
    
    <div className="srd-modules">
      {children}
    </div>
    
    <div className="srd-rail srd-rail--right" aria-hidden="true">
      {[...Array(12)].map((_, i) => <HexBolt key={`r-${i}`} />)}
    </div>
    
  </div>
);

// UNIT 0: Identity Plate (SEO Integration)
const IdentityPlate = () => (
  <section className="srd-unit-0" aria-label="Unit Identification">
    <div className="srd-unit-0-left">
      <span className="srd-unit-id">UNIT ID: 118-CR</span>
    </div>
    <div className="srd-unit-0-center">
      <h1 className="srd-unit-h1">RECORDING STUDIO &amp; REHEARSAL ROOMS IN OXFORD</h1>
    </div>
    <div className="srd-unit-0-right">
      <span className="srd-unit-status">SYSTEM STATUS: GRASSROOTS INFRASTRUCTURE</span>
    </div>
  </section>
);

// ==========================================
// 3. MAIN PAGE ASSEMBLY
// ==========================================

export default function StudioServicesRack() {
  const handleOpenTermsModal = () => {
    window.dispatchEvent(new CustomEvent('OPEN_ODRO_MODAL'));
  };

  return (
    <main className="srd-page">
      <TopRail />
      
      <RackChassis>
        
        {/* UNIT 0: Identity Plate (Replaces floating header) */}
        <IdentityPlate />
        
        <MasterFaceplate />
        <StatusPlacard />
        
        <RackModule title="Recording" subtitle="Cowley Road • 118 Cowley Rd • Main Studio & Control Room" meters={true}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Recording" 
              locationName="Cowley Road"
              href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Recording Session at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Recording"
              locationName="Cricket Road" 
              href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Recording Session at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Rehearsal" subtitle="Cricket Road • Rehearsal & Production Space Management" meters={false}>
          {/* Cricket Subsystem Indicator */}
          <div className="srd-subsystem-badge">
            <BrandBadge kind="cricket" className="srd-subsystem-badge-icon" />
            <span className="srd-subsystem-label">CRICKET ROAD SUBSYSTEM</span>
          </div>
          
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Rehearsal" 
              locationName="Cowley Road"
              href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Rehearsal Room at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Rehearsal"
              locationName="Cricket Road" 
              href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Rehearsal Room at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Control Room" subtitle="Hybrid Studio Hire • Multi-Track Recording & Production" meters={true}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Control Room"
              locationName="Cowley Road" 
              href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Control Room Hire at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Control Room"
              locationName="Cricket Road" 
              href="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Control Room Hire at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="ODRO Electronics" subtitle="AV & Instrument Servicing • Oxford Venue Tech Support" theme="dark" meters={false}>
          <div className="srd-micro-label">DESTA-GEN3 SERVICE LOOP</div>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="neutral" 
              icon="odro"
              serviceName="Terms" 
              onClick={handleOpenTermsModal} 
              ariaLabel="View ODRO repair terms and conditions"
            />
            <HardwareButton 
              variant="neutral" 
              serviceName="Repair Request" 
              href="/contact?service=repairs" 
              external={false}
              ariaLabel="Submit an electronics repair request to ODRO"
            />
            <HardwareButton 
              variant="neutral" 
              serviceName="Contact" 
              href="/contact" 
              external={false}
              ariaLabel="Contact ODRO repairs"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Workshop Café" subtitle="Coffee & Co-Working" theme="dark" meters={false}>
          <div className="srd-micro-label">BREWFORCE BUS ONLINE</div>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="cafe"
              serviceName="Book Café" 
              locationName="Workshop Café"
              href="https://crsoxford.com/book" 
              external={true}
              ariaLabel="Book a table at the Workshop Café"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Communications Bus" subtitle="Venue Hire & Custom Enquiries" theme="dark" meters={false}>
          <form className="srd-comms-form" action="/contact" method="post">
            <div className="srd-input-group">
              <label htmlFor="comms-name" className="srd-input-label">Name</label>
              <input
                id="comms-name"
                name="name"
                type="text"
                className="srd-input-bay"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="srd-input-group">
              <label htmlFor="comms-email" className="srd-input-label">Email</label>
              <input
                id="comms-email"
                name="email"
                type="email"
                className="srd-input-bay"
                placeholder="your.email@domain.com"
                required
              />
            </div>
            <div className="srd-input-group">
              <label htmlFor="comms-message" className="srd-input-label">Message</label>
              <textarea
                id="comms-message"
                name="message"
                className="srd-input-bay"
                placeholder="Describe your booking requirements or technical query..."
                required
              />
            </div>
            <button type="submit" className="srd-submit-btn">
              Transmit
            </button>
          </form>
        </RackModule>

      </RackChassis>
      
      {/* Bottom Trust Rail */}
      <footer className="srd-trust-rail">
        118 Cowley Road, Oxford OX4 1JE, United Kingdom
      </footer>
    </main>
  );
}
