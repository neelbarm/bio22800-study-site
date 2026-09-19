window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u02",
  order: 2,
  title: "Sound Waves & Acoustic Parameters",
  icon: "🌊",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — sound waves and the acoustic parameters chapters",
  blurb: "What sound actually is, the three variables that wiggle as it passes, and the seven parameters that describe every sound wave — with units, typical diagnostic values, and the one thing the exam asks over and over: who decides this, the source or the medium?",

  objectives: [
    { id: "u02-o1", text: "Describe sound as a mechanical longitudinal wave and explain compressions and rarefactions in terms of particle motion." },
    { id: "u02-o2", text: "List the three acoustic variables, give the units of each, and explain what makes a quantity an acoustic variable." },
    { id: "u02-o3", text: "Define period and frequency, give their units and typical diagnostic values, and state that the sound source determines both." },
    { id: "u02-o4", text: "State the frequency ranges for infrasound, audible sound, ultrasound and diagnostic ultrasound." },
    { id: "u02-o5", text: "Define amplitude, power and intensity, give their units, and state the relationships between them, including intensity ∝ amplitude² and intensity = power ÷ beam area." },
    { id: "u02-o6", text: "Define propagation speed, state that the medium alone determines it, and explain how stiffness and density each change it." },
    { id: "u02-o7", text: "Define wavelength, calculate it in soft tissue from frequency, and state that both the source and the medium determine it." },
    { id: "u02-o8", text: "For each of the seven acoustic parameters, state its units, a typical diagnostic value, what determines it, and whether the sonographer can change it." },
    { id: "u02-o9", text: "Predict what happens to the other parameters when frequency, output power or the medium is changed." },
    { id: "u02-o10", text: "Rank the propagation speed of sound in air, lung, fat, soft tissue, blood and bone, and give the approximate value for each." }
  ],

  lessons: [
    {
      id: "u02-l1",
      title: "What sound actually is: a mechanical, longitudinal wave",
      objectives: ["u02-o1"],
      html: `<p class="lead">Sound is not a thing that flies through space. It is a squeeze that passes along, particle to particle, through matter that is already there.</p>
<p>Put your hand on one end of a stretched slinky and shove it forward once. You will see a bunched-up region race down the coil to the far end. No single coil travelled the length of the slinky — each one shoved its neighbour and sprang back. That travelling squeeze is a sound wave.</p>
<p>Two adjectives do all the work:</p>
<ul>
<li><span class="kw">Mechanical</span> — it needs a medium. Molecules must be present to be pushed. This is why sound cannot cross a vacuum, and why air gaps between the transducer and the skin stop an exam dead until you add gel.</li>
<li><span class="kw">Longitudinal</span> — the particles jiggle back and forth <b>along the same line</b> the wave is travelling. Compare a rope that you flick up and down: that is a transverse wave, and inside soft tissue sound does not behave that way.</li>
</ul>
<p>Because the particles crowd together and then spread apart, the wave is made of alternating regions:</p>
<div class="callout key"><b>Compression</b> = particles crowded = <b>high</b> pressure and <b>high</b> density. <b>Rarefaction</b> = particles spread out = <b>low</b> pressure and <b>low</b> density. One compression plus one rarefaction is one cycle.</div>
<div class="callout tip">Mental picture for the word rarefaction: the air is "rarer" there — fewer molecules in the same space, like a thin crowd at the back of a concert.</div>
<div class="callout warn">Sound carries <b>energy</b> from place to place, not matter. Each particle ends up roughly where it started; only the disturbance moves forward. Saying "the molecules travel from the transducer to the liver" is wrong on exams.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>Longitudinal wave shown as bunched and spread particles with the matching pressure curve</title>
<text x="300" y="24" text-anchor="middle" fill="currentColor" font-size="16">Particles bunch and spread along the direction of travel</text>
<line x1="128" y1="45" x2="128" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="138" y1="45" x2="138" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="148" y1="45" x2="148" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="158" y1="45" x2="158" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="168" y1="45" x2="168" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="192" y1="45" x2="192" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="216" y1="45" x2="216" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="242" y1="45" x2="242" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="268" y1="45" x2="268" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="284" y1="45" x2="284" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="294" y1="45" x2="294" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="304" y1="45" x2="304" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="314" y1="45" x2="314" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="338" y1="45" x2="338" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="362" y1="45" x2="362" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="388" y1="45" x2="388" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="414" y1="45" x2="414" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="432" y1="45" x2="432" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="442" y1="45" x2="442" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="452" y1="45" x2="452" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="462" y1="45" x2="462" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="486" y1="45" x2="486" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="512" y1="45" x2="512" y2="95" stroke="currentColor" stroke-width="2"/>
<line x1="540" y1="45" x2="540" y2="95" stroke="currentColor" stroke-width="2"/>
<text x="148" y="112" text-anchor="middle" fill="var(--c2)" font-size="15">compression</text>
<text x="230" y="134" text-anchor="middle" fill="var(--c1)" font-size="15">rarefaction</text>
<text x="330" y="112" text-anchor="middle" fill="var(--c2)" font-size="15">compression</text>
<line x1="60" y1="150" x2="560" y2="150" stroke="var(--muted)" stroke-width="1" stroke-dasharray="5 5"/>
<polyline points="60,150 100,150 148,120 196,180 244,180 299,120 347,180 395,180 447,120 495,180 560,150" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="20" y="128" fill="var(--c2)" font-size="15">high P</text>
<text x="20" y="186" fill="var(--c1)" font-size="15">low P</text>
<text x="575" y="146" text-anchor="end" fill="var(--muted)" font-size="15">resting value</text>
<line x1="150" y1="225" x2="450" y2="225" stroke="var(--c3)" stroke-width="3"/>
<polyline points="435,216 450,225 435,234" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="300" y="215" text-anchor="middle" fill="var(--c3)" font-size="16">wave travels this way</text>
<text x="300" y="258" text-anchor="middle" fill="currentColor" font-size="15">particles jiggle along the SAME line — that is longitudinal</text>
</svg>`, caption: "Compressions and rarefactions travelling through a medium, with the pressure curve underneath." }
      ],
      sayIt: "Out loud, with no notes: what two adjectives describe an ultrasound wave, why can sound not cross a vacuum, and what exactly is a compression and a rarefaction?",
      keyPoints: [
        "Sound is a mechanical wave — it needs a medium, so no vacuum",
        "Sound is longitudinal — particles move along the direction of travel",
        "Compression = crowded particles = high pressure and high density",
        "Rarefaction = spread particles = low pressure and low density",
        "One compression plus one rarefaction = one cycle",
        "Energy travels, matter does not — particles return to where they started"
      ]
    },

    {
      id: "u02-l2",
      title: "The three acoustic variables",
      objectives: ["u02-o2", "u02-o1"],
      html: `<p class="lead">An acoustic variable is any quantity that rises and falls as a sound wave passes. They are how you prove sound is there at all.</p>
<p>There are three, and the exam wants all three by name with units:</p>
<table class="dt">
<tr><th>Acoustic variable</th><th>What it is</th><th>Units</th></tr>
<tr><td><b>Pressure</b></td><td>Force pushing on a unit area; the concentration of force</td><td>pascals (Pa); diagnostic peaks are around a megapascal</td></tr>
<tr><td><b>Density</b></td><td>How much mass is packed into a unit volume</td><td>kg/cm<sup>3</sup> (in SI, kg/m<sup>3</sup>)</td></tr>
<tr><td><b>Distance</b> (particle motion)</td><td>How far the particles are shoved from their resting spot</td><td>cm, mm, or feet — any length unit</td></tr>
</table>
<p>Picture a revolving door packed with people. As a shove passes through, the crowd in one spot gets squashed (pressure up, density up) and each person is briefly displaced from where they were standing (distance). A moment later that spot is thin and stretched. All three variables swing above and below their resting value in step with each other.</p>
<div class="callout key">Pressure, density, distance. All three <b>vary with the wave</b>. That is the whole definition: if a quantity changes as sound passes, it is an acoustic variable.</div>
<div class="callout warn">Frequency, period and propagation speed are <b>acoustic parameters</b>, not acoustic variables. They describe the wave as a whole; they do not swing up and down at a point as the wave goes by. This wording trap appears on nearly every exam.</div>
<div class="callout tip">Dumb saying: <b>"Pressure, Density, Distance — the three things that Dance."</b> If it dances as the wave passes, it is a variable.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>An acoustic variable swinging above and below its undisturbed resting value</title>
<line x1="50" y1="120" x2="560" y2="120" stroke="var(--muted)" stroke-width="1" stroke-dasharray="5 5"/>
<polyline points="50,120 95,60 140,120 185,180 230,120 275,60 320,120 365,180 410,120 455,60 500,120 545,180" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="560" y="115" text-anchor="end" fill="var(--muted)" font-size="15">undisturbed value</text>
<text x="95" y="48" text-anchor="middle" fill="var(--c2)" font-size="15">above</text>
<text x="185" y="203" text-anchor="middle" fill="var(--c3)" font-size="15">below</text>
<text x="300" y="228" text-anchor="middle" fill="currentColor" font-size="16">Pressure · Density · Distance all swing like this</text>
<text x="50" y="30" fill="currentColor" font-size="16">value of the acoustic variable at one spot, over time</text>
</svg>`, caption: "Every acoustic variable swings above and below its resting value as the wave passes." }
      ],
      sayIt: "Name the three acoustic variables and their units without looking, then say why frequency is NOT one of them.",
      keyPoints: [
        "Acoustic variable = a quantity that changes as sound passes",
        "Pressure, measured in pascals",
        "Density, mass per unit volume",
        "Distance, the particle's displacement from rest",
        "All three swing above and below an undisturbed resting value",
        "Frequency, period and speed are parameters, not variables"
      ]
    },

    {
      id: "u02-l3",
      title: "Period and frequency: two ways to count the same wiggle",
      objectives: ["u02-o3"],
      html: `<p class="lead">Period is the time for one cycle. Frequency is how many cycles happen in one second. They are reciprocals, so they are really one fact told twice.</p>
<p>Think of a metronome. <span class="kw">Period</span> is the time from tick to tick — measured in seconds, but in ultrasound almost always in <b>microseconds (µs)</b>. <span class="kw">Frequency</span> is how many ticks per second — measured in hertz, and in ultrasound in <b>megahertz (MHz)</b>. Speed the metronome up and the ticks get closer together: frequency up, period down.</p>
<div class="formula">T (µs) = 1 ÷ f (MHz) &nbsp;&nbsp;&nbsp;&nbsp; f (MHz) = 1 ÷ T (µs)</div>
<table class="dt">
<tr><th>Frequency</th><th>Period</th></tr>
<tr><td>2 MHz</td><td>0.5 µs</td></tr>
<tr><td>5 MHz</td><td>0.2 µs</td></tr>
<tr><td>10 MHz</td><td>0.1 µs</td></tr>
<tr><td>15 MHz</td><td>0.067 µs</td></tr>
</table>
<div class="callout key">Both period and frequency are determined by the <b>sound source</b> — the transducer and the electronics driving it — and by nothing else. The medium has no say. Classic exam wording: the sonographer <b>cannot</b> change them.</div>
<p>Typical diagnostic values: frequency <b>2 to 15 MHz</b>, which makes the period roughly <b>0.5 down to 0.067 µs</b>. Notice how short that is — a five millionth of a second is a long time by comparison.</p>
<div class="callout tip">On many modern multi-frequency probes you can pick from a few preset operating frequencies. Useful in the lab, but on the exam stick to the rule as written: frequency and period are set by the source, not by the sonographer's image controls, and never by the tissue.</div>
<div class="callout warn">Do not mix the units. 1 ÷ 5 gives 0.2 only if the frequency is in MHz and you want the period in µs. In base units, a 5 MHz wave has a period of 0.0000002 s.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>One cycle of a wave marked as the period, with frequency as cycles per second</title>
<line x1="40" y1="110" x2="560" y2="110" stroke="var(--muted)" stroke-width="1" stroke-dasharray="5 5"/>
<polyline points="40,110 85,55 130,110 175,165 220,110 265,55 310,110 355,165 400,110 445,55 490,110 535,165 560,130" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="40" y1="200" x2="220" y2="200" stroke="var(--c2)" stroke-width="3"/>
<line x1="40" y1="192" x2="40" y2="208" stroke="var(--c2)" stroke-width="3"/>
<line x1="220" y1="192" x2="220" y2="208" stroke="var(--c2)" stroke-width="3"/>
<text x="130" y="225" text-anchor="middle" fill="var(--c2)" font-size="16">one cycle = one PERIOD (µs)</text>
<text x="400" y="225" text-anchor="middle" fill="var(--c3)" font-size="16">FREQUENCY = cycles per second</text>
<text x="300" y="30" text-anchor="middle" fill="currentColor" font-size="16">Same wave, two questions: how long is one? how many per second?</text>
<text x="40" y="248" fill="var(--muted)" font-size="15">faster metronome → shorter period, higher frequency</text>
</svg>`, caption: "Period measures one cycle in time; frequency counts the cycles in one second." }
      ],
      sayIt: "Say the definition, unit and typical range of period and of frequency, who determines them, and the period of a 2, 5 and 10 MHz wave.",
      keyPoints: [
        "Period = time for one cycle, in µs; typical 0.067–0.5 µs",
        "Frequency = cycles per second, in MHz; diagnostic 2–15 MHz",
        "T (µs) = 1 ÷ f (MHz) — they are reciprocals",
        "Both are determined by the source only",
        "The medium cannot change either one",
        "Raise the frequency and the period falls by the same factor"
      ]
    },

    {
      id: "u02-l4",
      title: "Infrasound, audible sound, ultrasound",
      objectives: ["u02-o4"],
      html: `<p class="lead">Ultrasound is not a special kind of sound. It is ordinary sound whose frequency is simply too high for a human ear to register.</p>
<p>Slice the whole frequency line into three pieces using your own hearing as the ruler:</p>
<table class="dt">
<tr><th>Band</th><th>Frequency</th><th>Everyday example</th></tr>
<tr><td><span class="kw">Infrasound</span></td><td>below 20 Hz</td><td>the rumble you feel from a big truck</td></tr>
<tr><td><span class="kw">Audible sound</span></td><td>20 Hz to 20,000 Hz (20 kHz)</td><td>speech, music, a smoke alarm</td></tr>
<tr><td><span class="kw">Ultrasound</span></td><td>above 20 kHz</td><td>a bat, a dog whistle, an ultrasonic cleaner</td></tr>
<tr><td><span class="kw-2">Diagnostic ultrasound</span></td><td>about 2 to 15 MHz</td><td>every transducer in the department</td></tr>
</table>
<div class="callout key">The boundaries to memorize: <b>20 Hz</b> and <b>20 kHz</b>. Ultrasound is anything above 20 kHz. Diagnostic imaging uses a narrow slice far above it, roughly <b>2 to 15 MHz</b>.</div>
<p>Look at the size of that gap. The top of human hearing is 20,000 Hz; a modest 5 MHz probe runs at 5,000,000 Hz — two hundred and fifty times higher. That is worth noticing, because the higher you push frequency, the shorter the wavelength, the finer the detail you can resolve — and the less depth you get before the sound is used up. That trade-off is the spine of the whole course.</p>
<div class="callout tip">Dumb saying: <b>"Twenty to twenty is yours; above that belongs to the bats."</b></div>
<div class="callout warn">Do not write "ultrasound is sound above 20 Hz". One little k is the difference between an audible hum and something no person can hear.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>Frequency line divided into infrasound, audible sound and ultrasound</title>
<line x1="30" y1="120" x2="570" y2="120" stroke="currentColor" stroke-width="2"/>
<line x1="150" y1="100" x2="150" y2="140" stroke="var(--c2)" stroke-width="3"/>
<line x1="300" y1="100" x2="300" y2="140" stroke="var(--c2)" stroke-width="3"/>
<line x1="450" y1="100" x2="450" y2="140" stroke="var(--c1)" stroke-width="3"/>
<line x1="540" y1="100" x2="540" y2="140" stroke="var(--c1)" stroke-width="3"/>
<text x="150" y="95" text-anchor="middle" fill="currentColor" font-size="15">20 Hz</text>
<text x="300" y="95" text-anchor="middle" fill="currentColor" font-size="15">20 kHz</text>
<text x="450" y="95" text-anchor="middle" fill="currentColor" font-size="15">2 MHz</text>
<text x="540" y="95" text-anchor="middle" fill="currentColor" font-size="15">15 MHz</text>
<text x="85" y="165" text-anchor="middle" fill="var(--c3)" font-size="15">infrasound</text>
<text x="225" y="165" text-anchor="middle" fill="var(--c3)" font-size="15">audible</text>
<text x="420" y="165" text-anchor="middle" fill="var(--c3)" font-size="15">ultrasound</text>
<line x1="450" y1="145" x2="540" y2="145" stroke="var(--c1)" stroke-width="4"/>
<text x="495" y="190" text-anchor="middle" fill="var(--c1)" font-size="15">diagnostic band</text>
<text x="300" y="40" text-anchor="middle" fill="currentColor" font-size="16">One line, sliced by what a human ear can hear</text>
<text x="30" y="65" fill="var(--muted)" font-size="15">low frequency</text>
<text x="570" y="65" text-anchor="end" fill="var(--muted)" font-size="15">high frequency</text>
</svg>`, caption: "Infrasound below 20 Hz, hearing from 20 Hz to 20 kHz, ultrasound above — imaging sits at 2–15 MHz." }
      ],
      sayIt: "Out loud: give the frequency range of infrasound, audible sound, ultrasound and diagnostic ultrasound, with the exact boundary numbers.",
      keyPoints: [
        "Infrasound: below 20 Hz",
        "Audible: 20 Hz to 20 kHz",
        "Ultrasound: above 20 kHz",
        "Diagnostic ultrasound: about 2 to 15 MHz",
        "Ultrasound is normal sound, just above human hearing",
        "Higher frequency buys detail and costs penetration"
      ]
    },

    {
      id: "u02-l5",
      title: "Amplitude, power and intensity: the strength family",
      objectives: ["u02-o5"],
      html: `<p class="lead">These three all answer "how strong is this wave?" — and they are the only parameters the sonographer can actually turn up or down.</p>
<p><span class="kw">Amplitude</span> is how far an acoustic variable swings away from its resting value — the height of the wave from the baseline to a peak, <b>not</b> from trough to peak. Its units follow whichever variable you are measuring: pascals for pressure (diagnostic peaks around a megapascal), a density unit, or millimeters for particle displacement.</p>
<p><span class="kw">Power</span> is the rate at which the wave delivers energy, in <b>watts (W)</b>. In imaging it is small — a fraction of a watt.</p>
<p><span class="kw">Intensity</span> is how concentrated that power is: the power divided by the cross-sectional area of the beam, in <b>W/cm<sup>2</sup></b> (often milliwatts per cm<sup>2</sup> in imaging).</p>
<div class="formula">intensity = power ÷ beam area &nbsp;&nbsp;&nbsp; power ∝ amplitude<sup>2</sup> &nbsp;&nbsp;&nbsp; intensity ∝ amplitude<sup>2</sup></div>
<p>Mental picture: a garden hose. The water leaving per second is the power. Put your thumb over the end and the same water is forced through a tiny area — the intensity jumps, even though the power did not change. Focusing a sound beam does exactly that.</p>
<div class="callout key">Squares matter. <b>Double the amplitude and the intensity quadruples</b> (2² = 4). Triple it and intensity is nine times greater. Halve the amplitude and intensity falls to one quarter.</div>
<table class="dt">
<tr><th>You change</th><th>Amplitude</th><th>Power</th><th>Intensity</th></tr>
<tr><td>Output power ×2</td><td>× 1.4</td><td>× 2</td><td>× 2</td></tr>
<tr><td>Amplitude ×2</td><td>× 2</td><td>× 4</td><td>× 4</td></tr>
<tr><td>Beam area ÷2 (same power)</td><td>rises</td><td>unchanged</td><td>× 2</td></tr>
</table>
<div class="callout warn">Amplitude, power and intensity are determined by the <b>source</b> and are the sonographer's to adjust — that is what the output or acoustic power control does. Turning them up raises patient exposure, which is why ALARA lives in this family.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 230" role="img"><title>Amplitude measured from the resting line to the peak of a wave</title>
<line x1="40" y1="120" x2="420" y2="120" stroke="var(--muted)" stroke-width="1" stroke-dasharray="5 5"/>
<polyline points="40,120 85,55 130,120 175,185 220,120 265,55 310,120 355,185 400,120" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="85" y1="55" x2="85" y2="120" stroke="var(--c2)" stroke-width="3"/>
<text x="95" y="85" fill="var(--c2)" font-size="16">amplitude</text>
<text x="330" y="212" fill="var(--muted)" font-size="15">dashed line = resting value</text>
<text x="40" y="30" fill="currentColor" font-size="16">baseline to peak, never peak to trough</text>
<circle cx="500" cy="170" r="45" fill="none" stroke="var(--c3)" stroke-width="2"/>
<circle cx="500" cy="170" r="18" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="500" y="105" text-anchor="middle" fill="currentColor" font-size="15">same power,</text>
<text x="500" y="125" text-anchor="middle" fill="currentColor" font-size="15">smaller area</text>
<text x="500" y="228" text-anchor="middle" fill="var(--c2)" font-size="15">→ higher intensity</text>
</svg>`, caption: "Amplitude is measured from the resting line to the peak; squeezing the same power into a smaller area raises intensity." },
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>Doubling amplitude quadruples intensity</title>
<rect x="70" y="150" width="70" height="40" fill="var(--c1)" stroke="none"/>
<text x="105" y="140" text-anchor="middle" fill="currentColor" font-size="16">amplitude 1</text>
<rect x="200" y="110" width="70" height="80" fill="var(--c1)" stroke="none"/>
<text x="235" y="100" text-anchor="middle" fill="currentColor" font-size="16">amplitude 2</text>
<text x="105" y="212" text-anchor="middle" fill="var(--muted)" font-size="15">intensity 1</text>
<text x="235" y="212" text-anchor="middle" fill="var(--muted)" font-size="15">intensity 4</text>
<rect x="360" y="170" width="60" height="20" fill="var(--c2)" stroke="none"/>
<rect x="470" y="110" width="60" height="80" fill="var(--c2)" stroke="none"/>
<text x="390" y="160" text-anchor="middle" fill="currentColor" font-size="15">I</text>
<text x="500" y="100" text-anchor="middle" fill="currentColor" font-size="15">4I</text>
<text x="445" y="212" text-anchor="middle" fill="var(--c2)" font-size="15">intensity grows as amplitude squared</text>
<text x="300" y="40" text-anchor="middle" fill="currentColor" font-size="16">Double the amplitude → four times the intensity</text>
<text x="300" y="66" text-anchor="middle" fill="var(--muted)" font-size="15">and four times the power, too</text>
</svg>`, caption: "Intensity and power both follow the square of amplitude." }
      ],
      sayIt: "Out loud: define amplitude, power and intensity with units, say who controls them, and say what happens to intensity if amplitude is doubled and if the beam area is halved.",
      keyPoints: [
        "Amplitude = baseline to peak swing of an acoustic variable",
        "Amplitude units follow the variable: pascals for pressure",
        "Power = rate of energy transfer, in watts",
        "Intensity = power ÷ beam area, in W/cm² (often mW/cm²)",
        "Intensity and power are both proportional to amplitude squared",
        "Double amplitude → intensity ×4; halve amplitude → intensity ÷4",
        "All three come from the source and ARE adjustable by the sonographer"
      ]
    },

    {
      id: "u02-l6",
      title: "Propagation speed: the medium's decision",
      objectives: ["u02-o6", "u02-o10"],
      html: `<p class="lead">Propagation speed is how fast the wave travels through a material. The source has absolutely no vote — the medium decides, and only two of its properties matter.</p>
<p><span class="kw">Stiffness</span> (how hard a material resists being squeezed; also called bulk modulus) and <span class="kw">density</span> (how much mass is packed in) pull in opposite directions:</p>
<ul>
<li><b>Stiffness ↑ → speed ↑.</b> Stiff material springs back fast, so it passes the shove to its neighbour quickly. Bone is very stiff, so sound flies through it.</li>
<li><b>Density ↑ → speed ↓.</b> Heavy particles are sluggish and take longer to get moving. Piling on mass slows the hand-off.</li>
</ul>
<div class="callout key">Speed in <b>soft tissue = 1,540 m/s = 1.54 mm/µs</b>. Every machine assumes this number. Memorize it in both forms.</div>
<table class="dt">
<tr><th>Material</th><th>Approximate speed</th><th>Why</th></tr>
<tr><td>Air</td><td>330 m/s</td><td>gas, barely stiff at all</td></tr>
<tr><td>Lung</td><td>500 m/s</td><td>full of air</td></tr>
<tr><td>Fat</td><td>1,450 m/s</td><td>the slow one among soft tissues</td></tr>
<tr><td>Soft tissue (average)</td><td>1,540 m/s</td><td>the machine's assumption</td></tr>
<tr><td>Blood</td><td>1,560 m/s</td><td>just above the average</td></tr>
<tr><td>Bone</td><td>3,500 m/s</td><td>very stiff solid</td></tr>
</table>
<div class="callout tip">Dumb saying: <b>"Stiff and speedy, dense and dawdling."</b> And for the ranking: <b>air is slowest, bone is fastest, soft tissue sits in the middle at 1,540.</b></div>
<div class="callout warn">Changing the transducer frequency does <b>not</b> change speed. A 2 MHz and a 15 MHz wave travel through liver at exactly the same 1,540 m/s. Solids are generally faster than liquids, which are faster than gases — but the reason is stiffness, not density: bone is denser than fat <i>and</i> far faster, because its stiffness wins by a mile.</div>
<div class="steps"><ol><li>At 4 MHz, T = 1 ÷ 4 = 0.25 µs; 1 ÷ 0.25 µs = 4 MHz.</li><li>λ = 1.54 ÷ 4 = 0.385 mm, so c = fλ = 4 × 0.385 = 1.54 mm/µs.</li><li>12 mW over 3 cm² gives I = 12 ÷ 3 = 4 mW/cm².</li><li>Doubling amplitude makes intensity and power 2² = 4 times as large.</li></ol></div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>Stiffness raises speed while density lowers it</title>
<text x="300" y="30" text-anchor="middle" fill="currentColor" font-size="16">Only the medium gets a vote</text>
<rect x="50" y="60" width="220" height="110" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="160" y="95" text-anchor="middle" fill="var(--c1)" font-size="16">STIFFNESS ↑</text>
<text x="160" y="125" text-anchor="middle" fill="currentColor" font-size="16">speed ↑</text>
<text x="160" y="152" text-anchor="middle" fill="var(--muted)" font-size="15">springs back fast</text>
<rect x="330" y="60" width="220" height="110" fill="none" stroke="var(--c2)" stroke-width="2"/>
<text x="440" y="95" text-anchor="middle" fill="var(--c2)" font-size="16">DENSITY ↑</text>
<text x="440" y="125" text-anchor="middle" fill="currentColor" font-size="16">speed ↓</text>
<text x="440" y="152" text-anchor="middle" fill="var(--muted)" font-size="15">heavy and sluggish</text>
<text x="300" y="200" text-anchor="middle" fill="var(--c3)" font-size="16">frequency changes NOTHING here</text>
</svg>`, caption: "Stiffness speeds sound up; density slows it down; the source is irrelevant." },
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>Bar chart of propagation speed in air lung fat soft tissue blood and bone</title>
<text x="300" y="24" text-anchor="middle" fill="currentColor" font-size="16">Propagation speed (m/s)</text>
<text x="10" y="55" fill="currentColor" font-size="15">air</text>
<rect x="150" y="42" width="38" height="18" fill="var(--c2)" stroke="none"/>
<text x="200" y="56" fill="var(--muted)" font-size="15">330</text>
<text x="10" y="90" fill="currentColor" font-size="15">lung</text>
<rect x="150" y="77" width="57" height="18" fill="var(--c2)" stroke="none"/>
<text x="219" y="91" fill="var(--muted)" font-size="15">500</text>
<text x="10" y="125" fill="currentColor" font-size="15">fat</text>
<rect x="150" y="112" width="166" height="18" fill="var(--c1)" stroke="none"/>
<text x="328" y="126" fill="var(--muted)" font-size="15">1,450</text>
<text x="10" y="160" fill="currentColor" font-size="15">soft tissue</text>
<rect x="150" y="147" width="176" height="18" fill="var(--c3)" stroke="none"/>
<text x="338" y="161" fill="var(--c3)" font-size="15">1,540</text>
<text x="10" y="195" fill="currentColor" font-size="15">blood</text>
<rect x="150" y="182" width="178" height="18" fill="var(--c1)" stroke="none"/>
<text x="340" y="196" fill="var(--muted)" font-size="15">1,560</text>
<text x="10" y="230" fill="currentColor" font-size="15">bone</text>
<rect x="150" y="217" width="400" height="18" fill="var(--c4)" stroke="none"/>
<text x="480" y="232" fill="var(--paper)" font-size="15">3,500</text>
<text x="300" y="254" text-anchor="middle" fill="var(--muted)" font-size="15">gases slowest · soft tissues clustered · bone fastest</text>
</svg>`, caption: "Speed ranking to memorize: air and lung far below, soft tissues clustered near 1,540, bone far above." }
      ],
      sayIt: "Out loud: what determines propagation speed, what does stiffness do, what does density do, and give the speed in air, fat, soft tissue, blood and bone.",
      keyPoints: [
        "Propagation speed is determined by the medium only",
        "Stiffness up → speed up",
        "Density up → speed down",
        "Soft tissue = 1,540 m/s = 1.54 mm/µs",
        "Air 330, lung 500, fat 1,450, blood 1,560, bone 3,500 m/s",
        "Frequency has no effect on speed",
        "Solids fastest, then liquids, then gases — because of stiffness"
      ]
    },

    {
      id: "u02-l7",
      title: "Wavelength: the length of one cycle",
      objectives: ["u02-o7"],
      html: `<p class="lead">Wavelength is the distance the wave covers in one cycle — from one compression to the next. It is the only parameter that both the source and the medium help decide.</p>
<p>Why both? Because wavelength is built from one of each:</p>
<div class="formula">λ = c ÷ f &nbsp;&nbsp;&nbsp; (speed comes from the medium, frequency comes from the source)</div>
<p>In soft tissue the speed is fixed at 1.54 mm/µs, so the whole thing collapses to one shortcut you will use constantly:</p>
<div class="callout key"><b>λ (mm) = 1.54 ÷ f (MHz)</b> in soft tissue. So 2 MHz gives 0.77 mm, 5 MHz gives 0.31 mm, 7.7 MHz gives 0.2 mm, and 10 MHz gives 0.154 mm.</div>
<p>Typical diagnostic wavelengths run from about <b>0.1 to 0.8 mm</b> — smaller than a grain of rice, which is exactly why ultrasound can resolve small structures.</p>
<p>Wavelength is <span class="kw">inversely proportional</span> to frequency: double the frequency and the wavelength halves. It is <span class="kw-2">directly proportional</span> to speed: send the same frequency into a faster medium such as bone and each cycle stretches out longer.</p>
<div class="callout tip">Mental picture: a marching band playing at a fixed tempo. March faster (higher speed) and each step covers more ground. Play twice as many beats per minute (higher frequency) and each step is half as long.</div>
<div class="callout warn">Wavelength is <b>not</b> adjustable by the sonographer, even though it depends on frequency — because frequency itself is set by the source. And short wavelength is a good thing for detail: it improves axial resolution, at the cost of penetration.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>A low frequency wave with a long wavelength above a high frequency wave with a short wavelength</title>
<polyline points="40,80 85,40 130,80 175,120 220,80 265,40 310,80 355,120 400,80 445,40 490,80 535,120 560,95" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="40" y1="145" x2="220" y2="145" stroke="var(--c2)" stroke-width="3"/>
<line x1="40" y1="138" x2="40" y2="152" stroke="var(--c2)" stroke-width="3"/>
<line x1="220" y1="138" x2="220" y2="152" stroke="var(--c2)" stroke-width="3"/>
<text x="130" y="168" text-anchor="middle" fill="var(--c2)" font-size="15">long λ</text>
<text x="300" y="30" text-anchor="middle" fill="currentColor" font-size="16">2 MHz in soft tissue: λ = 0.77 mm</text>
<polyline points="40,215 62,195 85,215 107,235 130,215 152,195 175,215 197,235 220,215 242,195 265,215 287,235 310,215 332,195 355,215 377,235 400,215 422,195 445,215 467,235 490,215 512,195 535,215 557,235" fill="none" stroke="var(--c3)" stroke-width="3"/>
<line x1="40" y1="252" x2="130" y2="252" stroke="var(--c2)" stroke-width="3"/>
<line x1="40" y1="245" x2="40" y2="258" stroke="var(--c2)" stroke-width="3"/>
<line x1="130" y1="245" x2="130" y2="258" stroke="var(--c2)" stroke-width="3"/>
<text x="230" y="257" fill="var(--c2)" font-size="15">short λ — double the frequency, halve the wavelength</text>
<text x="300" y="192" text-anchor="middle" fill="currentColor" font-size="16">4 MHz in the same tissue: λ = 0.385 mm</text>
</svg>`, caption: "Same medium, double the frequency: each cycle covers half the distance." }
      ],
      sayIt: "Out loud: define wavelength, give the formula, say who determines it, and compute the soft-tissue wavelength for 2, 5 and 10 MHz.",
      keyPoints: [
        "Wavelength = the length of one cycle, in mm",
        "λ = c ÷ f, so both source and medium determine it",
        "In soft tissue: λ (mm) = 1.54 ÷ f (MHz)",
        "Typical diagnostic wavelength 0.1–0.8 mm",
        "Inversely proportional to frequency, directly proportional to speed",
        "Not adjustable by the sonographer",
        "Shorter wavelength → better detail, less penetration"
      ]
    },

    {
      id: "u02-l8",
      title: "The master table: who decides what",
      objectives: ["u02-o8"],
      html: `<p class="lead">If you memorize one page from this unit, memorize this one. Almost every exam question about acoustic parameters is really asking: source, medium, or both?</p>
<table class="dt">
<tr><th>Parameter</th><th>Units</th><th>Typical diagnostic value</th><th>Determined by</th><th>Sonographer can change?</th></tr>
<tr><td>Period</td><td>µs</td><td>0.067–0.5 µs</td><td>source</td><td>no</td></tr>
<tr><td>Frequency</td><td>Hz, MHz</td><td>2–15 MHz</td><td>source</td><td>no</td></tr>
<tr><td>Amplitude</td><td>pascals (or density / distance units)</td><td>around 1 MPa peak pressure</td><td>source</td><td><b>yes</b></td></tr>
<tr><td>Power</td><td>watts</td><td>a fraction of a watt</td><td>source</td><td><b>yes</b></td></tr>
<tr><td>Intensity</td><td>W/cm<sup>2</sup></td><td>milliwatts per cm<sup>2</sup> in imaging</td><td>source</td><td><b>yes</b></td></tr>
<tr><td>Propagation speed</td><td>m/s, mm/µs</td><td>1,540 m/s in soft tissue</td><td><b>medium</b></td><td>no</td></tr>
<tr><td>Wavelength</td><td>mm</td><td>0.1–0.8 mm</td><td><b>both</b></td><td>no</td></tr>
</table>
<div class="callout key">Count them: <b>five from the source, one from the medium, one from both</b>. The medium's one is speed. The shared one is wavelength. Three of the source's five — amplitude, power, intensity — are the only ones you can turn up or down.</div>
<div class="callout tip">Dumb saying: <b>"The source says five, the medium says speed, and wavelength listens to both."</b></div>
<div class="callout warn">A classic trick question puts a probe into a faster medium and asks what happened to the frequency. Nothing. The source still generates the same cycles per second. What changed is the wavelength, because the speed changed.</div>
<p>One useful footnote on intensity: because intensity is power spread over the beam's cross-section, focusing a beam raises intensity without touching the power. That is why intensity — not power — is the number safety limits are written around.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>Three boxes showing which acoustic parameters the source the medium and both determine</title>
<rect x="20" y="50" width="180" height="150" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="110" y="78" text-anchor="middle" fill="var(--c1)" font-size="16">SOURCE (5)</text>
<text x="110" y="104" text-anchor="middle" fill="currentColor" font-size="15">period</text>
<text x="110" y="126" text-anchor="middle" fill="currentColor" font-size="15">frequency</text>
<text x="110" y="148" text-anchor="middle" fill="var(--c2)" font-size="15">amplitude</text>
<text x="110" y="170" text-anchor="middle" fill="var(--c2)" font-size="15">power</text>
<text x="110" y="192" text-anchor="middle" fill="var(--c2)" font-size="15">intensity</text>
<rect x="220" y="50" width="160" height="150" fill="none" stroke="var(--c3)" stroke-width="2"/>
<text x="300" y="78" text-anchor="middle" fill="var(--c3)" font-size="16">MEDIUM (1)</text>
<text x="300" y="110" text-anchor="middle" fill="currentColor" font-size="15">propagation speed</text>
<text x="300" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">stiffness ↑ speed ↑</text>
<text x="300" y="164" text-anchor="middle" fill="var(--muted)" font-size="15">density ↑ speed ↓</text>
<rect x="400" y="50" width="180" height="150" fill="none" stroke="var(--c4)" stroke-width="2"/>
<text x="490" y="78" text-anchor="middle" fill="var(--c4)" font-size="16">BOTH (1)</text>
<text x="490" y="110" text-anchor="middle" fill="currentColor" font-size="15">wavelength</text>
<text x="490" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">λ = c ÷ f</text>
<text x="300" y="228" text-anchor="middle" fill="var(--c2)" font-size="16">orange = the only three the sonographer can adjust</text>
</svg>`, caption: "Five parameters from the source, one from the medium, one from both." }
      ],
      sayIt: "Recite all seven acoustic parameters with units, typical value, what determines each, and whether you can adjust it — no peeking.",
      keyPoints: [
        "Seven parameters: period, frequency, amplitude, power, intensity, speed, wavelength",
        "Source determines five: period, frequency, amplitude, power, intensity",
        "Medium determines one: propagation speed",
        "Both determine one: wavelength",
        "Sonographer can adjust only amplitude, power and intensity",
        "Units: µs, MHz, pascals, watts, W/cm², m/s, mm",
        "Typicals: 2–15 MHz, 1,540 m/s, 0.1–0.8 mm wavelength"
      ]
    },

    {
      id: "u02-l9",
      title: "Change one thing: following the ripple",
      objectives: ["u02-o9"],
      html: `<p class="lead">Exam questions rarely ask for a number. They change one thing and ask what happened to three others. Trace it through the formulas and you never have to guess.</p>
<p><b>The sonographer selects a higher-frequency transducer.</b> Frequency up. Period is its reciprocal, so period down by the same factor. Wavelength is λ = c ÷ f, so wavelength down by the same factor. Speed does not move — the tissue did not change. Consequences you will meet later: better axial resolution, worse penetration.</p>
<div class="formula">↑ f → ↓ T → ↓ λ, with c unchanged</div>
<p><b>The sonographer turns up the output power.</b> Amplitude up, power up, intensity up — and patient exposure up with them. Frequency, period, wavelength and speed are all untouched; the wave is stronger, not different.</p>
<p><b>The sound crosses from fat into bone.</b> Speed jumps from about 1,450 to about 3,500 m/s because bone is far stiffer. Frequency stays put — the source is still doing what it always did. Since λ = c ÷ f and c went up with f fixed, wavelength gets <b>longer</b>.</p>
<table class="dt">
<tr><th>Change</th><th>f</th><th>T</th><th>λ</th><th>c</th><th>Intensity</th></tr>
<tr><td>Higher frequency probe</td><td>↑</td><td>↓</td><td>↓</td><td>—</td><td>—</td></tr>
<tr><td>Output power turned up</td><td>—</td><td>—</td><td>—</td><td>—</td><td>↑</td></tr>
<tr><td>Into a stiffer medium</td><td>—</td><td>—</td><td>↑</td><td>↑</td><td>—</td></tr>
<tr><td>Into a denser medium (same stiffness)</td><td>—</td><td>—</td><td>↓</td><td>↓</td><td>—</td></tr>
</table>
<div class="callout key">Three questions, in this order, solve any of these: <b>1. Who determines it?</b> If the source and you changed the medium, it is unchanged. <b>2. Which formula links them?</b> <b>3. Multiply or divide?</b></div>
<div class="callout warn">The single most common wrong answer: claiming frequency changed because the medium changed. Frequency is fixed by the source and survives every boundary it crosses.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Ripple chart showing what changes when frequency or output power is increased</title>
<text x="20" y="40" fill="var(--c1)" font-size="16">↑ frequency</text>
<line x1="130" y1="35" x2="180" y2="35" stroke="var(--c1)" stroke-width="2"/>
<text x="195" y="40" fill="currentColor" font-size="16">↓ period</text>
<line x1="285" y1="35" x2="330" y2="35" stroke="var(--c1)" stroke-width="2"/>
<text x="345" y="40" fill="currentColor" font-size="16">↓ wavelength</text>
<text x="195" y="70" fill="var(--muted)" font-size="15">speed unchanged — the tissue did not change</text>
<text x="20" y="120" fill="var(--c2)" font-size="16">↑ output power</text>
<line x1="160" y1="115" x2="210" y2="115" stroke="var(--c2)" stroke-width="2"/>
<text x="225" y="120" fill="currentColor" font-size="16">↑ amplitude, ↑ intensity</text>
<text x="225" y="150" fill="var(--muted)" font-size="15">f, T, λ and c all unchanged</text>
<text x="20" y="200" fill="var(--c3)" font-size="16">stiffer medium</text>
<line x1="160" y1="195" x2="210" y2="195" stroke="var(--c3)" stroke-width="2"/>
<text x="225" y="200" fill="currentColor" font-size="16">↑ speed → ↑ wavelength</text>
<text x="225" y="228" fill="var(--muted)" font-size="15">frequency never changes at a boundary</text>
</svg>`, caption: "Follow the arrows: change one thing and the linked parameters follow the formulas." }
      ],
      sayIt: "Out loud, three scenarios: higher-frequency probe, output power turned up, sound entering bone. For each, say what happens to frequency, period, wavelength, speed and intensity.",
      keyPoints: [
        "↑ frequency → ↓ period and ↓ wavelength; speed unchanged",
        "↑ output power → ↑ amplitude, ↑ power, ↑ intensity; nothing else",
        "Stiffer medium → ↑ speed → ↑ wavelength at the same frequency",
        "Denser medium → ↓ speed → ↓ wavelength at the same frequency",
        "Frequency never changes when the medium changes",
        "Ask in order: who determines it, which formula, multiply or divide"
      ]
    }
  ],

  mnemonics: [
    { saying: "Pressure, Density, Distance — the three that Dance", meaning: "The three acoustic variables. If it swings up and down as the wave passes, it is a variable, not a parameter", lesson: "u02-l2" },
    { saying: "Mechanical means Molecules: no medium, no music", meaning: "Sound is mechanical, so it needs matter — it cannot cross a vacuum, and an air gap kills the exam until you add gel", lesson: "u02-l1" },
    { saying: "Long-itudinal = a-Long the line", meaning: "In a longitudinal wave the particles move back and forth along the same line the wave travels", lesson: "u02-l1" },
    { saying: "Twenty to twenty is yours; above that belongs to the bats", meaning: "Human hearing is 20 Hz to 20 kHz; ultrasound is anything above 20 kHz, and imaging uses 2–15 MHz", lesson: "u02-l4" },
    { saying: "Frequency and period ride a seesaw", meaning: "They are reciprocals: T (µs) = 1 ÷ f (MHz), so one goes up exactly as much as the other goes down", lesson: "u02-l3" },
    { saying: "Stiff and speedy, dense and dawdling", meaning: "Stiffness up makes propagation speed go up; density up makes it go down", lesson: "u02-l6" },
    { saying: "Air is slow, bone is bolting, soft tissue sits at fifteen-forty", meaning: "Speed ranking: air 330, lung 500, fat 1,450, soft tissue 1,540, blood 1,560, bone 3,500 m/s", lesson: "u02-l6" },
    { saying: "One point five four, divided by f — that is all wavelength ever was", meaning: "In soft tissue, λ in mm = 1.54 ÷ frequency in MHz", lesson: "u02-l7" },
    { saying: "The source says five, the medium says speed, and wavelength listens to both", meaning: "Five parameters come from the source (period, frequency, amplitude, power, intensity), speed comes from the medium, wavelength from both", lesson: "u02-l8" },
    { saying: "Double the knob, quadruple the punch", meaning: "Intensity and power follow amplitude squared, so doubling amplitude multiplies intensity by four", lesson: "u02-l5" }
  ],

  formulas: [
    { name: "Period from frequency", expr: "T (µs) = 1 ÷ f (MHz)", units: "µs", note: "Reciprocals; 5 MHz gives 0.2 µs" },
    { name: "Frequency from period", expr: "f (MHz) = 1 ÷ T (µs)", units: "MHz", note: "Diagnostic range 2–15 MHz" },
    { name: "Wavelength", expr: "λ = c ÷ f", units: "mm", note: "Speed from the medium, frequency from the source" },
    { name: "Wavelength in soft tissue", expr: "λ (mm) = 1.54 ÷ f (MHz)", units: "mm", note: "The shortcut to memorize; typical 0.1–0.8 mm" },
    { name: "Speed, frequency, wavelength", expr: "c = f × λ", units: "m/s", note: "Rearranges to f = c ÷ λ and λ = c ÷ f" },
    { name: "Intensity", expr: "intensity = power ÷ beam area", units: "W/cm²", note: "Same power in a smaller area means higher intensity" },
    { name: "Intensity and amplitude", expr: "intensity ∝ amplitude²", units: "n/a", note: "Double the amplitude, quadruple the intensity" },
    { name: "Power and amplitude", expr: "power ∝ amplitude²", units: "W", note: "Power tracks intensity when the beam area is unchanged" },
    { name: "Speed and the medium", expr: "speed ↑ with stiffness, speed ↓ with density", units: "m/s", note: "Frequency has no effect on speed" }
  ],

  keyNumbers: [
    { fact: "Propagation speed in soft tissue", value: "1,540 m/s = 1.54 mm/µs" },
    { fact: "Speed in air", value: "about 330 m/s" },
    { fact: "Speed in lung", value: "about 500 m/s" },
    { fact: "Speed in fat", value: "about 1,450 m/s" },
    { fact: "Speed in blood", value: "about 1,560 m/s" },
    { fact: "Speed in bone", value: "about 3,500 m/s" },
    { fact: "Lower edge of human hearing", value: "20 Hz (below this is infrasound)" },
    { fact: "Upper edge of human hearing", value: "20 kHz (above this is ultrasound)" },
    { fact: "Diagnostic frequency range", value: "about 2–15 MHz" },
    { fact: "Typical diagnostic period", value: "0.067–0.5 µs" },
    { fact: "Typical wavelength in soft tissue", value: "0.1–0.8 mm" },
    { fact: "Wavelength at 5 MHz in soft tissue", value: "0.31 mm" },
    { fact: "Wavelength at 2 MHz in soft tissue", value: "0.77 mm" },
    { fact: "Typical peak pressure amplitude in imaging", value: "roughly 1 MPa (a million pascals)" },
    { fact: "Number of acoustic variables", value: "3 — pressure, density, distance" },
    { fact: "Number of acoustic parameters", value: "7 — five from the source, one from the medium, one from both" }
  ],

  flashcards: [
    { front: "Sound is what two kinds of wave?", back: "Mechanical (needs a medium) and longitudinal (particles move along the direction of travel)", lesson: "u02-l1" },
    { front: "Why can sound not travel through a vacuum?", back: "It is mechanical — it needs particles to push on each other", lesson: "u02-l1" },
    { front: "Compression", back: "Region of crowded particles: high pressure, high density", lesson: "u02-l1" },
    { front: "Rarefaction", back: "Region of spread-out particles: low pressure, low density", lesson: "u02-l1" },
    { front: "What does a sound wave actually transport?", back: "Energy — not matter; particles return to where they started", lesson: "u02-l1" },
    { front: "The three acoustic variables", back: "Pressure, density, distance (particle motion)", lesson: "u02-l2" },
    { front: "Units of pressure", back: "Pascals (Pa); diagnostic peaks around 1 MPa", lesson: "u02-l2" },
    { front: "Is frequency an acoustic variable?", back: "No — it is an acoustic parameter; it does not swing as the wave passes", lesson: "u02-l2" },
    { front: "Period", back: "Time for one cycle, in µs; set by the source", lesson: "u02-l3" },
    { front: "Frequency", back: "Cycles per second, in Hz/MHz; set by the source", lesson: "u02-l3" },
    { front: "T (µs) = ?", back: "1 ÷ f (MHz) — period and frequency are reciprocals", lesson: "u02-l3" },
    { front: "Period of a 5 MHz wave", back: "0.2 µs", lesson: "u02-l3" },
    { front: "Period of a 10 MHz wave", back: "0.1 µs", lesson: "u02-l3" },
    { front: "Typical diagnostic period range", back: "About 0.067 to 0.5 µs", lesson: "u02-l3" },
    { front: "Infrasound", back: "Sound below 20 Hz", lesson: "u02-l4" },
    { front: "Audible range", back: "20 Hz to 20 kHz", lesson: "u02-l4" },
    { front: "Ultrasound", back: "Sound above 20 kHz", lesson: "u02-l4" },
    { front: "Diagnostic ultrasound frequencies", back: "About 2 to 15 MHz", lesson: "u02-l4" },
    { front: "Amplitude", back: "Baseline-to-peak swing of an acoustic variable; source determines it, sonographer can adjust", lesson: "u02-l5" },
    { front: "Power", back: "Rate of energy transfer, in watts; adjustable by the sonographer", lesson: "u02-l5" },
    { front: "Intensity", back: "Power ÷ beam area, in W/cm²", lesson: "u02-l5" },
    { front: "Amplitude doubled → intensity?", back: "×4 (intensity ∝ amplitude²)", lesson: "u02-l5" },
    { front: "Amplitude halved → intensity?", back: "÷4", lesson: "u02-l5" },
    { front: "Same power, half the beam area → intensity?", back: "Doubles", lesson: "u02-l5" },
    { front: "Which parameters can the sonographer adjust?", back: "Amplitude, power and intensity — the output/acoustic power control", lesson: "u02-l5" },
    { front: "Propagation speed is determined by", back: "The medium only — its stiffness and density", lesson: "u02-l6" },
    { front: "Stiffness ↑ does what to speed?", back: "Speed increases", lesson: "u02-l6" },
    { front: "Density ↑ does what to speed?", back: "Speed decreases", lesson: "u02-l6" },
    { front: "Speed in soft tissue", back: "1,540 m/s = 1.54 mm/µs", lesson: "u02-l6" },
    { front: "1.54 mm/µs", back: "Speed of sound in soft tissue (1,540 m/s)", lesson: "u02-l6" },
    { front: "Speed in air", back: "About 330 m/s — the slowest of the list", lesson: "u02-l6" },
    { front: "Speed in bone", back: "About 3,500 m/s — the fastest of the list", lesson: "u02-l6" },
    { front: "Speed in fat vs blood", back: "Fat about 1,450 m/s, blood about 1,560 m/s", lesson: "u02-l6" },
    { front: "Does raising frequency change propagation speed?", back: "No — speed belongs to the medium alone", lesson: "u02-l6" },
    { front: "Wavelength", back: "Length of one cycle, in mm; λ = c ÷ f", lesson: "u02-l7" },
    { front: "λ in soft tissue (mm)", back: "1.54 ÷ f (MHz)", lesson: "u02-l7" },
    { front: "Wavelength at 2 MHz in soft tissue", back: "0.77 mm", lesson: "u02-l7" },
    { front: "Wavelength at 10 MHz in soft tissue", back: "0.154 mm", lesson: "u02-l7" },
    { front: "Typical diagnostic wavelength", back: "0.1 to 0.8 mm", lesson: "u02-l7" },
    { front: "Which parameter is determined by BOTH source and medium?", back: "Wavelength", lesson: "u02-l8" },
    { front: "The seven acoustic parameters", back: "Period, frequency, amplitude, power, intensity, propagation speed, wavelength", lesson: "u02-l8" },
    { front: "How many parameters does the source determine?", back: "Five: period, frequency, amplitude, power, intensity", lesson: "u02-l8" },
    { front: "Higher frequency probe → period and wavelength?", back: "Both decrease by the same factor; speed unchanged", lesson: "u02-l9" },
    { front: "Sound crosses from fat into bone. Frequency?", back: "Unchanged — but speed and wavelength both increase", lesson: "u02-l9" }
  ],

  questions: [
    { id: "u02-q1", type: "mc", q: "Ultrasound cannot travel through a vacuum because sound is:", choices: ["Longitudinal", "Mechanical", "Transverse", "Electromagnetic"], answer: 1,
      explain: "Mechanical means the wave needs particles to pass the disturbance along, so no medium means no sound. 'Longitudinal' is true of sound but describes the direction of particle motion, not the need for a medium.",
      objectives: ["u02-o1"], lesson: "u02-l1", level: 1 },
    { id: "u02-q2", type: "mc", q: "In a longitudinal wave, the particles of the medium move:", choices: ["Perpendicular to the direction of wave travel", "Parallel to the direction of wave travel", "In circles around their resting position", "Not at all"], answer: 1,
      explain: "Longitudinal means the particles oscillate along the same line the wave travels. Perpendicular motion describes a transverse wave, such as a flicked rope — not how sound behaves in soft tissue.",
      objectives: ["u02-o1"], lesson: "u02-l1", level: 1 },
    { id: "u02-q3", type: "tf", q: "A compression is a region of increased pressure and increased density.", answer: true,
      explain: "Crowding the particles raises both pressure and density together, which is exactly what a compression is. The rarefaction is the opposite half of the cycle, with both values below resting.",
      objectives: ["u02-o1"], lesson: "u02-l1", level: 1 },
    { id: "u02-q4", type: "short", q: "What is the name for the region of a sound wave with low pressure and low density?", answer: "rarefaction",
      accept: ["rarefaction", "rarefraction", "a rarefaction", "rarefactions"],
      explain: "A rarefaction is where the particles are spread apart, so pressure and density both dip below their resting values. A compression is the crowded half of the cycle.",
      objectives: ["u02-o1"], lesson: "u02-l1", level: 1 },
    { id: "u02-q5", type: "mc", q: "Which of the following is NOT an acoustic variable?", choices: ["Pressure", "Density", "Distance (particle motion)", "Frequency"], answer: 3,
      explain: "Frequency is an acoustic parameter: it describes the wave as a whole and does not swing up and down at a point as the wave goes by. Pressure, density and particle distance all do exactly that.",
      objectives: ["u02-o2"], lesson: "u02-l2", level: 2 },
    { id: "u02-q6", type: "short", q: "Which acoustic variable is measured in pascals?", answer: "pressure",
      accept: ["pressure", "acoustic pressure", "the pressure"],
      explain: "Pressure is force per unit area, measured in pascals; diagnostic peaks run around a megapascal. Density is mass per unit volume and distance is a length, so neither uses pascals.",
      objectives: ["u02-o2"], lesson: "u02-l2", level: 1 },
    { id: "u02-q7", type: "tf", q: "An acoustic variable is a quantity that changes as a sound wave passes through a medium.", answer: true,
      explain: "That is the definition, which is why there are exactly three: pressure, density and particle distance. Parameters such as period and speed describe the wave but do not oscillate at a point.",
      objectives: ["u02-o2"], lesson: "u02-l2", level: 1 },
    { id: "u02-q8", type: "mc", q: "The period of a wave is:", choices: ["The number of cycles in one second", "The time it takes for one cycle to occur", "The distance covered by one cycle", "The height of one cycle"], answer: 1,
      explain: "Period is a time — the duration of a single cycle, given in µs. 'Cycles in one second' is frequency, and 'distance covered by one cycle' is wavelength.",
      objectives: ["u02-o3"], lesson: "u02-l3", level: 1 },
    { id: "u02-q9", type: "mc", q: "The units of frequency are:", choices: ["Microseconds", "Hertz, or cycles per second", "Millimeters", "Watts per square centimeter"], answer: 1,
      explain: "Frequency counts cycles per second, which is what a hertz is. Microseconds are the units of period — the reciprocal quantity — and W/cm² belongs to intensity.",
      objectives: ["u02-o3"], lesson: "u02-l3", level: 1 },
    { id: "u02-q10", type: "mc", q: "Frequency and period are determined by:", choices: ["The medium only", "The sound source only", "Both the source and the medium", "The sonographer's output power control"], answer: 1,
      explain: "The source — the transducer and its driving electronics — sets both, and the tissue has no influence. The output power control changes amplitude, power and intensity, never frequency.",
      objectives: ["u02-o3"], lesson: "u02-l3", level: 2 },
    { id: "u02-q11", type: "mc", q: "What is the period of a 5 MHz wave?", choices: ["0.1 µs", "0.2 µs", "0.5 µs", "5 µs"], answer: 1,
      explain: "T = 1 ÷ f = 1 ÷ 5 = 0.2 µs, and the check is 5 × 0.2 = 1. 0.5 µs is the period of a 2 MHz wave — a very tempting mix-up because both answers contain the digits 5 and 2.",
      objectives: ["u02-o3"], lesson: "u02-l3", level: 2 },
    { id: "u02-q12", type: "short", q: "What is the period of a 2 MHz wave, in microseconds?", answer: "0.5 µs",
      accept: ["0.5", "0.5 us", "0.5 µs", ".5", "0.5 microseconds", "half a microsecond"],
      explain: "T = 1 ÷ 2 = 0.5 µs. Answering 2 µs flips the reciprocal; the check is that frequency times period must equal 1.",
      objectives: ["u02-o3"], lesson: "u02-l3", level: 2 },
    { id: "u02-q13", type: "mc", q: "Ultrasound is defined as sound with a frequency above:", choices: ["20 Hz", "2,000 Hz", "20 kHz", "2 MHz"], answer: 2,
      explain: "20 kHz is the top of human hearing, so anything above it is ultrasound. 20 Hz is the bottom of hearing — below that is infrasound — and 2 MHz is merely where the diagnostic band starts.",
      objectives: ["u02-o4"], lesson: "u02-l4", level: 1 },
    { id: "u02-q14", type: "mc", q: "The frequency range used for diagnostic imaging is approximately:", choices: ["20 Hz to 20 kHz", "20 to 200 kHz", "2 to 15 MHz", "2 to 15 GHz"], answer: 2,
      explain: "Diagnostic imaging works at roughly 2–15 MHz. '20 Hz to 20 kHz' is the audible range, and gigahertz is far outside anything used in medical ultrasound.",
      objectives: ["u02-o4"], lesson: "u02-l4", level: 1 },
    { id: "u02-q15", type: "tf", q: "Infrasound is sound with a frequency below 20 Hz.", answer: true,
      explain: "Below 20 Hz the ear no longer perceives a tone, so that band is called infrasound. The other boundary, 20 kHz, marks the start of ultrasound.",
      objectives: ["u02-o4"], lesson: "u02-l4", level: 1 },
    { id: "u02-q16", type: "mc", q: "The units of intensity are:", choices: ["Watts", "Watts per square centimeter", "Pascals", "Decibels"], answer: 1,
      explain: "Intensity is power spread over an area, so its units are W/cm². Plain watts are the units of power, which is the numerator of that fraction, not the whole quantity.",
      objectives: ["u02-o5"], lesson: "u02-l5", level: 1 },
    { id: "u02-q17", type: "mc", q: "If the amplitude of a wave is doubled, the intensity becomes:", choices: ["Half as great", "Twice as great", "Four times as great", "Unchanged"], answer: 2,
      explain: "Intensity is proportional to amplitude squared, so 2² = 4 times as great. 'Twice as great' is the trap for anyone who reads the relationship as a simple direct proportion.",
      objectives: ["u02-o5"], lesson: "u02-l5", level: 3 },
    { id: "u02-q18", type: "mc", q: "Intensity is calculated as:", choices: ["Power × area", "Power ÷ area", "Area ÷ power", "Power × amplitude"], answer: 1,
      explain: "Intensity is the concentration of power, so it is power divided by the beam's cross-sectional area. Multiplying would mean a wider beam is more intense, which is backwards — think of a thumb over a hose.",
      objectives: ["u02-o5"], lesson: "u02-l5", level: 2 },
    { id: "u02-q19", type: "tf", q: "Amplitude, power and intensity are determined by the source and can be adjusted by the sonographer.", answer: true,
      explain: "These three make up the strength family, and the output or acoustic power control changes all of them together. They are the only acoustic parameters the sonographer can directly change.",
      objectives: ["u02-o5"], lesson: "u02-l5", level: 2 },
    { id: "u02-q20", type: "short", q: "The beam area is halved while the power stays the same. What happens to the intensity?", answer: "doubles",
      accept: ["doubles", "it doubles", "double", "x2", "twice as much", "2x"],
      explain: "Intensity = power ÷ area, so halving the denominator doubles the result even though no extra energy is being delivered. This is why focusing raises intensity without raising power.",
      objectives: ["u02-o5"], lesson: "u02-l5", level: 2 },
    { id: "u02-q21", type: "mc", q: "Which acoustic parameter can the sonographer directly increase from the control panel?", choices: ["Frequency", "Period", "Propagation speed", "Intensity"], answer: 3,
      explain: "Intensity rises when the output power is turned up. Frequency and period belong to the source and are not image controls in the classic teaching, and propagation speed belongs entirely to the tissue.",
      objectives: ["u02-o5"], lesson: "u02-l5", level: 2 },
    { id: "u02-q22", type: "mc", q: "Propagation speed is determined by:", choices: ["The medium", "The source", "Both the source and the medium", "The sonographer"], answer: 0,
      explain: "Only the medium's stiffness and density set the speed. Choosing 'both' is the wavelength answer — wavelength is the one parameter that depends on the source and the medium together.",
      objectives: ["u02-o6"], lesson: "u02-l6", level: 1 },
    { id: "u02-q23", type: "mc", q: "If the stiffness of a medium increases while its density stays the same, the propagation speed:", choices: ["Increases", "Decreases", "Stays the same", "Drops to zero"], answer: 0,
      explain: "A stiffer medium springs back faster and hands the disturbance on sooner, so the speed rises. Density is the property that works the other way, slowing sound down.",
      objectives: ["u02-o6"], lesson: "u02-l6", level: 2 },
    { id: "u02-q24", type: "mc", q: "If the density of a medium increases while its stiffness stays the same, the propagation speed:", choices: ["Increases", "Decreases", "Stays the same", "Doubles"], answer: 1,
      explain: "Heavier particles are more sluggish, so the disturbance is passed along more slowly. Students often answer 'increases' because bone is both dense and fast — but bone is fast because its stiffness overwhelms its density.",
      objectives: ["u02-o6"], lesson: "u02-l6", level: 3 },
    { id: "u02-q25", type: "tf", q: "Switching from a 3 MHz to a 9 MHz transducer increases the propagation speed of sound in soft tissue.", answer: false,
      explain: "Speed is a property of the medium alone, so both frequencies travel at 1,540 m/s in soft tissue. What actually changes is the wavelength, which falls to one third.",
      objectives: ["u02-o6"], lesson: "u02-l6", level: 2 },
    { id: "u02-q26", type: "short", q: "What is the propagation speed of sound in soft tissue, in m/s?", answer: "1,540 m/s",
      accept: ["1540", "1,540", "1540 m/s", "1,540 m/s", "1540 meters per second"],
      explain: "1,540 m/s, which is the same as 1.54 mm/µs — the number every machine assumes when it converts echo time into depth. Know it in both unit systems.",
      objectives: ["u02-o6"], lesson: "u02-l6", level: 1 },
    { id: "u02-q27", type: "mc", q: "What is the wavelength of a 3 MHz wave in soft tissue?", choices: ["0.19 mm", "0.51 mm", "1.95 mm", "4.62 mm"], answer: 1,
      explain: "λ = 1.54 ÷ 3 = 0.51 mm. 1.95 mm comes from dividing 3 into 1.54 upside down (3 ÷ 1.54), which would give a wavelength far too large for a megahertz wave.",
      objectives: ["u02-o7"], lesson: "u02-l7", level: 3 },
    { id: "u02-q28", type: "mc", q: "Wavelength is determined by:", choices: ["The source only", "The medium only", "Both the source and the medium", "Neither — it is fixed at 1.54 mm"], answer: 2,
      explain: "λ = c ÷ f, and speed comes from the medium while frequency comes from the source, so both have a say. 1.54 is the soft-tissue speed in mm/µs, not a wavelength.",
      objectives: ["u02-o7"], lesson: "u02-l7", level: 2 },
    { id: "u02-q29", type: "short", q: "What is the wavelength in soft tissue of a 7.7 MHz wave, in mm?", answer: "0.2 mm",
      accept: ["0.2", "0.2 mm", ".2", "0.20", "0.2mm"],
      explain: "λ = 1.54 ÷ 7.7 = 0.2 mm, comfortably inside the typical 0.1–0.8 mm diagnostic range. An answer in centimeters or several millimeters signals a flipped division.",
      objectives: ["u02-o7"], lesson: "u02-l7", level: 2 },
    { id: "u02-q30", type: "tf", q: "Increasing the frequency decreases the wavelength in a given medium.", answer: true,
      explain: "Wavelength is inversely proportional to frequency, since λ = c ÷ f with c fixed by the medium. Doubling the frequency halves the wavelength — the basis of the detail-versus-penetration trade-off.",
      objectives: ["u02-o7"], lesson: "u02-l7", level: 2 },
    { id: "u02-q31", type: "mc", q: "Which parameter is the ONLY one determined by both the source and the medium?", choices: ["Frequency", "Intensity", "Propagation speed", "Wavelength"], answer: 3,
      explain: "Wavelength is built from frequency (source) and speed (medium), so it is the shared one. Propagation speed belongs to the medium alone, and intensity to the source alone.",
      objectives: ["u02-o8"], lesson: "u02-l8", level: 2 },
    { id: "u02-q32", type: "mc", q: "Which set of units is correct?", choices: ["Period in Hz, frequency in µs", "Period in µs, frequency in MHz", "Wavelength in µs, speed in mm", "Intensity in watts, power in W/cm²"], answer: 1,
      explain: "Period is a time (µs) and frequency is a rate (MHz). The other options swap pairs — a favourite exam trick, since power is measured in watts and intensity in W/cm², not the reverse.",
      objectives: ["u02-o8"], lesson: "u02-l8", level: 2 },
    { id: "u02-q33", type: "short", q: "Which acoustic parameter is determined by the medium alone?", answer: "propagation speed",
      accept: ["propagation speed", "speed", "velocity", "speed of sound", "propagation velocity"],
      explain: "Propagation speed is set by the medium's stiffness and density and by nothing the machine does. Every other parameter involves the source, and wavelength involves both.",
      objectives: ["u02-o8"], lesson: "u02-l8", level: 1 },
    { id: "u02-q34", type: "mc", q: "A typical wavelength for diagnostic ultrasound in soft tissue is:", choices: ["0.1 to 0.8 mm", "1 to 8 mm", "1 to 8 cm", "0.1 to 0.8 m"], answer: 0,
      explain: "At 2–15 MHz, 1.54 ÷ f lands between roughly 0.1 and 0.8 mm. A wavelength of centimeters would come from a kilohertz-range wave, far below the diagnostic band.",
      objectives: ["u02-o8"], lesson: "u02-l8", level: 2 },
    { id: "u02-q35", type: "mc", q: "A sonographer switches from a 4 MHz to an 8 MHz transducer. The period and the wavelength:", choices: ["Both double", "Both are halved", "Period doubles, wavelength halves", "Both stay the same"], answer: 1,
      explain: "Period is 1 ÷ f and wavelength is c ÷ f, so doubling the frequency halves both of them. 'Both double' is the trap for anyone who assumes every quantity follows the frequency upward.",
      objectives: ["u02-o9"], lesson: "u02-l9", level: 3 },
    { id: "u02-q36", type: "mc", q: "The sonographer increases the output power. Which statement is correct?", choices: ["Intensity increases and frequency is unchanged", "Intensity and frequency both increase", "Frequency increases and wavelength decreases", "Propagation speed increases"], answer: 0,
      explain: "The output control changes amplitude, power and intensity only; the wave gets stronger, not faster or higher-pitched. Frequency, period, wavelength and speed are all untouched.",
      objectives: ["u02-o9"], lesson: "u02-l9", level: 3 },
    { id: "u02-q37", type: "tf", q: "When sound passes from fat into bone at the same frequency, the wavelength becomes longer.", answer: true,
      explain: "Bone is far stiffer, so the speed jumps from about 1,450 to about 3,500 m/s. With λ = c ÷ f and f fixed by the source, a larger speed means a longer wavelength.",
      objectives: ["u02-o9"], lesson: "u02-l9", level: 3 },
    { id: "u02-q38", type: "mc", q: "In which of these does sound travel fastest?", choices: ["Air", "Fat", "Blood", "Bone"], answer: 3,
      explain: "Bone is the stiffest of the four, so sound races through it at about 3,500 m/s. Blood at 1,560 m/s is close to the soft-tissue average and nowhere near bone.",
      objectives: ["u02-o10"], lesson: "u02-l6", level: 1 },
    { id: "u02-q39", type: "short", q: "Of air, fat, blood and bone, in which does sound travel slowest?", answer: "air",
      accept: ["air", "in air", "the air"],
      explain: "Air, at about 330 m/s, is barely stiff at all, so it is by far the slowest of the group. Lung is the slowest tissue at about 500 m/s precisely because it is full of air.",
      objectives: ["u02-o10"], lesson: "u02-l6", level: 2 },
    { id: "u02-q40", type: "short", q: "What is the approximate propagation speed of sound in air, in m/s?", answer: "330 m/s",
      accept: ["330", "330 m/s", "about 330", "330 meters per second", "~330"],
      explain: "About 330 m/s — roughly one fifth of the soft-tissue speed, which is why even a thin air gap ruins transmission and demands coupling gel.",
      objectives: ["u02-o10"], lesson: "u02-l6", level: 1 }
  ],

  drills: [
    {
      id: "u02-d1", title: "Wavelength in soft tissue", formula: "λ (mm) = 1.54 ÷ f (MHz)", lesson: "u02-l7",
      gen: function (rnd) {
        var freqs = [1, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 7.5, 10, 11, 14, 15];
        var f = freqs[Math.floor(rnd() * freqs.length)];
        var lam = 1.54 / f;
        return {
          kind: "number",
          given: "a " + f + " MHz transducer imaging soft tissue (c = 1.54 mm/µs)",
          ask: "What is the wavelength, in mm?",
          answer: +lam.toFixed(4),
          unit: "mm",
          tol: 0.01,
          steps: [
            "λ = c ÷ f",
            "In soft tissue that is λ (mm) = 1.54 ÷ f (MHz)",
            "λ = 1.54 ÷ " + f + " = " + lam.toFixed(3) + " mm",
            "Sanity check: diagnostic wavelengths run about 0.1–0.8 mm"
          ]
        };
      }
    },
    {
      id: "u02-d2", title: "Period from frequency", formula: "T (µs) = 1 ÷ f (MHz)", lesson: "u02-l3",
      gen: function (rnd) {
        var freqs = [1, 2, 2.5, 4, 5, 6.25, 8, 10, 12.5, 15, 20];
        var f = freqs[Math.floor(rnd() * freqs.length)];
        var t = 1 / f;
        var forward = rnd() < 0.6;
        if (forward) {
          return {
            kind: "number",
            given: "frequency = " + f + " MHz",
            ask: "What is the period, in µs?",
            answer: +t.toFixed(4),
            unit: "µs",
            tol: 0.005,
            steps: ["Period and frequency are reciprocals", "T = 1 ÷ f = 1 ÷ " + f, "T = " + t.toFixed(3) + " µs", "Check: " + f + " × " + t.toFixed(3) + " ≈ 1"]
          };
        }
        return {
          kind: "number",
          given: "period = " + (+t.toFixed(4)) + " µs",
          ask: "What is the frequency, in MHz?",
          answer: f,
          unit: "MHz",
          tol: 0.15,
          steps: ["f = 1 ÷ T", "f = 1 ÷ " + (+t.toFixed(4)), "f = " + f + " MHz", "Check: frequency × period must come back to 1"]
        };
      }
    },
    {
      id: "u02-d3", title: "Stiffness, density and speed", formula: "stiffness ↑ → speed ↑ · density ↑ → speed ↓", lesson: "u02-l6",
      gen: function (rnd) {
        var much = ["somewhat", "considerably", "far"][Math.floor(rnd() * 3)];
        var cases = [
          { g: "Medium B is " + much + " stiffer than medium A, with the same density.", i: 0,
            s: "Stiffer means it springs back faster and hands the shove on sooner, so speed increases." },
          { g: "Medium B is " + much + " denser than medium A, with the same stiffness.", i: 1,
            s: "Denser means heavier, more sluggish particles, so speed decreases." },
          { g: "Medium B is " + much + " less stiff than medium A, with the same density.", i: 1,
            s: "Less stiff means a lazier spring-back, so speed decreases." },
          { g: "Medium B is " + much + " less dense than medium A, with the same stiffness.", i: 0,
            s: "Lighter particles get moving sooner, so speed increases." },
          { g: "Medium B is bone (very stiff) and medium A is fat.", i: 0,
            s: "Bone's stiffness overwhelms its extra density: about 3,500 m/s versus about 1,450 m/s." },
          { g: "Medium B is air and medium A is soft tissue.", i: 1,
            s: "A gas has almost no stiffness, so air runs at about 330 m/s against 1,540 m/s in soft tissue." },
          { g: "Medium B is lung (full of air) and medium A is blood.", i: 1,
            s: "Lung is about 500 m/s; blood is about 1,560 m/s." },
          { g: "Medium A and medium B are the same liver, but the sonographer switches from a 3 MHz to a 9 MHz transducer.", i: 2,
            s: "Frequency comes from the source and has no effect on speed — the tissue never changed." },
          { g: "Medium A and medium B are the same liver, but the sonographer turns the output power up.", i: 2,
            s: "Output power changes amplitude, power and intensity, never propagation speed." }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return {
          kind: "choice",
          given: c.g,
          ask: "Compared with medium A, how fast does sound travel in medium B?",
          choices: ["Faster", "Slower", "Exactly the same speed"],
          answer: c.i,
          steps: [
            "Speed is set by the medium only — its stiffness and its density",
            "Stiffness up → speed up; density up → speed down",
            c.s,
            "Answer: " + ["faster", "slower", "exactly the same speed"][c.i]
          ]
        };
      }
    },
    {
      id: "u02-d4", title: "Change one thing, follow the ripple", formula: "who determines it → which formula → multiply or divide", lesson: "u02-l9",
      gen: function (rnd) {
        var cases = [
          { g: "The sonographer selects a higher-frequency transducer.", a: "the wavelength", i: 1, s: "λ = c ÷ f with c fixed, so a higher f gives a shorter λ." },
          { g: "The sonographer selects a higher-frequency transducer.", a: "the period", i: 1, s: "T = 1 ÷ f, so a higher f gives a shorter period." },
          { g: "The sonographer selects a higher-frequency transducer.", a: "the propagation speed", i: 2, s: "Speed belongs to the medium alone, so it does not move." },
          { g: "The sonographer selects a lower-frequency transducer.", a: "the wavelength", i: 0, s: "λ = c ÷ f, so a lower f gives a longer λ." },
          { g: "The sonographer turns the output power up.", a: "the intensity", i: 0, s: "Output power raises amplitude, power and intensity together." },
          { g: "The sonographer turns the output power up.", a: "the frequency", i: 2, s: "Frequency comes from the source's electronics, not the output control." },
          { g: "The sonographer turns the output power down.", a: "the intensity", i: 1, s: "Less amplitude means less power and less intensity." },
          { g: "The sound beam passes from soft tissue into bone, which is much stiffer.", a: "the propagation speed", i: 0, s: "Stiffer medium, so speed rises from about 1,540 to about 3,500 m/s." },
          { g: "The sound beam passes from soft tissue into bone, which is much stiffer.", a: "the wavelength", i: 0, s: "λ = c ÷ f, f unchanged and c larger, so λ grows." },
          { g: "The sound beam passes from soft tissue into bone, which is much stiffer.", a: "the frequency", i: 2, s: "Frequency is set by the source and survives every boundary." },
          { g: "The sound beam passes from soft tissue into fat, which is slightly slower.", a: "the wavelength", i: 1, s: "λ = c ÷ f, f unchanged and c smaller, so λ shrinks." },
          { g: "The beam is focused so its cross-sectional area is smaller, with the power unchanged.", a: "the intensity", i: 0, s: "Intensity = power ÷ area, so a smaller area raises intensity." }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return {
          kind: "choice",
          given: c.g,
          ask: "What happens to " + c.a + "?",
          choices: ["Increases", "Decreases", "Stays the same"],
          answer: c.i,
          steps: ["Ask first: who determines this parameter?", c.s, "Answer: " + ["increases", "decreases", "stays the same"][c.i]]
        };
      }
    },
    {
      id: "u02-d5", title: "Amplitude and intensity factors", formula: "intensity ∝ amplitude²", lesson: "u02-l5",
      gen: function (rnd) {
        var k = [2, 3, 4, 5][Math.floor(rnd() * 4)];
        var strengthName = rnd() < 0.5 ? "intensity" : "power";
        var forward = rnd() < 0.5;
        var up = rnd() < 0.5;
        if (forward) {
          var factor = up ? k * k : 1 / (k * k);
          return {
            kind: "number",
            given: "the amplitude is " + (up ? "multiplied by " : "divided by ") + k,
            ask: "By what factor does the " + strengthName + " change? (4 means four times, 0.25 means one quarter)",
            answer: +factor.toFixed(5),
            unit: "× original",
            tol: Math.max(0.001, factor * 0.01),
            steps: [
              strengthName.charAt(0).toUpperCase() + strengthName.slice(1) + " is proportional to amplitude squared",
              "Square the amplitude factor: " + k + "² = " + (k * k),
              up ? "Amplitude went up, so intensity is × " + (k * k) : "Amplitude went down, so intensity is ÷ " + (k * k),
              "Factor = " + (+factor.toFixed(5))
            ]
          };
        }
        var iFactor = k * k;
        var aFactor = up ? k : 1 / k;
        return {
          kind: "number",
          given: "the " + strengthName + " is " + (up ? "multiplied by " : "divided by ") + iFactor,
          ask: "By what factor does the amplitude change? (2 means doubled, 0.5 means halved)",
          answer: +aFactor.toFixed(5),
          unit: "× original",
          tol: Math.max(0.001, aFactor * 0.01),
          steps: [
            strengthName.charAt(0).toUpperCase() + strengthName.slice(1) + " ∝ amplitude², so go backwards with a square root",
            "√" + iFactor + " = " + k,
            up ? "Intensity rose, so amplitude is × " + k : "Intensity fell, so amplitude is ÷ " + k,
            "Factor = " + (+aFactor.toFixed(5))
          ]
        };
      }
    },
    {
      id: "u02-d6", title: "Intensity from power and beam area", formula: "intensity = power ÷ beam area", lesson: "u02-l5",
      gen: function (rnd) {
        var p = [4, 6, 8, 10, 12, 15, 20, 25, 30, 40][Math.floor(rnd() * 10)];
        var a = [0.2, 0.25, 0.4, 0.5, 1, 2, 2.5, 4][Math.floor(rnd() * 8)];
        var i = p / a;
        return {
          kind: "number",
          given: "acoustic power = " + p + " mW spread over a beam area of " + a + " cm²",
          ask: "What is the intensity, in mW/cm²?",
          answer: +i.toFixed(3),
          unit: "mW/cm²",
          tol: 0.05,
          steps: [
            "Intensity = power ÷ beam area",
            "= " + p + " mW ÷ " + a + " cm²",
            "= " + (+i.toFixed(2)) + " mW/cm²",
            "Note the power never changed — only how tightly it is packed"
          ]
        };
      }
    }
  ],

  whiteboard: [
    { id: "u02-w1", prompt: "Draw the master table of the seven acoustic parameters: name, units, typical diagnostic value, what determines it, and whether the sonographer can change it.", minutes: 8, lesson: "u02-l8",
      keyPoints: [
        "Period — µs — 0.067 to 0.5 µs — source — not adjustable",
        "Frequency — MHz — 2 to 15 MHz — source — not adjustable",
        "Amplitude — pascals (or density/distance units) — about 1 MPa — source — ADJUSTABLE",
        "Power — watts — a fraction of a watt — source — ADJUSTABLE",
        "Intensity — W/cm² — milliwatts per cm² in imaging — source — ADJUSTABLE",
        "Propagation speed — m/s or mm/µs — 1,540 m/s in soft tissue — medium — not adjustable",
        "Wavelength — mm — 0.1 to 0.8 mm — both source and medium — not adjustable",
        "Five from the source, one from the medium, one from both",
        "Only amplitude, power and intensity are on the control panel",
        "T = 1 ÷ f and λ = c ÷ f connect four of the rows"
      ] },
    { id: "u02-w2", prompt: "Draw a longitudinal wave with compressions and rarefactions, add the pressure curve underneath, and label everything you can.", minutes: 6, lesson: "u02-l1",
      keyPoints: [
        "Sound is mechanical: it needs a medium, so no vacuum",
        "Sound is longitudinal: particle motion is parallel to travel",
        "Compression = crowded particles",
        "Compression = high pressure and high density",
        "Rarefaction = spread-out particles",
        "Rarefaction = low pressure and low density",
        "One compression plus one rarefaction = one cycle",
        "The pressure curve swings above and below the resting value",
        "The three acoustic variables are pressure, density, distance",
        "Energy travels forward; the particles stay put on average"
      ] },
    { id: "u02-w3", prompt: "Write everything about propagation speed: what sets it, the two properties and their directions, and the speed in six materials from slowest to fastest.", minutes: 6, lesson: "u02-l6",
      keyPoints: [
        "Determined by the medium only",
        "Stiffness up → speed up",
        "Density up → speed down",
        "Air about 330 m/s",
        "Lung about 500 m/s",
        "Fat about 1,450 m/s",
        "Soft tissue 1,540 m/s = 1.54 mm/µs",
        "Blood about 1,560 m/s",
        "Bone about 3,500 m/s",
        "Gases slowest, then liquids, then solids — stiffness is the reason",
        "Frequency has no effect on propagation speed"
      ] },
    { id: "u02-w4", prompt: "Brain-dump the change rules: for a higher-frequency probe, a higher output power setting, and a stiffer medium, list what happens to every parameter.", minutes: 7, lesson: "u02-l9",
      keyPoints: [
        "Higher frequency: period decreases by the same factor",
        "Higher frequency: wavelength decreases by the same factor",
        "Higher frequency: speed unchanged, intensity unchanged",
        "Higher frequency later means better axial resolution, less penetration",
        "Output power up: amplitude, power and intensity all rise",
        "Output power up: frequency, period, wavelength and speed unchanged",
        "Intensity ∝ amplitude², so double the amplitude gives ×4 intensity",
        "Stiffer medium: speed increases",
        "Stiffer medium: wavelength increases because λ = c ÷ f",
        "Frequency never changes when the medium changes",
        "Order of attack: who determines it → which formula → multiply or divide"
      ] }
  ]
});
