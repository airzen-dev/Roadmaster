export const site = {
  name: 'Roadmaster Tyre Services',
  shortName: 'Roadmaster',
  established: 1941,
  reincorporated: 2007,
  tagline: 'Tyre & Value-Added Service Specialists',
  url: 'https://roadmastertyreservices.co.za',
  description:
    'Roadmaster Tyre Services is a multi-branded specialist in transport, industrial, earthmover and passenger tyres, with 24/7 nationwide breakdown assistance, on-site retreading, vulcanising, alignment and fleet tyre management across six South African locations.',
  breakdownHeadline: '24/7 Breakdown Assist, Nationwide',
} as const;

/** Primary phone shown in the header: the Jet Park 24/7 line. */
export const primaryBreakdownPhone = {
  label: '071 604 7398',
  tel: '+27716047398',
  whatsapp: '27716047398',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Products', href: '/products/' },
  { label: 'Branches', href: '/branches/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Health & Safety', href: '/health-and-safety/' },
  { label: 'Contact', href: '/contact/' },
];

export const socials = [
  {
    branch: 'Jet Park',
    facebook: 'https://www.facebook.com/Roadmaster-Jet-Park-102730058296066',
    instagram: 'https://www.instagram.com/roadmastertyreservices_jetpark/',
  },
  {
    branch: 'Richards Bay (OTR)',
    facebook: 'https://www.facebook.com/profile.php?id=100054549635193',
    instagram: 'https://www.instagram.com/roadmastertyreservices_otr/',
  },
];

export const stats = [
  { value: '1941', label: 'Established', detail: 'Over eight decades on South African roads' },
  { value: '6', label: 'Locations', detail: 'Gauteng & KwaZulu-Natal, serving nationwide' },
  { value: '24/7', label: 'Breakdown assist', detail: 'Fully equipped response units on call' },
  { value: '14', label: 'Specialist services', detail: 'From passenger fitment to OTR retreading' },
];
