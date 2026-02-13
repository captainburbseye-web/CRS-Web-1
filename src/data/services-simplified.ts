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
  // 1. RECORDING (WITH ENGINEER)
  {
    id: 'recording',
    title: 'RECORDING (WITH ENGINEER)',
    icon: '🎛️',
    description: 'Engineer-led sessions for artists who want guidance, technical precision, and delivery-ready results.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'COWLEY ROAD',
        price: '£35/hr (2hr min)',
        description: 'Live room + large vocal booth. Professional signal chain. Engineer included.',
        url: '/studio',
        features: ['Engineer included', 'Live room', 'Vocal booth', 'Professional signal chain']
      },
      {
        location: 'CRICKET ROAD',
        price: '£30/hr (2hr min)',
        description: 'Treated recording space. Ideal for acoustic, vocals, production work. Engineer included.',
        url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services',
        features: ['Engineer included', 'Acoustic sessions', 'Vocal recording', 'Production work']
      }
    ]
  },

  // 2. CONTROL ROOM (DRY HIRE)
  {
    id: 'control-room',
    title: 'CONTROL ROOM (DRY HIRE)',
    icon: '🎚️',
    description: 'For producers and engineers who run their own sessions. Induction required.',
    variant: 'rack',
    ledColor: 'amber',
    locations: [
      {
        location: 'COWLEY ROAD — CONTROL ROOM',
        price: 'Coming online',
        description: 'Dry hire only. No engineer included. Professional monitoring and hybrid workflow.',
        url: '/contact',
        features: ['No engineer included', 'Induction required', 'Hybrid workflow', 'Coming online']
      }
    ]
  },

  // 3. BAND REHEARSALS
  {
    id: 'rehearsal',
    title: 'BAND REHEARSALS',
    icon: '🎸',
    description: 'Available at Cowley Road and Cricket Road. Large treated room. Drum kit available. Backline options.',
    variant: 'rack',
    ledColor: 'green',
    locations: [
      {
        location: 'COWLEY ROAD',
        price: '£40 (2hrs) | £55 (3hrs) | £60 (4hrs)',
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

  // 4. PODCAST & AV RECORDING
  {
    id: 'podcast',
    title: 'PODCAST & AV RECORDING',
    icon: '🎙️',
    description: 'Spoken word, interviews, streamed content. Engineer-assisted sessions available. £30–£35/hr depending on location.',
    variant: 'rack',
    ledColor: 'green',
    url: '/av-services',
    ctaText: 'BOOK PODCAST SESSION',
  },

  // 5. REPAIRS & TECHNICAL SERVICES
  {
    id: 'repairs',
    title: 'REPAIRS & TECHNICAL SERVICES',
    icon: '🔧',
    description: 'Bench diagnostics — £60 flat rate. Amp servicing, signal faults, mixer repairs, AV troubleshooting. Work carried out by ODRO Engineering.',
    variant: 'rack',
    ledColor: 'green',
    url: '/contact',
    ctaText: 'BOOK REPAIR',
  },

  // 6. WORKSHOP CAFÉ VENUE HIRE
  {
    id: 'cafe',
    title: 'WORKSHOP CAFÉ VENUE HIRE',
    icon: '☕',
    description: 'Creative events, listening sessions, small gatherings. Flexible layout. Independent environment.',
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

  // 7. CONTACT
  {
    id: 'contact',
    title: 'CONTACT & ENQUIRIES',
    icon: '📞',
    description: 'All bookings are direct. General enquiries, technical support, and booking assistance.',
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
