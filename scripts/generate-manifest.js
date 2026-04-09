/**
 * Generate manifests for photo collections (default: travel, rowing).
 *
 * Usage:
 *   node scripts/generate-manifest.js              # uses default collections and photos/ dir
 *   node scripts/generate-manifest.js travel      # generate for travel only
 *   node scripts/generate-manifest.js travel,rowing /full/path/to/photos
 */
const fs = require('fs');
const path = require('path');

const IMG_EXT = /\.(jpe?g|png|gif|webp|svg|avif)$/i;

const argv = process.argv.slice(2);
const collectionsArg = argv[0] || 'travel,rowing';
const basePhotosDir = argv[1] || path.join(__dirname, '..', 'photos');

const collections = collectionsArg.split(',').map(s => s.trim()).filter(Boolean);

function exists(p) {
  try { return fs.existsSync(p); } catch { return false; }
}

function getDirs(p) {
  if (!exists(p)) return [];
  return fs.readdirSync(p, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();
}

function getImages(p) {
  if (!exists(p)) return [];
  return fs.readdirSync(p)
    .filter(f => IMG_EXT.test(f))
    .filter(f => !f.startsWith('.'))
    .sort();
}

function writeJSON(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function toTitle(id) {
  return String(id)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

for (const col of collections) {
  const colDir = path.join(basePhotosDir, col);
  if (!exists(colDir)) {
    console.warn(`Skipping collection "${col}" — directory not found: ${colDir}`);
    continue;
  }

  const subdirs = getDirs(colDir);
  let manifest = [];

  if (subdirs.length === 0) {
    const imgs = getImages(colDir);
    if (imgs.length > 0) {
      manifest.push({
        id: col,
        title: toTitle(col),
        images: imgs,
      });
    } else {
      console.warn(`No images found in collection "${col}" (${colDir}).`);
    }
  } else {
    manifest = subdirs.map(id => {
      const images = getImages(path.join(colDir, id));
      return {
        id,
        title: toTitle(id),
        images,
      };
    }).filter(entry => entry.images && entry.images.length);
  }

  const outFile = path.join(colDir, 'manifest.json');
  writeJSON(outFile, manifest);
  console.log(`Wrote ${manifest.length} entries to ${outFile}`);
}
