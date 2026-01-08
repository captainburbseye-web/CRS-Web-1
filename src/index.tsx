import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      {/* Navigation Header */}
      <nav class="fixed top-0 left-0 right-0 bg-cream/95 backdrop-blur-sm border-b border-olive/20 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <div class="flex-shrink-0">
              <a href="#hero" class="text-xl font-display font-bold text-olive">
                Cowley Road Studios
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#about" class="text-charcoal hover:text-olive transition-colors duration-200">
                About
              </a>
              <a href="#cafe" class="text-charcoal hover:text-olive transition-colors duration-200">
                Workshop Café
              </a>
              <a href="#studio" class="text-charcoal hover:text-olive transition-colors duration-200">
                Studio
              </a>
              <a href="#promise" class="text-charcoal hover:text-olive transition-colors duration-200">
                Promise
              </a>
              <a href="#contact" class="bg-mustard text-charcoal px-6 py-2 rounded-md font-semibold hover:bg-olive hover:text-cream transition-all duration-200">
                Secure Launch Credit
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div class="md:hidden">
              <button id="mobile-menu-button" class="text-charcoal hover:text-olive">
                <i class="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div id="mobile-menu" class="hidden md:hidden border-t border-olive/20">
          <div class="px-4 pt-2 pb-4 space-y-2">
            <a href="#about" class="block py-2 text-charcoal hover:text-olive transition-colors">
              About
            </a>
            <a href="#cafe" class="block py-2 text-charcoal hover:text-olive transition-colors">
              Workshop Café
            </a>
            <a href="#studio" class="block py-2 text-charcoal hover:text-olive transition-colors">
              Studio
            </a>
            <a href="#promise" class="block py-2 text-charcoal hover:text-olive transition-colors">
              Promise
            </a>
            <a href="#contact" class="block py-3 bg-mustard text-charcoal text-center rounded-md font-semibold hover:bg-olive hover:text-cream transition-all">
              Secure Launch Credit
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" class="pt-24 pb-12 px-4">
        <div class="max-w-7xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-display font-bold text-olive mb-6">
            Where Sound, Vision & Community Find Their Home
          </h1>
          <p class="text-xl md:text-2xl text-espresso mb-8 max-w-3xl mx-auto">
            Professional-grade recording infrastructure. Grassroots pricing. No gatekeeping.
          </p>
          
          {/* Metrics Strip */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div class="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-olive/20">
              <div class="text-4xl font-display font-bold text-mustard mb-2">20+</div>
              <div class="text-sm text-espresso">Years Legacy</div>
            </div>
            <div class="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-olive/20">
              <div class="text-4xl font-display font-bold text-mustard mb-2">200+</div>
              <div class="text-sm text-espresso">Artists Served</div>
            </div>
            <div class="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-olive/20">
              <div class="text-4xl font-display font-bold text-mustard mb-2">£100k+</div>
              <div class="text-sm text-espresso">Studio Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="py-20 px-4 bg-white/30">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-olive mb-8 text-center">
            Abbey Road Polish × Cowley Road Heart
          </h2>
          <div class="prose prose-lg max-w-none text-charcoal">
            <p class="text-xl leading-relaxed mb-6">
              At 118 Cowley Road, Oxford, a new chapter begins for grassroots music. Cowley Road Studios 
              rises from the legacy of Soundworks Studio (est. 2004), bringing together professional-grade 
              recording facilities, a vibrant workshop café, and community-focused programming.
            </p>
            <p class="text-lg leading-relaxed">
              We're building more than a studio — we're creating an ecosystem where independent artists, 
              young musicians, and creative communities have access to world-class tools without the barriers.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Café Section */}
      <section id="cafe" class="py-20 px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-olive mb-8 text-center">
            <i class="fas fa-mug-hot text-mustard mr-3"></i>
            Workshop Café
          </h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-2xl font-display font-semibold text-espresso mb-4">
                Day Space. Night Venue.
              </h3>
              <p class="text-lg text-charcoal mb-4">
                By day: A coworking space for creators, with quality coffee and a desk when you need one.
              </p>
              <p class="text-lg text-charcoal mb-4">
                By night: An intimate 45-60 capacity venue for live sessions, open mics, and community events.
              </p>
              <ul class="space-y-2 text-charcoal">
                <li><i class="fas fa-check text-olive mr-2"></i> Free WiFi & Hot Desks</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Quality Coffee & Snacks</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Evening Performances</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Community Workshops</li>
              </ul>
            </div>
            <div class="bg-olive/10 rounded-lg p-8 text-center">
              <i class="fas fa-store text-6xl text-olive mb-4"></i>
              <p class="text-espresso italic">Opening Spring 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section id="studio" class="py-20 px-4 bg-white/30">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-olive mb-8 text-center">
            <i class="fas fa-microphone text-mustard mr-3"></i>
            The Studio
          </h2>
          <div class="mb-12">
            <h3 class="text-2xl font-display font-semibold text-espresso mb-6 text-center">
              Professional Infrastructure. Grassroots Access.
            </h3>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-white/50 rounded-lg p-6 border border-olive/20">
                <h4 class="text-xl font-semibold text-olive mb-4">
                  <i class="fas fa-headphones mr-2"></i> Audio Excellence
                </h4>
                <ul class="space-y-2 text-charcoal">
                  <li>• Dante networked audio system</li>
                  <li>• Kii Three + BXT monitoring</li>
                  <li>• Sphere DLX modeling microphones</li>
                  <li>• 5 isolated recording rooms</li>
                </ul>
              </div>
              <div class="bg-white/50 rounded-lg p-6 border border-olive/20">
                <h4 class="text-xl font-semibold text-olive mb-4">
                  <i class="fas fa-video mr-2"></i> Video Integration
                </h4>
                <ul class="space-y-2 text-charcoal">
                  <li>• NDI video streaming</li>
                  <li>• Multi-camera setups</li>
                  <li>• Live session recording</li>
                  <li>• Content creation ready</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grassroots Promise Section */}
      <section id="promise" class="py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-olive text-cream rounded-lg p-8 md:p-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              <i class="fas fa-heart text-mustard mr-3"></i>
              Our Grassroots Promise
            </h2>
            <p class="text-lg md:text-xl leading-relaxed text-center mb-8">
              We ring-fence at least <strong class="text-mustard">15% of monthly bookable studio time</strong> for 
              subsidised sessions for grassroots artists, young people (16-25), and community projects.
            </p>
            <div class="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div class="text-3xl font-bold text-mustard mb-2">15%</div>
                <div class="text-sm">Subsidised Hours</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-mustard mb-2">£0-£15</div>
                <div class="text-sm">Grassroots Rate</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-mustard mb-2">No</div>
                <div class="text-sm">Gatekeeping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Booking Section */}
      <section id="contact" class="py-20 px-4 bg-white/30">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-olive mb-8 text-center">
            Secure Your Launch Credit
          </h2>
          <p class="text-xl text-center text-espresso mb-12 max-w-3xl mx-auto">
            Lock in 2026 rates now. Limited Christmas campaign vouchers available.
          </p>
          
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            {/* 3-Hour Voucher */}
            <div class="bg-white rounded-lg p-8 border-2 border-mustard shadow-lg">
              <div class="text-center mb-6">
                <h3 class="text-2xl font-display font-bold text-olive mb-2">3-Hour Voucher</h3>
                <div class="text-5xl font-bold text-mustard mb-2">£70</div>
                <div class="text-sm text-espresso line-through">Regular: £105</div>
                <div class="text-lg font-semibold text-olive mt-2">Save £35</div>
              </div>
              <ul class="space-y-2 text-charcoal mb-6">
                <li><i class="fas fa-check text-olive mr-2"></i> 3 studio hours</li>
                <li><i class="fas fa-check text-olive mr-2"></i> 2026 rate locked</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Valid 12 months</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Transferable</li>
              </ul>
              <button class="w-full bg-mustard text-charcoal py-3 rounded-md font-semibold hover:bg-olive hover:text-cream transition-all">
                Buy 3-Hour Voucher
              </button>
            </div>

            {/* 6-Hour Voucher */}
            <div class="bg-white rounded-lg p-8 border-2 border-olive shadow-lg transform md:scale-105">
              <div class="bg-mustard text-charcoal text-xs font-bold py-1 px-3 rounded-full inline-block mb-4">
                BEST VALUE
              </div>
              <div class="text-center mb-6">
                <h3 class="text-2xl font-display font-bold text-olive mb-2">6-Hour Voucher</h3>
                <div class="text-5xl font-bold text-olive mb-2">£130</div>
                <div class="text-sm text-espresso line-through">Regular: £210</div>
                <div class="text-lg font-semibold text-mustard mt-2">Save £80</div>
              </div>
              <ul class="space-y-2 text-charcoal mb-6">
                <li><i class="fas fa-check text-olive mr-2"></i> 6 studio hours</li>
                <li><i class="fas fa-check text-olive mr-2"></i> 2026 rate locked</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Valid 12 months</li>
                <li><i class="fas fa-check text-olive mr-2"></i> Transferable</li>
              </ul>
              <button class="w-full bg-olive text-cream py-3 rounded-md font-semibold hover:bg-mustard hover:text-charcoal transition-all">
                Buy 6-Hour Voucher
              </button>
            </div>
          </div>

          {/* Crowdfunder Link */}
          <div class="text-center">
            <p class="text-lg text-charcoal mb-4">
              Or support the build directly:
            </p>
            <a href="https://www.crowdfunder.co.uk/p/cowley-road-studios" 
               target="_blank" 
               class="inline-block bg-charcoal text-cream px-8 py-3 rounded-md font-semibold hover:bg-olive transition-all">
              <i class="fas fa-hand-holding-heart mr-2"></i>
              Back Us on Crowdfunder
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-charcoal text-cream py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-display font-bold mb-4">Cowley Road Studios</h3>
              <p class="text-sm text-cream/80">
                Professional-grade recording infrastructure.<br />
                Grassroots pricing. No gatekeeping.
              </p>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#about" class="text-cream/80 hover:text-mustard transition-colors">About</a></li>
                <li><a href="#cafe" class="text-cream/80 hover:text-mustard transition-colors">Workshop Café</a></li>
                <li><a href="#studio" class="text-cream/80 hover:text-mustard transition-colors">Studio</a></li>
                <li><a href="#promise" class="text-cream/80 hover:text-mustard transition-colors">Grassroots Promise</a></li>
                <li><a href="#contact" class="text-cream/80 hover:text-mustard transition-colors">Book Now</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Location</h4>
              <p class="text-sm text-cream/80">
                118 Cowley Road<br />
                Oxford<br />
                OX4 1JE
              </p>
            </div>
          </div>
          <div class="border-t border-cream/20 pt-8 text-center text-sm text-cream/60">
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

export default app
