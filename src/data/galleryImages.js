const IMAGES = import.meta.glob(
  [
    '/src/assets/gallery/**/*.{jpeg,jpg,png,webp}',
    '/src/assets/exterior/**/*.{jpeg,jpg,png,webp}',
    '/src/assets/rooms/**/*.{jpeg,jpg,png,webp}',
    '/src/assets/dining/**/*.{jpeg,jpg,png,webp}',
  ],
  { eager: true, query: '?url', import: 'default' }
)

const byCategory = {}
for (const [key, url] of Object.entries(IMAGES)) {
  const parts = key.split('/')
  const category = parts[parts.length - 2]
  const filename = parts[parts.length - 1]
  const order = parseInt(filename.match(/(\d+)/)?.[1] ?? '0', 10)
  ;(byCategory[category] ??= []).push({ url, order })
}

const grouped = Object.fromEntries(
  Object.entries(byCategory).map(([category, items]) => [
    category,
    items.sort((a, b) => a.order - b.order).map(item => item.url),
  ])
)

const interleaved = []
const queues = Object.entries(grouped).map(([category, urls]) => ({ category, urls, index: 0 }))
let progress = true
while (progress) {
  progress = false
  for (const q of queues) {
    if (q.index < q.urls.length) {
      interleaved.push({ src: q.urls[q.index], category: q.category })
      q.index += 1
      progress = true
    }
  }
}

export const GALLERY_IMAGES = interleaved

const FOLDER_IMAGES = import.meta.glob('/src/assets/gallery/**/*.{jpeg,jpg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const GALLERY_FOLDER_IMAGES = Object.entries(FOLDER_IMAGES)
  .map(([key, url]) => {
    const filename = key.split('/').pop()
    const order = parseInt(filename.match(/(\d+)/)?.[1] ?? '0', 10)
    return { url, order }
  })
  .sort((a, b) => a.order - b.order)
  .map(item => item.url)
