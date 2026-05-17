import React from 'react';

export const Soundworks = () => {
  return (
    <div className="loc-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="loc-hero">
        <div className="loc-hero-left">
          <p className="loc-hero-eyebrow">Cowley Road Studios · History</p>
          <h1 className="loc-hero-name">Soundworks Oxford</h1>
          <p className="loc-hero-address">1999 – 2024 · Twenty-five years</p>
          <div className="loc-status loc-status--operational" style={{ marginTop: '0.75rem' }}>
            <span className="loc-status--led"></span>
            Now trading as Cowley Road Studios
          </div>
        </div>
        <img
          src="/static/crs-logo.png"
          alt="Cowley Road Studios"
          className="loc-hero-logo"
          width={80}
          height={80}
        />
      </div>

      {/* ── TRANSITION NOTICE ─────────────────────────────────── */}
      <div className="loc-cols">
        <div className="loc-panel loc-panel--accent loc-panel--full">
          <p className="loc-panel-label">Operational continuity</p>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#f4f1e8', margin: '0 0 0.5rem' }}>
            Soundworks Oxford is now Cowley Road Studios
          </p>
          <p style={{ fontSize: '0.875rem', color: '#d4cbb8', lineHeight: 1.6, margin: 0 }}>
            Same commitment. Expanded infrastructure. New name. Cowley Road Studios continues the
            Soundworks Oxford legacy — professional recording, rehearsal, and AV infrastructure
            for Oxford's creative community, operating since 1999.
          </p>
        </div>
      </div>

      <div className="loc-divider" />

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <div className="loc-cols">
        <div className="loc-panel loc-panel--full">
          <p className="loc-panel-label">Timeline</p>
          <table className="loc-specs" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>1999</td>
                <td>Soundworks Oxford founded by David Norland. Single recording room, engineer-led operation.</td>
              </tr>
              <tr>
                <td>1999 – 2024</td>
                <td>Twenty-five years serving Oxford's artists, bands, community groups, and professional productions.</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>Rebrand to Cowley Road Studios. Expansion to multi-location operation — Cowley Road HQ + Cricket Road rehearsal facility.</td>
              </tr>
              <tr>
                <td>2026</td>
                <td>Major build phase. New recording rooms, Workshop Café launch, expanded AV services.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="loc-divider" />

      {/* ── DAVID NORLAND ─────────────────────────────────────── */}
      <div className="loc-cols">
        <div className="loc-panel loc-panel--full" style={{ borderLeft: '2px solid rgba(212,160,23,0.6)' }}>
          <p className="loc-panel-label loc-panel-label--mustard">In memory — David Norland (1974 – 2014)</p>
          <p style={{ fontSize: '0.875rem', color: '#d4cbb8', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
            Soundworks Oxford was founded in 1999 by David Norland — a sound engineer, musician, and
            community advocate who dedicated his life to making professional recording infrastructure
            accessible to Oxford's grassroots music scene.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#d4cbb8', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
            David produced Supergrass's first single <em>Caught By The Fuzz</em> under his Backbeat
            Records label in 1994, helped establish OX4 FM community radio, and worked tirelessly
            to support local artists and community groups until his death in 2014.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#d4cbb8', lineHeight: 1.7, margin: 0 }}>
            Cowley Road Studios continues his mission: professional-grade creative infrastructure,
            available to all, operated without chaos.
          </p>
        </div>
      </div>

      <div className="loc-divider" />

      {/* ── WHAT CHANGED / WHAT STAYED ────────────────────────── */}
      <div className="loc-cols">
        <div className="loc-panel">
          <p className="loc-panel-label">What changed</p>
          <table className="loc-specs" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Soundworks Oxford → Cowley Road Studios</td>
              </tr>
              <tr>
                <td>Scope</td>
                <td>Single recording room → multi-room facility, rehearsal spaces, venue, café</td>
              </tr>
              <tr>
                <td>Locations</td>
                <td>One site → two locations (Cowley Road + Cricket Road)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="loc-panel">
          <p className="loc-panel-label">What stayed the same</p>
          <ul className="loc-services">
            <li>Engineer-led operation</li>
            <li>No-chaos policy</li>
            <li>Equipment maintenance standards</li>
            <li>Community access commitment</li>
            <li>Subsidised rates for grassroots projects</li>
            <li>Oxford-based, locally operated</li>
          </ul>
        </div>
      </div>

      <div className="loc-divider" />

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <div className="loc-cols">
        <div className="loc-panel loc-panel--full">
          <p className="loc-panel-label">Services available now</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '0.25rem' }}>
            <a href="/" style={{ textDecoration: 'none' }} className="loc-cta loc-cta--secondary">
              Recording Studio →
            </a>
            <a href="/crs-cricket-road" style={{ textDecoration: 'none' }} className="loc-cta loc-cta--secondary">
              Rehearsal — Cricket Road →
            </a>
            <a href="/" style={{ textDecoration: 'none' }} className="loc-cta loc-cta--secondary">
              Workshop Café & Venue →
            </a>
            <a href="/contact" style={{ textDecoration: 'none' }} className="loc-cta loc-cta--secondary">
              AV &amp; Repairs →
            </a>
          </div>
        </div>
      </div>

      <div className="loc-divider" />

      {/* ── FOOTER STRIP ──────────────────────────────────────── */}
      <div className="loc-cols">
        <div className="loc-panel loc-panel--full" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(212,160,23,0.7)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
            Soundworks Oxford (1999 – 2024) · Now Cowley Road Studios
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(212,200,160,0.5)', margin: 0 }}>
            <a href="mailto:info@crsoxford.com" style={{ color: 'rgba(212,160,23,0.6)', textDecoration: 'none' }}>info@crsoxford.com</a>
            {' · '}
            <a href="/contact" style={{ color: 'rgba(212,160,23,0.6)', textDecoration: 'none' }}>Contact</a>
          </p>
        </div>
      </div>

    </div>
  );
};
