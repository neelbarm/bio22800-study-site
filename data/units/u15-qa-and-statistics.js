window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u15",
  order: 15,
  title: "Quality Assurance & Statistics",
  icon: "🧪",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Quality Assurance and Statistics chapter",
  blurb: "How a department proves its scanners still work — phantoms, test objects and the specific QA tests each one performs — and how a test's performance is scored with sensitivity, specificity, accuracy, PPV and NPV. Expect several easy recall points plus one or two 2×2-table calculations on the exam.",

  objectives: [
    { id: "u15-o1", text: "Define quality assurance and preventive maintenance, and explain why QA must be routine, repeated and recorded rather than a one-time test." },
    { id: "u15-o2", text: "Describe the tissue-equivalent (tissue-mimicking) phantom: the speed and attenuation it imitates, the targets inside it, and the tests it makes possible." },
    { id: "u15-o3", text: "Describe the AIUM 100 mm test object and state which QA tests it cannot perform, and why." },
    { id: "u15-o4", text: "State which pin group or target arrangement tests depth (vertical) calibration, horizontal distance accuracy, axial resolution, lateral resolution and dead zone." },
    { id: "u15-o5", text: "Explain the dead zone, registration accuracy, system sensitivity and uniformity tests, including what a failure of each looks like on the image." },
    { id: "u15-o6", text: "Compare the slice-thickness phantom, the Doppler (string or flow) phantom, and the hydrophone/beam profiler, and state what each measures." },
    { id: "u15-o7", text: "Define gold standard, true positive, false positive, true negative and false negative, and classify a given test result." },
    { id: "u15-o8", text: "Calculate sensitivity, specificity, accuracy, positive predictive value and negative predictive value from a 2×2 table and state what each answers in plain English." },
    { id: "u15-o9", text: "Explain why prevalence changes predictive values (PPV and NPV) but not sensitivity and specificity." }
  ],

  lessons: [
    {
      id: "u15-l1",
      title: "What quality assurance actually is",
      objectives: ["u15-o1"],
      html: `<p class="lead">Quality assurance is <span class="kw">routine, repeated testing</span> of an imaging system so that slow, invisible degradation is caught before it changes a diagnosis.</p>
<p>Imagine the headlights on a car you drive every night. They dim roughly one percent a month. You never notice, because your eyes adjust a little each night — until the night you miss a deer. Scanners age the same quiet way: one element in the array stops firing, a cable connector corrodes, a monitor loses brightness, a transducer face develops a hairline crack. No single day looks wrong. Only a <b>measurement you repeat on the same unchanging object</b> exposes the drift.</p>
<p>So a QA program has three habits — the <span class="kw-2">three R's</span>:</p>
<ul>
<li><b>Routine</b> — on a schedule (many departments test each scanner quarterly or semi-annually, and always after a repair or a transducer swap).</li>
<li><b>Repeated</b> — same phantom, same transducer, same preset, same depth, same gain, every single time.</li>
<li><b>Recorded</b> — images, numbers and settings filed, so this quarter can be laid next to last quarter.</li>
</ul>
<div class="callout key">QA is <b>periodic</b> and <b>comparative</b>. One test in isolation tells you almost nothing; a series of identical tests tells you everything.</div>
<p><span class="kw">Preventive maintenance</span> is the partner job: cleaning air filters, inspecting cables and transducer faces, checking calibration of calipers and electronics, replacing wear parts on schedule. It is work done <i>to stop failure</i>, not to react to it. QA detects the problem; preventive maintenance keeps it from arriving.</p>
<div class="callout warn">Exam trap: QA is not "fixing a broken machine." An obviously dead scanner is a <b>repair</b>. QA exists for the machine that still looks perfectly fine.</div>
<p>The payoff is practical: less unplanned downtime, defensible image quality, and the documentation accreditation bodies ask for.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 300" role="img"><title>Image quality drifting downward over five quarterly QA tests, crossing an acceptance limit</title>
<line x1="70" y1="40" x2="70" y2="255" stroke="currentColor" stroke-width="2"/>
<line x1="70" y1="255" x2="560" y2="255" stroke="currentColor" stroke-width="2"/>
<text x="42" y="34" fill="currentColor" font-size="15">quality</text>
<text x="505" y="285" fill="currentColor" font-size="15">time</text>
<line x1="70" y1="215" x2="560" y2="215" stroke="var(--c2)" stroke-width="2" stroke-dasharray="7 5"/>
<text x="385" y="208" fill="var(--c2)" font-size="15">acceptance limit</text>
<polyline points="100,75 200,100 300,135 400,180 500,232" fill="none" stroke="var(--c1)" stroke-width="3"/>
<circle cx="100" cy="75" r="6" fill="var(--c1)"/>
<circle cx="200" cy="100" r="6" fill="var(--c1)"/>
<circle cx="300" cy="135" r="6" fill="var(--c1)"/>
<circle cx="400" cy="180" r="6" fill="var(--c1)"/>
<circle cx="500" cy="232" r="6" fill="var(--c4)"/>
<text x="88" y="278" fill="currentColor" font-size="15">Q1</text>
<text x="188" y="278" fill="currentColor" font-size="15">Q2</text>
<text x="288" y="278" fill="currentColor" font-size="15">Q3</text>
<text x="388" y="278" fill="currentColor" font-size="15">Q4</text>
<text x="488" y="278" fill="currentColor" font-size="15">Q5</text>
<text x="112" y="62" fill="currentColor" font-size="15">each test looks OK alone</text>
<text x="330" y="252" fill="var(--c4)" font-size="15">the trend is what fails</text>
</svg>`,
          caption: "Quality drifts slowly. Only identical, repeated tests plotted over time reveal it."
        }
      ],
      sayIt: "Say out loud: what does QA mean, what are the three R's, and how is preventive maintenance different?",
      keyPoints: [
        "QA = routine, periodic testing to detect gradual degradation before it affects diagnosis",
        "Three R's: Routine (scheduled), Repeated (identical setup), Recorded (compared over time)",
        "Typical schedule: quarterly or semi-annually, plus after every repair",
        "Preventive maintenance = scheduled upkeep to prevent failure (filters, cables, calibration)",
        "QA detects; preventive maintenance prevents; repair reacts",
        "A single isolated test is nearly useless — comparison is the whole point"
      ]
    },

    {
      id: "u15-l2",
      title: "The tissue-equivalent phantom",
      objectives: ["u15-o2"],
      html: `<p class="lead">A <span class="kw">tissue-equivalent (tissue-mimicking) phantom</span> is a block of gel engineered to fool the scanner into thinking it is scanning soft tissue.</p>
<p>Think of it as a stunt double for a liver. To pass as tissue it must match two acoustic properties:</p>
<ul>
<li><b>Propagation speed 1,540 m/s</b> — the exact speed the machine assumes, so every depth and caliper measurement is meaningful.</li>
<li><b>Attenuation about 0.5–0.7 dB/cm/MHz</b> — so echoes fade with depth the way they really do.</li>
</ul>
<p>The gel (commonly a urethane or a graphite-loaded water-based gel) also contains fine scatterers, so the background has tissue-like speckle rather than being black. Embedded in it are the targets:</p>
<table class="dt">
<tr><th>Target</th><th>What it is for</th></tr>
<tr><td>Nylon pins / filaments</td><td>Distance accuracy, axial and lateral resolution, dead zone</td></tr>
<tr><td>Anechoic voids (cysts)</td><td>Cyst-like fill-in, gain and contrast behaviour</td></tr>
<tr><td>Hypo- and hyperechoic masses</td><td>Contrast resolution, lesion detectability</td></tr>
<tr><td>Gray-scale / contrast steps</td><td>Dynamic range, processing checks</td></tr>
</table>
<div class="callout key">Because it <b>attenuates like tissue</b>, this phantom can test the things a non-attenuating test object cannot: <span class="kw">TGC/compensation</span>, <span class="kw">contrast resolution</span> and true <span class="kw">penetration</span> — on top of every distance and resolution test.</div>
<div class="callout tip">Mental picture: the 100 mm test object is a ruler; the tissue-equivalent phantom is a ruler <i>plus</i> a fake patient.</div>
<p>Care matters: the gel can dry out, and freezing or overheating changes its speed and attenuation, which quietly invalidates every measurement you make in it.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 330" role="img"><title>Tissue-mimicking phantom with a pin column, an anechoic cyst, a solid mass and gray-scale targets</title>
<rect x="40" y="70" width="520" height="228" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="90" y="44" width="92" height="24" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="90" y="36" fill="var(--c1)" font-size="15">scan head</text>
<circle cx="120" cy="104" r="4" fill="currentColor"/>
<circle cx="120" cy="142" r="4" fill="currentColor"/>
<circle cx="120" cy="180" r="4" fill="currentColor"/>
<circle cx="120" cy="218" r="4" fill="currentColor"/>
<circle cx="120" cy="256" r="4" fill="currentColor"/>
<text x="136" y="186" fill="currentColor" font-size="15">pin column</text>
<circle cx="300" cy="135" r="28" fill="var(--paper)" stroke="var(--c1)" stroke-width="2"/>
<text x="336" y="132" fill="var(--c1)" font-size="15">anechoic cyst</text>
<circle cx="300" cy="235" r="26" fill="var(--c2)" fill-opacity="0.35" stroke="var(--c2)" stroke-width="2"/>
<text x="336" y="240" fill="var(--c2)" font-size="15">solid mass</text>
<circle cx="505" cy="110" r="13" fill="var(--c3)" fill-opacity="0.2" stroke="var(--c3)" stroke-width="2"/>
<circle cx="505" cy="160" r="13" fill="var(--c3)" fill-opacity="0.5" stroke="var(--c3)" stroke-width="2"/>
<circle cx="505" cy="210" r="13" fill="var(--c3)" fill-opacity="0.85" stroke="var(--c3)" stroke-width="2"/>
<text x="404" y="262" fill="var(--c3)" font-size="15">gray-scale targets</text>
<text x="44" y="320" fill="currentColor" font-size="15">gel: 1,540 m/s and 0.5-0.7 dB/cm/MHz, with tissue-like speckle</text>
</svg>`,
          caption: "Tissue-equivalent phantom: right speed, right attenuation, plus pins, cysts, masses and gray-scale targets."
        }
      ],
      sayIt: "Say out loud: what two acoustic properties must a tissue-equivalent phantom match, with numbers, and name four targets inside it.",
      keyPoints: [
        "Mimics soft tissue: speed 1,540 m/s and attenuation about 0.5–0.7 dB/cm/MHz",
        "Gel contains fine scatterers so the background has tissue-like speckle",
        "Targets: nylon pins, anechoic cysts, hypo/hyperechoic masses, gray-scale steps",
        "Because it attenuates, it CAN test TGC/compensation, contrast resolution and true penetration",
        "Also does all the distance and resolution tests a test object does",
        "Must not dry out, freeze or overheat — that changes its speed and attenuation"
      ]
    },

    {
      id: "u15-l3",
      title: "The AIUM 100 mm test object and its pin groups",
      objectives: ["u15-o3", "u15-o4"],
      html: `<p class="lead">The <span class="kw">AIUM 100 mm test object</span> is a sealed tank of liquid with thin nylon pins strung inside it in deliberate patterns — a geometry ruler, not a fake patient.</p>
<p>The liquid is a <b>water and alcohol mixture</b>, blended so its propagation speed is <b>1,540 m/s</b> at room temperature (plain water is only about 1,480 m/s, so the alcohol corrects it). The pins are nylon filaments roughly 0.1 mm across — far thinner than a wavelength — so each behaves as a single point reflector. "100 mm" describes the size of the pin field, which is why distances inside it are known to the millimetre.</p>
<div class="callout key">Each <b>arrangement</b> of pins tests one thing:
<ul>
<li><b>Vertical column</b> (pins stacked in depth) → <span class="kw">depth / vertical distance calibration</span></li>
<li><b>Horizontal row</b> (pins side by side) → <span class="kw">horizontal distance accuracy</span></li>
<li><b>Two pins close together along the beam</b> → <span class="kw">axial resolution</span></li>
<li><b>Two pins close together across the beam</b> → <span class="kw">lateral resolution</span></li>
<li><b>Pins just under the surface</b> → <span class="kw">dead zone</span></li>
</ul></div>
<p>The pattern is the whole trick: resolution is "can these two dots be told apart?", so pin pairs are laid down at shrinking separations (say 5, 4, 3, 2, 1 mm) and you report the smallest pair still seen as two.</p>
<div class="callout warn">Its big limitation: liquid <b>barely attenuates</b>. With no tissue-like fading and no background speckle, the 100 mm test object <b>cannot</b> test <span class="kw-2">TGC/compensation</span> and <b>cannot</b> test <span class="kw-2">contrast or gray-scale</span> performance. A sensitivity check done in it also flatters the machine, because nothing is weakening the echoes on the way down.</div>
<p>What it does well: distance calibration both ways, axial and lateral resolution, dead zone and registration.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 350" role="img"><title>AIUM 100 mm test object with five labeled pin groups and a note that it cannot test TGC or contrast</title>
<rect x="30" y="70" width="345" height="250" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="150" y="44" width="82" height="22" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="150" y="36" fill="var(--c1)" font-size="15">scan head</text>
<circle cx="60" cy="100" r="4" fill="currentColor"/>
<circle cx="60" cy="140" r="4" fill="currentColor"/>
<circle cx="60" cy="180" r="4" fill="currentColor"/>
<circle cx="60" cy="220" r="4" fill="currentColor"/>
<circle cx="60" cy="260" r="4" fill="currentColor"/>
<text x="72" y="105" fill="var(--c2)" font-size="16">1</text>
<circle cx="120" cy="305" r="4" fill="currentColor"/>
<circle cx="160" cy="305" r="4" fill="currentColor"/>
<circle cx="200" cy="305" r="4" fill="currentColor"/>
<circle cx="240" cy="305" r="4" fill="currentColor"/>
<circle cx="280" cy="305" r="4" fill="currentColor"/>
<text x="100" y="310" fill="var(--c2)" font-size="16">2</text>
<circle cx="250" cy="112" r="4" fill="currentColor"/>
<circle cx="250" cy="126" r="4" fill="currentColor"/>
<circle cx="250" cy="156" r="4" fill="currentColor"/>
<circle cx="250" cy="165" r="4" fill="currentColor"/>
<text x="264" y="122" fill="var(--c2)" font-size="16">3</text>
<circle cx="180" cy="235" r="4" fill="currentColor"/>
<circle cx="194" cy="235" r="4" fill="currentColor"/>
<circle cx="226" cy="235" r="4" fill="currentColor"/>
<circle cx="235" cy="235" r="4" fill="currentColor"/>
<text x="176" y="220" fill="var(--c2)" font-size="16">4</text>
<circle cx="300" cy="78" r="4" fill="currentColor"/>
<circle cx="320" cy="84" r="4" fill="currentColor"/>
<circle cx="340" cy="92" r="4" fill="currentColor"/>
<text x="352" y="84" fill="var(--c2)" font-size="16">5</text>
<text x="392" y="92" fill="currentColor" font-size="15">1  depth calibration</text>
<text x="392" y="124" fill="currentColor" font-size="15">2  horizontal distance</text>
<text x="392" y="156" fill="currentColor" font-size="15">3  axial resolution</text>
<text x="392" y="188" fill="currentColor" font-size="15">4  lateral resolution</text>
<text x="392" y="220" fill="currentColor" font-size="15">5  dead zone</text>
<text x="392" y="262" fill="var(--c4)" font-size="15">no attenuation:</text>
<text x="392" y="286" fill="var(--c4)" font-size="15">no TGC test,</text>
<text x="392" y="310" fill="var(--c4)" font-size="15">no contrast test</text>
<text x="34" y="340" fill="currentColor" font-size="15">water + alcohol, tuned to 1,540 m/s</text>
</svg>`,
          caption: "The 100 mm test object: five pin groups, five different tests — and two tests it can never do."
        }
      ],
      sayIt: "Point at an imaginary test object and say what each pin group tests, then say the two tests it cannot do and why.",
      keyPoints: [
        "Nylon pins (~0.1 mm) in a water/alcohol mix tuned to 1,540 m/s at room temperature",
        "Vertical column → depth (vertical) calibration; horizontal row → horizontal distance accuracy",
        "Pins close together ALONG the beam → axial resolution",
        "Pins close together ACROSS the beam → lateral resolution",
        "Pins just under the surface → dead zone",
        "No attenuation and no speckle → cannot test TGC/compensation or contrast/gray scale",
        "Report the smallest pin separation still displayed as two separate dots"
      ]
    },

    {
      id: "u15-l4",
      title: "Dead zone and registration accuracy",
      objectives: ["u15-o4", "u15-o5"],
      html: `<p class="lead">Two geometry tests that catch very different faults: how close to the face you can see (<span class="kw">dead zone</span>), and whether the machine puts a target in the same place no matter where you stand (<span class="kw">registration accuracy</span>).</p>
<p><b>Dead zone</b> (also called the ring-down zone or near-field dead zone) is the shallow region immediately under the transducer face where imaging is <b>impossible</b>. Picture standing right against a wall shouting and trying to hear your own echo — while your mouth is still making noise, you cannot listen. The crystal is still ringing and the receiver is still blanked, so echoes returning from the first millimetre or two arrive during transmission and are lost.</p>
<div class="callout key">Dead zone depth tracks <b>pulse length</b>. Longer pulses — <span class="kw-2">lower frequency</span>, <span class="kw-2">less damping</span>, more cycles per pulse — make the dead zone <b>deeper</b>. Higher frequency and heavy damping shrink it. Typical values are only a few millimetres (roughly 1–5 mm).</div>
<p>You test it with the pins strung just below the surface at known small depths and report the shallowest pin still displayed. Clinically you defeat it with a <span class="kw-2">standoff pad</span>, which pushes superficial structures out past the dead zone.</p>
<p><b>Registration accuracy</b> asks: image one pin from two different windows or two different scan angles — does it land on the same screen spot both times? If yes, the system's geometry (beam steering and position mapping) is honest. If the two views put the pin in two different places, you see doubled or smeared pins, and every measurement taken at an angle is suspect.</p>
<div class="callout warn">Do not mix them up: <b>dead zone</b> is about <i>how shallow</i> you can see; <b>registration</b> is about <i>whether the same target lands in the same place</i> from different directions.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 300" role="img"><title>Dead zone: a shallow band under the transducer where pins are not displayed</title>
<rect x="200" y="40" width="200" height="26" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="200" y="32" fill="var(--c1)" font-size="15">transducer face</text>
<rect x="200" y="66" width="200" height="46" fill="var(--c4)" fill-opacity="0.25" stroke="var(--c4)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="216" y="95" fill="var(--c4)" font-size="16">DEAD ZONE</text>
<circle cx="300" cy="88" r="5" fill="var(--c4)"/>
<text x="412" y="94" fill="var(--c4)" font-size="15">pin here: never seen</text>
<circle cx="300" cy="132" r="5" fill="currentColor"/>
<text x="412" y="138" fill="currentColor" font-size="15">shallowest pin seen</text>
<circle cx="300" cy="182" r="5" fill="currentColor"/>
<circle cx="300" cy="232" r="5" fill="currentColor"/>
<text x="412" y="188" fill="currentColor" font-size="15">deeper pins: fine</text>
<line x1="170" y1="66" x2="170" y2="112" stroke="var(--c2)" stroke-width="2"/>
<line x1="163" y1="66" x2="177" y2="66" stroke="var(--c2)" stroke-width="2"/>
<line x1="163" y1="112" x2="177" y2="112" stroke="var(--c2)" stroke-width="2"/>
<text x="30" y="95" fill="var(--c2)" font-size="15">about one</text>
<text x="30" y="115" fill="var(--c2)" font-size="15">pulse long</text>
<text x="40" y="275" fill="currentColor" font-size="15">longer pulse (lower f, less damping) = deeper dead zone</text>
</svg>`,
          caption: "Dead zone: while the crystal still rings, nothing can be heard — the first few millimetres are blind."
        },
        {
          svg: `<svg viewBox="0 0 600 280" role="img"><title>Registration check: one pin imaged from two windows lands on one spot when correct and two spots when not</title>
<text x="30" y="28" fill="var(--c3)" font-size="16">GOOD: registers</text>
<rect x="30" y="66" width="250" height="176" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="52" y="44" width="54" height="20" fill="none" stroke="var(--c1)" stroke-width="2"/>
<rect x="198" y="44" width="54" height="20" fill="none" stroke="var(--c1)" stroke-width="2"/>
<line x1="79" y1="64" x2="152" y2="178" stroke="var(--c1)" stroke-width="2"/>
<line x1="225" y1="64" x2="152" y2="178" stroke="var(--c1)" stroke-width="2"/>
<circle cx="152" cy="178" r="7" fill="var(--c3)"/>
<text x="62" y="222" fill="var(--c3)" font-size="15">two windows, one dot</text>
<text x="320" y="28" fill="var(--c4)" font-size="16">BAD: mis-registered</text>
<rect x="320" y="66" width="250" height="176" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="342" y="44" width="54" height="20" fill="none" stroke="var(--c1)" stroke-width="2"/>
<rect x="488" y="44" width="54" height="20" fill="none" stroke="var(--c1)" stroke-width="2"/>
<line x1="369" y1="64" x2="428" y2="170" stroke="var(--c1)" stroke-width="2"/>
<line x1="515" y1="64" x2="466" y2="192" stroke="var(--c1)" stroke-width="2"/>
<circle cx="428" cy="170" r="7" fill="var(--c4)"/>
<circle cx="466" cy="192" r="7" fill="var(--c4)"/>
<text x="352" y="228" fill="var(--c4)" font-size="15">same pin, two places</text>
</svg>`,
          caption: "Registration accuracy: the same pin seen from two windows must land on one screen location."
        }
      ],
      sayIt: "Say out loud: what causes the dead zone, what makes it bigger, and what exactly does a registration check prove?",
      keyPoints: [
        "Dead zone = shallow region at the transducer face where imaging is impossible (ring-down/blanked receiver)",
        "Dead zone depth ≈ length of the transmitted pulse; typically a few mm (about 1–5 mm)",
        "Longer pulse (lower frequency, less damping, more cycles) → deeper dead zone",
        "Tested with pins strung at known shallow depths; report the shallowest pin seen",
        "Standoff pad moves superficial anatomy past the dead zone clinically",
        "Registration accuracy = one target imaged from two windows/angles lands in one place",
        "Registration failure shows as doubled or displaced pins and bad angled measurements"
      ]
    },

    {
      id: "u15-l5",
      title: "Distance calibration, system sensitivity and uniformity",
      objectives: ["u15-o1", "u15-o5"],
      html: `<p class="lead">Three bread-and-butter QA tests: is the ruler right, can the machine still hear faint echoes, and is the picture evenly bright across the whole array?</p>
<p><b>Distance (depth) calibration.</b> The machine turns time into depth with the range equation — <b>13 µs of round trip per centimetre</b> of depth at 1,540 m/s. Put calipers on two pins whose true separation you know and compare. Vertical (depth) accuracy is usually excellent because it comes straight from timing; <span class="kw-2">horizontal accuracy is typically worse</span>, since side-to-side position depends on beam width, steering and line spacing. Departments commonly accept agreement within roughly 1–2 mm (or about 2 %).</p>
<div class="callout key"><span class="kw">System sensitivity</span> = the weakest echo the system can detect and display. Tested as: with a standard preset, how much gain or output is needed to display the <b>deepest pin</b>, and how deep can you still see anything? Record the settings and the depth each time.</div>
<p>Falling sensitivity — needing more gain this quarter than last, or losing a centimetre of penetration — is the classic early sign of dying array elements, a failing cable, or an aging transducer. Because it depends on attenuation, this test is only meaningful in a <b>tissue-equivalent phantom</b>.</p>
<p><b>Uniformity.</b> Scan a region that should look the same everywhere; the brightness should be even across the whole width. A <span class="kw">vertical dark band</span> running from the top of the image straight down is the signature of a <b>dead element</b> or a broken conductor in the cable; a band that moves when you rock the probe is usually gel or debris on the face, not a fault.</p>
<div class="callout tip">Dumb saying: "<b>A stripe means a dead guy</b>" — a fixed vertical stripe means a dead element.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 280" role="img"><title>Uniformity test showing a vertical dark band caused by a dead array element</title>
<rect x="100" y="36" width="400" height="22" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="292" y="36" width="24" height="22" fill="var(--c2)" stroke="var(--c2)" stroke-width="2"/>
<text x="100" y="28" fill="currentColor" font-size="15">array elements</text>
<text x="330" y="28" fill="var(--c2)" font-size="15">dead element</text>
<rect x="100" y="66" width="400" height="160" fill="var(--muted)" fill-opacity="0.18" stroke="currentColor" stroke-width="2"/>
<rect x="292" y="66" width="24" height="160" fill="currentColor" fill-opacity="0.6"/>
<text x="110" y="100" fill="currentColor" font-size="15">even gray</text>
<text x="400" y="100" fill="currentColor" font-size="15">even gray</text>
<text x="106" y="256" fill="var(--c2)" font-size="15">fixed vertical dark band = dead element or broken cable</text>
</svg>`,
          caption: "Uniformity: a fixed vertical dark stripe points straight at a dead element."
        }
      ],
      sayIt: "Say out loud: how do you test depth calibration, what is system sensitivity and how is it tested, and what does a vertical dark band mean?",
      keyPoints: [
        "Depth calibration uses the range equation: 13 µs of round trip per cm of depth",
        "Vertical/depth accuracy is better than horizontal accuracy (horizontal depends on beam width and steering)",
        "Common acceptance: within about 1–2 mm, or roughly 2 %",
        "System sensitivity = weakest echo the system can detect and display",
        "Tested as gain/output needed to show the deepest pin, plus maximum depth of penetration",
        "Sensitivity must be tested in an attenuating (tissue-equivalent) phantom to mean anything",
        "Uniformity: fixed vertical dark band = dead element or broken cable conductor"
      ]
    },

    {
      id: "u15-l6",
      title: "Slice-thickness, Doppler phantoms and the hydrophone",
      objectives: ["u15-o6"],
      html: `<p class="lead">Pins are flat-world targets. Three specialised tools cover what pins miss: the third dimension, moving blood, and the actual sound pressure in the water.</p>
<p><b>Slice-thickness phantom.</b> Elevational resolution is the beam's thickness out of the scan plane — the dimension you cannot see. The phantom hides a thin <span class="kw">inclined plane of scatterers</span> (typically a sheet set at 45°) inside the gel. Sweep along it and the plane is displayed as a band; how <i>thick</i> that band looks at each depth is the section thickness at that depth. Sharpest (thinnest) at the elevational focus, fatter above and below it.</p>
<p><b>Doppler phantom.</b> Two flavours:</p>
<ul>
<li><span class="kw">String phantom</span> — a loop of string or belt driven by a motor at a precisely known speed, running through fluid. The truth is known to the centimetre per second.</li>
<li><span class="kw">Flow phantom</span> — a pump pushing blood-mimicking fluid through a tube buried in tissue-mimicking gel, at a known flow rate and depth.</li>
</ul>
<div class="callout key">A Doppler phantom tests: <b>velocity accuracy</b> (does 50 cm/s read 50 cm/s, with the angle correction applied?), <b>sample-volume size and placement</b> (is the gate where the graphic says it is?), <b>flow direction</b> and <b>Doppler penetration/sensitivity</b> (deepest flow still detected).</div>
<p><b>Hydrophone / beam profiler.</b> A tiny pressure sensor swept through the beam in a water tank maps the real beam shape and records peak pressures — the raw material for intensities, MI and TI. It is <b>output measurement</b>, done by manufacturers and physicists, not a routine department QA test.</p>
<div class="callout warn">Trap: a string phantom checks the <i>machine's</i> velocity numbers. It says nothing about gray-scale contrast, and a gray-scale phantom says nothing about Doppler accuracy.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 300" role="img"><title>Doppler string phantom: a motor-driven loop of string moving at a known speed through fluid, insonated at an angle</title>
<rect x="50" y="96" width="450" height="164" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="56" y="88" fill="currentColor" font-size="15">tank of fluid</text>
<circle cx="115" cy="200" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="435" cy="200" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="115" y1="178" x2="435" y2="178" stroke="var(--c2)" stroke-width="3"/>
<line x1="115" y1="222" x2="435" y2="222" stroke="var(--c2)" stroke-width="3"/>
<polyline points="292,170 306,178 292,186" fill="none" stroke="var(--c2)" stroke-width="3"/>
<rect x="510" y="184" width="70" height="32" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="520" y="206" fill="currentColor" font-size="15">motor</text>
<line x1="457" y1="200" x2="510" y2="200" stroke="currentColor" stroke-width="2"/>
<rect x="215" y="40" width="90" height="24" fill="none" stroke="var(--c1)" stroke-width="2"/>
<text x="215" y="32" fill="var(--c1)" font-size="15">transducer</text>
<line x1="245" y1="64" x2="300" y2="178" stroke="var(--c1)" stroke-width="2"/>
<line x1="290" y1="64" x2="330" y2="178" stroke="var(--c1)" stroke-width="2"/>
<ellipse cx="312" cy="178" rx="20" ry="9" fill="none" stroke="var(--c3)" stroke-width="2"/>
<text x="340" y="150" fill="var(--c3)" font-size="15">sample volume</text>
<text x="330" y="196" fill="var(--c1)" font-size="15">angle</text>
<text x="56" y="288" fill="var(--c2)" font-size="15">string speed is KNOWN: compare with the velocity the machine reports</text>
</svg>`,
          caption: "Doppler string phantom: known velocity in, measured velocity out — the difference is the error."
        }
      ],
      sayIt: "Say out loud: what does a slice-thickness phantom contain, list four things a Doppler phantom tests, and say why a hydrophone is not routine QA.",
      keyPoints: [
        "Slice-thickness phantom = a thin inclined plane (about 45°) of scatterers; shows elevational/section thickness vs depth",
        "Section thickness is thinnest at the elevational focus",
        "Doppler phantom = moving string/belt at a known speed, or a pump-driven flow phantom",
        "Doppler phantom tests velocity accuracy, sample-volume size and placement, direction, and Doppler penetration",
        "Hydrophone / beam profiler maps real beam shape and pressure in a water tank",
        "Hydrophone work is output measurement (intensities, MI, TI), not routine department QA"
      ]
    },

    {
      id: "u15-l7",
      title: "The 2×2 table: TP, FP, TN, FN",
      objectives: ["u15-o7"],
      html: `<p class="lead">Every diagnostic statistic comes from one small box: what the <span class="kw">test</span> said, crossed with what the <span class="kw">gold standard</span> says is true.</p>
<p>The <b>gold standard</b> is the reference you agree to call truth — surgery, biopsy, angiography, long-term follow-up. Ultrasound is graded against it, never the other way round.</p>
<p>Use a smoke alarm as the mental picture:</p>
<ul>
<li><span class="kw-2">True positive (TP)</span> — alarm sounds, there really is a fire. Test positive, disease present.</li>
<li><span class="kw-2">False positive (FP)</span> — alarm sounds over burnt toast. Test says disease; there is none. A <b>false alarm</b>: extra tests, extra worry, extra cost.</li>
<li><span class="kw-2">True negative (TN)</span> — silence, no fire. Test negative, no disease.</li>
<li><span class="kw-2">False negative (FN)</span> — house is burning, alarm says nothing. The test <b>missed real disease</b> — usually the most dangerous square on the table.</li>
</ul>
<div class="callout key">Read it as "<b>true/false says whether the test was right; positive/negative says what the test said</b>." False negative = the test said negative and was wrong.</div>
<p>Draw the table the same way every time: truth across the top as columns, test result down the side as rows.</p>
<table class="dt">
<tr><th></th><th>Disease present</th><th>Disease absent</th></tr>
<tr><th>Test positive</th><td>TP</td><td>FP</td></tr>
<tr><th>Test negative</th><td>FN</td><td>TN</td></tr>
</table>
<div class="callout tip">Once that box is on your paper, all five statistics are just fractions you read off it — two down the columns, two across the rows, one over the whole thing.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 360" role="img"><title>Two by two table of test result versus gold standard truth showing TP, FP, FN and TN</title>
<text x="340" y="52" fill="currentColor" font-size="16" text-anchor="middle">GOLD STANDARD (truth)</text>
<text x="250" y="96" fill="currentColor" font-size="15" text-anchor="middle">disease PRESENT</text>
<text x="430" y="96" fill="currentColor" font-size="15" text-anchor="middle">disease ABSENT</text>
<rect x="160" y="110" width="360" height="180" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="340" y1="110" x2="340" y2="290" stroke="currentColor" stroke-width="2"/>
<line x1="160" y1="200" x2="520" y2="200" stroke="currentColor" stroke-width="2"/>
<text x="150" y="160" fill="currentColor" font-size="16" text-anchor="end">Test +</text>
<text x="150" y="250" fill="currentColor" font-size="16" text-anchor="end">Test -</text>
<text x="250" y="152" fill="var(--c3)" font-size="22" text-anchor="middle">TP</text>
<text x="250" y="178" fill="var(--c3)" font-size="15" text-anchor="middle">correct hit</text>
<text x="430" y="152" fill="var(--c4)" font-size="22" text-anchor="middle">FP</text>
<text x="430" y="178" fill="var(--c4)" font-size="15" text-anchor="middle">false alarm</text>
<text x="250" y="242" fill="var(--c4)" font-size="22" text-anchor="middle">FN</text>
<text x="250" y="268" fill="var(--c4)" font-size="15" text-anchor="middle">missed disease</text>
<text x="430" y="242" fill="var(--c3)" font-size="22" text-anchor="middle">TN</text>
<text x="430" y="268" fill="var(--c3)" font-size="15" text-anchor="middle">correct all-clear</text>
<text x="40" y="322" fill="var(--c1)" font-size="15">DOWN a column = sensitivity, specificity</text>
<text x="40" y="348" fill="var(--c2)" font-size="15">ACROSS a row = PPV, NPV</text>
</svg>`,
          caption: "The 2×2 table. Truth is the columns, the test result is the rows."
        }
      ],
      sayIt: "Draw the 2×2 table from memory and say out loud, for each square, a one-sentence smoke-alarm example.",
      keyPoints: [
        "Gold standard = the accepted truth (surgery, biopsy, angiography, follow-up)",
        "TP = test positive and disease present",
        "FP = test positive, no disease (false alarm)",
        "TN = test negative and no disease",
        "FN = test negative but disease is present (missed disease — usually the most harmful)",
        "'True/false' says whether the test was right; 'positive/negative' says what the test claimed",
        "Always draw it the same way: truth as columns, test result as rows"
      ]
    },

    {
      id: "u15-l8",
      title: "The five statistics — and what prevalence does to them",
      objectives: ["u15-o8", "u15-o9"],
      html: `<p class="lead">Two statistics read <b>down the columns</b> (start from the truth), two read <b>across the rows</b> (start from the result), and one covers the whole table.</p>
<div class="formula">Sensitivity = TP ÷ (TP + FN) × 100 %</div>
<p>Start with everyone who truly has the disease: what fraction did the test catch? High sensitivity = good at <b>finding disease</b>, few false negatives — a good screening test.</p>
<div class="formula">Specificity = TN ÷ (TN + FP) × 100 %</div>
<p>Start with everyone who is truly healthy: what fraction were correctly cleared? High specificity = good at <b>ruling disease out</b>, few false positives — a good confirming test.</p>
<div class="formula">Accuracy = (TP + TN) ÷ (TP + TN + FP + FN) × 100 %</div>
<p>Everything the test got right, over everybody tested.</p>
<div class="formula">PPV = TP ÷ (TP + FP) × 100 %&nbsp;&nbsp;&nbsp;NPV = TN ÷ (TN + FN) × 100 %</div>
<p>These answer the patient's question, not the test's: "my scan is positive — how likely is it that I actually have this?" (PPV) and "my scan is negative — how confident can I be?" (NPV).</p>
<div class="callout key"><span class="kw">Prevalence</span> — how common the disease is in the group tested — <b>changes PPV and NPV but not sensitivity or specificity.</b> Sensitivity and specificity are measured <i>within</i> a known group (all diseased, or all healthy), so changing the mix cannot move them. Predictive values mix the two groups, so the mix is everything.</div>
<p>Screen a rare disease in a healthy population and most of your positives are false, so PPV falls (NPV climbs). Test a high-risk clinic and the same machine, with identical sensitivity and specificity, suddenly has a high PPV.</p>
<div class="callout warn">Trap: "this test is 95 % sensitive, so a positive means 95 % chance of disease." No — that is PPV, and it depends on prevalence.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 320" role="img"><title>Graph showing sensitivity and specificity flat as prevalence rises while PPV rises and NPV falls</title>
<line x1="80" y1="50" x2="80" y2="260" stroke="currentColor" stroke-width="2"/>
<line x1="80" y1="260" x2="545" y2="260" stroke="currentColor" stroke-width="2"/>
<text x="46" y="44" fill="currentColor" font-size="15">value</text>
<text x="250" y="292" fill="currentColor" font-size="15">prevalence increases</text>
<polyline points="486,268 500,260 486,252" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="80" y1="105" x2="545" y2="105" stroke="var(--c1)" stroke-width="3"/>
<text x="180" y="96" fill="var(--c1)" font-size="15">sensitivity and specificity: FLAT</text>
<polyline points="80,240 160,196 240,162 320,138 400,120 480,106 545,100" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="470" y="132" fill="var(--c2)" font-size="15">PPV up</text>
<polyline points="80,68 160,76 240,88 320,104 400,126 480,158 545,182" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="468" y="200" fill="var(--c3)" font-size="15">NPV down</text>
</svg>`,
          caption: "Prevalence moves the predictive values and leaves sensitivity and specificity exactly where they were."
        }
      ],
      sayIt: "Say all five formulas out loud with their denominators, then explain in one sentence why prevalence moves PPV but not sensitivity.",
      keyPoints: [
        "Sensitivity = TP ÷ (TP + FN) — of all who HAVE it, how many were caught",
        "Specificity = TN ÷ (TN + FP) — of all who are HEALTHY, how many were cleared",
        "Accuracy = (TP + TN) ÷ everyone tested",
        "PPV = TP ÷ (TP + FP) — a positive result: how likely is disease",
        "NPV = TN ÷ (TN + FN) — a negative result: how likely is health",
        "Down the columns = Sn and Sp; across the rows = PPV and NPV",
        "Prevalence changes PPV and NPV; it never changes sensitivity or specificity",
        "Low prevalence → most positives are false → low PPV, high NPV"
      ]
    }
  ],

  mnemonics: [
    { saying: "SnNout, SpPin", meaning: "A highly SeNsitive test that comes back Negative rules the disease OUT. A highly SPecific test that comes back Positive rules it IN.", lesson: "u15-l8" },
    { saying: "Sick in the Sensitivity, Healthy in the Specificity", meaning: "Denominators: sensitivity divides by everyone who is truly sick (TP + FN); specificity divides by everyone who is truly healthy (TN + FP).", lesson: "u15-l8" },
    { saying: "Down the columns, across the rows", meaning: "With truth as columns and test result as rows: sensitivity and specificity read DOWN the columns; PPV and NPV read ACROSS the rows.", lesson: "u15-l7" },
    { saying: "Prevalence pushes the P's, never the S's", meaning: "Prevalence changes PPV and NPV; sensitivity and specificity stay put.", lesson: "u15-l8" },
    { saying: "aLong the beam = Axial; Left-to-right = Lateral", meaning: "Pins spaced ALONG the beam (one behind the other) test axial resolution; pins spaced side to side across the beam test lateral resolution.", lesson: "u15-l3" },
    { saying: "Watery phantom can't fade, so it can't grade", meaning: "The AIUM 100 mm test object has no attenuation, so it cannot test TGC/compensation or contrast/gray scale.", lesson: "u15-l3" },
    { saying: "Two windows, one dot", meaning: "Registration accuracy: the same pin imaged from two different windows must land on one spot on the screen.", lesson: "u15-l4" },
    { saying: "A stripe means a dead guy", meaning: "On the uniformity test, a fixed vertical dark band means a dead element or a broken cable conductor.", lesson: "u15-l5" },
    { saying: "The three R's: Routine, Repeated, Recorded", meaning: "What makes testing count as quality assurance instead of just a test.", lesson: "u15-l1" }
  ],

  formulas: [
    { name: "Sensitivity", expr: "Sensitivity (%) = TP ÷ (TP + FN) × 100", units: "%", note: "Of everyone who truly has the disease, the fraction the test caught. Denominator = all diseased." },
    { name: "Specificity", expr: "Specificity (%) = TN ÷ (TN + FP) × 100", units: "%", note: "Of everyone truly healthy, the fraction correctly cleared. Denominator = all healthy." },
    { name: "Accuracy", expr: "Accuracy (%) = (TP + TN) ÷ (TP + TN + FP + FN) × 100", units: "%", note: "All correct calls over everybody tested." },
    { name: "Positive predictive value", expr: "PPV (%) = TP ÷ (TP + FP) × 100", units: "%", note: "Given a positive result, the chance disease is really there. Depends on prevalence." },
    { name: "Negative predictive value", expr: "NPV (%) = TN ÷ (TN + FN) × 100", units: "%", note: "Given a negative result, the chance the patient is really clear. Depends on prevalence." },
    { name: "Prevalence", expr: "Prevalence (%) = (TP + FN) ÷ (TP + TN + FP + FN) × 100", units: "%", note: "How common the disease is in the group tested." },
    { name: "False negative rate", expr: "FN rate (%) = FN ÷ (TP + FN) × 100 = 100 % − sensitivity", units: "%", note: "The misses." },
    { name: "False positive rate", expr: "FP rate (%) = FP ÷ (TN + FP) × 100 = 100 % − specificity", units: "%", note: "The false alarms." },
    { name: "Range equation (used for depth calibration)", expr: "depth (mm) = 1.54 mm/µs × time (µs) ÷ 2", units: "mm", note: "13 µs of round-trip time per cm of depth at 1,540 m/s." },
    { name: "Distance measurement error", expr: "error (%) = (measured − true) ÷ true × 100", units: "%", note: "Used on pin separations in a phantom; typical acceptance ≈ 2 % or 1–2 mm." }
  ],

  keyNumbers: [
    { fact: "Propagation speed a phantom or test object must have", value: "1,540 m/s (1.54 mm/µs)" },
    { fact: "Attenuation a tissue-equivalent phantom mimics", value: "≈ 0.5–0.7 dB/cm/MHz" },
    { fact: "AIUM 100 mm test object filling", value: "Water + alcohol mixture, tuned to 1,540 m/s at room temperature" },
    { fact: "Speed of plain water (why alcohol is added)", value: "≈ 1,480 m/s" },
    { fact: "Nylon pin diameter in a test object", value: "≈ 0.1 mm — smaller than a wavelength, so each acts as a point target" },
    { fact: "Round-trip time per cm of depth (range equation)", value: "13 µs/cm" },
    { fact: "Typical dead-zone depth", value: "≈ 1–5 mm; deeper with longer pulses (lower frequency, less damping)" },
    { fact: "Typical distance-accuracy acceptance in QA", value: "Within about 1–2 mm, or roughly 2 %" },
    { fact: "Typical QA testing interval", value: "Quarterly to semi-annually, plus after any repair" },
    { fact: "Slice-thickness phantom geometry", value: "A thin scattering plane inclined at about 45° in the gel" },
    { fact: "Sensitivity formula denominator", value: "TP + FN (everyone who truly has the disease)" },
    { fact: "Specificity formula denominator", value: "TN + FP (everyone who truly does not)" }
  ],

  flashcards: [
    { front: "Quality assurance (QA)", back: "Routine, repeated, recorded testing of a system to detect gradual degradation before it affects diagnosis", lesson: "u15-l1" },
    { front: "Routine periodic testing that catches slow drift in image quality — what is it called?", back: "Quality assurance", lesson: "u15-l1" },
    { front: "Preventive maintenance", back: "Scheduled upkeep (filters, cables, transducer faces, calibration) done to prevent failure, not react to it", lesson: "u15-l1" },
    { front: "Typical QA testing interval", back: "Quarterly to semi-annually, plus after every repair", lesson: "u15-l1" },
    { front: "Tissue-equivalent phantom — the two properties it imitates", back: "Speed 1,540 m/s and attenuation ≈ 0.5–0.7 dB/cm/MHz", lesson: "u15-l2" },
    { front: "Which phantom can test TGC/compensation and contrast resolution?", back: "The tissue-equivalent (tissue-mimicking) phantom — because it attenuates like tissue", lesson: "u15-l2" },
    { front: "Targets inside a tissue-equivalent phantom", back: "Nylon pins, anechoic cysts, hypo/hyperechoic solid masses, gray-scale/contrast steps", lesson: "u15-l2" },
    { front: "AIUM 100 mm test object — what is inside it?", back: "Thin nylon pins in a water/alcohol mixture tuned to 1,540 m/s", lesson: "u15-l3" },
    { front: "Why alcohol in the 100 mm test object?", back: "Plain water travels at ≈1,480 m/s; alcohol raises the mixture to 1,540 m/s", lesson: "u15-l3" },
    { front: "Two tests the 100 mm test object CANNOT do", back: "TGC/compensation and contrast (gray-scale) — no attenuation, no speckle", lesson: "u15-l3" },
    { front: "Vertical column of pins tests…", back: "Depth (vertical distance) calibration", lesson: "u15-l3" },
    { front: "Horizontal row of pins tests…", back: "Horizontal distance accuracy", lesson: "u15-l3" },
    { front: "Pins closely spaced along the beam test…", back: "Axial resolution", lesson: "u15-l3" },
    { front: "Pins closely spaced across the beam test…", back: "Lateral resolution", lesson: "u15-l3" },
    { front: "Pins just under the phantom surface test…", back: "The dead zone", lesson: "u15-l3" },
    { front: "Which pin group tests axial resolution?", back: "Two pins one behind the other along the beam", lesson: "u15-l3" },
    { front: "Dead zone", back: "Shallow region at the transducer face where imaging is impossible (crystal ringing / receiver blanked)", lesson: "u15-l4" },
    { front: "What makes the dead zone deeper?", back: "Longer pulses: lower frequency, less damping, more cycles per pulse", lesson: "u15-l4" },
    { front: "Clinical fix for a superficial structure inside the dead zone", back: "Standoff pad", lesson: "u15-l4" },
    { front: "Registration accuracy", back: "One target imaged from two different windows/angles must land on the same screen location", lesson: "u15-l4" },
    { front: "Which QA test uses the range equation (13 µs/cm)?", back: "Depth (vertical distance) calibration", lesson: "u15-l5" },
    { front: "Which is usually less accurate: vertical or horizontal distance?", back: "Horizontal — it depends on beam width, steering and line spacing", lesson: "u15-l5" },
    { front: "System sensitivity", back: "The weakest echo the system can detect and display; tested by the gain/output needed to show the deepest pin", lesson: "u15-l5" },
    { front: "Fixed vertical dark band on the uniformity test", back: "Dead array element or a broken conductor in the cable", lesson: "u15-l5" },
    { front: "Slice-thickness phantom", back: "Thin scattering plane inclined ≈45° in gel; shows elevational (section) thickness vs depth", lesson: "u15-l6" },
    { front: "Doppler string phantom", back: "Motor-driven string/belt moving at a known velocity; checks the machine's reported velocity", lesson: "u15-l6" },
    { front: "Four things a Doppler phantom tests", back: "Velocity accuracy, sample-volume size/placement, flow direction, Doppler penetration", lesson: "u15-l6" },
    { front: "Hydrophone / beam profiler", back: "Tiny pressure sensor in a water tank that maps beam shape and pressure — output measurement, not routine QA", lesson: "u15-l6" },
    { front: "Gold standard", back: "The accepted truth (surgery, biopsy, angiography, follow-up) that the test is graded against", lesson: "u15-l7" },
    { front: "False positive", back: "Test says disease; the gold standard says there is none — a false alarm", lesson: "u15-l7" },
    { front: "False negative", back: "Test says normal but the disease is really there — missed disease", lesson: "u15-l7" },
    { front: "True negative", back: "Test says normal and the patient truly has no disease", lesson: "u15-l7" },
    { front: "Sensitivity", back: "TP ÷ (TP + FN) — ability to detect disease when it is present", lesson: "u15-l8" },
    { front: "TP ÷ (TP + FN) is which statistic?", back: "Sensitivity", lesson: "u15-l8" },
    { front: "Specificity", back: "TN ÷ (TN + FP) — ability to call a healthy patient normal", lesson: "u15-l8" },
    { front: "TN ÷ (TN + FP) is which statistic?", back: "Specificity", lesson: "u15-l8" },
    { front: "Accuracy", back: "(TP + TN) ÷ (TP + TN + FP + FN) — all correct calls over everyone tested", lesson: "u15-l8" },
    { front: "PPV", back: "TP ÷ (TP + FP) — given a positive result, the chance the disease is really there", lesson: "u15-l8" },
    { front: "NPV", back: "TN ÷ (TN + FN) — given a negative result, the chance the patient is really clear", lesson: "u15-l8" },
    { front: "Which statistics does prevalence change?", back: "PPV and NPV only — never sensitivity or specificity", lesson: "u15-l8" },
    { front: "SnNout / SpPin", back: "Sensitive test Negative → rules OUT; Specific test Positive → rules IN", lesson: "u15-l8" }
  ],

  questions: [
    { id: "u15-q1", type: "mc", q: "What best describes quality assurance in an ultrasound department?", choices: ["Repairing a scanner after it stops producing images", "Routine, periodic testing to detect gradual degradation before it affects diagnosis", "A one-time acceptance test performed when a scanner is installed", "Adjusting gain and TGC on each patient to keep images consistent"], answer: 1, explain: "QA is scheduled, repeated testing compared over time. Repair (choice 1) is reactive and happens after failure, which is exactly what QA is designed to prevent; an acceptance test (choice 3) is a single snapshot, and a snapshot cannot reveal drift.", objectives: ["u15-o1"], lesson: "u15-l1", level: 1 },
    { id: "u15-q2", type: "tf", q: "Preventive maintenance and quality assurance are the same activity.", answer: false, explain: "They are partners, not twins. QA measures the system to detect degradation; preventive maintenance is the scheduled upkeep (filters, cables, connectors, calibration) done to stop failures happening.", objectives: ["u15-o1"], lesson: "u15-l1", level: 1 },
    { id: "u15-q3", type: "short", q: "How often is QA testing typically scheduled on a clinical scanner (give an interval)?", answer: "quarterly", accept: ["quarterly", "every 3 months", "every three months", "semi-annually", "twice a year", "quarterly or semi-annually"], explain: "Most departments test each system quarterly to semi-annually, and always after a repair or major service. The exact interval is departmental policy; what matters for the exam is that it is periodic and repeated.", objectives: ["u15-o1"], lesson: "u15-l1", level: 1 },
    { id: "u15-q4", type: "mc", q: "A phantom is described as having a propagation speed of 1,540 m/s and an attenuation of about 0.6 dB/cm/MHz. What kind of phantom is it?", choices: ["AIUM 100 mm test object", "Tissue-equivalent (tissue-mimicking) phantom", "Doppler string phantom", "Slice-thickness phantom"], answer: 1, explain: "Tissue-like attenuation of 0.5–0.7 dB/cm/MHz is the fingerprint of a tissue-mimicking phantom. The 100 mm test object also runs at 1,540 m/s, which makes it tempting, but its liquid filling barely attenuates at all — that is its defining limitation.", objectives: ["u15-o2"], lesson: "u15-l2", level: 2 },
    { id: "u15-q5", type: "mc", q: "Which QA test requires a phantom that attenuates like tissue?", choices: ["Axial resolution", "Horizontal distance accuracy", "TGC/compensation and true penetration", "Dead zone"], answer: 2, explain: "Compensation exists to undo attenuation, and penetration is limited by attenuation, so neither can be evaluated where echoes do not fade. Axial resolution, horizontal distance and dead zone are geometry checks that pins alone can provide, with or without attenuation.", objectives: ["u15-o2", "u15-o3"], lesson: "u15-l2", level: 2 },
    { id: "u15-q6", type: "short", q: "About what attenuation, in dB/cm/MHz, does a tissue-equivalent phantom imitate?", answer: "0.5 to 0.7", accept: ["0.5-0.7", "0.5 to 0.7", "0.5–0.7", "0.5 to 0.7 db/cm/mhz", "0.5-0.7 db/cm/mhz", "0.6", "about 0.5-0.7"], explain: "Soft tissue attenuates roughly 0.5–0.7 dB per centimetre per MHz (the familiar 0.5 dB/cm/MHz rule of thumb sits at the bottom of that band), and a tissue-mimicking gel is built to match it so echoes fade realistically with depth.", objectives: ["u15-o2"], lesson: "u15-l2", level: 1 },
    { id: "u15-q7", type: "mc", q: "The AIUM 100 mm test object is filled with a water/alcohol mixture rather than plain water because:", choices: ["Alcohol prevents bacterial growth in the sealed tank", "Alcohol raises the propagation speed of the mixture to 1,540 m/s", "Alcohol makes the liquid attenuate like soft tissue", "Alcohol keeps the nylon pins from corroding"], answer: 1, explain: "Plain water propagates sound at about 1,480 m/s, so pin depths would read short; the alcohol tunes the mixture to the 1,540 m/s the machine assumes. It does not add meaningful attenuation — if it did, the test object could test TGC, and it cannot.", objectives: ["u15-o3"], lesson: "u15-l3", level: 2 },
    { id: "u15-q8", type: "tf", q: "The AIUM 100 mm test object can be used to evaluate contrast (gray-scale) resolution.", answer: false, explain: "It holds point-like nylon pins in a nearly non-attenuating liquid with no tissue-like scattering background, so there are no gray levels to compare. Contrast resolution needs a tissue-equivalent phantom with hypo- and hyperechoic targets.", objectives: ["u15-o3"], lesson: "u15-l3", level: 2 },
    { id: "u15-q9", type: "mc", q: "Why are the filaments in a test object made only about 0.1 mm across?", choices: ["So they are smaller than a wavelength and behave as point targets", "So they attenuate the beam like soft tissue", "So they resonate at the transducer's frequency", "So they can be seen inside the dead zone"], answer: 0, explain: "A reflector much smaller than a wavelength scatters in all directions and images as a dot, which is what makes distance and resolution measurements meaningful. Attenuation (choice 1) is exactly what this device lacks, and a target that resonated would smear the measurement rather than sharpen it.", objectives: ["u15-o3"], lesson: "u15-l3", level: 2 },
    { id: "u15-q10", type: "short", q: "What propagation speed must a phantom or test object be built to have?", answer: "1,540 m/s", accept: ["1540 m/s", "1,540 m/s", "1540", "1.54 mm/us", "1.54 mm/µs", "1540 meters per second"], explain: "The scanner assumes 1,540 m/s when it converts round-trip time into depth. A phantom built at any other speed would put every pin at the wrong depth and make the calibration check meaningless.", objectives: ["u15-o3"], lesson: "u15-l3", level: 1 },
    { id: "u15-q11", type: "mc", q: "A vertical column of pins stacked at increasing depths is used to test:", choices: ["Lateral resolution", "Depth (vertical distance) calibration", "Dead zone", "Uniformity"], answer: 1, explain: "Pins stacked in depth check that the machine converts round-trip time into depth correctly. Lateral resolution needs pins side by side across the beam, so the tempting choice 0 tests the wrong axis entirely.", objectives: ["u15-o4"], lesson: "u15-l3", level: 1 },
    { id: "u15-q12", type: "mc", q: "On a phantom image, two pins that sit one behind the other 1 mm apart are displayed as a single elongated blob. Which QA test has failed?", choices: ["Lateral resolution", "Axial resolution", "Registration accuracy", "Depth calibration"], answer: 1, explain: "Pins separated along the beam test axial resolution, and failure to separate them means the pulse is too long (spatial pulse length too great). Lateral resolution would be the answer only if the pins were side by side across the beam.", objectives: ["u15-o4"], lesson: "u15-l3", level: 2 },
    { id: "u15-q13", type: "short", q: "Pins spaced side by side across the beam test which resolution?", answer: "lateral resolution", accept: ["lateral", "lateral resolution", "lateral (angular) resolution", "transverse resolution"], explain: "Separating two targets side by side is the definition of lateral resolution, and it is limited by beam width. Pins one behind the other along the beam would test axial resolution instead.", objectives: ["u15-o4"], lesson: "u15-l3", level: 1 },
    { id: "u15-q14", type: "mc", q: "A phantom is imaged and the pins in the horizontal row at 4 cm depth measure 19 mm apart when their true spacing is 20 mm, while the vertical column measures correctly. What does this suggest?", choices: ["The transducer has a dead element", "Horizontal (lateral) distance calibration is off", "The dead zone is too deep", "The system's sensitivity has fallen"], answer: 1, explain: "Vertical measurements come straight from timing and are correct here, so the timing and assumed speed are fine; only side-to-side positioning — which depends on beam steering and line spacing — is off. A dead element would show as a dark vertical band, not a spacing error.", objectives: ["u15-o4", "u15-o5"], lesson: "u15-l5", level: 3 },
    { id: "u15-q15", type: "short", q: "Which QA test uses pins strung just below the phantom surface?", answer: "dead zone", accept: ["dead zone", "deadzone", "dead zone test", "ring-down zone"], explain: "Very shallow pins reveal the shallowest depth the system can display; anything nearer is lost inside the transmit pulse and ring-down. Depth calibration would use pins spread over the full depth instead.", objectives: ["u15-o4", "u15-o5"], lesson: "u15-l4", level: 1 },
    { id: "u15-q16", type: "mc", q: "What causes the dead zone?", choices: ["Attenuation of very shallow echoes", "The transducer is still transmitting and ringing while the earliest echoes return", "Refraction at the skin surface", "Grating lobes from the array"], answer: 1, explain: "Echoes from the first millimetre or two arrive while the element is still ringing and the receiver is blanked, so they cannot be processed. Attenuation is negligible over 1–2 mm, so choice 0 is backwards — attenuation limits the deep end of the image, not the shallow end.", objectives: ["u15-o5"], lesson: "u15-l4", level: 1 },
    { id: "u15-q17", type: "mc", q: "A transducer is swapped from 10 MHz with heavy damping to 3 MHz with light damping. What happens to the dead zone?", choices: ["It gets deeper", "It gets shallower", "It is unchanged", "It disappears entirely"], answer: 0, explain: "Lower frequency and lighter damping both lengthen the pulse, and dead-zone depth tracks pulse length, so the blind band grows. The instinct that a lower frequency 'penetrates better' is about the deep end of the image and has nothing to do with the near field.", objectives: ["u15-o5"], lesson: "u15-l4", level: 2 },
    { id: "u15-q18", type: "tf", q: "Registration accuracy is checked by imaging the same target from two different windows and confirming it appears in the same location.", answer: true, explain: "That is exactly the test: if the system's geometry and beam steering are honest, one pin scanned from two directions lands on one screen spot. Two spots mean mis-registration and unreliable angled measurements.", objectives: ["u15-o5"], lesson: "u15-l4", level: 1 },
    { id: "u15-q19", type: "short", q: "A fixed vertical dark band runs the full depth of a uniformity image. What is the most likely cause?", answer: "dead element", accept: ["dead element", "dead crystal", "nonfunctioning element", "broken cable conductor", "dead element or broken cable"], explain: "A column of the image is built from one small group of elements; if they are not firing or their conductor is broken, that column stays dark at every depth. Gel or debris on the face causes a band that moves when you rock the probe.", objectives: ["u15-o5"], lesson: "u15-l5", level: 2 },
    { id: "u15-q20", type: "mc", q: "This quarter's QA shows that displaying the deepest pin requires noticeably more gain than last quarter, and penetration is 1 cm shallower. Which test has detected a problem?", choices: ["Registration accuracy", "System sensitivity", "Horizontal distance accuracy", "Dead zone"], answer: 1, explain: "System sensitivity is the weakest echo the system can display, tested as the gain/output needed to show the deepest pin and the depth still visible — both have degraded. Registration and distance tests are about geometry, and neither would change because echoes got weaker.", objectives: ["u15-o5"], lesson: "u15-l5", level: 2 },
    { id: "u15-q21", type: "mc", q: "A slice-thickness phantom contains:", choices: ["A thin plane of scatterers inclined at about 45 degrees", "A row of nylon pins at increasing depths", "A moving string driven by a motor", "A set of anechoic cylinders of different diameters"], answer: 0, explain: "The inclined plane lets the beam cut it at every depth, so the displayed thickness of the band reveals the section thickness at that depth. A row of pins (choice 1) measures in-plane distances and says nothing about the elevational dimension.", objectives: ["u15-o6"], lesson: "u15-l6", level: 1 },
    { id: "u15-q22", type: "mc", q: "Which test tool would you use to verify that a machine reporting 50 cm/s is actually correct?", choices: ["AIUM 100 mm test object", "Slice-thickness phantom", "Doppler string or flow phantom", "Tissue-equivalent gray-scale phantom"], answer: 2, explain: "Only a Doppler phantom supplies a known, independently set velocity to compare with. The gray-scale phantom is tempting because it is the 'full-featured' phantom, but static targets cannot produce a Doppler shift to check.", objectives: ["u15-o6"], lesson: "u15-l6", level: 2 },
    { id: "u15-q23", type: "short", q: "What device is swept through a beam in a water tank to map its shape and pressure?", answer: "hydrophone", accept: ["hydrophone", "beam profiler", "hydrophone or beam profiler", "beam profiler/hydrophone"], explain: "A hydrophone (beam profiler) measures real acoustic pressure point by point, which is how intensities, MI and TI are derived. It is laboratory output measurement performed by manufacturers and physicists, not a routine departmental QA test.", objectives: ["u15-o6"], lesson: "u15-l6", level: 1 },
    { id: "u15-q24", type: "tf", q: "A Doppler phantom can be used to check sample-volume placement as well as velocity accuracy.", answer: true, explain: "With a target moving at a known speed at a known depth, you can confirm both that the reported velocity is right and that the gate graphic sits where the signal actually comes from. Doppler penetration and flow direction are checked the same way.", objectives: ["u15-o6"], lesson: "u15-l6", level: 1 },
    { id: "u15-q25", type: "mc", q: "Ultrasound reports a solid renal mass. Pathology after surgery shows only a cyst with no tumour. This result is a:", choices: ["True positive", "False positive", "True negative", "False negative"], answer: 1, explain: "The test claimed disease (positive) and the gold standard says there is none, so it is a false alarm — a false positive. False negative is the mirror error: the test says normal while disease is present.", objectives: ["u15-o7"], lesson: "u15-l7", level: 2 },
    { id: "u15-q26", type: "mc", q: "Which square of the 2×2 table usually carries the greatest risk to the patient?", choices: ["True positive", "False positive", "True negative", "False negative"], answer: 3, explain: "A false negative sends a patient with real disease home reassured and untreated. A false positive is also harmful — extra tests, cost and anxiety — but it usually gets corrected by the next investigation, while a missed disease may not be.", objectives: ["u15-o7"], lesson: "u15-l7", level: 2 },
    { id: "u15-q27", type: "short", q: "What is the name for the accepted reference of truth that an ultrasound result is compared against?", answer: "gold standard", accept: ["gold standard", "the gold standard", "reference standard"], explain: "Surgery, biopsy, angiography or long-term follow-up serve as the gold standard, and every one of TP, FP, TN and FN is defined relative to it. Without an agreed truth, none of the five statistics can be calculated.", objectives: ["u15-o7"], lesson: "u15-l7", level: 1 },
    { id: "u15-q28", type: "tf", q: "A negative ultrasound in a patient who truly has no disease is called a true negative.", answer: true, explain: "The test said negative and the gold standard agrees, so the call was correct: true negative. Remember the pattern — true/false describes whether the test was right, positive/negative describes what the test claimed.", objectives: ["u15-o7"], lesson: "u15-l7", level: 1 },
    { id: "u15-q29", type: "mc", q: "In a study, TP = 45, FN = 5, TN = 40, FP = 10. What is the sensitivity?", choices: ["80 %", "82 %", "90 %", "75 %"], answer: 2, explain: "Sensitivity = TP ÷ (TP + FN) = 45 ÷ 50 = 90 %. The tempting 80 % is the specificity (40 ÷ 50) — the giveaway is the denominator: sensitivity divides by everyone who truly has the disease.", objectives: ["u15-o8"], lesson: "u15-l8", level: 3 },
    { id: "u15-q30", type: "mc", q: "Using TP = 45, FN = 5, TN = 40, FP = 10, what is the positive predictive value?", choices: ["90 %", "82 %", "80 %", "85 %"], answer: 1, explain: "PPV = TP ÷ (TP + FP) = 45 ÷ 55 = 81.8 ≈ 82 %. Choice 0 (90 %) is the sensitivity; PPV reads across the positive-test row, while sensitivity reads down the disease-present column.", objectives: ["u15-o8"], lesson: "u15-l8", level: 3 },
    { id: "u15-q31", type: "mc", q: "Which statistic answers: 'Of all the patients who truly have no disease, how many did the test correctly clear?'", choices: ["Sensitivity", "Specificity", "Negative predictive value", "Accuracy"], answer: 1, explain: "Starting from the truly healthy group means the denominator is TN + FP, which is specificity. NPV is the mirror-image question — it starts from the negative results, not from the healthy patients — and its denominator is TN + FN.", objectives: ["u15-o8"], lesson: "u15-l8", level: 2 },
    { id: "u15-q32", type: "short", q: "Which statistic is calculated as TN ÷ (TN + FN)?", answer: "negative predictive value", accept: ["npv", "negative predictive value", "neg predictive value"], explain: "That denominator is everyone the test called negative, so the fraction answers 'my scan was negative — how likely is it that I am really clear?' Specificity looks similar but divides by TN + FP, everyone truly healthy.", objectives: ["u15-o8"], lesson: "u15-l8", level: 2 },
    { id: "u15-q33", type: "mc", q: "A test has TP = 30, FP = 20, TN = 120, FN = 30. What is the accuracy?", choices: ["50 %", "75 %", "60 %", "86 %"], answer: 1, explain: "Accuracy = (TP + TN) ÷ everyone = (30 + 120) ÷ 200 = 75 %. Choice 0 (50 %) is the sensitivity (30 ÷ 60) — accuracy must use all four squares in the denominator, not just one column.", objectives: ["u15-o8"], lesson: "u15-l8", level: 3 },
    { id: "u15-q34", type: "mc", q: "The same test, with unchanged sensitivity and specificity, is moved from a high-risk referral clinic to a general screening population. What happens?", choices: ["Sensitivity falls and specificity rises", "PPV falls and NPV rises", "PPV rises and NPV falls", "Accuracy is unchanged and PPV is unchanged"], answer: 1, explain: "Lower prevalence means fewer true positives among the same rate of false alarms, so PPV falls while NPV climbs. Sensitivity and specificity are measured within the diseased and healthy groups separately, so changing the mix cannot move them.", objectives: ["u15-o9"], lesson: "u15-l8", level: 3 },
    { id: "u15-q35", type: "short", q: "Which two statistics change when the prevalence of disease changes?", answer: "PPV and NPV", accept: ["ppv and npv", "predictive values", "positive and negative predictive value", "ppv npv", "ppv, npv"], explain: "Predictive values mix the diseased and healthy groups, so the proportion of each changes the answer. Sensitivity and specificity have denominators taken from one group only, which is why prevalence leaves them untouched.", objectives: ["u15-o9"], lesson: "u15-l8", level: 2 },
    { id: "u15-q36", type: "tf", q: "If a test is 95 % sensitive, then a positive result means the patient has a 95 % chance of having the disease.", answer: false, explain: "That statement describes PPV, not sensitivity, and PPV depends on prevalence. Sensitivity starts from patients who are already known to have the disease and asks how many were caught; it cannot tell you what a positive result means for an individual.", objectives: ["u15-o9", "u15-o8"], lesson: "u15-l8", level: 2 },
    { id: "u15-q37", type: "mc", q: "Which statement about the highly sensitive test is correct?", choices: ["A positive result rules the disease in", "A negative result helps rule the disease out", "It produces very few false positives", "Its value rises as prevalence rises"], answer: 1, explain: "SnNout: a sensitive test rarely misses disease, so a negative result is reassuring. Ruling in on a positive is the job of a highly specific test (SpPin), and few false positives is the definition of specificity, not sensitivity.", objectives: ["u15-o8", "u15-o9"], lesson: "u15-l8", level: 2 }
  ],

  drills: [
    {
      id: "u15-d1", title: "Sensitivity from a 2×2 table", formula: "Sensitivity = TP ÷ (TP + FN) × 100", lesson: "u15-l8",
      gen: function (rnd) {
        var tp = 30 + Math.floor(rnd() * 60);
        var fn = 2 + Math.floor(rnd() * 20);
        var fp = 3 + Math.floor(rnd() * 22);
        var tn = 40 + Math.floor(rnd() * 70);
        var sn = tp / (tp + fn) * 100;
        return {
          kind: "number",
          given: "TP = " + tp + ", FP = " + fp + ", FN = " + fn + ", TN = " + tn,
          ask: "What is the sensitivity (%)?",
          answer: +sn.toFixed(2), unit: "%", tol: 0.6,
          steps: [
            "Sensitivity starts with everyone who truly HAS the disease: TP + FN",
            "TP + FN = " + tp + " + " + fn + " = " + (tp + fn),
            "Sensitivity = " + tp + " ÷ " + (tp + fn) + " × 100 = " + sn.toFixed(1) + " %",
            "FP and TN are not used — they belong to the healthy column"
          ]
        };
      }
    },
    {
      id: "u15-d2", title: "Specificity from a 2×2 table", formula: "Specificity = TN ÷ (TN + FP) × 100", lesson: "u15-l8",
      gen: function (rnd) {
        var tp = 25 + Math.floor(rnd() * 55);
        var fn = 3 + Math.floor(rnd() * 18);
        var fp = 4 + Math.floor(rnd() * 26);
        var tn = 50 + Math.floor(rnd() * 80);
        var sp = tn / (tn + fp) * 100;
        return {
          kind: "number",
          given: "TP = " + tp + ", FP = " + fp + ", FN = " + fn + ", TN = " + tn,
          ask: "What is the specificity (%)?",
          answer: +sp.toFixed(2), unit: "%", tol: 0.6,
          steps: [
            "Specificity starts with everyone who is truly HEALTHY: TN + FP",
            "TN + FP = " + tn + " + " + fp + " = " + (tn + fp),
            "Specificity = " + tn + " ÷ " + (tn + fp) + " × 100 = " + sp.toFixed(1) + " %",
            "TP and FN belong to the diseased column and are ignored here"
          ]
        };
      }
    },
    {
      id: "u15-d3", title: "Accuracy from a 2×2 table", formula: "Accuracy = (TP + TN) ÷ (TP + TN + FP + FN) × 100", lesson: "u15-l8",
      gen: function (rnd) {
        var tp = 20 + Math.floor(rnd() * 60);
        var fn = 2 + Math.floor(rnd() * 24);
        var fp = 2 + Math.floor(rnd() * 28);
        var tn = 40 + Math.floor(rnd() * 90);
        var total = tp + fn + fp + tn;
        var acc = (tp + tn) / total * 100;
        return {
          kind: "number",
          given: "TP = " + tp + ", FP = " + fp + ", FN = " + fn + ", TN = " + tn,
          ask: "What is the accuracy (%)?",
          answer: +acc.toFixed(2), unit: "%", tol: 0.6,
          steps: [
            "Correct calls = TP + TN = " + tp + " + " + tn + " = " + (tp + tn),
            "Everyone tested = " + tp + " + " + fp + " + " + fn + " + " + tn + " = " + total,
            "Accuracy = " + (tp + tn) + " ÷ " + total + " × 100 = " + acc.toFixed(1) + " %",
            "Accuracy is the only one of the five that uses all four squares in its denominator"
          ]
        };
      }
    },
    {
      id: "u15-d4", title: "Predictive values (PPV and NPV)", formula: "PPV = TP ÷ (TP + FP) ; NPV = TN ÷ (TN + FN)", lesson: "u15-l8",
      gen: function (rnd) {
        var tp = 25 + Math.floor(rnd() * 60);
        var fn = 3 + Math.floor(rnd() * 22);
        var fp = 4 + Math.floor(rnd() * 30);
        var tn = 45 + Math.floor(rnd() * 85);
        var wantPpv = rnd() < 0.5;
        var val = wantPpv ? tp / (tp + fp) * 100 : tn / (tn + fn) * 100;
        return {
          kind: "number",
          given: "TP = " + tp + ", FP = " + fp + ", FN = " + fn + ", TN = " + tn,
          ask: wantPpv ? "What is the positive predictive value (%)?" : "What is the negative predictive value (%)?",
          answer: +val.toFixed(2), unit: "%", tol: 0.6,
          steps: wantPpv
            ? ["PPV reads ACROSS the positive-test row: TP + FP",
               "TP + FP = " + tp + " + " + fp + " = " + (tp + fp),
               "PPV = " + tp + " ÷ " + (tp + fp) + " × 100 = " + val.toFixed(1) + " %",
               "Do not use TP + FN — that denominator gives sensitivity"]
            : ["NPV reads ACROSS the negative-test row: TN + FN",
               "TN + FN = " + tn + " + " + fn + " = " + (tn + fn),
               "NPV = " + tn + " ÷ " + (tn + fn) + " × 100 = " + val.toFixed(1) + " %",
               "Do not use TN + FP — that denominator gives specificity"]
        };
      }
    },
    {
      id: "u15-d5", title: "Which phantom or QA test checks this?", formula: "target pattern → the test it performs", lesson: "u15-l3",
      gen: function (rnd) {
        var choices = [
          "Vertical pin column — depth (vertical distance) calibration",
          "Horizontal pin row — horizontal distance accuracy",
          "Pins spaced along the beam — axial resolution",
          "Pins spaced across the beam — lateral resolution",
          "Pins just under the surface — dead zone",
          "Deepest pin with gain raised — system sensitivity",
          "One pin from two windows — registration accuracy",
          "Moving-string Doppler phantom — velocity accuracy"
        ];
        var items = [
          "A structure known to be 10 cm deep must appear at 10 cm on the screen.",
          "Two targets 20 mm apart side by side at the same depth must measure 20 mm apart.",
          "Two targets 1 mm apart, one behind the other along the beam, must be shown as two dots.",
          "Two targets 2 mm apart at the same depth, side by side, must be shown as two dots.",
          "How close to the transducer face can a target still be displayed at all?",
          "How much gain is needed before the deepest target appears, and how deep can we still see?",
          "The same target is scanned from two different windows and must land on one screen spot.",
          "A target moving at a known 40 cm/s must be reported by the machine as 40 cm/s."
        ];
        var i = Math.floor(rnd() * items.length);
        if (i > 7) { i = 7; }
        return {
          kind: "choice",
          given: items[i],
          ask: "Which QA test or target arrangement does this?",
          choices: choices,
          answer: i,
          steps: [
            "Ask first: is this about distance, resolution, the near field, weak echoes, geometry, or motion?",
            "Answer: " + choices[i]
          ]
        };
      }
    },
    {
      id: "u15-d6", title: "True or false, positive or negative?", formula: "test result × gold standard → TP / FP / TN / FN", lesson: "u15-l7",
      gen: function (rnd) {
        var ctx = [
          { d: "gallstones", g: "surgery" },
          { d: "a deep vein thrombosis", g: "venography" },
          { d: "an ovarian tumour", g: "pathology" },
          { d: "a carotid stenosis over 70 %", g: "angiography" }
        ];
        var c = ctx[Math.floor(rnd() * ctx.length)] || ctx[0];
        var testPos = rnd() < 0.5;
        var diseased = rnd() < 0.5;
        var idx = testPos ? (diseased ? 0 : 1) : (diseased ? 3 : 2);
        return {
          kind: "choice",
          given: "Ultrasound is " + (testPos ? "POSITIVE" : "NEGATIVE") + " for " + c.d +
                 ". The gold standard (" + c.g + ") shows the disease is " + (diseased ? "PRESENT" : "ABSENT") + ".",
          ask: "Classify this result.",
          choices: ["True positive", "False positive", "True negative", "False negative"],
          answer: idx,
          steps: [
            "'Positive / negative' = what the TEST said: " + (testPos ? "positive" : "negative"),
            "'True / false' = whether the test agreed with the gold standard: " + (testPos === diseased ? "it agreed, so TRUE" : "it disagreed, so FALSE"),
            "Result: " + ["true positive", "false positive", "true negative", "false negative"][idx]
          ]
        };
      }
    }
  ],

  whiteboard: [
    {
      id: "u15-w1",
      prompt: "Draw the AIUM 100 mm test object from memory. Label every pin group with the test it performs, and write what this device cannot test and why.",
      keyPoints: [
        "Sealed tank of water + alcohol, tuned to 1,540 m/s at room temperature",
        "Nylon filaments about 0.1 mm across, acting as point targets",
        "Vertical column of pins → depth (vertical distance) calibration",
        "Horizontal row of pins → horizontal distance accuracy",
        "Pins closely spaced along the beam → axial resolution",
        "Pins closely spaced across the beam → lateral resolution",
        "Pins just under the surface → dead zone",
        "Same pin from two windows → registration accuracy",
        "Cannot test TGC/compensation — there is no attenuation to compensate for",
        "Cannot test contrast/gray scale — no tissue-like scattering background",
        "Sensitivity measured here flatters the machine, because echoes are not fading"
      ],
      minutes: 7, lesson: "u15-l3"
    },
    {
      id: "u15-w2",
      prompt: "Draw the 2×2 table, label all four squares, and write all five statistics with their full formulas. Then write one sentence on what prevalence does.",
      keyPoints: [
        "Columns = gold standard truth (disease present / absent); rows = test result (+ / −)",
        "TP = test positive, disease present",
        "FP = test positive, no disease (false alarm)",
        "FN = test negative, disease present (missed disease — most dangerous)",
        "TN = test negative, no disease",
        "Sensitivity = TP ÷ (TP + FN) — detects disease when present",
        "Specificity = TN ÷ (TN + FP) — clears the healthy",
        "Accuracy = (TP + TN) ÷ (TP + TN + FP + FN)",
        "PPV = TP ÷ (TP + FP) — positive result, how likely is disease",
        "NPV = TN ÷ (TN + FN) — negative result, how likely is health",
        "Sn and Sp read down the columns; PPV and NPV read across the rows",
        "Prevalence changes PPV and NPV only; sensitivity and specificity do not move",
        "SnNout / SpPin"
      ],
      minutes: 8, lesson: "u15-l8"
    },
    {
      id: "u15-w3",
      prompt: "List every routine QA test you know. For each, write what it measures and what a failure looks like on the image.",
      keyPoints: [
        "Depth (vertical) calibration — pins at known depths; failure = measured depth off by more than about 1–2 mm or 2 %",
        "Horizontal distance accuracy — pins side by side; usually less accurate than vertical",
        "Axial resolution — closely spaced pins along the beam; failure = two pins blur into one blob in depth",
        "Lateral resolution — closely spaced pins across the beam; failure = side-by-side pins merge, or dots smear sideways",
        "Dead zone — shallow pins; failure = shallowest visible pin is deeper than before",
        "Registration accuracy — same pin from two windows; failure = pin appears in two places",
        "System sensitivity — gain needed for the deepest pin; failure = more gain needed, less penetration",
        "Uniformity — evenly bright field; failure = fixed vertical dark band = dead element or broken cable",
        "Contrast/gray-scale and TGC — need an attenuating tissue-equivalent phantom",
        "All tests repeated with the same transducer, preset, depth and gain, and recorded for comparison",
        "Also inspect transducer faces and cables (preventive maintenance)"
      ],
      minutes: 8, lesson: "u15-l5"
    },
    {
      id: "u15-w4",
      prompt: "Compare the four test devices — tissue-equivalent phantom, AIUM 100 mm test object, slice-thickness phantom, Doppler phantom — plus the hydrophone. Say what each can and cannot do.",
      keyPoints: [
        "Tissue-equivalent phantom: 1,540 m/s and 0.5–0.7 dB/cm/MHz, tissue-like speckle",
        "Tissue-equivalent phantom targets: pins, anechoic cysts, solid masses, gray-scale steps",
        "Tissue-equivalent phantom can test everything the test object can PLUS TGC, contrast and true penetration",
        "AIUM 100 mm test object: nylon pins in water/alcohol at 1,540 m/s, essentially no attenuation",
        "100 mm test object: distance, axial and lateral resolution, dead zone, registration — but no TGC, no contrast",
        "Slice-thickness phantom: inclined plane of scatterers (≈45°) showing elevational/section thickness vs depth",
        "Section thickness is thinnest at the elevational focus",
        "Doppler phantom: moving string/belt at a known speed, or pump-driven flow phantom",
        "Doppler phantom tests velocity accuracy, sample-volume size and placement, direction, Doppler penetration",
        "Hydrophone / beam profiler: maps real beam shape and pressure in water; used for output (intensities, MI, TI)",
        "Hydrophone is measurement by manufacturers and physicists, not routine departmental QA"
      ],
      minutes: 7, lesson: "u15-l6"
    }
  ]
});
