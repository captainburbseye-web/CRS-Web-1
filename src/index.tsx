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

// SHARED COMPONENTS
const Header = () => (
  <header class="crs-header mono">
    <div style="display: flex; align-items: center;">
      <a href="/">
        <img 
          src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/banner-cowley-road-studios-trimmed.png" 
          alt="CRS"
          class="crs-header-logo"
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
    <div class="crs-header-status">
      <span style="color: var(--mustard);">STATUS:</span>
      <span style="color: var(--signal-white); font-weight: 700;">ONLINE</span>
      <div class="status-pulse"></div>
    </div>
  </header>
)

const Footer = () => (
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

            <p class="hero-tagline">[YOUR HERO COPY HERE]</p>

            <p class="hero-description">
              [YOUR DESCRIPTION HERE]
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

      {/* STUDIO SNAPSHOT */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">STUDIO</h2>
          <p class="section-intro">
            [YOUR STUDIO SNAPSHOT COPY HERE]
          </p>
        </div>
        <div class="hero-cta">
          <a href="/studio" class="crs-button mono">[ VIEW STUDIO ]</a>
        </div>
      </section>

      {/* AV SERVICES SNAPSHOT */}
      <section class="crs-section section-light">
        <div class="section-header">
          <h2 class="section-title heading">AV SERVICES</h2>
          <p class="section-intro">
            [YOUR AV SERVICES SNAPSHOT COPY HERE]
          </p>
        </div>
        <div class="hero-cta">
          <a href="/av-services" class="crs-button mono">[ VIEW AV SERVICES ]</a>
        </div>
      </section>

      {/* CAFÉ SNAPSHOT */}
      <section class="crs-section section-dark">
        <div class="section-header">
          <h2 class="section-title heading">WORKSHOP CAFÉ</h2>
          <p class="section-intro">
            [YOUR CAFÉ SNAPSHOT COPY HERE]
          </p>
        </div>
        <div class="hero-cta">
          <a href="/venue" class="crs-button mono">[ VIEW CAFÉ ]</a>
        </div>
      </section>

      {/* TRUST / CREDIBILITY */}
      <section class="crs-section section-light">
        <div class="section-header">
          <h2 class="section-title heading">BUILT FOR OXFORD</h2>
          <p class="section-intro">
            [YOUR TRUST/CREDIBILITY COPY HERE]
          </p>
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
          <h2 class="section-title heading">STUDIO</h2>
          <p class="section-intro">
            [YOUR STUDIO INTRO COPY HERE]
          </p>
        </div>

        {/* SERVICES SECTION */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT WE DO</h3>
          <div class="content-text">
            [YOUR STUDIO SERVICES LIST HERE]
          </div>
        </div>

        {/* INFRASTRUCTURE SECTION */}
        <div class="content-block">
          <h3 class="content-heading mono">THE INFRASTRUCTURE</h3>
          <div class="content-text">
            [YOUR INFRASTRUCTURE DETAILS HERE]
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
            [YOUR AV SERVICES INTRO COPY HERE]
          </p>
        </div>

        {/* WHAT WE DO */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT WE DO</h3>
          <div class="content-text">
            [YOUR AV SERVICES LIST HERE]
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div class="content-block">
          <h3 class="content-heading mono">HOW IT WORKS</h3>
          <div class="content-text">
            [YOUR PROCESS STEPS HERE]
          </div>
        </div>

        {/* CAPABILITY */}
        <div class="content-block">
          <h3 class="content-heading mono">CAPABILITY</h3>
          <div class="content-text">
            [YOUR CAPABILITY SPECS HERE]
          </div>
        </div>

        {/* BRIDGE TO REPAIRS */}
        <div class="content-block">
          <p class="section-intro">
            Behind every clean live setup is a deep technical bench.
          </p>
          <div class="hero-cta">
            <a href="/av-services/repairs" class="crs-button mono">[ REPAIRS & TECHNICAL BENCH ]</a>
          </div>
        </div>

        {/* CTA */}
        <div class="hero-cta">
          <a href="mailto:info@cowleyroadstudios.com?subject=AV%20Services%20Enquiry" class="crs-button mono">
            [ REQUEST QUOTE ]
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
            [YOUR REPAIRS INTRO COPY HERE]
          </p>
          <p class="section-intro" style="margin-top: 1rem; font-style: italic;">
            Led by ODRO, our in-house engineer responsible for system repairs and technical problem-solving.
          </p>
        </div>

        {/* WHAT GETS REPAIRED */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT GETS REPAIRED</h3>
          <div class="content-text">
            [YOUR REPAIR SCOPE LIST HERE]
          </div>
        </div>

        {/* THE PROCESS */}
        <div class="content-block">
          <h3 class="content-heading mono">THE PROCESS</h3>
          <div class="content-text">
            [YOUR REPAIR PROCESS STEPS HERE]
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
            [YOUR CAFÉ INTRO COPY HERE]
          </p>
        </div>

        {/* WHAT THE SPACE IS */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT THE SPACE IS</h3>
          <div class="content-text">
            [YOUR SPACE DESCRIPTION HERE]
          </div>
        </div>

        {/* WHAT'S ON */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT'S ON</h3>
          <div class="content-text">
            <p style="font-style: italic; color: var(--mustard);">
              [EVENTS FEED PLACEHOLDER - TO BE INTEGRATED]
            </p>
            <p>
              No public events listed — venue available to book.
            </p>
          </div>
        </div>

        {/* VENUE HIRE */}
        <div class="content-block">
          <h3 class="content-heading mono">VENUE HIRE</h3>
          <div class="content-text">
            [YOUR VENUE HIRE DETAILS HERE]
          </div>
        </div>

        {/* CTA */}
        <div class="hero-cta">
          <a href="mailto:info@cowleyroadstudios.com?subject=Venue%20Availability%20Request" class="crs-button mono">
            [ BOOK THE VENUE ]
          </a>
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
          <h2 class="section-title heading">ABOUT</h2>
          <p class="section-intro">
            [YOUR ABOUT COPY HERE]
          </p>
        </div>

        {/* STORY */}
        <div class="content-block">
          <h3 class="content-heading mono">WHO WE ARE</h3>
          <div class="content-text">
            [YOUR STORY HERE]
          </div>
        </div>

        {/* VALUES */}
        <div class="content-block">
          <h3 class="content-heading mono">WHAT WE BELIEVE</h3>
          <div class="content-text">
            [YOUR VALUES HERE]
          </div>
        </div>

        {/* TEAM (OPTIONAL) */}
        <div class="content-block">
          <h3 class="content-heading mono">THE TEAM</h3>
          <div class="content-text">
            [YOUR TEAM BIOS HERE]
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
            [YOUR CONTACT INTRO HERE]
          </p>
        </div>

        {/* CONTACT METHODS */}
        <div class="content-block">
          <h3 class="content-heading mono">GET IN TOUCH</h3>
          <div class="content-text mono">
            <p><strong>EMAIL:</strong> <a href="mailto:info@cowleyroadstudios.com">info@cowleyroadstudios.com</a></p>
            <p><strong>PHONE:</strong> [YOUR PHONE]</p>
            <p><strong>ADDRESS:</strong> 118 Cowley Road, Oxford, OX4 1JE</p>
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
