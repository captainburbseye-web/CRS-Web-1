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
    title: 'COMMISSION ALLOCATION',
    icon: '📅',
    description: 'Pre-completion allocations available at commissioning rates. Cricket Road operates at standard live rates.',
    variant: 'command',
    ledColor: 'green',
    url: '/book',
    ctaText: 'VIEW ALLOCATIONS',
  },

  // 2. REHEARSAL SPACES (Service with locations)
  {
    id: 'rehearsal',
    title: 'REHEARSAL ROOMS',
    icon: '🎸',
    description: 'Acoustically treated rooms with independent access. Available now at Cricket Road.',
    variant: 'rack',
    ledColor: 'green',
    url: '/rehearsal', // Link to detailed page
    ctaText: 'VIEW ROOMS',
    locations: [
      {
        location: 'COWLEY ROAD',
        price: '£45 (2hrs) | £60 (3hrs) | £65 (4hrs)',
        description: 'Commissioning allocation. Full backline, PA system, monitoring. Max 4 members.',
        url: 'https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services',
        features: ['Full backline', 'PA system', 'Monitoring', 'Max 4 members']
      },
      {
        location: 'CRICKET ROAD',
        price: '£40 (2hrs) | £55 (3hrs) | £60 (4hrs)',
        description: 'Operational. 6m × 4m live room with Yamaha CLP piano, drum kit, backline, vocal mics.',
        url: 'https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services',
        features: ['Yamaha CLP piano', 'Drum kit', 'Vocal mics', 'Independent access']
      }
    ]
  },

  // 3. RECORDING STUDIOS (Service with locations)
  {
    id: 'recording',
    title: 'RECORDING & PRODUCTION',
    icon: '🎛️',
    description: 'Multi-room recording infrastructure with engineering support. Suitable for acoustic, band, and vocal sessions.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'COWLEY CONTROL ROOM',
        price: 'From £30/hour',
        description: 'Commissioning allocation. Analog console, outboard gear, isolation booths.',
        url: '/book/studio?location=cowley',
        features: ['Analog console', 'Outboard gear', 'Isolation booths', 'Commissioning rate']
      },
      {
        location: 'CRICKET CONTROL ROOM',
        price: 'From £25/hour',
        description: 'Operational. Compact control room with live room integration for tracking and mixing.',
        url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services',
        features: ['Integrated live room', 'Tracking setup', 'Mixing capabilities', 'Operational']
      }
    ]
  },

  // 4. PODCAST / AV SUITE
  {
    id: 'production',
    title: 'PODCAST / AV SUITE',
    icon: '🎚️',
    description: 'Dedicated spoken-word and broadcast setup. Engineered support available.',
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
    description: 'Individual tuition and group sessions. Production, instrument, and technical workshops.',
    variant: 'rack',
    ledColor: 'green',
    url: '/book/lessons',
    ctaText: 'SCHEDULE LESSON',
  },

  // 6. REPAIRS & DIAGNOSTICS
  {
    id: 'av-services',
    title: 'REPAIRS & DIAGNOSTICS',
    icon: '🔧',
    description: 'Bench diagnostics and component-level repair. Vintage and modern signal paths supported.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'EQUIPMENT HIRE',
        price: 'Quote on request',
        description: 'Professional audio and visual equipment rental for events and productions.',
        url: '/av-services',
      },
      {
        location: 'REPAIRS & SERVICING',
        price: 'Quote on request',
        description: 'Component-level diagnostics and repair. Vintage gear specialists.',
        url: '/av-services/repairs',
      }
    ]
  },

  // 7. WORKSHOP CAFÉ
  {
    id: 'cafe',
    title: 'WORKSHOP CAFÉ',
    icon: '☕',
    description: 'Front-of-house workspace and event venue. Available for hire under commissioning schedule.',
    variant: 'passive',
    ledColor: 'green',
    locations: [
      {
        location: 'DAILY CAFÉ',
        price: 'Free entry',
        description: 'Specialty coffee, coworking space, community hub.',
        url: '/cafe',
      },
      {
        location: 'EVENT BOOKING',
        price: '£150 for 5 hours',
        description: 'Commissioning allocation. Venue hire for events. Capacity: 25 seated, 60 standing. PA and lighting included.',
        url: '/book/venue',
        features: ['Professional PA', 'Stage lighting', 'Up to 60 capacity', 'Commissioning rate']
      }
    ]
  },

  // 8. CONTACT (Passive module)
  {
    id: 'contact',
    title: 'CONTACT & ENQUIRIES',
    icon: '📞',
    description: 'General enquiries, technical support, and booking assistance. 01865 722027 | info@crsoxford.com',
    variant: 'passive',
    ledColor: 'green',
    url: '/contact',
    ctaText: 'GET IN TOUCH',
  },
];

// Helper to get service by ID
export const getServiceById = (id: string) => 
  simplifiedServices.find(s => s.id === id);

// Count total services
export const getTotalServices = () => simplifiedServices.length;
