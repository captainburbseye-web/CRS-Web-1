/**
 * QR Code Generator for Signage
 * Vanilla JS implementation using QRCode.js library (loaded from CDN)
 */

(function() {
  'use strict';

  // Simple QR code generation using DOM Canvas
  function generateQRCode(container, url) {
    // Check if QRCode library is available (from CDN)
    if (typeof QRCode !== 'undefined') {
      new QRCode(container, {
        text: url,
        width: 184,
        height: 184,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    } else {
      // Fallback: Display URL text
      container.innerHTML = `
        <div style="padding: 20px; text-align: center; font-size: 0.8rem; word-break: break-all;">
          ${url}
        </div>
      `;
    }
  }

  // Initialize QR codes for all slides
  function initQRCodes() {
    const qrContainers = document.querySelectorAll('.signage-qr-code');
    
    qrContainers.forEach(container => {
      const url = container.dataset.url;
      if (url) {
        generateQRCode(container, url);
      }
    });
  }

  // Load QRCode.js library from CDN
  function loadQRCodeLibrary() {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (typeof QRCode !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Initialize
  loadQRCodeLibrary()
    .then(() => {
      initQRCodes();
    })
    .catch(() => {
      console.warn('QRCode library failed to load, using fallback');
      initQRCodes(); // Still call init to show fallback URLs
    });

  // Re-initialize if DOM changes (for dynamic content)
  const observer = new MutationObserver(() => {
    initQRCodes();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
