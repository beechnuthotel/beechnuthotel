// Floating Event Banner Config — UNIFYSAP H3 MEGA 8-IN-1 WEEKEND
// To disable manually: set enabled: false
// To auto-hide after event: expiryDate is checked at runtime. Banner disappears after 14 Sep 2026 00:00 Africa/Lagos.
// To swap images: place files in public/images/events/ and update image paths below.

export const EVENT_BANNER = {
  enabled: true,
  // Auto-hide after event ends (exclusive — banner hides at this time)
  expiryDate: '2026-09-14T00:00:00+01:00', // WAT (Lagos) — covers 11-13 Sep 2026 event
  // Optional: don't show again for N hours after user dismisses (localStorage)
  dismissHours: 24,
  storageKey: 'bh-event-unifysap-dismissed',

  event: {
    title: 'UNIFYSAP H3 MEGA 8-IN-1 WEEKEND',
    subtitle: 'Unity Hash House Harriers × Friday Girls H3 × Sapele H3',
    dateLabel: '11 – 13 SEPT 2026',
    venue: 'Beechnut Hotel Effurun',
    description: 'A weekend full of fun at Beechnut Hotel Effurun.',
    highlights: [
      'Unity H3 Boat Cruise 5.0',
      'Handover & 5th Anniversary',
      'Collabo Night Galore',
      'More Beer Stop',
      'Friday Girls H3 Handover',
      'Ogogoro 3.0 Festival',
      'Sapele H3 Handover',
    ],
    // Updated to use uploaded WebP assets
    image: '/images/unifysap-poster.webp',
    imageAlt: 'UNIFYSAP H3 Mega 8-in-1 Weekend — Beechnut Hotel Effurun',
    badge: 'MEGA 8-IN-1',
  },

  grill: {
    title: 'Tasty Grills Seat-Out',
    items: ['Tasty Shawarma', 'Catfish Barbeque', 'Ise-Ewu'],
    note: 'Live grill station all weekend — poolside & lounge',
    image: '/images/grills.webp',
    badge: 'Live Grill',
  },

  cta: {
    label: 'Reserve Your Spot',
    link: '/event', // dedicated event page — showcases Day 1 Boat Cruise live
    secondaryLabel: 'View Dining',
    secondaryLink: '/dining',
  },
}
