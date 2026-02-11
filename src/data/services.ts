// Service configuration for all 12 rack modules
// Design Philosophy: Industrial rack aesthetic with sage green dominant, mustard accents, warm browns
// VARIANT SYSTEM: command (interactive), rack (standard), passive (info)

export interface RackService {
  id: string;
  row: number;
  label: string;
  title: string;
  description: string;
  url: string;
  ledColor: 'green' | 'amber' | 'red';
  variant: 'command' | 'rack' | 'passive';
  instruction?: string;
  isSplit?: boolean;
  splitPosition?: 'left' | 'right';
  dropdownServices?: Array<{ name: string; url: string }>;
}

export const rackServices: RackService[] = [
  // Row 1: CRS HEADER - SEO OPTIMIZED
  {
    id: 'header',
    row: 1,
    label: '[ COWLEY_ROAD_STUDIOS ]',
    title: 'RECORDING STUDIO OXFORD | REHEARSAL SPACE | MUSIC PRODUCTION',
    description: 'Professional recording studio and rehearsal space in East Oxford. Offering music production, mixing, mastering, band rehearsal rooms, and creative workspace. Two locations: Cowley Road HQ and Cricket Road. Continuing the Soundworks Oxford legacy since 1999.',
    url: '/',
    ledColor: 'green',
    variant: 'command',
    instruction: '[ WELCOME TO CRS ]',
  },

  // Row 2: BOOKING HUB - DROPDOWN SELECTOR
  {
    id: 'booking-hub',
    row: 2,
    label: '[ MAIN_PORTAL ]',
    title: 'BOOK NOW',
    description: 'Select your service below and book instantly. Rehearsal rooms, recording sessions, control rooms, music lessons, venue hire, and equipment rental available.',
    url: '/book',
    ledColor: 'green',
    variant: 'command',
    instruction: '[ SELECT SERVICE BELOW ]',
    dropdownServices: [
      { name: 'Cowley Rehearsal Room', url: 'https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services' },
      { name: 'Cricket Rehearsal Room', url: 'https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services' },
      { name: 'Cowley Control Room', url: '/book/studio?location=cowley' },
      { name: 'Cricket Control Room', url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services' },
      { name: 'Recording & Production', url: '/book/studio' },
      { name: 'Music Lessons', url: '/book/lessons' },
      { name: 'Venue & Event Space', url: '/book/venue' },
      { name: 'Equipment Hire', url: '/av-services' },
    ],
  },

  // Row 3: REHEARSAL (SPLIT LEFT)
  {
    id: 'rehearsal-cowley',
    row: 3,
    label: '[ COWLEY_ROAD ]',
    title: 'COWLEY REHEARSAL',
    description: 'Professional rehearsal space at Cowley Road HQ. Full backline, PA system, and monitoring available.',
    url: 'https://book.squareup.com/appointments/7n0e94bokii6s3/location/L1MAM4DDPHKXX/services',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ BOOK NOW ]',
    isSplit: true,
    splitPosition: 'left',
  },

  // Row 3: REHEARSAL (SPLIT RIGHT)
  {
    id: 'rehearsal-cricket',
    row: 3,
    label: '[ CRICKET_ROAD ]',
    title: 'CRICKET REHEARSAL',
    description: '6m × 4m live room. Yamaha CLP piano, drum kit, backline, and vocal mics ready.',
    url: 'https://book.squareup.com/appointments/ea1ume9ju9zwqk/location/L1MAM4DDPHKXX/services',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ BOOK NOW ]',
    isSplit: true,
    splitPosition: 'right',
  },

  // Row 4: CONTROL ROOM (SPLIT LEFT)
  {
    id: 'control-cowley',
    row: 4,
    label: '[ COWLEY_HQ ]',
    title: 'COWLEY CONTROL ROOM',
    description: 'High-end recording and production facility. Analog console, outboard gear, and isolation booths.',
    url: '/book/studio?location=cowley',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ BOOK NOW ]',
    isSplit: true,
    splitPosition: 'left',
  },

  // Row 4: CONTROL ROOM (SPLIT RIGHT)
  {
    id: 'control-cricket',
    row: 4,
    label: '[ CRICKET_ROAD ]',
    title: 'CRICKET CONTROL ROOM',
    description: 'Compact control room with live room integration. Perfect for tracking and basic mixing.',
    url: 'https://book.squareup.com/appointments/42x52tys6ettug/location/L1MAM4DDPHKXX/services',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ BOOK NOW ]',
    isSplit: true,
    splitPosition: 'right',
  },

  // Row 5: RECORDING & PRODUCTION SERVICES
  {
    id: 'recording-services',
    row: 5,
    label: '[ SERVICE: AUDIO_PRODUCTION ]',
    title: 'RECORDING & PRODUCTION',
    description: 'Full-service audio production: recording, mixing, mastering, tape transfer, and sound design. Experienced engineers available.',
    url: '/book/studio',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ SELECT SERVICE ]',
  },

  // Row 6: MUSIC LESSONS ✨ NEW
  {
    id: 'music-lessons',
    row: 6,
    label: '[ SERVICE: EDUCATION ]',
    title: 'MUSIC LESSONS & WORKSHOPS',
    description: 'Professional music tuition and creative workshops. Individual lessons, group sessions, and production masterclasses.',
    url: '/book/lessons',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ BOOK SESSION ]',
  },

  // Row 7: AV HIRE
  {
    id: 'av-hire',
    row: 7,
    label: '[ SERVICE: EQUIPMENT_RENTAL ]',
    title: 'AV EQUIPMENT HIRE',
    description: 'Professional audio and visual equipment rental. Microphones, PA systems, lighting, cameras, and backline available.',
    url: '/av-services',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ VIEW INVENTORY ]',
  },

  // Row 8: AV REPAIRS ✨ NEW
  {
    id: 'av-repairs',
    row: 8,
    label: '[ SERVICE: MAINTENANCE ]',
    title: 'EQUIPMENT REPAIRS & SERVICING',
    description: 'Expert repair and maintenance for audio equipment. Amplifiers, mixers, instruments, and vintage gear restoration.',
    url: '/av-services/repairs',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ REQUEST QUOTE ]',
  },

  // Row 9: WORKSHOP CAFÉ
  {
    id: 'workshop-cafe',
    row: 9,
    label: '[ WORKSHOP_CAFE ]',
    title: 'WORKSHOP CAFÉ',
    description: 'Creative workspace and community hub. Specialty coffee, hot-desking, meeting rooms, and AI learning lab.',
    url: '/cafe',
    ledColor: 'green',
    variant: 'passive',
    instruction: '[ VISIT CAFE ]',
  },

  // Row 10: VENUE HIRE ✨ NEW
  {
    id: 'venue-hire',
    row: 10,
    label: '[ SERVICE: EVENT_SPACE ]',
    title: 'VENUE & EVENT SPACE',
    description: 'Full venue booking for live performances, showcases, and events. Professional PA, lighting, and technical support.',
    url: '/book/venue',
    ledColor: 'green',
    variant: 'rack',
    instruction: '[ ENQUIRE AVAILABILITY ]',
  },

  // Row 11: CONTACT
  {
    id: 'contact',
    row: 11,
    label: '[ SYSTEM: COMMUNICATIONS ]',
    title: 'CONTACT & ENQUIRIES',
    description: 'Get in touch with the Cowley Road Studios team. General enquiries, technical support, and booking assistance.',
    url: '/contact',
    ledColor: 'green',
    variant: 'passive',
    instruction: '[ SEND MESSAGE ]',
  },

  // Row 12: MASTER BUS / SYSTEM STATUS
  {
    id: 'system-status',
    row: 12,
    label: '[ SYSTEM: MASTER_BUS ]',
    title: 'SYSTEM STATUS & POWER',
    description: 'Real-time system status monitor. Check service availability, operational status, and system health.',
    url: '/status',
    ledColor: 'green',
    variant: 'command',
    instruction: '[ ALL_SYSTEMS_OPERATIONAL ]',
  },
];

// Helper function to get services by row
export const getServicesByRow = (row: number): RackService[] => {
  return rackServices.filter(service => service.row === row);
};

// Helper function to get split services
export const getSplitServices = (row: number): { left: RackService | undefined; right: RackService | undefined } => {
  const services = getServicesByRow(row);
  return {
    left: services.find(s => s.splitPosition === 'left'),
    right: services.find(s => s.splitPosition === 'right'),
  };
};

// Helper function to get all rows
export const getAllRows = (): number[] => {
  return Array.from(new Set(rackServices.map(s => s.row))).sort((a, b) => a - b);
};
