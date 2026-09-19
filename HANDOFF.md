# HANDOFF — how to continue this project if the previous agent stopped

Read this first, then `SPEC.md`. Everything below is written so a fresh
agent (any model) with no memory of the earlier session can finish the job.

## What we are building

An offline study website for one sonography student learning ultrasound
physics from *Understanding Ultrasound Physics* (Edelman, 4th ed.). She has
no lecture slides, studies strictly from course **objectives**, is visual and
hands-on, uses mnemonics ("dumb sayings"), flashcards, says things out loud,
brain-dumps on a whiteboard, quizzes with classmates on weekends, and likes
generated practice tests. `SPEC.md §0` has the full profile; `SPEC.md §8`
lists every app feature; `README.md` describes the finished product to her.

## Git

- Repo: `neelbarm/bio22800-study-site`. Work on branch
  `claude/ecstatic-hawking-3hc6l5`. Draft PR:
  https://github.com/neelbarm/bio22800-study-site/pull/1
- Commit small and often (`git push -u origin claude/ecstatic-hawking-3hc6l5`).
  Commit messages end with a `Co-Authored-By:` line for the model in use.
- The old BIO 22800 site was deliberately wiped on this branch (first commit
  on the branch). Do not restore it.

## Layout and the contract

```
SPEC.md               the contract: student profile, unit list, data schema,
                      allowed HTML, SVG rules, accuracy rules, app behavior
README.md             student-facing instructions (done)
data/manifest.js      the 15 unit file paths (done)
data/units/uNN-*.js   one file per unit — THE CONTENT (see status below)
tools/validate.js     node tools/validate.js  → must print OK (done)
tools/qa.js           headless-Chromium smoke test of the app (done)
index.html app.js styles.css   the app (see status below)
```

## Status checklist — update this file as you go

- [x] Contract, validator, manifest, README
- [ ] u01 math-foundations
- [ ] u02 waves-and-parameters
- [ ] u03 pulsed-waves
- [ ] u04 attenuation-and-interaction
- [ ] u05 transducers
- [ ] u06 sound-beams
- [ ] u07 resolution
- [ ] u08 arrays-and-real-time
- [ ] u09 displays-and-instrumentation
- [ ] u10 harmonics-and-contrast
- [ ] u11 hemodynamics
- [ ] u12 doppler
- [ ] u13 artifacts
- [ ] u14 bioeffects-and-safety
- [ ] u15 qa-and-statistics
- [ ] App shell: index.html + app.js + styles.css implementing SPEC §8
- [ ] `node tools/validate.js` prints OK for all 15 units
- [ ] `NODE_PATH=/opt/node22/lib/node_modules node tools/qa.js` runs with
      0 console errors at 1280 px and at `W=390`
- [ ] Manual look at screenshots; fix layout problems
- [ ] Physics spot-check of a sample of questions per unit
- [ ] Final commit, push, PR description updated, PR marked ready if asked

A unit counts as done only when its file exists, `node tools/validate.js
data/units/<file>` prints `OK`, and it is committed.

## How the work was split (so you can re-run it the same way)

Content was delegated to parallel agents, two units each, with this brief:
"Read SPEC.md in full. Write `data/units/<file>` for unit(s) X. Cover every
topic in the `covers` column of SPEC §2. Targets: 6–12 objectives, 6–10
lessons of 150–400 words with hand-drawable inline SVG diagrams, 5–10
mnemonics, all formulas, key numbers, 30–45 flashcards, 32–45 questions
(≈60% mc / 15% tf / 25% short, ≥⅓ level 2–3, every objective ≥2 questions,
explanations that say why the tempting wrong answer is wrong), 3–8 drills
with deterministic `gen(rnd)` functions that vary the numbers, 3–5
whiteboard prompts with 6–15 key points. Original prose only — never copy
the textbook. Run the validator until OK."

The app shell was delegated to one agent with SPEC §8 as the brief, told to
test with Playwright (globally installed: prefix commands with
`NODE_PATH=/opt/node22/lib/node_modules`). If `data/units/u99-sample.js`
exists it is that agent's temporary test fixture: delete it and make sure
`data/manifest.js` still lists exactly the 15 real files.

If you cannot run parallel agents, just write the missing unit files one at a
time yourself, in the same style, validating each.

## Physics ground rules (so units stay consistent)

Standard SPI-level teaching: soft tissue 1,540 m/s = 1.54 mm/µs; λ(mm) =
1.54 ÷ f(MHz); period(µs) = 1 ÷ f(MHz); 13 µs per cm of depth round trip;
PRP = 13 µs × depth(cm); duty factor = PD ÷ PRP; axial resolution = SPL ÷ 2;
lateral resolution = beam width; near-zone length = D² ÷ (4λ); PZT pulsed
frequency = c(PZT) ÷ (2 × thickness); matching layer = ¼ λ; Q = f₀ ÷
bandwidth; Z = ρc; reflection % = ((Z₂−Z₁)/(Z₂+Z₁))²; attenuation coeff ≈
f/2 dB/cm in soft tissue; Doppler shift = 2 f v cos θ ÷ c; Nyquist = PRF ÷
2; MI = peak rarefactional pressure ÷ √f; SPTP ≥ SPPA ≥ SPTA ≥ SATP ≥ SAPA ≥
SATA; TA = PA × duty factor; AIUM: no confirmed bioeffects below SPTA
100 mW/cm² unfocused, 1 W/cm² focused; sensitivity = TP/(TP+FN),
specificity = TN/(TN+FP).

## Things the user still owes us (ask if they are around)

- The student's real course objective list. When received, either paste it
  into each unit's `objectives` (keeping ids stable) or leave it for her to
  paste into the app's "My course objectives" box.
- Confirmation of the chapter numbering in her printing of the book (units
  are named by topic, in book order, on purpose).

## UI quality bar (client requirement, added later)

The client said: "It will be a webpage so UI needs to be amazing." The app
must look designed, not just work. Non-negotiables: a deliberate type scale
and 8px spacing grid; neutral surface system with per-unit accent colors; a
designed dark mode; 150–200ms motion with a flashcard flip and animated
progress; Home hero with today's plan and a unit-card grid with mastery
rings; two-column Learn layout; large answer cards in quizzes with a results
ring; a visible whiteboard toolbar; a full-bleed Study Group presentation
mode; empty states with a next action; touch targets ≥ 44px; contrast
≥ 4.5:1 in both themes; no horizontal scroll at 360px. Screenshot every page
in both themes at 1280 and 390 and look at them before calling it done.
