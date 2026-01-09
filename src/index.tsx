import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import './style.css'

const app = new Hono()

// Serve static files (CSS, favicon, etc.)
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      {/* Navigation - CRS Shell (no orange unless direct booking action) */}
      <nav class="fixed top-0 left-0 right-0 bg-nettle-green/98 backdrop-blur-sm border-b border-off-white/10 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-14">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href="#hero" class="text-sm font-semibold text-off-white tracking-tight">
                Cowley Road Studios
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#studios" class="text-off-white hover:text-mustard transition-colors text-sm">
                Studios
              </a>
              <a href="#cafe" class="text-off-white hover:text-mustard transition-colors text-sm">
                Workshop Café
              </a>
              <a href="#brewforce" class="text-off-white hover:text-mustard transition-colors text-sm">
                Brewforce
              </a>
              <a href="#contact" class="text-off-white hover:text-mustard transition-colors text-sm">
                Contact
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
            <a href="#studios" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Studios
            </a>
            <a href="#cafe" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Workshop Café
            </a>
            <a href="#brewforce" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Brewforce
            </a>
            <a href="#contact" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* BLOCK 1: HERO (CRS LAYER, WITH BREWFORCE CTA) */}
      <section id="hero" class="pt-24 pb-16 px-4 bg-nettle-green">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-12 gap-12 items-center">
            {/* Left column (7/12) */}
            <div class="md:col-span-7">
              <p class="text-xs font-mono text-mustard uppercase mb-6 tracking-wider">
                Cowley Road Studios · Oxford
              </p>
              <h1 class="text-5xl md:text-7xl font-bold uppercase text-off-white mb-6 leading-none">
                COWLEY ROAD STUDIOS
              </h1>
              <p class="text-xl md:text-2xl text-off-white/90 mb-10 leading-relaxed">
                Industry Standard. Calm Delivery.
              </p>
              
              {/* Brewforce CTA - generous neutral padding */}
              <div class="flex flex-col sm:flex-row gap-4 items-start">
                <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="inline-block bg-electric-orange text-off-white px-8 py-4 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider">
                  [ Book a Session ]
                </a>
                <a href="#studios" class="inline-block text-off-white hover:text-mustard transition-colors text-sm py-4">
                  Explore the studios →
                </a>
              </div>
            </div>
            
            {/* Right column (5/12) */}
            <div class="md:col-span-5">
              <div class="aspect-square bg-deep-charcoal/30 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [STUDIO PHOTO / SIGNAL DIAGRAM]
              </div>
              <p class="text-xs text-off-white/60 mt-2 font-mono">
                Signal-true from source to record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 2: SYSTEM OVERVIEW STRIP (CRS) */}
      <section class="py-16 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8">
            {/* Column 1: CRS (Spine) */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-semibold text-off-white mb-3">CRS · The Spine</h3>
              <p class="text-sm text-off-white/70 leading-relaxed">
                The engineering core. Rooms, routing, and standards built for professional work.
              </p>
            </div>
            
            {/* Column 2: Workshop Café (Interface) */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-semibold text-off-white mb-3">Workshop Café · The Interface</h3>
              <p class="text-sm text-off-white/70 leading-relaxed">
                A public-facing room inside the system. Talks, listening events, and community use.
              </p>
            </div>
            
            {/* Column 3: Brewforce (Trigger) */}
            <div class="border-l-2 border-mustard pl-4">
              <h3 class="text-lg font-semibold text-off-white mb-3">Brewforce · The Trigger</h3>
              <p class="text-sm text-off-white/70 leading-relaxed">
                Live sound, AV hire, and repair. Action when it has to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 3: STUDIOS & ROOMS GRID (CRS) */}
      <section id="studios" class="py-20 px-4 bg-nettle-green">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold text-off-white mb-4">
            Studios & Signal Path
          </h2>
          <p class="text-base text-off-white/80 mb-12 max-w-3xl">
            Rooms engineered for predictable results. Dante-first, low-noise signal flow.
          </p>
          
          {/* 3×2 Grid */}
          <div class="grid md:grid-cols-3 gap-6">
            {/* Card 1: Studio A */}
            <div class="bg-deep-charcoal border border-off-white/10 p-6">
              <h3 class="text-lg font-semibold text-off-white mb-1">Studio A</h3>
              <p class="text-sm text-off-white/60 mb-4">Live room + control</p>
              <ul class="space-y-1 text-sm text-off-white/70 font-mono mb-4">
                <li>• Channels: 32 in / 32 out</li>
                <li>• Monitoring: Kii Three + BXT</li>
                <li>• Network: Dante backbone</li>
              </ul>
              <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono mb-3">
                [STUDIO A PHOTO]
              </div>
              <a href="#contact" class="text-sm text-off-white hover:text-mustard transition-colors">
                View details →
              </a>
            </div>
            
            {/* Card 2: Studio B */}
            <div class="bg-deep-charcoal border border-off-white/10 p-6">
              <h3 class="text-lg font-semibold text-off-white mb-1">Studio B</h3>
              <p class="text-sm text-off-white/60 mb-4">Isolated tracking</p>
              <ul class="space-y-1 text-sm text-off-white/70 font-mono mb-4">
                <li>• Channels: 16 in / 16 out</li>
                <li>• Monitoring: Calibrated reference</li>
                <li>• Network: Dante networked</li>
              </ul>
              <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono mb-3">
                [STUDIO B PHOTO]
              </div>
              <a href="#contact" class="text-sm text-off-white hover:text-mustard transition-colors">
                View details →
              </a>
            </div>
            
            {/* Card 3: Workshop / Edit Room */}
            <div class="bg-deep-charcoal border border-off-white/10 p-6">
              <h3 class="text-lg font-semibold text-off-white mb-1">Workshop / Edit Room</h3>
              <p class="text-sm text-off-white/60 mb-4">Production + mixing</p>
              <ul class="space-y-1 text-sm text-off-white/70 font-mono mb-4">
                <li>• Channels: 8 in / 8 out</li>
                <li>• Monitoring: Near-field</li>
                <li>• Network: Dante integrated</li>
              </ul>
              <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono mb-3">
                [WORKSHOP PHOTO]
              </div>
              <a href="#contact" class="text-sm text-off-white hover:text-mustard transition-colors">
                View details →
              </a>
            </div>
            
            {/* Card 4: Dante Network */}
            <div class="bg-deep-charcoal border border-off-white/10 p-6">
              <h3 class="text-lg font-semibold text-off-white mb-1">Dante Network</h3>
              <p class="text-sm text-off-white/60 mb-4">Backbone routing</p>
              <ul class="space-y-1 text-sm text-off-white/70 font-mono mb-4">
                <li>• 48k-96k sample rates</li>
                <li>• Redundancy: documented</li>
                <li>• Low latency: &lt;3ms</li>
              </ul>
              <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono mb-3">
                [DANTE NETWORK DIAGRAM]
              </div>
              <a href="#contact" class="text-sm text-off-white hover:text-mustard transition-colors">
                View details →
              </a>
            </div>
            
            {/* Card 5: Monitoring */}
            <div class="bg-deep-charcoal border border-off-white/10 p-6">
              <h3 class="text-lg font-semibold text-off-white mb-1">Monitoring</h3>
              <p class="text-sm text-off-white/60 mb-4">Calibrated reference</p>
              <ul class="space-y-1 text-sm text-off-white/70 font-mono mb-4">
                <li>• Kii Three + BXT (main)</li>
                <li>• Near-field options</li>
                <li>• Headphone systems</li>
              </ul>
              <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono mb-3">
                [MONITORING PHOTO]
              </div>
              <a href="#contact" class="text-sm text-off-white hover:text-mustard transition-colors">
                View details →
              </a>
            </div>
            
            {/* Card 6: Outboard / Patch */}
            <div class="bg-deep-charcoal border border-off-white/10 p-6">
              <h3 class="text-lg font-semibold text-off-white mb-1">Outboard / Patch</h3>
              <p class="text-sm text-off-white/60 mb-4">Signal processing</p>
              <ul class="space-y-1 text-sm text-off-white/70 font-mono mb-4">
                <li>• Analog path available</li>
                <li>• Patchbay access</li>
                <li>• Documented routing</li>
              </ul>
              <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono mb-3">
                [OUTBOARD PHOTO]
              </div>
              <a href="#contact" class="text-sm text-off-white hover:text-mustard transition-colors">
                View details →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4: SIGNAL INTEGRITY BAND (CRS) */}
      <section class="py-16 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h2 class="text-2xl md:text-4xl font-bold text-off-white mb-4">
                Built around signal integrity
              </h2>
              <p class="text-base text-off-white/80 leading-relaxed">
                From input stage to record, routing is designed to stay quiet, repeatable, and transparent. Modern Dante and NDI where it counts, proven analog where it matters.
              </p>
            </div>
            
            {/* Right */}
            <div>
              <ul class="space-y-3 text-sm text-off-white/70 font-mono">
                <li class="flex justify-between border-b border-off-white/10 pb-2">
                  <span>Dante:</span>
                  <span>yes / 48k-96k</span>
                </li>
                <li class="flex justify-between border-b border-off-white/10 pb-2">
                  <span>Redundancy:</span>
                  <span>documented paths</span>
                </li>
                <li class="flex justify-between border-b border-off-white/10 pb-2">
                  <span>Monitoring:</span>
                  <span>calibrated reference</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 5: THE SHIFT (CRS → WORKSHOP CAFÉ) */}
      <div class="bg-deep-charcoal py-12">
        <div class="text-center">
          <p class="text-xs font-mono text-mustard uppercase tracking-widest">
            WORKSHOP CAFÉ · PUBLIC INTERFACE
          </p>
        </div>
      </div>
      <div class="h-1 bg-mustard w-full"></div>

      {/* BLOCK 6: WORKSHOP CAFÉ INTRO (CAFÉ LAYER) */}
      <section id="cafe" class="py-20 px-4 bg-off-white">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left */}
            <div>
              <h2 class="text-3xl md:text-5xl font-bold text-deep-charcoal mb-4">
                Workshop Café
              </h2>
              <p class="text-base text-deep-charcoal/80 leading-relaxed">
                The civic side of Cowley Road Studios. A flexible room for talks, listening sessions, small performances, and community use.
              </p>
            </div>
            
            {/* Right: Fact Card */}
            <div class="bg-mustard/10 border-2 border-mustard p-6">
              <ul class="space-y-2 text-sm text-deep-charcoal/80">
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
              <div class="mt-6">
                <a href="#contact" class="inline-block border-2 border-deep-charcoal text-deep-charcoal px-6 py-2 font-semibold hover:bg-deep-charcoal hover:text-off-white transition-all text-sm">
                  Venue details
                </a>
              </div>
            </div>
          </div>

          {/* BLOCK 7: CAFÉ USE CASE CARDS */}
          <div>
            <h3 class="text-2xl font-bold text-deep-charcoal mb-8">Use the room</h3>
            
            <div class="grid md:grid-cols-3 gap-8 mb-10">
              {/* Card 1: Talks & workshops */}
              <div class="border-2 border-mustard/30 p-6">
                <h4 class="text-lg font-semibold text-deep-charcoal mb-3">Talks & workshops</h4>
                <p class="text-sm text-deep-charcoal/70 leading-relaxed mb-4">
                  Professional and community sessions. Space for structured learning and creative development.
                </p>
                <a href="#contact" class="text-sm text-deep-charcoal hover:text-mustard transition-colors">
                  See examples →
                </a>
              </div>
              
              {/* Card 2: Listening events */}
              <div class="border-2 border-mustard/30 p-6">
                <h4 class="text-lg font-semibold text-deep-charcoal mb-3">Listening events</h4>
                <p class="text-sm text-deep-charcoal/70 leading-relaxed mb-4">
                  Focused listening, album plays, and sound-centered gatherings in a controlled acoustic environment.
                </p>
                <a href="#contact" class="text-sm text-deep-charcoal hover:text-mustard transition-colors">
                  See examples →
                </a>
              </div>
              
              {/* Card 3: Launches & small performances */}
              <div class="border-2 border-mustard/30 p-6">
                <h4 class="text-lg font-semibold text-deep-charcoal mb-3">Launches & small performances</h4>
                <p class="text-sm text-deep-charcoal/70 leading-relaxed mb-4">
                  Intimate events for releases, showcases, and small-scale performances with professional sound support.
                </p>
                <a href="#contact" class="text-sm text-deep-charcoal hover:text-mustard transition-colors">
                  See examples →
                </a>
              </div>
            </div>
            
            {/* Brewforce CTA - only if booking action */}
            <div class="text-center">
              <a href="mailto:hello@cowleyroadstudios.com" class="inline-block bg-electric-orange text-off-white px-8 py-4 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider">
                [ Book the Workshop Café ]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 8: BREWFORCE SERVICES (BREWFORCE LAYER) */}
      <section id="brewforce" class="py-20 px-4 bg-nettle-green">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold text-off-white mb-12">
            Brewforce · Live & Repair
          </h2>
          
          <div class="grid md:grid-cols-2 gap-12">
            {/* Column 1: Live Sound & AV */}
            <div class="border-l-4 border-mustard pl-6">
              <h3 class="text-2xl font-semibold text-off-white mb-4">Live Sound & AV</h3>
              <p class="text-base text-off-white/80 mb-6 leading-relaxed">
                Lights. Sound. No drama. Professional PA, monitoring, and on-site support when it has to work.
              </p>
              <a href="mailto:hello@cowleyroadstudios.com?subject=Brewforce%20Live%20Sound%20Enquiry" class="inline-block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider">
                [ Check Availability ]
              </a>
            </div>
            
            {/* Column 2: AV Repair */}
            <div class="border-l-4 border-mustard pl-6">
              <h3 class="text-2xl font-semibold text-off-white mb-4">AV Repair</h3>
              <p class="text-base text-off-white/80 mb-6 leading-relaxed">
                If it's worth fixing, we'll fix it. Honest assessment, proper repair, no upsell.
              </p>
              <a href="mailto:hello@cowleyroadstudios.com?subject=Brewforce%20Repair%20Request" class="inline-block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm uppercase tracking-wider">
                [ Request a Repair Slot ]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 9: OLD × NEW STRIP (CRS PHILOSOPHY) */}
      <section class="py-20 px-4 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Photo */}
            <div class="bg-off-white/5 aspect-[4/3] flex items-center justify-center text-off-white/30 text-xs font-mono">
              [VINTAGE VALVES / ANALOG HARDWARE PHOTO]
            </div>
            
            {/* Right: Philosophy */}
            <div>
              <h2 class="text-2xl md:text-4xl font-bold text-off-white mb-4">
                Modern where it counts. Vintage where it matters.
              </h2>
              <p class="text-base text-off-white/80 leading-relaxed">
                Digital networking and routing provide reliability and recall. Analog path options preserve character and workflow familiarity. The system is designed to support both approaches without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 10: CONTACT & LOCATION (CRS + CAFÉ INTERFACE) */}
      <section id="contact" class="py-20 px-4 bg-off-white">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12">
            {/* Left: Contact & Booking */}
            <div>
              <h2 class="text-3xl md:text-5xl font-bold text-deep-charcoal mb-6">
                Contact & booking
              </h2>
              <div class="mb-8">
                <p class="text-base text-deep-charcoal/80 mb-4">
                  <strong>Email:</strong> hello@cowleyroadstudios.com<br />
                  <strong>Phone:</strong> Available on request
                </p>
                <p class="text-sm text-deep-charcoal/60">
                  Responses typically within 24 hours. Booking confirmations sent same day.
                </p>
              </div>
              
              {/* Orange CTAs (stacked) */}
              <div class="space-y-4">
                <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm text-center uppercase tracking-wider">
                  [ Book a Session ]
                </a>
                <a href="mailto:hello@cowleyroadstudios.com?subject=Workshop%20Café%20Booking" class="block bg-electric-orange text-off-white px-6 py-3 font-semibold hover:bg-electric-orange/90 transition-all text-sm text-center uppercase tracking-wider">
                  [ Book the Workshop Café ]
                </a>
              </div>
            </div>
            
            {/* Right: Map / Address */}
            <div>
              <div class="bg-nettle-green/10 border-2 border-mustard h-64 flex items-center justify-center text-deep-charcoal/40 text-sm font-mono mb-4">
                [MAP THUMBNAIL]
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

      {/* BLOCK 11: FOOTER (CRS SHELL) */}
      <footer class="bg-deep-charcoal border-t border-off-white/10 text-off-white py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left */}
            <div>
              <h3 class="text-lg font-semibold mb-3">Cowley Road Studios</h3>
              <p class="text-sm text-off-white/70">
                Engineering-led studio and venue in Oxford.
              </p>
            </div>
            
            {/* Middle: Links */}
            <div>
              <h4 class="font-semibold mb-3 text-sm uppercase tracking-wider text-off-white/80">Navigate</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#studios" class="text-off-white/70 hover:text-mustard transition-colors">Studios</a></li>
                <li><a href="#cafe" class="text-off-white/70 hover:text-mustard transition-colors">Workshop Café</a></li>
                <li><a href="#brewforce" class="text-off-white/70 hover:text-mustard transition-colors">Brewforce</a></li>
                <li><a href="#contact" class="text-off-white/70 hover:text-mustard transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Right */}
            <div>
              <p class="text-sm text-off-white/60 italic">
                Built to stay calm under load.
              </p>
            </div>
          </div>
          <div class="border-t border-off-white/10 pt-6 text-center text-xs text-off-white/50">
            <p>&copy; 2026 Cowley Road Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
