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
        <img src="/static/cricket-logo.png" alt="Cricket" className="cricket-badge-img" />
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
  <div className="crs-master-plate" aria-label="Cowley Road Studios Street Sign">
    <div className="crs-street-sign-line1">COWLEY ROAD</div>
    <div className="crs-street-sign-line2">STUDIOS</div>
  </div>
);

const MasterFaceplate = () => (
  <header className="srd-master-faceplate">
    <div className="srd-faceplate-header">
      {/* Physical Location Strip */}
      <div className="srd-location-strip">
        118 COWLEY ROAD • OXFORD • OX4 1JE • UNITED KINGDOM
      </div>
      
      {/* CRITICAL OVERRIDE: UK Street Sign Badge + Signal LEDs */}
      <div className="srd-faceplate-main">
        <div className="srd-faceplate-title-group">
          <CRSStreetSign />
          <SignalStripe />
          <div className="srd-faceplate-text-stack">
            <h1 className="srd-faceplate-title">
              COWLEY<br />
              ROAD<br />
              STUDIOS
            </h1>
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
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> CRS CREATIVE INFRASTRUCTURE ONLINE // MODULES: RECORDING • REHEARSAL • WORKSPACE • CAFÉ • VENUE TECH // ALL SYSTEMS OPERATIONAL
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
        <div className="srd-lcd-footer">DEEPEND PROTOCOL ACTIVE // NO CHAOS MODE</div>
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

const HardwareButton = ({ variant, serviceName, locationName, pricing, href, onClick, external = false, ariaLabel, icon, ledMode = "hover-on" }) => {
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
          {pricing && (
            <span className="srd-btn-pricing">
              {pricing}
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
  
  let moduleClass = "srd-module";
  if (theme === "dark") moduleClass += " srd-module--dark";
  if (theme === "nettle") moduleClass += " srd-module--nettle";
  if (theme === "purple") moduleClass += " srd-module--purple";
  
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

// UNIT 0: Identity Plate (SEO Integration) - TICKER REMOVED PER TASK 1
const IdentityPlate = () => (
  <section className="srd-unit-0" aria-label="Unit Identification" style={{ display: 'none' }}>
    {/* Yellow LED ticker removed - off-brand per Task 1 */}
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
        <EntryActionCTA />
        
        <div id="modules">
        <RackModule title="Recording" subtitle="Cowley Road • 118 Cowley Rd • Main Studio & Control Room" theme="nettle" meters={true}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Recording" 
              locationName="Cowley Road"
              pricing="£35/h • £100/3h • £125/4h"
              href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Recording Session at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Recording"
              locationName="Cricket Road"
              pricing="£60/2h • £85/3h • £110/4h"
              href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Recording Session at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Rehearsal" subtitle="Cricket Road • OX4 3DJ • Managed Production" theme="purple" meters={false}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Rehearsal" 
              locationName="Cowley Road"
              pricing="From £40 / 2hrs"
              href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Rehearsal Room at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Rehearsal"
              locationName="Cricket Road"
              pricing="From £40 / 2hrs" 
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
              pricing="£40 / hour" 
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

        <RackModule title="Workshop Café" subtitle="118 Cowley Road • Hub & Venue // Opening April 2026" theme="dark" meters={false}>
          <div className="srd-micro-label">BREWFORCE BUS ONLINE</div>
          
          {/* Venue Hire */}
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="cafe"
              serviceName="Book Café" 
              locationName="Workshop Café"
              pricing="Venue Hire: £150 (5h) | £40/hr"
              href="https://crsoxford.com/book" 
              external={true}
              ariaLabel="Book a table at the Workshop Café"
            />
          </ServiceButtonGroup>

          {/* Technical Add-ons */}
          <div className="srd-pricing-details">
            <div className="srd-pricing-label">TECHNICAL ADD-ONS</div>
            <div className="srd-pricing-row">
              <span className="srd-pricing-item">PA System + Engineer (Bose)</span>
              <span className="srd-pricing-value">£120</span>
            </div>
            <div className="srd-pricing-note">Includes PA, vocal mics, stands, monitoring • Full event coverage</div>
          </div>

          {/* Education Discount Badge */}
          <div className="srd-discount-badge">
            <span className="srd-discount-icon">🎓</span>
            <span className="srd-discount-text">EDUCATION DISCOUNT: 10% OFF VENUE HIRE</span>
          </div>

          {/* Capacity & Licensing */}
          <div className="srd-micro-label">CAPACITY: ~25 SEATED | ~45-60 STANDING • ALCOHOL: TENS AVAILABLE</div>
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
        </div>

      </RackChassis>
      
      {/* Bottom Trust Rail */}
      <footer className="srd-trust-rail">
        118 Cowley Road, Oxford OX4 1JE, United Kingdom · DESTA-GEN3 // NO CHAOS MODE // INSPECTED: N0RLAND0B00M
      </footer>
      
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
