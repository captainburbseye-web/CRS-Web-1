import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const AVRepairsPage = () => (
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
          <p style="margin-top: 1.5rem; font-size: 0.9375rem; opacity: 0.85;">
            <strong>Repair Diagnostics:</strong> £60 flat rate (credited toward repair if you proceed)
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
