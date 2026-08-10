# Roadmaster Tyre Services

A rebuild of [roadmastertyreservices.co.za](https://roadmastertyreservices.co.za/) as a fast, static,
mobile-first site. All copy, contact details, trading hours, brand logos and photography were taken
from the existing site; nothing about the business was invented.

## Stack

- **Next.js 15** (App Router) with `output: 'export'` — ships as plain static HTML, no server needed
- **Tailwind CSS v4** (CSS-first `@theme` config in `src/app/globals.css`)
- **TypeScript**
- Fonts: **Archivo** (display) + **Manrope** (body), self-hosted at build time via `next/font`

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site -> ./out
```

Deploy the `out/` directory to any static host (Netlify, Vercel, Cloudflare Pages, S3, or plain nginx).

## Brand

Colours were sampled directly from the company logo:

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0D0D0F` | Logo black, page background |
| `yellow` | `#FDE640` | Logo racing yellow, accents and CTAs |
| `chalk` | `#F6F6F7` | Body text |

The checkered-flag motif from the logo's "R" mark is reused as a divider (`.checker`), and the yellow
rule under the wordmark is reused as a heading underline (`.rule-yellow`).

## Structure

```
src/
  app/
    page.tsx                    Home
    about/                      Company, mission, goals, B.E.E. / RM Tyres Co-operative
    services/                   Index + 14 generated detail pages
    products/                   Tyre brands, shocks, brakes, rims, bumpers & towbars
    branches/                   Index + 6 generated branch pages (map, hours, numbers)
    breakdown-assist/           Emergency-first page; numbers above the fold
    gallery/                    Masonry grid with keyboard-navigable lightbox
    health-and-safety/          H&S policy and commitments
    contact/                    Enquiry composer + full branch directory
    sitemap.ts, robots.ts       Generated at build
  components/                   Header, Footer, MobileBar, sections, ui primitives, icons
  data/                         All site content: branches, services, products, gallery, site
public/images/
  brand/                        Logo and favicon mark
  brands/                       Partner logos, auto-trimmed to remove padding
  branches/, services/, gallery/
```

Content lives in `src/data/*` rather than in the pages, so copy, numbers and hours can be edited
without touching layout.

## Notes and decisions

- **Contact form.** No email address is published anywhere on the source site, and a static export has
  no mail server. The form therefore composes a pre-filled WhatsApp message to the branch the visitor
  picks. To switch to a real form backend, replace the `href` builder in
  `src/components/ContactForm.tsx` with a POST to your endpoint.
- **KwaDukuza has two after-hours numbers** on the source site: `067 403 6888` (branch page) and
  `079 876 2068` (breakdown page). Both are shown so a caller always gets through — worth confirming
  which is current.
- **Trading hours.** The source site published only "Open today 08:00 – 17:00" (07:00 – 16:30 for
  Manufacturing). Weekday hours are carried through as published; weekends are shown as
  "by arrangement" since they were never stated.
- **Services.** The original site had all services as anchors on one long page. They are now 14
  individual pages under `/services/`, which is better for search and much easier to read on a phone.
- **Sumitomo** publishes no Latin-script tyre wordmark in the assets available, so its registered
  Igeta mark is used. Every other partner logo is the company's own asset from the existing site.

## Verification

Checked with headless Chrome over CDP at 320 / 360 / 390 / 430 / 768 / 1280 px:

- No horizontal scroll on any route, even with the `overflow-x` safety net removed
- One `<h1>` per page, every `<img>` has an `alt`
- Block-level controls meet tap-target sizing
- `Organization` + one `AutoRepair` node per branch in JSON-LD, plus generated sitemap and robots
