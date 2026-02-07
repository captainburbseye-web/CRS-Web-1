import { useState, useEffect } from 'hono/jsx'

export const SignageLoop = () => {
  // CONFIGURATION
  const SLIDE_DURATION = 8000  // 8 Seconds per slide
  const FADE_DURATION = 500    // 0.5s transition

  // STATE
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // THE PLAYLIST - NOUNS AND VERBS (NOT VIBES)
  // Clear, functional copy based on UK studio signage standards
  const playlist = [
    { 
      id: 'ch1',
      service: 'BAND REHEARSAL',
      details: [
        'Full Backline Provided',
        'Drum Kit & Amps Included',
        'Ground Floor Load-in'
      ],
      cta: 'OPEN 7 DAYS',
      img: '/static/machined-assets/cowley-rehearsal-optimized.webp',
      color: '#F9E400', // Yellow
      textClass: 'text-[#F9E400]',
      bgClass: 'bg-[#F9E400]',
      borderClass: 'border-[#F9E400]'
    },
    { 
      id: 'ch8',
      service: 'JAM SPACE',
      details: [
        'Plug & Play Practice',
        'Instant Online Booking',
        'Soundproof & Air Con'
      ],
      cta: 'FROM £12 / HOUR',
      img: '/static/machined-assets/cricket-rehearsal-magenta-optimized.webp',
      color: '#F6287D', // Magenta
      textClass: 'text-[#F6287D]',
      bgClass: 'bg-[#F6287D]',
      borderClass: 'border-[#F6287D]'
    },
    { 
      id: 'ch2',
      service: 'PRODUCTION SUITE',
      details: [
        'Vocal Booth & Control Room',
        'Universal Audio / Logic / Ableton',
        'Perfect for Vocals & Mixing'
      ],
      cta: 'DRY HIRE AVAILABLE',
      img: '/static/machined-assets/cricket-control-room-optimized.webp',
      color: '#00CAFF', // Cyan
      textClass: 'text-[#00CAFF]',
      bgClass: 'bg-[#00CAFF]',
      borderClass: 'border-[#00CAFF]'
    },
    { 
      id: 'ch4',
      service: 'WORKSHOP CAFÉ',
      details: [
        'Specialty Coffee & Food',
        'Co-Working Space',
        'Creative Community Hub'
      ],
      cta: 'OPEN TO PUBLIC',
      img: '/static/machined-assets/workshop-cafe-optimized.webp',
      color: '#FFB627', // Amber
      textClass: 'text-[#FFB627]',
      bgClass: 'bg-[#FFB627]',
      borderClass: 'border-[#FFB627]'
    },
    { 
      id: 'ch3',
      service: 'PODCAST STUDIO',
      details: [
        '4x Shure SM7B Mics',
        '4K Multi-Cam Video',
        'Acoustically Treated'
      ],
      cta: 'RECORD & EDIT HERE',
      img: 'https://pub-cf83109acdfe4a0fbecf1fb8fc73f559.r2.dev/pod%20rack%20ui%20.png',
      color: '#F9E400', // Yellow/Charcoal
      textClass: 'text-[#F9E400]',
      bgClass: 'bg-[#F9E400]',
      borderClass: 'border-[#F9E400]'
    }
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
      
      {/* 1. BACKGROUND IMAGE (The Vibe - Keep the cool gear aesthetic) */}
      <div 
        class={`
          absolute inset-0 
          transition-opacity duration-500 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <img 
          src={currentSlide.img} 
          alt={currentSlide.service}
          class="w-full h-full object-cover opacity-60"
        />
        {/* Grain Overlay */}
        <div class="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* 2. BURN-IN PROTECTION (Pixel Shift) */}
      <div class="absolute inset-0 animate-pixelShift flex items-center justify-end pr-16">
        
        {/* 3. THE INFO-HUD (The Utility - NOUNS AND VERBS) */}
        <div 
          class={`
            w-[45%] bg-black/85 backdrop-blur-md border-l-8 p-12 shadow-2xl
            flex flex-col justify-center gap-6
            transition-all duration-500 transform
            ${currentSlide.borderClass}
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
          `}
        >
          
          {/* SERVICE TITLE (The What) */}
          <h1 
            class={`text-7xl font-black italic uppercase tracking-tighter ${currentSlide.textClass}`}
            style={`text-shadow: 0 0 30px ${currentSlide.color}80;`}
          >
            {currentSlide.service}
          </h1>

          {/* FEATURES LIST (The Detail) */}
          <ul class="space-y-4">
            {currentSlide.details.map((item, i) => (
              <li key={i} class="text-3xl font-bold tracking-wide flex items-center gap-3">
                <span 
                  class={`w-3 h-3 rounded-full ${currentSlide.bgClass}`}
                  style={`box-shadow: 0 0 10px ${currentSlide.color};`}
                ></span>
                <span class="text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          {/* CALL TO ACTION (The Action) */}
          <div 
            class={`
              mt-8 text-4xl font-black text-black py-4 px-6 text-center 
              uppercase tracking-widest ${currentSlide.bgClass}
            `}
            style={`box-shadow: 0 0 20px ${currentSlide.color}80;`}
          >
            {currentSlide.cta}
          </div>

          {/* BOOKING URL (Always Visible) */}
          <div class="mt-6 pt-6 border-t border-white/20">
            <p class="text-xl font-bold text-white/70 tracking-wider text-center">
              COWLEYROADSTUDIOS.COM
            </p>
          </div>

        </div>
      </div>

      {/* 4. PROGRESS BAR */}
      <div class="absolute bottom-0 left-0 h-2 bg-white/20 w-full">
        <div 
          key={currentIndex}
          class={`h-full origin-left animate-progress ${currentSlide.bgClass}`}
          style={`animation-duration: ${SLIDE_DURATION}ms;`}
        />
      </div>

    </div>
  )
}
