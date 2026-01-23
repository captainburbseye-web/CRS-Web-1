import React from 'react';

export const Soundworks = () => {
  return (
    <section className="crs-section section-dark">
      <div className="section-header">
        <h1 className="section-title heading">Soundworks Oxford → Cowley Road Studios</h1>
        <p className="section-intro">1999–2024 · Twenty-five years of service</p>
      </div>

      {/* TRANSITION NOTICE */}
      <div className="content-block">
        <div className="content-text" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(232, 155, 60, 0.1)', border: '1px solid rgba(232, 155, 60, 0.3)' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Soundworks Oxford is now Cowley Road Studios
          </p>
          <p style={{ marginBottom: 0 }}>
            Same commitment. Expanded infrastructure. New name.
          </p>
        </div>
      </div>

      {/* CONTINUITY STATEMENT */}
      <div className="content-block">
        <h3 className="content-heading heading">Operational Continuity</h3>
        <div className="content-text">
          <p>
            Cowley Road Studios continues the Soundworks Oxford legacy, providing professional recording, rehearsal, and AV infrastructure to Oxford's creative community since 1999.
          </p>
          <p style={{ marginTop: '1rem' }}>
            The rebrand reflects our expanded scope: multi-room recording facilities, dedicated rehearsal spaces, live AV services, and Workshop Café — a public-facing venue for community programming.
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="content-block">
        <h3 className="content-heading heading">Timeline</h3>
        <div className="content-text">
          <p><strong>1999</strong><br/>
            Soundworks Oxford founded by David Norland. Single recording room, engineer-led operation.
          </p>
          <p style={{ marginTop: '1rem' }}><strong>1999–2024</strong><br/>
            Two decades serving Oxford's artists, bands, community groups, and professional productions.
          </p>
          <p style={{ marginTop: '1rem' }}><strong>2024</strong><br/>
            Rebrand to Cowley Road Studios. Expansion to multi-location operation (Cowley Road HQ + Cricket Road rehearsal facility).
          </p>
          <p style={{ marginTop: '1rem' }}><strong>2026</strong><br/>
            Major build phase. New recording rooms, Workshop Café launch, expanded AV services.
          </p>
        </div>
      </div>

      {/* WHAT CHANGED */}
      <div className="content-block">
        <h3 className="content-heading heading">What Changed</h3>
        <div className="content-text">
          <p><strong>Name</strong><br/>
            Soundworks Oxford → Cowley Road Studios
          </p>
          <p style={{ marginTop: '1rem' }}><strong>Scope</strong><br/>
            Single recording room → Multi-room facility + rehearsal spaces + venue + café
          </p>
          <p style={{ marginTop: '1rem' }}><strong>Locations</strong><br/>
            One site → Two locations (Cowley Road + Cricket Road)
          </p>
        </div>
      </div>

      {/* DAVID NORLAND MEMORIAL */}
      <div className="content-block">
        <div className="content-text" style={{ padding: '2rem', background: 'rgba(0, 0, 0, 0.4)', borderLeft: '3px solid var(--text-gold)' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            In memory of David Norland (1974–2014)
          </p>
          <p>
            Soundworks Oxford was founded in 1999 by David Norland, a sound engineer, musician, and community advocate who dedicated his life to making professional recording infrastructure accessible to Oxford's grassroots music scene.
          </p>
          <p style={{ marginTop: '1rem' }}>
            David produced Supergrass's first single <em>Caught By The Fuzz</em> under his Backbeat Records label in 1994, helped establish OX4 FM community radio, and worked tirelessly to support local artists and community groups until his death in 2014.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Cowley Road Studios continues his mission: professional-grade creative infrastructure, available to all, operated without chaos.
          </p>
        </div>
      </div>

      {/* WHAT STAYED THE SAME */}
      <div className="content-block">
        <h3 className="content-heading heading">What Stayed the Same</h3>
        <div className="content-text">
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Engineer-led operation</li>
            <li>No-chaos policy</li>
            <li>Equipment maintenance standards</li>
            <li>Community access commitment</li>
            <li>Subsidized rates for grassroots projects</li>
            <li>Oxford-based, locally operated</li>
          </ul>
        </div>
      </div>

      {/* EXPLORE SERVICES */}
      <div className="content-block">
        <h3 className="content-heading heading">Explore Our Services</h3>
        <div className="content-text">
          <p><strong><a href="/studio" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>Recording Studio</a></strong><br/>
            Purpose-built recording and production rooms at Cowley Road HQ (build phase in progress).
          </p>
          <p style={{ marginTop: '1rem' }}><strong><a href="/cricket-road" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>Rehearsal Space — Cricket Road</a></strong><br/>
            Fully operational rehearsal facility. 6m × 4m live room, backline, PA, drum kit. Bookable now.
          </p>
          <p style={{ marginTop: '1rem' }}><strong><a href="/av-services" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>AV Services</a></strong><br/>
            Live sound, installations, technical support for venues and events.
          </p>
          <p style={{ marginTop: '1rem' }}><strong><a href="/workshop-cafe" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>Workshop Café</a></strong><br/>
            Community space, café, and small venue. Available for private hire.
          </p>
        </div>
      </div>

      {/* CONTACT */}
      <div className="content-block">
        <div className="content-text" style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'rgba(232, 155, 60, 0.1)', border: '1px solid rgba(232, 155, 60, 0.3)' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            Questions about the transition?
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Contact us at <a href="mailto:studio@cowleyroadstudios.com" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>studio@cowleyroadstudios.com</a>
          </p>
          <a href="/contact" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--text-gold)', color: '#000', fontWeight: 700, textDecoration: 'none', borderRadius: '4px' }}>
            GET IN TOUCH
          </a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid rgba(232, 155, 60, 0.2)' }}>
        <p className="mono" style={{ color: 'var(--text-gold)', fontWeight: 700 }}>
          SOUNDWORKS OXFORD (1999–2024) · NOW COWLEY ROAD STUDIOS
        </p>
      </div>
    </section>
  );
};
