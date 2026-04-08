(function () {
  'use strict';

  var SUBSTACK_URL = 'https://louisdeneve.substack.com';
  var API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=' +
    SUBSTACK_URL + '/feed.xml?t=' + Date.now();
  var MAX_POSTS = 5;

  function skeleton() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 3; i++) {
      var s = document.createElement('div');
      s.className = 'substack-skeleton';
      s.innerHTML =
        '<div class="skel-line short"></div>' +
        '<div class="skel-line title"></div>' +
        '<div class="skel-line body"></div>' +
        '<div class="skel-line body2"></div>';
      frag.appendChild(s);
    }
    return frag;
  }

  function renderPosts(container, posts) {
    container.innerHTML = '';
    if (!posts.length) {
      container.innerHTML = '<p class="substack-error">No posts available yet.</p>';
      return;
    }
    var list = document.createElement('div');
    list.className = 'substack-list';

    posts.forEach(function (post) {
      var date = new Date(post.pubDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      var excerpt = post.description
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 220) + '\u2026';

      var a = document.createElement('a');
      a.className = 'substack-post';
      a.href = post.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML =
        '<p class="post-date">' + date + '</p>' +
        '<p class="post-title">' + escapeHtml(post.title) + '</p>' +
        '<p class="post-excerpt">' + escapeHtml(excerpt) + '</p>' +
        '<span class="post-read-more">Read on Substack \u2192</span>';
      list.appendChild(a);
    });

    container.appendChild(list);
  }

  function renderError(container) {
    container.innerHTML =
      '<p class="substack-error">Unable to load posts right now. ' +
      '<a href="' + SUBSTACK_URL + '" target="_blank" rel="noopener noreferrer">' +
      'Visit my Substack directly \u2192</a></p>';
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function load() {
    var containers = document.querySelectorAll('[data-substack-feed]');
    if (!containers.length) return;

    containers.forEach(function (container) {
      container.innerHTML = '';
      container.appendChild(skeleton());
    });

    fetch(API_URL)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status === 'ok' && Array.isArray(data.items)) {
          var posts = data.items.slice(0, MAX_POSTS);
          containers.forEach(function (c) { renderPosts(c, posts); });
        } else {
          containers.forEach(renderError);
        }
      })
      .catch(function () {
        containers.forEach(renderError);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
