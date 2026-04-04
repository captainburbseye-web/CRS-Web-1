/**
 * Contact Page - Rack-Based Structure
 * No templates, no headers/footers - pure rack aesthetic
 */

interface ContactPageProps {
  initialService?: string;
  status?: 'sent' | 'error' | null;
}

const SERVICE_OPTIONS = [
  { value: 'recording', label: 'Recording / Studio Session' },
  { value: 'av', label: 'Venue Tech / AV Support' },
  { value: 'repairs', label: 'Repairs / Diagnostics' },
  { value: 'venue', label: 'Venue Hire / Workshop Café' },
  { value: 'general', label: 'General Enquiry' },
] as const;

const getStatusMessage = (status?: 'sent' | 'error' | null) => {
  if (status === 'sent') {
    return {
      title: '[ SIGNAL RECEIVED ]',
      message: 'Inquiry logged to CRS administrative queue. A technical representative will respond within 24 operational hours.',
      border: '1px solid rgba(57, 255, 20, 0.45)',
      background: 'rgba(57, 255, 20, 0.08)',
      color: 'var(--crs-green, #39FF14)'
    };
  }

  if (status === 'error') {
    return {
      title: '[ SIGNAL FAULT ]',
      message: 'The enquiry did not transmit cleanly. Please retry, or contact CRS directly by phone or email.',
      border: '1px solid rgba(255, 111, 97, 0.45)',
      background: 'rgba(255, 111, 97, 0.08)',
      color: '#ff6f61'
    };
  }

  return null;
};

export const ContactPage = ({ initialService = 'general', status = null }: ContactPageProps) => {
  const statusMessage = getStatusMessage(status);
  const selectedService = SERVICE_OPTIONS.some((option) => option.value === initialService)
    ? initialService
    : 'general';

  return (
    <div class="master-rack-chassis">
      {/* Skip to content for accessibility */}
      <a href="#contact-form" class="skip-to-content">Skip to contact form</a>

      {/* BACK TO HOME RACK */}
      <div style="padding: 1rem 0; text-align: center; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(212,160,23,0.2);">
        <a 
          href="/" 
          style="color: var(--mustard, #d4a017); font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;"
        >
          ← BACK TO MAIN RACK
        </a>
      </div>

      {/* CONTACT HEADER RACK */}
      <div 
        class="rack-module-graphic" 
        style="
          background: linear-gradient(180deg, #0A0A0A 0%, #1a1a1a 100%);
          padding: 3rem 2rem;
          text-align: center;
          border-bottom: 2px solid rgba(212,160,23,0.3);
        "
      >
        <h1 
          style="
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            color: var(--mustard, #d4a017);
            text-transform: uppercase;
            margin-bottom: 1rem;
            letter-spacing: 0.05em;
          "
        >
          CONTACT CRS
        </h1>
        <p 
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            color: rgba(245,245,245,0.7);
            max-width: 680px;
            margin: 0 auto;
            line-height: 1.6;
          "
        >
          Use this communications bus for venue hire, repairs, AV support, and custom enquiries. For direct recording and rehearsal allocation, use the booking routes on the main rack.
        </p>
      </div>

      {/* CONTACT DETAILS RACK */}
      <div 
        class="rack-module-graphic" 
        style="
          background: rgba(0,0,0,0.3);
          padding: 2rem;
          margin: 0;
          border-bottom: 1px solid rgba(212,160,23,0.2);
        "
      >
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h2 
            style="
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.75rem;
              letter-spacing: 0.15em;
              color: var(--mustard, #d4a017);
              text-transform: uppercase;
              margin-bottom: 1.5rem;
              font-weight: 700;
            "
          >
            /// CONTACT DETAILS
          </h2>
          <div style="display: grid; gap: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245,245,245,0.85);">
            <div>
              <span style="color: var(--mustard, #d4a017); font-weight: 700;">EMAIL:</span>{' '}
              <a href="mailto:info@crsoxford.com" style="color: rgba(245,245,245,0.9); text-decoration: none;">info@crsoxford.com</a>
            </div>
            <div>
              <span style="color: var(--mustard, #d4a017); font-weight: 700;">PHONE:</span>{' '}
              <a href="tel:+441865722027" style="color: rgba(245,245,245,0.9); text-decoration: none;">+44 (0)1865 722027</a>
            </div>
            <div>
              <span style="color: var(--mustard, #d4a017); font-weight: 700;">ADDRESS:</span>{' '}
              <span>118 Cowley Road, Oxford OX4 1JE, United Kingdom</span>
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.75rem; color: rgba(245,245,245,0.6); font-style: italic;">By appointment only</p>
          </div>
        </div>
      </div>

      {/* STATUS RACK */}
      {statusMessage && (
        <div
          class="rack-module-graphic"
          style={`
            background: ${statusMessage.background};
            border-top: ${statusMessage.border};
            border-bottom: ${statusMessage.border};
            padding: 1.5rem 2rem;
            margin: 0;
          `}
        >
          <div style="max-width: 760px; margin: 0 auto; text-align: center;">
            <div
              style={`
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.75rem;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: ${statusMessage.color};
                margin-bottom: 0.75rem;
              `}
            >
              {statusMessage.title}
            </div>
            <p
              style="
                margin: 0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.875rem;
                color: rgba(245,245,245,0.9);
                line-height: 1.7;
              "
            >
              {statusMessage.message}
            </p>
          </div>
        </div>
      )}

      {/* ENQUIRY FORM RACK */}
      <div 
        id="contact-form"
        class="rack-module-graphic" 
        style="
          background: rgba(0,0,0,0.5);
          padding: 3rem 2rem;
          margin: 0;
        "
      >
        <div style="max-width: 700px; margin: 0 auto;">
          <h2 
            style="
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.75rem;
              letter-spacing: 0.15em;
              color: var(--mustard, #d4a017);
              text-transform: uppercase;
              margin-bottom: 2rem;
              font-weight: 700;
              text-align: center;
            "
          >
            /// ENQUIRY FORM
          </h2>
          
          <form 
            class="enquiry-form" 
            action="/api/contact" 
            method="POST"
            style="display: grid; gap: 1.5rem;"
          >
            {/* Enquiry Type */}
            <div class="form-group">
              <label 
                for="service" 
                style="
                  display: block;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.75rem;
                  color: var(--mustard, #d4a017);
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  margin-bottom: 0.5rem;
                  font-weight: 700;
                "
              >
                Enquiry Type
              </label>
              <select 
                id="service" 
                name="service" 
                required
                style="
                  width: 100%;
                  padding: 0.75rem;
                  background: rgba(0,0,0,0.5);
                  border: 1px solid rgba(212,160,23,0.3);
                  color: rgba(245,245,245,0.9);
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.875rem;
                "
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option value={option.value} selected={option.value === selectedService}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div class="form-group">
              <label 
                for="name"
                style="
                  display: block;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.75rem;
                  color: var(--mustard, #d4a017);
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  margin-bottom: 0.5rem;
                  font-weight: 700;
                "
              >
                Name *
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                style="
                  width: 100%;
                  padding: 0.75rem;
                  background: rgba(0,0,0,0.5);
                  border: 1px solid rgba(212,160,23,0.3);
                  color: rgba(245,245,245,0.9);
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.875rem;
                "
              />
            </div>

            {/* Email */}
            <div class="form-group">
              <label 
                for="email"
                style="
                  display: block;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.75rem;
                  color: var(--mustard, #d4a017);
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  margin-bottom: 0.5rem;
                  font-weight: 700;
                "
              >
                Email *
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                style="
                  width: 100%;
                  padding: 0.75rem;
                  background: rgba(0,0,0,0.5);
                  border: 1px solid rgba(212,160,23,0.3);
                  color: rgba(245,245,245,0.9);
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.875rem;
                "
              />
            </div>

            {/* Phone */}
            <div class="form-group">
              <label 
                for="phone"
                style="
                  display: block;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.75rem;
                  color: var(--mustard, #d4a017);
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  margin-bottom: 0.5rem;
                  font-weight: 700;
                "
              >
                Phone
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                style="
                  width: 100%;
                  padding: 0.75rem;
                  background: rgba(0,0,0,0.5);
                  border: 1px solid rgba(212,160,23,0.3);
                  color: rgba(245,245,245,0.9);
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.875rem;
                "
              />
            </div>

            {/* Message */}
            <div class="form-group">
              <label 
                for="message"
                style="
                  display: block;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.75rem;
                  color: var(--mustard, #d4a017);
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  margin-bottom: 0.5rem;
                  font-weight: 700;
                "
              >
                Message *
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                required
                style="
                  width: 100%;
                  padding: 0.75rem;
                  background: rgba(0,0,0,0.5);
                  border: 1px solid rgba(212,160,23,0.3);
                  color: rgba(245,245,245,0.9);
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.875rem;
                  line-height: 1.6;
                  resize: vertical;
                "
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              style="
                width: 100%;
                padding: 1rem;
                background: var(--mustard, #d4a017);
                border: none;
                color: #000;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.875rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                cursor: pointer;
                transition: all 0.2s ease;
              "
            >
              ENGAGE CIRCUIT
            </button>
          </form>
        </div>
      </div>

      {/* MAP EMBED RACK */}
      <div class="map-embed-container">
        <div class="map-embed-header">
          <h3 class="map-embed-title">FIND US IN OXFORD</h3>
          <p class="map-embed-subtitle">Cowley Road Studios · 118 Cowley Road · OX4 1JE</p>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.123!2d-1.2384!3d51.7466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a42c8c7c3f%3A0x5c5e5e5e5e5e5e5e!2s118%20Cowley%20Road%2C%20Oxford%20OX4%201JE!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk" 
          width="100%" 
          height="400" 
          style="border:0; border-radius: 8px;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Cowley Road Studios Location Map"
        ></iframe>
      </div>

      {/* FOOTER */}
      <footer class="site-footer">
        <div class="terminal-status-footer">
          <div class="terminal-status-section">
            <div class="terminal-status-label">COWLEY ROAD STUDIOS</div>
            <div class="terminal-status-line" style="font-weight: 600; margin-bottom: 0.5rem;">
              Independent Recording Studio & Rehearsal Rooms – Oxford
            </div>
            <div class="terminal-status-line">118 Cowley Road, Oxford OX4 1JE, United Kingdom</div>
            <div class="terminal-status-line" style="margin-top: 0.75rem;">
              <a href="tel:+441865722027">+44 (0)1865 722027</a>
            </div>
            <div class="terminal-status-line">
              <a href="mailto:info@crsoxford.com">info@crsoxford.com</a>
            </div>
          </div>

          <div class="terminal-status-section">
            <div class="terminal-status-label">CONNECT</div>
            <div class="terminal-status-line">
              <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener">Instagram</a>
            </div>
            <div class="terminal-status-line">
              <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener">
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
