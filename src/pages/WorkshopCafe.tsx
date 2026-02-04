import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const WorkshopCafePage = () => (
  <>
    {/* Apply WSC mode class to body */}
    <script dangerouslySetInnerHTML={{__html: `document.body.classList.add('wsc-mode');`}} />
    
    <Header />

    {/* VENUE WELCOME RACK */}
    <section class="rack-unit led-orange">
      <div class="rack-screw"></div>
      <div class="rack-screw"></div>
      <div class="rack-screw"></div>
      <div class="rack-screw"></div>
      
      <h2 class="rack-unit-title">Workshop Café — Venue</h2>
      
      {/* STATUS LINE - NON-NEGOTIABLE */}
      <div style="background: rgba(255, 140, 0, 0.1); border: 2px solid #FF8C00; padding: 1rem; margin-bottom: 1.5rem;">
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.938rem; font-weight: 700; color: #FF8C00; margin-bottom: 0.5rem;">
          Workshop Café is not currently open for daily café service.
        </p>
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.85);">
          The space is available by enquiry for private or community use during the build phase.
        </p>
      </div>
      
      <p style="margin-bottom: 1.5rem;">
        Bookable public-facing venue within CRS for small events and private hire.
      </p>
      
      <div class="wsc-capacity-spec">
        <div class="wsc-capacity-item">
          Capacity: <strong>25 seated</strong>
        </div>
        <div class="wsc-capacity-item">
          <strong>up to 60 standing</strong>
        </div>
      </div>
      
      <div class="wsc-use-case-grid">
        <div class="wsc-use-case-label">listening sessions</div>
        <div class="wsc-use-case-label">film screenings</div>
        <div class="wsc-use-case-label">workshops & classes</div>
        <div class="wsc-use-case-label">talks & discussions</div>
        <div class="wsc-use-case-label">private bookings</div>
      </div>
      
      <a href="/book" class="cta-button">BOOK WORKSHOP CAFÉ</a>
    </section>

    {/* CAFÉ SIGNAGE HERO - Above the fold */}
    <section class="crs-section cafe-heartbeat" style="padding: 0; max-width: 1400px; margin: 0 auto;">
      <img 
        src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/Workshop_Cafe_CTA_Primary.png" 
        alt="Workshop Café — 118 Cowley Road"
        style="width: 100%; height: auto; display: block;"
        loading="eager"
      />
    </section>

    {/* EVENT LOG - Live feed */}
    <section class="crs-section section-dark">
      <div class="section-header">
        <h2 class="section-title heading">[ EVENT_LOG ]</h2>
        <p class="section-intro" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">118 COWLEY ROAD — PUBLIC SCHEDULE</p>
      </div>

      <div id="workshop-cafe-events" style="margin-top: 2rem;">
        <p style="font-size: 0.875rem; font-style: italic; color: rgba(245, 245, 245, 0.7);">Loading events...</p>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        fetch('/events.json')
          .then(res => res.json())
          .then(data => {
            const container = document.getElementById('workshop-cafe-events');
            if (!container) return;
            
            if (!data.events || data.events.length === 0) {
              container.innerHTML = '<div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(127, 255, 0, 0.2); padding: 1.5rem; text-align: center;"><p style="font-family: \\'JetBrains Mono\\', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">[ STATUS: NO_ACTIVE_ENTRIES ]</p><p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">No events scheduled this week — <a href="/contact?service=venue" style="color: var(--mustard); text-decoration: none; font-weight: 700;">inquire for space allocation</a></p></div>';
              return;
            }
            
            const eventsToShow = data.events.slice(0, 5);
            
            container.innerHTML = eventsToShow.map(event => {
              const date = new Date(event.start);
              const dateStr = date.toLocaleDateString('en-GB', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short'
              });
              const timeStr = event.start.includes('T') ? date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
              }) : '';
              
              return \`
                <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.25rem; margin-bottom: 1.25rem;">
                  <h4 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.03em;">\${event.title}</h4>
                  <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(245, 245, 245, 0.6); margin-bottom: 0.5rem;">\${dateStr}\${timeStr ? ' · ' + timeStr : ''}</p>
                  <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">\${event.description.substring(0, 120)}\${event.description.length > 120 ? '...' : ''}</p>
                </div>
              \`;
            }).join('');
          })
          .catch(err => {
            const container = document.getElementById('workshop-cafe-events');
            if (container) {
              container.innerHTML = '<p style="font-size: 0.875rem; color: rgba(245, 245, 245, 0.7);">Unable to load events.</p>';
            }
          });
      `}} />
    </section>

    {/* RESOURCE ALLOCATION RATES */}
    <section class="crs-section cafe-heartbeat">
      <div class="section-header">
        <h2 class="section-title cafe-title">RESOURCE ALLOCATION RATES</h2>
        <p class="section-intro cafe-intro">
          118 Cowley Road — Multi-use infrastructure
        </p>
      </div>

      <div style="max-width: 900px; margin: 0 auto;">
        {/* Rate Card Grid */}
        <div style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
          
          {/* Full Venue Hire */}
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
              <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin: 0;">FULL VENUE HIRE</h3>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 700; color: rgba(245, 245, 245, 0.9);">£25/hr | £90/4hrs | £200/day</span>
            </div>
            <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.8); margin: 0;">
              Capacity: 40–60 people · Includes PA system & projection
            </p>
          </div>

          {/* Meeting Table */}
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
              <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin: 0;">MEETING TABLE</h3>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 700; color: rgba(245, 245, 245, 0.9);">£25 per half-day</span>
            </div>
            <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.8); margin: 0;">
              Workspace with high-speed connectivity
            </p>
          </div>

          {/* Community Event */}
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
              <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin: 0;">COMMUNITY EVENT</h3>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 700; color: rgba(245, 245, 245, 0.9);">£30 (subsidized)</span>
            </div>
            <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.8); margin: 0;">
              For grassroots/non-profit cultural activity
            </p>
          </div>
        </div>

        {/* Access Policy */}
        <div style="background: rgba(216, 162, 0, 0.1); border: 1px solid var(--mustard); padding: 1.5rem; text-align: center;">
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
            [ ACCESS POLICY ]
          </p>
          <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.9); margin: 0;">
            Priority allocation granted to local grassroots initiatives. All commercial hire directly funds the CRS Creative Infrastructure.
          </p>
        </div>

        {/* Booking CTA */}
        <div style="margin-top: 2rem; text-align: center;">
          <a href="/book?service=venue" class="crs-button mono">BOOK SPACE</a>
        </div>
      </div>
    </section>

    {/* INFRASTRUCTURE ALLOCATION - Modular Use Cases */}
    <section class="crs-section cafe-heartbeat">
      <div class="section-header">
        <h2 class="section-title cafe-title">[ INFRASTRUCTURE_ALLOCATION ]</h2>
        <p class="section-intro cafe-intro" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Modular Space Protocol</p>
      </div>

      <div style="max-width: 700px; margin: 0 auto;">
        <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 1.25rem;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MODULE_01 // OPEN WORKSPACE</p>
            <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">Drop-in desk space with high-speed connectivity. No booking required.</p>
          </div>
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--mustard); padding: 1.25rem;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--mustard); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MODULE_02 // COMMUNITY EVENTS</p>
            <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">Talks, screenings, workshops, open mics. Subsidized rates for grassroots/non-profit.</p>
          </div>
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--crs-green); padding: 1.25rem;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MODULE_03 // PRIVATE HIRE</p>
            <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.85);">Small-scale meetings, rehearsals, or private sessions. PA system & projection available.</p>
          </div>
        </div>
      </div>
    </section>

    {/* REFRESHMENT PROTOCOL - Coffee/Tea Menu */}
    <section class="crs-section section-dark">
      <div class="section-header">
        <h2 class="section-title heading">[ REFRESHMENT_PROTOCOL ]</h2>
        <p class="section-intro" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.7); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">Specialty Coffee — Oxford Roasted</p>
      </div>

      <div style="max-width: 800px; margin: 0 auto;">
        {/* Coffee Specs */}
        <div style="margin-bottom: 3rem;">
          <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 1.5rem;">COFFEE ALLOCATION</h3>
          <div style="display: grid; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">ESPRESSO // SINGLE</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">ESPRESSO // DOUBLE</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">FLAT_WHITE</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">CAPPUCCINO</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">LATTE</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">AMERICANO</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£3.00</span>
            </div>
          </div>
        </div>

        {/* Tea Specs */}
        <div style="margin-bottom: 3rem;">
          <h3 style="font-family: 'Archivo Black', sans-serif; font-size: 0.875rem; font-weight: 900; color: var(--mustard); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 1.5rem;">TEA ALLOCATION</h3>
          <div style="display: grid; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">ENGLISH_BREAKFAST</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">EARL_GREY</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">GREEN_TEA</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid rgba(245, 245, 245, 0.1);">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">PEPPERMINT</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--mustard);">£2.50</span>
            </div>
          </div>
        </div>

        {/* Protocol Note */}
        <div style="background: rgba(127, 255, 0, 0.05); border: 1px solid rgba(127, 255, 0, 0.2); padding: 1.5rem; text-align: center;">
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--crs-green); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">[ MILK_OPTIONS ]</p>
          <p style="font-size: 0.875rem; line-height: 1.6; color: rgba(245, 245, 245, 0.9); margin: 0;">Oat · Soy · Dairy — No additional charge</p>
        </div>
      </div>
    </section>

    {/* CRS ROUTING PANEL - Authority handoff */}
    <section class="crs-section section-dark">
      <div style="max-width: 700px; margin: 0 auto; text-align: center; padding: 2rem 1rem;">
        <p style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 245, 0.9); margin-bottom: 1.5rem;">
          Workshop Café operates as the public-facing space of CRS.
        </p>
        <p style="font-size: 0.9375rem; color: rgba(245, 245, 245, 0.7); margin-bottom: 2rem;">
          For venue hire, technical support, or bookings:
        </p>
        <a href="/book" class="crs-button mono">VIEW CRS SERVICES</a>
      </div>
    </section>

    <Footer />
  </>
)
