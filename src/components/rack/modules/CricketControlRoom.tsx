/**
 * CH2 CRICKET CONTROL ROOM — Elite Ghost Chassis Signage Component
 * 
 * 5-Layer Architecture:
 * Layer 1: Neon Cyan Precision (Rear Ambience)
 * Layer 2: The Portal (Asset Window)
 * Layer 3: Technical Grain Filter (Texture)
 * Layer 4: The Interface (UI Overlay)
 * Layer 5: Interaction Hitbox (Navigation)
 * 
 * Color: Neon Cyan #00FFFF (Precision Cold)
 * Asset: Cricket Control Room Master (29KB WebP)
 */

export const CricketControlRoom = () => (
  <div class="relative w-full h-full group overflow-hidden rounded-xl bg-[#23263a]">
    
    {/* LAYER 1: Neon Cyan Precision (Rear Ambience) */}
    <div class="absolute inset-0 bg-cyan-500/30 blur-3xl animate-pulse-slow mix-blend-screen" />

    {/* LAYER 2: The Portal (Asset) */}
    <img 
      src="/static/machined-assets/cricket-control-room-optimized.webp"
      alt="Cricket Road Control Room"
      class="relative z-10 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
      loading="lazy"
    />

    {/* LAYER 3: Technical Grain Filter (Texture) */}
    <div 
      class="absolute inset-0 z-20 pointer-events-none opacity-10 mix-blend-overlay"
      style={{ filter: 'url(#organic-grain-filter)' }}
    />

    {/* LAYER 4: The Interface (UI Overlay) */}
    <div class="absolute z-30 inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40">
      
      {/* Top Label */}
      <div class="flex justify-between items-start">
        <span class="font-mono text-cyan-200 text-xs tracking-widest border border-cyan-500/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
          CH2 · CONTROL ROOM
        </span>
        {/* Status Light (Cyan Pulse) */}
        <div class="h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-pulse" />
      </div>

      {/* Bottom Kinetic Typography */}
      <div>
        <h2 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-500 drop-shadow-lg font-display uppercase tracking-tighter">
          CONTROL<br/>ROOM
        </h2>
        <p class="font-mono text-cyan-100/80 text-sm mt-2 flex items-center gap-2">
          <span>🎛️</span> CRICKET ROAD
        </p>
      </div>
    </div>

    {/* LAYER 5: Interaction Hitbox */}
    <a 
      href="https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services" 
      class="absolute inset-0 z-40 cursor-pointer"
      aria-label="Book Cricket Road Control Room · No engineer included"
      title="Cricket Road Control Room - Book Now"
      rel="noopener noreferrer"
    />
  </div>
)
