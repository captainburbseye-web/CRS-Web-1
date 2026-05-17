/** @jsxImportSource react */
import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Ticker content — editable ──────────────────────────────── */
const TICKERS: Record<string, string[]> = {
  crs: [
    'RECORDING — REHEARSAL — PRODUCTION — REPAIRS',
    'COWLEY ROAD · OXFORD · OX4 1JE',
    'ENGINEER-LED · NO CHAOS POLICY',
    'BOOKING OPEN — INFO@CRSOXFORD.COM',
    'STUDIO · CONTROL ROOM · LIVE ROOM · 3 BOOTHS',
    'CRICKET ROAD REHEARSAL — BOOKABLE NOW',
  ],
  cafe: [
    'CAFÉ — VENUE — EVENTS — FLEXIBLE SPACE',
    'THE BILLET BUILDING · 118 COWLEY ROAD',
    'COFFEE · REPAIRS · MUSICAL CURIOS · TECH SOLUTIONS',
    'PRIVATE HIRE — WORKSHOPS — COMMUNITY EVENTS',
    'DEEP-WORK BY DAY · LIVE MUSIC BY NIGHT',
    'ENQUIRE: INFO@CRSOXFORD.COM',
  ],
};

/* ─── Oxford / Dreaming Spires silhouette path ────────────────── *
 *  Drawn on a 1000×120 viewBox — spires, domes, rooflines        */
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

/* ─── Dreaming Spires waveform component ──────────────────────── */
function DreamingSpires({
  pulse,
  mode,
}: {
  pulse: number;
  mode: 'crs' | 'cafe';
}) {
  const glowColor = mode === 'cafe'
    ? `rgba(195,148,10,${0.18 + pulse * 0.22})`
    : `rgba(194,164,58,${0.14 + pulse * 0.18})`;
  const strokeColor = mode === 'cafe'
    ? `rgba(212,160,23,${0.28 + pulse * 0.28})`
    : `rgba(194,164,58,${0.22 + pulse * 0.24})`;
  const fillColor = mode === 'cafe'
    ? `rgba(180,130,8,${0.06 + pulse * 0.08})`
    : `rgba(58,78,58,${0.5 + pulse * 0.15})`;

  return (
    <div className="sgd-spires-wrap" aria-hidden="true">
      <svg
        className="sgd-spires-svg"
        viewBox="0 0 1000 120"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="spires-glow" x="-5%" y="-50%" width="110%" height="200%">
            <feGaussianBlur stdDeviation={2 + pulse * 3} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Glow layer */}
        <path d={SPIRES_PATH} fill={glowColor} filter="url(#spires-glow)" />
        {/* Fill */}
        <path d={SPIRES_PATH} fill={fillColor} />
        {/* Stroke */}
        <path
          d={SPIRES_PATH}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.2 + pulse * 0.6}
        />
      </svg>
    </div>
  );
}

/* ─── LED Ticker component ────────────────────────────────────── */
function LedTicker({
  lines,
  speed = 60,
  onPulse,
}: {
  lines: string[];
  speed?: number;
  onPulse: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastPulseRef = useRef(0);

  // Build a long string with separators
  const fullText = lines.join('   ·   ') + '   ·   ';

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate so it loops seamlessly
    track.textContent = fullText + fullText;
    const totalW = track.scrollWidth / 2;

    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      posRef.current -= (speed * dt) / 1000;
      if (posRef.current <= -totalW) posRef.current += totalW;
      track.style.transform = `translateX(${posRef.current}px)`;

      // Pulse: emit a sine value for the spires (0–1)
      const t = now / 1000;
      const pulse = (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.6 +
        (Math.sin(t * 1.3) * 0.5 + 0.5) * 0.4;
      if (now - lastPulseRef.current > 40) {
        onPulse(pulse);
        lastPulseRef.current = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [fullText, speed, onPulse]);

  return (
    <div className="sgd-ticker-outer" aria-label="Scrolling information ticker" role="marquee">
      <span className="sgd-ticker-waveform" aria-hidden="true">
        {/* Waveform glyph — bars */}
        {[3,6,9,12,9,6,3,5,8,11,8,5,3].map((h, i) => (
          <span key={i} className="sgd-ticker-bar" style={{ height: `${h}px` }} />
        ))}
      </span>
      <div className="sgd-ticker-viewport">
        <div className="sgd-ticker-track" ref={trackRef} />
      </div>
      <span className="sgd-ticker-waveform sgd-ticker-waveform--right" aria-hidden="true">
        {[3,5,8,11,8,5,3,6,9,12,9,6,3].map((h, i) => (
          <span key={i} className="sgd-ticker-bar" style={{ height: `${h}px` }} />
        ))}
      </span>
    </div>
  );
}

/* ─── Rack Panel — top nameplate ──────────────────────────────── */
function RackPanel({
  mode,
  pulse,
}: {
  mode: 'crs' | 'cafe';
  pulse: number;
}) {
  if (mode === 'cafe') {
    return (
      <div className="sgd-panel sgd-panel--cafe">
        <div className="sgd-panel-logo-block">
          <div className="sgd-cafe-badge">
            <div className="sgd-cafe-badge-gear" aria-hidden="true">⚙</div>
            <div className="sgd-cafe-badge-label">WORKSHOP<br/>CAFÉ</div>
          </div>
        </div>
        <div className="sgd-panel-title-block">
          <p className="sgd-panel-supertitle">THE BILLET BUILDING</p>
          <h2 className="sgd-panel-name">THE WORKSHOP CAFÉ</h2>
          <p className="sgd-panel-services">
            COFFEE&nbsp;♦&nbsp;REPAIRS&nbsp;♦&nbsp;MUSICAL CURIOS&nbsp;♦&nbsp;TECH SOLUTIONS
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sgd-panel sgd-panel--crs">
      <div className="sgd-panel-logo-block sgd-panel-logo-block--crs">
        <div className="sgd-monogram">
          <span className="sgd-monogram-cr">CR</span>
          <span className="sgd-monogram-s">S</span>
        </div>
      </div>
      <div className="sgd-panel-title-block">
        <h2 className="sgd-panel-name sgd-panel-name--crs">COWLEY ROAD STUDIOS</h2>
        <div
          className="sgd-panel-stripe"
          style={{ opacity: 0.6 + pulse * 0.4 }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ─── Main rack signage unit ──────────────────────────────────── */
function RackSignage({ mode, pulse }: { mode: 'crs' | 'cafe'; pulse: number }) {
  const onPulseRef = useCallback((v: number) => {}, []);

  return (
    <div
      className={`sgd-rack ${mode === 'cafe' ? 'sgd-rack--cafe' : 'sgd-rack--crs'}`}
      style={{ '--sgd-pulse': pulse } as React.CSSProperties}
      role="img"
      aria-label={
        mode === 'cafe'
          ? 'The Workshop Café — Billet Building signage'
          : 'Cowley Road Studios rack signage'
      }
    >
      {/* Screw rail top */}
      <div className="sgd-screw-rail" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="sgd-screw" />
        ))}
      </div>

      {/* Main nameplate */}
      <RackPanel mode={mode} pulse={pulse} />

      {/* LED ticker */}
      <LedTicker lines={TICKERS[mode]} onPulse={onPulseRef} />

      {/* Screw rail bottom */}
      <div className="sgd-screw-rail" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="sgd-screw" />
        ))}
      </div>
    </div>
  );
}

/* ─── Full page ───────────────────────────────────────────────── */
export function SignageDisplay() {
  const [mode, setMode] = useState<'crs' | 'cafe'>('crs');
  const [pulse, setPulse] = useState(0.5);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shared pulse driven by the ticker RAF — lifted up here
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    let t = 0;
    const tick = (now: number) => {
      t = now / 1000;
      const p =
        (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.55 +
        (Math.sin(t * 1.9) * 0.5 + 0.5) * 0.3 +
        (Math.sin(t * 0.3) * 0.5 + 0.5) * 0.15;
      setPulse(Math.min(1, Math.max(0, p)));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!fullscreen) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
    setFullscreen(f => !f);
  }, [fullscreen]);

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className="sgd-page">

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="sgd-page-header">
        <div className="sgd-page-header-left">
          <p className="sgd-page-eyebrow">Cowley Road Studios · Signage System</p>
          <h1 className="sgd-page-title">Live Analogue Display</h1>
        </div>
        <div className="sgd-page-header-controls">
          <button
            className={`sgd-mode-btn ${mode === 'crs' ? 'sgd-mode-btn--active' : ''}`}
            onClick={() => setMode('crs')}
            aria-pressed={mode === 'crs'}
          >
            CRS
          </button>
          <button
            className={`sgd-mode-btn ${mode === 'cafe' ? 'sgd-mode-btn--active' : ''}`}
            onClick={() => setMode('cafe')}
            aria-pressed={mode === 'cafe'}
          >
            CAFÉ
          </button>
          <button
            className="sgd-fullscreen-btn"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen signage mode'}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen signage mode'}
          >
            {fullscreen ? '⊠' : '⊡'}
          </button>
        </div>
      </div>

      {/* ── SIGNAGE UNIT ────────────────────────────────────────── */}
      <div className="sgd-hero" ref={containerRef}>
        {/* Dreaming Spires — sits behind the rack */}
        <DreamingSpires pulse={pulse} mode={mode} />

        {/* The rack itself */}
        <RackSignage mode={mode} pulse={pulse} />
      </div>

      {/* ── INFO PANELS ─────────────────────────────────────────── */}
      <div className="sgd-info-grid">
        <div className="sgd-info-panel">
          <p className="sgd-info-label">Location</p>
          <p className="sgd-info-value">118 Cowley Road, Oxford OX4 1JE</p>
        </div>
        <div className="sgd-info-panel">
          <p className="sgd-info-label">Status</p>
          <p className="sgd-info-value">
            <span className="sgd-led sgd-led--green" aria-hidden="true" />
            Operational
          </p>
        </div>
        <div className="sgd-info-panel">
          <p className="sgd-info-label">Contact</p>
          <p className="sgd-info-value">
            <a href="mailto:info@crsoxford.com" className="sgd-link">info@crsoxford.com</a>
          </p>
        </div>
        <div className="sgd-info-panel">
          <p className="sgd-info-label">Book</p>
          <p className="sgd-info-value">
            <a href="/" className="sgd-link">cowleyroadstudios.com →</a>
          </p>
        </div>
      </div>

      {/* ── SPEC TABLE ──────────────────────────────────────────── */}
      <div className="sgd-spec-section">
        <p className="sgd-spec-label">Display specification</p>
        <table className="loc-specs sgd-specs">
          <tbody>
            <tr><td>Format</td><td>16:9 rack signage · dual panel</td></tr>
            <tr><td>Ticker</td><td>Amber LED dot-matrix · scrolling loop</td></tr>
            <tr><td>Variants</td><td>CRS · Workshop Café</td></tr>
            <tr><td>Animation</td><td>RAF loop · no React state in render cycle</td></tr>
            <tr><td>Waveform</td><td>Dreaming Spires Oxford skyline · pulse-synced</td></tr>
            <tr><td>Fullscreen</td><td>Fullscreen API · signage display mode</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── BACK NAV ────────────────────────────────────────────── */}
      <div className="sgd-back">
        <a href="/" className="sgd-back-link">← Back to Cowley Road Studios</a>
      </div>

    </div>
  );
}
