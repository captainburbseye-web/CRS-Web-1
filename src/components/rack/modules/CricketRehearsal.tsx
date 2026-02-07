/**
 * CH8 CRICKET REHEARSAL — 19" Rack Mount Unit (Mark II)
 * 
 * RETROFITTED: Now matches CH6/CH7 Master Bus aesthetic
 * 
 * Hardware Spec:
 * - 19-inch Rack Mount (EIA-310-D)
 * - 2U Height (3.5 inches / 88px)
 * - Brushed aluminum faceplate
 * - Rack ears with mounting holes
 * - Preamp aesthetic (Presonus/Focusrite)
 * 
 * Controls:
 * - JAM SPACE POWER switch (center)
 * - Three input gain knobs (left)
 * - Three XLR/TRS combo jacks (right)
 * 
 * Color: Neon Magenta #F6287D
 * Asset: CH8 Rack Faceplate (51KB WebP, 1920×384, 5:1 ratio)
 */

export const CricketRehearsal = () => (
  <div class="rack-unit relative w-full group overflow-hidden bg-[#0a0a0a]">
    
    {/* RACK FACEPLATE: 19-inch 2U Module */}
    <img 
      src="/static/machined-assets/cricket-rehearsal-ch8-rack.webp"
      alt="CH8 Cricket Rehearsal - 19 inch rack mount preamp"
      class="rack-faceplate w-full h-full object-cover"
      style="aspect-ratio: 5/1; min-height: 88px; max-height: 88px;"
      loading="lazy"
    />

    {/* INTERACTION HITBOX: JAM SPACE POWER Switch (Center) */}
    <a 
      href="https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX" 
      class="absolute z-40 cursor-pointer"
      style="
        left: 40%;
        top: 30%;
        width: 20%;
        height: 40%;
      "
      aria-label="Book Cricket Road Rehearsal · Plug & Play · From £12/hr"
      title="CH8: JAM SPACE POWER - Book Now"
      rel="noopener noreferrer"
    />

    {/* Status LED (Magenta) - Top Right Corner */}
    <div 
      class="absolute top-2 right-4 h-2 w-2 rounded-full bg-[#F6287D] shadow-[0_0_8px_#F6287D] animate-pulse z-30"
      aria-label="CH8 Status: Online"
    />
  </div>
)
