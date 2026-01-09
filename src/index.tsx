import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import './style.css'

const app = new Hono()

// Serve static files (CSS, favicon, etc.)
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))

// System Monitor Status Endpoint
app.get('/status.json', (c) => {
  return c.json({
    "system_monitor": {
      "last_updated": "2026-01-09T08:00:00Z",
      "zones": [
        {
          "id": "cafe",
          "display_name": "CAFÉ",
          "status": "OPEN",
          "pulse_alert": false
        },
        {
          "id": "studio",
          "display_name": "STUDIO",
          "status": "IN SESSION",
          "pulse_alert": true
        },
        {
          "id": "electronics",
          "display_name": "ELECTRONICS",
          "status": "TAKING REPAIRS",
          "pulse_alert": false
        }
      ]
    }
  })
})

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      {/* UNIFIED HEADER: SYSTEM MONITOR + NAVIGATION */}
      <div class="sticky top-0 z-50 w-full h-10 bg-[#1A1A1A] border-b-2 border-[#2D3E2F] flex justify-between items-center px-4 font-mono text-[10px] tracking-widest text-[#F5F5F5]/60">
        
        {/* LEFT: Location */}
        <div class="hidden md:block text-[#F5F5F5]/60 uppercase">LOC: 118_COWLEY_RD_OX4</div>

        {/* CENTER: System Monitor */}
        <div class="flex gap-3 md:gap-6 mx-auto uppercase text-[#F5F5F5]">
          <div class="flex items-center gap-1">
            <span class="text-white">CAFÉ:</span> 
            <span class="text-white font-bold">OPEN</span>
          </div>
          
          <span class="text-[#2D3E2F]">|</span>
          
          <div class="flex items-center gap-1">
            <span class="text-white">STUDIO:</span> 
            <span class="text-white font-bold">IN SESSION</span>
            <span class="relative flex h-2 w-2 ml-1">
              <span class="animate-ping absolute inline-flex h-full w-full bg-[#FF4500] opacity-75" style="border-radius: 0;"></span>
              <span class="relative inline-flex h-2 w-2 bg-[#FF4500]" style="border-radius: 0;"></span>
            </span>
          </div>

          <span class="text-[#2D3E2F]">|</span>

          <div class="flex items-center gap-1">
            <span class="text-white">REPAIRS:</span> 
            <span class="text-white font-bold">ACTIVE</span>
          </div>
        </div>

        {/* RIGHT: Text Navigation */}
        <div class="hidden md:flex items-center gap-4 text-[10px] uppercase text-[#F5F5F5]/80">
          <span class="text-[#D4A017]">_NAV:</span>
          <a href="#infrastructure" class="hover:text-[#D4A017] transition-colors">INFRA</a>
          <span class="text-[#2D3E2F]">/</span>
          <a href="#cafe" class="hover:text-[#D4A017] transition-colors">CAFÉ</a>
          <span class="text-[#2D3E2F]">/</span>
          <a href="#services" class="hover:text-[#D4A017] transition-colors">LOGISTICS</a>
          <span class="text-[#2D3E2F]">/</span>
          <a href="#contact" class="hover:text-[#D4A017] transition-colors">BOOK</a>
        </div>
      </div>

      {/* HERO (CRS SPINE - DARK CONTROL ROOM) - 12 COLUMN GRID */}
      <section id="hero" class="pt-20 md:pt-16 pb-8 md:pb-10 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Technical Data (7/12) */}
            <div class="md:col-span-7">
              <p class="text-xs font-mono text-mustard uppercase mb-4 tracking-wider">
                Cowley Road Studios · Oxford
              </p>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/title-crs-final-banner.png" 
                alt="COWLEY ROAD STUDIOS"
                class="w-full max-w-xl mb-4"
              />
              <p class="text-lg md:text-xl text-off-white/90 mb-6 leading-relaxed font-medium border-l-2 border-mustard pl-4">
                Industry standard facilities, built and run by people who love the work.
              </p>
              <p class="text-sm md:text-base text-off-white/80 mb-8 leading-relaxed max-w-2xl">
                Cowley Road Studios is a professional recording and production space in Oxford. We build systems properly, maintain our equipment in-house, and support artists, engineers, and organisers who care about sound.
              </p>
              
              {/* Primary CTA - CSS Heavy-Duty Switch */}
              <div class="mb-4">
                <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="block w-full bg-[#FF4500] text-[#1A1A1A] font-mono font-bold uppercase px-6 py-3 border-2 border-[#1A1A1A] hover:invert transition-all text-center text-sm" style="border-radius: 0;">
                  [ BOOK STUDIO ]
                </a>
              </div>
              
              {/* Secondary Actions */}
              <div class="flex flex-wrap gap-4 text-sm">
                <a href="#cafe" class="text-off-white/80 hover:text-mustard transition-colors font-mono">
                  → Venue Hire
                </a>
                <a href="#services" class="text-off-white/80 hover:text-mustard transition-colors font-mono">
                  → AV / Live Sound
                </a>
                <a href="#services" class="text-off-white/80 hover:text-mustard transition-colors font-mono">
                  → Repairs
                </a>
              </div>
            </div>
            
            {/* RIGHT COLUMN: Image (5/12) */}
            <div class="md:col-span-5">
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/hero-main.jpg"
                alt="Cowley Road Studios professional recording equipment and infrastructure"
                class="w-full h-auto object-cover border-2 border-mustard/30"
              />
              <p class="text-xs text-off-white/60 mt-2 font-mono">
                Professional recording infrastructure. Industry standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE INFRASTRUCTURE (CRS SPINE - DARK) - HIGH DENSITY GRID */}
      <section id="infrastructure" class="py-10 px-4 bg-deep-charcoal border-t-2 border-mustard">
        <div class="max-w-7xl mx-auto">
          {/* Section Header - Left Aligned */}
          <div class="mb-12">
            <h2 class="text-3xl font-black text-off-white mb-4 uppercase tracking-tight">
              The Infrastructure
            </h2>
            <p class="text-base md:text-lg text-off-white/80 leading-relaxed max-w-3xl border-l-2 border-mustard pl-4">
              This is a working studio, not a concept. Our rooms are designed for reliable sessions, clear monitoring, and calm delivery. We prioritise signal integrity, sensible layouts, and equipment we know how to maintain and repair ourselves.
            </p>
          </div>

          {/* RACK-MOUNTED SPEC CARDS - TECHNICAL DATA */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
            
            {/* UNIT 01: SIGNAL */}
            <div class="border-2 border-nettle-green bg-deep-charcoal flex flex-col h-full justify-between" style="border-radius: 0;">
              <div class="aspect-square w-full overflow-hidden">
                <img 
                  src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-signal.jpg"
                  alt="Signal path"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 border-t-2 border-nettle-green">
                <p class="text-[10px] font-mono text-mustard uppercase tracking-widest mb-1">UNIT 01: SIGNAL</p>
                <h3 class="text-lg font-bold text-off-white mb-3 uppercase tracking-tight font-mono">HYBRID PATH</h3>
                <div class="space-y-1 text-xs text-off-white/80 font-mono mb-3">
                  <p>→ Audient Console</p>
                  <p>→ Neve-Style Pres</p>
                  <p>→ Sphere Modeling</p>
                </div>
                <p class="text-[10px] font-mono text-electric-orange uppercase tracking-wider">STATUS: CALIBRATED</p>
              </div>
            </div>

            {/* UNIT 02: ROOMS */}
            <div class="border-2 border-nettle-green bg-deep-charcoal flex flex-col h-full justify-between" style="border-radius: 0;">
              <div class="aspect-square w-full overflow-hidden">
                <img 
                  src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-rooms.jpg"
                  alt="Studio rooms"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 border-t-2 border-nettle-green">
                <p class="text-[10px] font-mono text-mustard uppercase tracking-widest mb-1">UNIT 02: ROOMS</p>
                <h3 class="text-lg font-bold text-off-white mb-3 uppercase tracking-tight font-mono">ISOLATION</h3>
                <div class="space-y-1 text-xs text-off-white/80 font-mono mb-3">
                  <p>→ 5 Decoupled Zones</p>
                  <p>→ Floating Floors</p>
                  <p>→ Neutral Tuning</p>
                </div>
                <p class="text-[10px] font-mono text-electric-orange uppercase tracking-wider">STATUS: SECURE</p>
              </div>
            </div>

            {/* UNIT 03: NETWORK */}
            <div class="border-2 border-nettle-green bg-deep-charcoal flex flex-col h-full justify-between" style="border-radius: 0;">
              <div class="aspect-square w-full overflow-hidden">
                <img 
                  src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-network.jpg"
                  alt="Network infrastructure"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 border-t-2 border-nettle-green">
                <p class="text-[10px] font-mono text-mustard uppercase tracking-widest mb-1">UNIT 03: NETWORK</p>
                <h3 class="text-lg font-bold text-off-white mb-3 uppercase tracking-tight font-mono">DANTE/NDI</h3>
                <div class="space-y-1 text-xs text-off-white/80 font-mono mb-3">
                  <p>→ 32-Ch Dante</p>
                  <p>→ NDI Video Core</p>
                  <p>→ Multi-Room Sync</p>
                </div>
                <p class="text-[10px] font-mono text-electric-orange uppercase tracking-wider">STATUS: ACTIVE</p>
              </div>
            </div>

            {/* UNIT 04: REPAIR */}
            <div class="border-2 border-nettle-green bg-deep-charcoal flex flex-col h-full justify-between" style="border-radius: 0;">
              <div class="aspect-square w-full overflow-hidden">
                <img 
                  src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-maintenance.jpg"
                  alt="Repair bench"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 border-t-2 border-nettle-green">
                <p class="text-[10px] font-mono text-mustard uppercase tracking-widest mb-1">UNIT 04: REPAIR</p>
                <h3 class="text-lg font-bold text-off-white mb-3 uppercase tracking-tight font-mono">THE BENCH</h3>
                <div class="space-y-1 text-xs text-off-white/80 font-mono mb-3">
                  <p>→ Valve Testing</p>
                  <p>→ Analog Calibration</p>
                  <p>→ Parts Inventory</p>
                </div>
                <p class="text-[10px] font-mono text-electric-orange uppercase tracking-wider">STATUS: READY</p>
              </div>
            </div>

          </div>

          {/* Equipment showcase (desktop only) */}
          <div class="hidden md:grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <div>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/equipment-revox.jpg"
                alt="Professional studio equipment - Revox tape machine"
                class="w-full h-auto object-cover border-2 border-mustard/30"
              />
              <p class="text-xs text-off-white/60 mt-2 font-mono text-center">
                Analog precision maintained beyond spec
              </p>
            </div>
            <div>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/equipment-tascam.jpg"
                alt="Professional studio equipment - Tascam recorder"
                class="w-full h-auto object-cover border-2 border-mustard/30"
              />
              <p class="text-xs text-off-white/60 mt-2 font-mono text-center">
                Reliable recording infrastructure
              </p>
            </div>
          </div>

          <p class="text-base text-off-white/70 text-center mb-8 italic">
            Built on decades of real-world studio, live, and repair experience.
          </p>
          
          <div class="text-center">
            <a href="#contact" class="inline-block border-2 border-mustard text-off-white px-8 py-3 font-semibold hover:bg-mustard hover:text-deep-charcoal transition-all text-sm uppercase tracking-wider">
              [ View Full Spec Sheet ]
            </a>
          </div>
        </div>
      </section>

      {/* THE SHIFT: CRS SPINE → WORKSHOP CAFÉ INTERFACE - SHARP 2PX RULE */}
      <div class="h-0.5 bg-mustard w-full"></div>

      {/* VENUE HIRE (Workshop Café Interface) */}
      <section id="cafe" class="py-10 px-4 bg-off-white">
        <div class="max-w-5xl mx-auto">
          
          {/* PAGE TITLE */}
          <h2 class="text-3xl font-black text-deep-charcoal mb-8 uppercase tracking-tight">
            WORKSHOP CAFÉ
          </h2>

          {/* INTRO */}
          <div class="mb-10 max-w-3xl">
            <p class="text-base md:text-lg text-deep-charcoal/80 leading-relaxed mb-4">
              Workshop Café is the public-facing space attached to the studios.
            </p>
            <p class="text-base md:text-lg text-deep-charcoal/80 leading-relaxed mb-4">
              It's a flexible room used for listening sessions, talks, small performances, and private hires. The sound system is installed and supported by the same engineers who run the studios.
            </p>
          </div>

          {/* KEY FACTS */}
          <div class="mb-10 max-w-3xl">
            <h3 class="text-2xl md:text-3xl font-bold text-deep-charcoal mb-6">
              Key facts
            </h3>
            <ul class="space-y-2 text-base md:text-lg text-deep-charcoal/80 mb-6">
              <li class="flex items-start">
                <span class="text-mustard mr-3">—</span>
                <span>Intimate capacity</span>
              </li>
              <li class="flex items-start">
                <span class="text-mustard mr-3">—</span>
                <span>Seated or standing formats</span>
              </li>
              <li class="flex items-start">
                <span class="text-mustard mr-3">—</span>
                <span>High-quality monitoring and PA</span>
              </li>
              <li class="flex items-start">
                <span class="text-mustard mr-3">—</span>
                <span>Suitable for listening events, launches, and community use</span>
              </li>
            </ul>
          </div>

          {/* NEXT STEPS */}
          <div class="border-t-2 border-mustard/30 pt-12">
            <p class="text-lg text-deep-charcoal/80 mb-8 max-w-2xl">
              Start with the space.<br/>
              Add support if and when it's needed.
            </p>
            <div class="flex flex-wrap gap-4 mt-auto">
              <a href="#services" class="block w-full md:w-auto bg-[#FF4500] text-[#1A1A1A] font-mono font-bold uppercase px-6 py-3 border-2 border-[#1A1A1A] hover:invert transition-all text-center text-sm" style="border-radius: 0;">
                [ VIEW AV & EVENT SUPPORT ]
              </a>
              <a href="mailto:info@cowleyroadstudios.com?subject=Venue%20Availability%20Check" class="block w-full md:w-auto bg-[#FF4500] text-[#1A1A1A] font-mono font-bold uppercase px-6 py-3 border-2 border-[#1A1A1A] hover:invert transition-all text-center text-sm" style="border-radius: 0;">
                [ CHECK VENUE AVAILABILITY ]
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES MANIFEST: TECHNICAL SPEC CARDS - DYMO LABEL FORMAT */}
      <section id="services" class="py-10 px-4 bg-deep-charcoal border-t-2 border-mustard">
        <div class="max-w-7xl mx-auto">
          
          {/* Section Intro */}
          <div class="mb-10">
            <h2 class="text-3xl font-black text-off-white mb-4 uppercase tracking-tight">
              WHEN IT HAS TO WORK
            </h2>
            <p class="text-base text-off-white/80 max-w-3xl border-l-2 border-electric-orange pl-4">
              We provide live sound support, AV setup, and equipment repair as part of the same practice that runs the studio. Fewer handovers, fewer assumptions, calmer outcomes.
            </p>
          </div>

          {/* DUAL COLUMN MANIFEST - NETTLE GREEN BOXES */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* LEFT BOX: MISSION-CRITICAL AUDIO (LIVE SOUND & EVENT SUPPORT) */}
            <div class="border-2 border-nettle-green bg-deep-charcoal/50 p-4 relative flex flex-col h-full justify-between" style="border-radius: 0;">
              {/* Square ID Photo - Top Right */}
              <div class="absolute top-4 right-4 w-20 h-20 border border-[#D4A017] overflow-hidden" style="border-radius: 0;">
                <img 
                  src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/services-live-sound.jpg"
                  alt="Live Sound"
                  class="w-full h-full object-cover"
                />
              </div>
              
              {/* Manifest Data */}
              <div class="pr-24">
                <h3 class="text-2xl font-bold text-off-white mb-2 uppercase tracking-tight" style="font-family: 'Playfair Display', serif;">
                  MISSION-CRITICAL AUDIO
                </h3>
                
                {/* Dense Data Points - JetBrains Mono */}
                <div class="space-y-0 font-mono text-xs text-off-white/90 tracking-tighter mb-2" style="line-height: 1.2;">
                  <p><span class="text-mustard">CAPACITY:</span> Systems for 50–200 cap</p>
                  <p><span class="text-mustard">SCOPE:</span> Analog, Valve, & Digital</p>
                  <p><span class="text-mustard">STANDARD:</span> NDI / Dante Integrated</p>
                  <p><span class="text-mustard">DELIVERY:</span> On-Site Engineering</p>
                  <p><span class="text-mustard">RIG:</span> Logic/Martin Audio</p>
                </div>
                
                {/* Status Indicator */}
                <p class="text-[10px] font-mono text-electric-orange uppercase tracking-wider mb-2">
                  STATUS: FIELD-READY
                </p>
                
                {/* CTA - CSS Heavy-Duty Switch */}
                <a href="mailto:info@cowleyroadstudios.com?subject=Live%20Sound%20Availability" class="block w-full bg-[#FF4500] text-[#1A1A1A] font-mono font-bold uppercase px-4 py-2 border-2 border-[#1A1A1A] hover:invert transition-all text-center text-xs mt-auto" style="border-radius: 0;">
                  [ CHECK AVAILABILITY ]
                </a>
              </div>
            </div>

            {/* RIGHT BOX: THE TECHNICAL BENCH (ELECTRONICS & AV REPAIR) */}
            <div class="border-2 border-nettle-green bg-deep-charcoal/50 p-4 relative flex flex-col h-full justify-between" style="border-radius: 0;">
              {/* Square ID Photo - Top Right */}
              <div class="absolute top-4 right-4 w-20 h-20 border border-[#D4A017] overflow-hidden" style="border-radius: 0;">
                <img 
                  src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/services-repairs.jpg"
                  alt="Repairs"
                  class="w-full h-full object-cover"
                />
              </div>
              
              {/* Manifest Data */}
              <div class="pr-24">
                <h3 class="text-2xl font-bold text-off-white mb-2 uppercase tracking-tight" style="font-family: 'Playfair Display', serif;">
                  THE TECHNICAL BENCH
                </h3>
                
                {/* Dense Data Points - JetBrains Mono */}
                <div class="space-y-0 font-mono text-xs text-off-white/90 tracking-tighter mb-2" style="line-height: 1.2;">
                  <p><span class="text-mustard">STANDARD:</span> Component-Level Repair</p>
                  <p><span class="text-mustard">TURNAROUND:</span> 7–14 Day Typical</p>
                  <p><span class="text-mustard">FOCUS:</span> Refurbishment & Calibration</p>
                  <p><span class="text-mustard">STOCK:</span> Valve & Analog Parts Inventory</p>
                  <p><span class="text-mustard">SCOPE:</span> Audio, Studio, Vintage Gear</p>
                </div>
                
                {/* Status Indicator */}
                <p class="text-[10px] font-mono text-electric-orange uppercase tracking-wider mb-2">
                  STATUS: BENCH ACTIVE
                </p>
                
                {/* CTA - CSS Heavy-Duty Switch */}
                <a href="mailto:info@cowleyroadstudios.com?subject=Repair%20Slot%20Request" class="block w-full bg-[#FF4500] text-[#1A1A1A] font-mono font-bold uppercase px-4 py-2 border-2 border-[#1A1A1A] hover:invert transition-all text-center text-xs mt-auto" style="border-radius: 0;">
                  [ REQUEST REPAIR SLOT ]
                </a>
              </div>
            </div>

          </div>

          {/* Confidence Strip */}
          <div class="border-t border-mustard/30 pt-8">
            <div class="flex flex-wrap gap-6 justify-center text-center">
              <p class="text-xs font-mono text-mustard uppercase tracking-wider">Engineered, not improvised</p>
              <p class="text-xs font-mono text-mustard uppercase tracking-wider">Calm under pressure</p>
              <p class="text-xs font-mono text-mustard uppercase tracking-wider">Built properly</p>
              <p class="text-xs font-mono text-mustard uppercase tracking-wider">Your mission. Our rig.</p>
            </div>
          </div>

        </div>
      </section>

      {/* PROOF STRIP (fast trust) */}
      <section class="py-10 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-black text-off-white mb-8 text-center uppercase tracking-tight">
            What You Get Here
          </h2>
          
          <div class="grid md:grid-cols-5 gap-8 text-center">
            <div>
              <div class="text-mustard text-4xl mb-3">
                <i class="fas fa-cogs"></i>
              </div>
              <p class="text-base text-off-white/80 font-semibold">
                A controlled environment
              </p>
            </div>
            
            <div>
              <div class="text-mustard text-4xl mb-3">
                <i class="fas fa-wrench"></i>
              </div>
              <p class="text-base text-off-white/80 font-semibold">
                A rig that's maintained properly
              </p>
            </div>
            
            <div>
              <div class="text-mustard text-4xl mb-3">
                <i class="fas fa-comments"></i>
              </div>
              <p class="text-base text-off-white/80 font-semibold">
                Clear communication
              </p>
            </div>
            
            <div>
              <div class="text-mustard text-4xl mb-3">
                <i class="fas fa-check-circle"></i>
              </div>
              <p class="text-base text-off-white/80 font-semibold">
                A usable end product
              </p>
            </div>
            
            <div>
              <div class="text-mustard text-4xl mb-3">
                <i class="fas fa-shield-alt"></i>
              </div>
              <p class="text-base text-off-white/80 font-semibold">
                No chaos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION */}
      <section id="contact" class="py-20 px-4 bg-off-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-black text-deep-charcoal mb-6 uppercase tracking-tight">
              Tell us what you're making
            </h2>
            <p class="text-2xl text-deep-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              We'll tell you what's possible.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left: Contact */}
            <div>
              <div class="mb-8">
                <p class="text-lg text-deep-charcoal/80 mb-4">
                  <strong>Email:</strong> info@cowleyroadstudios.com<br />
                  <strong>Phone:</strong> Available on request
                </p>
                <p class="text-base text-deep-charcoal/60">
                  Responses typically within 24 hours. Booking confirmations sent same day.
                </p>
              </div>
              
              {/* CTAs */}
              <div class="space-y-4">
                <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="block bg-[#FF4500] text-off-white px-6 py-3 font-mono font-bold hover:invert transition-all text-sm text-center uppercase tracking-wider border-2 border-[#1A1A1A]" style="border-radius: 0;">
                  [ BOOK ]
                </a>
                <a href="mailto:info@cowleyroadstudios.com" class="block border-2 border-deep-charcoal text-deep-charcoal px-6 py-3 font-mono font-bold hover:bg-deep-charcoal hover:text-off-white transition-all text-sm text-center uppercase tracking-wider" style="border-radius: 0;">
                  [ ENQUIRE ]
                </a>
              </div>
            </div>
            
            {/* Right: Map / Address */}
            <div>
              <div class="bg-nettle-green/10 border-2 border-mustard h-64 overflow-hidden mb-4" style="border-radius: 0;">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8339!2d-1.2358!3d51.7489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a42d5b5555%3A0x1234567890abcdef!2s118%20Cowley%20Rd%2C%20Oxford%20OX4%201JE!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Cowley Road Studios location map"
                ></iframe>
              </div>
              <div class="text-base text-deep-charcoal/80">
                <p class="font-semibold mb-2">Location</p>
                <p>
                  118 Cowley Road<br />
                  Oxford<br />
                  OX4 1JE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer class="bg-deep-charcoal border-t border-off-white/10 text-off-white py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left */}
            <div>
              <h3 class="text-2xl font-bold mb-3">Cowley Road Studios</h3>
              <p class="text-sm text-off-white/70">
                Engineering-led studio and venue in Oxford.
              </p>
            </div>
            
            {/* Middle: Links */}
            <div>
              <h4 class="font-semibold mb-3 text-sm uppercase tracking-wider text-off-white/80">Navigate</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#infrastructure" class="text-off-white/70 hover:text-mustard transition-colors">Studios</a></li>
                <li><a href="#cafe" class="text-off-white/70 hover:text-mustard transition-colors">Venue</a></li>
                <li><a href="#services" class="text-off-white/70 hover:text-mustard transition-colors">AV / Repairs</a></li>
                <li><a href="#contact" class="text-off-white/70 hover:text-mustard transition-colors">Book</a></li>
              </ul>
            </div>
            
            {/* Right */}
            <div>
              <p class="text-sm text-off-white/60 italic mb-4">
                Built to stay calm under load.
              </p>
              <a href="mailto:info@cowleyroadstudios.com" class="text-sm text-mustard hover:text-off-white transition-colors">
                info@cowleyroadstudios.com
              </a>
            </div>
          </div>
          <div class="border-t border-off-white/10 pt-6 text-center text-xs text-off-white/50">
            <p>&copy; 2026 Cowley Road Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* System Monitor Fetch Script */}
      <script dangerouslySetInnerHTML={{__html: `
        // REMOTE SWITCHBOARD - Fetch live system status
        async function updateSystemMonitor() {
          try {
            const response = await fetch('/status.json');
            const data = await response.json();
            
            if (data && data.system_monitor && data.system_monitor.zones) {
              const zones = data.system_monitor.zones;
              
              zones.forEach(zone => {
                // Update desktop status
                const statusEl = document.getElementById('status-' + zone.id);
                const pulseEl = document.getElementById('pulse-' + zone.id);
                
                if (statusEl) {
                  statusEl.textContent = zone.display_name + ': ' + zone.status;
                }
                
                if (pulseEl) {
                  if (zone.pulse_alert) {
                    pulseEl.classList.remove('hidden');
                  } else {
                    pulseEl.classList.add('hidden');
                  }
                }
                
                // Update mobile status
                const statusMobileEl = document.getElementById('status-' + zone.id + '-mobile');
                const pulseMobileEl = document.getElementById('pulse-' + zone.id + '-mobile');
                
                if (statusMobileEl) {
                  statusMobileEl.textContent = zone.display_name + ': ' + zone.status;
                }
                
                if (pulseMobileEl) {
                  if (zone.pulse_alert) {
                    pulseMobileEl.classList.remove('hidden');
                  } else {
                    pulseMobileEl.classList.add('hidden');
                  }
                }
              });
            }
          } catch (error) {
            console.error('System Monitor: Failed to fetch status', error);
            // Fallback to default states if fetch fails
          }
        }
        
        // Load status on page load
        document.addEventListener('DOMContentLoaded', updateSystemMonitor);
        
        // Refresh every 60 seconds (optional)
        setInterval(updateSystemMonitor, 60000);
      `}} />

      {/* Mobile Menu Script */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('DOMContentLoaded', function() {
          const menuButton = document.getElementById('mobile-menu-button');
          const mobileMenu = document.getElementById('mobile-menu');
          
          if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', function() {
              mobileMenu.classList.toggle('hidden');
            });
            
            // Close mobile menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
              link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
              });
            });
          }
        });
      `}} />
    </>
  )
})

// Booking Success Page (unchanged)
app.get('/booking-success', (c) => {
  return c.render(
    <>
      <div class="min-h-screen flex items-center justify-center px-4 py-20 bg-off-white">
        <div class="max-w-2xl w-full text-center">
          <div class="mb-8">
            <i class="fas fa-check-circle text-electric-orange text-8xl"></i>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold text-deep-charcoal mb-4">
            SESSION CONFIRMED
          </h1>
          
          <p class="text-2xl text-mustard mb-8">
            Your time is locked in.
          </p>
          
          <div class="bg-nettle-green/5 border-2 border-mustard p-8 mb-8 text-left">
            <p class="text-base text-deep-charcoal/80 leading-relaxed mb-4">
              Thanks for booking with Cowley Road Studios. You should receive a confirmation email from Square shortly.
            </p>
            <p class="text-base text-deep-charcoal/80 leading-relaxed mb-4">
              Please arrive <strong class="text-mustard">15 minutes before</strong> your session start time.
            </p>
            <div class="mt-6 pt-6 border-t-2 border-mustard/30">
              <p class="text-deep-charcoal/70 mb-2 text-sm font-mono uppercase tracking-wider">
                <i class="fas fa-map-marker-alt text-mustard mr-2"></i>
                Location
              </p>
              <p class="text-deep-charcoal text-base">
                118 Cowley Road<br/>
                Oxford<br/>
                OX4 1JE
              </p>
            </div>
          </div>
          
          <a href="/" class="inline-block bg-electric-orange text-off-white px-8 py-3 font-semibold hover:bg-electric-orange/90 transition-all">
            <i class="fas fa-home mr-2"></i>
            Back to Home
          </a>
        </div>
      </div>
    </>
  )
})

export default app
