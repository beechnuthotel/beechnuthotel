const IMAGES = import.meta.glob('/src/assets/dining/**/*.{jpeg,jpg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byCategory = {}
for (const [key, url] of Object.entries(IMAGES)) {
  const parts = key.split('/')
  const category = parts[parts.length - 2]
  const filename = parts[parts.length - 1]
  const order = parseInt(filename.match(/(\d+)/)?.[1] ?? '0', 10)
  ;(byCategory[category] ??= []).push({ url, order })
}

export const DINING_IMAGES = Object.fromEntries(
  Object.entries(byCategory).map(([category, items]) => [
    category,
    items
      .sort((a, b) => a.order - b.order)
      .map(item => item.url),
  ])
)
