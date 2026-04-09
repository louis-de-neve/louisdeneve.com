const root = document.getElementById('trips-root');
const lightbox = document.getElementById('lightbox');

let galleryItems = [];
let currentIndex = 0;
let lbImg = null;
let lbClose = null;
let lbPrev = null;
let lbNext = null;

function createLightbox() {
  if (!lightbox || lightbox.dataset.ready === '1') return;

  lightbox.innerHTML = `
    <button type="button" class="lb-close" aria-label="Close photo viewer">&times;</button>
    <button type="button" class="lb-prev" aria-label="Previous photo">&#10094;</button>
    <img id="travel-lb-img" alt="">
    <button type="button" class="lb-next" aria-label="Next photo">&#10095;</button>
  `;

  lbImg = lightbox.querySelector('#travel-lb-img');
  lbClose = lightbox.querySelector('.lb-close');
  lbPrev = lightbox.querySelector('.lb-prev');
  lbNext = lightbox.querySelector('.lb-next');

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevPhoto);
  lbNext.addEventListener('click', nextPhoto);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  });

  lightbox.dataset.ready = '1';
}

function refreshGalleryItems() {
  galleryItems = Array.from(root.querySelectorAll('.photo-grid img')).map(function (img) {
    return { src: img.src, alt: img.alt };
  });
}

function openLightbox(index) {
  if (!lightbox || !lbImg || !galleryItems.length) return;

  currentIndex = (index + galleryItems.length) % galleryItems.length;
  lbImg.src = galleryItems[currentIndex].src;
  lbImg.alt = galleryItems[currentIndex].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function prevPhoto() {
  openLightbox(currentIndex - 1);
}

function nextPhoto() {
  openLightbox(currentIndex + 1);
}

function orderImages(images, headerImage) {
  const list = Array.isArray(images) ? [...images] : [];
  if (!headerImage) return list;

  const idx = list.indexOf(headerImage);
  if (idx > 0) {
    list.splice(idx, 1);
    list.unshift(headerImage);
  } else if (idx === -1) {
    list.unshift(headerImage);
  }
  return list;
}

function createTripArticle(trip, images = []) {
  const orderedImages = orderImages(images, trip.headerImage);

  const article = document.createElement('article');
  article.className = 'trip';
  article.id = trip.id;
  article.dataset.trip = trip.id;

  const loc = document.createElement('div');
  loc.className = 'trip-location';
  loc.textContent = trip.location || '';

  const header = document.createElement('div');
  header.className = 'trip-header';

  const h2 = document.createElement('h2');
  h2.textContent = trip.title || '';

  const date = document.createElement('span');
  date.className = 'trip-date';
  date.textContent = trip.date || '';

  header.append(h2, date);

  const desc = document.createElement('p');
  desc.className = 'trip-desc';
  desc.textContent = trip.description || '';

  const grid = document.createElement('div');
  grid.className = 'photo-grid';

  orderedImages.forEach((imgName, idx) => {
    const img = document.createElement('img');
    img.src = `photos/travel/${trip.id}/${imgName}`;
    img.alt = `${trip.title || trip.id} — photo ${idx + 1}`;
    img.loading = 'lazy';
    img.addEventListener('click', function () {
      refreshGalleryItems();
      const clickedIndex = galleryItems.findIndex(function (item) {
        return item.src === img.src;
      });
      if (clickedIndex >= 0) openLightbox(clickedIndex);
    });
    grid.appendChild(img);
  });

  article.append(loc, header, desc, grid);
  return article;
}

async function loadTrips() {
  if (!root) return;

  try {
    createLightbox();

    const [trRes, manifestRes] = await Promise.all([
      fetch(new URL('../data/trips.json', import.meta.url)),
      fetch(new URL('../photos/travel/manifest.json', import.meta.url)),
    ]);

    if (!trRes.ok) throw new Error(`Failed to load trips: ${trRes.status}`);
    const trips = await trRes.json();

    let manifest = [];
    if (manifestRes.ok) {
      manifest = await manifestRes.json();
    }

    const manifestMap = new Map((manifest || []).map((m) => [m.id, m.images || []]));

    trips.sort((a, b) => {
      const ta = a.date ? Date.parse(a.date) : -Infinity;
      const tb = b.date ? Date.parse(b.date) : -Infinity;
      return tb - ta;
    });

    const nodes = trips.map((trip) => {
      const imagesFromManifest = manifestMap.get(trip.id) || [];
      const images = trip.images || imagesFromManifest;
      return createTripArticle(trip, images);
    });

    root.replaceChildren(...nodes);
    refreshGalleryItems();
  } catch (err) {
    console.error(err);
    root.textContent = 'Trips could not be loaded.';
  }
}

loadTrips();