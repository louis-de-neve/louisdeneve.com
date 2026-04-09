(function () {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var lbImg    = document.getElementById('lb-img');
  if (!lightbox || !lbImg) return;

  var allPhotos = [];
  var current   = 0;

  function titleFromFilename(filename) {
    return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
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

  function prev() { openLightbox((current - 1 + allPhotos.length) % allPhotos.length); }
  function next() { openLightbox((current + 1) % allPhotos.length); }

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', prev);
  document.getElementById('lb-next').addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  fetch('photos/travel/manifest.json')
    .then(function (res) { return res.json(); })
    .then(function (trips) {
      trips.forEach(function (trip) {
        var article = document.querySelector('article[data-trip="' + trip.id + '"]');
        if (!article) return;
        var grid = article.querySelector('.photo-grid');
        if (!grid) return;
        trip.images.forEach(function (filename) {
          var img = document.createElement('img');
          img.src = 'photos/travel/' + trip.id + '/' + filename;
          img.alt = titleFromFilename(filename);
          grid.appendChild(img);
        });
      });
      initLightbox();
    })
    .catch(function (err) {
      console.error('Failed to load photo manifest:', err);
    });

  document.querySelectorAll('.photo-section[data-manifest]').forEach(function (section) {
    var manifestUrl = section.getAttribute('data-manifest');
    var grid = section.querySelector('.photo-grid');
    if (!grid) return;
    var basePath = manifestUrl.replace(/\/[^/]+$/, '/');
    fetch(manifestUrl)
      .then(function (res) { return res.json(); })
      .then(function (images) {
        images.forEach(function (filename) {
          if (typeof filename !== 'string' || /[<>"']/.test(filename)) return;
          var img = document.createElement('img');
          img.src = basePath + filename;
          img.alt = titleFromFilename(filename);
          grid.appendChild(img);
        });
        initLightbox();
      })
      .catch(function (err) {
        console.error('Failed to load photo manifest:', err);
      });
  });
})();
