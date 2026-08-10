import { ArrowRight } from '@/components/Icons';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(253,230,64,0.12),transparent_55%)]"
      />
      <div className="container-rm py-20 text-center">
        <p className="font-display text-[clamp(4rem,16vw,10rem)] leading-none font-black text-yellow/20">
          404
        </p>
        <h1 className="mt-4 text-[clamp(1.6rem,4.5vw,2.5rem)] uppercase">This road goes nowhere</h1>
        <p className="prose-rm mx-auto mt-5 max-w-md">
          The page you were after has moved or never existed. Let&rsquo;s get you back on tarmac.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" icon={<ArrowRight className="order-2 size-4" />}>
            Back to home
          </Button>
          <Button href="/services/" variant="outline" size="lg">
            Our services
          </Button>
          <Button href="/branches/" variant="outline" size="lg">
            Find a branch
          </Button>
        </div>
      </div>
    </section>
  );
}
