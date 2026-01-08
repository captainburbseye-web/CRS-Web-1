import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cowley Road Studios | Oxford's Grassroots Music Hub</title>
        <meta name="description" content="Professional-grade recording infrastructure. Grassroots pricing. No gatekeeping. Recording studio, workshop café, and community space at 118 Cowley Road, Oxford." />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Tailwind CSS - built and served statically */}
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="font-body text-text-light bg-black antialiased">
        {children}
      </body>
    </html>
  )
})


