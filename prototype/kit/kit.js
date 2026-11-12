/*!
 * Prototype kit: mechanics (v1)
 *
 * Shared by every prototype. Don't edit it per project; configure everything with
 * data- attributes. Works from file:// with no server, no build step, no network.
 * Load it at the end of <body>.
 *
 *  Screens    <section data-screen="id" [data-start] [data-title="Name"]>
 *  Navigate   data-go="id"          data-back[="fallback-id"]
 *             Nav highlight: put links inside [data-nav]; data-nav-match="id1,id2" for sub-screens
 *  Delay      data-delay="1200" [data-loading-text="…"] on any action, to simulate latency
 *  State      data-set="key=value; k2=v2"    data-toggle-state="key"
 *             data-model="key" on inputs (two-way)
 *  Show/hide  data-show-if="key" | "!key" | "key=value" | "key!=value" | "#dataset=0"
 *             data-hide-if="…" (same syntax)
 *  Text       data-bind="key" or "dataset.field" (a field of the selected record)
 *  Data       <script type="application/json" id="proto-data">{"customers":[{"id":"c1",…}]}</script>
 *             <template data-repeat="customers"> … {{field}} … </template>
 *             data-select="customers:{{id}}" selects a record for data-bind
 *  Forms      <form data-submit-go="id" data-submit-set="k=v" data-submit-toast="Saved" [data-delay]>
 *             Validates (HTML required, type, pattern), saves named fields to state, closes its dialog.
 *  Dialogs    <dialog class="dialog" id="x">   data-open="x"   data-close
 *  Feedback   data-toast="Saved" [data-toast-type="success|warning|danger"]
 *  Tabs       <div data-tabs> [data-tab="a"] … [data-panel="a"] </div>
 *  Variants   <body data-variants="A,B">  +  data-variant="A" on alternative blocks
 *  Looks      <link id="proto-tokens" href="tokens.css">  +  <body data-looks="Brand:tokens.css,Bold:tokens-bold.css">
 *  Notes      data-note="R1: …" (shown when Notes is on)    class="proto-demo" for demo-only controls
 *  URL        ?present hides the toolbar and demo controls   ?check runs the check   ?tokens=file.css
 *  JS API     Proto.go(id), Proto.toast(msg, type), Proto.check(), Proto.reset(), Proto.state, Proto.data
 */
(function () {
  'use strict';

  var html = document.documentElement;
  var body = document.body;
  var params = new URLSearchParams(location.search);
  var KEY = 'proto:' + (body.getAttribute('data-proto-id') || location.pathname);
  var baseTitle = document.title;
  var current = null;
  var state = read();
  var data = {};

  try {
    var dataEl = document.getElementById('proto-data');
    if (dataEl) data = JSON.parse(dataEl.textContent);
  } catch (err) {
    console.error('[prototype] #proto-data is not valid JSON', err);
  }

  /* ---------- storage (optional: the prototype works without it) ---------- */
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function write() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* blocked: state lasts for this page view */ }
  }

  /* ---------- helpers ---------- */
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function one(sel, root) { return (root || document).querySelector(sel); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function truthy(v) { return !!v && v !== 'false' && v !== '0'; }
  function bodyList(attr) {
    return (body.getAttribute(attr) || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function screens() { return all('[data-screen]'); }
  function screenIds() { return screens().map(function (s) { return s.getAttribute('data-screen'); }); }
  function startId() {
    var s = one('[data-screen][data-start]') || screens()[0];
    return s ? s.getAttribute('data-screen') : null;
  }
  function hashId() { return decodeURIComponent(location.hash.replace(/^#\/?/, '')); }

  /* ---------- data and state ---------- */
  function selected(name) {
    var rows = data[name];
    if (!Array.isArray(rows) || !rows.length) return undefined;
    var id = state['$' + name];
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].id) === String(id)) return rows[i];
    }
    return rows[0];
  }
  function lookup(path) {
    path = path.trim();
    if (path.charAt(0) === '#') {
      var rows = data[path.slice(1)];
      return Array.isArray(rows) ? rows.length : 0;
    }
    var dot = path.indexOf('.');
    if (dot > 0 && Array.isArray(data[path.slice(0, dot)])) {
      var rec = selected(path.slice(0, dot));
      return rec ? rec[path.slice(dot + 1)] : undefined;
    }
    return state[path];
  }
  function test(expr) {
    expr = expr.trim();
    if (expr.charAt(0) === '!' && expr.charAt(1) !== '=') return !test(expr.slice(1));
    var m = expr.match(/^(.+?)(!=|=)(.*)$/);
    if (!m) return truthy(lookup(expr));
    var v = lookup(m[1]);
    v = v == null ? '' : String(v);
    return m[2] === '=' ? v === m[3].trim() : v !== m[3].trim();
  }
  function assign(pairs) {
    pairs.split(';').forEach(function (pair) {
      var i = pair.indexOf('=');
      if (i < 0) return;
      var k = pair.slice(0, i).trim();
      var v = pair.slice(i + 1).trim();
      if (k) state[k] = v === 'true' ? true : v === 'false' ? false : v;
    });
  }

  /* ---------- rendering ---------- */
  function renderRepeats() {
    all('template[data-repeat]').forEach(function (tpl) {
      var name = tpl.getAttribute('data-repeat');
      var rows = data[name];
      if (!Array.isArray(rows)) { console.warn('[prototype] no data for data-repeat="' + name + '"'); return; }
      var source = tpl.innerHTML;
      var out = document.createElement('template');
      out.innerHTML = rows.map(function (row) {
        return source.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, function (_, k) { return esc(row[k]); });
      }).join('');
      tpl.parentNode.insertBefore(out.content, tpl);
    });
  }

  function render() {
    all('[data-show-if]').forEach(function (el) { el.hidden = !test(el.getAttribute('data-show-if')); });
    all('[data-hide-if]').forEach(function (el) { el.hidden = test(el.getAttribute('data-hide-if')); });
    all('[data-variant]').forEach(function (el) { el.hidden = el.getAttribute('data-variant') !== state._variant; });
    all('[data-bind]').forEach(function (el) {
      if (!el.hasAttribute('data-fallback')) el.setAttribute('data-fallback', el.textContent);
      var v = lookup(el.getAttribute('data-bind'));
      el.textContent = v == null || v === '' ? el.getAttribute('data-fallback') : v;
    });
    all('[data-model]').forEach(function (el) {
      var v = state[el.getAttribute('data-model')];
      if (v === undefined) return;
      if (el.type === 'checkbox') el.checked = truthy(v);
      else if (el.type === 'radio') el.checked = el.value === String(v);
      else if (el !== document.activeElement) el.value = v;
    });
    if (state._theme) html.setAttribute('data-theme', state._theme); else html.removeAttribute('data-theme');
    html.classList.toggle('proto-mobile', state._device === 'mobile');
    html.classList.toggle('proto-notes-on', truthy(state._notes));
    var tokens = one('#proto-tokens');
    if (tokens && state._look && tokens.getAttribute('href') !== state._look) tokens.setAttribute('href', state._look);
    syncChrome();
  }

  /* ---------- navigation ---------- */
  function show(id) {
    if (screenIds().indexOf(id) < 0) id = startId();
    current = id;
    screens().forEach(function (s) { s.hidden = s.getAttribute('data-screen') !== id; });
    all('[data-nav] [data-go]').forEach(function (el) {
      var also = (el.getAttribute('data-nav-match') || '').split(',').map(function (s) { return s.trim(); });
      var on = el.getAttribute('data-go') === id || also.indexOf(id) >= 0;
      el.classList.toggle('is-active', on);
      if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });
    var scr = one('[data-screen="' + id + '"]');
    var title = scr && scr.getAttribute('data-title');
    document.title = title ? title + ' · ' + baseTitle : baseTitle;
    var root = one('.proto-root');
    if (root) root.scrollTop = 0;
    window.scrollTo(0, 0);
    render();
  }

  function go(id) {
    if (screenIds().indexOf(id) < 0) {
      toast('Not in this prototype yet: “' + id + '”', 'warning');
      return;
    }
    if (hashId() === id) show(id); else location.hash = '/' + id;
  }

  window.addEventListener('hashchange', function () { show(hashId() || startId()); });

  /* ---------- dialogs, tabs, feedback ---------- */
  function openDialog(id) {
    var d = document.getElementById(id);
    if (d && typeof d.showModal === 'function') { if (!d.open) d.showModal(); }
    else toast('Not in this prototype yet: “' + id + '”', 'warning');
  }

  function selectTab(btn) {
    var group = btn.closest('[data-tabs]');
    if (!group) return;
    var id = btn.getAttribute('data-tab');
    all('[data-tab]', group).forEach(function (b) {
      if (b.closest('[data-tabs]') !== group) return;
      var on = b.getAttribute('data-tab') === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    all('[data-panel]', group).forEach(function (p) {
      if (p.closest('[data-tabs]') !== group) return;
      p.hidden = p.getAttribute('data-panel') !== id;
    });
  }
  function initTabs() {
    all('[data-tabs]').forEach(function (group) {
      var first = one('[data-tab].is-active', group) || one('[data-tab]', group);
      if (first) selectTab(first);
    });
  }

  function toast(msg, type) {
    var host = one('.proto-toasts');
    if (!host) {
      host = document.createElement('div');
      host.className = 'proto-toasts';
      host.setAttribute('role', 'status');
      host.setAttribute('aria-live', 'polite');
      body.appendChild(host);
    }
    var t = document.createElement('div');
    t.className = 'toast' + (type ? ' toast-' + type : '');
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(function () {
      t.classList.add('is-leaving');
      setTimeout(function () { t.remove(); }, 300);
    }, 3200);
  }

  function loading(on, text) {
    var el = one('.proto-loading');
    if (!el) {
      el = document.createElement('div');
      el.className = 'proto-loading';
      el.innerHTML = '<div class="proto-loading-box" role="status"><div class="spinner" aria-hidden="true"></div><p></p></div>';
      body.appendChild(el);
    }
    el.querySelector('p').textContent = text || 'Loading…';
    el.classList.toggle('is-on', !!on);
  }

  function withDelay(el, fn) {
    var ms = parseInt(el.getAttribute('data-delay'), 10) || 0;
    if (!ms) { fn(); return; }
    loading(true, el.getAttribute('data-loading-text'));
    setTimeout(function () { loading(false); fn(); }, ms);
  }

  /* ---------- actions ---------- */
  var ACTION = '[data-go],[data-back],[data-set],[data-toggle-state],[data-select],[data-open],[data-close],[data-toast],[data-tab]';

  function perform(el) {
    if (el.hasAttribute('data-tab')) selectTab(el);
    if (el.hasAttribute('data-select')) {
      var sel = el.getAttribute('data-select');
      var i = sel.indexOf(':');
      if (i > 0) state['$' + sel.slice(0, i).trim()] = sel.slice(i + 1).trim();
    }
    if (el.hasAttribute('data-set')) assign(el.getAttribute('data-set'));
    if (el.hasAttribute('data-toggle-state')) {
      var k = el.getAttribute('data-toggle-state');
      state[k] = !truthy(state[k]);
    }
    write();
    if (el.hasAttribute('data-close')) { var d = el.closest('dialog'); if (d) d.close(); }
    if (el.hasAttribute('data-open')) openDialog(el.getAttribute('data-open'));
    if (el.hasAttribute('data-toast')) toast(el.getAttribute('data-toast'), el.getAttribute('data-toast-type'));
    if (el.hasAttribute('data-back')) {
      if (history.length > 1) history.back(); else go(el.getAttribute('data-back') || startId());
    } else if (el.hasAttribute('data-go')) {
      go(el.getAttribute('data-go'));
    }
    render();
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName === 'DIALOG' && t.classList.contains('dialog')) { t.close(); return; } // backdrop click
    var el = t.closest && t.closest(ACTION);
    if (!el || el.closest('.proto-chrome')) return;
    if (el.tagName === 'A' || el.tagName === 'BUTTON') e.preventDefault();
    withDelay(el, function () { perform(el); });
  });

  function onModel(e) {
    var el = e.target;
    var k = el && el.getAttribute && el.getAttribute('data-model');
    if (!k) return;
    if (el.type === 'radio' && !el.checked) return;
    state[k] = el.type === 'checkbox' ? el.checked : el.value;
    write();
    render();
  }
  document.addEventListener('input', onModel);
  document.addEventListener('change', onModel);

  document.addEventListener('submit', function (e) {
    var form = e.target;
    var handled = ['data-submit-go', 'data-submit-set', 'data-submit-toast'].some(function (a) { return form.hasAttribute(a); });
    if (!handled) return;
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    withDelay(form, function () {
      new FormData(form).forEach(function (v, k) { if (typeof v === 'string') state[k] = v; });
      if (form.hasAttribute('data-submit-set')) assign(form.getAttribute('data-submit-set'));
      write();
      var d = form.closest('dialog');
      if (d) { d.close(); form.reset(); }
      if (form.hasAttribute('data-submit-toast')) toast(form.getAttribute('data-submit-toast'), form.getAttribute('data-toast-type') || 'success');
      if (form.hasAttribute('data-submit-go')) go(form.getAttribute('data-submit-go'));
      render();
    });
  });

  /* ---------- toolbar ---------- */
  function buildChrome() {
    if (params.has('present') || body.getAttribute('data-chrome') === 'off') {
      html.classList.add('proto-present');
      return;
    }
    var variants = bodyList('data-variants');
    var looks = bodyList('data-looks');
    var hasDark = getComputedStyle(html).getPropertyValue('--has-dark-theme').trim() === '1';

    var h = '<button type="button" class="proto-chrome-badge" data-proto="collapse" title="Show or hide prototype controls">Prototype</button>';
    h += '<select data-proto="screen" aria-label="Jump to screen">' + screens().map(function (s) {
      var id = s.getAttribute('data-screen');
      return '<option value="' + esc(id) + '">' + esc(s.getAttribute('data-title') || id) + '</option>';
    }).join('') + '</select>';
    if (variants.length) {
      h += '<select data-proto="variant" aria-label="Variant">' + variants.map(function (v) {
        return '<option value="' + esc(v) + '">Variant ' + esc(v) + '</option>';
      }).join('') + '</select>';
    }
    if (looks.length) {
      h += '<select data-proto="look" aria-label="Look">' + looks.map(function (l) {
        var i = l.indexOf(':');
        var label = i > 0 ? l.slice(0, i) : l;
        var file = i > 0 ? l.slice(i + 1) : l;
        return '<option value="' + esc(file) + '">' + esc(label) + '</option>';
      }).join('') + '</select>';
    }
    h += '<button type="button" data-proto="device" aria-pressed="false">Mobile</button>';
    if (hasDark) h += '<button type="button" data-proto="theme" aria-pressed="false">Dark</button>';
    h += '<button type="button" data-proto="notes" aria-pressed="false">Notes</button>';
    h += '<button type="button" data-proto="check">Check</button>';
    h += '<button type="button" data-proto="reset">Reset</button>';

    var bar = document.createElement('div');
    bar.className = 'proto-chrome';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Prototype controls');
    bar.innerHTML = h;
    body.appendChild(bar);

    bar.addEventListener('change', function (e) {
      var w = e.target.getAttribute('data-proto');
      if (w === 'screen') go(e.target.value);
      if (w === 'variant') state._variant = e.target.value;
      if (w === 'look') state._look = e.target.value;
      write();
      render();
    });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-proto]');
      if (!b) return;
      var w = b.getAttribute('data-proto');
      if (w === 'check') { check(); return; }
      if (w === 'reset') { reset(); return; }
      if (w === 'collapse') state._chrome = state._chrome === 'collapsed' ? '' : 'collapsed';
      if (w === 'device') state._device = state._device === 'mobile' ? '' : 'mobile';
      if (w === 'theme') state._theme = state._theme === 'dark' ? '' : 'dark';
      if (w === 'notes') state._notes = !truthy(state._notes);
      write();
      render();
    });
  }

  function syncChrome() {
    var bar = one('.proto-chrome');
    if (!bar) return;
    bar.classList.toggle('is-collapsed', state._chrome === 'collapsed');
    var s = one('[data-proto="screen"]', bar);
    if (s && current) s.value = current;
    var v = one('[data-proto="variant"]', bar);
    if (v && state._variant) v.value = state._variant;
    var l = one('[data-proto="look"]', bar);
    if (l && state._look) l.value = state._look;
    pressed('device', state._device === 'mobile');
    pressed('theme', state._theme === 'dark');
    pressed('notes', truthy(state._notes));
    function pressed(w, on) {
      var b = one('[data-proto="' + w + '"]', bar);
      if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function reset() {
    Object.keys(state).forEach(function (k) { if (k.charAt(0) !== '_') delete state[k]; });
    write();
    all('form').forEach(function (f) { if (!f.closest('.proto-chrome')) f.reset(); });
    initTabs();
    go(startId());
    render();
    toast('Prototype reset');
  }

  /* ---------- check: dead links, unreachable screens, basic accessibility ---------- */
  function describe(el) {
    var s = el.closest('[data-screen]');
    var text = (el.getAttribute('aria-label') || el.textContent || el.tagName).replace(/\s+/g, ' ').trim().slice(0, 40);
    return '“' + text + '”' + (s ? ' on ' + s.getAttribute('data-screen') : ' (outside screens)');
  }

  function check() {
    var ids = screenIds();
    var problems = [];
    var seen = {};
    if (!ids.length) problems.push('No screens found. Add <section data-screen="…">.');
    ids.forEach(function (id) {
      if (seen[id]) problems.push('Duplicate screen id “' + id + '”');
      seen[id] = true;
    });

    var edges = {};
    var global = [];
    all('[data-go],[data-submit-go]').forEach(function (el) {
      var target = el.getAttribute('data-go') || el.getAttribute('data-submit-go');
      if (ids.indexOf(target) < 0) problems.push('Link to missing screen “' + target + '” from ' + describe(el));
      var s = el.closest('[data-screen]');
      if (s) {
        var from = s.getAttribute('data-screen');
        (edges[from] = edges[from] || []).push(target);
      } else {
        global.push(target);
      }
    });
    all('[data-open]').forEach(function (el) {
      var id = el.getAttribute('data-open');
      if (!document.getElementById(id)) problems.push('Missing dialog “' + id + '” opened from ' + describe(el));
    });
    all('template[data-repeat]').forEach(function (t) {
      var name = t.getAttribute('data-repeat');
      if (!Array.isArray(data[name])) problems.push('No data for data-repeat “' + name + '” in #proto-data');
    });

    var start = startId();
    var reached = {};
    var queue = start ? [start] : [];
    while (queue.length) {
      var at = queue.shift();
      if (reached[at]) continue;
      reached[at] = true;
      (edges[at] || []).concat(global).forEach(function (t) { if (!reached[t]) queue.push(t); });
    }
    ids.forEach(function (id) {
      if (!reached[id]) problems.push('Screen “' + id + '” can’t be reached from the start screen');
    });

    all('img:not([alt])').forEach(function (el) { problems.push('Image without alt text: ' + (el.getAttribute('src') || '(inline)')); });
    all('input, select, textarea').forEach(function (el) {
      if (el.closest('.proto-chrome') || ['hidden', 'submit', 'button', 'reset'].indexOf(el.type) >= 0) return;
      var labelled = el.closest('label') || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') ||
        (el.id && one('label[for="' + el.id + '"]'));
      if (!labelled) problems.push('Form field without a label: ' + describe(el));
    });
    all('button').forEach(function (el) {
      if (el.closest('.proto-chrome') || el.closest('.proto-check')) return;
      if (!el.textContent.trim() && !el.getAttribute('aria-label')) problems.push('Button without text or aria-label ' + describe(el));
    });

    var d = one('dialog.proto-check');
    if (!d) {
      d = document.createElement('dialog');
      d.className = 'proto-check';
      body.appendChild(d);
    }
    d.innerHTML = '<h2>' + (problems.length ? problems.length + ' issue' + (problems.length > 1 ? 's' : '') + ' found' : 'No issues found') + '</h2>' +
      (problems.length
        ? '<ul>' + problems.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>'
        : '<p>Every link and dialog resolves, every screen is reachable, and form fields, images and buttons are labelled.</p>') +
      '<form method="dialog"><button>Close</button></form>';
    if (typeof d.showModal === 'function' && !d.open) d.showModal();
    if (problems.length) console.warn('[prototype] check found issues:\n- ' + problems.join('\n- '));
    else console.log('[prototype] check: no issues');
    return problems;
  }

  /* ---------- init ---------- */
  var tokensLink = one('#proto-tokens');
  if (params.get('tokens')) state._look = params.get('tokens');
  if (!state._look && tokensLink) state._look = tokensLink.getAttribute('href');
  var variantList = bodyList('data-variants');
  if (variantList.length && variantList.indexOf(state._variant) < 0) state._variant = variantList[0];

  renderRepeats();
  initTabs();
  buildChrome();
  show(hashId() || startId());
  if (params.has('check')) check();

  window.Proto = { go: go, toast: toast, check: check, reset: reset, render: render, state: state, data: data };
})();
