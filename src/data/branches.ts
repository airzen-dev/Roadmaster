export type Branch = {
  slug: string;
  name: string;
  /** Recognisable town name for chips, strips and labels (the suburb alone reads as nowhere). */
  short: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  phoneTel: string;
  breakdown?: string;
  breakdownTel?: string;
  /** Some branches publish a second after-hours line; both are kept so a caller always gets through. */
  breakdownAlt?: string;
  breakdownAltTel?: string;
  whatsapp?: string;
  hours: { days: string; time: string }[];
  hoursSummary: string;
  mapQuery: string;
  image: string;
  blurb: string;
  specialities: string[];
  facebook?: string;
  instagram?: string;
};

/**
 * Trading hours on the source site were published as "Open today 08:00 – 17:00"
 * for every branch except Manufacturing (07:00 – 16:30). Weekday hours are
 * carried through as published; weekend hours were not published, so they are
 * shown as "by arrangement" alongside the 24/7 breakdown line.
 */
export const branches: Branch[] = [
  {
    slug: 'jet-park',
    name: 'Roadmaster Tyre Services Jet Park',
    short: 'Jet Park',
    city: 'Jet Park, Boksburg',
    region: 'Gauteng',
    address: '70 Kelly Road, Jet Park, Boksburg, South Africa',
    phone: '011 974 4078',
    phoneTel: '+27119744078',
    breakdown: '071 604 7398',
    breakdownTel: '+27716047398',
    whatsapp: '27716047398',
    hours: [
      { days: 'Monday – Friday', time: '08:00 – 17:00' },
      { days: 'Saturday – Sunday', time: 'By arrangement' },
      { days: 'Breakdown assist', time: '24 hours, 7 days' },
    ],
    hoursSummary: 'Mon – Fri 08:00 – 17:00',
    mapQuery: '70 Kelly Road, Jet Park, Boksburg, Gauteng, South Africa',
    image: '/images/branches/jet-park.jpg',
    blurb:
      'Our Gauteng hub on the East Rand, minutes from the N12 and OR Tambo freight corridor. Full commercial and passenger fitment, alignment, brakes and a 24/7 breakdown fleet covering the Reef.',
    specialities: ['Truck & bus fitment', 'Passenger & 4x4', 'Alignment', 'Brakes & suspension', '24/7 breakdown'],
    facebook: 'https://www.facebook.com/Roadmaster-Jet-Park-102730058296066',
    instagram: 'https://www.instagram.com/roadmastertyreservices_jetpark/',
  },
  {
    slug: 'richards-bay',
    name: 'Roadmaster Tyre Services OTR',
    short: 'Richards Bay',
    city: 'Alton, Richards Bay',
    region: 'KwaZulu-Natal',
    address: '100 Alumina Allee Street, Alton, Richards Bay, South Africa',
    phone: '035 751 2236',
    phoneTel: '+27357512236',
    breakdown: '060 500 0744',
    breakdownTel: '+27605000744',
    whatsapp: '27605000744',
    hours: [
      { days: 'Monday – Friday', time: '08:00 – 17:00' },
      { days: 'Saturday – Sunday', time: 'By arrangement' },
      { days: 'Breakdown assist', time: '24 hours, 7 days' },
    ],
    hoursSummary: 'Mon – Fri 08:00 – 17:00',
    mapQuery: '100 Alumina Allee Street, Alton, Richards Bay, KwaZulu-Natal, South Africa',
    image: '/images/branches/richards-bay.jpg',
    blurb:
      'Our off-the-road (OTR) and earthmover centre, built around the heavy industry and mining operations of the Richards Bay corridor. Load studies, foam filling and giant-tyre handling capability.',
    specialities: ['OTR & earthmover', 'Mining tyres', 'Foam filling', 'Load studies', '24/7 breakdown'],
    facebook: 'https://www.facebook.com/profile.php?id=100054549635193',
    instagram: 'https://www.instagram.com/roadmastertyreservices_otr/',
  },
  {
    slug: 'kwadukuza',
    name: 'Roadmaster Tyre Services KwaDukuza',
    short: 'KwaDukuza',
    city: 'Stanger, KwaDukuza',
    region: 'KwaZulu-Natal',
    address: '9 Lindsay Rd, Stanger Ext 15, KwaDukuza, 4449',
    phone: '032 511 3036',
    phoneTel: '+27325113036',
    breakdown: '067 403 6888',
    breakdownTel: '+27674036888',
    // The source site lists this second KwaDukuza after-hours number as well.
    breakdownAlt: '079 876 2068',
    breakdownAltTel: '+27798762068',
    whatsapp: '27674036888',
    hours: [
      { days: 'Monday – Friday', time: '08:00 – 17:00' },
      { days: 'Saturday – Sunday', time: 'By arrangement' },
      { days: 'Breakdown assist', time: '24 hours, 7 days' },
    ],
    hoursSummary: 'Mon – Fri 08:00 – 17:00',
    mapQuery: '9 Lindsay Road, Stanger Ext 15, KwaDukuza, 4449, South Africa',
    image: '/images/branches/kwadukuza.jpg',
    blurb:
      'Serving the North Coast sugar, agriculture and transport sectors. Commercial and agricultural fitment, tyre repairs and rapid breakdown response along the N2.',
    specialities: ['Agricultural tyres', 'Truck & trailer', 'Vulcanised repairs', '24/7 breakdown'],
  },
  {
    slug: 'pinetown',
    name: 'Roadmaster Tyre Services Pinetown',
    short: 'Pinetown',
    city: 'Westmead, Pinetown',
    region: 'KwaZulu-Natal',
    address: '48 Westmead Road, Westmead, Pinetown, South Africa',
    phone: '064 751 8463',
    phoneTel: '+27647518463',
    breakdown: '064 751 8463',
    breakdownTel: '+27647518463',
    whatsapp: '27647518463',
    hours: [
      { days: 'Monday – Friday', time: '08:00 – 17:00' },
      { days: 'Saturday – Sunday', time: 'By arrangement' },
      { days: 'Breakdown assist', time: '24 hours, 7 days' },
    ],
    hoursSummary: 'Mon – Fri 08:00 – 17:00',
    mapQuery: '48 Westmead Road, Westmead, Pinetown, KwaZulu-Natal, South Africa',
    image: '/images/branches/pinetown.jpg',
    blurb:
      'Our Durban-metro branch in the Westmead industrial node, sharing the site with Roadmaster Manufacturing. Full commercial fitment and fast turnaround for fleets working the Durban port routes.',
    specialities: ['Truck & bus fitment', 'Passenger & 4x4', 'Alignment', '24/7 breakdown'],
  },
  {
    slug: 'south-coast',
    name: 'Roadmaster Tyre Services Port Shepstone',
    short: 'Port Shepstone',
    city: 'Marburg, Port Shepstone',
    region: 'KwaZulu-Natal South Coast',
    address: '7 Industrial Road, Marburg, Port Shepstone, South Africa',
    phone: '039 682 4233',
    phoneTel: '+27396824233',
    hours: [
      { days: 'Monday – Friday', time: '08:00 – 17:00' },
      { days: 'Saturday – Sunday', time: 'By arrangement' },
    ],
    hoursSummary: 'Mon – Fri 08:00 – 17:00',
    mapQuery: '7 Industrial Road, Marburg, Port Shepstone, KwaZulu-Natal, South Africa',
    image: '/images/branches/south-coast.jpg',
    blurb:
      'The South Coast branch, covering Port Shepstone, Margate and the surrounding agricultural and transport operators with commercial and passenger tyre services.',
    specialities: ['Truck & trailer', 'Passenger & 4x4', 'Agricultural tyres', 'Tyre repairs'],
  },
  {
    slug: 'roadmaster-manufacturing',
    name: 'Roadmaster Manufacturing',
    short: 'Manufacturing',
    city: 'Westmead, Pinetown',
    region: 'KwaZulu-Natal',
    address: '48 Westmead Road, Westmead, Pinetown, South Africa',
    phone: '031 109 5111',
    phoneTel: '+27311095111',
    hours: [
      { days: 'Monday – Friday', time: '07:00 – 16:30' },
      { days: 'Saturday – Sunday', time: 'Closed' },
    ],
    hoursSummary: 'Mon – Fri 07:00 – 16:30',
    mapQuery: '48 Westmead Road, Westmead, Pinetown, KwaZulu-Natal, South Africa',
    image: '/images/gallery/otr-delivery-truck.jpg',
    blurb:
      'The production side of the group: retreading, vulcanised casing repair and polyurethane foam filling, all carried out in-house under controlled process and quality standards.',
    specialities: ['Truck tyre retreading', 'Vulcanised repairs', 'Polyurethane foam filling', 'Casing inspection'],
  },
];

export const breakdownLines = branches
  .filter((b) => b.breakdown)
  .map((b) => ({
    branch: b.short,
    branchName: b.name,
    slug: b.slug,
    number: b.breakdown!,
    tel: b.breakdownTel!,
    alt: b.breakdownAlt,
    altTel: b.breakdownAltTel,
    region: b.region,
  }));

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}
