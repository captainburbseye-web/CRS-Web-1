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
      {/* LIVE SYSTEM MONITOR - Infrastructure Layer Status Bar */}
      <div class="fixed top-0 left-0 right-0 bg-deep-charcoal h-8 border-b border-nettle-green z-50">
        <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
          <div id="system-monitor-desktop" class="flex items-center gap-8 text-xs font-mono text-off-white/60">
            {/* CAFÉ STATUS */}
            <div class="flex items-center gap-2">
              <span class="uppercase tracking-wider">[ CAFÉ: OPEN ]</span>
            </div>
            {/* STUDIO STATUS with pulsing orange indicator */}
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-electric-orange rounded-full animate-pulse"></span>
              <span class="uppercase tracking-wider">[ STUDIO: IN SESSION ]</span>
            </div>
            {/* ELECTRONICS STATUS */}
            <div class="flex items-center gap-2">
              <span class="uppercase tracking-wider">[ ELECTRONICS: TAKING REPAIRS ]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - CRS Shell (moved down to accommodate status bar) */}
      <nav class="fixed top-8 left-0 right-0 bg-nettle-green/98 backdrop-blur-sm border-b border-off-white/10 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-14">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href="#hero" class="text-sm font-semibold text-off-white tracking-tight">
                Cowley Road Studios
              </a>
            </div>
            
            {/* Desktop Navigation - Reduced to 4 hard routes */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#infrastructure" class="text-off-white hover:text-mustard transition-colors text-sm">
                Studios
              </a>
              <a href="#cafe" class="text-off-white hover:text-mustard transition-colors text-sm">
                Venue
              </a>
              <a href="#services" class="text-off-white hover:text-mustard transition-colors text-sm">
                AV / Repairs
              </a>
              <a href="#contact" class="text-off-white hover:text-mustard transition-colors text-sm">
                Book
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div class="md:hidden">
              <button id="mobile-menu-button" class="text-off-white hover:text-mustard">
                <i class="fas fa-bars text-lg"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div id="mobile-menu" class="hidden md:hidden border-t border-off-white/10 bg-nettle-green">
          <div class="px-4 pt-2 pb-4 space-y-2">
            <a href="#infrastructure" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Studios
            </a>
            <a href="#cafe" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Venue
            </a>
            <a href="#services" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              AV / Repairs
            </a>
            <a href="#contact" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Book
            </a>
          </div>
        </div>
      </nav>

      {/* LIVE STATUS BAR - Mobile responsive (below main nav) */}
      <div class="md:hidden fixed top-14 left-0 right-0 bg-deep-charcoal h-8 border-b border-nettle-green z-30">
        <div class="px-4 h-full flex items-center justify-center overflow-x-auto">
          <div id="system-monitor-mobile" class="flex items-center gap-4 text-xs font-mono text-off-white/60 whitespace-nowrap">
            <span class="uppercase">[ CAFÉ: OPEN ]</span>
            <span class="text-nettle-green">|</span>
            <div class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-electric-orange rounded-full animate-pulse"></span>
              <span class="uppercase">[ STUDIO: IN SESSION ]</span>
            </div>
            <span class="text-nettle-green">|</span>
            <span class="uppercase">[ ELECTRONICS: REPAIRS ]</span>
          </div>
        </div>
      </div>

      {/* HERO (CRS SPINE - DARK CONTROL ROOM) - 12 COLUMN GRID */}
      <section id="hero" class="pt-28 md:pt-24 pb-12 md:pb-16 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Technical Data (7/12) */}
            <div class="md:col-span-7">
              <p class="text-xs font-mono text-mustard uppercase mb-4 tracking-wider">
                Cowley Road Studios · Oxford
              </p>
              <h1 class="text-4xl md:text-6xl font-black uppercase text-off-white mb-4 leading-tight tracking-tight">
                COWLEY ROAD STUDIOS
              </h1>
              <p class="text-lg md:text-xl text-off-white/90 mb-6 leading-relaxed font-medium border-l-2 border-mustard pl-4">
                Industry standard. Calm delivery.
              </p>
              <p class="text-sm md:text-base text-off-white/80 mb-8 leading-relaxed max-w-2xl">
                Infrastructure for recording, live sound, and streaming — built to work under pressure.
              </p>
              
              {/* Primary CTA */}
              <div class="mb-4">
                <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="inline-block bg-electric-orange text-off-white px-8 py-4 font-bold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider border-2 border-electric-orange">
                  [ BOOK A SESSION ]
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
      <section id="infrastructure" class="py-16 px-4 bg-deep-charcoal border-t-2 border-mustard">
        <div class="max-w-7xl mx-auto">
          {/* Section Header - Left Aligned */}
          <div class="mb-12">
            <h2 class="text-4xl md:text-6xl font-black text-off-white mb-4 uppercase tracking-tight">
              The Infrastructure
            </h2>
            <p class="text-base md:text-lg text-off-white/80 leading-relaxed max-w-3xl border-l-2 border-mustard pl-4">
              Built by people who've done this before. Designed for repeatable outcomes.
            </p>
          </div>

          {/* HIGH DENSITY SPEC GRID - 4 COLUMNS */}
          <div class="grid md:grid-cols-4 gap-6 mb-12">
            {/* Signal path */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-bold text-off-white mb-2 uppercase tracking-wide font-mono">Signal path</h3>
              <p class="text-sm text-off-white/80 leading-relaxed mb-3">
                Hybrid analogue / digital workflow. Clean gain staging. Fast recall.
              </p>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-signal.jpg"
                alt="Signal path"
                class="w-full h-32 object-cover border-2 border-nettle-green/30"
              />
            </div>

            {/* Rooms */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-bold text-off-white mb-2 uppercase tracking-wide font-mono">Rooms</h3>
              <p class="text-sm text-off-white/80 leading-relaxed mb-3">
                Isolated environments for tracking, voice, production and edit work. Controlled monitoring.
              </p>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-rooms.jpg"
                alt="Studio rooms"
                class="w-full h-32 object-cover border-2 border-nettle-green/30"
              />
            </div>

            {/* Networked logic */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-bold text-off-white mb-2 uppercase tracking-wide font-mono">Networked logic</h3>
              <p class="text-sm text-off-white/80 leading-relaxed mb-3">
                Dante audio across the site. NDI-ready video backbone. Patch any source to any room.
              </p>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-network.jpg"
                alt="Network infrastructure"
                class="w-full h-32 object-cover border-2 border-nettle-green/30"
              />
            </div>

            {/* Maintenance */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-bold text-off-white mb-2 uppercase tracking-wide font-mono">Maintenance</h3>
              <p class="text-sm text-off-white/80 leading-relaxed mb-3">
                In-house electronics bench keeps systems reliable and vintage gear performing beyond spec.
              </p>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/infrastructure-maintenance.jpg"
                alt="Maintenance"
                class="w-full h-32 object-cover border-2 border-nettle-green/30"
              />
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

      {/* SECTION 2: WORKSHOP CAFÉ (Interface) */}
      <section id="cafe" class="py-20 px-4 bg-off-white">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-5xl md:text-7xl font-black text-deep-charcoal mb-6 uppercase tracking-tight">
            Workshop Café
          </h2>
          <p class="text-xl text-deep-charcoal/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            A public-facing space that makes the whole system accessible.
          </p>

          <div class="max-w-4xl mx-auto mb-12">
            <p class="text-lg text-deep-charcoal/80 leading-relaxed mb-6">
              Coffee, bar, and a flexible room for small events — talks, listening sessions, community meetups, showcases.
            </p>
            
            <ul class="space-y-3 text-base text-deep-charcoal/80 mb-8 inline-block text-left">
              <li class="flex items-start">
                <span class="text-mustard mr-3">•</span>
                <span>Clear booking</span>
              </li>
              <li class="flex items-start">
                <span class="text-mustard mr-3">•</span>
                <span>Practical capacity</span>
              </li>
              <li class="flex items-start">
                <span class="text-mustard mr-3">•</span>
                <span>Calm delivery</span>
              </li>
              <li class="flex items-start">
                <span class="text-mustard mr-3">•</span>
                <span>Accessible entry point into the studio world</span>
              </li>
            </ul>

            {/* Fact Card */}
            <div class="bg-mustard/10 border-2 border-mustard p-8 max-w-lg mx-auto mb-8" style="border-radius: 0;">
              <ul class="space-y-3 text-base text-deep-charcoal/80">
                <li class="flex justify-between">
                  <span class="font-semibold">Capacity:</span>
                  <span>~45-60 seated</span>
                </li>
                <li class="flex justify-between">
                  <span class="font-semibold">Use:</span>
                  <span>talks, launches, listening events</span>
                </li>
                <li class="flex justify-between">
                  <span class="font-semibold">Location:</span>
                  <span>Cowley Road, Oxford</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center">
            <a href="mailto:hello@cowleyroadstudios.com?subject=Workshop%20Café%20Venue%20Hire" class="inline-block bg-electric-orange text-off-white px-8 py-4 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider" style="border-radius: 0;">
              [ Venue Hire Info ]
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: MOMENTUM WHEN IT MATTERS (CRS SPINE - DARK) */}
      <section id="services" class="py-20 px-4 bg-deep-charcoal border-t-2 border-mustard/30">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-5xl md:text-7xl font-black text-off-white mb-6 uppercase tracking-tight">
            Momentum when it matters
          </h2>
          <p class="text-xl text-off-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
            Live sound, AV hire, venue support, and repairs — delivered like a mission.
          </p>

          <div class="max-w-4xl mx-auto mb-12">
            {/* Live sound + AV */}
            <div class="mb-12">
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/services-live-sound.jpg"
                alt="Live sound and AV services - Professional event audio engineering"
                class="w-full h-64 object-cover border-2 border-mustard/30 mb-6 mx-auto"
              />
              <h3 class="text-3xl md:text-4xl font-bold text-off-white mb-4">Live sound + AV hire</h3>
              <ul class="space-y-3 text-base md:text-lg text-off-white/80 mb-6 inline-block text-left">
                <li class="flex items-start">
                  <span class="text-mustard mr-3">•</span>
                  <span><strong>Live sound:</strong> engineered, not improvised</span>
                </li>
                <li class="flex items-start">
                  <span class="text-mustard mr-3">•</span>
                  <span><strong>AV hire:</strong> lights, sound, no drama</span>
                </li>
                <li class="flex items-start">
                  <span class="text-mustard mr-3">•</span>
                  <span><strong>Venue support:</strong> small room, serious rig</span>
                </li>
              </ul>
              <div>
                <a href="mailto:hello@cowleyroadstudios.com?subject=Live%20Sound%20%2F%20AV%20Enquiry" class="inline-block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider" style="border-radius: 0;">
                  [ Make Your Event Epic ]
                </a>
              </div>
            </div>

            {/* Repairs */}
            <div>
              <img 
                src="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/CRS-Website-Images/services-repairs.jpg"
                alt="Repair services - In-house electronics bench and diagnostics"
                class="w-full h-64 object-cover border-2 border-mustard/30 mb-6 mx-auto"
              />
              <h3 class="text-3xl md:text-4xl font-bold text-off-white mb-4">Repairs</h3>
              <ul class="space-y-3 text-base md:text-lg text-off-white/80 mb-6 inline-block text-left">
                <li class="flex items-start">
                  <span class="text-mustard mr-3">•</span>
                  <span><strong>Repairs:</strong> honest assessment, proper fixes</span>
                </li>
                <li class="flex items-start">
                  <span class="text-mustard mr-3">•</span>
                  <span>In-house electronics bench</span>
                </li>
                <li class="flex items-start">
                  <span class="text-mustard mr-3">•</span>
                  <span>No upsell, no chaos</span>
                </li>
              </ul>
              {/* Hide second CTA on mobile to avoid orange noise */}
              <div class="hidden md:block">
                <a href="mailto:hello@cowleyroadstudios.com?subject=Repair%20Request" class="inline-block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider" style="border-radius: 0;">
                  [ Bring a Repair ]
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP (fast trust) */}
      <section class="py-16 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-black text-off-white mb-12 text-center uppercase tracking-tight">
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
            <h2 class="text-5xl md:text-7xl font-black text-deep-charcoal mb-6 uppercase tracking-tight">
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
                  <strong>Email:</strong> hello@cowleyroadstudios.com<br />
                  <strong>Phone:</strong> Available on request
                </p>
                <p class="text-base text-deep-charcoal/60">
                  Responses typically within 24 hours. Booking confirmations sent same day.
                </p>
              </div>
              
              {/* CTAs */}
              <div class="space-y-4">
                <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm text-center uppercase tracking-wider" style="border-radius: 0;">
                  [ Book ]
                </a>
                <a href="mailto:hello@cowleyroadstudios.com" class="block border-2 border-deep-charcoal text-deep-charcoal px-6 py-3 font-semibold hover:bg-deep-charcoal hover:text-off-white transition-all text-sm text-center uppercase tracking-wider" style="border-radius: 0;">
                  [ Enquire ]
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
              <a href="mailto:hello@cowleyroadstudios.com" class="text-sm text-mustard hover:text-off-white transition-colors">
                hello@cowleyroadstudios.com
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
