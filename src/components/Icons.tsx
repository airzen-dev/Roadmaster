import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M15.5 21A12.5 12.5 0 0 1 3 8.5 2.5 2.5 0 0 1 5.5 6h1.8a1 1 0 0 1 1 .8l.6 2.6a1 1 0 0 1-.5 1.1l-1.1.6a9.6 9.6 0 0 0 4.6 4.6l.6-1.1a1 1 0 0 1 1.1-.5l2.6.6a1 1 0 0 1 .8 1v1.8A2.5 2.5 0 0 1 15.5 21Z" />
  </svg>
);

export const Whatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.87 9.87 0 0 0 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm5.78 14.05c-.24.68-1.42 1.3-1.95 1.35-.53.05-1.03.24-3.55-.74-3.04-1.2-4.94-4.35-5.09-4.55-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37h.56c.18 0 .43-.07.66.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.2-.19.32-.38.5-.19.17-.4.39-.53.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.35.07.13.07.75-.17 1.43Z" />
  </svg>
);

export const Pin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.6 7 8.4 6 8.4-6" />
  </svg>
);

/* ---------------------------------------------------- service / feature icons */

export const Car = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 16v-3l1.8-4.4A2 2 0 0 1 8.15 7.3h7.7a2 2 0 0 1 1.85 1.3L19.5 13v3" />
    <path d="M3 13h18" />
    <circle cx="7.5" cy="16.5" r="1.9" />
    <circle cx="16.5" cy="16.5" r="1.9" />
  </svg>
);

export const Truck = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.5 6.5h10v9h-10z" />
    <path d="M12.5 9.5h4l3 3v3h-7z" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="16.5" cy="17.5" r="1.8" />
  </svg>
);

export const Mining = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="8.5" cy="15" r="4.5" />
    <path d="M8.5 10.5v9M4 15h9" />
    <path d="M13.5 15V8l3-3h4v7l-2.5 3" />
  </svg>
);

export const Tractor = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="7.5" cy="16" r="3.8" />
    <circle cx="17.5" cy="17.2" r="2.4" />
    <path d="M4 10h6l1.5 4M10 10V6h4l2 6h1.5" />
  </svg>
);

export const Recycle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7.5 8.5 5 13h5" />
    <path d="M12 3.5 9.5 8h5z" />
    <path d="M16.5 8.5 19 13l-4.5 1" />
    <path d="M17 17H7l2-2.5" />
    <path d="M7 17l2 2.5" />
  </svg>
);

export const Flame = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3s4.5 3.8 4.5 8.2A4.5 4.5 0 0 1 12 15.7a4.5 4.5 0 0 1-4.5-4.5C7.5 6.8 12 3 12 3Z" />
    <path d="M12 15.7c2.5 0 4 1.5 4 3.1H8c0-1.6 1.5-3.1 4-3.1Z" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.2 5 5.8v5.4c0 4.2 3 7.4 7 9.6 4-2.2 7-5.4 7-9.6V5.8Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);

export const Gauge = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 17a9 9 0 1 1 16 0" />
    <path d="m12 17 3.5-5" />
    <circle cx="12" cy="17" r="1.2" />
  </svg>
);

export const Target = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
  </svg>
);

export const Brake = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" />
  </svg>
);

export const Disc = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3.5A8.5 8.5 0 0 1 20.5 12" />
  </svg>
);

export const Scan = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M20 8.5V6a2 2 0 0 0-2-2h-2.5M4 15.5V18a2 2 0 0 0 2 2h2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5" />
    <path d="M7 12h10" />
  </svg>
);

export const Siren = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 17v-3a6 6 0 0 1 12 0v3" />
    <path d="M4 17h16v3H4z" />
    <path d="M12 5V2.5M4.5 8 3 6.5M19.5 8 21 6.5" />
  </svg>
);

export const Scale = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4v16M6 20h12" />
    <path d="M4 9h16M4 9l-2 5h4zM20 9l2 5h-4z" />
  </svg>
);

export const iconMap = {
  car: Car,
  truck: Truck,
  mining: Mining,
  tractor: Tractor,
  recycle: Recycle,
  flame: Flame,
  shield: Shield,
  gauge: Gauge,
  target: Target,
  brake: Brake,
  disc: Disc,
  scan: Scan,
  siren: Siren,
  scale: Scale,
} as const;

export type IconName = keyof typeof iconMap;
