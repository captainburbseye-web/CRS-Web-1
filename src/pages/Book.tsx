/**
 * Unified Booking Page - Single point for all booking types
 * Handles: ?type=rehearsal, ?type=recording, ?type=other
 * Simplifies user journey from 8 options → 3 categories
 */

export const Book = () => {
  // Parse URL query params (simple approach for Hono JSX)
  const urlParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : new URLSearchParams();
  const bookingType = urlParams.get('type') || 'all';

  // Booking options organized by type
  const bookingOptions = {
    rehearsal: [
      {
        title: 'Cowley Rehearsal Room',
        location: 'Cowley Road HQ',
        price: '£15/hr',
        features: ['Full backline', 'PA system', 'Professional monitoring'],
        url: 'https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services'
      },
      {
        title: 'Cricket Rehearsal Room',
        location: 'Cricket Road',
        price: '£12/hr',
        features: ['6m × 4m live room', 'Yamaha CLP piano', 'Drum kit + backline'],
        url: 'https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services'
      }
    ],
    recording: [
      {
        title: 'Cowley Control Room',
        location: 'Cowley Road HQ',
        price: 'From £30/hr',
        features: ['Analog console', 'Outboard gear', 'Isolation booths'],
        url: '/book/studio?location=cowley'
      },
      {
        title: 'Cricket Control Room',
        location: 'Cricket Road',
        price: 'From £25/hr',
        features: ['Live room integration', 'Tracking & mixing', 'Engineer available'],
        url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services'
      },
      {
        title: 'Full Production Services',
        location: 'Both locations',
        price: 'Day rates available',
        features: ['Recording', 'Mixing & mastering', 'Sound design'],
        url: '/book/studio'
      }
    ],
    other: [
      {
        title: 'Music Lessons & Workshops',
        location: 'Both locations',
        price: 'From £25/session',
        features: ['Individual tuition', 'Group workshops', 'Production masterclasses'],
        url: '/book/lessons'
      },
      {
        title: 'AV Equipment Hire',
        location: 'Both locations',
        price: 'Varies',
        features: ['Microphones', 'PA systems', 'Lighting & cameras'],
        url: '/av-services'
      },
      {
        title: 'Venue & Event Space',
        location: 'Both locations',
        price: 'Contact for quote',
        features: ['Live performances', 'Showcases', 'Professional PA & lighting'],
        url: '/book/venue'
      }
    ]
  };

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
          <div class="booking-card">
            <div class="booking-card-header">
              <h3 class="booking-card-title">{option.title}</h3>
              <span class="booking-card-location">{option.location}</span>
            </div>
            
            <div class="booking-card-price">{option.price}</div>
            
            <ul class="booking-card-features">
              {option.features.map((feature) => (
                <li>✓ {feature}</li>
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
