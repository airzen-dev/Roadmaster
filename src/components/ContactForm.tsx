'use client';

import { useMemo, useState } from 'react';
import { branches } from '@/data/branches';
import { services } from '@/data/services';
import { ArrowRight, Whatsapp } from './Icons';

const contactable = branches.filter((b) => b.whatsapp);

/**
 * The site is a static export with no mail server, and no public email address is
 * published for the business. So the enquiry form composes a pre-filled WhatsApp
 * message to the chosen branch, which is how this customer base actually gets
 * hold of a tyre bay anyway. Swap `buildHref` for a POST to a form endpoint if a
 * backend is added later.
 */
export default function ContactForm() {
  const [branchSlug, setBranchSlug] = useState(contactable[0].slug);
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const branch = contactable.find((b) => b.slug === branchSlug)!;
  const valid = name.trim().length > 1 && message.trim().length > 3;

  const href = useMemo(() => {
    const lines = [
      `Hi Roadmaster ${branch.short},`,
      '',
      `Name: ${name.trim() || 'not given'}`,
      vehicle.trim() ? `Vehicle / equipment: ${vehicle.trim()}` : null,
      service ? `Service needed: ${service}` : null,
      '',
      message.trim(),
    ].filter(Boolean);
    return `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [branch, name, vehicle, service, message]);

  const field =
    'w-full rounded-xl border border-white/12 bg-ink px-4 py-3 text-[0.9375rem] text-chalk transition-colors placeholder:text-mute-dim focus:border-yellow focus:outline-none';
  const label = 'block text-[0.6875rem] font-semibold tracking-[0.14em] text-mute uppercase';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (valid) window.open(href, '_blank', 'noopener,noreferrer');
      }}
      className="rounded-2xl border border-white/10 bg-ink-800 p-6 lg:p-8"
      noValidate
    >
      <p className="eyebrow">Send an enquiry</p>
      <h2 className="mt-3 text-[clamp(1.35rem,3vw,1.75rem)] leading-tight uppercase">
        Tell us what you need
      </h2>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-mute">
        Fill this in and we will open WhatsApp with your enquiry ready to send to the branch you choose. In a
        hurry? Just call. The numbers are on the right.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="branch" className={label}>
            Which branch
          </label>
          <select
            id="branch"
            value={branchSlug}
            onChange={(e) => setBranchSlug(e.target.value)}
            className={`${field} mt-2 appearance-none`}
          >
            {contactable.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.city}, {b.region}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Your name <span className="text-yellow">*</span>
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Thandi Mokoena"
              autoComplete="name"
              className={`${field} mt-2`}
            />
            {touched && name.trim().length < 2 && (
              <p className="mt-1.5 text-[0.75rem] text-yellow">Please add your name.</p>
            )}
          </div>
          <div>
            <label htmlFor="vehicle" className={label}>
              Vehicle or equipment
            </label>
            <input
              id="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="Volvo FH440 / Hilux / A40G hauler"
              className={`${field} mt-2`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className={label}>
            Service needed
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`${field} mt-2 appearance-none`}
          >
            <option value="">Not sure / something else</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className={label}>
            Details <span className="text-yellow">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Tyre size, quantity, what the symptom is, or where the vehicle is standing."
            className={`${field} mt-2 resize-y`}
          />
          {touched && message.trim().length < 4 && (
            <p className="mt-1.5 text-[0.75rem] text-yellow">Please tell us a bit about the job.</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="group mt-7 flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-yellow font-display text-sm font-bold tracking-[0.12em] text-ink uppercase transition-all duration-300 hover:bg-yellow-300 active:scale-[0.99]"
      >
        <Whatsapp className="size-4.5" />
        Send via WhatsApp
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-3 text-center text-[0.75rem] text-mute-dim">
        Opens WhatsApp to {branch.short} · nothing is sent until you press send there.
      </p>
    </form>
  );
}
