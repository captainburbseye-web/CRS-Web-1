import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/policies/*', serveStatic({ root: './public' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))

// API ENDPOINTS
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    console.log('[API] Contact form submission:', body)
    
    // TODO: Implement email notification or database storage
    // For now, log and return success
    
    return c.json({ 
      success: true, 
      message: '[ SIGNAL RECEIVED ] Inquiry logged to CRS Administrative Queue. A technical representative will respond within 24 operational hours.' 
    }, 200)
  } catch (error) {
    console.error('[API] Contact form error:', error)
    return c.json({ 
      success: false, 
      message: '[ SIGNAL FAILURE ] Internal server error. Submission not logged. Please direct urgent inquiries to info@cowleyroadstudios.com.' 
    }, 500)
  }
})

app.post('/api/book/studio', async (c) => {
  try {
    const body = await c.req.json()
    console.log('[API] Studio booking submission:', body)
    
    // TODO: Implement booking system integration
    // For now, log and return success
    
    return c.json({ 
      success: true, 
      message: 'Booking request received. We will contact you to confirm availability.' 
    }, 200)
  } catch (error) {
    console.error('[API] Studio booking error:', error)
    return c.json({ 
      success: false, 
      message: '[ ALLOCATION FAILED ] Gateway timeout. Data not persisted. Please verify network connection and re-submit.' 
    }, 500)
  }
})

app.post('/api/book/venue', async (c) => {
  try {
    const body = await c.req.json()
    console.log('[API] Venue booking submission:', body)
    
    // TODO: Implement booking system integration
    // For now, log and return success
    
    return c.json({ 
      success: true, 
      message: '[ VENUE LOGGED ] Workshop Café hire request received. Administrative review in progress. Status: Pending.' 
    }, 200)
  } catch (error) {
    console.error('[API] Venue booking error:', error)
    return c.json({ 
      success: false, 
      message: '[ SUBMISSION VOID ] API endpoint unresponsive. Please retry or contact the facility manager directly.' 
    }, 500)
  }
})

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
    live: '#008F00',      // Muted green - readable, not glaring
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
  <header class="crs-header">
    {/* Left: Identity + Services */}
    <div class="header-left">
      <a href="/" class="header-logo-link">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-pedal-badge-profile.jpg" 
          alt="CRS"
          class="header-logo-badge"
          width="40"
          height="40"
          loading="eager"
        />
      </a>
      <a href="/" class="header-brand">CRS</a>
      <nav class="header-services">
        <a href="/studio">Studio</a>
        <span class="separator">·</span>
        <a href="/venue">Venue</a>
        <span class="separator">·</span>
        <a href="/av-services">AV</a>
      </nav>
    </div>

    {/* Right: Actions */}
    <nav class="header-actions">
      <a href="/locations">Locations</a>
      <span class="separator">|</span>
      <a href="/book">Book</a>
      <span class="separator">|</span>
      <a href="/contact">Contact</a>
    </nav>
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
      <a href="/" class="primary-book-button-mobile mono">BOOK</a>
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
        <p><a href="/repairs/status">_AV_REPAIRS: [Diagnostics]</a></p>
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
      <p class="footer-locations-header">CRS Locations</p>
      <p class="footer-location-item">– Cowley Road</p>
      <p class="footer-location-item">– Cricket Road</p>
      <p class="footer-contact">
        CONTACT: <a href="mailto:info@cowleyroadstudios.com">info@cowleyroadstudios.com</a>
      </p>
    </div>

    {/* Footer Signature - End Cap */}
    <div class="footer-signature">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-brand-stamp-transparent.jpg" 
        alt="CRS Brand Stamp"
        class="brand-stamp"
        width="150"
        height="150"
        loading="lazy"
      />
    </div>
  </footer>
  </>
)

// REDIRECTS & MISSING PAGES
app.get('/av', (c) => c.redirect('/av-services'))

// BOOKING GATEWAY
app.get('/book', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">SERVICE BOOKING</h2>
          <p class="section-intro">
            Select a service to check availability and submit a booking request.
          </p>
        </div>

        {/* Recording & Production */}
        <div class="content-block">
          <h3 class="content-heading heading">RECORDING & PRODUCTION</h3>
          <div class="content-text">
            <p>
              Studio recording, mixing, and production sessions.
            </p>
          </div>
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="crs-button mono">
              [ BOOK A SESSION ]
            </a>
          </div>
        </div>

        {/* AV & Technical Services */}
        <div class="content-block">
          <h3 class="content-heading heading">AV & TECHNICAL SERVICES</h3>
          <div class="content-text">
            <p>
              Live sound, installations, repairs, and technical support.
            </p>
          </div>
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="/contact?service=av" class="crs-button mono">
              [ CONTACT ]
            </a>
          </div>
        </div>

        {/* Venue Hire */}
        <div class="content-block">
          <h3 class="content-heading heading">VENUE HIRE</h3>
          <div class="content-text">
            <p>
              Workshop space for talks, workshops, launches, and community events.
            </p>
          </div>
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="/contact?service=venue" class="crs-button mono">
              [ CONTACT ]
            </a>
          </div>
        </div>

        {/* Café Service */}
        <div class="content-block">
          <h3 class="content-heading heading">CAFÉ SERVICE</h3>
          <div class="content-text">
            <p>
              Coffee and refreshments service.
            </p>
          </div>
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="/contact" class="crs-button mono">
              [ CONTACT ]
            </a>
          </div>
        </div>

      </section>
      <Footer />
    </>
  )
})

// LOCATIONS PAGE
app.get('/locations', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">CRS LOCATIONS</h2>
          <p class="section-intro">
            CRS operates studio and venue facilities across Oxford at two primary locations.
          </p>
        </div>

        {/* COWLEY ROAD */}
        <div class="content-block">
          <h3 class="content-heading heading">CRS — COWLEY ROAD</h3>
          <div class="content-text">
            <p style="margin-bottom: 1rem;">
              <strong>Address:</strong><br />
              118 Cowley Road<br />
              Oxford OX4 1JE
            </p>
            <p style="margin-bottom: 1rem;">
              <strong>Facilities:</strong>
            </p>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;">→ Recording studios and rehearsal rooms</li>
              <li style="margin-bottom: 0.5rem;">→ Workshop Café (events space)</li>
              <li style="margin-bottom: 0.5rem;">→ Technical development facilities</li>
            </ul>
            <p style="margin-top: 1.5rem; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">
              Main operational site with full studio infrastructure and publicly accessible event space.
            </p>
          </div>
        </div>

        {/* CRICKET ROAD */}
        <div class="content-block">
          <h3 class="content-heading heading">CRS — CRICKET ROAD</h3>
          <div class="content-text">
            <p style="margin-bottom: 1rem;">
              <strong>Address:</strong><br />
              Cricket Road<br />
              Oxford
            </p>
            <p style="margin-bottom: 1rem;">
              <strong>Facilities:</strong>
            </p>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;">→ Rehearsal rooms</li>
              <li style="margin-bottom: 0.5rem;">→ Community practice spaces</li>
            </ul>
            <p style="margin-top: 1.5rem; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">
              Partner studio location with dedicated rehearsal facilities.
            </p>
          </div>
        </div>

        <div class="hero-cta">
          <a href="/contact" class="crs-button mono">[ CONTACT FOR ACCESS ]</a>
        </div>
      </section>
      <Footer />
    </>
  )
})

// HOME
app.get('/', (c) => {
  return c.render(
    <>
      <Header />

      {/* HERO */}
      <section class="crs-hero">
        <div class="hero-container">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/crs-master-power-panel%20FIXED.png" 
            alt="CRS Master Power Panel"
            class="hero-power-panel"
            loading="eager"
          />
          <p class="operational-statement">Cowley Road Studios is a purpose-built studio and venue system supporting recording, performance, and digital creative work in Oxford.</p>
        </div>
      </section>

      {/* STUDIO SNAPSHOT */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">STUDIO SESSIONS</h2>
          <p class="section-intro">
            Acoustically treated rooms, calibrated monitoring, and networked audio infrastructure for recording, production, and focused creative work.
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
            Engineer-led live sound and technical support for community venues, cultural events, and public gatherings.
          </p>
        </div>
        <div class="hero-cta">
          <a href="/av-services" class="crs-button mono">[ VIEW AV SERVICES ]</a>
        </div>
      </section>

      {/* CAFÉ SNAPSHOT - CREATIVE HEARTBEAT */}
      <section class="crs-section cafe-heartbeat">
        <div class="section-header">
          <h2 class="section-title cafe-title">WORKSHOP CAFÉ</h2>
          <p class="section-intro cafe-intro">
            The public-facing space of CRS — a café, workspace, and small venue supporting community events and creative activity.
          </p>
        </div>
        
        {/* SERVICE SNAPSHOT ROW */}
        <div class="cafe-services">
          <div class="cafe-service-card">
            <h3 class="cafe-service-title">COFFEE & MATCHA</h3>
            <p class="cafe-service-text">Specialty coffee and matcha service</p>
          </div>
          <div class="cafe-service-card">
            <h3 class="cafe-service-title">EVENT SPACE</h3>
            <p class="cafe-service-text">Talks, workshops, live performance</p>
          </div>
          <div class="cafe-service-card">
            <h3 class="cafe-service-title">WORKSPACE</h3>
            <p class="cafe-service-text">Hot-desk and community co-working</p>
          </div>
        </div>
        
        {/* WHAT'S ON PREVIEW */}
        <div class="content-block" style="margin-top: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <h3 class="content-heading mono" style="font-size: 1rem; margin: 0; color: var(--mustard);">WHAT'S ON</h3>
            <img 
              src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/Shop%20Sign%20Logo.png" 
              alt="Workshop Café"
              style="width: 80px; height: auto; opacity: 0.8;"
              loading="lazy"
            />
          </div>
          <div id="events-preview" style="margin-top: 1rem;">
            <p style="font-size: 0.875rem; font-style: italic; color: rgba(245, 245, 245, 0.7);">Loading events...</p>
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
                container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">No upcoming events — <a href="/cafe" style="color: var(--mustard); text-decoration: none; font-weight: 700;">explore the space</a></p>';
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
                  <div style="margin-bottom: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-left: 2px solid var(--mustard);">
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">\${dateStr}</div>
                    <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">\${event.title}</div>
                  </div>
                \`;
              }).join('') + '<p style="margin-top: 1rem; font-size: 0.875rem;"><a href="/cafe" style="color: var(--mustard); text-decoration: none; font-weight: 700;">→ View full schedule</a></p>';
            })
            .catch(err => {
              const container = document.getElementById('events-preview');
              if (container) {
                container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);"><a href="/cafe" style="color: var(--mustard); text-decoration: none;">View upcoming events</a></p>';
              }
            });
        `}} />
        
        <div class="hero-cta" style="margin-top: 2rem;">
          <a href="/cafe" class="crs-button mono">[ EXPLORE CAFÉ ]</a>
        </div>
      </section>

      {/* PUBLIC VALUE */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">PUBLIC ACCESS</h2>
          <div class="content-text" style="max-width: 800px;">
            <p style="margin-bottom: 1rem;">
              CRS provides publicly accessible recording, rehearsal, and technical development infrastructure for grassroots music and cultural activity across Oxford.
            </p>
            <p style="margin-bottom: 1rem;">
              Facilities are operational at 118 Cowley Road and available for community use, skills development, and independent creative work.
            </p>
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">
              Workshop Café offers a separate publicly accessible events space for talks, workshops, and community gatherings.
            </p>
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
            <p style="margin-top: 1rem;">
              <a href="/studio/infrastructure" style="color: var(--mustard); text-decoration: underline;">
                → View Room-by-Room Infrastructure
              </a>
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

// STUDIO INFRASTRUCTURE
app.get('/studio/infrastructure', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">ROOM-BY-ROOM INFRASTRUCTURE</h2>
          <p class="section-intro">
            Technical ledger of spaces, signal paths, and monitoring systems.
          </p>
        </div>

        {/* SYSTEM STATUS */}
        <div class="system-status-banner">
          <span class="mono" style="color: var(--mustard); font-size: 0.75rem; letter-spacing: 0.1em;">
            STATUS: SYSTEM_CHECK_ACTIVE
          </span>
        </div>

        {/* THE LIVE ROOM */}
        <div class="infrastructure-room">
          <h3 class="content-heading heading">1. THE LIVE ROOM</h3>
          <div class="room-specs mono">
            <span class="spec-label">DIMENSIONS:</span> 3960 × 2816 mm
          </div>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;"><strong>Acoustic Role:</strong> Primary ensemble tracking and drum room.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Monitoring:</strong> Genelec nearfield reference monitors.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Connectivity:</strong> AV-linked via Dante (Audio) and NDI (Video).</li>
              <li style="margin-bottom: 0.75rem;"><strong>Inventory:</strong> Drum kit (Existing), Piano (Existing).</li>
            </ul>
          </div>
        </div>

        {/* THE BIG BOOTH */}
        <div class="infrastructure-room">
          <h3 class="content-heading heading">2. THE BIG BOOTH</h3>
          <div class="room-specs mono">
            <span class="spec-label">DIMENSIONS:</span> 5300 × 1480 mm
          </div>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;"><strong>Acoustic Role:</strong> Versatile "double booth" for larger groups or brass sections.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Connectivity:</strong> Parallel conduit with 1m service loops for Dante/SDI expansion.</li>
            </ul>
          </div>
        </div>

        {/* SMALL VOCAL BOOTHS */}
        <div class="infrastructure-room">
          <h3 class="content-heading heading">3. SMALL VOCAL BOOTHS (×2)</h3>
          <div class="room-specs mono">
            <span class="spec-label">DIMENSIONS:</span> 1480 × 1440 mm (each)
          </div>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;"><strong>Acoustic Role:</strong> Isolated precision tracking for vocals and solo instruments.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Monitoring:</strong> Genelec 8010A pairs and SSL 12 USB interfaces (Per Pod).</li>
            </ul>
          </div>
        </div>

        {/* WORKSHOP CAFÉ STAGE */}
        <div class="infrastructure-room">
          <h3 class="content-heading heading">4. WORKSHOP CAFÉ STAGE</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;"><strong>Role:</strong> Public-facing "Tiny Desk" stage and filmed showcase area.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Video Infrastructure:</strong> 3× Camera positions with Belden 12G-SDI coax and Cat6A F/UTP shielded runs.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Audio Rig:</strong> Bose 802 tops + Martin Audio IC300 subwoofers.</li>
            </ul>
          </div>
        </div>

        {/* CENTRAL CONTROL ROOM */}
        <div class="infrastructure-room">
          <h3 class="content-heading heading">5. CENTRAL CONTROL ROOM</h3>
          <div class="room-specs mono">
            <span class="spec-label">DIMENSIONS:</span> 2344 × 2260 mm
          </div>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;"><strong>Signal Command:</strong> ATEM Television Studio 4K8 switcher and fanless PoE switch.</li>
              <li style="margin-bottom: 0.75rem;"><strong>Primary Signal Path:</strong> SSL XL mixing desk (Planned) and Tascam 8-track (Owned).</li>
              <li style="margin-bottom: 0.75rem;"><strong>Main Monitoring:</strong> Kii Three + BXT full-range system (Planned).</li>
              <li style="margin-bottom: 0.75rem;"><strong>Patching:</strong> 12-port BNC patch panel, 24-port Cat6A, and LC duplex fiber patch panel.</li>
            </ul>
          </div>
        </div>

        {/* BACK LINK */}
        <div class="hero-cta" style="margin-top: 3rem;">
          <a href="/studio" class="crs-button mono">
            [ ← BACK TO STUDIO ]
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
})

// BOOKING ROUTES (Structured intake forms)

// 1. Book Studio Time
app.get('/book/studio', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">CRS Studio Booking</h2>
          
          <form class="booking-form" method="post" action="/api/book/studio">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="project_type" class="form-label mono">Project Type</label>
              <select id="project_type" name="project_type" class="form-input">
                <option value="music">Music</option>
                <option value="podcast">Podcast</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="dates" class="form-label mono">Preferred dates & times *</label>
              <textarea id="dates" name="dates" required class="form-textarea" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="session_length" class="form-label mono">Estimated session length *</label>
              <input type="text" id="session_length" name="session_length" required class="form-input" placeholder="e.g., 3 hours" />
            </div>
            
            <div class="form-group">
              <label for="notes" class="form-label mono">Anything we should know? (optional)</label>
              <textarea id="notes" name="notes" class="form-textarea" rows="4"></textarea>
            </div>
            
            <button type="submit" class="crs-button mono">[ SUBMIT BOOKING REQUEST ]</button>
          </form>
          
          <p class="form-helper-text">Thanks — we'll confirm availability and next steps shortly.</p>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 2. Book Rehearsal - Location Selector
app.get('/book/rehearsal', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">CRS Rehearsal Booking</h2>
          
          <p class="section-intro" style="margin-bottom: 2rem;">
            Choose CRS location:
          </p>
          
          <div style="display: grid; gap: 1.5rem; max-width: 600px; margin: 0 auto;">
            <a href="/book/rehearsal/cowley-road" class="location-selector-card">
              <div class="location-selector-header mono">CRS — Cowley Road</div>
              <div class="location-selector-desc">Main studio location · 118 Cowley Road</div>
            </a>
            
            <a href="/book/rehearsal/cricket-road" class="location-selector-card">
              <div class="location-selector-header mono">CRS — Cricket Road</div>
              <div class="location-selector-desc">(Partner Studio) · Cricket Road, Oxford</div>
            </a>
          </div>
          
          <p class="section-intro" style="margin-top: 2rem; font-size: 0.875rem; font-style: italic;">
            Each location has its own room and availability.
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 2a. Book Rehearsal - Cowley Road
app.get('/book/rehearsal/cowley-road', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <p style="margin-bottom: 1rem;">
            <a href="/book/rehearsal" style="color: var(--mustard); text-decoration: none;">← Back to location selection</a>
          </p>
          
          <h2 class="section-title heading">CRS Rehearsal · Cowley Road</h2>
          
          <form class="booking-form" method="post" action="/api/book/rehearsal/cowley-road">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="band_name" class="form-label mono">Band / project name</label>
              <input type="text" id="band_name" name="band_name" class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="dates" class="form-label mono">Preferred dates & times *</label>
              <textarea id="dates" name="dates" required class="form-textarea" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="duration" class="form-label mono">Rehearsal length *</label>
              <input type="text" id="duration" name="duration" required class="form-input" placeholder="e.g., 2 hours" />
            </div>
            
            <div class="form-group">
              <label for="needs" class="form-label mono">Any specific needs? (optional)</label>
              <textarea id="needs" name="needs" class="form-textarea" rows="4"></textarea>
            </div>
            
            <button type="submit" class="crs-button mono">[ SUBMIT BOOKING REQUEST ]</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 2b. Book Rehearsal - Cricket Road
app.get('/book/rehearsal/cricket-road', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <p style="margin-bottom: 1rem;">
            <a href="/book/rehearsal" style="color: var(--mustard); text-decoration: none;">← Back to location selection</a>
          </p>
          
          <h2 class="section-title heading">CRS Rehearsal · Cricket Road</h2>
          <p class="section-intro" style="margin-bottom: 2rem; font-style: italic;">
            Partner Studio · Cricket Road, Oxford
          </p>
          
          <form class="booking-form" method="post" action="/api/book/rehearsal/cricket-road">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="band_name" class="form-label mono">Band / project name</label>
              <input type="text" id="band_name" name="band_name" class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="dates" class="form-label mono">Preferred dates & times *</label>
              <textarea id="dates" name="dates" required class="form-textarea" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="duration" class="form-label mono">Rehearsal length *</label>
              <input type="text" id="duration" name="duration" required class="form-input" placeholder="e.g., 2 hours" />
            </div>
            
            <div class="form-group">
              <label for="needs" class="form-label mono">Any specific needs? (optional)</label>
              <textarea id="needs" name="needs" class="form-textarea" rows="4"></textarea>
            </div>
            
            <button type="submit" class="crs-button mono">[ SUBMIT BOOKING REQUEST ]</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 3. Book Music Lessons
app.get('/book/lessons', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">CRS Music Lessons</h2>
          
          <form class="booking-form" method="post" action="/api/book/lessons">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="instrument" class="form-label mono">Instrument *</label>
              <input type="text" id="instrument" name="instrument" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="experience" class="form-label mono">Experience level *</label>
              <select id="experience" name="experience" required class="form-input">
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="availability" class="form-label mono">General availability *</label>
              <textarea id="availability" name="availability" required class="form-textarea" rows="3" placeholder="e.g., Weekday evenings, Saturday mornings"></textarea>
            </div>
            
            <div class="form-group">
              <label for="goals" class="form-label mono">Goals or notes (optional)</label>
              <textarea id="goals" name="goals" class="form-textarea" rows="4"></textarea>
            </div>
            
            <button type="submit" class="crs-button mono">[ SUBMIT ENQUIRY ]</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 4. Book Mixdown Slot
app.get('/book/mixdown', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">CRS Mixdown Service</h2>
          
          <form class="booking-form" method="post" action="/api/book/mixdown">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="track_count" class="form-label mono">Number of tracks *</label>
              <input type="number" id="track_count" name="track_count" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="reference" class="form-label mono">Reference notes *</label>
              <textarea id="reference" name="reference" required class="form-textarea" rows="4" placeholder="What are you looking for in the mix?"></textarea>
            </div>
            
            <div class="form-group">
              <label for="file_link" class="form-label mono">Upload files or link</label>
              <input type="url" id="file_link" name="file_link" class="form-input" placeholder="e.g., Google Drive, Dropbox link" />
            </div>
            
            <p class="form-helper-text">We'll review and confirm timing before starting work.</p>
            
            <button type="submit" class="crs-button mono">[ SUBMIT REQUEST ]</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 5. Book Tape Services
app.get('/book/tape', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">CRS Tape Services</h2>
          
          <form class="booking-form" method="post" action="/api/book/tape">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="tape_format" class="form-label mono">Tape format *</label>
              <input type="text" id="tape_format" name="tape_format" required class="form-input" placeholder="e.g., 1/4 inch reel-to-reel, cassette" />
            </div>
            
            <div class="form-group">
              <label for="reel_count" class="form-label mono">Number of reels *</label>
              <input type="number" id="reel_count" name="reel_count" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="service" class="form-label mono">Service required *</label>
              <select id="service" name="service" required class="form-input">
                <option value="">Select service</option>
                <option value="transfer">Transfer</option>
                <option value="clean">Clean</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="notes" class="form-label mono">Notes</label>
              <textarea id="notes" name="notes" class="form-textarea" rows="4"></textarea>
            </div>
            
            <button type="submit" class="crs-button mono">[ SUBMIT REQUEST ]</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 6. Book Equipment Hire
app.get('/book/hire', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">CRS Equipment Hire</h2>
          
          <form class="booking-form" method="post" action="/api/book/hire">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="equipment" class="form-label mono">Equipment needed *</label>
              <textarea id="equipment" name="equipment" required class="form-textarea" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="dates" class="form-label mono">Dates required *</label>
              <input type="text" id="dates" name="dates" required class="form-input" placeholder="e.g., 15-17 March" />
            </div>
            
            <div class="form-group">
              <label for="event" class="form-label mono">Event / use *</label>
              <input type="text" id="event" name="event" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="location" class="form-label mono">Location *</label>
              <input type="text" id="location" name="location" required class="form-input" />
            </div>
            
            <button type="submit" class="crs-button mono">[ SUBMIT ENQUIRY ]</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
})

// REPAIRS STATUS PAGE (Gated - OFF by default)
app.get('/repairs/status', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">Repairs & Technical Bench</h2>
          
          {/* STATUS LINE - PROMINENT */}
          <div class="repairs-status-banner">
            <span class="mono">⚠️ Repairs are temporarily unavailable</span>
          </div>
          
          {/* BODY COPY */}
          <div class="content-text" style="margin: 2rem 0;">
            <p>
              We're currently not taking on new repair work while we focus on other projects.
            </p>
            <p style="margin-top: 1rem;">
              Repairs will reopen in due course. If you'd like to be notified when bookings resume, leave your details below.
            </p>
          </div>
          
          {/* WAITLIST FORM */}
          <h3 class="content-heading mono" style="margin-top: 3rem;">Notify me when repairs reopen</h3>
          
          <form class="booking-form" method="post" action="/api/repairs/waitlist">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="equipment_type" class="form-label mono">Equipment type (optional)</label>
              <input type="text" id="equipment_type" name="equipment_type" class="form-input" />
            </div>
            
            <button type="submit" class="crs-button mono">[ NOTIFY ME ]</button>
          </form>
          
          <p class="form-helper-text">Thanks — we'll let you know when repairs reopen.</p>
        </div>
      </section>
      <Footer />
    </>
  )
})

// 7. Book Repairs
app.get('/book/repairs', (c) => {
  return c.render(
    <>
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h2 class="section-title heading">Book Repairs</h2>
          
          <form class="booking-form" method="post" action="/api/book/repairs">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="equipment_type" class="form-label mono">Equipment type *</label>
              <input type="text" id="equipment_type" name="equipment_type" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="issue" class="form-label mono">Describe the issue *</label>
              <textarea id="issue" name="issue" required class="form-textarea" rows="5"></textarea>
            </div>
            
            <div class="form-group">
              <label for="photo_link" class="form-label mono">Upload photos (optional)</label>
              <input type="url" id="photo_link" name="photo_link" class="form-input" placeholder="Link to photos" />
            </div>
            
            <div class="form-group">
              <label for="urgent" class="form-label mono">Is this time-critical? (optional)</label>
              <select id="urgent" name="urgent" class="form-input">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            
            <p class="form-helper-text">Diagnosis first. Quote follows.</p>
            
            <button type="submit" class="crs-button mono">[ SUBMIT REPAIR REQUEST ]</button>
          </form>
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
            Engineer-led live sound, installations, and technical support for community venues, cultural events, and public gatherings.
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

        {/* TECHNICAL OPERATIONS */}
        <div class="content-block">
          <h3 class="content-heading mono">TECHNICAL OPERATIONS</h3>
          <div class="content-text">
            <p style="margin-bottom: 1rem;">
              CRS provides ongoing technical management and AV support for external venues.
            </p>
            <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">
              Current supported sites:
            </p>
            <ul style="list-style: none; padding: 0; font-size: 0.875rem; color: rgba(245, 245, 245, 0.6);">
              <li style="margin-bottom: 0.25rem;">– Bossaphonik</li>
              <li style="margin-bottom: 0.25rem;">– The King's Centre</li>
              <li style="margin-bottom: 0.25rem;">– Cowley Workers' Club</li>
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
          
          {/* STATUS NOTE */}
          <div class="repairs-status-banner" style="margin-top: 1.5rem;">
            <span class="mono">
              ⚠️ Repairs currently paused · 
              <a href="/repairs/status" style="color: var(--mustard); text-decoration: underline; margin-left: 0.5rem;">
                View status
              </a>
            </span>
          </div>
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
app.get('/workshop-cafe', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Workshop Café · Oxford | Public Café & Community Venue</title>
        <meta name="description" content="Workshop Café — public café, workspace, and community venue at 118 Cowley Road, Oxford. Part of Cowley Road Studios. Events, talks, workshops, and open workspace." />
        <link rel="icon" type="image/png" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-favicon-stamp.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <link href="/static/clean.css" rel="stylesheet" />
      </head>
      <body>
        <Header />

        {/* CAFÉ SIGNAGE HERO - Above the fold */}
        <section class="crs-section cafe-heartbeat" style="padding: 0; max-width: 1400px; margin: 0 auto;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/Workshop_Cafe_CTA_Primary.png" 
            alt="Workshop Café — 118 Cowley Road"
            style="width: 100%; height: auto; display: block;"
            loading="eager"
          />
        </section>

        {/* WHAT'S ON - Live feed */}
        <section class="crs-section section-dark">
          <div class="section-header">
            <h2 class="section-title heading">WHAT'S ON AT WORKSHOP CAFÉ</h2>
          </div>

          <div id="workshop-cafe-events" style="margin-top: 2rem;">
            <p style="font-size: 0.875rem; font-style: italic; color: rgba(245, 245, 245, 0.7);">Loading events...</p>
          </div>
          
          <script dangerouslySetInnerHTML={{__html: `
            fetch('/events.json')
              .then(res => res.json())
              .then(data => {
                const container = document.getElementById('workshop-cafe-events');
                if (!container) return;
                
                if (!data.events || data.events.length === 0) {
                  container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">No upcoming events currently scheduled.</p>';
                  return;
                }
                
                const eventsToShow = data.events.slice(0, 5);
                
                container.innerHTML = eventsToShow.map(event => {
                  const date = new Date(event.start);
                  const dateStr = date.toLocaleDateString('en-GB', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short'
                  });
                  const timeStr = event.start.includes('T') ? date.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : '';
                  
                  return \`
                    <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.25rem; margin-bottom: 1.25rem;">
                      <h4 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.03em;">\${event.title}</h4>
                      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(245, 245, 245, 0.6); margin-bottom: 0.5rem;">\${dateStr}\${timeStr ? ' · ' + timeStr : ''}</p>
                      <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">\${event.description.substring(0, 120)}\${event.description.length > 120 ? '...' : ''}</p>
                    </div>
                  \`;
                }).join('');
              })
              .catch(err => {
                const container = document.getElementById('workshop-cafe-events');
                if (container) {
                  container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">Unable to load events.</p>';
                }
              });
          `}} />
        </section>

        {/* RESOURCE ALLOCATION RATES */}
        <section class="crs-section cafe-heartbeat">
          <div class="section-header">
            <h2 class="section-title cafe-title">RESOURCE ALLOCATION RATES</h2>
            <p class="section-intro cafe-intro">
              118 Cowley Road — Multi-use infrastructure
            </p>
          </div>

          <div style="max-width: 900px; margin: 0 auto;">
            {/* Rate Card Grid */}
            <div style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
              
              {/* Full Venue Hire */}
              <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
                  <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin: 0;">FULL VENUE HIRE</h3>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 700; color: rgba(245, 245, 245, 0.9);">£50 per hour</span>
                </div>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.8); margin: 0;">
                  Capacity: 40–60 people · Includes PA system & projection
                </p>
              </div>

              {/* Meeting Table */}
              <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
                  <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin: 0;">MEETING TABLE</h3>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 700; color: rgba(245, 245, 245, 0.9);">£25 per half-day</span>
                </div>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.8); margin: 0;">
                  Workspace with high-speed connectivity
                </p>
              </div>

              {/* Community Event */}
              <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
                  <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin: 0;">COMMUNITY EVENT</h3>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 700; color: rgba(245, 245, 245, 0.9);">£30 (subsidized)</span>
                </div>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.8); margin: 0;">
                  For grassroots/non-profit cultural activity
                </p>
              </div>
            </div>

            {/* Access Policy */}
            <div style="background: rgba(216, 162, 0, 0.1); border: 1px solid var(--mustard); padding: 1.5rem; text-align: center;">
              <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
                [ ACCESS POLICY ]
              </p>
              <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.9); margin: 0;">
                Priority allocation granted to local grassroots initiatives. All commercial hire directly funds the CRS Creative Infrastructure.
              </p>
            </div>

            {/* Booking CTA */}
            <div style="margin-top: 2rem; text-align: center;">
              <a href="/book?service=venue" class="crs-button mono">[ BOOK SPACE ]</a>
            </div>
          </div>
        </section>

        {/* SPACE USE - Functional, not promotional */}
        <section class="crs-section cafe-heartbeat">
          <div class="section-header">
            <h2 class="section-title cafe-title">SPACE USE</h2>
          </div>

          <div style="max-width: 600px; margin: 0 auto;">
            <ul style="list-style: none; padding: 0; font-size: 0.9375rem; line-height: 2; color: rgba(245, 245, 245, 0.9);">
              <li>→ Open workspace</li>
              <li>→ Community events</li>
              <li>→ Talks, screenings, open mics</li>
              <li>→ Private hire (small-scale)</li>
            </ul>
          </div>
        </section>

        {/* CRS ROUTING PANEL - Authority handoff */}
        <section class="crs-section section-dark">
          <div style="max-width: 700px; margin: 0 auto; text-align: center; padding: 2rem 1rem;">
            <p style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 245, 0.9); margin-bottom: 1.5rem;">
              Workshop Café operates as the public-facing space of CRS.
            </p>
            <p style="font-size: 0.9375rem; color: rgba(245, 245, 245, 0.7); margin-bottom: 2rem;">
              For venue hire, technical support, or bookings:
            </p>
            <a href="/book" class="crs-button mono">[ VIEW CRS SERVICES ]</a>
          </div>
        </section>

        <Footer />
      </body>
    </html>
  )
})

app.get('/cafe', (c) => {
  return c.render(
    <>
      <Header />

      {/* CAFÉ HERO - Full-width Nettle Green */}
      <section class="crs-section cafe-heartbeat" style="min-height: 50vh; display: flex; flex-direction: column; justify-content: center;">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h1 class="section-title" style="font-family: 'Courier New', 'Courier', monospace; font-size: clamp(2rem, 4vw, 3rem); color: var(--mustard); margin-bottom: 1rem; font-weight: 400; letter-spacing: 0.02em;">
            WORKSHOP CAFÉ
          </h1>
          <p class="section-intro" style="font-size: 1.125rem; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            Coffee, workspace, events, and repairs — the human side of the technical chassis.
          </p>
        </div>
      </section>

      {/* PURPOSE ROW */}
      <section class="crs-section cafe-heartbeat" style="border-top: 2px solid var(--mustard); padding-top: 2rem; padding-bottom: 2rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto; text-align: center;">
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; margin-bottom: 0.5rem;">COFFEE</div>
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8); line-height: 1.5;">Specialty coffee & matcha service</p>
          </div>
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; margin-bottom: 0.5rem;">WORKSPACE</div>
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8); line-height: 1.5;">Hot-desk & community co-working</p>
          </div>
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; margin-bottom: 0.5rem;">EVENTS</div>
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8); line-height: 1.5;">Talks, workshops, live performance</p>
          </div>
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; margin-bottom: 0.5rem;">REPAIRS</div>
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.8); line-height: 1.5;">Workshop & technical support</p>
          </div>
        </div>
      </section>

      {/* WHAT'S ON */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">WHAT'S ON</h2>
          <p class="section-intro">
            Upcoming events, workshops, and sessions at Workshop Café.
          </p>
        </div>

        <div id="events-feed" style="margin-top: 2rem;">
          <p style="font-size: 0.875rem; font-style: italic; color: rgba(245, 245, 245, 0.7);">Loading events...</p>
        </div>
        
        <script dangerouslySetInnerHTML={{__html: `
          // Load events from API
          fetch('/events.json')
            .then(res => res.json())
            .then(data => {
              const container = document.getElementById('events-feed');
              if (!container) return;
              
              if (!data.events || data.events.length === 0) {
                container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">No upcoming events — the space is available to book.</p>';
                return;
              }
              
              const eventsToShow = data.events.slice(0, 10);
              
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
                  \`<a href="\${event.bookingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background: var(--mustard); color: #000; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">→ BOOK</a>\` : '';
                
                return \`
                  <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem; margin-bottom: 1.5rem;">
                    <h4 style="font-family: 'Archivo Black', sans-serif; font-size: 1rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; margin-bottom: 0.5rem;">\${event.title}</h4>
                    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(245, 245, 245, 0.7); margin-bottom: 0.75rem;">\${dateStr}\${timeStr ? ' · ' + timeStr : ''}</p>
                    <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.9);">\${event.description}</p>
                    \${bookingButton}
                  </div>
                \`;
              }).join('');
            })
            .catch(err => {
              const container = document.getElementById('events-feed');
              if (container) {
                container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">Unable to load events. Please check back later.</p>';
              }
            });
        `}} />
      </section>

      {/* VENUE HIRE */}
      <section class="crs-section cafe-heartbeat">
        <div class="section-header">
          <h2 class="section-title cafe-title">BOOK THE SPACE</h2>
          <p class="section-intro cafe-intro">
            Workshop Café is available for talks, workshops, launches, and community events.
          </p>
        </div>

        <div class="content-block">
          <h3 class="content-heading mono" style="color: var(--mustard);">WHAT THE SPACE OFFERS</h3>
          <div class="content-text" style="color: rgba(245, 245, 245, 0.9);">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Café by day, flexible venue by night</li>
              <li style="margin-bottom: 0.75rem;">→ PA system & basic AV support</li>
              <li style="margin-bottom: 0.75rem;">→ Capacity: ~40 seated / ~60 standing</li>
              <li style="margin-bottom: 0.75rem;">→ Technically supported by Cowley Road Studios</li>
            </ul>
          </div>
        </div>

        <div class="hero-cta" style="margin-top: 2rem;">
          <a href="/contact?service=venue" class="crs-button mono">[ CONTACT ]</a>
        </div>
      </section>

      <Footer />
    </>
  )
})

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
            For general enquiries only. Use the booking gateway for bookings.
          </p>
        </div>

        {/* CONTACT FORM */}
        <div class="booking-form-container">
          <h3 class="content-heading mono">SEND A MESSAGE</h3>
          
          <form class="booking-form" method="post" action="/api/contact">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input type="text" id="name" name="name" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input type="email" id="email" name="email" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label mono">Message *</label>
              <textarea id="message" name="message" required class="form-textarea" rows="6"></textarea>
            </div>
            
            <button type="submit" class="crs-button mono">[ SEND MESSAGE ]</button>
          </form>
          
          <p class="form-helper-text">Thanks — your message has been sent. We'll get back to you shortly.</p>
        </div>

        {/* CONTACT METHODS */}
        <div class="content-block" style="margin-top: 3rem;">
          <h3 class="content-heading mono">DIRECT CONTACT</h3>
          <div class="content-text mono">
            <p><strong>EMAIL:</strong> <a href="mailto:info@cowleyroadstudios.com">info@cowleyroadstudios.com</a></p>
            <p style="margin-top: 1rem;"><strong>ADDRESS:</strong> Cowley Road Studios, 118 Cowley Road, Oxford, OX4 1JE</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
})

export default app
