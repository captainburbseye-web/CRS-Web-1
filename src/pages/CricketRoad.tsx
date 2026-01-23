import React from 'react';

export const CricketRoad = () => {
  return (
    <section className="crs-section section-dark">
      <div className="section-header">
        <h1 className="section-title heading">Cricket Road Studio</h1>
        <p className="section-intro">Fully operational. Bookable now.</p>
      </div>

      {/* INTRO */}
      <div className="content-block">
        <div className="content-text">
          <p>
            Cricket Road is CRS's fully refurbished, operational rehearsal and live capture facility — the working room while Cowley Road HQ completes commissioning.
          </p>
          <p style={{ marginTop: '1rem' }}>
            This is where bands rehearse, writers develop material, and projects capture live energy without waiting for the main studio build to finish.
          </p>
        </div>
      </div>

      {/* LIVE ROOM SPECS */}
      <div className="content-block">
        <h3 className="content-heading heading">Live Room Specs</h3>
        <div className="content-text">
          <p><strong>Room Size</strong><br/>
            Large live room — 6m × 4m
          </p>
        </div>
      </div>

      {/* BACKLINE & INSTRUMENTS */}
      <div className="content-block">
        <h3 className="content-heading heading">Backline & Instruments</h3>
        <div className="content-text">
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Yamaha CLP electric piano, routed through PA</li>
            <li>2 × Shure SM58 vocal microphones</li>
            <li>2 × Guitar amplifiers (general backline)</li>
            <li>Bass amplifier: Trace Elliot Series 6 combo</li>
          </ul>
        </div>
      </div>

      {/* PA & DESK */}
      <div className="content-block">
        <h3 className="content-heading heading">PA & Desk</h3>
        <div className="content-text">
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Live room desk with reverb and compression available</li>
            <li>Vocal and instrument routing ready for rehearsal or capture</li>
          </ul>
        </div>
      </div>

      {/* DRUM KIT SUPPORT */}
      <div className="content-block">
        <h3 className="content-heading heading">Drum Kit Support</h3>
        <div className="content-text">
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Drum kit available</li>
            <li>Bass drum mic installed (kick mic in place)</li>
          </ul>
        </div>
      </div>

      {/* USE CASES */}
      <div className="content-block">
        <h3 className="content-heading heading">Use Cases</h3>
        <div className="content-text">
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Band rehearsals</li>
            <li>Live run-throughs</li>
            <li>Writing sessions</li>
            <li>Basic live capture / demo recording</li>
          </ul>
        </div>
      </div>

      {/* BOOKING */}
      <div className="content-block">
        <div className="content-text" style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'rgba(232, 155, 60, 0.1)', border: '1px solid rgba(232, 155, 60, 0.3)' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            Cricket Road is operational and taking bookings now.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            This is the working facility while Cowley Road completes its build phase.
          </p>
          <a href="/contact" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--text-gold)', color: '#000', fontWeight: 700, textDecoration: 'none', borderRadius: '4px' }}>
            BOOK CRICKET ROAD
          </a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid rgba(232, 155, 60, 0.2)' }}>
        <p className="mono" style={{ color: 'var(--text-gold)', fontWeight: 700 }}>
          CRICKET ROAD — OPERATIONAL NOW
        </p>
      </div>
    </section>
  );
};
