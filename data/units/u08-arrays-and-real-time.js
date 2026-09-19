window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u08",
  order: 8,
  title: "Transducer Arrays & Real-Time Imaging",
  icon: "🎛️",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Transducer arrays and real-time imaging chapters",
  blurb: "How a probe with no moving parts sweeps a beam across the body: rows of tiny elements fired with microsecond delays that steer and focus the sound electronically. This unit gives you each array type, the image shape it draws, the receive-side tricks, the frame-rate arithmetic, and the lobes that make artifacts.",

  objectives: [
    { id: "u08-o1", text: "Compare mechanical and electronic (array) transducers: how each one steers and focuses the beam, the image shape produced, and the advantages of arrays." },
    { id: "u08-o2", text: "Describe the linear sequential (switched) array: how groups of elements are fired, the image shape, and how it is focused." },
    { id: "u08-o3", text: "Describe the linear phased array: how every element is fired with delays, how it steers and focuses, its footprint, image shape and clinical use." },
    { id: "u08-o4", text: "Explain how a pattern of transmit time delays steers the beam (sloped delays) and focuses it (curved delays), and predict the beam direction from a delay pattern." },
    { id: "u08-o5", text: "Describe receive beamforming: channel summation, dynamic receive focusing, dynamic aperture and apodization, and state what each one improves." },
    { id: "u08-o6", text: "Identify convex/curvilinear, vector, annular phased, 1.5D and 2D arrays from their element layout, steering method and image shape." },
    { id: "u08-o7", text: "Calculate frame time, frame rate, maximum imaging depth and maximum number of lines using 13 µs per cm, lines per frame and the number of transmit foci." },
    { id: "u08-o8", text: "List the operator choices that trade temporal resolution against spatial resolution and field of view, and predict the effect of each one." },
    { id: "u08-o9", text: "Distinguish side lobes from grating lobes: what creates each, the artifact each causes, and how apodization and subdicing reduce them." }
  ],

  lessons: [
    {
      id: "u08-l1",
      title: "Moving the beam: mechanical versus electronic",
      objectives: ["u08-o1"],
      html: `<p class="lead">To make a moving picture you must sweep the beam across the anatomy — old probes did it with a motor, modern probes do it with timing.</p>
<p>The first real-time probes were <span class="kw">mechanical transducers</span>: one round disc-shaped element that a little motor wobbled or spun behind an oil-filled cap. The element itself physically pointed in different directions, sweeping out a pie-shaped <b>sector</b> image. It focused with a fixed lens or a curved element, so the focus sat at <b>one depth only</b> and the operator could not move it. Moving parts wear out, and you cannot do Doppler nicely with a swinging crystal, so these are now obsolete.</p>
<p>An <span class="kw">array</span> replaces the one big element with a row of many skinny ones — typically 64 to 512 of them — each with its own wire, its own pulser and its own receive <span class="kw-2">channel</span>. Nothing moves. The beam is aimed and shaped by choosing <b>which elements fire and exactly when</b>, in delays measured in nanoseconds to a few microseconds.</p>
<table class="dt">
<tr><th></th><th>Mechanical</th><th>Array (electronic)</th></tr>
<tr><td>Beam steering</td><td>motor moves the crystal</td><td>timing of element firing</td></tr>
<tr><td>Focus</td><td>fixed, one depth</td><td>electronic, adjustable, multiple depths</td></tr>
<tr><td>Moving parts</td><td>yes</td><td>none</td></tr>
<tr><td>Image shape</td><td>sector</td><td>rectangle, sector, blunted sector or trapezoid</td></tr>
</table>
<div class="callout key">Arrays win because <b>focus becomes a setting instead of a shape</b>. Electronic focusing can be changed during the exam, placed at several depths, and adjusted continuously on receive.</div>
<div class="callout tip">Two words to keep straight all unit long: <b>steering</b> = which direction the beam points; <b>focusing</b> = how narrow it gets at a chosen depth. Both come from delays, but from different delay <i>patterns</i>.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A mechanical probe swings one crystal to make a sector; an array fires many elements with delays and nothing moves</title>
<text x="25" y="30" fill="currentColor" font-size="16">MECHANICAL: motor swings one crystal</text>
<rect x="110" y="55" width="60" height="16" fill="var(--muted)"/>
<path d="M140 71 L60 220" fill="none" stroke="var(--c2)"/>
<path d="M140 71 L140 230" fill="none" stroke="var(--c2)"/>
<path d="M140 71 L220 220" fill="none" stroke="var(--c2)"/>
<path d="M75 195 a95 95 0 0 0 130 0" fill="none" stroke="var(--c1)"/>
<text x="75" y="255" fill="currentColor" font-size="16">sector, fixed focus</text>
<text x="330" y="30" fill="currentColor" font-size="16">ARRAY: timing does the work</text>
<rect x="350" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="368" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="386" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="404" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="422" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="440" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="458" y="55" width="12" height="16" fill="var(--c1)"/>
<rect x="476" y="55" width="12" height="16" fill="var(--c1)"/>
<path d="M356 90 L356 230" fill="none" stroke="var(--c3)"/>
<path d="M410 90 L410 230" fill="none" stroke="var(--c3)"/>
<path d="M464 90 L464 230" fill="none" stroke="var(--c3)"/>
<text x="330" y="255" fill="currentColor" font-size="16">no moving parts, focus is a setting</text>
</svg>`, caption: "Mechanical probes move the crystal; arrays move only the timing." }
      ],
      sayIt: "Say out loud: name three advantages an array has over a mechanical transducer, and say what image shape a mechanical probe produced.",
      keyPoints: [
        "Mechanical = one element moved by a motor, fixed focus, sector image, obsolete",
        "Array = many small elements (64–512), each with its own wire and channel",
        "Arrays steer and focus by timing, with no moving parts",
        "Electronic focus can be moved and used at several depths",
        "Steering = direction of the beam; focusing = narrowing the beam"
      ]
    },
    {
      id: "u08-l2",
      title: "The linear sequential (switched) array",
      objectives: ["u08-o2"],
      html: `<p class="lead">A linear sequential array fires a small group of elements at a time and walks that group down the row, drawing a rectangle.</p>
<p>Picture a long line of dominoes, and you tap eight of them at once. Then you slide over one and tap elements 2 through 9, then 3 through 10, and so on to the far end. Each tap sends one pulse straight down, perpendicular to the probe face, and each one becomes one <span class="kw">scan line</span> of the image. Because every line leaves from a different place but points the same direction, the lines are parallel and the picture is a <span class="kw">rectangle</span>.</p>
<p>Notes that get tested:</p>
<ul>
<li>Only a <b>group</b> of elements fires per pulse, not the whole array. The group is the <span class="kw-2">active aperture</span>; typically 8–30 elements.</li>
<li>Names: linear sequential array, linear switched array, or just "linear array." A "sequenced" or "switched" name tells you it is <b>not steered</b>.</li>
<li>Pure sequencing gives <b>no steering</b> — lines can only go straight ahead. Many modern linear probes add small phase delays within each group, which lets them focus electronically and even tilt the edge lines to make a <span class="kw-2">trapezoid</span> (virtual convex) image.</li>
<li>Large footprint, so you need a flat window: vascular, small parts, breast, musculoskeletal.</li>
<li>High frequency is typical (5–15 MHz), because these are superficial studies.</li>
</ul>
<div class="callout key">Linear sequential array = groups of elements fired in turn → parallel lines → rectangular image, wide field even at shallow depth.</div>
<div class="callout warn">Trap: "sequential array" does not mean each single element fires by itself. A group fires together; the group slides. Firing one skinny element alone would give a badly diverging beam.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>Groups of elements fire in turn along a linear array, producing parallel scan lines and a rectangular image</title>
<text x="20" y="28" fill="currentColor" font-size="16">Group fires, then slides over one element</text>
<rect x="40" y="45" width="20" height="18" fill="var(--c1)"/>
<rect x="64" y="45" width="20" height="18" fill="var(--c1)"/>
<rect x="88" y="45" width="20" height="18" fill="var(--c1)"/>
<rect x="112" y="45" width="20" height="18" fill="var(--c1)"/>
<rect x="136" y="45" width="20" height="18" fill="none" stroke="var(--muted)"/>
<rect x="160" y="45" width="20" height="18" fill="none" stroke="var(--muted)"/>
<rect x="184" y="45" width="20" height="18" fill="none" stroke="var(--muted)"/>
<rect x="208" y="45" width="20" height="18" fill="none" stroke="var(--muted)"/>
<text x="245" y="60" fill="currentColor" font-size="16">pulse 1</text>
<rect x="40" y="85" width="20" height="18" fill="none" stroke="var(--muted)"/>
<rect x="64" y="85" width="20" height="18" fill="var(--c2)"/>
<rect x="88" y="85" width="20" height="18" fill="var(--c2)"/>
<rect x="112" y="85" width="20" height="18" fill="var(--c2)"/>
<rect x="136" y="85" width="20" height="18" fill="var(--c2)"/>
<rect x="160" y="85" width="20" height="18" fill="none" stroke="var(--muted)"/>
<rect x="184" y="85" width="20" height="18" fill="none" stroke="var(--muted)"/>
<rect x="208" y="85" width="20" height="18" fill="none" stroke="var(--muted)"/>
<text x="245" y="100" fill="currentColor" font-size="16">pulse 2</text>
<text x="20" y="150" fill="currentColor" font-size="16">Parallel lines = rectangular image</text>
<rect x="60" y="170" width="220" height="110" fill="none" stroke="var(--c3)"/>
<line x1="90" y1="170" x2="90" y2="280" stroke="var(--c3)"/>
<line x1="130" y1="170" x2="130" y2="280" stroke="var(--c3)"/>
<line x1="170" y1="170" x2="170" y2="280" stroke="var(--c3)"/>
<line x1="210" y1="170" x2="210" y2="280" stroke="var(--c3)"/>
<line x1="250" y1="170" x2="250" y2="280" stroke="var(--c3)"/>
<text x="330" y="200" fill="currentColor" font-size="16">large footprint</text>
<text x="330" y="226" fill="currentColor" font-size="16">no steering needed</text>
<text x="330" y="252" fill="currentColor" font-size="16">vascular, small parts</text>
</svg>`, caption: "A sliding group of elements makes parallel lines and a rectangular image." }
      ],
      sayIt: "Say out loud: in a linear sequential array, what fires for each pulse, which way do the lines point, and what shape is the image?",
      keyPoints: [
        "Groups of about 8–30 elements fire together; the group slides down the row",
        "One pulse = one scan line; lines are parallel and perpendicular to the face",
        "Image shape is a rectangle",
        "'Sequential' or 'switched' means not steered",
        "Adding phase delays inside the group allows electronic focusing and a trapezoid mode",
        "Large footprint, usually high frequency: vascular, small parts, MSK"
      ]
    },
    {
      id: "u08-l3",
      title: "Phase delays: sloped to steer, curved to focus",
      objectives: ["u08-o4"],
      html: `<p class="lead">The shape of the delay pattern is the whole trick: a straight slope tilts the beam, an arch focuses it.</p>
<p>Mental picture: a line of swimmers on the edge of a pool. If everyone dives at once, the wave they make travels straight out. If they dive one after another from left to right, the combined wave front is tilted and travels off at an angle. If the ones on the ends dive <b>first</b> and the middle dives <b>last</b>, the wave curls inward and all the energy piles up at one point out in the water.</p>
<p>That is exactly Huygens' principle at work: every element makes its own little wavelet, and the wavelets add up into one wave front whose shape is the mirror image of the delay pattern.</p>
<ul>
<li><span class="kw">Linear (sloped) delays</span> — each element fires a constant bit later than its neighbor → the wave front tilts → the beam is <b>steered</b>. A bigger slope means a bigger steering angle; reverse the slope and it steers the other way.</li>
<li><span class="kw">Curved (arched) delays</span> — outer elements first, centre elements last → a concave wave front that converges → the beam is <b>focused</b>. A deeper curve (bigger spread of delays) puts the focus <b>shallower</b>; a gentler curve puts it deeper.</li>
<li><b>Both together</b> — a curve tipped over to one side steers and focuses at the same time, which is what a phased array does on every single line.</li>
</ul>
<div class="callout key">Delays applied on <b>transmit</b> set the <b>transmit focus</b> — it is chosen before the pulse leaves and cannot be changed for that pulse. That is why multiple focal zones need multiple pulses.</div>
<div class="callout tip">Dumb saying: "<b>Slope to steer, smile to focus</b>" — a sloped delay line aims, a smile-shaped (curved) delay line squeezes.</div>
<div class="callout warn">Delays are tiny: nanoseconds to a few microseconds. They do not change frequency, wavelength or pulse length, so they never change axial resolution.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>Sloped firing delays steer the beam while curved delays focus it</title>
<text x="20" y="28" fill="currentColor" font-size="16">SLOPED delays = STEER</text>
<text x="330" y="28" fill="currentColor" font-size="16">CURVED delays = FOCUS</text>
<line x1="30" y1="60" x2="30" y2="64" stroke="currentColor"/>
<line x1="35" y1="50" x2="35" y2="70" stroke="var(--c2)"/>
<line x1="65" y1="50" x2="65" y2="80" stroke="var(--c2)"/>
<line x1="95" y1="50" x2="95" y2="90" stroke="var(--c2)"/>
<line x1="125" y1="50" x2="125" y2="100" stroke="var(--c2)"/>
<line x1="155" y1="50" x2="155" y2="110" stroke="var(--c2)"/>
<line x1="185" y1="50" x2="185" y2="120" stroke="var(--c2)"/>
<text x="200" y="95" fill="currentColor" font-size="16">delay</text>
<rect x="30" y="140" width="165" height="16" fill="var(--muted)"/>
<path d="M45 175 L215 235" fill="none" stroke="var(--c1)"/>
<path d="M60 250 L230 200" fill="none" stroke="var(--c1)"/>
<text x="95" y="285" fill="currentColor" font-size="16">tilted wave front</text>
<line x1="345" y1="50" x2="345" y2="70" stroke="var(--c3)"/>
<line x1="375" y1="50" x2="375" y2="85" stroke="var(--c3)"/>
<line x1="405" y1="50" x2="405" y2="100" stroke="var(--c3)"/>
<line x1="435" y1="50" x2="435" y2="100" stroke="var(--c3)"/>
<line x1="465" y1="50" x2="465" y2="85" stroke="var(--c3)"/>
<line x1="495" y1="50" x2="495" y2="70" stroke="var(--c3)"/>
<text x="510" y="80" fill="currentColor" font-size="16">ends</text>
<text x="510" y="102" fill="currentColor" font-size="16">first</text>
<rect x="340" y="140" width="160" height="16" fill="var(--muted)"/>
<path d="M345 170 q75 60 150 0" fill="none" stroke="var(--c1)"/>
<path d="M360 195 q60 45 120 0" fill="none" stroke="var(--c1)"/>
<circle cx="420" cy="255" r="6" fill="var(--c4)"/>
<text x="380" y="288" fill="currentColor" font-size="16">focal point</text>
</svg>`, caption: "Slope to steer, smile to focus: the wave front mirrors the delay pattern." }
      ],
      sayIt: "Say out loud: describe the delay pattern that steers the beam to the left, and the delay pattern that focuses it at a shallow depth.",
      keyPoints: [
        "Every element makes a wavelet; the wavelets add into one wave front (Huygens)",
        "Linear/sloped delays tilt the wave front → steering; bigger slope = bigger angle",
        "Curved delays (outer elements first, centre last) → focusing",
        "A deeper delay curve gives a shallower focus",
        "Slope plus curve = steer and focus on the same pulse",
        "Transmit delays set the transmit focus before the pulse leaves — it is fixed for that pulse",
        "Delays are nanoseconds to a few microseconds and never change axial resolution"
      ]
    },
    {
      id: "u08-l4",
      title: "The linear phased array",
      objectives: ["u08-o3"],
      html: `<p class="lead">In a phased array every element fires on every pulse, with a slightly different delay each time — so a probe the size of a postage stamp paints a wide sector.</p>
<p>Instead of sliding a group down the row, the phased array uses <b>the whole array for every line</b> and simply changes the delay pattern between pulses. Pulse one uses a steep slope to the left, pulse two a slightly gentler slope, and so on across to the right. Because all the lines start from essentially the same small spot and fan outward, the image is a <span class="kw">sector</span> — narrow at the top, wide at the bottom.</p>
<p>That small starting spot is the point. A phased array has a tiny <span class="kw-2">footprint</span>, so it fits between ribs or under the costal margin while still showing a wide field down deep. That is why it is the <b>cardiac</b> probe, and why phased-array-style steering is used for adult transcranial and some abdominal work. Typical frequencies are low, 2–5 MHz, because the targets are deep.</p>
<table class="dt">
<tr><th></th><th>Linear sequential</th><th>Linear phased</th></tr>
<tr><td>Elements per pulse</td><td>a group</td><td>all of them</td></tr>
<tr><td>Steering</td><td>none (lines parallel)</td><td>electronic, line by line</td></tr>
<tr><td>Image</td><td>rectangle</td><td>sector</td></tr>
<tr><td>Footprint</td><td>large</td><td>small</td></tr>
<tr><td>Typical use</td><td>vascular, small parts</td><td>cardiac, deep abdomen</td></tr>
</table>
<div class="callout key">Phased array = all elements, every pulse, delays that both steer and focus → sector image from a small footprint.</div>
<div class="callout warn">Do not confuse the two "linears." Both are a straight row of elements; the difference is whether the beam is <b>steered</b>. Sequential = rectangle, phased = sector.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>A phased array fires all elements each pulse with changing delay slopes, fanning the lines into a sector image</title>
<rect x="250" y="40" width="100" height="18" fill="var(--c1)"/>
<line x1="258" y1="40" x2="258" y2="58" stroke="var(--paper)"/>
<line x1="276" y1="40" x2="276" y2="58" stroke="var(--paper)"/>
<line x1="294" y1="40" x2="294" y2="58" stroke="var(--paper)"/>
<line x1="312" y1="40" x2="312" y2="58" stroke="var(--paper)"/>
<line x1="330" y1="40" x2="330" y2="58" stroke="var(--paper)"/>
<text x="365" y="54" fill="currentColor" font-size="16">small footprint</text>
<path d="M300 58 L110 250" fill="none" stroke="var(--c2)"/>
<path d="M300 58 L180 268" fill="none" stroke="var(--c2)"/>
<path d="M300 58 L300 280" fill="none" stroke="var(--c2)"/>
<path d="M300 58 L420 268" fill="none" stroke="var(--c2)"/>
<path d="M300 58 L490 250" fill="none" stroke="var(--c2)"/>
<path d="M135 225 a230 210 0 0 0 330 0" fill="none" stroke="var(--c3)"/>
<text x="235" y="280" fill="currentColor" font-size="16">SECTOR image</text>
<text x="20" y="120" fill="currentColor" font-size="16">every element</text>
<text x="20" y="144" fill="currentColor" font-size="16">fires on every</text>
<text x="20" y="168" fill="currentColor" font-size="16">pulse; only the</text>
<text x="20" y="192" fill="currentColor" font-size="16">delays change</text>
</svg>`, caption: "All elements, every pulse: changing the delay slope fans the lines into a sector." }
      ],
      sayIt: "Say out loud: how many elements fire per pulse in a phased array, what changes between pulses, what shape is the image, and why is it the cardiac probe?",
      keyPoints: [
        "All elements fire on every pulse; the delay pattern changes between pulses",
        "Electronic steering and electronic focusing on the same pulse",
        "Image shape is a sector, narrow at top and wide at the bottom",
        "Small footprint — fits between ribs; cardiac is the classic use",
        "Typically low frequency (2–5 MHz) for deep targets",
        "Sequential = rectangle, phased = sector: the difference is steering"
      ]
    },
    {
      id: "u08-l5",
      title: "Curved, vector and annular arrays — and their image shapes",
      objectives: ["u08-o6"],
      html: `<p class="lead">Once you know the element layout and whether the lines are steered, the image shape falls out automatically.</p>
<p><span class="kw">Convex (curvilinear) array</span> — the same sequenced groups as a linear array, but the row of elements is glued onto a curved face. Each group still fires straight out of the face, and because the face is curved the lines fan apart on their own without any steering. Result: a <span class="kw-2">blunted sector</span> — a sector whose top has been cut off flat-ish and curved. Wide field at depth, moderate footprint, 2–5 MHz: general abdominal and OB.</p>
<p><span class="kw">Vector array</span> — a flat, small array where the lines both <b>start at different elements</b> and are <b>steered</b> at different angles. Starting wide and fanning wider gives a <span class="kw-2">trapezoid / blunted sector</span>: a bit of near-field width like a linear array plus far-field width like a sector. Useful when the window is small but you still want near-field coverage.</p>
<p><span class="kw">Annular phased array</span> — not a row at all: concentric <b>rings</b> around a common centre, like a dartboard. Delaying the outer rings relative to the centre focuses the beam in <b>both</b> planes at once, giving a symmetric, circular beam with genuinely good slice thickness. The catch: rings cannot be steered electronically, so the whole assembly must be <b>moved mechanically</b> to sweep the sector image.</p>
<div class="callout key">Shape cheat sheet: linear sequential → <b>rectangle</b>; phased → <b>sector</b>; convex → <b>blunted sector</b>; vector → <b>trapezoid/blunted sector</b>; annular → <b>sector, steered mechanically</b>.</div>
<div class="callout tip">Dumb saying: "<b>Flat and straight = rectangle; tiny and fanned = sector; curved face = blunt top.</b>"</div>
<div class="callout warn">Annular arrays are the odd one out: electronic focusing, <b>mechanical</b> steering. Every other array in this unit steers electronically.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>Four element layouts and the image shape each one draws</title>
<text x="20" y="26" fill="currentColor" font-size="16">linear</text>
<rect x="20" y="40" width="110" height="12" fill="var(--c1)"/>
<rect x="20" y="70" width="110" height="110" fill="none" stroke="var(--c3)"/>
<text x="24" y="205" fill="currentColor" font-size="16">rectangle</text>
<text x="165" y="26" fill="currentColor" font-size="16">phased</text>
<rect x="190" y="40" width="46" height="12" fill="var(--c1)"/>
<path d="M213 52 L155 180 L271 180 Z" fill="none" stroke="var(--c3)"/>
<text x="160" y="205" fill="currentColor" font-size="16">sector</text>
<text x="315" y="26" fill="currentColor" font-size="16">convex</text>
<path d="M310 52 q55 -22 110 0" fill="none" stroke="var(--c1)"/>
<path d="M310 52 L285 180 L445 180 L420 52" fill="none" stroke="var(--c3)"/>
<text x="300" y="205" fill="currentColor" font-size="16">blunted sector</text>
<text x="480" y="26" fill="currentColor" font-size="16">vector</text>
<rect x="490" y="40" width="50" height="12" fill="var(--c1)"/>
<path d="M490 52 L460 180 L575 180 L540 52" fill="none" stroke="var(--c3)"/>
<text x="470" y="205" fill="currentColor" font-size="16">trapezoid</text>
<text x="20" y="250" fill="currentColor" font-size="16">annular = rings, electronic focus in BOTH planes,</text>
<circle cx="120" cy="275" r="6" fill="none" stroke="var(--c2)"/>
<circle cx="120" cy="275" r="12" fill="none" stroke="var(--c2)"/>
<circle cx="120" cy="275" r="18" fill="none" stroke="var(--c2)"/>
<text x="150" y="281" fill="currentColor" font-size="16">but steered MECHANICALLY (sector)</text>
</svg>`, caption: "Element layout plus steering method equals image shape." }
      ],
      sayIt: "Say out loud: for convex, vector and annular arrays, give the element layout, how it steers, and the image shape.",
      keyPoints: [
        "Convex/curvilinear: sequenced groups on a curved face → blunted sector, no steering needed",
        "Vector: flat small array, lines start at different elements AND are steered → trapezoid/blunted sector",
        "Annular phased: concentric rings, electronic focus in both planes, symmetric beam",
        "Annular arrays must be steered mechanically → sector image",
        "Shapes: rectangle, sector, blunted sector, trapezoid",
        "Convex is the standard abdominal/OB probe at 2–5 MHz"
      ]
    },
    {
      id: "u08-l6",
      title: "1.5D and 2D arrays: fixing the third dimension",
      objectives: ["u08-o6"],
      html: `<p class="lead">An ordinary array is one row of elements, so it can only shape the beam in the scan plane — the slice thickness is left to a lump of plastic.</p>
<p>Hold a comb flat: you can fan the teeth left and right, but you cannot do anything about how tall they are. A standard <span class="kw">1D array</span> is that comb. It steers and focuses beautifully in the imaging plane and relies on a <b>fixed acoustic lens</b> for the elevational plane, so slice thickness is set in the factory and is thinnest at one depth only.</p>
<p><span class="kw">1.5D array</span> — a few rows (typically 3 to 7) stacked in the elevational direction. It is not a full grid, so it cannot steer out of the plane, but delays across the rows let the system <b>focus electronically in the elevational plane</b>, at more than one depth. Slice thickness improves, slice-thickness artifact drops, and the wiring count climbs sharply. Some texts call a version of this a 1.25D or 1.75D array depending on how much control the rows have.</p>
<p><span class="kw">2D (matrix) array</span> — a full grid of thousands of tiny elements. Now delays can steer <b>and</b> focus in both planes, so the machine can sweep a whole pyramid of sound and build a volume. This is what makes real <b>3D and 4D (real-time 3D)</b> imaging, and it can also produce two live perpendicular planes at once. The costs are element count, wiring, processing and price.</p>
<div class="callout key">1D = focus in the scan plane only, fixed lens elevationally. 1.5D = electronic focus in both planes, steering in one. 2D = steering and focusing in both planes → 3D/4D volumes.</div>
<div class="callout tip">Dumb saying: "<b>One row sees a slice, more rows slim the slice, a grid sees a volume.</b>"</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>One row of tall elements, a few rows for elevational focusing, and a full grid for volume imaging</title>
<text x="30" y="30" fill="currentColor" font-size="16">1D</text>
<rect x="30" y="45" width="14" height="70" fill="none" stroke="var(--c1)"/>
<rect x="48" y="45" width="14" height="70" fill="none" stroke="var(--c1)"/>
<rect x="66" y="45" width="14" height="70" fill="none" stroke="var(--c1)"/>
<rect x="84" y="45" width="14" height="70" fill="none" stroke="var(--c1)"/>
<rect x="102" y="45" width="14" height="70" fill="none" stroke="var(--c1)"/>
<text x="25" y="145" fill="currentColor" font-size="16">fixed lens</text>
<text x="25" y="169" fill="currentColor" font-size="16">sets slice</text>
<text x="240" y="30" fill="currentColor" font-size="16">1.5D</text>
<rect x="240" y="45" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="240" y="70" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="240" y="95" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="258" y="45" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="258" y="70" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="258" y="95" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="276" y="45" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="276" y="70" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="276" y="95" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="294" y="45" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="294" y="70" width="14" height="22" fill="none" stroke="var(--c2)"/>
<rect x="294" y="95" width="14" height="22" fill="none" stroke="var(--c2)"/>
<text x="235" y="145" fill="currentColor" font-size="16">electronic</text>
<text x="235" y="169" fill="currentColor" font-size="16">slice focus</text>
<text x="450" y="30" fill="currentColor" font-size="16">2D matrix</text>
<rect x="450" y="45" width="72" height="72" fill="none" stroke="var(--c3)"/>
<line x1="468" y1="45" x2="468" y2="117" stroke="var(--c3)"/>
<line x1="486" y1="45" x2="486" y2="117" stroke="var(--c3)"/>
<line x1="504" y1="45" x2="504" y2="117" stroke="var(--c3)"/>
<line x1="450" y1="63" x2="522" y2="63" stroke="var(--c3)"/>
<line x1="450" y1="81" x2="522" y2="81" stroke="var(--c3)"/>
<line x1="450" y1="99" x2="522" y2="99" stroke="var(--c3)"/>
<text x="445" y="145" fill="currentColor" font-size="16">steers both</text>
<text x="445" y="169" fill="currentColor" font-size="16">planes: 3D/4D</text>
<text x="30" y="225" fill="currentColor" font-size="16">One row sees a slice - more rows slim the slice - a grid sees a volume</text>
</svg>`, caption: "Adding rows of elements buys control of the elevational plane." }
      ],
      sayIt: "Say out loud: what is the difference between a 1D, 1.5D and 2D array, and which resolution does each one improve?",
      keyPoints: [
        "1D array: one row, fixed lens elevationally, slice thickness set at the factory",
        "1.5D array: 3–7 rows, electronic focusing in the elevational plane, better slice thickness",
        "1.5D cannot steer out of the imaging plane",
        "2D matrix array: full grid, steers and focuses in both planes",
        "2D arrays give real 3D/4D volume imaging and biplane views",
        "Cost of more rows: many more wires, channels and money"
      ]
    },
    {
      id: "u08-l7",
      title: "Listening smart: receive beamforming",
      objectives: ["u08-o5"],
      html: `<p class="lead">Transmit is a one-shot decision; receive is a live performance, and that is where most of the beam quality comes from.</p>
<p>When echoes come back, every element hears the same echo at a slightly different moment because each one sits at a different distance from the reflector. The <span class="kw">beamformer</span> delays each element's signal by just the right amount so all the copies line up, then <b>sums the channels</b> into one line signal. Wrongly timed, they cancel; correctly timed, they reinforce.</p>
<p>Because the machine can change those receive delays continuously as the echoes stream in, it gets tricks transmit can never have:</p>
<ul>
<li><span class="kw">Dynamic receive focusing</span> — the receive focus follows the echoes down through the body, so effectively every depth is in focus on receive. Sometimes called continuous dynamic focusing. It costs nothing in frame rate, unlike transmit foci.</li>
<li><span class="kw">Dynamic aperture</span> — few elements are listening for shallow echoes and more elements switch in as deeper echoes arrive. This keeps the ratio of aperture to depth roughly constant, so the beam stays narrow instead of getting sloppy with depth.</li>
<li><span class="kw">Apodization</span> — the outer elements are driven with lower voltage on transmit (or weighted less on receive) than the centre ones. Tapering the edges suppresses <b>side lobes and grating lobes</b>, cutting the false echoes they throw into the image. The trade is a slightly wider main beam.</li>
</ul>
<div class="callout key">Transmit focus = chosen before the pulse, costs frame rate to have more than one. Receive focus = continuously updated, free. Apodization = edge elements turned down to kill lobes.</div>
<div class="callout warn">Don't mix up dynamic <b>aperture</b> (how many elements are listening) with dynamic <b>focusing</b> (the delay pattern used). They work together but are different answers.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>On receive the aperture widens and the focus follows the echoes deeper</title>
<text x="20" y="28" fill="currentColor" font-size="16">Shallow echo: few elements listening</text>
<rect x="250" y="45" width="100" height="14" fill="none" stroke="var(--muted)"/>
<rect x="286" y="45" width="28" height="14" fill="var(--c1)"/>
<path d="M286 59 L300 110 L314 59" fill="none" stroke="var(--c1)"/>
<circle cx="300" cy="115" r="5" fill="var(--c4)"/>
<text x="330" y="112" fill="currentColor" font-size="16">focus here first</text>
<text x="20" y="168" fill="currentColor" font-size="16">Deeper echo: more elements listening</text>
<rect x="250" y="185" width="100" height="14" fill="none" stroke="var(--muted)"/>
<rect x="258" y="185" width="84" height="14" fill="var(--c3)"/>
<path d="M258 199 L300 270 L342 199" fill="none" stroke="var(--c3)"/>
<circle cx="300" cy="275" r="5" fill="var(--c4)"/>
<text x="360" y="272" fill="currentColor" font-size="16">focus follows down</text>
<text x="20" y="232" fill="currentColor" font-size="16">= dynamic</text>
<text x="20" y="256" fill="currentColor" font-size="16">aperture +</text>
<text x="20" y="280" fill="currentColor" font-size="16">dynamic focus</text>
</svg>`, caption: "Receive focusing and aperture update continuously as echoes arrive — no frame-rate cost." }
      ],
      sayIt: "Say out loud: what does the beamformer do with the signals from each element, and name three receive-side tricks and what each improves.",
      keyPoints: [
        "Each element hears the echo at a slightly different time; the beamformer delays and sums the channels",
        "Dynamic receive focusing: the focus follows echoes down, every depth focused on receive, free",
        "Dynamic aperture: more elements switch in for deeper echoes to keep the beam narrow",
        "Apodization: outer elements driven/weighted lower to suppress side and grating lobes",
        "Apodization slightly widens the main beam",
        "Only transmit foci cost frame rate"
      ]
    },
    {
      id: "u08-l8",
      title: "Frame-rate arithmetic",
      objectives: ["u08-o7"],
      html: `<p class="lead">One pulse per line, and every pulse must wait for its echoes — so depth and line count multiply straight into frame time.</p>
<p>Sound in soft tissue covers 1 cm and comes back in about <b>13 µs</b>. If your image is 10 cm deep, each line costs 130 µs of waiting before the next pulse may be fired. Multiply that by the number of lines and you have the time to build one frame:</p>
<div class="formula">Frame time = 13 µs × depth (cm) × lines per frame</div>
<div class="formula">Frame rate = 1 ÷ frame time ≈ 77,000 ÷ [depth (cm) × lines]</div>
<p>Worked example: 12 cm deep, 160 lines. Frame time = 13 × 12 × 160 = 24,960 µs = 0.025 s, so the frame rate is about 40 frames per second. Cut the depth to 6 cm and the frame rate jumps to about 80.</p>
<p>Multiple transmit foci multiply the pulse count, because each focal zone needs its own pulse down each line:</p>
<div class="formula">Frame time = 13 µs × depth × lines × number of foci</div>
<p>So the same 12 cm, 160-line image with 3 foci runs at about 13 frames per second — borderline for anything that moves.</p>
<p>The same equation rearranges to answer "what is the most I can have?":</p>
<div class="formula">Max depth (cm) = 77,000 ÷ (frame rate × lines)</div>
<div class="formula">Max lines = 77,000 ÷ (frame rate × depth)</div>
<div class="callout key">Depth, lines and foci all multiply. Double any one of them and the frame rate halves.</div>
<div class="callout warn">The 13 µs already covers the round trip. Do not double the depth again — that is the most common arithmetic slip in this chapter.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>Frame time is the number of lines times thirteen microseconds per centimetre of depth</title>
<text x="20" y="30" fill="currentColor" font-size="16">One frame = one pulse per line, each waiting for its echoes</text>
<line x1="40" y1="60" x2="40" y2="160" stroke="var(--c1)"/>
<line x1="90" y1="60" x2="90" y2="160" stroke="var(--c1)"/>
<line x1="140" y1="60" x2="140" y2="160" stroke="var(--c1)"/>
<line x1="190" y1="60" x2="190" y2="160" stroke="var(--c1)"/>
<line x1="240" y1="60" x2="240" y2="160" stroke="var(--c1)"/>
<text x="285" y="115" fill="currentColor" font-size="16">... x lines per frame</text>
<line x1="40" y1="60" x2="240" y2="60" stroke="var(--muted)"/>
<line x1="20" y1="60" x2="20" y2="160" stroke="var(--c2)"/>
<text x="20" y="185" fill="currentColor" font-size="16">depth (cm) x 13 us per line</text>
<text x="40" y="225" fill="currentColor" font-size="16">Frame time = 13 us x depth x lines x foci</text>
<text x="40" y="250" fill="currentColor" font-size="16">Frame rate = 1 / frame time</text>
</svg>`, caption: "Every line costs 13 µs per cm of depth; multiply by lines and by foci." }
      ],
      sayIt: "Say out loud, then check: an image 10 cm deep with 200 lines and 2 foci — what is the frame time and the frame rate?",
      keyPoints: [
        "13 µs per cm is the round-trip time in soft tissue",
        "Frame time = 13 µs × depth (cm) × lines per frame × number of foci",
        "Frame rate = 1 ÷ frame time ≈ 77,000 ÷ (depth × lines)",
        "12 cm and 160 lines ≈ 40 frames/s; adding 3 foci drops it to about 13",
        "Max depth = 77,000 ÷ (frame rate × lines)",
        "Max lines = 77,000 ÷ (frame rate × depth)",
        "Never double the depth for the round trip — 13 µs already includes it"
      ]
    },
    {
      id: "u08-l9",
      title: "The real-time trade-off menu",
      objectives: ["u08-o8"],
      html: `<p class="lead">Every knob that makes the picture prettier steals time, and time is frames.</p>
<p>Think of frame rate as a budget of pulses per second that the speed of sound hands you. You can spend those pulses on depth, on width, on line density, or on focal zones — but you cannot spend the same pulse twice.</p>
<table class="dt">
<tr><th>Operator change</th><th>Frame rate</th><th>What you gain or lose</th></tr>
<tr><td>↑ imaging depth</td><td>↓</td><td>see deeper anatomy; longer wait per line</td></tr>
<tr><td>↑ sector width / field of view</td><td>↓</td><td>more anatomy across; more lines needed</td></tr>
<tr><td>↑ line density</td><td>↓</td><td>better lateral sampling, less gappy image</td></tr>
<tr><td>↑ number of transmit foci</td><td>↓</td><td>narrow beam over more depths (better lateral)</td></tr>
<tr><td>↑ write zoom / narrow box</td><td>↑</td><td>fewer lines and less depth to cover</td></tr>
<tr><td>↑ frequency</td><td>no change</td><td>better resolution, less penetration</td></tr>
</table>
<p>Two of those deserve emphasis. <b>Frequency does not change frame rate</b> — the round trip takes 13 µs per cm no matter what frequency is in the pulse. And <b>dynamic receive focusing is free</b>, while transmit foci are not, because receive focusing happens during the single listening period you were already paying for.</p>
<p>Clinically: for a beating heart or a fast fetal movement you protect frame rate — shallow, narrow, one focus, moderate line density. For a still structure like a thyroid nodule you happily spend frame rate on line density and several foci.</p>
<div class="callout key">Temporal resolution and spatial detail pull against each other. Improving lateral resolution with more foci or more lines always costs frames per second.</div>
<div class="callout tip">Dumb saying: "<b>Deep, Wide, Dense, Many = Molasses</b>" — the four frame-rate killers, in order of how often they get tested.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A budget of pulses split between depth, width, line density and focal zones</title>
<text x="20" y="30" fill="currentColor" font-size="16">Your pulse budget per second is fixed by the speed of sound</text>
<rect x="30" y="55" width="540" height="40" fill="none" stroke="currentColor"/>
<line x1="165" y1="55" x2="165" y2="95" stroke="currentColor"/>
<line x1="300" y1="55" x2="300" y2="95" stroke="currentColor"/>
<line x1="435" y1="55" x2="435" y2="95" stroke="currentColor"/>
<text x="55" y="82" fill="currentColor" font-size="16">DEPTH</text>
<text x="190" y="82" fill="currentColor" font-size="16">WIDTH</text>
<text x="320" y="82" fill="currentColor" font-size="16">DENSITY</text>
<text x="470" y="82" fill="currentColor" font-size="16">FOCI</text>
<path d="M300 110 L300 150 M292 138 L300 150 L308 138" fill="none" stroke="var(--c2)"/>
<text x="185" y="180" fill="currentColor" font-size="16">spend more on any one...</text>
<text x="215" y="215" fill="currentColor" font-size="16">= fewer FRAMES</text>
<text x="120" y="255" fill="currentColor" font-size="16">Deep, Wide, Dense, Many = Molasses</text>
</svg>`, caption: "Four ways to spend the same pulse budget; each one costs frames per second." }
      ],
      sayIt: "Say out loud: list four operator changes that lower frame rate, one that raises it, and one that does not affect it at all.",
      keyPoints: [
        "Frame rate is a fixed budget set by the speed of sound",
        "↑ depth, ↑ sector width, ↑ line density and ↑ number of foci all lower frame rate",
        "Narrowing the image box or reducing depth raises frame rate",
        "Frequency does not change frame rate",
        "Dynamic receive focusing is free; transmit foci are not",
        "Moving structures → protect frame rate; still structures → spend it on detail"
      ]
    },
    {
      id: "u08-l10",
      title: "Side lobes and grating lobes",
      objectives: ["u08-o9"],
      html: `<p class="lead">Not all of the sound goes where you aimed it — the leftovers off to the side get painted into the picture as if they were on the main beam.</p>
<p>Mental picture: a flashlight in a dark room. Most of the light goes forward, but a faint halo spills sideways. If something bright happens to sit in that halo, the machine cannot tell the difference and draws it in the middle of your image, where the main beam was pointing. That is the artifact both kinds of lobes produce: a real reflector displayed in the wrong lateral position, often as haze in a fluid-filled structure that should be black.</p>
<ul>
<li><span class="kw">Side lobes</span> — small extra beams off to the sides of the main beam, produced by <b>any</b> transducer, including a single-element one, because the crystal expands radially as well as in thickness.</li>
<li><span class="kw">Grating lobes</span> — additional off-axis beams produced only by <b>arrays</b>, because the sound comes from many separated sources whose wavelets can reinforce in unintended directions. They are stronger and further off-axis when the element spacing is large compared with the wavelength.</li>
</ul>
<p>The fixes:</p>
<ul>
<li><span class="kw-2">Apodization</span> — drive the outer elements at lower voltage so the aperture tapers off at its edges instead of ending abruptly. Reduces both kinds of lobes.</li>
<li><span class="kw-2">Subdicing</span> — cut each element into several even smaller ones fired together, so the spacing between sound sources is smaller than a wavelength. This is the specific fix for <b>grating</b> lobes.</li>
</ul>
<div class="callout key">Side lobes: all transducers, single elements included. Grating lobes: arrays only. Both put echoes in the wrong place laterally. Apodization helps both; subdicing targets grating lobes.</div>
<div class="callout tip">Dumb saying: "<b>Gratings come in rows</b>" — grating lobes need a row of elements, so they are the array-only lobe.</div>
<div class="steps"><ol><li>At 10 cm, round-trip time is 13 × 10 = 130 µs.</li><li>For 128 lines and one focus, frame time = 130 × 128 = 16.64 ms.</li><li>Frame rate = 1 ÷ 0.01664 ≈ 60 frames/s; temporal resolution is 16.64 ms.</li><li>With two foci, frame time doubles and frame rate halves to about 30 frames/s.</li><li>At 30 frames/s and 160 lines, maximum depth = 77,000 ÷ (30 × 160) ≈ 16 cm.</li><li>At 10 cm and 50 frames/s, maximum lines = 77,000 ÷ (50 × 10) = 154.</li></ol></div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A main beam with weaker lobes off to the sides, and an echo from a lobe drawn on the main beam line</title>
<rect x="255" y="40" width="90" height="16" fill="var(--muted)"/>
<path d="M285 56 L285 230 L315 230 L315 56" fill="none" stroke="var(--c1)"/>
<text x="330" y="150" fill="currentColor" font-size="16">main beam</text>
<path d="M275 56 L160 190" fill="none" stroke="var(--c2)"/>
<path d="M325 56 L440 190" fill="none" stroke="var(--c2)"/>
<text x="60" y="210" fill="currentColor" font-size="16">lobe</text>
<text x="450" y="210" fill="currentColor" font-size="16">lobe</text>
<circle cx="440" cy="190" r="7" fill="var(--c4)"/>
<text x="460" y="240" fill="currentColor" font-size="16">real reflector</text>
<text x="460" y="264" fill="currentColor" font-size="16">sits in a lobe</text>
<circle cx="300" cy="190" r="7" fill="none" stroke="var(--c4)"/>
<text x="120" y="264" fill="currentColor" font-size="16">but is drawn HERE, on the main line</text>
<text x="20" y="30" fill="currentColor" font-size="16">Side lobes: any transducer. Grating lobes: arrays only.</text>
</svg>`, caption: "Echoes from a lobe are painted on the main beam's line — the wrong lateral position." }
      ],
      sayIt: "Say out loud: what causes side lobes, what causes grating lobes, what artifact do they create, and what are the two fixes?",
      keyPoints: [
        "Side lobes: off-axis beams from any transducer, including single-element",
        "Grating lobes: off-axis beams from arrays only, from the separated element sources",
        "Grating lobes worsen when element spacing is large compared with the wavelength",
        "Artifact: a real reflector is displayed in the wrong lateral position, often as haze in anechoic areas",
        "Apodization (lower voltage on outer elements) reduces both",
        "Subdicing (smaller sub-elements) is the specific grating-lobe fix"
      ]
    }
  ],

  mnemonics: [
    { saying: "Slope to steer, smile to focus", meaning: "A sloped (linear) delay pattern tilts the wave front and steers; a curved, smile-shaped pattern converges it and focuses.", lesson: "u08-l3" },
    { saying: "Sequential is square, phased is a fan", meaning: "Linear sequential arrays make a rectangular image; linear phased arrays steer and make a sector.", lesson: "u08-l4" },
    { saying: "Curved face, blunt top", meaning: "A convex/curvilinear array's curved face fans the lines by itself, giving a blunted sector.", lesson: "u08-l5" },
    { saying: "Annular rings: focus electric, steer by motor", meaning: "Annular phased arrays focus electronically in both planes but must be moved mechanically to sweep a sector.", lesson: "u08-l5" },
    { saying: "One row sees a slice, more rows slim the slice, a grid sees a volume", meaning: "1D arrays rely on a fixed lens, 1.5D arrays focus the elevational plane, 2D matrix arrays give 3D/4D.", lesson: "u08-l6" },
    { saying: "Transmit costs frames, receive is free", meaning: "Every extra transmit focus needs another pulse and lowers frame rate; dynamic receive focusing costs nothing.", lesson: "u08-l7" },
    { saying: "Thirteen for one, times lines, times foci", meaning: "Frame time = 13 µs per cm of depth × lines per frame × number of transmit foci.", lesson: "u08-l8" },
    { saying: "Deep, Wide, Dense, Many = Molasses", meaning: "Deep image, wide sector, dense lines and many foci each slow the frame rate.", lesson: "u08-l9" },
    { saying: "Gratings come in rows", meaning: "Grating lobes require a row of separate elements, so only arrays make them; side lobes come from any transducer.", lesson: "u08-l10" },
    { saying: "Dice it small, lobe it less", meaning: "Subdicing each element into smaller sub-elements shrinks the source spacing and suppresses grating lobes.", lesson: "u08-l10" }
  ],

  formulas: [
    { name: "Frame time", expr: "Frame time = 13 µs × depth (cm) × lines per frame", units: "µs", note: "The 13 µs already includes the round trip." },
    { name: "Frame time with multiple foci", expr: "Frame time = 13 µs × depth (cm) × lines × number of foci", units: "µs", note: "Each focal zone needs its own pulse down every line." },
    { name: "Frame rate", expr: "Frame rate = 1 ÷ frame time", units: "Hz (frames/s)", note: "Convert frame time to seconds first." },
    { name: "Frame rate shortcut", expr: "Frame rate ≈ 77,000 ÷ [depth (cm) × lines]", units: "frames/s", note: "77,000 comes from 1 ÷ 13 µs." },
    { name: "Maximum imaging depth", expr: "Max depth (cm) = 77,000 ÷ (frame rate × lines)", units: "cm", note: "Divide again by the number of foci if more than one." },
    { name: "Maximum lines per frame", expr: "Max lines = 77,000 ÷ (frame rate × depth in cm)", units: "lines", note: "More lines = better lateral sampling, lower frame rate." },
    { name: "Temporal resolution", expr: "Temporal resolution = 1 ÷ frame rate = frame time", units: "s", note: "Smaller frame time = better temporal resolution." },
    { name: "Round-trip time rule", expr: "Time (µs) = 13 × depth (cm)", units: "µs", note: "From 1.54 mm/µs; it is the go-and-return time." }
  ],

  keyNumbers: [
    { fact: "Round-trip time in soft tissue", value: "13 µs per cm of depth" },
    { fact: "Elements in a typical array", value: "about 64–512" },
    { fact: "Elements firing per pulse, linear sequential array", value: "a group of roughly 8–30" },
    { fact: "Elements firing per pulse, phased array", value: "all of them" },
    { fact: "Size of the steering/focusing delays", value: "nanoseconds to a few microseconds" },
    { fact: "Rows of elements in a 1.5D array", value: "about 3–7" },
    { fact: "Typical lines per frame", value: "about 100–250" },
    { fact: "Frame rate needed to look like real time", value: "about 15–20 frames per second or more" },
    { fact: "Typical phased-array (cardiac) frequency", value: "2–5 MHz, small footprint" },
    { fact: "Typical linear-array (vascular/small parts) frequency", value: "5–15 MHz, large footprint" },
    { fact: "Frame rate at 10 cm with 128 lines, one focus", value: "about 60 frames per second" }
  ],

  flashcards: [
    { front: "Mechanical transducer", back: "Single element moved by a motor; fixed focus; sector image; obsolete", lesson: "u08-l1" },
    { front: "How does an array steer the beam?", back: "By the timing (phase delays) of element firing — nothing moves", lesson: "u08-l1" },
    { front: "Biggest advantage of electronic focusing", back: "The focus can be moved, set at several depths, and updated on receive", lesson: "u08-l1" },
    { front: "Channel", back: "One element's own wire, pulser and receive electronics", lesson: "u08-l1" },
    { front: "Linear sequential (switched) array", back: "Groups of elements fired in turn; parallel lines; rectangular image; no steering", lesson: "u08-l2" },
    { front: "Image shape: linear sequential array", back: "Rectangle", lesson: "u08-l2" },
    { front: "Active aperture", back: "The group of elements firing on a given pulse (about 8–30 in a linear array)", lesson: "u08-l2" },
    { front: "Linear phased array", back: "All elements fire each pulse with delays; steers and focuses electronically; sector image", lesson: "u08-l4" },
    { front: "Image shape: linear phased array", back: "Sector", lesson: "u08-l4" },
    { front: "Why is the phased array the cardiac probe?", back: "Small footprint fits between ribs but still gives a wide deep field", lesson: "u08-l4" },
    { front: "Sloped (linear) delay pattern does what?", back: "Steers the beam", lesson: "u08-l3" },
    { front: "Curved (arched) delay pattern does what?", back: "Focuses the beam", lesson: "u08-l3" },
    { front: "Which elements fire first to focus the beam?", back: "The outer ones; the centre elements fire last", lesson: "u08-l3" },
    { front: "How big are steering/focusing delays?", back: "Nanoseconds to a few microseconds", lesson: "u08-l3" },
    { front: "Do phase delays change axial resolution?", back: "No — they change beam direction and width, not pulse length", lesson: "u08-l3" },
    { front: "Convex (curvilinear) array", back: "Sequenced groups on a curved face; blunted sector image; abdominal/OB", lesson: "u08-l5" },
    { front: "Image shape: convex array", back: "Blunted sector", lesson: "u08-l5" },
    { front: "Vector array", back: "Small flat array whose lines start at different elements and are steered; trapezoid/blunted sector", lesson: "u08-l5" },
    { front: "Annular phased array", back: "Concentric rings; electronic focus in both planes; steered mechanically", lesson: "u08-l5" },
    { front: "Which array focuses in both planes but cannot steer electronically?", back: "Annular phased array", lesson: "u08-l5" },
    { front: "1.5D array", back: "Several rows of elements; electronic focusing in the elevational plane; better slice thickness", lesson: "u08-l6" },
    { front: "2D (matrix) array", back: "Full grid of elements; steers and focuses in both planes; gives 3D/4D", lesson: "u08-l6" },
    { front: "What limits a 1D array elevationally?", back: "A fixed acoustic lens — one slice-thickness focus depth, not adjustable", lesson: "u08-l6" },
    { front: "Beamformer", back: "Applies delays to each channel and sums them into one scan line", lesson: "u08-l7" },
    { front: "Dynamic receive focusing", back: "Receive delays update continuously so the focus follows the echoes down; costs no frame rate", lesson: "u08-l7" },
    { front: "Dynamic aperture", back: "More elements switched in to listen as echoes come from deeper, keeping the beam narrow", lesson: "u08-l7" },
    { front: "Apodization", back: "Outer elements driven/weighted lower to suppress side and grating lobes", lesson: "u08-l7" },
    { front: "Which focus costs frame rate: transmit or receive?", back: "Transmit — each focal zone needs its own pulse", lesson: "u08-l7" },
    { front: "Frame time formula", back: "13 µs × depth (cm) × lines per frame × number of foci", lesson: "u08-l8" },
    { front: "Frame rate shortcut", back: "≈ 77,000 ÷ (depth in cm × lines per frame)", lesson: "u08-l8" },
    { front: "Max depth from frame rate and lines", back: "77,000 ÷ (frame rate × lines), in cm", lesson: "u08-l8" },
    { front: "Frame rate at 10 cm, 128 lines, one focus", back: "About 60 frames per second", lesson: "u08-l8" },
    { front: "Four things that lower frame rate", back: "More depth, wider sector, higher line density, more transmit foci", lesson: "u08-l9" },
    { front: "Does changing frequency change frame rate?", back: "No — the round trip is 13 µs per cm regardless of frequency", lesson: "u08-l9" },
    { front: "Side lobes", back: "Weak off-axis beams from any transducer, including single-element ones", lesson: "u08-l10" },
    { front: "Grating lobes", back: "Off-axis beams from arrays only, caused by the separated element sources", lesson: "u08-l10" },
    { front: "Artifact caused by lobes", back: "Real reflectors displayed in the wrong lateral position; haze in anechoic structures", lesson: "u08-l10" },
    { front: "Subdicing", back: "Cutting each element into smaller sub-elements to reduce grating lobes", lesson: "u08-l10" },
    { front: "Which lobe is array-only?", back: "Grating lobe", lesson: "u08-l10" }
  ],

  questions: [
    { id: "u08-q1", type: "mc", q: "How does a mechanical transducer steer its beam?", choices: ["With electronic phase delays", "By physically moving the element with a motor", "By switching groups of elements", "By changing the frequency"], answer: 1, explain: "A mechanical probe wobbles or rotates a single crystal, which is why it has moving parts and a sector image. Phase delays and element switching are array methods — a mechanical probe has only one element to work with.", objectives: ["u08-o1"], lesson: "u08-l1", level: 1 },
    { id: "u08-q2", type: "tf", q: "A mechanical transducer's focus can be moved to a different depth by the sonographer during the exam.", answer: false, explain: "Its focus comes from a fixed lens or a curved crystal, so it is set at manufacture. Being able to move the focus is exactly the advantage arrays brought.", objectives: ["u08-o1"], lesson: "u08-l1", level: 1 },
    { id: "u08-q3", type: "short", q: "What is the name for one element's own wire, pulser and receive electronics?", answer: "channel", accept: ["channel", "a channel", "channels"], explain: "Each element has its own channel, which is what lets the beamformer delay elements independently. An 'aperture' is the group of elements in use, not the electronics.", objectives: ["u08-o1"], lesson: "u08-l1", level: 1 },
    { id: "u08-q4", type: "mc", q: "Which is NOT an advantage of an electronic array over a mechanical transducer?", choices: ["No moving parts to wear out", "Focus adjustable at several depths", "Dynamic focusing on receive", "A shorter pulse and therefore better axial resolution"], answer: 3, explain: "Axial resolution comes from pulse length, which depends on frequency and damping — array construction does not shorten the pulse. The other three are genuine array advantages.", objectives: ["u08-o1"], lesson: "u08-l1", level: 2 },
    { id: "u08-q5", type: "mc", q: "In a linear sequential array, what fires to create each scan line?", choices: ["One single element", "A group of adjacent elements", "All the elements at once", "Alternating odd and even elements"], answer: 1, explain: "A group of roughly 8–30 adjacent elements fires together, then the group slides over by one element for the next line. A single skinny element alone would produce a badly diverging beam.", objectives: ["u08-o2"], lesson: "u08-l2", level: 1 },
    { id: "u08-q6", type: "short", q: "What image shape does a linear sequential array produce?", answer: "rectangle", accept: ["rectangle", "rectangular", "a rectangle", "rectangular image"], explain: "The lines are parallel and perpendicular to the flat face, so the field is rectangular. A sector would require steering, which a purely sequenced array does not do.", objectives: ["u08-o2"], lesson: "u08-l2", level: 1 },
    { id: "u08-q7", type: "tf", q: "In a purely sequenced (switched) linear array, the scan lines are parallel to each other.", answer: true, explain: "Each group fires straight out of the flat face, so every line points the same direction and they are parallel. Tilting them would require phase delays, which is steering.", objectives: ["u08-o2"], lesson: "u08-l2", level: 1 },
    { id: "u08-q8", type: "mc", q: "A vascular study of the carotid needs a wide near field and high frequency. The best choice is:", choices: ["A linear sequential array at 7.5 MHz", "A phased array at 3 MHz", "An annular array at 3 MHz", "A mechanical sector probe at 5 MHz"], answer: 0, explain: "A linear array gives a rectangular field that is full width right at the skin, and its usual 5–15 MHz range suits a superficial vessel. A phased array's sector is narrow exactly where the carotid sits, and its low frequency wastes resolution.", objectives: ["u08-o2"], lesson: "u08-l2", level: 3 },
    { id: "u08-q9", type: "mc", q: "In a linear phased array, how many elements fire for each pulse?", choices: ["One", "A group of about eight", "All of them", "Half of them, alternating"], answer: 2, explain: "The entire array fires on every pulse, and only the delay pattern changes between pulses. Firing a sliding group instead is what a sequential array does.", objectives: ["u08-o3"], lesson: "u08-l4", level: 1 },
    { id: "u08-q10", type: "short", q: "What image shape does a linear phased array produce?", answer: "sector", accept: ["sector", "a sector", "sector image", "pie", "pie shaped", "fan"], explain: "All the lines leave from nearly the same small spot and fan out, so the image is a sector. A blunted sector would come from a curved face instead.", objectives: ["u08-o3"], lesson: "u08-l4", level: 1 },
    { id: "u08-q11", type: "mc", q: "Why is a phased array preferred for adult cardiac imaging?", choices: ["It has the highest frequency available", "Its small footprint fits between ribs while giving a wide deep field", "It has no side lobes", "Its rectangular image matches the heart's shape"], answer: 1, explain: "The intercostal window is tiny, and a sector widens with depth, so a small face still shows the whole heart. Phased arrays are typically low frequency, and they produce a sector, not a rectangle.", objectives: ["u08-o3"], lesson: "u08-l4", level: 2 },
    { id: "u08-q12", type: "mc", q: "A probe has a straight row of elements and produces a sector image. It must be:", choices: ["A linear sequential array", "A linear phased array", "A convex array", "An annular array"], answer: 1, explain: "A straight row plus a sector means the lines are being steered electronically — a phased array. A convex array also gives a fanned image but its elements sit on a curved face, and an annular array uses rings.", objectives: ["u08-o3"], lesson: "u08-l4", level: 2 },
    { id: "u08-q13", type: "mc", q: "A delay pattern in which each element fires a constant amount later than its neighbour will:", choices: ["Focus the beam at a shallow depth", "Steer the beam to one side", "Shorten the pulse", "Widen the slice thickness"], answer: 1, explain: "A constant step in delay tilts the combined wave front, which steers the beam. Focusing requires a curved delay pattern, and no delay pattern changes pulse length.", objectives: ["u08-o4"], lesson: "u08-l3", level: 2 },
    { id: "u08-q14", type: "mc", q: "To focus the beam electronically, which elements are excited first?", choices: ["The centre elements", "The outer elements", "All at the same moment", "Alternating elements"], answer: 1, explain: "The outer elements fire first and the centre last, producing a concave wave front that converges to a focus. Firing all at once gives an unfocused beam heading straight out.", objectives: ["u08-o4"], lesson: "u08-l3", level: 2 },
    { id: "u08-q15", type: "short", q: "What principle explains how many small element wavelets add up into one wave front?", answer: "Huygens principle", accept: ["huygens", "huygens principle", "huygen's principle", "huygens' principle", "huygens theory"], explain: "Huygens' principle: each element acts as a source of a small wavelet, and the wavelets interfere to build the resulting wave front. Snell's law is about refraction at a boundary instead.", objectives: ["u08-o4"], lesson: "u08-l3", level: 1 },
    { id: "u08-q16", type: "tf", q: "Using a larger spread of delays across the array (a deeper delay curve) places the focus shallower.", answer: true, explain: "A more strongly curved wave front converges sooner, so the focal point is closer to the probe. A gentle curve sends the focus deeper.", objectives: ["u08-o4"], lesson: "u08-l3", level: 3 },
    { id: "u08-q17", type: "mc", q: "Dynamic receive focusing means that:", choices: ["Several transmit pulses are sent per line with different focal depths", "The receive delays are updated continuously as echoes return from deeper", "The outer elements are driven at lower voltage", "The number of listening elements is fixed"], answer: 1, explain: "On receive the machine can re-time the channels moment by moment, so the focus tracks the returning echoes at no frame-rate cost. Sending several focused transmit pulses is multi-zone transmit focusing, which does cost frame rate.", objectives: ["u08-o5"], lesson: "u08-l7", level: 2 },
    { id: "u08-q18", type: "short", q: "What is the name for lowering the drive voltage on the outer elements to reduce lobes?", answer: "apodization", accept: ["apodization", "apodisation", "apodizing"], explain: "Apodization tapers the aperture's edges, which suppresses side and grating lobes at the cost of a slightly wider main beam. Subdicing is a physical construction fix aimed at grating lobes.", objectives: ["u08-o5"], lesson: "u08-l7", level: 1 },
    { id: "u08-q19", type: "mc", q: "As echoes arrive from deeper structures, the system uses more elements to listen. This is:", choices: ["Apodization", "Dynamic aperture", "Subdicing", "Multi-zone transmit focus"], answer: 1, explain: "Dynamic aperture grows the receiving group with depth so the beam stays narrow. Apodization also involves element weighting but is about lobe suppression, not the size of the listening group.", objectives: ["u08-o5"], lesson: "u08-l7", level: 2 },
    { id: "u08-q20", type: "mc", q: "Which of these costs frame rate?", choices: ["Dynamic receive focusing", "Dynamic aperture", "Apodization", "Adding a second transmit focal zone"], answer: 3, explain: "Only transmit focal zones need extra pulses down each line, so only they lower frame rate. The receive-side techniques all happen during the single listening period you already paid for.", objectives: ["u08-o5"], lesson: "u08-l7", level: 2 },
    { id: "u08-q21", type: "mc", q: "A curved row of elements fired as sequenced groups produces which image shape?", choices: ["Rectangle", "Blunted sector", "Perfect circle", "Narrow-topped sector"], answer: 1, explain: "The curved face fans the parallel-to-the-face lines apart without steering, giving a sector whose top is broad and curved — a blunted sector. A narrow-topped sector comes from a small phased array.", objectives: ["u08-o6"], lesson: "u08-l5", level: 2 },
    { id: "u08-q22", type: "short", q: "Which array uses concentric rings of elements?", answer: "annular array", accept: ["annular", "annular array", "annular phased array", "annular phased"], explain: "The annular phased array uses rings around a common centre, which focuses in both planes and gives a symmetric beam. Its steering, however, must be mechanical.", objectives: ["u08-o6"], lesson: "u08-l5", level: 1 },
    { id: "u08-q23", type: "mc", q: "Which array focuses electronically in both planes but must be steered mechanically?", choices: ["Vector array", "Annular phased array", "Linear phased array", "Convex sequential array"], answer: 1, explain: "Rings can only shrink or expand the beam symmetrically, not tilt it, so the assembly is moved to sweep a sector. Every other array listed steers electronically.", objectives: ["u08-o6"], lesson: "u08-l5", level: 2 },
    { id: "u08-q24", type: "tf", q: "A 2D matrix array can steer and focus in both the imaging plane and the elevational plane, which is what makes real-time 3D imaging possible.", answer: true, explain: "A full grid gives delay control in two directions, so the machine can sweep a pyramid of sound and build volumes. A 1.5D array only focuses elevationally; it cannot steer out of plane.", objectives: ["u08-o6"], lesson: "u08-l6", level: 2 },
    { id: "u08-q25", type: "mc", q: "An image is 15 cm deep with 200 lines per frame and one transmit focus. The frame time is closest to:", choices: ["13 ms", "26 ms", "39 ms", "52 ms"], answer: 2, explain: "Frame time = 13 µs × 15 × 200 = 39,000 µs = 39 ms. Answering 78 ms or doubling anything means you applied the round trip twice — the 13 µs already includes going and coming back.", objectives: ["u08-o7"], lesson: "u08-l8", level: 3 },
    { id: "u08-q26", type: "mc", q: "At 10 cm depth with 128 lines and one focus, the frame rate is about 60 frames/s. What happens if a second focal zone is added?", choices: ["It stays about 60", "It drops to about 30", "It rises to about 120", "It drops to about 15"], answer: 1, explain: "Two focal zones means two pulses per line, so frame time doubles and frame rate halves to about 30. Dropping to 15 would require four focal zones.", objectives: ["u08-o7"], lesson: "u08-l8", level: 3 },
    { id: "u08-q27", type: "short", q: "How many microseconds does each centimetre of imaging depth cost per scan line?", answer: "13 microseconds", accept: ["13", "13 us", "13 µs", "13 microseconds", "13 micro seconds", "thirteen"], explain: "13 µs per cm is the round-trip time at 1.54 mm/µs. Using 6.5 µs would be a one-way trip and would double every frame rate you calculate.", objectives: ["u08-o7"], lesson: "u08-l8", level: 1 },
    { id: "u08-q28", type: "mc", q: "A machine must hold 30 frames/s with 160 lines per frame and one focus. What is the greatest imaging depth possible?", choices: ["About 8 cm", "About 16 cm", "About 24 cm", "About 32 cm"], answer: 1, explain: "Max depth = 77,000 ÷ (30 × 160) ≈ 16 cm. Choosing 32 cm forgets that the 13 µs already covers the round trip.", objectives: ["u08-o7"], lesson: "u08-l8", level: 3 },
    { id: "u08-q29", type: "mc", q: "Which change will INCREASE the frame rate?", choices: ["Widening the sector", "Increasing line density", "Reducing the imaging depth", "Adding a third focal zone"], answer: 2, explain: "Less depth means less waiting per line, so frames finish faster. The other three each add pulses or waiting time and lower the frame rate.", objectives: ["u08-o8"], lesson: "u08-l9", level: 2 },
    { id: "u08-q30", type: "tf", q: "Switching to a higher-frequency transducer lowers the frame rate.", answer: false, explain: "Frame rate depends on depth, lines and foci, because the round trip is 13 µs per cm no matter what frequency is used. Frequency affects resolution and penetration instead.", objectives: ["u08-o8"], lesson: "u08-l9", level: 2 },
    { id: "u08-q31", type: "short", q: "Increasing line density sharpens lateral detail, but which resolution does it worsen?", answer: "temporal", accept: ["temporal", "temporal resolution", "temporal res"], explain: "More lines per frame means more pulses per frame, so frame time rises and frame rate falls. Axial resolution is untouched, because the pulse length has not changed.", objectives: ["u08-o8"], lesson: "u08-l9", level: 2 },
    { id: "u08-q32", type: "mc", q: "A sonographer is struggling to capture a fast-moving mitral valve. Which set of changes best protects temporal resolution?", choices: ["Deeper field, wider sector, three foci", "Shallower field, narrower sector, one focus", "Same depth with much higher line density", "Higher frequency with two foci"], answer: 1, explain: "Depth, width and focal zones all multiply into frame time, so reducing all three raises frame rate. Higher frequency does nothing for frame rate, and the second focus in that option actively halves it.", objectives: ["u08-o8"], lesson: "u08-l9", level: 3 },
    { id: "u08-q33", type: "mc", q: "Grating lobes are produced by:", choices: ["Any transducer, including single-element ones", "Arrays only, because sound comes from many separated elements", "Only curved transducers", "Only continuous-wave transducers"], answer: 1, explain: "Grating lobes come from the regular spacing of separate element sources, so only arrays make them. Side lobes are the ones any transducer, single-element included, produces.", objectives: ["u08-o9"], lesson: "u08-l10", level: 1 },
    { id: "u08-q34", type: "short", q: "What construction technique cuts each element into smaller pieces to reduce grating lobes?", answer: "subdicing", accept: ["subdicing", "sub-dicing", "subdice", "sub dicing"], explain: "Subdicing shrinks the spacing between sound sources to less than a wavelength, which suppresses grating lobes. Apodization also helps with lobes but is an electrical weighting, not a cut.", objectives: ["u08-o9"], lesson: "u08-l10", level: 1 },
    { id: "u08-q35", type: "tf", q: "Echoes created by side lobes and grating lobes are displayed as if they came from the main beam, putting them in the wrong lateral position.", answer: true, explain: "The system assumes every echo came from the main beam's direction, so off-axis echoes are painted on the main line — often as haze inside structures that should be anechoic.", objectives: ["u08-o9"], lesson: "u08-l10", level: 2 },
    { id: "u08-q36", type: "mc", q: "A cyst that should be anechoic shows faint haze, and the machine is an array probe. Which pair of fixes targets the likely cause?", choices: ["More gain and a lower dynamic range", "Apodization and subdicing", "More transmit foci and higher line density", "A longer pulse and lower frequency"], answer: 1, explain: "Haze in an anechoic structure from an array points at lobe artifact, which apodization and subdicing are designed to reduce. Adding foci or lines sharpens the main beam but does nothing about energy that is off-axis to begin with.", objectives: ["u08-o9"], lesson: "u08-l10", level: 3 }
  ],

  drills: [
    {
      id: "u08-d1", title: "Frame rate from depth and lines", formula: "Frame time = 13 µs × depth × lines; FR = 1 ÷ frame time", lesson: "u08-l8",
      gen: function (rnd) {
        var d = [4, 6, 8, 10, 12, 14, 16, 20][Math.floor(rnd() * 8)];
        var L = [64, 96, 120, 128, 160, 192, 200, 256][Math.floor(rnd() * 8)];
        var ft = 13e-6 * d * L;
        var fr = 1 / ft;
        return {
          kind: "number",
          given: "Imaging depth " + d + " cm, " + L + " lines per frame, a single transmit focus.",
          ask: "What is the frame rate, in frames per second?",
          answer: +fr.toFixed(2), unit: "frames/s", tol: Math.max(1, fr * 0.02),
          steps: [
            "Frame time = 13 µs × depth × lines",
            "= 13 × " + d + " × " + L + " = " + (ft * 1e6).toFixed(0) + " µs = " + ft.toFixed(5) + " s",
            "Frame rate = 1 ÷ frame time = " + fr.toFixed(1) + " frames/s",
            "Shortcut: 77,000 ÷ (" + d + " × " + L + ") ≈ " + (77000 / (d * L)).toFixed(1)
          ]
        };
      }
    },
    {
      id: "u08-d2", title: "Frame rate with multiple transmit foci", formula: "Frame time = 13 µs × depth × lines × foci", lesson: "u08-l8",
      gen: function (rnd) {
        var d = [6, 8, 10, 12, 15, 18][Math.floor(rnd() * 6)];
        var L = [80, 100, 128, 150, 180, 200][Math.floor(rnd() * 6)];
        var k = [2, 3, 4][Math.floor(rnd() * 3)];
        var ft = 13e-6 * d * L * k;
        var fr = 1 / ft;
        return {
          kind: "number",
          given: "Depth " + d + " cm, " + L + " lines per frame, " + k + " transmit focal zones.",
          ask: "What is the frame rate, in frames per second?",
          answer: +fr.toFixed(2), unit: "frames/s", tol: Math.max(0.5, fr * 0.02),
          steps: [
            "Each focal zone needs its own pulse down every line, so use lines × foci",
            "Effective lines = " + L + " × " + k + " = " + (L * k),
            "Frame time = 13 × " + d + " × " + (L * k) + " = " + (ft * 1e6).toFixed(0) + " µs = " + ft.toFixed(5) + " s",
            "Frame rate = 1 ÷ frame time = " + fr.toFixed(1) + " frames/s"
          ]
        };
      }
    },
    {
      id: "u08-d3", title: "Maximum imaging depth from frame rate and lines", formula: "Max depth = 77,000 ÷ (frame rate × lines)", lesson: "u08-l8",
      gen: function (rnd) {
        var fr = [15, 20, 24, 30, 40, 50, 60][Math.floor(rnd() * 7)];
        var L = [64, 96, 120, 128, 160, 200][Math.floor(rnd() * 6)];
        var d = 1 / (13e-6 * fr * L);
        return {
          kind: "number",
          given: "The system must maintain " + fr + " frames/s using " + L + " lines per frame and one focus.",
          ask: "What is the greatest imaging depth possible, in cm?",
          answer: +d.toFixed(2), unit: "cm", tol: Math.max(0.3, d * 0.03),
          steps: [
            "Frame time allowed = 1 ÷ " + fr + " = " + (1 / fr).toFixed(5) + " s",
            "Time per line = frame time ÷ lines = " + ((1 / fr / L) * 1e6).toFixed(1) + " µs",
            "Depth = time per line ÷ 13 µs per cm",
            "= " + d.toFixed(1) + " cm  (or 77,000 ÷ (" + fr + " × " + L + "))"
          ]
        };
      }
    },
    {
      id: "u08-d4", title: "Maximum lines per frame", formula: "Max lines = 77,000 ÷ (frame rate × depth)", lesson: "u08-l8",
      gen: function (rnd) {
        var fr = [15, 20, 25, 30, 40, 50][Math.floor(rnd() * 6)];
        var d = [4, 6, 8, 10, 12, 16, 20][Math.floor(rnd() * 7)];
        var L = 1 / (13e-6 * fr * d);
        return {
          kind: "number",
          given: "Imaging depth " + d + " cm with one focus, and the frame rate must be at least " + fr + " frames/s.",
          ask: "What is the greatest number of lines per frame? (round to a whole number)",
          answer: Math.floor(L), unit: "lines", tol: 0.01,
          steps: [
            "Frame time allowed = 1 ÷ " + fr + " = " + (1 / fr).toFixed(5) + " s",
            "Time per line = 13 µs × " + d + " cm = " + (13 * d) + " µs",
            "Lines = frame time ÷ time per line = " + L.toFixed(1),
            "The greatest whole number that does not exceed the limit is " + Math.floor(L) + " lines  (or 77,000 ÷ (" + fr + " × " + d + "))"
          ]
        };
      }
    },
    {
      id: "u08-d5", title: "Temporal resolution trade-offs", formula: "Frame time = 13 µs × depth × lines × foci", lesson: "u08-l9",
      gen: function (rnd) {
        var cases = [
          { g: "The sonographer doubles the imaging depth and changes nothing else.", a: "What happens to the frame rate?", c: ["Roughly doubles", "Roughly halves", "Unchanged"], k: 1, s: ["Frame time = 13 µs × depth × lines", "Double the depth → double the frame time", "Frame rate = 1 ÷ frame time → roughly halves"] },
          { g: "The sonographer narrows the sector, cutting the lines per frame in half.", a: "What happens to the frame rate?", c: ["Roughly doubles", "Roughly halves", "Unchanged"], k: 0, s: ["Half the lines → half the frame time", "Frame rate = 1 ÷ frame time", "Frame rate roughly doubles"] },
          { g: "The sonographer turns on a second transmit focal zone.", a: "What happens to the frame rate?", c: ["Roughly doubles", "Roughly halves", "Unchanged"], k: 1, s: ["Each focal zone needs its own pulse down each line", "Pulses per frame double → frame time doubles", "Frame rate roughly halves"] },
          { g: "The sonographer turns on a second transmit focal zone.", a: "What happens to LATERAL resolution?", c: ["Improves over more depths", "Worsens", "Unchanged"], k: 0, s: ["Each zone gives a narrow beam at its own depth", "The system stitches the narrow parts together", "Lateral resolution improves over a greater depth range"] },
          { g: "The sonographer increases the line density.", a: "What happens to the frame rate?", c: ["Increases", "Decreases", "Unchanged"], k: 1, s: ["More lines per frame = more pulses per frame", "Frame time = 13 µs × depth × lines rises", "Frame rate falls"] },
          { g: "The sonographer switches from a 3 MHz to a 6 MHz probe at the same depth and line count.", a: "What happens to the frame rate?", c: ["Increases", "Decreases", "Unchanged"], k: 2, s: ["The round trip takes 13 µs per cm regardless of frequency", "Depth and lines are unchanged", "Frame rate is unchanged (resolution and penetration change instead)"] },
          { g: "The machine switches on dynamic receive focusing.", a: "What happens to the frame rate?", c: ["Increases", "Decreases", "Unchanged"], k: 2, s: ["Receive focusing happens during the listening time already needed", "No extra pulses are required", "Frame rate is unchanged — receive focusing is free"] },
          { g: "The sonographer reduces the imaging depth from 18 cm to 6 cm.", a: "What happens to the frame rate?", c: ["About 3 times higher", "About 3 times lower", "Unchanged"], k: 0, s: ["Frame time is proportional to depth", "18 ÷ 6 = 3, so frame time falls to one third", "Frame rate becomes about 3 times higher"] },
          { g: "The sonographer widens the sector to see more anatomy at the same line density.", a: "What happens to temporal resolution?", c: ["Improves", "Worsens", "Unchanged"], k: 1, s: ["A wider sector at the same density needs more lines", "More lines → longer frame time", "Frame rate falls → temporal resolution worsens"] }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return { kind: "choice", given: c.g, ask: c.a, choices: c.c, answer: c.k, steps: c.s };
      }
    },
    {
      id: "u08-d6", title: "Name that array", formula: "layout + steering method → image shape", lesson: "u08-l5",
      gen: function (rnd) {
        var cases = [
          { g: "A straight row of elements; groups fire in turn; the lines are parallel.", a: "Which array is it, and what shape is the image?", c: ["Linear sequential array — rectangle", "Linear phased array — sector", "Convex array — blunted sector", "Annular array — sector"], k: 0, s: ["Groups fired in turn = sequenced/switched", "Parallel lines from a flat face = no steering", "Image is a rectangle"] },
          { g: "A straight row of elements; all elements fire on every pulse with changing delays; the lines fan out from a small face.", a: "Which array is it, and what shape is the image?", c: ["Linear sequential array — rectangle", "Linear phased array — sector", "Convex array — blunted sector", "Vector array — trapezoid"], k: 1, s: ["All elements every pulse + changing delay slope = phased", "Fanned lines from a small footprint", "Image is a sector"] },
          { g: "Elements sit on a curved face and fire as sequenced groups; the lines fan apart without steering.", a: "Which array is it, and what shape is the image?", c: ["Linear sequential array — rectangle", "Annular array — sector", "Convex (curvilinear) array — blunted sector", "Phased array — sector"], k: 2, s: ["Curved face spreads the lines without delays", "Wide curved top, wider bottom", "Image is a blunted sector"] },
          { g: "Concentric rings of elements focus the beam in both planes, and the assembly is moved by a motor to sweep the image.", a: "Which array is it?", c: ["Vector array", "Annular phased array", "1.5D array", "2D matrix array"], k: 1, s: ["Rings = annular", "Delays across rings focus symmetrically in both planes", "Rings cannot steer, so steering is mechanical"] },
          { g: "A small flat array whose lines start at different elements AND are steered at different angles.", a: "Which array is it, and what shape is the image?", c: ["Vector array — trapezoid / blunted sector", "Linear sequential array — rectangle", "Annular array — sector", "Mechanical probe — sector"], k: 0, s: ["Different origins plus steering = vector format", "Some near-field width plus far-field spread", "Image is a trapezoid / blunted sector"] },
          { g: "Several rows of elements stacked in the elevational direction allow focusing of the slice thickness.", a: "Which array is it?", c: ["1D array", "1.5D array", "2D matrix array", "Annular array"], k: 1, s: ["A few rows, not a full grid = 1.5D", "Delays across the rows focus the elevational plane", "It still cannot steer out of the imaging plane"] },
          { g: "A full grid of thousands of elements steers and focuses in both planes and produces volumes.", a: "Which array is it?", c: ["1.5D array", "2D matrix array", "Annular array", "Convex array"], k: 1, s: ["Grid in two directions = matrix (2D) array", "Delays in both directions steer and focus in both planes", "Gives 3D and real-time 3D (4D) imaging"] },
          { g: "One round element is wobbled by a motor behind an oil-filled cap; the focus cannot be moved.", a: "Which transducer is it?", c: ["Mechanical transducer — sector", "Phased array — sector", "Annular array — sector", "Linear array — rectangle"], k: 0, s: ["A single moving element = mechanical", "Fixed lens or curved crystal = one fixed focus", "Sweeps out a sector image"] }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return { kind: "choice", given: c.g, ask: c.a, choices: c.c, answer: c.k, steps: c.s };
      }
    },
    {
      id: "u08-d7", title: "Read the delay pattern", formula: "sloped delays → steer; curved delays → focus", lesson: "u08-l3",
      gen: function (rnd) {
        var cases = [
          { g: "Each element is fired a constant 40 ns later than the element to its left.", a: "What does this delay pattern do?", c: ["Steers the beam", "Focuses the beam", "Both steers and focuses", "Neither"], k: 0, s: ["A constant step in delay = a linear slope", "A sloped delay pattern tilts the wave front", "The beam is steered"] },
          { g: "The outermost elements fire first and the centre elements fire last, symmetrically.", a: "What does this delay pattern do?", c: ["Steers the beam", "Focuses the beam", "Both steers and focuses", "Neither"], k: 1, s: ["A symmetric curved (arched) pattern", "The wave front becomes concave and converges", "The beam is focused, not steered"] },
          { g: "The delays form a curve that is tipped over so one side is delayed more than the other.", a: "What does this delay pattern do?", c: ["Steers the beam", "Focuses the beam", "Both steers and focuses", "Neither"], k: 2, s: ["Curve = focusing, tilt = steering", "The two patterns simply add together", "This is what a phased array does on every line"] },
          { g: "Every element in the group is fired at exactly the same instant.", a: "What does this delay pattern do?", c: ["Steers the beam", "Focuses the beam", "Both steers and focuses", "Neither — the beam goes straight out, unfocused"], k: 3, s: ["No delay differences means a flat wave front", "A flat front travels straight ahead", "No steering and no electronic focusing"] },
          { g: "The spread between the earliest and latest firing times is made much larger, keeping the same symmetric curve.", a: "What happens to the focal depth?", c: ["The focus moves shallower", "The focus moves deeper", "The focus does not move"], k: 0, s: ["A bigger delay spread = a more strongly curved wave front", "A tighter curve converges sooner", "The focus moves closer to the transducer"] },
          { g: "The slope of the delay pattern is made steeper.", a: "What happens to the beam?", c: ["It is steered at a larger angle", "It is steered at a smaller angle", "It is focused more shallowly"], k: 0, s: ["Slope controls steering angle", "A steeper slope tilts the wave front further", "The beam is steered at a larger angle"] }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return { kind: "choice", given: c.g, ask: c.a, choices: c.c, answer: c.k, steps: c.s };
      }
    }
  ],

  whiteboard: [
    {
      id: "u08-w1", prompt: "Draw each transducer type from memory: mechanical, linear sequential, linear phased, convex, vector, annular, 1.5D, 2D. Beside each one write how it steers, how it focuses, and the image shape.",
      keyPoints: [
        "Mechanical: one element moved by a motor, fixed focus, sector, obsolete",
        "Linear sequential: groups fired in turn, parallel lines, rectangle, large footprint",
        "Linear phased: all elements every pulse, electronic steering and focusing, sector, small footprint",
        "Convex/curvilinear: sequenced groups on a curved face, blunted sector, abdominal/OB",
        "Vector: small flat array, different origins plus steering, trapezoid/blunted sector",
        "Annular phased: rings, electronic focus in both planes, mechanical steering, sector",
        "1.5D: a few rows, electronic elevational focusing, better slice thickness",
        "2D matrix: full grid, steers and focuses in both planes, 3D/4D",
        "Typical frequencies: phased 2–5 MHz, convex 2–5 MHz, linear 5–15 MHz",
        "Arrays have no moving parts; the focus is a setting, not a shape"
      ], minutes: 8, lesson: "u08-l5"
    },
    {
      id: "u08-w2", prompt: "Draw the two delay patterns (sloped and curved) with the wave front each produces, then write everything the beamformer does on receive.",
      keyPoints: [
        "Every element emits a wavelet; the wavelets add into one wave front (Huygens)",
        "Sloped/linear delays tilt the wave front → steering",
        "Steeper slope = larger steering angle",
        "Curved delays (outer first, centre last) → focusing",
        "Bigger delay spread = shallower focus",
        "Slope plus curve = steer and focus on the same pulse",
        "Transmit delays set the transmit focus before the pulse leaves",
        "On receive the beamformer delays each channel and sums them",
        "Dynamic receive focusing: focus follows echoes down, free of frame-rate cost",
        "Dynamic aperture: more elements listen for deeper echoes, keeping the beam narrow",
        "Apodization: outer elements weighted lower, suppresses side and grating lobes",
        "Delays are nanoseconds to a few microseconds and never change axial resolution"
      ], minutes: 8, lesson: "u08-l3"
    },
    {
      id: "u08-w3", prompt: "Write the frame-rate equations from memory, work one example all the way through, and list every change that raises or lowers frame rate with its cost.",
      keyPoints: [
        "13 µs per cm is the round-trip time in soft tissue",
        "Frame time = 13 µs × depth (cm) × lines per frame × number of foci",
        "Frame rate = 1 ÷ frame time ≈ 77,000 ÷ (depth × lines)",
        "Max depth = 77,000 ÷ (frame rate × lines)",
        "Max lines = 77,000 ÷ (frame rate × depth)",
        "Example: 10 cm, 128 lines, 1 focus ≈ 60 frames/s",
        "↑ depth → ↓ frame rate (but you see deeper)",
        "↑ sector width → more lines → ↓ frame rate",
        "↑ line density → ↓ frame rate but better lateral sampling",
        "↑ transmit foci → ↓ frame rate but better lateral resolution",
        "Frequency does not change frame rate",
        "Dynamic receive focusing is free; real time needs ~15–20 fps or more"
      ], minutes: 7, lesson: "u08-l8"
    },
    {
      id: "u08-w4", prompt: "Brain-dump side lobes versus grating lobes: cause, which transducers make them, what the image looks like, and every fix.",
      keyPoints: [
        "Both are unwanted beams off to the side of the main beam",
        "Side lobes: produced by any transducer, including single-element ones",
        "Side lobes arise from radial expansion of the element as well as thickness expansion",
        "Grating lobes: arrays only, from the many separated element sources",
        "Grating lobes worsen when element spacing is large relative to wavelength",
        "Artifact: echoes from off-axis reflectors are drawn on the main beam line",
        "Seen as haze or false structure inside anechoic areas such as cysts or the bladder",
        "Apodization (lower drive voltage on outer elements) reduces both types",
        "Subdicing (smaller sub-elements) specifically reduces grating lobes",
        "Apodization slightly widens the main beam as its trade-off",
        "Dumb saying: gratings come in rows"
      ], minutes: 6, lesson: "u08-l10"
    }
  ]
});
