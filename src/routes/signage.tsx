import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import React from 'react'
import StudioServicesRack from '../components/StudioServicesRack'

const signage = new Hono()

signage.get('/', (c) => {
  const manifestEntry = c.get('manifest')?.['src/client/rack-entry.tsx']
  const jsAsset = manifestEntry?.file ? `/static/${manifestEntry.file}` : '/static/assets/rack-entry.js'
  const cssAsset = manifestEntry?.css?.[0] ? `/static/${manifestEntry.css[0]}` : null
  
  // Server-render the rack for instant display
  let rackHtml = ''
  try {
    rackHtml = renderToString(React.createElement(StudioServicesRack))
  } catch (error) {
    console.error('SSR Error:', error)
    rackHtml = '<div class="error">Loading...</div>'
  }
  
  return c.html(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=1920, initial-scale=1.0" />
  <title>CRS Signage | 55" Display Mode</title>
  
  <!-- Prevent indexing -->
  <meta name="robots" content="noindex, nofollow" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  
  <!-- Rack Demo CSS -->
  <link href="/static/studio-rack-demo.css?v=signage" rel="stylesheet" />
  ${cssAsset ? `<link href="${cssAsset}" rel="stylesheet" />` : ''}
  
  <!-- 55" Signage Optimization -->
  <link href="/static/signage-55inch-optimized.css" rel="stylesheet" />
  
  <style>
    /* SIGNAGE MODE OVERRIDES */
    * {
      box-sizing: border-box;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #000000;
      cursor: none; /* Kiosk mode */
      width: 1920px;
      height: 1080px;
    }
    
    #signage-root {
      width: 1920px;
      height: 1080px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      scroll-behavior: smooth;
      
      /* Hide scrollbar */
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    
    #signage-root::-webkit-scrollbar {
      display: none;
    }
    
    /* Burn-in protection: subtle constant motion */
    #signage-root {
      animation: burn-in-protection 120s ease-in-out infinite;
    }
    
    @keyframes burn-in-protection {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(2px, 1px); }
      50% { transform: translate(-1px, -2px); }
      75% { transform: translate(-2px, 1px); }
    }
    
    /* Disable all interactions */
    a:not(.crs-master-plate-link),
    button,
    input,
    textarea,
    .srd-emergency-btn,
    .srd-btn,
    form {
      pointer-events: none !important;
      cursor: none !important;
    }
    
    /* Keep street sign clickable for emergency exit */
    .crs-master-plate-link {
      pointer-events: auto !important;
      cursor: pointer !important;
    }
    
    /* Active module highlight */
    .srd-module {
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .srd-module.signage-active {
      opacity: 1;
      transform: scale(1.02);
      animation: module-glow 12s ease-in-out;
    }
    
    @keyframes module-glow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.05); }
    }
    
    /* Scale to fit if display isn't exactly 1920x1080 */
    @media (min-width: 1921px) or (min-height: 1081px) {
      html {
        transform-origin: top left;
        transform: scale(calc(100vw / 1920));
      }
    }
  </style>
</head>
<body>
  <div id="signage-root">${rackHtml}</div>
  
  <!-- React Hydration -->
  <script type="module" src="${jsAsset}"></script>
  
  <!-- Signage Auto-Cycling Engine -->
  <script>
    (function() {
      'use strict';
      
      // Configuration
      const CYCLE_INTERVAL = 12000; // 12 seconds per module
      const CYCLE_DELAY = 2000; // Wait 2s before starting
      
      // Wait for React hydration
      setTimeout(() => {
        const modules = document.querySelectorAll('.srd-module');
        const root = document.getElementById('signage-root');
        
        if (!modules.length || !root) {
          console.error('Signage: No modules found');
          return;
        }
        
        let currentIndex = 0;
        
        console.log(\`Signage: Found \${modules.length} modules, starting cycle\`);
        
        // Cycle function
        function cycleModule() {
          // Remove active class from all
          modules.forEach(m => m.classList.remove('signage-active'));
          
          // Add active to current
          const currentModule = modules[currentIndex];
          if (currentModule) {
            currentModule.classList.add('signage-active');
            
            // Scroll into view (centered)
            const moduleTop = currentModule.offsetTop;
            const moduleHeight = currentModule.offsetHeight;
            const viewportHeight = root.offsetHeight;
            const scrollTo = moduleTop - (viewportHeight / 2) + (moduleHeight / 2);
            
            root.scrollTo({
              top: Math.max(0, scrollTo),
              behavior: 'smooth'
            });
            
            console.log(\`Signage: Module \${currentIndex + 1}/\${modules.length}\`);
          }
          
          // Increment and loop
          currentIndex = (currentIndex + 1) % modules.length;
        }
        
        // Start immediately
        cycleModule();
        
        // Then cycle every 12 seconds
        setInterval(cycleModule, CYCLE_INTERVAL);
        
        // Emergency exit: press ESC to return to public site
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            window.location.href = '/';
          }
        });
        
      }, CYCLE_DELAY);
    })();
  </script>
</body>
</html>`
  )
})

export { signage }
