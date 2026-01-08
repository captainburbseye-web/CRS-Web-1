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
      {/* Navigation Header */}
      <nav class="fixed top-0 left-0 right-0 bg-foliage-dark/95 backdrop-blur-sm border-b border-flame-burnt/40 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href="#hero" class="text-xl font-display font-bold text-text-light">
                Cowley Road Studios
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#about" class="text-text-light hover:text-foliage-vibrant transition-colors duration-200">
                About
              </a>
              <a href="#cafe" class="text-text-light hover:text-foliage-vibrant transition-colors duration-200">
                Workshop Café
              </a>
              <a href="#studio" class="text-text-light hover:text-foliage-vibrant transition-colors duration-200">
                Studio
              </a>
              <a href="#promise" class="text-text-light hover:text-foliage-vibrant transition-colors duration-200">
                Promise
              </a>
              <a href="#contact" class="bg-flame-fierce text-text-light px-6 py-2 rounded-md font-semibold hover:bg-flame-burnt transition-all duration-200">
                Book a Session
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div class="md:hidden">
              <button id="mobile-menu-button" class="text-text-light hover:text-foliage-vibrant">
                <i class="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div id="mobile-menu" class="hidden md:hidden border-t border-flame-burnt/40">
          <div class="px-4 pt-2 pb-4 space-y-2">
            <a href="#about" class="block py-2 text-text-light hover:text-foliage-vibrant transition-colors">
              About
            </a>
            <a href="#cafe" class="block py-2 text-text-light hover:text-foliage-vibrant transition-colors">
              Workshop Café
            </a>
            <a href="#studio" class="block py-2 text-text-light hover:text-foliage-vibrant transition-colors">
              Studio
            </a>
            <a href="#promise" class="block py-2 text-text-light hover:text-foliage-vibrant transition-colors">
              Promise
            </a>
            <a href="#contact" class="block py-3 bg-flame-fierce text-text-light text-center rounded-md font-semibold hover:bg-flame-burnt transition-all">
              Book a Session
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" class="pt-24 pb-12 px-4 bg-foliage-dark">
        <div class="max-w-7xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-display font-bold text-foliage-vibrant mb-6">
            A NEW HOME FOR SOUND ON COWLEY ROAD
          </h1>
          <p class="text-xl md:text-2xl text-text-light mb-8 max-w-3xl mx-auto">
            A professional recording studio built from a 50-year legacy — rebuilt by hand, powered by community, and finished properly.
          </p>
          
          {/* Hero CTAs */}
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="bg-flame-fierce text-text-light px-8 py-4 rounded-md font-semibold text-lg hover:bg-flame-burnt transition-all duration-200 shadow-lg">
              <i class="fas fa-microphone-alt mr-2"></i>
              BOOK A SESSION
            </a>
            <a href="#why-we-exist" class="border-2 border-flame-burnt text-flame-burnt px-8 py-4 rounded-md font-semibold text-lg hover:bg-flame-burnt hover:text-foliage-dark transition-all duration-200">
              Why This Studio Exists →
            </a>
          </div>
        </div>
      </section>

      {/* Why We Exist Section - NEW */}
      <section id="why-we-exist" class="py-20 px-4 bg-gradient-to-b from-foliage-dark to-black">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-foliage-vibrant mb-8 text-center">
            WHY COWLEY ROAD STUDIOS EXISTS
          </h2>
          <div class="prose prose-lg max-w-none text-text-light space-y-6">
            <p class="text-xl leading-relaxed">
              When Soundworks closed, Oxford didn't just lose a studio — it lost decades of knowledge, relationships, and cultural memory.
            </p>
            <p class="text-xl leading-relaxed">
              Cowley Road Studios exists because that loss mattered.
            </p>
            <p class="text-xl leading-relaxed">
              Built by the same people who kept Soundworks alive for over 20 years, this studio is our answer: a modern, professional space rooted in analogue craft, community values, and hard-earned experience.
            </p>
            <p class="text-xl leading-relaxed">
              This isn't a vanity project. It's infrastructure — rebuilt carefully, so artists, producers, and voices in Oxford still have a place to work properly.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="py-20 px-4 bg-foliage-dark/50">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-flame-burnt mb-8 text-center">
            WHAT WE DO
          </h2>
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="bg-foliage-dark/80 rounded-lg p-6 border border-foliage-vibrant/30">
              <i class="fas fa-record-vinyl text-4xl text-flame-fierce mb-4"></i>
              <h3 class="text-xl font-display text-foliage-vibrant mb-3">Recording & Production</h3>
              <p class="text-text-light">
                Professional recording in a calm, well-built space — from demos to full projects.
              </p>
            </div>
            <div class="bg-foliage-dark/80 rounded-lg p-6 border border-foliage-vibrant/30">
              <i class="fas fa-podcast text-4xl text-flame-fierce mb-4"></i>
              <h3 class="text-xl font-display text-foliage-vibrant mb-3">Podcasting & Voice</h3>
              <p class="text-text-light">
                Clean, controlled sound for podcasts, narration, and spoken-word work.
              </p>
            </div>
            <div class="bg-foliage-dark/80 rounded-lg p-6 border border-foliage-vibrant/30">
              <i class="fas fa-sliders-h text-4xl text-flame-fierce mb-4"></i>
              <h3 class="text-xl font-display text-foliage-vibrant mb-3">Mixing & Support</h3>
              <p class="text-text-light">
                Hands-on help from engineers who care about getting it right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Café Section */}
      <section id="cafe" class="py-20 px-4 bg-black">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-flame-burnt mb-8 text-center">
            <i class="fas fa-mug-hot text-flame-fierce mr-3"></i>
            Workshop Café
          </h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-2xl font-display font-semibold text-foliage-vibrant mb-4">
                Day Space. Night Venue.
              </h3>
              <p class="text-lg text-text-light mb-4">
                By day: A coworking space for creators, with quality coffee and a desk when you need one.
              </p>
              <p class="text-lg text-text-light mb-4">
                By night: An intimate 45-60 capacity venue for live sessions, open mics, and community events.
              </p>
              <ul class="space-y-2 text-text-light mb-6">
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Free WiFi & Hot Desks</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Quality Coffee & Snacks</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Evening Performances</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Community Workshops</li>
              </ul>
              <a href="mailto:hello@cowleyroadstudios.com" class="inline-block bg-flame-burnt text-foliage-dark px-6 py-3 rounded-md font-semibold hover:bg-flame-fierce hover:text-text-light transition-all duration-200">
                <i class="fas fa-calendar-alt mr-2"></i>
                Explore Venue Hire
              </a>
            </div>
            <div class="bg-foliage-dark/80 rounded-lg p-8 text-center border border-foliage-vibrant/30">
              <i class="fas fa-store text-6xl text-foliage-vibrant mb-4"></i>
              <p class="text-text-light italic">Opening Spring 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section id="studio" class="py-20 px-4 bg-foliage-dark/50">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-flame-burnt mb-8 text-center">
            <i class="fas fa-microphone text-flame-fierce mr-3"></i>
            The Studio
          </h2>
          <div class="mb-12">
            <h3 class="text-2xl font-display font-semibold text-foliage-vibrant mb-6 text-center">
              Professional Infrastructure. Grassroots Access.
            </h3>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-foliage-dark/80 rounded-lg p-6 border border-foliage-vibrant/30">
                <h4 class="text-xl font-semibold text-foliage-vibrant mb-4">
                  <i class="fas fa-headphones mr-2"></i> Audio Excellence
                </h4>
                <ul class="space-y-2 text-text-light">
                  <li>• Dante networked audio system</li>
                  <li>• Kii Three + BXT monitoring</li>
                  <li>• Sphere DLX modeling microphones</li>
                  <li>• 5 isolated recording rooms</li>
                </ul>
              </div>
              <div class="bg-foliage-dark/80 rounded-lg p-6 border border-foliage-vibrant/30">
                <h4 class="text-xl font-semibold text-foliage-vibrant mb-4">
                  <i class="fas fa-video mr-2"></i> Video Integration
                </h4>
                <ul class="space-y-2 text-text-light">
                  <li>• NDI video streaming</li>
                  <li>• Multi-camera setups</li>
                  <li>• Live session recording</li>
                  <li>• Content creation ready</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Studio CTA */}
          <div class="text-center mt-12">
            <p class="text-text-light/90 italic mb-4">
              All bookings include an engineer. Friendly for first-timers. Flexible for professionals.
            </p>
            <p class="text-foliage-vibrant font-semibold text-2xl mb-6">
              £35/ph <span class="text-text-light/70 text-lg line-through ml-2">£45/ph</span>
            </p>
            <a href="https://app.squareup.com/appointments/book/5f88zzreivvg8j/L9RPJZW999RE7/start" target="_blank" rel="noopener noreferrer" class="inline-block bg-flame-fierce text-text-light px-8 py-4 rounded-md font-semibold text-lg hover:bg-flame-burnt transition-all duration-200 shadow-lg">
              <i class="fas fa-microphone-alt mr-2"></i>
              Book a Session
            </a>
          </div>
        </div>
      </section>

      {/* Grassroots Promise Section */}
      <section id="promise" class="py-20 px-4 bg-black">
        <div class="max-w-4xl mx-auto">
          <div class="bg-foliage-dark border-2 border-foliage-vibrant rounded-lg p-8 md:p-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold mb-6 text-center text-foliage-vibrant">
              <i class="fas fa-heart text-flame-fierce mr-3"></i>
              Our Grassroots Promise
            </h2>
            <p class="text-lg md:text-xl leading-relaxed text-center mb-8 text-text-light">
              We ring-fence at least <strong class="text-flame-burnt">15% of monthly bookable studio time</strong> for 
              subsidised sessions for grassroots artists, young people (16-25), and community projects.
            </p>
            <div class="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div class="text-3xl font-bold text-flame-fierce mb-2">15%</div>
                <div class="text-sm text-text-light">Subsidised Hours</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-flame-fierce mb-2">£0-£15</div>
                <div class="text-sm text-text-light">Grassroots Rate</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-flame-fierce mb-2">No</div>
                <div class="text-sm text-text-light">Gatekeeping</div>
              </div>
            </div>
          </div>
          
          {/* Promise CTA */}
          <div class="text-center mt-8">
            <a href="#contact" class="inline-block bg-flame-burnt text-foliage-dark px-8 py-4 rounded-md font-semibold text-lg hover:bg-flame-fierce hover:text-text-light transition-all duration-200 shadow-lg">
              <i class="fas fa-clipboard-list mr-2"></i>
              Join Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Contact/Booking Section */}
      <section id="contact" class="py-20 px-4 bg-foliage-dark/50">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-flame-burnt mb-8 text-center">
            Secure Your Launch Credit
          </h2>
          <p class="text-xl text-center text-text-light mb-12 max-w-3xl mx-auto">
            Lock in 2026 rates now. Limited Christmas campaign vouchers available.
          </p>
          
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            {/* 2-Hour Voucher (was 3-Hour) */}
            <div class="bg-foliage-dark/80 rounded-lg p-8 border-2 border-flame-burnt shadow-lg">
              <div class="text-center mb-6">
                <h3 class="text-2xl font-display font-bold text-foliage-vibrant mb-2">2-Hour Session</h3>
                <div class="text-5xl font-bold text-flame-fierce mb-2">£70</div>
                <div class="text-sm text-text-light/70 line-through">Regular: £105</div>
                <div class="text-lg font-semibold text-flame-burnt mt-2">Save £35</div>
              </div>
              <ul class="space-y-2 text-text-light mb-6">
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> 2 studio hours</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> 2026 rate locked</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Valid 12 months</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Transferable</li>
              </ul>
              <a href="https://buy.stripe.com/eVq7sKdGp2MebDg000" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="block w-full bg-flame-fierce text-text-light py-3 rounded-md font-semibold hover:bg-flame-burnt transition-all text-center">
                Purchase Voucher
              </a>
            </div>

            {/* 6-Hour Voucher */}
            <div class="bg-foliage-dark/80 rounded-lg p-8 border-2 border-foliage-vibrant shadow-lg transform md:scale-105">
              <div class="bg-flame-fierce text-text-light text-xs font-bold py-1 px-3 rounded-full inline-block mb-4">
                BEST VALUE
              </div>
              <div class="text-center mb-6">
                <h3 class="text-2xl font-display font-bold text-foliage-vibrant mb-2">6-Hour Voucher</h3>
                <div class="text-5xl font-bold text-foliage-vibrant mb-2">£130</div>
                <div class="text-sm text-text-light/70 line-through">Regular: £210</div>
                <div class="text-lg font-semibold text-flame-burnt mt-2">Save £80</div>
              </div>
              <ul class="space-y-2 text-text-light mb-6">
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> 6 studio hours</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> 2026 rate locked</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Valid 12 months</li>
                <li><i class="fas fa-check text-foliage-vibrant mr-2"></i> Transferable</li>
              </ul>
              <a href="#contact" 
                 class="block w-full bg-foliage-vibrant text-foliage-dark py-3 rounded-md font-semibold hover:bg-flame-burnt hover:text-text-light transition-all text-center">
                Contact for 6-Hour Deal
              </a>
            </div>
          </div>

          {/* Crowdfunder Link */}
          <div class="text-center">
            <p class="text-lg text-text-light mb-4">
              Or support the build directly:
            </p>
            <a href="https://www.crowdfunder.co.uk/p/cowley-road-studios" 
               target="_blank" 
               rel="noopener noreferrer"
               class="inline-block bg-foliage-vibrant text-foliage-dark px-8 py-3 rounded-md font-semibold hover:bg-flame-fierce hover:text-text-light transition-all">
              <i class="fas fa-hand-holding-heart mr-2"></i>
              Back the Crowdfunder
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-black border-t border-foliage-vibrant/30 text-text-light py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-display font-bold mb-4 text-foliage-vibrant">Cowley Road Studios</h3>
              <p class="text-sm text-text-light/90">
                Built with care on Cowley Road.
              </p>
            </div>
            <div>
              <h4 class="font-semibold mb-4 text-flame-burnt">Quick Links</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#about" class="text-text-light/90 hover:text-foliage-vibrant transition-colors">About</a></li>
                <li><a href="#cafe" class="text-text-light/90 hover:text-foliage-vibrant transition-colors">Workshop Café</a></li>
                <li><a href="#studio" class="text-text-light/90 hover:text-foliage-vibrant transition-colors">The Studio</a></li>
                <li><a href="#promise" class="text-text-light/90 hover:text-foliage-vibrant transition-colors">Grassroots Promise</a></li>
                <li><a href="#contact" class="text-text-light/90 hover:text-foliage-vibrant transition-colors">Secure Launch Credit</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4 text-flame-burnt">Location</h4>
              <p class="text-sm text-text-light/90">
                118 Cowley Road<br />
                Oxford<br />
                OX4 1JE
              </p>
            </div>
          </div>
          <div class="border-t border-text-light/20 pt-8 text-center text-sm text-text-light/70">
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

// Booking Success Page Route
app.get('/booking-success', (c) => {
  return c.render(
    <>
      <div class="min-h-screen flex items-center justify-center px-4 py-20">
        <div class="max-w-2xl w-full text-center">
          {/* Success Icon */}
          <div class="mb-8">
            <i class="fas fa-check-circle text-olive text-8xl"></i>
          </div>
          
          {/* Headline */}
          <h1 class="text-5xl md:text-7xl font-display font-bold text-olive mb-4 uppercase tracking-wide">
            SESSION CONFIRMED
          </h1>
          
          {/* Subhead */}
          <p class="text-2xl md:text-3xl font-display text-mustard mb-8">
            Your time is locked in.
          </p>
          
          {/* Body Content */}
          <div class="bg-sage/20 rounded-lg p-8 mb-8 text-left">
            <p class="text-lg text-charcoal leading-relaxed mb-4">
              Thanks for booking with Cowley Road Studios. You should receive a confirmation email from Square shortly with your booking details.
            </p>
            <p class="text-lg text-charcoal leading-relaxed mb-4">
              Please arrive <strong class="text-mustard">15 minutes before</strong> your session start time.
            </p>
            <div class="mt-6 pt-6 border-t border-mustard/40">
              <p class="text-charcoal/95 mb-2">
                <i class="fas fa-map-marker-alt text-mustard mr-2"></i>
                <strong>Location:</strong>
              </p>
              <p class="text-charcoal text-lg">
                118 Cowley Road<br/>
                Oxford<br/>
                OX4 1JE
              </p>
            </div>
          </div>
          
          {/* Back to Home Button */}
          <a 
            href="/" 
            class="inline-block bg-mustard text-charcoal px-8 py-4 rounded-md font-semibold text-lg hover:bg-olive hover:text-charcoal transition-all duration-200 shadow-lg"
          >
            <i class="fas fa-home mr-2"></i>
            Back to Home
          </a>
        </div>
      </div>
    </>
  )
})

export default app
