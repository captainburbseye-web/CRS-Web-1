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
      {/* Sticky Live Status Bar */}
      <div class="fixed top-0 left-0 right-0 bg-deep-charcoal border-b-2 border-mustard z-50">
        <div class="max-w-7xl mx-auto px-4 py-2">
          <div class="flex items-center justify-center md:justify-start gap-6 text-xs font-mono text-off-white">
            <span class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 bg-moss-green rounded-full animate-pulse"></span>
              Café: Open
            </span>
            <span class="hidden md:inline">|</span>
            <span class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 bg-burnt-orange rounded-full animate-pulse"></span>
              Studio: Session in Progress
            </span>
            <span class="hidden md:inline">|</span>
            <span class="hidden md:flex items-center gap-2">
              <span class="inline-block w-2 h-2 bg-electric-orange rounded-full"></span>
              Electronics: Taking Repairs
            </span>
          </div>
        </div>
      </div>

      {/* Brutalist Navigation */}
      <nav class="fixed top-10 left-0 right-0 bg-nettle-green/98 backdrop-blur-sm border-b-4 border-deep-charcoal z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-14">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href="#hero" class="text-base font-serif font-bold text-off-white tracking-tight">
                CRS × Workshop Café
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-6">
              <a href="#studio" class="text-off-white hover:text-mustard transition-colors duration-200 text-sm font-mono">
                Studio
              </a>
              <a href="#cafe" class="text-off-white hover:text-mustard transition-colors duration-200 text-sm font-mono">
                Café
              </a>
              <a href="#contact" class="bg-electric-orange text-off-white px-5 py-2 font-mono font-semibold hover:bg-burnt-orange transition-all duration-200 text-xs border-2 border-deep-charcoal">
                BOOK
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
        <div id="mobile-menu" class="hidden md:hidden border-t-2 border-deep-charcoal bg-nettle-green">
          <div class="px-4 pt-2 pb-4 space-y-2">
            <a href="#studio" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm font-mono">
              Studio
            </a>
            <a href="#cafe" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm font-mono">
              Café
            </a>
            <a href="#contact" class="block py-2 bg-electric-orange text-off-white text-center font-mono font-semibold hover:bg-burnt-orange transition-all text-xs border-2 border-deep-charcoal">
              BOOK
            </a>
          </div>
        </div>
      </nav>

      {/* Living Grid Hero - NO FACES */}
      <section id="hero" class="pt-32 pb-0 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto px-4">
          {/* Headline */}
          <div class="mb-8">
            <h1 class="text-5xl md:text-7xl font-serif font-bold text-off-white mb-4 leading-none">
              Cowley Road Studios
            </h1>
            <p class="text-xl md:text-2xl text-mustard font-serif italic">
              Built, not branded.
            </p>
          </div>
          
          {/* Living Grid - Textured Blocks */}
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-0">
            {/* Block 1: Tube Amp */}
            <div class="aspect-square bg-nettle-green border-4 border-mustard grain-overlay relative overflow-hidden group">
              <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="text-center">
                  <div class="text-xs font-mono text-mustard mb-2 uppercase">Infrastructure</div>
                  <div class="text-off-white/80 text-xs font-mono">[VINTAGE TUBE AMP CLOSE-UP]</div>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-burnt-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Block 2: Steam/Coffee */}
            <div class="aspect-square bg-mustard/90 border-4 border-nettle-green grain-overlay relative overflow-hidden group">
              <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="text-center">
                  <div class="text-xs font-mono text-nettle-green mb-2 uppercase">Atmosphere</div>
                  <div class="text-deep-charcoal text-xs font-mono">[STEAM RISING FROM UE COFFEE]</div>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-moss-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Block 3: Exterior */}
            <div class="aspect-square bg-moss-green border-4 border-deep-charcoal grain-overlay relative overflow-hidden group">
              <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="text-center">
                  <div class="text-xs font-mono text-off-white mb-2 uppercase">Location</div>
                  <div class="text-off-white/80 text-xs font-mono">[NETTLE GREEN EXTERIOR / COWLEY RD]</div>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-nettle-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Block 4: Patch Cables */}
            <div class="aspect-square bg-burnt-orange border-4 border-off-white grain-overlay relative overflow-hidden group">
              <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="text-center">
                  <div class="text-xs font-mono text-off-white mb-2 uppercase">Signal</div>
                  <div class="text-off-white text-xs font-mono">[PATCH CABLES / HANDS / METAL / WOOD]</div>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-electric-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Soul Split-Screen Navigation */}
      <section class="py-0 bg-deep-charcoal">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 min-h-[60vh]">
            
            {/* LEFT PATH: Workshop Café */}
            <a href="#cafe" class="group relative bg-mustard hover:bg-mustard/90 transition-all duration-500 border-r-4 border-deep-charcoal">
              <div class="absolute inset-0 grain-overlay"></div>
              <div class="relative z-10 p-8 md:p-12 flex flex-col justify-center min-h-[60vh]">
                <div class="mb-6">
                  <div class="text-xs font-mono text-deep-charcoal/60 mb-2 uppercase tracking-wider">ONE PATH</div>
                  <h2 class="text-4xl md:text-6xl font-serif font-bold text-deep-charcoal mb-4 leading-none">
                    Workshop<br/>Café
                  </h2>
                </div>
                <ul class="space-y-2 text-deep-charcoal/80 text-sm font-body mb-6">
                  <li>• Community</li>
                  <li>• Warmth</li>
                  <li>• Caffeine</li>
                  <li>• Daylight</li>
                  <li>• Civic presence</li>
                </ul>
                <div class="inline-flex items-center text-sm font-mono text-deep-charcoal group-hover:text-nettle-green transition-colors">
                  EXPLORE → 
                </div>
              </div>
            </a>
            
            {/* RIGHT PATH: CRS Studio */}
            <a href="#studio" class="group relative bg-nettle-green hover:bg-nettle-green/90 transition-all duration-500">
              <div class="absolute inset-0 grain-overlay"></div>
              <div class="relative z-10 p-8 md:p-12 flex flex-col justify-center min-h-[60vh]">
                <div class="mb-6">
                  <div class="text-xs font-mono text-mustard mb-2 uppercase tracking-wider">OTHER PATH</div>
                  <h2 class="text-4xl md:text-6xl font-serif font-bold text-off-white mb-4 leading-none">
                    Cowley Road<br/>Studios
                  </h2>
                </div>
                <ul class="space-y-2 text-off-white/80 text-sm font-body mb-6">
                  <li>• Precision</li>
                  <li>• Recording</li>
                  <li>• Late nights</li>
                  <li>• Infrastructure</li>
                  <li>• Engineering calm</li>
                </ul>
                <div class="inline-flex items-center text-sm font-mono text-mustard group-hover:text-off-white transition-colors">
                  EXPLORE →
                </div>
              </div>
            </a>
            
          </div>
        </div>
      </section>

      {/* Studio Section - Technical Brutalism */}
      <section id="studio" class="py-20 px-4 bg-deep-charcoal">
        <div class="max-w-6xl mx-auto">
          <div class="mb-12 border-l-8 border-mustard pl-6">
            <h2 class="text-4xl md:text-6xl font-serif font-bold text-off-white mb-3 leading-none">
              The Studio
            </h2>
            <p class="text-lg text-off-white/70 font-body max-w-2xl">
              Analogue soul, digital spine. Professional infrastructure designed after years of experience.
            </p>
          </div>
          
          {/* Technical Grid - Equipment Tags Style */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            
            {/* Spec Card: Dante */}
            <div class="bg-nettle-green border-4 border-mustard p-6 grain-overlay relative">
              <div class="relative z-10">
                <div class="text-xs font-mono text-mustard mb-3 uppercase tracking-widest">NETWORKING</div>
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">Dante Audio</h3>
                <p class="text-sm text-off-white/70 font-body leading-relaxed mb-4">
                  Networked audio infrastructure for clean signal routing across all rooms.
                </p>
                <div class="bg-deep-charcoal/60 h-32 flex items-center justify-center text-off-white/30 text-xs font-mono border-2 border-mustard/30">
                  [DANTE NETWORK DIAGRAM]
                </div>
              </div>
            </div>
            
            {/* Spec Card: Monitoring */}
            <div class="bg-nettle-green border-4 border-burnt-orange p-6 grain-overlay relative">
              <div class="relative z-10">
                <div class="text-xs font-mono text-burnt-orange mb-3 uppercase tracking-widest">MONITORING</div>
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">Kii Three + BXT</h3>
                <p class="text-sm text-off-white/70 font-body leading-relaxed mb-4">
                  Reference-grade monitoring with bass extension for accurate mixing.
                </p>
                <div class="bg-deep-charcoal/60 h-32 flex items-center justify-center text-off-white/30 text-xs font-mono border-2 border-burnt-orange/30">
                  [KII MONITORING PHOTO]
                </div>
              </div>
            </div>
            
            {/* Spec Card: Microphones */}
            <div class="bg-nettle-green border-4 border-moss-green p-6 grain-overlay relative">
              <div class="relative z-10">
                <div class="text-xs font-mono text-moss-green mb-3 uppercase tracking-widest">CAPTURE</div>
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">Sphere DLX</h3>
                <p class="text-sm text-off-white/70 font-body leading-relaxed mb-4">
                  Modeling microphones for versatile tracking and post-production.
                </p>
                <div class="bg-deep-charcoal/60 h-32 flex items-center justify-center text-off-white/30 text-xs font-mono border-2 border-moss-green/30">
                  [SPHERE MIC PHOTO]
                </div>
              </div>
            </div>
            
            {/* Spec Card: Rooms */}
            <div class="bg-nettle-green border-4 border-mustard p-6 grain-overlay relative">
              <div class="relative z-10">
                <div class="text-xs font-mono text-mustard mb-3 uppercase tracking-widest">INFRASTRUCTURE</div>
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">5 Isolated Rooms</h3>
                <p class="text-sm text-off-white/70 font-body leading-relaxed mb-4">
                  Separate tracking spaces for clean separation and workflow efficiency.
                </p>
                <div class="bg-deep-charcoal/60 h-32 flex items-center justify-center text-off-white/30 text-xs font-mono border-2 border-mustard/30">
                  [ISOLATED ROOM PHOTO]
                </div>
              </div>
            </div>
            
            {/* Spec Card: Video */}
            <div class="bg-nettle-green border-4 border-electric-orange p-6 grain-overlay relative">
              <div class="relative z-10">
                <div class="text-xs font-mono text-electric-orange mb-3 uppercase tracking-widest">VIDEO</div>
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">NDI Streaming</h3>
                <p class="text-sm text-off-white/70 font-body leading-relaxed mb-4">
                  Multi-camera video integration for live sessions and content creation.
                </p>
                <div class="bg-deep-charcoal/60 h-32 flex items-center justify-center text-off-white/30 text-xs font-mono border-2 border-electric-orange/30">
                  [NDI VIDEO SETUP]
                </div>
              </div>
            </div>
            
            {/* Spec Card: Philosophy */}
            <div class="bg-burnt-orange border-4 border-off-white p-6 grain-overlay relative">
              <div class="relative z-10">
                <div class="text-xs font-mono text-off-white mb-3 uppercase tracking-widest">PHILOSOPHY</div>
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">Vintage + Modern</h3>
                <p class="text-sm text-off-white/90 font-body leading-relaxed mb-4">
                  Analogue warmth paired with digital precision. Best of both worlds.
                </p>
                <div class="bg-deep-charcoal/60 h-32 flex items-center justify-center text-off-white/40 text-xs font-mono border-2 border-off-white/40">
                  [VINTAGE VALVE + NDI COMPARISON]
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Rates - Brutalist Style */}
          <div class="border-4 border-mustard bg-nettle-green p-8 text-center grain-overlay relative">
            <div class="relative z-10">
              <div class="text-sm font-mono text-mustard mb-2 uppercase tracking-widest">Studio Rate</div>
              <div class="text-6xl font-serif font-bold text-off-white mb-2">£35<span class="text-3xl">/ph</span></div>
              <div class="text-sm text-off-white/60 font-mono mb-6">Engineer included · Flexible booking</div>
              <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="inline-block bg-electric-orange text-off-white px-8 py-3 font-mono font-semibold hover:bg-burnt-orange transition-all duration-200 border-4 border-deep-charcoal text-sm uppercase tracking-wider">
                BOOK A SESSION
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Café - Institutional Warmth */}
      <section id="cafe" class="py-20 px-4 bg-mustard">
        <div class="max-w-5xl mx-auto">
          <div class="mb-12 border-l-8 border-deep-charcoal pl-6">
            <h2 class="text-4xl md:text-6xl font-serif font-bold text-deep-charcoal mb-3 leading-none">
              Workshop Café
            </h2>
            <p class="text-lg text-deep-charcoal/80 font-body max-w-2xl">
              Coworking space and small venue. Coffee by day, events by night. Opens Spring 2026.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6 mb-10">
            
            {/* Day Space */}
            <div class="bg-off-white border-4 border-nettle-green p-6 grain-overlay relative">
              <div class="relative z-10">
                <h3 class="text-2xl font-serif font-bold text-deep-charcoal mb-4">Day Space</h3>
                <ul class="space-y-2 text-deep-charcoal/70 text-sm font-body">
                  <li class="flex items-start">
                    <span class="text-moss-green mr-2">●</span>
                    Coworking desks
                  </li>
                  <li class="flex items-start">
                    <span class="text-moss-green mr-2">●</span>
                    Free WiFi
                  </li>
                  <li class="flex items-start">
                    <span class="text-moss-green mr-2">●</span>
                    Coffee & snacks
                  </li>
                  <li class="flex items-start">
                    <span class="text-moss-green mr-2">●</span>
                    Quiet working environment
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Night Venue */}
            <div class="bg-nettle-green border-4 border-off-white p-6 grain-overlay relative">
              <div class="relative z-10">
                <h3 class="text-2xl font-serif font-bold text-off-white mb-4">Night Venue</h3>
                <ul class="space-y-2 text-off-white/80 text-sm font-body">
                  <li class="flex items-start">
                    <span class="text-burnt-orange mr-2">●</span>
                    45-60 capacity
                  </li>
                  <li class="flex items-start">
                    <span class="text-burnt-orange mr-2">●</span>
                    Live sessions & open mics
                  </li>
                  <li class="flex items-start">
                    <span class="text-burnt-orange mr-2">●</span>
                    Community events
                  </li>
                  <li class="flex items-start">
                    <span class="text-burnt-orange mr-2">●</span>
                    Affordable venue hire
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          
          {/* Placeholder Image */}
          <div class="bg-nettle-green/30 border-4 border-deep-charcoal h-64 flex items-center justify-center text-deep-charcoal/40 text-sm font-mono mb-8 grain-overlay relative">
            <div class="relative z-10">[WORKSHOP CAFÉ INTERIOR]</div>
          </div>
          
          <div class="text-center">
            <p class="text-sm font-mono text-deep-charcoal/60 mb-4 uppercase tracking-wider">Opening Spring 2026</p>
            <a href="mailto:hello@cowleyroadstudios.com" class="inline-block bg-nettle-green text-off-white px-6 py-3 font-mono font-semibold hover:bg-deep-charcoal transition-all duration-200 text-sm border-4 border-deep-charcoal uppercase tracking-wider">
              VENUE HIRE ENQUIRIES
            </a>
          </div>
        </div>
      </section>

      {/* Grassroots Promise - Vintage Gig Poster Style */}
      <section id="promise" class="py-20 px-4 bg-deep-charcoal">
        <div class="max-w-4xl mx-auto">
          <div class="border-8 border-electric-orange bg-nettle-green p-8 md:p-12 grain-overlay relative transform hover:scale-[1.01] transition-transform duration-300">
            <div class="relative z-10">
              <div class="text-center mb-8">
                <div class="text-xs font-mono text-electric-orange mb-3 uppercase tracking-widest">No Gatekeeping</div>
                <h2 class="text-3xl md:text-5xl font-serif font-bold text-off-white mb-6 leading-none">
                  Grassroots Promise
                </h2>
                <p class="text-base md:text-lg leading-relaxed text-off-white/90 font-body max-w-2xl mx-auto">
                  We ring-fence at least <strong class="text-mustard font-bold">15% of monthly bookable studio time</strong> for subsidised sessions (£0-£15/ph) for grassroots artists, young people (16-25), and community projects.
                </p>
              </div>
              
              <div class="grid grid-cols-3 gap-6 text-center">
                <div class="border-4 border-mustard bg-deep-charcoal/50 p-4">
                  <div class="text-4xl font-serif font-bold text-mustard mb-1">15%</div>
                  <div class="text-xs font-mono text-off-white/70 uppercase">Subsidised Hours</div>
                </div>
                <div class="border-4 border-electric-orange bg-deep-charcoal/50 p-4">
                  <div class="text-4xl font-serif font-bold text-electric-orange mb-1">£0-£15</div>
                  <div class="text-xs font-mono text-off-white/70 uppercase">Grassroots Rate</div>
                </div>
                <div class="border-4 border-moss-green bg-deep-charcoal/50 p-4">
                  <div class="text-4xl font-serif font-bold text-moss-green mb-1">No</div>
                  <div class="text-xs font-mono text-off-white/70 uppercase">Gatekeeping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking/Contact Section */}
      <section id="contact" class="py-20 px-4 bg-nettle-green">
        <div class="max-w-5xl mx-auto">
          <div class="mb-12 text-center">
            <h2 class="text-4xl md:text-6xl font-serif font-bold text-off-white mb-4 leading-none">
              Secure Launch Credit
            </h2>
            <p class="text-lg text-off-white/70 font-body max-w-2xl mx-auto">
              Lock in 2026 rates now. Limited vouchers available.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6 mb-12">
            
            {/* 2-Hour Voucher */}
            <div class="bg-deep-charcoal border-4 border-mustard p-6 grain-overlay relative">
              <div class="relative z-10">
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">2-Hour Session</h3>
                <div class="text-5xl font-serif font-bold text-electric-orange mb-2">£70</div>
                <div class="text-sm text-off-white/50 line-through font-mono mb-4">Regular: £105</div>
                <ul class="space-y-2 text-sm text-off-white/70 font-body mb-6">
                  <li>• 2 studio hours</li>
                  <li>• Valid 12 months</li>
                  <li>• Engineer included</li>
                </ul>
                <a href="https://buy.stripe.com/eVq7sKdGp2MebDg000" target="_blank" rel="noopener noreferrer" class="block w-full bg-electric-orange text-off-white py-3 text-center font-mono font-semibold hover:bg-burnt-orange transition-all border-4 border-off-white text-sm uppercase tracking-wider">
                  PURCHASE VOUCHER
                </a>
              </div>
            </div>

            {/* 6-Hour Voucher */}
            <div class="bg-deep-charcoal border-4 border-electric-orange p-6 grain-overlay relative">
              <div class="absolute top-3 right-3 bg-electric-orange text-off-white text-xs font-mono font-bold py-1 px-3 border-2 border-off-white z-20 uppercase tracking-wider">
                BEST VALUE
              </div>
              <div class="relative z-10">
                <h3 class="text-2xl font-serif font-bold text-off-white mb-2">6-Hour Voucher</h3>
                <div class="text-5xl font-serif font-bold text-electric-orange mb-2">£130</div>
                <div class="text-sm text-off-white/50 line-through font-mono mb-4">Regular: £210</div>
                <ul class="space-y-2 text-sm text-off-white/70 font-body mb-6">
                  <li>• 6 studio hours</li>
                  <li>• Valid 12 months</li>
                  <li>• Engineer included</li>
                </ul>
                <a href="mailto:hello@cowleyroadstudios.com" class="block w-full bg-mustard text-deep-charcoal py-3 text-center font-mono font-semibold hover:bg-electric-orange hover:text-off-white transition-all border-4 border-off-white text-sm uppercase tracking-wider">
                  CONTACT FOR DEAL
                </a>
              </div>
            </div>
            
          </div>

          {/* Crowdfunder */}
          <div class="pt-8 border-t-4 border-mustard text-center">
            <p class="text-sm font-mono text-off-white/60 mb-4 uppercase tracking-wider">Or support the build:</p>
            <a href="https://www.crowdfunder.co.uk/p/cowley-road-studios" target="_blank" rel="noopener noreferrer" class="inline-block bg-mustard text-deep-charcoal px-8 py-3 font-mono font-semibold hover:bg-electric-orange hover:text-off-white transition-all border-4 border-deep-charcoal text-sm uppercase tracking-wider">
              BACK THE CROWDFUNDER
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Brutalist */}
      <footer class="bg-deep-charcoal border-t-8 border-mustard text-off-white py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-serif font-bold mb-3 text-mustard">CRS × Workshop Café</h3>
              <p class="text-sm text-off-white/70 font-body">
                Built, not branded.
              </p>
            </div>
            <div>
              <h4 class="font-mono font-semibold mb-3 text-sm uppercase tracking-wider text-off-white/80">Navigate</h4>
              <ul class="space-y-2 text-sm font-body">
                <li><a href="#studio" class="text-off-white/70 hover:text-mustard transition-colors">Studio</a></li>
                <li><a href="#cafe" class="text-off-white/70 hover:text-mustard transition-colors">Workshop Café</a></li>
                <li><a href="#promise" class="text-off-white/70 hover:text-mustard transition-colors">Grassroots Promise</a></li>
                <li><a href="#contact" class="text-off-white/70 hover:text-mustard transition-colors">Book</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-mono font-semibold mb-3 text-sm uppercase tracking-wider text-off-white/80">Location</h4>
              <p class="text-sm text-off-white/70 font-mono leading-relaxed">
                118 Cowley Road<br />
                Oxford<br />
                OX4 1JE
              </p>
            </div>
          </div>
          <div class="border-t-2 border-off-white/10 pt-6 text-center text-xs text-off-white/50 font-mono">
            <p>&copy; 2026 Cowley Road Studios. Built with care on Cowley Road.</p>
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

// Booking Success Page (Brutalist Treatment)
app.get('/booking-success', (c) => {
  return c.render(
    <>
      <div class="min-h-screen flex items-center justify-center px-4 py-20 bg-mustard">
        <div class="max-w-2xl w-full">
          <div class="bg-nettle-green border-8 border-electric-orange p-12 grain-overlay relative">
            <div class="relative z-10 text-center">
              <div class="mb-8">
                <i class="fas fa-check-circle text-electric-orange text-8xl"></i>
              </div>
              
              <h1 class="text-5xl md:text-6xl font-serif font-bold text-off-white mb-4 leading-none">
                SESSION<br/>CONFIRMED
              </h1>
              
              <p class="text-2xl text-mustard font-serif italic mb-8">
                Your time is locked in.
              </p>
              
              <div class="bg-deep-charcoal/60 border-4 border-mustard p-8 mb-8 text-left">
                <p class="text-base text-off-white/90 font-body leading-relaxed mb-4">
                  Thanks for booking with Cowley Road Studios. You should receive a confirmation email from Square shortly.
                </p>
                <p class="text-base text-off-white/90 font-body leading-relaxed mb-4">
                  Please arrive <strong class="text-electric-orange">15 minutes before</strong> your session start time.
                </p>
                <div class="mt-6 pt-6 border-t-2 border-mustard/30">
                  <p class="text-off-white/70 mb-2 text-sm font-mono uppercase tracking-wider">
                    <i class="fas fa-map-marker-alt text-electric-orange mr-2"></i>
                    Location
                  </p>
                  <p class="text-off-white font-mono text-base">
                    118 Cowley Road<br/>
                    Oxford<br/>
                    OX4 1JE
                  </p>
                </div>
              </div>
              
              <a href="/" class="inline-block bg-electric-orange text-off-white px-8 py-3 font-mono font-semibold hover:bg-burnt-orange transition-all border-4 border-off-white text-sm uppercase tracking-wider">
                <i class="fas fa-home mr-2"></i>
                BACK TO HOME
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default app
