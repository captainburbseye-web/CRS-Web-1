import { RackModule } from '../components/rack/RackModule';
import { SplitRackRow } from '../components/rack/SplitRackRow';
import { Waveform } from '../components/rack/Waveform';
import { rackServices, getSplitServices } from '../data/services';

export const RackModular = () => {
  return (
    <>
      {/* Inject CSS directly into the page */}
      <style>{`
        /* Rack Module Styling with VARIANT SYSTEM */

        :root {
          --steel-bg: rgba(20, 20, 20, 0.95);
          --panel-green: rgba(42, 59, 42, 0.15);
          --panel-command: rgba(50, 40, 20, 0.3);
          --panel-passive: rgba(17, 17, 17, 0.8);
          --mustard: #e3b04b;
          --fire-amber: #ff9f1c;
          --led-green: #c8ff41;
          --led-amber: #ff9f1c;
          --led-red: #ff4136;
        }

        .rack-modular-viewport {
          background-color: #050505;
          min-height: 100vh;
          padding: 0;
        }

        /* Rack container layout - MANUS SPEC: full width, zero gaps */
        .rack-container {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0;
          background-color: var(--steel-bg);
          min-height: 100vh;
        }

        /* Split Row Container - MANUS SPEC: zero gap */
        .split-rack-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        .split-rack-module {
          border-right: 1px solid #222;
        }

        .split-rack-module:last-child {
          border-right: none;
        }

        /* ===== BASE RACK MODULE - MANUS SPEC: gap-free ===== */
        .rack-module {
          background: var(--panel-green);
          border: 3px solid #333;
          border-bottom: 1px solid #222;
          box-shadow: inset 0 0 4px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3);
          padding: 2rem;
          font-family: 'Courier New', monospace;
          position: relative;
          transition: all 0.2s ease;
        }

        /* ===== VARIANT: COMMAND (Interactive/Brighter) ===== */
        .rack-command {
          background: var(--panel-command);
          border: 4px solid var(--fire-amber);
          box-shadow: 
            inset 0 0 8px rgba(255, 159, 28, 0.2),
            0 0 20px rgba(255, 159, 28, 0.3),
            0 4px 16px rgba(0,0,0,0.5);
        }

        .rack-command:hover {
          box-shadow: 
            inset 0 0 12px rgba(255, 159, 28, 0.3),
            0 0 32px rgba(255, 159, 28, 0.5),
            0 4px 20px rgba(0,0,0,0.6);
          transform: translateY(-2px);
        }

        .rack-command .rack-title {
          color: var(--fire-amber);
          text-shadow: 0 0 8px rgba(255, 159, 28, 0.4);
        }

        /* Double screw heads for command modules */
        .rack-command::before,
        .rack-command::after {
          width: 14px !important;
          height: 14px !important;
          background: #777 !important;
          box-shadow: 
            inset 0 0 3px #000,
            0 0 4px rgba(255, 159, 28, 0.3) !important;
        }

        /* ===== VARIANT: RACK (Standard Hardware) ===== */
        .rack-rack {
          background: var(--panel-green);
          border: 3px solid #333;
        }

        .rack-rack:hover {
          border-color: #4a4a4a;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.4);
        }

        /* ===== VARIANT: PASSIVE (Info/Dimmed) ===== */
        .rack-passive {
          background: var(--panel-passive);
          border: 2px solid #222;
          opacity: 0.85;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
        }

        .rack-passive .rack-title {
          color: #999;
          font-style: italic;
        }

        .rack-passive .rack-description {
          color: #888;
        }

        .rack-passive .rack-label {
          color: #888;
        }

        .rack-passive:hover {
          opacity: 0.95;
        }

        /* Waveform content area */
        .rack-module-content {
          margin: 1rem 0;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .waveform {
          opacity: 0.9;
        }

        /* Screw Head Decoration (all 4 corners) */
        .rack-module::before,
        .rack-module::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #555;
          border-radius: 50%;
          box-shadow: inset 0 0 2px #000;
          z-index: 10;
        }

        .rack-module::before {
          top: 6px;
          left: 6px;
        }

        .rack-module::after {
          top: 6px;
          right: 6px;
        }

        /* Bottom screws using pseudo-element on child */
        .rack-module .rack-label-strip::before,
        .rack-module .rack-button-group::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #555;
          border-radius: 50%;
          box-shadow: inset 0 0 2px #000;
          bottom: 6px;
          z-index: 10;
        }

        .rack-module .rack-label-strip::before {
          left: 6px;
        }

        .rack-module .rack-button-group::after {
          right: 6px;
        }

        /* Label Strip + LEDs */
        .rack-label-strip {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          position: relative;
        }

        .rack-label {
          color: var(--mustard);
          font-size: 1rem;
          letter-spacing: 0.08em;
        }

        .led-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--led-green);
          box-shadow: 0 0 8px var(--led-green);
          animation: pulse-led 2s infinite;
          flex-shrink: 0;
        }

        .led-amber {
          background: var(--led-amber);
          box-shadow: 0 0 8px var(--led-amber);
          animation: pulse-led-amber 2s infinite;
        }

        .led-red {
          background: var(--led-red);
          box-shadow: 0 0 8px var(--led-red);
          animation: pulse-led-red 1.5s infinite;
        }

        /* Module Title */
        .rack-title {
          font-size: 1.4rem;
          color: white;
          margin: 0.5rem 0 0.8rem;
        }

        .rack-description {
          color: #e0e0e0;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        /* Buttons */
        .rack-button-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          position: relative;
        }

        .booking-instruction {
          color: var(--mustard);
          font-size: 1rem;
          letter-spacing: 0.06em;
        }

        .rack-button {
          background-color: var(--fire-amber);
          border: 2px solid #ff9f1c;
          padding: 0.85rem 1.75rem;
          min-height: 44px;
          border-radius: 40px;
          color: black;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 0 8px var(--fire-amber);
          cursor: pointer;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.05em;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .rack-button:hover {
          box-shadow: 0 0 14px var(--fire-amber);
          transform: scale(1.03);
        }

        .rack-button:active {
          box-shadow: inset 0 0 6px var(--fire-amber);
          transform: scale(0.98);
        }

        /* LED Pulse Animations */
        @keyframes pulse-led {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 6px var(--led-green);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 12px var(--led-green);
          }
        }

        @keyframes pulse-led-amber {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 6px var(--led-amber);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 12px var(--led-amber);
          }
        }

        @keyframes pulse-led-red {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px var(--led-red);
          }
          50% {
            opacity: 0.4;
            box-shadow: 0 0 16px var(--led-red);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .split-rack-row {
            grid-template-columns: 1fr;
          }
          
          .split-rack-module {
            border-right: none;
            border-bottom: 1px solid #222;
          }
          
          .split-rack-module:last-child {
            border-bottom: none;
          }
          
          .rack-module {
            padding: 1.5rem;
          }
          
          .rack-title {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="rack-modular-viewport">
        <div className="rack-container">
          {/* Row 1: Header (COMMAND) */}
          <RackModule {...rackServices[0]} />

          {/* Row 2: Booking Hub (COMMAND) */}
          <RackModule {...rackServices[1]} />

          {/* Row 3: Rehearsal (RACK - Split) */}
          <SplitRackRow
            left={getSplitServices(3).left!}
            right={getSplitServices(3).right!}
          />

          {/* Row 4: Control Room (RACK - Split) */}
          <SplitRackRow
            left={getSplitServices(4).left!}
            right={getSplitServices(4).right!}
          />

          {/* Row 5: Recording & Production (RACK) */}
          <RackModule {...rackServices[6]}>
            <Waveform color="#c8ff41" amplitude={0.4} frequency={2.5} width={300} height={80} />
          </RackModule>

          {/* Row 6: Music Lessons (RACK) */}
          <RackModule {...rackServices[7]} />

          {/* Row 7: AV Hire (RACK) */}
          <RackModule {...rackServices[8]} />

          {/* Row 8: AV Repairs (RACK) */}
          <RackModule {...rackServices[9]} />

          {/* Row 9: Workshop Café (PASSIVE) */}
          <RackModule {...rackServices[10]} />

          {/* Row 10: Venue Hire (RACK) */}
          <RackModule {...rackServices[11]} />

          {/* Row 11: Contact (PASSIVE) */}
          <RackModule {...rackServices[12]} />

          {/* Row 12: System Status (COMMAND) */}
          <RackModule {...rackServices[13]}>
            <Waveform color="#ff9f1c" amplitude={0.3} frequency={3} width={300} height={60} />
          </RackModule>
        </div>
      </div>
    </>
  );
};
