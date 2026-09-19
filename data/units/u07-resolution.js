window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u07",
  order: 7,
  title: "Resolution: Axial, Lateral, Elevational, Temporal",
  icon: "🔬",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Resolution chapter (axial, lateral, elevational, temporal and contrast resolution)",
  blurb: "Resolution is the machine's ability to say 'those are two things, not one.' This unit gives you the four kinds of detail (along the beam, across the beam, through the slice, and over time), the formulas behind them, and the trade-off you pay every single time you improve one.",

  objectives: [
    { id: "u07-o1", text: "Define axial resolution, list its five synonyms (LARRD), and state its units, its typical range, and whether a bigger or smaller number is better." },
    { id: "u07-o2", text: "Calculate axial resolution from spatial pulse length, or from the number of cycles in the pulse plus wavelength or frequency, and compare two transducers." },
    { id: "u07-o3", text: "List the factors that improve axial resolution (higher frequency, more damping, fewer cycles) and state the penalty each one carries." },
    { id: "u07-o4", text: "Define lateral resolution, list its four synonyms (LATA), relate it to beam width, and explain why it changes with depth while axial resolution does not." },
    { id: "u07-o5", text: "List the factors that improve lateral resolution (focusing, higher frequency, aperture and multiple transmit foci) and state what each one costs." },
    { id: "u07-o6", text: "Define elevational resolution, explain what determines slice thickness, and describe how a fixed lens, a 1.5D array and a 2D array each address it." },
    { id: "u07-o7", text: "Define temporal resolution, relate it to frame rate and frame time, and list everything that raises or lowers frame rate." },
    { id: "u07-o8", text: "Define contrast resolution and list the system settings and techniques that improve it." },
    { id: "u07-o9", text: "Compare axial, lateral, elevational and temporal resolution: rank them numerically, and choose settings to favor one when a clinical task demands it." }
  ],

  lessons: [
    {
      id: "u07-l1",
      title: "What 'resolution' actually means",
      objectives: ["u07-o1", "u07-o9"],
      html: `<p class="lead">Resolution is the smallest separation between two structures that still shows up on the screen as <b>two</b> structures.</p>
<p>Picture two pins stuck in a block of gelatin. Slide them closer and closer together while you scan. At some point the two bright dots on the screen touch, merge, and become one fat dot. The distance at which they merged <i>is</i> your resolution. That is why <span class="kw">a smaller resolution number is better</span>: it means you could squeeze the pins closer before the machine lost the difference. Students trip on this constantly, because in everyday speech "high resolution" sounds like a big number. In ultrasound, good resolution is a <b>small</b> number of millimeters.</p>
<p>The catch is that distance is measured in different directions, and the machine is good in one direction and mediocre in another. So we have four separate report cards:</p>
<ul>
<li><span class="kw">Axial resolution</span> — two things stacked <b>along</b> the beam, one deeper than the other. Best of the four, typically 0.05–0.5 mm.</li>
<li><span class="kw">Lateral resolution</span> — two things <b>side by side</b>, at the same depth. Typically 0.3–3 mm, roughly 2–10 times worse than axial.</li>
<li><span class="kw">Elevational resolution</span> — two things separated <b>through the thickness of the scan slice</b>, the direction you cannot see. Usually the worst of the three spatial ones.</li>
<li><span class="kw">Temporal resolution</span> — two <b>events in time</b>, like a valve open and then closed. Measured in frames per second, and here a <b>bigger</b> number is better.</li>
</ul>
<div class="callout tip">Mental picture: the pulse is a tiny brick of sound flying through tissue. Its <b>length</b> sets axial detail, its <b>width</b> sets lateral detail, its <b>height</b> sets elevational detail, and how fast you can throw bricks sets temporal detail.</div>
<div class="callout warn">Do not mix up resolution with penetration or with image size. Resolution is detail only. Turning up the gain makes the picture brighter, not more detailed.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>Four kinds of resolution: along the beam, across the beam, through the slice thickness, and over time</title>
<rect x="20" y="20" width="260" height="120" fill="none" stroke="var(--muted)"/>
<rect x="320" y="20" width="260" height="120" fill="none" stroke="var(--muted)"/>
<rect x="20" y="160" width="260" height="120" fill="none" stroke="var(--muted)"/>
<rect x="320" y="160" width="260" height="120" fill="none" stroke="var(--muted)"/>
<text x="32" y="44" fill="currentColor" font-size="16">AXIAL - along the beam</text>
<line x1="60" y1="60" x2="60" y2="128" stroke="var(--c1)"/>
<circle cx="60" cy="78" r="6" fill="var(--c2)"/>
<circle cx="60" cy="112" r="6" fill="var(--c2)"/>
<text x="80" y="100" fill="currentColor" font-size="16">one behind the other</text>
<text x="332" y="44" fill="currentColor" font-size="16">LATERAL - across the beam</text>
<line x1="360" y1="60" x2="360" y2="128" stroke="var(--c1)"/>
<circle cx="420" cy="95" r="6" fill="var(--c2)"/>
<circle cx="460" cy="95" r="6" fill="var(--c2)"/>
<text x="380" y="125" fill="currentColor" font-size="16">side by side</text>
<text x="32" y="184" fill="currentColor" font-size="16">ELEVATIONAL - slice thickness</text>
<path d="M60 210 L160 196 L160 246 L60 260 Z" fill="none" stroke="var(--c3)"/>
<text x="175" y="232" fill="currentColor" font-size="16">through the slab</text>
<text x="332" y="184" fill="currentColor" font-size="16">TEMPORAL - frames/second</text>
<line x1="345" y1="240" x2="565" y2="240" stroke="currentColor"/>
<line x1="365" y1="228" x2="365" y2="252" stroke="var(--c4)"/>
<line x1="415" y1="228" x2="415" y2="252" stroke="var(--c4)"/>
<line x1="465" y1="228" x2="465" y2="252" stroke="var(--c4)"/>
<line x1="515" y1="228" x2="515" y2="252" stroke="var(--c4)"/>
<text x="345" y="272" fill="currentColor" font-size="14">F1</text>
<text x="400" y="272" fill="currentColor" font-size="14">F2</text>
<text x="455" y="272" fill="currentColor" font-size="14">F3</text>
<text x="510" y="272" fill="currentColor" font-size="14">F4</text>
</svg>`, caption: "Four report cards: length of the pulse, width of the beam, thickness of the slice, and frames per second." }
      ],
      sayIt: "Say out loud, without looking: name the four kinds of resolution, the direction each one measures, and for each one whether a big or small number is good.",
      keyPoints: [
        "Resolution = smallest separation still displayed as two separate structures",
        "Spatial resolutions are in mm; SMALLER is better",
        "Temporal resolution is in frames per second; BIGGER is better",
        "Axial = along the beam; lateral = side to side; elevational = slice thickness",
        "Typical: axial 0.05–0.5 mm, lateral 0.3–3 mm, elevational usually worst",
        "Resolution is detail, not brightness and not penetration"
      ]
    },
    {
      id: "u07-l2",
      title: "Axial resolution: two reflectors along the beam",
      objectives: ["u07-o1", "u07-o2"],
      html: `<p class="lead">Axial resolution is set by the <b>length of the pulse</b>: two reflectors one behind the other are seen separately only if their echoes do not overlap.</p>
<p>Imagine shouting one short "hup!" down a hallway with two walls in it. If the walls are far apart you hear two distinct echoes. If they are close together and your shout was long and drawn out, the second echo starts before the first one finishes and your ear hears one smeared sound. The ultrasound receiver has exactly that problem.</p>
<p>Here is the geometry that gives you the "divide by two." Suppose the two reflectors are separated by a distance <i>d</i>. The pulse hits the first reflector, keeps going, travels <i>d</i> down to the second reflector, and its echo travels <i>d</i> back up. So the second echo falls behind the first one by a <b>round trip</b> of 2<i>d</i>. For the two echoes to stay apart, that 2<i>d</i> must be at least as long as the pulse itself:</p>
<div class="formula">2 × separation ≥ SPL  →  smallest separation = SPL ÷ 2</div>
<p><span class="kw">Axial resolution = spatial pulse length ÷ 2</span>, in millimeters. Shorter pulse, smaller number, better detail. Note who owns this: <b>the transducer</b> owns the pulse length, so axial resolution is essentially fixed by which probe you pick up, not by a knob you turn during the exam.</p>
<div class="callout key">LARRD: <b>L</b>ongitudinal, <b>A</b>xial, <b>R</b>ange, <b>R</b>adial, <b>D</b>epth. Five names, one measurement, one formula: SPL ÷ 2.</div>
<div class="callout tip">Because the pulse does not get longer as it travels down (attenuation weakens it but does not stretch it), <b>axial resolution is the same at every depth</b>. That single sentence answers a whole family of exam questions.</div>
<div class="callout warn">Trap: "the pulse gets longer with depth, so axial resolution worsens deeper." False. Lateral resolution changes with depth; axial does not.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>Two reflectors along the beam: separated by more than half the pulse length they show as two dots, closer than that they merge into one</title>
<text x="20" y="30" fill="currentColor" font-size="16">Gap &gt; SPL/2 : TWO dots</text>
<text x="330" y="30" fill="currentColor" font-size="16">Gap &lt; SPL/2 : ONE dot</text>
<line x1="70" y1="50" x2="70" y2="250" stroke="var(--c1)"/>
<line x1="150" y1="50" x2="150" y2="250" stroke="var(--c1)"/>
<line x1="70" y1="60" x2="150" y2="60" stroke="var(--c2)"/>
<line x1="70" y1="80" x2="150" y2="80" stroke="var(--c2)"/>
<text x="165" y="78" fill="currentColor" font-size="16">pulse (SPL)</text>
<circle cx="110" cy="140" r="7" fill="var(--c4)"/>
<circle cx="110" cy="210" r="7" fill="var(--c4)"/>
<text x="165" y="146" fill="currentColor" font-size="16">reflector 1</text>
<text x="165" y="216" fill="currentColor" font-size="16">reflector 2</text>
<line x1="40" y1="140" x2="40" y2="210" stroke="var(--c3)"/>
<text x="20" y="235" fill="currentColor" font-size="16">gap</text>
<line x1="380" y1="50" x2="380" y2="250" stroke="var(--c1)"/>
<line x1="460" y1="50" x2="460" y2="250" stroke="var(--c1)"/>
<line x1="380" y1="60" x2="460" y2="60" stroke="var(--c2)"/>
<line x1="380" y1="80" x2="460" y2="80" stroke="var(--c2)"/>
<circle cx="420" cy="160" r="7" fill="var(--c4)"/>
<circle cx="420" cy="180" r="7" fill="var(--c4)"/>
<text x="480" y="175" fill="currentColor" font-size="16">echoes</text>
<text x="480" y="197" fill="currentColor" font-size="16">overlap</text>
</svg>`, caption: "The second echo lags the first by a round trip of 2 × the gap. Less than one pulse length of lag and they blur together." },
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>A pulse of three cycles: spatial pulse length equals cycles times wavelength, and half of it is the axial resolution</title>
<line x1="30" y1="120" x2="570" y2="120" stroke="var(--muted)"/>
<path d="M60 120 q25 -55 50 0 q25 55 50 0 q25 -55 50 0 q25 55 50 0 q25 -55 50 0 q25 55 50 0" fill="none" stroke="var(--c1)"/>
<line x1="60" y1="60" x2="60" y2="180" stroke="var(--muted)"/>
<line x1="360" y1="60" x2="360" y2="180" stroke="var(--muted)"/>
<line x1="60" y1="185" x2="360" y2="185" stroke="var(--c2)"/>
<text x="150" y="210" fill="currentColor" font-size="16">SPL = 3 cycles x wavelength</text>
<line x1="60" y1="55" x2="160" y2="55" stroke="var(--c3)"/>
<text x="170" y="60" fill="currentColor" font-size="16">1 wavelength</text>
<line x1="400" y1="185" x2="550" y2="185" stroke="var(--c4)"/>
<text x="400" y="210" fill="currentColor" font-size="16">half of it = axial res</text>
<text x="30" y="40" fill="currentColor" font-size="16">count the cycles, multiply by lambda, then halve</text>
</svg>`, caption: "SPL = cycles × wavelength. Axial resolution is half of that." }
      ],
      sayIt: "Say out loud: why does axial resolution equal half the pulse length and not the whole pulse length? Use the words 'round trip'.",
      keyPoints: [
        "Axial resolution = SPL ÷ 2, in mm",
        "The ÷2 comes from the round trip: the echoes lag by 2 × the gap",
        "LARRD = longitudinal, axial, range, radial, depth",
        "Shorter pulse → smaller number → better detail",
        "Same at all depths, because the pulse does not lengthen as it travels",
        "Determined by the transducer, not by an operator knob"
      ]
    },
    {
      id: "u07-l3",
      title: "Doing the axial arithmetic",
      objectives: ["u07-o2"],
      html: `<p class="lead">Every axial-resolution calculation is the same three moves: wavelength, then pulse length, then halve it.</p>
<p>Start with the pulse. A pulse is just a handful of cycles, so its length in space is simply how many cycles there are times how long each cycle is:</p>
<div class="formula">SPL (mm) = number of cycles × wavelength (mm)</div>
<p>In soft tissue the wavelength comes straight from frequency, because speed is fixed at 1.54 mm/µs:</p>
<div class="formula">λ (mm) = 1.54 ÷ f (MHz)</div>
<div class="formula">Axial resolution (mm) = SPL ÷ 2 = (n × λ) ÷ 2 = 0.77 × n ÷ f (MHz)</div>
<p>Work one all the way through. A 5 MHz probe sends 3 cycles per pulse. λ = 1.54 ÷ 5 = 0.31 mm. SPL = 3 × 0.31 = 0.92 mm. Axial resolution = 0.46 mm. Now swap in a 10 MHz probe with 2 cycles: λ = 0.154 mm, SPL = 0.31 mm, axial resolution = 0.154 mm — three times better.</p>
<table class="dt">
<tr><th>Probe</th><th>λ (mm)</th><th>Cycles</th><th>SPL (mm)</th><th>Axial res (mm)</th></tr>
<tr><td>2 MHz</td><td>0.77</td><td>4</td><td>3.08</td><td>1.54</td></tr>
<tr><td>5 MHz</td><td>0.31</td><td>3</td><td>0.92</td><td>0.46</td></tr>
<tr><td>10 MHz</td><td>0.15</td><td>2</td><td>0.31</td><td>0.15</td></tr>
</table>
<div class="callout key">Shortcut worth memorizing: <b>axial resolution (mm) = 0.77 × cycles ÷ frequency (MHz)</b>. It already contains the 1.54 and the ÷2.</div>
<div class="callout warn">Watch the units. Frequency in MHz and answers in mm keep 1.54 mm/µs honest. If a question hands you SPL directly, do not compute λ again — just halve the SPL.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>Three-step flow chart from frequency to axial resolution</title>
<rect x="20" y="90" width="120" height="70" fill="none" stroke="var(--c1)"/>
<text x="40" y="122" fill="currentColor" font-size="16">frequency</text>
<text x="55" y="146" fill="currentColor" font-size="16">f MHz</text>
<path d="M140 125 L185 125 M172 117 L185 125 L172 133" fill="none" stroke="currentColor"/>
<rect x="190" y="90" width="130" height="70" fill="none" stroke="var(--c2)"/>
<text x="205" y="122" fill="currentColor" font-size="16">wavelength</text>
<text x="200" y="146" fill="currentColor" font-size="16">1.54 / f  mm</text>
<path d="M320 125 L365 125 M352 117 L365 125 L352 133" fill="none" stroke="currentColor"/>
<rect x="370" y="90" width="110" height="70" fill="none" stroke="var(--c3)"/>
<text x="395" y="122" fill="currentColor" font-size="16">SPL =</text>
<text x="382" y="146" fill="currentColor" font-size="16">cycles x &#955;</text>
<path d="M480 125 L525 125 M512 117 L525 125 L512 133" fill="none" stroke="currentColor"/>
<text x="505" y="190" fill="currentColor" font-size="16">&#247; 2</text>
<text x="330" y="230" fill="currentColor" font-size="16">= axial resolution (mm)</text>
<text x="20" y="45" fill="currentColor" font-size="16">Same three moves every time</text>
</svg>`, caption: "Frequency → wavelength → pulse length → halve it." }
      ],
      sayIt: "Out loud, do this one from memory: a 7.5 MHz probe sends 2 cycles. Wavelength? Pulse length? Axial resolution?",
      keyPoints: [
        "λ (mm) = 1.54 ÷ f (MHz) in soft tissue",
        "SPL = cycles × wavelength",
        "Axial resolution = SPL ÷ 2 = 0.77 × cycles ÷ f (MHz)",
        "5 MHz, 3 cycles → 0.46 mm; 10 MHz, 2 cycles → 0.15 mm",
        "If SPL is given, just halve it — do not recompute wavelength"
      ]
    },
    {
      id: "u07-l4",
      title: "Making axial resolution better: frequency and damping",
      objectives: ["u07-o3"],
      html: `<p class="lead">Only two things shorten a pulse: raise the frequency (shorter cycles) or damp the crystal harder (fewer cycles).</p>
<p>Think of the pulse as a ruler made of beads. Frequency controls how small each bead is; damping controls how many beads you thread on. Shrink the beads or use fewer of them and the ruler gets shorter — which is exactly what better axial resolution means.</p>
<p><span class="kw">Higher frequency</span> shortens the wavelength (λ = 1.54 ÷ f), so every cycle takes up less space. A 10 MHz pulse of 2 cycles is half as long as a 5 MHz pulse of 2 cycles. The price is <b>penetration</b>: attenuation in soft tissue runs about 0.5 dB per cm per MHz, so doubling frequency roughly doubles the loss. This is the single most tested trade-off in the whole course: <b>↑ frequency → ↓ wavelength → ↓ SPL → better (smaller) axial resolution → less penetration</b>. Who chooses? The sonographer, by selecting the probe or the frequency preset.</p>
<p><span class="kw">More damping</span> means the backing material behind the crystal absorbs the ringing quickly, so the crystal makes 2–3 cycles instead of ringing on for many. Fewer cycles means shorter SPL and better axial resolution, plus wider bandwidth and lower Q-factor. The price is <b>sensitivity</b>: a damped crystal puts out less energy per pulse, so weak echoes are harder to detect. Who chooses? The manufacturer, built into the probe.</p>
<div class="callout key">Short pulse = sharp picture. High frequency + heavy damping = shortest pulse = best axial resolution.</div>
<div class="callout tip">Dumb saying: "<b>Damp it, shrink it, sharpen it</b>" — damp the ringing, shrink the wavelength, sharpen the image.</div>
<div class="callout warn">Things that do <b>not</b> change axial resolution: depth, gain, focusing, sector width, line density, TGC. Focusing is a lateral tool; gain is brightness only.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A long ringing pulse from an undamped crystal versus a short damped pulse and their axial resolution</title>
<text x="20" y="34" fill="currentColor" font-size="16">Undamped: many cycles, long pulse</text>
<line x1="20" y1="90" x2="580" y2="90" stroke="var(--muted)"/>
<path d="M40 90 q15 -35 30 0 q15 35 30 0 q15 -35 30 0 q15 35 30 0 q15 -35 30 0 q15 35 30 0 q15 -35 30 0 q15 35 30 0" fill="none" stroke="var(--c2)"/>
<line x1="40" y1="118" x2="280" y2="118" stroke="var(--c2)"/>
<text x="300" y="124" fill="currentColor" font-size="16">long SPL = poor axial res</text>
<text x="20" y="180" fill="currentColor" font-size="16">Damped / higher frequency: few short cycles</text>
<line x1="20" y1="225" x2="580" y2="225" stroke="var(--muted)"/>
<path d="M40 225 q8 -30 16 0 q8 30 16 0 q8 -30 16 0 q8 30 16 0" fill="none" stroke="var(--c1)"/>
<line x1="40" y1="252" x2="104" y2="252" stroke="var(--c1)"/>
<text x="130" y="258" fill="currentColor" font-size="16">short SPL = good axial res</text>
</svg>`, caption: "Fewer, shorter cycles means a shorter pulse and a smaller (better) axial resolution number." }
      ],
      sayIt: "Say the chain out loud with no notes: raise the frequency — what happens to wavelength, pulse length, axial resolution, and penetration?",
      keyPoints: [
        "Two ways to shorten a pulse: higher frequency, more damping",
        "↑ f → ↓ λ → ↓ SPL → better axial resolution → ↓ penetration",
        "More damping → fewer cycles → shorter SPL, wider bandwidth, lower Q, less sensitivity",
        "Frequency is chosen by the sonographer; damping is built in by the manufacturer",
        "Depth, gain, focus and line density do NOT change axial resolution"
      ]
    },
    {
      id: "u07-l5",
      title: "Lateral resolution: two reflectors side by side",
      objectives: ["u07-o4"],
      html: `<p class="lead">Lateral resolution equals the <b>width of the beam</b> at that depth — and since the beam changes width with depth, so does lateral resolution.</p>
<p>Mental picture: you are painting a wall with a roller. Two dots of dirt closer together than the roller is wide get painted over as one smear. Two dots farther apart than the roller get painted separately. The beam is the roller; its width at that particular depth is your lateral resolution number, in millimeters.</p>
<p>Why the width matters: the scanner draws one line per pulse and assumes every echo came from the thin centerline of that line. If both reflectors are inside the beam at the same moment, they both return echoes during the same line and get painted at the same place, so they appear as one wide blob. Separate them by more than the beam width and they fall into different lines, so you get two dots.</p>
<div class="formula">Lateral resolution (mm) = beam diameter (beam width) at that depth</div>
<p>The beam is an hourglass: it narrows from the face of the probe down to the <span class="kw">focus</span>, where it is at its <b>narrowest</b>, then diverges in the far zone. So lateral resolution is <b>best at the focal depth</b> and gets worse both shallower and deeper. In the far zone it can become worse than the probe's own diameter.</p>
<div class="callout key">LATA: <b>L</b>ateral, <b>A</b>ngular, <b>T</b>ransverse, <b>A</b>zimuthal. Four names, one measurement: beam width.</div>
<div class="callout tip">Numbers to keep in your head: lateral resolution is typically 0.3–3 mm, roughly <b>2 to 10 times worse (bigger) than axial</b>. If an exam question gives you two numbers and asks which is axial, the smaller one is axial.</div>
<div class="callout warn">Classic trap: "lateral resolution is best at the skin surface because the beam starts narrow." No — the narrowest point is the focus, and the operator places it.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 320" role="img"><title>Hourglass beam: two reflectors side by side resolve at the focus but merge in the near and far zones</title>
<rect x="255" y="20" width="90" height="18" fill="var(--muted)"/>
<text x="360" y="35" fill="currentColor" font-size="16">transducer</text>
<path d="M255 38 L292 160 L255 300" fill="none" stroke="var(--c1)"/>
<path d="M345 38 L308 160 L345 300" fill="none" stroke="var(--c1)"/>
<circle cx="268" cy="85" r="6" fill="var(--c2)"/>
<circle cx="332" cy="85" r="6" fill="var(--c2)"/>
<text x="360" y="90" fill="currentColor" font-size="16">wide beam - merge</text>
<circle cx="288" cy="160" r="6" fill="var(--c3)"/>
<circle cx="312" cy="160" r="6" fill="var(--c3)"/>
<text x="360" y="165" fill="currentColor" font-size="16">FOCUS - two dots</text>
<circle cx="268" cy="270" r="6" fill="var(--c2)"/>
<circle cx="332" cy="270" r="6" fill="var(--c2)"/>
<text x="360" y="275" fill="currentColor" font-size="16">diverging - merge</text>
<text x="20" y="160" fill="currentColor" font-size="16">narrowest</text>
<text x="20" y="182" fill="currentColor" font-size="16">= best</text>
<text x="20" y="204" fill="currentColor" font-size="16">lateral res</text>
</svg>`, caption: "Beam width is the lateral resolution. It is smallest (best) at the focus." }
      ],
      sayIt: "Say out loud: what is lateral resolution equal to, what are its four names, and at what depth is it best?",
      keyPoints: [
        "Lateral resolution = beam width at that depth, in mm",
        "LATA = lateral, angular, transverse, azimuthal",
        "Best (smallest) at the focus; worse in the near zone and far zone",
        "Changes with depth — unlike axial resolution",
        "Typically 0.3–3 mm; about 2–10× worse than axial",
        "Two reflectors inside the beam at once are painted as one blob"
      ]
    },
    {
      id: "u07-l6",
      title: "Making lateral resolution better",
      objectives: ["u07-o5"],
      html: `<p class="lead">Anything that narrows the beam where the anatomy is improves lateral resolution — and each method has a bill attached.</p>
<p><span class="kw">Focus at the right depth.</span> The single most useful thing the sonographer does. Move the focal marker to the level of the structure you care about and the beam is at its narrowest exactly there. Cost: the beam diverges faster beyond the focus, so everything deeper gets worse.</p>
<p><span class="kw">Use multiple transmit foci.</span> The machine fires several pulses down the same line, each focused at a different depth, and stitches the sharp parts together. The picture gets uniformly narrow beams. Cost: <b>frame rate</b>. Two foci means twice the pulses, so half the frame rate — a direct trade of temporal resolution for lateral resolution. This is the classic exam pairing.</p>
<p><span class="kw">Raise the frequency.</span> Higher frequency beams diverge less in the far zone, so both the near-zone length and the far-field beam behave better. Cost: penetration, again.</p>
<p><span class="kw">Aperture (element diameter).</span> A larger aperture gives a longer near zone and a narrower beam at depth, but a <i>wider</i> beam right at the face; a small aperture is narrower near the probe but diverges quickly. Arrays cheat here with a <b>dynamic aperture</b> — a few elements for shallow echoes, more elements as the echoes arrive from deeper.</p>
<div class="callout key">Improve lateral resolution: focus there, add foci, raise frequency, use an appropriate aperture. Bills due: depth beyond focus, frame rate, penetration.</div>
<div class="callout tip">Dumb saying: "<b>More foci, more focus, fewer frames.</b>"</div>
<div class="callout warn">Lateral resolution never becomes better than axial in a normal imaging system. If your calculation says lateral 0.1 mm and axial 0.8 mm, you have swapped them.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>Single focus versus three transmit foci: narrower beam over more depth, at a lower frame rate</title>
<text x="30" y="30" fill="currentColor" font-size="16">1 focus - 30 frames/s</text>
<text x="340" y="30" fill="currentColor" font-size="16">3 foci - 10 frames/s</text>
<rect x="70" y="45" width="90" height="14" fill="var(--muted)"/>
<path d="M70 59 L108 130 L70 270" fill="none" stroke="var(--c1)"/>
<path d="M160 59 L122 130 L160 270" fill="none" stroke="var(--c1)"/>
<text x="175" y="135" fill="currentColor" font-size="16">sharp here only</text>
<rect x="380" y="45" width="90" height="14" fill="var(--muted)"/>
<path d="M380 59 L418 100 L392 160 L418 220 L392 270" fill="none" stroke="var(--c3)"/>
<path d="M470 59 L432 100 L458 160 L432 220 L458 270" fill="none" stroke="var(--c3)"/>
<text x="487" y="105" fill="currentColor" font-size="16">sharp</text>
<text x="487" y="165" fill="currentColor" font-size="16">sharp</text>
<text x="487" y="225" fill="currentColor" font-size="16">sharp</text>
<text x="330" y="292" fill="currentColor" font-size="16">3x the pulses = 1/3 the frame rate</text>
</svg>`, caption: "Multiple transmit foci buy lateral resolution and pay for it with temporal resolution." }
      ],
      sayIt: "Say out loud: name four ways to improve lateral resolution and the cost of each one.",
      keyPoints: [
        "Place the focus at the depth of interest — best operator control",
        "Multiple transmit foci narrow the beam over more depth but cut frame rate proportionally",
        "Higher frequency = less divergence = better lateral resolution, less penetration",
        "Dynamic aperture widens the active element group as echoes come from deeper",
        "Lateral resolution is never better than axial resolution"
      ]
    },
    {
      id: "u07-l7",
      title: "Elevational resolution and slice thickness",
      objectives: ["u07-o6"],
      html: `<p class="lead">The image looks like a flat fan, but the beam is really a slab with thickness — and that thickness is the resolution nobody remembers.</p>
<p>Hold a slice of bread against the anatomy. Everything inside that slice gets squashed onto one flat picture. If a tiny cyst sits half in and half out of the slice, its echo-free inside gets averaged with the tissue next to it and the cyst looks filled in with junk. That is the classic <span class="kw">slice thickness artifact</span>, and it is why a small cyst or the gallbladder wall can look falsely "dirty."</p>
<p><span class="kw">Elevational resolution</span> is that slab thickness, measured in mm. It is perpendicular to both the axial and lateral directions — the direction going in and out of the screen. It is usually the <b>worst</b> of the three spatial resolutions.</p>
<p>What sets it? The <b>height of the elements</b> plus whatever fixed <b>acoustic lens</b> is glued on the face of the probe. Because the lens is a physical piece of plastic, its focus is at one fixed depth, and the sonographer cannot move it. Slice thickness is therefore thinnest at that single lens focal depth and thicker above and below.</p>
<p>The engineering fixes:</p>
<ul>
<li><span class="kw-2">1.5D array</span> — a few extra rows of elements stacked in the elevational direction, so delays can focus that plane electronically at more than one depth. Better slice thickness, many more wires.</li>
<li><span class="kw-2">2D (matrix) array</span> — a full grid of elements that steers and focuses in both planes, enabling real 3D/4D volumes.</li>
</ul>
<div class="callout key">Elevational = slice thickness = section thickness. Set by element height and the fixed lens; improved by 1.5D and 2D arrays. Usually the worst resolution.</div>
<div class="callout tip">Dumb saying: "<b>Fat slice, fake filling</b>" — a thick slice fills cysts with fake echoes.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>The scan plane is a slab with thickness; a small cyst partly inside the slab is filled with averaged echoes</title>
<path d="M120 60 L420 40 L500 90 L200 110 Z" fill="none" stroke="var(--c1)"/>
<path d="M120 60 L120 230 L200 280 L200 110" fill="none" stroke="var(--c1)"/>
<path d="M200 280 L500 260 L500 90" fill="none" stroke="var(--c1)"/>
<text x="230" y="40" fill="currentColor" font-size="16">the slab of sound (scan plane)</text>
<line x1="120" y1="48" x2="200" y2="98" stroke="var(--c2)" stroke-width="3"/>
<line x1="120" y1="42" x2="120" y2="54" stroke="var(--c2)" stroke-width="3"/>
<line x1="200" y1="92" x2="200" y2="104" stroke="var(--c2)" stroke-width="3"/>
<text x="22" y="38" fill="currentColor" font-size="16">out-of-plane thickness</text>
<circle cx="330" cy="175" r="30" fill="none" stroke="var(--c3)"/>
<text x="250" y="240" fill="currentColor" font-size="16">small cyst half inside the slab</text>
<text x="20" y="290" fill="currentColor" font-size="16">surrounding tissue echoes average in: cyst looks filled</text>
</svg>`, caption: "Elevational resolution is the thickness of the slab; a thick slab fills small cysts with false echoes." }
      ],
      sayIt: "Say out loud: what is elevational resolution, what determines it, why can't you adjust it, and what two array designs improve it?",
      keyPoints: [
        "Elevational resolution = slice thickness = section thickness, in mm",
        "Direction is in-and-out of the screen, perpendicular to axial and lateral",
        "Determined by element height and a fixed acoustic lens — not operator adjustable",
        "Usually the worst of the three spatial resolutions",
        "Causes the slice-thickness artifact: false echoes inside small cysts",
        "1.5D arrays focus it electronically; 2D matrix arrays focus both planes and allow 3D/4D"
      ]
    },
    {
      id: "u07-l8",
      title: "Temporal resolution: frame rate",
      objectives: ["u07-o7"],
      html: `<p class="lead">Temporal resolution is the ability to tell two <b>moments</b> apart, and it is nothing more than frame rate: frames per second.</p>
<p>Think of a flip book. A thick stack of pages flipped quickly shows smooth motion; a thin stack shows a jerky slide show that skips the fast bits. A heart valve slams shut in a few hundredths of a second, so if your machine only delivers 10 frames per second you will miss the moment the leaflets meet.</p>
<div class="formula">Temporal resolution = frame time = 1 ÷ frame rate</div>
<p>Frame rate is capped by physics, not by the computer. The machine must send a pulse down a line and <b>wait for the deepest echo to return</b> before firing the next line. Sound needs about <b>13 µs per cm of depth</b> for a round trip, so:</p>
<div class="formula">Frame time = 13 µs × depth (cm) × lines per frame</div>
<div class="formula">Frame rate ≈ 77,000 ÷ [depth (cm) × lines per frame]</div>
<p>Example: 10 cm deep, 128 lines → frame time = 13 × 10 × 128 = 16,640 µs ≈ 0.0166 s → about 60 frames/s. Halve the depth and you double the frame rate.</p>
<p>So the ways to <b>raise</b> frame rate are: <span class="kw">less depth</span>, a <span class="kw">narrower sector</span> (fewer lines), <span class="kw">lower line density</span>, and <span class="kw">a single focus</span> instead of several. Every one of those is set by the sonographer, and every one of those costs something in the picture: less anatomy on screen, a narrower field, coarser lateral detail, or a beam that is only narrow at one depth.</p>
<div class="callout key">Real time means roughly <b>15–20 frames/s or more</b>. Below that the eye sees flicker and fast motion is lost.</div>
<div class="callout tip">Dumb saying for what kills frame rate: "<b>Deep, Wide, Dense, Many = Molasses.</b>" Deep image, wide sector, dense lines, many foci — everything crawls.</div>
<div class="callout warn">Multiple foci improve <b>lateral</b> resolution and hurt <b>temporal</b> resolution. They do nothing to axial resolution.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>One frame is built line by line; deeper images and more lines make each frame take longer</title>
<text x="20" y="30" fill="currentColor" font-size="16">Shallow + few lines = fast frames</text>
<rect x="20" y="45" width="230" height="70" fill="none" stroke="var(--c1)"/>
<line x1="45" y1="45" x2="45" y2="115" stroke="var(--c1)"/>
<line x1="80" y1="45" x2="80" y2="115" stroke="var(--c1)"/>
<line x1="115" y1="45" x2="115" y2="115" stroke="var(--c1)"/>
<line x1="150" y1="45" x2="150" y2="115" stroke="var(--c1)"/>
<line x1="185" y1="45" x2="185" y2="115" stroke="var(--c1)"/>
<line x1="220" y1="45" x2="220" y2="115" stroke="var(--c1)"/>
<text x="270" y="88" fill="currentColor" font-size="16">short waits, few lines</text>
<text x="20" y="160" fill="currentColor" font-size="16">Deep + many lines = slow frames</text>
<rect x="20" y="175" width="230" height="110" fill="none" stroke="var(--c2)"/>
<line x1="35" y1="175" x2="35" y2="285" stroke="var(--c2)"/>
<line x1="55" y1="175" x2="55" y2="285" stroke="var(--c2)"/>
<line x1="75" y1="175" x2="75" y2="285" stroke="var(--c2)"/>
<line x1="95" y1="175" x2="95" y2="285" stroke="var(--c2)"/>
<line x1="115" y1="175" x2="115" y2="285" stroke="var(--c2)"/>
<line x1="135" y1="175" x2="135" y2="285" stroke="var(--c2)"/>
<line x1="155" y1="175" x2="155" y2="285" stroke="var(--c2)"/>
<line x1="175" y1="175" x2="175" y2="285" stroke="var(--c2)"/>
<line x1="195" y1="175" x2="195" y2="285" stroke="var(--c2)"/>
<line x1="215" y1="175" x2="215" y2="285" stroke="var(--c2)"/>
<line x1="235" y1="175" x2="235" y2="285" stroke="var(--c2)"/>
<text x="270" y="220" fill="currentColor" font-size="16">long waits, many lines</text>
<text x="270" y="250" fill="currentColor" font-size="16">13 us per cm per line</text>
</svg>`, caption: "Each line costs 13 µs per cm of depth. Depth × lines sets the frame time." }
      ],
      sayIt: "Say out loud: four ways to raise the frame rate, and what each one costs you in the image.",
      keyPoints: [
        "Temporal resolution = frame rate (frames/s); bigger is better",
        "Frame time = 13 µs × depth (cm) × lines per frame",
        "Frame rate ≈ 77,000 ÷ (depth × lines)",
        "Raise it: shallower depth, narrower sector, lower line density, single focus",
        "Real time needs roughly 15–20 fps or more",
        "Limited by the speed of sound — the machine must wait for echoes"
      ]
    },
    {
      id: "u07-l9",
      title: "Contrast resolution, and choosing what to sacrifice",
      objectives: ["u07-o8", "u07-o9"],
      html: `<p class="lead">Contrast resolution is the ability to tell two similar shades of gray apart — and in real scanning it is often what actually makes the diagnosis.</p>
<p>Imagine a gray card taped to a slightly different gray wall. Spatial resolution asks "can I see the edge is sharp?" Contrast resolution asks "can I even tell the card from the wall?" A liver lesion that is only a little darker than the surrounding liver is a contrast-resolution problem, not an axial one.</p>
<p>What improves it: <span class="kw">compression / dynamic range</span> settings (a lower dynamic range gives fewer, more distinct shades and higher contrast; a higher dynamic range gives a softer, smoother image with more shades), <span class="kw">post-processing curves</span>, <span class="kw">tissue harmonic imaging</span> (fewer artifacts and clutter), <span class="kw">spatial compounding</span> (averaging views reduces speckle), and simply having <b>more gray shades available</b>, which depends on the bits per pixel in the scan converter. The sonographer controls dynamic range, post-processing maps and harmonics; the bit depth is built into the machine.</p>
<table class="dt">
<tr><th>Resolution</th><th>What it equals</th><th>Better when</th><th>Cost</th></tr>
<tr><td>Axial</td><td>SPL ÷ 2</td><td>↑ frequency, ↑ damping</td><td>penetration, sensitivity</td></tr>
<tr><td>Lateral</td><td>beam width</td><td>focus there, ↑ frequency, more foci</td><td>penetration, frame rate</td></tr>
<tr><td>Elevational</td><td>slice thickness</td><td>1.5D / 2D arrays</td><td>cost, complexity</td></tr>
<tr><td>Temporal</td><td>frame rate</td><td>↓ depth, ↓ lines, 1 focus</td><td>field of view, lateral detail</td></tr>
</table>
<div class="callout key">There is no free improvement. Every gain in one resolution is paid for in penetration, field of view, or frame rate.</div>
<div class="callout tip">Clinical instinct to build: a fetal heart in motion → protect <b>temporal</b> (shallow, narrow, one focus). A small superficial mass → protect <b>axial and lateral</b> (high frequency, focus on it, accept a slower frame rate).</div>
<div class="steps"><ol><li>For 3 cycles at 5 MHz, λ = 1.54 ÷ 5 = 0.308 mm, SPL = 0.924 mm, and axial resolution = 0.462 mm; the shortcut gives 0.77 × 3 ÷ 5 = 0.462 mm.</li><li>A 1.5 mm beam gives 1.5 mm lateral resolution; a 3 mm slice gives 3 mm elevational resolution.</li><li>At 10 cm and 128 lines, frame time = 13 µs × 10 × 128 = 16.64 ms.</li><li>Frame rate = 1 ÷ 0.01664 ≈ 60 frames/s, so temporal resolution is 16.64 ms.</li></ol></div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Two gray patches nearly alike: good contrast resolution separates them, poor contrast resolution blends them</title>
<rect x="40" y="60" width="90" height="90" fill="var(--muted)"/>
<rect x="130" y="60" width="90" height="90" fill="var(--c1)"/>
<text x="45" y="180" fill="currentColor" font-size="16">told apart = good</text>
<text x="45" y="204" fill="currentColor" font-size="16">contrast resolution</text>
<rect x="340" y="60" width="180" height="90" fill="var(--muted)"/>
<text x="340" y="180" fill="currentColor" font-size="16">blended = poor</text>
<text x="340" y="204" fill="currentColor" font-size="16">contrast resolution</text>
<text x="20" y="34" fill="currentColor" font-size="16">Same shapes, different ability to separate the shades</text>
</svg>`, caption: "Contrast resolution is about shades of gray, not about millimeters." }
      ],
      sayIt: "Say out loud: define contrast resolution, name three things that improve it, and say which of the four other resolutions each scanning change would cost.",
      keyPoints: [
        "Contrast resolution = telling apart similar shades of gray",
        "Improved by dynamic range/compression settings, post-processing, harmonics, spatial compounding, more bits per pixel",
        "Lower dynamic range = fewer shades = higher contrast; higher = smoother image",
        "Axial = SPL÷2; lateral = beam width; elevational = slice thickness; temporal = frame rate",
        "Every improvement costs penetration, field of view or frame rate",
        "Moving structures → protect temporal; small detail → protect axial and lateral"
      ]
    }
  ],

  mnemonics: [
    { saying: "LARRD", meaning: "Longitudinal, Axial, Range, Radial, Depth — the five names for axial resolution. Picture a big guy named Larrd standing in line, one behind the other.", lesson: "u07-l2" },
    { saying: "LATA", meaning: "Lateral, Angular, Transverse, Azimuthal — the four names for lateral resolution. 'See you LATA' — you wave side to side.", lesson: "u07-l5" },
    { saying: "Short pulse = sharp picture", meaning: "Anything that shortens the pulse (higher frequency, more damping, fewer cycles) improves axial resolution.", lesson: "u07-l4" },
    { saying: "Damp it, shrink it, sharpen it", meaning: "Damp the ringing (fewer cycles) and shrink the wavelength (higher frequency) and axial resolution sharpens.", lesson: "u07-l4" },
    { saying: "Half the pulse, because the echo takes a round trip", meaning: "Axial resolution = SPL ÷ 2; the second echo lags by twice the gap between reflectors.", lesson: "u07-l2" },
    { saying: "Best at the focus, blurry at the edges", meaning: "Lateral resolution equals beam width, so it is best at the focal depth and worse shallower and deeper.", lesson: "u07-l5" },
    { saying: "More foci, more focus, fewer frames", meaning: "Each extra transmit focus improves lateral resolution and divides the frame rate.", lesson: "u07-l6" },
    { saying: "Fat slice, fake filling", meaning: "A thick slice (poor elevational resolution) fills small cysts with false echoes — the slice-thickness artifact.", lesson: "u07-l7" },
    { saying: "Deep, Wide, Dense, Many = Molasses", meaning: "Deep image, wide sector, dense lines and many foci all slow the frame rate and wreck temporal resolution.", lesson: "u07-l8" },
    { saying: "Small is smart, except for frames", meaning: "Smaller millimeter numbers are better for axial/lateral/elevational, but a bigger frames-per-second number is better for temporal.", lesson: "u07-l1" }
  ],

  formulas: [
    { name: "Axial resolution", expr: "Axial res (mm) = SPL ÷ 2", units: "mm", note: "LARRD. Smaller is better. Typical 0.05–0.5 mm." },
    { name: "Spatial pulse length", expr: "SPL (mm) = number of cycles × wavelength (mm)", units: "mm", note: "Both factors come from the transducer, not the operator." },
    { name: "Wavelength in soft tissue", expr: "λ (mm) = 1.54 ÷ f (MHz)", units: "mm", note: "Uses the fixed soft-tissue speed 1.54 mm/µs." },
    { name: "Axial resolution shortcut", expr: "Axial res (mm) = 0.77 × cycles ÷ f (MHz)", units: "mm", note: "Combines λ = 1.54/f with the ÷ 2." },
    { name: "Lateral resolution", expr: "Lateral res (mm) = beam width at that depth", units: "mm", note: "LATA. Best (narrowest) at the focus." },
    { name: "Elevational resolution", expr: "Elevational res (mm) = slice thickness", units: "mm", note: "Set by element height and the fixed lens." },
    { name: "Temporal resolution", expr: "Temporal res = frame time = 1 ÷ frame rate", units: "s (or ms)", note: "Higher frame rate = better temporal resolution." },
    { name: "Frame time", expr: "Frame time = 13 µs × depth (cm) × lines per frame", units: "µs", note: "Multiply lines by the number of transmit foci." },
    { name: "Frame rate", expr: "Frame rate ≈ 77,000 ÷ [depth (cm) × lines]", units: "Hz (frames/s)", note: "From 1 ÷ (13 µs × depth × lines)." }
  ],

  keyNumbers: [
    { fact: "Typical axial resolution", value: "0.05–0.5 mm (best of the spatial resolutions)" },
    { fact: "Typical lateral resolution", value: "0.3–3 mm; about 2–10× larger (worse) than axial" },
    { fact: "Elevational resolution", value: "Usually the worst spatial resolution; several mm in many probes" },
    { fact: "Frame rate needed to look like real time", value: "about 15–20 frames per second or more" },
    { fact: "Round-trip time in soft tissue", value: "13 µs per cm of depth" },
    { fact: "Propagation speed in soft tissue", value: "1,540 m/s = 1.54 mm/µs" },
    { fact: "Cycles in a typical imaging pulse", value: "2–4 (heavily damped)" },
    { fact: "Cycles in a continuous-wave / Doppler burst", value: "many more — poor or no axial resolution" },
    { fact: "Typical lines per frame", value: "about 100–250" },
    { fact: "Attenuation rule of thumb in soft tissue", value: "0.5 dB per cm per MHz (why high frequency costs penetration)" },
    { fact: "Effect of adding a second transmit focus", value: "frame rate is cut roughly in half" }
  ],

  flashcards: [
    { front: "Axial resolution", back: "Ability to separate two reflectors one behind the other along the beam; = SPL ÷ 2, in mm", lesson: "u07-l2" },
    { front: "SPL ÷ 2", back: "Axial resolution (mm)", lesson: "u07-l2" },
    { front: "LARRD stands for…", back: "Longitudinal, Axial, Range, Radial, Depth — all mean axial resolution", lesson: "u07-l2" },
    { front: "Why divide the pulse length by 2?", back: "The echoes of the two reflectors lag by a round trip = 2 × the gap", lesson: "u07-l2" },
    { front: "Spatial pulse length formula", back: "SPL = number of cycles × wavelength (mm)", lesson: "u07-l3" },
    { front: "Wavelength in soft tissue", back: "λ (mm) = 1.54 ÷ f (MHz)", lesson: "u07-l3" },
    { front: "Axial resolution shortcut from frequency", back: "0.77 × cycles ÷ f (MHz), in mm", lesson: "u07-l3" },
    { front: "Typical axial resolution values", back: "0.05–0.5 mm; smaller is better", lesson: "u07-l1" },
    { front: "Does axial resolution change with depth?", back: "No — the pulse does not lengthen as it travels", lesson: "u07-l2" },
    { front: "Two ways to improve axial resolution", back: "Higher frequency (shorter λ) and more damping (fewer cycles)", lesson: "u07-l4" },
    { front: "Cost of raising frequency", back: "Less penetration (attenuation ≈ 0.5 dB/cm/MHz)", lesson: "u07-l4" },
    { front: "Cost of more damping", back: "Less sensitivity/output; wider bandwidth, lower Q-factor", lesson: "u07-l4" },
    { front: "Who determines axial resolution?", back: "The transducer (pulse length) — not an operator knob", lesson: "u07-l4" },
    { front: "Lateral resolution", back: "Ability to separate two reflectors side by side; = beam width, in mm", lesson: "u07-l5" },
    { front: "Beam width equals which resolution?", back: "Lateral resolution", lesson: "u07-l5" },
    { front: "LATA stands for…", back: "Lateral, Angular, Transverse, Azimuthal", lesson: "u07-l5" },
    { front: "Where is lateral resolution best?", back: "At the focus, where the beam is narrowest", lesson: "u07-l5" },
    { front: "Typical lateral resolution values", back: "0.3–3 mm; roughly 2–10× worse than axial", lesson: "u07-l5" },
    { front: "Which changes with depth: axial or lateral?", back: "Lateral (beam width changes); axial stays the same", lesson: "u07-l5" },
    { front: "Four ways to improve lateral resolution", back: "Focus at that depth, more transmit foci, higher frequency, appropriate/dynamic aperture", lesson: "u07-l6" },
    { front: "Cost of multiple transmit foci", back: "Lower frame rate (worse temporal resolution)", lesson: "u07-l6" },
    { front: "Dynamic aperture", back: "Receive trick: more elements used as echoes come from deeper, keeping the beam narrow", lesson: "u07-l6" },
    { front: "Elevational resolution", back: "Slice (section) thickness — the in-and-out-of-screen direction", lesson: "u07-l7" },
    { front: "Slice thickness is determined by…", back: "Element height plus the fixed acoustic lens", lesson: "u07-l7" },
    { front: "Which spatial resolution is usually worst?", back: "Elevational (slice thickness)", lesson: "u07-l7" },
    { front: "Slice thickness artifact", back: "False echoes filling in small cysts because the slab is thicker than the cyst", lesson: "u07-l7" },
    { front: "How do 1.5D arrays help?", back: "Extra element rows allow electronic focusing in the elevational plane", lesson: "u07-l7" },
    { front: "2D (matrix) array", back: "Full grid of elements; focuses and steers in both planes; gives 3D/4D", lesson: "u07-l7" },
    { front: "Temporal resolution", back: "Ability to separate events in time = frame rate (frames/s); bigger is better", lesson: "u07-l8" },
    { front: "Frame time formula", back: "13 µs × depth (cm) × lines per frame (× number of foci)", lesson: "u07-l8" },
    { front: "Frame rate shortcut", back: "≈ 77,000 ÷ (depth in cm × lines per frame)", lesson: "u07-l8" },
    { front: "Frame rate for 'real time'", back: "About 15–20 frames per second or more", lesson: "u07-l8" },
    { front: "Four ways to raise frame rate", back: "Less depth, narrower sector, lower line density, single focus", lesson: "u07-l8" },
    { front: "Why is frame rate limited at all?", back: "Speed of sound: the machine must wait 13 µs per cm for each line's echoes", lesson: "u07-l8" },
    { front: "Contrast resolution", back: "Ability to distinguish similar shades of gray", lesson: "u07-l9" },
    { front: "Three things that improve contrast resolution", back: "Compression/dynamic range settings, harmonics, spatial compounding (and more bits per pixel)", lesson: "u07-l9" },
    { front: "Effect of lowering dynamic range", back: "Fewer gray shades, more black-and-white/high-contrast image", lesson: "u07-l9" },
    { front: "Rank the spatial resolutions best to worst", back: "Axial best, lateral next, elevational usually worst", lesson: "u07-l1" }
  ],

  questions: [
    { id: "u07-q1", type: "mc", q: "Axial resolution is best defined as the ability to separate two structures that are:", choices: ["Side by side, perpendicular to the beam", "One behind the other, parallel to the beam", "Separated in time", "Separated by slice thickness"], answer: 1, explain: "Axial means along the beam path — one reflector deeper than the other. 'Side by side' is the tempting distractor, but that is lateral resolution, which equals beam width instead of half the pulse length.", objectives: ["u07-o1"], lesson: "u07-l2", level: 1 },
    { id: "u07-q2", type: "short", q: "What mnemonic lists the five names for axial resolution?", answer: "LARRD", accept: ["LARRD", "larrd", "L.A.R.R.D."], explain: "Longitudinal, Axial, Range, Radial, Depth. If a question uses any of those five words, the answer is SPL ÷ 2.", objectives: ["u07-o1"], lesson: "u07-l2", level: 1 },
    { id: "u07-q3", type: "tf", q: "A smaller axial resolution number (in mm) means better detail.", answer: true, explain: "Resolution is the smallest separation still seen as two things, so a small number means the reflectors could be closer and still be resolved. The everyday phrase 'high resolution' misleads people into picking false here.", objectives: ["u07-o1"], lesson: "u07-l1", level: 1 },
    { id: "u07-q4", type: "mc", q: "Two reflectors lie 0.3 mm apart along the beam. A transducer has an axial resolution of 0.5 mm. What is displayed?", choices: ["Two separate dots", "One merged dot", "Two dots at the wrong depth", "Nothing at all"], answer: 1, explain: "The gap (0.3 mm) is smaller than the resolution (0.5 mm), so the echoes overlap and paint one blob. 'Two dots at the wrong depth' confuses resolution with a propagation-speed error, which misplaces echoes rather than merging them.", objectives: ["u07-o1"], lesson: "u07-l2", level: 2 },
    { id: "u07-q5", type: "mc", q: "A pulse contains 4 cycles and the wavelength is 0.5 mm. What is the axial resolution?", choices: ["0.5 mm", "1.0 mm", "2.0 mm", "4.0 mm"], answer: 1, explain: "SPL = 4 × 0.5 = 2.0 mm, and axial resolution = SPL ÷ 2 = 1.0 mm. Choosing 2.0 mm means you stopped at the pulse length and forgot the round-trip halving.", objectives: ["u07-o2"], lesson: "u07-l3", level: 3 },
    { id: "u07-q6", type: "short", q: "In soft tissue, what is the wavelength of a 5 MHz transducer, in mm?", answer: "0.31 mm", accept: ["0.31 mm", "0.31", "0.308", "0.308 mm", ".31", ".31 mm", "0.3 mm", "0.3"], explain: "λ = 1.54 ÷ 5 = 0.308 mm, rounded to 0.31 mm. Using 1,540 without converting gives a nonsense answer in metres.", objectives: ["u07-o2"], lesson: "u07-l3", level: 2 },
    { id: "u07-q7", type: "mc", q: "A 10 MHz probe emits 2 cycles per pulse. Its axial resolution is closest to:", choices: ["0.08 mm", "0.15 mm", "0.31 mm", "0.62 mm"], answer: 1, explain: "λ = 1.54 ÷ 10 = 0.154 mm; SPL = 2 × 0.154 = 0.31 mm; axial resolution = 0.154 mm. 0.31 mm is the pulse length itself — the classic 'forgot to halve' answer.", objectives: ["u07-o2"], lesson: "u07-l3", level: 3 },
    { id: "u07-q8", type: "mc", q: "Transducer A: 3 MHz, 3 cycles. Transducer B: 6 MHz, 3 cycles. Which has the better axial resolution and by how much?", choices: ["A, by 2×", "B, by 2×", "B, by 4×", "They are equal because the cycle count matches"], answer: 1, explain: "Same cycles, so the ratio is set by wavelength: doubling frequency halves λ, halves SPL, and halves the axial resolution number — twice as good. Equal cycle counts do not make them equal; cycles and frequency both matter.", objectives: ["u07-o2"], lesson: "u07-l3", level: 3 },
    { id: "u07-q9", type: "mc", q: "Which change improves axial resolution?", choices: ["Increasing the imaging depth", "Increasing the damping of the crystal", "Moving the focus deeper", "Increasing receiver gain"], answer: 1, explain: "More damping means fewer cycles, a shorter pulse, and a smaller axial-resolution number. Moving the focus is a lateral tool, and gain only changes brightness — neither shortens the pulse.", objectives: ["u07-o3"], lesson: "u07-l4", level: 2 },
    { id: "u07-q10", type: "tf", q: "Raising the transducer frequency improves axial resolution but reduces penetration.", answer: true, explain: "Higher frequency shortens the wavelength and therefore the pulse (better axial detail), but attenuation rises at roughly 0.5 dB/cm/MHz, so echoes from deep structures die out sooner.", objectives: ["u07-o3"], lesson: "u07-l4", level: 2 },
    { id: "u07-q11", type: "short", q: "What transducer component shortens the pulse by absorbing the crystal's ringing?", answer: "backing material", accept: ["backing material", "backing", "damping material", "damping element", "backing layer"], explain: "The backing (damping) layer behind the PZT absorbs vibration so the pulse is only 2–3 cycles. The matching layer is the tempting wrong answer, but that handles impedance, not ringing.", objectives: ["u07-o3"], lesson: "u07-l4", level: 1 },
    { id: "u07-q12", type: "mc", q: "A sonographer switches from a 5 MHz to a 2 MHz probe to see a deep structure. What happens to axial resolution and penetration?", choices: ["Both improve", "Axial resolution worsens, penetration improves", "Axial resolution improves, penetration worsens", "Neither changes"], answer: 1, explain: "Lower frequency means a longer wavelength, a longer pulse, and a larger (worse) axial-resolution number, but less attenuation and better penetration. 'Both improve' ignores the fundamental trade-off.", objectives: ["u07-o3"], lesson: "u07-l4", level: 2 },
    { id: "u07-q13", type: "mc", q: "Lateral resolution is numerically equal to:", choices: ["Half the spatial pulse length", "The beam width at that depth", "The slice thickness", "The frame time"], answer: 1, explain: "Lateral resolution is the beam diameter where the reflectors sit. Half the pulse length is axial, slice thickness is elevational, and frame time is temporal.", objectives: ["u07-o4"], lesson: "u07-l5", level: 1 },
    { id: "u07-q14", type: "short", q: "What mnemonic gives the four names for lateral resolution?", answer: "LATA", accept: ["LATA", "lata", "L.A.T.A."], explain: "Lateral, Angular, Transverse, Azimuthal. Seeing any of those words on an exam means 'beam width'.", objectives: ["u07-o4"], lesson: "u07-l5", level: 1 },
    { id: "u07-q15", type: "mc", q: "At which depth is lateral resolution best?", choices: ["At the transducer face", "In the near zone, halfway to the focus", "At the focal depth", "In the far zone, past the focus"], answer: 2, explain: "The beam is narrowest at the focus, so lateral resolution is best there. At the face the beam is about as wide as the aperture, and past the focus it diverges.", objectives: ["u07-o4"], lesson: "u07-l5", level: 2 },
    { id: "u07-q16", type: "tf", q: "Lateral resolution varies with depth, while axial resolution is the same at every depth.", answer: true, explain: "Beam width changes with depth (hourglass shape), so lateral resolution changes. The pulse does not stretch as it travels, so axial resolution is constant.", objectives: ["u07-o4"], lesson: "u07-l5", level: 1 },
    { id: "u07-q17", type: "mc", q: "Which operator action most directly improves lateral resolution at a structure of interest?", choices: ["Increasing overall gain", "Placing the transmit focus at that structure's depth", "Increasing the dynamic range", "Turning on the reject control"], answer: 1, explain: "The beam is narrowest at the focus, so moving the focus to that depth narrows the beam right there. Gain, dynamic range and reject all change how echoes are displayed, not the beam's width.", objectives: ["u07-o5"], lesson: "u07-l6", level: 2 },
    { id: "u07-q18", type: "mc", q: "Turning on three transmit foci instead of one will:", choices: ["Improve lateral resolution and improve temporal resolution", "Improve lateral resolution and worsen temporal resolution", "Improve axial resolution and worsen lateral resolution", "Leave all resolutions unchanged"], answer: 1, explain: "Extra foci keep the beam narrow over more depths (better lateral) but require several pulses per line, cutting frame rate to roughly a third (worse temporal). Axial resolution is untouched because the pulse length is unchanged.", objectives: ["u07-o5"], lesson: "u07-l6", level: 3 },
    { id: "u07-q19", type: "short", q: "What is the general name for narrowing the beam so that lateral resolution improves?", answer: "focusing", accept: ["focusing", "focussing", "focus", "beam focusing"], explain: "Focusing — external lens, internal curved element, or electronic phasing — narrows the beam at a chosen depth. Damping shortens the pulse instead, which is axial.", objectives: ["u07-o5"], lesson: "u07-l6", level: 2 },
    { id: "u07-q20", type: "mc", q: "On receive, the system uses more elements for deeper echoes than for shallow ones. This is called:", choices: ["Dynamic aperture", "Apodization", "Compression", "Rejection"], answer: 0, explain: "Dynamic aperture grows the active element group with depth to hold the beam narrow. Apodization is the related but different trick of varying element voltages to suppress side lobes.", objectives: ["u07-o5"], lesson: "u07-l6", level: 2 },
    { id: "u07-q21", type: "mc", q: "Elevational resolution is determined mainly by:", choices: ["The number of cycles in the pulse", "The height of the elements and the fixed acoustic lens", "The pulse repetition frequency", "The receiver gain setting"], answer: 1, explain: "Slice thickness comes from the element height plus the lens bonded to the probe face. Cycles per pulse determines axial resolution, and PRF relates to depth and frame rate.", objectives: ["u07-o6"], lesson: "u07-l7", level: 1 },
    { id: "u07-q22", type: "short", q: "Elevational resolution is more commonly called what two-word image property?", answer: "slice thickness", accept: ["slice thickness", "section thickness", "slice-thickness"], explain: "Slice (section) thickness — the thickness of the slab of sound that gets squashed into the flat image. Beam width would be lateral resolution instead.", objectives: ["u07-o6"], lesson: "u07-l7", level: 1 },
    { id: "u07-q23", type: "mc", q: "A small cyst appears to contain low-level internal echoes even though it is truly fluid-filled. The most likely resolution problem is:", choices: ["Poor axial resolution", "Poor temporal resolution", "Poor elevational resolution", "Poor contrast resolution from too low a dynamic range"], answer: 2, explain: "The slab of sound is thicker than the cyst, so tissue beside the cyst is averaged into it — the slice-thickness artifact. Poor axial resolution would smear structures along the beam rather than fill a cyst.", objectives: ["u07-o6"], lesson: "u07-l7", level: 3 },
    { id: "u07-q24", type: "tf", q: "A 1.5D array improves elevational resolution by adding extra rows of elements that can be focused electronically.", answer: true, explain: "The extra rows let the system apply delays in the elevational plane, so slice thickness is controlled at more than the single fixed lens depth. A standard 1D array has no such control.", objectives: ["u07-o6"], lesson: "u07-l7", level: 2 },
    { id: "u07-q25", type: "mc", q: "Which change raises the frame rate?", choices: ["Increasing imaging depth", "Widening the sector", "Increasing line density", "Reducing imaging depth"], answer: 3, explain: "Shallower imaging means less waiting per line (13 µs per cm), so frames finish sooner. Deeper images, wider sectors and denser lines all add pulses or waiting time and slow the frame rate.", objectives: ["u07-o7"], lesson: "u07-l8", level: 2 },
    { id: "u07-q26", type: "mc", q: "An image is 8 cm deep with 200 lines per frame and one focus. The frame rate is closest to:", choices: ["12 frames/s", "24 frames/s", "48 frames/s", "96 frames/s"], answer: 2, explain: "Frame time = 13 µs × 8 × 200 = 20,800 µs ≈ 0.0208 s, so the frame rate ≈ 48/s. Answering 24 usually means the depth was doubled for the round trip, but the 13 µs already includes the trip out and back.", objectives: ["u07-o7"], lesson: "u07-l8", level: 3 },
    { id: "u07-q27", type: "short", q: "Temporal resolution is measured by what image property?", answer: "frame rate", accept: ["frame rate", "framerate", "frames per second", "fps"], explain: "Frame rate in frames per second — and here a bigger number is better, unlike the millimeter resolutions. Frame time is the reciprocal and is also acceptable reasoning, but the property named is frame rate.", objectives: ["u07-o7"], lesson: "u07-l8", level: 1 },
    { id: "u07-q28", type: "mc", q: "What physically limits how fast a frame can be built?", choices: ["The speed of sound in tissue", "The speed of the computer's processor", "The transducer's frequency", "The receiver gain"], answer: 0, explain: "The system must wait about 13 µs per cm for each line's echoes to come back before firing the next line, so the speed of sound caps everything. Processor speed is not the bottleneck, and frequency does not change the round-trip time.", objectives: ["u07-o7"], lesson: "u07-l8", level: 2 },
    { id: "u07-q29", type: "mc", q: "Contrast resolution is the ability to:", choices: ["Separate two reflectors along the beam", "Distinguish structures with slightly different shades of gray", "Display rapid motion smoothly", "Separate two reflectors across the beam"], answer: 1, explain: "Contrast resolution is about gray-shade differences, not millimeters. The along-the-beam and across-the-beam options are axial and lateral resolution.", objectives: ["u07-o8"], lesson: "u07-l9", level: 1 },
    { id: "u07-q30", type: "short", q: "Which receiver function, by setting the number of displayed gray shades, most directly changes contrast resolution?", answer: "compression", accept: ["compression", "dynamic range", "compression/dynamic range", "dynamic range setting"], explain: "Compression sets the dynamic range — how many shades of gray are shown. Amplification changes brightness uniformly and does not alter the gray-shade spread.", objectives: ["u07-o8"], lesson: "u07-l9", level: 1 },
    { id: "u07-q31", type: "mc", q: "Reducing the dynamic range of a displayed image will:", choices: ["Produce more shades of gray and a softer image", "Produce fewer shades of gray and a higher-contrast image", "Improve axial resolution", "Increase the frame rate"], answer: 1, explain: "Lower dynamic range compresses echoes into fewer shades, so the image looks more black-and-white and higher contrast. It has no effect on pulse length or frame timing, so axial and temporal resolution are unchanged.", objectives: ["u07-o8"], lesson: "u07-l9", level: 2 },
    { id: "u07-q32", type: "tf", q: "Tissue harmonic imaging and spatial compounding both tend to improve contrast resolution.", answer: true, explain: "Harmonics cut clutter and artifact from the near field, and compounding averages several look angles to reduce speckle; both make similar gray shades easier to tell apart.", objectives: ["u07-o8"], lesson: "u07-l9", level: 2 },
    { id: "u07-q33", type: "mc", q: "For a given imaging system, which statement about the numbers is normally true?", choices: ["Lateral resolution is a smaller number than axial resolution", "Axial resolution is a smaller number than lateral resolution", "They are always equal", "Elevational is always the smallest number"], answer: 1, explain: "Axial is the best (smallest) spatial resolution, typically 2–10 times smaller than lateral; elevational is usually the worst. Getting axial and lateral backwards is the most common error on comparison questions.", objectives: ["u07-o9"], lesson: "u07-l1", level: 2 },
    { id: "u07-q34", type: "mc", q: "A sonographer is imaging a fast-moving fetal heart and the image looks jerky. Which combination best preserves the motion?", choices: ["Increase depth, widen the sector, add two more foci", "Reduce depth, narrow the sector, use one focus", "Increase line density and add foci", "Raise the gain and the dynamic range"], answer: 1, explain: "Shallower depth, fewer lines and a single focus all shorten the frame time, raising the frame rate. Adding foci or line density buys lateral detail at the direct expense of the motion you are trying to capture, and gain changes only brightness.", objectives: ["u07-o9"], lesson: "u07-l8", level: 3 },
    { id: "u07-q35", type: "short", q: "Which resolution gets worse when you add more transmit foci?", answer: "temporal", accept: ["temporal", "temporal resolution", "temporal res"], explain: "Each extra focus means another pulse down every line, so frame rate falls. Lateral resolution is the one that improves; axial is unaffected.", objectives: ["u07-o9"], lesson: "u07-l6", level: 2 },
    { id: "u07-q36", type: "mc", q: "A sonographer switches from a 3 MHz to a 9 MHz probe on a superficial structure. Which set of changes is correct?", choices: ["Axial better, lateral better, penetration worse", "Axial better, lateral worse, penetration better", "Axial worse, lateral better, penetration worse", "Axial better, lateral better, penetration better"], answer: 0, explain: "Higher frequency shortens the pulse (better axial) and reduces beam divergence (better lateral), but attenuation rises about 0.5 dB/cm/MHz, so penetration drops. No setting improves detail and penetration at the same time.", objectives: ["u07-o9"], lesson: "u07-l4", level: 3 }
  ],

  drills: [
    {
      id: "u07-d1", title: "Axial resolution from cycles and wavelength", formula: "Axial res = (cycles × λ) ÷ 2", lesson: "u07-l3",
      gen: function (rnd) {
        var n = [2, 3, 4, 5][Math.floor(rnd() * 4)];
        var lam = [0.15, 0.2, 0.25, 0.3, 0.4, 0.5][Math.floor(rnd() * 6)];
        var spl = n * lam;
        var ar = spl / 2;
        return {
          kind: "number",
          given: "A pulse contains " + n + " cycles and the wavelength is " + lam + " mm.",
          ask: "What is the axial resolution, in mm?",
          answer: +ar.toFixed(4), unit: "mm", tol: 0.011,
          steps: [
            "SPL = cycles × wavelength = " + n + " × " + lam + " = " + spl.toFixed(3) + " mm",
            "Axial resolution = SPL ÷ 2",
            "= " + spl.toFixed(3) + " ÷ 2 = " + ar.toFixed(3) + " mm"
          ]
        };
      }
    },
    {
      id: "u07-d2", title: "Axial resolution from frequency and cycles", formula: "λ = 1.54 ÷ f; axial res = (n × λ) ÷ 2", lesson: "u07-l3",
      gen: function (rnd) {
        var f = [2, 2.5, 3, 5, 7.5, 10, 12][Math.floor(rnd() * 7)];
        var n = [2, 3, 4][Math.floor(rnd() * 3)];
        var lam = 1.54 / f;
        var ar = n * lam / 2;
        return {
          kind: "number",
          given: "A " + f + " MHz transducer sends pulses of " + n + " cycles into soft tissue.",
          ask: "What is the axial resolution, in mm?",
          answer: +ar.toFixed(4), unit: "mm", tol: 0.015,
          steps: [
            "λ = 1.54 ÷ f = 1.54 ÷ " + f + " = " + lam.toFixed(3) + " mm",
            "SPL = " + n + " × " + lam.toFixed(3) + " = " + (n * lam).toFixed(3) + " mm",
            "Axial resolution = SPL ÷ 2 = " + ar.toFixed(3) + " mm",
            "Shortcut: 0.77 × " + n + " ÷ " + f + " = " + ar.toFixed(3) + " mm"
          ]
        };
      }
    },
    {
      id: "u07-d3", title: "Which probe has better axial resolution?", formula: "Axial res = 0.77 × cycles ÷ f (MHz)", lesson: "u07-l3",
      gen: function (rnd) {
        var fA = [2, 3, 4, 5][Math.floor(rnd() * 4)];
        var fB = [6, 7.5, 9, 10, 12][Math.floor(rnd() * 5)];
        var nA = [2, 3, 4][Math.floor(rnd() * 3)];
        var nB = [2, 3, 4, 5, 6][Math.floor(rnd() * 5)];
        var arA = 0.77 * nA / fA;
        var arB = 0.77 * nB / fB;
        if (Math.abs(arA - arB) < 0.005) { nB = nB + 2; arB = 0.77 * nB / fB; }
        var better = arA < arB ? 0 : 1;
        return {
          kind: "choice",
          given: "Probe A: " + fA + " MHz, " + nA + " cycles per pulse. Probe B: " + fB + " MHz, " + nB + " cycles per pulse.",
          ask: "Which probe has the better (smaller) axial resolution?",
          choices: ["Probe A", "Probe B", "They are identical"],
          answer: better,
          steps: [
            "Axial res = 0.77 × cycles ÷ frequency",
            "A: 0.77 × " + nA + " ÷ " + fA + " = " + arA.toFixed(3) + " mm",
            "B: 0.77 × " + nB + " ÷ " + fB + " = " + arB.toFixed(3) + " mm",
            "Smaller number wins: Probe " + (better === 0 ? "A" : "B")
          ]
        };
      }
    },
    {
      id: "u07-d4", title: "Lateral resolution: resolved or merged?", formula: "Lateral res = beam width", lesson: "u07-l5",
      gen: function (rnd) {
        var bw = [0.5, 1, 1.5, 2, 3, 4][Math.floor(rnd() * 6)];
        var gap = [0.3, 0.8, 1.2, 1.8, 2.5, 3.5, 5][Math.floor(rnd() * 7)];
        if (gap === bw) { gap = gap + 0.5; }
        var two = gap > bw;
        return {
          kind: "choice",
          given: "At this depth the beam is " + bw + " mm wide. Two reflectors sit side by side, " + gap + " mm apart.",
          ask: "How are they displayed?",
          choices: ["As two separate dots", "As one merged dot"],
          answer: two ? 0 : 1,
          steps: [
            "Lateral resolution = beam width = " + bw + " mm",
            "Separation " + gap + " mm is " + (two ? "greater" : "less") + " than the beam width",
            two ? "Both are never inside the beam at once → two dots" : "Both sit inside the beam at once → one blob"
          ]
        };
      }
    },
    {
      id: "u07-d5", title: "What happens when I change this?", formula: "↑ f → ↓ λ → ↓ SPL → better axial res", lesson: "u07-l4",
      gen: function (rnd) {
        var cases = [
          { g: "The sonographer switches to a higher-frequency transducer.", a: "What happens to AXIAL resolution?", c: ["Improves (smaller number)", "Worsens (larger number)", "Unchanged"], k: 0, s: ["↑ frequency → ↓ wavelength", "↓ wavelength → ↓ spatial pulse length", "Axial res = SPL ÷ 2, so the number gets smaller = better"] },
          { g: "The sonographer switches to a higher-frequency transducer.", a: "What happens to PENETRATION?", c: ["Improves", "Worsens", "Unchanged"], k: 1, s: ["Attenuation ≈ 0.5 dB per cm per MHz", "Higher frequency → more attenuation", "Echoes from deep structures fade → less penetration"] },
          { g: "The manufacturer adds more damping material behind the crystal.", a: "What happens to the number of cycles per pulse and to axial resolution?", c: ["Fewer cycles, better axial resolution", "More cycles, better axial resolution", "Fewer cycles, worse axial resolution"], k: 0, s: ["Damping kills the ringing sooner", "Fewer cycles → shorter SPL", "Axial res = SPL ÷ 2 → smaller number = better"] },
          { g: "The sonographer moves the transmit focus to the depth of a lesion.", a: "What happens to LATERAL resolution at the lesion?", c: ["Improves", "Worsens", "Unchanged"], k: 0, s: ["The beam is narrowest at the focus", "Lateral resolution = beam width", "Narrower beam at that depth → better lateral resolution"] },
          { g: "The sonographer moves the transmit focus to the depth of a lesion.", a: "What happens to AXIAL resolution?", c: ["Improves", "Worsens", "Unchanged"], k: 2, s: ["Focusing changes beam width, not pulse length", "Axial resolution depends only on SPL", "So it is unchanged"] },
          { g: "The sonographer turns on three transmit foci instead of one.", a: "What happens to TEMPORAL resolution?", c: ["Improves", "Worsens", "Unchanged"], k: 1, s: ["Each focus needs its own pulse down every line", "Lines × 3 → frame time × 3", "Frame rate falls to about a third → worse temporal resolution"] },
          { g: "The sonographer reduces the imaging depth from 16 cm to 8 cm.", a: "What happens to the FRAME RATE?", c: ["Roughly doubles", "Roughly halves", "Unchanged"], k: 0, s: ["Frame time = 13 µs × depth × lines", "Half the depth → half the frame time", "Frame rate = 1 ÷ frame time → roughly doubles"] },
          { g: "The sonographer increases the line density.", a: "What happens to lateral detail and to frame rate?", c: ["Better lateral detail, lower frame rate", "Better lateral detail, higher frame rate", "Worse lateral detail, lower frame rate"], k: 0, s: ["More lines sample the anatomy more finely across the image", "But more lines per frame = longer frame time", "Frame rate falls → temporal resolution worsens"] },
          { g: "The sonographer increases the imaging depth.", a: "What happens to AXIAL resolution?", c: ["Improves", "Worsens", "Unchanged"], k: 2, s: ["The pulse does not lengthen as it travels", "Axial res = SPL ÷ 2, and SPL is fixed by the probe", "Unchanged at every depth"] },
          { g: "A 1.5D array replaces a standard 1D array.", a: "Which resolution improves most?", c: ["Elevational (slice thickness)", "Axial", "Temporal"], k: 0, s: ["Extra element rows allow delays in the elevational plane", "Slice thickness can be focused at more than one depth", "So elevational resolution improves"] }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return { kind: "choice", given: c.g, ask: c.a, choices: c.c, answer: c.k, steps: c.s };
      }
    },
    {
      id: "u07-d6", title: "Work backwards: wavelength from axial resolution", formula: "λ = (2 × axial res) ÷ cycles", lesson: "u07-l3",
      gen: function (rnd) {
        var n = [2, 3, 4][Math.floor(rnd() * 3)];
        var lam = [0.15, 0.2, 0.25, 0.3, 0.4, 0.5][Math.floor(rnd() * 6)];
        var ar = n * lam / 2;
        return {
          kind: "number",
          given: "A transducer's axial resolution is " + ar.toFixed(3) + " mm and its pulse contains " + n + " cycles.",
          ask: "What is the wavelength, in mm?",
          answer: +lam.toFixed(4), unit: "mm", tol: 0.011,
          steps: [
            "Axial res = (cycles × λ) ÷ 2, so λ = (2 × axial res) ÷ cycles",
            "λ = (2 × " + ar.toFixed(3) + ") ÷ " + n,
            "λ = " + lam.toFixed(3) + " mm"
          ]
        };
      }
    },
    {
      id: "u07-d7", title: "Frame rate from depth and lines", formula: "Frame time = 13 µs × depth × lines; FR = 1 ÷ frame time", lesson: "u07-l8",
      gen: function (rnd) {
        var d = [4, 6, 8, 10, 12, 15, 18, 20][Math.floor(rnd() * 8)];
        var L = [64, 96, 120, 128, 160, 200, 256][Math.floor(rnd() * 7)];
        var ft = 13e-6 * d * L;
        var fr = 1 / ft;
        return {
          kind: "number",
          given: "Imaging depth " + d + " cm, " + L + " lines per frame, one transmit focus.",
          ask: "What is the frame rate, in frames per second?",
          answer: +fr.toFixed(2), unit: "frames/s", tol: Math.max(1, fr * 0.02),
          steps: [
            "Frame time = 13 µs × depth × lines = 13 × " + d + " × " + L + " = " + (ft * 1e6).toFixed(0) + " µs",
            "= " + ft.toFixed(5) + " s",
            "Frame rate = 1 ÷ frame time = " + fr.toFixed(1) + " frames/s",
            "Shortcut: 77,000 ÷ (" + d + " × " + L + ") ≈ " + (77000 / (d * L)).toFixed(1)
          ]
        };
      }
    },
    {
      id: "u07-d8", title: "Elevational and temporal resolution", formula: "elevational resolution = slice thickness; temporal resolution = frame time", lesson: "u07-l7",
      gen: function (rnd) {
        var elev = rnd() < 0.5;
        var v = [0.5, 1, 1.5, 2, 2.5, 3][Math.floor(rnd() * 6)];
        return elev ? { kind: "number", given: "Slice thickness at the target is " + v + " mm.", ask: "What is elevational resolution, in mm?", answer: v, unit: "mm", tol: 0.01, steps: ["Elevational resolution equals slice thickness", "= " + v + " mm"] } : { kind: "number", given: "Frame rate = " + (v * 10) + " frames/s.", ask: "What is frame time (temporal resolution), in ms?", answer: +(1000 / (v * 10)).toFixed(3), unit: "ms", tol: 0.05, steps: ["Frame time = 1 ÷ frame rate", "= 1 ÷ " + (v * 10) + " s", "= " + (1000 / (v * 10)).toFixed(2) + " ms"] };
      }
    }
  ],

  whiteboard: [
    {
      id: "u07-w1", prompt: "Brain-dump everything about AXIAL resolution: all five names, the formula, the units, typical values, what makes it better, what it costs, and whether it changes with depth.",
      keyPoints: [
        "LARRD: longitudinal, axial, range, radial, depth",
        "Ability to separate two reflectors one behind the other along the beam",
        "Axial resolution = SPL ÷ 2, in mm",
        "SPL = number of cycles × wavelength",
        "Shortcut: 0.77 × cycles ÷ f (MHz)",
        "Smaller number is better; typical 0.05–0.5 mm",
        "Improved by higher frequency (shorter λ)",
        "Improved by more damping (fewer cycles, 2–3 per pulse)",
        "Cost of high frequency: less penetration (≈0.5 dB/cm/MHz)",
        "Cost of damping: less sensitivity, wider bandwidth, lower Q",
        "Same at ALL depths",
        "Determined by the transducer, not by an operator knob"
      ], minutes: 6, lesson: "u07-l2"
    },
    {
      id: "u07-w2", prompt: "Draw the hourglass beam. Mark the near zone, focus and far zone, and write beside it everything about LATERAL resolution: names, what it equals, where it is best, how to improve it and the cost of each fix.",
      keyPoints: [
        "LATA: lateral, angular, transverse, azimuthal",
        "Ability to separate two reflectors side by side at the same depth",
        "Lateral resolution = beam width at that depth, in mm",
        "Best (narrowest) at the focus; worse in near zone and far zone",
        "Changes with depth — unlike axial",
        "Typical 0.3–3 mm; 2–10× worse than axial",
        "Improve: place the focus at the structure",
        "Improve: multiple transmit foci — cost is frame rate",
        "Improve: higher frequency (less divergence) — cost is penetration",
        "Improve: dynamic aperture on receive",
        "Never better than axial resolution"
      ], minutes: 6, lesson: "u07-l5"
    },
    {
      id: "u07-w3", prompt: "Write the frame-rate equation from memory and then list every way to raise the frame rate, what each one costs, and what counts as 'real time'.",
      keyPoints: [
        "Temporal resolution = frame rate, in frames per second; bigger is better",
        "Temporal resolution = frame time = 1 ÷ frame rate",
        "Frame time = 13 µs × depth (cm) × lines per frame",
        "Multiply lines by the number of transmit foci",
        "Frame rate ≈ 77,000 ÷ (depth × lines)",
        "Raise it: shallower depth — cost is less anatomy shown",
        "Raise it: narrower sector — cost is smaller field of view",
        "Raise it: lower line density — cost is coarser lateral detail",
        "Raise it: single focus — cost is lateral resolution away from that depth",
        "Limited by the speed of sound (must wait for echoes)",
        "Real time is roughly 15–20 frames/s or more",
        "Dumb saying: deep, wide, dense, many = molasses"
      ], minutes: 6, lesson: "u07-l8"
    },
    {
      id: "u07-w4", prompt: "Make a four-column table on the board: axial, lateral, elevational, temporal. For each, write what it equals, its units, typical values, how to improve it and the price. Then add contrast resolution underneath.",
      keyPoints: [
        "Axial = SPL ÷ 2, mm, 0.05–0.5 mm, best of the spatial three",
        "Lateral = beam width, mm, 0.3–3 mm, best at focus",
        "Elevational = slice thickness, mm, usually the worst",
        "Temporal = frame rate, frames/s, bigger is better, ≥15–20 fps for real time",
        "Axial improved by ↑frequency and ↑damping; costs penetration and sensitivity",
        "Lateral improved by focusing, ↑frequency, more foci; costs frame rate and penetration",
        "Elevational set by element height and fixed lens; improved by 1.5D and 2D arrays",
        "Temporal improved by ↓depth, ↓lines, ↓sector width, 1 focus",
        "Contrast resolution = distinguishing similar gray shades",
        "Contrast improved by compression/dynamic range, post-processing, harmonics, spatial compounding, more bits per pixel",
        "Axial resolution does not change with depth; lateral does",
        "Every improvement is paid for somewhere else"
      ], minutes: 8, lesson: "u07-l9"
    }
  ]
});
