/**
 * CH1 COWLEY REHEARSAL — Elite Ghost Chassis Signage Component
 * 
 * 5-Layer Architecture:
 * Layer 1: Warm Analog Pulse (Rear Ambience)
 * Layer 2: The Portal (Asset Window)
 * Layer 3: Analog Grain Filter (Texture)
 * Layer 4: The Interface (UI Overlay)
 * Layer 5: Interaction Hitbox (Navigation)
 * 
 * Color: Mustard Yellow #FFDB58 (Warm Analog)
 * Asset: Cowley Rehearsal Master (56KB WebP)
 */

export const CowleyRehearsal = () => (
  <div class="relative w-full h-full group overflow-hidden rounded-xl bg-[#23263a]">
    
    {/* LAYER 1: Warm Analog Pulse (Rear Ambience) */}
    <div class="absolute inset-0 bg-yellow-500/30 blur-3xl animate-pulse-slow mix-blend-screen" />

    {/* LAYER 2: The Portal (Asset) */}
    <img 
      src="/static/machined-assets/cowley-rehearsal-optimized.webp"
      alt="Cowley Road Rehearsal Studio"
      class="relative z-10 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
      loading="lazy"
    />

    {/* LAYER 3: Analog Grain Filter (Texture) */}
    <div 
      class="absolute inset-0 z-20 pointer-events-none opacity-10 mix-blend-overlay"
      style={{ filter: 'url(#organic-grain-filter)' }}
    />

    {/* LAYER 4: The Interface (UI Overlay) */}
    <div class="absolute z-30 inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40">
      
      {/* Top Label */}
      <div class="flex justify-between items-start">
        <span class="font-mono text-yellow-200 text-xs tracking-widest border border-yellow-500/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
          CH1 · REHEARSAL
        </span>
        {/* Status Light (Yellow Pulse) */}
        <div class="h-3 w-3 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308] animate-pulse" />
      </div>

      {/* Bottom Kinetic Typography */}
      <div>
        <h2 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-yellow-500 drop-shadow-lg font-display uppercase tracking-tighter">
          COWLEY<br/>REHEARSAL
        </h2>
        <p class="font-mono text-yellow-100/80 text-sm mt-2 flex items-center gap-2">
          <span>🎸</span> 118 COWLEY ROAD
        </p>
      </div>
    </div>

    {/* LAYER 5: Interaction Hitbox */}
    <a 
      href="https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services" 
      class="absolute inset-0 z-40 cursor-pointer"
      aria-label="Book Cowley Road Rehearsal · £45 / 2 hours"
      title="Cowley Road Rehearsal - Book Now"
      rel="noopener noreferrer"
    />
  </div>
)
