import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title, description, keywords, ogTitle, ogDescription, canonicalUrl, ogUrl, ogImage }) => {
  const baseUrl = 'https://cowleyroadstudios.com';
  const defaultImage = 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/512crs_badge_dark%20fixed%20for%20web.png';
  
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Cowley Road Studios | Recording Studio & Rehearsal Rooms Oxford'}</title>
        <meta name="description" content={description || 'Recording studio, rehearsal rooms, AV services and venue hire in Oxford. Professional infrastructure on Cowley Road. Book sessions online.'} />
        <meta name="keywords" content={keywords || 'recording studio oxford, rehearsal rooms oxford, live sound oxford, av services oxford, venue hire oxford'} />
        <meta name="author" content="Cowley Road Studios" />
        <meta name="copyright" content="© 2026 Cowley Road Studios. Continuing the Soundworks Oxford legacy (1999–2024)." />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl || baseUrl} />
        
        {/* Google Search Console Verification - REPLACE WITH ACTUAL CODE */}
        <meta name="google-site-verification" content="ADD_VERIFICATION_CODE_HERE" />
        
        {/* Open Graph (social sharing) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle || title || 'Cowley Road Studios | Recording Studio & Rehearsal Rooms Oxford'} />
        <meta property="og:description" content={ogDescription || description || 'Recording studio, rehearsal rooms, AV services and venue hire in Oxford. Professional infrastructure on Cowley Road.'} />
        <meta property="og:image" content={ogImage || defaultImage} />
        <meta property="og:url" content={ogUrl || canonicalUrl || baseUrl} />
        
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
             CRITICAL RACK IMAGES — PRELOAD FOR INSTANT LOAD
             Above-the-fold: Welcome rack + Header (WebP optimized)
             Order matches page layout (Welcome first, Header second)
             ============================================ */}
        <link rel="preload" as="image" href="/static/rack-images/welcome-rack-1920w.webp" type="image/webp" />
        <link rel="preload" as="image" href="/static/rack-images/header-1920w.webp" type="image/webp" />
        
        {/* ============================================
             CONSOLIDATED CSS — LEAN & FAST
             3 strategic files replace 78 legacy files
             ============================================ */}
        
        {/* Preload consolidated CSS for optimal performance */}
        <link rel="preload" href="/static/crs-consolidated-base.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-consolidated-rack.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <link rel="preload" href="/static/crs-consolidated-components.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        
        {/* Fallback for browsers without JS */}
        <noscript>
          <link href="/static/crs-consolidated-base.css" rel="stylesheet" />
          <link href="/static/crs-consolidated-rack.css" rel="stylesheet" />
          <link href="/static/crs-consolidated-components.css" rel="stylesheet" />
        </noscript>

        {/* CONSOLIDATED CSS: Base, Rack System, Components */}
        <link href="/static/crs-consolidated-base.css" rel="stylesheet" />
        <link href="/static/crs-consolidated-rack.css" rel="stylesheet" />
        <link href="/static/crs-consolidated-components.css" rel="stylesheet" />
        
        {/* Legacy accordion styles (temporary - integrated in next phase) */}
        <link href="/static/rack-accordion.css" rel="stylesheet" />
        
        {/* Rack Module Visual Graphics */}
        <link href="/static/rack-modules-visual.css" rel="stylesheet" />
        
        {/* Sticky Rack Navigation */}
        <link href="/static/rack-nav-sticky.css" rel="stylesheet" />
        
        {/* Rack Module Enhancements (hover, tooltips, accessibility) */}
        <link href="/static/rack-enhancements.css" rel="stylesheet" />
        
        {/* Control Room Interactive Buttons */}
        <link href="/static/control-room-buttons.css" rel="stylesheet" />
        <link href="/static/control-room-hotspots.css" rel="stylesheet" />
        
        {/* CRS Header Rack Interactive Hotspots */}
        <link href="/static/crs-header-hotspots.css" rel="stylesheet" />
        
        {/* Welcome Rack Interactive Buttons */}
        <link href="/static/welcome-rack-hotspots.css" rel="stylesheet" />
        
        {/* Header Rack Interactive Buttons */}
        <link href="/static/header-rack-buttons.css" rel="stylesheet" />
        
        {/* Recording Services Interactive Buttons */}
        <link href="/static/recording-services-hotspots.css" rel="stylesheet" />
        
        {/* Rehearsal Combi Rack Interactive Panels */}
        <link href="/static/rehearsal-combi-hotspots.css" rel="stylesheet" />
        
        {/* Title Rack Orange Glow Effect */}
        <link href="/static/title-rack-glow.css" rel="stylesheet" />
        
        {/* Interactive Enhancements - Hover effects and accessibility */}
        <link href="/static/rack-interactive-enhancements.css" rel="stylesheet" />
        
        {/* Button Interactions - Pressed state, focus, responsive layout */}
        <link href="/static/rack-button-interactions.css" rel="stylesheet" />
        
        {/* Enhanced Button Design - Gold gradient with tactile effects */}
        <link href="/static/rack-button-enhanced.css" rel="stylesheet" />
        
        {/* VU Meter Styles - Industrial-grade meters */}
        <link href="/static/vu-meter-styles.css" rel="stylesheet" />
        
        {/* Interactive Switches - Hardware-style toggles */}
        <link href="/static/rack-switches.css" rel="stylesheet" />
        
        {/* Toggle Switches - Functional switches for future features */}
        <link href="/static/toggle-switches.css" rel="stylesheet" />
        
        {/* ============================================
             MOBILE OPTIMIZATION - P1 CRITICAL FIXES
             Addresses critical mobile UX issues from Feb 2026 audit:
             - Layout reflow (100% width, no horizontal scroll)
             - Mobile navigation (show mobile nav, hide desktop)
             - Touch targets (44px minimum)
             - Font sizes (16px minimum)
             ============================================ */}
        <link href="/static/crs-mobile-critical-fixes.css" rel="stylesheet" />
        
        {/* ODRO Repair Rack Interactive Buttons */}
        <link href="/static/odro-repair-hotspots.css" rel="stylesheet" />
        
        {/* Disable Whole-Rack Flash on Click - Localize interactions */}
        <link href="/static/disable-rack-flash.css" rel="stylesheet" />
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
        
        {/* Rack Image Loader - HIGH PRIORITY - Load ASAP for lazy loading */}
        <script src="/static/rack-image-loader.js"></script>
        
        {/* Performance Monitor - Critical CSS tracking (Phase 3B) */}
        <script src="/static/performance-monitor.js" defer></script>
        
        {/* Client-side interactions - Deferred for performance */}
        <script src="/static/app.js" defer></script>
        {/* Rack dropdown behavior - Deferred */}
        <script src="/static/rack-dropdown.js" defer></script>
        {/* Sticky rack navigation - Deferred */}
        <script src="/static/rack-nav-sticky.js" defer></script>
        {/* Back to top functionality - Deferred */}
        <script src="/static/back-to-top.js" defer></script>
        {/* Control Room interactive buttons - Deferred */}
        <script src="/static/control-room-buttons.js" defer></script>
        {/* Recording Services interactive buttons - Deferred */}
        <script src="/static/recording-services-buttons.js" defer></script>
        {/* Enhanced rack interactions (smooth scroll, sounds, analytics) - Deferred */}
        <script src="/static/rack-enhancements.js" defer></script>
        {/* Audio feedback for button clicks - Vault-Tec style - Deferred */}
        <script src="/static/rack-audio-feedback.js" defer></script>
        {/* Simulated audio visualizer for Workshop Café - Ambient effect */}
        <script src="/static/audio-visualizer.js" defer></script>
        {/* Toggle switches - State management and persistence */}
        <script src="/static/toggle-switches.js" defer></script>
        {/* Smooth page transitions - Fade effect with View Transitions API fallback */}
        <script src="/static/page-transitions.js" defer></script>
        
        {/* Enhanced Button Sound Effects - Awwwards-level interactivity */}
        <script src="/static/rack-button-sounds.js" defer></script>
        
        {/* VU Meter Scroll Animation - Reactive meters */}
        <script src="/static/vu-meter-animation.js" defer></script>
        
        {/* Interactive Rack Switches - Hardware-style toggles with state persistence */}
        <script src="/static/rack-switches.js" defer></script>
      </body>
    </html>
  )
})


