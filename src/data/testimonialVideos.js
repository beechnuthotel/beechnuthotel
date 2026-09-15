// Video testimonials — UNIFYSAP H3 Mega Weekend
// Videos live in public/testimonials/videos/ and are served as-is by Vite.
// Each entry maps to a guest from src/data/testimonials.js (same slug).
// Upload MP4/WebM (max 10MB, 1080p preferred) here:
//   public/testimonials/videos/{slug}.mp4
// e.g. public/testimonials/videos/emuoborsa.mp4
// The glob fallback below auto-discovers files in src/assets/testimonials/videos/ (same naming).

import { TESTIMONIAL_IMAGES } from './testimonialImages'
import { TESTIMONIALS } from './testimonials'

const NAME_BY_SLUG = Object.fromEntries(TESTIMONIALS.map(t => [t.slug, t.name]))

// Public folder — fill in as you upload videos.
// Preferred location: public/testimonials/videos/{slug}.mp4
// e.g. public/testimonials/videos/emuoborsa.mp4
export const VIDEO_TESTIMONIALS = [
  // { slug: 'emuoborsa', src: '/testimonials/videos/emuoborsa.mp4' },
  // { slug: 'ifogbe-collins', src: '/testimonials/videos/ifogbe-collins.mp4' },
  // { slug: 'nathaniel-kenny-olie', src: '/testimonials/videos/nathaniel-kenny-olie.mp4' },
]

// Auto-discovered from src/assets/testimonials/videos/ (Vite glob)
// Matches: {slug}.mp4, {slug}.webm  — slug must match a guest in src/data/testimonials.js
const VIDEO_GLOB = import.meta.glob(
  '/src/assets/testimonials/videos/**/*.{mp4,webm,MP4,WEBM}',
  { eager: true, query: '?url', import: 'default' }
)

function enrich(entry) {
  const name = NAME_BY_SLUG[entry.slug] ?? entry.slug
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
