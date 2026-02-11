/**
 * Booking Options Data
 * Centralized booking configuration for all service types
 * Separated from component for better maintainability
 */

export interface BookingOption {
  title: string;
  location: string;
  price: string;
  features: string[];
  url: string;
}

export interface BookingOptions {
  rehearsal: BookingOption[];
  recording: BookingOption[];
  other: BookingOption[];
}

export const bookingOptions: BookingOptions = {
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
