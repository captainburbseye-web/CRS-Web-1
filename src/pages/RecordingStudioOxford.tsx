/**
 * RecordingStudioOxford - SEO Landing Page
 * Target keyword: "Recording Studio in Oxford"
 */

export const RecordingStudioOxford = () => {
  return (
    <div class="master-rack-chassis">
      {/* BACK TO RACK */}
      <div class="page-nav">
        <a href="/" class="back-link">← BACK TO RACK</a>
      </div>

      {/* PAGE HEADER */}
      <div class="contact-header">
        <h1>Recording Studio in Oxford | Cowley Road Studios</h1>
        <p class="contact-intro">Professional recording studio infrastructure in Oxford. Engineer-assisted sessions at two locations.</p>
      </div>

      {/* MAIN CONTENT */}
      <div class="contact-section" style="max-width: 800px; margin: 0 auto 3rem auto; padding: 0 1rem;">
        
        {/* Oxford Recording Studio Services */}
        <h2 style="font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.1em; color: #B5A642; margin-bottom: 1.5rem;">Oxford Recording Studio Services</h2>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: #E0E0E0;">
          Cowley Road Studios operates a multi-room recording system across two Oxford locations. Engineer-assisted sessions include signal chain management, monitoring calibration, and session documentation. All rooms run networked audio infrastructure for multi-room tracking capability.
        </p>
        <p style="margin-bottom: 2rem; line-height: 1.7; color: #E0E0E0;">
          Sessions are engineer-led. No dry hire for recording rooms. Minimum 2-hour booking. Equipment specifications available on request.
        </p>

        {/* Studio Locations & Pricing */}
        <h2 style="font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.1em; color: #B5A642; margin-bottom: 1.5rem;">Studio Locations & Pricing</h2>
        
        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #B5A642; padding: 1.5rem; margin-bottom: 1.5rem;">
          <h3 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #B5A642; margin-bottom: 1rem;">COWLEY ROAD FACILITY</h3>
          <p style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.85);"><strong>Rate:</strong> £35 per hour</p>
          <p style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.85);"><strong>Minimum:</strong> 2 hours</p>
          <p style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.85);"><strong>Includes:</strong> In-house engineer, live room, vocal booth, studio management</p>
          <p style="margin-bottom: 1rem; color: rgba(255,255,255,0.85);"><strong>Location:</strong> 118 Cowley Road, Oxford OX4 1JE</p>
          <a href="/contact" class="cta-service">ENQUIRE ABOUT COWLEY ROAD</a>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #404040; padding: 1.5rem; margin-bottom: 2rem;">
          <h3 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #B5A642; margin-bottom: 1rem;">CRICKET ROAD NODE</h3>
          <p style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.85);"><strong>Rate:</strong> £30 per hour</p>
          <p style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.85);"><strong>Minimum:</strong> 2 hours</p>
          <p style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.85);"><strong>Includes:</strong> In-house engineer, treated space, independent operation</p>
          <p style="margin-bottom: 1rem; color: rgba(255,255,255,0.85);"><strong>Location:</strong> Cricket Road, Oxford</p>
          <a href="/contact?ref=cricket-recording" class="cta-service">ENQUIRE ABOUT CRICKET ROAD</a>
        </div>

        {/* Why Record at Cowley Road Studios? */}
        <h2 style="font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.1em; color: #B5A642; margin-bottom: 1.5rem;">Why Record at Cowley Road Studios?</h2>
        <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative; color: #E0E0E0;">
            <span style="position: absolute; left: 0; color: #B5A642;">→</span>
            Engineer-maintained recording infrastructure since 1999 (formerly Soundworks Studio)
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative; color: #E0E0E0;">
            <span style="position: absolute; left: 0; color: #B5A642;">→</span>
            Multi-room system with networked audio for flexible tracking workflows
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative; color: #E0E0E0;">
            <span style="position: absolute; left: 0; color: #B5A642;">→</span>
            Industry-grade monitoring and signal chain (no consumer equipment)
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative; color: #E0E0E0;">
            <span style="position: absolute; left: 0; color: #B5A642;">→</span>
            Location-based pricing – choose studio based on budget and project needs
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative; color: #E0E0E0;">
            <span style="position: absolute; left: 0; color: #B5A642;">→</span>
            No-chaos operational policy: professional mindset expected
          </li>
        </ul>

        {/* CTA Block */}
        <div style="text-align: center; margin-top: 3rem;">
          <a href="/#studio" class="cta-service">VIEW ALL STUDIO SERVICES</a>
        </div>
      </div>
    </div>
  );
};
