import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

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

app.use(renderer)

// SHARED COMPONENTS
const Header = () => (
  <>
    <header class="rack-header">
      {/* MOBILE MENU TOGGLE */}
      <button class="mobile-menu-toggle" aria-label="Open menu">
        <span class="hamburger-icon">☰</span>
      </button>
      
      {/* LEFT ZONE: CRS Logo + Navigation */}
      <div class="rack-header-left">
        <a href="/" style="display: block; line-height: 0;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/1024%20BADGE%20%2B%20WORDMARK%20LOCKUP.png" 
            alt="Cowley Road Studios"
            class="crs-main-logo"
          />
        </a>
        
        <nav class="rack-nav-links">
          <a href="/studio">Studio</a>
          <span class="separator">|</span>
          <a href="/workshop-cafe">Workshop Café</a>
          <span class="separator">|</span>
          <a href="/av-services">AV</a>
        </nav>
      </div>
      
      {/* BOOK NOW DROPDOWN (RIGHT ZONE) */}
      <div class="rack-header-right" style="position: relative;">
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
          <a href="/book" role="menuitem"><span class="signal-active"></span>Book Online</a>
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

    <footer class="crs-footer mono">
      {/* CRS Banner Logo */}
      <div class="footer-logo-container">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/odro%20av/Remove_background-1768893690736.png" 
          alt="Cowley Road Studios"
          class="footer-banner-logo"
        />
      </div>
      
      {/* CRS Locations (Quiet List) */}
      <div class="footer-locations">
        <p class="footer-locations-header">CRS Locations</p>
        <p class="footer-location-item">– Cowley Road, Oxford, OX4 1JE</p>
        <p class="footer-location-item">– Cricket Road, Oxford</p>
      </div>

      {/* Contact */}
      <div class="footer-contact">
        <p>CONTACT: <a href="/contact">Use contact form</a></p>
      </div>

      {/* Build Phase Disclaimer */}
      <div class="footer-policy">
        <p class="footer-policy-header">BUILD PHASE</p>
        <p class="footer-policy-text">
          Cowley Road Studios is completing the final phase of the Cowley Road build. Band rehearsals and repairs are available now. Recording and production are available by enquiry during this phase.
        </p>
      </div>

      {/* No Chaos Policy */}
      <div class="footer-policy">
        <p class="footer-policy-header">NO CHAOS POLICY</p>
        <p class="footer-policy-text">
          CRS operates under a strict no-chaos protocol. All systems are maintained to function reliably, predictably, and without drama. Equipment is tested, signal paths are documented, and technical decisions are made based on engineering reality—not hype.
        </p>
      </div>

      {/* Footer Signature */}
      <div class="footer-signature">
        <p class="footer-credit">© 2026 CRS</p>
        <p class="footer-credit mono">
          POWERED BY <span style="color: var(--standby-gold); font-weight: 800;">0DR0</span> ENGINEERING
        </p>
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
    <>
      <Header />

      {/* SYSTEM STATUS BLOCK — BUILD PHASE LED */}
      <section class="rack-unit device-status" style="background: rgba(255, 140, 0, 0.05); border-left: 4px solid #FF8C00;">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led orange" style="animation: pulse-led 2s ease-in-out infinite;"></span>
          </div>
          <h2 class="rack-unit-title" style="color: #FF8C00;">/// SYSTEM STATUS — COWLEY ROAD BUILD</h2>
        </div>
        
        <div class="rack-unit-content">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; line-height: 1.8; color: rgba(245, 245, 245, 0.85); margin-bottom: 1.5rem;">
            <p style="margin-bottom: 0.75rem;">
              <strong style="color: #FF8C00;">STATUS:</strong> Final phase installation in progress
            </p>
            <p style="margin-bottom: 0.75rem;">
              <strong style="color: #FF8C00;">AVAILABLE NOW:</strong> Band rehearsals (Cricket Road) · Equipment repairs · AV services
            </p>
            <p style="margin-bottom: 0.75rem;">
              <strong style="color: #FF8C00;">COMING SOON:</strong> Recording sessions · Production rooms · Workshop Café public hours
            </p>
            <p style="margin-bottom: 0;">
              <strong style="color: #FF8C00;">PRE-SALE:</strong> Book studio time now at discounted rates to support the build
            </p>
          </div>
          <div style="text-align: center;">
            <a href="/studio" class="cta-button" style="border-color: #FF8C00; color: #FF8C00;">VIEW STUDIO PRE-SALE</a>
          </div>
        </div>
      </section>

      {/* UNIT 05 — BAND REHEARSALS */}
      <section class="rack-unit device-rehearsal">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led green"></span>
          </div>
          <h2 class="rack-unit-title">BAND REHEARSALS — CRICKET ROAD</h2>
        </div>
        
        <div class="rack-unit-content">
          <p style="margin-bottom: 1rem; color: rgba(245, 245, 245, 0.85);">
            Fixed-length sessions with basic PA included at Cricket Road.
          </p>
          <p style="margin-bottom: 1rem; color: rgba(245, 245, 245, 0.65); font-size: 0.9rem;">
            Cowley Road rehearsal space is nearing the end of the build phase and will be available soon.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="/book" class="cta-button cta-button-peak-red">BOOK REHEARSAL</a>
          </div>
        </div>
      </section>

      {/* STUDIO SESSIONS */}
      <section class="rack-unit device-studio">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led yellow"></span>
          </div>
          <h2 class="rack-unit-title">STUDIO SESSIONS</h2>
        </div>
        
        <div class="rack-unit-content">
          <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
            Purpose-built recording and production environments designed for reliable, repeatable results. From vocal tracking to full-band production, we provide the technical certainty you need to focus on your performance.
          </p>
          <div style="text-align: center;">
            <a href="/studio" class="cta-button">BOOK SESSION</a>
          </div>
        </div>
      </section>

      {/* AV SERVICES */}
      <section class="rack-unit device-av">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led yellow"></span>
          </div>
          <h2 class="rack-unit-title">AV SERVICES & LIVE SOUND</h2>
        </div>
        
        <div class="rack-unit-content">
          <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
            Engineer-led live sound, installations, and technical support for community venues, cultural events, and public gatherings. We provide the technical backbone for your event, so you can focus on your audience.
          </p>
          <div style="text-align: center;">
            <a href="/av-services" class="cta-button">AV SERVICES</a>
          </div>
        </div>
      </section>

      {/* WORKSHOP CAFÉ */}
      <section class="rack-unit device-cafe">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led yellow"></span>
          </div>
          <h2 class="rack-unit-title">WORKSHOP CAFÉ</h2>
        </div>
        
        <div class="rack-unit-content">
          <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
            The public-facing space of CRS — a café, workspace, and small venue supporting community events and creative activity in the heart of East Oxford. Available for private hire and public programming.
          </p>
          <div style="text-align: center;">
            <a href="/workshop-cafe" class="cta-button">HIRE THE VENUE</a>
          </div>
        </div>
      </section>

      {/* PUBLIC ACCESS */}
      <section class="rack-unit device-community">
        <div class="rack-unit-header">
          <div class="rack-unit-led">
            <span class="led orange"></span>
          </div>
          <h2 class="rack-unit-title">/// PUBLIC ACCESS & COMMUNITY</h2>
        </div>
        
        <div class="rack-unit-content">
          <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
            CRS exists to make professional-grade recording and AV infrastructure available to Oxford's grassroots scene. We offer subsidized rates, supported sessions, and training workshops for community groups, emerging artists, and non-profit organizations.
          </p>
          <div style="text-align: center;">
            <a href="/contact" class="cta-button">GET IN TOUCH</a>
          </div>
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
          <h1 class="section-title heading">CRS — Studio</h1>
        </div>

        {/* OVERVIEW */}
        {/* BUILD PHASE NOTICE */}
        <div class="content-block">
          <div style="background: rgba(255, 140, 0, 0.1); border: 2px solid #FF8C00; padding: 1rem; margin-bottom: 1.5rem;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #FF8C00; font-weight: 700;">
              Recording and production services are available by enquiry while the Cowley Road build is completed.
            </p>
          </div>
        </div>

        {/* PRE-SALE MODULE — FUND THE BUILD */}
        <div class="content-block" style="background: rgba(127, 255, 0, 0.05); border: 3px solid #39FF14; padding: 2rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <span class="led green" style="animation: pulse-led 2s ease-in-out infinite; width: 14px; height: 14px;"></span>
            <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 1.25rem; color: #39FF14; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">
              PRE-SALE: BOOK NOW · FUND THE BUILD
            </h3>
          </div>
          
          <div style="font-family: 'Inter', sans-serif; font-size: 0.938rem; line-height: 1.7; color: rgba(245, 245, 245, 0.9); margin-bottom: 2rem;">
            <p style="margin-bottom: 1rem; font-weight: 600; color: #39FF14;">
              Why book production time now?
            </p>
            <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
              <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #39FF14; font-weight: bold;">→</span>
                Lock in <strong style="color: #39FF14;">40% discounted rates</strong> for the first 12 months post-launch
              </li>
              <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #39FF14; font-weight: bold;">→</span>
                Your deposit directly funds the Cowley Road fit-out
              </li>
              <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #39FF14; font-weight: bold;">→</span>
                Priority booking access when the studio goes live
              </li>
              <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #39FF14; font-weight: bold;">→</span>
                Support Oxford's only engineer-owned recording infrastructure
              </li>
            </ul>
            
            <div style="background: rgba(0, 0, 0, 0.3); border-left: 3px solid #39FF14; padding: 1.25rem; margin-bottom: 1.5rem;">
              <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.813rem; color: rgba(245, 245, 245, 0.7); margin-bottom: 0.75rem;">
                <strong style="color: #39FF14;">STANDARD RATE (POST-LAUNCH):</strong> £500–£700 per day
              </p>
              <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.813rem; color: rgba(245, 245, 245, 0.7);">
                <strong style="color: #39FF14;">PRE-SALE RATE (LOCK IN NOW):</strong> £300–£420 per day (40% off)
              </p>
            </div>
            
            <p style="font-size: 0.875rem; font-style: italic; color: rgba(245, 245, 245, 0.7);">
              Pre-sale bookings are transferable and can be scheduled flexibly once the studio is operational. No expiry date.
            </p>
          </div>
          
          <div style="text-align: center;">
            <a href="/contact?service=recording" class="cta-button" style="background: #39FF14; color: #0A1A0F; border-color: #39FF14; font-weight: 700; padding: 1rem 2rem; font-size: 1rem;">
              BOOK PRE-SALE SESSION
            </a>
          </div>
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

        {/* CAPABILITY STATEMENT */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT WE DO</h3>
          <div class="content-text">
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.75rem;">→ Multitrack recording</li>
              <li style="margin-bottom: 0.75rem;">→ Overdubbing and layering</li>
              <li style="margin-bottom: 0.75rem;">→ Mixing and production workflows</li>
              <li style="margin-bottom: 0.75rem;">→ Professional analogue and digital systems</li>
            </ul>
            <p style="margin-top: 1.5rem; font-size: 0.9375rem; opacity: 0.85;">
              We work with a range of recording approaches — from live capture to layered production — using hybrid analogue and digital systems maintained to consistent operating standards.
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
          
          {/* Hardware Presence: Console */}
          <div class="hardware-image" style="margin-top: 2rem;">
            <img 
              src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/512crs_badge_dark%20fixed%20for%20web.png"
              alt="CRS badge"
              loading="lazy"
            />
          </div>
        </div>

        {/* CONTROL PANEL MOTIF (System Separator) */}
        <div style="display: flex; justify-content: center; margin: 3rem 0; opacity: 0.75;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-control-panel-studios.png"
            alt="CRS Control Panel"
            style="max-width: 240px; height: auto; display: block;"
            loading="lazy"
          />
        </div>

        {/* LOCATION ROUTING */}
        <div class="content-block">
          <h3 class="content-heading mono">LOCATION ROUTING</h3>
          <div class="content-text">
            <div style="background: rgba(232, 155, 60, 0.1); border: 2px solid rgba(232, 155, 60, 0.3); padding: 1.5rem; margin-bottom: 1.5rem;">
              <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--crs-gold); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">
                🟠 118 COWLEY ROAD — HQ & TECHNICAL BRAIN
              </p>
              <ul style="list-style: none; padding: 0; font-size: 0.9375rem;">
                <li style="margin-bottom: 0.5rem;">→ Recording sessions</li>
                <li style="margin-bottom: 0.5rem;">→ Mixing & production</li>
                <li style="margin-bottom: 0.5rem;">→ Podcasting & spoken word</li>
                <li style="margin-bottom: 0.5rem;">→ Booth dry hire</li>
              </ul>
            </div>
            
            <div style="background: rgba(127, 255, 0, 0.05); border: 2px solid rgba(127, 255, 0, 0.2); padding: 1.5rem;">
              <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--crs-green); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">
                🟢 CRICKET ROAD — REHEARSAL NODE
              </p>
              <ul style="list-style: none; padding: 0; font-size: 0.9375rem;">
                <li style="margin-bottom: 0.5rem;">→ Band rehearsals</li>
                <li style="margin-bottom: 0.5rem;">→ High-decibel sessions</li>
                <li style="margin-bottom: 0.5rem;">→ Equipment storage</li>
              </ul>
              <p style="margin-top: 1rem; font-size: 0.875rem; opacity: 0.8; font-style: italic;">
                Rehearsal bookings automatically routed to Cricket Road. Access protocol sent via confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* PRICING CONTEXT */}
        <div class="content-block">
          <h3 class="content-heading mono">PRICING CONTEXT</h3>
          <div class="content-text">
            <p style="margin-bottom: 1rem;">
              Recording and production work typically falls in the <strong>£400–£700 per day</strong> range, depending on scope and session type.
            </p>
            <p style="font-size: 0.9375rem; opacity: 0.85;">
              Final pricing is confirmed by enquiry while the Cowley Road build is completed.
            </p>
          </div>
        </div>

        {/* STUDIO SERVICES */}
        <div class="content-block">
          <h3 class="content-heading mono">ENQUIRE ABOUT SERVICES</h3>
          <div class="content-text">
            <p style="margin-bottom: 2rem;">
              All studio services are available by enquiry:
            </p>
            <div style="display: grid; gap: 1rem; max-width: 600px;">
              <a href="/contact?service=recording" class="crs-button mono" style="display: block; text-align: center; text-decoration: none;">
                [ RECORDING SESSIONS ]
              </a>
              <a href="/contact?service=booth-hire" class="crs-button mono" style="display: block; text-align: center; text-decoration: none;">
                [ BOOTH DRY HIRE ]
              </a>
              <a href="/contact?service=rehearsal" class="crs-button mono" style="display: block; text-align: center; text-decoration: none;">
                [ REHEARSAL BOOKING ]
              </a>
              <a href="/contact?service=other-audio" class="crs-button mono" style="display: block; text-align: center; text-decoration: none;">
                [ OTHER AUDIO SERVICES ]
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
})

// INFRASTRUCTURE SNAPSHOT (SINGULAR STRUCTURAL CENTRE OF GRAVITY)
app.get('/studio/infrastructure', (c) => {
  return c.render(
    <>
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
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">CRS — AV Services</h1>
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
          
          {/* Hardware Presence: Live Sound Equipment */}
          <div class="hardware-image" style="margin-top: 2rem;">
            <img 
              src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-control-panel-studios.png"
              alt="CRS AV control panel"
              loading="lazy"
            />
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

        {/* PRICING CONTEXT */}
        <div class="content-block">
          <h3 class="content-heading mono">PRICING CONTEXT</h3>
          <div class="content-text">
            <p style="margin-bottom: 1rem;">
              AV services are quoted per project. Typical jobs range from <strong>£250–£1,500</strong> depending on scale and equipment requirements.
            </p>
            <p style="font-size: 0.9375rem; opacity: 0.85;">
              Use the contact form to outline your event and production needs for a quote.
            </p>
          </div>
        </div>

        {/* BRIDGE TO REPAIRS */}
        <div class="content-block">
          <p class="section-intro">
            Behind every clean live setup is a deep technical bench.
          </p>
          <div class="hero-cta" style="margin-top: 1.5rem;">
            <a href="/av-services/repairs" class="crs-button mono">REPAIRS & TECHNICAL BENCH</a>
          </div>
        </div>

        {/* CTA */}
        <div class="hero-cta">
          <a href="/contact?enquiry=av" class="crs-button mono">
            [ REQUEST AV QUOTE ]
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
          <h1 class="section-title heading">CRS — Repairs</h1>
          
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
          
          {/* Hardware Presence: Repair Bench */}
          <div class="hardware-image" style="margin-top: 2rem;">
            <img 
              src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-control-panel-studios.png"
              alt="CRS repair bench"
              loading="lazy"
            />
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
          <a href="/contact?enquiry=repairs" class="crs-button mono">
            [ START REPAIR ENQUIRY ]
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
})

// WORKSHOP CAFÉ (VENUE)
app.get('/workshop-cafe', (c) => {
  return c.render(
    <>
      {/* Apply WSC mode class to body */}
      <script dangerouslySetInnerHTML={{__html: `document.body.classList.add('wsc-mode');`}} />
      
      <Header />

      {/* VENUE WELCOME RACK */}
      <section class="rack-unit led-orange">
        <div class="rack-screw"></div>
        <div class="rack-screw"></div>
        <div class="rack-screw"></div>
        <div class="rack-screw"></div>
        
        <h2 class="rack-unit-title">Workshop Café — Venue</h2>
        
        {/* STATUS LINE - NON-NEGOTIABLE */}
        <div style="background: rgba(255, 140, 0, 0.1); border: 2px solid #FF8C00; padding: 1rem; margin-bottom: 1.5rem;">
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.938rem; font-weight: 700; color: #FF8C00; margin-bottom: 0.5rem;">
            Workshop Café is not currently open for daily café service.
          </p>
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.85);">
            The space is available by enquiry for private or community use during the build phase.
          </p>
        </div>
        
        <p style="margin-bottom: 1.5rem;">
          Bookable public-facing venue within CRS for small events and private hire.
        </p>
        
        <div class="wsc-capacity-spec">
          <div class="wsc-capacity-item">
            Capacity: <strong>25 seated</strong>
          </div>
          <div class="wsc-capacity-item">
            <strong>up to 60 standing</strong>
          </div>
        </div>
        
        <div class="wsc-use-case-grid">
          <div class="wsc-use-case-label">listening sessions</div>
          <div class="wsc-use-case-label">film screenings</div>
          <div class="wsc-use-case-label">workshops & classes</div>
          <div class="wsc-use-case-label">talks & discussions</div>
          <div class="wsc-use-case-label">private bookings</div>
        </div>
        
        <a href="/book" class="cta-button">BOOK WORKSHOP CAFÉ</a>
      </section>

        {/* CAFÉ SIGNAGE HERO - Above the fold */}
        <section class="crs-section cafe-heartbeat" style="padding: 0; max-width: 1400px; margin: 0 auto;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/Workshop_Cafe_CTA_Primary.png" 
            alt="Workshop Café — 118 Cowley Road"
            style="width: 100%; height: auto; display: block;"
            loading="eager"
          />
        </section>

        {/* EVENT LOG - Live feed */}
        <section class="crs-section section-dark">
          <div class="section-header">
            <h2 class="section-title heading">[ EVENT_LOG ]</h2>
            <p class="section-intro" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">118 COWLEY ROAD — PUBLIC SCHEDULE</p>
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
                  container.innerHTML = '<div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(127, 255, 0, 0.2); padding: 1.5rem; text-align: center;"><p style="font-family: \'JetBrains Mono\', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">[ STATUS: NO_ACTIVE_ENTRIES ]</p><p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">No events scheduled this week — <a href="/contact?service=venue" style="color: var(--mustard); text-decoration: none; font-weight: 700;">inquire for space allocation</a></p></div>';
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
              <a href="/book?service=venue" class="crs-button mono">BOOK SPACE</a>
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE ALLOCATION - Modular Use Cases */}
        <section class="crs-section cafe-heartbeat">
          <div class="section-header">
            <h2 class="section-title cafe-title">[ INFRASTRUCTURE_ALLOCATION ]</h2>
            <p class="section-intro cafe-intro" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Modular Space Protocol</p>
          </div>

          <div style="max-width: 700px; margin: 0 auto;">
            <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
              <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 1.25rem;">
                <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MODULE_01 // OPEN WORKSPACE</p>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">Drop-in desk space with high-speed connectivity. No booking required.</p>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.25rem;">
                <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MODULE_02 // COMMUNITY EVENTS</p>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">Talks, screenings, workshops, open mics. Subsidized rates for grassroots/non-profit.</p>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 1.25rem;">
                <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MODULE_03 // PRIVATE HIRE</p>
                <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">Small-scale meetings, rehearsals, or private sessions. PA system & projection available.</p>
              </div>
            </div>
          </div>
        </section>

        {/* REFRESHMENT PROTOCOL - Coffee/Tea Menu */}
        <section class="crs-section section-dark">
          <div class="section-header">
            <h2 class="section-title heading">[ REFRESHMENT_PROTOCOL ]</h2>
            <p class="section-intro" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">UE Coffee System — Oxford Roasted</p>
          </div>

          <div style="max-width: 800px; margin: 0 auto;">
            {/* Coffee Specs */}
            <div style="margin-bottom: 3rem;">
              <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 1.5rem;">COFFEE ALLOCATION</h3>
              <div style="display: grid; gap: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">ESPRESSO // SINGLE</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">ESPRESSO // DOUBLE</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.00</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">FLAT_WHITE</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">CAPPUCCINO</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">LATTE</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">AMERICANO</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.00</span>
                </div>
              </div>
            </div>

            {/* Tea Specs */}
            <div style="margin-bottom: 3rem;">
              <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 1.5rem;">TEA ALLOCATION</h3>
              <div style="display: grid; gap: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">ENGLISH_BREAKFAST</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">EARL_GREY</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">GREEN_TEA</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">PEPPERMINT</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
                </div>
              </div>
            </div>

            {/* Protocol Note */}
            <div style="background: rgba(127, 255, 0, 0.05); border: 1px solid rgba(127, 255, 0, 0.2); padding: 1.5rem; text-align: center;">
              <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">[ MILK_OPTIONS ]</p>
              <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.9); margin: 0;">Oat · Soy · Dairy — No additional charge</p>
            </div>
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
            <a href="/book" class="crs-button mono">VIEW CRS SERVICES</a>
          </div>
        </section>

        <Footer />
    </>
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
    </>
  )
})

// VENUE REDIRECT (removed - not ready for public launch)
app.get("/venue", (c) => c.redirect("/contact?service=venue"))

// ABOUT
app.get('/about', (c) => {
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">About CRS</h1>
          <p class="section-intro">Built to work. Built to last.</p>
        </div>

        {/* INTRO */}
        <div class="content-block">
          <div class="content-text">
            <p>
              Cowley Road Studios is a purpose-built studio and venue system in Oxford, supporting recording, performance, and digital creative work without drama.
            </p>
          </div>
        </div>

        {/* THE CRS STORY */}
        <div class="content-block">
          <h3 class="content-heading heading">The CRS Story</h3>
          <div class="content-text">
            <p>
              Cowley Road Studios was founded on a simple premise: <strong>professional infrastructure shouldn't be a luxury</strong>.
            </p>
            <p style="margin-top: 1rem;">
              Oxford's creative community needed recording facilities, rehearsal space, and technical support that worked reliably — not aspirational branding or fragile setups. We built CRS to prioritise engineering reality, documentation, and predictable outcomes.
            </p>
            <p style="margin-top: 1rem;">
              We began with a single recording room and a commitment to system discipline: signal paths mapped, equipment tested, and decisions made on function rather than fashion.
            </p>
            <p style="margin-top: 1rem;">
              Today, CRS operates across two Oxford locations — <strong>Cowley Road</strong> and <strong>Cricket Road</strong> — providing studio recording, rehearsal space, live sound services, and community venue access. We support grassroots artists, community organisations, and professional projects using the same operational standard.
            </p>
            <p style="margin-top: 1rem;">
              The mission remains unchanged: <strong>make professional-grade creative infrastructure accessible, reliable, and sustainable</strong>.
            </p>
          </div>
        </div>

        {/* THE NO CHAOS POLICY */}
        <div class="content-block">
          <h3 class="content-heading heading">The No Chaos Policy</h3>
          <div class="content-text">
            <p>
              CRS operates under a strict <strong>No Chaos Policy</strong>. This is not a slogan — it is an operational baseline.
            </p>
            <p style="margin-top: 1.5rem;"><strong>Equipment Maintenance</strong><br/>
              All equipment is tested, maintained, and documented. If it is in use, it works.
            </p>
            <p style="margin-top: 1rem;"><strong>Signal Path Documentation</strong><br/>
              Studios, PA systems, and installations are fully documented. No undocumented routing. No guesswork.
            </p>
            <p style="margin-top: 1rem;"><strong>Engineering-Led Decisions</strong><br/>
              Systems and workflows are chosen for reliability and suitability, not trends or brand allegiance.
            </p>
            <p style="margin-top: 1rem;"><strong>Predictable Results</strong><br/>
              Sessions and events are designed to start on time and run without technical distraction.
            </p>
            <p style="margin-top: 1rem;"><strong>Systematic Problem Solving</strong><br/>
              When issues arise, they are resolved methodically, documented, and prevented from recurring.
            </p>
          </div>
        </div>

        {/* WHY THIS MATTERS */}
        <div class="content-block">
          <h3 class="content-heading heading">Why This Matters</h3>
          <div class="content-text">
            <p><strong>For Artists</strong><br/>
              Your time is for making work, not troubleshooting equipment.
            </p>
            <p style="margin-top: 1rem;"><strong>For Event Organisers</strong><br/>
              You get predictable technical delivery and clear communication.
            </p>
            <p style="margin-top: 1rem;"><strong>For Community Groups</strong><br/>
              Professional infrastructure is available without requiring specialist knowledge or inflated budgets.
            </p>
          </div>
        </div>

        {/* OUR LOCATIONS */}
        <div class="content-block">
          <h3 class="content-heading heading">Our Locations</h3>
          <div class="content-text">
            <p><strong>Cowley Road, Oxford (OX4 1JE)</strong><br/>
              <span style="opacity: 0.8;">Recording Studio & Workshop Café</span>
            </p>
            <p style="margin-top: 0.5rem;">
              Multi-room recording facility with control room, live room, and isolation booths. Home to Workshop Café — the public-facing space for events, meetings, and community programming.
            </p>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; opacity: 0.7;">
              Services: Studio recording, rehearsal, venue hire, café
            </p>
            
            <p style="margin-top: 2rem;"><strong>Cricket Road, Oxford</strong><br/>
              <span style="opacity: 0.8;">Rehearsal & Production Node</span>
            </p>
            <p style="margin-top: 0.5rem;">
              Purpose-built rehearsal rooms with PA, monitoring, and backline, designed for bands, theatre groups, and production preparation.
            </p>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; opacity: 0.7;">
              Services: Rehearsal space, production prep
            </p>
          </div>
        </div>

        {/* WHO WE WORK WITH */}
        <div class="content-block">
          <h3 class="content-heading heading">Who We Work With</h3>
          <div class="content-text">
            <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
              <li>Grassroots artists and bands</li>
              <li>Community and cultural organisations</li>
              <li>Professional productions and events</li>
              <li>Public-facing workshops and programmes</li>
            </ul>
          </div>
        </div>

        {/* ODRO ENGINEERING STANDARD */}
        <div class="content-block">
          <h3 class="content-heading heading">ODRO Engineering Standard</h3>
          <div class="content-text">
            <p>
              CRS systems are designed and maintained under the <strong>ODRO Engineering Standard</strong> — our internal methodology for infrastructure delivery.
            </p>
            <p style="margin-top: 1rem;">ODRO means:</p>
            <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8; margin-top: 0.5rem;">
              <li>Document everything</li>
              <li>Test everything</li>
              <li>Maintain everything</li>
              <li>Make decisions based on engineering reality</li>
            </ul>
            <p style="margin-top: 1rem;">
              If a system is powered by ODRO Engineering, it has been designed to operate predictably and sustainably.
            </p>
          </div>
        </div>

        {/* GET INVOLVED */}
        <div class="content-block">
          <h3 class="content-heading heading">Get Involved</h3>
          <div class="content-text">
            <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
              <li><strong>Book a session</strong> — recording, rehearsal, or venue hire</li>
              <li><strong>Community access</strong> — subsidised and supported sessions</li>
              <li><strong>Workshop Café events</strong> — public programmes and hire</li>
            </ul>
            <p style="margin-top: 1.5rem;">
              <a href="/contact" style="color: var(--text-gold); text-decoration: underline;">Contact us</a> to get started.
            </p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 3rem; padding: 2rem 0; border-top: 1px solid rgba(232, 155, 60, 0.2);">
          <p class="mono" style="color: var(--text-gold); font-weight: 700;">
            CRS — Built to work. Built to last. Powered by ODRO Engineering.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
})

// WORK
app.get('/work', (c) => {
  return c.render(
    <>
      <Header />

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

      <Footer />
    </>
  )
})

// CONTACT
app.get('/contact', (c) => {
  const serviceType = c.req.query('service') || 'general'
  const serviceLabel = {
    'recording': 'Recording Session',
    'pod-hire': 'Pod Hire',
    'repairs': 'Equipment Repair',
    'av': 'AV Services',
    'venue': 'Venue Hire',
    'general': 'General Enquiry'
  }[serviceType] || 'General Enquiry'
  
  return c.render(
    <>
      <Header />

      <section class="crs-section section-dark">
        <div class="section-header">
          <h1 class="section-title heading">CRS — Contact</h1>
          <p class="section-intro">
            {serviceType !== 'general' ? `Enquiry: ${serviceLabel}` : 'For general enquiries only.'}
          </p>
        </div>

        {/* CONTACT FORM */}
        <div class="booking-form-container">
          <h3 class="content-heading mono">SEND A MESSAGE</h3>
          
          <form class="booking-form" method="post" action="/api/contact">
            <input type="hidden" name="service" value={serviceType} />
            
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
            
            <button type="submit" class="crs-button mono">SEND MESSAGE</button>
          </form>
          
          <p class="form-helper-text">Message received. Enquiries are processed during operating hours.</p>
        </div>

        {/* CONTACT METHODS */}
        <div class="content-block" style="margin-top: 3rem;">
          <h3 class="content-heading mono">DIRECT CONTACT</h3>
          <div class="content-text mono">
            <p><strong>NOTE:</strong> All enquiries are handled via the contact form above.</p>
            <p style="margin-top: 1rem;"><strong>ADDRESS:</strong> 118 Cowley Road, Oxford, OX4 1JE</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
})

export default app
