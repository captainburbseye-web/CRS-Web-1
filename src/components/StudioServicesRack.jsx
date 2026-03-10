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
        <svg viewBox="0 0 24 24" className="srd-badge-svg srd-badge-svg--cricket">
          <rect x="6" y="6" width="12" height="12" fill="none" stroke="black" strokeWidth="2" rx="1"/>
          <circle cx="12" cy="12" r="3" fill="black"/>
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
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> MULTIFACETED CREATIVE HUB. VINTAGE AUDIO RECORDING, REHEARSAL, ELECTRONIC REPAIRS &amp; WORKSPACE.
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
        <div className="srd-lcd-footer">SIGNAL ROUTING • BOOKING BUS</div>
      </div>
    </div>
  </section>
);

const VuMeter = ({ label = "VU" }) => (
  <div className="srd-vu" aria-hidden="true">
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
            <VuMeter label="L" />
            <VuMeter label="R" />
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

// ==========================================
// 3. MAIN PAGE ASSEMBLY
// ==========================================

export default function StudioServicesRack() {
  const handleOpenTermsModal = () => {
    window.dispatchEvent(new CustomEvent('OPEN_ODRO_MODAL'));
  };

  return (
    <main className="srd-page">
      <RackChassis>
        
        <MasterFaceplate />
        <StatusPlacard />
        
        <RackModule title="Recording" subtitle="Studio Session Booking" meters={true}>
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

        <RackModule title="Rehearsal" subtitle="Band Practice Rooms" meters={false}>
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

        <RackModule title="Control Room" subtitle="Hybrid Studio Hire" meters={true}>
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

        <RackModule title="ODRO Electronics Repair" subtitle="AV & Instrument Servicing" theme="dark" meters={false}>
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

      </RackChassis>
    </main>
  );
}
