window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u11",
  order: 11,
  title: "Hemodynamics",
  icon: "🩸",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Hemodynamics chapter",
  blurb: "How and why blood actually moves: energy gradients, resistance, Poiseuille's law, flow profiles, turbulence, Bernoulli at a stenosis, venous phasicity and hydrostatic pressure. This is the physics behind every Doppler waveform you will ever be asked to read, so the exam leans on it hard.",

  objectives: [
    { id: "u11-o1", text: "Explain why blood flows only when an energy (pressure) gradient exists, and state the direction of flow relative to that gradient." },
    { id: "u11-o2", text: "State the volume flow rate equation (flow = pressure gradient ÷ resistance) and predict how flow changes when the gradient or the resistance changes." },
    { id: "u11-o3", text: "State Poiseuille's law and rank the effect of vessel radius, vessel length, and blood viscosity on resistance and on volume flow rate." },
    { id: "u11-o4", text: "Compare steady, pulsatile, and phasic flow and name a vessel or situation where each is found." },
    { id: "u11-o5", text: "Describe plug, laminar (parabolic), and turbulent flow profiles, where each occurs, and how each appears on a Doppler spectrum." },
    { id: "u11-o6", text: "Define Reynolds number, state the numeric threshold for turbulence, and list the factors that raise or lower it." },
    { id: "u11-o7", text: "Apply Bernoulli's principle to a stenosis to predict velocity and pressure at and beyond the narrowing, and calculate a pressure gradient with the simplified 4v² equation." },
    { id: "u11-o8", text: "Describe normal venous flow: phasicity with respiration, the effect of Valsalva, and the effect of hydrostatic pressure standing versus lying." },
    { id: "u11-o9", text: "Compare high-resistance and low-resistance vascular beds by waveform shape, and predict the effect of exercise and of disease on peripheral resistance and flow." }
  ],

  lessons: [
    {
      id: "u11-l1",
      title: "Nothing moves without a gradient",
      objectives: ["u11-o1", "u11-o2"],
      html: `<p class="lead">Blood is lazy. It never moves because the heart "pushes it along the pipe" — it moves because one end of the pipe has more energy than the other end.</p>
<p>Picture a water slide. Water at the top has height (potential energy); water at the bottom has none. Water runs down, never up, and it stops the instant the slide is level. Blood behaves exactly the same way, except the energy that matters most is <span class="kw">pressure</span>, measured in <b>mmHg</b>.</p>
<p>The difference in pressure between two points is the <span class="kw">pressure gradient</span> (ΔP). If upstream pressure is 100 mmHg and downstream pressure is 20 mmHg, ΔP = 80 mmHg. In a steady segment at the same elevation with no other energy source, equal pressures imply no pressure-driven flow.</p>
<div class="steps"><ol><li>ΔP = 100 − 20 = 80 mmHg.</li><li>If resistance is 4 mmHg/(mL/min), flow = 80 ÷ 4 = 20 mL/min.</li><li>Total energy bookkeeping also includes kinetic and gravitational potential energy.</li></ol></div>
<div class="callout key">Flow follows a total-energy gradient. Pressure is usually dominant, but “no pressure gradient, no flow” assumes steady flow at the same elevation without another energy source.</div>
<p>Three kinds of energy add up to a vessel's total energy: <span class="kw-2">pressure energy</span> (the push from the heart), <span class="kw-2">kinetic energy</span> (energy of motion, from velocity), and <span class="kw-2">potential energy</span> (from height relative to the heart). Bernoulli's principle, later in this unit, is just bookkeeping on these three.</p>
<p>What controls the gradient? The <b>heart</b> generates the pressure at the upstream end; the <b>vascular bed</b> downstream sets how much pressure is left. The sonographer controls none of it — but you measure its consequences in every Doppler tracing.</p>
<div class="callout warn">Exam trap: "high pressure" alone does not cause flow. A pressurized closed bottle at 200 mmHg has zero flow because there is no <i>gradient</i>.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 220" role="img"><title>A tube with 100 mmHg at the left end and 20 mmHg at the right end, with an arrow showing blood flowing toward the low-pressure end</title>
<rect x="40" y="80" width="520" height="70" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="42" y="62" fill="currentColor" font-size="17">100 mmHg</text>
<text x="452" y="62" fill="currentColor" font-size="17">20 mmHg</text>
<line x1="80" y1="115" x2="510" y2="115" stroke="var(--c1)" stroke-width="3"/>
<polyline points="488,102 514,115 488,128" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="230" y="105" fill="var(--c1)" font-size="17">flow</text>
<text x="118" y="192" fill="currentColor" font-size="17">gradient = 100 − 20 = 80 mmHg</text>
</svg>`,
          caption: "High pressure to low pressure. The 80 mmHg difference is what drives flow, not the 100."
        }
      ],
      sayIt: "Say out loud: why does blood flow at all, and what happens to flow if the pressures at both ends are equal but both are very high?",
      keyPoints: [
        "Flow requires an energy (pressure) gradient",
        "Direction: always high energy to low energy",
        "Gradient ΔP = upstream pressure − downstream pressure, in mmHg",
        "Total energy = pressure + kinetic (motion) + potential (height)",
        "Equal pressures at both ends = zero flow, no matter how high they are"
      ]
    },

    {
      id: "u11-l2",
      title: "Flow, resistance, and Poiseuille's law",
      objectives: ["u11-o2", "u11-o3"],
      html: `<p class="lead">Volume flow rate is a tug-of-war: the gradient pushes, resistance holds back.</p>
<div class="formula">volume flow rate = pressure gradient ÷ resistance</div>
<p><span class="kw">Volume flow rate</span> is how much blood passes a point per unit time, in <b>mL/min</b> (or cm³/s). Double the gradient and flow doubles. Double the resistance and flow halves. Resistance and flow are <b>inversely</b> related; gradient and flow are <b>directly</b> related.</p>
<p><span class="kw">Poiseuille's law</span> unpacks resistance into three ingredients:</p>
<div class="formula">resistance = 8 × length × viscosity ÷ (π × radius⁴)</div>
<p>Put that back into the flow equation and you get the version the exam loves:</p>
<div class="formula">flow = pressure gradient × π × radius⁴ ÷ (8 × length × viscosity)</div>
<p>Poiseuille's equation assumes steady laminar flow of a Newtonian fluid through a rigid cylindrical tube. Use coherent units: SI inputs produce resistance in Pa·s/m³ and flow in m³/s. The proportional relationships are the intended blood-flow model even though real blood and vessels are not ideal.</p>
<div class="steps"><ol><li>Keeping geometry and viscosity fixed, ΔP doubling from 20 to 40 doubles flow.</li><li>Keeping all else fixed, radius doubling multiplies flow by 2⁴ = 16.</li><li>For R = 8Lη/(πr⁴), doubling length doubles R; doubling radius divides R by 16.</li></ol></div>
<table class="dt"><tr><th>If this goes up…</th><th>Resistance</th><th>Flow</th></tr>
<tr><td>Vessel radius (r⁴!)</td><td>Falls hard</td><td>Rises hard</td></tr>
<tr><td>Vessel length</td><td>Rises</td><td>Falls</td></tr>
<tr><td>Blood viscosity (thicker blood)</td><td>Rises</td><td>Falls</td></tr>
<tr><td>Pressure gradient</td><td>Unchanged</td><td>Rises</td></tr></table>
<div class="callout key">Radius is raised to the <b>fourth power</b> — it beats everything else. Double the radius and flow goes up <b>16×</b>. Halve the radius and flow drops to <b>1/16</b>.</div>
<p>Who controls these? The <b>body</b> does: arterioles dilate and constrict to change radius, and that tiny radius change is the body's flow control knob. Viscosity rises with hematocrit (polycythemia, dehydration) and falls with anemia. Length is essentially fixed in an adult.</p>
<div class="callout tip">Mental picture: a drinking straw versus a garden hose on the same faucet. Slightly wider pipe, wildly more water.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>Two tubes side by side: doubling the radius multiplies volume flow rate by sixteen</title>
<rect x="60" y="60" width="180" height="24" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="60" y="48" fill="currentColor" font-size="16">radius = r</text>
<text x="60" y="110" fill="var(--c1)" font-size="17">flow = 1 unit</text>
<rect x="340" y="46" width="180" height="48" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="340" y="34" fill="currentColor" font-size="16">radius = 2r</text>
<text x="340" y="122" fill="var(--c2)" font-size="17">flow = 16 units</text>
<text x="60" y="176" fill="currentColor" font-size="17">flow ∝ radius to the 4th power</text>
<text x="60" y="206" fill="currentColor" font-size="17">2 × 2 × 2 × 2 = 16</text>
</svg>`,
          caption: "Radius to the fourth: a vessel twice as wide carries sixteen times the flow at the same gradient."
        }
      ],
      sayIt: "Say out loud: write the flow equation, then Poiseuille's law, then say what happens to flow if a vessel's radius is cut in half.",
      keyPoints: [
        "Flow = pressure gradient ÷ resistance (mL/min)",
        "Resistance = 8 × length × viscosity ÷ (π × radius⁴)",
        "Flow ∝ ΔP × r⁴ ÷ (length × viscosity)",
        "Radius is the dominant factor — fourth power",
        "Double radius → 16× flow; half radius → 1/16 flow",
        "Body controls radius (arterioles); viscosity rises with hematocrit"
      ]
    },

    {
      id: "u11-l3",
      title: "Flow over time: steady, pulsatile, phasic",
      objectives: ["u11-o4"],
      html: `<p class="lead">Ask the question "does the speed change as I watch?" and there are three answers.</p>
<p><span class="kw">Steady flow</span>: the velocity is constant — it does not change over time. A garden hose left on is steady. In the body this is essentially a laboratory idea; it is the baseline case all the equations assume.</p>
<p><span class="kw">Pulsatile flow</span>: velocity rises and falls with the <b>cardiac cycle</b>. Every artery in the body has pulsatile flow because the heart is an intermittent pump: a sharp systolic upstroke, then a lower-velocity diastolic tail. Pulsatile flow is the reason arterial spectral tracings look like repeating spikes.</p>
<p><span class="kw">Phasic flow</span>: velocity changes with <b>respiration</b>. This is the signature of normal <b>veins</b>. It is a slower, gentler undulation than the arterial pulse — breathing cycles happen a few times per minute, heartbeats about once a second.</p>
<div class="callout key">Arteries = <b>pulsatile</b> (cardiac). Veins = <b>phasic</b> (respiratory). Constant velocity = <b>steady</b> (textbook only).</div>
<p>Why you care clinically: a leg vein that has lost its phasicity — a flat, continuous, "monophasic" venous signal — suggests an obstruction upstream between that vein and the heart. A normal vein should sound like the tide going in and out when you listen to it.</p>
<div class="callout warn">Do not confuse respiratory phasicity with cardiac pulsatility. Central veins such as jugular and hepatic veins normally show cardiac pulsations; marked pulsatility in a peripheral leg vein may reflect transmitted right-heart pressure.</div>
<p>Nothing here is operator-controlled: the patient's heart and lungs generate these patterns. Your job is to record them without distorting them — which is why wall filter and sweep speed settings in the Doppler unit matter so much.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Three tracings stacked: a flat steady line, a repeating arterial pulsatile waveform, and a slow undulating venous phasic waveform</title>
<text x="16" y="34" fill="currentColor" font-size="16">steady</text>
<line x1="120" y1="34" x2="580" y2="34" stroke="var(--c1)" stroke-width="3"/>
<text x="16" y="128" fill="currentColor" font-size="16">pulsatile</text>
<polyline points="120,140 150,80 170,132 200,136 230,140 260,80 280,132 310,136 340,140 370,80 390,132 420,136 450,140 480,80 500,132 530,136 560,140" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="360" y="72" fill="var(--c2)" font-size="16">cardiac</text>
<text x="16" y="216" fill="currentColor" font-size="16">phasic</text>
<polyline points="120,214 170,198 220,226 270,198 320,226 370,198 420,226 470,198 520,226 570,210" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="360" y="250" fill="var(--c3)" font-size="16">respiratory</text>
</svg>`,
          caption: "Steady never changes; pulsatile follows the heartbeat; phasic follows breathing."
        }
      ],
      sayIt: "Say out loud: name the three flow patterns over time, what drives each one, and which one belongs in a normal leg vein.",
      keyPoints: [
        "Steady = constant velocity over time (idealized)",
        "Pulsatile = varies with the cardiac cycle; normal in arteries",
        "Phasic = varies with respiration; normal in veins",
        "Loss of venous phasicity suggests proximal obstruction",
        "A pulsatile vein suggests right heart problems"
      ]
    },

    {
      id: "u11-l4",
      title: "Flow profiles across the vessel: plug, parabolic, turbulent",
      objectives: ["u11-o5"],
      html: `<p class="lead">Now freeze time and look <i>across</i> the vessel. Is every red cell going the same speed, or not?</p>
<p><span class="kw">Plug flow</span>: every cell in the cross-section moves at the same speed, so the profile is a flat, blunt block — like a cork sliding down a tube. Plug flow appears at the <b>entrance</b> to a vessel, at the entrance to the heart's great vessels, and in large vessels such as the aorta. On a spectrum it gives a thin, narrow band, because almost all cells share one velocity.</p>
<p><span class="kw">Laminar flow</span> means orderly layers and can be plug-like or parabolic. A fully developed steady laminar profile in an ideal tube is parabolic: center velocity is about twice the average. A small central Doppler gate may show a clear window, while a large or wall-adjacent gate can broaden the spectrum even in laminar flow.</p>
<p><span class="kw">Turbulent flow</span> has disordered velocities and may produce spectral broadening, an audible bruit or a palpable thrill. None is guaranteed in every case, and spectral broadening alone does not prove turbulence because gate size, gain and transit-time effects can mimic it.</p>
<div class="callout key">Plug = flat profile, narrow spectrum. Laminar = parabolic, center 2× average, clear spectral window. Turbulent = chaotic, bruit, spectral broadening.</div>
<div class="callout tip">Mental picture: marching band (plug), a river where the middle runs fastest (laminar), whitewater rapids (turbulent).</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Three vessel segments showing a flat plug profile, a bullet-shaped parabolic profile, and a chaotic turbulent profile</title>
<text x="20" y="28" fill="currentColor" font-size="16">plug</text>
<rect x="20" y="40" width="160" height="110" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="40" y1="56" x2="130" y2="56" stroke="var(--c1)" stroke-width="3"/>
<line x1="40" y1="80" x2="130" y2="80" stroke="var(--c1)" stroke-width="3"/>
<line x1="40" y1="106" x2="130" y2="106" stroke="var(--c1)" stroke-width="3"/>
<line x1="40" y1="132" x2="130" y2="132" stroke="var(--c1)" stroke-width="3"/>
<line x1="132" y1="50" x2="132" y2="138" stroke="var(--c1)" stroke-width="3"/>
<text x="220" y="28" fill="currentColor" font-size="16">laminar</text>
<rect x="215" y="40" width="160" height="110" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="230" y1="56" x2="270" y2="56" stroke="var(--c3)" stroke-width="3"/>
<line x1="230" y1="80" x2="330" y2="80" stroke="var(--c3)" stroke-width="3"/>
<line x1="230" y1="106" x2="330" y2="106" stroke="var(--c3)" stroke-width="3"/>
<line x1="230" y1="132" x2="270" y2="132" stroke="var(--c3)" stroke-width="3"/>
<path d="M270 50 Q342 93 270 138" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="415" y="28" fill="currentColor" font-size="16">turbulent</text>
<rect x="410" y="40" width="170" height="110" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="425,60 460,50 445,80 490,68 465,100 515,86 480,120 540,104" fill="none" stroke="var(--c2)" stroke-width="3"/>
<polyline points="430,130 470,140 505,124 545,136" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="20" y="182" fill="currentColor" font-size="16">all same speed</text>
<text x="215" y="182" fill="currentColor" font-size="16">center ≈ 2 × average</text>
<text x="410" y="182" fill="currentColor" font-size="16">chaotic, bruit</text>
<text x="20" y="218" fill="currentColor" font-size="16">narrow spectrum</text>
<text x="215" y="218" fill="currentColor" font-size="16">clear window</text>
<text x="410" y="218" fill="currentColor" font-size="16">spectral broadening</text>
</svg>`,
          caption: "Arrow length = speed. Flat block, bullet, or chaos — and each one has its own spectral signature."
        }
      ],
      sayIt: "Say out loud: draw the three flow profiles in the air, say where each occurs, and say what each looks like on a spectral tracing.",
      keyPoints: [
        "Plug = uniform velocity across the vessel; entrance regions and large vessels",
        "Plug spectrum = thin narrow band",
        "Laminar/parabolic = fastest in the center, slowest at the walls",
        "Parabolic peak velocity ≈ 2 × average velocity",
        "Laminar spectrum = clear window under the waveform",
        "Turbulent = chaotic multi-directional flow, bruit, spectral broadening"
      ]
    },

    {
      id: "u11-l5",
      title: "Reynolds number: when does flow go rowdy?",
      objectives: ["u11-o6"],
      html: `<p class="lead">Reynolds number is a single unitless score that predicts whether flow will stay polite or break into turbulence.</p>
<div class="formula">Reynolds number = density × velocity × diameter ÷ viscosity</div>
<p>Everything in that fraction is a property of the blood or the vessel. <b>Velocity</b> and <b>diameter</b> in the numerator push the score up; <b>viscosity</b> in the denominator pushes it down (thick, syrupy blood resists breaking into eddies). Density is nearly constant in blood.</p>
<table class="dt"><tr><th>Reynolds number</th><th>Flow</th></tr>
<tr><td>Below 1,500</td><td>Laminar</td></tr>
<tr><td>1,500 – 2,000</td><td>Transitional / unstable</td></tr>
<tr><td>Above 2,000</td><td>Turbulent</td></tr></table>
<div class="callout key">The magic number is <b>2,000</b>. Reynolds number greater than 2,000 → turbulence. It has <b>no units</b> — it is a pure ratio.</div>
<p>Clinical reading of that equation: turbulence appears where velocity spikes. That is exactly what happens just beyond a stenosis, which is why the classic finding is not turbulence <i>in</i> the narrowing but turbulence <b>distal</b> to it. Anemia also raises Reynolds number, because thinned blood has lower viscosity — which is why high-output anemic patients can develop flow murmurs in normal vessels.</p>
<div class="callout warn">Exam trap: increasing viscosity does <b>not</b> increase turbulence. Higher viscosity <i>lowers</i> Reynolds number and makes flow more laminar (while also increasing resistance and reducing flow — two separate effects, don't blur them).</div>
<div class="callout tip">The familiar Re ≈ 2,000 transition is an idealized tube heuristic. Geometry, pulsatility, entrance effects and vessel disease shift the transition in vivo.</div>
<div class="steps"><ol><li>Re = ρvD/η: with coherent values ρ=1,060, v=0.5, D=0.01 and η=0.004, Re=1,325.</li><li>If velocity doubles with everything else fixed, Re doubles to 2,650.</li><li>Peak velocity 80 cm/s in a fully developed parabola implies mean velocity ≈ 40 cm/s.</li></ol></div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 220" role="img"><title>A number line showing laminar flow below 1500, a transitional band from 1500 to 2000, and turbulent flow above 2000</title>
<line x1="40" y1="120" x2="560" y2="120" stroke="currentColor" stroke-width="2"/>
<line x1="280" y1="108" x2="280" y2="132" stroke="currentColor" stroke-width="2"/>
<line x1="380" y1="108" x2="380" y2="132" stroke="currentColor" stroke-width="2"/>
<text x="238" y="156" fill="currentColor" font-size="16">1500</text>
<text x="344" y="156" fill="currentColor" font-size="16">2000</text>
<text x="70" y="100" fill="var(--c3)" font-size="17">laminar</text>
<text x="272" y="192" fill="var(--c4)" font-size="16">transitional</text>
<text x="436" y="100" fill="var(--c2)" font-size="17">TURBULENT</text>
<polyline points="60,60 110,60 160,60 210,60" fill="none" stroke="var(--c3)" stroke-width="3"/>
<polyline points="410,72 440,52 460,78 490,50 512,76 545,56" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="150" y="30" fill="currentColor" font-size="16">Reynolds number (no units)</text>
</svg>`,
          caption: "One number, one threshold: over 2,000 and the flow goes chaotic."
        }
      ],
      sayIt: "Say out loud: what four things go into Reynolds number, which way each pushes it, and what number means turbulence?",
      keyPoints: [
        "Reynolds number = density × velocity × diameter ÷ viscosity",
        "Unitless — it is a ratio",
        "Greater than 2,000 = turbulent; less than 1,500 = laminar; 1,500–2,000 transitional",
        "↑ velocity or ↑ diameter → ↑ Reynolds → more turbulence",
        "↑ viscosity → ↓ Reynolds → more laminar",
        "Turbulence is audible (bruit) and causes spectral broadening"
      ]
    },

    {
      id: "u11-l6",
      title: "Bernoulli and the stenosis",
      objectives: ["u11-o7", "u11-o1"],
      html: `<p class="lead">Squeeze a hose and the water shoots out faster — but something has to pay for that speed. Bernoulli's principle says the payment comes out of pressure.</p>
<p>In the ideal lossless Bernoulli model, total mechanical energy is conserved. Continuity raises velocity in a narrowing and pressure falls as energy shifts toward motion. Real stenoses dissipate energy through viscosity and turbulence, so pressure recovery downstream is incomplete.</p>
<div class="callout key">At the tightest point of a stenosis: <b>velocity is highest, pressure is lowest</b>. Past the narrowing the vessel widens, velocity falls, pressure partly recovers, and the disorganized jet creates <b>turbulence and spectral broadening distal to the stenosis</b>.</div>
<p>The clinically useful shortcut is the <span class="kw">simplified Bernoulli equation</span>:</p>
<div class="formula">pressure gradient (mmHg) ≈ 4 × velocity² (velocity in m/s)</div>
<p>This shortcut assumes upstream velocity is negligible. When it is not, use ΔP ≈ 4(v₂² − v₁²).</p>
<div class="steps"><ol><li>Continuity: if area falls from 2 cm² to 1 cm² while flow is conserved, velocity doubles.</li><li>With v₂ = 3 m/s and negligible v₁, ΔP = 4×3² = 36 mmHg.</li><li>With v₁ = 1 m/s, ΔP = 4(3²−1²) = 32 mmHg.</li></ol></div>
<p>So a jet of 3 m/s implies 4 × 9 = <b>36 mmHg</b>; a jet of 5 m/s implies 4 × 25 = <b>100 mmHg</b>. Note how brutally the gradient grows: velocity is squared, so a little more speed means a lot more gradient. Get the units right — the 4 only works with velocity in <b>m/s</b>, and the answer comes out in <b>mmHg</b>.</p>
<div class="callout warn">Common mistake: thinking pressure is highest at the narrowest point because "it is being squeezed." It is the opposite. The squeeze converts pressure energy into speed, so the tightest spot has the <i>lowest</i> pressure.</div>
<div class="callout tip">Whisper it while you draw: "narrow, fast, low — then messy."</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>A vessel with a narrowing: velocity rises and pressure falls inside the narrowing, with turbulence beyond it</title>
<polyline points="30,70 200,70 250,100 310,100 360,70 570,70" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="30,180 200,180 250,150 310,150 360,180 570,180" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="60" y1="125" x2="150" y2="125" stroke="var(--c1)" stroke-width="3"/>
<polyline points="138,116 156,125 138,134" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="252" y1="125" x2="330" y2="125" stroke="var(--c2)" stroke-width="5"/>
<polyline points="318,112 342,125 318,138" fill="none" stroke="var(--c2)" stroke-width="5"/>
<polyline points="400,110 430,128 410,146 450,120 470,146 500,116 520,142 550,122" fill="none" stroke="var(--c4)" stroke-width="3"/>
<text x="46" y="46" fill="currentColor" font-size="16">normal V, normal P</text>
<text x="222" y="46" fill="var(--c2)" font-size="16">V highest</text>
<text x="222" y="228" fill="var(--c2)" font-size="16">P lowest</text>
<text x="410" y="46" fill="var(--c4)" font-size="16">turbulence</text>
<text x="380" y="228" fill="currentColor" font-size="16">ΔP ≈ 4 × V²  (mmHg)</text>
</svg>`,
          caption: "Tightest point: fastest flow, lowest pressure. Just past it: a disorganized, turbulent jet."
        }
      ],
      sayIt: "Say out loud: at a stenosis, what happens to velocity, to pressure, and to the flow pattern just downstream — and what is the simplified Bernoulli equation?",
      keyPoints: [
        "Total energy is conserved: pressure + kinetic + potential",
        "Continuity: smaller area → higher velocity for the same volume flow",
        "At the tightest point: velocity maximum, pressure minimum",
        "Distal to the stenosis: turbulence, spectral broadening, bruit",
        "Simplified Bernoulli: ΔP (mmHg) ≈ 4 × v² with v in m/s",
        "3 m/s → 36 mmHg; 4 m/s → 64 mmHg; 5 m/s → 100 mmHg"
      ]
    },

    {
      id: "u11-l7",
      title: "Venous flow and breathing",
      objectives: ["u11-o8"],
      html: `<p class="lead">Veins are low-pressure floppy tubes, so anything that squeezes them changes their flow — and the biggest squeezer is the diaphragm.</p>
<p>When you <b>inhale</b>, the diaphragm drops. That raises pressure inside the <b>abdomen</b> and lowers pressure inside the <b>chest</b>. Those two changes pull in opposite directions depending on which limb you are scanning:</p>
<table class="dt"><tr><th>During inspiration</th><th>Leg veins</th><th>Arm / neck veins</th></tr>
<tr><td>Local pressure change</td><td>↑ abdominal pressure</td><td>↓ thoracic pressure</td></tr>
<tr><td>Venous return</td><td><b>Decreases</b> (may briefly stop)</td><td><b>Increases</b></td></tr></table>
<p>Expiration reverses both. That back-and-forth is the <span class="kw">phasicity</span> you hear as a wind-like rise and fall in a normal venous Doppler signal.</p>
<p><span class="kw">Valsalva</span> — bearing down against a closed glottis — jams intra-abdominal and intrathoracic pressure up together and <b>stops venous return from the legs</b>. That is exactly why it is used as a test: a competent valve holds and flow simply ceases; an incompetent valve lets blood wash backward (reflux) toward the feet.</p>
<div class="callout key">Inspiration: <b>leg venous flow decreases, arm venous flow increases</b>. Valsalva: leg venous flow <b>stops</b> (or reverses if valves are incompetent).</div>
<div class="callout warn">A continuous, non-phasic ("monophasic") venous signal in the leg is abnormal — it suggests obstruction somewhere between the probe and the heart. Beware: an over-aggressive wall filter can also erase slow venous flow and fake this.</div>
<p>Other pumps that move venous blood: calf muscle contraction (the "peripheral heart"), one-way venous valves, and the residual push left over from the arterial side.</p>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 250" role="img"><title>Venous flow tracing rising and falling with breathing, decreasing in the leg during inspiration</title>
<line x1="60" y1="150" x2="580" y2="150" stroke="var(--muted)" stroke-width="2"/>
<polyline points="60,120 110,118 140,146 190,148 220,116 270,118 300,146 350,148 380,116 430,118 460,146 510,148 540,118 580,120" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="14" y="112" fill="currentColor" font-size="16">leg</text>
<text x="14" y="156" fill="currentColor" font-size="16">vein</text>
<text x="78" y="96" fill="currentColor" font-size="16">EXP</text>
<text x="146" y="96" fill="currentColor" font-size="16">INSP</text>
<text x="238" y="96" fill="currentColor" font-size="16">EXP</text>
<text x="306" y="96" fill="currentColor" font-size="16">INSP</text>
<text x="60" y="196" fill="currentColor" font-size="16">inspiration → ↑ abdominal pressure → leg return ↓</text>
<text x="60" y="226" fill="currentColor" font-size="16">inspiration → ↓ chest pressure → arm return ↑</text>
<text x="60" y="48" fill="var(--c1)" font-size="17">normal venous phasicity</text>
</svg>`,
          caption: "A normal vein breathes: flow drops in the leg on inspiration and picks back up on expiration."
        }
      ],
      sayIt: "Say out loud: during inspiration, what happens to venous flow in the leg, and what happens in the arm — and why are they opposite?",
      keyPoints: [
        "Normal venous flow is phasic with respiration",
        "Inspiration: diaphragm down → ↑ abdominal pressure → ↓ leg venous return",
        "Inspiration: ↓ thoracic pressure → ↑ arm and neck venous return",
        "Valsalva stops leg venous return; reflux means incompetent valves",
        "Loss of phasicity (continuous signal) suggests proximal obstruction",
        "Calf muscle pump and one-way valves also move venous blood"
      ]
    },

    {
      id: "u11-l8",
      title: "Hydrostatic pressure: standing versus lying",
      objectives: ["u11-o8"],
      html: `<p class="lead">Blood has weight. Stand up and that weight adds pressure below the heart and subtracts it above.</p>
<p><span class="kw">Hydrostatic pressure</span> is the pressure created by a column of blood, measured relative to the <b>heart</b>. Lying flat, nearly the whole body sits at heart level, so hydrostatic pressure is about <b>zero</b> everywhere. Stand up and a column of blood now hangs from heart to feet.</p>
<div class="formula">hydrostatic pressure ≈ density × gravity × vertical height</div>
<p>The common 0.735 mmHg/cm classroom shortcut is for water. Blood's density gives about <b>0.78 mmHg/cm</b>, or <b>23.4 mmHg per 30 cm</b>. Either estimate puts a 130 cm heart-to-ankle column near +100 mmHg; always state which approximation the question supplies.</p>
<div class="steps"><ol><li>Using the blood estimate: 0.78 × 30 cm = 23.4 mmHg.</li><li>Using a stated water/course coefficient: 0.735 × 30 = 22.05 mmHg.</li><li>Height above the heart takes a negative sign.</li></ol></div>
<table class="dt"><tr><th>Site, standing</th><th>Hydrostatic contribution</th></tr>
<tr><td>Head (≈ 45 cm above heart)</td><td>about −33 mmHg</td></tr>
<tr><td>Heart</td><td>0 mmHg (the reference)</td></tr>
<tr><td>Ankle (≈ 135 cm below heart)</td><td>about +100 mmHg</td></tr></table>
<div class="callout key">Hydrostatic pressure is <b>0 at heart level</b>, <b>positive below</b>, <b>negative above</b>. Roughly <b>0.735 mmHg per cm</b>, or <b>22 mmHg per 30 cm</b>.</div>
<p>This adds to <i>both</i> arteries and veins equally, so it does not by itself create a gradient or drive flow — but veins have thin walls, so the extra pressure distends them, pools blood, and (with failing valves) produces varicosities and ankle swelling. It is also why you raise the leg to empty a vein and why neck veins collapse when a patient sits up.</p>
<div class="callout tip">Practical: position matters. Scan a patient's legs in reverse Trendelenburg (feet down) and the veins fill; head-down and they empty.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 280" role="img"><title>A standing figure showing negative hydrostatic pressure at the head, zero at the heart and about plus one hundred at the ankle, next to a lying figure at zero throughout</title>
<line x1="120" y1="40" x2="120" y2="240" stroke="currentColor" stroke-width="2"/>
<line x1="108" y1="110" x2="132" y2="110" stroke="currentColor" stroke-width="2"/>
<text x="150" y="48" fill="var(--c1)" font-size="16">head ≈ −33 mmHg</text>
<text x="150" y="116" fill="currentColor" font-size="16">heart = 0 mmHg</text>
<text x="150" y="242" fill="var(--c2)" font-size="16">ankle ≈ +100 mmHg</text>
<text x="66" y="272" fill="currentColor" font-size="16">STANDING</text>
<line x1="380" y1="150" x2="570" y2="150" stroke="currentColor" stroke-width="2"/>
<line x1="450" y1="138" x2="450" y2="162" stroke="currentColor" stroke-width="2"/>
<text x="378" y="126" fill="currentColor" font-size="16">all ≈ 0 mmHg</text>
<text x="400" y="272" fill="currentColor" font-size="16">LYING DOWN</text>
<text x="300" y="206" fill="currentColor" font-size="16">0.735 mmHg per cm</text>
</svg>`,
          caption: "Zero at the heart, positive below it, negative above it — and essentially zero everywhere when lying flat."
        }
      ],
      sayIt: "Say out loud: where is hydrostatic pressure zero, what is it at the ankle when standing, and how many mmHg per 30 cm?",
      keyPoints: [
        "Hydrostatic pressure is measured relative to the heart",
        "Lying flat: about 0 mmHg throughout the body",
        "Standing: positive below the heart, negative above it",
        "About 0.735 mmHg per cm, or about 22 mmHg per 30 cm",
        "Ankle standing ≈ +100 mmHg; head ≈ −30 to −40 mmHg",
        "Adds equally to arteries and veins — distends thin-walled veins, does not drive flow"
      ]
    },

    {
      id: "u11-l9",
      title: "High- and low-resistance beds, exercise, and disease",
      objectives: ["u11-o9", "u11-o2"],
      html: `<p class="lead">An artery's waveform is a report card on the organ downstream of it. Read the diastole.</p>
<p><span class="kw">High-resistance</span> beds squeeze their arterioles shut between beats, so almost nothing flows in diastole. The classic tracing is <b>triphasic</b>: a tall sharp systolic peak, a brief <b>reverse flow</b> notch in early diastole (blood bouncing off the closed-down bed), then a small late forward blip. Examples: a limb artery <b>at rest</b>, and the external carotid artery.</p>
<p><span class="kw">Low-resistance</span> beds keep their vessels open because their organs need blood all the time. Their tracing shows <b>continuous forward flow throughout diastole</b>, with a broad rounded systolic peak. Examples: internal carotid (brain), renal artery (kidney), hepatic artery (liver), and the placenta.</p>
<table class="dt"><tr><th></th><th>High resistance</th><th>Low resistance</th></tr>
<tr><td>Diastolic flow</td><td>Little, none, or reversed</td><td>Continuous forward</td></tr>
<tr><td>Shape</td><td>Sharp, triphasic</td><td>Broad, monophasic forward</td></tr>
<tr><td>Examples</td><td>Resting limb artery, ECA</td><td>ICA, renal, hepatic, placenta</td></tr></table>
<div class="callout key"><b>Forward flow all through diastole = low resistance.</b> Reverse component in early diastole = high resistance.</div>
<p><span class="kw-2">Exercise</span> flips a limb artery from one column to the other. Working muscle dilates its arterioles, <b>resistance falls</b>, and the same driving gradient now produces much more flow (flow = ΔP ÷ resistance). The reverse-flow notch disappears and diastolic forward flow appears — the resting triphasic signal becomes a low-resistance, monophasic one.</p>
<div class="callout warn">Disease does something similar but for a bad reason: a tight proximal stenosis leaves a dampened, low-amplitude, slowly rising <span class="kw-2">tardus parvus</span> waveform downstream, and the bed dilates to compensate. Same "monophasic" look, very different story — check the upstream vessel.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>A triphasic high-resistance waveform with a reverse notch beside a low-resistance waveform with continuous forward diastolic flow</title>
<line x1="20" y1="120" x2="280" y2="120" stroke="var(--muted)" stroke-width="2"/>
<polyline points="20,120 50,120 62,48 78,120 92,146 108,118 124,110 150,120 180,120 192,48 208,120 222,146 238,118 254,110 278,120" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="22" y="34" fill="currentColor" font-size="16">HIGH resistance</text>
<text x="86" y="176" fill="var(--c2)" font-size="16">reverse notch</text>
<text x="22" y="212" fill="currentColor" font-size="16">limb at rest, ECA</text>
<line x1="320" y1="120" x2="580" y2="120" stroke="var(--muted)" stroke-width="2"/>
<polyline points="320,120 340,60 360,74 380,88 400,96 420,102 440,105 452,60 472,74 492,88 512,96 532,102 556,105 580,106" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="322" y="34" fill="currentColor" font-size="16">LOW resistance</text>
<text x="386" y="146" fill="var(--c3)" font-size="16">forward all diastole</text>
<text x="322" y="212" fill="currentColor" font-size="16">ICA, renal, liver, placenta</text>
</svg>`,
          caption: "Diastole tells you the story: a dip below baseline means high resistance, steady forward flow means low resistance."
        }
      ],
      sayIt: "Say out loud: name three low-resistance beds, describe a triphasic waveform, and say what exercise does to a resting leg artery's waveform and why.",
      keyPoints: [
        "High resistance: triphasic, reverse flow in early diastole, little diastolic flow",
        "High-resistance examples: resting limb arteries, external carotid",
        "Low resistance: continuous forward diastolic flow, broad peak",
        "Low-resistance examples: internal carotid, renal, hepatic, placenta",
        "Exercise dilates muscle arterioles → resistance ↓ → flow ↑, waveform becomes low-resistance",
        "Tardus parvus (slow rise, low peak) downstream of a tight proximal stenosis"
      ]
    }
  ],

  mnemonics: [
    { saying: "Blood is lazy — it only rolls downhill.", meaning: "Flow always runs from high energy/pressure to low energy/pressure, and stops the moment the gradient is gone.", lesson: "u11-l1" },
    { saying: "Poiseuille's Fourth of July: radius gets the fireworks, everything else gets a sparkler.", meaning: "Radius is raised to the 4th power, so it dominates resistance and flow; length and viscosity are only first power.", lesson: "u11-l2" },
    { saying: "Heart beats = pulsatile, lungs breathe = phasic.", meaning: "Pulsatile flow varies with the cardiac cycle (arteries); phasic flow varies with respiration (veins).", lesson: "u11-l3" },
    { saying: "Plug is a cork, laminar is a bullet, turbulent is whitewater.", meaning: "Plug = flat uniform profile, laminar = fastest in the center (2× average), turbulent = chaotic with spectral broadening.", lesson: "u11-l4" },
    { saying: "Two thousand is the turbulence toll booth.", meaning: "Reynolds number above 2,000 means turbulent flow; below 1,500 is laminar, and 1,500–2,000 is the transitional zone.", lesson: "u11-l5" },
    { saying: "Squeeze the hose: narrow, fast, low — then messy.", meaning: "In a stenosis the lumen narrows, velocity rises, pressure drops, and turbulence appears just distal to it.", lesson: "u11-l6" },
    { saying: "Four V-squared is all you need.", meaning: "Simplified Bernoulli: pressure gradient in mmHg ≈ 4 × velocity² with velocity in m/s.", lesson: "u11-l6" },
    { saying: "Breathe in: legs stop, arms go.", meaning: "Inspiration raises abdominal pressure (leg venous return falls) and lowers thoracic pressure (arm and neck venous return rises).", lesson: "u11-l7" },
    { saying: "Ankles at a hundred, head in the red.", meaning: "Standing, hydrostatic pressure is about +100 mmHg at the ankle and negative (about −30 to −40 mmHg) at the head; zero at the heart.", lesson: "u11-l8" },
    { saying: "Low resistance loves diastole.", meaning: "Low-resistance beds (brain, kidney, liver, placenta) show continuous forward flow throughout diastole; high-resistance beds reverse in early diastole.", lesson: "u11-l9" }
  ],

  formulas: [
    { name: "Volume flow rate", expr: "flow = pressure gradient ÷ resistance", units: "mL/min (or cm³/s)", note: "Directly proportional to ΔP, inversely proportional to resistance." },
    { name: "Pressure gradient", expr: "ΔP = P(upstream) − P(downstream)", units: "mmHg", note: "No gradient = no flow, regardless of absolute pressure." },
    { name: "Poiseuille resistance", expr: "R = 8 × length × viscosity ÷ (π × radius⁴)", units: "Pa·s/m³ with coherent SI inputs", note: "Ideal steady laminar Newtonian flow in a rigid cylindrical tube." },
    { name: "Poiseuille flow", expr: "flow = ΔP × π × radius⁴ ÷ (8 × length × viscosity)", units: "m³/s with coherent SI inputs", note: "Use chiefly for proportional reasoning in blood." },
    { name: "Continuity (conservation of flow)", expr: "area₁ × velocity₁ = area₂ × velocity₂", units: "cm³/s", note: "Same volume per second must pass every cross-section; smaller area → higher velocity." },
    { name: "Reynolds number", expr: "Re = density × velocity × diameter ÷ viscosity", units: "none (unitless)", note: "Above 2,000 → turbulent; below 1,500 → laminar." },
    { name: "Simplified Bernoulli", expr: "ΔP (mmHg) ≈ 4 × velocity²", units: "mmHg (velocity in m/s)", note: "3 m/s → 36 mmHg; 4 m/s → 64 mmHg; 5 m/s → 100 mmHg." },
    { name: "Total energy (Bernoulli)", expr: "total energy = pressure energy + kinetic energy + potential energy", units: "conserved", note: "Velocity up at a stenosis means pressure down." },
    { name: "Hydrostatic pressure", expr: "P = ρgh; blood ≈ 0.78 mmHg/cm", units: "mmHg", note: "0.735 mmHg/cm is the water/course approximation; state the convention." },
    { name: "Parabolic peak velocity", expr: "peak (center) velocity ≈ 2 × average velocity", units: "cm/s", note: "Only true for fully developed laminar/parabolic flow." }
  ],

  keyNumbers: [
    { fact: "Reynolds number threshold for turbulence", value: "greater than 2,000" },
    { fact: "Reynolds number for reliably laminar flow", value: "less than 1,500 (1,500–2,000 transitional)" },
    { fact: "Hydrostatic pressure per centimeter below the heart", value: "≈ 0.735 mmHg/cm" },
    { fact: "Hydrostatic pressure per 30 cm (about a foot)", value: "≈ 22 mmHg" },
    { fact: "Hydrostatic pressure at the ankle while standing", value: "≈ +100 mmHg" },
    { fact: "Hydrostatic pressure at the head while standing", value: "≈ −30 to −40 mmHg (negative)" },
    { fact: "Hydrostatic pressure lying flat", value: "≈ 0 mmHg everywhere (heart is the reference)" },
    { fact: "Center velocity in parabolic flow", value: "≈ 2 × the average velocity" },
    { fact: "Effect of doubling vessel radius on flow", value: "16× increase (2⁴)" },
    { fact: "Effect of halving vessel radius on flow", value: "flow drops to 1/16" },
    { fact: "Simplified Bernoulli gradient at 3 m/s", value: "≈ 36 mmHg" },
    { fact: "Simplified Bernoulli gradient at 5 m/s", value: "≈ 100 mmHg" },
    { fact: "Typical adult systemic pressures", value: "≈ 120/80 mmHg, mean ≈ 93 mmHg" }
  ],

  flashcards: [
    { front: "What must exist for blood to flow?", back: "An energy (pressure) gradient — flow runs high to low", lesson: "u11-l1" },
    { front: "Pressure gradient", back: "Difference in pressure between two points, in mmHg; ΔP = upstream − downstream", lesson: "u11-l1" },
    { front: "Three forms of energy in a vessel", back: "Pressure energy, kinetic energy (motion), potential energy (height)", lesson: "u11-l1" },
    { front: "Volume flow rate equation", back: "Flow = pressure gradient ÷ resistance (mL/min)", lesson: "u11-l2" },
    { front: "Flow = ΔP ÷ R — which relationship is inverse?", back: "Flow and resistance (gradient and flow are direct)", lesson: "u11-l2" },
    { front: "Poiseuille's law (resistance form)", back: "R = 8 × length × viscosity ÷ (π × radius⁴)", lesson: "u11-l2" },
    { front: "Which factor dominates resistance?", back: "Radius — it is raised to the 4th power", lesson: "u11-l2" },
    { front: "Double the vessel radius: flow does what?", back: "Increases 16 times (2⁴)", lesson: "u11-l2" },
    { front: "Halve the vessel radius: flow does what?", back: "Drops to 1/16 of the original", lesson: "u11-l2" },
    { front: "Effect of increased viscosity on flow", back: "Resistance rises, flow falls (and Reynolds number falls)", lesson: "u11-l2" },
    { front: "Steady flow", back: "Velocity does not change over time — idealized, not real in the body", lesson: "u11-l3" },
    { front: "Pulsatile flow", back: "Velocity varies with the cardiac cycle; normal arterial flow", lesson: "u11-l3" },
    { front: "Phasic flow", back: "Velocity varies with respiration; normal venous flow", lesson: "u11-l3" },
    { front: "Continuous, non-phasic venous signal means…", back: "Possible obstruction proximal to the probe (or too much wall filter)", lesson: "u11-l3" },
    { front: "Plug flow", back: "All cells move at the same velocity — flat profile; vessel entrances and large vessels", lesson: "u11-l4" },
    { front: "Laminar (parabolic) flow", back: "Smooth layers; fastest in the center, slowest at the wall; normal in most vessels", lesson: "u11-l4" },
    { front: "Peak velocity in parabolic flow", back: "About 2 × the average velocity", lesson: "u11-l4" },
    { front: "Turbulent flow", back: "Chaotic multidirectional flow; bruit, thrill, spectral broadening", lesson: "u11-l4" },
    { front: "Spectral appearance of laminar flow", back: "A clear window under the waveform (narrow band of velocities)", lesson: "u11-l4" },
    { front: "Reynolds number equation", back: "Re = density × velocity × diameter ÷ viscosity (unitless)", lesson: "u11-l5" },
    { front: "Reynolds number that means turbulence", back: "Greater than 2,000", lesson: "u11-l5" },
    { front: "Two changes that raise Reynolds number", back: "Higher velocity, larger diameter (lower viscosity also raises it)", lesson: "u11-l5" },
    { front: "Bruit", back: "Audible sound made by turbulent flow (felt as a thrill)", lesson: "u11-l5" },
    { front: "Bernoulli at the tightest part of a stenosis", back: "Velocity is highest, pressure is lowest", lesson: "u11-l6" },
    { front: "Where is turbulence found around a stenosis?", back: "Just distal (downstream) to the narrowing", lesson: "u11-l6" },
    { front: "Simplified Bernoulli equation", back: "Pressure gradient (mmHg) ≈ 4 × velocity², velocity in m/s", lesson: "u11-l6" },
    { front: "Jet velocity 4 m/s — estimated gradient?", back: "4 × 16 = 64 mmHg", lesson: "u11-l6" },
    { front: "Continuity equation", back: "Area × velocity is constant; smaller area → higher velocity", lesson: "u11-l6" },
    { front: "Inspiration: leg venous flow", back: "Decreases (↑ intra-abdominal pressure)", lesson: "u11-l7" },
    { front: "Inspiration: arm / neck venous flow", back: "Increases (↓ intrathoracic pressure)", lesson: "u11-l7" },
    { front: "Valsalva effect on leg venous flow", back: "Stops it; reversal means incompetent valves (reflux)", lesson: "u11-l7" },
    { front: "Two pumps that move venous blood back to the heart", back: "Calf muscle pump and one-way venous valves (plus respiration)", lesson: "u11-l7" },
    { front: "Hydrostatic pressure reference point", back: "The heart — 0 mmHg there", lesson: "u11-l8" },
    { front: "Hydrostatic pressure per cm below the heart", back: "≈ 0.735 mmHg/cm (≈ 22 mmHg per 30 cm)", lesson: "u11-l8" },
    { front: "Hydrostatic pressure at the ankle, standing", back: "≈ +100 mmHg", lesson: "u11-l8" },
    { front: "Hydrostatic pressure at the head, standing", back: "Negative, about −30 to −40 mmHg", lesson: "u11-l8" },
    { front: "Hydrostatic pressure lying flat", back: "About 0 mmHg throughout the body", lesson: "u11-l8" },
    { front: "Triphasic waveform means what kind of bed?", back: "High resistance (reverse flow in early diastole)", lesson: "u11-l9" },
    { front: "Three low-resistance vascular beds", back: "Brain (ICA), kidney, liver (also the placenta)", lesson: "u11-l9" },
    { front: "Key waveform feature of a low-resistance bed", back: "Continuous forward flow throughout diastole", lesson: "u11-l9" },
    { front: "Effect of exercise on peripheral resistance", back: "Resistance falls (arterioles dilate) so flow increases; waveform becomes low-resistance", lesson: "u11-l9" },
    { front: "Tardus parvus", back: "Slow-rising, low-amplitude waveform distal to a tight proximal stenosis", lesson: "u11-l9" }
  ],

  questions: [
    { id: "u11-q1", type: "mc", q: "Blood inside a sealed vessel segment is at 180 mmHg at both ends. What is the flow?", choices: ["Very high, because the pressure is high", "Zero, because there is no pressure gradient", "Moderate, set by the vessel radius", "Reversed, from low to high pressure"], answer: 1, explain: "Flow needs a gradient, not a high absolute pressure. The tempting answer is the first one: 180 mmHg sounds forceful, but with identical pressures at both ends the net driving force is zero and nothing moves.", objectives: ["u11-o1"], lesson: "u11-l1", level: 2 },
    { id: "u11-q2", type: "mc", q: "In which direction does blood flow?", choices: ["From low energy to high energy", "From high energy to low energy", "From small radius to large radius", "From high viscosity to low viscosity"], answer: 1, explain: "Flow runs down the energy gradient, high to low. Radius and viscosity change how much flows, but they do not set direction.", objectives: ["u11-o1"], lesson: "u11-l1", level: 1 },
    { id: "u11-q3", type: "short", q: "Name the three forms of energy that add up to a vessel's total energy (one word each).", answer: "pressure kinetic potential", accept: ["pressure kinetic potential", "pressure, kinetic, potential", "kinetic pressure potential", "pressure kinetic and potential"], explain: "Pressure energy (the heart's push), kinetic energy (motion/velocity), and potential energy (height relative to the heart). Bernoulli's principle is the statement that these three trade off while the total stays constant.", objectives: ["u11-o1"], lesson: "u11-l1", level: 1 },
    { id: "u11-q4", type: "tf", q: "A very high pressure inside a vessel guarantees a high volume flow rate.", answer: false, explain: "False. Only the difference between two points drives flow. A uniformly pressurized closed system has zero flow.", objectives: ["u11-o1", "u11-o2"], lesson: "u11-l1", level: 2 },
    { id: "u11-q5", type: "mc", q: "The pressure gradient across a segment doubles while resistance stays the same. Volume flow rate:", choices: ["Doubles", "Halves", "Quadruples", "Is unchanged"], answer: 0, explain: "Flow = ΔP ÷ R, and ΔP is in the numerator to the first power, so doubling it doubles flow. 'Quadruples' is the trap — the fourth power belongs to radius, not to pressure.", objectives: ["u11-o2"], lesson: "u11-l2", level: 2 },
    { id: "u11-q6", type: "mc", q: "Resistance in a vessel triples while the pressure gradient is unchanged. Volume flow rate becomes:", choices: ["3 times larger", "1/3 of the original", "1/9 of the original", "Unchanged"], answer: 1, explain: "Flow is inversely proportional to resistance: triple the resistance, one-third the flow. 1/9 would require resistance squared, which is not in the equation.", objectives: ["u11-o2"], lesson: "u11-l2", level: 2 },
    { id: "u11-q7", type: "short", q: "Write the volume flow rate equation in words (flow = ?).", answer: "pressure gradient divided by resistance", accept: ["pressure gradient divided by resistance", "pressure gradient / resistance", "delta p / r", "gradient over resistance", "pressure gradient over resistance", "dp/r"], explain: "Flow = pressure gradient ÷ resistance. It is the hemodynamic version of Ohm's law, and nearly every 'what happens if' question in this unit is answered by reading it.", objectives: ["u11-o2"], lesson: "u11-l2", level: 1 },
    { id: "u11-q8", type: "mc", q: "According to Poiseuille's law, which factor has the greatest effect on resistance?", choices: ["Vessel length", "Blood viscosity", "Vessel radius", "Pressure gradient"], answer: 2, explain: "Radius appears to the fourth power, so small radius changes swamp everything else. Pressure gradient is not part of resistance at all — it is the other side of the flow equation.", objectives: ["u11-o3"], lesson: "u11-l2", level: 1 },
    { id: "u11-q9", type: "mc", q: "A vessel's radius is reduced to one-half. With the gradient unchanged, volume flow rate becomes:", choices: ["1/2", "1/4", "1/8", "1/16"], answer: 3, explain: "Flow ∝ r⁴, so (1/2)⁴ = 1/16. The tempting 1/4 comes from thinking about cross-sectional area (r²) instead of Poiseuille flow (r⁴).", objectives: ["u11-o3"], lesson: "u11-l2", level: 3 },
    { id: "u11-q10", type: "tf", q: "Increasing blood viscosity increases resistance and decreases volume flow rate.", answer: true, explain: "True. Viscosity sits in the numerator of the resistance formula, so thicker blood (higher hematocrit, dehydration) means more resistance and less flow at the same gradient.", objectives: ["u11-o3"], lesson: "u11-l2", level: 1 },
    { id: "u11-q11", type: "mc", q: "A vessel is replaced by one of the same radius but twice the length. Resistance and flow:", choices: ["Resistance doubles, flow halves", "Resistance halves, flow doubles", "Resistance rises 16×, flow drops to 1/16", "Both unchanged"], answer: 0, explain: "Length is first power in the numerator of resistance, so doubling length doubles resistance and halves flow. The 16× answer is the radius relationship being misapplied to length.", objectives: ["u11-o3"], lesson: "u11-l2", level: 2 },
    { id: "u11-q12", type: "mc", q: "Which flow pattern is normal in an artery?", choices: ["Steady", "Pulsatile", "Phasic", "Turbulent"], answer: 1, explain: "Arteries receive intermittent ejections from the heart, so their flow is pulsatile. Phasic is the venous pattern (respiration), and steady flow essentially does not occur in the body.", objectives: ["u11-o4"], lesson: "u11-l3", level: 1 },
    { id: "u11-q13", type: "short", q: "What word describes venous flow that varies with respiration?", answer: "phasic", accept: ["phasic", "phasicity", "respiratory phasicity"], explain: "Phasic. It is the normal venous pattern; losing it (a flat, continuous signal) suggests obstruction between the probe and the heart.", objectives: ["u11-o4"], lesson: "u11-l3", level: 1 },
    { id: "u11-q14", type: "tf", q: "Steady flow is the normal pattern in the femoral artery.", answer: false, explain: "False. Steady flow means unchanging velocity, which does not happen downstream of a beating heart. Arterial flow is pulsatile.", objectives: ["u11-o4"], lesson: "u11-l3", level: 1 },
    { id: "u11-q15", type: "mc", q: "A leg vein shows a flat, continuous Doppler signal with no respiratory variation. The most likely meaning is:", choices: ["Normal venous flow", "Obstruction proximal to the sample site", "Turbulence at the sample site", "Incompetent valves only"], answer: 1, explain: "Normal veins are phasic, so a continuous signal suggests something is blocking the path back to the heart. Valve incompetence shows up as reflux on Valsalva, not as loss of phasicity — though an excessive wall filter can imitate this artifactually.", objectives: ["u11-o4", "u11-o8"], lesson: "u11-l3", level: 3 },
    { id: "u11-q16", type: "mc", q: "In fully developed laminar flow, the peak (center) velocity is approximately:", choices: ["Equal to the average velocity", "Half the average velocity", "Twice the average velocity", "Four times the average velocity"], answer: 2, explain: "A parabolic profile has a center velocity about twice the cross-sectional average. 'Equal to average' describes plug flow, where the whole profile is flat.", objectives: ["u11-o5"], lesson: "u11-l4", level: 2 },
    { id: "u11-q17", type: "mc", q: "Which flow profile shows all red cells moving at essentially the same velocity?", choices: ["Plug", "Parabolic", "Laminar", "Turbulent"], answer: 0, explain: "Plug flow is the blunt, uniform profile found at vessel entrances and in large vessels. Parabolic and laminar are the same thing and describe a center-fast profile.", objectives: ["u11-o5"], lesson: "u11-l4", level: 1 },
    { id: "u11-q18", type: "short", q: "What spectral finding is compatible with turbulent flow but can also be caused by gate or gain settings?", answer: "spectral broadening", accept: ["spectral broadening", "broadening", "filled in window", "loss of the spectral window"], explain: "Spectral broadening accompanies a wide velocity distribution, but gate size, placement and gain can imitate it, so it does not prove turbulence alone.", objectives: ["u11-o5"], lesson: "u11-l4", level: 2 },
    { id: "u11-q19", type: "tf", q: "Laminar flow typically produces a clear window under the spectral waveform.", answer: true, explain: "True. In laminar flow the sampled cells share a narrow range of velocities, so the display shows a thin band with an empty space beneath it.", objectives: ["u11-o5"], lesson: "u11-l4", level: 2 },
    { id: "u11-q20", type: "mc", q: "In the idealized straight-tube heuristic, a Reynolds number above about 2,000 predicts an increased tendency toward:", choices: ["Laminar flow", "Plug flow", "Turbulent transition", "No flow"], answer: 2, explain: "About 2,000 is an approximate tube-flow transition, not an exact in-vivo disease classifier; geometry and pulsatility matter.", objectives: ["u11-o6"], lesson: "u11-l5", level: 1 },
    { id: "u11-q21", type: "mc", q: "Which change would most likely convert laminar flow into turbulent flow?", choices: ["A large increase in velocity", "An increase in blood viscosity", "A decrease in vessel diameter with velocity held constant", "An increase in vessel length"], answer: 0, explain: "Velocity is in the numerator of Reynolds number, so a big velocity jump drives it over 2,000. Raising viscosity is the classic trap — viscosity is in the denominator, so it makes flow more laminar, not less.", objectives: ["u11-o6"], lesson: "u11-l5", level: 3 },
    { id: "u11-q22", type: "short", q: "What are the units of Reynolds number?", answer: "none", accept: ["none", "no units", "unitless", "dimensionless", "it has no units"], explain: "Reynolds number is unitless — all the units in density × velocity × diameter ÷ viscosity cancel. It is a pure ratio compared against the 2,000 threshold.", objectives: ["u11-o6"], lesson: "u11-l5", level: 1 },
    { id: "u11-q23", type: "tf", q: "Higher blood viscosity increases Reynolds number and therefore encourages turbulence.", answer: false, explain: "False. Viscosity is in the denominator: thicker blood lowers Reynolds number and keeps flow laminar. (It does raise resistance and lower flow — a different relationship.)", objectives: ["u11-o6", "u11-o3"], lesson: "u11-l5", level: 3 },
    { id: "u11-q24", type: "mc", q: "At the narrowest point of a stenosis, compared with the normal segment upstream:", choices: ["Velocity is higher and pressure is lower", "Velocity is higher and pressure is higher", "Velocity is lower and pressure is higher", "Velocity is lower and pressure is lower"], answer: 0, explain: "Continuity forces velocity up in the smaller area, and Bernoulli says the kinetic energy is paid for out of pressure energy, so pressure drops. The 'higher and higher' answer feels right because the vessel is being squeezed, but energy must be conserved.", objectives: ["u11-o7"], lesson: "u11-l6", level: 2 },
    { id: "u11-q25", type: "mc", q: "A stenotic jet is measured at 3 m/s. Using the simplified Bernoulli equation, the pressure gradient is about:", choices: ["12 mmHg", "36 mmHg", "9 mmHg", "81 mmHg"], answer: 1, explain: "ΔP ≈ 4v² = 4 × 3² = 4 × 9 = 36 mmHg. 12 mmHg comes from forgetting to square (4 × 3), and 9 mmHg from squaring but forgetting the 4.", objectives: ["u11-o7"], lesson: "u11-l6", level: 3 },
    { id: "u11-q26", type: "mc", q: "Where would you expect to find turbulence and spectral broadening around a tight stenosis?", choices: ["Well proximal to the narrowing", "Only inside the narrowing", "Just distal to the narrowing", "Turbulence does not occur at stenoses"], answer: 2, explain: "The high-velocity jet exits into a wider lumen and breaks apart, so the chaotic flow appears immediately downstream. Inside the narrowing the flow is fast but still relatively organized.", objectives: ["u11-o7", "u11-o5"], lesson: "u11-l6", level: 2 },
    { id: "u11-q27", type: "short", q: "In the simplified Bernoulli equation, what units must the velocity be in?", answer: "meters per second", accept: ["meters per second", "m/s", "metres per second", "m per s"], explain: "The 4 in ΔP ≈ 4v² only works with velocity in m/s, and it returns the gradient in mmHg. Plugging in cm/s gives an answer that is off by a factor of 10,000.", objectives: ["u11-o7"], lesson: "u11-l6", level: 2 },
    { id: "u11-q28", type: "tf", q: "During inspiration, venous return from the legs decreases.", answer: true, explain: "True. The diaphragm descends and raises intra-abdominal pressure, compressing the abdominal veins and slowing leg venous return; expiration releases it.", objectives: ["u11-o8"], lesson: "u11-l7", level: 2 },
    { id: "u11-q29", type: "mc", q: "During inspiration, venous flow in the arm:", choices: ["Increases, because thoracic pressure falls", "Decreases, because thoracic pressure falls", "Increases, because abdominal pressure rises", "Is unchanged"], answer: 0, explain: "Chest pressure drops on inspiration, which sucks blood from the arms and neck toward the heart. The abdominal-pressure answer is the leg mechanism applied to the wrong limb.", objectives: ["u11-o8"], lesson: "u11-l7", level: 3 },
    { id: "u11-q30", type: "mc", q: "A Valsalva maneuver is performed during a leg venous exam. In a normal vein with competent valves you expect:", choices: ["Flow to increase sharply", "Flow to stop", "Sustained reversed flow", "No change at all"], answer: 1, explain: "Valsalva raises abdominal and thoracic pressure together, halting venous return from the legs. Sustained reversed flow is the abnormal finding — it means the valves are incompetent (reflux).", objectives: ["u11-o8"], lesson: "u11-l7", level: 2 },
    { id: "u11-q31", type: "mc", q: "A patient stands up. What is the hydrostatic pressure contribution at the level of the heart?", choices: ["About +100 mmHg", "About 0 mmHg", "About −35 mmHg", "About +22 mmHg"], answer: 1, explain: "The heart is the zero reference for hydrostatic pressure. +100 mmHg belongs at the ankle and the negative value belongs at the head.", objectives: ["u11-o8"], lesson: "u11-l8", level: 1 },
    { id: "u11-q32", type: "short", q: "Using the stated course approximation 0.735 mmHg/cm, how much hydrostatic pressure is added per 30 cm?", answer: "22.05 mmHg", accept: ["22.05","22.05 mmhg","22","22 mmhg","about 22"], explain: "0.735×30 = 22.05 mmHg. For blood itself, 0.78 mmHg/cm gives about 23.4 mmHg per 30 cm.", objectives: ["u11-o8"], lesson: "u11-l8", level: 2 },
    { id: "u11-q33", type: "tf", q: "Hydrostatic pressure above the level of the heart is negative when a person is standing.", answer: true, explain: "True. Above the reference point the column of blood is being lifted rather than stacked, so the contribution is negative — roughly −30 to −40 mmHg at the head.", objectives: ["u11-o8"], lesson: "u11-l8", level: 2 },
    { id: "u11-q34", type: "mc", q: "Which vessel normally shows continuous forward flow throughout diastole?", choices: ["Internal carotid artery", "External carotid artery", "Resting popliteal artery", "Resting brachial artery"], answer: 0, explain: "The internal carotid feeds the brain, a low-resistance bed that needs perfusion all the time. The external carotid and resting limb arteries are high-resistance, with little or reversed diastolic flow.", objectives: ["u11-o9"], lesson: "u11-l9", level: 2 },
    { id: "u11-q35", type: "mc", q: "A triphasic waveform with early diastolic flow reversal indicates:", choices: ["A low-resistance distal bed", "A high-resistance distal bed", "Turbulence at the sample site", "An incompetent venous valve"], answer: 1, explain: "The reverse component happens because the constricted downstream bed bounces blood back. Low-resistance beds never show that dip — they hold forward flow all through diastole.", objectives: ["u11-o9"], lesson: "u11-l9", level: 2 },
    { id: "u11-q36", type: "mc", q: "A patient exercises. What happens in the working leg muscles?", choices: ["Resistance rises and flow falls", "Resistance falls and flow rises", "Resistance and flow both fall", "Neither changes; only heart rate changes"], answer: 1, explain: "Exercising muscle dilates its arterioles, so resistance drops and, from flow = ΔP ÷ R, flow increases; the resting triphasic waveform becomes low-resistance with forward diastolic flow. The first choice reverses the physiology.", objectives: ["u11-o9", "u11-o2"], lesson: "u11-l9", level: 3 },
    { id: "u11-q37", type: "short", q: "What is the name of the dampened, slow-rising, low-amplitude waveform found distal to a tight proximal stenosis?", answer: "tardus parvus", accept: ["tardus parvus", "parvus tardus", "tardus-parvus"], explain: "Tardus parvus — 'slow and small.' It looks monophasic like a low-resistance signal, but it comes from disease upstream rather than a naturally low-resistance organ, so always check the proximal vessel.", objectives: ["u11-o9"], lesson: "u11-l9", level: 3 },
    { id: "u11-q38", type: "mc", q: "Which finding is characteristic of turbulent flow?", choices: ["An audible bruit and a palpable thrill", "Complete silence on auscultation", "A clear spectral window", "A Reynolds number below 1,500"], answer: 0, explain: "Turbulence is noisy: chaotic eddies make a bruit you can hear and a thrill you can feel, and they fill in the spectral window. Silence and a clear window both describe laminar flow, and a Reynolds number under 1,500 is by definition laminar.", objectives: ["u11-o6", "u11-o5"], lesson: "u11-l5", level: 2 }
  ],

  drills: [
    {
      id: "u11-d1",
      title: "Reynolds number: laminar, transitional, or turbulent?",
      formula: "Re > 2000 = turbulent; Re < 1500 = laminar",
      lesson: "u11-l5",
      gen: function (rnd) {
        var vals = [400, 750, 1100, 1400, 1600, 1750, 1900, 2300, 2800, 3400, 4200, 5600];
        var re = vals[Math.floor(rnd() * vals.length)];
        var ans = re > 2000 ? 2 : (re >= 1500 ? 1 : 0);
        return {
          kind: "choice",
          given: "Reynolds number in this vessel = " + re,
          ask: "What kind of flow does this predict?",
          choices: ["Laminar", "Transitional", "Turbulent"],
          answer: ans,
          steps: [
            "Below 1500 = laminar, 1500 to 2000 = transitional, above 2000 = turbulent",
            re + " falls in the " + ["laminar", "transitional", "turbulent"][ans] + " range",
            "Remember: 2000 is the turbulence toll booth"
          ]
        };
      }
    },
    {
      id: "u11-d2",
      title: "Poiseuille: which way does flow go?",
      formula: "flow ∝ ΔP × r⁴ ÷ (length × viscosity)",
      lesson: "u11-l2",
      gen: function (rnd) {
        var items = [
          { what: "the vessel radius is doubled", dir: 0, why: "radius is 4th power: 2⁴ = 16× more flow" },
          { what: "the vessel radius is cut in half", dir: 1, why: "radius is 4th power: (1/2)⁴ = 1/16 of the flow" },
          { what: "the vessel length is doubled", dir: 1, why: "length is in the numerator of resistance, so resistance doubles and flow halves" },
          { what: "the vessel length is cut in half", dir: 0, why: "half the length is half the resistance, so flow doubles" },
          { what: "blood viscosity increases (dehydration)", dir: 1, why: "viscosity raises resistance, so flow falls" },
          { what: "blood viscosity decreases (anemia)", dir: 0, why: "thinner blood means less resistance, so flow rises" },
          { what: "the pressure gradient is doubled", dir: 0, why: "flow = ΔP ÷ resistance, so double the gradient is double the flow" },
          { what: "the pressure gradient drops to zero", dir: 1, why: "no gradient means no flow at all" }
        ];
        var it = items[Math.floor(rnd() * items.length)];
        return {
          kind: "choice",
          given: "Everything else is held constant and " + it.what + ".",
          ask: "What happens to volume flow rate?",
          choices: ["Increases", "Decreases", "Stays the same"],
          answer: it.dir,
          steps: [
            "flow = pressure gradient × r⁴ ÷ (8 × length × viscosity ÷ π)",
            it.why,
            "So volume flow rate " + (it.dir === 0 ? "increases" : "decreases")
          ]
        };
      }
    },
    {
      id: "u11-d3",
      title: "Bernoulli at a stenosis",
      formula: "smaller lumen → ↑ velocity, ↓ pressure",
      lesson: "u11-l6",
      gen: function (rnd) {
        var qs = [
          { ask: "What happens to VELOCITY at the narrowest point?", choices: ["Increases", "Decreases", "Unchanged"], a: 0, why: "Same volume per second through a smaller area means the blood must speed up (continuity)." },
          { ask: "What happens to PRESSURE at the narrowest point?", choices: ["Increases", "Decreases", "Unchanged"], a: 1, why: "The extra kinetic energy is paid for out of pressure energy, so pressure is lowest where velocity is highest." },
          { ask: "Where is flow most turbulent?", choices: ["Proximal to the stenosis", "Distal to the stenosis", "Nowhere; flow stays laminar"], a: 1, why: "The jet breaks apart as it exits into the wider lumen just downstream." },
          { ask: "What happens to the Reynolds number inside and just past the narrowing?", choices: ["Rises", "Falls", "Unchanged"], a: 0, why: "Velocity is in the numerator of Reynolds number, so a faster jet raises it — often over 2000." },
          { ask: "What happens to VOLUME FLOW RATE through the whole segment (mild stenosis)?", choices: ["Roughly unchanged", "Increases sharply", "Falls to zero"], a: 0, why: "Volume flow is conserved along the segment — the same mL/min must pass every cross-section; only the velocity changes." }
        ];
        var pct = [50, 60, 70, 80][Math.floor(rnd() * 4)];
        var q = qs[Math.floor(rnd() * qs.length)];
        return {
          kind: "choice",
          given: "An artery has a " + pct + "% diameter stenosis.",
          ask: q.ask,
          choices: q.choices,
          answer: q.a,
          steps: [q.why, "Mental picture: narrow, fast, low pressure — then messy just downstream."]
        };
      }
    },
    {
      id: "u11-d4",
      title: "Simplified Bernoulli pressure gradient",
      formula: "ΔP (mmHg) ≈ 4 × v² (v in m/s)",
      lesson: "u11-l6",
      gen: function (rnd) {
        var v = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6][Math.floor(rnd() * 10)];
        var dp = 4 * v * v;
        return {
          kind: "number",
          given: "Peak jet velocity through a stenosis = " + v + " m/s",
          ask: "Estimate the pressure gradient across the stenosis (mmHg).",
          answer: +dp.toFixed(2),
          unit: "mmHg",
          tol: 0.5,
          steps: [
            "ΔP ≈ 4 × v²",
            "= 4 × " + v + "²",
            "= 4 × " + (v * v).toFixed(2),
            "= " + dp.toFixed(1) + " mmHg"
          ]
        };
      }
    },
    {
      id: "u11-d5",
      title: "Hydrostatic pressure below the heart",
      formula: "P ≈ 0.735 mmHg per cm below the heart",
      lesson: "u11-l8",
      gen: function (rnd) {
        var cm = [20, 30, 40, 50, 60, 80, 100, 120, 135, 140][Math.floor(rnd() * 10)];
        var p = 0.735 * cm;
        return {
          kind: "number",
          given: "A standing patient's sample site is " + cm + " cm below heart level.",
          ask: "What hydrostatic pressure does that column add (mmHg)?",
          answer: +p.toFixed(2),
          unit: "mmHg",
          tol: 1.0,
          steps: [
            "Hydrostatic pressure ≈ 0.735 mmHg for every cm below the heart",
            "= 0.735 × " + cm,
            "= " + p.toFixed(1) + " mmHg (positive, because it is below the heart)"
          ]
        };
      }
    },
    {
      id: "u11-d6",
      title: "Flow from pressure gradient and resistance",
      formula: "flow = pressure gradient ÷ resistance",
      lesson: "u11-l2",
      gen: function (rnd) {
        var dp = [20, 40, 60, 80, 90, 100, 120][Math.floor(rnd() * 7)];
        var r = [0.5, 1, 2, 4, 5][Math.floor(rnd() * 5)];
        var q = dp / r;
        return {
          kind: "number",
          given: "Pressure gradient = " + dp + " mmHg, resistance = " + r + " mmHg per mL/min",
          ask: "What is the volume flow rate (mL/min)?",
          answer: +q.toFixed(2),
          unit: "mL/min",
          tol: 0.5,
          steps: [
            "flow = pressure gradient ÷ resistance",
            "= " + dp + " ÷ " + r,
            "= " + q.toFixed(1) + " mL/min"
          ]
        };
      }
    },
    {
      id: "u11-d9",
      title: "Radius change → flow change factor",
      formula: "flow ∝ radius⁴",
      lesson: "u11-l2",
      gen: function (rnd) {
        var fs = [0.5, 0.75, 1.5, 2, 3, 0.25];
        var f = fs[Math.floor(rnd() * fs.length)];
        var factor = Math.pow(f, 4);
        return {
          kind: "number",
          given: "A vessel's radius changes to " + f + " × its original value; the gradient is unchanged.",
          ask: "Volume flow rate becomes how many times the original?",
          answer: +factor.toFixed(4),
          unit: "× original",
          tol: 0.02,
          steps: [
            "flow is proportional to radius to the 4th power",
            "factor = " + f + "⁴",
            "= " + factor.toFixed(4) + " × the original flow"
          ]
        };
      }
    },
    { id:"u11-d7",title:"Continuity, Reynolds and parabolic mean",formula:"A₁v₁=A₂v₂; Re=ρvD/η; peak≈2mean",lesson:"u11-l5",gen:function(rnd){var mode=Math.floor(rnd()*3);if(mode===0){var a1=[2,3,4][Math.floor(rnd()*3)],a2=[0.5,1,1.5][Math.floor(rnd()*3)],v1=[10,20,30][Math.floor(rnd()*3)],v2=a1*v1/a2;return {kind:"number",given:"A₁="+a1+" cm², v₁="+v1+" cm/s, A₂="+a2+" cm²",ask:"v₂?",answer:+v2.toFixed(2),unit:"cm/s",tol:0.1,steps:["A₁v₁=A₂v₂","v₂="+a1+"×"+v1+"÷"+a2,"="+v2.toFixed(2)+" cm/s"]};}if(mode===1){var peak=[40,60,80,100][Math.floor(rnd()*4)];return {kind:"number",given:"Fully developed parabolic peak velocity="+peak+" cm/s",ask:"Approximate mean velocity?",answer:peak/2,unit:"cm/s",tol:0.1,steps:["peak≈2×mean","mean=peak÷2","="+(peak/2)+" cm/s"]};}var v=[0.4,0.5,0.8][Math.floor(rnd()*3)],D=[0.005,0.01,0.015][Math.floor(rnd()*3)],re=1060*v*D/0.004;return {kind:"number",given:"ρ=1060 kg/m³, v="+v+" m/s, D="+D+" m, η=0.004 Pa·s",ask:"Reynolds number?",answer:+re.toFixed(1),unit:"",tol:1,steps:["Re=ρvD/η","=1060×"+v+"×"+D+"÷0.004","="+re.toFixed(1)]};} }
  ],

  whiteboard: [
    {
      id: "u11-w1",
      prompt: "Brain-dump everything that controls volume flow rate: write the flow equation, Poiseuille's law, and what happens to flow when each variable goes up.",
      keyPoints: [
        "flow = pressure gradient ÷ resistance",
        "Units of volume flow rate: mL/min (or cm³/s)",
        "resistance = 8 × length × viscosity ÷ (π × radius⁴)",
        "flow ∝ ΔP × r⁴ ÷ (length × viscosity)",
        "↑ pressure gradient → ↑ flow (direct, first power)",
        "↑ resistance → ↓ flow (inverse)",
        "↑ radius → ↓↓↓ resistance, ↑↑↑ flow (4th power)",
        "Double radius = 16× flow; half radius = 1/16 flow",
        "↑ length → ↑ resistance → ↓ flow (first power)",
        "↑ viscosity → ↑ resistance → ↓ flow",
        "The body controls radius via arteriole dilation/constriction",
        "No gradient = no flow, no matter how high the pressure"
      ],
      minutes: 6,
      lesson: "u11-l2"
    },
    {
      id: "u11-w2",
      prompt: "Draw the three flow profiles and the three flow-over-time patterns. Label where each occurs and what each looks like on a spectral tracing.",
      keyPoints: [
        "Profiles across the vessel: plug, laminar (parabolic), turbulent",
        "Plug = flat/uniform velocities; vessel entrances, large vessels; narrow spectral band",
        "Laminar = center fastest, walls slowest; normal in most vessels",
        "Laminar peak velocity ≈ 2 × average velocity; clear spectral window",
        "Turbulent = chaotic and multidirectional; bruit and thrill; spectral broadening",
        "Turbulence when Reynolds number > 2000 (<1500 laminar, 1500–2000 transitional)",
        "Reynolds = density × velocity × diameter ÷ viscosity, unitless",
        "Patterns over time: steady (never changes), pulsatile (cardiac), phasic (respiratory)",
        "Pulsatile = normal arteries; phasic = normal veins",
        "Loss of venous phasicity suggests proximal obstruction"
      ],
      minutes: 7,
      lesson: "u11-l4"
    },
    {
      id: "u11-w3",
      prompt: "Draw a stenosis. Label velocity, pressure, turbulence, and write the simplified Bernoulli equation with two worked examples.",
      keyPoints: [
        "Total energy is conserved: pressure + kinetic + potential",
        "Continuity: area × velocity is constant, so smaller lumen → faster flow",
        "At the tightest point: velocity is HIGHEST",
        "At the tightest point: pressure is LOWEST",
        "Beyond the narrowing: lumen widens, velocity falls, pressure partly recovers",
        "Turbulence and spectral broadening appear DISTAL to the stenosis",
        "Turbulence is audible as a bruit, palpable as a thrill",
        "Simplified Bernoulli: ΔP (mmHg) ≈ 4 × v², v in m/s",
        "3 m/s → 36 mmHg",
        "5 m/s → 100 mmHg",
        "Velocity must be in m/s or the answer is wildly wrong"
      ],
      minutes: 6,
      lesson: "u11-l6"
    },
    {
      id: "u11-w4",
      prompt: "Write everything you know about venous flow: respiration, Valsalva, hydrostatic pressure standing vs lying, and what makes a venous signal abnormal.",
      keyPoints: [
        "Normal venous flow is phasic with respiration",
        "Inspiration: diaphragm drops, abdominal pressure ↑, leg venous return ↓",
        "Inspiration: thoracic pressure ↓, arm and neck venous return ↑",
        "Expiration reverses both",
        "Valsalva stops leg venous return; reflux = incompetent valves",
        "Calf muscle pump and one-way valves also return venous blood",
        "Hydrostatic pressure is zero at heart level",
        "Lying flat: ≈ 0 mmHg throughout the body",
        "Standing: positive below the heart, negative above it",
        "≈ 0.735 mmHg per cm, ≈ 22 mmHg per 30 cm",
        "Ankle standing ≈ +100 mmHg; head ≈ −30 to −40 mmHg",
        "Hydrostatic pressure distends thin-walled veins but does not itself drive flow",
        "Continuous non-phasic signal = possible proximal obstruction (or too much wall filter)",
        "Pulsatile vein = think right heart failure or tricuspid regurgitation"
      ],
      minutes: 8,
      lesson: "u11-l7"
    },
    {
      id: "u11-w5",
      prompt: "Compare high-resistance and low-resistance arterial beds: waveform shape, examples, and what exercise and disease do to them.",
      keyPoints: [
        "High resistance: sharp systolic peak, reverse flow in early diastole, triphasic",
        "High-resistance examples: limb arteries at rest, external carotid",
        "Low resistance: broad peak, continuous forward flow all through diastole",
        "Low-resistance examples: internal carotid, renal, hepatic, placenta",
        "Read the diastole to tell them apart",
        "Exercise dilates muscle arterioles → resistance falls",
        "flow = ΔP ÷ resistance, so falling resistance means rising flow",
        "After exercise a limb artery loses its reverse notch and looks low-resistance",
        "Tight proximal stenosis → tardus parvus distally (slow rise, low amplitude)",
        "Tardus parvus can imitate a low-resistance signal — check upstream"
      ],
      minutes: 6,
      lesson: "u11-l9"
    }
  ]
});
