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

// ==========================================
// 3. SERVICE RACK MODULES
// ==========================================

const RackModule = ({ title, subtitle, location, pricing, services = [], onlineBooking = null, badge = null, className = "", children }) => (
  <section className={`srd-module srd-module--dark ${className}`}>
    <header className="srd-module-header">
      {badge && <BrandBadge kind={badge} className="srd-badge-position" />}
      <div className="srd-module-title-group">
        <EngravedLabel className="srd-module-title">{title}</EngravedLabel>
        <div className="srd-module-subtitle">{subtitle}</div>
        {location && <div className="srd-module-location">{location}</div>}
      </div>
    </header>
    
    <div className="srd-module-content">
      {pricing && (
        <div className="srd-pricing-display">
          {pricing.map((price, idx) => (
            <div key={idx} className="srd-price-item">
              <span className="srd-price-amount">{price.amount}</span>
              <span className="srd-price-duration">{price.duration}</span>
            </div>
          ))}
        </div>
      )}
      
      {services.length > 0 && (
        <div className="srd-services-list">
          {services.map((service, idx) => (
            <div key={idx} className="srd-service-item">
              <LedIndicator variant="green" active={true} />
              <span>{service}</span>
            </div>
          ))}
        </div>
      )}
      
      {children}
    </div>
    
    {onlineBooking && (
      <div className="srd-module-actions">
        <a href={onlineBooking} className="srd-book-btn" target="_blank" rel="noopener noreferrer">
          <span>BOOK ONLINE</span>
        </a>
      </div>
    )}
  </section>
);

const VuMeter = ({ active = false }) => (
  <div className={`srd-vu-meter ${active ? 'srd-vu-active' : ''}`}>
    <div className="srd-vu-bar srd-vu-bar--green"></div>
    <div className="srd-vu-bar srd-vu-bar--green"></div>
    <div className="srd-vu-bar srd-vu-bar--yellow"></div>
    <div className="srd-vu-bar srd-vu-bar--yellow"></div>
    <div className="srd-vu-bar srd-vu-bar--red"></div>
    <div className="srd-vu-bar srd-vu-bar--red"></div>
  </div>
);

const HardwareButton = ({ variant, size = "normal", children, href, onClick, className = "" }) => {
  const buttonClass = `srd-hardware-btn srd-hardware-btn--${variant} srd-hardware-btn--${size} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={buttonClass} onClick={onClick}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

const ServiceButtonGroup = ({ services }) => (
  <div className="srd-service-buttons">
    {services.map((service, idx) => (
      <HardwareButton 
        key={idx}
        variant={service.variant || "cowley"}
        size="small"
        href={service.href}
        className="srd-service-button"
      >
        {service.label}
      </HardwareButton>
    ))}
  </div>
);

// ==========================================
// 4. COMMUNICATIONS BUS — CONTACT FORM
// ==========================================

const CommunicationsBus = () => (
  <section className="srd-module srd-module--communications">
    <header className="srd-module-header">
      <EngravedLabel className="srd-module-title">Communications Bus</EngravedLabel>
      <div className="srd-module-subtitle">Direct Line • General Enquiries</div>
    </header>
    
    <div className="srd-module-content">
      <form className="srd-contact-form" action="/contact" method="POST">
        <div className="srd-form-row">
          <input type="text" name="name" placeholder="Name" required className="srd-input" />
          <input type="email" name="email" placeholder="Email" required className="srd-input" />
        </div>
        
        <div className="srd-form-row">
          <select name="service" className="srd-select" required>
            <option value="">Select Service</option>
            <option value="recording">Recording</option>
            <option value="rehearsal">Rehearsal</option>
            <option value="repairs">ODRO Repairs</option>
            <option value="workshop">Workshop Café</option>
            <option value="general">General Enquiry</option>
          </select>
        </div>
        
        <div className="srd-form-row">
          <textarea name="message" placeholder="Message" rows="4" required className="srd-textarea"></textarea>
        </div>
        
        <div className="srd-form-actions">
          <HardwareButton variant="cowley" type="submit">
            TRANSMIT SIGNAL
          </HardwareButton>
        </div>
      </form>
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
      
      <div className="srd-rack-chassis">
        <IdentityPlate />
        <MasterFaceplate />
        <StatusPlacard />
        
        {/* Service Modules */}
        <div id="modules" className="srd-modules">
          
          {/* Recording Module */}
          <RackModule
            title="Recording"
            subtitle="Hybrid Studio Hire • Multi-Track Recording"
            location="118 Cowley Road"
            badge="crs"
            pricing={[
              { amount: "£35", duration: "/hr" },
              { amount: "£100", duration: "/3hr" },
              { amount: "£125", duration: "/4hr" }
            ]}
            services={[
              "Multi-track recording",
              "Vocal tracking & comping",
              "Live session recording",
              "Mix-down services"
            ]}
            onlineBooking="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX"
          >
            <div className="srd-technical-specs">
              <div className="srd-spec-item">
                <span className="srd-spec-label">Interface:</span>
                <span className="srd-spec-value">Pro Tools HDX</span>
              </div>
              <div className="srd-spec-item">
                <span className="srd-spec-label">Monitoring:</span>
                <span className="srd-spec-value">Genelec 8040A</span>
              </div>
            </div>
            <VuMeter active={true} />
          </RackModule>

          {/* Rehearsal Module - Cowley Road */}
          <RackModule
            title="Rehearsal"
            subtitle="Band Practice • Pre-Production"
            location="118 Cowley Road"
            badge="crs"
            pricing={[
              { amount: "£45", duration: "/2hr" },
              { amount: "£55", duration: "/3hr" },
              { amount: "£65", duration: "/5hr" }
            ]}
            services={[
              "Acoustically treated room",
              "Full backline provided",
              "Digital piano available",
              "Recording setup optional"
            ]}
            onlineBooking="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
          >
            <ServiceButtonGroup services={[
              { label: "COWLEY ROOM", href: "/rehearsal-cowley", variant: "cowley" },
              { label: "BOOK NOW", href: "https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX", variant: "cowley" }
            ]} />
          </RackModule>

          {/* Rehearsal Module - Cricket Road */}
          <RackModule
            title="Rehearsal"
            subtitle="Extended Sessions • Cricket Road"
            location="Cricket Road"
            badge="cricket"
            pricing={[
              { amount: "£40", duration: "/2hr" },
              { amount: "£50", duration: "/3hr" },
              { amount: "£60", duration: "/5hr" }
            ]}
            services={[
              "Larger rehearsal space",
              "Premium backline",
              "Extended session rates",
              "Load-in access"
            ]}
            onlineBooking="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX"
          >
            <ServiceButtonGroup services={[
              { label: "CRICKET ROOM", href: "/rehearsal-cricket", variant: "cricket" },
              { label: "BOOK NOW", href: "https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX", variant: "cricket" }
            ]} />
          </RackModule>

          {/* Control Room Modules */}
          <RackModule
            title="Control Room"
            subtitle="Independent Producer Access"
            location="118 Cowley Road"
            badge="crs"
            pricing={[
              { amount: "£20", duration: "/hr" },
              { amount: "£35", duration: "/2hr" },
              { amount: "£60", duration: "/4hr" }
            ]}
            services={[
              "Pro Tools access",
              "Mix-down facilities",
              "Monitoring setup",
              "Independent sessions"
            ]}
            onlineBooking="https://book.squareup.com/appointments/chctncmi4mg3qr/location/L1MAM4DDPHKXX/services/TPMAPWW2ZXDD2VAPX5HMAMDJ"
          />

          <RackModule
            title="Control Room"
            subtitle="Extended Producer Sessions"
            location="Cricket Road"
            badge="cricket"
            pricing={[
              { amount: "£40", duration: "/5hr" },
              { amount: "£70", duration: "/10hr" }
            ]}
            services={[
              "Extended access",
              "Multi-day projects",
              "Mixing & mastering",
              "Producer workspace"
            ]}
            onlineBooking="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX"
          />

          {/* ODRO Engineering Module */}
          <RackModule
            title="ODRO Engineering"
            subtitle="AV Servicing & Repairs • Protecting The Signal Chain"
            badge="odro"
            services={[
              "Audio equipment repair",
              "Venue technical support",
              "System installation",
              "Maintenance contracts"
            ]}
          >
            <div className="srd-odro-section">
              <div className="srd-dark-section">
                <h3 className="srd-dark-title">ODRO Engineering Repair</h3>
                <div className="srd-odro-links">
                  <HardwareButton variant="odro" onClick={() => window.dispatchEvent(new CustomEvent('OPEN_ODRO_MODAL'))}>
                    Terms
                  </HardwareButton>
                  <HardwareButton variant="odro" href="/contact?service=repairs">
                    Repair Request
                  </HardwareButton>
                  <HardwareButton variant="odro" href="/contact">
                    Contact
                  </HardwareButton>
                </div>
              </div>
            </div>
          </RackModule>

          {/* Workshop Café Module */}
          <RackModule
            title="Workshop Café"
            subtitle="Creative Hub • Community Venue • Opening April 2026"
            location="118 Cowley Road"
            badge="cafe"
            pricing={[
              { amount: "£150", duration: "/5hr" }
            ]}
            services={[
              "Creative workspace",
              "Community events",
              "Workshop hosting",
              "Café facilities"
            ]}
            onlineBooking="https://crsoxford.com/book"
          >
            <div className="srd-coming-soon">
              <span>Opening April 2026</span>
            </div>
          </RackModule>
        </div>

        {/* Communications Bus */}
        <CommunicationsBus />
      </div>
      
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
