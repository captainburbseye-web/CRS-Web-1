import { RackChannelSystem } from '../components/rack/RackChannelSystem';
import { rackServices } from '../data/services';

/**
 * Rack Modular Page: Hardware Channel Selector System
 * 
 * Design Philosophy:
 * - Operates like a console channel strip selector
 * - Single active bay at a time (no attention chaos)
 * - Hardware aesthetic (not web tabs, not dashboard patterns)
 * - LED indicators, metallic surfaces, mechanical transitions
 * 
 * Refactored: Phase 4 - Single Expandable Rack
 * - Replaced stacked accordion with channel selector system
 * - Only one service visible at a time (single focus)
 * - Headers feel like hardware selectors
 * - Main panel feels like the active machine bay
 * - Full WCAG 2.1 AA accessibility preserved
 * 
 * Built by Manus - Hardware-first approach
 */

export const RackModular = () => {
  return (
    <div className="console-screen">
      {/* Skip Navigation Link for Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      {/* System Badge - Not a website header */}
      <div className="system-badge" role="banner">
        <span className="system-badge-led" aria-label="System online"></span>
        <span className="system-badge-text">CRS RACK SYSTEM — ONLINE</span>
      </div>
      
      {/* Main Console Interface */}
      <main id="main-content" role="main" aria-label="Cowley Road Studios Console">
        <RackChannelSystem defaultChannel="booking-hub" />
      </main>
      
      {/* System Status Strip - Not a website footer */}
      <div className="system-status-strip" role="status" aria-live="polite">
        <span className="status-item">SYSTEM: ONLINE</span>
        <span className="status-separator">·</span>
        <span className="status-item">ACCESS: OK</span>
        <span className="status-separator">·</span>
        <span className="status-item">CRS v1.0</span>
      </div>
    </div>
  );
};
