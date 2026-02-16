import { html } from 'hono/html'

export const MasterBus = () => (
  <div class="relative w-full h-full group overflow-hidden rounded-xl bg-[#23263a] signage-module" data-channel="7">
    
    {/* LAYER 1: Rear Ambience (Neon Green Pulse) */}
    <div class="absolute inset-0 bg-green-700/30 blur-3xl animate-pulse-slow mix-blend-screen" />

    {/* LAYER 2: Asset (Rack Faceplate with VU Meters & Power Switch) */}
    <img
      src="/static/machined-assets/master-bus-ch7-optimized.webp"
      alt="Master Bus - System Status and Power"
      class="relative z-10 w-full h-full object-cover opacity-90"
      loading="lazy"
    />

    {/* LAYER 3: Nature Distilled Filter (Grain Overlay) */}
    <div class="absolute inset-0 z-20 pointer-events-none bg-[url('/static/noise.png')] opacity-10 mix-blend-overlay" />

    {/* LAYER 4: UI Overlay */}
    <div class="absolute z-30 inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40">
      
      {/* Top Label & Status LED */}
      <div class="flex justify-between items-start">
        <span class="font-mono text-green-200 text-xs tracking-widest border border-green-500/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
          CH7 · MASTER BUS
        </span>
        {/* System Status LED */}
        <div class="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_#2CFF05] animate-pulse" title="System Healthy" />
      </div>

      {/* Main Content: Kinetic Title, VU Meters, Power Switch */}
      <div>
        <h2 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-green-500 drop-shadow-lg font-display uppercase tracking-tighter kinetic-title oxford-flicker">
          SYSTEM STATUS
        </h2>
        <div class="flex gap-4 mt-4">
          {/* VU Meter SVGs (Animated Needles) */}
          <VU_Meter label="NETWORK A" />
          <VU_Meter label="NETWORK B" />
        </div>
        <div class="flex items-center gap-3 mt-4">
          {/* Power Switch (Glowing) */}
          <div class="power-switch h-8 w-8 rounded-full bg-green-500 animate-ledPulse shadow-[0_0_24px_#2CFF05]" title="Main Power" />
          <span class="font-mono text-green-100/80 text-sm">MAIN POWER</span>
        </div>
      </div>
    </div>

    {/* LAYER 5: Interaction Hitbox */}
    <a
      href="/status"
      class="absolute inset-0 z-40 cursor-pointer"
      aria-label="View System Status"
    />
  </div>
)

// --- VU Meter SVG Component (Animated) ---
const VU_Meter = ({ label }: { label: string }) => (
  <div class="flex flex-col items-center">
    <svg width="64" height="48" viewBox="0 0 64 48" class="mb-1">
      {/* Meter Arc */}
      <path d="M8 40 A24 24 0 0 1 56 40" fill="none" stroke="#fff" stroke-width="2"/>
      {/* Danger Zone */}
      <path d="M44 40 A12 12 0 0 1 56 40" fill="none" stroke="#F9E400" stroke-width="3"/>
      {/* Needle (Animated) */}
      <g>
        <line
          x1="32" y1="40"
          x2="32" y2="16"
          class="vu-meter-needle"
          stroke="#2CFF05"
          stroke-width="3"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 32 40"
            to="-30 32 40"
            dur="1.2s"
            repeatCount="indefinite"
            values="0 32 40; -30 32 40; 10 32 40; 0 32 40"
            keyTimes="0;0.4;0.7;1"
          />
        </line>
      </g>
    </svg>
    <span class="font-mono text-green-200 text-xs tracking-wide">{label}</span>
  </div>
)
