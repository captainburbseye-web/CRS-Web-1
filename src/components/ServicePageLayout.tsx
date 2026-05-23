/** @jsx jsx */
import { jsx } from 'hono/jsx'

const BOOKING_URLS = {
  RECORDING_BOOK:            'https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX',
  CRICKET_RECORDING_BOOK:    'https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX',
  REHEARSAL_BOOK:            'https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX',
  CRICKET_REHEARSAL_BOOK:    'https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX',
  CONTROL_ROOM_BOOK:         'https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX',
  CRICKET_CONTROL_ROOM_BOOK: 'https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX',
  ENQUIRE_WORKSHOP:          '/contact?service=venue',
  ENQUIRE_ODRO:              '/contact?service=repairs',
}

/* Shared top bar */
const ServiceTopBar = ({ active = '' }) => (
  <nav class="sp-topbar" aria-label="Quick actions">
    <div class="sp-topbar-inner">
      <a href="/" class="sp-topbar-home">← CRS</a>
      <div class="sp-topbar-actions">
        <a href={BOOKING_URLS.REHEARSAL_BOOK}    target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--primary">Book Rehearsal</a>
        <a href={BOOKING_URLS.RECORDING_BOOK}    target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--primary">Book Recording</a>
        <a href={BOOKING_URLS.CONTROL_ROOM_BOOK} target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--secondary">Hire Control Room</a>
        <a href={BOOKING_URLS.ENQUIRE_WORKSHOP}  class="sp-action-btn sp-action-btn--secondary">Venue Enquiries</a>
        <a href="/contact"                        class="sp-action-btn sp-action-btn--ghost">Contact</a>
      </div>
    </div>
  </nav>
)

/* Shared footer */
const ServiceFooter = () => (
  <footer class="sp-footer">
    <div class="sp-footer-inner">
      <span class="sp-footer-brand">Cowley Road Studios · Oxford</span>
      <nav class="sp-footer-links" aria-label="Footer navigation">
        <a href="/recording">Recording</a>
        <a href="/rehearsal">Rehearsal</a>
        <a href="/control-room">Control Room</a>
        <a href="/repairs">Repairs</a>
        <a href="/venue">Venue</a>
        <a href="/workshop-cafe">Café</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </footer>
)

/* Full page wrapper with fonts + CSS */
export const ServicePageShell = ({ title, description, keywords, isCafe = false, children }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Cowley Road Studios</title>
  <meta name="description" content="${description}" />
  ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
  <link rel="canonical" href="https://cowleyroadstudios.com" />
  <link rel="icon" type="image/png" href="/crs-logo.webp" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link href="/static/crs-service-pages.css" rel="stylesheet" />
</head>
<body>
${children}
</body>
</html>`

export { ServiceTopBar, ServiceFooter, BOOKING_URLS }
