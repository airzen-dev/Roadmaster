export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'defs'; items: { term: string; text: string }[] }
  | { kind: 'steps'; items: { term: string; text: string }[] };

export type Service = {
  slug: string;
  name: string;
  category: 'Tyre Sales' | 'Tyre Care & Repair' | 'Vehicle Servicing' | 'Fleet & Emergency';
  summary: string;
  intro: string;
  image: string;
  icon: string;
  highlights: string[];
  blocks: Block[];
};

export const serviceCategories = [
  {
    name: 'Tyre Sales',
    description: 'New tyres for every application, from family hatchbacks to 100-tonne haul trucks.',
  },
  {
    name: 'Tyre Care & Repair',
    description: 'Extending casing life through retreading, vulcanising, foam filling and nitrogen.',
  },
  {
    name: 'Vehicle Servicing',
    description: 'Alignment, brakes, suspension and diagnostics carried out by qualified technicians.',
  },
  {
    name: 'Fleet & Emergency',
    description: 'Load studies and 24/7 nationwide breakdown response that keeps fleets moving.',
  },
] as const;

export const services: Service[] = [
  /* ------------------------------------------------------------------ TYRE SALES */
  {
    slug: 'passenger-tyres',
    name: 'Passenger Tyres',
    category: 'Tyre Sales',
    summary: 'All-season, summer, winter and touring tyres for cars, SUVs and light commercials.',
    intro:
      'Passenger tyres are built around three things: comfort, economy and grip in the conditions you actually drive in. We fit, balance and align, and we tell you honestly how much life is left in what you have.',
    image: '/images/services/passenger-tyres.jpg',
    icon: 'car',
    highlights: ['Comfort & noise reduction', 'Lower rolling resistance', 'All-season versatility', 'Long tread life'],
    blocks: [
      { kind: 'h', text: 'Key features of passenger tyres' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Comfort & noise reduction',
            text: 'Built with tread patterns and rubber compounds that minimise road noise and enhance driving comfort.',
          },
          {
            term: 'Fuel efficiency',
            text: 'Many models are optimised for lower rolling resistance, helping improve a vehicle’s fuel economy.',
          },
          {
            term: 'All-season versatility',
            text: 'Most passenger tyres are all-season tyres, meaning they perform well in both dry and wet conditions, and offer limited winter capability.',
          },
          {
            term: 'Tread life',
            text: 'Designed for long-lasting durability under normal driving conditions.',
          },
        ],
      },
      { kind: 'h', text: 'Types of passenger tyres' },
      {
        kind: 'defs',
        items: [
          { term: 'All-season tyres', text: 'Ideal for year-round use in moderate climates.' },
          { term: 'Summer tyres', text: 'Optimised for warm weather with superior grip and handling.' },
          { term: 'Winter tyres', text: 'Designed with special tread patterns and rubber to handle snow and ice.' },
          {
            term: 'Touring tyres',
            text: 'Focused on long-distance comfort, low noise and good all-around performance.',
          },
        ],
      },
      { kind: 'h', text: 'When to replace passenger tyres' },
      {
        kind: 'list',
        items: [
          'Tread depth drops below 1.6 mm (2/32 of an inch)',
          'Visible cracks, bulges or damage',
          'Uneven tread wear',
          'Age exceeds 6–10 years, even if the tread still looks fine',
        ],
      },
    ],
  },
  {
    slug: 'truck-tyres',
    name: 'Truck Tyres',
    category: 'Tyre Sales',
    summary: 'Steer, drive and trailer tyres engineered for heavy loads and long distances.',
    intro:
      'Truck tyres are engineered to withstand extreme conditions, heavy loads and long distances, making them a critical component in commercial transportation. Unlike passenger car tyres, truck tyres are designed for durability, traction and performance under constant stress.',
    image: '/images/services/truck-tyres.jpg',
    icon: 'truck',
    highlights: ['Reinforced load capacity', 'Position-specific tread', 'Retread-ready casings', 'Low rolling resistance'],
    blocks: [
      { kind: 'h', text: 'The backbone of heavy-duty transport' },
      { kind: 'h', text: 'Key features of truck tyres' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Load capacity',
            text: 'Truck tyres have reinforced sidewalls and tougher materials to support heavy loads without compromising safety or performance.',
          },
          {
            term: 'Tread design',
            text: 'The tread pattern varies depending on the tyre’s position (steer, drive or trailer) and intended use (highway, regional or off-road). Deep, aggressive treads offer grip and stability, especially in wet or uneven conditions.',
          },
          {
            term: 'Durability',
            text: 'Made with robust rubber compounds and steel belts, truck tyres are built to resist wear, heat and punctures. Many are also designed for retreading, which extends their life and reduces environmental impact.',
          },
          {
            term: 'Fuel efficiency',
            text: 'Low rolling resistance tyres help reduce fuel consumption, a major cost factor in trucking operations.',
          },
          {
            term: 'Regulations & safety',
            text: 'Truck tyres must meet strict safety standards due to their impact on braking, handling and overall road safety.',
          },
        ],
      },
      { kind: 'h', text: 'Common types of truck tyres' },
      {
        kind: 'defs',
        items: [
          { term: 'Steer tyres', text: 'Installed on the front axle; designed for precision, stability and water evacuation.' },
          { term: 'Drive tyres', text: 'Mounted on powered axles; provide traction and grip.' },
          { term: 'Trailer tyres', text: 'Support the load at the rear; optimised for wear and straight-line tracking.' },
        ],
      },
      { kind: 'h', text: 'Maintenance matters' },
      {
        kind: 'p',
        text: 'Proper inflation, regular rotation, alignment checks and timely replacements are crucial for ensuring the longevity and safety of truck tyres. Under-inflated or damaged tyres can lead to blowouts, accidents and costly downtime.',
      },
    ],
  },
  {
    slug: 'mining-tyres',
    name: 'Mining & OTR Tyres',
    category: 'Tyre Sales',
    summary: 'Giant earthmover and off-the-road tyres for haul trucks, loaders and excavators.',
    intro:
      'Mining tyres are some of the largest and most robust tyres in the world, designed to support the extreme demands of heavy-duty mining equipment such as haul trucks, loaders and excavators. These tyres play a critical role in the efficiency, safety and productivity of mining operations.',
    image: '/images/services/mining-tyres.jpg',
    icon: 'mining',
    highlights: ['Over 4 m tall, 100+ tonne loads', 'Cut & heat resistant compounds', 'Radial and bias options', 'TPMS lifecycle management'],
    blocks: [
      { kind: 'h', text: 'The giants of heavy industry' },
      { kind: 'h', text: 'Key features' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Size & strength',
            text: 'Mining tyres can stand over 4 metres tall and weigh several tonnes. They’re built to carry loads exceeding 100 tonnes while withstanding harsh terrain, sharp rocks and constant wear.',
          },
          {
            term: 'Durability',
            text: 'Made from high-quality rubber compounds reinforced with steel belts and high-tensile materials, these tyres are engineered to resist cuts, heat and abrasion.',
          },
          {
            term: 'Tread design',
            text: 'Specialised tread patterns provide optimal traction and stability on loose or uneven ground, reducing slippage and fuel consumption.',
          },
          {
            term: 'Heat resistance',
            text: 'In surface mining, tyres can overheat due to heavy loads and long distances. Heat-resistant compounds and deep treads help manage this issue.',
          },
        ],
      },
      { kind: 'h', text: 'Types of mining tyres' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Radial tyres',
            text: 'Offer better traction, fuel efficiency and a smoother ride, making them ideal for long-haul operations.',
          },
          {
            term: 'Bias tyres',
            text: 'Preferred for short-haul or rougher terrain where sidewall strength and impact resistance are crucial.',
          },
        ],
      },
      { kind: 'h', text: 'Challenges in mining tyre management' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Availability',
            text: 'Global shortages can impact production; hence, tyre lifecycle management is critical.',
          },
          {
            term: 'Maintenance',
            text: 'Regular inspections, proper inflation and rotation extend tyre life and reduce downtime.',
          },
        ],
      },
      { kind: 'h', text: 'Innovations & sustainability' },
      {
        kind: 'list',
        items: [
          'TPMS (Tyre Pressure Monitoring Systems) help operators monitor tyre pressure and temperature in real time',
          'Retreading and recycling initiatives are growing to reduce waste and environmental impact',
          'Some manufacturers are experimenting with airless tyres and smart compounds for better performance',
        ],
      },
    ],
  },
  {
    slug: 'agricultural-tyres',
    name: 'Agricultural Tyres',
    category: 'Tyre Sales',
    summary: 'Tractor, implement and flotation tyres that protect your soil as well as your machine.',
    intro:
      'Agricultural tyres are a specialised category designed for farming machinery such as tractors, harvesters and sprayers. They play a crucial role in modern farming by enhancing efficiency and performance while protecting the soil.',
    image: '/images/services/agricultural-tyres.jpg',
    icon: 'tractor',
    highlights: ['Deep-lug traction', 'Reduced soil compaction', 'Low inflation pressure', 'IF/VF technology'],
    blocks: [
      { kind: 'h', text: 'Key features of agricultural tyres' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Traction',
            text: 'The tread pattern is typically deep and widely spaced to provide excellent traction in muddy, soft or uneven terrain. This ensures better grip and minimises slippage, especially in wet or ploughed fields.',
          },
          {
            term: 'Soil protection',
            text: 'Agricultural tyres are engineered to distribute the weight of heavy machinery evenly, reducing soil compaction. This is essential for maintaining soil health, preserving yields and enabling long-term farming sustainability.',
          },
          {
            term: 'Durability',
            text: 'These tyres are made from robust materials to withstand harsh environments, including sharp rocks, stubble and chemicals. They are built for high load-bearing capacity and long service life.',
          },
          {
            term: 'Low inflation pressure',
            text: 'Many agricultural tyres operate at low inflation pressures, which further reduces soil compaction and improves flotation over soft ground.',
          },
        ],
      },
      { kind: 'h', text: 'Radial vs bias construction' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Radial tyres',
            text: 'Offer better ride comfort, fuel efficiency and longer life. They are ideal for high-speed road travel and field work.',
          },
          {
            term: 'Bias-ply tyres',
            text: 'More rugged and better suited to heavy-duty tasks with lower initial cost, but may wear faster.',
          },
        ],
      },
      { kind: 'h', text: 'Types of agricultural tyres' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Tractor tyres (R-1, R-1W, R-2)',
            text: 'Common for general fieldwork. R-1W has deeper treads for wet conditions.',
          },
          { term: 'Implement tyres', text: 'Used on trailers and non-driven equipment.' },
          {
            term: 'Flotation tyres',
            text: 'Designed to minimise ground pressure, often used on sprayers or slurry tanks.',
          },
          {
            term: 'Industrial / lug tyres (R-4)',
            text: 'Suitable for loader tractors or backhoes, offering strong traction and durability on hard surfaces.',
          },
        ],
      },
      { kind: 'h', text: 'Innovations' },
      {
        kind: 'defs',
        items: [
          {
            term: 'IF/VF technology',
            text: '“Increased Flexion” (IF) and “Very High Flexion” (VF) tyres can carry more load at lower pressures, enhancing productivity and reducing environmental impact.',
          },
          {
            term: 'Smart tyres',
            text: 'Some modern tyres are equipped with sensors to monitor pressure, temperature and load, helping farmers make data-driven decisions.',
          },
        ],
      },
      {
        kind: 'p',
        text: 'Choosing the right tyre for the specific application and terrain is essential for optimising farm operations and ensuring sustainability in agriculture.',
      },
    ],
  },

  /* --------------------------------------------------------- TYRE CARE & REPAIR */
  {
    slug: 'retreading',
    name: 'Truck Tyre Retreading',
    category: 'Tyre Care & Repair',
    summary: 'Renew a proven casing for 30–50% less than a new tyre, with the same performance.',
    intro:
      'Truck tyre retreading is the process of renewing worn-out tyres by replacing the old, worn tread with a new one. This process extends the life of the tyre casing and offers a more affordable alternative to purchasing new tyres, without compromising on performance or safety.',
    image: '/images/services/retreading.jpg',
    icon: 'recycle',
    highlights: ['30–50% cheaper than new', 'Saves ~20 gallons of oil per tyre', 'Up to 3–4 lifecycles', 'Strict quality standards'],
    blocks: [
      { kind: 'h', text: 'Key benefits of truck tyre retreading' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Cost savings',
            text: 'Retreaded tyres cost significantly less than new tyres, often 30% to 50% cheaper, making them an economical choice for fleet operators and logistics companies.',
          },
          {
            term: 'Environmental sustainability',
            text: 'Retreading reduces waste and conserves natural resources. Each retreaded tyre saves approximately 20 gallons of oil compared to manufacturing a new one, reducing the carbon footprint of the transportation industry.',
          },
          {
            term: 'Performance and safety',
            text: 'When done correctly using quality materials and proper processes, retreaded tyres perform comparably to new tyres in terms of durability, grip and safety. Modern retreading facilities follow strict quality standards, and many retreads are used on commercial trucks, buses and even aircraft.',
          },
          {
            term: 'Multiple life cycles',
            text: 'A high-quality truck tyre casing can be retreaded multiple times, sometimes up to three or four times, maximising its lifecycle and overall value.',
          },
        ],
      },
      { kind: 'h', text: 'The retreading process' },
      {
        kind: 'steps',
        items: [
          {
            term: 'Initial inspection',
            text: 'The casing is carefully inspected for damage, punctures or structural weaknesses.',
          },
          { term: 'Buffing', text: 'The worn tread is buffed away to prepare the surface for a new tread.' },
          {
            term: 'Repair and preparation',
            text: 'Any necessary repairs to the casing are made, and it is cleaned and prepared for the new tread.',
          },
          {
            term: 'Tread application',
            text: 'A new tread is applied using either the pre-cure or mould cure method.',
          },
          {
            term: 'Curing',
            text: 'The tyre is placed in a curing chamber to bond the new tread to the casing under controlled heat and pressure.',
          },
          { term: 'Final inspection', text: 'A thorough inspection ensures the retread meets safety and quality standards.' },
        ],
      },
      { kind: 'h', text: 'Myths and facts' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Myth: retreaded tyres are unsafe',
            text: 'Fact: modern retreads are safe and reliable when manufactured and maintained correctly.',
          },
          {
            term: 'Myth: retreads are not allowed on highways',
            text: 'Fact: retreaded tyres are legal and widely used on highways, especially on the rear axles of trucks.',
          },
        ],
      },
    ],
  },
  {
    slug: 'vulcanising',
    name: 'Vulcanised Tyre Repair',
    category: 'Tyre Care & Repair',
    summary: 'Permanent heat-and-pressure repairs for sidewall cuts, large punctures and tread separation.',
    intro:
      'Vulcanised tyre repair is a professional and durable method of repairing damaged tyres, especially those with major injuries such as sidewall cuts, large punctures or tread separation. This process restores the structural integrity of the tyre, making it safe for continued use, especially in heavy-duty or commercial vehicles.',
    image: '/images/services/vulcanising.jpg',
    icon: 'flame',
    highlights: ['Permanent chemical bond', 'Hot & cold vulcanising', 'Restores expensive casings', 'Trained technicians only'],
    blocks: [
      { kind: 'h', text: 'What is vulcanised tyre repair?' },
      {
        kind: 'p',
        text: 'Vulcanised tyre repair involves heat, pressure and rubber compounds to permanently bond new material into the damaged area of the tyre. Unlike temporary plug or patch fixes, vulcanisation chemically fuses the repair material with the original tyre rubber, resulting in a strong, seamless bond.',
      },
      {
        kind: 'defs',
        items: [
          {
            term: 'Hot vulcanising',
            text: 'Uses high temperatures (typically 150–170 °C) and pressure to cure the rubber patch onto the tyre.',
          },
          {
            term: 'Cold vulcanising',
            text: 'Uses chemical accelerators and adhesives at room temperature, often for smaller repairs.',
          },
        ],
      },
      { kind: 'h', text: 'How the process works' },
      {
        kind: 'steps',
        items: [
          { term: 'Inspection', text: 'The tyre is thoroughly examined to assess the extent and location of the damage.' },
          {
            term: 'Preparation',
            text: 'The damaged area is cut, cleaned and buffed to remove contaminants and prepare the surface.',
          },
          { term: 'Filling', text: 'A specially formulated raw rubber compound is applied to the damaged area.' },
          {
            term: 'Curing',
            text: 'In hot vulcanising, the tyre is placed in a press or autoclave for heat and pressure curing. In cold vulcanising, chemicals cure the rubber over time.',
          },
          {
            term: 'Finishing',
            text: 'Excess material is trimmed, and the surface is smoothed out to match the original tread or sidewall.',
          },
        ],
      },
      { kind: 'h', text: 'Benefits' },
      {
        kind: 'list',
        items: [
          'Cost-effective: restores expensive tyres, especially truck or off-road tyres, rather than replacing them',
          'Durable: can handle high loads and speeds once properly repaired',
          'Eco-friendly: extends tyre life and reduces waste in landfills',
          'Safe: when done correctly, vulcanised repairs are nearly as strong as the original tyre',
        ],
      },
      { kind: 'h', text: 'Limitations' },
      {
        kind: 'list',
        items: [
          'Not all tyres or damage types are suitable for vulcanising (for example severe bead damage or burnt rubber)',
          'Must be done by trained professionals to ensure safety and compliance with industry standards',
          'May not be legal for passenger car tyres in certain jurisdictions depending on the damage location',
        ],
      },
      { kind: 'h', text: 'Common use cases' },
      {
        kind: 'list',
        items: [
          'Truck and bus tyres',
          'Agricultural and industrial tyres',
          'Off-the-road (OTR) tyres used in mining or construction',
        ],
      },
    ],
  },
  {
    slug: 'foam-filling',
    name: 'Polyurethane Foam Filling',
    category: 'Tyre Care & Repair',
    summary: 'Replace air with polyurethane foam and eliminate flats entirely on slow-moving plant.',
    intro:
      'Foam filling is a process used to replace the air in pneumatic tyres with a dense, polyurethane-based foam. It is commonly applied to industrial, agricultural, construction and off-road vehicle tyres where punctures and downtime can be costly or dangerous.',
    image: '/images/services/foam-filling.jpg',
    icon: 'shield',
    highlights: ['Zero flats, ever', 'Maintenance-free', 'Added stability & traction', 'Extends tyre life'],
    blocks: [
      { kind: 'h', text: 'Why foam fill tyres?' },
      {
        kind: 'p',
        text: 'Foam filling eliminates the risk of flat tyres by converting them into solid, puncture-proof units. The foam used is a two-part liquid polyurethane that expands and cures inside the tyre, creating a firm but slightly flexible core that mimics air pressure while offering greater durability.',
      },
      { kind: 'h', text: 'Benefits of foam-filled tyres' },
      {
        kind: 'defs',
        items: [
          { term: 'Puncture-proof', text: 'No more flats or blowouts, even in harsh environments.' },
          { term: 'Maintenance-free', text: 'No need to check air pressure or repair punctures.' },
          { term: 'Added weight', text: 'Increases stability and traction, especially useful for heavy equipment.' },
          {
            term: 'Consistent performance',
            text: 'Eliminates bounce and pressure loss common in air-filled tyres.',
          },
          { term: 'Extended tyre life', text: 'Reduces sidewall and tread damage from under-inflation.' },
        ],
      },
      { kind: 'h', text: 'Common applications' },
      {
        kind: 'list',
        items: ['Skid steers', 'Forklifts', 'Backhoes', 'Tractors', 'Telehandlers', 'Mining and construction vehicles'],
      },
      { kind: 'h', text: 'Considerations' },
      {
        kind: 'list',
        items: [
          'Heavier than air-filled tyres, which can affect fuel efficiency and suspension',
          'Not suitable for high-speed vehicles, mainly used in low-speed, high-load applications',
          'Permanent: once foam-filled, tyres cannot be deflated or easily changed',
        ],
      },
      {
        kind: 'p',
        text: 'Foam filling is a practical solution for industries that require maximum tyre uptime, safety and durability. While it adds weight and cost, the long-term benefits of zero flats and lower maintenance make it a smart investment for demanding job sites.',
      },
    ],
  },
  {
    slug: 'nitrogen',
    name: 'Nitrogen Inflation',
    category: 'Tyre Care & Repair',
    summary: 'Dry, inert nitrogen holds pressure longer, cuts corrosion and improves fuel economy.',
    intro:
      'Nitrogen is becoming an increasingly popular alternative to regular air for inflating vehicle tyres, and for good reason.',
    image: '/images/services/nitrogen.jpg',
    icon: 'gauge',
    highlights: ['Better pressure retention', 'Improved fuel efficiency', 'Longer tyre life', 'Less rim corrosion'],
    blocks: [
      { kind: 'h', text: 'Why use nitrogen in tyres?' },
      {
        kind: 'steps',
        items: [
          {
            term: 'Improved pressure retention',
            text: 'Nitrogen molecules are larger and less likely to seep through the rubber of a tyre compared to oxygen. This means tyre pressure remains more stable over time, reducing the need for frequent top-ups.',
          },
          {
            term: 'Better fuel efficiency',
            text: 'Properly inflated tyres reduce rolling resistance, which helps improve fuel efficiency. Since nitrogen maintains pressure more consistently, vehicles can run more efficiently and economically.',
          },
          {
            term: 'Increased tyre life',
            text: 'Under-inflated tyres wear out faster and unevenly. By keeping tyres properly inflated for longer, nitrogen helps extend their lifespan and maintain optimal performance.',
          },
          {
            term: 'Enhanced safety',
            text: 'Stable tyre pressure improves handling, braking and overall vehicle control. This contributes to safer driving, especially in high-speed or long-distance conditions.',
          },
          {
            term: 'Less moisture, less corrosion',
            text: 'Compressed air often contains moisture, which can lead to corrosion of the tyre’s inner lining and rim. Nitrogen is dry and inert, reducing moisture build-up and helping prevent internal damage over time.',
          },
        ],
      },
      { kind: 'h', text: 'Is it worth it?' },
      {
        kind: 'p',
        text: 'For everyday drivers, nitrogen offers benefits, especially in maintaining pressure and reducing maintenance. For high-performance vehicles, fleet operators, or those looking for every edge in safety and efficiency, nitrogen can be a smart upgrade.',
      },
    ],
  },

  /* ------------------------------------------------------------ VEHICLE SERVICING */
  {
    slug: 'alignment',
    name: 'Passenger & Truck Alignment',
    category: 'Vehicle Servicing',
    summary: 'Camber, toe and caster set correctly, plus total vehicle alignment for multi-axle rigs.',
    intro:
      'Alignment refers to the precise adjustment of a vehicle’s suspension system, the components that connect the vehicle to its wheels. It’s not just about the wheels being “straight”; proper alignment ensures that all angles and components work together optimally, improving performance, safety and tyre longevity.',
    image: '/images/services/alignment.jpg',
    icon: 'target',
    highlights: ['Prevents uneven tyre wear', 'Improves fuel efficiency', 'Total vehicle alignment', 'Thrust angle correction'],
    blocks: [
      { kind: 'h', text: 'Why alignment matters' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Tyre wear prevention',
            text: 'Misalignment causes uneven tyre wear, which reduces tyre lifespan and increases the need for premature replacement.',
          },
          {
            term: 'Improved fuel efficiency',
            text: 'A properly aligned vehicle reduces rolling resistance, helping to maximise fuel economy, especially crucial for long-haul trucks.',
          },
          {
            term: 'Safety & handling',
            text: 'Correct alignment improves steering responsiveness, vehicle stability and braking performance, essential for both daily drivers and commercial operators.',
          },
        ],
      },
      { kind: 'h', text: 'Passenger vehicle alignment' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Camber',
            text: 'Tilt of the wheels when viewed from the front. Excessive tilt can cause tyre wear.',
          },
          {
            term: 'Toe',
            text: 'Direction the tyres point relative to each other. Incorrect toe-in or toe-out affects handling.',
          },
          { term: 'Caster', text: 'Angle of the steering axis, influencing stability and cornering.' },
        ],
      },
      {
        kind: 'p',
        text: 'Passenger vehicles are more sensitive to minor alignment issues, which can impact comfort, tyre life and handling, especially at highway speeds.',
      },
      { kind: 'h', text: 'Truck alignment' },
      {
        kind: 'p',
        text: 'Trucks, especially commercial ones, require more complex alignment processes due to multiple axles (steer, drive and trailer), heavier loads and higher mileage, and suspension variations such as air ride and leaf spring.',
      },
      {
        kind: 'defs',
        items: [
          { term: 'Total vehicle alignment (TVA)', text: 'Aligning all axles, not just the steering axle.' },
          {
            term: 'Thrust angle correction',
            text: 'Ensuring the rear axle is aligned with the chassis and front wheels.',
          },
          {
            term: 'Trailer alignment',
            text: 'Often overlooked but critical for reducing drag and tyre wear.',
          },
        ],
      },
      {
        kind: 'p',
        text: 'Even a minor misalignment on a heavy-duty truck can result in thousands of rands in tyre and fuel costs annually.',
      },
      { kind: 'h', text: 'Signs you need an alignment' },
      {
        kind: 'list',
        items: [
          'Uneven or rapid tyre wear',
          'Vehicle pulling to one side',
          'Off-centre steering wheel',
          'Vibration in the steering wheel',
          'Increased fuel consumption, especially on trucks',
        ],
      },
    ],
  },
  {
    slug: 'brakes-suspension',
    name: 'Brakes & Suspension',
    category: 'Vehicle Servicing',
    summary: 'Pads, rotors, calipers, shocks, struts and bushes, all inspected, replaced and tested.',
    intro:
      'The braking system is one of the most critical safety components in any vehicle, and the suspension system determines how that braking is delivered to the road. We service both, using quality components from established brands.',
    image: '/images/services/brakes-suspension.jpg',
    icon: 'brake',
    highlights: ['Disc & drum systems', 'ABS, EBD & brake assist', 'Coil, leaf & air springs', 'Shocks, struts & control arms'],
    blocks: [
      { kind: 'h', text: 'Brakes: stopping power and safety' },
      {
        kind: 'p',
        text: 'The braking system’s primary function is to slow down or stop the vehicle when needed. Modern vehicles use disc brakes and drum brakes, controlled by either a hydraulic system or an electronic system such as ABS (anti-lock braking system).',
      },
      {
        kind: 'list',
        items: [
          'Brake pads and shoes',
          'Rotors and drums',
          'Brake calipers',
          'Brake lines and fluid',
          'Master cylinder',
        ],
      },
      {
        kind: 'p',
        text: 'Advanced features like ABS, Electronic Brake-force Distribution (EBD) and Brake Assist (BA) improve performance and safety under various driving conditions.',
      },
      { kind: 'h', text: 'Suspension: comfort and control' },
      {
        kind: 'p',
        text: 'The suspension system connects a vehicle to its wheels and is responsible for absorbing shocks, maintaining tyre contact and ensuring a smooth and stable ride. It also plays a key role in vehicle handling and cornering performance.',
      },
      {
        kind: 'list',
        items: [
          'Springs (coil, leaf or air)',
          'Shock absorbers or dampers',
          'Struts',
          'Control arms',
          'Stabiliser bars (sway bars)',
        ],
      },
      {
        kind: 'p',
        text: 'There are different suspension setups (independent suspension, MacPherson strut, multi-link and others), each offering unique advantages in ride quality and handling.',
      },
      { kind: 'h', text: 'Why they matter' },
      {
        kind: 'p',
        text: 'Together, brakes and suspension not only determine how a vehicle performs but also how safe and comfortable it is. Regular maintenance of these systems is essential to ensure optimal functionality, especially in demanding driving conditions.',
      },
    ],
  },
  {
    slug: 'disc-skimming',
    name: 'Disc Brake Skimming',
    category: 'Vehicle Servicing',
    summary: 'Machine warped or scored rotors flat again instead of replacing them.',
    intro:
      'Disc brake skimming restores the surface of a vehicle’s brake discs by removing a very thin layer of metal. This eliminates imperfections such as scoring, uneven wear or warping that develop over time due to heat, corrosion or repeated braking.',
    image: '/images/services/disc-skimming.jpg',
    icon: 'disc',
    highlights: ['Cheaper than replacement', 'Removes brake judder', 'On-car and off-car methods', 'Extends new pad life'],
    blocks: [
      { kind: 'h', text: 'Why is it done?' },
      {
        kind: 'p',
        text: 'Over time, brake discs can become uneven, leading to problems like brake judder (vibration when braking), noisy braking (squealing or grinding), reduced braking performance and uneven pad wear.',
      },
      {
        kind: 'p',
        text: 'Skimming the discs can solve these issues without needing a full disc replacement, making it a more cost-effective and environmentally friendly option.',
      },
      { kind: 'h', text: 'How it is done' },
      {
        kind: 'defs',
        items: [
          {
            term: 'On-car skimming',
            text: 'The discs are skimmed while still mounted on the vehicle using a special machine that aligns perfectly with the vehicle’s hub, ensuring high accuracy.',
          },
          { term: 'Off-car skimming', text: 'The discs are removed and machined separately on a lathe.' },
        ],
      },
      {
        kind: 'p',
        text: 'The process smooths out the surface, restores flatness and ensures consistent contact with the brake pads.',
      },
      { kind: 'h', text: 'When to consider skimming' },
      {
        kind: 'list',
        items: [
          'If your brakes are vibrating or pulsing when applied',
          'If you’re replacing brake pads and the discs are still within thickness limits but show signs of wear',
          'If the surface is glazed or has minor grooves',
          'As part of regular brake maintenance, if advised by a technician',
        ],
      },
      { kind: 'h', text: 'Pros' },
      {
        kind: 'list',
        items: [
          'Cheaper than disc replacement',
          'Restores braking efficiency',
          'Increases lifespan of new brake pads',
          'Reduces noise and vibration',
          'Eco-friendly, with less waste',
        ],
      },
      { kind: 'h', text: 'Limitations' },
      {
        kind: 'list',
        items: [
          'Discs must remain above the minimum discard thickness after skimming',
          'Severely worn, cracked or warped discs may still need replacement',
          'Not suitable for all vehicles or disc types',
        ],
      },
    ],
  },
  {
    slug: 'diagnostics',
    name: 'Vehicle Diagnostics',
    category: 'Vehicle Servicing',
    summary: 'OBD-II scanning and fault finding across engine, transmission, ABS, SRS and HVAC.',
    intro:
      'Vehicle diagnostics is the process of identifying and analysing issues within a car’s systems using specialised tools and software. Modern vehicles are equipped with onboard computers, sensors and control modules that monitor performance and detect malfunctions.',
    image: '/images/services/diagnostics.jpg',
    icon: 'scan',
    highlights: ['OBD-II code reading', 'Live sensor waveforms', 'Preventative maintenance', 'Faster, cheaper repairs'],
    blocks: [
      { kind: 'h', text: 'How vehicle diagnostics work' },
      {
        kind: 'p',
        text: 'Most vehicles manufactured after the mid-1990s use a standardised system called OBD-II (On-Board Diagnostics II). This system monitors key components like the engine, transmission, exhaust and fuel system. When an issue arises, the OBD-II system generates diagnostic trouble codes (DTCs) that can be read with a scan tool or code reader.',
      },
      { kind: 'h', text: 'Commonly diagnosed systems' },
      {
        kind: 'defs',
        items: [
          { term: 'Engine & emissions', text: 'Misfires, sensor failures, exhaust leaks.' },
          { term: 'Transmission', text: 'Shifting problems, fluid pressure issues.' },
          { term: 'Brakes (ABS)', text: 'Anti-lock brake faults, worn sensors.' },
          { term: 'Airbags (SRS)', text: 'Deployment system faults, sensor failures.' },
          { term: 'Battery & charging system', text: 'Alternator, battery voltage levels.' },
          { term: 'HVAC', text: 'Climate control, blower motor issues.' },
        ],
      },
      { kind: 'h', text: 'Tools used' },
      {
        kind: 'defs',
        items: [
          { term: 'OBD-II scanners', text: 'Read and clear diagnostic codes.' },
          { term: 'Multimeters', text: 'Test electrical continuity and voltage.' },
          { term: 'Smoke machines', text: 'Find vacuum leaks.' },
          { term: 'Oscilloscopes', text: 'Inspect live waveforms from sensors and actuators.' },
        ],
      },
      { kind: 'h', text: 'Benefits of diagnostics' },
      {
        kind: 'list',
        items: [
          'Faster repairs: pinpoint problems quickly',
          'Preventative maintenance: catch issues before they become serious',
          'Cost savings: avoid unnecessary parts replacement',
          'Improved safety: ensure critical systems like brakes and airbags are functional',
        ],
      },
      {
        kind: 'p',
        text: 'While many owners use basic code readers to identify issues, professional diagnostics involve more advanced tools and deeper expertise. Certified technicians can interpret complex codes, perform tests and follow manufacturer-specific procedures.',
      },
    ],
  },

  /* ----------------------------------------------------------- FLEET & EMERGENCY */
  {
    slug: 'breakdown-services',
    name: '24/7 Breakdown Services',
    category: 'Fleet & Emergency',
    summary: 'Fully equipped response units for trucks and mining vehicles, day or night, nationwide.',
    intro:
      'When heavy-duty machines break down, every minute of downtime costs money. That’s why our 24/7 Breakdown Services are designed to get your trucks and mining vehicles back on the job, fast.',
    image: '/images/gallery/otr-haul-truck.jpg',
    icon: 'siren',
    highlights: ['24 hours, 7 days a week', 'Rapid response in remote areas', 'Fully equipped service vehicles', 'Qualified technicians'],
    blocks: [
      {
        kind: 'p',
        text: 'Whether you’re hauling freight across the country or operating in remote mining sites, mechanical failures can happen anytime, anywhere. Our expert technicians are on call 24 hours a day, 7 days a week, ready to respond with fully equipped service vehicles and specialised tools.',
      },
      { kind: 'h', text: 'We service' },
      {
        kind: 'list',
        items: [
          'Heavy trucks: rigids, semis and road trains',
          'Mining vehicles: haul trucks, loaders, ADTs and more',
          'Mechanical breakdowns',
        ],
      },
      { kind: 'h', text: 'Our capabilities' },
      {
        kind: 'list',
        items: [
          'On-site diagnostics and repairs',
          'Hydraulic hose replacements',
          'Electrical fault finding',
          'Engine and transmission repairs',
          'Preventative maintenance support',
        ],
      },
      { kind: 'h', text: 'Why choose us' },
      {
        kind: 'list',
        items: [
          'Rapid response times, even in remote areas',
          'Qualified, experienced technicians',
          'Quality workmanship',
          'Commitment to safety and uptime',
        ],
      },
      {
        kind: 'p',
        text: 'Whether it’s a blown hose in the middle of the night or a flat tyre, we’re your trusted partner to keep your fleet moving and your operation running smoothly.',
      },
    ],
  },
  {
    slug: 'load-studies',
    name: 'Load Studies',
    category: 'Fleet & Emergency',
    summary: 'Measure how weight is distributed across your axles, and what it is costing you.',
    intro:
      'A load study on a truck involves analysing how weight is distributed, how much load the truck carries over time, and how that load affects vehicle performance, safety, efficiency and system design. It is an essential process for both mechanical and electrical systems in modern trucks, including electric and hybrid models.',
    image: '/images/services/load-studies.webp',
    icon: 'scale',
    highlights: ['Axle-by-axle weighing', 'Regulatory compliance', 'Fuel & tyre cost reduction', 'Fleet route planning'],
    blocks: [
      { kind: 'h', text: 'Purpose of a truck load study' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Weight distribution & safety',
            text: 'To ensure the truck’s load is evenly and safely distributed across axles, preventing overloading of any single axle and reducing the risk of accidents or mechanical failure.',
          },
          {
            term: 'Performance optimisation',
            text: 'Heavier or uneven loads can impact fuel consumption, tyre wear, braking, suspension and handling. Load studies help optimise performance under different cargo conditions.',
          },
          {
            term: 'Regulatory compliance',
            text: 'To meet legal limits on gross vehicle weight (GVW) and axle weights, and ensure compliance with transportation regulations.',
          },
          {
            term: 'Electric load management',
            text: 'For electric trucks, load studies are also used to evaluate electrical load requirements (such as refrigeration units and onboard systems) and manage battery life and energy efficiency.',
          },
        ],
      },
      { kind: 'h', text: 'Key factors in a load study' },
      {
        kind: 'defs',
        items: [
          {
            term: 'Gross vehicle weight (GVW)',
            text: 'Total weight of the truck including cargo, driver, fuel and accessories.',
          },
          { term: 'Axle load', text: 'Weight carried by each axle to ensure it’s within safe and legal limits.' },
          {
            term: 'Payload distribution',
            text: 'Positioning of cargo to maintain balance and prevent overloading front, rear or side-to-side.',
          },
          {
            term: 'Driving patterns',
            text: 'How load affects acceleration, braking and stability on different road grades and surfaces.',
          },
          {
            term: 'Suspension & tyre loads',
            text: 'Monitoring how different loads impact wear and lifespan of suspension and tyre systems.',
          },
        ],
      },
      { kind: 'h', text: 'Tools and methods used' },
      {
        kind: 'defs',
        items: [
          { term: 'Weigh stations or portable scales', text: 'To measure axle and total vehicle weight.' },
          {
            term: 'Load cells & sensors',
            text: 'Installed in the truck bed or suspension system to continuously monitor weight.',
          },
          { term: 'Telematics systems', text: 'Real-time data tracking of load, GPS and vehicle performance metrics.' },
          {
            term: 'Simulation software',
            text: 'For planning load scenarios, especially in fleet operations or for new vehicle designs.',
          },
        ],
      },
      { kind: 'h', text: 'Benefits' },
      {
        kind: 'list',
        items: [
          'Increased fuel efficiency and reduced operational costs',
          'Improved safety and vehicle handling',
          'Longer lifespan of tyres, brakes and suspension components',
          'Better route and load planning for logistics and supply chain operations',
          'Enhanced battery management and electrical load planning in electric trucks',
        ],
      },
      {
        kind: 'p',
        text: 'Whether you’re operating a single vehicle or managing a fleet, understanding how different loads affect your trucks leads to smarter logistics, reduced wear and tear, and better fuel or energy efficiency.',
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const servicesByCategory = serviceCategories.map((c) => ({
  ...c,
  services: services.filter((s) => s.category === c.name),
}));
