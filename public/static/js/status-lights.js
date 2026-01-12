/**
 * CRS Infrastructure Status Light System
 * Loads status from JSON and renders status indicators
 */

class InfrastructureStatus {
  constructor(configPath = '/infrastructure-status.json') {
    this.configPath = configPath;
    this.data = null;
  }

  /**
   * Load status configuration from JSON file
   */
  async load() {
    try {
      const response = await fetch(this.configPath);
      if (!response.ok) {
        throw new Error(`Failed to load status config: ${response.status}`);
      }
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error('Error loading infrastructure status:', error);
      return null;
    }
  }

  /**
   * Create a status light element
   * @param {string} status - 'operational', 'partial', 'offline', or 'disabled'
   * @param {boolean} large - Use larger size
   */
  createStatusLight(status, large = false) {
    const light = document.createElement('span');
    light.className = `status-light ${status}`;
    if (large) {
      light.classList.add('status-light-large');
    }
    light.setAttribute('role', 'img');
    light.setAttribute('aria-label', `Status: ${status}`);
    return light;
  }

  /**
   * Create a status label element
   * @param {string} status - Status state
   * @param {string} label - Label text
   */
  createStatusLabel(status, label) {
    const labelEl = document.createElement('span');
    labelEl.className = `room-status-label ${status}`;
    labelEl.textContent = label;
    return labelEl;
  }

  /**
   * Create a status indicator with light and label
   * @param {string} status - Status state
   * @param {string} label - Label text
   */
  createStatusIndicator(status, label) {
    const container = document.createElement('div');
    container.className = 'status-indicator';
    
    const light = this.createStatusLight(status);
    const labelEl = document.createElement('span');
    labelEl.className = 'status-indicator-label';
    labelEl.textContent = label;
    
    container.appendChild(light);
    container.appendChild(labelEl);
    
    return container;
  }

  /**
   * Render status lights for all rooms
   * Assumes HTML structure with data-room-id attributes
   */
  renderRoomStatus() {
    if (!this.data || !this.data.rooms) {
      console.warn('No status data available');
      return;
    }

    this.data.rooms.forEach(room => {
      // Find room element by data attribute
      const roomElement = document.querySelector(`[data-room-id="${room.id}"]`);
      if (!roomElement) {
        console.warn(`Room element not found: ${room.id}`);
        return;
      }

      // Add status light to room title
      const titleElement = roomElement.querySelector('.room-title');
      if (titleElement) {
        // Clear existing status lights
        const existingLight = titleElement.querySelector('.status-light');
        if (existingLight) {
          existingLight.remove();
        }
        
        // Add new status light at the beginning
        const light = this.createStatusLight(room.status, true);
        titleElement.insertBefore(light, titleElement.firstChild);
      }

      // Add status label
      const headerElement = roomElement.querySelector('.room-header');
      if (headerElement) {
        // Clear existing status label
        const existingLabel = headerElement.querySelector('.room-status-label');
        if (existingLabel) {
          existingLabel.remove();
        }
        
        // Add new status label
        const label = this.createStatusLabel(room.status, room.statusLabel);
        headerElement.appendChild(label);
      }

      // Render component status if component list exists
      const componentList = roomElement.querySelector('.component-list');
      if (componentList && room.components) {
        componentList.innerHTML = ''; // Clear existing items
        
        room.components.forEach(component => {
          const item = document.createElement('li');
          item.className = 'component-item';
          
          const light = this.createStatusLight(component.status);
          const name = document.createElement('span');
          name.textContent = component.name;
          
          item.appendChild(light);
          item.appendChild(name);
          componentList.appendChild(item);
        });
      }
    });
  }

  /**
   * Update system status banner
   */
  updateSystemBanner() {
    if (!this.data || !this.data.rooms) return;

    const banner = document.querySelector('.system-status-banner');
    if (!banner) return;

    // Calculate overall system status
    const statuses = this.data.rooms.map(r => r.status);
    const allOperational = statuses.every(s => s === 'operational');
    const anyOffline = statuses.some(s => s === 'offline');
    
    let overallStatus = 'partial';
    if (allOperational) {
      overallStatus = 'operational';
    } else if (anyOffline) {
      overallStatus = 'offline';
    }

    // Update banner class
    banner.className = `system-status-banner ${overallStatus}`;
  }

  /**
   * Initialize the status system
   */
  async init() {
    await this.load();
    if (this.data) {
      this.renderRoomStatus();
      this.updateSystemBanner();
    }
  }

  /**
   * Refresh status data and re-render
   */
  async refresh() {
    await this.init();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.infrastructureStatus = new InfrastructureStatus();
    window.infrastructureStatus.init();
  });
} else {
  window.infrastructureStatus = new InfrastructureStatus();
  window.infrastructureStatus.init();
}

// Optional: Auto-refresh every 30 seconds
// setInterval(() => {
//   if (window.infrastructureStatus) {
//     window.infrastructureStatus.refresh();
//   }
// }, 30000);
