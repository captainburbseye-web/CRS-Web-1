/**
 * DIGITAL PULSE - FUNDERS LANDING PAGE
 * Professional grassroots infrastructure pitch
 * Serious business end - dossier, not blog
 */

export function DigitalPulsePage() {
  return (
    <div style={{ 
      background: '#050505', 
      minHeight: '100vh',
      lineHeight: 1.6
    }}>
      {/* CHASSIS CONTAINER - Rack Rail Unity */}
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderLeft: '24px solid #222',
          borderRight: '24px solid #222',
          position: 'relative',
          minHeight: '100vh',
          padding: '60px 40px'
        }}
      >
        {/* NEON PULSE LOGO - Voltage Hum */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <img 
            src="https://pub-b79b90db3c594763bf7e4c9e96ae461d.r2.dev/digital-pulse-logo-neon.png"
            alt="Digital Pulse"
            className="neon-hum"
            style={{
              maxWidth: '400px',
              width: '100%',
              height: 'auto',
              margin: '0 auto',
              display: 'block'
            }}
          />
        </div>

        {/* IMPACT STATEMENT - The Manifesto */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 80px',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#f5f5f5',
            fontWeight: 'normal',
            marginBottom: '40px'
          }}>
            Cowley Road Studios is the <strong style={{ color: '#00ffff' }}>hardware</strong> running Oxford's creative <strong style={{ color: '#00ffff' }}>software</strong>. We don't just host culture; we repair the infrastructure that keeps it alive. We provide professional-grade technology to grassroots artists who are usually left behind.
          </p>
          
          <p style={{
            fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#FFBF00',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginTop: '30px'
          }}>
            We are the Digital Pulse.<br/>
            We are Grassroots.<br/>
            No doubt.
          </p>
        </div>

        {/* VALUE BLOCKS - 3 Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto 80px'
        }}>
          {/* TECH & INFRASTRUCTURE */}
          <div style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
            border: '2px solid #333',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#00ffff',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Tech & Infrastructure
            </h3>
            <p style={{
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '16px',
              color: '#f5f5f5',
              lineHeight: '1.6'
            }}>
              Repair Labs &amp; Rack Maintenance
            </p>
          </div>

          {/* CREATIVE ACCESS */}
          <div style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
            border: '2px solid #ff00ff',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ff00ff',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Creative Access
            </h3>
            <p style={{
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '16px',
              color: '#f5f5f5',
              lineHeight: '1.6'
            }}>
              Low-Barrier Studio Entry
            </p>
          </div>

          {/* FUTURE-PROOFING */}
          <div style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
            border: '2px solid #333',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FFBF00',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Future-Proofing
            </h3>
            <p style={{
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '16px',
              color: '#f5f5f5',
              lineHeight: '1.6'
            }}>
              Sustainable Creative Ecosystems
            </p>
          </div>
        </div>

        {/* CTA SECTION */}
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* PRIMARY CTA */}
          <a 
            href="mailto:captainburbseye@gmail.com?subject=Digital%20Pulse%20Funding%20Partnership"
            style={{
              display: 'inline-block',
              padding: '20px 50px',
              background: 'transparent',
              border: '3px solid #00ffff',
              color: '#00ffff',
              fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00ffff'
              e.currentTarget.style.color = '#050505'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#00ffff'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
          >
            Partner With Us
          </a>

          {/* SECONDARY LINKS */}
          <div style={{
            marginTop: '30px',
            fontFamily: ''Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif',
            fontSize: '14px',
            color: '#999'
          }}>
            <p>
              Support us via{' '}
              <a href="#" style={{ color: '#ff00ff', textDecoration: 'underline' }}>Patreon</a>
              {' / '}
              <a href="#" style={{ color: '#ff00ff', textDecoration: 'underline' }}>Kickstarter</a>
            </p>
          </div>
        </div>

      </div>

      {/* VOLTAGE HUM ANIMATION CSS */}
      <style>{`
        .neon-hum {
          animation: voltage-hum 4s infinite linear;
          filter: drop-shadow(0 0 10px #00ffff);
        }

        @keyframes voltage-hum {
          0% {
            opacity: 1;
            filter: drop-shadow(0 0 10px #00ffff);
          }
          48% {
            opacity: 1;
            filter: drop-shadow(0 0 12px #00ffff);
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 5px #00ffff);
          }
          52% {
            opacity: 1;
            filter: drop-shadow(0 0 12px #00ffff);
          }
          54% {
            opacity: 1;
            filter: drop-shadow(0 0 10px #00ffff);
          }
          90% {
            opacity: 1;
            filter: drop-shadow(0 0 10px #00ffff);
          }
          92% {
            opacity: 0.98;
            filter: drop-shadow(0 0 8px #00ffff);
          }
          100% {
            opacity: 1;
            filter: drop-shadow(0 0 10px #00ffff);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .neon-hum {
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  )
}
