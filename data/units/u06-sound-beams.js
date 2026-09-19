window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u06",
  order: 6,
  title: "Sound Beams",
  icon: "🔦",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Sound Beams chapter",
  blurb: "A sound beam is not a straight pencil of sound — it is an hourglass that narrows to a focus and then spreads out again. Knowing where the waist is, how wide it is, and what moves it is the whole of lateral resolution.",

  objectives: [
    { id: "u06-o1", text: "Describe the shape of the beam from an unfocused disc transducer and name its regions: near zone (Fresnel zone), focus, and far zone (Fraunhofer zone)." },
    { id: "u06-o2", text: "Calculate near-zone length from transducer diameter and wavelength or frequency, and state the units that make the shortcut work." },
    { id: "u06-o3", text: "State how the beam diameter changes with depth, including its value at the focus and at two near-zone lengths." },
    { id: "u06-o4", text: "Predict how changing the transducer diameter changes near-zone length, beam width and far-zone divergence." },
    { id: "u06-o5", text: "Predict how changing frequency changes near-zone length, wavelength and far-zone divergence." },
    { id: "u06-o6", text: "Explain Huygens' principle and how interference of many wavelets produces the hourglass beam." },
    { id: "u06-o7", text: "Compare the three focusing methods — external lens, internal curved element, and electronic/phased focusing — and identify which are fixed and which are adjustable." },
    { id: "u06-o8", text: "State what focusing does to focal depth, beam width at the focus and divergence beyond the focus, and explain why a beam can only be focused within the near zone." },
    { id: "u06-o9", text: "Define the sound beam vocabulary: focus, focal point, focal zone, focal length/focal depth, beam diameter, aperture." },
    { id: "u06-o10", text: "Relate beam width to lateral resolution and explain where in the beam the image detail is best." }
  ],

  lessons: [
    {
      id: "u06-l1",
      title: "The hourglass: near zone, focus, far zone",
      objectives: ["u06-o1", "u06-o9"],
      html: `<p class="lead">Sound leaving a flat disc does not travel as a cylinder — it squeezes down to a waist and then flares out, like an hourglass lying on its side.</p>
<p>Three regions, and you must be able to draw and name all of them:</p>
<ul>
<li><span class="kw">Near zone</span> (also Fresnel zone, near field): from the face of the transducer to the narrowest point. The beam is <b>converging</b> the whole way. Its length is the <span class="kw-2">near-zone length</span>, NZL.</li>
<li><span class="kw">Focus</span> (focal point): the narrowest point of the beam. The distance from the transducer to the focus is the <span class="kw-2">focal length</span> or <span class="kw-2">focal depth</span>. The region around it where the beam stays usefully narrow is the <span class="kw-2">focal zone</span>.</li>
<li><span class="kw">Far zone</span> (also Fraunhofer zone, far field): everything past the focus. The beam <b>diverges</b> — it gets wider with depth, and there is nothing you can do about it once you are there.</li>
</ul>
<p>Two more words that get mixed up: <span class="kw-2">aperture</span> is the size of the active face producing the beam (for a single disc it is the element diameter; for an array it is the group of elements firing), and <span class="kw-2">beam diameter</span> or beam width is how wide the beam is at whatever depth you are asking about.</p>
<div class="callout key">For an unfocused disc, "near-zone length", "focal depth" and "focal length" are all the same distance — the distance to the natural focus. Focusing can shorten that distance, never lengthen it.</div>
<div class="callout tip">Dumb saying: "<b>F</b>resnel is <b>F</b>irst, <b>F</b>raunhofer is <b>F</b>ar." Two German names, one alphabet trick.</div>
<p>Why care? Because the beam width at a given depth is the machine's side-to-side blur at that depth. Narrow beam, crisp image; fat beam, smeared image. Everything else in this unit is about where that waist sits and how narrow you can make it.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>Hourglass-shaped beam with the near zone from the transducer to the focus and the diverging far zone beyond</title>
<rect x="46" y="100" width="18" height="60" fill="none" stroke="var(--c1)"/>
<path d="M 64 100 L 320 115 L 572 100" fill="none" stroke="var(--c2)"/>
<path d="M 64 160 L 320 145 L 572 160" fill="none" stroke="var(--c2)"/>
<path d="M 64 130 L 572 130" fill="none" stroke="var(--muted)"/>
<path d="M 320 108 L 320 152" fill="none" stroke="var(--c4)"/>
<text x="286" y="100" fill="currentColor" font-size="15">focus</text>
<path d="M 64 190 L 320 190" fill="none" stroke="var(--c3)"/>
<path d="M 74 184 L 62 190 L 74 196" fill="none" stroke="var(--c3)"/>
<path d="M 310 184 L 322 190 L 310 196" fill="none" stroke="var(--c3)"/>
<text x="90" y="212" fill="currentColor" font-size="15">near zone (Fresnel)</text>
<path d="M 320 190 L 572 190" fill="none" stroke="var(--c3)"/>
<path d="M 562 184 L 574 190 L 562 196" fill="none" stroke="var(--c3)"/>
<text x="356" y="212" fill="currentColor" font-size="15">far zone (Fraunhofer)</text>
<text x="86" y="236" fill="currentColor" font-size="15">converging</text>
<text x="380" y="236" fill="currentColor" font-size="15">diverging</text>
<text x="24" y="90" fill="currentColor" font-size="15">D</text>
<text x="40" y="34" fill="currentColor" font-size="15">Unfocused disc transducer: the beam has a waist</text>
</svg>`, caption: "Converge, waist, diverge. Learn to sketch this in five seconds." }
      ],
      sayIt: "Draw the hourglass out loud: name each zone, where the focus is, and what the beam is doing in each region.",
      keyPoints: [
        "Near zone = Fresnel zone: transducer face to focus; beam converging",
        "Focus (focal point) = narrowest point of the beam",
        "Focal length / focal depth = distance from transducer to focus",
        "Focal zone = the region around the focus where the beam stays narrow",
        "Far zone = Fraunhofer zone: beyond the focus; beam diverging",
        "Aperture = size of the active transducer face; beam diameter = width at a stated depth",
        "For an unfocused disc, NZL = focal depth"
      ]
    },
    {
      id: "u06-l2",
      title: "Huygens' principle: why there is an hourglass at all",
      objectives: ["u06-o6", "u06-o1"],
      html: `<p class="lead">The element does not emit one big wave — it emits millions of tiny ones that argue with each other, and the hourglass is the result of that argument.</p>
<p><span class="kw">Huygens' principle</span> says that every point on a vibrating surface behaves like its own tiny source, sending out a little spherical <span class="kw-2">wavelet</span>. The sound you actually measure at any point in the body is the <b>sum</b> of all those wavelets arriving there.</p>
<p>Where wavelets arrive in step (crest on crest), they <b>constructively interfere</b> and the sound is strong. Where they arrive out of step (crest on trough), they <b>destructively interfere</b> and cancel. Along the central axis, just in front of the disc, the path lengths from different parts of the element are unequal, which is why the near zone has a messy, blotchy pattern of intensity peaks and nulls — an important fact when you wonder why the very shallowest part of an image can look odd.</p>
<p>As you move away, the path-length differences shrink and the wavelets from the edges of the element pull the beam inward until, at one particular distance, everything is most nearly in step and the beam is narrowest: that is the natural focus. Past it, the geometry keeps going, the edges now pull the wavelets outward, and the beam spreads.</p>
<div class="callout tip">Dumb saying: "<b>H</b>uygens = <b>H</b>undreds of <b>H</b>umming sources." Drop a handful of pebbles into a puddle in a line and watch the little circles merge into one front — that is a beam being born.</div>
<div class="callout warn">Do not say the beam "bends" or "refracts" into the hourglass shape. Nothing is bending: interference of wavelets is simply strongest along a narrowing path.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>Each point of the element emits a circular wavelet and the wavelets add up into a narrowing beam</title>
<rect x="70" y="60" width="16" height="140" fill="none" stroke="var(--c1)"/>
<path d="M 86 72 A 46 46 0 0 1 86 164" fill="none" stroke="var(--c3)"/>
<path d="M 86 106 A 46 46 0 0 1 86 198" fill="none" stroke="var(--c3)"/>
<path d="M 86 88 A 66 66 0 0 1 86 220" fill="none" stroke="var(--c3)"/>
<path d="M 86 40 A 66 66 0 0 1 86 172" fill="none" stroke="var(--c3)"/>
<path d="M 86 60 L 360 110 L 560 90" fill="none" stroke="var(--c2)"/>
<path d="M 86 200 L 360 150 L 560 170" fill="none" stroke="var(--c2)"/>
<text x="150" y="36" fill="currentColor" font-size="15">wavelets from every point on the face</text>
<text x="230" y="208" fill="currentColor" font-size="15">they add up (constructive)</text>
<text x="230" y="232" fill="currentColor" font-size="15">and cancel (destructive)</text>
<text x="356" y="92" fill="currentColor" font-size="15">the sum is the beam</text>
</svg>`, caption: "Many little circles, one beam: interference makes the shape." }
      ],
      sayIt: "Explain Huygens' principle in your own words and say what interference has to do with the shape of the beam.",
      keyPoints: [
        "Every point on the element face acts as a separate tiny sound source (a wavelet)",
        "The beam is the sum of all the wavelets: constructive where in step, destructive where out of step",
        "Interference — not bending or refraction — creates the hourglass",
        "The near zone has an uneven, blotchy intensity pattern because path lengths differ",
        "The narrowest point (focus) is where the wavelets are most nearly in step"
      ]
    },
    {
      id: "u06-l3",
      title: "Near-zone length: the one calculation of this unit",
      objectives: ["u06-o2"],
      html: `<p class="lead">How deep the natural focus sits depends on only two things: how wide the element is, and the wavelength.</p>
<div class="formula">near-zone length = D² ÷ (4 × λ)</div>
<div class="formula">near-zone length (mm) = D(mm)² × f(MHz) ÷ 6</div>
<p>D is the transducer <b>diameter</b> (the aperture), λ is the wavelength. The second version is the same equation with soft tissue built in: λ = 1.54 ÷ f in mm, so 4λ = 6.16 ÷ f, and dividing by 6 is close enough for any exam answer.</p>
<div class="callout warn">Units are the trap, not the algebra. The shortcut only works with <b>D in millimetres</b> and <b>f in megahertz</b>, and it gives the answer <b>in millimetres</b>. If a question hands you centimetres, convert first (1 cm = 10 mm) and divide the answer by 10 at the end to report centimetres.</div>
<p><b>Worked example 1.</b> D = 10 mm, f = 5 MHz. NZL = 10² × 5 ÷ 6 = 100 × 5 ÷ 6 = <b>83 mm ≈ 8.3 cm</b>. With the exact version: λ = 1.54 ÷ 5 = 0.308 mm, NZL = 100 ÷ 1.232 = 81 mm. Same answer to within a couple of percent.</p>
<p><b>Worked example 2.</b> D = 6 mm, λ = 0.5 mm. NZL = 36 ÷ (4 × 0.5) = 36 ÷ 2 = <b>18 mm</b>.</p>
<p>Notice what the squares do. Diameter is squared, so <b>doubling the diameter multiplies NZL by four</b>. Frequency is not squared, so doubling frequency only doubles NZL. Diameter is the stronger lever — and neither is under the sonographer's thumb on a single-element probe; both are chosen by the manufacturer, or by the machine when it picks an aperture on an array.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>Near-zone length measured from the transducer face to the focus, with the two formulas</title>
<rect x="46" y="80" width="18" height="70" fill="none" stroke="var(--c1)"/>
<path d="M 64 80 L 300 108" fill="none" stroke="var(--c2)"/>
<path d="M 64 150 L 300 122" fill="none" stroke="var(--c2)"/>
<path d="M 300 108 L 520 84" fill="none" stroke="var(--c2)"/>
<path d="M 300 122 L 520 146" fill="none" stroke="var(--c2)"/>
<path d="M 64 178 L 300 178" fill="none" stroke="var(--c3)"/>
<path d="M 74 172 L 62 178 L 74 184" fill="none" stroke="var(--c3)"/>
<path d="M 290 172 L 302 178 L 290 184" fill="none" stroke="var(--c3)"/>
<text x="110" y="200" fill="currentColor" font-size="15">near-zone length</text>
<path d="M 34 80 L 34 150" fill="none" stroke="var(--c4)"/>
<text x="16" y="72" fill="currentColor" font-size="15">D</text>
<text x="320" y="58" fill="currentColor" font-size="16">NZL = D² ÷ (4λ)</text>
<text x="320" y="84" fill="currentColor" font-size="16">= D(mm)² × f(MHz) ÷ 6</text>
<text x="320" y="176" fill="currentColor" font-size="15">10 mm disc at 5 MHz:</text>
<text x="320" y="198" fill="currentColor" font-size="15">100 × 5 ÷ 6 = 83 mm</text>
</svg>`, caption: "Two forms of one equation. Diameter is squared; frequency is not." }
      ],
      sayIt: "Write both near-zone length formulas from memory, then do it: a 6 mm probe at 3 MHz — how deep is the focus?",
      keyPoints: [
        "NZL = D² ÷ (4λ)",
        "Shortcut: NZL in mm = D in mm squared × f in MHz ÷ 6",
        "Units: mm and MHz in, mm out — convert cm before using the shortcut",
        "Doubling the diameter quadruples the NZL (D is squared)",
        "Doubling the frequency doubles the NZL",
        "For an unfocused probe, NZL is the depth of the natural focus"
      ]
    },
    {
      id: "u06-l4",
      title: "How wide is the beam at each depth?",
      objectives: ["u06-o3", "u06-o9"],
      html: `<p class="lead">Three beam widths are worth memorizing, and they are all expressed in terms of the transducer diameter.</p>
<table class="dt"><tr><th>Depth</th><th>Beam diameter</th></tr>
<tr><td>At the transducer face</td><td>equal to the transducer diameter, D</td></tr>
<tr><td>At the focus (one near-zone length)</td><td><b>one half</b> of D</td></tr>
<tr><td>At two near-zone lengths</td><td>equal to D again</td></tr>
<tr><td>Deeper than two near-zone lengths</td><td>wider than D, and growing</td></tr>
</table>
<p>Read the middle two rows as a single sentence: <b>half at the focus, whole at double.</b> That one phrase answers a surprising number of exam questions, and it is also the reason the far zone is where images look soft.</p>
<p><b>Worked example.</b> A 12 mm unfocused disc runs at 4 MHz. NZL = 144 × 4 ÷ 6 = 96 mm. So at 96 mm deep the beam is about 6 mm across; at 192 mm deep it is back to about 12 mm; at 20 mm deep (in the near zone) it is somewhere between 12 and 6 mm and the intensity pattern there is uneven.</p>
<div class="callout key">Beam diameter at the focus of an unfocused disc = D ÷ 2. It does not depend on frequency. Frequency moves the focus deeper or shallower; it does not change the width at the waist.</div>
<div class="callout tip">Whiteboard drill: draw the hourglass, then label D at the face, D/2 at the waist, D at twice the waist depth. If you can label those three points you can answer any "how wide is the beam" question.</div>
<p>Beam width matters because it is the width of the machine's paintbrush. Two reflectors side by side closer together than the beam width get painted as one blob, which is exactly the definition of lateral resolution — covered in detail in the resolution unit, but born here.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>Beam diameter equals D at the face, half of D at the focus, and D again at two near-zone lengths</title>
<rect x="46" y="90" width="16" height="72" fill="none" stroke="var(--c1)"/>
<path d="M 62 90 L 310 117 L 558 90" fill="none" stroke="var(--c2)"/>
<path d="M 62 162 L 310 135 L 558 162" fill="none" stroke="var(--c2)"/>
<path d="M 30 90 L 30 162" fill="none" stroke="var(--c4)"/>
<text x="14" y="82" fill="currentColor" font-size="15">D</text>
<path d="M 310 117 L 310 135" fill="none" stroke="var(--c4)"/>
<text x="282" y="106" fill="currentColor" font-size="15">D ÷ 2</text>
<path d="M 558 90 L 558 162" fill="none" stroke="var(--c4)"/>
<text x="546" y="82" fill="currentColor" font-size="15">D</text>
<path d="M 62 192 L 310 192" fill="none" stroke="var(--c3)"/>
<path d="M 72 186 L 60 192 L 72 198" fill="none" stroke="var(--c3)"/>
<path d="M 300 186 L 312 192 L 300 198" fill="none" stroke="var(--c3)"/>
<text x="130" y="214" fill="currentColor" font-size="15">1 NZL (focus)</text>
<path d="M 310 192 L 558 192" fill="none" stroke="var(--c3)"/>
<path d="M 548 186 L 560 192 L 548 198" fill="none" stroke="var(--c3)"/>
<text x="396" y="214" fill="currentColor" font-size="15">2 NZL</text>
<text x="150" y="240" fill="currentColor" font-size="15">half at the focus, whole at double</text>
</svg>`, caption: "D at the face, D/2 at the waist, D again at twice the near-zone length." }
      ],
      sayIt: "State the beam diameter at the transducer face, at the focus, and at two near-zone lengths, using D.",
      keyPoints: [
        "Beam diameter at the face = transducer diameter D",
        "Beam diameter at the focus = D ÷ 2 (the narrowest it gets)",
        "Beam diameter at 2 near-zone lengths = D again",
        "Beyond 2 NZL the beam is wider than the transducer and keeps spreading",
        "Width at the focus does not depend on frequency for an unfocused disc",
        "Beam width is the side-to-side blur: it sets lateral resolution"
      ]
    }
,
    {
      id: "u06-l5",
      title: "Change the diameter: the strongest lever",
      objectives: ["u06-o4"],
      html: `<p class="lead">A wide transducer throws a long, well-behaved beam; a narrow one focuses close and then sprays.</p>
<p>Start from NZL = D² ÷ (4λ) and just read it. Diameter is squared, so:</p>
<ul>
<li><b>Larger diameter →</b> longer near zone (focus deeper), <b>less</b> divergence in the far zone, but a <b>wider</b> beam at the focus (half of a bigger D) and a wider footprint on the skin.</li>
<li><b>Smaller diameter →</b> shorter near zone (focus shallow), <b>more</b> divergence in the far zone, but a <b>narrower</b> beam at the focus.</li>
</ul>
<p><b>Worked example.</b> At 5 MHz a 10 mm disc has NZL = 100 × 5 ÷ 6 ≈ 83 mm. Widen it to 20 mm and NZL = 400 × 5 ÷ 6 ≈ 333 mm: four times the diameter effect for double the width, because of the square.</p>
<p>Divergence works the other way round from near-zone length, and the ratio that controls it is wavelength divided by diameter. Big aperture and short wavelength keep the beam tight; a tiny aperture radiating a long wavelength spreads almost like a point source. That is the same physics as a flashlight with a big reflector versus a bare bulb.</p>
<div class="callout key">Bigger D: NZL up (by the square), divergence down, focal beam width up. Smaller D: NZL down, divergence up, focal beam width down.</div>
<div class="callout warn">Classic trap: "A larger diameter transducer produces a narrower beam." Narrower <i>where</i>? In the far zone, yes — it diverges less. At the focus, no — the waist is half of a bigger diameter, so it is actually wider.</div>
<p>Who controls it? On a single-element probe, the manufacturer. On an array, the machine chooses how many elements fire together, which is the <span class="kw-2">aperture</span>, and it can enlarge the aperture with depth (dynamic aperture) precisely to keep the beam from spreading deep in the image.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A small diameter transducer has a short near zone and diverges; a large diameter transducer has a long near zone and stays narrow</title>
<rect x="44" y="52" width="14" height="36" fill="none" stroke="var(--c1)"/>
<path d="M 58 52 L 190 64 L 470 34" fill="none" stroke="var(--c2)"/>
<path d="M 58 88 L 190 76 L 470 106" fill="none" stroke="var(--c2)"/>
<path d="M 190 62 L 190 78" fill="none" stroke="var(--c4)"/>
<text x="40" y="30" fill="currentColor" font-size="15">Small D: short near zone, wide spread</text>
<text x="482" y="76" fill="currentColor" font-size="15">far zone</text>
<rect x="44" y="176" width="14" height="72" fill="none" stroke="var(--c1)"/>
<path d="M 58 176 L 400 202 L 560 186" fill="none" stroke="var(--c3)"/>
<path d="M 58 248 L 400 222 L 560 238" fill="none" stroke="var(--c3)"/>
<path d="M 400 200 L 400 224" fill="none" stroke="var(--c4)"/>
<text x="40" y="154" fill="currentColor" font-size="15">Large D: long near zone, little spread</text>
<text x="160" y="106" fill="currentColor" font-size="15">focus is shallow</text>
<text x="330" y="256" fill="currentColor" font-size="15">focus is deep</text>
<text x="40" y="128" fill="currentColor" font-size="15">NZL = D² ÷ (4λ) — D is squared</text>
</svg>`, caption: "Double the diameter, quadruple the near-zone length, and the far zone stays tight." }
      ],
      sayIt: "Say what happens to near-zone length, far-zone divergence and beam width at the focus when the transducer diameter is doubled.",
      keyPoints: [
        "NZL = D² ÷ (4λ): diameter is squared, so it is the strongest lever",
        "Double D → NZL × 4",
        "Larger D → less divergence in the far zone",
        "Larger D → wider beam at the focus (D ÷ 2 of a bigger D)",
        "Smaller D → shallow focus, narrow waist, rapid divergence",
        "On arrays the machine sets the aperture and can grow it with depth"
      ]
    },
    {
      id: "u06-l6",
      title: "Change the frequency: shorter waves stay together",
      objectives: ["u06-o5"],
      html: `<p class="lead">Raise the frequency and the wavelength shrinks, which pushes the natural focus deeper and keeps the far zone tidier.</p>
<p>Wavelength sits in the denominator of the near-zone formula, and in soft tissue λ = 1.54 ÷ f (mm, with f in MHz). So for an unfocused disc:</p>
<ul>
<li><b>Higher frequency →</b> shorter wavelength → <b>longer</b> near-zone length (focus deeper) and <b>less</b> divergence in the far zone.</li>
<li><b>Lower frequency →</b> longer wavelength → <b>shorter</b> near-zone length (focus shallower) and <b>more</b> divergence.</li>
</ul>
<p><b>Worked example.</b> A 10 mm disc at 2 MHz: NZL = 100 × 2 ÷ 6 ≈ 33 mm. The same probe at 8 MHz: NZL = 100 × 8 ÷ 6 ≈ 133 mm. Four times the frequency, four times the depth of the focus — a straight proportion, unlike diameter which is squared.</p>
<div class="callout warn">This is the one place where "higher frequency" does <i>not</i> mean "shallower". High frequency loses <b>penetration</b> because attenuation grows with frequency — that is a separate fact from unit 4. Beam geometry and attenuation are two different stories, and exam questions love to blur them: the natural focus of a higher-frequency beam is deeper, even though you may never get enough signal back from there.</div>
<div class="callout key">Higher f → shorter λ → longer NZL → less divergence. Beam width at the focus stays D ÷ 2 regardless of frequency.</div>
<p>Who controls it? On a multi-frequency probe the sonographer picks the transmit frequency, so this one is genuinely adjustable at the keyboard — but remember the price: better axial resolution and a tighter beam, less penetration.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A low frequency beam focuses shallow and diverges; the same transducer at high frequency focuses deeper and stays narrow</title>
<rect x="44" y="46" width="14" height="60" fill="none" stroke="var(--c1)"/>
<path d="M 58 46 L 200 68 L 470 22" fill="none" stroke="var(--c2)"/>
<path d="M 58 106 L 200 84 L 470 130" fill="none" stroke="var(--c2)"/>
<path d="M 200 66 L 200 86" fill="none" stroke="var(--c4)"/>
<text x="40" y="26" fill="currentColor" font-size="15">2 MHz, 10 mm disc: NZL ≈ 33 mm</text>
<text x="482" y="80" fill="currentColor" font-size="15">spreads</text>
<rect x="44" y="180" width="14" height="60" fill="none" stroke="var(--c3)"/>
<path d="M 58 180 L 430 202 L 560 192" fill="none" stroke="var(--c3)"/>
<path d="M 58 240 L 430 218 L 560 228" fill="none" stroke="var(--c3)"/>
<path d="M 430 200 L 430 220" fill="none" stroke="var(--c4)"/>
<text x="40" y="160" fill="currentColor" font-size="15">8 MHz, same disc: NZL ≈ 133 mm</text>
<text x="240" y="258" fill="currentColor" font-size="15">shorter λ keeps the wavelets in step for longer</text>
<text x="40" y="140" fill="currentColor" font-size="15">λ = 1.54 ÷ f, and λ is under the line in D² ÷ (4λ)</text>
</svg>`, caption: "Shorter wavelength, deeper natural focus, less spread — but less penetration." }
      ],
      sayIt: "Say what higher frequency does to wavelength, near-zone length, divergence and penetration — four answers.",
      keyPoints: [
        "λ = 1.54 mm/µs ÷ f(MHz) in soft tissue",
        "Higher frequency → shorter wavelength → longer near-zone length",
        "Higher frequency → less divergence in the far zone",
        "NZL is directly proportional to frequency (not squared)",
        "Beam width at the focus stays D ÷ 2 whatever the frequency",
        "Higher frequency costs penetration (attenuation), a separate issue from beam shape"
      ]
    },
    {
      id: "u06-l7",
      title: "Three ways to focus a beam",
      objectives: ["u06-o7"],
      html: `<p class="lead">Every focusing method does the same trick: make the sound from the edges of the aperture arrive at the target at the same moment as the sound from the middle.</p>
<table class="dt"><tr><th>Method</th><th>How</th><th>Adjustable?</th></tr>
<tr><td><span class="kw">External focusing</span></td><td>A curved acoustic <b>lens</b> glued to the front of a flat element. The lens slows (or speeds) the edges of the wavefront.</td><td>No — fixed at manufacture</td></tr>
<tr><td><span class="kw">Internal focusing</span></td><td>The <b>element itself is curved</b> (concave, bowl-shaped), so the edges are physically closer to the focus.</td><td>No — fixed at manufacture</td></tr>
<tr><td><span class="kw">Electronic (phased) focusing</span></td><td>An <b>array</b> fires its outer elements first and its central elements last. The curved wavefront that results converges.</td><td><b>Yes</b> — the machine or sonographer can change it, even multiple focal zones</td></tr>
</table>
<p>The first two are <span class="kw-2">fixed focus</span>: the only way to change the focal depth is to pick up a different probe. The third is <span class="kw-2">adjustable</span>, which is why nearly every modern probe is an array: you move the little focal marker on the screen and the transmit delays are recalculated. On receive, the system can even refocus continuously as echoes come back from deeper and deeper (dynamic receive focusing).</p>
<p>Note that a phased array probe usually also has a lens for the slice-thickness direction, so a real probe can be focused electronically in one plane and mechanically in the other.</p>
<div class="callout tip">Dumb saying: "<b>L</b>ens is on the <b>L</b>id, the <b>C</b>urve is in the <b>C</b>rystal, the <b>P</b>hase is in the <b>P</b>rogram." Outside, inside, in the machine.</div>
<div class="callout warn">Do not confuse focusing with steering. Delays that are symmetrical (outside first, middle last) focus the beam; delays that ramp across the array in one direction steer it.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>Three focusing methods: external lens, internally curved element and electronic phased delays</title>
<rect x="40" y="60" width="16" height="80" fill="none" stroke="var(--c1)"/>
<path d="M 56 60 q 26 40 0 80" fill="none" stroke="var(--c2)"/>
<path d="M 82 66 L 150 100 L 82 134" fill="none" stroke="var(--c3)"/>
<text x="30" y="46" fill="currentColor" font-size="15">External: lens</text>
<text x="34" y="176" fill="currentColor" font-size="15">fixed focus</text>
<path d="M 240 60 q 26 40 0 80" fill="none" stroke="var(--c1)"/>
<path d="M 266 66 L 334 100 L 266 134" fill="none" stroke="var(--c3)"/>
<text x="210" y="46" fill="currentColor" font-size="15">Internal: curved element</text>
<text x="228" y="176" fill="currentColor" font-size="15">fixed focus</text>
<rect x="430" y="56" width="16" height="14" fill="none" stroke="var(--c1)"/>
<rect x="430" y="74" width="16" height="14" fill="none" stroke="var(--c1)"/>
<rect x="430" y="92" width="16" height="14" fill="none" stroke="var(--c1)"/>
<rect x="430" y="110" width="16" height="14" fill="none" stroke="var(--c1)"/>
<rect x="430" y="128" width="16" height="14" fill="none" stroke="var(--c1)"/>
<path d="M 456 58 L 476 62 L 486 76 L 486 122 L 476 136 L 456 140" fill="none" stroke="var(--c4)"/>
<path d="M 500 70 L 546 99 L 500 128" fill="none" stroke="var(--c3)"/>
<text x="400" y="46" fill="currentColor" font-size="15">Electronic: phase delays</text>
<text x="398" y="176" fill="currentColor" font-size="15">adjustable focus</text>
<text x="400" y="198" fill="currentColor" font-size="15">outer elements fire first</text>
<text x="34" y="222" fill="currentColor" font-size="15">All three make the edges of the wavefront arrive with the middle</text>
</svg>`, caption: "Lens outside, curve inside, delays in the software — only the last one is adjustable." }
      ],
      sayIt: "Name the three focusing methods, say how each one works, and say which can be changed during a scan.",
      keyPoints: [
        "External focusing = acoustic lens in front of a flat element; fixed",
        "Internal focusing = curved (concave) element; fixed",
        "Electronic/phased focusing = array with timed delays, outer elements fired first; adjustable",
        "Fixed focus can only be changed by changing probes",
        "Electronic focusing allows multiple transmit focal zones and dynamic receive focusing",
        "Symmetrical delays focus; ramped delays steer"
      ]
    },
    {
      id: "u06-l8",
      title: "What focusing actually buys you (and what it costs)",
      objectives: ["u06-o8", "u06-o10"],
      html: `<p class="lead">Focusing does not add energy — it moves it. You get a narrower waist, closer to the probe, at the price of a faster spread afterwards.</p>
<p>Compare a focused beam with the same transducer unfocused:</p>
<table class="dt"><tr><th>Quantity</th><th>Focused vs unfocused</th></tr>
<tr><td>Focal depth (distance to the focus)</td><td>shorter — the focus moves <b>closer</b> to the probe</td></tr>
<tr><td>Beam diameter at the focus</td><td><b>narrower</b> than D ÷ 2</td></tr>
<tr><td>Intensity at the focus</td><td>higher (same energy through a smaller area)</td></tr>
<tr><td>Divergence beyond the focus</td><td><b>greater</b> — it flares faster</td></tr>
<tr><td>Beam width in the deep far zone</td><td>worse than the unfocused beam</td></tr>
</table>
<div class="callout key">You can only focus <b>within the near zone</b> — at a depth shallower than the natural focus. No lens, curve or delay scheme can push the focus deeper than the unfocused NZL. That is why the answer to "can I focus at 20 cm with this probe?" is often simply no.</div>
<p>The reason to accept the trade is <span class="kw">lateral resolution</span>. Lateral resolution equals the beam width at that depth, so the narrowest part of the beam gives the best side-by-side detail. Put the focal marker at the depth of the structure you care about and it sharpens; everything much deeper gets slightly worse. The <span class="kw-2">focal zone</span> — the region around the focus where the beam stays narrow — is the part of the image you should trust most.</p>
<div class="callout tip">Dumb saying: "Focus = <b>S</b>hallower, <b>S</b>kinnier, <b>S</b>assier spread." Shallower focus, skinnier waist, sassier divergence beyond.</div>
<p>Who controls it? The sonographer, on an electronically focused array: move the focus, or turn on multiple focal zones (which costs frame rate, since each zone needs its own transmit pulse per scan line).</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>An unfocused beam compared with a focused beam that narrows sooner and diverges faster</title>
<rect x="44" y="96" width="14" height="72" fill="none" stroke="var(--c1)"/>
<path d="M 58 96 L 400 122 L 560 106" fill="none" stroke="var(--muted)"/>
<path d="M 58 168 L 400 142 L 560 158" fill="none" stroke="var(--muted)"/>
<path d="M 58 96 L 230 128 L 560 66" fill="none" stroke="var(--c2)"/>
<path d="M 58 168 L 230 136 L 560 198" fill="none" stroke="var(--c2)"/>
<path d="M 230 126 L 230 138" fill="none" stroke="var(--c4)"/>
<text x="150" y="88" fill="currentColor" font-size="15">focused: narrow waist, shallower</text>
<text x="330" y="112" fill="currentColor" font-size="15">unfocused (grey)</text>
<text x="420" y="230" fill="currentColor" font-size="15">focused beam spreads more</text>
<text x="44" y="40" fill="currentColor" font-size="15">Same transducer, two beams</text>
<text x="44" y="62" fill="currentColor" font-size="15">Focusing only works inside the near zone</text>
<text x="188" y="164" fill="currentColor" font-size="15">best lateral resolution here</text>
</svg>`, caption: "Focusing trades depth of focus and far-field width for a narrower waist where you need it." }
      ],
      sayIt: "Compare a focused and an unfocused beam on four properties, and say why you cannot focus in the far zone.",
      keyPoints: [
        "Focusing moves the focus closer to the transducer (shorter focal depth)",
        "Beam is narrower at the focus than D ÷ 2, and intensity there is higher",
        "Divergence beyond the focus increases; the deep far field is worse",
        "Focusing is possible only within the near zone — never deeper than the natural focus",
        "Lateral resolution = beam width, so it is best at the focus / focal zone",
        "Electronic focusing is adjustable; multiple focal zones cost frame rate"
      ]
    }
  ],

  mnemonics: [
    { saying: "Fresnel is First, Fraunhofer is Far", meaning: "Fresnel zone = near zone (transducer to focus, beam converging). Fraunhofer zone = far zone (beyond the focus, beam diverging).", lesson: "u06-l1" },
    { saying: "Half at the focus, whole at double", meaning: "Beam diameter is half the transducer diameter at the focus, and equal to the transducer diameter again at two near-zone lengths.", lesson: "u06-l4" },
    { saying: "D squared, times f, divided by six", meaning: "The near-zone length shortcut: NZL in mm = D(mm)² × f(MHz) ÷ 6. Chant it while writing the units — mm and MHz in, mm out.", lesson: "u06-l3" },
    { saying: "Big Disc Beams Better and Deeper", meaning: "Larger diameter → longer near-zone length (deeper focus) and less far-zone divergence. But the waist is wider, because it is half of a bigger D.", lesson: "u06-l5" },
    { saying: "High frequency flies further before it flares", meaning: "Higher frequency → shorter wavelength → longer near-zone length and less divergence. Penetration is a separate story and gets worse.", lesson: "u06-l6" },
    { saying: "Huygens = Hundreds of Humming sources", meaning: "Every point on the element face sends out its own wavelet; the beam is what is left after all of them interfere constructively and destructively.", lesson: "u06-l2" },
    { saying: "Lens on the Lid, Curve in the Crystal, Phase in the Program", meaning: "The three focusing methods: external (lens on the front), internal (curved element), electronic (timed delays in the machine). Only the last one is adjustable.", lesson: "u06-l7" },
    { saying: "Focus = Shallower, Skinnier, Sassier spread", meaning: "Focusing shortens the focal depth, narrows the beam at the focus, and makes it diverge faster beyond the focus.", lesson: "u06-l8" },
    { saying: "You can't focus where you've never been narrow", meaning: "Focusing only works inside the near zone. No focusing method can move the focus deeper than the unfocused near-zone length.", lesson: "u06-l8" }
  ],

  formulas: [
    { name: "Near-zone length (Fresnel zone length)", expr: "NZL = D² ÷ (4 × λ)", units: "same length unit as D and λ", note: "D = transducer diameter (aperture). Also equals the focal depth of an unfocused disc." },
    { name: "Near-zone length shortcut (soft tissue)", expr: "NZL (mm) = D(mm)² × f(MHz) ÷ 6", units: "mm", note: "Built from λ = 1.54 ÷ f; 4λ = 6.16 ÷ f, rounded to 6. Convert cm to mm before using it." },
    { name: "Wavelength in soft tissue", expr: "λ (mm) = 1.54 ÷ f (MHz)", units: "mm", note: "Needed whenever the question gives frequency but the formula wants wavelength." },
    { name: "Beam diameter at the focus (unfocused disc)", expr: "beam diameter = D ÷ 2", units: "mm", note: "Independent of frequency. The narrowest the beam ever gets." },
    { name: "Beam diameter at two near-zone lengths", expr: "beam diameter = D", units: "mm", note: "Back to the transducer diameter, and still widening beyond that." },
    { name: "Effect of diameter on near-zone length", expr: "NZL ∝ D²", units: "—", note: "Double the diameter → four times the near-zone length." },
    { name: "Effect of frequency on near-zone length", expr: "NZL ∝ f", units: "—", note: "Double the frequency → double the near-zone length (λ is halved)." },
    { name: "Lateral resolution", expr: "lateral resolution = beam diameter at that depth", units: "mm", note: "Smaller number = better. Best at the focus; developed fully in the resolution unit." }
  ],

  keyNumbers: [
    { fact: "Speed of sound in soft tissue", value: "1,540 m/s = 1.54 mm/µs" },
    { fact: "Wavelength in soft tissue at 5 MHz", value: "0.308 mm (λ = 1.54 ÷ f)" },
    { fact: "Beam diameter at the focus of an unfocused disc", value: "one half of the transducer diameter" },
    { fact: "Beam diameter at two near-zone lengths", value: "equal to the transducer diameter" },
    { fact: "Near-zone length of a 10 mm, 5 MHz disc", value: "≈ 83 mm (8.3 cm)" },
    { fact: "Near-zone length of a 20 mm, 5 MHz disc", value: "≈ 333 mm — doubling D quadruples NZL" },
    { fact: "Constant in the NZL shortcut", value: "6 (from 4 × 1.54 ≈ 6.16), with D in mm and f in MHz" },
    { fact: "Another name for the near zone", value: "Fresnel zone / near field" },
    { fact: "Another name for the far zone", value: "Fraunhofer zone / far field" },
    { fact: "Focusing methods", value: "3 — external lens, internal curved element, electronic (phased)" },
    { fact: "Deepest possible focal depth with focusing", value: "the unfocused near-zone length (you can only focus shallower)" }
  ],

  flashcards: [
    { front: "Near zone (other names)", back: "Fresnel zone, near field: transducer face to focus; beam converging", lesson: "u06-l1" },
    { front: "Fresnel zone", back: "The near zone — from the transducer to the focus", lesson: "u06-l1" },
    { front: "Far zone (other names)", back: "Fraunhofer zone, far field: beyond the focus; beam diverging", lesson: "u06-l1" },
    { front: "Fraunhofer zone", back: "The far zone — everything deeper than the focus", lesson: "u06-l1" },
    { front: "Focus / focal point", back: "The narrowest point of the beam", lesson: "u06-l1" },
    { front: "Focal length / focal depth", back: "Distance from the transducer to the focus", lesson: "u06-l1" },
    { front: "Focal zone", back: "The region around the focus where the beam stays narrow", lesson: "u06-l1" },
    { front: "Aperture", back: "The size of the active transducer face producing the beam (diameter, or the group of firing elements)", lesson: "u06-l1" },
    { front: "Huygens' principle", back: "Every point on the element face is a tiny sound source; the beam is the interference sum of all those wavelets", lesson: "u06-l2" },
    { front: "Why is the near zone's intensity blotchy?", back: "Unequal path lengths from different parts of the element cause peaks and nulls of interference", lesson: "u06-l2" },
    { front: "Near-zone length formula", back: "NZL = D² ÷ (4λ)", lesson: "u06-l3" },
    { front: "Near-zone length shortcut", back: "NZL (mm) = D(mm)² × f(MHz) ÷ 6", lesson: "u06-l3" },
    { front: "Units for the NZL shortcut", back: "D in mm, f in MHz, answer in mm", lesson: "u06-l3" },
    { front: "Wavelength in soft tissue", back: "λ (mm) = 1.54 ÷ f (MHz)", lesson: "u06-l3" },
    { front: "Doubling the transducer diameter does what to NZL?", back: "Multiplies it by 4 (D is squared)", lesson: "u06-l5" },
    { front: "Doubling the frequency does what to NZL?", back: "Doubles it (λ is halved)", lesson: "u06-l6" },
    { front: "Beam diameter at the transducer face", back: "Equal to the transducer diameter, D", lesson: "u06-l4" },
    { front: "Beam diameter at the focus", back: "One half of the transducer diameter (D ÷ 2)", lesson: "u06-l4" },
    { front: "Beam diameter at 2 near-zone lengths", back: "Equal to the transducer diameter, D", lesson: "u06-l4" },
    { front: "Does frequency change the beam width at the focus?", back: "No — for an unfocused disc it stays D ÷ 2; frequency moves the focus instead", lesson: "u06-l4" },
    { front: "Larger diameter transducer", back: "Longer NZL (deeper focus), less far-zone divergence, wider beam at the focus", lesson: "u06-l5" },
    { front: "Smaller diameter transducer", back: "Shorter NZL (shallow focus), more divergence, narrower beam at the focus", lesson: "u06-l5" },
    { front: "Higher frequency (unfocused disc)", back: "Shorter λ → longer NZL, less divergence — but less penetration", lesson: "u06-l6" },
    { front: "Lower frequency (unfocused disc)", back: "Longer λ → shorter NZL, more divergence", lesson: "u06-l6" },
    { front: "External focusing", back: "Acoustic lens on the front of a flat element; fixed focus", lesson: "u06-l7" },
    { front: "Internal focusing", back: "Curved (concave) element; fixed focus", lesson: "u06-l7" },
    { front: "Electronic (phased) focusing", back: "Array fires outer elements first; adjustable focus, multiple focal zones", lesson: "u06-l7" },
    { front: "Which focusing methods are fixed?", back: "External (lens) and internal (curved element) — change the probe to change the focus", lesson: "u06-l7" },
    { front: "Focusing does what to focal depth?", back: "Shortens it — the focus moves closer to the transducer", lesson: "u06-l8" },
    { front: "Focusing does what beyond the focus?", back: "Increases divergence; the deep far field is wider than unfocused", lesson: "u06-l8" },
    { front: "Can you focus in the far zone?", back: "No — focusing works only within the near zone, shallower than the natural focus", lesson: "u06-l8" },
    { front: "Lateral resolution equals…", back: "The beam diameter at that depth — smallest (best) at the focus", lesson: "u06-l8" },
    { front: "Where is the image laterally sharpest?", back: "At the focus / within the focal zone", lesson: "u06-l8" },
    { front: "Cost of multiple transmit focal zones", back: "Lower frame rate (a separate pulse per zone per scan line)", lesson: "u06-l8" },
    { front: "Beam shape of an unfocused disc, in one word", back: "Hourglass: converge, waist, diverge", lesson: "u06-l1" },
    { front: "What controls far-zone divergence?", back: "Wavelength ÷ diameter: big aperture and short wavelength → little spread", lesson: "u06-l5" }
  ],

  questions: [
    { id: "u06-q1", type: "mc", q: "The region of the beam extending from the transducer face to the focus is called the:", choices: ["Fraunhofer zone", "Fresnel zone", "Focal zone", "Divergent zone"], answer: 1,
      explain: "Fresnel zone = near zone = transducer to focus, where the beam converges. Fraunhofer is the tempting look-alike but it is the far zone, past the focus. The focal zone is only the short region surrounding the focus itself.",
      objectives: ["u06-o1"], lesson: "u06-l1", level: 1 },
    { id: "u06-q2", type: "mc", q: "Another name for the far zone is the:", choices: ["Fresnel zone", "Fraunhofer zone", "Near field", "Aperture"], answer: 1,
      explain: "The far zone is the Fraunhofer zone, where the beam diverges. Fresnel and near field both name the opposite region, and aperture is the size of the transducer face, not a region of the beam.",
      objectives: ["u06-o1"], lesson: "u06-l1", level: 1 },
    { id: "u06-q3", type: "short", q: "What is the name of the region between the transducer and the focus?", answer: "near zone", accept: ["near zone", "the near zone", "fresnel zone", "near field", "fresnel"],
      explain: "Near zone, Fresnel zone and near field are the same thing: the converging part of the beam, whose length is the near-zone length.",
      objectives: ["u06-o1"], lesson: "u06-l1", level: 1 },
    { id: "u06-q4", type: "tf", q: "In the near zone the beam is diverging.", answer: false,
      explain: "False. The beam converges (narrows) all the way through the near zone and only starts diverging after the focus, in the far zone.",
      objectives: ["u06-o1"], lesson: "u06-l1", level: 2 },
    { id: "u06-q5", type: "mc", q: "An unfocused 10 mm diameter transducer operates at 5 MHz in soft tissue. Approximately how deep is its focus?", choices: ["8 mm", "17 mm", "83 mm", "250 mm"], answer: 2,
      explain: "NZL = D² × f ÷ 6 = 100 × 5 ÷ 6 ≈ 83 mm. The tempting 8 mm comes from forgetting to square the diameter (10 × 5 ÷ 6). Squaring the diameter is the whole point of the formula.",
      objectives: ["u06-o2"], lesson: "u06-l3", level: 3 },
    { id: "u06-q6", type: "mc", q: "A transducer has a diameter of 8 mm and produces a wavelength of 0.4 mm. What is the near-zone length?", choices: ["40 mm", "20 mm", "160 mm", "5 mm"], answer: 0,
      explain: "NZL = D² ÷ (4λ) = 64 ÷ (4 × 0.4) = 64 ÷ 1.6 = 40 mm. The trap answer 160 mm comes from dividing by λ alone and forgetting the 4.",
      objectives: ["u06-o2"], lesson: "u06-l3", level: 3 },
    { id: "u06-q7", type: "short", q: "In the shortcut NZL = D² × f ÷ 6, what unit must the diameter be in?", answer: "millimeters", accept: ["millimeters", "millimetres", "mm", "millimeter", "millimetre"],
      explain: "The 6 comes from 4 × 1.54, so the shortcut works only with D in mm and f in MHz, and it returns millimetres. Plug in centimetres and the answer is off by a factor of ten.",
      objectives: ["u06-o2"], lesson: "u06-l3", level: 2 },
    { id: "u06-q8", type: "mc", q: "At the focus, the diameter of the beam from an unfocused disc transducer is:", choices: ["Equal to the transducer diameter", "One half the transducer diameter", "One quarter the transducer diameter", "Twice the transducer diameter"], answer: 1,
      explain: "The waist is half the transducer diameter. 'Equal to the transducer diameter' is true at the face and again at two near-zone lengths, which is why it is such a popular wrong answer.",
      objectives: ["u06-o3"], lesson: "u06-l4", level: 2 },
    { id: "u06-q9", type: "mc", q: "At a depth of two near-zone lengths, the beam diameter is:", choices: ["Half the transducer diameter", "Equal to the transducer diameter", "Zero", "One quarter the transducer diameter"], answer: 1,
      explain: "The beam has flared back out to the transducer's own diameter at 2 × NZL, and it keeps growing past that. Half the diameter is the value at one near-zone length, at the focus.",
      objectives: ["u06-o3"], lesson: "u06-l4", level: 2 },
    { id: "u06-q10", type: "short", q: "At what depth (in near-zone lengths) does the beam diameter once again equal the transducer diameter?", answer: "two near-zone lengths", accept: ["two near-zone lengths", "2 near zone lengths", "two near zone lengths", "2 nzl", "two nzl", "2 x nzl", "twice the near zone length"],
      explain: "Half at the focus (one NZL), whole at double (two NZL). Beyond two near-zone lengths the beam is wider than the transducer itself.",
      objectives: ["u06-o3"], lesson: "u06-l4", level: 2 },
    { id: "u06-q11", type: "mc", q: "Compared with a small-diameter transducer of the same frequency, a large-diameter transducer has:", choices: ["A shorter near zone and more divergence", "A longer near zone and less divergence", "A longer near zone and more divergence", "The same near zone but a narrower focus"], answer: 1,
      explain: "NZL = D² ÷ 4λ, so a bigger aperture pushes the focus deeper, and a bigger aperture radiating the same wavelength spreads less in the far field. Choice 3 mixes the two effects up — divergence and near-zone length always move in opposite directions.",
      objectives: ["u06-o4"], lesson: "u06-l5", level: 3 },
    { id: "u06-q12", type: "tf", q: "A small-diameter unfocused transducer diverges more in the far zone than a large-diameter one of the same frequency.", answer: true,
      explain: "True. Divergence is governed by wavelength divided by aperture, so a small aperture spreads more — like a bare bulb compared with a flashlight with a big reflector.",
      objectives: ["u06-o4"], lesson: "u06-l5", level: 2 },
    { id: "u06-q13", type: "mc", q: "If the diameter of an unfocused transducer is doubled while frequency stays the same, the near-zone length is:", choices: ["Doubled", "Halved", "Quadrupled", "Unchanged"], answer: 2,
      explain: "Diameter is squared in NZL = D² ÷ (4λ), so twice the diameter gives four times the near-zone length. 'Doubled' is the trap for anyone who reads past the square.",
      objectives: ["u06-o4"], lesson: "u06-l5", level: 3 },
    { id: "u06-q14", type: "mc", q: "For an unfocused disc transducer, raising the frequency will:", choices: ["Shorten the near zone and increase divergence", "Lengthen the near zone and decrease divergence", "Lengthen the near zone and increase divergence", "Leave the beam shape unchanged"], answer: 1,
      explain: "Higher frequency means shorter wavelength; λ sits in the denominator of the NZL formula, so the focus moves deeper, and a shorter wavelength spreads less. Choice 1 is the reflex answer from 'high frequency = shallow', which is about penetration and attenuation, not beam geometry.",
      objectives: ["u06-o5"], lesson: "u06-l6", level: 3 },
    { id: "u06-q15", type: "tf", q: "A lower-frequency beam from a given transducer diverges more in the far zone than a higher-frequency beam.", answer: true,
      explain: "True. Lower frequency means a longer wavelength, and the longer the wavelength relative to the aperture, the greater the spread.",
      objectives: ["u06-o5"], lesson: "u06-l6", level: 2 },
    { id: "u06-q16", type: "short", q: "Raising the frequency moves the natural focus of an unfocused transducer deeper or shallower?", answer: "deeper", accept: ["deeper", "deeper into tissue", "further", "farther", "more deep"],
      explain: "Deeper: NZL is directly proportional to frequency. Remember that this is about beam geometry, while penetration still gets worse at higher frequency because of attenuation.",
      objectives: ["u06-o5"], lesson: "u06-l6", level: 2 },
    { id: "u06-q17", type: "mc", q: "According to Huygens' principle, the ultrasound beam is:", choices: ["A single plane wave that bends at the focus", "The sum of countless tiny wavelets that interfere with one another", "A straight cylinder of sound the width of the element", "Created by refraction inside the matching layer"], answer: 1,
      explain: "Every point on the element face radiates its own wavelet, and constructive and destructive interference of those wavelets produce the hourglass. Nothing bends or refracts — choice 1 and choice 4 both invent a mechanism that is not there.",
      objectives: ["u06-o6"], lesson: "u06-l2", level: 2 },
    { id: "u06-q18", type: "tf", q: "Each point on the face of the active element behaves as an individual sound source.", answer: true,
      explain: "True — that is exactly what Huygens' principle states, and it is why the near-zone intensity pattern is uneven and why the beam has a waist at all.",
      objectives: ["u06-o6"], lesson: "u06-l2", level: 1 },
    { id: "u06-q19", type: "short", q: "Whose principle explains beam shape as the interference of many small wavelets?", answer: "Huygens", accept: ["huygens", "huygens principle", "huygen", "huygens' principle"],
      explain: "Huygens' principle. Fresnel and Fraunhofer are names attached to the two zones of the beam, not to the wavelet idea.",
      objectives: ["u06-o6"], lesson: "u06-l2", level: 1 },
    { id: "u06-q20", type: "mc", q: "External focusing is achieved by:", choices: ["Adding an acoustic lens to the front of the element", "Curving the element itself", "Firing the outer elements of an array first", "Increasing the transmit frequency"], answer: 0,
      explain: "External means outside the element: a lens glued to the front face. Curving the element is internal focusing, and timed firing is electronic focusing.",
      objectives: ["u06-o7"], lesson: "u06-l7", level: 1 },
    { id: "u06-q21", type: "mc", q: "A probe made with a concave (bowl-shaped) active element uses which focusing method, and is its focus adjustable?", choices: ["External focusing, adjustable", "Internal focusing, fixed", "Electronic focusing, adjustable", "Internal focusing, adjustable"], answer: 1,
      explain: "A curved element is internal focusing and it is set at manufacture, so the only way to change the focal depth is to change probes. Only phased/electronic focusing is adjustable.",
      objectives: ["u06-o7"], lesson: "u06-l7", level: 2 },
    { id: "u06-q22", type: "mc", q: "Which focusing method allows the sonographer to move the focus during a scan?", choices: ["External (lens)", "Internal (curved element)", "Electronic (phased delays in an array)", "None — focal depth is always fixed"], answer: 2,
      explain: "Phased delays are just numbers in the beamformer, so the machine can recompute them instantly and even use several focal zones. Lenses and curved elements are physical shapes and cannot change.",
      objectives: ["u06-o7"], lesson: "u06-l7", level: 2 },
    { id: "u06-q23", type: "tf", q: "The focal depth of a transducer focused with an acoustic lens can be changed from the machine's keyboard.", answer: false,
      explain: "False. A lens is fixed focusing, built into the probe. Only electronic (phased) focusing responds to the controls.",
      objectives: ["u06-o7"], lesson: "u06-l7", level: 1 },
    { id: "u06-q24", type: "short", q: "What focusing method uses a curved acoustic lens attached in front of a flat element?", answer: "external focusing", accept: ["external focusing", "external", "lens", "acoustic lens", "external focus"],
      explain: "External focusing: the lens is outside the element. Internal focusing curves the element itself; both are fixed.",
      objectives: ["u06-o7"], lesson: "u06-l7", level: 1 },
    { id: "u06-q25", type: "mc", q: "Compared with the same transducer unfocused, a focused transducer has:", choices: ["A deeper focus and a narrower beam at the focus", "A shallower focus and a narrower beam at the focus", "A shallower focus and a wider beam at the focus", "The same focal depth but more intensity"], answer: 1,
      explain: "Focusing pulls the waist closer to the probe and squeezes it narrower. 'Deeper focus' is impossible: you can only focus within the near zone, never beyond the natural focus.",
      objectives: ["u06-o8"], lesson: "u06-l8", level: 2 },
    { id: "u06-q26", type: "mc", q: "What happens in the region well beyond the focus when a beam is focused?", choices: ["It diverges less than an unfocused beam", "It diverges more than an unfocused beam", "It stays parallel", "It converges again at twice the focal depth"], answer: 1,
      explain: "A tighter waist always costs faster spreading afterwards, so deep in the image a focused beam is wider than the unfocused one. There is no second focus — choice 4 confuses the 2 × NZL rule (which is about beam width, not a new focus).",
      objectives: ["u06-o8"], lesson: "u06-l8", level: 3 },
    { id: "u06-q27", type: "tf", q: "Focusing can move the focal point deeper than the natural (unfocused) near-zone length.", answer: false,
      explain: "False. Focusing only shortens the focal depth. If you need a deeper focus you need a larger aperture or a higher frequency — that is, a different probe or a bigger active element group.",
      objectives: ["u06-o8"], lesson: "u06-l8", level: 2 },
    { id: "u06-q28", type: "short", q: "In which zone of the beam can focusing occur?", answer: "near zone", accept: ["near zone", "the near zone", "fresnel zone", "near field", "fresnel"],
      explain: "Only inside the near zone, at a depth shallower than the natural focus. Nothing can be done about the far zone: once the beam is diverging it stays diverging.",
      objectives: ["u06-o8"], lesson: "u06-l8", level: 2 },
    { id: "u06-q29", type: "mc", q: "The distance from the transducer to the focus is called the:", choices: ["Focal zone", "Focal length (focal depth)", "Aperture", "Beam diameter"], answer: 1,
      explain: "Focal length, also called focal depth. The focal zone is the region around the focus where the beam stays narrow, and the aperture is the size of the transducer face.",
      objectives: ["u06-o9"], lesson: "u06-l1", level: 1 },
    { id: "u06-q30", type: "mc", q: "The focal zone is best defined as:", choices: ["The single narrowest point of the beam", "The region surrounding the focus where the beam remains narrow", "The whole near zone", "The distance from the probe to the focus"], answer: 1,
      explain: "The focal zone is a region, not a point; the single narrowest point is the focus or focal point, and the distance to it is the focal length. Precision in this vocabulary is worth easy marks.",
      objectives: ["u06-o9"], lesson: "u06-l4", level: 2 },
    { id: "u06-q31", type: "short", q: "What is the name of the narrowest point of the sound beam?", answer: "focus", accept: ["focus", "focal point", "the focus", "focal spot"],
      explain: "The focus or focal point. It marks the end of the near zone and the start of the far zone, and it is where lateral resolution is best.",
      objectives: ["u06-o9"], lesson: "u06-l1", level: 1 },
    { id: "u06-q32", type: "mc", q: "Two small cysts lie side by side at the same depth. Whether the machine shows them as one blob or two depends mostly on:", choices: ["The beam width at that depth", "The pulse duration", "The frame rate", "The acoustic impedance of the cysts"], answer: 0,
      explain: "Side-by-side detail is lateral resolution, which equals the beam width at that depth. Pulse duration controls axial resolution (front-to-back detail), which is the standard confusion being tested here.",
      objectives: ["u06-o10"], lesson: "u06-l8", level: 2 },
    { id: "u06-q33", type: "mc", q: "At which depth is lateral resolution best?", choices: ["At the transducer face", "At the focus", "At two near-zone lengths", "Deep in the far zone"], answer: 1,
      explain: "Lateral resolution equals beam width, and the beam is narrowest at the focus — that is why you move the focal marker to the level of interest. At the face and at 2 × NZL the beam is a full transducer diameter wide.",
      objectives: ["u06-o10"], lesson: "u06-l4", level: 3 },
    { id: "u06-q34", type: "tf", q: "A wider beam produces worse lateral resolution.", answer: true,
      explain: "True. The beam is the paintbrush: the wider it is, the farther apart two reflectors must be before the machine can show them separately.",
      objectives: ["u06-o10"], lesson: "u06-l8", level: 2 },
    { id: "u06-q35", type: "mc", q: "Transducer A: 6 mm diameter, 5 MHz. Transducer B: 6 mm diameter, 10 MHz. Which has the longer near zone, and by how much?", choices: ["A, by a factor of 2", "B, by a factor of 2", "B, by a factor of 4", "They are the same because the diameters match"], answer: 1,
      explain: "NZL = D² × f ÷ 6, so with the diameter fixed, doubling the frequency doubles the near-zone length: 30 mm versus 60 mm. The factor of 4 belongs to doubling the diameter, because only D is squared.",
      objectives: ["u06-o2", "u06-o5"], lesson: "u06-l3", level: 3 },
    { id: "u06-q36", type: "mc", q: "Why does the beam narrow and then widen rather than travelling as a straight cylinder?", choices: ["Because tissue refracts the edges of the beam inward", "Because wavelets from all points on the element interfere constructively and destructively", "Because the matching layer is curved", "Because attenuation removes the edges of the beam"], answer: 1,
      explain: "Interference of Huygens wavelets creates the hourglass; the shape exists even in a uniform medium with a flat element. Refraction needs an interface and an oblique angle, and attenuation weakens the whole beam rather than trimming its edges.",
      objectives: ["u06-o1", "u06-o6"], lesson: "u06-l2", level: 2 }
  ],
