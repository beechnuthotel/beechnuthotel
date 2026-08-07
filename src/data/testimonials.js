import { TESTIMONIAL_IMAGES } from './testimonialImages'

// NOTE: The 3-star review from Auwal Adamu is intentionally left out of this
// initial build. To include it later, add an object to TESTIMONIALS below,
// e.g. { slug: 'auwal-adamu', name: 'Auwal Adamu', rating: 3, date: '...', text: '...', source: 'Google' }
export const TESTIMONIALS = [
  {
    slug: 'emuoborsa',
    name: 'Emuoborsa',
    rating: 5,
    date: '4 months ago',
    tripType: 'Vacation',
    travelGroup: 'Solo',
    text: 'I enjoyed my stay at this hotel, the customer service is top notch, the food is nice and very affordable. I will definitely be coming back.',
    highlights: ['Luxury', 'Great view', 'Quiet', 'Kid-friendly', 'Great value', 'High-tech'],
    source: 'Google',
  },
  {
    slug: 'ifogbe-collins',
    name: 'Ifogbe Collins',
    rating: 5,
    date: '4 months ago',
    text: 'Wonderful Hotel Experience, Beechnut is a home away from home, always av a reason to go back bcos of the good treatment i was given.',
    source: 'Google',
  },
  {
    slug: 'chinedu-victory',
    name: 'Chinedu Victory',
    rating: 5,
    date: '10 months ago',
    text: 'Very good hotel',
    source: 'Google',
  },
  {
    slug: 'ovie-mosheshe',
    name: 'Ovie Mosheshe',
    rating: 5,
    date: '3 months ago',
    text: '', // full text pending — truncated in source, update later
    source: 'Google',
  },
  {
    slug: 'nathaniel-kenny-olie',
    name: 'Nathaniel Kenny Olie',
    rating: 5,
    date: 'a week ago',
    isNew: true,
    text: 'Best place to be in, topnotch services and a very clean and Serene environment. This is indeed home away from home.',
    source: 'Google',
  },
  {
    slug: 'busan-angaro',
    name: 'Busan Angaro',
    rating: 5,
    date: '9 months ago',
    tripType: 'Business',
    text: '', // full text pending — truncated in source, update later
    source: 'Google',
  },
  {
    slug: 'tochukwu-okeke',
    name: 'Tochukwu Okeke',
    rating: 5,
    date: 'a month ago',
    text: '', // full text pending — truncated in source, update later
    source: 'Google',
  },
]

export const TESTIMONIALS_WITH_IMAGES = TESTIMONIALS.map(t => ({
  ...t,
  image: TESTIMONIAL_IMAGES[t.slug] ?? null, // null triggers fallback avatar in the component
}))

// Home page testimonial carousel feed (kept for the Home section — separate
// from the guest reviews above, which use the slug/date shape)
export const HOME_TESTIMONIALS = [
  {
    id: 1,
    name: 'Chukwuemeka O.',
    meta: 'Lagos — Business Traveller',
    avatar: null,
    text: 'Beechnut is in a class of its own in Effurun. The room was immaculate, the staff remembered my name every single day, and the breakfast spread was extraordinary. I\'ll never stay anywhere else when I\'m in Delta State.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Adaeze M.',
    meta: 'Port Harcourt — Corporate Client',
    avatar: null,
    text: 'We hosted our company\'s annual conference here and the event team was flawless. The AV setup, catering, and attention to detail exceeded every expectation. Our CEO called it the best corporate event we\'ve ever had.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emeka & Ngozi A.',
    meta: 'Abuja — Leisure Guests',
    avatar: null,
    text: 'The Presidential Suite on our anniversary was beyond anything we imagined. The private terrace view, the personalised flower arrangement, the champagne on arrival — Beechnut made our celebration unforgettable.',
    rating: 5,
  },
]

export const STATS = [
  { value: '75', label: 'Luxury Rooms' },
  { value: '4.9', label: 'Guest Rating' },
  { value: '3+', label: 'Years of Excellence' },
  { value: '3', label: 'Tropical Bars' },
]
