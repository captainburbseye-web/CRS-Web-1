import { FC } from 'hono/jsx';

/**
 * RACK VARIANTS DEMO - Hardware Realism Showcase
 * 
 * This demonstrates the variant system with inline modules.
 * Shows: command/rack/passive visual hierarchy
 * 
 * For production: Apply these styles to existing RackModule components
 */

export const RackModularEnhanced: FC = () => {
  return (
    <div class="rack-modular-viewport">
      <div class="rack-container">
        
        {/* Row 1: Header (Passive) */}
        <div class="rack-passive" data-variant="passive" data-row="1">
          <div class="rack-module">
            <div class="rack-label-strip">
              <span class="led-indicator"></span>
              <span class="rack-label">SYSTEM HEADER</span>
            </div>
            <h2 class="rack-title">COWLEY ROAD STUDIOS</h2>
            <p class="rack-description">
              Professional Recording Studio Oxford | Rehearsal Space | Music Production.
              Two locations: Cowley Road HQ and Cricket Road.
            </p>
          </div>
        </div>

        {/* Row 2: Booking Hub (Command) */}
        <div class="rack-command" data-variant="command" data-row="2">
          <div class="rack-module">
            <div class="rack-label-strip">
              <span class="led-indicator"></span>
              <span class="rack-label">BOOKING HUB</span>
            </div>
            <h2 class="rack-title">BOOK NOW</h2>
            <p class="rack-description">
              Choose your service type below. All bookings include instant confirmation and flexible scheduling.
            </p>
            <div class="rack-button-group">
              <span class="booking-instruction">[ SELECT SERVICE TYPE ]</span>
              <a href="/#recording-services" class="rack-button">CHOOSE SERVICE</a>
            </div>
          </div>
        </div>

        {/* Row 3: Split Row - Rehearsal (Rack) */}
        <div class="split-rack-row">
          <div class="split-rack-module">
            <div class="rack-rack" data-variant="rack" data-row="3">
              <div class="rack-module">
                <div class="rack-label-strip">
                  <span class="led-indicator"></span>
                  <span class="rack-label">COWLEY REHEARSAL</span>
                </div>
                <h2 class="rack-title">COWLEY REHEARSAL</h2>
                <p class="rack-description">
                  Professional rehearsal space at Cowley Road. Full backline, PA system, and monitoring available. Book online with the live booking link.
                </p>
                <div class="rack-button-group">
                  <span class="booking-instruction">[ HOURLY BOOKING AVAILABLE ]</span>
                  <a href="https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     class="rack-button">RESERVE SPACE</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="split-rack-module">
            <div class="rack-rack" data-variant="rack" data-row="3">
              <div class="rack-module">
                <div class="rack-label-strip">
                  <span class="led-indicator"></span>
                  <span class="rack-label">CRICKET REHEARSAL</span>
                </div>
                <h2 class="rack-title">CRICKET REHEARSAL</h2>
                <p class="rack-description">
                  Rehearsal room at Cricket Road. Drum kit, amps, and PA included. Book online with the current Square checkout.
                </p>
                <div class="rack-button-group">
                  <span class="booking-instruction">[ HOURLY BOOKING AVAILABLE ]</span>
                  <a href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     class="rack-button">RESERVE SPACE</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Recording Services (Rack) */}
        <div class="rack-rack" data-variant="rack" data-row="5">
          <div class="rack-module">
            <div class="rack-label-strip">
              <span class="led-indicator"></span>
              <span class="rack-label">RECORDING & PRODUCTION</span>
            </div>
            <h2 class="rack-title">RECORDING & PRODUCTION</h2>
            <p class="rack-description">
              Professional recording, mixing, and mastering services. State-of-the-art equipment and experienced engineers.
            </p>
            <div class="rack-button-group">
              <span class="booking-instruction">[ STUDIO SESSION BOOKING ]</span>
              <a href="/#recording-services" class="rack-button">BOOK SESSION</a>
            </div>
          </div>
        </div>

        {/* Row 5: Workshop Café & Venue (Rack) */}
        <div class="rack-rack" data-variant="rack" data-row="6">
          <div class="rack-module">
            <div class="rack-label-strip">
              <span class="led-indicator led-amber"></span>
              <span class="rack-label">WORKSHOP CAFÉ & VENUE</span>
            </div>
            <h2 class="rack-title">WORKSHOP CAFÉ & VENUE</h2>
            <p class="rack-description">
              Public-facing community space at 118 Cowley Road. Private hire and venue enquiries are handled directly.
            </p>
            <div class="rack-button-group">
              <span class="booking-instruction">[ VENUE ENQUIRY ]</span>
              <a href="/contact?service=venue" class="rack-button">ENQUIRE NOW</a>
            </div>
          </div>
        </div>

        {/* Row 6: AV Services (Rack) */}
        <div class="rack-rack" data-variant="rack" data-row="7">
          <div class="rack-module">
            <div class="rack-label-strip">
              <span class="led-indicator"></span>
              <span class="rack-label">AV EQUIPMENT HIRE</span>
            </div>
            <h2 class="rack-title">AV EQUIPMENT HIRE</h2>
            <p class="rack-description">
              Professional AV equipment rental. Projectors, PA systems, lighting, and more.
            </p>
            <div class="rack-button-group">
              <span class="booking-instruction">[ EQUIPMENT ENQUIRY ]</span>
              <a href="/av-services" class="rack-button">GET QUOTE</a>
            </div>
          </div>
        </div>

        {/* Row 7: Contact (Passive) */}
        <div class="rack-passive" data-variant="passive" data-row="11">
          <div class="rack-module">
            <div class="rack-label-strip">
              <span class="led-indicator"></span>
              <span class="rack-label">CONTACT & ENQUIRIES</span>
            </div>
            <h2 class="rack-title">CONTACT & ENQUIRIES</h2>
            <p class="rack-description">
              Get in touch with our team. General enquiries, booking questions, or partnership opportunities.
            </p>
            <div class="rack-button-group">
              <a href="/contact" class="rack-button">CONTACT US</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
