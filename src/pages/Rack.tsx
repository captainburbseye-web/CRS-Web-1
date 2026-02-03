export const Rack = () => {
  const modules = [
    {
      id: 'cowley-rehearsals',
      title: 'COWLEY ROAD — REHEARSALS',
      video: 3,
      squareLink: 'https://square.link/u/UQidDzE0?src=embed',
      status: 'ACTIVE',
      description: '118 Cowley Road · £45 / 2 hours',
      led: 'green'
    },
    {
      id: 'cricket-rehearsals',
      title: 'CRICKET ROAD — REHEARSALS',
      video: 5,
      squareLink: 'https://square.link/u/WPqRFIGW?src=embed',
      status: 'ACTIVE',
      description: '92 Cricket Road · Hourly rates',
      led: 'green'
    },
    {
      id: 'control-room',
      title: 'CONTROL ROOM — DRY HIRE',
      video: 7,
      squareLink: 'https://square.link/u/bCOHXtdl?src=embed',
      status: 'ACTIVE',
      description: '92 Cricket Road · No engineer',
      led: 'green'
    },
    {
      id: 'av-services',
      title: 'AV SERVICES — HIRE & REPAIR',
      video: 11,
      squareLink: 'https://square.link/u/AVServiceLink',
      status: 'ACTIVE',
      description: 'Equipment rental & technical support',
      led: 'green'
    },
    {
      id: 'workshop-cafe',
      title: 'WORKSHOP CAFÉ',
      video: 10,
      squareLink: 'https://square.link/u/WorkshopCafeLink',
      status: 'ACTIVE',
      description: 'Co-working · Events · AI workshops',
      led: 'green'
    },
    {
      id: 'live-services',
      title: 'LIVE SERVICES',
      video: 2,
      squareLink: 'https://square.link/u/LiveServicesLink',
      status: 'ACTIVE',
      description: 'Sound & lighting for events',
      led: 'green'
    },
    {
      id: 'music-lessons',
      title: 'MUSIC LESSONS',
      video: 1,
      squareLink: 'https://square.link/u/MusicLessonsLink',
      status: 'ACTIVE',
      description: 'One-on-one & group instruction',
      led: 'green'
    },
    {
      id: 'studio-hire',
      title: 'STUDIO HIRE',
      video: 7,
      squareLink: 'https://square.link/u/StudioHireLink',
      status: 'ACTIVE',
      description: '92 Cricket Road · Full production',
      led: 'green'
    },
    {
      id: 'contact',
      title: 'CONTACT',
      video: 23,
      squareLink: 'mailto:info@crsoxford.com',
      status: 'ACTIVE',
      description: 'info@crsoxford.com · +44 1865 722027',
      led: 'green'
    },
    {
      id: 'system',
      title: 'SYSTEM',
      video: 12,
      squareLink: 'https://crsoxford.com',
      status: 'ACTIVE',
      description: 'Cowley Road Studios · Oxford',
      led: 'green'
    }
  ];

  return (
    <>
      <div class="rack-console">
        <div class="rack-header">
          <h1 class="rack-title">COWLEY ROAD STUDIOS — RACK CONSOLE</h1>
          <p class="rack-subtitle">Signal routing · Booking surface · System status</p>
        </div>

        <div class="rack-modules">
          {modules.map((module) => (
            <div class={`rack-module rack-module-${module.id}`} key={module.id}>
              {/* VIDEO BACKGROUND */}
              <div class="rack-module-video">
                <video
                  autoplay
                  muted
                  loop
                  class="rack-video-bg"
                  src={`https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/${module.video}.mp4`}
                />
              </div>

              {/* MODULE PANEL */}
              <div class="rack-module-panel">
                {/* LED STATUS */}
                <div class={`rack-led rack-led-${module.led}`} title={module.status} />

                {/* SERVICE LABEL */}
                <h2 class="rack-module-title">{module.title}</h2>

                {/* DESCRIPTION */}
                <p class="rack-module-description">{module.description}</p>

                {/* CTA BUTTON */}
                <a href={module.squareLink} target="_blank" rel="noopener" class="rack-cta">
                  BOOK NOW
                </a>

                {/* QR CODE CONTAINER */}
                <div class="rack-qr-container">
                  <div class="rack-qr" id={`qr-${module.id}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SYSTEM FOOTER */}
        <div class="rack-footer-system">
          <p>© 2026 CRS · POWERED BY 0DR0 ENGINEERING</p>
          <p>Cowley Road Studios · Oxford · OX4 1JE</p>
        </div>
      </div>

      {/* QR CODE LIBRARY */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" />
      <script>
        {`
          // Generate QR codes for each module
          const modules = ${JSON.stringify(modules)};
          modules.forEach(module => {
            const qrContainer = document.getElementById('qr-' + module.id);
            if (qrContainer) {
              new QRCode(qrContainer, {
                text: module.squareLink,
                width: 100,
                height: 100,
                colorDark: '#ffffff',
                colorLight: '#0D1912'
              });
            }
          });
        `}
      </script>
    </>
  );
};
