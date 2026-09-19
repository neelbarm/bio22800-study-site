window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u05",
  order: 5,
  title: "Transducers",
  icon: "🔎",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Transducers chapter",
  blurb: "The probe is a stack of layers built around one slice of ceramic that turns voltage into sound and sound back into voltage. This unit is about what each layer does, what sets the frequency, and the trade-offs hiding behind the words damping, bandwidth and Q-factor.",

  objectives: [
    { id: "u05-o1", text: "List the components of a transducer (case, electrical wire, insulator, active element, matching layer, backing/damping material) and state the job of each." },
    { id: "u05-o2", text: "Explain the piezoelectric effect and the reverse piezoelectric effect, and identify the active element material used in medical transducers." },
    { id: "u05-o3", text: "Define the Curie point, explain depolarization, and state the correct way to clean, disinfect and sterilize a transducer." },
    { id: "u05-o4", text: "Calculate the operating (resonant) frequency of a pulsed transducer from element thickness and the speed of sound in PZT, and calculate the thickness needed for a desired frequency." },
    { id: "u05-o5", text: "State what determines the frequency of a continuous-wave transducer and compare it with a pulsed-wave transducer." },
    { id: "u05-o6", text: "Explain the purpose of the matching layer and coupling gel, and state the matching layer's impedance and its one-quarter-wavelength thickness." },
    { id: "u05-o7", text: "Describe the backing (damping) material and list everything that changes when damping is increased or removed." },
    { id: "u05-o8", text: "Define bandwidth, fractional bandwidth and Q-factor, and calculate each from a transducer's frequency range." },
    { id: "u05-o9", text: "Compare low-Q imaging transducers with high-Q continuous-wave and therapy transducers." },
    { id: "u05-o10", text: "Explain the trade-off between damping, sensitivity and axial resolution, and predict the effect on the image." }
  ],

  lessons: [
    {
      id: "u05-l1",
      title: "What is inside the probe",
      objectives: ["u05-o1"],
      html: `<p class="lead">A transducer is a short stack of layers glued together, and every layer exists to fix one specific problem.</p>
<p>Hold a probe and imagine sawing it in half lengthwise. Working from the cable end down to the patient you would find six things:</p>
<table class="dt"><tr><th>Part</th><th>What it does</th></tr>
<tr><td><span class="kw">Case</span></td><td>The plastic housing you hold. It protects the parts, keeps the patient electrically isolated, and gives you something to grip.</td></tr>
<tr><td><span class="kw">Electrical wire</span></td><td>Carries the voltage spike from the pulser down to the crystal, and carries the tiny echo voltage back up to the receiver. Two-way street, one wire per element.</td></tr>
<tr><td><span class="kw">Insulator</span></td><td>An acoustic and electrical barrier. It keeps sound and current from leaking sideways into the case and back into your hand.</td></tr>
<tr><td><span class="kw">Active element</span></td><td>The ceramic wafer that actually converts energy: voltage in becomes sound out, sound in becomes voltage out. Also called the crystal, the PZT, or the piezoelectric element.</td></tr>
<tr><td><span class="kw">Matching layer</span></td><td>Sits in <i>front</i> of the element, between it and the skin. Its impedance is in between the two, so more sound gets out and more echo gets back in.</td></tr>
<tr><td><span class="kw">Backing material</span></td><td>Sits <i>behind</i> the element. Epoxy loaded with tungsten powder. It absorbs the backward sound and stops the crystal from ringing.</td></tr>
</table>
<p>Keep the geography straight, because exam questions live on it: <b>backing is behind, matching is in front.</b> Everything in front of the element is there to get sound <i>into</i> the patient; everything behind it is there to make the pulse <i>short</i>.</p>
<div class="callout tip">Mental picture: the element is a drum head. The matching layer is the doorway the sound leaves through, and the backing is your hand flattening the drum so it thumps once instead of ringing.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 210" role="img"><title>Cross-section of a transducer with case, wire, insulator, backing, active element, matching layer and gel labeled</title>
<text x="36" y="14" fill="currentColor" font-size="15">Electrical wire</text>
<path d="M 70 26 L 70 105 L 100 105" fill="none" stroke="var(--c4)"/>
<rect x="40" y="20" width="250" height="118" fill="none" stroke="var(--muted)"/>
<rect x="100" y="30" width="170" height="16" fill="none" stroke="var(--muted)"/>
<rect x="100" y="46" width="170" height="48" fill="none" stroke="var(--c4)"/>
<rect x="100" y="94" width="170" height="22" fill="none" stroke="var(--c1)"/>
<rect x="100" y="116" width="170" height="14" fill="none" stroke="var(--c2)"/>
<rect x="90" y="144" width="190" height="12" fill="none" stroke="var(--c3)"/>
<path d="M 30 168 L 340 168" fill="none" stroke="currentColor"/>
<path d="M 270 38 L 296 26" fill="none" stroke="var(--muted)"/>
<path d="M 270 70 L 296 62" fill="none" stroke="var(--muted)"/>
<path d="M 270 105 L 296 100" fill="none" stroke="var(--muted)"/>
<path d="M 270 123 L 296 126" fill="none" stroke="var(--muted)"/>
<path d="M 280 150 L 296 152" fill="none" stroke="var(--muted)"/>
<text x="300" y="30" fill="currentColor" font-size="15">Insulator: blocks backward sound</text>
<text x="300" y="66" fill="currentColor" font-size="15">Backing: epoxy + tungsten</text>
<text x="300" y="104" fill="currentColor" font-size="15">Active element: PZT</text>
<text x="300" y="130" fill="currentColor" font-size="15">Matching layer (1/4 wavelength)</text>
<text x="300" y="156" fill="currentColor" font-size="15">Gel: squeezes out the air</text>
<text x="300" y="176" fill="currentColor" font-size="15">Skin</text>
<text x="46" y="186" fill="currentColor" font-size="15">Case (housing) all around</text>
</svg>`, caption: "Backing behind, matching layer in front. Draw this stack from memory every time you open the unit." }
      ],
      sayIt: "Name the six parts of a transducer from the cable end to the skin, and say what each one is for.",
      keyPoints: [
        "Case: protects, insulates electrically, gives a grip",
        "Wire: voltage down to the element, echo voltage back up",
        "Insulator: keeps sound and current from leaking into the case",
        "Active element (PZT): the only part that converts energy",
        "Matching layer: in FRONT, impedance between PZT and skin, 1/4 wavelength thick",
        "Backing/damping: BEHIND, epoxy with tungsten, shortens the pulse",
        "Gel is not a probe part, but it finishes the job of the matching layer"
      ]
    },
    {
      id: "u05-l2",
      title: "The piezoelectric effect, both directions",
      objectives: ["u05-o2"],
      html: `<p class="lead">Piezoelectric means pressure-electric: squeeze this ceramic and it makes voltage; apply voltage and it changes shape.</p>
<p>The active element is <span class="kw">PZT</span>, lead zirconate titanate, a man-made ceramic. Inside it, billions of tiny electric dipoles are lined up in the same direction (that alignment is created at the factory by heating the ceramic and cooling it inside a strong electric field). Because they all point the same way, mechanical and electrical effects couple together.</p>
<p><b>Reverse piezoelectric effect (transmit):</b> the pulser sends a voltage spike down the wire. The element thickens and thins for a couple of cycles, pushing on whatever touches it. <span class="kw-2">Voltage in, vibration out.</span> Some books call this the electrostrictive effect.</p>
<p><b>Piezoelectric effect (receive):</b> an echo comes back and its pressure squeezes the element. The squeeze knocks the dipoles slightly out of line and a small voltage appears on the wire, which the receiver amplifies. <span class="kw-2">Pressure in, voltage out.</span></p>
<p>One element does both jobs in a pulsed system, taking turns: transmit for about 1 microsecond, then listen for hundreds of microseconds. That is why the wire is two-way and why the same crystal thickness sets both the transmitted and the received frequency.</p>
<div class="callout key">Only the active element converts energy. The case, wire, insulator, matching layer and backing never convert anything — they protect, connect, or shape the pulse.</div>
<div class="callout warn">A common miss: "which component receives the returning echo?" The answer is still the active element. The matching layer only helps the echo get in.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 230" role="img"><title>Left panel: voltage into the element makes sound. Right panel: returning echo pressure makes voltage.</title>
<text x="40" y="20" fill="currentColor" font-size="15">TRANSMIT (reverse effect)</text>
<text x="340" y="20" fill="currentColor" font-size="15">RECEIVE (piezoelectric effect)</text>
<path d="M 130 36 L 130 84" fill="none" stroke="var(--c4)"/>
<path d="M 124 74 L 130 86 L 136 74" fill="none" stroke="var(--c4)"/>
<text x="40" y="52" fill="currentColor" font-size="15">voltage in</text>
<rect x="60" y="88" width="140" height="44" fill="none" stroke="var(--c1)"/>
<text x="112" y="116" fill="currentColor" font-size="16">PZT</text>
<path d="M 70 150 q 60 34 120 0" fill="none" stroke="var(--c3)"/>
<path d="M 70 168 q 60 34 120 0" fill="none" stroke="var(--c3)"/>
<path d="M 70 186 q 60 34 120 0" fill="none" stroke="var(--c3)"/>
<text x="46" y="220" fill="currentColor" font-size="15">sound out to patient</text>
<path d="M 430 84 L 430 36" fill="none" stroke="var(--c4)"/>
<path d="M 424 46 L 430 34 L 436 46" fill="none" stroke="var(--c4)"/>
<text x="348" y="52" fill="currentColor" font-size="15">voltage out</text>
<rect x="360" y="88" width="140" height="44" fill="none" stroke="var(--c1)"/>
<text x="412" y="116" fill="currentColor" font-size="16">PZT</text>
<path d="M 370 150 q 60 -30 120 0" fill="none" stroke="var(--c2)"/>
<path d="M 370 168 q 60 -30 120 0" fill="none" stroke="var(--c2)"/>
<path d="M 370 186 q 60 -30 120 0" fill="none" stroke="var(--c2)"/>
<text x="346" y="220" fill="currentColor" font-size="15">echo pressure coming back</text>
</svg>`, caption: "Voltage in, vibration out (transmit). Pressure in, voltage out (receive)." }
      ],
      sayIt: "Explain both directions of the piezoelectric effect out loud, and name the material the element is made of.",
      keyPoints: [
        "Piezoelectric effect: pressure in, voltage out (receiving echoes)",
        "Reverse piezoelectric effect: voltage in, vibration out (transmitting)",
        "Active element = PZT = lead zirconate titanate, a man-made ceramic",
        "Dipoles are aligned at the factory; alignment is what makes it piezoelectric",
        "The active element is the only component that converts energy"
      ]
    },
    {
      id: "u05-l3",
      title: "Curie point, depolarization and probe care",
      objectives: ["u05-o3"],
      html: `<p class="lead">Heat the ceramic past its Curie point and the aligned dipoles scramble — the probe becomes an expensive paperweight.</p>
<p>The <span class="kw">Curie point</span> (Curie temperature) is roughly <b>300–400 °C</b> for PZT. Below it the dipoles stay in line and the element is piezoelectric. Above it the thermal jostling wins, the alignment is lost, and the element is <span class="kw-2">depolarized</span>: no more voltage-to-sound conversion, permanently. Interestingly, the factory uses the same temperature on purpose — heat the ceramic above the Curie point, apply a strong electric field, then cool it while the field is on, and the dipoles freeze into alignment.</p>
<p>For you the rule is practical: <b>never put a transducer in an autoclave.</b> Steam autoclaving cooks at roughly 121–134 °C under pressure, which is well below the Curie point, but it destroys the adhesives, the case, the lens and the cable long before you would reach depolarization. Either way the probe is ruined, so the rule is simply "no heat sterilization."</p>
<p>The correct care sequence:</p>
<ul>
<li><b>Clean</b> first — wipe off gel and debris with soap and water. Nothing disinfects dirt.</li>
<li><b>Low-level disinfection</b> for probes that touch intact skin: an approved wipe or spray.</li>
<li><b>High-level disinfection or sterilization</b> for endocavity probes and anything contacting mucous membranes, non-intact skin or sterile tissue: soaking in an approved liquid chemical agent, or gas/plasma sterilization — cold methods only.</li>
<li>Use a sterile sheath or cover plus sterile gel where required, and never soak the connector or submerge the probe past the line the manufacturer marks.</li>
</ul>
<div class="callout warn">Dropping a probe is the other silent killer: a cracked element or delaminated matching layer shows up as a dead line or a dark band in the image.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>Temperature scale showing the Curie point, with aligned dipoles below it and scrambled dipoles above it</title>
<path d="M 50 70 L 540 70" fill="none" stroke="currentColor"/>
<path d="M 80 70 L 80 62" fill="none" stroke="currentColor"/>
<path d="M 200 70 L 200 62" fill="none" stroke="currentColor"/>
<path d="M 390 70 L 390 62" fill="none" stroke="currentColor"/>
<path d="M 470 70 L 470 62" fill="none" stroke="currentColor"/>
<rect x="390" y="40" width="150" height="30" fill="var(--c2)" opacity="0.25" stroke="var(--c2)"/>
<text x="56" y="34" fill="currentColor" font-size="15">20 °C</text>
<text x="160" y="34" fill="currentColor" font-size="15">134 °C</text>
<text x="360" y="92" fill="currentColor" font-size="15">300 °C</text>
<text x="456" y="92" fill="currentColor" font-size="15">400 °C</text>
<text x="386" y="30" fill="currentColor" font-size="15">Curie point range</text>
<text x="150" y="92" fill="currentColor" font-size="15">autoclave (never!)</text>
<rect x="70" y="130" width="180" height="60" fill="none" stroke="var(--c1)"/>
<path d="M 90 182 L 90 138" fill="none" stroke="var(--c1)"/>
<path d="M 120 182 L 120 138" fill="none" stroke="var(--c1)"/>
<path d="M 150 182 L 150 138" fill="none" stroke="var(--c1)"/>
<path d="M 180 182 L 180 138" fill="none" stroke="var(--c1)"/>
<path d="M 210 182 L 210 138" fill="none" stroke="var(--c1)"/>
<text x="70" y="212" fill="currentColor" font-size="15">Aligned dipoles: it works</text>
<rect x="340" y="130" width="180" height="60" fill="none" stroke="var(--c4)"/>
<path d="M 360 182 L 372 140" fill="none" stroke="var(--c4)"/>
<path d="M 400 140 L 388 180" fill="none" stroke="var(--c4)"/>
<path d="M 418 178 L 448 148" fill="none" stroke="var(--c4)"/>
<path d="M 470 140 L 462 182" fill="none" stroke="var(--c4)"/>
<path d="M 490 176 L 508 144" fill="none" stroke="var(--c4)"/>
<text x="340" y="212" fill="currentColor" font-size="15">Scrambled: depolarized, dead</text>
</svg>`, caption: "Past the Curie point the alignment is lost for good — and heat sterilization wrecks the probe long before that." }
      ],
      sayIt: "State the Curie point of PZT, what happens above it, and the three-step way to clean and disinfect a probe.",
      keyPoints: [
        "Curie point of PZT is about 300–400 °C",
        "Above it the dipoles scramble: depolarization, permanent loss of the piezoelectric effect",
        "The factory polarizes the ceramic by heating above the Curie point in an electric field, then cooling",
        "Never autoclave or heat-sterilize a transducer",
        "Clean first, then low-level disinfection for skin contact",
        "High-level disinfection or cold gas/liquid sterilization for endocavity probes; use a sheath"
      ]
    },
    {
      id: "u05-l4",
      title: "Frequency of a pulsed transducer: it is the thickness",
      objectives: ["u05-o4"],
      html: `<p class="lead">For a pulsed imaging probe the frequency is baked in at the factory by how thick the crystal is sliced.</p>
<p>The element rings best when its thickness is exactly <b>one-half wavelength</b> of the sound travelling inside the ceramic. The reflection off the back and the reflection off the front then return in step with each other and reinforce — a standing wave, the same reason a shorter organ pipe plays a higher note.</p>
<div class="formula">f (MHz) = speed of sound in PZT (mm/µs) ÷ (2 × thickness in mm)</div>
<div class="formula">thickness (mm) = speed in PZT (mm/µs) ÷ (2 × f in MHz)</div>
<p>The speed of sound in PZT is about <b>4–6 mm/µs</b> (faster than soft tissue's 1.54 mm/µs because the ceramic is stiff). A question will always give you the value to use.</p>
<p><b>Worked example.</b> Speed in PZT 4 mm/µs, thickness 0.4 mm: f = 4 ÷ (2 × 0.4) = 4 ÷ 0.8 = <b>5 MHz</b>. Want 10 MHz from the same ceramic? thickness = 4 ÷ (2 × 10) = <b>0.2 mm</b>.</p>
<p>So thickness and frequency are <b>inversely</b> related: <span class="kw">thinner element → higher frequency</span> → shorter wavelength → better axial resolution → less penetration. Typical elements are only 0.1–1 mm thick, which is why high-frequency probes are fragile.</p>
<div class="callout key">Two determinants of a pulsed transducer's frequency: the <b>thickness</b> of the element and the <b>propagation speed of the element material</b>. Both are fixed by the manufacturer — the sonographer cannot change them. Switching to a "different frequency" on a multi-frequency probe means the system is using a different part of the probe's bandwidth, not re-cutting the crystal.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 240" role="img"><title>A thick element holding one half wavelength produces a low frequency; a thin element produces a high frequency</title>
<rect x="80" y="60" width="80" height="110" fill="none" stroke="var(--c1)"/>
<path d="M 80 115 q 40 -60 80 0" fill="none" stroke="var(--c2)"/>
<text x="92" y="52" fill="currentColor" font-size="15">1/2 λ</text>
<path d="M 80 186 L 160 186" fill="none" stroke="var(--muted)"/>
<text x="74" y="206" fill="currentColor" font-size="15">thickness 0.4 mm</text>
<text x="66" y="226" fill="currentColor" font-size="15">f = 4 ÷ 0.8 = 5 MHz</text>
<rect x="380" y="60" width="40" height="110" fill="none" stroke="var(--c1)"/>
<path d="M 380 115 q 20 -60 40 0" fill="none" stroke="var(--c2)"/>
<text x="384" y="52" fill="currentColor" font-size="15">1/2 λ</text>
<path d="M 380 186 L 420 186" fill="none" stroke="var(--muted)"/>
<text x="352" y="206" fill="currentColor" font-size="15">thickness 0.2 mm</text>
<text x="344" y="226" fill="currentColor" font-size="15">f = 4 ÷ 0.4 = 10 MHz</text>
<text x="200" y="100" fill="currentColor" font-size="15">thinner slice</text>
<path d="M 200 116 L 360 116" fill="none" stroke="var(--c3)"/>
<path d="M 348 110 L 362 116 L 348 122" fill="none" stroke="var(--c3)"/>
<text x="200" y="140" fill="currentColor" font-size="15">higher frequency</text>
<text x="40" y="26" fill="currentColor" font-size="15">Speed of sound in this PZT = 4 mm/µs</text>
</svg>`, caption: "Element thickness = half a wavelength in PZT. Thin slice, high note." }
      ],
      sayIt: "Write the pulsed resonant frequency formula and use it: PZT speed 6 mm/µs, thickness 0.3 mm — what frequency?",
      keyPoints: [
        "Element thickness = 1/2 wavelength in the element material",
        "f = speed in PZT ÷ (2 × thickness)",
        "thickness = speed in PZT ÷ (2 × f)",
        "Speed in PZT is about 4–6 mm/µs; typical thickness 0.1–1 mm",
        "Thinner element → higher frequency → shorter wavelength → better axial resolution, less penetration",
        "Determined by the manufacturer only, not by the sonographer"
      ]
    }
,
    {
      id: "u05-l5",
      title: "Continuous wave transducers: the electronics pick the note",
      objectives: ["u05-o5"],
      html: `<p class="lead">A continuous-wave probe does not ring at its own favourite frequency — it is driven, so it plays whatever note the machine sends it.</p>
<p>In a pulsed probe the element gets one sharp electrical kick and then rings at its natural (resonant) frequency, exactly like hitting a bell. In <span class="kw">continuous wave</span> operation the element is fed an unbroken alternating voltage, so it simply follows that voltage up and down. The output frequency equals the <b>frequency of the electrical driving voltage</b>, set by the system's oscillator.</p>
<div class="callout key">Pulsed transducer frequency = speed in PZT ÷ (2 × thickness). Continuous-wave transducer frequency = the frequency of the electrical signal from the machine. Same probe words, completely different answer.</div>
<p>Two more features of a CW probe follow from "always on":</p>
<ul>
<li><b>Two elements, always.</b> One transmits non-stop and a separate one listens non-stop, usually two D-shaped halves in the same housing. A single element cannot transmit and receive at the same time.</li>
<li><b>No backing material.</b> Nobody wants a short pulse here — the whole point is a long, pure, continuous tone. Leaving the damping out makes the transducer efficient and very sensitive, with a narrow bandwidth and a high Q-factor.</li>
</ul>
<p>Because it never stops transmitting, a CW system has a duty factor of 100 %, no pulse duration, no pulse repetition period, and no way to tell you where the echo came from — it has no depth (range) resolution. What it buys you is unlimited velocity measurement with no aliasing, which is why CW is the tool for high-velocity Doppler and why therapy and non-imaging pencil probes work the same way.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 220" role="img"><title>An oscillator drives a continuous-wave element so the output frequency equals the electrical frequency</title>
<rect x="40" y="70" width="150" height="60" fill="none" stroke="var(--c4)"/>
<text x="52" y="96" fill="currentColor" font-size="15">Oscillator in the</text>
<text x="52" y="118" fill="currentColor" font-size="15">machine: 4 MHz</text>
<path d="M 190 100 L 240 100" fill="none" stroke="currentColor"/>
<path d="M 228 94 L 242 100 L 228 106" fill="none" stroke="currentColor"/>
<rect x="250" y="60" width="40" height="40" fill="none" stroke="var(--c1)"/>
<rect x="250" y="100" width="40" height="40" fill="none" stroke="var(--c3)"/>
<text x="296" y="80" fill="currentColor" font-size="15">transmit element</text>
<text x="296" y="128" fill="currentColor" font-size="15">receive element</text>
<path d="M 250 170 q 15 -30 30 0 q 15 30 30 0 q 15 -30 30 0 q 15 30 30 0 q 15 -30 30 0 q 15 30 30 0 q 15 -30 30 0 q 15 30 30 0" fill="none" stroke="var(--c2)"/>
<text x="250" y="206" fill="currentColor" font-size="15">output sound: 4 MHz, never stops (duty factor 100 %)</text>
<text x="40" y="34" fill="currentColor" font-size="15">CW: no backing, two elements, high Q</text>
</svg>`, caption: "Driven, not rung: a CW element outputs whatever frequency the electronics feed it." }
      ],
      sayIt: "Say what sets the frequency of a CW transducer, and list three ways a CW probe differs from a pulsed imaging probe.",
      keyPoints: [
        "CW frequency = frequency of the electrical voltage driving the element",
        "Pulsed frequency = speed in PZT ÷ (2 × thickness) — thickness matters only when pulsed",
        "CW probes have two elements: one transmits, one receives",
        "CW probes have no backing/damping material",
        "Narrow bandwidth, high Q-factor, very sensitive, duty factor 100 %",
        "No depth information, but no aliasing either"
      ]
    },
    {
      id: "u05-l6",
      title: "Matching layer and gel: getting the sound out",
      objectives: ["u05-o6"],
      html: `<p class="lead">PZT and skin are acoustically nothing alike, so without a go-between almost all the sound would bounce straight back inside the probe.</p>
<p>Impedance mismatch is what causes reflection (unit 4). PZT has an impedance of roughly <b>30 Mrayl</b>; soft tissue is about <b>1.63 Mrayl</b>. Put them face to face and the reflection is enormous — very little sound would ever enter the patient, and very little echo would ever get back to the crystal.</p>
<p>The <span class="kw">matching layer</span> is a thin layer bonded to the front of the element with an impedance <i>in between</i> the two (a few Mrayl). Instead of one giant cliff, the sound walks down a staircase, and much more energy is transmitted. Real probes often use two or three matching layers, each a step lower, to do this across a wide band of frequencies.</p>
<div class="formula">matching layer thickness = 1/4 wavelength (in the matching layer)</div>
<p>Why a quarter? The wave that reflects off the far side of the layer travels an extra quarter wavelength there and a quarter back — half a wavelength total — so it comes back upside down relative to the wave reflecting off the front face, and the two reflections cancel. Cancelled reflection means transmitted sound.</p>
<p><b>Worked example.</b> Speed in the matching layer 2 mm/µs, transducer 5 MHz: λ = 2 ÷ 5 = 0.4 mm, so thickness = 0.4 ÷ 4 = <b>0.1 mm</b>. Notice the layer must be cut for the probe's own frequency.</p>
<div class="callout key">Element thickness = 1/2 wavelength. Matching layer thickness = 1/4 wavelength. Do not swap them.</div>
<p><span class="kw-2">Coupling gel</span> finishes the job outside the probe. Air has an impedance about 0.0004 Mrayl, so even a microscopically thin film of air between probe and skin reflects essentially 100 % of the beam. Gel has an impedance close to soft tissue, fills the surface roughness, and is applied by the sonographer — the one part of this chain you control.</p>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 230" role="img"><title>Impedance staircase from PZT through the matching layer and gel into skin</title>
<path d="M 60 60 L 160 60 L 160 130 L 260 130 L 260 160 L 360 160 L 360 166 L 470 166" fill="none" stroke="var(--c1)"/>
<path d="M 60 200 L 500 200" fill="none" stroke="var(--muted)"/>
<text x="62" y="52" fill="currentColor" font-size="15">PZT ~30 Mrayl</text>
<text x="166" y="122" fill="currentColor" font-size="15">matching ~6</text>
<text x="256" y="152" fill="currentColor" font-size="15">gel ~1.6</text>
<text x="380" y="158" fill="currentColor" font-size="15">skin 1.63</text>
<text x="66" y="222" fill="currentColor" font-size="15">acoustic impedance, stepping down toward the patient</text>
<path d="M 500 60 L 500 160" fill="none" stroke="var(--c4)"/>
<path d="M 494 70 L 500 58 L 506 70" fill="none" stroke="var(--c4)"/>
<text x="452" y="40" fill="currentColor" font-size="15">one big step</text>
<text x="452" y="186" fill="currentColor" font-size="15">= big reflection</text>
</svg>`, caption: "Steps, not a cliff: each layer's impedance sits between its neighbours." },
        { svg: `<svg viewBox="0 0 600 230" role="img"><title>One wavelength drawn above a matching layer slab that is one quarter as thick</title>
<path d="M 60 70 q 30 -44 60 0 q 30 44 60 0" fill="none" stroke="var(--c2)"/>
<path d="M 60 92 L 180 92" fill="none" stroke="var(--muted)"/>
<path d="M 66 86 L 58 92 L 66 98" fill="none" stroke="var(--muted)"/>
<path d="M 174 86 L 182 92 L 174 98" fill="none" stroke="var(--muted)"/>
<text x="64" y="114" fill="currentColor" font-size="15">one wavelength in the layer</text>
<text x="64" y="136" fill="currentColor" font-size="15">λ = c ÷ f = 2 ÷ 5 = 0.4 mm</text>
<rect x="360" y="60" width="30" height="100" fill="none" stroke="var(--c3)"/>
<path d="M 360 176 L 390 176" fill="none" stroke="var(--muted)"/>
<text x="330" y="198" fill="currentColor" font-size="15">1/4 λ = 0.1 mm</text>
<text x="300" y="40" fill="currentColor" font-size="15">matching layer</text>
<path d="M 200 100 L 330 100" fill="none" stroke="currentColor"/>
<path d="M 318 94 L 332 100 L 318 106" fill="none" stroke="currentColor"/>
<text x="202" y="90" fill="currentColor" font-size="15">cut to a quarter</text>
</svg>`, caption: "Quarter-wave thickness makes the two internal reflections cancel." }
      ],
      sayIt: "Explain why a matching layer is needed, how thick it is, and why gel is not optional.",
      keyPoints: [
        "PZT impedance ~30 Mrayl vs soft tissue ~1.63 Mrayl: huge mismatch, huge reflection",
        "Matching layer impedance is between PZT and tissue",
        "Matching layer thickness = 1/4 wavelength (element = 1/2 wavelength)",
        "The quarter-wave path makes internal reflections cancel, so more sound is transmitted",
        "Gel removes air (air impedance ~0.0004 Mrayl reflects nearly everything)",
        "Gel is the sonographer's job; the matching layer is the manufacturer's"
      ]
    },
    {
      id: "u05-l7",
      title: "Backing material: killing the ring",
      objectives: ["u05-o7", "u05-o10"],
      html: `<p class="lead">Damping trades loudness for brevity: the heavier the backing, the shorter the pulse and the fainter the echoes you can still detect.</p>
<p>Left alone, a struck crystal rings for many cycles. A long pulse means a long <span class="kw-2">spatial pulse length</span>, and SPL is what limits axial resolution. So a layer of <span class="kw">epoxy resin loaded with tungsten powder</span> is bonded to the back of the element. Its impedance is close to the ceramic's, so backward sound walks right into it instead of reflecting, and the tungsten's mass absorbs the vibration. Two or three cycles and the ringing is over — that is why an imaging pulse is 2–3 cycles and about 0.5–3 µs long.</p>
<p>Everything that follows from <b>more damping</b>:</p>
<table class="dt"><tr><th>Quantity</th><th>More damping</th></tr>
<tr><td>Number of cycles, pulse duration, spatial pulse length</td><td>decrease</td></tr>
<tr><td>Axial resolution (the distance in mm; smaller = better)</td><td>decreases → resolution <b>improves</b></td></tr>
<tr><td>Bandwidth, fractional bandwidth</td><td>increase</td></tr>
<tr><td>Q-factor</td><td>decreases</td></tr>
<tr><td>Sensitivity, efficiency, amplitude of the pulse</td><td>decrease</td></tr>
<tr><td>Main (center) frequency</td><td><b>unchanged</b></td></tr>
</table>
<p>The last two rows are where exams live. Damping does not retune the probe — it keeps the same center frequency and simply spreads energy over a wider band of frequencies around it. And because energy is being thrown away in the tungsten, a heavily damped probe puts out a weaker pulse and returns weaker echoes: <span class="kw">sensitivity</span> (the ability to detect faint reflectors) goes down. The machine can compensate with more receiver gain, but gain amplifies noise too.</p>
<div class="callout tip">Dumb saying: "Backing makes it Brief, Broad and Bad at hearing." Brief pulse, broad bandwidth, bad sensitivity.</div>
<div class="callout warn">Trap: "Increasing damping improves axial resolution — true or false?" True. But "increasing damping increases axial resolution" is a nasty phrasing, because the measured number in millimetres gets smaller. Read the wording.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>An undamped element rings for many cycles; a damped element produces a two-cycle pulse</title>
<path d="M 60 80 q 12 -34 24 0 q 12 34 24 0 q 12 -30 24 0 q 12 30 24 0 q 12 -26 24 0 q 12 26 24 0 q 12 -20 24 0 q 12 20 24 0 q 12 -14 24 0 q 12 14 24 0" fill="none" stroke="var(--c4)"/>
<path d="M 40 80 L 320 80" fill="none" stroke="var(--muted)"/>
<text x="40" y="44" fill="currentColor" font-size="15">No backing: long ringing pulse</text>
<text x="336" y="76" fill="currentColor" font-size="15">narrow bandwidth</text>
<text x="336" y="98" fill="currentColor" font-size="15">high Q, sensitive</text>
<path d="M 60 200 q 12 -34 24 0 q 12 34 24 0 q 12 -16 24 0 q 12 16 24 0 L 320 200" fill="none" stroke="var(--c1)"/>
<path d="M 40 200 L 320 200" fill="none" stroke="var(--muted)"/>
<text x="40" y="164" fill="currentColor" font-size="15">Heavy backing: 2–3 cycle pulse</text>
<text x="336" y="196" fill="currentColor" font-size="15">wide bandwidth, low Q</text>
<text x="336" y="218" fill="currentColor" font-size="15">short SPL: better axial res</text>
<text x="336" y="240" fill="currentColor" font-size="15">less sensitive</text>
</svg>`, caption: "Same center frequency, very different pulse: damping shortens it and widens the band." }
      ],
      sayIt: "List six things that change when backing material is added, and say which one does not change.",
      keyPoints: [
        "Backing = epoxy with tungsten powder, bonded behind the element",
        "More damping → fewer cycles, shorter pulse duration and SPL",
        "Shorter SPL → better axial resolution",
        "More damping → wider bandwidth → lower Q-factor",
        "More damping → lower sensitivity and lower efficiency (weaker echoes)",
        "Main frequency is unchanged by damping",
        "CW and therapy transducers have no backing at all"
      ]
    },
    {
      id: "u05-l8",
      title: "Bandwidth, fractional bandwidth and Q-factor",
      objectives: ["u05-o8", "u05-o9"],
      html: `<p class="lead">A short pulse is never one pure frequency — it is a bundle of frequencies, and bandwidth measures how wide that bundle is.</p>
<p><span class="kw">Bandwidth</span> is the range of frequencies in the pulse:</p>
<div class="formula">bandwidth (MHz) = highest frequency − lowest frequency</div>
<div class="formula">fractional bandwidth (%) = bandwidth ÷ main (center) frequency × 100</div>
<div class="formula">Q-factor = main frequency ÷ bandwidth</div>
<p>Q-factor is unitless — the megahertz cancel. Despite the name it is not a report card on image quality; it describes purity of tone, like the "Q" of a tuning fork.</p>
<p><b>Worked example.</b> A probe emits 3–7 MHz. Bandwidth = 7 − 3 = 4 MHz. Main frequency = 5 MHz (the middle). Fractional bandwidth = 4 ÷ 5 × 100 = 80 %. Q-factor = 5 ÷ 4 = <b>1.25</b>. Small Q, wide band — an imaging probe.</p>
<table class="dt"><tr><th></th><th>Low Q (imaging)</th><th>High Q (CW, therapy)</th></tr>
<tr><td>Bandwidth</td><td>wide (Q typically 1–4)</td><td>narrow (Q can be 20+)</td></tr>
<tr><td>Pulse</td><td>short, 2–3 cycles</td><td>long or continuous</td></tr>
<tr><td>Backing</td><td>heavy damping</td><td>little or none</td></tr>
<tr><td>Axial resolution</td><td>good</td><td>poor / not applicable</td></tr>
<tr><td>Sensitivity &amp; efficiency</td><td>lower</td><td>higher</td></tr>
<tr><td>Purity of tone</td><td>impure, many frequencies</td><td>pure, nearly one frequency</td></tr>
</table>
<p>The wide bandwidth of an imaging probe is also what makes <b>multi-frequency</b> and <b>harmonic</b> imaging possible: the system can transmit or listen at different parts of the band without changing probes. A high-Q crystal simply has no other frequencies to offer.</p>
<div class="callout warn">Q and bandwidth are inversely related — every single time. If a question says "high Q and wide bandwidth," it is wrong before you read the rest of it.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A tall narrow bandwidth curve for a high-Q transducer beside a low broad curve for a low-Q imaging transducer</title>
<path d="M 60 200 L 540 200" fill="none" stroke="currentColor"/>
<path d="M 60 200 L 60 50" fill="none" stroke="currentColor"/>
<text x="452" y="222" fill="currentColor" font-size="15">frequency</text>
<text x="70" y="44" fill="currentColor" font-size="15">amplitude</text>
<path d="M 250 200 C 275 200 278 60 295 60 C 312 60 315 200 340 200" fill="none" stroke="var(--c4)"/>
<path d="M 130 200 C 200 200 205 120 295 120 C 385 120 390 200 460 200" fill="none" stroke="var(--c1)"/>
<path d="M 295 200 L 295 56" fill="none" stroke="var(--muted)"/>
<text x="272" y="246" fill="currentColor" font-size="15">main f</text>
<path d="M 252 226 L 338 226" fill="none" stroke="var(--c4)"/>
<path d="M 148 266 L 442 266" fill="none" stroke="var(--c1)"/>
<text x="346" y="232" fill="currentColor" font-size="15">narrow BW = high Q</text>
<text x="200" y="262" fill="currentColor" font-size="15">wide BW = low Q (imaging)</text>
</svg>`, caption: "Same center frequency, two different bandwidths. Narrow and tall is high Q; broad and flat is the imaging probe." }
      ],
      sayIt: "A probe runs from 2 to 6 MHz. State its bandwidth, main frequency, fractional bandwidth and Q-factor, then say whether it is for imaging or CW.",
      keyPoints: [
        "Bandwidth = highest − lowest frequency, in MHz",
        "Fractional bandwidth = bandwidth ÷ main frequency × 100 %",
        "Q-factor = main frequency ÷ bandwidth; unitless",
        "Q and bandwidth are inverses; Q and pulse length go together",
        "Imaging: low Q (about 1–4), wide bandwidth, short pulse, damped",
        "CW / therapy: high Q, narrow bandwidth, long pulse, undamped, more sensitive",
        "Wide bandwidth enables multi-frequency and harmonic imaging"
      ]
    }
  ],

  mnemonics: [
    { saying: "Cool Wizards Insulate Active Matching Backings", saying2: "", meaning: "Case, Wire, Insulator, Active element, Matching layer, Backing — the six transducer components in order from the cable end to the patient.", lesson: "u05-l1" },
    { saying: "Backing is Behind, Matching is in the Middle of you and the patient", meaning: "Geography check: the damping/backing block is behind the PZT, the matching layer is in front of it, facing the skin.", lesson: "u05-l1" },
    { saying: "Pressure In, Electricity Out — PIEO, like 'pee-ay-zo'", meaning: "The direct piezoelectric effect: echo pressure squeezes the element and a voltage comes out. Reverse it for transmit: voltage in, vibration out.", lesson: "u05-l2" },
    { saying: "Curie cooks the crystal at three-to-four hundred — so never cook the probe", meaning: "Curie point of PZT is about 300–400 °C; above it the dipoles scramble (depolarization). Practical rule: no autoclave, no heat sterilization — cold liquid or gas only.", lesson: "u05-l3" },
    { saying: "Thin ceramic, thin voice? No — thin ceramic, HIGH voice", meaning: "Thickness and frequency are inverse: f = speed in PZT ÷ (2 × thickness). A thinner element rings at a higher frequency, like a smaller drum.", lesson: "u05-l4" },
    { saying: "Half the element, quarter the match", meaning: "The active element is 1/2 wavelength thick; the matching layer is 1/4 wavelength thick. The two fractions are the most swapped pair on the exam.", lesson: "u05-l6" },
    { saying: "Backing makes it Brief, Broad and Bad at hearing", meaning: "More damping: Brief pulse (short PD and SPL, better axial resolution), Broad bandwidth (low Q), Bad sensitivity (weaker echoes). Center frequency does not change.", lesson: "u05-l7" },
    { saying: "Q is for Quiet, pure Quality tone; Wide band is Wild and short", meaning: "High Q = narrow bandwidth = long pure pulse = CW and therapy. Low Q = wide bandwidth = short pulse = imaging. Q = main frequency ÷ bandwidth.", lesson: "u05-l8" },
    { saying: "Pulsed asks the Crystal, Continuous asks the Cable", meaning: "A pulsed transducer's frequency comes from the crystal (thickness and speed). A CW transducer's frequency comes from the electrical signal the machine sends down the cable.", lesson: "u05-l5" },
    { saying: "No gel, no image — air is a wall", meaning: "Air impedance (~0.0004 Mrayl) versus tissue (1.63 Mrayl) reflects essentially all the sound. Gel is the sonographer-controlled part of impedance matching.", lesson: "u05-l6" }
  ],

  formulas: [
    { name: "Pulsed transducer frequency", expr: "f = speed of sound in PZT ÷ (2 × element thickness)", units: "MHz (speed in mm/µs, thickness in mm)", note: "Element is 1/2 wavelength thick; PZT speed ≈ 4–6 mm/µs. Set by the manufacturer." },
    { name: "Element thickness for a desired frequency", expr: "thickness = speed of sound in PZT ÷ (2 × f)", units: "mm", note: "Rearranged resonant-frequency equation; typical 0.1–1 mm." },
    { name: "Continuous-wave frequency", expr: "f = frequency of the electrical driving voltage", units: "MHz", note: "Thickness is irrelevant in CW; the machine's oscillator decides." },
    { name: "Matching layer thickness", expr: "thickness = 1/4 × wavelength in the matching layer", units: "mm", note: "Wavelength here uses the matching layer's own speed: λ = c ÷ f." },
    { name: "Wavelength in a layer", expr: "λ = c ÷ f", units: "mm (c in mm/µs, f in MHz)", note: "Use the speed of the material you are inside, not 1.54 mm/µs." },
    { name: "Bandwidth", expr: "BW = highest frequency − lowest frequency", units: "MHz", note: "Imaging probes: wide. CW probes: narrow." },
    { name: "Fractional bandwidth", expr: "fractional BW (%) = BW ÷ main frequency × 100", units: "%", note: "Imaging probes are often 50–100 % or more." },
    { name: "Q-factor", expr: "Q = main (center) frequency ÷ bandwidth", units: "unitless", note: "Imaging Q ≈ 1–4; CW/therapy Q can exceed 20. Q is the reciprocal of fractional bandwidth." },
    { name: "Main (center) frequency from a range", expr: "main f = (highest + lowest) ÷ 2", units: "MHz", note: "The middle of the bandwidth." }
  ],

  keyNumbers: [
    { fact: "Active element material", value: "PZT — lead zirconate titanate (man-made ceramic)" },
    { fact: "Speed of sound in PZT", value: "≈ 4–6 mm/µs (4,000–6,000 m/s)" },
    { fact: "Typical element thickness", value: "0.1–1 mm (thinner = higher frequency)" },
    { fact: "Element thickness in wavelengths", value: "1/2 wavelength" },
    { fact: "Matching layer thickness", value: "1/4 wavelength" },
    { fact: "Acoustic impedance of PZT", value: "≈ 30 Mrayl" },
    { fact: "Acoustic impedance of soft tissue", value: "≈ 1.63 Mrayl (skin/gel similar)" },
    { fact: "Acoustic impedance of air", value: "≈ 0.0004 Mrayl — reflects nearly 100 %" },
    { fact: "Curie point of PZT", value: "≈ 300–400 °C" },
    { fact: "Backing material", value: "Epoxy resin loaded with tungsten powder" },
    { fact: "Cycles in a damped imaging pulse", value: "2–3 cycles (pulse duration ≈ 0.5–3 µs)" },
    { fact: "Q-factor of an imaging transducer", value: "≈ 1–4 (low Q, wide bandwidth)" },
    { fact: "Q-factor of a CW / therapy transducer", value: "20 or more (high Q, narrow bandwidth)" },
    { fact: "Duty factor of a CW transducer", value: "100 %" },
    { fact: "Elements in a CW probe", value: "2 — one transmits, one receives" }
  ],

  flashcards: [
    { front: "The six transducer components", back: "Case, electrical wire, insulator, active element (PZT), matching layer, backing/damping material", lesson: "u05-l1" },
    { front: "Which component converts energy?", back: "Only the active element (PZT): voltage ↔ sound", lesson: "u05-l1" },
    { front: "Where is the backing material?", back: "Behind the active element (away from the patient)", lesson: "u05-l1" },
    { front: "Where is the matching layer?", back: "In front of the element, between PZT and skin", lesson: "u05-l1" },
    { front: "Job of the insulator", back: "Blocks sound and electricity from leaking sideways into the case and the hand", lesson: "u05-l1" },
    { front: "Piezoelectric effect", back: "Pressure in → voltage out (receiving echoes)", lesson: "u05-l2" },
    { front: "Reverse piezoelectric effect", back: "Voltage in → vibration (sound) out (transmitting)", lesson: "u05-l2" },
    { front: "PZT stands for…", back: "Lead zirconate titanate — the man-made ceramic active element", lesson: "u05-l2" },
    { front: "Lead zirconate titanate", back: "PZT: the piezoelectric active element / crystal", lesson: "u05-l2" },
    { front: "Curie point", back: "≈300–400 °C; above it PZT depolarizes and stops working permanently", lesson: "u05-l3" },
    { front: "Depolarization", back: "Loss of dipole alignment in the element → no piezoelectric effect; caused by heat above the Curie point", lesson: "u05-l3" },
    { front: "How do you sterilize a transducer?", back: "Cold methods only: liquid chemical soak or gas/plasma. Never autoclave or heat.", lesson: "u05-l3" },
    { front: "First step of probe care, always", back: "Clean off gel and debris — disinfection does not work on dirt", lesson: "u05-l3" },
    { front: "Pulsed transducer frequency formula", back: "f = speed in PZT ÷ (2 × thickness)", lesson: "u05-l4" },
    { front: "Element thickness in wavelengths", back: "1/2 wavelength (in the element material)", lesson: "u05-l4" },
    { front: "Thinner element →", back: "Higher frequency (inverse relationship)", lesson: "u05-l4" },
    { front: "Speed of sound in PZT", back: "≈4–6 mm/µs — much faster than tissue's 1.54", lesson: "u05-l4" },
    { front: "Who determines a pulsed probe's frequency?", back: "The manufacturer (thickness + material speed). Not the sonographer.", lesson: "u05-l4" },
    { front: "CW transducer frequency is set by…", back: "The frequency of the electrical voltage driving the element", lesson: "u05-l5" },
    { front: "How many elements in a CW probe?", back: "Two — one transmits continuously, one receives continuously", lesson: "u05-l5" },
    { front: "Does a CW probe have backing material?", back: "No — it wants a long, pure, high-Q signal", lesson: "u05-l5" },
    { front: "Duty factor of CW", back: "100 % (always transmitting)", lesson: "u05-l5" },
    { front: "Purpose of the matching layer", back: "Impedance between PZT and skin so more sound is transmitted instead of reflected", lesson: "u05-l6" },
    { front: "Matching layer thickness", back: "1/4 wavelength (in the matching layer)", lesson: "u05-l6" },
    { front: "Impedance of PZT vs soft tissue", back: "≈30 Mrayl vs ≈1.63 Mrayl — a huge mismatch without help", lesson: "u05-l6" },
    { front: "Why gel?", back: "Removes air (≈0.0004 Mrayl), which would reflect nearly all the sound", lesson: "u05-l6" },
    { front: "Backing material is made of…", back: "Epoxy resin loaded with tungsten powder", lesson: "u05-l7" },
    { front: "More damping does what to the pulse?", back: "Shortens it — fewer cycles, shorter PD and SPL", lesson: "u05-l7" },
    { front: "More damping does what to bandwidth?", back: "Widens it (and therefore lowers Q)", lesson: "u05-l7" },
    { front: "More damping does what to sensitivity?", back: "Lowers it — weaker pulse out, weaker echoes detected", lesson: "u05-l7" },
    { front: "More damping does what to the main frequency?", back: "Nothing — center frequency is unchanged", lesson: "u05-l7" },
    { front: "More damping does what to axial resolution?", back: "Improves it (shorter SPL = smaller resolvable distance in mm)", lesson: "u05-l7" },
    { front: "Bandwidth", back: "Highest frequency − lowest frequency in the pulse (MHz)", lesson: "u05-l8" },
    { front: "Fractional bandwidth", back: "Bandwidth ÷ main frequency × 100 %", lesson: "u05-l8" },
    { front: "Q-factor formula", back: "Q = main frequency ÷ bandwidth (unitless)", lesson: "u05-l8" },
    { front: "Q-factor of an imaging probe", back: "Low, about 1–4: wide bandwidth, short pulse", lesson: "u05-l8" },
    { front: "Q-factor of a CW/therapy probe", back: "High (20+): narrow bandwidth, long pure pulse", lesson: "u05-l8" },
    { front: "Low Q means…", back: "Wide bandwidth, short pulse, good axial resolution, lower sensitivity", lesson: "u05-l8" },
    { front: "Which probe can do harmonics and multi-frequency?", back: "The wide-bandwidth (low-Q) imaging probe", lesson: "u05-l8" },
    { front: "Half wavelength vs quarter wavelength", back: "Element = 1/2 λ thick; matching layer = 1/4 λ thick", lesson: "u05-l6" }
  ],
