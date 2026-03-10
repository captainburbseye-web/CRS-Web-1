/**
 * Debug Hotspots - Visual Debugging Tool
 * Enables visual overlay of clickable hotspot areas
 * Usage: Add ?debug=hotspots to URL
 */

(function() {
  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const debugMode = urlParams.get('debug');
  
  if (debugMode === 'hotspots') {
    // Enable debug mode
    document.body.setAttribute('data-debug', 'hotspots');
    
    // Load debug CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/static/debug-hotspots.css';
    document.head.appendChild(link);
    
    console.log('🔍 HOTSPOT DEBUG MODE ENABLED');
    console.log('All clickable areas are now visible with red boundaries');
    console.log('To disable: Remove ?debug=hotspots from URL or run: document.body.removeAttribute("data-debug")');
    
    // Add keyboard shortcut to toggle
    document.addEventListener('keydown', (e) => {
      // Press 'H' key to toggle
      if (e.key === 'h' || e.key === 'H') {
        if (document.body.hasAttribute('data-debug')) {
          document.body.removeAttribute('data-debug');
          console.log('✅ Debug mode disabled');
        } else {
          document.body.setAttribute('data-debug', 'hotspots');
          console.log('🔍 Debug mode enabled');
        }
      }
    });
  }
  
  // Console helper
  window.enableHotspotDebug = function() {
    document.body.setAttribute('data-debug', 'hotspots');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/static/debug-hotspots.css';
    document.head.appendChild(link);
    console.log('🔍 HOTSPOT DEBUG MODE ENABLED');
  };
  
  window.disableHotspotDebug = function() {
    document.body.removeAttribute('data-debug');
    console.log('✅ HOTSPOT DEBUG MODE DISABLED');
  };
})();
