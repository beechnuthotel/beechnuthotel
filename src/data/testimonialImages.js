const MODULES = import.meta.glob('/src/assets/testimonials/photos/**/*.{jpeg,jpg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const TESTIMONIAL_IMAGES = Object.fromEntries(
  Object.entries(MODULES).map(([key, url]) => {
    const file = key.split('/').pop()
    const slug = file.replace(/\.(jpeg|jpg|png)$/i, '')
    return [slug, url]
  })
)
