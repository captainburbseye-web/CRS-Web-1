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
      body: 'Mixing, tracking, writing sessions, attended playback. Hybrid signal chain — analogue warmth, digital precision. Mixes translate across three monitoring paths.',
      specs: [
        { k: 'Desk',       v: 'SSL BiG SiX — analogue summing + EQ' },
        { k: 'Processing', v: 'TL Audio C1 valve · Revox preamps · Tascam 388' },
        { k: 'Patchbay',   v: 'Ghielmetti mastering matrix' },
        { k: 'Monitoring', v: 'Adam Audio · NS-10 · Genelec system + sub' },
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
    eyebrow: 'Control Room Hire',
    title: 'A serious working control room',
    body: 'Mixing, tracking, writing sessions, attended playback. Hybrid signal chain — analogue warmth, digital precision. Mixes translate across three monitoring paths.',
    specs: [
      { k: 'Desk',       v: 'SSL BiG SiX — analogue summing + EQ' },
      { k: 'Processing', v: 'TL Audio C1 valve · Revox preamps · Tascam 388' },
      { k: 'Patchbay',   v: 'Ghielmetti mastering matrix' },
      { k: 'Monitoring', v: 'Adam Audio · NS-10 · Genelec system + sub' },
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
    eyebrow: 'Community Space & Venue Hire',
    title: 'Workshop Café & Venue',
    body: "More than a studio waiting room. Oxford's music community hub — coffee, conversation, open mics and creative workspace between sessions. Also available for private hire: showcases, workshops, events.",
    specs: [
      { k: 'What',    v: 'Café, community space and creative hub' },
      { k: 'Hire',    v: 'Private hire for gigs and workshops' },
      { k: 'Tech',    v: 'PA system · Lighting · Stage' },
      { k: 'Events',  v: 'Open mic nights and community events' },
      { k: 'Find us', v: 'Cowley Road, Oxford OX4 1JE' },
    ],
    ctas: [
      { label: 'Café & Venue Enquiry', href: URLS.ENQUIRE_WORKSHOP, primary: true, location: null },
    ],
  },
};

const NAV_ORDER = ['recording', 'rehearsal', 'controlroom', 'repairs', 'cafe'];

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

/* ─── Quick-bar CTA labels (same order as NAV_ORDER) ────────── */
const QUICK_LABELS = {
  recording:   'Book Recording',
  rehearsal:   'Book Rehearsal',
  controlroom: 'Hire Control Room',
  repairs:     'Request Repair',
  cafe:        'Venue Enquiries',
};

/* ─── Quick-access bar — top row, same grid as button bank ─── */
/* Each button is a column-aligned mirror of its large rack button below.
   Clicking triggers the identical handleSelect(id) flow. */
const QuickBar = ({ active, onSelect }) => (
  <nav className="hp-action-bar" aria-label="Quick booking">
    <div className="hp-action-bar-grid">
      {NAV_ORDER.map((id) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            className={[
              'hp-action-btn',
              'hp-action-btn--primary',
              isActive ? 'hp-action-btn--active' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onSelect(id)}
            aria-label={`${QUICK_LABELS[id]} — opens service panel`}
            aria-pressed={isActive}
          >
            {QUICK_LABELS[id]}
          </button>
        );
      })}
    </div>
  </nav>
);

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
    <div className="hp-panel-ctas" style={{ marginTop: '1rem' }}>
      <a href="/rehearsal" className="hp-cta hp-cta--page-link">
        <span>Full details</span>
        <span className="hp-cta-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
);

/* ─── Standard dark panel ─────────────────────────────────── */
const StandardPanel = ({ panel }) => (
  <div className="hp-panel-body" role="tabpanel" id={`panel-${panel.id}`}>
    <div className="hp-panel-header">
      <span className="hp-panel-eyebrow">{panel.eyebrow}</span>
      <h2 className="hp-panel-title">{panel.title}</h2>
      <p className="hp-panel-desc">{panel.body}</p>
    </div>
    <SpecTable specs={panel.specs} />
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

/* ─── Idle / hero state ───────────────────────────────────── */
const IdleState = () => (
  <div className="hp-idle" aria-label="Cowley Road Studios — select a service">
    
    {/* Top faceplate — rack-mounted sign with integrated VU meters */}
    <div className="hp-idle-faceplate">
      <img
        src="/assets/crs-rack-sign.png"
        alt="Cowley Road Studios"
        className="hp-idle-sign"
      />
    </div>

    {/* Rack-mounted display module — system node descriptor */}
    <div className="hp-idle-display">
      <div className="hp-idle-lcd">
        <div className="hp-display-line hp-display-line--location">
          OXFORD
        </div>
        <div className="hp-display-line hp-display-line--primary">
          RECORDING · REHEARSAL · PRODUCTION · VENUE
        </div>
        <div className="hp-display-line hp-display-line--secondary">
          AV / TECHNICAL SERVICES
        </div>
      </div>
    </div>

  </div>
);

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
  <div className="hp-spec-plate">
    <div className="hp-spec-header">Technical Specifications — Cowley Road Studios</div>
    <div className="hp-spec-body">
      <p><strong>Recording Studio Oxford</strong> — Cowley Road OX4 1JE &amp; Cricket Road OX4 3DJ</p>
      <p>Professional recording studio, rehearsal rooms and control room hire in Oxford. SSL BiG SiX, valve compression, hybrid analogue–digital workflow.</p>
      <p>Rehearsal rooms at Cowley Road (4-piece) and Cricket Road (8 people, Yamaha piano). ODRO Engineering amp repair and AV services. Workshop Café venue hire.</p>
    </div>
    <div className="hp-spec-footer">
      <span>EST. 2012</span>
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
    if (!activeId) return <IdleState />;
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

      {/* RACK CHASSIS — physical 19" hardware frame */}
      <section className="hp-machine" aria-label="Service display">

        <RackRail side="left" />

        <div className="hp-machine-inner">
          {/* 1U — Identity module (CRS logo + addresses + Contact) */}
          <IdentityRail />

          {/* 1U — Quick-access bar: column-aligned mirrors of the rack buttons below */}
          <QuickBar active={activeId} onSelect={handleSelect} />

          {/* 3U — SCREEN */}
          <div className="hp-screen">
            {screenContent}
          </div>

          {/* 2U — CONTROLS — physical button panel */}
          <ServiceControls active={activeId} onSelect={handleSelect} />
        </div>

        <RackRail side="right" />

      </section>

      {/* 4 — Footer */}
      <TrustStrip />

      <SeoText />
    </main>
  );
}
