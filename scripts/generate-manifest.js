'use strict';

const fs   = require('fs');
const path = require('path');

const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|gif|svg)$/i;

const travelDir    = path.join(__dirname, '..', 'photos', 'travel');
const manifestPath = path.join(travelDir, 'manifest.json');

const trips = fs.readdirSync(travelDir)
  .filter(function (name) {
    return fs.statSync(path.join(travelDir, name)).isDirectory();
  })
  .sort()
  .map(function (id) {
    const images = fs.readdirSync(path.join(travelDir, id))
      .filter(function (f) { return IMAGE_EXTS.test(f); })
      .sort();
    return { id: id, images: images };
  });

fs.writeFileSync(manifestPath, JSON.stringify(trips, null, 2) + '\n');
console.log('manifest written:', manifestPath);
trips.forEach(function (t) {
  console.log(' ', t.id, '-', t.images.length, 'image(s)');
});
