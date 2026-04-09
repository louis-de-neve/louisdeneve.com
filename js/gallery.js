(function () {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  if (!lightbox || !lbImg) return;

  var allPhotos = [];
  var current = 0;

  function titleFromFilename(filename) {
    return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  }

  function titleFromId(id) {
    return String(id)
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function initLightbox() {
    allPhotos = [];
    document.querySelectorAll('.photo-grid img').forEach(function (img) {
      allPhotos.push({ src: img.src, alt: img.alt });
      img.addEventListener('click', function () {
        current = allPhotos.findIndex(function (p) { return p.src === img.src; });
        openLightbox(current);
      });
    });
  }

  function openLightbox(idx) {
    current = idx;
    lbImg.src = allPhotos[idx].src;
    lbImg.alt = allPhotos[idx].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() {
    openLightbox((current - 1 + allPhotos.length) % allPhotos.length);
  }

  function next() {
    openLightbox((current + 1) % allPhotos.length);
  }

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', prev);
  document.getElementById('lb-next').addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  function normalizeManifest(data) {
    if (!Array.isArray(data)) return [];
    return data.filter(function (entry) {
      return entry && typeof entry.id === 'string' && Array.isArray(entry.images);
    });
  }

  function normalizeTitles(data) {
    if (!Array.isArray(data)) return new Map();
    return new Map(
      data
        .filter(function (entry) {
          return entry && typeof entry.id === 'string' && typeof entry.title === 'string';
        })
        .map(function (entry) {
          return [entry.id, entry.title];
        })
    );
  }

  function renderImages(grid, basePath, images, altPrefix) {
    images.forEach(function (filename, idx) {
      if (typeof filename !== 'string' || /[<>"']/.test(filename)) return;
      var img = document.createElement('img');
      img.src = basePath + filename;
      img.alt = (altPrefix || titleFromFilename(filename)) + ' — photo ' + (idx + 1);
      img.loading = 'lazy';
      grid.appendChild(img);
    });
  }

  function renderCategory(root, basePath, entry, titleMap) {
    var section = document.createElement('section');
    section.className = 'photo-section';
    section.id = entry.id;

    var heading = document.createElement('h3');
    heading.textContent = titleMap.get(entry.id) || entry.title || entry.label || titleFromId(entry.id);

    var grid = document.createElement('div');
    grid.className = 'photo-grid';

    renderImages(grid, basePath + entry.id + '/', entry.images, heading.textContent);

    section.append(heading, grid);
    root.appendChild(section);
  }

  function loadJson(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Failed to load ' + url + ': ' + res.status);
      return res.json();
    });
  }

  var manifestRoots = document.querySelectorAll('[data-manifest][data-auto-categories]');
  var loads = [];

  manifestRoots.forEach(function (root) {
    var manifestUrl = root.getAttribute('data-manifest');
    if (!manifestUrl) return;

    var basePath = manifestUrl.replace(/\/[^/]+$/, '/');

    var titlesUrl = root.getAttribute('data-titles') || 'data/rowing.json';

    loads.push(
      Promise.all([
        loadJson(manifestUrl).then(normalizeManifest),
        loadJson(titlesUrl).then(normalizeTitles).catch(function () {
          return new Map();
        })
      ]).then(function (results) {
        var entries = results[0];
        var titleMap = results[1];

        root.replaceChildren();
        entries.forEach(function (entry) {
          renderCategory(root, basePath, entry, titleMap);
        });
      })
    );
  });

  Promise.all(loads).then(initLightbox).catch(function (err) {
    console.error(err);
  });
})();
