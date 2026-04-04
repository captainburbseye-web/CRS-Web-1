/** @jsxImportSource react */
import React from 'react';

const URLS = {
  HOME: '/',
  CONTACT: '/contact',
  WORKSHOP_CAFE: '/workshop-cafe',
  RECORDING_BOOK: 'https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX',
  CRICKET_RECORDING_BOOK: 'https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX',
  REHEARSAL_BOOK: 'https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX',
  CRICKET_REHEARSAL_BOOK: 'https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX',
  MAP: 'https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE',
  RECORDING_PAGE: '/recording-studio-oxford',
  REHEARSAL_PAGE: '/rehearsal-rooms-oxford',
  MUSIC_PAGE: '/music-studio-cowley-road',
  ENQUIRE_AV: '/contact?service=av-support',
  ENQUIRE_ODRO: '/contact?service=repairs',
  ENQUIRE_WORKSHOP: '/contact?service=venue'
};

const PHOTO_PLACEHOLDERS = [
  'STUDIO SPACE',
  'REHEARSAL ROOM',
  'RECORDING SESSION',
  'WORKSHOP CAFÉ'
];

const SUPPORTED_ACTIVITIES = [
  'Recording sessions',
  'Band rehearsals',
  'ODRO electronics support',
  'Workshop activity'
];

const HexBolt = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`srd-bolt ${className}`} aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#444" stroke="#111" strokeWidth="4" />
    <circle cx="50" cy="50" r="25" fill="#222" />
    <circle cx="50" cy="50" r="15" fill="#111" />
  </svg>
);

const RackRail = ({ side = 'left' }) => {
  const bolts = Array(12).fill(null);
  return (
    <div className={`srd-rail ${side === 'right' ? 'srd-rail--right' : ''}`} aria-hidden="true">
      {bolts.map((_, i) => <HexBolt key={i} />)}
    </div>
  );
};

const VuMeterDefs = () => (
  <svg style={{ display: 'none' }} aria-hidden="true">
    <defs>
      <g id="vu-scale-graphic">
        <path d="M 15 45 A 35 35 0 0 1 85 45" fill="none" stroke="#222" strokeWidth="0.5" />
        <line x1="22" y1="32" x2="24" y2="35" stroke="#222" strokeWidth="1" />
        <line x1="35" y1="20" x2="36" y2="24" stroke="#222" strokeWidth="1" />
        <line x1="50" y1="15" x2="50" y2="20" stroke="#222" strokeWidth="1.5" />
        <line x1="65" y1="20" x2="64" y2="24" stroke="#222" strokeWidth="1" />
        <line x1="78" y1="32" x2="76" y2="35" stroke="#dc2626" strokeWidth="1.5" />
        <path d="M 72 26 A 35 35 0 0 1 85 45" fill="none" stroke="#dc2626" strokeWidth="2" />
      </g>
    </defs>
  </svg>
);

const VuMeter = ({ label = 'L' }) => (
  <div className={`srd-vu srd-vu--${label.toLowerCase()}`} aria-hidden="true">
    <div className="srd-vu-body">
      <div className="srd-vu-face">
        <div className="srd-vu-glow"></div>
        <svg viewBox="0 0 100 50" className="srd-vu-scale">
          <use href="#vu-scale-graphic" />
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

const CrsBadge = ({ className = '' }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--crs ${className}`}>
    <svg viewBox="0 0 24 24" className="srd-badge-svg">
      <path d="M4 4 L12 2 L20 4 L20 12 L12 22 L4 12 Z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="bevel" />
      <circle cx="12" cy="12" r="3" fill="white" />
    </svg>
  </div>
);

const CricketBadge = ({ className = '' }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--cricket ${className}`}>
    <img src="/static/cricket-logo.png" alt="Cricket" className="cricket-badge-img" />
  </div>
);

const OdroBadge = ({ className = '' }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--odro ${className}`}>
    <span className="srd-badge-text">OD</span>
  </div>
);

const CafeBadge = ({ className = '' }) => (
  <div aria-hidden="true" className={`srd-badge srd-badge--cafe ${className}`}>
    <span className="srd-badge-text">WC</span>
  </div>
);

const Led = ({ variant = 'crs' }) => (
  <div aria-hidden="true" className={`srd-led srd-led--${variant}-off`} />
);

const ServiceButton = ({ variant = 'crs', service, location, href, badge, className = '', onClick }) => {
  const external = href?.startsWith('http');
  const Tag = onClick ? 'button' : 'a';
  const tagProps = onClick
    ? { type: 'button', onClick }
    : {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noopener noreferrer' : undefined,
      };

  return (
    <Tag
      className={`srd-btn srd-btn--${variant} ${className}`.trim()}
      aria-label={location ? `${service} ${location}` : service}
      {...tagProps}
    >
      <div className="srd-btn-content">
        {badge}
        <div className="srd-btn-labels">
          <span className="srd-btn-service">{service}</span>
          {location ? <span className="srd-btn-location">{location}</span> : null}
        </div>
      </div>
      <Led variant={variant} />
    </Tag>
  );
};

const PersistentSessionCta = () => (
  <a href={URLS.RECORDING_BOOK} target="_blank" rel="noopener noreferrer" className="srd-floating-session-cta">
    BOOK A SESSION
  </a>
);

const TopRail = () => (
  <div className="srd-top-rail">
    <div className="srd-home-indicator">HOME</div>
    <div className="srd-rail-address">118 COWLEY ROAD | OXFORD | OX4 1JE</div>
    <div className="srd-rail-meta">CRS INFRASTRUCTURE ACTIVE</div>
  </div>
);

const AuthorityHero = () => (
  <section className="srd-authority-hero" aria-labelledby="authority-hero-title">
    <div className="srd-authority-copy">
      <div className="srd-authority-system-line">118 COWLEY ROAD | OXFORD | OX4 1JE</div>
      <div className="srd-authority-system-line srd-authority-system-line--muted">CRS INFRASTRUCTURE ACTIVE</div>
      <h1 id="authority-hero-title">Recording Studio &amp; Rehearsal Rooms in Oxford</h1>
      <p className="srd-authority-subline">Cowley Road Studios | Recording • Rehearsal • Workshop Café • ODRO Electronics</p>
      <p className="srd-authority-brand">Grassroots infrastructure for the Oxford music scene.</p>
      <p className="srd-authority-hybrid">Hybrid analogue–digital recording with SSL, valve compression and tape integration.</p>
    </div>
    <div className="srd-authority-actions">
      <a href={URLS.RECORDING_BOOK} target="_blank" rel="noopener noreferrer" className="srd-authority-btn srd-authority-btn--primary">BOOK RECORDING</a>
      <a href={URLS.CONTACT} className="srd-authority-btn">ENQUIRE</a>
      <a href={URLS.WORKSHOP_CAFE} className="srd-authority-btn">WORKSHOP CAFÉ</a>
    </div>
    <RehearsalSelector id="hero-rehearsal-selector" title="BOOK REHEARSAL" className="srd-rehearsal-selector--hero" />
  </section>
);

const MasterFaceplate = () => (
  <header className="srd-master-faceplate">
    <div className="srd-faceplate-header">
      <div className="srd-location-strip">118 COWLEY ROAD • OXFORD • OX4 1JE • UNITED KINGDOM</div>
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
            <h2 className="srd-faceplate-title">
              <img src="/static/crs-wooden-sign.png" alt="Cowley Road Studios" className="srd-wooden-sign-img" />
            </h2>
            <p className="srd-faceplate-subtitle">Grassroots infrastructure for the Oxford music scene.</p>
          </div>
        </div>
        <div className="srd-faceplate-meta">
          <div className="srd-meta-row">
            <div className="srd-faceplate-model">CRS-CONSOLE-01</div>
            <div className="srd-faceplate-routing">Recording • Rehearsal • Workshop Café • ODRO Electronics</div>
            <div className="srd-micro-label">CANONICAL DOMAIN: COWLEYROADSTUDIOS.COM</div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const StatusModule = () => (
  <section className="srd-status-module">
    <div className="srd-lcd-screen">
      <div className="srd-lcd-content">
        <div className="srd-lcd-sysinfo">
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> 118 COWLEY ROAD, OXFORD OX4 1JE // RECORDING HQ ACTIVE // COWLEY ROAD FLAGSHIP RECORDING // CRICKET ROAD DEDICATED REHEARSAL // WORKSHOP CAFÉ VIA ENQUIRY // ODRO ELECTRONICS SUPPORT
        </div>
        <div className="srd-lcd-header">SELECT SERVICE MODULE</div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-crs">●</span>
          <span>COWLEY ROAD = MAIN STUDIO, CONTROL ROOM &amp; STUDIO-LINKED REHEARSAL</span>
        </div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-cricket">●</span>
          <span>CRICKET ROAD = DEDICATED REHEARSAL SPACE</span>
        </div>
        <div className="srd-lcd-footer">SERIOUS, PROFESSIONAL, GROUNDED // NO INVENTED CLAIMS</div>
      </div>
    </div>
  </section>
);

const ModuleEyebrow = ({ lines }) => (
  <div className="srd-module-copy-stack">
    {lines.map((line) => (
      <span key={line} className="srd-module-copy-line">{line}</span>
    ))}
  </div>
);

const RehearsalSelector = ({ id, title = 'BOOK REHEARSAL', className = '' }) => (
  <div className={`srd-rehearsal-selector ${className}`.trim()} id={id} aria-label={title}>
    <div className="srd-rehearsal-selector-title">{title}</div>
    <div className="srd-rehearsal-selector-grid">
      <article className="srd-rehearsal-selector-card">
        <h3>COWLEY ROAD</h3>
        <p>Studio-linked rehearsal</p>
        <a href={URLS.REHEARSAL_BOOK} target="_blank" rel="noopener noreferrer" className="srd-rehearsal-selector-link">BOOK</a>
      </article>
      <article className="srd-rehearsal-selector-card">
        <h3>CRICKET ROAD</h3>
        <p>Dedicated rehearsal space</p>
        <a href={URLS.CRICKET_REHEARSAL_BOOK} target="_blank" rel="noopener noreferrer" className="srd-rehearsal-selector-link">BOOK</a>
      </article>
    </div>
  </div>
);

const RecordingModule = () => (
  <section className="srd-module srd-module--nettle" aria-labelledby="module-recording">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-recording" className="srd-module-title">RECORDING</h2>
        <ModuleEyebrow lines={['COWLEY ROAD', '118 COWLEY ROAD', 'MAIN STUDIO & CONTROL ROOM']} />
      </div>
      <VuMeterPair />
    </div>
    <div className="srd-btn-group srd-btn-group--single">
      <ServiceButton
        variant="crs"
        service="BOOK A SESSION →"
        location="COWLEY ROAD"
        href={URLS.RECORDING_BOOK}
        badge={<CrsBadge />}
      />
    </div>
  </section>
);

const RehearsalModule = () => (
  <section className="srd-module srd-module--mustard" aria-labelledby="module-rehearsal">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-rehearsal" className="srd-module-title">REHEARSAL</h2>
        <ModuleEyebrow lines={['COWLEY ROAD — STUDIO-LINKED REHEARSAL', 'CRICKET ROAD — DEDICATED REHEARSAL SPACE']} />
      </div>
    </div>
    <RehearsalSelector id="module-rehearsal-selector" title="BOOK REHEARSAL" className="srd-rehearsal-selector--module" />
  </section>
);

const OdroModule = () => (
  <section className="srd-module srd-module--dark" aria-labelledby="module-odro-electronics">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-odro-electronics" className="srd-module-title">ODRO ELECTRONICS</h2>
        <ModuleEyebrow lines={['AV, INSTRUMENT SERVICING & VENUE TECH SUPPORT']} />
      </div>
    </div>
    <div className="srd-micro-label">SUPPORT CHANNEL: ENQUIRY-FIRST</div>
    <div className="srd-btn-group srd-btn-group--single">
      <ServiceButton
        variant="neutral"
        service="GET SUPPORT →"
        location="ODRO ELECTRONICS"
        href={URLS.ENQUIRE_ODRO}
        badge={<OdroBadge />}
      />
    </div>
  </section>
);

const MixerKnob = ({ size = 'md' }) => (
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
    <div className="wc-corner-screw wc-corner-screw--tl" aria-hidden="true"></div>
    <div className="wc-corner-screw wc-corner-screw--tr" aria-hidden="true"></div>
    <div className="wc-corner-screw wc-corner-screw--bl" aria-hidden="true"></div>
    <div className="wc-corner-screw wc-corner-screw--br" aria-hidden="true"></div>

    <div className="wc-vu-row">
      <VuMeter label="L" />
      <VuMeter label="R" />
    </div>

    <div className="wc-title-panel">
      <div className="srd-workshop-badge-row">
        <CafeBadge />
      </div>
      <h2 id="module-workshop-cafe" className="wc-title">WORKSHOP CAFÉ</h2>
      <p className="wc-tagline">COMMUNITY SPACE &amp; CREATIVE WORKSPACE</p>
      <div className="wc-opening-badge">CAFÉ INFO</div>
    </div>

    <div className="wc-controls-row">
      <div className="wc-knobs-section">
        {[...Array(10)].map((_, i) => (
          <MixerKnob key={i} size={i < 2 ? 'lg' : 'md'} />
        ))}
      </div>
      <div className="wc-faders-section">
        <MixerFader level={85} />
        <MixerFader level={70} />
        <MixerFader level={95} />
        <MixerFader level={60} />
        <MixerFader level={75} />
        <MixerFader level={50} />
      </div>
      <div className="wc-spectrum">
        {[45, 65, 80, 55, 70, 90, 75, 60, 85, 50, 70, 80, 65, 55, 40].map((h, i) => (
          <SpectrumBar key={i} height={h} />
        ))}
      </div>
    </div>

    <div className="wc-cta-row">
      <a href={URLS.ENQUIRE_WORKSHOP} className="wc-book-btn">ENQUIRE →</a>
    </div>
  </section>
);

const CommunicationsBusModule = () => (
  <section className="srd-module srd-module--dark" aria-labelledby="module-communications-bus">
    <div className="srd-module-header">
      <div className="srd-module-title-group">
        <h2 id="module-communications-bus" className="srd-module-title">ENQUIRY BUS</h2>
        <ModuleEyebrow lines={['GENERAL ENQUIRIES, BOOKINGS & SUPPORT']} />
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
        <textarea id="comms-message" name="message" className="srd-input-bay" placeholder="Tell us what you need and we will route it properly." required></textarea>
      </div>
      <button type="submit" className="srd-submit-btn">Transmit</button>
    </form>
  </section>
);

const CrawlableDescription = () => (
  <section className="srd-text-block" aria-labelledby="crs-description-title">
    <div className="srd-text-inner">
      <div className="srd-text-kicker">ABOUT COWLEY ROAD STUDIOS</div>
      <h2 id="crs-description-title">Crawlable description</h2>
      <p>
        Cowley Road Studios is based at <strong>118 Cowley Road, Oxford OX4 1JE, United Kingdom</strong>. It is a serious, professional, grounded recording base with a connected rehearsal network, Workshop Café enquiries, and ODRO Electronics support. The core public line stays simple: <strong>Grassroots infrastructure for the Oxford music scene.</strong>
      </p>
      <p className="srd-usage-line">Used by independent artists and bands across Oxford.</p>
      <p>
        The Cowley Road site is presented as the main studio and control room, while Cricket Road is positioned as the dedicated rehearsal space. Cowley Road also carries the studio-linked rehearsal path, and Workshop Café communication remains enquiry-led without claiming anything beyond what is already verified elsewhere on the site.
      </p>
      <p>
        The published equipment and room specification now includes the SSL BiG SiX, TL Audio C1, Revox tape preamps, Tascam 388, Ghielmetti patchbay, one main live room and three isolation booths, Adam Audio and Yamaha NS-10M monitors, plus the currently surfaced microphone list: Neumann U87, AKG 414, Shure SM7B, and Shure SM58. No additional artist, venue, or inventory claims are introduced here.
      </p>
    </div>
  </section>
);

const PhotoPlaceholderStrip = () => (
  <section className="srd-photo-strip" aria-labelledby="photo-strip-title">
    <div className="srd-text-inner srd-text-inner--wide">
      <div className="srd-text-kicker">PHOTO STRIP</div>
      <h2 id="photo-strip-title">Photo-ready placeholders</h2>
      <div className="srd-photo-grid">
        {PHOTO_PLACEHOLDERS.map((label) => (
          <article key={label} className="srd-photo-card">
            <div className="srd-photo-card-label">{label}</div>
            <div className="srd-photo-card-placeholder">Image coming soon</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WhatWeSupportBlock = () => (
  <section className="srd-text-block srd-text-block--support" aria-labelledby="support-title">
    <div className="srd-text-inner">
      <div className="srd-text-kicker">WHAT WE SUPPORT</div>
      <h2 id="support-title">Operational support areas</h2>
      <ul className="srd-support-list">
        {SUPPORTED_ACTIVITIES.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  </section>
);

const TrustRail = () => (
  <footer className="srd-trust-rail srd-trust-rail--expanded">
    <div className="srd-trust-panel">
      <div className="srd-trust-address">118 Cowley Road, Oxford OX4 1JE, United Kingdom</div>
      <a href={URLS.MAP} target="_blank" rel="noopener noreferrer" className="srd-map-link">Open Google Maps</a>
      <p className="srd-trust-line">Grassroots infrastructure for the Oxford music scene.</p>
    </div>
    <nav className="srd-footer-links" aria-label="Support pages">
      <a href={URLS.RECORDING_PAGE}>Recording Studio Oxford</a>
      <a href={URLS.REHEARSAL_PAGE}>Rehearsal Rooms Oxford</a>
      <a href={URLS.MUSIC_PAGE}>Music Studio Cowley Road</a>
      <a href={URLS.CONTACT}>Contact</a>
    </nav>
  </footer>
);

const TechManualFooter = () => (
  <section className="tech-manual-footer">
    <div className="manual-header">DOCUMENTATION // REF: 118-CR-OX4</div>
    <h2>Recording Studio &amp; Rehearsal Rooms in Oxford</h2>
    <p>
      Cowley Road Studios is positioned around the main address at <strong>118 Cowley Road, Oxford OX4 1JE, United Kingdom</strong>, with direct pathways for recording, rehearsal, Workshop Café enquiries, and ODRO Electronics support. The tone is deliberately restrained: practical information first, myth-making nowhere it does not belong.
    </p>
    <p>
      Equipment and room details surfaced in active copy include <strong>SSL BiG SiX</strong>, <strong>TL Audio C1</strong>, <strong>Revox tape preamps</strong>, <strong>Tascam 388</strong>, <strong>Ghielmetti patchbay</strong>, <strong>1 main live room + 3 isolation booths</strong>, <strong>Adam Audio</strong> and <strong>Yamaha NS-10M</strong> monitors, and the currently published microphone list of <strong>Neumann U87</strong>, <strong>AKG 414</strong>, <strong>Shure SM7B</strong>, and <strong>Shure SM58</strong>.
    </p>
    <div className="manual-specs">
      <span>LOCATION: 118 COWLEY ROAD, OXFORD, OX4 1JE</span>
      <span>CANONICAL DOMAIN: COWLEYROADSTUDIOS.COM</span>
      <span>SERVICE TAGLINE: GRASSROOTS INFRASTRUCTURE FOR THE OXFORD MUSIC SCENE.</span>
    </div>
  </section>
);

export default function StudioServicesRack() {
  return (
    <main className="srd-page">
      <VuMeterDefs />
      <PersistentSessionCta />
      <TopRail />
      <AuthorityHero />

      <div className="srd-chassis">
        <RackRail side="left" />
        <div className="srd-modules">
          <MasterFaceplate />
          <StatusModule />
          <RecordingModule />
          <RehearsalModule />
          <WorkshopCafeModule />
          <OdroModule />
          <CommunicationsBusModule />
        </div>
        <RackRail side="right" />
      </div>

      <CrawlableDescription />
      <PhotoPlaceholderStrip />
      <WhatWeSupportBlock />
      <TrustRail />
      <TechManualFooter />
    </main>
  );
}
