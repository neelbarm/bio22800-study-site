/* Unit 14 — Bioeffects, Intensities & Safety. See SPEC.md for the schema. */
window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u14",
  order: 14,
  title: "Bioeffects, Intensities & Safety",
  icon: "🛡️",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Bioeffects and Safety chapter",
  blurb: "Ultrasound deposits energy in tissue, so this unit is about how much, where, and for how long. Learn the intensity family (spatial peak vs average, temporal peak vs pulse average vs temporal average), the two mechanisms of harm (heating and cavitation), the two on-screen indices (TI and MI), and the safety statements — then ALARA is something you can actually reason about instead of recite.",

  objectives: [
    { id: "u14-o1", text: "Define intensity, state its units, and calculate intensity from acoustic power and beam area." },
    { id: "u14-o2", text: "Distinguish spatial peak from spatial average intensity and define the beam uniformity ratio." },
    { id: "u14-o3", text: "Distinguish temporal peak, pulse average, and temporal average intensity, and relate temporal average to pulse average using the duty factor." },
    { id: "u14-o4", text: "Rank the six named intensities from highest to lowest and state which ones matter for thermal and for mechanical effects." },
    { id: "u14-o5", text: "Explain the thermal mechanism of bioeffects, list the factors that increase tissue heating, and define the thermal index and its three flavours (TIS, TIB, TIC)." },
    { id: "u14-o6", text: "Explain cavitation, compare stable with transient (inertial) cavitation, and calculate and interpret the mechanical index." },
    { id: "u14-o7", text: "Describe the Output Display Standard and apply ALARA at the machine, naming the controls that change patient exposure." },
    { id: "u14-o8", text: "State the AIUM safety conclusions, including the unfocused and focused intensity thresholds and the regulatory output limits." },
    { id: "u14-o9", text: "Distinguish in vitro, in vivo, and epidemiological evidence, and state what each can and cannot show." },
    { id: "u14-o10", text: "Describe how acoustic output is measured — hydrophone, calorimeter/power balance, thermocouple — and state what each instrument yields." }
  ],

  lessons: [
    {
      id: "u14-l1",
      title: "Intensity: power spread over an area",
      objectives: ["u14-o1"],
      html: `<p class="lead">Power tells you how much energy per second leaves the transducer. Intensity tells you how crowded that energy is where it lands — and crowding is what hurts tissue.</p>
<p>Think of the same amount of sunlight falling on your hand versus the same sunlight squeezed through a magnifying glass onto one spot. The power did not change; the area did, and the small spot burns.</p>
<div class="formula">intensity = power ÷ area</div>
<p><span class="kw">Acoustic power</span> is measured in watts (W) or milliwatts (mW) and is determined by the machine's output/transmit control — the one control that genuinely changes how much energy enters the patient. <span class="kw">Intensity</span> is measured in <b>W/cm²</b> or <b>mW/cm²</b>. Because area is in the denominator, intensity and beam area are <b>inversely</b> related: focus the beam so the area is one quarter as large and the intensity becomes four times as large, with no change in power at all.</p>
<p>Two practical consequences. First, <span class="kw-2">focusing</span> raises intensity at the focus even though the machine is sending the same power — good for resolution, worth respecting for safety. Second, if you want less exposure, turning the <b>output/acoustic power down</b> is the real lever; turning the <b>receiver gain</b> up brightens the image without adding one microwatt to the patient.</p>
<div class="callout key">Power (W) is what leaves the probe. Intensity (W/cm²) is power per unit area. Same power + smaller beam = higher intensity. Intensity is proportional to amplitude squared, so doubling pressure amplitude quadruples intensity.</div>
<div class="callout tip">Turn output down first, gain up second. Gain costs the patient nothing.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>The same acoustic power spread over a large area versus concentrated into a small area</title>
<text x="20" y="26" fill="var(--c3)" font-size="16">same power, wide beam</text>
<text x="330" y="26" fill="var(--c3)" font-size="16">same power, narrow beam</text>
<line x1="310" y1="10" x2="310" y2="232" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="90" y="46" width="90" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="90" y1="62" x2="76" y2="170" stroke="var(--c1)" stroke-width="3"/>
<line x1="180" y1="62" x2="194" y2="170" stroke="var(--c1)" stroke-width="3"/>
<line x1="76" y1="170" x2="194" y2="170" stroke="var(--c2)" stroke-width="5"/>
<text x="60" y="196" fill="currentColor" font-size="15">big area = low intensity</text>
<text x="70" y="220" fill="var(--muted)" font-size="15">10 mW ÷ 4 cm² = 2.5 mW/cm²</text>
<rect x="400" y="46" width="90" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="400" y1="62" x2="432" y2="170" stroke="var(--c1)" stroke-width="3"/>
<line x1="490" y1="62" x2="458" y2="170" stroke="var(--c1)" stroke-width="3"/>
<line x1="432" y1="170" x2="458" y2="170" stroke="var(--c2)" stroke-width="7"/>
<text x="356" y="196" fill="currentColor" font-size="15">small area = high intensity</text>
<text x="352" y="220" fill="var(--muted)" font-size="15">10 mW ÷ 0.5 cm² = 20 mW/cm²</text>
</svg>`,
          caption: "Intensity = power ÷ area. Focusing shrinks the area, so intensity climbs even though power is unchanged."
        }
      ],
      sayIt: "Say out loud: the formula for intensity, its units, what happens to intensity when the beam area is quartered, and which control actually changes patient exposure.",
      keyPoints: [
        "intensity = power ÷ area; units W/cm² or mW/cm²",
        "Power is in watts and is set by the output/transmit control",
        "Intensity and beam area are inversely related — focusing raises intensity",
        "Intensity is proportional to amplitude squared",
        "Output/acoustic power changes exposure; receiver gain does not"
      ]
    },

    {
      id: "u14-l2",
      title: "Spatial peak vs spatial average, and the beam uniformity ratio",
      objectives: ["u14-o2", "u14-o1"],
      html: `<p class="lead">Slice the beam across and the intensity is not flat: it is hottest in the middle and weakest at the edges. That shape gives us two spatial numbers.</p>
<p>Picture the beam end-on as a shower head. Right in the centre the water hammers down; at the rim it dribbles. Now ask two different questions. "How hard is it hitting at the very worst spot?" That is the <span class="kw">spatial peak (SP)</span> intensity — the maximum anywhere in the beam, found at the beam's centre, typically at the focus. "How hard is it hitting on average across the whole beam?" That is the <span class="kw">spatial average (SA)</span> intensity — total power divided by the whole cross-sectional area.</p>
<p>Because a peak can never be smaller than an average of which it is the largest member, <b>SP is always greater than or equal to SA</b>. The number that links them is the <span class="kw">beam uniformity ratio (BUR)</span>, also called the SP/SA factor:</p>
<div class="formula">BUR = spatial peak intensity ÷ spatial average intensity</div>
<p>BUR is unitless and is always 1 or greater. A BUR of 1 would mean a perfectly flat, uniform beam — which never happens in practice. A BUR of 5 means the hot spot is five times the average. Rearranged: <span class="kw-2">SA = SP ÷ BUR</span> and <span class="kw-2">SP = SA × BUR</span>.</p>
<div class="callout key">SP ≥ SA, always. BUR = SP ÷ SA ≥ 1, unitless. The BUR is determined by the transducer's beam shape, not by anything on the keyboard.</div>
<div class="callout warn">Trap: a question that gives you a BUR less than 1. That is impossible — check whether you have divided the right way round.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Intensity profile across the beam showing the spatial peak and the spatial average</title>
<line x1="60" y1="200" x2="560" y2="200" stroke="currentColor" stroke-width="2"/>
<text x="240" y="230" fill="currentColor" font-size="15">position across the beam</text>
<line x1="60" y1="200" x2="60" y2="40" stroke="currentColor" stroke-width="2"/>
<text x="14" y="120" fill="currentColor" font-size="15">I</text>
<path d="M90 198 C 190 198, 250 50, 310 50 C 370 50, 430 198, 530 198" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="310" y1="50" x2="310" y2="200" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 5"/>
<circle cx="310" cy="50" r="6" fill="var(--c2)"/>
<text x="322" y="48" fill="var(--c2)" font-size="16">spatial peak (SP)</text>
<line x1="90" y1="140" x2="530" y2="140" stroke="var(--c3)" stroke-width="3" stroke-dasharray="8 5"/>
<text x="352" y="132" fill="var(--c3)" font-size="16">spatial average (SA)</text>
<text x="70" y="176" fill="var(--muted)" font-size="15">edges are weak</text>
<text x="60" y="254" fill="currentColor" font-size="16">BUR = SP ÷ SA   (always ≥ 1, unitless)</text>
</svg>`,
          caption: "Across the beam: the peak is the worst single spot, the average shares the power over the whole area."
        }
      ],
      sayIt: "Say out loud: what spatial peak and spatial average mean, which is bigger and why, and what a beam uniformity ratio of 4 tells you.",
      keyPoints: [
        "Spatial peak = highest intensity anywhere in the beam (centre, usually at the focus)",
        "Spatial average = power divided by the whole beam cross-sectional area",
        "SP is always ≥ SA",
        "BUR = SP ÷ SA, unitless, always ≥ 1",
        "SA = SP ÷ BUR; the BUR is set by the beam shape, not by the sonographer"
      ]
    },

    {
      id: "u14-l3",
      title: "Temporal peak, pulse average, temporal average",
      objectives: ["u14-o3"],
      html: `<p class="lead">In pulsed imaging the machine is silent most of the time. The three temporal intensities differ only in how much silence you include in the average.</p>
<p>Lay one pulse repetition period out on a timeline: a short pulse (pulse duration, typically 0.5–3 µs) followed by a long listening gap (PRP, typically 100–500 µs).</p>
<ul>
<li><span class="kw">Temporal peak (TP)</span> — the highest intensity at any instant, at the tallest point of the pulse. Include no silence at all.</li>
<li><span class="kw">Pulse average (PA)</span> — average intensity <b>during the pulse only</b>. Include the whole pulse, still no silence.</li>
<li><span class="kw">Temporal average (TA)</span> — average intensity <b>over the entire PRP</b>, silence included. This is the one that matters for heating, because tissue integrates energy over time.</li>
</ul>
<p>So <b>TP ≥ PA ≥ TA</b>, always. The bridge between PA and TA is the <span class="kw">duty factor</span> — the fraction of time the machine is actually transmitting:</p>
<div class="formula">duty factor = pulse duration ÷ pulse repetition period</div>
<div class="formula">temporal average = pulse average × duty factor</div>
<p>Imaging duty factors are tiny, roughly <b>0.1–1% (0.001–0.01)</b>, so the temporal average is hundreds of times smaller than the pulse average. Continuous wave has a duty factor of 100% (1.0), which is why <b>TA equals PA in CW</b> and why CW Doppler is relatively warm despite modest peak pressures.</p>
<div class="callout tip">The duty factor is a discount coupon: pulse average price × duty factor = what tissue actually pays per second.</div>
<div class="callout key">Increase the duty factor (longer pulses, higher PRF, shallower depth, Doppler mode) and the temporal average — and therefore the heating — goes up, even if the pulse itself is unchanged.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Pulse timeline showing temporal peak, pulse average and temporal average intensity</title>
<line x1="40" y1="190" x2="570" y2="190" stroke="currentColor" stroke-width="2"/>
<text x="470" y="216" fill="currentColor" font-size="15">time</text>
<rect x="70" y="60" width="26" height="130" fill="var(--c1)"/>
<rect x="270" y="60" width="26" height="130" fill="var(--c1)"/>
<rect x="470" y="60" width="26" height="130" fill="var(--c1)"/>
<line x1="60" y1="52" x2="300" y2="52" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="102" y="46" fill="var(--c2)" font-size="16">temporal peak (in-pulse maximum)</text>
<line x1="70" y1="86" x2="96" y2="86" stroke="var(--c3)" stroke-width="4"/>
<text x="106" y="92" fill="var(--c3)" font-size="15">pulse average (pulse only)</text>
<line x1="60" y1="176" x2="540" y2="176" stroke="var(--c4)" stroke-width="4" stroke-dasharray="9 5"/>
<text x="300" y="168" fill="var(--c4)" font-size="16">temporal average (whole PRP)</text>
<line x1="70" y1="206" x2="270" y2="206" stroke="currentColor" stroke-width="2"/>
<text x="130" y="228" fill="currentColor" font-size="15">PRP</text>
<line x1="70" y1="238" x2="96" y2="238" stroke="currentColor" stroke-width="3"/>
<text x="106" y="244" fill="currentColor" font-size="15">PD — duty factor = PD ÷ PRP (imaging 0.1–1%)</text>
</svg>`,
          caption: "Include no silence (TP), the pulse only (PA), or all the silence too (TA): TP ≥ PA ≥ TA."
        }
      ],
      sayIt: "Say out loud: the three temporal intensities in order, what each one averages over, and the formula connecting pulse average to temporal average.",
      keyPoints: [
        "TP = instantaneous maximum; PA = average during the pulse; TA = average over the whole PRP",
        "TP ≥ PA ≥ TA always",
        "Duty factor = PD ÷ PRP; imaging 0.1–1%, CW 100%",
        "Temporal average = pulse average × duty factor",
        "In CW, TA = PA because the duty factor is 1",
        "Higher duty factor (Doppler, higher PRF, shallower depth) → higher TA → more heating"
      ]
    },

    {
      id: "u14-l4",
      title: "The six intensities and what each one is good for",
      objectives: ["u14-o4", "u14-o2", "u14-o3"],
      html: `<p class="lead">Two spatial choices times three temporal choices equals six named intensities. Learn the grid and the order falls out.</p>
<p>Every name is built the same way: the spatial word first (<b>SP</b> spatial peak or <b>SA</b> spatial average), then the temporal word (<b>TP</b> temporal peak, <b>PA</b> pulse average, <b>TA</b> temporal average). SPTA is read "spatial peak, temporal average": the hottest spot in the beam, averaged over all time.</p>
<table class="dt"><tr><th>Rank</th><th>Name</th><th>Meaning</th></tr>
<tr><td>1 (highest)</td><td>SPTP</td><td>hottest spot, instantaneous maximum</td></tr>
<tr><td>2</td><td>SPPA</td><td>hottest spot, averaged during the pulse</td></tr>
<tr><td>3</td><td>SPTA</td><td>hottest spot, averaged over all time</td></tr>
<tr><td>4</td><td>SATP</td><td>whole beam, instantaneous maximum</td></tr>
<tr><td>5</td><td>SAPA</td><td>whole beam, averaged during the pulse</td></tr>
<tr><td>6 (lowest)</td><td>SATA</td><td>whole beam, averaged over all time</td></tr></table>
<p>Which ones do we actually use? <span class="kw">SPTA</span> is the number quoted for <b>thermal</b> risk and in regulatory limits, because heating depends on energy delivered per second over time at the worst spot. <span class="kw">SPTP</span> and <span class="kw">SPPA</span>, which reflect the pressure in a single pulse, are the numbers that matter for <b>mechanical</b> effects such as cavitation.</p>
<div class="callout tip">Peaks before averages, and inside each group always TP, PA, TA. "SPTA heats, SPTP shakes."</div>
<div class="callout warn">The two relationships that are always true by definition are SP ≥ SA and TP ≥ PA ≥ TA. The full six-item ranking above is the standard ordering to reproduce on an exam; the middle pair in particular depends on the beam's uniformity and duty factor.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Grid of the six intensities with their ranking from highest to lowest</title>
<text x="150" y="40" fill="var(--c3)" font-size="16">TP</text>
<text x="290" y="40" fill="var(--c3)" font-size="16">PA</text>
<text x="430" y="40" fill="var(--c3)" font-size="16">TA</text>
<text x="20" y="96" fill="var(--c3)" font-size="16">SP</text>
<text x="20" y="176" fill="var(--c3)" font-size="16">SA</text>
<rect x="110" y="62" width="120" height="48" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="126" y="92" fill="currentColor" font-size="16">SPTP  (1)</text>
<rect x="250" y="62" width="120" height="48" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="266" y="92" fill="currentColor" font-size="16">SPPA  (2)</text>
<rect x="390" y="62" width="120" height="48" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="406" y="92" fill="currentColor" font-size="16">SPTA  (3)</text>
<rect x="110" y="142" width="120" height="48" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="126" y="172" fill="currentColor" font-size="16">SATP  (4)</text>
<rect x="250" y="142" width="120" height="48" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="266" y="172" fill="currentColor" font-size="16">SAPA  (5)</text>
<rect x="390" y="142" width="120" height="48" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="406" y="172" fill="currentColor" font-size="16">SATA  (6)</text>
<text x="110" y="224" fill="var(--c4)" font-size="16">SPTA = heating</text>
<text x="330" y="224" fill="var(--c4)" font-size="16">SPTP / SPPA = cavitation</text>
</svg>`,
          caption: "Two spatial choices × three temporal choices = six intensities, ranked 1 (highest) to 6 (lowest)."
        }
      ],
      sayIt: "Say out loud, in order: the six intensities from highest to lowest, then which one is used for thermal risk and which for mechanical risk.",
      keyPoints: [
        "Name = spatial word then temporal word (SPTA = spatial peak, temporal average)",
        "Standard ranking: SPTP > SPPA > SPTA > SATP > SAPA > SATA",
        "Always true: SP ≥ SA and TP ≥ PA ≥ TA",
        "SPTA is the thermal/regulatory number (heating)",
        "SPTP and SPPA relate to mechanical effects and cavitation",
        "SPTA = SPPA × duty factor"
      ]
    },

    {
      id: "u14-l5",
      title: "Heating: the thermal mechanism and the thermal index",
      objectives: ["u14-o5"],
      html: `<p class="lead">The first way ultrasound can harm tissue is the boring one: absorption turns sound into heat.</p>
<p>Attenuation has several causes, but only <span class="kw">absorption</span> converts acoustic energy into thermal energy. Tissues that absorb strongly heat quickly, and the champion absorber in the body is <span class="kw">bone</span> — which is why the fetal skull, the adult cranium, and ossifying long bones are the focus of thermal concern, along with the soft tissue immediately next to them.</p>
<p>Heating goes up when: the <b>temporal average intensity (SPTA)</b> is higher; the <b>output power</b> is higher; the <b>duty factor</b> is higher (Doppler modes, especially spectral PW and CW, are the hottest); the beam <b>dwells</b> in one place instead of sweeping (M-mode and spectral Doppler park the beam; 2D scanning spreads the energy); the <b>frequency</b> is higher (more absorption); and the tissue is <b>poorly perfused</b> — blood flow is the body's cooling system, so the eye and the embryo cool poorly.</p>
<p>The on-screen number for this is the <span class="kw">thermal index (TI)</span>:</p>
<div class="formula">TI = acoustic power being used ÷ power needed to raise that tissue 1 °C</div>
<p>TI is unitless. TI = 1 means the settings could produce roughly a 1 °C rise under the model's worst-case assumptions; TI = 2 suggests roughly twice that potential. It is an estimate, not a thermometer. Three flavours pick the right tissue model:</p>
<table class="dt"><tr><th>Index</th><th>Model</th><th>Use it for</th></tr>
<tr><td>TIS</td><td>soft tissue only</td><td>abdomen, first-trimester OB, superficial parts</td></tr>
<tr><td>TIB</td><td>bone at or near the focus</td><td>second- and third-trimester OB (fetal bone)</td></tr>
<tr><td>TIC</td><td>bone at the surface</td><td>transcranial, neonatal head</td></tr></table>
<div class="callout tip">TIS = soft, TIB = bone at the bottom (down at the focus), TIC = cranium right at the contact surface.</div>
<div class="callout key">A rise of about 1 °C or less is not considered hazardous. Keep TI low, keep scanning time short, and keep the beam moving — especially in obstetrics and in the eye.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Absorption heating soft tissue mildly and bone strongly at the focus</title>
<rect x="60" y="40" width="70" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="70" y1="56" x2="120" y2="150" stroke="var(--c1)" stroke-width="3"/>
<line x1="120" y1="56" x2="120" y2="150" stroke="var(--c1)" stroke-width="3"/>
<line x1="120" y1="150" x2="120" y2="210" stroke="var(--c1)" stroke-width="2"/>
<text x="150" y="100" fill="currentColor" font-size="15">soft tissue: some absorption</text>
<rect x="80" y="150" width="120" height="18" fill="var(--c2)"/>
<text x="216" y="164" fill="var(--c2)" font-size="16">bone at the focus: absorbs most → hottest</text>
<text x="60" y="206" fill="currentColor" font-size="15">heating ↑ with: SPTA, output, duty factor, dwell time,</text>
<text x="60" y="230" fill="currentColor" font-size="15">frequency, and poor perfusion (eye, embryo)</text>
<text x="60" y="30" fill="var(--c3)" font-size="16">absorption is the only mechanism that makes heat</text>
</svg>`,
          caption: "Only absorption makes heat; bone absorbs most, so tissue at a bone surface warms fastest."
        }
      ],
      sayIt: "Say out loud: the only attenuation mechanism that makes heat, six things that increase heating, the definition of TI, and when you use TIS, TIB and TIC.",
      keyPoints: [
        "Absorption is the mechanism that converts sound into heat",
        "Bone absorbs most; tissue at bone surfaces heats fastest",
        "Heating rises with SPTA, output, duty factor, dwell time, frequency, poor perfusion",
        "Doppler and M-mode park the beam; 2D sweeping spreads energy",
        "TI = power used ÷ power needed for a 1 °C rise; unitless estimate",
        "TIS soft tissue, TIB bone at the focus (later OB), TIC bone at the surface (transcranial)",
        "A rise of about 1 °C or less is not considered hazardous"
      ]
    },

    {
      id: "u14-l6",
      title: "Cavitation and the mechanical index",
      objectives: ["u14-o6"],
      html: `<p class="lead">The second mechanism is mechanical: the rarefaction half of the wave pulls on tissue hard enough to make gas bubbles grow, shake, and sometimes implode.</p>
<p>Every cycle has a compression and a <span class="kw-2">rarefaction</span>. In the rarefaction the pressure drops below ambient — the wave literally pulls tissue apart a little. Gas that was dissolved or trapped in tiny pockets (bowel, lung, an injected contrast microbubble) can come out and form a bubble. That is <span class="kw">cavitation</span>, and it comes in two grades.</p>
<ul>
<li><span class="kw">Stable cavitation</span> (non-inertial): bubbles form and oscillate — expand and contract — with each cycle, over and over. They stir fluid around themselves (microstreaming), which can stress nearby cell membranes, but they survive. This is the normal behaviour of contrast agents at low output.</li>
<li><span class="kw">Transient cavitation</span> (inertial, sometimes called collapse cavitation): bubbles grow and then violently implode. The collapse concentrates energy into a tiny volume, producing extremely high local temperatures and pressures, shock waves, and free radicals. This is the mechanism with real destructive potential.</li>
</ul>
<p>The on-screen estimate of mechanical risk is the <span class="kw">mechanical index (MI)</span>:</p>
<div class="formula">MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz)</div>
<p>Read it carefully: MI is <b>directly</b> related to peak rarefactional (negative) pressure and <b>inversely</b> related to the square root of frequency. So raising the frequency <b>lowers</b> MI — at higher frequencies the rarefaction phase lasts a shorter time, giving a bubble less time to grow. Turning the output down also lowers MI. MI is unitless. Regulatory output is capped at MI 1.9 for most applications, and contrast studies are deliberately run at very low MI (often below 0.3) so the bubbles oscillate rather than burst.</p>
<div class="callout tip">Stable bubbles dance; transient bubbles die. And: crank the frequency up, the MI comes down.</div>
<div class="callout key">Cavitation needs a gas body to start from. Lung, bowel gas, and injected contrast agents are the situations where MI deserves attention.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Stable cavitation with an oscillating bubble compared with transient cavitation ending in collapse</title>
<text x="20" y="26" fill="var(--c3)" font-size="16">stable: oscillates, survives</text>
<text x="330" y="26" fill="var(--c3)" font-size="16">transient: grows, then implodes</text>
<line x1="310" y1="10" x2="310" y2="242" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<circle cx="70" cy="110" r="14" fill="none" stroke="var(--c1)" stroke-width="3"/>
<circle cx="140" cy="110" r="26" fill="none" stroke="var(--c1)" stroke-width="3"/>
<circle cx="215" cy="110" r="14" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="90" y1="110" x2="112" y2="110" stroke="currentColor" stroke-width="2"/>
<line x1="168" y1="110" x2="196" y2="110" stroke="currentColor" stroke-width="2"/>
<text x="40" y="176" fill="currentColor" font-size="15">expands and contracts each cycle</text>
<text x="40" y="200" fill="var(--muted)" font-size="15">microstreaming stresses membranes</text>
<circle cx="370" cy="110" r="12" fill="none" stroke="var(--c2)" stroke-width="3"/>
<circle cx="440" cy="110" r="30" fill="none" stroke="var(--c2)" stroke-width="3"/>
<circle cx="520" cy="110" r="6" fill="var(--c4)"/>
<line x1="504" y1="94" x2="536" y2="126" stroke="var(--c4)" stroke-width="3"/>
<line x1="536" y1="94" x2="504" y2="126" stroke="var(--c4)" stroke-width="3"/>
<text x="340" y="176" fill="currentColor" font-size="15">collapse: huge local heat and pressure</text>
<text x="340" y="200" fill="var(--muted)" font-size="15">shock waves, free radicals</text>
<text x="20" y="236" fill="var(--c4)" font-size="16">MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz)</text>
</svg>`,
          caption: "Stable cavitation oscillates; transient (inertial) cavitation ends in a violent collapse."
        }
      ],
      sayIt: "Say out loud: the difference between stable and transient cavitation, the MI formula, and what happens to MI when you raise the frequency.",
      keyPoints: [
        "Cavitation happens in the rarefaction phase and needs a gas body to start",
        "Stable (non-inertial): bubbles oscillate and persist; microstreaming",
        "Transient (inertial): bubbles implode; shock waves, extreme local temperature, free radicals",
        "MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz); unitless",
        "↑ pressure → ↑ MI; ↑ frequency → ↓ MI; ↓ output → ↓ MI",
        "Regulatory cap MI 1.9; contrast imaging uses low MI so bubbles survive"
      ]
    },

    {
      id: "u14-l7",
      title: "The Output Display Standard and ALARA",
      objectives: ["u14-o7", "u14-o5", "u14-o6"],
      html: `<p class="lead">You cannot manage what you cannot see. The Output Display Standard puts the two risk estimates on the screen while you scan, so ALARA becomes an action rather than a slogan.</p>
<p>The <span class="kw">Output Display Standard (ODS)</span>, developed jointly by AIUM and NEMA with the FDA, requires systems to display <span class="kw">TI</span> and <span class="kw">MI</span> in real time whenever the machine is capable of exceeding an index value of 1. The indices update as you change mode, depth, focus, frequency and output, which is the point: you can watch your decisions change the patient's exposure.</p>
<p>Which one to watch depends on what you are scanning: <b>TI</b> when heating is the concern (obstetrics, long Doppler interrogations, transcranial work, the eye), <b>MI</b> when cavitation is the concern (lung, bowel, and especially contrast agents).</p>
<p><span class="kw">ALARA</span> — As Low As Reasonably Achievable — means using the lowest output and the shortest exposure that still answers the clinical question. A diagnostic image you cannot interpret is not "safe"; ALARA is a balance, not a ban.</p>
<div class="callout key">Practical ALARA, in order: (1) scan only when there is a medical indication; (2) start with output low and raise receiver gain first, since gain costs the patient nothing; (3) prefer 2D sweeping over parked modes (M-mode, spectral Doppler); (4) keep dwell time short and keep the probe moving; (5) reduce total scan time; (6) watch TI and MI as you work.</div>
<div class="callout warn">Confusion to avoid: <b>output/acoustic power</b> changes what enters the patient; <b>receiver gain, TGC, dynamic range and post-processing</b> change only the displayed picture. Only the first group changes TI and MI.</div>
<p>Regulatory ceilings sit behind all of this: for most diagnostic applications the FDA limits derated SPTA to <b>720 mW/cm²</b> and MI to <b>1.9</b>, with much stricter limits for ophthalmic scanning (derated SPTA about 50 mW/cm², MI about 0.23, TI 1.0). The word "derated" means the value has been corrected for the attenuation tissue would have provided, since the measurement itself is made in water.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Screen corner showing the mechanical index and thermal index readouts</title>
<rect x="40" y="30" width="520" height="150" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="56" y="58" fill="var(--muted)" font-size="15">image area</text>
<rect x="380" y="44" width="164" height="72" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="396" y="74" fill="var(--c1)" font-size="16">MI  0.9</text>
<text x="396" y="102" fill="var(--c2)" font-size="16">TIB 0.4</text>
<text x="56" y="100" fill="currentColor" font-size="15">displayed whenever an index</text>
<text x="56" y="124" fill="currentColor" font-size="15">can exceed 1.0</text>
<text x="40" y="208" fill="currentColor" font-size="15">MI → cavitation risk (lung, bowel, contrast)</text>
<text x="40" y="234" fill="currentColor" font-size="15">TI → heating risk (OB, Doppler, transcranial, eye)</text>
</svg>`,
          caption: "The ODS keeps MI and TI on screen so output decisions can be made while scanning."
        }
      ],
      sayIt: "Say out loud: what the ODS requires, which index you watch in obstetrics versus with contrast agents, and five practical ALARA moves.",
      keyPoints: [
        "ODS (AIUM/NEMA with FDA): display TI and MI whenever an index can exceed 1",
        "Indices update live as mode, depth, focus, frequency and output change",
        "TI for heating concerns; MI for cavitation concerns",
        "ALARA = lowest output, shortest time, only when medically indicated",
        "Lower output first and raise receiver gain — gain does not affect the patient",
        "FDA ceilings for most applications: derated SPTA 720 mW/cm², MI 1.9 (ophthalmic much lower)"
      ]
    },

    {
      id: "u14-l8",
      title: "What the evidence actually says",
      objectives: ["u14-o8", "u14-o9"],
      html: `<p class="lead">Diagnostic ultrasound has been used for decades with no confirmed harmful effect at diagnostic exposure levels — and knowing exactly how that sentence is worded is worth exam points.</p>
<p>Evidence comes in three flavours, and they are not interchangeable.</p>
<ul>
<li><span class="kw">In vitro</span> — "in glass": cells, tissue fragments and cultures in a dish. Effects (membrane damage, chromosomal changes) have been produced in vitro at high exposures. The limitation: a dish has no blood flow, no cooling, no repair mechanisms, so it does not predict what happens in a person.</li>
<li><span class="kw">In vivo</span> — "in the living": experiments in living organisms, usually laboratory animals. Effects such as lung and intestinal capillary bleeding have been shown at exposures above diagnostic levels. The limitation: species and geometry differ from humans.</li>
<li><span class="kw">Epidemiology</span> — studies of large human populations who were scanned, looking for differences in outcomes (birth weight, childhood development, malignancy). These studies have not confirmed harmful effects from diagnostic ultrasound. The limitation: epidemiology is statistical, so it can never prove that risk is exactly zero.</li>
</ul>
<p>The AIUM conclusions that get examined:</p>
<div class="callout key">No confirmed biological effects on patients or operators have been produced by exposures typical of present-day diagnostic instruments. For <b>unfocused</b> beams, no confirmed effects below an SPTA of <b>100 mW/cm²</b>; for <b>focused</b> beams, no confirmed effects below an SPTA of <b>1 W/cm² (1,000 mW/cm²)</b>. Even above these, effects have not been reported for brief exposures when the product of intensity and time stays modest.</div>
<p>Also standard: ultrasound should be used only when there is a <b>medical indication</b>. Keepsake fetal imaging and using a Doppler heartbeat monitor for entertainment are considered inappropriate uses, because there is exposure without benefit.</p>
<div class="callout tip">"A hundred milli unfocused, a whole watt focused." And the exam's favourite verb is <i>confirmed</i>: no <b>confirmed</b> effects — not "proven safe."</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 220" role="img"><title>Three kinds of evidence: cells in a dish, living animals, and human populations</title>
<rect x="30" y="50" width="160" height="86" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="46" y="82" fill="var(--c1)" font-size="16">in vitro</text>
<text x="46" y="108" fill="currentColor" font-size="15">cells in a dish</text>
<rect x="220" y="50" width="160" height="86" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="236" y="82" fill="var(--c2)" font-size="16">in vivo</text>
<text x="236" y="108" fill="currentColor" font-size="15">living organisms</text>
<rect x="410" y="50" width="160" height="86" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="426" y="82" fill="var(--c3)" font-size="16">epidemiology</text>
<text x="426" y="108" fill="currentColor" font-size="15">human populations</text>
<text x="30" y="172" fill="currentColor" font-size="15">no cooling, no repair</text>
<text x="220" y="172" fill="currentColor" font-size="15">species differences</text>
<text x="410" y="172" fill="currentColor" font-size="15">statistical, never zero</text>
<text x="30" y="204" fill="var(--c4)" font-size="16">no confirmed effects at diagnostic exposure levels</text>
</svg>`,
          caption: "Three evidence types and the limitation of each; only epidemiology studies real patients."
        }
      ],
      sayIt: "Say out loud: the difference between in vitro, in vivo and epidemiological evidence, and the two AIUM intensity thresholds with their beam types.",
      keyPoints: [
        "In vitro = cells/tissue in a dish; no perfusion or repair",
        "In vivo = living organisms; effects shown above diagnostic levels (lung, intestinal bleeding)",
        "Epidemiology = human populations; no confirmed harmful effects, but cannot prove zero risk",
        "Unfocused beams: no confirmed effects below SPTA 100 mW/cm²",
        "Focused beams: no confirmed effects below SPTA 1 W/cm² (1,000 mW/cm²)",
        "Scan only with a medical indication; keepsake imaging is inappropriate",
        "The exam word is 'confirmed', not 'proven safe'"
      ]
    },

    {
      id: "u14-l9",
      title: "Measuring the output: hydrophone, power, temperature",
      objectives: ["u14-o10", "u14-o1"],
      html: `<p class="lead">Every intensity number in this unit begins as a measurement in a tank of water, made with a very small microphone.</p>
<p>A <span class="kw">hydrophone</span> is a tiny transducer — a needle probe or a thin membrane with an active area well under a millimetre — placed in a water tank in front of the transducer being tested. It works by the direct piezoelectric effect: pressure in, voltage out. What it produces is a graph of <b>pressure versus time</b>.</p>
<p>That one graph is astonishingly rich. From it you can read:</p>
<ul>
<li><b>Peak compressional and peak rarefactional pressure</b> (MPa) — the rarefactional value feeds the MI.</li>
<li><b>Pulse duration</b> and <b>pulse repetition period</b>, hence <b>PRF</b> and <b>duty factor</b>.</li>
<li><b>Period and frequency</b> of the wave, and the number of cycles per pulse.</li>
<li><b>Intensities</b>, since intensity is proportional to pressure squared — move the hydrophone around the beam and you also map the beam profile, giving spatial peak, spatial average and the beam uniformity ratio.</li>
</ul>
<p>Two other instruments fill in what a hydrophone cannot give directly. A <span class="kw">calorimeter</span> or an acoustic power balance measures <b>total acoustic power</b> in watts, by measuring the heat the beam deposits or the force it exerts on a target. A <span class="kw">thermocouple</span> (or thermistor) embedded in a tissue-mimicking phantom measures the <b>actual temperature rise</b> during exposure. A Schlieren system visualizes the whole beam optically.</p>
<div class="callout key">Hydrophone → pressure vs time (and from that: PD, PRP, PRF, duty factor, frequency, pressures, intensities, beam profile). Calorimeter/power balance → total power. Thermocouple → temperature rise.</div>
<div class="callout warn">Measurements are made in water, which barely attenuates. That is why published values are <b>derated</b> (typically at 0.3 dB per cm per MHz) to estimate what happens in tissue — hence names like ISPTA.3.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Hydrophone in a water tank recording pressure versus time from a transducer</title>
<rect x="30" y="50" width="250" height="140" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="34" y="44" fill="var(--c1)" font-size="15">water tank</text>
<rect x="54" y="66" width="60" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="46" y="100" fill="var(--muted)" font-size="15">probe</text>
<line x1="70" y1="82" x2="180" y2="150" stroke="var(--c2)" stroke-width="3"/>
<line x1="106" y1="82" x2="200" y2="150" stroke="var(--c2)" stroke-width="3"/>
<circle cx="190" cy="152" r="7" fill="var(--c4)"/>
<line x1="190" y1="159" x2="190" y2="182" stroke="currentColor" stroke-width="3"/>
<text x="150" y="204" fill="currentColor" font-size="15">hydrophone (tiny element)</text>
<line x1="330" y1="120" x2="580" y2="120" stroke="currentColor" stroke-width="2"/>
<text x="330" y="60" fill="var(--c3)" font-size="16">pressure vs time</text>
<path d="M350 120 L360 80 L370 160 L380 88 L390 152 L400 120" fill="none" stroke="var(--c1)" stroke-width="3"/>
<path d="M500 120 L510 80 L520 160 L530 88 L540 152 L550 120" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="360" y1="80" x2="510" y2="80" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="386" y="76" fill="var(--c2)" font-size="15">PRP</text>
<text x="330" y="190" fill="currentColor" font-size="15">gives PD, PRP, PRF, duty factor,</text>
<text x="330" y="214" fill="currentColor" font-size="15">frequency, pressures, intensities</text>
</svg>`,
          caption: "A hydrophone records pressure versus time in water; almost every acoustic parameter is read off that trace."
        }
      ],
      sayIt: "Say out loud: what a hydrophone is, what it directly measures, four things you can derive from its trace, and what a calorimeter and a thermocouple measure instead.",
      keyPoints: [
        "Hydrophone = tiny transducer (needle or membrane) in a water tank; pressure in, voltage out",
        "Direct output: pressure versus time",
        "Derived: peak compressional and rarefactional pressure, PD, PRP, PRF, duty factor, frequency, intensities",
        "Moving it through the beam maps the profile → SP, SA, BUR",
        "Calorimeter / power balance → total acoustic power (watts)",
        "Thermocouple in a phantom → actual temperature rise",
        "Water measurements are derated (0.3 dB/cm/MHz) to estimate in-tissue values"
      ]
    }
  ],

  mnemonics: [
    { saying: "Power is what you send; intensity is how crowded it lands.", meaning: "Power (W) leaves the probe; intensity (W/cm²) = power ÷ area, so focusing the same power into a smaller area raises intensity.", lesson: "u14-l1" },
    { saying: "Peak is one bad spot; average shares the blame.", meaning: "Spatial peak is the single hottest point in the beam; spatial average spreads the same power over the whole cross-section, so SP is always ≥ SA.", lesson: "u14-l2" },
    { saying: "The duty factor is a discount coupon.", meaning: "Temporal average = pulse average × duty factor. Imaging duty factors are about 0.1–1%, so tissue pays only a tiny fraction of the pulse-average price.", lesson: "u14-l3" },
    { saying: "Peaks first, then averages — and inside each, TP, PA, TA.", meaning: "Reproduces the standard ranking SPTP > SPPA > SPTA > SATP > SAPA > SATA.", lesson: "u14-l4" },
    { saying: "SPTA heats, SPTP shakes.", meaning: "Spatial peak temporal average is the thermal/regulatory intensity; the peak-pressure intensities (SPTP, SPPA) drive mechanical effects and cavitation.", lesson: "u14-l4" },
    { saying: "TIS is soft, TIB is bone at the bottom, TIC is the cranium on contact.", meaning: "TIS = soft-tissue model; TIB = bone at or near the focus (later obstetrics); TIC = bone right at the surface (transcranial, neonatal head).", lesson: "u14-l5" },
    { saying: "Stable bubbles dance; transient bubbles die.", meaning: "Stable (non-inertial) cavitation = bubbles oscillating and surviving with microstreaming; transient (inertial) cavitation = bubbles imploding with shock waves and free radicals.", lesson: "u14-l6" },
    { saying: "Crank the frequency up, the MI comes down.", meaning: "MI = peak rarefactional pressure ÷ √frequency, so MI is inversely related to the square root of frequency and directly related to rarefactional pressure.", lesson: "u14-l6" },
    { saying: "Output down, gain up.", meaning: "ALARA in four words: lower the acoustic power (which the patient feels) and compensate with receiver gain (which the patient does not).", lesson: "u14-l7" },
    { saying: "A hundred milli unfocused, a whole watt focused.", meaning: "AIUM: no confirmed bioeffects below SPTA 100 mW/cm² for unfocused beams, or below 1 W/cm² (1,000 mW/cm²) for focused beams.", lesson: "u14-l8" }
  ],

  formulas: [
    { name: "Intensity", expr: "intensity = power ÷ area", units: "W/cm² or mW/cm²", note: "1 W/cm² = 1,000 mW/cm². Intensity is proportional to amplitude squared." },
    { name: "Beam uniformity ratio (SP/SA factor)", expr: "BUR = spatial peak intensity ÷ spatial average intensity", units: "unitless", note: "Always ≥ 1. Rearranged: SA = SP ÷ BUR." },
    { name: "Duty factor", expr: "DF = pulse duration ÷ pulse repetition period", units: "unitless or %", note: "Imaging 0.1–1%; CW = 100% (1.0)." },
    { name: "Temporal average from pulse average", expr: "temporal average = pulse average × duty factor", units: "W/cm²", note: "So SPTA = SPPA × DF; in CW the duty factor is 1, so TA = PA." },
    { name: "Mechanical index", expr: "MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz)", units: "unitless", note: "Directly related to rarefactional pressure, inversely to the square root of frequency." },
    { name: "Thermal index", expr: "TI = acoustic power used ÷ power needed to raise the tissue 1 °C", units: "unitless", note: "TIS soft tissue, TIB bone at the focus, TIC bone at the surface." },
    { name: "Intensity order (standard ranking)", expr: "SPTP > SPPA > SPTA > SATP > SAPA > SATA", units: "—", note: "Guaranteed by definition: SP ≥ SA and TP ≥ PA ≥ TA." }
  ],

  keyNumbers: [
    { fact: "Units of intensity", value: "W/cm² or mW/cm² (1 W/cm² = 1,000 mW/cm²)" },
    { fact: "Typical SPTA of diagnostic imaging", value: "roughly 0.1–100 mW/cm² (2D lowest, spectral Doppler highest)" },
    { fact: "AIUM threshold, unfocused beams", value: "no confirmed bioeffects below SPTA 100 mW/cm²" },
    { fact: "AIUM threshold, focused beams", value: "no confirmed bioeffects below SPTA 1 W/cm² = 1,000 mW/cm²" },
    { fact: "FDA limit for most diagnostic applications", value: "derated SPTA 720 mW/cm², MI 1.9" },
    { fact: "FDA limits for ophthalmic scanning", value: "derated SPTA about 50 mW/cm², MI about 0.23, TI 1.0" },
    { fact: "When must TI and MI be displayed?", value: "whenever the system can produce an index value above 1.0 (Output Display Standard)" },
    { fact: "Temperature rise considered not hazardous", value: "about 1 °C or less" },
    { fact: "Duty factor, imaging vs CW", value: "0.1–1% (0.001–0.01) vs 100% (1.0)" },
    { fact: "Derating factor used to estimate in-tissue values", value: "0.3 dB per cm per MHz (hence ISPTA.3)" },
    { fact: "Tissue that absorbs and heats the most", value: "bone (and the soft tissue right next to it)" },
    { fact: "MI used for contrast studies", value: "low, often below 0.3, so microbubbles oscillate instead of bursting" }
  ],

  flashcards: [
    { front: "Intensity", back: "Power per unit area: power ÷ area, in W/cm² or mW/cm²", lesson: "u14-l1" },
    { front: "Units of acoustic power", back: "Watts (W) or milliwatts (mW)", lesson: "u14-l1" },
    { front: "Beam area is halved. What happens to intensity?", back: "It doubles — intensity and area are inversely related at constant power", lesson: "u14-l1" },
    { front: "Which control changes patient exposure: output or gain?", back: "Output/acoustic power. Receiver gain only brightens the displayed image", lesson: "u14-l1" },
    { front: "Spatial peak intensity", back: "The highest intensity anywhere in the beam — the centre, usually at the focus", lesson: "u14-l2" },
    { front: "Spatial average intensity", back: "Power divided by the entire beam cross-sectional area", lesson: "u14-l2" },
    { front: "Beam uniformity ratio", back: "BUR = SP ÷ SA; unitless; always 1 or greater", lesson: "u14-l2" },
    { front: "SA from SP and BUR", back: "SA = SP ÷ BUR", lesson: "u14-l2" },
    { front: "Temporal peak intensity", back: "The instantaneous maximum intensity, at the tallest point of the pulse", lesson: "u14-l3" },
    { front: "Pulse average intensity", back: "Average intensity during the pulse only (no listening time included)", lesson: "u14-l3" },
    { front: "Temporal average intensity", back: "Average intensity over the whole pulse repetition period, listening time included", lesson: "u14-l3" },
    { front: "Order of the temporal intensities", back: "TP ≥ PA ≥ TA", lesson: "u14-l3" },
    { front: "Temporal average from pulse average", back: "TA = PA × duty factor", lesson: "u14-l3" },
    { front: "Duty factor of continuous wave", back: "100% (1.0) — so TA equals PA", lesson: "u14-l3" },
    { front: "The six intensities, highest to lowest", back: "SPTP, SPPA, SPTA, SATP, SAPA, SATA", lesson: "u14-l4" },
    { front: "Which intensity is used for thermal risk and regulatory limits?", back: "SPTA (spatial peak, temporal average)", lesson: "u14-l4" },
    { front: "Which intensities relate to mechanical effects/cavitation?", back: "SPTP and SPPA — the single-pulse peaks", lesson: "u14-l4" },
    { front: "Highest and lowest of the six intensities", back: "Highest SPTP; lowest SATA", lesson: "u14-l4" },
    { front: "Which attenuation mechanism produces heat?", back: "Absorption — reflection and scattering redirect sound, they do not heat it", lesson: "u14-l5" },
    { front: "Which tissue heats the most?", back: "Bone; the soft tissue adjacent to bone warms with it", lesson: "u14-l5" },
    { front: "Six factors that increase heating", back: "Higher SPTA, higher output, higher duty factor, longer dwell time, higher frequency, poor perfusion", lesson: "u14-l5" },
    { front: "Thermal index (definition)", back: "Power being used ÷ power needed to raise that tissue 1 °C; unitless estimate", lesson: "u14-l5" },
    { front: "TIS / TIB / TIC", back: "Soft tissue / bone at or near the focus (later OB) / bone at the surface (transcranial, neonatal head)", lesson: "u14-l5" },
    { front: "Which modes heat most?", back: "Parked-beam modes: spectral PW and CW Doppler, then M-mode; 2D sweeping spreads energy", lesson: "u14-l5" },
    { front: "Cavitation", back: "Formation and behaviour of gas bubbles in the rarefaction phase of the wave", lesson: "u14-l6" },
    { front: "Stable (non-inertial) cavitation", back: "Bubbles oscillate and survive; microstreaming can stress cell membranes", lesson: "u14-l6" },
    { front: "Transient (inertial) cavitation", back: "Bubbles grow and violently implode: shock waves, huge local temperature and pressure, free radicals", lesson: "u14-l6" },
    { front: "Mechanical index formula", back: "MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz)", lesson: "u14-l6" },
    { front: "Raise the frequency: what happens to MI?", back: "MI decreases (inverse square-root relationship)", lesson: "u14-l6" },
    { front: "What does cavitation require to start?", back: "A gas body — lung, bowel gas, or injected contrast microbubbles", lesson: "u14-l6" },
    { front: "Output Display Standard", back: "AIUM/NEMA standard requiring real-time TI and MI display whenever an index can exceed 1.0", lesson: "u14-l7" },
    { front: "ALARA", back: "As Low As Reasonably Achievable: lowest output, shortest time, only with a medical indication", lesson: "u14-l7" },
    { front: "Which index do you watch with contrast agents?", back: "MI — cavitation risk", lesson: "u14-l7" },
    { front: "Which index do you watch in obstetrics and Doppler?", back: "TI — heating risk (TIB once fetal bone is ossified)", lesson: "u14-l7" },
    { front: "FDA output limits for most applications", back: "Derated SPTA 720 mW/cm² and MI 1.9", lesson: "u14-l7" },
    { front: "In vitro", back: "'In glass' — cells or tissue in a dish; no perfusion, cooling or repair, so it does not predict patient effects", lesson: "u14-l8" },
    { front: "In vivo", back: "'In the living' — experiments in living organisms; effects shown above diagnostic levels", lesson: "u14-l8" },
    { front: "Epidemiology", back: "Studies of human populations; no confirmed harmful effects at diagnostic levels, but cannot prove zero risk", lesson: "u14-l8" },
    { front: "AIUM threshold for unfocused beams", back: "No confirmed effects below SPTA 100 mW/cm²", lesson: "u14-l8" },
    { front: "AIUM threshold for focused beams", back: "No confirmed effects below SPTA 1 W/cm² (1,000 mW/cm²)", lesson: "u14-l8" },
    { front: "Hydrophone", back: "Tiny needle or membrane transducer in a water tank; measures pressure versus time", lesson: "u14-l9" },
    { front: "What can be derived from a hydrophone trace?", back: "Pressures, PD, PRP, PRF, duty factor, frequency, intensities, and the beam profile", lesson: "u14-l9" },
    { front: "Calorimeter / acoustic power balance", back: "Measures total acoustic power in watts", lesson: "u14-l9" },
    { front: "Thermocouple", back: "Measures actual temperature rise in a tissue-mimicking phantom during exposure", lesson: "u14-l9" },
    { front: "What does 'derated' mean (ISPTA.3)?", back: "The water-tank value corrected for tissue attenuation at 0.3 dB/cm/MHz to estimate in-situ exposure", lesson: "u14-l9" }
  ],

  questions: [
    { id: "u14-q1", type: "mc", q: "Intensity is correctly defined as:", choices: ["Power multiplied by beam area", "Power divided by beam area", "Energy divided by frequency", "Amplitude divided by beam area"], answer: 1, explain: "Intensity is the concentration of power: power ÷ area, in W/cm². Multiplying by area would make a wider beam more intense, which is backwards — a wider beam spreads the same power more thinly.", objectives: ["u14-o1"], lesson: "u14-l1", level: 1 },
    { id: "u14-q2", type: "mc", q: "A beam is focused so that its cross-sectional area becomes one quarter of its unfocused value, with the acoustic power unchanged. The intensity at that point:", choices: ["Is one quarter as large", "Is unchanged", "Is four times as large", "Is sixteen times as large"], answer: 2, explain: "Intensity = power ÷ area, so dividing the area by 4 multiplies intensity by 4. 'Unchanged' is tempting because the power really is unchanged — but intensity depends on how that power is concentrated.", objectives: ["u14-o1"], lesson: "u14-l1", level: 2 },
    { id: "u14-q3", type: "mc", q: "The beam uniformity ratio is:", choices: ["SA ÷ SP, and is always less than 1", "SP ÷ SA, and is always 1 or greater", "SP × SA, with units of W/cm²", "TA ÷ PA, and equals the duty factor"], answer: 1, explain: "BUR = spatial peak ÷ spatial average, unitless, never below 1 because the peak cannot be smaller than the average. TA ÷ PA is indeed the duty factor, but that is a temporal relationship, not the BUR.", objectives: ["u14-o2"], lesson: "u14-l2", level: 1 },
    { id: "u14-q4", type: "mc", q: "For any real sound beam, which statement is always true?", choices: ["Spatial average is greater than spatial peak", "Spatial peak is greater than or equal to spatial average", "Spatial peak equals spatial average in a focused beam", "Spatial peak and spatial average are unrelated"], answer: 1, explain: "The peak is the largest value in the profile, so it cannot be less than the average of that profile. Focusing makes the beam LESS uniform, so SP and SA diverge further — they do not become equal.", objectives: ["u14-o2"], lesson: "u14-l2", level: 2 },
    { id: "u14-q5", type: "mc", q: "Temporal average intensity is obtained from pulse average intensity by:", choices: ["Multiplying by the duty factor", "Dividing by the duty factor", "Multiplying by the beam uniformity ratio", "Dividing by the pulse repetition frequency"], answer: 0, explain: "TA = PA × duty factor, because the temporal average spreads the pulse's energy across the long silent listening time. Dividing by the duty factor would make TA larger than PA, which is impossible.", objectives: ["u14-o3"], lesson: "u14-l3", level: 2 },
    { id: "u14-q6", type: "mc", q: "In continuous wave operation, which relationship holds?", choices: ["Temporal average equals pulse average, because the duty factor is 1", "Temporal average is 100 times pulse average", "Temporal average is zero", "Pulse average cannot be defined, so temporal peak is used instead"], answer: 0, explain: "CW transmits all the time, so the duty factor is 1 (100%) and TA = PA × 1 = PA. That is precisely why CW Doppler carries a relatively high thermal burden despite modest peak pressures.", objectives: ["u14-o3"], lesson: "u14-l3", level: 2 },
    { id: "u14-q7", type: "mc", q: "Which of the six intensities is the highest?", choices: ["SPTA", "SATA", "SPTP", "SATP"], answer: 2, explain: "SPTP combines the worst place (spatial peak) with the worst instant (temporal peak), so nothing can exceed it. SPTA is high too, but averaging over all the silent listening time drags it well below SPTP.", objectives: ["u14-o4"], lesson: "u14-l4", level: 1 },
    { id: "u14-q8", type: "mc", q: "Which of the six intensities is the lowest?", choices: ["SATA", "SAPA", "SPTA", "SATP"], answer: 0, explain: "SATA averages over the whole beam AND over all time, so it is the gentlest number of the set. SAPA is close but still excludes the silent listening period from its average.", objectives: ["u14-o4"], lesson: "u14-l4", level: 1 },
    { id: "u14-q9", type: "mc", q: "Which intensity is most relevant to tissue heating and is used in regulatory limits?", choices: ["SPTP", "SPTA", "SATP", "SAPA"], answer: 1, explain: "Heating depends on energy delivered over time at the worst location, which is exactly SPTA. SPTP describes the peak of a single pulse and predicts mechanical effects such as cavitation, not temperature.", objectives: ["u14-o4", "u14-o5"], lesson: "u14-l4", level: 2 },
    { id: "u14-q10", type: "mc", q: "Which mechanism converts ultrasound energy into heat, and which tissue is most affected?", choices: ["Reflection; fluid-filled structures", "Scattering; blood", "Absorption; bone", "Refraction; fat"], answer: 2, explain: "Only absorption turns acoustic energy into thermal energy, and bone has by far the highest absorption, so bone and the tissue beside it heat most. Reflection and scattering redirect energy rather than converting it to heat.", objectives: ["u14-o5"], lesson: "u14-l5", level: 1 },
    { id: "u14-q11", type: "mc", q: "The thermal index is best described as:", choices: ["The measured temperature of the tissue in °C", "The ratio of the power used to the power needed to raise the tissue 1 °C", "The number of degrees the transducer face rises", "The ratio of spatial peak to spatial average intensity"], answer: 1, explain: "TI is a unitless estimate, not a measurement: it compares the power in use to the power that would produce a 1 °C rise in the modelled tissue. It is not a thermometer reading, which is the most tempting misreading.", objectives: ["u14-o5"], lesson: "u14-l5", level: 2 },
    { id: "u14-q12", type: "mc", q: "You are scanning a third-trimester fetus with ossified bone near the focal zone. Which thermal index should you watch?", choices: ["TIS", "TIB", "TIC", "MI"], answer: 1, explain: "TIB models bone at or near the focus, which is the third-trimester situation. TIS assumes soft tissue only (appropriate early in pregnancy), and TIC models bone right at the surface, as in transcranial scanning.", objectives: ["u14-o5", "u14-o7"], lesson: "u14-l5", level: 2 },
    { id: "u14-q13", type: "mc", q: "Stable cavitation differs from transient cavitation in that:", choices: ["Stable bubbles oscillate and persist, while transient bubbles collapse violently", "Stable cavitation only occurs above MI 1.9", "Stable cavitation produces shock waves and free radicals", "Transient cavitation requires no gas nuclei"], answer: 0, explain: "Stable (non-inertial) bubbles expand and contract cycle after cycle, causing microstreaming; transient (inertial) bubbles implode, producing shock waves and free radicals. Both require pre-existing gas bodies to start.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q14", type: "mc", q: "Keeping the peak rarefactional pressure constant, increasing the operating frequency from 4 MHz to 16 MHz changes the MI by what factor?", choices: ["It doubles", "It halves", "It quadruples", "It is unchanged"], answer: 1, explain: "MI = pressure ÷ √frequency; √4 = 2 and √16 = 4, so the denominator doubles and MI halves. Assuming MI rises with frequency is the classic error — heating rises with frequency, but MI falls.", objectives: ["u14-o6"], lesson: "u14-l6", level: 3 },
    { id: "u14-q15", type: "mc", q: "Which quantity appears in the numerator of the mechanical index?", choices: ["Peak compressional pressure", "Peak rarefactional pressure", "Temporal average intensity", "Acoustic power"], answer: 1, explain: "Cavitation happens when the wave pulls tissue apart, so MI uses the peak rarefactional (negative) pressure in MPa. Compressional pressure pushes tissue together and does not create bubbles.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q16", type: "mc", q: "Under the Output Display Standard, TI and MI must be displayed:", choices: ["On every system at all times, regardless of capability", "Whenever the system is capable of producing an index value above 1.0", "Only during obstetric examinations", "Only when contrast agents are in use"], answer: 1, explain: "The AIUM/NEMA standard requires real-time display when the machine can exceed an index of 1. Restricting the rule to OB or contrast studies is tempting because those are the situations you care most, but the requirement is about machine capability.", objectives: ["u14-o7"], lesson: "u14-l7", level: 1 },
    { id: "u14-q17", type: "mc", q: "The image is too dark. Which action follows ALARA best?", choices: ["Increase the acoustic output power", "Increase the receiver gain", "Increase the frame rate", "Increase the wall filter"], answer: 1, explain: "Receiver gain amplifies echoes after they return and adds nothing to patient exposure, so try it first; output power is the control that actually raises TI and MI. Frame rate and wall filter do not brighten the image.", objectives: ["u14-o7"], lesson: "u14-l7", level: 2 },
    { id: "u14-q18", type: "mc", q: "According to AIUM, no confirmed bioeffects have occurred in mammalian tissue exposed to UNFOCUSED beams below an SPTA of:", choices: ["10 mW/cm²", "100 mW/cm²", "720 mW/cm²", "1,000 mW/cm²"], answer: 1, explain: "The unfocused threshold is 100 mW/cm²; 1,000 mW/cm² (1 W/cm²) is the focused-beam figure, and 720 mW/cm² is the FDA regulatory ceiling for derated SPTA — three different numbers that are easy to swap.", objectives: ["u14-o8"], lesson: "u14-l8", level: 1 },
    { id: "u14-q19", type: "mc", q: "For FOCUSED beams, the AIUM no-confirmed-effects threshold for SPTA is:", choices: ["100 mW/cm²", "1 W/cm²", "1 mW/cm²", "10 W/cm²"], answer: 1, explain: "Focused beams: 1 W/cm² = 1,000 mW/cm², ten times the unfocused figure. Choosing 100 mW/cm² confuses the two beam types — remember 'a hundred milli unfocused, a whole watt focused.'", objectives: ["u14-o8"], lesson: "u14-l8", level: 2 },
    { id: "u14-q20", type: "mc", q: "A study exposing cultured cells in a dish to high-intensity ultrasound is an example of:", choices: ["In vivo research", "In vitro research", "Epidemiology", "A clinical trial"], answer: 1, explain: "In vitro literally means 'in glass' — cells outside a living organism, with no blood flow to cool them and no repair mechanisms, so results do not transfer directly to patients. In vivo means within a living organism.", objectives: ["u14-o9"], lesson: "u14-l8", level: 1 },
    { id: "u14-q21", type: "mc", q: "A hydrophone directly measures:", choices: ["Total acoustic power in watts", "Pressure as a function of time", "Tissue temperature rise", "Beam uniformity ratio"], answer: 1, explain: "A hydrophone is a tiny receiving transducer that converts pressure into voltage, giving a pressure-versus-time trace; pressures, pulse timing and intensities are then derived from it. Total power comes from a calorimeter or power balance.", objectives: ["u14-o10"], lesson: "u14-l9", level: 1 },
    { id: "u14-q22", type: "mc", q: "Which instrument is used to measure the actual temperature rise produced in a tissue-mimicking phantom?", choices: ["Hydrophone", "Thermocouple", "Calorimeter", "Schlieren system"], answer: 1, explain: "A thermocouple (or thermistor) embedded in the phantom reads temperature directly. A calorimeter infers total acoustic power from heat deposited in an absorber, and a Schlieren system only visualizes the beam optically.", objectives: ["u14-o10"], lesson: "u14-l9", level: 2 },
    { id: "u14-q23", type: "mc", q: "During a contrast-enhanced study, which index is most important to keep low, and why?", choices: ["TI, because microbubbles absorb heat", "MI, because a high MI destroys microbubbles and raises cavitation risk", "TIC, because the probe is on bone", "The beam uniformity ratio, because the bubbles are off axis"], answer: 1, explain: "Microbubbles are gas bodies, exactly what cavitation needs; a low MI keeps them oscillating (stable cavitation) instead of imploding. TI concerns heating, which is not the limiting factor in contrast imaging.", objectives: ["u14-o7", "u14-o6"], lesson: "u14-l7", level: 2 },
    { id: "u14-q24", type: "mc", q: "SPPA is 200 W/cm² and the duty factor is 0.5%. What is SPTA?", choices: ["100 mW/cm²", "400 mW/cm²", "1,000 mW/cm²", "4 W/cm²"], answer: 2, explain: "SPTA = SPPA × duty factor = 200 × 0.005 = 1.0 W/cm² = 1,000 mW/cm². Forgetting to convert the percentage (using 0.5 instead of 0.005) or dividing instead of multiplying produces the other choices.", objectives: ["u14-o3", "u14-o1"], lesson: "u14-l3", level: 3 },

    { id: "u14-q25", type: "tf", q: "Spatial average intensity can be greater than spatial peak intensity in a strongly focused beam.", answer: false, explain: "False. The peak is the largest value in the beam profile, so no average of that profile can exceed it. Focusing actually increases the gap between SP and SA, raising the beam uniformity ratio.", objectives: ["u14-o2"], lesson: "u14-l2", level: 1 },
    { id: "u14-q26", type: "tf", q: "Temporal average intensity is always less than or equal to pulse average intensity.", answer: true, explain: "True. TA = PA × duty factor and the duty factor never exceeds 1, so TA ≤ PA, with equality only in continuous wave where the machine never stops transmitting.", objectives: ["u14-o3"], lesson: "u14-l3", level: 2 },
    { id: "u14-q27", type: "tf", q: "Raising the operating frequency raises the mechanical index.", answer: false, explain: "False. MI = peak rarefactional pressure ÷ √frequency, so a higher frequency lowers MI. Higher frequency does increase absorption and therefore heating, which is probably why the relationship feels like it should go the other way.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q28", type: "tf", q: "Bone absorbs more ultrasound than soft tissue, so tissue at a bone surface heats faster.", answer: true, explain: "True — bone's high absorption is why TIB and TIC exist and why later-pregnancy obstetric and transcranial scanning are the thermal concerns. Fluid, at the other extreme, absorbs very little.", objectives: ["u14-o5"], lesson: "u14-l5", level: 1 },
    { id: "u14-q29", type: "tf", q: "Epidemiological studies have confirmed harmful effects from diagnostic ultrasound in human populations.", answer: false, explain: "False. Epidemiological studies have not confirmed harmful effects at diagnostic exposure levels. Note the wording: that is not the same as proving zero risk, which statistics cannot do.", objectives: ["u14-o9"], lesson: "u14-l8", level: 2 },
    { id: "u14-q30", type: "tf", q: "The AIUM no-confirmed-effects threshold is higher for focused beams (1 W/cm²) than for unfocused beams (100 mW/cm²).", answer: true, explain: "True — the focused figure is ten times the unfocused one, because a focused beam concentrates energy in a small volume for a short time as it is swept. Both figures are SPTA values.", objectives: ["u14-o8"], lesson: "u14-l8", level: 1 },

    { id: "u14-q31", type: "short", q: "What are the units of intensity?", answer: "W/cm²", accept: ["w/cm2", "w/cm²", "watts per cm2", "watts per square centimeter", "mw/cm2", "mw/cm²", "milliwatts per cm2"], explain: "Intensity is power per unit area, so watts (or milliwatts) per square centimetre. Watts alone would be power, not intensity.", objectives: ["u14-o1"], lesson: "u14-l1", level: 1 },
    { id: "u14-q32", type: "short", q: "What is the name of the ratio of spatial peak intensity to spatial average intensity?", answer: "beam uniformity ratio", accept: ["beam uniformity ratio", "bur", "sp/sa factor", "sp to sa factor", "spatial peak to spatial average factor"], explain: "The beam uniformity ratio (SP/SA factor) is unitless and always at least 1; it describes how non-uniform the beam profile is.", objectives: ["u14-o2"], lesson: "u14-l2", level: 1 },
    { id: "u14-q33", type: "short", q: "Pulse average intensity is multiplied by what quantity to obtain temporal average intensity?", answer: "duty factor", accept: ["duty factor", "df", "duty cycle"], explain: "The duty factor is the fraction of time the system transmits, so it converts the in-pulse average to an over-all-time average: TA = PA × DF.", objectives: ["u14-o3"], lesson: "u14-l3", level: 1 },
    { id: "u14-q34", type: "short", q: "Which of the six intensities is quoted for thermal risk and regulatory limits?", answer: "SPTA", accept: ["spta", "spatial peak temporal average", "ispta"], explain: "SPTA reflects energy delivered over time at the beam's hottest location, which is what determines heating. SPTP is the mechanical-effects number.", objectives: ["u14-o4"], lesson: "u14-l4", level: 1 },
    { id: "u14-q35", type: "short", q: "Which attenuation mechanism converts sound into heat?", answer: "absorption", accept: ["absorption", "absorbtion", "absorption of sound"], explain: "Absorption is the only component of attenuation that becomes thermal energy; reflection, scattering and refraction merely redirect the sound.", objectives: ["u14-o5"], lesson: "u14-l5", level: 1 },
    { id: "u14-q36", type: "short", q: "What is the name for cavitation in which bubbles grow and then violently implode?", answer: "transient cavitation", accept: ["transient cavitation", "transient", "inertial cavitation", "inertial", "collapse cavitation"], explain: "Transient (inertial) cavitation concentrates energy at collapse, producing shock waves, extreme local temperatures and free radicals. Stable cavitation, by contrast, is bubbles oscillating without collapsing.", objectives: ["u14-o6"], lesson: "u14-l6", level: 1 },
    { id: "u14-q37", type: "short", q: "In the mechanical index, what is the denominator?", answer: "square root of frequency", accept: ["square root of frequency", "root frequency", "sqrt of frequency", "square root of the frequency in mhz", "√f"], explain: "MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz), so higher frequencies reduce MI — the rarefaction phase is shorter, giving bubbles less time to grow.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q38", type: "short", q: "What does the acronym ALARA stand for?", answer: "As Low As Reasonably Achievable", accept: ["as low as reasonably achievable", "alara", "as low as reasonably achievable exposure"], explain: "ALARA balances diagnostic benefit against exposure: lowest output, shortest time, only with a medical indication. It does not mean avoiding ultrasound.", objectives: ["u14-o7"], lesson: "u14-l7", level: 1 },
    { id: "u14-q39", type: "short", q: "Which instrument measures pressure versus time in a water tank to characterize a transducer's output?", answer: "hydrophone", accept: ["hydrophone", "a hydrophone", "needle hydrophone", "membrane hydrophone"], explain: "A hydrophone is a tiny transducer using the direct piezoelectric effect. From its trace you derive pulse duration, PRP, PRF, duty factor, pressures and intensities; a calorimeter would give total power instead.", objectives: ["u14-o10"], lesson: "u14-l9", level: 1 }
  ],

  drills: [
    {
      id: "u14-d1",
      title: "Rank the intensities",
      formula: "SPTP > SPPA > SPTA > SATP > SAPA > SATA",
      lesson: "u14-l4",
      gen: function (rnd) {
        var names = ["SPTP", "SPPA", "SPTA", "SATP", "SAPA", "SATA"];
        var idx = [0, 1, 2, 3, 4, 5];
        var picked = [];
        while (picked.length < 3 && idx.length) {
          var j = Math.floor(rnd() * idx.length); if (j >= idx.length) j = idx.length - 1;
          picked.push(idx.splice(j, 1)[0]);
        }
        var highest = rnd() < 0.5;
        var best = picked[0];
        for (var k = 1; k < picked.length; k++) {
          if (highest ? picked[k] < best : picked[k] > best) best = picked[k];
        }
        var choices = [], ans = 0;
        for (var c = 0; c < picked.length; c++) { choices.push(names[picked[c]]); if (picked[c] === best) ans = c; }
        return {
          kind: "choice",
          given: "Three intensities: " + choices.join(", ") + ".",
          ask: "Which one is " + (highest ? "the HIGHEST" : "the LOWEST") + "?",
          choices: choices,
          answer: ans,
          steps: [
            "Standard ranking, highest to lowest: SPTP, SPPA, SPTA, SATP, SAPA, SATA.",
            "Peaks come before averages; inside each group the order is TP, PA, TA.",
            (highest ? "Highest" : "Lowest") + " of these is " + names[best] + "."
          ]
        };
      }
    },
    {
      id: "u14-d2",
      title: "Temporal average from pulse average",
      formula: "temporal average = pulse average × duty factor",
      lesson: "u14-l3",
      gen: function (rnd) {
        var pas = [80, 100, 120, 150, 200, 240];
        var dfs = [0.1, 0.2, 0.5, 1.0];
        var i = Math.floor(rnd() * pas.length); if (i >= pas.length) i = pas.length - 1;
        var j = Math.floor(rnd() * dfs.length); if (j >= dfs.length) j = dfs.length - 1;
        var pa = pas[i], dfPct = dfs[j];
        var mw = pa * dfPct * 10;
        return {
          kind: "number",
          given: "SPPA = " + pa + " W/cm², duty factor = " + dfPct + " %",
          ask: "What is SPTA in mW/cm²?",
          answer: +mw.toFixed(2),
          unit: "mW/cm²",
          tol: 1,
          steps: [
            "Duty factor as a fraction = " + dfPct + " ÷ 100 = " + (dfPct / 100),
            "SPTA = SPPA × duty factor = " + pa + " × " + (dfPct / 100) + " = " + (pa * dfPct / 100).toFixed(3) + " W/cm²",
            "× 1,000 = " + mw.toFixed(1) + " mW/cm²"
          ]
        };
      }
    },
    {
      id: "u14-d3",
      title: "Mechanical index",
      formula: "MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz)",
      lesson: "u14-l6",
      gen: function (rnd) {
        var ps = [0.8, 1.2, 1.5, 1.8, 2.0, 2.4, 3.0];
        var fs = [1, 4, 9, 16];
        var i = Math.floor(rnd() * ps.length); if (i >= ps.length) i = ps.length - 1;
        var j = Math.floor(rnd() * fs.length); if (j >= fs.length) j = fs.length - 1;
        var p = ps[i], f = fs[j];
        var mi = p / Math.sqrt(f);
        return {
          kind: "number",
          given: "Peak rarefactional pressure = " + p + " MPa, frequency = " + f + " MHz",
          ask: "What is the mechanical index?",
          answer: +mi.toFixed(3),
          unit: "",
          tol: 0.02,
          steps: [
            "MI = peak rarefactional pressure ÷ √frequency",
            "√" + f + " = " + Math.sqrt(f),
            "MI = " + p + " ÷ " + Math.sqrt(f) + " = " + mi.toFixed(2) + " (unitless)"
          ]
        };
      }
    },
    {
      id: "u14-d4",
      title: "Which index applies?",
      formula: "TIS / TIB / TIC / MI",
      lesson: "u14-l7",
      gen: function (rnd) {
        var opts = [
          "TIS (soft-tissue thermal index)",
          "TIB (bone-at-the-focus thermal index)",
          "TIC (cranial-bone thermal index)",
          "MI (mechanical index)"
        ];
        var items = [
          { s: "First-trimester obstetric scan, before fetal bone has ossified.", a: 0 },
          { s: "Routine abdominal survey of the liver and kidneys.", a: 0 },
          { s: "Superficial small-parts scan of the thyroid.", a: 0 },
          { s: "Third-trimester fetal biometry with ossified bone near the focal zone.", a: 1 },
          { s: "Second-trimester spine and femur imaging with the focus at fetal bone.", a: 1 },
          { s: "Adult transcranial Doppler through the temporal window.", a: 2 },
          { s: "Neonatal head scan through the fontanelle with skull bone at the surface.", a: 2 },
          { s: "Contrast-enhanced liver study with injected microbubbles.", a: 3 },
          { s: "Imaging lung surface or bowel, where gas bodies are present.", a: 3 }
        ];
        var i = Math.floor(rnd() * items.length); if (i >= items.length) i = items.length - 1;
        var item = items[i];
        return {
          kind: "choice",
          given: item.s,
          ask: "Which index is the one to watch?",
          choices: opts,
          answer: item.a,
          steps: [
            "Gas bodies (contrast, lung, bowel) → cavitation risk → MI.",
            "Heating risk → a thermal index: TIS soft tissue only, TIB bone at/near the focus, TIC bone at the surface.",
            "Correct: " + opts[item.a] + "."
          ]
        };
      }
    },
    {
      id: "u14-d5",
      title: "Unfocused vs focused AIUM threshold",
      formula: "unfocused 100 mW/cm² SPTA · focused 1,000 mW/cm² SPTA",
      lesson: "u14-l8",
      gen: function (rnd) {
        var focused = rnd() < 0.5;
        var threshold = focused ? 1000 : 100;
        var below = rnd() < 0.5;
        var factors = [0.2, 0.4, 0.6, 0.8];
        var overs = [1.5, 2, 3, 5];
        var value;
        if (below) {
          var i = Math.floor(rnd() * factors.length); if (i >= factors.length) i = factors.length - 1;
          value = Math.round(threshold * factors[i]);
        } else {
          var j = Math.floor(rnd() * overs.length); if (j >= overs.length) j = overs.length - 1;
          value = Math.round(threshold * overs[j]);
        }
        return {
          kind: "choice",
          given: (focused ? "A FOCUSED" : "An UNFOCUSED") + " beam with an SPTA of " + value + " mW/cm².",
          ask: "Is this below the AIUM no-confirmed-effects threshold for that beam type?",
          choices: ["Yes — below the threshold", "No — above the threshold"],
          answer: below ? 0 : 1,
          steps: [
            "Unfocused threshold: SPTA 100 mW/cm². Focused threshold: SPTA 1 W/cm² = 1,000 mW/cm².",
            "This beam is " + (focused ? "focused" : "unfocused") + ", so compare " + value + " mW/cm² with " + threshold + " mW/cm².",
            value + " is " + (below ? "below" : "above") + " " + threshold + " mW/cm²."
          ]
        };
      }
    },
    {
      id: "u14-d6",
      title: "Intensity from power and area",
      formula: "intensity = power ÷ area",
      lesson: "u14-l1",
      gen: function (rnd) {
        var powers = [10, 20, 30, 40, 60, 100];
        var areas = [0.5, 1, 2, 4, 5];
        var i = Math.floor(rnd() * powers.length); if (i >= powers.length) i = powers.length - 1;
        var j = Math.floor(rnd() * areas.length); if (j >= areas.length) j = areas.length - 1;
        var p = powers[i], a = areas[j];
        var I = p / a;
        return {
          kind: "number",
          given: "Acoustic power = " + p + " mW, beam cross-sectional area = " + a + " cm²",
          ask: "What is the spatial average intensity in mW/cm²?",
          answer: +I.toFixed(2),
          unit: "mW/cm²",
          tol: 0.2,
          steps: [
            "intensity = power ÷ area",
            "= " + p + " mW ÷ " + a + " cm²",
            "= " + I.toFixed(1) + " mW/cm² (this is the spatial AVERAGE, since it uses the whole beam area)"
          ]
        };
      }
    }
  ],

  whiteboard: [
    {
      id: "u14-w1",
      prompt: "Draw the beam profile and the pulse timeline, label all six intensities on them, and write the relationships that connect them.",
      keyPoints: [
        "Beam profile: spatial peak at the centre, spatial average across the whole area",
        "SP ≥ SA always; BUR = SP ÷ SA ≥ 1, unitless",
        "Timeline: temporal peak (instant), pulse average (pulse only), temporal average (whole PRP)",
        "TP ≥ PA ≥ TA always",
        "Duty factor = PD ÷ PRP; imaging 0.1–1%, CW 100%",
        "TA = PA × duty factor, so SPTA = SPPA × DF",
        "Ranking: SPTP > SPPA > SPTA > SATP > SAPA > SATA",
        "SPTA = thermal/regulatory number; SPTP and SPPA = mechanical/cavitation",
        "Intensity = power ÷ area, in W/cm² or mW/cm²"
      ],
      minutes: 8,
      lesson: "u14-l4"
    },
    {
      id: "u14-w2",
      prompt: "Write everything about the thermal mechanism: what causes heating, what increases it, and how the thermal index works.",
      keyPoints: [
        "Absorption is the only attenuation mechanism that makes heat",
        "Bone absorbs most; adjacent soft tissue heats with it",
        "Heating ↑ with SPTA, output power, duty factor, dwell time, frequency",
        "Heating ↓ with perfusion (blood flow cools); eye and embryo cool poorly",
        "Parked-beam modes (spectral Doppler, M-mode) heat more than sweeping 2D",
        "TI = power used ÷ power needed for a 1 °C rise; unitless estimate, not a thermometer",
        "TIS soft tissue, TIB bone at/near focus (later OB), TIC bone at surface (transcranial)",
        "A rise of about 1 °C or less is not considered hazardous",
        "Keep TI low, dwell time short, and the probe moving"
      ],
      minutes: 7,
      lesson: "u14-l5"
    },
    {
      id: "u14-w3",
      prompt: "Write everything about cavitation and the mechanical index, then list the ODS and ALARA rules.",
      keyPoints: [
        "Cavitation occurs during the rarefaction phase and needs a gas body",
        "Stable (non-inertial): bubbles oscillate, persist, cause microstreaming",
        "Transient (inertial): bubbles implode; shock waves, extreme local heat/pressure, free radicals",
        "MI = peak rarefactional pressure (MPa) ÷ √frequency (MHz); unitless",
        "↑ rarefactional pressure → ↑ MI; ↑ frequency → ↓ MI; ↓ output → ↓ MI",
        "Watch MI with contrast agents, lung and bowel gas",
        "ODS (AIUM/NEMA + FDA): display TI and MI whenever an index can exceed 1.0",
        "ALARA: lowest output, shortest time, medical indication only",
        "Lower output first, then raise receiver gain — gain does not reach the patient",
        "FDA ceilings for most applications: derated SPTA 720 mW/cm², MI 1.9"
      ],
      minutes: 8,
      lesson: "u14-l6"
    },
    {
      id: "u14-w4",
      prompt: "Write the safety evidence and the measurement toolkit: what the AIUM says, the three kinds of studies, and what each measuring instrument gives you.",
      keyPoints: [
        "No confirmed bioeffects at exposures typical of current diagnostic instruments",
        "Unfocused: no confirmed effects below SPTA 100 mW/cm²",
        "Focused: no confirmed effects below SPTA 1 W/cm² (1,000 mW/cm²)",
        "Typical diagnostic SPTA is roughly 0.1–100 mW/cm²; Doppler highest, 2D lowest",
        "In vitro = cells in a dish (no perfusion or repair)",
        "In vivo = living organisms (effects above diagnostic levels: lung, intestinal bleeding)",
        "Epidemiology = human populations; no confirmed effects, cannot prove zero risk",
        "Scan only with a medical indication; keepsake imaging is inappropriate",
        "Hydrophone → pressure vs time → PD, PRP, PRF, duty factor, pressures, intensities, beam profile",
        "Calorimeter / power balance → total acoustic power; thermocouple → temperature rise",
        "Water measurements are derated at 0.3 dB/cm/MHz (ISPTA.3)"
      ],
      minutes: 9,
      lesson: "u14-l9"
    }
  ]
});
