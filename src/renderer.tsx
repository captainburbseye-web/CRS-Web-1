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
        
        {/* Performance: DNS Prefetch & Preconnect for Square Booking */}
        <link rel="dns-prefetch" href="https://square.link" />
        <link rel="preconnect" href="https://square.link" />
        
        {/* Google Fonts - Hardware Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700;800&family=Inter:wght@400;600;700&family=Archivo+Black&display=swap" rel="stylesheet" />
        
        {/* ============================================
             CRS CORE CSS — 7 Files (Consolidated 44 → 7)
             Load order: Reset → Typography → Spacing → Rack UI → Header → Footer → Mobile
             ============================================ */}
        
        {/* 1. RESET: Browser reset, global box-sizing, root variables */}
        <link href="/static/crs-reset.css" rel="stylesheet" />
        
        {/* 2. TYPOGRAPHY: Font families, sizes, weights, letter-spacing */}
        <link href="/static/crs-typography.css" rel="stylesheet" />
        
        {/* 3. SPACING: 8px scale system, gaps, margins, padding */}
        <link href="/static/crs-spacing.css" rel="stylesheet" />
        
        {/* 4. RACK UI: Rack units, LED indicators, hardware aesthetic */}
        <link href="/static/crs-rack-ui.css" rel="stylesheet" />
        
        {/* 5. HEADER: Header, nav, sticky behavior, logo, CTA */}
        <link href="/static/crs-header.css" rel="stylesheet" />
        
        {/* 6. FOOTER: Footer (technical metadata + termination panel) */}
        <link href="/static/crs-footer.css" rel="stylesheet" />
        
        {/* 7. MOBILE: Mobile overrides, hamburger menu, responsive */}
        <link href="/static/crs-mobile.css" rel="stylesheet" />
      </head>
      <body>
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
        
        {/* Client-side interactions */}
        <script src="/static/app.js"></script>
        {/* Rack dropdown behavior */}
        <script src="/static/rack-dropdown.js"></script>
        {/* Back to top functionality */}
        <script src="/static/back-to-top.js"></script>
      </body>
    </html>
  )
})


