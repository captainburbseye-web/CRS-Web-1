import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cowley Road Studios | Professional Recording Studio Oxford</title>
        <meta name="description" content="Industry-standard recording infrastructure. Calm delivery. Professional recording studio at 118 Cowley Road, Oxford." />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="https://pub-991d8d2677374c528678829280f50c98.r2.dev/crs%20ico.png" />
        
        {/* Google Fonts - Typography System (Locked) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Oswald:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Tailwind CSS - built and served statically */}
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="font-body text-off-white bg-nettle-green antialiased">
        {children}
      </body>
    </html>
  )
})


