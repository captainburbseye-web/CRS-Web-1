/** @jsxImportSource react */
import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Booking + nav URLs ─────────────────────────────────── */
const URLS = {
  HOME:                      '/',
  CONTACT:                   '/contact',
  RECORDING_BOOK:            'https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX',
  CRICKET_RECORDING_BOOK:    'https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX',
  REHEARSAL_BOOK:            'https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX',
  CRICKET_REHEARSAL_BOOK:    'https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX',
  CONTROL_ROOM_BOOK:         'https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX',
  CRICKET_CONTROL_ROOM_BOOK: 'https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX',
  BIG_BOOTH_BOOK:            'https://app.squareup.com/appointments/buyer/widget/se7rvqsvhnnirj/L1MAM4DDPHKXX',
  SMALL_BOOTH_BOOK:          'https://app.squareup.com/appointments/buyer/widget/6had3muutdo7io/L1MAM4DDPHKXX',
  ENQUIRE_WORKSHOP:          '/contact?service=venue',
  ENQUIRE_ODRO:              '/contact?service=repairs',
  MAP:                       'https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE',
  INSTAGRAM:                 'https://www.instagram.com/cowleyroadstudios/',
};

/* ═══════════════════════════════════════════════════════════════
   SIGNAL ENGINE — rackState store + rAF tick loop
   Single source of truth. All visuals driven by state.
   ═══════════════════════════════════════════════════════════════ */

/* Per-channel signal preset: what levels each module drives */
const SIGNAL_PRESETS = {
  idle: {
    L: { target: 0, floor: 0.04 },
    R: { target: 0, floor: 0.03 },
    master: { target: 0, floor: 0.04 },
  },
  recording: {
    L: { target: 0.88, floor: 0.06 },
    R: { target: 0.82, floor: 0.05 },
    master: { target: 0.75, floor: 0.06 },
  },
  rehearsal: {
    L: { target: 0.65, floor: 0.05 },
    R: { target: 0.70, floor: 0.05 },
    master: { target: 0.60, floor: 0.05 },
  },
  controlroom: {
    L: { target: 0.80, floor: 0.06 },
    R: { target: 0.78, floor: 0.06 },
    master: { target: 0.72, floor: 0.06 },
  },
  repairs: {
    L: { target: 0.35, floor: 0.04 },
    R: { target: 0.32, floor: 0.03 },
    master: { target: 0.30, floor: 0.04 },
  },
  venue: {
    L: { target: 0.72, floor: 0.05 },
    R: { target: 0.68, floor: 0.05 },
    master: { target: 0.65, floor: 0.05 },
  },
  cafe: {
    L: { target: 0.42, floor: 0.04 },
    R: { target: 0.44, floor: 0.04 },
    master: { target: 0.38, floor: 0.04 },
  },
};

/* Noise jitter — adds micro-randomness to idle floor */
function jitter(floor) {
  return floor + (Math.random() - 0.5) * 0.025;
}

/* Signal engine — external mutable state (not React state, drives RAF) */
function createSignalEngine() {
  const channels = {
    L: { display: 0.04, peak: 0, peakHold: 0, peakTimer: 0 },
    R: { display: 0.03, peak: 0, peakHold: 0, peakTimer: 0 },
    master: { display: 0.04, peak: 0, peakHold: 0, peakTimer: 0 },
  };

  let preset = 'idle';
  let lastTime = 0;
  let rafId = null;
  let listeners = new Set();

  const RISE_RATE = 8.0;   // fast attack
  const FALL_RATE = 2.8;   // slower decay
  const PEAK_HOLD = 1800;  // ms before peak falls
  const PEAK_FALL = 0.8;   // peak fall rate

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    const p = SIGNAL_PRESETS[preset] || SIGNAL_PRESETS.idle;

    for (const [key, ch] of Object.entries(channels)) {
      const pch = p[key] || { target: 0, floor: 0.04 };
      const noise = jitter(pch.floor);
      // Target is floor noise when idle, preset target + noise when active
      const target = preset === 'idle'
        ? noise
        : pch.target * (0.88 + Math.random() * 0.12) + noise * 0.3;

      // Asymmetric: fast rise, slower fall
      const rate = target > ch.display ? RISE_RATE : FALL_RATE;
      ch.display += (target - ch.display) * rate * dt;
      ch.display = Math.max(pch.floor * 0.5, Math.min(1.0, ch.display));

      // Peak hold
      if (ch.display > ch.peak) {
        ch.peak = ch.display;
        ch.peakHold = now + PEAK_HOLD;
      } else if (now > ch.peakHold) {
        ch.peak = Math.max(ch.display, ch.peak - PEAK_FALL * dt);
      }
    }

    listeners.forEach(fn => fn({ ...getSnapshot() }));
    rafId = requestAnimationFrame(tick);
  }

  function getSnapshot() {
    return {
      L: { display: channels.L.display, peak: channels.L.peak },
      R: { display: channels.R.display, peak: channels.R.peak },
      master: { display: channels.master.display, peak: channels.master.peak },
    };
  }

  return {
    start() {
      if (rafId) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    },
    setPreset(name) {
      preset = name || 'idle';
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    getSnapshot,
  };
}

/* Singleton engine (survives React renders) */
let _engine = null;
function getEngine() {
  if (!_engine) _engine = createSignalEngine();
  return _engine;
}

/* Hook: subscribe to signal data */
function useSignal() {
  const engine = getEngine();
  const [signal, setSignal] = useState(() => engine.getSnapshot());

  useEffect(() => {
    engine.start();
    const unsub = engine.subscribe(setSignal);
    return unsub;
    // Don't stop engine on unmount — it's a singleton
  }, []);

  return signal;
}

/* ═══════════════════════════════════════════════════════════════
   SEGMENTED VU METER — proper broadcast-style meter
   Vertical segments: green (0–60%), amber (60–85%), red (85–100%)
   ═══════════════════════════════════════════════════════════════ */

const SEGMENT_COUNT = 20;
const AMBER_START   = 12;  // segment 12 = 60%
const RED_START     = 17;  // segment 17 = 85%

function SegmentedVuMeter({ label = 'L', level = 0, peak = 0 }) {
  const peakSeg = Math.floor(peak * SEGMENT_COUNT);

  return (
    <div className="rack-vu" aria-hidden="true">
      <div className="rack-vu-body">
        <div className="rack-vu-segments">
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
            const segIdx = SEGMENT_COUNT - 1 - i; // top-to-bottom render, brightest=top
            const isLit  = segIdx < Math.round(level * SEGMENT_COUNT);
            const isPeak = segIdx === peakSeg && peak > 0.05;
            const color  = segIdx >= RED_START   ? 'red'
                         : segIdx >= AMBER_START  ? 'amber'
                         : 'green';
            return (
              <div
                key={i}
                className={[
                  'rack-vu-seg',
                  `rack-vu-seg--${color}`,
                  isLit  ? 'rack-vu-seg--lit'  : '',
                  isPeak ? 'rack-vu-seg--peak'  : '',
                ].filter(Boolean).join(' ')}
              />
            );
          })}
        </div>
        <span className="rack-vu-label">{label}</span>
      </div>
    </div>
  );
}

/* Paired L+R meters that subscribe to signal engine */
function VuMeterPair({ activeId }) {
  const signal = useSignal();
  return (
    <div className="rack-vu-pair" aria-hidden="true">
      <SegmentedVuMeter label="L" level={signal.L.display} peak={signal.L.peak} />
      <SegmentedVuMeter label="R" level={signal.R.display} peak={signal.R.peak} />
    </div>
  );
}

/* ─── Location logo ──────────────────────────────────────── */
const LocationLogo = ({ location = 'crs', size = 'md', className = '' }) => {
  const isCricket = location === 'cricket';
  return (
    <div
      aria-hidden="true"
      className={['loc-logo', `loc-logo--${size}`, `loc-logo--${location}`, className].filter(Boolean).join(' ')}
    >
      <img
        src={isCricket ? '/static/cricket-logo.png' : '/static/crs-logo.png'}
        alt={isCricket ? 'Cricket Road' : 'Cowley Road Studios'}
        className="loc-logo-img"
      />
    </div>
  );
};

/* ─── Brand plate — manufacturer's anchor, top + bottom of rack ─ */
/* Wraps the CRS logo in a linked, centred plate. position = 'top' | 'bottom' */
const BrandPlate = ({ position = 'top' }) => (
  <div className={`crs-brand-plate crs-brand-plate--${position}`}>
    <a href={URLS.HOME} className="crs-brand-plate-link" aria-label="Cowley Road Studios — home">
      <img
        src="/static/crs-logo.png"
        alt="Cowley Road Studios"
        className="crs-brand-plate-img"
        width="200"
        height="74"
      />
    </a>
  </div>
);

/* ─── Rack hardware: hex bolt + side rails ───────────────── */
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

/* ═══════════════════════════════════════════════════════════════
   RACK BUTTON — physical hardware switch
   States: idle | hover | press | active
   Physical: bevel, inset shadow, LED, translateY(1px) on press
   ═══════════════════════════════════════════════════════════════ */
function RackButton({ id, label, isActive, isCafe, onSelect }) {
  const [pressing, setPressing] = useState(false);
  const [ledPulse, setLedPulse] = useState(false);

  const handlePointerDown = useCallback(() => {
    setPressing(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setPressing(false);
  }, []);

  const handleClick = useCallback(() => {
    // Trigger LED bloom on click
    setLedPulse(true);
    setTimeout(() => setLedPulse(false), 380);
    onSelect(id);
  }, [id, onSelect]);

  const ledState = isActive ? 'active'
                 : ledPulse ? 'bloom'
                 : 'off';

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      className={[
        'rack-btn',
        isActive  ? 'rack-btn--active'  : '',
        isCafe    ? 'rack-btn--cafe'    : '',
        pressing  ? 'rack-btn--press'   : '',
      ].filter(Boolean).join(' ')}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
    >
      {/* Inset label */}
      <span className="rack-btn-label">{label}</span>
      {/* LED indicator */}
      <span className={`rack-btn-led rack-btn-led--${ledState}`} aria-hidden="true" />
    </button>
  );
}

/* ─── LED dot ─────────────────────────────────────────────── */
const Led = ({ color = 'green', on = true, pulse = false }) => (
  <span
    aria-hidden="true"
    className={['hp-led', `hp-led--${color}`, on ? 'hp-led--on' : 'hp-led--off', pulse ? 'hp-led--pulse' : ''].filter(Boolean).join(' ')}
  />
);

/* ═══════════════════════════════════════════════════════════════
   LOCATION ROUTING — which services need a location step
   ═══════════════════════════════════════════════════════════════ */

/* Services offered at both sites require a location pick */
const MULTI_LOCATION_SERVICES = new Set(['recording', 'rehearsal', 'controlroom']);

/* Location meta */
const LOCATIONS = {
  crs: {
    id: 'crs',
    name: 'Cowley Road',
    address: 'Oxford OX4 1JE',
    hash: 'cowley-road',
    tagline: 'Recording · Control Room · Rehearsal · Workshop Café · Repairs',
    desc: 'Primary CRS site — recording, control room, rehearsal, Workshop Café and ODRO Engineering.',
  },
  cricket: {
    id: 'cricket',
    name: 'Cricket Road',
    address: 'Oxford OX4 3DJ',
    hash: 'cricket-road',
    tagline: 'Rehearsal · Control Room · Recording',
    desc: 'Dedicated rehearsal facility with a larger live room for full band sessions.',
  },
};

/* Per-location panel overrides for multi-site services */
const PANEL_LOCATION_OVERRIDES = {
  recording: {
    crs: {
      eyebrow: 'Recording Studio — Cowley Road',
      title: 'Professional recording · Cowley Road',
      body: 'Hybrid analogue–digital signal path. SSL BiG SiX, valve compression, tape integration. Live room, 3 isolation booths, three-way monitoring.',
      specs: [
        { k: 'Console',    v: 'SSL BiG SiX + valve compression' },
        { k: 'Monitoring', v: 'Adam Audio · NS-10 · Genelec + sub' },
        { k: 'Mics',       v: 'U87 · C414 · SM7B · SM58' },
        { k: 'Rooms',      v: 'Live room + 3 isolation booths' },
      ],
      ctas: [{ label: 'Book Recording', href: URLS.RECORDING_BOOK, primary: true, location: 'crs' }],
    },
    cricket: {
      eyebrow: 'Recording Studio — Cricket Road',
      title: 'Professional recording · Cricket Road',
      body: 'Full recording setup at the Cricket Road site. Larger live room, ideal for full-band tracking sessions.',
      specs: [
        { k: 'Console',    v: 'SSL BiG SiX + valve compression' },
        { k: 'Monitoring', v: 'Adam Audio · NS-10 · Genelec + sub' },
        { k: 'Mics',       v: 'U87 · C414 · SM7B · SM58' },
        { k: 'Rooms',      v: 'Larger live room — full band tracking' },
      ],
      ctas: [{ label: 'Book Recording', href: URLS.CRICKET_RECORDING_BOOK, primary: true, location: 'cricket' }],
    },
  },
  controlroom: {
    crs: {
      eyebrow: 'Control Room Hire — Cowley Road',
      title: 'Control room · Cowley Road',
      body: 'Professionally tuned for critical listening, mixing and mastering. SSL BiG SiX console with SuperAnalogue pre-amps, G-Series Bus Compressor and Ghielmetti patchbay matrix. Mixes translate across three monitoring paths.',
      specs: [
        { k: 'Console',     v: 'SSL BiG SiX — SuperAnalogue preamps + EQ' },
        { k: 'Compression', v: 'SSL G-Series Bus Compressor' },
        { k: 'Patchbay',    v: 'Ghielmetti mastering matrix' },
        { k: 'Monitoring',  v: 'Adam Audio · NS-10 · Genelec system + sub' },
      ],
      ctas: [{ label: 'Hire Control Room', href: URLS.CONTROL_ROOM_BOOK, primary: true, location: 'crs' }],
    },
    cricket: {
      eyebrow: 'Control Room Hire — Cricket Road',
      title: 'Control room · Cricket Road',
      body: 'The Cricket Road control room sits directly adjacent to the larger live room — perfect for self-recording and remote session work.',
      specs: [
        { k: 'Desk',       v: 'SSL BiG SiX — analogue summing + EQ' },
        { k: 'Processing', v: 'TL Audio C1 valve · Revox preamps · Tascam 388' },
        { k: 'Patchbay',   v: 'Ghielmetti mastering matrix' },
        { k: 'Monitoring', v: 'Adam Audio · NS-10 · Genelec system + sub' },
      ],
      ctas: [{ label: 'Hire Control Room', href: URLS.CRICKET_CONTROL_ROOM_BOOK, primary: true, location: 'cricket' }],
    },
  },
};

/* ─── Panel data ─────────────────────────────────────────── */
const PANELS = {
  recording: {
    id: 'recording', label: 'Book Recording', theme: 'dark',
    eyebrow: 'Recording Studio',
    title: 'Professional recording in Oxford',
    body: 'Hybrid analogue–digital signal path. SSL BiG SiX, valve compression, tape integration. Live room, 3 isolation booths, three-way monitoring.',
    specs: [
      { k: 'Console',    v: 'SSL BiG SiX + valve compression' },
      { k: 'Monitoring', v: 'Adam Audio · NS-10 · Genelec + sub' },
      { k: 'Mics',       v: 'U87 · C414 · SM7B · SM58' },
      { k: 'Rooms',      v: 'Live room + 3 isolation booths' },
    ],
    ctas: [
      { label: 'Book — Cowley Road',  href: URLS.RECORDING_BOOK,         primary: true,  location: 'crs'     },
      { label: 'Book — Cricket Road', href: URLS.CRICKET_RECORDING_BOOK,  primary: false, location: 'cricket' },
    ],
  },

  rehearsal: {
    id: 'rehearsal', label: 'Book Rehearsal', theme: 'dark',
    eyebrow: 'Rehearsal Rooms',
    title: 'Two rooms. Both wired.',
    body: 'Cowley Road for up to 4-piece bands. Cricket Road for larger groups — bigger room, Yamaha grand piano, dedicated control room.',
    locations: [
      {
        location: 'crs', name: 'Cowley Road', post: 'OX4 1JE',
        specs: ['Up to 4-piece', 'Full backline + PA'],
        cta: { label: 'Book Rehearsal', href: URLS.REHEARSAL_BOOK },
      },
      {
        location: 'cricket', name: 'Cricket Road', post: 'OX4 3DJ',
        specs: ['Up to 8 people', 'Full backline + PA', 'Yamaha CLP grand piano'],
        cta: { label: 'Book Rehearsal', href: URLS.CRICKET_REHEARSAL_BOOK },
      },
    ],
  },

  controlroom: {
    id: 'controlroom', label: 'Hire Control Room', theme: 'dark',
    eyebrow: 'Professional Mixing & Mastering',
    title: 'A serious working control room',
    body: 'Professionally tuned for critical listening, mixing and mastering. Centred around our SSL BiG SiX console with SuperAnalogue pre-amps and G-Series Bus Compressor. Mixes translate across three monitoring paths.',
    specs: [
      { k: 'Console',     v: 'SSL BiG SiX — SuperAnalogue preamps + EQ' },
      { k: 'Compression', v: 'SSL G-Series Bus Compressor' },
      { k: 'Patchbay',    v: 'Balanced patch-bay access — Ghielmetti matrix' },
      { k: 'Monitoring',  v: 'Adam Audio · NS-10 · Genelec system + sub' },
    ],
    ctas: [
      { label: 'Hire — Cowley Road',  href: URLS.CONTROL_ROOM_BOOK,          primary: true,  location: 'crs'     },
      { label: 'Hire — Cricket Road', href: URLS.CRICKET_CONTROL_ROOM_BOOK,   primary: false, location: 'cricket' },
    ],
  },

  repairs: {
    id: 'repairs', label: 'Request Repair', theme: 'dark',
    eyebrow: 'ODRO Engineering',
    title: 'Electronics repair & AV support',
    body: 'Expert repair and servicing for musicians and venues across Oxford. We fix the gear that keeps the music scene running.',
    specs: [
      { k: 'Amps',    v: 'Guitar, bass and keyboard amp repair' },
      { k: 'Vintage', v: 'Restoration and servicing of classic gear' },
      { k: 'AV',      v: 'Installation, maintenance, event support' },
      { k: 'Based',   v: 'Cowley Road, Oxford' },
    ],
    ctas: [
      { label: 'Request Repair / Support', href: URLS.ENQUIRE_ODRO, primary: true, location: null },
    ],
  },

  cafe: {
    id: 'cafe', label: 'Workshop Café / Venue', theme: 'warm',
    eyebrow: 'Dry Hire · Solo Workspace',
    title: 'Workshop Café & Venue',
    body: 'A quiet sanctuary for deep work and focused sessions. High-speed Wi-Fi, power, great coffee. Also available for private hire: showcases, workshops and community events.',
    specs: [
      { k: 'Work',    v: 'Solo workspace · Wi-Fi · Power as standard' },
      { k: 'Hire',    v: 'Private hire for gigs and workshops' },
      { k: 'Tech',    v: 'PA system · Lighting · Stage' },
      { k: 'Events',  v: 'Open mic nights and community events' },
      { k: 'Find us', v: 'Cowley Road, Oxford OX4 1JE' },
    ],
    ctas: [
      { label: 'Café & Venue Enquiry', href: URLS.ENQUIRE_WORKSHOP, primary: true, location: null },
    ],
  },

  spacehire: {
    id: 'spacehire', label: 'Space Hire', theme: 'dark',
    eyebrow: 'Room Booking — Cowley Road',
    title: 'Choose your space',
    body: 'Four distinct environments. Book direct — no middleman.',
    specs: [],
    ctas: [],
  },

  contactus: {
    id: 'contactus', label: 'Contact Us', theme: 'dark',
    eyebrow: 'COMMS BAY',
    title: 'Get in touch',
    body: 'Venue hire, AV support, repairs, and general enquiries.',
    specs: [],
    ctas: [
      { label: 'Open Comms Bay →', href: URLS.CONTACT, primary: true, location: null },
    ],
  },
};

const NAV_ORDER = ['recording', 'spacehire', 'cafe', 'contactus'];

/* Page route for each service */
const PAGE_ROUTES = {
  recording:   '/recording',
  rehearsal:   '/rehearsal',
  controlroom: '/control-room',
  repairs:     '/repairs',
  cafe:        '/workshop-cafe',
};

/* ─── Location selector ─────────────────────────────────── */
function LocationSelector({ serviceId, onSelect, onBack }) {
  const [focusedId, setFocusedId] = useState(null);
  const panel = PANELS[serviceId];

  return (
    <div
      className="hp-loc-selector"
      role="group"
      aria-label={`Choose a location for ${panel?.eyebrow || serviceId}`}
    >
      {/* Chrome strip — same as display panel chrome */}
      <div className="hp-display-chrome" aria-hidden="true">
        <div className="hp-display-chrome-left">
          <Led color="orange" on={true} />
          <span className="hp-display-service-id">{serviceId.toUpperCase()}</span>
          <span style={{ color: 'var(--offwhite-mute)', margin: '0 0.3rem' }}>·</span>
          <span style={{ color: 'var(--offwhite-mute)', letterSpacing: '0.12em' }}>SELECT LOCATION</span>
        </div>
        <div className="hp-display-chrome-right">
          <VuMeterPair activeId={serviceId} />
        </div>
      </div>

      {/* Selector body */}
      <div className="hp-loc-body">
        <div className="hp-loc-header">
          <p className="hp-loc-instruction">Choose your location to continue.</p>
        </div>

        <div className="hp-loc-options" role="radiogroup" aria-label="Location options">
          {Object.values(LOCATIONS).map((loc) => (
            <button
              key={loc.id}
              role="radio"
              aria-checked={focusedId === loc.id}
              className={[
                'hp-loc-btn',
                `hp-loc-btn--${loc.id}`,
                focusedId === loc.id ? 'hp-loc-btn--focused' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => {
                setFocusedId(loc.id);
                // Small delay so focus state is visible before transition
                setTimeout(() => onSelect(loc.id), 180);
              }}
              aria-label={`${loc.name}, ${loc.address}`}
            >
              {/* Location logo badge */}
              <div className="hp-loc-btn-logo">
                <LocationLogo location={loc.id} size="card" />
              </div>

              {/* Location info */}
              <div className="hp-loc-btn-body">
                <div className="hp-loc-btn-name">{loc.name}</div>
                <div className="hp-loc-btn-address">{loc.address}</div>
                <div className="hp-loc-btn-desc">{loc.desc}</div>
              </div>

              {/* Hardware selector indicator */}
              <div className="hp-loc-btn-indicator" aria-hidden="true">
                <span className="hp-loc-btn-led" />
                <span className="hp-loc-btn-arrow">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Back control */}
        <div className="hp-loc-back">
          <button
            className="hp-loc-back-btn"
            onClick={onBack}
            aria-label="Back to service list"
          >
            <span aria-hidden="true">←</span> Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Identity rail ───────────────────────────────────────── */
const IdentityRail = () => (
  <div className="hp-identity-rail">
    <a href={URLS.HOME} className="hp-identity-logo-link" aria-label="Cowley Road Studios — home">
      <LocationLogo location="crs" size="rail" />
    </a>
    <div className="hp-identity-address">
      <span>Cowley Road · OX4 1JE</span>
      <span className="hp-identity-sep" aria-hidden="true">·</span>
      <span>Cricket Road · OX4 3DJ</span>
    </div>
    {/* CRS Active + Contact — top-right cluster */}
    <div className="hp-identity-right">
      <div className="hp-identity-status">
        <Led color="green" on={true} pulse={true} />
        <span>CRS ACTIVE</span>
      </div>
      <a href={URLS.CONTACT} className="hp-identity-contact">Contact</a>
    </div>
  </div>
);

/* ─── Spec table ──────────────────────────────────────────── */
const SpecTable = ({ specs, warm }) => (
  <dl className={['hp-specs', warm ? 'hp-specs--warm' : ''].filter(Boolean).join(' ')}>
    {specs.map(({ k, v }) => (
      <div key={k} className="hp-spec-row">
        <dt className="hp-spec-key">{k}</dt>
        <dd className="hp-spec-val">{v}</dd>
      </div>
    ))}
  </dl>
);

/* ─── CTA button ──────────────────────────────────────────── */
const CtaButton = ({ label, href, primary, location, warm }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className={[
      'hp-cta',
      primary ? (warm ? 'hp-cta--warm-primary' : 'hp-cta--primary') : 'hp-cta--secondary',
    ].join(' ')}
  >
    {location && <LocationLogo location={location} size="btn" />}
    <span>{label}</span>
    <span className="hp-cta-arrow" aria-hidden="true">→</span>
  </a>
);

/* ─── Workshop Café panel ─────────────────────────────────── */
const CafePanel = ({ panel, animate }) => (
  <div className="hp-cafe-panel" role="tabpanel" id="panel-cafe">
    <div className="hp-cafe-sign-header">
      <div className="hp-cafe-sign-inner">
        <span className="hp-cafe-eyebrow">
          <img src="/static/workshop-cafe-logo.png" alt="" aria-hidden="true" className="hp-cafe-logo-mark" />
          {panel.eyebrow}
        </span>
        <h2 className="hp-cafe-title">{panel.title}</h2>
        <p className="hp-cafe-subtitle">Oxford's music community hub & event venue</p>
      </div>
      <div className="hp-cafe-meters" aria-hidden="true">
        <VuMeterPair activeId="cafe" />
      </div>
    </div>
    <div className="hp-cafe-body">
      <p className="hp-cafe-desc">{panel.body}</p>
      <div className="hp-cafe-grid">
        <div className="hp-cafe-spec-cards">
          {panel.specs.map(({ k, v }) => (
            <div key={k} className="hp-cafe-spec-card">
              <span className="hp-cafe-spec-key">{k}</span>
              <span className="hp-cafe-spec-val">{v}</span>
            </div>
          ))}
        </div>
        <div className="hp-cafe-cta-block">
          <p className="hp-cafe-cta-lead">Get in touch to book a private event, enquire about hiring the venue, or find out what's on.</p>
          {panel.ctas.map(cta => (
            <CtaButton key={cta.href} {...cta} warm={true} />
          ))}
          <a href="/workshop-cafe" className="hp-cta hp-cta--warm-secondary" style={{ marginTop: '0.5rem' }}>
            <span>About Workshop Café</span>
            <span className="hp-cta-arrow" aria-hidden="true">↗</span>
          </a>
          <a href={URLS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hp-cafe-social-link">
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Rehearsal single-location panel ────────────────────── */
const RehearsalSinglePanel = ({ panel, loc }) => (
  <div className="hp-panel-body hp-panel-body--rehearsal" role="tabpanel" id="panel-rehearsal">
    <div className="hp-panel-header">
      <span className="hp-panel-eyebrow">{panel.eyebrow} — {loc.name}</span>
      <h2 className="hp-panel-title">{loc.name} Rehearsal Room</h2>
      <p className="hp-panel-desc">
        {loc.location === 'crs'
          ? 'Cowley Road rehearsal room — ideal for small bands and duo sessions up to 4 players.'
          : 'Cricket Road rehearsal facility — the larger room for full band sessions up to 8 players. Includes Yamaha grand piano.'}
      </p>
    </div>
    <div className="hp-rehearsal-split hp-rehearsal-split--single">
      <div className={`hp-rehearsal-card hp-rehearsal-card--${loc.location}`}>
        <div className="hp-rehearsal-card-head">
          <LocationLogo location={loc.location} size="card" />
          <div>
            <div className="hp-rehearsal-name">{loc.name}</div>
            <div className="hp-rehearsal-post">{loc.post}</div>
          </div>
        </div>
        <ul className="hp-rehearsal-specs">
          {loc.specs.map(s => <li key={s}>{s}</li>)}
        </ul>
        <CtaButton label={loc.cta.label} href={loc.cta.href} primary={true} location={loc.location} />
      </div>
    </div>
    <TechSpecsFAQ panelId="rehearsal" />
    <div className="hp-panel-ctas" style={{ marginTop: '1rem' }}>
      <a href="/rehearsal" className="hp-cta hp-cta--page-link">
        <span>Full details</span>
        <span className="hp-cta-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
);

/* ─── Rehearsal panel ─────────────────────────────────────── */
const RehearsalPanel = ({ panel }) => (
  <div className="hp-panel-body hp-panel-body--rehearsal" role="tabpanel" id="panel-rehearsal">
    <div className="hp-panel-header">
      <span className="hp-panel-eyebrow">{panel.eyebrow}</span>
      <h2 className="hp-panel-title">{panel.title}</h2>
      <p className="hp-panel-desc">{panel.body}</p>
    </div>
    <div className="hp-rehearsal-split">
      {panel.locations.map(loc => (
        <div key={loc.location} className={`hp-rehearsal-card hp-rehearsal-card--${loc.location}`}>
          <div className="hp-rehearsal-card-head">
            <LocationLogo location={loc.location} size="card" />
            <div>
              <div className="hp-rehearsal-name">{loc.name}</div>
              <div className="hp-rehearsal-post">{loc.post}</div>
            </div>
          </div>
          <ul className="hp-rehearsal-specs">
            {loc.specs.map(s => <li key={s}>{s}</li>)}
          </ul>
          <CtaButton label={loc.cta.label} href={loc.cta.href} primary={true} location={loc.location} />
        </div>
      ))}
    </div>
    <TechSpecsFAQ panelId="rehearsal" />
    <div className="hp-panel-ctas" style={{ marginTop: '1rem' }}>
      <a href="/rehearsal" className="hp-cta hp-cta--page-link">
        <span>Full details</span>
        <span className="hp-cta-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
);

/* ─── Standard dark panel ─────────────────────────────────── */
/* ─── Technical Specifications FAQ ───────────────────────── */
const TECH_FAQ = {
  recording: [
    { q: 'Parking', a: 'Street parking on Cowley Road — pay & display (1–2 hr) plus free residential bays on side streets. Nearest car park: Manzil Way (5 min walk).' },
    { q: 'What\'s provided', a: 'Engineer, mic setup, gain staging, signal chain management, session oversight, and final file delivery. Bring your instruments and performance ready.' },
    { q: 'Process', a: 'Book online → arrive 15 min early for line check → record → files delivered via WeTransfer within 48 hrs. Multi-track stems available on request.' },
  ],
  rehearsal: [
    { q: 'Parking', a: 'Cowley Road: pay & display on Cowley Road and free bays on adjacent streets. Cricket Road: free street parking directly outside.' },
    { q: 'Backline included', a: 'Full PA, guitar amp, bass amp, and drum kit at both locations. Cricket Road also includes Yamaha CLP grand piano. Bring leads and sticks.' },
    { q: 'Process', a: 'Book online → arrive 5 min early → room is set up and ready. Session ends on time to allow changeover. Cancel with 24 hrs notice for a full refund.' },
  ],
};

const TechSpecsFAQ = ({ panelId }) => {
  const items = TECH_FAQ[panelId];
  if (!items) return null;
  return (
    <div className="crs-recessed-panel" style={{ marginTop: '1.25rem' }}>
      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mustard)', fontWeight: 700, marginBottom: '0.75rem' }}>
        /// Technical Specifications
      </h3>
      <div className="crs-faq">
        {items.map(({ q, a }) => (
          <div key={q} className="crs-faq-item">
            <div className="crs-faq-q">{q}</div>
            <div className="crs-faq-a">{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StandardPanel = ({ panel }) => (
  <div className="hp-panel-body" role="tabpanel" id={`panel-${panel.id}`}>
    <div className="hp-panel-header">
      <span className="hp-panel-eyebrow">{panel.eyebrow}</span>
      <h2 className="hp-panel-title">{panel.title}</h2>
      <p className="hp-panel-desc">{panel.body}</p>
    </div>
    <SpecTable specs={panel.specs} />
    {/* Technical Specs FAQ for recording */}
    <TechSpecsFAQ panelId={panel.id} />
    <div className="hp-panel-ctas">
      {panel.ctas.map(cta => (
        <CtaButton key={cta.href} {...cta} warm={false} />
      ))}
      {PAGE_ROUTES[panel.id] && (
        <a href={PAGE_ROUTES[panel.id]} className="hp-cta hp-cta--page-link">
          <span>Full details</span>
          <span className="hp-cta-arrow" aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  </div>
);

/* ─── Space Hire sub-menu panel ───────────────────────────── */
const SPACE_HIRE_ROOMS = [
  {
    id:    'controlroom',
    label: 'CONTROL ROOM',
    sub:   'Pro Mixing & Mastering',
    href:  URLS.CONTROL_ROOM_BOOK,
    icon:  '⊕',
  },
  {
    id:    'bigbooth',
    label: 'PODCAST / BIG BOOTH',
    sub:   'Group Production & Rehearsal',
    href:  URLS.BIG_BOOTH_BOOK,
    icon:  '◈',
  },
  {
    id:    'smallbooth',
    label: 'MEETING / SMALL BOOTH',
    sub:   'Solo Workspace & Remote Calls',
    href:  URLS.SMALL_BOOTH_BOOK,
    icon:  '◇',
  },
  {
    id:    'venue',
    label: 'VENUE / EVENTS',
    sub:   'Workshop Café enquiries',
    href:  URLS.ENQUIRE_WORKSHOP,
    icon:  '◉',
    internal: true,
  },
];

const SpaceHirePanel = ({ onBack }) => (
  <div className="hp-panel-body" role="tabpanel" id="panel-spacehire">
    <div className="hp-panel-header">
      <span className="hp-panel-eyebrow">ROOM BOOKING — COWLEY ROAD</span>
      <h2 className="hp-panel-title">Choose your space</h2>
      <p className="hp-panel-desc">Four distinct environments. Book direct — no middleman.</p>
    </div>
    <div className="hp-spacehire-grid">
      {SPACE_HIRE_ROOMS.map(room => (
        <a
          key={room.id}
          href={room.href}
          target={room.internal ? undefined : '_blank'}
          rel={room.internal ? undefined : 'noopener noreferrer'}
          className="hp-spacehire-card"
        >
          <span className="hp-spacehire-icon" aria-hidden="true">{room.icon}</span>
          <span className="hp-spacehire-label">{room.label}</span>
          <span className="hp-spacehire-sub">{room.sub}</span>
          <span className="hp-spacehire-arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </div>
    <div className="hp-panel-ctas" style={{ marginTop: '1rem' }}>
      <a href={URLS.RECORDING_BOOK} target="_blank" rel="noopener noreferrer" className="hp-cta hp-cta--primary">
        <span>Book Recording Studio</span>
        <span className="hp-cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
);

/* ─── Contact-Us redirect panel ───────────────────────────── */
const ContactUsPanel = () => (
  <div className="hp-panel-body" role="tabpanel" id="panel-contactus">
    <div className="hp-panel-header">
      <span className="hp-panel-eyebrow">COMMS BAY — CHANNEL OPEN</span>
      <h2 className="hp-panel-title">Get in touch</h2>
      <p className="hp-panel-desc">
        Venue hire, AV support, repairs and general enquiries.<br />
        Response time: &lt;24 h · Mon–Sat
      </p>
    </div>
    <div className="hp-spacehire-grid">
      <a href="mailto:info@crsoxford.com" className="hp-spacehire-card">
        <span className="hp-spacehire-icon" aria-hidden="true">✉</span>
        <span className="hp-spacehire-label">EMAIL</span>
        <span className="hp-spacehire-sub">info@crsoxford.com</span>
        <span className="hp-spacehire-arrow" aria-hidden="true">→</span>
      </a>
      <a href="tel:+441865722027" className="hp-spacehire-card">
        <span className="hp-spacehire-icon" aria-hidden="true">☏</span>
        <span className="hp-spacehire-label">PHONE</span>
        <span className="hp-spacehire-sub">+44 (0)1865 722027</span>
        <span className="hp-spacehire-arrow" aria-hidden="true">→</span>
      </a>
      <a href={URLS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hp-spacehire-card">
        <span className="hp-spacehire-icon" aria-hidden="true">◎</span>
        <span className="hp-spacehire-label">INSTAGRAM</span>
        <span className="hp-spacehire-sub">@cowleyroadstudios.ox</span>
        <span className="hp-spacehire-arrow" aria-hidden="true">→</span>
      </a>
      <a href={URLS.MAP} target="_blank" rel="noopener noreferrer" className="hp-spacehire-card">
        <span className="hp-spacehire-icon" aria-hidden="true">⌖</span>
        <span className="hp-spacehire-label">LOCATION</span>
        <span className="hp-spacehire-sub">118 Cowley Road · OX4 1JE</span>
        <span className="hp-spacehire-arrow" aria-hidden="true">→</span>
      </a>
    </div>
    <div className="hp-panel-ctas" style={{ marginTop: '1rem' }}>
      <a href={URLS.CONTACT} className="hp-cta hp-cta--primary">
        <span>Open Comms Bay</span>
        <span className="hp-cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
);

/* ─── Display panel (chrome strip + content) ──────────────── */
const DisplayPanel = ({ activeId, locationId, animate, onBack }) => {
  const basePanel = PANELS[activeId];
  if (!basePanel) return null;
  const isCafe = basePanel.theme === 'warm';

  // Merge location-specific overrides if a location is selected
  const overrides = locationId && PANEL_LOCATION_OVERRIDES[activeId]?.[locationId];
  const panel = overrides ? { ...basePanel, ...overrides } : basePanel;

  // For rehearsal with a location, render a focused single-location card
  const isRehearsalLocated = activeId === 'rehearsal' && locationId;
  const rehearsalLoc = isRehearsalLocated
    ? basePanel.locations?.find(l => l.location === locationId)
    : null;

  return (
    <div
      key={`${activeId}-${locationId}`}
      className={[
        'hp-display-panel',
        `hp-display-panel--${panel.theme}`,
        animate ? 'hp-display-panel--enter' : '',
      ].filter(Boolean).join(' ')}
      aria-live="polite"
    >
      {!isCafe && (
        <div className="hp-display-chrome" aria-hidden="true">
          <div className="hp-display-chrome-left">
            <Led color="orange" on={true} />
            <span className="hp-display-service-id">{panel.id.toUpperCase()}</span>
            {locationId && (
              <>
                <span style={{ color: 'var(--offwhite-mute)', margin: '0 0.3rem' }}>·</span>
                <span style={{ color: 'var(--mustard)', letterSpacing: '0.14em' }}>
                  {LOCATIONS[locationId]?.name.toUpperCase()}
                </span>
              </>
            )}
          </div>
          <div className="hp-display-chrome-right">
            <VuMeterPair activeId={activeId} />
          </div>
        </div>
      )}

      {/* Location back nav for multi-site services */}
      {locationId && !isCafe && (
        <div className="hp-panel-location-nav">
          <button className="hp-panel-back-btn" onClick={onBack} aria-label="Change location">
            <span aria-hidden="true">←</span> Change location
          </button>
          <div className="hp-panel-location-badge">
            <LocationLogo location={locationId} size="btn" />
            <span>{LOCATIONS[locationId]?.name} · {LOCATIONS[locationId]?.address}</span>
          </div>
        </div>
      )}

      {isCafe ? (
        <CafePanel panel={panel} animate={animate} />
      ) : panel.id === 'spacehire' ? (
        <SpaceHirePanel onBack={() => {}} />
      ) : panel.id === 'contactus' ? (
        <ContactUsPanel />
      ) : isRehearsalLocated && rehearsalLoc ? (
        <RehearsalSinglePanel panel={basePanel} loc={rehearsalLoc} />
      ) : panel.id === 'rehearsal' ? (
        <RehearsalPanel panel={panel} />
      ) : (
        <StandardPanel panel={panel} />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ANALOGUE VU DIAL — SVG instrument
   Off-white face, black scale markings, red needle.
   Driven by signal engine level (0–1).
   ═══════════════════════════════════════════════════════════════ */
function AnalogueVuDial({ label = 'L', level = 0, peak = 0 }) {
  // Map 0–1 signal to needle angle: -45° (–∞) → +45° (0 VU) → +75° (peak)
  // Full arc: -50deg to +70deg
  const angle = -50 + level * 120;
  const peakAngle = -50 + peak * 120;

  // Needle pivot at bottom-centre of dial face
  const cx = 50, cy = 72;
  const needleLen = 38;
  const rad = (deg) => (deg - 90) * (Math.PI / 180);
  const nx = cx + needleLen * Math.cos(rad(angle));
  const ny = cy + needleLen * Math.sin(rad(angle));
  const px = cx + (needleLen - 4) * Math.cos(rad(peakAngle));
  const py = cy + (needleLen - 4) * Math.sin(rad(peakAngle));

  return (
    <div className="avu-dial" aria-hidden="true">
      <svg
        viewBox="0 0 100 80"
        className="avu-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Face plate */}
        <rect x="1" y="1" width="98" height="78" rx="3"
          fill="#F2EEE0" stroke="#2a2a2a" strokeWidth="1.5" />

        {/* Recessed bevel inner */}
        <rect x="3" y="3" width="94" height="74" rx="2"
          fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />

        {/* Scale arc — 0 to VU marks */}
        <path d="M 15 68 A 40 40 0 0 1 85 68"
          fill="none" stroke="#2a2a2a" strokeWidth="1" />

        {/* Red zone arc — rightmost 25% */}
        <path d="M 68 42 A 40 40 0 0 1 85 68"
          fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" />

        {/* Tick marks — 9 major ticks across arc */}
        {[
          [-50, false], [-37, false], [-25, false], [-12, false],
          [0, true], [12, false], [25, false], [45, true], [70, false],
        ].map(([deg, major], i) => {
          const r1 = major ? 33 : 36;
          const r2 = 40;
          const a = rad(deg + 90);
          const x1 = cx + r1 * Math.cos(a - Math.PI / 2 + Math.PI);
          const y1 = cy + r1 * Math.sin(a - Math.PI / 2 + Math.PI);
          const x2 = cx + r2 * Math.cos(a - Math.PI / 2 + Math.PI);
          const y2 = cy + r2 * Math.sin(a - Math.PI / 2 + Math.PI);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={deg >= 25 ? '#c0392b' : '#2a2a2a'}
              strokeWidth={major ? 1.5 : 0.8} />
          );
        })}

        {/* Scale labels */}
        <text x="13" y="62" fontSize="6" fill="#555" textAnchor="middle" fontFamily="monospace">−</text>
        <text x="50" y="28" fontSize="6" fill="#2a2a2a" textAnchor="middle" fontFamily="monospace">0</text>
        <text x="82" y="52" fontSize="6" fill="#c0392b" textAnchor="middle" fontFamily="monospace">+</text>

        {/* Peak hold dot */}
        {peak > 0.08 && (
          <circle cx={px} cy={py} r="2" fill="#c0392b" opacity="0.7" />
        )}

        {/* Needle — red, 1.2px, pivots from bottom centre */}
        <line
          x1={cx} y1={cy}
          x2={nx} y2={ny}
          stroke="#c0392b"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Pivot cap */}
        <circle cx={cx} cy={cy} r="2.5" fill="#1a1a1a" />
        <circle cx={cx} cy={cy} r="1.2" fill="#444" />

        {/* Glass glint */}
        <ellipse cx="35" cy="22" rx="18" ry="8"
          fill="rgba(255,255,255,0.12)" />
      </svg>
      <span className="avu-label">{label}</span>
    </div>
  );
}

/* Live-subscribed analogue dial pair */
function AnalogueDialPair() {
  const signal = useSignal();
  return (
    <div className="hp-idle-meters" aria-hidden="true">
      <AnalogueVuDial label="L" level={signal.L.display} peak={signal.L.peak} />
      <AnalogueVuDial label="R" level={signal.R.display} peak={signal.R.peak} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKYLINE OSCILLOSCOPE
   Oxford "Dreaming Spires" phosphor-trace scope.
   44-point polyline paths per mode. rAF physics loop with:
     • attack/release ballistics on currentScale
     • mains-hum breathing (60 Hz noise)
     • horizontal scanX electron-beam sweep
     • IntersectionObserver visibility gating
   Direct DOM mutations for zero-GC per-frame updates.
   SSR-safe: all window/rAF inside useEffect.
   ═══════════════════════════════════════════════════════════════ */

/* ─── 44-point paths (read-only — do not modify) ─────────── */
/*
   Coordinate space: viewBox="0 0 1000 100"
   Each array is [x0,y0, x1,y1, …] pairs.
   Y=0 is top, Y=100 is bottom. SKYLINE ground y=90; signal traces mid y=80.
*/
const OSC_PATHS = {
  /* Oxford Dreaming Spires — oscilloscope vector path  (44 pts)
     Grid: 20×12 units → SVG 880×160.  Baseline y=113 (grid y=3.5).
     Clusters L→R, routed along profile edge — no backward X moves.

     Landmark peaks (y=lowest = tallest):
       Left block     x=18–66   y=93  (h=20px)
       Left spire     x=138     y=15  Tom Tower / Christ Church
       Dome 1 crown   x=282     y=47  Radcliffe Camera
       Central spire  x=422     y=7   St Mary the Virgin — TALLEST
       Dome 2 crown   x=548     y=57  Sheldonian / All Souls
       Medium tower   x=616–658 y=65  New College
       Right spire    x=730     y=13  Magdalen Tower — 2nd tallest
       Right block    x=796–849 y=93  (h=20px)                       */
  /* ═══ CANONICAL DREAMING SPIRES — DO NOT EDIT COORDINATES ═══
     Hand-crafted Oxford skyline: low-left dome, two spires, mid
     crenellated cluster, central dome/drum, VERY TALL right spire,
     busy right cluster.  viewBox="0 0 1000 100", ground at y=90.
     All animation (scale, hum, beam, morph) works around this fixed
     geometry.  Source: user-supplied 2026-05-01, frozen canonical.
     ═══════════════════════════════════════════════════════════════ */
  SKYLINE: [
       0,  90,   40,  90,   50,  82,   60,  76,   70,  72,   80,  70,
      90,  72,  100,  76,  110,  82,  120,  90,  140,  90,  150,  70,
     160,  50,  170,  32,  180,  22,  190,  32,  200,  50,  210,  70,
     220,  90,  240,  90,  250,  78,  260,  70,  270,  66,  280,  64,
     290,  66,  300,  70,  310,  78,  320,  90,  340,  90,  350,  80,
     360,  70,  370,  64,  380,  60,  390,  58,  400,  60,  410,  64,
     420,  70,  430,  80,  440,  90,  460,  90,  470,  78,  480,  66,
     490,  54,  500,  44,  510,  36,  520,  32,  530,  36,  540,  44,
     550,  54,  560,  66,  570,  78,  580,  90,  600,  90,  610,  72,
     620,  54,  630,  36,  640,  22,  650,  12,  660,   8,  670,  12,
     680,  22,  690,  36,  700,  54,  710,  72,  720,  90,  740,  90,
     750,  80,  760,  70,  770,  64,  780,  60,  790,  62,  800,  66,
     810,  72,  820,  80,  830,  90,  850,  90,  860,  84,  870,  80,
     880,  78,  890,  80,  900,  84,  910,  90,  930,  90,  950,  90,
     970,  90, 1000,  90,
  ],

  /* CRS brand mark — angular logo-form waveform */
  BRAND: [
     0,80,  20,80,  40,80,  60,40,  80,40,  100,80,
   120,80, 140,80,  160,40,  180,40,  200,80,  220,80,
   240,80, 250,120, 260,120, 270,80,  280,80,  300,80,
   310,40, 320,40,  330,80,  340,80,  360,80,  370,60,
   380,40, 390,60,  400,80,  420,80,  440,80,  460,40,
   480,40, 500,80,  520,80,  540,80,  560,80,  580,80,
   600,80, 640,80,  680,80,  720,80,  760,80,  800,80,
   840,80, 880,80,
  ],

  /* Recording — dense analogue signal trace  (44 pts) */
  RECORDING: [
     0,80,  20,60,  40,100, 55,40,  65,120, 75,30,
    85,110, 95,50,  105,90, 115,45, 125,105, 135,55,
   145,95, 155,42,  165,112, 175,38, 185,108, 195,52,
   205,88, 215,65,  225,95, 235,48,  245,100, 255,58,
   265,85, 275,70,  285,78, 295,62,  305,90, 315,55,
   325,98, 335,50,  345,102, 355,45, 365,108, 375,38,
   385,112, 395,52,  410,88, 430,72, 570,80, 800,80,
   840,80, 880,80,
  ],

  /* Café — smooth warm sine-ish curve  (44 pts) */
  CAFE: [
     0,80,  20,72,  40,58,  60,48,  80,45,  100,48,
   120,58, 140,72,  160,80, 180,88,  200,98, 220,108,
   240,112, 260,108, 280,98, 300,88,  320,80, 340,72,
   360,60, 380,52,  400,50, 420,52,  440,60, 460,72,
   480,80, 500,88,  520,96, 540,104, 560,108, 580,104,
   600,96, 620,88,  640,80, 660,74,  680,70, 700,72,
   720,76, 740,80,  760,80, 790,80,  820,80, 850,80,
   870,80, 880,80,
  ],

  /* Repairs / ODRO — sawtooth diagnostic signal  (44 pts) */
  REPAIRS: [
     0,80,  20,80,  21,30,  40,30,  60,30,  61,80,
    80,80,  81,30, 100,30,  120,30, 121,80, 140,80,
   141,30, 160,30, 180,30,  181,80, 200,80, 201,30,
   220,30, 240,30, 241,80,  260,80, 261,30, 280,30,
   300,30, 301,80, 320,80,  321,30, 340,30, 360,30,
   361,80, 380,80, 400,80,  420,80, 440,80, 460,80,
   490,80, 530,80, 580,80,  640,80, 720,80, 800,80,
   850,80, 880,80,
  ],
};

/* Map active service ids to oscilloscope modes */
const OSC_MODE_MAP = {
  null:        'SKYLINE',
  recording:   'RECORDING',
  rehearsal:   'SKYLINE',
  controlroom: 'RECORDING',
  roomhire:    'BRAND',
  repairs:     'REPAIRS',
  cafe:        'CAFE',
  spacehire:   'SKYLINE',
  contactus:   'SKYLINE',
};

/* ─── Physics constants (tunable, see brief §3) ─────────────
   These are the ONLY values that govern feel — paths are above.
*/
/* Golden Build v1.4 physics — fractional lerp, not rate*dt */
const OSC_ATTACK  = 0.85;  // lerp fraction toward target when rising  (fast snap)
const OSC_RELEASE = 0.10;  // lerp fraction toward target when falling (slow phosphor decay)
const OSC_SCALE_K = 0.70;  // rawSignal → scale deviation (was 0.15 — wider swing for boutique feel)
const OSC_FLOOR   = 0.05;  // minimum rawSignal (idle breathing floor)
const OSC_HUM_AMP = 0.022; // mains-hum breathing amplitude — visible slow pulse
const OSC_HUM_HZ  = 0.40;  // hum freq (Hz) — very slow breath, ~2.5 s cycle
const OSC_BEAM_PERIOD = 3500; // ms for one full scan sweep — unhurried

/* Pivot Y per mode: skyline breathes from its baseline (Y=113); signals from midline (Y=80) */
const OSC_PIVOT_Y = {
  SKYLINE:    90,  // ground-anchored at y=90 — canonical Dreaming Spires ground line
  BRAND:      80,
  RECORDING:  80,
  CAFE:       80,
  REPAIRS:    80,
};

/* Convert flat [x0,y0,x1,y1…] array into SVG polyline points string */
function ptsToPolyline(pts) {
  let s = '';
  for (let i = 0; i < pts.length; i += 2) {
    s += `${pts[i]},${pts[i + 1]} `;
  }
  return s.trim();
}

/* Morph between two sets of Y values using linear interpolation */
function morphPts(from, to, t) {
  const result = new Float32Array(from.length);
  for (let i = 0; i < from.length; i += 2) {
    result[i]     = from[i];                                   // X stays fixed
    result[i + 1] = from[i + 1] + (to[i + 1] - from[i + 1]) * t; // Y lerps
  }
  return result;
}

/* ─── Component ──────────────────────────────────────────── */
function SkylineOscilloscope({ activeId }) {
  const svgRef        = useRef(null);
  const dimPathRef    = useRef(null);
  const activePathRef = useRef(null);
  const beamRef       = useRef(null);
  const rafRef        = useRef(null);
  const visibleRef    = useRef(false);
  const stateRef      = useRef({
    currentScale: 1.0,
    morphT:       1.0,  // 0→1 morph progress between prev and next path
    fromPts:      null,
    toPts:        null,
    lastMode:     null,
    lastTime:     0,
  });

  /* ─ Derive SVG path string from current physics state ─── */
  function buildPolylineStr(pts, scale, pivotY) {
    // Scale Y values around pivotY:
    //   SKYLINE → pivotY=140 (ground): spires grow upward from base
    //   Signal traces → pivotY=80 (midline): trace expands symmetrically
    const cy = pivotY ?? 80;
    let s = '';
    for (let i = 0; i < pts.length; i += 2) {
      const x = pts[i];
      const y = cy + (pts[i + 1] - cy) * scale;
      s += `${x.toFixed(1)},${y.toFixed(1)} `;
    }
    return s.trim();
  }

  /* ─ rAF tick ─────────────────────────────────────────── */
  function tick(now) {
    if (!visibleRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const st  = stateRef.current;
    const dt  = Math.min((now - st.lastTime) / 1000, 0.05);
    st.lastTime = now;

    /* Mode lookup from current activeId (closure via ref) */
    const mode    = OSC_MODE_MAP[activeRef.current] || 'SKYLINE';
    const modePts = OSC_PATHS[mode];

    /* Handle mode transition: start morph when mode changes */
    if (mode !== st.lastMode) {
      const prevMode = st.lastMode || 'SKYLINE';
      st.fromPts  = new Float32Array(OSC_PATHS[prevMode] || OSC_PATHS.SKYLINE);
      st.toPts    = new Float32Array(modePts);
      st.morphT   = 0;
      st.lastMode = mode;
    }

    /* Advance morph (0→1 over ~0.5s) */
    if (st.morphT < 1) {
      st.morphT = Math.min(1, st.morphT + dt * 2.2);
    }

    /* Interpolated path */
    const pts = st.morphT >= 1
      ? new Float32Array(modePts)
      : morphPts(st.fromPts, st.toPts, st.morphT * st.morphT * (3 - 2 * st.morphT)); // smoothstep

    /* Signal source — autonomous transients (Golden Build v1.4)
       Decoupled from rack engine: scope lives independently.
       Rare high spikes (3 % chance) give the "boutique transient" feel;
       otherwise a quiet floor keeps the silhouette still.            */
    const rawSignal = Math.random() > 0.97 ? Math.random() : OSC_FLOOR;

    /* Target scale: 1 + signal * K + hum */
    const hum = Math.sin(now * 0.001 * OSC_HUM_HZ * Math.PI * 2) * OSC_HUM_AMP;
    const targetScale = 1.0 + rawSignal * OSC_SCALE_K + hum;

    /* Attack / release — direct fractional lerp (frame-rate independent) */
    const frac = targetScale > st.currentScale ? OSC_ATTACK : OSC_RELEASE;
    st.currentScale += (targetScale - st.currentScale) * frac;

    /* Scale clamp per mode:
       SKYLINE: tight 0.98–1.02 — silhouette nearly static, slow breath only.
                The thick dim stroke carries the shape; motion blurs it.
       Signal traces: wide 0.55–1.50 for expressive swing.                */
    const isSkyline = (mode === 'SKYLINE');
    const scaleMin = isSkyline ? 0.98 : 0.55;
    const scaleMax = isSkyline ? 1.02 : 1.50;
    st.currentScale = Math.max(scaleMin, Math.min(scaleMax, st.currentScale));

    /* Build polyline string — use mode-appropriate pivot */
    const pivotY = OSC_PIVOT_Y[mode] ?? 80;
    const polyStr = buildPolylineStr(pts, st.currentScale, pivotY);

    /* Beam X position — sweeps 0→880 over OSC_BEAM_PERIOD ms */
    const beamX = ((now % OSC_BEAM_PERIOD) / OSC_BEAM_PERIOD) * 880;

    /* Mask rect: reveal left of beam (beam is the "writing" edge) */
    // maskRect x=0 → beamX reveals the lit trace; beyond beam is dim
    const revealFrac = beamX / 880;

    /* Voltage jitter — sub-pixel CRT beam wobble applied to active crest only.
       Generates a random ±1 px translateY each frame so the bright line
       shimmers like a real phosphor trace under mains load. The dim
       silhouette stays locked — only the lit crest vibrates. */
    const voltageJitter = (Math.random() - 0.5) * 1.6;

    /* DOM mutations (no React re-render) */
    if (dimPathRef.current)    dimPathRef.current.setAttribute('points', polyStr);
    if (activePathRef.current) {
      activePathRef.current.setAttribute('points', polyStr);
      activePathRef.current.style.transform = `translateY(${voltageJitter.toFixed(2)}px)`;
    }
    if (beamRef.current) {
      beamRef.current.setAttribute('transform', `translate(${beamX.toFixed(1)},0)`);
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  /* activeId as ref so tick closure always sees latest value */
  const activeRef = useRef(activeId);
  useEffect(() => { activeRef.current = activeId; }, [activeId]);

  /* Mount: start rAF loop + IntersectionObserver */
  useEffect(() => {
    /* SSR guard */
    if (typeof window === 'undefined') return;

    const el = svgRef.current;
    if (!el) return;

    /* IntersectionObserver — pause when off screen */
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    io.observe(el);

    /* Seed state */
    const st = stateRef.current;
    st.lastTime = performance.now();
    st.lastMode = OSC_MODE_MAP[activeRef.current] || 'SKYLINE';
    st.fromPts  = new Float32Array(OSC_PATHS[st.lastMode]);
    st.toPts    = new Float32Array(OSC_PATHS[st.lastMode]);
    st.morphT   = 1;

    /* Start loop */
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // runs once

  return (
    <div className="hp-osc-frame" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="hp-osc-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        <defs>
          {/* ── SIGNAL-INTENSITY GRADIENT — green→mustard→red, bottom→top ─
              Y coordinates in viewBox space (0=top, 100=bottom).
              gradientUnits="userSpaceOnUse" so the gradient is anchored
              to the SVG canvas regardless of path shape.
              Both dim and active traces share this gradient so colour
              zones always align: safe green at base, amber in mid-range,
              danger red at the very tips of the tallest spires.
          ─────────────────────────────────────────────────────────── */}
          {/* ── SILHOUETTE GRADIENT — near-black base, hair of green at peak ──
              The dim layer is a dark solid mass (buildings), NOT a lava lamp.
              Only the very topmost 15 % picks up any colour; the rest is
              near-black so the roofline reads as architectural mass.
          ─────────────────────────────────────────────────────────── */}
          <linearGradient id="skyline-intensity" x1="0" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            {/* base — essentially black */}
            <stop offset="0%"   stopColor="#010801" />
            {/* lower body — very dark green, barely visible */}
            <stop offset="60%"  stopColor="#021204" />
            {/* upper body — a hint of deep green on the upper walls */}
            <stop offset="85%"  stopColor="#041a06" />
            {/* roofline crest — just enough green to separate sky from building */}
            <stop offset="100%" stopColor="#0a3010" />
          </linearGradient>

          {/* ── ACTIVE CREST GRADIENT — pure phosphor green only ──────────
              The lit crest is always phosphor green — no orange, no red.
              Single-hue gradient keeps the trace reading as a CRT beam,
              not a heat-map.
          ─────────────────────────────────────────────────────────── */}
          <linearGradient id="skyline-intensity-active" x1="0" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1aef40" />
            <stop offset="50%"  stopColor="#59ff3a" />
            <stop offset="85%"  stopColor="#7fff60" />
            <stop offset="100%" stopColor="#a0ffaa" />
          </linearGradient>

          {/* ── BEAM GRADIENT — red (danger) → amber (mid) → green (safe) ──
              Horizontal L→R gradient applied to the active crest trace.
              Maps spectral urgency to screen position: the very tall right
              spires light up amber/red while the left roofline stays green.
          ─────────────────────────────────────────────────────────── */}
          {/* Vertical gradient: red tip → amber → green base */}
          <linearGradient id="osc-beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#ff4b2a" />
            <stop offset="40%"  stopColor="#ffd43a" />
            <stop offset="100%" stopColor="#1aff40" />
          </linearGradient>

          {/* Active-crest glow filter — dual blur for CRT phosphor halo */}
          <filter id="osc-glow" x="-30%" y="-60%" width="160%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="halo" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="core" />
            <feMerge>
              <feMergeNode in="halo" />
              <feMergeNode in="core" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Beam glow — vertical electron-gun line */}
          <filter id="osc-beam-glow" x="-300%" y="-20%" width="700%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

        </defs>

        {/* CRT phosphor dot-grid — 4 vertical, 3 horizontal lines */}
        <g className="hp-osc-grid">
          {[200, 400, 600, 800].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" />
          ))}
          {[25, 50, 75].map(y => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y} />
          ))}
        </g>

        {/* ── SILHOUETTE MASS — solid near-black building band ──────
            ~115px thick stroke floods from roofline down to frame base.
            No glow — reads as solid architectural mass, not a lava lamp.
        ─────────────────────────────────────────────────────────── */}
        <polyline
          ref={dimPathRef}
          points={ptsToPolyline(OSC_PATHS.SKYLINE)}
          fill="none"
          stroke="#021204"
          strokeWidth="115"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          className="hp-osc-dim"
        />

        {/* ── ACTIVE CREST — red→amber→green gradient beam, 3px ────────
            Rides the roofline. Vertical gradient maps voltage to colour.
            Drop-shadow glow — no filter SVG element needed on this pass.
        ─────────────────────────────────────────────────────────── */}
        <polyline
          ref={activePathRef}
          points={ptsToPolyline(OSC_PATHS.SKYLINE)}
          fill="none"
          stroke="url(#osc-beam-gradient)"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          filter="url(#osc-glow)"
          className="hp-osc-active"
        />

        {/* ── ELECTRON BEAM ─────────────────────────────────────────
            Vertical scan line. Beam colour follows the gradient zone
            it's currently painting — approximated as the beam-tip
            bright green (safe zone most of the time).
        ─────────────────────────────────────────────────────────── */}
        <g ref={beamRef} filter="url(#osc-beam-glow)" className="hp-osc-beam">
          <line
            x1="0" y1="0" x2="0" y2="100"
            stroke="rgba(140,255,140,0.70)"
            strokeWidth="1.5"
          />
          <ellipse cx="0" cy="85" rx="2" ry="4"
            fill="rgba(180,255,180,0.30)"
          />
        </g>
      </svg>

    </div>
  );
}

/* ─── Idle / hero state ───────────────────────────────────── */
function IdleState({ activeId = null }) {
  return (
    <div className="hp-idle" aria-label="Cowley Road Studios — select a service">

      {/* Display module sits at the top — fills the black gap above the sign */}
      <div className="hp-idle-display">
        <div className="hp-idle-lcd">
          <div className="hp-display-line hp-display-line--location">
            OXFORD
          </div>
          <div className="hp-display-line hp-display-line--primary">
            RECORDING · REHEARSAL · PRODUCTION · VENUE
          </div>
          <div className="hp-display-line hp-display-line--tagline">
            GRASSROOTS CREATIVE INFRASTRUCTURE · OXFORD
          </div>
        </div>
      </div>

      {/* Sign faceplate — rack-mounted, sits below the display */}
      <div className="hp-idle-faceplate">
        <img
          src="/assets/crs-rack-sign.png"
          alt="Cowley Road Studios"
          className="hp-idle-sign"
        />
      </div>

      {/* Skyline oscilloscope — phosphor-trace Dreaming Spires scope — DO NOT TOUCH */}
      <SkylineOscilloscope activeId={activeId} />

    </div>
  );
}

/* ─── Hardware service controls ───────────────────────────── */
const ServiceControls = ({ active, onSelect }) => (
  <div className="hp-controls" aria-label="Service selector" role="tablist">
    <div className="hp-controls-rail" aria-hidden="true" />
    <div className="hp-controls-buttons">
      {NAV_ORDER.map((id) => {
        const p = PANELS[id];
        return (
          <RackButton
            key={id}
            id={id}
            label={p.label}
            isActive={active === id}
            isCafe={id === 'cafe'}
            onSelect={onSelect}
          />
        );
      })}
    </div>
    <div className="hp-controls-status" aria-hidden="true">
      <Led color="green" on={true} pulse={true} />
      <span>ONLINE</span>
    </div>
  </div>
);

/* ─── Trust / footer strip ────────────────────────────────── */
const TrustStrip = () => (
  <footer className="hp-trust-strip">
    <div className="hp-trust-inner">
      <div className="hp-trust-brand">
        <LocationLogo location="crs" size="footer" />
        <p className="hp-trust-tag">Grassroots infrastructure for the Oxford music scene.</p>
      </div>
      <div className="hp-trust-links">
        <a href={URLS.REHEARSAL_BOOK}    target="_blank" rel="noopener noreferrer">Book Rehearsal</a>
        <a href={URLS.RECORDING_BOOK}    target="_blank" rel="noopener noreferrer">Book Recording</a>
        <a href={URLS.CONTROL_ROOM_BOOK} target="_blank" rel="noopener noreferrer">Hire Control Room</a>
        <a href={URLS.ENQUIRE_WORKSHOP}>Venue Enquiries</a>
        <a href={URLS.CONTACT}>Contact</a>
        <a href={URLS.INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <div className="hp-trust-locations">
        <div className="hp-trust-address">
          <strong>Cowley Road Studios</strong>
          <span>118 Cowley Road, Oxford OX4 1JE</span>
          <a href={URLS.MAP} target="_blank" rel="noopener noreferrer">Maps →</a>
        </div>
        <div className="hp-trust-address">
          <strong>Cricket Road Studios</strong>
          <span>Cricket Road, Oxford OX4 3DJ</span>
        </div>
      </div>
    </div>
    <div className="hp-trust-base">
      <span>© Cowley Road Studios · Oxford</span>
      <span>ODRO Engineering · Repairs &amp; AV Support</span>
    </div>
  </footer>
);

/* ─── Manufacturer's spec plate ──────────────────────────── */
const SeoText = () => (
  <div className="hp-spec-plate crs-recessed-panel" style={{ margin: '0', borderRadius: '0' }}>
    <div className="hp-spec-header">Technical Specifications — Cowley Road Studios</div>
    <div className="hp-spec-body">
      <p><strong>Recording Studio Oxford</strong> — Cowley Road OX4 1JE &amp; Cricket Road OX4 3DJ</p>
      <p>Professional recording studio, rehearsal rooms and control room hire in Oxford. SSL BiG SiX, valve compression, hybrid analogue–digital workflow.</p>
      <p>Rehearsal rooms at Cowley Road (4-piece) and Cricket Road (8 people, Yamaha piano). ODRO Engineering amp repair and AV services. Workshop Café venue hire.</p>
    </div>
    <div className="hp-spec-footer">
      <span>OXFORD</span>
      <span>OX4 1JE</span>
      <span>ODRO ENGINEERING</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   ROOT — manages active state + drives signal engine
   ═══════════════════════════════════════════════════════════════ */
export default function StudioServicesRack() {
  const [activeId,    setActiveId]    = useState(null);
  const [locationId,  setLocationId]  = useState(null);  // null | 'crs' | 'cricket'
  const [showLocPick, setShowLocPick] = useState(false);  // location-selector layer visible
  const [animate,     setAnimate]     = useState(false);
  const [powered,     setPowered]     = useState(false);

  /* Power-on LED sweep — runs once on mount */
  useEffect(() => {
    const t = setTimeout(() => setPowered(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* Deep-link: read URL hash on mount to pre-select service + location */
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    // Pattern: #<service>  or  #<service>-cowley-road / #<service>-cricket-road
    const locMap = { 'cowley-road': 'crs', 'cricket-road': 'cricket' };
    for (const [locHash, locId] of Object.entries(locMap)) {
      for (const svcId of NAV_ORDER) {
        if (hash === `${svcId}-${locHash}`) {
          setActiveId(svcId);
          setLocationId(locId);
          getEngine().setPreset(svcId);
          return;
        }
      }
    }
    if (PANELS[hash]) {
      setActiveId(hash);
      if (MULTI_LOCATION_SERVICES.has(hash)) setShowLocPick(true);
      getEngine().setPreset(hash);
    }
  }, []);

  /* Update URL hash to support deep linking */
  const pushHash = useCallback((svcId, locId) => {
    if (!svcId) { history.replaceState(null, '', window.location.pathname); return; }
    const locHash = locId === 'crs' ? 'cowley-road' : locId === 'cricket' ? 'cricket-road' : null;
    const hash = locHash ? `${svcId}-${locHash}` : svcId;
    history.replaceState(null, '', `#${hash}`);
  }, []);

  /* Service button press */
  const handleSelect = useCallback((id) => {
    const next = activeId === id ? null : id;

    if (!next) {
      // Deselect — return to idle
      setActiveId(null);
      setLocationId(null);
      setShowLocPick(false);
      getEngine().setPreset('idle');
      pushHash(null, null);
      return;
    }

    setActiveId(next);
    getEngine().setPreset(next);

    if (MULTI_LOCATION_SERVICES.has(next)) {
      // Multi-site service → show location picker
      setLocationId(null);
      setShowLocPick(true);
      pushHash(next, null);
    } else {
      // Single-site → go straight to panel
      setLocationId(null);
      setShowLocPick(false);
      pushHash(next, null);
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  }, [activeId, pushHash]);

  /* Location button press */
  const handleLocationSelect = useCallback((locId) => {
    setLocationId(locId);
    setShowLocPick(false);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
    pushHash(activeId, locId);
  }, [activeId, pushHash]);

  /* Back from location picker → deselect service */
  const handleLocBack = useCallback(() => {
    setActiveId(null);
    setLocationId(null);
    setShowLocPick(false);
    getEngine().setPreset('idle');
    pushHash(null, null);
  }, [pushHash]);

  /* Back from service panel → back to location picker */
  const handlePanelBack = useCallback(() => {
    setLocationId(null);
    setShowLocPick(true);
    pushHash(activeId, null);
  }, [activeId, pushHash]);

  const isCafe = activeId === 'cafe';

  /* What to show in the screen slot */
  const screenContent = (() => {
    if (!activeId) return <IdleState activeId={null} />;
    if (showLocPick) return (
      <LocationSelector
        serviceId={activeId}
        onSelect={handleLocationSelect}
        onBack={handleLocBack}
      />
    );
    return (
      <DisplayPanel
        activeId={activeId}
        locationId={locationId}
        animate={animate}
        onBack={MULTI_LOCATION_SERVICES.has(activeId) ? handlePanelBack : null}
      />
    );
  })();

  return (
    <main className={[
      'hp-page',
      isCafe    ? 'hp-page--cafe'    : '',
      powered   ? 'hp-page--powered' : '',
    ].filter(Boolean).join(' ')}>

      {/* BRAND PLATE — top manufacturer anchor, links home */}
      <BrandPlate position="top" />

      {/* RACK CHASSIS — physical 19" hardware frame
          Rails wrap EVERYTHING: interactive screen + documentation unit.
          This is one unified chassis — rails run floor to ceiling.        */}
      <section className="hp-machine" aria-label="Service display">

        <RackRail side="left" />

        {/* Centre column — screen above, documentation bay below */}
        <div className="hp-chassis-column">

          <div className="hp-machine-inner">
            {/* 3U — SCREEN — OXFORD LCD is the absolute top of the rack */}
            <div className="hp-screen">
              {screenContent}
            </div>

            {/* 2U — CONTROLS — physical button panel */}
            <ServiceControls active={activeId} onSelect={handleSelect} />
          </div>

          {/* DOCUMENTATION UNIT — recessed bay bolted into the same rails */}
          <div className="hp-documentation-unit">
            <TrustStrip />
            <SeoText />

            {/* MANUFACTURER'S SEAL — engraved plate at chassis base */}
            <div className="hp-chassis-seal">
              <a href={URLS.HOME} className="hp-chassis-seal-link" aria-label="Cowley Road Studios — home">
                <img
                  src="/static/crs-logo.png"
                  alt="Cowley Road Studios"
                  className="hp-chassis-seal-img"
                  width="160"
                  height="59"
                />
              </a>
              <p className="hp-chassis-seal-sub">OXFORD · ODRO ENGINEERING</p>
            </div>
          </div>

        </div>{/* /hp-chassis-column */}

        <RackRail side="right" />

      </section>
    </main>
  );
}
