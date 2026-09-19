# Ultrasound Physics Study Site

An offline, self-contained study website for **ultrasound physics**, built to
go with *Understanding Ultrasound Physics* by Sidney K. Edelman, PhD
(4th edition). Open `index.html` in any browser. No internet, no install,
no account. Your progress saves in the browser automatically.

## How it is meant to be used

The site is built around the way you already study:

| You do this… | …the site has this |
|---|---|
| Read the book and take notes | **Learn** tab: every idea explained in plain words with a hand-drawable diagram, units and typical values, and "what happens when X changes" |
| Study strictly from the objectives | **Objectives** tab: every objective rated *Not yet / Shaky / Got it*, linked to its lessons and its own quiz. Paste your professor's objective list into **My course objectives** and track those too |
| Make up dumb sayings | **Mnemonics**: a bank of sayings per unit, plus a place to add your own |
| Flashcards and repetition | **Flashcards** with Leitner boxes: cards you miss come back tomorrow, cards you know come back in 3 days, then a week |
| Say it out loud | Every lesson ends with a **Say it out loud** prompt. Flashcards have a *say-it-first* mode |
| Write it all out on a whiteboard | **Whiteboard**: pick a prompt, start the timer, type or draw everything you remember, then grade yourself against the key points |
| Quiz with classmates on weekends | **Study Group**: *Quiz a friend* shows one big question at a time with a reveal button, and *Teach it back* hands you a topic to explain |
| Have practice tests generated | **Practice Test**: pick units, number of questions, a timer, exam mode or learning mode. **Drills** generate endless fresh numbers for every formula |
| Review what you got wrong | **Missed Questions**: everything you miss collects here until you get it right twice |
| Cram the night before | **Cram Sheet**: every formula and every number you must know, with a *hide values* toggle to test yourself. Printable |

### A weekly routine that fits the site

1. **New material:** read the book chapter, then do the unit's Learn tab and mark each lesson done. Rate the unit's objectives honestly.
2. **Every day, 10 minutes:** Flashcards → *Due today*. Then one Drill set.
3. **Mid-week:** Whiteboard the unit. Tick what you got, re-read what you missed.
4. **Before the group meets:** Practice Test in exam mode across the units on the exam. Open Missed Questions and clear it.
5. **With the group:** Study Group → Quiz a friend. Trade the laptop around.
6. **Night before:** Cram Sheet with values hidden. Objectives page → *Study weakest*.

## Units

Units follow the order of the book. Chapter numbers differ between
printings, so each unit names the chapter by topic.

1. Math Foundations
2. Sound Waves & Acoustic Parameters
3. Pulsed Waves
4. Attenuation & Interaction with Media
5. Transducers
6. Sound Beams
7. Resolution: Axial, Lateral, Elevational, Temporal
8. Transducer Arrays & Real-Time Imaging
9. Displays & Imaging Instrumentation
10. Harmonics & Contrast Agents
11. Hemodynamics
12. Doppler
13. Artifacts
14. Bioeffects, Intensities & Safety
15. Quality Assurance & Statistics

## Your data

Progress lives only in this browser's local storage. Use **Settings →
Export** to save a backup file, and **Import** to move it to another
computer or browser. **Reset** wipes everything.

## About the content

All explanations, questions, diagrams and mnemonics on this site are
original teaching material about standard ultrasound physics. The textbook
is referenced by chapter topic only. No text, figures, or exercises from the
book are reproduced here.

## For whoever maintains this

- `SPEC.md` is the contract: the schema every unit file follows and how the
  app behaves.
- Content lives in `data/units/*.js`, one file per unit, listed in
  `data/manifest.js`.
- `node tools/validate.js` checks every unit file and must print `OK`.
- The app is `index.html` + `app.js` + `styles.css`. No build step.
