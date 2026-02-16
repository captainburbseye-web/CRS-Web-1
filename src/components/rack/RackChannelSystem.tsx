import { FC } from 'hono/jsx';
import { rackServices } from '../../data/services';
import type { RackService } from '../../data/services';
import { RackBayContent } from './RackBayContent';

/**
 * RackChannelSystem - Hardware-style channel selector with single active bay
 * 
 * Design Philosophy:
 * - Operates like a console channel strip selector
 * - Only ONE service active at a time (TRUE single focus - only active panel in DOM)
 * - Headers feel like hardware selectors, not web tabs
 * - Main panel feels like the active machine bay
 * - Inactive services are visibly dormant (dim LEDs, standby mode)
 * 
 * Interaction Model:
 * - Click channel selector → switch active bay
 * - Smooth 250ms transitions with power-on/power-down feel
 * - LED indicators show active/inactive state
 * - Keyboard navigation: Arrow keys, Home/End, Enter/Space
 * - Mobile: Horizontal scrollable channel bar with snap points
 * 
 * REFACTORED: Now only renders active panel content (no hidden panels in DOM)
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
            </button>
          );
        })}
      </div>
      
      {/* Main Bay - ONLY Active Channel Content (no hidden panels) */}
      <div class="rack-main-bay" aria-live="polite" data-active-channel={defaultChannelData.id}>
        <RackBayContent channel={defaultChannelData} />
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
