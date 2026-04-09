const root = document.getElementById('home-publications-root');
const MAX_ITEMS = 3;

function getPubTime(pub) {
  const value = pub.date || pub.year || '';
  const time = Date.parse(value);
  return Number.isNaN(time) ? -Infinity : time;
}

function renderItem(pub) {
  const item = document.createElement('div');
  item.className = 'pub-item';

  const badge = document.createElement('span');
  badge.className = `pub-badge badge-${pub.type || 'preprint'}`;
  badge.textContent = pub.typeLabel || pub.type || 'Publication';

  const meta = document.createElement('div');

  const title = document.createElement('p');
  title.className = 'pub-title';

  if (pub.href) {
    const a = document.createElement('a');
    a.href = pub.href;
    a.textContent = pub.title;
    title.appendChild(a);
  } else {
    title.textContent = pub.title;
  }

  const authors = document.createElement('p');
  authors.className = 'pub-authors';
  authors.textContent = pub.authors || '';

  const venue = document.createElement('p');
  venue.className = 'pub-venue';
  venue.textContent = pub.venue || pub.year || '';

  meta.append(title, authors, venue);
  item.append(badge, meta);
  return item;
}

async function loadPublications() {
  if (!root) return;

  try {
    const res = await fetch(new URL('../data/academic-publications.json', import.meta.url));
    if (!res.ok) throw new Error(`Failed to load publications: ${res.status}`);

    const pubs = await res.json();
    const sorted = [...pubs].sort((a, b) => getPubTime(b) - getPubTime(a));
    root.replaceChildren(...sorted.slice(0, MAX_ITEMS).map(renderItem));
  } catch (err) {
    console.error(err);
    root.textContent = 'Publications could not be loaded.';
  }
}

loadPublications();