import { readdir, rm, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = 'src/assets'

const SIZING = {
  team: 600,
  'testimonials/photos': 600,
  rooms: 1200,
  dining: 1200,
  pool: 1920,
  gallery: 1920,
  exterior: 1920,
}

const EXTENSIONS = new Set(['.jpeg', '.jpg', '.png'])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) files.push(full)
  }
  return files
}

const files = await walk(ROOT)
let saved = 0
let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const rel = file.split('\\').join('/')
  const folder = rel.split('/').slice(0, -1).slice(1).join('/')
  const maxWidth = SIZING[folder] ?? 1600

  const before = (await stat(file)).size
  totalBefore += before

  const out = file.replace(/\.(jpeg|jpg|png)$/i, '.webp')
  const image = sharp(file)
  const meta = await image.metadata()
  const width = Math.min(meta.width, maxWidth)

  await image
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 4 })
    .toFile(out)

  const after = (await stat(out)).size
  totalAfter += after
  await rm(file)
  saved += after < before ? before - after : 0
  console.log(`${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${rel}`)
}

console.log(`\nDone: ${files.length} images. Before: ${(totalBefore / 1048576).toFixed(1)}MB, After: ${(totalAfter / 1048576).toFixed(1)}MB, Saved: ${(saved / 1048576).toFixed(1)}MB`)
