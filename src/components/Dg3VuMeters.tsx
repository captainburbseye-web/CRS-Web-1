/** @jsxImportSource react */
/**
 * Dg3VuMeters — stereo segmented LED VU meters
 *
 * Design rules:
 *  - No React state inside the animation loop (all DOM writes via refs)
 *  - requestAnimationFrame drives all updates
 *  - IntersectionObserver pauses animation when off-screen
 *  - prefers-reduced-motion: renders static first-green segment only
 *  - aria-hidden="true" — purely decorative hardware chrome
 *  - No dependency on the main signal engine; generates its own
 *    pseudo-audio levels so it works in any context
 */

import { useEffect, useRef } from 'react';

/* ─── Meter constants ──────────────────────────────────────── */
const SEGMENTS     = 20;
const AMBER_START  = 12;   // segment 12 = 60 %
const RED_START    = 17;   // segment 17 = 85 %
const PEAK_HOLD_MS = 1600;
const PEAK_FALL    = 0.6;
const RISE_RATE    = 9.0;
const FALL_RATE    = 2.5;
const RED_CHANCE   = 0.018; // probability of a red spike per frame

/* Segment colour band for a given index (0 = bottom, SEGMENTS-1 = top) */
function bandFor(i: number): 'green' | 'amber' | 'red' {
  if (i >= RED_START)   return 'red';
  if (i >= AMBER_START) return 'amber';
  return 'green';
}

/* ─── Component ────────────────────────────────────────────── */
export interface Dg3VuMetersProps {
  /** Extra class names on the root element */
  className?: string;
}

export function Dg3VuMeters({ className = '' }: Dg3VuMetersProps) {
  const rootRef  = useRef<HTMLDivElement>(null);
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    /* ── Reduced-motion: bail to static first-green segment ─── */
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const el = rootRef.current;
    const lCols = leftRef.current;
    const rCols = rightRef.current;
    if (!el || !lCols || !rCols) return;

    /* Build segment NodeList references once */
    const lSegs = Array.from(lCols.querySelectorAll<HTMLDivElement>('.dg3-vu-segment'));
    const rSegs = Array.from(rCols.querySelectorAll<HTMLDivElement>('.dg3-vu-segment'));

    if (prefersReduced) {
      /* Light just segment 0 (bottom-most green) on each channel — static */
      [lSegs[0], rSegs[0]].forEach(s => s && s.classList.add('is-active'));
      return;
    }

    /* ── Mutable animation state (NOT React state) ─────────── */
    let lLevel = 0.06, rLevel = 0.05;
    let lPeak  = 0,    rPeak  = 0;
    let lPeakTime = 0, rPeakTime = 0;
    let lastT = performance.now();

    /* ── DOM helper: paint one channel's segments ─────────── */
    function paintChannel(
      segs: HTMLDivElement[],
      level: number,
      peak: number,
    ) {
      const litCount  = Math.round(level * SEGMENTS);
      const peakIdx   = Math.min(SEGMENTS - 1, Math.floor(peak * SEGMENTS));

      for (let i = 0; i < segs.length; i++) {
        // segs[0] = bottom segment (index 0); segs[19] = top
        const s = segs[i];
        const lit  = i < litCount;
        const isPk = i === peakIdx && peak > 0.05;

        if (lit || isPk) {
          s.classList.add('is-active');
        } else {
          s.classList.remove('is-active');
        }
      }
    }

    /* ── RAF tick ───────────────────────────────────────────── */
    function tick(now: number) {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      /* Generate pseudo-audio targets — mild baseline with
         occasional red spikes to simulate real programme material */
      const baseL = 0.42 + Math.sin(now * 0.0011) * 0.22 + (Math.random() - 0.5) * 0.1;
      const baseR = 0.38 + Math.sin(now * 0.0013 + 0.8) * 0.22 + (Math.random() - 0.5) * 0.1;
      const spikeL = Math.random() < RED_CHANCE ? 0.96 : 0;
      const spikeR = Math.random() < RED_CHANCE ? 0.94 : 0;
      const targetL = Math.max(baseL, spikeL);
      const targetR = Math.max(baseR, spikeR);

      /* Asymmetric attack/decay */
      const rateL = targetL > lLevel ? RISE_RATE : FALL_RATE;
      const rateR = targetR > rLevel ? RISE_RATE : FALL_RATE;
      lLevel += (targetL - lLevel) * rateL * dt;
      rLevel += (targetR - rLevel) * rateR * dt;
      lLevel = Math.max(0.04, Math.min(1, lLevel));
      rLevel = Math.max(0.03, Math.min(1, rLevel));

      /* Peak hold */
      if (lLevel > lPeak) { lPeak = lLevel; lPeakTime = now + PEAK_HOLD_MS; }
      else if (now > lPeakTime) { lPeak = Math.max(lLevel, lPeak - PEAK_FALL * dt); }

      if (rLevel > rPeak) { rPeak = rLevel; rPeakTime = now + PEAK_HOLD_MS; }
      else if (now > rPeakTime) { rPeak = Math.max(rLevel, rPeak - PEAK_FALL * dt); }

      /* Write to DOM */
      paintChannel(lSegs, lLevel, lPeak);
      paintChannel(rSegs, rLevel, rPeak);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    /* ── IntersectionObserver — pause when off-screen ───────── */
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => { pausedRef.current = !entry.isIntersecting; },
        { threshold: 0 },
      );
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer?.disconnect();
    };
  }, []); // run once on mount

  /* Build segments array for one channel (bottom → top) */
  const buildSegs = () =>
    Array.from({ length: SEGMENTS }, (_, i) => (
      <div
        key={i}
        className={`dg3-vu-segment dg3-vu-segment--${bandFor(i)}`}
      />
    ));

  return (
    <div
      ref={rootRef}
      className={['dg3-vu-meter', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      role="presentation"
    >
      {/* Left channel */}
      <div className="dg3-vu-channel" ref={leftRef}>
        {buildSegs()}
      </div>
      {/* Right channel */}
      <div className="dg3-vu-channel" ref={rightRef}>
        {buildSegs()}
      </div>
    </div>
  );
}

export default Dg3VuMeters;
