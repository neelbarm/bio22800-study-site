# Ultrasound Physics Study Site — continuation handoff

Updated 2026-09-19. Repository: `neelbarm/bio22800-study-site`.
Working branch: `claude/ecstatic-hawking-3hc6l5`.
Existing PR: https://github.com/neelbarm/bio22800-study-site/pull/1

## Student and goal

The student self-teaches ultrasound physics alongside Sidney K. Edelman,
Understanding Ultrasound Physics, fourth edition. Her tests follow course
objectives. She learns through diagrams, notes, memorable sayings,
flashcards, explaining aloud, whiteboard recall, and weekend classmate
quizzes. Preserve those learning flows. The actual textbook and professor's
objective list have not been provided; do not claim verified coverage of
every assigned objective or reproduce textbook text.

The user requested Astra for planning/review and cheaper models for
implementation. This continuation uses Sol execution agents. The user also
explicitly authorized Vercel deployment when finished.

## Current implementation

- All 16 units exist and are listed in `data/manifest.js`.
- Unit 16 links frequency/depth relationships, control ownership, units,
  core formulas, worked examples, and mixed problems. Cram Sheet aggregates
  the complete formula lists from every unit.
- The vanilla app includes Learn, objectives and custom objective lists,
  flashcards, quizzes, timed practice tests, drills, drawing/text whiteboard,
  Study Group, mnemonics, search, missed questions, and progress backup.
- Exam Planner stores the next exam date and selected units.
- All original unit IDs and question IDs remain stable.
- Content corrections and scope are recorded in `docs/audit-*.md`.
- `docs/visual-qa.md` records diagram review findings and resolutions.

## Important accuracy corrections

Do not reintroduce the previous universal six-intensity ranking. Only
compare SP with SA at a fixed temporal statistic, or TP/PA/TA at a fixed
spatial statistic. Crossed comparisons may be indeterminate.

Frequency/damping/depth relationships require named constants. Increasing
frequency at fixed cycles shortens PD and SPL; at fixed PRP that lowers DF.
Depth constrains maximum PRF; actual settings may already be below the
ceiling. Snell angles are measured from the normal.

TI is a model, not a thermometer or guaranteed upper bound. MI uses derated
rarefactional pressure. Historical no-effects intensity values are not
universal safety guarantees. See the cited AIUM/FDA sources in the safety
audit. This site is a study companion, not a clinical operating protocol.

## Validation and hosting

- `node tools/validate.js`: schema/references/coverage checks, deterministic
  drill checks, and manifest parity. Explicit file arguments validate a unit.
- `node tools/qa.js`: browser checks; supply Playwright through Node's module
  path or `PLAYWRIGHT_PATH`. `W=390` selects phone width; `SHOTS` saves images.
- `node tools/diagrams-qa.js`: Playwright + Sharp, renders every SVG in both
  themes and generates contact sheets. `SHOTS` selects output directory.
- `node tools/build.js`: validates and copies only index/app/styles/data to
  `dist/`. Vercel uses this dependency-free build via `vercel.json`.
- `.vercel/`, `.env*`, generated output, and dependencies are not source.
- Vercel project: `ultrasound-physics-study`, team
  `neelbarmecha5-8782s-projects`. Local project linkage is in ignored
  `.vercel/project.json`. CLI deployment is available. Automatic GitHub
  linkage failed because Vercel needs a GitHub login connection; manual
  deployment does not depend on that connection.

Progress uses browser localStorage (`usp.v1`) and is specific to browser,
device, and origin. Export/Import moves it between the file copy and hosted
site. Opening the downloaded folder works offline; a cold load of the
hosted site requires a connection.

## Release gate

The content, arithmetic, visual and application regression gates passed on
2026-09-19. The validated release contains 16 units, 605 questions and 115
drills. The static build completed with zero validator errors or warnings,
diagram QA completed 298 theme renders with zero text bounds failures, and
desktop/mobile browser regression passed all 18 routes in both themes.
Deployment details are recorded in `docs/release.md`. Do not merge the PR or
mark it ready without a separate request.

Production is live at <https://ultrasound-physics-study.vercel.app> from code
commit `dafe84e`. The production smoke test returned HTTP 200, loaded all 16
units, persisted and reloaded the exam planner, passed the mobile Home layout
check, and reported no browser console or page errors.
