import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title, description, keywords, ogTitle, ogDescription }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Cowley Road Studios | Recording Studio & AV Services Oxford'}</title>
        <meta name="description" content={description || 'Professional recording studio, rehearsal space, and live AV services in Oxford. No-chaos operation. Subsidized rates for community groups.'} />
        <meta name="keywords" content={keywords || 'recording studio oxford, rehearsal space oxford, live sound oxford, av services oxford'} />
        
        {/* Open Graph (social sharing) */}
        <meta property="og:title" content={ogTitle || title || 'Cowley Road Studios'} />
        <meta property="og:description" content={ogDescription || description || 'Professional recording & AV in Oxford'} />
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
        
        {/* Google Fonts - Hardware Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700;800&family=Inter:wght@400;600;700&family=Archivo+Black&display=swap" rel="stylesheet" />
        
        {/* Clean CSS */}
        <link href="/static/clean.css" rel="stylesheet" />
        
        {/* CRS SPACING SCALE: 8px base unit system - foundation for all rhythm (LOADS EARLY) */}
        <link href="/static/crs-spacing-scale.css" rel="stylesheet" />
        
        {/* CRS HEADER THREE-ZONE: Institutional header grid - logo | nav | cta (LOADS BEFORE OTHER HEADER CSS) */}
        <link href="/static/crs-header-three-zone.css" rel="stylesheet" />
        
        {/* CRS MASTER RACK HEADER: 1U rack unit below sticky nav (LOADS AFTER THREE-ZONE) */}
        <link href="/static/crs-master-rack-header.css" rel="stylesheet" />
        
        <link href="/static/crs-positioning-fixes.css" rel="stylesheet" />
        <link href="/static/crs-proportion-fixes.css" rel="stylesheet" />
        <link href="/static/crs-nav-button-refinement.css" rel="stylesheet" />
        <link href="/static/crs-nav-correction.css" rel="stylesheet" />
        <link href="/static/crs-mobile-nav.css" rel="stylesheet" />
        <link href="/static/crs-audit-fixes.css" rel="stylesheet" />
        <link href="/static/crs-header-vertical-separation.css" rel="stylesheet" />
        <link href="/static/crs-header-logo.css" rel="stylesheet" />
        {/* Hardware Discipline */}
        <link href="/static/crs-hardware-discipline-final.css" rel="stylesheet" />
        {/* CONTAINMENT FIX: Layering + Mounting */}
        <link href="/static/crs-containment-fix.css" rel="stylesheet" />
        {/* CHASSIS LOCK: Final header specification */}
        <link href="/static/crs-header-chassis-lock.css" rel="stylesheet" />
        {/* PRESENCE SIGNALS: Hardware status indicators + imagery */}
        <link href="/static/crs-presence-signals.css" rel="stylesheet" />
        {/* FINAL OVERRIDES: Nuclear fixes (MUST load ABSOLUTE LAST) */}
        <link href="/static/crs-final-overrides.css" rel="stylesheet" />
        {/* RACK UI V2: Physical hardware aesthetic (LOADS LAST TO OVERRIDE ALL) */}
        <link href="/static/crs-rack-ui-v2.css" rel="stylesheet" />
        {/* RACK UNIT CANONICAL: Single source of truth for rack modules (REFERENCE OBJECT) */}
        <link href="/static/crs-rack-unit-canonical.css" rel="stylesheet" />
        {/* WSC MODE: Workshop Café warmth overrides (controlled mode switch) */}
        <link href="/static/crs-wsc-mode.css" rel="stylesheet" />
        {/* CLASSIC AESTHETIC: Saturday best look (loads last, overrides V2 for CRS pages) */}
        <link href="/static/crs-classic-aesthetic.css" rel="stylesheet" />
        {/* PRECISION CALIBRATION: Exact pixel-level sizing for Technical Institution aesthetic (MUST LOAD ABSOLUTE LAST) */}
        <link href="/static/crs-precision-calibration.css" rel="stylesheet" />
        {/* TYPOGRAPHY LOCKDOWN: Hard separation of typographic domains - controls immunity (LOADS AFTER EVERYTHING) */}
        <link href="/static/crs-typography-lockdown.css" rel="stylesheet" />
        {/* BOOK NOW CONTROL: Hardware-grade control spec - sacred, do not iterate (LOADS ABSOLUTE LAST) */}
        <link href="/static/crs-book-now-control.css" rel="stylesheet" />
        {/* FOOTER TECHNICAL: Service manual / datasheet footer format */}
        <link href="/static/crs-footer-technical.css" rel="stylesheet" />
        {/* RACK FOOTER TERMINATION: 1U rack unit that closes the rack case at bottom */}
        <link href="/static/crs-rack-footer-termination.css" rel="stylesheet" />
        {/* HEADER LOCKDOWN RESET: Nuclear header reset - prevents all drift (LOADS ABSOLUTE LAST - STEEL BEAM) */}
        <link href="/static/crs-header-reset.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        {/* Client-side interactions */}
        <script src="/static/app.js"></script>
        {/* Rack dropdown behavior */}
        <script src="/static/rack-dropdown.js"></script>
      </body>
    </html>
  )
})


