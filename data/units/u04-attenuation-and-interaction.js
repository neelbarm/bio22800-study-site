/* Unit 04 — Attenuation & Interaction with Media */
window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u04",
  order: 4,
  title: "Attenuation & Interaction with Media",
  icon: "🪞",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Attenuation and Interaction of Sound with Tissue chapters",
  blurb: "Once the pulse leaves the probe it starts losing strength, and every boundary it meets either bounces it back, bends it, or scatters it. This unit is the bookkeeping of that journey: how much signal is lost (attenuation, dB), what causes each loss (absorption, reflection, scattering), which boundaries make echoes (acoustic impedance), when the beam bends (refraction and Snell's law), and how the machine turns travel time into depth (the range equation and the 13 µs rule).",

  objectives: [
    { id: "u04-o1", text: "Define attenuation, state its unit, list its three components, and identify which component dominates in soft tissue." },
    { id: "u04-o2", text: "Calculate the attenuation coefficient in soft tissue from frequency and use it to compute total attenuation over a given path length." },
    { id: "u04-o3", text: "Define half-value layer and penetration depth and explain how they change with frequency." },
    { id: "u04-o4", text: "Define acoustic impedance, calculate Z = ρ × c, and state its units and typical values for soft tissue, air, and bone." },
    { id: "u04-o5", text: "Calculate intensity reflection and transmission coefficients at normal incidence and state the condition required for an echo." },
    { id: "u04-o6", text: "Compare specular and diffuse reflection, describe scattering and Rayleigh scattering, and state how Rayleigh scattering depends on frequency." },
    { id: "u04-o7", text: "State the two conditions required for refraction and use Snell's law to predict which way the transmitted beam bends." },
    { id: "u04-o8", text: "Compare normal and oblique incidence and explain why reflection and transmission become unpredictable at oblique incidence." },
    { id: "u04-o9", text: "Apply the range equation and the 13 µs rule to convert between go-return time and reflector depth." }
  ],

  lessons: [
    {
      id: "u04-l1",
      title: "Attenuation: sound fades on the way down and on the way back",
      objectives: ["u04-o1"],
      html: `<p class="lead">Every pulse is a shout into fog: it gets quieter with every centimeter, and it has to make the trip twice.</p>
<p><span class="kw">Attenuation</span> is the decrease in intensity, power, and amplitude as sound travels through a medium. It is reported in <b>decibels (dB)</b> — always a negative-going change, though we usually quote the size and say "12 dB of attenuation." Two things always make it worse: <b>higher frequency</b> and <b>longer path length</b>.</p>
<p>Three separate processes add up to the total loss:</p>
<ul>
<li><span class="kw">Absorption</span> — sound energy is converted into <b>heat</b> in the tissue. In soft tissue this is by far the <b>biggest</b> contributor, and it is the one that matters for bioeffects.</li>
<li><span class="kw">Reflection</span> — energy bounces back off a boundary. Some of that comes back to the probe as the echo we want; the rest goes off in other directions.</li>
<li><span class="kw">Scattering</span> — energy is redirected in many directions at once by small or rough structures.</li>
</ul>
<p>Remember the round trip. A reflector at 8 cm means the pulse travels 8 cm down and 8 cm back, so it pays the attenuation toll over a <b>16 cm path</b>. That is why deep echoes are so weak, and it is exactly why the receiver applies time gain compensation — later echoes get more amplification to make up for the extra distance they paid for.</p>
<div class="callout key">Attenuation = weakening of the sound beam, measured in dB. Components: absorption (dominant in soft tissue, becomes heat), reflection, scattering. Increases with frequency and with path length.</div>
<div class="callout warn">Trap: attenuation is not caused by the machine's settings. Turning up output power makes the pulse louder; it does not reduce the dB lost per centimeter.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A beam entering tissue and weakening with depth, with absorption, reflection and scattering drawn as the three ways energy is lost</title>
<line x1="30" y1="45" x2="150" y2="45" stroke="currentColor" stroke-width="6"/>
<text x="30" y="30" fill="var(--muted)" font-size="15">probe</text>
<line x1="90" y1="55" x2="90" y2="255" stroke="var(--c1)" stroke-width="10"/>
<line x1="90" y1="55" x2="90" y2="255" stroke="var(--paper)" stroke-width="0"/>
<text x="115" y="95" fill="currentColor" font-size="16">strong pulse</text>
<text x="115" y="175" fill="currentColor" font-size="16">weaker</text>
<text x="115" y="250" fill="currentColor" font-size="16">weakest (deep echoes)</text>
<text x="330" y="70" fill="var(--c2)" font-size="16">Absorption → heat (biggest)</text>
<text x="330" y="130" fill="var(--c3)" font-size="16">Reflection → bounces back</text>
<text x="330" y="190" fill="var(--c4)" font-size="16">Scattering → sprays outward</text>
<text x="300" y="250" fill="var(--muted)" font-size="15">↑ frequency and ↑ path → ↑ attenuation</text>
</svg>`, caption: "Three ways a pulse loses energy — absorption is the big one in soft tissue." }
      ],
      sayIt: "Out loud: define attenuation, give its unit, name its three components, and say which one dominates in soft tissue and what it turns into.",
      keyPoints: [
        "Attenuation = loss of intensity/power/amplitude with distance travelled",
        "Unit: decibels (dB)",
        "Components: absorption, reflection, scattering",
        "Absorption dominates in soft tissue and converts sound to heat",
        "Attenuation rises with frequency and with path length",
        "Echoes pay the toll twice — down and back"
      ]
    },
    {
      id: "u04-l2",
      title: "The attenuation coefficient and total attenuation",
      objectives: ["u04-o2", "u04-o1"],
      html: `<p class="lead">Soft tissue charges a toll of about half a decibel per centimeter, per megahertz.</p>
<p>The <span class="kw">attenuation coefficient</span> is the attenuation per centimeter of travel, in <b>dB/cm</b>. In soft tissue it is beautifully simple:</p>
<div class="formula">attenuation coefficient (dB/cm) = frequency (MHz) ÷ 2</div>
<p>That "÷ 2" is the famous <b>0.5 dB per centimeter per megahertz</b> for soft tissue. A 3 MHz beam loses 1.5 dB every centimeter; a 10 MHz beam loses 5 dB every centimeter. Notice that the coefficient depends only on <b>frequency and the medium</b> — the sonographer changes it by changing probes, not by turning a knob.</p>
<p>Multiply by how far the sound actually went and you get the total:</p>
<div class="formula">total attenuation (dB) = attenuation coefficient (dB/cm) × path length (cm)</div>
<p>Example: a 4 MHz beam traveling 6 cm. Coefficient = 4 ÷ 2 = 2 dB/cm; total = 2 × 6 = <b>12 dB</b>. If the question asks about an echo from a structure 6 cm deep, the round-trip path is 12 cm and the total is 24 dB — read the question carefully to see whether it wants one way or go-and-return.</p>
<table class="dt"><tr><th>Frequency</th><th>Coefficient</th><th>Loss over 10 cm</th></tr>
<tr><td>2 MHz</td><td>1 dB/cm</td><td>10 dB</td></tr>
<tr><td>5 MHz</td><td>2.5 dB/cm</td><td>25 dB</td></tr>
<tr><td>10 MHz</td><td>5 dB/cm</td><td>50 dB</td></tr></table>
<div class="callout key">Coefficient = half the frequency (soft tissue). Total attenuation = coefficient × path length. Both frequency and distance raise the loss.</div>
<div class="callout warn">Different media, different rules: this ÷2 shortcut is for soft tissue only. Bone attenuates far more, water far less, and air is a wall.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>A 4 megahertz beam losing 2 decibels per centimeter along a 6 centimeter path for a total of 12 decibels</title>
<text x="20" y="32" fill="currentColor" font-size="16">4 MHz → coefficient = 4 ÷ 2 = 2 dB/cm</text>
<line x1="60" y1="120" x2="540" y2="120" stroke="var(--c1)" stroke-width="4"/>
<line x1="60" y1="105" x2="60" y2="135" stroke="var(--muted)" stroke-width="2"/>
<line x1="140" y1="105" x2="140" y2="135" stroke="var(--muted)" stroke-width="2"/>
<line x1="220" y1="105" x2="220" y2="135" stroke="var(--muted)" stroke-width="2"/>
<line x1="300" y1="105" x2="300" y2="135" stroke="var(--muted)" stroke-width="2"/>
<line x1="380" y1="105" x2="380" y2="135" stroke="var(--muted)" stroke-width="2"/>
<line x1="460" y1="105" x2="460" y2="135" stroke="var(--muted)" stroke-width="2"/>
<line x1="540" y1="105" x2="540" y2="135" stroke="var(--muted)" stroke-width="2"/>
<text x="85" y="100" fill="var(--c2)" font-size="15">2 dB</text>
<text x="165" y="100" fill="var(--c2)" font-size="15">2 dB</text>
<text x="245" y="100" fill="var(--c2)" font-size="15">2 dB</text>
<text x="325" y="100" fill="var(--c2)" font-size="15">2 dB</text>
<text x="405" y="100" fill="var(--c2)" font-size="15">2 dB</text>
<text x="485" y="100" fill="var(--c2)" font-size="15">2 dB</text>
<text x="55" y="165" fill="var(--muted)" font-size="15">0 cm</text>
<text x="515" y="165" fill="var(--muted)" font-size="15">6 cm</text>
<text x="60" y="215" fill="currentColor" font-size="16">Total attenuation = 2 dB/cm × 6 cm = 12 dB</text>
<text x="60" y="245" fill="var(--muted)" font-size="15">(round trip to a 6 cm reflector = 12 cm path = 24 dB)</text>
</svg>`, caption: "Total attenuation is just the per-centimeter toll multiplied by how far the sound actually travelled." }
      ],
      sayIt: "Say out loud: what is the attenuation coefficient in soft tissue for a 6 MHz beam, and how much total attenuation over an 8 cm path?",
      keyPoints: [
        "Attenuation coefficient (dB/cm) = frequency (MHz) ÷ 2 in soft tissue",
        "Equivalent statement: 0.5 dB/cm/MHz",
        "Total attenuation (dB) = coefficient × path length (cm)",
        "Determined by frequency and the medium — not by a console knob",
        "Watch for round-trip questions: a reflector at d cm means a 2d cm path"
      ]
    },
    {
      id: "u04-l3",
      title: "Half-value layer and penetration",
      objectives: ["u04-o3", "u04-o2"],
      html: `<p class="lead">How deep can you go before half the signal is gone? That thickness is the half-value layer.</p>
<p>The <span class="kw">half-value layer (HVL)</span> — also called the half-boundary layer or penetration depth in some courses — is the <b>thickness of tissue that reduces the intensity of the beam to one half</b>. Because a 50 % drop in intensity is exactly <b>3 dB</b>, you can compute it directly:</p>
<div class="formula">HVL (cm) = 3 dB ÷ attenuation coefficient (dB/cm)</div>
<p>In soft tissue, where the coefficient is f ÷ 2, that becomes HVL ≈ 6 ÷ frequency (MHz). A 2 MHz beam halves in about 3 cm; a 6 MHz beam halves in about 1 cm; a 12 MHz beam halves in about 5 mm. Each additional HVL halves what is left again: 100 % → 50 % → 25 % → 12.5 %.</p>
<p><span class="kw-2">Penetration</span> is the practical version of the same idea: the greatest depth from which the machine still gets a usable echo. Since attenuation grows with frequency, <b>higher frequency = shallower penetration</b>, and that is the single biggest trade-off in transducer selection:</p>
<div class="formula">↑ frequency → ↑ attenuation → ↓ HVL → ↓ penetration (but ↑ axial resolution)</div>
<p>This is why a deep abdominal or cardiac study uses a 2–5 MHz probe while a thyroid, breast, or vascular study uses 7–15 MHz. You buy detail with depth, or depth with detail — never both.</p>
<div class="callout key">3 dB = half the intensity. HVL = 3 ÷ coefficient. In soft tissue HVL ≈ 6 ÷ f (MHz). Higher frequency → smaller HVL → less penetration.</div>
<div class="callout tip">Three for a half, six for a quarter, ten for a tenth: 3 dB = 50 %, 6 dB = 25 %, 10 dB = 10 % of the original intensity.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>Intensity falling by half in each successive half-value layer: 100 percent, 50 percent, 25 percent, 12.5 percent</title>
<text x="20" y="30" fill="currentColor" font-size="16">Each half-value layer cuts the intensity in half (−3 dB)</text>
<line x1="60" y1="170" x2="560" y2="170" stroke="currentColor" stroke-width="2"/>
<line x1="60" y1="60" x2="60" y2="170" stroke="var(--c1)" stroke-width="22"/>
<line x1="185" y1="115" x2="185" y2="170" stroke="var(--c1)" stroke-width="22"/>
<line x1="310" y1="142" x2="310" y2="170" stroke="var(--c1)" stroke-width="22"/>
<line x1="435" y1="156" x2="435" y2="170" stroke="var(--c1)" stroke-width="22"/>
<text x="40" y="52" fill="currentColor" font-size="15">100 %</text>
<text x="168" y="107" fill="currentColor" font-size="15">50 %</text>
<text x="293" y="134" fill="currentColor" font-size="15">25 %</text>
<text x="410" y="148" fill="currentColor" font-size="15">12.5 %</text>
<text x="95" y="195" fill="var(--c2)" font-size="15">1 HVL</text>
<text x="220" y="195" fill="var(--c2)" font-size="15">2 HVL</text>
<text x="345" y="195" fill="var(--c2)" font-size="15">3 HVL</text>
<text x="60" y="230" fill="currentColor" font-size="16">HVL = 3 dB ÷ coefficient ≈ 6 ÷ frequency (MHz) in soft tissue</text>
</svg>`, caption: "Intensity halves with each half-value layer — and the HVL shrinks as frequency rises." }
      ],
      sayIt: "Out loud: define half-value layer, state the dB value of a 50 % intensity drop, and compute the HVL for a 3 MHz beam in soft tissue.",
      keyPoints: [
        "HVL = thickness of tissue that halves the intensity of the beam",
        "Half the intensity = a 3 dB drop",
        "HVL (cm) = 3 ÷ attenuation coefficient; in soft tissue ≈ 6 ÷ f (MHz)",
        "2 MHz → about 3 cm; 6 MHz → about 1 cm",
        "Higher frequency → more attenuation → shorter HVL → less penetration",
        "Penetration versus resolution is the core transducer trade-off"
      ]
    },
    {
      id: "u04-l4",
      title: "Acoustic impedance: Z = ρ × c",
      objectives: ["u04-o4"],
      html: `<p class="lead">Impedance is how much a material resists being pushed around by sound — stiff, heavy materials resist more.</p>
<p><span class="kw">Acoustic impedance (Z)</span> is a property of the <b>medium alone</b>. It has nothing to do with frequency, with the probe, or with any machine setting. It is simply the density of the material multiplied by the speed of sound in it:</p>
<div class="formula">Z = ρ × c &nbsp;&nbsp; (density × propagation speed)</div>
<p>With density in kg/m³ and speed in m/s, Z comes out in <b>rayls</b>. The numbers are large, so we usually quote <b>megarayls (MRayls)</b>. Soft tissue: about 1,060 kg/m³ × 1,540 m/s ≈ 1,632,400 rayls ≈ <b>1.63 MRayls</b>.</p>
<table class="dt"><tr><th>Material</th><th>Z (MRayls)</th></tr>
<tr><td>Air</td><td>about 0.0004</td></tr>
<tr><td>Fat</td><td>about 1.38</td></tr>
<tr><td>Water</td><td>about 1.48</td></tr>
<tr><td>Soft tissue (average)</td><td>about 1.63</td></tr>
<tr><td>Muscle</td><td>about 1.70</td></tr>
<tr><td>Bone</td><td>about 7.8</td></tr></table>
<p>Why do we care? Because echoes are born at <b>impedance mismatches</b>. Two tissues with nearly identical Z values produce almost no echo — they look like one uniform blob. Air and bone sit wildly far away from soft tissue on this list, which is why a sliver of air between the probe and the skin reflects essentially everything (hence coupling gel), and why bone and lung throw enormous echoes and leave shadows behind them.</p>
<div class="callout key">Z = ρ × c, unit rayls (kg/(m²·s)). Soft tissue ≈ 1.63 MRayls, air ≈ 0.0004 MRayls, bone ≈ 7.8 MRayls. Property of the medium only.</div>
<div class="callout warn">Do not assume a faster medium always has higher impedance. Both density and speed matter — a light, fast material can land at the same Z as a heavy, slow one.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>An impedance scale showing air near zero, fat water soft tissue and muscle clustered near 1.6 megarayls, and bone far out at 7.8</title>
<text x="20" y="32" fill="currentColor" font-size="16">Z = density × speed, in megarayls</text>
<line x1="50" y1="150" x2="560" y2="150" stroke="currentColor" stroke-width="2"/>
<line x1="55" y1="140" x2="55" y2="160" stroke="var(--c4)" stroke-width="4"/>
<text x="30" y="185" fill="var(--c4)" font-size="15">air</text>
<text x="20" y="205" fill="var(--muted)" font-size="15">0.0004</text>
<line x1="140" y1="140" x2="140" y2="160" stroke="var(--c2)" stroke-width="4"/>
<text x="112" y="185" fill="var(--c2)" font-size="15">fat 1.38</text>
<line x1="180" y1="140" x2="180" y2="160" stroke="var(--c1)" stroke-width="4"/>
<text x="150" y="125" fill="var(--c1)" font-size="15">soft tissue 1.63</text>
<line x1="195" y1="140" x2="195" y2="160" stroke="var(--c3)" stroke-width="4"/>
<text x="210" y="205" fill="var(--c3)" font-size="15">muscle 1.70</text>
<line x1="500" y1="140" x2="500" y2="160" stroke="var(--c2)" stroke-width="4"/>
<text x="465" y="185" fill="var(--c2)" font-size="15">bone 7.8</text>
<text x="50" y="235" fill="var(--muted)" font-size="15">Big gaps make big echoes — soft tissues sit almost on top of each other</text>
</svg>`, caption: "Soft tissues cluster around 1.6 MRayls; air and bone are far off the cluster, so their boundaries reflect enormously." }
      ],
      sayIt: "Out loud: give the impedance formula, its unit, the soft-tissue value, and say what impedance has to do with echoes.",
      keyPoints: [
        "Z = ρ × c (density × propagation speed)",
        "Unit: rayls; typically quoted in megarayls",
        "Soft tissue ≈ 1.63 MRayls; air ≈ 0.0004; bone ≈ 7.8",
        "Determined by the medium only — frequency does not change Z",
        "Echoes require an impedance mismatch at the boundary"
      ]
    },
    {
      id: "u04-l5",
      title: "Normal incidence: how much bounces back?",
      objectives: ["u04-o5", "u04-o8", "u04-o4"],
      html: `<p class="lead">Hit the boundary straight on and the math is clean: only the two impedances decide how much comes back.</p>
<p><span class="kw">Normal incidence</span> (also called perpendicular or 90-degree incidence) means the beam strikes the boundary at 90° to its surface — the angle measured from the normal line is 0°. Under that condition, the reflected sound comes straight back to the probe and the amount that returns is completely predictable:</p>
<div class="formula">IRC = ((Z2 − Z1) ÷ (Z2 + Z1))<sup>2</sup></div>
<div class="formula">ITC = 1 − IRC &nbsp;&nbsp; and &nbsp;&nbsp; IRC + ITC = 1 (or 100 %)</div>
<p><span class="kw-2">IRC</span> is the intensity reflection coefficient — the fraction of intensity that bounces back. <span class="kw-2">ITC</span> is the intensity transmission coefficient — the fraction that keeps going. Both are unitless; multiply by 100 for a percent. Energy is conserved, so whatever does not reflect must transmit.</p>
<p>Example: fat (1.38) against muscle (1.70). Difference = 0.32, sum = 3.08, ratio = 0.104, squared = 0.0108 → about <b>1 % reflected, 99 % transmitted</b>. That is typical of soft-tissue boundaries, and it is good news: almost everything keeps traveling, so we can still see deep structures.</p>
<p>Two consequences worth memorizing. First, the <b>order does not matter</b>: subtracting the other way changes the sign, and squaring erases it. Second, if the two impedances are <b>equal</b>, the numerator is zero and there is <b>no echo at all</b> — an impedance difference is the requirement for a reflection.</p>
<div class="callout key">At normal incidence: IRC = ((Z2 − Z1) ÷ (Z2 + Z1))², ITC = 1 − IRC. Unitless. No impedance difference, no echo. Soft tissue boundaries reflect about 1 % or less.</div>
<div class="callout warn">Forgetting to square is the number one error here. And note the contrast with oblique incidence, where reflection and transmission are unpredictable and no formula will save you.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A beam striking a boundary at ninety degrees, with a small reflected arrow returning and a large transmitted arrow continuing</title>
<line x1="40" y1="150" x2="560" y2="150" stroke="currentColor" stroke-width="3"/>
<text x="45" y="80" fill="var(--muted)" font-size="15">medium 1, Z1</text>
<text x="45" y="235" fill="var(--muted)" font-size="15">medium 2, Z2</text>
<line x1="280" y1="40" x2="280" y2="145" stroke="var(--c1)" stroke-width="6"/>
<text x="295" y="70" fill="var(--c1)" font-size="16">incident 100 %</text>
<line x1="250" y1="145" x2="250" y2="55" stroke="var(--c2)" stroke-width="2"/>
<text x="120" y="120" fill="var(--c2)" font-size="16">reflected ≈ 1 %</text>
<line x1="280" y1="155" x2="280" y2="255" stroke="var(--c3)" stroke-width="6"/>
<text x="300" y="215" fill="var(--c3)" font-size="16">transmitted ≈ 99 %</text>
<text x="330" y="145" fill="var(--muted)" font-size="15">90° to the boundary</text>
<text x="40" y="275" fill="currentColor" font-size="16">IRC = ((Z2 − Z1) ÷ (Z2 + Z1))² &nbsp; ITC = 1 − IRC</text>
</svg>`, caption: "Normal incidence: the echo returns along the same line, and only the impedance mismatch sets its size." }
      ],
      sayIt: "Out loud: what condition is needed for an echo at normal incidence, what is the IRC formula, and what do IRC and ITC add up to?",
      keyPoints: [
        "Normal incidence = beam strikes the boundary at 90° (0° from the normal)",
        "IRC = ((Z2 − Z1) ÷ (Z2 + Z1))² — do not forget to square",
        "ITC = 1 − IRC; IRC + ITC = 1 (100 %)",
        "Both are unitless; order of Z1 and Z2 does not matter",
        "Equal impedances → zero reflection → no echo",
        "Typical soft-tissue boundary reflects about 1 % or less"
      ]
    },
    {
      id: "u04-l6",
      title: "Specular, diffuse, and Rayleigh scattering",
      objectives: ["u04-o6", "u04-o1"],
      html: `<p class="lead">A mirror, a sheet of sandpaper, and a cloud of dust all send light back differently — and so do tissues.</p>
<p><span class="kw">Specular reflection</span> happens at a large, smooth boundary — one that is big compared with the wavelength. It behaves like a mirror: the sound comes back in <b>one direction</b>, at an angle equal to the incident angle. The diaphragm, the bladder wall, a vessel wall, and the fetal skull are specular reflectors. The catch: you only see a specular reflector well when the beam hits it near 90°. Angle it and the echo sails off sideways and never reaches the probe, so the structure goes dark on the image.</p>
<p><span class="kw">Diffuse reflection</span> (backscatter) comes off a <b>rough</b> boundary — irregular on the scale of a wavelength. Energy returns over a wide spread of directions, so you get a weaker but much more <b>angle-independent</b> echo. Liver capsule roughness and most organ surfaces behave this way.</p>
<p><span class="kw">Scattering</span> occurs when the structure is small or irregular; energy is redirected in <b>all directions</b>. This is what gives organ parenchyma its speckled texture, and it is the reason liver, spleen, and kidney look the same from any probe angle.</p>
<p><span class="kw">Rayleigh scattering</span> is the special case where the reflector is <b>much smaller than the wavelength</b> — red blood cells are the classic example. Rayleigh scattering is strongly frequency-dependent:</p>
<div class="formula">Rayleigh scattering ∝ frequency<sup>4</sup></div>
<p>Double the frequency and you get <b>16 times</b> the scattering (2⁴ = 16). Blood therefore looks brighter at high frequency — helpful for Doppler signal, but remember the penetration cost.</p>
<div class="callout key">Specular = large smooth boundary, mirror-like, angle-dependent. Diffuse = rough boundary, spread out. Scattering = small/irregular, all directions, angle-independent. Rayleigh = reflector much smaller than λ, proportional to f⁴.</div>
<div class="callout tip">Rayleigh loves f to the fourth: double the frequency, sixteen times the scatter.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>Three panels: a smooth boundary reflecting in one direction, a rough boundary reflecting in a spread of directions, and a tiny reflector scattering in all directions</title>
<text x="25" y="30" fill="currentColor" font-size="16">Specular</text>
<line x1="20" y1="120" x2="180" y2="120" stroke="currentColor" stroke-width="3"/>
<line x1="60" y1="55" x2="100" y2="118" stroke="var(--c1)" stroke-width="3"/>
<line x1="100" y1="118" x2="140" y2="55" stroke="var(--c2)" stroke-width="3"/>
<text x="20" y="150" fill="var(--muted)" font-size="15">one direction</text>
<text x="20" y="172" fill="var(--muted)" font-size="15">angle matters</text>
<text x="235" y="30" fill="currentColor" font-size="16">Diffuse</text>
<path d="M215 120 l15 -10 l15 10 l15 -10 l15 10 l15 -10 l15 10 l15 -10 l15 10" fill="none" stroke="currentColor" stroke-width="3"/>
<line x1="255" y1="55" x2="290" y2="115" stroke="var(--c1)" stroke-width="3"/>
<line x1="290" y1="115" x2="250" y2="60" stroke="var(--c2)" stroke-width="2"/>
<line x1="290" y1="115" x2="300" y2="50" stroke="var(--c2)" stroke-width="2"/>
<line x1="290" y1="115" x2="350" y2="70" stroke="var(--c2)" stroke-width="2"/>
<text x="215" y="150" fill="var(--muted)" font-size="15">rough surface</text>
<text x="215" y="172" fill="var(--muted)" font-size="15">spread out</text>
<text x="450" y="30" fill="currentColor" font-size="16">Scatter</text>
<line x1="490" y1="110" x2="494" y2="110" stroke="var(--c4)" stroke-width="12"/>
<line x1="492" y1="110" x2="440" y2="70" stroke="var(--c2)" stroke-width="2"/>
<line x1="492" y1="110" x2="492" y2="55" stroke="var(--c2)" stroke-width="2"/>
<line x1="492" y1="110" x2="550" y2="75" stroke="var(--c2)" stroke-width="2"/>
<line x1="492" y1="110" x2="545" y2="140" stroke="var(--c2)" stroke-width="2"/>
<line x1="492" y1="110" x2="440" y2="145" stroke="var(--c2)" stroke-width="2"/>
<text x="425" y="172" fill="var(--muted)" font-size="15">all directions</text>
<text x="20" y="215" fill="currentColor" font-size="16">Rayleigh scattering (reflector much smaller than λ, e.g. red cells) ∝ f⁴</text>
<text x="20" y="245" fill="var(--muted)" font-size="15">Double the frequency → 16× the scattered signal</text>
</svg>`, caption: "Smooth and big sends it one way; rough spreads it; tiny sprays it everywhere." }
      ],
      sayIt: "Out loud: contrast specular and diffuse reflection, give one clinical example of each, and state how Rayleigh scattering changes when frequency doubles.",
      keyPoints: [
        "Specular: boundary large and smooth relative to λ; mirror-like; strongly angle-dependent",
        "Examples of specular reflectors: diaphragm, bladder wall, vessel wall, fetal skull",
        "Diffuse/backscatter: rough boundary; weaker but angle-independent echo",
        "Scattering: small or irregular structures; energy redirected in all directions; makes parenchymal speckle",
        "Rayleigh scattering: reflector much smaller than the wavelength (red blood cells)",
        "Rayleigh scattering is proportional to frequency to the fourth power — double f, 16× scatter"
      ]
    },
    {
      id: "u04-l7",
      title: "Oblique incidence, refraction, and Snell's law",
      objectives: ["u04-o7", "u04-o8"],
      html: `<p class="lead">Push a shopping cart onto grass at an angle and one wheel slows first — the cart turns. That turn is refraction.</p>
<p><span class="kw">Oblique incidence</span> means the beam hits the boundary at any angle other than 90°. Now the reflected sound leaves at the mirror angle and heads away from the probe, and the amount reflected and transmitted becomes <b>unpredictable</b> — the neat IRC formula only applies at normal incidence.</p>
<p>Refraction is the <b>bending of the transmitted beam</b> as it crosses into the second medium. It requires <b>two</b> conditions at once, and exam questions live on this:</p>
<ul><li>Oblique incidence (not 90°), <b>and</b></li>
<li>Different propagation speeds in the two media</li></ul>
<p>Miss either one and there is no bending at all. Same speed with an angle? No refraction. Different speeds but a straight-on hit? No refraction. Note it is a <b>speed</b> difference, not an impedance difference — impedance mismatch causes reflection, speed mismatch causes refraction.</p>
<div class="formula">sin θ<sub>t</sub> ÷ sin θ<sub>i</sub> = c<sub>2</sub> ÷ c<sub>1</sub> &nbsp;&nbsp; (Snell's law)</div>
<p>Read it as a ratio. If the second medium is <b>faster</b> (c2 greater than c1), the transmission angle is <b>larger</b> than the incident angle, so the beam bends <b>away from the normal</b>. If the second medium is <b>slower</b>, the beam bends <b>toward the normal</b>. Same speeds, same angle — straight through.</p>
<div class="callout key">Refraction needs oblique incidence AND different speeds. Snell: sin θt ÷ sin θi = c2 ÷ c1. Faster second medium → bends away from the normal; slower → bends toward it.</div>
<div class="callout warn">Refraction is the cause of the lateral-displacement artifact: the machine assumes sound travels in a straight line, so a bent beam puts structures in the wrong place side to side.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 290" role="img"><title>An oblique beam at a boundary with the normal drawn, a reflected beam at the mirror angle, and a transmitted beam bending away from the normal because the second medium is faster</title>
<line x1="40" y1="150" x2="560" y2="150" stroke="currentColor" stroke-width="3"/>
<line x1="300" y1="30" x2="300" y2="270" stroke="var(--muted)" stroke-dasharray="6 5"/>
<text x="308" y="28" fill="var(--muted)" font-size="15">normal</text>
<line x1="180" y1="50" x2="300" y2="150" stroke="var(--c1)" stroke-width="4"/>
<text x="120" y="48" fill="var(--c1)" font-size="16">incident θi</text>
<line x1="300" y1="150" x2="420" y2="50" stroke="var(--c2)" stroke-width="3"/>
<text x="425" y="48" fill="var(--c2)" font-size="16">reflected θr = θi</text>
<line x1="300" y1="150" x2="470" y2="250" stroke="var(--c3)" stroke-width="4"/>
<text x="400" y="275" fill="var(--c3)" font-size="16">transmitted θt</text>
<text x="45" y="120" fill="var(--muted)" font-size="15">medium 1: c1 (slower)</text>
<text x="45" y="185" fill="var(--muted)" font-size="15">medium 2: c2 (faster) → bends AWAY from the normal</text>
<text x="40" y="225" fill="currentColor" font-size="16">sin θt ÷ sin θi = c2 ÷ c1</text>
</svg>`, caption: "Oblique incidence: the echo leaves at the mirror angle, and the transmitted beam bends if the speeds differ." }
      ],
      sayIt: "Out loud: name the two conditions for refraction, state Snell's law, and say which way the beam bends when it enters a faster medium.",
      keyPoints: [
        "Oblique incidence = any angle other than 90° to the boundary",
        "At oblique incidence, reflection and transmission are unpredictable",
        "Refraction requires oblique incidence AND different propagation speeds",
        "Snell's law: sin θt ÷ sin θi = c2 ÷ c1",
        "Faster second medium → transmission angle larger → bends away from the normal",
        "Slower second medium → bends toward the normal; equal speeds → no bend",
        "Refraction causes lateral displacement (refraction) artifacts"
      ]
    },
    {
      id: "u04-l8",
      title: "The range equation: turning time into depth",
      objectives: ["u04-o9"],
      html: `<p class="lead">The machine owns exactly one clock and one assumption, and from those it builds the entire image.</p>
<p>Every echo arrives at some time after the pulse was sent. The machine converts that <span class="kw-2">go-return time</span> into a depth with the <span class="kw">range equation</span>:</p>
<div class="formula">distance (mm) = ½ × propagation speed (mm/µs) × go-return time (µs)</div>
<p>The ½ is the whole trick: the sound covered the distance <b>twice</b>, down and back, so the reflector sits at half the total travel. Plug in soft tissue at 1.54 mm/µs and the working version is:</p>
<div class="formula">depth (mm) = 0.77 × time (µs) &nbsp;&nbsp; or &nbsp;&nbsp; depth (cm) = time (µs) ÷ 13</div>
<p>Example: an echo returns 91 µs after transmission. Depth = 91 ÷ 13 = <b>7 cm</b> (or 0.77 × 91 = 70 mm — the same answer). Going the other way, a reflector at 4 cm returns its echo at 13 × 4 = <b>52 µs</b>.</p>
<p>The machine assumes 1,540 m/s everywhere. When the sound actually travels through a faster medium the echo comes back early and the structure is drawn too <b>shallow</b>; through a slower medium (like fat) it comes back late and is drawn too <b>deep</b>. That is the propagation-speed-error artifact, and it is a direct consequence of this one equation.</p>
<div class="callout key">distance = ½ × c × time. 13 µs per cm round trip; 6.5 µs per cm one way; 0.77 mm per µs of go-return time.</div>
<div class="callout tip">Unlucky 13: every centimeter of depth costs 13 microseconds, down and back.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>A probe sending a pulse down to a reflector and receiving the echo, with the total time labelled and the depth equal to half the round trip</title>
<line x1="60" y1="50" x2="200" y2="50" stroke="currentColor" stroke-width="6"/>
<text x="60" y="35" fill="var(--muted)" font-size="15">probe, t = 0</text>
<line x1="110" y1="55" x2="110" y2="200" stroke="var(--c1)" stroke-width="4"/>
<text x="125" y="130" fill="var(--c1)" font-size="16">down</text>
<line x1="160" y1="200" x2="160" y2="55" stroke="var(--c2)" stroke-width="4" stroke-dasharray="8 5"/>
<text x="175" y="130" fill="var(--c2)" font-size="16">back (echo)</text>
<line x1="60" y1="205" x2="300" y2="205" stroke="currentColor" stroke-width="4"/>
<text x="310" y="212" fill="currentColor" font-size="16">reflector</text>
<line x1="380" y1="55" x2="380" y2="205" stroke="var(--c3)" stroke-width="3"/>
<line x1="373" y1="55" x2="387" y2="55" stroke="var(--c3)" stroke-width="3"/>
<line x1="373" y1="205" x2="387" y2="205" stroke="var(--c3)" stroke-width="3"/>
<text x="395" y="135" fill="var(--c3)" font-size="16">depth = ½ × c × t</text>
<text x="60" y="250" fill="currentColor" font-size="16">Total time measured = go-return time (µs)</text>
<text x="60" y="275" fill="var(--muted)" font-size="15">13 µs per cm round trip → depth (cm) = time ÷ 13</text>
</svg>`, caption: "The machine times the round trip and halves it — that is the whole range equation." }
      ],
      sayIt: "Out loud: write the range equation, explain the ½, and compute the depth of an echo that returns in 65 µs.",
      keyPoints: [
        "distance = ½ × propagation speed × go-return time",
        "The ½ is there because the pulse travelled down AND back",
        "In soft tissue: depth (mm) = 0.77 × time (µs)",
        "In soft tissue: depth (cm) = time (µs) ÷ 13",
        "4 cm reflector → 52 µs; 91 µs echo → 7 cm",
        "The machine assumes 1,540 m/s; wrong speed → propagation speed error artifact"
      ]
    }
  ],

  mnemonics: [
    { saying: "ARS — Absorption, Reflection, Scattering (and Absorption is the big A)", meaning: "The three components of attenuation. In soft tissue absorption dominates, and it is the one that turns sound into heat.", lesson: "u04-l1" },
    { saying: "Half the frequency is the toll per centimeter", meaning: "Soft-tissue attenuation coefficient (dB/cm) = frequency (MHz) ÷ 2. Multiply by the path length in cm for total attenuation in dB.", lesson: "u04-l2" },
    { saying: "Three for a half, six for a quarter, ten for a tenth", meaning: "Intensity: −3 dB = 50 % left, −6 dB = 25 % left, −10 dB = 10 % left. The 3 dB entry is why HVL = 3 ÷ coefficient.", lesson: "u04-l3" },
    { saying: "Zebras Ride Camels: Z = Rho × C", meaning: "Acoustic impedance = density × propagation speed, in rayls. Soft tissue ≈ 1.63 MRayls.", lesson: "u04-l4" },
    { saying: "No difference, no echo", meaning: "At normal incidence a reflection requires an impedance mismatch. Equal impedances put a zero on top of the IRC fraction, so nothing comes back.", lesson: "u04-l5" },
    { saying: "Reflect and transmit are roommates — they always split one dollar", meaning: "IRC + ITC = 1 (100 %). Whatever does not bounce back must keep going.", lesson: "u04-l5" },
    { saying: "Rayleigh loves f to the fourth", meaning: "Rayleigh scattering (red blood cells and other reflectors much smaller than the wavelength) is proportional to frequency⁴ — double the frequency, sixteen times the scatter.", lesson: "u04-l6" },
    { saying: "Bending takes two: an angle AND a speed change", meaning: "Refraction needs oblique incidence and different propagation speeds. Miss either one and the beam goes straight through.", lesson: "u04-l7" },
    { saying: "Fast lane leans away", meaning: "Snell's law direction check: into a FASTER medium the transmitted beam bends AWAY from the normal; into a slower medium it bends toward the normal.", lesson: "u04-l7" },
    { saying: "Unlucky 13 goes down and back", meaning: "13 µs of go-return time per centimeter of depth (6.5 µs one way). Depth in cm = time in µs ÷ 13.", lesson: "u04-l8" }
  ],

  formulas: [
    { name: "Attenuation coefficient (soft tissue)", expr: "attenuation coefficient (dB/cm) = frequency (MHz) ÷ 2", units: "dB/cm", note: "The 0.5 dB/cm/MHz rule" },
    { name: "Total attenuation", expr: "total attenuation (dB) = attenuation coefficient (dB/cm) × path length (cm)", units: "dB", note: "Use the round-trip path if the question is about an echo" },
    { name: "Half-value layer", expr: "HVL (cm) = 3 dB ÷ attenuation coefficient (dB/cm)", units: "cm", note: "In soft tissue ≈ 6 ÷ frequency (MHz)" },
    { name: "Acoustic impedance", expr: "Z = ρ × c (density × propagation speed)", units: "rayls (kg/(m²·s))", note: "Soft tissue ≈ 1.63 MRayls; medium only" },
    { name: "Intensity reflection coefficient", expr: "IRC = ((Z2 − Z1) ÷ (Z2 + Z1))²", units: "unitless (×100 for %)", note: "Normal incidence only; do not forget to square" },
    { name: "Intensity transmission coefficient", expr: "ITC = 1 − IRC", units: "unitless (×100 for %)", note: "IRC + ITC = 1 (100 %)" },
    { name: "Snell's law", expr: "sin θt ÷ sin θi = c2 ÷ c1", units: "degrees", note: "Faster second medium → bends away from the normal" },
    { name: "Range equation", expr: "distance = ½ × propagation speed × go-return time", units: "mm (or cm)", note: "The ½ is because the pulse went down and back" },
    { name: "Range equation, soft-tissue shortcut", expr: "depth (mm) = 0.77 × go-return time (µs)", units: "mm", note: "Same as depth (cm) = time (µs) ÷ 13" },
    { name: "13 µs rule", expr: "go-return time (µs) = 13 × depth (cm)", units: "µs", note: "6.5 µs/cm one way" },
    { name: "Rayleigh scattering", expr: "Rayleigh scattering ∝ frequency⁴", units: "relative", note: "Double the frequency → 16× the scatter" }
  ],

  keyNumbers: [
    { fact: "Attenuation coefficient in soft tissue", value: "0.5 dB/cm/MHz (coefficient = f ÷ 2)" },
    { fact: "Intensity drop that equals one half", value: "3 dB (6 dB = one quarter, 10 dB = one tenth)" },
    { fact: "Half-value layer in soft tissue", value: "≈ 6 ÷ frequency (MHz) in cm — about 3 cm at 2 MHz" },
    { fact: "Acoustic impedance of soft tissue", value: "≈ 1.63 MRayls (1,060 kg/m³ × 1,540 m/s)" },
    { fact: "Acoustic impedance of air", value: "≈ 0.0004 MRayls (about 400 rayls)" },
    { fact: "Acoustic impedance of bone", value: "≈ 7.8 MRayls" },
    { fact: "Reflection at a typical soft-tissue boundary", value: "about 1 % or less of the intensity" },
    { fact: "Reflection at a soft tissue–air boundary", value: "about 99.9 % (why coupling gel exists)" },
    { fact: "Reflection at a soft tissue–bone boundary", value: "roughly 43 %" },
    { fact: "Go-return time per centimeter of depth", value: "13 µs/cm (6.5 µs/cm one way)" },
    { fact: "Depth per microsecond of go-return time", value: "0.77 mm/µs (speed 1.54 mm/µs ÷ 2)" },
    { fact: "Frequency choice versus depth", value: "2–5 MHz for deep abdomen/cardiac; 7–15 MHz for superficial structures" }
  ],

  flashcards: [
    { front: "Attenuation", back: "Decrease in intensity, power and amplitude as sound travels; measured in dB", lesson: "u04-l1" },
    { front: "Three components of attenuation", back: "Absorption, reflection, scattering", lesson: "u04-l1" },
    { front: "Which component of attenuation dominates in soft tissue?", back: "Absorption — sound energy converted to heat", lesson: "u04-l1" },
    { front: "Two things that increase attenuation", back: "Higher frequency and longer path length", lesson: "u04-l1" },
    { front: "Unit of attenuation", back: "Decibels (dB)", lesson: "u04-l1" },
    { front: "Attenuation coefficient in soft tissue", back: "frequency (MHz) ÷ 2, in dB/cm (the 0.5 dB/cm/MHz rule)", lesson: "u04-l2" },
    { front: "Formula: total attenuation", back: "total attenuation (dB) = attenuation coefficient (dB/cm) × path length (cm)", lesson: "u04-l2" },
    { front: "Attenuation coefficient at 5 MHz", back: "2.5 dB/cm", lesson: "u04-l2" },
    { front: "Total attenuation: 3 MHz over 8 cm", back: "1.5 dB/cm × 8 cm = 12 dB", lesson: "u04-l2" },
    { front: "Half-value layer", back: "Thickness of tissue that reduces the beam intensity to one half (a 3 dB drop)", lesson: "u04-l3" },
    { front: "Formula: half-value layer", back: "HVL = 3 dB ÷ attenuation coefficient; in soft tissue ≈ 6 ÷ f (MHz)", lesson: "u04-l3" },
    { front: "How many dB is half the intensity?", back: "3 dB (6 dB = one quarter, 10 dB = one tenth)", lesson: "u04-l3" },
    { front: "Higher frequency → penetration?", back: "Less penetration (more attenuation), but better axial resolution", lesson: "u04-l3" },
    { front: "Acoustic impedance", back: "Z = density × propagation speed; unit rayls; a property of the medium only", lesson: "u04-l4" },
    { front: "Formula: acoustic impedance", back: "Z = ρ × c", lesson: "u04-l4" },
    { front: "Impedance of soft tissue", back: "≈ 1.63 MRayls", lesson: "u04-l4" },
    { front: "Impedance of air and of bone", back: "Air ≈ 0.0004 MRayls; bone ≈ 7.8 MRayls", lesson: "u04-l4" },
    { front: "Does frequency change acoustic impedance?", back: "No — Z depends only on the medium's density and speed", lesson: "u04-l4" },
    { front: "Normal incidence", back: "Beam strikes the boundary at 90° (0° from the normal); also called perpendicular incidence", lesson: "u04-l5" },
    { front: "Formula: intensity reflection coefficient", back: "IRC = ((Z2 − Z1) ÷ (Z2 + Z1))², at normal incidence", lesson: "u04-l5" },
    { front: "Formula: intensity transmission coefficient", back: "ITC = 1 − IRC (IRC + ITC = 100 %)", lesson: "u04-l5" },
    { front: "What is required for an echo at normal incidence?", back: "A difference in acoustic impedance between the two media", lesson: "u04-l5" },
    { front: "Typical reflection at a soft-tissue boundary", back: "About 1 % or less of the intensity; the rest transmits", lesson: "u04-l5" },
    { front: "Units of IRC and ITC", back: "None — they are unitless fractions (or percentages)", lesson: "u04-l5" },
    { front: "Specular reflection", back: "Mirror-like echo from a large, smooth boundary; strongly angle-dependent", lesson: "u04-l6" },
    { front: "Examples of specular reflectors", back: "Diaphragm, bladder wall, vessel wall, fetal skull", lesson: "u04-l6" },
    { front: "Diffuse reflection", back: "Echo from a rough boundary spread over many directions; weaker but angle-independent", lesson: "u04-l6" },
    { front: "Scattering", back: "Redirection of sound in all directions by small or irregular structures; creates parenchymal speckle", lesson: "u04-l6" },
    { front: "Rayleigh scattering", back: "Scattering from reflectors much smaller than the wavelength (e.g. red blood cells); ∝ f⁴", lesson: "u04-l6" },
    { front: "Double the frequency → Rayleigh scattering?", back: "16 times greater (2⁴)", lesson: "u04-l6" },
    { front: "Oblique incidence", back: "Beam strikes the boundary at any angle other than 90°; reflection and transmission become unpredictable", lesson: "u04-l7" },
    { front: "Two conditions for refraction", back: "Oblique incidence AND different propagation speeds in the two media", lesson: "u04-l7" },
    { front: "Snell's law", back: "sin θt ÷ sin θi = c2 ÷ c1", lesson: "u04-l7" },
    { front: "Beam enters a faster medium obliquely — which way does it bend?", back: "Away from the normal (transmission angle larger than incident angle)", lesson: "u04-l7" },
    { front: "Beam enters a slower medium obliquely — which way does it bend?", back: "Toward the normal (transmission angle smaller than incident angle)", lesson: "u04-l7" },
    { front: "Range equation", back: "distance = ½ × propagation speed × go-return time", lesson: "u04-l8" },
    { front: "Why the ½ in the range equation?", back: "The pulse travelled the distance twice — down and back", lesson: "u04-l8" },
    { front: "Go-return time for a reflector at 1 cm", back: "13 µs (6.5 µs one way)", lesson: "u04-l8" },
    { front: "Echo returns in 130 µs — how deep?", back: "10 cm (130 ÷ 13)", lesson: "u04-l8" },
    { front: "Depth per µs of go-return time", back: "0.77 mm/µs", lesson: "u04-l8" }
  ],

  questions: [
    { id: "u04-q1", type: "mc", q: "Attenuation is reported in which unit?",
      choices: ["Decibels", "Rayls", "Hertz", "Watts per square centimeter"],
      answer: 0,
      explain: "Attenuation is a relative change in intensity, so it is expressed in decibels. Rayls is the unit of acoustic impedance — tempting because impedance appears all over this unit, but it describes the medium, not the loss.",
      objectives: ["u04-o1"], lesson: "u04-l1", level: 1 },
    { id: "u04-q2", type: "mc", q: "Which component of attenuation contributes the most in soft tissue?",
      choices: ["Reflection", "Refraction", "Absorption", "Scattering"],
      answer: 2,
      explain: "Absorption — the conversion of sound energy into heat — is the dominant loss in soft tissue and the one that drives bioeffects. Refraction is not even a component of attenuation; it redirects the beam without removing energy from it.",
      objectives: ["u04-o1"], lesson: "u04-l1", level: 1 },
    { id: "u04-q3", type: "tf", q: "Attenuation increases with both higher frequency and longer path length.",
      answer: true,
      explain: "True — the coefficient rises with frequency (f ÷ 2 dB/cm in soft tissue) and the total is that coefficient multiplied by the distance travelled, so both factors push the loss up.",
      objectives: ["u04-o1"], lesson: "u04-l1", level: 1 },
    { id: "u04-q4", type: "short", q: "Into what form of energy does absorption convert sound?",
      answer: "heat", accept: ["heat", "thermal energy", "thermal"],
      explain: "Absorption turns acoustic energy into heat, which is exactly why it is the mechanism behind thermal bioeffects. Reflection and scattering redirect energy; only absorption destroys it as sound.",
      objectives: ["u04-o1"], lesson: "u04-l1", level: 1 },
    { id: "u04-q5", type: "mc", q: "A 5 MHz beam travels 4 cm through soft tissue. What is the total attenuation?",
      choices: ["2.5 dB", "9 dB", "10 dB", "20 dB"],
      answer: 2,
      explain: "Coefficient = 5 ÷ 2 = 2.5 dB/cm; total = 2.5 × 4 = 10 dB. Choosing 20 dB means you used a 8 cm round-trip path, but the question says the beam travels 4 cm, not that a reflector sits at 4 cm.",
      objectives: ["u04-o2"], lesson: "u04-l2", level: 3 },
    { id: "u04-q6", type: "mc", q: "What is the attenuation coefficient of a 3 MHz beam in soft tissue?",
      choices: ["0.5 dB/cm", "1.5 dB/cm", "3 dB/cm", "6 dB/cm"],
      answer: 1,
      explain: "Coefficient = frequency ÷ 2 = 3 ÷ 2 = 1.5 dB/cm. 0.5 dB/cm is the per-megahertz rate, not the answer for 3 MHz, and 6 dB/cm would be doubling the frequency instead of halving it.",
      objectives: ["u04-o2"], lesson: "u04-l2", level: 2 },
    { id: "u04-q7", type: "short", q: "In soft tissue, the attenuation coefficient in dB/cm equals half of which quantity?",
      answer: "frequency", accept: ["frequency", "the frequency", "frequency in mhz", "f"],
      explain: "Coefficient (dB/cm) = frequency (MHz) ÷ 2. Answering 'path length' mixes up the coefficient with the total attenuation, which is coefficient × path length.",
      objectives: ["u04-o2"], lesson: "u04-l2", level: 2 },
    { id: "u04-q8", type: "tf", q: "Total attenuation equals the attenuation coefficient multiplied by the path length.",
      answer: true,
      explain: "True — dB/cm × cm gives dB. The common slip is using the reflector's depth instead of the actual round-trip distance when the question is about an echo.",
      objectives: ["u04-o2"], lesson: "u04-l2", level: 1 },
    { id: "u04-q9", type: "mc", q: "Which situation produces more total attenuation: a 2 MHz beam over a 10 cm path, or a 5 MHz beam over a 3 cm path?",
      choices: ["The 2 MHz beam (10 dB vs 7.5 dB)", "The 5 MHz beam (7.5 dB vs 10 dB)", "They are equal", "Cannot be determined without the impedances"],
      answer: 0,
      explain: "2 MHz: 1 dB/cm × 10 cm = 10 dB. 5 MHz: 2.5 dB/cm × 3 cm = 7.5 dB. Higher frequency does not automatically mean more total loss — the path length can outweigh it. Impedances are irrelevant to attenuation math.",
      objectives: ["u04-o2"], lesson: "u04-l2", level: 3 },
    { id: "u04-q10", type: "mc", q: "The half-value layer is:",
      choices: ["The depth at which the beam reaches half its original frequency", "The thickness of tissue that reduces the intensity by half", "Half the total imaging depth", "The distance at which half the beam has been reflected"],
      answer: 1,
      explain: "HVL is a thickness that halves the intensity, a 3 dB drop. Frequency does not change as sound travels (only its amplitude does), which rules out the first choice.",
      objectives: ["u04-o3"], lesson: "u04-l3", level: 2 },
    { id: "u04-q11", type: "mc", q: "In soft tissue, what is the approximate half-value layer for a 2 MHz beam?",
      choices: ["0.5 cm", "1 cm", "3 cm", "6 cm"],
      answer: 2,
      explain: "Coefficient = 2 ÷ 2 = 1 dB/cm, and HVL = 3 dB ÷ 1 dB/cm = 3 cm. Answering 6 cm uses the 6 ÷ f shortcut with the wrong arithmetic (6 ÷ 2 = 3, not 6).",
      objectives: ["u04-o3"], lesson: "u04-l3", level: 3 },
    { id: "u04-q12", type: "tf", q: "Choosing a higher-frequency transducer increases penetration.",
      answer: false,
      explain: "False — higher frequency means a bigger attenuation coefficient, a smaller half-value layer, and therefore LESS penetration. What you gain is axial resolution; that is the trade.",
      objectives: ["u04-o3"], lesson: "u04-l3", level: 2 },
    { id: "u04-q13", type: "short", q: "A 50 % drop in intensity corresponds to how many decibels?",
      answer: "3 dB", accept: ["3", "3 db", "3db", "-3 db", "three", "three db"],
      explain: "Half the intensity is a 3 dB change, which is why HVL = 3 ÷ coefficient. 6 dB would be one quarter and 10 dB one tenth.",
      objectives: ["u04-o3"], lesson: "u04-l3", level: 2 },
    { id: "u04-q14", type: "mc", q: "Acoustic impedance is calculated as:",
      choices: ["Density × propagation speed", "Density ÷ propagation speed", "Frequency × wavelength", "Propagation speed ÷ frequency"],
      answer: 0,
      explain: "Z = ρ × c, in rayls. Choice C (frequency × wavelength) gives propagation speed, and choice D gives wavelength — both are real formulas, which is what makes them tempting.",
      objectives: ["u04-o4"], lesson: "u04-l4", level: 1 },
    { id: "u04-q15", type: "mc", q: "A medium has a density of 1,000 kg/m³ and a propagation speed of 1,500 m/s. What is its acoustic impedance?",
      choices: ["0.67 MRayls", "1.5 MRayls", "2.5 MRayls", "1,500 rayls"],
      answer: 1,
      explain: "Z = 1,000 × 1,500 = 1,500,000 rayls = 1.5 MRayls. Choice A divides instead of multiplying; choice D forgets the density entirely.",
      objectives: ["u04-o4"], lesson: "u04-l4", level: 3 },
    { id: "u04-q16", type: "short", q: "Which two properties of a medium determine its acoustic impedance?",
      answer: "density and speed", accept: ["density and speed", "density and propagation speed", "speed and density", "density & speed", "density, speed"],
      explain: "Z = density × propagation speed. Frequency is not on the list — impedance is a property of the medium alone, so changing probes does not change Z.",
      objectives: ["u04-o4"], lesson: "u04-l4", level: 2 },
    { id: "u04-q17", type: "tf", q: "Acoustic impedance depends on the frequency of the sound passing through the medium.",
      answer: false,
      explain: "False. Z = ρ × c, and both density and speed are properties of the medium. The attenuation coefficient does depend on frequency — that is the quantity people confuse this with.",
      objectives: ["u04-o4"], lesson: "u04-l4", level: 2 },
    { id: "u04-q18", type: "mc", q: "At normal incidence, what is required for an echo to be created?",
      choices: ["A difference in propagation speed", "A difference in acoustic impedance", "An angle other than 90°", "A difference in frequency"],
      answer: 1,
      explain: "The IRC numerator is Z2 − Z1, so an impedance mismatch is the requirement. A speed difference is the requirement for REFRACTION (and only at oblique incidence) — a classic swap on exams.",
      objectives: ["u04-o5"], lesson: "u04-l5", level: 1 },
    { id: "u04-q19", type: "mc", q: "Sound at normal incidence passes from a medium with Z = 1.5 MRayls into one with Z = 1.6 MRayls. Approximately what percentage of the intensity is reflected?",
      choices: ["0.1 %", "3 %", "6 %", "10 %"],
      answer: 0,
      explain: "IRC = ((1.6 − 1.5) ÷ (1.6 + 1.5))² = (0.1 ÷ 3.1)² = (0.032)² ≈ 0.001 = 0.1 %. Choosing 3 % is what you get if you forget to square the ratio — the single most common mistake with this formula.",
      objectives: ["u04-o5"], lesson: "u04-l5", level: 3 },
    { id: "u04-q20", type: "mc", q: "If 1 % of the intensity is reflected at a boundary, how much is transmitted?",
      choices: ["1 %", "50 %", "99 %", "100 %"],
      answer: 2,
      explain: "ITC = 1 − IRC = 100 % − 1 % = 99 %. Energy is conserved, so whatever fails to reflect must carry on into the second medium.",
      objectives: ["u04-o5"], lesson: "u04-l5", level: 2 },
    { id: "u04-q21", type: "tf", q: "If two media have identical acoustic impedances, no reflection occurs at a normal-incidence boundary.",
      answer: true,
      explain: "True — Z2 − Z1 = 0 puts a zero in the numerator, so IRC = 0 and everything transmits. The two tissues would be indistinguishable on the image even though they may be very different biologically.",
      objectives: ["u04-o5"], lesson: "u04-l5", level: 2 },
    { id: "u04-q22", type: "short", q: "What do the intensity reflection and transmission coefficients add up to?",
      answer: "1", accept: ["1", "one", "100%", "100 %", "100", "100 percent", "unity"],
      explain: "IRC + ITC = 1 (or 100 %) because energy is conserved at the boundary. If a question gives you one, subtract to get the other.",
      objectives: ["u04-o5"], lesson: "u04-l5", level: 1 },
    { id: "u04-q23", type: "mc", q: "Normal incidence means the sound beam strikes the boundary at:",
      choices: ["0° to the boundary surface", "45° to the boundary surface", "90° to the boundary surface", "Any angle, as long as the media differ"],
      answer: 2,
      explain: "Normal (perpendicular) incidence is 90° to the boundary surface, which is 0° measured from the normal line. Mixing up those two reference lines is exactly why this question trips people up.",
      objectives: ["u04-o8"], lesson: "u04-l5", level: 2 },
    { id: "u04-q24", type: "mc", q: "Which structure behaves as a specular reflector?",
      choices: ["Red blood cells", "Liver parenchyma", "The diaphragm", "A cloud of microbubbles"],
      answer: 2,
      explain: "The diaphragm is a large, smooth boundary relative to the wavelength, so it reflects like a mirror and looks brightest when the beam hits it near 90°. Red cells are Rayleigh scatterers and liver parenchyma produces scatter-based speckle.",
      objectives: ["u04-o6"], lesson: "u04-l6", level: 1 },
    { id: "u04-q25", type: "mc", q: "A sonographer doubles the frequency. What happens to Rayleigh scattering from red blood cells?",
      choices: ["It doubles", "It quadruples", "It increases 16-fold", "It is unchanged"],
      answer: 2,
      explain: "Rayleigh scattering is proportional to frequency to the fourth power, so 2⁴ = 16 times as much. Quadrupling would be an f² relationship — the tempting half-remembered version.",
      objectives: ["u04-o6"], lesson: "u04-l6", level: 2 },
    { id: "u04-q26", type: "tf", q: "Red blood cells are specular reflectors.",
      answer: false,
      explain: "False. Red cells are far smaller than the wavelength, so they are Rayleigh scatterers: they send sound in all directions, which is why Doppler signals can be obtained from many angles rather than only at 90° incidence.",
      objectives: ["u04-o6"], lesson: "u04-l6", level: 2 },
    { id: "u04-q27", type: "short", q: "What term describes reflection off a rough boundary, spread over many directions?",
      answer: "diffuse reflection", accept: ["diffuse", "diffuse reflection", "backscatter", "scattering", "diffuse scattering"],
      explain: "Diffuse reflection (backscatter) comes off surfaces that are rough compared with the wavelength. It is weaker than specular reflection but much less dependent on the angle of the beam.",
      objectives: ["u04-o6"], lesson: "u04-l6", level: 1 },
    { id: "u04-q28", type: "mc", q: "Why does liver parenchyma look essentially the same no matter what angle the probe is held at, while the diaphragm brightens and dims?",
      choices: ["The liver has no acoustic impedance", "Scattering sends energy in all directions; specular reflection does not", "The liver absorbs more sound than the diaphragm", "The machine applies more gain to parenchyma"],
      answer: 1,
      explain: "Parenchymal echoes come from scattering, which is essentially angle-independent, while the diaphragm is a specular reflector that only returns sound to the probe near perpendicular incidence. Absorption affects brightness with depth, not with angle.",
      objectives: ["u04-o6"], lesson: "u04-l6", level: 3 },
    { id: "u04-q29", type: "mc", q: "Which pair of conditions is required for refraction?",
      choices: ["Normal incidence and different impedances", "Oblique incidence and different propagation speeds", "Oblique incidence and different impedances", "Normal incidence and different frequencies"],
      answer: 1,
      explain: "Refraction needs an angle AND a speed change. Choice C is the trap: impedance difference causes reflection, not bending — refraction cares only about speed.",
      objectives: ["u04-o7"], lesson: "u04-l7", level: 2 },
    { id: "u04-q30", type: "mc", q: "A beam strikes a boundary obliquely and enters a second medium with a HIGHER propagation speed. The transmitted beam:",
      choices: ["Bends toward the normal", "Bends away from the normal", "Continues without bending", "Reflects entirely"],
      answer: 1,
      explain: "Snell's law: sin θt ÷ sin θi = c2 ÷ c1. A larger c2 makes the ratio greater than 1, so θt is larger than θi — the beam leans away from the normal. It bends toward the normal only when the second medium is slower.",
      objectives: ["u04-o7", "u04-o8"], lesson: "u04-l7", level: 3 },
    { id: "u04-q31", type: "tf", q: "Refraction can occur at normal incidence if the two media have different propagation speeds.",
      answer: false,
      explain: "False — at 90° incidence the beam passes straight through no matter how different the speeds are. Both conditions, an oblique angle and a speed difference, must be present at the same time.",
      objectives: ["u04-o7"], lesson: "u04-l7", level: 2 },
    { id: "u04-q32", type: "short", q: "What is the name of the law relating the transmission angle to the propagation speeds?",
      answer: "Snell's law", accept: ["snell", "snells law", "snell's law", "snell law", "law of refraction"],
      explain: "Snell's law: sin θt ÷ sin θi = c2 ÷ c1. Use the ratio to decide the direction of the bend rather than trying to memorize cases.",
      objectives: ["u04-o7"], lesson: "u04-l7", level: 1 },
    { id: "u04-q33", type: "mc", q: "An echo arrives 130 µs after the pulse was transmitted. How deep is the reflector?",
      choices: ["5 cm", "10 cm", "13 cm", "20 cm"],
      answer: 1,
      explain: "Depth = time ÷ 13 = 130 ÷ 13 = 10 cm. Answering 20 cm forgets the ½ in the range equation — that would be the total round-trip distance, not the depth.",
      objectives: ["u04-o9"], lesson: "u04-l8", level: 3 },
    { id: "u04-q34", type: "mc", q: "A reflector lies 6 cm deep in soft tissue. When does its echo return?",
      choices: ["39 µs", "46 µs", "78 µs", "92 µs"],
      answer: 2,
      explain: "Go-return time = 13 µs/cm × 6 cm = 78 µs. Choosing 39 µs uses 6.5 µs/cm, the one-way rate, and forgets that the pulse must come back.",
      objectives: ["u04-o9"], lesson: "u04-l8", level: 3 },
    { id: "u04-q35", type: "tf", q: "The range equation includes a factor of one half because the pulse travels to the reflector and back.",
      answer: true,
      explain: "True — the measured time covers twice the depth, so the machine halves it. Drop the ½ and every structure would be placed at double its true depth.",
      objectives: ["u04-o9"], lesson: "u04-l8", level: 2 },
    { id: "u04-q36", type: "short", q: "A go-return time of 13 µs corresponds to what depth?",
      answer: "1 cm", accept: ["1", "1 cm", "one cm", "one centimeter", "1cm", "10 mm"],
      explain: "13 µs is exactly one centimeter of depth, down and back. Half of that time, 6.5 µs, is the one-way travel time for the same centimeter.",
      objectives: ["u04-o9"], lesson: "u04-l8", level: 2 },
    { id: "u04-q37", type: "mc", q: "Compared with normal incidence, oblique incidence makes reflection and transmission:",
      choices: ["Exactly predictable from the impedances", "Unpredictable — the simple IRC formula no longer applies", "Always zero", "Independent of the media involved"],
      answer: 1,
      explain: "The clean IRC equation is valid only at normal incidence. At an angle, the returning sound heads away from the probe and the split between reflected and transmitted energy is no longer predictable from Z values alone.",
      objectives: ["u04-o8", "u04-o5"], lesson: "u04-l7", level: 2 },
    { id: "u04-q38", type: "mc", q: "A patient needs a deep abdominal study. Why choose a 3 MHz probe over a 9 MHz probe?",
      choices: ["3 MHz has a lower attenuation coefficient, so more penetration", "3 MHz has a shorter half-value layer", "3 MHz produces stronger Rayleigh scattering", "3 MHz has a lower acoustic impedance"],
      answer: 0,
      explain: "At 3 MHz the coefficient is 1.5 dB/cm versus 4.5 dB/cm at 9 MHz, so far less signal is lost on the way down and back — deeper penetration. Its half-value layer is LONGER, not shorter, and impedance does not depend on frequency at all.",
      objectives: ["u04-o3", "u04-o2"], lesson: "u04-l3", level: 3 }
  ],

  drills: [
    {
      id: "u04-d1", title: "Attenuation coefficient in soft tissue", formula: "coefficient (dB/cm) = frequency (MHz) ÷ 2", lesson: "u04-l2",
      gen: function (rnd) {
        var f = [1, 2, 2.5, 3, 4, 5, 7.5, 10][Math.floor(rnd() * 8)];
        var coeff = f / 2;
        return {
          kind: "number",
          given: "A beam with a frequency of " + f + " MHz is traveling through soft tissue.",
          ask: "What is the attenuation coefficient, in dB/cm?",
          answer: +coeff.toFixed(3), unit: "dB/cm", tol: 0.02,
          steps: [
            "In soft tissue the rate is 0.5 dB per centimeter per megahertz.",
            "coefficient = f ÷ 2 = " + f + " ÷ 2",
            "coefficient = " + coeff + " dB/cm",
            "Only frequency and the medium set this — no console knob changes it."
          ]
        };
      }
    },
    {
      id: "u04-d2", title: "Total attenuation over a path", formula: "total attenuation (dB) = coefficient (dB/cm) × path (cm)", lesson: "u04-l2",
      gen: function (rnd) {
        var f = [2, 3, 4, 5, 6, 8][Math.floor(rnd() * 6)];
        var path = [2, 3, 4, 5, 6, 8, 10, 12][Math.floor(rnd() * 8)];
        var coeff = f / 2;
        var total = coeff * path;
        return {
          kind: "number",
          given: "A beam with a frequency of " + f + " MHz travels " + path + " cm through soft tissue.",
          ask: "What is the total attenuation, in dB?",
          answer: +total.toFixed(3), unit: "dB", tol: 0.05,
          steps: [
            "coefficient = f ÷ 2 = " + f + " ÷ 2 = " + coeff + " dB/cm",
            "total = coefficient × path = " + coeff + " × " + path,
            "total attenuation = " + total + " dB",
            "If this were an echo from a reflector " + path + " cm deep, the round trip would be " + (2 * path) + " cm and the loss would be " + (total * 2) + " dB."
          ]
        };
      }
    },
    {
      id: "u04-d3", title: "Acoustic impedance from density and speed", formula: "Z = ρ × c", lesson: "u04-l4",
      gen: function (rnd) {
        var rho = [1000, 1040, 1060, 1100, 1200, 1300][Math.floor(rnd() * 6)];
        var c = [1450, 1500, 1540, 1580, 1600][Math.floor(rnd() * 5)];
        var z = rho * c / 1000000;
        return {
          kind: "number",
          given: "A tissue has a density of " + rho + " kg/m³ and a propagation speed of " + c + " m/s.",
          ask: "What is its acoustic impedance, in MRayls?",
          answer: +z.toFixed(4), unit: "MRayls", tol: 0.02,
          steps: [
            "Z = density × propagation speed",
            "Z = " + rho + " × " + c + " = " + (rho * c) + " rayls",
            "Z = " + z.toFixed(3) + " MRayls",
            "Compare with soft tissue at about 1.63 MRayls."
          ]
        };
      }
    },
    {
      id: "u04-d4", title: "Intensity reflection coefficient at normal incidence", formula: "IRC = ((Z2 − Z1) ÷ (Z2 + Z1))²", lesson: "u04-l5",
      gen: function (rnd) {
        var zs = [0.0004, 1.38, 1.48, 1.63, 1.7, 1.99, 7.8];
        var i = Math.floor(rnd() * zs.length);
        var j = Math.floor(rnd() * zs.length);
        if (j === i) j = (i + 1 + Math.floor(rnd() * (zs.length - 1))) % zs.length;
        var z1 = zs[i], z2 = zs[j];
        var ratio = (z2 - z1) / (z2 + z1);
        var irc = ratio * ratio * 100;
        return {
          kind: "number",
          given: "At normal incidence, sound passes from a medium with Z1 = " + z1 + " MRayls into a medium with Z2 = " + z2 + " MRayls.",
          ask: "What percentage of the intensity is reflected?",
          answer: +irc.toFixed(3), unit: "%", tol: Math.max(0.05, irc * 0.02),
          steps: [
            "Difference: Z2 − Z1 = " + (z2 - z1).toFixed(4),
            "Sum: Z2 + Z1 = " + (z2 + z1).toFixed(4),
            "Ratio = " + ratio.toFixed(4) + " — now square it (this is the step everyone forgets)",
            "IRC = " + (ratio * ratio).toFixed(5) + " = " + irc.toFixed(2) + " %"
          ]
        };
      }
    },
    {
      id: "u04-d5", title: "Transmission coefficient (what is left over)", formula: "ITC = 1 − IRC", lesson: "u04-l5",
      gen: function (rnd) {
        var zs = [1.38, 1.48, 1.63, 1.7, 1.99, 4.08, 7.8];
        var i = Math.floor(rnd() * zs.length);
        var j = Math.floor(rnd() * zs.length);
        if (j === i) j = (i + 1 + Math.floor(rnd() * (zs.length - 1))) % zs.length;
        var z1 = zs[i], z2 = zs[j];
        var ratio = (z2 - z1) / (z2 + z1);
        var irc = ratio * ratio * 100;
        var itc = 100 - irc;
        return {
          kind: "number",
          given: "At normal incidence, Z1 = " + z1 + " MRayls and Z2 = " + z2 + " MRayls.",
          ask: "What percentage of the intensity is transmitted into the second medium?",
          answer: +itc.toFixed(3), unit: "%", tol: Math.max(0.05, itc * 0.02),
          steps: [
            "First the reflection: IRC = ((" + z2 + " − " + z1 + ") ÷ (" + z2 + " + " + z1 + "))²",
            "IRC = (" + ratio.toFixed(4) + ")² = " + irc.toFixed(2) + " %",
            "Energy is conserved: ITC = 100 % − IRC",
            "ITC = 100 − " + irc.toFixed(2) + " = " + itc.toFixed(2) + " %"
          ]
        };
      }
    },
    {
      id: "u04-d6", title: "Depth and go-return time (13 µs rule)", formula: "time (µs) = 13 × depth (cm); depth = ½ × c × time", lesson: "u04-l8",
      gen: function (rnd) {
        var depths = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15];
        var d = depths[Math.floor(rnd() * depths.length)];
        var t = 13 * d;
        var askTime = rnd() < 0.5;
        if (askTime) {
          return {
            kind: "number",
            given: "A reflector lies " + d + " cm deep in soft tissue.",
            ask: "How long after transmission does its echo return, in microseconds?",
            answer: t, unit: "µs", tol: 1,
            steps: [
              "Sound covers the distance twice: down and back.",
              "time = 13 µs/cm × depth = 13 × " + d,
              "time = " + t + " µs",
              "One-way time would be half of that: " + (t / 2) + " µs."
            ]
          };
        }
        return {
          kind: "number",
          given: "An echo returns " + t + " µs after the pulse was transmitted (soft tissue, c = 1.54 mm/µs).",
          ask: "How deep is the reflector, in centimeters?",
          answer: d, unit: "cm", tol: 0.2,
          steps: [
            "Range equation: distance = ½ × c × time = 0.5 × 1.54 × " + t + " mm",
            "= " + (0.77 * t).toFixed(1) + " mm",
            "Shortcut: depth (cm) = time ÷ 13 = " + t + " ÷ 13",
            "depth = " + d + " cm"
          ]
        };
      }
    },
    {
      id: "u04-d7", title: "Snell's law: which way does it bend?", formula: "sin θt ÷ sin θi = c2 ÷ c1", lesson: "u04-l7",
      gen: function (rnd) {
        var speeds = [1450, 1490, 1540, 1580, 1620, 1700];
        var i = Math.floor(rnd() * speeds.length);
        var j = Math.floor(rnd() * speeds.length);
        var c1 = speeds[i], c2 = speeds[j];
        var normal = rnd() < 0.25;
        var ans;
        if (normal || c2 === c1) ans = 2;
        else ans = (c2 > c1) ? 1 : 0;
        return {
          kind: "choice",
          given: "Sound travels from a medium with c1 = " + c1 + " m/s into a medium with c2 = " + c2 + " m/s at " + (normal ? "normal (90°) incidence." : "oblique incidence."),
          ask: "What does the transmitted beam do?",
          choices: ["Bends toward the normal", "Bends away from the normal", "Passes straight through, no bending"],
          answer: ans,
          steps: [
            "Refraction needs BOTH oblique incidence and a speed difference.",
            normal ? "Incidence is 90°, so there is no bending no matter what the speeds are." : (c2 === c1 ? "The speeds are equal, so there is no bending even though the beam is oblique." : "Snell: sin θt ÷ sin θi = c2 ÷ c1 = " + (c2 / c1).toFixed(3)),
            (!normal && c2 !== c1) ? ("The ratio is " + (c2 > c1 ? "greater" : "less") + " than 1, so θt is " + (c2 > c1 ? "larger" : "smaller") + " than θi.") : "Both conditions are required; one missing condition means a straight path.",
            "Answer: " + ["bends toward the normal", "bends away from the normal", "no bending"][ans] + "."
          ]
        };
      }
    },
    {
      id: "u04-d8", title: "What happens to attenuation when things change?", formula: "attenuation ↑ with frequency and with path length", lesson: "u04-l1",
      gen: function (rnd) {
        var up = rnd() < 0.5;
        var whatI = Math.floor(rnd() * 3);
        var what = ["the transducer frequency", "the path length the sound travels", "the acoustic impedance of the tissue"][whatI];
        var askI = Math.floor(rnd() * 2);
        if (whatI === 1) askI = 0;
        var ask = ["the total attenuation (dB)", "the penetration (useful imaging depth)"][askI];
        var ans;
        if (whatI === 2) ans = 2;
        else if (whatI === 1) ans = (askI === 0) ? (up ? 0 : 1) : 2;
        else ans = (up ? 0 : 1);
        if (whatI === 0 && askI === 1) ans = up ? 1 : 0;
        return {
          kind: "choice",
          given: "Everything else stays the same, but " + what + " is " + (up ? "increased" : "decreased") + ".",
          ask: "What happens to " + ask + "?",
          choices: ["Increases", "Decreases", "Stays about the same"],
          answer: ans,
          steps: [
            "Attenuation coefficient (dB/cm) = frequency ÷ 2, so frequency drives the per-centimeter loss.",
            "Total attenuation = coefficient × path length, so a longer path also raises the total.",
            "Penetration is the flip side of attenuation: more attenuation means less penetration, and penetration is set by frequency, not by how far a particular pulse happened to travel.",
            "Acoustic impedance controls how much reflects at boundaries — it does not change attenuation or penetration."
          ]
        };
      }
    }
  ],

  whiteboard: [
    {
      id: "u04-w1", prompt: "Brain-dump everything about attenuation: definition, unit, the three components, the soft-tissue coefficient, total attenuation, half-value layer, and the frequency trade-off.", minutes: 8, lesson: "u04-l2",
      keyPoints: [
        "Attenuation = loss of intensity/power/amplitude with distance; unit dB",
        "Three components: absorption, reflection, scattering",
        "Absorption dominates in soft tissue and turns sound into heat",
        "Attenuation coefficient (dB/cm) = frequency (MHz) ÷ 2 — the 0.5 dB/cm/MHz rule",
        "Total attenuation (dB) = coefficient × path length (cm)",
        "Echo questions use the round-trip path: a reflector at d cm means 2d cm",
        "3 dB = half the intensity; HVL = 3 ÷ coefficient ≈ 6 ÷ f (MHz)",
        "↑ frequency → ↑ attenuation → ↓ HVL → ↓ penetration, but ↑ axial resolution",
        "TGC exists to compensate for the extra attenuation of deep echoes"
      ]
    },
    {
      id: "u04-w2", prompt: "Draw a boundary between two media. Write everything that decides what happens to the beam there: impedance, IRC, ITC, normal vs oblique incidence, and refraction.", minutes: 8, lesson: "u04-l5",
      keyPoints: [
        "Z = ρ × c, in rayls; soft tissue ≈ 1.63 MRayls; a property of the medium only",
        "Echo requires an impedance difference",
        "Normal incidence = 90° to the boundary (0° from the normal)",
        "IRC = ((Z2 − Z1) ÷ (Z2 + Z1))² — square it",
        "ITC = 1 − IRC; IRC + ITC = 100 %",
        "Typical soft-tissue boundary reflects about 1 %; tissue–air about 99.9 %; tissue–bone about 43 %",
        "Oblique incidence makes reflection and transmission unpredictable",
        "Refraction needs oblique incidence AND different propagation speeds",
        "Snell's law: sin θt ÷ sin θi = c2 ÷ c1; faster second medium bends the beam away from the normal",
        "Refraction causes lateral displacement artifacts"
      ]
    },
    {
      id: "u04-w3", prompt: "Compare specular reflection, diffuse reflection, scattering and Rayleigh scattering: size of reflector, direction of the returning sound, angle dependence, clinical examples, and frequency dependence.", minutes: 6, lesson: "u04-l6",
      keyPoints: [
        "Specular: boundary large and smooth compared with λ",
        "Specular returns sound in one direction and is strongly angle-dependent",
        "Specular examples: diaphragm, bladder wall, vessel wall, fetal skull",
        "Diffuse: rough boundary; energy spread over many directions; weaker but angle-independent",
        "Scattering: small or irregular structures; sound redirected in all directions",
        "Scattering creates the speckle texture of liver, spleen and kidney and is why parenchyma looks the same at any angle",
        "Rayleigh: reflector much smaller than the wavelength, e.g. red blood cells",
        "Rayleigh scattering is proportional to f⁴ — double the frequency, 16× the scatter",
        "Reflection and scattering are both components of attenuation"
      ]
    },
    {
      id: "u04-w4", prompt: "Derive the range equation from the speed of sound, then write the go-return time for reflectors at 1, 5, 10 and 15 cm, and explain the artifact that appears when the machine's speed assumption is wrong.", minutes: 6, lesson: "u04-l8",
      keyPoints: [
        "distance = ½ × propagation speed × go-return time",
        "The ½ exists because the pulse travels down and back",
        "Soft tissue: 1,540 m/s = 1.54 mm/µs, so depth (mm) = 0.77 × time (µs)",
        "13 µs per cm round trip; 6.5 µs per cm one way",
        "1 cm → 13 µs; 5 cm → 65 µs; 10 cm → 130 µs; 15 cm → 195 µs",
        "Depth (cm) = go-return time (µs) ÷ 13",
        "The machine always assumes 1,540 m/s",
        "Actual speed faster than assumed → echo early → structure drawn too shallow",
        "Actual speed slower (e.g. fat) → echo late → structure drawn too deep (propagation speed error)"
      ]
    }
  ]
});
