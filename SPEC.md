# Ultrasound Physics Study Site — Content & App Contract

This file is the single source of truth for everyone (human or agent) writing
content or code for this site. Read all of it before writing anything.

## 0. Who this is for and why it looks the way it does

One sonography student, studying **ultrasound physics** from
*Understanding Ultrasound Physics* by Sidney K. Edelman, PhD (4th edition).
There are no lecture slides; she teaches herself from the book. Her exams are
built from a list of **objectives**, so she studies strictly by objectives.

How she learns (her own words, paraphrased):

- Very **visual and hands-on**. Takes lots of notes, draws pictures/diagrams.
- Invents **"dumb sayings"** (mnemonics) to remember things.
- **Flashcards** and **repetition**.
- Quizzes herself: says things **out loud**, then writes everything she
  remembers on a **big whiteboard**.
- Meets classmates every weekend before an exam to **quiz each other**.
- Uses Quizlet/AI to generate **practice tests**.

Everything in this site exists to serve those habits. The app is a single
offline web page (no build, no server, no internet) that loads unit data
files.

## 1. Repository layout

```
index.html            the app (open this in a browser)
app.js                app logic
styles.css            app styles
data/manifest.js      window.UNIT_FILES = ["data/units/u01-....js", ...]
data/units/uNN-slug.js   one file per unit, see schema below
tools/validate.js     node tools/validate.js  -> checks every unit file
SPEC.md               this file
README.md             student-facing instructions
```

## 2. Units (book order)

Unit order follows the book. Chapter numbers are **not** put in unit titles;
`bookRef` names the chapter by topic so it can be matched to any printing.

| id  | slug                     | title                              | covers |
|-----|--------------------------|------------------------------------|--------|
| u01 | math-foundations         | Math Foundations                   | metric prefixes, unit conversion, scientific notation, reciprocals, direct/inverse proportionality, percent, decibels (dB) basics, solving simple equations |
| u02 | waves-and-parameters     | Sound Waves & Acoustic Parameters  | what sound is (mechanical, longitudinal, compressions/rarefactions), acoustic variables (pressure, density, distance/particle motion), the 7 acoustic parameters: period, frequency, amplitude, power, intensity, propagation speed, wavelength; who determines each (source vs medium), typical values, relationships, stiffness/density and speed, ranges (infrasound/audible/ultrasound) |
| u03 | pulsed-waves             | Pulsed Waves                       | continuous vs pulsed, pulse duration, spatial pulse length, pulse repetition period, pulse repetition frequency, duty factor, relationships with imaging depth and frequency, damping, units, typical values |
| u04 | attenuation-and-interaction | Attenuation & Interaction with Media | attenuation, attenuation coefficient, half-value layer/penetration depth, absorption, reflection (specular vs diffuse/scattering, Rayleigh), refraction, acoustic impedance (Z = ρc), normal vs oblique incidence, intensity reflection & transmission coefficients, Snell's law, range equation and the 13 µs rule, total attenuation |
| u05 | transducers              | Transducers                        | transducer components (case, wire, insulator, PZT/active element, matching layer, backing/damping), piezoelectric effect (direct/reverse), Curie point and depolarization, resonant frequency of pulsed vs continuous wave transducers (thickness, speed of PZT, electrical frequency), bandwidth, Q-factor, sensitivity trade-offs, sterilization/care |
| u06 | sound-beams              | Sound Beams                        | beam shape: near zone (Fresnel), focus/focal point, focal depth, far zone (Fraunhofer), divergence, factors (diameter, frequency), Huygens' principle, focusing methods (external, internal, electronic), fixed vs adjustable focus, beam width and sound beam terms |
| u07 | resolution               | Resolution: Axial, Lateral, Elevational, Temporal | axial (LARRD) resolution and SPL, lateral (LATA) resolution and beam width, elevational resolution and slice thickness, temporal resolution and frame rate, how frequency/damping/focusing change each, typical values, contrast resolution basics |
| u08 | arrays-and-real-time     | Transducer Arrays & Real-Time Imaging | mechanical vs electronic transducers, linear sequential, linear phased, curved/convex, annular phased, vector, 1.5D and 2D arrays; steering and focusing with phase delays, apodization, dynamic aperture/receive focus, multiple transmit focus and frame-rate cost, real-time imaging: frame rate, line density, sector size, depth, temporal resolution trade-offs, grating vs side lobes |
| u09 | displays-and-instrumentation | Displays & Imaging Instrumentation | A-mode, B-mode, M-mode; system block diagram: pulser/beamformer, transducer, receiver, scan converter, display; receiver functions in order (amplification, compensation/TGC, compression, demodulation, reject) and which affect the image and which are operator-adjustable; dynamic range; analog vs digital scan converter, pixels, bits, binary; pre- vs post-processing; read/write magnification; displays; PACS/DICOM; coded excitation, spatial compounding, frequency compounding, elastography, 3D/4D basics |
| u10 | harmonics-and-contrast   | Harmonics & Contrast Agents        | fundamental vs harmonic frequency, tissue harmonics (non-linear propagation, strongest in the middle of the beam), why harmonics improve images, contrast harmonics (microbubbles, resonance, mechanical index), pulse inversion and power modulation, contrast agent properties and safety |
| u11 | hemodynamics             | Hemodynamics                       | energy gradients and flow, pressure gradient, resistance, Poiseuille's law, flow types (steady, pulsatile, phasic), flow profiles (plug, laminar/parabolic, turbulent), Reynolds number, Bernoulli's principle and stenosis (velocity/pressure changes), venous flow and respiration, hydrostatic pressure, effects of exercise/disease |
| u12 | doppler                  | Doppler                            | Doppler effect and shift, Doppler equation and the angle (cosine), CW vs PW Doppler, range resolution vs aliasing, Nyquist limit and fixes for aliasing, spectral analysis (FFT), spectral display, spectral broadening, wall filter, sample volume/gate, packet size/ensemble length, color Doppler (autocorrelation), power Doppler pros/cons, Doppler with imaging (duplex) |
| u13 | artifacts                | Artifacts                          | assumptions the machine makes, reverberation, comet tail, ring-down, shadowing, edge shadowing, enhancement, mirror image, refraction/lateral displacement, side/grating lobes, speed error/propagation speed error, range ambiguity, multipath, slice thickness, Doppler artifacts (aliasing, mirror/crosstalk, clutter), how to recognize and fix each |
| u14 | bioeffects-and-safety    | Bioeffects, Intensities & Safety   | intensity types (SPTP, SPTA, SATA, etc.), pulse average vs temporal average, duty factor link, thermal mechanisms and thermal index (TIS/TIB/TIC), mechanical effects, cavitation (stable/transient), mechanical index, output display standard, ALARA, in vitro/in vivo, epidemiology, AIUM statements, hydrophone and measurement basics |
| u15 | qa-and-statistics        | Quality Assurance & Statistics     | preventive maintenance, phantoms (tissue-equivalent, Doppler, slice thickness), QA tests (axial/lateral resolution, dead zone, registration, sensitivity, uniformity, depth calibration), what a test phantom checks, AIUM 100 mm phantom, sensitivity, specificity, accuracy, positive/negative predictive value, calibration basics |

## 3. Unit file schema

Each file `data/units/uNN-slug.js` contains exactly one push:

```js
window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u03",
  order: 3,
  title: "Pulsed Waves",
  icon: "📡",                          // one emoji
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Pulsed Waves chapter",
  blurb: "One or two sentences: what this unit is about and why it matters on the exam.",

  objectives: [
    // 6–12 per unit. Write them the way a physics course states test objectives:
    // "Define…", "Calculate…", "Compare…", "List the factors that…", "Explain why…".
    { id: "u03-o1", text: "Define pulse duration and state the two factors that determine it." }
  ],

  lessons: [
    // 5–10 per unit. Each lesson = one idea, 150–400 words of html, 1+ diagram when the
    // idea is visual (most are), a say-it-out-loud prompt, and whiteboard key points.
    {
      id: "u03-l1",
      title: "What a pulse is",
      objectives: ["u03-o1"],          // every lesson maps to ≥1 objective
      html: `...`,                     // see §4 for allowed markup
      diagrams: [                      // 0–3; see §5. Simple enough to redraw by hand.
        { svg: `<svg viewBox="0 0 600 280">…</svg>`, caption: "A pulse = a few cycles, then silence." }
      ],
      sayIt: "Say out loud, without looking: what is a pulse, and what two things set its duration?",
      keyPoints: [                     // 4–8 bullets she should reproduce on a whiteboard
        "Pulse = a short burst of cycles followed by listening time",
        "PD = number of cycles × period; typical 0.5–3 µs"
      ]
    }
  ],

  mnemonics: [
    // 4–10 per unit. Catchy, silly is good. `meaning` unpacks it.
    { saying: "LARRD", meaning: "Longitudinal, Axial, Range, Radial, Depth — all names for axial resolution", lesson: "u07-l1" }
  ],

  formulas: [
    // every formula in the unit; the app builds the cram sheet from these
    { name: "Duty factor", expr: "DF (%) = PD ÷ PRP × 100", units: "%", note: "Unitless; imaging ≈ 0.1–1 %" }
  ],

  keyNumbers: [
    // facts with a number she must simply know
    { fact: "Propagation speed in soft tissue", value: "1,540 m/s (1.54 mm/µs)" }
  ],

  flashcards: [
    // 25–45 per unit. Short front, short back. Include reverse-direction cards for key terms.
    { front: "Duty factor", back: "% of time the system is transmitting; PD ÷ PRP", lesson: "u03-l2" }
  ],

  questions: [
    // 30–45 per unit. Mix: ~60% mc (4 choices), ~15% tf, ~25% short.
    // level 1 = recall, 2 = understand/apply, 3 = multi-step/compare/calculate.
    // At least 1/3 of questions must be level 2–3. Every objective gets ≥2 questions.
    { id: "u03-q1", type: "mc", q: "…", choices: ["…","…","…","…"], answer: 1,
      explain: "Why the right answer is right AND why the tempting wrong one is wrong.",
      objectives: ["u03-o1"], lesson: "u03-l1", level: 1 },
    { id: "u03-q2", type: "tf", q: "…", answer: true, explain: "…", objectives: ["u03-o2"], lesson: "u03-l2", level: 1 },
    { id: "u03-q3", type: "short", q: "…", answer: "duty factor", accept: ["DF", "duty factor"],
      explain: "…", objectives: ["u03-o3"], lesson: "u03-l2", level: 2 }
  ],

  drills: [
    // 2–8 per unit where the unit has math or "what happens if" relationships.
    // gen(rnd) is called with rnd() -> [0,1). It MUST be deterministic given rnd and
    // MUST NOT use Math.random. Returns a problem object.
    {
      id: "u03-d1", title: "Duty factor from PD and PRP", formula: "DF = PD ÷ PRP × 100", lesson: "u03-l2",
      gen: function (rnd) {
        var pd = [0.5, 1, 1.5, 2][Math.floor(rnd() * 4)];
        var prp = [100, 150, 200, 250][Math.floor(rnd() * 4)];
        var df = pd / prp * 100;
        return {
          kind: "number",                                 // "number" or "choice"
          given: "PD = " + pd + " µs, PRP = " + prp + " µs",
          ask: "What is the duty factor (%)?",
          answer: +df.toFixed(3), unit: "%", tol: 0.01,   // absolute tolerance
          steps: ["DF = PD ÷ PRP × 100", "= " + pd + " ÷ " + prp + " × 100", "= " + df.toFixed(2) + " %"]
        };
      }
    },
    {
      id: "u03-d2", title: "Relationship reasoning", formula: "PRF ↔ depth", lesson: "u03-l3",
      gen: function (rnd) {
        var deeper = rnd() < 0.5;
        return {
          kind: "choice",
          given: "The sonographer " + (deeper ? "increases" : "decreases") + " the imaging depth.",
          ask: "What happens to PRF?",
          choices: ["Increases", "Decreases", "Unchanged"],
          answer: deeper ? 1 : 0,
          steps: ["Deeper → longer listening time → longer PRP", "PRF = 1 ÷ PRP, so PRF " + (deeper ? "decreases" : "increases")]
        };
      }
    }
  ],

  whiteboard: [
    // 2–5 per unit. Brain-dump prompts. keyPoints are the self-grading checklist (6–15 items).
    { id: "u03-w1", prompt: "Write every pulsed-wave parameter, its units, typical value, and what determines it.",
      keyPoints: ["…"], minutes: 6, lesson: "u03-l2" }
  ]
});
```

Rules:

- All ids are unique across the whole site and prefixed with the unit id.
- Every `objectives`, `lesson` reference must point at something that exists.
- Question `answer` for `mc` is a 0-based index; for `tf` a boolean; for `short`
  a string, with `accept` listing every acceptable spelling/abbreviation
  (matching is case-insensitive, trims punctuation).
- `short` questions must have a short, unambiguous answer (a term, a number
  with unit, a yes/no + reason is NOT short — make it `mc` instead).
- Numbers in `number` drills: give `tol` generously enough that rounding in
  the last digit passes.
- `gen` must only use `rnd`, plain arithmetic and `Math` functions other than
  `Math.random`. It runs in the browser and in node.

## 4. Lesson HTML (what's allowed inside `html`)

Plain HTML string. Allowed elements: `p, ul, ol, li, b, i, em, strong, br,
table (class dt), tr, th, td, span, div, sup, sub, code`.
Allowed classes:

- `<p class="lead">` opening sentence of the lesson (the one-line idea).
- `<span class="kw">term</span>` a key term (rendered highlighted) and
  `<span class="kw-2">term</span>` a secondary term.
- `<div class="callout key">…</div>` the thing to memorize.
- `<div class="callout tip">…</div>` a study tip, mental picture, or "dumb saying".
- `<div class="callout warn">…</div>` a common mistake / exam trap.
- `<div class="formula">λ = c ÷ f</div>` a formula on its own line.
- `<table class="dt">` a compact data table.

Write for a smart adult who has never seen the material and learns visually:
concrete mental pictures ("imagine…"), everyday analogies, then the precise
statement. Give the units and typical values every time a quantity appears.
Say explicitly who controls a parameter (sonographer / machine / medium) and
what happens to related quantities when it changes ("↑ frequency → ↓
wavelength → ↑ axial resolution → ↓ penetration").

## 5. Diagrams (inline SVG)

- Root `<svg viewBox="0 0 600 H">` with H between 200 and 400. No `width`/`height`
  attributes; no `<script>`, no external references, no raster images.
- Lines/shapes: `stroke="currentColor"` or one of the palette variables.
  Fills: `fill="none"`, `fill="currentColor"`, or a palette variable.
- Palette variables (defined by the app, work in light and dark mode):
  `var(--c1)` blue, `var(--c2)` orange, `var(--c3)` green, `var(--c4)` pink,
  `var(--ink)` text color, `var(--muted)` gray, `var(--paper)` background.
- Text: `<text fill="currentColor" font-size="16">`; minimum font-size 14 in
  the 600-wide box; `font-family` is inherited, do not set it.
- Keep it **hand-drawable**: few shapes, labeled arrows, one idea per
  diagram. She will redraw it on a whiteboard.
- Add `role="img"` and `<title>` describing the picture.

## 6. Accuracy and originality (non-negotiable)

- Physics must be correct and consistent with standard sonography (SPI-level)
  teaching: soft-tissue speed 1,540 m/s; range equation 13 µs per cm of
  depth; Doppler shift equation with 2, cos θ; Nyquist = PRF/2; PZT resonant
  frequency = speed in PZT ÷ (2 × thickness); etc.
- Do **not** reproduce sentences, exercises, tables, or figures from the
  textbook. Write original explanations of the same standard physics. The
  book is referenced only by chapter topic in `bookRef`.
- No filler. Every question must have a real explanation. Every mnemonic
  must be something a person could actually remember.

## 7. Self-check before you finish

Run `node tools/validate.js` from the repository root. It must print
`OK` for your files with zero errors. Fix warnings when reasonable.

## 8. App behavior (index.html + app.js + styles.css)

Vanilla HTML/CSS/JS, no build step, no framework, no network requests, no
web fonts. Must work when opened from `file://` — so data is loaded by
injecting `<script>` tags for each entry in `window.UNIT_FILES`
(`data/manifest.js`), never by `fetch`. After all files load, sort
`window.UNITS` by `order` and render. Hash routing (`#/home`,
`#/unit/u03/learn`, `#/test`, …). Light/dark theme (system default + toggle)
via CSS variables that include `--c1 --c2 --c3 --c4 --ink --muted --paper`
(used by diagrams). Responsive down to 360 px wide. Keyboard usable.
All user-entered text is escaped before rendering.

Progress lives in `localStorage` under one key (`usp.v1`) with Export
(download JSON) / Import / Reset in Settings.

### Navigation
Sidebar (collapsible on phones): Home · each unit (with mastery %) ·
Practice Test · Flashcards · Objectives · Whiteboard · Study Group ·
Cram Sheet · Missed Questions · Mnemonics · Settings. A search box finds
lessons, key terms, flashcards, formulas across units.

### Home
"Next up" suggestions (weakest objectives, flashcards due, missed
questions), per-unit progress bars, days-studied streak, quick-start
buttons.

### Unit page tabs
- **Learn** — lesson list + lesson view: objectives chips, html, diagrams
  (click to enlarge), mnemonics for that lesson in a tip box, a **Say it out
  loud** card (button reveals `keyPoints` as a tick list), *Mark lesson
  done*, prev/next.
- **Objectives** — each objective with a 3-level self-rating (Not yet /
  Shaky / Got it), links to its lessons, its quiz accuracy from recorded
  attempts, and a *Quiz me on this* button. Below: **My course objectives**,
  a textarea where she pastes her professor's objectives for the unit (one
  per line); each becomes a rateable checklist item stored locally.
- **Flashcards** — Leitner boxes (New / Learning / Known). Click/space
  flips. *Didn't know* → box 1, *Knew it* → next box. Due scheduling: box 1
  daily, box 2 every 3 days, box 3 weekly. Options: shuffle, reverse
  (back→front), **say-it-first** (back hidden until she confirms she said
  it out loud). Global Flashcards page: all units, filter, due count.
- **Quiz** — pick count (10 / 20 / all), level, objectives; instant
  feedback + explanation; short-answer matching is case-insensitive and
  ignores punctuation/extra spaces; results summary; misses go to the
  Missed bank; per-question attempts/correct are recorded (drives
  objective mastery %).
- **Drills** — pick a drill; problems generated from `gen(rnd)` with a
  time-seeded rnd; number input with unit and tolerance check, or choice
  buttons; *Show steps*; *Next*; running streak.
- **Whiteboard** — pick a prompt (unit `whiteboard` items and lesson `sayIt`
  prompts); countdown timer; a big text area **and** a drawing canvas
  (pen / eraser / clear, mouse + touch); *Done → reveal key points* as a
  tick list she self-grades; score saved per prompt.
- **Mnemonics** — unit mnemonics + *Add your own* (stored locally,
  editable). Global Mnemonics page lists all.

### Global pages
- **Practice Test** — choose units, count, optional timer, exam mode (no
  feedback until the end) or learning mode; end screen with score,
  per-unit and per-objective breakdown, full review with explanations.
- **Missed Questions** — bank of missed questions; re-drill; a question
  leaves the bank after being answered correctly twice.
- **Objectives** — every unit's objectives with ratings, sorted weakest
  first; *Study weakest* launches a quiz on them.
- **Study Group** — *Quiz a friend*: big-type question, reveal answer,
  next (space / arrow keys), choose units and count. *Teach it back*:
  random lesson `sayIt` prompt with key points reveal.
- **Cram Sheet** — all `formulas` and `keyNumbers` grouped by unit;
  *hide values* toggle for self-testing; print-friendly.
- **Settings** — theme, name, export / import / reset.
