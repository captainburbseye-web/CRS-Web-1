import { FC } from 'hono/jsx'

/**
 * Rack Hero Section - Homepage Entry Point
 * Showcases the rack interface as an engaging hero with CTA
 */

export const RackHero: FC = () => {
  return (
    <section class="rack-hero-section">
      <div class="rack-hero-container">
        {/* Hero Content */}
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-line-1">COWLEY ROAD STUDIOS</span>
            <span class="title-line-2">Professional Recording | Rehearsal Space | Music Production</span>
          </h1>
          
          <p class="hero-description">
            Oxford's premier recording and rehearsal facility. Two locations, professional equipment, and experienced engineers ready to bring your sound to life.
          </p>

          <div class="hero-cta-group">
            <a href="/rack-modular" class="hero-cta-primary">
              <span class="cta-icon">🎛️</span>
              EXPLORE SERVICES
            </a>
            <a href="/book" class="hero-cta-secondary">
              BOOK NOW
            </a>
          </div>

          {/* Trust Indicators */}
          <div class="hero-trust-badges">
            <div class="trust-item">
              <span class="trust-icon">✓</span>
              <span class="trust-text">Trusted Since 1999</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">📍</span>
              <span class="trust-text">25+ Years in Oxford</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">🎚️</span>
              <span class="trust-text">500+ Sessions Recorded</span>
            </div>
          </div>
        </div>

        {/* Hero Visual - Mini Rack Preview */}
        <div class="hero-visual">
          <div class="mini-rack-container">
            {/* Top Module - Header */}
            <div class="mini-rack-module header-module">
              <span class="mini-led active"></span>
              <span class="module-label">COWLEY ROAD STUDIOS</span>
            </div>

            {/* Service Modules Preview */}
            <div class="mini-rack-module">
              <span class="mini-led active"></span>
              <span class="module-label">REHEARSAL SPACE</span>
            </div>

            <div class="mini-rack-module">
              <span class="mini-led active"></span>
              <span class="module-label">RECORDING & PRODUCTION</span>
            </div>

            <div class="mini-rack-module">
              <span class="mini-led active"></span>
              <span class="module-label">CONTROL ROOMS</span>
            </div>

            <div class="mini-rack-module">
              <span class="mini-led active"></span>
              <span class="module-label">EQUIPMENT HIRE</span>
            </div>

            {/* View All CTA */}
            <a href="/rack-modular" class="mini-rack-view-all">
              <span>VIEW ALL SERVICES →</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div class="scroll-indicator">
        <span class="scroll-text">EXPLORE SERVICES</span>
        <span class="scroll-arrow">↓</span>
      </div>
    </section>
  )
}
