/**
 * CH4 WORKSHOP CAFÉ — 19" Rack Mount Unit (Mark II)
 * 
 * RETROFITTED: Now matches CH6/CH7 Master Bus aesthetic
 * 
 * Hardware Spec:
 * - 19-inch Rack Mount (EIA-310-D)
 * - 2U Height (3.5 inches / 88px)
 * - Brushed aluminum faceplate
 * - Rack ears with mounting holes
 * - Hospitality controller aesthetic
 * 
 * Controls:
 * - CAFÉ CONTROL power switch (center)
 * - Three rotary dials: ESPRESSO/STEAM/BREW (left)
 * - LCD display: "OPEN TO PUBLIC" (right)
 * 
 * Color: Neon Amber/Gold #FFC107
 * Asset: CH4 Rack Faceplate (53KB WebP, 1920×384, 5:1 ratio)
 */

export const WorkshopCafe = () => (
  <div class="rack-unit relative w-full group overflow-hidden bg-[#0a0a0a]">
    
    {/* RACK FACEPLATE: 19-inch 2U Module */}
    <img 
      src="/static/machined-assets/workshop-cafe-optimized.webp"
      alt="Workshop Café - Amber Identity"
      class="rack-faceplate w-full h-full object-cover"
      style="aspect-ratio: 5/1; min-height: 88px; max-height: 88px;"
      loading="lazy"
    />

    {/* INTERACTION HITBOX: CAFÉ CONTROL Switch (Center) */}
    <a 
      href="/cafe" 
      class="absolute z-40 cursor-pointer"
      style="
        left: 40%;
        top: 30%;
        width: 20%;
        height: 40%;
      "
      aria-label="Visit Workshop Café · Coffee & Coworking · Featuring local food pop-ups from our Cowley Road neighbours"
      title="CH4: CAFÉ CONTROL - Visit Now"
    />

    {/* Status LED (Amber) - Top Right Corner */}
    <div 
      class="absolute top-2 right-4 h-2 w-2 rounded-full bg-[#FFC107] shadow-[0_0_8px_#FFC107] animate-pulse z-30"
      aria-label="CH4 Status: Online"
    />
  </div>
)
