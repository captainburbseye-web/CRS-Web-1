import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

interface RackModuleProps {
  label: string
  type?: 'standard' | 'parent' | 'sub-rack'
  children?: any
  videoId?: number
  qrLink?: string
}

const RackModule = ({ label, type = 'standard', children, videoId, qrLink }: RackModuleProps) => (
  <section class={`rack-module ${type}`}>
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
          src={`https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/${videoId}.mp4`}
        />
      )}
      {children}
      {qrLink && (
        <div class="patch-point">
          <div class="qr-container">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrLink)}`} 
              alt="Booking QR"
              class="qr-code"
            />
          </div>
          <a href={qrLink} target="_blank" rel="noopener noreferrer" class="cta-button cta-button-primary">PATCH TO BOOK</a>
        </div>
      )}
    </div>
  </section>
)

export const RackPage = () => (
  <>
    <Header />

    <main class="rack-container">
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
            videoId={3} 
            qrLink="https://square.link/u/UQidDzE0"
          >
            <p class="sub-rack-description">118 Cowley Road, Oxford OX4 1JE · £45 / 2 hours</p>
          </RackModule>
          <RackModule 
            type="sub-rack" 
            label="Cricket Road" 
            videoId={5} 
            qrLink="https://square.link/u/WPqRFIGW"
          >
            <p class="sub-rack-description">92 Cricket Road, Oxford OX4 3DJ · Hourly rates</p>
          </RackModule>
        </div>
      </RackModule>

      {/* STANDARD MODULES */}
      <RackModule 
        label="CONTROL ROOM — DRY HIRE" 
        videoId={7} 
        qrLink="https://square.link/u/bCOHXtdl"
      >
        <p class="module-description">92 Cricket Road · No engineer included · Monitoring & mixing only</p>
      </RackModule>

      <RackModule 
        label="AV SERVICES — HIRE & REPAIR" 
        videoId={11}
      >
        <p class="module-description">Engineer-led live sound, installations, and technical support for community venues and cultural events.</p>
      </RackModule>

      <RackModule 
        label="WORKSHOP CAFÉ + EVENTS" 
        videoId={10}
      >
        <p class="module-description">118 Cowley Road · Public-facing space for community events, workshops, and creative programming.</p>
      </RackModule>

      <RackModule 
        label="CONTACT + LOCATION" 
        videoId={23}
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
      >
        <p class="system-status">SIGNAL CLEAR · SYSTEM LIVE · READY FOR BOOKING</p>
      </RackModule>
    </main>

    <Footer />
  </>
)
