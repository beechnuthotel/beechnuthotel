const IMAGES = import.meta.glob('/src/assets/exterior/**/*.{jpeg,jpg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const EXTERIOR_IMAGES = Object.entries(IMAGES)
  .map(([key, url]) => {
    const filename = key.split('/').pop()
    const order = parseInt(filename.match(/(\d+)/)?.[1] ?? '0', 10)
    return { url, order }
  })
  .sort((a, b) => a.order - b.order)
  .map(item => item.url)
