/* Unit 03 — Pulsed Waves */
window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u03",
  order: 3,
  title: "Pulsed Waves",
  icon: "📡",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — Pulsed Waves chapter",
  blurb: "Imaging sound is not a steady hum — it is a burst, then a long silence, over and over. This unit gives you the five numbers that describe that rhythm (pulse duration, spatial pulse length, pulse repetition period, pulse repetition frequency, duty factor), who controls each one, and how they all move when you change imaging depth or frequency.",

  objectives: [
    { id: "u03-o1", text: "Compare continuous wave (CW) and pulsed wave (PW) sound: how each is produced, what each is used for, and the duty factor of each." },
    { id: "u03-o2", text: "Define pulse duration, calculate it from the number of cycles and the period, and state its units, typical values, and who determines it." },
    { id: "u03-o3", text: "Define spatial pulse length, calculate it from the number of cycles and the wavelength, and state its units, typical values, and why it controls axial resolution." },
    { id: "u03-o4", text: "Define pulse repetition period and pulse repetition frequency, state their reciprocal relationship, units, and typical values." },
    { id: "u03-o5", text: "Calculate duty factor from pulse duration and pulse repetition period, and explain in words what a duty factor of 0.5 % means." },
    { id: "u03-o6", text: "Predict what happens to PD, SPL, PRP, PRF, and duty factor when imaging depth, frequency, or the number of cycles in the pulse changes." },
    { id: "u03-o7", text: "Explain damping (ring-down control) and list its effects on pulse duration, spatial pulse length, bandwidth, Q-factor, and axial resolution." },
    { id: "u03-o8", text: "Apply the 13 µs-per-centimeter rule to convert imaging depth into pulse repetition period and pulse repetition frequency, and back again." },
    { id: "u03-o9", text: "Identify which pulsed-wave parameters the sonographer can change and which are fixed by the sound source, and name the single control that changes them." }
  ],

  lessons: [
    {
      id: "u03-l1",
      title: "Continuous wave vs. pulsed wave",
      objectives: ["u03-o1", "u03-o9"],
      html: `<p class="lead">Imaging sound has to shut up long enough to hear its own echoes.</p>
<p>Stand at the edge of a canyon and yell. If you yell <b>continuously</b>, you never hear anything come back — your own voice drowns the echo. If you yell once and then shut your mouth, the echo arrives a moment later, and the length of that silence tells you how far away the canyon wall is. That is the entire reason diagnostic ultrasound is pulsed.</p>
<p><span class="kw">Continuous wave (CW)</span> sound is transmitted without interruption. Because one element is transmitting all the time, a CW device needs <b>two</b> active elements: one that only sends and one that only listens. CW can measure very high velocities and is used in CW Doppler and in therapeutic ultrasound, but it has <b>no depth information at all</b> — the machine can never tell when a given echo left, so it cannot tell where it came from.</p>
<p><span class="kw">Pulsed wave (PW)</span> sound is transmitted in short bursts of a few cycles, each followed by a long period of listening. A single element does both jobs: it transmits for roughly 1 µs, then receives for a few hundred µs. Because the machine knows exactly when it sent the pulse, it can time each returning echo and place it at the correct depth.</p>
<table class="dt"><tr><th>Feature</th><th>CW</th><th>Pulsed</th></tr>
<tr><td>Active elements</td><td>2 (send + receive)</td><td>1 (does both)</td></tr>
<tr><td>Transmitting time</td><td>100 % of the time</td><td>about 0.1–1 % of the time</td></tr>
<tr><td>Depth information</td><td>none</td><td>yes, from echo time</td></tr>
<tr><td>Duty factor</td><td>100 %</td><td>0.1–1 %</td></tr></table>
<div class="callout key">A pulse is a short burst of cycles followed by silence. Imaging machines spend about 99 % of their time listening and about 1 % talking.</div>
<div class="callout warn">"Continuous" does not mean "fast" or "stronger." It means never stopping — and never stopping is exactly why CW cannot tell depth.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>A continuous wave never stops; a pulsed wave is short bursts separated by long listening times</title>
<text x="20" y="30" fill="currentColor" font-size="16">Continuous wave — transmits forever, cannot time echoes</text>
<line x1="20" y1="90" x2="580" y2="90" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M20 90 q20 -32 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="var(--c1)" stroke-width="3"/>
<text x="20" y="170" fill="currentColor" font-size="16">Pulsed wave — burst, listen, burst, listen</text>
<line x1="20" y1="230" x2="580" y2="230" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M20 230 q10 -32 20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--c2)" stroke-width="3"/>
<path d="M220 230 q10 -32 20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--c2)" stroke-width="3"/>
<path d="M420 230 q10 -32 20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="140" y="275" fill="var(--muted)" font-size="15">listening</text>
<text x="340" y="275" fill="var(--muted)" font-size="15">listening</text>
<line x1="120" y1="255" x2="215" y2="255" stroke="var(--muted)" stroke-width="2"/>
<line x1="320" y1="255" x2="415" y2="255" stroke="var(--muted)" stroke-width="2"/>
</svg>`, caption: "Top: CW never stops. Bottom: a pulse is a few cycles, then a long silence for echoes." }
      ],
      sayIt: "Out loud: why must an imaging machine stop transmitting, and what does CW give up by never stopping?",
      keyPoints: [
        "CW = transmits nonstop, needs 2 elements (one sends, one receives), duty factor 100 %",
        "CW has no depth information — no listening gap means no echo timing",
        "PW = short burst then a long listen; one element does both jobs",
        "Imaging duty factor is about 0.1–1 % — the machine mostly listens",
        "Depth comes from time: the machine knows when it sent the pulse"
      ]
    },
    {
      id: "u03-l2",
      title: "Pulse duration — how long the burst lasts",
      objectives: ["u03-o2", "u03-o9"],
      html: `<p class="lead">Pulse duration is a stopwatch measurement: how long the transducer is actually talking.</p>
<p><span class="kw">Pulse duration (PD)</span> is the time from the beginning of a pulse to the end of that same pulse. Picture the burst on a time axis and measure it with a stopwatch. Only two things set it: how many cycles are in the pulse, and how long each cycle takes.</p>
<div class="formula">PD (µs) = number of cycles × period (µs)</div>
<p>Because period is just 1 ÷ frequency, you can also write it straight from frequency:</p>
<div class="formula">PD (µs) = number of cycles ÷ frequency (MHz)</div>
<p>Example: a 3-cycle pulse from a 5 MHz probe. The period is 1 ÷ 5 = 0.2 µs, so PD = 3 × 0.2 = <b>0.6 µs</b>. Typical imaging pulses are 2–3 cycles long, which puts <b>PD at roughly 0.5–3 µs</b>.</p>
<p>Who controls it? <b>The source only.</b> The number of cycles is fixed by the damping material inside the transducer, and the period is fixed by the probe's frequency. The medium has nothing to do with it — pulse duration is exactly the same in fat, in muscle, and in water. And there is no knob for it: the sonographer <b>cannot</b> change pulse duration on the machine. She can only pick up a different transducer.</p>
<div class="callout key">PD = # cycles × period. Units: microseconds (µs). Typical 0.5–3 µs. Determined by the source only. Not adjustable by the sonographer.</div>
<div class="callout tip">Shorter pulse = shorter burst = cleaner picture. Two ways to get it: more damping (fewer cycles) or a higher-frequency probe (shorter period).</div>
<div class="callout warn">Trap: "increase the depth" does nothing to pulse duration. Depth changes the listening time, not the talking time.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>A three-cycle pulse on a time axis with brackets showing one period and the whole pulse duration</title>
<line x1="40" y1="120" x2="570" y2="120" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M120 120 q20 -40 40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="120" y1="55" x2="200" y2="55" stroke="var(--c2)" stroke-width="2"/>
<line x1="120" y1="50" x2="120" y2="60" stroke="var(--c2)" stroke-width="2"/>
<line x1="200" y1="50" x2="200" y2="60" stroke="var(--c2)" stroke-width="2"/>
<text x="205" y="60" fill="currentColor" font-size="15">1 period = 1 ÷ f</text>
<line x1="120" y1="120" x2="120" y2="195" stroke="var(--muted)" stroke-dasharray="4 4"/>
<line x1="360" y1="120" x2="360" y2="195" stroke="var(--muted)" stroke-dasharray="4 4"/>
<line x1="120" y1="190" x2="360" y2="190" stroke="var(--c3)" stroke-width="3"/>
<line x1="120" y1="183" x2="120" y2="197" stroke="var(--c3)" stroke-width="3"/>
<line x1="360" y1="183" x2="360" y2="197" stroke="var(--c3)" stroke-width="3"/>
<text x="90" y="225" fill="currentColor" font-size="16">PD = 3 cycles × period</text>
<text x="400" y="196" fill="var(--muted)" font-size="15">time →</text>
<line x1="40" y1="245" x2="570" y2="245" stroke="currentColor" stroke-width="2"/>
<text x="40" y="240" fill="var(--muted)" font-size="15">µs</text>
</svg>`, caption: "Pulse duration is measured along the time axis: count the cycles, multiply by the period." }
      ],
      sayIt: "Say it out loud: what is pulse duration, what two numbers make it, what are its units, and who can change it?",
      keyPoints: [
        "PD = number of cycles × period, or number of cycles ÷ frequency (MHz)",
        "Units: microseconds; typical imaging value 0.5–3 µs",
        "Determined by the source (probe) only — the medium cannot change it",
        "The sonographer cannot adjust PD from the machine",
        "More damping (fewer cycles) or higher frequency (shorter period) → shorter PD"
      ]
    },
    {
      id: "u03-l3",
      title: "Spatial pulse length — how long the burst is in space",
      objectives: ["u03-o3", "u03-o6"],
      html: `<p class="lead">Freeze the pulse in mid-flight and measure it with a ruler — that length is spatial pulse length.</p>
<p>Pulse duration answered "how long in time." <span class="kw">Spatial pulse length (SPL)</span> answers "how long in space." If you could photograph the pulse as it travels through tissue, SPL is the distance from the front of the burst to the back of it, in millimeters.</p>
<div class="formula">SPL (mm) = number of cycles × wavelength (mm)</div>
<p>In soft tissue, wavelength is 1.54 ÷ frequency (MHz), so a 3-cycle pulse from a 5 MHz probe has λ = 1.54 ÷ 5 = 0.308 mm and SPL = 3 × 0.308 ≈ <b>0.92 mm</b>. Typical imaging values land between <b>0.1 and 1 mm</b>.</p>
<p>Who controls it? <b>Both the source and the medium.</b> The source picks the number of cycles and the frequency; the medium supplies the propagation speed that turns that frequency into a wavelength. The same probe fired into fat (slower sound) makes a slightly shorter pulse in space than it does into muscle. And again — <b>no knob</b>. The sonographer changes SPL only by choosing a different transducer.</p>
<p>SPL matters more than almost any other number in this unit, because <b>axial resolution = SPL ÷ 2</b>. A short pulse can separate two reflectors that are close together along the beam; a long pulse smears them into one blob.</p>
<div class="callout key">SPL = # cycles × wavelength. Units: millimeters. Typical 0.1–1 mm. Source and medium. Shorter SPL → better axial resolution.</div>
<div class="callout tip">Same pulse, two rulers: a clock gives you PD in µs, a tape measure gives you SPL in mm.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 250" role="img"><title>A three-cycle pulse drawn on a distance axis, with one wavelength and the whole spatial pulse length marked</title>
<line x1="40" y1="110" x2="570" y2="110" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M120 110 q20 -38 40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="var(--c1)" stroke-width="3"/>
<line x1="120" y1="50" x2="200" y2="50" stroke="var(--c2)" stroke-width="2"/>
<line x1="120" y1="45" x2="120" y2="55" stroke="var(--c2)" stroke-width="2"/>
<line x1="200" y1="45" x2="200" y2="55" stroke="var(--c2)" stroke-width="2"/>
<text x="206" y="55" fill="currentColor" font-size="15">1 wavelength (mm)</text>
<line x1="120" y1="175" x2="360" y2="175" stroke="var(--c3)" stroke-width="3"/>
<line x1="120" y1="168" x2="120" y2="182" stroke="var(--c3)" stroke-width="3"/>
<line x1="360" y1="168" x2="360" y2="182" stroke="var(--c3)" stroke-width="3"/>
<text x="90" y="205" fill="currentColor" font-size="16">SPL = 3 cycles × wavelength</text>
<line x1="40" y1="235" x2="570" y2="235" stroke="currentColor" stroke-width="2"/>
<text x="470" y="228" fill="var(--muted)" font-size="15">distance (mm) →</text>
</svg>`, caption: "Spatial pulse length is measured along the distance axis: count the cycles, multiply by the wavelength." }
      ],
      sayIt: "Out loud: define spatial pulse length, give the formula, give the units and a typical value, and say what it does to axial resolution.",
      keyPoints: [
        "SPL = number of cycles × wavelength; units millimeters; typical 0.1–1 mm",
        "Determined by source AND medium (wavelength depends on the medium's speed)",
        "Axial resolution = SPL ÷ 2 — shorter pulse, better axial detail",
        "Higher frequency → shorter wavelength → shorter SPL → better axial resolution",
        "The sonographer cannot change SPL from the console"
      ]
    },
    {
      id: "u03-l4",
      title: "Pulse repetition period and pulse repetition frequency",
      objectives: ["u03-o4", "u03-o9"],
      html: `<p class="lead">PRP is the beat of the drum; PRF is the tempo.</p>
<p><span class="kw">Pulse repetition period (PRP)</span> is the time from the <b>start of one pulse to the start of the next pulse</b>. Crucially, it includes both the tiny talking time and the long listening time. Typical values are <b>100 µs to 1 ms</b> (1 ms = 1,000 µs).</p>
<p><span class="kw">Pulse repetition frequency (PRF)</span> is simply how many pulses are sent per second. Units are hertz (or kHz), and imaging values run about <b>1,000 to 10,000 Hz (1–10 kHz)</b>.</p>
<div class="formula">PRF = 1 ÷ PRP &nbsp;&nbsp; and &nbsp;&nbsp; PRP = 1 ÷ PRF</div>
<p>They are <span class="kw-2">reciprocals</span>, so they always move in opposite directions. A handy shortcut when PRP is in microseconds: PRF (kHz) = 1,000 ÷ PRP (µs). A PRP of 200 µs gives 1,000 ÷ 200 = <b>5 kHz</b>.</p>
<p>Who controls them? <b>The machine</b> — but the sonographer steers the machine, because PRP and PRF are set entirely by <b>imaging depth</b>. Deeper imaging means the machine must wait longer for the deepest echo to get home, so PRP gets longer and PRF gets lower. Shallow imaging means it can fire again sooner: shorter PRP, higher PRF. Frequency, damping, and the number of cycles have nothing to do with PRP or PRF.</p>
<div class="callout key">PRP: start of one pulse to start of the next; µs; typical 100 µs–1 ms. PRF: pulses per second; Hz; typical 1–10 kHz. PRF = 1 ÷ PRP. Both are set by imaging depth.</div>
<div class="callout warn">Do not confuse PRF with the probe's frequency. Frequency is millions of cycles per second inside one pulse (MHz); PRF is thousands of pulses per second (kHz). Different animal entirely.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 260" role="img"><title>Timeline showing a short pulse, a long listening time, and the next pulse, with the pulse repetition period bracketed from start to start</title>
<line x1="30" y1="120" x2="575" y2="120" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M60 120 q10 -35 20 0 t20 0 t20 0" fill="none" stroke="var(--c2)" stroke-width="3"/>
<path d="M360 120 q10 -35 20 0 t20 0 t20 0" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="42" y="60" fill="currentColor" font-size="15">pulse</text>
<text x="345" y="60" fill="currentColor" font-size="15">next pulse</text>
<line x1="125" y1="150" x2="355" y2="150" stroke="var(--c1)" stroke-width="2"/>
<text x="150" y="175" fill="var(--c1)" font-size="16">listening time (most of the PRP)</text>
<line x1="60" y1="120" x2="60" y2="215" stroke="var(--muted)" stroke-dasharray="4 4"/>
<line x1="360" y1="120" x2="360" y2="215" stroke="var(--muted)" stroke-dasharray="4 4"/>
<line x1="60" y1="210" x2="360" y2="210" stroke="var(--c3)" stroke-width="3"/>
<line x1="60" y1="203" x2="60" y2="217" stroke="var(--c3)" stroke-width="3"/>
<line x1="360" y1="203" x2="360" y2="217" stroke="var(--c3)" stroke-width="3"/>
<text x="70" y="240" fill="currentColor" font-size="16">PRP = start to start &nbsp; (PRF = 1 ÷ PRP)</text>
</svg>`, caption: "PRP is measured start-of-pulse to start-of-pulse — talking time plus listening time." }
      ],
      sayIt: "Say out loud: define PRP and PRF, give units and typical values for each, and state the one thing that changes both.",
      keyPoints: [
        "PRP = start of one pulse to the start of the next (includes listening time)",
        "PRP typical 100 µs–1 ms; PRF typical 1–10 kHz",
        "PRF = 1 ÷ PRP; PRF (kHz) = 1,000 ÷ PRP (µs)",
        "Both are determined by the machine, controlled by the sonographer through depth",
        "Deeper → longer PRP → lower PRF; shallower → shorter PRP → higher PRF"
      ]
    },
    {
      id: "u03-l5",
      title: "Depth sets the clock: the 13 µs rule",
      objectives: ["u03-o8", "u03-o4", "u03-o6"],
      html: `<p class="lead">Every centimeter of depth costs the machine 13 microseconds of waiting.</p>
<p>Sound travels through soft tissue at 1,540 m/s, which is the much friendlier <b>1.54 mm per microsecond</b>. To reach a reflector 1 cm deep and come back, the pulse covers 2 cm = 20 mm, and 20 ÷ 1.54 ≈ <b>13 µs</b>. That single number is the backbone of the whole unit.</p>
<div class="formula">PRP (µs) = 13 µs/cm × imaging depth (cm)</div>
<p>One way down is 6.5 µs per cm; down <b>and back</b> is 13 µs per cm. The machine must wait at least that long before firing again, otherwise the deep echoes from pulse 1 arrive while it is listening for pulse 2 and get placed at the wrong depth (range ambiguity).</p>
<p>Once you have PRP, PRF follows: PRF = 1 ÷ PRP. Because 1 ÷ 13 µs ≈ 77,000, there is a clean shortcut:</p>
<div class="formula">PRF (Hz) ≈ 77,000 ÷ imaging depth (cm)</div>
<p>Example: imaging at 10 cm. PRP = 13 × 10 = <b>130 µs</b>, and PRF ≈ 77,000 ÷ 10 ≈ <b>7,700 Hz</b>. Going out to 20 cm doubles PRP to 260 µs and halves PRF to about 3,850 Hz. Working backwards is just as easy: a PRP of 65 µs means 65 ÷ 13 = 5 cm of depth.</p>
<div class="callout key">13 µs per cm, round trip. 6.5 µs per cm, one way. PRP = 13 × depth (cm). PRF ≈ 77,000 ÷ depth (cm).</div>
<div class="callout tip">Unlucky 13: every centimeter you go down and back costs you 13 microseconds.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 300" role="img"><title>A probe on the skin with echoes returning from 1, 5 and 10 centimeters, labeled with 13, 65 and 130 microseconds round trip</title>
<text x="20" y="28" fill="currentColor" font-size="16">Round-trip time = 13 µs for every 1 cm of depth</text>
<line x1="60" y1="55" x2="180" y2="55" stroke="currentColor" stroke-width="6"/>
<text x="190" y="60" fill="var(--muted)" font-size="15">probe on skin</text>
<line x1="120" y1="60" x2="120" y2="270" stroke="var(--muted)" stroke-dasharray="5 5"/>
<line x1="90" y1="110" x2="330" y2="110" stroke="var(--c1)" stroke-width="3"/>
<text x="345" y="116" fill="currentColor" font-size="16">1 cm → 13 µs</text>
<line x1="90" y1="175" x2="330" y2="175" stroke="var(--c2)" stroke-width="3"/>
<text x="345" y="181" fill="currentColor" font-size="16">5 cm → 65 µs</text>
<line x1="90" y1="240" x2="330" y2="240" stroke="var(--c3)" stroke-width="3"/>
<text x="345" y="246" fill="currentColor" font-size="16">10 cm → 130 µs</text>
<path d="M120 60 L135 240" fill="none" stroke="var(--c4)" stroke-width="2"/>
<path d="M135 240 L150 60" fill="none" stroke="var(--c4)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="160" y="285" fill="var(--c4)" font-size="15">down (solid) and back (dashed)</text>
</svg>`, caption: "The clock the machine lives by: 13 µs of waiting per centimeter of imaging depth." }
      ],
      sayIt: "Out loud, no notes: how many microseconds per centimeter round trip, and what are PRP and PRF at 12 cm of depth?",
      keyPoints: [
        "Soft tissue speed 1.54 mm/µs → 13 µs per cm round trip, 6.5 µs per cm one way",
        "PRP (µs) = 13 × depth (cm)",
        "PRF (Hz) ≈ 77,000 ÷ depth (cm)",
        "Deeper imaging → longer PRP → lower PRF (and lower frame rate)",
        "Firing again too soon puts deep echoes at the wrong depth (range ambiguity)"
      ]
    },
    {
      id: "u03-l6",
      title: "Duty factor — the percentage of time spent talking",
      objectives: ["u03-o5", "u03-o6"],
      html: `<p class="lead">Duty factor is the fraction of the machine's workday spent transmitting.</p>
<p>Imagine an 8-hour shift where you speak for about 3 minutes total and listen for the other 7 hours and 57 minutes. That is roughly what an imaging system does. <span class="kw">Duty factor (DF)</span> puts a number on it: the fraction of time the system is transmitting, usually written as a percent.</p>
<div class="formula">DF (%) = PD ÷ PRP × 100</div>
<p>Both quantities are times, so the units cancel — duty factor is <b>unitless</b> (expressed as a percent or a decimal fraction). Just make sure PD and PRP are in the <b>same units</b> before dividing.</p>
<p>Example: PD = 1 µs, PRP = 200 µs. DF = 1 ÷ 200 × 100 = <b>0.5 %</b>. Typical imaging duty factors run <b>0.1–1 %</b>. Continuous wave is <b>100 %</b> (always transmitting), and a system sitting in freeze is <b>0 %</b> (never transmitting).</p>
<p>Who controls it? The machine, through depth. PD is fixed by the probe, so the only thing that moves is PRP: <b>increase depth → longer PRP → smaller duty factor</b>. That is also why duty factor matters for safety — less talking time means less energy deposited per second, so time-averaged intensity and the heating risk drop.</p>
<div class="callout key">DF = PD ÷ PRP × 100. Unitless (%). Imaging 0.1–1 %. CW = 100 %. Frozen = 0 %. Deeper imaging lowers it.</div>
<div class="callout warn">Trap: a duty factor of 0.5 % does not mean the pulse is weak. It means the pulse is rare. Peak pressure during that 1 µs can be enormous.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 230" role="img"><title>A long bar representing the pulse repetition period with a tiny slice at the left representing the pulse duration</title>
<text x="20" y="35" fill="currentColor" font-size="16">One PRP = 200 µs of machine time</text>
<line x1="40" y1="90" x2="560" y2="90" stroke="var(--muted)" stroke-width="2"/>
<line x1="40" y1="60" x2="40" y2="120" stroke="var(--muted)" stroke-width="2"/>
<line x1="560" y1="60" x2="560" y2="120" stroke="var(--muted)" stroke-width="2"/>
<line x1="40" y1="90" x2="43" y2="90" stroke="var(--c2)" stroke-width="18"/>
<text x="55" y="150" fill="var(--c2)" font-size="16">PD = 1 µs (talking)</text>
<line x1="50" y1="135" x2="44" y2="100" stroke="var(--c2)" stroke-width="2"/>
<text x="300" y="80" fill="var(--c1)" font-size="16">199 µs of listening</text>
<text x="40" y="200" fill="currentColor" font-size="16">DF = 1 ÷ 200 × 100 = 0.5 % of the time transmitting</text>
</svg>`, caption: "Duty factor drawn to scale: the transmit slice is almost invisible next to the listening time." }
      ],
      sayIt: "Out loud: give the duty factor formula, its units, the imaging range, the CW value, and what happens to it when depth increases.",
      keyPoints: [
        "DF = PD ÷ PRP × 100; PD and PRP must be in the same units",
        "Unitless — reported as a percent (or a decimal)",
        "Imaging 0.1–1 %; CW 100 %; frozen image 0 %",
        "Increase depth → PRP increases → duty factor decreases",
        "Low duty factor keeps time-averaged intensity and heating low"
      ]
    },
    {
      id: "u03-l7",
      title: "Damping — killing the ring",
      objectives: ["u03-o7", "u03-o3"],
      html: `<p class="lead">Slap a bell and it rings for seconds; slap a bell with your palm still on it and you get one short thud. That palm is damping.</p>
<p>When the pulser hits the active element (PZT) with a voltage spike, the crystal wants to keep vibrating — that ringing is called <span class="kw-2">ring-down</span>. Left alone, it would produce a long pulse of many cycles. Behind the crystal sits the <span class="kw">damping material</span> (also called the backing layer, usually epoxy loaded with tungsten), glued to the back of the element to absorb that vibration and stop it after 2 or 3 cycles.</p>
<p>Damping changes a whole cascade of things at once:</p>
<ul>
<li>Fewer cycles per pulse → <b>shorter PD</b> and <b>shorter SPL</b></li>
<li>Shorter SPL → <b>better (smaller number) axial resolution</b></li>
<li>More frequencies present in the short pulse → <b>wider bandwidth</b></li>
<li>Wider bandwidth → <b>lower Q-factor</b> (Q = main frequency ÷ bandwidth)</li>
<li>Energy absorbed by the backing → <b>lower amplitude and sensitivity</b></li>
</ul>
<p>Who controls it? <b>The manufacturer</b>, when the probe is built. There is no damping knob on the console. Imaging probes are heavily damped (short, broadband pulses, low Q). CW Doppler probes are barely damped at all — they want a long, pure, single-frequency signal, so they are high-Q and narrow-band.</p>
<div class="callout key">Damping ↓ cycles → ↓ PD, ↓ SPL, ↑ bandwidth, ↓ Q-factor, ↑ axial resolution, ↓ sensitivity. Set by the manufacturer.</div>
<div class="callout tip">Damping trades loudness for sharpness: you give up amplitude and get a crisper picture.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 280" role="img"><title>An undamped pulse with many cycles compared with a damped pulse of only two cycles</title>
<text x="20" y="30" fill="currentColor" font-size="16">No damping: long ring-down</text>
<line x1="30" y1="85" x2="570" y2="85" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M60 85 q10 -34 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--c2)" stroke-width="3"/>
<text x="300" y="60" fill="var(--muted)" font-size="15">long PD, long SPL, narrow bandwidth, high Q</text>
<text x="20" y="175" fill="currentColor" font-size="16">Heavy damping: 2 cycles and done</text>
<line x1="30" y1="230" x2="570" y2="230" stroke="var(--muted)" stroke-dasharray="5 5"/>
<path d="M60 230 q10 -34 20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--c3)" stroke-width="3"/>
<text x="180" y="205" fill="var(--muted)" font-size="15">short PD, short SPL, wide bandwidth, low Q</text>
<text x="180" y="268" fill="var(--c3)" font-size="16">→ better axial resolution</text>
</svg>`, caption: "Damping cuts the ring short: fewer cycles, shorter pulse in time and space, wider bandwidth." }
      ],
      sayIt: "Out loud: what is damping, where is it in the probe, and list five things it changes.",
      keyPoints: [
        "Damping = backing material behind the PZT that stops ring-down",
        "Fewer cycles → shorter pulse duration and shorter spatial pulse length",
        "Shorter SPL → better axial resolution",
        "Wider bandwidth and lower Q-factor",
        "Lower amplitude/sensitivity — the trade-off for sharpness",
        "Fixed by the manufacturer; imaging probes are heavily damped, CW probes are not"
      ]
    },
    {
      id: "u03-l8",
      title: "Who controls what, and what moves when",
      objectives: ["u03-o6", "u03-o9", "u03-o2"],
      html: `<p class="lead">Two chains explain almost every pulsed-wave exam question: the depth chain and the frequency chain.</p>
<p><b>The depth chain (the sonographer's chain).</b> Depth is the one control on the console that touches these parameters at all:</p>
<div class="formula">↑ depth → ↑ PRP → ↓ PRF → ↓ duty factor (PD and SPL unchanged)</div>
<p><b>The frequency/damping chain (the probe's chain).</b> Change probes and you change the pulse itself:</p>
<div class="formula">↑ frequency → ↓ period and ↓ wavelength → ↓ PD and ↓ SPL (PRP and PRF unchanged)</div>
<table class="dt"><tr><th>Parameter</th><th>Units</th><th>Typical</th><th>Determined by</th><th>Sonographer?</th></tr>
<tr><td>Pulse duration</td><td>µs</td><td>0.5–3 µs</td><td>source only</td><td>no</td></tr>
<tr><td>Spatial pulse length</td><td>mm</td><td>0.1–1 mm</td><td>source and medium</td><td>no</td></tr>
<tr><td>PRP</td><td>µs–ms</td><td>100 µs–1 ms</td><td>machine (depth)</td><td>yes, via depth</td></tr>
<tr><td>PRF</td><td>Hz</td><td>1–10 kHz</td><td>machine (depth)</td><td>yes, via depth</td></tr>
<tr><td>Duty factor</td><td>% (unitless)</td><td>0.1–1 %</td><td>machine (depth)</td><td>yes, via depth</td></tr></table>
<div class="callout key">The sonographer has exactly one door into this unit: the depth control. Everything else comes from the transducer she picked up.</div>
<div class="callout warn">Two favorite traps: (1) changing depth does NOT change PD or SPL; (2) changing frequency does NOT change PRP, PRF, or duty factor.</div>`,
      diagrams: [
        { svg: `<svg viewBox="0 0 600 270" role="img"><title>Two cause and effect chains: increasing depth raises PRP and lowers PRF and duty factor; raising frequency shortens period and wavelength and so shortens PD and SPL</title>
<text x="20" y="30" fill="currentColor" font-size="16">Depth chain — the console knob</text>
<text x="20" y="70" fill="var(--c1)" font-size="16">↑ depth</text>
<text x="120" y="70" fill="currentColor" font-size="16">→ ↑ PRP</text>
<text x="240" y="70" fill="currentColor" font-size="16">→ ↓ PRF</text>
<text x="360" y="70" fill="currentColor" font-size="16">→ ↓ duty factor</text>
<text x="120" y="105" fill="var(--muted)" font-size="15">PD and SPL do not move</text>
<line x1="20" y1="135" x2="580" y2="135" stroke="var(--muted)" stroke-dasharray="6 5"/>
<text x="20" y="175" fill="currentColor" font-size="16">Frequency chain — the probe you chose</text>
<text x="20" y="215" fill="var(--c2)" font-size="16">↑ frequency</text>
<text x="150" y="215" fill="currentColor" font-size="16">→ ↓ period</text>
<text x="290" y="215" fill="currentColor" font-size="16">→ ↓ PD</text>
<text x="150" y="245" fill="currentColor" font-size="16">→ ↓ wavelength</text>
<text x="310" y="245" fill="currentColor" font-size="16">→ ↓ SPL</text>
<text x="400" y="245" fill="var(--muted)" font-size="15">PRP, PRF fixed</text>
</svg>`, caption: "Depth moves the rhythm (PRP, PRF, DF). Frequency and damping move the pulse itself (PD, SPL)." }
      ],
      sayIt: "Out loud: recite the depth chain and the frequency chain, then say which parameters the sonographer cannot touch at all.",
      keyPoints: [
        "↑ depth → ↑ PRP → ↓ PRF → ↓ duty factor; PD and SPL unaffected",
        "↑ frequency → ↓ period and wavelength → ↓ PD and SPL; PRP, PRF, DF unaffected",
        "Source only: pulse duration",
        "Source and medium: spatial pulse length",
        "Machine (via depth): PRP, PRF, duty factor",
        "Depth is the sonographer's only control in this unit"
      ]
    }
  ],

  mnemonics: [
    { saying: "One clock, one tape measure", meaning: "Same pulse, two rulers: pulse duration is the clock reading (cycles × period, in µs); spatial pulse length is the tape measure reading (cycles × wavelength, in mm).", lesson: "u03-l3" },
    { saying: "Pretty Darn Short — PD is 0.5 to 3", meaning: "PD = Pretty Darn Short: pulse duration is only about 0.5–3 µs, because it is just 2–3 cycles long.", lesson: "u03-l2" },
    { saying: "Start to start, not stop to start", meaning: "PRP is measured from the START of one pulse to the START of the next — it includes the pulse itself plus all the listening time.", lesson: "u03-l4" },
    { saying: "Unlucky 13 goes down and back", meaning: "13 µs per centimeter of depth, round trip (and 6.5 µs per cm one way). PRP = 13 × depth in cm.", lesson: "u03-l5" },
    { saying: "Deep venue, slow beat", meaning: "Image deeper and the machine has to wait longer between pulses: PRP goes up, so PRF (the beat) goes down, and so does duty factor.", lesson: "u03-l5" },
    { saying: "Duty factor = talking ÷ the whole day", meaning: "DF = PD ÷ PRP × 100. Time spent talking divided by the whole send-and-listen cycle — about 1 % for imaging, 100 % for CW.", lesson: "u03-l6" },
    { saying: "Damp it: Short pulse, Wide band, Low Q", meaning: "Damping shortens PD and SPL, widens the bandwidth, lowers the Q-factor, improves axial resolution, and costs you amplitude.", lesson: "u03-l7" },
    { saying: "The sonographer only opens one door: DEPTH", meaning: "PD and SPL are locked inside the transducer. The only pulsed-wave parameters the sonographer can change are PRP, PRF and duty factor — and only by changing imaging depth.", lesson: "u03-l8" },
    { saying: "CW is 100 % Committed to Working", meaning: "Continuous wave never stops transmitting, so its duty factor is 100 % — and that is exactly why it cannot tell you depth.", lesson: "u03-l1" }
  ],

  formulas: [
    { name: "Period from frequency", expr: "period (µs) = 1 ÷ frequency (MHz)", units: "µs", note: "5 MHz → 0.2 µs" },
    { name: "Wavelength in soft tissue", expr: "λ (mm) = 1.54 ÷ frequency (MHz)", units: "mm", note: "Uses c = 1.54 mm/µs" },
    { name: "Pulse duration", expr: "PD = number of cycles × period", units: "µs", note: "Typical 0.5–3 µs; source only" },
    { name: "Pulse duration from frequency", expr: "PD (µs) = number of cycles ÷ frequency (MHz)", units: "µs", note: "Same thing, one step shorter" },
    { name: "Spatial pulse length", expr: "SPL = number of cycles × wavelength", units: "mm", note: "Typical 0.1–1 mm; source and medium" },
    { name: "Pulse repetition frequency", expr: "PRF = 1 ÷ PRP", units: "Hz", note: "PRF (kHz) = 1,000 ÷ PRP (µs)" },
    { name: "Pulse repetition period", expr: "PRP = 1 ÷ PRF", units: "s (usually µs)", note: "Start of one pulse to start of the next" },
    { name: "Duty factor", expr: "DF (%) = PD ÷ PRP × 100", units: "% (unitless)", note: "Imaging 0.1–1 %; CW = 100 %" },
    { name: "PRP from imaging depth", expr: "PRP (µs) = 13 µs/cm × depth (cm)", units: "µs", note: "Round trip in soft tissue" },
    { name: "PRF from imaging depth", expr: "PRF (Hz) ≈ 77,000 ÷ depth (cm)", units: "Hz", note: "Because 1 ÷ 13 µs ≈ 77,000" },
    { name: "Axial resolution", expr: "axial resolution = SPL ÷ 2", units: "mm", note: "Why a short pulse matters" },
    { name: "Q-factor", expr: "Q = main frequency ÷ bandwidth", units: "unitless", note: "Heavy damping → wide bandwidth → low Q" }
  ],

  keyNumbers: [
    { fact: "Propagation speed in soft tissue", value: "1,540 m/s = 1.54 mm/µs" },
    { fact: "Round-trip time per centimeter of depth", value: "13 µs/cm (6.5 µs/cm one way)" },
    { fact: "Typical pulse duration", value: "0.5–3 µs" },
    { fact: "Typical spatial pulse length", value: "0.1–1 mm" },
    { fact: "Typical pulse repetition period", value: "100 µs – 1 ms" },
    { fact: "Typical pulse repetition frequency", value: "1,000–10,000 Hz (1–10 kHz)" },
    { fact: "Typical imaging duty factor", value: "0.1–1 %" },
    { fact: "Duty factor of continuous wave", value: "100 % (frozen system = 0 %)" },
    { fact: "Cycles in a typical imaging pulse", value: "2–3 cycles (pulsed Doppler uses more, roughly 5–30)" },
    { fact: "PRF shortcut from depth", value: "PRF (Hz) ≈ 77,000 ÷ depth (cm)" },
    { fact: "1 millisecond", value: "1,000 µs" }
  ],

  flashcards: [
    { front: "Pulse duration", back: "Time from the start of a pulse to the end of that pulse; PD = # cycles × period; 0.5–3 µs", lesson: "u03-l2" },
    { front: "Formula: pulse duration", back: "PD = number of cycles × period (= # cycles ÷ frequency in MHz)", lesson: "u03-l2" },
    { front: "Units and typical value of PD", back: "Microseconds; 0.5–3 µs", lesson: "u03-l2" },
    { front: "Who determines pulse duration?", back: "The source only — the sonographer cannot change it", lesson: "u03-l2" },
    { front: "Spatial pulse length", back: "Length of a pulse in space; SPL = # cycles × wavelength; 0.1–1 mm", lesson: "u03-l3" },
    { front: "Formula: spatial pulse length", back: "SPL = number of cycles × wavelength", lesson: "u03-l3" },
    { front: "Who determines SPL?", back: "Both the source (cycles, frequency) and the medium (speed → wavelength)", lesson: "u03-l3" },
    { front: "Which pulsed-wave parameter sets axial resolution?", back: "Spatial pulse length — axial resolution = SPL ÷ 2", lesson: "u03-l3" },
    { front: "Pulse repetition period", back: "Time from the start of one pulse to the start of the next; 100 µs–1 ms", lesson: "u03-l4" },
    { front: "Pulse repetition frequency", back: "Number of pulses fired per second; 1–10 kHz; PRF = 1 ÷ PRP", lesson: "u03-l4" },
    { front: "PRF = ?", back: "1 ÷ PRP (they are reciprocals)", lesson: "u03-l4" },
    { front: "Units of PRP and PRF", back: "PRP in seconds (usually µs); PRF in hertz (usually kHz)", lesson: "u03-l4" },
    { front: "What determines PRP and PRF?", back: "Imaging depth — the machine, steered by the sonographer's depth control", lesson: "u03-l4" },
    { front: "Duty factor", back: "Percentage of time the system is transmitting; DF = PD ÷ PRP × 100", lesson: "u03-l6" },
    { front: "Formula: duty factor", back: "DF (%) = PD ÷ PRP × 100", lesson: "u03-l6" },
    { front: "Units of duty factor", back: "None — it is unitless, reported as a percent", lesson: "u03-l6" },
    { front: "Typical imaging duty factor", back: "0.1–1 %", lesson: "u03-l6" },
    { front: "Duty factor of CW sound", back: "100 % (a frozen system is 0 %)", lesson: "u03-l6" },
    { front: "13 µs per centimeter — what is it?", back: "Round-trip time for sound in soft tissue; PRP = 13 × depth (cm)", lesson: "u03-l5" },
    { front: "One-way time per centimeter", back: "6.5 µs/cm", lesson: "u03-l5" },
    { front: "PRF from imaging depth", back: "PRF (Hz) ≈ 77,000 ÷ depth (cm)", lesson: "u03-l5" },
    { front: "PRP at 10 cm of depth", back: "130 µs (and PRF ≈ 7,700 Hz)", lesson: "u03-l5" },
    { front: "Increase imaging depth → PRP?", back: "PRP increases (more listening time needed)", lesson: "u03-l5" },
    { front: "Increase imaging depth → PRF and duty factor?", back: "Both decrease", lesson: "u03-l6" },
    { front: "Increase imaging depth → PD and SPL?", back: "No change — depth cannot touch the pulse itself", lesson: "u03-l8" },
    { front: "Increase frequency → PD and SPL?", back: "Both decrease (shorter period, shorter wavelength)", lesson: "u03-l8" },
    { front: "Increase frequency → PRP, PRF, duty factor?", back: "No change — those come from depth only", lesson: "u03-l8" },
    { front: "Damping", back: "Backing material behind the PZT that stops ring-down after 2–3 cycles", lesson: "u03-l7" },
    { front: "Five effects of damping", back: "↓ PD, ↓ SPL, ↑ bandwidth, ↓ Q-factor, ↑ axial resolution (and ↓ sensitivity)", lesson: "u03-l7" },
    { front: "Q-factor formula", back: "Q = main frequency ÷ bandwidth; heavy damping → low Q", lesson: "u03-l7" },
    { front: "How many active elements does CW need?", back: "Two — one transmits continuously, one receives continuously", lesson: "u03-l1" },
    { front: "Why can't CW give depth information?", back: "It never stops transmitting, so there is no echo travel time to measure", lesson: "u03-l1" },
    { front: "Typical cycles in an imaging pulse", back: "2–3 (pulsed Doppler uses longer pulses, about 5–30)", lesson: "u03-l2" },
    { front: "Which parameters can the sonographer change in this unit?", back: "PRP, PRF and duty factor — only by changing imaging depth", lesson: "u03-l8" },
    { front: "Wavelength in soft tissue", back: "λ (mm) = 1.54 ÷ frequency (MHz)", lesson: "u03-l3" },
    { front: "Period from frequency", back: "period (µs) = 1 ÷ frequency (MHz)", lesson: "u03-l2" }
  ],

  questions: [
    { id: "u03-q1", type: "mc", q: "Which statement is true of continuous wave (CW) sound?",
      choices: ["Its duty factor is 100 %", "Its duty factor is about 1 %", "It provides excellent depth information", "It uses one element that alternates between sending and receiving"],
      answer: 0,
      explain: "CW transmits nonstop, so it is transmitting 100 % of the time. About 1 % is the imaging (pulsed) value — tempting because it is the number you memorize most often, but it belongs to pulsed wave. CW also gives no depth information and needs two separate elements.",
      objectives: ["u03-o1"], lesson: "u03-l1", level: 1 },
    { id: "u03-q2", type: "tf", q: "A pulsed-wave imaging transducer needs one element to transmit and a separate element to receive.",
      answer: false,
      explain: "False — that describes CW, which must listen while it is still transmitting. In pulsed imaging a single element transmits for about 1 µs and then switches to receiving for the rest of the PRP.",
      objectives: ["u03-o1"], lesson: "u03-l1", level: 1 },
    { id: "u03-q3", type: "short", q: "What is the duty factor of continuous wave sound?",
      answer: "100%", accept: ["100%", "100 %", "100", "100 percent", "one hundred percent"],
      explain: "CW is transmitting all the time, so PD ÷ PRP = 1, or 100 %. Imaging duty factors are 0.1–1 %; a frozen system is 0 %.",
      objectives: ["u03-o1"], lesson: "u03-l1", level: 1 },
    { id: "u03-q4", type: "mc", q: "Pulse duration is best defined as:",
      choices: ["The time from the start of one pulse to the start of the next", "The time from the beginning to the end of one pulse", "The distance a pulse occupies in tissue", "The number of pulses sent each second"],
      answer: 1,
      explain: "PD is the talking time of a single pulse: start of the pulse to end of that same pulse. Choice A is the tempting one — but start-of-pulse to start-of-next-pulse is PRP, which also includes the long listening time. C is SPL and D is PRF.",
      objectives: ["u03-o2"], lesson: "u03-l2", level: 1 },
    { id: "u03-q5", type: "mc", q: "A 2 MHz transducer emits pulses of 4 cycles. What is the pulse duration?",
      choices: ["0.5 µs", "2 µs", "4 µs", "8 µs"],
      answer: 1,
      explain: "Period = 1 ÷ 2 MHz = 0.5 µs, so PD = 4 × 0.5 = 2 µs. The trap is 8 µs, which comes from multiplying cycles by frequency instead of by period — always convert frequency to period first (or divide cycles by frequency: 4 ÷ 2 = 2 µs).",
      objectives: ["u03-o2"], lesson: "u03-l2", level: 3 },
    { id: "u03-q6", type: "short", q: "Which two quantities multiply together to give pulse duration?",
      answer: "cycles and period", accept: ["cycles and period", "number of cycles and period", "cycles x period", "cycles times period", "n cycles and period", "period and cycles"],
      explain: "PD = number of cycles × period. The number of cycles comes from damping; the period comes from the probe's frequency. Both are properties of the source, which is why PD cannot be changed by the sonographer.",
      objectives: ["u03-o2"], lesson: "u03-l2", level: 2 },
    { id: "u03-q7", type: "tf", q: "A sonographer can shorten the pulse duration by adjusting a control on the machine.",
      answer: false,
      explain: "False. PD is determined by the source only — the number of cycles (set by the damping material) and the period (set by the probe's frequency). The only way to change it is to pick up a different transducer.",
      objectives: ["u03-o2", "u03-o9"], lesson: "u03-l2", level: 2 },
    { id: "u03-q8", type: "mc", q: "A 5 MHz probe sends 3-cycle pulses into soft tissue. What is the spatial pulse length?",
      choices: ["0.31 mm", "0.6 mm", "0.92 mm", "1.54 mm"],
      answer: 2,
      explain: "λ = 1.54 ÷ 5 = 0.308 mm, so SPL = 3 × 0.308 ≈ 0.92 mm. Choice A is just one wavelength (you forgot to multiply by the cycles); 0.6 µs is the pulse duration of this pulse, not its length in space.",
      objectives: ["u03-o3"], lesson: "u03-l3", level: 3 },
    { id: "u03-q9", type: "mc", q: "Spatial pulse length equals:",
      choices: ["Number of cycles × period", "Number of cycles × wavelength", "Wavelength ÷ number of cycles", "PD ÷ PRP × 100"],
      answer: 1,
      explain: "SPL is a distance, so it must be built from a distance — the wavelength. Choice A gives pulse duration (a time). D is duty factor.",
      objectives: ["u03-o3"], lesson: "u03-l3", level: 1 },
    { id: "u03-q10", type: "short", q: "In what unit is spatial pulse length normally reported?",
      answer: "millimeters", accept: ["mm", "millimeter", "millimeters", "millimetres", "millimetre"],
      explain: "SPL is a length in space, typically 0.1–1 mm. If you answered microseconds you were thinking of pulse duration, which is the same pulse measured with a clock instead of a ruler.",
      objectives: ["u03-o3"], lesson: "u03-l3", level: 1 },
    { id: "u03-q11", type: "mc", q: "Which change will shorten the spatial pulse length?",
      choices: ["Increasing the imaging depth", "Increasing the transducer frequency", "Increasing the pulse repetition period", "Decreasing the duty factor"],
      answer: 1,
      explain: "Higher frequency → shorter wavelength → shorter SPL (and better axial resolution). Depth, PRP and duty factor describe the rhythm of the pulses, not the pulse itself; none of them can touch SPL.",
      objectives: ["u03-o3", "u03-o6"], lesson: "u03-l3", level: 2 },
    { id: "u03-q12", type: "mc", q: "Pulse repetition period is measured:",
      choices: ["From the start of one pulse to the end of that pulse", "From the end of one pulse to the start of the next", "From the start of one pulse to the start of the next", "From the start of the scan line to the end of the frame"],
      answer: 2,
      explain: "PRP is start-to-start, so it contains the pulse plus all of the listening time. Choice B (end-to-start) is the tempting one — that is the listening time alone, which is slightly shorter than PRP. Choice A is pulse duration.",
      objectives: ["u03-o4"], lesson: "u03-l4", level: 1 },
    { id: "u03-q13", type: "mc", q: "If the pulse repetition period is 200 µs, what is the pulse repetition frequency?",
      choices: ["2 kHz", "5 kHz", "20 kHz", "200 Hz"],
      answer: 1,
      explain: "PRF = 1 ÷ PRP = 1 ÷ 0.0002 s = 5,000 Hz = 5 kHz (or use the shortcut PRF in kHz = 1,000 ÷ PRP in µs). Answering 200 Hz means you copied the PRP number instead of inverting it.",
      objectives: ["u03-o4"], lesson: "u03-l4", level: 3 },
    { id: "u03-q14", type: "tf", q: "Pulse repetition period and pulse repetition frequency are reciprocals of each other.",
      answer: true,
      explain: "True — PRF = 1 ÷ PRP. Because they are reciprocals they always move in opposite directions: anything that lengthens PRP lowers PRF.",
      objectives: ["u03-o4"], lesson: "u03-l4", level: 1 },
    { id: "u03-q15", type: "short", q: "What is the unit of pulse repetition frequency?",
      answer: "hertz", accept: ["hz", "hertz", "khz", "kilohertz", "per second", "pulses per second", "1/s"],
      explain: "PRF counts events per second, so the unit is hertz (imaging values are usually quoted in kHz: 1–10 kHz). Microseconds would be the unit of PRP, the reciprocal quantity.",
      objectives: ["u03-o4"], lesson: "u03-l4", level: 1 },
    { id: "u03-q16", type: "mc", q: "A system is imaging to a depth of 15 cm. What is the shortest usable pulse repetition period?",
      choices: ["15 µs", "97.5 µs", "195 µs", "1,540 µs"],
      answer: 2,
      explain: "13 µs per cm round trip × 15 cm = 195 µs. Choice B (97.5 µs) uses 6.5 µs/cm, which is the one-way time — the pulse has to come back too, so you must use 13.",
      objectives: ["u03-o8"], lesson: "u03-l5", level: 3 },
    { id: "u03-q17", type: "mc", q: "A machine's pulse repetition period is 130 µs. What imaging depth does that correspond to?",
      choices: ["5 cm", "10 cm", "13 cm", "20 cm"],
      answer: 1,
      explain: "Depth = PRP ÷ 13 = 130 ÷ 13 = 10 cm. Choosing 13 cm means you matched the number 13 out of habit instead of dividing by it.",
      objectives: ["u03-o8"], lesson: "u03-l5", level: 3 },
    { id: "u03-q18", type: "short", q: "How many microseconds does sound need to travel 1 cm into soft tissue and back?",
      answer: "13", accept: ["13", "13 us", "13 µs", "13 microseconds", "thirteen"],
      explain: "At 1.54 mm/µs, a 2 cm round trip takes about 13 µs. Half of that, 6.5 µs, is the one-way time — a very common mix-up on exams.",
      objectives: ["u03-o8"], lesson: "u03-l5", level: 2 },
    { id: "u03-q19", type: "tf", q: "Increasing the imaging depth increases the pulse repetition frequency.",
      answer: false,
      explain: "False. Deeper imaging means the machine must wait longer for the deepest echoes, so PRP gets longer — and because PRF = 1 ÷ PRP, PRF goes down, not up.",
      objectives: ["u03-o4", "u03-o8"], lesson: "u03-l5", level: 2 },
    { id: "u03-q20", type: "mc", q: "Duty factor is:",
      choices: ["The fraction of time the system is transmitting", "The fraction of time the system is receiving", "The number of pulses per second", "The length of a pulse in millimeters"],
      answer: 0,
      explain: "DF = PD ÷ PRP × 100, the percentage of each cycle spent talking. Choice B is the leftover — for imaging that would be about 99 %, not the duty factor.",
      objectives: ["u03-o5"], lesson: "u03-l6", level: 1 },
    { id: "u03-q21", type: "mc", q: "A system has a pulse duration of 1 µs and a pulse repetition period of 500 µs. What is the duty factor?",
      choices: ["0.02 %", "0.2 %", "2 %", "5 %"],
      answer: 1,
      explain: "DF = 1 ÷ 500 × 100 = 0.2 %. Answering 0.002 (0.2 % written as a fraction) or forgetting the ×100 gives 0.002, and 2 % comes from slipping a decimal place — 0.2 % is right in the normal imaging band of 0.1–1 %.",
      objectives: ["u03-o5"], lesson: "u03-l6", level: 3 },
    { id: "u03-q22", type: "short", q: "Duty factor equals pulse duration divided by what?",
      answer: "pulse repetition period", accept: ["prp", "pulse repetition period", "the prp"],
      explain: "DF = PD ÷ PRP × 100. Dividing by pulse repetition frequency instead would give a nonsense unit — you must divide a time by a time so the units cancel.",
      objectives: ["u03-o5"], lesson: "u03-l6", level: 1 },
    { id: "u03-q23", type: "mc", q: "A sonographer increases imaging depth from 8 cm to 16 cm. What happens to the duty factor?",
      choices: ["It doubles", "It is cut roughly in half", "It is unchanged", "It becomes 100 %"],
      answer: 1,
      explain: "Doubling depth doubles PRP while PD stays fixed (the probe did not change), so DF = PD ÷ PRP is roughly halved. Choosing 'unchanged' confuses duty factor with pulse duration, which really is unchanged here.",
      objectives: ["u03-o5", "u03-o6"], lesson: "u03-l6", level: 3 },
    { id: "u03-q24", type: "mc", q: "Increasing the damping in a transducer does which of the following?",
      choices: ["Lengthens the pulse and narrows the bandwidth", "Shortens the pulse and widens the bandwidth", "Shortens the pulse and raises the Q-factor", "Has no effect on spatial pulse length"],
      answer: 1,
      explain: "Damping stops the ring-down early: fewer cycles → shorter PD and SPL, and a shorter pulse contains a wider range of frequencies → wider bandwidth. Choice C is tempting but backwards on Q: wider bandwidth means a LOWER Q-factor.",
      objectives: ["u03-o7"], lesson: "u03-l7", level: 2 },
    { id: "u03-q25", type: "tf", q: "Heavy damping increases the Q-factor of a transducer.",
      answer: false,
      explain: "False. Q = main frequency ÷ bandwidth. Damping widens the bandwidth, so Q goes down. Imaging probes are deliberately low-Q; CW Doppler probes are high-Q and barely damped.",
      objectives: ["u03-o7"], lesson: "u03-l7", level: 2 },
    { id: "u03-q26", type: "short", q: "What is the name of the material behind the PZT that shortens the pulse?",
      answer: "damping material", accept: ["damping material", "damping", "backing material", "backing", "backing layer", "damping element", "damping layer"],
      explain: "The damping (backing) layer, typically tungsten-loaded epoxy, absorbs the crystal's ring-down. Do not confuse it with the matching layer, which sits in FRONT of the element to improve transmission into skin.",
      objectives: ["u03-o7"], lesson: "u03-l7", level: 1 },
    { id: "u03-q27", type: "mc", q: "Damping improves which resolution, and why?",
      choices: ["Temporal, because PRF rises", "Lateral, because the beam narrows", "Axial, because spatial pulse length shortens", "Contrast, because amplitude rises"],
      answer: 2,
      explain: "Axial resolution = SPL ÷ 2, and damping shortens SPL, so axial resolution improves. Damping does not change PRF (that is depth's job) or beam width (that is aperture and focusing), and it lowers — not raises — amplitude.",
      objectives: ["u03-o7", "u03-o3"], lesson: "u03-l7", level: 2 },
    { id: "u03-q28", type: "mc", q: "A sonographer switches from a 3 MHz probe to a 6 MHz probe, all else equal. Which quantity decreases?",
      choices: ["Pulse repetition period", "Pulse repetition frequency", "Spatial pulse length", "Duty factor"],
      answer: 2,
      explain: "Doubling frequency halves both the period and the wavelength, so PD and SPL are both cut in half. PRP, PRF and duty factor are set by imaging depth, which did not change — that is what makes them tempting but wrong.",
      objectives: ["u03-o6"], lesson: "u03-l8", level: 3 },
    { id: "u03-q29", type: "mc", q: "Which pulsed-wave parameter can the sonographer actually change during a scan?",
      choices: ["Pulse duration", "Spatial pulse length", "Pulse repetition frequency", "Number of cycles per pulse"],
      answer: 2,
      explain: "PRF changes whenever depth changes, and depth is a console control. PD, SPL and the cycles per pulse are all locked into the transducer's design — the only way to change them is to use a different probe.",
      objectives: ["u03-o9"], lesson: "u03-l8", level: 2 },
    { id: "u03-q30", type: "tf", q: "Spatial pulse length is determined by both the source and the medium.",
      answer: true,
      explain: "True — the source picks the number of cycles and the frequency, while the medium's propagation speed determines the wavelength. Pulse duration, by contrast, is source-only, because a period does not care what tissue it is in.",
      objectives: ["u03-o9", "u03-o3"], lesson: "u03-l8", level: 1 },
    { id: "u03-q31", type: "mc", q: "Imaging depth is reduced from 20 cm to 10 cm. What happens to PRF and to pulse duration?",
      choices: ["PRF doubles; PD unchanged", "PRF halves; PD unchanged", "PRF doubles; PD halves", "Both are unchanged"],
      answer: 0,
      explain: "Half the depth means half the wait: PRP goes from 260 µs to 130 µs, so PRF roughly doubles (about 3,850 Hz to 7,700 Hz). PD is a property of the probe and does not move — choice C is the classic overreach.",
      objectives: ["u03-o6", "u03-o8"], lesson: "u03-l8", level: 3 },
    { id: "u03-q32", type: "short", q: "Which single console control changes PRP, PRF and duty factor?",
      answer: "depth", accept: ["depth", "imaging depth", "the depth control", "depth control"],
      explain: "Depth is the only door the sonographer has into this unit. Changing output power or gain changes amplitude and brightness, not the timing of the pulses.",
      objectives: ["u03-o9", "u03-o6"], lesson: "u03-l8", level: 2 },
    { id: "u03-q33", type: "mc", q: "Why must diagnostic imaging use pulsed rather than continuous sound?",
      choices: ["Pulses are more powerful than continuous sound", "The machine needs quiet time to measure echo travel time and assign depth", "Pulsed sound travels faster through tissue", "Continuous sound cannot be focused"],
      answer: 1,
      explain: "Depth comes from timing: the machine knows when it sent the pulse and measures how long the echo takes to return. Speed is a property of the medium, so pulsing cannot make sound travel faster — and pulses are not inherently more powerful.",
      objectives: ["u03-o1", "u03-o9"], lesson: "u03-l1", level: 2 },
    { id: "u03-q34", type: "mc", q: "Which pulse has the shorter pulse duration: 2 cycles at 10 MHz, or 4 cycles at 5 MHz?",
      choices: ["2 cycles at 10 MHz (0.2 µs)", "4 cycles at 5 MHz (0.8 µs)", "They are identical", "Cannot be determined without the PRP"],
      answer: 0,
      explain: "PD = cycles ÷ frequency: 2 ÷ 10 = 0.2 µs versus 4 ÷ 5 = 0.8 µs. PRP is irrelevant here — it describes how often pulses are sent, not how long each one lasts.",
      objectives: ["u03-o2", "u03-o6"], lesson: "u03-l2", level: 3 },
    { id: "u03-q35", type: "tf", q: "A duty factor of 100 % describes continuous wave sound.",
      answer: true,
      explain: "True — 100 % means transmitting all of the time, which is the definition of CW. Imaging systems sit at 0.1–1 %, and a frozen system is at 0 %.",
      objectives: ["u03-o5", "u03-o1"], lesson: "u03-l6", level: 2 },
    { id: "u03-q36", type: "mc", q: "Which set of values is typical for clinical imaging?",
      choices: ["PD 0.5–3 µs, PRF 1–10 kHz, DF 0.1–1 %", "PD 0.5–3 ms, PRF 1–10 Hz, DF 10–20 %", "PD 5–10 µs, PRF 1–10 MHz, DF 50 %", "PD 0.1–1 mm, PRF 100–500 Hz, DF 5 %"],
      answer: 0,
      explain: "Those are the three ranges to memorize. Choice D is the sneaky one: 0.1–1 mm is a real number in this unit, but it is spatial pulse length — a distance — not pulse duration, which must be in microseconds.",
      objectives: ["u03-o6", "u03-o4"], lesson: "u03-l8", level: 2 }
  ],

  drills: [
    {
      id: "u03-d1", title: "Pulse duration from cycles and frequency", formula: "PD = # cycles × period = # cycles ÷ f (MHz)", lesson: "u03-l2",
      gen: function (rnd) {
        var cycles = [2, 3, 4, 5, 6][Math.floor(rnd() * 5)];
        var f = [2, 2.5, 4, 5, 8, 10][Math.floor(rnd() * 6)];
        var period = 1 / f;
        var pd = cycles / f;
        return {
          kind: "number",
          given: "A transducer with a frequency of " + f + " MHz emits pulses containing " + cycles + " cycles.",
          ask: "What is the pulse duration, in microseconds?",
          answer: +pd.toFixed(4), unit: "µs", tol: 0.02,
          steps: [
            "period (µs) = 1 ÷ f (MHz) = 1 ÷ " + f + " = " + period.toFixed(3) + " µs",
            "PD = # cycles × period = " + cycles + " × " + period.toFixed(3),
            "PD = " + pd.toFixed(3) + " µs",
            "Sanity check: typical pulse durations are 0.5–3 µs, and only the source can change this."
          ]
        };
      }
    },
    {
      id: "u03-d2", title: "Spatial pulse length from cycles and wavelength", formula: "SPL = # cycles × wavelength; λ (mm) = 1.54 ÷ f (MHz)", lesson: "u03-l3",
      gen: function (rnd) {
        var cycles = [2, 3, 4, 5][Math.floor(rnd() * 4)];
        var f = [2, 2.5, 3.5, 5, 7, 10][Math.floor(rnd() * 6)];
        var lambda = 1.54 / f;
        var spl = cycles * lambda;
        return {
          kind: "number",
          given: "A " + f + " MHz probe sends " + cycles + "-cycle pulses into soft tissue (c = 1.54 mm/µs).",
          ask: "What is the spatial pulse length, in millimeters?",
          answer: +spl.toFixed(4), unit: "mm", tol: 0.03,
          steps: [
            "λ (mm) = 1.54 ÷ f (MHz) = 1.54 ÷ " + f + " = " + lambda.toFixed(3) + " mm",
            "SPL = # cycles × λ = " + cycles + " × " + lambda.toFixed(3),
            "SPL = " + spl.toFixed(3) + " mm",
            "Axial resolution would be SPL ÷ 2 = " + (spl / 2).toFixed(3) + " mm"
          ]
        };
      }
    },
    {
      id: "u03-d3", title: "PRF from PRP and PRP from PRF", formula: "PRF = 1 ÷ PRP; PRF (kHz) = 1,000 ÷ PRP (µs)", lesson: "u03-l4",
      gen: function (rnd) {
        var prps = [100, 125, 200, 250, 400, 500, 625, 800];
        var prp = prps[Math.floor(rnd() * prps.length)];
        var prf = 1000 / prp;
        var forward = rnd() < 0.5;
        if (forward) {
          return {
            kind: "number",
            given: "The pulse repetition period is " + prp + " µs.",
            ask: "What is the pulse repetition frequency, in kHz?",
            answer: +prf.toFixed(4), unit: "kHz", tol: 0.05,
            steps: [
              "PRF = 1 ÷ PRP",
              "Shortcut with microseconds: PRF (kHz) = 1,000 ÷ PRP (µs) = 1,000 ÷ " + prp,
              "PRF = " + prf.toFixed(2) + " kHz (" + (prf * 1000).toFixed(0) + " Hz)",
              "Typical imaging PRF is 1–10 kHz."
            ]
          };
        }
        return {
          kind: "number",
          given: "The pulse repetition frequency is " + prf.toFixed(2) + " kHz.",
          ask: "What is the pulse repetition period, in microseconds?",
          answer: +prp.toFixed(2), unit: "µs", tol: 2,
          steps: [
            "PRP = 1 ÷ PRF",
            "Shortcut: PRP (µs) = 1,000 ÷ PRF (kHz) = 1,000 ÷ " + prf.toFixed(2),
            "PRP = " + prp + " µs",
            "Typical imaging PRP is 100 µs – 1 ms."
          ]
        };
      }
    },
    {
      id: "u03-d4", title: "Duty factor from PD and PRP", formula: "DF (%) = PD ÷ PRP × 100", lesson: "u03-l6",
      gen: function (rnd) {
        var pd = [0.5, 1, 1.5, 2, 2.5, 3][Math.floor(rnd() * 6)];
        var prp = [100, 130, 200, 250, 400, 500][Math.floor(rnd() * 6)];
        var df = pd / prp * 100;
        return {
          kind: "number",
          given: "PD = " + pd + " µs and PRP = " + prp + " µs.",
          ask: "What is the duty factor, in percent?",
          answer: +df.toFixed(4), unit: "%", tol: 0.01,
          steps: [
            "Both are times in the same units, so they divide cleanly.",
            "DF = PD ÷ PRP × 100 = " + pd + " ÷ " + prp + " × 100",
            "DF = " + df.toFixed(3) + " %",
            "Imaging duty factors live between 0.1 % and 1 %; CW is 100 %."
          ]
        };
      }
    },
    {
      id: "u03-d5", title: "PRP and PRF from imaging depth (13 µs rule)", formula: "PRP (µs) = 13 × depth (cm); PRF = 1 ÷ PRP", lesson: "u03-l5",
      gen: function (rnd) {
        var depth = [2, 4, 5, 8, 10, 12, 15, 18, 20][Math.floor(rnd() * 9)];
        var prp = 13 * depth;
        var prf = 1000000 / prp;
        var askPrf = rnd() < 0.5;
        if (askPrf) {
          return {
            kind: "number",
            given: "The system is imaging to a depth of " + depth + " cm in soft tissue.",
            ask: "What is the pulse repetition frequency, in Hz?",
            answer: +prf.toFixed(1), unit: "Hz", tol: Math.max(20, prf * 0.03),
            steps: [
              "PRP = 13 µs/cm × depth = 13 × " + depth + " = " + prp + " µs",
              "PRF = 1 ÷ PRP = 1,000,000 ÷ " + prp + " µs",
              "PRF ≈ " + prf.toFixed(0) + " Hz (shortcut: 77,000 ÷ " + depth + " ≈ " + (77000 / depth).toFixed(0) + " Hz)",
              "Deeper imaging would lower this; shallower would raise it."
            ]
          };
        }
        return {
          kind: "number",
          given: "The system is imaging to a depth of " + depth + " cm in soft tissue.",
          ask: "What is the shortest usable pulse repetition period, in microseconds?",
          answer: prp, unit: "µs", tol: 1,
          steps: [
            "Sound needs 13 µs for every centimeter, down and back.",
            "PRP = 13 × " + depth + " cm",
            "PRP = " + prp + " µs",
            "Firing sooner than this would put deep echoes at the wrong depth (range ambiguity)."
          ]
        };
      }
    },
    {
      id: "u03-d6", title: "What happens when depth changes?", formula: "↑ depth → ↑ PRP → ↓ PRF → ↓ duty factor", lesson: "u03-l8",
      gen: function (rnd) {
        var deeper = rnd() < 0.5;
        var params = ["the pulse repetition period", "the pulse repetition frequency", "the duty factor", "the pulse duration", "the spatial pulse length"];
        var i = Math.floor(rnd() * params.length);
        var p = params[i];
        var ans;
        if (i === 0) ans = deeper ? 0 : 1;
        else if (i === 1 || i === 2) ans = deeper ? 1 : 0;
        else ans = 2;
        return {
          kind: "choice",
          given: "The sonographer " + (deeper ? "increases" : "decreases") + " the imaging depth. Nothing else is changed.",
          ask: "What happens to " + p + "?",
          choices: ["Increases", "Decreases", "Stays the same"],
          answer: ans,
          steps: [
            deeper ? "Deeper → the machine must listen longer → PRP increases." : "Shallower → less listening time needed → PRP decreases.",
            "PRF = 1 ÷ PRP, so PRF moves the opposite way from PRP.",
            "DF = PD ÷ PRP, and PD never moves, so duty factor follows PRF.",
            "PD and SPL belong to the transducer — depth cannot touch them."
          ]
        };
      }
    },
    {
      id: "u03-d7", title: "What happens when frequency changes?", formula: "↑ f → ↓ period, ↓ λ → ↓ PD, ↓ SPL (PRP, PRF, DF unchanged)", lesson: "u03-l8",
      gen: function (rnd) {
        var higher = rnd() < 0.5;
        var params = ["the pulse duration", "the spatial pulse length", "the period", "the wavelength", "the pulse repetition frequency", "the duty factor"];
        var i = Math.floor(rnd() * params.length);
        var p = params[i];
        var ans = (i <= 3) ? (higher ? 1 : 0) : 2;
        return {
          kind: "choice",
          given: "The sonographer swaps to a probe with a " + (higher ? "higher" : "lower") + " frequency, keeping the same imaging depth and the same number of cycles per pulse.",
          ask: "What happens to " + p + "?",
          choices: ["Increases", "Decreases", "Stays the same"],
          answer: ans,
          steps: [
            (higher ? "Higher" : "Lower") + " frequency → period and wavelength move the opposite way (both are inversely related to frequency).",
            "PD = cycles × period and SPL = cycles × wavelength, so both follow the period and wavelength.",
            "PRP, PRF and duty factor are set by imaging depth, which did not change.",
            "Answer: " + (i <= 3 ? (higher ? "decreases" : "increases") : "stays the same") + "."
          ]
        };
      }
    }
  ],

  whiteboard: [
    {
      id: "u03-w1", prompt: "Brain-dump the five pulsed-wave parameters. For each: symbol, formula, units, typical value, who determines it, and whether the sonographer can change it.", minutes: 8, lesson: "u03-l8",
      keyPoints: [
        "PD = # cycles × period; µs; 0.5–3 µs; source only; sonographer cannot change",
        "SPL = # cycles × wavelength; mm; 0.1–1 mm; source and medium; sonographer cannot change",
        "PRP = start of one pulse to start of next; µs–ms; 100 µs–1 ms; machine via depth; yes, via depth",
        "PRF = 1 ÷ PRP; Hz; 1–10 kHz; machine via depth; yes, via depth",
        "Duty factor = PD ÷ PRP × 100; unitless %; 0.1–1 %; machine via depth; yes, via depth",
        "CW duty factor = 100 %; frozen system = 0 %",
        "Axial resolution = SPL ÷ 2 — the reason SPL matters",
        "Depth is the sonographer's only control over any of these"
      ]
    },
    {
      id: "u03-w2", prompt: "Draw the 13 µs rule from scratch: derive it from the speed of sound, then write PRP and PRF for 5 cm, 10 cm and 20 cm of depth.", minutes: 6, lesson: "u03-l5",
      keyPoints: [
        "Soft tissue speed = 1,540 m/s = 1.54 mm/µs",
        "1 cm deep = 2 cm of travel = 20 mm; 20 ÷ 1.54 ≈ 13 µs",
        "6.5 µs/cm one way, 13 µs/cm round trip",
        "5 cm → PRP 65 µs → PRF ≈ 15,400 Hz",
        "10 cm → PRP 130 µs → PRF ≈ 7,700 Hz",
        "20 cm → PRP 260 µs → PRF ≈ 3,850 Hz",
        "PRF (Hz) ≈ 77,000 ÷ depth (cm)",
        "Firing before the echoes return causes range ambiguity"
      ]
    },
    {
      id: "u03-w3", prompt: "Write the two cause-and-effect chains (depth chain and frequency chain) and mark clearly which parameters do NOT move in each.", minutes: 5, lesson: "u03-l8",
      keyPoints: [
        "Depth chain: ↑ depth → ↑ PRP → ↓ PRF → ↓ duty factor",
        "In the depth chain, PD and SPL do not move",
        "Frequency chain: ↑ frequency → ↓ period → ↓ PD",
        "Frequency chain: ↑ frequency → ↓ wavelength → ↓ SPL → better axial resolution",
        "In the frequency chain, PRP, PRF and duty factor do not move",
        "Higher frequency also means less penetration (attenuation rises with frequency)",
        "Damping chain: ↑ damping → fewer cycles → ↓ PD and ↓ SPL, ↑ bandwidth, ↓ Q"
      ]
    },
    {
      id: "u03-w4", prompt: "Compare continuous wave and pulsed wave sound, and explain damping and everything it changes.", minutes: 6, lesson: "u03-l7",
      keyPoints: [
        "CW: two active elements, transmits nonstop, duty factor 100 %, no depth information",
        "PW: one element sends then listens, duty factor 0.1–1 %, depth from echo timing",
        "CW probes are lightly damped: long pulses, narrow bandwidth, high Q",
        "Damping material = backing layer behind the PZT (tungsten-loaded epoxy)",
        "Damping shortens pulse duration and spatial pulse length",
        "Damping widens bandwidth and lowers the Q-factor",
        "Damping improves axial resolution (SPL ÷ 2)",
        "Damping lowers amplitude and sensitivity — the price of a short pulse",
        "Damping is set by the manufacturer, not by the sonographer"
      ]
    }
  ]
});
