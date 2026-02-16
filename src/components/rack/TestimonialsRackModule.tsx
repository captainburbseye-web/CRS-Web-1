import { FC } from 'hono/jsx'

/**
 * Testimonials Rack Module - Social Proof Component
 * Displays authentic client testimonials in rack hardware style
 * Placement: After BOOK NOW (Row 2.5) or as standalone module
 */

interface Testimonial {
  quote: string
  author: string
  title: string
  service: string
}

export const TestimonialsRackModule: FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "CRS has been instrumental in bringing our album to life. The Cowley control room has incredible analog warmth, and the engineers really understand our sound.",
      author: "Sarah Mitchell",
      title: "Lead Vocalist",
      service: "Recording & Production"
    },
    {
      quote: "Best rehearsal space in Oxford. Great backline, solid PA, and the room sounds tight. We've been booking Cricket Road weekly for two years now.",
      author: "Tom Richards",
      title: "Drummer, The Flux",
      service: "Rehearsal Space"
    },
    {
      quote: "Professional service, fair pricing, and amazing equipment. The team at CRS helped us record our EP on a tight budget without compromising quality.",
      author: "Alex Chen",
      title: "Producer",
      service: "Studio Recording"
    }
  ]

  const trustBadges = [
    { text: "500+ Sessions Recorded", icon: "🎚️" },
    { text: "Trusted Since 1999", icon: "✓" },
    { text: "25+ Years in Oxford", icon: "📍" }
  ]

  return (
    <div class="rack-module testimonials-module" data-type="social-proof" data-visible="true" data-priority="high" data-status="online">
      <div class="rack-label-strip">
        <span class="led-indicator"></span>
        <span class="rack-label">SOCIAL_PROOF</span>
      </div>

      <div class="testimonials-content">
        <h2 class="rack-title">WHAT OUR CLIENTS SAY</h2>
        
        {/* Trust Badges */}
        <div class="trust-badges">
          {trustBadges.map((badge, index) => (
            <div class="trust-badge" key={`badge-${index}`}>
              <span class="badge-icon">{badge.icon}</span>
              <span class="badge-text">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div class="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div class="testimonial-card" key={`testimonial-${index}`}>
              <div class="quote-mark">"</div>
              <p class="testimonial-quote">{testimonial.quote}</p>
              <div class="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span class="author-title">{testimonial.title}</span>
                <span class="service-used">{testimonial.service}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for client logos */}
        <div class="client-logos">
          <p class="client-logos-label">TRUSTED BY OXFORD'S MUSIC COMMUNITY</p>
          <div class="logo-placeholder-grid">
            <div class="logo-placeholder">Local Band</div>
            <div class="logo-placeholder">Artist Name</div>
            <div class="logo-placeholder">Studio Client</div>
            <div class="logo-placeholder">Event Venue</div>
          </div>
        </div>
      </div>
    </div>
  )
}
