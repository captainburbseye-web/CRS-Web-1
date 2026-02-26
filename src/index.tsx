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
import { SignagePage } from './pages/Signage'
import { SignageLoop } from './pages/SignageLoop'
import { SignageSignal } from './pages/SignageSignal'
import { SignageSignalEnhanced } from './pages/SignageSignalEnhanced'
import { SignageEnhanced } from './pages/SignageEnhanced'
import { SignageEnhancedV3 } from './pages/SignageEnhancedV3'
import { SignageV4 } from './pages/SignageV4'
import { SignageRewrite } from './pages/SignageRewrite'
import { SignageEnhancedV2 } from './pages/SignageEnhancedV2'
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
import { DigitalPulsePage } from './pages/DigitalPulse'

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

// ============================================
// API ROUTES - Signage Automation System
// ============================================

// Health check endpoint (every 5 minutes)
app.get('/api/health', async (c) => {
  try {
    const { healthCheck } = await import('./services/signageScheduler');
    const health = healthCheck();
    
    return c.json(health, health.status === 'healthy' ? 200 : 500);
  } catch (error) {
    return c.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
})

// Get current signage schedule
app.get('/api/signage/schedule', async (c) => {
  try {
    const { getScheduleResult } = await import('./services/signageScheduler');
    const schedule = getScheduleResult();
    
    return c.json(schedule);
  } catch (error) {
    return c.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
})

// Get pricing data
app.get('/api/pricing', async (c) => {
  try {
    const { getPricing } = await import('./services/signageScheduler');
    const pricing = getPricing();
    
    return c.json(pricing);
  } catch (error) {
    return c.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
})

// Get events data
app.get('/api/events', async (c) => {
  try {
    const { getEvents } = await import('./services/signageScheduler');
    const events = getEvents();
    
    return c.json(events);
  } catch (error) {
    return c.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
})

// Get offers data
app.get('/api/offers', async (c) => {
  try {
    const { getOffers } = await import('./services/signageScheduler');
    const offers = getOffers();
    
    return c.json(offers);
  } catch (error) {
    return c.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
})

// QR code redirect with logging (/q shortlink)
app.get('/q', async (c) => {
  try {
    const { getScheduleResult } = await import('./services/signageScheduler');
    const schedule = getScheduleResult();
    
    // TODO: Log scan to KV/analytics
    // await c.env.KV.put(`scan:${Date.now()}`, JSON.stringify({...}))
    
    // Determine destination based on time/scene
    const destination = 'https://cowleyroadstudios.com/book'; // Default
    
    return c.redirect(destination, 302);
  } catch (error) {
    return c.redirect('https://cowleyroadstudios.com', 302);
  }
})

// SITEMAP.XML - SEO sitemap for search engines
app.get('/sitemap.xml', (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cowleyroadstudios.com/</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/about</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/recording-studio-oxford</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/rehearsal-rooms-oxford</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/av-services-oxford</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/av-services/repairs</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/venue-hire-oxford</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/workshop-cafe</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/contact</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://cowleyroadstudios.com/rack</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`
  
  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml; charset=utf-8'
  })
})

// ROBOTS.TXT - Crawler directives
app.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://cowleyroadstudios.com/sitemap.xml`
  
  return c.text(robots, 200, {
    'Content-Type': 'text/plain; charset=utf-8'
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
      from: 'CRS Contact Form <noreply@crsoxford.com>',
      to: ['info@crsoxford.com'],
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

// REDIRECTS & MISSING PAGES
app.get('/av', (c) => c.redirect('/av-services'))

// UNIFIED BOOKING PAGE (Phase 2: Simplified 3-category booking)
app.get('/book', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Book Your Session | Cowley Road Studios Oxford</title>
        <meta name="description" content="Book rehearsal rooms, recording sessions, music lessons, equipment hire, and venue space. Choose your service and book instantly." />
        <meta name="keywords" content="book studio oxford, recording session booking, rehearsal room booking, music lessons oxford, equipment hire oxford" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        
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
            <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" target="_blank" rel="noopener noreferrer" class="crs-button mono">Book rehearsal — Cowley Road</a>
            <p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.65); margin-top: 0.75rem; text-align: center;">£45 / 2 hours · Rehearsal use only</p>
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
// ROOT: HARDWARE RACK CONSOLE (Hardware-first landing page)
app.get('/', (c) => {
  return c.render(
    <>
      <RackAccordion />
      
      {/* Structured data for SEO - Enhanced LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "MusicVenue", "Organization"],
          "name": "Cowley Road Studios",
          "alternateName": ["CRS", "Formerly Soundworks Oxford"],
          "description": "Independent recording studio and rehearsal facility in Oxford. Formerly Soundworks Oxford (1999–2024). Engineer-led recording, professional rehearsal rooms, repair services, and creative workspace hire.",
          "image": "https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png",
          "logo": "https://pub-991d8d2677374c528678829280f50c98.r2.dev/transparentMaster%20Rack%20Header.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "118 Cowley Road",
            "addressLocality": "Oxford",
            "addressRegion": "Oxfordshire",
            "postalCode": "OX4 1JE",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "51.7466",
            "longitude": "-1.2384"
          },
          "telephone": "+441865722027",
          "email": "info@crsoxford.com",
          "url": "https://cowleyroadstudios.com",
          "priceRange": "££",
          "areaServed": {
            "@type": "City",
            "name": "Oxford",
            "containedInPlace": {
              "@type": "Country",
              "name": "United Kingdom"
            }
          },
          "sameAs": [
            "https://instagram.com/cowleyroadstudios.ox",
            "https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Studio Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Recording Studio Sessions",
                  "description": "Professional recording, mixing, and mastering services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Rehearsal Room Hire",
                  "description": "Fully equipped rehearsal spaces",
                  "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": "45",
                    "highPrice": "65",
                    "priceCurrency": "GBP"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Equipment Repair",
                  "description": "AV and instrument repair services by ODRO Engineering"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Workshop Café",
                  "description": "Coffee, coworking, and creative space"
                }
              }
            ]
          },
          "founder": {
            "@type": "Organization",
            "name": "ODRO Engineering"
          },
          "foundingDate": "2024",
          "slogan": "No Chaos Policy – Professional recording and rehearsal in Oxford"
        })}
      </script>
      
      <link href="/static/rack-accordion.css" rel="stylesheet" />
      <link href="/static/odro-repair-hotspots.css" rel="stylesheet" />
      <link href="/static/rack-panel-mechanical-press.css" rel="stylesheet" />
      <script src="/static/odro-repair-buttons.js" defer></script>
    </>,
    {
      title: 'Cowley Road Studios | Recording Studio & Rehearsal Rooms Oxford',
      description: 'Professional recording studio with engineer, rehearsal rooms (£45-£65), control room hire, and Workshop Café. Two locations on Cowley Road and Cricket Road, Oxford. Book online.',
      keywords: 'recording studio oxford, rehearsal rooms oxford, rehearsal space oxford, cowley road studios, soundworks oxford, music studio oxford, band rehearsal oxford, workshop cafe oxford',
      canonicalUrl: 'https://cowleyroadstudios.com/',
      ogTitle: 'Cowley Road Studios | Recording Studio & Rehearsal Rooms Oxford',
      ogDescription: 'Professional recording studio with engineer, rehearsal rooms (£45-£65), control room hire, and Workshop Café in Oxford.',
      ogUrl: 'https://cowleyroadstudios.com/'
    }
  )
})

// HOME PAGE: Redirect to root (kept for legacy compatibility)
app.get('/home', (c) => c.redirect('/'))

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
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    
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

// Add redirect for /recording
app.get('/recording', (c) => c.redirect('/studio'))
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

// PODCAST & AV SERVICES
app.get('/av-services', (c) => {
  return c.render(
    <>
      <AVServicesPage />
      <link href="/static/rack-accordion.css" rel="stylesheet" />
    </>,
    {
      title: 'AV Services Oxford | Live Sound & Technical Support | Cowley Road Studios',
      description: 'Professional AV services in Oxford. Live sound, installations, hybrid events, and technical support. Engineer-led. Field-tested. Zero compromises.',
      keywords: 'av services oxford, live sound oxford, sound engineer oxford, event technical support oxford, av installation oxford',
      canonicalUrl: 'https://cowleyroadstudios.com/av-services',
      ogUrl: 'https://cowleyroadstudios.com/av-services'
    }
  )
})

// Add redirect for podcast
app.get('/podcast', (c) => c.redirect('/av-services'))

// REPAIRS
app.get('/av-services/repairs', (c) => {
  return c.render(
    <>
      <AVRepairsPage />
      <link href="/static/rack-accordion.css" rel="stylesheet" />
    </>,
    {
      title: 'Equipment Repairs Oxford | Diagnostics & Technical Bench | Cowley Road Studios',
      description: 'In-house equipment repair bench. Mixers, amplifiers, speakers, and signal chain repairs. Diagnosis-led repair work by ODRO Engineering.',
      keywords: 'equipment repair oxford, audio repair oxford, mixer repair oxford, amplifier repair oxford, speaker repair oxford',
      canonicalUrl: 'https://cowleyroadstudios.com/av-services/repairs',
      ogUrl: 'https://cowleyroadstudios.com/av-services/repairs'
    }
  )
})

// WORKSHOP CAFÉ (VENUE)
app.get('/workshop-cafe', (c) => {
  return c.render(
      <WorkshopCafePage />,
    {
      title: 'Workshop Café Oxford | Coffee, Workspace & Venue Hire | 118 Cowley Road',
      description: 'Specialty coffee, coworking space, guitar repairs, and venue hire (25-60 capacity) in East Oxford. Full venue £25/hr, meeting table £25/half-day. Part of Cowley Road Studios at 118 Cowley Road.',
      keywords: 'workshop cafe oxford, cafe cowley road, coworking oxford, venue hire oxford, coffee oxford, guitar repairs oxford, community space oxford, east oxford cafe',
      canonicalUrl: 'https://cowleyroadstudios.com/workshop-cafe',
      ogTitle: 'Workshop Café Oxford | Coffee, Workspace & Venue Hire',
      ogDescription: 'Specialty coffee, coworking space, and venue hire (25-60 capacity) in East Oxford. Part of Cowley Road Studios.',
      ogUrl: 'https://cowleyroadstudios.com/workshop-cafe'
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
      description: 'Get in touch about studio sessions, rehearsal space, AV services, or venue hire. Located in East Oxford. Email: info@crsoxford.com',
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
  return c.render(
    <>
      <ContactPage />
      <link href="/static/rack-accordion.css" rel="stylesheet" />
    </>,
    {
      title: 'Contact Cowley Road Studios | Recording Studio Oxford',
      description: 'Get in touch about studio sessions, rehearsal space, AV services, or venue hire. Two Oxford locations. Direct booking routes. Email: info@crsoxford.com',
      keywords: 'contact crs, cowley road studios contact, recording studio oxford contact, book studio oxford',
      canonicalUrl: 'https://cowleyroadstudios.com/contact',
      ogUrl: 'https://cowleyroadstudios.com/contact'
    }
  )
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
      title: 'Service Status & Booking | Cowley Road Studios',
      description: 'Live service status, booking interface and studio infrastructure overview for Cowley Road Studios recording and rehearsal facilities.',
      keywords: 'studio network, booking, cowley road studios, signal routing',
      canonicalUrl: 'https://cowleyroadstudios.com/rack',
      ogUrl: 'https://cowleyroadstudios.com/rack'
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
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        
        {/* Core CSS files from homepage */}
        <link href="/static/crs-reset.css" rel="stylesheet" />
        <link href="/static/crs-typography.css" rel="stylesheet" />
        <link href="/static/crs-header.css" rel="stylesheet" />
        <link href="/static/crs-footer.css" rel="stylesheet" />
        <link href="/static/crs-map-embed.css" rel="stylesheet" />
        <link href="/static/crs-mobile.css" rel="stylesheet" />
        
        {/* Accordion-specific CSS */}
        <link href="/static/rack-accordion.css" rel="stylesheet" />
        
        {/* Interactive enhancements */}
        <link href="/static/rack-button-interactions.css" rel="stylesheet" />
      </head>
      <body>
        <RackAccordion />
        
        {/* Audio feedback system */}
        <script src="/static/rack-audio-feedback.js" defer></script>
        
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
            font-family: 'JetBrains Mono', monospace;
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        
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
            font-family: 'JetBrains Mono', 'Space Mono', monospace;
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

// SIGNAGE TERMINAL — DIGITAL BROADCAST MODE (55" Street Display)
// Headless route: No global header/footer, SEO excluded
// SIGNAGE TERMINAL — DIGITAL BROADCAST MODE (55" Street Display)
// Full-screen rack module display for street-level presence
app.get('/signage', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage Broadcast</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet" />
        <link href="/static/crs-signage.css" rel="stylesheet" />
      </head>
      <body>
        <SignagePage />
      </body>
    </html>
  )
})

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
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet" />
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

// SIGNAGE SIGNAL - Digital Signage Channel for Yodeck
// Optimized for 55" displays (1920×1080)
// Three display modes: Ambient (E), Audio-Reactive (A), Parallax (B)
// Press 'M' to cycle modes, 'P' to pause
app.get('/signagesignal', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage Signal | Multi-Mode Digital Display</title>
        <link href="/static/signage-signal-enhanced.css" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { overflow: hidden; background: #000; font-family: 'JetBrains Mono', 'Space Mono', monospace; }
        `}</style>
      </head>
      <body>
        <SignageSignalEnhanced />
        <script src="/static/signage-signal-enhanced.js"></script>
      </body>
    </html>
  )
})

// SIGNAGE ENHANCED V2 — EXACT SPEC COMPLIANCE
// Technical Delivery: 88-second seamless loop, fade-only transitions
// Design Tokens: Chassis Black, Veg/Nettle Green, Billet Mustard
// Motion Rules: Slow, mechanical, calm - no bounce/elastic/rotation
// Day/Night Mode: Auto-detect or ?mode=day|night
// Debug Mode: ?debug=1 shows frame name + countdown
app.get('/signage-enhanced', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage Enhanced | Professional Display System</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          body { background: #0E0E0E; font-family: 'JetBrains Mono', monospace; }
        `}</style>
      </head>
      <body>
        <SignageEnhancedV2 />
      </body>
    </html>
  )
})

// SIGNAGE V4 — ON-BRAND, EYE-CATCHING, ALLURING
app.get('/signage-v4', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage V4 | On-Brand Display</title>
        <link href="/static/signage-v4.css" rel="stylesheet" />
      </head>
      <body>
        <SignageV4 />
        <script src="/static/signage-v4.js"></script>
      </body>
    </html>
  )
})

// SIGNAGE REWRITE — BRAND-COMPLIANT, CALM, STRUCTURED
// 75-90s loop with 8 frames, persistent QR, no neon, slow mechanical motion
app.get('/signage-rewrite', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>CRS Signage Rewrite | Brand-Compliant Display</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          body { background: #0E0E0E; font-family: 'JetBrains Mono', monospace; }
        `}</style>
      </head>
      <body>
        <SignageRewrite />
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
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        
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
app.get('/cricket-road', (c) => c.redirect('/'))
app.get('/crs-cowley-road', (c) => c.redirect('/'))
app.get('/crs-cricket-road', (c) => c.redirect('/'))
app.get('/locations', (c) => c.redirect('/'))
// '/rehearsal' now shows dedicated RehearsalSpaces page

// Old booking pages → New /book accordion
app.get('/book/studio-old', (c) => c.redirect('/book'))
app.get('/book/rehearsal-old', (c) => c.redirect('/book'))
app.get('/book/rehearsal/cowley-road', (c) => c.redirect('/book'))
app.get('/book/rehearsal/cricket-road', (c) => c.redirect('/book'))
app.get('/book/lessons-old', (c) => c.redirect('/book'))
app.get('/book/mixdown', (c) => c.redirect('/book'))
app.get('/book/tape', (c) => c.redirect('/book'))
app.get('/book/hire', (c) => c.redirect('/book'))
app.get('/book/repairs', (c) => c.redirect('/book'))
app.get('/book-old', (c) => c.redirect('/book'))

// ===================================================================
// SEO LANDING PAGES (PHASE 4)
// ===================================================================
import { RecordingStudioOxford } from './pages/RecordingStudioOxford.tsx'
import { RehearsalRoomsOxford } from './pages/RehearsalRoomsOxford.tsx'
import { AVServicesOxford } from './pages/AVServicesOxford.tsx'
import { VenueHireOxford } from './pages/VenueHireOxford.tsx'

// RECORDING STUDIO OXFORD
app.get('/recording-studio-oxford', (c) => {
  return c.render(
    <RecordingStudioOxford />,
    {
      title: 'Recording Studio in Oxford | Cowley Road Studios',
      description: 'Professional recording studio in Oxford for music, podcast and broadcast. Engineer-assisted sessions at Cowley Road and Cricket Road.',
      keywords: 'recording studio oxford, music recording oxford, engineer led recording oxford, professional studio oxford, cowley road recording',
      canonicalUrl: 'https://cowleyroadstudios.com/recording-studio-oxford',
      ogUrl: 'https://cowleyroadstudios.com/recording-studio-oxford',
      ogTitle: 'Recording Studio in Oxford | Cowley Road Studios',
      ogDescription: 'Professional recording studio in Oxford for music, podcast and broadcast. Engineer-assisted sessions at Cowley Road and Cricket Road.'
    }
  )
})

// REHEARSAL ROOMS OXFORD
app.get('/rehearsal-rooms-oxford', (c) => {
  return c.render(
    <RehearsalRoomsOxford />,
    {
      title: 'Rehearsal Rooms in Oxford | Cowley Road Studios',
      description: 'Operational rehearsal rooms in Oxford with backline, PA and calibrated monitoring. Book Cowley Road or Cricket Road sessions online.',
      keywords: 'rehearsal rooms oxford, band rehearsal oxford, practice space oxford, music rehearsal oxford, cowley road rehearsal',
      canonicalUrl: 'https://cowleyroadstudios.com/rehearsal-rooms-oxford',
      ogUrl: 'https://cowleyroadstudios.com/rehearsal-rooms-oxford',
      ogTitle: 'Rehearsal Rooms in Oxford | Cowley Road Studios',
      ogDescription: 'Operational rehearsal rooms in Oxford with backline, PA and calibrated monitoring. Book Cowley Road or Cricket Road sessions online.'
    }
  )
})

// AV SERVICES OXFORD
app.get('/av-services-oxford', (c) => {
  return c.render(
    <AVServicesOxford />,
    {
      title: 'Live Sound & AV Services in Oxford | Cowley Road Studios',
      description: 'Live sound hire, system installs and equipment repair in Oxford. Professional technical support for venues and events.',
      keywords: 'av services oxford, live sound oxford, sound engineer oxford, equipment repair oxford, system installation oxford',
      canonicalUrl: 'https://cowleyroadstudios.com/av-services-oxford',
      ogUrl: 'https://cowleyroadstudios.com/av-services-oxford',
      ogTitle: 'Live Sound & AV Services in Oxford | Cowley Road Studios',
      ogDescription: 'Live sound hire, system installs and equipment repair in Oxford. Professional technical support for venues and events.'
    }
  )
})

// VENUE HIRE OXFORD
app.get('/venue-hire-oxford', (c) => {
  return c.render(
    <VenueHireOxford />,
    {
      title: 'Venue Hire in Cowley Road, Oxford | Workshop Café',
      description: 'Creative venue hire in Cowley Road, Oxford. Capacity up to 60 standing with PA support. Private events and community programming.',
      keywords: 'venue hire oxford, workshop cafe oxford, event space oxford, cowley road venue, private hire oxford',
      canonicalUrl: 'https://cowleyroadstudios.com/venue-hire-oxford',
      ogUrl: 'https://cowleyroadstudios.com/venue-hire-oxford',
      ogTitle: 'Venue Hire in Cowley Road, Oxford | Workshop Café',
      ogDescription: 'Creative venue hire in Cowley Road, Oxford. Capacity up to 60 standing with PA support. Private events and community programming.'
    }
  )
})

export default app
