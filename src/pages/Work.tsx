import React from 'react';

export const Work = () => {
  return (
    <section className="crs-section section-dark">
      <div className="section-header">
        <h1 className="section-title heading">Work</h1>
        <p className="section-intro">Evidence of operation.</p>
      </div>

      <div className="content-block">
        <div className="content-text">
          <p>
            Selected recordings, deployments, and community projects supported by CRS infrastructure.
          </p>
        </div>
      </div>

      {/* STUDIO RECORDINGS */}
      <div className="content-block">
        <h3 className="content-heading heading">Studio Recordings</h3>
        <div className="content-text">
          <p style={{ marginBottom: '1.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
            Multi-room tracking, vocal production, post-production
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--crs-green)', padding: '1rem', marginBottom: '1rem' }}>
            <p className="mono" style={{ color: 'var(--text-gold)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              [Project listings coming soon]
            </p>
            <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              Format: EP / Album / Single / Podcast<br/>
              Year: 2024–2025
            </p>
          </div>
        </div>
      </div>

      {/* AV DEPLOYMENTS */}
      <div className="content-block">
        <h3 className="content-heading heading">AV Deployments</h3>
        <div className="content-text">
          <p style={{ marginBottom: '1.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
            PA systems, monitoring, technical crew, permanent installations
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--crs-green)', padding: '1rem', marginBottom: '1rem' }}>
            <p className="mono" style={{ color: 'var(--text-gold)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              [Project listings coming soon]
            </p>
            <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              Type: Performance / Conference / Festival / Installation<br/>
              Year: 2024–2025
            </p>
          </div>
        </div>
      </div>

      {/* COMMUNITY PROJECTS */}
      <div className="content-block">
        <h3 className="content-heading heading">Community Projects</h3>
        <div className="content-text">
          <p style={{ marginBottom: '1.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
            Subsidised sessions, technical workshops, community support
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--mustard)', padding: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>Subsidised Studio Sessions</strong><br/>
              <span style={{ opacity: 0.7 }}>Supporting grassroots artists with access to professional recording infrastructure</span>
            </p>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--mustard)', padding: '1rem' }}>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>Technical Workshops</strong><br/>
              <span style={{ opacity: 0.7 }}>Signal flow, live sound fundamentals, system operation</span>
            </p>
          </div>
        </div>
      </div>

      {/* PARTNER VENUES */}
      <div className="content-block">
        <h3 className="content-heading heading">Partner Venues</h3>
        <div className="content-text">
          <p style={{ marginBottom: '1rem' }}>
            CRS provides ongoing technical support for community venues across Oxford.
          </p>
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8, fontSize: '0.875rem', opacity: 0.8 }}>
            <li>Event sound & maintenance</li>
            <li>System consultation</li>
            <li>Equipment hire</li>
          </ul>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="content-block">
        <h3 className="content-heading heading">Testimonials</h3>
        <div className="content-text">
          <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--text-gold)', padding: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
              "Professional setup, no delays. We got straight to work."
            </p>
            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>— Recording client</p>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--text-gold)', padding: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
              "Clear communication and reliable delivery."
            </p>
            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>— Event organiser</p>
          </div>
        </div>
      </div>

      {/* WORK WITH US */}
      <div className="content-block">
        <h3 className="content-heading heading">Work With Us</h3>
        <div className="content-text">
          <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', lineHeight: 1.8 }}>
            <li><strong>Recording & rehearsal</strong> — <a href="/book" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>book studio time</a></li>
            <li><strong>AV services</strong> — <a href="/contact?service=av" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>request a quote</a></li>
            <li><strong>Community access</strong> — <a href="/contact" style={{ color: 'var(--text-gold)', textDecoration: 'underline' }}>enquire about supported sessions</a></li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid rgba(232, 155, 60, 0.2)' }}>
        <p className="mono" style={{ color: 'var(--text-gold)', fontWeight: 700 }}>
          CRS — Built to work. Built to last.
        </p>
      </div>
    </section>
  );
};
