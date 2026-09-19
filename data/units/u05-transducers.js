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
