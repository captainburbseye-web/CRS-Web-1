import React from 'react';

export const CricketRoad = () => {
  return (
    <div className="loc-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="loc-hero">
        <div className="loc-hero-left">
          <p className="loc-hero-eyebrow">Cowley Road Studios · Cricket Road facility</p>
          <h1 className="loc-hero-name">Cricket Road</h1>
          <p className="loc-hero-address">Oxford · OX4 3DJ · United Kingdom</p>
          <div className="loc-status loc-status--operational" style={{ marginTop: '0.75rem' }}>
            <span className="loc-status--led"></span>
            Operational — bookable now
          </div>
        </div>
        <img
          src="/static/cricket-logo.png"
          alt="Cricket Road — CRS"
          className="loc-hero-logo"
          width={80}
          height={80}
        />
      </div>

      {/* ── INTRO + BOOKING ───────────────────────────────────── */}
      <div className="loc-cols">

        <div className="loc-panel loc-panel--accent">
          <p className="loc-panel-label">About this space</p>
          <p style={{ fontSize: '0.875rem', color: '#d4cbb8', lineHeight: 1.6, margin: '0 0 1rem' }}>
            Cricket Road is CRS's dedicated rehearsal and live capture facility —
            a large, fully equipped live room with backline, PA, and drum kit.
          </p>
          <ul className="loc-services">
            <li>Rehearsal rooms — up to 8 people</li>
            <li>Large live room — 6 m × 4 m</li>
            <li>Live capture &amp; demo recording</li>
            <li>Writing sessions &amp; run-throughs</li>
          </ul>
        </div>

        <div className="loc-panel">
          <p className="loc-panel-label">Book direct</p>
          <div className="loc-cta-bar" style={{ flexDirection: 'column', marginTop: 0 }}>
            <a
              href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX"
              target="_blank"
              rel="noopener noreferrer"
              className="loc-cta loc-cta--primary"
            >
              Book rehearsal
            </a>
            <a
              href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX"
              target="_blank"
              rel="noopener noreferrer"
              className="loc-cta loc-cta--primary"
            >
              Book recording / capture
            </a>
            <a href="/contact" className="loc-cta loc-cta--secondary">
              Enquire
            </a>
          </div>
        </div>

      </div>

      {/* ── ROOM SPECS ────────────────────────────────────────── */}
      <div className="loc-cols">

        <div className="loc-panel">
          <p className="loc-panel-label">Live room specs</p>
          <table className="loc-specs">
            <tbody>
              <tr><td>Room size</td><td>6 m × 4 m live room</td></tr>
              <tr><td>Capacity</td><td>Up to 8 people</td></tr>
              <tr><td>Drum kit</td><td>Full drum kit · kick mic installed</td></tr>
              <tr><td>Piano</td><td>Yamaha CLP electric grand, routed through PA</td></tr>
              <tr><td>Guitar amps</td><td>2 × guitar amplifiers (general backline)</td></tr>
              <tr><td>Bass amp</td><td>Trace Elliot Series 6 combo</td></tr>
              <tr><td>Vocals</td><td>2 × Shure SM58</td></tr>
            </tbody>
          </table>
        </div>

        <div className="loc-panel">
          <p className="loc-panel-label">PA &amp; desk</p>
          <table className="loc-specs">
            <tbody>
              <tr><td>PA</td><td>Full PA system — vocal &amp; instrument routing</td></tr>
              <tr><td>Desk</td><td>Reverb and compression available</td></tr>
              <tr><td>Monitoring</td><td>Foldback monitors</td></tr>
              <tr><td>Capture</td><td>Basic live capture / demo — enquire</td></tr>
            </tbody>
          </table>
          <div className="loc-divider" style={{ margin: '1rem 0' }}></div>
          <p className="loc-panel-label">Use cases</p>
          <ul className="loc-services" style={{ marginTop: 0 }}>
            <li>Band rehearsals</li>
            <li>Live run-throughs before gigs</li>
            <li>Writing and development sessions</li>
            <li>Basic live capture and demo recording</li>
          </ul>
        </div>

      </div>

      {/* ── PHOTOS ───────────────────────────────────────────── */}
      <div className="loc-panel" style={{ marginBottom: '1.5rem' }}>
        <p className="loc-panel-label">Location photos</p>
        <div className="loc-photo-strip">
          <img
            src="/static/machined-assets/cricket-rehearsal-optimized.webp"
            alt="Cricket Road rehearsal room"
            loading="lazy"
          />
          <img
            src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
            alt="Cricket Road live room"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── ACCESS + TRANSPORT ────────────────────────────────── */}
      <div className="loc-cols">

        <div className="loc-panel">
          <p className="loc-panel-label">Getting here</p>
          <div className="loc-transport">
            <div className="loc-transport-item">
              <span className="loc-transport-icon">🚌</span>
              <span className="loc-transport-label">Bus</span>
              <p className="loc-transport-detail">Routes serving Cowley / Iffley Road corridors. Short walk from Rose Hill stops.</p>
            </div>
            <div className="loc-transport-item">
              <span className="loc-transport-icon">🚲</span>
              <span className="loc-transport-label">Cycle</span>
              <p className="loc-transport-detail">Quiet residential roads, easy cycling from East Oxford.</p>
            </div>
            <div className="loc-transport-item">
              <span className="loc-transport-icon">🚗</span>
              <span className="loc-transport-label">Car</span>
              <p className="loc-transport-detail">Residential street parking on Cricket Road and nearby streets.</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/Cricket+Road+Oxford+OX4+3DJ"
            target="_blank"
            rel="noopener noreferrer"
            className="loc-map-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            Open in Google Maps — Cricket Road, Oxford OX4 3DJ
          </a>
        </div>

        <div className="loc-panel">
          <p className="loc-panel-label">Access &amp; contact</p>
          <table className="loc-specs">
            <tbody>
              <tr><td>Access</td><td>By booking only. Details sent on confirmation.</td></tr>
              <tr><td>Hours</td><td>Bookable slots — see calendar when booking</td></tr>
              <tr><td>Email</td><td><a href="mailto:info@crsoxford.com" style={{ color: 'var(--mustard, #C2A43A)' }}>info@crsoxford.com</a></td></tr>
              <tr><td>Enquiries</td><td><a href="/contact" style={{ color: 'var(--mustard, #C2A43A)' }}>Contact form →</a></td></tr>
            </tbody>
          </table>
          <div className="loc-divider" style={{ margin: '1rem 0' }}></div>
          <p className="loc-panel-label">Parking note</p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(212,204,184,0.65)', lineHeight: 1.5, margin: 0 }}>
            Residential parking available. No permit required in most areas — check signs on arrival.
          </p>
        </div>

      </div>

      {/* ── COWLEY ROAD LINK ──────────────────────────────────── */}
      <div className="loc-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <p className="loc-panel-label" style={{ marginBottom: '0.25rem' }}>Full studio services</p>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f4f1e8', margin: '0 0 0.25rem' }}>CRS — Cowley Road HQ</p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(212,204,184,0.65)', margin: 0 }}>
            Recording studio · SSL BiG SiX · Workshop Café · ODRO Engineering
          </p>
        </div>
        <a href="/crs-cowley-road" className="loc-cta loc-cta--secondary">
          View Cowley Road →
        </a>
      </div>

    </div>
  );
};
