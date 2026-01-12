import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRS Oxford</title>
        <meta name="description" content="CRS operates multi-location studio and AV infrastructure across Oxford. Industry-standard recording, rehearsal, and technical support. Locations on Cowley Road and Cricket Road." />
        
        {/* Favicon - CRS Stamp */}
        <link rel="icon" type="image/png" sizes="512x512" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-favicon-stamp.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-favicon-stamp.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-favicon-stamp.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/CRS-Buttons%20ready%20for%20web/crs-favicon-stamp.png" />
        <link rel="apple-touch-icon" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/Square_app_tile_1024x1024px_Full_CRS_control_pane-1768187252484.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A1A0F" />
        
        {/* Google Fonts - Industrial-Maverick Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        
        {/* Clean CSS */}
        <link href="/static/clean.css" rel="stylesheet" />
        <link href="/static/crs-positioning-fixes.css" rel="stylesheet" />
        <link href="/static/crs-proportion-fixes.css" rel="stylesheet" />
        <link href="/static/crs-nav-button-refinement.css" rel="stylesheet" />
        <link href="/static/crs-nav-correction.css" rel="stylesheet" />
        <link href="/static/crs-mobile-nav.css" rel="stylesheet" />
        <link href="/static/crs-audit-fixes.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        {/* Client-side interactions */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})


