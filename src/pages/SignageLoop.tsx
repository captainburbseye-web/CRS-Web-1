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
  const playlist = [
    { id: 'ch1', component: <CowleyRehearsal /> },
    { id: 'ch8', component: <CricketRehearsal /> },
    { id: 'ch2', component: <CricketControlRoom /> },
    { id: 'ch4', component: <WorkshopCafe /> },
    { id: 'ch7', component: <MasterBus /> }, // Footer/System Health
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

  return (
    <div class="w-screen h-screen bg-black overflow-hidden relative cursor-none">
      
      {/* 2. BURN-IN PROTECTION (Subtle Pixel Shift) */}
      <div class="w-full h-full animate-pixelShift">
        
        {/* 3. CENTERED STAGE */}
        <div class="flex items-center justify-center w-full h-full p-8">
          
          <div 
            class={`
              w-full max-w-5xl aspect-video 
              transition-opacity duration-500 ease-in-out
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
          >
            {/* RENDER ACTIVE MODULE */}
            {playlist[currentIndex].component}
          </div>

        </div>
      </div>

      {/* 4. PROGRESS BAR (Optional Visual Timer) */}
      <div class="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
        <div 
          key={currentIndex} // Resets animation on change
          class="h-full bg-green-500 origin-left animate-progress" 
          style={`animation-duration: ${SLIDE_DURATION}ms`}
        />
      </div>

    </div>
  )
}
