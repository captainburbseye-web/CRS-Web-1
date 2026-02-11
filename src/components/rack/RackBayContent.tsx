import { FC } from 'hono/jsx';
import type { RackService } from '../../data/services';

/**
 * RackBayContent - Renders content for the active channel only
 * 
 * This component is dynamically rendered based on active channel state.
 * Only ONE instance exists in the DOM at any time (true single-bay architecture).
 */

interface RackBayContentProps {
  channel: RackService;
}

export const RackBayContent: FC<RackBayContentProps> = ({ channel }) => {
  return (
    <div
      id={`channel-panel-${channel.id}`}
      role="tabpanel"
      aria-labelledby={`channel-tab-${channel.id}`}
      data-channel-id={channel.id}
      data-priority={channel.priority || 'normal'}
      class="rack-bay-panel active"
      tabindex={0}
    >
      {/* Hardware-style panel header */}
      <div class="bay-header">
        <div class="bay-header-rail">
          <span class="bay-led active" aria-label="Channel active">●</span>
          <h2 class="bay-title">{channel.title}</h2>
        </div>
        {/* VU meter style decorative element */}
        <div class="bay-header-meter" aria-hidden="true">
          <span class="meter-bar"></span>
          <span class="meter-bar"></span>
          <span class="meter-bar"></span>
        </div>
      </div>
      
      {/* Panel content */}
      <div class="bay-content">
        {/* Description */}
        <div class="bay-description">
          {channel.description}
        </div>
        
        {/* Dropdown services (if applicable) */}
        {channel.dropdownServices && channel.dropdownServices.length > 0 && (
          <div class="bay-dropdown-section">
            <h3 class="bay-section-title">AVAILABLE OPTIONS</h3>
            <div class="bay-dropdown-list">
              {channel.dropdownServices.map((service) => (
                <a 
                  key={service.url}
                  href={service.url} 
                  class="bay-dropdown-item"
                >
                  <span class="dropdown-icon">▸</span>
                  {service.name}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Call-to-action buttons */}
        <div class="bay-actions">
          <a 
            href={channel.url} 
            class={`bay-button bay-button-primary ${channel.variant}`}
            data-variant={channel.variant}
          >
            <span class="button-led" aria-hidden="true">●</span>
            {channel.ctaText || 'BOOK NOW'}
          </a>
          
          {/* Secondary action: View details (only for high-priority services) */}
          {channel.priority === 'high' && (
            <button 
              type="button"
              class="bay-button bay-button-secondary"
              data-action="view-details"
              data-channel-id={channel.id}
            >
              <span class="button-icon" aria-hidden="true">📋</span>
              VIEW FULL SPECS
            </button>
          )}
        </div>
      </div>
      
      {/* Hardware-style panel footer rail */}
      <div class="bay-footer-rail" aria-hidden="true">
        <span class="rail-indicator"></span>
        <span class="rail-indicator"></span>
        <span class="rail-indicator"></span>
      </div>
    </div>
  );
};
