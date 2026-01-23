import React from 'react';

export const Work = () => {
  return (
    <section class="crs-section section-dark">
      <div class="section-header">
        <h1 class="section-title heading">Work</h1>
        <p class="section-intro">Evidence of operation.</p>
      </div>

      <div class="content-block">
        <div class="content-text">
          <p>
            Selected recordings, deployments, and community projects supported by CRS infrastructure.
          </p>
        </div>
      </div>

      {/* STUDIO RECORDINGS */}
      <div class="content-block">
        <h3 class="content-heading heading">Studio Recordings</h3>
        <div class="content-text">
          <p style="margin-bottom: 1.5rem; opacity: 0.7; font-size: 0.9rem;">
            Multi-room tracking, vocal production, post-production
          </p>
          
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 1rem; margin-bottom: 1rem;">
            <p class="mono" style="color: var(--text-gold); font-size: 0.875rem; margin-bottom: 0.5rem;">
              [Project listings coming soon]
            </p>
            <p style="font-size: 0.875rem; opacity: 0.7;">
              Format: EP / Album / Single / Podcast<br/>
              Year: 2024–2025
            </p>
          </div>
        </div>
      </div>

      {/* AV DEPLOYMENTS */}
      <div class="content-block">
        <h3 class="content-heading heading">AV Deployments</h3>
        <div class="content-text">
          <p style="margin-bottom: 1.5rem; opacity: 0.7; font-size: 0.9rem;">
            PA systems, monitoring, technical crew, permanent installations
          </p>
          
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 1rem; margin-bottom: 1rem;">
            <p class="mono" style="color: var(--text-gold); font-size: 0.875rem; margin-bottom: 0.5rem;">
              [Project listings coming soon]
            </p>
            <p style="font-size: 0.875rem; opacity: 0.7;">
              Type: Performance / Conference / Festival / Installation<br/>
              Year: 2024–2025
            </p>
          </div>
        </div>
      </div>

      {/* COMMUNITY PROJECTS */}
      <div class="content-block">
        <h3 class="content-heading heading">Community Projects</h3>
        <div class="content-text">
          <p style="margin-bottom: 1.5rem; opacity: 0.7; font-size: 0.9rem;">
            Subsidised sessions, technical workshops, community support
          </p>
          
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1rem; margin-bottom: 1rem;">
            <p style="font-size: 0.875rem;">
              <strong>Subsidised Studio Sessions</strong><br/>
              <span style="opacity: 0.7;">Supporting grassroots artists with access to professional recording infrastructure</span>
            </p>
          </div>
          
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1rem;">
            <p style="font-size: 0.875rem;">
              <strong>Technical Workshops</strong><br/>
              <span style="opacity: 0.7;">Signal flow, live sound fundamentals, system operation</span>
            </p>
          </div>
        </div>
      </div>

      {/* PARTNER VENUES */}
      <div class="content-block">
        <h3 class="content-heading heading">Partner Venues</h3>
        <div class="content-text">
          <p style="margin-bottom: 1rem;">
            CRS provides ongoing technical support for community venues across Oxford.
          </p>
          <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8; font-size: 0.875rem; opacity: 0.8;">
            <li>Event sound & maintenance</li>
            <li>System consultation</li>
            <li>Equipment hire</li>
          </ul>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div class="content-block">
        <h3 class="content-heading heading">Testimonials</h3>
        <div class="content-text">
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--text-gold); padding: 1rem; margin-bottom: 1rem;">
            <p style="font-size: 0.875rem; font-style: italic;">
              "Professional setup, no delays. We got straight to work."
            </p>
            <p style="font-size: 0.75rem; opacity: 0.6; margin-top: 0.5rem;">— Recording client</p>
          </div>
          
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--text-gold); padding: 1rem;">
            <p style="font-size: 0.875rem; font-style: italic;">
              "Clear communication and reliable delivery."
            </p>
            <p style="font-size: 0.75rem; opacity: 0.6; margin-top: 0.5rem;">— Event organiser</p>
          </div>
        </div>
      </div>

      {/* WORK WITH US */}
      <div class="content-block">
        <h3 class="content-heading heading">Work With Us</h3>
        <div class="content-text">
          <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li><strong>Recording & rehearsal</strong> — <a href="/book" style="color: var(--text-gold); text-decoration: underline;">book studio time</a></li>
            <li><strong>AV services</strong> — <a href="/contact?service=av" style="color: var(--text-gold); text-decoration: underline;">request a quote</a></li>
            <li><strong>Community access</strong> — <a href="/contact" style="color: var(--text-gold); text-decoration: underline;">enquire about supported sessions</a></li>
          </ul>
        </div>
      </div>

      <div style="text-align: center; margin-top: 3rem; padding: 2rem 0; border-top: 1px solid rgba(232, 155, 60, 0.2);">
        <p class="mono" style="color: var(--text-gold); font-weight: 700;">
          CRS — Built to work. Built to last.
        </p>
      </div>
    </section>
  );
};
