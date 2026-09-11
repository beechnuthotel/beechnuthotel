// Event gallery — UNIFYSAP H3 MEGA 8-IN-1 WEEKEND (11-13 Sept 2026)
// Images are loaded from src/assets/event/**/* and public/images/events/**/* is available as fallback via EVENT_PUBLIC_IMAGES.
// To add Day 1 Boat Cruise photos: drop webp/jpg into src/assets/event/unifysap/day1/  (or public/images/events/boat-cruise/ and list in EVENT_PUBLIC_IMAGES)

const ASSET_IMAGES = import.meta.glob(
  '/src/assets/event/**/*.{jpeg,jpg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
)

// Public folder images — add paths here after uploading to public/images/events/
/// e.g. '/images/events/boat-cruise/day1-01.webp'
export const EVENT_PUBLIC_IMAGES = [
  // poster is already in public/images but we keep it as hero fallback
  '/images/unifysap-poster.webp',
  // Boat Cruise Day 1 — add your uploads here (or drop into src/assets/event/unifysap/ and they'll auto-appear):
  // '/images/events/boat-cruise/day1-01.webp',
  // '/images/events/boat-cruise/day1-02.webp',
]

function buildAssetList() {
  const list = []
  for (const [key, url] of Object.entries(ASSET_IMAGES)) {
    const parts = key.split('/')
    const filename = parts[parts.length - 1]
    const folder = parts[parts.length - 2] // e.g. 'day1', 'boat-cruise'
    // extract day label from path if present
    const fullPath = key
    let day = 'General'
    if (fullPath.includes('/day1')) day = 'Day 1 — Boat Cruise 5.0'
    else if (fullPath.includes('/day2')) day = 'Day 2 — Handover & Anniversary'
    else if (fullPath.includes('/day3')) day = 'Day 3 — Grand Finale'
    else if (fullPath.includes('/boat-cruise')) day = 'Day 1 — Boat Cruise 5.0'
    const order = parseInt(filename.match(/(\d+)/)?.[1] ?? '0', 10)
    list.push({ src: url, category: folder, day, filename, order, key })
  }
  return list.sort((a, b) => {
    const dayOrder = { 'Day 1 — Boat Cruise 5.0': 1, 'Day 2 — Handover & Anniversary': 2, 'Day 3 — Grand Finale': 3, General: 99 }
    const da = dayOrder[a.day] ?? 99
    const db = dayOrder[b.day] ?? 99
    if (da !== db) return da - db
    return a.order - b.order
  })
}

export const EVENT_ASSET_IMAGES = buildAssetList()

// Unified list for hero + motion gallery (assets first, then public)
export const EVENT_IMAGES = [
  ...EVENT_ASSET_IMAGES.map((i) => i.src),
  ...EVENT_PUBLIC_IMAGES,
]

// Grouped for section display
export const EVENT_BY_DAY = [
  {
    id: 'day1',
    label: 'Day 1 — Today',
    title: 'Unity H3 Boat Cruise 5.0',
    date: '11 Sept 2026',
    description: 'The Mega weekend kicks off on the water — Boat Cruise 5.0 with the Hash family.',
    images: EVENT_ASSET_IMAGES.filter((i) => i.day.includes('Day 1')).map((i) => i.src),
  },
  {
    id: 'day2',
    label: 'Day 2',
    title: 'Handover & 5th Anniversary + Collabo Night',
    date: '12 Sept 2026',
    description: 'Handover ceremonies, 5th Anniversary celebration, Collabo Night Galore & More Beer Stop.',
    images: EVENT_ASSET_IMAGES.filter((i) => i.day.includes('Day 2')).map((i) => i.src),
  },
  {
    id: 'day3',
    label: 'Day 3',
    title: 'Grand Finale — Ogogoro Festival & Handovers',
    date: '13 Sept 2026',
    description: 'Ogogoro 3.0 Festival, Friday Girls H3 & Sapele H3 Handovers — closing the 8-in-1.',
    images: EVENT_ASSET_IMAGES.filter((i) => i.day.includes('Day 3')).map((i) => i.src),
  },
]

// For MotionGallery compatibility: interleaved objects {src, category}
export const EVENT_GALLERY_ITEMS = EVENT_IMAGES.map((src, idx) => ({
  src,
  category: EVENT_ASSET_IMAGES[idx]?.category ?? 'event',
}))
