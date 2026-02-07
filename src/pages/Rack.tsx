import { Footer } from '../components/Footer'
import { RotaryKnob } from '../components/RotaryKnob'
import { GlassOverlay } from '../components/GlassOverlay'
import { Waveform } from '../components/Waveform'
import { useState } from 'hono/jsx'

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
        <div class="rack-window-container">
          {channel === '2' ? (
            <>
              {/* CH2 GHOST CHASSIS: 4-Layer Recessed-Depth Stack */}
              {/* LAYER 1: Reactive SVG Signal (behind chassis) */}
              <Waveform 
                channel={channel} 
                style="oscilloscope"
                amplitude={1}
                frequency={1}
              />
              
              {/* LAYER 2: Transparent Machined Plate (the faceplate) */}
              <img 
                src="/static/machined-assets/cricket-rehearsal-optimized.webp"
                alt="Cricket Road Rehearsal Module Faceplate"
                class="rack-ghost-chassis"
                loading="lazy"
              />
              
              {/* LAYER 3: Interactive Glass Overlay (monitor window) */}
              <div class="rack-glass-monitor"></div>
              
              {/* LAYER 4: Invisible Hitbox Navigation (BOOK NOW button) */}
              <a 
                href={bookingUrl || '#'}
                class="rack-booking-hitbox"
                aria-label="Book Cricket Road Rehearsals"
                rel="noopener noreferrer"
              />
            </>
          ) : (
            <>
              {/* STANDARD 4-LAYER STACK (other channels) */}
              {/* LAYER 1: Base Machined Asset (static image) */}
              <div class="rack-asset-base"></div>
              
              {/* LAYER 2: SVG Waveform Signal Feed (living pulse) */}
              <Waveform 
                channel={channel} 
                style={channel === '7' ? 'oscilloscope' : 'oscilloscope'}
                amplitude={1}
                frequency={1}
              />
              
              {/* LAYER 3: Machined Window (glass or organic grain) */}
              <div class="rack-glass-overlay"></div>
              
              {/* LAYER 4: Neon Pulse Rail (active signal) */}
              <div class="rack-signal-pulse"></div>
            </>
          )}
        </div>
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

// System Status Module with full signal state management
const SystemStatusModule = () => {
  // State for all three knob parameters
  const [inputGain, setInputGain] = useState(75)
  const [monitorMix, setMonitorMix] = useState(60)
  const [signalLevel, setSignalLevel] = useState(85)
  
  // Compute waveform parameters from knob states
  const waveformAmplitude = signalLevel / 100  // 0.0 to 1.0
  const waveformFrequency = inputGain / 50     // 0.0 to 2.0
  const waveformIntensity = 0.1 + (signalLevel / 100) * 1.4  // 0.1 to 1.5
  
  return (
    <section class="rack-module standard channel-active-green" data-channel="7">
      <div class="module-header">
        <div class="led green"></div>
        <h2 class="module-title">SYSTEM STATUS</h2>
        <span class="module-id">[SYS-MOD]</span>
      </div>
      <div class="module-body">
        <div class="rack-window-container">
          {/* LAYER 1: Base Machined Asset (static image) */}
          <div class="rack-asset-base"></div>
          
          {/* LAYER 2: SVG Waveform Signal Feed - FULLY SYNCED TO ALL KNOBS */}
          <Waveform 
            channel="7"
            style="oscilloscope"
            amplitude={waveformAmplitude}
            frequency={waveformFrequency}
            signalIntensity={waveformIntensity}
          />
          
          {/* LAYER 3: Machined Window (glass or organic grain) */}
          <div class="rack-glass-overlay"></div>
          
          {/* LAYER 4: Neon Pulse Rail (active signal) */}
          <div class="rack-signal-pulse"></div>
        </div>
        
        <div class="system-status-panel">
          <p class="system-status">SIGNAL CLEAR · SYSTEM LIVE · READY FOR BOOKING</p>
          
          <div class="knobs-row">
            <RotaryKnob 
              label="INPUT GAIN" 
              min={0} 
              max={100} 
              defaultValue={75} 
              channel="7"
              unit="dB"
              glowColor="var(--neon-green)"
              onChange={(value) => setInputGain(value)}
              onIntensityChange={(intensity) => {
                // Input gain affects frequency
                // This creates the "frequency modulation" effect
              }}
            />
            <RotaryKnob 
              label="MONITOR MIX" 
              min={0} 
              max={100} 
              defaultValue={60} 
              channel="7"
              unit="%"
              glowColor="var(--neon-green)"
              onChange={(value) => setMonitorMix(value)}
            />
            <RotaryKnob 
              label="SIGNAL LEVEL" 
              min={0} 
              max={100} 
              defaultValue={85} 
              channel="7"
              unit="dB"
              glowColor="var(--neon-green)"
              onChange={(value) => setSignalLevel(value)}
              onIntensityChange={(intensity) => {
                // Signal level affects amplitude
                // Direct mechanical linkage: knob → intensity → waveform height
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export const RackPage = () => (
  <>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <main class="rack-page" id="main-content">
      <h1 class="screen-reader-only">CRS Studio Network</h1>
      
      <div class="rack-intro">
        <h2>CRS STUDIO NETWORK</h2>
        <p>Signal routing ·  Booking surface · System status</p>
      </div>

      {/* PARENT MODULES - Contain sub-racks */}
      <RackModule 
        label="REHEARSALS" 
        type="parent"
        className="channel-active-orange"
      >
        <div class="sub-racks">
          <RackModule 
            label="Cowley Road" 
            type="sub-rack"
            videoId={1}
            bookingRoute="commission-studio"
            bookingUrl="https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services"
            buttonLabel="BOOK REHEARSAL"
            channel="1"
            className="channel-active-orange"
          >
            <p class="channel-description">118 Cowley Road, Oxford OX4 1JE · £45 / 2 hours</p>
          </RackModule>

          <RackModule 
            label="Cricket Road" 
            type="sub-rack"
            videoId={2}
            bookingRoute="recording-live"
            bookingUrl="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX"
            buttonLabel="BOOK REHEARSAL"
            channel="2"
            className="channel-active-orange"
          >
            <p class="channel-description">92 Cricket Road, Oxford OX4 3DJ · Hourly rates</p>
          </RackModule>
        </div>
      </RackModule>

      {/* STANDARD MODULES */}
      <RackModule 
        label="CONTROL ROOM — DRY HIRE" 
        videoId={7}
        bookingRoute="commission-studio"
        bookingUrl="https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services"
        buttonLabel="BOOK DRY HIRE"
        channel="3"
        className="channel-active-magenta"
      >
        <p class="channel-description">92 Cricket Road · No engineer included · Monitoring & mixing only</p>
      </RackModule>

      <RackModule 
        label="AV SERVICES — HIRE & REPAIR" 
        bookingRoute="allocation-av"
        bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
        buttonLabel="ALLOCATION AVAILABLE"
        channel="5"
        className="channel-active-amber"
      >
        <p class="channel-description">Engineer-led live sound, installations, and technical support for community venues and cultural events.</p>
      </RackModule>

      <RackModule 
        label="WORKSHOP CAFÉ + EVENTS" 
        className="workshop-cafe cafe-module channel-active-cyan"
        bookingRoute="commission-podcast"
        bookingUrl="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
        buttonLabel="COMMISSION ALLOCATION"
        channel="4"
      >
        <div class="cafe-content">
          <p class="cafe-description">The Workshop Café is where ideas brew as freely as the coffee. A warm, analog space for collaboration, conversation, and creativity—no booking required for café hours, community programming by allocation.</p>
          
          <div class="cafe-programming">
            <h3>What We Offer</h3>
            <ul>
              <li><strong>Open Creative Sessions</strong> · Fridays & Saturdays, drop-in coworking</li>
              <li><strong>Technical Workshops</strong> · Audio gear tutorials & sound design clinics</li>
              <li><strong>Community Events</strong> · Album listening parties, gear swap nights, open mics</li>
              <li><strong>Subsidised Rates</strong> · Pay-what-you-can model for local artists & grassroots orgs</li>
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
        channel="6"
        className="channel-active-white"
      >
        <div class="contact-info">
          <p><strong>Email:</strong> <a href="mailto:info@crsoxford.com">info@crsoxford.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+447515886945">+44 7515 886945</a></p>
          <p><strong>Socials:</strong> 
            <a href="https://www.instagram.com/cowleyroadstudios" target="_blank" rel="noopener">Instagram</a> ·
            <a href="https://www.facebook.com/cowleyroadstudios" target="_blank" rel="noopener">Facebook</a>
          </p>
        </div>
      </RackModule>

      {/* SYSTEM STATUS - Now with knob-to-waveform sync */}
      <SystemStatusModule />
    </main>

    <Footer />

    {/* PATCH BAY ROUTING LOGIC - v4.1 */}
    <script src="/assets/booking-router.js" defer></script>
  </>
)
