/**
 * Workshop Café Page — VENUE MODULE v2.0
 * Assimilated into the CRS Terminal chassis.
 * Same subpage-chassis / rails / recessed-panel structure as Contact.tsx.
 * No cream. No Header/Footer. No wsc-mode. Pure dark metal.
 * Route: /workshop-cafe
 */

/* WSC bolt — hex bolt with olive-green tint (distinguishes from CRS grey bolts) */
const WscBolt = () => (
  <svg viewBox="0 0 100 100" class="subpage-bolt wsc-bolt" aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#1a2710" stroke="#0a1006" stroke-width="4" />
    <circle cx="50" cy="50" r="25" fill="#0d1508" />
    <circle cx="50" cy="50" r="15" fill="#0a1006" />
  </svg>
);

const BOLTS = Array(14).fill(null);

/* Amber telemetry label — reused across modules */
const Label = ({ text }: { text: string }) => (
  <div class="subpage-module-label">{text}</div>
);

export const WorkshopCafePage = () => (
  <div class="subpage-chassis wsc-chassis">

    {/* LEFT RAIL */}
    <div class="subpage-rail wsc-rail" aria-hidden="true">
      {BOLTS.map((_, i) => <WscBolt key={i} />)}
    </div>

    {/* CENTRE COLUMN */}
    <div class="subpage-column wsc-column">

      {/* ── HEADER ANCHOR ── */}
      <div class="subpage-header-anchor">
        <a href="/" aria-label="Cowley Road Studios — home">
          <img
            src="/static/workshop-cafe-logo.png"
            alt="Workshop Café"
            class="subpage-header-logo"
            width="160" height="60"
          />
        </a>
        <a href="/" class="subpage-header-back" aria-label="Return to main terminal">
          ← MAIN TERMINAL
        </a>
      </div>

      {/* ── LCD STATUS TICKER ── */}
      <div class="subpage-lcd" aria-label="Venue status">
        WORKSHOP CAFÉ · 118 COWLEY ROAD OX4 1JE &nbsp;·&nbsp; VENUE HIRE: OPEN &nbsp;·&nbsp; REGULAR SERVICE: COMING SOON &nbsp;·&nbsp; ENQUIRIES: ACTIVE
      </div>

      {/* ── MODULE 01 — VENUE STATUS ── */}
      <div class="subpage-module">
        <Label text="MODULE_01 // VENUE STATUS" />
        <div class="subpage-recessed">

          {/* Status alert — orange rail */}
          <div style="
            background: rgba(255,140,0,0.06);
            border: 1px solid rgba(255,140,0,0.35);
            padding: 1rem 1.25rem;
            margin-bottom: 1.25rem;
          ">
            <p style="
              font-family: var(--font-mono);
              font-size: 0.78rem;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: #FF8C00;
              margin: 0 0 0.4rem;
            ">[ STATUS: BUILD PHASE ]</p>
            <p style="
              font-family: var(--font-mono);
              font-size: 0.875rem;
              color: var(--offwhite-dim);
              line-height: 1.6;
              margin: 0;
            ">
              Workshop Café is not currently open for daily café service.
              The space is available by enquiry for private or community use during the build phase.
            </p>
          </div>

          {/* Capacity spec */}
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            font-family: var(--font-mono);
            font-size: 0.875rem;
            margin-bottom: 1.25rem;
          ">
            <div>
              <span style="color:var(--mustard); font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.25rem;">SEATED</span>
              <span style="color:var(--offwhite); font-weight:700; font-size:1.1rem;">25</span>
            </div>
            <div>
              <span style="color:var(--mustard); font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.25rem;">STANDING</span>
              <span style="color:var(--offwhite); font-weight:700; font-size:1.1rem;">60</span>
            </div>
          </div>

          {/* Food pop-up note */}
          <div style="
            background: rgba(212,175,55,0.06);
            border-left: 3px solid rgba(212,175,55,0.4);
            padding: 1rem 1.25rem;
          ">
            <p style="
              font-family: var(--font-mono);
              font-size: 0.875rem;
              color: var(--offwhite-dim);
              line-height: 1.6;
              margin: 0;
            ">
              <strong style="color:var(--mustard);">Coffee & Collaboration.</strong>
              {' '}No kitchen on-site, but we host regular food pop-ups from our creative network and legendary Cowley Road neighbours.
            </p>
          </div>
        </div>
      </div>

      {/* ── MODULE 02 — INFRASTRUCTURE ALLOCATION ── */}
      <div class="subpage-module">
        <Label text="MODULE_02 // INFRASTRUCTURE ALLOCATION" />
        <div class="subpage-recessed">
          <div style="display:grid; gap:0.75rem;">

            {[
              { id: '01', color: 'var(--crs-green)', label: 'OPEN WORKSPACE',
                body: 'Drop-in desk space with high-speed connectivity. No booking required.' },
              { id: '02', color: 'var(--mustard)', label: 'COMMUNITY EVENTS',
                body: 'Talks, screenings, workshops, open mics. Subsidized rates for grassroots / non-profit.' },
              { id: '03', color: 'var(--crs-green)', label: 'PRIVATE HIRE',
                body: 'Small-scale meetings, rehearsals, or private sessions. PA system & projection available.' },
              { id: '04', color: 'var(--mustard)', label: 'LISTENING SESSIONS',
                body: 'Film screenings, DJ sets, live performance. Full PA + lighting rig on request.' },
            ].map(m => (
              <div style={`
                background: rgba(0,0,0,0.3);
                border-left: 3px solid ${m.color};
                padding: 1rem 1.25rem;
              `}>
                <p style={`
                  font-family: var(--font-mono);
                  font-size: 0.7rem;
                  color: ${m.color};
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.12em;
                  margin: 0 0 0.4rem;
                `}>MODULE_{m.id} // {m.label}</p>
                <p style="
                  font-family: var(--font-mono);
                  font-size: 0.875rem;
                  color: var(--offwhite-dim);
                  line-height: 1.6;
                  margin: 0;
                ">{m.body}</p>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ── MODULE 03 — RESOURCE ALLOCATION RATES ── */}
      <div class="subpage-module">
        <Label text="MODULE_03 // RESOURCE ALLOCATION RATES" />
        <div class="subpage-recessed">
          <div style="display:grid; gap:0.75rem; margin-bottom:1.25rem;">

            {[
              { label: 'FULL VENUE HIRE',   price: '£25/hr · £90/4hrs · £200/day',
                note: 'Capacity: 40–60 people · PA system & projection included' },
              { label: 'MEETING TABLE',     price: '£25 / half-day',
                note: 'Workspace with high-speed connectivity' },
              { label: 'COMMUNITY EVENT',   price: '£30 (subsidized)',
                note: 'For grassroots / non-profit cultural activity' },
            ].map(r => (
              <div style="
                background: rgba(0,0,0,0.3);
                border-left: 3px solid rgba(212,175,55,0.5);
                padding: 1.25rem;
              ">
                <div style="
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                  flex-wrap: wrap;
                  gap: 0.75rem;
                  margin-bottom: 0.5rem;
                ">
                  <span style="
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--mustard);
                  ">{r.label}</span>
                  <span style="
                    font-family: var(--font-mono);
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--offwhite);
                  ">{r.price}</span>
                </div>
                <p style="
                  font-family: var(--font-mono);
                  font-size: 0.8rem;
                  color: var(--offwhite-dim);
                  margin: 0;
                ">{r.note}</p>
              </div>
            ))}

          </div>

          {/* Access policy */}
          <div style="
            background: rgba(212,175,55,0.05);
            border: 1px solid rgba(212,175,55,0.2);
            padding: 1.25rem;
            text-align: center;
          ">
            <p style="
              font-family: var(--font-mono);
              font-size: 0.65rem;
              color: var(--mustard);
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.14em;
              margin: 0 0 0.5rem;
            ">[ ACCESS POLICY ]</p>
            <p style="
              font-family: var(--font-mono);
              font-size: 0.85rem;
              color: var(--offwhite-dim);
              line-height: 1.6;
              margin: 0;
            ">Priority allocation granted to local grassroots initiatives. All commercial hire directly funds the CRS Creative Infrastructure.</p>
          </div>
        </div>
      </div>

      {/* ── MODULE 04 — EVENT LOG ── */}
      <div class="subpage-module">
        <Label text="MODULE_04 // EVENT_LOG — PUBLIC SCHEDULE" />
        <div class="subpage-recessed">
          <div id="workshop-cafe-events">
            <p style="
              font-family: var(--font-mono);
              font-size: 0.8rem;
              color: var(--offwhite-mute);
              font-style: italic;
            ">Loading schedule...</p>
          </div>
        </div>
      </div>

      {/* ── MODULE 05 — REFRESHMENT PROTOCOL ── */}
      <div class="subpage-module">
        <Label text="MODULE_05 // REFRESHMENT PROTOCOL" />
        <div class="subpage-recessed">

          {/* Coffee */}
          <p style="
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--mustard);
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin: 0 0 0.75rem;
          ">COFFEE ALLOCATION</p>

          <div style="display:grid; gap:0;">
            {[
              ['ESPRESSO // SINGLE',  '£2.50'],
              ['ESPRESSO // DOUBLE',  '£3.00'],
              ['FLAT_WHITE',          '£3.50'],
              ['CAPPUCCINO',          '£3.50'],
              ['LATTE',               '£3.50'],
              ['AMERICANO',           '£3.00'],
            ].map(([name, price]) => (
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                padding: 0.6rem 0;
                border-bottom: 1px solid rgba(255,255,255,0.06);
              ">
                <span style="font-family:var(--font-mono); font-size:0.875rem; color:var(--offwhite-dim);">{name}</span>
                <span style="font-family:var(--font-mono); font-size:0.875rem; font-weight:700; color:var(--mustard);">{price}</span>
              </div>
            ))}
          </div>

          {/* Tea */}
          <p style="
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--mustard);
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin: 1.5rem 0 0.75rem;
          ">TEA ALLOCATION</p>

          <div style="display:grid; gap:0; margin-bottom:1.25rem;">
            {[
              ['ENGLISH_BREAKFAST', '£2.50'],
              ['EARL_GREY',         '£2.50'],
              ['GREEN_TEA',         '£2.50'],
              ['PEPPERMINT',        '£2.50'],
            ].map(([name, price]) => (
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                padding: 0.6rem 0;
                border-bottom: 1px solid rgba(255,255,255,0.06);
              ">
                <span style="font-family:var(--font-mono); font-size:0.875rem; color:var(--offwhite-dim);">{name}</span>
                <span style="font-family:var(--font-mono); font-size:0.875rem; font-weight:700; color:var(--mustard);">{price}</span>
              </div>
            ))}
          </div>

          {/* Milk note */}
          <div style="
            background: rgba(57,255,20,0.04);
            border: 1px solid rgba(57,255,20,0.15);
            padding: 1rem;
            text-align: center;
          ">
            <p style="
              font-family: var(--font-mono);
              font-size: 0.65rem;
              color: var(--crs-green);
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              margin: 0 0 0.4rem;
            ">[ MILK_OPTIONS ]</p>
            <p style="
              font-family: var(--font-mono);
              font-size: 0.85rem;
              color: var(--offwhite-dim);
              margin: 0;
            ">Oat · Soy · Dairy — No additional charge</p>
          </div>

        </div>
      </div>

      {/* ── MODULE 06 — BOOKING CTA ── */}
      <div class="subpage-module">
        <Label text="MODULE_06 // INITIATE BOOKING SEQUENCE" />
        <div class="subpage-recessed" style="text-align:center;">
          <p style="
            font-family: var(--font-mono);
            font-size: 0.9rem;
            color: var(--offwhite-dim);
            line-height: 1.7;
            margin: 0 0 1.5rem;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
          ">
            Workshop Café operates as the public-facing space of CRS.
            For venue hire, private events, community use, or technical support — initiate contact below.
          </p>
          <a href="/contact?service=venue" class="subpage-cta" style="
            display: inline-block;
            margin-bottom: 0.75rem;
          ">
            ENQUIRE ABOUT VENUE HIRE →
          </a>
          <br />
          <a href="/" class="subpage-header-back" style="font-size:0.8rem;">
            ← VIEW CRS STUDIO SERVICES
          </a>
        </div>
      </div>

      {/* ── LOCATION PLATE ── */}
      <div class="subpage-module">
        <Label text="LOCATION PLATE — OX4 1JE" />
        <div class="subpage-recessed">
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--offwhite-dim);
          ">
            <div>
              <span style="color:var(--mustard); font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.3rem;">WORKSHOP CAFÉ</span>
              118 Cowley Road<br />Oxford OX4 1JE<br />
              <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE" target="_blank" rel="noopener noreferrer" style="color:var(--mustard); text-decoration:none;">Maps →</a>
            </div>
            <div>
              <span style="color:var(--mustard); font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:0.3rem;">CRICKET ROAD STUDIO</span>
              Cricket Road Studios<br />Oxford OX4 3DJ
            </div>
          </div>
        </div>
      </div>

      {/* ── SEAL ── */}
      <div class="subpage-seal">
        <a href="/" aria-label="Cowley Road Studios — home">
          <img
            src="/static/crs-logo.png"
            alt="Cowley Road Studios"
            class="subpage-seal-img"
            width="120" height="45"
          />
        </a>
        <p class="subpage-seal-sub">118 COWLEY ROAD · OXFORD · PART OF CRS</p>
      </div>

    </div>{/* /subpage-column */}

    {/* RIGHT RAIL */}
    <div class="subpage-rail subpage-rail--right wsc-rail" aria-hidden="true">
      {BOLTS.map((_, i) => <WscBolt key={i} />)}
    </div>

    {/* Event log script — inlined, no framework dependency */}
    <script dangerouslySetInnerHTML={{__html: `
      fetch('/events.json')
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById('workshop-cafe-events');
          if (!container) return;
          if (!data.events || data.events.length === 0) {
            container.innerHTML = '<div style="background:rgba(0,0,0,0.3);border-left:3px solid rgba(57,255,20,0.3);padding:1rem 1.25rem;"><p style=\\"font-family:var(--font-mono);font-size:0.7rem;color:var(--crs-green);font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 0.4rem;\\">[ STATUS: NO_ACTIVE_ENTRIES ]</p><p style=\\"font-family:var(--font-mono);font-size:0.85rem;color:var(--offwhite-dim);margin:0;\\">No events scheduled this week. <a href=\\"/contact?service=venue\\" style=\\"color:var(--mustard);text-decoration:none;\\">Enquire about the space →</a></p></div>';
            return;
          }
          const eventsToShow = data.events.slice(0, 5);
          container.innerHTML = eventsToShow.map(event => {
            const date = new Date(event.start);
            const dateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
            const timeStr = event.start.includes('T') ? date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
            return \`<div style="background:rgba(0,0,0,0.3);border-left:3px solid rgba(212,175,55,0.4);padding:1rem 1.25rem;margin-bottom:0.75rem;">
              <p style="font-family:var(--font-mono);font-size:0.7rem;color:var(--mustard);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.3rem;">\${event.title}</p>
              <p style="font-family:var(--font-mono);font-size:0.75rem;color:var(--offwhite-mute);margin:0 0 0.4rem;">\${dateStr}\${timeStr ? ' · ' + timeStr : ''}</p>
              <p style="font-family:var(--font-mono);font-size:0.85rem;color:var(--offwhite-dim);line-height:1.6;margin:0;">\${event.description.substring(0, 120)}\${event.description.length > 120 ? '...' : ''}</p>
            </div>\`;
          }).join('');
        })
        .catch(() => {
          const container = document.getElementById('workshop-cafe-events');
          if (container) container.innerHTML = '<p style=\\"font-family:var(--font-mono);font-size:0.8rem;color:var(--offwhite-mute);\\">Unable to load schedule.</p>';
        });
    `}} />

  </div>
);
