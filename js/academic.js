(function () {
  'use strict';

  var grid = document.getElementById('projects-grid');
  if (!grid) return;

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  fetch('data/projects.json')
    .then(function (res) { return res.json(); })
    .then(function (projects) {
      projects.forEach(function (project) {
        var statusClass = 'status-' + escapeHtml(project.status);
        var statusLabel = project.status.charAt(0).toUpperCase() + project.status.slice(1);

        var tags = project.tags.map(function (tag) {
          return '<span class="tag">' + escapeHtml(tag) + '</span>';
        }).join('');

        var card = document.createElement('div');
        card.className = 'project-card';

        var top = document.createElement('div');
        top.className = 'project-top';

        var title = document.createElement('p');
        title.className = 'project-title';
        title.textContent = project.title;

        var status = document.createElement('span');
        status.className = 'project-status ' + statusClass;
        status.textContent = statusLabel;

        top.appendChild(title);
        top.appendChild(status);

        var desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.textContent = project.description;

        var tagsDiv = document.createElement('div');
        tagsDiv.className = 'project-tags';
        tagsDiv.innerHTML = tags;

        card.appendChild(top);
        card.appendChild(desc);
        card.appendChild(tagsDiv);

        grid.appendChild(card);
      });
    })
    .catch(function (err) {
      console.error('Failed to load projects:', err);
    });
})();
