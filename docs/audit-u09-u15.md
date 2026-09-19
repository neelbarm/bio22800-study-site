# Content audit: units 09–13 and 15

Date: 2026-09-19

## Scope

Reviewed and edited `u09`, `u10`, `u11`, `u12`, `u13`, and `u15`. The pass checked lesson claims, answer keys and explanations flagged in the root review; preserved question IDs; added structured worked examples; added deterministic mixed drills for previously uncovered formula families; and repaired the reported diagram overflows in these units. It does not claim literal textbook or professor-objective coverage because neither source was available.

## Material corrections

- **u09:** separated acoustic resolution from display sampling, gray-level capacity from guaranteed clinical contrast, transmit exposure settings from receive-only processing, and sequential spatial compounding from frequency compounding. Qualified the frozen-image shortcut for raw-data systems.
- **u10:** corrected decibel amplitude/power interpretation; described harmonic generation plus return scattering; allowed higher harmonics; made axial-resolution and penetration claims conditional; scoped IV administration to vascular/cardiac imaging; scoped MI 1.9 to many non-ophthalmic Track 3 systems and noted lower label/application limits.
- **u11:** stated Poiseuille assumptions and coherent units; separated laminar from necessarily parabolic flow; qualified spectral broadening, bruit/thrill, venous pulsatility and Reynolds thresholds; added real-flow Bernoulli losses and the upstream-velocity term; distinguished the water 0.735 mmHg/cm shortcut from blood's approximately 0.78 mmHg/cm.
- **u12:** generalized CW/PW array element use; made PRF the true Nyquist control and baseline a display-range allocator; removed advice to approach 90 degrees; described spectral brightness as received power, color as beam-axis mean shift/velocity estimate, and power Doppler as integrated signal power with residual angle/wall-filter limits.
- **u13:** corrected reverberation geometry, mirror/refraction qualifiers, angles-from-normal convention, side/grating-lobe mechanism and strength claims, baseline limitations, and the false rule that moving anatomy proves artifact. Speed-error questions now specify the path assumptions.
- **u15:** replaced an unsupported quarterly mandate with consistent trend testing and AIUM's at-least-annual accreditation requirement; qualified 0.1 mm targets and registration geometry; removed universal harm ranking of false negatives; corrected SnNout/SpPin; qualified reference standards and prevalence effects.

## Formula and drill coverage

Structured `<div class="steps"><ol>…</ol></div>` examples now cover the edited formula families. New deterministic mixed drills cover:

- u09: matrix pixels/memory, dB ratios, idealized sequential compounding.
- u10: MI, two-pulse pulse-inversion frame rate, specified harmonic path loss.
- u11: continuity, numeric Reynolds calculation, parabolic peak-to-mean relation.
- u12: received-minus-transmitted shift and centered-baseline maximum unaliased velocity.
- u13: range, speed error, maximum unambiguous depth, and Nyquist.
- u15: prevalence, false-negative rate, range calibration, and signed measurement error.

Existing drills continue to cover the remaining major formula families. Drill generators use only their supplied `rnd` function.

## Official-source verification

- [AIUM Standards and Guidelines for Accreditation](https://www.aium.org/resources/official-statements/view/standards-and-guidelines-for-the-accreditation-of-ultrasound-practices): documented equipment QA at least annually, more often if issues arise.
- [FDA Track 3 device summary](https://www.accessdata.fda.gov/cdrh_docs/pdf18/K180862.pdf): non-ophthalmic MI maximum 1.9 and ophthalmic MI maximum 0.23 in the cited system, supporting scoped rather than universal wording.
- [FDA sulfur-hexafluoride clinical review](https://www.fda.gov/files/drugs/published/60_203684-sulfur-hexafluoride-clinical-prea.pdf): documents intravesical microbubble use, supporting indication-specific administration wording.

## Verification and remaining limits

`node tools/validate.js` passes the six audited units and U16 with zero errors and zero warnings. `git diff --check` is clean. Arithmetic was independently recomputed for the new worked examples and generator branches. Final browser rendering and whole-site regression remain integration tasks; the root agent is rerunning them after concurrent content/app work lands.
