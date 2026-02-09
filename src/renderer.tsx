import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title, description, keywords, ogTitle, ogDescription }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Cowley Road Studios | Recording Studio & AV Services Oxford'}</title>
        <meta name="description" content={description || 'Professional recording studio, rehearsal space, and live AV services in Oxford. Continuing the Soundworks Oxford legacy (1999–2024). No-chaos operation. Subsidized rates for community groups.'} />
        <meta name="keywords" content={keywords || 'recording studio oxford, rehearsal space oxford, live sound oxford, av services oxford, soundworks oxford'} />
        <meta name="author" content="Cowley Road Studios" />
        <meta name="copyright" content="© 2026 Cowley Road Studios. Continuing the Soundworks Oxford legacy (1999–2024)." />
        
        {/* Open Graph (social sharing) */}
        <meta property="og:title" content={ogTitle || title || 'Cowley Road Studios | Continuing the Soundworks Oxford Legacy'} />
        <meta property="og:description" content={ogDescription || description || 'Professional recording & AV in Oxford. Continuing 25 years of Soundworks Oxford infrastructure.'} />
        <meta property="og:image" content="https://pub-991d8d2677374c528678829280f50c98.r2.dev/512crs_badge_dark%20fixed%20for%20web.png" />
        <meta property="og:url" content="https://cowleyroadstudios.com" />
        
        {/* Favicon - CRS Sig-Log */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A1A0F" />
        
        {/* CRITICAL: Hide mobile overlay on desktop IMMEDIATELY (before any other CSS loads) */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            #mobile-nav-overlay,
            .mobile-nav-overlay,
            div.mobile-nav-overlay {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              position: absolute !important;
              left: -999999px !important;
              top: -999999px !important;
            }
          }
        `}} />
        
        {/* ============================================
             CRITICAL CSS — INLINED FOR INSTANT FIRST PAINT
             Above-the-fold: Reset, Typography, Rack UI, Neon
             Size: 2.6KB minified
             ============================================ */}
        <style dangerouslySetInnerHTML={{__html: `
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}body{margin:0;line-height:inherit;background:#0a0a0a;color:#f4f4f4;font-family:'Inter',sans-serif}h1,h2,h3{font-weight:700;line-height:1.2}h1{font-size:2.5rem}h2{font-size:1.75rem}.rack-container{max-width:1400px;margin:0 auto;padding:2rem 1rem}.rack-module{background:#0d0d0d;border:2px solid #2a2a2a;border-radius:8px;margin:1.5rem 0;padding:1.5rem;position:relative;transition:border-color 0.4s ease-out,box-shadow 0.4s ease-out}.module-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;border-bottom:1px solid #333;padding-bottom:0.75rem}.module-title{font-family:'JetBrains Mono','Space Mono',monospace;font-size:1.125rem;color:#d4af37;text-transform:uppercase;letter-spacing:0.05em}.led{width:8px;height:8px;border-radius:50%;background:#39FF14;box-shadow:0 0 8px #39FF14}:root{--neon-orange:#FF8833;--neon-green:#39FF14;--glow-md:12px;--glow-transition:0.4s ease-out}.rack-module[data-channel="1"],.rack-module[data-channel="2"]{border-color:rgba(255,136,51,0.3)}.rack-module[data-channel="1"]:hover,.rack-module[data-channel="2"]:hover{border-color:#FF8833;box-shadow:0 0 12px rgba(255,136,51,0.3)}.rack-header{background:#0a0a0a;border-bottom:2px solid #1a1a1a;padding:1rem 2rem;position:sticky;top:0;z-index:100}.rack-header-nav{display:flex;gap:1.5rem;align-items:center}.rack-header-nav a{color:#f4f4f4;text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:0.875rem;transition:color 0.2s}.rack-header-nav a:hover{color:#00ffff}.module-video{width:100%;height:auto;border-radius:4px;display:block}.rack-window-container{position:relative;overflow:hidden;border-radius:8px;background:#1a1a1a}.skeleton{background:linear-gradient(90deg,#1a1a1a 25%,#2a2a2a 50%,#1a1a1a 75%);background-size:200% 100%;animation:skeleton-loading 1.5s ease-in-out infinite}@keyframes skeleton-loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
        `}} />
        
        {/* Performance: DNS Prefetch & Preconnect for Square Booking */}
        <link rel="dns-prefetch" href="https://square.link" />
        <link rel="preconnect" href="https://square.link" />
        
        {/* Google Fonts - Hardware Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700;800&family=Inter:wght@400;600;700&family=Archivo+Black&display=swap" rel="stylesheet" />
        
        {/* ============================================
             NON-CRITICAL CSS — DEFERRED FOR PERFORMANCE
             Loaded after first paint using preload + onload trick
             ============================================ */}
        
        {/* Preload critical CSS files for second paint */}
        <link rel="preload" href="/static/crs-reset.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-typography.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-spacing.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-rack-ui.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-header.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-neon-system.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-rotary-knob.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        
        {/* Defer footer and mobile CSS (below-the-fold) */}
        <link rel="preload" href="/static/crs-footer.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-mobile.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        
        {/* Fallback for browsers without JS */}
        <noscript>
          <link href="/static/crs-reset.css" rel="stylesheet" />
          <link href="/static/crs-typography.css" rel="stylesheet" />
          <link href="/static/crs-spacing.css" rel="stylesheet" />
          <link href="/static/crs-rack-ui.css" rel="stylesheet" />
          <link href="/static/crs-header.css" rel="stylesheet" />
          <link href="/static/crs-footer.css" rel="stylesheet" />
          <link href="/static/crs-mobile.css" rel="stylesheet" />
          <link href="/static/crs-neon-system.css" rel="stylesheet" />
          <link href="/static/crs-rotary-knob.css" rel="stylesheet" />
        </noscript>

        
        {/* 7. MOBILE: Mobile overrides, hamburger menu, responsive */}
        <link href="/static/crs-mobile.css" rel="stylesheet" />
        
        {/* 8. NEON SYSTEM: Triple-layer glow, LED pulse, kinetic typography (Phase 2A) */}
        <link href="/static/crs-neon-system.css" rel="stylesheet" />
        
        {/* 9. ROTARY KNOBS: Physics-driven interactive controls (Phase 2B - Strike 2) */}
        <link href="/static/crs-rotary-knob.css" rel="stylesheet" />
        
        {/* 9b. ROTARY KNOBS v2: Physics simulation with torque & inertia (Strike 9) */}
        <link href="/static/crs-rotary-knob-v2.css" rel="stylesheet" />
        
        {/* 10. MACHINED ASSETS: Glass Pane architecture with static PBR assets (Phase 3B - Strike 6) */}
        <link href="/static/crs-machined-assets.css" rel="stylesheet" />
        
        {/* 11. SVG WAVEFORMS: Living signal presence for visual feedback (Phase 3C - Strike 8) */}
        <link href="/static/crs-waveform.css" rel="stylesheet" />
        
        {/* 12. GHOST CHASSIS: 4-layer recessed-depth stack for CH2 (The 238th Law) */}
        <link href="/static/crs-ghost-chassis.css" rel="stylesheet" />
      </head>
      <body>
        {/* Organic Grain SVG Filter for Workshop Café (Nature Distilled) */}
        <svg style="display: none;" aria-hidden="true">
          <defs>
            <filter id="organic-grain-filter" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="4" seed="5" />
              <feColorMatrix type="saturate" values="0.3" />
              <feBlend mode="multiply" in2="SourceGraphic" />
            </filter>
          </defs>
        </svg>
        
        {children}
        
        {/* Back to Top Button - Appears after 800px scroll */}
        <button 
          class="back-to-top" 
          aria-label="Back to top"
          aria-hidden="true"
          title="Scroll to top"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        
        {/* Performance Monitor - Critical CSS tracking (Phase 3B) */}
        <script src="/static/performance-monitor.js" defer></script>
        
        {/* Client-side interactions - Deferred for performance */}
        <script src="/static/app.js" defer></script>
        {/* Rack dropdown behavior - Deferred */}
        <script src="/static/rack-dropdown.js" defer></script>
        {/* Back to top functionality - Deferred */}
        <script src="/static/back-to-top.js" defer></script>
      </body>
    </html>
  )
})


