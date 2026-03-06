(function() {
  // Determine current site from path
  var path = window.location.pathname;
  var match = path.match(/\/0([1-5])\//);
  var current = match ? match[1] : null;

  // Resolve base path to sko27 root
  var base = path.replace(/\/0[1-5]\/.*$/, '/');

  var sites = [
    { id: '1', label: '01', title: 'Web Design 01' },
    { id: '2', label: '02', title: 'Web Design 02' },
    { id: '3', label: '03', title: 'Web Design 03' },
    { id: '4', label: '04', title: 'Web Design 04' },
    { id: '5', label: '05', title: 'Web Design 05' }
  ];

  // Build CSS
  var css = document.createElement('style');
  css.textContent = [
    '.sko-switcher{position:fixed;bottom:20px;right:20px;z-index:99999;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;gap:10px}',
    '.sko-switcher-label{color:#fff;font-size:12px;font-weight:500;background:rgba(31,31,32,0.85);backdrop-filter:blur(8px);padding:6px 14px;border-radius:100px;box-shadow:0 4px 16px rgba(0,0,0,0.3);white-space:nowrap;cursor:pointer;transition:background .15s ease}',
    '.sko-switcher-label:hover{background:rgba(55,55,56,0.95)}',
    '.sko-switcher-panel svg rect,.sko-switcher-panel svg path{fill:none !important;stroke:currentColor !important;stroke-width:1.5 !important}',
    '.sko-switcher-panel{position:absolute;bottom:40px;right:0;background:#1F1F20;border-radius:12px;padding:8px;min-width:200px;box-shadow:0 8px 32px rgba(0,0,0,0.5);opacity:0;visibility:hidden;transform:translateY(8px) scale(0.95);transition:all .15s ease}',
    '.sko-switcher-panel.is-open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}',
    '.sko-switcher-panel a{display:block;padding:10px 14px;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:500;transition:background .12s ease}',
    '.sko-switcher-panel a:hover{background:rgba(120,85,250,0.15)}',
    '.sko-switcher-panel a.is-current{background:rgba(120,85,250,0.2);pointer-events:none}',
    '.sko-switcher-panel .sko-divider{height:1px;background:rgba(255,255,255,0.08);margin:6px 10px}',
    '.sko-switcher-panel hr{border:none;height:1px;background:rgba(255,255,255,0.08);margin:4px 10px}',
    '.sko-switcher-panel a.sko-dashboard{color:#9CA3AF}',
    '.sko-switcher-panel a.sko-dashboard:hover{color:#fff}'
  ].join('\n');
  document.head.appendChild(css);

  // Build HTML
  var wrap = document.createElement('div');
  wrap.className = 'sko-switcher';

  var panel = document.createElement('div');
  panel.className = 'sko-switcher-panel';

  // Dashboard link
  var dashLink = document.createElement('a');
  dashLink.href = base + 'index.html';
  dashLink.className = 'sko-dashboard';
  dashLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6l6-4 6 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z"/><path d="M6 14V9h4v5"/></svg> Dashboard';
  panel.appendChild(dashLink);

  var div = document.createElement('div');
  div.className = 'sko-divider';
  panel.appendChild(div);

  // Site links
  sites.forEach(function(site, i) {
    var a = document.createElement('a');
    a.href = base + '0' + site.id + '/index.html';
    if (current === site.id) a.className = 'is-current';
    a.textContent = site.title;
    panel.appendChild(a);
    if (i < sites.length - 1) {
      var hr = document.createElement('hr');
      panel.appendChild(hr);
    }
  });

  document.addEventListener('click', function() {
    panel.classList.remove('is-open');
  });

  panel.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  var label = document.createElement('span');
  label.className = 'sko-switcher-label';
  label.textContent = 'Switch Sites';
  label.addEventListener('click', function(e) {
    e.stopPropagation();
    panel.classList.toggle('is-open');
  });

  wrap.appendChild(panel);
  wrap.appendChild(label);
  document.body.appendChild(wrap);
})();
