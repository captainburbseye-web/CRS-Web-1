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
      {/* [[CRS_MODE]] Navigation Header */}
      <nav class="fixed top-0 left-0 right-0 bg-nettle-green/95 backdrop-blur-sm border-b border-deep-charcoal z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href="#hero" class="text-lg font-semibold text-off-white tracking-tight">
                Cowley Road Studios
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#studio" class="text-off-white hover:text-mustard transition-colors duration-200 text-sm font-medium">
                Studio
              </a>
              <a href="#cafe" class="text-off-white hover:text-mustard transition-colors duration-200 text-sm font-medium">
                Workshop Café
              </a>
              <a href="#contact" class="bg-electric-orange text-off-white px-6 py-2 rounded-sm font-semibold hover:bg-mustard transition-all duration-200 text-sm">
                Book a Session
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div class="md:hidden">
              <button id="mobile-menu-button" class="text-off-white hover:text-mustard">
                <i class="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div id="mobile-menu" class="hidden md:hidden border-t border-deep-charcoal">
          <div class="px-4 pt-2 pb-4 space-y-2">
            <a href="#studio" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Studio
            </a>
            <a href="#cafe" class="block py-2 text-off-white hover:text-mustard transition-colors text-sm">
              Workshop Café
            </a>
            <a href="#contact" class="block py-3 bg-electric-orange text-off-white text-center rounded-sm font-semibold hover:bg-mustard transition-all text-sm">
              Book a Session
            </a>
          </div>
        </div>
      </nav>

      {/* [[CRS_MODE]] Hero Section */}
      <section id="hero" class="pt-32 pb-20 px-4 bg-nettle-green">
        <div class="max-w-5xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-semibold text-off-white mb-6 leading-tight">
            COWLEY ROAD STUDIOS
          </h1>
          <p class="text-xl md:text-2xl text-off-white/80 mb-4 max-w-2xl font-light">
            Industry Standard. Calm Delivery.
          </p>
          <p class="text-base md:text-lg text-off-white/70 mb-10 max-w-2xl leading-relaxed">
            Analogue soul, digital spine. Professional recording infrastructure at 118 Cowley Road, Oxford.
          </p>
          
          {/* [[BREWFORCE_VO]] Single CTA */}
          <div>
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="inline-block bg-electric-orange text-off-white px-8 py-3 rounded-sm font-semibold hover:bg-mustard transition-all duration-200">
              BOOK A SESSION
            </a>
          </div>
        </div>
      </section>

      {/* [[CRS_MODE]] Studio Section - Technical Grid */}
      <section id="studio" class="py-20 px-4 bg-deep-charcoal">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-semibold text-off-white mb-4">
            The Studio
          </h2>
          <p class="text-lg text-off-white/70 mb-12 max-w-3xl">
            Professional infrastructure designed after years of experience. Modern where it counts, vintage where it matters.
          </p>
          
          {/* Technical Grid */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Spec Card: Dante Network */}
            <div class="bg-nettle-green border border-mustard/20 p-6">
              <div class="text-sm font-mono text-mustard mb-2">NETWORKING</div>
              <h3 class="text-xl font-semibold text-off-white mb-3">Dante Audio</h3>
              <p class="text-sm text-off-white/70 leading-relaxed mb-4">
                Networked audio infrastructure for clean signal routing across all rooms.
              </p>
              <div class="bg-deep-charcoal/50 h-40 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [DANTE NETWORK DIAGRAM]
              </div>
            </div>
            
            {/* Spec Card: Monitoring */}
            <div class="bg-nettle-green border border-mustard/20 p-6">
              <div class="text-sm font-mono text-mustard mb-2">MONITORING</div>
              <h3 class="text-xl font-semibold text-off-white mb-3">Kii Three + BXT</h3>
              <p class="text-sm text-off-white/70 leading-relaxed mb-4">
                Reference-grade monitoring system with bass extension for accurate mixing.
              </p>
              <div class="bg-deep-charcoal/50 h-40 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [KII MONITORING PHOTO]
              </div>
            </div>
            
            {/* Spec Card: Microphones */}
            <div class="bg-nettle-green border border-mustard/20 p-6">
              <div class="text-sm font-mono text-mustard mb-2">CAPTURE</div>
              <h3 class="text-xl font-semibold text-off-white mb-3">Sphere DLX</h3>
              <p class="text-sm text-off-white/70 leading-relaxed mb-4">
                Modeling microphones for versatile tracking and post-production flexibility.
              </p>
              <div class="bg-deep-charcoal/50 h-40 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [SPHERE MIC PHOTO]
              </div>
            </div>
            
            {/* Spec Card: Rooms */}
            <div class="bg-nettle-green border border-mustard/20 p-6">
              <div class="text-sm font-mono text-mustard mb-2">INFRASTRUCTURE</div>
              <h3 class="text-xl font-semibold text-off-white mb-3">5 Isolated Rooms</h3>
              <p class="text-sm text-off-white/70 leading-relaxed mb-4">
                Separate tracking spaces for clean separation and workflow efficiency.
              </p>
              <div class="bg-deep-charcoal/50 h-40 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [ISOLATED ROOM PHOTO]
              </div>
            </div>
            
            {/* Spec Card: Video */}
            <div class="bg-nettle-green border border-mustard/20 p-6">
              <div class="text-sm font-mono text-mustard mb-2">VIDEO</div>
              <h3 class="text-xl font-semibold text-off-white mb-3">NDI Streaming</h3>
              <p class="text-sm text-off-white/70 leading-relaxed mb-4">
                Multi-camera video integration for live sessions and content creation.
              </p>
              <div class="bg-deep-charcoal/50 h-40 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [NDI VIDEO SETUP]
              </div>
            </div>
            
            {/* Spec Card: Old vs New */}
            <div class="bg-nettle-green border border-mustard/20 p-6">
              <div class="text-sm font-mono text-mustard mb-2">PHILOSOPHY</div>
              <h3 class="text-xl font-semibold text-off-white mb-3">Vintage + Modern</h3>
              <p class="text-sm text-off-white/70 leading-relaxed mb-4">
                Analogue warmth paired with digital precision. Best of both worlds.
              </p>
              <div class="bg-deep-charcoal/50 h-40 flex items-center justify-center text-off-white/40 text-xs font-mono">
                [VINTAGE VALVE + NDI COMPARISON]
              </div>
            </div>
          </div>
          
          {/* Booking CTA */}
          <div class="text-center pt-8 border-t border-mustard/20">
            <p class="text-sm text-off-white/60 mb-4 font-mono">
              £35/ph · Engineer included · Flexible booking
            </p>
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="inline-block bg-electric-orange text-off-white px-8 py-3 rounded-sm font-semibold hover:bg-mustard transition-all duration-200">
              BOOK A SESSION
            </a>
          </div>
        </div>
      </section>

      {/* [[CAFE_SHELL]] Workshop Café Section - Institutional Tone */}
      <section id="cafe" class="py-20 px-4 bg-off-white">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-semibold text-deep-charcoal mb-6">
            Workshop Café
          </h2>
          <p class="text-lg text-deep-charcoal/70 mb-8 max-w-3xl">
            A coworking space and small venue. Coffee by day, events by night. Opens Spring 2026.
          </p>
          
          <div class="grid md:grid-cols-2 gap-8 mb-10">
            {/* Daytime */}
            <div class="bg-nettle-green/5 border border-mustard/20 p-6">
              <h3 class="text-xl font-semibold text-deep-charcoal mb-3">Day Space</h3>
              <ul class="space-y-2 text-deep-charcoal/70 text-sm">
                <li>• Coworking desks</li>
                <li>• Free WiFi</li>
                <li>• Coffee & snacks</li>
                <li>• Quiet working environment</li>
              </ul>
            </div>
            
            {/* Nighttime */}
            <div class="bg-nettle-green/5 border border-mustard/20 p-6">
              <h3 class="text-xl font-semibold text-deep-charcoal mb-3">Night Venue</h3>
              <ul class="space-y-2 text-deep-charcoal/70 text-sm">
                <li>• 45-60 capacity</li>
                <li>• Live sessions & open mics</li>
                <li>• Community events</li>
                <li>• Affordable venue hire</li>
              </ul>
            </div>
          </div>
          
          {/* Placeholder Image */}
          <div class="bg-nettle-green/10 h-64 flex items-center justify-center text-deep-charcoal/30 text-sm font-mono mb-8">
            [WORKSHOP CAFÉ INTERIOR]
          </div>
          
          <div class="text-center">
            <p class="text-sm text-deep-charcoal/60 mb-3">Opening Spring 2026</p>
            <a href="mailto:hello@cowleyroadstudios.com" class="inline-block bg-mustard text-deep-charcoal px-6 py-3 rounded-sm font-semibold hover:bg-electric-orange hover:text-off-white transition-all duration-200 text-sm">
              Enquire About Venue Hire
            </a>
          </div>
        </div>
      </section>

      {/* [[CRS_MODE]] Grassroots Promise */}
      <section id="promise" class="py-20 px-4 bg-nettle-green">
        <div class="max-w-4xl mx-auto">
          <div class="border border-mustard/30 p-8 md:p-12">
            <h2 class="text-2xl md:text-4xl font-semibold mb-6 text-off-white">
              Grassroots Promise
            </h2>
            <p class="text-base md:text-lg leading-relaxed text-off-white/80 mb-8">
              We ring-fence at least 15% of monthly bookable studio time for subsidised sessions (£0-£15/ph) for grassroots artists, young people (16-25), and community projects.
            </p>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-3xl font-semibold text-mustard mb-1">15%</div>
                <div class="text-xs text-off-white/60">Subsidised Hours</div>
              </div>
              <div>
                <div class="text-3xl font-semibold text-mustard mb-1">£0-£15</div>
                <div class="text-xs text-off-white/60">Grassroots Rate</div>
              </div>
              <div>
                <div class="text-3xl font-semibold text-mustard mb-1">No</div>
                <div class="text-xs text-off-white/60">Gatekeeping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [[BREWFORCE_VO]] Contact/Booking Section */}
      <section id="contact" class="py-20 px-4 bg-deep-charcoal">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-5xl font-semibold text-off-white mb-6">
            Secure Launch Credit
          </h2>
          <p class="text-lg text-off-white/70 mb-12 max-w-2xl mx-auto">
            Lock in 2026 rates now. Limited vouchers available.
          </p>
          
          <div class="grid md:grid-cols-2 gap-6 mb-12">
            {/* 2-Hour Voucher */}
            <div class="bg-nettle-green border border-mustard/30 p-6 text-left">
              <h3 class="text-xl font-semibold text-off-white mb-2">2-Hour Session</h3>
              <div class="text-4xl font-bold text-electric-orange mb-2">£70</div>
              <div class="text-sm text-off-white/50 line-through mb-4">Regular: £105</div>
              <ul class="space-y-2 text-sm text-off-white/70 mb-6">
                <li>• 2 studio hours</li>
                <li>• Valid 12 months</li>
                <li>• Engineer included</li>
              </ul>
              <a href="https://buy.stripe.com/eVq7sKdGp2MebDg000" target="_blank" rel="noopener noreferrer" class="block w-full bg-electric-orange text-off-white py-3 rounded-sm font-semibold hover:bg-mustard transition-all text-center">
                Purchase Voucher
              </a>
            </div>

            {/* 6-Hour Voucher */}
            <div class="bg-nettle-green border-2 border-electric-orange p-6 text-left relative">
              <div class="absolute top-3 right-3 bg-electric-orange text-off-white text-xs font-bold py-1 px-2 rounded-sm">
                BEST VALUE
              </div>
              <h3 class="text-xl font-semibold text-off-white mb-2">6-Hour Voucher</h3>
              <div class="text-4xl font-bold text-electric-orange mb-2">£130</div>
              <div class="text-sm text-off-white/50 line-through mb-4">Regular: £210</div>
              <ul class="space-y-2 text-sm text-off-white/70 mb-6">
                <li>• 6 studio hours</li>
                <li>• Valid 12 months</li>
                <li>• Engineer included</li>
              </ul>
              <a href="mailto:hello@cowleyroadstudios.com" class="block w-full bg-mustard text-deep-charcoal py-3 rounded-sm font-semibold hover:bg-electric-orange hover:text-off-white transition-all text-center">
                Contact for Deal
              </a>
            </div>
          </div>

          {/* Crowdfunder Link */}
          <div class="pt-8 border-t border-mustard/20">
            <p class="text-sm text-off-white/60 mb-4">Or support the build:</p>
            <a href="https://www.crowdfunder.co.uk/p/cowley-road-studios" target="_blank" rel="noopener noreferrer" class="inline-block bg-mustard text-deep-charcoal px-6 py-3 rounded-sm font-semibold hover:bg-electric-orange hover:text-off-white transition-all">
              Back the Crowdfunder
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-nettle-green border-t border-mustard/20 text-off-white py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 class="text-lg font-semibold mb-3">Cowley Road Studios</h3>
              <p class="text-sm text-off-white/70">
                Professional recording infrastructure. Calm delivery.
              </p>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-sm">Quick Links</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#studio" class="text-off-white/70 hover:text-mustard transition-colors">The Studio</a></li>
                <li><a href="#cafe" class="text-off-white/70 hover:text-mustard transition-colors">Workshop Café</a></li>
                <li><a href="#promise" class="text-off-white/70 hover:text-mustard transition-colors">Grassroots Promise</a></li>
                <li><a href="#contact" class="text-off-white/70 hover:text-mustard transition-colors">Book a Session</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-sm">Location</h4>
              <p class="text-sm text-off-white/70">
                118 Cowley Road<br />
                Oxford<br />
                OX4 1JE
              </p>
            </div>
          </div>
          <div class="border-t border-off-white/10 pt-6 text-center text-xs text-off-white/50">
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

// Booking Success Page Route (unchanged)
app.get('/booking-success', (c) => {
  return c.render(
    <>
      <div class="min-h-screen flex items-center justify-center px-4 py-20 bg-off-white">
        <div class="max-w-2xl w-full text-center">
          <div class="mb-8">
            <i class="fas fa-check-circle text-electric-orange text-8xl"></i>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-semibold text-deep-charcoal mb-4">
            SESSION CONFIRMED
          </h1>
          
          <p class="text-2xl text-mustard mb-8">
            Your time is locked in.
          </p>
          
          <div class="bg-nettle-green/5 border border-mustard/20 rounded-sm p-8 mb-8 text-left">
            <p class="text-base text-deep-charcoal/80 leading-relaxed mb-4">
              Thanks for booking with Cowley Road Studios. You should receive a confirmation email from Square shortly.
            </p>
            <p class="text-base text-deep-charcoal/80 leading-relaxed mb-4">
              Please arrive <strong class="text-mustard">15 minutes before</strong> your session start time.
            </p>
            <div class="mt-6 pt-6 border-t border-mustard/20">
              <p class="text-deep-charcoal/70 mb-2 text-sm">
                <i class="fas fa-map-marker-alt text-mustard mr-2"></i>
                <strong>Location:</strong>
              </p>
              <p class="text-deep-charcoal text-base">
                118 Cowley Road<br/>
                Oxford<br/>
                OX4 1JE
              </p>
            </div>
          </div>
          
          <a href="/" class="inline-block bg-electric-orange text-off-white px-8 py-3 rounded-sm font-semibold hover:bg-mustard transition-all">
            <i class="fas fa-home mr-2"></i>
            Back to Home
          </a>
        </div>
      </div>
    </>
  )
})

export default app
