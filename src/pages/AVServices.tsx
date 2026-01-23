import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const AVServicesPage = () => (
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
