import { FC } from 'hono/jsx';
import { rackServices } from '../../data/services';
import type { RackService } from '../../data/services';

/**
 * RackChannelSystem - Hardware-style channel selector with single active bay
 * 
 * Design Philosophy:
 * - Operates like a console channel strip selector
 * - Only ONE service active at a time (single focus, zero attention chaos)
 * - Headers feel like hardware selectors, not web tabs
 * - Main panel feels like the active machine bay
 * - Inactive services are visibly dormant (dim LEDs, standby mode)
 * 
 * Interaction Model:
 * - Click channel selector → switch active bay
 * - Smooth 200ms transitions with power-on/power-down feel
 * - LED indicators show active/inactive state
 * - Keyboard navigation: Arrow keys, Home/End, Enter/Space
 * - Mobile: Horizontal scrollable channel bar with snap points
 */

interface RackChannelSystemProps {
  defaultChannel?: string; // Default active channel ID
}

export const RackChannelSystem: FC<RackChannelSystemProps> = ({ 
  defaultChannel = 'booking-hub' 
}) => {
  // Filter out header module - it's not a selectable channel
  const channels = rackServices.filter(service => service.id !== 'header');
  
  // Find default channel or fallback to first channel
  const defaultChannelData = channels.find(c => c.id === defaultChannel) || channels[0];
  
  return (
    <div class="rack-channel-system" data-component="rack-channel-system">
      {/* Channel Selector Bar - Hardware-style tabs */}
      <div 
        class="rack-channel-selector" 
        role="tablist" 
        aria-label="Studio Services Channel Selector"
        data-scroll-snap="true"
      >
        {channels.map((channel, index) => {
          const isDefault = channel.id === defaultChannelData.id;
          
          return (
            <button
              key={channel.id}
              type="button"
              role="tab"
              id={`channel-tab-${channel.id}`}
              aria-controls={`channel-panel-${channel.id}`}
              aria-selected={isDefault ? 'true' : 'false'}
              data-channel-id={channel.id}
              data-priority={channel.priority || 'normal'}
              data-led-color={channel.ledColor}
              class={`rack-channel-button${isDefault ? ' active' : ''}`}
              tabindex={isDefault ? 0 : -1}
            >
              {/* LED Indicator */}
              <span 
                class="channel-led" 
                data-led-state={isDefault ? 'active' : 'inactive'}
                aria-hidden="true"
              >
                ●
              </span>
              
              {/* Channel Label */}
              <span class="channel-label">
                {channel.title}
              </span>
              
              {/* Optional: Channel number */}
              <span class="channel-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Main Bay - Active Channel Content */}
      <div class="rack-main-bay" aria-live="polite">
        {channels.map((channel) => {
          const isDefault = channel.id === defaultChannelData.id;
          
          return (
            <div
              key={channel.id}
              id={`channel-panel-${channel.id}`}
              role="tabpanel"
              aria-labelledby={`channel-tab-${channel.id}`}
              data-channel-id={channel.id}
              data-priority={channel.priority || 'normal'}
              class={`rack-bay-panel${isDefault ? ' active' : ''}`}
              hidden={!isDefault}
              tabindex={isDefault ? 0 : -1}
            >
              {/* Hardware-style panel header */}
              <div class="bay-header">
                <div class="bay-header-rail">
                  <span class="bay-led active" aria-label="Channel active">●</span>
                  <h2 class="bay-title">{channel.title}</h2>
                  {channel.priority === 'high' && (
                    <span class="bay-badge priority-high" aria-label="Priority service">
                      PRIORITY
                    </span>
                  )}
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
                
                {/* Split services display (if applicable) */}
                {channel.isSplit && (
                  <div class="bay-split-indicator" aria-label={`Split position: ${channel.splitPosition}`}>
                    <span class="split-label">
                      POSITION: {channel.splitPosition?.toUpperCase()}
                    </span>
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
                  
                  {/* Secondary action: View details */}
                  {channel.priority === 'high' && (
                    <button 
                      type="button"
                      class="bay-button bay-button-secondary"
                      data-action="view-details"
                      data-channel-id={channel.id}
                    >
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
        })}
      </div>
      
      {/* Status bar (optional) */}
      <div class="rack-status-bar" role="status" aria-live="polite">
        <span class="status-indicator" aria-hidden="true">●</span>
        <span class="status-text">SYSTEM OPERATIONAL</span>
        <span class="status-channels">
          {channels.length} CHANNELS AVAILABLE
        </span>
      </div>
    </div>
  );
};
