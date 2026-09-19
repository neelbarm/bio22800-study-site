window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u01",
  order: 1,
  title: "Math Foundations",
  icon: "🧮",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — mathematics review / units, prefixes and proportionality chapter",
  blurb: "The small pile of arithmetic that every later unit leans on: metric prefixes, unit conversion, scientific notation, reciprocals, proportionality, percent, decibels and one-step algebra. Nothing here is hard — but every calculation question on the exam is won or lost on it.",

  objectives: [
    { id: "u01-o1", text: "List the metric prefixes from giga down to pico with their symbols and powers of ten, and say which are larger and which are smaller than the base unit." },
    { id: "u01-o2", text: "Convert a quantity from one metric unit to another by moving the decimal point the correct number of places, and check that the answer is the right size." },
    { id: "u01-o3", text: "Write a number in scientific notation and convert scientific notation back to standard form, including negative exponents." },
    { id: "u01-o4", text: "Define reciprocal and calculate one quantity from another when the two are reciprocals, as frequency and period are." },
    { id: "u01-o5", text: "Distinguish direct from inverse proportionality and predict what happens to one quantity when the other is multiplied or divided by a factor." },
    { id: "u01-o6", text: "Calculate a percentage of a quantity and a percent change, and convert among fractions, decimals and percents." },
    { id: "u01-o7", text: "Explain that the decibel is a relative, logarithmic unit and use the 3 dB and 10 dB rules to convert between decibels and factor changes." },
    { id: "u01-o8", text: "Rearrange a simple equation to solve for any variable and carry the units through the calculation." }
  ],

  lessons: [
    {
      id: "u01-l1",
      title: "The metric ladder: prefixes are just nicknames for powers of ten",
      objectives: ["u01-o1"],
      html: `<p class="lead">A metric prefix is not new physics. It is a nickname stuck on the front of a unit that means "multiply by this power of ten".</p>
<p>Picture a ladder standing in the middle of a room. The floor is the <span class="kw">base unit</span> — the plain second, the plain meter, the plain hertz, the plain watt. Every rung up multiplies by a thousand: <b>kilo</b> (10<sup>3</sup>), <b>mega</b> (10<sup>6</sup>), <b>giga</b> (10<sup>9</sup>). Every rung down divides by a thousand: <b>milli</b> (10<sup>-3</sup>), <b>micro</b> (10<sup>-6</sup>), <b>nano</b> (10<sup>-9</sup>), <b>pico</b> (10<sup>-12</sup>). One oddball, <b>centi</b> (10<sup>-2</sup>), lives on a half-step between the floor and milli, which is why centimeters and millimeters differ by only ten.</p>
<table class="dt">
<tr><th>Prefix</th><th>Symbol</th><th>Means</th><th>You will meet it in</th></tr>
<tr><td>giga</td><td>G</td><td>10<sup>9</sup> (billion)</td><td>computer memory, GHz</td></tr>
<tr><td>mega</td><td>M</td><td>10<sup>6</sup> (million)</td><td>MHz — every transducer</td></tr>
<tr><td>kilo</td><td>k</td><td>10<sup>3</sup> (thousand)</td><td>kHz — the edge of hearing</td></tr>
<tr><td>centi</td><td>c</td><td>10<sup>-2</sup> (hundredth)</td><td>cm — imaging depth</td></tr>
<tr><td>milli</td><td>m</td><td>10<sup>-3</sup> (thousandth)</td><td>mm — wavelength, resolution</td></tr>
<tr><td>micro</td><td>µ</td><td>10<sup>-6</sup> (millionth)</td><td>µs — period, pulse duration</td></tr>
<tr><td>nano</td><td>n</td><td>10<sup>-9</sup> (billionth)</td><td>nanoseconds in electronics</td></tr>
<tr><td>pico</td><td>p</td><td>10<sup>-12</sup> (trillionth)</td><td>very small capacitances</td></tr>
</table>
<div class="callout key">Memorize these eight. Ultrasound lives almost entirely in four of them: <b>MHz</b>, <b>cm</b>, <b>mm</b> and <b>µs</b>.</div>
<div class="callout warn">Capital <b>M</b> is mega (a million); lowercase <b>m</b> is milli (a thousandth). They differ by a factor of one billion. Writing "mHz" when you mean "MHz" is a real mistake, not a typo.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Metric prefix ladder from giga down to pico with powers of ten</title>
<text x="300" y="28" text-anchor="middle" fill="currentColor" font-size="16">Labeled powers — spacing is not to scale</text>
<line x1="25" y1="112" x2="575" y2="112" stroke="currentColor" stroke-width="2"/>
<line x1="45" y1="104" x2="45" y2="120" stroke="var(--c1)" stroke-width="3"/>
<line x1="109" y1="104" x2="109" y2="120" stroke="var(--c1)" stroke-width="3"/>
<line x1="173" y1="104" x2="173" y2="120" stroke="var(--c1)" stroke-width="3"/>
<line x1="237" y1="100" x2="237" y2="124" stroke="var(--c3)" stroke-width="4"/>
<line x1="301" y1="104" x2="301" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="365" y1="104" x2="365" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="429" y1="104" x2="429" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="493" y1="104" x2="493" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="557" y1="104" x2="557" y2="120" stroke="var(--c2)" stroke-width="3"/>
<text x="45" y="94" text-anchor="middle" fill="currentColor" font-size="15">giga</text>
<text x="109" y="94" text-anchor="middle" fill="currentColor" font-size="15">mega</text>
<text x="173" y="94" text-anchor="middle" fill="currentColor" font-size="15">kilo</text>
<text x="237" y="90" text-anchor="middle" fill="currentColor" font-size="15">base</text>
<text x="301" y="94" text-anchor="middle" fill="currentColor" font-size="15">centi</text>
<text x="365" y="94" text-anchor="middle" fill="currentColor" font-size="15">milli</text>
<text x="429" y="94" text-anchor="middle" fill="currentColor" font-size="15">micro</text>
<text x="493" y="94" text-anchor="middle" fill="currentColor" font-size="15">nano</text>
<text x="557" y="94" text-anchor="middle" fill="currentColor" font-size="15">pico</text>
<text x="45" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁹</text>
<text x="109" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁶</text>
<text x="173" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10³</text>
<text x="237" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁰</text>
<text x="301" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁻²</text>
<text x="365" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁻³</text>
<text x="429" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁻⁶</text>
<text x="493" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁻⁹</text>
<text x="557" y="140" text-anchor="middle" fill="var(--muted)" font-size="15">10⁻¹²</text>
<text x="25" y="180" fill="var(--c1)" font-size="15">BIG unit, few of them</text>
<text x="575" y="180" text-anchor="end" fill="var(--c2)" font-size="15">tiny unit, lots of them</text>
<text x="300" y="215" text-anchor="middle" fill="currentColor" font-size="15">Same amount either way — only the nickname changed</text>
</svg>`, caption: "The prefix ladder. Big units on the left, tiny units on the right, base unit in the middle." }
      ],
      sayIt: "Out loud, from giga to pico: name every prefix, its symbol, and its power of ten. Then say which four you will use every single day in ultrasound.",
      keyPoints: [
        "A prefix is just a power of ten stuck to the front of a unit",
        "giga 10⁹, mega 10⁶, kilo 10³, centi 10⁻², milli 10⁻³, micro 10⁻⁶, nano 10⁻⁹, pico 10⁻¹²",
        "Big prefixes are left of the base unit, small prefixes right",
        "Ultrasound's four favorites: MHz, cm, mm, µs",
        "Capital M = mega (million), lowercase m = milli (thousandth)"
      ]
    },

    {
      id: "u01-l2",
      title: "Converting units: count the hops, move the decimal",
      objectives: ["u01-o1", "u01-o2"],
      html: `<p class="lead">Converting metric units is not multiplication you need a calculator for. It is walking the decimal point along the ladder and counting the hops.</p>
<p>Two questions, every time. <b>Which direction?</b> Going to a <i>smaller</i> unit means you will need <i>more</i> of them, so the number gets bigger and the decimal hops <b>right</b>. Going to a <i>bigger</i> unit means fewer of them, so the number gets smaller and the decimal hops <b>left</b>. <b>How many hops?</b> Subtract the powers of ten. Mega is 10<sup>6</sup> and the base is 10<sup>0</sup>, so MHz to Hz is six hops.</p>
<p>Worked examples, the way you should scribble them:</p>
<ul>
<li>5 MHz to Hz: smaller unit, 6 hops right, <b>5,000,000 Hz</b>.</li>
<li>0.25 s to ms: smaller unit, 3 hops right, <b>250 ms</b>.</li>
<li>1,500 µs to ms: bigger unit, 3 hops left, <b>1.5 ms</b>.</li>
<li>8.4 cm to mm: mm is ten times smaller than cm, 1 hop right, <b>84 mm</b>.</li>
<li>1,540 m/s to mm/µs: this one is famous — it equals <b>1.54 mm/µs</b>.</li>
</ul>
<div class="callout tip">Sanity check before you circle anything: <span class="kw">smaller unit, bigger number</span>. If you converted seconds to microseconds and your number got smaller, you hopped the wrong way.</div>
<div class="callout key">The two conversions you will use constantly: <b>1 MHz = 1,000,000 Hz</b> and <b>1 s = 1,000 ms = 1,000,000 µs</b>. Also <b>1 cm = 10 mm</b>.</div>
<p>One more habit worth building now: write the unit next to every number, in every line of every calculation. Units are free error-checking. If you are solving for a wavelength and your units come out as microseconds, you already know you multiplied where you should have divided.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>Six decimal hops converting 2.5 megahertz into hertz</title>
<text x="300" y="30" text-anchor="middle" fill="currentColor" font-size="16">2.5 MHz → Hz : six hops to the right</text>
<text x="118" y="60" text-anchor="middle" fill="var(--muted)" font-size="14">1</text>
<text x="158" y="60" text-anchor="middle" fill="var(--muted)" font-size="14">2</text>
<text x="198" y="60" text-anchor="middle" fill="var(--muted)" font-size="14">3</text>
<text x="238" y="60" text-anchor="middle" fill="var(--muted)" font-size="14">4</text>
<text x="278" y="60" text-anchor="middle" fill="var(--muted)" font-size="14">5</text>
<text x="318" y="60" text-anchor="middle" fill="var(--muted)" font-size="14">6</text>
<path d="M98 100 Q118 68 138 100" fill="none" stroke="var(--c2)" stroke-width="2"/>
<path d="M138 100 Q158 68 178 100" fill="none" stroke="var(--c2)" stroke-width="2"/>
<path d="M178 100 Q198 68 218 100" fill="none" stroke="var(--c2)" stroke-width="2"/>
<path d="M218 100 Q238 68 258 100" fill="none" stroke="var(--c2)" stroke-width="2"/>
<path d="M258 100 Q278 68 298 100" fill="none" stroke="var(--c2)" stroke-width="2"/>
<path d="M298 100 Q318 68 338 100" fill="none" stroke="var(--c2)" stroke-width="2"/>
<text x="98" y="130" text-anchor="middle" fill="var(--c1)" font-size="22">2</text>
<text x="138" y="130" text-anchor="middle" fill="var(--c1)" font-size="22">5</text>
<text x="178" y="130" text-anchor="middle" fill="currentColor" font-size="22">0</text>
<text x="218" y="130" text-anchor="middle" fill="currentColor" font-size="22">0</text>
<text x="258" y="130" text-anchor="middle" fill="currentColor" font-size="22">0</text>
<text x="298" y="130" text-anchor="middle" fill="currentColor" font-size="22">0</text>
<text x="338" y="130" text-anchor="middle" fill="currentColor" font-size="22">0</text>
<text x="110" y="152" text-anchor="middle" fill="var(--c3)" font-size="16">▲ start</text>
<text x="350" y="152" fill="var(--c3)" font-size="16">▲ finish</text>
<text x="300" y="190" text-anchor="middle" fill="currentColor" font-size="16">2.5 MHz = 2,500,000 Hz</text>
</svg>`, caption: "Smaller unit means a bigger number: the decimal hops right, once per power of ten." }
      ],
      sayIt: "Without writing anything: how many hertz in 7.5 MHz, how many microseconds in 0.4 ms, and how many millimeters in 3.2 cm? Say the rule you used each time.",
      keyPoints: [
        "To a smaller unit: number gets bigger, decimal moves right",
        "To a bigger unit: number gets smaller, decimal moves left",
        "Number of hops = difference in the powers of ten",
        "1 MHz = 1,000,000 Hz; 1 s = 1,000,000 µs; 1 cm = 10 mm",
        "1,540 m/s = 1.54 mm/µs",
        "Always carry units through every line of the calculation"
      ]
    },

    {
      id: "u01-l3",
      title: "Scientific notation: a number and its address",
      objectives: ["u01-o3", "u01-o2"],
      html: `<p class="lead">Scientific notation splits a number into two harmless pieces: a digit part between 1 and 10, and a power of ten that says how big or small it really is.</p>
<p>The form is <b>N × 10<sup>n</sup></b>, where N is at least 1 and less than 10. Think of N as the number itself and 10<sup>n</sup> as its street address — which neighborhood of size it lives in.</p>
<div class="formula">1,540 = 1.54 × 10<sup>3</sup> &nbsp;&nbsp;&nbsp; 0.000005 s = 5 × 10<sup>-6</sup> s = 5 µs</div>
<p>To write a number in scientific notation, slide the decimal until exactly one non-zero digit sits in front of it, then count the slides. Slid <b>left</b> (the number was big)? The exponent is <span class="kw">positive</span>. Slid <b>right</b> (the number was a tiny decimal)? The exponent is <span class="kw">negative</span>. To go back to standard form, do the reverse: positive exponent, move right; negative exponent, move left.</p>
<table class="dt">
<tr><th>Standard</th><th>Scientific</th><th>Said out loud</th></tr>
<tr><td>3,500,000 Hz</td><td>3.5 × 10<sup>6</sup> Hz</td><td>3.5 megahertz</td></tr>
<tr><td>0.002 s</td><td>2 × 10<sup>-3</sup> s</td><td>2 milliseconds</td></tr>
<tr><td>0.00000013 s</td><td>1.3 × 10<sup>-7</sup> s</td><td>0.13 microseconds</td></tr>
</table>
<div class="callout tip">The exponent and the prefix are the same idea in two costumes. 10<sup>6</sup> <i>is</i> mega. 10<sup>-6</sup> <i>is</i> micro. If you can do prefixes, you can already do scientific notation.</div>
<div class="callout warn">A negative exponent never means a negative number. 5 × 10<sup>-6</sup> is small and positive — five millionths. Students lose points writing it as −0.000005.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 230" role="img"><title>Anatomy of a number written in scientific notation</title>
<text x="120" y="110" fill="var(--c1)" font-size="30">1.54</text>
<text x="215" y="110" fill="currentColor" font-size="30">× 10</text>
<text x="315" y="88" fill="var(--c2)" font-size="22">3</text>
<line x1="150" y1="125" x2="150" y2="165" stroke="var(--c1)" stroke-width="2"/>
<text x="60" y="190" fill="var(--c1)" font-size="15">digit part: at least 1, less than 10</text>
<line x1="320" y1="95" x2="420" y2="70" stroke="var(--c2)" stroke-width="2"/>
<text x="425" y="66" fill="var(--c2)" font-size="15">hops the decimal moved</text>
<text x="330" y="190" fill="currentColor" font-size="16">1.54 × 10³ = 1,540</text>
<text x="300" y="220" text-anchor="middle" fill="var(--muted)" font-size="15">positive exponent = big · negative exponent = tiny but still positive</text>
</svg>`, caption: "N × 10ⁿ: the digit part says which number, the exponent says how big." }
      ],
      sayIt: "Say these in scientific notation without writing: 1,540 · 0.0004 · 7,500,000 · 0.25. Then say which prefix each exponent matches.",
      keyPoints: [
        "Form is N × 10ⁿ with N between 1 and just under 10",
        "Decimal slid left = positive exponent; slid right = negative exponent",
        "The exponent counts the hops, exactly like a unit conversion",
        "10⁶ is mega, 10⁻⁶ is micro — same idea, different costume",
        "A negative exponent means small, never negative"
      ]
    },

    {
      id: "u01-l4",
      title: "Reciprocals: flip it, don't fight it",
      objectives: ["u01-o4"],
      html: `<p class="lead">The reciprocal of a number is 1 divided by that number. Two quantities are reciprocals when multiplying them together gives exactly 1.</p>
<p>Mental picture: a pizza. If you cut it into 4 slices, each slice is 1/4 of the pizza. More slices, smaller slices — and 4 × (1/4) = 1, the whole pizza. That is the whole idea.</p>
<div class="formula">reciprocal of x = 1 ÷ x &nbsp;&nbsp;&nbsp; x × (1 ÷ x) = 1</div>
<p>Why you care: in ultrasound the single most-tested reciprocal pair is <span class="kw">frequency</span> and <span class="kw">period</span>. Frequency counts events per second; period is the time for one event. If a wave repeats 5 million times per second, each repetition takes one five-millionth of a second.</p>
<div class="callout key">f = 1 ÷ T and T = 1 ÷ f. In exam-friendly units: <b>period in µs = 1 ÷ frequency in MHz</b>. So 5 MHz gives 0.2 µs, and 2 MHz gives 0.5 µs.</div>
<p>Reciprocal pairs always move in opposite directions, and the amount matters. Double one, and the other is halved. Triple one, and the other drops to a third. They never both go up. Their <b>product stays constant at 1</b>, which is the fastest way to check yourself: 5 × 0.2 = 1, 2 × 0.5 = 1, 10 × 0.1 = 1.</p>
<div class="callout warn">A reciprocal is not a negative. The reciprocal of 4 is 0.25, not −4. And the reciprocal of a number smaller than 1 is bigger than 1: the reciprocal of 0.2 is 5.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Curve of one divided by x showing that doubling x halves the result</title>
<line x1="70" y1="195" x2="560" y2="195" stroke="currentColor" stroke-width="2"/>
<line x1="70" y1="30" x2="70" y2="195" stroke="currentColor" stroke-width="2"/>
<polyline points="105,45 135,80 175,112 225,140 290,160 370,174 460,182 550,186" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="135" y1="80" x2="70" y2="80" stroke="var(--c2)" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="135" y1="80" x2="135" y2="195" stroke="var(--c2)" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="225" y1="140" x2="70" y2="140" stroke="var(--c2)" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="225" y1="140" x2="225" y2="195" stroke="var(--c2)" stroke-width="1" stroke-dasharray="4 4"/>
<text x="135" y="215" text-anchor="middle" fill="currentColor" font-size="15">x</text>
<text x="225" y="215" text-anchor="middle" fill="currentColor" font-size="15">2x</text>
<text x="40" y="85" fill="currentColor" font-size="15">y</text>
<text x="30" y="145" fill="currentColor" font-size="15">y/2</text>
<text x="330" y="70" fill="var(--c1)" font-size="16">y = 1 ÷ x</text>
<text x="330" y="95" fill="var(--c2)" font-size="15">double x → halve y</text>
<text x="300" y="232" text-anchor="middle" fill="var(--muted)" font-size="15">their product never changes</text>
</svg>`, caption: "Reciprocals: one goes up by a factor, the other goes down by the same factor." }
      ],
      sayIt: "Say the reciprocal of 2, 4, 5, 10 and 0.5. Then say the period for a 2, 4, 5 and 10 MHz wave, and check each pair multiplies to 1.",
      keyPoints: [
        "Reciprocal of x is 1 ÷ x; the pair multiplies to 1",
        "Frequency and period are reciprocals",
        "Period (µs) = 1 ÷ frequency (MHz)",
        "Double one, halve the other — always opposite directions",
        "The reciprocal of a number under 1 is greater than 1"
      ]
    },

    {
      id: "u01-l5",
      title: "Direct and inverse proportionality",
      objectives: ["u01-o5"],
      html: `<p class="lead">Most exam questions do not ask for a number at all. They ask: "this went up — what happened to that?" Answering needs only two patterns.</p>
<p><b>Direct proportion</b> is best friends walking together: one goes up, the other goes up by the <i>same factor</i>. Written y = kx, where k is just a fixed multiplier. Triple x and y triples. Graph it and you get a straight line through the origin. Everyday version: three times as many groceries, three times the bill.</p>
<p><b>Inverse proportion</b> is a seesaw: one goes up, the other goes down by the same factor. Written y = k ÷ x. Triple x and y drops to one third. Graph it and you get a curve that dives toward the axes but never touches them. Everyday version: three times as many people sharing one pizza, one third of a pizza each.</p>
<table class="dt">
<tr><th>Change to x</th><th>Direct (y = kx)</th><th>Inverse (y = k ÷ x)</th><th>Squared (y = kx<sup>2</sup>)</th></tr>
<tr><td>×2</td><td>×2</td><td>÷2</td><td>×4</td></tr>
<tr><td>×3</td><td>×3</td><td>÷3</td><td>×9</td></tr>
<tr><td>÷2</td><td>÷2</td><td>×2</td><td>÷4</td></tr>
</table>
<div class="callout key">Test for inverse proportionality: the <b>product</b> x × y stays constant. Test for direct: the <b>ratio</b> y ÷ x stays constant.</div>
<div class="callout tip">Do not memorize which ultrasound pairs are which — <i>derive</i> them from the formula. Wavelength = speed ÷ frequency, so wavelength is inversely proportional to frequency: double the frequency, halve the wavelength.</div>
<div class="callout warn">"Goes down" and "inversely proportional" are not the same claim. Inverse means down <i>by the same factor</i>. If x doubles and y drops to a quarter, that is an inverse-square relationship, not a simple inverse one.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>Side by side graphs of a direct proportion and an inverse proportion</title>
<line x1="50" y1="190" x2="270" y2="190" stroke="currentColor" stroke-width="2"/>
<line x1="50" y1="40" x2="50" y2="190" stroke="currentColor" stroke-width="2"/>
<line x1="50" y1="190" x2="250" y2="55" stroke="var(--c1)" stroke-width="3"/>
<text x="160" y="30" text-anchor="middle" fill="var(--c1)" font-size="16">DIRECT: y = kx</text>
<text x="160" y="215" text-anchor="middle" fill="currentColor" font-size="15">x</text>
<text x="160" y="238" text-anchor="middle" fill="var(--muted)" font-size="15">up together, same factor</text>
<line x1="330" y1="190" x2="560" y2="190" stroke="currentColor" stroke-width="2"/>
<line x1="330" y1="40" x2="330" y2="190" stroke="currentColor" stroke-width="2"/>
<polyline points="360,50 385,85 420,118 470,148 520,168 555,178" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="445" y="30" text-anchor="middle" fill="var(--c2)" font-size="16">INVERSE: y = k ÷ x</text>
<text x="445" y="215" text-anchor="middle" fill="currentColor" font-size="15">x</text>
<text x="445" y="238" text-anchor="middle" fill="var(--muted)" font-size="15">seesaw, product stays fixed</text>
</svg>`, caption: "Direct is a straight line through the origin; inverse is a seesaw curve." }
      ],
      sayIt: "Out loud: define direct and inverse proportionality, give an everyday example of each, and say what happens to y when x is tripled in each case — including the squared case.",
      keyPoints: [
        "Direct: y = kx, straight line through origin, same factor up",
        "Inverse: y = k ÷ x, seesaw curve, same factor down",
        "Inverse test: product x × y is constant",
        "Direct test: ratio y ÷ x is constant",
        "Squared relationship: double x gives four times y",
        "Derive the relationship from the formula instead of memorizing"
      ]
    },

    {
      id: "u01-l6",
      title: "Percent: parts out of a hundred",
      objectives: ["u01-o6"],
      html: `<p class="lead">Percent means "per hundred". A percentage is a fraction wearing a hat — a number that has already been scaled so the whole is 100.</p>
<p>Three moves cover everything you will be asked:</p>
<ul>
<li><b>Fraction or decimal to percent</b>: multiply by 100. 3/4 = 0.75 = <b>75%</b>. 0.008 = <b>0.8%</b>.</li>
<li><b>Percent of a quantity</b>: turn the percent into a decimal, then multiply. 20% of 45 = 0.20 × 45 = <b>9</b>.</li>
<li><b>Percent change</b>: find the difference, divide by the <i>original</i>, multiply by 100.</li>
</ul>
<div class="formula">percent = part ÷ whole × 100 &nbsp;&nbsp;&nbsp; percent change = (new − old) ÷ old × 100</div>
<p>Example: a value falls from 80 to 60. The difference is 20. Divide by the original 80, not by 60, and you get 0.25 — a <b>25% decrease</b>. Dividing by the wrong number is the single most common percent mistake on exams.</p>
<div class="callout key">Ultrasound's flagship percent is <span class="kw">duty factor</span>, the fraction of time the system is transmitting, usually well under 1% in imaging. Percentages far below 1 are normal here — do not "fix" them.</div>
<div class="callout warn">Percent changes do not cancel. Go up 50% from 100 and you are at 150; come back down 50% and you are at 75, not 100 — because the second 50% is taken from the bigger number.</div>
<p>One habit: a percent with no stated whole is meaningless. "30% higher" always begs the question, higher than what? Say the reference out loud when you answer.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>Bar showing twenty five percent of a whole and the percent change formula</title>
<rect x="40" y="60" width="520" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="40" y="60" width="130" height="50" fill="var(--c1)" stroke="none"/>
<text x="105" y="92" text-anchor="middle" fill="var(--paper)" font-size="16">part</text>
<text x="365" y="92" text-anchor="middle" fill="currentColor" font-size="16">the rest</text>
<text x="40" y="45" fill="var(--muted)" font-size="15">0%</text>
<text x="170" y="45" text-anchor="middle" fill="var(--c1)" font-size="15">25%</text>
<text x="560" y="45" text-anchor="end" fill="var(--muted)" font-size="15">100% = the whole</text>
<text x="300" y="150" text-anchor="middle" fill="currentColor" font-size="16">part ÷ whole × 100 = percent</text>
<text x="300" y="185" text-anchor="middle" fill="var(--c2)" font-size="16">(new − old) ÷ OLD × 100 = percent change</text>
<text x="300" y="210" text-anchor="middle" fill="var(--muted)" font-size="15">always divide by where you started</text>
</svg>`, caption: "Percent is part over whole; percent change always divides by the original value." }
      ],
      sayIt: "Out loud: 3/8 as a percent, 15% of 60, and the percent change from 50 to 65. Say which number you divided by and why.",
      keyPoints: [
        "Percent means per hundred; multiply a decimal by 100",
        "Percent of a quantity: convert to decimal, then multiply",
        "Percent change = (new − old) ÷ old × 100",
        "Divide by the ORIGINAL value, not the new one",
        "Percent changes do not cancel each other out",
        "Duty factor is a percent, usually well under 1% in imaging"
      ]
    },

    {
      id: "u01-l7",
      title: "Decibels: a relative, compressed way to talk about change",
      objectives: ["u01-o7"],
      html: `<p class="lead">A decibel never tells you how loud something is. It tells you how one intensity compares with another — a ratio, squashed onto a logarithmic scale.</p>
<p>Mental picture: "taller". Saying someone is taller is useless until you name who they are taller than. Decibels are exactly like that: they are always <span class="kw">relative</span> to a reference. Zero decibels does not mean silence; it means <b>no change</b> — the two intensities are equal.</p>
<div class="formula">dB = 10 × log(I<sub>2</sub> ÷ I<sub>1</sub>)</div>
<p>You will almost never need the logarithm button. Two rules and a little addition handle the exam:</p>
<table class="dt">
<tr><th>Decibels</th><th>Intensity becomes</th><th>Decibels</th><th>Intensity becomes</th></tr>
<tr><td>0 dB</td><td>unchanged (×1)</td><td>−3 dB</td><td>half (÷2)</td></tr>
<tr><td>3 dB</td><td>double (×2)</td><td>−6 dB</td><td>one quarter (÷4)</td></tr>
<tr><td>10 dB</td><td>ten times (×10)</td><td>−10 dB</td><td>one tenth (÷10)</td></tr>
<tr><td>20 dB</td><td>one hundred times</td><td>−20 dB</td><td>one hundredth</td></tr>
<tr><td>30 dB</td><td>one thousand times</td><td>−30 dB</td><td>one thousandth</td></tr>
</table>
<div class="callout key">Add decibels, <b>multiply</b> factors. 13 dB = 10 dB + 3 dB = ×10 then ×2 = <b>×20</b>. 16 dB = 10 + 3 + 3 = ×10 × 2 × 2 = <b>×40</b>.</div>
<div class="callout tip">Sign is the whole story: a <b>positive</b> dB number means gain, a <b>negative</b> dB number means loss. Attenuation in tissue is always reported as a loss, so later units will hand you negative decibels constantly.</div>
<div class="callout warn">13 dB is not thirteen times. Decibels are logarithmic — you add them, but the underlying intensities multiply. Straight-line thinking is the trap here.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Decibel scale from minus twenty to plus twenty with the matching intensity factors</title>
<line x1="40" y1="110" x2="560" y2="110" stroke="currentColor" stroke-width="2"/>
<line x1="80" y1="100" x2="80" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="170" y1="100" x2="170" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="260" y1="100" x2="260" y2="120" stroke="var(--c2)" stroke-width="3"/>
<line x1="300" y1="94" x2="300" y2="126" stroke="var(--c3)" stroke-width="4"/>
<line x1="340" y1="100" x2="340" y2="120" stroke="var(--c1)" stroke-width="3"/>
<line x1="430" y1="100" x2="430" y2="120" stroke="var(--c1)" stroke-width="3"/>
<line x1="520" y1="100" x2="520" y2="120" stroke="var(--c1)" stroke-width="3"/>
<text x="80" y="90" text-anchor="middle" fill="currentColor" font-size="15">−20</text>
<text x="170" y="90" text-anchor="middle" fill="currentColor" font-size="15">−10</text>
<text x="260" y="90" text-anchor="middle" fill="currentColor" font-size="15">−3</text>
<text x="300" y="80" text-anchor="middle" fill="var(--c3)" font-size="15">0</text>
<text x="340" y="90" text-anchor="middle" fill="currentColor" font-size="15">3</text>
<text x="430" y="90" text-anchor="middle" fill="currentColor" font-size="15">10</text>
<text x="520" y="90" text-anchor="middle" fill="currentColor" font-size="15">20</text>
<text x="80" y="142" text-anchor="middle" fill="var(--c2)" font-size="15">÷100</text>
<text x="170" y="142" text-anchor="middle" fill="var(--c2)" font-size="15">÷10</text>
<text x="260" y="142" text-anchor="middle" fill="var(--c2)" font-size="15">÷2</text>
<text x="300" y="160" text-anchor="middle" fill="var(--c3)" font-size="15">×1</text>
<text x="345" y="142" text-anchor="middle" fill="var(--c1)" font-size="15">×2</text>
<text x="430" y="142" text-anchor="middle" fill="var(--c1)" font-size="15">×10</text>
<text x="520" y="142" text-anchor="middle" fill="var(--c1)" font-size="15">×100</text>
<text x="40" y="40" fill="var(--c2)" font-size="16">LOSS (negative)</text>
<text x="560" y="40" text-anchor="end" fill="var(--c1)" font-size="16">GAIN (positive)</text>
<text x="300" y="205" text-anchor="middle" fill="currentColor" font-size="16">add the decibels → multiply the factors</text>
<text x="300" y="228" text-anchor="middle" fill="var(--muted)" font-size="15">0 dB means no change, not silence</text>
</svg>`, caption: "The decibel scale: 3 dB doubles, 10 dB is ten times, and negatives are losses." }
      ],
      sayIt: "Out loud: what does 0 dB mean, what factor is 3 dB, 10 dB, −3 dB and −10 dB, and what factor is 13 dB? Say why a decibel value alone cannot tell you an absolute intensity.",
      keyPoints: [
        "Decibels are relative — always compared to a reference",
        "0 dB = no change, not zero intensity",
        "3 dB = double, 10 dB = ten times",
        "−3 dB = half, −10 dB = one tenth",
        "Positive means gain, negative means loss",
        "Add decibels, multiply the factors: 13 dB = ×20",
        "The scale is logarithmic, so it is never a straight-line count"
      ]
    },

    {
      id: "u01-l8",
      title: "Rearranging equations and dragging the units along",
      objectives: ["u01-o8", "u01-o2"],
      html: `<p class="lead">Every formula in this course is a balance beam. Whatever you do to one side, do to the other, and the beam stays level.</p>
<p>Take the relationship you will use more than any other: <b>c = f × λ</b> (speed equals frequency times wavelength). Three variables, three ways to write it. To get λ alone, divide both sides by f. To get f alone, divide both sides by λ.</p>
<div class="formula">c = f × λ &nbsp;&nbsp; → &nbsp;&nbsp; λ = c ÷ f &nbsp;&nbsp; → &nbsp;&nbsp; f = c ÷ λ</div>
<p>The cover-up trick: draw a triangle with the lone product on top (c) and the two factors underneath (f and λ). Cover the letter you want; what remains shows you the operation. Cover λ and you see c over f, so divide. Cover c and you see f next to λ, so multiply.</p>
<p><b>Units are part of the math.</b> Carry them and they will police your work for you:</p>
<ul>
<li>λ = 1.54 mm/µs ÷ 7 MHz. Because 1 MHz is 1 per µs, the microseconds cancel and you are left with <b>0.22 mm</b> — a length, which is what a wavelength must be.</li>
<li>If the same division had given you an answer in µs, you would know instantly that something got flipped.</li>
</ul>
<div class="callout key">Match the units before you press a key. The soft-tissue shortcut only works in matched units: <b>λ (mm) = 1.54 ÷ f (MHz)</b>, and <b>T (µs) = 1 ÷ f (MHz)</b>.</div>
<div class="callout warn">Never divide in whichever order feels easier. If a question gives 1.54 and 5, students often write 5 ÷ 1.54. Solve the algebra first, plug numbers second — 1.54 ÷ 5 = 0.31 mm.</div>
<div class="steps"><ol><li>T = 1 ÷ 5 MHz = 0.20 µs.</li><li>2.5 MHz = 2.5 × 10<sup>6</sup> Hz.</li><li>If y = 3x, x = 4 gives y = 12; if y = 12 ÷ x, x = 4 gives y = 3.</li><li>15 ÷ 60 × 100 = 25%; a rise from 40 to 50 is (50 − 40) ÷ 40 × 100 = 25%.</li><li>A fourfold intensity increase gives 10 log(4) ≈ 6 dB.</li><li>λ = 1.54 ÷ 5 = 0.308 mm.</li><li>For r = 3 mm, A = πr² ≈ 28.3 mm².</li></ol></div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Cover up triangle for speed equals frequency times wavelength</title>
<polygon points="300,35 150,195 450,195" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="205" y1="135" x2="395" y2="135" stroke="currentColor" stroke-width="2"/>
<text x="300" y="112" text-anchor="middle" fill="var(--c3)" font-size="26">c</text>
<text x="255" y="180" text-anchor="middle" fill="var(--c1)" font-size="26">f</text>
<text x="350" y="180" text-anchor="middle" fill="var(--c2)" font-size="26">λ</text>
<text x="470" y="70" fill="currentColor" font-size="15">cover c → c = f × λ</text>
<text x="470" y="100" fill="currentColor" font-size="15">cover f → f = c ÷ λ</text>
<text x="470" y="130" fill="currentColor" font-size="15">cover λ → λ = c ÷ f</text>
<text x="300" y="225" text-anchor="middle" fill="var(--muted)" font-size="15">top over bottom means divide; side by side means multiply</text>
</svg>`, caption: "Cover the letter you want; the triangle shows you whether to multiply or divide." }
      ],
      sayIt: "Out loud: rearrange c = f × λ three ways, then compute the wavelength in soft tissue for a 5 MHz and a 10 MHz probe, saying the units at every step.",
      keyPoints: [
        "Do the same operation to both sides to keep the equation balanced",
        "c = f × λ rearranges to λ = c ÷ f and f = c ÷ λ",
        "Triangle cover-up: top over bottom divides, side by side multiplies",
        "Carry units in every line; they catch flipped divisions",
        "λ (mm) = 1.54 ÷ f (MHz) only works with matched units",
        "Rearrange first, substitute numbers second"
      ]
    }
  ],

  mnemonics: [
    { saying: "Great Monkeys Kick Cans, Mice Might Nibble Pizza", meaning: "Giga, Mega, kilo, centi, milli, micro, nano, pico — the prefix ladder in order from biggest to smallest", lesson: "u01-l1" },
    { saying: "Big M is a Million, little m is a Millionth-ish", meaning: "Capital M = mega (10⁶), lowercase m = milli (10⁻³). Mixing them up is a billion-fold error", lesson: "u01-l1" },
    { saying: "Smaller unit, bigger number — the decimal runs right", meaning: "Converting to a smaller unit (s to µs, cm to mm) always makes the number bigger, so the decimal point moves right", lesson: "u01-l2" },
    { saying: "Tiny numbers wear negative hats", meaning: "Numbers less than 1 get a negative exponent in scientific notation — but the number itself is still positive", lesson: "u01-l3" },
    { saying: "Flip it, don't fight it", meaning: "Reciprocal = 1 ÷ the number. Period and frequency are reciprocals, so flip one to get the other", lesson: "u01-l4" },
    { saying: "Direct = best friends. Inverse = seesaw.", meaning: "Direct proportion: both move the same way by the same factor. Inverse: one up, the other down by that same factor", lesson: "u01-l5" },
    { saying: "Percent change divides by where you STARTED", meaning: "(new − old) ÷ old × 100. The denominator is always the original value", lesson: "u01-l6" },
    { saying: "Three doubles, ten times ten", meaning: "3 dB doubles the intensity, 10 dB multiplies it by ten (and the negatives halve and tenth it)", lesson: "u01-l7" },
    { saying: "Decibels add, factors multiply", meaning: "13 dB = 10 + 3, so ×10 then ×2 = ×20. Never add the factors", lesson: "u01-l7" },
    { saying: "A decibel is 'taller' — taller than WHO?", meaning: "Decibels are relative only; with no reference a dB value means nothing, and 0 dB means no change rather than silence", lesson: "u01-l7" }
  ],

  formulas: [
    { name: "Reciprocal", expr: "reciprocal of x = 1 ÷ x", units: "depends", note: "The pair multiplies to 1; frequency and period are reciprocals" },
    { name: "Period from frequency", expr: "T (µs) = 1 ÷ f (MHz)", units: "µs", note: "Only valid with these matched units" },
    { name: "Scientific notation", expr: "value = N × 10ⁿ, with 1 ≤ N < 10", units: "n/a", note: "n counts the decimal hops; negative n means a small number" },
    { name: "Direct proportion", expr: "y = k × x", units: "n/a", note: "Ratio y ÷ x is constant; graph is a straight line through the origin" },
    { name: "Inverse proportion", expr: "y = k ÷ x", units: "n/a", note: "Product x × y is constant; graph is a curve" },
    { name: "Percent", expr: "% = part ÷ whole × 100", units: "%", note: "Percent means per hundred" },
    { name: "Percent change", expr: "% change = (new − old) ÷ old × 100", units: "%", note: "Always divide by the ORIGINAL value" },
    { name: "Decibels", expr: "dB = 10 × log(I₂ ÷ I₁)", units: "dB", note: "Relative and logarithmic; positive = gain, negative = loss" },
    { name: "Unit conversion", expr: "new value = old value × (old unit ÷ new unit)", units: "varies", note: "Or just count the hops between powers of ten" },
    { name: "Speed, frequency, wavelength", expr: "c = f × λ  →  λ = c ÷ f  →  f = c ÷ λ", units: "m/s, Hz, m", note: "The rearranging practice equation for this unit" },
    { name: "Area of a circle", expr: "A = π × r²", units: "cm²", note: "Needed later for intensity = power ÷ area; doubling the radius quadruples the area" }
  ],

  keyNumbers: [
    { fact: "giga", value: "10⁹ — one billion" },
    { fact: "mega", value: "10⁶ — one million" },
    { fact: "kilo", value: "10³ — one thousand" },
    { fact: "centi", value: "10⁻² — one hundredth" },
    { fact: "milli", value: "10⁻³ — one thousandth" },
    { fact: "micro", value: "10⁻⁶ — one millionth" },
    { fact: "nano", value: "10⁻⁹ — one billionth" },
    { fact: "pico", value: "10⁻¹² — one trillionth" },
    { fact: "Hertz in one megahertz", value: "1,000,000 Hz" },
    { fact: "Microseconds in one second", value: "1,000,000 µs" },
    { fact: "Millimeters in one centimeter", value: "10 mm" },
    { fact: "Soft tissue speed in two unit systems", value: "1,540 m/s = 1.54 mm/µs" },
    { fact: "Decibel rule: double", value: "3 dB (and −3 dB = half)" },
    { fact: "Decibel rule: ten times", value: "10 dB (and −10 dB = one tenth)" },
    { fact: "Decibel rule: one hundred times", value: "20 dB (and −20 dB = one hundredth)" },
    { fact: "Decibel value meaning no change at all", value: "0 dB" }
  ],

  flashcards: [
    { front: "mega", back: "10⁶ — one million (M)", lesson: "u01-l1" },
    { front: "10⁶", back: "mega (M)", lesson: "u01-l1" },
    { front: "micro", back: "10⁻⁶ — one millionth (µ)", lesson: "u01-l1" },
    { front: "10⁻⁶", back: "micro (µ)", lesson: "u01-l1" },
    { front: "milli", back: "10⁻³ — one thousandth (m)", lesson: "u01-l1" },
    { front: "kilo", back: "10³ — one thousand (k)", lesson: "u01-l1" },
    { front: "centi", back: "10⁻² — one hundredth (c)", lesson: "u01-l1" },
    { front: "nano", back: "10⁻⁹ — one billionth (n)", lesson: "u01-l1" },
    { front: "pico", back: "10⁻¹² — one trillionth (p)", lesson: "u01-l1" },
    { front: "giga", back: "10⁹ — one billion (G)", lesson: "u01-l1" },
    { front: "Prefixes in order, big to small", back: "giga, mega, kilo, (base), centi, milli, micro, nano, pico", lesson: "u01-l1" },
    { front: "1 MHz = ? Hz", back: "1,000,000 Hz", lesson: "u01-l2" },
    { front: "1 s = ? µs", back: "1,000,000 µs", lesson: "u01-l2" },
    { front: "1 ms = ? µs", back: "1,000 µs", lesson: "u01-l2" },
    { front: "1 cm = ? mm", back: "10 mm", lesson: "u01-l2" },
    { front: "Converting to a SMALLER unit does what to the number?", back: "Makes it bigger — decimal moves right", lesson: "u01-l2" },
    { front: "1,540 m/s in mm/µs", back: "1.54 mm/µs", lesson: "u01-l2" },
    { front: "Scientific notation form", back: "N × 10ⁿ, with N from 1 up to just under 10", lesson: "u01-l3" },
    { front: "0.0004 in scientific notation", back: "4 × 10⁻⁴", lesson: "u01-l3" },
    { front: "3.5 × 10⁶ in standard form", back: "3,500,000", lesson: "u01-l3" },
    { front: "What does a negative exponent mean?", back: "The number is small (less than 1) — not negative", lesson: "u01-l3" },
    { front: "Reciprocal", back: "1 ÷ the number; the pair multiplies to 1", lesson: "u01-l4" },
    { front: "Reciprocal of 4", back: "0.25", lesson: "u01-l4" },
    { front: "Reciprocal of 0.2", back: "5", lesson: "u01-l4" },
    { front: "Period of a 5 MHz wave", back: "0.2 µs (T = 1 ÷ f)", lesson: "u01-l4" },
    { front: "Which two ultrasound parameters are reciprocals?", back: "Frequency and period", lesson: "u01-l4" },
    { front: "Direct proportionality", back: "y = kx — both change by the same factor, same direction", lesson: "u01-l5" },
    { front: "Inverse proportionality", back: "y = k ÷ x — same factor, opposite direction; product stays constant", lesson: "u01-l5" },
    { front: "x is tripled and y is inversely proportional. y does what?", back: "Drops to one third", lesson: "u01-l5" },
    { front: "y ∝ x². x is doubled. y does what?", back: "Becomes four times larger", lesson: "u01-l5" },
    { front: "Percent formula", back: "part ÷ whole × 100", lesson: "u01-l6" },
    { front: "Percent change formula", back: "(new − old) ÷ old × 100 — divide by the ORIGINAL", lesson: "u01-l6" },
    { front: "3/4 as a percent", back: "75%", lesson: "u01-l6" },
    { front: "Is a decibel absolute or relative?", back: "Relative — it always compares two intensities", lesson: "u01-l7" },
    { front: "0 dB means", back: "No change at all (ratio of 1), not silence", lesson: "u01-l7" },
    { front: "3 dB", back: "Intensity doubled", lesson: "u01-l7" },
    { front: "10 dB", back: "Intensity ×10", lesson: "u01-l7" },
    { front: "−3 dB", back: "Intensity halved", lesson: "u01-l7" },
    { front: "−10 dB", back: "Intensity divided by 10", lesson: "u01-l7" },
    { front: "13 dB", back: "×20 (10 dB ×10, then 3 dB ×2)", lesson: "u01-l7" },
    { front: "Solve c = f × λ for λ", back: "λ = c ÷ f", lesson: "u01-l8" },
    { front: "Solve c = f × λ for f", back: "f = c ÷ λ", lesson: "u01-l8" },
    { front: "Why carry units through a calculation?", back: "They catch flipped divisions — a length must come out as a length", lesson: "u01-l8" }
  ],

  questions: [
    { id: "u01-q1", type: "mc", q: "Which metric prefix means one millionth?", choices: ["milli", "micro", "nano", "mega"], answer: 1,
      explain: "Micro is 10⁻⁶, one millionth. Milli is the tempting wrong answer because it sounds like 'million', but milli is 10⁻³, one thousandth — a thousand times bigger than micro.",
      objectives: ["u01-o1"], lesson: "u01-l1", level: 1 },
    { id: "u01-q2", type: "mc", q: "One kilohertz equals how many hertz?", choices: ["100 Hz", "1,000 Hz", "10,000 Hz", "1,000,000 Hz"], answer: 1,
      explain: "Kilo is 10³, so 1 kHz = 1,000 Hz. 1,000,000 Hz is the trap — that is one megahertz, three rungs further up the ladder.",
      objectives: ["u01-o1"], lesson: "u01-l1", level: 1 },
    { id: "u01-q3", type: "mc", q: "A 3.5 MHz transducer operates at how many hertz?", choices: ["3,500 Hz", "35,000 Hz", "350,000 Hz", "3,500,000 Hz"], answer: 3,
      explain: "Mega means 10⁶, so the decimal hops six places right: 3,500,000 Hz. 3,500 Hz is what you get if you treat mega as kilo — only three hops.",
      objectives: ["u01-o2"], lesson: "u01-l2", level: 2 },
    { id: "u01-q4", type: "mc", q: "0.25 seconds is the same as:", choices: ["0.25 ms", "2.5 ms", "25 ms", "250 ms"], answer: 3,
      explain: "Milliseconds are smaller units, so the number must get bigger: three hops right gives 250 ms. 25 ms would be only two hops, which is a centisecond-sized mistake.",
      objectives: ["u01-o2"], lesson: "u01-l2", level: 2 },
    { id: "u01-q5", type: "mc", q: "0.8 cm expressed in millimeters is:", choices: ["0.08 mm", "8 mm", "80 mm", "800 mm"], answer: 1,
      explain: "There are 10 mm in 1 cm, so one hop right gives 8 mm. 80 mm comes from treating centi-to-milli as a factor of 100; the two prefixes differ by only one power of ten.",
      objectives: ["u01-o2"], lesson: "u01-l2", level: 1 },
    { id: "u01-q6", type: "mc", q: "2,500 µs expressed in milliseconds is:", choices: ["0.25 ms", "2.5 ms", "25 ms", "2,500,000 ms"], answer: 1,
      explain: "Milliseconds are the bigger unit, so the number must shrink: three hops left gives 2.5 ms. 2,500,000 ms is the classic wrong-direction answer — you multiplied when you should have divided.",
      objectives: ["u01-o2"], lesson: "u01-l2", level: 2 },
    { id: "u01-q7", type: "mc", q: "Written in scientific notation, 0.0004 is:", choices: ["4 × 10⁻³", "4 × 10⁻⁴", "4 × 10⁴", "0.4 × 10⁻³"], answer: 1,
      explain: "The decimal must slide four places right to sit behind the 4, so the exponent is −4. 4 × 10⁻³ is off by one place, and 0.4 × 10⁻³ is not proper notation because the digit part must be at least 1.",
      objectives: ["u01-o3"], lesson: "u01-l3", level: 2 },
    { id: "u01-q8", type: "mc", q: "7.2 × 10⁵ written in standard form is:", choices: ["7,200", "72,000", "720,000", "7,200,000"], answer: 2,
      explain: "A positive exponent of 5 moves the decimal five places right: 720,000. 7,200,000 would be 10⁶ — counting the digits after the 7 instead of counting the hops is the usual slip.",
      objectives: ["u01-o3"], lesson: "u01-l3", level: 2 },
    { id: "u01-q9", type: "mc", q: "A negative exponent in scientific notation tells you that the number is:", choices: ["Less than zero", "Smaller than one", "Larger than one", "An error in the notation"], answer: 1,
      explain: "A negative exponent means the value is a small positive number, less than 1. 'Less than zero' is the tempting answer because of the minus sign, but 5 × 10⁻⁶ is five millionths — still positive.",
      objectives: ["u01-o3"], lesson: "u01-l3", level: 1 },
    { id: "u01-q10", type: "mc", q: "A wave has a period of 0.5 µs. Its frequency is:", choices: ["0.5 MHz", "2 MHz", "5 MHz", "50 MHz"], answer: 1,
      explain: "Frequency and period are reciprocals: 1 ÷ 0.5 = 2 MHz. 5 MHz is the answer you get if you read 0.5 as 0.2 or reach for a memorized pair instead of dividing — check by multiplying, since 2 × 0.5 = 1.",
      objectives: ["u01-o4"], lesson: "u01-l4", level: 2 },
    { id: "u01-q11", type: "mc", q: "The reciprocal of 4 is:", choices: ["−4", "0.25", "2", "16"], answer: 1,
      explain: "1 ÷ 4 = 0.25, and 4 × 0.25 = 1, which is the definition. −4 is the trap: a reciprocal flips a number, it does not change its sign.",
      objectives: ["u01-o4"], lesson: "u01-l4", level: 2 },
    { id: "u01-q12", type: "mc", q: "y is inversely proportional to x. If x is tripled, y is:", choices: ["Tripled", "Divided by three", "Divided by nine", "Unchanged"], answer: 1,
      explain: "Inverse means the same factor in the opposite direction, so y becomes one third of its old value. 'Divided by nine' describes an inverse-square relationship, which is a different pattern.",
      objectives: ["u01-o5"], lesson: "u01-l5", level: 2 },
    { id: "u01-q13", type: "mc", q: "A quantity y is proportional to the square of x. If x is tripled, y becomes:", choices: ["3 times larger", "6 times larger", "9 times larger", "1/9 as large"], answer: 2,
      explain: "Squaring the factor gives 3² = 9, so y is nine times larger. '3 times larger' treats the relationship as a simple direct proportion and ignores the square — the exact trap used later for intensity and amplitude.",
      objectives: ["u01-o5"], lesson: "u01-l5", level: 3 },
    { id: "u01-q14", type: "mc", q: "The graph of two directly proportional quantities is:", choices: ["A straight line through the origin", "A curve that never touches the axes", "A flat horizontal line", "A line that starts above the origin"], answer: 0,
      explain: "Direct proportion is y = kx, which plots as a straight line passing through (0,0). The curve that never touches the axes is the inverse relationship, and a line starting above the origin has a constant added, so it is linear but not proportional.",
      objectives: ["u01-o5"], lesson: "u01-l5", level: 2 },
    { id: "u01-q15", type: "mc", q: "What is 20% of 45?", choices: ["2.25", "9", "22.5", "90"], answer: 1,
      explain: "0.20 × 45 = 9. 22.5 is 50% of 45 — the mistake of converting 20% to 0.5-style thinking, or dividing by 2 instead of multiplying by 0.2.",
      objectives: ["u01-o6"], lesson: "u01-l6", level: 2 },
    { id: "u01-q16", type: "mc", q: "A value falls from 80 to 60. What is the percent change?", choices: ["20% decrease", "25% decrease", "33% decrease", "75% decrease"], answer: 1,
      explain: "The difference is 20, divided by the ORIGINAL 80, which is 0.25 — a 25% decrease. '33% decrease' comes from dividing by the new value (20 ÷ 60), and '20% decrease' just repeats the raw difference.",
      objectives: ["u01-o6"], lesson: "u01-l6", level: 3 },
    { id: "u01-q17", type: "mc", q: "A change of 0 dB means:", choices: ["No sound at all", "No change in intensity", "Intensity was halved", "Intensity doubled"], answer: 1,
      explain: "0 dB means the ratio of the two intensities is 1 — nothing changed. 'No sound at all' is the intuitive trap, but decibels are relative, so zero decibels only says the two values are equal.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 1 },
    { id: "u01-q18", type: "mc", q: "An intensity that has dropped by 3 dB is now:", choices: ["One third of the original", "Half the original", "Twice the original", "Three times smaller than the original"], answer: 1,
      explain: "Negative 3 dB halves the intensity. 'One third' comes from reading the number 3 literally, but decibels are logarithmic — the 3 refers to a factor of 2, not a factor of 3.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 2 },
    { id: "u01-q19", type: "mc", q: "A signal is amplified by 13 dB. Its intensity has increased by a factor of:", choices: ["13", "20", "30", "1,300"], answer: 1,
      explain: "13 dB = 10 dB + 3 dB, so ×10 then ×2 = ×20. Choosing 13 treats decibels as a straight count; choosing 30 adds the factors (10 + 2 + 3-ish) instead of multiplying them.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 3 },
    { id: "u01-q20", type: "mc", q: "Which statement about the decibel is correct?", choices: ["It states an absolute intensity in watts", "It compares two intensities on a logarithmic scale", "It can only be positive", "It is another name for percent change"], answer: 1,
      explain: "A decibel is a logarithmic comparison of two intensities. It cannot be absolute without a stated reference, and it is routinely negative — attenuation is reported as a decibel loss.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 2 },
    { id: "u01-q21", type: "mc", q: "If c = f × λ, then λ equals:", choices: ["c × f", "c ÷ f", "f ÷ c", "c − f"], answer: 1,
      explain: "Divide both sides by f to isolate λ, giving λ = c ÷ f. f ÷ c is the upside-down version and would produce units of 1/length, which cannot be a wavelength.",
      objectives: ["u01-o8"], lesson: "u01-l8", level: 2 },
    { id: "u01-q22", type: "mc", q: "Using c = 1.54 mm/µs, the wavelength of a 7 MHz wave in soft tissue is closest to:", choices: ["0.10 mm", "0.22 mm", "4.55 mm", "10.8 mm"], answer: 1,
      explain: "λ = 1.54 ÷ 7 = 0.22 mm. 4.55 mm is 7 ÷ 1.54 — the division done upside down, which you would catch immediately because a 7 MHz wavelength must be a fraction of a millimeter.",
      objectives: ["u01-o8"], lesson: "u01-l8", level: 3 },

    { id: "u01-q23", type: "tf", q: "A microsecond is one thousand times shorter than a millisecond.", answer: true,
      explain: "Milli is 10⁻³ and micro is 10⁻⁶, three powers of ten apart, so 1 ms = 1,000 µs. Students often guess a million because 'micro' makes them think of millionths of a second — which is true relative to a second, not relative to a millisecond.",
      objectives: ["u01-o1"], lesson: "u01-l1", level: 1 },
    { id: "u01-q24", type: "tf", q: "If two quantities are inversely proportional, their product stays constant.", answer: true,
      explain: "That is the defining test: y = k ÷ x rearranges to x × y = k. If instead the ratio y ÷ x stayed constant, the relationship would be direct.",
      objectives: ["u01-o5"], lesson: "u01-l5", level: 1 },
    { id: "u01-q25", type: "tf", q: "A measurement given in decibels tells you the absolute intensity of a sound.", answer: false,
      explain: "Decibels are always relative to a reference intensity; alone they only describe a ratio. Saying '−6 dB' is like saying 'shorter' — you must know shorter than what.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 2 },
    { id: "u01-q26", type: "tf", q: "10⁻⁶ is the same as one millionth.", answer: true,
      explain: "10⁻⁶ = 1/1,000,000, which is exactly the prefix micro. The minus sign marks smallness, not negativity.",
      objectives: ["u01-o3"], lesson: "u01-l3", level: 1 },
    { id: "u01-q27", type: "tf", q: "Increasing a value by 50% and then decreasing the result by 50% returns you to the original value.", answer: false,
      explain: "100 increased by 50% is 150; 50% of 150 is 75, so you land at 75, not 100. The second percentage is taken from the larger number, which is why percent changes never simply cancel.",
      objectives: ["u01-o6"], lesson: "u01-l6", level: 3 },

    { id: "u01-q28", type: "short", q: "Which metric prefix means 10⁻⁹?", answer: "nano",
      accept: ["nano", "n", "nano-", "nanno"],
      explain: "Nano is 10⁻⁹, one billionth — three rungs below micro on the ladder. Pico is the next one down at 10⁻¹².",
      objectives: ["u01-o1"], lesson: "u01-l1", level: 1 },
    { id: "u01-q29", type: "short", q: "How many microseconds are there in one second?", answer: "1,000,000",
      accept: ["1000000", "1,000,000", "one million", "1 million", "10^6", "1x10^6", "1 × 10⁶"],
      explain: "Micro is 10⁻⁶, so a second holds a million microseconds. Answering 1,000 confuses micro with milli.",
      objectives: ["u01-o2"], lesson: "u01-l2", level: 2 },
    { id: "u01-q30", type: "short", q: "A wave has a period of 0.2 µs. What is its frequency in MHz?", answer: "5 MHz",
      accept: ["5", "5 mhz", "5mhz", "five", "5 megahertz"],
      explain: "f = 1 ÷ T = 1 ÷ 0.2 = 5 MHz, and the check is 5 × 0.2 = 1. Answering 0.2 just repeats the period back.",
      objectives: ["u01-o4"], lesson: "u01-l4", level: 2 },
    { id: "u01-q31", type: "short", q: "How many decibels correspond to a ten-fold increase in intensity?", answer: "10 dB",
      accept: ["10", "10 db", "10db", "ten", "ten decibels", "10 decibels"],
      explain: "The 10 dB rule: every 10 decibels multiplies intensity by ten, so 20 dB is a hundred-fold and 30 dB a thousand-fold increase.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 2 },
    { id: "u01-q32", type: "short", q: "Intensity is cut to one quarter of its original value. How big is the drop in decibels?", answer: "6 dB",
      accept: ["6", "6 db", "6db", "six", "six decibels", "6 decibels", "-6", "-6 db"],
      explain: "One quarter is two halvings, and each halving is 3 dB, so the loss is 6 dB. Answering 4 dB treats the decibel scale as a direct count of the factor.",
      objectives: ["u01-o7"], lesson: "u01-l7", level: 3 },
    { id: "u01-q33", type: "short", q: "Name the kind of proportionality in which doubling one quantity halves the other.", answer: "inverse",
      accept: ["inverse", "inversely proportional", "inverse proportion", "inversely", "indirect"],
      explain: "Same factor, opposite direction, with a constant product — that is inverse proportionality. Direct proportionality would double the second quantity too.",
      objectives: ["u01-o5"], lesson: "u01-l5", level: 2 },
    { id: "u01-q34", type: "short", q: "Express the fraction 3/4 as a percent.", answer: "75%",
      accept: ["75", "75%", "75 percent", "seventy five percent", "75 %"],
      explain: "3 ÷ 4 = 0.75, and multiplying by 100 gives 75%. Writing 0.75% is the common slip — it skips the multiplication by 100.",
      objectives: ["u01-o6"], lesson: "u01-l6", level: 2 },
    { id: "u01-q35", type: "short", q: "Rearrange c = f × λ to solve for f.", answer: "f = c ÷ λ",
      accept: ["c/λ", "c ÷ λ", "f = c/λ", "f=c/λ", "c divided by lambda", "c/lambda", "f = c / lambda"],
      explain: "Divide both sides by λ so that f stands alone. Multiplying instead would give units of length times frequency, which is a speed times a length — not a frequency.",
      objectives: ["u01-o8"], lesson: "u01-l8", level: 2 },
    { id: "u01-q36", type: "short", q: "Write 1,540 in scientific notation.", answer: "1.54 × 10³",
      accept: ["1.54 × 10³", "1.54 x 10^3", "1.54x10^3", "1.54e3", "1.54 * 10^3", "1.54 10 3"],
      explain: "Slide the decimal three places left to leave one digit in front, giving 1.54 × 10³. Writing 15.4 × 10² is arithmetically equal but not proper notation, since the digit part must be under 10.",
      objectives: ["u01-o3"], lesson: "u01-l3", level: 2 }
  ],

  drills: [
    {
      id: "u01-d1", title: "Metric conversions", formula: "count the hops between powers of ten", lesson: "u01-l2",
      gen: function (rnd) {
        var table = [
          { from: "MHz", to: "Hz", f: 1000000, hops: "6 hops right" },
          { from: "kHz", to: "Hz", f: 1000, hops: "3 hops right" },
          { from: "ms", to: "µs", f: 1000, hops: "3 hops right" },
          { from: "s", to: "ms", f: 1000, hops: "3 hops right" },
          { from: "s", to: "µs", f: 1000000, hops: "6 hops right" },
          { from: "cm", to: "mm", f: 10, hops: "1 hop right" },
          { from: "m", to: "cm", f: 100, hops: "2 hops right" },
          { from: "m", to: "mm", f: 1000, hops: "3 hops right" }
        ];
        var c = table[Math.floor(rnd() * table.length)];
        var vals = [0.25, 0.5, 1.5, 2, 2.5, 3, 4, 5, 6.5, 7.5, 8, 12];
        var v = vals[Math.floor(rnd() * vals.length)];
        var ans = v * c.f;
        return {
          kind: "number",
          given: v + " " + c.from,
          ask: "Convert to " + c.to + ".",
          answer: ans,
          unit: c.to,
          tol: Math.max(ans * 0.0001, 0.0001),
          steps: [
            c.to + " is the smaller unit, so the number gets bigger",
            c.from + " to " + c.to + " is " + c.hops + " (× " + c.f + ")",
            v + " × " + c.f + " = " + ans + " " + c.to
          ]
        };
      }
    },
    {
      id: "u01-d2", title: "Scientific notation: find the exponent", formula: "value = N × 10ⁿ with 1 ≤ N < 10", lesson: "u01-l3",
      gen: function (rnd) {
        var digits = [1.5, 2, 2.5, 3.5, 4, 5, 6, 7.5, 8, 9][Math.floor(rnd() * 10)];
        var exp = [-6, -5, -4, -3, -2, 2, 3, 4, 5, 6][Math.floor(rnd() * 10)];
        var val = digits * Math.pow(10, exp);
        var shown;
        if (exp < 0) {
          shown = val.toFixed(-exp + 1);
        } else {
          shown = String(Math.round(val));
          var out = "", n = 0;
          for (var k = shown.length - 1; k >= 0; k--) {
            out = shown.charAt(k) + out;
            n++;
            if (n % 3 === 0 && k > 0) { out = "," + out; }
          }
          shown = out;
        }
        return {
          kind: "number",
          given: "the number " + shown,
          ask: "Written as N × 10ⁿ with N between 1 and 10, what is the exponent n?",
          answer: exp,
          unit: "",
          tol: 0.001,
          steps: [
            "Slide the decimal until one non-zero digit sits in front of it",
            "Here that digit part is " + digits,
            "The decimal moved " + Math.abs(exp) + " place(s) " + (exp < 0 ? "right, so n is negative" : "left, so n is positive"),
            shown + " = " + digits + " × 10^(" + exp + ")"
          ]
        };
      }
    },
    {
      id: "u01-d3", title: "Reciprocals: period and frequency", formula: "T (µs) = 1 ÷ f (MHz)", lesson: "u01-l4",
      gen: function (rnd) {
        var freqs = [1, 2, 2.5, 4, 5, 8, 10, 12.5, 20];
        var f = freqs[Math.floor(rnd() * freqs.length)];
        var t = 1 / f;
        var askPeriod = rnd() < 0.5;
        if (askPeriod) {
          return {
            kind: "number",
            given: "frequency = " + f + " MHz",
            ask: "What is the period, in µs?",
            answer: +t.toFixed(4),
            unit: "µs",
            tol: 0.002,
            steps: ["T = 1 ÷ f", "= 1 ÷ " + f, "= " + (+t.toFixed(4)) + " µs", "check: " + f + " × " + (+t.toFixed(4)) + " ≈ 1"]
          };
        }
        return {
          kind: "number",
          given: "period = " + (+t.toFixed(4)) + " µs",
          ask: "What is the frequency, in MHz?",
          answer: f,
          unit: "MHz",
          tol: 0.05,
          steps: ["f = 1 ÷ T", "= 1 ÷ " + (+t.toFixed(4)), "= " + f + " MHz", "check: the pair multiplies to 1"]
        };
      }
    },
    {
      id: "u01-d4", title: "Proportionality reasoning", formula: "direct: y = kx · inverse: y = k ÷ x · squared: y = kx²", lesson: "u01-l5",
      gen: function (rnd) {
        var kind = ["direct", "inverse", "squared"][Math.floor(rnd() * 3)];
        var factor = [2, 3, 4][Math.floor(rnd() * 3)];
        var up = rnd() < 0.5;
        var word = up ? "multiplied by " + factor : "divided by " + factor;
        var choices = [
          "multiplied by " + factor,
          "divided by " + factor,
          "multiplied by " + (factor * factor),
          "divided by " + (factor * factor),
          "unchanged"
        ];
        var ans, why;
        if (kind === "direct") {
          ans = up ? 0 : 1;
          why = "Direct: y changes by the same factor in the same direction.";
        } else if (kind === "inverse") {
          ans = up ? 1 : 0;
          why = "Inverse: y changes by the same factor in the opposite direction.";
        } else {
          ans = up ? 2 : 3;
          why = "Squared: the factor gets squared, so " + factor + " becomes " + (factor * factor) + ".";
        }
        return {
          kind: "choice",
          given: "y is " + (kind === "direct" ? "directly proportional to x" : kind === "inverse" ? "inversely proportional to x" : "proportional to x²") + ", and x is " + word + ".",
          ask: "What happens to y?",
          choices: choices,
          answer: ans,
          steps: [why, "x was " + word, "so y is " + choices[ans]]
        };
      }
    },
    {
      id: "u01-d5", title: "Decibels to a factor change", formula: "3 dB = ×2, 10 dB = ×10; add dB, multiply factors", lesson: "u01-l7",
      gen: function (rnd) {
        var tens = Math.floor(rnd() * 3);
        var threes = Math.floor(rnd() * 3);
        if (tens === 0 && threes === 0) { threes = 1; }
        var neg = rnd() < 0.5;
        var db = (neg ? -1 : 1) * (tens * 10 + threes * 3);
        var factor = Math.pow(10, tens) * Math.pow(2, threes);
        if (neg) { factor = 1 / factor; }
        var parts = [];
        for (var i = 0; i < tens; i++) { parts.push(neg ? "÷10" : "×10"); }
        for (var j = 0; j < threes; j++) { parts.push(neg ? "÷2" : "×2"); }
        return {
          kind: "number",
          given: "an intensity change of " + db + " dB",
          ask: "By what factor does the intensity change? (2 means doubled, 0.5 means halved)",
          answer: +factor.toFixed(5),
          unit: "× original",
          tol: Math.max(0.001, Math.abs(factor) * 0.01),
          steps: [
            "Break the decibels into 10s and 3s: " + Math.abs(db) + " = " + tens + "×10 + " + threes + "×3",
            (neg ? "Negative means loss, so every step divides" : "Positive means gain, so every step multiplies"),
            "Apply them in a row: " + (parts.join(" then ") || "no change"),
            "Factor = " + (+factor.toFixed(5))
          ]
        };
      }
    },
    {
      id: "u01-d6", title: "Percent change", formula: "% change = (new − old) ÷ old × 100", lesson: "u01-l6",
      gen: function (rnd) {
        var old = [20, 25, 40, 50, 60, 80, 100, 120, 150, 200][Math.floor(rnd() * 10)];
        var pct = [10, 20, 25, 50, 75][Math.floor(rnd() * 5)];
        if (rnd() < 0.4) {
          var part = old * pct / 100;
          return { kind: "number", given: "part = " + part + ", whole = " + old, ask: "What percent of the whole is the part?", answer: pct, unit: "%", tol: 0.1, steps: ["% = part ÷ whole × 100", "= " + part + " ÷ " + old + " × 100", "= " + pct + " %"] };
        }
        var up = rnd() < 0.5;
        var nw = up ? old * (1 + pct / 100) : old * (1 - pct / 100);
        var ans = up ? pct : -pct;
        return {
          kind: "number",
          given: "a value changes from " + (+old.toFixed(2)) + " to " + (+nw.toFixed(2)),
          ask: "What is the percent change? (use a minus sign for a decrease)",
          answer: ans,
          unit: "%",
          tol: 0.6,
          steps: [
            "difference = " + (+(nw - old).toFixed(2)),
            "divide by the ORIGINAL value: " + (+(nw - old).toFixed(2)) + " ÷ " + (+old.toFixed(2)),
            "× 100 = " + ans + " %"
          ]
        };
      }
    },
    {
      id: "u01-d7", title: "Wave equation rearrangements", formula: "c = f × λ", lesson: "u01-l8",
      gen: function (rnd) {
        var fs = [2, 2.5, 4, 5, 7.5, 10];
        var f = fs[Math.floor(rnd() * fs.length)];
        var lam = 1.54 / f;
        var askF = rnd() < 0.5;
        return { kind: "number", given: askF ? "c = 1.54 mm/µs and λ = " + lam.toFixed(4) + " mm" : "c = 1.54 mm/µs and f = " + f + " MHz", ask: askF ? "What is frequency, in MHz?" : "What is wavelength, in mm?", answer: askF ? f : +lam.toFixed(4), unit: askF ? "MHz" : "mm", tol: askF ? 0.05 : 0.01, steps: [askF ? "f = c ÷ λ" : "λ = c ÷ f", askF ? "1.54 ÷ " + lam.toFixed(4) + " = " + f + " MHz" : "1.54 ÷ " + f + " = " + lam.toFixed(4) + " mm"] };
      }
    },
    {
      id: "u01-d8", title: "Circle area", formula: "A = π × r²", lesson: "u01-l8",
      gen: function (rnd) {
        var r = [1, 1.5, 2, 2.5, 3, 4, 5][Math.floor(rnd() * 7)];
        var a = Math.PI * r * r;
        return { kind: "number", given: "A circular element has radius " + r + " mm.", ask: "What is its area, in mm²?", answer: +a.toFixed(3), unit: "mm²", tol: 0.05, steps: ["A = πr²", "= π × " + r + "²", "= " + a.toFixed(2) + " mm²"] };
      }
    }
  ],

  whiteboard: [
    { id: "u01-w1", prompt: "Draw the metric prefix ladder from giga to pico. Label every prefix, its symbol, its power of ten, and one place in ultrasound you will meet it.", minutes: 5, lesson: "u01-l1",
      keyPoints: [
        "giga G 10⁹",
        "mega M 10⁶ — transducer frequency in MHz",
        "kilo k 10³ — the 20 kHz edge of hearing",
        "base unit 10⁰",
        "centi c 10⁻² — imaging depth in cm",
        "milli m 10⁻³ — wavelength and resolution in mm",
        "micro µ 10⁻⁶ — period and pulse duration in µs",
        "nano n 10⁻⁹",
        "pico p 10⁻¹²",
        "Big prefixes left of the base unit, small ones right",
        "Capital M is mega, lowercase m is milli"
      ] },
    { id: "u01-w2", prompt: "Write everything you know about decibels: what they measure, the rules, the signs, and two worked conversions.", minutes: 6, lesson: "u01-l7",
      keyPoints: [
        "dB = 10 × log(I₂ ÷ I₁)",
        "Relative, not absolute — always needs a reference",
        "Logarithmic scale, so it compresses huge ranges",
        "0 dB = no change (ratio of 1), not silence",
        "3 dB = ×2 and −3 dB = ÷2",
        "10 dB = ×10 and −10 dB = ÷10",
        "20 dB = ×100, 30 dB = ×1,000",
        "Positive = gain, negative = loss",
        "Add decibels, multiply the factors",
        "13 dB = 10 + 3 = ×10 then ×2 = ×20",
        "6 dB loss = two halvings = one quarter the intensity"
      ] },
    { id: "u01-w3", prompt: "Explain direct, inverse and squared relationships. Draw each graph and fill in a change table for ×2, ×3 and ÷2.", minutes: 6, lesson: "u01-l5",
      keyPoints: [
        "Direct: y = kx, same factor same direction",
        "Direct graph: straight line through the origin",
        "Direct test: the ratio y ÷ x stays constant",
        "Inverse: y = k ÷ x, same factor opposite direction",
        "Inverse graph: curve that approaches but never touches the axes",
        "Inverse test: the product x × y stays constant",
        "Squared: double x gives four times y; triple x gives nine times y",
        "Inverse with ×2 on x gives ÷2 on y",
        "Squared with ÷2 on x gives ÷4 on y",
        "Derive the relationship from the formula rather than memorizing pairs"
      ] },
    { id: "u01-w4", prompt: "Show every step of converting 1,540 m/s into mm/µs, and then use it to find the wavelength of a 5 MHz wave. Narrate the units out loud as you write.", minutes: 5, lesson: "u01-l8",
      keyPoints: [
        "1 m = 1,000 mm, so 1,540 m becomes 1,540,000 mm",
        "1 s = 1,000,000 µs",
        "1,540,000 mm ÷ 1,000,000 µs = 1.54 mm/µs",
        "c = f × λ, so λ = c ÷ f",
        "λ = 1.54 mm/µs ÷ 5 MHz",
        "1 MHz is one cycle per µs, so the µs cancel and mm remains",
        "λ = 0.31 mm",
        "Sanity check: a wavelength must come out as a length",
        "Higher frequency would give a shorter wavelength",
        "Never divide 5 by 1.54 — rearrange first, then substitute"
      ] }
  ]
});
