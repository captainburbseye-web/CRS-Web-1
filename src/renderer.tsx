import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRS | Cowley Road & Florence Park Studios · Oxford</title>
        <meta name="description" content="CRS operates multi-location studio and AV infrastructure across Oxford. Industry-standard recording, rehearsal, and technical support. Locations on Cowley Road and Cricket Road near Florence Park." />
        
        {/* Favicon - CRS Hardware Stamp */}
        <link rel="icon" type="image/png" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs-images%20website/crs-favicon-stamp.png" />
        
        {/* Google Fonts - Industrial-Maverick Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        
        {/* Clean CSS */}
        <link href="/static/clean.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
})


