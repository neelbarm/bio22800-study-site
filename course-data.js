/* BIO 22800 — Ecology & Evolution · Exam 1 content (Lectures 1–4)
   Every lecture slide is embedded from ./slides/Lx/slide-NN.jpg
   Structure: COURSE[] -> lecture -> topics[] -> {slides[], quiz[]} */
window.COURSE = [

/* ===================== LECTURE 1 ===================== */
{
 id:"L1", icon:"🗺️", short:"L1 · Levels, Biomes, Niche",
 title:"Lecture 1 — Levels, Biomes & the Niche",
 blurb:"What ecology & evolution are, levels of organization, biomes, species distribution, and the niche.",
 objectives:[
  "Define the levels of biological organization from most to least specific",
  "Define a biome and describe the factors that influence them",
  "List the environmental variables and plant communities for tropical forests, temperate forests, savannahs, tundra, and desert",
  "Define species distribution",
  "Explain the three factors that affect species distribution — the BAM diagram",
  "Compare and contrast the Grinnellian, Eltonian, and Hutchinsonian (fundamental & realized) niche"
 ],
 topics:[

  {
   id:"L1T1", title:"What is ecology & evolution?",
   sub:"Definitions and why the field matters (slides 1–8).",
   slides:[
    {h:"Ecology — the definition", imgs:[{src:"slides/L1/slide-01.jpg",cap:"L1 · Slide 1"}], html:`
      <p class="lead"><span class="kw">Ecology</span> = the study of the <b>interactions</b> between an organism and the <span class="kw-2">abiotic (nonliving)</span> and <span class="kw-2">biotic (living)</span> components of its environment.</p>
      <ul><li><b>Abiotic</b> = nonliving factors: temperature, water, sunlight, soil, nutrients.</li>
      <li><b>Biotic</b> = living factors: predators, prey, competitors, mates, parasites.</li></ul>
      <div class="callout tip">The leaf-cutter ant, hummingbird, and mole on this slide all interact with <b>both</b> living things (food, plants) and nonliving things (soil, air, temperature). That dual interaction is the heart of ecology.</div>`},
    {h:"Evolution — microevolution vs. macroevolution", imgs:[{src:"slides/L1/slide-02.jpg",cap:"L1 · Slide 2"},{src:"slides/L1/slide-03.jpg",cap:"L1 · Slide 3"}], html:`
      <p class="lead">Evolution operates at two scales:</p>
      <table class="dt"><tr><th>Term</th><th>Definition</th></tr>
      <tr><td><b>Microevolution</b></td><td>A change in <span class="kw">allele (gene variant) frequencies</span> over time within a population</td></tr>
      <tr><td><b>Macroevolution</b></td><td><span class="kw">Descent with modification</span> — large-scale change producing new species and groups over long timescales (the phylogenetic tree)</td></tr></table>
      <div class="callout key">Quick memory: <b>micro</b> = small genetic shifts <i>inside</i> a population; <b>macro</b> = the big branching tree of life <i>across</i> species.</div>`},
    {h:"Why study ecology & evolution?", imgs:[{src:"slides/L1/slide-04.jpg",cap:"L1 · Slide 4 — biodiversity hotspots"},{src:"slides/L1/slide-05.jpg",cap:"L1 · Slide 5 — distribution patterns / SDM"},{src:"slides/L1/slide-06.jpg",cap:"L1 · Slide 6"},{src:"slides/L1/slide-07.jpg",cap:"L1 · Slide 7"},{src:"slides/L1/slide-08.jpg",cap:"L1 · Slide 8"}], html:`
      <p class="lead">Understanding ecology and evolution helps us <span class="kw">preserve biodiversity</span> and explain the living world. The lecture lists three payoffs:</p>
      <ul>
      <li><b>Identifying biodiversity hotspots</b> (slide 4 map) — where to focus conservation.</li>
      <li><b>Understanding species distribution and reproductive patterns</b> (slide 5) — predicting where species live and how they breed.</li>
      <li><b>Explaining the diversity and distribution of life on Earth</b> (slides 6–8) — the staggering variety of plants, animals, and butterflies.</li></ul>`}
   ],
   quiz:[
    {type:"mcq",q:"Ecology is best defined as the study of:",opts:["The genetic code of organisms","Interactions between organisms and their abiotic and biotic environment","The classification of species into groups","Only the predators and prey in a food chain"],a:1,exp:"Ecology studies interactions between an organism and both the nonliving (abiotic) and living (biotic) parts of its environment."},
    {type:"mcq",q:"A change in allele (gene variant) frequencies in a population over time is:",opts:["Macroevolution","Microevolution","Descent with modification","Speciation"],a:1,exp:"Microevolution = change in allele frequencies over time. Macroevolution is the larger-scale 'descent with modification.'"},
    {type:"tf",q:"Soil, temperature, and sunlight are examples of biotic factors.",a:false,exp:"False — those are abiotic (nonliving) factors. Biotic factors are living: predators, competitors, mates, etc."},
    {type:"tf",q:"Macroevolution refers to 'descent with modification' producing large-scale diversity over time.",a:true,exp:"True — that is exactly how the lecture defines macroevolution."},
    {type:"short",q:"Distinguish abiotic from biotic environmental components and give one example of each.",model:"Abiotic components are the nonliving parts of the environment, such as temperature, water, or sunlight. Biotic components are the living parts, such as predators, prey, or competing plants. Ecology studies how an organism interacts with both.",pts:["Abiotic = nonliving (e.g., temperature/water/sunlight)","Biotic = living (e.g., predators/prey/competitors)","Ecology = interactions with both"]}
   ]
  },

  {
   id:"L1T2", title:"Levels of biological organization",
   sub:"From organism up to the biosphere (slides 9–14).",
   slides:[
    {h:"The hierarchy — overview", imgs:[{src:"slides/L1/slide-09.jpg",cap:"L1 · Slide 9"}], html:`
      <p class="lead">Ecology is organized as a <span class="kw">nested hierarchy</span>, from most specific to least specific:</p>
      <ul><li><b>Organism</b> → <b>Population</b> → <b>Community</b> → <b>Ecosystem</b> → <b>Biosphere</b></li></ul>
      <p>Each level contains the one before it and adds something new. The biosphere = all ecosystems on Earth.</p>
      <div class="callout key">Exam objective: "Define the levels of biological organization from most to least specific." Practice saying them in order both ways.</div>`},
    {h:"Organism → Population → Community", imgs:[{src:"slides/L1/slide-10.jpg",cap:"L1 · Slide 10 — organism"},{src:"slides/L1/slide-11.jpg",cap:"L1 · Slide 11 — population"},{src:"slides/L1/slide-12.jpg",cap:"L1 · Slide 12 — community"}], html:`
      <table class="dt"><tr><th>Level</th><th>Definition (from slides)</th></tr>
      <tr><td><b>Organism</b></td><td>A single living individual</td></tr>
      <tr><td><b>Population</b></td><td>All the individual organisms of a <span class="kw">single species</span> living within a specific area</td></tr>
      <tr><td><b>Community</b></td><td>The sum of <span class="kw">all populations across species</span> in a given area</td></tr></table>
      <div class="callout key">The key jump: <b>population = one species; community = many species</b>.</div>`},
    {h:"Ecosystem → Biosphere", imgs:[{src:"slides/L1/slide-13.jpg",cap:"L1 · Slide 13 — ecosystem"},{src:"slides/L1/slide-14.jpg",cap:"L1 · Slide 14 — biosphere"}], html:`
      <table class="dt"><tr><th>Level</th><th>Definition (from slides)</th></tr>
      <tr><td><b>Ecosystem</b></td><td>All living things in an area <span class="kw">plus the abiotic, non-living parts</span> of that environment (precipitation, soil, atmosphere)</td></tr>
      <tr><td><b>Biosphere</b></td><td>The collection of <span class="kw">all ecosystems on Earth</span></td></tr></table>
      <div class="callout tip">Community → Ecosystem is the step where you <b>add the nonliving environment</b>. That's the single most-tested distinction in this topic.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"All the individuals of a single species in a specific area form a:",opts:["Community","Population","Ecosystem","Biosphere"],a:1,exp:"A population = all individuals of one species in an area."},
    {type:"mcq",q:"Which level adds the abiotic (non-living) environment to a community?",opts:["Population","Organism","Ecosystem","Biome"],a:2,exp:"An ecosystem = a community plus its abiotic environment (soil, precipitation, atmosphere)."},
    {type:"mcq",q:"Listed from most to least specific, the correct order is:",opts:["Biosphere → Ecosystem → Community → Population → Organism","Organism → Population → Community → Ecosystem → Biosphere","Population → Organism → Community → Biosphere → Ecosystem","Organism → Community → Population → Ecosystem → Biosphere"],a:1,exp:"Most→least specific: Organism, Population, Community, Ecosystem, Biosphere."},
    {type:"tf",q:"The biosphere is the collection of all ecosystems on Earth.",a:true,exp:"True — that is the slide's definition of the biosphere."},
    {type:"short",q:"Explain the difference between a community and an ecosystem.",model:"A community is the sum of all populations of different species living in a given area — only the living organisms. An ecosystem includes that community plus the abiotic, non-living components of the environment, such as soil, water, and atmosphere.",pts:["Community = all living populations (many species)","Ecosystem = community + abiotic environment","Ecosystem adds the non-living parts"]}
   ]
  },

  {
   id:"L1T3", title:"Biomes & what shapes them",
   sub:"Biome definition and the factors that create them (slides 15–23).",
   slides:[
    {h:"What is a biome?", imgs:[{src:"slides/L1/slide-15.jpg",cap:"L1 · Slide 15 — world biomes"},{src:"slides/L1/slide-16.jpg",cap:"L1 · Slide 16 — Whittaker climate graph"}], html:`
      <p class="lead">A <span class="kw">biome</span> is a community of plants, animals, and other organisms that are adapted to a <span class="kw-2">characteristic set of environmental conditions</span>. Biomes are the terrestrial categories of the biosphere.</p>
      <p>Slide 16 (the Whittaker graph) shows biomes are recognized by the <b>environmental variables</b> they're associated with — plotted by <b>average temperature</b> (x-axis) and <b>annual precipitation</b> (y-axis). Hot+wet = tropical forest; cold+dry = tundra; warm+dry = desert.</p>`},
    {h:"Factors: precipitation, temperature, seasonality", imgs:[{src:"slides/L1/slide-17.jpg",cap:"L1 · Slide 17 — precipitation"},{src:"slides/L1/slide-18.jpg",cap:"L1 · Slide 18 — temperature"},{src:"slides/L1/slide-19.jpg",cap:"L1 · Slide 19 — seasonality"}], html:`
      <p class="lead">Three climate variables shape which biome forms:</p>
      <ul><li><b>Precipitation</b> — total annual rainfall (slide 17).</li>
      <li><b>Temperature</b> — annual average temperature (slide 18).</li>
      <li><b>Seasonality</b> — how much temperature/rainfall swings across the year (slide 19).</li></ul>
      <div class="callout">Notice the maps: tropical regions near the equator are warm and wet; deserts sit in dry bands; poles are cold. These gradients set up the biome pattern.</div>`},
    {h:"Topography & the rain shadow", imgs:[{src:"slides/L1/slide-20.jpg",cap:"L1 · Slide 20 — rain shadow"},{src:"slides/L1/slide-21.jpg",cap:"L1 · Slide 21 — the Andes"}], html:`
      <p class="lead"><span class="kw">Topography (mountains)</span> creates yet another source of variation in precipitation.</p>
      <p><b>Rain shadow:</b> when warm, humid air blows over a mountain range, the cooler temperatures at altitude cause precipitation on the windward side. The now-dried air descends the far side, creating a <span class="kw-2">rain shadow</span> — a dry zone.</p>
      <p><b>The Andes example:</b> the eastern side is very wet (it traps moisture coming off the Amazon), while the western side is very dry — producing <b>different biomes on either side of the same mountain range</b>.</p>`},
    {h:"Elevation ≈ latitude", imgs:[{src:"slides/L1/slide-22.jpg",cap:"L1 · Slide 22 — elevation & latitude"},{src:"slides/L1/slide-23.jpg",cap:"L1 · Slide 23 — summary"}], html:`
      <p class="lead">Ascending a mountain is like <span class="kw">traveling toward the poles</span>.</p>
      <ul><li>Air is less dense at high elevations and retains heat more poorly, so it gets colder as you climb.</li>
      <li>About <b>¼ of Earth's surface is mountainous</b>.</li>
      <li>A <b>1,000 m gain in elevation ≈ traveling 1,400 km (about 13° of latitude) toward the poles</b>.</li></ul>
      <div class="callout key">Summary (slide 23): Precipitation, Temperature, Seasonality, and Topography together dictate <b>plant communities</b> (tropical, temperate, desert…), which in turn shape the <b>animal communities</b>.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"On a Whittaker-style climate graph, biomes are defined primarily by:",opts:["Latitude and longitude","Average temperature and annual precipitation","Soil pH and elevation only","Predator and prey abundance"],a:1,exp:"Biomes are recognized by environmental variables — chiefly average temperature and annual precipitation."},
    {type:"mcq",q:"A rain shadow forms because:",opts:["Mountains block sunlight on one side","Humid air drops its moisture rising over a mountain, leaving dry air on the far side","Deserts always form near oceans","Cold air holds more water than warm air"],a:1,exp:"Air cools and releases precipitation as it rises over the range; the dried, descending air creates a dry rain shadow on the leeward side."},
    {type:"mcq",q:"Roughly, a 1,000 m increase in elevation is similar to traveling how far toward the poles?",opts:["About 14 km","About 140 km","About 1,400 km","About 14,000 km"],a:2,exp:"The slide states ~1,400 km (about 13° latitude) toward the poles per 1,000 m of elevation."},
    {type:"tf",q:"The eastern and western sides of the Andes support different biomes because of differences in precipitation.",a:true,exp:"True — the eastern side traps Amazon moisture (wet) and the western side is dry, producing different biomes."},
    {type:"short",q:"Name the four factors discussed that influence which biome forms in a region.",model:"The four factors are precipitation, temperature, seasonality, and topography (mountains). Together they determine the plant communities of a region, which in turn shape its animal communities.",pts:["Precipitation","Temperature","Seasonality","Topography (mountains)"]}
   ]
  },

  {
   id:"L1T4", title:"The major biomes",
   sub:"The five biomes you must know cold (slides 24–28).",
   slides:[
    {h:"Tropical forests", imgs:[{src:"slides/L1/slide-24.jpg",cap:"L1 · Slide 24"}], html:`
      <ul><li>Stable temperature and sunlight year-round</li><li>Hot and humid climates</li>
      <li>High and consistent annual rainfall</li><li>Characterized by <span class="kw">evergreen forests</span></li></ul>
      <div class="callout tip">Highest biodiversity of any terrestrial biome — a theme that returns in Lecture 4 (latitudinal diversity gradient).</div>`},
    {h:"Temperate forests", imgs:[{src:"slides/L1/slide-25.jpg",cap:"L1 · Slide 25"}], html:`
      <ul><li><span class="kw">Defined seasons</span></li><li>Can drop to freezing temperatures during winter</li>
      <li>Similar precipitation throughout the year</li><li>Characterized by <span class="kw">deciduous forests</span> (trees that drop leaves)</li></ul>`},
    {h:"Savannahs", imgs:[{src:"slides/L1/slide-26.jpg",cap:"L1 · Slide 26"}], html:`
      <ul><li>Hot</li><li>Precipitation similar to some tropical environments but with an <span class="kw">extensive dry season</span></li>
      <li><span class="kw-2">Sparse trees</span> with lots of grasses and herbaceous plants</li></ul>`},
    {h:"Tundra", imgs:[{src:"slides/L1/slide-27.jpg",cap:"L1 · Slide 27"}], html:`
      <ul><li>Very cold climate</li><li>Low precipitation</li>
      <li><span class="kw">Permanently frozen subsoil</span> (permafrost)</li>
      <li>Low-growing plants such as mosses, lichens, and shrubs (no trees)</li></ul>`},
    {h:"Desert", imgs:[{src:"slides/L1/slide-28.jpg",cap:"L1 · Slide 28"}], html:`
      <ul><li>Extremely dry climate; very little precipitation</li>
      <li>Temperatures may be hot or cold — the <span class="kw">lack of water is the defining feature</span>, not temperature</li>
      <li>Cacti, succulents, and drought-tolerant plants</li></ul>
      <div class="callout key">Common trap: deserts aren't defined by being <i>hot</i> — they're defined by being <b>dry</b>. There are cold deserts too.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Which biome is defined by permanently frozen subsoil and low-growing mosses, lichens, and shrubs?",opts:["Savannah","Tundra","Temperate forest","Desert"],a:1,exp:"Tundra — very cold, low precipitation, permafrost, no trees."},
    {type:"mcq",q:"The single defining feature of a desert is:",opts:["High temperature","Lack of water","Sandy soil","Absence of animals"],a:1,exp:"Deserts are defined by extreme dryness (little precipitation); they can be hot or cold."},
    {type:"mcq",q:"Deciduous forests with defined seasons and winter freezing describe which biome?",opts:["Tropical forest","Temperate forest","Savannah","Tundra"],a:1,exp:"Temperate forests have four seasons, can freeze in winter, and are characterized by deciduous trees."},
    {type:"mcq",q:"Hot climate, an extensive dry season, and sparse trees among abundant grasses describe a:",opts:["Savannah","Desert","Tropical forest","Tundra"],a:0,exp:"That is the savannah — grassland with scattered trees and a strong dry season."},
    {type:"tf",q:"Tropical forests are characterized by deciduous trees that lose their leaves seasonally.",a:false,exp:"False — tropical forests are characterized by evergreen forests with consistent year-round conditions. Deciduous forests are temperate."},
    {type:"short",q:"List the environmental variables and plant community that define the tundra biome.",model:"The tundra has a very cold climate, low precipitation, and permanently frozen subsoil (permafrost). Its plant community consists of low-growing species such as mosses, lichens, and shrubs, with no trees.",pts:["Very cold; low precipitation","Permafrost (frozen subsoil)","Low plants: mosses, lichens, shrubs; no trees"]}
   ]
  },

  {
   id:"L1T5", title:"Species distribution & the BAM diagram",
   sub:"Why species live where they do (slides 29–37).",
   slides:[
    {h:"What is species distribution?", imgs:[{src:"slides/L1/slide-29.jpg",cap:"L1 · Slide 29"},{src:"slides/L1/slide-30.jpg",cap:"L1 · Slide 30"}], html:`
      <p class="lead"><span class="kw">Species distribution</span> = the geographic area where individuals of a species are present.</p>
      <p>The motivating question: why do you see a particular plant, bird, or mammal in one place and not another?</p>`},
    {h:"Distribution examples", imgs:[{src:"slides/L1/slide-31.jpg",cap:"L1 · Slide 31 — cougar"},{src:"slides/L1/slide-32.jpg",cap:"L1 · Slide 32 — penguins"},{src:"slides/L1/slide-33.jpg",cap:"L1 · Slide 33 — ring-tailed lemurs"}], html:`
      <p class="lead">Range maps show how different species occupy very different geographic areas:</p>
      <ul><li><b>Cougar</b> — a broad range across the Americas.</li>
      <li><b>Penguins</b> — restricted to cold southern waters.</li>
      <li><b>Ring-tailed lemurs</b> — found only on Madagascar (a preview of endemism in Lecture 4).</li></ul>`},
    {h:"Three factors that explain distribution", imgs:[{src:"slides/L1/slide-34.jpg",cap:"L1 · Slide 34"}], html:`
      <p class="lead">A species occupies an area only if three conditions are met:</p>
      <ol><li><b>Environmental suitability (abiotic)</b> — the climate and other abiotic factors must be suitable.</li>
      <li><b>Environmental suitability (biotic)</b> — there must be sufficient resources, and pressures from predators and competitors can't be too intense.</li>
      <li><b>Dispersal</b> — the species (or its ancestor) must have been able to <span class="kw">disperse</span> to the area, and not have gone extinct there since.</li></ol>
      <div class="callout key">These three map exactly onto the <b>BAM diagram</b>: Abiotic, Biotic, and Movement (dispersal).</div>`},
    {h:"Dispersal limitation", imgs:[{src:"slides/L1/slide-35.jpg",cap:"L1 · Slide 35"}], html:`
      <p class="lead">Distribution is affected by <span class="kw">dispersal limitation</span> — species differ in their ability to disperse, and this shapes their ranges.</p>
      <p>Coconuts float across oceans; dandelion seeds blow on the wind. A species with poor dispersal may be absent from suitable habitat simply because it could never get there.</p>`},
    {h:"Dispersal & continental history: marsupials", imgs:[{src:"slides/L1/slide-36.jpg",cap:"L1 · Slide 36"}], html:`
      <p class="lead">The current distribution of <span class="kw">marsupials</span> (e.g., kangaroos, opossums) can be explained by the <span class="kw-2">break-up of Gondwana</span>, the ancient supercontinent.</p>
      <p>As landmasses drifted apart, marsupial populations were carried with them — so today's distribution reflects deep geological/dispersal history, not just current climate.</p>`},
    {h:"The BAM diagram", imgs:[{src:"slides/L1/slide-37.jpg",cap:"L1 · Slide 37 — BAM (Peterson et al. 2011)"}], html:`
      <p class="lead">The <span class="kw">BAM diagram</span> (Peterson et al. 2011) combines the three factors into overlapping circles. A species' <b>occupied distributional area</b> is where all three overlap:</p>
      <ul><li><b>B — Biotic:</b> suitable interactions (resources present, predators/competitors not excluding it)</li>
      <li><b>A — Abiotic:</b> suitable climate and physical conditions</li>
      <li><b>M — Movement:</b> the species can actually disperse there</li></ul>
      <div class="callout key">BAM appears again in Lecture 4 as the key limitation of Species Distribution Models. Learn it once here — it pays off twice.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Species distribution is defined as:",opts:["The number of species in an area","The geographic area where individuals of a species are present","The genetic variation within a species","The rate a species reproduces"],a:1,exp:"Species distribution = the geographic area where individuals of the species are present."},
    {type:"mcq",q:"Which is NOT one of the three factors that explain a species' distribution?",opts:["Abiotic suitability","Biotic suitability","Dispersal ability","Body temperature regulation"],a:3,exp:"The three factors are abiotic suitability, biotic suitability, and dispersal — the B, A, and M of the BAM diagram."},
    {type:"mcq",q:"In the BAM diagram, the occupied distributional area is found where:",opts:["Only the abiotic circle lies","All three circles (Biotic, Abiotic, Movement) overlap","The biotic and movement circles meet but not abiotic","None of the circles overlap"],a:1,exp:"The realized/occupied range is the intersection of all three circles."},
    {type:"mcq",q:"The current distribution of marsupials is best explained by:",opts:["Recent human introduction","The break-up of the supercontinent Gondwana","Their inability to reproduce in cold climates","Competition with placental mammals only"],a:1,exp:"Marsupial distribution traces the break-up of Gondwana — a dispersal/geological-history explanation."},
    {type:"tf",q:"A species can be absent from climatically suitable habitat simply because it was never able to disperse there.",a:true,exp:"True — that's dispersal limitation, the 'M' (movement) component of BAM."},
    {type:"short",q:"State the three factors that determine where a species occurs, and link them to the BAM diagram.",model:"A species occurs where (1) abiotic conditions are suitable, (2) biotic conditions are suitable — enough resources and tolerable predator/competitor pressure, and (3) it has been able to disperse there. These correspond to the Abiotic (A), Biotic (B), and Movement (M) circles of the BAM diagram, and a species occupies the area where all three overlap.",pts:["Abiotic suitability (A)","Biotic suitability — resources, competitors/predators (B)","Dispersal/movement ability (M)","Range = overlap of all three"]}
   ]
  },

  {
   id:"L1T6", title:"The niche: Grinnellian & Eltonian",
   sub:"Two of the three niche concepts, plus competitive exclusion (slides 38–45).",
   slides:[
    {h:"Three definitions of the niche", imgs:[{src:"slides/L1/slide-38.jpg",cap:"L1 · Slide 38"}], html:`
      <p class="lead">The <span class="kw">niche</span> has several definitions — <b>Grinnellian, Eltonian, and Hutchinsonian</b>. All describe how a species "fits" into its environment: sometimes in relation to other organisms, sometimes not.</p>
      <div class="callout key">Exam objective: "Compare and contrast the Eltonian, Grinnellian, and Hutchinsonian (fundamental and realized) niche." Keep them straight by their emphasis.</div>`},
    {h:"Grinnellian niche — abiotic / habitat", imgs:[{src:"slides/L1/slide-39.jpg",cap:"L1 · Slide 39"}], html:`
      <p class="lead"><span class="kw">Joseph Grinnell (1917)</span> described the niche as the set of <b>environmental conditions that restrict each species</b>: temperature, precipitation, seasonality, etc.</p>
      <p>It's a <span class="kw-2">habitat-based definition focusing on abiotic conditions</span>.</p>
      <div class="callout tip"><b>Example:</b> a frog requires a moist environment near water with suitable temperature and humidity for breeding and survival.</div>`},
    {h:"Eltonian niche — role / interactions", imgs:[{src:"slides/L1/slide-40.jpg",cap:"L1 · Slide 40"},{src:"slides/L1/slide-41.jpg",cap:"L1 · Slide 41"},{src:"slides/L1/slide-42.jpg",cap:"L1 · Slide 42"},{src:"slides/L1/slide-43.jpg",cap:"L1 · Slide 43"}], html:`
      <p class="lead"><span class="kw">Charles Elton (1927)</span> defined the niche as the <b>"place a species occupies in a community"</b> — emphasizing its <span class="kw-2">interactions with other organisms (its role)</span>.</p>
      <p>Where Grinnell asks "what conditions does the species need?", Elton asks "what does the species <i>do</i> — what does it eat, what eats it, how does it interact?" Examples on the slides: a hummingbird pollinating, a wolf hunting, a seedling growing.</p>`},
    {h:"Competitive exclusion & resource partitioning", imgs:[{src:"slides/L1/slide-44.jpg",cap:"L1 · Slide 44"},{src:"slides/L1/slide-45.jpg",cap:"L1 · Slide 45"}], html:`
      <p class="lead">An Eltonian consequence: the <span class="kw">competitive exclusion principle</span> — complete competitors (species with <b>total niche overlap</b>) cannot coexist.</p>
      <p>Competitive exclusion leads to <span class="kw-2">resource partitioning</span>: competing species evolve to use limited resources in <b>different ways, at different times, or in different places</b>. The classic figure shows warblers feeding in different zones of the same tree — niche specialization caused by competition.</p>
      <div class="callout key">This connects directly to Lecture 3 (competition) — same principle, more detail there.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"The Grinnellian niche emphasizes:",opts:["A species' role and interactions in the community","The abiotic environmental conditions a species requires","An n-dimensional hypervolume","Only predator–prey relationships"],a:1,exp:"Grinnell's niche is habitat-based, focusing on abiotic conditions (temperature, precipitation, etc.)."},
    {type:"mcq",q:"The Eltonian niche emphasizes:",opts:["The abiotic conditions that restrict a species","The 'place a species occupies in a community' — its role and interactions","Latitude and elevation","The full multidimensional tolerance space"],a:1,exp:"Elton defined the niche as a species' role/place in the community, emphasizing interactions with other organisms."},
    {type:"mcq",q:"The competitive exclusion principle states that:",opts:["Two species with total niche overlap cannot coexist","Competition always benefits both species","Predators control all prey populations","Niches never overlap in nature"],a:0,exp:"Complete competitors (total niche overlap) cannot coexist — one excludes the other."},
    {type:"mcq",q:"When competing species evolve to use resources in different ways, times, or places, this is called:",opts:["Mutualism","Resource partitioning","Dispersal limitation","Aposematism"],a:1,exp:"Resource partitioning — a consequence of competitive exclusion that allows coexistence via niche specialization."},
    {type:"tf",q:"A frog needing a moist environment with suitable temperature for breeding is an example of a Grinnellian (abiotic, habitat-based) niche.",a:true,exp:"True — that's the slide's Grinnellian example, focused on abiotic conditions."},
    {type:"short",q:"Compare the Grinnellian and Eltonian niche concepts.",model:"The Grinnellian niche (Grinnell, 1917) is habitat-based and focuses on the abiotic environmental conditions a species requires, such as temperature and precipitation. The Eltonian niche (Elton, 1927) focuses on the species' role and its interactions with other organisms — the place it occupies in the community. Grinnell emphasizes the conditions a species needs; Elton emphasizes what the species does.",pts:["Grinnellian = abiotic/habitat conditions (Grinnell 1917)","Eltonian = role & interactions in community (Elton 1927)","Grinnell: what it needs; Elton: what it does"]}
   ]
  },

  {
   id:"L1T7", title:"The niche: Hutchinson & fundamental vs. realized",
   sub:"The hypervolume niche and how niches set distributions (slides 46–51).",
   slides:[
    {h:"Hutchinsonian niche — the n-dimensional hypervolume", imgs:[{src:"slides/L1/slide-46.jpg",cap:"L1 · Slide 46"}], html:`
      <p class="lead"><span class="kw">G.E. Hutchinson (1957)</span> defined the niche as an <span class="kw-2">n-dimensional hypervolume</span> in environmental space.</p>
      <p>Each environmental variable (temperature, moisture, prey availability, predator avoidance, breeding sites…) is an axis. The niche is the multidimensional "volume" of all the conditions a species can tolerate.</p>
      <div class="callout tip"><b>Example:</b> a frog's niche includes its temperature and moisture preferences, breeding sites, prey availability, and predator avoidance — all combined as a multidimensional space.</div>`},
    {h:"Fundamental vs. realized niche", imgs:[{src:"slides/L1/slide-47.jpg",cap:"L1 · Slide 47"},{src:"slides/L1/slide-48.jpg",cap:"L1 · Slide 48 — barnacle example"},{src:"slides/L1/slide-49.jpg",cap:"L1 · Slide 49"}], html:`
      <p class="lead">Hutchinson split the niche in two:</p>
      <table class="dt"><tr><th>Niche</th><th>Definition</th></tr>
      <tr><td><b>Fundamental niche</b></td><td>The abiotic conditions a species could occupy in the <span class="kw">absence of competition</span> — the species' <b>full tolerances</b></td></tr>
      <tr><td><b>Realized niche</b></td><td>The portion of the fundamental niche the species <span class="kw">actually inhabits</span>, given competition, limited resources, predators, etc.</td></tr></table>
      <p>The barnacle example (slide 48): one barnacle species could tolerate a broad zone (fundamental), but competition with other barnacles restricts it to a smaller actual zone (realized).</p>
      <div class="callout key">Always true: the <b>realized niche is nested within (≤) the fundamental niche</b>. Competition and interactions can only shrink it.</div>`},
    {h:"How niches lead to distributions", imgs:[{src:"slides/L1/slide-50.jpg",cap:"L1 · Slide 50"},{src:"slides/L1/slide-51.jpg",cap:"L1 · Slide 51 — study objectives"}], html:`
      <p class="lead">A species will only occupy areas where its <span class="kw">abiotic and biotic requirements (its niche) are met</span>.</p>
      <ul><li>"You won't see a cactus in Antarctica."</li>
      <li>The niche is a useful concept for explaining the distribution of any organism.</li></ul>
      <p>Slide 51 is the professor's study-objectives list for Lecture 1 — defining levels of organization, biomes and their factors, the five biomes, species distribution, the BAM diagram, and comparing the three niche concepts. This whole lecture maps onto those objectives.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"Hutchinson defined the niche as:",opts:["A single abiotic factor","An n-dimensional hypervolume in environmental space","The role a species plays in a food web","A geographic range map"],a:1,exp:"Hutchinson's niche is an n-dimensional hypervolume — many environmental axes combined."},
    {type:"mcq",q:"The fundamental niche is:",opts:["The actual area a species occupies under competition","The full range of conditions a species could occupy without competition","Always smaller than the realized niche","Defined only by predators"],a:1,exp:"The fundamental niche = the species' full tolerances absent competition; the realized niche is the smaller actual portion."},
    {type:"mcq",q:"The relationship between the two Hutchinsonian niches is:",opts:["Realized niche is always nested within the fundamental niche","Fundamental niche is nested within the realized niche","They are always equal","They never overlap"],a:0,exp:"The realized niche is always nested within (≤) the fundamental niche."},
    {type:"tf",q:"Competition and predation can shrink a species' realized niche below its fundamental niche.",a:true,exp:"True — the realized niche is the portion of the fundamental niche left after interactions like competition restrict the species."},
    {type:"tf",q:"A species will occupy areas even where its biotic and abiotic requirements are not met.",a:false,exp:"False — a species occupies only areas where its niche (abiotic AND biotic requirements) is satisfied. 'You won't see a cactus in Antarctica.'"},
    {type:"short",q:"Define the fundamental and realized niche and explain why they differ.",model:"The fundamental niche is the full set of abiotic conditions a species could occupy in the absence of competition — its complete tolerances. The realized niche is the smaller portion of that which the species actually occupies once competition, limited resources, and predators are taken into account. They differ because biotic interactions, especially competition, restrict a species to less than its full potential range, so the realized niche is always nested within the fundamental niche.",pts:["Fundamental = full tolerances, no competition","Realized = actual occupied portion under competition","Differ because of biotic interactions (competition, predators)","Realized is nested within fundamental"]}
   ]
  }

 ]
},
/* ===================== LECTURE 2 ===================== */
{
 id:"L2", icon:"📈", short:"L2 · Population Growth",
 title:"Lecture 2 — Population Growth",
 blurb:"Demography, age structure, survivorship, exponential & logistic growth, density regulation, r/K selection.",
 objectives:[
  "Identify whether a population is growing, declining, or stable from its age structure diagram",
  "Describe the three types of survivorship curves",
  "Understand growth curves and their variables (r, birth rate b, death rate d, K, N)",
  "Explain exponential and logistic growth and calculate growth rates from population data",
  "Identify examples of density-dependent and density-independent population regulation",
  "Distinguish intraspecific from interspecific competition",
  "Understand life-history strategies and the trade-offs involved",
  "Define and contrast K-selected and r-selected species"
 ],
 topics:[

  {
   id:"L2T1", title:"Demography & age structure",
   sub:"How we describe population trends (slides 1–8).",
   slides:[
    {h:"Demography", imgs:[{src:"slides/L2/slide-01.jpg",cap:"L2 · Slide 1"},{src:"slides/L2/slide-02.jpg",cap:"L2 · Slide 2"}], html:`
      <p class="lead"><span class="kw">Demography</span> = the statistical study of population changes over time.</p>
      <p>It helps us understand:</p>
      <ul><li>General population trends across species (growth, decline)</li>
      <li>Birth rates and death rates</li><li>Migration and dispersal</li>
      <li>The <b>causes</b> behind those changes</li></ul>
      <p>Slide 2's diagram: births and immigration drive a <span class="kw-2">population increase</span>; deaths and emigration drive a <span class="kw-2">population decrease</span>.</p>`},
    {h:"How we study population trends + key terms", imgs:[{src:"slides/L2/slide-03.jpg",cap:"L2 · Slide 3"}], html:`
      <p class="lead">This lecture covers three tools: <b>age structure</b>, <b>survivorship curves</b>, and <b>exponential & logistic growth</b>.</p>
      <p>Key terms to lock in now:</p>
      <ul><li><b>N</b> = number of individuals in a population</li>
      <li><b>Discrete (non-overlapping) generations</b> vs <b>continuous generations</b></li>
      <li><b>Density independence</b> vs <b>density dependence</b> (returns later)</li></ul>`},
    {h:"Population age structure — overview", imgs:[{src:"slides/L2/slide-04.jpg",cap:"L2 · Slide 4"}], html:`
      <p class="lead"><span class="kw">Age structure</span> = the proportion of population members at specific age ranges. The <b>shape</b> of the diagram tells you whether the population is growing, stable, or declining.</p>
      <div class="callout key">Four shapes (slide 4): rapid growth (wide pyramid) → slow growth → stable (rectangular) → declining (top-heavy). The base = young individuals; the top = old individuals.</div>`},
    {h:"Rapid / slow growth", imgs:[{src:"slides/L2/slide-05.jpg",cap:"L2 · Slide 5"}], html:`
      <ul><li><span class="kw">Broad base, narrow top</span> = many young individuals, few old ones</li>
      <li>A large proportion will soon enter reproductive age</li>
      <li>Birth rates &gt; death rates → <b>population is increasing</b></li></ul>
      <div class="callout tip"><b>Example:</b> newly established populations.</div>`},
    {h:"Stable growth", imgs:[{src:"slides/L2/slide-06.jpg",cap:"L2 · Slide 6"}], html:`
      <ul><li>Similar width at base and top → similar numbers across ages</li>
      <li>Birth rates = death rates</li><li><b>Population remains constant</b></li></ul>
      <div class="callout tip"><b>Example:</b> long-established populations living near carrying capacity.</div>`},
    {h:"Declining growth", imgs:[{src:"slides/L2/slide-07.jpg",cap:"L2 · Slide 7"},{src:"slides/L2/slide-08.jpg",cap:"L2 · Slide 8"}], html:`
      <ul><li><span class="kw">Broader top, narrow base</span></li>
      <li>More older / non-reproductive members than younger ones</li>
      <li>Birth rate &lt; death rate → <b>population is decreasing</b></li></ul>
      <div class="callout tip"><b>Example:</b> species facing habitat loss, low resource availability, or reproductive failure.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Demography is best described as:",opts:["The study of genetic mutations","The statistical study of population changes over time","The classification of organisms","The mapping of species ranges"],a:1,exp:"Demography = the statistical study of how populations change over time."},
    {type:"mcq",q:"An age structure diagram with a broad base and narrow top indicates a population that is:",img:"slides/L2/slide-05.jpg",opts:["Declining","Stable","Growing","Extinct"],a:2,exp:"Broad base = many young about to reproduce, birth > death → growing population."},
    {type:"mcq",q:"A roughly rectangular age structure (similar width top and bottom) indicates:",opts:["Rapid growth","A stable population (births ≈ deaths)","Rapid decline","Immigration only"],a:1,exp:"Equal widths across ages means births ≈ deaths, so the population is stable."},
    {type:"tf",q:"A top-heavy age structure diagram, with more older than younger individuals, predicts a declining population.",a:true,exp:"True — fewer young entering reproductive age means birth < death and the population shrinks."},
    {type:"mcq",q:"Which two processes INCREASE population size in the demography diagram?",opts:["Deaths and emigration","Births and immigration","Births and emigration","Deaths and immigration"],a:1,exp:"Births and immigration add individuals; deaths and emigration remove them."},
    {type:"short",q:"Describe the shape of a rapidly growing population's age structure and explain why it predicts growth.",model:"A rapidly growing population has a broad base and a narrow top, meaning there are many young individuals and few old ones. Because such a large proportion will soon enter reproductive age and birth rates exceed death rates, the population is poised to keep increasing.",pts:["Broad base, narrow top","Many young / few old","Large proportion entering reproductive age","Birth rate > death rate → growth"]}
   ]
  },

  {
   id:"L2T2", title:"Survivorship & growth curves",
   sub:"Three survivorship types and what drives growth (slides 9–10).",
   slides:[
    {h:"Survivorship curves", imgs:[{src:"slides/L2/slide-09.jpg",cap:"L2 · Slide 9"}], html:`
      <p class="lead"><span class="kw">Survivorship curves</span> show patterns of survival and mortality in a population and let us compare life histories of different species. (Y-axis: number surviving, log scale; X-axis: % of maximum life expectancy.)</p>
      <table class="dt"><tr><th>Type</th><th>Pattern</th><th>Example</th></tr>
      <tr><td><b>Type I</b></td><td>High survival in early/middle ages; mortality increases at <b>late</b> ages</td><td>Humans</td></tr>
      <tr><td><b>Type II</b></td><td><b>Equal</b> deaths across young and old ages (straight line)</td><td>Birds</td></tr>
      <tr><td><b>Type III</b></td><td>High mortality at <b>early</b> ages; survivors live long</td><td>Trees</td></tr></table>
      <div class="callout tip">Hook: Type <b>I</b> die old (humans), Type <b>II</b> steady line (birds), Type <b>III</b> die young en masse (trees/fish).</div>`},
    {h:"Growth curves — what drives them", imgs:[{src:"slides/L2/slide-10.jpg",cap:"L2 · Slide 10"}], html:`
      <p class="lead"><span class="kw">Growth curves</span> show how the size of a population changes over time and help ecologists understand the factors that limit growth.</p>
      <p>The two models — <b>exponential</b> and <b>logistic</b> — each have a characteristic shape. Population size is influenced by:</p>
      <ul><li>Birth rate (<b>b</b>)</li><li>Death rate (<b>d</b>)</li><li>Resources</li></ul>`}
   ],
   quiz:[
    {type:"mcq",q:"Which survivorship curve shows high mortality early in life with a few long-lived survivors?",img:"slides/L2/slide-09.jpg",opts:["Type I","Type II","Type III","Type IV"],a:2,exp:"Type III = high early mortality, typical of trees, fish, and many invertebrates."},
    {type:"mcq",q:"Humans, with high survival until old age, exhibit which survivorship curve?",opts:["Type I","Type II","Type III","None"],a:0,exp:"Type I — mortality concentrated at late ages."},
    {type:"mcq",q:"A Type II survivorship curve is characterized by:",opts:["High early mortality","Equal (constant) mortality across all ages","High late mortality only","No mortality"],a:1,exp:"Type II = a constant death rate at all ages, plotting as a straight diagonal line (e.g., many birds)."},
    {type:"tf",q:"Population size in a growth model is influenced by birth rate, death rate, and resources.",a:true,exp:"True — these are the three drivers named on the growth-curves slide."},
    {type:"short",q:"Match each survivorship curve type to a representative organism and its mortality pattern.",model:"Type I has high survival through early and middle life with mortality concentrated at old age, as in humans. Type II has a constant mortality rate across all ages, as in many birds. Type III has very high mortality early in life with a few long-lived survivors, as in trees.",pts:["Type I → humans → late-age mortality","Type II → birds → constant mortality","Type III → trees → high early mortality"]}
   ]
  },

  {
   id:"L2T3", title:"Exponential growth",
   sub:"The J-curve, the equation, and calculations (slides 11–20).",
   slides:[
    {h:"What exponential growth is", imgs:[{src:"slides/L2/slide-11.jpg",cap:"L2 · Slide 11"},{src:"slides/L2/slide-12.jpg",cap:"L2 · Slide 12 — bacteria example"}], html:`
      <p class="lead"><span class="kw">Exponential growth</span> is:</p>
      <ul><li><span class="kw-2">Density-independent</span> — no limit to population growth</li>
      <li>An <b>accelerating</b> growth rate — the number of individuals added each generation increases</li>
      <li>Produces a <span class="kw">J-shaped curve</span></li></ul>
      <p><b>Bacteria example (slide 12):</b> 1,000 bacteria → after 1 hr 2,000 (+1,000) → 2 hr 4,000 (+2,000) → 3 hr 8,000 (+4,000). The increments themselves grow — that's exponential.</p>`},
    {h:"The equation: dN/dt = rN", imgs:[{src:"slides/L2/slide-13.jpg",cap:"L2 · Slide 13"},{src:"slides/L2/slide-14.jpg",cap:"L2 · Slide 14"}], html:`
      <div class="formula">dN/dt = rN</div>
      <ul><li><b>dN/dt</b> = the population growth rate (how fast it's growing/shrinking)</li>
      <li><b>N</b> = number of individuals</li><li><b>t</b> = time</li>
      <li><b>r</b> = intrinsic rate of increase = birth rate − death rate (<b>b − d</b>)</li></ul>
      <div class="callout key"><b>Don't confuse the d in dN/dt with d (death rate).</b> Here d means "change in": dN = change in population size, dt = change in time.</div>`},
    {h:"What r tells you", imgs:[{src:"slides/L2/slide-15.jpg",cap:"L2 · Slide 15"},{src:"slides/L2/slide-16.jpg",cap:"L2 · Slide 16"}], html:`
      <p class="lead">The value of <b>r</b> determines whether the population grows or shrinks:</p>
      <table class="dt"><tr><th>r value</th><th>Meaning</th></tr>
      <tr><td><b>r &gt; 0</b></td><td>Population growing (b &gt; d)</td></tr>
      <tr><td><b>r = 0</b></td><td>Population stable</td></tr>
      <tr><td><b>r &lt; 0</b></td><td>Population declining (b &lt; d)</td></tr></table>`},
    {h:"Worked example 1 — rabbits", imgs:[{src:"slides/L2/slide-17.jpg",cap:"L2 · Slide 17"},{src:"slides/L2/slide-18.jpg",cap:"L2 · Slide 18"}], html:`
      <p class="lead"><b>Q:</b> A population of rabbits has 200 individuals. The intrinsic rate of increase (r) is 0.15. What is the population growth rate (dN/dt)?</p>
      <div class="formula">dN/dt = rN = (0.15)(200) = 30</div>
      <p>The population is increasing by <b>30 individuals per unit time</b>.</p>`},
    {h:"Worked example 2 — deer (find r first)", imgs:[{src:"slides/L2/slide-19.jpg",cap:"L2 · Slide 19"},{src:"slides/L2/slide-20.jpg",cap:"L2 · Slide 20"}], html:`
      <p class="lead"><b>Q:</b> A deer population has 800 individuals. Birth rate b = 0.25, death rate d = 0.10. What is dN/dt?</p>
      <div class="formula">Step 1: r = b − d = 0.25 − 0.10 = 0.15
Step 2: dN/dt = rN = (0.15)(800) = 120</div>
      <p>The population is growing by <b>120 deer per year</b>.</p>
      <div class="callout key">When given b and d separately, always compute <b>r = b − d first</b>, then plug into dN/dt = rN.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"In dN/dt = rN, what does r represent?",opts:["The carrying capacity","The intrinsic rate of increase (b − d)","The number of individuals","The change in time"],a:1,exp:"r = intrinsic rate of increase = birth rate minus death rate (b − d)."},
    {type:"mcq",q:"A population of 200 has r = 0.15. What is dN/dt?",opts:["15","30","200","3"],a:1,exp:"dN/dt = rN = 0.15 × 200 = 30 individuals per unit time."},
    {type:"mcq",q:"A population of 800 has b = 0.25 and d = 0.10. What is dN/dt?",opts:["80","120","200","320"],a:1,exp:"First r = b − d = 0.15, then dN/dt = 0.15 × 800 = 120."},
    {type:"mcq",q:"Exponential growth produces what curve shape and density relationship?",opts:["S-shaped, density-dependent","J-shaped, density-independent","Linear, density-dependent","Flat, density-independent"],a:1,exp:"Exponential growth is J-shaped and density-independent (no resource limit)."},
    {type:"tf",q:"In the term dN/dt, the 'd' stands for death rate.",a:false,exp:"False — that 'd' means 'change in.' dN = change in population, dt = change in time. Death rate is the separate variable d in r = b − d."},
    {type:"tf",q:"If r is negative, the population is declining.",a:true,exp:"True — r < 0 means death rate exceeds birth rate, so the population shrinks."},
    {type:"short",q:"A population has 500 individuals and r = 0.2. Calculate dN/dt and state what it means.",model:"Using dN/dt = rN, dN/dt = 0.2 × 500 = 100. This means the population is growing by 100 individuals per unit of time. Because r is positive, the population is increasing.",pts:["dN/dt = rN","0.2 × 500 = 100","Population growing by 100 per unit time","r > 0 → increasing"]},
    {type:"mcq",q:"A bacterial culture of 1,000 cells grows exponentially with r = 0.7 per hour. What is dN/dt right now?",opts:["700 cells/hr","70 cells/hr","1,700 cells/hr","1,000 cells/hr"],a:0,exp:"dN/dt = rN = 0.7 × 1,000 = 700 cells per hour."},
    {type:"mcq",q:"A population of 2,000 has birth rate b = 0.30 and death rate d = 0.45. What is happening?",opts:["Declining by 300 per year","Growing by 300 per year","Stable","Growing by 150 per year"],a:0,exp:"r = b − d = 0.30 − 0.45 = −0.15. dN/dt = −0.15 × 2,000 = −300, so it declines by 300 per year."},
    {type:"mcq",q:"Two populations have the SAME r, but A has 100 individuals and B has 1,000. Under exponential growth, which adds more individuals in the next time step?",opts:["A","B — larger N means larger dN/dt","They add the same number","Impossible to tell"],a:1,exp:"dN/dt = rN, so with equal r the larger population (B) adds more individuals. Exponential growth accelerates as N rises."},
    {type:"short",q:"A pond's algae number 400, with b = 0.5 and d = 0.1. Find r and dN/dt, and describe the long-term exponential trajectory.",model:"r = b − d = 0.5 − 0.1 = 0.4. dN/dt = rN = 0.4 × 400 = 160, so the population grows by 160 right now. Because exponential growth is density-independent with no limit, dN/dt keeps increasing as N grows — an accelerating J-shaped curve until resources eventually run out.",pts:["r = b − d = 0.4","dN/dt = 0.4 × 400 = 160","Grows by 160 now","Accelerating J-curve until resources limit it"]}
   ]
  },

  {
   id:"L2T4", title:"Logistic growth",
   sub:"The S-curve, carrying capacity, and calculations (slides 21–30).",
   slides:[
    {h:"What logistic growth is", imgs:[{src:"slides/L2/slide-21.jpg",cap:"L2 · Slide 21"}], html:`
      <p class="lead"><span class="kw">Logistic growth</span> is:</p>
      <ul><li><span class="kw-2">Density-dependent</span> — growth slows as resources become limited due to a higher number of individuals</li>
      <li>A more accurate reflection of population growth in nature</li>
      <li>Produces an <span class="kw">S-shaped curve</span></li></ul>`},
    {h:"The equation & carrying capacity", imgs:[{src:"slides/L2/slide-22.jpg",cap:"L2 · Slide 22"}], html:`
      <div class="formula">dN/dt = rN ( (K − N) / K )</div>
      <ul><li><b>dN/dt</b> = population growth rate &nbsp; <b>N</b> = # individuals &nbsp; <b>t</b> = time</li>
      <li><b>r</b> = intrinsic rate of increase (b − d)</li>
      <li><b>K</b> = <span class="kw">carrying capacity</span> — the maximum population size the environment can support</li></ul>
      <div class="callout key">The <b>(K − N)/K</b> term is the "unused capacity." When N is small it's near 1 (≈ exponential); as N → K it → 0, so growth stops. Max growth rate is at <b>N = K/2</b>.</div>`},
    {h:"Why does growth slow down?", imgs:[{src:"slides/L2/slide-23.jpg",cap:"L2 · Slide 23"}], html:`
      <p class="lead">What influences carrying capacity? As the population grows:</p>
      <ul><li>Food becomes limited</li><li>Competition increases</li><li>Space becomes scarce</li></ul>
      <p>So the growth rate is <span class="kw">dependent on the density</span> — the more crowded, the slower the growth. The seal data on the slide level off at K.</p>`},
    {h:"Worked example — deer with a carrying capacity", imgs:[{src:"slides/L2/slide-24.jpg",cap:"L2 · Slide 24"},{src:"slides/L2/slide-25.jpg",cap:"L2 · Slide 25"}], html:`
      <p class="lead"><b>Q:</b> A deer population has N = 800. The forest's carrying capacity K = 1000. r = 0.20. What is dN/dt?</p>
      <div class="formula">dN/dt = rN((K−N)/K)
        = (0.2)(800)((1000−800)/1000)
        = (0.2)(800)(0.2) = 32</div>
      <p>The population is increasing by <b>32 deer per year</b> — much slower than pure exponential growth would predict, because it's close to K.</p>`},
    {h:"Interpreting r and K together", imgs:[{src:"slides/L2/slide-26.jpg",cap:"L2 · Slide 26"},{src:"slides/L2/slide-27.jpg",cap:"L2 · Slide 27"},{src:"slides/L2/slide-28.jpg",cap:"L2 · Slide 28"},{src:"slides/L2/slide-29.jpg",cap:"L2 · Slide 29"}], html:`
      <p class="lead">Two conceptual cases from the slides:</p>
      <ul><li><b>N = 300, r = −0.3</b> → the population is <span class="kw">declining</span>, because r &lt; 0.</li>
      <li><b>N = 500, r = 0.4, K = 500</b> → the population is <span class="kw">stable</span>. Even though r &gt; 0, the population is already <b>at carrying capacity (N = K)</b>, so (K−N)/K = 0 and growth stops.</li></ul>
      <div class="callout key">A positive r does <b>not</b> guarantee growth in the logistic model — if N = K, growth is zero.</div>`},
    {h:"Exponential vs. logistic — side by side", imgs:[{src:"slides/L2/slide-30.jpg",cap:"L2 · Slide 30"}], html:`
      <table class="dt"><tr><th></th><th>Exponential</th><th>Logistic</th></tr>
      <tr><td>Density</td><td>Independent</td><td>Dependent</td></tr>
      <tr><td>Resources</td><td>Not limited</td><td>Limited</td></tr>
      <tr><td>Carrying capacity</td><td>None</td><td>Has K</td></tr>
      <tr><td>Curve</td><td>J-shaped</td><td>S-shaped</td></tr>
      <tr><td>Equation</td><td>dN/dt = rN</td><td>dN/dt = rN((K−N)/K)</td></tr></table>`}
   ],
   quiz:[
    {type:"mcq",q:"In the logistic equation, K stands for:",opts:["The growth constant","The carrying capacity — max population the environment supports","The death rate","The number of newborns"],a:1,exp:"K = carrying capacity, the maximum population size an environment can sustain."},
    {type:"mcq",q:"A deer population has N = 800, K = 1000, r = 0.2. What is dN/dt?",opts:["160","32","200","128"],a:1,exp:"dN/dt = 0.2 × 800 × ((1000−800)/1000) = 0.2 × 800 × 0.2 = 32."},
    {type:"mcq",q:"A population has N = 500, r = 0.4, and K = 500. It is:",opts:["Growing rapidly","Stable — it is at carrying capacity","Declining","Crashing"],a:1,exp:"N = K, so (K−N)/K = 0 and dN/dt = 0. Despite r > 0, the population is stable at carrying capacity."},
    {type:"mcq",q:"Logistic population growth is fastest when:",opts:["N = K","N = K/2","N = 0","N = 2K"],a:1,exp:"The product rN((K−N)/K) peaks at N = K/2, the steepest part of the S-curve."},
    {type:"tf",q:"As N approaches K, the term (K−N)/K approaches 1 and growth accelerates.",a:false,exp:"False — as N → K, (K−N)/K → 0, so growth slows to a stop. It's near 1 only when N is small."},
    {type:"tf",q:"Logistic growth is density-dependent and produces an S-shaped curve.",a:true,exp:"True — limited resources make growth density-dependent, yielding the sigmoidal S-curve that levels at K."},
    {type:"short",q:"Explain why a population with r = 0.4 but N = K shows no growth under the logistic model.",model:"In the logistic equation dN/dt = rN((K−N)/K), when N equals K the term (K−N)/K becomes zero. Multiplying by zero makes the entire growth rate zero, so the population does not grow even though r is positive. The population is at carrying capacity, where births and deaths balance.",pts:["Logistic: dN/dt = rN((K−N)/K)","When N = K, (K−N)/K = 0","Whole expression = 0 → no growth","Population is at carrying capacity"]},
    {type:"mcq",q:"A population has N = 200, K = 1,000, r = 0.5. What is dN/dt?",opts:["80","100","40","800"],a:0,exp:"dN/dt = rN((K−N)/K) = 0.5 × 200 × ((1000−200)/1000) = 0.5 × 200 × 0.8 = 80."},
    {type:"mcq",q:"Logistic growth is fastest at N = K/2. If K = 2,000, growth peaks at N = ?",opts:["2,000","1,000","500","4,000"],a:1,exp:"K/2 = 2,000 / 2 = 1,000."},
    {type:"mcq",q:"A population near its limit has N = 900, K = 1,000, r = 0.3. What is dN/dt?",opts:["270","27","90","3"],a:1,exp:"dN/dt = 0.3 × 900 × ((1000−900)/1000) = 0.3 × 900 × 0.1 = 27 — small because N is close to K."},
    {type:"short",q:"A population has N = 250, K = 500, r = 0.6. Calculate dN/dt and explain why this is the maximum growth rate.",model:"dN/dt = rN((K−N)/K) = 0.6 × 250 × ((500−250)/500) = 0.6 × 250 × 0.5 = 75. This is the maximum because N = 250 = K/2, and logistic growth peaks at N = K/2 — the steepest point of the S-curve.",pts:["dN/dt = 0.6 × 250 × 0.5 = 75","N = 250 = K/2","Growth peaks at K/2","Steepest part of the S-curve"]}
   ]
  },

  {
   id:"L2T5", title:"Density-dependent vs. independent regulation",
   sub:"What actually limits populations (slides 31–38).",
   slides:[
    {h:"Density-dependent regulation (biotic)", imgs:[{src:"slides/L2/slide-31.jpg",cap:"L2 · Slide 31"},{src:"slides/L2/slide-32.jpg",cap:"L2 · Slide 32"},{src:"slides/L2/slide-33.jpg",cap:"L2 · Slide 33"},{src:"slides/L2/slide-34.jpg",cap:"L2 · Slide 34"}], html:`
      <p class="lead">Most density-dependent regulation factors are <span class="kw">biotic (living)</span>. Their effect intensifies as the population grows. Two key kinds of competition:</p>
      <ul><li><span class="kw-2">Intraspecific competition</span> — competition among individuals of the <b>same species</b></li>
      <li><span class="kw-2">Interspecific competition</span> — competition with individuals of <b>different species</b></li></ul>`},
    {h:"More density-dependent factors", imgs:[{src:"slides/L2/slide-35.jpg",cap:"L2 · Slide 35 — resource limitation"},{src:"slides/L2/slide-36.jpg",cap:"L2 · Slide 36 — disease"},{src:"slides/L2/slide-37.jpg",cap:"L2 · Slide 37 — predation"}], html:`
      <p class="lead">Other biotic, density-dependent factors:</p>
      <ul><li><b>Resource limitation</b> — food/space runs short as crowding rises</li>
      <li><b>Disease</b> — spreads faster in dense populations</li>
      <li><b>Predation</b> — predators take more as prey density rises</li></ul>
      <div class="callout tip">Test: "Would this hit harder in a crowded population?" If yes → density-dependent (biotic).</div>`},
    {h:"Density-independent regulation (abiotic)", imgs:[{src:"slides/L2/slide-38.jpg",cap:"L2 · Slide 38"}], html:`
      <p class="lead"><span class="kw">Density-independent</span> regulation factors are <span class="kw-2">abiotic (nonliving)</span>. They:</p>
      <ul><li>Influence death rates <b>regardless of how many individuals there are</b></li>
      <li>Include natural disasters — tornadoes, volcanic eruptions, fires, floods, cold snaps</li></ul>
      <div class="callout key">A wildfire kills the same fraction whether the population is crowded or sparse — that independence from density is the defining feature.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Competition among individuals of the SAME species is called:",opts:["Interspecific competition","Intraspecific competition","Predation","Mutualism"],a:1,exp:"Intra- = within. Intraspecific competition is among members of the same species."},
    {type:"mcq",q:"A volcanic eruption that kills 60% of a population regardless of its density is an example of:",opts:["Density-dependent regulation","Density-independent regulation","Intraspecific competition","Carrying capacity"],a:1,exp:"Abiotic disasters act independently of density — density-independent regulation."},
    {type:"mcq",q:"Which of these is a density-DEPENDENT regulating factor?",opts:["Drought","Wildfire","Disease transmission","A hurricane"],a:2,exp:"Disease spreads faster as density rises, so it's density-dependent (biotic). The others are abiotic and density-independent."},
    {type:"tf",q:"Most density-dependent regulation factors are biotic (living).",a:true,exp:"True — competition, predation, disease, and resource limitation are biotic and density-dependent."},
    {type:"tf",q:"Interspecific competition occurs between members of the same species.",a:false,exp:"False — interspecific competition is between DIFFERENT species. Same-species competition is intraspecific."},
    {type:"short",q:"Distinguish density-dependent from density-independent regulation, giving one example of each.",model:"Density-dependent regulation comes from biotic factors whose impact grows as the population becomes more crowded, such as competition, predation, or disease. Density-independent regulation comes from abiotic factors that affect the population regardless of its size, such as a wildfire, flood, or volcanic eruption.",pts:["Density-dependent = biotic, worsens with crowding","Example: competition / predation / disease","Density-independent = abiotic, unrelated to size","Example: fire / flood / volcano"]}
   ]
  },

  {
   id:"L2T6", title:"Life history strategies & r/K selection",
   sub:"Energy trade-offs and the r vs. K continuum (slides 39–46).",
   slides:[
    {h:"What is a life history strategy?", imgs:[{src:"slides/L2/slide-39.jpg",cap:"L2 · Slide 39"},{src:"slides/L2/slide-40.jpg",cap:"L2 · Slide 40"}], html:`
      <p class="lead">A <span class="kw">life history</span> describes the series of events of an individual's lifetime; species evolve <b>strategies</b> for successful survival and reproduction.</p>
      <p>The core idea (slide 40): <b>every organism has a limited amount of energy</b>, divided among <span class="kw-2">growth and reproduction</span>. Investing more energy in one area means less for the others — creating <b>trade-offs</b> that shape an organism's strategy. The diagram maps species by growth rate, body size, number of offspring, and parental care, with <b>r</b> and <b>K</b> at opposite corners.</p>`},
    {h:"The trade-offs", imgs:[{src:"slides/L2/slide-41.jpg",cap:"L2 · Slide 41"},{src:"slides/L2/slide-42.jpg",cap:"L2 · Slide 42"}], html:`
      <ul><li>Rapid growth may <b>delay reproduction</b> but increases future reproductive success; early reproduction produces offspring sooner but may reduce growth and lifespan.</li>
      <li><span class="kw">High reproductive output</span> = many offspring but <b>less parental investment per offspring</b>.</li>
      <li><span class="kw-2">Low reproductive output</span> = few offspring, but each is well taken care of.</li></ul>`},
    {h:"K-selected species", imgs:[{src:"slides/L2/slide-43.jpg",cap:"L2 · Slide 43"}], html:`
      <p class="lead"><span class="kw">K-selected species</span> are adapted to environments where populations remain near carrying capacity (K); intraspecific competition is high.</p>
      <p>Characteristics:</p>
      <ul><li>Late maturity</li><li>Long lifespans</li><li>Increased parental care</li><li>Fewer offspring</li></ul>
      <p>Examples: elephants, gorillas.</p>`},
    {h:"r-selected species", imgs:[{src:"slides/L2/slide-44.jpg",cap:"L2 · Slide 44"}], html:`
      <p class="lead"><span class="kw">r-selected species</span> are adapted to unpredictable and frequently disturbed environments; they maximize their intrinsic rate of increase (r).</p>
      <p>Characteristics:</p>
      <ul><li>Mature early</li><li>Small lifespans</li><li>Decreased parental care</li><li>Many offspring</li></ul>
      <p>Examples: clownfish, sea turtles (the hatchlings on the slide).</p>`},
    {h:"r/K and survivorship", imgs:[{src:"slides/L2/slide-45.jpg",cap:"L2 · Slide 45"},{src:"slides/L2/slide-46.jpg",cap:"L2 · Slide 46 — study objectives"}], html:`
      <p class="lead">The two strategies map onto survivorship curves:</p>
      <ul><li><b>K-selected</b> → <span class="kw">Type I</span> survivorship (high mortality at <b>late</b> ages)</li>
      <li><b>r-selected</b> → <span class="kw">Type III</span> survivorship (high mortality at <b>early</b> ages)</li></ul>
      <p>Slide 46 lists Lecture 2's objectives: read age structure graphs, know the three survivorship curves, handle exponential/logistic equations and calculations, distinguish density-dependent vs independent regulation, understand life-history trade-offs, and contrast r- vs K-selected species.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"Which set of traits describes a K-selected species?",opts:["Many offspring, little parental care, short life","Few offspring, high parental care, long life, near carrying capacity","Rapid maturity, Type III survivorship","Maximized r in disturbed habitats"],a:1,exp:"K-selected = few offspring, high parental care, late maturity, long lifespan, populations near K."},
    {type:"mcq",q:"r-selected species are typically found in:",opts:["Stable environments at carrying capacity","Unpredictable, frequently disturbed environments","Only tropical rainforests","Environments with no competition ever"],a:1,exp:"r-selected species are adapted to unpredictable, disturbed environments and maximize their growth rate r."},
    {type:"mcq",q:"K-selected species tend to show which survivorship curve?",opts:["Type I","Type II","Type III","Type IV"],a:0,exp:"K-selected → Type I (high survival until late-age mortality). r-selected → Type III."},
    {type:"mcq",q:"The fundamental trade-off underlying life-history strategies is that organisms have limited:",opts:["Space","Energy to divide among growth and reproduction","Number of genes","Predators"],a:1,exp:"Limited energy must be divided among growth and reproduction, creating trade-offs."},
    {type:"tf",q:"High reproductive output usually comes with high parental investment per offspring.",a:false,exp:"False — high output means many offspring but LESS parental investment per offspring. Low output means few, well-cared-for offspring."},
    {type:"tf",q:"r-selected species typically mature early and produce many offspring.",a:true,exp:"True — early maturity, many offspring, little parental care, short lifespan."},
    {type:"short",q:"Contrast r-selected and K-selected species across offspring number, parental care, lifespan, and survivorship curve.",model:"r-selected species produce many offspring with little parental care, mature early, have short lifespans, and show Type III survivorship; they thrive in disturbed, unpredictable environments. K-selected species produce few offspring with high parental care, mature late, have long lifespans, and show Type I survivorship; they live in stable environments near carrying capacity.",pts:["r: many offspring; K: few","r: little care; K: high care","r: short life/Type III; K: long life/Type I","r: disturbed habitat; K: stable, near K"]}
   ]
  }

 ]
},
/* ===================== LECTURE 3 ===================== */
{
 id:"L3", icon:"🕸️", short:"L3 · Community Ecology",
 title:"Lecture 3 — Community Ecology & Species Interactions",
 blurb:"Communities, all six species interactions, defenses & mimicry, competition, food webs, biomagnification, and succession.",
 objectives:[
  "Define a community",
  "Describe the different species interactions: predation, competition, mutualism, parasitism, commensalism, amensalism",
  "Understand predator/prey traits — evolutionary arms races and defense mechanisms",
  "Describe and identify examples of aposematism",
  "Distinguish Batesian from Müllerian mimicry",
  "Explain trait displacement; identify examples of competitive exclusion and trait displacement",
  "Compare food webs versus food chains",
  "Define biomagnification",
  "Understand disturbance / succession patterns and the Intermediate Disturbance Hypothesis"
 ],
 topics:[

  {
   id:"L3T1", title:"What is a community?",
   sub:"Defining and subdividing communities (slides 1–10).",
   slides:[
    {h:"Nature is complex — emergent properties", imgs:[{src:"slides/L3/slide-01.jpg",cap:"L3 · Slide 1"},{src:"slides/L3/slide-02.jpg",cap:"L3 · Slide 2"}], html:`
      <p class="lead">To study the natural world we break complexity into manageable chunks and consider <span class="kw">emergent properties</span> at each level: ecosystems (ecosystem ecology), communities (community ecology), populations (population ecology).</p>`},
    {h:"What is a community?", imgs:[{src:"slides/L3/slide-03.jpg",cap:"L3 · Slide 3"}], html:`
      <p class="lead">A <span class="kw">community</span> = groups of <b>interacting species that occur together at the same time and place</b>.</p>
      <p>There are several ways to delimit communities — some more artificial than others.</p>`},
    {h:"Subdividing communities — by taxonomy", imgs:[{src:"slides/L3/slide-04.jpg",cap:"L3 · Slide 4"},{src:"slides/L3/slide-05.jpg",cap:"L3 · Slide 5"}], html:`
      <p class="lead">One way to subdivide a community is by <span class="kw-2">taxonomic group</span> — the Linnaean hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species. (e.g., "the fish community" or "the bird community.")</p>`},
    {h:"Subdividing — physical & biological attributes", imgs:[{src:"slides/L3/slide-06.jpg",cap:"L3 · Slide 6 — phytotelmata"},{src:"slides/L3/slide-07.jpg",cap:"L3 · Slide 7"},{src:"slides/L3/slide-08.jpg",cap:"L3 · Slide 8 — Malagasy thorn forest"},{src:"slides/L3/slide-09.jpg",cap:"L3 · Slide 9"}], html:`
      <p class="lead">Communities can also be subdivided by:</p>
      <ul><li><b>Physical attributes</b> — e.g., <span class="kw-2">phytotelmata</span>, the little aquatic communities living in water held by plants (like bromeliads).</li>
      <li><b>Biological attributes</b> — e.g., the Malagasy thorn forest, defined by its distinctive vegetation and the animals adapted to it.</li></ul>`},
    {h:"Communities defined by interactions", imgs:[{src:"slides/L3/slide-10.jpg",cap:"L3 · Slide 10"}], html:`
      <p class="lead">A more biologically meaningful way: define communities by the <span class="kw">interactions</span> among species — for example, a network of fruit-eating birds (frugivores) and the plants that depend on them. Those interaction webs are what the rest of the lecture explores.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"A community is best defined as:",opts:["All individuals of one species in an area","Groups of interacting species occurring together at the same time and place","A single trophic level","The abiotic environment plus its organisms"],a:1,exp:"A community = interacting species in the same time and place (many species)."},
    {type:"mcq",q:"Phytotelmata (water held in plants like bromeliads) is an example of subdividing communities by:",opts:["Taxonomic group","Physical attributes","Genetic similarity","Trophic level only"],a:1,exp:"Phytotelmata is a physical-attribute way of delimiting a small community."},
    {type:"tf",q:"Community ecology focuses on the interactions among different species.",a:true,exp:"True — community ecology studies multiple interacting species (vs population ecology, one species)."},
    {type:"short",q:"Define a community and name two ways communities can be subdivided.",model:"A community is a group of interacting species that occur together at the same time and place. Communities can be subdivided in several ways, for example by taxonomic group (such as the bird or fish community) or by physical attributes (such as phytotelmata), as well as by biological attributes or by their interactions.",pts:["Interacting species, same time & place","Subdivide by taxonomy (e.g., birds, fish)","Subdivide by physical/biological attributes or interactions"]}
   ]
  },

  {
   id:"L3T2", title:"The species interaction matrix",
   sub:"Scoring interactions by their +/−/0 effects (slide 11).",
   slides:[
    {h:"Classifying species interactions", imgs:[{src:"slides/L3/slide-11.jpg",cap:"L3 · Slide 11"}], html:`
      <p class="lead">Species interactions are <span class="kw">classified by their net negative or positive effects</span> on the interacting species. The matrix crosses Species 1 (rows: +, −, 0) with Species 2 (columns: +, −, 0):</p>
      <table class="dt"><tr><th>Interaction</th><th>Effects</th><th>Best studied?</th></tr>
      <tr><td><b>Mutualism</b></td><td>+ / +</td><td>Well studied</td></tr>
      <tr><td><b>Predation / Parasitism</b></td><td>+ / −</td><td>Best studied</td></tr>
      <tr><td><b>Competition</b></td><td>− / −</td><td>Best studied</td></tr>
      <tr><td><b>Commensalism</b></td><td>+ / 0</td><td></td></tr>
      <tr><td><b>Amensalism</b></td><td>− / 0</td><td></td></tr>
      <tr><td><b>Neutralism</b></td><td>0 / 0</td><td></td></tr></table>
      <div class="callout key">Memorize this grid — every interaction in this lecture is one cell of it. Competition, predation/herbivory, and mutualism are the best studied.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Which interaction is scored − / − (both species harmed)?",img:"slides/L3/slide-11.jpg",opts:["Mutualism","Competition","Commensalism","Predation"],a:1,exp:"Competition harms both species (− / −) as they vie for the same resource."},
    {type:"mcq",q:"A + / 0 interaction (one benefits, the other unaffected) is:",opts:["Mutualism","Amensalism","Commensalism","Neutralism"],a:2,exp:"Commensalism = + / 0."},
    {type:"mcq",q:"Neutralism is scored:",opts:["+ / +","0 / 0","+ / −","− / 0"],a:1,exp:"Neutralism = 0 / 0, no net effect on either species."},
    {type:"tf",q:"Predation and parasitism share the same +/− sign structure.",a:true,exp:"True — both are + / − interactions: one organism benefits at the other's expense."},
    {type:"short",q:"Give the sign notation for mutualism, predation, competition, and amensalism.",model:"Mutualism is + / + (both benefit). Predation (and parasitism) is + / − (one benefits, the other is harmed). Competition is − / − (both harmed). Amensalism is − / 0 (one is harmed, the other unaffected).",pts:["Mutualism +/+","Predation/parasitism +/−","Competition −/−","Amensalism −/0"]}
   ]
  },

  {
   id:"L3T3", title:"Predation & prey defenses",
   sub:"Predator–prey dynamics, arms races, and defense types (slides 12–18).",
   slides:[
    {h:"Predation (+/−)", imgs:[{src:"slides/L3/slide-12.jpg",cap:"L3 · Slide 12"},{src:"slides/L3/slide-13.jpg",cap:"L3 · Slide 13 — hare/lynx cycles"}], html:`
      <p class="lead"><span class="kw">Predation</span> is a +/− interaction that involves <b>unequal trophic levels</b> (a <span class="kw-2">trophic level</span> = position in the food chain, e.g., producer, consumer). Predator and prey populations are often closely intertwined — the classic hare/lynx cycles (slide 13) rise and fall together.</p>`},
    {h:"Predation drives prey defenses", imgs:[{src:"slides/L3/slide-14.jpg",cap:"L3 · Slide 14"},{src:"slides/L3/slide-15.jpg",cap:"L3 · Slide 15 — chemical"},{src:"slides/L3/slide-16.jpg",cap:"L3 · Slide 16 — chemical compounds"}], html:`
      <p class="lead">Predation creates a relationship between predation mechanisms and <span class="kw">prey defense</span> — predation heavily influences how prey defend themselves. Defense types include:</p>
      <ul><li><b>Chemical</b> — toxins and noxious compounds (skunk spray; the stinging nettle's irritating chemicals; plant secondary compounds shown as molecular structures)</li>
      <li><b>Behavioral & mechanical</b> defenses (covered next topic)</li></ul>`},
    {h:"Evolutionary arms races", imgs:[{src:"slides/L3/slide-17.jpg",cap:"L3 · Slide 17 — milkweed & monarchs"},{src:"slides/L3/slide-18.jpg",cap:"L3 · Slide 18 — cheetah & gazelle"}], html:`
      <p class="lead">Predator–prey relationships drive <span class="kw">"evolutionary arms races"</span>: prey adapt and evolve defenses in response to predation, and predators evolve counter-adaptations.</p>
      <ul><li><b>Milkweed (Asclepias) & monarch caterpillars</b> — the plant evolves toxins; the caterpillar evolves tolerance and even sequesters the toxin.</li>
      <li><b>Cheetah & gazelle</b> — selection for ever-greater speed on both sides.</li></ul>`}
   ],
   quiz:[
    {type:"mcq",q:"A trophic level is defined as:",opts:["A type of toxin","A position in the food chain (e.g., producer, consumer)","A kind of mimicry","A defense mechanism"],a:1,exp:"A trophic level = an organism's position in the food chain. Predation involves unequal trophic levels."},
    {type:"mcq",q:"The repeating rise-and-fall cycles of hare and lynx populations illustrate:",img:"slides/L3/slide-13.jpg",opts:["Mutualism","Tightly intertwined predator–prey dynamics","Commensalism","Random fluctuation unrelated to predation"],a:1,exp:"Predator and prey populations are closely linked, producing coupled cycles."},
    {type:"mcq",q:"A skunk's spray and a stinging nettle's irritants are examples of which prey defense?",opts:["Mechanical","Chemical","Behavioral","Mimicry"],a:1,exp:"Both are chemical defenses — noxious or toxic compounds."},
    {type:"tf",q:"In an evolutionary arms race, only the prey evolves while the predator stays the same.",a:false,exp:"False — both sides evolve: prey evolve defenses and predators evolve counter-adaptations (e.g., milkweed toxin vs monarch tolerance)."},
    {type:"short",q:"Explain what an evolutionary arms race is, using the milkweed and monarch example.",model:"An evolutionary arms race is the reciprocal evolution of predator (or plant) and prey, where each evolves in response to the other. Milkweed plants evolve toxic chemicals to deter herbivores, and monarch caterpillars evolve the ability to tolerate and even store those toxins, which in turn pressures the plant to evolve stronger defenses.",pts:["Reciprocal/back-and-forth evolution","Prey/plant evolves defenses","Predator/herbivore evolves counter-adaptation","Milkweed toxin ↔ monarch tolerance"]}
   ]
  },

  {
   id:"L3T4", title:"Aposematism & mimicry",
   sub:"Warning coloration, Batesian and Müllerian mimicry (slides 19–24).",
   slides:[
    {h:"Aposematism — warning coloration", imgs:[{src:"slides/L3/slide-19.jpg",cap:"L3 · Slide 19 — poison dart frog"},{src:"slides/L3/slide-20.jpg",cap:"L3 · Slide 20"}], html:`
      <p class="lead"><span class="kw">Aposematism</span> = the use of <b>bright colors and patterns to warn potential predators</b> that an organism is toxic or unpalatable. The blue poison dart frog and the monarch butterfly advertise their toxicity.</p>`},
    {h:"Aposematism can lead to mimicry", imgs:[{src:"slides/L3/slide-21.jpg",cap:"L3 · Slide 21 — monarch & viceroy"},{src:"slides/L3/slide-22.jpg",cap:"L3 · Slide 22 — coral & king snake"}], html:`
      <p class="lead">Because predators learn to avoid warning patterns, those patterns can be <span class="kw">mimicked</span>.</p>
      <ul><li>The <b>viceroy butterfly</b> resembles the toxic <b>monarch</b>.</li>
      <li>The harmless <b>scarlet king snake</b> resembles the venomous <b>coral snake</b>.</li></ul>`},
    {h:"Two kinds of mimicry", imgs:[{src:"slides/L3/slide-23.jpg",cap:"L3 · Slide 23 — Batesian"},{src:"slides/L3/slide-24.jpg",cap:"L3 · Slide 24 — Batesian vs Müllerian"}], html:`
      <table class="dt"><tr><th>Type</th><th>Definition</th><th>Example</th></tr>
      <tr><td><b>Batesian mimicry</b></td><td>A <span class="kw">harmless</span> species resembles a <span class="kw">toxic / unpalatable</span> species</td><td>Harmless hoverfly mimics a wasp; king snake mimics coral snake</td></tr>
      <tr><td><b>Müllerian mimicry</b></td><td><span class="kw">Multiple toxic / harmful</span> species resemble each other</td><td>Bees & wasps; <i>Heliconius</i> butterflies</td></tr></table>
      <div class="callout key">Batesian = a <b>bluff</b> (only one is dangerous). Müllerian = <b>honest partners</b> — the shared pattern reinforces avoidance because every species carrying it really is harmful, so predators learn faster.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Aposematism refers to:",opts:["Blending into the background","Bright warning coloration signaling toxicity","A harmless species mimicking a toxic one","Producing many offspring"],a:1,exp:"Aposematism = conspicuous warning coloration advertising that an organism is toxic or unpalatable."},
    {type:"mcq",q:"A harmless scarlet king snake resembling a venomous coral snake is:",img:"slides/L3/slide-22.jpg",opts:["Müllerian mimicry","Batesian mimicry","Aposematism without mimicry","Camouflage"],a:1,exp:"Batesian mimicry — a harmless species mimics a dangerous model."},
    {type:"mcq",q:"When several genuinely toxic species converge on the same warning pattern, it is:",opts:["Batesian mimicry","Müllerian mimicry","Commensalism","Neutralism"],a:1,exp:"Müllerian mimicry — multiple harmful species share a pattern, reinforcing predator avoidance."},
    {type:"tf",q:"In Batesian mimicry, both the model and the mimic are toxic.",a:false,exp:"False — in Batesian mimicry only the model is toxic; the mimic is harmless and bluffing. In Müllerian mimicry both are toxic."},
    {type:"tf",q:"Müllerian mimicry speeds up predator learning because every species with the shared pattern is genuinely harmful.",a:true,exp:"True — since every encounter with the pattern is a bad experience, predators learn to avoid it faster."},
    {type:"short",q:"Distinguish Batesian from Müllerian mimicry and give an example of each.",model:"In Batesian mimicry, a harmless species resembles a toxic or unpalatable species to deceive predators — for example, a harmless king snake mimicking a venomous coral snake. In Müllerian mimicry, multiple genuinely toxic species resemble one another, reinforcing a shared warning signal so predators learn to avoid it faster — for example, bees and wasps, or different Heliconius butterflies.",pts:["Batesian: harmless mimics toxic (a bluff)","Example: king snake / coral snake","Müllerian: multiple toxic species converge","Example: bees & wasps / Heliconius"]}
   ]
  },

  {
   id:"L3T5", title:"Mechanical defenses & competition setup",
   sub:"Mechanical defenses; interspecific vs intraspecific competition (slides 25–28).",
   slides:[
    {h:"Mechanical defenses", imgs:[{src:"slides/L3/slide-25.jpg",cap:"L3 · Slide 25"}], html:`
      <p class="lead"><span class="kw">Mechanical defenses</span> are physical structures that deter predators/herbivores:</p>
      <ul><li>Thorns</li><li>Urticating trichomes (e.g., stinging nettle hairs)</li><li>Tough leaves</li></ul>`},
    {h:"Competition (−/−)", imgs:[{src:"slides/L3/slide-26.jpg",cap:"L3 · Slide 26"}], html:`
      <p class="lead"><span class="kw">Competition</span> is the − / − cell of the interaction matrix — both species are harmed because they're after the same limited resource.</p>`},
    {h:"Interspecific vs. intraspecific competition", imgs:[{src:"slides/L3/slide-27.jpg",cap:"L3 · Slide 27"},{src:"slides/L3/slide-28.jpg",cap:"L3 · Slide 28"}], html:`
      <table class="dt"><tr><th>Type</th><th>Definition</th><th>Scale of ecology</th></tr>
      <tr><td><b>Interspecific</b></td><td>Interactions <span class="kw">between species</span></td><td>Community ecology</td></tr>
      <tr><td><b>Intraspecific</b></td><td>Interactions <span class="kw">among individuals within a species</span></td><td>Population ecology</td></tr></table>
      <div class="callout tip"><b>Inter</b> = between (different species); <b>intra</b> = within (same species). Same prefixes as in Lecture 2's density-dependent competition.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Thorns, stinging hairs (urticating trichomes), and tough leaves are examples of:",opts:["Chemical defenses","Mechanical defenses","Aposematism","Mimicry"],a:1,exp:"These are physical/mechanical defenses."},
    {type:"mcq",q:"Competition between two different species is called:",opts:["Intraspecific competition","Interspecific competition","Mutualism","Commensalism"],a:1,exp:"Interspecific = between species (a community-ecology topic)."},
    {type:"mcq",q:"Intraspecific competition is studied mainly at which scale?",opts:["Community ecology","Population ecology","Ecosystem ecology","Biosphere ecology"],a:1,exp:"Intraspecific (within one species) competition is a population-ecology topic."},
    {type:"tf",q:"Competition is a − / − interaction in which both species are negatively affected.",a:true,exp:"True — both competitors are harmed by sharing a limited resource."},
    {type:"short",q:"Explain the difference between interspecific and intraspecific competition.",model:"Interspecific competition is competition between individuals of different species, and it is a focus of community ecology. Intraspecific competition is competition among individuals of the same species, and it is a focus of population ecology. Both reduce access to shared limited resources.",pts:["Interspecific = between different species (community ecology)","Intraspecific = within one species (population ecology)","Both involve shared limited resources"]}
   ]
  },

  {
   id:"L3T6", title:"Competitive exclusion & trait displacement",
   sub:"Why competitors can't fully overlap, and how they diverge (slides 29–33).",
   slides:[
    {h:"A competition example", imgs:[{src:"slides/L3/slide-29.jpg",cap:"L3 · Slide 29 — chipmunk elevations"}], html:`
      <p class="lead">The chipmunk diagram (<i>Neotamias umbrinus</i> vs <i>N. dorsalis</i>): where both species are present on a mountain, their elevation ranges <b>barely overlap</b>; where only one species is present, it occupies a <b>broader</b> range of elevations. This is a signature of competition shaping distributions.</p>`},
    {h:"Competitive exclusion principle", imgs:[{src:"slides/L3/slide-30.jpg",cap:"L3 · Slide 30"},{src:"slides/L3/slide-31.jpg",cap:"L3 · Slide 31"},{src:"slides/L3/slide-32.jpg",cap:"L3 · Slide 32"}], html:`
      <p class="lead">The <span class="kw">competitive exclusion principle</span> states that <b>two species cannot occupy the same niche</b> in a habitat — they cannot coexist if they compete for the same resources.</p>
      <p>The classic experiment (slides 31–32): grown <b>separately</b>, each species thrives; grown <b>together</b>, one species outcompetes and excludes the other.</p>`},
    {h:"Trait (character) displacement", imgs:[{src:"slides/L3/slide-33.jpg",cap:"L3 · Slide 33 — Darwin's finches"}], html:`
      <p class="lead"><span class="kw">Trait displacement</span> = the divergence of a trait between two species in order to <b>minimize competition</b>. It is associated with competitive exclusion and resource partitioning.</p>
      <p>Darwin's finches: the beak depth of <i>Geospiza fuliginosa</i> is <b>smaller in the presence</b> of the other two species (<i>G. fortis</i>, <i>G. magnirostris</i>) — traits diverge so the species use different food resources and can coexist.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"The competitive exclusion principle states that:",opts:["Two species can share a niche indefinitely","Two species competing for the same resource cannot coexist in the same niche","Competition always benefits both species","Predators exclude all competitors"],a:1,exp:"Two complete competitors cannot coexist — one excludes the other."},
    {type:"mcq",q:"Darwin's finches evolving different beak depths where they co-occur is an example of:",img:"slides/L3/slide-33.jpg",opts:["Trait (character) displacement","Aposematism","Mutualism","Biomagnification"],a:0,exp:"Trait displacement — divergence of beak depth reduces competition and allows coexistence."},
    {type:"mcq",q:"In the classic competition experiment, when two competing species are grown TOGETHER:",opts:["Both increase","One species outcompetes and excludes the other","They form a mutualism","Both go extinct immediately"],a:1,exp:"Together, one species wins and the other is excluded — demonstrating competitive exclusion."},
    {type:"tf",q:"Trait displacement is associated with competitive exclusion and resource partitioning.",a:true,exp:"True — diverging traits let competitors partition resources and avoid exclusion."},
    {type:"short",q:"Explain how trait displacement allows two competing species to coexist.",model:"Trait displacement is the evolutionary divergence of a trait, such as beak size, between two competing species where they overlap. By shifting their traits, the species come to use different resources, which reduces competition and allows them to coexist where they otherwise could not — as seen in Darwin's finches, whose beak depths differ when species co-occur.",pts:["Trait diverges where species overlap","Reduces niche/resource overlap","Lowers competition → coexistence","Darwin's finch beak depth example"]}
   ]
  },

  {
   id:"L3T7", title:"Mutualism, parasitism, commensalism, amensalism",
   sub:"The remaining interaction types (slides 34–40).",
   slides:[
    {h:"Mutualism (+/+)", imgs:[{src:"slides/L3/slide-34.jpg",cap:"L3 · Slide 34"},{src:"slides/L3/slide-35.jpg",cap:"L3 · Slide 35 — plant–pollinator"},{src:"slides/L3/slide-36.jpg",cap:"L3 · Slide 36 — obligate"},{src:"slides/L3/slide-37.jpg",cap:"L3 · Slide 37 — facultative"}], html:`
      <p class="lead"><span class="kw">Mutualism</span> is a +/+ interaction (it may involve equal or unequal trophic levels). Plant–pollinator interactions are a classic example.</p>
      <table class="dt"><tr><th>Type</th><th>Definition</th><th>Example</th></tr>
      <tr><td><b>Obligate</b></td><td>Both species are <span class="kw">entirely dependent</span> on each other</td><td>Clownfish & anemone; certain hummingbird–flower pairs</td></tr>
      <tr><td><b>Facultative</b></td><td>Both benefit, but the relationship is <span class="kw">not required</span> for survival</td><td>Oxpecker birds & rhino</td></tr></table>`},
    {h:"Parasitism (+/−)", imgs:[{src:"slides/L3/slide-38.jpg",cap:"L3 · Slide 38"}], html:`
      <p class="lead"><span class="kw">Parasitism</span> is a +/− interaction: <b>one organism benefits at the expense of the other</b>. Example: mistletoe, a parasitic plant drawing resources from its host tree.</p>`},
    {h:"Commensalism (+/0) & amensalism (−/0)", imgs:[{src:"slides/L3/slide-39.jpg",cap:"L3 · Slide 39 — commensalism"},{src:"slides/L3/slide-40.jpg",cap:"L3 · Slide 40 — amensalism"}], html:`
      <table class="dt"><tr><th>Interaction</th><th>Signs</th><th>Detail / example</th></tr>
      <tr><td><b>Commensalism</b></td><td>+ / 0</td><td>One benefits, the other is neither helped nor harmed — epiphytes (orchids, Spanish moss) on trees; birds' nests in trees</td></tr>
      <tr><td><b>Amensalism</b></td><td>− / 0</td><td>One is harmed while the other is unaffected; rare — e.g., harmful algal blooms</td></tr></table>`}
   ],
   quiz:[
    {type:"mcq",q:"In OBLIGATE mutualism:",opts:["Both species benefit but can live independently","Both species are entirely dependent on each other","One benefits, one is unaffected","One is harmed, the other unaffected"],a:1,exp:"Obligate mutualism = neither partner can survive without the other. Facultative = beneficial but not required."},
    {type:"mcq",q:"An epiphyte such as an orchid growing harmlessly on a tree is an example of:",opts:["Parasitism","Commensalism","Amensalism","Mutualism"],a:1,exp:"Commensalism (+/0): the orchid benefits from the perch; the tree is unaffected."},
    {type:"mcq",q:"Mistletoe drawing resources from its host tree is:",opts:["Mutualism","Commensalism","Parasitism","Neutralism"],a:2,exp:"Parasitism (+/−): the parasite benefits at the host's expense."},
    {type:"mcq",q:"Amensalism is best described as:",opts:["+ / + ","+ / 0","− / 0 (one harmed, one unaffected)","− / −"],a:2,exp:"Amensalism = − / 0; one species is harmed while the other is unaffected. It is relatively rare."},
    {type:"tf",q:"Facultative mutualists benefit from each other but can survive on their own.",a:true,exp:"True — facultative mutualism is beneficial but not required for survival (unlike obligate mutualism)."},
    {type:"short",q:"Distinguish obligate from facultative mutualism, and give the sign notation for commensalism and amensalism.",model:"Obligate mutualism is a +/+ relationship in which both species are entirely dependent on each other for survival, such as a clownfish and its anemone. Facultative mutualism is a +/+ relationship in which both species benefit but can survive independently, such as oxpeckers and a rhino. Commensalism is +/0 (one benefits, the other unaffected) and amensalism is −/0 (one harmed, the other unaffected).",pts:["Obligate = both fully dependent","Facultative = beneficial but not required","Commensalism = +/0","Amensalism = −/0"]}
   ]
  },

  {
   id:"L3T8", title:"Trophic levels & food chains",
   sub:"Energy flow and the 10% rule (slides 41–43).",
   slides:[
    {h:"Food chains and trophic levels", imgs:[{src:"slides/L3/slide-41.jpg",cap:"L3 · Slide 41"},{src:"slides/L3/slide-42.jpg",cap:"L3 · Slide 42"}], html:`
      <p class="lead">A <span class="kw">food chain</span> is a linear sequence in which energy passes through a community, organized into <span class="kw-2">trophic levels</span>. A trophic level categorizes organisms by their role as producers or consumers:</p>
      <ul><li><b>Primary producers</b> (green plants — capture sunlight)</li>
      <li><b>Primary consumers</b> (herbivores)</li>
      <li><b>Secondary consumers</b> (carnivores eating herbivores)</li>
      <li><b>Tertiary consumers</b> (top carnivores)</li>
      <li><b>Decomposers</b> recycle dead matter</li></ul>`},
    {h:"The energy pyramid (10% rule)", imgs:[{src:"slides/L3/slide-43.jpg",cap:"L3 · Slide 43"}], html:`
      <p class="lead">The issue with food chains: <b>energy is lost at every step</b>. The pyramid on the slide:</p>
      <div class="formula">Producers 1,000 kcal → Primary 100 → Secondary 10 → Tertiary 1</div>
      <p>Only ~<span class="kw">10%</span> of the energy at one level is available to the next; about 90% is lost (mostly as heat and through metabolism).</p>`}
   ],
   quiz:[
    {type:"mcq",q:"If producers capture 1,000 kcal, how much energy is typically available to the tertiary consumers (3 levels up)?",img:"slides/L3/slide-43.jpg",opts:["100 kcal","10 kcal","1 kcal","900 kcal"],a:2,exp:"~10% per step: 1,000 → 100 → 10 → 1 kcal at the tertiary level."},
    {type:"mcq",q:"Organisms that capture sunlight and form the base of the food chain are:",opts:["Primary consumers","Primary producers","Secondary consumers","Decomposers"],a:1,exp:"Primary producers (green plants/algae) convert sunlight into stored energy."},
    {type:"mcq",q:"Approximately what percentage of energy transfers to the next trophic level?",opts:["1%","10%","50%","90%"],a:1,exp:"About 10% transfers up; roughly 90% is lost, mostly as heat."},
    {type:"tf",q:"A food chain is a linear sequence showing energy passing through trophic levels.",a:true,exp:"True — that is the definition of a food chain."},
    {type:"short",q:"State the 10% rule and explain one consequence for food chain length.",model:"The 10% rule states that only about 10% of the energy stored at one trophic level is passed to the next, with roughly 90% lost mostly as heat. A consequence is that food chains are short — usually only four or five levels — because after several transfers there is too little energy left to support additional consumers.",pts:["~10% transfers up per level","~90% lost (heat/metabolism)","Limits food chains to ~4–5 levels","Few top predators can be supported"]},
    {type:"mcq",q:"If primary producers capture 50,000 kcal, roughly how much energy reaches the secondary consumers?",opts:["5,000 kcal","500 kcal","50 kcal","45,000 kcal"],a:1,exp:"~10% per step: 50,000 → 5,000 (primary consumers) → 500 (secondary consumers)."},
    {type:"mcq",q:"A tertiary consumer sits three trophic levels above producers that fix 10,000 kcal. About how much energy does it receive?",opts:["10 kcal","100 kcal","1 kcal","1,000 kcal"],a:0,exp:"10,000 → 1,000 → 100 → 10 kcal at the tertiary level (three ~10% steps)."},
    {type:"short",q:"Using the 10% rule, explain why a given area can feed more people on a plant-based diet than a meat-based one.",model:"Only about 10% of energy transfers between trophic levels. Eating plants directly (as a primary consumer) captures roughly ten times more of the original energy than eating animals that ate the plants (a secondary consumer). Because so much energy is lost at each step, the same land supports far more people lower on the food chain.",pts:["~10% passes up per trophic level","Eating plants = one step, retains ~10×","Eating meat = extra step, ~90% more lost","More energy available lower on the chain"]}
   ]
  },

  {
   id:"L3T9", title:"Food webs & biomagnification",
   sub:"Why real systems are webs, and how toxins concentrate (slides 44–47).",
   slides:[
    {h:"Food webs", imgs:[{src:"slides/L3/slide-44.jpg",cap:"L3 · Slide 44"},{src:"slides/L3/slide-45.jpg",cap:"L3 · Slide 45"}], html:`
      <p class="lead"><span class="kw">Food webs</span> capture the reality that some organisms feed at <b>more than one trophic level</b>. They are <span class="kw-2">nonlinear representations</span> of energy and nutrient movement through a community — far more interconnected (and stable) than a single chain.</p>`},
    {h:"Biomagnification", imgs:[{src:"slides/L3/slide-46.jpg",cap:"L3 · Slide 46"}], html:`
      <p class="lead"><span class="kw">Biomagnification</span> = the <b>increasing concentration of toxic substances at each successive trophic level</b>.</p>
      <ul><li>Tuna (mercury)</li><li>Freshwater communities (PCBs — the slide's graph shows PCB concentration rising with trophic position)</li></ul>
      <div class="callout key">Toxins like mercury and PCBs are fat-soluble and not excreted, so top predators that eat many contaminated prey accumulate the highest concentrations.</div>`},
    {h:"Energy loss recap", imgs:[{src:"slides/L3/slide-47.jpg",cap:"L3 · Slide 47"}], html:`
      <p class="lead">Food chain/web consequences include <span class="kw">energy loss</span> through metabolic/cellular processes — about <b>90% of energy is lost for every step up</b> the trophic pyramid (1,000,000 J of sunlight → 10,000 → 1,000 → 100 → 10 J).</p>`}
   ],
   quiz:[
    {type:"mcq",q:"Biomagnification refers to:",img:"slides/L3/slide-46.jpg",opts:["Energy increasing up the food chain","Toxic substances increasing in concentration at each higher trophic level","Populations doubling each generation","Species richness rising with area"],a:1,exp:"Biomagnification = rising toxin concentration at each successive trophic level."},
    {type:"mcq",q:"Why do top predators like tuna accumulate the most mercury?",opts:["They produce mercury","They eat many contaminated prey and can't excrete the fat-soluble toxin","Mercury only affects predators","They live in deeper water"],a:1,exp:"Fat-soluble toxins accumulate; eating many contaminated organisms concentrates them at the top."},
    {type:"mcq",q:"Compared to a single food chain, a food web is:",opts:["Simpler and more fragile","Nonlinear and more interconnected","Always shorter","Limited to one trophic level"],a:1,exp:"Food webs are nonlinear, interconnected, and generally more stable than a single linear chain."},
    {type:"tf",q:"In a food web, an organism may feed at more than one trophic level.",a:true,exp:"True — that is precisely why food webs are needed instead of simple linear chains."},
    {type:"short",q:"Define biomagnification and give a real-world example.",model:"Biomagnification is the increasing concentration of a toxic substance at each successive trophic level of a food chain. Because toxins such as mercury or PCBs are fat-soluble and not excreted, predators that consume many contaminated prey accumulate the highest concentrations. A real example is mercury building up in large predatory fish such as tuna.",pts:["Toxin concentration rises up trophic levels","Toxins fat-soluble, not excreted","Top predators accumulate most","Example: mercury in tuna / PCBs"]}
   ]
  },

  {
   id:"L3T10", title:"Disturbance & succession",
   sub:"Primary vs. secondary succession (slides 48–53).",
   slides:[
    {h:"Disturbance and succession defined", imgs:[{src:"slides/L3/slide-48.jpg",cap:"L3 · Slide 48"},{src:"slides/L3/slide-49.jpg",cap:"L3 · Slide 49"}], html:`
      <ul><li><span class="kw">Disturbance</span> = an event that causes changes in community structure and composition; it leads to succession.</li>
      <li><span class="kw">Succession</span> = the change in species composition in communities over time (primary or secondary).</li></ul>
      <p>During succession, the organisms of one stage <b>modify the habitat</b>, making it more suitable for the next stage — through accumulation of organic matter, decay of substrate into finer pieces, changes in soil pH, and reduction of sunlight at ground level. Disturbance and succession together produce <span class="kw-2">temporal patterns</span> of community change.</p>`},
    {h:"Primary succession", imgs:[{src:"slides/L3/slide-50.jpg",cap:"L3 · Slide 50"}], html:`
      <p class="lead"><span class="kw">Primary succession</span> occurs in an area <b>not previously occupied</b> by a biological community — e.g., lava flows, areas exposed by glaciation, or a new island.</p>
      <p>There is no soil to start; pioneer species like lichens and mosses must first break down rock and build soil. It is very slow.</p>`},
    {h:"Secondary succession", imgs:[{src:"slides/L3/slide-51.jpg",cap:"L3 · Slide 51"},{src:"slides/L3/slide-52.jpg",cap:"L3 · Slide 52"}], html:`
      <p class="lead"><span class="kw">Secondary succession</span> occurs in an area where a biological community was <b>recently removed</b> — treefalls, landslides, natural disasters, and human disturbance such as logging or mining.</p>
      <p>Because <b>soil remains</b>, it proceeds faster: pioneer species → intermediate species → climax community.</p>`},
    {h:"Stages of succession", imgs:[{src:"slides/L3/slide-53.jpg",cap:"L3 · Slide 53"}], html:`
      <p class="lead">Stages apply to both primary and secondary succession:</p>
      <table class="dt"><tr><th>Stage</th><th>Species</th></tr>
      <tr><td><b>Early</b></td><td>Pioneer species (lichen, moss, weedy herbs) — <span class="kw">r-selected</span></td></tr>
      <tr><td><b>Intermediate</b></td><td>Shrubs, fast-growing trees</td></tr>
      <tr><td><b>Late</b></td><td>Large, long-lived tree species — <span class="kw">K-selected</span></td></tr></table>`}
   ],
   quiz:[
    {type:"mcq",q:"Primary succession is distinguished by:",opts:["Starting with existing soil","Starting on bare substrate with no soil and no prior community","Always ending in grassland","Occurring only after fires"],a:1,exp:"Primary succession begins where there is no soil and no prior community (lava, new island, glaciated rock)."},
    {type:"mcq",q:"Succession on an abandoned farm field or after a forest fire (where soil remains) is:",opts:["Primary succession","Secondary succession","Biomagnification","Trait displacement"],a:1,exp:"Secondary succession — a community was removed but soil persists, so it proceeds faster."},
    {type:"mcq",q:"Early successional pioneer species (lichens, mosses, weedy herbs) tend to be:",opts:["K-selected","r-selected","Top predators","Decomposers only"],a:1,exp:"Pioneers are r-selected: fast-growing, good dispersers, short-lived. Late-succession trees are K-selected."},
    {type:"tf",q:"During succession, organisms of one stage modify the habitat, making it more suitable for the next stage.",a:true,exp:"True — through soil building, organic matter accumulation, pH change, and shading, each stage paves the way for the next."},
    {type:"short",q:"Compare primary and secondary succession, including starting conditions and relative speed.",model:"Primary succession begins in an area not previously occupied by a community, such as a lava flow or new island, where there is no soil; pioneer species like lichens must build soil first, so it is very slow. Secondary succession begins where a community was recently removed, such as after a fire or logging, but the soil remains; because soil and often seeds persist, it proceeds much faster.",pts:["Primary: no soil, no prior community (lava/new island)","Secondary: soil remains, community removed (fire/logging)","Primary is slow; secondary is faster","Pioneers build soil in primary succession"]}
   ]
  },

  {
   id:"L3T11", title:"Intermediate Disturbance Hypothesis",
   sub:"Why diversity peaks at moderate disturbance (slides 54–57).",
   slides:[
    {h:"The hypothesis", imgs:[{src:"slides/L3/slide-54.jpg",cap:"L3 · Slide 54"},{src:"slides/L3/slide-55.jpg",cap:"L3 · Slide 55"}], html:`
      <p class="lead">The <span class="kw">Intermediate Disturbance Hypothesis (IDH)</span>: different species are specialized to the conditions of different successional stages, so you find different species compositions at different stages.</p>
      <p>Therefore <b>diversity is highest at intermediate levels of disturbance</b>, because species from <span class="kw-2">both early and late succession co-occur</span> there. The hump-shaped curve on the slide peaks at intermediate disturbance.</p>`},
    {h:"Field evidence — Madidi National Park, Bolivia", imgs:[{src:"slides/L3/slide-56.jpg",cap:"L3 · Slide 56"},{src:"slides/L3/slide-57.jpg",cap:"L3 · Slide 57"}], html:`
      <p class="lead">From the professor's own fieldwork:</p>
      <ul><li>In the <b>disturbed areas</b>, mainly small, herbaceous plants were found — indicators of <b>early</b> successional stages.</li>
      <li>In the <b>well-preserved areas</b>, plants that take longer to grow or need complex biotic requirements were found (trees, epiphytes) — indicators of <b>late</b> succession.</li></ul>
      <p>At intermediate disturbance you'd get a mix of both, maximizing diversity.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"The Intermediate Disturbance Hypothesis predicts that species diversity is highest when disturbance is:",img:"slides/L3/slide-54.jpg",opts:["Absent","Very low","Intermediate","Extremely high"],a:2,exp:"Diversity peaks at intermediate disturbance, where early and late successional species co-occur."},
    {type:"mcq",q:"Why does diversity peak at intermediate disturbance?",opts:["Only pioneer species survive","Species from both early and late succession can co-occur","Competition is eliminated","Nutrients are unlimited"],a:1,exp:"Intermediate disturbance lets both early-successional and late-successional species coexist, raising diversity."},
    {type:"mcq",q:"At VERY HIGH levels of disturbance, diversity is low because:",opts:["Competitive exclusion dominates","Only disturbance-tolerant pioneer species can survive","Too many predators","Soil pH is neutral"],a:1,exp:"Frequent/severe disturbance leaves only hardy pioneer species, lowering diversity. Very low disturbance allows competitive exclusion — also low diversity."},
    {type:"tf",q:"Different species are specialized to different successional stages.",a:true,exp:"True — that specialization is the basis of the IDH: a mix of stages supports a mix of species."},
    {type:"short",q:"Explain the Intermediate Disturbance Hypothesis and why diversity is low at both extremes.",model:"The Intermediate Disturbance Hypothesis states that species diversity is highest at intermediate levels of disturbance. At very low disturbance, superior competitors exclude weaker species through competitive exclusion, lowering diversity. At very high disturbance, only hardy, disturbance-tolerant pioneer species survive, also lowering diversity. At intermediate disturbance, species adapted to both early and late successional stages can co-occur, maximizing diversity.",pts:["Diversity peaks at intermediate disturbance","Low disturbance → competitive exclusion","High disturbance → only tough pioneers","Intermediate → early & late species coexist"]}
   ]
  },

  {
   id:"L3T12", title:"Early vs. late succession & changing views",
   sub:"Trait comparison table and the modern view (slides 58–60).",
   slides:[
    {h:"Early vs. late succession species", imgs:[{src:"slides/L3/slide-58.jpg",cap:"L3 · Slide 58"},{src:"slides/L3/slide-59.jpg",cap:"L3 · Slide 59"}], html:`
      <table class="dt"><tr><th>Trait</th><th>Early</th><th>Late</th></tr>
      <tr><td>Plant size</td><td>Small</td><td>Large</td></tr>
      <tr><td>Growth rate</td><td>High</td><td>Low</td></tr>
      <tr><td>Dispersal ability</td><td>High</td><td>Low</td></tr>
      <tr><td>Lifespan</td><td>Short</td><td>Long (can be 100s of years)</td></tr>
      <tr><td>Competitive ability</td><td>Poor</td><td>Excellent</td></tr></table>
      <p>Reasoning: early species are <b>small</b> (no need to compete for sun yet), <b>fast-growing</b> (quick colonization before others), <b>good dispersers</b> (reach disturbed areas), and <b>poor competitors</b> (they don't need to be). Late species are the opposite — different successional stages call for different life strategies.</p>`},
    {h:"Views of succession have changed", imgs:[{src:"slides/L3/slide-60.jpg",cap:"L3 · Slide 60"}], html:`
      <table class="dt"><tr><th>View</th><th>Idea</th></tr>
      <tr><td><b>Old view</b></td><td>Communities progress toward a well-defined, final, stable <span class="kw">climax</span> equilibrium</td></tr>
      <tr><td><b>Modern view</b></td><td>Disturbance is the <span class="kw">norm</span> and chance plays a large role; communities are <span class="kw-2">always in flux</span></td></tr></table>`}
   ],
   quiz:[
    {type:"mcq",q:"Compared to late-succession species, early-succession species typically have:",opts:["Large size, low growth, long life","Small size, high growth, high dispersal, short life","Excellent competitive ability","Low dispersal and long lifespan"],a:1,exp:"Early species: small, fast-growing, high-dispersal, short-lived, poor competitors. Late species are the reverse."},
    {type:"mcq",q:"The MODERN view of succession holds that:",opts:["Communities reach a fixed climax and stay there","Disturbance is the norm and communities are always in flux","Succession never occurs","Only primary succession is real"],a:1,exp:"Modern view: disturbance is normal, chance matters, and communities are continually changing — not fixed at a climax."},
    {type:"mcq",q:"Why are early-succession plants typically poor competitors?",opts:["They are large and slow","They don't need to be — they colonize open, disturbed areas quickly","They live for centuries","They have no seeds"],a:1,exp:"Pioneers win by fast colonization and dispersal into open space, not by outcompeting neighbors."},
    {type:"tf",q:"Late-succession trees tend to have excellent competitive ability and long lifespans.",a:true,exp:"True — late-succession species are large, slow-growing, long-lived, and strong competitors."},
    {type:"short",q:"Contrast the old and modern views of ecological succession.",model:"The old view held that communities progress through predictable stages toward a final, stable climax community and then remain at equilibrium. The modern view holds that disturbance is the norm rather than the exception, that chance plays a large role, and that communities are always in flux rather than settling into a fixed climax.",pts:["Old view: progress to stable climax equilibrium","Modern view: disturbance is the norm","Chance plays a large role","Communities always in flux"]}
   ]
  },

  {
   id:"L3T13", title:"Applied community ecology",
   sub:"Restoration, foundation & keystone species (slides 61–64).",
   slides:[
    {h:"Speeding up succession (restoration)", imgs:[{src:"slides/L3/slide-61.jpg",cap:"L3 · Slide 61"}], html:`
      <p class="lead">We can <span class="kw">speed up succession to increase biodiversity in deforested areas</span>. Later-successional tropical forest species require shade for germination, so the <b>framework method</b> mixes fast-growing native species (to create a closed canopy) with fruit-bearing species (which attract animals). Goal: restore biodiversity and ecosystem services as quickly as possible.</p>`},
    {h:"Foundation species", imgs:[{src:"slides/L3/slide-62.jpg",cap:"L3 · Slide 62 — kelp forest"}], html:`
      <p class="lead"><span class="kw">Foundation species</span> = species that provide the <b>basis of the food web</b>; they are often primary producers. Example: kelp forests provide both food and habitat for entire communities.</p>`},
    {h:"Keystone species", imgs:[{src:"slides/L3/slide-63.jpg",cap:"L3 · Slide 63 — wolf"},{src:"slides/L3/slide-64.jpg",cap:"L3 · Slide 64 — study objectives"}], html:`
      <p class="lead"><span class="kw">Keystone species</span> have an outsized effect on their community relative to their abundance. Example: a wolf keeps prey populations down, which in turn prevents overgrazing — keeping the whole food web in order.</p>
      <p>Slide 64 lists Lecture 3's objectives: define community; describe and identify all the species interactions; understand predator/prey traits and arms races; distinguish Batesian vs Müllerian mimicry; explain trait displacement and competitive exclusion; compare food chains vs webs; define biomagnification; and understand disturbance, succession, and the IDH.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"A foundation species is one that:",opts:["Has a large effect relative to its abundance via predation","Provides the basis of the food web, often as a primary producer","Is always a top predator","Only exists in deserts"],a:1,exp:"Foundation species (e.g., kelp) form the structural/energetic base of the community, often as primary producers."},
    {type:"mcq",q:"A wolf that controls prey numbers and thereby prevents overgrazing is acting as a:",img:"slides/L3/slide-63.jpg",opts:["Foundation species","Keystone species","Pioneer species","Parasite"],a:1,exp:"Keystone species exert a disproportionate effect on community structure relative to their abundance."},
    {type:"mcq",q:"In the framework restoration method, fast-growing native species are planted mainly to:",opts:["Provide fruit for humans","Create a closed canopy (shade) that later species need","Outcompete all other plants permanently","Lower the soil pH"],a:1,exp:"Fast-growing natives quickly create canopy shade, which later-successional species require to germinate."},
    {type:"tf",q:"Foundation species and keystone species are the same thing.",a:false,exp:"False — a foundation species forms the base of the food web (often a producer); a keystone species has an outsized effect relative to its abundance (often a predator)."},
    {type:"short",q:"Distinguish a foundation species from a keystone species, with an example of each.",model:"A foundation species provides the structural and energetic basis of the food web and is often a primary producer, such as kelp in a kelp forest. A keystone species has an effect on its community that is disproportionately large relative to its abundance, such as a wolf whose predation keeps prey numbers in check and prevents overgrazing. Foundation species build the community from the bottom up; keystone species regulate it from the top.",pts:["Foundation = base of food web, often producer (kelp)","Keystone = outsized effect vs abundance (wolf)","Foundation builds; keystone regulates"]}
   ]
  }

 ]
},
/* ===================== LECTURE 4 ===================== */
{
 id:"L4", icon:"🌍", short:"L4 · Ecological Biogeography",
 title:"Lecture 4 — Ecological Biogeography",
 blurb:"SDMs, diversity metrics, island biogeography, Simpson's index, endemism, α/β/γ diversity, and global patterns.",
 objectives:[
  "Define what an SDM is; explain its inputs, outputs, and limitation",
  "Define species richness and species evenness; identify which community has more of each",
  "Explain the species–area relationship and its limitations",
  "Explain the equilibrium theory of island biogeography; predict richness from island size and distance to mainland",
  "Calculate and interpret Simpson's diversity index from species abundances",
  "Define endemism",
  "Define alpha, beta, and gamma diversity and calculate each from a diagram",
  "Explain the three reasons the tropics have higher species richness than temperate areas"
 ],
 topics:[

  {
   id:"L4T1", title:"Biogeography & Species Distribution Models",
   sub:"What SDMs do — and their key limitation (slides 1–5).",
   slides:[
    {h:"What is ecological biogeography?", imgs:[{src:"slides/L4/slide-01.jpg",cap:"L4 · Slide 1"},{src:"slides/L4/slide-02.jpg",cap:"L4 · Slide 2"}], html:`
      <p class="lead"><span class="kw">Ecological biogeography</span> focuses on how ecological processes influence the distribution of organisms in space and time:</p>
      <ul><li>Where organisms live</li><li>Why they live there</li><li>Identifying patterns and explaining them with processes</li></ul>`},
    {h:"Species Distribution Models (SDMs)", imgs:[{src:"slides/L4/slide-03.jpg",cap:"L4 · Slide 3"},{src:"slides/L4/slide-04.jpg",cap:"L4 · Slide 4 — inputs/outputs"}], html:`
      <p class="lead">An <span class="kw">SDM</span> predicts where a species is likely to occur, based on the relationship between known occurrence records and environmental conditions (statistical or machine-learning algorithms find the relationship).</p>
      <table class="dt"><tr><th>Inputs</th><th>Outputs</th></tr>
      <tr><td>① Occurrence records<br>② Environmental data</td><td>① Map of habitat suitability / probability of occurrence<br>② Identification of areas with favorable environmental conditions</td></tr></table>`},
    {h:"The key limitation — BAM", imgs:[{src:"slides/L4/slide-05.jpg",cap:"L4 · Slide 5 — BAM diagram"}], html:`
      <p class="lead"><span class="kw">Important limitation:</span> SDMs predict <b>potentially suitable habitat, not necessarily where the species actually occurs</b>. Competition, predators, dispersal barriers, and human activities can prevent a species from occupying all suitable areas.</p>
      <p>This is the <span class="kw-2">BAM diagram</span> again (from Lecture 1): the actual range is the overlap of <b>B</b>iotic, <b>A</b>biotic, and <b>M</b>obility. SDMs mostly capture the Abiotic circle.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"The two inputs to a Species Distribution Model are:",img:"slides/L4/slide-04.jpg",opts:["Birth and death rates","Occurrence records and environmental data","Predators and prey","Latitude and elevation only"],a:1,exp:"SDMs combine occurrence records with environmental data to map suitable habitat."},
    {type:"mcq",q:"The main output of an SDM is:",opts:["A phylogenetic tree","A map of habitat suitability / probability of occurrence","A population growth rate","A survivorship curve"],a:1,exp:"SDMs output a habitat-suitability map identifying areas with favorable conditions."},
    {type:"mcq",q:"The key limitation of SDMs, captured by the BAM diagram, is that they:",opts:["Require no data","Predict suitable habitat, not necessarily actual occupancy","Only work for plants","Always overestimate range size"],a:1,exp:"Suitable ≠ occupied: biotic interactions (B) and dispersal/mobility (M) can keep a species out of climatically suitable areas."},
    {type:"tf",q:"An area an SDM marks as suitable is always actually occupied by the species.",a:false,exp:"False — competition, predators, and dispersal barriers can prevent occupancy. SDMs capture mainly the abiotic suitability."},
    {type:"short",q:"Define an SDM, state its inputs and outputs, and explain its main limitation.",model:"A species distribution model uses occurrence records and environmental data to predict where a species is likely to occur, producing a map of habitat suitability. Its main limitation is that it predicts only potentially suitable (mainly abiotic) habitat, not actual occupancy. As the BAM diagram shows, biotic interactions such as competition and predation, and dispersal/mobility barriers, can prevent a species from occupying otherwise suitable areas.",pts:["Inputs: occurrence records + environmental data","Output: habitat suitability map","Limitation: suitable ≠ occupied","Biotic interactions & dispersal (BAM) restrict actual range"]}
   ]
  },

  {
   id:"L4T2", title:"Species richness",
   sub:"The simplest diversity measure (slide 6).",
   slides:[
    {h:"Species richness", imgs:[{src:"slides/L4/slide-06.jpg",cap:"L4 · Slide 6"}], html:`
      <p class="lead"><span class="kw">Species richness</span> = the number of unique species in a given area.</p>
      <ul><li>It is one of the <b>simplest</b> measures of biodiversity.</li>
      <li><span class="kw-2">Every species counts equally</span>, regardless of how many individuals are present.</li></ul>
      <div class="callout key">Richness ignores abundance. Two communities can have the same richness but very different biodiversity — which is why we also need <b>evenness</b> (next).</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Species richness is:",opts:["How evenly individuals are spread among species","The number of unique species in an area","The total number of individuals","The biomass of an area"],a:1,exp:"Richness = a count of unique species; every species counts equally regardless of abundance."},
    {type:"tf",q:"Species richness takes into account how abundant each species is.",a:false,exp:"False — richness counts species equally and ignores abundance. Evenness accounts for abundance."},
    {type:"short",q:"Define species richness and state one of its limitations.",model:"Species richness is the number of unique species in a given area, and it is one of the simplest measures of biodiversity because every species counts equally. Its limitation is that it ignores abundance — it doesn't reflect how individuals are distributed among species, so two communities with the same richness can differ greatly in actual diversity.",pts:["Number of unique species in an area","Every species counts equally","Ignores abundance/evenness"]}
   ]
  },

  {
   id:"L4T3", title:"The species–area relationship",
   sub:"More area, more species — and its assumptions (slides 7–11).",
   slides:[
    {h:"What determines species richness?", imgs:[{src:"slides/L4/slide-07.jpg",cap:"L4 · Slide 7"},{src:"slides/L4/slide-08.jpg",cap:"L4 · Slide 8"}], html:`
      <p class="lead">A major driver of richness is <b>area</b>. Plotting the number of species against area (e.g., bat fauna of the Antilles) yields the <span class="kw">species–area relationship</span>.</p>`},
    {h:"The species–area relationship & its assumptions", imgs:[{src:"slides/L4/slide-09.jpg",cap:"L4 · Slide 9"},{src:"slides/L4/slide-10.jpg",cap:"L4 · Slide 10"},{src:"slides/L4/slide-11.jpg",cap:"L4 · Slide 11"}], html:`
      <p class="lead">The <span class="kw">species–area relationship</span> = the rate at which new species are seen as the area surveyed increases. Increasing area → increasing species richness (a curve that rises and gradually levels off).</p>
      <p><b>Assumptions (limitations):</b></p>
      <ol><li>You can <span class="kw-2">identify all of the species</span>.</li>
      <li>You <span class="kw-2">found all of the species</span> present.</li></ol>
      <div class="callout key">Those two assumptions are the "limitations" the exam objective asks about — in reality we may miss cryptic species or fail to detect rare ones.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"The species–area relationship states that as the area surveyed increases:",img:"slides/L4/slide-09.jpg",opts:["Species richness decreases","Species richness increases","Richness stays exactly constant","Evenness always rises"],a:1,exp:"Larger areas contain more habitats and individuals, so more species are found."},
    {type:"mcq",q:"Which is an assumption (limitation) of the species–area relationship?",opts:["That all individuals are identical","That you can identify and have found all the species","That area never changes","That there are no abiotic factors"],a:1,exp:"It assumes you can identify all species and that you found all the species present — often not true in practice."},
    {type:"tf",q:"A limitation of the species–area relationship is that rare or cryptic species may go undetected.",a:true,exp:"True — the method assumes complete detection and identification, which is rarely achievable."},
    {type:"short",q:"State the species–area relationship and one of its key assumptions.",model:"The species–area relationship is the pattern that the number of species found increases as the area surveyed increases. A key assumption (and limitation) is that you can identify all of the species present and that you have actually found all of them — in reality, rare or hard-to-identify species may be missed.",pts:["More area → more species","Curve rises and levels off","Assumes all species are identified","Assumes all species were found"]}
   ]
  },

  {
   id:"L4T4", title:"Equilibrium theory of island biogeography",
   sub:"How size and distance set island richness (slides 12–13).",
   slides:[
    {h:"Immigration vs. extinction", imgs:[{src:"slides/L4/slide-12.jpg",cap:"L4 · Slide 12"},{src:"slides/L4/slide-13.jpg",cap:"L4 · Slide 13"}], html:`
      <p class="lead">The <span class="kw">equilibrium theory of island biogeography</span> explains island species richness as a balance between <b>extinction</b> and <b>immigration</b>:</p>
      <table class="dt"><tr><th>Factor</th><th>Effect on richness</th></tr>
      <tr><td><b>Larger islands</b></td><td>Support larger populations & more varied habitats → <span class="kw">less extinction</span> → more species</td></tr>
      <tr><td><b>Islands closer to mainland</b></td><td><span class="kw">Higher immigration rates</span> → more species</td></tr></table>
      <div class="callout key">Prediction grid: <b>large + near = most species</b>; <b>small + far = fewest</b>. Size controls extinction; distance controls immigration.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"According to island biogeography theory, which island has the HIGHEST species richness?",img:"slides/L4/slide-13.jpg",opts:["Small, far from mainland","Large, far from mainland","Small, near the mainland","Large, near the mainland"],a:3,exp:"Large (low extinction) + near (high immigration) = the most species."},
    {type:"mcq",q:"Larger islands support more species mainly because they have:",opts:["Higher immigration","Lower extinction (bigger populations, more habitat)","Warmer climate","Fewer predators"],a:1,exp:"Island size lowers extinction; distance is what mainly affects immigration."},
    {type:"mcq",q:"Distance from the mainland primarily affects:",opts:["Extinction rate","Immigration rate","Mutation rate","Birth rate"],a:1,exp:"Closer islands are easier to reach → higher immigration. Size affects extinction."},
    {type:"tf",q:"A small island far from the mainland is predicted to have the fewest species.",a:true,exp:"True — small means high extinction; far means low immigration; both reduce richness."},
    {type:"short",q:"Explain how island size and distance from the mainland each influence species richness.",model:"Island size affects the extinction rate: larger islands support larger populations and more varied habitats, so extinction is lower and richness is higher. Distance from the mainland affects the immigration rate: islands closer to the mainland receive more colonists, so immigration is higher and richness is higher. Therefore richness is greatest on large, near islands and least on small, distant ones.",pts:["Size → extinction (larger = lower extinction)","Distance → immigration (closer = higher immigration)","Large+near = most species","Small+far = fewest species"]},
    {type:"mcq",q:"Two islands are the same size; Island X is 50 km from the mainland and Island Y is 500 km. Which has more species, and why?",opts:["X — closer means higher immigration","Y — farther means higher immigration","Y — farther means lower extinction","They are equal"],a:0,exp:"Distance controls immigration. The nearer island (X) receives more colonists, so it holds more species."},
    {type:"mcq",q:"A conservation group can protect one of two equally isolated reserves. To maximize species richness they should choose the:",opts:["Larger reserve","Smaller reserve","Either — size doesn't matter","Reserve with more predators"],a:0,exp:"Larger area lowers extinction (bigger populations, more habitat), so the larger reserve sustains more species."},
    {type:"short",q:"Using island biogeography, predict how building a road that splits a forest into small isolated patches affects species richness, and explain why.",model:"Fragmentation turns the forest into small 'habitat islands.' Smaller patch area raises extinction rates (smaller populations, less habitat), and isolation lowers immigration between patches. Both forces reduce species richness, so each fragment is expected to lose species over time — just as small, distant islands hold the fewest species.",pts:["Fragments behave like islands","Small area → higher extinction","Isolation → lower immigration","Net: richness declines in fragments"]}
   ]
  },

  {
   id:"L4T5", title:"Species evenness",
   sub:"How equally individuals are spread among species (slides 14–22).",
   slides:[
    {h:"What is evenness?", imgs:[{src:"slides/L4/slide-14.jpg",cap:"L4 · Slide 14"},{src:"slides/L4/slide-15.jpg",cap:"L4 · Slide 15"}], html:`
      <p class="lead"><span class="kw">Species evenness</span> describes how equally individuals are distributed among the species in a community.</p>
      <ul><li><b>High evenness:</b> species have similar abundances.</li>
      <li><b>Low evenness:</b> one or a few species dominate while others are rare.</li></ul>
      <div class="callout tip">Two communities can have the <b>same richness</b> but very different biodiversity if one species dominates — evenness captures that difference.</div>`},
    {h:"Richness vs. evenness — Sample A vs Sample B", imgs:[{src:"slides/L4/slide-16.jpg",cap:"L4 · Slide 16"},{src:"slides/L4/slide-17.jpg",cap:"L4 · Slide 17"},{src:"slides/L4/slide-18.jpg",cap:"L4 · Slide 18"},{src:"slides/L4/slide-19.jpg",cap:"L4 · Slide 19"},{src:"slides/L4/slide-20.jpg",cap:"L4 · Slide 20"},{src:"slides/L4/slide-21.jpg",cap:"L4 · Slide 21 — proportions"},{src:"slides/L4/slide-22.jpg",cap:"L4 · Slide 22"}], html:`
      <p class="lead">The lecture walks through two samples of butterflies/insects:</p>
      <ul><li><b>Richness:</b> Sample A has 3 species; Sample B has fewer (2). So <b>Sample A has higher richness</b>.</li>
      <li><b>Evenness:</b> In Sample A one species dominates (proportions ≈ .75, .125, .125 — <b>low evenness</b>); in Sample B the species are roughly equal (≈ .5 / .5 — <b>high evenness</b>).</li></ul>
      <div class="callout key">Richness and evenness are <b>separate</b> ideas. The sample with more species isn't necessarily the more even one — read the abundances carefully.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"Species evenness measures:",opts:["The number of species present","How equally individuals are distributed among species","The total area surveyed","The number of trophic levels"],a:1,exp:"Evenness = how equal the abundances are across species (not how many species there are)."},
    {type:"mcq",q:"A community where one species makes up 90% of individuals has:",opts:["High evenness","Low evenness","High richness automatically","No diversity measure"],a:1,exp:"Heavy dominance by one species = low evenness."},
    {type:"tf",q:"Two communities with identical species richness can have very different evenness.",a:true,exp:"True — richness counts species; evenness reflects how abundances are distributed. They are independent."},
    {type:"mcq",q:"A sample with abundances of 50 / 50 / 50 has higher evenness than one with 90 / 5 / 5 because:",opts:["It has more species","Its individuals are distributed more equally among species","It covers more area","It has fewer individuals"],a:1,exp:"Equal abundances = high evenness; one dominant species = low evenness."},
    {type:"short",q:"Define species evenness and explain how it differs from species richness.",model:"Species evenness describes how equally individuals are distributed among the species in a community: high evenness means species have similar abundances, while low evenness means one or a few species dominate. It differs from species richness, which simply counts the number of species present without regard to their abundances. Two communities can share the same richness yet differ in evenness.",pts:["Evenness = how equal the abundances are","High evenness = similar abundances","Low evenness = one species dominates","Richness counts species; evenness weighs abundance"]}
   ]
  },

  {
   id:"L4T6", title:"Simpson's Diversity Index (D)",
   sub:"The formula, interpretation, and all five worked communities (slides 23–36).",
   slides:[
    {h:"The formula & how to read D", imgs:[{src:"slides/L4/slide-23.jpg",cap:"L4 · Slide 23"},{src:"slides/L4/slide-24.jpg",cap:"L4 · Slide 24"}], html:`
      <p class="lead"><span class="kw">Simpson's Diversity Index</span> measures diversity considering <b>both richness and evenness</b>:</p>
      <div class="formula">D = Σ pᵢ²   (i = 1 … S)</div>
      <ul><li><b>pᵢ</b> = the proportional abundance of each species i</li>
      <li>To calculate D, sum the squared proportions for each species, from species 1 up to S.</li></ul>
      <div class="callout key" style="border-left-color:var(--amber)"><b>Critical:</b> in this form, <b>high diversity = values close to 0</b>, and <b>low diversity = values close to 1</b>. (It rises toward 1 as one species dominates.)</div>`},
    {h:"Worked: Communities 1–3", imgs:[{src:"slides/L4/slide-25.jpg",cap:"L4 · Slide 25 — Community 1 (Q)"},{src:"slides/L4/slide-26.jpg",cap:"L4 · Slide 26 — Community 1 (A)"},{src:"slides/L4/slide-27.jpg",cap:"L4 · Slide 27 — Community 2 (Q)"},{src:"slides/L4/slide-28.jpg",cap:"L4 · Slide 28 — Community 2 (A)"},{src:"slides/L4/slide-29.jpg",cap:"L4 · Slide 29 — Community 3 (Q)"},{src:"slides/L4/slide-30.jpg",cap:"L4 · Slide 30 — Community 3 (A)"}], html:`
      <table class="dt"><tr><th>Community</th><th>Abundances</th><th>Calculation</th><th>D</th></tr>
      <tr><td><b>1</b></td><td>100 of one species</td><td>p₁ = 1 → 1²</td><td><b>1.0</b> (lowest diversity)</td></tr>
      <tr><td><b>2</b></td><td>98, 2</td><td>.98² + .02²</td><td><b>0.9608</b></td></tr>
      <tr><td><b>3</b></td><td>50, 50</td><td>.5² + .5²</td><td><b>0.50</b></td></tr></table>
      <p>As the single dominant species gives way to more even splits, D drops toward 0 — i.e., diversity rises.</p>`},
    {h:"Worked: Communities 4–5", imgs:[{src:"slides/L4/slide-31.jpg",cap:"L4 · Slide 31 — Community 4 (Q)"},{src:"slides/L4/slide-32.jpg",cap:"L4 · Slide 32 — Community 4 (A)"},{src:"slides/L4/slide-33.jpg",cap:"L4 · Slide 33 — Community 5 (Q)"},{src:"slides/L4/slide-34.jpg",cap:"L4 · Slide 34 — Community 5 (A)"}], html:`
      <table class="dt"><tr><th>Community</th><th>Abundances</th><th>Calculation</th><th>D</th></tr>
      <tr><td><b>4</b></td><td>20, 35, 25, 20</td><td>.2² + .35² + .25² + .2²</td><td><b>0.265</b></td></tr>
      <tr><td><b>5</b></td><td>25, 25, 25, 25</td><td>4 × .25²</td><td><b>0.25</b> (highest diversity)</td></tr></table>
      <p>Community 5 — four equally abundant species — has the lowest D (0.25), so it is the <b>most diverse</b>.</p>`},
    {h:"Results table — which is most diverse?", imgs:[{src:"slides/L4/slide-35.jpg",cap:"L4 · Slide 35"},{src:"slides/L4/slide-36.jpg",cap:"L4 · Slide 36 — answer"}], html:`
      <table class="dt"><tr><th>Community</th><th>D</th></tr>
      <tr><td>1</td><td>1.00</td></tr><tr><td>2</td><td>0.9608</td></tr><tr><td>3</td><td>0.50</td></tr>
      <tr><td>4</td><td>0.265</td></tr><tr><td><b>5</b></td><td><b>0.25 ← most diverse</b></td></tr></table>
      <div class="callout key">Remember: high diversity = D close to 0, low diversity = D close to 1. Community 5 (0.25) wins; Community 1 (1.0) is least diverse.</div>`}
   ],
   quiz:[
    {type:"mcq",q:"In Simpson's index D = Σpᵢ², which D value indicates the MOST diverse community?",opts:["D = 1.0","D = 0.75","D = 0.50","D = 0.25"],a:3,exp:"Closer to 0 = higher diversity. Of these, 0.25 is the most diverse."},
    {type:"mcq",q:"A community of 4 species each with 25 individuals (100 total) has D = ?",img:"slides/L4/slide-34.jpg",opts:["1.0","0.50","0.25","0.0"],a:2,exp:"Each pᵢ = 0.25, pᵢ² = 0.0625, ×4 = 0.25."},
    {type:"mcq",q:"A community with 98 of species 1 and 2 of species 2 gives D ≈ ?",opts:["0.25","0.50","0.9608","0.02"],a:2,exp:".98² + .02² = 0.9604 + 0.0004 = 0.9608 — near 1, so low diversity."},
    {type:"mcq",q:"A high Simpson's D (close to 1) indicates:",opts:["High diversity","Low diversity (one species dominates)","Equal abundances","Many species"],a:1,exp:"In this form, D near 1 = low diversity (dominance); D near 0 = high diversity."},
    {type:"tf",q:"Simpson's index accounts for both species richness and evenness.",a:true,exp:"True — it incorporates the number of species and their relative abundances."},
    {type:"short",q:"A pond has 3 species with abundances 80, 10, 10 (100 total). Calculate D = Σpᵢ² and interpret it.",model:"The proportions are 0.8, 0.1, and 0.1. Squaring and summing: 0.8² + 0.1² + 0.1² = 0.64 + 0.01 + 0.01 = 0.66. A value of 0.66 is close to 1, which indicates low diversity, because one species (80%) dominates the community.",pts:["pᵢ = 0.8, 0.1, 0.1","Squares: 0.64 + 0.01 + 0.01","D = 0.66","Close to 1 → low diversity (dominance)"]},
    {type:"mcq",q:"A community of 2 species with 60 and 40 individuals (100 total) has D = Σpᵢ² = ?",opts:["0.52","0.48","0.25","1.0"],a:0,exp:"0.6² + 0.4² = 0.36 + 0.16 = 0.52."},
    {type:"mcq",q:"Four species with abundances 40, 30, 20, 10 (100 total). What is D = Σpᵢ²?",opts:["0.30","0.25","0.70","0.10"],a:0,exp:"0.4² + 0.3² + 0.2² + 0.1² = 0.16 + 0.09 + 0.04 + 0.01 = 0.30."},
    {type:"mcq",q:"Three communities have Simpson's D of 0.9, 0.4, and 0.2. Which is the MOST diverse?",opts:["D = 0.9","D = 0.4","D = 0.2","They are equal"],a:2,exp:"In this form, lower D = higher diversity, so D = 0.2 is the most diverse."},
    {type:"mcq",q:"Five equally abundant species (20 individuals each, 100 total). What is D?",opts:["0.20","0.25","0.05","1.0"],a:0,exp:"Each pᵢ = 0.2, pᵢ² = 0.04, × 5 = 0.20 — the lowest possible D for 5 species."},
    {type:"short",q:"A meadow has three plant species with 50, 30, and 20 individuals. Compute D = Σpᵢ² and interpret it.",model:"Proportions are 0.5, 0.3, 0.2. Squaring and summing: 0.5² + 0.3² + 0.2² = 0.25 + 0.09 + 0.04 = 0.38. A D of 0.38 is closer to 0 than to 1, indicating fairly high diversity with reasonably even abundances.",pts:["pᵢ = 0.5, 0.3, 0.2","Squares: 0.25 + 0.09 + 0.04","D = 0.38","Closer to 0 → fairly diverse/even"]}
   ]
  },

  {
   id:"L4T7", title:"Endemism",
   sub:"Species found in only one place (slides 37–38).",
   slides:[
    {h:"Endemism", imgs:[{src:"slides/L4/slide-37.jpg",cap:"L4 · Slide 37"},{src:"slides/L4/slide-38.jpg",cap:"L4 · Slide 38"}], html:`
      <p class="lead"><span class="kw">Endemism</span>: species that are <b>found naturally in only one geographic area and nowhere else on Earth</b>. Species or taxa found exclusively in one area are said to be <span class="kw-2">endemic</span>.</p>
      <p>The geographic area may be:</p>
      <ul><li>An island</li><li>A mountain range</li><li>A single country or region</li><li>An isolated lake or habitat</li></ul>
      <p>Examples: the Galápagos tortoise (Galápagos only); kangaroos (Macropodidae, Australia only).</p>`}
   ],
   quiz:[
    {type:"mcq",q:"A species that is found naturally in only one geographic area and nowhere else is:",opts:["Cosmopolitan","Endemic","Invasive","A keystone species"],a:1,exp:"Endemic = restricted naturally to a single geographic area."},
    {type:"mcq",q:"Which is an example of endemism?",opts:["House sparrows worldwide","The Galápagos tortoise on the Galápagos Islands","Rats in cities globally","Dandelions across continents"],a:1,exp:"The Galápagos tortoise occurs naturally only on the Galápagos — a classic endemic."},
    {type:"tf",q:"An endemic species can be found naturally on several continents.",a:false,exp:"False — by definition an endemic species occurs naturally in only one area and nowhere else."},
    {type:"short",q:"Define endemism and give an example.",model:"Endemism refers to species that occur naturally in only one geographic area and nowhere else on Earth; such species are described as endemic. The area can be an island, mountain range, country, or isolated habitat. An example is the Galápagos tortoise, which is found only on the Galápagos Islands.",pts:["Found naturally in only one area","Nowhere else on Earth","Area: island/mountain/region/lake","Example: Galápagos tortoise or kangaroos"]}
   ]
  },

  {
   id:"L4T8", title:"Alpha, beta & gamma diversity",
   sub:"Partitioning diversity across space (slides 39–48).",
   slides:[
    {h:"The three scales", imgs:[{src:"slides/L4/slide-39.jpg",cap:"L4 · Slide 39"},{src:"slides/L4/slide-40.jpg",cap:"L4 · Slide 40"},{src:"slides/L4/slide-41.jpg",cap:"L4 · Slide 41"}], html:`
      <p class="lead"><span class="kw">Spatial partitioning of diversity</span> (here, diversity = richness):</p>
      <table class="dt"><tr><th>Symbol</th><th>Name</th><th>What it measures</th><th>Scale</th></tr>
      <tr><td><b>α</b></td><td>Alpha</td><td>Species in a single location (within-site richness)</td><td>Local</td></tr>
      <tr><td><b>β</b></td><td>Beta</td><td>Species turnover / total unique species between sites</td><td>Between areas</td></tr>
      <tr><td><b>γ</b></td><td>Gamma</td><td>Total species across all locations</td><td>Regional</td></tr></table>
      <div class="callout tip">Hook: <b>A</b>lpha = one <b>A</b>rea · <b>B</b>eta = <b>B</b>etween · <b>G</b>amma = the <b>G</b>rand regional total.</div>`},
    {h:"Worked example — alpha", imgs:[{src:"slides/L4/slide-42.jpg",cap:"L4 · Slide 42"},{src:"slides/L4/slide-43.jpg",cap:"L4 · Slide 43"},{src:"slides/L4/slide-44.jpg",cap:"L4 · Slide 44"}], html:`
      <p class="lead"><span class="kw">Alpha diversity = within-site richness.</span></p>
      <ul><li>Island 1 has {heart, star, circle} → <b>α = 3</b></li>
      <li>Island 2 has {star, square, circle} → <b>α = 3</b></li></ul>`},
    {h:"Worked example — beta & gamma", imgs:[{src:"slides/L4/slide-45.jpg",cap:"L4 · Slide 45 — beta (Q)"},{src:"slides/L4/slide-46.jpg",cap:"L4 · Slide 46 — beta = 2"},{src:"slides/L4/slide-47.jpg",cap:"L4 · Slide 47 — gamma (Q)"},{src:"slides/L4/slide-48.jpg",cap:"L4 · Slide 48 — gamma = 4"}], html:`
      <p class="lead">Using the same two islands (Island 1 = heart, star, circle; Island 2 = star, square, circle):</p>
      <ul><li><span class="kw">Beta</span> = total <b>unique (not shared)</b> species between the two sites = heart + square → <b>β = 2</b>. (Star and circle are shared, so they don't count.)</li>
      <li><span class="kw">Gamma</span> = total richness across all areas = {heart, star, circle, square} → <b>γ = 4</b>.</li></ul>`}
   ],
   quiz:[
    {type:"mcq",q:"The number of species at a single local site is:",opts:["Beta diversity","Gamma diversity","Alpha diversity","Endemism"],a:2,exp:"Alpha (α) = within-site richness at one location."},
    {type:"mcq",q:"Site A = {oak, pine, elm}; Site B = {pine, elm, birch}. The gamma diversity is:",opts:["3","4","2","6"],a:1,exp:"Gamma = total unique species across all sites = {oak, pine, elm, birch} = 4."},
    {type:"mcq",q:"For Site A = {oak, pine, elm} and Site B = {pine, elm, birch}, the beta diversity (unique/not shared) is:",opts:["1","2","3","4"],a:1,exp:"Shared: pine, elm. Not shared: oak + birch = 2."},
    {type:"mcq",q:"Island 1 = {heart, star, circle}, Island 2 = {star, square, circle}. The alpha diversity of each island is:",img:"slides/L4/slide-44.jpg",opts:["2 and 2","3 and 3","4 total","1 each"],a:1,exp:"Each island has 3 species, so α = 3 for each."},
    {type:"tf",q:"Beta diversity measures species turnover — the species that differ between sites.",a:true,exp:"True — beta reflects how different the sites are (unique/unshared species)."},
    {type:"short",q:"Define alpha, beta, and gamma diversity.",model:"Alpha diversity is the species richness within a single local site. Beta diversity is the turnover between sites — the species that are not shared between them. Gamma diversity is the total species richness across all sites in a region. In short, alpha is local, beta is between sites, and gamma is the regional total.",pts:["Alpha = within-site (local) richness","Beta = between-site turnover (unshared species)","Gamma = total regional richness","α local · β between · γ grand total"]},
    {type:"mcq",q:"Forest A = {oak, maple, birch, pine}; Forest B = {maple, pine, ash}. What is the gamma diversity?",opts:["5","4","7","2"],a:0,exp:"Gamma = all unique species across both sites: oak, maple, birch, pine, ash = 5."},
    {type:"mcq",q:"For Forest A = {oak, maple, birch, pine} and Forest B = {maple, pine, ash}, what is the beta diversity (species not shared)?",opts:["2","3","4","5"],a:1,exp:"Shared: maple, pine. Not shared: oak, birch (A only) + ash (B only) = 3."},
    {type:"mcq",q:"Three ponds have within-site richness of 6, 8, and 4 species. What is the mean alpha diversity?",opts:["6","18","8","4"],a:0,exp:"Mean alpha = (6 + 8 + 4) / 3 = 6 species per site."},
    {type:"short",q:"Meadow = {A, B, C}; Marsh = {C, D}. Give the alpha diversity of each, plus the beta and gamma diversity.",model:"Alpha: the Meadow has 3 species and the Marsh has 2. Gamma is the total across both sites — {A, B, C, D} = 4. Beta is the number of unshared species — A and B (Meadow only) plus D (Marsh only) = 3, since only C is shared.",pts:["Alpha: Meadow = 3, Marsh = 2","Gamma = 4 (A, B, C, D)","Beta = 3 (unshared: A, B, D)","Only C is shared"]}
   ]
  },

  {
   id:"L4T9", title:"Latitudinal trends in diversity",
   sub:"Why the tropics are so rich — three reasons (slides 49–52).",
   slides:[
    {h:"The pattern", imgs:[{src:"slides/L4/slide-49.jpg",cap:"L4 · Slide 49"}], html:`
      <p class="lead"><span class="kw">Latitudinal diversity gradient:</span> the tropics are much richer in species than temperate or arctic regions. Richness peaks near the equator and declines toward the poles.</p>`},
    {h:"Reason 1 — energy & productivity", imgs:[{src:"slides/L4/slide-50.jpg",cap:"L4 · Slide 50 — NPP map"}], html:`
      <p class="lead"><b>1) Higher energy input → higher plant productivity/biomass.</b> More solar energy in the tropics means higher net primary productivity (NPP). More resources mean <span class="kw">more species can co-exist</span>, and species abundances are higher too.</p>`},
    {h:"Reason 2 — climatic stability", imgs:[{src:"slides/L4/slide-51.jpg",cap:"L4 · Slide 51 — glaciation"}], html:`
      <p class="lead"><b>2) Higher climatic stability over time.</b> Tropical diversity has been allowed to <span class="kw">accumulate</span> undisturbed. This differs from areas affected by glaciers, whose fauna and flora repeatedly shifted in their distributions (and suffered extinctions).</p>`},
    {h:"Reason 3 — 'out of the tropics'", imgs:[{src:"slides/L4/slide-52.jpg",cap:"L4 · Slide 52 — out of the tropics"}], html:`
      <p class="lead"><b>3) Place of origin of many lineages — the "out of the tropics" hypothesis.</b> Niche conservatism leads to the accumulation of species locally: the tropics have <span class="kw">higher origination and lower extinction</span> rates than extratropical areas. Lineages tend to originate in the tropics and accumulate there, with only some spreading to temperate zones (Jablonski, Roy & Valentine 2006).</p>`}
   ],
   quiz:[
    {type:"mcq",q:"The latitudinal diversity gradient describes the pattern that species richness is highest:",img:"slides/L4/slide-49.jpg",opts:["At the poles","In temperate zones","Near the equator (tropics)","In deserts"],a:2,exp:"The tropics are much richer than temperate or arctic regions; richness declines toward the poles."},
    {type:"mcq",q:"Which is NOT one of the three reasons given for higher tropical diversity?",opts:["Higher energy input / productivity","Greater climatic stability over time","The 'out of the tropics' origination effect","Colder temperatures slowing metabolism"],a:3,exp:"The three reasons are energy/productivity, climatic stability, and the out-of-the-tropics effect. Colder temperatures is not one of them."},
    {type:"mcq",q:"The 'out of the tropics' hypothesis proposes that the tropics have:",opts:["Lower origination and higher extinction","Higher origination and lower extinction","No new species forming","Only immigrant species"],a:1,exp:"Tropics have higher origination and lower extinction; lineages originate and accumulate there, then some spread outward."},
    {type:"tf",q:"Repeated glaciation in temperate/polar regions reduced their accumulated diversity compared to the more stable tropics.",a:true,exp:"True — glaciation shifted distributions and caused extinctions, while stable tropics accumulated diversity."},
    {type:"short",q:"Give the three reasons the tropics have higher species richness than temperate areas.",model:"First, higher energy input in the tropics leads to higher plant productivity and biomass, so more resources allow more species to coexist. Second, greater climatic stability over time has allowed tropical diversity to accumulate, unlike glaciated regions whose biota was repeatedly disrupted. Third, the 'out of the tropics' hypothesis: the tropics have higher origination and lower extinction rates, so many lineages originate and accumulate there before some spread to temperate zones.",pts:["1. Higher energy/productivity → more coexistence","2. Climatic stability (no glaciation) → accumulation","3. Out of the tropics: high origination, low extinction"]}
   ]
  },

  {
   id:"L4T10", title:"Applied biogeography",
   sub:"Hotspots and island theory beyond islands (slides 53–55).",
   slides:[
    {h:"Biodiversity hotspots", imgs:[{src:"slides/L4/slide-53.jpg",cap:"L4 · Slide 53"}], html:`
      <p class="lead">Species richness and endemism together help us identify <span class="kw">biodiversity hotspots</span>: areas that are <b>exceptionally rich in species that are not found anywhere else</b> (high richness + high endemism). Myers et al. (2000) mapped ~25 global hotspots — conservation priorities because protecting them safeguards a disproportionate share of global diversity.</p>`},
    {h:"Island theory beyond oceanic islands", imgs:[{src:"slides/L4/slide-54.jpg",cap:"L4 · Slide 54 — sky islands"},{src:"slides/L4/slide-55.jpg",cap:"L4 · Slide 55 — study objectives"}], html:`
      <p class="lead">The <span class="kw">equilibrium theory of island biogeography extends to places beyond oceanic islands</span>:</p>
      <ul><li><b>Habitat islands</b> — e.g., the tops of mountains ("sky islands," like the example in northern Venezuela)</li>
      <li><b>Habitat fragmentation</b> — patches of forest surrounded by farmland behave like islands</li></ul>
      <p>Smaller, more isolated fragments lose species just as small, distant islands do. Slide 55 lists Lecture 4's objectives: define SDMs (inputs/outputs/limitation), richness & evenness, the species–area relationship, island biogeography, Simpson's index, endemism, α/β/γ diversity, and the three reasons for the latitudinal gradient.</p>`}
   ],
   quiz:[
    {type:"mcq",q:"Biodiversity hotspots are identified using:",opts:["Species richness only","Endemism only","Both high richness AND high endemism","Total land area"],a:2,exp:"Hotspots combine exceptional richness with high endemism — many species found nowhere else."},
    {type:"mcq",q:"The equilibrium theory of island biogeography also applies to:",opts:["Only true oceanic islands","Mountaintop 'sky islands' and fragmented habitat patches","Only the deep ocean","Only deserts"],a:1,exp:"Any isolated habitat patch — mountaintops, forest fragments — behaves like an island."},
    {type:"tf",q:"A small, isolated forest fragment is expected to lose species much like a small, distant island.",a:true,exp:"True — habitat fragmentation makes patches behave like islands: small + isolated → fewer species."},
    {type:"short",q:"What two measures identify a biodiversity hotspot, and why are hotspots conservation priorities?",model:"Biodiversity hotspots are identified using both high species richness and high endemism — they are exceptionally rich in species found nowhere else. They are conservation priorities because protecting these relatively small areas safeguards a disproportionately large share of the planet's unique biodiversity.",pts:["High species richness","High endemism (species found nowhere else)","Protecting them safeguards disproportionate diversity"]}
   ]
  }

 ]
}
];

/* ===================== TEXTBOOK EXTRAS (OpenStax Biology 2e) =====================
   Added as one extra topic per lecture. Content the exam may test that goes
   BEYOND the slides. Grounded in the assigned OpenStax sections. */
window.TEXTBOOK = {
 L1:{
  id:"L1TB", title:"📕 Textbook: Biogeography & abiotic factors",
  sub:"OpenStax Ch. 44.2 — concepts beyond the slides.",
  slides:[
   {h:"Biogeography & endemic species (44.2)", html:`
     <div class="callout">📕 <b>Textbook content</b> (OpenStax 44.2) — assigned reading that complements Lecture 1's slides.</div>
     <p class="lead"><span class="kw">Biogeography</span> = the study of the geographic distribution of living things <b>and the abiotic factors that affect their distribution</b>.</p>
     <p>An <span class="kw-2">endemic species</span> exists naturally only in a specific, usually restricted, geographic area. Textbook example: the <b>Venus flytrap</b> is endemic to North & South Carolina. (Your slides used the Galápagos tortoise and kangaroos.)</p>`},
   {h:"The major abiotic factors (44.2)", html:`
     <p class="lead">Five abiotic factors the textbook highlights as shaping where species live:</p>
     <table class="dt"><tr><th>Factor</th><th>Why it matters</th></tr>
     <tr><td><b>Energy / light</b></td><td>Photosynthesizers convert solar energy; light penetration limits aquatic life; understory plants adapt to shade</td></tr>
     <tr><td><b>Temperature</b></td><td>Few organisms survive below <b>0 °C or above 45 °C</b> (enzyme/metabolic limits); drives migration, hibernation, estivation</td></tr>
     <tr><td><b>Water</b></td><td>Required for all cellular processes; terrestrial species fight water loss, aquatic species face osmotic challenges</td></tr>
     <tr><td><b>Inorganic nutrients & soil</b></td><td><b>Nitrogen and phosphorus</b> are critical for plant distribution; soil structure & pH shape plant communities</td></tr>
     <tr><td><b>Wind & fire</b></td><td>Wind affects evaporation/heat loss; fire can trigger germination and release soil nutrients</td></tr></table>`}
  ],
  quiz:[
   {type:"mcq",q:"The textbook defines biogeography as the study of:",opts:["How species evolve new traits","The geographic distribution of living things and the abiotic factors affecting it","Energy flow through food webs","Population growth rates"],a:1,exp:"Biogeography = geographic distribution of organisms + the abiotic factors that affect distribution (OpenStax 44.2)."},
   {type:"mcq",q:"Most organisms cannot survive outside which approximate temperature range?",opts:["−40 °C to 0 °C","0 °C to 45 °C","45 °C to 100 °C","−10 °C to 10 °C"],a:1,exp:"Few organisms survive below 0 °C or above 45 °C due to metabolic/enzyme constraints."},
   {type:"mcq",q:"Which two inorganic nutrients are singled out as critical for plant distribution?",opts:["Sodium and chlorine","Nitrogen and phosphorus","Calcium and iron","Oxygen and carbon"],a:1,exp:"Nitrogen and phosphorus are the key limiting nutrients for plant distribution."},
   {type:"tf",q:"An endemic species is found naturally only in a specific, restricted geographic area.",a:true,exp:"True — e.g., the Venus flytrap is endemic to North and South Carolina."},
   {type:"short",q:"Name four abiotic factors that influence species distribution according to the textbook.",model:"The textbook highlights energy/light availability, temperature, water, inorganic nutrients and soil, and wind/fire as abiotic factors that influence where species can live. For example, temperature matters because most organisms cannot survive below 0 °C or above 45 °C.",pts:["Energy/light","Temperature","Water","Inorganic nutrients & soil (and wind/fire)"]}
  ]
 },
 L2:{
  id:"L2TB", title:"📕 Textbook: Demography details",
  sub:"OpenStax Ch. 45.1 — dispersion, density & population estimation.",
  slides:[
   {h:"Population size vs. density (45.1)", html:`
     <div class="callout">📕 <b>Textbook content</b> (OpenStax 45.1) — these terms aren't on the slides but are classic exam material.</div>
     <ul><li><span class="kw">Population size (N)</span> = the total number of individuals in a population.</li>
     <li><span class="kw">Population density</span> = the number of individuals within a specific area or volume.</li></ul>
     <p>Two populations can have the same size but very different densities depending on the area they occupy.</p>`},
   {h:"Species dispersion patterns (45.1)", html:`
     <p class="lead">How individuals are spaced within a population — three patterns:</p>
     <table class="dt"><tr><th>Pattern</th><th>Description</th><th>Example</th></tr>
     <tr><td><b>Clumped</b></td><td>Individuals grouped together (resources patchy or social behavior)</td><td>Oak seedlings near parent; elephant herds; fish schools</td></tr>
     <tr><td><b>Uniform</b></td><td>Evenly spaced; individuals inhibit nearby ones</td><td>Penguins defending territories; sage releasing toxic chemicals</td></tr>
     <tr><td><b>Random</b></td><td>No predictable pattern</td><td>Wind-dispersed dandelions germinating where they land</td></tr></table>
     <div class="callout key">Likely MCQ: match the example (territorial penguins → uniform; herds/schools → clumped; dandelions → random).</div>`},
   {h:"Estimating population size (45.1)", html:`
     <p class="lead">Two methods:</p>
     <ul><li><span class="kw">Quadrats</span> — mark off square sample areas, count organisms inside, scale up. Quadrat size depends on organism (≈1 m² for small plants, ≈100 m² for trees).</li>
     <li><span class="kw">Mark-and-recapture</span> — capture, mark, release; later recapture a sample.</li></ul>
     <div class="formula">N = (marked in 1st catch × total in 2nd catch) ÷ (marked recaptured in 2nd catch)</div>
     <p>Example: mark 80, then catch 100 of which 20 are marked → N = (80 × 100) / 20 = <b>400</b>.</p>`},
   {h:"Life tables & mortality (45.1)", html:`
     <p class="lead">A <span class="kw">life table</span> divides a population into age groups and shows survival, mortality, and life expectancy per interval — the data behind survivorship curves.</p>
     <div class="formula">mortality rate = (deaths ÷ survivors) × 1000</div>`}
  ],
  quiz:[
   {type:"mcq",q:"Territorial penguins spaced evenly apart, and sage plants that chemically inhibit neighbors, both show which dispersion pattern?",opts:["Clumped","Uniform","Random","Exponential"],a:1,exp:"Uniform dispersion — individuals inhibit nearby individuals, producing even spacing."},
   {type:"mcq",q:"Elephant herds and schools of fish are examples of which dispersion pattern?",opts:["Clumped","Uniform","Random","Logistic"],a:0,exp:"Clumped dispersion — individuals group together due to resources or social behavior."},
   {type:"mcq",q:"In a mark-recapture study you mark 80 animals, then catch 100 of which 20 are marked. Estimated N = ?",opts:["200","400","160","500"],a:1,exp:"N = (80 × 100) / 20 = 400."},
   {type:"mcq",q:"Population density differs from population size in that density:",opts:["Counts only juveniles","Is the number of individuals per unit area or volume","Ignores births and deaths","Is always larger than size"],a:1,exp:"Size (N) = total individuals; density = individuals per area/volume."},
   {type:"tf",q:"Wind-dispersed dandelions germinating wherever they land illustrate random dispersion.",a:true,exp:"True — no predictable spacing pattern = random dispersion."},
   {type:"short",q:"Describe the three dispersion patterns and give an example of each.",model:"Clumped dispersion is when individuals are grouped together, as in elephant herds or schools of fish, often due to patchy resources or social behavior. Uniform dispersion is even spacing caused by individuals inhibiting one another, as in territorial penguins or allelopathic sage. Random dispersion has no predictable pattern, as in wind-dispersed dandelions germinating wherever they land.",pts:["Clumped — grouped (herds/schools)","Uniform — even spacing (penguins/sage)","Random — no pattern (dandelions)"]},
   {type:"mcq",q:"You mark 50 fish, release them, then later catch 40 fish of which 10 are marked. Estimate the population size.",opts:["200","160","500","80"],a:0,exp:"Mark-recapture: N = (marked × total recaught) / marked recaught = (50 × 40) / 10 = 200."},
   {type:"mcq",q:"A 2 m² quadrat contains, on average, 8 daffodils. What is the estimated population density?",opts:["4 per m²","8 per m²","16 per m²","2 per m²"],a:0,exp:"Density = 8 individuals / 2 m² = 4 per m²."}
  ]
 },
 L3:{
  id:"L3TB", title:"📕 Textbook: Symbiosis & community",
  sub:"OpenStax Ch. 45.6 — framing beyond the slides.",
  slides:[
   {h:"Symbiosis — the umbrella term (45.6)", html:`
     <div class="callout">📕 <b>Textbook content</b> (OpenStax 45.6).</div>
     <p class="lead"><span class="kw">Symbiosis</span> = a close interaction between individuals of different species over an extended period that impacts the abundance and distribution of the associating populations. The textbook groups three relationships under symbiosis:</p>
     <table class="dt"><tr><th>Type</th><th>Effect</th></tr>
     <tr><td><b>Commensalism</b></td><td>One species benefits; the other is unaffected (+/0)</td></tr>
     <tr><td><b>Mutualism</b></td><td>Both species benefit (+/+)</td></tr>
     <tr><td><b>Parasitism</b></td><td>The parasite benefits at the expense of the host, which is harmed (+/−)</td></tr></table>`},
   {h:"Predator–prey population cycles (45.6)", html:`
     <p class="lead">Predator and prey populations fluctuate in linked <span class="kw">cycles</span>. In the classic snowshoe hare–lynx system the cycle is about <b>10 years</b>, with the <span class="kw-2">predator population lagging 1–2 years behind</span> the prey: rising hares feed a lynx increase; abundant lynx crash the hares; then lynx decline from starvation.</p>`},
   {h:"Keystone species (45.6)", html:`
     <p class="lead">A <span class="kw">keystone species</span> maintains the structure and biodiversity of its community; its <b>removal significantly alters species composition and reduces overall biodiversity</b> — an effect out of proportion to its abundance (e.g., the sea star <i>Pisaster</i>, or wolves on your slides).</p>`}
  ],
  quiz:[
   {type:"mcq",q:"Which term is the umbrella that includes commensalism, mutualism, and parasitism?",opts:["Predation","Symbiosis","Competition","Succession"],a:1,exp:"Symbiosis is the umbrella for close, long-term interspecies interactions — commensalism, mutualism, parasitism."},
   {type:"mcq",q:"In the snowshoe hare–lynx cycle, the predator (lynx) population typically:",opts:["Peaks before the prey","Lags 1–2 years behind the prey","Never changes","Is unrelated to prey numbers"],a:1,exp:"The predator population lags the prey by ~1–2 years in the ~10-year cycle."},
   {type:"mcq",q:"Removing a keystone species from a community typically:",opts:["Has no effect","Significantly alters species composition and reduces biodiversity","Increases biodiversity permanently","Only affects producers"],a:1,exp:"A keystone species has an outsized role; its removal restructures the community and lowers biodiversity."},
   {type:"tf",q:"Under the textbook's definition, parasitism is a form of symbiosis.",a:true,exp:"True — symbiosis includes commensalism, mutualism, and parasitism."},
   {type:"short",q:"Define symbiosis and list the three relationships it includes.",model:"Symbiosis is a close interaction between individuals of two different species over an extended period of time that affects the abundance and distribution of both populations. It includes commensalism (one benefits, the other is unaffected), mutualism (both benefit), and parasitism (the parasite benefits while the host is harmed).",pts:["Close, long-term interaction between two species","Commensalism (+/0)","Mutualism (+/+)","Parasitism (+/−)"]}
  ]
 },
 L4:{
  id:"L4TB", title:"📕 Textbook: The biodiversity crisis",
  sub:"OpenStax Ch. 47.1 — components of biodiversity.",
  slides:[
   {h:"Three components of biodiversity (47.1)", html:`
     <div class="callout">📕 <b>Textbook content</b> (OpenStax 47.1).</div>
     <p class="lead"><span class="kw">Biodiversity</span> is measured by both the number of species and their relative abundance. It has three components:</p>
     <table class="dt"><tr><th>Component</th><th>Meaning</th></tr>
     <tr><td><b>Genetic diversity</b></td><td>Variation in genomes within a species — the <b>raw material for evolution and adaptation</b></td></tr>
     <tr><td><b>Species diversity</b></td><td>The number of distinct species in a location/ecosystem (richness), plus their relative abundance (evenness)</td></tr>
     <tr><td><b>Ecosystem diversity</b></td><td>The number of different ecosystems in an area; losing it means losing species interactions and productivity</td></tr></table>`},
   {h:"Hotspots & the species–area relationship (47.1)", html:`
     <p class="lead">A <span class="kw">biodiversity hotspot</span> (Myers) is a region with a high number of endemic species. The original criteria: <b>≥ 1,500 endemic plant species</b> and <b>≥ 70% of its habitat already lost/disturbed</b>.</p>
     <p>The <span class="kw-2">species–area relationship</span> (more area → more species) is used to estimate extinction rates from habitat loss — though the textbook notes it may <b>overestimate</b> extinctions compared with the endemics-area relationship.</p>`}
  ],
  quiz:[
   {type:"mcq",q:"Which is NOT one of the three components of biodiversity?",opts:["Genetic diversity","Species diversity","Ecosystem diversity","Trophic diversity"],a:3,exp:"The three components are genetic, species, and ecosystem diversity."},
   {type:"mcq",q:"Genetic diversity is best described as:",opts:["The number of ecosystems","The raw material for evolution and adaptation","The total number of species","The evenness of abundances"],a:1,exp:"Genetic diversity (variation within genomes) is the raw material for evolution and adaptation."},
   {type:"mcq",q:"Under Myers' original criteria, a biodiversity hotspot needed at least:",opts:["100 endemic species and 10% habitat loss","1,500 endemic plant species and ~70% habitat already lost","5 endemic mammals only","No habitat loss at all"],a:1,exp:"Original hotspot criteria: ≥1,500 endemic plant species and ≥70% of habitat lost/disturbed."},
   {type:"tf",q:"The species–area relationship can be used to estimate extinction rates from habitat loss, but may overestimate them.",a:true,exp:"True — the textbook notes it may overestimate extinctions versus the endemics-area relationship."},
   {type:"short",q:"Name and briefly define the three components of biodiversity.",model:"Biodiversity has three components. Genetic diversity is the variation in genomes within a species and is the raw material for evolution. Species diversity is the number of distinct species in an area along with their relative abundance. Ecosystem diversity is the number of different ecosystems in a region, the loss of which removes species interactions and productivity.",pts:["Genetic diversity — variation within species (raw material for evolution)","Species diversity — number of species + relative abundance","Ecosystem diversity — number of different ecosystems"]}
  ]
 }
};

/* ===================== FLASHCARDS ===================== */
window.FLASHCARDS = {
 L1:[
  {f:"Ecology",b:"The study of the interactions between an organism and the abiotic (nonliving) and biotic (living) components of its environment."},
  {f:"Abiotic factors",b:"Nonliving environmental factors: temperature, water, sunlight, soil, inorganic nutrients."},
  {f:"Biotic factors",b:"Living environmental factors: predators, prey, competitors, mates, parasites."},
  {f:"Microevolution",b:"A change in allele (gene variant) frequencies in a population over time."},
  {f:"Macroevolution",b:"Descent with modification — large-scale change producing new species/groups over long timescales."},
  {f:"Why study ecology & evolution?",b:"To preserve biodiversity, identify biodiversity hotspots, understand species distributions, and explain the diversity of life on Earth."},
  {f:"Levels of organization (most → least specific)",b:"Organism → Population → Community → Ecosystem → Biosphere."},
  {f:"Organism",b:"A single living individual."},
  {f:"Population",b:"All the individuals of ONE species living in a specific area."},
  {f:"Community",b:"All populations of MANY different species in a given area (living things only)."},
  {f:"Ecosystem",b:"A community plus its abiotic (non-living) environment — soil, water, atmosphere."},
  {f:"Biosphere",b:"The collection of all ecosystems on Earth."},
  {f:"Population vs. community",b:"Population = one species; community = many species."},
  {f:"Community vs. ecosystem",b:"Community = living populations only; ecosystem = community + the abiotic environment."},
  {f:"Biome",b:"A community of organisms adapted to a characteristic set of environmental conditions; defined by climate (temperature & precipitation)."},
  {f:"Four factors that shape biomes",b:"Precipitation, temperature, seasonality, and topography (mountains)."},
  {f:"Rain shadow",b:"The dry leeward side of a mountain: humid air drops its rain rising over the range, leaving dried air on the far side."},
  {f:"Elevation ≈ latitude",b:"Climbing ~1,000 m is like traveling ~1,400 km (≈13°) toward the poles — it gets colder."},
  {f:"Tropical forest",b:"Hot, very wet and stable year-round; evergreen forest; highest biodiversity."},
  {f:"Temperate forest",b:"Defined seasons, winter freezing, even precipitation; deciduous forest."},
  {f:"Savanna",b:"Hot with an extensive dry season; sparse trees among abundant grasses."},
  {f:"Tundra",b:"Very cold, low precipitation, permanently frozen subsoil (permafrost); mosses/lichens/shrubs, no trees."},
  {f:"Desert — defining feature",b:"Lack of water (very low precipitation), NOT heat — deserts can be hot or cold. Cacti & succulents."},
  {f:"Species distribution",b:"The geographic area where individuals of a species are present."},
  {f:"Three factors determining distribution",b:"(1) Abiotic suitability, (2) biotic suitability, (3) dispersal ability."},
  {f:"BAM diagram",b:"A species' occupied range = the overlap of Biotic suitability, Abiotic suitability, and Movement (dispersal)."},
  {f:"Dispersal limitation",b:"A species can be absent from suitable habitat simply because it was never able to disperse there."},
  {f:"Marsupial distribution explained by…",b:"The break-up of the supercontinent Gondwana (a dispersal/geological-history explanation)."},
  {f:"Three niche concepts",b:"Grinnellian (abiotic/habitat), Eltonian (role/interactions), Hutchinsonian (n-dimensional hypervolume)."},
  {f:"Grinnellian niche",b:"Habitat-based: the abiotic conditions a species requires (Grinnell, 1917)."},
  {f:"Eltonian niche",b:"The species' role and interactions in its community — its 'place' (Elton, 1927)."},
  {f:"Hutchinsonian niche",b:"An n-dimensional hypervolume — all environmental conditions a species can tolerate (Hutchinson, 1957)."},
  {f:"Fundamental niche",b:"The full range of conditions a species could occupy in the ABSENCE of competition."},
  {f:"Realized niche",b:"The smaller portion of the fundamental niche actually occupied given competition; realized ⊆ fundamental."},
  {f:"Competitive exclusion (niche context)",b:"Complete competitors (total niche overlap) cannot coexist — one excludes the other."},
  {f:"Resource partitioning",b:"Competitors evolve to use resources in different ways/times/places so they can coexist (e.g., warblers in a tree)."},
  {f:"Endemic species",b:"A species found naturally in only one geographic area and nowhere else (e.g., Galápagos tortoise)."},
  {f:"Survivable temperature range (textbook)",b:"Most organisms cannot survive below 0 °C or above 45 °C."},
  {f:"Limiting nutrients for plants (textbook)",b:"Nitrogen and phosphorus."},
  {f:"Biogeography (textbook)",b:"The study of the geographic distribution of living things and the abiotic factors that affect it."}
 ],
 L2:[
  {f:"Demography",b:"The statistical study of population changes over time (births, deaths, migration)."},
  {f:"Age structure diagram",b:"Shows the proportion of a population in each age group; its shape predicts growth."},
  {f:"Broad-based age structure",b:"Many young individuals → birth rate > death rate → GROWING population."},
  {f:"Rectangular age structure",b:"Similar numbers across ages → births ≈ deaths → STABLE population."},
  {f:"Top-heavy age structure",b:"More old than young → birth rate < death rate → DECLINING population."},
  {f:"Survivorship curve",b:"A plot of how many individuals survive at each age."},
  {f:"Type I survivorship",b:"High survival until old age, then mortality rises (humans, elephants). K-selected."},
  {f:"Type II survivorship",b:"Constant mortality rate at all ages — a straight line (many birds)."},
  {f:"Type III survivorship",b:"Very high early mortality, few long-lived survivors (trees, fish, oysters). r-selected."},
  {f:"Exponential growth",b:"dN/dt = rN. J-shaped curve, density-independent, no limit."},
  {f:"N",b:"The number of individuals in the population."},
  {f:"r (intrinsic rate of increase)",b:"r = birth rate − death rate (b − d)."},
  {f:"Meaning of r's sign",b:"r > 0 grows, r = 0 stable, r < 0 declines."},
  {f:"The 'd' in dN/dt",b:"Means 'change in' (dN = change in number, dt = change in time) — NOT death rate."},
  {f:"Logistic growth",b:"dN/dt = rN((K−N)/K). S-shaped curve, density-dependent, levels off at K."},
  {f:"K (carrying capacity)",b:"The maximum population size the environment can sustain."},
  {f:"The (K−N)/K term",b:"Fraction of unused carrying capacity; → 0 as N → K, which halts growth."},
  {f:"Fastest logistic growth occurs at…",b:"N = K/2 (the steepest part of the S-curve)."},
  {f:"Positive r but N = K?",b:"No growth — the population is at carrying capacity, so dN/dt = 0."},
  {f:"Density-dependent regulation",b:"Biotic factors that worsen with crowding: competition, predation, disease, resource limitation."},
  {f:"Density-independent regulation",b:"Abiotic factors that act regardless of density: fire, flood, drought, volcanic eruption."},
  {f:"Intraspecific competition",b:"Competition among individuals of the SAME species."},
  {f:"Interspecific competition",b:"Competition between individuals of DIFFERENT species."},
  {f:"Life history strategy",b:"How an organism allocates its limited energy between growth and reproduction; involves trade-offs."},
  {f:"Reproductive output trade-off",b:"High output = many offspring with little care each; low output = few offspring, well cared for."},
  {f:"r-selected species",b:"Many offspring, little parental care, fast maturity, short life, Type III; disturbed/unpredictable habitats (insects, weeds, clownfish)."},
  {f:"K-selected species",b:"Few offspring, high parental care, slow maturity, long life, Type I; stable habitats near K (elephants, whales, humans)."},
  {f:"Population size (N) vs. density (textbook)",b:"Size = total individuals; density = individuals per unit area or volume."},
  {f:"Clumped dispersion (textbook)",b:"Individuals grouped together — elephant herds, fish schools, oak seedlings."},
  {f:"Uniform dispersion (textbook)",b:"Even spacing from individuals inhibiting neighbors — territorial penguins, allelopathic sage."},
  {f:"Random dispersion (textbook)",b:"No predictable pattern — wind-dispersed dandelions germinating where they land."},
  {f:"Quadrat method (textbook)",b:"Count organisms in sample squares and scale up to estimate population size."},
  {f:"Mark-recapture formula (textbook)",b:"N = (marked first × total recaught) ÷ (marked recaught). e.g. 80×100/20 = 400."},
  {f:"Life table (textbook)",b:"Divides a population into age groups showing survival, mortality, and life expectancy — the data behind survivorship curves."},
  {f:"Mortality rate formula (textbook)",b:"(deaths ÷ survivors) × 1000."}
 ],
 L3:[
  {f:"Community",b:"A group of interacting species that occur together at the same time and place."},
  {f:"Species interaction matrix",b:"Classifies interactions by their net effect (+, −, or 0) on each of the two species."},
  {f:"Mutualism",b:"+ / + — both species benefit."},
  {f:"Commensalism",b:"+ / 0 — one benefits, the other is unaffected (epiphyte on a tree)."},
  {f:"Parasitism",b:"+ / − — the parasite benefits at the host's expense (mistletoe)."},
  {f:"Predation",b:"+ / − — predator benefits, prey is harmed."},
  {f:"Competition",b:"− / − — both species harmed by sharing a limited resource."},
  {f:"Amensalism",b:"− / 0 — one is harmed, the other unaffected (rare)."},
  {f:"Neutralism",b:"0 / 0 — no net effect on either species."},
  {f:"Obligate mutualism",b:"Both species are entirely dependent on each other (clownfish & anemone)."},
  {f:"Facultative mutualism",b:"Both benefit, but can survive independently (oxpecker & rhino)."},
  {f:"Trophic level",b:"An organism's position in the food chain (producer, consumer…)."},
  {f:"Prey defense types",b:"Chemical (toxins), mechanical (structures), and behavioral (fleeing, schooling)."},
  {f:"Mechanical defenses",b:"Physical: thorns, urticating trichomes (stinging hairs), tough leaves."},
  {f:"Evolutionary arms race",b:"Predator and prey co-evolve in response to each other (milkweed toxin vs. monarch tolerance)."},
  {f:"Aposematism",b:"Bright warning coloration advertising that prey is toxic or unpalatable (poison dart frog)."},
  {f:"Batesian mimicry",b:"A HARMLESS species mimics a toxic one — a bluff (king snake mimics coral snake)."},
  {f:"Müllerian mimicry",b:"Multiple genuinely TOXIC species share a warning pattern, reinforcing avoidance (Heliconius, bees & wasps)."},
  {f:"Batesian vs. Müllerian",b:"Batesian = only the model is toxic (a bluff); Müllerian = all are toxic (honest, shared warning)."},
  {f:"Competitive exclusion principle",b:"Two species cannot coexist on the exact same niche — one outcompetes/excludes the other (Gause)."},
  {f:"Gause's experiment",b:"Two Paramecium species: alone each thrives; together one always excludes the other."},
  {f:"Trait (character) displacement",b:"Traits diverge between competitors to reduce overlap — Darwin's finch beak depths differ where species co-occur."},
  {f:"Interspecific vs. intraspecific",b:"Between different species (community ecology) vs. within one species (population ecology)."},
  {f:"Food chain",b:"A linear sequence of energy passing through trophic levels."},
  {f:"Food web",b:"A nonlinear, interconnected set of feeding relationships; more realistic and stable than a chain."},
  {f:"Producers",b:"Capture sunlight via photosynthesis; the base of the food chain."},
  {f:"Primary / secondary / tertiary consumers",b:"Herbivore → carnivore that eats herbivores → top carnivore."},
  {f:"Decomposers",b:"Break down dead organic matter and recycle nutrients."},
  {f:"10% rule",b:"Only ~10% of energy passes to the next trophic level; ~90% is lost (mostly as heat/metabolism)."},
  {f:"Energy pyramid example",b:"1,000 kcal (producers) → 100 → 10 → 1 kcal (tertiary)."},
  {f:"Biomagnification",b:"Fat-soluble toxins (mercury, PCBs, DDT) increase in concentration at each higher trophic level."},
  {f:"Disturbance",b:"An event that changes community structure/composition, leading to succession."},
  {f:"Succession",b:"The change in species composition of a community over time."},
  {f:"Primary succession",b:"Begins on bare substrate with NO soil and no prior community (lava, new island); slow; pioneers = lichens/mosses."},
  {f:"Secondary succession",b:"Begins where a community was removed but SOIL remains (fire, logging); faster."},
  {f:"Pioneer (early) species",b:"Small, fast-growing, high-dispersal, short-lived, poor competitors; r-selected (lichens, weeds)."},
  {f:"Late-succession species",b:"Large, slow-growing, low-dispersal, long-lived, strong competitors; K-selected (big trees)."},
  {f:"Intermediate Disturbance Hypothesis",b:"Species diversity is highest at intermediate disturbance, where early & late species co-occur."},
  {f:"IDH — why the extremes are low",b:"Low disturbance → competitive exclusion; high disturbance → only tough pioneers survive."},
  {f:"Old vs. modern view of succession",b:"Old: progress to a fixed, stable climax. Modern: disturbance is normal; communities are always in flux."},
  {f:"Keystone species",b:"Has an effect far larger than its abundance (wolf); removal restructures the community."},
  {f:"Foundation species",b:"Forms the base of the food web, often a primary producer (kelp)."},
  {f:"Symbiosis (textbook umbrella)",b:"A close, long-term interaction between two species; includes commensalism, mutualism, and parasitism."},
  {f:"Predator–prey lag (textbook)",b:"In the ~10-year hare–lynx cycle, the predator population lags the prey by 1–2 years."}
 ],
 L4:[
  {f:"Ecological biogeography",b:"How ecological processes influence the distribution of organisms in space and time."},
  {f:"Species Distribution Model (SDM)",b:"Predicts where a species can occur from the relationship between occurrence records and environmental conditions."},
  {f:"SDM inputs",b:"(1) Occurrence records + (2) environmental data."},
  {f:"SDM output",b:"A map of habitat suitability / probability of occurrence."},
  {f:"SDM limitation",b:"Predicts suitable habitat, not actual occupancy — biotic interactions & dispersal (BAM) can exclude a species."},
  {f:"Species richness",b:"The number of unique species in an area; every species counts equally."},
  {f:"Species–area relationship",b:"The larger the area surveyed, the more species are found."},
  {f:"Species–area assumptions",b:"That you can identify all species and that you found all the species present."},
  {f:"Equilibrium theory of island biogeography",b:"Island species richness = a balance between immigration (adds species) and extinction (removes species)."},
  {f:"Larger island → ?",b:"Lower extinction (more habitat, larger populations) → more species."},
  {f:"Closer island → ?",b:"Higher immigration (easier to reach) → more species."},
  {f:"Island richness extremes",b:"Most species = large + near; fewest = small + far."},
  {f:"Island size controls…",b:"Extinction rate."},
  {f:"Island distance controls…",b:"Immigration rate."},
  {f:"Island theory beyond oceans",b:"Applies to mountaintop 'sky islands' and fragmented habitat patches."},
  {f:"Species evenness",b:"How equally individuals are distributed among species."},
  {f:"High vs. low evenness",b:"High = similar abundances; low = one or a few species dominate."},
  {f:"Richness vs. evenness",b:"Richness counts species; evenness measures how equal their abundances are. They're independent."},
  {f:"Simpson's Diversity Index",b:"D = Σ pᵢ² — the sum of squared proportional abundances."},
  {f:"pᵢ",b:"The proportional abundance of species i (its count ÷ total individuals)."},
  {f:"Interpreting Simpson's D",b:"D close to 0 = HIGH diversity; D close to 1 = LOW diversity (dominance)."},
  {f:"Simpson's D — one species",b:"D = 1.0 — the lowest possible diversity."},
  {f:"Simpson's D — equal species",b:"Lowest D = most diverse (e.g., 4 equal species → D = 0.25)."},
  {f:"How to compute D",b:"Find each species' proportion, square it, and add them all up."},
  {f:"Endemism",b:"Species found naturally in only one geographic area and nowhere else."},
  {f:"Endemism examples",b:"Galápagos tortoise, kangaroos (Australia), Venus flytrap (the Carolinas)."},
  {f:"Alpha (α) diversity",b:"Within-site (local) richness — species at a single location."},
  {f:"Beta (β) diversity",b:"Between-site turnover — the species NOT shared between sites."},
  {f:"Gamma (γ) diversity",b:"Total regional richness across all sites combined."},
  {f:"α / β / γ memory hook",b:"Alpha = one Area, Beta = Between, Gamma = the Grand regional total."},
  {f:"Latitudinal diversity gradient",b:"Species richness is highest in the tropics and declines toward the poles."},
  {f:"Tropics diverse — reason 1",b:"Higher energy input → higher plant productivity (NPP) → more species can coexist."},
  {f:"Tropics diverse — reason 2",b:"Greater climatic stability over time (no glaciation) → diversity accumulated."},
  {f:"Tropics diverse — reason 3",b:"'Out of the tropics': higher origination and lower extinction rates than temperate zones."},
  {f:"Biodiversity hotspot",b:"An area with exceptionally high species richness AND high endemism (Myers et al. 2000)."},
  {f:"Hotspot criteria (textbook)",b:"Originally ≥1,500 endemic plant species and ≥70% of habitat already lost/disturbed."},
  {f:"Three components of biodiversity (textbook)",b:"Genetic diversity, species diversity, and ecosystem diversity."},
  {f:"Genetic diversity (textbook)",b:"Variation in genomes within a species — the raw material for evolution and adaptation."}
 ]
};

/* ===================== OBJECTIVE MASTERY (exam-day) =====================
   One topic per lecture. Deep teaching of the professor's "make sure you can…"
   objectives, one-by-one, followed by an exhaustive exam (several questions per
   objective, including calculations, applications, and trap questions).
   Merged in by the engine as the LAST topic of each lecture. */
window.OBJMASTERY = {

 L1:{
  id:"L1OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 1 objectives — taught in depth and tested exhaustively. Master every item here and you've met the professor's own success criteria.",
  slides:[
   {h:"Objective 1 — Levels of biological organization (most → least specific)", html:`
     <p class="lead">Ecology is studied as a <span class="kw">nested hierarchy</span>: each level fully contains the one below it and adds something new. From most to least specific:</p>
     <p style="font-size:16px"><b>Organism → Population → Community → Ecosystem → Biosphere</b></p>
     <table class="dt"><tr><th>Level</th><th>Precise definition</th><th>What's newly added</th></tr>
     <tr><td><b>Organism</b></td><td>A single living individual</td><td>—</td></tr>
     <tr><td><b>Population</b></td><td>All individuals of <b>one species</b> in an area</td><td>Many individuals of the same kind</td></tr>
     <tr><td><b>Community</b></td><td>All populations of <b>many species</b> in an area</td><td>Multiple interacting species</td></tr>
     <tr><td><b>Ecosystem</b></td><td>A community <b>+ its abiotic environment</b></td><td>The non-living world (soil, water, climate)</td></tr>
     <tr><td><b>Biosphere</b></td><td>All ecosystems on Earth combined</td><td>The entire planet's life + environments</td></tr></table>
     <div class="callout key"><b>The two traps that cost points:</b> (1) A <b>population is ONE species</b> — the moment you have multiple species, you've jumped to a community. (2) The <b>community → ecosystem</b> step is exactly where the <b>non-living environment is added</b>; a community alone is living-only.</div>
     <div class="callout tip"><b>Why "nested" matters:</b> any higher level implicitly includes all lower ones. A forest ecosystem contains its community, which contains its populations, which contain organisms — so a question about "what's missing" is usually testing the one new ingredient each level adds.</div>`},
   {h:"Objective 2 — Define a biome & the factors that influence it", html:`
     <p class="lead">A <span class="kw">biome</span> = a community of plants, animals, and other organisms <b>adapted to a characteristic set of environmental conditions</b>. Biomes are the terrestrial categories of the biosphere, and they are recognized chiefly by <span class="kw-2">climate — temperature and precipitation</span>.</p>
     <p><b>Four factors that shape which biome forms:</b></p>
     <ul>
       <li><b>Precipitation</b> — total annual rainfall.</li>
       <li><b>Temperature</b> — annual average; controls what can metabolize/survive.</li>
       <li><b>Seasonality</b> — how much temperature and rainfall swing across the year (a wet/dry season vs. steady).</li>
       <li><b>Topography</b> — mountains create variation: a <span class="kw">rain shadow</span> forms when humid air rises over a range, cools, and drops its rain on the <b>windward</b> side; the dried air descends the <b>leeward</b> side, creating a dry zone. The Andes are the example — wet east (Amazon moisture), dry west.</li>
     </ul>
     <div class="callout tip"><b>Elevation ≈ latitude:</b> climbing ~1,000 m is like traveling ~1,400 km (≈13°) toward the poles — air is thinner and holds heat poorly, so it gets colder. This is why a single tall mountain can stack several biomes.</div>
     <div class="callout key"><b>Causal chain to remember:</b> climate factors → <b>plant communities</b> (tropical/temperate/desert…) → <b>animal communities</b>. Plants come first because they're fixed by the physical environment; animals follow the vegetation.</div>`},
   {h:"Objective 3 — The five biomes: environmental variables + plant communities", html:`
     <table class="dt"><tr><th>Biome</th><th>Environmental conditions</th><th>Plant community</th></tr>
     <tr><td><b>Tropical forest</b></td><td>Hot, very wet, <b>stable</b> temperature/sunlight year-round; high consistent rainfall</td><td><b>Evergreen</b> forest; highest biodiversity on land</td></tr>
     <tr><td><b>Temperate forest</b></td><td><b>Defined seasons</b>; winters can freeze; precipitation fairly even year-round</td><td><b>Deciduous</b> forest (trees drop leaves)</td></tr>
     <tr><td><b>Savanna</b></td><td>Hot; precipitation like some tropics but with an <b>extensive dry season</b></td><td><b>Grasses + sparse, scattered trees</b></td></tr>
     <tr><td><b>Tundra</b></td><td>Very cold; low precipitation; <b>permafrost</b> (permanently frozen subsoil)</td><td>Low plants: <b>mosses, lichens, shrubs — no trees</b></td></tr>
     <tr><td><b>Desert</b></td><td><b>Extremely dry</b>; temperature can be hot OR cold</td><td><b>Cacti, succulents</b>, drought-tolerant plants</td></tr></table>
     <div class="callout key"><b>The #1 desert trap:</b> a desert is defined by <b>lack of water</b>, not by heat. Cold deserts exist (e.g., parts of central Asia). If an answer says "deserts are defined by high temperature," it's wrong.</div>
     <div class="callout tip"><b>Fast discriminators:</b> permafrost + no trees → tundra; deciduous + 4 seasons → temperate; evergreen + stable + wettest → tropical; grasses + dry season → savanna; driest → desert.</div>`},
   {h:"Objective 4 — Define species distribution", html:`
     <p class="lead"><span class="kw">Species distribution</span> = the <b>geographic area where individuals of a species are present</b>.</p>
     <p>It answers "where does this species actually live?" Ranges vary enormously: a cougar spans much of the Americas (broad), penguins are restricted to cold southern waters, and ring-tailed lemurs occur only on Madagascar (a narrow, <b>endemic</b> distribution). The next objective explains <i>why</i> a species ends up where it does.</p>`},
   {h:"Objective 5 — The three factors affecting distribution (the BAM diagram)", html:`
     <p class="lead">A species occupies a place only when <b>all three</b> of these are satisfied — the overlap is its <span class="kw">occupied distributional area</span> (Peterson et al. 2011):</p>
     <table class="dt"><tr><th>Letter</th><th>Factor</th><th>What must be true</th></tr>
     <tr><td><b>A</b></td><td><b>Abiotic</b> suitability</td><td>The climate and physical conditions are tolerable (right temperature, moisture, etc.)</td></tr>
     <tr><td><b>B</b></td><td><b>Biotic</b> suitability</td><td>Enough resources are present, and predators/competitors are not so intense that they exclude the species</td></tr>
     <tr><td><b>M</b></td><td><b>Movement</b> (dispersal)</td><td>The species (or its ancestor) was <b>able to disperse there</b> and didn't subsequently go extinct</td></tr></table>
     <div class="callout key"><b>The core insight (heavily tested):</b> <b>suitable habitat ≠ occupied habitat.</b> A site can have perfect climate (A ✓) yet be empty because a competitor excludes the species (B ✗) or it simply couldn't get there (M ✗). When a question describes a climatically fine but empty site, identify which of B or M failed.</div>
     <div class="callout tip"><b>Dispersal in action:</b> coconuts float and dandelion seeds blow on wind (good dispersal); a poor disperser can be absent from ideal habitat just because it never reached it. The global distribution of <b>marsupials</b> reflects the break-up of <b>Gondwana</b> — a deep dispersal/geological-history explanation, not current climate. This same BAM idea returns in Lecture 4 as the key limitation of SDMs.</div>`},
   {h:"Objective 6 — Compare the three niche concepts (incl. fundamental vs. realized)", html:`
     <p class="lead">All three describe how a species "fits" its environment, but each emphasizes something different:</p>
     <table class="dt"><tr><th>Concept</th><th>Who & emphasis</th><th>Captures</th></tr>
     <tr><td><b>Grinnellian</b></td><td>Grinnell (1917) — <b>habitat / abiotic</b></td><td>The environmental conditions that <b>restrict</b> a species (temperature, precipitation, seasonality). Example: a frog needs a moist habitat near water with suitable temperature.</td></tr>
     <tr><td><b>Eltonian</b></td><td>Elton (1927) — <b>role / interactions</b></td><td>The species' <b>functional role</b> in the community — what it eats, what eats it, how it interacts. Leads to competitive exclusion & resource partitioning.</td></tr>
     <tr><td><b>Hutchinsonian</b></td><td>Hutchinson (1957) — <b>n-dimensional hypervolume</b></td><td>All environmental variables (temperature, moisture, prey, predators…) as axes; the niche is the multidimensional volume of conditions a species tolerates.</td></tr></table>
     <p>Within the Hutchinsonian view:</p>
     <ul><li><span class="kw">Fundamental niche</span> — the <b>full</b> range of conditions a species could occupy <b>without competition</b> (its complete tolerances).</li>
     <li><span class="kw">Realized niche</span> — the <b>smaller portion it actually occupies</b> once competition, predation, and limited resources restrict it.</li></ul>
     <div class="callout key"><b>Always true:</b> the <b>realized niche is nested within (≤) the fundamental niche</b> — biotic interactions can only shrink it, never expand it. Connell's barnacles are the classic example: a species tolerates a broad zone (fundamental) but competition confines it to a narrow band (realized).</div>
     <div class="callout tip"><b>One-line memory:</b> Grinnell = the conditions a species <i>needs</i>; Elton = what a species <i>does</i>; Hutchinson = the full <i>multidimensional space</i> (split into fundamental vs. realized).</div>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] Which lists the levels from MOST to LEAST specific?",opts:["Biosphere → Ecosystem → Community → Population → Organism","Organism → Population → Community → Ecosystem → Biosphere","Organism → Community → Population → Ecosystem → Biosphere","Population → Organism → Community → Ecosystem → Biosphere"],a:1,exp:"Most→least specific: Organism, Population, Community, Ecosystem, Biosphere."},
   {type:"mcq",q:"[Obj 1] All the largemouth bass in one lake represent a:",opts:["Community","Population","Ecosystem","Biome"],a:1,exp:"One species in an area = a population. Multiple species would be a community."},
   {type:"mcq",q:"[Obj 1] Which level is the first to include the non-living environment?",opts:["Population","Community","Ecosystem","Organism"],a:2,exp:"An ecosystem = community + abiotic environment. A community is living-only."},
   {type:"tf",q:"[Obj 1] A community includes both the living organisms and the physical, non-living environment.",a:false,exp:"False — that's an ecosystem. A community is the living populations only."},
   {type:"short",q:"[Obj 1] List the five levels of organization from most to least specific and explain what new component the ecosystem level adds.",model:"From most to least specific: organism, population, community, ecosystem, biosphere. The ecosystem level adds the abiotic (non-living) environment — soil, water, atmosphere, and climate — to the community of living organisms.",pts:["Correct order organism → biosphere","Population = one species; community = many","Ecosystem adds the abiotic environment"]},
   {type:"mcq",q:"[Obj 2] Biomes are recognized primarily by:",opts:["Soil color and pH","Climate — temperature and precipitation","The largest predator present","Proximity to the equator alone"],a:1,exp:"Biomes are defined by climate (temperature + precipitation), which determines the dominant plant community."},
   {type:"mcq",q:"[Obj 2] A rain shadow's DRY zone forms on which side of a mountain range?",opts:["The windward side, where air rises","The leeward side, where dried air descends","The summit only","Both sides equally"],a:1,exp:"Air drops its rain rising on the windward side; the dried, descending air creates the dry rain shadow on the leeward side."},
   {type:"mcq",q:"[Obj 2] Which is NOT one of the four factors that shape biomes?",opts:["Precipitation","Seasonality","Topography","Predation pressure"],a:3,exp:"The four factors are precipitation, temperature, seasonality, and topography. Predation is a community interaction, not a biome-shaping climate factor."},
   {type:"tf",q:"[Obj 2] Ascending ~1,000 m in elevation produces a temperature change similar to traveling toward the poles.",a:true,exp:"True — ~1,000 m ≈ ~1,400 km (13°) poleward; both get colder, which is why one mountain can stack biomes."},
   {type:"short",q:"[Obj 2] Explain how topography (a mountain range) can create two different biomes on opposite sides, using the Andes.",model:"When warm, humid air blows toward a mountain range it rises, cools, and drops its moisture as precipitation on the windward side, producing a wet biome. The now-dry air descends the leeward side, creating a rain shadow and a dry biome. On the Andes, the eastern side is wet because it traps moisture from the Amazon, while the western side is dry — so different biomes form on either side of the same range.",pts:["Humid air rises, cools, rains on windward side","Dried air descends → rain shadow (dry) on leeward side","Andes: wet east (Amazon), dry west","Different biomes on the two sides"]},
   {type:"mcq",q:"[Obj 3] Permafrost, very low precipitation, and no trees describe the:",opts:["Savanna","Tundra","Temperate forest","Desert"],a:1,exp:"Tundra: very cold, low precipitation, permafrost; low plants (moss/lichen/shrub) and no trees."},
   {type:"mcq",q:"[Obj 3] The single defining feature of a desert is:",opts:["High temperature","Lack of water (very low precipitation)","Sandy soil","Absence of plants"],a:1,exp:"Deserts are defined by extreme dryness, not heat — cold deserts exist. Plants are drought-tolerant (cacti, succulents)."},
   {type:"mcq",q:"[Obj 3] Deciduous trees, four defined seasons, and winter freezing describe the:",opts:["Tropical forest","Temperate forest","Savanna","Tundra"],a:1,exp:"Temperate forest — seasonal, can freeze in winter, dominated by deciduous trees."},
   {type:"mcq",q:"[Obj 3] Which biome has the highest biodiversity and is characterized by evergreen forest under stable, hot, wet conditions?",opts:["Temperate forest","Savanna","Tropical forest","Tundra"],a:2,exp:"Tropical forest — stable warmth and high rainfall support evergreen forest and the greatest terrestrial biodiversity."},
   {type:"mcq",q:"[Obj 3] Abundant grasses with only scattered trees and a strong dry season indicate the:",opts:["Savanna","Desert","Temperate forest","Tundra"],a:0,exp:"Savanna — hot with an extensive dry season; grasses dominate with sparse trees."},
   {type:"short",q:"[Obj 3] State the environmental conditions and plant community that define the tropical forest, and one reason it has the highest biodiversity.",model:"Tropical forests have hot, very wet, and stable temperature and rainfall year-round, supporting evergreen forest. They have the highest biodiversity because the high energy input and climatic stability allow many species to coexist and accumulate over time.",pts:["Hot, very wet, stable year-round","Evergreen forest","Highest biodiversity","High energy/stability → many species coexist"]},
   {type:"mcq",q:"[Obj 4] Species distribution is defined as:",opts:["The number of species in an area","The geographic area where individuals of a species are present","The genetic variation within a species","The rate at which a species reproduces"],a:1,exp:"Species distribution = the geographic area where the species occurs."},
   {type:"tf",q:"[Obj 4] Two species with identical climate tolerances must always have identical distributions.",a:false,exp:"False — distribution also depends on biotic interactions and dispersal (BAM), so equally tolerant species can occupy very different areas."},
   {type:"mcq",q:"[Obj 5] In the BAM diagram, 'M' represents:",opts:["Mortality (death rate)","Movement — the ability to disperse to the area","Mutation","Mutualism"],a:1,exp:"M = Movement/dispersal; a species must be able to reach a site to occupy it."},
   {type:"mcq",q:"[Obj 5] A region has ideal climate for a lizard, but the lizard is absent because a competing lizard already dominates there. Which BAM circle is unmet?",opts:["Abiotic","Biotic","Movement","All three"],a:1,exp:"Climate (abiotic) is fine; the biotic condition fails because a competitor excludes it."},
   {type:"mcq",q:"[Obj 5] A plant is absent from a perfectly suitable island simply because its seeds could never reach it. This illustrates:",opts:["Competitive exclusion","Dispersal (movement) limitation","Aposematism","Density dependence"],a:1,exp:"Dispersal limitation — the 'M' of BAM; suitable habitat is unoccupied because the species couldn't get there."},
   {type:"mcq",q:"[Obj 5] The present-day distribution of marsupials is best explained by:",opts:["Recent human introduction","The break-up of the supercontinent Gondwana","Their intolerance of warm climates","A lack of predators in the tropics"],a:1,exp:"Marsupial distribution reflects continental drift (Gondwana's break-up) — a dispersal/geological-history explanation."},
   {type:"short",q:"[Obj 5] Name the three factors that determine where a species occurs and explain why 'suitable habitat' does not guarantee a species is present.",model:"A species occurs where the abiotic conditions are suitable, the biotic conditions are suitable (enough resources, tolerable competitors and predators), and it has been able to disperse there — the Abiotic, Biotic, and Movement circles of the BAM diagram. Suitable habitat does not guarantee presence because even with perfect climate (A), a competitor or predator can exclude the species (B fails) or it may never have been able to disperse to the site (M fails). The species occupies only where all three overlap.",pts:["Abiotic, Biotic, Movement (BAM)","Climate alone is not enough","Biotic exclusion can keep it out","Dispersal barriers can keep it out"]},
   {type:"mcq",q:"[Obj 6] The Grinnellian niche emphasizes:",opts:["The species' role and interactions","The abiotic/habitat conditions a species requires","An n-dimensional hypervolume","Dispersal ability"],a:1,exp:"Grinnell's niche is habitat-based, focused on abiotic conditions (temperature, precipitation)."},
   {type:"mcq",q:"[Obj 6] The Eltonian niche is best described as:",opts:["The temperature/moisture tolerances of a species","The species' functional role and interactions in its community","A multidimensional volume of all tolerances","The geographic range of a species"],a:1,exp:"Elton's niche = the 'place a species occupies in a community' — its role and interactions."},
   {type:"mcq",q:"[Obj 6] Defining the niche as an n-dimensional hypervolume of all environmental tolerances is the contribution of:",opts:["Grinnell","Elton","Hutchinson","Gause"],a:2,exp:"Hutchinson (1957) defined the niche as an n-dimensional hypervolume."},
   {type:"mcq",q:"[Obj 6] Which statement about fundamental vs. realized niche is correct?",opts:["The realized niche is larger than the fundamental niche","The realized niche is nested within the fundamental niche","They are always identical","Competition expands the realized niche"],a:1,exp:"The realized niche (occupied under competition) is always nested within the fundamental niche (full tolerances)."},
   {type:"tf",q:"[Obj 6] Removing all competitors from a species' environment could let it expand toward its fundamental niche.",a:true,exp:"True — competition shrinks the fundamental niche to the realized niche, so removing competitors can let the realized niche expand back toward the fundamental."},
   {type:"short",q:"[Obj 6] Compare the Grinnellian, Eltonian, and Hutchinsonian niche, and define the fundamental and realized niche.",model:"The Grinnellian niche (Grinnell, 1917) is habitat-based, emphasizing the abiotic conditions a species needs. The Eltonian niche (Elton, 1927) emphasizes the species' role and interactions in the community. The Hutchinsonian niche (Hutchinson, 1957) is an n-dimensional hypervolume representing all the environmental conditions a species can tolerate. Within it, the fundamental niche is the full range a species could occupy without competition, and the realized niche is the smaller portion it actually occupies once competition and other interactions are accounted for; the realized niche is always nested within the fundamental niche.",pts:["Grinnellian = abiotic/habitat","Eltonian = role/interactions","Hutchinsonian = n-dimensional hypervolume","Fundamental (no competition) vs realized (with competition); realized ⊆ fundamental"]}
  ]
 },

 L2:{
  id:"L2OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 2 objectives — taught in depth and tested exhaustively, including every calculation type.",
  slides:[
   {h:"Objective 1 — Read an age structure graph (growing / stable / declining)", html:`
     <p class="lead">An <span class="kw">age structure diagram</span> stacks the proportion of a population in each age band. Its <b>shape</b> forecasts the population's trajectory because it shows how many individuals are about to enter (vs. leave) the reproductive years.</p>
     <table class="dt"><tr><th>Shape</th><th>Meaning</th><th>Rates</th></tr>
     <tr><td><b>Broad base, narrow top</b></td><td>Growing — many young about to reproduce</td><td>birth &gt; death</td></tr>
     <tr><td><b>Rectangular / uniform</b></td><td>Stable — similar numbers across ages</td><td>birth ≈ death</td></tr>
     <tr><td><b>Narrow base, broad top</b></td><td>Declining — more old than young</td><td>birth &lt; death</td></tr></table>
     <div class="callout tip"><b>Reasoning, not memorizing:</b> the base = future reproducers. A wide base guarantees a surge of breeders soon (growth); a shrunken base means the next generation is smaller than the current one (decline).</div>`},
   {h:"Objective 2 — The three survivorship curves", html:`
     <p class="lead">A <span class="kw">survivorship curve</span> plots the number surviving (log scale) against age (% of max lifespan). Three shapes:</p>
     <table class="dt"><tr><th>Type</th><th>Pattern</th><th>Examples</th><th>Strategy</th></tr>
     <tr><td><b>Type I</b></td><td>High survival through youth/midlife; mortality concentrated in <b>old age</b></td><td>Humans, elephants</td><td>K-selected</td></tr>
     <tr><td><b>Type II</b></td><td><b>Constant</b> mortality at every age (straight diagonal line)</td><td>Many birds, lizards</td><td>—</td></tr>
     <tr><td><b>Type III</b></td><td><b>Massive early die-off</b>; the few survivors live long</td><td>Trees, fish, oysters</td><td>r-selected</td></tr></table>
     <div class="callout tip"><b>Hook:</b> Type <b>I</b> = die old (like life <b>I</b>nsurance pays late), Type <b>II</b> = steady straight line, Type <b>III</b> = steep early plunge (make millions of offspring, most die young).</div>`},
   {h:"Objective 3 — Growth-curve variables (r, b, d, K, N)", html:`
     <ul><li><b>N</b> = number of individuals (population size).</li>
     <li><b>b</b>, <b>d</b> = per-capita birth and death rates.</li>
     <li><b>r</b> = intrinsic rate of increase = <b>b − d</b>. r &gt; 0 grows, r = 0 stable, r &lt; 0 declines.</li>
     <li><b>K</b> = carrying capacity = the maximum population the environment can sustain.</li></ul>
     <div class="callout key"><b>Notation trap:</b> in dN/dt, the "d" means <b>"change in"</b> (dN = change in number, dt = change in time) — it is NOT the death rate. Death rate is the separate <b>d</b> inside r = b − d.</div>`},
   {h:"Objective 4 — Exponential & logistic growth + calculations", html:`
     <div class="formula">Exponential: dN/dt = rN          (J-curve, density-INDEPENDENT, unlimited)
Logistic:    dN/dt = rN((K−N)/K)  (S-curve, density-DEPENDENT, levels at K)</div>
     <p><b>Exponential</b> assumes unlimited resources: the bigger N gets, the faster it grows (accelerating J-curve). <b>Logistic</b> adds the <b>(K−N)/K</b> term — the fraction of carrying capacity still unused. When N is small that term ≈ 1 (near-exponential); as N → K it → 0, stopping growth.</p>
     <div class="callout key"><b>Three things examiners love:</b><br>• If given <b>b and d</b>, compute <b>r = b − d FIRST</b>, then plug in.<br>• Maximum logistic growth rate occurs at <b>N = K/2</b> (steepest point of the S-curve).<br>• If <b>N = K</b>, then (K−N)/K = 0, so dN/dt = 0 — <b>no growth even when r &gt; 0</b> (the population is at carrying capacity).</div>
     <p><b>Worked logistic example:</b> N = 800, K = 1000, r = 0.2 → dN/dt = 0.2 × 800 × ((1000−800)/1000) = 0.2 × 800 × 0.2 = <b>32</b>.</p>`},
   {h:"Objective 5 — Density-dependent vs. density-independent regulation", html:`
     <table class="dt"><tr><th>Type</th><th>Nature</th><th>Examples</th></tr>
     <tr><td><b>Density-dependent</b></td><td><b>Biotic</b>; impact <b>intensifies as the population gets crowded</b></td><td>Competition (intra- & interspecific), predation, disease, resource limitation</td></tr>
     <tr><td><b>Density-independent</b></td><td><b>Abiotic</b>; impact is the <b>same regardless of density</b></td><td>Fire, flood, drought, volcanic eruption, cold snap</td></tr></table>
     <div class="callout tip"><b>The one-question test:</b> "Would this hit harder in a crowded population?" Yes → density-dependent (disease spreads faster when packed). A wildfire kills the same fraction whether dense or sparse → density-independent.</div>`},
   {h:"Objective 6 — Intraspecific vs. interspecific competition", html:`
     <p><b>Intra</b>specific = competition <b>within the same species</b> (a population-ecology topic; a key density-dependent regulator). <b>Inter</b>specific = competition <b>between different species</b> (a community-ecology topic).</p>
     <div class="callout tip">Prefixes: <b>intra-</b> = inside/within; <b>inter-</b> = between. Same prefixes appear throughout biology.</div>`},
   {h:"Objective 7 — Life-history strategy & trade-offs", html:`
     <p class="lead">A <span class="kw">life-history strategy</span> is how a species allocates its <b>limited energy budget</b> among growth, survival, and reproduction. Because energy is finite, investing more in one area means less for the others — every strategy is a set of <b>trade-offs</b>.</p>
     <ul><li><b>Reproductive output vs. parental investment:</b> high output = many offspring, but little care each; low output = few offspring, heavily cared for.</li>
     <li><b>Timing:</b> reproducing early produces offspring sooner but can reduce growth and lifespan; delaying reproduction allows growth that can boost future reproductive success.</li></ul>`},
   {h:"Objective 8 — Define r-selected and K-selected species", html:`
     <p><b>r-selected</b> species are adapted to <b>unpredictable, frequently disturbed</b> environments and maximize their rate of increase (r): many offspring, little/no parental care, early maturity, short lifespan, Type III survivorship. Examples: insects, weeds, clownfish, sea turtles.</p>
     <p><b>K-selected</b> species are adapted to <b>stable</b> environments where the population sits near carrying capacity (K), with high intraspecific competition: few offspring, high parental care, late maturity, long lifespan, Type I survivorship. Examples: elephants, whales, humans.</p>`},
   {h:"Objective 9 — Contrast r- vs. K-selected species", html:`
     <table class="dt"><tr><th>Trait</th><th>r-selected</th><th>K-selected</th></tr>
     <tr><td>Offspring number</td><td>Many</td><td>Few</td></tr>
     <tr><td>Parental care</td><td>Little / none</td><td>High</td></tr>
     <tr><td>Maturity</td><td>Early / fast</td><td>Late / slow</td></tr>
     <tr><td>Lifespan</td><td>Short</td><td>Long</td></tr>
     <tr><td>Survivorship curve</td><td>Type III</td><td>Type I</td></tr>
     <tr><td>Population vs K</td><td>Well below K, fluctuates</td><td>Near K, stable</td></tr>
     <tr><td>Habitat</td><td>Disturbed, variable</td><td>Stable, predictable</td></tr></table>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] A population's age structure has a broad base and narrow top. It is:",opts:["Declining","Stable","Growing","Extinct"],a:2,exp:"Broad base = many young, birth > death → growing."},
   {type:"tf",q:"[Obj 1] A narrow-based, top-heavy age structure predicts a declining population.",a:true,exp:"True — few young entering reproduction means birth < death and the population shrinks."},
   {type:"mcq",q:"[Obj 1] A roughly rectangular age structure indicates:",opts:["Rapid growth","A stable population (births ≈ deaths)","A crash","Immigration only"],a:1,exp:"Even numbers across ages → births ≈ deaths → stable."},
   {type:"mcq",q:"[Obj 2] Massive early mortality with a few long-lived survivors is which curve?",opts:["Type I","Type II","Type III","Type IV"],a:2,exp:"Type III — trees, fish, oysters; r-selected."},
   {type:"mcq",q:"[Obj 2] A constant mortality rate at every age plots as which survivorship curve?",opts:["Type I","Type II","Type III","None"],a:1,exp:"Type II — a straight diagonal line; the chance of dying is equal at all ages (many birds)."},
   {type:"mcq",q:"[Obj 2] Humans and elephants exhibit which survivorship curve?",opts:["Type I","Type II","Type III","Type IV"],a:0,exp:"Type I — high survival until old age; K-selected."},
   {type:"short",q:"[Obj 2] Describe each of the three survivorship curves and give an example organism for each.",model:"Type I shows high survival through youth and middle age with mortality concentrated in old age, as in humans. Type II shows a constant mortality rate at all ages, plotting as a straight line, as in many birds. Type III shows very high early mortality with a few long-lived survivors, as in trees or fish.",pts:["Type I: late-age mortality (humans)","Type II: constant mortality (birds)","Type III: high early mortality (trees/fish)"]},
   {type:"mcq",q:"[Obj 3] In the growth equations, r equals:",opts:["Carrying capacity","Birth rate minus death rate (b − d)","Number of individuals","Resource availability"],a:1,exp:"r = intrinsic rate of increase = b − d."},
   {type:"mcq",q:"[Obj 3] In dN/dt, the leading 'd' refers to:",opts:["Death rate","'Change in' (dN = change in number, dt = change in time)","Density","Dispersal"],a:1,exp:"It means 'change in,' not death rate — a classic trap."},
   {type:"mcq",q:"[Obj 4] Exponential vs. logistic growth differ in that exponential is:",opts:["S-shaped and density-dependent","J-shaped and density-independent","Linear and capped at K","Always declining"],a:1,exp:"Exponential = J-shaped, density-independent, unlimited; logistic = S-shaped, density-dependent, capped at K."},
   {type:"mcq",q:"[Obj 4] A population of 120 grows exponentially with r = 0.25. What is dN/dt?",opts:["30","12","300","0.25"],a:0,exp:"dN/dt = rN = 0.25 × 120 = 30."},
   {type:"mcq",q:"[Obj 4] A population of 400 has b = 0.5 and d = 0.2 (exponential). What is dN/dt?",opts:["200","120","80","300"],a:1,exp:"r = b − d = 0.5 − 0.2 = 0.3; dN/dt = 0.3 × 400 = 120."},
   {type:"mcq",q:"[Obj 4] A population of 1,000 has r = −0.1. What is dN/dt, and what does it mean?",opts:["−100; the population is declining by 100","+100; growing by 100","0; stable","−10; declining by 10"],a:0,exp:"dN/dt = −0.1 × 1,000 = −100; negative r means the population declines (by 100 per time unit)."},
   {type:"mcq",q:"[Obj 4] Logistic: N = 100, K = 500, r = 0.4. What is dN/dt?",opts:["32","40","20","80"],a:0,exp:"dN/dt = 0.4 × 100 × ((500−100)/500) = 0.4 × 100 × 0.8 = 32."},
   {type:"mcq",q:"[Obj 4] A population has N = 400, K = 400, and r = 0.5. What is its growth rate?",opts:["200","100","0","80"],a:2,exp:"N = K, so (K−N)/K = 0 and dN/dt = 0 — no growth despite r > 0 (it's at carrying capacity)."},
   {type:"mcq",q:"[Obj 4] Logistic growth is fastest when N equals:",opts:["K","K/2","0","2K"],a:1,exp:"Growth peaks at N = K/2, the steepest part of the S-curve."},
   {type:"short",q:"[Obj 4] A population has N = 150, K = 300, r = 0.8. Calculate dN/dt and explain why this is the maximum possible growth rate for this population.",model:"dN/dt = rN((K−N)/K) = 0.8 × 150 × ((300−150)/300) = 0.8 × 150 × 0.5 = 60. This is the maximum because N = 150 = K/2, and logistic growth peaks at N = K/2, where the balance between population size and remaining capacity makes the absolute growth rate largest.",pts:["dN/dt = 0.8 × 150 × 0.5 = 60","N = 150 = K/2","Growth peaks at K/2","Steepest point of the S-curve"]},
   {type:"mcq",q:"[Obj 5] Which is a DENSITY-DEPENDENT regulating factor?",opts:["A hurricane","A wildfire","Disease spreading through a crowded population","A sudden frost"],a:2,exp:"Disease intensifies with crowding → density-dependent (biotic). The others are abiotic, density-independent."},
   {type:"mcq",q:"[Obj 5] A flood that drowns 50% of a population regardless of how dense it is, is:",opts:["Density-dependent","Density-independent","Intraspecific competition","Carrying capacity"],a:1,exp:"Abiotic and independent of density → density-independent regulation."},
   {type:"tf",q:"[Obj 5] Most density-dependent regulating factors are biotic (living).",a:true,exp:"True — competition, predation, disease, and resource limitation are biotic and intensify with crowding."},
   {type:"mcq",q:"[Obj 6] Competition between a hawk and an owl for the same mice is:",opts:["Intraspecific competition","Interspecific competition","Mutualism","Predation"],a:1,exp:"Between different species → interspecific competition."},
   {type:"tf",q:"[Obj 6] Intraspecific competition occurs among members of the same species.",a:true,exp:"True — intra- = within; it is a key density-dependent regulator."},
   {type:"mcq",q:"[Obj 7] The fundamental constraint behind all life-history trade-offs is that an organism has limited:",opts:["Number of genes","Energy to allocate among growth, survival, and reproduction","Predators","Geographic range"],a:1,exp:"A finite energy budget forces trade-offs — investing more in one area means less for others."},
   {type:"mcq",q:"[Obj 7] A species that produces thousands of eggs but provides no parental care is favoring:",opts:["Low output, high investment per offspring","High output, low investment per offspring","Delayed reproduction","Type I survivorship"],a:1,exp:"Many offspring with little care each = high reproductive output, low per-offspring investment (an r-strategy)."},
   {type:"mcq",q:"[Obj 8] Which set of traits defines an r-selected species?",opts:["Few offspring, high care, long life, Type I","Many offspring, little care, early maturity, short life, Type III","Lives near carrying capacity in stable habitats","Slow maturity with high parental investment"],a:1,exp:"r-selected = many offspring, little care, fast maturity, short life, Type III, disturbed habitats."},
   {type:"mcq",q:"[Obj 8] K-selected species are typically found in:",opts:["Frequently disturbed, unpredictable habitats","Stable habitats where the population stays near carrying capacity","Habitats with no competition","Only the deep ocean"],a:1,exp:"K-selected species live in stable environments near K, with high intraspecific competition."},
   {type:"mcq",q:"[Obj 9] Which survivorship curve pairs with K-selected species?",opts:["Type I","Type II","Type III","Type IV"],a:0,exp:"K-selected → Type I (high survival until old age). r-selected → Type III."},
   {type:"short",q:"[Obj 9] Contrast r- and K-selected species across offspring number, parental care, lifespan, survivorship curve, and habitat type.",model:"r-selected species produce many offspring with little or no parental care, mature early, have short lifespans, show Type III survivorship, and thrive in disturbed, unpredictable habitats. K-selected species produce few offspring with high parental care, mature slowly, have long lifespans, show Type I survivorship, and live in stable habitats near carrying capacity.",pts:["r: many offspring / K: few","r: little care / K: high care","r: short life, Type III / K: long life, Type I","r: disturbed habitat / K: stable, near K"]}
  ]
 },

 L3:{
  id:"L3OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 3 objectives — taught in depth and tested exhaustively across every interaction and concept.",
  slides:[
   {h:"Objective 1 — Define a community", html:`
     <p class="lead">A <span class="kw">community</span> = a group of <b>interacting species that occur together at the same time and place</b>. Community ecology studies the interactions <i>among</i> those species (vs. population ecology, which is one species).</p>`},
   {h:"Objective 2 — The six species interactions (by sign)", html:`
     <p class="lead">Score every interaction by its net effect on each of the two species (+ benefit, − harm, 0 no effect):</p>
     <table class="dt"><tr><th>Interaction</th><th>Signs</th><th>Example</th></tr>
     <tr><td><b>Mutualism</b></td><td>+ / +</td><td>Plant & pollinator; clownfish & anemone</td></tr>
     <tr><td><b>Commensalism</b></td><td>+ / 0</td><td>Epiphyte (orchid) on a tree; bird nest</td></tr>
     <tr><td><b>Predation / Parasitism</b></td><td>+ / −</td><td>Lion/zebra; mistletoe/host tree</td></tr>
     <tr><td><b>Competition</b></td><td>− / −</td><td>Two species, one limited resource</td></tr>
     <tr><td><b>Amensalism</b></td><td>− / 0</td><td>Algal bloom harming fish; rare</td></tr>
     <tr><td><b>Neutralism</b></td><td>0 / 0</td><td>Two unrelated, non-interacting species</td></tr></table>
     <div class="callout key"><b>Mutualism sub-types:</b> <b>obligate</b> = both partners are entirely dependent on each other (clownfish & anemone); <b>facultative</b> = both benefit but can survive alone (oxpecker & rhino).</div>`},
   {h:"Objective 3 — Predator/prey traits & the evolutionary arms race", html:`
     <p class="lead">Predation is a + / − interaction across <b>unequal trophic levels</b>, and predator and prey populations are tightly linked (the hare–lynx cycle, where the predator lags the prey by 1–2 years).</p>
     <p>Predation drives <span class="kw">prey defenses</span>:</p>
     <ul><li><b>Chemical</b> — toxins/irritants (skunk spray, stinging nettle, milkweed toxins).</li>
     <li><b>Mechanical</b> — physical structures (thorns, urticating trichomes/stinging hairs, tough leaves).</li>
     <li><b>Behavioral</b> — fleeing, schooling, playing dead.</li></ul>
     <div class="callout tip"><b>Evolutionary arms race:</b> predator and prey co-evolve — milkweed evolves stronger toxins while monarch caterpillars evolve tolerance (and even store the toxin), pressuring the plant to escalate again.</div>`},
   {h:"Objective 4 — Aposematism", html:`
     <p class="lead"><span class="kw">Aposematism</span> = the use of <b>bright colors and patterns to warn predators</b> that prey is toxic or unpalatable (poison dart frog, monarch butterfly). Because predators learn to avoid these signals, the signals become worth mimicking — which sets up mimicry (next objective).</p>`},
   {h:"Objective 5 — Batesian vs. Müllerian mimicry", html:`
     <table class="dt"><tr><th>Type</th><th>Who resembles whom</th><th>Honesty</th><th>Example</th></tr>
     <tr><td><b>Batesian</b></td><td>A <b>harmless</b> species mimics a <b>toxic</b> one</td><td>A bluff — only the model is dangerous</td><td>Harmless king snake mimics venomous coral snake</td></tr>
     <tr><td><b>Müllerian</b></td><td><b>Multiple toxic</b> species resemble <b>each other</b></td><td>Honest — all are genuinely harmful</td><td>Bees & wasps; Heliconius butterflies</td></tr></table>
     <div class="callout key"><b>Why Müllerian works:</b> because every species carrying the shared pattern is truly harmful, every predator encounter is a bad experience — so predators learn to avoid the pattern faster, and all participants benefit. Batesian mimics are 'parasites' on that learned avoidance.</div>`},
   {h:"Objective 6 — Competitive exclusion & trait (character) displacement", html:`
     <p class="lead"><span class="kw">Competitive exclusion principle</span> (Gause): two species cannot occupy the <b>exact same niche</b> — if they compete for identical resources, one outcompetes and excludes the other. Demonstrated with <i>Paramecium</i>: grown separately each thrives; grown together, one wins.</p>
     <p><span class="kw">Trait (character) displacement</span> = the evolutionary <b>divergence of a trait</b> between competitors where they co-occur, which reduces overlap and lets them coexist (a route to resource partitioning). Darwin's finches: <i>Geospiza fuliginosa</i>'s beak depth is smaller where it overlaps with the other two finch species. The chipmunk example shows elevation ranges barely overlapping where both species are present.</p>`},
   {h:"Objective 7 — Food chain vs. food web (+ the 10% rule)", html:`
     <p><b>Food chain</b> = a single linear sequence of who-eats-whom through trophic levels (producer → primary → secondary → tertiary consumer; decomposers recycle). <b>Food web</b> = a nonlinear, interconnected network where organisms feed at multiple levels — more realistic and more <b>stable</b> (redundant pathways mean losing one species needn't collapse it).</p>
     <div class="callout key"><b>The 10% rule:</b> only ~10% of the energy at one trophic level passes to the next; ~90% is lost (mostly as heat/metabolism). So a pyramid runs 1,000 → 100 → 10 → 1 kcal, which is why food chains are short (~4–5 levels) and top predators are few.</div>`},
   {h:"Objective 8 — Biomagnification", html:`
     <p class="lead"><span class="kw">Biomagnification</span> = the <b>increasing concentration of a toxic substance at each successive trophic level</b>. Fat-soluble toxins (mercury, PCBs, DDT) are stored in tissue and not excreted, so a predator that eats many contaminated prey accumulates their combined toxin load — top predators (tuna, orcas, eagles) carry the most.</p>
     <div class="callout tip">Don't confuse with the 10% rule: <b>energy decreases</b> up the chain, but <b>toxin concentration increases</b>.</div>`},
   {h:"Objective 9 — Disturbance, succession & the Intermediate Disturbance Hypothesis", html:`
     <p><b>Disturbance</b> = an event that changes community structure/composition, triggering <b>succession</b> = change in species composition over time.</p>
     <table class="dt"><tr><th></th><th>Primary succession</th><th>Secondary succession</th></tr>
     <tr><td>Start</td><td>Bare rock, <b>no soil</b> (lava, new island, glacial retreat)</td><td>Soil <b>remains</b> after a community is removed (fire, logging, landslide)</td></tr>
     <tr><td>Speed</td><td>Very slow; pioneers (lichens/mosses) must build soil</td><td>Faster</td></tr></table>
     <p>Stages: <b>early</b> (pioneer, r-selected: small, fast-growing, great dispersers, short-lived, poor competitors) → intermediate → <b>late</b> (K-selected: large, slow, long-lived, excellent competitors).</p>
     <div class="callout key"><b>Intermediate Disturbance Hypothesis:</b> diversity is <b>highest at intermediate disturbance</b>. At low disturbance, dominant competitors exclude others (competitive exclusion → low diversity); at high disturbance, only tough pioneers survive (low diversity); at intermediate levels, early- and late-successional species co-occur, maximizing diversity.</div>
     <p><b>Modern view:</b> disturbance is the norm and communities are always in flux — not progressing to a fixed, permanent "climax."</p>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] A community is best defined as:",opts:["All individuals of one species in an area","Interacting species that occur together at the same time and place","A single trophic level","An organism plus its abiotic environment"],a:1,exp:"Community = interacting species, same time and place (many species)."},
   {type:"mcq",q:"[Obj 2] Which interaction is + / 0?",opts:["Mutualism","Commensalism","Competition","Amensalism"],a:1,exp:"Commensalism: one benefits, the other unaffected (+/0)."},
   {type:"mcq",q:"[Obj 2] Both species are harmed in:",opts:["Mutualism","Commensalism","Competition","Predation"],a:2,exp:"Competition is − / − — both harmed by sharing a limited resource."},
   {type:"mcq",q:"[Obj 2] Amensalism has which sign structure?",opts:["+ / +","+ / 0","− / 0","− / −"],a:2,exp:"Amensalism = − / 0: one harmed, the other unaffected (rare)."},
   {type:"mcq",q:"[Obj 2] In OBLIGATE mutualism:",opts:["Both benefit but can live independently","Both are entirely dependent on each other","One benefits, one is unaffected","One is harmed"],a:1,exp:"Obligate = neither partner can survive without the other; facultative = beneficial but not required."},
   {type:"short",q:"[Obj 2] Give the sign notation for all six interactions: mutualism, commensalism, predation, competition, amensalism, neutralism.",model:"Mutualism is +/+, commensalism is +/0, predation (and parasitism) is +/−, competition is −/−, amensalism is −/0, and neutralism is 0/0.",pts:["Mutualism +/+","Commensalism +/0","Predation +/−","Competition −/−","Amensalism −/0; Neutralism 0/0"]},
   {type:"mcq",q:"[Obj 3] Milkweed evolving toxins while monarch caterpillars evolve tolerance is an example of:",opts:["Mutualism","An evolutionary arms race","Commensalism","Aposematism"],a:1,exp:"Reciprocal plant/herbivore (predator/prey) co-evolution = an arms race."},
   {type:"mcq",q:"[Obj 3] Thorns and stinging hairs (urticating trichomes) are which kind of prey defense?",opts:["Chemical","Mechanical","Behavioral","Mimicry"],a:1,exp:"Physical structures = mechanical defenses."},
   {type:"mcq",q:"[Obj 4] Aposematism is:",opts:["Camouflage that hides prey","Bright coloration warning that prey is toxic/unpalatable","A harmless species mimicking a toxic one","A mutualistic signal"],a:1,exp:"Aposematism = conspicuous warning coloration advertising toxicity."},
   {type:"mcq",q:"[Obj 5] A harmless hoverfly that looks like a stinging wasp is an example of:",opts:["Müllerian mimicry","Batesian mimicry","Aposematism only","Camouflage"],a:1,exp:"Batesian — a harmless species mimics a dangerous model (a bluff)."},
   {type:"mcq",q:"[Obj 5] Several genuinely toxic species converging on the same warning pattern is:",opts:["Batesian mimicry","Müllerian mimicry","Commensalism","Trait displacement"],a:1,exp:"Müllerian — multiple harmful species share a pattern, reinforcing avoidance."},
   {type:"tf",q:"[Obj 5] In Müllerian mimicry, all the look-alike species are genuinely toxic or harmful.",a:true,exp:"True — that's what makes it 'honest' and speeds predator learning, unlike the Batesian bluff."},
   {type:"short",q:"[Obj 5] Distinguish Batesian from Müllerian mimicry and explain why Müllerian mimicry benefits all participants.",model:"In Batesian mimicry a harmless species mimics a toxic or dangerous one — only the model is actually harmful, so it is a deceptive bluff. In Müllerian mimicry multiple genuinely toxic species resemble one another. Müllerian mimicry benefits all participants because every encounter a predator has with the shared warning pattern is genuinely unpleasant, so predators learn to avoid the pattern faster and each species suffers fewer attacks.",pts:["Batesian: harmless mimics toxic (bluff)","Müllerian: multiple toxic species share pattern","Müllerian = honest (all harmful)","Faster predator learning → all benefit"]},
   {type:"mcq",q:"[Obj 6] Gause's Paramecium experiment demonstrated:",opts:["Mutualism","The competitive exclusion principle","Biomagnification","Primary succession"],a:1,exp:"Grown together, one Paramecium species excluded the other — competitive exclusion."},
   {type:"mcq",q:"[Obj 6] Darwin's finches evolving different beak depths where two species co-occur is:",opts:["Aposematism","Trait (character) displacement","Commensalism","Biomagnification"],a:1,exp:"Trait displacement — traits diverge to reduce competition and enable coexistence."},
   {type:"tf",q:"[Obj 6] Trait displacement reduces competition and is associated with resource partitioning.",a:true,exp:"True — divergent traits let competitors use different resources, allowing coexistence."},
   {type:"mcq",q:"[Obj 7] Compared with a single food chain, a food web is:",opts:["Linear and fragile","Nonlinear, interconnected, and more stable","Restricted to one trophic level","Always shorter"],a:1,exp:"Food webs are nonlinear and interconnected, making them more realistic and stable."},
   {type:"mcq",q:"[Obj 7] If producers capture 20,000 kcal, about how much energy reaches the secondary consumers?",opts:["2,000 kcal","200 kcal","20 kcal","18,000 kcal"],a:1,exp:"~10% per step: 20,000 → 2,000 (primary) → 200 (secondary)."},
   {type:"mcq",q:"[Obj 7] Roughly what fraction of energy is LOST between trophic levels?",opts:["10%","50%","90%","99%"],a:2,exp:"~90% is lost (mostly as heat/metabolism); ~10% transfers up."},
   {type:"mcq",q:"[Obj 8] Biomagnification means that moving UP trophic levels, fat-soluble toxins:",opts:["Decrease in concentration","Stay constant","Increase in concentration","Are excreted faster"],a:2,exp:"Toxin concentration increases at each higher level; top predators carry the most."},
   {type:"tf",q:"[Obj 8] Energy and toxin concentration both increase as you move up the food chain.",a:false,exp:"False — energy DECREASES (10% rule) while toxin concentration INCREASES (biomagnification)."},
   {type:"mcq",q:"[Obj 9] Succession beginning on bare rock with no soil (e.g., a new volcanic island) is:",opts:["Secondary succession","Primary succession","A climax community","Biomagnification"],a:1,exp:"Primary succession starts with no soil and no prior community."},
   {type:"mcq",q:"[Obj 9] Early successional (pioneer) species tend to be:",opts:["K-selected: large, slow, long-lived","r-selected: small, fast-growing, good dispersers, short-lived","Top predators","Decomposers only"],a:1,exp:"Pioneers are r-selected; late-succession species are K-selected."},
   {type:"mcq",q:"[Obj 9] The Intermediate Disturbance Hypothesis predicts diversity is highest when disturbance is:",opts:["Absent","Very low","Intermediate","Extremely high"],a:2,exp:"At intermediate disturbance, early- and late-successional species co-occur, maximizing diversity."},
   {type:"short",q:"[Obj 9] Explain the Intermediate Disturbance Hypothesis, including why diversity is low at both very low and very high disturbance.",model:"The Intermediate Disturbance Hypothesis states that species diversity peaks at intermediate levels of disturbance. At very low disturbance, dominant competitors outcompete and exclude weaker species (competitive exclusion), lowering diversity. At very high disturbance, only hardy, disturbance-tolerant pioneer species can survive, also lowering diversity. At intermediate disturbance, species adapted to both early and late successional stages can coexist, which maximizes diversity.",pts:["Diversity peaks at intermediate disturbance","Low disturbance → competitive exclusion","High disturbance → only tough pioneers","Intermediate → early & late species coexist"]}
  ]
 },

 L4:{
  id:"L4OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 4 objectives — taught in depth and tested exhaustively, including every calculation type.",
  slides:[
   {h:"Objective 1 — SDMs: definition, inputs, outputs, limitation", html:`
     <p class="lead">A <span class="kw">Species Distribution Model (SDM)</span> predicts where a species is likely to occur by learning the relationship between known <b>occurrence records</b> and <b>environmental conditions</b> (using statistical or machine-learning methods).</p>
     <table class="dt"><tr><th>Inputs</th><th>Output</th><th>Limitation</th></tr>
     <tr><td>① Occurrence records<br>② Environmental data</td><td>A <b>habitat-suitability map</b> (probability of occurrence)</td><td>Predicts <b>suitable</b> habitat, not <b>actual</b> occupancy</td></tr></table>
     <div class="callout key"><b>The limitation is the BAM idea again:</b> an SDM mostly captures the <b>Abiotic</b> circle. Competition/predators (<b>Biotic</b>) and dispersal barriers (<b>Movement</b>) can keep a species out of climatically suitable areas — plus human activities. So a map can show 'suitable' habitat that the species doesn't actually occupy.</div>`},
   {h:"Objective 2 — Species richness vs. evenness (and identifying more of each)", html:`
     <p><b>Species richness</b> = the number of unique species in an area; every species counts equally regardless of abundance. <b>Species evenness</b> = how equally individuals are distributed among those species.</p>
     <div class="callout key"><b>They're independent.</b> Two communities can have the <b>same richness</b> but very different evenness. To compare evenness: the community whose abundances are <b>closer to equal</b> has higher evenness; if one species dominates (e.g., 97/1/1/1), evenness is low. To compare richness: just count species.</div>`},
   {h:"Objective 3 — Species–area relationship & its limitations", html:`
     <p class="lead">The <span class="kw">species–area relationship</span>: the more area you survey, the more species you find (a curve that rises steeply, then levels off).</p>
     <p><b>Assumptions / limitations:</b> (1) you can correctly <b>identify all the species</b>, and (2) you actually <b>found all the species</b> present. In reality, rare or cryptic species are missed, so counts can be off.</p>`},
   {h:"Objective 4 — Equilibrium theory of island biogeography (+ prediction)", html:`
     <p class="lead">Island species richness sits at an equilibrium set by two opposing rates:</p>
     <table class="dt"><tr><th>Factor</th><th>Controls</th><th>Effect</th></tr>
     <tr><td><b>Island size</b></td><td><b>Extinction</b> rate</td><td>Larger island → bigger populations, more habitat → <b>lower extinction</b> → more species</td></tr>
     <tr><td><b>Distance to mainland</b></td><td><b>Immigration</b> rate</td><td>Closer island → easier to reach → <b>higher immigration</b> → more species</td></tr></table>
     <div class="callout key"><b>Prediction grid:</b> <b>large + near = MOST species; small + far = FEWEST.</b> (Size → extinction; distance → immigration.) The theory also extends to 'habitat islands' — mountaintop 'sky islands' and fragments of forest in farmland — so a small, isolated forest fragment loses species like a small, distant island.</div>`},
   {h:"Objective 5 — Calculate & interpret Simpson's Diversity Index (D)", html:`
     <div class="formula">D = Σ pᵢ²    where pᵢ = (count of species i) ÷ (total individuals)</div>
     <p><b>Method:</b> (1) find each species' proportion pᵢ, (2) square each, (3) add them all up.</p>
     <div class="callout key"><b>Interpretation (memorize the direction!):</b> in this form, <b>D close to 0 = HIGH diversity</b>; <b>D close to 1 = LOW diversity</b> (one species dominates). It rises toward 1 as dominance increases.</div>
     <p><b>Worked example:</b> a community of 4 equally abundant species (25 each) → each pᵢ = 0.25 → D = 4 × 0.25² = 4 × 0.0625 = <b>0.25</b> (very diverse). A community that is 98/2 → 0.98² + 0.02² = <b>0.9608</b> (barely diverse).</p>`},
   {h:"Objective 6 — Endemism", html:`
     <p class="lead"><span class="kw">Endemism</span> = a species found <b>naturally in only one geographic area and nowhere else on Earth</b>. The area can be an island, mountain range, country, or isolated lake. Examples: Galápagos tortoise (Galápagos only), kangaroos (Australia), Venus flytrap (the Carolinas). Richness + endemism together are used to identify biodiversity hotspots.</p>`},
   {h:"Objective 7 — Alpha, beta & gamma diversity (+ calculation)", html:`
     <table class="dt"><tr><th>Symbol</th><th>Name</th><th>What it measures</th><th>Scale</th></tr>
     <tr><td><b>α</b></td><td>Alpha</td><td>Species richness <b>within a single site</b></td><td>Local</td></tr>
     <tr><td><b>β</b></td><td>Beta</td><td>Species <b>not shared</b> between sites (turnover)</td><td>Between sites</td></tr>
     <tr><td><b>γ</b></td><td>Gamma</td><td><b>Total</b> unique species across all sites</td><td>Regional</td></tr></table>
     <div class="callout tip"><b>How to calculate from two sites:</b> α = count each site separately; γ = the union (all unique species combined); β = the species that appear in only one site (the unshared ones).</div>
     <div class="callout key"><b>Worked example:</b> Site 1 = {a, b, c}; Site 2 = {c, d}. α = 3 and 2. γ = {a, b, c, d} = 4. β = unshared = a, b, d = 3 (only c is shared). Hook: <b>A</b>lpha = one <b>A</b>rea, <b>B</b>eta = <b>B</b>etween, <b>G</b>amma = <b>G</b>rand total.</div>`},
   {h:"Objective 8 — Three reasons the tropics have higher species richness", html:`
     <ol><li><b>Higher energy input → higher productivity.</b> More solar energy raises net primary productivity (NPP); more resources let more species coexist (and at higher abundances).</li>
     <li><b>Greater climatic stability over time.</b> The tropics escaped repeated glaciation, so diversity has had time to <b>accumulate</b> undisturbed — unlike temperate/polar regions whose biota was repeatedly displaced and went extinct.</li>
     <li><b>'Out of the tropics' hypothesis.</b> The tropics have <b>higher origination and lower extinction</b> rates; lineages tend to originate there (niche conservatism) and accumulate, with only some spreading poleward.</li></ol>
     <div class="callout tip">The latitudinal gradient: richness is highest at the equator and declines toward the poles. The wrong answer is usually "colder temperatures speed things up" — cold is not one of the three reasons.</div>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] The two inputs to a Species Distribution Model are:",opts:["Birth and death rates","Occurrence records and environmental data","Predators and prey","Richness and evenness"],a:1,exp:"SDMs relate occurrence records to environmental data."},
   {type:"mcq",q:"[Obj 1] An SDM's output is:",opts:["A phylogenetic tree","A habitat-suitability map (probability of occurrence)","A survivorship curve","A population growth rate"],a:1,exp:"The output is a map of habitat suitability."},
   {type:"mcq",q:"[Obj 1] The key limitation of SDMs is that they predict:",opts:["Actual occupancy precisely","Suitable habitat, which a species may not actually occupy","Only extinct ranges","Population size"],a:1,exp:"Suitable ≠ occupied — biotic interactions and dispersal (BAM) can exclude a species from suitable habitat."},
   {type:"short",q:"[Obj 1] Define an SDM, give its inputs and output, and explain its main limitation using the BAM idea.",model:"A species distribution model predicts where a species is likely to occur by relating occurrence records to environmental data, producing a habitat-suitability map. Its main limitation is that it predicts only potentially suitable habitat — essentially the abiotic (A) conditions — not actual occupancy. As the BAM diagram shows, a species also needs suitable biotic conditions (B) and the ability to disperse there (M), so competition, predation, or dispersal barriers can leave suitable habitat unoccupied.",pts:["Inputs: occurrence records + environmental data","Output: habitat-suitability map","Limitation: suitable ≠ occupied","Biotic (B) & dispersal (M) can exclude — captures mainly A"]},
   {type:"mcq",q:"[Obj 2] Community A = {97, 1, 1, 1}; Community B = {25, 25, 25, 25} (4 species each). Which is true?",opts:["A has higher richness","B has higher evenness","B has higher richness","A has higher evenness"],a:1,exp:"Richness is equal (4 species each). B's abundances are equal → higher evenness; A is dominated by one species → low evenness."},
   {type:"mcq",q:"[Obj 2] Species richness is:",opts:["How equally individuals are distributed among species","The number of unique species in an area","The total number of individuals","The biomass of the community"],a:1,exp:"Richness = count of unique species; evenness is the equality of abundances."},
   {type:"tf",q:"[Obj 2] Two communities with the same species richness must have the same evenness.",a:false,exp:"False — richness and evenness are independent; same richness can hide very different evenness."},
   {type:"mcq",q:"[Obj 3] The species–area relationship states that as surveyed area increases, species richness:",opts:["Decreases","Increases (then levels off)","Stays exactly constant","Drops to zero"],a:1,exp:"More area → more species, with the curve eventually leveling off."},
   {type:"mcq",q:"[Obj 3] Which is an assumption/limitation of the species–area relationship?",opts:["That climate is constant","That you can identify and have found all the species present","That all species are equally abundant","That area never changes"],a:1,exp:"It assumes complete detection and correct identification of species — rarely fully achievable."},
   {type:"mcq",q:"[Obj 4] Which island is predicted to have the MOST species?",opts:["Small, far from mainland","Large, far from mainland","Small, near mainland","Large, near mainland"],a:3,exp:"Large (low extinction) + near (high immigration) = most species."},
   {type:"mcq",q:"[Obj 4] Island SIZE primarily affects which rate?",opts:["Immigration","Extinction","Mutation","Birth"],a:1,exp:"Larger islands have lower extinction (bigger populations, more habitat). Distance affects immigration."},
   {type:"mcq",q:"[Obj 4] A small, isolated forest fragment surrounded by farmland is expected to:",opts:["Gain species over time","Lose species, like a small, distant island","Keep exactly the same species forever","Have the highest diversity possible"],a:1,exp:"Habitat fragments behave like islands: small area → higher extinction, isolation → lower immigration → fewer species."},
   {type:"short",q:"[Obj 4] Explain how island size and distance from the mainland each affect species richness, and predict which of two islands (large/far vs. small/near) is hard to rank.",model:"Island size affects extinction: larger islands support larger populations and more habitat, so extinction is lower and richness higher. Distance affects immigration: islands nearer the mainland receive more colonists, so immigration is higher and richness higher. A large/far island (low extinction but low immigration) versus a small/near island (high immigration but high extinction) is hard to rank because the two effects oppose each other; only large+near (highest) and small+far (lowest) are unambiguous.",pts:["Size → extinction (larger = lower)","Distance → immigration (closer = higher)","Large+near = most; small+far = fewest","Large/far vs small/near is ambiguous (opposing effects)"]},
   {type:"mcq",q:"[Obj 5] In Simpson's index D = Σpᵢ², which value indicates the MOST diverse community?",opts:["D = 1.0","D = 0.75","D = 0.50","D = 0.25"],a:3,exp:"Closer to 0 = higher diversity, so 0.25 is the most diverse here."},
   {type:"mcq",q:"[Obj 5] A community of 2 species with 80 and 20 individuals (100 total) has D = ?",opts:["0.68","0.32","0.50","0.20"],a:0,exp:"0.8² + 0.2² = 0.64 + 0.04 = 0.68 (near 1 → low diversity)."},
   {type:"mcq",q:"[Obj 5] A community of 3 species with 50, 30, 20 individuals (100 total) has D = ?",opts:["0.38","0.62","0.50","0.30"],a:0,exp:"0.5² + 0.3² + 0.2² = 0.25 + 0.09 + 0.04 = 0.38."},
   {type:"mcq",q:"[Obj 5] A high Simpson's D (near 1) tells you the community has:",opts:["High diversity","Low diversity (one species dominates)","Equal abundances","Many species"],a:1,exp:"D near 1 = low diversity (dominance); D near 0 = high diversity."},
   {type:"short",q:"[Obj 5] A field has 4 plant species with 40, 30, 20, and 10 individuals (100 total). Compute D = Σpᵢ² and interpret it.",model:"Proportions are 0.4, 0.3, 0.2, 0.1. Squaring and summing: 0.4² + 0.3² + 0.2² + 0.1² = 0.16 + 0.09 + 0.04 + 0.01 = 0.30. A D of 0.30 is close to 0, indicating fairly high diversity with reasonably even abundances across the four species.",pts:["pᵢ = 0.4, 0.3, 0.2, 0.1","Squares: 0.16 + 0.09 + 0.04 + 0.01","D = 0.30","Close to 0 → fairly high diversity"]},
   {type:"mcq",q:"[Obj 6] A species found naturally only in one geographic area and nowhere else is:",opts:["Cosmopolitan","Endemic","Invasive","A keystone species"],a:1,exp:"Endemic = restricted naturally to a single area (e.g., Galápagos tortoise)."},
   {type:"mcq",q:"[Obj 7] Site 1 = {a, b, c, d, e}; Site 2 = {d, e, f}. What is the gamma diversity?",opts:["5","6","8","3"],a:1,exp:"Gamma = all unique species across both = {a, b, c, d, e, f} = 6."},
   {type:"mcq",q:"[Obj 7] For Site 1 = {a, b, c, d, e} and Site 2 = {d, e, f}, what is the beta diversity (unshared species)?",opts:["2","3","4","6"],a:2,exp:"Shared: d, e. Not shared: a, b, c (Site 1) + f (Site 2) = 4."},
   {type:"mcq",q:"[Obj 7] Three forest plots have within-site richness of 7, 5, and 3. The mean alpha diversity is:",opts:["5","15","7","3"],a:0,exp:"Mean alpha = (7 + 5 + 3) / 3 = 5."},
   {type:"short",q:"[Obj 7] For Meadow = {a, b, c, d} and Pond = {c, d, e, f}, give the alpha diversity of each, plus beta and gamma.",model:"Alpha is the within-site richness: the Meadow has 4 species and the Pond has 4. Gamma is the total unique species across both: {a, b, c, d, e, f} = 6. Beta is the unshared species: a and b (Meadow only) plus e and f (Pond only) = 4, since c and d are shared.",pts:["Alpha: Meadow = 4, Pond = 4","Gamma = 6 (a–f)","Beta = 4 (a, b, e, f unshared)","c and d are shared"]},
   {type:"mcq",q:"[Obj 8] Which is NOT one of the three reasons the tropics are more species-rich?",opts:["Higher energy input / productivity","Greater climatic stability over time","Higher origination & lower extinction ('out of the tropics')","Colder temperatures speeding up evolution"],a:3,exp:"The three reasons are energy/productivity, climatic stability, and the out-of-the-tropics effect. Cold is not one of them."},
   {type:"mcq",q:"[Obj 8] The 'out of the tropics' hypothesis proposes that the tropics have:",opts:["Lower origination and higher extinction","Higher origination and lower extinction","No speciation","Only species that immigrated from the poles"],a:1,exp:"Higher origination + lower extinction → lineages originate and accumulate in the tropics, then some spread outward."},
   {type:"short",q:"[Obj 8] Give the three reasons the tropics have higher species richness than temperate regions, with a one-line explanation of each.",model:"First, higher energy input: more solar energy raises plant productivity, so more resources allow more species to coexist. Second, greater climatic stability over time: the tropics escaped repeated glaciation, so diversity accumulated undisturbed. Third, the 'out of the tropics' hypothesis: the tropics have higher origination and lower extinction rates, so lineages originate and accumulate there and only some spread toward the poles.",pts:["1. Higher energy/productivity → more coexistence","2. Climatic stability (no glaciation) → accumulation","3. Out of the tropics: high origination, low extinction"]}
  ]
 }

};

/* ===================== LECTURES 5 & 6 (Evolution unit) =====================
   Appended block: defines L5 (Microevolution) and L6 (Phylogenetics/Macroevolution)
   as full lectures and wires them into COURSE, FLASHCARDS, and OBJMASTERY. */
(function(){
 const c=(L,n)=>({src:"slides/"+L+"/slide-"+String(n).padStart(3,"0")+".jpg",cap:L+" · Slide "+n});
 const range=(L,a,b)=>{const o=[];for(let i=a;i<=b;i++)o.push(c(L,i));return o;};

 /* ---------------- LECTURE 5 — MICROEVOLUTION ---------------- */
 const L5={
  id:"L5", icon:"🧬", short:"L5 · Microevolution",
  title:"Lecture 5 — Microevolution",
  blurb:"Evolution, its history, natural selection, the five mechanisms of microevolution, and Hardy–Weinberg equilibrium.",
  objectives:[
   "Explain Lamarck's theory of 'use and disuse' and the importance of his ideas",
   "Understand how the Galápagos finches led Darwin to the theory of natural selection",
   "Understand natural selection and fitness",
   "Explain each of the five mechanisms of microevolution and identify which are random vs non-random",
   "Define what a null model is and why it is useful",
   "Understand Hardy–Weinberg equilibrium, its assumptions, and what it is used for",
   "Solve for a given allele or genotype frequency given information about a population"
  ],
  topics:[
   {id:"L5T1", title:"What is evolution?", sub:"Definitions and the centrality of evolution (slides 1–5).",
    slides:[
     {h:"Evolution: micro vs. macro", imgs:[c('L5',1),c('L5',2)], html:`
       <p class="lead"><span class="kw">Evolution</span> = change in species over time. Two scales:</p>
       <ul><li><b>Microevolution</b> = change in <span class="kw-2">allele frequencies</span> (this lecture).</li>
       <li><b>Macroevolution</b> = <span class="kw-2">descent with modification</span> (Lecture 6).</li></ul>`},
     {h:"\"Nothing in biology makes sense except in the light of evolution\"", imgs:[c('L5',3),c('L5',4),c('L5',5)], html:`
       <p class="lead">Evolution unifies all of biology. Shared ancestry explains <span class="kw">homologous structures</span> — e.g., the same limb bones (humerus, radius, ulna, carpals…) appear in the human arm, whale flipper, and bat wing, repurposed for different functions. Whale evolution (from land mammals) and plant family trees are read the same way.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Microevolution is defined as a change in:",opts:["Species over geologic eras","Allele frequencies in a population","The number of species on Earth","Body size only"],a:1,exp:"Microevolution = change in allele frequencies; macroevolution = descent with modification."},
     {type:"tf",q:"The matching limb bones of a human arm, whale flipper, and bat wing are evidence of shared ancestry (homology).",a:true,exp:"True — homologous structures inherited from a common ancestor, modified for different uses."},
     {type:"short",q:"Distinguish microevolution from macroevolution.",model:"Microevolution is change in allele frequencies within a population over time. Macroevolution is large-scale descent with modification, producing new species and higher groups over long timescales.",pts:["Micro = change in allele frequencies","Macro = descent with modification","Macro is large-scale/long-term"]}
    ]},
   {id:"L5T2", title:"History of evolutionary thought", sub:"From the Greeks to Darwin (slides 6–14).",
    slides:[
     {h:"Greeks & Linnaeus — fixity of species", imgs:[c('L5',6),c('L5',7),c('L5',8)], html:`
       <p class="lead"><b>Aristotle / Greek essentialism:</b> species have fixed "essences" (Scala Naturae, the "Great Chain of Being"); species are static and unchanging.</p>
       <p><b>Carl Linnaeus (1707–1778):</b> Swedish naturalist who built the hierarchical classification system, but still believed species were <b>fixed</b>. His nested categories revealed patterns of similarity — though no idea of change yet.</p>`},
     {h:"Lamarck — change over time (but the wrong mechanism)", imgs:[c('L5',9),c('L5',10),c('L5',12),c('L5',13)], html:`
       <p class="lead"><span class="kw">Jean-Baptiste Lamarck (1744–1829)</span> — first to propose species <b>change over time</b> to adapt. His (incorrect) mechanism:</p>
       <ol><li><b>Use and disuse:</b> structures used frequently become larger/stronger; unused ones deteriorate.</li>
       <li><b>Inheritance of acquired characteristics:</b> traits gained during an individual's lifetime are passed to offspring (e.g., a giraffe stretching its neck).</li></ol>
       <div class="callout key"><b>Lamarck was wrong</b> about the mechanism, but his idea that species change over time was <b>foundational</b> and very influential.</div>`},
     {h:"Darwin", imgs:[c('L5',14)], html:`
       <p class="lead"><span class="kw">Charles Darwin (1809–1882)</span> — the centerpiece of modern evolutionary theory: <b>descent with modification</b> — all species share a common ancestor and change over time.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Lamarck's theory included which idea?",opts:["Natural selection","Inheritance of acquired characteristics","Genetic drift","Descent with modification"],a:1,exp:"Lamarck proposed use/disuse and inheritance of acquired characteristics — the mechanism was wrong, but the idea of change was foundational."},
     {type:"mcq",q:"Aristotle and the Greeks viewed species as:",opts:["Constantly evolving","Fixed and unchanging (essentialism)","Products of natural selection","Random"],a:1,exp:"Greek essentialism held that species have fixed essences and are static."},
     {type:"tf",q:"Linnaeus created the hierarchical classification system but still believed species were fixed.",a:true,exp:"True — his nested categories showed similarity, but he did not propose species change."},
     {type:"short",q:"Explain Lamarck's 'use and disuse' and why his ideas were important despite being wrong.",model:"Lamarck's 'use and disuse' proposed that body structures used frequently grow larger or stronger while unused ones deteriorate, and that these acquired changes are passed to offspring. The mechanism is wrong, but Lamarck was the first to seriously propose that species change over time to adapt to their environment, which was a foundational and influential idea that paved the way for Darwin.",pts:["Use → larger/stronger; disuse → deteriorates","Acquired traits passed to offspring (wrong)","First to propose species change over time","Foundational/influential for later theory"]}
    ]},
   {id:"L5T3", title:"Darwin's finches, natural selection & fitness", sub:"From observation to mechanism (slides 15–30).",
    slides:[
     {h:"The Galápagos finches", imgs:[c('L5',15),c('L5',17),c('L5',18),c('L5',21)], html:`
       <p class="lead">On the 1835 <b>HMS Beagle</b> voyage Darwin reached the <b>Galápagos</b>. He noticed the finches were similar in size and color but had <span class="kw">different beak shapes and sizes</span>, related to <b>diet</b>: big strong beaks crack hard seeds; long slender beaks probe for insects/nectar.</p>
       <p>This suggested species could <b>change and adapt</b> to their environment. He proposed all finch species shared a <b>common ancestor</b>, and that beak traits aiding survival were passed to offspring — over time producing distinct species (adaptive radiation).</p>`},
     {h:"Natural selection", imgs:[c('L5',22),c('L5',24),c('L5',25)], html:`
       <p class="lead"><span class="kw">Natural selection</span> — a driving mechanism of evolution:</p>
       <ul><li>Individuals <b>vary</b> in traits.</li><li>Some traits give a <b>survival/reproductive advantage</b>.</li>
       <li>Those traits are <b>heritable</b> and passed to offspring.</li><li>They become more common over generations → evolution.</li></ul>
       <p>It affects two aspects of life: <b>survival</b> (living to reproductive age) and <b>reproduction</b> (passing on genes).</p>`},
     {h:"Fitness & the modern synthesis", imgs:[c('L5',26),c('L5',27)], html:`
       <p class="lead"><span class="kw">Fitness</span> = an individual's ability to survive and reproduce; measured by <b>reproductive success</b> (contribution of genes to the next generation). Individuals that leave more offspring contribute more genes.</p>
       <p><span class="kw-2">Modern synthesis</span> = the fusion of Darwin's natural selection with Mendelian genetics — a unified explanation of evolution based on changes in allele frequencies.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Darwin's finches differed mainly in their:",opts:["Color","Beak shape and size (related to diet)","Body size only","Song"],a:1,exp:"Beaks varied with diet — big beaks crack seeds, slender beaks probe for insects/nectar."},
     {type:"mcq",q:"In evolutionary biology, fitness is measured by:",opts:["Physical strength","Reproductive success","Lifespan only","Body size"],a:1,exp:"Fitness = ability to survive and reproduce, measured by reproductive success (genes passed on)."},
     {type:"mcq",q:"The modern synthesis combined natural selection with:",opts:["Lamarckism","Mendelian genetics","Essentialism","The fossil record only"],a:1,exp:"The modern synthesis fused Darwinian natural selection with Mendelian genetics."},
     {type:"tf",q:"For natural selection to cause evolution, the advantageous trait must be heritable.",a:true,exp:"True — only heritable variation can be passed to offspring and change allele frequencies."},
     {type:"short",q:"List the conditions required for natural selection to occur.",model:"Natural selection requires that individuals vary in their traits, that some traits provide an advantage in survival or reproduction, that those traits are heritable, and that they are therefore passed to offspring and become more common over generations.",pts:["Variation in traits","Some traits give survival/reproductive advantage","Traits are heritable","Passed on → become more common"]}
    ]},
   {id:"L5T4", title:"Key terms: gene, allele, genotype, phenotype", sub:"The vocabulary evolution acts on (slides 31–36).",
    slides:[
     {h:"Gene → allele → genotype → phenotype", imgs:[c('L5',31),c('L5',34),c('L5',35),c('L5',36)], html:`
       <table class="dt"><tr><th>Term</th><th>Definition</th></tr>
       <tr><td><b>Gene</b></td><td>A non-recombining DNA sequence providing instructions for a trait</td></tr>
       <tr><td><b>Allele</b></td><td>One variant of a gene; each individual carries two alleles (e.g., B and b)</td></tr>
       <tr><td><b>Genotype</b></td><td>The specific combination of alleles an organism carries (BB, Bb, bb)</td></tr>
       <tr><td><b>Phenotype</b></td><td>The observable trait of the organism</td></tr></table>
       <div class="callout key"><b>Phenotype = Genotype + Environment.</b> The same genotype can give different phenotypes in different environments (a tall-genotype plant is stunted where resources are scarce). But <b>evolution concerns genotypes</b> — i.e., heritable traits.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"The specific combination of alleles an organism carries is its:",opts:["Phenotype","Genotype","Gene","Allele"],a:1,exp:"Genotype = the combination of alleles (e.g., BB, Bb, bb). Phenotype = the observable trait."},
     {type:"mcq",q:"An organism's phenotype is the product of:",opts:["Genotype only","Environment only","Genotype + environment","Random chance"],a:2,exp:"Phenotype = genotype + environment; the same genotype can yield different phenotypes."},
     {type:"tf",q:"Evolution ultimately concerns heritable (genotypic) traits.",a:true,exp:"True — only heritable variation is passed on; environment-only changes are not evolution."},
     {type:"short",q:"Define gene, allele, genotype, and phenotype.",model:"A gene is a DNA sequence that provides instructions for a trait. An allele is one variant of a gene. A genotype is the specific combination of alleles an organism carries. A phenotype is the observable trait, which results from the genotype together with the environment.",pts:["Gene = DNA instructions for a trait","Allele = a variant of a gene","Genotype = combination of alleles","Phenotype = observable trait (genotype + environment)"]}
    ]},
   {id:"L5T5", title:"The five mechanisms of microevolution", sub:"Overview — what changes allele frequencies (slides 37–38).",
    slides:[
     {h:"The five mechanisms", imgs:[c('L5',37),c('L5',38)], html:`
       <p class="lead">When any of these occur, <span class="kw">allele frequencies are changing</span> (microevolution):</p>
       <ol><li><b>Mutation</b> — random</li><li><b>Genetic drift</b> — random</li>
       <li><b>Gene flow</b> — primarily non-random</li><li><b>Non-random mating</b> — non-random</li>
       <li><b>Natural selection</b> — non-random</li></ol>
       <div class="callout key"><b>Random vs non-random (test favorite):</b> the two <b>random</b> mechanisms are <b>mutation</b> and <b>genetic drift</b>. The non-random ones are gene flow, non-random mating, and natural selection.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Which two mechanisms of microevolution are RANDOM?",opts:["Natural selection and gene flow","Mutation and genetic drift","Non-random mating and selection","Gene flow and mutation"],a:1,exp:"Mutation and genetic drift are random; gene flow, non-random mating, and natural selection are non-random."},
     {type:"mcq",q:"Which is NOT one of the five mechanisms of microevolution?",opts:["Mutation","Genetic drift","Photosynthesis","Gene flow"],a:2,exp:"The five are mutation, genetic drift, gene flow, non-random mating, and natural selection."},
     {type:"short",q:"List the five mechanisms of microevolution and label each random or non-random.",model:"Mutation (random), genetic drift (random), gene flow (primarily non-random), non-random mating (non-random), and natural selection (non-random). When any occur, allele frequencies change.",pts:["Mutation — random","Genetic drift — random","Gene flow — non-random","Non-random mating & natural selection — non-random"]}
    ]},
   {id:"L5T6", title:"Mutation", sub:"The raw material of evolution (slides 39–42).",
    slides:[
     {h:"Mutation", imgs:[c('L5',39),c('L5',42)], html:`
       <p class="lead"><span class="kw">Mutation</span> = <b>random</b> changes in DNA — base-pair substitutions, insertions, deletions, duplications. Mutations are the <b>raw material of evolution</b> (the ultimate source of all new alleles).</p>
       <ul><li>Most mutations are <b>neutral</b>, some are detrimental, and a few are beneficial.</li>
       <li>To matter for evolution they must be <b>heritable</b>; they change allele frequencies and set the stage for natural selection.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"Mutations are best described as the ____ of evolution.",opts:["end product","raw material","selective force","carrying capacity"],a:1,exp:"Mutation is the raw material — the ultimate source of new alleles."},
     {type:"mcq",q:"Most mutations are:",opts:["Beneficial","Neutral","Always lethal","Non-heritable"],a:1,exp:"Most are neutral; some detrimental, a few beneficial."},
     {type:"tf",q:"Mutation is a random mechanism of microevolution.",a:true,exp:"True — mutations occur randomly with respect to an organism's needs."},
     {type:"short",q:"Why is mutation considered the raw material of evolution?",model:"Mutation is the only mechanism that creates entirely new alleles by randomly changing DNA. The other mechanisms only shuffle or change the frequencies of existing variation, so mutation is the ultimate source of the genetic variation on which evolution acts.",pts:["Creates new alleles (new variation)","Random changes in DNA","Other mechanisms only act on existing variation","Sets the stage for selection"]}
    ]},
   {id:"L5T7", title:"Genetic drift (incl. bottleneck & founder effects)", sub:"Random change, strongest in small populations (slides 43–60).",
    slides:[
     {h:"Genetic drift", imgs:[c('L5',43),c('L5',44),c('L5',46)], html:`
       <p class="lead"><span class="kw">Genetic drift</span> = the <b>random fluctuation</b> in allele frequencies in a population; a chance event that randomly subsets individuals. It happens in all real (finite) populations.</p>
       <div class="callout key"><b>Population size matters:</b> drift has a <b>bigger impact in small populations</b> — random chance matters more when there are fewer individuals. Alleles can drift to <b>fixation</b> (frequency = 1) or be <b>lost</b> (frequency = 0).</div>`},
     {h:"Bottleneck effect", imgs:[c('L5',57),c('L5',58)], html:`
       <p class="lead"><span class="kw">Bottleneck effect</span> — a special case of drift. A natural disaster (earthquake, etc.) kills a <b>random</b> large portion of a population; the survivors are a random subset, so their allele frequencies differ from the original.</p>
       <p><b>Northern elephant seals</b> were hunted to ~20 individuals; though the population recovered, it has very little genetic (allele) diversity.</p>`},
     {h:"Founder effect", imgs:[c('L5',59),c('L5',60)], html:`
       <p class="lead"><span class="kw">Founder effect</span> — another special case. A <b>small group breaks off</b> from a larger population and starts a new one; the new population's genetic variation reflects only its few founders. Both bottleneck and founder effects produce a <b>random subset</b> of the original population's alleles.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Genetic drift has the greatest effect in:",opts:["Large populations","Small populations","Populations at carrying capacity","Populations with high gene flow"],a:1,exp:"Random chance matters more when there are fewer individuals, so drift is stronger in small populations."},
     {type:"mcq",q:"Northern elephant seals reduced to ~20 individuals, now with low genetic diversity, illustrate the:",opts:["Founder effect","Bottleneck effect","Gene flow","Sexual selection"],a:1,exp:"A disaster/hunting killed most of the population at random — the bottleneck effect."},
     {type:"mcq",q:"A small group leaving to start a new population, carrying only a subset of alleles, is the:",opts:["Bottleneck effect","Founder effect","Natural selection","Mutation"],a:1,exp:"Founder effect — a few founders start a new population with limited variation."},
     {type:"tf",q:"Genetic drift is a random mechanism that can drive an allele to fixation or loss.",a:true,exp:"True — drift randomly changes frequencies; an allele can reach 1 (fixed) or 0 (lost)."},
     {type:"short",q:"Compare the bottleneck effect and the founder effect.",model:"Both are special cases of genetic drift that leave a small, random subset of the original population's alleles. In the bottleneck effect, a disaster kills a large, random portion of an existing population, leaving few survivors. In the founder effect, a small group breaks away from the original population to colonize a new area. Both reduce genetic diversity.",pts:["Both = genetic drift, random subset","Bottleneck = disaster kills most of a population","Founder = small group starts a new population","Both reduce genetic diversity"]}
    ]},
   {id:"L5T8", title:"Gene flow", sub:"Movement of genes between populations (slides 61–62).",
    slides:[
     {h:"Gene flow", imgs:[c('L5',61),c('L5',62)], html:`
       <p class="lead"><span class="kw">Gene flow</span> = the movement of genes (within individuals) from one population to another (migration, pollen transfer).</p>
       <ul><li>Introduces <b>new genetic material</b> into a population and can change allele frequencies.</li>
       <li>Makes populations <b>more genetically similar</b> to each other.</li>
       <li>Gene flow is <b>primarily non-random</b>.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"Gene flow tends to make two populations:",opts:["More genetically different","More genetically similar","Reproductively isolated","Smaller"],a:1,exp:"By exchanging alleles, gene flow homogenizes populations — makes them more similar."},
     {type:"mcq",q:"Examples of gene flow include:",opts:["Mutation and drift","Migration and pollen transfer","Bottlenecks","Self-pollination"],a:1,exp:"Migration of individuals and pollen transfer move genes between populations."},
     {type:"tf",q:"Gene flow can introduce new alleles into a population.",a:true,exp:"True — incoming individuals/pollen bring genetic material the population may not have had."},
     {type:"short",q:"What is gene flow and how does it affect allele frequencies?",model:"Gene flow is the movement of genes from one population to another, for example through migration or pollen transfer. It introduces new genetic material into the receiving population, changing its allele frequencies, and it makes connected populations more genetically similar to one another.",pts:["Movement of genes between populations","Migration / pollen transfer","Introduces new alleles, changes frequencies","Makes populations more similar"]}
    ]},
   {id:"L5T9", title:"Non-random mating", sub:"Sexual selection and inbreeding (slides 63–69).",
    slides:[
     {h:"Non-random mating", imgs:[c('L5',64),c('L5',67),c('L5',68)], html:`
       <p class="lead"><span class="kw">Non-random mating</span> = individuals choose mates based on specific traits, relatedness, or proximity rather than mating randomly. Two important forms:</p>
       <ul><li><b>Sexual selection</b> — individuals choose mates based on traits that signal fitness (e.g., the peacock's tail); shifts allele frequencies toward the "desirable" trait.</li>
       <li><b>Inbreeding</b> — mating between related individuals; increases the chance offspring inherit the same allele from both parents (more homozygosity). Common in self-pollinating plants.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"A peacock's elaborate tail evolving because peahens prefer it is an example of:",opts:["Genetic drift","Sexual selection","Gene flow","Mutation"],a:1,exp:"Sexual selection — mate choice based on a fitness-signaling trait."},
     {type:"mcq",q:"Inbreeding increases the proportion of:",opts:["Heterozygous individuals","Homozygous individuals","New mutations","Migrants"],a:1,exp:"Mating between relatives raises the chance of inheriting the same allele from both parents — more homozygosity."},
     {type:"tf",q:"Non-random mating is a non-random mechanism of microevolution.",a:true,exp:"True — by definition mate choice is non-random, shifting genotype/allele frequencies."},
     {type:"short",q:"Describe the two forms of non-random mating discussed.",model:"Sexual selection is when individuals choose mates based on traits that signal fitness, such as a peacock's tail, which increases the frequency of alleles for the preferred trait. Inbreeding is mating between related individuals, which increases the chance that offspring are homozygous and is common in self-pollinating plants.",pts:["Sexual selection = mate choice on fitness-signaling traits","Example: peacock tail","Inbreeding = mating between relatives","Increases homozygosity (e.g., self-pollination)"]}
    ]},
   {id:"L5T10", title:"Natural selection (mechanism) & modes of selection", sub:"Non-random; directional, stabilizing, disruptive (slides 70–79).",
    slides:[
     {h:"Natural selection as a mechanism", imgs:[c('L5',70),c('L5',71),c('L5',73)], html:`
       <p class="lead"><span class="kw">Natural selection</span> = differential survival and reproduction due to heritable differences in phenotype. It <b>favors alleles that improve fitness</b>, leading to adaptation.</p>
       <div class="callout key">Natural selection is <b>NOT a random process</b> — it removes harmful alleles and increases beneficial ones, producing adaptation to the environment. Antibiotic resistance is a real example: antibiotics kill susceptible bacteria, leaving resistant ones to multiply.</div>`},
     {h:"Three modes of selection", imgs:[c('L5',74),c('L5',75),c('L5',76),c('L5',79)], html:`
       <table class="dt"><tr><th>Mode</th><th>What it favors</th><th>Example</th></tr>
       <tr><td><b>Directional</b></td><td>One <b>extreme</b> of the trait range</td><td>Dark moths increasing as bark darkens</td></tr>
       <tr><td><b>Stabilizing</b></td><td>The <b>average/intermediate</b> phenotype; selects against extremes</td><td>Bird egg clutch size (too few/too many both fail)</td></tr>
       <tr><td><b>Disruptive</b></td><td><b>Both extremes</b>; selects against intermediates</td><td>Mouse coat color on lava (dark) vs sand (light)</td></tr></table>`}
    ],
    quiz:[
     {type:"mcq",q:"Unlike the other mechanisms, natural selection is:",opts:["Completely random","Not a random process","Only found in plants","Unable to cause adaptation"],a:1,exp:"Natural selection is non-random: it favors fitness-improving alleles and produces adaptation."},
     {type:"mcq",q:"Selection that favors the average phenotype and acts against both extremes is:",opts:["Directional selection","Stabilizing selection","Disruptive selection","Drift"],a:1,exp:"Stabilizing selection favors the intermediate (e.g., bird egg clutch size)."},
     {type:"mcq",q:"Mice that are dark on lava fields and light on sand, with intermediates selected against, illustrate:",opts:["Stabilizing selection","Directional selection","Disruptive selection","Gene flow"],a:2,exp:"Disruptive selection favors both extremes against the intermediate."},
     {type:"mcq",q:"Selection that shifts a population toward one extreme of the trait range is:",opts:["Directional","Stabilizing","Disruptive","Random"],a:0,exp:"Directional selection favors one end of the existing variation."},
     {type:"short",q:"Name and describe the three modes of selection.",model:"Directional selection favors one extreme of the trait distribution, shifting the population that way. Stabilizing selection favors the intermediate phenotype and selects against both extremes. Disruptive selection favors both extremes and selects against intermediates.",pts:["Directional = one extreme","Stabilizing = the average/intermediate","Disruptive = both extremes","(stabilizing/disruptive act against opposite values)"]}
    ]},
   {id:"L5T11", title:"What evolves — individuals or populations?", sub:"The level of evolution (slides 80–81).",
    slides:[
     {h:"Populations evolve", imgs:[c('L5',80),c('L5',81)], html:`
       <p class="lead"><b>Populations evolve, not individuals.</b> An individual can change because of its environment during its life, but <span class="kw">evolution is defined as a change in allele frequencies in a population over generations</span>.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Evolution occurs at the level of the:",opts:["Individual","Population","Organism's lifetime","Single cell"],a:1,exp:"Populations evolve; individuals do not evolve (they can only change phenotypically)."},
     {type:"tf",q:"An individual organism evolves over its lifetime.",a:false,exp:"False — individuals change phenotypically, but evolution (allele-frequency change) happens in populations over generations."},
     {type:"short",q:"Explain why we say populations evolve rather than individuals.",model:"Evolution is defined as a change in allele frequencies over generations. An individual's genotype is fixed at birth; it can change phenotypically due to its environment but cannot change its alleles. Only a population can change its allele frequencies across generations, so populations are the unit that evolves.",pts:["Evolution = change in allele frequencies over generations","Individual genotype is fixed","Individuals change only phenotypically","Populations are the unit that evolves"]}
    ]},
   {id:"L5T12", title:"Hardy–Weinberg equilibrium", sub:"The null model + calculations (slides 82–106).",
    slides:[
     {h:"A null model", imgs:[c('L5',82),c('L5',83),c('L5',84)], html:`
       <p class="lead">A <span class="kw">null model</span> is a baseline that assumes <b>no biological process</b> is shaping a pattern; it lets us test whether observed data differ from random expectations. If they do, something interesting is happening.</p>
       <p><span class="kw-2">Hardy–Weinberg (HW) equilibrium</span> is the null model for evolution: it describes a population that is <b>NOT evolving</b> and shows what allele/genotype frequencies look like if no evolutionary forces act.</p>`},
     {h:"The five HW assumptions", imgs:[c('L5',86),c('L5',87)], html:`
       <p class="lead">A population is at HW equilibrium <b>only IF</b> all five hold (each is the opposite of one of the five mechanisms):</p>
       <ol><li>No mutation</li><li>No immigration (no gene flow)</li><li>Effectively infinite population size (no drift)</li><li>Random mating</li><li>Equal probability of survival & reproduction (no selection)</li></ol>
       <div class="callout key">IF all five hold → <b>no microevolution</b> (allele/genotype frequencies stay constant across generations). If frequencies change, the population is evolving.</div>`},
     {h:"The equations", imgs:[c('L5',89),c('L5',92),c('L5',93)], html:`
       <div class="formula">Allele frequencies:   p + q = 1
Genotype frequencies: p² + 2pq + q² = 1</div>
       <ul><li><b>p</b> = frequency of allele A; <b>q</b> = frequency of allele a.</li>
       <li><b>p²</b> = frequency of AA; <b>q²</b> = frequency of aa; <b>2pq</b> = frequency of Aa (heterozygotes).</li></ul>`},
     {h:"Worked examples", imgs:[c('L5',96),c('L5',98),c('L5',106)], html:`
       <p class="lead"><b>Ex 1:</b> If freq(A) = p = 0.7, then q = 1 − 0.7 = <b>0.3</b>.</p>
       <p><b>Ex 2:</b> If freq(a) = q = 0.4, then p = 0.6, so heterozygotes Aa = 2pq = 2(0.6)(0.4) = <b>0.48</b>.</p>
       <p><b>Ex 3:</b> If 16% are AA, then p² = 0.16 → p = √0.16 = 0.4 → q = 0.6 → q² (aa) = 0.36, and 2pq (Aa) = 2(0.4)(0.6) = <b>0.48</b>.</p>
       <div class="callout tip"><b>Method:</b> if given a homozygote frequency, take its square root to get that allele's frequency; use p + q = 1 for the other; then square/multiply for genotype frequencies.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Hardy–Weinberg equilibrium describes a population that is:",opts:["Evolving rapidly","NOT evolving (a null model)","Going extinct","At carrying capacity"],a:1,exp:"HW is the null model — a non-evolving population used to test for evolution."},
     {type:"mcq",q:"Which is NOT one of the five Hardy–Weinberg assumptions?",opts:["No mutation","Random mating","Small population size","No natural selection"],a:2,exp:"HW requires an effectively INFINITE population (no drift), not a small one."},
     {type:"mcq",q:"At HW equilibrium, if the frequency of allele A (p) is 0.6, what is q?",opts:["0.6","0.4","0.36","0.16"],a:1,exp:"p + q = 1, so q = 1 − 0.6 = 0.4."},
     {type:"mcq",q:"At HW equilibrium, if p = 0.5 and q = 0.5, the frequency of heterozygotes (Aa) is:",opts:["0.25","0.50","0.75","1.0"],a:1,exp:"Aa = 2pq = 2(0.5)(0.5) = 0.5."},
     {type:"mcq",q:"If 9% of a population is homozygous recessive (aa), what is q?",opts:["0.09","0.3","0.81","0.9"],a:1,exp:"q² = 0.09 → q = √0.09 = 0.3."},
     {type:"tf",q:"Each of the five HW assumptions corresponds to the absence of one of the five mechanisms of microevolution.",a:true,exp:"True — no mutation, no gene flow, no drift (infinite N), random mating (no non-random mating), no selection."},
     {type:"short",q:"In a population at HW equilibrium, 16% of individuals are aa. Find q, p, and the frequency of heterozygotes (Aa).",model:"Since aa = q² = 0.16, q = √0.16 = 0.4. Then p = 1 − q = 0.6. The frequency of heterozygotes is 2pq = 2(0.6)(0.4) = 0.48.",pts:["q² = 0.16 → q = 0.4","p = 1 − 0.4 = 0.6","Aa = 2pq = 2(0.6)(0.4)","= 0.48"]}
    ]}
  ]
 };

 /* ---------------- LECTURE 6 — PHYLOGENETICS & MACROEVOLUTION ---------------- */
 const L6={
  id:"L6", icon:"🌳", short:"L6 · Phylogenetics & Macroevolution",
  title:"Lecture 6 — Phylogenetics, Systematics & Macroevolution",
  blurb:"Macroevolution, reading phylogenies, classification, clades, inferring trees (parsimony), homology vs homoplasy, fossils, and models of evolution.",
  objectives:[
   "Define cladogenesis and anagenesis",
   "Understand how to read a phylogeny",
   "Understand the levels of classification, memorizing from Domain to Species",
   "Define monophyletic, paraphyletic, and polyphyletic groups and identify them in a phylogeny",
   "Explain why paraphyletic groups exist (e.g. reptiles)",
   "Understand how a phylogeny is inferred from character states using Maximum Parsimony",
   "Identify ancestral states, derived states, plesiomorphies, apomorphies, autapomorphies, and synapomorphies",
   "Define homology and homoplasy and identify them when given an example or phylogeny",
   "Define convergent evolution and explain its link with homoplasy",
   "Explain the three models of evolution: phyletic gradualism, punctuated equilibria, and punctuated gradualism"
  ],
  topics:[
   {id:"L6T1", title:"Macroevolution", sub:"Large-scale evolution above the species level (slides 1–9).",
    slides:[
     {h:"What macroevolution is", imgs:[c('L6',5),c('L6',6),c('L6',7)], html:`
       <p class="lead"><span class="kw">Macroevolution</span> = descent with modification — <b>large-scale evolutionary change at or above the species level over long periods</b>. (Microevolution changes populations; macroevolution explains the history and diversity of life.)</p>
       <p>It includes: <b>formation of new species (speciation)</b>, <b>diversification of whole groups (adaptive radiations)</b>, and the <b>evolution of major innovations</b>.</p>`},
     {h:"Two processes: cladogenesis & anagenesis", imgs:[c('L6',27)], html:`
       <p class="lead">Macroevolution happens through two processes:</p>
       <ul><li><span class="kw">Cladogenesis</span> — the <b>branching</b> of a lineage into two or more descendant lineages (creation of new species).</li>
       <li><span class="kw">Anagenesis</span> — the <b>change of characteristics within a single lineage</b> over time (no branching).</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"Macroevolution is best defined as:",opts:["Change in allele frequencies in a population","Large-scale change at or above the species level over long periods","Mate choice based on traits","A null model of evolution"],a:1,exp:"Macroevolution = descent with modification on a large scale, at/above the species level."},
     {type:"mcq",q:"The branching of one lineage into two or more descendant lineages is:",opts:["Anagenesis","Cladogenesis","Gene flow","Stabilizing selection"],a:1,exp:"Cladogenesis = branching (new species form). Anagenesis = change within one lineage."},
     {type:"mcq",q:"Anagenesis refers to:",opts:["A lineage splitting in two","Change of characteristics within a single lineage","Extinction","Hybridization"],a:1,exp:"Anagenesis is change within one unbranching lineage over time."},
     {type:"short",q:"Define cladogenesis and anagenesis.",model:"Cladogenesis is the branching of one lineage into two or more descendant lineages, which creates new species. Anagenesis is the gradual change of characteristics within a single lineage over time, without branching.",pts:["Cladogenesis = branching → new species","Anagenesis = change within one lineage","No branching in anagenesis"]}
    ]},
   {id:"L6T2", title:"How we study macroevolution", sub:"Trees, anatomy, fossils (slides 10–26).",
    slides:[
     {h:"Tools for studying macroevolution", imgs:[c('L6',10),c('L6',11),c('L6',14)], html:`
       <p class="lead">We study macroevolution using:</p>
       <ul><li><b>Phylogenetic trees</b> — reconstructed evolutionary relationships.</li>
       <li><b>Comparative anatomy</b> — homologous structures, embryos.</li>
       <li><b>The fossil record</b> — e.g., the ancestors of modern whales.</li>
       <li><b>Testing relationships between trait evolution and speciation.</b></li></ul>
       <p>It teaches us how biodiversity originated and how major adaptations evolved — macroevolution is the basis of all life on Earth.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Which is a primary tool for studying macroevolution?",opts:["Hardy–Weinberg equations","Phylogenetic trees","Quadrat sampling","Mark-recapture"],a:1,exp:"Phylogenetic trees, comparative anatomy, and the fossil record are the main tools."},
     {type:"tf",q:"The fossil record is one way we study macroevolution.",a:true,exp:"True — fossils document past organisms, extinctions, and transitions (e.g., whale ancestors)."},
     {type:"short",q:"Name three ways scientists study macroevolution.",model:"Scientists study macroevolution using phylogenetic trees that reconstruct evolutionary relationships, comparative anatomy such as homologous structures and embryos, and the fossil record that documents past organisms and transitions.",pts:["Phylogenetic trees","Comparative anatomy (homology)","Fossil record"]}
    ]},
   {id:"L6T3", title:"Phylogenetics, taxonomy & systematics", sub:"Three related fields (slides 28–30).",
    slides:[
     {h:"Three fields", imgs:[c('L6',28),c('L6',30)], html:`
       <table class="dt"><tr><th>Field</th><th>What it does</th></tr>
       <tr><td><b>Phylogenetics</b></td><td>Uncovers <b>relationships</b> among species or higher taxa</td></tr>
       <tr><td><b>Taxonomy</b></td><td>The science of <b>naming, describing, and organizing</b> species</td></tr>
       <tr><td><b>Systematics</b></td><td>Organizing/classifying species based on <b>evolutionary relationships</b></td></tr></table>
       <p>A <span class="kw">phylogeny</span> is an evolutionary tree depicting relationships, built from <b>molecular (DNA)</b> or <b>morphological</b> data.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"The science of naming, describing, and organizing species is:",opts:["Phylogenetics","Taxonomy","Systematics","Ecology"],a:1,exp:"Taxonomy = naming/describing/organizing. Phylogenetics = uncovering relationships."},
     {type:"mcq",q:"A phylogeny can be built from:",opts:["Only DNA data","Only fossils","Molecular (DNA) or morphological data","Only behavior"],a:2,exp:"Phylogenies use molecular (DNA) and/or morphological data."},
     {type:"short",q:"Distinguish phylogenetics, taxonomy, and systematics.",model:"Phylogenetics is dedicated to uncovering the evolutionary relationships among species or higher taxa. Taxonomy is the science of naming, describing, and organizing species. Systematics is the field of organizing and classifying species based on their evolutionary relationships.",pts:["Phylogenetics = relationships","Taxonomy = naming/describing/organizing","Systematics = classifying by evolutionary relationships"]}
    ]},
   {id:"L6T4", title:"Reading phylogenetic trees", sub:"Tips, nodes, branches, root (slides 31–35, 57–60).",
    slides:[
     {h:"Anatomy of a tree", imgs:[c('L6',31),c('L6',35)], html:`
       <p class="lead">A phylogenetic tree's parts:</p>
       <ul><li><b>Tips</b> — the descendants/taxa at the ends (e.g., A, B, C).</li>
       <li><b>Nodes</b> — branch points = common ancestors where a lineage splits.</li>
       <li><b>Branches</b> — the lineages.</li><li><b>Root</b> — the common ancestor of everything on the tree.</li></ul>
       <p>Relatedness is read by the <b>most recent common ancestor</b>: two tips sharing a more recent node are more closely related. Trees can be drawn in any rotation — what matters is the branching pattern, not the order of tips.</p>`},
     {h:"Counting nodes, tips & species", imgs:[c('L6',58),c('L6',59)], html:`
       <p class="lead">Practice: in the lecture's example tree with tips A–E there are <b>4 nodes</b>, <b>5 tips</b>, and therefore <b>5 species</b>. Nodes = the internal branch points; tips = the terminal taxa.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"On a phylogenetic tree, a node represents:",opts:["A living species today","A common ancestor / branch point","A mutation","The root only"],a:1,exp:"Nodes are branch points representing common ancestors where lineages split."},
     {type:"mcq",q:"Two tips are most closely related if they:",opts:["Are drawn next to each other","Share the most recent common ancestor (node)","Have the longest branches","Are nearest the root"],a:1,exp:"Relatedness is judged by the most recent common ancestor, not by drawn position."},
     {type:"mcq",q:"A rooted tree with 5 tips (A–E) like the lecture example has how many tips/species?",opts:["4","5","6","3"],a:1,exp:"5 tips = 5 species (with 4 internal nodes in that example)."},
     {type:"tf",q:"Rotating the branches of a tree around a node changes the evolutionary relationships it shows.",a:false,exp:"False — rotating branches at nodes does not change relationships; only the branching pattern matters."},
     {type:"short",q:"Define the tips, nodes, and root of a phylogenetic tree.",model:"The tips are the taxa at the ends of the branches, representing descendants such as living species. The nodes are the internal branch points, each representing a common ancestor where a lineage split. The root is the common ancestor of all the taxa on the tree.",pts:["Tips = terminal taxa/descendants","Nodes = common ancestors / branch points","Root = ancestor of everything on the tree"]}
    ]},
   {id:"L6T5", title:"Levels of classification", sub:"Domain to Species (slides 36–42).",
    slides:[
     {h:"The taxonomic hierarchy", imgs:[c('L6',37),c('L6',39),c('L6',41)], html:`
       <p class="lead">Classification is a hierarchy of ranks (Linnaeus). From broadest to most specific:</p>
       <p style="font-size:15px"><b>Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species</b></p>
       <p>Mnemonic: <i>"<b>D</b>ear <b>K</b>ing <b>P</b>hillip <b>C</b>ame <b>O</b>ver <b>F</b>or <b>G</b>reat <b>S</b>paghetti."</i> Going down the ranks, organisms become <b>more similar and more closely related</b>, and each rank contains fewer species. Human: Eukarya, Animalia, Chordata, Mammalia, Primates, Hominidae, <i>Homo</i>, <i>sapiens</i>.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Which lists the taxonomic ranks from broadest to most specific?",opts:["Species → Genus → Family → … → Domain","Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species","Kingdom → Domain → Phylum → … → Species","Domain → Phylum → Kingdom → … → Species"],a:1,exp:"Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species (Dear King Phillip Came Over For Great Spaghetti)."},
     {type:"mcq",q:"As you move from Domain down to Species, organisms within a group become:",opts:["More distantly related","More similar and more closely related","Fewer in similarity","Randomly assorted"],a:1,exp:"Lower ranks are more specific — fewer species, more closely related."},
     {type:"mcq",q:"Which rank is the most specific?",opts:["Genus","Family","Species","Order"],a:2,exp:"Species is the most specific (narrowest) rank."},
     {type:"short",q:"List the eight levels of classification from broadest to most specific.",model:"From broadest to most specific: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species. A common mnemonic is 'Dear King Phillip Came Over For Great Spaghetti.'",pts:["Domain, Kingdom, Phylum, Class","Order, Family, Genus, Species","Broad → specific (fewer, more related)"]}
    ]},
   {id:"L6T6", title:"Clades: monophyletic, paraphyletic, polyphyletic", sub:"Grouping by ancestry (slides 43–77).",
    slides:[
     {h:"Clades and the three group types", imgs:[c('L6',43),c('L6',44),c('L6',45),c('L6',46)], html:`
       <p class="lead">A <span class="kw">clade</span> = a group containing a common ancestor and <b>ALL</b> of its descendants = a <b>monophyletic</b> group.</p>
       <table class="dt"><tr><th>Group</th><th>Definition</th></tr>
       <tr><td><b>Monophyletic</b></td><td>An ancestor + <b>all</b> its descendants (a clade)</td></tr>
       <tr><td><b>Paraphyletic</b></td><td>An ancestor + <b>some but not all</b> of its descendants</td></tr>
       <tr><td><b>Polyphyletic</b></td><td>Members from <b>two or more ancestors</b>, excluding the common ancestor</td></tr></table>`},
     {h:"Why paraphyletic groups exist", imgs:[c('L6',51),c('L6',52)], html:`
       <p class="lead">Traditional (Linnaean) classification was based on <b>observable traits, not evolutionary history</b>, so it sometimes created paraphyletic groups. <b>"Reptiles"</b> is the classic example — the traditional group leaves out birds, even though birds descend from the same common ancestor, so it includes some but not all descendants.</p>`},
     {h:"Identifying groups on a tree", imgs:[c('L6',62),c('L6',69),c('L6',72),c('L6',74)], html:`
       <p class="lead">To classify a circled group: find the common ancestor of its members and check which descendants are included.</p>
       <ul><li><b>Monophyletic</b> if it's an ancestor + every descendant.</li>
       <li><b>Paraphyletic</b> if it's an ancestor + some (but not all) descendants.</li>
       <li><b>Polyphyletic</b> if it pulls members from different ancestors and excludes their common ancestor.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"A clade (monophyletic group) consists of:",opts:["An ancestor and some of its descendants","An ancestor and ALL of its descendants","Descendants of two different ancestors","Only living species"],a:1,exp:"Monophyletic = a common ancestor plus all of its descendants."},
     {type:"mcq",q:"A group that includes an ancestor and only SOME of its descendants is:",opts:["Monophyletic","Paraphyletic","Polyphyletic","A clade"],a:1,exp:"Paraphyletic = ancestor + some but not all descendants (e.g., traditional 'reptiles')."},
     {type:"mcq",q:"The traditional group 'reptiles' (excluding birds) is an example of a ____ group.",opts:["monophyletic","paraphyletic","polyphyletic","random"],a:1,exp:"It leaves out birds, which share the common ancestor — some but not all descendants = paraphyletic."},
     {type:"mcq",q:"A group assembled from two or more ancestors, not including their common ancestor, is:",opts:["Monophyletic","Paraphyletic","Polyphyletic","A clade"],a:2,exp:"Polyphyletic = members from multiple ancestors, excluding the common ancestor."},
     {type:"short",q:"Define monophyletic, paraphyletic, and polyphyletic groups, and explain why paraphyletic groups like 'reptiles' exist.",model:"A monophyletic group (clade) contains a common ancestor and all of its descendants. A paraphyletic group contains a common ancestor and some but not all of its descendants. A polyphyletic group contains members from two or more ancestors but excludes their common ancestor. Paraphyletic groups like 'reptiles' exist because traditional classification was based on shared observable traits rather than full evolutionary history, so birds were excluded even though they descend from the same ancestor.",pts:["Monophyletic = ancestor + all descendants","Paraphyletic = ancestor + some descendants","Polyphyletic = multiple ancestors, excludes common ancestor","Paraphyly arises from trait-based (not history-based) classification"]}
    ]},
   {id:"L6T7", title:"Characters & character states (ancestral vs derived)", sub:"The basis for inferring trees (slides 78–84).",
    slides:[
     {h:"Homologous characters; ancestral vs derived", imgs:[c('L6',78),c('L6',79),c('L6',81)], html:`
       <p class="lead">We infer phylogenies from <span class="kw">characters</span> (traits thought to be homologous — derived from a common ancestor) and their <span class="kw-2">character states</span> (alternative conditions).</p>
       <ul><li><b>Ancestral state</b> — the condition found in the common ancestor.</li>
       <li><b>Derived state</b> — the condition that evolved from the ancestral state.</li></ul>
       <p>An <b>ingroup</b> is the group under study; an <b>outgroup</b> is a comparison group (the sister group) used to determine <b>polarity</b> — which states are ancestral vs derived.</p>`},
     {h:"Plesiomorphy, apomorphy, auto- & synapomorphy", imgs:[c('L6',82),c('L6',83)], html:`
       <table class="dt"><tr><th>Term</th><th>Meaning</th></tr>
       <tr><td><b>Plesiomorphy</b></td><td>An <b>ancestral</b> character state</td></tr>
       <tr><td><b>Apomorphy</b></td><td>A <b>derived</b> character state</td></tr>
       <tr><td><b>Autapomorphy</b></td><td>A derived state <b>unique to one species</b></td></tr>
       <tr><td><b>Synapomorphy</b></td><td>A derived state <b>shared across taxa</b> — evidence for a clade/common ancestry</td></tr></table>`}
    ],
    quiz:[
     {type:"mcq",q:"An ancestral character state is also called a:",opts:["Apomorphy","Plesiomorphy","Synapomorphy","Homoplasy"],a:1,exp:"Plesiomorphy = ancestral state; apomorphy = derived state."},
     {type:"mcq",q:"A derived character state SHARED across taxa (evidence for a clade) is a:",opts:["Autapomorphy","Synapomorphy","Plesiomorphy","Homoplasy"],a:1,exp:"Synapomorphy = shared derived state; autapomorphy = derived state unique to one species."},
     {type:"mcq",q:"An outgroup is used to:",opts:["Add more species to count","Determine the polarity of character states (ancestral vs derived)","Make the tree larger","Replace the ingroup"],a:1,exp:"The outgroup is a comparison that polarizes characters — states shared with the outgroup are ancestral."},
     {type:"mcq",q:"A derived state found in only ONE species is a(n):",opts:["Synapomorphy","Autapomorphy","Plesiomorphy","Symplesiomorphy"],a:1,exp:"Autapomorphy = unique derived state in a single species."},
     {type:"short",q:"Distinguish a plesiomorphy, an apomorphy, an autapomorphy, and a synapomorphy.",model:"A plesiomorphy is an ancestral character state. An apomorphy is a derived character state. An autapomorphy is a derived state unique to a single species. A synapomorphy is a derived state shared by two or more taxa, which is evidence that they form a clade.",pts:["Plesiomorphy = ancestral","Apomorphy = derived","Autapomorphy = derived, unique to one species","Synapomorphy = derived, shared (evidence for a clade)"]}
    ]},
   {id:"L6T8", title:"Inferring trees with Maximum Parsimony", sub:"Synapomorphies + Occam's razor (slides 85–105).",
    slides:[
     {h:"The maximum parsimony method", imgs:[c('L6',85),c('L6',86),c('L6',87)], html:`
       <p class="lead"><span class="kw">Maximum parsimony</span> compares character states across homologous characters. States shared with the <b>outgroup</b> are scored ancestral (0); novel states are derived (1) — this <b>polarizes</b> the data.</p>
       <p><b>Grouping rule:</b> <span class="kw-2">synapomorphies</span> (shared derived states) are evidence for common ancestry. <b>Main principle (Occam's Razor):</b> the best phylogeny is the <b>simplest</b> one — the tree requiring the <b>fewest evolutionary changes (lowest cost / fewest steps)</b>.</p>`},
     {h:"Worked example — fewest steps wins", imgs:[c('L6',97),c('L6',105)], html:`
       <p class="lead">Given a character matrix scored 0 (ancestral) / 1 (derived), you count how many changes each candidate tree requires. In the lecture's example, the <b>ABC tree had a cost of 4</b> while alternatives cost 5 — so the cost-4 tree is the best (most parsimonious) hypothesis.</p>
       <div class="callout tip">You won't have to build a parsimony tree by hand — but understand: homologous characters, ancestral vs derived, and that the best tree has the <b>least steps</b> (Occam's razor).</div>`}
    ],
    quiz:[
     {type:"mcq",q:"The main principle of maximum parsimony (Occam's razor) is that the best tree:",opts:["Has the most branches","Requires the fewest evolutionary changes","Includes the most species","Has the longest branches"],a:1,exp:"The most parsimonious tree is the simplest — fewest steps/changes."},
     {type:"mcq",q:"In parsimony, character states shared with the outgroup are scored as:",opts:["Derived (1)","Ancestral (0)","Random","Missing"],a:1,exp:"Outgroup states are treated as ancestral (0); novel states are derived (1)."},
     {type:"mcq",q:"What kind of character is evidence for grouping taxa into a clade?",opts:["A plesiomorphy","A synapomorphy (shared derived state)","An autapomorphy","Homoplasy"],a:1,exp:"Shared derived states (synapomorphies) are the grouping evidence in parsimony."},
     {type:"mcq",q:"If tree ABC costs 4 steps and trees ACB and BCA each cost 5, which is the best hypothesis?",opts:["ACB","BCA","ABC (fewest steps)","They are equally good"],a:2,exp:"Fewest steps = most parsimonious = best. ABC (cost 4) wins."},
     {type:"short",q:"Explain how maximum parsimony chooses the best phylogenetic tree.",model:"Maximum parsimony scores homologous characters as ancestral or derived using an outgroup, then evaluates candidate trees by counting how many evolutionary changes each requires. Shared derived states (synapomorphies) group taxa together. The best tree is the most parsimonious one — the tree that requires the fewest total changes (lowest cost), following Occam's razor.",pts:["Polarize characters with an outgroup (0 ancestral / 1 derived)","Synapomorphies group taxa","Count steps/changes for each tree","Fewest steps = best (Occam's razor)"]}
    ]},
   {id:"L6T9", title:"Homology vs. homoplasy & convergent evolution", sub:"Similarity from ancestry vs. from convergence (slides 106–117).",
    slides:[
     {h:"Homology vs. homoplasy", imgs:[c('L6',106),c('L6',112),c('L6',113)], html:`
       <table class="dt"><tr><th>Term</th><th>Definition</th></tr>
       <tr><td><b>Homology</b></td><td>Similarity between characters due to <b>shared ancestry</b></td></tr>
       <tr><td><b>Homoplasy</b></td><td>Similarity that is <b>NOT</b> derived from a common ancestor</td></tr></table>
       <p>Homology examples: hair in mammals; teeth; the matching limb bones across vertebrates.</p>`},
     {h:"Convergent evolution drives homoplasy", imgs:[c('L6',107),c('L6',108),c('L6',110),c('L6',115)], html:`
       <p class="lead"><span class="kw">Convergent evolution</span> = when different species independently evolve <b>similar traits</b> — not from common ancestry but because of <b>similar selective pressures</b>. Convergent evolution is the main source of <b>homoplasy</b>.</p>
       <ul><li>Echolocation in bats & dolphins; flippers in penguins, sea turtles, whales; antlers vs horns.</li>
       <li><b>Flight in birds vs bats is homoplasious</b> — birds use feathers, bats use membranes — even though the underlying arm <b>bones</b> are homologous.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"Homology is similarity due to:",opts:["Convergent evolution","Shared common ancestry","Random chance","Similar environments only"],a:1,exp:"Homology = similarity inherited from a shared ancestor."},
     {type:"mcq",q:"Echolocation evolving independently in bats and dolphins is an example of:",opts:["Homology","Homoplasy (convergent evolution)","A synapomorphy","Genetic drift"],a:1,exp:"Independent evolution of a similar trait = homoplasy from convergent evolution."},
     {type:"mcq",q:"Convergent evolution occurs because different lineages experience:",opts:["The same mutations","Similar selective pressures","No selection","Identical ancestors"],a:1,exp:"Similar selective pressures produce similar adaptations independently."},
     {type:"tf",q:"The wings of birds and bats are homoplasious for flight, even though their arm bones are homologous.",a:true,exp:"True — flight evolved independently (feathers vs membranes = homoplasy), but the limb bones share ancestry (homology)."},
     {type:"short",q:"Define homology and homoplasy, and explain how convergent evolution links to homoplasy.",model:"Homology is similarity between characters that results from shared common ancestry. Homoplasy is similarity that does not come from a common ancestor. Convergent evolution produces homoplasy: when different lineages face similar selective pressures, they independently evolve similar traits that look alike but were not inherited from a shared ancestor, such as echolocation in bats and dolphins.",pts:["Homology = similarity from shared ancestry","Homoplasy = similarity NOT from common ancestor","Convergent evolution = independent evolution under similar pressures","Convergence is the main source of homoplasy"]}
    ]},
   {id:"L6T10", title:"Fossils & geologic time", sub:"The fossil record and Earth's timeline (slides 118–126).",
    slides:[
     {h:"Fossils & the geologic time scale", imgs:[c('L6',119),c('L6',121),c('L6',122)], html:`
       <p class="lead"><span class="kw">Fossils</span> (Latin: "having been dug up") = preserved remains or traces of organisms from the past. The fossil record tells us about organisms with no living descendants, past mass extinctions and diversifications, and the movement of continents.</p>
       <p>Timeline: universe ~14 bya; Earth ~4.6 bya; life ~3.5 bya; first animal fossils ~800 mya. Major eras: <b>Paleozoic</b> (appearance of most animal phyla), <b>Mesozoic</b> (continents separate; gymnosperms & reptiles dominant), <b>Cenozoic</b> (after the dinosaurs' extinction; radiations of mammals, birds, snakes, angiosperms).</p>`},
     {h:"The record is imperfect but important", imgs:[c('L6',124)], html:`
       <p class="lead">The fossil record is <b>incomplete</b> — gaps can make evolution look more gradual or abrupt than it was — but it remains essential evidence for the history of life.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"In which era did most major animal phyla first appear?",opts:["Cenozoic","Mesozoic","Paleozoic","Precambrian only"],a:2,exp:"The Paleozoic saw the appearance of most animal phyla."},
     {type:"mcq",q:"The Cenozoic era is characterized by:",opts:["The first fishes","Dominant dinosaurs","Radiations of mammals and birds after the dinosaurs' extinction","The origin of life"],a:2,exp:"Cenozoic = after the dinosaur extinction; mammals, birds, snakes, and angiosperms radiate."},
     {type:"tf",q:"The fossil record is complete and captures every organism that ever lived.",a:false,exp:"False — the fossil record is imperfect, with many gaps, though still very informative."},
     {type:"short",q:"What does the fossil record tell us, and why is it considered imperfect?",model:"The fossil record tells us about organisms that left no living descendants, past episodes of mass extinction and diversification, and the past movement of continents. It is considered imperfect because fossilization is rare and many organisms and time intervals are missing, so the preserved record has gaps that can make evolutionary change look more gradual or more abrupt than it actually was.",pts:["Shows extinct organisms with no descendants","Records mass extinctions & diversifications","Records continental movement","Imperfect/incomplete — has gaps"]}
    ]},
   {id:"L6T11", title:"Three models of evolution", sub:"Gradualism vs punctuated patterns (slides 127–131).",
    slides:[
     {h:"Phyletic gradualism, punctuated equilibria, punctuated gradualism", imgs:[c('L6',127),c('L6',128),c('L6',129)], html:`
       <table class="dt"><tr><th>Model</th><th>Pattern</th></tr>
       <tr><td><b>Phyletic gradualism</b></td><td>Slow, <b>incremental</b> change; not necessarily tied to speciation</td></tr>
       <tr><td><b>Punctuated equilibria</b></td><td>Long periods of <b>stasis</b> (no change) <b>punctuated by rapid change</b>, with <b>cladogenesis</b> (a daughter species diverges rapidly, then stays stable)</td></tr>
       <tr><td><b>Punctuated gradualism</b></td><td>Rapid spurts of change <b>without cladogenesis</b> — a lineage shifts quickly but speciation does not necessarily occur</td></tr></table>
       <div class="callout key">Key contrast: punctuated <b>equilibria</b> involves cladogenesis (branching); punctuated <b>gradualism</b> does <b>not</b>.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Slow, steady, incremental change over time describes:",opts:["Punctuated equilibria","Phyletic gradualism","Punctuated gradualism","Anagenesis only"],a:1,exp:"Phyletic gradualism = slow incremental change."},
     {type:"mcq",q:"Long periods of stasis interrupted by rapid change accompanied by branching (cladogenesis) describes:",opts:["Phyletic gradualism","Punctuated equilibria","Punctuated gradualism","Convergent evolution"],a:1,exp:"Punctuated equilibria = stasis punctuated by rapid change WITH cladogenesis."},
     {type:"mcq",q:"The key difference between punctuated equilibria and punctuated gradualism is that punctuated gradualism:",opts:["Is always slower","Does NOT involve cladogenesis (branching)","Never involves change","Only applies to plants"],a:1,exp:"Punctuated gradualism has rapid change without cladogenesis; punctuated equilibria has cladogenesis."},
     {type:"short",q:"Describe the three models of evolution.",model:"Phyletic gradualism is slow, incremental change over time, not necessarily associated with speciation. Punctuated equilibria describes long periods of stasis punctuated by rapid change that occurs with cladogenesis, when a daughter species diverges quickly and then remains stable. Punctuated gradualism describes rapid bursts of change within a lineage that occur without cladogenesis, so the lineage shifts quickly but does not necessarily split into new species.",pts:["Phyletic gradualism = slow incremental change","Punctuated equilibria = stasis + rapid change WITH cladogenesis","Punctuated gradualism = rapid change WITHOUT cladogenesis"]}
    ]}
  ]
 };

 window.COURSE.push(L5, L6);

 /* ---------------- FLASHCARDS ---------------- */
 window.FLASHCARDS.L5=[
  {f:"Evolution",b:"Change in species over time; micro = change in allele frequencies, macro = descent with modification."},
  {f:"Homologous structures",b:"Similar structures inherited from a common ancestor (e.g., the same limb bones in arm/flipper/wing)."},
  {f:"Essentialism (Greeks)",b:"View that species have fixed 'essences' and are static/unchanging (Aristotle, Scala Naturae)."},
  {f:"Linnaeus",b:"Built the hierarchical classification system but believed species were fixed."},
  {f:"Lamarck",b:"First proposed species change over time; mechanism = use & disuse + inheritance of acquired characteristics (WRONG but foundational)."},
  {f:"Use and disuse",b:"Lamarck's idea that used structures enlarge and unused ones shrink, and these acquired traits are inherited (incorrect)."},
  {f:"Darwin's finches",b:"Galápagos finches with different beak shapes/sizes matched to diet; suggested common ancestor + adaptation → natural selection."},
  {f:"Natural selection",b:"Differential survival/reproduction of heritable variants; advantageous heritable traits become more common. NOT random."},
  {f:"Fitness",b:"An individual's ability to survive and reproduce; measured by reproductive success (genes passed on)."},
  {f:"Modern synthesis",b:"Fusion of Darwin's natural selection with Mendelian genetics."},
  {f:"Gene / allele",b:"Gene = DNA instructions for a trait; allele = one variant of a gene."},
  {f:"Genotype vs phenotype",b:"Genotype = combination of alleles; phenotype = observable trait = genotype + environment."},
  {f:"Five mechanisms of microevolution",b:"Mutation, genetic drift, gene flow, non-random mating, natural selection (they change allele frequencies)."},
  {f:"Random vs non-random mechanisms",b:"Random: mutation, genetic drift. Non-random: gene flow, non-random mating, natural selection."},
  {f:"Mutation",b:"Random changes in DNA; the raw material of evolution; most neutral, some harmful, few beneficial."},
  {f:"Genetic drift",b:"Random fluctuation in allele frequencies; chance event; bigger effect in small populations; can fix or lose alleles."},
  {f:"Bottleneck effect",b:"Genetic drift after a disaster kills most of a population at random (e.g., elephant seals ~20 left, low diversity)."},
  {f:"Founder effect",b:"Genetic drift when a small group breaks off to found a new population with limited variation."},
  {f:"Gene flow",b:"Movement of genes between populations (migration, pollen); adds new alleles, makes populations more similar; primarily non-random."},
  {f:"Non-random mating",b:"Choosing mates by traits/relatedness/proximity. Includes sexual selection (peacock) and inbreeding (self-pollination)."},
  {f:"Modes of selection",b:"Directional (one extreme), Stabilizing (intermediate, against extremes), Disruptive (both extremes, against intermediate)."},
  {f:"What evolves?",b:"Populations, not individuals — evolution = change in allele frequencies over generations."},
  {f:"Null model",b:"A baseline assuming no biological process; used to test whether observed patterns differ from random expectations."},
  {f:"Hardy–Weinberg equilibrium",b:"Null model describing a NON-evolving population; predicts allele/genotype frequencies if no evolutionary forces act."},
  {f:"HW five assumptions",b:"No mutation, no gene flow, infinite population (no drift), random mating, no selection → no microevolution."},
  {f:"HW allele equation",b:"p + q = 1 (p = freq of A, q = freq of a)."},
  {f:"HW genotype equation",b:"p² + 2pq + q² = 1 (p² = AA, q² = aa, 2pq = Aa)."},
  {f:"Solving HW from a homozygote",b:"If you know q² (aa) or p² (AA), take the square root to get q or p; then p + q = 1; then compute 2pq."}
 ];
 window.FLASHCARDS.L6=[
  {f:"Macroevolution",b:"Descent with modification; large-scale change at or above the species level over long periods."},
  {f:"Cladogenesis",b:"Branching of a lineage into two or more descendant lineages (creates new species)."},
  {f:"Anagenesis",b:"Change of characteristics within a single lineage over time (no branching)."},
  {f:"Phylogenetics / Taxonomy / Systematics",b:"Phylogenetics = relationships; Taxonomy = naming/describing/organizing; Systematics = classifying by evolutionary relationships."},
  {f:"Phylogeny",b:"An evolutionary tree of relationships, built from molecular (DNA) or morphological data."},
  {f:"Tree parts",b:"Tips = descendants; nodes = common ancestors (branch points); branches = lineages; root = ancestor of all."},
  {f:"Reading relatedness",b:"Two tips are most closely related if they share the most recent common ancestor (node)."},
  {f:"Levels of classification",b:"Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species (Dear King Phillip Came Over For Great Spaghetti)."},
  {f:"Clade",b:"A common ancestor + ALL its descendants = a monophyletic group."},
  {f:"Monophyletic",b:"An ancestor and all of its descendants (a clade)."},
  {f:"Paraphyletic",b:"An ancestor and some but not all descendants (e.g., traditional 'reptiles', excluding birds)."},
  {f:"Polyphyletic",b:"Members from two or more ancestors, excluding their common ancestor."},
  {f:"Why paraphyletic groups exist",b:"Traditional classification used observable traits, not full evolutionary history, so it sometimes excluded descendants (reptiles)."},
  {f:"Character vs character state",b:"Character = a trait (homologous); character state = an alternative condition of that trait."},
  {f:"Ancestral vs derived state",b:"Ancestral = found in the common ancestor; derived = evolved from the ancestral state."},
  {f:"Ingroup / outgroup",b:"Ingroup = group under study; outgroup = comparison (sister group) used to polarize character states."},
  {f:"Plesiomorphy vs apomorphy",b:"Plesiomorphy = ancestral state; apomorphy = derived state."},
  {f:"Autapomorphy vs synapomorphy",b:"Autapomorphy = derived state unique to one species; synapomorphy = derived state shared across taxa (evidence for a clade)."},
  {f:"Maximum parsimony",b:"Infer the tree needing the FEWEST evolutionary changes (Occam's razor); synapomorphies group taxa; outgroup states = ancestral (0)."},
  {f:"Homology",b:"Similarity between characters due to shared common ancestry (e.g., mammal hair, limb bones)."},
  {f:"Homoplasy",b:"Similarity NOT derived from a common ancestor; results from convergent evolution."},
  {f:"Convergent evolution",b:"Different lineages independently evolve similar traits due to similar selective pressures (echolocation in bats & dolphins)."},
  {f:"Bird vs bat wings",b:"Flight is homoplasious (feathers vs membranes, evolved independently), but the arm bones are homologous."},
  {f:"Fossils",b:"Preserved remains or traces of past organisms; record extinctions, diversifications, and continental movement; imperfect."},
  {f:"Geologic eras",b:"Paleozoic = most animal phyla appear; Mesozoic = reptiles/gymnosperms, continents separate; Cenozoic = mammals/birds radiate after dinosaurs."},
  {f:"Phyletic gradualism",b:"Slow, incremental evolutionary change over time."},
  {f:"Punctuated equilibria",b:"Long stasis punctuated by rapid change WITH cladogenesis (branching)."},
  {f:"Punctuated gradualism",b:"Rapid change within a lineage WITHOUT cladogenesis (no branching)."}
 ];

 /* ---------------- OBJECTIVE MASTERY ---------------- */
 window.OBJMASTERY.L5={
  id:"L5OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 5 objectives — taught and tested point by point, including Hardy–Weinberg calculations.",
  slides:[
   {h:"Objective 1 — Lamarck's 'use and disuse' & why it mattered", html:`
     <p class="lead"><b>Use and disuse:</b> structures used a lot grow larger/stronger; unused ones deteriorate. Combined with <b>inheritance of acquired characteristics</b> (acquired traits passed to offspring). The mechanism is <b>wrong</b>, but Lamarck was the first to seriously propose that species <b>change over time to adapt</b> — a foundational idea for Darwin.</p>`},
   {h:"Objective 2 — How the finches led Darwin to natural selection", html:`
     <p class="lead">Galápagos finches were alike in size/color but had <b>different beaks matched to diet</b>. Darwin reasoned they shared a <b>common ancestor</b> and that heritable beak traits aiding survival were passed on, so populations <b>adapted</b> over time → the idea of natural selection (and adaptive radiation).</p>`},
   {h:"Objective 3 — Natural selection & fitness", html:`
     <p class="lead"><b>Natural selection:</b> heritable variation + differential survival/reproduction → advantageous alleles become common (non-random; produces adaptation). <b>Fitness:</b> ability to survive and reproduce, measured by <b>reproductive success</b>.</p>`},
   {h:"Objective 4 — Five mechanisms (and random vs non-random)", html:`
     <table class="dt"><tr><th>Mechanism</th><th>Random?</th><th>What it does</th></tr>
     <tr><td>Mutation</td><td><b>Random</b></td><td>Creates new alleles (raw material)</td></tr>
     <tr><td>Genetic drift</td><td><b>Random</b></td><td>Chance changes; strong in small populations</td></tr>
     <tr><td>Gene flow</td><td>Non-random</td><td>Moves alleles between populations</td></tr>
     <tr><td>Non-random mating</td><td>Non-random</td><td>Mate choice (sexual selection, inbreeding)</td></tr>
     <tr><td>Natural selection</td><td>Non-random</td><td>Favors fitness-improving alleles</td></tr></table>`},
   {h:"Objective 5 — Null model", html:`
     <p class="lead">A <b>null model</b> assumes no biological process is shaping a pattern; it gives the expected result under pure chance so you can test whether real data differ. If they do, something interesting (e.g., evolution) is happening.</p>`},
   {h:"Objective 6 — HW equilibrium, assumptions & use", html:`
     <p class="lead">HW is the null model for evolution — a <b>non-evolving</b> population. Five assumptions (the opposite of the five mechanisms): <b>no mutation, no gene flow, infinite population (no drift), random mating, no selection</b> → frequencies stay constant. We use it to test whether a population is evolving.</p>`},
   {h:"Objective 7 — Solving HW problems", html:`
     <div class="formula">p + q = 1        p² + 2pq + q² = 1</div>
     <p>p = freq(A), q = freq(a); p² = AA, q² = aa, 2pq = Aa. <b>Method:</b> if given a homozygote frequency, square-root it for that allele; use p + q = 1 for the other; then compute genotype frequencies.</p>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] Lamarck's mechanism of evolution was:",opts:["Natural selection","Use/disuse + inheritance of acquired characteristics","Genetic drift","Hardy–Weinberg equilibrium"],a:1,exp:"Lamarck proposed use & disuse plus inheritance of acquired traits — wrong, but foundational."},
   {type:"tf",q:"[Obj 1] Although Lamarck's mechanism was incorrect, his idea that species change over time was influential.",a:true,exp:"True — he was first to seriously propose adaptive change over time."},
   {type:"mcq",q:"[Obj 2] The finches' different beaks were matched to their:",opts:["Color","Diet","Song","Size"],a:1,exp:"Beak shape/size matched diet (seeds vs insects/nectar), suggesting adaptation."},
   {type:"short",q:"[Obj 2] How did the Galápagos finches lead Darwin toward natural selection?",model:"Darwin saw that the finches were similar in size and color but had different beak shapes and sizes matched to their diets. He reasoned that they all descended from a common ancestor and that heritable beak traits aiding survival and feeding were passed to offspring, so the populations adapted to their environments over time — the core idea of natural selection.",pts:["Beaks differ by diet","Common ancestor","Heritable advantageous traits passed on","Populations adapt over time → natural selection"]},
   {type:"mcq",q:"[Obj 3] Fitness is measured by:",opts:["Body size","Reproductive success","Lifespan only","Strength"],a:1,exp:"Fitness = ability to survive and reproduce, measured by reproductive success."},
   {type:"tf",q:"[Obj 3] Natural selection is a random process.",a:false,exp:"False — selection is non-random; it favors alleles that improve fitness."},
   {type:"mcq",q:"[Obj 4] Which pair are the two RANDOM mechanisms of microevolution?",opts:["Selection & gene flow","Mutation & genetic drift","Non-random mating & drift","Gene flow & mutation"],a:1,exp:"Mutation and genetic drift are random."},
   {type:"mcq",q:"[Obj 4] Which mechanism introduces brand-new alleles into a population?",opts:["Genetic drift","Mutation","Non-random mating","Natural selection"],a:1,exp:"Only mutation creates new alleles; others act on existing variation (gene flow moves existing alleles in)."},
   {type:"mcq",q:"[Obj 4] The bottleneck and founder effects are special cases of:",opts:["Gene flow","Genetic drift","Natural selection","Mutation"],a:1,exp:"Both are forms of genetic drift (random subsetting of alleles)."},
   {type:"short",q:"[Obj 4] List the five mechanisms of microevolution and state which are random.",model:"The five mechanisms are mutation, genetic drift, gene flow, non-random mating, and natural selection. Mutation and genetic drift are random; gene flow, non-random mating, and natural selection are non-random.",pts:["Mutation, genetic drift, gene flow, non-random mating, natural selection","Random: mutation, genetic drift","Non-random: the other three"]},
   {type:"mcq",q:"[Obj 5] A null model is used to:",opts:["Prove evolution is impossible","Provide a baseline of no process, to test if data differ from chance","Calculate fitness","Build phylogenies"],a:1,exp:"A null model gives the expected pattern under no process, so deviations reveal something real."},
   {type:"mcq",q:"[Obj 6] Which is NOT a Hardy–Weinberg assumption?",opts:["No mutation","Random mating","Strong natural selection","No gene flow"],a:2,exp:"HW requires NO selection (equal survival/reproduction). Selection violates HW."},
   {type:"tf",q:"[Obj 6] If a population's allele frequencies stay constant across generations, it meets the HW prediction of no evolution.",a:true,exp:"True — constant frequencies = the null (non-evolving) expectation."},
   {type:"short",q:"[Obj 6] State the five Hardy–Weinberg assumptions and what they imply.",model:"The five assumptions are: no mutation, no gene flow (immigration), an effectively infinite population size (no genetic drift), random mating, and equal probability of survival and reproduction (no natural selection). If all five hold, there is no microevolution, so allele and genotype frequencies remain constant across generations.",pts:["No mutation","No gene flow","Infinite population (no drift)","Random mating; no selection → no change"]},
   {type:"mcq",q:"[Obj 7] At HW equilibrium, if p = 0.8, what is q?",opts:["0.2","0.8","0.64","0.4"],a:0,exp:"q = 1 − p = 1 − 0.8 = 0.2."},
   {type:"mcq",q:"[Obj 7] At HW equilibrium with p = 0.6 and q = 0.4, the frequency of AA is:",opts:["0.16","0.36","0.48","0.24"],a:1,exp:"AA = p² = 0.6² = 0.36."},
   {type:"mcq",q:"[Obj 7] If 25% of a population is homozygous recessive (aa), what is the frequency of allele a?",opts:["0.25","0.5","0.75","0.05"],a:1,exp:"q² = 0.25 → q = √0.25 = 0.5."},
   {type:"short",q:"[Obj 7] In a population at HW equilibrium, 49% are homozygous dominant (AA). Find p, q, and the frequency of heterozygotes.",model:"AA = p² = 0.49, so p = √0.49 = 0.7. Then q = 1 − 0.7 = 0.3. Heterozygotes Aa = 2pq = 2(0.7)(0.3) = 0.42.",pts:["p² = 0.49 → p = 0.7","q = 1 − 0.7 = 0.3","Aa = 2pq = 2(0.7)(0.3)","= 0.42"]}
  ]
 };
 window.OBJMASTERY.L6={
  id:"L6OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 6 objectives — taught and tested point by point.",
  slides:[
   {h:"Objective 1 — Cladogenesis vs anagenesis", html:`
     <p class="lead"><b>Cladogenesis</b> = a lineage <b>branches</b> into two or more lineages (new species form). <b>Anagenesis</b> = a single lineage <b>changes its characteristics</b> over time without branching.</p>`},
   {h:"Objective 2 — Reading a phylogeny", html:`
     <p class="lead"><b>Tips</b> = taxa/descendants; <b>nodes</b> = common ancestors (branch points); <b>root</b> = ancestor of all. Two tips are most closely related if they share the <b>most recent common ancestor</b>. Rotating branches at a node does not change relationships.</p>`},
   {h:"Objective 3 — Levels of classification", html:`
     <p class="lead"><b>Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species</b> (Dear King Phillip Came Over For Great Spaghetti). Lower = more specific, fewer species, more closely related.</p>`},
   {h:"Objective 4 — Monophyletic / paraphyletic / polyphyletic", html:`
     <table class="dt"><tr><th>Group</th><th>Includes</th></tr>
     <tr><td><b>Monophyletic (clade)</b></td><td>An ancestor + ALL descendants</td></tr>
     <tr><td><b>Paraphyletic</b></td><td>An ancestor + SOME (not all) descendants</td></tr>
     <tr><td><b>Polyphyletic</b></td><td>Members from 2+ ancestors, excluding the common ancestor</td></tr></table>`},
   {h:"Objective 5 — Why paraphyletic groups exist", html:`
     <p class="lead">Traditional (Linnaean) classification grouped by <b>observable traits, not evolutionary history</b>, so it sometimes left out descendants. <b>Reptiles</b> is the example — it excludes birds even though birds share the same ancestor (some-but-not-all descendants = paraphyletic).</p>`},
   {h:"Objective 6 — Maximum parsimony", html:`
     <p class="lead">Score characters with an <b>outgroup</b> (shared = ancestral 0; novel = derived 1). <b>Synapomorphies</b> (shared derived states) group taxa. The best tree is the one with the <b>fewest steps</b> (Occam's razor).</p>`},
   {h:"Objective 7 — Ancestral/derived; the -morphies", html:`
     <p class="lead"><b>Plesiomorphy</b> = ancestral state; <b>apomorphy</b> = derived state; <b>autapomorphy</b> = derived state unique to one species; <b>synapomorphy</b> = derived state shared across taxa (evidence for a clade).</p>`},
   {h:"Objective 8 & 9 — Homology, homoplasy & convergent evolution", html:`
     <p class="lead"><b>Homology</b> = similarity from shared ancestry. <b>Homoplasy</b> = similarity NOT from a common ancestor, produced by <b>convergent evolution</b> (independent evolution under similar selective pressures, e.g., echolocation in bats & dolphins; flight in birds vs bats).</p>`},
   {h:"Objective 10 — Three models of evolution", html:`
     <p class="lead"><b>Phyletic gradualism</b> = slow incremental change. <b>Punctuated equilibria</b> = stasis + rapid change WITH cladogenesis. <b>Punctuated gradualism</b> = rapid change WITHOUT cladogenesis.</p>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] The branching of one lineage into two is:",opts:["Anagenesis","Cladogenesis","Homoplasy","Stasis"],a:1,exp:"Cladogenesis = branching → new species. Anagenesis = change within one lineage."},
   {type:"short",q:"[Obj 1] Define cladogenesis and anagenesis.",model:"Cladogenesis is the branching of a single lineage into two or more descendant lineages, producing new species. Anagenesis is the change of characteristics within a single lineage over time, without any branching.",pts:["Cladogenesis = branching → new species","Anagenesis = change within one lineage","No branching in anagenesis"]},
   {type:"mcq",q:"[Obj 2] A node on a phylogenetic tree represents:",opts:["A living species","A common ancestor / branch point","A mutation","Extinction"],a:1,exp:"Nodes are branch points = common ancestors."},
   {type:"mcq",q:"[Obj 2] Two species are most closely related when they:",opts:["Are drawn adjacent","Share the most recent common ancestor","Have long branches","Sit near the root"],a:1,exp:"Relatedness = most recent common ancestor, not drawn position."},
   {type:"mcq",q:"[Obj 3] The correct order from broadest to most specific is:",opts:["Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species","Kingdom, Domain, Class, Phylum, Order, Family, Genus, Species","Species, Genus, Family, Order, Class, Phylum, Kingdom, Domain","Domain, Phylum, Kingdom, Class, Order, Family, Genus, Species"],a:0,exp:"Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species."},
   {type:"mcq",q:"[Obj 4] A group containing an ancestor and ALL its descendants is:",opts:["Paraphyletic","Monophyletic","Polyphyletic","Convergent"],a:1,exp:"Monophyletic (a clade) = ancestor + all descendants."},
   {type:"mcq",q:"[Obj 4] A group with members from two separate ancestors, excluding their common ancestor, is:",opts:["Monophyletic","Paraphyletic","Polyphyletic","A clade"],a:2,exp:"Polyphyletic = multiple ancestors, common ancestor excluded."},
   {type:"mcq",q:"[Obj 5] 'Reptiles' (excluding birds) is paraphyletic because it:",opts:["Includes members of two ancestors","Includes an ancestor and all descendants","Includes an ancestor and some but not all descendants","Has no common ancestor"],a:2,exp:"It omits birds, which descend from the same ancestor → some but not all descendants."},
   {type:"short",q:"[Obj 4 & 5] Define monophyletic, paraphyletic, and polyphyletic, and explain why 'reptiles' is paraphyletic.",model:"A monophyletic group (clade) is an ancestor and all of its descendants. A paraphyletic group is an ancestor and some but not all of its descendants. A polyphyletic group contains members from two or more ancestors but excludes their common ancestor. 'Reptiles' is paraphyletic because the traditional group includes the common ancestor and most descendants but excludes birds, which evolved from within that same group.",pts:["Mono = ancestor + all descendants","Para = ancestor + some descendants","Poly = multiple ancestors, common ancestor excluded","Reptiles excludes birds → paraphyletic"]},
   {type:"mcq",q:"[Obj 6] In maximum parsimony, the best tree is the one with the:",opts:["Most steps","Fewest evolutionary changes","Most species","Longest branches"],a:1,exp:"Most parsimonious = fewest changes (Occam's razor)."},
   {type:"mcq",q:"[Obj 6] Shared derived character states that group taxa are called:",opts:["Plesiomorphies","Synapomorphies","Autapomorphies","Homoplasies"],a:1,exp:"Synapomorphies (shared derived states) are the grouping evidence."},
   {type:"mcq",q:"[Obj 7] A derived character state unique to a single species is a(n):",opts:["Synapomorphy","Autapomorphy","Plesiomorphy","Apomorphy shared by all"],a:1,exp:"Autapomorphy = derived state in only one species."},
   {type:"short",q:"[Obj 7] Distinguish plesiomorphy, apomorphy, autapomorphy, and synapomorphy.",model:"A plesiomorphy is an ancestral character state. An apomorphy is a derived character state. An autapomorphy is a derived state unique to a single species. A synapomorphy is a derived state shared by two or more taxa, which is evidence that they form a clade.",pts:["Plesiomorphy = ancestral","Apomorphy = derived","Autapomorphy = derived, one species","Synapomorphy = derived, shared (clade evidence)"]},
   {type:"mcq",q:"[Obj 8] Similarity due to shared common ancestry is:",opts:["Homoplasy","Homology","Convergence","Analogy"],a:1,exp:"Homology = similarity from shared ancestry."},
   {type:"mcq",q:"[Obj 9] Wings in birds and bats (for flight) are an example of:",opts:["Homology","Homoplasy from convergent evolution","A synapomorphy uniting them","Genetic drift"],a:1,exp:"Flight evolved independently (feathers vs membranes) = homoplasy; though the arm bones are homologous."},
   {type:"tf",q:"[Obj 9] Convergent evolution results from different lineages experiencing similar selective pressures.",a:true,exp:"True — similar pressures produce similar (homoplasious) adaptations independently."},
   {type:"short",q:"[Obj 8 & 9] Define homology and homoplasy, and explain convergent evolution's link to homoplasy.",model:"Homology is similarity between characters due to shared common ancestry. Homoplasy is similarity that does not come from a common ancestor. Convergent evolution produces homoplasy: when different lineages face similar selective pressures they independently evolve similar traits, which resemble each other without being inherited from a shared ancestor — for example echolocation in bats and dolphins.",pts:["Homology = similarity from common ancestry","Homoplasy = similarity NOT from common ancestor","Convergent evolution = independent evolution, similar pressures","Convergence causes homoplasy"]},
   {type:"mcq",q:"[Obj 10] Long stasis interrupted by rapid change with branching describes:",opts:["Phyletic gradualism","Punctuated equilibria","Punctuated gradualism","Anagenesis"],a:1,exp:"Punctuated equilibria = stasis + rapid change WITH cladogenesis."},
   {type:"short",q:"[Obj 10] Describe the three models of evolution and the key difference between the two punctuated models.",model:"Phyletic gradualism is slow, incremental change over time. Punctuated equilibria is long periods of stasis punctuated by rapid change that occurs with cladogenesis (branching into new species). Punctuated gradualism is rapid change within a lineage that occurs without cladogenesis. The key difference is that punctuated equilibria involves branching (cladogenesis) while punctuated gradualism does not.",pts:["Phyletic gradualism = slow incremental","Punctuated equilibria = stasis + rapid change WITH cladogenesis","Punctuated gradualism = rapid change WITHOUT cladogenesis","Difference = presence/absence of cladogenesis"]}
  ]
 };

})();

/* ===================== LECTURE 7 — Molecular Systematics ===================== */
(function(){
 const c=(n)=>({src:"slides/L7/slide-"+String(n).padStart(2,"0")+".jpg",cap:"L7 · Slide "+n});
 const L7={
  id:"L7", icon:"🔬", short:"L7 · Molecular Systematics",
  title:"Lecture 7 — Molecular Systematics",
  blurb:"Using DNA as character data: limits of morphology, coding vs non-coding DNA, the sample-to-phylogeny pipeline, phylogenies as hypotheses, and applications.",
  objectives:[
   "Describe the limitations of morphology-based phylogenies",
   "Understand how DNA can be used as character data",
   "Describe the differences in use of coding vs non-coding DNA in molecular systematics",
   "Describe the process of creating a phylogeny from sample collection to phylogenetic inference",
   "Compare and contrast field-based vs museum-based samples for DNA extraction",
   "Explain why a phylogeny is a hypothesis",
   "Describe the applications of molecular systematics"
  ],
  topics:[
   {id:"L7T1", title:"Recap: inferring phylogenies & parsimony", sub:"The foundation carried over from Lecture 6 (slides 1–8).",
    slides:[
     {h:"Phylogenetics, homologous characters, ancestral vs derived", imgs:[c(3),c(4),c(6)], html:`
       <p class="lead">Quick recap: <b>phylogenetics</b> uncovers relationships; <b>taxonomy</b> names/organizes; <b>systematics</b> classifies by evolutionary relationships. We infer trees from <span class="kw">homologous characters</span> (inherited from a common ancestor) and their <b>character states</b>.</p>
       <p>A state is <b>ancestral</b> if found in the common ancestor, <b>derived</b> if it evolved from the ancestral state. An <b>outgroup</b> (the sister group) determines <span class="kw-2">polarity</span> — which states are ancestral vs derived.</p>`},
     {h:"Maximum parsimony", imgs:[c(7),c(8)], html:`
       <p class="lead"><span class="kw">Maximum parsimony</span> compares states across homologous characters, scoring outgroup-shared states as ancestral (0) and novel ones as derived (1). The best tree is the one requiring the <b>fewest evolutionary changes</b> (Occam's razor). This lecture applies the same logic to <b>DNA</b>.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"In parsimony, character states shared with the outgroup are scored as:",opts:["Derived (1)","Ancestral (0)","Random","Missing"],a:1,exp:"Outgroup states are treated as ancestral (0); novel states are derived (1)."},
     {type:"mcq",q:"The best tree under maximum parsimony is the one that:",opts:["Has the most species","Requires the fewest evolutionary changes","Has the longest branches","Uses only morphology"],a:1,exp:"Most parsimonious = fewest changes (Occam's razor)."},
     {type:"short",q:"What does an outgroup do in phylogenetic inference?",model:"An outgroup is a comparison group, usually the sister group, that is used to determine the polarity of character states — that is, which states are ancestral and which are derived. States shared with the outgroup are treated as ancestral.",pts:["Comparison group / sister group","Determines polarity","Shared-with-outgroup = ancestral"]}
    ]},
   {id:"L7T2", title:"Limitations of morphology-based phylogenies", sub:"Why we turn to DNA (slides 9–10).",
    slides:[
     {h:"Three limitations", imgs:[c(9),c(10)], html:`
       <p class="lead">Building trees from morphology has real problems:</p>
       <ol><li><b>Limited to measurable traits</b> — you can only use traits you can feasibly measure. (Leaf length: 5 individuals × 20 min × 250 species = 400+ hours for a single trait.)</li>
       <li><b>Subjectivity in trait coding</b> — one person's "orange" is another's "brown"; scoring is not always objective.</li>
       <li><span class="kw">Convergent evolution</span> — similar traits evolving independently can <b>mislead</b> us into thinking two species are more closely related than they are (e.g., platypus vs beaver look alike but aren't close relatives).</li></ol>`}
    ],
    quiz:[
     {type:"mcq",q:"Which is a limitation of morphology-based phylogenies?",opts:["DNA is too cheap","Convergent evolution can make unrelated species look closely related","There are too many nucleotides","Morphology evolves too fast"],a:1,exp:"Convergent evolution (homoplasy) can mislead morphology-based trees."},
     {type:"mcq",q:"Why is trait coding a limitation of morphological phylogenies?",opts:["Traits are unlimited","It can be subjective (e.g., color judged differently by different people)","It is always automated","DNA is required to see traits"],a:1,exp:"Subjectivity in coding traits (like color) is a key limitation."},
     {type:"tf",q:"Morphological phylogenies are limited to traits that can be feasibly measured.",a:true,exp:"True — you can only use characters you can practically observe and measure, which is time-consuming."},
     {type:"short",q:"Describe two limitations of morphology-based phylogenies.",model:"First, morphology is limited to traits that can be feasibly measured, which is time-consuming and restricts how many characters are available. Second, coding traits can be subjective — for example, different observers may score color differently. A third issue is convergent evolution, where independently evolved similar traits can mislead us into grouping unrelated species together.",pts:["Limited to measurable traits (time-consuming)","Subjectivity in trait coding","Convergent evolution misleads (homoplasy)"]}
    ]},
   {id:"L7T3", title:"Molecular systematics: DNA as character data", sub:"Nucleotides become the characters (slides 11–16).",
    slides:[
     {h:"What molecular systematics is", imgs:[c(11),c(12)], html:`
       <p class="lead"><span class="kw">Molecular systematics</span> uses <b>DNA, mitochondrial, or chloroplast sequences</b> to infer evolutionary relationships.</p>
       <ul><li>Characters are now <b>nucleotides</b>, not morphological traits.</li>
       <li><b>Thousands</b> of characters can be used → greater resolution and accuracy.</li></ul>`},
     {h:"DNA as evolutionary data", imgs:[c(13),c(15),c(16)], html:`
       <p class="lead">Every species has a unique DNA sequence. During <b>cladogenesis</b>, lineages separate, and over time <span class="kw">mutations accumulate</span> between them.</p>
       <div class="callout key">The <b>more similar</b> two sequences are, the <b>more recently</b> they likely shared a common ancestor. We count the number of nucleotide changes to infer relationships.</div>
       <p>Both morphology and DNA work the same way — measuring character-state change from ancestral to derived:</p>
       <table class="dt"><tr><th>Data</th><th>Character</th><th>States</th></tr>
       <tr><td>Morphology</td><td>Feather color</td><td>Red or blue</td></tr>
       <tr><td>DNA</td><td>Nucleotide position</td><td>A, T, C, G</td></tr></table>`}
    ],
    quiz:[
     {type:"mcq",q:"In molecular systematics, the 'characters' are:",opts:["Feather colors","Nucleotide positions (A, T, C, G)","Body sizes","Behaviors"],a:1,exp:"Characters are nucleotide positions; the states are A, T, C, or G."},
     {type:"mcq",q:"If two species' DNA sequences are very similar, it suggests they:",opts:["Shared a common ancestor recently","Are unrelated","Have identical morphology","Evolved by convergence"],a:0,exp:"More similar sequences = more recently shared a common ancestor (fewer accumulated changes)."},
     {type:"mcq",q:"An advantage of molecular over morphological data is that:",opts:["It uses fewer characters","Thousands of characters (nucleotides) can be used for greater resolution","It never changes","It requires no sequencing"],a:1,exp:"Molecular data offers thousands of characters, giving higher resolution and accuracy."},
     {type:"short",q:"Explain how DNA is used as character data in phylogenetics.",model:"In molecular systematics, each nucleotide position in an aligned DNA sequence is treated as a character, and its state is one of the four bases (A, T, C, or G). Because mutations accumulate between lineages after they split, the number of nucleotide differences between species reflects how long ago they diverged: more similar sequences indicate a more recent common ancestor.",pts:["Character = nucleotide position; states = A/T/C/G","Mutations accumulate after lineages split","More similar sequence = more recent common ancestor","Thousands of characters → high resolution"]}
    ]},
   {id:"L7T4", title:"Loci; coding vs non-coding DNA", sub:"Choosing the right DNA for the question (slides 17–21).",
    slides:[
     {h:"Molecular locus/loci", imgs:[c(17),c(18)], html:`
       <p class="lead">A <span class="kw">locus</span> = a specific location/position on a chromosome or in the genome; often a gene, but any defined stretch of DNA. Early molecular systematics targeted <b>universal loci</b>: <b>COI</b> (cytochrome c oxidase subunit I) for animals, <b>rbcL</b> for plants. Modern methods target hundreds of loci; each nucleotide serves as a character.</p>`},
     {h:"Coding vs non-coding DNA", imgs:[c(19),c(20),c(21)], html:`
       <table class="dt"><tr><th></th><th>Coding DNA</th><th>Non-coding DNA</th></tr>
       <tr><td>Translated to protein?</td><td>Yes (enzymes, hormones)</td><td>No</td></tr>
       <tr><td>Evolution rate</td><td><b>Slow</b> — conserved; harmful changes removed by selection</td><td><b>Fast</b> — fewer functional constraints, more mutations</td></tr>
       <tr><td>Best for…</td><td><span class="kw">Deep / ancient</span> relationships (slow change = clear signal over long timescales)</td><td><span class="kw-2">Recent / shallow</span> relationships (more variation = better resolution among close taxa)</td></tr></table>
       <div class="callout key">Match the DNA to the timescale: <b>coding = deep</b> (old splits), <b>non-coding = shallow</b> (recent splits, closely related species).</div>`}
    ],
    quiz:[
     {type:"mcq",q:"A locus is:",opts:["A type of mutation","A specific location/position on a chromosome or in the genome","A whole chromosome","A protein"],a:1,exp:"A locus = a defined location in the genome (often a gene, but any defined stretch)."},
     {type:"mcq",q:"Coding DNA evolves slowly and is therefore best for studying:",opts:["Very recent divergences","Deep/ancient evolutionary relationships","Individual family trees","Nothing useful"],a:1,exp:"Conserved (slow-evolving) coding DNA gives a clear signal over long timescales — deep relationships."},
     {type:"mcq",q:"To resolve relationships among very closely related species, you would prefer:",opts:["Slow-evolving coding DNA","Fast-evolving non-coding DNA","Morphology only","No DNA"],a:1,exp:"Non-coding DNA evolves faster, giving more variation and better resolution among close relatives."},
     {type:"tf",q:"Coding DNA is conserved because harmful changes to it tend to be removed by natural selection.",a:true,exp:"True — because it makes proteins, changes are often deleterious and selected against, keeping it conserved."},
     {type:"short",q:"Contrast coding and non-coding DNA and state which is better for deep vs shallow relationships.",model:"Coding DNA is transcribed and translated into proteins, so it is conserved and evolves slowly because harmful changes are removed by natural selection; its slow, clear signal makes it best for deep or ancient evolutionary relationships. Non-coding DNA is not translated and has fewer functional constraints, so it evolves faster and accumulates more variation, making it best for recent or shallow relationships among closely related taxa.",pts:["Coding = translated, conserved, slow → deep relationships","Non-coding = not translated, fast → shallow/recent relationships","Slow change = clear deep signal","More variation = resolution among close taxa"]}
    ]},
   {id:"L7T5", title:"From sample to phylogeny", sub:"The full pipeline (slides 22–31).",
    slides:[
     {h:"The five steps", imgs:[c(22)], html:`
       <p class="lead">The pipeline, in order:</p>
       <ol><li><b>Sample collection</b></li><li><b>DNA extraction</b></li><li><b>DNA sequencing</b></li><li><b>Sequence cleaning</b> (quality control + alignment)</li><li><b>Phylogenetic inference</b> — building the tree</li></ol>`},
     {h:"Sample collection: field vs. museum", imgs:[c(23),c(25)], html:`
       <table class="dt"><tr><th></th><th>Field-based</th><th>Museum-based</th></tr>
       <tr><td>Pros</td><td>Fresh tissue → <b>better-quality, non-degraded DNA</b></td><td><b>Cheap, fast</b>; can sample <b>extinct/rare</b> species</td></tr>
       <tr><td>Cons</td><td>Expensive, time-consuming, needs expert identification</td><td><b>Destructive</b> sampling; lower quality (age, specimen processing)</td></tr></table>`},
     {h:"Extraction, sequencing & alignment", imgs:[c(26),c(27),c(28),c(30)], html:`
       <ul><li><b>DNA extraction</b> — separating DNA from all other cellular material (lysis → binding → wash → elution → purified genomic DNA).</li>
       <li><b>Sequencing</b> — reads the exact order of nucleotides; Next-Generation Sequencing (NGS) gives millions of reads at once (but is expensive).</li>
       <li><b>Sequence cleaning</b> — remove low-quality reads, then <span class="kw">align</span> homologous regions across species so the <b>same nucleotide positions are compared</b>. Insertions/deletions require <b>gaps</b> so homologous nucleotides stay aligned.</li></ul>
       <div class="callout key">The output of alignment is a <span class="kw-2">Multiple Sequence Alignment (MSA)</span> — the basis for building the tree, letting you measure character (nucleotide) change between species.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"What is the correct order of the sample-to-phylogeny pipeline?",opts:["Sequencing → collection → extraction → alignment → tree","Collection → extraction → sequencing → cleaning/alignment → inference","Extraction → collection → tree → sequencing","Alignment → collection → extraction → sequencing"],a:1,exp:"Collect sample → extract DNA → sequence → clean/align → infer the tree."},
     {type:"mcq",q:"A key advantage of MUSEUM-based samples over field samples is that they:",opts:["Always have the best-quality DNA","Are cheap, fast, and can include extinct or rare species","Never require permission","Yield non-degraded DNA"],a:1,exp:"Museum samples are cheap/fast and can access rare/extinct specimens, but the DNA quality is lower and sampling is destructive."},
     {type:"mcq",q:"Sequence alignment is necessary because:",opts:["It makes sequences longer","Insertions/deletions would otherwise misalign homologous nucleotides","It removes all mutations","DNA cannot be read otherwise"],a:1,exp:"Alignment (adding gaps for indels) ensures the same homologous nucleotide positions are compared across species."},
     {type:"mcq",q:"The output of aligning sequences, used as the basis for tree-building, is a:",opts:["Punnett square","Multiple Sequence Alignment (MSA)","Karyotype","Codon table"],a:1,exp:"A Multiple Sequence Alignment (MSA) is the aligned dataset used to build phylogenetic trees."},
     {type:"short",q:"Compare field-based and museum-based samples for DNA extraction.",model:"Field-based samples provide fresh tissue and therefore better-quality, non-degraded DNA, but they are expensive, time-consuming, and require expert identification. Museum-based samples are cheap and fast and allow sampling of extinct or rare species, but the sampling is destructive and the DNA quality is lower because of the specimen's age and processing.",pts:["Field: fresh → better/non-degraded DNA; but costly, slow, needs ID","Museum: cheap, fast, extinct/rare species","Museum: destructive, lower-quality DNA"]}
    ]},
   {id:"L7T6", title:"Phylogenies are hypotheses", sub:"Best estimates, not final truth (slides 32–33).",
    slides:[
     {h:"A phylogeny is a hypothesis", imgs:[c(32),c(33)], html:`
       <p class="lead">A <span class="kw">phylogeny is a hypothesis</span> that can change as we add more data and use improved statistical methods.</p>
       <ul><li>Evolutionary history <b>cannot be observed directly</b>; we infer it from data (DNA, morphology) as evidence of change over time.</li>
       <li><b>Different data can produce different trees</b> — e.g., a morphology tree vs a DNA tree, or a tree from 12 loci vs one from 300 loci.</li></ul>
       <div class="callout key">A phylogeny is our <b>best estimate</b> of evolutionary relationships <b>given the data at hand</b> — not a fixed, proven fact.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Why is a phylogeny considered a hypothesis?",opts:["It is always wrong","It is a best estimate from current data and can change with more data/better methods","It cannot be tested","It is directly observed"],a:1,exp:"Evolutionary history isn't observed directly; a phylogeny is inferred and can change as evidence improves."},
     {type:"tf",q:"Different datasets (e.g., morphology vs DNA, or 12 vs 300 loci) can produce different phylogenetic trees.",a:true,exp:"True — trees depend on the data used, which is why a phylogeny is a hypothesis, not a fixed fact."},
     {type:"short",q:"Explain why a phylogeny is described as a hypothesis rather than a fact.",model:"Evolutionary history happened in the past and cannot be observed directly, so we can only infer relationships from data such as DNA or morphology used as evidence of change over time. Because different datasets and methods can yield different trees, any phylogeny is our best estimate of relationships given the data currently available, and it can be revised as more or better data are added — which makes it a testable hypothesis rather than a proven fact.",pts:["History can't be observed directly — it's inferred","Different data → different trees","Best estimate given current data","Revisable as data/methods improve"]}
    ]},
   {id:"L7T7", title:"Applications of molecular systematics", sub:"Cryptic species, divergence dating (slides 34–42).",
    slides:[
     {h:"Cryptic species identification", imgs:[c(34),c(35)], html:`
       <p class="lead"><span class="kw">Cryptic species</span> = morphologically similar species that are <b>genetically distinct</b>. Molecular data reveals this hidden biodiversity (common in fungi, insects, plants).</p>
       <ul><li><b>Anopheles gambiae</b> complex — major malaria vectors; <b>7 cryptic species</b> found with molecular data, differing in behavior and disease transmission.</li>
       <li><b>Astraptes fulgerator</b> — thought to be one species; COI sequencing revealed up to <b>10 cryptic species</b> feeding on different host plants.</li></ul>
       <p>This matters for disease management, taxonomy, and biodiversity/conservation (species-richness estimates).</p>`},
     {h:"Divergence dating", imgs:[c(37),c(39),c(40)], html:`
       <p class="lead"><span class="kw">Divergence dating</span> estimates <b>when</b> species or lineages split in evolutionary time. It requires:</p>
       <ul><li><b>Molecular data</b> (e.g., multiple loci)</li><li><b>Calibration points</b> (e.g., <span class="kw-2">fossils</span> of known age)</li></ul>
       <p>It answers questions like when a lineage migrated to an area, and whether lineage evolution is linked to geologic/climatic events (Isthmus of Panama, mountain formation).</p>`},
     {h:"Is morphology-based phylogenetics useless?", imgs:[c(42)], html:`
       <p class="lead"><b>No!</b> Morphology is still essential for species from which we <b>cannot extract DNA</b> — especially <span class="kw">extinct lineages</span> like dinosaurs, known only from fossils.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Cryptic species are:",opts:["Species that are extinct","Morphologically similar species that are genetically distinct","Species with no DNA","Species that only live underground"],a:1,exp:"Cryptic species look alike but are genetically distinct — revealed by molecular data."},
     {type:"mcq",q:"Divergence dating requires molecular data plus:",opts:["Only morphology","Calibration points such as fossils of known age","A single gene only","No additional information"],a:1,exp:"Divergence dating needs calibration points (e.g., dated fossils) to convert genetic distance into time."},
     {type:"mcq",q:"The Anopheles gambiae complex (7 cryptic species) is important because the species differ in:",opts:["Color only","Behavior and disease (malaria) transmission","Number of legs","Habitat temperature only"],a:1,exp:"The cryptic malaria-vector species vary in behavior and disease transmission — key for disease management."},
     {type:"tf",q:"Morphology-based phylogenetics is useless now that we have DNA.",a:false,exp:"False — morphology is still essential for organisms we can't get DNA from, such as extinct dinosaurs known only from fossils."},
     {type:"short",q:"Describe two applications of molecular systematics.",model:"One application is cryptic species identification: molecular data reveals morphologically similar species that are genetically distinct, uncovering hidden biodiversity — for example, the Anopheles gambiae malaria-vector complex or the Astraptes fulgerator butterflies. A second application is divergence dating, which estimates when lineages split using molecular data together with calibration points such as dated fossils, helping link evolution to geologic or climatic events.",pts:["Cryptic species = look alike, genetically distinct (hidden biodiversity)","Examples: Anopheles / Astraptes","Divergence dating = when lineages split","Needs molecular data + calibration (fossils)"]}
    ]}
  ]
 };
 window.COURSE.push(L7);

 window.FLASHCARDS.L7=[
  {f:"Molecular systematics",b:"Using DNA, mitochondrial, or chloroplast sequences to infer evolutionary relationships; characters are nucleotides."},
  {f:"Limitations of morphology-based phylogenies",b:"(1) limited to measurable traits, (2) subjective trait coding, (3) convergent evolution can mislead."},
  {f:"DNA as character data",b:"Character = a nucleotide position; states = A, T, C, G. Mutations accumulate between lineages after they split."},
  {f:"More similar DNA sequences →",b:"A more recent shared common ancestor (fewer accumulated changes)."},
  {f:"Locus",b:"A specific location/position on a chromosome or in the genome; often a gene, but any defined stretch of DNA."},
  {f:"Universal loci (early markers)",b:"COI (cytochrome c oxidase I) for animals; rbcL for plants."},
  {f:"Coding DNA",b:"Translated into proteins; conserved and slow-evolving (harmful changes removed by selection); best for DEEP/ancient relationships."},
  {f:"Non-coding DNA",b:"Not translated; evolves fast (few constraints); best for RECENT/shallow relationships among close taxa."},
  {f:"Sample-to-phylogeny pipeline",b:"Collection → DNA extraction → sequencing → sequence cleaning/alignment → phylogenetic inference (tree)."},
  {f:"Field vs museum samples",b:"Field: fresh, better DNA, but costly/slow/needs ID. Museum: cheap, fast, extinct/rare species, but destructive & lower quality."},
  {f:"DNA extraction",b:"Separating DNA from other cellular material (lysis → binding → wash → elution → purified genomic DNA)."},
  {f:"NGS (Next-Generation Sequencing)",b:"Reads millions of nucleotide sequences at once; powerful but expensive."},
  {f:"Sequence alignment",b:"Aligns homologous regions across species (adding gaps for insertions/deletions) so the same nucleotide positions are compared."},
  {f:"Multiple Sequence Alignment (MSA)",b:"The aligned dataset; the basis for building phylogenetic trees."},
  {f:"Phylogeny is a hypothesis",b:"Evolutionary history isn't observed directly; a tree is our best estimate from current data and can change with more data/better methods."},
  {f:"Cryptic species",b:"Morphologically similar but genetically distinct species; revealed by molecular data (e.g., Anopheles gambiae, Astraptes fulgerator)."},
  {f:"Divergence dating",b:"Estimates WHEN lineages split; needs molecular data + calibration points (e.g., fossils of known age)."},
  {f:"Is morphology useless?",b:"No — still essential for organisms we can't extract DNA from, e.g., extinct lineages like dinosaurs."}
 ];

 window.OBJMASTERY.L7={
  id:"L7OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 7 objectives — taught and tested point by point.",
  slides:[
   {h:"Objective 1 — Limits of morphology-based phylogenies", html:`
     <p class="lead">Three limits: (1) restricted to <b>traits you can feasibly measure</b> (very time-consuming); (2) <b>subjective coding</b> (e.g., color); (3) <b>convergent evolution</b> can make unrelated species look closely related (homoplasy).</p>`},
   {h:"Objective 2 — DNA as character data", html:`
     <p class="lead">Each <b>nucleotide position</b> is a character; its state is <b>A, T, C, or G</b>. Mutations accumulate after lineages split, so <b>more similar sequences = more recent common ancestor</b>. Thousands of characters give high resolution.</p>`},
   {h:"Objective 3 — Coding vs non-coding DNA", html:`
     <p class="lead"><b>Coding</b> = translated to protein, conserved, slow → <b>deep/ancient</b> relationships. <b>Non-coding</b> = not translated, fast-evolving → <b>recent/shallow</b> relationships among close taxa.</p>`},
   {h:"Objective 4 — Sample-to-phylogeny process", html:`
     <p class="lead">Collection → DNA extraction → sequencing → sequence cleaning (QC + alignment → MSA) → phylogenetic inference (build the tree, e.g., by parsimony).</p>`},
   {h:"Objective 5 — Field vs museum samples", html:`
     <p class="lead"><b>Field:</b> fresh tissue → better, non-degraded DNA; but expensive, slow, needs expert ID. <b>Museum:</b> cheap, fast, can access extinct/rare species; but destructive and lower-quality DNA.</p>`},
   {h:"Objective 6 — Why a phylogeny is a hypothesis", html:`
     <p class="lead">History can't be observed directly; we infer it from data. Different data/methods give different trees, so a phylogeny is the <b>best estimate given the data at hand</b> — revisable, testable.</p>`},
   {h:"Objective 7 — Applications", html:`
     <p class="lead"><b>Cryptic species ID</b> (look-alike but genetically distinct; e.g., Anopheles, Astraptes) and <b>divergence dating</b> (when lineages split; needs molecular data + fossil calibration).</p>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] Convergent evolution is a problem for morphological phylogenies because it:",opts:["Speeds up DNA sequencing","Makes unrelated species look closely related","Removes all traits","Requires fossils"],a:1,exp:"Independently evolved similar traits (homoplasy) can mislead grouping."},
   {type:"short",q:"[Obj 1] Give three limitations of morphology-based phylogenies.",model:"They are limited to traits that can be feasibly measured, which is time-consuming; trait coding can be subjective, such as judging color differently; and convergent evolution can make independently evolved similar traits mislead us into grouping unrelated species together.",pts:["Limited to measurable traits","Subjective trait coding","Convergent evolution/homoplasy misleads"]},
   {type:"mcq",q:"[Obj 2] In molecular systematics, a character and its states are:",opts:["A whole gene; on/off","A nucleotide position; A, T, C, G","A chromosome; long/short","A protein; folded/unfolded"],a:1,exp:"Character = nucleotide position; states = the four bases."},
   {type:"tf",q:"[Obj 2] The more nucleotide differences between two species, the more recently they diverged.",a:false,exp:"False — MORE differences means MORE time since divergence; fewer differences (more similar) = more recent common ancestor."},
   {type:"mcq",q:"[Obj 3] Slow-evolving, conserved coding DNA is best for resolving:",opts:["Very recent splits","Deep/ancient relationships","Family pedigrees","Nothing"],a:1,exp:"Its clear, slowly-changing signal suits deep relationships."},
   {type:"mcq",q:"[Obj 3] To distinguish closely related, recently diverged species you should use:",opts:["Coding DNA (slow)","Non-coding DNA (fast, more variation)","Morphology only","A single conserved gene"],a:1,exp:"Fast-evolving non-coding DNA gives the variation needed for shallow relationships."},
   {type:"short",q:"[Obj 3] Why is coding DNA used for deep relationships and non-coding DNA for recent ones?",model:"Coding DNA is translated into proteins and is conserved because harmful changes are removed by natural selection, so it evolves slowly and provides a clear signal over long timescales — ideal for deep, ancient relationships. Non-coding DNA is not translated and has fewer functional constraints, so it evolves faster and accumulates more variation, which gives better resolution among closely related, recently diverged species.",pts:["Coding = conserved/slow → deep signal","Non-coding = fast/variable → shallow resolution","Selection conserves coding DNA","Match DNA to the timescale"]},
   {type:"mcq",q:"[Obj 4] The correct pipeline order is:",opts:["Extraction → collection → sequencing → tree","Collection → extraction → sequencing → cleaning/alignment → inference","Sequencing → alignment → collection → extraction","Tree → collection → extraction"],a:1,exp:"Collect → extract → sequence → clean/align (MSA) → infer tree."},
   {type:"mcq",q:"[Obj 4] Alignment produces a Multiple Sequence Alignment, which is used to:",opts:["Extract DNA","Build the phylogenetic tree","Collect samples","Sequence DNA"],a:1,exp:"The MSA is the basis for tree-building, letting you measure nucleotide change between species."},
   {type:"mcq",q:"[Obj 5] Which is a con of FIELD-based sampling?",opts:["Lower-quality DNA","Expensive and time-consuming, needs expert ID","Can't sample living species","Always destructive"],a:1,exp:"Field sampling gives great DNA but is costly, slow, and needs expert identification."},
   {type:"short",q:"[Obj 5] Compare field-based and museum-based samples for DNA extraction.",model:"Field-based samples use fresh tissue and yield better-quality, non-degraded DNA, but they are expensive, time-consuming, and require expert identification. Museum-based samples are cheap and fast and allow sampling of rare or extinct species, but sampling is destructive and the DNA is lower quality due to the specimen's age and processing.",pts:["Field: fresh, high-quality DNA; costly/slow/needs ID","Museum: cheap, fast, extinct/rare species","Museum: destructive, lower-quality DNA"]},
   {type:"tf",q:"[Obj 6] Because a phylogeny is inferred from data, adding more data can change it.",a:true,exp:"True — a phylogeny is a hypothesis and our best estimate given current data; new data can revise it."},
   {type:"short",q:"[Obj 6] Explain why a phylogeny is a hypothesis.",model:"Evolutionary history occurred in the past and cannot be directly observed, so relationships are inferred from data such as DNA or morphology. Because different data and methods can produce different trees, a phylogeny is only our best estimate given the data at hand and can be revised as better or more data become available, making it a testable hypothesis rather than a proven fact.",pts:["History not directly observable — inferred","Different data → different trees","Best estimate given current data","Revisable/testable"]},
   {type:"mcq",q:"[Obj 7] Molecular data revealing look-alike but genetically distinct species is called:",opts:["Divergence dating","Cryptic species identification","Convergent evolution","Alignment"],a:1,exp:"Cryptic species identification uncovers genetically distinct species hidden within a single morphology."},
   {type:"mcq",q:"[Obj 7] Divergence dating additionally requires:",opts:["Only one nucleotide","Calibration points such as fossils","No molecular data","Museum specimens only"],a:1,exp:"Divergence dating needs molecular data plus calibration points (e.g., dated fossils)."},
   {type:"short",q:"[Obj 7] Describe the two applications of molecular systematics covered.",model:"Cryptic species identification uses molecular data to reveal morphologically identical but genetically distinct species, uncovering hidden biodiversity, as in the Anopheles gambiae malaria-vector complex or Astraptes fulgerator butterflies. Divergence dating estimates when lineages split in time using molecular data together with calibration points such as dated fossils, and can link diversification to geologic or climatic events.",pts:["Cryptic species = look-alike, genetically distinct","Examples: Anopheles / Astraptes","Divergence dating = timing of splits","Needs molecular data + fossil calibration"]}
  ]
 };
})();

/* ===================== LECTURES 8 & 9 (final-exam focus) ===================== */
(function(){
 const P=(L,n)=>({src:"slides/"+L+"/slide-"+String(n).padStart(2,"0")+".jpg",cap:L+" · Slide "+n});
 const c8=(n)=>P("L8",n), c9=(n)=>P("L9",n);

 /* ---------------- LECTURE 8 — EVOLUTIONARY BIOGEOGRAPHY ---------------- */
 const L8={
  id:"L8", icon:"🌎", short:"L8 · Evolutionary Biogeography",
  title:"Lecture 8 — Evolutionary Biogeography",
  blurb:"How taxa are distributed in space and change over time: Wallace & Humboldt, geographic barriers, vicariance vs dispersal, ancestral area reconstruction, and descriptive statistics.",
  objectives:[
   "Describe Alfred Wallace's and Alexander von Humboldt's contributions to evolutionary biology",
   "Describe how geographic barriers impact species distributions",
   "Describe vicariance and dispersal speciation mechanisms",
   "Interpret a phylogeny with ancestral area reconstruction",
   "Interpret measures of center and spread and know when to use which"
  ],
  topics:[
   {id:"L8T1", title:"Evolutionary biogeography & the niche", sub:"What it is; fundamental vs realized niche; BAM (slides 3–4, 25, 40).",
    slides:[
     {h:"What is evolutionary biogeography?", imgs:[c8(25),c8(40)], html:`
       <p class="lead"><span class="kw">Evolutionary biogeography</span> asks <b>why species are where they are — and not somewhere else</b>. It studies species distributions in <b>space and time</b> in the context of evolutionary relationships, integrating ecology, physical geography, and evolution.</p>
       <div class="callout key">Modern distributions reflect <b>both</b> present-day variables (the <b>BAM diagram</b>: Biotic ∩ Abiotic ∩ Movement) <b>and</b> historical events (geologic/climatic history over time).</div>`},
     {h:"Fundamental vs. realized niche (recap)", imgs:[c8(3),c8(4)], html:`
       <p><b>Fundamental niche</b> = the abiotic conditions a species could occupy in the <b>absence of competition</b> (full tolerances). <b>Realized niche</b> = the portion actually inhabited given <b>biotic factors and dispersal</b>. A species exists where <b>B ∩ A ∩ M</b> overlap.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Evolutionary biogeography studies species distributions in:",opts:["Space only","Time only","Space and time, in the context of evolutionary relationships","The lab only"],a:2,exp:"It integrates space, time, and evolutionary history to explain why species are where they are."},
     {type:"mcq",q:"Modern species distributions reflect:",opts:["Only present-day climate","Only historical events","Both present-day variables (BAM) and historical events","Neither"],a:2,exp:"Distributions reflect both current BAM factors and the historical/geologic record."},
     {type:"short",q:"What question is at the heart of evolutionary biogeography, and what two kinds of factors explain distributions?",model:"Evolutionary biogeography asks why species occur where they do and not elsewhere. Distributions are explained by present-day variables — the biotic, abiotic, and movement factors of the BAM diagram — and by historical events such as past geologic and climatic changes over evolutionary time.",pts:["Why species are where they are (and not elsewhere)","Present-day factors (BAM: biotic, abiotic, movement)","Historical/geologic events over time"]}
    ]},
   {id:"L8T2", title:"Alfred Wallace & geographic barriers", sub:"Wallace's Line, barriers, oceans & rivers (slides 5–15).",
    slides:[
     {h:"Alfred Wallace (1823–1913)", imgs:[c8(5),c8(6),c8(7),c8(10)], html:`
       <p class="lead"><span class="kw">Alfred Wallace</span> — British naturalist who independently theorized evolution by natural selection and made key observations about species distributions: they are <b>not random</b>, and environmental factors and <b>barriers</b> have big effects.</p>
       <p><b>Wallace's Line</b> (Malay Archipelago): west of the line = Asian animals (tigers, elephants, orangutans); east = Australian animals (kangaroos/marsupials, echidnas, cassowaries). Deep water separates them.</p>
       <div class="callout key">Wallace's insights: (1) similarity/dissimilarity of regions' inhabitants can't be explained by climate alone; (2) <b>barriers</b> (obstacles to migration) shape distributions; (3) <b>time</b> matters — present distributions reflect evolutionary and geologic history.</div>`},
     {h:"Geographical barriers: oceans & rivers", imgs:[c8(12),c8(13),c8(14)], html:`
       <p class="lead">A <span class="kw">barrier</span> is a physical feature that limits or prevents movement between regions.</p>
       <ul><li><b>Oceans</b> — shape biodiversity at <b>large</b> scales (whole lineages). Madagascar, separated from the mainland by the Indian Ocean for &gt;80 My, has endemic lineages: baobabs (9 species), lemurs (100 species).</li>
       <li><b>Rivers</b> — shape biodiversity at <b>smaller</b> scales (closely related species/populations). In the Amazon Basin, some tamarins and birds are found only north vs only south of the river.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"Alfred Wallace is known for independently proposing natural selection and for showing that species distributions are:",opts:["Completely random","Shaped by barriers and environmental factors, not random","Determined only by climate","Unrelated to geography"],a:1,exp:"Wallace showed distributions are non-random and strongly shaped by barriers."},
     {type:"mcq",q:"Wallace's Line separates the animals of:",opts:["North vs South America","Asia vs Australia (in the Malay Archipelago)","Africa vs Europe","Ocean vs land"],a:1,exp:"West of Wallace's Line = Asian fauna; east = Australian fauna, separated by deep water."},
     {type:"mcq",q:"Oceans (e.g., isolating Madagascar) shape biodiversity at which scale?",opts:["Small scale, closely related populations","Large evolutionary scale, whole lineages","No scale","Only for plants"],a:1,exp:"Oceans act at large scales, isolating entire lineages (baobabs, lemurs on Madagascar). Rivers act at smaller scales."},
     {type:"tf",q:"A river can act as a barrier separating closely related species or populations.",a:true,exp:"True — Amazon rivers separate north-only and south-only tamarins/birds; rivers shape biodiversity at smaller scales."},
     {type:"short",q:"What is a geographic barrier, and how do oceans vs rivers differ in the scale of biodiversity they shape?",model:"A geographic barrier is a physical feature, such as an ocean, mountain, or river, that limits or prevents the movement of organisms between regions. Oceans act at large evolutionary scales, isolating entire lineages — for example, Madagascar's baobabs and lemurs. Rivers act at smaller scales, separating closely related species or populations, such as tamarins found only north or south of an Amazon river.",pts:["Barrier = feature that limits/prevents movement","Oceans → large scale, whole lineages (Madagascar)","Rivers → small scale, closely related species/populations"]}
    ]},
   {id:"L8T3", title:"Humboldt, climate & environmental barriers", sub:"Elevation, climate, sky islands (slides 16–24).",
    slides:[
     {h:"Alexander von Humboldt (1769–1859)", imgs:[c8(16),c8(19),c8(20)], html:`
       <p class="lead"><span class="kw">Alexander von Humboldt</span> — German naturalist who explored the tropical Andes and documented patterns between species distributions, <b>climate, and elevation</b>. Different plant groups occupy different elevation bands (lowland forests → cloud forests → alpine grasslands).</p>
       <div class="callout key">Humboldt's key idea: species distributions reflect <b>abiotic conditions</b> — species are found in places where their <b>climatic requirements are met</b> (the Abiotic circle of BAM).</div>`},
     {h:"The environment as a barrier; sky islands", imgs:[c8(21),c8(22),c8(24)], html:`
       <p class="lead">The environment itself can be a <span class="kw">barrier</span> — a species can't disperse if an <b>unsuitable environment lies between</b> suitable areas.</p>
       <p><span class="kw-2">Sky islands</span>: mountaintops with suitable habitat separated by unsuitable lowlands, isolating species on the peaks (like islands in a sea of unsuitable land). Over evolutionary time, geographic and climatic barriers isolate populations → <b>divergence and speciation</b>.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Alexander von Humboldt documented the relationship between species distributions and:",opts:["Predators","Climate and elevation","Gene flow","Fossils"],a:1,exp:"Humboldt linked distributions to climate and elevation in the Andes."},
     {type:"mcq",q:"A 'sky island' is:",opts:["A floating island","A mountaintop habitat isolated by unsuitable lowlands","An oceanic island","A cloud formation"],a:1,exp:"Sky islands are mountaintop habitats separated by unsuitable lowland — species are isolated on the peaks."},
     {type:"tf",q:"An unsuitable environment between two suitable areas can act as a barrier to dispersal.",a:true,exp:"True — the environment itself can be a barrier; species cannot disperse across unsuitable habitat (basis of sky islands)."},
     {type:"short",q:"Contrast Wallace's and Humboldt's contributions to evolutionary biogeography.",model:"Wallace showed that species distributions are non-random and strongly shaped by barriers to movement, such as the deep water of Wallace's Line separating Asian and Australian faunas, and emphasized that time and geologic history matter. Humboldt documented how species distributions track abiotic conditions — climate and elevation — showing that species occur where their climatic requirements are met, as seen in the elevation bands of Andean plants.",pts:["Wallace: barriers shape non-random distributions (Wallace's Line)","Wallace: time/geologic history matter","Humboldt: distributions track climate & elevation","Humboldt: species where climatic requirements are met"]}
    ]},
   {id:"L8T4", title:"Speciation: vicariance vs. dispersal", sub:"How barriers make new species (slides 26–39).",
    slides:[
     {h:"Species & speciation basics", imgs:[c8(26),c8(27),c8(28)], html:`
       <p class="lead">A <b>species</b> (for now) = a group that can interbreed and produce fertile offspring; <b>gene flow occurs within species</b>. <span class="kw">Speciation</span> = one species splitting into two (cladogenesis). It <b>requires reproductive isolation</b> — a <b>reduction in gene flow</b> between the groups — driven by natural selection, mutation, geographic isolation, etc., which lets genetic/morphological differences accumulate.</p>`},
     {h:"Vicariance", imgs:[c8(31),c8(33)], html:`
       <p class="lead"><span class="kw">Vicariance</span>: a <b>continuous population is split by a chance event</b> — a mountain rises, a river changes course, etc. It ends with two populations that <b>have no gene flow</b>.</p>
       <p><b>Example:</b> the Isthmus of Panama forming split marine organisms into Atlantic vs Pacific species (fish, snapping shrimp).</p>`},
     {h:"Dispersal", imgs:[c8(35),c8(36),c8(38)], html:`
       <p class="lead"><span class="kw">Dispersal</span>: within one continuous population, a group of <b>colonists moves to a new area</b> (e.g., island colonization). It also ends with two populations that <b>have no gene flow</b>.</p>
       <p><b>Example:</b> ~50 Mya a small population of monkeys rafted from Africa to South America — that single dispersal event founded all New World monkeys.</p>
       <div class="callout key"><b>Vicariance vs dispersal:</b> in vicariance a <b>barrier appears</b> and divides a population in place; in dispersal <b>organisms move</b> across to a new area. Both end in two populations with no gene flow.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Vicariance is when:",opts:["Colonists move to a new area","A continuous population is split by a barrier (e.g., a river changes course)","Two species merge","Gene flow increases"],a:1,exp:"Vicariance = a barrier arises and divides a once-continuous population in place."},
     {type:"mcq",q:"Dispersal (as a speciation mechanism) is when:",opts:["A barrier splits a population in place","A group of colonists moves to a new geographic area","Populations interbreed freely","A species goes extinct"],a:1,exp:"Dispersal = organisms move to a new area (e.g., island colonization), founding an isolated population."},
     {type:"mcq",q:"Monkeys rafting from Africa to South America ~50 Mya, founding all New World monkeys, is an example of:",opts:["Vicariance","Dispersal","Sympatry","Convergence"],a:1,exp:"A group crossed to a new area — that's dispersal."},
     {type:"tf",q:"Both vicariance and dispersal end with two populations that have no gene flow.",a:true,exp:"True — both produce reproductively isolated populations; they differ in whether the barrier appeared or the organisms moved."},
     {type:"short",q:"Compare vicariance and dispersal as mechanisms of speciation.",model:"In vicariance, a once-continuous population is split in place by a chance geographic event such as a mountain rising or a river changing course — the Isthmus of Panama dividing marine organisms is an example. In dispersal, a group of colonists from a continuous population moves to a new geographic area, such as monkeys rafting to South America. Both mechanisms end with two populations that no longer exchange genes, allowing them to diverge into separate species.",pts:["Vicariance = barrier splits population in place (Panama)","Dispersal = colonists move to a new area (monkeys)","Vicariance: barrier appears; dispersal: organisms move","Both → two populations, no gene flow"]}
    ]},
   {id:"L8T5", title:"Ancestral area reconstruction", sub:"Using phylogenies to track distributions through time (slides 41–47).",
    slides:[
     {h:"What it is", imgs:[c8(41),c8(42),c8(45)], html:`
       <p class="lead"><span class="kw">Ancestral area reconstruction</span> uses a phylogeny to model how lineages <b>moved through geographic space over time</b>. You assign each tip (species) a distribution (area), and mathematical models estimate the <b>ancestral distribution of each node</b> — then you make associations with geologic/climatic events.</p>
       <p>Example: <i>Miconia</i> (~500 species) — <b>where</b> did the lineage originate? (The northern Andes.) <b>When</b> did it disperse to other areas, and does it coincide with geologic/climatic events?</p>`},
     {h:"Interpreting a reconstruction", imgs:[c8(47)], html:`
       <p class="lead">On a reconstructed tree, <b>colored nodes</b> (a legend maps colors to areas, e.g., North America, South America, Caribbean) show the inferred ancestral location at each branch point. You read it to answer: where did the lineage originate, and how many times (and from where) did it disperse to a given area?</p>`}
    ],
    quiz:[
     {type:"mcq",q:"Ancestral area reconstruction uses a phylogeny to estimate:",opts:["The age of the Earth","How lineages moved through geographic space over time","DNA sequences","Population size"],a:1,exp:"It reconstructs the ancestral geographic distribution at each node to trace movement over time."},
     {type:"mcq",q:"In an ancestral area reconstruction, the colored nodes represent:",opts:["Mutations","The inferred ancestral geographic area at each branch point","Extinction events","Random noise"],a:1,exp:"Node colors (via a legend) show the inferred ancestral location, letting you trace origin and dispersals."},
     {type:"short",q:"What is ancestral area reconstruction, and what kinds of questions does it answer?",model:"Ancestral area reconstruction is a method that uses a phylogeny, with each tip assigned to a geographic area, and mathematical models to estimate the ancestral distribution at each node. It answers where a lineage originated and when and how many times it dispersed to other areas, and lets researchers link those movements to geologic or climatic events.",pts:["Uses phylogeny + tip areas + models","Estimates ancestral distribution at each node","Answers where a lineage originated","Answers when/how it dispersed; links to geologic events"]}
    ]},
   {id:"L8T6", title:"Descriptive statistics & measures of center", sub:"Summarizing data; mean vs median (slides 48–56).",
    slides:[
     {h:"Descriptive statistics", imgs:[c8(49),c8(51)], html:`
       <p class="lead">The world is big and observers are few, so we take <b>samples</b> to estimate the properties of a larger population.</p>
       <ul><li><span class="kw">Descriptive statistics</span> — <b>summarize and describe</b> data (patterns, trends, outliers). They do NOT predict from it.</li>
       <li><span class="kw-2">Inferential statistics</span> — use the sample to <b>infer</b> about the whole population (next lecture's territory).</li></ul>`},
     {h:"Measures of center: mean & median", imgs:[c8(53),c8(54),c8(55),c8(56)], html:`
       <p class="lead">Measures of center describe the <b>typical value</b> of a dataset.</p>
       <ul><li><b>Mean</b> = sum ÷ count. <b>Sensitive to outliers</b> (one extreme value pulls it: 4,8,10,12,40 → mean 15.6).</li>
       <li><b>Median</b> = the middle value when ordered. <b>Resistant to outliers</b> (that same set → median still 10).</li></ul>
       <div class="callout key"><b>When to use which:</b> use the <b>mean</b> when data are similar and <b>free of outliers</b>; use the <b>median</b> when there are obvious outliers that would skew the mean.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Descriptive statistics are used to:",opts:["Predict future data","Summarize and describe data","Prove causation","Replace sampling"],a:1,exp:"Descriptive statistics summarize/describe data; they do not predict from it (that's inferential statistics)."},
     {type:"mcq",q:"Which measure of center is MOST affected by an outlier?",opts:["Median","Mean","Both equally","Neither"],a:1,exp:"The mean is pulled by extreme values; the median is resistant to outliers."},
     {type:"mcq",q:"You have income data with a few extremely high values. Which measure of center best represents the 'typical' value?",opts:["Mean","Median","Range","Variance"],a:1,exp:"With obvious outliers, use the median — it isn't skewed by the extremes."},
     {type:"tf",q:"Two datasets can have the same mean but different amounts of variation.",a:true,exp:"True — the mean describes center, not spread; you need measures of spread to compare variation."},
     {type:"short",q:"Explain when you would use the mean versus the median.",model:"Use the mean when the data values are similar and free of outliers, because it uses all the values to represent the typical value. Use the median when there are obvious outliers, because the median is the middle value and is resistant to being skewed by extreme values, whereas the mean would be pulled toward the outlier.",pts:["Mean = sum/count; uses all values","Mean is skewed by outliers","Median = middle value; resistant to outliers","Use median when outliers are present"]}
    ]},
   {id:"L8T7", title:"Measures of spread", sub:"Range, variance, standard deviation (slides 57–66).",
    slides:[
     {h:"Range, variance & standard deviation", imgs:[c8(57),c8(59),c8(61),c8(65)], html:`
       <p class="lead">Measures of spread quantify how <b>dispersed</b> the data are around the center (the amount of variation).</p>
       <table class="dt"><tr><th>Measure</th><th>What it is</th></tr>
       <tr><td><b>Range</b></td><td>Largest − smallest value (a quick estimate of spread)</td></tr>
       <tr><td><b>Variance (s²)</b></td><td>Average of the squared differences from the mean: <span class="f">s² = Σ(xᵢ − x̄)² / (n−1)</span> (n−1 corrects for samples underestimating true variance)</td></tr>
       <tr><td><b>Standard deviation</b></td><td>The <b>square root of the variance</b> — the average distance of observations from the mean</td></tr></table>
       <div class="callout key"><b>Interpretation:</b> a <b>larger</b> range, variance, or standard deviation = <b>more spread / more variation</b> in the data. Two populations with the same mean can differ greatly in spread (e.g., means both 10, but SDs 1.58 vs 4.47 → the second is much more variable).</div>`}
    ],
    quiz:[
     {type:"mcq",q:"The range of a dataset is:",opts:["The middle value","The largest minus the smallest value","The square root of the variance","The average"],a:1,exp:"Range = max − min, a quick estimate of spread."},
     {type:"mcq",q:"Standard deviation is:",opts:["The sum of all values","The square root of the variance","The most frequent value","Always zero"],a:1,exp:"Standard deviation = √variance; it measures the average distance of observations from the mean."},
     {type:"mcq",q:"Population A has SD = 1.58 and Population B has SD = 4.47 (same mean). This tells you:",opts:["A has more variation","B has more variation / spread","They are identical","B has a higher mean"],a:1,exp:"A larger standard deviation means more spread — Population B is more variable."},
     {type:"tf",q:"A larger variance indicates the data are more spread out around the mean.",a:true,exp:"True — variance and standard deviation both increase with more dispersion around the mean."},
     {type:"short",q:"Two populations have the same mean but Population B has a much larger standard deviation. Interpret this.",model:"Because the two populations share the same mean, their typical values are the same. However, the larger standard deviation in Population B means its values are more spread out around the mean — it has greater variation. So even though an average individual is similar, Population B contains more variability among its members than Population A.",pts:["Same mean = same typical/center value","Larger SD = more spread/variation","B is more variable around the mean","Center and spread are different properties"]}
    ]}
  ]
 };

 /* ---------------- LECTURE 9 — SPECIES & SPECIATION ---------------- */
 const L9={
  id:"L9", icon:"🐦", short:"L9 · Species & Speciation",
  title:"Lecture 9 — Species & Speciation",
  blurb:"What a species is (three species concepts), why a species is a hypothesis, reproductive isolation, allopatric vs sympatric speciation, and adaptive radiations.",
  objectives:[
   "Explain each of the species concepts and be able to apply them appropriately",
   "Define speciation and how it can occur",
   "Explain why reproductive isolation is necessary for speciation",
   "Identify and describe prezygotic and postzygotic barriers",
   "Compare and contrast allopatric and sympatric speciation and identify examples of each",
   "Explain what an adaptive radiation is"
  ],
  topics:[
   {id:"L9T1", title:"What is a species?", sub:"Why defining a species is hard (slides 1–10).",
    slides:[
     {h:"Species — the basic unit", imgs:[c9(2)], html:`
       <p class="lead">A <span class="kw">species</span> is the principle taxonomic unit for classifying life (…Genus → <b>Species</b>) and the basic unit of biodiversity, used in conservation, ecology, evolution, and taxonomy. But defining one is surprisingly hard.</p>`},
     {h:"Why it's hard: two problems", imgs:[c9(7),c9(8),c9(9),c9(10)], html:`
       <p class="lead">Two things break simple definitions:</p>
       <ul><li><span class="kw">Phenotypic plasticity</span> — one species can look like several. <i>Bicyclus anynana</i> butterflies have very different wing morphs depending on temperature/precipitation, yet are <b>one species</b>.</li>
       <li><span class="kw">Cryptic species</span> — several species can look identical. Four <i>Papilio</i> butterflies are morphologically identical but <b>don't interbreed</b> (different breeding seasons/ranges) and are genetically distinct — <b>separate species</b>.</li></ul>`}
    ],
    quiz:[
     {type:"mcq",q:"A single species that appears as several different forms due to environmental conditions shows:",opts:["Cryptic species","Phenotypic plasticity","Reproductive isolation","Convergence"],a:1,exp:"Phenotypic plasticity: one species (e.g., Bicyclus) takes different forms in different environments."},
     {type:"mcq",q:"Several morphologically identical but genetically distinct, non-interbreeding forms are:",opts:["One species with plasticity","Cryptic species","A hybrid","An adaptive radiation"],a:1,exp:"Cryptic species look alike but are distinct species (e.g., the four Papilio)."},
     {type:"short",q:"Why is it difficult to define a species? Give the two problems from the lecture.",model:"Defining a species is hard because appearance is unreliable. Phenotypic plasticity means a single species can look like several different forms depending on the environment, as in Bicyclus butterflies. Conversely, cryptic species are separate species that look identical yet do not interbreed and are genetically distinct, as in the four Papilio butterflies. So neither 'looks the same' nor 'looks different' reliably delimits species.",pts:["Phenotypic plasticity: one species, many forms (Bicyclus)","Cryptic species: many species, one look (Papilio)","Appearance alone is unreliable"]}
    ]},
   {id:"L9T2", title:"Morphological species concept", sub:"Defining species by physical traits (slides 11–17).",
    slides:[
     {h:"Morphological species concept", imgs:[c9(12),c9(15),c9(16),c9(17)], html:`
       <p class="lead">The <span class="kw">Morphological Species Concept</span> defines species by <b>observable physical traits</b> (flower color, petal number, size, etc.).</p>
       <table class="dt"><tr><th>Pros</th><th>Cons (limitations)</th></tr>
       <tr><td>Works on <b>fossils / extinct organisms</b>; relatively easy (you need eyes, not a DNA sequencer)</td><td>Fails for <b>phenotypic plasticity</b> (would call one species three) and <b>cryptic species</b> (would call several species one)</td></tr></table>`}
    ],
    quiz:[
     {type:"mcq",q:"The Morphological Species Concept defines species by:",opts:["Ability to interbreed","Observable physical traits","DNA sequences","Geographic range"],a:1,exp:"It uses observable morphology (physical traits)."},
     {type:"mcq",q:"A key ADVANTAGE of the morphological species concept is that it:",opts:["Works on asexual organisms","Can be applied to fossils and extinct organisms","Never misidentifies species","Uses DNA"],a:1,exp:"It can be used on fossils/extinct organisms and is relatively easy (no DNA needed)."},
     {type:"mcq",q:"A limitation of the morphological species concept is that it struggles with:",opts:["Fossils","Phenotypic plasticity and cryptic species","Large organisms","Common species"],a:1,exp:"Plasticity (one species looks like many) and cryptic species (many look like one) both mislead it."},
     {type:"short",q:"State the morphological species concept and one pro and one con.",model:"The morphological species concept defines species based on observable physical traits. Its advantage is that it can be applied to fossils and extinct organisms and is easy because it requires only observation rather than DNA. Its limitation is that it is misled by phenotypic plasticity, where one species looks like several, and by cryptic species, where several species look identical.",pts:["Defines species by physical traits","Pro: works on fossils/extinct; easy","Con: fooled by plasticity and cryptic species"]}
    ]},
   {id:"L9T3", title:"Biological species concept", sub:"Defining species by interbreeding (slides 18–24).",
    slides:[
     {h:"Biological species concept", imgs:[c9(18),c9(20),c9(22),c9(24)], html:`
       <p class="lead">The <span class="kw">Biological Species Concept</span> defines species as groups of <b>interbreeding populations that are reproductively isolated</b> from others. It focuses on <b>reproductive barriers</b> (prezygotic and postzygotic) and is grounded in <b>reproductive isolation</b>, which maintains species boundaries.</p>
       <p>It correctly handles the earlier cases: the plastic <i>Bicyclus</i> morphs all interbreed → <b>one species</b>; the identical <i>Papilio</i> don't interbreed → <b>separate species</b>.</p>
       <table class="dt"><tr><th>Pros</th><th>Cons (limitations)</th></tr>
       <tr><td>Grounded in the actual process (reproductive isolation) that maintains species</td><td>Can't apply to <b>asexual organisms</b> (they reproduce without mating); <b>hybridization</b> blurs the lines (horse + donkey = mule)</td></tr></table>`}
    ],
    quiz:[
     {type:"mcq",q:"The Biological Species Concept defines a species as a group that:",opts:["Looks the same","Interbreeds and is reproductively isolated from others","Shares DNA barcodes","Lives in one area"],a:1,exp:"It centers on interbreeding populations that are reproductively isolated."},
     {type:"mcq",q:"A major limitation of the biological species concept is that it cannot be applied to:",opts:["Sexual animals","Asexual organisms","Plants that flower","Any species"],a:1,exp:"Asexual organisms reproduce without mating, so 'interbreeding' doesn't apply. Hybridization is another limitation."},
     {type:"tf",q:"The biological species concept is grounded in reproductive isolation.",a:true,exp:"True — it is based on reproductive barriers that maintain species boundaries."},
     {type:"short",q:"State the biological species concept and its two main limitations.",model:"The biological species concept defines species as groups of interbreeding populations that are reproductively isolated from other such groups, focusing on reproductive barriers. Its limitations are that it cannot be applied to asexual organisms, which reproduce without mating, and that hybridization between species can blur the boundaries of reproductive isolation.",pts:["Interbreeding, reproductively isolated populations","Based on reproductive barriers","Con: fails for asexual organisms","Con: hybridization blurs the lines"]}
    ]},
   {id:"L9T4", title:"Phylogenetic species concept & 'a species is a hypothesis'", sub:"Defining species by ancestry (slides 25–35).",
    slides:[
     {h:"Phylogenetic species concept", imgs:[c9(25),c9(28),c9(29),c9(30)], html:`
       <p class="lead">The <span class="kw">Phylogenetic Species Concept</span> defines a species as a group of organisms that share a <b>pattern of ancestry and descent</b> and are <b>genetically distinct</b> from other such groups (each with a unique evolutionary trajectory).</p>
       <table class="dt"><tr><th>Pros</th><th>Cons (limitations)</th></tr>
       <tr><td>Works for <b>asexual organisms</b>; can detect <b>cryptic species</b></td><td>Can't apply to <b>extinct species with no DNA</b>; hard to decide <b>where to draw the line</b> for "genetically distinct" (could be 2 species or 5)</td></tr></table>`},
     {h:"Overview & 'a species is a hypothesis'", imgs:[c9(32),c9(34)], html:`
       <table class="dt"><tr><th>Concept</th><th>Basis</th></tr>
       <tr><td>Morphological</td><td>Physical traits</td></tr>
       <tr><td>Biological</td><td>Reproductive isolation (interbreeding)</td></tr>
       <tr><td>Phylogenetic</td><td>Shared ancestry / genetic distinctness</td></tr></table>
       <div class="callout key"><b>No single concept is the "correct" one.</b> Different species concepts are used as <b>evidence</b> for defining species — so <b>a species is itself a hypothesis</b>, which can be revised.</div>`}
    ],
    quiz:[
     {type:"mcq",q:"The Phylogenetic Species Concept defines a species by:",opts:["Physical appearance","Ability to interbreed","Shared ancestry and genetic distinctness","Geographic location"],a:2,exp:"It uses shared pattern of ancestry/descent and genetic distinctness."},
     {type:"mcq",q:"An advantage of the phylogenetic species concept is that it:",opts:["Works only on living sexual species","Works for asexual organisms and can detect cryptic species","Requires no data","Never has ambiguity"],a:1,exp:"It handles asexual organisms and reveals cryptic species; but it can't be applied to extinct species lacking DNA."},
     {type:"tf",q:"Because different species concepts can disagree, a species is best thought of as a hypothesis.",a:true,exp:"True — no concept is definitively 'correct,' so species delimitations are hypotheses that can be revised."},
     {type:"short",q:"Briefly state the basis of each of the three species concepts, and explain why a species is called a hypothesis.",model:"The morphological species concept defines species by observable physical traits; the biological species concept defines them by interbreeding and reproductive isolation; and the phylogenetic species concept defines them by shared ancestry and genetic distinctness. Because these different concepts can lead to different conclusions and none is definitively correct, any species designation is really a hypothesis supported by a particular kind of evidence, and it can be revised as more data become available.",pts:["Morphological = physical traits","Biological = interbreeding/reproductive isolation","Phylogenetic = shared ancestry/genetic distinctness","No concept is 'correct' → species is a revisable hypothesis"]}
    ]},
   {id:"L9T5", title:"Speciation & reproductive isolation", sub:"Prezygotic & postzygotic barriers (slides 36–45).",
    slides:[
     {h:"Speciation", imgs:[c9(37),c9(39),c9(40)], html:`
       <p class="lead"><span class="kw">Speciation</span> = the process by which <b>populations evolve to become distinct species</b>. It links <b>microevolution to macroevolution</b> and explains the diversity of life. It happens through the <b>absence of gene flow</b> between two populations, so genetic/phenotypic differences accumulate — and it can occur <b>with or without</b> geographic separation.</p>`},
     {h:"Reproductive isolation: prezygotic vs postzygotic", imgs:[c9(41),c9(43),c9(45)], html:`
       <p class="lead"><span class="kw">Reproductive isolation</span> is the key process: a mechanism that prevents reproduction/gene flow, keeping diverged populations separate even if they meet again.</p>
       <table class="dt"><tr><th>Barrier</th><th>Timing</th><th>Examples</th></tr>
       <tr><td><b>Prezygotic</b></td><td><b>Before</b> fertilization</td><td><b>Temporal</b> (reproduce at different times — <i>Mimulus</i> blooming seasons); <b>Mechanical</b> (incompatible reproductive structures — dragonfly genitalia)</td></tr>
       <tr><td><b>Postzygotic</b></td><td><b>After</b> fertilization</td><td>Reduced hybrid viability/fertility — hybrids are inviable or <b>sterile</b> (a mule is infertile)</td></tr></table>`}
    ],
    quiz:[
     {type:"mcq",q:"Why is reproductive isolation necessary for speciation?",opts:["It increases gene flow","It prevents gene flow, so diverged populations stay separate","It speeds up mutation","It merges populations"],a:1,exp:"Without reproductive isolation, gene flow would homogenize populations; isolation lets them diverge and stay distinct."},
     {type:"mcq",q:"Two flower species blooming in different months (so they never cross-pollinate) is a ____ barrier.",opts:["Postzygotic","Prezygotic (temporal)","Mechanical only","Hybrid sterility"],a:1,exp:"Different timing prevents mating before fertilization — a prezygotic (temporal) barrier."},
     {type:"mcq",q:"A mule being sterile is an example of a:",opts:["Prezygotic barrier","Postzygotic barrier (reduced hybrid fertility)","Temporal barrier","Mechanical barrier"],a:1,exp:"The hybrid forms but is sterile — a postzygotic barrier (acts after fertilization)."},
     {type:"tf",q:"Prezygotic barriers act before fertilization and postzygotic barriers act after fertilization.",a:true,exp:"True — that timing is exactly how the two are distinguished."},
     {type:"short",q:"Distinguish prezygotic and postzygotic barriers and give an example of each.",model:"Prezygotic barriers prevent mating or fertilization from happening in the first place; examples include temporal isolation, where species reproduce at different times (as in Mimulus species that bloom in different months), and mechanical isolation, where reproductive structures are incompatible (as in dragonfly genitalia). Postzygotic barriers act after fertilization, reducing the viability or fertility of hybrids; for example, a mule (horse × donkey) is sterile and cannot reproduce.",pts:["Prezygotic = before fertilization (temporal, mechanical)","Example: Mimulus blooming times / dragonfly genitalia","Postzygotic = after fertilization","Example: sterile mule (reduced hybrid fertility)"]}
    ]},
   {id:"L9T6", title:"Allopatric vs. sympatric speciation", sub:"With or without geographic separation (slides 46–62).",
    slides:[
     {h:"The two types", imgs:[c9(46),c9(48),c9(53)], html:`
       <table class="dt"><tr><th>Type</th><th>Definition</th></tr>
       <tr><td><b>Allopatric</b></td><td>Occurs when populations are <b>geographically separated</b> (a barrier prevents gene flow; differences accumulate → two species). <b>Same idea as vicariance.</b></td></tr>
       <tr><td><b>Sympatric</b></td><td>Occurs <b>within the same geographic area</b> (no physical separation)</td></tr></table>`},
     {h:"Allopatric — geographic separation (Isthmus of Panama)", imgs:[c9(56),c9(59),c9(61)], html:`
       <p class="lead"><span class="kw">Allopatric speciation</span>: a barrier separates populations and prevents gene flow; over time genetic/phenotypic differences accumulate → two species. The <b>Isthmus of Panama</b> rising created a barrier between two oceans, driving allopatric speciation in fish, snapping shrimp, and sea anemones (Atlantic vs Pacific species).</p>`},
     {h:"Sympatric — same area (ecological specialization)", imgs:[c9(54),c9(55),c9(62)], html:`
       <p class="lead"><span class="kw">Sympatric speciation</span>: speciation <b>within the same area</b>, often via <b>ecological specialization</b>. <b>Disruptive selection</b> favors both extremes and selects against intermediates (e.g., mouse coat color on lava vs sand), or organisms specialize to different niches in the same place (e.g., birds specializing to different rainforest layers).</p>
       <div class="callout key"><b>Key contrast:</b> allopatric = <b>geographically separated</b> (a barrier); sympatric = <b>same geographic area</b> (no physical barrier — divergence via ecology/disruptive selection).</div>`}
    ],
    quiz:[
     {type:"mcq",q:"Allopatric speciation occurs when populations are:",opts:["In the same area","Geographically separated","Asexual","Identical"],a:1,exp:"Allopatric = geographic separation (the same idea as vicariance)."},
     {type:"mcq",q:"Sympatric speciation occurs:",opts:["Across an ocean","Within the same geographic area","Only in fossils","Only via mountains"],a:1,exp:"Sympatric = within the same area, with no physical separation (e.g., via disruptive selection/ecological specialization)."},
     {type:"mcq",q:"The Isthmus of Panama splitting marine organisms into Atlantic and Pacific species is an example of:",opts:["Sympatric speciation","Allopatric speciation","Adaptive radiation only","Hybridization"],a:1,exp:"A geographic barrier arose and separated populations — allopatric speciation (a vicariance event)."},
     {type:"mcq",q:"Disruptive selection favoring both extremes within one population, leading to divergence in the same area, is a mechanism of:",opts:["Allopatric speciation","Sympatric speciation","Vicariance","Dispersal"],a:1,exp:"No geographic barrier is needed — divergence happens in the same area, so it's sympatric."},
     {type:"short",q:"Compare allopatric and sympatric speciation and give an example of each.",model:"Allopatric speciation occurs when a geographic barrier separates populations and prevents gene flow, so differences accumulate until they become separate species — for example, the Isthmus of Panama splitting marine organisms into Atlantic and Pacific species. Sympatric speciation occurs within the same geographic area, without a physical barrier, often through ecological specialization or disruptive selection — for example, mice diverging by coat color on lava versus sand, or birds specializing to different rainforest layers.",pts:["Allopatric = geographic separation (= vicariance)","Example: Isthmus of Panama","Sympatric = same area, no barrier","Example: disruptive selection (lava/sand mice) or forest-layer birds"]}
    ]},
   {id:"L9T7", title:"Speed of speciation & adaptive radiations", sub:"Very slow to very fast (slides 63–69).",
    slides:[
     {h:"Speciation can be very slow… or very fast", imgs:[c9(63),c9(64),c9(65)], html:`
       <p class="lead"><b>Very slow:</b> coelacanths (<i>Latimeria</i>) show little morphological change in 400 million years and have no sister species; <i>Ginkgo biloba</i> is the only species in its family.</p>
       <p class="lead"><b>Very fast — adaptive radiation:</b> the <span class="kw">rapid evolution of many species from a single common ancestor</span>, associated with the <b>availability of new, unoccupied niches</b>, producing species that are <b>ecologically and morphologically diverse</b>.</p>
       <p>Examples: Hawaiian honeycreepers and Galápagos finches (beak diversity), Andean <i>Lupinus</i> (radiated with Andes uplift).</p>`},
     {h:"Adaptive radiation after the dinosaurs", imgs:[c9(67),c9(68)], html:`
       <p class="lead">After the <b>K/Pg extinction</b> wiped out the dinosaurs, the newly emptied niches drove a rapid <b>mammal adaptive radiation</b> — early small, rodent-like mammals diversified into the huge range of forms (flying, swimming, running, burrowing) we see today.</p>`}
    ],
    quiz:[
     {type:"mcq",q:"An adaptive radiation is:",opts:["The slow change of one lineage","The rapid evolution of many species from a single common ancestor","The extinction of a group","A type of reproductive barrier"],a:1,exp:"Adaptive radiation = rapid diversification of many species from one ancestor, usually into new niches."},
     {type:"mcq",q:"Adaptive radiations are typically associated with:",opts:["Loss of all niches","The availability of new, unoccupied niches","No environmental change","Reduced biodiversity"],a:1,exp:"New/unoccupied niches (e.g., after an extinction or reaching new islands) drive rapid diversification."},
     {type:"mcq",q:"The rapid diversification of mammals after the dinosaurs went extinct illustrates:",opts:["Slow speciation","An adaptive radiation into newly available niches","Sympatric speciation only","A postzygotic barrier"],a:1,exp:"The K/Pg extinction opened niches, triggering a mammal adaptive radiation."},
     {type:"tf",q:"Coelacanths, which changed little over 400 million years, are an example of very rapid speciation.",a:false,exp:"False — coelacanths exemplify very SLOW change (little morphological change over 400 My)."},
     {type:"short",q:"What is an adaptive radiation, and what conditions drive it? Give an example.",model:"An adaptive radiation is the rapid evolution of many species from a single common ancestor, producing descendants that are ecologically and morphologically diverse. It is driven by the availability of new, unoccupied niches, such as after a mass extinction or upon colonizing new environments. Examples include the Galápagos finches and Hawaiian honeycreepers with their diverse beaks, and the rapid diversification of mammals into many forms after the dinosaurs went extinct.",pts:["Rapid evolution of many species from one ancestor","Produces ecological & morphological diversity","Driven by new/unoccupied niches","Example: finches/honeycreepers, or mammals after K/Pg extinction"]}
    ]}
  ]
 };

 window.COURSE.push(L8, L9);

 /* ---------------- FLASHCARDS ---------------- */
 window.FLASHCARDS.L8=[
  {f:"Evolutionary biogeography",b:"Why species are where they are (and not elsewhere); distributions in space AND time, in the context of evolutionary relationships."},
  {f:"Modern distributions reflect…",b:"Both present-day variables (BAM: Biotic ∩ Abiotic ∩ Movement) and historical/geologic events."},
  {f:"Fundamental vs realized niche",b:"Fundamental = full tolerances without competition; realized = the part actually occupied given biotic factors & dispersal."},
  {f:"Alfred Wallace",b:"Independently proposed natural selection; showed distributions are non-random and shaped by barriers (Wallace's Line: Asia vs Australia)."},
  {f:"Barrier",b:"A physical feature that limits or prevents movement of organisms between regions."},
  {f:"Oceans as barriers",b:"Shape biodiversity at LARGE scales (whole lineages) — e.g., Madagascar's endemic baobabs & lemurs (isolated >80 My)."},
  {f:"Rivers as barriers",b:"Shape biodiversity at SMALLER scales (closely related species/populations) — e.g., Amazon tamarins north vs south of a river."},
  {f:"Alexander von Humboldt",b:"Linked species distributions to climate and elevation (Andes); species occur where their climatic (abiotic) requirements are met."},
  {f:"Environment as a barrier / sky islands",b:"Species can't cross unsuitable habitat; mountaintop 'sky islands' isolate species on peaks surrounded by unsuitable lowlands."},
  {f:"Speciation (biogeography)",b:"One species splitting into two; requires reproductive isolation (a reduction/absence of gene flow)."},
  {f:"Vicariance",b:"A continuous population is split in place by a barrier (mountain rises, river shifts) → two populations, no gene flow. E.g., Isthmus of Panama."},
  {f:"Dispersal",b:"A group of colonists moves to a new area (island colonization) → two populations, no gene flow. E.g., monkeys rafting to South America."},
  {f:"Vicariance vs dispersal",b:"Vicariance: the barrier appears and splits a population in place. Dispersal: the organisms move to a new area. Both → no gene flow."},
  {f:"Ancestral area reconstruction",b:"Uses a phylogeny (tips assigned to areas) + models to estimate the ancestral location at each node — tracing where a lineage originated and dispersed."},
  {f:"Descriptive vs inferential statistics",b:"Descriptive: summarize/describe data (patterns, outliers). Inferential: use a sample to infer about the whole population."},
  {f:"Mean vs median",b:"Mean = sum/count, sensitive to outliers. Median = middle value, resistant to outliers. Use median when outliers are present."},
  {f:"Range",b:"Largest − smallest value; a quick measure of spread."},
  {f:"Variance (s²)",b:"Average of squared differences from the mean: Σ(xᵢ − x̄)²/(n−1). Larger = more spread."},
  {f:"Standard deviation",b:"Square root of the variance; the average distance of observations from the mean. Larger = more variation."}
 ];
 window.FLASHCARDS.L9=[
  {f:"Species",b:"The principle taxonomic unit and basic unit of biodiversity; hard to define because appearance is unreliable."},
  {f:"Phenotypic plasticity (species problem)",b:"One species can look like several (e.g., Bicyclus wing morphs vary with temperature) — appearance overcounts species."},
  {f:"Cryptic species",b:"Several species can look identical but don't interbreed and are genetically distinct (e.g., four Papilio) — appearance undercounts species."},
  {f:"Morphological species concept",b:"Species defined by observable physical traits. Pro: works on fossils/extinct, easy. Con: fooled by plasticity & cryptic species."},
  {f:"Biological species concept",b:"Species = interbreeding populations that are reproductively isolated. Pro: based on the real process. Con: fails for asexual organisms; hybridization blurs it."},
  {f:"Phylogenetic species concept",b:"Species = a group sharing ancestry/descent, genetically distinct. Pro: works for asexual & cryptic species. Con: not for extinct (no DNA); where to draw the line?"},
  {f:"A species is a hypothesis",b:"No single concept is 'correct'; different concepts are evidence, so a species is a revisable hypothesis."},
  {f:"Speciation",b:"The process by which populations evolve into distinct species; links microevolution to macroevolution; needs absence of gene flow."},
  {f:"Reproductive isolation",b:"A mechanism preventing reproduction/gene flow; keeps diverged populations separate even if they meet again — necessary for speciation."},
  {f:"Prezygotic barriers",b:"Act BEFORE fertilization — temporal (different breeding times, e.g., Mimulus) and mechanical (incompatible reproductive structures)."},
  {f:"Postzygotic barriers",b:"Act AFTER fertilization — reduced hybrid viability/fertility (e.g., a mule is sterile)."},
  {f:"Allopatric speciation",b:"Populations geographically separated by a barrier (= vicariance) → divergence. E.g., Isthmus of Panama splitting oceans."},
  {f:"Sympatric speciation",b:"Speciation within the same geographic area (no physical barrier), via ecological specialization / disruptive selection (lava vs sand mice)."},
  {f:"Allopatric vs sympatric",b:"Allopatric = geographically separated (barrier). Sympatric = same area, no barrier (ecological divergence)."},
  {f:"Very slow speciation",b:"Coelacanths (little change in 400 My, no sister species); Ginkgo biloba (only species in its family)."},
  {f:"Adaptive radiation",b:"Rapid evolution of many ecologically & morphologically diverse species from one ancestor, driven by new unoccupied niches."},
  {f:"Adaptive radiation examples",b:"Galápagos finches, Hawaiian honeycreepers (beak diversity), Andean Lupinus, mammals after the K/Pg (dinosaur) extinction."}
 ];

 /* ---------------- OBJECTIVE MASTERY ---------------- */
 window.OBJMASTERY.L8={
  id:"L8OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 8 objectives — taught and tested point by point.",
  slides:[
   {h:"Objective 1 — Wallace & Humboldt", html:`
     <p class="lead"><b>Wallace</b>: distributions are non-random and shaped by <b>barriers</b> (Wallace's Line: Asia vs Australia); time/geologic history matter. <b>Humboldt</b>: distributions track <b>climate and elevation</b>; species occur where their climatic (abiotic) needs are met.</p>`},
   {h:"Objective 2 — Geographic barriers", html:`
     <p class="lead">Barriers limit movement. <b>Oceans</b> → large-scale isolation of whole lineages (Madagascar). <b>Rivers</b> → smaller-scale splits of closely related species (Amazon). The <b>environment itself</b> can be a barrier (sky islands).</p>`},
   {h:"Objective 3 — Vicariance vs dispersal", html:`
     <p class="lead"><b>Vicariance</b>: a barrier appears and splits a population <b>in place</b> (Isthmus of Panama). <b>Dispersal</b>: organisms <b>move</b> to a new area (monkeys to South America). Both end with two populations that have <b>no gene flow</b>.</p>`},
   {h:"Objective 4 — Ancestral area reconstruction", html:`
     <p class="lead">A phylogeny with tips assigned to areas + models estimates the <b>ancestral location at each node</b>, showing where a lineage originated and when/where it dispersed (and links to geologic events).</p>`},
   {h:"Objective 5 — Measures of center & spread", html:`
     <p class="lead"><b>Center:</b> mean (sensitive to outliers) vs median (resistant) — use median when outliers exist. <b>Spread:</b> range, variance, standard deviation — a larger value = more variation. Same mean can hide different spread.</p>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] Wallace's Line marks the boundary between the animals of:",opts:["North & South America","Asia & Australia","Africa & Europe","Land & sea"],a:1,exp:"West = Asian fauna, east = Australian fauna."},
   {type:"mcq",q:"[Obj 1] Humboldt is best known for linking species distributions to:",opts:["Predation","Climate and elevation","Gene flow","Fossils"],a:1,exp:"Humboldt connected distributions to climate and elevation in the Andes."},
   {type:"short",q:"[Obj 1] Summarize Wallace's and Humboldt's contributions.",model:"Wallace showed that species distributions are not random but are shaped by barriers to movement, as demonstrated by Wallace's Line separating Asian and Australian faunas, and he emphasized the role of time and geologic history. Humboldt documented that species distributions track abiotic conditions, particularly climate and elevation, so species are found where their climatic requirements are met.",pts:["Wallace: barriers → non-random distributions (Wallace's Line)","Wallace: time/history matter","Humboldt: distributions track climate & elevation","Humboldt: species where climatic needs are met"]},
   {type:"mcq",q:"[Obj 2] Oceans vs rivers as barriers differ in that oceans act at a ____ scale.",opts:["smaller","larger (whole lineages)","genetic","temporal only"],a:1,exp:"Oceans isolate whole lineages (large scale); rivers separate closely related species (smaller scale)."},
   {type:"tf",q:"[Obj 2] An unsuitable environment between two habitats can act as a dispersal barrier (as in sky islands).",a:true,exp:"True — species can't cross unsuitable habitat; sky islands isolate species on peaks."},
   {type:"mcq",q:"[Obj 3] A river changing course and splitting a salamander population in place is:",opts:["Dispersal","Vicariance","Sympatry","Adaptive radiation"],a:1,exp:"A barrier arose and split the population in place — vicariance."},
   {type:"mcq",q:"[Obj 3] Island colonization by a few founders is an example of:",opts:["Vicariance","Dispersal","Hybridization","Gene flow"],a:1,exp:"Organisms moved to a new area — dispersal."},
   {type:"short",q:"[Obj 3] Compare vicariance and dispersal.",model:"In vicariance a geographic barrier arises and splits a once-continuous population in place, as when the Isthmus of Panama divided marine populations. In dispersal, a group of colonists from a population moves to a new area, as when monkeys rafted to South America. Both mechanisms produce two populations with no gene flow, allowing them to diverge, but they differ in whether the barrier appeared or the organisms moved.",pts:["Vicariance = barrier splits population in place","Dispersal = organisms move to new area","Vicariance: barrier appears; dispersal: they move","Both → no gene flow → divergence"]},
   {type:"mcq",q:"[Obj 4] In an ancestral area reconstruction, colored nodes indicate:",opts:["Mutations","The inferred ancestral geographic area at that branch point","Extinctions","Random error"],a:1,exp:"Node colors show the inferred ancestral location, letting you trace origin and dispersals."},
   {type:"mcq",q:"[Obj 5] With obvious outliers in a dataset, the better measure of center is the:",opts:["Mean","Median","Range","Variance"],a:1,exp:"The median is resistant to outliers; the mean is pulled by them."},
   {type:"mcq",q:"[Obj 5] Two populations have the same mean but Population B has a larger standard deviation. Population B has:",opts:["A higher typical value","More spread/variation","Fewer individuals","No outliers"],a:1,exp:"Same mean = same center; larger SD = more spread/variation."},
   {type:"short",q:"[Obj 5] When should you use the mean vs the median, and what does a larger standard deviation tell you?",model:"Use the mean when the data are similar and free of outliers, and use the median when there are obvious outliers, because the median is resistant to extreme values while the mean is skewed by them. A larger standard deviation indicates the data are more spread out around the mean — that is, greater variation among the values.",pts:["Mean when no outliers; median when outliers present","Median resistant, mean skewed by outliers","Larger SD = more spread/variation around the mean"]}
  ]
 };
 window.OBJMASTERY.L9={
  id:"L9OBJ", title:"🎯 Objective Mastery (exam-day)",
  sub:"Lecture 9 objectives — taught and tested point by point.",
  slides:[
   {h:"Objective 1 — The three species concepts", html:`
     <table class="dt"><tr><th>Concept</th><th>Basis</th><th>Weakness</th></tr>
     <tr><td>Morphological</td><td>Physical traits</td><td>Plasticity & cryptic species</td></tr>
     <tr><td>Biological</td><td>Interbreeding / reproductive isolation</td><td>Asexual organisms; hybridization</td></tr>
     <tr><td>Phylogenetic</td><td>Shared ancestry / genetic distinctness</td><td>Extinct (no DNA); where to draw the line</td></tr></table>
     <p>No concept is definitively "correct" — a species is a <b>hypothesis</b>.</p>`},
   {h:"Objective 2 — Define speciation & how it occurs", html:`
     <p class="lead"><b>Speciation</b> = populations evolving into distinct species. It occurs through the <b>absence of gene flow</b> so differences accumulate — and can happen <b>with or without</b> geographic separation.</p>`},
   {h:"Objective 3 — Why reproductive isolation is necessary", html:`
     <p class="lead">Without <b>reproductive isolation</b>, gene flow would keep populations genetically mixed. Isolation stops gene flow, so diverging populations stay separate even if they meet again — a prerequisite for becoming distinct species.</p>`},
   {h:"Objective 4 — Prezygotic vs postzygotic barriers", html:`
     <p class="lead"><b>Prezygotic</b> (before fertilization): temporal (different times, <i>Mimulus</i>), mechanical (incompatible structures). <b>Postzygotic</b> (after fertilization): reduced hybrid viability/fertility (sterile mule).</p>`},
   {h:"Objective 5 — Allopatric vs sympatric speciation", html:`
     <p class="lead"><b>Allopatric</b> = geographically separated by a barrier (= vicariance; Isthmus of Panama). <b>Sympatric</b> = same area, no barrier, via ecological specialization / disruptive selection (lava vs sand mice; forest-layer birds).</p>`},
   {h:"Objective 6 — Adaptive radiation", html:`
     <p class="lead"><b>Adaptive radiation</b> = rapid evolution of many ecologically/morphologically diverse species from one ancestor, driven by new unoccupied niches (Galápagos finches, Hawaiian honeycreepers, mammals after the dinosaurs).</p>`}
  ],
  quiz:[
   {type:"mcq",q:"[Obj 1] Which species concept can be applied to fossils?",opts:["Biological","Phylogenetic","Morphological","None"],a:2,exp:"The morphological concept uses physical traits, so it works on fossils/extinct organisms."},
   {type:"mcq",q:"[Obj 1] Which species concept fails for asexual organisms?",opts:["Morphological","Biological","Phylogenetic","All"],a:1,exp:"The biological concept requires interbreeding, so it can't apply to asexual organisms."},
   {type:"short",q:"[Obj 1] State the basis and one weakness of each of the three species concepts.",model:"The morphological concept defines species by physical traits; its weakness is being fooled by phenotypic plasticity and cryptic species. The biological concept defines species by interbreeding and reproductive isolation; its weakness is that it fails for asexual organisms and is blurred by hybridization. The phylogenetic concept defines species by shared ancestry and genetic distinctness; its weakness is that it can't be applied to extinct species with no DNA and it's unclear where to draw the line for 'genetically distinct.'",pts:["Morphological = traits; weak to plasticity/cryptic","Biological = interbreeding; weak for asexual/hybridization","Phylogenetic = ancestry; weak for extinct/line-drawing"]},
   {type:"mcq",q:"[Obj 2] Speciation fundamentally requires:",opts:["Increased gene flow","The absence of gene flow between populations","Identical environments","No mutation"],a:1,exp:"Without gene flow, differences accumulate and populations diverge into species."},
   {type:"tf",q:"[Obj 2] Speciation can occur with or without geographic separation.",a:true,exp:"True — allopatric (with separation) and sympatric (without) are both possible."},
   {type:"mcq",q:"[Obj 3] Reproductive isolation is necessary for speciation because it:",opts:["Increases hybridization","Prevents gene flow so populations stay diverged","Speeds mutation","Merges species"],a:1,exp:"It blocks gene flow, letting diverging populations remain separate even upon contact."},
   {type:"mcq",q:"[Obj 4] Two species that breed in different seasons are separated by a ____ barrier.",opts:["postzygotic","prezygotic (temporal)","hybrid","genetic"],a:1,exp:"Different breeding times prevent mating before fertilization — a prezygotic temporal barrier."},
   {type:"mcq",q:"[Obj 4] A sterile hybrid (like a mule) illustrates a:",opts:["Prezygotic barrier","Postzygotic barrier","Temporal barrier","Mechanical barrier"],a:1,exp:"The hybrid forms but is sterile — a postzygotic barrier (after fertilization)."},
   {type:"short",q:"[Obj 4] Identify and describe prezygotic and postzygotic barriers with examples.",model:"Prezygotic barriers act before fertilization to prevent mating or successful fertilization; examples are temporal isolation (species reproducing at different times, like Mimulus species blooming in different months) and mechanical isolation (incompatible reproductive structures, like dragonfly genitalia). Postzygotic barriers act after fertilization by reducing hybrid viability or fertility; for example, a mule produced from a horse and donkey is sterile.",pts:["Prezygotic = before fertilization","Temporal & mechanical examples","Postzygotic = after fertilization","Reduced hybrid viability/fertility (sterile mule)"]},
   {type:"mcq",q:"[Obj 5] Allopatric speciation is essentially the same as:",opts:["Sympatry","Vicariance (geographic separation)","Adaptive radiation","Hybridization"],a:1,exp:"Allopatric speciation involves a geographic barrier — the same idea as vicariance."},
   {type:"mcq",q:"[Obj 5] Disruptive selection causing divergence within one area is a mechanism of:",opts:["Allopatric speciation","Sympatric speciation","Vicariance","Dispersal"],a:1,exp:"No geographic barrier — divergence in the same area is sympatric speciation."},
   {type:"short",q:"[Obj 5] Compare allopatric and sympatric speciation with an example of each.",model:"Allopatric speciation happens when populations are geographically separated by a barrier that prevents gene flow, allowing them to diverge; the Isthmus of Panama splitting marine organisms into Atlantic and Pacific species is an example, and this is the same as vicariance. Sympatric speciation happens within the same geographic area without a physical barrier, often through ecological specialization or disruptive selection; examples include mice diverging by coat color on lava versus sand, or birds specializing to different rainforest layers.",pts:["Allopatric = geographic separation (= vicariance); Panama","Sympatric = same area, no barrier","Sympatric via disruptive selection/ecological specialization","Example: lava/sand mice or forest-layer birds"]},
   {type:"mcq",q:"[Obj 6] An adaptive radiation produces species that are:",opts:["All identical","Ecologically and morphologically diverse, from one ancestor","Always asexual","Reproductively identical"],a:1,exp:"Adaptive radiation = rapid diversification into ecologically/morphologically diverse species from a common ancestor."},
   {type:"short",q:"[Obj 6] Explain what an adaptive radiation is and what triggers it, with an example.",model:"An adaptive radiation is the rapid evolution of many species from a single common ancestor, resulting in descendants that are ecologically and morphologically diverse. It is triggered by the availability of new, unoccupied niches, such as after a mass extinction or after colonizing a new environment. Examples include the Galápagos finches and Hawaiian honeycreepers, whose beaks diversified for different diets, and the rapid diversification of mammals into many forms after the dinosaurs went extinct.",pts:["Rapid evolution of many species from one ancestor","Ecologically & morphologically diverse","Triggered by new/unoccupied niches","Example: finches/honeycreepers or post-dinosaur mammals"]}
  ]
 };
})();

/* ===================== DEFINITION DRILL =====================
   Extra definition-based questions appended to existing topics. */
(function(){
 const add=(lec,top,qs)=>{
   const l=window.COURSE.find(x=>x.id===lec); if(!l) return;
   const t=l.topics.find(x=>x.id===top); if(!t) return;
   qs.forEach(q=>t.quiz.push(q));
 };
 const D="[Definition] ";

 /* ---------- L1 ---------- */
 add("L1","L1T1",[
  {type:"mcq",q:D+"Which is the best definition of ecology?",opts:["The classification of organisms into groups","The study of interactions between an organism and the abiotic and biotic components of its environment","The study of fossils","The study of allele frequencies"],a:1,exp:"Ecology = the study of interactions between an organism and both the nonliving (abiotic) and living (biotic) parts of its environment."},
  {type:"short",q:D+"Define microevolution and macroevolution.",model:"Microevolution is a change in allele (gene variant) frequencies within a population over time. Macroevolution is descent with modification — large-scale evolutionary change that produces new species and higher groups over long timescales.",pts:["Micro = change in allele frequencies over time","Macro = descent with modification","Macro = large-scale, produces new species/groups"]}
 ]);
 add("L1","L1T2",[
  {type:"mcq",q:D+"An ecosystem is best defined as:",opts:["All individuals of one species in an area","All the populations of many species in an area","A community together with its abiotic environment","All ecosystems on Earth"],a:2,exp:"Ecosystem = community + the abiotic (non-living) environment."},
  {type:"mcq",q:D+"The biosphere is:",opts:["One habitat","A community of many species","The collection of all ecosystems on Earth","A single population"],a:2,exp:"The biosphere = all ecosystems on Earth combined."}
 ]);
 add("L1","L1T3",[
  {type:"mcq",q:D+"A biome is best defined as:",opts:["A single population of plants","A community of organisms adapted to a characteristic set of environmental conditions","A type of soil","The geographic range of one species"],a:1,exp:"A biome = a community of organisms adapted to a characteristic set of environmental conditions (defined by climate)."}
 ]);
 add("L1","L1T5",[
  {type:"short",q:D+"Define species distribution and name the three factors that determine it.",model:"Species distribution is the geographic area where individuals of a species are present. It is determined by three factors: abiotic suitability (suitable climate and physical conditions), biotic suitability (adequate resources and tolerable competitors/predators), and dispersal ability (the species could reach the area) — the A, B, and M of the BAM diagram.",pts:["Geographic area where a species is present","Abiotic suitability","Biotic suitability","Dispersal/movement"]}
 ]);
 add("L1","L1T7",[
  {type:"short",q:D+"Define the fundamental niche and the realized niche.",model:"The fundamental niche is the full range of conditions a species could occupy in the absence of competition — its complete tolerances. The realized niche is the smaller portion of the fundamental niche that the species actually occupies once competition and other biotic interactions restrict it; the realized niche is always nested within the fundamental niche.",pts:["Fundamental = full tolerances without competition","Realized = actually occupied portion with competition","Realized ⊆ fundamental"]}
 ]);

 /* ---------- L2 ---------- */
 add("L2","L2T1",[
  {type:"mcq",q:D+"Demography is:",opts:["The study of fossils","The statistical study of population changes over time","The classification of species","A measure of diversity"],a:1,exp:"Demography = the statistical study of how populations change over time (births, deaths, migration)."}
 ]);
 add("L2","L2T2",[
  {type:"mcq",q:D+"A survivorship curve is:",opts:["A plot of population size over time","A plot showing how many individuals survive at each age","A measure of carrying capacity","The rate of mutation"],a:1,exp:"A survivorship curve plots the number of individuals surviving against age."}
 ]);
 add("L2","L2T4",[
  {type:"mcq",q:D+"Carrying capacity (K) is:",opts:["The birth rate minus the death rate","The maximum population size an environment can sustain","The number of offspring per female","The rate of population growth"],a:1,exp:"K = carrying capacity, the maximum population the environment can support."},
  {type:"short",q:D+"Define r and K.",model:"r is the intrinsic rate of increase, equal to the per-capita birth rate minus the per-capita death rate (b − d); it determines whether a population grows (r>0), is stable (r=0), or declines (r<0). K is the carrying capacity — the maximum population size that the environment can sustain.",pts:["r = intrinsic rate of increase = b − d","r>0 grows, r=0 stable, r<0 declines","K = carrying capacity","K = max population the environment supports"]}
 ]);
 add("L2","L2T5",[
  {type:"short",q:D+"Define density-dependent and density-independent regulation.",model:"Density-dependent regulation comes from biotic factors whose effect intensifies as the population becomes more crowded, such as competition, predation, disease, and resource limitation. Density-independent regulation comes from abiotic factors that affect the population regardless of its density, such as fires, floods, droughts, and volcanic eruptions.",pts:["Density-dependent = biotic, worsens with crowding","Examples: competition, predation, disease","Density-independent = abiotic, regardless of density","Examples: fire, flood, drought"]}
 ]);
 add("L2","L2T6",[
  {type:"mcq",q:D+"A life-history strategy is:",opts:["A species' geographic range","How an organism allocates its limited energy among growth, survival, and reproduction","The number of chromosomes","A type of niche"],a:1,exp:"Life-history strategy = how limited energy is allocated among growth, survival, and reproduction, creating trade-offs."}
 ]);

 /* ---------- L3 ---------- */
 add("L3","L3T1",[
  {type:"mcq",q:D+"A community is:",opts:["One species in an area","A group of interacting species occurring together at the same time and place","A species plus its abiotic environment","A single trophic level"],a:1,exp:"Community = interacting species together at the same time and place."}
 ]);
 add("L3","L3T4",[
  {type:"mcq",q:D+"Aposematism is:",opts:["Camouflage","The use of bright colors/patterns to warn predators that an organism is toxic or unpalatable","Mimicking a harmless species","A form of mutualism"],a:1,exp:"Aposematism = conspicuous warning coloration advertising toxicity/unpalatability."},
  {type:"short",q:D+"Define Batesian and Müllerian mimicry.",model:"Batesian mimicry is when a harmless species resembles a toxic or unpalatable species, deceiving predators — only the model is actually dangerous. Müllerian mimicry is when multiple genuinely toxic or harmful species resemble one another, reinforcing a shared warning signal so predators learn to avoid the pattern more quickly.",pts:["Batesian: harmless mimics toxic (a bluff)","Müllerian: multiple toxic species resemble each other","Müllerian = honest, shared warning"]}
 ]);
 add("L3","L3T6",[
  {type:"mcq",q:D+"Trait (character) displacement is:",opts:["Two species becoming identical","The divergence of a trait between competing species to minimize competition","The extinction of a competitor","A type of mimicry"],a:1,exp:"Trait displacement = traits diverge where competitors co-occur, reducing overlap and enabling coexistence."}
 ]);
 add("L3","L3T9",[
  {type:"mcq",q:D+"Biomagnification is:",opts:["Energy increasing up the food chain","The increasing concentration of toxic substances at each successive trophic level","Populations growing exponentially","Species richness rising with area"],a:1,exp:"Biomagnification = toxin concentration increases at each higher trophic level."}
 ]);
 add("L3","L3T10",[
  {type:"short",q:D+"Define disturbance and succession.",model:"A disturbance is an event that causes changes in community structure and composition, and it leads to succession. Succession is the change in species composition of a community over time; it is called primary succession when it begins where there was no soil or prior community, and secondary succession when soil remains after a community was removed.",pts:["Disturbance = event changing community structure/composition","Succession = change in species composition over time","Primary = no soil/prior community","Secondary = soil remains"]}
 ]);
 add("L3","L3T13",[
  {type:"short",q:D+"Define a keystone species and a foundation species.",model:"A keystone species has an effect on its community that is disproportionately large relative to its abundance; removing it significantly alters species composition and reduces biodiversity, as with a wolf. A foundation species provides the structural and energetic basis of the food web and is often a primary producer, such as kelp in a kelp forest.",pts:["Keystone = outsized effect vs its abundance (wolf)","Removal restructures the community","Foundation = base of the food web, often a producer (kelp)"]}
 ]);

 /* ---------- L4 ---------- */
 add("L4","L4T1",[
  {type:"mcq",q:D+"A Species Distribution Model (SDM) is:",opts:["A map of a species' known fossils","A model that predicts where a species is likely to occur from occurrence records and environmental data","A phylogenetic tree","A measure of diversity"],a:1,exp:"An SDM relates occurrence records to environmental data to predict suitable habitat."}
 ]);
 add("L4","L4T2",[
  {type:"short",q:D+"Define species richness and species evenness.",model:"Species richness is the number of unique species in a given area, with every species counting equally regardless of abundance. Species evenness describes how equally individuals are distributed among those species: high evenness means species have similar abundances, while low evenness means one or a few species dominate.",pts:["Richness = number of unique species","Every species counts equally (ignores abundance)","Evenness = how equally individuals are spread among species","High = similar abundances; low = one dominates"]}
 ]);
 add("L4","L4T3",[
  {type:"mcq",q:D+"The species–area relationship states that:",opts:["Species richness falls as area increases","Species richness increases as the area surveyed increases","Area has no effect on richness","Only islands have species"],a:1,exp:"More area surveyed → more species found (the curve rises then levels off)."}
 ]);
 add("L4","L4T7",[
  {type:"mcq",q:D+"Endemism refers to:",opts:["A species found on many continents","A species found naturally in only one geographic area and nowhere else","An introduced species","A species that is extinct"],a:1,exp:"Endemic = occurring naturally in only one area (e.g., Galápagos tortoise)."}
 ]);
 add("L4","L4T8",[
  {type:"short",q:D+"Define alpha, beta, and gamma diversity.",model:"Alpha diversity is the species richness within a single local site. Beta diversity is the turnover between sites — the species that are not shared between them. Gamma diversity is the total species richness across all sites in a region.",pts:["Alpha = within-site (local) richness","Beta = between-site turnover / unshared species","Gamma = total regional richness"]}
 ]);
 add("L4","L4T10",[
  {type:"mcq",q:D+"A biodiversity hotspot is:",opts:["The warmest place on Earth","An area exceptionally rich in species that are found nowhere else (high richness + high endemism)","Any protected park","An area with only one species"],a:1,exp:"Hotspots combine exceptional species richness with high endemism."}
 ]);

 /* ---------- L5 ---------- */
 add("L5","L5T4",[
  {type:"short",q:D+"Define gene, allele, genotype, and phenotype.",model:"A gene is a DNA sequence that provides the instructions for a trait. An allele is one variant of a gene. A genotype is the specific combination of alleles an organism carries. A phenotype is the observable trait of the organism, which results from the genotype together with the environment.",pts:["Gene = DNA instructions for a trait","Allele = one variant of a gene","Genotype = combination of alleles carried","Phenotype = observable trait (genotype + environment)"]}
 ]);
 add("L5","L5T3",[
  {type:"mcq",q:D+"Fitness is best defined as:",opts:["Physical strength","An individual's ability to survive and reproduce, measured by reproductive success","Lifespan","Body size"],a:1,exp:"Fitness = ability to survive and reproduce; measured by reproductive success."}
 ]);
 add("L5","L5T7",[
  {type:"mcq",q:D+"Genetic drift is:",opts:["The non-random selection of beneficial alleles","The random fluctuation in allele frequencies in a population","The movement of genes between populations","A change in DNA sequence"],a:1,exp:"Genetic drift = random fluctuation in allele frequencies; a chance event, strongest in small populations."},
  {type:"short",q:D+"Define the bottleneck effect and the founder effect.",model:"Both are special cases of genetic drift that leave a random subset of the original population's alleles. The bottleneck effect occurs when a disaster kills a large, random portion of a population, leaving few survivors, as with northern elephant seals. The founder effect occurs when a small group breaks away from a larger population to start a new one, so the new population's variation reflects only its few founders.",pts:["Both are forms of genetic drift (random subset)","Bottleneck = disaster kills most of the population","Founder = small group starts a new population","Both reduce genetic diversity"]}
 ]);
 add("L5","L5T8",[
  {type:"mcq",q:D+"Gene flow is:",opts:["Random changes in DNA","The movement of genes from one population to another","Mate choice based on traits","Differential survival"],a:1,exp:"Gene flow = movement of genes between populations (migration, pollen); makes populations more similar."}
 ]);
 add("L5","L5T10",[
  {type:"short",q:D+"Define natural selection.",model:"Natural selection is the differential survival and reproduction of individuals due to heritable differences in phenotype. It favors alleles that improve fitness, so advantageous heritable traits become more common over generations, leading to adaptation. Unlike mutation and genetic drift, it is not a random process.",pts:["Differential survival & reproduction","Based on heritable phenotypic differences","Favors alleles that improve fitness → adaptation","Not random"]}
 ]);
 add("L5","L5T12",[
  {type:"short",q:D+"Define a null model and Hardy–Weinberg equilibrium.",model:"A null model is a baseline model that assumes no biological process is shaping an observed pattern; it gives the expected result under chance so we can test whether real data differ. Hardy–Weinberg equilibrium is the null model for evolution: it describes a population that is not evolving and predicts what allele and genotype frequencies would be if no evolutionary forces were acting.",pts:["Null model = baseline assuming no process","Used to test if observed data differ from expectation","HW = null model of a NON-evolving population","Predicts frequencies if no evolutionary forces act"]}
 ]);

 /* ---------- L6 ---------- */
 add("L6","L6T1",[
  {type:"short",q:D+"Define macroevolution, cladogenesis, and anagenesis.",model:"Macroevolution is descent with modification — large-scale evolutionary change occurring at or above the species level over long periods. Cladogenesis is the branching of a lineage into two or more descendant lineages, which creates new species. Anagenesis is the change of characteristics within a single lineage over time, without branching.",pts:["Macroevolution = large-scale change at/above species level","Cladogenesis = branching → new species","Anagenesis = change within one lineage, no branching"]}
 ]);
 add("L6","L6T3",[
  {type:"short",q:D+"Define phylogenetics, taxonomy, and systematics.",model:"Phylogenetics is dedicated to uncovering the evolutionary relationships among species or higher taxa. Taxonomy is the science of naming, describing, and organizing species. Systematics is the field of organizing and classifying species based on their evolutionary relationships.",pts:["Phylogenetics = uncovering relationships","Taxonomy = naming/describing/organizing","Systematics = classifying by evolutionary relationships"]}
 ]);
 add("L6","L6T6",[
  {type:"short",q:D+"Define monophyletic, paraphyletic, and polyphyletic groups.",model:"A monophyletic group, or clade, contains a common ancestor and all of its descendants. A paraphyletic group contains a common ancestor and some but not all of its descendants, as with traditional 'reptiles' excluding birds. A polyphyletic group contains members derived from two or more ancestors but excludes their common ancestor.",pts:["Monophyletic = ancestor + ALL descendants (clade)","Paraphyletic = ancestor + SOME descendants","Polyphyletic = members from 2+ ancestors, common ancestor excluded"]}
 ]);
 add("L6","L6T7",[
  {type:"short",q:D+"Define plesiomorphy, apomorphy, autapomorphy, and synapomorphy.",model:"A plesiomorphy is an ancestral character state. An apomorphy is a derived character state. An autapomorphy is a derived state unique to a single species. A synapomorphy is a derived state shared by two or more taxa, which is evidence that they form a clade.",pts:["Plesiomorphy = ancestral state","Apomorphy = derived state","Autapomorphy = derived, unique to one species","Synapomorphy = derived, shared (evidence for a clade)"]}
 ]);
 add("L6","L6T9",[
  {type:"short",q:D+"Define homology, homoplasy, and convergent evolution.",model:"Homology is similarity between characters that is due to shared common ancestry. Homoplasy is similarity between characters that is not derived from a common ancestor. Convergent evolution is when different lineages independently evolve similar traits because they experience similar selective pressures, and it is the main source of homoplasy.",pts:["Homology = similarity from shared ancestry","Homoplasy = similarity NOT from a common ancestor","Convergent evolution = independent evolution under similar pressures","Convergence causes homoplasy"]}
 ]);
 add("L6","L6T8",[
  {type:"mcq",q:D+"Maximum parsimony chooses the tree that:",opts:["Has the most taxa","Requires the fewest evolutionary changes","Has the longest branches","Uses the most DNA"],a:1,exp:"The most parsimonious tree requires the fewest changes (Occam's razor)."}
 ]);

 /* ---------- L7 ---------- */
 add("L7","L7T3",[
  {type:"mcq",q:D+"Molecular systematics is:",opts:["Classifying species by their appearance","Using DNA, mitochondrial, or chloroplast sequences to infer evolutionary relationships","Studying fossils","Measuring population size"],a:1,exp:"Molecular systematics uses sequence data (nucleotides as characters) to infer relationships."}
 ]);
 add("L7","L7T4",[
  {type:"short",q:D+"Define a locus, and contrast coding and non-coding DNA.",model:"A locus is a specific location or position on a chromosome or in the genome; it often refers to a gene but can be any defined stretch of DNA. Coding DNA is transcribed and translated into proteins, so it is conserved and evolves slowly because harmful changes are removed by selection, making it useful for deep or ancient relationships. Non-coding DNA is not translated, has fewer functional constraints, and evolves faster, making it useful for recent or shallow relationships among closely related taxa.",pts:["Locus = a defined location in the genome","Coding = translated, conserved, slow → deep relationships","Non-coding = not translated, fast → recent/shallow relationships"]}
 ]);
 add("L7","L7T5",[
  {type:"mcq",q:D+"A Multiple Sequence Alignment (MSA) is:",opts:["A list of species names","The aligned set of sequences used as the basis for building phylogenetic trees","A type of mutation","A fossil record"],a:1,exp:"The MSA is the aligned dataset ensuring the same homologous nucleotide positions are compared; it's the basis for tree-building."}
 ]);
 add("L7","L7T7",[
  {type:"short",q:D+"Define cryptic species and divergence dating.",model:"Cryptic species are morphologically similar species that are genetically distinct; molecular data reveals them, uncovering hidden biodiversity. Divergence dating estimates when species or lineages split in evolutionary time, and it requires molecular data along with calibration points such as fossils of known age.",pts:["Cryptic species = look alike but genetically distinct","Reveals hidden biodiversity","Divergence dating = estimates WHEN lineages split","Needs molecular data + calibration (fossils)"]}
 ]);

 /* ---------- L8 (final focus) ---------- */
 add("L8","L8T1",[
  {type:"mcq",q:D+"Evolutionary biogeography is best defined as:",opts:["The study of fossils only","The study of species distributions in space and time in the context of evolutionary relationships","The naming of species","The measurement of population growth"],a:1,exp:"It asks why species are where they are, studying distributions in space AND time with evolutionary context."}
 ]);
 add("L8","L8T2",[
  {type:"mcq",q:D+"A barrier (in biogeography) is:",opts:["A type of predator","A physical feature that limits or prevents the movement of organisms between regions","A climate zone","A kind of niche"],a:1,exp:"A barrier is a physical feature (ocean, mountain, river) that limits/prevents movement."}
 ]);
 add("L8","L8T4",[
  {type:"short",q:D+"Define vicariance and dispersal.",model:"Vicariance is when a continuous population is geographically separated in place by a chance event, such as a mountain rising or a river changing course, ending with two populations that have no gene flow. Dispersal is when a group of colonists from one continuous population separates to a different geographic area, such as island colonization, also ending with two populations that have no gene flow.",pts:["Vicariance = barrier splits a population in place","Dispersal = colonists move to a new area","Both end with two populations with no gene flow"]}
 ]);
 add("L8","L8T5",[
  {type:"mcq",q:D+"Ancestral area reconstruction is:",opts:["A method of dating fossils","A model that uses a phylogeny to estimate the ancestral geographic distribution at each node","A way to measure diversity","A type of barrier"],a:1,exp:"It assigns tips to areas and uses models to estimate ancestral locations at nodes, tracing movement over time."}
 ]);
 add("L8","L8T6",[
  {type:"mcq",q:D+"Descriptive statistics are defined as statistics used to:",opts:["Predict future values from data","Summarize and describe data","Prove causation","Randomize samples"],a:1,exp:"Descriptive statistics summarize/describe data (patterns, trends, outliers) — they don't predict from it."},
  {type:"short",q:D+"Define the mean and the median, and state which is affected by outliers.",model:"The mean is the sum of all values divided by the number of values, and it is sensitive to outliers because an extreme value pulls it toward itself. The median is the middle value when the data are ordered from smallest to largest, and it is resistant to outliers. Therefore the mean is used when data are similar and free of outliers, while the median is used when obvious outliers are present.",pts:["Mean = sum ÷ count","Median = middle value when ordered","Mean is affected/skewed by outliers","Median is resistant to outliers"]}
 ]);
 add("L8","L8T7",[
  {type:"short",q:D+"Define range, variance, and standard deviation.",model:"The range is the difference between the largest and smallest values, giving a quick estimate of spread. The variance is the average of the squared differences from the mean, calculated as the sum of squared deviations divided by n − 1. The standard deviation is the square root of the variance and represents the average distance of observations from the mean. For all three, a larger value indicates more spread or variation in the data.",pts:["Range = largest − smallest","Variance = average squared difference from the mean (÷ n−1)","Standard deviation = square root of the variance","Larger value = more spread/variation"]}
 ]);

 /* ---------- L9 (final focus) ---------- */
 add("L9","L9T1",[
  {type:"short",q:D+"Define phenotypic plasticity and cryptic species, and explain why each makes defining species hard.",model:"Phenotypic plasticity is when a single species takes on different physical forms depending on environmental conditions, as in Bicyclus butterflies whose wing morphology varies with temperature; this makes one species look like several. Cryptic species are separate species that look morphologically identical but do not interbreed and are genetically distinct, as in the four Papilio butterflies; this makes several species look like one. Both show that appearance alone cannot reliably delimit species.",pts:["Plasticity = one species, many forms (environment-driven)","Makes one species look like several","Cryptic species = several species that look identical","Appearance alone is unreliable"]}
 ]);
 add("L9","L9T2",[
  {type:"mcq",q:D+"The morphological species concept defines species based on:",opts:["Interbreeding","Observable physical traits","Shared ancestry","Geographic range"],a:1,exp:"The morphological concept uses observable physical traits."}
 ]);
 add("L9","L9T3",[
  {type:"mcq",q:D+"The biological species concept defines species as:",opts:["Organisms that look alike","Groups of interbreeding populations that are reproductively isolated from others","Groups sharing a common ancestor","Organisms in the same habitat"],a:1,exp:"The biological concept centers on interbreeding and reproductive isolation."}
 ]);
 add("L9","L9T4",[
  {type:"mcq",q:D+"The phylogenetic species concept defines a species as a group that:",opts:["Looks identical","Can interbreed","Shares a pattern of ancestry and descent and is genetically distinct","Occupies one island"],a:2,exp:"The phylogenetic concept uses shared ancestry/descent and genetic distinctness."},
  {type:"short",q:D+"Define all three species concepts.",model:"The morphological species concept defines species based on observable physical traits. The biological species concept defines species as groups of interbreeding populations that are reproductively isolated from other such groups. The phylogenetic species concept defines a species as a group of organisms that share a pattern of ancestry and descent and are genetically distinct from other groups.",pts:["Morphological = observable physical traits","Biological = interbreeding, reproductively isolated","Phylogenetic = shared ancestry/descent, genetically distinct"]}
 ]);
 add("L9","L9T5",[
  {type:"mcq",q:D+"Speciation is defined as:",opts:["The extinction of a species","The process by which populations evolve to become distinct species","A change in allele frequencies only","The naming of a species"],a:1,exp:"Speciation = populations evolving into distinct species; it links microevolution to macroevolution."},
  {type:"short",q:D+"Define reproductive isolation and the two categories of barrier.",model:"Reproductive isolation is a mechanism that prevents reproduction or gene flow between populations, ensuring that once populations diverge they stay separate even if they come back into contact. Its barriers fall into two categories: prezygotic barriers act before fertilization, such as temporal isolation (breeding at different times) and mechanical isolation (incompatible reproductive structures); postzygotic barriers act after fertilization, such as reduced hybrid viability or fertility, as when a mule is sterile.",pts:["Mechanism preventing reproduction/gene flow","Keeps diverged populations separate on contact","Prezygotic = before fertilization (temporal, mechanical)","Postzygotic = after fertilization (sterile/inviable hybrids)"]}
 ]);
 add("L9","L9T6",[
  {type:"short",q:D+"Define allopatric and sympatric speciation.",model:"Allopatric speciation occurs when populations are geographically separated by a barrier that prevents gene flow, allowing genetic and phenotypic differences to accumulate until they become distinct species; this is the same idea as vicariance. Sympatric speciation occurs within the same geographic area, without any physical separation, typically through ecological specialization or disruptive selection.",pts:["Allopatric = populations geographically separated (barrier)","Same idea as vicariance","Sympatric = within the same geographic area","Sympatric via ecological specialization/disruptive selection"]}
 ]);
 add("L9","L9T7",[
  {type:"mcq",q:D+"An adaptive radiation is:",opts:["The slow change of one lineage over time","The rapid evolution of many ecologically and morphologically diverse species from a single common ancestor","The extinction of many species","A reproductive barrier"],a:1,exp:"Adaptive radiation = rapid diversification from one ancestor into many diverse species, driven by new unoccupied niches."}
 ]);
})();
