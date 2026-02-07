/**
 * CH4 WORKSHOP CAFÉ — Elite Ghost Chassis Signage Component
 * 
 * 5-Layer Architecture:
 * Layer 1: Analog Heartbeat (Rear Ambience)
 * Layer 2: The Portal (Asset Window)
 * Layer 3: Nature Distilled Filter (Grain Texture)
 * Layer 4: The Interface (UI Overlay)
 * Layer 5: Interaction Hitbox (Navigation)
 * 
 * Color: Amber #D4A574 (Nature Pulse)
 * Asset: Workshop Café Master (R2 Optimized 169KB WebP)
 */

export const WorkshopCafe = () => (
  <div class="relative w-full h-full group overflow-hidden rounded-xl bg-[#23263a]">
    
    {/* LAYER 1: The Analog Heartbeat (Rear Ambience) */}
    {/* Warm Amber/Clay glow that breathes behind the glass */}
    <div class="absolute inset-0 bg-amber-700/30 blur-3xl animate-pulse-slow mix-blend-screen" />

    {/* LAYER 2: The Portal (Asset) */}
    {/* Production-optimized WebP asset (169KB) */}
    <img 
      src="/static/machined-assets/workshop-cafe-optimized.webp"
      alt="Workshop Café - Analog Community Space"
      class="relative z-10 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
      loading="lazy"
    />

    {/* LAYER 3: Nature Distilled Filter (Texture) */}
    {/* Organic grain overlay for machined aesthetic */}
    <div 
      class="absolute inset-0 z-20 pointer-events-none opacity-10 mix-blend-overlay"
      style={{ filter: 'url(#organic-grain-filter)' }}
    />

    {/* LAYER 4: The Interface (UI Overlay) */}
    <div class="absolute z-30 inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40">
      
      {/* Top Label */}
      <div class="flex justify-between items-start">
        <span class="font-mono text-amber-200 text-xs tracking-widest border border-amber-500/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
          CH4 · ANALOG REST
        </span>
        {/* Status Light (Amber Heartbeat) */}
        <div class="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b] animate-pulse" />
      </div>

      {/* Bottom Kinetic Typography */}
      <div>
        <h2 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 drop-shadow-lg font-display uppercase tracking-tighter">
          WORKSHOP<br/>CAFÉ
        </h2>
        <p class="font-mono text-amber-100/80 text-sm mt-2 flex items-center gap-2">
          <span>☕</span> COWLEY ROAD · OXFORD
        </p>
      </div>
    </div>

    {/* LAYER 5: Interaction Hitbox */}
    <a 
      href="/cafe" 
      class="absolute inset-0 z-40 cursor-pointer"
      aria-label="Visit Workshop Café · 118 Cowley Road"
      title="Workshop Café - Creative Community Space"
    />
  </div>
)
