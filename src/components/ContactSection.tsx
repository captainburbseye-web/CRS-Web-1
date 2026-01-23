export const ContactSection = ({ serviceType = 'general' }: { serviceType?: string }) => {
  const serviceLabel = {
    'recording': 'Recording Session',
    'pod-hire': 'Pod Hire',
    'repairs': 'Equipment Repair',
    'av': 'AV Services',
    'venue': 'Venue Hire',
    'general': 'General Enquiry'
  }[serviceType] || 'General Enquiry'
  
  return (
    <div id="contact-wrapper" style={{ clear: 'both', width: '100%', position: 'relative', display: 'block' }}>
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
    </div>
  )
}
