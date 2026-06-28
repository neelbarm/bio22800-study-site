# BIO 22800 — Ecology & Evolution · Study Site

An interactive, self-contained study website for **BIO 22800 (Ecology & Evolution)**, covering Lectures 1–6.
Open `index.html` in any browser — no internet or install required (works fully offline, e.g. on a plane).

## How to use it
- **Learn** every topic: each real lecture slide is shown with a detailed explanation (click any slide to zoom).
- **Test yourself** per topic: multiple choice, true/false, and short answer with instant feedback.
- **🎯 Objective Mastery** (last topic of each lecture): the professor's "make sure you can…" objectives, taught and tested point by point.
- **End-of-lecture exams**, a randomized **cumulative exam simulation**, a **🔁 wrong-answer bank** (missed questions auto-collect to re-drill), **🃏 flashcards**, and an **✅ objectives checklist**.
- Progress saves automatically in your browser (localStorage).

## Contents
| Lecture | Topic |
|---|---|
| 1 | Levels of organization, biomes, the niche |
| 2 | Population growth (demography, growth models, r/K) |
| 3 | Community ecology (interactions, food webs, succession) |
| 4 | Ecological biogeography (SDMs, diversity, island biogeography) |
| 5 | Microevolution (natural selection, the 5 mechanisms, Hardy–Weinberg) |
| 6 | Phylogenetics, systematics & macroevolution |

**6 lectures · 69 topics · ~480 practice questions · 6 flashcard decks.**

## Offline single file (for a flight)
Want one file you can just download and open — no folder, no internet?
Grab **`bio22800-offline.html`**: it has the app, all content, and every slide
image embedded inside it. Download that one file, open it in any browser, and
everything works fully offline. (~14 MB — slides are downscaled so it
downloads and opens comfortably on a phone.)

To rebuild it after changing the content, run `python3 build-offline.py`
(needs `pip install Pillow`). Adjust `MAX_WIDTH` / `JPEG_QUALITY` in that
script to trade file size against slide sharpness.

**Opening it on an iPhone:** download the file into the **Files** app, then
tap it there — iOS renders and runs it. Viewing it on github.com or a text
preview just shows the source code; it only *runs* from the Files app.

## Files
- `index.html` — the app (open this), uses the files below
- `course-data.js` — all lecture content, quizzes, flashcards
- `slides/` — rendered lecture slide images
- `bio22800-offline.html` — everything above bundled into one self-contained file
- `build-offline.py` — regenerates `bio22800-offline.html`

## Note on materials
Lecture slide images are course materials from BIO 22800 (© the course instructor), included here **with the instructor's permission** for personal exam study.
