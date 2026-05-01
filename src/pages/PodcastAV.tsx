/**
 * AV Services & Podcast Studio — SIGNAL MODULE v8.0
 * Expansion module of the CRS Stronghold chassis.
 * Uses subpage-chassis wrapper: rails + SSL backdrop + recessed panels.
 */

/* Bolt SVG — machined hex bolt for rails */
const Bolt = () => (
  <svg viewBox="0 0 100 100" class="subpage-bolt" aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#444" stroke="#111" stroke-width="4" />
    <circle cx="50" cy="50" r="25" fill="#222" />
    <circle cx="50" cy="50" r="15" fill="#111" />
  </svg>
);

const BOLTS = Array(14).fill(null);

export const PodcastAVPage = () => (
  <div class="subpage-chassis">

    {/* LEFT RAIL */}
    <div class="subpage-rail" aria-hidden="true">
      {BOLTS.map((_, i) => <Bolt key={i} />)}
    </div>

    {/* CENTRE COLUMN */}
    <div class="subpage-column">

      {/* ── HEADER ANCHOR ── */}
      <div class="subpage-header-anchor">
        <a href="/" aria-label="Cowley Road Studios — home">
          <img
            src="/static/crs-logo.png"
            alt="Cowley Road Studios"
            class="subpage-header-logo"
            width="180" height="67"
          />
        </a>
        <a href="/" class="subpage-header-back">← MAIN TERMINAL</a>
      </div>

      {/* ── LCD STATUS ── */}
      <div class="subpage-lcd">
        SIGNAL MODULE: AV SERVICES &nbsp;·&nbsp; OXFORD HQ: OPERATIONAL &nbsp;·&nbsp; ENGINEER-LED · FIELD-TESTED
      </div>

      {/* ── MODULE: HEADER ── */}
      <div class="subpage-module">
        <div class="subpage-module-label">AV SERVICES — SIGNAL MODULE</div>
        <div class="subpage-recessed">
          <h1 style="
            font-family:var(--font-mono);
            font-size:clamp(1.1rem, 3vw, 1.6rem);
            font-weight:700;
            color:var(--mustard);
            text-transform:uppercase;
            letter-spacing:0.08em;
            margin:0 0 0.75rem;
          ">PODCAST STUDIO &amp; AV SERVICES</h1>
          <p style="font-family:var(--font-mono); font-size:0.9375rem; color:var(--offwhite-dim); line-height:1.6; margin:0; max-width:580px;">
            Live sound, installations, hybrid events, podcast recording, and technical support. Engineer-led. Field-tested. Zero compromises.
          </p>
        </div>
      </div>

      {/* ── MODULE: PODCAST STUDIO ── */}
      <div class="subpage-module">
        <div class="subpage-module-label">PODCAST &amp; SPOKEN WORD STUDIO</div>
        <div class="subpage-recessed">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; font-family:var(--font-mono); font-size:0.875rem; color:var(--offwhite-dim);">
            <div>
              <p style="font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--mustard); font-weight:700; margin:0 0 0.75rem;">PERFECT FOR</p>
              <ul style="list-style:none; padding:0; margin:0; line-height:2;">
                <li>→ Podcasts &amp; interviews</li>
                <li>→ Voiceover &amp; spoken word</li>
                <li>→ Video podcast capture</li>
                <li>→ Remote session recording</li>
              </ul>
            </div>
            <div>
              <p style="font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--mustard); font-weight:700; margin:0 0 0.75rem;">RATE — CRICKET ROAD</p>
              <p style="font-size:1.5rem; font-weight:700; color:var(--offwhite); margin:0 0 0.25rem;">£30<span style="font-size:0.9rem; font-weight:400; color:var(--offwhite-mute);"> / hr</span></p>
              <p style="font-size:0.75rem; color:var(--offwhite-mute); margin:0 0 1rem;">With engineer · Minimum 2 hrs</p>
              <a
                href="https://app.squareup.com/appointments/buyer/widget/se7rvqsvhnnirj/L1MAM4DDPHKXX"
                target="_blank"
                rel="noopener noreferrer"
                class="subpage-cta"
                style="font-size:0.75rem; padding:0.6rem 1.25rem;"
              >BOOK PODCAST SESSION →</a>
            </div>
          </div>
          <div style="margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid rgba(255,255,255,0.05);">
            <p style="font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--mustard); font-weight:700; margin:0 0 0.75rem; font-family:var(--font-mono);">WE HANDLE</p>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(160px, 1fr)); gap:0.5rem; font-family:var(--font-mono); font-size:0.8rem; color:var(--offwhite-dim);">
              <span>· Microphone setup</span>
              <span>· Level balancing</span>
              <span>· Clean signal chain</span>
              <span>· Multi-track recording</span>
              <span>· Basic editing</span>
              <span>· Export &amp; delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODULE: AV SERVICES ── */}
      <div class="subpage-module">
        <div class="subpage-module-label">LIVE SOUND &amp; AV DEPLOYMENT</div>
        <div class="subpage-recessed">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
            <div>
              <p style="font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--mustard); font-weight:700; font-family:var(--font-mono); margin:0 0 0.75rem;">WHAT WE DO</p>
              <ul style="list-style:none; padding:0; margin:0; font-family:var(--font-mono); font-size:0.875rem; color:var(--offwhite-dim); line-height:2;">
                <li>→ Live sound for talks, gigs, launches</li>
                <li>→ Temporary &amp; permanent AV installs</li>
                <li>→ Hybrid &amp; streamed events</li>
                <li>→ On-site engineers &amp; tech support</li>
              </ul>
            </div>
            <div>
              <p style="font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--mustard); font-weight:700; font-family:var(--font-mono); margin:0 0 0.75rem;">CAPABILITY</p>
              <ul style="list-style:none; padding:0; margin:0; font-family:var(--font-mono); font-size:0.875rem; color:var(--offwhite-dim); line-height:2;">
                <li>→ Built for live pressure</li>
                <li>→ Engineered signal paths</li>
                <li>→ Calm under failure conditions</li>
                <li>→ Human-led, not automated</li>
              </ul>
            </div>
          </div>
          <div style="padding-top:1.25rem; border-top:1px solid rgba(255,255,255,0.05); font-family:var(--font-mono);">
            <p style="font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--mustard); font-weight:700; margin:0 0 0.5rem;">PRICING</p>
            <p style="font-size:0.9375rem; color:var(--offwhite-dim); margin:0 0 0.5rem; line-height:1.6;">
              AV services quoted per project. Typical jobs: <strong style="color:var(--offwhite);">£250–£1,500</strong> depending on scale.
            </p>
            <p style="font-size:0.8rem; color:var(--offwhite-mute); margin:0;">You focus on the room. We handle the signal.</p>
          </div>
        </div>
      </div>

      {/* ── MODULE: TECHNICAL OPERATIONS ── */}
      <div class="subpage-module">
        <div class="subpage-module-label">TECHNICAL OPERATIONS — SUPPORTED SITES</div>
        <div class="subpage-recessed">
          <p style="font-family:var(--font-mono); font-size:0.9375rem; color:var(--offwhite-dim); line-height:1.6; margin:0 0 1rem;">
            CRS provides ongoing technical management and AV support for external venues across Oxford.
          </p>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(160px, 1fr)); gap:0.5rem;">
            {['Bossaphonik', "The King's Centre", "Cowley Workers' Club"].map(v => (
              <div key={v} style="font-family:var(--font-mono); font-size:0.8rem; color:var(--offwhite-mute); padding:0.5rem 0.75rem; background:rgba(0,0,0,0.4); border-left:2px solid rgba(212,160,23,0.3);">
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODULE: CTA ── */}
      <div class="subpage-module" style="text-align:center;">
        <div class="subpage-module-label">REQUEST A QUOTE</div>
        <a href="/contact?service=av" class="subpage-cta" style="font-size:1rem; padding:1rem 2.5rem;">
          REQUEST AV QUOTE →
        </a>
        <p style="font-family:var(--font-mono); font-size:0.72rem; color:var(--offwhite-mute); margin-top:1rem; letter-spacing:0.1em; text-transform:uppercase;">
          Behind every clean live setup is a deep technical bench.
        </p>
      </div>

      {/* ── SEAL ── */}
      <div class="subpage-seal">
        <a href="/" aria-label="Cowley Road Studios — home">
          <img
            src="/static/crs-logo.png"
            alt="Cowley Road Studios"
            class="subpage-seal-img"
            width="120" height="45"
          />
        </a>
        <p class="subpage-seal-sub">EST. 2012 · OXFORD · ODRO ENGINEERING</p>
      </div>

    </div>{/* /subpage-column */}

    {/* RIGHT RAIL */}
    <div class="subpage-rail subpage-rail--right" aria-hidden="true">
      {BOLTS.map((_, i) => <Bolt key={i} />)}
    </div>

  </div>
);
