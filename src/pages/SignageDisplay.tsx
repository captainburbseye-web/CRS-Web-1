/** @jsxImportSource react */
import React, { useEffect, useRef, useState, useCallback } from 'react';

/*
  /live-display — CRS SIGNAGE SYSTEM
  ────────────────────────────────────────────────────────────────
  Built from interface components. No images. No generated graphics.
  Aesthetic: rack fascia / UK road signage / BBC engineering room /
             patchbay label / railway infrastructure / control room ID plate.

  Layout (top → bottom):
    1. SYSTEM HEADER BAR      — building ID, status LED, clock
    2. FACILITY ID STRIP      — room/zone designation plate
    3. MAIN FASCIA PANEL      — primary signage, mode-switched
    4. SECONDARY INFO GRID    — 4-cell service/status matrix
    5. LED TICKER             — amber scrolling dot-matrix
    6. WAYFINDING FOOTER      — directional arrows, room codes
  ────────────────────────────────────────────────────────────────
*/

/* ─── ticker content ──────────────────────────────────────────── */
const TICKERS: Record<'crs' | 'cafe', string[]> = {
  crs: [
    'RECORDING STUDIO  //  CONTROL ROOM A  //  LIVE ROOM  //  BOOTHS 1–3',
    'ENGINEER-LED  //  NO CHAOS POLICY  //  BOOKINGS OPEN',
    '118 COWLEY ROAD  //  OXFORD  //  OX4 1JE  //  TEL 01865 722027',
    'CRICKET ROAD REHEARSAL FACILITY  //  CURRENTLY BOOKABLE',
    'SOUNDWORKS OXFORD 1999–2024  //  NOW OPERATING AS CRS',
    'INFO@CRSOXFORD.COM  //  COWLEYROADSTUDIOS.COM',
  ],
  cafe: [
    'THE WORKSHOP CAFÉ  //  THE BILLET BUILDING  //  LEVEL 0',
    'OPEN DAILY  //  COFFEE  //  REPAIRS  //  EVENTS  //  HIRE',
    'MUSICAL CURIOS  //  TECH SOLUTIONS  //  FLEXIBLE WORKSPACE',
    'PRIVATE HIRE  //  WORKSHOPS  //  COMMUNITY EVENTS',
    'ENQUIRIES  //  INFO@CRSOXFORD.COM  //  118 COWLEY ROAD OX4',
    'PART OF THE CRS BUILDING SYSTEM  //  EAST OXFORD',
  ],
};

/* ─── facility data ───────────────────────────────────────────── */
const MODES = {
  crs: {
    buildingCode: 'CRS-01',
    zone: 'RECORDING / REHEARSAL',
    floorLabel: 'LEVELS 0–2',
    title: 'COWLEY ROAD\nSTUDIOS',
    subtitle: '118 COWLEY ROAD · OXFORD · OX4 1JE',
    roomCode: 'STUDIO BLOCK',
    cells: [
      { code: 'RM-A', label: 'RECORDING STUDIO', status: 'ACTIVE' },
      { code: 'RM-B', label: 'LIVE ROOM', status: 'ACTIVE' },
      { code: 'RM-C', label: 'CONTROL ROOM', status: 'ACTIVE' },
      { code: 'RM-D', label: 'BOOTHS 1–3', status: 'ACTIVE' },
    ],
    waypoints: [
      { dir: '↑', label: 'STUDIO BLOCK' },
      { dir: '→', label: 'CONTROL ROOM A' },
      { dir: '↓', label: 'LOADING BAY' },
      { dir: '←', label: 'CRICKET ROAD' },
    ],
    accentClass: 'sgd--crs',
  },
  cafe: {
    buildingCode: 'WKC-01',
    zone: 'SOCIAL / WORKSPACE',
    floorLabel: 'LEVEL 0',
    title: 'THE WORKSHOP\nCAFÉ',
    subtitle: 'THE BILLET BUILDING · 118 COWLEY ROAD',
    roomCode: 'BILLET BLOCK',
    cells: [
      { code: 'Z-01', label: 'CAFÉ COUNTER', status: 'OPEN' },
      { code: 'Z-02', label: 'WORKSHOP SPACE', status: 'OPEN' },
      { code: 'Z-03', label: 'VENUE / EVENTS', status: 'HIREABLE' },
      { code: 'Z-04', label: 'REPAIRS BENCH', status: 'ACTIVE' },
    ],
    waypoints: [
      { dir: '↑', label: 'STUDIO BLOCK' },
      { dir: '→', label: 'VENUE SPACE' },
      { dir: '↓', label: 'COWLEY ROAD' },
      { dir: '←', label: 'WORKSHOP' },
    ],
    accentClass: 'sgd--cafe',
  },
} as const;

/* ─── live clock ──────────────────────────────────────────────── */
function LiveClock() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const tick = () => {
      if (!ref.current) return;
      const now = new Date();
      ref.current.textContent = now.toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span ref={ref} className="sgd-clock" />;
}

/* ─── LED ticker ──────────────────────────────────────────────── */
function LedTicker({ lines, speed = 60 }: { lines: string[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number | null>(null);
  const fullText = lines.join('   ░   ') + '   ░   ';

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.textContent = fullText + fullText;
    const totalW = track.scrollWidth / 2;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last; last = now;
      posRef.current -= (speed * dt) / 1000;
      if (posRef.current <= -totalW) posRef.current += totalW;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [fullText, speed]);

  return (
    <div className="sgd-ticker" role="marquee" aria-label="System information ticker">
      <div className="sgd-ticker-label" aria-hidden="true">INFO</div>
      <div className="sgd-ticker-viewport">
        <div className="sgd-ticker-track" ref={trackRef} />
      </div>
    </div>
  );
}

/* ─── status LED ──────────────────────────────────────────────── */
function StatusLed({ color = 'green', label }: { color?: 'green' | 'amber' | 'red'; label: string }) {
  return (
    <span className="sgd-led-wrap" aria-label={label}>
      <span className={`sgd-led sgd-led--${color}`} aria-hidden="true" />
      <span className="sgd-led-label">{label}</span>
    </span>
  );
}

/* ─── cycle progress ──────────────────────────────────────────── */
function CycleBar({ duration, running, key: _k }: { duration: number; running: boolean; key?: string }) {
  const barRef   = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (barRef.current) barRef.current.style.width = '0%';
      return;
    }
    startRef.current = performance.now();
    const tick = (now: number) => {
      if (!startRef.current) return;
      const pct = Math.min(100, ((now - startRef.current) / duration) * 100);
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, duration]);

  return (
    <div className="sgd-cyclebar-track" aria-hidden="true">
      <div className="sgd-cyclebar-fill" ref={barRef} />
    </div>
  );
}

/* ─── main export ─────────────────────────────────────────────── */
export function SignageDisplay() {
  const [mode, setMode]         = useState<'crs' | 'cafe'>('crs');
  const [fading, setFading]     = useState(false);
  const [manual, setManual]     = useState(false);
  const [fullscreen, setFs]     = useState(false);
  const containerRef            = useRef<HTMLDivElement>(null);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);
  const AUTO_MS                 = 15000;

  const m = MODES[mode];

  /* transition to new mode */
  const go = useCallback((next: 'crs' | 'cafe') => {
    if (next === mode) return;
    setFading(true);
    setTimeout(() => { setMode(next); setFading(false); }, 400);
  }, [mode]);

  /* auto-cycle */
  useEffect(() => {
    if (manual) return;
    timerRef.current = setTimeout(() => go(mode === 'crs' ? 'cafe' : 'crs'), AUTO_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [mode, manual, go]);

  /* manual override → resumes auto after 45s */
  const handleManual = (next: 'crs' | 'cafe') => {
    setManual(true);
    go(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setManual(false), 45000);
  };

  /* fullscreen */
  const toggleFs = useCallback(() => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);
  useEffect(() => {
    const h = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`sgd-system ${m.accentClass} ${fading ? 'sgd-system--fading' : ''}`}
    >

      {/* ══ 1. SYSTEM HEADER BAR ════════════════════════════════ */}
      <header className="sgd-sysbar">
        <div className="sgd-sysbar-left">
          <span className="sgd-sysbar-id">CRS BUILDING MANAGEMENT SYSTEM</span>
          <span className="sgd-sysbar-sep" aria-hidden="true">//</span>
          <span className="sgd-sysbar-loc">118 COWLEY ROAD · OXFORD · OX4 1JE</span>
        </div>
        <div className="sgd-sysbar-right">
          <StatusLed color="green" label="SYSTEM LIVE" />
          <LiveClock />
          <div className="sgd-sysbar-controls">
            <button
              className={`sgd-sysbar-btn ${mode === 'crs' ? 'active' : ''}`}
              onClick={() => handleManual('crs')}
              aria-pressed={mode === 'crs'}
            >CRS</button>
            <button
              className={`sgd-sysbar-btn ${mode === 'cafe' ? 'active' : ''}`}
              onClick={() => handleManual('cafe')}
              aria-pressed={mode === 'cafe'}
            >CAFÉ</button>
            <button className="sgd-sysbar-btn sgd-sysbar-btn--fs" onClick={toggleFs} aria-label="Fullscreen">
              <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor">
                {fullscreen
                  ? <path d="M0 3h3V0H2v2H0V3zm7 0h3V2H8V0H7v3zM0 7v1h2v2h1V7H0zm7 3h1V8h2V7H7v3z"/>
                  : <path d="M0 0v3h1V1h2V0H0zm7 0v1h2v2h1V0H7zM0 7H1v2h2v1H0V7zm9 2H7v1h3V7H9v2z"/>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ══ 2. FACILITY ID STRIP ════════════════════════════════ */}
      <div className="sgd-facility-strip">
        <div className="sgd-facility-code">{m.buildingCode}</div>
        <div className="sgd-facility-divider" aria-hidden="true" />
        <div className="sgd-facility-zone">{m.zone}</div>
        <div className="sgd-facility-divider" aria-hidden="true" />
        <div className="sgd-facility-floor">{m.floorLabel}</div>
        <div className="sgd-facility-spacer" />
        <div className="sgd-facility-roomcode">{m.roomCode}</div>
      </div>

      {/* ══ 3. MAIN FASCIA PANEL ════════════════════════════════ */}
      <main className="sgd-fascia">

        {/* LEFT: room identifier plate */}
        <div className="sgd-fascia-plate">
          <div className="sgd-plate-screw sgd-plate-screw--tl" aria-hidden="true" />
          <div className="sgd-plate-screw sgd-plate-screw--tr" aria-hidden="true" />
          <div className="sgd-plate-screw sgd-plate-screw--bl" aria-hidden="true" />
          <div className="sgd-plate-screw sgd-plate-screw--br" aria-hidden="true" />
          <div className="sgd-plate-inner">
            <p className="sgd-plate-eyebrow">ZONE DESIGNATION</p>
            {m.title.split('\n').map((line, i) => (
              <p key={i} className="sgd-plate-title">{line}</p>
            ))}
            <p className="sgd-plate-sub">{m.subtitle}</p>
            <div className="sgd-plate-stripe" aria-hidden="true" />
          </div>
        </div>

        {/* RIGHT: 2×2 service status grid */}
        <div className="sgd-service-grid">
          {m.cells.map((cell) => (
            <div key={cell.code} className="sgd-service-cell">
              <div className="sgd-cell-header">
                <span className="sgd-cell-code">{cell.code}</span>
                <StatusLed color="green" label={cell.status} />
              </div>
              <p className="sgd-cell-label">{cell.label}</p>
            </div>
          ))}
        </div>

      </main>

      {/* ══ 4. LED TICKER ═══════════════════════════════════════ */}
      <LedTicker lines={TICKERS[mode]} speed={55} />

      {/* ══ 5. WAYFINDING FOOTER ════════════════════════════════ */}
      <footer className="sgd-wayfinding">
        {m.waypoints.map((wp) => (
          <div key={wp.label} className="sgd-waypoint">
            <span className="sgd-waypoint-dir" aria-hidden="true">{wp.dir}</span>
            <span className="sgd-waypoint-label">{wp.label}</span>
          </div>
        ))}
        <div className="sgd-wayfinding-spacer" />
        <CycleBar key={mode} duration={AUTO_MS} running={!manual} />
        <div className="sgd-wayfinding-ident">
          {manual ? 'MANUAL' : 'AUTO'} · DEEPEND / ODRO ENG
        </div>
      </footer>

    </div>
  );
}
