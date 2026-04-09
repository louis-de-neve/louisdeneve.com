const root = document.getElementById('home-travel-root');
const MAX_ITEMS = 3;

function getTripTime(trip) {
  const value = trip.date || '';
  const time = Date.parse(value);
  return Number.isNaN(time) ? -Infinity : time;
}

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
}

function renderCard(trip, coverSrc) {
  const card = document.createElement('a');
  card.className = 'card';
  card.href = `travel.html#${trip.id}`;

  const img = document.createElement('img');
  img.className = 'card-cover';
  img.src = coverSrc || 'photos/travel/patagonia/01.svg';
  img.alt = `${trip.title || trip.id} cover photo`;

  const body = document.createElement('div');
  body.className = 'card-body';

  const meta = document.createElement('p');
  meta.className = 'card-meta';
  meta.textContent = `${trip.location || ''}${trip.location && trip.date ? ' — ' : ''}${formatDate(trip.date)}`;

  const title = document.createElement('p');
  title.className = 'card-title';
  title.textContent = trip.title || trip.id;

  const excerpt = document.createElement('p');
  excerpt.className = 'card-excerpt';
  excerpt.textContent = trip.description || '';

  body.append(meta, title, excerpt);
  card.append(img, body);
  return card;
}

async function loadTravel() {
  if (!root) return;

  try {
    const [tripsRes, manifestRes] = await Promise.all([
      fetch(new URL('../data/trips.json', import.meta.url)),
      fetch(new URL('../photos/travel/manifest.json', import.meta.url)),
    ]);

    if (!tripsRes.ok) throw new Error(`Failed to load trips: ${tripsRes.status}`);
    const trips = await tripsRes.json();

    let manifest = [];
    if (manifestRes.ok) manifest = await manifestRes.json();

    const imageMap = new Map(
      (manifest || []).map((entry) => [entry.id, Array.isArray(entry.images) ? entry.images : []])
    );

    const sorted = [...trips].sort((a, b) => getTripTime(b) - getTripTime(a));
    const selected = sorted.slice(0, MAX_ITEMS);

    root.replaceChildren(
      ...selected.map((trip) => {
        const images = imageMap.get(trip.id) || [];
        const cover = images.length ? `photos/travel/${trip.id}/${images[0]}` : '';
        return renderCard(trip, cover);
      })
    );
  } catch (err) {
    console.error(err);
    root.textContent = 'Travel posts could not be loaded.';
  }
}

loadTravel();