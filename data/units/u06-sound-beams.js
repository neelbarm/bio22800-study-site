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
