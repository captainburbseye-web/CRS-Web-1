/**
 * CH2 CRICKET CONTROL ROOM — 19" Rack Mount Unit (Mark II)
 * 
 * RETROFITTED: Now matches CH6/CH7 Master Bus aesthetic
 * 
 * Hardware Spec:
 * - 19-inch Rack Mount (EIA-310-D)
 * - 2U Height (3.5 inches / 88px)
 * - Brushed aluminum faceplate
 * - Rack ears with mounting holes
 * - Mixer/controller aesthetic (SSL/Neve)
 * 
 * Controls:
 * - PRODUCTION POWER switch (center)
 * - Four channel faders (left)
 * - 2×4 button matrix with LEDs (right)
 * 
 * Color: Neon Cyan #2DD4BF
 * Asset: CH2 Rack Faceplate (46KB WebP, 1920×384, 5:1 ratio)
 */

export const CricketControlRoom = () => (
  <div class="rack-unit relative w-full group overflow-hidden bg-[#0a0a0a]">
    
    {/* RACK FACEPLATE: 19-inch 2U Module */}
    <img 
      src="/static/machined-assets/cricket-control-room-optimized.webp"
      alt="Control Room - Cyan Identity"
      class="rack-faceplate w-full h-full object-cover"
      style="aspect-ratio: 5/1; min-height: 88px; max-height: 88px;"
      loading="lazy"
    />

    {/* INTERACTION HITBOX: PRODUCTION POWER Switch (Center) */}
    <a 
      href="https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services" 
      class="absolute z-40 cursor-pointer"
      style="
        left: 40%;
        top: 30%;
        width: 20%;
        height: 40%;
      "
      aria-label="Book Control Room · Vocal Booth · Logic · Ableton · Dry Hire"
      title="CH2: PRODUCTION POWER - Book Now"
      rel="noopener noreferrer"
    />

    {/* Status LED (Cyan) - Top Right Corner */}
    <div 
      class="absolute top-2 right-4 h-2 w-2 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] animate-pulse z-30"
      aria-label="CH2 Status: Online"
    />
  </div>
)
