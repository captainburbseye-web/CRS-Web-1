/**
 * CH3 PODCAST STUDIO — 19" Rack Mount Unit (Mark II)
 * 
 * RETROFITTED: Now matches CH6/CH7 Master Bus aesthetic
 * 
 * Hardware Spec:
 * - 19-inch Rack Mount (EIA-310-D)
 * - 2U Height (3.5 inches / 88px)
 * - Brushed aluminum faceplate
 * - Rack ears with mounting holes
 * - Podcast interface aesthetic (RØDECaster/Zoom PodTrak)
 * 
 * Controls:
 * - PODCAST POWER switch (center)
 * - Four XLR mic inputs MIC 1-4 (left)
 * - Four headphone outputs HP OUT 1-4 with LEDs (right)
 * 
 * Color: Neon Gold/Bronze #D4AF37
 * Asset: CH3 Rack Faceplate (73KB WebP, 1920×384, 5:1 ratio)
 */

export const PodcastStudio = () => (
  <div class="rack-unit relative w-full group overflow-hidden bg-[#0a0a0a]">
    
    {/* RACK FACEPLATE: 19-inch 2U Module */}
    <img 
      src="/static/machined-assets/cowley-pods-ch3-rack.webp"
      alt="CH3 Podcast Studio - 19 inch rack mount podcast interface"
      class="rack-faceplate w-full h-full object-cover"
      style="aspect-ratio: 5/1; min-height: 88px; max-height: 88px;"
      loading="lazy"
    />

    {/* INTERACTION HITBOX: PODCAST POWER Switch (Center) */}
    <a 
      href="/book/pod1" 
      class="absolute z-40 cursor-pointer"
      style="
        left: 40%;
        top: 30%;
        width: 20%;
        height: 40%;
      "
      aria-label="Book Podcast Studio · 4 Mics · 4K Video · Acoustic Treatment · Record & Edit Here"
      title="CH3: PODCAST POWER - Book Now"
    />

    {/* Status LED (Gold) - Top Right Corner */}
    <div 
      class="absolute top-2 right-4 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse z-30"
      aria-label="CH3 Status: Online"
    />
  </div>
)
