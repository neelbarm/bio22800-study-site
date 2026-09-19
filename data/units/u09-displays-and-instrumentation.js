window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u09",
  order: 9,
  title: "Displays & Imaging Instrumentation",
  icon: "🖥️",
  bookRef: "Edelman, Understanding Ultrasound Physics (4th ed.) — imaging display modes, system components, receiver functions, scan conversion and image processing chapters",
  blurb: "How a machine turns returning echoes into a picture: the display modes (A, B, M), the block diagram from pulser to monitor, the five receiver functions in order, and how digital memory (pixels, bits, pre- vs post-processing) shapes what you finally see.",

  objectives: [
    { id: "u09-o1", text: "Compare A-mode, B-mode and M-mode displays: state what each axis represents, what the display shows, and a clinical use for each." },
    { id: "u09-o2", text: "List the components of the imaging system block diagram in order (pulser, beamformer, transducer, receiver, scan converter, display, storage) and state the job of each." },
    { id: "u09-o3", text: "List the five receiver functions in their correct order and state which are operator-adjustable and which visibly change the image." },
    { id: "u09-o4", text: "Explain amplification (gain) and compensation (TGC/DGC), identify the parts of the TGC curve, and state what each does to the displayed image and to patient exposure." },
    { id: "u09-o5", text: "Define dynamic range in dB, explain compression, and predict how changing dynamic range changes gray-scale contrast." },
    { id: "u09-o6", text: "Explain demodulation (rectification and smoothing) and reject, and state which of the two the operator controls." },
    { id: "u09-o7", text: "Compare analog and digital scan converters, and calculate the number of gray shades from the number of bits (2 to the n) and the bits needed for a given number of shades." },
    { id: "u09-o8", text: "Distinguish pre-processing from post-processing, classify common functions as one or the other, and compare write magnification with read magnification." },
    { id: "u09-o9", text: "Describe display and archiving technology: CRT versus flat-panel displays, PACS and DICOM." },
    { id: "u09-o10", text: "Describe coded excitation, spatial compounding, frequency compounding, elastography and 3D/4D imaging, and state the trade-off each one carries." }
  ],

  lessons: [
    {
      id: "u09-l1",
      title: "A-mode, B-mode, M-mode",
      objectives: ["u09-o1"],
      html: `<p class="lead">Three ways to draw the same returning echoes: as spikes, as dots, or as a moving trace.</p>
<p>Picture one pulse going straight down into tissue. Echoes come back at different times and with different strengths. Every display mode on the machine is just a different way of drawing that one list of "how deep, how loud".</p>
<p><span class="kw">A-mode</span> (amplitude mode) draws a spike for each echo. Distance along the bottom of the screen is <b>depth</b>; the <b>height</b> of the spike is the <b>amplitude</b> of that echo. It is one-dimensional, it is the oldest display, and today you meet it mostly in ophthalmology and in physics questions.</p>
<p><span class="kw">B-mode</span> (brightness mode) takes those same spikes and replaces each one with a <b>dot</b>. A tall spike becomes a bright dot, a small spike becomes a dark gray dot. Sweep that scan line across the body a few hundred times and the dots line up into the familiar <b>two-dimensional gray-scale picture</b>. Everything you think of as "an ultrasound image" is B-mode, updated in real time.</p>
<p><span class="kw">M-mode</span> (motion mode) parks the beam on <b>one single scan line</b> and plots the dots from that line over and over, moving the trace sideways as <b>time</b> passes. Depth runs down the screen, time runs across it. Stationary tissue draws a straight horizontal line; a moving mitral valve draws a wiggle. Because only one line has to be fired, M-mode has the <b>highest temporal resolution</b> of any mode — it is the mode for timing cardiac and fetal-heart motion, not for anatomy.</p>
<div class="callout key">A = amplitude spikes vs depth (1D). B = brightness dots, 2D gray-scale, real time. M = one line, motion vs time, best temporal resolution.</div>
<div class="callout warn">Trap: M-mode is not "better resolution" in general. Its axial and lateral resolution are ordinary — only its <i>temporal</i> resolution is outstanding, because it fires one line instead of a whole frame.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 300" role="img"><title>A-mode spikes, B-mode dots and M-mode trace drawn side by side</title>
<text x="20" y="26" fill="currentColor" font-size="17">A-MODE</text>
<text x="215" y="26" fill="currentColor" font-size="17">B-MODE</text>
<text x="410" y="26" fill="currentColor" font-size="17">M-MODE</text>
<path d="M20 160 L190 160" stroke="currentColor" fill="none"/>
<path d="M45 160 L45 100 M45 160 L45 100" stroke="var(--c1)" fill="none"/>
<path d="M80 160 L80 70" stroke="var(--c1)" fill="none"/>
<path d="M120 160 L120 128" stroke="var(--c1)" fill="none"/>
<path d="M165 160 L165 90" stroke="var(--c1)" fill="none"/>
<text x="20" y="196" fill="currentColor" font-size="15">across = depth</text>
<text x="20" y="218" fill="currentColor" font-size="15">height = amplitude</text>
<text x="20" y="240" fill="currentColor" font-size="15">1 line, no picture</text>
<rect x="215" y="55" width="170" height="105" stroke="currentColor" fill="none"/>
<circle cx="245" cy="85" r="7" fill="currentColor"/>
<circle cx="280" cy="75" r="7" fill="currentColor" fill-opacity="0.35"/>
<circle cx="320" cy="110" r="7" fill="currentColor" fill-opacity="0.7"/>
<circle cx="355" cy="95" r="7" fill="currentColor" fill-opacity="0.2"/>
<circle cx="260" cy="135" r="7" fill="currentColor" fill-opacity="0.5"/>
<circle cx="340" cy="140" r="7" fill="currentColor"/>
<text x="215" y="196" fill="currentColor" font-size="15">spike becomes a dot</text>
<text x="215" y="218" fill="currentColor" font-size="15">bright = strong echo</text>
<text x="215" y="240" fill="currentColor" font-size="15">2D, real time</text>
<rect x="410" y="55" width="170" height="105" stroke="currentColor" fill="none"/>
<path d="M410 80 L580 80" stroke="var(--muted)" fill="none"/>
<path d="M410 130 C 440 100, 470 155, 500 130 C 530 105, 555 150, 580 128" stroke="var(--c2)" fill="none"/>
<text x="410" y="196" fill="currentColor" font-size="15">one line only</text>
<text x="410" y="218" fill="currentColor" font-size="15">down = depth</text>
<text x="410" y="240" fill="currentColor" font-size="15">across = time</text>
</svg>`,
          caption: "Same echoes, three drawings: spikes (A), dots (B), and one line replayed over time (M)."
        }
      ],
      sayIt: "Out loud: for A, B and M mode, say what the horizontal axis is, what the vertical axis is, and one clinical use.",
      keyPoints: [
        "A-mode: amplitude spikes, horizontal axis = depth, 1D, ophthalmology",
        "B-mode: brightness dots, 2D gray-scale real-time anatomy image",
        "M-mode: single scan line, depth down, time across",
        "M-mode has the best temporal resolution (only one line to fire)",
        "All three come from the same echo data: depth from time, brightness from amplitude"
      ]
    },

    {
      id: "u09-l2",
      title: "The system block diagram",
      objectives: ["u09-o2"],
      html: `<p class="lead">Seven boxes, one round trip: voltage out, echo back, picture on the screen.</p>
<p>The <span class="kw">pulser</span> (transmitter) is the machine's spark plug. It creates the electrical voltage — typically tens to a few hundred volts — that shocks the crystal into ringing, and it decides <b>how often</b> to do it (the <b>PRF</b>). Turning up <b>output power / acoustic power / transmit gain</b> tells the pulser to send bigger voltage, which means a louder pulse, brighter echoes <b>and more patient exposure</b>. It is the most direct exposure control; transmit focusing, mode/PRF, coded excitation and dwell time can also change exposure.</p>
<p>The <span class="kw">beamformer</span> is the brain of an array. On transmit it hands the pulser's voltage to each element at a slightly different <b>time delay</b>, which steers and focuses the beam; it also uses <span class="kw-2">apodization</span> (driving outer elements more gently) to shrink grating and side lobes. On receive it re-aligns the echoes from all the elements before they are summed.</p>
<p>The <span class="kw">transducer</span> converts voltage to sound (transmit) and sound back to voltage (receive) — the piezoelectric effect running in both directions.</p>
<p>The <span class="kw">receiver</span> takes the tiny returning voltages and performs five processing steps on them (next lesson) so they can be displayed.</p>
<p>The <span class="kw">scan converter</span> is the translator and the memory: it stores the processed echoes as a grid of numbers and converts the transducer's scan-line geometry (sector, curved, linear) into the rectangular raster the monitor needs.</p>
<p>The <span class="kw">display</span> shows it, and <span class="kw">storage</span> (hard drive, PACS) keeps it.</p>
<div class="callout key">Pulser → beamformer → transducer → patient → transducer → receiver → scan converter → display / storage.</div>
<div class="callout tip">Only the pulser changes what goes <i>into</i> the patient. Everything after the transducer only changes what the echoes <i>look like</i>.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 290" role="img"><title>Block diagram of an ultrasound imaging system from pulser to display and storage</title>
<rect x="15" y="40" width="110" height="46" stroke="var(--c1)" fill="none"/><text x="34" y="69" fill="currentColor" font-size="16">Pulser</text>
<rect x="160" y="40" width="110" height="46" stroke="var(--c1)" fill="none"/><text x="168" y="69" fill="currentColor" font-size="16">Beamformer</text>
<rect x="305" y="40" width="110" height="46" stroke="var(--c1)" fill="none"/><text x="312" y="69" fill="currentColor" font-size="16">Transducer</text>
<rect x="450" y="40" width="110" height="46" stroke="var(--c2)" fill="none" stroke-dasharray="6 5"/><text x="482" y="69" fill="currentColor" font-size="16">Tissue</text>
<path d="M125 63 L158 63 M270 63 L303 63 M415 63 L448 63" stroke="currentColor" fill="none"/>
<path d="M505 88 L505 115 L60 115 L60 168" stroke="var(--c2)" fill="none"/>
<text x="190" y="110" fill="currentColor" font-size="15">echoes come back</text>
<rect x="15" y="170" width="110" height="46" stroke="var(--c3)" fill="none"/><text x="38" y="199" fill="currentColor" font-size="16">Receiver</text>
<rect x="160" y="170" width="110" height="46" stroke="var(--c3)" fill="none"/><text x="163" y="192" fill="currentColor" font-size="15">Scan</text><text x="163" y="210" fill="currentColor" font-size="15">converter</text>
<rect x="305" y="170" width="110" height="46" stroke="var(--c3)" fill="none"/><text x="330" y="199" fill="currentColor" font-size="16">Display</text>
<rect x="450" y="170" width="110" height="46" stroke="var(--c3)" fill="none"/><text x="472" y="199" fill="currentColor" font-size="16">Storage</text>
<path d="M125 193 L158 193 M270 193 L303 193 M415 193 L448 193" stroke="currentColor" fill="none"/>
<text x="15" y="250" fill="currentColor" font-size="15">pulser sets voltage and PRF</text>
<text x="15" y="272" fill="currentColor" font-size="15">beamformer sets delays: steering and focusing</text>
</svg>`,
          caption: "The round trip. Top row goes out, bottom row comes back."
        }
      ],
      sayIt: "Out loud, in order: name every block from pulser to storage and give each one a one-sentence job description.",
      keyPoints: [
        "Pulser: makes the voltage, sets amplitude (output power) and PRF",
        "Beamformer: time delays for steering and focusing, plus apodization",
        "Transducer: voltage to sound and sound back to voltage",
        "Receiver: five processing steps on the returning signals",
        "Scan converter: memory plus geometry translation to a raster image",
        "Display and storage (PACS) finish the chain",
        "Only the pulser's output changes patient exposure"
      ]
    },

    {
      id: "u09-l3",
      title: "The receiver's five jobs, in order",
      objectives: ["u09-o3"],
      html: `<p class="lead">Five steps, always in this order: amplify, compensate, compress, demodulate, reject.</p>
<p>The echoes arriving at the transducer are almost absurdly weak — microvolt-level signals riding on electronic noise, with the deepest echoes thousands of times smaller than the shallowest ones. The receiver's whole purpose is to turn that mess into something a monitor can draw. It does it in a fixed pipeline, and exam questions love the order.</p>
<table class="dt"><tr><th>Step</th><th>Job</th><th>Operator adjusts?</th><th>Visible on image?</th></tr>
<tr><td>1. Amplification</td><td>Boost every signal equally (gain, in dB)</td><td>Yes</td><td>Yes — overall brightness</td></tr>
<tr><td>2. Compensation (TGC)</td><td>Boost deep signals more, to undo attenuation</td><td>Yes</td><td>Yes — brightness vs depth</td></tr>
<tr><td>3. Compression</td><td>Squeeze the dynamic range into what the display can show</td><td>Yes</td><td>Yes — gray-scale contrast</td></tr>
<tr><td>4. Demodulation</td><td>Rectify and smooth the signal into an envelope</td><td>No</td><td>No visible change</td></tr>
<tr><td>5. Reject (threshold)</td><td>Erase low-level noise</td><td>Yes</td><td>Yes — background clutter</td></tr></table>
<p>Four of the five are operator-adjustable; <span class="kw">demodulation</span> is the odd one out — no knob, no visible effect, it just prepares the signal electronically. None of these five changes the sound going into the patient; they are all applied to echoes that have already come back.</p>
<div class="callout tip">Dumb saying: <b>"All Cows Can Digest Roughage"</b> — Amplification, Compensation, Compression, Demodulation, Reject.</div>
<div class="callout warn">Trap: a question that says "which receiver function has no effect on the image and cannot be adjusted?" is asking for demodulation. Reject <i>is</i> adjustable, even though it also happens late in the chain.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>The five receiver functions in order with their controls</title>
<text x="55" y="38" fill="currentColor" font-size="15">1</text><text x="170" y="38" fill="currentColor" font-size="15">2</text><text x="285" y="38" fill="currentColor" font-size="15">3</text><text x="400" y="38" fill="currentColor" font-size="15">4</text><text x="515" y="38" fill="currentColor" font-size="15">5</text>
<rect x="15" y="48" width="100" height="52" stroke="var(--c1)" fill="none"/><text x="24" y="80" fill="currentColor" font-size="15">Amplify</text>
<rect x="130" y="48" width="100" height="52" stroke="var(--c1)" fill="none"/><text x="133" y="72" fill="currentColor" font-size="15">Compen-</text><text x="133" y="90" fill="currentColor" font-size="15">sate</text>
<rect x="245" y="48" width="100" height="52" stroke="var(--c1)" fill="none"/><text x="250" y="80" fill="currentColor" font-size="15">Compress</text>
<rect x="360" y="48" width="100" height="52" stroke="var(--c1)" fill="none"/><text x="366" y="72" fill="currentColor" font-size="15">Demodu-</text><text x="366" y="90" fill="currentColor" font-size="15">late</text>
<rect x="475" y="48" width="100" height="52" stroke="var(--c1)" fill="none"/><text x="495" y="80" fill="currentColor" font-size="15">Reject</text>
<path d="M115 74 L128 74 M230 74 L243 74 M345 74 L358 74 M460 74 L473 74" stroke="currentColor" fill="none"/>
<text x="15" y="132" fill="currentColor" font-size="15">gain, dB</text>
<text x="130" y="132" fill="currentColor" font-size="15">TGC / DGC</text>
<text x="245" y="132" fill="currentColor" font-size="15">dyn range</text>
<text x="360" y="132" fill="currentColor" font-size="15">rectify +</text>
<text x="475" y="132" fill="currentColor" font-size="15">threshold</text>
<text x="15" y="154" fill="currentColor" font-size="15">all equally</text>
<text x="130" y="154" fill="currentColor" font-size="15">deep more</text>
<text x="245" y="154" fill="currentColor" font-size="15">squeeze</text>
<text x="360" y="154" fill="currentColor" font-size="15">smooth</text>
<text x="475" y="154" fill="currentColor" font-size="15">cut noise</text>
<text x="15" y="182" fill="var(--c3)" font-size="15">knob: yes</text>
<text x="130" y="182" fill="var(--c3)" font-size="15">knob: yes</text>
<text x="245" y="182" fill="var(--c3)" font-size="15">knob: yes</text>
<text x="360" y="182" fill="var(--c2)" font-size="15">knob: NO</text>
<text x="475" y="182" fill="var(--c3)" font-size="15">knob: yes</text>
<text x="15" y="222" fill="currentColor" font-size="16">All Cows Can Digest Roughage</text>
</svg>`,
          caption: "The receiver pipeline, in order, with which steps have a knob."
        }
      ],
      sayIt: "Out loud: the five receiver functions in order, and for each one say whether the operator can adjust it and whether it changes the picture.",
      keyPoints: [
        "Order: amplification, compensation, compression, demodulation, reject",
        "Mnemonic: All Cows Can Digest Roughage",
        "Four of five are operator-adjustable; demodulation is not",
        "Demodulation is the only one with no visible image effect",
        "None of the five changes acoustic output to the patient"
      ]
    },

    {
      id: "u09-l4",
      title: "Amplification and time gain compensation",
      objectives: ["u09-o4"],
      html: `<p class="lead">Gain turns up the whole room; TGC turns up only the people sitting in the back.</p>
<p><span class="kw">Amplification</span> (the <b>gain</b> control) multiplies <b>every</b> returning signal by the same factor, shallow and deep alike. It is measured in <b>decibels</b>; gain (dB) = 10 log (output power ÷ input power), so +10 dB is ten times the power and +6 dB is roughly double the amplitude. Turning gain up brightens the whole image — and brightens the noise with it. It does <b>not</b> increase the sound sent into the patient, so it costs nothing in exposure. That is why gain is the first thing to raise and output power the last.</p>
<p>But equal treatment is the wrong treatment, because attenuation has already punished the deep echoes. Two identical reflectors, one at 2 cm and one at 12 cm, send back wildly different amplitudes. <span class="kw">Compensation</span> — time gain compensation (<b>TGC</b>), also called depth gain compensation (DGC) or swept gain — fixes that by applying <b>more gain to later-arriving (deeper) echoes</b>. Done right, a uniform organ like liver looks uniformly bright top to bottom.</p>
<p>The TGC curve has four named parts: the <span class="kw-2">near gain</span> (flat amount applied to shallow echoes), the <span class="kw-2">slope</span> or ramp (how fast gain climbs with depth), the <span class="kw-2">knee</span> (the depth where the curve reaches maximum gain), and the <span class="kw-2">far gain</span> (the flat maximum beyond the knee). On most machines you shape it with a row of sliders.</p>
<div class="callout key">Gain = all echoes equally. TGC = deep echoes more. Both are operator-adjustable, both change brightness, neither changes patient exposure.</div>
<div class="callout warn">Trap: "the deep half of the liver is too dark" is a TGC problem (raise the far sliders / slope), not a gain problem. Raising overall gain would blow out the near field too.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 280" role="img"><title>TGC curve showing near gain, slope, knee and far gain versus depth</title>
<path d="M70 230 L575 230" stroke="currentColor" fill="none"/>
<path d="M70 230 L70 40" stroke="currentColor" fill="none"/>
<text x="470" y="256" fill="currentColor" font-size="15">depth (time)</text>
<text x="22" y="48" fill="currentColor" font-size="15">gain</text>
<path d="M70 190 L180 190 L370 80 L575 80" stroke="var(--c1)" fill="none"/>
<path d="M370 80 L370 230" stroke="var(--muted)" fill="none" stroke-dasharray="5 5"/>
<circle cx="370" cy="80" r="6" stroke="var(--c2)" fill="none"/>
<text x="78" y="178" fill="currentColor" font-size="15">near gain</text>
<text x="215" y="150" fill="currentColor" font-size="15">slope</text>
<text x="332" y="65" fill="currentColor" font-size="15">knee</text>
<text x="455" y="68" fill="currentColor" font-size="15">far gain</text>
<text x="70" y="275" fill="currentColor" font-size="15">deeper echoes get more gain, because attenuation stole more</text>
</svg>`,
          caption: "The four parts of the TGC curve: near gain, slope, knee, far gain."
        }
      ],
      sayIt: "Out loud: what does gain do that TGC does not, and name the four parts of the TGC curve from shallow to deep.",
      keyPoints: [
        "Amplification/gain: all signals boosted equally, measured in dB",
        "Gain brightens signal and noise together; no change in exposure",
        "Compensation (TGC/DGC/swept gain) adds more gain with depth to undo attenuation",
        "TGC curve parts: near gain, slope, knee, far gain",
        "Goal: a uniform organ appears uniformly bright at all depths",
        "Both gain and TGC are operator-adjustable and both change the image"
      ]
    },

    {
      id: "u09-l5",
      title: "Compression and dynamic range",
      objectives: ["u09-o5"],
      html: `<p class="lead">The body sends back a range of loudnesses the screen cannot possibly draw — compression squeezes it until it fits.</p>
<p><span class="kw">Dynamic range</span> is the <b>ratio of the largest to the smallest signal a component can handle</b>, expressed in <b>decibels</b>. Because it is a ratio of two like quantities, the unit is always dB, never volts or cm.</p>
<p>Now the mismatch. The echoes arriving at the receiver span roughly <b>100–120 dB</b> from the brightest specular reflector to the faintest scatterer just above the noise. A monitor (and the human eye looking at it) can only distinguish something like <b>20–30 dB</b> of range. If you did nothing, the strong echoes would be white, everything else would be black, and you would have no gray scale at all.</p>
<p><span class="kw">Compression</span> is the third receiver function, and it is the fix: it <b>reduces the dynamic range</b> by shrinking the big signals more than the small ones (a logarithmic mapping), so that faint and loud echoes can both be shown at once. The operator adjusts it — the control is often literally labeled "dynamic range" or "compression", in dB.</p>
<div class="formula">dynamic range (dB) = 10 log (largest power ÷ smallest power)</div>
<p>Practical effect, and this is the exam question: <b>high dynamic range setting → more gray shades → softer, smoother, lower-contrast image</b> (good for subtle liver texture). <b>Low dynamic range setting → fewer gray shades → harder, more black-and-white, higher-contrast image</b> (good for showing a stone or a needle).</p>
<div class="callout key">Compression reduces dynamic range. Only compression does this among the receiver functions.</div>
<div class="callout tip">Dumb saying: <b>"Squeeze the range so the screen can see it."</b> Wide range = soft and gray; narrow range = punchy black and white.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 280" role="img"><title>Compression squeezing a 100 dB range of echoes into a 25 dB display range</title>
<rect x="90" y="40" width="70" height="190" stroke="var(--c1)" fill="none"/>
<text x="55" y="258" fill="currentColor" font-size="15">echoes in</text>
<text x="52" y="30" fill="currentColor" font-size="15">100-120 dB</text>
<rect x="420" y="160" width="70" height="70" stroke="var(--c3)" fill="none"/>
<text x="400" y="258" fill="currentColor" font-size="15">display out</text>
<text x="410" y="148" fill="currentColor" font-size="15">20-30 dB</text>
<path d="M175 135 L405 135" stroke="var(--c2)" fill="none"/>
<path d="M405 135 L392 128 M405 135 L392 142" stroke="var(--c2)" fill="none"/>
<text x="205" y="120" fill="currentColor" font-size="16">COMPRESSION</text>
<text x="200" y="168" fill="currentColor" font-size="15">big signals squeezed</text>
<text x="200" y="190" fill="currentColor" font-size="15">more than small ones</text>
</svg>`,
          caption: "Compression fits a huge range of echo strengths into the narrow range a monitor can show."
        },
        {
          svg: `<svg viewBox="0 0 600 220" role="img"><title>High dynamic range gives many gray shades, low dynamic range gives a contrasty image</title>
<text x="20" y="34" fill="currentColor" font-size="16">HIGH dynamic range setting</text>
<rect x="20" y="50" width="60" height="50" fill="currentColor" fill-opacity="0.1" stroke="currentColor"/>
<rect x="80" y="50" width="60" height="50" fill="currentColor" fill-opacity="0.3" stroke="currentColor"/>
<rect x="140" y="50" width="60" height="50" fill="currentColor" fill-opacity="0.5" stroke="currentColor"/>
<rect x="200" y="50" width="60" height="50" fill="currentColor" fill-opacity="0.7" stroke="currentColor"/>
<rect x="260" y="50" width="60" height="50" fill="currentColor" fill-opacity="0.9" stroke="currentColor"/>
<text x="20" y="126" fill="currentColor" font-size="15">many shades, soft, low contrast</text>
<text x="20" y="164" fill="currentColor" font-size="16">LOW dynamic range setting</text>
<rect x="20" y="176" width="150" height="34" fill="none" stroke="currentColor"/>
<rect x="170" y="176" width="150" height="34" fill="currentColor" stroke="currentColor"/>
<text x="340" y="199" fill="currentColor" font-size="15">few shades, punchy, high contrast</text>
</svg>`,
          caption: "Turning dynamic range down trades gray shades for contrast."
        }
      ],
      sayIt: "Out loud: define dynamic range with its unit, and say what happens to the picture when you lower the dynamic range setting.",
      keyPoints: [
        "Dynamic range = largest ÷ smallest signal, always in dB",
        "Echoes at the receiver span about 100–120 dB",
        "Display and eye handle only about 20–30 dB",
        "Compression reduces dynamic range so both can be shown",
        "High DR setting: more shades, softer, lower contrast",
        "Low DR setting: fewer shades, more black-and-white, higher contrast",
        "Compression is operator-adjustable and is receiver step 3"
      ]
    },

    {
      id: "u09-l6",
      title: "Demodulation and reject",
      objectives: ["u09-o6"],
      html: `<p class="lead">Demodulation tidies the signal shape; reject throws out the garbage at the bottom.</p>
<p>After compression, the electrical signal is still a wiggle that swings <b>above and below</b> zero, because sound is an oscillation. The display does not care about the wiggle — it only needs to know "how big was that echo". <span class="kw">Demodulation</span> converts the oscillating signal into a smooth bump in two steps:</p>
<ul>
<li><b>Rectification</b> — flip the negative half of the signal up so everything is positive.</li>
<li><b>Smoothing (enveloping)</b> — draw a line over the tops of the humps to make one continuous envelope.</li>
</ul>
<p>Demodulation is the one receiver function the sonographer <b>cannot adjust</b>, and it produces <b>no visible change</b> in the image. It happens the same way every time. Exams ask about it precisely because it is the exception.</p>
<p><span class="kw">Reject</span> (also called threshold or suppression) is the last step. It sets a level, and any signal <b>below</b> that level is erased and displayed as black. Its job is to clean up low-amplitude electronic noise and clutter that clogs up otherwise anechoic structures. The operator adjusts it, and it clearly changes the image.</p>
<div class="callout warn">Reject is not free. Raise it too far and you erase real low-level echoes — the low-level fill in a complicated cyst, or faint parenchymal texture — and a cyst with debris starts looking simple. Rejected echoes are gone before storage, so no post-processing can bring them back.</div>
<div class="callout tip">Dumb saying: <b>"Demod has no knob, reject takes out the trash."</b></div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>Demodulation shown as rectification then smoothing of an oscillating echo signal</title>
<text x="20" y="28" fill="currentColor" font-size="15">raw signal</text>
<text x="215" y="28" fill="currentColor" font-size="15">rectified</text>
<text x="410" y="28" fill="currentColor" font-size="15">smoothed</text>
<path d="M20 130 L185 130" stroke="var(--muted)" fill="none"/>
<path d="M25 130 C 40 70, 55 190, 70 130 C 85 60, 100 200, 115 130 C 130 80, 145 180, 160 130" stroke="var(--c1)" fill="none"/>
<path d="M215 130 L380 130" stroke="var(--muted)" fill="none"/>
<path d="M220 130 C 235 70, 250 70, 265 130 C 280 60, 295 60, 310 130 C 325 80, 340 80, 355 130" stroke="var(--c1)" fill="none"/>
<path d="M410 130 L575 130" stroke="var(--muted)" fill="none"/>
<path d="M415 130 C 450 60, 500 60, 545 130" stroke="var(--c3)" fill="none"/>
<text x="20" y="190" fill="currentColor" font-size="15">swings + and -</text>
<text x="215" y="190" fill="currentColor" font-size="15">all positive</text>
<text x="410" y="190" fill="currentColor" font-size="15">one envelope</text>
<text x="20" y="222" fill="currentColor" font-size="15">no knob, no visible change in the image</text>
</svg>`,
          caption: "Demodulation = rectify, then smooth into an envelope."
        },
        {
          svg: `<svg viewBox="0 0 600 220" role="img"><title>Reject erasing signals that fall below a threshold level</title>
<path d="M30 170 L570 170" stroke="currentColor" fill="none"/>
<path d="M30 120 L570 120" stroke="var(--c2)" fill="none" stroke-dasharray="6 5"/>
<text x="420" y="112" fill="currentColor" font-size="15">reject level</text>
<path d="M70 170 L70 60" stroke="var(--c1)" fill="none"/>
<path d="M120 170 L120 150" stroke="var(--muted)" fill="none"/>
<path d="M160 170 L160 158" stroke="var(--muted)" fill="none"/>
<path d="M210 170 L210 45" stroke="var(--c1)" fill="none"/>
<path d="M260 170 L260 145" stroke="var(--muted)" fill="none"/>
<path d="M310 170 L310 90" stroke="var(--c1)" fill="none"/>
<path d="M360 170 L360 155" stroke="var(--muted)" fill="none"/>
<path d="M410 170 L410 70" stroke="var(--c1)" fill="none"/>
<text x="30" y="200" fill="currentColor" font-size="15">anything under the dashed line is erased to black</text>
</svg>`,
          caption: "Reject: set a threshold, and everything below it disappears."
        }
      ],
      sayIt: "Out loud: name the two steps of demodulation, and say which of demodulation and reject the sonographer can adjust.",
      keyPoints: [
        "Demodulation = rectification + smoothing (envelope detection)",
        "Demodulation is NOT adjustable and has no visible image effect",
        "Reject/threshold/suppression erases signals below a set level",
        "Reject is adjustable and does change the image",
        "Too much reject erases real low-level echoes (cyst debris, faint texture)"
      ]
    },

    {
      id: "u09-l7",
      title: "The scan converter: pixels, bits and binary",
      objectives: ["u09-o7"],
      html: `<p class="lead">The image is really a spreadsheet of numbers; pixels decide how sharp it looks, bits decide how many grays it holds.</p>
<p>Scan lines come back in whatever shape the transducer fired them — a fan from a sector probe, an arc from a curved array. Monitors draw in neat horizontal rows. The <span class="kw">scan converter</span> does that translation and stores the frame.</p>
<p><span class="kw-2">Analog scan converters</span> used a storage tube: they <b>drifted</b>, aged, needed constant tweaking, could not hold an image long, and are obsolete. <span class="kw">Digital scan converters</span> store the image as numbers in computer memory: stable, fast, exactly reproducible, and they permit all the processing we take for granted.</p>
<p>A <span class="kw">pixel</span> (picture element) is the smallest box of the image. The memory is a matrix, commonly <b>512 × 512</b> or <b>1024 × 1024</b> pixels. Each pixel holds a binary number that many <span class="kw">bits</span> long. Bits are binary digits — each one has two states, so:</p>
<div class="formula">number of gray shades = 2<sup>bits</sup></div>
<p>1 bit → 2 shades (pure black and white), 4 bits → 16, 6 bits → 64, 8 bits → 256, 10 bits → 1,024. Going the other way, "how many bits do I need for 128 shades?" is asking for the exponent: 2<sup>7</sup> = 128, so 7 bits.</p>
<div class="callout key">More <b>pixels</b> in the same field of view improve display sampling only when the matrix was limiting; they cannot beat the acoustic beam and pulse resolution. More <b>bits</b> provide more available gray levels, but clinical contrast also depends on signal quality and processing.</div>
<div class="steps"><ol><li>6 bits gives 2⁶ = 64 available shades; 1,024 shades needs log₂(1,024) = 10 bits.</li><li>A 512 × 512 matrix has 262,144 pixels.</li><li>At 8 bits/pixel it stores 2,097,152 bits per frame.</li></ol></div>
<div class="callout tip">Dumb saying: <b>"Pixels for sharpness, bits for shades."</b></div>
<div class="callout warn">Trap: adding bits does not make the picture sharper, and adding pixels does not add gray shades. Keep the two columns separate.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 300" role="img"><title>A pixel grid beside a ladder showing how bits per pixel set the number of gray shades</title>
<text x="20" y="30" fill="currentColor" font-size="16">pixel matrix</text>
<rect x="20" y="45" width="180" height="150" stroke="currentColor" fill="none"/>
<path d="M50 45 L50 195 M80 45 L80 195 M110 45 L110 195 M140 45 L140 195 M170 45 L170 195" stroke="var(--muted)" fill="none"/>
<path d="M20 75 L200 75 M20 105 L200 105 M20 135 L200 135 M20 165 L200 165" stroke="var(--muted)" fill="none"/>
<rect x="80" y="75" width="30" height="30" fill="currentColor" fill-opacity="0.85"/>
<rect x="110" y="105" width="30" height="30" fill="currentColor" fill-opacity="0.45"/>
<rect x="140" y="135" width="30" height="30" fill="currentColor" fill-opacity="0.2"/>
<text x="20" y="225" fill="currentColor" font-size="15">one box = one pixel</text>
<text x="20" y="250" fill="currentColor" font-size="15">more pixels per cm =</text>
<text x="20" y="272" fill="currentColor" font-size="15">better spatial resolution</text>
<text x="250" y="30" fill="currentColor" font-size="16">bits inside one pixel</text>
<rect x="250" y="50" width="34" height="30" fill="none" stroke="currentColor"/>
<rect x="284" y="50" width="34" height="30" fill="currentColor" stroke="currentColor"/>
<text x="340" y="72" fill="currentColor" font-size="15">1 bit = 2 shades</text>
<rect x="250" y="100" width="34" height="30" fill="none" stroke="currentColor"/>
<rect x="284" y="100" width="34" height="30" fill="currentColor" fill-opacity="0.35" stroke="currentColor"/>
<rect x="318" y="100" width="34" height="30" fill="currentColor" fill-opacity="0.7" stroke="currentColor"/>
<rect x="352" y="100" width="34" height="30" fill="currentColor" stroke="currentColor"/>
<text x="400" y="122" fill="currentColor" font-size="15">2 bits = 4</text>
<rect x="250" y="150" width="17" height="30" fill="none" stroke="currentColor"/>
<rect x="267" y="150" width="17" height="30" fill="currentColor" fill-opacity="0.15" stroke="currentColor"/>
<rect x="284" y="150" width="17" height="30" fill="currentColor" fill-opacity="0.3" stroke="currentColor"/>
<rect x="301" y="150" width="17" height="30" fill="currentColor" fill-opacity="0.45" stroke="currentColor"/>
<rect x="318" y="150" width="17" height="30" fill="currentColor" fill-opacity="0.6" stroke="currentColor"/>
<rect x="335" y="150" width="17" height="30" fill="currentColor" fill-opacity="0.75" stroke="currentColor"/>
<rect x="352" y="150" width="17" height="30" fill="currentColor" fill-opacity="0.9" stroke="currentColor"/>
<rect x="369" y="150" width="17" height="30" fill="currentColor" stroke="currentColor"/>
<text x="400" y="172" fill="currentColor" font-size="15">3 bits = 8</text>
<text x="250" y="225" fill="currentColor" font-size="16">8 bits = 2^8 = 256 shades</text>
<text x="250" y="255" fill="currentColor" font-size="15">more bits =</text>
<text x="250" y="277" fill="currentColor" font-size="15">better contrast resolution</text>
</svg>`,
          caption: "Pixels set spatial resolution; bits per pixel set the number of gray shades."
        }
      ],
      sayIt: "Out loud: how many shades does a 6-bit pixel hold, how many bits do you need for 1,024 shades, and which of pixels or bits improves contrast resolution?",
      keyPoints: [
        "Analog scan converters drift, fade and are obsolete; digital ones store numbers",
        "Pixel = picture element, the smallest part of the image",
        "Typical matrix: 512 × 512 or 1024 × 1024 pixels",
        "Shades of gray = 2 raised to the number of bits",
        "8 bits = 256 shades; 6 bits = 64; 10 bits = 1,024",
        "More pixels → better spatial resolution; more bits → better contrast resolution"
      ]
    },

    {
      id: "u09-l8",
      title: "Pre-processing, post-processing and zoom",
      objectives: ["u09-o8"],
      html: `<p class="lead">Memory is the dividing line: anything done on the way in is pre-processing, anything done on the way out is post-processing.</p>
<p>The digital scan converter <b>writes</b> numbers into memory and later <b>reads</b> them out to the monitor. That gives a clean definition:</p>
<ul>
<li><span class="kw">Pre-processing</span> = write functions = done <b>before</b> the data is stored. It changes the numbers that get saved. Examples: TGC, compression, edge enhancement, persistence (frame averaging), fill-in interpolation, and <b>write magnification</b>.</li>
<li><span class="kw">Post-processing</span> = read functions = done <b>after</b> storage, on data already in memory. Examples: changing the gray map or B-color map, black/white inversion, brightness and contrast of the displayed image, and <b>read magnification</b>.</li>
</ul>
<p>The practical test: <b>if you can do it to a frozen image, it is post-processing.</b> Freeze the frame and you can still invert black and white or change the gray map, because those are read functions. You cannot change TGC on a frozen frame — that data was already written.</p>
<p>The zoom pair is the classic exam question:</p>
<table class="dt"><tr><th></th><th>Write (pre) zoom</th><th>Read (post) zoom</th></tr>
<tr><td>When</td><td>Before storage; the machine <b>rescans</b> the selected region</td><td>After storage; enlarges stored pixels</td></tr>
<tr><td>New data?</td><td>Yes — new lines fired in that box</td><td>No — same pixels, drawn bigger</td></tr>
<tr><td>Quality</td><td>Better resolution, fills memory with the region of interest</td><td>Blockier, can look pixelated</td></tr>
<tr><td>Frozen image?</td><td>No</td><td>Yes</td></tr></table>
<div class="callout tip">Dumb saying: <b>"Write before, read after."</b> Write zoom reacquires before storage; read zoom enlarges what is already stored.</div>
<div class="callout warn">The frozen-image test is the conventional stored-image teaching model. Modern raw-data systems may retain enough channel data to reprocess some settings after freeze, so use the scanner's implementation rather than treating the shortcut as universal.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 290" role="img"><title>Timeline showing pre-processing before image memory and post-processing after it</title>
<path d="M15 150 L565 150" stroke="currentColor" fill="none"/>
<path d="M565 150 L552 143 M565 150 L552 157" stroke="currentColor" fill="none"/>
<rect x="235" y="120" width="140" height="60" stroke="var(--c1)" fill="var(--paper)"/>
<text x="252" y="145" fill="currentColor" font-size="15">IMAGE</text>
<text x="252" y="167" fill="currentColor" font-size="15">MEMORY</text>
<text x="15" y="40" fill="var(--c2)" font-size="16">PRE (write, before storage)</text>
<text x="15" y="66" fill="currentColor" font-size="15">TGC, compression</text>
<text x="15" y="88" fill="currentColor" font-size="15">edge enhancement</text>
<text x="15" y="110" fill="currentColor" font-size="15">persistence, write zoom</text>
<text x="300" y="216" fill="var(--c3)" font-size="16">POST (read, after storage)</text>
<text x="300" y="242" fill="currentColor" font-size="15">gray map, B-color</text>
<text x="300" y="264" fill="currentColor" font-size="15">black/white invert, read zoom</text>
<text x="15" y="242" fill="currentColor" font-size="15">works on a</text>
<text x="15" y="264" fill="currentColor" font-size="15">frozen image? NO</text>
</svg>`,
          caption: "Image memory is the fence: write functions on the left, read functions on the right."
        }
      ],
      sayIt: "Out loud: define pre- and post-processing using image memory, then explain the difference between read zoom and write zoom.",
      keyPoints: [
        "Pre-processing = write functions, before storage; changes the stored data",
        "Post-processing = read functions, after storage; only changes the display",
        "If it works on a frozen image, it is post-processing",
        "Pre: TGC, compression, edge enhancement, persistence, write zoom",
        "Post: gray map, B-color, black/white invert, read zoom",
        "Write zoom rescans the region — new data, better resolution",
        "Read zoom enlarges stored pixels — no new data, can look blocky"
      ]
    },

    {
      id: "u09-l9",
      title: "Displays, storage, PACS and DICOM",
      objectives: ["u09-o9"],
      html: `<p class="lead">The last two boxes of the block diagram: what you look at, and where the study goes afterwards.</p>
<p>Older systems used a <span class="kw-2">cathode ray tube (CRT)</span>: an electron beam swept across a phosphor screen inside a heavy vacuum tube. CRTs were bulky, power-hungry, sensitive to magnetic fields and prone to drifting brightness. They are obsolete.</p>
<p>Modern systems use <span class="kw">flat-panel displays</span> — LCD and LED-backlit LCD, and increasingly OLED. Each screen pixel is addressed directly, so the geometry is exact, brightness is stable, they are thin, light and use far less power. That matters clinically: a flat panel keeps its calibrated gray scale, so the image you interpret matches the image the receiver produced. Ambient room light is still the enemy of gray-scale perception — the darker the room, the more of those 256 shades you can actually see.</p>
<p>Once acquired, images are stored digitally. <span class="kw">PACS</span> — <b>Picture Archiving and Communication System</b> — is the hospital's digital network for storing, retrieving, distributing and displaying medical images. No more film, no more hunting for a folder; the study is available from any workstation.</p>
<p><span class="kw">DICOM</span> — <b>Digital Imaging and Communications in Medicine</b> — is the <b>standard</b> that makes PACS work. It defines both a file format and a communication protocol, so an image made by one manufacturer's ultrasound system can be read by another manufacturer's workstation. A DICOM file carries the pixel data <i>and</i> the metadata: patient identifiers, machine settings, date, and scale information.</p>
<div class="callout key">PACS is the system (storage and distribution). DICOM is the standard/format that lets different vendors talk to each other.</div>
<div class="callout warn">Trap: DICOM is not a machine and PACS is not a file format. Do not swap them.</div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 240" role="img"><title>Ultrasound system sending images through DICOM into a PACS archive and out to workstations</title>
<rect x="20" y="80" width="120" height="60" stroke="var(--c1)" fill="none"/>
<text x="30" y="106" fill="currentColor" font-size="15">ultrasound</text>
<text x="30" y="128" fill="currentColor" font-size="15">system</text>
<path d="M140 110 L235 110" stroke="var(--c2)" fill="none"/>
<text x="148" y="98" fill="currentColor" font-size="15">DICOM</text>
<rect x="240" y="80" width="120" height="60" stroke="var(--c3)" fill="none"/>
<text x="272" y="116" fill="currentColor" font-size="16">PACS</text>
<path d="M360 110 L455 80 M360 110 L455 140" stroke="var(--c2)" fill="none"/>
<rect x="460" y="50" width="120" height="50" stroke="var(--c1)" fill="none"/>
<text x="470" y="80" fill="currentColor" font-size="15">reading room</text>
<rect x="460" y="120" width="120" height="50" stroke="var(--c1)" fill="none"/>
<text x="470" y="150" fill="currentColor" font-size="15">any workstation</text>
<text x="20" y="200" fill="currentColor" font-size="15">PACS = the archive and network</text>
<text x="20" y="222" fill="currentColor" font-size="15">DICOM = the shared format and protocol</text>
</svg>`,
          caption: "DICOM is the language; PACS is the place the images live."
        }
      ],
      sayIt: "Out loud: what do PACS and DICOM each stand for, and what is the difference between them?",
      keyPoints: [
        "CRT displays are obsolete: bulky, drift, magnetic sensitivity",
        "Flat-panel LCD/LED displays are the current standard: stable, thin, exact geometry",
        "Room lighting affects how many gray shades the reader can actually see",
        "PACS = Picture Archiving and Communication System (storage and distribution)",
        "DICOM = Digital Imaging and Communications in Medicine (format + protocol)",
        "DICOM files carry image data plus patient and technique metadata"
      ]
    },

    {
      id: "u09-l10",
      title: "Coded excitation, compounding, elastography and 3D",
      objectives: ["u09-o10"],
      html: `<p class="lead">Five modern add-ons — each buys you something and charges you something.</p>
<p><span class="kw">Coded excitation</span> transmits a long pulse that carries a digital "code" (a recognizable pattern of phases) instead of a short blip. A long pulse normally ruins axial resolution, but the receiver knows the code and correlates for it, compressing the returned signal back down. The payoff: much more transmitted energy, so <b>better penetration and signal-to-noise ratio</b>, without giving up axial resolution — useful at higher frequencies and in technically difficult patients. The cost is processing complexity.</p>
<p><span class="kw">Spatial compounding</span> steers the beam through several different angles (typically 3–9 looks), then averages those frames into one. Speckle and angle-dependent artifacts such as shadowing and refractive edge shadows partially cancel; borders seen obliquely by one look are hit head-on by another. Result: <b>less speckle, smoother tissue, better border definition</b>. The cost is <b>lower temporal resolution (frame rate)</b> — you needed several frames for one — plus some blurring of motion and the loss of useful shadowing behind a stone.</p>
<p><span class="kw-2">Frequency compounding</span> does the same trick in frequency instead of angle: the broadband echo data is split into sub-bands, imaged separately, then averaged. Speckle patterns differ with frequency, so averaging suppresses speckle. The cost is some loss of resolution and signal-to-noise per sub-band.</p>
<p><span class="kw">Elastography</span> maps <b>stiffness</b>. Either the probe (or an acoustic push pulse) deforms tissue and the system measures displacement (strain), or the system measures how fast a shear wave travels — faster shear wave = stiffer tissue, often reported in m/s or kPa. Stiff lesions and fibrotic liver stand out even when B-mode looks bland.</p>
<p><span class="kw">3D/4D</span> builds a <b>volume</b> from many 2D slices — swept mechanically, swept by hand, or captured electronically by a <b>2D matrix array</b>. 4D is 3D updating in real time; volume rendering is why obstetric "baby face" images exist.</p>
<div class="callout tip">Dumb saying: <b>"Compounding smooths; sequential looks may slow."</b> Sequential spatial looks can reduce effective frame rate, although overlapping-frame implementations soften that cost. Frequency compounding may split one acquisition into subbands and need not divide frame rate.</div>
<div class="steps"><ol><li>Dynamic range: 10 log₁₀(1,000/1) = 30 dB.</li><li>Gain: 10 log₁₀(100/10) = 10 dB.</li><li>Five sequential looks from a 30 fps acquisition give an idealized 30/5 = 6 fps if no looks overlap.</li></ol></div>`,
      diagrams: [
        {
          svg: `<svg viewBox="0 0 600 260" role="img"><title>Spatial compounding: three steered looks averaged into one frame at a lower frame rate</title>
<rect x="230" y="30" width="140" height="18" stroke="currentColor" fill="none"/>
<text x="250" y="24" fill="currentColor" font-size="15">array</text>
<path d="M300 48 L200 200 M300 48 L400 200" stroke="var(--c1)" fill="none"/>
<path d="M300 48 L140 170 M300 48 L300 210" stroke="var(--c2)" fill="none" stroke-dasharray="6 5"/>
<path d="M300 48 L460 170" stroke="var(--c3)" fill="none" stroke-dasharray="2 5"/>
<text x="60" y="150" fill="currentColor" font-size="15">look 1</text>
<text x="290" y="235" fill="currentColor" font-size="15">look 2</text>
<text x="480" y="160" fill="currentColor" font-size="15">look 3</text>
<text x="20" y="215" fill="currentColor" font-size="15">3 steered frames averaged into 1</text>
<text x="20" y="245" fill="currentColor" font-size="15">less speckle, smoother borders, frame rate divided by 3</text>
</svg>`,
          caption: "Spatial compounding: several steered looks, one averaged frame, a third of the frame rate."
        }
      ],
      sayIt: "Out loud: name five modern imaging features and, for each, one benefit and one cost.",
      keyPoints: [
        "Coded excitation: long coded pulse → better penetration and SNR, axial resolution preserved",
        "Spatial compounding: several steered looks averaged → less speckle and fewer shadow artifacts",
        "Spatial compounding costs frame rate (temporal resolution)",
        "Frequency compounding: sub-bands averaged → less speckle, some resolution/SNR cost",
        "Elastography: maps tissue stiffness (strain or shear-wave speed)",
        "3D/4D: volumes from swept 2D slices or a 2D matrix array; 4D = real-time 3D"
      ]
    }
  ],

  mnemonics: [
    { saying: "All Cows Can Digest Roughage", meaning: "Amplification, Compensation, Compression, Demodulation, Reject — the five receiver functions in order", lesson: "u09-l3" },
    { saying: "A is a spike, B is a blip, M is a mountain range", meaning: "A-mode draws spikes, B-mode draws bright dots, M-mode draws a wiggly motion trace over time", lesson: "u09-l1" },
    { saying: "M is for Motion and for Moment", meaning: "M-mode shows motion and has the best temporal resolution — it is the timing mode", lesson: "u09-l1" },
    { saying: "Gain is for everybody, TGC is for the back row", meaning: "Amplification boosts all echoes equally; compensation boosts only deep echoes to undo attenuation", lesson: "u09-l4" },
    { saying: "Squeeze the range so the screen can see it", meaning: "Compression reduces dynamic range from about 100–120 dB down to the 20–30 dB a display can show", lesson: "u09-l5" },
    { saying: "Demod has no knob, reject takes out the trash", meaning: "Demodulation is the only non-adjustable receiver function; reject is adjustable and erases low-level noise", lesson: "u09-l6" },
    { saying: "Pixels for sharpness, bits for shades", meaning: "More pixels → better spatial resolution; more bits per pixel → more gray shades → better contrast resolution", lesson: "u09-l7" },
    { saying: "Two to the bits", meaning: "Number of gray shades = 2 raised to the number of bits: 8 bits = 256 shades", lesson: "u09-l7" },
    { saying: "Write before, Read after", meaning: "Write functions happen before storage (pre-processing); read functions happen after storage (post-processing)", lesson: "u09-l8" },
    { saying: "Compounding smooths but slows", meaning: "Spatial and frequency compounding reduce speckle and artifacts but cost frame rate or resolution", lesson: "u09-l10" }
  ],

  formulas: [
    { name: "Number of gray shades", expr: "shades = 2^bits", units: "shades", note: "1 bit = 2, 4 bits = 16, 6 bits = 64, 8 bits = 256, 10 bits = 1,024" },
    { name: "Bits needed for a number of shades", expr: "bits = log₂(shades)", units: "bits", note: "Ask: 2 to what power gives that many shades? 512 shades → 9 bits" },
    { name: "Dynamic range", expr: "DR (dB) = 10 log (largest power ÷ smallest power)", units: "dB", note: "Always a ratio in dB; compression is the only receiver function that reduces it" },
    { name: "Gain", expr: "gain (dB) = 10 log (output power ÷ input power)", units: "dB", note: "+3 dB ≈ double power, +6 dB ≈ double amplitude, +10 dB = ten times the power" },
    { name: "Total pixels in an image matrix", expr: "pixels = rows × columns", units: "pixels", note: "512 × 512 = 262,144 pixels" },
    { name: "Image memory size", expr: "bits of memory = rows × columns × bits per pixel", units: "bits", note: "512 × 512 × 8 bits ≈ 2.1 million bits per frame" },
    { name: "Frame rate with spatial compounding", expr: "displayed FR ≈ original FR ÷ number of steered looks", units: "Hz (frames/s)", note: "3 looks → about one third the frame rate" }
  ],

  keyNumbers: [
    { fact: "Gray shades from an 8-bit pixel", value: "256 (2⁸)" },
    { fact: "Gray shades from 6 bits / 7 bits / 10 bits", value: "64 / 128 / 1,024" },
    { fact: "Typical digital image matrix", value: "512 × 512 or 1024 × 1024 pixels" },
    { fact: "Dynamic range of echoes arriving at the receiver", value: "about 100–120 dB" },
    { fact: "Dynamic range a display/eye can show", value: "about 20–30 dB" },
    { fact: "Number of receiver functions", value: "5 (amplification, compensation, compression, demodulation, reject)" },
    { fact: "Receiver functions the operator can adjust", value: "4 of 5 — all except demodulation" },
    { fact: "Pulser voltage applied to the element", value: "roughly tens to a few hundred volts" },
    { fact: "Amplitude change for +6 dB of gain", value: "about double the amplitude (+3 dB ≈ double power)" },
    { fact: "Typical number of steered looks in spatial compounding", value: "3–9 frames averaged into one" },
    { fact: "Display modes and their dimensions", value: "A = 1D spikes, B = 2D gray scale, M = 1 line vs time" }
  ],

  flashcards: [
    { front: "A-mode", back: "Amplitude mode: spike height = echo amplitude, horizontal axis = depth; 1D display", lesson: "u09-l1" },
    { front: "B-mode", back: "Brightness mode: each echo is a dot whose brightness = echo amplitude; builds the 2D gray-scale image", lesson: "u09-l1" },
    { front: "M-mode", back: "Motion mode: one scan line, depth down, time across; best temporal resolution", lesson: "u09-l1" },
    { front: "Which mode has the best temporal resolution?", back: "M-mode — only one scan line has to be fired", lesson: "u09-l1" },
    { front: "Mode used to time cardiac/fetal heart motion", back: "M-mode", lesson: "u09-l1" },
    { front: "Pulser", back: "Creates the voltage that drives the element; sets pulse amplitude (output power) and PRF", lesson: "u09-l2" },
    { front: "Beamformer", back: "Applies time delays across array elements for steering and focusing; also apodization and receive focusing", lesson: "u09-l2" },
    { front: "Scan converter", back: "Stores the frame as numbers and converts scan-line geometry into the monitor's raster format", lesson: "u09-l2" },
    { front: "Which control changes patient exposure?", back: "Output power / acoustic power (the pulser). Gain, TGC, compression and reject do not", lesson: "u09-l2" },
    { front: "Five receiver functions in order", back: "Amplification, compensation, compression, demodulation, reject", lesson: "u09-l3" },
    { front: "All Cows Can Digest Roughage", back: "Amplification, Compensation, Compression, Demodulation, Reject", lesson: "u09-l3" },
    { front: "Which receiver function is NOT operator-adjustable?", back: "Demodulation — and it has no visible effect on the image", lesson: "u09-l3" },
    { front: "Amplification (gain)", back: "Boosts all returning signals equally; measured in dB; brightens signal and noise together", lesson: "u09-l4" },
    { front: "Compensation (other names)", back: "TGC, DGC, time gain compensation, depth gain compensation, swept gain", lesson: "u09-l4" },
    { front: "What does TGC correct for?", back: "Attenuation — deeper echoes are weaker, so they get more gain", lesson: "u09-l4" },
    { front: "Four parts of the TGC curve", back: "Near gain, slope (ramp), knee, far gain", lesson: "u09-l4" },
    { front: "Knee of the TGC curve", back: "The depth at which the curve reaches maximum (far) gain", lesson: "u09-l4" },
    { front: "Dynamic range", back: "Ratio of the largest to the smallest signal a component can handle, expressed in dB", lesson: "u09-l5" },
    { front: "Compression", back: "Receiver step 3: reduces dynamic range so both loud and faint echoes fit on the display; operator-adjustable", lesson: "u09-l5" },
    { front: "Echo dynamic range at the receiver vs at the display", back: "About 100–120 dB arriving; about 20–30 dB displayable", lesson: "u09-l5" },
    { front: "Lower the dynamic range setting → image looks…", back: "Fewer gray shades, more black-and-white, higher contrast", lesson: "u09-l5" },
    { front: "Raise the dynamic range setting → image looks…", back: "More gray shades, softer and smoother, lower contrast", lesson: "u09-l5" },
    { front: "Demodulation (two steps)", back: "Rectification (flip negatives up) + smoothing (envelope); not adjustable, no visible change", lesson: "u09-l6" },
    { front: "Reject", back: "Threshold/suppression: erases signals below a set level to clean up noise; operator-adjustable", lesson: "u09-l6" },
    { front: "Danger of too much reject", back: "Real low-level echoes are erased — debris in a cyst or faint tissue texture disappears", lesson: "u09-l6" },
    { front: "Analog scan converter", back: "Obsolete storage-tube device; drifted, faded, needed frequent adjustment", lesson: "u09-l7" },
    { front: "Pixel", back: "Picture element — the smallest box of a digital image", lesson: "u09-l7" },
    { front: "Bit", back: "Binary digit with two possible states; bits per pixel set the number of gray shades", lesson: "u09-l7" },
    { front: "Shades of gray formula", back: "shades = 2^bits (8 bits = 256)", lesson: "u09-l7" },
    { front: "How many bits for 64 shades?", back: "6 bits (2⁶ = 64)", lesson: "u09-l7" },
    { front: "More pixels in the same field of view improve…", back: "Display sampling when matrix-limited; never beyond acoustic resolution", lesson: "u09-l7" },
    { front: "More bits per pixel provide…", back: "More available gray levels; clinical contrast still depends on signal and processing", lesson: "u09-l7" },
    { front: "Pre-processing", back: "Write functions performed before storage: TGC, compression, edge enhancement, persistence, write zoom", lesson: "u09-l8" },
    { front: "Post-processing", back: "Read functions performed after storage: gray maps, B-color, black/white invert, read zoom", lesson: "u09-l8" },
    { front: "Quick test for post-processing", back: "If you can do it to a frozen image, it is post-processing", lesson: "u09-l8" },
    { front: "Read magnification", back: "Post-processing zoom: stored pixels drawn larger, no new data, can look blocky", lesson: "u09-l8" },
    { front: "Write magnification", back: "Pre-processing zoom: the region is rescanned, new data, better resolution", lesson: "u09-l8" },
    { front: "PACS", back: "Picture Archiving and Communication System — digital storage, retrieval and distribution of images", lesson: "u09-l9" },
    { front: "DICOM", back: "Digital Imaging and Communications in Medicine — the standard file format and protocol for medical images", lesson: "u09-l9" },
    { front: "Current display technology", back: "Flat panel (LCD/LED, OLED); CRT is obsolete", lesson: "u09-l9" },
    { front: "Coded excitation", back: "Long coded transmit pulse decoded on receive: better penetration and SNR without losing axial resolution", lesson: "u09-l10" },
    { front: "Spatial compounding", back: "Several steered looks averaged into one frame: less speckle and fewer shadow artifacts, lower frame rate", lesson: "u09-l10" },
    { front: "Frequency compounding", back: "Echo band split into sub-bands and averaged: less speckle, some loss of resolution/SNR", lesson: "u09-l10" },
    { front: "Elastography", back: "Imaging of tissue stiffness via strain or shear-wave speed (stiffer = faster shear wave)", lesson: "u09-l10" },
    { front: "4D imaging", back: "Real-time 3D — volumes updated continuously, usually with a 2D matrix array", lesson: "u09-l10" }
  ],

  questions: [
    { id: "u09-q1", type: "mc", q: "Which display mode shows the motion of a structure along a single scan line as time passes?", choices: ["A-mode", "B-mode", "M-mode", "Power Doppler"], answer: 2,
      explain: "M-mode parks the beam on one line and plots depth (down) against time (across). B-mode is tempting because it is real time too, but B-mode sweeps many lines to build a 2D anatomic picture rather than plotting one line against time.", objectives: ["u09-o1"], lesson: "u09-l1", level: 1 },
    { id: "u09-q2", type: "mc", q: "On an A-mode display, the height of each spike represents:", choices: ["Depth of the reflector", "Strength (amplitude) of the echo", "Frequency of the returning echo", "Propagation speed in the medium"], answer: 1,
      explain: "Spike height = echo amplitude; depth is the horizontal position, determined by go-return time. 'Depth of the reflector' is the tempting answer because depth is on the display too — but it is the axis, not the height.", objectives: ["u09-o1"], lesson: "u09-l1", level: 2 },
    { id: "u09-q3", type: "tf", q: "In B-mode, the brightness of each dot is determined by the amplitude of the returning echo.", answer: true,
      explain: "True. B stands for brightness: stronger echo = brighter dot. Dot position comes from go-return time (depth) and beam direction.", objectives: ["u09-o1"], lesson: "u09-l1", level: 1 },
    { id: "u09-q4", type: "short", q: "Which display mode has the best temporal resolution?", answer: "M-mode", accept: ["m-mode", "m mode", "motion mode", "M"],
      explain: "Only one scan line is fired, so it can be updated extremely rapidly — ideal for timing valve or fetal heart motion.", objectives: ["u09-o1"], lesson: "u09-l1", level: 2 },
    { id: "u09-q5", type: "mc", q: "A sonographer needs to time the opening and closing of a fetal heart valve precisely. Which mode is the best choice?", choices: ["A-mode, because it shows exact amplitudes", "B-mode, because it shows anatomy in two dimensions", "M-mode, because of its very high temporal resolution", "Spatial compounding, because it reduces speckle"], answer: 2,
      explain: "Timing questions are temporal-resolution questions, and M-mode wins because it fires one line. B-mode is tempting since it looks like 'the real-time mode', but its frame rate is limited by having to build a whole frame of lines.", objectives: ["u09-o1"], lesson: "u09-l1", level: 3 },
    { id: "u09-q6", type: "mc", q: "Which component creates the electrical voltage that drives the active element and determines the pulse repetition frequency?", choices: ["Pulser", "Receiver", "Scan converter", "Beamformer"], answer: 0,
      explain: "The pulser is the transmitter: it supplies the driving voltage and decides how often pulses are sent. The beamformer is tempting because it also handles transmit, but its job is the timing delays across elements, not creating the pulse or setting PRF.", objectives: ["u09-o2"], lesson: "u09-l2", level: 1 },
    { id: "u09-q7", type: "mc", q: "Which component converts the transducer's scan-line geometry into the rectangular raster format the monitor needs, and stores the frame?", choices: ["Receiver", "Scan converter", "Pulser", "Display"], answer: 1,
      explain: "That is exactly the scan converter's double job: memory plus geometric translation. The receiver is tempting, but the receiver only processes signal amplitudes — it does not reformat geometry or store frames.", objectives: ["u09-o2"], lesson: "u09-l2", level: 2 },
    { id: "u09-q8", type: "short", q: "Which system component applies tiny time delays across array elements to steer and focus the beam?", answer: "beamformer", accept: ["beam former", "the beamformer"],
      explain: "Electronic steering and focusing are produced by firing elements at slightly different times; that is the beamformer's defining function, on transmit and on receive.", objectives: ["u09-o2"], lesson: "u09-l2", level: 1 },
    { id: "u09-q9", type: "tf", q: "Increasing the output power control increases the voltage the pulser sends to the transducer and increases patient exposure.", answer: true,
      explain: "True. Output power (acoustic power, transmit gain) is the one imaging control in this chapter that changes what goes into the patient. Receiver gain only amplifies echoes that already came back.", objectives: ["u09-o2"], lesson: "u09-l2", level: 2 },
    { id: "u09-q10", type: "mc", q: "What is the correct order of the receiver functions?", choices: ["Compensation, amplification, reject, compression, demodulation", "Amplification, compensation, compression, demodulation, reject", "Amplification, compression, compensation, reject, demodulation", "Compression, amplification, compensation, demodulation, reject"], answer: 1,
      explain: "Amplify, Compensate, Compress, Demodulate, Reject — 'All Cows Can Digest Roughage'. Choice 3 is the classic trap: it swaps compression and compensation, which sound alike but do different jobs (squeeze the range vs fix depth).", objectives: ["u09-o3"], lesson: "u09-l3", level: 1 },
    { id: "u09-q11", type: "mc", q: "Which receiver function is NOT operator-adjustable and produces no visible change in the image?", choices: ["Reject", "Compression", "Demodulation", "Compensation"], answer: 2,
      explain: "Demodulation (rectify + smooth) is automatic and invisible. Reject is tempting because it also happens late in the chain and sounds technical, but reject has a knob and visibly cleans up background noise.", objectives: ["u09-o3"], lesson: "u09-l3", level: 2 },
    { id: "u09-q12", type: "short", q: "Which receiver function comes immediately after compensation?", answer: "compression", accept: ["compression", "compress"],
      explain: "Order is amplification, compensation, compression, demodulation, reject. Compensation fixes brightness with depth; compression then squeezes the range to fit the display.", objectives: ["u09-o3"], lesson: "u09-l3", level: 2 },
    { id: "u09-q13", type: "tf", q: "All five receiver functions can be adjusted by the sonographer.", answer: false,
      explain: "False. Four can (amplification, compensation, compression, reject); demodulation cannot.", objectives: ["u09-o3"], lesson: "u09-l3", level: 1 },
    { id: "u09-q14", type: "mc", q: "The entire image — near field and far field alike — is too dark. The most appropriate first adjustment is:", choices: ["Increase overall gain", "Increase output power to the maximum", "Increase the reject level", "Decrease dynamic range"], answer: 0,
      explain: "A uniform brightness problem calls for amplification, which boosts all echoes equally and costs no patient exposure. Maxing output power is tempting and would also brighten the image, but ALARA says use receiver gain first. Raising reject would make it darker, not brighter.", objectives: ["u09-o4"], lesson: "u09-l4", level: 2 },
    { id: "u09-q15", type: "mc", q: "A liver image is properly bright in the near field but too dark below about 8 cm. The best fix is:", choices: ["Raise overall gain", "Raise the far-field TGC sliders / slope", "Raise the reject level", "Switch to M-mode"], answer: 1,
      explain: "A brightness problem that depends on depth is a compensation problem, so shape the TGC curve deeper. Raising overall gain is the tempting answer, but it would also blow out the already-correct near field.", objectives: ["u09-o4"], lesson: "u09-l4", level: 3 },
    { id: "u09-q16", type: "short", q: "What is the name of the point on the TGC curve where maximum gain is first reached?", answer: "knee", accept: ["the knee", "knee point"],
      explain: "Near gain is the flat shallow part, the slope ramps up, the knee is where the ramp ends, and beyond it the flat far gain continues.", objectives: ["u09-o4"], lesson: "u09-l4", level: 1 },
    { id: "u09-q17", type: "tf", q: "Adjusting time gain compensation increases the acoustic output delivered to the patient.", answer: false,
      explain: "False. TGC is a receiver function applied to echoes that already returned. Only the pulser's output power control changes patient exposure.", objectives: ["u09-o4"], lesson: "u09-l4", level: 2 },
    { id: "u09-q18", type: "mc", q: "Dynamic range is best defined as:", choices: ["The difference between the highest and lowest frequency in the pulse", "The ratio of the largest to the smallest signal a component can handle, in dB", "The depth range over which the image is in focus", "The range of gain applied by the TGC curve"], answer: 1,
      explain: "It is a ratio of signal magnitudes reported in decibels. Choice 0 describes bandwidth, which is the tempting mix-up because both are 'ranges' — but bandwidth is in MHz.", objectives: ["u09-o5"], lesson: "u09-l5", level: 1 },
    { id: "u09-q19", type: "mc", q: "The sonographer lowers the dynamic range setting from 70 dB to 45 dB. The image will:", choices: ["Show more shades of gray and look softer", "Show fewer shades of gray and look more black-and-white", "Become uniformly brighter at all depths", "Lose spatial resolution"], answer: 1,
      explain: "Less dynamic range = fewer gray levels displayed = a harder, higher-contrast picture. Choice 0 is exactly backwards; it describes raising dynamic range. Spatial resolution is unaffected — that depends on pulse length, beam width and pixel density.", objectives: ["u09-o5"], lesson: "u09-l5", level: 2 },
    { id: "u09-q20", type: "short", q: "Which receiver function reduces dynamic range?", answer: "compression", accept: ["compression", "compress", "log compression"],
      explain: "Compression is the only one of the five that changes dynamic range; it squeezes roughly 100–120 dB of echo range into the 20–30 dB a display can show.", objectives: ["u09-o5"], lesson: "u09-l5", level: 2 },
    { id: "u09-q21", type: "mc", q: "Echoes arrive at the receiver spanning about 110 dB, but the monitor can display only about 25 dB. Without which receiver function would the image be mostly pure white spots on black?", choices: ["Demodulation", "Reject", "Compression", "Compensation"], answer: 2,
      explain: "Compression is what maps the huge input range onto the small output range, preserving gray scale. Compensation is tempting because it also changes displayed brightness, but it corrects brightness with depth, not the overall range.", objectives: ["u09-o5"], lesson: "u09-l5", level: 3 },
    { id: "u09-q22", type: "mc", q: "Rectification followed by smoothing describes which receiver function?", choices: ["Compression", "Demodulation", "Reject", "Amplification"], answer: 1,
      explain: "Those two steps are the definition of demodulation (envelope detection). Compression is the tempting distractor because 'squeezing' sounds like reshaping the waveform, but compression changes the range of amplitudes, not the plus/minus shape.", objectives: ["u09-o6"], lesson: "u09-l6", level: 1 },
    { id: "u09-q23", type: "mc", q: "A low-level electronic haze fills the lumen of a large simple cyst. Which control is designed to remove that low-amplitude noise?", choices: ["Reject", "Demodulation", "Output power", "Read zoom"], answer: 0,
      explain: "Reject (threshold) erases signals below a chosen level, which is exactly what low-level noise is. Demodulation is tempting since it is a neighbouring receiver step, but it has no knob and no visible effect.", objectives: ["u09-o6"], lesson: "u09-l6", level: 2 },
    { id: "u09-q24", type: "tf", q: "Echoes removed by reject can be recovered later by adjusting post-processing on the frozen image.", answer: false,
      explain: "False. Reject is applied before the data is written into memory, so those echoes were never stored. Post-processing can only remap what is already in memory.", objectives: ["u09-o6", "u09-o8"], lesson: "u09-l6", level: 3 },
    { id: "u09-q25", type: "short", q: "Name the two steps of demodulation.", answer: "rectification and smoothing", accept: ["rectification and smoothing", "rectify and smooth", "rectification, smoothing", "rectification + smoothing"],
      explain: "Rectification flips the negative half of the signal positive; smoothing traces an envelope over the humps.", objectives: ["u09-o6"], lesson: "u09-l6", level: 1 },
    { id: "u09-q26", type: "mc", q: "How many shades of gray can a 6-bit pixel display?", choices: ["12", "32", "64", "128"], answer: 2,
      explain: "2⁶ = 64. Choice 0 is the trap for anyone who multiplies 6 × 2 instead of raising 2 to the 6th power; 32 is 2⁵ and 128 is 2⁷.", objectives: ["u09-o7"], lesson: "u09-l7", level: 2 },
    { id: "u09-q27", type: "mc", q: "If display sampling is the limiting factor, doubling pixels over the same field of view primarily improves:", choices: ["Available gray levels", "Display spatial sampling", "Temporal resolution", "Acoustic penetration"], answer: 1,
      explain: "Smaller display samples can preserve finer detail when the matrix was limiting, but cannot exceed the transducer's acoustic resolution. Bits, not pixel count, set available gray levels.", objectives: ["u09-o7"], lesson: "u09-l7", level: 2 },
    { id: "u09-q28", type: "short", q: "How many shades of gray does an 8-bit pixel hold?", answer: "256", accept: ["256", "256 shades", "2^8"],
      explain: "2⁸ = 256, the most commonly quoted gray-scale depth in ultrasound memory.", objectives: ["u09-o7"], lesson: "u09-l7", level: 1 },
    { id: "u09-q29", type: "tf", q: "Analog scan converters are still preferred because they hold an image indefinitely without drift.", answer: false,
      explain: "False, and backwards: analog storage tubes drifted, faded and required frequent adjustment. Digital scan converters store exact numbers and are the standard.", objectives: ["u09-o7"], lesson: "u09-l7", level: 1 },
    { id: "u09-q30", type: "mc", q: "How many bits per pixel are required to store 1,024 shades of gray?", choices: ["8", "9", "10", "12"], answer: 2,
      explain: "2¹⁰ = 1,024, so 10 bits. Choice 0 (8 bits) is tempting because 256 shades is the familiar number, but 256 is four doublings short of 1,024.", objectives: ["u09-o7"], lesson: "u09-l7", level: 3 },
    { id: "u09-q31", type: "mc", q: "Read magnification is best described as:", choices: ["Post-processing that enlarges stored pixels without acquiring new data", "Pre-processing that rescans the region of interest", "A receiver function that boosts deep echoes", "A way to increase frame rate by narrowing the sector"], answer: 0,
      explain: "Read zoom happens after storage and simply draws the saved pixels bigger, so it can look blocky. Choice 1 describes write zoom, which is the standard trap because both are called 'zoom'.", objectives: ["u09-o8"], lesson: "u09-l8", level: 2 },
    { id: "u09-q32", type: "mc", q: "Which of the following is a POST-processing function?", choices: ["Time gain compensation", "Edge enhancement", "Black/white inversion", "Persistence"], answer: 2,
      explain: "Inverting black and white remaps stored pixel values on the way out, so it works even on a frozen image. TGC, edge enhancement and persistence all act before the data is stored.", objectives: ["u09-o8"], lesson: "u09-l8", level: 2 },
    { id: "u09-q33", type: "short", q: "Which magnification rescans the region of interest and gives better resolution?", answer: "write magnification", accept: ["write", "write zoom", "write magnification", "write mag"],
      explain: "Write (pre-processing) zoom acquires new scan lines inside the selected box, so the enlarged image contains genuinely new data instead of bigger old pixels.", objectives: ["u09-o8"], lesson: "u09-l8", level: 2 },
    { id: "u09-q34", type: "tf", q: "In the conventional stored-image model taught for this course, a function available on a frozen image is classified as post-processing.", answer: true,
      explain: "That is the course shortcut for stored image data. Some modern raw-data systems preserve more information and permit additional reprocessing, so it is not a universal hardware law.", objectives: ["u09-o8"], lesson: "u09-l8", level: 2 },
    { id: "u09-q35", type: "mc", q: "In medical imaging, DICOM is best described as:", choices: ["The hospital network that stores and distributes images", "The standard file format and communication protocol for medical images", "A flat-panel display technology", "A pre-processing function in the scan converter"], answer: 1,
      explain: "DICOM is the standard that lets different vendors exchange images plus their metadata. Choice 0 describes PACS, which is the classic swap.", objectives: ["u09-o9"], lesson: "u09-l9", level: 1 },
    { id: "u09-q36", type: "short", q: "What does PACS stand for?", answer: "picture archiving and communication system", accept: ["picture archiving and communication system", "picture archiving & communication system", "picture archival and communication system"],
      explain: "PACS is the digital archive and distribution network that replaced film libraries; DICOM is the format it moves around.", objectives: ["u09-o9"], lesson: "u09-l9", level: 1 },
    { id: "u09-q37", type: "tf", q: "Cathode ray tube monitors are the current standard display on new ultrasound systems.", answer: false,
      explain: "False. CRTs are obsolete; flat-panel LCD/LED (and OLED) displays are standard because they are thin, stable, geometrically exact and use less power.", objectives: ["u09-o9"], lesson: "u09-l9", level: 1 },
    { id: "u09-q38", type: "mc", q: "Spatial compounding improves the image mainly by:", choices: ["Increasing frame rate", "Averaging several steered looks to reduce speckle and angle-dependent artifacts", "Transmitting a longer coded pulse for deeper penetration", "Increasing the number of bits per pixel"], answer: 1,
      explain: "Several angled looks are averaged, so speckle and shadowing partly cancel and borders are better defined. Choice 0 is exactly the trade-off backwards: compounding lowers frame rate because it needs several frames for one.", objectives: ["u09-o10"], lesson: "u09-l10", level: 2 },
    { id: "u09-q39", type: "mc", q: "What does coded excitation buy the machine?", choices: ["Better penetration and SNR while keeping axial resolution", "More gray shades in memory", "A higher frame rate in 3D", "Elimination of the need for TGC"], answer: 0,
      explain: "A long coded pulse puts more energy into the body, and decoding on receive recovers the short-pulse axial resolution. Choice 1 confuses transmit coding with memory bit depth, which is unrelated.", objectives: ["u09-o10"], lesson: "u09-l10", level: 2 },
    { id: "u09-q40", type: "short", q: "Which imaging technique maps tissue stiffness?", answer: "elastography", accept: ["elastography", "elastogram", "shear wave elastography"],
      explain: "Strain or shear-wave elastography measures how much tissue deforms or how fast a shear wave travels — faster shear wave means stiffer tissue.", objectives: ["u09-o10"], lesson: "u09-l10", level: 1 },
    { id: "u09-q41", type: "mc", q: "An idealized sequential spatial-compounding system needs five non-overlapping steered acquisitions per displayed frame. From 30 acquisitions/s, displayed frame rate is approximately:", choices: ["150 frames per second", "30 frames per second", "6 frames per second", "Unchanged because all compounding is post-processing"], answer: 2,
      explain: "Five frames are averaged into one, so about 30 ÷ 5 = 6 frames per second. Choice 3 is tempting because compounding sounds like image processing, but the extra looks must actually be acquired, which costs real time.", objectives: ["u09-o10"], lesson: "u09-l10", level: 3 },
    { id: "u09-q42", type: "mc", q: "Which pair correctly states what digital storage can provide?", choices: ["More bits → finer acoustic beam; more pixels → more transmitted power", "More bits → more gray levels; more pixels → finer display sampling when matrix-limited", "More bits → higher frame rate; more pixels → lower attenuation", "More bits → penetration; more pixels → Doppler sensitivity"], answer: 1,
      explain: "Bits provide representable gray levels and pixels provide display samples. Neither guarantees clinical contrast or beats acoustic resolution by itself.", objectives: ["u09-o7"], lesson: "u09-l7", level: 2 },
    { id: "u09-q43", type: "mc", q: "Which sequence correctly describes the path of an echo after it returns to the transducer?", choices: ["Receiver → scan converter → display", "Scan converter → receiver → display", "Pulser → receiver → display", "Beamformer → display → scan converter"], answer: 0,
      explain: "Returning voltages are processed by the receiver, stored and reformatted by the scan converter, then shown on the display. Choice 2 is tempting because the pulser is part of the system, but the pulser is only in the transmit path.", objectives: ["u09-o2"], lesson: "u09-l2", level: 2 }
  ],

  drills: [
    {
      id: "u09-d1", title: "Shades of gray from bits", formula: "shades = 2^bits", lesson: "u09-l7",
      gen: function (rnd) {
        var bits = 1 + Math.floor(rnd() * 10);
        var shades = Math.pow(2, bits);
        return {
          kind: "number",
          given: "Each pixel in the image memory stores " + bits + " bit" + (bits === 1 ? "" : "s") + ".",
          ask: "How many shades of gray can each pixel display?",
          answer: shades, unit: "shades", tol: 0.5,
          steps: ["shades = 2 raised to the number of bits", "= 2^" + bits, "= " + shades + " shades"]
        };
      }
    },
    {
      id: "u09-d2", title: "Bits needed for a number of shades", formula: "bits = log₂(shades)", lesson: "u09-l7",
      gen: function (rnd) {
        var bits = 2 + Math.floor(rnd() * 9);
        var shades = Math.pow(2, bits);
        return {
          kind: "number",
          given: "A system must display " + shades + " shades of gray.",
          ask: "How many bits per pixel are required?",
          answer: bits, unit: "bits", tol: 0.5,
          steps: ["Ask: 2 to what power equals " + shades + "?", "2^" + bits + " = " + shades, "So " + bits + " bits per pixel"]
        };
      }
    },
    {
      id: "u09-d3", title: "Pixels, bits and which resolution improves", formula: "pixels → spatial · bits → contrast", lesson: "u09-l7",
      gen: function (rnd) {
        var scenarios = [
          { g: "The matrix for the same field of view changes from 512 × 512 to 1024 × 1024 pixels.", a: 0, s: ["More pixels in the same area means smaller pixels", "Smaller pixels resolve finer detail", "Spatial resolution improves"] },
          { g: "Memory is upgraded from 6 bits per pixel to 8 bits per pixel.", a: 1, s: ["6 bits = 64 shades, 8 bits = 256 shades", "More gray shades means finer brightness differences are visible", "Contrast resolution improves"] },
          { g: "The matrix for the same field of view is reduced from 1024 × 1024 to 256 × 256 pixels.", a: 2, s: ["Fewer, larger pixels in the same area", "Fine detail is lost and the image looks blocky", "Spatial resolution worsens"] },
          { g: "Memory is reduced from 8 bits per pixel to 4 bits per pixel.", a: 3, s: ["8 bits = 256 shades, 4 bits = only 16 shades", "Fewer gray levels available", "Contrast resolution worsens"] },
          { g: "Read zoom is used to enlarge a stored region of the frozen image.", a: 4, s: ["Read zoom enlarges pixels already in memory", "No new scan lines are fired, so no new information", "Neither spatial nor contrast resolution improves"] }
        ];
        var sc = scenarios[Math.floor(rnd() * scenarios.length)];
        return {
          kind: "choice",
          given: sc.g,
          ask: "What happens to image quality?",
          choices: ["Spatial resolution improves", "Contrast resolution improves", "Spatial resolution worsens", "Contrast resolution worsens", "Neither improves — no new data"],
          answer: sc.a,
          steps: sc.s
        };
      }
    },
    {
      id: "u09-d4", title: "Which receiver function fixes this?", formula: "amplify · compensate · compress · demodulate · reject", lesson: "u09-l3",
      gen: function (rnd) {
        var cases = [
          { g: "The whole image, near and far, is uniformly too dark.", a: 0, s: ["The problem is the same at every depth", "Amplification boosts all echoes equally", "Answer: amplification (gain)"] },
          { g: "The near field looks correct but the deep half of a uniform liver is too dark.", a: 1, s: ["The problem depends on depth, so it is an attenuation problem", "Compensation adds more gain to later (deeper) echoes", "Answer: compensation (TGC)"] },
          { g: "Only the brightest specular echoes show; everything else is black, with no gray scale.", a: 2, s: ["The echo range is far wider than the display can show", "Compression squeezes the dynamic range to fit", "Answer: compression"] },
          { g: "A faint electronic haze fills an otherwise anechoic cyst.", a: 3, s: ["The unwanted signals are all low amplitude", "Reject erases everything below a set threshold", "Answer: reject"] },
          { g: "The signal still swings above and below the baseline and must be turned into a smooth envelope.", a: 4, s: ["Rectification flips the negative half up", "Smoothing draws the envelope", "Answer: demodulation (not operator-adjustable)"] },
          { g: "Gray-scale texture looks too harsh and black-and-white; the sonographer wants a softer image with more shades.", a: 2, s: ["Number of displayed gray shades is a dynamic range question", "Raising the dynamic range setting is a compression adjustment", "Answer: compression"] }
        ];
        var c = cases[Math.floor(rnd() * cases.length)];
        return {
          kind: "choice",
          given: c.g,
          ask: "Which receiver function addresses this?",
          choices: ["Amplification", "Compensation (TGC)", "Compression", "Reject", "Demodulation"],
          answer: c.a,
          steps: c.s
        };
      }
    },
    {
      id: "u09-d5", title: "Pre-processing or post-processing?", formula: "write = pre (before storage) · read = post (after storage)", lesson: "u09-l8",
      gen: function (rnd) {
        var items = [
          { n: "Time gain compensation", pre: true, why: "TGC is applied to signals before they are written into memory" },
          { n: "Compression (dynamic range)", pre: true, why: "Compression is a receiver function, applied before storage" },
          { n: "Edge enhancement", pre: true, why: "Edge enhancement changes the data that gets stored" },
          { n: "Persistence (frame averaging)", pre: true, why: "Frames are averaged as they are written into memory" },
          { n: "Write magnification", pre: true, why: "Write zoom rescans the region before storing it" },
          { n: "Read magnification", pre: false, why: "Read zoom enlarges pixels that are already stored" },
          { n: "Black/white inversion", pre: false, why: "Inversion remaps stored pixel values on the way out" },
          { n: "Changing the gray map or B-color map", pre: false, why: "Gray maps are applied as the image is read out of memory" },
          { n: "Adjusting displayed brightness of a frozen image", pre: false, why: "It works on a frozen frame, so it must be a read function" }
        ];
        var it = items[Math.floor(rnd() * items.length)];
        return {
          kind: "choice",
          given: it.n,
          ask: "Is this pre-processing or post-processing?",
          choices: ["Pre-processing (before storage)", "Post-processing (after storage)"],
          answer: it.pre ? 0 : 1,
          steps: [it.why, "Test: can it be done to a frozen image? " + (it.pre ? "No → pre-processing" : "Yes → post-processing")]
        };
      }
    },
    {
      id: "u09-d8", title: "Dynamic range reasoning", formula: "↓ dynamic range → fewer shades → more contrast", lesson: "u09-l5",
      gen: function (rnd) {
        var from = [70, 65, 60, 55][Math.floor(rnd() * 4)];
        var change = [10, 15, 20, 25][Math.floor(rnd() * 4)];
        var down = rnd() < 0.5;
        var to = down ? from - change : from + change;
        return {
          kind: "choice",
          given: "The sonographer changes the dynamic range setting from " + from + " dB to " + to + " dB.",
          ask: "How does the displayed image change?",
          choices: [
            "Fewer gray shades, higher contrast (more black-and-white)",
            "More gray shades, lower contrast (softer, smoother)",
            "Brighter only in the far field",
            "Better spatial resolution"
          ],
          answer: down ? 0 : 1,
          steps: [
            "Dynamic range is the ratio of largest to smallest displayed signal, in dB",
            (down ? "Lower" : "Higher") + " dynamic range setting means " + (down ? "fewer" : "more") + " gray shades are shown",
            (down ? "Fewer shades → harder, higher-contrast image" : "More shades → softer, lower-contrast image"),
            "Depth-dependent brightness is TGC, and spatial resolution is unaffected"
          ]
        };
      }
    },
    { id:"u09-d6",title:"Digital memory and signal math",formula:"DR/gain, pixels, memory, sequential compounding",lesson:"u09-l7",gen:function(rnd){var cases=[function(){var n=[256,512,1024][Math.floor(rnd()*3)],b=[6,8,10][Math.floor(rnd()*3)];return {g:n+" × "+n+" pixels at "+b+" bits/pixel",q:"Memory per frame in bits?",a:n*n*b,u:"bits",s:["memory = rows × columns × bits/pixel","= "+n+" × "+n+" × "+b,"= "+(n*n*b)+" bits"]};},function(){var ratio=[10,100,1000][Math.floor(rnd()*3)],v=10*Math.log10(ratio);return {g:"Power ratio = "+ratio+":1",q:"Dynamic range or gain in dB?",a:v,u:"dB",s:["dB = 10 log₁₀(ratio)","= 10 log₁₀("+ratio+")","= "+v+" dB"]};},function(){var fr=[24,30,60][Math.floor(rnd()*3)],looks=[2,3,5][Math.floor(rnd()*3)],v=fr/looks;return {g:fr+" acquisitions/s and "+looks+" non-overlapping sequential looks",q:"Idealized displayed frame rate?",a:v,u:"fps",s:["FR = acquisition rate ÷ looks","= "+fr+" ÷ "+looks,"= "+v+" fps"]};}];var x=cases[Math.floor(rnd()*cases.length)]();return {kind:"number",given:x.g,ask:x.q,answer:+x.a.toFixed(2),unit:x.u,tol:0.05,steps:x.s};} }
  ],

  whiteboard: [
    { id: "u09-w1", prompt: "Brain-dump the receiver: all five functions in order, what each does, whether the operator can adjust it, and whether it changes the image.",
      keyPoints: [
        "Order: amplification, compensation, compression, demodulation, reject",
        "Mnemonic: All Cows Can Digest Roughage",
        "Amplification = gain, in dB, boosts all echoes equally",
        "Compensation = TGC/DGC/swept gain, more gain with depth, fixes attenuation",
        "TGC curve parts: near gain, slope, knee, far gain",
        "Compression reduces dynamic range (about 100–120 dB in, 20–30 dB out)",
        "Low dynamic range = fewer shades, high contrast; high DR = more shades, softer",
        "Demodulation = rectification + smoothing; NOT adjustable, no visible effect",
        "Reject = threshold, erases low-level noise; adjustable, visible",
        "Four of five are operator-adjustable",
        "None of the five changes acoustic output to the patient"
      ], minutes: 7, lesson: "u09-l3" },
    { id: "u09-w2", prompt: "Draw the complete system block diagram from pulser to storage, with arrows, and label each block's job.",
      keyPoints: [
        "Pulser: creates driving voltage, sets amplitude (output power) and PRF",
        "Beamformer: time delays for steering and focusing, apodization, receive focus",
        "Transducer: voltage to sound and sound back to voltage",
        "Echoes return to the transducer, then to the receiver",
        "Receiver: the five processing steps",
        "Scan converter: memory plus geometry conversion to a raster image",
        "Display: flat panel (LCD/LED); CRT obsolete",
        "Storage: hard drive and PACS, exchanged in DICOM format",
        "Only pulser output changes patient exposure"
      ], minutes: 6, lesson: "u09-l2" },
    { id: "u09-w3", prompt: "Write everything about the digital scan converter: pixels, bits, shades, and the pre- versus post-processing lists.",
      keyPoints: [
        "Analog scan converter: storage tube, drifts and fades, obsolete",
        "Digital scan converter: stores numbers, stable and exact",
        "Pixel = picture element, smallest box; matrix 512 × 512 or 1024 × 1024",
        "Shades of gray = 2^bits; 6 bits = 64, 8 bits = 256, 10 bits = 1,024",
        "More pixels → better spatial resolution",
        "More bits → better contrast resolution",
        "Pre-processing = write, before storage: TGC, compression, edge enhancement, persistence, write zoom",
        "Post-processing = read, after storage: gray map, B-color, black/white invert, read zoom",
        "Write zoom rescans (new data, better resolution); read zoom enlarges stored pixels (no new data)",
        "Test: if it works on a frozen image, it is post-processing"
      ], minutes: 8, lesson: "u09-l7" },
    { id: "u09-w4", prompt: "List A-, B- and M-mode with their axes and uses, then the five modern imaging features with one benefit and one cost each.",
      keyPoints: [
        "A-mode: amplitude spikes vs depth, 1D, ophthalmology",
        "B-mode: brightness dots, 2D gray scale, real-time anatomy",
        "M-mode: one line, depth down, time across, best temporal resolution",
        "Coded excitation: better penetration and SNR, axial resolution preserved; costs processing complexity",
        "Spatial compounding: less speckle and fewer shadow artifacts; costs frame rate",
        "Frequency compounding: less speckle by averaging sub-bands; costs some resolution/SNR",
        "Elastography: shows stiffness (strain or shear-wave speed)",
        "3D/4D: volume data from swept slices or a 2D matrix array; 4D = real-time 3D",
        "General rule: every averaging or volume trick costs temporal resolution"
      ], minutes: 7, lesson: "u09-l10" }
  ]
});
