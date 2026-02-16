/**
 * BOOKING WIZARD - Progressive Disclosure System
 * 
 * Implements 3-step booking flow for BOOK NOW hub:
 * Step 1: Service Type (Rehearsal / Recording / Other)
 * Step 2: Location (Cowley / Cricket) - if applicable
 * Step 3: Confirmation + Book button
 * 
 * Enhances UX by reducing cognitive load and guiding users through decision tree.
 */

document.addEventListener('DOMContentLoaded', function() {
  initBookingWizard();
});

function initBookingWizard() {
  // Only activate on BOOK NOW channel
  const bookingDropdownSection = document.querySelector('[data-channel-id="booking-hub"] .bay-dropdown-section');
  
  if (!bookingDropdownSection) return;
  
  // Transform static links into interactive wizard
  const dropdownItems = bookingDropdownSection.querySelectorAll('.bay-dropdown-item');
  
  dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const label = this.textContent.trim();
      
      // Determine service type from URL
      const serviceType = href.includes('rehearsal') ? 'rehearsal' : 
                         href.includes('recording') ? 'recording' : 'other';
      
      // Show step 2 (location) if rehearsal/recording
      if (serviceType === 'rehearsal' || serviceType === 'recording') {
        showLocationStep(serviceType, label);
      } else {
        // Direct booking for "other" category
        window.location.href = href;
      }
    });
  });
}

function showLocationStep(serviceType, serviceLabel) {
  const bayContent = document.querySelector('[data-channel-id="booking-hub"] .bay-content');
  
  if (!bayContent) return;
  
  // Store original content for back button
  const originalHTML = bayContent.innerHTML;
  
  // Render step 2: Location selection
  bayContent.innerHTML = `
    <button class="wizard-back-button" aria-label="Back to service selection">
      ‹ Back
    </button>
    
    <div class="wizard-step-indicator">
      <span class="step completed">1</span>
      <span class="step-divider"></span>
      <span class="step active">2</span>
      <span class="step-divider"></span>
      <span class="step">3</span>
    </div>
    
    <h3 class="wizard-title">Choose Location</h3>
    <p class="wizard-description">
      Select your preferred ${serviceLabel.toLowerCase()} location:
    </p>
    
    <div class="wizard-options">
      <button class="wizard-option-card" data-location="cowley">
        <div class="option-icon">🎛️</div>
        <div class="option-title">Cowley Road HQ</div>
        <div class="option-description">
          Professional ${serviceType} facility with full backline
        </div>
        <div class="option-price">${serviceType === 'rehearsal' ? '£15/hr' : 'From £30/hr'}</div>
      </button>
      
      <button class="wizard-option-card" data-location="cricket">
        <div class="option-icon">🎸</div>
        <div class="option-title">Cricket Road</div>
        <div class="option-description">
          Compact ${serviceType} space perfect for small groups
        </div>
        <div class="option-price">${serviceType === 'rehearsal' ? '£12/hr' : 'From £25/hr'}</div>
      </button>
    </div>
  `;
  
  // Attach back button handler
  bayContent.querySelector('.wizard-back-button').addEventListener('click', function() {
    bayContent.innerHTML = originalHTML;
    initBookingWizard(); // Reinitialize after restoring
  });
  
  // Attach location selection handlers
  bayContent.querySelectorAll('.wizard-option-card').forEach(card => {
    card.addEventListener('click', function() {
      const location = this.getAttribute('data-location');
      showConfirmationStep(serviceType, serviceLabel, location, originalHTML);
    });
  });
}

function showConfirmationStep(serviceType, serviceLabel, location, originalHTML) {
  const bayContent = document.querySelector('[data-channel-id="booking-hub"] .bay-content');
  
  if (!bayContent) return;
  
  const locationName = location === 'cowley' ? 'Cowley Road HQ' : 'Cricket Road';
  const bookingURL = `/book?type=${serviceType}&location=${location}`;
  
  // Render step 3: Confirmation
  bayContent.innerHTML = `
    <button class="wizard-back-button" aria-label="Back to location selection">
      ‹ Back
    </button>
    
    <div class="wizard-step-indicator">
      <span class="step completed">1</span>
      <span class="step-divider"></span>
      <span class="step completed">2</span>
      <span class="step-divider"></span>
      <span class="step active">3</span>
    </div>
    
    <h3 class="wizard-title">Confirm Booking</h3>
    
    <div class="wizard-summary">
      <div class="summary-row">
        <span class="summary-label">Service:</span>
        <span class="summary-value">${serviceLabel}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Location:</span>
        <span class="summary-value">${locationName}</span>
      </div>
    </div>
    
    <p class="wizard-description">
      Ready to book your session? Click below to choose your date and time.
    </p>
    
    <div class="bay-actions">
      <a href="${bookingURL}" class="bay-button bay-button-primary command">
        <span class="button-led">●</span>
        PROCEED TO BOOKING
      </a>
    </div>
  `;
  
  // Attach back button handler
  bayContent.querySelector('.wizard-back-button').addEventListener('click', function() {
    showLocationStep(serviceType, serviceLabel);
  });
}
