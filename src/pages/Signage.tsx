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
                  stroke="#FFB627"
                  stroke-width="3"
                  filter="url(#waveform-glow-signage-1)"
                  class="signage-pulse"
                />
              </svg>
              
              {/* LAYER 2: Chassis Asset (when ready) */}
              <div class="chassis-placeholder nettle-green">
                <div class="module-header-signage">
                  <h2 class="kinetic-title oxford-flicker">COWLEY ROAD</h2>
                  <p class="module-address">118 Cowley Road · Rehearsal</p>
                </div>
              </div>
            </div>
          </div>

          {/* TOP RIGHT: Cricket Road Rehearsal */}
          <div class="signage-module cricket-road" data-channel="2">
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
                src="/static/machined-assets/cricket-rehearsal-optimized.webp"
                alt="Cricket Road Rehearsal Module"
                class="chassis-asset"
              />
              
              <div class="module-header-signage overlay">
                <h2 class="kinetic-title oxford-flicker cyan">CRICKET ROAD</h2>
                <p class="module-address cyan">92 Cricket Road · Rehearsal</p>
              </div>
            </div>
          </div>

          {/* BOTTOM LEFT: Control Room Dry Hire */}
          <div class="signage-module control-room" data-channel="3">
            <div class="module-chassis">
              {/* LAYER 1: Reactive Signal */}
              <svg viewBox="0 0 200 60" class="signage-waveform" aria-hidden="true">
                <defs>
                  <filter id="waveform-glow-signage-3">
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
                  stroke="#FF00D9"
                  stroke-width="3"
                  filter="url(#waveform-glow-signage-3)"
                  class="signage-pulse"
                />
              </svg>
              
              {/* LAYER 2: Ghost Chassis Asset */}
              <img 
                src="/static/machined-assets/cricket-rehearsal-optimized.webp"
                alt="Control Room Module"
                class="chassis-asset"
              />
              
              <div class="module-header-signage overlay">
                <h2 class="kinetic-title oxford-flicker magenta">CONTROL ROOM</h2>
                <p class="module-address magenta">Dry Hire · 92 Cricket Road</p>
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: Workshop Café */}
          <div class="signage-module workshop-cafe" data-channel="4">
            <div class="module-chassis">
              {/* NO WAVEFORM: Contemplative Space */}
              
              {/* LAYER 2: Organic Chassis (when ready) */}
              <div class="chassis-placeholder clay-warm">
                <div class="module-header-signage">
                  <h2 class="kinetic-title oxford-flicker warm">WORKSHOP CAFÉ</h2>
                  <p class="module-address warm">Open Creative Sessions · Community Space</p>
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
