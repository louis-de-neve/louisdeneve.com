const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'photos');
const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i;
const TARGETS = [
  { name: 'travel', width: 1200, height: 800 },
  { name: 'rowing', width: 1200, height: 800 },
];

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function listDirs(dir) {
  if (!isDir(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name)
    .sort();
}

function listImages(dir) {
  if (!isDir(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => IMG_EXT.test(f))
    .sort();
}

async function cropImage(input, output, width, height) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await sharp(input)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .toFile(output);
}

async function processCollection(collection) {
  const colDir = path.join(ROOT, collection.name);
  if (!isDir(colDir)) return;

  const subdirs = listDirs(colDir);

  // Travel-style collections with subfolders
  if (subdirs.length) {
    for (const subdir of subdirs) {
      const srcDir = path.join(colDir, subdir);
      const outDir = path.join(colDir, '_generated', subdir);
      const files = listImages(srcDir);

      for (const file of files) {
        const input = path.join(srcDir, file);
        const output = path.join(outDir, file);
        if (isFile(input)) {
          await cropImage(input, output, collection.width, collection.height);
        }
      }
    }
    return;
  }

  // Flat collections like rowing
  const files = listImages(colDir);
  for (const file of files) {
    const input = path.join(colDir, file);
    const output = path.join(colDir, '_generated', file);
    if (isFile(input)) {
      await cropImage(input, output, collection.width, collection.height);
    }
  }
}

async function main() {
  for (const target of TARGETS) {
    await processCollection(target);
  }
  console.log('Cropped images generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});