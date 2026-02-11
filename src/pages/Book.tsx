/**
 * Unified Booking Page - Single point for all booking types
 * Handles: ?type=rehearsal, ?type=recording, ?type=other
 * Simplifies user journey from 8 options → 3 categories
 */

import { bookingOptions } from '../data/bookingData';

export const Book = () => {
  // Parse URL query params (simple approach for Hono JSX)
  const urlParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : new URLSearchParams();
  const bookingType = urlParams.get('type') || 'all';

  // Get relevant options based on type
  const getOptions = () => {
    if (bookingType === 'rehearsal') return bookingOptions.rehearsal;
    if (bookingType === 'recording') return bookingOptions.recording;
    if (bookingType === 'other') return bookingOptions.other;
    // Show all if no type specified
    return [
      ...bookingOptions.rehearsal,
      ...bookingOptions.recording,
      ...bookingOptions.other
    ];
  };

  const options = getOptions();

  // Page title based on type
  const getTitle = () => {
    if (bookingType === 'rehearsal') return '🎸 Book Rehearsal Room';
    if (bookingType === 'recording') return '🎛️ Book Recording Session';
    if (bookingType === 'other') return '🎓 Book Lessons, Equipment or Venue';
    return '📅 Book Your Session';
  };

  const getDescription = () => {
    if (bookingType === 'rehearsal') return 'Choose your rehearsal space. Both locations offer professional backline, PA systems, and flexible hourly rates.';
    if (bookingType === 'recording') return 'Professional recording and production facilities. Experienced engineers available. Day rates and packages available.';
    if (bookingType === 'other') return 'Music lessons, equipment hire, and venue bookings. Contact us for custom packages and group rates.';
    return 'Select your service type below. All bookings include instant confirmation and flexible scheduling.';
  };

  return (
    <div class="booking-page">
      {/* Header */}
      <div class="booking-header">
        <h1 class="booking-title">{getTitle()}</h1>
        <p class="booking-description">{getDescription()}</p>
        
        {/* Type selector (if viewing all) */}
        {bookingType === 'all' && (
          <div class="booking-type-selector">
            <a href="/book?type=rehearsal" class="type-button">
              🎸 Rehearsal Rooms
            </a>
            <a href="/book?type=recording" class="type-button">
              🎛️ Recording & Production
            </a>
            <a href="/book?type=other" class="type-button">
              🎓 Lessons, Equipment & Venue
            </a>
          </div>
        )}
      </div>

      {/* Booking Options Grid */}
      <div class="booking-options-grid">
        {options.map((option) => (
          <div class="booking-card" key={option.url}>
            <div class="booking-card-header">
              <h3 class="booking-card-title">{option.title}</h3>
              <span class="booking-card-location">{option.location}</span>
            </div>
            
            <div class="booking-card-price">{option.price}</div>
            
            <ul class="booking-card-features">
              {option.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            
            <a 
              href={option.url} 
              class="booking-card-button"
              target={option.url.startsWith('http') ? '_blank' : '_self'}
              rel={option.url.startsWith('http') ? 'noopener noreferrer' : ''}
            >
              Book Now
            </a>
          </div>
        ))}
      </div>

      {/* Back to rack */}
      <div class="booking-footer">
        <a href="/rack-modular" class="back-to-rack">
          ← Back to All Services
        </a>
      </div>
    </div>
  );
};
