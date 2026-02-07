/**
 * COWLEY ROAD STUDIOS: STREET SIGNAGE BROADCAST
 * Route: /signage
 * Purpose: Full-screen digital signage for 55" street display
 * Architecture: Bento Grid + Ghost Chassis + Auto-Refresh
 * The 242nd Law: "When the street feels the pulse of the rack, 
 *                 the barrier between creator and community vanishes."
 */

import { useEffect, useState } from 'hono/jsx'

export const SignagePage = () => {
  return (
    <>
      {/* Full-Screen Container */}
      <div class="signage-container">
        {/* BENTO GRID: 2×2 Rack Module Layout */}
        <div class="signage-grid">
          
          {/* TOP LEFT: Cowley Road Rehearsal */}
          <div class="signage-module cowley-road" data-channel="1">
            <div class="module-chassis">
              {/* LAYER 1: Reactive Signal (behind) */}
              <svg viewBox="0 0 200 60" class="signage-waveform" aria-hidden="true">
                <defs>
                  <filter id="waveform-glow-signage-1">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d="M0,30 Q10,10 20,30 T40,30 T60,30 T80,50 T100,30 T120,10 T140,30 T160,30 T180,45 T200,30"
                  fill="none"
                  stroke="#FFDB58"
                  stroke-width="3"
                  filter="url(#waveform-glow-signage-1)"
                  class="signage-pulse"
                />
              </svg>
              
              {/* LAYER 2: Ghost Chassis Asset */}
              <img 
                src="/static/machined-assets/cowley-rehearsal-optimized.webp"
                alt="Cowley Road Rehearsal Module"
                class="chassis-asset"
              />
              
              <div class="module-header-signage overlay">
                <h2 class="kinetic-title oxford-flicker yellow">COWLEY ROAD</h2>
                <p class="module-address yellow">118 Cowley Road · Rehearsal</p>
              </div>
            </div>
          </div>

          {/* TOP RIGHT: Cricket Road Rehearsal (Magenta Live Jam) */}
          <div class="signage-module cricket-rehearsal" data-channel="8">
            <div class="module-chassis">
              {/* LAYER 1: Reactive Signal (Magenta) */}
              <svg viewBox="0 0 200 60" class="signage-waveform" aria-hidden="true">
                <defs>
                  <filter id="waveform-glow-signage-8">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d="M0,30 Q10,10 20,30 T40,30 T60,30 T80,50 T100,30 T120,10 T140,30 T160,30 T180,45 T200,30"
                  fill="none"
                  stroke="#FF006E"
                  stroke-width="3"
                  filter="url(#waveform-glow-signage-8)"
                  class="signage-pulse"
                />
              </svg>
              
              {/* LAYER 2: Ghost Chassis Asset */}
              <img 
                src="/static/machined-assets/cricket-rehearsal-magenta-optimized.webp"
                alt="Cricket Road Rehearsal Module"
                class="chassis-asset"
              />
              
              <div class="module-header-signage overlay">
                <h2 class="kinetic-title oxford-flicker magenta">CRICKET ROAD</h2>
                <p class="module-address magenta">📍 Cricket Road · Live Jam · 10 min walk</p>
              </div>
            </div>
          </div>

          {/* BOTTOM LEFT: Control Room - Cricket Road */}
          <div class="signage-module cricket-control-room" data-channel="2">
            <div class="module-chassis">
              {/* LAYER 1: Reactive Signal */}
              <svg viewBox="0 0 200 60" class="signage-waveform" aria-hidden="true">
                <defs>
                  <filter id="waveform-glow-signage-2">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d="M0,30 Q10,10 20,30 T40,30 T60,30 T80,50 T100,30 T120,10 T140,30 T160,30 T180,45 T200,30"
                  fill="none"
                  stroke="#00D9FF"
                  stroke-width="3"
                  filter="url(#waveform-glow-signage-2)"
                  class="signage-pulse"
                />
              </svg>
              
              {/* LAYER 2: Ghost Chassis Asset */}
              <img 
                src="/static/machined-assets/cricket-control-room-optimized.webp"
                alt="Cricket Road Control Room Module"
                class="chassis-asset"
              />
              
              <div class="module-header-signage overlay">
                <h2 class="kinetic-title oxford-flicker cyan">CONTROL ROOM</h2>
                <p class="module-address cyan">92 Cricket Road · Control Room Hire</p>
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: Workshop Café */}
          <div class="signage-module workshop-cafe" data-channel="4">
            <div class="module-chassis">
              {/* LAYER 1: Amber Analog Heartbeat (Rear Ambience) */}
              <div class="absolute inset-0 bg-amber-700/30 blur-3xl opacity-60" style="animation: pulse 4s ease-in-out infinite;"></div>
              
              {/* LAYER 2: Asset Placeholder (Awaiting Upload) */}
              <div class="chassis-placeholder clay-warm" style="background: linear-gradient(135deg, #3d2817, #1a1410); position: relative; width: 100%; height: 100%;">
                
                {/* LAYER 3: Nature Distilled Texture */}
                <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px);"></div>
                
                {/* LAYER 4: UI Overlay */}
                <div class="absolute inset-0 flex flex-col justify-between p-6" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent, rgba(0,0,0,0.4));">
                  
                  {/* Top Label */}
                  <div class="flex justify-between items-start">
                    <span class="font-mono text-amber-200 text-xs tracking-widest px-2 py-1 rounded" style="border: 1px solid rgba(245, 158, 11, 0.5); background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);">
                      CH4 · ANALOG REST
                    </span>
                    {/* Status Light */}
                    <div class="led-indicator" style="background: radial-gradient(circle, #f59e0b 60%, #78350f 100%); box-shadow: 0 0 12px #f59e0b, 0 0 24px #f59e0b;"></div>
                  </div>

                  {/* Bottom Kinetic Typography */}
                  <div class="module-header-signage">
                    <h2 class="kinetic-title oxford-flicker warm" style="font-size: 2.5rem; line-height: 1.1;">
                      WORKSHOP<br/>CAFÉ
                    </h2>
                    <p class="module-address warm" style="display: flex; align-items: center; gap: 0.5rem;">
                      <span>☕</span> 118 COWLEY RD · COMMUNITY SPACE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* STATUS BAR: Live System Info */}
        <div class="signage-status-bar">
          <div class="status-item">
            <span class="status-label">MODE:</span>
            <span class="status-value operational">OPERATIONAL</span>
          </div>
          <div class="status-item">
            <span class="status-label">ACCESS:</span>
            <span class="status-value">SCHEDULED ONLY</span>
          </div>
          <div class="status-item">
            <span class="status-label">LOCATION:</span>
            <span class="status-value">118 COWLEY ROAD, OXFORD</span>
          </div>
        </div>

        {/* QR CODE: Mobile Handoff */}
        <div class="signage-qr">
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://cowleyroadstudios.com/book"
            alt="Scan to Book"
            class="qr-code"
          />
          <p class="qr-label">SCAN TO BOOK</p>
        </div>
      </div>

      {/* AUTO-REFRESH SCRIPT */}
      <script dangerouslySetInnerHTML={{__html: `
        // Auto-refresh every 5 minutes to keep content fresh
        setTimeout(() => {
          window.location.reload();
        }, 300000);
        
        // Night Mode Auto-Trigger (10pm-6am)
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 6) {
          document.documentElement.classList.add('night-mode');
        }
      `}} />
    </>
  )
}
