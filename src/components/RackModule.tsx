import { Link } from 'hono/jsx'

export const RackModule = ({ label, type = 'standard', className, children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel }) => (
  <section class={`rack-unit device-${type} ${className}`}>
    <div class="rack-unit-header">
      <div class="rack-unit-led">
        {/* Placeholder for LED status */}
        <span class="led" style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: #ccc;"></span>
      </div>
      <h2 class="rack-unit-title">{label}</h2>
    </div>
    
    <div class="rack-unit-content">
      {children}
      
      {/* Booking Button */}
      {bookingUrl && (
        <a href={bookingUrl} class="cta-button cta-button-primary" style="border-color: #E3B04B; color: #E3B04B; background: rgba(255, 140, 0, 0.1); font-size: 1.1rem; padding: 14px 28px;">{buttonLabel || 'BOOK NOW'}</a>
      )}
    </div>
  </section>
)
