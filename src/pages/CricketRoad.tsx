import React from 'react';

export const CricketRoad = () => {
  return (
    <section class="crs-section section-dark">
      <div class="section-header">
        <h1 class="section-title heading">Cricket Road Studio</h1>
        <p class="section-intro">Fully operational. Bookable now.</p>
      </div>

      {/* INTRO */}
      <div class="content-block">
        <div class="content-text">
          <p>
            Cricket Road is CRS's fully refurbished, operational rehearsal and live capture facility — the working room while Cowley Road HQ completes commissioning.
          </p>
          <p style="margin-top: 1rem;">
            This is where bands rehearse, writers develop material, and projects capture live energy without waiting for the main studio build to finish.
          </p>
        </div>
      </div>

      {/* LIVE ROOM SPECS */}
      <div class="content-block">
        <h3 class="content-heading heading">Live Room Specs</h3>
        <div class="content-text">
          <p><strong>Room Size</strong><br/>
            Large live room — 6m × 4m
          </p>
        </div>
      </div>

      {/* BACKLINE & INSTRUMENTS */}
      <div class="content-block">
        <h3 class="content-heading heading">Backline & Instruments</h3>
        <div class="content-text">
          <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Yamaha CLP electric piano, routed through PA</li>
            <li>2 × Shure SM58 vocal microphones</li>
            <li>2 × Guitar amplifiers (general backline)</li>
            <li>Bass amplifier: Trace Elliot Series 6 combo</li>
          </ul>
        </div>
      </div>

      {/* PA & DESK */}
      <div class="content-block">
        <h3 class="content-heading heading">PA & Desk</h3>
        <div class="content-text">
          <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Live room desk with reverb and compression available</li>
            <li>Vocal and instrument routing ready for rehearsal or capture</li>
          </ul>
        </div>
      </div>

      {/* DRUM KIT SUPPORT */}
      <div class="content-block">
        <h3 class="content-heading heading">Drum Kit Support</h3>
        <div class="content-text">
          <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Drum kit available</li>
            <li>Bass drum mic installed (kick mic in place)</li>
          </ul>
        </div>
      </div>

      {/* USE CASES */}
      <div class="content-block">
        <h3 class="content-heading heading">Use Cases</h3>
        <div class="content-text">
          <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Band rehearsals</li>
            <li>Live run-throughs</li>
            <li>Writing sessions</li>
            <li>Basic live capture / demo recording</li>
          </ul>
        </div>
      </div>

      {/* BOOKING */}
      <div class="content-block">
        <div class="content-text" style="text-align: center; margin-top: 2rem; padding: 2rem; background: rgba(232, 155, 60, 0.1); border: 1px solid rgba(232, 155, 60, 0.3);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">
            Cricket Road is operational and taking bookings now.
          </p>
          <p style="margin-bottom: 1.5rem;">
            This is the working facility while Cowley Road completes its build phase.
          </p>
          <a href="/contact" style="display: inline-block; padding: 0.75rem 2rem; background: var(--text-gold); color: #000; font-weight: 700; text-decoration: none; border-radius: 4px;">
            BOOK CRICKET ROAD
          </a>
        </div>
      </div>

      <div style="text-align: center; margin-top: 3rem; padding: 2rem 0; border-top: 1px solid rgba(232, 155, 60, 0.2);">
        <p class="mono" style="color: var(--text-gold); font-weight: 700;">
          CRICKET ROAD — OPERATIONAL NOW
        </p>
      </div>
    </section>
  );
};
