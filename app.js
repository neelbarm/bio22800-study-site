/* =============================================================================
   Ultrasound Physics study site — app logic
   Vanilla JS, no build step, no network. Works from file://.
   Data arrives by injecting <script> tags for every path in window.UNIT_FILES.
   ============================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- utils -- */

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escAttr(s) { return esc(s); }

  function clamp(n, lo, hi) { return n < lo ? lo : (n > hi ? hi : n); }
  function pct(n) { return Math.round(clamp(n, 0, 100)); }
  function plural(n, one, many) { return n === 1 ? one : (many || one + 's'); }

  function shuffleInPlace(arr, rnd) {
    var r = rnd || Math.random;
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* seeded PRNG for drills (never Math.random inside gen) */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var DAY = 86400000;

  function todayKey(d) {
    var t = d || new Date();
    return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  }

  /* ------------------------------------------------ answer normalisation -- */

  /* lowercase, trim, collapse spaces, strip punctuation but keep %, decimal
     points, "/" and unit letters such as the micro sign in "µs". */
  function normAns(s) {
    s = String(s == null ? '' : s).toLowerCase();
    s = s.replace(/[‐-―−]/g, '-');          // fancy dashes -> hyphen
    s = s.replace(/[μµ]/g, 'µ');            // greek mu -> micro sign
    s = s.replace(/[‘’“”]/g, "'");
    s = s.replace(/(\d)[,   ](\d\d\d)(?!\d)/g, '$1$2'); // 1,540 -> 1540
    s = s.replace(/(\d)\.(\d)/g, '$1\u0001$2');            // protect decimal points
    s = s.replace(/[!"#$&'()*+,\-–—_:;<=>?@[\\\]^`{|}~.]/g, ' ');
    s = s.replace(/\u0001/g, '.');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  function shortIsCorrect(input, q) {
    var got = normAns(input);
    if (!got) return false;
    var pool = [q && q.answer].concat((q && q.accept) || []);
    for (var i = 0; i < pool.length; i++) {
      if (pool[i] == null) continue;
      if (normAns(pool[i]) === got) return true;
    }
    return false;
  }

  /* number drill grading: absolute tolerance, plus a 1% relative safety net
     when tol is tiny compared with the answer. */
  function numIsCorrect(input, answer, tol) {
    var v = parseFloat(String(input).replace(/,/g, '').replace(/[^\d.eE+\-]/g, ''));
    if (!isFinite(v)) return false;
    var t = (typeof tol === 'number' && tol >= 0) ? tol : 0;
    var d = Math.abs(v - answer);
    if (d <= t) return true;
    var rel = Math.abs(answer) * 0.01;
    if (t < rel && d <= rel) return true;
    return false;
  }

  /* --------------------------------------------------------------- state -- */

  var KEY = 'usp.v1';

  function defaultState() {
    return {
      v: 1,
      settings: { theme: 'auto', name: '' },
      lessonsDone: {},      // lessonId -> true
      objRatings: {},       // objectiveId -> 0|1|2
      customObjectives: {}, // unitId -> [{text, rating}]
      cards: {},            // unitId#index -> {box:1..3, lastSeen:ms}
      qstats: {},           // questionId -> {attempts, correct}
      missed: {},           // questionId -> {streak, ts}
      board: {},            // promptId -> {score, total, ts}
      mnemonics: {},        // unitId -> [{saying, meaning}]
      days: {}              // 'YYYY-MM-DD' -> true
    };
  }

  var state = defaultState();

  function loadState() {
    var d = defaultState();
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return d;
      var o = JSON.parse(raw);
      if (!o || typeof o !== 'object') return d;
      Object.keys(d).forEach(function (k) {
        if (k === 'v') return;
        if (o[k] && typeof o[k] === 'object') {
          if (k === 'settings') d.settings = { theme: o.settings.theme || 'auto', name: typeof o.settings.name === 'string' ? o.settings.name : '' };
          else d[k] = o[k];
        }
      });
    } catch (e) { /* corrupt or blocked storage: start fresh */ }
    return d;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { /* private mode / quota: keep working in memory */ }
  }

  function markToday() {
    var k = todayKey();
    if (!state.days[k]) { state.days[k] = true; save(); }
  }

  function streakDays() {
    var n = 0, d = new Date();
    if (!state.days[todayKey(d)]) d = new Date(Date.now() - DAY);
    for (var i = 0; i < 400; i++) {
      if (state.days[todayKey(d)]) { n++; d = new Date(d.getTime() - DAY); }
      else break;
    }
    return n;
  }

  /* ---------------------------------------------------------------- data -- */

  var UNITS = [];
  var lessonIndex = {};   // lessonId -> {unit, lesson, i}
  var objIndex = {};      // objectiveId -> {unit, obj}
  var questionIndex = {}; // questionId -> {unit, q}
  var allQuestions = [];
  var objQuestions = {};  // objectiveId -> [question]

  function buildIndex() {
    lessonIndex = {}; objIndex = {}; questionIndex = {}; allQuestions = []; objQuestions = {};
    UNITS.forEach(function (u) {
      arr(u.lessons).forEach(function (l, i) { if (l && l.id) lessonIndex[l.id] = { unit: u, lesson: l, i: i }; });
      arr(u.objectives).forEach(function (o) { if (o && o.id) { objIndex[o.id] = { unit: u, obj: o }; objQuestions[o.id] = []; } });
      arr(u.questions).forEach(function (q) {
        if (!q || !q.id) return;
        questionIndex[q.id] = { unit: u, q: q };
        allQuestions.push({ unit: u, q: q });
        arr(q.objectives).forEach(function (oid) { if (objQuestions[oid]) objQuestions[oid].push(q); });
      });
    });
  }

  function arr(x) { return Array.isArray(x) ? x : []; }
  function unitById(id) { for (var i = 0; i < UNITS.length; i++) if (UNITS[i].id === id) return UNITS[i]; return null; }

  /* ------------------------------------------------------------- mastery -- */

  function objStats(objId) {
    var qs = objQuestions[objId] || [], a = 0, c = 0;
    qs.forEach(function (q) {
      var s = state.qstats[q.id];
      if (s) { a += s.attempts || 0; c += s.correct || 0; }
    });
    return { attempts: a, correct: c, accuracy: a ? (c / a) * 100 : null };
  }

  /* blend of self-rating (0/1/2 -> 0/50/100) and quiz accuracy */
  function objMastery(objId) {
    var r = state.objRatings[objId];
    var rs = (r === 0 || r === 1 || r === 2) ? r * 50 : null;
    var as = objStats(objId).accuracy;
    if (rs == null && as == null) return 0;
    if (rs == null) return as;
    if (as == null) return rs;
    return rs * 0.5 + as * 0.5;
  }

  function unitMastery(u) {
    var os = arr(u.objectives);
    if (!os.length) return 0;
    var sum = 0;
    os.forEach(function (o) { sum += objMastery(o.id); });
    return sum / os.length;
  }

  function overallMastery() {
    if (!UNITS.length) return 0;
    var s = 0; UNITS.forEach(function (u) { s += unitMastery(u); });
    return s / UNITS.length;
  }

  function masteryTone(m) { return m >= 75 ? 3 : (m >= 40 ? 2 : 1); }

  /* ---------------------------------------------------------- flashcards -- */

  var BOX_INTERVAL = { 1: 1, 2: 3, 3: 7 };
  var BOX_NAME = { 1: 'New', 2: 'Learning', 3: 'Known' };

  function cardKey(unitId, i) { return unitId + '#' + i; }
  function cardState(unitId, i) {
    var s = state.cards[cardKey(unitId, i)];
    if (!s || typeof s !== 'object') return { box: 1, lastSeen: 0, fresh: true };
    return { box: clamp(s.box || 1, 1, 3), lastSeen: s.lastSeen || 0, fresh: false };
  }
  function cardIsDue(unitId, i) {
    var s = cardState(unitId, i);
    if (!s.lastSeen) return true;
    return Date.now() - s.lastSeen >= BOX_INTERVAL[s.box] * DAY;
  }
  function gradeCard(unitId, i, knew) {
    var s = cardState(unitId, i);
    var box = knew ? clamp(s.box + 1, 1, 3) : 1;
    state.cards[cardKey(unitId, i)] = { box: box, lastSeen: Date.now() };
    markToday(); save();
  }
  function allCards(units) {
    var out = [];
    (units || UNITS).forEach(function (u) {
      arr(u.flashcards).forEach(function (c, i) {
        if (!c || (!c.front && !c.back)) return;
        out.push({ unit: u, card: c, i: i });
      });
    });
    return out;
  }
  function dueCount(units) {
    var n = 0;
    allCards(units).forEach(function (e) { if (cardIsDue(e.unit.id, e.i)) n++; });
    return n;
  }

  /* --------------------------------------------------------- question log -- */

  function recordAnswer(qid, correct) {
    var s = state.qstats[qid] || { attempts: 0, correct: 0 };
    s.attempts++; if (correct) s.correct++;
    state.qstats[qid] = s;
    if (correct) {
      var m = state.missed[qid];
      if (m) {
        m.streak = (m.streak || 0) + 1;
        if (m.streak >= 2) delete state.missed[qid];
        else state.missed[qid] = m;
      }
    } else {
      state.missed[qid] = { streak: 0, ts: Date.now() };
    }
    markToday();
    save();
  }
  function missedList() {
    return Object.keys(state.missed)
      .map(function (id) { return questionIndex[id]; })
      .filter(Boolean);
  }

  /* --------------------------------------------------------------- toast -- */

  var toastTimer = null;
  function toast(msg) {
    var t = $('#toast'); if (!t) return;
    t.textContent = msg; t.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  /* --------------------------------------------------------------- theme -- */

  function applyTheme() {
    var t = (state.settings && state.settings.theme) || 'auto';
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  function currentThemeIsDark() {
    var t = state.settings.theme;
    if (t === 'dark') return true;
    if (t === 'light') return false;
    try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return false; }
  }
  function cycleTheme() {
    state.settings.theme = currentThemeIsDark() ? 'light' : 'dark';
    save(); applyTheme();
    toast(state.settings.theme === 'dark' ? 'Dark theme' : 'Light theme');
    if (route()[0] === 'settings') render();
  }

  /* ------------------------------------------------------------ lightbox -- */

  function openLightbox(svg, caption) {
    var lb = $('#lightbox'); if (!lb) return;
    $('#lightboxArt').innerHTML = svg;
    $('#lightboxCap').textContent = caption || '';
    lb.hidden = false;
    var btn = $('#lightboxClose'); if (btn) btn.focus();
  }
  function closeLightbox() {
    var lb = $('#lightbox'); if (!lb || lb.hidden) return false;
    lb.hidden = true; $('#lightboxArt').innerHTML = '';
    return true;
  }

  /* -------------------------------------------------------------- drawer -- */

  function setDrawer(open) {
    var sb = $('#sidebar'), sc = $('#scrim'), tg = $('#navToggle');
    if (!sb) return;
    sb.classList.toggle('open', !!open);
    if (sc) sc.hidden = !open;
    if (tg) tg.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function isNarrow() { return window.matchMedia('(max-width: 900px)').matches; }

  /* ------------------------------------------------------- keyboard hook -- */

  var viewKeys = null;
  function setKeys(fn) { viewKeys = fn; }

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      if (closeLightbox()) { ev.preventDefault(); return; }
      if ($('#sidebar') && $('#sidebar').classList.contains('open')) { setDrawer(false); ev.preventDefault(); return; }
      var ov = $('.js-esc-close');
      if (ov) { ov.click(); ev.preventDefault(); return; }
    }
    var t = ev.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    if (typing && ev.key !== 'Escape') return;
    if (viewKeys) viewKeys(ev);
  });

  /* -------------------------------------------------------------- router -- */

  function route() {
    var h = String(location.hash || '').replace(/^#\/?/, '');
    if (!h) return ['home'];
    return h.split('/').map(function (s) { try { return decodeURIComponent(s); } catch (e) { return s; } }).filter(function (s, i, a) { return s !== '' || i < a.length - 1; });
  }
  function go(path) { location.hash = '#/' + path; }
  function replaceRoute(path) {
    try { location.replace(location.pathname + location.search + '#/' + path); }
    catch (e) { location.hash = '#/' + path; }
  }

  /* ------------------------------------------------------- html fragments -- */

  function head(eyebrow, title, sub) {
    return '<div class="page-head">' +
      (eyebrow ? '<p class="eyebrow">' + esc(eyebrow) + '</p>' : '') +
      '<h1>' + esc(title) + '</h1>' +
      (sub ? '<p class="sub">' + esc(sub) + '</p>' : '') +
      '</div>';
  }
  function barHtml(value, tone, thin) {
    var p = pct(value);
    return '<div class="bar t' + (tone || masteryTone(p)) + (thin ? ' thin' : '') + '" role="progressbar" aria-valuenow="' + p +
      '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + p + '%"></span></div>';
  }
  function emptyHtml(icon, title, msg) {
    return '<div class="empty"><span class="big" aria-hidden="true">' + esc(icon) + '</span><b>' + esc(title) + '</b>' +
      (msg ? '<p class="small" style="margin:8px 0 0">' + esc(msg) + '</p>' : '') + '</div>';
  }
  function noContent() {
    return head('', 'No content found', '') +
      '<div class="empty"><span class="big" aria-hidden="true">📭</span>' +
      '<b>No unit files loaded yet.</b>' +
      '<p class="small" style="margin:10px auto 0;max-width:46ch">The study material lives in <code>data/units/</code>. ' +
      'Make sure those files exist and are listed in <code>data/manifest.js</code>, then reload this page.</p></div>';
  }

  function unitChip(u) { return '<span class="chip c1">' + esc(u.icon || '📘') + ' ' + esc(u.title) + '</span>'; }

  function tabsHtml(unitId, active) {
    var tabs = [
      ['learn', '📖', 'Learn'], ['objectives', '🎯', 'Objectives'], ['cards', '🃏', 'Flashcards'],
      ['quiz', '❓', 'Quiz'], ['drills', '🧮', 'Drills'], ['board', '🖍️', 'Whiteboard'], ['mnemonics', '💬', 'Mnemonics']
    ];
    return '<nav class="tabs" aria-label="Unit sections">' + tabs.map(function (t) {
      return '<a class="tab" href="#/unit/' + esc(unitId) + '/' + t[0] + '"' + (t[0] === active ? ' aria-current="page"' : '') +
        '><span aria-hidden="true">' + t[1] + '</span> ' + t[2] + '</a>';
    }).join('') + '</nav>';
  }

  /* diagrams: trusted svg from data files, rendered inline, click to enlarge */
  function diagramsHtml(diagrams) {
    var ds = arr(diagrams);
    if (!ds.length) return '';
    return ds.map(function (d, i) {
      if (!d || typeof d.svg !== 'string') return '';
      return '<figure class="diagram js-diagram" data-di="' + i + '" tabindex="0" role="button" ' +
        'aria-label="Enlarge diagram' + (d.caption ? ': ' + escAttr(d.caption) : '') + '">' +
        d.svg +
        (d.caption ? '<figcaption>' + esc(d.caption) + '</figcaption>' : '') +
        '</figure>';
    }).join('');
  }
  function wireDiagrams(root, diagrams) {
    var ds = arr(diagrams);
    $$('.js-diagram', root).forEach(function (fig) {
      function open() {
        var d = ds[+fig.getAttribute('data-di')];
        if (d && d.svg) openLightbox(d.svg, d.caption || '');
      }
      fig.addEventListener('click', open);
      fig.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); }
      });
    });
  }

  /* ----------------------------------------------------------------- nav -- */

  var GLOBAL_NAV = [
    ['test', '📝', 'Practice Test'],
    ['cards', '🃏', 'Flashcards'],
    ['objectives', '🎯', 'Objectives'],
    ['board', '🖍️', 'Whiteboard'],
    ['group', '👯', 'Study Group'],
    ['cram', '📄', 'Cram Sheet'],
    ['missed', '🔁', 'Missed Questions'],
    ['mnemonics', '💬', 'Mnemonics'],
    ['settings', '⚙️', 'Settings']
  ];

  function renderNav() {
    var list = $('#navList'); if (!list) return;
    var r = route();
    var html = '';
    html += '<a class="navitem" href="#/home"' + (r[0] === 'home' ? ' aria-current="page"' : '') +
      '><span class="ni-icon" aria-hidden="true">🏠</span><span class="ni-label">Home</span></a>';

    html += '<div class="navgroup-label">Units</div>';
    if (!UNITS.length) {
      html += '<p class="small muted" style="padding:0 12px">No units loaded.</p>';
    } else {
      UNITS.forEach(function (u) {
        var m = pct(unitMastery(u));
        var cur = (r[0] === 'unit' && r[1] === u.id);
        html += '<a class="navitem navitem-unit" href="#/unit/' + esc(u.id) + '/learn"' + (cur ? ' aria-current="page"' : '') + '>' +
          '<span class="ni-row"><span class="ni-icon" aria-hidden="true">' + esc(u.icon || '📘') + '</span>' +
          '<span class="ni-label">' + esc(u.title) + '</span>' +
          '<span class="ni-meta">' + m + '%</span></span>' +
          '<span class="ni-bar"><span style="display:block;height:100%;width:' + m + '%;background:var(--c' + masteryTone(m) + ')"></span></span>' +
          '</a>';
      });
    }

    html += '<div class="navgroup-label">Study tools</div>';
    var due = dueCount(), missedN = missedList().length;
    GLOBAL_NAV.forEach(function (n) {
      var meta = '';
      if (n[0] === 'cards' && due) meta = due + ' due';
      if (n[0] === 'missed' && missedN) meta = String(missedN);
      html += '<a class="navitem" href="#/' + n[0] + '"' + (r[0] === n[0] ? ' aria-current="page"' : '') +
        '><span class="ni-icon" aria-hidden="true">' + n[1] + '</span><span class="ni-label">' + n[2] + '</span>' +
        (meta ? '<span class="ni-meta">' + esc(meta) + '</span>' : '') + '</a>';
    });

    list.innerHTML = html;
  }

  /* ------------------------------------------------------ accent + rings -- */

  function accentStyle(u) {
    var n = ((((u && u.order) || 1) - 1) % 8 + 8) % 8 + 1;
    return '--ua:var(--a' + n + ');--ua-soft:var(--a' + n + '-soft);--ua-line:var(--a' + n + '-line)';
  }

  function ringHtml(value, size, cls) {
    var p = pct(value), s = size || 64, r = (s - 7) / 2, c = 2 * Math.PI * r;
    return '<svg class="ring ' + (cls || '') + '" viewBox="0 0 ' + s + ' ' + s + '" width="' + s + '" height="' + s + '" ' +
      'role="img" aria-label="' + p + ' percent mastery">' +
      '<circle class="ring-bg" cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke-width="6"/>' +
      '<circle class="ring-fg" cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke-width="6" ' +
      'stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - p / 100)).toFixed(1) +
      '" transform="rotate(-90 ' + s / 2 + ' ' + s / 2 + ')"/>' +
      '<text class="ring-t" x="50%" y="50%" text-anchor="middle" dy="0.36em">' + p + '</text></svg>';
  }

  function greeting() {
    var h = new Date().getHours();
    return h < 12 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening');
  }

  function weakObjectives(limit) {
    var list = [];
    UNITS.forEach(function (u) {
      arr(u.objectives).forEach(function (o) {
        list.push({ unit: u, obj: o, m: objMastery(o.id), rated: state.objRatings[o.id] != null });
      });
    });
    list.sort(function (a, b) { return a.m - b.m || (a.obj.id < b.obj.id ? -1 : 1); });
    return limit ? list.slice(0, limit) : list;
  }

  function lessonsDoneCount(u) {
    var n = 0; arr(u.lessons).forEach(function (l) { if (state.lessonsDone[l.id]) n++; });
    return n;
  }

  /* ---------------------------------------------------------------- HOME -- */

  function viewHome(el) {
    if (!UNITS.length) { el.innerHTML = noContent(); return; }
    markToday();

    var name = (state.settings.name || '').trim();
    var due = dueCount();
    var missedN = missedList().length;
    var streak = streakDays();
    var overall = overallMastery();
    var weak = weakObjectives(3);

    /* today's plan — three concrete actions */
    var plan = [];
    if (weak.length) {
      plan.push({
        icon: '🎯', title: 'Drill your weakest objectives',
        sub: weak.map(function (w) { return w.obj.text; })[0],
        btn: 'Start 12-question quiz', href: '#/focus/weak'
      });
    }
    plan.push(due ? {
      icon: '🃏', title: due + ' ' + plural(due, 'flashcard') + ' due today',
      sub: 'Leitner boxes: new cards daily, learning every 3 days, known weekly.',
      btn: 'Review now', href: '#/cards'
    } : {
      icon: '🃏', title: 'No flashcards due right now',
      sub: 'Everything you have seen is resting in its box. You can still review anything.',
      btn: 'Review anyway', href: '#/cards'
    });
    if (missedN) {
      plan.push({
        icon: '🔁', title: missedN + ' missed ' + plural(missedN, 'question') + ' waiting',
        sub: 'A question leaves the bank after you get it right twice.',
        btn: 'Re-drill them', href: '#/missed'
      });
    } else {
      var firstUndone = null;
      for (var i = 0; i < UNITS.length && !firstUndone; i++) {
        var u = UNITS[i];
        for (var j = 0; j < arr(u.lessons).length; j++) {
          if (!state.lessonsDone[u.lessons[j].id]) { firstUndone = { u: u, l: u.lessons[j] }; break; }
        }
      }
      if (firstUndone) {
        plan.push({
          icon: '📖', title: 'Next lesson: ' + firstUndone.l.title,
          sub: firstUndone.u.title, btn: 'Read it',
          href: '#/unit/' + firstUndone.u.id + '/learn/' + firstUndone.l.id
        });
      } else {
        plan.push({ icon: '🖍️', title: 'Brain-dump on the whiteboard', sub: 'Say it out loud, then write everything you remember.', btn: 'Pick a prompt', href: '#/board' });
      }
    }

    var html = '';
    html += '<section class="hero" style="' + accentStyle(UNITS[0]) + '">' +
      '<div class="hero-main">' +
      '<p class="eyebrow">' + esc(greeting()) + (name ? ', ' + esc(name) : '') + '</p>' +
      '<h1>Ultrasound physics, one objective at a time.</h1>' +
      '<p class="sub">' + UNITS.length + ' ' + plural(UNITS.length, 'unit') + ' · ' +
      allQuestions.length + ' questions · ' + allCards().length + ' flashcards, all offline.</p>' +
      '<div class="hero-actions">' +
      '<a class="btn primary" href="#/focus/weak">🎯 Study my weakest</a>' +
      '<a class="btn" href="#/test">📝 Practice test</a>' +
      '<a class="btn" href="#/cards">🃏 Flashcards' + (due ? ' (' + due + ')' : '') + '</a>' +
      '</div></div>' +
      '<div class="hero-ring">' + ringHtml(overall, 132, 'big') +
      '<p class="small muted center" style="margin:6px 0 0">overall mastery</p></div>' +
      '</section>';

    html += '<div class="grid three mb statrow">' +
      statHtml(streak, 'day ' + plural(streak, 'streak', 'streak'), '🔥') +
      statHtml(due, 'cards due', '🃏') +
      statHtml(missedN, 'missed', '🔁') +
      statHtml(pct(overall) + '%', 'mastery', '📈') +
      '</div>';

    html += '<section class="card plan-card"><h2>Today\'s plan</h2><ol class="plan-list">' +
      plan.map(function (p) {
        return '<li class="plan-item"><span class="pi-icon" aria-hidden="true">' + esc(p.icon) + '</span>' +
          '<span class="pi-body"><b>' + esc(p.title) + '</b>' +
          (p.sub ? '<span class="pi-sub">' + esc(p.sub) + '</span>' : '') + '</span>' +
          '<a class="btn sm primary nowrap" href="' + escAttr(p.href) + '">' + esc(p.btn) + '</a></li>';
      }).join('') + '</ol></section>';

    html += '<h2 class="section-title">Your units</h2><div class="unit-grid">';
    UNITS.forEach(function (u) {
      var m = unitMastery(u);
      var ld = lessonsDoneCount(u), lt = arr(u.lessons).length;
      var ud = dueCount([u]);
      var weakN = arr(u.objectives).filter(function (o) { return objMastery(o.id) < 50; }).length;
      html += '<a class="unit-card" href="#/unit/' + esc(u.id) + '/learn" style="' + accentStyle(u) + '">' +
        '<div class="uc-top"><span class="uc-icon" aria-hidden="true">' + esc(u.icon || '📘') + '</span>' +
        ringHtml(m, 54) + '</div>' +
        '<h3 class="uc-title">' + esc(u.title) + '</h3>' +
        '<p class="uc-blurb">' + esc(u.blurb || '') + '</p>' +
        '<div class="uc-meta">' +
        '<span class="chip">📖 ' + ld + '/' + lt + '</span>' +
        (ud ? '<span class="chip c2">🃏 ' + ud + ' due</span>' : '') +
        (weakN ? '<span class="chip c4">🎯 ' + weakN + ' weak</span>' : '<span class="chip c3">🎯 solid</span>') +
        '</div></a>';
    });
    html += '</div>';

    el.innerHTML = html;
  }

  function statHtml(n, label, icon) {
    return '<div class="stat"><div class="s-icon" aria-hidden="true">' + esc(icon) + '</div>' +
      '<div class="n">' + esc(String(n)) + '</div><div class="l">' + esc(label) + '</div></div>';
  }

  /* ----------------------------------------------------------- UNIT PAGE -- */

  function unitHeaderHtml(u, mastery) {
    return '<header class="unit-hero" style="' + accentStyle(u) + '">' +
      '<div class="uh-main">' +
      '<p class="eyebrow"><span aria-hidden="true">' + esc(u.icon || '📘') + '</span> Unit ' + esc(String(u.order)) + '</p>' +
      '<h1>' + esc(u.title) + '</h1>' +
      '<p class="sub">' + esc(u.blurb || '') + '</p>' +
      (u.bookRef ? '<p class="bookref">' + esc(u.bookRef) + '</p>' : '') +
      '</div>' +
      '<div class="uh-ring">' + ringHtml(mastery, 96) + '<p class="small muted center" style="margin:4px 0 0">mastery</p></div>' +
      '</header>';
  }

  function viewUnit(el, r) {
    var u = unitById(r[1]);
    if (!u) {
      el.innerHTML = head('', 'Unit not found', 'That unit is not in this copy of the site.') +
        '<a class="btn primary" href="#/home">Back to home</a>';
      return;
    }
    var tab = r[2] || 'learn';
    el.innerHTML = unitHeaderHtml(u, unitMastery(u)) +
      '<div class="tabbar" style="' + accentStyle(u) + '">' + tabsHtml(u.id, tab) + '</div>' +
      '<div id="tabpane"></div>';
    var pane = $('#tabpane', el);
    var rest = r.slice(3);
    if (tab === 'objectives') tabObjectives(pane, u);
    else if (tab === 'cards') tabCards(pane, u);
    else if (tab === 'quiz') tabQuiz(pane, u, rest);
    else if (tab === 'drills') tabDrills(pane, u, rest);
    else if (tab === 'board') tabBoard(pane, u, rest);
    else if (tab === 'mnemonics') tabMnemonics(pane, u);
    else tabLearn(pane, u, rest);
  }

  /* --------------------------------------------------------- LEARN + lesson */

  function tabLearn(pane, u, rest) {
    var lessons = arr(u.lessons);
    if (!lessons.length) { pane.innerHTML = emptyHtml('📖', 'No lessons in this unit yet.', ''); return; }
    var lid = rest[0] && lessonIndex[rest[0]] && lessonIndex[rest[0]].unit.id === u.id ? rest[0] : null;

    var listHtml = '<div class="lesson-list" id="lessonList">' +
      '<h2 class="side-title">Lessons</h2>' +
      lessons.map(function (l, i) {
        var done = !!state.lessonsDone[l.id];
        return '<a class="lesson-link' + (done ? ' done' : '') + (l.id === lid ? ' current' : '') +
          '" href="#/unit/' + esc(u.id) + '/learn/' + esc(l.id) + '"' + (l.id === lid ? ' aria-current="page"' : '') + '>' +
          '<span class="n" aria-hidden="true">' + (done ? '✓' : (i + 1)) + '</span>' +
          '<span class="ll-body"><span class="ll-title">' + esc(l.title) + '</span>' +
          '<span class="ll-sub">' + arr(l.objectives).length + ' ' + plural(arr(l.objectives).length, 'objective') +
          (arr(l.diagrams).length ? ' · ' + arr(l.diagrams).length + ' ' + plural(arr(l.diagrams).length, 'diagram') : '') +
          '</span></span></a>';
      }).join('') +
      '<div class="ll-progress"><div class="row between small muted"><span>Lessons done</span><span>' +
      lessonsDoneCount(u) + ' / ' + lessons.length + '</span></div>' +
      barHtml(lessons.length ? lessonsDoneCount(u) / lessons.length * 100 : 0, 3, true) + '</div>' +
      '</div>';

    pane.innerHTML = '<div class="learn-grid' + (lid ? ' has-lesson' : '') + '" style="' + accentStyle(u) + '">' +
      listHtml + '<div class="reading-pane" id="readingPane"></div></div>';

    var rp = $('#readingPane', pane);
    if (lid) renderLesson(rp, u, lessonIndex[lid].lesson, lessonIndex[lid].i);
    else renderLearnIntro(rp, u);
  }

  function renderLearnIntro(rp, u) {
    var lessons = arr(u.lessons);
    rp.innerHTML = '<div class="card intro-card">' +
      '<h2>Start here</h2>' +
      '<p>' + esc(u.blurb || 'Work through the lessons in order, then test yourself.') + '</p>' +
      '<h3 class="mt">What you should be able to do</h3>' +
      '<ul class="obj-mini">' + arr(u.objectives).map(function (o) {
        var m = pct(objMastery(o.id));
        return '<li><span class="om-dot t' + masteryTone(m) + '" aria-hidden="true"></span>' + esc(o.text) +
          ' <span class="muted small nowrap">' + m + '%</span></li>';
      }).join('') + '</ul>' +
      '<div class="row mt">' +
      (lessons.length ? '<a class="btn primary" href="#/unit/' + esc(u.id) + '/learn/' + esc(lessons[0].id) + '">Read lesson 1</a>' : '') +
      '<a class="btn" href="#/unit/' + esc(u.id) + '/cards">🃏 Flashcards</a>' +
      '<a class="btn" href="#/unit/' + esc(u.id) + '/quiz">❓ Quiz me</a>' +
      '</div></div>';
  }

  function renderLesson(rp, u, l, idx) {
    var lessons = arr(u.lessons);
    var prev = lessons[idx - 1], next = lessons[idx + 1];
    var done = !!state.lessonsDone[l.id];
    var mns = arr(u.mnemonics).filter(function (m) { return m.lesson === l.id; });

    var html = '';
    html += '<a class="btn sm ghost back-to-list" href="#/unit/' + esc(u.id) + '/learn">← All lessons</a>';
    html += '<article class="card lesson-card">';
    html += '<p class="eyebrow">Lesson ' + (idx + 1) + ' of ' + lessons.length + '</p>';
    html += '<h1 class="lesson-title">' + esc(l.title) + '</h1>';

    var objs = arr(l.objectives).map(function (oid) { return objIndex[oid] ? objIndex[oid].obj : null; }).filter(Boolean);
    if (objs.length) {
      html += '<div class="row obj-chips">' + objs.map(function (o) {
        return '<a class="chip c1" href="#/unit/' + esc(u.id) + '/objectives" title="' + escAttr(o.text) + '">🎯 ' + esc(o.text) + '</a>';
      }).join('') + '</div>';
    }

    html += '<div class="lesson-body">' + (typeof l.html === 'string' ? l.html : '') + '</div>';
    html += diagramsHtml(l.diagrams);

    if (mns.length) {
      html += '<div class="callout tip mnemo-box"><b>Dumb sayings for this lesson</b><ul>' +
        mns.map(function (m) { return '<li><b>' + esc(m.saying) + '</b> — ' + esc(m.meaning) + '</li>'; }).join('') +
        '</ul></div>';
    }

    if (l.sayIt) {
      html += '<section class="sayit">' +
        '<p class="si-label">Say it out loud</p>' +
        '<p class="si-prompt">' + esc(l.sayIt) + '</p>' +
        '<button class="btn" id="revealKP">Now show me the key points</button>' +
        '<div id="kpBox" hidden></div></section>';
    }

    html += '<div class="lesson-foot">' +
      '<button class="btn ' + (done ? 'good' : 'primary') + '" id="markDone">' + (done ? '✓ Lesson done' : 'Mark lesson done') + '</button>' +
      '<div class="spacer"></div>' +
      (prev ? '<a class="btn sm" href="#/unit/' + esc(u.id) + '/learn/' + esc(prev.id) + '">← ' + esc(trunc(prev.title, 22)) + '</a>' : '') +
      (next ? '<a class="btn sm" href="#/unit/' + esc(u.id) + '/learn/' + esc(next.id) + '">' + esc(trunc(next.title, 22)) + ' →</a>' : '') +
      '</div>';
    html += '</article>';
    rp.innerHTML = html;

    wireDiagrams(rp, l.diagrams);

    var rk = $('#revealKP', rp);
    if (rk) rk.addEventListener('click', function () {
      var box = $('#kpBox', rp);
      box.innerHTML = '<p class="small muted" style="margin:12px 0 6px">Tick everything you actually said:</p>' +
        tickListHtml(arr(l.keyPoints), 'kp-' + l.id);
      box.hidden = false;
      rk.hidden = true;
    });

    var md = $('#markDone', rp);
    if (md) md.addEventListener('click', function () {
      if (state.lessonsDone[l.id]) delete state.lessonsDone[l.id];
      else state.lessonsDone[l.id] = true;
      markToday(); save();
      toast(state.lessonsDone[l.id] ? 'Lesson marked done' : 'Marked not done');
      render();
    });

    setKeys(function (ev) {
      if (ev.key === 'ArrowLeft' && prev) { go('unit/' + u.id + '/learn/' + prev.id); }
      else if (ev.key === 'ArrowRight' && next) { go('unit/' + u.id + '/learn/' + next.id); }
    });
  }

  function trunc(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  function tickListHtml(points, idPrefix) {
    return '<ul class="ticklist">' + arr(points).map(function (p, i) {
      return '<li><label><input type="checkbox" data-tick="1" id="' + escAttr(idPrefix + '-' + i) + '">' +
        '<span class="tk-text">' + esc(p) + '</span></label></li>';
    }).join('') + '</ul>';
  }

  /* ------------------------------------------------------ OBJECTIVES tab -- */

  var RATE_LABELS = ['Not yet', 'Shaky', 'Got it'];

  function rateGroupHtml(current, dataAttrs) {
    return '<div class="rate-group" role="group" aria-label="How well do you know this?">' +
      RATE_LABELS.map(function (lab, i) {
        return '<button type="button" class="rate" data-r="' + i + '" ' + (dataAttrs || '') +
          ' aria-pressed="' + (current === i ? 'true' : 'false') + '">' + esc(lab) + '</button>';
      }).join('') + '</div>';
  }

  function objectiveCardHtml(u, o) {
    var m = pct(objMastery(o.id));
    var st = objStats(o.id);
    var lessons = arr(u.lessons).filter(function (l) { return arr(l.objectives).indexOf(o.id) >= 0; });
    var rating = state.objRatings[o.id];
    return '<div class="obj-card" style="' + accentStyle(u) + '">' +
      '<div class="obj-head"><p class="obj-text">' + esc(o.text) + '</p>' +
      '<span class="obj-m chip ' + (m >= 75 ? 'c3' : (m >= 40 ? 'c2' : 'bad')) + '">' + m + '%</span></div>' +
      barHtml(m, masteryTone(m), true) +
      '<div class="row mt" style="gap:8px">' + rateGroupHtml(rating, 'data-obj="' + escAttr(o.id) + '"') + '</div>' +
      '<div class="row mt small muted">' +
      '<span>' + (st.attempts ? st.correct + '/' + st.attempts + ' correct in quizzes' : 'no quiz attempts yet') + '</span>' +
      '</div>' +
      '<div class="row mt" style="gap:8px">' +
      lessons.map(function (l) {
        return '<a class="chip" href="#/unit/' + esc(u.id) + '/learn/' + esc(l.id) + '">📖 ' + esc(trunc(l.title, 30)) + '</a>';
      }).join('') +
      ((objQuestions[o.id] || []).length ? '<a class="btn sm primary" href="#/unit/' + esc(u.id) + '/quiz/obj/' + esc(o.id) + '">Quiz me on this</a>' : '') +
      '</div></div>';
  }

  function tabObjectives(pane, u) {
    var objs = arr(u.objectives);
    var custom = arr(state.customObjectives[u.id]);

    var html = '';
    html += '<div class="card pad-sm row between mb"><span class="small muted">Rate yourself honestly — the mastery % blends your rating with your quiz accuracy.</span></div>';
    html += objs.length ? objs.map(function (o) { return objectiveCardHtml(u, o); }).join('')
      : emptyHtml('🎯', 'No objectives listed for this unit.', '');

    html += '<section class="card mt" id="customBox">' +
      '<h2>My course objectives</h2>' +
      '<p class="small muted">Paste the objectives your professor gave you for this unit — one per line. They become a rateable checklist saved on this computer.</p>' +
      '<label class="field" for="customTA">Paste objectives (one per line)</label>' +
      '<textarea id="customTA" rows="5" placeholder="Define pulse duration…&#10;Calculate duty factor…"></textarea>' +
      '<div class="row mt"><button class="btn primary" id="saveCustom">Save my objectives</button>' +
      '<span class="small muted">' + custom.length + ' saved</span></div>' +
      '<div id="customList" class="mt"></div></section>';

    pane.innerHTML = html;
    $('#customTA', pane).value = custom.map(function (c) { return c.text; }).join('\n');

    function drawCustom() {
      var list = arr(state.customObjectives[u.id]);
      var box = $('#customList', pane);
      if (!list.length) { box.innerHTML = '<p class="small muted">Nothing pasted yet.</p>'; return; }
      box.innerHTML = list.map(function (c, i) {
        return '<div class="obj-card custom">' +
          '<div class="obj-head"><p class="obj-text">' + esc(c.text) + '</p>' +
          '<button class="iconbtn sm" data-del="' + i + '" aria-label="Delete this objective">🗑️</button></div>' +
          rateGroupHtml(c.rating, 'data-custom="' + i + '"') +
          '</div>';
      }).join('');
    }
    drawCustom();

    $('#saveCustom', pane).addEventListener('click', function () {
      var lines = $('#customTA', pane).value.split('\n')
        .map(function (s) { return s.replace(/^\s*[-*•\d.)\]]+\s*/, '').trim(); })
        .filter(function (s) { return s.length > 1; });
      var old = arr(state.customObjectives[u.id]);
      state.customObjectives[u.id] = lines.map(function (t) {
        var prev = old.filter(function (o) { return o.text === t; })[0];
        return { text: t, rating: prev ? prev.rating : null };
      });
      save(); markToday(); drawCustom();
      toast(lines.length + ' ' + plural(lines.length, 'objective') + ' saved');
    });

    pane.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('button') : null;
      if (!b) return;
      if (b.hasAttribute('data-obj')) {
        var oid = b.getAttribute('data-obj'), r = +b.getAttribute('data-r');
        if (state.objRatings[oid] === r) delete state.objRatings[oid]; else state.objRatings[oid] = r;
        markToday(); save(); render();
      } else if (b.hasAttribute('data-custom')) {
        var i = +b.getAttribute('data-custom'), rr = +b.getAttribute('data-r');
        var list = arr(state.customObjectives[u.id]);
        if (list[i]) { list[i].rating = (list[i].rating === rr) ? null : rr; state.customObjectives[u.id] = list; save(); drawCustom(); }
      } else if (b.hasAttribute('data-del')) {
        var di = +b.getAttribute('data-del');
        var l2 = arr(state.customObjectives[u.id]); l2.splice(di, 1);
        state.customObjectives[u.id] = l2; save();
        $('#customTA', pane).value = l2.map(function (c) { return c.text; }).join('\n');
        drawCustom();
      }
    });
  }

  /* ------------------------------------------------------- FLASHCARDS ---- */

  var cardOpts = { dueOnly: true, shuffle: false, reverse: false, sayFirst: false, unit: 'all' };

  function boxCounts(entries) {
    var c = { 1: 0, 2: 0, 3: 0 };
    entries.forEach(function (e) { c[cardState(e.unit.id, e.i).box]++; });
    return c;
  }

  function renderCards(pane, units, opts) {
    opts = opts || {};
    var scope = units;
    var S = { deck: [], idx: 0, flipped: false, said: false, done: 0, knew: 0 };

    function pool() {
      var list = allCards(scope);
      if (opts.global && cardOpts.unit !== 'all') list = list.filter(function (e) { return e.unit.id === cardOpts.unit; });
      return list;
    }

    function build() {
      var list = pool();
      var deck = cardOpts.dueOnly ? list.filter(function (e) { return cardIsDue(e.unit.id, e.i); }) : list.slice();
      if (cardOpts.shuffle) shuffleInPlace(deck);
      S.deck = deck; S.idx = 0; S.flipped = false; S.said = false; S.done = 0; S.knew = 0;
    }

    function controlsHtml() {
      var list = pool();
      var counts = boxCounts(list);
      var due = list.filter(function (e) { return cardIsDue(e.unit.id, e.i); }).length;
      return '<div class="card pad-sm fc-controls">' +
        '<div class="row between">' +
        '<div class="fc-counts">' +
        '<span class="chip">🆕 New ' + counts[1] + '</span>' +
        '<span class="chip c2">📚 Learning ' + counts[2] + '</span>' +
        '<span class="chip c3">✅ Known ' + counts[3] + '</span>' +
        '<span class="chip c1">⏰ ' + due + ' due</span>' +
        '</div></div>' +
        '<div class="row mt opt-row">' +
        (opts.global ? '<label class="sr-only" for="fcUnit">Unit</label><select id="fcUnit" style="max-width:220px"><option value="all">All units</option>' +
          UNITS.map(function (u) { return '<option value="' + escAttr(u.id) + '"' + (cardOpts.unit === u.id ? ' selected' : '') + '>' + esc(u.title) + '</option>'; }).join('') + '</select>' : '') +
        toggleChip('fcDue', 'Due only', cardOpts.dueOnly) +
        toggleChip('fcShuffle', '🔀 Shuffle', cardOpts.shuffle) +
        toggleChip('fcReverse', '🔁 Reverse', cardOpts.reverse) +
        toggleChip('fcSay', '🗣️ Say it first', cardOpts.sayFirst) +
        '</div></div>';
    }

    function draw() {
      var html = controlsHtml();
      if (!S.deck.length) {
        var anyCards = pool().length;
        html += '<div class="empty"><span class="big" aria-hidden="true">' + (anyCards ? '🎉' : '🃏') + '</span>' +
          '<b>' + (anyCards ? 'No cards due right now.' : 'No flashcards here yet.') + '</b>' +
          (anyCards ? '<p class="small" style="margin:8px 0 14px">Your boxes are resting. Turn off “Due only” to review anyway.</p>' +
            '<button class="btn primary" id="reviewAnyway">Review anyway</button>' : '') +
          '</div>';
        pane.innerHTML = html; wire(); return;
      }

      if (S.idx >= S.deck.length) {
        html += '<section class="card center fc-summary">' +
          '<h2>Session finished 🎉</h2>' +
          '<p class="big-score">' + S.knew + ' / ' + S.done + '</p>' +
          '<p class="muted">cards you knew</p>' +
          '<div class="row center mt" style="justify-content:center">' +
          '<button class="btn primary" id="againBtn">Go again</button>' +
          '<a class="btn" href="#/home">Back home</a></div></section>';
        pane.innerHTML = html; wire(); return;
      }

      var e = S.deck[S.idx];
      var c = e.card;
      var front = cardOpts.reverse ? c.back : c.front;
      var back = cardOpts.reverse ? c.front : c.back;
      var cs = cardState(e.unit.id, e.i);
      var needSay = cardOpts.sayFirst && !S.said;

      html += '<div class="fc-meta row between">' +
        '<span class="small muted">' + esc(e.unit.title) + '</span>' +
        '<span class="small muted nums">' + (S.idx + 1) + ' / ' + S.deck.length + '</span></div>' +
        barHtml(S.idx / S.deck.length * 100, 1, true);

      html += '<div class="fc-stage mt"><button type="button" class="fc' + (S.flipped ? ' is-flipped' : '') + '" id="fcCard" ' +
        'aria-live="polite">' +
        '<span class="fc-inner">' +
        '<span class="fc-face fc-front">' +
        '<span class="fc-side">' + (cardOpts.reverse ? 'Back' : 'Front') + '</span>' +
        '<span class="fc-box chip">' + BOX_NAME[cs.box] + '</span>' +
        '<span class="fc-text">' + esc(front) + '</span>' +
        '<span class="fc-hint">' + (needSay ? 'Say the answer out loud first' : 'Click or press Space to flip') + '</span>' +
        '</span>' +
        '<span class="fc-face fc-back">' +
        '<span class="fc-side">' + (cardOpts.reverse ? 'Front' : 'Back') + '</span>' +
        '<span class="fc-text">' + esc(back) + '</span>' +
        '<span class="fc-hint">Did you know it?</span>' +
        '</span></span></button></div>';

      if (needSay) {
        html += '<div class="row center" style="justify-content:center"><button class="btn primary big" id="saidIt">🗣️ I said it out loud — show me</button></div>';
      } else {
        html += '<div class="row grade-row">' +
          '<button class="btn bad big" id="noBtn">✗ Didn\'t know</button>' +
          '<button class="btn good big" id="yesBtn">✓ Knew it</button></div>' +
          '<p class="small muted center mt">Space flips · ← didn\'t know · → knew it</p>';
      }

      if (c.lesson && lessonIndex[c.lesson]) {
        html += '<p class="center mt"><a class="chip" href="#/unit/' + esc(lessonIndex[c.lesson].unit.id) + '/learn/' + esc(c.lesson) + '">📖 ' + esc(lessonIndex[c.lesson].lesson.title) + '</a></p>';
      }

      pane.innerHTML = html;
      wire();
    }

    function flip() {
      if (cardOpts.sayFirst && !S.said) return;
      S.flipped = !S.flipped;
      var el = $('#fcCard', pane);
      if (el) el.classList.toggle('is-flipped', S.flipped);
    }
    function grade(knew) {
      var e = S.deck[S.idx];
      if (!e) return;
      gradeCard(e.unit.id, e.i, knew);
      S.done++; if (knew) S.knew++;
      S.idx++; S.flipped = false; S.said = false;
      draw();
      renderNav();
    }

    function wire() {
      var cardEl = $('#fcCard', pane);
      if (cardEl) cardEl.addEventListener('click', flip);
      var sb = $('#saidIt', pane);
      if (sb) sb.addEventListener('click', function () { S.said = true; S.flipped = true; draw(); });
      var yb = $('#yesBtn', pane); if (yb) yb.addEventListener('click', function () { grade(true); });
      var nb = $('#noBtn', pane); if (nb) nb.addEventListener('click', function () { grade(false); });
      var ab = $('#againBtn', pane); if (ab) ab.addEventListener('click', function () { build(); draw(); });
      var ra = $('#reviewAnyway', pane); if (ra) ra.addEventListener('click', function () { cardOpts.dueOnly = false; build(); draw(); });
      [['fcDue', 'dueOnly'], ['fcShuffle', 'shuffle'], ['fcReverse', 'reverse'], ['fcSay', 'sayFirst']].forEach(function (p) {
        var b = $('#' + p[0], pane);
        if (b) b.addEventListener('click', function () {
          cardOpts[p[1]] = !cardOpts[p[1]];
          if (p[1] === 'sayFirst') S.said = false;
          if (p[1] === 'dueOnly' || p[1] === 'shuffle') build();
          draw();
        });
      });
      var us = $('#fcUnit', pane);
      if (us) us.addEventListener('change', function () { cardOpts.unit = us.value; build(); draw(); });
    }

    setKeys(function (ev) {
      if (!S.deck.length || S.idx >= S.deck.length) return;
      if (ev.key === ' ' || ev.key === 'Spacebar') {
        ev.preventDefault();
        if (cardOpts.sayFirst && !S.said) { S.said = true; S.flipped = true; draw(); }
        else flip();
      } else if (ev.key === 'ArrowRight') { ev.preventDefault(); if (!(cardOpts.sayFirst && !S.said)) grade(true); }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); if (!(cardOpts.sayFirst && !S.said)) grade(false); }
    });

    build();
    draw();
  }

  function toggleChip(id, label, on) {
    return '<button type="button" class="chip" id="' + id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + esc(label) + '</button>';
  }

  function tabCards(pane, u) {
    if (!arr(u.flashcards).length) { pane.innerHTML = emptyHtml('🃏', 'No flashcards in this unit yet.', ''); return; }
    renderCards(pane, [u], { global: false });
  }

  function viewCards(el) {
    if (!UNITS.length) { el.innerHTML = noContent(); return; }
    el.innerHTML = head('Flashcards', 'Flashcards', 'Leitner boxes: new cards come back daily, learning every 3 days, known every week.') +
      '<div id="cardPane"></div>';
    renderCards($('#cardPane', el), UNITS, { global: true });
  }

  /* ------------------------------------------------------------- TIMERS --- */

  var timers = [];
  function addTimer(id) { timers.push(id); return id; }
  function clearTimers() { timers.forEach(function (t) { clearInterval(t); }); timers = []; }

  function mmss(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  /* --------------------------------------------------------- QUIZ ENGINE -- */

  function isCorrect(q, given) {
    if (given == null || given === '') return false;
    if (q.type === 'mc') return given === q.answer;
    if (q.type === 'tf') return given === q.answer;
    if (q.type === 'short') return shortIsCorrect(given, q);
    return false;
  }
  function correctText(q) {
    if (q.type === 'mc') return arr(q.choices)[q.answer] != null ? String(q.choices[q.answer]) : '—';
    if (q.type === 'tf') return q.answer ? 'True' : 'False';
    if (q.type === 'short') return String(q.answer == null ? '—' : q.answer);
    return '—';
  }
  function givenText(q, g) {
    if (g == null || g === '') return '(no answer)';
    if (q.type === 'mc') return arr(q.choices)[g] != null ? String(q.choices[g]) : '(no answer)';
    if (q.type === 'tf') return g ? 'True' : 'False';
    return String(g);
  }
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function runQuiz(pane, opts) {
    var items = arr(opts.items);
    if (!items.length) {
      pane.innerHTML = emptyHtml('❓', 'No questions to ask here.', 'Try another unit or a wider selection.') +
        (opts.backHref ? '<p class="center mt"><a class="btn primary" href="' + escAttr(opts.backHref) + '">Go back</a></p>' : '');
      return;
    }
    var exam = opts.mode === 'exam';
    var S = {
      idx: 0,
      ans: items.map(function () { return { given: null, checked: false, correct: false }; }),
      started: Date.now(),
      finished: false,
      elapsed: 0,
      left: (opts.timerMin || 0) * 60
    };

    if (opts.timerMin) {
      addTimer(setInterval(function () {
        if (S.finished) return;
        S.left--;
        var t = $('#quizTimer', pane);
        if (t) { t.textContent = '⏱ ' + mmss(S.left); t.classList.toggle('low', S.left <= 60); }
        if (S.left <= 0) { finish(true); }
      }, 1000));
    }

    function commit(i, given) {
      var it = items[i], a = S.ans[i];
      a.given = given;
      if (!exam) {
        if (a.checked) return;
        a.checked = true;
        a.correct = isCorrect(it.q, given);
        recordAnswer(it.q.id, a.correct);
        renderNav();
      }
    }

    function finish(auto) {
      S.finished = true;
      S.elapsed = (Date.now() - S.started) / 1000;
      if (exam) {
        items.forEach(function (it, i) {
          var a = S.ans[i];
          a.checked = true;
          a.correct = isCorrect(it.q, a.given);
          recordAnswer(it.q.id, a.correct);
        });
        renderNav();
      }
      clearTimers();
      drawResults(auto);
    }

    /* ------------------------------ question screen ------------------------ */
    function draw() {
      var i = S.idx, it = items[i], q = it.q, a = S.ans[i];
      var revealed = !exam && a.checked;

      var html = '';
      html += '<div class="quiz-top">' +
        '<div class="qprogress">' +
        '<span class="small muted nums nowrap">Q' + (i + 1) + ' / ' + items.length + '</span>' +
        barHtml((i) / items.length * 100, 1, true) +
        (opts.timerMin ? '<span class="qtimer nums" id="quizTimer">⏱ ' + mmss(S.left) + '</span>' : '') +
        '</div></div>';

      html += '<section class="card q-card" style="' + accentStyle(it.unit) + '">' +
        '<div class="row q-tags">' +
        '<span class="chip">' + esc(it.unit.icon || '📘') + ' ' + esc(trunc(it.unit.title, 26)) + '</span>' +
        '<span class="chip ' + (q.level >= 3 ? 'c4' : (q.level === 2 ? 'c2' : 'c1')) + '">Level ' + esc(String(q.level || 1)) + '</span>' +
        '<span class="chip">' + esc(q.type === 'mc' ? 'Multiple choice' : (q.type === 'tf' ? 'True / false' : 'Short answer')) + '</span>' +
        '</div>' +
        '<p class="q-stem">' + esc(q.q) + '</p>';

      if (q.type === 'mc') {
        html += '<div class="choices">' + arr(q.choices).map(function (c, ci) {
          var cls = 'choice';
          if (revealed) {
            if (ci === q.answer) cls += ' right';
            else if (ci === a.given) cls += ' wrong';
            else cls += ' dim';
          } else if (a.given === ci) cls += ' picked';
          return '<button type="button" class="' + cls + '" data-pick="' + ci + '"' + (revealed ? ' disabled' : '') + '>' +
            '<span class="k">' + LETTERS[ci] + '</span><span class="c-text">' + esc(c) + '</span>' +
            (revealed && ci === q.answer ? '<span class="c-mark" aria-hidden="true">✓</span>' : '') +
            (revealed && ci === a.given && ci !== q.answer ? '<span class="c-mark" aria-hidden="true">✗</span>' : '') +
            '</button>';
        }).join('') + '</div>';
      } else if (q.type === 'tf') {
        html += '<div class="choices two-up">' + [true, false].map(function (v, vi) {
          var cls = 'choice';
          if (revealed) {
            if (v === q.answer) cls += ' right';
            else if (a.given === v) cls += ' wrong';
            else cls += ' dim';
          } else if (a.given === v) cls += ' picked';
          return '<button type="button" class="' + cls + '" data-pick="' + (v ? 'true' : 'false') + '"' + (revealed ? ' disabled' : '') + '>' +
            '<span class="k">' + (vi + 1) + '</span><span class="c-text">' + (v ? 'True' : 'False') + '</span></button>';
        }).join('') + '</div>';
      } else {
        html += '<div class="ans-row">' +
          '<label class="sr-only" for="shortIn">Your answer</label>' +
          '<input type="text" id="shortIn" autocomplete="off" spellcheck="false" placeholder="Type your answer…"' +
          (revealed ? ' disabled' : '') + ' value="' + escAttr(a.given == null ? '' : a.given) + '">' +
          (revealed ? '' : '<button class="btn primary" id="checkShort">' + (exam ? 'Save answer' : 'Check') + '</button>') +
          '</div><p class="small muted" style="margin-top:6px">Capitals, spacing and punctuation don\'t matter.</p>';
      }

      if (revealed) {
        html += '<div class="verdict ' + (a.correct ? 'right' : 'wrong') + '">' +
          '<p class="v-head">' + (a.correct ? '✓ Correct' : '✗ Not quite') + '</p>' +
          (a.correct ? '' : '<p class="v-answer">Answer: <b>' + esc(correctText(q)) + '</b>' +
            (q.type === 'short' && a.given ? ' <span class="muted">(you wrote “' + esc(a.given) + '”)</span>' : '') + '</p>') +
          '<p>' + esc(q.explain || '') + '</p>' +
          (q.lesson && lessonIndex[q.lesson] ? '<a class="chip" href="#/unit/' + esc(lessonIndex[q.lesson].unit.id) + '/learn/' + esc(q.lesson) + '">📖 Re-read: ' + esc(lessonIndex[q.lesson].lesson.title) + '</a>' : '') +
          '</div>';
      }

      html += '<div class="q-nav">' +
        (i > 0 ? '<button class="btn sm" id="prevQ">← Previous</button>' : '') +
        '<div class="spacer"></div>' +
        (exam || revealed
          ? (i < items.length - 1
            ? '<button class="btn primary" id="nextQ">Next →</button>'
            : '<button class="btn primary" id="finishQ">Finish' + (exam ? ' &amp; see score' : '') + '</button>')
          : '') +
        (exam && i === items.length - 1 ? '' : '') +
        '</div>';
      html += '</section>';

      if (exam) {
        html += '<section class="card pad-sm"><p class="small muted" style="margin-bottom:8px">Exam mode — no feedback until you finish. Jump to any question:</p>' +
          '<div class="palette">' + items.map(function (x, xi) {
            return '<button type="button" data-jump="' + xi + '" class="' + (S.ans[xi].given != null && S.ans[xi].given !== '' ? 'answered' : '') + '"' +
              (xi === i ? ' aria-current="true"' : '') + '>' + (xi + 1) + '</button>';
          }).join('') + '</div>' +
          '<div class="row mt"><button class="btn primary" id="submitAll">Submit test</button>' +
          '<span class="small muted">' + S.ans.filter(function (x) { return x.given != null && x.given !== ''; }).length + ' of ' + items.length + ' answered</span></div></section>';
      }

      pane.innerHTML = html;
      wireQ();
    }

    function pickValue(raw, q) {
      if (q.type === 'mc') return +raw;
      if (q.type === 'tf') return raw === 'true';
      return raw;
    }

    function wireQ() {
      var it = items[S.idx], q = it.q;
      $$('[data-pick]', pane).forEach(function (b) {
        b.addEventListener('click', function () {
          var v = pickValue(b.getAttribute('data-pick'), q);
          commit(S.idx, v);
          if (exam) { if (S.idx < items.length - 1) { S.idx++; } draw(); }
          else draw();
        });
      });
      var cs = $('#checkShort', pane);
      if (cs) cs.addEventListener('click', function () {
        var v = $('#shortIn', pane).value;
        if (!String(v).trim()) { toast('Type an answer first'); return; }
        commit(S.idx, v);
        if (exam && S.idx < items.length - 1) S.idx++;
        draw();
      });
      var si = $('#shortIn', pane);
      if (si) {
        si.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter') { ev.preventDefault(); if (cs) cs.click(); }
        });
        if (!S.ans[S.idx].checked) si.focus();
      }
      var nq = $('#nextQ', pane); if (nq) nq.addEventListener('click', function () { S.idx = Math.min(items.length - 1, S.idx + 1); draw(); });
      var pq = $('#prevQ', pane); if (pq) pq.addEventListener('click', function () { S.idx = Math.max(0, S.idx - 1); draw(); });
      var fq = $('#finishQ', pane); if (fq) fq.addEventListener('click', function () { finish(false); });
      var sa = $('#submitAll', pane); if (sa) sa.addEventListener('click', function () {
        var un = S.ans.filter(function (x) { return x.given == null || x.given === ''; }).length;
        if (un && !window.confirm(un + ' question' + (un === 1 ? '' : 's') + ' still unanswered. Submit anyway?')) return;
        finish(false);
      });
      $$('[data-jump]', pane).forEach(function (b) {
        b.addEventListener('click', function () { S.idx = +b.getAttribute('data-jump'); draw(); });
      });
    }

    /* ---------------------------------- results ---------------------------- */
    function drawResults(auto) {
      var right = S.ans.filter(function (a) { return a.correct; }).length;
      var score = items.length ? right / items.length * 100 : 0;

      var byUnit = {}, byObj = {};
      items.forEach(function (it, i) {
        var a = S.ans[i];
        var bu = byUnit[it.unit.id] || (byUnit[it.unit.id] = { unit: it.unit, n: 0, c: 0 });
        bu.n++; if (a.correct) bu.c++;
        arr(it.q.objectives).forEach(function (oid) {
          var o = objIndex[oid]; if (!o) return;
          var bo = byObj[oid] || (byObj[oid] = { obj: o.obj, unit: o.unit, n: 0, c: 0 });
          bo.n++; if (a.correct) bo.c++;
        });
      });

      var msg = score >= 90 ? 'Outstanding.' : score >= 75 ? 'Solid — tidy up the misses.' :
        score >= 50 ? 'Getting there. Re-read the lessons behind the misses.' : 'Rough one. Go back to the lessons, then try again.';

      var html = '';
      html += '<section class="card results-hero">' +
        '<div class="rh-ring">' + ringHtml(score, 132, 'big') + '</div>' +
        '<div class="rh-body"><h1>' + right + ' / ' + items.length + ' correct</h1>' +
        '<p class="sub">' + esc(msg) + (auto ? ' (Time ran out.)' : '') + '</p>' +
        '<p class="small muted">Took ' + mmss(S.elapsed) + '.' +
        (S.ans.filter(function (a) { return !a.correct; }).length ? ' Misses were added to your Missed Questions bank.' : '') + '</p>' +
        '<div class="row mt">' +
        '<button class="btn primary" id="retryBtn">Try another set</button>' +
        '<a class="btn" href="#/missed">🔁 Missed questions</a>' +
        '<a class="btn ghost" href="#/home">Home</a></div></div></section>';

      var unitRows = Object.keys(byUnit).map(function (k) { return byUnit[k]; });
      if (unitRows.length > 1) {
        html += '<section class="card"><h2>By unit</h2>' + unitRows.map(function (b) {
          var p = b.c / b.n * 100;
          return '<div class="bd-row"><div class="row between small"><span>' + esc(b.unit.title) + '</span>' +
            '<span class="nums muted">' + b.c + '/' + b.n + '</span></div>' + barHtml(p, masteryTone(p), true) + '</div>';
        }).join('') + '</section>';
      }

      var objRows = Object.keys(byObj).map(function (k) { return byObj[k]; })
        .sort(function (x, y) { return (x.c / x.n) - (y.c / y.n); });
      if (objRows.length) {
        html += '<section class="card"><h2>By objective</h2><p class="small muted">Weakest first.</p>' + objRows.map(function (b) {
          var p = b.c / b.n * 100;
          return '<div class="bd-row"><div class="row between small"><span>' + esc(b.obj.text) + '</span>' +
            '<span class="nums muted nowrap">' + b.c + '/' + b.n + '</span></div>' + barHtml(p, masteryTone(p), true) + '</div>';
        }).join('') + '</section>';
      }

      html += '<section class="card"><h2>Review every question</h2>' +
        items.map(function (it, i) {
          var a = S.ans[i], q = it.q;
          return '<div class="review-item ' + (a.correct ? 'right' : 'wrong') + '">' +
            '<p class="ri-q"><b>' + (i + 1) + '.</b> ' + esc(q.q) + '</p>' +
            '<p class="small"><span class="chip ' + (a.correct ? 'c3' : 'bad') + '">' + (a.correct ? '✓ you were right' : '✗ you said: ' + esc(trunc(givenText(q, a.given), 60))) + '</span> ' +
            (a.correct ? '' : '<span class="chip c3">answer: ' + esc(trunc(correctText(q), 60)) + '</span>') + '</p>' +
            '<p class="small muted">' + esc(q.explain || '') + '</p>' +
            (q.lesson && lessonIndex[q.lesson] ? '<a class="chip" href="#/unit/' + esc(lessonIndex[q.lesson].unit.id) + '/learn/' + esc(q.lesson) + '">📖 ' + esc(lessonIndex[q.lesson].lesson.title) + '</a>' : '') +
            '</div>';
        }).join('') + '</section>';

      pane.innerHTML = html;
      var rb = $('#retryBtn', pane);
      if (rb) rb.addEventListener('click', function () { if (opts.onRestart) opts.onRestart(); else render(); });
      setKeys(null);
    }

    setKeys(function (ev) {
      if (S.finished) return;
      var q = items[S.idx].q;
      if (ev.key === 'ArrowRight') { ev.preventDefault(); if (S.idx < items.length - 1) { S.idx++; draw(); } }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); if (S.idx > 0) { S.idx--; draw(); } }
      else if (/^[1-9]$/.test(ev.key)) {
        var n = +ev.key - 1;
        if (q.type === 'mc' && n < arr(q.choices).length) { ev.preventDefault(); var b = $('[data-pick="' + n + '"]', pane); if (b && !b.disabled) b.click(); }
        else if (q.type === 'tf' && n < 2) { ev.preventDefault(); var b2 = $('[data-pick="' + (n === 0 ? 'true' : 'false') + '"]', pane); if (b2 && !b2.disabled) b2.click(); }
      }
    });

    draw();
  }
