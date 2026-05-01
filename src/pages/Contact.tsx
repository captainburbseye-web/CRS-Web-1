/**
 * Contact Page — COMMS BAY MODULE v8.0
 * Expansion module of the CRS Stronghold chassis.
 * Uses subpage-chassis wrapper: rails + SSL backdrop + recessed panels.
 */

interface ContactPageProps {
  initialService?: string;
  status?: 'sent' | 'error' | null;
}

const SERVICE_OPTIONS = [
  { value: 'recording', label: 'Recording / Studio Session' },
  { value: 'av',        label: 'Venue Tech / AV Support' },
  { value: 'repairs',   label: 'Repairs / Diagnostics' },
  { value: 'venue',     label: 'Venue Hire / Workshop Café' },
  { value: 'general',   label: 'General Enquiry' },
] as const;

/* Bolt SVG — machined hex bolt for rails */
const Bolt = () => (
  <svg viewBox="0 0 100 100" class="subpage-bolt" aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#444" stroke="#111" stroke-width="4" />
    <circle cx="50" cy="50" r="25" fill="#222" />
    <circle cx="50" cy="50" r="15" fill="#111" />
  </svg>
);

const BOLTS = Array(14).fill(null);

export const ContactPage = ({ initialService = 'general', status = null }: ContactPageProps) => {
  const selectedService = SERVICE_OPTIONS.some(o => o.value === initialService)
    ? initialService : 'general';

  const sent  = status === 'sent';
  const error = status === 'error';

  return (
    <div class="subpage-chassis">

      {/* LEFT RAIL */}
      <div class="subpage-rail" aria-hidden="true">
        {BOLTS.map((_, i) => <Bolt key={i} />)}
      </div>

      {/* CENTRE COLUMN */}
      <div class="subpage-column">

        {/* ── HEADER ANCHOR — CRS logo + back link ── */}
        <div class="subpage-header-anchor">
          <a href="/" aria-label="Cowley Road Studios — home">
            <img
              src="/static/crs-logo.png"
              alt="Cowley Road Studios"
              class="subpage-header-logo"
              width="180" height="67"
            />
          </a>
          <a href="/" class="subpage-header-back" aria-label="Return to main terminal">
            ← MAIN TERMINAL
          </a>
        </div>

        {/* ── LCD STATUS TICKER ── */}
        <div class="subpage-lcd" aria-label="System status">
          CHANNEL: OPEN &nbsp;·&nbsp; ENQUIRY MODE: ACTIVE &nbsp;·&nbsp; OXFORD HQ: OPERATIONAL &nbsp;·&nbsp; RESPONSE TIME: &lt;24H
        </div>

        {/* ── MODULE: COMMS BAY HEADER ── */}
        <div class="subpage-module">
          <div class="subpage-module-label">COMMS BAY — CONTACT MODULE</div>
          <div class="subpage-recessed">
            <h1 style="
              font-family: var(--font-mono);
              font-size: clamp(1.1rem, 3vw, 1.6rem);
              font-weight: 700;
              color: var(--mustard);
              text-transform: uppercase;
              letter-spacing: 0.08em;
              margin: 0 0 0.75rem;
            ">CONTACT US</h1>
            <p style="
              font-family: var(--font-mono);
              font-size: 0.9375rem;
              color: var(--offwhite-dim);
              line-height: 1.6;
              margin: 0;
              max-width: 600px;
            ">
              Use this channel for venue hire, repairs, AV support, and general enquiries.
              To book a rehearsal or recording session directly, use the booking links on our home page.
            </p>
          </div>
        </div>

        {/* ── MODULE: DIRECT LINES ── */}
        <div class="subpage-module">
          <div class="subpage-module-label">DIRECT LINES</div>
          <div class="subpage-recessed">
            <div style="display:grid; gap:1rem; font-family:var(--font-mono); font-size:0.9375rem;">
              <div>
                <span style="color:var(--mustard); font-weight:700; font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.2rem;">EMAIL</span>
                <a href="mailto:info@crsoxford.com" style="color:var(--offwhite); text-decoration:none;">info@crsoxford.com</a>
              </div>
              <div>
                <span style="color:var(--mustard); font-weight:700; font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.2rem;">PHONE</span>
                <a href="tel:+441865722027" style="color:var(--offwhite); text-decoration:none;">+44 (0)1865 722027</a>
              </div>
              <div>
                <span style="color:var(--mustard); font-weight:700; font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.2rem;">ADDRESS</span>
                <span style="color:var(--offwhite-dim);">118 Cowley Road, Oxford OX4 1JE</span>
              </div>
              <p style="font-size:0.75rem; color:var(--offwhite-mute); margin:0;">By appointment only</p>
            </div>
          </div>
        </div>

        {/* ── MODULE: ENQUIRY FORM ── */}
        <div id="contact-form" class="subpage-module">
          <div class="subpage-module-label">ENQUIRY FORM</div>

          {/* Status: sent */}
          {sent && (
            <div class="subpage-recessed" style="border-color:rgba(57,255,20,0.2); margin-bottom:1.5rem;">
              <p style="font-family:var(--font-mono); font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase; color:#39FF14; margin:0 0 0.5rem; font-weight:700;">✓ MESSAGE RECEIVED</p>
              <p style="font-family:var(--font-mono); font-size:0.9rem; color:var(--offwhite-dim); margin:0; line-height:1.6;">Your enquiry has been sent. We will respond within 24 hours.</p>
            </div>
          )}

          {/* Status: error */}
          {error && (
            <div class="subpage-recessed" style="border-color:rgba(255,111,97,0.2); margin-bottom:1.5rem;">
              <p style="font-family:var(--font-mono); font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase; color:#ff6f61; margin:0 0 0.5rem; font-weight:700;">✕ TRANSMISSION FAILED</p>
              <p style="font-family:var(--font-mono); font-size:0.9rem; color:var(--offwhite-dim); margin:0; line-height:1.6;">Something went wrong. Please try again or contact us directly by phone or email.</p>
            </div>
          )}

          <div class="subpage-recessed">
            <form action="/api/contact" method="POST" style="display:grid; gap:1.25rem;">

              <div class="subpage-form-group">
                <label for="service" class="subpage-label">Enquiry Type</label>
                <select id="service" name="service" required class="subpage-select">
                  {SERVICE_OPTIONS.map(o => (
                    <option value={o.value} selected={o.value === selectedService}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div class="subpage-form-group">
                <label for="name" class="subpage-label">Name *</label>
                <input type="text" id="name" name="name" required class="subpage-input" />
              </div>

              <div class="subpage-form-group">
                <label for="email" class="subpage-label">Email *</label>
                <input type="email" id="email" name="email" required class="subpage-input" />
              </div>

              <div class="subpage-form-group">
                <label for="phone" class="subpage-label">Phone</label>
                <input type="tel" id="phone" name="phone" class="subpage-input" />
              </div>

              <div class="subpage-form-group">
                <label for="message" class="subpage-label">Message *</label>
                <textarea id="message" name="message" rows="6" required class="subpage-textarea"></textarea>
              </div>

              <button type="submit" class="subpage-cta subpage-cta--full">
                SEND ENQUIRY →
              </button>
            </form>
          </div>
        </div>

        {/* ── MODULE: LOCATION PLATE — static map ── */}
        <div class="subpage-module">
          <div class="subpage-module-label">LOCATION PLATE — OX4 1JE</div>
          <div class="subpage-recessed">
            <p style="font-family:var(--font-mono); font-size:0.875rem; color:var(--offwhite-mute); margin:0 0 1.25rem; letter-spacing:0.05em;">
              Cowley Road Studios · 118 Cowley Road · Oxford OX4 1JE
            </p>

            {/* Static map plate */}
            <div class="subpage-map-plate" style="margin-bottom:1.25rem;">
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=118+Cowley+Road,Oxford,OX4+1JE&zoom=15&size=800x300&scale=2&maptype=roadmap&style=element:geometry%7Ccolor:0x1a1a2e&style=element:labels.text.stroke%7Ccolor:0x000000&style=element:labels.text.fill%7Ccolor:0xd4a017&markers=color:0xd4a017%7C51.747,-1.234&key=`}
                alt="Map showing 118 Cowley Road, Oxford"
                class="subpage-map-img"
                width="800" height="300"
                loading="lazy"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
              />
              {/* Fallback if no API key */}
              <div style="display:none; align-items:center; justify-content:center; height:200px; background:#0a0f0a; font-family:var(--font-mono); font-size:0.75rem; color:var(--offwhite-mute); text-align:center; padding:1rem;">
                118 COWLEY ROAD · OXFORD · OX4 1JE
              </div>
              <div class="subpage-map-overlay">
                <a
                  href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="subpage-cta"
                >
                  ↗ OPEN IN GOOGLE MAPS
                </a>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-family:var(--font-mono); font-size:0.8rem; color:var(--offwhite-dim);">
              <div>
                <span style="color:var(--mustard); font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.3rem;">COWLEY ROAD</span>
                118 Cowley Road<br />Oxford OX4 1JE<br />
                <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener noreferrer" style="color:var(--mustard); text-decoration:none;">Maps →</a>
              </div>
              <div>
                <span style="color:var(--mustard); font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.3rem;">CRICKET ROAD</span>
                Cricket Road Studios<br />Oxford OX4 3DJ
              </div>
            </div>
          </div>
        </div>

        {/* ── SEAL — manufacturer's plate ── */}
        <div class="subpage-seal">
          <a href="/" aria-label="Cowley Road Studios — home">
            <img
              src="/static/crs-logo.png"
              alt="Cowley Road Studios"
              class="subpage-seal-img"
              width="120" height="45"
            />
          </a>
          <p class="subpage-seal-sub">EST. 2012 · OXFORD · ODRO ENGINEERING</p>
        </div>

      </div>{/* /subpage-column */}

      {/* RIGHT RAIL */}
      <div class="subpage-rail subpage-rail--right" aria-hidden="true">
        {BOLTS.map((_, i) => <Bolt key={i} />)}
      </div>

    </div>
  );
};
