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
    { id: "u14-o4", text: "Compare the six named intensities using the valid spatial and temporal partial orders, and explain why crossed averages cannot always be ranked." },
    { id: "u14-o5", text: "Explain the thermal mechanism of bioeffects, list the factors that increase tissue heating, and define the thermal index and its three flavours (TIS, TIB, TIC)." },
    { id: "u14-o6", text: "Explain cavitation, compare stable with transient (inertial) cavitation, and calculate and interpret the mechanical index." },
    { id: "u14-o7", text: "Describe the Output Display Standard and apply ALARA at the machine, naming the controls that change patient exposure." },
    { id: "u14-o8", text: "State the current AIUM safety conclusion, distinguish absence of confirmed human harm from proof of zero risk, and interpret historical course figures and application-specific output limits cautiously." },
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
<div class="steps"><ol><li>Given power = 40 mW and beam area = 2 cm².</li><li>Intensity = 40 mW ÷ 2 cm².</li><li>Intensity = 20 mW/cm².</li></ol></div>
<p><span class="kw">Acoustic power</span> is measured in watts (W) or milliwatts (mW) and is determined by the machine's output/transmit control — the one control that genuinely changes how much energy enters the patient. <span class="kw">Intensity</span> is measured in <b>W/cm²</b> or <b>mW/cm²</b>. Because area is in the denominator, intensity and beam area are <b>inversely</b> related: focus the beam so the area is one quarter as large and the intensity becomes four times as large, with no change in power at all.</p>
<p>Two practical consequences. First, concentrating the same power into a smaller measured area raises intensity. Second, receiver gain brightens the image without changing transmitted exposure, while output, mode, PRF, pulse duration, focus and dwell time can affect exposure.</p>
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
        "At constant power, intensity and measured beam area are inversely related",
        "Intensity is proportional to amplitude squared",
        "Output/acoustic power changes exposure; receiver gain does not"
      ]
    },

    {
      id: "u14-l2",
      title: "Spatial peak vs spatial average, and the beam uniformity ratio",
      objectives: ["u14-o2", "u14-o1"],
      html: `<p class="lead">Slice the beam across and the intensity is not flat: it is hottest in the middle and weakest at the edges. That shape gives us two spatial numbers.</p>
<p>Picture the beam end-on as a shower head with an uneven spray. "How hard is it hitting at the worst spot?" is the <span class="kw">spatial peak (SP)</span> intensity — the maximum anywhere in the measured beam profile, often near the beam axis or focus but not guaranteed to be at the geometric centre. "How hard is it hitting on average across the whole beam?" is the <span class="kw">spatial average (SA)</span> intensity — total power divided by the measured cross-sectional area.</p>
<p>Because a peak can never be smaller than an average of which it is the largest member, <b>SP is always greater than or equal to SA</b>. The number that links them is the <span class="kw">beam uniformity ratio (BUR)</span>, also called the SP/SA factor:</p>
<div class="formula">BUR = spatial peak intensity ÷ spatial average intensity</div>
<p>BUR is unitless and is always 1 or greater. A BUR of 1 describes a perfectly flat measured profile; a BUR of 5 means the measured hot spot is five times the average. Rearranged: <span class="kw-2">SA = SP ÷ BUR</span> and <span class="kw-2">SP = SA × BUR</span>.</p>
<div class="callout key">SP ≥ SA, always. BUR = SP ÷ SA ≥ 1, unitless. BUR depends on the beam profile; aperture and focusing choices can change that profile, but focusing does not guarantee a particular change in BUR.</div>
<div class="steps"><ol><li>Given SP = 12 W/cm² and SA = 3 W/cm².</li><li>BUR = SP ÷ SA = 12 ÷ 3.</li><li>BUR = 4, meaning the measured peak is four times the spatial average.</li></ol></div>
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
        "Spatial peak = highest intensity anywhere in the measured beam profile; not necessarily the exact geometric centre",
        "Spatial average = power divided by the whole beam cross-sectional area",
        "SP is always ≥ SA",
        "BUR = SP ÷ SA, unitless, always ≥ 1",
        "SA = SP ÷ BUR; BUR depends on beam profile, which aperture and focusing can alter"
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
<div class="steps"><ol><li>Given PD = 2 µs and PRP = 200 µs, DF = 2 ÷ 200 = 0.01 = 1%.</li><li>If PA = 100 W/cm², TA = 100 × 0.01.</li><li>TA = 1 W/cm².</li></ol></div>
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
<text x="106" y="92" fill="var(--c3)" font-size="15">PA = TP for these ideal flat pulses</text>
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
<table class="dt"><tr><th>Same temporal statistic</th><th>Same spatial statistic</th></tr>
<tr><td>SPTP ≥ SATP</td><td>SPTP ≥ SPPA ≥ SPTA</td></tr>
<tr><td>SPPA ≥ SAPA</td><td>SATP ≥ SAPA ≥ SATA</td></tr>
<tr><td>SPTA ≥ SATA</td><td>Equality is possible for a flat profile or CW</td></tr></table>
<p>These are <b>partial orders</b>. <span class="kw">SPTP</span> is highest and <span class="kw">SATA</span> is lowest, but crossed comparisons such as SPTA versus SATP cannot be decided from the abbreviations alone. They depend on both beam uniformity and duty factor.</p>
<div class="steps"><ol><li>Suppose SPPA = 100 W/cm² and SAPA = 50 W/cm², with a flat pulse and duty factor 0.01.</li><li>SPTA = SPPA × DF = 1 W/cm².</li><li>SATP equals the spatial-average pulse peak here: 50 W/cm².</li><li>Therefore SATP &gt; SPTA. This counterexample disproves a universal six-item chain.</li></ol></div>
<p><span class="kw">SPTA</span> is useful for thermal exposure because it averages over time at the highest-output location. Mechanical effects are assessed with acoustic pressure and MI; SPTP or SPPA alone does not predict cavitation.</p>
<div class="callout tip">Compare down a row or column. If both the spatial and temporal suffix change in opposite directions, say “cannot determine” without more data.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Grid of the six intensities with their ranking from highest to lowest</title>
<text x="150" y="40" fill="var(--c3)" font-size="16">TP</text>
<text x="290" y="40" fill="var(--c3)" font-size="16">PA</text>
<text x="430" y="40" fill="var(--c3)" font-size="16">TA</text>
<text x="20" y="96" fill="var(--c3)" font-size="16">SP</text>
<text x="20" y="176" fill="var(--c3)" font-size="16">SA</text>
<rect x="110" y="62" width="120" height="48" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="126" y="92" fill="currentColor" font-size="16">SPTP</text>
<rect x="250" y="62" width="120" height="48" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="266" y="92" fill="currentColor" font-size="16">SPPA</text>
<rect x="390" y="62" width="120" height="48" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="406" y="92" fill="currentColor" font-size="16">SPTA</text>
<rect x="110" y="142" width="120" height="48" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="126" y="172" fill="currentColor" font-size="16">SATP</text>
<rect x="250" y="142" width="120" height="48" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="266" y="172" fill="currentColor" font-size="16">SAPA</text>
<rect x="390" y="142" width="120" height="48" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="406" y="172" fill="currentColor" font-size="16">SATA</text>
<text x="110" y="224" fill="var(--c4)" font-size="16">SPTA = heating</text>
<text x="300" y="224" fill="var(--c4)" font-size="16">crossed cells: need more data</text>
</svg>`,
          caption: "Two spatial choices × three temporal choices form a grid: valid comparisons stay in the same row or column."
        }
      ],
      sayIt: "Say out loud the valid spatial and temporal intensity orders, then explain why SPTA and SATP cannot be ranked without more data.",
      keyPoints: [
        "Name = spatial word then temporal word (SPTA = spatial peak, temporal average)",
        "At the same temporal statistic: SP ≥ SA",
        "At the same spatial statistic: TP ≥ PA ≥ TA",
        "SPTP is highest and SATA lowest; crossed averages may be indeterminate",
        "SPTA is the thermal/regulatory number (heating)",
        "Mechanical effects are assessed using pressure and MI, not intensity alone",
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
<div class="formula">TI = acoustic power used ÷ modelled power for a 1 °C rise</div>
<p>TI is unitless and model-based. A value of 1 corresponds to a model estimate near a 1 °C rise under specified assumptions, but TI is not a thermometer, a worst-case bound, or a guarantee; it can under- or overestimate actual heating. Interpret it with exposure duration, tissue, mode, and geometry.</p>
<table class="dt"><tr><th>Index</th><th>Model</th><th>Use it for</th></tr>
<tr><td>TIS</td><td>soft tissue only</td><td>soft-tissue paths; obstetrics through 10 weeks LMP</td></tr>
<tr><td>TIB</td><td>bone at or near the focus</td><td>obstetrics after 10 weeks LMP</td></tr>
<tr><td>TIC</td><td>bone at the surface</td><td>adult transcranial paths with skull at the surface</td></tr></table>
<div class="callout tip">TIS = soft, TIB = bone at the bottom (down at the focus), TIC = cranium right at the contact surface.</div>
<div class="steps"><ol><li>If acoustic power is 40 mW and the model estimates 20 mW would produce a 1 °C rise,</li><li>TI = 40 ÷ 20 = 2.</li><li>Report TI = 2 as a model indicator, then reduce output or dwell time as practical; do not claim the tissue is exactly 2 °C warmer.</li></ol></div>
<div class="callout key">Temperature and exposure duration both matter. Keep TI and dwell time as low as reasonably achievable, especially in obstetrics and the eye.</div>`,
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
        "TIS through 10 weeks LMP; TIB thereafter; TIC when bone is at the surface, such as adult transcranial imaging",
        "TI is model-based and may underestimate heating; duration and tissue matter"
      ]
    },

    {
      id: "u14-l6",
      title: "Cavitation and the mechanical index",
      objectives: ["u14-o6"],
      html: `<p class="lead">The second mechanism is mechanical: the rarefaction half of the wave pulls on tissue hard enough to make gas bubbles grow, shake, and sometimes implode.</p>
<p>Every cycle has compression and <span class="kw-2">rarefaction</span>. Existing gas bodies in lung, bowel, or injected contrast microbubbles can respond strongly during rarefaction. <span class="kw">Cavitation</span> describes bubble activity, but ultrasound has other mechanical effects too; it does not necessarily create gas nuclei from nothing.</p>
<ul>
<li><span class="kw">Stable cavitation</span> (non-inertial): bubbles form and oscillate — expand and contract — with each cycle, over and over. They stir fluid around themselves (microstreaming), which can stress nearby cell membranes, but they survive. This is the normal behaviour of contrast agents at low output.</li>
<li><span class="kw">Transient cavitation</span> (inertial, sometimes called collapse cavitation): bubbles grow and then violently implode. The collapse concentrates energy into a tiny volume, producing extremely high local temperatures and pressures, shock waves, and free radicals. This is the mechanism with real destructive potential.</li>
</ul>
<p>The on-screen estimate of mechanical risk is the <span class="kw">mechanical index (MI)</span>:</p>
<div class="formula">MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz)</div>
<p>MI uses <b>derated peak rarefactional pressure</b> in MPa and centre frequency in MHz. At fixed pressure, raising frequency lowers MI; if pressure changes too, the result must be recalculated. MI is an indicator, not a guarantee of cavitation. MI 1.9 is an upper limit for many non-ophthalmic Track 3 applications, not a target or a universal limit. Contrast protocols use agent- and task-specific low-MI techniques; bubble behavior is not captured by one universal cutoff.</p>
<div class="steps"><ol><li>Given derated peak rarefactional pressure = 1.2 MPa and frequency = 4 MHz.</li><li>MI = 1.2 ÷ √4 = 1.2 ÷ 2.</li><li>MI = 0.6.</li></ol></div>
<div class="callout tip">Stable bubbles dance; transient bubbles die. At the same rarefactional pressure, frequency up means MI down.</div>
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
<text x="322" y="176" fill="currentColor" font-size="14">collapse: localized heat and pressure</text>
<text x="340" y="200" fill="var(--muted)" font-size="15">shock waves, free radicals</text>
<text x="20" y="236" fill="var(--c4)" font-size="15">MI = derated rarefactional pressure (MPa) ÷ √frequency (MHz)</text>
</svg>`,
          caption: "Stable cavitation oscillates; transient (inertial) cavitation ends in a violent collapse."
        }
      ],
      sayIt: "Say out loud: the difference between stable and transient cavitation, the MI formula, and what happens to MI when you raise the frequency.",
      keyPoints: [
        "Cavitation happens in the rarefaction phase and needs a gas body to start",
        "Stable (non-inertial): bubbles oscillate and persist; microstreaming",
        "Transient (inertial): bubbles implode; shock waves, extreme local temperature, free radicals",
        "MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz); unitless",
        "At fixed pressure, ↑ frequency → ↓ MI; changing pressure requires recalculation",
        "MI 1.9 is a limit for many non-ophthalmic Track 3 applications, not a safe target"
      ]
    },

    {
      id: "u14-l7",
      title: "The Output Display Standard and ALARA",
      objectives: ["u14-o7", "u14-o5", "u14-o6"],
      html: `<p class="lead">You cannot manage what you cannot see. The Output Display Standard puts the two risk estimates on the screen while you scan, so ALARA becomes an action rather than a slogan.</p>
<p>The historical <span class="kw">Output Display Standard (ODS)</span> was developed by AIUM and NEMA; current FDA guidance points to IEC 60601-2-37. A common teaching rule is that equipment capable of an index above 1 displays the applicable index once it exceeds 0.4. The purpose is the durable point: live TI and MI feedback helps the operator see how settings change estimated exposure.</p>
<p>Which one to watch depends on what you are scanning: <b>TI</b> when heating is the concern (obstetrics, long Doppler interrogations, transcranial work, the eye), <b>MI</b> when cavitation is the concern (lung, bowel, and especially contrast agents).</p>
<p><span class="kw">ALARA</span> — As Low As Reasonably Achievable — means using the lowest output and the shortest exposure that still answers the clinical question. A diagnostic image you cannot interpret is not "safe"; ALARA is a balance, not a ban.</p>
<div class="callout key">Practical ALARA, in order: (1) scan only when there is a medical indication; (2) start with output low and raise receiver gain first, since gain costs the patient nothing; (3) prefer 2D sweeping over parked modes (M-mode, spectral Doppler); (4) keep dwell time short and keep the probe moving; (5) reduce total scan time; (6) watch TI and MI as you work.</div>
<div class="callout warn">Receiver gain, TGC, dynamic range and post-processing do not change transmitted exposure. Output power, mode, PRF, pulse duration, focus, dwell time and scan technique can affect exposure; watch the displayed indices rather than assuming one control tells the whole story.</div>
<p>Many non-ophthalmic Track 3 systems use upper limits of derated SPTA <b>720 mW/cm²</b> and MI <b>1.9</b>, while ophthalmic and other applications have different limits. These are regulatory ceilings, not safe operating targets. “Derated” means a water measurement is adjusted to estimate attenuation in tissue.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Screen corner showing the mechanical index and thermal index readouts</title>
<rect x="40" y="30" width="520" height="150" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="56" y="58" fill="var(--muted)" font-size="15">image area</text>
<rect x="380" y="44" width="164" height="72" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="396" y="74" fill="var(--c1)" font-size="16">MI  0.9</text>
<text x="396" y="102" fill="var(--c2)" font-size="16">TIB 0.4</text>
<text x="56" y="100" fill="currentColor" font-size="15">live indices guide</text>
<text x="56" y="124" fill="currentColor" font-size="15">output decisions</text>
<text x="40" y="208" fill="currentColor" font-size="15">MI → cavitation risk (lung, bowel, contrast)</text>
<text x="40" y="234" fill="currentColor" font-size="15">TI → heating risk (OB, Doppler, transcranial, eye)</text>
</svg>`,
          caption: "The ODS keeps MI and TI on screen so output decisions can be made while scanning."
        }
      ],
      sayIt: "Say out loud: what the ODS requires, which index you watch in obstetrics versus with contrast agents, and five practical ALARA moves.",
      keyPoints: [
        "Historical ODS was AIUM/NEMA; current FDA guidance references IEC 60601-2-37",
        "Common teaching rule: capable above 1; display applicable index above 0.4",
        "Indices update live as mode, depth, focus, frequency and output change",
        "TI for heating concerns; MI for cavitation concerns",
        "ALARA = lowest output, shortest time, only when medically indicated",
        "Lower output first and raise receiver gain — gain does not affect the patient",
        "720 mW/cm² and MI 1.9 are upper limits for many non-ophthalmic Track 3 applications, not safety targets"
      ]
    },

    {
      id: "u14-l8",
      title: "What the evidence actually says",
      objectives: ["u14-o8", "u14-o9"],
      html: `<p class="lead">Diagnostic ultrasound has a strong clinical safety record, but absence of independently confirmed harm in human patients is not proof that risk is zero.</p>
<p>Evidence comes in three flavours, and they are not interchangeable.</p>
<ul>
<li><span class="kw">In vitro</span> — cells or tissue in a dish. Cells can repair damage, but the preparation lacks whole-body perfusion, thermal regulation and physiology, so it cannot directly predict patient outcomes.</li>
<li><span class="kw">In vivo</span> — experiments in living organisms. Preclinical biological effects have occurred at some diagnostic exposure conditions, including sensitive gas-containing tissues. Species, anatomy and exposure geometry limit translation to humans.</li>
<li><span class="kw">Epidemiology</span> — studies of large human populations who were scanned, looking for differences in outcomes (birth weight, childhood development, malignancy). These studies have not confirmed harmful effects from diagnostic ultrasound. The limitation: epidemiology is statistical, so it can never prove that risk is exactly zero.</li>
</ul>
<p>The current AIUM conclusion is carefully scoped: in the <b>absence of ultrasound contrast agents</b>, no independently confirmed adverse effects caused by exposure from present diagnostic instruments have been reported in human patients. Preclinical bioeffects at diagnostic exposures exist, and TI can underestimate temperature rise, so prudent use and ALARA remain necessary.</p>
<div class="callout warn">Older course material may quote 100 mW/cm² unfocused and 1 W/cm² focused as historical “no confirmed effects” figures. Treat them as legacy recall values, never as universal safety thresholds or guarantees for a patient, tissue, duration or contrast study.</div>
<p>Also standard: ultrasound should be used only when there is a <b>medical indication</b>. Keepsake fetal imaging and using a Doppler heartbeat monitor for entertainment are considered inappropriate uses, because there is exposure without benefit.</p>
<div class="callout tip">Evidence language matters: “no independently confirmed adverse effects in human patients” does not mean “no biological effect is possible.”</div>`,
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
<text x="30" y="172" fill="currentColor" font-size="14">lacks whole-body physiology</text>
<text x="226" y="172" fill="currentColor" font-size="14">species differences</text>
<text x="410" y="172" fill="currentColor" font-size="15">statistical, never zero</text>
<text x="30" y="204" fill="var(--c4)" font-size="16">human evidence and preclinical evidence answer different questions</text>
</svg>`,
          caption: "Three evidence types and the limitation of each; only epidemiology studies real patients."
        }
      ],
      sayIt: "Say out loud: the limits of in vitro, in vivo and epidemiological evidence, and the current AIUM human-patient conclusion.",
      keyPoints: [
        "In vitro = cells/tissue in a dish; lacks whole-body perfusion and physiology",
        "In vivo = living organisms; preclinical effects can occur at diagnostic exposures",
        "Epidemiology = human populations; no confirmed harmful effects, but cannot prove zero risk",
        "Current AIUM statement: no independently confirmed adverse effects in human patients from present diagnostic instruments, without contrast",
        "100 mW/cm² unfocused and 1 W/cm² focused are legacy course figures, not safety thresholds",
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
<text x="150" y="204" fill="currentColor" font-size="15">hydrophone</text>
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
    { saying: "Rows or columns; crossed needs clues.", meaning: "Compare SP with SA at the same temporal statistic, or TP ≥ PA ≥ TA at the same spatial statistic. Crossed pairs such as SPTA and SATP need more data.", lesson: "u14-l4" },
    { saying: "SPTA tracks heat; MI minds bubbles.", meaning: "SPTA describes time-averaged intensity at the peak location; mechanical risk is assessed using derated rarefactional pressure and MI.", lesson: "u14-l4" },
    { saying: "Ten weeks: soft, then bone; C means cranium at contact.", meaning: "Use TIS through 10 weeks LMP, TIB thereafter in pregnancy, and TIC when bone is at the surface such as adult transcranial imaging.", lesson: "u14-l5" },
    { saying: "Stable bubbles dance; transient bubbles die.", meaning: "Stable (non-inertial) cavitation = bubbles oscillating and surviving with microstreaming; transient (inertial) cavitation = bubbles imploding with shock waves and free radicals.", lesson: "u14-l6" },
    { saying: "Same pressure: frequency up, MI down.", meaning: "At fixed derated peak rarefactional pressure, MI falls as frequency rises; if pressure changes, recalculate.", lesson: "u14-l6" },
    { saying: "Output down, gain up.", meaning: "ALARA in four words: lower the acoustic power (which the patient feels) and compensate with receiver gain (which the patient does not).", lesson: "u14-l7" },
    { saying: "No confirmed harm is not no possible effect.", meaning: "The current human evidence statement does not prove zero risk; preclinical bioeffects and model uncertainty support ALARA.", lesson: "u14-l8" }
  ],

  formulas: [
    { name: "Intensity", expr: "intensity = power ÷ area", units: "W/cm² or mW/cm²", note: "1 W/cm² = 1,000 mW/cm². Intensity is proportional to amplitude squared." },
    { name: "Beam uniformity ratio (SP/SA factor)", expr: "BUR = spatial peak intensity ÷ spatial average intensity", units: "unitless", note: "Always ≥ 1. Rearranged: SA = SP ÷ BUR." },
    { name: "Duty factor", expr: "DF = pulse duration ÷ pulse repetition period", units: "unitless or %", note: "Imaging 0.1–1%; CW = 100% (1.0)." },
    { name: "Temporal average from pulse average", expr: "temporal average = pulse average × duty factor", units: "W/cm²", note: "So SPTA = SPPA × DF; in CW the duty factor is 1, so TA = PA." },
    { name: "Mechanical index", expr: "MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz)", units: "unitless", note: "At fixed pressure, MI falls as frequency rises." },
    { name: "Thermal index", expr: "TI = acoustic power used ÷ modelled power for a 1 °C rise", units: "unitless", note: "Model estimate, not a thermometer or guaranteed upper bound." },
    { name: "Intensity partial orders", expr: "SP ≥ SA (same temporal statistic); TP ≥ PA ≥ TA (same spatial statistic)", units: "—", note: "SPTP is highest and SATA lowest; crossed averages may be indeterminate." }
  ],

  keyNumbers: [
    { fact: "Units of intensity", value: "W/cm² or mW/cm² (1 W/cm² = 1,000 mW/cm²)" },
    { fact: "Typical SPTA of diagnostic imaging", value: "roughly 0.1–100 mW/cm² (2D lowest, spectral Doppler highest)" },
    { fact: "Legacy course figures", value: "100 mW/cm² unfocused; 1 W/cm² focused — historical recall, not safety thresholds" },
    { fact: "Many non-ophthalmic Track 3 upper limits", value: "derated SPTA 720 mW/cm², MI 1.9 — ceilings, not targets" },
    { fact: "FDA limits for ophthalmic scanning", value: "derated SPTA about 50 mW/cm², MI about 0.23, TI 1.0" },
    { fact: "Common output-display teaching rule", value: "capable above 1; display applicable index when above 0.4" },
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
    { front: "Can all six intensities always be ranked in one chain?", back: "No. SP ≥ SA at the same temporal statistic; TP ≥ PA ≥ TA at the same spatial statistic. Crossed pairs may be indeterminate", lesson: "u14-l4" },
    { front: "Which intensity is used for thermal risk and regulatory limits?", back: "SPTA (spatial peak, temporal average)", lesson: "u14-l4" },
    { front: "What index assesses cavitation-related mechanical risk?", back: "MI, based on derated peak rarefactional pressure and frequency; intensity alone is insufficient", lesson: "u14-l4" },
    { front: "Highest and lowest of the six intensities", back: "Highest SPTP; lowest SATA", lesson: "u14-l4" },
    { front: "Which attenuation mechanism produces heat?", back: "Absorption — reflection and scattering redirect sound, they do not heat it", lesson: "u14-l5" },
    { front: "Which tissue heats the most?", back: "Bone; the soft tissue adjacent to bone warms with it", lesson: "u14-l5" },
    { front: "Six factors that increase heating", back: "Higher SPTA, higher output, higher duty factor, longer dwell time, higher frequency, poor perfusion", lesson: "u14-l5" },
    { front: "Thermal index (definition)", back: "Power being used ÷ power needed to raise that tissue 1 °C; unitless estimate", lesson: "u14-l5" },
    { front: "TIS / TIB / TIC", back: "TIS through 10 weeks LMP / TIB thereafter / TIC when bone is at the surface, such as adult transcranial imaging", lesson: "u14-l5" },
    { front: "Which modes heat most?", back: "Parked-beam modes: spectral PW and CW Doppler, then M-mode; 2D sweeping spreads energy", lesson: "u14-l5" },
    { front: "Cavitation", back: "Formation and behaviour of gas bubbles in the rarefaction phase of the wave", lesson: "u14-l6" },
    { front: "Stable (non-inertial) cavitation", back: "Bubbles oscillate and survive; microstreaming can stress cell membranes", lesson: "u14-l6" },
    { front: "Transient (inertial) cavitation", back: "Bubbles grow and violently implode: shock waves, huge local temperature and pressure, free radicals", lesson: "u14-l6" },
    { front: "Mechanical index formula", back: "MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz)", lesson: "u14-l6" },
    { front: "At fixed rarefactional pressure, raise frequency: what happens to MI?", back: "MI decreases by the inverse square-root relationship", lesson: "u14-l6" },
    { front: "What does cavitation require to start?", back: "A gas body — lung, bowel gas, or injected contrast microbubbles", lesson: "u14-l6" },
    { front: "Purpose of the output display", back: "Show live TI and MI estimates so the operator can apply ALARA; current FDA guidance references IEC 60601-2-37", lesson: "u14-l7" },
    { front: "ALARA", back: "As Low As Reasonably Achievable: lowest output, shortest time, only with a medical indication", lesson: "u14-l7" },
    { front: "Which index do you watch with contrast agents?", back: "MI — cavitation risk", lesson: "u14-l7" },
    { front: "Which index do you watch in obstetrics and Doppler?", back: "TI — heating risk (TIB once fetal bone is ossified)", lesson: "u14-l7" },
    { front: "720 mW/cm² and MI 1.9", back: "Upper limits for many non-ophthalmic Track 3 applications, not universal safety targets", lesson: "u14-l7" },
    { front: "In vitro", back: "Cells or tissue in a dish; lacks whole-body perfusion and physiology, though cells can repair damage", lesson: "u14-l8" },
    { front: "In vivo", back: "Experiments in living organisms; preclinical bioeffects can occur at diagnostic exposures", lesson: "u14-l8" },
    { front: "Epidemiology", back: "Studies of human populations; no confirmed harmful effects at diagnostic levels, but cannot prove zero risk", lesson: "u14-l8" },
    { front: "Current AIUM human-patient conclusion", back: "Without contrast, no independently confirmed adverse effects caused by present diagnostic instruments have been reported; this does not prove zero risk", lesson: "u14-l8" },
    { front: "100 mW/cm² unfocused and 1 W/cm² focused", back: "Legacy course figures, not universal safety thresholds or guarantees", lesson: "u14-l8" },
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
    { id: "u14-q4", type: "mc", q: "For any measured sound-beam profile, which statement is always true?", choices: ["Spatial average is greater than spatial peak", "Spatial peak is greater than or equal to spatial average", "Focusing always increases BUR", "The peak must be at the geometric centre"], answer: 1, explain: "The peak is the largest measured value, so it cannot be below the profile average. The profile and peak location depend on geometry; focusing does not guarantee a specific BUR change.", objectives: ["u14-o2"], lesson: "u14-l2", level: 2 },
    { id: "u14-q5", type: "mc", q: "Temporal average intensity is obtained from pulse average intensity by:", choices: ["Multiplying by the duty factor", "Dividing by the duty factor", "Multiplying by the beam uniformity ratio", "Dividing by the pulse repetition frequency"], answer: 0, explain: "TA = PA × duty factor, because the temporal average spreads the pulse's energy across the long silent listening time. Dividing by the duty factor would make TA larger than PA, which is impossible.", objectives: ["u14-o3"], lesson: "u14-l3", level: 2 },
    { id: "u14-q6", type: "mc", q: "In continuous wave operation, which relationship holds?", choices: ["Temporal average equals pulse average, because the duty factor is 1", "Temporal average is 100 times pulse average", "Temporal average is zero", "Pulse average cannot be defined, so temporal peak is used instead"], answer: 0, explain: "CW transmits all the time, so the duty factor is 1 (100%) and TA = PA × 1 = PA. That is precisely why CW Doppler carries a relatively high thermal burden despite modest peak pressures.", objectives: ["u14-o3"], lesson: "u14-l3", level: 2 },
    { id: "u14-q7", type: "mc", q: "Which of the six intensities is the highest?", choices: ["SPTA", "SATA", "SPTP", "SATP"], answer: 2, explain: "SPTP combines the worst place (spatial peak) with the worst instant (temporal peak), so nothing can exceed it. SPTA is high too, but averaging over all the silent listening time drags it well below SPTP.", objectives: ["u14-o4"], lesson: "u14-l4", level: 1 },
    { id: "u14-q8", type: "mc", q: "Which of the six intensities is the lowest?", choices: ["SATA", "SAPA", "SPTA", "SATP"], answer: 0, explain: "SATA averages over the whole beam AND over all time, so it is the gentlest number of the set. SAPA is close but still excludes the silent listening period from its average.", objectives: ["u14-o4"], lesson: "u14-l4", level: 1 },
    { id: "u14-q9", type: "mc", q: "Which intensity is most relevant to tissue heating and appears in many output limits?", choices: ["SPTP", "SPTA", "SATP", "SAPA"], answer: 1, explain: "Heating depends strongly on time-averaged exposure at the peak location, described by SPTA. Mechanical risk is assessed using pressure and MI, not SPTP alone.", objectives: ["u14-o4", "u14-o5"], lesson: "u14-l4", level: 2 },
    { id: "u14-q10", type: "mc", q: "Which mechanism converts ultrasound energy into heat, and which tissue is most affected?", choices: ["Reflection; fluid-filled structures", "Scattering; blood", "Absorption; bone", "Refraction; fat"], answer: 2, explain: "Only absorption turns acoustic energy into thermal energy, and bone has by far the highest absorption, so bone and the tissue beside it heat most. Reflection and scattering redirect energy rather than converting it to heat.", objectives: ["u14-o5"], lesson: "u14-l5", level: 1 },
    { id: "u14-q11", type: "mc", q: "The thermal index is best described as:", choices: ["A direct tissue-temperature measurement", "A model-based ratio related to potential heating", "A guaranteed upper bound on temperature rise", "The beam uniformity ratio"], answer: 1, explain: "TI is a unitless model estimate based on acoustic power and a modelled power for a 1 °C rise. It is neither a thermometer nor a guaranteed worst-case bound and can underestimate heating.", objectives: ["u14-o5"], lesson: "u14-l5", level: 2 },
    { id: "u14-q12", type: "mc", q: "You are scanning a third-trimester fetus with ossified bone near the focal zone. Which thermal index should you watch?", choices: ["TIS", "TIB", "TIC", "MI"], answer: 1, explain: "TIB models bone at or near the focus and is used after 10 weeks LMP. TIS is used through 10 weeks LMP; TIC models bone at the surface, such as an adult transcranial path.", objectives: ["u14-o5", "u14-o7"], lesson: "u14-l5", level: 2 },
    { id: "u14-q13", type: "mc", q: "Stable cavitation differs from transient cavitation in that:", choices: ["Stable bubbles oscillate and persist, while transient bubbles collapse violently", "Stable cavitation only occurs above MI 1.9", "Stable cavitation produces shock waves and free radicals", "Transient cavitation requires no gas nuclei"], answer: 0, explain: "Stable (non-inertial) bubbles expand and contract cycle after cycle, causing microstreaming; transient (inertial) bubbles implode, producing shock waves and free radicals. Both require pre-existing gas bodies to start.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q14", type: "mc", q: "Keeping derated peak rarefactional pressure constant, increasing frequency from 4 MHz to 16 MHz changes MI by what factor?", choices: ["It doubles", "It halves", "It quadruples", "It is unchanged"], answer: 1, explain: "MI = pressure ÷ √frequency; the denominator doubles, so MI halves. This conclusion requires pressure to remain constant.", objectives: ["u14-o6"], lesson: "u14-l6", level: 3 },
    { id: "u14-q15", type: "mc", q: "Which quantity appears in the numerator of the mechanical index?", choices: ["Peak compressional pressure", "Derated peak rarefactional pressure", "Temporal average intensity", "Acoustic power"], answer: 1, explain: "MI uses derated peak rarefactional pressure in MPa. Derating estimates attenuation between the water measurement and tissue.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q16", type: "mc", q: "What is the main safety purpose of displaying TI and MI during scanning?", choices: ["To measure tissue temperature directly", "To help the operator see exposure estimates and apply ALARA", "To prove that any displayed value is safe", "To replace clinical judgment"], answer: 1, explain: "Live indices show how settings affect modelled thermal and mechanical exposure, supporting ALARA. They are estimates, not direct measurements or safety guarantees.", objectives: ["u14-o7"], lesson: "u14-l7", level: 1 },
    { id: "u14-q17", type: "mc", q: "The image is too dark. Which action follows ALARA best?", choices: ["Increase the acoustic output power", "Increase the receiver gain", "Increase the frame rate", "Increase the wall filter"], answer: 1, explain: "Receiver gain amplifies returning echoes and does not change transmitted exposure, so try it before raising acoustic output. Other controls such as mode, PRF, pulse duration, focus and dwell can also affect exposure.", objectives: ["u14-o7"], lesson: "u14-l7", level: 2 },
    { id: "u14-q18", type: "mc", q: "Which statement best matches current AIUM safety language?", choices: ["Diagnostic ultrasound has been proven incapable of bioeffects", "Without contrast, no independently confirmed adverse effects caused by present diagnostic instruments have been reported in human patients", "Any TI below 1 guarantees safety", "Animal studies show no effects at diagnostic exposures"], answer: 1, explain: "The statement is deliberately limited to confirmed adverse effects in human patients and excludes contrast agents. Preclinical bioeffects exist, and absence of confirmed human harm is not proof of zero risk.", objectives: ["u14-o8"], lesson: "u14-l8", level: 1 },
    { id: "u14-q19", type: "mc", q: "How should the legacy figures 100 mW/cm² unfocused and 1 W/cm² focused be used?", choices: ["As universal safety thresholds", "As guaranteed no-effect levels for contrast", "As historical course-recall figures, not patient safety guarantees", "As current ophthalmic limits"], answer: 2, explain: "These older figures may appear in course material, but tissue, duration, geometry and contrast matter. They are not universal thresholds or guarantees.", objectives: ["u14-o8"], lesson: "u14-l8", level: 2 },
    { id: "u14-q20", type: "mc", q: "A study exposing cultured cells in a dish to high-intensity ultrasound is an example of:", choices: ["In vivo research", "In vitro research", "Epidemiology", "A clinical trial"], answer: 1, explain: "In vitro means cells outside a living organism. Cells retain repair processes, but the preparation lacks whole-body perfusion, cooling and physiology, so results do not transfer directly to patients.", objectives: ["u14-o9"], lesson: "u14-l8", level: 1 },
    { id: "u14-q21", type: "mc", q: "A hydrophone directly measures:", choices: ["Total acoustic power in watts", "Pressure as a function of time", "Tissue temperature rise", "Beam uniformity ratio"], answer: 1, explain: "A hydrophone is a tiny receiving transducer that converts pressure into voltage, giving a pressure-versus-time trace; pressures, pulse timing and intensities are then derived from it. Total power comes from a calorimeter or power balance.", objectives: ["u14-o10"], lesson: "u14-l9", level: 1 },
    { id: "u14-q22", type: "mc", q: "Which instrument is used to measure the actual temperature rise produced in a tissue-mimicking phantom?", choices: ["Hydrophone", "Thermocouple", "Calorimeter", "Schlieren system"], answer: 1, explain: "A thermocouple (or thermistor) embedded in the phantom reads temperature directly. A calorimeter infers total acoustic power from heat deposited in an absorber, and a Schlieren system only visualizes the beam optically.", objectives: ["u14-o10"], lesson: "u14-l9", level: 2 },
    { id: "u14-q23", type: "mc", q: "During a contrast-enhanced study, which displayed index is especially important to manage?", choices: ["TI only, because microbubbles only absorb heat", "MI, because microbubble response depends strongly on rarefactional pressure and frequency", "TIC, because contrast always places bone at the surface", "BUR, because it predicts every bubble response"], answer: 1, explain: "MI is especially relevant in contrast imaging because microbubbles are gas bodies whose behavior depends on the acoustic field. Use the agent- and task-specific protocol; a single MI cutoff does not guarantee one bubble behavior.", objectives: ["u14-o7", "u14-o6"], lesson: "u14-l7", level: 2 },
    { id: "u14-q24", type: "mc", q: "SPPA is 200 W/cm² and the duty factor is 0.5%. What is SPTA?", choices: ["100 mW/cm²", "400 mW/cm²", "1,000 mW/cm²", "4 W/cm²"], answer: 2, explain: "SPTA = SPPA × duty factor = 200 × 0.005 = 1.0 W/cm² = 1,000 mW/cm². Forgetting to convert the percentage (using 0.5 instead of 0.005) or dividing instead of multiplying produces the other choices.", objectives: ["u14-o3", "u14-o1"], lesson: "u14-l3", level: 3 },

    { id: "u14-q25", type: "tf", q: "Spatial average intensity can be greater than spatial peak intensity in a strongly focused beam.", answer: false, explain: "False. The peak is the largest value in the measured profile, so its average cannot exceed it. This conclusion does not require claiming that focusing always changes BUR in one direction.", objectives: ["u14-o2"], lesson: "u14-l2", level: 1 },
    { id: "u14-q26", type: "tf", q: "Temporal average intensity is always less than or equal to pulse average intensity.", answer: true, explain: "True. TA = PA × duty factor and the duty factor never exceeds 1, so TA ≤ PA, with equality only in continuous wave where the machine never stops transmitting.", objectives: ["u14-o3"], lesson: "u14-l3", level: 2 },
    { id: "u14-q27", type: "tf", q: "At fixed derated peak rarefactional pressure, raising frequency raises the mechanical index.", answer: false, explain: "False. At fixed pressure, MI = pressure ÷ √frequency, so higher frequency lowers MI. Without holding pressure constant, the net change cannot be inferred.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q28", type: "tf", q: "Bone absorbs more ultrasound than soft tissue, so tissue at a bone surface heats faster.", answer: true, explain: "True — bone's high absorption is why TIB and TIC exist and why later-pregnancy obstetric and transcranial scanning are the thermal concerns. Fluid, at the other extreme, absorbs very little.", objectives: ["u14-o5"], lesson: "u14-l5", level: 1 },
    { id: "u14-q29", type: "tf", q: "Epidemiological studies have confirmed harmful effects from diagnostic ultrasound in human populations.", answer: false, explain: "False. Epidemiological studies have not confirmed harmful effects at diagnostic exposure levels. Note the wording: that is not the same as proving zero risk, which statistics cannot do.", objectives: ["u14-o9"], lesson: "u14-l8", level: 2 },
    { id: "u14-q30", type: "tf", q: "Absence of independently confirmed adverse effects in human patients proves diagnostic ultrasound has zero biological risk.", answer: false, explain: "False. It describes the human evidence record, not proof of impossibility. Preclinical bioeffects and uncertainty in exposure models are why ALARA remains essential.", objectives: ["u14-o8"], lesson: "u14-l8", level: 1 },

    { id: "u14-q31", type: "short", q: "What are the units of intensity?", answer: "W/cm²", accept: ["w/cm2", "w/cm²", "watts per cm2", "watts per square centimeter", "mw/cm2", "mw/cm²", "milliwatts per cm2"], explain: "Intensity is power per unit area, so watts (or milliwatts) per square centimetre. Watts alone would be power, not intensity.", objectives: ["u14-o1"], lesson: "u14-l1", level: 1 },
    { id: "u14-q32", type: "short", q: "What is the name of the ratio of spatial peak intensity to spatial average intensity?", answer: "beam uniformity ratio", accept: ["beam uniformity ratio", "bur", "sp/sa factor", "sp to sa factor", "spatial peak to spatial average factor"], explain: "The beam uniformity ratio (SP/SA factor) is unitless and always at least 1; it describes how non-uniform the beam profile is.", objectives: ["u14-o2"], lesson: "u14-l2", level: 1 },
    { id: "u14-q33", type: "short", q: "Pulse average intensity is multiplied by what quantity to obtain temporal average intensity?", answer: "duty factor", accept: ["duty factor", "df", "duty cycle"], explain: "The duty factor is the fraction of time the system transmits, so it converts the in-pulse average to an over-all-time average: TA = PA × DF.", objectives: ["u14-o3"], lesson: "u14-l3", level: 1 },
    { id: "u14-q34", type: "short", q: "Which of the six intensities is quoted for thermal risk and regulatory limits?", answer: "SPTA", accept: ["spta", "spatial peak temporal average", "ispta"], explain: "SPTA reflects energy delivered over time at the beam's hottest location, which is what determines heating. SPTP is the mechanical-effects number.", objectives: ["u14-o4"], lesson: "u14-l4", level: 1 },
    { id: "u14-q35", type: "short", q: "Which attenuation mechanism converts sound into heat?", answer: "absorption", accept: ["absorption", "absorbtion", "absorption of sound"], explain: "Absorption is the only component of attenuation that becomes thermal energy; reflection, scattering and refraction merely redirect the sound.", objectives: ["u14-o5"], lesson: "u14-l5", level: 1 },
    { id: "u14-q36", type: "short", q: "What is the name for cavitation in which bubbles grow and then violently implode?", answer: "transient cavitation", accept: ["transient cavitation", "transient", "inertial cavitation", "inertial", "collapse cavitation"], explain: "Transient (inertial) cavitation concentrates energy at collapse, producing shock waves, extreme local temperatures and free radicals. Stable cavitation, by contrast, is bubbles oscillating without collapsing.", objectives: ["u14-o6"], lesson: "u14-l6", level: 1 },
    { id: "u14-q37", type: "short", q: "In the mechanical index, what is the denominator?", answer: "square root of frequency", accept: ["square root of frequency", "root frequency", "sqrt of frequency", "square root of the frequency in mhz", "√f"], explain: "MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz), so higher frequency reduces MI when pressure is held constant.", objectives: ["u14-o6"], lesson: "u14-l6", level: 2 },
    { id: "u14-q38", type: "short", q: "What does the acronym ALARA stand for?", answer: "As Low As Reasonably Achievable", accept: ["as low as reasonably achievable", "alara", "as low as reasonably achievable exposure"], explain: "ALARA balances diagnostic benefit against exposure: lowest output, shortest time, only with a medical indication. It does not mean avoiding ultrasound.", objectives: ["u14-o7"], lesson: "u14-l7", level: 1 },
    { id: "u14-q39", type: "short", q: "Which instrument measures pressure versus time in a water tank to characterize a transducer's output?", answer: "hydrophone", accept: ["hydrophone", "a hydrophone", "needle hydrophone", "membrane hydrophone"], explain: "A hydrophone is a tiny transducer using the direct piezoelectric effect. From its trace you derive pulse duration, PRP, PRF, duty factor, pressures and intensities; a calorimeter would give total power instead.", objectives: ["u14-o10"], lesson: "u14-l9", level: 1 }
  ],

  drills: [
    {
      id: "u14-d1",
      title: "Compare intensity pairs",
      formula: "SP ≥ SA; TP ≥ PA ≥ TA; crossed pairs may be indeterminate",
      lesson: "u14-l4",
      gen: function (rnd) {
        var pairs = [
          { a: "SPPA", b: "SAPA", ans: 0, why: "Same PA suffix: spatial peak is at least spatial average." },
          { a: "SATP", b: "SATA", ans: 0, why: "Same SA prefix: temporal peak is at least temporal average." },
          { a: "SPTA", b: "SATP", ans: 2, why: "Crossed comparison: more data are needed." },
          { a: "SAPA", b: "SPTA", ans: 2, why: "Crossed comparison: beam uniformity and duty factor both matter." }
        ];
        var i = Math.floor(rnd() * pairs.length); if (i >= pairs.length) i = pairs.length - 1;
        var p = pairs[i];
        return {
          kind: "choice",
          given: "Compare " + p.a + " with " + p.b + ".",
          ask: "Which statement is guaranteed?",
          choices: [p.a + " ≥ " + p.b, p.b + " ≥ " + p.a, "Cannot determine from the names alone"],
          answer: p.ans,
          steps: [
            "Compare SP with SA only when the temporal suffix matches.",
            "Compare TP ≥ PA ≥ TA only when the spatial prefix matches.",
            p.why
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
      formula: "MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz)",
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
          given: "Derated peak rarefactional pressure = " + p + " MPa, frequency = " + f + " MHz",
          ask: "What is the mechanical index?",
          answer: +mi.toFixed(3),
          unit: "",
          tol: 0.02,
          steps: [
            "MI = derated peak rarefactional pressure ÷ √frequency",
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
          { s: "Obstetric scan at 8 weeks LMP.", a: 0 },
          { s: "Routine abdominal survey of the liver and kidneys.", a: 0 },
          { s: "Superficial small-parts scan of the thyroid.", a: 0 },
          { s: "Third-trimester fetal biometry with ossified bone near the focal zone.", a: 1 },
          { s: "Second-trimester spine and femur imaging with the focus at fetal bone.", a: 1 },
          { s: "Adult transcranial Doppler through the temporal window.", a: 2 },
          { s: "Adult transcranial scan with cranial bone at the transducer surface.", a: 2 },
          { s: "Contrast-enhanced liver study with injected microbubbles.", a: 3 },
          { s: "A contrast protocol asks which displayed index tracks rarefactional-pressure-related bubble response.", a: 3 }
        ];
        var i = Math.floor(rnd() * items.length); if (i >= items.length) i = items.length - 1;
        var item = items[i];
        return {
          kind: "choice",
          given: item.s,
          ask: "Which index or model best matches the stated concern?",
          choices: opts,
          answer: item.a,
          steps: [
            "For contrast-bubble mechanical response, MI is especially relevant; follow the agent-specific protocol.",
            "Heating risk → a thermal index: TIS soft tissue only, TIB bone at/near the focus, TIC bone at the surface.",
            "Correct: " + opts[item.a] + "."
          ]
        };
      }
    },
    {
      id: "u14-d5",
      title: "Thermal index model calculation",
      formula: "TI = power used ÷ modelled power for a 1 °C rise",
      lesson: "u14-l5",
      gen: function (rnd) {
        var needs = [10, 20, 25, 40];
        var mults = [0.5, 1, 1.5, 2];
        var needed = needs[Math.floor(rnd() * needs.length)];
        var mult = mults[Math.floor(rnd() * mults.length)];
        var used = needed * mult;
        return {
          kind: "number",
          given: "Power used = " + used + " mW; modelled power for a 1 °C rise = " + needed + " mW.",
          ask: "What is the thermal index?",
          answer: mult,
          unit: "",
          tol: 0.01,
          steps: [
            "TI = power used ÷ modelled power for a 1 °C rise.",
            used + " ÷ " + needed + " = " + mult + ".",
            "TI is a model indicator, not a direct temperature measurement or guaranteed bound."
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
    },
    {
      id: "u14-d7", title: "Beam uniformity ratio", formula: "BUR = SP ÷ SA", lesson: "u14-l2",
      gen: function (rnd) {
        var sa = [2, 3, 4, 5][Math.floor(rnd() * 4)];
        var bur = [2, 3, 4, 5][Math.floor(rnd() * 4)];
        var sp = sa * bur;
        return { kind: "number", given: "SP = " + sp + " W/cm²; SA = " + sa + " W/cm²", ask: "What is BUR?", answer: bur, unit: "", tol: 0.01,
          steps: ["BUR = SP ÷ SA", sp + " ÷ " + sa + " = " + bur, "BUR is unitless and at least 1."] };
      }
    },
    {
      id: "u14-d8", title: "Duty factor", formula: "DF = PD ÷ PRP × 100", lesson: "u14-l3",
      gen: function (rnd) {
        var pd = [1, 1.5, 2, 2.5][Math.floor(rnd() * 4)];
        var prp = [100, 200, 250, 500][Math.floor(rnd() * 4)];
        var df = pd / prp * 100;
        return { kind: "number", given: "PD = " + pd + " µs; PRP = " + prp + " µs", ask: "What is duty factor in percent?", answer: +df.toFixed(3), unit: "%", tol: 0.01,
          steps: ["DF (%) = PD ÷ PRP × 100", pd + " ÷ " + prp + " × 100", "= " + df.toFixed(3) + "%"] };
      }
    }
  ],

  whiteboard: [
    {
      id: "u14-w1",
      prompt: "Draw the beam profile and the pulse timeline, label all six intensities on them, and write the relationships that connect them.",
      keyPoints: [
        "Beam profile: spatial peak is the measured maximum; spatial average covers the whole area",
        "SP ≥ SA always; BUR = SP ÷ SA ≥ 1, unitless",
        "Timeline: temporal peak (instant), pulse average (pulse only), temporal average (whole PRP)",
        "TP ≥ PA ≥ TA always",
        "Duty factor = PD ÷ PRP; imaging 0.1–1%, CW 100%",
        "TA = PA × duty factor, so SPTA = SPPA × DF",
        "SPTP is highest and SATA lowest; crossed pairs such as SPTA vs SATP may be indeterminate",
        "SPTA relates to thermal exposure; pressure and MI assess cavitation-related risk",
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
        "TIS through 10 weeks LMP, TIB thereafter, TIC for bone at the surface",
        "TI is model-based, can underestimate, and must be interpreted with duration and tissue",
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
        "MI = derated peak rarefactional pressure (MPa) ÷ √frequency (MHz); unitless",
        "At fixed pressure, ↑ frequency → ↓ MI; exposure also changes with mode, focus, PRF, pulse duration and dwell",
        "Watch MI with contrast agents, lung and bowel gas",
        "Historical ODS was AIUM/NEMA; current FDA guidance references IEC 60601-2-37",
        "ALARA: lowest output, shortest time, medical indication only",
        "Lower output first, then raise receiver gain — gain does not reach the patient",
        "720 mW/cm² and MI 1.9 are ceilings for many non-ophthalmic Track 3 applications, not safety targets"
      ],
      minutes: 8,
      lesson: "u14-l6"
    },
    {
      id: "u14-w4",
      prompt: "Write the safety evidence and the measurement toolkit: what the AIUM says, the three kinds of studies, and what each measuring instrument gives you.",
      keyPoints: [
        "Without contrast, no independently confirmed adverse effects from present diagnostic instruments have been reported in human patients",
        "Legacy 100 mW/cm² unfocused and 1 W/cm² focused figures are not universal safety thresholds",
        "Typical diagnostic SPTA is roughly 0.1–100 mW/cm²; Doppler highest, 2D lowest",
        "In vitro lacks whole-body perfusion and physiology; cells can still repair damage",
        "In vivo preclinical bioeffects can occur at diagnostic exposures",
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
