const MODULES = import.meta.glob('/src/assets/team/**/*.{jpeg,jpg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

const rawImages = Object.entries(MODULES).map(([key, url]) => {
  const parts = key.split('/')
  return { folder: parts[parts.length - 2], file: parts[parts.length - 1], url }
})

export const TEAM_IMAGES = rawImages.reduce((acc, { folder, file, url }) => {
  if (!acc[folder]) acc[folder] = []
  acc[folder].push({ file, url })
  return acc
}, {})

Object.values(TEAM_IMAGES).forEach(images => images.sort((a, b) => naturalCompare(a.file, b.file)))

for (const folder of Object.keys(TEAM_IMAGES)) {
  TEAM_IMAGES[folder] = TEAM_IMAGES[folder].map(({ url }) => url)
}

const DEPARTMENT_ORDER = ['front-desk', 'dining', 'housekeeping', 'security']

export const DEPARTMENTS = Object.keys(TEAM_IMAGES)
  .filter(folder => folder !== 'gm' && folder !== 'all-staff')
  .sort((a, b) => {
    const ia = DEPARTMENT_ORDER.indexOf(a)
    const ib = DEPARTMENT_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return naturalCompare(a, b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
