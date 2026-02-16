/**
 * Contact Page - Signal Intake Interface
 * Aligned with consolidated rack structure
 * No duplication, no marketing, no clutter
 */

export const ContactPage = () => {
  return (
    <div class="master-rack-chassis">
      {/* BACK TO RACK */}
      <div class="page-nav">
        <a href="/" class="back-link">← BACK TO RACK</a>
      </div>

      {/* HEADER */}
      <div class="contact-header">
        <h1>Contact Cowley Road Studios</h1>
        <p class="contact-intro">For bookings, technical briefs, venue enquiries, or general questions.</p>
      </div>

      {/* DIRECT BOOKING SECTION */}
      <div class="contact-section booking-buttons">
        <h2>Direct Booking</h2>
        <div class="booking-button-group">
          <a href="/rack#rehearsal" class="cta-service">BOOK REHEARSAL</a>
          <a href="/rack#studio" class="cta-service">BOOK STUDIO SESSION</a>
        </div>
      </div>

      {/* UNIFIED ENQUIRY FORM */}
      <div class="contact-section enquiry-form-section">
        <h2>Enquiry Form</h2>
        
        <form class="enquiry-form" action="/api/contact" method="POST">
          
          {/* Enquiry Type Dropdown */}
          <div class="form-group">
            <label for="enquiry-type">Enquiry Type</label>
            <select id="enquiry-type" name="enquiry_type" required>
              <option value="">Select...</option>
              <option value="technical">Technical (Live Sound / Install / Repair)</option>
              <option value="venue">Venue Hire</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Name */}
          <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" required />
          </div>

          {/* Email */}
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required />
          </div>

          {/* Phone */}
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          {/* Message */}
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>

          {/* Submit */}
          <button type="submit" class="cta-service">SEND ENQUIRY</button>
        </form>
      </div>

      {/* LOCATION BLOCK */}
      <div class="contact-section location-block">
        <h2>Location</h2>
        <p class="address">118 Cowley Road, Oxford</p>
        <p class="location-note">By appointment only.</p>
        
        {/* Embedded Map */}
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8712!2d-1.238426!3d51.7466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ0JzQ3LjgiTiAxwrAxNCcxOC4zIlc!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
            width="100%" 
            height="300" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            title="Cowley Road Studios Location">
          </iframe>
        </div>
      </div>

    </div>
  );
};
