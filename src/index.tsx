import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { rackDemo } from './routes/rack-demo'
import { signage } from './routes/signage'
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
import { SignagePage } from './pages/Signage'
import { SignageLoop } from './pages/SignageLoop'
import { BookingConfirmed } from './pages/BookingConfirmed'
import { RackPage } from './pages/Rack'
import { RackTestPage } from './pages/RackTest'
import { RackModular } from './pages/RackModular'
import { RackModularEnhanced } from './pages/RackModularEnhanced'
import { RackAccordion } from './pages/RackAccordion'
import { Book } from './pages/Book'
import { BookAccordion } from './pages/BookAccordion'
import { RehearsalSpaces } from './pages/RehearsalSpaces'
import { RecordingPage } from './pages/Recording'
import { PodcastAVPage } from './pages/PodcastAV'
import { ContactPage } from './pages/Contact'
import { WorkshopCafeContactPage } from './pages/WorkshopCafeContact'
import { DigitalPulsePage } from './pages/DigitalPulse'
import { SignageDisplay } from './pages/SignageDisplay'
import { CLIENT_MANIFEST } from './client-manifest'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import StudioServicesRack from './components/StudioServicesRack'

const app = new Hono()

// Asset resolver: returns client asset path
// In dev: source file path for Vite HMR
// In prod: hashed bundle path from manifest
function getClientAsset(entryName: string): string {
  // In dev mode, use source path for Vite HMR
  if (import.meta.env.DEV) {
    return `/src/client/${entryName}.tsx`
  }
  
  // In production, resolve from embedded manifest
  const manifestKey = `src/client/${entryName}.tsx`
  const entry = CLIENT_MANIFEST[manifestKey as keyof typeof CLIENT_MANIFEST]
  
  if (entry?.file) {
    return `/static/${entry.file}`
  }
  
  // Fallback (should never happen)
  console.error(`Asset not found in manifest: ${manifestKey}`)
  return `/static/${entryName}.js`
}

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
  const contentType = c.req.header('content-type') || ''
  const isFormSubmission = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')

  try {
    const rawBody = isFormSubmission
      ? Object.fromEntries((await c.req.formData()).entries())
      : await c.req.json()

    const body = Object.fromEntries(
      Object.entries(rawBody).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    ) as Record<string, string>

    console.log('[API] Contact form submission:', body)

    const clientIP = c.req.header('cf-connecting-ip') || 'Unknown'
    const resendApiKey = c.env?.RESEND_API_KEY

    if (!resendApiKey || resendApiKey === 're_placeholder_add_real_key_after_signup') {
      console.error('[Resend] API key not configured')
      if (isFormSubmission) {
        return c.redirect('/contact?status=error', 303)
      }
      return c.json({
        success: false,
        error: 'Email service not configured. Please try again later.'
      }, 500)
    }

    const serviceAliases: Record<string, string> = {
      recording: 'recording',
      technical: 'av',
      av: 'av',
      repairs: 'repairs',
      repair: 'repairs',
      venue: 'venue',
      'pod-hire': 'pod-hire',
      general: 'general'
    }

    const serviceType = serviceAliases[(body.service || body.enquiry_type || 'general').toLowerCase()] || 'general'
    const serviceLabel = {
      recording: 'Recording Session',
      'pod-hire': 'Pod Hire',
      repairs: 'Equipment Repair',
      av: 'AV Services',
      venue: 'Venue Hire',
      general: 'General Enquiry'
    }[serviceType] || 'General Enquiry'

    const subject = body.subject || serviceLabel
    const message = body.message || 'No message provided'
    const phoneLine = body.phone
      ? `<p><strong>Phone:</strong> ${body.phone}</p>`
      : ''

    const emailData = {
      from: 'CRS Contact Form <noreply@crsoxford.com>',
      to: ['info@crsoxford.com'],
      subject: `[CRS ${serviceType.toUpperCase()}] ${subject}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; color: #00ff00; border: 2px solid #333;">
          <h2 style="color: #ff6b35; margin-top: 0;">NEW CONTACT FORM SUBMISSION</h2>
          <div style="border-left: 3px solid #ff6b35; padding-left: 15px; margin: 20px 0;">
            <p><strong>Service Type:</strong> ${serviceLabel}</p>
            <p><strong>From:</strong> ${body.name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${body.email || 'Not provided'}</p>
            ${phoneLine}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #0a0a0a; padding: 15px; margin: 20px 0; border: 1px solid #333;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <div style="font-size: 0.85em; color: #666; margin-top: 20px; padding-top: 15px; border-top: 1px solid #333;">
            <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
            <p><strong>IP:</strong> ${clientIP}</p>
          </div>
        </div>
      `,
      reply_to: body.email || undefined
    }

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
      if (isFormSubmission) {
        return c.redirect(`/contact?status=error&service=${encodeURIComponent(serviceType)}`, 303)
      }
      return c.json({
        success: false,
        error: 'Failed to send email. Please try again later.'
      }, 500)
    }

    const responseData = await mailResponse.json()
    console.log('[Resend] Email sent successfully:', responseData)

    if (isFormSubmission) {
      return c.redirect(`/contact?status=sent&service=${encodeURIComponent(serviceType)}`, 303)
    }

    return c.json({
      success: true,
      message: '[ SIGNAL RECEIVED ] Inquiry logged to CRS Administrative Queue. A technical representative will respond within 24 operational hours.'
    }, 200)
  } catch (error) {
    console.error('[API] Contact form error:', error)
    if (isFormSubmission) {
      return c.redirect('/contact?status=error', 303)
    }
    return c.json({
      success: false,
      error: 'Internal server error. Please try again later.'
    }, 500)
  }
})

// Workshop Café contact form — routes to workshopcafe@crsoxford.com
app.post('/api/contact-wsc', async (c) => {
  const contentType = c.req.header('content-type') || ''
  const isFormSubmission = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')

  try {
    const rawBody = isFormSubmission
      ? Object.fromEntries((await c.req.formData()).entries())
      : await c.req.json()

    const body = Object.fromEntries(
      Object.entries(rawBody).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    ) as Record<string, string>

    console.log('[WSC] Contact form submission:', body)

    const clientIP = c.req.header('cf-connecting-ip') || 'Unknown'
    const resendApiKey = c.env?.RESEND_API_KEY

    if (!resendApiKey || resendApiKey === 're_placeholder_add_real_key_after_signup') {
      console.error('[WSC Resend] API key not configured')
      if (isFormSubmission) return c.redirect('/workshop-cafe/contact?status=error', 303)
      return c.json({ success: false, error: 'Email service not configured.' }, 500)
    }

    const serviceLabels: Record<string, string> = {
      'private-hire': 'Private Hire / Exclusive Booking',
      'event':        'Event / Pop-Up / Showcase',
      'workshop':     'Workshop or Class',
      'community':    'Community Project',
      'general':      'General Enquiry',
    }
    const serviceType  = body.service || 'general'
    const serviceLabel = serviceLabels[serviceType] || 'General Enquiry'

    const emailData = {
      from: 'Workshop Café Enquiries <noreply@crsoxford.com>',
      to:   ['workshopcafe@crsoxford.com'],
      subject: `[WSC ${serviceType.toUpperCase()}] Hire enquiry from ${body.name || 'unknown'}`,
      html: `
        <div style="font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0d1508;color:#f0e0b0;border:2px solid #c8a84b;">
          <h2 style="color:#c8a84b;margin-top:0;">NEW WORKSHOP CAFÉ HIRE ENQUIRY</h2>
          <div style="border-left:3px solid #c8a84b;padding-left:15px;margin:20px 0;">
            <p><strong style="color:#c8a84b;">Type:</strong> ${serviceLabel}</p>
            <p><strong style="color:#c8a84b;">From:</strong> ${body.name || 'Not provided'}</p>
            <p><strong style="color:#c8a84b;">Email:</strong> ${body.email || 'Not provided'}</p>
          </div>
          <div style="background:#060e04;padding:15px;margin:20px 0;border:1px solid #3a4e28;">
            <p><strong style="color:#c8a84b;">Details / Dates:</strong></p>
            <p style="white-space:pre-wrap;color:#a89060;">${body.notes || 'No details provided'}</p>
          </div>
          <div style="font-size:0.85em;color:#6a5c3a;margin-top:20px;padding-top:15px;border-top:1px solid #3a4e28;">
            <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
            <p><strong>IP:</strong> ${clientIP}</p>
            <p><strong>Source:</strong> /workshop-cafe/contact</p>
          </div>
        </div>
      `,
      reply_to: body.email || undefined
    }

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
      console.error('[WSC Resend] Failed:', errorText)
      if (isFormSubmission) return c.redirect(`/workshop-cafe/contact?status=error&service=${encodeURIComponent(serviceType)}`, 303)
      return c.json({ success: false, error: 'Failed to send email.' }, 500)
    }

    console.log('[WSC Resend] Sent successfully')
    if (isFormSubmission) return c.redirect(`/workshop-cafe/contact?status=sent&service=${encodeURIComponent(serviceType)}`, 303)
    return c.json({ success: true, message: '[ WSC SIGNAL RECEIVED ] Enquiry forwarded to Workshop Café team.' }, 200)

  } catch (error) {
    console.error('[WSC] Contact form error:', error)
    if (isFormSubmission) return c.redirect('/workshop-cafe/contact?status=error', 303)
    return c.json({ success: false, error: 'Internal server error.' }, 500)
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
app.route('/signage', signage)

app.use(renderer)

// REDIRECTS & MISSING PAGES
app.get('/av', (c) => c.redirect('/av-services'))

// UNIFIED BOOKING PAGE (Phase 2: Simplified 3-category booking)
// BOOK: Redirect to homepage (Rack is now primary booking interface)
app.get('/book', (c) => c.redirect('/#recording-services', 301))

// LEGACY BOOKING PAGE (Archive)
app.get('/book-legacy', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Legacy Booking | Cowley Road Studios</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Core CSS files */}
        <link href="/static/crs-reset.css" rel="stylesheet" />
        <link href="/static/crs-typography.css" rel="stylesheet" />
        <link href="/static/crs-header.css" rel="stylesheet" />
        <link href="/static/crs-mobile.css" rel="stylesheet" />
        
        {/* Accordion-specific CSS */}
        <link href="/static/rack-accordion.css" rel="stylesheet" />
      </head>
      <body>
        <BookAccordion />
      </body>
    </html>
  )
})

// OLD BOOKING GATEWAY (kept for reference, can be removed later)
app.get('/book-old', (c) => {
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
            <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX?src=embed" target="_blank" rel="noopener noreferrer" class="crs-button mono" style="font-size: 0.85rem; opacity: 0.7;">
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
// Removed old legacy /rehearsal route - using new RehearsalSpaces component below

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
      <div class="loc-page">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div class="loc-hero">
          <div class="loc-hero-left">
            <p class="loc-hero-eyebrow">Cowley Road Studios · Oxford HQ</p>
            <h1 class="loc-hero-name">118 Cowley Road</h1>
            <p class="loc-hero-address">Oxford · OX4 1JE · United Kingdom</p>
            <div class="loc-status loc-status--operational" style="margin-top: 0.75rem;">
              <span class="loc-status--led"></span>
              Operational
            </div>
          </div>
          <img src="/static/crs-logo.png" alt="Cowley Road Studios" class="loc-hero-logo" width="80" height="80" />
        </div>

        {/* ── WHAT'S HERE + BOOKING ─────────────────────────────── */}
        <div class="loc-cols">

          <div class="loc-panel loc-panel--accent">
            <p class="loc-panel-label">Services at this location</p>
            <ul class="loc-services">
              <li>Recording studio — hybrid analogue/digital</li>
              <li>Control room hire</li>
              <li>Rehearsal rooms</li>
              <li>Workshop Café &amp; venue hire</li>
              <li>ODRO Engineering — repairs &amp; AV support</li>
            </ul>
          </div>

          <div class="loc-panel">
            <p class="loc-panel-label">Book direct</p>
            <div class="loc-cta-bar" style="flex-direction: column; margin-top: 0;">
              <a href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX"
                 target="_blank" rel="noopener noreferrer" class="loc-cta loc-cta--primary">
                Book recording
              </a>
              <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
                 target="_blank" rel="noopener noreferrer" class="loc-cta loc-cta--primary">
                Book rehearsal
              </a>
              <a href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX"
                 target="_blank" rel="noopener noreferrer" class="loc-cta loc-cta--primary">
                Hire control room
              </a>
              <a href="/contact?service=venue" class="loc-cta loc-cta--secondary">
                Café &amp; venue enquiry
              </a>
            </div>
          </div>

        </div>

        {/* ── STUDIO SPECS ──────────────────────────────────────── */}
        <div class="loc-cols">

          <div class="loc-panel">
            <p class="loc-panel-label">Recording — tech specs</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>Console</td><td>SSL BiG SiX — SuperAnalogue preamps + EQ</td></tr>
                <tr><td>Compression</td><td>SSL G‑Series Bus Compressor · valve compression</td></tr>
                <tr><td>Tape</td><td>Tape integration path available</td></tr>
                <tr><td>Monitoring</td><td>Adam Audio · Yamaha NS‑10 · Genelec + sub</td></tr>
                <tr><td>Patchbay</td><td>Ghielmetti mastering matrix</td></tr>
                <tr><td>Mics</td><td>Neumann U87 · AKG C414 · SM7B · SM58</td></tr>
                <tr><td>Rooms</td><td>Live room + 3 isolation booths</td></tr>
              </tbody>
            </table>
          </div>

          <div class="loc-panel">
            <p class="loc-panel-label">Rehearsal — tech specs</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>Capacity</td><td>Up to 4-piece band</td></tr>
                <tr><td>Backline</td><td>Full backline available</td></tr>
                <tr><td>PA</td><td>Full PA system</td></tr>
                <tr><td>Monitoring</td><td>Foldback monitors</td></tr>
              </tbody>
            </table>
            <div class="loc-divider" style="margin: 1rem 0;"></div>
            <p class="loc-panel-label loc-panel-label--mustard">Workshop Café</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>Capacity</td><td>Flexible — café + event space</td></tr>
                <tr><td>Hire</td><td>Private events, screenings, workshops</td></tr>
                <tr><td>Enquire</td><td><a href="/contact?service=venue" style="color: var(--mustard, #C2A43A);">Contact form →</a></td></tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* ── PHOTOS ───────────────────────────────────────────── */}
        <div class="loc-panel" style="margin-bottom: 1.5rem;">
          <p class="loc-panel-label">Location photos</p>
          <div class="loc-photo-strip">
            <img src="/static/machined-assets/cowley-pods-rack.webp"
                 alt="Cowley Road control room" loading="lazy" />
            <img src="/static/machined-assets/cowley-rehearsal-optimized.webp"
                 alt="Cowley Road rehearsal room" loading="lazy" />
          </div>
        </div>

        {/* ── ACCESS + TRANSPORT ────────────────────────────────── */}
        <div class="loc-cols">

          <div class="loc-panel">
            <p class="loc-panel-label">Getting here</p>
            <div class="loc-transport">
              <div class="loc-transport-item">
                <span class="loc-transport-icon">🚌</span>
                <span class="loc-transport-label">Bus</span>
                <p class="loc-transport-detail">Routes 1 &amp; 5 stop directly on Cowley Road. Frequent service from Oxford city centre.</p>
              </div>
              <div class="loc-transport-item">
                <span class="loc-transport-icon">🚲</span>
                <span class="loc-transport-label">Cycle</span>
                <p class="loc-transport-detail">Covered cycle parking on Cowley Road. Easy access from Oxford city centre.</p>
              </div>
              <div class="loc-transport-item">
                <span class="loc-transport-icon">🚗</span>
                <span class="loc-transport-label">Car</span>
                <p class="loc-transport-detail">Street parking on side roads (Princes St, James St). Check signs for restrictions.</p>
              </div>
            </div>
            {/* Embedded map */}
            <div style="margin-top: 1rem; border-radius: 3px; overflow: hidden; border: 1px solid rgba(58,78,58,0.35);">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.4!2d-1.2335!3d51.7483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9b8b8b8b9%3A0x0!2s118+Cowley+Road%2C+Oxford+OX4+1JE!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="200"
                style="border: none; display: block; filter: grayscale(0.6) invert(0.85) hue-rotate(180deg) brightness(0.85);"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="118 Cowley Road, Oxford OX4 1JE"
                aria-label="Map showing 118 Cowley Road, Oxford"
              ></iframe>
            </div>
            <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE"
               target="_blank" rel="noopener noreferrer" class="loc-map-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Open in Google Maps — 118 Cowley Road, OX4 1JE
            </a>
            {/* Step-by-step from city centre */}
            <div style="margin-top: 1rem; padding: 0.875rem 1rem; background: #0e0e0c; border: 1px solid rgba(255,255,255,0.06); border-radius: 3px; font-size: 0.78rem; color: rgba(212,204,184,0.75); line-height: 1.6;">
              <p style="font-size: 0.65rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #6a8a5a; margin: 0 0 0.5rem;">Step-by-step from Oxford city centre</p>
              <p style="margin: 0 0 0.3rem;">🚶 <strong style="color: #f4f1e8;">On foot</strong> — 20 min walk east along Cowley Road from Magdalen Bridge. Pass the Plain roundabout, continue straight. No. 118 is on your left, past a row of shops.</p>
              <p style="margin: 0 0 0.3rem;">🚌 <strong style="color: #f4f1e8;">Bus 1 or 5</strong> — Board at St Aldate's / Carfax (city centre). Ride 8 stops (~12 min). Alight at <em>Westbourne Library</em> or <em>Howard St</em>. No. 118 is 2 min walk.</p>
              <p style="margin: 0;">🚲 <strong style="color: #f4f1e8;">Cycle</strong> — Cowley Road is a signed cycle route from Magdalen Bridge. Covered bike parking outside the building.</p>
            </div>
          </div>

          <div class="loc-panel">
            <p class="loc-panel-label">Access &amp; contact</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>Access</td><td>By booking only. Door code provided on confirmation.</td></tr>
                <tr><td>Hours</td><td>Bookable slots — see calendar when booking</td></tr>
                <tr><td>Email</td><td><a href="mailto:info@crsoxford.com" style="color: var(--mustard, #C2A43A);">info@crsoxford.com</a></td></tr>
                <tr><td>Enquiries</td><td><a href="/contact" style="color: var(--mustard, #C2A43A);">Contact form →</a></td></tr>
              </tbody>
            </table>
            <div class="loc-divider" style="margin: 1rem 0;"></div>
            <p class="loc-panel-label">ODRO Engineering</p>
            <p style="font-size: 0.8125rem; color: #d4cbb8; line-height: 1.5; margin: 0 0 0.75rem;">
              Amp repair, AV support, and electronics servicing on site.
            </p>
            <a href="/contact?service=repairs" class="loc-cta loc-cta--secondary" style="font-size: 0.75rem; padding: 0.5rem 1rem;">
              Request repair / support
            </a>
          </div>

        </div>

        {/* ── OTHER LOCATION ────────────────────────────────────── */}
        <div class="loc-panel" style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div>
            <p class="loc-panel-label" style="margin-bottom: 0.25rem;">Also available</p>
            <p style="font-size: 0.9375rem; font-weight: 600; color: #f4f1e8; margin: 0 0 0.25rem;">CRS — Cricket Road</p>
            <p style="font-size: 0.8125rem; color: rgba(212,204,184,0.65); margin: 0;">Dedicated rehearsal facility · larger live room · Yamaha CLP grand piano</p>
          </div>
          <a href="/crs-cricket-road" class="loc-cta loc-cta--secondary">
            View Cricket Road →
          </a>
        </div>

      </div>
      <Footer />
    </>,
    {
      title: 'Cowley Road Studios — 118 Cowley Road, Oxford OX4 1JE',
      description: 'CRS headquarters at 118 Cowley Road, Oxford. Recording studio, control room hire, rehearsal rooms, Workshop Café, ODRO Engineering. Book online.',
      keywords: 'recording studio cowley road oxford, rehearsal rooms oxford, control room hire oxford, workshop cafe oxford, 118 cowley road, OX4 1JE'
    }
  )
})

// CRS — CRICKET ROAD
app.get('/crs-cricket-road', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <div class="loc-page">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div class="loc-hero">
          <div class="loc-hero-left">
            <p class="loc-hero-eyebrow">Cowley Road Studios · Cricket Road facility</p>
            <h1 class="loc-hero-name">Cricket Road</h1>
            <p class="loc-hero-address">Oxford · OX4 3DJ · United Kingdom</p>
            <div class="loc-status loc-status--operational" style="margin-top: 0.75rem;">
              <span class="loc-status--led"></span>
              Operational — bookable now
            </div>
          </div>
          <img src="/static/cricket-logo.png" alt="Cricket Road — CRS" class="loc-hero-logo" width="80" height="80" />
        </div>

        {/* ── WHAT'S HERE + BOOKING ─────────────────────────────── */}
        <div class="loc-cols">

          <div class="loc-panel loc-panel--accent">
            <p class="loc-panel-label">Services at this location</p>
            <ul class="loc-services">
              <li>Rehearsal rooms — up to 8 people</li>
              <li>Large live room — 6 m × 4 m</li>
              <li>Live capture &amp; demo recording</li>
              <li>Writing sessions &amp; run-throughs</li>
            </ul>
            <div class="loc-divider" style="margin: 1rem 0;"></div>
            <p style="font-size: 0.8rem; color: rgba(212,204,184,0.55); line-height: 1.5; margin: 0;">
              Dedicated rehearsal and live capture facility. No café or recording studio at this address — see <a href="/crs-cowley-road" style="color: var(--mustard, #C2A43A);">Cowley Road</a> for full studio services.
            </p>
          </div>

          <div class="loc-panel">
            <p class="loc-panel-label">Book direct</p>
            <div class="loc-cta-bar" style="flex-direction: column; margin-top: 0;">
              <a href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX"
                 target="_blank" rel="noopener noreferrer" class="loc-cta loc-cta--primary">
                Book rehearsal
              </a>
              <a href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX"
                 target="_blank" rel="noopener noreferrer" class="loc-cta loc-cta--primary">
                Book recording / capture
              </a>
              <a href="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX"
                 target="_blank" rel="noopener noreferrer" class="loc-cta loc-cta--secondary">
                Hire control position
              </a>
              <a href="/contact" class="loc-cta loc-cta--secondary">
                Enquire
              </a>
            </div>
          </div>

        </div>

        {/* ── ROOM SPECS ────────────────────────────────────────── */}
        <div class="loc-cols">

          <div class="loc-panel">
            <p class="loc-panel-label">Live room specs</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>Room size</td><td>6 m × 4 m live room</td></tr>
                <tr><td>Capacity</td><td>Up to 8 people</td></tr>
                <tr><td>Drum kit</td><td>Full drum kit · kick mic installed</td></tr>
                <tr><td>Piano</td><td>Yamaha CLP electric grand, routed through PA</td></tr>
                <tr><td>Guitar amps</td><td>2 × guitar amplifiers (general backline)</td></tr>
                <tr><td>Bass amp</td><td>Trace Elliot Series 6 combo</td></tr>
                <tr><td>Vocals</td><td>2 × Shure SM58</td></tr>
              </tbody>
            </table>
          </div>

          <div class="loc-panel">
            <p class="loc-panel-label">PA &amp; desk</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>PA</td><td>Full PA system — vocal &amp; instrument routing</td></tr>
                <tr><td>Desk</td><td>Live room desk with reverb and compression</td></tr>
                <tr><td>Monitoring</td><td>Foldback monitors</td></tr>
                <tr><td>Control</td><td>Self-op — direct adjacency to live room</td></tr>
                <tr><td>Capture</td><td>Basic live capture / demo available — enquire</td></tr>
              </tbody>
            </table>
            <div class="loc-divider" style="margin: 1rem 0;"></div>
            <p class="loc-panel-label">Use cases</p>
            <ul class="loc-services" style="margin-top: 0;">
              <li>Band rehearsals</li>
              <li>Live run-throughs before gigs</li>
              <li>Writing and development sessions</li>
              <li>Basic live capture and demo recording</li>
            </ul>
          </div>

        </div>

        {/* ── PHOTOS ───────────────────────────────────────────── */}
        <div class="loc-panel" style="margin-bottom: 1.5rem;">
          <p class="loc-panel-label">Location photos</p>
          <div class="loc-photo-strip">
            <img src="/static/machined-assets/cricket-rehearsal-optimized.webp"
                 alt="Cricket Road rehearsal room" loading="lazy" />
            <img src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
                 alt="Cricket Road live room" loading="lazy" />
          </div>
        </div>

        {/* ── ACCESS + TRANSPORT ────────────────────────────────── */}
        <div class="loc-cols">

          <div class="loc-panel">
            <p class="loc-panel-label">Getting here</p>
            <div class="loc-transport">
              <div class="loc-transport-item">
                <span class="loc-transport-icon">🚌</span>
                <span class="loc-transport-label">Bus</span>
                <p class="loc-transport-detail">Routes serving Cowley / Iffley Road corridors. Short walk from Rose Hill stops.</p>
              </div>
              <div class="loc-transport-item">
                <span class="loc-transport-icon">🚲</span>
                <span class="loc-transport-label">Cycle</span>
                <p class="loc-transport-detail">Quiet residential roads, easy cycling access from East Oxford.</p>
              </div>
              <div class="loc-transport-item">
                <span class="loc-transport-icon">🚗</span>
                <span class="loc-transport-label">Car</span>
                <p class="loc-transport-detail">Residential street parking available on Cricket Road and nearby streets.</p>
              </div>
            </div>
            {/* Embedded map */}
            <div style="margin-top: 1rem; border-radius: 3px; overflow: hidden; border: 1px solid rgba(58,78,58,0.35);">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2471.2!2d-1.2284!3d51.7398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6c0c0c0c0c1%3A0x0!2sCricket+Road%2C+Oxford+OX4+3DJ!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="200"
                style="border: none; display: block; filter: grayscale(0.6) invert(0.85) hue-rotate(180deg) brightness(0.85);"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Cricket Road, Oxford OX4 3DJ"
                aria-label="Map showing Cricket Road, Oxford"
              ></iframe>
            </div>
            <a href="https://www.google.com/maps/search/Cricket+Road+Oxford+OX4+3DJ"
               target="_blank" rel="noopener noreferrer" class="loc-map-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Open in Google Maps — Cricket Road, Oxford OX4 3DJ
            </a>
            {/* Step-by-step from city centre */}
            <div style="margin-top: 1rem; padding: 0.875rem 1rem; background: #0e0e0c; border: 1px solid rgba(255,255,255,0.06); border-radius: 3px; font-size: 0.78rem; color: rgba(212,204,184,0.75); line-height: 1.6;">
              <p style="font-size: 0.65rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #6a8a5a; margin: 0 0 0.5rem;">Step-by-step from Oxford city centre</p>
              <p style="margin: 0 0 0.3rem;">🚶 <strong style="color: #f4f1e8;">On foot</strong> — ~30 min. Walk east along Cowley Road past the Plain roundabout, then south on Iffley Road. Turn left onto Cricket Road (signed). Or via Howard St → Cricket Road shortcut.</p>
              <p style="margin: 0 0 0.3rem;">🚌 <strong style="color: #f4f1e8;">Bus (Iffley Road corridor)</strong> — Board at St Aldate's. Take bus toward Rose Hill / Iffley. Alight at <em>Iffley Road / Cricket Road junction</em>. Walk 2 min onto Cricket Road.</p>
              <p style="margin: 0 0 0.3rem;">🚌 <strong style="color: #f4f1e8;">From Cowley Road (Bus 1/5)</strong> — Alight at Howard St stop, walk south ~10 min through residential streets to Cricket Road.</p>
              <p style="margin: 0;">🚲 <strong style="color: #f4f1e8;">Cycle</strong> — 15 min from city centre. Cowley Road → Howard St → Cricket Road. Quiet residential streets, no significant hills.</p>
            </div>
          </div>

          <div class="loc-panel">
            <p class="loc-panel-label">Access &amp; contact</p>
            <table class="loc-specs">
              <tbody>
                <tr><td>Access</td><td>By booking only. Details sent on confirmation.</td></tr>
                <tr><td>Hours</td><td>Bookable slots — see calendar when booking</td></tr>
                <tr><td>Email</td><td><a href="mailto:info@crsoxford.com" style="color: var(--mustard, #C2A43A);">info@crsoxford.com</a></td></tr>
                <tr><td>Enquiries</td><td><a href="/contact" style="color: var(--mustard, #C2A43A);">Contact form →</a></td></tr>
              </tbody>
            </table>
            <div class="loc-divider" style="margin: 1rem 0;"></div>
            <p class="loc-panel-label">Parking note</p>
            <p style="font-size: 0.8rem; color: rgba(212,204,184,0.65); line-height: 1.5; margin: 0;">
              Residential parking on Cricket Road and side streets. No permit required in most areas — check signs on arrival.
            </p>
          </div>

        </div>

        {/* ── OTHER LOCATION ────────────────────────────────────── */}
        <div class="loc-panel" style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div>
            <p class="loc-panel-label" style="margin-bottom: 0.25rem;">Also available</p>
            <p style="font-size: 0.9375rem; font-weight: 600; color: #f4f1e8; margin: 0 0 0.25rem;">CRS — Cowley Road HQ</p>
            <p style="font-size: 0.8125rem; color: rgba(212,204,184,0.65); margin: 0;">Full recording studio · SSL BiG SiX · Workshop Café · ODRO Engineering</p>
          </div>
          <a href="/crs-cowley-road" class="loc-cta loc-cta--secondary">
            View Cowley Road →
          </a>
        </div>

      </div>
      <Footer />
    </>,
    {
      title: 'CRS Cricket Road — Rehearsal Rooms Oxford OX4 3DJ',
      description: 'CRS Cricket Road: dedicated rehearsal facility in Oxford. Large 6m × 4m live room, full backline, PA, drum kit, Yamaha CLP piano. Book online.',
      keywords: 'rehearsal rooms oxford, cricket road studio oxford, band rehearsal oxford, live room oxford, OX4 3DJ, rehearsal space east oxford'
    }
  )
})

// HOME
// ROOT: HARDWARE RACK CONSOLE (Hardware-first landing page)
// HOMEPAGE: Studio Services Rack (Promoted from /studio-rack-demo)
app.get('/', (c) => {
  const manifestEntry = CLIENT_MANIFEST['src/client/rack-entry.tsx']
  const jsAsset = `/static/${manifestEntry.file}`
  const cssAsset = manifestEntry.css ? `/static/${manifestEntry.css[0]}` : null
  // v5.18: vendor chunk split — resolve it from manifest imports
  const vendorEntry = manifestEntry.imports?.[0]
  const vendorAsset = vendorEntry
    ? `/static/${(CLIENT_MANIFEST as Record<string, {file: string}>)[vendorEntry]?.file ?? ''}`
    : null
  
  // Server-render the React component
  const rackHtml = renderToString(createElement(StudioServicesRack))
  
  return c.html(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Recording Studio &amp; Rehearsal Rooms in Oxford | Cowley Road Studios</title>
  <meta name="description" content="Cowley Road Studios at 118 Cowley Road, Oxford OX4 1JE, United Kingdom. Grassroots infrastructure for the Oxford music scene. Recording, rehearsal, Workshop Café enquiries, and ODRO Engineering support." />
  <meta name="keywords" content="recording studio oxford, rehearsal rooms oxford, music studio cowley road, cowley road studios, 118 cowley road oxford, workshop cafe oxford, odro engineering" />
  <link rel="canonical" href="https://cowleyroadstudios.com/" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/crs-logo.png" />
  <link rel="apple-touch-icon" href="/crs-logo.png" />

  <!-- LCP image preload — fetchpriority high so it starts in preload scan -->
  <link rel="preload" as="image" href="/static/crs-logo.png" fetchpriority="high" />

  <!-- Hardware Physics CSS -->
  <link href="/static/studio-rack-demo.css" rel="stylesheet" />
  ${cssAsset ? `<link rel="preload" as="style" href="${cssAsset}" onload="this.rel='stylesheet'" />` : ''}
  
  <!-- Fonts — non-blocking (media=print trick, v5.18) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /></noscript>

  <!-- Vendor chunk preload — browser fetches it in parallel with main entry -->
  ${vendorAsset ? `<link rel="modulepreload" href="${vendorAsset}" />` : ''}
</head>
<body>
  <div id="studio-rack-root">${rackHtml}</div>
  
  <!-- React Island: vendor first so it's cached independently -->
  ${vendorAsset ? `<script type="module" src="${vendorAsset}"></script>` : ''}
  <script type="module" src="${jsAsset}"></script>
  
  <!-- ODRO Modal Trigger -->
  <script>
    window.addEventListener('OPEN_ODRO_MODAL', function() {
      var modal = document.getElementById('odro-terms-modal');
      if (modal) modal.classList.remove('hidden');
    });
  </script>
  
  <!-- Structured data for SEO -->
  <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MusicStudio",
      "name": "Cowley Road Studios",
      "description": "Grassroots infrastructure for the Oxford music scene.",
      "url": "https://cowleyroadstudios.com",
      "telephone": "+441865722027",
      "email": "info@crsoxford.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "118 Cowley Road",
        "addressLocality": "Oxford",
        "postalCode": "OX4 1JE",
        "addressCountry": "United Kingdom"
      },
      "hasMap": "https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE",
      "sameAs": [
        "https://instagram.com/cowleyroadstudios.ox"
      ]
    })}
  </script>
</body>
</html>`
  )
})

// ==========================================
// SEO SUPPORT PAGES — PREVIEW BATCH 3
// ==========================================

const SUPPORT_PAGE_STYLE = `
  :root {
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #070807;
    color: #f3f0e7;
  }
  main {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2.5rem 1rem 4rem;
  }
  .shell {
    border: 1px solid rgba(201,162,39,0.24);
    background: linear-gradient(180deg, rgba(29,33,27,0.96) 0%, rgba(9,10,9,0.96) 100%);
    box-shadow: 0 18px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05);
    padding: 1.5rem;
  }
  .eyebrow,
  .footer-links,
  .back-link,
  .cta-link {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .eyebrow {
    color: #d7c47a;
    font-size: 0.78rem;
  }
  h1 {
    margin: 0.5rem 0 0.75rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.05;
    text-transform: uppercase;
  }
  p, li {
    line-height: 1.75;
    color: rgba(243,240,231,0.88);
  }
  ul { padding-left: 1.2rem; }
  li::marker { color: #d7c47a; }
  .support-body {
    display: grid;
    gap: 0.8rem;
    margin-top: 1.25rem;
  }
  .support-body p,
  .support-body li {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 0.98rem;
    letter-spacing: 0.01em;
    text-transform: none;
    line-height: 1.65;
  }
  .support-body .support-label {
    color: #d7c47a;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .support-list-plain {
    list-style: none;
    padding-left: 0;
    margin: 0;
    display: grid;
    gap: 0.5rem;
  }
  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  .cta-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.9rem 1rem;
    text-decoration: none;
    color: #13140d;
    background: linear-gradient(180deg, #d7c47a 0%, #b8952d 100%);
    border: 1px solid rgba(201,162,39,0.75);
  }
  .footer {
    margin-top: 2rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    margin-top: 1rem;
    font-size: 0.78rem;
  }
  a { color: #d7c47a; }
  @media (max-width: 640px) {
    .shell { padding: 1.15rem; }
    .cta-row { flex-direction: column; }
    .cta-link { width: 100%; }
  }
`

const renderSupportPage = ({ title, description, h1, body, slug, ctaLabel, ctaHref }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://cowleyroadstudios.com/${slug}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>${SUPPORT_PAGE_STYLE}</style>
</head>
<body>
  <main>
    <div class="shell">
      <a href="/" class="back-link">← RETURN</a>
      <div class="eyebrow">Cowley Road Studios</div>
      <h1>${h1}</h1>
      <div class="support-body">
        ${body}
      </div>
      <div class="cta-row">
        <a href="${ctaHref}" class="cta-link">${ctaLabel}</a>
      </div>
      <footer class="footer">
        <div>118 Cowley Road, Oxford OX4 1JE, United Kingdom</div>
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="/recording-studio-oxford">Recording Studio Oxford</a>
          <a href="/rehearsal-rooms-oxford">Rehearsal Rooms Oxford</a>
          <a href="/music-studio-cowley-road">Music Studio Cowley Road</a>
        </div>
      </footer>
    </div>
  </main>
</body>
</html>`

app.get('/recording-studio-oxford', (c) => {
  return c.html(renderSupportPage({
    slug: 'recording-studio-oxford',
    title: 'Recording Studio — Oxford | Cowley Road Studios',
    description: 'Recording Studio — Oxford. 118 Cowley Road. Main recording facility with hybrid analogue–digital workflow and SSL, valve, and tape signal path.',
    h1: 'Recording Studio — Oxford',
    body: `
      <p>118 Cowley Road, Oxford</p>
      <p>Main recording facility.</p>
      <p>Hybrid analogue–digital workflow.</p>
      <ul class="support-list-plain">
        <li>Tracking</li>
        <li>Overdubs</li>
        <li>Mixing</li>
      </ul>
      <p><span class="support-label">Signal path:</span></p>
      <p>SSL • Valve • Tape</p>
      <p>Used by independent artists across Oxford.</p>
    `,
    ctaLabel: 'BOOK RECORDING →',
    ctaHref: 'https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX'
  }))
})

app.get('/rehearsal-rooms-oxford', (c) => {
  return c.html(renderSupportPage({
    slug: 'rehearsal-rooms-oxford',
    title: 'Rehearsal Rooms — Oxford | Cowley Road Studios',
    description: 'Rehearsal Rooms — Oxford. Two locations. Cowley Road for studio-linked rehearsal. Cricket Road for rehearsal only.',
    h1: 'Rehearsal Rooms — Oxford',
    body: `
      <p>Two locations</p>
      <p><span class="support-label">Cowley Road</span></p>
      <p>Studio-linked rehearsal</p>
      <p><span class="support-label">Cricket Road</span></p>
      <p>Dedicated rehearsal space</p>
      <p><span class="support-label">Choose based on use:</span></p>
      <p>Rehearse → Record (Cowley)</p>
      <p>Rehearsal only (Cricket)</p>
    `,
    ctaLabel: 'BOOK REHEARSAL →',
    ctaHref: 'https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX'
  }))
})

app.get('/music-studio-cowley-road', (c) => {
  return c.html(renderSupportPage({
    slug: 'music-studio-cowley-road',
    title: 'Music Studio — Cowley Road | Cowley Road Studios',
    description: 'Music Studio — Cowley Road. 118 Cowley Road, Oxford OX4 1JE. Flagship CRS location for recording, control room, and studio-linked rehearsal.',
    h1: 'Music Studio — Cowley Road',
    body: `
      <p>118 Cowley Road, Oxford OX4 1JE</p>
      <p>Flagship CRS location</p>
      <p>Recording</p>
      <p>Control room</p>
      <p>Studio-linked rehearsal</p>
      <p>Part of Oxford’s independent music infrastructure.</p>
    `,
    ctaLabel: 'BOOK RECORDING →',
    ctaHref: 'https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX'
  }))
})

app.get('/music-studio-oxford', (c) => c.redirect('/music-studio-cowley-road', 301))
app.get('/cricket-road-rehearsal', (c) => c.redirect('/rehearsal-rooms-oxford', 301))

// LEGACY HOMEPAGE REDIRECT
app.get('/home', (c) => c.redirect('/'))

// LEGACY ACCORDION (Kept for archive access)
app.get('/rack-accordion-legacy', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Legacy Accordion | Cowley Road Studios</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Core CSS files */}
        <link href="/static/crs-reset.css" rel="stylesheet" />
        <link href="/static/crs-typography.css" rel="stylesheet" />
        <link href="/static/crs-header.css" rel="stylesheet" />
        <link href="/static/crs-footer.css" rel="stylesheet" />
        <link href="/static/crs-map-embed.css" rel="stylesheet" />
        <link href="/static/crs-mobile.css" rel="stylesheet" />
        
        {/* Accordion-specific CSS */}
        <link href="/static/rack-accordion.css" rel="stylesheet" />
      </head>
      <body>
        <RackAccordion />
        
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Cowley Road Studios",
            "description": "Independent recording studio and rehearsal facility in Oxford. Formerly Soundworks Oxford (1999–2024). Engineer-led recording, professional rehearsal rooms, repair services, and creative workspace hire.",
            "image": "https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "118 Cowley Road",
              "addressLocality": "Oxford",
              "postalCode": "OX4 1JE",
              "addressCountry": "GB"
            },
            "telephone": "+441865722027",
            "email": "info@crsoxford.com",
            "url": "https://cowleyroadstudios.com",
            "priceRange": "££",
            "areaServed": "Oxford",
            "sameAs": [
              "https://instagram.com/cowleyroadstudios.ox"
            ]
          })}
        </script>
      </body>
    </html>
  )
})

// RECORDING / STUDIO
app.get('/studio', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recording Studio Oxford | Engineer-Led Sessions | Cowley Road Studios</title>
    <meta name="description" content="Professional recording studio in Oxford. Engineer-led sessions from £30/hr at Cricket Road, £35/hr at Cowley Road. Independent studio infrastructure since 1999.">
    <meta name="keywords" content="recording studio oxford, music recording oxford, engineer led recording oxford, professional studio oxford, cowley road recording">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link href="/static/crs-reset.css" rel="stylesheet">
    <link href="/static/crs-typography.css" rel="stylesheet">
    <link href="/static/crs-header.css" rel="stylesheet">
    <link href="/static/crs-mobile.css" rel="stylesheet">
    <link href="/static/rack-accordion.css" rel="stylesheet">
</head>
<body>
    ${<RecordingPage />}
</body>
</html>`)
})

// ============================================================================
// CRS SERVICE PAGES — Clean minimal routes with accurate copy
// Palette: nettle green · mustard · off-white · signal red
// ============================================================================

const SERVICE_CSS = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link href="/static/crs-service-pages.css" rel="stylesheet" />
`

const SERVICE_TOPBAR = `
<nav class="sp-topbar" aria-label="Quick actions">
  <div class="sp-topbar-inner">
    <a href="/" class="sp-topbar-home">← CRS</a>
    <div class="sp-topbar-actions">
      <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--primary">Book Rehearsal</a>
      <a href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX" target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--primary">Book Recording</a>
      <a href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX"  target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--secondary">Hire Control Room</a>
      <a href="/contact?service=venue" class="sp-action-btn sp-action-btn--secondary">Venue Enquiries</a>
      <a href="/contact" class="sp-action-btn sp-action-btn--ghost">Contact</a>
    </div>
  </div>
</nav>`

const SERVICE_FOOTER = `
<footer class="sp-footer">
  <div class="sp-footer-inner">
    <span class="sp-footer-brand">Cowley Road Studios · Oxford · 118 Cowley Road OX4 1JE</span>
    <nav class="sp-footer-links" aria-label="Footer">
      <a href="/recording">Recording</a>
      <a href="/rehearsal">Rehearsal</a>
      <a href="/control-room">Control Room</a>
      <a href="/repairs">Repairs</a>
      <a href="/venue">Venue</a>
      <a href="/workshop-cafe">Café</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</footer>`

function servicePageHtml({
  title, description, keywords = '', slug, isCafe = false, content
}: {
  title: string; description: string; keywords?: string; slug: string; isCafe?: boolean; content: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Cowley Road Studios</title>
  <meta name="description" content="${description}" />
  ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
  <link rel="canonical" href="https://cowleyroadstudios.com/${slug}" />
  <link rel="icon" type="image/png" href="/crs-logo.png" />
  ${SERVICE_CSS}
</head>
<body>
<div class="sp-page${isCafe ? ' sp-page--cafe' : ''}">
  ${SERVICE_TOPBAR}
  ${content}
  ${SERVICE_FOOTER}
</div>
</body>
</html>`
}

// /recording
app.get('/recording', (c) => {
  return c.html(servicePageHtml({
    title: 'Recording Studio Oxford',
    description: 'Professional recording studio in Oxford. Hybrid analogue–digital signal path. SSL BiG SiX, valve compression, tape integration. Live room, 3 isolation booths.',
    keywords: 'recording studio oxford, music recording oxford, ssl big six oxford, professional studio oxford',
    slug: 'recording',
    content: `
<main class="sp-main">
  <header class="sp-page-header">
    <span class="sp-eyebrow">Recording Studio</span>
    <h1 class="sp-title">Professional recording in Oxford</h1>
    <p class="sp-lead">Hybrid analogue–digital signal path. SSL BiG SiX, valve compression, tape integration. Live room, 3 isolation booths, three-way monitoring. Both locations available to book.</p>
  </header>

  <div class="sp-content-grid">
    <div>
      <dl class="sp-spec-table">
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Console</dt>
          <dd class="sp-spec-val">SSL BiG SiX + valve compression</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Monitoring</dt>
          <dd class="sp-spec-val">Adam Audio · Yamaha NS-10 · Genelec + sub</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Mics</dt>
          <dd class="sp-spec-val">Neumann U87 · AKG C414 · SM7B · SM58</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Rooms</dt>
          <dd class="sp-spec-val">Live room + 3 isolation booths</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Location</dt>
          <dd class="sp-spec-val">Cowley Road, Oxford OX4 1JE</dd>
        </div>
      </dl>
    </div>

    <aside class="sp-cta-box">
      <span class="sp-cta-box-title">Book a session</span>
      <div class="sp-cta-list">
        <a href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn sp-cta-btn--primary">
          Book — Cowley Road <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn">
          Book — Cricket Road <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="/contact?service=recording" class="sp-cta-btn">
          Enquire <span class="sp-cta-btn-arrow">→</span>
        </a>
      </div>
    </aside>
  </div>
</main>`
  }))
})
// /rehearsal
app.get('/rehearsal', (c) => {
  return c.html(servicePageHtml({
    title: 'Rehearsal Rooms Oxford',
    description: 'Two rehearsal rooms in Oxford. Cowley Road for up to 4-piece bands. Cricket Road for larger groups — Yamaha grand piano, dedicated control room with Adam monitoring.',
    keywords: 'rehearsal rooms oxford, band rehearsal oxford, rehearsal space oxford, music rehearsal oxford',
    slug: 'rehearsal',
    content: `
<main class="sp-main">
  <header class="sp-page-header">
    <span class="sp-eyebrow">Rehearsal Rooms</span>
    <h1 class="sp-title">Two rooms. Both wired.</h1>
    <p class="sp-lead">Cowley Road for up to 4-piece bands — linked directly to the recording studio. Cricket Road for larger groups — bigger room, Yamaha grand piano, dedicated control room with Adam monitoring.</p>
  </header>

  <div class="sp-location-split">
    <div class="sp-location-card">
      <span class="sp-location-card-name">Cowley Road</span>
      <span class="sp-location-card-post">OX4 1JE</span>
      <ul class="sp-location-specs">
        <li>Up to 4-piece (expandable via booths)</li>
        <li>Full backline + PA</li>
        <li>Drum kit</li>
        <li>Linked to recording studio</li>
      </ul>
      <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
         target="_blank" rel="noopener noreferrer"
         class="sp-cta-btn sp-cta-btn--primary" style="display:flex;align-items:center;justify-content:space-between;margin-top:0.25rem">
        Book Rehearsal <span class="sp-cta-btn-arrow">→</span>
      </a>
    </div>

    <div class="sp-location-card">
      <span class="sp-location-card-name">Cricket Road</span>
      <span class="sp-location-card-post">OX4 3DJ</span>
      <ul class="sp-location-specs">
        <li>Up to 8 people</li>
        <li>6m × 4m live room</li>
        <li>Full backline + PA</li>
        <li>Yamaha CLP grand piano</li>
        <li>Dedicated control room — Adam Audio monitoring</li>
      </ul>
      <a href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX"
         target="_blank" rel="noopener noreferrer"
         class="sp-cta-btn sp-cta-btn--primary" style="display:flex;align-items:center;justify-content:space-between;margin-top:0.25rem">
        Book Rehearsal <span class="sp-cta-btn-arrow">→</span>
      </a>
    </div>
  </div>

  <div class="sp-note">
    Payment in full at booking. Cowley Road rehearsal includes access to live room and booths. Cricket Road is a standalone rehearsal facility with dedicated control room.
  </div>
</main>`
  }))
})

// /control-room
app.get('/control-room', (c) => {
  return c.html(servicePageHtml({
    title: 'Control Room Hire Oxford',
    description: 'Serious working control room in Oxford. SSL BiG SiX, TL Audio C1 valve, Revox preamps, Tascam 388, Ghielmetti patchbay. Three-way monitoring — Adam Audio, NS-10, Genelec.',
    keywords: 'control room hire oxford, ssl big six oxford, mixing studio oxford, recording control room oxford',
    slug: 'control-room',
    content: `
<main class="sp-main">
  <header class="sp-page-header">
    <span class="sp-eyebrow">Control Room Hire</span>
    <h1 class="sp-title">A serious working control room</h1>
    <p class="sp-lead">Mixing, tracking, writing sessions, attended playback. Hybrid signal chain — analogue warmth, digital precision. Mixes translate across three monitoring paths.</p>
  </header>

  <div class="sp-content-grid">
    <div>
      <dl class="sp-spec-table">
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Desk</dt>
          <dd class="sp-spec-val">SSL BiG SiX — analogue summing + EQ</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Processing</dt>
          <dd class="sp-spec-val">TL Audio C1 valve · Revox preamps · Tascam 388</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Patchbay</dt>
          <dd class="sp-spec-val">Ghielmetti mastering matrix</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Monitoring</dt>
          <dd class="sp-spec-val">Adam Audio · Yamaha NS-10 · Odro Schwank custom · Genelec + sub</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Cowley Road</dt>
          <dd class="sp-spec-val">Full recording studio access — live room + booths</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Cricket Road</dt>
          <dd class="sp-spec-val">Dedicated control room — separate from live room</dd>
        </div>
      </dl>
    </div>

    <aside class="sp-cta-box">
      <span class="sp-cta-box-title">Hire the control room</span>
      <div class="sp-cta-list">
        <a href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn sp-cta-btn--primary">
          Hire — Cowley Road <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn">
          Hire — Cricket Road <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="/contact" class="sp-cta-btn">
          Enquire <span class="sp-cta-btn-arrow">→</span>
        </a>
      </div>
    </aside>
  </div>
</main>`
  }))
})

// /repairs
app.get('/repairs', (c) => {
  return c.html(servicePageHtml({
    title: 'Electronics Repair & AV Support Oxford',
    description: 'Expert electronics repair and AV support in Oxford via ODRO Engineering. Guitar, bass, keyboard amps, vintage gear restoration, AV installation and event support.',
    keywords: 'electronics repair oxford, amp repair oxford, av services oxford, odro engineering oxford, guitar amp repair oxford',
    slug: 'repairs',
    content: `
<main class="sp-main">
  <header class="sp-page-header">
    <span class="sp-eyebrow">ODRO Engineering</span>
    <h1 class="sp-title">Electronics repair &amp; AV support</h1>
    <p class="sp-lead">Expert repair and servicing for musicians and venues across Oxford. We fix the gear that keeps the music scene running.</p>
  </header>

  <div class="sp-content-grid">
    <div>
      <dl class="sp-spec-table">
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Amps</dt>
          <dd class="sp-spec-val">Guitar, bass and keyboard amp repair</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Vintage</dt>
          <dd class="sp-spec-val">Restoration and servicing of classic gear</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">AV</dt>
          <dd class="sp-spec-val">Installation, maintenance, event support</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Based</dt>
          <dd class="sp-spec-val">Cowley Road, Oxford OX4 1JE</dd>
        </div>
      </dl>
    </div>

    <aside class="sp-cta-box">
      <span class="sp-cta-box-title">Get in touch</span>
      <div class="sp-cta-list">
        <a href="/contact?service=repairs"
           class="sp-cta-btn sp-cta-btn--primary">
          Request Repair / Support <span class="sp-cta-btn-arrow">→</span>
        </a>
      </div>
    </aside>
  </div>
</main>`
  }))
})

// /venue
app.get('/venue', (c) => {
  return c.html(servicePageHtml({
    title: 'Venue Hire Oxford — Workshop Café',
    description: 'Private hire, events and showcases at Workshop Café, Oxford. PA system, lighting, stage area. Flexible venue for performances, workshops and private hire.',
    keywords: 'venue hire oxford, workshop cafe oxford, private hire oxford, event space oxford, showcase venue oxford',
    slug: 'venue',
    content: `
<main class="sp-main">
  <header class="sp-page-header">
    <span class="sp-eyebrow">Venue Hire</span>
    <h1 class="sp-title">Private hire, events &amp; showcases</h1>
    <p class="sp-lead">Flexible venue hire at the Workshop Café. PA system, lighting, stage area. Live performances, showcases, workshops, private hire — enquiry only.</p>
  </header>

  <div class="sp-content-grid">
    <div>
      <dl class="sp-spec-table">
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Space</dt>
          <dd class="sp-spec-val">Workshop Café — flexible layout, ~40 seated / ~60 standing</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Tech</dt>
          <dd class="sp-spec-val">PA system · Lighting · Stage area</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Uses</dt>
          <dd class="sp-spec-val">Showcases · Workshops · Private hire · Launches</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Booking</dt>
          <dd class="sp-spec-val">Enquiry only — contact us to discuss</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Location</dt>
          <dd class="sp-spec-val">118 Cowley Road, Oxford OX4 1JE</dd>
        </div>
      </dl>
    </div>

    <aside class="sp-cta-box">
      <span class="sp-cta-box-title">Make an enquiry</span>
      <div class="sp-cta-list">
        <a href="/contact?service=venue"
           class="sp-cta-btn sp-cta-btn--primary">
          Venue Enquiry <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="/workshop-cafe" class="sp-cta-btn">
          About Workshop Café <span class="sp-cta-btn-arrow">→</span>
        </a>
      </div>
    </aside>
  </div>
</main>`
  }))
})

// /workshop-cafe — warm café mode
app.get('/workshop-cafe', (c) => {
  return c.html(servicePageHtml({
    title: 'Workshop Café Oxford',
    description: "Oxford's music community hub. Coffee, conversation, open mics and creative workspace. Part of Cowley Road Studios. Available for private hire.",
    keywords: 'workshop cafe oxford, coffee oxford, community space oxford, open mic oxford, east oxford cafe',
    slug: 'workshop-cafe',
    isCafe: true,
    content: `
<main class="sp-main">
  <div class="sp-cafe-hero">
    <img src="/static/workshop-cafe-logo.png" alt="Workshop Café" class="sp-cafe-hero-logo" />
    <div class="sp-cafe-hero-text">
      <span class="sp-eyebrow">Community Space</span>
      <h1 class="sp-title">Workshop Café</h1>
      <p class="sp-cafe-hero-tagline">More than a studio waiting room. Oxford's music community hub — coffee, conversation, open mics and creative workspace between sessions.</p>
    </div>
  </div>

  <div class="sp-cafe-cards">
    <div class="sp-cafe-card">
      <span class="sp-cafe-card-label">What</span>
      <p class="sp-cafe-card-text">Café, community space and creative hub</p>
    </div>
    <div class="sp-cafe-card">
      <span class="sp-cafe-card-label">Hire</span>
      <p class="sp-cafe-card-text">Private hire for gigs and workshops</p>
    </div>
    <div class="sp-cafe-card">
      <span class="sp-cafe-card-label">Events</span>
      <p class="sp-cafe-card-text">Open mic nights and community events</p>
    </div>
    <div class="sp-cafe-card">
      <span class="sp-cafe-card-label">Find us</span>
      <p class="sp-cafe-card-text">118 Cowley Road, Oxford OX4 1JE</p>
    </div>
  </div>

  <div class="sp-content-grid">
    <div>
      <dl class="sp-spec-table">
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Coffee</dt>
          <dd class="sp-spec-val">Speciality coffee and drinks</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Workspace</dt>
          <dd class="sp-spec-val">Creative workspace, drop-in welcome</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Events</dt>
          <dd class="sp-spec-val">Open mics, workshops, community evenings</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Private hire</dt>
          <dd class="sp-spec-val">~40 seated / ~60 standing — PA + lighting</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Supported by</dt>
          <dd class="sp-spec-val">Cowley Road Studios technical team</dd>
        </div>
      </dl>
    </div>

    <aside class="sp-cta-box">
      <span class="sp-cta-box-title">Get in touch</span>
      <div class="sp-cta-list">
        <a href="/contact?service=venue"
           class="sp-cta-btn sp-cta-btn--primary">
          Enquire About the Café <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="https://www.instagram.com/cowleyroadstudios/"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn">
          Follow on Instagram <span class="sp-cta-btn-arrow">→</span>
        </a>
      </div>
    </aside>
  </div>
</main>`
  }))
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
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.8125rem; line-height: 2; letter-spacing: 0.02em;">
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

// PODCAST & AV SERVICES
app.get('/av-services', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podcast Studio & AV Services Oxford | Cowley Road Studios</title>
    <meta name="description" content="Professional podcast studio hire and AV services in Oxford. £30/hr engineer-led recording, live sound installation, equipment repairs. Cricket Road & Cowley Road.">
    <meta name="keywords" content="podcast studio oxford, podcast recording oxford, av services oxford, live sound oxford, sound engineer oxford, equipment repair oxford">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link href="/static/crs-reset.css" rel="stylesheet">
    <link href="/static/crs-typography.css" rel="stylesheet">
    <link href="/static/crs-header.css" rel="stylesheet">
    <link href="/static/crs-mobile.css" rel="stylesheet">
    <link href="/static/rack-accordion.css" rel="stylesheet">
    <link href="/static/studio-rack-demo.css?v=5.10" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="hp-page subpage">
    ${<PodcastAVPage />}
</body>
</html>`)
})

// Add redirect for podcast
app.get('/podcast', (c) => c.redirect('/av-services'))

// REPAIRS (now part of main AV page, keep old route for SEO)
app.get('/av-services/repairs', (c) => c.redirect('/av-services'))

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

// WORKSHOP CAFÉ — CONTACT / HIRE ENQUIRY PAGE
app.get('/workshop-cafe/contact', (c) => {
  const service     = String(c.req.query('service') || 'private-hire').toLowerCase()
  const statusParam = String(c.req.query('status') || '').toLowerCase()
  const status      = statusParam === 'sent' || statusParam === 'error' ? statusParam : null

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hire Enquiry | The Workshop Café Oxford</title>
    <meta name="description" content="Enquire about private hire, events, workshops, and community use at The Workshop Café, 118 Cowley Road, Oxford. Part of Cowley Road Studios.">
    <meta name="keywords" content="workshop cafe hire oxford, venue hire east oxford, private event space oxford, workshop cafe contact">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link href="/static/crs-reset.css" rel="stylesheet">
    <link href="/static/crs-typography.css" rel="stylesheet">
    <link href="/static/crs-header.css" rel="stylesheet">
    <link href="/static/crs-mobile.css" rel="stylesheet">
    <link href="/static/rack-accordion.css" rel="stylesheet">
    <link href="/static/studio-rack-demo.css?v=5.33" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="hp-page subpage wsc-page">
    ${<WorkshopCafeContactPage initialService={service} status={status} />}
</body>
</html>`)
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
// SIGNAGE DISPLAY PAGE  —  pure kiosk, no site chrome
// ============================================================================
app.get('/live-display', (c) => {
  const sgdEntry    = CLIENT_MANIFEST['src/client/sgd-entry.tsx']
  const sgdJs       = sgdEntry ? `/static/${sgdEntry.file}` : null
  // vendor chunk — jsx-runtime is the shared chunk imported by sgd-entry
  const vendorEntry = CLIENT_MANIFEST['src/client/rack-entry.tsx']?.imports?.[0]
  const vendorJs    = vendorEntry
    ? `/static/${(CLIENT_MANIFEST as Record<string, {file: string}>)[vendorEntry]?.file ?? ''}`
    : null

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Live Display — Cowley Road Studios</title>
  <meta name="description" content="CRS live analogue signage display. Rack-mounted LED ticker, Oxford Dreaming Spires waveform. Workshop Café and Cowley Road Studios variants." />
  <meta name="robots" content="noindex" />
  <link rel="canonical" href="https://cowleyroadstudios.com/live-display" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />

  <!-- Fonts: JetBrains Mono for ticker + status bar -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

  <!-- Preload both sign images so transition is instant -->
  <link rel="preload" as="image" href="/static/signage/cowley-road-studios-rack-sign.png" />
  <link rel="preload" as="image" href="/static/signage/workshop-cafe-rack-sign.png" />

  <!-- Critical reset: fullscreen, no scroll, black bg -->
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%; height: 100%;
      overflow: hidden;
      background: #040804;
    }
    #sgd-root {
      width: 100%; height: 100%;
      min-height: 100vh;
    }
  </style>

  <!-- Design system CSS (sgd-* rules, custom properties) -->
  <link href="/static/studio-rack-demo.css" rel="stylesheet" />
</head>
<body>
  <div id="sgd-root"></div>
  ${vendorJs ? `<script type="module" src="${vendorJs}"></script>` : ''}
  ${sgdJs    ? `<script type="module" src="${sgdJs}"></script>`    : ''}
</body>
</html>`)
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
          <h1 class="section-title" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: clamp(2rem, 4vw, 3rem); color: var(--mustard); margin-bottom: 1rem; font-weight: 400; letter-spacing: 0.02em;">
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
                  \`<a href="\${event.bookingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background: var(--mustard); color: #000; text-decoration: none; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">→ BOOK</a>\` : '';
                
                return \`
                  <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem; margin-bottom: 1.5rem;">
                    <h4 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; margin-bottom: 0.5rem;">\${event.title}</h4>
                    <p style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.75rem; color: rgba(245, 245, 245, 0.7); margin-bottom: 0.75rem;">\${dateStr}\${timeStr ? ' · ' + timeStr : ''}</p>
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
      description: 'Get in touch about studio sessions, rehearsal space, AV services, or venue hire. Located in East Oxford. Email: info@crsoxford.com',
      keywords: 'contact crs, cowley road studios contact, recording studio oxford contact, book studio oxford'
    }
  )
})
// VENUE REDIRECT (removed - not ready for public launch)
app.get("/venue", (c) => c.redirect("/contact?service=venue"))

// ABOUT
app.get('/about', (c) => {
  return c.html(servicePageHtml({
    title: 'About Cowley Road Studios',
    description: 'Cowley Road Studios — grassroots creative infrastructure in Oxford since 1999 (formerly Soundworks Oxford). Recording, rehearsal, Workshop Café, ODRO Engineering.',
    keywords: 'about cowley road studios, soundworks oxford, recording studio oxford, oxford music infrastructure',
    slug: 'about',
    content: `
<main class="sp-main">
  <header class="sp-page-header">
    <span class="sp-eyebrow">About CRS</span>
    <h1 class="sp-title">Grassroots creative infrastructure</h1>
    <p class="sp-lead">Cowley Road Studios has been part of Oxford's independent music scene since 1999, formerly operating as Soundworks Oxford. Engineer-led, community-focused.</p>
  </header>

  <div class="sp-content-grid">
    <div>
      <dl class="sp-spec-table">
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Founded</dt>
          <dd class="sp-spec-val">1999 — formerly Soundworks Oxford</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Location</dt>
          <dd class="sp-spec-val">118 Cowley Road, Oxford OX4 1JE</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Also</dt>
          <dd class="sp-spec-val">Cricket Road, Oxford OX4 3DJ</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Services</dt>
          <dd class="sp-spec-val">Recording · Rehearsal · Control room · Repairs · Venue hire</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Engineering</dt>
          <dd class="sp-spec-val">ODRO Engineering — AV support and repair</dd>
        </div>
        <div class="sp-spec-row">
          <dt class="sp-spec-key">Community</dt>
          <dd class="sp-spec-val">Workshop Café — open mics, events, workspace</dd>
        </div>
      </dl>
    </div>

    <aside class="sp-cta-box">
      <span class="sp-cta-box-title">Get in touch</span>
      <div class="sp-cta-list">
        <a href="/contact" class="sp-cta-btn sp-cta-btn--primary">
          Contact CRS <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn">
          Find us on Maps <span class="sp-cta-btn-arrow">→</span>
        </a>
        <a href="https://www.instagram.com/cowleyroadstudios/"
           target="_blank" rel="noopener noreferrer"
           class="sp-cta-btn">
          Instagram <span class="sp-cta-btn-arrow">→</span>
        </a>
      </div>
    </aside>
  </div>
</main>`
  }))
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
  const service = String(c.req.query('service') || 'general').toLowerCase()
  const statusParam = String(c.req.query('status') || '').toLowerCase()
  const status = statusParam === 'sent' || statusParam === 'error' ? statusParam : null

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Cowley Road Studios | Recording Studio Oxford</title>
    <meta name="description" content="Get in touch about studio sessions, rehearsal space, AV services, venue hire, or repairs. Two Oxford locations. Direct booking routes. Email: info@crsoxford.com">
    <meta name="keywords" content="contact crs, cowley road studios contact, recording studio oxford contact, book studio oxford">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link href="/static/crs-reset.css" rel="stylesheet">
    <link href="/static/crs-typography.css" rel="stylesheet">
    <link href="/static/crs-header.css" rel="stylesheet">
    <link href="/static/crs-mobile.css" rel="stylesheet">
    <link href="/static/rack-accordion.css" rel="stylesheet">
    <link href="/static/studio-rack-demo.css?v=5.10" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="hp-page subpage">
    ${<ContactPage initialService={service} status={status} />}
</body>
</html>`)
})

// BOOKING CONFIRMED PAGE
// Post-Square redirect: Static confirmation page
app.get('/booking-confirmed', (c) => {
  return c.render(
    <>
      <BuildStatusBanner />
      <Header />
      <BookingConfirmed />
      <Footer />
    </>,
    {
      title: 'Booking Confirmed | Cowley Road Studios',
      description: 'Your booking at Cowley Road Studios is confirmed. Check your email for booking details and access information.',
      keywords: 'booking confirmed, cowley road studios booking, studio booking confirmation'
    }
  )
})

// RACK CONSOLE — REASON DAW-STYLE INTERFACE
// Testbed for rack UI: Video backgrounds, QR codes, LED status
app.get('/rack', (c) => {
  return c.render(
    <>
      <Header />
      <RackPage />
      <Footer />
    </>,
    {
      title: 'CRS Studio Network | Cowley Road Studios',
      description: 'CRS Studio Network: Signal routing, booking surface, system status. Hardware-inspired interface.',
      keywords: 'studio network, booking, cowley road studios, signal routing'
    }
  )
})

// RACK TEST — STRUCTURAL ASSEMBLY SANDBOX
// Isolated test route for 19-inch rack interface development
app.get('/rack-test', (c) => {
  return c.render(
    <RackTestPage />,
    {
      title: 'CRS Rack Test | Structural Assembly',
      description: 'Test environment for 19-inch equipment rack interface',
      keywords: 'rack test, studio equipment, structural assembly'
    }
  )
})

// STUDIO RACK DEMO — REACT ISLAND
app.get('/studio-rack-demo', (c) => {
  const manifestEntry = CLIENT_MANIFEST['src/client/rack-entry.tsx']
  const jsAsset = `/static/${manifestEntry.file}`
  const cssAsset = manifestEntry.css ? `/static/${manifestEntry.css[0]}` : null
  const vendorEntry2 = manifestEntry.imports?.[0]
  const vendorAsset2 = vendorEntry2
    ? `/static/${(CLIENT_MANIFEST as Record<string, {file: string}>)[vendorEntry2]?.file ?? ''}`
    : null

  // Server-render the React component
  const rackHtml = renderToString(createElement(StudioServicesRack))
  
  return c.html(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Studio Services | Cowley Road Studios</title>
  <meta name="description" content="Book recording, rehearsal, and control room sessions" />
  <meta name="keywords" content="studio booking, recording sessions, rehearsal rooms" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- LCP preload -->
  <link rel="preload" as="image" href="/static/crs-logo.png" fetchpriority="high" />
  
  <!-- Hardware Physics CSS -->
  <link href="/static/studio-rack-demo.css" rel="stylesheet" />
  
  <!-- Fonts — non-blocking (v5.18) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /></noscript>

  ${vendorAsset2 ? `<link rel="modulepreload" href="${vendorAsset2}" />` : ''}
</head>
<body>
  <div id="studio-rack-root">${rackHtml}</div>
  
  <!-- React Island: vendor first -->
  ${vendorAsset2 ? `<script type="module" src="${vendorAsset2}"></script>` : ''}
  <script type="module" src="${jsAsset}"></script>
  
  <!-- ODRO Modal Trigger -->
  <script>
    window.addEventListener('OPEN_ODRO_MODAL', function() {
      var modal = document.getElementById('odro-terms-modal');
      if (modal) modal.classList.remove('hidden');
    });
  </script>
</body>
</html>`
  )
})

// RACK VARIANTS — HARDWARE REALISM WITH VISUAL HIERARCHY
// Enhanced modular rack with command/rack/passive variants
// Mission: Bring the rack to life (tactile, styled, variant-aware)
app.get('/rack-variants', (c) => {
  return c.render(
    <>
      <link href="/static/rack-variants-hardware.css" rel="stylesheet" />
      <RackModularEnhanced />
      <script src="/static/rack-dropdown.js" defer></script>
    </>,
    {
      title: 'CRS Rack Variants | Hardware Realism',
      description: 'Modular rack interface with visual variants - command, rack, and passive. Hardware-inspired design with tactile interactions.',
      keywords: 'rack modules, hardware ui, studio equipment, variant system'
    }
  )
})

// RACK ACCORDION — Hardware Rack with Expandable Modules
// Click any module to expand it, others stay collapsed
// Pure hardware aesthetic with LED indicators
app.get('/rack-accordion', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recording Studio & Rehearsal Rooms Oxford | Cowley Road Studios</title>
        <meta name="description" content="Independent recording studio, rehearsal rooms and engineer-led sessions in Oxford. Formerly Soundworks Oxford (1999–2024). Book rehearsal, recording, or creative workspace." />
        <meta name="keywords" content="recording studio oxford, rehearsal space oxford, cowley road studios, soundworks oxford, music production oxford" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Core CSS files from homepage */}
        <link href="/static/crs-reset.css" rel="stylesheet" />
        <link href="/static/crs-typography.css" rel="stylesheet" />
        <link href="/static/crs-header.css" rel="stylesheet" />
        <link href="/static/crs-footer.css" rel="stylesheet" />
        <link href="/static/crs-map-embed.css" rel="stylesheet" />
        <link href="/static/crs-mobile.css" rel="stylesheet" />
        
        {/* Accordion-specific CSS */}
        <link href="/static/rack-accordion.css" rel="stylesheet" />
      </head>
      <body>
        <RackAccordion />
        
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Cowley Road Studios",
            "description": "Independent recording studio and rehearsal facility in Oxford. Formerly Soundworks Oxford (1999–2024). Engineer-led recording, professional rehearsal rooms, repair services, and creative workspace hire.",
            "image": "https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "118 Cowley Road",
              "addressLocality": "Oxford",
              "postalCode": "OX4 1JE",
              "addressCountry": "GB"
            },
            "telephone": "+441865722027",
            "email": "info@crsoxford.com",
            "url": "https://cowleyroadstudios.com",
            "priceRange": "££",
            "areaServed": "Oxford",
            "sameAs": [
              "https://instagram.com/cowleyroadstudios.ox"
            ]
          })}
        </script>
      </body>
    </html>
  );
})

// PHOTO GALLERY - View all location photos
app.get('/photos', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRS Location Photos</title>
        <style>{`
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0a0a0a;
            color: #fff;
            padding: 2rem;
            margin: 0;
          }
          h1 {
            color: #00ff88;
            text-align: center;
          }
          .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
          }
          .photo-card {
            background: #1a1a1a;
            border: 2px solid rgba(153,204,153,0.3);
            border-radius: 8px;
            padding: 1rem;
            transition: transform 0.2s;
          }
          .photo-card:hover {
            transform: translateY(-4px);
            border-color: rgba(153,204,153,0.6);
          }
          .photo-card h3 {
            color: #00ff88;
            margin-top: 0;
            font-size: 18px;
          }
          .photo-card img {
            width: 100%;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .photo-info {
            margin-top: 0.5rem;
            font-size: 12px;
            color: rgba(255,255,255,0.6);
          }
          @media (max-width: 768px) {
            .gallery {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </head>
      <body>
        <h1>📸 CRS Location Photos Available</h1>
        
        <div class="gallery">
          <div class="photo-card">
            <h3>🎸 Cowley Rehearsal</h3>
            <img src="/static/machined-assets/cowley-rehearsal-optimized.webp" alt="Cowley Rehearsal" />
            <div class="photo-info">cowley-rehearsal-optimized.webp (56KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>🎸 Cricket Rehearsal</h3>
            <img src="/static/machined-assets/cricket-rehearsal-optimized.webp" alt="Cricket Rehearsal" />
            <div class="photo-info">cricket-rehearsal-optimized.webp (29KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>🎛️ Cowley Control Room (Pods)</h3>
            <img src="/static/machined-assets/cowley-pods-rack.webp" alt="Cowley Control Room" />
            <div class="photo-info">cowley-pods-rack.webp (114KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>🎛️ Cricket Control Room</h3>
            <img src="/static/machined-assets/cricket-control-room-optimized.webp" alt="Cricket Control Room" />
            <div class="photo-info">cricket-control-room-optimized.webp (29KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>☕ Workshop Café</h3>
            <img src="/static/machined-assets/workshop-cafe-optimized.webp" alt="Workshop Café" />
            <div class="photo-info">workshop-cafe-optimized.webp (169KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>📞 Contact/Patchbay</h3>
            <img src="/static/machined-assets/contact-patchbay-rack.webp" alt="Contact Patchbay" />
            <div class="photo-info">contact-patchbay-rack.webp (74KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>🎸 Cricket Rehearsal (Alt - Magenta)</h3>
            <img src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp" alt="Cricket Rehearsal Magenta" />
            <div class="photo-info">cricket-rehearsal-magenta-optimized.webp (52KB)</div>
          </div>
          
          <div class="photo-card">
            <h3>🎛️ Master Bus</h3>
            <img src="/static/machined-assets/master-bus-ch7-optimized.webp" alt="Master Bus" />
            <div class="photo-info">master-bus-ch7-optimized.webp (134KB)</div>
          </div>
        </div>
      </body>
    </html>
  );
})

// RACK MODULAR — PHASE 4: HARDWARE CHANNEL SELECTOR SYSTEM
// Single expandable rack with hardware aesthetics (console metaphor)
// CONSOLE INTERFACE — Hardware Control Surface (No Global Layout)
// Pure console UI with zero website chrome
// Uses c.html() to bypass global layout and theme CSS
app.get('/rack-modular', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <title>CRS Rack Console | Cowley Road Studios</title>
        <meta name="description" content="Hardware-style console interface for Cowley Road Studios. Professional recording studios and rehearsal spaces in Oxford." />
        
        {/* Minimal fonts for console UI */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* ONLY Console CSS - Final Art Direction Pass */}
        <link href="/static/rack-console-final.css" rel="stylesheet" />
        
        {/* Minimal reset for console */}
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0a0a0a;
            color: #fff;
            overflow-x: hidden;
          }
        `}</style>
      </head>
      <body>
        <RackModular />
        <script src="/static/rack-channel-system.js" defer></script>
        <script src="/static/booking-wizard.js" defer></script>
      </body>
    </html>
  )
})

// DIGITAL PULSE — FUNDERS LANDING PAGE
// Professional grassroots infrastructure pitch for funding partners
app.get('/digital-pulse', (c) => {
  return c.render(
    <DigitalPulsePage />,
    {
      title: 'Digital Pulse | Grassroots Infrastructure Funding',
      description: 'Cowley Road Studios is the hardware running Oxford\'s creative software. Partner with us to repair the infrastructure that keeps culture alive.',
      keywords: 'digital pulse, grassroots funding, arts infrastructure, community technology, oxford'
    }
  )
})

// SIGNAGE V2 — YODECK / KIOSK DISPLAY
// Self-contained: zero website CSS/JS. Route: /signage-v2
// Text scaled ×1.333 vs source. Safe to tune in Yodeck at any viewport.
app.get('/signage-v2', (c) => {
  return c.html(`<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CRS Signage V2</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/static/signage/signage-v2.css" />
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand-lockup" aria-label="Cowley Road Studios brand mark">
        <div class="brand-mark">
          <span>CR</span>
          <span>S</span>
        </div>
        <div class="brand-copy">
          <span class="brand-name">Cowley Road Studios</span>
          <span class="brand-sub">Oxford creative infrastructure</span>
        </div>
      </div>
      <div class="system-strip">
        <span class="signal-dot" aria-hidden="true"></span>
        <span id="system-status">Channel live · reel online</span>
      </div>
      <div class="reel-chip">
        <span>Reel</span>
        <strong id="reel-name">CRS Core</strong>
      </div>
    </header>

    <main class="stage" id="stage" aria-live="polite"></main>

    <aside class="side-panel">
      <div class="side-card side-card--meta">
        <span class="side-label">Current focus</span>
        <div id="focus-title" class="side-title"></div>
        <div id="focus-copy" class="side-copy"></div>
      </div>
      <div class="side-card side-card--queue">
        <div class="queue-head">
          <span class="side-label">Slide queue</span>
          <span id="slide-counter" class="side-meta"></span>
        </div>
        <div id="slide-queue" class="slide-queue"></div>
      </div>
    </aside>

    <nav class="controls" aria-label="Slide controls">
      <button class="control-btn" id="prev-btn" type="button" aria-label="Previous slide">←</button>
      <div id="dots" class="dots" aria-label="Slide navigation"></div>
      <button class="control-btn" id="next-btn" type="button" aria-label="Next slide">→</button>
    </nav>

    <footer class="ticker-wrap" aria-label="Service ticker">
      <div class="ticker-track" id="ticker-track"></div>
    </footer>
  </div>

  <script>
  (function () {
    /* ── CONTENT ─────────────────────────────────────────────── */
    const tickerItems = [
      'Recording Studio Oxford',
      'Rehearsal Rooms',
      'Control Room Hire',
      'Cowley Road OX4 1JE',
      'Cricket Road OX4 3DJ',
      'ODRO Engineering Repairs',
      'AV Support',
      'Workshop Café Bookings Open Now',
      'Regular Opening Very Soon',
      'cowleyroadstudios.com'
    ];

    const slides = [
      {
        id: 'hero',
        kicker: 'Oxford creative infrastructure',
        title: 'Cowley Road Studios',
        subtitle: 'Recording studio · rehearsal rooms · creative production',
        status: 'Live now',
        meta: ['Cowley Road OX4 1JE', 'Cricket Road OX4 3DJ'],
        body: 'The stronghold on Cowley Road: professional recording, wired rehearsal, technical support, and a public-facing creative ecosystem under one banner.',
        bullets: ['Bookable now', 'Two Oxford locations', 'Built for artists, bands and makers'],
        accent: 'gold',
        footer: 'Grounded in the live CRS offer, not just the future promise.'
      },
      {
        id: 'recording',
        kicker: 'Studio reel',
        title: 'Professional Recording',
        subtitle: 'Analogue character · digital precision',
        status: 'Sessions active',
        meta: ['SSL BiG SiX', 'Valve compression', 'Hybrid workflow'],
        body: 'A proper Oxford recording setup with control room weight and enough edge to feel like a real record is being made, not just a laptop politely humming in a corner.',
        bullets: ['Tracking', 'Production', 'Control room hire'],
        accent: 'olive',
        footer: 'Lead with capability. Let the atmosphere ride shotgun.'
      },
      {
        id: 'rehearsal',
        kicker: 'Band infrastructure',
        title: 'Rehearsal Rooms',
        subtitle: 'Two rooms · both wired · both useful',
        status: 'Book now',
        meta: ['Cowley Road: up to 4-piece', 'Cricket Road: larger groups', 'Backline + PA'],
        body: 'Cowley Road links directly into the recording setup. Cricket Road gives bigger groups breathing space, piano access, and a dedicated control room environment.',
        bullets: ['Drum kit', 'Yamaha piano', 'Adam monitoring'],
        accent: 'slate',
        footer: 'Public signage should sell the practical magic.'
      },
      {
        id: 'services',
        kicker: 'Technical backbone',
        title: 'ODRO Engineering',
        subtitle: 'Repairs · AV support · technical services',
        status: 'Enquiries open',
        meta: ['Amp repair', 'Venue support', 'Installations'],
        body: 'CRS is more than rooms. It is infrastructure: repair, live support, and the kind of practical know-how that keeps creative spaces actually functioning.',
        bullets: ['General enquiries', 'Venue hire support', 'Production assistance'],
        accent: 'amber',
        footer: 'Hard graft, good signal, no chaos.'
      },
      {
        id: 'cafe',
        kicker: 'Public-facing venue',
        title: 'Workshop Café',
        subtitle: 'Community space · café · small venue',
        status: 'Bookings open now',
        meta: ['Regular opening very soon', 'Private hire', 'Cowley Road ecosystem'],
        body: 'The café now steps forward as a live branch of the system: available for bookings now, with regular opening rhythm imminent. Less prophecy. More pulse.',
        bullets: ['Coffee', 'Meetings', 'Events and hires'],
        accent: 'gold',
        footer: 'Keep the poetry. Add a door people can actually walk through.'
      },
      {
        id: 'legacy',
        kicker: 'Since 1999',
        title: 'Soundworks to CRS',
        subtitle: 'Same commitment · expanded infrastructure',
        status: 'Legacy carried forward',
        meta: ['Oxford music scene', 'Community-rooted', 'New name, wider scope'],
        body: 'This is not a costume change. It is the Soundworks lineage carrying on with more rooms, more capability, and a broader public presence.',
        bullets: ['Grassroots credibility', 'Professional standard', 'Future-proof direction'],
        accent: 'olive',
        footer: 'Heritage earns trust faster than adjectives.'
      },
      {
        id: 'cta',
        kicker: 'Call to action',
        title: 'Book Online',
        subtitle: 'Recording · rehearsal · venue hire',
        status: 'Scan to enter',
        meta: ['cowleyroadstudios.com', 'QR live', 'Oxford HQ operational'],
        body: 'Use the website for bookings and contact routes. Keep the public path simple: see it, scan it, book it.',
        bullets: ['Recording sessions', 'Rehearsals', 'Workshop Café enquiries'],
        accent: 'amber',
        footer: 'A handsome screen should still know how to convert.'
      }
    ];

    /* ── DOM REFS ─────────────────────────────────────────────── */
    const stage       = document.getElementById('stage');
    const dots        = document.getElementById('dots');
    const prevBtn     = document.getElementById('prev-btn');
    const nextBtn     = document.getElementById('next-btn');
    const slideQueue  = document.getElementById('slide-queue');
    const slideCounter= document.getElementById('slide-counter');
    const focusTitle  = document.getElementById('focus-title');
    const focusCopy   = document.getElementById('focus-copy');
    const reelName    = document.getElementById('reel-name');
    const systemStatus= document.getElementById('system-status');
    const tickerTrack = document.getElementById('ticker-track');

    const ROTATE_MS = 9000;
    let activeIndex = 0;
    let autoAdvance;

    function metaItems(items) {
      return items.map(i => '<span class="meta-chip">' + i + '</span>').join('');
    }
    function bulletItems(items) {
      return items.map(i => '<li class="bullet-item"><span class="bullet-mark"></span><span>' + i + '</span></li>').join('');
    }

    function slideTemplate(slide) {
      const isCTA = slide.id === 'cta';
      const side = isCTA
        ? '<div class="qr-card"><img src="/static/signage/qr-cowleyroadstudios.svg" alt="QR code to cowleyroadstudios.com" class="qr-image" /><div class="qr-copy"><span class="qr-overline">Scan here</span><strong>cowleyroadstudios.com</strong><span>Recording · rehearsal · venue hire · Workshop Café</span></div></div>'
        : '<div class="quote-card"><span class="quote-label">Signal line</span><p>' + slide.footer + '</p></div>';
      return (
        '<article class="slide slide--' + slide.accent + (isCTA ? ' slide--cta' : '') + '">' +
          '<div class="slide-backdrop"></div>' +
          '<div class="slide-grid">' +
            '<section class="slide-main">' +
              '<div class="eyebrow-row">' +
                '<span class="eyebrow">' + slide.kicker + '</span>' +
                '<span class="status-pill">' + slide.status + '</span>' +
              '</div>' +
              '<h1 class="slide-title">' + slide.title + '</h1>' +
              '<p class="slide-subtitle">' + slide.subtitle + '</p>' +
              '<div class="meta-row">' + metaItems(slide.meta) + '</div>' +
              '<p class="slide-body">' + slide.body + '</p>' +
              '<ul class="bullet-list">' + bulletItems(slide.bullets) + '</ul>' +
            '</section>' +
            '<section class="slide-side' + (isCTA ? ' slide-side--qr' : '') + '">' + side + '</section>' +
          '</div>' +
        '</article>'
      );
    }

    function renderSlide(index) {
      const slide = slides[index];
      stage.innerHTML = slideTemplate(slide);
      focusTitle.textContent = slide.title;
      focusCopy.textContent  = slide.subtitle + ' — ' + slide.status;
      slideCounter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      reelName.textContent   = slide.id === 'cafe' ? 'Workshop Signal' : 'CRS Core';
      systemStatus.textContent = slide.status + ' · reel online';
      Array.from(dots.children).forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
      Array.from(slideQueue.children).forEach(function (item, i) {
        item.classList.toggle('is-active', i === index);
      });
    }

    function buildDots() {
      dots.innerHTML = slides.map(function (slide, i) {
        return '<button class="dot ' + (i === 0 ? 'is-active' : '') + '" type="button" aria-label="Go to ' + slide.title + '" data-index="' + i + '"></button>';
      }).join('');
    }

    function buildQueue() {
      slideQueue.innerHTML = slides.map(function (slide, i) {
        return '<button class="queue-item ' + (i === 0 ? 'is-active' : '') + '" type="button" data-index="' + i + '"><span class="queue-index">' + String(i + 1).padStart(2, '0') + '</span><span class="queue-title">' + slide.title + '</span></button>';
      }).join('');
    }

    function buildTicker() {
      const items = tickerItems.concat(tickerItems);
      const markup = items.map(function (item) { return '<span class="ticker-item">' + item + '</span>'; }).join('');
      tickerTrack.innerHTML = '<div class="ticker-marquee">' + markup + '</div>';
    }

    function goToSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      renderSlide(activeIndex);
      resetAutoAdvance();
    }
    function nextSlide() { goToSlide(activeIndex + 1); }
    function prevSlide() { goToSlide(activeIndex - 1); }
    function resetAutoAdvance() {
      clearInterval(autoAdvance);
      autoAdvance = setInterval(nextSlide, ROTATE_MS);
    }

    function wireEvents() {
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      dots.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-index]');
        if (btn) goToSlide(Number(btn.dataset.index));
      });
      slideQueue.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-index]');
        if (btn) goToSlide(Number(btn.dataset.index));
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft')  prevSlide();
        if (e.key === ' ') { e.preventDefault(); resetAutoAdvance(); }
      });
    }

    buildDots();
    buildQueue();
    buildTicker();
    renderSlide(0);
    wireEvents();
    resetAutoAdvance();
  })();
  </script>
</body>
</html>`)
})

// SIGNAGE TERMINAL — DIGITAL BROADCAST MODE (55" Street Display)
// Managed by routes/signage.tsx (already registered at line 359)

// SIGNAGE LOOP — BROADCAST ENGINE (Yodeck Kiosk Mode)
// Auto-cycling slideshow of all Elite Signage Components
// 10-second intervals with fade transitions and burn-in protection
app.get('/signage-loop', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage Loop | Broadcast Mode</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="/static/crs-ghost-chassis.css" rel="stylesheet" />
        <style>{`
          body { 
            margin: 0; 
            padding: 0; 
            overflow: hidden; 
            background: #000;
          }
        `}</style>
      </head>
      <body>
        <SignageLoop />
      </body>
    </html>
  )
})

// REHEARSAL SPACES PAGE
app.get('/rehearsal', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rehearsal Rooms Oxford | Cowley Road Studios</title>
        <meta name="description" content="Professional rehearsal rooms in Oxford. Cowley Road live room. 2 hrs £40. Independent access. Book online." />
        <meta name="keywords" content="rehearsal space oxford, band rehearsal oxford, music rehearsal oxford, practice room oxford" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Core CSS files */}
        <link href="/static/crs-reset.css" rel="stylesheet" />
        <link href="/static/crs-typography.css" rel="stylesheet" />
        <link href="/static/crs-header.css" rel="stylesheet" />
        <link href="/static/crs-mobile.css" rel="stylesheet" />
        
        {/* Accordion-specific CSS */}
        <link href="/static/rack-accordion.css" rel="stylesheet" />
      </head>
      <body>
        <RehearsalSpaces />
      </body>
    </html>
  )
})

// ===================================================================
// LEGACY ROUTE CLEANUP - Redirect old pages to accordion design
// ===================================================================

// Old service pages → Homepage accordion
app.get('/studio-old', (c) => c.redirect('/'))
app.get('/workshop-cafe-old', (c) => c.redirect('/'))
app.get('/cricket-road-old', (c) => c.redirect('/'))
app.get('/crs-cowley-road-old', (c) => c.redirect('/'))
app.get('/crs-cricket-road-old', (c) => c.redirect('/'))
app.get('/locations-old', (c) => c.redirect('/'))
// '/rehearsal' now shows dedicated RehearsalSpaces page

// Old booking pages → New /book accordion
app.get('/book/studio-old', (c) => c.redirect('/book'))
app.get('/book/rehearsal-old', (c) => c.redirect('/book'))
app.get('/book/rehearsal/cowley-road-old', (c) => c.redirect('/book'))
app.get('/book/rehearsal/cricket-road-old', (c) => c.redirect('/book'))
app.get('/book/lessons-old', (c) => c.redirect('/book'))
app.get('/book/mixdown-old', (c) => c.redirect('/book'))
app.get('/book/tape-old', (c) => c.redirect('/book'))
app.get('/book/hire-old', (c) => c.redirect('/book'))
app.get('/book/repairs-old', (c) => c.redirect('/book'))
app.get('/book-old', (c) => c.redirect('/book'))

app.get('/terms', (c) => c.redirect('/policies/terms.html', 302))
app.get('/privacy', (c) => c.redirect('/policies/privacy.html', 302))
app.get('/cancellation', (c) => c.redirect('/policies/cancellation.html', 302))

export default app
