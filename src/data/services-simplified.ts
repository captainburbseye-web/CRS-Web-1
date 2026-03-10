// OPTIMIZED SERVICE STRUCTURE
// Clear separation of locations, engineer inclusion, and pricing
// No repetition, no waffle, pure authority

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
  // 1. STUDIO (Consolidated: Recording + Podcast/AV + Control Room)
  {
    id: 'studio',
    title: 'CH-01 STUDIO',
    icon: '',
    description: 'Multi-room recording system. Engineer-led sessions and dry hire available.\n\nMusic production, spoken word, broadcast content, AV recording.\n\nAdvance bookings accepted.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'CRICKET ROAD — CONTROL ROOM',
        price: '£30/hr (2hr min)',
        description: 'Dry hire only. No engineer included. Self-operated recording space.',
        url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services',
        features: ['Dry hire', 'Self-operated', 'Available now', 'Book direct']
      },
      {
        location: 'COWLEY ROAD',
        price: '£35/hr (2hr min)',
        description: 'Live room + vocal booth. Professional signal chain. Engineer included. Music, podcast, AV.',
        url: '/contact',
        features: ['Engineer included', 'Live room', 'Vocal booth', 'Podcast/AV']
      },
      {
        location: 'CRICKET ROAD — RECORDING',
        price: '£30/hr (2hr min)',
        description: 'Treated recording space. Acoustic, vocals, production work. Engineer included.',
        url: '/contact?ref=cricket-recording',
        features: ['Engineer included', 'Acoustic sessions', 'Vocal recording', 'Production']
      }
    ]
  },

  // 2. REHEARSALS
  {
    id: 'rehearsal',
    title: 'CH-02 REHEARSAL',
    icon: '',
    description: 'Rehearsal rooms at Cowley Road (HQ) and Cricket Road (Node).\nBackline, PA, monitoring calibrated.\n\nSelect duration. Lock slot. Confirm.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'COWLEY ROAD',
        price: '£45 (2hrs) | £60 (3hrs) | £65 (4hrs)',
        description: 'Engineer not included. Full backline, PA system, monitoring, max 4 members.',
        url: 'https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services',
        features: ['Engineer not included', 'Full backline', 'PA system', 'Max 4 members']
      },
      {
        location: 'CRICKET ROAD',
        price: '£40 (2hrs) | £55 (3hrs) | £60 (4hrs)',
        description: 'Engineer not included. 6m × 4m live room with Yamaha CLP piano, drum kit, backline, vocal mics.',
        url: 'https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services',
        features: ['Engineer not included', 'Yamaha CLP piano', 'Drum kit', 'Vocal mics']
      }
    ]
  },

  // 3. TECHNICAL
  {
    id: 'technical',
    title: 'CH-03 TECHNICAL',
    icon: '',
    description: 'Live sound support.\nSystem installs.\nDiagnostics-led equipment repair.\n\nSubmit fault report or event brief.',
    variant: 'rack',
    ledColor: 'green',
    url: '/contact',
    ctaText: 'BOOK TECHNICAL SERVICE',
  },

  // 4. VENUE
  {
    id: 'venue',
    title: 'CH-04 VENUE',
    icon: '',
    description: 'Front-of-house venue interface.\nPrivate hire and community programming.\n\nOperational hours published via system updates.',
    variant: 'passive',
    ledColor: 'green',
    locations: [
      {
        location: 'VENUE HIRE',
        price: '£25/hr | £90 (4hrs) | £200 (full day)',
        description: 'Flexible layout for creative events. Capacity: 25 seated, 60 standing. PA and lighting included.',
        url: '/contact',
        features: ['Professional PA', 'Stage lighting', 'Up to 60 capacity', 'Flexible layout']
      }
    ]
  },
];

// Helper to get service by ID
export const getServiceById = (id: string) => 
  simplifiedServices.find(s => s.id === id);

// Count total services
export const getTotalServices = () => simplifiedServices.length;
