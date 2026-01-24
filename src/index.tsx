import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { rackDemo } from './routes/rack-demo'
import { ContactSection } from './components/ContactSection'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BuildStatusBanner } from './components/BuildStatusBanner'
import { HomePage } from './pages/Home'
import { StudioPage } from './pages/Studio'
import { AVServicesPage } from './pages/AVServices'
import { AVRepairsPage } from './pages/AVRepairs'
import { WorkshopCafePage } from './pages/WorkshopCafe'
import { CricketRoad } from './pages/CricketRoad'
import { Soundworks } from './pages/Soundworks'
import { About } from './pages/About'
import { Work } from './pages/Work'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/policies/*', serveStatic({ root: './public' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))

// Serve manifest.json directly (avoids __STATIC_CONTENT_MANIFEST issue in dev)
app.get('/manifest.json', (c) => {
  return c.json({
    "name": "Cowley Road Studios",
    "short_name": "CRS",
    "description": "Purpose-built studio and venue system supporting recording, performance, and digital creative work in Oxford",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#0A1A0F",
    "background_color": "#0A0A0A",
    "icons": [
      {
        "src": "/web-app-manifest-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/web-app-manifest-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  })
})

// API ENDPOINTS
// Contact form endpoint - sends email via Cloudflare MailChannels
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    console.log('[API] Contact form submission:', body)
    
    // Get client IP from Cloudflare header
    const clientIP = c.req.header('cf-connecting-ip') || 'Unknown'
    
    // Get Resend API key from environment
    const resendApiKey = c.env?.RESEND_API_KEY
    
    if (!resendApiKey || resendApiKey === 're_placeholder_add_real_key_after_signup') {
      console.error('[Resend] API key not configured')
      return c.json({ 
        success: false, 
        error: 'Email service not configured. Please try again later.'
      }, 500)
    }
    
    // Build email payload for Resend
    const serviceType = body.service || 'general'
    const serviceLabel = {
      'recording': 'Recording Session',
      'pod-hire': 'Pod Hire',
      'repairs': 'Equipment Repair',
      'av': 'AV Services',
      'venue': 'Venue Hire',
      'general': 'General Enquiry'
    }[serviceType] || 'General Enquiry'
    
    const emailData = {
      from: 'CRS Contact Form <noreply@cowleyroadstudios.com>',
      to: ['info@cowleyroadstudios.com'],
      subject: `[CRS ${serviceType.toUpperCase()}] ${body.subject || serviceLabel}`,
      html: `
        <div style="font-family: 'JetBrains Mono', monospace; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; color: #00ff00; border: 2px solid #333;">
          <h2 style="color: #ff6b35; margin-top: 0;">NEW CONTACT FORM SUBMISSION</h2>
          <div style="border-left: 3px solid #ff6b35; padding-left: 15px; margin: 20px 0;">
            <p><strong>Service Type:</strong> ${serviceLabel}</p>
            <p><strong>From:</strong> ${body.name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${body.email || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${body.subject || serviceLabel}</p>
          </div>
          <div style="background: #0a0a0a; padding: 15px; margin: 20px 0; border: 1px solid #333;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${body.message || 'No message provided'}</p>
          </div>
          <div style="font-size: 0.85em; color: #666; margin-top: 20px; padding-top: 15px; border-top: 1px solid #333;">
            <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
            <p><strong>IP:</strong> ${clientIP}</p>
          </div>
        </div>
      `,
      reply_to: body.email || undefined
    }
    
    // Send email via Resend
    const mailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify(emailData)
    })
    
    if (!mailResponse.ok) {
      const errorText = await mailResponse.text()
      console.error('[Resend] Failed to send email:', errorText)
      return c.json({ 
        success: false, 
        error: 'Failed to send email. Please try again later.'
      }, 500)
    }
    
    const responseData = await mailResponse.json()
    console.log('[Resend] Email sent successfully:', responseData)
    
    return c.json({ 
      success: true, 
      message: '[ SIGNAL RECEIVED ] Inquiry logged to CRS Administrative Queue. A technical representative will respond within 24 operational hours.' 
    }, 200)
  } catch (error) {
    console.error('[API] Contact form error:', error)
    return c.json({ 
      success: false, 
      error: 'Internal server error. Please try again later.'
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

// RACK DEMO ROUTE (inline CSS, zero dependencies)
app.route('/rack-demo', rackDemo)

app.use(renderer)

// SHARED COMPONENTS
const Header = () => (
  <>
    {/* MASTER RACK HEADER: 1U Rack Unit AT THE TOP */}
    <div class="rack-header-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png" 
        alt="Cowley Road Studios Master Rack" 
        class="rack-header-img"
      />
    </div>
    
    <header class="rack-header">
      {/* MOBILE MENU TOGGLE */}
      <button class="mobile-menu-toggle" aria-label="Open menu">
        <span class="hamburger-icon">☰</span>
      </button>
      
      {/* NAVIGATION */}
      <nav class="rack-header-nav">
        <a href="/studio">Studio</a>
        <span class="separator">|</span>
        <a href="/workshop-cafe">Workshop Café</a>
        <span class="separator">|</span>
        <a href="/av-services">AV</a>
        <span class="separator">|</span>
        <a href="/about">About</a>
        <span class="separator">|</span>
        <a href="/work">Work</a>
        <span class="separator">|</span>
        <a href="/contact">Contact</a>
      </nav>
      
      {/* RIGHT ZONE: Book Now (Action) */}
      <div class="rack-header-cta" style="position: relative;">
        <button 
          class="book-dropdown-trigger"
          data-dropdown-trigger
          aria-expanded="false"
          aria-controls="book-dropdown-menu"
        >
          BOOK NOW
        </button>
        <div 
          id="book-dropdown-menu"
          class="book-dropdown-menu"
          data-dropdown-menu
          role="menu"
          aria-hidden="true"
        >
          <a href="/book" role="menuitem"><span class="signal-active"></span>Studio & Rehearsal</a>
          <a href="/contact?service=av" role="menuitem">AV Services (Enquiry)</a>
          <a href="/contact?service=venue" role="menuitem">Venue Hire (Enquiry)</a>
          <a href="/contact?service=repairs" role="menuitem">Repairs (Enquiry)</a>
        </div>
      </div>
    </header>
  </>
)

const Footer = () => (
  <>
    {/* MOBILE NAVIGATION (FIXED BOTTOM) */}
    <nav class="mobile-nav mono">
      <a href="/locations">LOCATIONS</a>
      <a href="/book">BOOK</a>
      <a href="/contact">CONTACT</a>
    </nav>

    <footer class="crs-footer-technical mono">
      {/* Technical Footer: Legal-Spec Datasheet Format */}
      <div class="footer-metadata">
        
        {/* Revision Header */}
        <div class="footer-revision-header">
          <p class="footer-revision-id">CRS-SYS-FOOTER v1.2</p>
          <p class="footer-revision-date">LAST REVISED: 2026-01-21</p>
        </div>
        
        {/* Section Label */}
        <p class="footer-section-label">OPERATIONAL PARAMETERS</p>
        
        {/* Primary Entity */}
        <div class="footer-data-block">
          <p class="footer-data-line">COWLEY ROAD STUDIOS (CRS) · 118 Cowley Road, Oxford, OX4 1JE, United Kingdom</p>
          <p class="footer-data-line">COORDINATES: 51.7436 N, 1.2304 W</p>
        </div>
        
        {/* System Status */}
        <div class="footer-data-block">
          <p class="footer-data-label">STATUS</p>
          <p class="footer-data-line">Hybrid commissioning. Infrastructure operational. Build phase in progress.</p>
        </div>
        
        {/* Operating Protocol */}
        <div class="footer-data-block">
          <p class="footer-data-label">PROTOCOL</p>
          <p class="footer-data-line">No-chaos operation. Scheduled access only. Signal-managed capacity. Unallocated entry not supported.</p>
        </div>
        
        {/* Access Terms */}
        <div class="footer-data-block">
          <p class="footer-data-label">ACCESS</p>
          <p class="footer-data-line">Studio sessions: allocation-based. Dry hire: subject to clearance. Public services: within posted parameters.</p>
        </div>
        
        {/* Contact */}
        <div class="footer-data-block">
          <p class="footer-data-label">CONTACT</p>
          <p class="footer-data-line"><a href="/contact" class="footer-link">studio@cowleyroadstudios.com</a></p>
        </div>
        
        {/* System Signature */}
        <div class="footer-data-block footer-signature-block">
          <p class="footer-data-line">© 2026 CRS · POWERED BY <span class="footer-highlight">0DR0</span> ENGINEERING</p>
        </div>
        
      </div>
    </footer>

    {/* FOOTER TERMINATION PANEL: 1U Rack Unit at Bottom */}
    <div class="rack-footer-container">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20BOTTOM.png" 
        alt="Cowley Road Studios Footer Rack" 
        class="rack-footer-img"
        aria-label="Footer: OX4 Studio Network - No Chaos Policy - System Ready. Cowley Road Studios, Oxford."
      />
    </div>
  </>
)

// REDIRECTS & MISSING PAGES
app.get('/av', (c) => c.redirect('/av-services'))

// BOOKING GATEWAY
app.get('/book', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">CRS — Book</h1>
        </div>

        {/* Square Booking Widget */}
        <div class="content-block">
          <h3 class="content-heading heading">BOOK NOW</h3>
          <div class="content-text">
            <p class="mono" style="color: var(--standby-gold);">
              Band Rehearsals (Cricket Road) · Recording Sessions · Pod Hire
            </p>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-cream); opacity: 0.8;">
              Choose your service and time slot below. Cowley Road rehearsals coming soon.
            </p>
          </div>
          
          {/* Square Appointments Embed */}
          <div class="square-appointments-embed" style="margin-top: 2rem; padding: 2rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(212, 160, 23, 0.2); border-radius: 4px;">
            <script src="https://square.site/appointments/buyer/widget/5f88zzreivvg8j/L9RPJZW999RE7.js"></script>
          </div>
          
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="crs-button mono" style="font-size: 0.85rem; opacity: 0.7;">
              OPEN IN NEW TAB
            </a>
          </div>
        </div>

        {/* Service Enquiries */}
        <div class="content-block" style="margin-top: 3rem;">
          <h3 class="content-heading heading">ENQUIRIES</h3>
          <div class="content-text">
            <p style="margin-bottom: 1.5rem;">
              For AV services, venue hire, repairs, or custom projects:
            </p>
          </div>
          <div class="hero-cta">
            <a href="/contact" class="crs-button mono">
              CONTACT FORM
            </a>
          </div>
        </div>

        {/* PAYMENT TERMS (Rack Authority Panel) */}
        <div class="content-block" style="margin-top: 3rem;">
          <div class="payment-terms-panel">
            <div class="panel-header">
              <h2 class="panel-title">PAYMENT TERMS</h2>
            </div>
            
            <div class="panel-content">
              <div class="payment-rule">
                <div class="rule-label">REHEARSALS</div>
                <div class="rule-value">100% DUE AT BOOKING</div>
              </div>
              
              <div class="panel-divider"></div>
              
              <div class="payment-rule">
                <div class="rule-label">RECORDING</div>
                <div class="rule-value">50% DEPOSIT</div>
              </div>
              
              <div class="payment-rule">
                <div class="rule-label">PRODUCTION</div>
                <div class="rule-value">50% DEPOSIT</div>
              </div>
              
              <div class="panel-divider"></div>
              
              <div class="panel-note">
                <p>Rehearsal bookings are paid in full at the time of booking.</p>
                <p style="margin-top: 0.75rem;">Recording and audio production sessions require a 50% deposit to confirm the session. The remaining balance is payable on the day.</p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <Footer />
    </>
  )
})

// REHEARSAL SPACE BOOKING
app.get('/rehearsal', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <section class="rack-unit">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led green"></span>
          </div>
          <h2 class="rack-unit-title">REHEARSAL SPACE — CRICKET ROAD</h2>
        </div>
        
        <div class="rack-unit-content" style="max-width: 800px; margin: 0 auto;">
          {/* INTRO */}
          <p style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 245, 0.9); margin-bottom: 2rem;">
            Fully equipped rehearsal room at Cricket Road. Secure, private space with PA system and backline. Book by the hour.
          </p>

          {/* PRICING TABLE */}
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(212, 160, 23, 0.2); padding: 2rem; margin-bottom: 2rem;">
            <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 1.125rem; color: #E89B3C; margin-bottom: 1.5rem; letter-spacing: 0.05em;">
              PRICING
            </h3>
            
            <div style="display: grid; gap: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(0, 0, 0, 0.2); border-left: 3px solid #C8FF41;">
                <div>
                  <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 600; color: #FFFFFF;">2 HOURS</div>
                  <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); margin-top: 0.25rem;">£40</div>
                </div>
                <a href="https://square.link/u/WbJGOXN6" target="_blank" rel="noopener noreferrer" class="cta-button" style="margin: 0;">
                  BOOK NOW
                </a>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(0, 0, 0, 0.2); border-left: 3px solid #C8FF41;">
                <div>
                  <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 600; color: #FFFFFF;">3 HOURS</div>
                  <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); margin-top: 0.25rem;">£55</div>
                </div>
                <a href="https://square.link/u/w0KnUxwQ" target="_blank" rel="noopener noreferrer" class="cta-button" style="margin: 0;">
                  BOOK NOW
                </a>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(0, 0, 0, 0.2); border-left: 3px solid #C8FF41;">
                <div>
                  <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 600; color: #FFFFFF;">4 HOURS</div>
                  <div style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); margin-top: 0.25rem;">£60</div>
                </div>
                <a href="https://square.link/u/RDFyPTNa" target="_blank" rel="noopener noreferrer" class="cta-button" style="margin: 0;">
                  BOOK NOW
                </a>
              </div>
            </div>

            <p style="font-size: 0.813rem; color: rgba(245, 245, 245, 0.6); margin-top: 1.5rem; font-family: 'JetBrains Mono', monospace;">
              Payment in full at time of booking. Exact availability shown in booking calendar.
            </p>
          </div>

          {/* WHAT'S INCLUDED */}
          <div style="margin-bottom: 2rem;">
            <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 1.125rem; color: #E89B3C; margin-bottom: 1rem; letter-spacing: 0.05em;">
              WHAT'S INCLUDED
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.938rem; line-height: 2; color: rgba(245, 245, 245, 0.85);">
              <li style="padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #C8FF41;">▸</span>
                PA system
              </li>
              <li style="padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #C8FF41;">▸</span>
                Backline (amps, basic kit)
              </li>
              <li style="padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #C8FF41;">▸</span>
                Secure, private space
              </li>
              <li style="padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #C8FF41;">▸</span>
                Up to 8 people
              </li>
            </ul>
          </div>

          {/* LOCATION */}
          <div style="padding-top: 1.5rem; border-top: 1px solid rgba(245, 245, 245, 0.1);">
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); line-height: 1.6;">
              <strong style="color: #E89B3C;">Location:</strong> Cricket Road, Oxford<br />
              <strong style="color: #E89B3C;">Availability:</strong> Evenings + weekends (see booking calendar)<br />
              <strong style="color: #E89B3C;">Questions:</strong> <a href="/contact" style="color: #C8FF41; text-decoration: none;">All enquiries via contact form</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
})

// VENUE BOOKING REDIRECT
app.get('/book/venue', (c) => {
  return c.redirect('/contact?service=venue')
})

// LOCATIONS SELECTOR
app.get('/locations', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">CRS LOCATIONS</h1>
        </div>

        <div style="max-width: 700px; margin: 0 auto; display: grid; gap: 1.5rem;">
          <a href="/crs-cowley-road" class="crs-button mono" style="display: block; padding: 1.5rem; text-align: center;">
            CRS — COWLEY ROAD
          </a>
          <a href="/crs-cricket-road" class="crs-button mono" style="display: block; padding: 1.5rem; text-align: center;">
            CRS — CRICKET ROAD
          </a>
        </div>
      </section>
      <Footer />
    </>
  )
})

// CRS — COWLEY ROAD
app.get('/crs-cowley-road', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">CRS — COWLEY ROAD</h1>
        </div>

        <div class="content-block" style="max-width: 700px; margin: 0 auto;">
          {/* ADDRESS */}
          <div style="margin-bottom: 2rem;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); line-height: 1.6;">
              118 Cowley Road<br />
              Oxford<br />
              OX4 1JE
            </p>
          </div>

          {/* WHAT OPERATES HERE */}
          <div style="margin-bottom: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem; font-size: 0.9375rem;">What operates here:</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">– Recording studio</li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">– Production rooms</li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">– Workshop Café</li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">– Equipment repair</li>
            </ul>
          </div>

          {/* BOOKING CTA */}
          <div class="hero-cta">
            <a href="/book" class="crs-button mono">BOOK CRS — COWLEY ROAD</a>
          </div>

          {/* ACCESS / HOURS */}
          <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(245, 245, 245, 0.1);">
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); line-height: 1.6;">
              <strong>Access:</strong> By booking only<br />
              <strong>Contact:</strong> <a href="/contact" style="color: var(--mustard);">All enquiries via contact form</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
})

// CRS — CRICKET ROAD
app.get('/crs-cricket-road', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">CRS — CRICKET ROAD</h1>
        </div>

        <div class="content-block" style="max-width: 700px; margin: 0 auto;">
          {/* ADDRESS */}
          <div style="margin-bottom: 2rem;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); line-height: 1.6;">
              Cricket Road<br />
              Oxford
            </p>
          </div>

          {/* WHAT OPERATES HERE */}
          <div style="margin-bottom: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem; font-size: 0.9375rem;">What operates here:</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">– Rehearsal space</li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">– Live room</li>
            </ul>
          </div>

          {/* BOOKING CTA */}
          <div class="hero-cta">
            <a href="/book" class="crs-button mono">BOOK CRS — CRICKET ROAD</a>
          </div>

          {/* ACCESS / HOURS */}
          <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(245, 245, 245, 0.1);">
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); line-height: 1.6;">
              <strong>Access:</strong> By booking only<br />
              <strong>Contact:</strong> <a href="/contact" style="color: var(--mustard);">All enquiries via contact form</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
})

// HOME
app.get('/', (c) => {
  return c.render(
    <HomePage />,
    {
      title: 'Cowley Road Studios Oxford | Recording Studio, Rehearsal Space & AV Services',
      description: 'Professional recording studio, rehearsal space, and live AV services in Oxford. Multi-room tracking, vintage gear, and community-focused pricing. Formerly Soundworks Oxford.',
      keywords: 'recording studio oxford, rehearsal space oxford, live sound oxford, av services oxford, cowley road studios, soundworks oxford, music production oxford, podcast studio oxford, band rehearsal oxford, audio repair oxford, workshop cafe oxford, cricket road studio'
    }
  )
})

// STUDIO
app.get('/studio', (c) => {
  return c.render(
    <StudioPage />,
    {
      title: 'Recording Studio Oxford | Cowley Road Studios',
      description: 'Purpose-built recording and production rooms in Oxford. Hybrid analogue/digital workflows, engineer-maintained systems. Book studio sessions now.',
      keywords: 'recording studio oxford, music studio oxford, production studio oxford, recording sessions oxford'
    }
  )
})
// INFRASTRUCTURE SNAPSHOTT (SINGULAR STRUCTURAL CENTRE OF GRAVITY)
app.get('/studio/infrastructure', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />

      <section class="crs-section section-dark" style="padding-top: 2rem; padding-bottom: 4rem;">
        <div class="section-header" style="margin-bottom: 2rem;">
          <h1 class="section-title heading" style="font-size: 1.75rem; margin-bottom: 0.5rem;">CRS — Studio Infrastructure</h1>
        </div>

        {/* CONTROL PANEL MOTIF */}
        <div style="display: flex; justify-content: center; margin: 0 0 3rem; opacity: 0.85;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-control-panel-studios.png"
            alt="CRS Control Panel"
            style="max-width: 280px; height: auto; display: block;"
            loading="lazy"
          />
        </div>

        {/* INFRASTRUCTURE OVERVIEW PANEL (Singular Structural Anchor) */}
        <div style="background: #0A0A0A; border: 2px solid var(--mustard); padding: 2rem; margin-bottom: 3rem; max-width: 900px; margin-left: auto; margin-right: auto;">
          <h3 class="mono" style="font-size: 0.75rem; letter-spacing: 0.2em; color: var(--mustard); margin-bottom: 1.5rem; font-weight: 800; border-bottom: 1px solid rgba(232, 155, 60, 0.3); padding-bottom: 0.75rem;">
            /// INFRASTRUCTURE OVERVIEW
          </h3>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8125rem; line-height: 2; letter-spacing: 0.02em;">
            <p style="margin-bottom: 0.75rem;"><span style="color: var(--mustard); font-weight: 700;">STUDIO SYSTEMS:</span> <span style="opacity: 0.85;">CONTROL / LIVE ROOMS / NETWORKED AUDIO</span></p>
            <p style="margin-bottom: 0.75rem;"><span style="color: var(--mustard); font-weight: 700;">PUBLIC INTERFACE:</span> <span style="opacity: 0.85;">CAFÉ / VENUE / FRONT-OF-HOUSE</span></p>
            <p style="margin-bottom: 0.75rem;"><span style="color: var(--mustard); font-weight: 700;">TECHNICAL OPS:</span> <span style="opacity: 0.85;">AV DEPLOYMENT / REPAIR / DIAGNOSTICS</span></p>
          </div>
          <p class="mono" style="font-size: 0.6875rem; color: var(--mustard); opacity: 0.6; margin-top: 1.5rem; letter-spacing: 0.1em;">
            COORDINATED FROM: 118 COWLEY ROAD
          </p>
        </div>

        {/* FUNCTIONAL CAPABILITY MATRIX */}
        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 2rem; margin-bottom: 2rem;">
          <h3 class="mono" style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--mustard); margin-bottom: 1.5rem; font-weight: 800;">
            01 / SIGNAL COMMAND & ROUTING
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">CENTRAL CONTROL</p>
              <p style="opacity: 0.85;">ATEM Television Studio 4K8 switcher · SSL XL mixing desk (Planned) · Tascam 8-track (Owned) · Kii Three + BXT monitoring (Planned)</p>
            </div>
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">PATCHING & CONNECTIVITY</p>
              <p style="opacity: 0.85;">12-port BNC patch · 24-port Cat6A · LC duplex fiber · Dante audio network · NDI video network</p>
            </div>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 2rem; margin-bottom: 2rem;">
          <h3 class="mono" style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--crs-green); margin-bottom: 1.5rem; font-weight: 800;">
            02 / ACOUSTIC TRACKING ENVIRONMENTS
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">LIVE ROOM (3960 × 2816 mm)</p>
              <p style="opacity: 0.85;">Ensemble tracking · Drum room · Genelec nearfield monitoring · Dante/NDI connectivity · Piano + drum kit inventory</p>
            </div>
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">BIG BOOTH (5300 × 1480 mm)</p>
              <p style="opacity: 0.85;">Double booth · Larger groups · Brass sections · Dante/SDI expansion</p>
            </div>
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">VOCAL PODS (×2 @ 1480 × 1440 mm)</p>
              <p style="opacity: 0.85;">Isolated precision tracking · Genelec 8010A pairs · SSL 12 USB per pod</p>
            </div>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid rgba(212, 160, 23, 0.8); padding: 2rem; margin-bottom: 2rem;">
          <h3 class="mono" style="font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(212, 160, 23, 0.9); margin-bottom: 1.5rem; font-weight: 800;">
            03 / PUBLIC-FACING CAPTURE & BROADCAST
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">WORKSHOP CAFÉ STAGE</p>
              <p style="opacity: 0.85;">Tiny Desk format · 3× camera positions · Belden 12G-SDI + Cat6A F/UTP · Bose 802 tops + Martin Audio IC300 subs</p>
            </div>
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">SHARED VIDEO INFRASTRUCTURE</p>
              <p style="opacity: 0.85;">Multi-room routing · NDI protocol · Scalable to venue events + studio sessions</p>
            </div>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid rgba(196, 30, 58, 0.8); padding: 2rem;">
          <h3 class="mono" style="font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(196, 30, 58, 0.9); margin-bottom: 1.5rem; font-weight: 800;">
            04 / TECHNICAL SUPPORT & FIELD DEPLOYMENT
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">REPAIR BENCH (ODRO)</p>
              <p style="opacity: 0.85;">Mixers · Interfaces · Amplifiers · Speakers · Power/signal diagnostics</p>
            </div>
            <div>
              <p class="mono" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.8125rem;">LIVE EVENT TECH</p>
              <p style="opacity: 0.85;">Field deployment · PA systems · Monitoring · Engineer support · Event coordination</p>
            </div>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT BOOKING REQUEST</button>
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
      <BuildStatusBanner />
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT BOOKING REQUEST</button>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT BOOKING REQUEST</button>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT ENQUIRY</button>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT REQUEST</button>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT REQUEST</button>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT ENQUIRY</button>
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
      <BuildStatusBanner />
      <Header />
      <section class="crs-section section-dark">
        <div class="booking-form-container">
          <h1 class="section-title heading">CRS — Repair Status</h1>
          
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
            
            <button type="submit" class="crs-button mono">NOTIFY ME</button>
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
      <BuildStatusBanner />
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
            
            <button type="submit" class="crs-button mono">SUBMIT REPAIR REQUEST</button>
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
      <AVServicesPage />,
    {
      title: 'AV Services Oxford | Cowley Road Studios',
      description: 'Professional audio-visual services including live sound, installations, repairs, and technical support for venues and events in Oxford.',
      keywords: 'av services oxford, live sound oxford, sound engineer oxford, event av oxford, pa hire oxford, audio visual oxford'
    }
  )
})

// REPAIRS
app.get('/av-services/repairs', (c) => {
  return c.render(
      <AVRepairsPage />,
    {
      title: 'Live Sound & AV Services Oxford | Cowley Road Studios',
      description: 'Engineer-led live sound, installations, and technical support for venues and events in Oxford. Professional AV infrastructure for community events.',
      keywords: 'live sound oxford, av services oxford, sound engineer oxford, event av oxford, pa hire oxford'
    }
  )
})

// WORKSHOP CAFÉ (VENUE)
app.get('/workshop-cafe', (c) => {
  return c.render(
      <WorkshopCafePage />,
    {
      title: 'Workshop Café Oxford | Community Space & Venue Hire',
      description: 'Café, workspace, and small venue in East Oxford. Available for private hire and public programming. Part of Cowley Road Studios.',
      keywords: 'cafe oxford, workshop cafe oxford, venue hire oxford, community space oxford, east oxford cafe'
    }
  )
})

// ============================================================================
// CRICKET ROAD STUDIO PAGE
// ============================================================================
app.get('/cricket-road', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <CricketRoad />
      <Footer />
    </>,
    {
      title: 'Cricket Road Studio Oxford | Rehearsal Space & Live Capture',
      description: 'Fully operational rehearsal and live capture facility in Oxford. 6m × 4m live room with backline, PA, and drum kit. Bookable now.',
      keywords: 'rehearsal space oxford, band rehearsal oxford, live room oxford, cricket road studio, recording oxford'
    }
  )
})

// ============================================================================
// SOUNDWORKS LEGACY PAGE
// ============================================================================
app.get('/soundworks', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <Soundworks />
      <Footer />
    </>,
    {
      title: 'Soundworks Oxford is now Cowley Road Studios | Recording Studio Oxford',
      description: 'Soundworks Oxford (1999–2024) is now Cowley Road Studios. Same commitment to professional recording, rehearsal, and AV services in Oxford.',
      keywords: 'soundworks oxford, cowley road studios, recording studio oxford, soundworks oxford history, oxford recording studio'
    }
  )
})

// ============================================================================
// ABOUT PAGE
// ============================================================================
// ============================================================================
// WORK PAGE
// ============================================================================

app.get('/cafe', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
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
          <a href="/contact?service=venue" class="crs-button mono">CONTACT</a>
        </div>
      </section>

      <Footer />
    </>,
    {
      title: 'Contact Cowley Road Studios | Recording Studio Oxford',
      description: 'Get in touch about studio sessions, rehearsal space, AV services, or venue hire. Located in East Oxford. Email: studio@cowleyroadstudios.com',
      keywords: 'contact crs, cowley road studios contact, recording studio oxford contact, book studio oxford'
    }
  )
})
// VENUE REDIRECT (removed - not ready for public launch)
app.get("/venue", (c) => c.redirect("/contact?service=venue"))

// ABOUT
app.get('/about', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <About />
      <Footer />
    </>,
    {
      title: 'About Cowley Road Studios | Recording Studio Oxford',
      description: 'Learn about CRS: purpose-built recording studio and AV infrastructure in Oxford. No-chaos policy, engineer-maintained systems, community-focused.',
      keywords: 'about crs, cowley road studios oxford, recording studio oxford history, music studio oxford'
    }
  )
})
// WORK
app.get('/work', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <Work />
      <Footer />
    </>,
    {
      title: 'Work & Portfolio | Cowley Road Studios Oxford',
      description: 'View completed projects and work from Cowley Road Studios. Recording sessions, AV deployments, and community projects in Oxford.',
      keywords: 'crs portfolio, recording studio work oxford, music production oxford, studio projects'
    }
  )
})
// CONTACT
app.get('/contact', (c) => {
  const serviceType = c.req.query('service') || 'general'
  
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <ContactSection serviceType={serviceType} />
      <Footer />
    </>,
    {
      title: 'Contact Cowley Road Studios | Recording Studio Oxford',
      description: 'Get in touch about studio sessions, rehearsal space, AV services, or venue hire. Located in East Oxford. Email: studio@cowleyroadstudios.com',
      keywords: 'contact crs, cowley road studios contact, recording studio oxford contact, book studio oxford'
    }
  )
})
export default app
