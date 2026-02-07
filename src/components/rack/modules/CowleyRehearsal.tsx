/**
 * CH1 COWLEY REHEARSAL — 19" Rack Mount Unit (Mark II)
 * 
 * RETROFITTED: Now matches CH6/CH7 Master Bus aesthetic
 * 
 * Hardware Spec:
 * - 19-inch Rack Mount (EIA-310-D)
 * - 2U Height (3.5 inches / 88px)
 * - Brushed aluminum faceplate
 * - Rack ears with mounting holes
 * - Guitar amp head aesthetic (Marshall/Mesa Boogie)
 * 
 * Controls:
 * - STUDIO POWER toggle switch (center)
 * - Analog VU meter (left)
 * - GUITAR IN jacks (right)
 * 
 * Color: Neon Yellow #F9E400
 * Asset: CH1 Rack Faceplate (51KB WebP, 1920×384, 5:1 ratio)
 */

export const CowleyRehearsal = () => (
  <div class="rack-unit relative w-full group overflow-hidden bg-[#0a0a0a]">
    
    {/* RACK FACEPLATE: 19-inch 2U Module */}
    <img 
      src="/static/machined-assets/cowley-rehearsal-ch1-rack.webp"
      alt="CH1 Cowley Rehearsal - 19 inch rack mount guitar amp head"
      class="rack-faceplate w-full h-full object-cover"
      style="aspect-ratio: 5/1; min-height: 88px; max-height: 88px;"
      loading="lazy"
    />

    {/* INTERACTION HITBOX: STUDIO POWER Toggle (Center) */}
    <a 
      href="https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services" 
      class="absolute z-40 cursor-pointer"
      style="
        left: 40%;
        top: 30%;
        width: 20%;
        height: 40%;
      "
      aria-label="Book Cowley Road Rehearsal · Full Backline · Open 7 Days"
      title="CH1: STUDIO POWER - Book Now"
      rel="noopener noreferrer"
    />

    {/* Status LED (Yellow) - Top Right Corner */}
    <div 
      class="absolute top-2 right-4 h-2 w-2 rounded-full bg-[#F9E400] shadow-[0_0_8px_#F9E400] animate-pulse z-30"
      aria-label="CH1 Status: Online"
    />
  </div>
)
