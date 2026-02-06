export const BookingConfirmed = () => (
  <section class="crs-section section-dark" style="padding-top: 4rem; padding-bottom: 4rem;">
    <div class="crs-inner" style="max-width: 900px; margin: 0 auto;">
      
      {/* MAIN HEADING */}
      <h1 class="section-title heading" style="text-align: center; margin-bottom: 2rem;">
        Booking Confirmed
      </h1>
      
      {/* CONFIRMATION MESSAGE */}
      <div class="content-text" style="margin-bottom: 3rem; text-align: center;">
        <p style="font-size: 1.1rem; line-height: 1.8; color: rgba(245, 245, 245, 0.9);">
          Thank you for your booking.
        </p>
        <p style="font-size: 1.1rem; line-height: 1.8; color: rgba(245, 245, 245, 0.9);">
          Your session at Cowley Road Studios is confirmed and secured.
        </p>
        <p style="font-size: 1rem; line-height: 1.8; color: rgba(245, 245, 245, 0.75); margin-top: 1.5rem;">
          You will receive a confirmation email from Square with your booking details and receipt. Please keep this for your records.
        </p>
      </div>

      {/* WHAT TO EXPECT SECTION */}
      <div style="margin-bottom: 3rem;">
        <h2 class="content-heading mono" style="margin-bottom: 1.5rem; color: #D4A574;">What to Expect</h2>
        <ul class="confirmation-list" style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative; color: rgba(245, 245, 245, 0.85); line-height: 1.6;">
            <span style="position: absolute; left: 0;">→</span>
            Please arrive on time for your booked slot
          </li>
          <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative; color: rgba(245, 245, 245, 0.85); line-height: 1.6;">
            <span style="position: absolute; left: 0;">→</span>
            Your booking is for rehearsal use only
          </li>
          <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative; color: rgba(245, 245, 245, 0.85); line-height: 1.6;">
            <span style="position: absolute; left: 0;">→</span>
            No recording or engineer is included unless explicitly stated
          </li>
          <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative; color: rgba(245, 245, 245, 0.85); line-height: 1.6;">
            <span style="position: absolute; left: 0;">→</span>
            You are responsible for your own instruments and breakables
          </li>
        </ul>
      </div>

      {/* CONTACT SECTION */}
      <div style="margin-bottom: 3rem; padding: 2rem; background: rgba(212, 165, 116, 0.05); border-left: 3px solid #D4A574;">
        <h3 class="content-heading mono" style="margin-bottom: 1rem; color: #D4A574;">Questions?</h3>
        <p style="margin-bottom: 1rem; color: rgba(245, 245, 245, 0.85);">
          If you have any questions ahead of your session, you can contact us here:
        </p>
        <div style="font-family: 'JetBrains Mono', monospace; color: rgba(245, 245, 245, 0.9);">
          <p style="margin-bottom: 0.5rem;">
            ✉️ <a href="mailto:info@crsoxford.com" style="color: #D4A574; text-decoration: none; border-bottom: 1px solid #D4A574;">info@crsoxford.com</a>
          </p>
          <p style="margin-bottom: 0;">
            ☎️ <a href="tel:+441865722027" style="color: #D4A574; text-decoration: none; border-bottom: 1px solid #D4A574;">+44 1865 722027</a>
          </p>
        </div>
      </div>

      {/* FINDING US SECTION */}
      <div style="margin-bottom: 3rem;">
        <h2 class="content-heading mono" style="margin-bottom: 1.5rem; color: #D4A574;">Finding Us</h2>
        <div style="font-family: 'JetBrains Mono', monospace; color: rgba(245, 245, 245, 0.85); line-height: 1.8;">
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Cowley Road Studios</p>
          <p style="margin-bottom: 0.5rem;">118 Cowley Road</p>
          <p style="margin-bottom: 1.5rem;">Oxford, OX4 1JE</p>
          <p style="margin-bottom: 0; font-size: 0.95rem; color: rgba(245, 245, 245, 0.65);">
            (Access details will be included in your confirmation email if relevant.)
          </p>
        </div>
      </div>

      {/* FINAL NOTE */}
      <div style="padding: 2rem; background: rgba(255, 107, 53, 0.05); border-left: 3px solid #FF6B35; margin-bottom: 3rem;">
        <h3 class="content-heading mono" style="margin-bottom: 1rem; color: #FF6B35;">Final Note</h3>
        <p style="margin-bottom: 1rem; color: rgba(245, 245, 245, 0.85);">
          We are an active, working studio.
        </p>
        <p style="margin-bottom: 0; color: rgba(245, 245, 245, 0.85);">
          Please be respectful of the space, the equipment, and other users.
        </p>
        <p style="margin-top: 1rem; color: rgba(245, 245, 245, 0.85);">
          We look forward to welcoming you.
        </p>
      </div>

      {/* OPTIONAL LINE - SMALL TEXT */}
      <div style="text-align: center; padding-top: 2rem; border-top: 1px solid rgba(212, 165, 116, 0.2);">
        <p style="font-size: 0.9rem; color: rgba(245, 245, 245, 0.6); margin: 0;">
          If you need to make a change, please use the link in your Square confirmation email.
        </p>
      </div>

    </div>
  </section>
)
