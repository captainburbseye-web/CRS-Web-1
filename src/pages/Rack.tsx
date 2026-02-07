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
  virtualInterface?: boolean
  description?: string
  pricing?: string
}

const RackModule = ({ label, type = 'standard', className, children, videoId, qrLink, bookingRoute, bookingUrl, buttonLabel, channel, virtualInterface = false, description, pricing }: RackModuleProps) => (
  <section class={`rack-module ${type} ${className || ''} ${virtualInterface ? 'virtual-interface' : ''}`} data-channel={channel}>
    <div class="module-header">
      <div class="led green"></div>
      <h2 class="module-title">{label}</h2>
      <span class="module-id">[{label.substring(0, 3).toUpperCase()}-MOD]</span>
    </div>
    <div class="module-body">
      {videoId && (
        <div class="rack-window-container">
          {(channel === '1' || channel === '2' || channel === '3' || channel === '4' || channel === '8') ? (
            <>
              {/* CH1/CH2/CH3/CH4/CH8 GHOST CHASSIS: 4-Layer Recessed-Depth Stack */}
              {/* LAYER 1: Reactive SVG Signal (behind chassis) */}
              <Waveform 
                channel={channel} 
                style="oscilloscope"
                amplitude={channel === '1' ? 1.2 : channel === '3' ? 1.15 : channel === '4' ? 1.1 : channel === '8' ? 1.3 : 1}
                frequency={channel === '1' ? 0.8 : channel === '3' ? 0.85 : channel === '4' ? 0.9 : channel === '8' ? 0.9 : 1}
              />
              
              {/* LAYER 2: Transparent Machined Plate (the faceplate) */}
              <img 
                src={
                  channel === '1' 
                    ? "/static/machined-assets/cowley-rehearsal-optimized.webp"
                    : channel === '2'
                    ? "/static/machined-assets/cricket-control-room-optimized.webp"
                    : channel === '3'
                    ? "/static/machined-assets/cowley-pods-rack.webp"
                    : channel === '4'
                    ? "/static/machined-assets/workshop-cafe-optimized.webp"
                    : channel === '8'
                    ? "/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
                    : "/static/machined-assets/cricket-rehearsal-optimized.webp"
                }
                alt={`${label} Module Faceplate`}
                class="rack-ghost-chassis"
                loading="lazy"
              />
              
              {/* LAYER 3: Interactive Glass Overlay (monitor window) */}
              <div class="rack-glass-monitor"></div>
              
              {/* LAYER 4: Invisible Hitbox Navigation */}
              {virtualInterface ? (
                channel === '3' ? (
                  <>
                    {/* CH3: Cowley Pods - 3 Isolation Units (1 Active + 2 Standby) */}
                    {/* POD 1: Main Suite (Green ENGAGE - Active) */}
                    <a 
                      href="/book/pod1"
                      class="ghost-hitbox"
                      style={{
                        position: 'absolute',
                        bottom: '18%',
                        left: '36.5%',
                        width: '15.5%',
                        height: '34%',
                        borderRadius: '4px'
                      }}
                      aria-label="Pod 1 · Main Suite · £35/hr · Book Now"
                      title="Book Main Suite"
                      rel="noopener noreferrer"
                    />
                    
                    {/* POD 2: Vocal A (Amber STANDBY - Coming Soon) */}
                    <div 
                      class="ghost-hitbox-disabled"
                      style={{
                        position: 'absolute',
                        top: '26%',
                        right: '16.5%',
                        width: '10.5%',
                        height: '26%',
                        borderRadius: '4px',
                        cursor: 'not-allowed',
                        opacity: 0.6
                      }}
                      aria-label="Pod 2 · Vocal A · Coming Soon"
                      title="Vocal A - Coming Soon"
                    />
                    
                    {/* POD 3: Vocal B (Amber STANDBY - Coming Soon) */}
                    <div 
                      class="ghost-hitbox-disabled"
                      style={{
                        position: 'absolute',
                        bottom: '18%',
                        right: '16.5%',
                        width: '10.5%',
                        height: '26%',
                        borderRadius: '4px',
                        cursor: 'not-allowed',
                        opacity: 0.6
                      }}
                      aria-label="Pod 3 · Vocal B · Coming Soon"
                      title="Vocal B - Coming Soon"
                    />
                  </>
                ) : channel === '4' ? (
                  <>
                    {/* CH4: Multiple hitboxes for Workshop Café controls */}
                    {/* HITBOX 1: Main Engage Button (Red Light - Right) */}
                    <a 
                      href="/cafe"
                      class="ghost-hitbox"
                      style={{
                        position: 'absolute',
                        bottom: '18%',
                        right: '6%',
                        width: '9%',
                        height: '32%',
                        borderRadius: '50%'
                      }}
                      aria-label="Workshop Café · Enter Site · 118 Cowley Road"
                      rel="noopener noreferrer"
                    />
                    
                    {/* HITBOX 2: Menu Button (Green Square - Left) */}
                    <a 
                      href="/cafe/menu"
                      class="ghost-hitbox"
                      style={{
                        position: 'absolute',
                        bottom: '22%',
                        right: '27%',
                        width: '4.5%',
                        height: '11%',
                        borderRadius: '2px'
                      }}
                      aria-label="View Café Menu"
                      rel="noopener noreferrer"
                    />
                    
                    {/* HITBOX 3: Events Button (Green Square - Middle) */}
                    <a 
                      href="/cafe/events"
                      class="ghost-hitbox"
                      style={{
                        position: 'absolute',
                        bottom: '22%',
                        right: '21%',
                        width: '4.5%',
                        height: '11%',
                        borderRadius: '2px'
                      }}
                      aria-label="View Café Events"
                      rel="noopener noreferrer"
                    />
                    
                    {/* HITBOX 4: Hire Button (Green Square - Right) */}
                    <a 
                      href="/cafe/hire"
                      class="ghost-hitbox"
                      style={{
                        position: 'absolute',
                        bottom: '22%',
                        right: '15%',
                        width: '4.5%',
                        height: '11%',
                        borderRadius: '2px'
                      }}
                      aria-label="Venue Hire Enquiry"
                      rel="noopener noreferrer"
                    />
                  </>
                ) : (
                  <a 
                    href={bookingUrl || '#'}
                    class="ghost-hitbox"
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      right: '3%',
                      width: '22%',
                      height: '12%'
                    }}
                    aria-label={`${label} · ${description || 'Book now'} · ${pricing || ''}`}
                    rel="noopener noreferrer"
                  />
                )
              ) : (
                <a 
                  href={bookingUrl || '#'}
                  class="rack-booking-hitbox"
                  aria-label={`Book ${label}`}
                  rel="noopener noreferrer"
                />
              )}
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

    <main class="rack-page virtual-interface" id="main-content">
      <h1 class="screen-reader-only">CRS Studio Network — Virtual Rack Interface</h1>
      
      <span class="sr-context">You are viewing a virtual rack interface. Click on the booking button overlaid on each rack module to book a session. Hover over buttons to see session details.</span>

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
            virtualInterface={true}
            description="118 Cowley Road, Oxford OX4 1JE"
            pricing="£45 / 2 hours"
          />

          <RackModule 
            label="Control Room — Cricket Road" 
            type="sub-rack"
            videoId={2}
            bookingRoute="commission-studio"
            bookingUrl="https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services"
            buttonLabel="BOOK CONTROL ROOM"
            channel="2"
            className="channel-active-cyan"
            virtualInterface={true}
            description="92 Cricket Road · Control Room Hire"
            pricing="No engineer included"
          />

          <RackModule 
            label="Cricket Road Rehearsal" 
            type="sub-rack"
            videoId={8}
            bookingRoute="recording-live"
            bookingUrl="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX"
            buttonLabel="BOOK REHEARSAL"
            channel="8"
            className="channel-active-magenta"
            virtualInterface={true}
            description="📍 CRICKET ROAD · Rehearsal Studio (10 min walk)"
            pricing="£40 / 2 hours"
          />
        </div>
      </RackModule>

      {/* CH4: WORKSHOP CAFÉ — Standalone 4U Module */}
      <RackModule 
        label="Workshop Café" 
        type="sub-rack"
        videoId={4}
        bookingRoute="cafe"
        bookingUrl="/cafe"
        buttonLabel="ENGAGE"
        channel="4"
        className="channel-active-amber"
        virtualInterface={true}
        description="118 Cowley Road · Creative Community Space"
        pricing="Open Sessions · Events · Venue Hire"
      />

      {/* CH3: COWLEY PODS (ISOLATION UNITS) — 3-Pod Configuration */}
      <RackModule 
        label="Cowley Pods" 
        type="sub-rack"
        videoId={3}
        bookingRoute="isolation-units"
        bookingUrl="/book/pod1"
        buttonLabel="BOOK POD 1"
        channel="3"
        className="channel-active-charcoal"
        virtualInterface={true}
        description="118 Cowley Road · Isolation Recording Units"
        pricing="Pod 1: £35/hr · Pods 2 & 3: Coming Soon"
      />

      {/* The following modules are hidden in Virtual Interface mode until assets are created */}
      {/* TODO: Create Ghost Chassis assets for CH5, CH6 */}

      {/* SYSTEM STATUS - Now with knob-to-waveform sync */}
      <SystemStatusModule />
    </main>

    <Footer />

    {/* PATCH BAY ROUTING LOGIC - v4.1 */}
    <script src="/assets/booking-router.js" defer></script>
  </>
)
