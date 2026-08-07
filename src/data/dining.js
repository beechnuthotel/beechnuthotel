import { DINING_IMAGES } from './diningImages'

const DINING_DEFS = [
  {
    id: 'dining',
    name: 'Dining',
    type: 'dining',
    description: 'Elegant \u00e0 la carte dining celebrating Nigeria\u2019s most iconic flavours with a contemporary fine-dining twist. Our signature banga bisque, pepper-rubbed grilled lobster, and plantain cr\u00e8me br\u00fbl\u00e9e are guest favourites.',
    amenities: ['\u00c0 la carte menu', 'Private dining room', 'Wine cellar', 'Open 24 hours'],
    badge: 'Fine Dining',
  },
  {
    id: 'lounge',
    name: 'Lounge',
    type: 'lounge',
    description: 'A sophisticated tropical lounge at the heart of the hotel \u2014 the perfect setting for handcrafted cocktails, conversation, and curated light bites in a relaxed, air-conditioned space.',
    amenities: ['Signature cocktails', 'Curated light bites', 'Air-conditioned lounge', 'Open 24 hours'],
    badge: 'Tropical Lounge',
  },
  {
    id: 'indoor-bar',
    name: 'Indoor Bar',
    type: 'indoor-bar',
    description: 'A sophisticated tropical bar at the heart of the hotel, serving signature cocktails, premium spirits, and ice-cold refreshments in an air-conditioned lounge setting.',
    amenities: ['Signature cocktails', 'Premium spirits', 'Air-conditioned lounge', 'Open 24 hours'],
    badge: 'Tropical',
  },
  {
    id: 'pool-bar',
    name: 'Pool Bar',
    type: 'pool-bar',
    description: 'Relaxed bar service right by the pool \u2014 the perfect spot to sip a handcrafted cocktail or chilled beer between swims on a lazy afternoon.',
    amenities: ['Cocktail bar', 'Poolside seating', 'Light bites', 'Open 24 hours'],
    badge: 'Poolside',
  },
  {
    id: 'rooftop-bar',
    name: 'Rooftop Bar',
    type: 'rooftop-bar',
    description: 'Perched on the top floor, our tropical rooftop bar offers panoramic views of the Effurun skyline. Sip on signature cocktails and premium spirits as the sun sets over the Niger Delta.',
    amenities: ['Panoramic views', 'Signature cocktails', 'Live music Fri\u2013Sat', 'Open 24 hours'],
    badge: 'Skyline Views',
  },
  {
    id: 'vip-bar',
    name: 'Vip Bar',
    type: 'vip-bar',
    description: 'An exclusive VIP bar reserved for private celebrations and discerning guests \u2014 bespoke cocktails, premium champagne, and dedicated personal service in an intimate setting.',
    amenities: ['Bespoke cocktails', 'Premium champagne', 'Private seating', 'Open 24 hours'],
    badge: 'Exclusive',
  },
]

export const DINING = DINING_DEFS.map(venue => ({
  ...venue,
  image: DINING_IMAGES[venue.type]?.[0] ?? '',
  images: DINING_IMAGES[venue.type] ?? [],
}))
