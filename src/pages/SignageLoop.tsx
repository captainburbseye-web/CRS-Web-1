import { useState, useEffect } from 'hono/jsx'
import { CowleyRehearsal } from '../components/rack/modules/CowleyRehearsal'
import { CricketRehearsal } from '../components/rack/modules/CricketRehearsal'
import { CricketControlRoom } from '../components/rack/modules/CricketControlRoom'
import { WorkshopCafe } from '../components/rack/modules/WorkshopCafe'
import { MasterBus } from '../components/rack/modules/MasterBus'

export const SignageLoop = () => {
  // CONFIGURATION
  const SLIDE_DURATION = 10000 // 10 Seconds per module
  const FADE_DURATION = 500    // 0.5s transition

  // STATE
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // THE PLAYLIST (Order matters - this is the loop)
  // Updated with Info-HUD data for high-utility street display
  const playlist = [
    { 
      id: 'ch1', 
      component: <CowleyRehearsal />,
      serviceName: 'BAND REHEARSAL',
      features: 'Full Backline Included',
      cta: 'Open 7 Days',
      accentColor: '#FFDB58' // Yellow
    },
    { 
      id: 'ch8', 
      component: <CricketRehearsal />,
      serviceName: 'JAM SPACE',
      features: 'Plug & Play Practice',
      cta: 'From £12/hr',
      accentColor: '#FF00FF' // Magenta
    },
    { 
      id: 'ch2', 
      component: <CricketControlRoom />,
      serviceName: 'PRODUCTION SUITE',
      features: 'Vocal Booth & Mixing Desk',
      cta: 'For Producers',
      accentColor: '#00FFFF' // Cyan
    },
    { 
      id: 'ch4', 
      component: <WorkshopCafe />,
      serviceName: 'WORKSHOP CAFÉ',
      features: 'Specialty Coffee & Co-Working',
      cta: 'Open to Public',
      accentColor: '#FFD700' // Gold
    },
    { 
      id: 'ch3', 
      component: <MasterBus />,
      serviceName: 'PODCAST STUDIO',
      features: 'Pro Audio & Video Recording',
      cta: 'Instant Booking',
      accentColor: '#2CFF05' // System Green
    },
  ]

  // 1. CYCLE LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade Out
      setIsVisible(false)
      
      setTimeout(() => {
        // Switch Slide & Fade In
        setCurrentIndex((prev) => (prev + 1) % playlist.length)
        setIsVisible(true)
      }, FADE_DURATION)

    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [playlist.length])

  const currentSlide = playlist[currentIndex]

  return (
    <div class="w-screen h-screen bg-black overflow-hidden relative cursor-none">
      
      {/* 2. BURN-IN PROTECTION (Subtle Pixel Shift) */}
      <div class="w-full h-full animate-pixelShift">
        
        {/* 3. CENTERED STAGE */}
        <div class="flex items-center justify-center w-full h-full p-8">
          
          <div 
            class={`
              relative w-full max-w-5xl aspect-video 
              transition-opacity duration-500 ease-in-out
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
          >
            {/* BACKGROUND: RACK MODULE IMAGE */}
            <div class="absolute inset-0">
              {currentSlide.component}
            </div>

            {/* INFO-HUD OVERLAY: High-Contrast Information Box */}
            <div class="absolute inset-0 flex items-center justify-end p-12">
              <div 
                class="bg-black/80 backdrop-blur-sm border-l-8 p-8 max-w-xl"
                style={`border-color: ${currentSlide.accentColor}`}
              >
                {/* Service Name - Maximum Impact */}
                <h1 
                  class="text-7xl font-black tracking-tighter leading-none mb-4"
                  style={`
                    color: ${currentSlide.accentColor};
                    font-family: 'Impact', 'Oswald', 'Arial Black', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: -0.05em;
                    text-shadow: 0 0 20px ${currentSlide.accentColor}40;
                  `}
                >
                  {currentSlide.serviceName}
                </h1>

                {/* Features - Clear Utility */}
                <p class="text-3xl font-bold text-white/90 mb-6 tracking-wide">
                  {currentSlide.features}
                </p>

                {/* Call to Action / Key Info */}
                <div 
                  class="text-2xl font-bold px-6 py-3 inline-block"
                  style={`
                    background: ${currentSlide.accentColor}20;
                    border: 2px solid ${currentSlide.accentColor};
                    color: ${currentSlide.accentColor};
                  `}
                >
                  {currentSlide.cta}
                </div>

                {/* Booking URL (Always Visible) */}
                <div class="mt-8 pt-6 border-t border-white/20">
                  <p class="text-xl font-bold text-white/80 tracking-wider">
                    BOOK ONLINE @ COWLEYROADSTUDIOS.COM
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. PROGRESS BAR (Visual Timer) */}
      <div class="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
        <div 
          key={currentIndex} // Resets animation on change
          class="h-full origin-left animate-progress" 
          style={`
            background: ${currentSlide.accentColor};
            animation-duration: ${SLIDE_DURATION}ms;
          `}
        />
      </div>

    </div>
  )
}
