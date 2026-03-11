(function() {
  // Determine current site from path
  var path = window.location.pathname;
  var match = path.match(/\/0([1-3])\//);
  var current = match ? match[1] : null;

  // Resolve base path to sko27 root
  var base = path.replace(/\/0[1-3]\/.*$/, '/');

  var sites = [
    { id: '1', label: '01', title: 'Web Design 01' },
    { id: '2', label: '02', title: 'Web Design 02' },
    { id: '3', label: '03', title: 'Web Design 03' }
  ];

  // Build CSS
  var css = document.createElement('style');
  css.textContent = [
    '.sko-switcher,.sko-switcher *{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif !important;box-sizing:border-box !important}',
    '.sko-switcher{position:fixed;bottom:20px;right:20px;z-index:99999;display:flex;align-items:center;gap:10px}',
    '.sko-switcher-label{color:#fff;font-size:12px !important;font-weight:500;background:rgba(31,31,32,0.85);backdrop-filter:blur(8px);padding:6px 14px;border-radius:100px;box-shadow:0 4px 16px rgba(0,0,0,0.3);white-space:nowrap;cursor:pointer;transition:background .15s ease}',
    '.sko-switcher-label:hover{background:rgba(55,55,56,0.95)}',
    '.sko-switcher-panel svg rect,.sko-switcher-panel svg path{fill:none !important;stroke:currentColor !important;stroke-width:1.5 !important}',
    '.sko-switcher-panel{position:absolute;bottom:40px;right:0;background:#1F1F20;border-radius:12px;padding:8px;min-width:280px;box-shadow:0 8px 32px rgba(0,0,0,0.5);opacity:0;visibility:hidden;transform:translateY(8px) scale(0.95);transition:all .15s ease}',
    '.sko-switcher-panel.is-open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}',
    '.sko-switcher-panel a{display:block;padding:10px 14px;color:#fff !important;text-decoration:none !important;border:none !important;border-bottom:none !important;border-radius:8px;font-size:13px !important;font-weight:500;transition:background .12s ease;margin:0 !important;line-height:1.4 !important}',
    '.sko-switcher-panel a:hover{background:rgba(120,85,250,0.15);color:#fff !important;border:none !important;border-bottom:none !important}',
    '.sko-switcher-panel a.is-current{background:rgba(120,85,250,0.2)}',
    '.sko-switcher-panel .sko-divider{height:1px;background:rgba(255,255,255,0.08);margin:6px 10px}',
    '.sko-switcher-panel .sko-section-divider{height:1px;border:none !important;border-radius:0 !important;background:rgba(255,255,255,0.08);margin:4px 10px;padding:0 !important}',
    '.sko-switcher-panel a.sko-dashboard{color:#9CA3AF !important;font-size:13px !important}',
    '.sko-switcher-panel a.sko-dashboard:hover{color:#fff !important}',
    '.sko-switcher-panel .sko-section{font-size:10px !important;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;padding:12px 14px 6px;pointer-events:none}',
    '.sko-switcher-panel .sko-link{display:flex;align-items:center;gap:8px;padding:8px 14px;text-decoration:none !important;border:none !important;border-bottom:none !important;color:#9CA3AF !important;border-radius:8px;font-size:12px !important;font-weight:500;transition:color .12s ease,background .12s ease;margin:0 !important;line-height:1.4 !important}',
    '.sko-switcher-panel .sko-link:hover{color:#fff !important;background:rgba(120,85,250,0.1);border:none !important;border-bottom:none !important}',
    '.sko-switcher-panel .sko-link.is-current{color:#fff !important;background:rgba(120,85,250,0.2);cursor:pointer}',
    '.sko-switcher-panel .sko-link .sko-badge{display:inline-block;font-size:9px !important;font-weight:600;letter-spacing:0.04em;color:#9B7FFF;background:rgba(120,85,250,0.12);padding:2px 6px;border-radius:3px;flex-shrink:0;min-width:44px;text-align:center}',
    '.sko-switcher-panel .sko-link .sko-link-label{flex:1;font-size:12px !important}',
    '.sko-switcher-panel .sko-link svg{width:12px;height:12px;opacity:0.3;flex-shrink:0}',
    '.sko-switcher-panel .sko-link:hover svg{opacity:0.8}',
    '.sko-switcher-panel .sko-link-divider{height:1px;background:rgba(255,255,255,0.05);margin:2px 14px}'
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

  // Determine current page for highlighting
  var currentPage = path.split('/').pop() || 'index.html';
  var isEmailPage = path.indexOf('/emails/') !== -1;

  var arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>';

  function makeLink(href, badgeText, labelText, isCurrent) {
    var a = document.createElement('a');
    a.href = href;
    a.className = 'sko-link' + (isCurrent ? ' is-current' : '');
    a.innerHTML = '<span class="sko-badge">' + badgeText + '</span><span class="sko-link-label">' + labelText + '</span>' + arrowSvg;
    return a;
  }

  function makeLinkDivider() {
    var d = document.createElement('div');
    d.className = 'sko-link-divider';
    return d;
  }

  // Site links with email sub-links
  sites.forEach(function(site, i) {
    // Section header
    var section = document.createElement('div');
    section.className = 'sko-section';
    section.textContent = 'DESIGN 0' + site.id;
    panel.appendChild(section);

    // Website link
    var isWebCurrent = current === site.id && !isEmailPage;
    panel.appendChild(makeLink(base + '0' + site.id + '/index.html', 'Website', 'View Site', isWebCurrent));

    panel.appendChild(makeLinkDivider());

    // Email save the date link
    var isInviteCurrent = current === site.id && isEmailPage && currentPage === 'savedate.html';
    panel.appendChild(makeLink(base + '0' + site.id + '/emails/savedate.html', 'Email', 'Save the Date', isInviteCurrent));

    panel.appendChild(makeLinkDivider());

    // Email registration open link
    var isConfirmCurrent = current === site.id && isEmailPage && currentPage === 'regopen.html';
    panel.appendChild(makeLink(base + '0' + site.id + '/emails/regopen.html', 'Email', 'Registration Open', isConfirmCurrent));

    if (i < sites.length - 1) {
      var sectionDiv = document.createElement('div');
      sectionDiv.className = 'sko-section-divider';
      panel.appendChild(sectionDiv);
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
  label.textContent = 'Switch Designs';
  label.addEventListener('click', function(e) {
    e.stopPropagation();
    panel.classList.toggle('is-open');
  });

  wrap.appendChild(panel);
  wrap.appendChild(label);
  document.body.appendChild(wrap);
})();
