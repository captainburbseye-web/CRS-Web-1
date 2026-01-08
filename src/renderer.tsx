import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cowley Road Studios | Oxford's Grassroots Music Hub</title>
        <meta name="description" content="Professional-grade recording infrastructure. Grassroots pricing. No gatekeeping. Recording studio, workshop café, and community space at 118 Cowley Road, Oxford." />
        
        {/* Fonts - Brewforce Typography System */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config - Brewforce Brand */}
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  cream: '#F8F6EE',
                  olive: '#4A5B43',
                  mustard: '#D4A437',
                  espresso: '#4B3621',
                  charcoal: '#1E1E1E'
                },
                fontFamily: {
                  display: ['Bebas Neue', 'sans-serif'],
                  body: ['Inter', 'sans-serif'],
                  accent: ['Oswald', 'sans-serif']
                }
              }
            }
          }
        `}} />
      </head>
      <body class="font-body text-charcoal bg-cream">
        {children}
      </body>
    </html>
  )
})
