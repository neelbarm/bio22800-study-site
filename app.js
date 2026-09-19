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
