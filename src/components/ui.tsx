import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from './Icons';

/* -------------------------------------------------------------------- Button */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

const variants = {
  primary:
    'bg-yellow text-ink hover:bg-yellow-300 shadow-[0_10px_30px_-12px_rgba(253,230,64,0.55)] hover:shadow-[0_14px_38px_-12px_rgba(253,230,64,0.7)]',
  outline: 'border border-white/25 text-chalk hover:border-yellow hover:text-yellow bg-white/[0.03]',
  ghost: 'text-chalk hover:text-yellow',
  dark: 'bg-ink text-chalk hover:bg-ink-600 border border-white/10',
} as const;

const sizes = {
  md: 'h-11 px-5 text-[0.8125rem]',
  lg: 'h-13 px-7 text-sm',
} as const;

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  external,
}: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-full font-display font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {icon}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {icon}
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------- Section head */

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        /* The row is flex, so `text-center` on the wrapper does not centre it — it needs justify-center. */
        <p className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          {align === 'center' && <span className="h-px w-8 bg-yellow/50" />}
          {eyebrow}
          <span className="h-px w-8 bg-yellow/50" />
        </p>
      )}
      <h2 className="mt-4 text-[clamp(1.85rem,5vw,3rem)] leading-[1.06] uppercase">{title}</h2>
      {intro && <p className="prose-rm mt-5">{intro}</p>}
    </div>
  );
}

/* ---------------------------------------------------------- Checkered divider */

export function CheckerBand({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`checker h-3 w-full text-ink-500 ${className}`}
      style={{ backgroundColor: 'transparent' }}
    />
  );
}

/* ------------------------------------------------------------------ Link card */

export function CardLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition-all duration-500 hover:-translate-y-1 hover:border-yellow/45 hover:shadow-lift focus-visible:-translate-y-1 ${className}`}
    >
      {children}
    </Link>
  );
}

export function MoreLink({ children = 'Read more' }: { children?: ReactNode }) {
  return (
    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[0.7rem] font-bold tracking-[0.16em] text-yellow uppercase">
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
}

/* --------------------------------------------------------------- Bullet lists */

export function TickList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[0.9375rem] leading-relaxed text-mute">
          <span
            aria-hidden
            className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-yellow"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
