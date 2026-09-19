# Units 1–8 content audit

Audited all questions, explanations, lesson coverage, formulas, drills, and reported diagram renders in `u01` through `u08`.

Material corrections included the Unit 3 frequency chain: with depth and cycle count fixed, higher frequency shortens pulse duration, so duty factor decreases while PRP and PRF remain unchanged. Unit 4 now states incidence angles from the normal line (normal incidence = 0°) and its refraction drill specifies that a transmitted beam exists below the critical angle. Unit 8's maximum-lines drill now rounds down so the requested minimum frame rate is preserved.

Every listed formula family now has a worked example and deterministic drill coverage. Missing coverage was added for percentage, circle area, wave-equation rearrangement, axial resolution, Q-factor, half-value layer, Rayleigh scattering, fractional bandwidth, continuous-wave driving frequency, elevational resolution, and frame time. Ambiguous short-answer variants were tightened.

Verification performed:

- Reviewed numeric multiple-choice keys and their calculations.
- Generated every Unit 1–8 drill twice from each of 10,000 seeds to confirm deterministic, finite output.
- Corrected diagram issues identified from rendered contact sheets, including clipped labels, misleading dimensions, overlapping text, incomplete wave cycles, and formula typography.
- Ran `node tools/validate.js` successfully after the completed 16-unit content set was present.
- Ran `git diff --check` on the audited unit files.

No textbook text or figures were introduced, and no commit or push was made during this audit.
