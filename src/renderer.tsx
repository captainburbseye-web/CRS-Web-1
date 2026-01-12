import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRS Oxford</title>
        <meta name="description" content="CRS operates multi-location studio and AV infrastructure across Oxford. Industry-standard recording, rehearsal, and technical support. Locations on Cowley Road and Cricket Road." />
        
        {/* Favicon - TASCAM Rack System */}
        <link rel="icon" type="image/png" sizes="512x512" href="/static/icons/favicon.png" />
        <link rel="apple-touch-icon" href="/static/icons/crs-tile-1024.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A1A0F" />
        
        {/* Google Fonts - Industrial-Maverick Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        
        {/* Clean CSS */}
        <link href="/static/clean.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        {/* Client-side interactions */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})


