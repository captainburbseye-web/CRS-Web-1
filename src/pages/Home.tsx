import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const HomePage = () => (
  <>
    <Header />

    {/* SYSTEM STATUS BLOCK — BUILD PHASE LED (CONDENSED FOR MOBILE) */}
    <section class="rack-unit device-status" style="background: rgba(255, 140, 0, 0.05); border-left: 4px solid #FF8C00;">
      <div class="rack-unit-header">
        <div class="rack-unit-led">
          <span class="led orange"></span>
        </div>
        <h2 class="rack-unit-title" style="color: #FF8C00;">/// SYSTEM STATUS</h2>
      </div>
      
      <div class="rack-unit-content">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85); margin-bottom: 1rem;">
          <p style="margin-bottom: 0.5rem;">
            <strong style="color: #FF8C00;">STATUS:</strong> Final phase installation in progress
          </p>
          <p style="margin-bottom: 0.5rem;">
            <strong style="color: #FF8C00;">AVAILABLE NOW:</strong> Band rehearsals (Cricket Road) · Equipment repairs · AV services
          </p>
          <p style="margin-bottom: 0;">
            <strong style="color: #FF8C00;">PRE-SALE:</strong> Book studio time now at discounted rates
          </p>
        </div>
        <div style="text-align: center;">
          <a href="/studio" class="cta-button cta-button-primary" style="border-color: #FF8C00; color: #FF8C00; background: rgba(255, 140, 0, 0.1); font-size: 1.1rem; padding: 14px 28px;">STUDIO PRE-SALE</a>
        </div>
      </div>
    </section>

    {/* STUDIO SESSIONS */}
    <section class="rack-unit device-studio">
      <div class="rack-unit-header">
        <div class="rack-unit-led">
          <span class="led yellow"></span>
        </div>
        <h2 class="rack-unit-title">STUDIO SESSIONS</h2>
      </div>
      
      <div class="rack-unit-content">
        <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
          Purpose-built recording and production environments designed for reliable, repeatable results. From vocal tracking to full-band production, we provide the technical certainty you need to focus on your performance.
        </p>
        <div style="text-align: center;">
          <a href="/studio" class="cta-button cta-button-primary">BOOK SESSION</a>
        </div>
      </div>
    </section>

    {/* BAND REHEARSALS — CRICKET ROAD */}
    <section class="rack-unit device-rehearsal">
      <div class="rack-unit-header">
        <div class="rack-unit-led">
          <span class="led green"></span>
        </div>
        <h2 class="rack-unit-title">BAND REHEARSALS — CRICKET ROAD</h2>
      </div>
      
      <div class="rack-unit-content">
        {/* Cricket Studio Branding */}
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <img 
            src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/NEW%20BADGES%20RACK%20UI/CRICKET%20GUITAR)%20-%20Copy.png" 
            alt="Cricket Studio"
            style="width: 180px; height: auto; max-width: 100%;"
          />
        </div>
        
        <p style="margin-bottom: 1rem; color: rgba(245, 245, 245, 0.85);">
          Fixed-length sessions with basic PA included at Cricket Road.
        </p>
        <p style="margin-bottom: 1rem; color: rgba(245, 245, 245, 0.65); font-size: 0.9rem;">
          Cowley Road rehearsal space is nearing the end of the build phase and will be available soon.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; flex-direction: column; align-items: center;">
          <a href="/book" class="cta-button cta-button-peak-red cta-button-primary">BOOK REHEARSAL</a>
        </div>
      </div>
    </section>

    {/* WORKSHOP CAFÉ - MOVED UP (was position 5, now position 4) */}
    <section class="rack-unit device-cafe">
      <div class="rack-unit-header">
        <div class="rack-unit-led">
          <span class="led green"></span>
        </div>
        <h2 class="rack-unit-title">WORKSHOP CAFÉ</h2>
      </div>
      
      <div class="rack-unit-content">
        <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
          The public-facing space of CRS — a café, workspace, and small venue supporting community events and creative activity in the heart of East Oxford. Available for private hire and public programming.
        </p>
        <div style="text-align: center;">
          <a href="/workshop-cafe" class="cta-button cta-button-secondary">LEARN MORE</a>
        </div>
      </div>
    </section>

    {/* AV SERVICES - MOVED DOWN (was position 4, now position 5) */}
    <section class="rack-unit device-av">
      <div class="rack-unit-header">
        <div class="rack-unit-led">
          <span class="led yellow"></span>
        </div>
        <h2 class="rack-unit-title">AV SERVICES & LIVE SOUND</h2>
      </div>
      
      <div class="rack-unit-content">
        <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
          Engineer-led live sound, installations, and technical support for community venues, cultural events, and public gatherings. We provide the technical backbone for your event, so you can focus on your audience.
        </p>
        <div style="text-align: center;">
          <a href="/av-services" class="cta-button cta-button-secondary">LEARN MORE</a>
        </div>
      </div>
    </section>

    {/* PUBLIC ACCESS - CONDENSED */}
    <section class="rack-unit device-community">
      <div class="rack-unit-header">
        <div class="rack-unit-led">
          <span class="led orange"></span>
        </div>
        <h2 class="rack-unit-title">/// PUBLIC ACCESS & COMMUNITY</h2>
      </div>
      
      <div class="rack-unit-content">
        <p style="margin-bottom: 1.5rem; color: rgba(245, 245, 245, 0.85);">
          CRS exists to make professional-grade recording and AV infrastructure available to Oxford's grassroots scene. We offer subsidized rates, supported sessions, and training workshops for community groups, emerging artists, and non-profit organizations.
        </p>
        <div style="text-align: center;">
          <a href="/contact" class="cta-button cta-button-secondary">GET IN TOUCH</a>
        </div>
      </div>
    </section>

    <Footer />
  </>
)
