from pathlib import Path
import re

root = Path('/home/user/CRS-Web-1')

studio_services_rack = r'''/** @jsxImportSource react */
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

const ServiceButton = ({ variant = 'crs', service, location, href, badge, className = '' }) => {
  const external = href?.startsWith('http');
  return (
    <a
      className={`srd-btn srd-btn--${variant} ${className}`.trim()}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={location ? `${service} ${location}` : service}
    >
      <div className="srd-btn-content">
        {badge}
        <div className="srd-btn-labels">
          <span className="srd-btn-service">{service}</span>
          {location ? <span className="srd-btn-location">{location}</span> : null}
        </div>
      </div>
      <Led variant={variant} />
    </a>
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
    </div>
    <div className="srd-authority-actions">
      <a href={URLS.RECORDING_BOOK} target="_blank" rel="noopener noreferrer" className="srd-authority-btn srd-authority-btn--primary">BOOK RECORDING</a>
      <a href={URLS.REHEARSAL_BOOK} target="_blank" rel="noopener noreferrer" className="srd-authority-btn">BOOK REHEARSAL</a>
      <a href={URLS.CONTACT} className="srd-authority-btn">ENQUIRE</a>
      <a href={URLS.WORKSHOP_CAFE} className="srd-authority-btn">WORKSHOP CAFÉ</a>
    </div>
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
          <span className="srd-lcd-highlight">&gt; SYS.INFO:</span> 118 COWLEY ROAD, OXFORD OX4 1JE // RECORDING HQ ACTIVE // REHEARSAL ACROSS CRS NETWORK // WORKSHOP CAFÉ VIA ENQUIRY // ODRO ELECTRONICS SUPPORT
        </div>
        <div className="srd-lcd-header">SELECT SERVICE MODULE</div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-crs">●</span>
          <span>COWLEY ROAD = MAIN STUDIO &amp; ENQUIRY BASE</span>
        </div>
        <div className="srd-lcd-row">
          <span className="srd-lcd-bullet-cricket">●</span>
          <span>CRS NETWORK = LOCATION-SPECIFIC REHEARSAL OPTIONS</span>
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
        <ModuleEyebrow lines={['COWLEY ROAD + CRICKET ROAD', 'REHEARSAL ACROSS CRS NETWORK', 'SEE LOCATION-SPECIFIC OPTIONS']} />
      </div>
    </div>
    <div className="srd-btn-group">
      <ServiceButton
        variant="crs"
        service="BOOK REHEARSAL →"
        location="COWLEY ROAD"
        href={URLS.REHEARSAL_BOOK}
        badge={<CrsBadge />}
      />
      <ServiceButton
        variant="cricket"
        service="BOOK REHEARSAL →"
        location="CRICKET ROAD"
        href={URLS.CRICKET_REHEARSAL_BOOK}
        badge={<CricketBadge />}
      />
    </div>
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
      <p>
        The Cowley Road site is presented as the main studio and control room. Current support copy on the site also identifies rehearsal activity across the CRS network, including location-specific options for Cowley Road and Cricket Road, while Workshop Café communication remains enquiry-led and avoids claiming daily café service beyond what is already verified elsewhere on the site.
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
'''

(root / 'src/components/StudioServicesRack.jsx').write_text(studio_services_rack)

css_path = root / 'public/static/studio-rack-demo.css'
css = css_path.read_text()
append_marker = '/* ============================================\n   BATCH 3 PREVIEW SUPPORT BLOCKS\n   ============================================ */'
if append_marker not in css:
    css += '\n\n' + r'''
/* ============================================
   BATCH 3 PREVIEW SUPPORT BLOCKS
   ============================================ */

.srd-floating-session-cta {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 300;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.85rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.75);
  background: linear-gradient(180deg, rgba(39, 44, 34, 0.96) 0%, rgba(18, 20, 16, 0.96) 100%);
  color: #f4edd3;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
}

.srd-floating-session-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1);
}

.srd-authority-hero {
  max-width: 68rem;
  margin: 0 auto;
  padding: 4.5rem 1rem 1.5rem;
  color: #f6f2e7;
}

.srd-authority-copy {
  border: 1px solid rgba(201, 162, 39, 0.26);
  background: linear-gradient(180deg, rgba(34, 38, 30, 0.96) 0%, rgba(13, 15, 12, 0.96) 100%);
  box-shadow: 0 18px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
  padding: 1.35rem 1.2rem;
}

.srd-authority-system-line {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.5;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #d7c47a;
}

.srd-authority-system-line--muted {
  color: rgba(244, 237, 211, 0.58);
  margin-top: 0.2rem;
}

.srd-authority-hero h1 {
  margin: 0.9rem 0 0.55rem;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.srd-authority-subline,
.srd-authority-brand {
  margin: 0;
  max-width: 54rem;
  line-height: 1.6;
}

.srd-authority-subline {
  color: rgba(246, 242, 231, 0.84);
}

.srd-authority-brand {
  margin-top: 0.55rem;
  color: #d7c47a;
  font-weight: 600;
}

.srd-authority-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.srd-authority-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(12, 14, 11, 0.85);
  color: #f6f2e7;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}

.srd-authority-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(201, 162, 39, 0.75);
  background: rgba(21, 24, 19, 0.95);
}

.srd-authority-btn--primary {
  border-color: rgba(201, 162, 39, 0.7);
  color: #15140d;
  background: linear-gradient(180deg, #d7c47a 0%, #b8952d 100%);
}

.srd-authority-btn--primary:hover {
  background: linear-gradient(180deg, #e0ce87 0%, #c7a238 100%);
}

.srd-module-copy-stack {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.35rem;
}

.srd-module-copy-line {
  display: block;
  color: rgba(246, 242, 231, 0.86);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.45;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.srd-btn-group--single {
  grid-template-columns: 1fr !important;
}

.srd-workshop-badge-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.srd-text-block,
.srd-photo-strip {
  padding: 0 1rem 1.75rem;
}

.srd-text-inner {
  max-width: 68rem;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(30, 34, 28, 0.96) 0%, rgba(11, 13, 10, 0.96) 100%);
  border: 1px solid rgba(201, 162, 39, 0.22);
  box-shadow: 0 18px 44px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.05);
  padding: 1.3rem 1.2rem;
  color: #f6f2e7;
}

.srd-text-inner--wide {
  max-width: 68rem;
}

.srd-text-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #d7c47a;
}

.srd-text-block h2,
.srd-photo-strip h2 {
  margin: 0.45rem 0 0.9rem;
  font-size: clamp(1.55rem, 2.4vw, 2.2rem);
  color: #f6f2e7;
}

.srd-text-block p {
  margin: 0 0 1rem;
  line-height: 1.72;
  color: rgba(246, 242, 231, 0.86);
}

.srd-photo-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

.srd-photo-card {
  min-height: 12rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(20, 22, 19, 0.95) 0%, rgba(7, 8, 7, 0.95) 100%);
}

.srd-photo-card-label,
.srd-photo-card-placeholder {
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.srd-photo-card-label {
  color: #f6f2e7;
  font-size: 0.78rem;
}

.srd-photo-card-placeholder {
  color: rgba(246, 242, 231, 0.55);
  font-size: 0.72rem;
}

.srd-support-list {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.55rem;
  color: rgba(246, 242, 231, 0.9);
}

.srd-support-list li::marker {
  color: #d7c47a;
}

.srd-trust-rail--expanded {
  max-width: 68rem;
  margin: 0 auto 1.5rem;
  padding: 1.35rem 1.2rem;
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(201, 162, 39, 0.22);
  background: linear-gradient(180deg, rgba(17, 20, 17, 0.98) 0%, rgba(7, 8, 7, 0.98) 100%);
}

.srd-trust-panel {
  display: grid;
  gap: 0.55rem;
}

.srd-trust-address,
.srd-map-link,
.srd-trust-line {
  font-family: 'JetBrains Mono', monospace;
}

.srd-trust-address {
  color: #f6f2e7;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.srd-map-link {
  color: #d7c47a;
  text-decoration: none;
  width: fit-content;
}

.srd-trust-line {
  margin: 0;
  color: rgba(246, 242, 231, 0.8);
  line-height: 1.6;
}

.srd-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.srd-footer-links a {
  color: #f6f2e7;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .srd-photo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .srd-floating-session-cta {
    top: 0.75rem;
    right: 0.75rem;
    left: auto;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    min-height: 2.7rem;
    padding: 0.75rem 0.9rem;
  }

  .srd-authority-hero {
    padding-top: 4.2rem;
  }

  .srd-authority-actions {
    flex-direction: column;
  }

  .srd-authority-btn {
    width: 100%;
  }

  .srd-photo-grid {
    grid-template-columns: 1fr;
  }

  .srd-trust-rail--expanded {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
'''
    css_path.write_text(css)

index_path = root / 'src/index.tsx'
index = index_path.read_text()

index = index.replace(
    '<title>CRS | Oxford Recording, Rehearsal & Workshop Café</title>',
    '<title>Recording Studio & Rehearsal Rooms in Oxford | Cowley Road Studios</title>'
)
index = index.replace(
    '<meta name="description" content="Cowley Road Studios. Grassroots infrastructure for the Oxford music scene. Recording at 118 Cowley Rd, Rehearsal at Cricket Rd, and the Workshop Café." />',
    '<meta name="description" content="Cowley Road Studios at 118 Cowley Road, Oxford OX4 1JE, United Kingdom. Grassroots infrastructure for the Oxford music scene. Recording, rehearsal, Workshop Café enquiries, and ODRO Electronics support." />'
)
index = index.replace(
    '<meta name="keywords" content="recording studio oxford, rehearsal space oxford, cowley road studios, band rehearsal oxford, music production oxford, 118 cowley road, cricket road rehearsal" />',
    '<meta name="keywords" content="recording studio oxford, rehearsal rooms oxford, music studio cowley road, cowley road studios, 118 cowley road oxford, workshop cafe oxford, odro electronics" />\n  <link rel="canonical" href="https://cowleyroadstudios.com/" />'
)
index = index.replace('/static/studio-rack-demo.css?v=0.4.3', '/static/studio-rack-demo.css?v=0.5.0')

schema_pattern = re.compile(r'  <!-- Structured data for SEO -->\n  <script type="application/ld\+json">\n    \$\{JSON\.stringify\(\{.*?    \}\)\}\n  </script>', re.S)
schema_replacement = '''  <!-- Structured data for SEO -->
  <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MusicStudio",
      "name": "Cowley Road Studios",
      "description": "Grassroots infrastructure for the Oxford music scene.",
      "url": "https://cowleyroadstudios.com",
      "telephone": "+441865722027",
      "email": "info@crsoxford.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "118 Cowley Road",
        "addressLocality": "Oxford",
        "postalCode": "OX4 1JE",
        "addressCountry": "United Kingdom"
      },
      "hasMap": "https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE",
      "sameAs": [
        "https://instagram.com/cowleyroadstudios.ox"
      ]
    })}
  </script>'''
index, count = schema_pattern.subn(schema_replacement, index, count=1)
if count != 1:
    raise RuntimeError('Home schema block replacement failed')

routes_pattern = re.compile(r'// ==========================================\n// SEO LANDING PAGES — Phase 2\n// ==========================================.*?// LEGACY HOMEPAGE REDIRECT', re.S)
routes_replacement = r'''// ==========================================
// SEO SUPPORT PAGES — PREVIEW BATCH 3
// ==========================================

const SUPPORT_PAGE_STYLE = `
  :root {
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #070807;
    color: #f3f0e7;
  }
  main {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2.5rem 1rem 4rem;
  }
  .shell {
    border: 1px solid rgba(201,162,39,0.24);
    background: linear-gradient(180deg, rgba(29,33,27,0.96) 0%, rgba(9,10,9,0.96) 100%);
    box-shadow: 0 18px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05);
    padding: 1.5rem;
  }
  .eyebrow,
  .footer-links,
  .back-link,
  .cta-link {
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .eyebrow {
    color: #d7c47a;
    font-size: 0.78rem;
  }
  h1 {
    margin: 0.5rem 0 0.75rem;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.05;
  }
  p, li {
    line-height: 1.75;
    color: rgba(243,240,231,0.88);
  }
  ul { padding-left: 1.2rem; }
  li::marker { color: #d7c47a; }
  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  .cta-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.9rem 1rem;
    text-decoration: none;
    color: #13140d;
    background: linear-gradient(180deg, #d7c47a 0%, #b8952d 100%);
    border: 1px solid rgba(201,162,39,0.75);
  }
  .cta-link--secondary {
    color: #f3f0e7;
    background: rgba(12,14,11,0.85);
  }
  .meta-block {
    margin: 1.25rem 0;
    padding: 1rem;
    border-left: 3px solid #d7c47a;
    background: rgba(0,0,0,0.22);
  }
  .footer {
    margin-top: 2rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    margin-top: 1rem;
    font-size: 0.78rem;
  }
  a { color: #d7c47a; }
  @media (max-width: 640px) {
    .shell { padding: 1.15rem; }
    .cta-row { flex-direction: column; }
    .cta-link { width: 100%; }
  }
`

const renderSupportPage = ({ title, description, h1, intro, body, slug }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://cowleyroadstudios.com/${slug}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>${SUPPORT_PAGE_STYLE}</style>
</head>
<body>
  <main>
    <div class="shell">
      <a href="/" class="back-link">← Back to home</a>
      <div class="eyebrow">Cowley Road Studios</div>
      <h1>${h1}</h1>
      <p>${intro}</p>
      <div class="meta-block">
        <strong>Address:</strong> 118 Cowley Road, Oxford OX4 1JE, United Kingdom<br />
        <strong>Tagline:</strong> Grassroots infrastructure for the Oxford music scene.
      </div>
      ${body}
      <div class="cta-row">
        <a href="/" class="cta-link">Back to home</a>
        <a href="/contact" class="cta-link cta-link--secondary">Enquire</a>
      </div>
      <footer class="footer">
        <div>118 Cowley Road, Oxford OX4 1JE, United Kingdom</div>
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="/recording-studio-oxford">Recording Studio Oxford</a>
          <a href="/rehearsal-rooms-oxford">Rehearsal Rooms Oxford</a>
          <a href="/music-studio-cowley-road">Music Studio Cowley Road</a>
        </div>
      </footer>
    </div>
  </main>
</body>
</html>`

app.get('/recording-studio-oxford', (c) => {
  return c.html(renderSupportPage({
    slug: 'recording-studio-oxford',
    title: 'Recording Studio Oxford | Cowley Road Studios',
    description: 'Recording studio support at 118 Cowley Road, Oxford OX4 1JE, United Kingdom. Main studio and control room enquiries via Cowley Road Studios.',
    h1: 'Recording Studio Oxford',
    intro: 'Cowley Road Studios presents the main studio and control room at 118 Cowley Road, Oxford OX4 1JE, United Kingdom. The public position is straightforward: a serious recording base with enquiry-led support and no invented extras.',
    body: `
      <p>The recording offer is anchored to the Cowley Road site and presented as the main studio and control room. Home-page copy now aligns with the address, canonical domain, and the core tagline without drifting into speculative venue language.</p>
      <p>Current published studio specification includes SSL BiG SiX, TL Audio C1, Revox tape preamps, Tascam 388, Ghielmetti patchbay, one main live room and three isolation booths, Adam Audio and Yamaha NS-10M monitors, plus the currently surfaced microphone list of Neumann U87, AKG 414, Shure SM7B, and Shure SM58.</p>
      <p>For recording enquiries, the site routes visitors cleanly back to home or into the contact path, keeping the Rack UI front and centre.</p>
    `
  }))
})

app.get('/rehearsal-rooms-oxford', (c) => {
  return c.html(renderSupportPage({
    slug: 'rehearsal-rooms-oxford',
    title: 'Rehearsal Rooms Oxford | Cowley Road Studios',
    description: 'Rehearsal rooms across the CRS network with location-specific options linked from Cowley Road Studios in Oxford.',
    h1: 'Rehearsal Rooms Oxford',
    intro: 'Cowley Road Studios now describes rehearsal in careful terms: Cowley Road plus Cricket Road, with location-specific options across the CRS network and no made-up promises about availability or format.',
    body: `
      <p>The support copy keeps rehearsal connected to the wider CRS network while preserving Cowley Road as the canonical business address at 118 Cowley Road, Oxford OX4 1JE, United Kingdom.</p>
      <p>Internal linking routes users back to the homepage Rack UI, where the rehearsal module provides the direct booking path and the support footer links reinforce the dedicated SEO page.</p>
      <p>This page exists to support search visibility for rehearsal-related intent without replacing the main Rack-led homepage experience.</p>
    `
  }))
})

app.get('/music-studio-cowley-road', (c) => {
  return c.html(renderSupportPage({
    slug: 'music-studio-cowley-road',
    title: 'Music Studio Cowley Road | Cowley Road Studios',
    description: 'Music studio support centred on 118 Cowley Road, Oxford OX4 1JE, United Kingdom, under the Cowley Road Studios domain.',
    h1: 'Music Studio Cowley Road',
    intro: 'This support page reinforces the location association between Cowley Road Studios and 118 Cowley Road, Oxford OX4 1JE, United Kingdom, using the canonical domain cowleyroadstudios.com throughout.',
    body: `
      <p>It sits alongside the recording and rehearsal support pages to create restrained internal linking from the homepage and footer without overloading the main user journey.</p>
      <p>The language stays grounded: recording, rehearsal, Workshop Café enquiries, and ODRO Electronics support. No artist roster, no invented client list, and no unsupported operating claims.</p>
      <p>The intended result is stronger location relevance around Cowley Road while keeping the Rack UI aesthetic intact on the main site.</p>
    `
  }))
})

app.get('/music-studio-oxford', (c) => c.redirect('/music-studio-cowley-road', 301))
app.get('/cricket-road-rehearsal', (c) => c.redirect('/rehearsal-rooms-oxford', 301))

// LEGACY HOMEPAGE REDIRECT'''
index, count = routes_pattern.subn(routes_replacement, index, count=1)
if count != 1:
    raise RuntimeError('SEO routes block replacement failed')

index_path.write_text(index)

sitemap_path = root / 'public/sitemap.xml'
sitemap = sitemap_path.read_text()
if 'music-studio-cowley-road' not in sitemap:
    sitemap = sitemap.replace(
        '  <url>\n    <loc>https://cowleyroadstudios.com/rehearsal-rooms-oxford</loc>\n    <lastmod>2026-02-16</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  ',
        '  <url>\n    <loc>https://cowleyroadstudios.com/rehearsal-rooms-oxford</loc>\n    <lastmod>2026-04-04</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n\n  <url>\n    <loc>https://cowleyroadstudios.com/music-studio-cowley-road</loc>\n    <lastmod>2026-04-04</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n  '
    )
sitemap_path.write_text(sitemap)

print('Applied batch 3 preview updates to StudioServicesRack, index.tsx, and sitemap.xml')
