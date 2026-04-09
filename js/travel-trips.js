const root = document.getElementById('trips-root');

function createTripArticle(trip, images = []) {
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

  images.forEach((imgName, idx) => {
    const img = document.createElement('img');
    img.src = `photos/travel/${trip.id}/${imgName}`;
    img.alt = `${trip.title || trip.id} — photo ${idx + 1}`;
    img.loading = 'lazy';
    grid.appendChild(img);
  });

  article.append(loc, header, desc, grid);
  return article;
}

async function loadTrips() {
  if (!root) return;
  try {
    const [trRes, manifestRes] = await Promise.all([
      fetch(new URL('../data/trips.json', import.meta.url)),
      fetch(new URL('../photos/travel/manifest.json', import.meta.url))
    ]);

    if (!trRes.ok) throw new Error(`Failed to load trips: ${trRes.status}`);
    const trips = await trRes.json();

    let manifest = [];
    if (manifestRes.ok) {
      manifest = await manifestRes.json();
    }
    const manifestMap = new Map((manifest || []).map(m => [m.id, m.images || []]));

    trips.sort((a, b) => {
      const ta = a.date ? Date.parse(a.date) : -Infinity;
      const tb = b.date ? Date.parse(b.date) : -Infinity;
      return tb - ta;
    });

    const nodes = trips.map(trip => {
      const imagesFromManifest = manifestMap.get(trip.id) || [];
      const images = trip.images || imagesFromManifest;
      return createTripArticle(trip, images);
    });

    root.replaceChildren(...nodes);
  } catch (err) {
    console.error(err);
    root.textContent = 'Trips could not be loaded.';
  }
}

loadTrips();