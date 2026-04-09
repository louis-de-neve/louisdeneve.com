const grid = document.getElementById('projects-grid');

const statusClassMap = {
  active: 'status-active',
  completed: 'status-completed',
};

function createTag(text) {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = text;
  return tag;
}

function renderProject(project) {
  const card = project.href ? document.createElement('a') : document.createElement('div');
  card.className = 'project-card';

  if (project.href) {
    card.href = project.href;
  }

  const top = document.createElement('div');
  top.className = 'project-top';

  const title = document.createElement('p');
  title.className = 'project-title';
  title.textContent = project.title;

  const status = document.createElement('span');
  const statusType = project.statusType || 'active';
  status.className = `project-status ${statusClassMap[statusType] || 'status-active'}`;
  status.textContent = project.statusLabel || 'Active';

  top.append(title, status);

  const desc = document.createElement('p');
  desc.className = 'project-desc';
  desc.textContent = project.description;

  const tags = document.createElement('div');
  tags.className = 'project-tags';
  (project.tags || []).forEach((tagText) => tags.appendChild(createTag(tagText)));

  card.append(top, desc, tags);
  return card;
}

function getProjectDate(project) {
  const value = project.date || project.dateTag || '';
  const time = Date.parse(value);
  return Number.isNaN(time) ? -Infinity : time;
}

async function loadProjects() {
  if (!grid) return;

  try {
    const response = await fetch(new URL('../data/academic-projects.json', import.meta.url));
    if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);

    const projects = await response.json();
    const sortedProjects = [...projects].sort((a, b) => getProjectDate(b) - getProjectDate(a));

    grid.replaceChildren(...sortedProjects.map(renderProject));
  } catch (error) {
    console.error(error);
    grid.textContent = 'Projects could not be loaded.';
  }
}

loadProjects();