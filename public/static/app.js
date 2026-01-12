// BOOK NOW PANEL INTERACTION
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('book-now-trigger')
  const dropdown = document.getElementById('book-now-dropdown')
  const panel = document.getElementById('book-now-panel')
  
  if (trigger && dropdown && panel) {
    // Toggle on click
    trigger.addEventListener('click', (e) => {
      e.stopPropagation()
      panel.classList.toggle('active')
    })
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) {
        panel.classList.remove('active')
      }
    })
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        panel.classList.remove('active')
      }
    })
    
    // Close dropdown when link is clicked
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        panel.classList.remove('active')
      })
    })
  }
})
