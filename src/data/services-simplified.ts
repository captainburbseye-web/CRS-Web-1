// SIMPLIFIED SERVICE STRUCTURE - Service-First Approach
// Fewer modules, each contains location options
// Best practice: Users think "I need rehearsal" not "I need Cowley"

export interface LocationOption {
  location: string;
  price: string;
  description: string;
  url: string;
  features?: string[];
}

export interface SimplifiedService {
  id: string;
  title: string;
  icon: string;
  description: string;
  variant: 'command' | 'rack' | 'passive';
  ledColor: 'green' | 'amber' | 'red';
  
  // Either single URL or multiple locations
  url?: string;
  locations?: LocationOption[];
  
  // For services without locations
  ctaText?: string;
}

export const simplifiedServices: SimplifiedService[] = [
  // 1. BOOKING HUB (Command module)
  {
    id: 'booking-hub',
    title: 'BOOK NOW',
    icon: '📅',
    description: 'Quick booking for all services. Instant confirmation and flexible scheduling.',
    variant: 'command',
    ledColor: 'green',
    url: '/book',
    ctaText: 'START BOOKING',
  },

  // 2. REHEARSAL SPACES (Service with locations)
  {
    id: 'rehearsal',
    title: 'REHEARSAL SPACES',
    icon: '🎸',
    description: 'Professional rehearsal rooms with full backline, PA systems, and monitoring. View full details or book directly below:',
    variant: 'rack',
    ledColor: 'green',
    url: '/rehearsal', // Link to detailed page
    ctaText: 'VIEW DETAILS',
    locations: [
      {
        location: 'COWLEY ROAD',
        price: '£45 (2hrs) | £60 (3hrs) | £65 (4hrs)',
        description: 'Main HQ location. Full backline, PA system, and professional monitoring. Max 4 members.',
        url: 'https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services',
        features: ['Full backline', 'PA system', 'Monitoring', 'Max 4 members']
      },
      {
        location: 'CRICKET ROAD',
        price: '£40 (2hrs) | £55 (3hrs) | £60 (4hrs)',
        description: '6m × 4m live room with Yamaha CLP piano, drum kit, backline, and vocal mics.',
        url: 'https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services',
        features: ['Yamaha CLP piano', 'Drum kit', 'Vocal mics', 'Intimate space']
      }
    ]
  },

  // 3. RECORDING STUDIOS (Service with locations)
  {
    id: 'recording',
    title: 'RECORDING STUDIOS',
    icon: '🎛️',
    description: 'Professional recording and production facilities. Full-service audio production with experienced engineers.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'COWLEY CONTROL ROOM',
        price: 'From £30/hour',
        description: 'High-end recording facility with analog console, outboard gear, and isolation booths.',
        url: '/book/studio?location=cowley',
        features: ['Analog console', 'Outboard gear', 'Isolation booths', 'Premium equipment']
      },
      {
        location: 'CRICKET CONTROL ROOM',
        price: 'From £25/hour',
        description: 'Compact control room with live room integration. Perfect for tracking and basic mixing.',
        url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services',
        features: ['Integrated live room', 'Tracking setup', 'Mixing capabilities', 'Cost-effective']
      }
    ]
  },

  // 4. PRODUCTION SERVICES
  {
    id: 'production',
    title: 'PRODUCTION SERVICES',
    icon: '🎚️',
    description: 'Full-service audio production: recording, mixing, mastering, tape transfer, and sound design. Experienced engineers available. Day rates available.',
    variant: 'rack',
    ledColor: 'green',
    url: '/book/studio',
    ctaText: 'BOOK SESSION',
  },

  // 5. LESSONS & WORKSHOPS
  {
    id: 'lessons',
    title: 'LESSONS & WORKSHOPS',
    icon: '🎓',
    description: 'Professional music tuition and creative workshops. Individual lessons, group sessions, and production masterclasses. Available at both Cowley and Cricket locations.',
    variant: 'rack',
    ledColor: 'green',
    url: '/book/lessons',
    ctaText: 'SCHEDULE LESSON',
  },

  // 6. AV SERVICES
  {
    id: 'av-services',
    title: 'AV EQUIPMENT & REPAIRS',
    icon: '🔧',
    description: 'Professional equipment hire and expert repair services. Microphones, PA systems, lighting, cameras, and backline rental. Amplifier and mixer repairs, vintage gear restoration.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'EQUIPMENT HIRE',
        price: 'Quote on request',
        description: 'Professional audio and visual equipment rental for events, productions, and performances.',
        url: '/av-services',
      },
      {
        location: 'REPAIRS & SERVICING',
        price: 'Quote on request',
        description: 'Expert repair and maintenance for audio equipment. Vintage gear specialists.',
        url: '/av-services/repairs',
      }
    ]
  },

  // 7. WORKSHOP CAFÉ & VENUE (Combined module)
  {
    id: 'cafe',
    title: 'WORKSHOP CAFÉ',
    icon: '☕',
    description: 'Bookable public-facing venue space. Daily café service, event hire, and community gatherings.',
    variant: 'passive',
    ledColor: 'green',
    locations: [
      {
        location: 'DAILY CAFÉ',
        price: 'Free entry',
        description: 'Specialty coffee, coworking space, and community hub. Open daily.',
        url: '/cafe',
      },
      {
        location: 'EVENT BOOKING',
        price: '£150 for 5 hours',
        description: 'Full venue hire for gigs, listening sessions, film screenings. Capacity: 25 seated, up to 60 standing. PA and lighting included.',
        url: '/book/venue',
        features: ['Professional PA', 'Stage lighting', 'Up to 60 capacity', 'AV equipment']
      }
    ]
  },

  // 9. CONTACT (Passive module)
  {
    id: 'contact',
    title: 'CONTACT & ENQUIRIES',
    icon: '📞',
    description: 'Get in touch with the Cowley Road Studios team. General enquiries, technical support, and booking assistance.',
    variant: 'passive',
    ledColor: 'green',
    url: '/contact',
    ctaText: 'CONTACT US',
  },
];

// Helper to get service by ID
export const getServiceById = (id: string) => 
  simplifiedServices.find(s => s.id === id);

// Count total services
export const getTotalServices = () => simplifiedServices.length;
