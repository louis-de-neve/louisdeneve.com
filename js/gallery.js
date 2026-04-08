(function () {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var lbImg    = document.getElementById('lb-img');
  if (!lightbox || !lbImg) return;

  var allPhotos = [];
  var current   = 0;

  document.querySelectorAll('.photo-grid img').forEach(function (img) {
    allPhotos.push({ src: img.src, alt: img.alt });
    img.addEventListener('click', function () {
      current = allPhotos.findIndex(function (p) { return p.src === img.src; });
      open(current);
    });
  });

  function open(idx) {
    current = idx;
    lbImg.src = allPhotos[idx].src;
    lbImg.alt = allPhotos[idx].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { open((current - 1 + allPhotos.length) % allPhotos.length); }
  function next() { open((current + 1) % allPhotos.length); }

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', prev);
  document.getElementById('lb-next').addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
})();
