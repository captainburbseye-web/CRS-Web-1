import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))

// System Monitor Status Endpoint
app.get('/status.json', (c) => {
  return c.json({
    "system_monitor": {
      "last_updated": "2026-01-09T08:00:00Z",
      "zones": [
        {
          "id": "cafe",
          "display_name": "CAFÉ",
          "status": "OPEN",
          "pulse_alert": false
        },
        {
          "id": "studio",
          "display_name": "STUDIO",
          "status": "IN SESSION",
          "pulse_alert": true
        },
        {
          "id": "electronics",
          "display_name": "ELECTRONICS",
          "status": "TAKING REPAIRS",
          "pulse_alert": false
        }
      ]
    }
  })
})

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      {/* HEADER */}
      <header class="crs-header mono">
        <div style="display: flex; align-items: center;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/banner-cowley-road-studios-trimmed.png" 
            alt="CRS"
            class="crs-header-logo"
          />
          <span class="crs-header-loc hidden-mobile">LOC: 118_COWLEY_RD_OX4</span>
        </div>
        <div class="crs-header-status">
          <span style="color: var(--mustard);">STATUS:</span>
          <span style="color: var(--signal-white); font-weight: 700;">ONLINE</span>
          <div class="status-pulse"></div>
        </div>
      </header>

      {/* HERO */}
      <section class="crs-hero mono">
        <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
          <div style="max-width: 800px;">
            {/* STATUS LINE */}
            <div class="status-line">
              <span>CAFÉ: OPEN</span>
              <span class="separator">|</span>
              <span>STUDIO: IN SESSION</span>
              <span class="separator">|</span>
              <span>REPAIRS: ACTIVE</span>
            </div>

            <p class="hero-location">Cowley Road Studios · Oxford</p>

            <img 
              src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/title-crs-final-banner.png" 
              alt="COWLEY ROAD STUDIOS"
              class="hero-banner"
            />

            <p class="hero-tagline">Built properly. Run by people who care.</p>

            <p class="hero-description">
              Cowley Road Studios is a professional recording and production space in Oxford. We build systems properly, maintain our equipment in-house, and support artists, engineers, and organisers who care about sound.
            </p>

            <div class="hero-cta">
              <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="crs-button mono">
                [ BOOK STUDIO ]
              </a>
            </div>

            <div class="hero-links mono">
              <a href="#cafe">→ Venue Hire</a>
              <a href="#services">→ AV / Live Sound</a>
              <a href="#services">→ Repairs</a>
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">THE INFRASTRUCTURE</h2>
          <p class="section-intro">
            A working studio, not a concept. Rooms designed for reliable sessions. Clear monitoring. Calm delivery. We prioritise signal integrity and equipment we maintain ourselves.
          </p>
        </div>

        <div class="card-grid card-grid-4">
          {/* UNIT 01: SIGNAL */}
          <div class="crs-card">
            <div class="card-image">
              <img src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-signal.jpg" alt="Signal path" />
            </div>
            <div class="card-content mono">
              <p class="card-label">UNIT 01: SIGNAL</p>
              <h3 class="card-title">HYBRID PATH</h3>
              <ul class="card-list">
                <li>→ Audient Console</li>
                <li>→ Neve-Style Pres</li>
                <li>→ Sphere Modeling</li>
              </ul>
              <p class="card-status">STATUS: CALIBRATED</p>
            </div>
          </div>

          {/* UNIT 02: ROOMS */}
          <div class="crs-card">
            <div class="card-image">
              <img src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-rooms.jpg" alt="Recording rooms" />
            </div>
            <div class="card-content mono">
              <p class="card-label">UNIT 02: ROOMS</p>
              <h3 class="card-title">ISOLATION</h3>
              <ul class="card-list">
                <li>→ 5 Decoupled Zones</li>
                <li>→ Floating Floors</li>
                <li>→ Neutral Tuning</li>
              </ul>
              <p class="card-status">STATUS: SECURE</p>
            </div>
          </div>

          {/* UNIT 03: NETWORK */}
          <div class="crs-card">
            <div class="card-content mono">
              <p class="card-label">UNIT 03: NETWORK</p>
              <h3 class="card-title">DANTE/NDI</h3>
              <ul class="card-list">
                <li>→ 32-Ch Dante</li>
                <li>→ NDI Video Core</li>
                <li>→ Multi-Room Sync</li>
              </ul>
              <p class="card-status">STATUS: ACTIVE</p>
            </div>
          </div>

          {/* UNIT 04: REPAIR */}
          <div class="crs-card">
            <div class="card-image">
              <img src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-maintenance.jpg" alt="Maintenance bench" />
            </div>
            <div class="card-content mono">
              <p class="card-label">UNIT 04: REPAIR</p>
              <h3 class="card-title">BENCH</h3>
              <ul class="card-list">
                <li>→ In-House Electronics</li>
                <li>→ Component Level</li>
                <li>→ Analog Focus</li>
              </ul>
              <p class="card-status">STATUS: ACTIVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (BREWFORCE) */}
      <section id="services" class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title section-title-brewforce heading">WHEN IT HAS TO WORK</h2>
          <p class="section-intro section-intro-brewforce">
            Live sound support, AV setup, and equipment repair. Same practice that runs the studio. Fewer handovers. Fewer assumptions. Calmer outcomes.
          </p>
        </div>

        <div class="card-grid card-grid-2">
          {/* LIVE SOUND */}
          <div class="service-card">
            <div class="service-card-image">
              <img src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/services-live-sound.jpg" alt="Live Sound" />
            </div>

            <div class="service-card-content mono">
              <h3 class="service-headline">SMALL ROOM. SERIOUS RIG.</h3>
              <p class="service-subhead">MISSION-CRITICAL AUDIO</p>

              <div class="service-data">
                <p><span>CAPACITY:</span> Systems for 50–200 cap</p>
                <p><span>SCOPE:</span> Analog, Valve, & Digital</p>
                <p><span>STANDARD:</span> NDI / Dante Integrated</p>
                <p><span>DELIVERY:</span> On-Site Engineering</p>
                <p><span>RIG:</span> Logic/Martin Audio</p>
              </div>

              <p class="card-status">STATUS: FIELD-READY</p>

              <div class="mt-auto" style="margin-top: 1.5rem;">
                <a href="mailto:info@cowleyroadstudios.com?subject=Live%20Sound%20Availability" class="crs-vu-button">
                  [ CHECK AVAILABILITY ]
                </a>
              </div>
            </div>
          </div>

          {/* REPAIRS */}
          <div class="service-card">
            <div class="service-card-image">
              <img src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/services-repairs.jpg" alt="Repairs" />
            </div>

            <div class="service-card-content mono">
              <h3 class="service-headline">ENGINEERED, NOT IMPROVISED.</h3>
              <p class="service-subhead">THE TECHNICAL BENCH</p>

              <div class="service-data">
                <p><span>STANDARD:</span> Component-Level Repair</p>
                <p><span>TURNAROUND:</span> 7–14 Day Typical</p>
                <p><span>FOCUS:</span> Refurbishment & Calibration</p>
                <p><span>STOCK:</span> Valve & Analog Parts Inventory</p>
                <p><span>SCOPE:</span> Audio, Studio, Vintage Gear</p>
              </div>

              <p class="card-status">STATUS: BENCH ACTIVE</p>

              <div class="mt-auto" style="margin-top: 1.5rem;">
                <a href="mailto:info@cowleyroadstudios.com?subject=Repair%20Slot%20Request" class="crs-vu-button">
                  [ REQUEST REPAIR SLOT ]
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer class="crs-footer mono">
        <div class="footer-grid">
          <div class="footer-col">
            <p class="footer-col-title">01 / TERMINAL</p>
            <p>LOC: 118 Cowley Rd</p>
            <p>OXF: OX4 1JE</p>
            <p>LAT: 51.7483° N</p>
            <p>LON: 1.2331° W</p>
          </div>

          <div class="footer-col">
            <p class="footer-col-title">02 / STATUS</p>
            <p>STATUS: OPERATIONAL</p>
            <p>VER: 2026.1.0_LOCKED</p>
            <p>UPTIME: 99.9%</p>
            <p>SIGNAL: ACTIVE</p>
          </div>

          <div class="footer-col">
            <p class="footer-col-title">03 / NAVIGATION</p>
            <p><a href="#infrastructure">_INFRA: [Studio Specs]</a></p>
            <p><a href="#cafe">_CAFÉ: [Venue Hire]</a></p>
            <p><a href="#services">_LOGS: [Repairs]</a></p>
            <p><a href="#contact">_BOOK: [Schedule]</a></p>
          </div>

          <div class="footer-col">
            <p class="footer-col-title">04 / LEGAL</p>
            <p>© 2026 CRS & WC</p>
            <p>BUILT FOR OXFORD</p>
            <p>GRASSROOTS_CORE</p>
            <p>NO_CHAOS_POLICY</p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>
            CONTACT: <a href="mailto:info@cowleyroadstudios.com">info@cowleyroadstudios.com</a>
          </p>
        </div>
      </footer>
    </>
  )
})

export default app
