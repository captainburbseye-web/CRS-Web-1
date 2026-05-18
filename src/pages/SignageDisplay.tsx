/** @jsxImportSource react */
import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────────
   SIGNAGE DISPLAY  —  /live-display
   Pure kiosk/signage page. No nav, no links, no site chrome.
   Auto-cycles CRS → Café every 12 seconds.
   Real rack sign images as hero. Amber LED ticker beneath.
   Dreaming Spires Oxford skyline waveform behind everything.
   Fullscreen API support for actual display hardware.
   ───────────────────────────────────────────────────────────────── */

/* ─── Ticker content ──────────────────────────────────────────── */
const TICKERS: Record<'crs' | 'cafe', string[]> = {
  crs: [
    'COWLEY ROAD STUDIOS  ·  118 COWLEY ROAD  ·  OXFORD  ·  OX4 1JE',
    'RECORDING  ·  REHEARSAL  ·  PRODUCTION  ·  REPAIRS',
    'ENGINEER-LED  ·  NO CHAOS POLICY  ·  SERIOUS ABOUT SOUND',
    'BOOKINGS OPEN  ·  INFO@CRSOXFORD.COM',
    'STUDIO  ·  CONTROL ROOM  ·  LIVE ROOM  ·  3 ISOLATION BOOTHS',
    'CRICKET ROAD REHEARSAL FACILITY  ·  BOOKABLE NOW',
    'CONTINUING THE SOUNDWORKS OXFORD LEGACY  ·  1999–2024',
  ],
  cafe: [
    'THE WORKSHOP CAFÉ  ·  THE BILLET BUILDING  ·  118 COWLEY ROAD',
    'CAFÉ  ·  VENUE  ·  EVENTS  ·  FLEXIBLE WORKSPACE',
    'COFFEE  ·  REPAIRS  ·  MUSICAL CURIOS  ·  TECH SOLUTIONS',
    'PRIVATE HIRE  ·  WORKSHOPS  ·  COMMUNITY EVENTS  ·  DEEP-WORK SPACE',
    'DEEP-WORK BY DAY  ·  LIVE MUSIC BY NIGHT',
    'OPENING APRIL 2026  ·  ENQUIRE: INFO@CRSOXFORD.COM',
    'THE BILLET BUILDING  ·  EAST OXFORD  ·  OX4',
  ],
};

/* ─── Oxford Dreaming Spires SVG path ────────────────────────── */
const SPIRES_PATH =
  'M0,110 L40,110 L40,90 L55,90 L55,70 L58,65 L61,55 L64,65 L67,70 L67,90 ' +
  'L80,90 L80,100 L110,100 L110,85 L116,80 L122,72 L128,80 L134,85 L134,100 ' +
  'L155,100 L155,88 L160,82 L165,76 L168,68 L171,76 L176,82 L181,88 L181,100 ' +
  'L210,100 L210,94 L218,88 L226,80 L232,73 L238,80 L246,88 L254,94 L254,100 ' +
  'L280,100 L280,92 L286,85 L292,78 L298,85 L304,92 L304,100 ' +
  'L340,100 L340,105 L380,105 L380,92 L386,86 L390,80 L394,86 L398,92 L398,105 ' +
  'L440,105 L440,95 L448,88 L454,80 L458,72 L462,80 L468,88 L476,95 L476,105 ' +
  'L510,105 L510,98 L516,92 L520,86 L524,92 L528,98 L528,105 ' +
  'L560,105 L560,95 L568,88 L574,80 L578,72 L582,80 L588,88 L596,95 L596,105 ' +
  'L630,105 L630,100 L638,94 L644,86 L650,78 L656,86 L662,94 L668,100 L668,105 ' +
  'L700,105 L700,100 L706,94 L710,88 L714,94 L718,100 L718,105 ' +
  'L750,105 L750,95 L756,88 L762,80 L768,88 L774,95 L774,105 ' +
  'L810,105 L810,98 L818,90 L824,82 L828,74 L832,82 L838,90 L844,98 L844,105 ' +
  'L880,105 L880,100 L886,93 L892,86 L898,93 L904,100 L904,105 ' +
  'L940,105 L940,95 L946,88 L950,80 L954,88 L960,95 L960,105 ' +
  'L1000,105 L1000,120 L0,120 Z';

/* ─── Dreaming Spires waveform ────────────────────────────────── */
function DreamingSpires({ pulse, mode }: { pulse: number; mode: 'crs' | 'cafe' }) {
  const isCafe = mode === 'cafe';
  const glow   = isCafe ? `rgba(212,160,23,${0.25 + pulse * 0.35})` : `rgba(194,164,58,${0.18 + pulse * 0.25})`;
  const fill   = isCafe ? `rgba(160,110,5,${0.08 + pulse * 0.10})` : `rgba(40,60,40,${0.55 + pulse * 0.20})`;
  const stroke = isCafe ? `rgba(230,175,30,${0.35 + pulse * 0.35})` : `rgba(194,164,58,${0.28 + pulse * 0.28})`;

  return (
    <div className="sgd-spires-wrap" aria-hidden="true">
      <svg
        className="sgd-spires-svg"
        viewBox="0 0 1000 120"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="spires-glow" x="-5%" y="-60%" width="110%" height="220%">
            <feGaussianBlur stdDeviation={3 + pulse * 5} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={SPIRES_PATH} fill={glow} filter="url(#spires-glow)" />
        <path d={SPIRES_PATH} fill={fill} />
        <path d={SPIRES_PATH} fill="none" stroke={stroke} strokeWidth={1.5 + pulse * 0.8} />
      </svg>
    </div>
  );
}

/* ─── LED Ticker ──────────────────────────────────────────────── */
function LedTicker({
  lines,
  speed = 72,
  onPulse,
}: {
  lines: string[];
  speed?: number;
  onPulse: (v: number) => void;
}) {
  const trackRef     = useRef<HTMLDivElement>(null);
  const posRef       = useRef(0);
  const rafRef       = useRef<number | null>(null);
  const lastPulseRef = useRef(0);
  const fullText     = lines.join('     ✦     ') + '     ✦     ';

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.textContent = fullText + fullText;
    const totalW = track.scrollWidth / 2;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      posRef.current -= (speed * dt) / 1000;
      if (posRef.current <= -totalW) posRef.current += totalW;
      track.style.transform = `translateX(${posRef.current}px)`;

      if (now - lastPulseRef.current > 40) {
        const t = now / 1000;
        const p = (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.55
                + (Math.sin(t * 1.9) * 0.5 + 0.5) * 0.30
                + (Math.sin(t * 0.3) * 0.5 + 0.5) * 0.15;
        onPulse(Math.min(1, Math.max(0, p)));
        lastPulseRef.current = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [fullText, speed, onPulse]);

  return (
    <div className="sgd-ticker-outer" role="marquee" aria-label="Scrolling information display">
      {/* Dot-matrix waveform flanks */}
      <span className="sgd-ticker-waveform" aria-hidden="true">
        {[2,4,7,10,13,10,7,4,6,9,12,9,6,3].map((h, i) => (
          <span key={i} className="sgd-ticker-bar" style={{ height: `${h}px` }} />
        ))}
      </span>
      <div className="sgd-ticker-viewport">
        <div className="sgd-ticker-track" ref={trackRef} />
      </div>
      <span className="sgd-ticker-waveform sgd-ticker-waveform--right" aria-hidden="true">
        {[3,6,9,12,9,6,4,7,10,13,10,7,4,2].map((h, i) => (
          <span key={i} className="sgd-ticker-bar" style={{ height: `${h}px` }} />
        ))}
      </span>
    </div>
  );
}

/* ─── Progress bar for auto-cycle ────────────────────────────── */
function CycleProgress({ duration, running }: { duration: number; running: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (barRef.current) barRef.current.style.width = '0%';
      startRef.current = null;
      return;
    }
    startRef.current = performance.now();

    const tick = (now: number) => {
      if (!startRef.current) return;
      const elapsed = now - startRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, duration]);

  return (
    <div className="sgd-progress-track" aria-hidden="true">
      <div className="sgd-progress-bar" ref={barRef} />
    </div>
  );
}

/* ─── Mode indicator dots ─────────────────────────────────────── */
function ModeDots({ mode }: { mode: 'crs' | 'cafe' }) {
  return (
    <div className="sgd-mode-dots" aria-hidden="true">
      <span className={`sgd-mode-dot ${mode === 'crs' ? 'sgd-mode-dot--active' : ''}`} />
      <span className={`sgd-mode-dot ${mode === 'cafe' ? 'sgd-mode-dot--active' : ''}`} />
    </div>
  );
}

/* ─── Full signage display page ───────────────────────────────── */
export function SignageDisplay() {
  const [mode, setMode]           = useState<'crs' | 'cafe'>('crs');
  const [pulse, setPulse]         = useState(0.5);
  const [transitioning, setTrans] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [manualMode, setManualMode] = useState(false); // user override stops auto-cycle
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const AUTO_CYCLE_MS = 12000;

  /* Pulse RAF — drives Dreaming Spires */
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const tick = (now: number) => {
      const t = now / 1000;
      const p = (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.55
              + (Math.sin(t * 1.9) * 0.5 + 0.5) * 0.30
              + (Math.sin(t * 0.3) * 0.5 + 0.5) * 0.15;
      setPulse(Math.min(1, Math.max(0, p)));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* Ticker pulse callback — no-op here, pulse driven by RAF above */
  const handleTickerPulse = useCallback((v: number) => {}, []);

  /* Auto-cycle logic */
  const triggerTransition = useCallback((toMode: 'crs' | 'cafe') => {
    setTrans(true);
    setTimeout(() => {
      setMode(toMode);
      setTrans(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (manualMode) return;
    timerRef.current = setTimeout(() => {
      triggerTransition(mode === 'crs' ? 'cafe' : 'crs');
    }, AUTO_CYCLE_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [mode, manualMode, triggerTransition]);

  /* Manual mode buttons */
  const handleModeClick = useCallback((m: 'crs' | 'cafe') => {
    setManualMode(true);
    if (m !== mode) triggerTransition(m);
    // Resume auto-cycle after 30s of no interaction
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setManualMode(false), 30000);
  }, [mode, triggerTransition]);

  /* Fullscreen */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const isCafe = mode === 'cafe';

  return (
    <div
      ref={containerRef}
      className={`sgd-kiosk ${isCafe ? 'sgd-kiosk--cafe' : 'sgd-kiosk--crs'} ${transitioning ? 'sgd-kiosk--fade' : ''}`}
      data-mode={mode}
    >

      {/* ── DREAMING SPIRES — full-width behind everything ────── */}
      <DreamingSpires pulse={pulse} mode={mode} />

      {/* ── MAIN SIGN IMAGE — hero ───────────────────────────── */}
      <div className="sgd-sign-hero">
        <img
          key={mode}
          src={isCafe
            ? '/static/signage/workshop-cafe-rack-sign.png'
            : '/static/signage/cowley-road-studios-rack-sign.png'}
          alt={isCafe
            ? 'The Workshop Café — The Billet Building, 118 Cowley Road, Oxford'
            : 'Cowley Road Studios — 118 Cowley Road, Oxford OX4 1JE'}
          className={`sgd-sign-img ${transitioning ? 'sgd-sign-img--hidden' : 'sgd-sign-img--visible'}`}
          draggable={false}
        />
      </div>

      {/* ── LED TICKER ───────────────────────────────────────── */}
      <LedTicker
        key={mode}
        lines={TICKERS[mode]}
        speed={68}
        onPulse={handleTickerPulse}
      />

      {/* ── AUTO-CYCLE PROGRESS BAR ──────────────────────────── */}
      <CycleProgress duration={AUTO_CYCLE_MS} running={!manualMode} />

      {/* ── BOTTOM STATUS BAR ───────────────────────────────── */}
      <div className="sgd-status-bar">
        <div className="sgd-status-left">
          <span className="sgd-status-led sgd-status-led--green" aria-hidden="true" />
          <span className="sgd-status-text">LIVE</span>
          <span className="sgd-status-sep">·</span>
          <span className="sgd-status-text sgd-status-location">118 COWLEY ROAD · OXFORD · OX4 1JE</span>
        </div>

        <ModeDots mode={mode} />

        <div className="sgd-status-right">
          {/* Mode toggle buttons */}
          <button
            className={`sgd-ctrl-btn ${mode === 'crs' ? 'sgd-ctrl-btn--active' : ''}`}
            onClick={() => handleModeClick('crs')}
            aria-label="Switch to Cowley Road Studios display"
            aria-pressed={mode === 'crs'}
          >CRS</button>
          <button
            className={`sgd-ctrl-btn ${mode === 'cafe' ? 'sgd-ctrl-btn--active' : ''}`}
            onClick={() => handleModeClick('cafe')}
            aria-label="Switch to Workshop Café display"
            aria-pressed={mode === 'cafe'}
          >CAFÉ</button>
          <button
            className="sgd-ctrl-btn sgd-ctrl-btn--fs"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen kiosk mode'}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {fullscreen
              ? <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M5.5 0v1.5H1.5v4H0V0h5.5zm5 0H16v5.5h-1.5v-4h-4V0zM0 10.5h1.5v4h4V16H0v-5.5zm14.5 4h-4V16H16v-5.5h-1.5v4z"/></svg>
              : <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M1.5 1.5v4H0V0h5.5v1.5h-4zm9 0H16v5.5h-1.5v-4h-4V0h-0V1.5zM0 10.5h1.5v4h4V16H0v-5.5zm10.5 4v1.5H16V10.5h-1.5v4h-4z"/></svg>
            }
          </button>
        </div>
      </div>

      {/* ── CORNER IDENTS — very subtle, for kiosk context ──── */}
      <div className="sgd-corner-ident sgd-corner-ident--tl" aria-hidden="true">
        CRS SIGNAGE SYSTEM
      </div>
      <div className="sgd-corner-ident sgd-corner-ident--tr" aria-hidden="true">
        COWLEY ROAD STUDIOS · OX4
      </div>

    </div>
  );
}
