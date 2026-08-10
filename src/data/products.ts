export type Brand = { name: string; note: string; logo: string };

export const tyreBrands: Brand[] = [
  {
    name: 'Michelin',
    note: 'Premium passenger, truck and OTR earthmover ranges',
    logo: '/images/brands/michelin.png',
  },
  {
    name: 'Continental',
    note: 'Passenger, commercial and eco-regional truck fitments',
    logo: '/images/brands/continental.png',
  },
  {
    name: 'Dunlop',
    note: 'Passenger, 4x4 and commercial, a long-standing partner brand',
    logo: '/images/brands/dunlop.png',
  },
  {
    name: 'Sumitomo',
    note: 'Commercial, industrial and earthmoving applications',
    logo: '/images/brands/sumitomo.png',
  },
  {
    name: 'CEAT',
    note: 'Agricultural, commercial and off-highway specialist',
    logo: '/images/brands/ceat.png',
  },
  {
    name: 'Boto',
    note: 'Value truck, trailer and OTR fitments',
    logo: '/images/brands/boto.png',
  },
  {
    name: 'Infinity',
    note: 'Passenger, SUV and light commercial value range',
    logo: '/images/brands/infinity.png',
  },
];

/** Suspension and braking brands we stock and fit. */
export const partsBrands: Brand[] = [
  { name: 'KYB', note: 'World-class shocks and struts', logo: '/images/brands/kyb.png' },
  { name: 'Monroe', note: 'Shocks and struts', logo: '/images/brands/monroe.png' },
  { name: 'Gabriel', note: 'Shocks, including Safari and HDP ranges', logo: '/images/brands/gabriel.png' },
  { name: 'ATE', note: 'Brake pads, rotors and hydraulics', logo: '/images/brands/ate.png' },
  { name: 'Ferodo', note: 'Brake friction products', logo: '/images/brands/ferodo.png' },
  { name: 'Bosal', note: 'Towbars and tow hitches', logo: '/images/brands/bosal.png' },
];

export const allBrands: Brand[] = [...tyreBrands, ...partsBrands];

export const productGroups = [
  {
    slug: 'tyres',
    name: 'Tyres',
    blurb:
      'As an independent multi-branded supplier we are not locked to one manufacturer. We fit the tyre that suits your application, your terrain and your budget: passenger, 4x4, truck, bus, agricultural, industrial and earthmover.',
    items: [
      'Passenger & SUV',
      '4x4 and all-terrain',
      'Light commercial (LT)',
      'Truck & bus: steer, drive, trailer',
      'Agricultural & implement',
      'Industrial & forklift',
      'Earthmover & OTR',
      'Retreaded truck tyres',
    ],
    image: '/images/services/truck-tyres.jpg',
  },
  {
    slug: 'shocks',
    name: 'Shocks & Suspension',
    blurb:
      'Shock absorbers, struts, coil and leaf springs and related suspension components. Supplied and fitted, with quality brands including Gabriel, Monroe and KYB.',
    items: ['Shock absorbers', 'Struts & strut mounts', 'Coil & leaf springs', 'Bushes & control arms', 'Stabiliser bars'],
    image: '/images/services/brakes-suspension.jpg',
    brands: ['Gabriel', 'Monroe', 'KYB'],
  },
  {
    slug: 'brakes',
    name: 'Brakes',
    blurb:
      'Brake pads, shoes, rotors, drums, calipers and hydraulics for passenger and commercial vehicles, including ATE brake components.',
    items: ['Brake pads & shoes', 'Rotors & drums', 'Calipers', 'Brake lines & fluid', 'Master cylinders'],
    image: '/images/services/disc-skimming.jpg',
    brands: ['ATE'],
  },
  {
    slug: 'rims-and-mags',
    name: 'Rims & Mags',
    blurb:
      'Steel rims and alloy mag wheels in a wide range of fitments and offsets, correctly matched to your tyre size and load rating.',
    items: ['Alloy mag wheels', 'Steel rims', 'Commercial & OTR rims', 'Wheel nuts & accessories'],
    image: '/images/gallery/alignment-fortuner.jpg',
  },
  {
    slug: 'bumpers-and-towbars',
    name: 'Bumpers & Towbars',
    blurb:
      'Replacement and accessory bumpers, nudge bars, rollbars and towbars for bakkies and 4x4s, supplied and fitted at the branch.',
    items: ['Nudge bars & bull bars', 'Rollbars', 'Towbars & tow hitches', 'Side steps'],
    image: '/images/gallery/workshop-reception.jpg',
  },
];
