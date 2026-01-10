import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/policies/*', serveStatic({ root: './public' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))

// System Monitor Status Endpoint (Declarative - No Time Logic)
app.get('/status.json', (c) => {
  // MANUAL STATE DECLARATION
  // Update these values manually or via admin UI (future)
  // No opening hours logic - just current declared state
  
  const zones = {
    cafe: {
      state: 'live',        // 'live' | 'standby' | 'offline'
      status: 'OPEN',       // Human-readable status
      source: 'manual'      // 'manual' | 'calendar' | 'booking' (future)
    },
    studio: {
      state: 'standby',
      status: 'BOOKABLE',
      source: 'manual'
    },
    repairs: {
      state: 'live',
      status: 'TAKING REPAIRS',
      source: 'manual'
    }
  };
  
  // MODE DETECTION: Activity-based, not time-based
  // day = any zone is not offline
  // night = all zones offline
  const mode = Object.values(zones).some(z => z.state !== 'offline') ? 'day' : 'night';
  
  return c.json({
    system_monitor: {
      mode: mode,
      last_updated: new Date().toISOString(),
      zones: zones
    }
  })
})

// Digital Pulse Feed (Physical LED / Public Art Integration)
app.get('/pulse.json', (c) => {
  // Simplified feed for external hardware/installations
  // Polls this endpoint to sync physical signage with digital state
  
  const zones = {
    cafe: { state: 'live', status: 'OPEN' },
    studio: { state: 'standby', status: 'BOOKABLE' },
    repairs: { state: 'live', status: 'TAKING REPAIRS' }
  };
  
  const mode = Object.values(zones).some(z => z.state !== 'offline') ? 'day' : 'night';
  
  // Color mapping for LED hardware (space station aesthetic)
  const stateColors = {
    live: '#00B400',      // Bright industrial green - Neve/Tascam VU meter
    standby: '#d4a017',   // Mustard
    offline: '#C0392B'    // Signal red
  };
  
  return c.json({
    pulse: {
      mode: mode,
      timestamp: new Date().toISOString(),
      zones: {
        cafe: {
          state: zones.cafe.state,
          color: stateColors[zones.cafe.state],
          status: zones.cafe.status
        },
        studio: {
          state: zones.studio.state,
          color: stateColors[zones.studio.state],
          status: zones.studio.status
        },
        repairs: {
          state: zones.repairs.state,
          color: stateColors[zones.repairs.state],
          status: zones.repairs.status
        }
      },
      // Glow intensity based on mode
      glow_intensity: mode === 'day' ? 1.0 : 0.3
    }
  })
})

// Events Feed Endpoint (Google Calendar proxy)
app.get('/events.json', async (c) => {
  try {
    // TODO: Replace with your actual Google Calendar ID
    const CALENDAR_ID = 'YOUR_CALENDAR_ID@group.calendar.google.com'
    const API_KEY = 'YOUR_GOOGLE_API_KEY' // Store in env vars for production
    
    const now = new Date().toISOString()
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${now}&maxResults=10&singleEvents=true&orderBy=startTime`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!data.items) {
      return c.json({ events: [] })
    }
    
    // Transform to simplified format
    const events = data.items.map((item: any) => ({
      id: item.id,
      title: item.summary || 'Untitled Event',
      start: item.start.dateTime || item.start.date,
      end: item.end?.dateTime || item.end?.date,
      description: item.description || '',
      location: item.location || '',
      // Extract booking link from description if present
      bookingLink: extractBookingLink(item.description || '')
    }))
    
    return c.json({ events })
  } catch (error) {
    // Return empty on error (don't break the site)
    return c.json({ events: [] })
  }
})

// Helper to extract booking links from event descriptions
function extractBookingLink(description: string): string | null {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const matches = description.match(urlRegex)
  return matches ? matches[0] : null
}

app.use(renderer)

// SHARED COMPONENTS
const Header = () => (
  <header class="crs-header mono">
    <div style="display: flex; align-items: center;">
      <a href="/">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS%20Web%20Banner%20smaller%20(1).png" 
          alt="Cowley Road Studios"
          class="crs-header-logo"
          width="284"
          height="54"
          loading="eager"
          fetchpriority="high"
        />
      </a>
      <span class="crs-header-loc hidden-mobile">LOC: 118_COWLEY_RD_OX4</span>
    </div>
    <nav class="crs-header-nav mono">
      <a href="/studio">STUDIO</a>
      <a href="/av-services">AV SERVICES</a>
      <a href="/venue">CAFÉ</a>
      <a href="/about">ABOUT</a>
      <a href="/contact">CONTACT</a>
    </nav>
    <div class="status-strip">
      <div class="status-item">
        <span class="indicator indicator-live" aria-hidden="true"></span>
        <span>CAFÉ</span>
        <span class="visually-hidden">Open</span>
      </div>
      <div class="status-item">
        <span class="indicator indicator-live" aria-hidden="true"></span>
        <span>STUDIO</span>
        <span class="visually-hidden">In Session</span>
      </div>
      <div class="status-item">
        <span class="indicator indicator-live" aria-hidden="true"></span>
        <span>REPAIRS</span>
        <span class="visually-hidden">Active</span>
      </div>
    </div>
  </header>
)

const Footer = () => (
  <>
    {/* MOBILE NAVIGATION (FIXED BOTTOM) */}
    <nav class="mobile-nav mono">
      <a href="/studio">STUDIO</a>
      <a href="/av-services">AV</a>
      <a href="/venue">CAFÉ</a>
      <a href="/about">ABOUT</a>
      <a href="/contact">CONTACT</a>
    </nav>

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
        <p><a href="/studio">_STUDIO: [Recording]</a></p>
        <p><a href="/venue">_CAFÉ: [Venue Hire]</a></p>
        <p><a href="/av-services">_AV: [Live Sound]</a></p>
        <p><a href="/av-services/repairs">_BENCH: [Repairs]</a></p>
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

// HOME
app.get('/', (c) => {
  return c.render(
    <>
      <Header />

      {/* HERO */}
      <section class="crs-hero mono">
        <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
          <div style="max-width: 800px;">
            {/* STATUS LINE */}
            <div class="status-strip" style="margin-bottom: 2rem;">
              <div class="status-item">
                <span class="indicator indicator-live" aria-hidden="true"></span>
                <span>CAFÉ</span>
                <span class="visually-hidden">Open</span>
              </div>
              <div class="status-item">
                <span class="indicator indicator-live" aria-hidden="true"></span>
                <span>STUDIO</span>
                <span class="visually-hidden">In Session</span>
              </div>
              <div class="status-item">
                <span class="indicator indicator-live" aria-hidden="true"></span>
                <span>REPAIRS</span>
                <span class="visually-hidden">Active</span>
              </div>
            </div>

            <p class="hero-location">Cowley Road Studios · Oxford</p>

            <figure style="margin: 0 0 1.5rem 0;">
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/crs-panel-hero.webp.jpg" 
                alt="CRS Industrial Engineering Panel - Cowley Road Studios"
                class="hero-banner"
                width="672"
                height="1584"
                loading="eager"
                fetchpriority="high"
              />
            </figure>

            <p class="hero-tagline">ENGINEERED STUDIO & AV ENVIRONMENTS</p>

            <p class="hero-description">
              Reliable recording, live sound, and technical support — designed, calibrated, and run by practicing engineers.
            </p>

            <div class="hero-cta">
              <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="crs-button mono">
                [ BOOK STUDIO ]
              </a>
            </div>

            <div class="hero-links mono">
              <a href="/studio">→ Studio</a>
              <a href="/av-services">→ AV Services</a>
              <a href="/venue">→ Venue Hire</a>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATUS / AVAILABILITY */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title mono" style="font-size: 1.25rem;">LIVE STATUS / AVAILABILITY</h2>
          <p class="section-intro" style="border-left: none; padding-left: 0; margin-bottom: 2rem;">
            Studio sessions · AV bookings · Repairs<br/>
            Availability updated regularly — get in touch to confirm.
          </p>
        </div>
        
        <div style="display: grid; gap: 1.5rem; max-width: 800px;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="indicator indicator-live" aria-hidden="true"></span>
            <div>
              <div class="mono" style="font-size: 0.875rem; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem;">CAFÉ</div>
              <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8);">Open daily 8am–6pm</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="indicator indicator-live" aria-hidden="true"></span>
            <div>
              <div class="mono" style="font-size: 0.875rem; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem;">STUDIO</div>
              <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8);">In session (next availability: Thu 16 Jan)</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="indicator indicator-live" aria-hidden="true"></span>
            <div>
              <div class="mono" style="font-size: 0.875rem; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem;">REPAIRS</div>
              <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8);">Taking bookings</div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDIO SNAPSHOT */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">STUDIO SESSIONS</h2>
          <p class="section-intro">
            Hybrid studio environments with calibrated monitoring and practical ergonomics. Built for recording, production, mixing, and focused creative work.
          </p>
        </div>
        <div class="hero-cta">
          <a href="/studio" class="crs-button mono">[ VIEW STUDIO ]</a>
        </div>
      </section>

      {/* AV SERVICES SNAPSHOT */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">AV SERVICES & LIVE SOUND</h2>
          <p class="section-intro">
            Engineer-led live sound and technical support for events that need to work properly.
          </p>
          <p class="section-intro" style="margin-top: 1rem; font-style: italic;">
            When it matters, we step in.
          </p>
        </div>
        <div class="hero-cta">
          <a href="/av-services" class="crs-button mono">[ VIEW AV SERVICES ]</a>
        </div>
      </section>

      {/* CAFÉ SNAPSHOT */}
      <section class="crs-section section-light">
        <div class="section-header">
          <h2 class="section-title heading">WORKSHOP CAFÉ</h2>
          <p class="section-intro">
            A flexible café and event space — talks, workshops, small live events, and community use.
          </p>
        </div>
        
        {/* WHAT'S ON PREVIEW */}
        <div class="content-block">
          <h3 class="content-heading mono" style="font-size: 1rem;">WHAT'S ON</h3>
          <div id="events-preview" style="margin-top: 1rem;">
            <p style="font-size: 0.875rem; font-style: italic;">Loading events...</p>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{__html: `
          // Load events preview (first 3 only)
          fetch('/events.json')
            .then(res => res.json())
            .then(data => {
              const container = document.getElementById('events-preview');
              if (!container) return;
              
              if (!data.events || data.events.length === 0) {
                container.innerHTML = '<p style="font-size: 0.875rem;">No upcoming events — <a href="/venue" style="color: var(--mustard); text-decoration: none;">book the space</a></p>';
                return;
              }
              
              const eventsToShow = data.events.slice(0, 3);
              
              container.innerHTML = eventsToShow.map(event => {
                const date = new Date(event.start);
                const dateStr = date.toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'short'
                });
                
                return \`
                  <div style="margin-bottom: 1rem; font-size: 0.875rem;">
                    <span style="color: var(--mustard); font-weight: 700;">\${dateStr}</span> · \${event.title}
                  </div>
                \`;
              }).join('') + '<p style="margin-top: 1rem; font-size: 0.875rem;"><a href="/venue" style="color: var(--mustard); text-decoration: none; font-weight: 700;">→ View all events</a></p>';
            })
            .catch(err => {
              const container = document.getElementById('events-preview');
              if (container) {
                container.innerHTML = '<p style="font-size: 0.875rem;"><a href="/venue" style="color: var(--mustard); text-decoration: none;">View upcoming events</a></p>';
              }
            });
        `}} />
        
        <div class="hero-cta">
          <a href="/venue" class="crs-button mono">[ WHAT'S ON ]</a>
        </div>
      </section>

      {/* TRUST / CREDIBILITY */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">BUILT FOR OXFORD</h2>
          <div class="content-text" style="max-width: 800px;">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Engineering-first workflows</li>
              <li style="margin-bottom: 0.75rem;">→ In-house technical team</li>
              <li style="margin-bottom: 0.75rem;">→ Built for live conditions</li>
              <li style="margin-bottom: 0.75rem;">→ No subcontracted guesswork</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section class="crs-section section-light">
        <div class="section-header">
          <p class="section-intro">
            Have a project, session, or event coming up?
          </p>
          <p class="section-intro" style="margin-top: 1rem; font-weight: 700;">
            Get in touch to talk it through.
          </p>
        </div>
        <div class="hero-cta">
          <a href="/contact" class="crs-button mono">[ CONTACT ]</a>
        </div>
      </section>

      <Footer />
    </>
  )
})

// STUDIO
app.get('/studio', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">STUDIO SESSIONS</h2>
          <p class="section-intro">
            Purpose-built studio spaces designed for reliable, repeatable results.
          </p>
        </div>

        {/* OVERVIEW */}
        <div class="content-block">
          <h3 class="content-heading mono">OVERVIEW</h3>
          <div class="content-text">
            <p>
              Cowley Road Studios provides hybrid recording and production environments for musicians, producers, podcasters, and creators who value clarity, focus, and dependable systems.
            </p>
          </div>
        </div>

        {/* TECHNICAL ENVIRONMENT */}
        <div class="content-block">
          <h3 class="content-heading mono">TECHNICAL ENVIRONMENT</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Calibrated monitoring</li>
              <li style="margin-bottom: 0.75rem;">→ Hybrid analogue / digital workflows</li>
              <li style="margin-bottom: 0.75rem;">→ Practical acoustics and ergonomics</li>
              <li style="margin-bottom: 0.75rem;">→ Engineer-maintained systems</li>
            </ul>
            <p style="margin-top: 1.5rem;">
              Everything is designed to work consistently — not just sound good on day one.
            </p>
          </div>
        </div>

        {/* USE CASES */}
        <div class="content-block">
          <h3 class="content-heading mono">USE CASES</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Recording sessions</li>
              <li style="margin-bottom: 0.75rem;">→ Mixing & production</li>
              <li style="margin-bottom: 0.75rem;">→ Podcasting & spoken word</li>
              <li style="margin-bottom: 0.75rem;">→ Writing and pre-production</li>
            </ul>
          </div>
        </div>

        {/* BOOKING */}
        <div class="content-block">
          <h3 class="content-heading mono">BOOKING</h3>
          <div class="content-text">
            <p>
              Sessions are available by booking and enquiry.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div class="hero-cta">
          <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="crs-button mono">
            [ BOOK A SESSION ]
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
})

// AV SERVICES
app.get('/av-services', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">AV SERVICES & LIVE SOUND</h2>
          <p class="section-intro">
            Engineer-led live sound, installs, and technical support — built for live conditions.
          </p>
          <p class="section-intro" style="margin-top: 1rem; font-style: italic;">
            When it matters, we step in.
          </p>
        </div>

        {/* WHAT WE DO */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT WE DO</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Live sound for talks, gigs, launches, and community events</li>
              <li style="margin-bottom: 0.75rem;">→ Temporary and permanent AV installs</li>
              <li style="margin-bottom: 0.75rem;">→ Hybrid and streamed events</li>
              <li style="margin-bottom: 0.75rem;">→ On-site engineers and technical support</li>
            </ul>
            <p style="margin-top: 1.5rem;">
              Every job is handled in-house by people who do this for real.
            </p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div class="content-block">
          <h3 class="content-heading mono">HOW IT WORKS</h3>
          <div class="content-text">
            <ol style="padding-left: 1.5rem;">
              <li style="margin-bottom: 0.75rem;">You tell us what's happening</li>
              <li style="margin-bottom: 0.75rem;">We assess the space and requirements</li>
              <li style="margin-bottom: 0.75rem;">We handle the technical side</li>
              <li style="margin-bottom: 0.75rem;">The event runs smoothly</li>
            </ol>
            <p style="margin-top: 1.5rem; font-style: italic;">
              You focus on the room. We handle the signal.
            </p>
          </div>
        </div>

        {/* CAPABILITY */}
        <div class="content-block">
          <h3 class="content-heading mono">CAPABILITY</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Built for live pressure</li>
              <li style="margin-bottom: 0.75rem;">→ Engineered signal paths</li>
              <li style="margin-bottom: 0.75rem;">→ Calm under failure conditions</li>
              <li style="margin-bottom: 0.75rem;">→ Human-led, not automated</li>
            </ul>
          </div>
        </div>

        {/* BRIDGE TO REPAIRS */}
        <div class="content-block">
          <p class="section-intro">
            Behind every clean live setup is a deep technical bench.
          </p>
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="/av-services/repairs" class="crs-button mono">[ REPAIRS & TECHNICAL BENCH ]</a>
          </div>
        </div>

        {/* CTA */}
        <div class="hero-cta">
          <a href="mailto:info@cowleyroadstudios.com?subject=AV%20Services%20Enquiry" class="crs-button mono">
            [ GET AV QUOTE ]
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
})

// REPAIRS
app.get('/av-services/repairs', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">REPAIRS & TECHNICAL BENCH</h2>
          <p class="section-intro">
            Analogue, digital, and practical fixes — done properly.
          </p>
        </div>

        {/* OVERVIEW */}
        <div class="content-block">
          <h3 class="content-heading mono">OVERVIEW</h3>
          <div class="content-text">
            <p>
              Repairs and system fixes are handled in-house by our technical bench.
            </p>
            <p style="margin-top: 1rem; font-style: italic;">
              Led by <strong>ODRO</strong>, our in-house engineer responsible for repairs and deep technical problem-solving.
            </p>
          </div>
        </div>

        {/* WHAT WE REPAIR */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT WE REPAIR</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Mixers and interfaces</li>
              <li style="margin-bottom: 0.75rem;">→ Amplifiers and speakers</li>
              <li style="margin-bottom: 0.75rem;">→ Cabling and connectors</li>
              <li style="margin-bottom: 0.75rem;">→ Power and signal faults</li>
            </ul>
            <p style="margin-top: 1.5rem;">
              If it's part of a signal chain, we'll assess it honestly.
            </p>
          </div>
        </div>

        {/* THE PROCESS */}
        <div class="content-block">
          <h3 class="content-heading mono">THE PROCESS</h3>
          <div class="content-text">
            <ol style="padding-left: 1.5rem;">
              <li style="margin-bottom: 0.75rem;">Diagnose</li>
              <li style="margin-bottom: 0.75rem;">Repair</li>
              <li style="margin-bottom: 0.75rem;">Test</li>
              <li style="margin-bottom: 0.75rem;">Return</li>
            </ol>
            <p style="margin-top: 1.5rem;">
              No cosmetic fixes. No guesswork.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div class="hero-cta">
          <a href="mailto:info@cowleyroadstudios.com?subject=Repair%20Estimate%20Request" class="crs-button mono">
            [ REQUEST REPAIR ESTIMATE ]
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
})

// WORKSHOP CAFÉ (VENUE)
app.get('/venue', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-light">
        <div class="section-header">
          <h2 class="section-title heading">WORKSHOP CAFÉ</h2>
          <p class="section-intro">
            Flexible café & event space — the public-facing space at Cowley Road Studios.
          </p>
        </div>

        {/* WHAT THE SPACE IS */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT THE SPACE IS</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Café by day</li>
              <li style="margin-bottom: 0.75rem;">→ Flexible venue by night</li>
              <li style="margin-bottom: 0.75rem;">→ Talks, workshops, screenings, small live events</li>
              <li style="margin-bottom: 0.75rem;">→ Technically supported by Cowley Road Studios</li>
            </ul>
          </div>
        </div>

        {/* WHAT'S ON */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT'S ON</h3>
          <div class="content-text">
            <p style="font-style: italic; color: var(--mustard);">
              Upcoming events, workshops, and sessions.
            </p>
            
            {/* Events feed will load here via JavaScript */}
            <div id="events-feed" style="margin-top: 1.5rem;">
              <p style="font-weight: 700;">
                No public events listed — the space is available to book.
              </p>
            </div>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{__html: `
          // Load events from API
          fetch('/events.json')
            .then(res => res.json())
            .then(data => {
              const container = document.getElementById('events-feed');
              if (!container) return;
              
              if (!data.events || data.events.length === 0) {
                // Keep default empty state
                return;
              }
              
              // Display up to 7 events
              const eventsToShow = data.events.slice(0, 7);
              
              container.innerHTML = eventsToShow.map(event => {
                const date = new Date(event.start);
                const dateStr = date.toLocaleDateString('en-GB', { 
                  weekday: 'short', 
                  day: 'numeric', 
                  month: 'short',
                  year: 'numeric'
                });
                const timeStr = event.start.includes('T') ? date.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit'
                }) : '';
                
                const bookingButton = event.bookingLink ? 
                  \`<a href="\${event.bookingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 0.5rem; color: var(--mustard); text-decoration: none; font-weight: 700;">→ Book Tickets / More Info</a>\` : '';
                
                return \`
                  <div style="border-left: 2px solid var(--mustard); padding-left: 1rem; margin-bottom: 1.5rem;">
                    <h4 style="font-family: 'JetBrains Mono', monospace; font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem;">\${event.title}</h4>
                    <p style="font-size: 0.875rem; color: var(--mustard); margin-bottom: 0.5rem;">\${dateStr}\${timeStr ? ' · ' + timeStr : ''}</p>
                    <p style="font-size: 0.875rem; line-height: 1.5;">\${event.description.substring(0, 150)}\${event.description.length > 150 ? '...' : ''}</p>
                    \${bookingButton}
                  </div>
                \`;
              }).join('');
            })
            .catch(err => {
              console.error('Failed to load events:', err);
              // Keep default empty state on error
            });
        `}} />

        {/* VENUE HIRE */}
        <div class="content-block">
          <h3 class="content-heading mono">VENUE HIRE</h3>
          <div class="content-text">
            <p>Workshop Café is available for:</p>
            <ul style="list-style: none; padding: 0; margin-top: 1rem;">
              <li style="margin-bottom: 0.75rem;">→ Workshops & talks</li>
              <li style="margin-bottom: 0.75rem;">→ Community events</li>
              <li style="margin-bottom: 0.75rem;">→ Launches & screenings</li>
            </ul>
            <p style="margin-top: 1.5rem;">
              Technical support is available where required.
            </p>
          </div>
        </div>

        {/* BOOKING CTAs */}
        <div class="content-block">
          <h3 class="content-heading mono">BOOK THE SPACE</h3>
          <div class="content-text">
            <p style="margin-bottom: 1.5rem;">
              Choose the booking option that fits your needs:
            </p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            {/* Venue Hire */}
            <div style="border: 1px solid var(--mustard); padding: 1.5rem;">
              <h4 class="mono" style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--mustard);">VENUE HIRE</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.5;">Book the space for workshops, talks, community events, launches, or screenings.</p>
              <a href="mailto:info@cowleyroadstudios.com?subject=Venue%20Hire%20Request" class="crs-button mono" style="width: auto; display: inline-block;">
                [ BOOK THE SPACE ]
              </a>
            </div>
            
            {/* Private Enquiries */}
            <div style="border: 1px solid var(--mustard); padding: 1.5rem;">
              <h4 class="mono" style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--mustard);">PRIVATE ENQUIRIES</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.5;">For custom bookings or specific requirements.</p>
              <a href="mailto:info@cowleyroadstudios.com?subject=Private%20Enquiry" class="crs-button mono" style="width: auto; display: inline-block;">
                [ REQUEST AVAILABILITY ]
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
})

// ABOUT
app.get('/about', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">ABOUT COWLEY ROAD STUDIOS</h2>
        </div>

        {/* OVERVIEW */}
        <div class="content-block">
          <div class="content-text">
            <p>
              Cowley Road Studios exists to provide reliable, engineer-led creative infrastructure on Cowley Road.
            </p>
            <p style="margin-top: 1.5rem;">
              Built because something was missing — dependable spaces that prioritise systems, people, and practical outcomes over hype.
            </p>
            <p style="margin-top: 1.5rem;">
              The studio, AV services, and Workshop Café work together as a connected system: infrastructure at the core, public life at the front.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
})

// CONTACT
app.get('/contact', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">CONTACT</h2>
          <p class="section-intro">
            For bookings, quotes, or enquiries
          </p>
        </div>

        {/* CONTACT METHODS */}
        <div class="content-block">
          <h3 class="content-heading mono">GET IN TOUCH</h3>
          <div class="content-text mono">
            <p><strong>EMAIL:</strong> <a href="mailto:info@cowleyroadstudios.com">info@cowleyroadstudios.com</a></p>
            <p style="margin-top: 1rem;"><strong>ADDRESS:</strong> Cowley Road Studios, 118 Cowley Road, Oxford, OX4 1JE</p>
          </div>
        </div>

        {/* BOOKING LINKS */}
        <div class="content-block">
          <h3 class="content-heading mono">QUICK LINKS</h3>
          <div class="hero-links mono">
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer">→ Book Studio</a>
            <a href="mailto:info@cowleyroadstudios.com?subject=Venue%20Availability">→ Book Venue</a>
            <a href="mailto:info@cowleyroadstudios.com?subject=AV%20Services%20Enquiry">→ AV Services</a>
            <a href="mailto:info@cowleyroadstudios.com?subject=Repair%20Request">→ Repairs</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
})

export default app
