import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const StudioPage = () => (
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
          <p style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.875rem; color: #FF8C00; font-weight: 700;">
            Recording and production services are available by enquiry while the Cowley Road build is completed.
          </p>
        </div>
      </div>

      {/* BUILD RATE FUNDING — COMMISSION YOUR SESSION */}
      <div class="content-block" style="background: rgba(127, 255, 0, 0.05); border: 3px solid #39FF14; padding: 2rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <span class="led green" style="width: 14px; height: 14px;"></span>
          <h3 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.25rem; color: #39FF14; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">
            BUILD RATE BOOKING · COMMISSION YOUR SESSION
          </h3>
        </div>
        
        <div style="font-family: 'Inter', sans-serif; font-size: 0.938rem; line-height: 1.7; color: rgba(245, 245, 245, 0.9); margin-bottom: 2rem;">
          <p style="margin-bottom: 1rem; font-weight: 600; color: #39FF14;">
            Book production time now at build rates
          </p>
          <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
              <span style="position: absolute; left: 0; color: #39FF14; font-weight: bold;">→</span>
              Lock in <strong style="color: #39FF14;">commissioning rates</strong> for 2025/26
            </li>
            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
              <span style="position: absolute; left: 0; color: #39FF14; font-weight: bold;">→</span>
              Your booking directly funds final-stage construction
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
          
          <p style="font-size: 0.875rem; font-style: italic; color: rgba(245, 245, 245, 0.7); margin-bottom: 2rem;">
            All bookings are transferable and can be scheduled flexibly once operational. Valid for 12 months from opening.
          </p>
        </div>
        
        {/* Build Rate Packages */}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          
          {/* Package 1: 5-Hour Production */}
          <div style="background: rgba(0, 0, 0, 0.3); border: 2px solid #39FF14; padding: 1.5rem; display: flex; flex-direction: column;">
            <h4 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1rem; color: #39FF14; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
              BUILD RATE: 5-HOUR PRODUCTION
            </h4>
            <div style="font-family: 'Inter', sans-serif; font-size: 0.938rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85); margin-bottom: 1.5rem; flex-grow: 1;">
              <p style="margin-bottom: 0.5rem;">• Advance commissioning allocation</p>
              <p style="margin-bottom: 0.5rem;">• Includes engineer</p>
              <p style="margin-bottom: 0.5rem;">• Recording, mixing, or podcast</p>
              <p style="margin-bottom: 0.5rem;">• Limited to 50 allocations</p>
              <p style="margin-bottom: 0;">• Locked at 2025/26 rates</p>
            </div>
            <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" target="_blank" rel="noopener" class="cta-button" style="background: #39FF14; color: #0A1A0F; border-color: #39FF14; font-weight: 700; width: 100%; text-align: center;">
              BUY NOW
            </a>
          </div>
          
          {/* Package 2: Rehearsal Block */}
          <div style="background: rgba(0, 0, 0, 0.3); border: 2px solid #39FF14; padding: 1.5rem; display: flex; flex-direction: column;">
            <h4 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1rem; color: #39FF14; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
              REHEARSAL BLOCK (10 HOURS)
            </h4>
            <div style="font-family: 'Inter', sans-serif; font-size: 0.938rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85); margin-bottom: 1.5rem; flex-grow: 1;">
              <p style="margin-bottom: 0.5rem;">• 10 hours total rehearsal access</p>
              <p style="margin-bottom: 0.5rem;">• Cowley Road rehearsal rooms</p>
              <p style="margin-bottom: 0.5rem;">• Band rehearsals & prep sessions</p>
              <p style="margin-bottom: 0.5rem;">• Scheduling after facility opens</p>
              <p style="margin-bottom: 0;">• Valid 12 months from opening</p>
            </div>
            <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" target="_blank" rel="noopener" class="cta-button" style="background: #39FF14; color: #0A1A0F; border-color: #39FF14; font-weight: 700; width: 100%; text-align: center;">
              BUY NOW
            </a>
          </div>
          
          {/* Package 3: System Clearance */}
          <div style="background: rgba(0, 0, 0, 0.3); border: 2px solid #39FF14; padding: 1.5rem; display: flex; flex-direction: column;">
            <h4 style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1rem; color: #39FF14; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
              SYSTEM CLEARANCE (INDUCTION)
            </h4>
            <div style="font-family: 'Inter', sans-serif; font-size: 0.938rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85); margin-bottom: 1.5rem; flex-grow: 1;">
              <p style="margin-bottom: 0.5rem;">• Studio access induction</p>
              <p style="margin-bottom: 0.5rem;">• + 2 hours booth hire</p>
              <p style="margin-bottom: 0.5rem;">• Learn signal paths & routing</p>
              <p style="margin-bottom: 0.5rem;">• Unlock dry hire access</p>
              <p style="margin-bottom: 0;">• One-time clearance</p>
            </div>
            <a href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" target="_blank" rel="noopener" class="cta-button" style="background: #39FF14; color: #0A1A0F; border-color: #39FF14; font-weight: 700; width: 100%; text-align: center;">
              BUY NOW
            </a>
          </div>
          
        </div>
        
        <div style="background: rgba(0, 0, 0, 0.3); border-left: 3px solid #39FF14; padding: 1.25rem;">
          <p style="font-family: 'Inter', sans-serif; font-size: 0.938rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85); margin: 0;">
            <strong style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #39FF14;">NOTE:</strong> These are advance commissioning allocations. Funds construction. Redeemable once operational.
          </p>
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
            <p style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.875rem; color: var(--crs-gold); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">
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
            <p style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.875rem; color: var(--crs-green); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">
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
            <strong>Recording & Production (with Engineer):</strong> £35/hour (2-hour minimum) | £130 for 4 hours
          </p>
          <p style="margin-bottom: 1rem;">
            <strong>Dry Hire (Self-sufficient users):</strong> Cowley Road: £70/2hrs, £130/4hrs, £300/day | Cricket Road: £50/2hrs, £90/4hrs, £200/day
          </p>
          <p style="margin-bottom: 1rem; font-size: 0.9375rem; opacity: 0.85;">
            <strong>First-time dry hire users:</strong> £30 one-off induction session required to unlock self-service access.
          </p>
          <p style="font-size: 0.9375rem; opacity: 0.85;">
            Typical full-day projects: £400–£700 depending on scope and session type.
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
