/**
 * Workshop Café Contact Page — WSC COMMS MODULE v1.0
 * A copy of the CRS Contact page re-skinned in Workshop Café olive-green + gold.
 * Route: /workshop-cafe/contact
 * API:   POST /api/contact-wsc  →  workshopcafe@crsoxford.com
 */

interface WscContactPageProps {
  initialService?: string;
  status?: 'sent' | 'error' | null;
}

const WSC_SERVICE_OPTIONS = [
  { value: 'private-hire',   label: 'Private Hire / Exclusive Booking' },
  { value: 'event',          label: 'Event / Pop-Up / Showcase' },
  { value: 'workshop',       label: 'Workshop or Class' },
  { value: 'community',      label: 'Community Project' },
  { value: 'general',        label: 'General Enquiry' },
] as const;

/* Bolt SVG — same hex bolt used on CRS subpages, tinted green */
const WscBolt = () => (
  <svg viewBox="0 0 100 100" class="subpage-bolt wsc-bolt" aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#2e3f1e" stroke="#0d1508" stroke-width="4" />
    <circle cx="50" cy="50" r="25" fill="#1a2710" />
    <circle cx="50" cy="50" r="15" fill="#0d1508" />
  </svg>
);

const BOLTS = Array(14).fill(null);

export const WorkshopCafeContactPage = ({ initialService = 'private-hire', status = null }: WscContactPageProps) => {
  const selectedService = WSC_SERVICE_OPTIONS.some(o => o.value === initialService)
    ? initialService : 'private-hire';

  const sent  = status === 'sent';
  const error = status === 'error';

  return (
    <div class="subpage-chassis wsc-chassis">

      {/* LEFT RAIL */}
      <div class="subpage-rail wsc-rail" aria-hidden="true">
        {BOLTS.map((_, i) => <WscBolt key={i} />)}
      </div>

      {/* CENTRE COLUMN */}
      <div class="subpage-column wsc-column">

        {/* ── HEADER — WSC logo + back links ── */}
        <div class="subpage-header-anchor wsc-header-anchor">
          <a href="/workshop-cafe" aria-label="The Workshop Café — home">
            <picture>
              <source srcset="/static/workshop-cafe-logo.webp" type="image/webp" />
              <img
                src="/static/workshop-cafe-logo.webp"
                alt="The Workshop Café"
                class="wsc-header-logo"
                width="160" height="60"
              />
            </picture>
          </a>
          <nav class="wsc-header-nav" aria-label="Breadcrumb">
            <a href="/workshop-cafe" class="subpage-header-back wsc-back-link">← WORKSHOP CAFÉ</a>
            <span class="wsc-back-sep" aria-hidden="true"> / </span>
            <a href="/" class="subpage-header-back wsc-back-link">MAIN TERMINAL</a>
          </nav>
        </div>

        {/* ── LCD TICKER — WSC warm amber variant ── */}
        <div class="subpage-lcd wsc-lcd" aria-label="System status">
          VENUE COMMS: OPEN &nbsp;·&nbsp; HIRE ENQUIRIES: ACTIVE &nbsp;·&nbsp; 118 COWLEY ROAD · OXFORD &nbsp;·&nbsp; RESPONSE TIME: &lt;24H
        </div>

        {/* ── MODULE: PAGE HEADER ── */}
        <div class="subpage-module wsc-module">
          <div class="subpage-module-label wsc-module-label">WSC HIRE CHANNEL — CONTACT MODULE</div>
          <div class="subpage-recessed wsc-recessed">
            {/* WSC gear + title lockup */}
            <div class="wsc-hero-lockup" aria-hidden="true">
              <svg class="wsc-hero-gear" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M32 20a12 12 0 1 0 0 24 12 12 0 0 0 0-24z" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <path d="M32 4v6M32 54v6M4 32h6M54 32h6M10.1 10.1l4.2 4.2M49.7 49.7l4.2 4.2M49.7 14.3l-4.2 4.2M10.1 49.7l4.2-4.2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
              <h1 class="wsc-hero-title">THE WORKSHOP CAFÉ</h1>
              <p class="wsc-hero-sub">HIRE &amp; ENQUIRY CHANNEL</p>
            </div>
            <p class="wsc-intro-copy">
              Use this channel for venue hire, private events, workshops, and general enquiries about
              the Workshop Café at 118 Cowley Road.
              For studio bookings use the <a href="/contact" class="wsc-inline-link">CRS main contact page</a>.
            </p>
          </div>
        </div>

        {/* ── MODULE: DIRECT LINES ── */}
        <div class="subpage-module wsc-module">
          <div class="subpage-module-label wsc-module-label">DIRECT LINES</div>
          <div class="subpage-recessed wsc-recessed">
            <div class="wsc-direct-grid">
              <div class="wsc-direct-item">
                <span class="wsc-direct-label">EMAIL</span>
                <a href="mailto:workshopcafe@crsoxford.com" class="wsc-direct-value">workshopcafe@crsoxford.com</a>
              </div>
              <div class="wsc-direct-item">
                <span class="wsc-direct-label">PHONE</span>
                <a href="tel:+441865722027" class="wsc-direct-value">+44 (0)1865 722027</a>
              </div>
              <div class="wsc-direct-item">
                <span class="wsc-direct-label">ADDRESS</span>
                <span class="wsc-direct-value wsc-direct-value--muted">118 Cowley Road, Oxford OX4 1JE</span>
              </div>
              <div class="wsc-direct-item">
                <span class="wsc-direct-label">INSTAGRAM</span>
                <a href="https://instagram.com/cowleyroadstudios.ox" target="_blank" rel="noopener noreferrer" class="wsc-direct-value">@cowleyroadstudios.ox</a>
              </div>
            </div>
            {/* Capacity spec plate */}
            <div class="wsc-capacity-plate">
              <div class="wsc-capacity-cell">
                <span class="wsc-capacity-num">25</span>
                <span class="wsc-capacity-unit">SEATED</span>
              </div>
              <div class="wsc-capacity-divider" aria-hidden="true"></div>
              <div class="wsc-capacity-cell">
                <span class="wsc-capacity-num">60</span>
                <span class="wsc-capacity-unit">STANDING</span>
              </div>
              <div class="wsc-capacity-divider" aria-hidden="true"></div>
              <div class="wsc-capacity-cell">
                <span class="wsc-capacity-num">118</span>
                <span class="wsc-capacity-unit">COWLEY RD</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MODULE: USE CASE SELECTOR ── */}
        <div class="subpage-module wsc-module">
          <div class="subpage-module-label wsc-module-label">HIRE USE CASES</div>
          <div class="subpage-recessed wsc-recessed">
            <div class="wsc-use-grid">
              <div class="wsc-use-pill">Listening Sessions</div>
              <div class="wsc-use-pill">Film Screenings</div>
              <div class="wsc-use-pill">Workshops &amp; Classes</div>
              <div class="wsc-use-pill">Talks &amp; Discussions</div>
              <div class="wsc-use-pill">Private Bookings</div>
              <div class="wsc-use-pill">Open Mics</div>
              <div class="wsc-use-pill">Pop-Up Events</div>
              <div class="wsc-use-pill">Community Projects</div>
            </div>
          </div>
        </div>

        {/* ── MODULE: ENQUIRY FORM ── */}
        <div id="wsc-contact-form" class="subpage-module wsc-module">
          <div class="subpage-module-label wsc-module-label">HIRE ENQUIRY FORM</div>

          {/* Status: sent */}
          {sent && (
            <div class="subpage-recessed wsc-recessed wsc-status wsc-status--ok">
              <p class="wsc-status-head">✓ ENQUIRY RECEIVED</p>
              <p class="wsc-status-body">Your message has been sent to the Workshop Café team. We'll respond within 24 hours.</p>
            </div>
          )}

          {/* Status: error */}
          {error && (
            <div class="subpage-recessed wsc-recessed wsc-status wsc-status--err">
              <p class="wsc-status-head">✕ TRANSMISSION FAILED</p>
              <p class="wsc-status-body">Something went wrong. Please try again or email us directly at <a href="mailto:workshopcafe@crsoxford.com" class="wsc-inline-link">workshopcafe@crsoxford.com</a>.</p>
            </div>
          )}

          <div class="subpage-recessed wsc-recessed">
            <form action="/api/contact-wsc" method="POST" style="display:grid; gap:1.25rem;">

              {/* Field 1 — Name */}
              <div class="subpage-form-group">
                <label for="wsc-name" class="subpage-label wsc-label">Name / Organisation *</label>
                <input
                  type="text"
                  id="wsc-name"
                  name="name"
                  required
                  autocomplete="name"
                  class="subpage-input wsc-input"
                  placeholder="Your name, band, or organisation"
                />
              </div>

              {/* Field 2 — Email */}
              <div class="subpage-form-group">
                <label for="wsc-email" class="subpage-label wsc-label">Email Address *</label>
                <input
                  type="email"
                  id="wsc-email"
                  name="email"
                  required
                  autocomplete="email"
                  class="subpage-input wsc-input"
                  placeholder="your@email.com"
                />
              </div>

              {/* Field 3 — Hire type */}
              <div class="subpage-form-group">
                <label for="wsc-service" class="subpage-label wsc-label">Type of Hire *</label>
                <select id="wsc-service" name="service" required class="subpage-select wsc-input">
                  {WSC_SERVICE_OPTIONS.map(o => (
                    <option value={o.value} selected={o.value === selectedService}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Field 4 — Project notes */}
              <div class="subpage-form-group">
                <label for="wsc-notes" class="subpage-label wsc-label">Date &amp; Details *</label>
                <textarea
                  id="wsc-notes"
                  name="notes"
                  rows={6}
                  required
                  class="subpage-textarea wsc-input"
                  placeholder="Preferred date(s), expected attendance, any AV or catering notes…"
                ></textarea>
              </div>

              {/* Hidden source tag so email handler knows it's WSC */}
              <input type="hidden" name="source" value="workshop-cafe" />

              <button type="submit" class="subpage-cta wsc-cta wsc-cta--full">
                SEND HIRE ENQUIRY →
              </button>
            </form>
          </div>
        </div>

        {/* ── MODULE: LOCATION ── */}
        <div class="subpage-module wsc-module">
          <div class="subpage-module-label wsc-module-label">LOCATION PLATE — OX4 1JE</div>
          <div class="subpage-recessed wsc-recessed">
            <p class="wsc-location-copy">
              The Workshop Café · 118 Cowley Road · Oxford OX4 1JE
            </p>
            <div class="subpage-map-plate wsc-map-plate">
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=118+Cowley+Road,Oxford,OX4+1JE&zoom=15&size=800x300&scale=2&maptype=roadmap&style=element:geometry%7Ccolor:0x1a2710&style=element:labels.text.stroke%7Ccolor:0x0d1508&style=element:labels.text.fill%7Ccolor:0xc8a84b&markers=color:0xc8a84b%7C51.747,-1.234&key=`}
                alt="Map showing 118 Cowley Road, Oxford"
                class="subpage-map-img"
                width="800" height="300"
                loading="lazy"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
              />
              <div style="display:none; align-items:center; justify-content:center; height:200px; background:#0d1508; font-family:var(--font-mono); font-size:0.75rem; color:#a89060; text-align:center; padding:1rem;">
                118 COWLEY ROAD · OXFORD · OX4 1JE
              </div>
              <div class="subpage-map-overlay">
                <a
                  href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="subpage-cta wsc-cta"
                >
                  ↗ OPEN IN GOOGLE MAPS
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEAL — WSC manufacturer plate ── */}
        <div class="subpage-seal wsc-seal">
          <a href="/workshop-cafe" aria-label="The Workshop Café">
            <picture>
              <source srcset="/static/workshop-cafe-logo.webp" type="image/webp" />
              <img
                src="/static/workshop-cafe-logo.webp"
                alt="The Workshop Café"
                class="subpage-seal-img wsc-seal-img"
                width="120" height="45"
              />
            </picture>
          </a>
          <p class="subpage-seal-sub wsc-seal-sub">118 COWLEY ROAD · OXFORD · OX4 1JE</p>
          <a href="/" class="wsc-seal-crs-link" aria-label="Cowley Road Studios">
            <img src="/static/crs-logo.webp" alt="Cowley Road Studios" class="wsc-seal-crs-logo" width="90" height="34" />
          </a>
        </div>

      </div>{/* /subpage-column */}

      {/* RIGHT RAIL */}
      <div class="subpage-rail subpage-rail--right wsc-rail" aria-hidden="true">
        {BOLTS.map((_, i) => <WscBolt key={i} />)}
      </div>

    </div>
  );
};
