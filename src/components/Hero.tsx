import { Header } from './Header'

/**
 * Hero Component: 3-Column Action Row
 * Infrastructure-over-retail positioning
 * Routes: Rehearse Now (Cricket) | Commission Allocation (Cowley) | Explore System (Rack)
 */
export const Hero = () => (
  <>
    <Header />
    
    <section class="hero-container">
      <div class="hero-intro">
        <h1 class="hero-title">Cowley Road Studios</h1>
        <p class="hero-subtitle">Professional audio infrastructure for Oxford. Continuing 25 years of Soundworks legacy.</p>
      </div>

      {/* 3-COLUMN ACTION ROW: Infrastructure Routing */}
      <div class="action-row">
        
        {/* UNIT A: REHEARSE OR RECORD NOW (Cricket Road - Operational) */}
        <a href="/book/recording-live" class="action-unit">
          <div class="action-header">
            <span class="led green"></span>
            <h2 class="action-title">REHEARSE OR RECORD NOW</h2>
          </div>
          <div class="action-body">
            <p class="action-subtext">Cricket Road Studios</p>
            <p class="action-description">Book online. Fully operational. Same engineering standards.</p>
            <button class="action-cta" type="button">BOOK SESSIONS</button>
          </div>
        </a>

        {/* UNIT B: COMMISSION FUTURE STUDIO TIME (Cowley Road - Pre-Build) */}
        <a href="/commission" class="action-unit">
          <div class="action-header">
            <span class="led amber"></span>
            <h2 class="action-title">COMMISSION FUTURE STUDIO TIME</h2>
          </div>
          <div class="action-body">
            <p class="action-subtext">Cowley Road HQ</p>
            <p class="action-description">Pre-build allocations. Lock in rates before launch.</p>
            <button class="action-cta" type="button">ALLOCATION AVAILABLE</button>
          </div>
        </a>

        {/* UNIT C: EXPLORE THE SYSTEM (Rack Console) */}
        <a href="/rack" class="action-unit">
          <div class="action-header">
            <span class="led green"></span>
            <h2 class="action-title">EXPLORE THE SYSTEM</h2>
          </div>
          <div class="action-body">
            <p class="action-subtext">Virtual Patch Bay</p>
            <p class="action-description">Studio • AV • Repairs • Café. Full service routing.</p>
            <button class="action-cta" type="button">OPEN CONSOLE</button>
          </div>
        </a>

      </div>

      {/* SYSTEM STATUS BAR */}
      <div class="system-status-bar">
        <div class="status-segment">
          <span class="led green"></span>
          <strong>LIVE NOW:</strong> <a href="/book/recording-live">Cricket Road Sessions</a>
        </div>
        <div class="status-segment">
          <span class="led amber"></span>
          <strong>BUILDING:</strong> <a href="/commission">Cowley Road HQ (Commissioning Phase)</a>
        </div>
      </div>
    </section>
  </>
)
