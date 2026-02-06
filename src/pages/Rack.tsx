import { Footer } from '../components/Footer'

interface RackModuleProps {
  label: string
  type?: 'standard' | 'parent' | 'sub-rack'
  className?: string
  children?: any
  videoId?: number
  qrLink?: string
  bookingRoute?: string
  bookingUrl?: string
  buttonLabel?: string
  channel?: string
}

const RackModule = ({ label, type = 'standard', className, children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel, channel }: RackModuleProps) => (
  <section class={`rack-module ${type} ${className || ''}`} data-channel={channel}>
    <div class="module-header">
      <div class="led green"></div>
      <h2 class="module-title">{label}</h2>
      <span class="module-id">[{label.substring(0, 3).toUpperCase()}-MOD]</span>
    </div>
    <div class="module-body">
      {videoId && (
        <video 
          autoplay 
          loop 
          muted 
          class="module-video"
          src={`https://pub-30f2bf10509141bba382d98d130c358b.r2.dev/${videoId}.mp4`}
        />
      )}
      {children}
      {(qrLink || bookingRoute || bookingUrl) && (
        <div class="patch-point">
          {qrLink && (
            <div class="qr-container">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrLink)}`} 
                alt="Booking QR"
                class="qr-code"
              />
            </div>
          )}
          {bookingRoute ? (
            <a href={bookingUrl || '#'} rel="noopener noreferrer" class="rack-connector">
              <button 
                class="power-switch" 
                data-route={bookingRoute}
                title={`Route to ${buttonLabel || 'booking'}`}
                type="button"
              >
                {buttonLabel || 'PATCH TO BOOK'}
              </button>
            </a>
          ) : bookingUrl ? (
            <a href={bookingUrl} rel="noopener noreferrer" class="rack-connector">
              <button 
                class="power-switch" 
                title={`Route to ${buttonLabel || 'booking'}`}
                type="button"
              >
                {buttonLabel || 'PATCH TO BOOK'}
              </button>
            </a>
          ) : qrLink ? (
            <a href={qrLink} target="_blank" rel="noopener noreferrer" class="cta-button cta-button-primary">PATCH TO BOOK</a>
          ) : null}
        </div>
      )}
    </div>
  </section>
)

export const RackPage = () => (
  <>

    {/* ACCESSIBILITY: Skip Link */}
    <a href="#main-content" class="skip-link">Skip to main content</a>

    {/* ACCESSIBILITY: Page Title for Screen Readers */}
    <h1 class="sr-only">Cowley Road Studios | Rack Monitor Console</h1>

    <main id="main-content" class="rack-container">
      {/* SYSTEM INTRO / SIGNAL PATH */}
      <section class="rack-module op-intro">
        <div class="module-body">
          <p class="op-blurb">
            Welcome to Cowley Road Studios — a fully modular, operational creative venue. 
            This is your signal path to booking rehearsals, control room access, AV services, and community events.
          </p>
        </div>
      </section>

      {/* GROUP MODULE: REHEARSALS (PARENT) */}
      <RackModule type="parent" label="REHEARSALS">
        <div class="sub-rack-row">
          <RackModule 
            type="sub-rack" 
            label="Cowley Road" 
            videoId={1} 
            bookingRoute="commission-studio"
            bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
            buttonLabel="COMMISSION ALLOCATION"
            channel="1"
          >
            <p class="sub-rack-description">118 Cowley Road, Oxford OX4 1JE · £45 / 2 hours</p>
          </RackModule>
          <RackModule 
            type="sub-rack" 
            label="Cricket Road" 
            videoId={2} 
            bookingRoute="recording-live"
            bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
            buttonLabel="REHEARSE NOW"
            channel="2"
          >
            <p class="sub-rack-description">92 Cricket Road, Oxford OX4 3DJ · Hourly rates</p>
          </RackModule>
        </div>
      </RackModule>

      {/* STANDARD MODULES */}
      <RackModule 
        label="CONTROL ROOM — DRY HIRE" 
        videoId={7} 
        bookingRoute="commission-studio"
        bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
        buttonLabel="COMMISSION ALLOCATION"
        channel="3"
      >
        <p class="module-description">92 Cricket Road · No engineer included · Monitoring & mixing only</p>
      </RackModule>

      <RackModule 
        label="AV SERVICES — HIRE & REPAIR" 
        videoId={11}
        bookingRoute="allocation-av"
        bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
        buttonLabel="ALLOCATION AVAILABLE"
        channel="5"
      >
        <p class="module-description">Engineer-led live sound, installations, and technical support for community venues and cultural events.</p>
      </RackModule>

      <RackModule 
        label="WORKSHOP CAFÉ + EVENTS" 
        className="workshop-cafe cafe-module"
        videoId={10}
        bookingRoute="commission-podcast"
        bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
        buttonLabel="COMMISSION ALLOCATION"
        channel="4"
      >
        <div class="cafe-content">
          <p class="cafe-hero">
            The Workshop Café is where ideas brew as freely as the coffee. A warm, analog space 
            for collaboration, conversation, and creativity—no booking required for café hours, 
            community programming by allocation.
          </p>
          
          <div class="cafe-programming">
            <h3 class="cafe-section-title">What We Offer</h3>
            <ul class="cafe-list">
              <li><strong>Open Creative Sessions</strong> — Drop-in workspace for artists, makers, and thinkers</li>
              <li><strong>Technical Workshops</strong> — Hands-on learning (recording, mixing, live sound fundamentals)</li>
              <li><strong>Community Events</strong> — Live sessions, listening parties, creative showcases</li>
              <li><strong>Subsidised Rates</strong> — Community groups and cultural projects eligible for reduced hire</li>
            </ul>
          </div>
          
          <div class="cafe-details">
            <p><strong>Location:</strong> 118 Cowley Road, Oxford OX4 1JE (ground floor, street-level access)</p>
            <p><strong>Vibe:</strong> Vintage audio gear meets community coffee shop—analog warmth, technical credibility</p>
          </div>
        </div>
      </RackModule>

      <RackModule 
        label="CONTACT + LOCATION" 
        videoId={23}
        channel="6"
      >
        <div class="contact-info">
          <p><strong>Email:</strong> <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+441865722027">+44 1865 722027</a></p>
          <p><strong>Socials:</strong> @cowleyroadstudios.ox</p>
        </div>
      </RackModule>

      {/* SYSTEM MODULE (FILLER) */}
      <RackModule 
        type="standard" 
        label="SYSTEM STATUS" 
        videoId={12}
        channel="7"
      >
        <p class="system-status">SIGNAL CLEAR · SYSTEM LIVE · READY FOR BOOKING</p>
      </RackModule>
    </main>

    <Footer />

    {/* PATCH BAY ROUTING LOGIC - v4.1 */}
    <script src="/assets/booking-router.js"></script>
  </>
)
