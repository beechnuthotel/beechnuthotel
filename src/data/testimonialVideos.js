// Video testimonials — in-person lodger reviews (separate from Google text reviews
// in src/data/testimonials.js). Videos live in public/testimonials/videos/.
// Upload MP4/WebM (max 10MB, 1080p preferred) here:
//   public/testimonials/videos/{slug}.mp4
// The glob fallback below auto-discovers files in src/assets/testimonials/videos/ (same naming).

import { TESTIMONIAL_IMAGES } from './testimonialImages'

// Video-only reviewers — not in TESTIMONIALS (Google reviews)
const VIDEO_NAMES = {
  'iphm-creamy-daddy': 'IPHM Creamy Daddy',
  'dhm-calm-down': 'DHM Calm Down',
  'hm-black-diamond': 'HM Black Diamond',
  'sexy-dorime': 'Sexy Dorime',
  'hm-picci-instructor': 'HM Picci Instructor',
}

// Public folder — one entry per video reviewer.
// Preferred location: public/testimonials/videos/{slug}.mp4
export const VIDEO_TESTIMONIALS = [
  { slug: 'iphm-creamy-daddy', src: '/testimonials/videos/iphm-creamy-daddy.mp4' },
  { slug: 'dhm-calm-down', src: '/testimonials/videos/dhm-calm-down.mp4' },
  { slug: 'hm-black-diamond', src: '/testimonials/videos/hm-black-diamond.mp4' },
  { slug: 'sexy-dorime', src: '/testimonials/videos/sexy-dorime.mp4' },
  { slug: 'hm-picci-instructor', src: '/testimonials/videos/hm-picci-instructor.mp4' },
]

// Auto-discovered from src/assets/testimonials/videos/ (Vite glob)
// Matches: {slug}.mp4, {slug}.webm — slug should match a key in VIDEO_NAMES
const VIDEO_GLOB = import.meta.glob(
  '/src/assets/testimonials/videos/**/*.{mp4,webm,MP4,WEBM}',
  { eager: true, query: '?url', import: 'default' }
)

function enrich(entry) {
  const name = entry.name ?? VIDEO_NAMES[entry.slug] ?? entry.slug
  return {
    slug: entry.slug,
    src: entry.src,
    poster: entry.poster ?? TESTIMONIAL_IMAGES[entry.slug] ?? null,
    title: entry.title ?? `${name} — guest video`,
    name,
  }
}

function buildVideoList() {
  const globVideos = Object.entries(VIDEO_GLOB).map(([key, url]) => {
    const file = key.split('/').pop()
    const slug = file.replace(/\.(mp4|webm)$/i, '')
    return { slug, src: url }
  })
  // Prefer public folder entries, merge with glob auto-discovered
  const publicSlugs = new Set(VIDEO_TESTIMONIALS.map(v => v.slug))
  const merged = [
    ...VIDEO_TESTIMONIALS,
    ...globVideos.filter(v => !publicSlugs.has(v.slug)),
  ]
  return merged.map(enrich)
}

export const VIDEO_TESTIMONIALS_WITH_SRC = buildVideoList()
