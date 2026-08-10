import Image from 'next/image';
import type { Brand } from '@/data/products';

/**
 * Partner logos arrive with wildly different lockups and background colours
 * (Dunlop on yellow, ATE on blue, Michelin on white). A light chip normalises
 * them so the row reads as one system while each brand keeps its own colours.
 * `object-contain` inside a padded box means tall marks scale to the height and
 * wide wordmarks scale to the width, without cropping either.
 */
export function BrandChip({ brand, className = '' }: { brand: Brand; className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-xl bg-white p-4 ${className}`}>
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={600}
        height={300}
        sizes="220px"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
