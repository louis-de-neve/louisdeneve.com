const pubRoot = document.getElementById('publications-root');

const badgeClassMap = {
  journal: 'badge-journal',
  conference: 'badge-conference',
  preprint: 'badge-preprint',
};

function createBadge(type, label) {
  const b = document.createElement('span');
  b.className = `pub-badge ${badgeClassMap[type] || ''}`;
  b.textContent = label || (type ? type[0].toUpperCase() + type.slice(1) : '');
  return b;
}

function renderPublication(pub) {
  const wrapper = document.createElement('div');
  wrapper.className = 'pub-full';

  const top = document.createElement('div');
  top.className = 'pub-full-top';

  const badge = createBadge(pub.type, pub.typeLabel || pub.type || 'Publication');
  const titleP = document.createElement('p');
  titleP.className = 'pub-full-title';
  if (pub.href) {
    const a = document.createElement('a');
    a.href = pub.href;
    a.textContent = pub.title;
    titleP.appendChild(a);
  } else {
    titleP.textContent = pub.title;
  }

  top.appendChild(badge);
  top.appendChild(titleP);

  const authors = document.createElement('p');
  authors.className = 'pub-full-authors';
  authors.textContent = pub.authors || '';

  const venue = document.createElement('p');
  venue.className = 'pub-full-venue';
  venue.textContent = pub.venue || (pub.year || '');

  wrapper.append(top, authors, venue);

  if (pub.doi) {
    const doi = document.createElement('p');
    doi.className = 'pub-doi';
    const a = document.createElement('a');
    a.href = pub.doi;
    a.textContent = pub.doi;
    doi.appendChild(a);
    wrapper.appendChild(doi);
  }

  if (pub.abstract) {
    const details = document.createElement('details');
    details.className = 'abstract-toggle';
    const summary = document.createElement('summary');
    summary.textContent = 'Abstract';
    const abs = document.createElement('div');
    abs.className = 'abstract-text';
    abs.textContent = pub.abstract;
    details.append(summary, abs);
    wrapper.appendChild(details);
  }

  return wrapper;
}

function getPubTime(pub) {
  const value = pub.date || pub.year || '';
  const t = Date.parse(value);
  return Number.isNaN(t) ? -Infinity : t;
}

function groupByYear(publications) {
  const groups = new Map();
  for (const p of publications) {
    const dt = p.date ? new Date(p.date) : (p.year ? new Date(`${p.year}-01-01`) : null);
    const year = dt ? String(dt.getFullYear()) : 'Unknown';
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(p);
  }
  // sort years desc
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}

async function loadPublications() {
  if (!pubRoot) return;
  try {
    const res = await fetch(new URL('../data/academic-publications.json', import.meta.url));
    if (!res.ok) throw new Error(`Failed to load publications: ${res.status}`);
    const pubs = await res.json();
    const sorted = [...pubs].sort((a, b) => getPubTime(b) - getPubTime(a));
    const grouped = groupByYear(sorted);

    pubRoot.replaceChildren(); // clear
    for (const [year, items] of grouped) {
      const yg = document.createElement('div');
      yg.className = 'year-group';

      const ylab = document.createElement('p');
      ylab.className = 'year-label';
      ylab.textContent = year;

      const list = document.createElement('div');
      list.className = 'pub-list-full';

      for (const item of items) list.appendChild(renderPublication(item));

      yg.append(ylab, list);
      pubRoot.appendChild(yg);
    }
  } catch (err) {
    console.error(err);
    pubRoot.textContent = 'Publications could not be loaded.';
  }
}

loadPublications();