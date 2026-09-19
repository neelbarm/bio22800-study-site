# Release record

## Production release — 2026-09-19

Release branch: `claude/ecstatic-hawking-3hc6l5`

### Verified release gate

- `node tools/unit.js` — grading tests passed, including signed values, tolerant hyphenated words, exact displayed numeric tolerance, and rejection of partial expressions.
- `NODE_PATH=/Users/neelbarmecha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node tools/qa.js` — functional smoke passed with 16 units and 18 routes. Planner scope and persistence, flashcards, quizzes, practice tests, missed-question recovery, whiteboard, objectives, mnemonics, search, imports, and numeric drills passed.
- Full screenshot QA — 90 desktop/mobile screenshots passed light/dark route and mobile-overflow checks.
- `node tools/validate.js` — 0 errors and 0 warnings across 16 units, 605 questions, and 115 drills.
- `node tools/diagrams-qa.js` — 298 light/dark renders with 0 text bounds failures; all contact sheets visually reviewed.
- `node tools/build.js` — static release built successfully in `dist/`.
- `git diff --check` — passed.

### Deployment

- Deployed code commit: `dafe84e`
- Production URL: <https://ultrasound-physics-study.vercel.app>
- Immutable deployment: <https://ultrasound-physics-study-2w77qf81h-neelbarmecha5-8782s-projects.vercel.app>
- Vercel deployment: `dpl_8JVkTavARyX2buvLaTmJ5rV6fCWe` (`READY`, production)

Live verification returned HTTP 200, loaded exactly 16 units, saved and reloaded an exam plan with two selected units, rendered the mobile Home page without horizontal overflow, and produced no browser console or page errors.
