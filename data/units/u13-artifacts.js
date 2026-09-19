/* Unit 13 — Artifacts. See SPEC.md for the schema. */
window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u13",
  order: 13,
  title: "Artifacts",
  icon: "👻",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Artifacts chapter",
  blurb: "An artifact is anything on the screen that is not a true picture of the anatomy. Every one of them happens because the machine made an assumption about sound and the body broke it. Learn the six assumptions and you can derive almost every artifact on the exam instead of memorizing a list.",

  objectives: [
    { id: "u13-o1", text: "List the assumptions the imaging system makes about sound travel, and explain how violating each one creates an artifact." },
    { id: "u13-o2", text: "Describe reverberation, comet tail, and ring-down: cause, appearance, and how to reduce or confirm each." },
    { id: "u13-o3", text: "Explain shadowing and edge shadowing: the tissue property or geometry responsible, where the artifact appears, and how to tell a real shadow from a fake one." },
    { id: "u13-o4", text: "Explain enhancement, focal banding, and slice-thickness (elevational) artifact, and state why a simple cyst can look like it has debris in it." },
    { id: "u13-o5", text: "Explain mirror-image artifact: the reflector responsible, where the duplicate is displayed, and how to confirm it at the machine." },
    { id: "u13-o6", text: "Explain refraction artifacts, including lateral displacement and side-by-side duplication, and state the two conditions refraction requires." },
    { id: "u13-o7", text: "Compare side lobes and grating lobes: where each comes from in the transducer, how each appears on the image, and how the design reduces them." },
    { id: "u13-o8", text: "Predict the direction and size of the displacement caused by propagation speed error, and name the tissues that cause it." },
    { id: "u13-o9", text: "Explain range-ambiguity and multipath artifacts, relate range ambiguity to PRF and imaging depth, and state the fix for each." },
    { id: "u13-o10", text: "Recognize the common Doppler artifacts — aliasing, mirror image/crosstalk, clutter/flash, and twinkling — and state a fix for each." },
    { id: "u13-o11", text: "Choose an appropriate fix or confirmation strategy (angle, window, transducer, frequency, gain, PRF/depth, harmonics, compounding) for a described artifact." }
  ],

  lessons: [
    {
      id: "u13-l1",
      title: "The six promises the machine makes",
      objectives: ["u13-o1"],
      html: `<p class="lead">An artifact is not a machine malfunction. It is the machine doing exactly what it was told to do, using rules the body did not follow.</p>
<p>Picture the scanner as a very literal-minded assistant. You hand it a stopwatch and it builds the whole picture from one measurement: how long an echo took to come home. To turn that one number into a dot on a screen, it has to believe six things.</p>
<ul>
<li><span class="kw">Straight line</span> — the pulse travelled in a straight line out and back, never bending.</li>
<li><span class="kw">Direct round trip</span> — the echo came straight back from one reflector, not by way of three other structures.</li>
<li><span class="kw">1,540 m/s</span> — every tissue along the way carried sound at exactly 1.54 mm/µs (13 µs per cm of depth).</li>
<li><span class="kw">Uniform attenuation</span> — sound weakened at the same rate everywhere, so TGC can undo it with one smooth ramp.</li>
<li><span class="kw">On the main axis</span> — the echo came from the centre of a pencil-thin beam, with no thickness and no side energy.</li>
<li><span class="kw">One pulse, then listen</span> — every echo received belongs to the most recent pulse.</li>
</ul>
<p>Depth is then just arithmetic: <span class="kw-2">depth = 1.54 mm/µs × round-trip time ÷ 2</span>. If the sound bent, bounced twice, travelled at 1,450 m/s, or sneaked in from the side, the arithmetic still runs — it just puts the dot in the wrong place, at the wrong brightness, or invents a dot that has no anatomy behind it at all.</p>
<div class="callout key">Every classic artifact on the exam is one broken promise. When you see an odd finding, ask "which promise did the body break?" and the name of the artifact usually falls out.</div>
<div class="callout warn">Do not call artifacts "errors in the machine." They are predictable physics. Some (shadowing, enhancement, twinkling) are genuinely useful and help you make the diagnosis.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>The machine assumes sound goes straight out and straight back at 1,540 metres per second</title>
<rect x="20" y="92" width="34" height="58" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="14" y="174" fill="var(--muted)" font-size="15">probe</text>
<line x1="56" y1="108" x2="424" y2="108" stroke="var(--c1)" stroke-width="3"/>
<polygon points="432,108 416,101 416,115" fill="var(--c1)"/>
<text x="120" y="96" fill="currentColor" font-size="15">out: straight, 1,540 m/s</text>
<line x1="424" y1="140" x2="64" y2="140" stroke="var(--c2)" stroke-width="3" stroke-dasharray="7 5"/>
<polygon points="56,140 72,133 72,147" fill="var(--c2)"/>
<text x="120" y="164" fill="currentColor" font-size="15">back: same path, same speed</text>
<line x1="436" y1="58" x2="436" y2="188" stroke="currentColor" stroke-width="4"/>
<text x="448" y="128" fill="currentColor" font-size="15">one reflector</text>
<text x="20" y="40" fill="var(--c3)" font-size="16">All the machine measures is TIME.</text>
<text x="20" y="216" fill="currentColor" font-size="15">depth = 1.54 mm/µs × time ÷ 2      (13 µs per cm)</text>
</svg>`,
          caption: "One measurement (time) plus six assumptions equals the whole image."
        }
      ],
      sayIt: "Say out loud, without looking: the six things the machine assumes about every echo, and the one quantity it actually measures.",
      keyPoints: [
        "The machine measures only round-trip time; everything else is assumed",
        "Assumptions: straight line, direct round trip, 1,540 m/s, uniform attenuation, echoes from the main axis only, one pulse at a time",
        "depth = 1.54 mm/µs × time ÷ 2, i.e. 13 µs per cm of depth",
        "An artifact = a broken assumption, not a broken machine",
        "Some artifacts (shadow, enhancement, twinkling) are diagnostically useful"
      ]
    },

    {
      id: "u13-l2",
      title: "Reverberation, comet tail, ring-down",
      objectives: ["u13-o2", "u13-o1", "u13-o11"],
      html: `<p class="lead">When sound gets trapped between two good reflectors it bounces back and forth, and the machine draws one false structure for every extra lap.</p>
<p>Imagine clapping in a narrow hallway with a wall at each end. The clap comes back, bounces off the wall behind you, goes out again, and comes back a second time. The scanner has no way to know the second echo is a repeat — a longer time means a deeper structure — so it paints a copy twice as deep as the real one, then a third copy three times as deep.</p>
<p><span class="kw">Reverberation</span> needs <b>two strong, parallel reflectors</b> (the transducer face and a wall of bowel, a needle and skin, the two walls of a vessel). On screen: bright lines <b>equally spaced</b> down the image, each one dimmer than the last because every extra lap adds attenuation. Equal spacing is the giveaway — the spacing equals the true distance between the two reflectors.</p>
<p><span class="kw">Comet tail</span> is reverberation on a small scale: a small, very strong reflector (a surgical clip, a metal IUD, a shotgun pellet, cholesterol crystals in the gallbladder wall) rings between its own front and back surfaces. The reverberations are so closely spaced they merge into a short, tapering bright tail that fades with depth.</p>
<p><span class="kw">Ring-down</span> comes from a <b>gas bubble</b> collection that resonates and radiates sound continuously back at the probe. On screen: a solid, bright, <b>continuous</b> line or streak that can run to the bottom of the image without tapering.</p>
<div class="callout tip">Metal makes a comet; gas rings a bell. Comet tail tapers and fades; ring-down is a continuous unbroken stripe.</div>
<div class="callout key">Reverberation favors two strong surfaces roughly parallel to each other and near perpendicular to the beam. Change angle/window to break that geometry; harmonics or compounding can reduce the clutter.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 270" role="img"><title>Sound bouncing between two parallel reflectors, and the equally spaced ladder it draws on the image</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="262" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="20" y1="50" x2="270" y2="50" stroke="currentColor" stroke-width="4"/>
<text x="20" y="42" fill="var(--muted)" font-size="15">reflector A (probe face)</text>
<line x1="20" y1="150" x2="270" y2="150" stroke="currentColor" stroke-width="4"/>
<text x="20" y="172" fill="var(--muted)" font-size="15">reflector B (parallel wall)</text>
<line x1="70" y1="50" x2="70" y2="150" stroke="var(--c1)" stroke-width="2"/>
<line x1="120" y1="150" x2="120" y2="50" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 4"/>
<line x1="170" y1="50" x2="170" y2="150" stroke="var(--c1)" stroke-width="2"/>
<line x1="220" y1="150" x2="220" y2="50" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="60" y="118" fill="currentColor" font-size="15">lap 1</text>
<text x="160" y="118" fill="currentColor" font-size="15">lap 2</text>
<line x1="420" y1="50" x2="540" y2="50" stroke="var(--c4)" stroke-width="5"/>
<line x1="420" y1="100" x2="540" y2="100" stroke="var(--c4)" stroke-width="4"/>
<line x1="420" y1="150" x2="540" y2="150" stroke="var(--c4)" stroke-width="3"/>
<line x1="420" y1="200" x2="540" y2="200" stroke="var(--c4)" stroke-width="2"/>
<text x="548" y="56" fill="currentColor" font-size="15">real</text>
<text x="548" y="106" fill="currentColor" font-size="15">fake</text>
<text x="548" y="156" fill="currentColor" font-size="15">fake</text>
<text x="360" y="240" fill="currentColor" font-size="15">equal spacing, fading deeper</text>
<line x1="392" y1="50" x2="392" y2="200" stroke="var(--muted)" stroke-width="1"/>
<text x="360" y="128" fill="var(--muted)" font-size="15">depth</text>
</svg>`,
          caption: "Reverberation ladder: equally spaced copies, each dimmer, spaced by the real reflector separation."
        },
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Comet tail from a metal clip compared with ring-down from a gas bubble</title>
<text x="20" y="26" fill="var(--c3)" font-size="16">comet tail — metal</text>
<text x="330" y="26" fill="var(--c3)" font-size="16">ring-down — gas</text>
<line x1="310" y1="10" x2="310" y2="240" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="90" y="56" width="26" height="14" fill="var(--c2)"/>
<text x="126" y="68" fill="currentColor" font-size="15">clip (front + back ring)</text>
<line x1="95" y1="84" x2="115" y2="84" stroke="var(--c4)" stroke-width="5"/>
<line x1="97" y1="102" x2="113" y2="102" stroke="var(--c4)" stroke-width="4"/>
<line x1="99" y1="118" x2="111" y2="118" stroke="var(--c4)" stroke-width="3"/>
<line x1="101" y1="132" x2="109" y2="132" stroke="var(--c4)" stroke-width="2"/>
<text x="126" y="120" fill="currentColor" font-size="15">short tapering tail</text>
<circle cx="400" cy="60" r="12" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="422" y="64" fill="currentColor" font-size="15">bubble resonates</text>
<line x1="400" y1="74" x2="400" y2="212" stroke="var(--c4)" stroke-width="5"/>
<text x="422" y="150" fill="currentColor" font-size="15">solid continuous line</text>
<text x="20" y="232" fill="var(--muted)" font-size="15">tapers and fades</text>
<text x="330" y="232" fill="var(--muted)" font-size="15">no taper, runs deep</text>
</svg>`,
          caption: "Comet tail tapers to nothing; ring-down is one continuous bright stripe from resonating gas."
        }
      ],
      sayIt: "Say out loud: what two things does reverberation need, why are the copies equally spaced, and how do comet tail and ring-down differ?",
      keyPoints: [
        "Reverberation = sound trapped between two strong parallel reflectors",
        "Copies are equally spaced (spacing = true reflector separation) and get dimmer with depth",
        "Comet tail = closely spaced reverberations from a small strong reflector (metal, crystals); tapers",
        "Ring-down = gas resonance; continuous bright line, no taper",
        "Fix: change angle/window, move focus, lower gain, use harmonics or spatial compounding"
      ]
    },

    {
      id: "u13-l3",
      title: "Shadowing and edge shadowing",
      objectives: ["u13-o3", "u13-o1", "u13-o11"],
      html: `<p class="lead">A shadow is not a structure. It is the absence of sound deep to something that swallowed, reflected, or bent the beam away.</p>
<p>The receiver applies <span class="kw-2">time gain compensation</span> on the assumption that every line attenuates at the same average rate (roughly 0.5 dB per cm per MHz in soft tissue). Put a gallstone, a calcification, bone, or a pocket of bowel gas in the way and that line loses far more than the TGC ramp expects. Everything deep to it is under-amplified and comes out dark: a <span class="kw">shadow</span> — a hypoechoic or anechoic band that starts at the back wall of the offender and runs to the bottom of the image, staying the same width as the structure.</p>
<p>Two mechanisms make classic shadows. <b>Absorption/attenuation shadowing</b> (a stone, a calcified plaque) turns the sound into heat. <b>Reflection shadowing</b> at a huge impedance mismatch (soft tissue to gas, soft tissue to bone) throws almost all the energy back, so nothing is left to travel on — that is why bowel gas shadows are dirty and noisy while stone shadows are clean and black.</p>
<p><span class="kw">Edge shadowing</span> (refractive shadowing) is different: nothing absorbed the sound, the beam was <b>bent</b>. At the curved shoulder of a cyst, a gallbladder, or a fetal skull the beam strikes obliquely and refracts away from the line the machine is listening on. The result is a thin, narrow dark line running down from the edge of the curved structure, usually at both edges.</p>
<div class="callout tip">Stones make shade; curves wear eyeliner. A wide black band under the middle = attenuation shadow. A thin dark pencil line off the shoulder = edge shadow.</div>
<div class="callout key">Confirm and fix (sonographer): re-scan from another angle or window. A real shadow follows its stone wherever you put the beam; an edge shadow vanishes as soon as the curved surface is no longer oblique to the beam. Spatial compounding also fills edge shadows in — helpful for seeing through them, unhelpful if you were using the shadow to diagnose the stone.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Beam blocked by a stone, leaving a dark band beneath it</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="252" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="30" y="40" width="240" height="18" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="34" y="54" fill="var(--muted)" font-size="15">probe face</text>
<line x1="70" y1="58" x2="70" y2="110" stroke="var(--c1)" stroke-width="3"/>
<line x1="150" y1="58" x2="150" y2="110" stroke="var(--c1)" stroke-width="3"/>
<line x1="230" y1="58" x2="230" y2="110" stroke="var(--c1)" stroke-width="3"/>
<ellipse cx="150" cy="125" rx="46" ry="18" fill="var(--c2)"/>
<text x="120" y="130" fill="var(--paper)" font-size="15">stone</text>
<line x1="70" y1="140" x2="70" y2="230" stroke="var(--c1)" stroke-width="3"/>
<line x1="230" y1="140" x2="230" y2="230" stroke="var(--c1)" stroke-width="3"/>
<text x="24" y="252" fill="currentColor" font-size="15">little sound gets past the stone</text>
<rect x="380" y="40" width="170" height="80" fill="none" stroke="var(--muted)" stroke-width="2"/>
<ellipse cx="465" cy="120" rx="44" ry="16" fill="var(--c2)"/>
<rect x="421" y="136" width="88" height="96" fill="var(--ink)"/>
<text x="424" y="192" fill="var(--paper)" font-size="15">shadow</text>
<text x="335" y="252" fill="currentColor" font-size="14">dark band follows stone to bottom</text>
</svg>`,
          caption: "Attenuation shadowing: high attenuation or a huge mismatch leaves an under-amplified dark band beneath."
        },
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Beam refracting at the curved edge of a cyst, producing thin edge shadows</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="242" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<circle cx="150" cy="130" r="58" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="126" y="136" fill="var(--muted)" font-size="15">cyst</text>
<line x1="95" y1="40" x2="95" y2="96" stroke="var(--c1)" stroke-width="3"/>
<line x1="95" y1="96" x2="64" y2="220" stroke="var(--c2)" stroke-width="3"/>
<line x1="205" y1="40" x2="205" y2="96" stroke="var(--c1)" stroke-width="3"/>
<line x1="205" y1="96" x2="236" y2="220" stroke="var(--c2)" stroke-width="3"/>
<text x="20" y="238" fill="currentColor" font-size="15">oblique hit at the shoulder = bent away</text>
<circle cx="465" cy="130" r="56" fill="none" stroke="var(--muted)" stroke-width="2"/>
<line x1="412" y1="150" x2="400" y2="232" stroke="var(--ink)" stroke-width="5"/>
<line x1="518" y1="150" x2="530" y2="232" stroke="var(--ink)" stroke-width="5"/>
<text x="360" y="60" fill="currentColor" font-size="15">thin dark lines off both edges</text>
</svg>`,
          caption: "Edge shadow: refraction at a curved wall, not absorption — a thin dark line from each shoulder."
        }
      ],
      sayIt: "Say out loud: two mechanisms that produce a shadow, how an edge shadow differs, and one way to prove which one you are looking at.",
      keyPoints: [
        "Shadowing = violation of the uniform-attenuation assumption; TGC under-amplifies that line",
        "Causes: high absorption (stone, calcification, bone) or near-total reflection (gas, bone surface)",
        "Clean black shadow = stone; dirty noisy shadow = gas",
        "Edge shadow = refraction at a curved surface: thin dark line at the shoulders, no absorber",
        "Confirm by re-angling or changing the window; compounding fills edge shadows in"
      ]
    },

    {
      id: "u13-l4",
      title: "Enhancement, focal banding, and fake debris in a cyst",
      objectives: ["u13-o4", "u13-o3", "u13-o11"],
      html: `<p class="lead">The mirror image of a shadow: when a line of sight attenuates less than TGC expects, everything deep to it is over-amplified and looks too bright.</p>
<p>Sound crossing a simple cyst, the bladder, or an amniotic fluid pocket barely attenuates at all — fluid has a very low attenuation coefficient. The TGC ramp still adds the amplification it would have added for 4 cm of liver, so the tissue behind the cyst arrives at the display with too much gain. That bright column is <span class="kw">enhancement</span> (also called through-transmission or posterior acoustic enhancement). It is a column the width of the fluid structure, and it is one of your best clues that a "mass" is actually fluid.</p>
<div class="callout warn">The tissue behind the cyst is not really more reflective. Nothing changed about it — only the amplification applied to it. Saying "the tissue behind is echogenic" is the classic exam trap.</div>
<p><span class="kw">Focal enhancement</span> (focal banding) is a different brightening: a horizontal bright stripe across the whole image at the depth of the focus, because the beam is narrowest there and the intensity is highest. It moves when you move the focus — that is how you identify it.</p>
<p><span class="kw">Slice-thickness artifact</span> (elevational, section-thickness, partial-volume) is why a simple cyst can appear to contain debris. The beam is not a plane; it has thickness in the elevational dimension. When the edge of that slab includes tissue next to the cyst, those echoes are painted into the anechoic space as low-level grey.</p>
<div class="callout key">Confirm: re-scan the "debris" from a different angle or with a different window. Slice-thickness pseudo-debris moves or disappears, does not layer with gravity, and has no Doppler flow. Use a higher-frequency probe or a 1.5D array, and put the elevational focus at the depth of interest.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Sound crossing a cyst loses little energy, so the tissue beneath appears too bright</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="252" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="30" y="40" width="240" height="18" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="150" cy="120" r="46" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="118" y="126" fill="var(--muted)" font-size="15">fluid</text>
<line x1="150" y1="58" x2="150" y2="230" stroke="var(--c1)" stroke-width="5"/>
<line x1="70" y1="58" x2="70" y2="230" stroke="var(--c2)" stroke-width="2" stroke-dasharray="5 6"/>
<line x1="230" y1="58" x2="230" y2="230" stroke="var(--c2)" stroke-width="2" stroke-dasharray="5 6"/>
<text x="16" y="250" fill="currentColor" font-size="14">centre line keeps energy; side lines attenuate</text>
<circle cx="465" cy="120" r="44" fill="none" stroke="var(--muted)" stroke-width="2"/>
<rect x="421" y="166" width="88" height="66" fill="var(--c4)"/>
<text x="424" y="206" fill="var(--paper)" font-size="15">bright</text>
<text x="370" y="250" fill="currentColor" font-size="14">bright column = enhancement</text>
</svg>`,
          caption: "Enhancement: low attenuation through fluid plus a standard TGC ramp equals too much gain beneath."
        },
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>The beam has thickness, so tissue beside a cyst is painted inside it as fake debris</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">beam seen end-on (slice thickness)</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="232" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="80" y="60" width="150" height="120" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="80" y="52" fill="var(--c1)" font-size="15">beam slab (has thickness)</text>
<circle cx="130" cy="120" r="42" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="104" y="126" fill="var(--muted)" font-size="15">cyst</text>
<rect x="176" y="60" width="54" height="120" fill="var(--c2)"/>
<text x="140" y="206" fill="currentColor" font-size="15">tissue caught in the slab edge</text>
<circle cx="465" cy="120" r="46" fill="none" stroke="var(--muted)" stroke-width="2"/>
<circle cx="452" cy="132" r="4" fill="var(--c2)"/>
<circle cx="470" cy="118" r="4" fill="var(--c2)"/>
<circle cx="480" cy="140" r="4" fill="var(--c2)"/>
<circle cx="458" cy="108" r="4" fill="var(--c2)"/>
<text x="360" y="206" fill="currentColor" font-size="15">low-level "debris" in a clean cyst</text>
</svg>`,
          caption: "Slice-thickness artifact: elevational beam thickness paints neighbouring tissue into an anechoic structure."
        }
      ],
      sayIt: "Say out loud: why enhancement happens even though nothing behind the cyst changed, and three ways to prove that cyst debris is an artifact.",
      keyPoints: [
        "Enhancement = low-attenuation path + standard TGC = over-amplified column beneath",
        "The deep tissue is not really brighter; only the gain applied to it is wrong",
        "Enhancement is a strong clue that a structure is fluid-filled",
        "Focal banding = bright horizontal stripe at the focal depth; moves with the focus",
        "Slice thickness (elevational) puts fake low-level debris inside cysts and vessels",
        "Fake debris does not layer, has no flow, and changes with angle/window"
      ]
    },

    {
      id: "u13-l5",
      title: "Mirror image",
      objectives: ["u13-o5", "u13-o1", "u13-o11"],
      html: `<p class="lead">Put a strong, smooth reflector in the path and the beam takes a detour — the machine, believing in straight lines, draws a copy of the anatomy on the far side of the mirror.</p>
<p>Think of a hallway mirror. Your brain places the reflected lamp "behind" the mirror, at the same distance on the other side, because light appears to come from there. Ultrasound does the same thing with a highly reflective, curved, smooth interface — most famously the <span class="kw">diaphragm</span> (soft tissue to aerated lung).</p>
<p>The indirect path is longer than a direct round trip, so extra time is drawn as extra depth. In the classic planar geometry the duplicate appears on the far side of the reflector at an equal apparent distance and is commonly weaker, but strength and exact position vary with geometry.</p>
<p>Mirroring also happens at the bladder wall, at the pleura (a mirrored liver above the diaphragm), and in spectral Doppler, where a strong signal appears as a symmetrical mirror below the baseline (see the Doppler lesson).</p>
<div class="callout tip">The diaphragm is a funhouse mirror: the twin is always deeper, always beyond the mirror, and always dimmer.</div>
<div class="callout key">Confirm by comparing expected anatomy and reflector geometry across windows and planes. A mirror twin often shifts, distorts or vanishes, while real anatomy remains anatomically consistent—not necessarily at the same screen coordinate.</div>
<div class="callout warn">Do not confuse mirror image with reverberation. Reverberation copies are equally spaced <i>along the same line</i>; a mirror image is one duplicate reflected <i>across</i> a strong interface, with the geometry flipped.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 270" role="img"><title>Beam bouncing off the diaphragm, putting a duplicate liver beyond it</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="262" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="30" y="42" width="60" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="120" cy="104" r="14" fill="var(--c2)"/>
<text x="140" y="100" fill="currentColor" font-size="15">real lesion</text>
<line x1="60" y1="58" x2="120" y2="104" stroke="var(--c1)" stroke-width="3"/>
<line x1="120" y1="104" x2="205" y2="158" stroke="var(--c1)" stroke-width="3"/>
<line x1="205" y1="158" x2="120" y2="104" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 4"/>
<line x1="60" y1="150" x2="290" y2="182" stroke="currentColor" stroke-width="4"/>
<text x="196" y="206" fill="var(--muted)" font-size="15">diaphragm (mirror)</text>
<rect x="380" y="42" width="60" height="16" fill="none" stroke="var(--muted)" stroke-width="2"/>
<circle cx="466" cy="104" r="14" fill="var(--c2)"/>
<text x="486" y="100" fill="currentColor" font-size="15">real</text>
<line x1="400" y1="150" x2="580" y2="176" stroke="var(--muted)" stroke-width="4"/>
<circle cx="540" cy="202" r="14" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="365" y="225" fill="currentColor" font-size="14">weaker twin beyond mirror</text>
<text x="365" y="252" fill="var(--muted)" font-size="14">classic: equal distance beyond</text>
</svg>`,
          caption: "Mirror image: extra travel time is drawn as extra depth, so the copy lands beyond the reflector."
        }
      ],
      sayIt: "Say out loud: what kind of reflector causes a mirror image, exactly where the duplicate is drawn, and how you would prove it at the machine.",
      keyPoints: [
        "Cause: a strong, smooth, highly reflective interface (classically the diaphragm)",
        "The beam takes a longer, bounced path, so the copy is placed deeper",
        "The twin appears on the far side of the mirror, equidistant, and dimmer",
        "Violates the straight-line / direct round-trip assumptions",
        "Confirm by changing the angle or acoustic window; the twin moves or disappears"
      ]
    },

    {
      id: "u13-l6",
      title: "Refraction: lateral displacement and duplication",
      objectives: ["u13-o6", "u13-o1", "u13-o11"],
      html: `<p class="lead">Refraction bends the beam sideways, so structures are drawn in the wrong lateral position — sometimes twice.</p>
<p>Refraction needs oblique incidence and different propagation speeds. In Snell's law both angles are measured from the <b>normal</b>: normal incidence is 0° from the normal, equivalent to 90° to the boundary surface.</p>
<p>The machine draws every echo along the straight line it thinks it sent. If the beam actually bent 5° to the left before hitting a vessel, the vessel is painted 5° to the right of where it lives — <span class="kw">lateral displacement</span>. Nothing looks obviously wrong; the anatomy is just in the wrong place, which is why refraction quietly ruins measurements.</p>
<p>The classic version is side-by-side duplication, often at similar depth, but exact apparent depth and position depend on the refracted paths.</p>
<div class="steps"><ol><li>For θi=30°, c₁=1,540 and c₂=1,000 m/s: sinθt=(1,000/1,540)×0.5=0.325.</li><li>θt=asin(0.325)≈19° from the normal.</li><li>If the computed sine exceeds 1, no transmitted refracted angle exists for that geometry.</li></ol></div>
<div class="callout tip">Refraction duplicates <i>sideways</i>; mirror image duplicates <i>deeper</i>. Same word, different direction.</div>
<div class="callout key">Fix: move the transducer, angle it so the beam meets the interface closer to 90°, or scan from a midline/longitudinal approach that avoids the muscle boundary. Spatial compounding can also blunt refraction duplication. Refraction disappears at normal (perpendicular) incidence.</div>
<div class="callout warn">A common exam trap: refraction requires a speed difference, not an impedance difference. Two media can have identical impedances and still refract if their speeds differ.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Beam bending at a muscle boundary and duplicating a vessel side by side</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="252" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="120" y="40" width="60" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="40" y1="106" x2="290" y2="90" stroke="currentColor" stroke-width="3"/>
<text x="36" y="130" fill="var(--muted)" font-size="15">muscle / fat boundary (speed changes)</text>
<line x1="150" y1="56" x2="176" y2="98" stroke="var(--c1)" stroke-width="3"/>
<line x1="176" y1="98" x2="230" y2="216" stroke="var(--c1)" stroke-width="3"/>
<line x1="150" y1="56" x2="150" y2="216" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 5"/>
<text x="180" y="180" fill="var(--c1)" font-size="15">bent</text>
<text x="60" y="180" fill="var(--c2)" font-size="15">assumed</text>
<circle cx="230" cy="216" r="13" fill="var(--c4)"/>
<text x="20" y="246" fill="currentColor" font-size="15">one vessel, two paths</text>
<rect x="430" y="40" width="60" height="16" fill="none" stroke="var(--muted)" stroke-width="2"/>
<circle cx="430" cy="196" r="13" fill="var(--c4)"/>
<circle cx="500" cy="196" r="13" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="335" y="236" fill="currentColor" font-size="14">side-by-side duplicate</text>
</svg>`,
          caption: "Refraction duplication: copies sit beside each other at the same depth, unlike a mirror image."
        }
      ],
      sayIt: "Say out loud: the two conditions refraction requires, which direction it displaces structures, and how duplication from refraction differs from a mirror image.",
      keyPoints: [
        "Refraction needs oblique incidence AND a propagation-speed difference",
        "Snell's law: sin θt ÷ sin θi = c2 ÷ c1",
        "Result: lateral displacement — structures drawn beside their true position",
        "Classic: side-by-side duplication (two aortas, twinned gestational sac) at the same depth",
        "Mirror image duplicates deeper; refraction duplicates sideways",
        "Fix: change position/angle toward normal incidence, avoid the muscle boundary"
      ]
    },

    {
      id: "u13-l7",
      title: "Side lobes and grating lobes",
      objectives: ["u13-o7", "u13-o1", "u13-o11"],
      html: `<p class="lead">Not all the energy leaves the transducer down the middle. Whatever sneaks out sideways comes home and gets drawn as if it were on the main axis.</p>
<p>A finite aperture produces off-axis side lobes through diffraction and interference. Arrays can also form grating lobes when regularly spaced elements reinforce at off-axis angles. Their relative strengths depend on aperture, pitch, steering, frequency and apodization; grating lobes are not universally stronger.</p>
<p>The machine places these off-axis echoes on the main axis. Lobe levels vary by design, so avoid a fixed percentage; weak lobes become conspicuous against anechoic spaces.</p>
<div class="callout tip">Side lobes are solo (any transducer, even one crystal); grating lobes gang up (arrays only, because there are many elements).</div>
<div class="callout key">Designers reduce them with <span class="kw-2">apodization</span> (driving the outer elements more weakly), <span class="kw-2">subdicing</span> (cutting each element into smaller pieces so the spacing is less than a wavelength), and keeping element spacing small. You reduce their visible effect by lowering gain/output, changing the angle, and using harmonics — harmonic energy builds up only where intensity is high, that is, on the main axis.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Off-axis lobe energy picking up a bright reflector and placing it on the main axis</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="252" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="130" y="44" width="56" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="158" y1="60" x2="158" y2="220" stroke="var(--c1)" stroke-width="5"/>
<text x="166" y="150" fill="var(--c1)" font-size="15">main beam</text>
<line x1="158" y1="60" x2="60" y2="180" stroke="var(--c2)" stroke-width="2"/>
<line x1="158" y1="60" x2="266" y2="180" stroke="var(--c2)" stroke-width="2"/>
<text x="20" y="200" fill="var(--c2)" font-size="15">lobe</text>
<text x="252" y="200" fill="var(--c2)" font-size="15">lobe</text>
<rect x="250" y="176" width="30" height="10" fill="var(--c4)"/>
<text x="20" y="232" fill="currentColor" font-size="14">off-axis target (gas/rib) is bright</text>
<rect x="430" y="44" width="56" height="16" fill="none" stroke="var(--muted)" stroke-width="2"/>
<circle cx="458" cy="150" r="52" fill="none" stroke="var(--muted)" stroke-width="2"/>
<text x="404" y="110" fill="var(--muted)" font-size="15">anechoic area</text>
<rect x="444" y="176" width="30" height="10" fill="var(--c4)"/>
<text x="490" y="186" fill="currentColor" font-size="15">drawn on axis</text>
<text x="360" y="232" fill="currentColor" font-size="14">fake debris in anechoic spaces</text>
</svg>`,
          caption: "Lobe artifact: off-axis echoes are displayed on the main axis, so they show up where the image should be black."
        }
      ],
      sayIt: "Say out loud: where side lobes come from, where grating lobes come from, why lobe artifacts are only visible in dark areas, and two design fixes.",
      keyPoints: [
        "Side lobes: any transducer, from radial expansion of the element",
        "Grating lobes: arrays only, from regularly spaced separate elements; stronger",
        "Off-axis echoes are placed on the main axis at the time-derived depth",
        "Seen as pseudo-sludge/debris in anechoic structures; lobe energy is ~1% of the main beam",
        "Design fixes: apodization, subdicing, element spacing under one wavelength",
        "Scanning fixes: lower gain/output, change angle, use harmonics"
      ]
    },

    {
      id: "u13-l8",
      title: "Propagation speed error",
      objectives: ["u13-o8", "u13-o1", "u13-o11"],
      html: `<p class="lead">The machine's ruler is calibrated to 1,540 m/s. Any tissue that carries sound faster or slower moves structures toward or away from the probe.</p>
<p>Depth is computed as <span class="kw-2">1.54 mm/µs × time ÷ 2</span>. Suppose the beam crosses several centimetres of fat, where sound travels at about <b>1,450 m/s</b> — slower than assumed. The echo takes longer than the machine's arithmetic expects, and a longer time means a deeper dot. The structure is placed <b>too deep</b>, farther from the transducer than it really is.</p>
<p>Now the opposite: a medium that is <b>faster</b> than 1,540 m/s (muscle around 1,600 m/s, tendon, and dramatically bone at roughly 3,500 m/s). The echo comes home early, so the machine places the structure <b>too shallow</b>, closer than it really is.</p>
<div class="callout tip">Fast tissue, too close. Slow tissue, too far. (Fast = Front.)</div>
<p>The size of the error scales with the mismatch: displayed depth ≈ true depth × (1,540 ÷ actual speed). A 3 cm path through fat at 1,450 m/s is displayed as about 3 × 1,540/1,450 ≈ 3.19 cm — roughly 6% too deep. When only part of a beam crosses the odd-speed tissue, a flat structure such as the diaphragm gets drawn with a step or a break in it; that broken-diaphragm look behind a fatty lesion is a speed-error sign.</p>
<div class="callout key">Who controls this? Nobody at the keyboard — it is a property of the medium. You can only reduce its effect by choosing a window that avoids the odd tissue, and by not trusting fine measurements made through thick fat.</div>
<div class="callout warn">Speed error is a <b>range/axial</b> error, not a lateral one. Refraction moves things sideways; speed error moves them along the beam.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Slow fat displaces a structure deeper, fast muscle displaces it shallower</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">slow path (fat, 1,450 m/s)</text>
<text x="330" y="24" fill="var(--c3)" font-size="16">fast path (muscle, 1,600 m/s)</text>
<line x1="310" y1="10" x2="310" y2="242" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="100" y="40" width="56" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="60" y="66" width="140" height="42" fill="none" stroke="var(--c2)" stroke-width="2"/>
<text x="68" y="94" fill="var(--c2)" font-size="15">slow layer</text>
<line x1="128" y1="56" x2="128" y2="150" stroke="var(--c1)" stroke-width="3"/>
<circle cx="128" cy="150" r="11" fill="var(--c4)"/>
<text x="146" y="154" fill="currentColor" font-size="15">true</text>
<circle cx="128" cy="196" r="11" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="146" y="200" fill="currentColor" font-size="15">displayed (too deep)</text>
<polygon points="128,168 122,180 134,180" fill="var(--c4)"/>
<rect x="420" y="40" width="56" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="380" y="66" width="140" height="42" fill="none" stroke="var(--c3)" stroke-width="2"/>
<text x="388" y="94" fill="var(--c3)" font-size="15">fast layer</text>
<line x1="448" y1="56" x2="448" y2="180" stroke="var(--c1)" stroke-width="3"/>
<circle cx="448" cy="180" r="11" fill="var(--c4)"/>
<text x="466" y="184" fill="currentColor" font-size="15">true</text>
<circle cx="448" cy="134" r="11" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="425" y="138" fill="currentColor" font-size="14">displayed shallow</text>
<text x="20" y="234" fill="currentColor" font-size="15">echo late = drawn deeper</text>
<text x="330" y="234" fill="currentColor" font-size="15">echo early = drawn shallower</text>
</svg>`,
          caption: "Speed error moves structures along the beam: slow medium pushes them deeper, fast medium pulls them shallower."
        }
      ],
      sayIt: "Say out loud: which direction a structure moves when the tissue is slower than 1,540 m/s, which when it is faster, and roughly how big the error is through fat.",
      keyPoints: [
        "The machine always assumes 1.54 mm/µs (13 µs per cm)",
        "Slower medium (fat 1,450 m/s) → echo late → displayed too deep",
        "Faster medium (muscle 1,600 m/s, bone ~3,500 m/s) → echo early → displayed too shallow",
        "displayed depth ≈ true depth × 1,540 ÷ actual speed",
        "Partial-width speed error breaks or steps a flat structure like the diaphragm",
        "Medium-controlled; the sonographer can only change the window"
      ]
    },

    {
      id: "u13-l9",
      title: "Range ambiguity and multipath",
      objectives: ["u13-o9", "u13-o1", "u13-o11"],
      html: `<p class="lead">Two artifacts that both come from the machine misjudging how far an echo really travelled: one because it fired too soon, one because the sound took the scenic route.</p>
<p><span class="kw">Range ambiguity</span> is a timing mistake. After each pulse the system listens for one pulse repetition period, then fires again. If the PRF is high (short PRP) and there is a strong reflector deeper than the listening window allows, its echo arrives <b>after</b> the next pulse has already gone out. The machine assumes every echo belongs to the most recent pulse, so it assigns that late, deep echo a short time — and draws the deep structure <b>too shallow</b>, superimposed on the near field.</p>
<div class="formula">maximum unambiguous depth (cm) ≈ 77,000 ÷ PRF (Hz)</div>
<p>At a PRF of 10 kHz you can unambiguously see about 7.7 cm; at 5 kHz, about 15.4 cm. Fix: <b>lower the PRF</b>, which the machine does automatically when you <b>increase the displayed depth</b>. Lowering PRF also lowers the frame rate, and in Doppler it lowers the Nyquist limit — that is the trade you are making.</p>
<p><span class="kw">Multipath</span> is a route mistake. The pulse ricochets off two or more interfaces before returning, so its total path is longer than a straight out-and-back trip. The extra time is displayed as extra depth, and because the return angle is wrong the structure can also land in the wrong lateral spot. It blurs the image and can invent a structure that is not there.</p>
<div class="callout tip">Range ambiguity: "the echo came home to the wrong pulse — slow the pulses down." Multipath: "the sound took the scenic route and got charged for the mileage."</div>
<div class="callout key">Recognize range ambiguity by changing depth: increase the depth (PRF falls) and the ghost structure moves or disappears, while true anatomy stays put.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>A deep echo arriving after the next pulse is fired is displayed too shallow</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">timeline of pulses and echoes</text>
<line x1="40" y1="70" x2="560" y2="70" stroke="currentColor" stroke-width="2"/>
<line x1="70" y1="52" x2="70" y2="88" stroke="var(--c1)" stroke-width="4"/>
<text x="46" y="44" fill="var(--c1)" font-size="15">pulse 1</text>
<line x1="330" y1="52" x2="330" y2="88" stroke="var(--c1)" stroke-width="4"/>
<text x="306" y="44" fill="var(--c1)" font-size="15">pulse 2</text>
<line x1="70" y1="106" x2="430" y2="106" stroke="var(--c2)" stroke-width="3" stroke-dasharray="7 5"/>
<polygon points="438,106 422,99 422,113" fill="var(--c2)"/>
<text x="120" y="128" fill="var(--c2)" font-size="15">deep echo from pulse 1 is still travelling</text>
<line x1="430" y1="150" x2="430" y2="70" stroke="var(--c4)" stroke-width="3"/>
<text x="352" y="170" fill="var(--c4)" font-size="15">arrives after pulse 2</text>
<text x="40" y="206" fill="currentColor" font-size="15">machine assumes it belongs to pulse 2 → small time</text>
<text x="40" y="232" fill="currentColor" font-size="15">→ the deep structure is painted in the near field</text>
<text x="40" y="252" fill="var(--muted)" font-size="15">fix: lower PRF / increase depth</text>
</svg>`,
          caption: "Range ambiguity: a late echo is credited to the newest pulse and drawn far too shallow."
        },
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>A pulse bouncing off two interfaces before returning, displayed too deep</title>
<text x="14" y="24" fill="var(--c3)" font-size="16">what the sound did</text>
<text x="360" y="24" fill="var(--c3)" font-size="16">what the image shows</text>
<line x1="330" y1="10" x2="330" y2="232" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4"/>
<rect x="60" y="40" width="56" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="88" y1="56" x2="200" y2="140" stroke="var(--c1)" stroke-width="3"/>
<line x1="200" y1="140" x2="270" y2="90" stroke="var(--c1)" stroke-width="3"/>
<line x1="270" y1="90" x2="88" y2="56" stroke="var(--c2)" stroke-width="2" stroke-dasharray="6 4"/>
<circle cx="200" cy="140" r="9" fill="var(--c4)"/>
<circle cx="270" cy="90" r="9" fill="var(--c4)"/>
<text x="40" y="208" fill="currentColor" font-size="15">long, zig-zag path = long time</text>
<rect x="430" y="40" width="56" height="16" fill="none" stroke="var(--muted)" stroke-width="2"/>
<line x1="458" y1="56" x2="458" y2="186" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"/>
<circle cx="458" cy="186" r="9" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="360" y="218" fill="currentColor" font-size="15">structure drawn too deep, blurred</text>
</svg>`,
          caption: "Multipath: the extra travel time from a bounced route is charged as extra depth."
        }
      ],
      sayIt: "Say out loud: what makes range ambiguity happen, which way the ghost is displaced, the fix, and what multipath does to depth.",
      keyPoints: [
        "Range ambiguity = high PRF (short PRP): a deep echo arrives after the next pulse",
        "The late echo is assigned to the newest pulse and drawn too shallow",
        "Max unambiguous depth (cm) ≈ 77,000 ÷ PRF (Hz)",
        "Fix: lower PRF / increase displayed depth (costs frame rate and Nyquist limit)",
        "Multipath = extra bounces, longer path → structure displayed too deep and blurred"
      ]
    },

    {
      id: "u13-l10",
      title: "Doppler artifacts and the fix toolbox",
      objectives: ["u13-o10", "u13-o11"],
      html: `<p class="lead">Doppler has its own family of lies, and almost all of them are cured by one of seven moves.</p>
<p><span class="kw">Aliasing</span> occurs in pulsed sampling above PRF/2. Raise PRF/scale, lower frequency or depth, or use CW. Baseline shift only reallocates display range and does not change Nyquist; maintain an acceptable angle rather than steering toward 90°.</p>
<p><span class="kw">Doppler mirror image (crosstalk)</span> — a symmetrical copy of the spectrum on the other side of the baseline. Two causes: too much Doppler gain, or a beam-to-flow angle near 90°, where the machine cannot decide on direction. Fixes: lower Doppler gain, change the angle away from 90°, and reduce output.</p>
<p><span class="kw">Clutter and flash</span> — big, low-frequency signals from moving walls, cardiac pulsation, breathing, or transducer motion, splashing colour across the image. Fixes: raise the wall filter, lower colour gain, ask the patient to hold still and breathe out, and hold the probe steady.</p>
<p><span class="kw">Twinkling</span> — a rapidly changing mosaic of colour behind a strongly reflective rough surface such as a kidney stone. It is an artifact, and it is useful: it helps you find stones.</p>
<div class="callout key">Compare multiple planes and windows with expected anatomy and artifact physics. Real anatomy also changes appearance and screen position as the scan plane moves, so motion alone does not prove an artifact.</div>
<div class="callout warn">Careful with compounding: it beautifully removes reverberation clutter and edge shadows, but it can also erase the posterior shadow you needed to call a stone.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>Spectral aliasing wrapping around the baseline when the shift exceeds the Nyquist limit</title>
<line x1="60" y1="130" x2="560" y2="130" stroke="currentColor" stroke-width="2"/>
<text x="20" y="134" fill="var(--muted)" font-size="15">0</text>
<line x1="60" y1="60" x2="560" y2="60" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/>
<text x="20" y="64" fill="var(--muted)" font-size="15">PRF/2</text>
<line x1="60" y1="200" x2="560" y2="200" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/>
<text x="6" y="204" fill="var(--muted)" font-size="15">-PRF/2</text>
<line x1="90" y1="130" x2="150" y2="70" stroke="var(--c1)" stroke-width="3"/>
<line x1="150" y1="70" x2="210" y2="130" stroke="var(--c1)" stroke-width="3"/>
<text x="120" y="50" fill="var(--c1)" font-size="15">fits</text>
<line x1="300" y1="130" x2="340" y2="60" stroke="var(--c2)" stroke-width="3"/>
<line x1="340" y1="200" x2="380" y2="160" stroke="var(--c2)" stroke-width="3"/>
<line x1="380" y1="160" x2="420" y2="200" stroke="var(--c2)" stroke-width="3"/>
<line x1="420" y1="60" x2="460" y2="130" stroke="var(--c2)" stroke-width="3"/>
<text x="315" y="234" fill="var(--c2)" font-size="14">peak wraps below baseline</text>
<text x="300" y="44" fill="currentColor" font-size="15">shift exceeds PRF/2</text>
</svg>`,
          caption: "Aliasing: shifts above the Nyquist limit (PRF ÷ 2) wrap to the other side of the baseline."
        }
      ],
      sayIt: "Say out loud: the four Doppler artifacts, one cause and one fix for each, and the seven general moves for taming any artifact.",
      keyPoints: [
        "Aliasing: shift above Nyquist (PRF ÷ 2); unique to pulsed systems; CW cannot alias",
        "Aliasing fixes: raise scale/PRF, shift baseline, lower frequency, shallower depth, larger angle, CW",
        "Doppler mirror/crosstalk: too much gain or a 90° angle; lower gain, change angle",
        "Clutter/flash: wall, breathing or probe motion; raise wall filter, lower colour gain, hold still",
        "Twinkling: colour mosaic behind a rough stone — an artifact that helps",
        "Toolbox: angle, window, transducer/frequency, gain/output, PRF/depth, harmonics, compounding"
      ]
    }
  ],

  mnemonics: [
    { saying: "Every artifact is a broken promise.", meaning: "The machine promises: straight line, direct round trip, 1,540 m/s, uniform attenuation, echoes only from the main axis, one pulse at a time. Name the broken promise and you can usually name the artifact.", lesson: "u13-l1" },
    { saying: "Two walls, one ladder.", meaning: "Reverberation needs two strong parallel reflectors; the image shows equally spaced rungs getting dimmer with depth.", lesson: "u13-l2" },
    { saying: "Metal makes a comet, gas rings a bell.", meaning: "Comet tail = closely spaced reverberations from small strong reflectors (clips, crystals) that taper; ring-down = resonating gas making a continuous unbroken line.", lesson: "u13-l2" },
    { saying: "Stones make shade, water makes sunshine.", meaning: "High-attenuation structures (stone, bone, gas) cast a dark shadow; low-attenuation fluid produces bright enhancement beneath it.", lesson: "u13-l3" },
    { saying: "Curves wear eyeliner.", meaning: "Edge shadow: a thin dark line drawn down from each shoulder of a curved wall, caused by refraction rather than absorption.", lesson: "u13-l3" },
    { saying: "The diaphragm is a funhouse mirror: the twin is deeper, beyond, and dimmer.", meaning: "Mirror image puts a duplicate on the far side of a strong reflector, at an equal distance past it, always weaker than the real structure.", lesson: "u13-l5" },
    { saying: "Mirrors go deeper, refraction goes sideways.", meaning: "Mirror-image duplicates appear below the real structure; refraction duplicates appear beside it at the same depth.", lesson: "u13-l6" },
    { saying: "Side lobes are solo, grating lobes gang up.", meaning: "Side lobes come from any single element; grating lobes need an array of many regularly spaced elements.", lesson: "u13-l7" },
    { saying: "Fast tissue, too close; slow tissue, too far.", meaning: "Speed error: a medium faster than 1,540 m/s returns echoes early so the structure is drawn too shallow; a slower medium (fat) returns them late so it is drawn too deep.", lesson: "u13-l8" },
    { saying: "If it moves when you move, it's a lie.", meaning: "Re-scan from a different angle or window. True anatomy keeps its position and shape; mirror images, lobe debris, edge shadows and range-ambiguity ghosts shift or vanish.", lesson: "u13-l10" }
  ],

  formulas: [
    { name: "Range equation (how depth is computed)", expr: "depth = 1.54 mm/µs × round-trip time ÷ 2", units: "mm, µs", note: "The origin of speed error and range ambiguity; 13 µs of round trip per cm of depth." },
    { name: "Displayed depth with speed error", expr: "displayed depth = true depth × (1,540 ÷ actual speed)", units: "cm", note: "Slower medium → number greater than 1 → displayed too deep. Faster → displayed too shallow." },
    { name: "Snell's law (refraction)", expr: "sin θtransmit ÷ sin θincident = c2 ÷ c1", units: "degrees", note: "Bending needs oblique incidence AND a speed difference; no speed change means no bending." },
    { name: "Maximum unambiguous depth", expr: "depth (cm) ≈ 77,000 ÷ PRF (Hz)", units: "cm", note: "Echoes from deeper than this arrive after the next pulse and are drawn too shallow (range ambiguity)." },
    { name: "Nyquist limit (aliasing threshold)", expr: "Nyquist = PRF ÷ 2", units: "Hz", note: "Doppler shifts larger than this wrap around; CW has no PRF, so it cannot alias." },
    { name: "Reverberation copy spacing", expr: "spacing between copies = true separation of the two reflectors", units: "cm", note: "Copy n appears at n × the true depth of the second reflector." }
  ],

  keyNumbers: [
    { fact: "Speed the machine always assumes", value: "1,540 m/s = 1.54 mm/µs" },
    { fact: "Round-trip time per cm of depth", value: "13 µs per cm" },
    { fact: "Speed in fat (slower → structures drawn too deep)", value: "about 1,450 m/s" },
    { fact: "Speed in muscle (faster → structures drawn too shallow)", value: "about 1,600 m/s" },
    { fact: "Speed in bone", value: "about 3,500 m/s (far faster than 1,540)" },
    { fact: "Speed in air/lung gas", value: "about 330 m/s (and a huge impedance mismatch → shadowing)" },
    { fact: "Typical soft-tissue attenuation TGC assumes", value: "about 0.5 dB per cm per MHz" },
    { fact: "Maximum unambiguous depth at 10 kHz PRF", value: "about 7.7 cm (77,000 ÷ 10,000)" },
    { fact: "Typical imaging PRF range", value: "about 4,000–10,000 Hz (4–10 kHz)" },
    { fact: "Relative strength of lobe energy", value: "roughly 1% of main-beam amplitude — visible only in anechoic areas" }
  ],

  flashcards: [
    { front: "Artifact (definition)", back: "Anything displayed that does not correctly represent the anatomy: a structure that is missing, extra, in the wrong place, the wrong size, or the wrong brightness", lesson: "u13-l1" },
    { front: "The six assumptions the machine makes", back: "Straight line; direct round trip; 1,540 m/s; uniform attenuation; echoes only from the main axis; one pulse at a time", lesson: "u13-l1" },
    { front: "What does the machine actually measure?", back: "Round-trip time only — depth, and everything else, is inferred", lesson: "u13-l1" },
    { front: "Reverberation requires…", back: "Two strong, roughly parallel reflectors", lesson: "u13-l2" },
    { front: "Appearance of reverberation", back: "Equally spaced bright lines going deeper, each dimmer than the last", lesson: "u13-l2" },
    { front: "Equally spaced copies fading with depth → artifact?", back: "Reverberation", lesson: "u13-l2" },
    { front: "Comet tail", back: "Closely spaced reverberations from a small, very strong reflector (clip, metal IUD, crystals); short tapering bright tail", lesson: "u13-l2" },
    { front: "Ring-down", back: "Gas bubbles resonating and radiating continuously; a solid uninterrupted bright line", lesson: "u13-l2" },
    { front: "Shadowing", back: "Hypoechoic/anechoic band deep to a strongly attenuating or strongly reflecting structure (stone, bone, gas)", lesson: "u13-l3" },
    { front: "Which assumption does shadowing violate?", back: "Uniform attenuation — TGC under-amplifies that line", lesson: "u13-l3" },
    { front: "Clean black shadow vs dirty noisy shadow", back: "Clean = stone/calcification (absorption); dirty = gas (reflection plus reverberation)", lesson: "u13-l3" },
    { front: "Edge shadow (refractive shadow)", back: "Thin dark line from the shoulder of a curved structure, caused by refraction of the beam, not absorption", lesson: "u13-l3" },
    { front: "Enhancement", back: "Brighter region deep to a low-attenuation (fluid) structure, because TGC over-amplifies that line", lesson: "u13-l4" },
    { front: "Is tissue behind a cyst really more reflective?", back: "No — only the applied gain is wrong; the tissue is unchanged", lesson: "u13-l4" },
    { front: "Focal enhancement (banding)", back: "Bright horizontal stripe at the focal depth where the beam is narrowest; moves when the focus moves", lesson: "u13-l4" },
    { front: "Slice-thickness artifact", back: "Elevational beam thickness paints adjacent tissue into anechoic spaces — fake debris in a cyst or bladder", lesson: "u13-l4" },
    { front: "Mirror image cause", back: "A strong, smooth reflector (classically the diaphragm) sends the beam on a bounced detour", lesson: "u13-l5" },
    { front: "Where is a mirror-image duplicate drawn?", back: "Deeper than the real structure, on the far side of the mirror, equidistant, and dimmer", lesson: "u13-l5" },
    { front: "Two conditions for refraction", back: "Oblique incidence AND different propagation speeds in the two media", lesson: "u13-l6" },
    { front: "Snell's law", back: "sin θtransmit ÷ sin θincident = c2 ÷ c1", lesson: "u13-l6" },
    { front: "Side-by-side duplication of the aorta", back: "Refraction artifact (often at the rectus muscle boundary) — copies at the same depth", lesson: "u13-l6" },
    { front: "Refraction vs mirror image direction", back: "Refraction displaces/duplicates sideways; mirror image duplicates deeper", lesson: "u13-l6" },
    { front: "Side lobes", back: "Weak off-axis energy from radial expansion of an element; occur with any transducer", lesson: "u13-l7" },
    { front: "Grating lobes", back: "Off-axis beams from the regular spacing of array elements; arrays only, stronger than side lobes", lesson: "u13-l7" },
    { front: "How does the machine reduce grating lobes?", back: "Subdicing (spacing under one wavelength) and apodization (weaker drive to outer elements)", lesson: "u13-l7" },
    { front: "Why are lobe artifacts seen mainly in dark areas?", back: "Lobe echoes are very weak (~1% of the main beam), so they only stand out where the image should be anechoic", lesson: "u13-l7" },
    { front: "Speed error in fat (1,450 m/s)", back: "Echo returns late → structure displayed too deep", lesson: "u13-l8" },
    { front: "Speed error in a fast medium (1,600+ m/s)", back: "Echo returns early → structure displayed too shallow", lesson: "u13-l8" },
    { front: "Displayed depth formula with speed error", back: "displayed depth = true depth × 1,540 ÷ actual speed", lesson: "u13-l8" },
    { front: "Broken/stepped diaphragm behind a fatty lesion", back: "Propagation speed error across part of the beam path", lesson: "u13-l8" },
    { front: "Range ambiguity", back: "PRF too high: a deep echo arrives after the next pulse and is drawn too shallow", lesson: "u13-l9" },
    { front: "Fix for range ambiguity", back: "Lower the PRF — usually by increasing the imaging depth (costs frame rate and Nyquist limit)", lesson: "u13-l9" },
    { front: "Maximum unambiguous depth", back: "≈ 77,000 ÷ PRF (Hz) in cm", lesson: "u13-l9" },
    { front: "Multipath", back: "Pulse bounces off several interfaces; the longer path is displayed as extra depth, with blurring", lesson: "u13-l9" },
    { front: "Aliasing", back: "Doppler shift greater than Nyquist (PRF ÷ 2) wraps to the other side of the baseline; pulsed systems only", lesson: "u13-l10" },
    { front: "Two causes of Doppler mirror image (crosstalk)", back: "Doppler gain too high, or beam-to-flow angle near 90°", lesson: "u13-l10" },
    { front: "Clutter/flash fix", back: "Raise the wall filter, lower colour gain, steady the probe, suspend respiration", lesson: "u13-l10" },
    { front: "Twinkling artifact", back: "Rapid colour mosaic behind a rough strong reflector such as a kidney stone — artifact, but useful", lesson: "u13-l10" },
    { front: "Seven general artifact fixes", back: "Angle, window, transducer/frequency, gain/output, PRF/depth, harmonics, spatial compounding", lesson: "u13-l10" },
    { front: "Which imaging technique suppresses reverberation and lobe clutter?", back: "Tissue harmonic imaging (harmonics build up only on the strong main axis)", lesson: "u13-l10" }
  ],

  questions: [
    { id: "u13-q1", type: "mc", q: "Which of these is NOT one of the assumptions the imaging system makes when it places an echo on the screen?", choices: ["Sound travels in a straight line", "Echoes come only from the beam's main axis", "Sound travels at 1,540 m/s in every tissue", "Some echoes arrive from off-axis lobes and must be repositioned"], answer: 3, explain: "The machine assumes the opposite: that every echo came from the main axis, which is exactly why lobe echoes get painted on axis. The first three are genuine assumptions. The tempting distractor is 'echoes come only from the main axis' — that IS an assumption, so it is not the answer.", objectives: ["u13-o1"], lesson: "u13-l1", level: 1 },
    { id: "u13-q2", type: "mc", q: "Along an otherwise straight path through uniformly slower-than-assumed tissue, a structure is displayed too deep. Which assumption failed?", choices: ["Sound travels at 1,540 m/s", "Attenuation is uniform", "Echoes come from the main axis", "Each echo belongs to the newest pulse"], answer: 0, explain:"The slower speed delays the echo. Specifying a straight uniform path removes multipath and other possible causes of excess travel time.",objectives:["u13-o1","u13-o8"],lesson:"u13-l1",level:2 },
    { id: "u13-q3", type: "mc", q: "Equally spaced bright lines, each dimmer than the one above it, run down the image from a metallic needle. What is this?", choices: ["Reverberation", "Mirror image", "Side lobe artifact", "Range ambiguity"], answer: 0, explain: "Equal spacing along one line plus progressive dimming is the signature of reverberation between two strong parallel reflectors. Mirror image gives one duplicate across an interface, not a repeating ladder.", objectives: ["u13-o2"], lesson: "u13-l2", level: 1 },
    { id: "u13-q4", type: "mc", q: "A surgical clip produces a short, closely spaced, tapering bright tail. A pocket of bowel gas produces an unbroken bright stripe to the bottom of the image. Which pair of names is correct?", choices: ["Clip = ring-down; gas = comet tail", "Clip = comet tail; gas = ring-down", "Both are comet tail", "Both are ring-down"], answer: 1, explain: "Comet tail is dense reverberation inside a small strong reflector (metal, crystals) and tapers; ring-down is gas resonating and radiating continuously, so it does not taper. The reversed pairing is the classic trap — remember 'metal makes a comet, gas rings a bell.'", objectives: ["u13-o2"], lesson: "u13-l2", level: 2 },
    { id: "u13-q5", type: "mc", q: "Which single change is most likely to reduce reverberation between the probe face and a flat anterior wall?", choices: ["Increase overall gain", "Change the scanning angle or window so the surfaces are no longer parallel to the beam", "Increase the PRF", "Decrease the displayed depth"], answer: 1, explain: "Reverberation needs two parallel reflectors perpendicular to the beam; breaking that geometry breaks the ladder. Increasing gain makes the artifact more obvious, not less, and PRF/depth changes affect range ambiguity, not reverberation.", objectives: ["u13-o2", "u13-o11"], lesson: "u13-l2", level: 2 },
    { id: "u13-q6", type: "mc", q: "An anechoic band the same width as a gallstone runs from the stone to the bottom of the image. What is it?", choices: ["Shadowing", "Enhancement", "Edge shadow", "Slice-thickness artifact"], answer: 0, explain: "High attenuation/reflection at the stone leaves too little sound for the deeper tissue, and TGC under-amplifies it — a shadow. Edge shadow is tempting, but that is a thin line from a curved shoulder, not a full-width band under the body of the stone.", objectives: ["u13-o3"], lesson: "u13-l3", level: 1 },
    { id: "u13-q7", type: "mc", q: "Thin dark lines run down from both shoulders of a simple cyst. What caused them?", choices: ["Absorption within the cyst fluid", "Refraction of the beam at the curved wall", "Grating lobes from the array", "A high PRF", ], answer: 1, explain: "At the curved shoulder the beam hits obliquely and refracts away from the scan line, so that line receives little sound — a refractive (edge) shadow. Cyst fluid attenuates very little, which is why the region under the middle is bright, not dark.", objectives: ["u13-o3", "u13-o6"], lesson: "u13-l3", level: 2 },
    { id: "u13-q8", type: "mc", q: "Shadowing and enhancement are both consequences of violating which assumption?", choices: ["Straight-line travel", "Uniform attenuation along every scan line", "One pulse at a time", "Echoes come from the main axis"], answer: 1, explain: "TGC applies one depth ramp assuming average attenuation everywhere. A high-attenuation path is under-corrected (shadow) and a low-attenuation path is over-corrected (enhancement). Straight-line travel governs position artifacts like mirror image and refraction.", objectives: ["u13-o3", "u13-o1"], lesson: "u13-l3", level: 2 },
    { id: "u13-q9", type: "mc", q: "A bright column appears deep to a simple ovarian cyst. The correct statement is:", choices: ["The tissue behind the cyst is genuinely more reflective", "The cyst is emitting extra sound", "The TGC over-amplified that line because the fluid attenuated very little", "The beam was focused at that depth"], answer: 2, explain: "Enhancement is a gain artifact: the standard TGC ramp adds the amplification appropriate to soft tissue, but the fluid path lost hardly any energy. Nothing about the deep tissue changed — that is the most tempting wrong answer.", objectives: ["u13-o4"], lesson: "u13-l4", level: 1 },
    { id: "u13-q10", type: "mc", q: "A simple bladder shows low-level 'debris' that does not layer dependently, shows no flow, and disappears when you angle the probe. Most likely cause?", choices: ["Slice-thickness (elevational) artifact", "True sediment", "Reverberation", "Speed error"], answer: 0, explain: "Elevational beam thickness includes tissue beside the anechoic space and paints it inside — it moves with the beam and does not obey gravity. True sediment layers dependently and stays put when you re-angle.", objectives: ["u13-o4", "u13-o11"], lesson: "u13-l4", level: 2 },
    { id: "u13-q11", type: "mc", q: "A liver lesion appears to be duplicated above the diaphragm, inside the chest. Where is the duplicate relative to the real lesion, and why?", choices: ["Shallower, because the bounced path is shorter", "Deeper and beyond the diaphragm, because the bounced path takes longer", "Beside it at the same depth, because the beam bent", "At the same place but brighter, because the diaphragm reflects strongly"], answer: 1, explain: "The mirror path (down, off the lesion, off the diaphragm, back) takes longer, and extra time is drawn as extra depth on the far side of the reflector. 'Beside it at the same depth' describes refraction duplication, not mirroring.", objectives: ["u13-o5"], lesson: "u13-l5", level: 2 },
    { id: "u13-q12", type: "mc", q: "What is the best way to confirm that a suspicious structure is a mirror-image artifact?", choices: ["Increase the overall gain", "Turn off the TGC", "Scan the same area from a different angle or acoustic window and see whether it persists", "Increase the frame rate"], answer: 2, explain: "Mirror images depend on a specific geometry between the beam and the strong reflector; change the geometry and the twin distorts or disappears while real anatomy holds its shape and position. Raising the gain only makes the false copy easier to see.", objectives: ["u13-o5", "u13-o11"], lesson: "u13-l5", level: 2 },
    { id: "u13-q13", type: "mc", q: "Refraction of a sound beam requires:", choices: ["Perpendicular incidence and an impedance difference", "Oblique incidence and a propagation speed difference", "Oblique incidence and equal speeds", "Any incidence angle as long as impedances differ"], answer: 1, explain: "Snell's law bends the transmitted beam only when the beam arrives obliquely AND the speeds differ. Impedance differences govern how much energy reflects, not whether the transmitted beam bends — and at 90° incidence nothing bends at all.", objectives: ["u13-o6"], lesson: "u13-l6", level: 2 },
    { id: "u13-q14", type: "mc", q: "On a transverse upper-abdominal image, two aortas appear side by side at the same depth. What is the artifact and the fix?", choices: ["Mirror image; lower the gain", "Refraction duplication; move or re-angle the probe toward normal incidence", "Range ambiguity; raise the PRF", "Grating lobe; use a single-element probe"], answer: 1, explain: "Side-by-side copies at equal depth are the hallmark of refraction, typically at the rectus muscle or fat boundary; changing the approach angle removes the bending. Mirror images are duplicated deeper, not beside, and range ambiguity displaces deep structures shallower.", objectives: ["u13-o6", "u13-o11"], lesson: "u13-l6", level: 2 },
    { id: "u13-q15", type: "mc", q: "Grating lobes occur with:", choices: ["Any transducer, including single-element probes", "Array transducers only", "Continuous-wave transducers only", "Mechanical transducers only"], answer: 1, explain: "Grating lobes arise from the regular spacing of separate elements, so they need an array. Side lobes are the ones that occur with any transducer, including a single crystal — that is the distractor being tested.", objectives: ["u13-o7"], lesson: "u13-l7", level: 1 },
    { id: "u13-q16", type: "mc", q: "Which pair of design techniques reduces grating lobes?", choices: ["Subdicing and apodization", "Damping and matching layers", "Coded excitation and compression", "Write magnification and read magnification"], answer: 0, explain: "Subdicing cuts each element into pieces so spacing stays below a wavelength, and apodization drives the outer elements more weakly; both suppress lobe energy. Damping and matching layers improve bandwidth and transmission, not lobe structure.", objectives: ["u13-o7", "u13-o11"], lesson: "u13-l7", level: 2 },
    { id: "u13-q17", type: "mc", q: "A structure is imaged through several centimetres of fat (about 1,450 m/s). Compared with its true position, it will be displayed:", choices: ["Too shallow", "Too deep", "Laterally displaced", "In the correct position but too bright"], answer: 1, explain: "Slower than 1,540 m/s means the echo arrives later than the machine's ruler expects, and more time equals more displayed depth. 'Too shallow' is what happens in a faster-than-1,540 medium such as muscle.", objectives: ["u13-o8"], lesson: "u13-l8", level: 2 },
    { id: "u13-q18", type: "mc", q: "A reflector truly 5.0 cm deep is imaged entirely through a medium with a speed of 1,600 m/s. The displayed depth is closest to:", choices: ["4.8 cm", "5.0 cm", "5.2 cm", "5.5 cm"], answer: 0, explain: "displayed depth = true depth × 1,540 ÷ actual speed = 5.0 × 1,540/1,600 ≈ 4.81 cm, i.e. too shallow because the fast medium returns the echo early. Choosing 5.2 cm reverses the direction — that happens only when the medium is slower than 1,540 m/s.", objectives: ["u13-o8"], lesson: "u13-l8", level: 3 },
    { id: "u13-q19", type: "mc", q: "You suspect range ambiguity. Which change fixes it?", choices: ["Increase the PRF", "Decrease the imaging depth", "Increase the imaging depth, which lowers the PRF", "Increase the output power"], answer: 2, explain: "Range ambiguity happens when the listening time is too short for deep echoes; increasing displayed depth makes the machine lengthen the PRP (lower PRF) so the late echo is credited to the correct pulse. Increasing PRF or decreasing depth makes it worse.", objectives: ["u13-o9", "u13-o11"], lesson: "u13-l9", level: 2 },
    { id: "u13-q20", type: "mc", q: "Multipath artifact places a structure:", choices: ["Too deep, because the bounced path takes longer", "Too shallow, because the echo returns early", "At the correct depth but too dark", "Duplicated side by side at the same depth"], answer: 0, explain: "Extra bounces lengthen the journey, and the machine converts the extra time into extra depth (often with blurring and lateral error). Echoes returning early and displaying too shallow describe range ambiguity or a fast medium instead.", objectives: ["u13-o9"], lesson: "u13-l9", level: 2 },
    { id: "u13-q21", type: "mc", q: "Colour flow in the centre of a vessel abruptly changes to the opposite colour while the true flow direction has not changed. Which fix is LEAST likely to help?", choices: ["Raise the colour scale (PRF)", "Shift the baseline", "Increase the colour gain", "Use a lower-frequency probe"], answer: 2, explain: "This is aliasing; raising PRF, shifting the baseline and lowering the operating frequency all raise the effective Nyquist headroom. Colour gain changes brightness/sensitivity only and cannot unwrap a shift that exceeded PRF ÷ 2.", objectives: ["u13-o10", "u13-o11"], lesson: "u13-l10", level: 2 },
    { id: "u13-q22", type: "mc", q: "A rapidly changing mosaic of colour appears behind a kidney stone on colour Doppler. This is:", choices: ["Aliasing", "Twinkling artifact", "Clutter", "Doppler mirror image"], answer: 1, explain: "Twinkling is a colour artifact produced by rough, strongly reflective surfaces such as stones, and it is clinically useful for finding them. Aliasing produces a colour reversal inside a vessel with real flow, not a mosaic behind a solid reflector.", objectives: ["u13-o10"], lesson: "u13-l10", level: 2 },
    { id: "u13-q23", type: "mc", q: "A symmetrical copy of a spectral Doppler waveform appears on the opposite side of the baseline. The two things to check first are:", choices: ["Wall filter and sample volume size", "Doppler gain and the beam-to-flow angle", "Depth and frame rate", "Focus position and line density"], answer: 1, explain: "Doppler mirror image (crosstalk) comes from excessive Doppler gain or a beam-to-flow angle near 90°, where direction cannot be resolved. The wall filter removes low frequencies near the baseline and would not create a full mirrored spectrum.", objectives: ["u13-o10", "u13-o11"], lesson: "u13-l10", level: 2 },
    { id: "u13-q24", type: "mc", q: "Which technique both reduces reverberation clutter and can erase the posterior shadow you were using to identify a stone?", choices: ["Spatial compounding", "Coded excitation", "Read magnification", "Increasing the wall filter"], answer: 0, explain: "Spatial compounding averages frames from several steering angles, which suppresses clutter and edge shadows but also fills in genuine shadows — a real clinical trade-off. Read magnification only enlarges stored pixels and changes no acoustic behaviour.", objectives: ["u13-o11"], lesson: "u13-l10", level: 3 },

    { id: "u13-q25", type: "tf", q: "Enhancement means the tissue deep to a cyst is genuinely more reflective than neighbouring tissue.", answer: false, explain: "False. The deep tissue is unchanged; the fluid path attenuated less than TGC assumed, so that line was over-amplified. It is a gain artifact, not a tissue property.", objectives: ["u13-o4", "u13-o1"], lesson: "u13-l4", level: 1 },
    { id: "u13-q26", type: "tf", q: "A clean, black shadow deep to a structure suggests strong attenuation or reflection by that structure, such as a stone or calcification.", answer: true, explain: "True. Absorption or a huge impedance mismatch removes the sound that would have travelled deeper, leaving an under-amplified band. Gas shadows are also dark but typically dirty and noisy from associated reverberation.", objectives: ["u13-o3"], lesson: "u13-l3", level: 1 },
    { id: "u13-q27", type: "tf", q: "A mirror-image duplicate is displayed shallower than the real structure.", answer: false, explain: "False. The mirrored path is longer than a direct round trip, so the extra time becomes extra depth: the twin is always deeper and on the far side of the reflector, and dimmer than the original.", objectives: ["u13-o5"], lesson: "u13-l5", level: 1 },
    { id: "u13-q28", type: "tf", q: "Side lobes occur only with array transducers, while grating lobes occur with any transducer.", answer: false, explain: "False — it is the other way round. Side lobes come from radial expansion of any element, including a single crystal; grating lobes require the regular element spacing of an array.", objectives: ["u13-o7"], lesson: "u13-l7", level: 1 },
    { id: "u13-q29", type: "tf", q: "Increasing the imaging depth lowers the PRF and therefore reduces the chance of range-ambiguity artifact.", answer: true, explain: "True. Greater depth forces a longer listening time (longer PRP, lower PRF), so deep echoes get home before the next pulse. The cost is a lower frame rate and, in Doppler, a lower Nyquist limit.", objectives: ["u13-o9", "u13-o11"], lesson: "u13-l9", level: 2 },

    { id: "u13-q30", type: "short", q: "Name the artifact: closely spaced reverberations inside a small, strong reflector such as a metal clip, producing a short tapering bright tail.", answer: "comet tail", accept: ["comet tail", "comet-tail", "comet tail artifact", "comet"], explain: "Comet tail is dense internal reverberation in a tiny strong reflector. Ring-down would be the answer only if the source were resonating gas, and that line does not taper.", objectives: ["u13-o2"], lesson: "u13-l2", level: 1 },
    { id: "u13-q31", type: "short", q: "Name the artifact: resonating gas bubbles radiating sound continuously, drawn as a solid unbroken bright line.", answer: "ring-down", accept: ["ring down", "ring-down", "ringdown", "ring-down artifact"], explain: "Gas resonance produces a continuous emission rather than discrete echoes, so the line has no gaps and no taper — the feature that separates it from comet tail.", objectives: ["u13-o2"], lesson: "u13-l2", level: 1 },
    { id: "u13-q32", type: "short", q: "Name the thin dark line seen deep to the shoulder of a curved structure, caused by refraction rather than absorption.", answer: "edge shadow", accept: ["edge shadow", "edge shadowing", "refraction shadow", "refractive shadow", "edge artifact"], explain: "The beam strikes the curved wall obliquely and bends away from the scan line, starving it of sound. It disappears when you re-angle so the surface is no longer oblique.", objectives: ["u13-o3"], lesson: "u13-l3", level: 2 },
    { id: "u13-q33", type: "short", q: "Name the artifact: a brighter-than-expected region deep to a fluid-filled structure.", answer: "enhancement", accept: ["enhancement", "posterior enhancement", "acoustic enhancement", "through transmission", "through-transmission"], explain: "Low attenuation through fluid plus a standard TGC ramp equals over-amplification beneath. It is strong evidence that the structure is fluid.", objectives: ["u13-o4"], lesson: "u13-l4", level: 1 },
    { id: "u13-q34", type: "short", q: "Which law describes how much a beam bends when it crosses obliquely into a medium with a different propagation speed?", answer: "Snell's law", accept: ["snells law", "snell's law", "snell", "law of refraction"], explain: "Snell's law relates the transmission and incidence angles to the ratio of the two speeds; with equal speeds the ratio is 1 and the beam continues straight, so no refraction artifact occurs.", objectives: ["u13-o6"], lesson: "u13-l6", level: 1 },
    { id: "u13-q35", type: "short", q: "What propagation speed does the imaging system assume for every tissue (number and unit)?", answer: "1,540 m/s", accept: ["1540 m/s", "1,540 m/s", "1540", "1.54 mm/us", "1.54 mm/µs", "1540 meters per second"], explain: "Every displayed depth is computed from that constant, which is why any tissue that is faster or slower shifts structures along the beam (speed error).", objectives: ["u13-o8", "u13-o1"], lesson: "u13-l8", level: 1 },
    { id: "u13-q36", type: "short", q: "Name the artifact in which an echo from an earlier pulse is credited to the newest pulse and drawn too shallow.", answer: "range ambiguity", accept: ["range ambiguity", "range ambiguity artifact", "ambiguity"], explain: "It comes from a PRF that is too high for the depth of the reflector. Lowering PRF (increasing displayed depth) restores enough listening time for the echo to be assigned correctly.", objectives: ["u13-o9"], lesson: "u13-l9", level: 2 },
    { id: "u13-q37", type: "short", q: "Name the Doppler artifact that occurs when the Doppler shift exceeds PRF ÷ 2.", answer: "aliasing", accept: ["aliasing", "alias", "aliasing artifact"], explain: "Above the Nyquist limit the display wraps to the opposite side of the baseline. Continuous-wave Doppler has no PRF and therefore cannot alias, which is one of the fixes.", objectives: ["u13-o10"], lesson: "u13-l10", level: 1 },
    { id: "u13-q38", type: "short", q: "Which imaging technique suppresses reverberation and lobe clutter by imaging with the harmonic rather than the fundamental frequency?", answer: "harmonic imaging", accept: ["harmonics", "harmonic imaging", "tissue harmonics", "tissue harmonic imaging", "thi"], explain: "Harmonic energy builds up only where intensity is high — along the strong central part of the beam — so weak off-axis and multiply reflected signals contribute much less. Compounding also helps but by averaging angles, not by frequency selection.", objectives: ["u13-o11"], lesson: "u13-l10", level: 2 }
  ],

  drills: [
    {
      id: "u13-d1",
      title: "Name the artifact from the description",
      formula: "description → artifact name",
      lesson: "u13-l10",
      gen: function (rnd) {
        var items = [
          { n: "Reverberation", d: ["Equally spaced bright lines march down the image from a flat anterior surface, each one dimmer than the last.", "A needle in the near field produces a stack of evenly spaced copies deeper in the image.", "Bright parallel lines repeat at a constant interval below two flat surfaces."] },
          { n: "Comet tail", d: ["A surgical clip throws a short, closely spaced bright tail that tapers away within a centimetre.", "Cholesterol crystals in the gallbladder wall produce tiny tapering bright tails."] },
          { n: "Ring-down", d: ["A pocket of gas produces a solid, unbroken bright stripe that runs to the bottom of the image without tapering.", "Gas bubbles resonate and radiate continuously, drawing a continuous bright line."] },
          { n: "Shadowing", d: ["An anechoic band the width of a gallstone extends from its back wall to the bottom of the image.", "Nothing is visible deep to a calcified plaque; the band is clean and black."] },
          { n: "Edge shadow", d: ["Thin dark lines run down from both shoulders of a cyst, while the region under its centre is bright.", "A narrow dark line drops from the curved edge of the fetal skull."] },
          { n: "Enhancement", d: ["The tissue deep to a simple cyst looks brighter than the tissue beside it at the same depth.", "A bright column appears beneath the bladder, the width of the bladder itself."] },
          { n: "Mirror image", d: ["A copy of a liver lesion appears above the diaphragm, deeper than the real one and dimmer.", "A duplicate of the anatomy appears on the far side of a strong smooth reflector, equidistant beyond it."] },
          { n: "Refraction duplication", d: ["On a transverse abdominal image the aorta appears twice, side by side at the same depth.", "A single gestational sac appears as two sacs next to each other at equal depth."] },
          { n: "Lobe artifact", d: ["A faint curved line arcs through the anechoic bladder, coming from bowel gas off to the side.", "Pseudo-sludge appears in the gallbladder, produced by strong off-axis reflectors drawn on the main axis."] },
          { n: "Speed error", d: ["The diaphragm appears stepped and broken where the beam crossed a fatty lesion.", "A structure imaged through thick fat is displayed deeper than a CT says it is."] },
          { n: "Range ambiguity", d: ["A deep structure is superimposed on the near field; it moves when the imaging depth is increased.", "With a high PRF, a strong deep reflector appears in the shallow part of the image."] },
          { n: "Slice-thickness artifact", d: ["Low-level debris appears inside a simple cyst but does not layer dependently and vanishes when you angle the probe.", "Fake echoes fill the edge of an anechoic vessel because the beam has thickness."] }
        ];
        var i = Math.floor(rnd() * items.length); if (i >= items.length) i = items.length - 1;
        var target = items[i];
        var di = Math.floor(rnd() * target.d.length); if (di >= target.d.length) di = target.d.length - 1;
        var pool = [];
        for (var k = 0; k < items.length; k++) { if (k !== i) pool.push(items[k].n); }
        var choices = [target.n];
        while (choices.length < 4 && pool.length) {
          var j = Math.floor(rnd() * pool.length); if (j >= pool.length) j = pool.length - 1;
          choices.push(pool.splice(j, 1)[0]);
        }
        for (var s = choices.length - 1; s > 0; s--) {
          var t = Math.floor(rnd() * (s + 1)); if (t > s) t = s;
          var tmp = choices[s]; choices[s] = choices[t]; choices[t] = tmp;
        }
        var ans = 0;
        for (var c = 0; c < choices.length; c++) { if (choices[c] === target.n) ans = c; }
        return {
          kind: "choice",
          given: target.d[di],
          ask: "Which artifact is being described?",
          choices: choices,
          answer: ans,
          steps: ["Ask which assumption was broken and what the picture looks like.", "This description matches " + target.n + "."]
        };
      }
    },
    {
      id: "u13-d2",
      title: "Which assumption was violated?",
      formula: "artifact → broken assumption",
      lesson: "u13-l1",
      gen: function (rnd) {
        var A = [
          "Sound travels in a straight line, directly to and back from one reflector",
          "Sound travels at exactly 1,540 m/s in every tissue",
          "Attenuation is the same along every scan line",
          "Echoes come only from the beam's main axis (the beam has no width or thickness)",
          "Every echo belongs to the most recent pulse"
        ];
        var items = [
          { s: "A liver lesion is duplicated beyond the diaphragm, deeper and dimmer.", a: 0 },
          { s: "The pulse ricochets off two interfaces before returning, so the structure is drawn too deep.", a: 0 },
          { s: "The aorta appears twice, side by side at the same depth, on a transverse scan.", a: 0 },
          { s: "A structure imaged through thick fat is displayed deeper than it truly is.", a: 1 },
          { s: "A structure imaged through a medium at 1,600 m/s is displayed too shallow.", a: 1 },
          { s: "A clean black band appears deep to a gallstone.", a: 2 },
          { s: "The area deep to a simple cyst appears brighter than its neighbours.", a: 2 },
          { s: "Bowel gas off to the side of the beam is painted in the middle of the bladder.", a: 3 },
          { s: "Fake low-level debris appears inside a simple cyst because the beam has thickness.", a: 3 },
          { s: "With a high PRF, a deep reflector is superimposed on the near field.", a: 4 }
        ];
        var i = Math.floor(rnd() * items.length); if (i >= items.length) i = items.length - 1;
        var item = items[i];
        var idx = [0, 1, 2, 3, 4];
        var pool = [];
        for (var k = 0; k < idx.length; k++) { if (idx[k] !== item.a) pool.push(idx[k]); }
        var picked = [item.a];
        while (picked.length < 4 && pool.length) {
          var j = Math.floor(rnd() * pool.length); if (j >= pool.length) j = pool.length - 1;
          picked.push(pool.splice(j, 1)[0]);
        }
        for (var s2 = picked.length - 1; s2 > 0; s2--) {
          var t = Math.floor(rnd() * (s2 + 1)); if (t > s2) t = s2;
          var tmp = picked[s2]; picked[s2] = picked[t]; picked[t] = tmp;
        }
        var choices = [], ans = 0;
        for (var c = 0; c < picked.length; c++) { choices.push(A[picked[c]]); if (picked[c] === item.a) ans = c; }
        return {
          kind: "choice",
          given: item.s,
          ask: "Which machine assumption did the body break?",
          choices: choices,
          answer: ans,
          steps: ["Position errors break straight-line/direct-path or 1,540 m/s; brightness errors break uniform attenuation.", "Off-axis or beam-thickness echoes break the main-axis assumption; a late echo breaks the one-pulse-at-a-time assumption.", "Correct: " + A[item.a] + "."]
        };
      }
    },
    {
      id: "u13-d3",
      title: "How would you fix or confirm it?",
      formula: "artifact → best next move",
      lesson: "u13-l10",
      gen: function (rnd) {
        var items = [
          { p: "Reverberation ladder from a flat anterior wall.", f: "Change the angle/window so the surfaces are not parallel to the beam, or turn on harmonics" },
          { p: "Suspected mirror image beyond the diaphragm.", f: "Re-scan from a different acoustic window and see whether the twin persists" },
          { p: "Colour reversal in the centre of a vessel with steady flow.", f: "Raise the scale (PRF), shift the baseline, or use a lower frequency" },
          { p: "Deep structure superimposed on the near field with a high PRF.", f: "Increase the imaging depth, which lowers the PRF" },
          { p: "Low-level debris inside an otherwise simple cyst.", f: "Re-angle or use a higher-frequency probe and place the elevational focus at that depth" },
          { p: "Colour splashing across the image every time the patient breathes.", f: "Raise the wall filter, lower colour gain, and suspend respiration" },
          { p: "Symmetrical mirrored spectrum across the Doppler baseline.", f: "Lower the Doppler gain and move the angle away from 90 degrees" },
          { p: "Two aortas side by side at the same depth.", f: "Move or re-angle the probe toward normal incidence and avoid the muscle boundary" },
          { p: "Pseudo-sludge in the gallbladder from off-axis gas.", f: "Lower the gain/output and re-angle; harmonics also suppress lobe echoes" }
        ];
        var fixes = [];
        for (var k = 0; k < items.length; k++) { fixes.push(items[k].f); }
        var i = Math.floor(rnd() * items.length); if (i >= items.length) i = items.length - 1;
        var item = items[i];
        var pool = [];
        for (var k2 = 0; k2 < fixes.length; k2++) { if (k2 !== i) pool.push(fixes[k2]); }
        var choices = [item.f];
        while (choices.length < 4 && pool.length) {
          var j = Math.floor(rnd() * pool.length); if (j >= pool.length) j = pool.length - 1;
          choices.push(pool.splice(j, 1)[0]);
        }
        for (var s = choices.length - 1; s > 0; s--) {
          var t = Math.floor(rnd() * (s + 1)); if (t > s) t = s;
          var tmp = choices[s]; choices[s] = choices[t]; choices[t] = tmp;
        }
        var ans = 0;
        for (var c = 0; c < choices.length; c++) { if (choices[c] === item.f) ans = c; }
        return {
          kind: "choice",
          given: item.p,
          ask: "What is the best next move?",
          choices: choices,
          answer: ans,
          steps: ["Match the fix to the cause, not to the appearance.", "Best move: " + item.f + "."]
        };
      }
    },
    {
      id: "u13-d4",
      title: "Speed error: which way does it move?",
      formula: "displayed depth = true depth × 1,540 ÷ actual speed",
      lesson: "u13-l8",
      gen: function (rnd) {
        var media = [
          { n: "fat", c: 1450 },
          { n: "a fatty lesion", c: 1460 },
          { n: "muscle", c: 1600 },
          { n: "tendon", c: 1700 },
          { n: "liver", c: 1560 },
          { n: "a fluid collection", c: 1490 },
          { n: "bone", c: 3500 }
        ];
        var i = Math.floor(rnd() * media.length); if (i >= media.length) i = media.length - 1;
        var m = media[i];
        var depths = [3, 4, 5, 6, 8];
        var di = Math.floor(rnd() * depths.length); if (di >= depths.length) di = depths.length - 1;
        var d = depths[di];
        var faster = m.c > 1540;
        return {
          kind: "choice",
          given: "A reflector truly " + d + " cm deep is imaged through " + m.n + ", where sound travels at " + m.c + " m/s.",
          ask: "How is it displayed?",
          choices: ["Too shallow (closer to the probe)", "Too deep (farther from the probe)", "Displaced sideways", "In exactly the right place"],
          answer: faster ? 0 : 1,
          steps: [
            m.c + " m/s is " + (faster ? "faster" : "slower") + " than the assumed 1,540 m/s.",
            faster ? "Faster medium → echo returns early → less time → drawn too shallow." : "Slower medium → echo returns late → more time → drawn too deep.",
            "displayed depth = " + d + " × 1,540 ÷ " + m.c + " ≈ " + (d * 1540 / m.c).toFixed(2) + " cm."
          ]
        };
      }
    },
    {
      id: "u13-d7",
      title: "Maximum unambiguous depth from PRF",
      formula: "depth (cm) ≈ 77,000 ÷ PRF (Hz)",
      lesson: "u13-l9",
      gen: function (rnd) {
        var prfs = [2000, 2500, 4000, 5000, 7000, 8000, 10000];
        var i = Math.floor(rnd() * prfs.length); if (i >= prfs.length) i = prfs.length - 1;
        var prf = prfs[i];
        var d = 77000 / prf;
        return {
          kind: "number",
          given: "PRF = " + prf + " Hz",
          ask: "Deeper than what depth (cm) will echoes be range-ambiguous?",
          answer: +d.toFixed(2),
          unit: "cm",
          tol: 0.2,
          steps: [
            "Maximum unambiguous depth (cm) ≈ 77,000 ÷ PRF (Hz)",
            "= 77,000 ÷ " + prf,
            "≈ " + d.toFixed(1) + " cm. Echoes from deeper than this arrive after the next pulse and are drawn too shallow."
          ]
        };
      }
    },
    { id:"u13-d5",title:"Artifact equation mixer",formula:"range, speed error, max depth, Nyquist, spacing",lesson:"u13-l9",gen:function(rnd){var mode=Math.floor(rnd()*4);if(mode===0){var t=[65,130,195][Math.floor(rnd()*3)],d=1.54*t/2;return {kind:"number",given:"Round-trip time="+t+" µs",ask:"Displayed depth?",answer:d,unit:"mm",tol:0.2,steps:["depth=1.54×time÷2","=1.54×"+t+"÷2","="+d+" mm"]};}if(mode===1){var prf=[5000,7000,10000][Math.floor(rnd()*3)],d=77000/prf;return {kind:"number",given:"PRF="+prf+" Hz",ask:"Maximum unambiguous depth?",answer:+d.toFixed(2),unit:"cm",tol:0.1,steps:["depth≈77000/PRF","=77000/"+prf,"="+d.toFixed(2)+" cm"]};}if(mode===2){var trueD=[50,80,100][Math.floor(rnd()*3)],c=[1450,1480,1600][Math.floor(rnd()*3)],shown=trueD*1540/c;return {kind:"number",given:"True depth="+trueD+" mm, actual speed="+c+" m/s",ask:"Displayed depth?",answer:+shown.toFixed(2),unit:"mm",tol:0.2,steps:["displayed=true×1540/actual","="+trueD+"×1540/"+c,"="+shown.toFixed(2)+" mm"]};}var pr=[4,6,8,10][Math.floor(rnd()*4)],ny=pr/2;return {kind:"number",given:"PRF="+pr+" kHz",ask:"Nyquist limit?",answer:ny,unit:"kHz",tol:0.05,steps:["Nyquist=PRF/2","="+pr+"/2","="+ny+" kHz"]};} }
  ],

  whiteboard: [
    {
      id: "u13-w1",
      prompt: "Write the assumptions the machine makes, and beside each one list every artifact that breaks it.",
      keyPoints: [
        "Straight line → refraction, lateral displacement, duplication",
        "Direct round trip (one reflector) → mirror image, multipath, reverberation",
        "1,540 m/s everywhere → speed error: fat too deep, muscle/bone too shallow",
        "Uniform attenuation → shadowing, enhancement, focal banding",
        "Echoes only from the main axis → side lobes, grating lobes, slice thickness",
        "One pulse at a time → range ambiguity",
        "Depth = 1.54 mm/µs × time ÷ 2, i.e. 13 µs per cm",
        "An artifact is predictable physics, not a broken machine",
        "Some artifacts (shadow, enhancement, twinkling) are diagnostically useful"
      ],
      minutes: 7,
      lesson: "u13-l1"
    },
    {
      id: "u13-w2",
      prompt: "Draw the reverberation family and the attenuation family: reverberation, comet tail, ring-down, shadowing, edge shadow, enhancement. For each, sketch what the sound did and what the image shows.",
      keyPoints: [
        "Reverberation: two strong parallel reflectors; equally spaced copies, fading",
        "Copy spacing equals the true distance between the reflectors",
        "Comet tail: small strong reflector (metal, crystals); short tapering tail",
        "Ring-down: gas resonance; continuous unbroken bright line",
        "Shadowing: high attenuation or huge mismatch; dark band the width of the structure",
        "Clean shadow = stone; dirty shadow = gas",
        "Edge shadow: refraction at a curved wall; thin dark line from each shoulder",
        "Enhancement: low attenuation through fluid; over-amplified bright column beneath",
        "Focal banding: bright stripe at the focal depth, moves with the focus",
        "Fixes: angle, window, focus, gain, harmonics, compounding"
      ],
      minutes: 8,
      lesson: "u13-l2"
    },
    {
      id: "u13-w3",
      prompt: "Write everything about the artifacts that put structures in the WRONG PLACE: mirror image, refraction, lobes, speed error, range ambiguity, multipath, slice thickness.",
      keyPoints: [
        "Mirror image: strong smooth reflector (diaphragm); twin deeper, beyond, dimmer",
        "Refraction: oblique incidence + speed difference (Snell's law); displaces sideways",
        "Refraction duplication: copies side by side at the same depth",
        "Side lobes: any transducer; grating lobes: arrays only, stronger",
        "Lobe echoes are placed on the main axis; seen in anechoic areas",
        "Fixes for lobes: apodization, subdicing, lower gain, harmonics",
        "Speed error: fast → too shallow, slow → too deep; displayed = true × 1,540 ÷ actual",
        "Range ambiguity: high PRF, deep echo credited to the new pulse → drawn too shallow",
        "Max unambiguous depth ≈ 77,000 ÷ PRF (Hz); fix by increasing depth",
        "Multipath: longer bounced path → drawn too deep, blurred",
        "Slice thickness: elevational width puts fake debris in cysts and vessels"
      ],
      minutes: 9,
      lesson: "u13-l9"
    },
    {
      id: "u13-w4",
      prompt: "List the Doppler artifacts with a cause and a fix for each, then write the seven-move fix toolbox for any artifact.",
      keyPoints: [
        "Aliasing: shift greater than Nyquist (PRF ÷ 2); pulsed systems only",
        "Aliasing fixes: raise scale/PRF, shift baseline, lower frequency, shallower depth, bigger angle, CW",
        "CW Doppler cannot alias (no PRF) but has no range resolution",
        "Doppler mirror/crosstalk: gain too high or angle near 90 degrees",
        "Clutter/flash: wall, cardiac, breathing or probe motion; raise wall filter, lower colour gain",
        "Twinkling: colour mosaic behind a rough strong reflector (stone) — useful artifact",
        "Toolbox: angle, window, transducer/frequency, gain/output, PRF/depth, harmonics, compounding",
        "Always re-scan in a second plane: if it moves when you move, it is a lie",
        "Compounding removes clutter but can erase a real posterior shadow"
      ],
      minutes: 7,
      lesson: "u13-l10"
    }
  ]
});
