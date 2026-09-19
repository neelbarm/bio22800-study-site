window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u12",
  order: 12,
  title: "Doppler",
  icon: "🎚️",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Doppler chapter",
  blurb: "Everything that turns moving blood into a sound, a spectrum, or a splash of color: the Doppler shift and its equation, the cosine of the angle, CW versus PW, the Nyquist limit and aliasing, spectral analysis, and color and power Doppler. Expect a large share of exam questions from this unit, most of them about the angle and about aliasing.",

  objectives: [
    { id: "u12-o1", text: "Define the Doppler effect and Doppler shift, and state the sign of the shift for flow toward and away from the transducer." },
    { id: "u12-o2", text: "Write the Doppler equation and calculate the Doppler shift from transmitted frequency, blood velocity, and angle." },
    { id: "u12-o3", text: "Explain the role of the cosine of the Doppler angle, state cos 0°, 30°, 45°, 60°, and 90°, and state the clinically acceptable angle range." },
    { id: "u12-o4", text: "Compare continuous wave and pulsed wave Doppler by number of crystals, range resolution, aliasing, and maximum measurable velocity." },
    { id: "u12-o5", text: "Define the Nyquist limit, explain when aliasing occurs, and list the operator fixes for aliasing." },
    { id: "u12-o6", text: "Describe spectral analysis by fast Fourier transform, identify the axes of the spectral display, and explain the causes of spectral broadening." },
    { id: "u12-o7", text: "Explain what the wall filter, sample volume size, baseline, scale, and gain controls do to a Doppler signal and who adjusts them." },
    { id: "u12-o8", text: "Describe color Doppler: autocorrelation processing, mean velocity and direction, the color map, packet size, and the trade-off with frame rate." },
    { id: "u12-o9", text: "Compare color Doppler with power Doppler and define duplex and triplex imaging." }
  ],

  lessons: [
    {
      id: "u12-l1",
      title: "The Doppler effect and the Doppler shift",
      objectives: ["u12-o1"],
      html: `<p class="lead">Stand on a sidewalk while an ambulance passes: the siren sounds high as it comes at you and drops low the instant it passes. Nothing changed in the siren — only the relative motion changed.</p>
<p>The <span class="kw">Doppler effect</span> is the change in the frequency of a wave caused by relative motion between the sound source and the receiver. In ultrasound the moving thing is a red blood cell, and it acts as a moving reflector: it receives sound at one frequency and sends it back at another.</p>
<p>The <span class="kw">Doppler shift</span> is that difference:</p>
<div class="formula">Doppler shift = received frequency − transmitted frequency</div>
<table class="dt"><tr><th>Blood is moving…</th><th>Received frequency</th><th>Doppler shift</th></tr>
<tr><td>Toward the transducer</td><td>Higher than transmitted</td><td><b>Positive</b></td></tr>
<tr><td>Away from the transducer</td><td>Lower than transmitted</td><td><b>Negative</b></td></tr>
<tr><td>Perpendicular to the beam</td><td>Same as transmitted</td><td><b>Zero</b></td></tr></table>
<div class="callout key">Doppler shifts in diagnostic work land in the <b>audible</b> range — roughly a few hundred Hz up to about 10 kHz — even though the transmitted frequency is 2–10 MHz. That is why you can listen to blood flow.</div>
<p>Notice the size difference: a 5 MHz beam is 5,000,000 Hz, and the shift might be 3,000 Hz. The shift is a tiny fraction of the transmitted frequency, which is why the machine must compare the returning echo to the transmitted wave rather than simply measure it.</p>
<div class="callout tip">Sign check: <b>positive = coming at you</b>. On the spectral display, positive shifts are drawn above the baseline by default (and the sonographer can invert that).</div>
<div class="callout warn">Doppler shift depends on <i>relative</i> motion. A stationary reflector gives zero shift, and so does a fast-moving one crossing the beam at exactly 90°.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>A reflector moving toward the transducer returns bunched-up higher-frequency waves, while one moving away returns stretched lower-frequency waves</title>
<rect x="20" y="40" width="34" height="56" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="16" y="30" fill="currentColor" font-size="16">probe</text>
<polyline points="90,44 100,60 110,44 120,60 130,44 140,60 150,44 160,60 170,44 180,60 190,44" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="210" y="56" fill="var(--c2)" font-size="16">higher f  →  shift is POSITIVE</text>
<line x1="250" y1="80" x2="200" y2="80" stroke="currentColor" stroke-width="3"/>
<polyline points="212,70 198,80 212,90" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="258" y="86" fill="currentColor" font-size="16">cell moving toward probe</text>
<rect x="20" y="150" width="34" height="56" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="90,154 110,176 130,154 150,176 170,154 190,176 210,154" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="230" y="166" fill="var(--c1)" font-size="16">lower f  →  shift is NEGATIVE</text>
<line x1="250" y1="196" x2="310" y2="196" stroke="currentColor" stroke-width="3"/>
<polyline points="298,186 312,196 298,206" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="326" y="202" fill="currentColor" font-size="16">cell moving away</text>
</svg>`,
          caption: "Toward = squeezed waves = higher frequency = positive shift. Away = stretched = lower = negative."
        }
      ],
      sayIt: "Say out loud: what is the Doppler shift, what sign does it have for flow toward the probe, and why can you hear it?",
      keyPoints: [
        "Doppler effect = frequency change from relative motion between source and receiver",
        "Doppler shift = received frequency − transmitted frequency",
        "Toward the transducer = higher received frequency = positive shift",
        "Away from the transducer = lower received frequency = negative shift",
        "Perpendicular (90°) motion = zero shift",
        "Clinical shifts are audible: roughly a few hundred Hz to about 10 kHz"
      ]
    },

    {
      id: "u12-l2",
      title: "The Doppler equation",
      objectives: ["u12-o2"],
      html: `<p class="lead">One equation ties the whole unit together, and every variable in it shows up on your exam.</p>
<div class="formula">Doppler shift = (2 × transmitted frequency × velocity × cos θ) ÷ propagation speed</div>
<p>Written with symbols: Δf = (2 × f₀ × v × cos θ) ÷ c, with c = <b>1,540 m/s</b> in soft tissue.</p>
<table class="dt"><tr><th>Variable</th><th>Who sets it</th><th>Effect on the shift</th></tr>
<tr><td>2</td><td>Physics</td><td>The sound makes a round trip — out and back — so the effect happens twice</td></tr>
<tr><td>Transmitted frequency f₀ (MHz)</td><td>Sonographer (probe / Doppler setting)</td><td>Direct: ↑ f₀ → ↑ shift</td></tr>
<tr><td>Blood velocity v (m/s or cm/s)</td><td>Patient</td><td>Direct: ↑ v → ↑ shift</td></tr>
<tr><td>cos θ</td><td>Sonographer (how you hold the probe)</td><td>Direct: 1 at 0°, 0 at 90°</td></tr>
<tr><td>Propagation speed c</td><td>Medium (1,540 m/s)</td><td>Inverse, and essentially fixed</td></tr></table>
<p>Rearranged for what you actually want — the velocity — it becomes:</p>
<div class="formula">v = (Doppler shift × c) ÷ (2 × f₀ × cos θ)</div>
<div class="callout key">The machine measures the <b>shift</b>. It <b>calculates</b> the velocity using the angle <i>you</i> typed in. Give it a wrong angle and it reports a wrong velocity with total confidence.</div>
<p>Worked example: a 5 MHz probe, blood at 50 cm/s (0.5 m/s), angle 0°. Δf = (2 × 5,000,000 × 0.5 × 1) ÷ 1,540 ≈ <b>3,250 Hz ≈ 3.2 kHz</b> — right in the audible range.</p>
<div class="callout warn">Raising the transmit frequency raises the shift, which sounds helpful — but a bigger shift aliases sooner in PW Doppler. For deep, fast flow you want a <b>lower</b> Doppler frequency.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 220" role="img"><title>Diagram of the Doppler equation showing the round trip that produces the factor of two</title>
<rect x="30" y="80" width="34" height="56" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="70" y1="96" x2="430" y2="96" stroke="var(--c2)" stroke-width="3"/>
<polyline points="416,86 434,96 416,106" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="150" y="80" fill="var(--c2)" font-size="16">out (shift #1)</text>
<line x1="430" y1="126" x2="70" y2="126" stroke="var(--c1)" stroke-width="3"/>
<polyline points="84,116 66,126 84,136" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="150" y="152" fill="var(--c1)" font-size="16">back (shift #2)</text>
<line x1="450" y1="70" x2="450" y2="150" stroke="currentColor" stroke-width="2"/>
<line x1="500" y1="70" x2="500" y2="150" stroke="currentColor" stroke-width="2"/>
<line x1="460" y1="112" x2="492" y2="112" stroke="currentColor" stroke-width="3"/>
<polyline points="482,104 496,112 482,120" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="452" y="170" fill="currentColor" font-size="16">vessel</text>
<text x="30" y="200" fill="currentColor" font-size="17">Δf = 2 × f₀ × v × cos θ ÷ 1540 m/s</text>
</svg>`,
          caption: "The 2 is there because the moving cell shifts the sound once on the way in and again on the way back."
        }
      ],
      sayIt: "Say out loud: write the Doppler equation from memory, name who controls each variable, and say what the 2 is doing there.",
      keyPoints: [
        "Δf = (2 × f₀ × v × cos θ) ÷ c",
        "c = 1,540 m/s in soft tissue",
        "The 2 accounts for the round trip of the sound",
        "↑ transmit frequency, ↑ velocity, or angle closer to 0° → bigger shift",
        "v = (Δf × c) ÷ (2 × f₀ × cos θ)",
        "The machine measures the shift and computes velocity from the angle you enter"
      ]
    },

    {
      id: "u12-l3",
      title: "The angle and its cosine",
      objectives: ["u12-o3"],
      html: `<p class="lead">The Doppler angle is the angle between the sound beam and the direction blood is traveling — and it is the single biggest source of operator error in vascular scanning.</p>
<p>Doppler only detects the part of the motion that is along the beam. Cosine is the math that takes that component.</p>
<table class="dt"><tr><th>Angle θ</th><th>cos θ</th><th>Shift you get</th></tr>
<tr><td>0°</td><td>1.00</td><td>Maximum — all of it</td></tr>
<tr><td>30°</td><td>0.87</td><td>87 % of maximum</td></tr>
<tr><td>45°</td><td>0.71</td><td>71 %</td></tr>
<tr><td>60°</td><td>0.50</td><td>Half</td></tr>
<tr><td>90°</td><td>0.00</td><td><b>None</b> — no signal at all</td></tr></table>
<div class="callout key">Best angle = <b>0°</b> (parallel to flow). Worst = <b>90°</b> (perpendicular — zero shift). Clinically, stay between <b>30° and 60°</b> and never exceed <b>60°</b>.</div>
<p>Why not just always use 0°? In cardiac imaging you often can get nearly parallel and you should. In vascular imaging the vessel usually runs parallel to the skin, so a beam straight down hits it at 90°; you steer and heel-toe the probe to get into the 30–60° window.</p>
<div class="callout warn">Why 60° is the ceiling: the cosine curve is <b>steepest near 90°</b>, so the same small angle mistake causes a much larger velocity error at big angles. A 5° error at 20° changes the calculated velocity by only a few percent; the same 5° error at 70° can change it by 20 % or more. Small angle, forgiving. Big angle, unforgiving.</div>
<p>Direction of the error is worth memorizing too: if the machine thinks the angle is smaller than it really is, it under-reports velocity; if the entered angle is too large, it over-reports. And remember <b>who</b> owns this: the sonographer sets both the beam steering and the angle-correct cursor, which must be aligned parallel to the true direction of flow, not to the vessel walls if they differ.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Doppler angle geometry: the beam crossing a vessel at an angle theta, with a table of cosine values</title>
<rect x="40" y="20" width="34" height="44" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="57" y1="64" x2="250" y2="190" stroke="var(--c1)" stroke-width="3"/>
<text x="70" y="120" fill="var(--c1)" font-size="16">beam</text>
<line x1="60" y1="190" x2="420" y2="190" stroke="currentColor" stroke-width="2"/>
<line x1="60" y1="240" x2="420" y2="240" stroke="currentColor" stroke-width="2"/>
<line x1="260" y1="215" x2="400" y2="215" stroke="var(--c2)" stroke-width="3"/>
<polyline points="388,205 404,215 388,225" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="300" y="206" fill="var(--c2)" font-size="16">flow</text>
<text x="252" y="176" fill="currentColor" font-size="17">θ</text>
<text x="440" y="46" fill="currentColor" font-size="16">cos 0° = 1.00</text>
<text x="440" y="76" fill="currentColor" font-size="16">cos 30° = 0.87</text>
<text x="440" y="106" fill="currentColor" font-size="16">cos 45° = 0.71</text>
<text x="440" y="136" fill="currentColor" font-size="16">cos 60° = 0.50</text>
<text x="440" y="166" fill="var(--c4)" font-size="16">cos 90° = 0</text>
<text x="440" y="206" fill="currentColor" font-size="16">use 30°–60°</text>
</svg>`,
          caption: "θ is measured between the beam and the direction of flow. At 90° the cosine is zero and so is your signal."
        }
      ],
      sayIt: "Say out loud: the cosine of 0, 30, 45, 60 and 90 degrees, the best and worst Doppler angles, and why 60 degrees is the clinical limit.",
      keyPoints: [
        "Doppler angle = angle between the beam and the direction of blood flow",
        "cos 0° = 1, cos 30° = 0.87, cos 45° = 0.71, cos 60° = 0.5, cos 90° = 0",
        "0° gives the largest shift; 90° gives no shift at all",
        "Clinical window: 30°–60°, never above 60°",
        "Angle errors cause much bigger velocity errors at large angles",
        "The sonographer sets the steering and the angle-correct cursor"
      ]
    },

    {
      id: "u12-l4",
      title: "CW versus PW Doppler",
      objectives: ["u12-o4"],
      html: `<p class="lead">Two ways to do Doppler, and they have exactly opposite strengths — which is the whole reason the exam loves them.</p>
<p><span class="kw">Continuous wave (CW) Doppler</span> uses <b>two crystals</b>: one transmits without stopping and the other listens without stopping. Because it never stops transmitting, it has no way to time an echo, so it cannot tell you the <b>depth</b> the signal came from. Every moving thing anywhere in the overlap region of the two beams contributes — that is <span class="kw-2">range ambiguity</span>. The payoff: with no pulsing there is no sampling limit, so CW <b>never aliases</b> and can measure very high velocities.</p>
<p><span class="kw">Pulsed wave (PW) Doppler</span> uses <b>one crystal</b> that alternately transmits and listens. Because it times each echo, it can listen only during a chosen window, which gives you a <span class="kw-2">sample volume</span> (gate) placed exactly where you want it. The price: it samples the flow intermittently, and once the Doppler shift exceeds half the PRF the samples are too sparse to reconstruct the signal — it <b>aliases</b>.</p>
<table class="dt"><tr><th></th><th>CW</th><th>PW</th></tr>
<tr><td>Crystals</td><td>2 (one sends, one receives)</td><td>1 (sends, then listens)</td></tr>
<tr><td>Range resolution</td><td>None — range ambiguity</td><td>Yes — adjustable gate</td></tr>
<tr><td>Aliasing</td><td>Never</td><td>Yes, above Nyquist</td></tr>
<tr><td>Max velocity</td><td>Essentially unlimited</td><td>Limited by PRF ÷ 2</td></tr>
<tr><td>Best for</td><td>Very fast jets (stenosis, valves)</td><td>Knowing exactly where the flow is</td></tr></table>
<div class="callout key">You cannot have both. <b>PW = knows where, limited how fast. CW = knows how fast, doesn't know where.</b></div>
<div class="callout tip">Dumb saying: "CW <b>can't tell Where</b>; PW <b>can't go Fast</b>."</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>CW transducer with two crystals and an overlap region, beside a PW transducer with one crystal and a small sample gate</title>
<text x="30" y="30" fill="currentColor" font-size="17">CW: 2 crystals</text>
<rect x="30" y="44" width="26" height="34" fill="var(--c2)" stroke="currentColor" stroke-width="2"/>
<rect x="60" y="44" width="26" height="34" fill="var(--c1)" stroke="currentColor" stroke-width="2"/>
<polyline points="43,78 150,230" fill="none" stroke="var(--c2)" stroke-width="2"/>
<polyline points="73,78 200,230" fill="none" stroke="var(--c2)" stroke-width="2"/>
<polyline points="73,78 60,230" fill="none" stroke="var(--c1)" stroke-width="2"/>
<polyline points="103,78 110,230" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="120" y="130" fill="currentColor" font-size="16">overlap =</text>
<text x="120" y="152" fill="currentColor" font-size="16">everything here</text>
<text x="30" y="252" fill="currentColor" font-size="16">no depth info, never aliases</text>
<text x="330" y="30" fill="currentColor" font-size="17">PW: 1 crystal</text>
<rect x="400" y="44" width="30" height="34" fill="var(--c3)" stroke="currentColor" stroke-width="2"/>
<polyline points="404,78 380,230" fill="none" stroke="var(--c3)" stroke-width="2"/>
<polyline points="426,78 450,230" fill="none" stroke="var(--c3)" stroke-width="2"/>
<line x1="388" y1="150" x2="442" y2="150" stroke="var(--c4)" stroke-width="3"/>
<line x1="388" y1="178" x2="442" y2="178" stroke="var(--c4)" stroke-width="3"/>
<text x="460" y="170" fill="var(--c4)" font-size="16">sample gate</text>
<text x="330" y="252" fill="currentColor" font-size="16">knows depth, can alias</text>
</svg>`,
          caption: "CW listens to the whole overlap zone; PW listens only inside the gate you place."
        }
      ],
      sayIt: "Say out loud: how many crystals does CW have, what can it not do, and what is the one thing PW gives you that CW cannot?",
      keyPoints: [
        "CW = 2 crystals, continuous transmit and receive",
        "CW has no range resolution (range ambiguity) but never aliases",
        "CW measures very high velocities — best for tight stenoses and valve jets",
        "PW = 1 crystal, alternately transmits and listens",
        "PW has range resolution via an adjustable sample volume/gate",
        "PW aliases when the shift exceeds the Nyquist limit (PRF ÷ 2)"
      ]
    },

    {
      id: "u12-l5",
      title: "Nyquist limit, aliasing, and how to fix it",
      objectives: ["u12-o5"],
      html: `<p class="lead">Think of an old movie where the wagon wheel appears to spin backward. The camera is not sampling fast enough to keep up, so fast forward motion looks like slow reverse motion. PW Doppler does the same thing.</p>
<p>PW Doppler takes one sample of the flow per pulse, so the sampling rate is the <span class="kw">pulse repetition frequency (PRF)</span>. To reconstruct a signal you need at least two samples per cycle, so the highest shift that can be measured honestly is:</p>
<div class="formula">Nyquist limit = PRF ÷ 2</div>
<p>Exceed it and you get <span class="kw">aliasing</span>: the top of the waveform is chopped off and <b>wraps around</b> to the opposite side of the baseline, so a fast forward jet is drawn as reverse flow. In color Doppler the same thing happens as an abrupt color change in the middle of a vessel — red flipping straight to blue with no black gap between.</p>
<div class="callout key">Aliasing occurs when the Doppler shift is greater than <b>PRF ÷ 2</b>. It is a <b>PW-only</b> problem: CW Doppler never aliases.</div>
<p>Fixes, in the order you should reach for them:</p>
<ol>
<li><b>Raise the scale / PRF</b> — the direct fix; raises the Nyquist limit.</li>
<li><b>Shift the baseline</b> down (for forward flow) — doubles the display range in the direction you care about, without changing the PRF.</li>
<li><b>Lower the transmit (Doppler) frequency</b> — a smaller f₀ makes a smaller shift for the same velocity.</li>
<li><b>Decrease imaging depth</b> — shallower means shorter listening time, which lets the machine use a higher PRF.</li>
<li><b>Increase the Doppler angle</b> toward 90° — a bigger angle means a smaller cos θ and a smaller shift. Legitimate, but use last: it degrades accuracy.</li>
<li><b>Switch to CW</b> — no sampling, no aliasing, but you lose range resolution.</li>
</ol>
<div class="callout tip">Dumb saying: <b>SLAP the alias, then call in CW</b> — <b>S</b>cale up, <b>L</b>ower the baseline, <b>A</b>ngle bigger, <b>P</b>ick a lower frequency (and less depth), then <b>CW</b>.</div>
<div class="callout warn">Raising the <i>gain</i> does nothing for aliasing — gain changes brightness, not the sampling rate. That is the most common wrong answer on this topic.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 270" role="img"><title>An aliased spectral tracing with wrapped peaks beside a corrected tracing after raising the scale and lowering the baseline</title>
<text x="20" y="26" fill="currentColor" font-size="16">ALIASED</text>
<line x1="20" y1="70" x2="270" y2="70" stroke="var(--muted)" stroke-width="2"/>
<text x="228" y="62" fill="var(--muted)" font-size="14">baseline</text>
<polyline points="20,70 40,70 50,30 90,30 100,70 130,70 150,30 190,30 200,70 230,70 250,30 268,30" fill="none" stroke="var(--c2)" stroke-width="3"/>
<polyline points="52,124 60,100 88,100 96,124" fill="none" stroke="var(--c4)" stroke-width="3"/>
<polyline points="152,124 160,100 188,100 196,124" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="20" y="150" fill="var(--c4)" font-size="16">peaks wrap to the</text>
<text x="20" y="172" fill="var(--c4)" font-size="16">wrong side</text>
<text x="330" y="26" fill="currentColor" font-size="16">CORRECTED</text>
<line x1="330" y1="150" x2="580" y2="150" stroke="var(--muted)" stroke-width="2"/>
<text x="330" y="168" fill="var(--muted)" font-size="14">baseline moved down</text>
<polyline points="330,150 350,150 362,44 398,44 408,150 440,150 452,44 488,44 498,150 530,150 544,44 578,44" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="330" y="210" fill="currentColor" font-size="16">scale (PRF) raised</text>
<text x="20" y="236" fill="currentColor" font-size="17">Nyquist limit = PRF ÷ 2</text>
<text x="330" y="236" fill="currentColor" font-size="16">whole waveform fits</text>
</svg>`,
          caption: "Aliasing chops the peak off and wraps it below the baseline; raising the scale and dropping the baseline makes room for it."
        }
      ],
      sayIt: "Say out loud: what is the Nyquist limit, what exactly happens on the screen when you exceed it, and list five fixes.",
      keyPoints: [
        "Nyquist limit = PRF ÷ 2",
        "Aliasing occurs when the Doppler shift exceeds the Nyquist limit",
        "Aliased peaks wrap around to the opposite side of the baseline",
        "Color aliasing = abrupt red-to-blue change without passing through black",
        "Fixes: raise scale/PRF, lower the baseline, lower the transmit frequency",
        "More fixes: decrease depth, increase the angle toward 90°, switch to CW",
        "Increasing gain does NOT fix aliasing"
      ]
    },

    {
      id: "u12-l6",
      title: "Spectral analysis and the spectral display",
      objectives: ["u12-o6"],
      html: `<p class="lead">A Doppler signal is a chord, not a single note: thousands of cells at slightly different speeds arrive at once. Spectral analysis is what separates the chord into its notes.</p>
<p>The machine performs a <span class="kw">fast Fourier transform (FFT)</span> on the returning signal. The FFT takes a jumbled mixture of frequencies and reports how much of each frequency is present. Doing that many times per second builds the <span class="kw">spectral display</span> you see scrolling across the screen, used for both PW and CW Doppler.</p>
<table class="dt"><tr><th>Axis / feature</th><th>What it shows</th></tr>
<tr><td>Horizontal</td><td>Time (sweep speed is adjustable)</td></tr>
<tr><td>Vertical</td><td>Doppler shift in kHz, or velocity in cm/s once an angle is entered</td></tr>
<tr><td>Above / below baseline</td><td>Direction: toward / away (invertible by the sonographer)</td></tr>
<tr><td>Brightness of a dot</td><td>How many red cells are moving at that velocity at that moment</td></tr></table>
<div class="callout key">Vertical = how fast. Horizontal = when. Brightness = how many cells. Above or below the baseline = which way.</div>
<p><span class="kw">Spectral broadening</span> is a vertical thickening of the tracing — a wide range of velocities present at the same instant, which fills in the normally dark <b>spectral window</b> under the waveform. Its two big causes are very different:</p>
<ul>
<li><b>Real turbulence</b> — a true finding, typically just distal to a stenosis.</li>
<li><b>An operator artifact</b> — a sample volume so large it spans the whole vessel (catching slow wall layers along with the fast center), excessive Doppler gain, or a gate placed too close to the wall.</li>
</ul>
<div class="callout warn">Before you call spectral broadening pathologic, shrink the gate, center it in the lumen, and back off the gain. If the window clears, it was your settings, not the patient.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>A spectral display with time on the horizontal axis, velocity on the vertical axis, a baseline, a clear window, and a broadened waveform</title>
<line x1="70" y1="200" x2="580" y2="200" stroke="var(--muted)" stroke-width="2"/>
<line x1="70" y1="30" x2="70" y2="240" stroke="currentColor" stroke-width="2"/>
<text x="10" y="40" fill="currentColor" font-size="16">cm/s</text>
<text x="4" y="196" fill="currentColor" font-size="14">baseline</text>
<text x="470" y="234" fill="currentColor" font-size="16">time →</text>
<polyline points="80,200 96,60 112,96 128,132 150,160 176,178 200,186 214,200" fill="none" stroke="var(--c1)" stroke-width="3"/>
<polyline points="230,200 246,60 262,96 278,132 300,160 326,178 350,186 364,200" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="90" y="126" fill="var(--c1)" font-size="16">clear window</text>
<polyline points="400,200 416,60 432,96 448,132 470,160 496,178 520,186 534,200" fill="none" stroke="var(--c2)" stroke-width="3"/>
<polyline points="414,196 424,96 440,140 460,170 490,188 520,196" fill="none" stroke="var(--c2)" stroke-width="3"/>
<polyline points="418,190 432,120 452,160 478,182 506,192" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="396" y="46" fill="var(--c2)" font-size="16">broadened (window filled)</text>
</svg>`,
          caption: "Left: laminar flow with a clean window. Right: many velocities at once — spectral broadening."
        }
      ],
      sayIt: "Say out loud: what does the FFT do, what does each axis of the spectral display mean, and name two causes of spectral broadening.",
      keyPoints: [
        "Spectral analysis is done by fast Fourier transform (FFT)",
        "Used for both PW and CW Doppler",
        "Horizontal axis = time; vertical axis = Doppler shift or velocity",
        "Above/below baseline = direction toward/away",
        "Brightness = number of cells at that velocity",
        "Spectral broadening = many velocities at one instant, fills the window",
        "Causes: real turbulence, or an oversized gate / excess gain"
      ]
    },

    {
      id: "u12-l7",
      title: "The knobs: wall filter, gate, baseline, scale, gain",
      objectives: ["u12-o7"],
      html: `<p class="lead">Five controls do most of the damage and most of the rescuing in spectral Doppler. Know what each one changes and what it costs.</p>
<p><span class="kw">Wall filter</span> (also called the high-pass or thump filter): vessel walls and tissue move slowly but reflect strongly, producing low-frequency, high-amplitude <span class="kw-2">clutter</span> that would swamp the display. The wall filter deletes everything below a chosen frequency, typically <b>50–100 Hz</b>. Set it too high and you also delete real slow flow — low diastolic velocities, venous flow, and the flow in a nearly occluded vessel — which can turn a normal vein into a fake "no flow" result.</p>
<p><span class="kw">Sample volume (gate)</span>: the PW-only window that sets where and over what length you listen. Small gate centered in the lumen = the cleanest signal with a crisp spectral window. Large gate = more signal but spectral broadening and wall clutter. Gate length is set by the sonographer; gate <i>width</i> is roughly the beam width.</p>
<p><span class="kw">Baseline</span>: moves the zero-shift line up or down. It does not change how much velocity range exists, it just reallocates it to one direction. Free of cost, so it is often the first anti-aliasing move.</p>
<p><span class="kw">Scale (velocity range / PRF)</span>: sets the displayed velocity range by changing the PRF. Higher scale raises the Nyquist limit and cures aliasing, but it throws away sensitivity to slow flow. Too low a scale aliases; too high a scale hides slow venous flow.</p>
<p><span class="kw">Doppler gain</span>: amplifies the received signal. Too high adds noise and fake broadening; too low loses weak diastolic signal. Gain never changes the measured velocity.</p>
<div class="callout key">All five are <b>sonographer-controlled</b>. Only scale (PRF), angle, baseline, transmit frequency, depth, and switching to CW change aliasing — <b>gain does not</b>.</div>
<div class="callout tip">Dumb saying: "Wall filter too tall, slow flow falls." And: "Fat gate, fuzzy spectrum."</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Spectral display annotated with scale limits, baseline position, and the wall filter band removed around the baseline</title>
<line x1="60" y1="40" x2="580" y2="40" stroke="var(--c2)" stroke-width="2"/>
<text x="60" y="32" fill="var(--c2)" font-size="16">top of scale = Nyquist limit (PRF ÷ 2)</text>
<line x1="60" y1="150" x2="580" y2="150" stroke="var(--muted)" stroke-width="3"/>
<text x="470" y="142" fill="var(--muted)" font-size="16">baseline</text>
<rect x="60" y="138" width="400" height="24" fill="var(--c4)" stroke="none"/>
<text x="64" y="186" fill="var(--c4)" font-size="16">wall filter erases this band (≈ 50–100 Hz)</text>
<polyline points="70,150 90,56 108,90 126,116 148,134 174,144 196,150" fill="none" stroke="var(--c1)" stroke-width="3"/>
<polyline points="214,150 234,56 252,90 270,116 292,134 318,144 340,150" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="60" y1="230" x2="580" y2="230" stroke="var(--c2)" stroke-width="2"/>
<text x="60" y="222" fill="var(--c2)" font-size="16">bottom of scale</text>
<text x="360" y="212" fill="currentColor" font-size="16">raise scale → less aliasing,</text>
<text x="360" y="232" fill="currentColor" font-size="16">less slow-flow sensitivity</text>
</svg>`,
          caption: "Scale sets the ceiling, baseline decides how the range is split, wall filter deletes the slow band around zero."
        }
      ],
      sayIt: "Say out loud: what does the wall filter remove, what goes wrong if it is set too high, and what does a bigger sample volume do to the spectrum?",
      keyPoints: [
        "Wall filter removes low-frequency, high-amplitude clutter from moving walls",
        "Typical wall filter setting ≈ 50–100 Hz; too high erases real slow flow",
        "Sample volume/gate exists only in PW; small and centered gives the cleanest spectrum",
        "Large gate → spectral broadening and wall clutter",
        "Baseline reallocates the display range; it does not change the PRF",
        "Scale = PRF: higher scale fixes aliasing but loses slow-flow sensitivity",
        "Gain changes brightness only — never the measured velocity, never aliasing"
      ]
    },

    {
      id: "u12-l8",
      title: "Color Doppler",
      objectives: ["u12-o8", "u12-o7"],
      html: `<p class="lead">Color Doppler is a map, not a measurement: it paints a whole region with an estimate of which way blood is going and roughly how fast.</p>
<p>Instead of an FFT, color uses <span class="kw">autocorrelation</span> — a fast comparison of each pulse with the one before it. It is much quicker than an FFT, which is what makes real-time color possible, but it gives only a <b>mean velocity</b> and direction per pixel, not a full spectrum. If you want peak velocity, go back to the spectral display.</p>
<p>Key controls and their costs:</p>
<ul>
<li><b>Color box</b> — the region where color is computed. Bigger or deeper box = more lines to process = <b>lower frame rate</b>. Keep it small and steered off perpendicular.</li>
<li><b>Packet size (ensemble length)</b> — how many pulses are fired down each color line, typically around <b>3–20</b>. More pulses = more accurate velocity and better sensitivity to slow flow, but <b>lower frame rate</b>.</li>
<li><b>Color scale (PRF)</b> — same meaning as in PW. Too low and color aliases; too high and slow flow disappears.</li>
<li><b>Color map</b> — the reference bar beside the image. The common convention is <span class="kw-2">BART</span>: <b>B</b>lue <b>A</b>way, <b>R</b>ed <b>T</b>oward. This is a user-settable lookup table, not physics — always read the bar.</li>
<li><b>Variance mode</b> — adds green (or a second hue) where velocities within a pixel differ a lot, flagging turbulence.</li>
</ul>
<div class="callout key">Color Doppler = <b>autocorrelation</b>, <b>mean</b> velocity, direction, and it is <b>PW-based — so it aliases</b>. Color aliasing looks like red switching straight to blue mid-vessel without passing through black.</div>
<div class="callout warn">Color is just as angle-dependent as spectral Doppler. A vessel running exactly perpendicular to the beam fills in black even with brisk flow — steer the box or heel-toe the probe before you call it occluded.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>A steered color box over a vessel with a color bar showing red toward the transducer above the baseline and blue away below it</title>
<rect x="40" y="30" width="34" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="110,80 250,80 210,220 70,220 110,80" fill="none" stroke="var(--c3)" stroke-width="2"/>
<text x="118" y="70" fill="var(--c3)" font-size="16">steered color box</text>
<line x1="30" y1="130" x2="330" y2="130" stroke="currentColor" stroke-width="2"/>
<line x1="30" y1="178" x2="330" y2="178" stroke="currentColor" stroke-width="2"/>
<rect x="90" y="132" width="130" height="44" fill="var(--c4)" stroke="none"/>
<text x="240" y="160" fill="currentColor" font-size="16">vessel</text>
<rect x="430" y="40" width="46" height="70" fill="var(--c4)" stroke="currentColor" stroke-width="2"/>
<rect x="430" y="110" width="46" height="70" fill="var(--c1)" stroke="currentColor" stroke-width="2"/>
<text x="486" y="60" fill="currentColor" font-size="16">RED</text>
<text x="486" y="84" fill="currentColor" font-size="16">toward</text>
<text x="486" y="140" fill="currentColor" font-size="16">BLUE</text>
<text x="486" y="164" fill="currentColor" font-size="16">away</text>
<text x="398" y="204" fill="currentColor" font-size="16">color bar (BART)</text>
<text x="40" y="244" fill="currentColor" font-size="16">bigger box or bigger packet → lower frame rate</text>
</svg>`,
          caption: "Steer the box off perpendicular, keep it small, and always read the color bar rather than assuming."
        }
      ],
      sayIt: "Say out loud: what processing does color Doppler use, what single velocity does it report, and name two settings that lower the frame rate.",
      keyPoints: [
        "Color Doppler uses autocorrelation, not FFT — faster, less detailed",
        "It reports mean velocity and direction per pixel, not peak velocity",
        "Color is PW-based, so it aliases (red flips to blue with no black between)",
        "Bigger or deeper color box → lower frame rate",
        "Packet size / ensemble length ≈ 3–20 pulses; more = better color, lower frame rate",
        "BART = Blue Away, Red Toward — a user-settable map, read the bar",
        "Variance mode highlights turbulence",
        "Color is angle-dependent: perpendicular vessels show no color"
      ]
    },

    {
      id: "u12-l9",
      title: "Power Doppler, duplex, and triplex",
      objectives: ["u12-o9"],
      html: `<p class="lead">Power Doppler throws away the frequency information and keeps only the strength of the signal — and that one sacrifice buys a lot of sensitivity.</p>
<p><span class="kw">Power Doppler</span> (also called energy or amplitude Doppler) maps the <b>amplitude</b> of the Doppler signal: how much moving blood is there, not how fast or which way. Because it ignores the shift, it is free of most of the problems the shift creates.</p>
<table class="dt"><tr><th></th><th>Color Doppler</th><th>Power Doppler</th></tr>
<tr><td>Displays</td><td>Mean velocity + direction</td><td>Signal strength (amplitude)</td></tr>
<tr><td>Direction shown</td><td>Yes</td><td>No (conventional power Doppler)</td></tr>
<tr><td>Velocity shown</td><td>Yes (mean)</td><td>No</td></tr>
<tr><td>Aliasing</td><td>Yes</td><td>No</td></tr>
<tr><td>Angle dependence</td><td>Strong</td><td>Much less</td></tr>
<tr><td>Sensitivity to slow / weak flow</td><td>Moderate</td><td><b>High</b></td></tr>
<tr><td>Main weakness</td><td>Angle and aliasing</td><td><b>Flash artifact</b> from motion; low frame rate</td></tr></table>
<div class="callout key">Power Doppler: <b>no direction, no velocity, no aliasing, barely any angle dependence, very sensitive — but it flashes</b> when the patient or probe moves.</div>
<p>Use it to answer "is there <i>any</i> flow here?" — testicular or ovarian perfusion, a small renal cortical vessel, a suspected near-occlusion. Use color when you need direction, and spectral when you need a real number.</p>
<p>Finally, the combinations: <span class="kw">duplex</span> is two things at once — a real-time <b>2D image plus Doppler</b> (spectral or color). Adding both color and spectral to the 2D image is often called <span class="kw-2">triplex</span>. Every added mode steals pulses from the imaging frame, so <b>temporal resolution (frame rate) drops</b> as you stack modes.</p>
<div class="callout warn">Do not say power Doppler is "better." It is better at detecting flow and worse at characterizing it — it cannot tell you direction, speed, or whether a jet is turbulent.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>A vessel shown in color Doppler with two directions beside the same vessel in power Doppler shown as one uniform tone</title>
<text x="40" y="34" fill="currentColor" font-size="17">COLOR</text>
<line x1="30" y1="60" x2="270" y2="60" stroke="currentColor" stroke-width="2"/>
<line x1="30" y1="110" x2="270" y2="110" stroke="currentColor" stroke-width="2"/>
<rect x="34" y="62" width="110" height="46" fill="var(--c4)" stroke="none"/>
<rect x="150" y="62" width="116" height="46" fill="var(--c1)" stroke="none"/>
<text x="30" y="140" fill="currentColor" font-size="16">direction + mean velocity</text>
<text x="30" y="166" fill="currentColor" font-size="16">aliases, angle dependent</text>
<text x="360" y="34" fill="currentColor" font-size="17">POWER</text>
<line x1="330" y1="60" x2="570" y2="60" stroke="currentColor" stroke-width="2"/>
<line x1="330" y1="110" x2="570" y2="110" stroke="currentColor" stroke-width="2"/>
<rect x="334" y="62" width="232" height="46" fill="var(--c2)" stroke="none"/>
<text x="330" y="140" fill="currentColor" font-size="16">strength of signal only</text>
<text x="330" y="166" fill="currentColor" font-size="16">no aliasing, very sensitive</text>
<text x="330" y="192" fill="currentColor" font-size="16">flashes with motion</text>
<text x="30" y="220" fill="currentColor" font-size="16">duplex = 2D + Doppler · triplex = 2D + color + spectral → frame rate falls</text>
</svg>`,
          caption: "Color answers which way and how fast; power answers only whether blood is there — but answers it more sensitively."
        }
      ],
      sayIt: "Say out loud: three advantages of power Doppler, two things it cannot tell you, and its biggest artifact.",
      keyPoints: [
        "Power Doppler maps signal amplitude (how much moving blood), not the shift",
        "No direction and no velocity information (conventionally)",
        "No aliasing and much less angle dependence",
        "More sensitive to slow and weak flow than color Doppler",
        "Main weaknesses: flash artifact from motion and a low frame rate",
        "Duplex = 2D image + Doppler; triplex adds color and spectral together",
        "Stacking modes steals pulses and lowers temporal resolution"
      ]
    }
  ],

  mnemonics: [
    { saying: "Zero is the hero, ninety is nothing.", meaning: "cos 0° = 1 gives the biggest Doppler shift; cos 90° = 0 gives no shift at all.", lesson: "u12-l3" },
    { saying: "Sixty is a half — the machine only hears half the speed.", meaning: "cos 60° = 0.5, so at a 60° angle the measured shift is half of what you would get straight on. Sixty is the clinical ceiling.", lesson: "u12-l3" },
    { saying: "Two for the round trip.", meaning: "The 2 in Δf = 2 f v cos θ ÷ c is there because the sound is Doppler-shifted once going out to the moving cell and again coming back.", lesson: "u12-l2" },
    { saying: "Nyquist is nice — he only takes half.", meaning: "The Nyquist limit is PRF ÷ 2; a Doppler shift bigger than that aliases.", lesson: "u12-l5" },
    { saying: "SLAP the alias, then call in CW.", meaning: "Scale up, Lower the baseline, Angle bigger (toward 90°), Pick a lower transmit frequency (and less depth) — and if it still aliases, switch to CW.", lesson: "u12-l5" },
    { saying: "CW can't tell Where; PW can't go Fast.", meaning: "CW has no range resolution but never aliases; PW has a sample gate but is limited by the Nyquist limit.", lesson: "u12-l4" },
    { saying: "BART: Blue Away, Red Toward.", meaning: "The usual color map convention — but it is a user-settable lookup table, so always check the color bar.", lesson: "u12-l8" },
    { saying: "Fat gate, fuzzy spectrum.", meaning: "A sample volume that spans the whole vessel catches slow wall layers and fast center flow together, faking spectral broadening.", lesson: "u12-l6" },
    { saying: "Wall filter too tall, slow flow falls.", meaning: "The wall filter deletes low frequencies; set it too high and real slow flow (diastolic, venous, near-occlusive) disappears.", lesson: "u12-l7" },
    { saying: "Power has no direction and no speed limit.", meaning: "Power Doppler shows neither direction nor velocity, and because it ignores the shift it never aliases — but it flashes when anything moves.", lesson: "u12-l9" }
  ],

  formulas: [
    { name: "Doppler shift (definition)", expr: "Doppler shift = received frequency − transmitted frequency", units: "Hz or kHz", note: "Positive toward the transducer, negative away, zero at 90°." },
    { name: "Doppler equation", expr: "Δf = (2 × f₀ × v × cos θ) ÷ c", units: "Hz (f₀ in Hz, v in m/s, c = 1,540 m/s)", note: "The 2 is the round trip. Direct with f₀, v, and cos θ; inverse with c." },
    { name: "Doppler equation solved for velocity", expr: "v = (Δf × c) ÷ (2 × f₀ × cos θ)", units: "m/s", note: "This is what the machine computes using the angle you enter." },
    { name: "Doppler shift in kHz shortcut", expr: "Δf (kHz) = 2,000 × f₀(MHz) × v(m/s) × cos θ ÷ 1,540", units: "kHz", note: "Handy version for exam arithmetic with f₀ in MHz and v in m/s." },
    { name: "Nyquist limit", expr: "Nyquist limit = PRF ÷ 2", units: "Hz or kHz", note: "Shifts larger than this alias. PW only — CW never aliases." },
    { name: "Maximum velocity before aliasing", expr: "v(max) = (c × PRF) ÷ (4 × f₀ × cos θ)", units: "m/s", note: "Raise PRF or lower f₀ to raise the ceiling." },
    { name: "Cosine values to memorize", expr: "cos 0° = 1 · cos 30° = 0.87 · cos 45° = 0.71 · cos 60° = 0.5 · cos 90° = 0", units: "unitless", note: "The shift is proportional to these." }
  ],

  keyNumbers: [
    { fact: "Propagation speed used in the Doppler equation", value: "1,540 m/s in soft tissue" },
    { fact: "cos 0°", value: "1.00 (maximum shift, ideal angle)" },
    { fact: "cos 30°", value: "0.87" },
    { fact: "cos 45°", value: "0.71" },
    { fact: "cos 60°", value: "0.50 (half the shift)" },
    { fact: "cos 90°", value: "0 (no Doppler shift at all)" },
    { fact: "Clinically acceptable Doppler angle", value: "30°–60°; never more than 60°" },
    { fact: "Nyquist limit", value: "PRF ÷ 2" },
    { fact: "Typical clinical Doppler shifts", value: "a few hundred Hz to about 10 kHz (audible)" },
    { fact: "Audible frequency range", value: "20 Hz – 20 kHz" },
    { fact: "Typical Doppler transmit frequency", value: "2–10 MHz (lower for deep, fast flow)" },
    { fact: "Typical wall filter setting", value: "≈ 50–100 Hz" },
    { fact: "Typical packet size / ensemble length", value: "≈ 3–20 pulses per color line" },
    { fact: "Number of crystals: CW vs PW", value: "CW = 2, PW = 1" }
  ],

  flashcards: [
    { front: "Doppler effect", back: "Change in frequency caused by relative motion between source and receiver", lesson: "u12-l1" },
    { front: "Doppler shift", back: "Received frequency − transmitted frequency", lesson: "u12-l1" },
    { front: "Sign of the shift for flow toward the transducer", back: "Positive (received frequency is higher)", lesson: "u12-l1" },
    { front: "Sign of the shift for flow away from the transducer", back: "Negative (received frequency is lower)", lesson: "u12-l1" },
    { front: "Doppler shift at a 90° angle", back: "Zero — no shift no matter how fast the blood moves", lesson: "u12-l1" },
    { front: "Why can you hear Doppler signals?", back: "Clinical shifts fall in the audible range (roughly hundreds of Hz to ~10 kHz)", lesson: "u12-l1" },
    { front: "Doppler equation", back: "Δf = (2 × f₀ × v × cos θ) ÷ c, with c = 1,540 m/s", lesson: "u12-l2" },
    { front: "Why is there a 2 in the Doppler equation?", back: "Sound makes a round trip — shifted going out and coming back", lesson: "u12-l2" },
    { front: "Doppler equation solved for velocity", back: "v = (Δf × c) ÷ (2 × f₀ × cos θ)", lesson: "u12-l2" },
    { front: "Which Doppler variable does the machine measure, and which does it calculate?", back: "Measures the shift; calculates velocity from the angle you enter", lesson: "u12-l2" },
    { front: "Effect of raising transmit frequency on the Doppler shift", back: "Shift increases (direct relationship) — and aliases sooner", lesson: "u12-l2" },
    { front: "Doppler angle", back: "Angle between the sound beam and the direction of blood flow", lesson: "u12-l3" },
    { front: "cos 0° and cos 90°", back: "1 and 0 — best and worst Doppler angles", lesson: "u12-l3" },
    { front: "cos 60°", back: "0.5", lesson: "u12-l3" },
    { front: "cos 30° and cos 45°", back: "0.87 and 0.71", lesson: "u12-l3" },
    { front: "Clinically acceptable Doppler angle range", back: "30°–60°, never exceeding 60°", lesson: "u12-l3" },
    { front: "Why is 60° the limit?", back: "Cosine changes fastest near 90°, so angle errors cause large velocity errors", lesson: "u12-l3" },
    { front: "Number of crystals in a CW transducer", back: "Two — one transmits continuously, one receives continuously", lesson: "u12-l4" },
    { front: "Main disadvantage of CW Doppler", back: "No range resolution — range ambiguity", lesson: "u12-l4" },
    { front: "Main advantage of CW Doppler", back: "No aliasing; measures very high velocities", lesson: "u12-l4" },
    { front: "Main advantage of PW Doppler", back: "Range resolution — an adjustable sample volume at a chosen depth", lesson: "u12-l4" },
    { front: "Main disadvantage of PW Doppler", back: "Aliasing above the Nyquist limit", lesson: "u12-l4" },
    { front: "Nyquist limit", back: "PRF ÷ 2 — the largest shift PW Doppler can display correctly", lesson: "u12-l5" },
    { front: "What does aliasing look like on a spectral display?", back: "The top of the waveform is cut off and wraps below the baseline", lesson: "u12-l5" },
    { front: "What does aliasing look like in color Doppler?", back: "Abrupt red-to-blue change mid-vessel with no black in between", lesson: "u12-l5" },
    { front: "Six fixes for aliasing", back: "Raise scale/PRF, lower baseline, lower frequency, less depth, larger angle, switch to CW", lesson: "u12-l5" },
    { front: "Does increasing gain fix aliasing?", back: "No — gain changes brightness only", lesson: "u12-l5" },
    { front: "What processing builds the spectral display?", back: "Fast Fourier transform (FFT)", lesson: "u12-l6" },
    { front: "Spectral display: horizontal and vertical axes", back: "Horizontal = time; vertical = Doppler shift or velocity", lesson: "u12-l6" },
    { front: "What does brightness on a spectral display mean?", back: "How many red cells are moving at that velocity at that moment", lesson: "u12-l6" },
    { front: "Spectral broadening", back: "A wide range of velocities at one instant, filling the spectral window", lesson: "u12-l6" },
    { front: "Two causes of spectral broadening", back: "Real turbulence, or an oversized sample volume / excessive gain", lesson: "u12-l6" },
    { front: "Wall filter", back: "High-pass filter that removes low-frequency clutter from moving walls (≈ 50–100 Hz)", lesson: "u12-l7" },
    { front: "Problem with too high a wall filter", back: "Real slow flow (diastolic, venous) is erased — can fake an occlusion", lesson: "u12-l7" },
    { front: "Effect of a larger sample volume", back: "More signal but spectral broadening and wall clutter", lesson: "u12-l7" },
    { front: "What does moving the baseline do?", back: "Reallocates the displayed range to one direction; does not change PRF", lesson: "u12-l7" },
    { front: "Color Doppler processing method", back: "Autocorrelation — faster than FFT", lesson: "u12-l8" },
    { front: "What velocity does color Doppler display?", back: "Mean velocity per pixel, plus direction", lesson: "u12-l8" },
    { front: "BART", back: "Blue Away, Red Toward — the usual (settable) color map", lesson: "u12-l8" },
    { front: "Packet size / ensemble length", back: "Pulses per color line (≈ 3–20); more = better color, lower frame rate", lesson: "u12-l8" },
    { front: "Two color settings that lower frame rate", back: "Larger/deeper color box and larger packet size", lesson: "u12-l8" },
    { front: "Color variance mode", back: "Adds a second hue where velocities differ widely — flags turbulence", lesson: "u12-l8" },
    { front: "Power Doppler displays what?", back: "Amplitude (strength) of the Doppler signal — how much moving blood", lesson: "u12-l9" },
    { front: "Three advantages of power Doppler", back: "No aliasing, minimal angle dependence, high sensitivity to slow flow", lesson: "u12-l9" },
    { front: "Two things power Doppler cannot tell you", back: "Direction and velocity", lesson: "u12-l9" },
    { front: "Biggest artifact of power Doppler", back: "Flash artifact from patient or probe motion", lesson: "u12-l9" },
    { front: "Duplex imaging", back: "Real-time 2D image plus Doppler at the same time", lesson: "u12-l9" }
  ],

  questions: [
    { id: "u12-q1", type: "mc", q: "Blood is flowing toward the transducer. The frequency of the returning echo compared with the transmitted frequency is:", choices: ["Lower, so the shift is negative", "Higher, so the shift is positive", "The same, so the shift is zero", "Higher, so the shift is negative"], answer: 1, explain: "Motion toward the probe compresses the returning wave, raising its frequency and giving a positive shift. The trap is mixing the sign up with the direction — 'away' is the one that lowers frequency.", objectives: ["u12-o1"], lesson: "u12-l1", level: 1 },
    { id: "u12-q2", type: "short", q: "Doppler shift equals received frequency minus what?", answer: "transmitted frequency", accept: ["transmitted frequency", "transmit frequency", "the transmitted frequency", "operating frequency", "emitted frequency"], explain: "Doppler shift = received − transmitted. In diagnostic work this difference is tiny compared with the transmit frequency, which is why it lands in the audible range.", objectives: ["u12-o1"], lesson: "u12-l1", level: 1 },
    { id: "u12-q3", type: "tf", q: "A stationary reflector produces a Doppler shift of zero.", answer: true, explain: "True. The Doppler effect depends on relative motion; with no motion along the beam there is no frequency change. Blood crossing the beam at exactly 90° gives zero for the same reason.", objectives: ["u12-o1"], lesson: "u12-l1", level: 1 },
    { id: "u12-q4", type: "mc", q: "Typical diagnostic Doppler shifts fall into which range?", choices: ["2–10 MHz", "A few hundred Hz to about 10 kHz", "20–40 MHz", "Less than 1 Hz"], answer: 1, explain: "Shifts are audible — a few hundred Hz to roughly 10 kHz. The 2–10 MHz choice is the transmitted frequency, not the shift; the shift is a tiny fraction of it.", objectives: ["u12-o1"], lesson: "u12-l1", level: 2 },
    { id: "u12-q5", type: "mc", q: "Which change would double the Doppler shift, everything else constant?", choices: ["Doubling the blood velocity", "Doubling the propagation speed", "Doubling the angle from 30° to 60°", "Doubling the depth"], answer: 0, explain: "Velocity is directly proportional to the shift. Doubling propagation speed would halve it (c is in the denominator), and going from 30° to 60° reduces cos θ from 0.87 to 0.5, which shrinks the shift.", objectives: ["u12-o2"], lesson: "u12-l2", level: 2 },
    { id: "u12-q6", type: "short", q: "What propagation speed is used in the Doppler equation for soft tissue?", answer: "1540 m/s", accept: ["1540", "1540 m/s", "1,540 m/s", "1.54 mm/us", "1540 meters per second"], explain: "1,540 m/s, the standard soft-tissue average. It sits in the denominator of the Doppler equation and is essentially fixed by the medium, not by the sonographer.", objectives: ["u12-o2"], lesson: "u12-l2", level: 1 },
    { id: "u12-q7", type: "mc", q: "A 4 MHz probe insonates blood at 1 m/s with a 0° angle. Approximately what Doppler shift results?", choices: ["0.52 kHz", "5.2 kHz", "52 kHz", "5.2 MHz"], answer: 1, explain: "Δf = 2 × 4,000,000 × 1 × 1 ÷ 1,540 ≈ 5,195 Hz ≈ 5.2 kHz. The 52 kHz and 5.2 MHz answers are decimal-place errors — remember the answer must land in the audible range.", objectives: ["u12-o2"], lesson: "u12-l2", level: 3 },
    { id: "u12-q8", type: "tf", q: "The factor of 2 in the Doppler equation exists because the sound is shifted both on the way to the reflector and on the way back.", answer: true, explain: "True. The moving cell first receives a shifted frequency, then re-radiates it as a moving source, so the effect is applied twice — hence the round-trip 2.", objectives: ["u12-o2"], lesson: "u12-l2", level: 2 },
    { id: "u12-q9", type: "mc", q: "Which Doppler angle produces the largest Doppler shift for a given velocity?", choices: ["0°", "45°", "60°", "90°"], answer: 0, explain: "cos 0° = 1, the maximum. 90° is the trap for anyone who confuses 'perpendicular to the vessel' (good for a 2D image) with 'good for Doppler' — at 90° cos θ = 0 and there is no shift at all.", objectives: ["u12-o3"], lesson: "u12-l3", level: 1 },
    { id: "u12-q10", type: "short", q: "What is the value of cos 60°?", answer: "0.5", accept: ["0.5", ".5", "0.50", "one half", "1/2", "half"], explain: "cos 60° = 0.5, so a 60° angle yields only half the shift of a 0° angle. It is the standard clinical ceiling because accuracy degrades quickly beyond it.", objectives: ["u12-o3"], lesson: "u12-l3", level: 1 },
    { id: "u12-q11", type: "mc", q: "Why is 60° usually given as the maximum acceptable Doppler angle?", choices: ["Above 60° the machine cannot compute cosine", "Cosine changes rapidly near 90°, so small angle errors cause large velocity errors", "Above 60° the shift becomes negative", "Above 60° aliasing is guaranteed", ], answer: 1, explain: "The cosine curve steepens toward 90°, so the same few degrees of cursor error translate into a much bigger percentage velocity error. The shift never becomes negative from the angle alone — direction does that.", objectives: ["u12-o3"], lesson: "u12-l3", level: 3 },
    { id: "u12-q12", type: "tf", q: "A vessel imaged at exactly 90° to the beam will show no Doppler shift even if blood is moving quickly.", answer: true, explain: "True, and it is a classic pitfall: a perpendicular vessel can look occluded on color. Steer the box or heel-toe the probe before concluding there is no flow.", objectives: ["u12-o3"], lesson: "u12-l3", level: 2 },
    { id: "u12-q13", type: "mc", q: "A CW Doppler transducer contains:", choices: ["One crystal that alternately sends and listens", "Two crystals, one sending and one receiving continuously", "One crystal with a matching layer only", "An array of 128 crystals"], answer: 1, explain: "CW needs one element transmitting without pause and another receiving without pause. The single alternating crystal describes PW, which is exactly why PW can time echoes and CW cannot.", objectives: ["u12-o4"], lesson: "u12-l4", level: 1 },
    { id: "u12-q14", type: "mc", q: "Which is TRUE of continuous wave Doppler?", choices: ["It has excellent range resolution", "It aliases at high velocities", "It has range ambiguity but never aliases", "It uses a sample volume placed at a chosen depth"], answer: 2, explain: "CW cannot time an echo, so it cannot say where the signal came from (range ambiguity), but with no sampling there is no Nyquist limit. The sample volume belongs to PW.", objectives: ["u12-o4"], lesson: "u12-l4", level: 2 },
    { id: "u12-q15", type: "short", q: "Which Doppler mode should you choose to measure a very high-velocity jet without aliasing?", answer: "continuous wave", accept: ["continuous wave", "cw", "cw doppler", "continuous wave doppler"], explain: "CW, because it never aliases. You give up depth information, but for a known jet whose depth you can identify on the image, that trade is worth it.", objectives: ["u12-o4"], lesson: "u12-l4", level: 2 },
    { id: "u12-q16", type: "mc", q: "The main advantage of PW Doppler over CW Doppler is:", choices: ["Higher maximum measurable velocity", "Range resolution — flow can be sampled at a chosen depth", "Immunity to aliasing", "It needs no angle correction"], answer: 1, explain: "PW's gate tells you exactly where the signal comes from. The other three describe CW or are simply false — every Doppler mode is angle dependent.", objectives: ["u12-o4"], lesson: "u12-l4", level: 2 },
    { id: "u12-q17", type: "mc", q: "PRF is 8 kHz. What is the Nyquist limit?", choices: ["2 kHz", "4 kHz", "8 kHz", "16 kHz"], answer: 1, explain: "Nyquist = PRF ÷ 2 = 4 kHz. The 16 kHz answer comes from multiplying by 2 instead of dividing — remember the sampling theorem takes half, it does not give double.", objectives: ["u12-o5"], lesson: "u12-l5", level: 2 },
    { id: "u12-q18", type: "tf", q: "Aliasing can occur with continuous wave Doppler if the velocity is high enough.", answer: false, explain: "False. Aliasing is a sampling problem and CW never samples — it listens continuously. Only PW-based modes (spectral PW and color Doppler) alias.", objectives: ["u12-o5", "u12-o4"], lesson: "u12-l5", level: 2 },
    { id: "u12-q19", type: "mc", q: "Which control will NOT help eliminate aliasing?", choices: ["Increasing the scale (PRF)", "Lowering the baseline", "Increasing the Doppler gain", "Selecting a lower transmit frequency"], answer: 2, explain: "Gain only amplifies what was already sampled — it changes brightness, not the Nyquist limit. The other three all either raise the limit or shrink the shift.", objectives: ["u12-o5", "u12-o7"], lesson: "u12-l5", level: 2 },
    { id: "u12-q20", type: "mc", q: "A spectral tracing shows systolic peaks cut off at the top of the display and reappearing below the baseline. The first, best correction is to:", choices: ["Increase the scale (PRF) and lower the baseline", "Increase the Doppler gain", "Decrease the sample volume size", "Increase the wall filter"], answer: 0, explain: "That wrap-around is textbook aliasing, and raising the scale plus dropping the baseline directly makes room for the peak. Shrinking the gate cleans up broadening, not aliasing, and raising the wall filter would erase low velocities.", objectives: ["u12-o5"], lesson: "u12-l5", level: 3 },
    { id: "u12-q21", type: "short", q: "Aliasing occurs when the Doppler shift exceeds what limit?", answer: "Nyquist limit", accept: ["nyquist", "nyquist limit", "prf/2", "prf divided by 2", "half the prf"], explain: "The Nyquist limit, equal to PRF ÷ 2. Below it the samples describe the signal honestly; above it the machine reconstructs a slower, wrong-direction waveform.", objectives: ["u12-o5"], lesson: "u12-l5", level: 1 },
    { id: "u12-q22", type: "mc", q: "Increasing the imaging depth in PW Doppler makes aliasing:", choices: ["Less likely, because PRF rises", "More likely, because PRF must fall", "Unchanged, because depth and PRF are unrelated", "Less likely, because the shift falls"], answer: 1, explain: "Deeper imaging means longer listening time per pulse, so the machine must lower the PRF, which lowers the Nyquist limit and invites aliasing. That is why decreasing depth is a legitimate anti-aliasing move.", objectives: ["u12-o5"], lesson: "u12-l5", level: 3 },
    { id: "u12-q23", type: "short", q: "What mathematical process creates the spectral Doppler display?", answer: "fast Fourier transform", accept: ["fft", "fast fourier transform", "fourier transform", "spectral analysis by fft"], explain: "The fast Fourier transform separates the mixed returning signal into its component frequencies. Autocorrelation is the different, faster process used for color Doppler.", objectives: ["u12-o6"], lesson: "u12-l6", level: 1 },
    { id: "u12-q24", type: "mc", q: "On a spectral Doppler display, what does the brightness of a point represent?", choices: ["The direction of flow", "The depth of the sample volume", "The number of red cells moving at that velocity", "The transmit frequency"], answer: 2, explain: "Brightness is an amplitude measure: how many scatterers share that velocity at that instant. Direction is shown by which side of the baseline the point falls on.", objectives: ["u12-o6"], lesson: "u12-l6", level: 2 },
    { id: "u12-q25", type: "mc", q: "The vertical axis of the spectral display represents:", choices: ["Time", "Doppler shift or velocity", "Depth", "Signal amplitude"], answer: 1, explain: "Vertical = how fast (shift in kHz, or velocity in cm/s once you angle-correct). Time runs horizontally and amplitude is shown as brightness.", objectives: ["u12-o6"], lesson: "u12-l6", level: 1 },
    { id: "u12-q26", type: "tf", q: "Spectral broadening always indicates disease.", answer: false, explain: "False. Turbulence causes it, but so does a sample volume that spans the vessel or too much Doppler gain. Shrink and center the gate and reduce gain before calling it pathologic.", objectives: ["u12-o6"], lesson: "u12-l6", level: 2 },
    { id: "u12-q27", type: "mc", q: "The wall filter is set too high. What is the likely consequence?", choices: ["Aliasing appears", "Low-velocity flow such as venous or diastolic flow disappears", "The measured peak velocity increases", "Spectral broadening increases"], answer: 1, explain: "The wall filter deletes low frequencies, so an aggressive setting removes real slow flow and can imitate an occlusion. It does not change peak velocity or affect the Nyquist limit.", objectives: ["u12-o7"], lesson: "u12-l7", level: 3 },
    { id: "u12-q28", type: "short", q: "Which control removes low-frequency clutter from moving vessel walls?", answer: "wall filter", accept: ["wall filter", "wall filter (high pass)", "high pass filter", "thump filter"], explain: "The wall filter, a high-pass filter typically set near 50–100 Hz. It is sonographer-controlled, and setting it too high erases genuine slow flow.", objectives: ["u12-o7"], lesson: "u12-l7", level: 1 },
    { id: "u12-q29", type: "mc", q: "Enlarging the PW sample volume until it spans the entire vessel will:", choices: ["Sharpen the spectral window", "Cause spectral broadening and more wall clutter", "Eliminate aliasing", "Increase the Nyquist limit"], answer: 1, explain: "A big gate collects slow near-wall layers along with the fast center, so many velocities appear at once and the window fills in. Gate size has nothing to do with the Nyquist limit, which is set by PRF.", objectives: ["u12-o7", "u12-o6"], lesson: "u12-l7", level: 2 },
    { id: "u12-q30", type: "tf", q: "Moving the baseline changes the pulse repetition frequency.", answer: false, explain: "False. The baseline only reallocates the existing display range between forward and reverse. The scale control is the one that changes PRF and therefore the Nyquist limit.", objectives: ["u12-o7"], lesson: "u12-l7", level: 2 },
    { id: "u12-q31", type: "mc", q: "Color Doppler processes its signal using:", choices: ["Fast Fourier transform", "Autocorrelation", "Demodulation", "Compression"], answer: 1, explain: "Autocorrelation compares each pulse with the previous one — fast enough for real time, but it yields only a mean velocity. FFT is reserved for the spectral display, where the full velocity distribution matters.", objectives: ["u12-o8"], lesson: "u12-l8", level: 1 },
    { id: "u12-q32", type: "mc", q: "What velocity information does color Doppler display in each pixel?", choices: ["Peak velocity", "Mean velocity", "Minimum velocity", "Acceleration"], answer: 1, explain: "Autocorrelation yields a mean. If you need a peak systolic velocity for a stenosis ratio, you must place a spectral gate — reading peaks off the color map is a common error.", objectives: ["u12-o8"], lesson: "u12-l8", level: 2 },
    { id: "u12-q33", type: "mc", q: "Increasing the packet size (ensemble length) in color Doppler:", choices: ["Improves color accuracy and sensitivity but lowers frame rate", "Improves color accuracy and raises frame rate", "Has no effect on frame rate", "Eliminates color aliasing"], answer: 0, explain: "More pulses per color line means a better velocity estimate and better slow-flow sensitivity, but each line takes longer, so temporal resolution suffers. Only raising the scale addresses color aliasing.", objectives: ["u12-o8"], lesson: "u12-l8", level: 3 },
    { id: "u12-q34", type: "short", q: "What does the mnemonic BART stand for in color Doppler?", answer: "blue away red toward", accept: ["blue away red toward", "blue away, red toward", "blue = away, red = toward", "blue away red towards"], explain: "Blue Away, Red Toward. It is only the default lookup table, though — the map is user-settable, so read the color bar on each image rather than trusting the habit.", objectives: ["u12-o8"], lesson: "u12-l8", level: 1 },
    { id: "u12-q35", type: "tf", q: "Enlarging the color box lowers the frame rate.", answer: true, explain: "True. A wider or deeper box means more color lines to interrogate per frame, and each line takes multiple pulses, so temporal resolution drops. Keep the box only as big as the question requires.", objectives: ["u12-o8"], lesson: "u12-l8", level: 2 },
    { id: "u12-q36", type: "mc", q: "A color image shows red changing abruptly to blue in the center of a vessel with no black band between. This is:", choices: ["Normal bidirectional flow", "Aliasing", "Flash artifact", "Variance from turbulence only"], answer: 1, explain: "True flow reversal passes through zero velocity, which renders black; an instant red-to-blue jump means the velocities wrapped past the Nyquist limit. Raise the color scale to confirm.", objectives: ["u12-o8", "u12-o5"], lesson: "u12-l8", level: 3 },
    { id: "u12-q37", type: "mc", q: "Which is an advantage of power Doppler over color Doppler?", choices: ["It displays direction of flow", "It displays peak velocity", "It is more sensitive to slow flow and does not alias", "It has a higher frame rate"], answer: 2, explain: "Power Doppler maps signal amplitude, so it detects weak, slow flow well and has no Nyquist limit. It gives up direction and velocity entirely, and its frame rate is typically lower, not higher.", objectives: ["u12-o9"], lesson: "u12-l9", level: 2 },
    { id: "u12-q38", type: "short", q: "What artifact is power Doppler especially prone to?", answer: "flash artifact", accept: ["flash", "flash artifact", "motion flash", "flash from motion"], explain: "Flash artifact: because power Doppler is so sensitive to any motion, patient or probe movement paints a burst of color across the image. Holding still and using a short-lived frame average reduce it.", objectives: ["u12-o9"], lesson: "u12-l9", level: 2 },
    { id: "u12-q39", type: "mc", q: "Conventional power Doppler displays which quantity?", choices: ["Direction of flow", "Mean velocity", "Amplitude (strength) of the Doppler signal", "Peak systolic velocity"], answer: 2, explain: "Power Doppler maps how much signal is coming back, not what the shift was. Because it discards the shift itself, it cannot show direction or any velocity — which is exactly why it never aliases and is barely angle dependent.", objectives: ["u12-o9"], lesson: "u12-l9", level: 2 },
    { id: "u12-q40", type: "mc", q: "Duplex imaging means:", choices: ["Two transducers scanning at once", "A real-time 2D image combined with Doppler", "Two focal zones in one frame", "Transmitting two frequencies at once"], answer: 1, explain: "Duplex = 2D imaging plus Doppler simultaneously; adding both color and spectral is often called triplex. Every added mode consumes pulses, so the frame rate falls.", objectives: ["u12-o9"], lesson: "u12-l9", level: 1 }
  ],

  drills: [
    {
      id: "u12-d1",
      title: "Doppler shift from velocity, frequency, and angle",
      formula: "Δf = 2 × f₀ × v × cos θ ÷ c   (c = 1,540 m/s)",
      lesson: "u12-l2",
      gen: function (rnd) {
        var f = [2, 3, 4, 5, 7.5, 10][Math.floor(rnd() * 6)];
        var vcm = [20, 30, 40, 50, 60, 80, 100, 120][Math.floor(rnd() * 8)];
        var angs = [{ d: 0, c: 1 }, { d: 30, c: 0.87 }, { d: 45, c: 0.71 }, { d: 60, c: 0.5 }];
        var a = angs[Math.floor(rnd() * 4)];
        var v = vcm / 100;
        var khz = 2000 * f * v * a.c / 1540;
        return {
          kind: "number",
          given: "Transmit frequency = " + f + " MHz, blood velocity = " + vcm + " cm/s (" + v + " m/s), Doppler angle = " + a.d + "° (cos = " + a.c + ")",
          ask: "What is the Doppler shift, in kHz?",
          answer: +khz.toFixed(3),
          unit: "kHz",
          tol: 0.05,
          steps: [
            "Δf = 2 × f₀ × v × cos θ ÷ c",
            "= 2 × " + f + " MHz × " + v + " m/s × " + a.c + " ÷ 1540 m/s",
            "In kHz: Δf = 2000 × " + f + " × " + v + " × " + a.c + " ÷ 1540",
            "= " + khz.toFixed(2) + " kHz (audible — as it should be)"
          ]
        };
      }
    },
    {
      id: "u12-d2",
      title: "Velocity from a measured Doppler shift",
      formula: "v = Δf × c ÷ (2 × f₀ × cos θ)",
      lesson: "u12-l2",
      gen: function (rnd) {
        var f = [2, 3, 4, 5, 7.5][Math.floor(rnd() * 5)];
        var shift = [1, 1.5, 2, 2.5, 3, 4, 5][Math.floor(rnd() * 7)];
        var angs = [{ d: 0, c: 1 }, { d: 30, c: 0.87 }, { d: 60, c: 0.5 }];
        var a = angs[Math.floor(rnd() * 3)];
        var v = shift * 1540 / (2000 * f * a.c);
        var vcm = v * 100;
        return {
          kind: "number",
          given: "Measured Doppler shift = " + shift + " kHz, transmit frequency = " + f + " MHz, angle = " + a.d + "° (cos = " + a.c + ")",
          ask: "What is the blood velocity, in cm/s?",
          answer: +vcm.toFixed(2),
          unit: "cm/s",
          tol: 1.5,
          steps: [
            "v = Δf × c ÷ (2 × f₀ × cos θ)",
            "With Δf in kHz and f₀ in MHz: v (m/s) = " + shift + " × 1540 ÷ (2000 × " + f + " × " + a.c + ")",
            "= " + v.toFixed(3) + " m/s",
            "× 100 = " + vcm.toFixed(1) + " cm/s"
          ]
        };
      }
    },
    {
      id: "u12-d3",
      title: "Nyquist limit from PRF",
      formula: "Nyquist limit = PRF ÷ 2",
      lesson: "u12-l5",
      gen: function (rnd) {
        var prf = [4, 5, 6, 8, 10, 12, 15, 16, 20][Math.floor(rnd() * 9)];
        return {
          kind: "number",
          given: "Pulse repetition frequency = " + prf + " kHz",
          ask: "What is the Nyquist limit, in kHz?",
          answer: +(prf / 2).toFixed(2),
          unit: "kHz",
          tol: 0.05,
          steps: [
            "Nyquist limit = PRF ÷ 2",
            "= " + prf + " ÷ 2",
            "= " + (prf / 2) + " kHz — any shift above this aliases"
          ]
        };
      }
    },
    {
      id: "u12-d4",
      title: "Will this signal alias?",
      formula: "alias if Doppler shift > PRF ÷ 2",
      lesson: "u12-l5",
      gen: function (rnd) {
        var prf = [4, 6, 8, 10, 12, 16][Math.floor(rnd() * 6)];
        var nyq = prf / 2;
        var shifts = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 9, 11];
        var sh = shifts[Math.floor(rnd() * shifts.length)];
        var alias = sh > nyq;
        return {
          kind: "choice",
          given: "PRF = " + prf + " kHz and the Doppler shift is " + sh + " kHz.",
          ask: "Will this signal alias?",
          choices: ["Yes, it aliases", "No, it displays correctly"],
          answer: alias ? 0 : 1,
          steps: [
            "Nyquist limit = PRF ÷ 2 = " + prf + " ÷ 2 = " + nyq + " kHz",
            "Shift of " + sh + " kHz is " + (alias ? "greater than" : "not greater than") + " " + nyq + " kHz",
            alias ? "So it aliases — raise the scale, drop the baseline, or go CW" : "So it displays correctly, no aliasing"
          ]
        };
      }
    },
    {
      id: "u12-d5",
      title: "Cosine values you must know",
      formula: "cos 0° = 1 · cos 30° = 0.87 · cos 45° = 0.71 · cos 60° = 0.5 · cos 90° = 0",
      lesson: "u12-l3",
      gen: function (rnd) {
        var list = [
          { d: 0, c: 1, note: "parallel to flow — the ideal angle, full shift" },
          { d: 30, c: 0.87, note: "87 % of the maximum shift — well inside the clinical window" },
          { d: 45, c: 0.71, note: "71 % of the maximum shift" },
          { d: 60, c: 0.5, note: "exactly half the shift — the clinical ceiling" },
          { d: 90, c: 0, note: "perpendicular — no shift at all, the vessel looks empty" }
        ];
        var a = list[Math.floor(rnd() * 5)];
        return {
          kind: "number",
          given: "Doppler angle = " + a.d + "°",
          ask: "What is cos θ (two decimal places)?",
          answer: a.c,
          unit: "",
          tol: 0.02,
          steps: [
            "cos " + a.d + "° = " + a.c,
            a.note,
            "The Doppler shift is directly proportional to cos θ"
          ]
        };
      }
    },
    {
      id: "u12-d6",
      title: "Angle error: which way does the velocity go wrong?",
      formula: "v = Δf × c ÷ (2 × f₀ × cos θ)",
      lesson: "u12-l3",
      gen: function (rnd) {
        var cases = [
          { g: "The true angle is 60° but you set the cursor to 30°.", a: 0, why: "You told the machine cos = 0.87 when the truth is 0.50. A larger cos in the denominator gives a smaller calculated velocity, so the reported value is too LOW." },
          { g: "The true angle is 30° but you set the cursor to 60°.", a: 1, why: "You told the machine cos = 0.50 when the truth is 0.87. A smaller cos in the denominator inflates the answer, so the reported value is too HIGH." },
          { g: "You steer to make the angle closer to 0° and correct the cursor properly.", a: 2, why: "A correctly entered angle gives the correct velocity at any angle — a smaller angle just makes the measurement more forgiving of error." },
          { g: "You keep the angle at 70° instead of bringing it under 60°, cursor set correctly.", a: 2, why: "The calculated velocity is still nominally correct, but near 90° the cosine curve is steep, so any small cursor error now produces a large velocity error." },
          { g: "The vessel runs exactly perpendicular to the beam (90°).", a: 3, why: "cos 90° = 0, so there is no shift at all and no velocity can be measured — the vessel may look occluded." }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return {
          kind: "choice",
          given: c.g,
          ask: "What happens to the velocity the machine reports?",
          choices: ["Reported velocity is too low", "Reported velocity is too high", "Reported velocity is correct", "No velocity can be measured"],
          answer: c.a,
          steps: ["v = Δf × c ÷ (2 × f₀ × cos θ) — cos θ is in the denominator", c.why]
        };
      }
    },
    {
      id: "u12-d7",
      title: "Which fix for aliasing?",
      formula: "SLAP the alias, then call in CW",
      lesson: "u12-l5",
      gen: function (rnd) {
        var opts = [
          { t: "Increase the scale (raise the PRF)", ok: true, why: "Raising the PRF raises the Nyquist limit (PRF ÷ 2), which is the direct fix." },
          { t: "Lower the baseline", ok: true, why: "Shifting the baseline gives the whole display range to the forward direction — free, no PRF change." },
          { t: "Select a lower transmit frequency", ok: true, why: "A smaller f₀ produces a smaller shift for the same velocity, so it stays under the Nyquist limit." },
          { t: "Decrease the imaging depth", ok: true, why: "Shallower imaging shortens listening time, allowing a higher PRF and a higher Nyquist limit." },
          { t: "Increase the Doppler angle toward 90°", ok: true, why: "A larger angle means a smaller cos θ and a smaller shift — valid, but it costs accuracy, so use it late." },
          { t: "Switch to CW Doppler", ok: true, why: "CW never samples, so it never aliases — at the cost of range resolution." },
          { t: "Increase the Doppler gain", ok: false, why: "Gain changes brightness only. It cannot change the sampling rate or the shift." },
          { t: "Increase the sample volume size", ok: false, why: "A bigger gate causes spectral broadening and clutter; it does nothing to the Nyquist limit." },
          { t: "Raise the wall filter", ok: false, why: "The wall filter removes LOW frequencies, which is the opposite end of the problem — it erases slow flow instead." },
          { t: "Increase the imaging depth", ok: false, why: "Deeper imaging forces a LOWER PRF, which lowers the Nyquist limit and makes aliasing worse." },
          { t: "Select a higher transmit frequency", ok: false, why: "A higher f₀ makes a BIGGER shift for the same velocity, so aliasing gets worse." },
          { t: "Increase the color box size", ok: false, why: "That lowers the frame rate; it does not touch the Nyquist limit." }
        ];
        var good = opts.filter(function (o) { return o.ok; });
        var bad = opts.filter(function (o) { return !o.ok; });
        var right = good[Math.floor(rnd() * good.length)];
        var picks = [];
        var pool = bad.slice();
        for (var i = 0; i < 3; i++) {
          var k = Math.floor(rnd() * pool.length);
          picks.push(pool[k]);
          pool.splice(k, 1);
        }
        var all = picks.slice();
        var slot = Math.floor(rnd() * 4);
        all.splice(slot, 0, right);
        var scenes = [
          "A PW spectral tracing of a carotid is aliasing: the systolic peaks wrap around below the baseline.",
          "Color in a renal artery shows red flipping straight to blue with no black band — color aliasing.",
          "A PW tracing at 6 cm depth aliases through most of systole.",
          "The peak of a femoral artery waveform is chopped off at the top of the scale and reappears at the bottom.",
          "A PW gate in a stenotic jet shows wrap-around; the shift is clearly above the Nyquist limit.",
          "Color box over a vertebral artery mosaics into the wrong color at peak systole."
        ];
        var scene = scenes[Math.floor(rnd() * scenes.length)];
        return {
          kind: "choice",
          given: scene,
          ask: "Which one of these will actually correct the aliasing?",
          choices: all.map(function (o) { return o.t; }),
          answer: slot,
          steps: [
            "Correct answer: " + right.t,
            right.why,
            "Remember SLAP: Scale up, Lower the baseline, Angle bigger, Pick a lower frequency (and less depth) — then CW."
          ]
        };
      }
    }
  ],

  whiteboard: [
    {
      id: "u12-w1",
      prompt: "Write the Doppler equation, define every symbol with units, say who controls each one, and work one example from memory.",
      keyPoints: [
        "Δf = (2 × f₀ × v × cos θ) ÷ c",
        "Δf = Doppler shift = received − transmitted, in Hz or kHz",
        "The 2 is the round trip — shifted going out and coming back",
        "f₀ = transmit frequency, 2–10 MHz, chosen by the sonographer",
        "v = blood velocity, patient-determined",
        "cos θ = angle factor, sonographer-determined",
        "c = 1,540 m/s in soft tissue, medium-determined, essentially fixed",
        "Solved for velocity: v = Δf × c ÷ (2 × f₀ × cos θ)",
        "Positive shift = toward the transducer; negative = away",
        "Clinical shifts are audible, a few hundred Hz to about 10 kHz",
        "Example: 5 MHz, 0.5 m/s, 0° → about 3.2 kHz"
      ],
      minutes: 7,
      lesson: "u12-l2"
    },
    {
      id: "u12-w2",
      prompt: "Draw the Doppler angle. Write the cosine table, the clinical angle rules, and explain why angle errors get worse as the angle grows.",
      keyPoints: [
        "Doppler angle = angle between the beam and the direction of blood flow",
        "cos 0° = 1.00 — largest shift, ideal",
        "cos 30° = 0.87",
        "cos 45° = 0.71",
        "cos 60° = 0.50 — half the shift",
        "cos 90° = 0 — no shift at all",
        "Clinical window 30°–60°, never above 60°",
        "Cosine changes fastest near 90°, so errors balloon at large angles",
        "Entered angle too small → reported velocity too low",
        "Entered angle too large → reported velocity too high",
        "Perpendicular vessels show no color and can be mistaken for occluded",
        "The sonographer controls both the steering and the angle-correct cursor"
      ],
      minutes: 6,
      lesson: "u12-l3"
    },
    {
      id: "u12-w3",
      prompt: "Make a CW versus PW table, then write out the Nyquist limit and every fix for aliasing in order.",
      keyPoints: [
        "CW = 2 crystals, continuous transmit and receive",
        "CW: no range resolution (range ambiguity)",
        "CW: never aliases; measures very high velocities",
        "PW = 1 crystal, alternately transmits and listens",
        "PW: range resolution via an adjustable sample volume/gate",
        "PW: aliases above the Nyquist limit",
        "Nyquist limit = PRF ÷ 2",
        "Aliasing wraps the peak to the opposite side of the baseline",
        "Color aliasing = red straight to blue, no black between",
        "Fix 1: raise the scale / PRF",
        "Fix 2: lower the baseline",
        "Fix 3: lower the transmit frequency",
        "Fix 4: decrease imaging depth (allows higher PRF)",
        "Fix 5: increase the angle toward 90° (last resort, costs accuracy)",
        "Fix 6: switch to CW. Gain does NOT fix aliasing"
      ],
      minutes: 8,
      lesson: "u12-l5"
    },
    {
      id: "u12-w4",
      prompt: "Draw a spectral display with all its axes labeled, then list every operator control and what it costs you.",
      keyPoints: [
        "Spectral display is built by fast Fourier transform (FFT)",
        "Horizontal axis = time (sweep speed adjustable)",
        "Vertical axis = Doppler shift (kHz) or velocity (cm/s)",
        "Above/below baseline = flow toward/away (invertible)",
        "Brightness = number of cells at that velocity",
        "Spectral broadening fills the clear window",
        "Broadening causes: real turbulence, oversized gate, excess gain",
        "Wall filter ≈ 50–100 Hz; too high erases slow/diastolic/venous flow",
        "Sample volume: small and centered = cleanest spectrum",
        "Baseline reallocates range; does not change PRF",
        "Scale = PRF: higher fixes aliasing but loses slow-flow sensitivity",
        "Gain changes brightness only — never the velocity"
      ],
      minutes: 7,
      lesson: "u12-l6"
    },
    {
      id: "u12-w5",
      prompt: "Compare color Doppler and power Doppler on every axis you can think of, and define duplex and triplex.",
      keyPoints: [
        "Color uses autocorrelation (fast); spectral uses FFT (detailed)",
        "Color shows mean velocity and direction per pixel, not peak velocity",
        "Color is PW-based, so it aliases",
        "Color is strongly angle dependent — perpendicular vessels show no color",
        "BART = Blue Away, Red Toward, but the map is user-settable",
        "Packet size / ensemble length ≈ 3–20 pulses; more = better color, lower frame rate",
        "Bigger or deeper color box → lower frame rate",
        "Variance mode flags turbulence",
        "Power Doppler shows amplitude only: no direction, no velocity",
        "Power Doppler does not alias and is far less angle dependent",
        "Power Doppler is more sensitive to slow, weak flow",
        "Power Doppler weaknesses: flash artifact from motion, low frame rate",
        "Duplex = 2D image + Doppler simultaneously",
        "Triplex = 2D + color + spectral; each added mode lowers frame rate"
      ],
      minutes: 8,
      lesson: "u12-l9"
    }
  ]
});
