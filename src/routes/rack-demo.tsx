// src/routes/rack-demo.tsx
import { Hono } from 'hono'
import { CRSShell } from '../layouts/crs-shell'
import { html } from 'hono/html'

export const rackDemo = new Hono()

// 🏗️ CANONICAL RACK UNIT HTML (Reference Object)
const RACK_UNITS = html`
<section class="rack-unit" aria-labelledby="rack-signal-path">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-signal-path">
      01 / SIGNAL PATH
    </span>
    <span class="rack-indicator green" aria-label="System active"></span>
  </header>

  <div class="rack-content">
    <p>
      Hybrid analogue / digital workflow integrating vintage harmonic character
      with modern precision and recall.
    </p>

    <ul class="rack-spec">
      <li><strong>Front End:</strong> Audient console architecture</li>
      <li><strong>Preamps:</strong> Boutique tube &amp; Neve-style circuits</li>
      <li><strong>Tracking:</strong> Low-noise, phase-coherent signal chain</li>
    </ul>
  </div>
</section>

<section class="rack-unit" aria-labelledby="rack-monitoring">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-monitoring">
      02 / MONITORING
    </span>
    <span class="rack-indicator green" aria-label="System active"></span>
  </header>

  <div class="rack-content">
    <p>
      Transparent, fatigue-resistant monitoring for extended sessions. Multiple reference points available.
    </p>

    <ul class="rack-spec">
      <li><strong>Mains:</strong> Neumann KH 120 (stereo field reference)</li>
      <li><strong>Subs:</strong> Yamaha HS8 (low-end detail)</li>
      <li><strong>Alternative:</strong> Auratone 5C (mix translation check)</li>
    </ul>
  </div>
</section>

<section class="rack-unit" aria-labelledby="rack-outboard">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-outboard">
      03 / OUTBOARD
    </span>
    <span class="rack-indicator yellow" aria-label="Partially available"></span>
  </header>

  <div class="rack-content">
    <p>
      Curated selection of character processors for tone-shaping and colour.
    </p>

    <ul class="rack-spec">
      <li><strong>Compression:</strong> Tube / FET / VCA topologies</li>
      <li><strong>EQ:</strong> Pultec-style curves, API-style surgical</li>
      <li><strong>Saturation:</strong> Tape / transformer emulation units</li>
    </ul>
  </div>
</section>

<section class="rack-unit" aria-labelledby="rack-status">
  <span class="screw top-left"></span>
  <span class="screw top-right"></span>
  <span class="screw bottom-left"></span>
  <span class="screw bottom-right"></span>

  <header class="rack-header">
    <span class="rack-label" id="rack-status">
      04 / SYSTEM STATUS
    </span>
    <span class="rack-indicator orange pulse" aria-label="Build phase"></span>
  </header>

  <div class="rack-content">
    <p>
      <strong>STATUS:</strong> Final phase installation in progress<br>
      <strong>AVAILABLE NOW:</strong> Band rehearsals (Cricket Road), Equipment repairs, AV services<br>
      <strong>COMING SOON:</strong> Recording sessions, Production rooms, Workshop Café
    </p>
  </div>
</section>
`

rackDemo.get('/', (c) => {
  return c.html(
    CRSShell({
      title: 'Rack Unit Demo',
      description: 'CRS canonical rack unit reference — institutional UI with inline critical CSS',
      children: html`
        <main class="rack-container">
          ${RACK_UNITS}
        </main>
      `
    })
  )
})
