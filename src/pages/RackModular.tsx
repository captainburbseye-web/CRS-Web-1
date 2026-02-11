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
  // Get header service for SEO (rendered as static header, not in channel system)
  const headerService = rackServices.find(s => s.id === 'header');

  return (
    <>
      {/* Skip Navigation Link for Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      {/* Header with semantic markup and SEO-optimized alt text */}
      <header>
        <div className="crs-header-container">
          <h1 className="crs-main-title">
            {headerService?.title || 'COWLEY ROAD STUDIOS'}
          </h1>
          <p className="crs-main-description">
            {headerService?.description || 'Professional Recording Studio & Rehearsal Space in Oxford'}
          </p>
        </div>
      </header>
      
      {/* Main content landmark - Hardware Channel System */}
      <main id="main-content" role="main" aria-label="Cowley Road Studios Services">
        <RackChannelSystem defaultChannel="booking-hub" />
      </main>
      
      {/* Footer information (optional) */}
      <footer className="crs-footer" role="contentinfo">
        <p className="footer-text">
          <strong>Cowley Road Studios</strong> — Professional Recording & Rehearsal Space in Oxford
        </p>
        <p className="footer-links">
          <a href="/contact">Contact</a> | 
          <a href="/status">System Status</a> | 
          <a href="/accessibility">Accessibility</a>
        </p>
      </footer>
    </>
  );
};
