# Roadmaster Tyre Services

A rebuild of [roadmastertyreservices.co.za](https://roadmastertyreservices.co.za/) as a fast, static,
mobile-first site. All copy, contact details, trading hours, brand logos and photography were taken
from the existing site; nothing about the business was invented.

## Stack

- **Next.js 15** (App Router) with `output: 'export'` — ships as plain static HTML, no server needed
- **Tailwind CSS v4** (CSS-first `@theme` config in `src/app/globals.css`)
- **TypeScript**
- Fonts: **Archivo** (display) + **Manrope** (body), self-hosted at build time via `next/font`
- **Appwrite Cloud** (database + storage + auth) for the editable gallery only — see *Gallery manager* below

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
    studio/                     Hidden gallery manager (noindex, linked from the footer year)
    health-and-safety/          H&S policy and commitments
    contact/                    Enquiry composer + full branch directory
    sitemap.ts, robots.ts       Generated at build
  components/                   Header, Footer, MobileBar, sections, ui primitives, icons
  data/                         All site content: branches, services, products, gallery, site
  lib/                          Appwrite client, gallery queries, video-URL and media helpers
  data/gallery.json             The seed gallery: static fallback and Appwrite seed in one file
scripts/setup-appwrite.mjs      Provisions the whole Appwrite side, including the seed rows
public/images/
  brand/                        Logo and favicon mark
  brands/                       Partner logos, auto-trimmed to remove padding
  branches/, services/, gallery/
```

Content lives in `src/data/*` rather than in the pages, so copy, numbers and hours can be edited
without touching layout.

## Gallery manager

Everything else on this site is edited in `src/data/*` and redeployed. The gallery
is the exception: staff add and remove photos and videos themselves, without a
rebuild.

There is no server to put a login behind — this is a static export — so the
browser talks to Appwrite directly and Appwrite does the authentication. The
project id that ships in the bundle is public by design; it identifies the
project, it does not authorise anything. What can actually be written is fixed by
the table and bucket permissions: **read for everyone, writes for one specific
user account**. Pinning to that account rather than to "any signed-in user" means
an extra account, however it came to exist, still cannot touch the gallery.

**The way in** is the year in the footer copyright line. It links to `/studio/`,
which is `noindex, nofollow` and excluded from `robots.txt` and the sitemap.
There is nothing else pointing at it.

### Setup

Two things from the [Appwrite console](https://cloud.appwrite.io), neither of
which needs a payment card:

1. **Create a project.** Note its ID — it is not a secret. Pick a region close to
   South Africa; Frankfurt (`fra`) is the usual choice. If you pick another
   region, use its endpoint instead of the `fra` default below.
2. **Create an API key** (Overview → Integrations → API keys) with these scopes:
   `databases.read/write`, `tables.read/write`, `collections.read/write`,
   `documents.read/write`, `buckets.read/write`, `users.read/write`.
   Save it to the gitignored file `.appwrite-api-key` without it passing through
   your shell history:

   ```bash
   read -s -p "API key: " k && printf '%s' "$k" > .appwrite-api-key && echo saved
   ```

Then run the provisioner:

```bash
APPWRITE_PROJECT_ID=your-project-id \
ADMIN_PASSWORD='the-staff-password' \
node scripts/setup-appwrite.mjs
```

It creates the database, the `gallery_items` table and its columns, the sort
index, the storage bucket, the admin user, and the twenty seed photos, then writes
`.env.local`. Re-running is safe — anything that already exists is left alone.

Delete `.appwrite-api-key` afterwards; nothing needs it again.

Unlike the alternatives, email/password sign-in is on by default, so there is no
provider to enable and no billing to set up before uploads work.

Finally, add the five `NEXT_PUBLIC_APPWRITE_*` values from `.env.local` to the
host's build environment and rebuild — `NEXT_PUBLIC_*` values are baked in at
build time. Until they are set, `/studio/` says so instead of showing a login.

The username on the sign-in form is `Admin`; the app maps that to
`admin@roadmastertyreservices.co.za`. To use a different address, set
`ADMIN_EMAIL` when running the script — it pins the write permissions to whatever
account it creates.

### What the manager does

- **Upload** photos and videos, several at a time, by drag-and-drop or file picker.
  Image dimensions are read in the browser and stored, so the public grid reserves
  the right space and does not jump while loading.
- **Videos** get a still frame captured from the file itself in the browser, so
  tiles have a poster without any server-side transcoding.
- **Add a video by link** instead — a YouTube or Vimeo URL. This costs no storage
  and is the right choice for anything long.
- **Edit** the caption and the alt text of any item, saved when the field loses focus.
- **Reorder** with up / down / to-the-front. The whole list is renumbered, so the
  order can never end up ambiguous.
- **Remove** an item, which deletes the row and the uploaded files. Linked videos
  and the original repo photos have no files to delete.

### Limits worth knowing

- **Uploads are capped at 50 MB per file**, set on the bucket as well as in the
  UI. If the free plan refuses that ceiling the script falls back to the plan
  default and says so. Long video should go in as a YouTube link either way.
- **Appwrite Cloud's free tier is smaller than the paid ones** for storage and
  bandwidth. The twenty original photos are still served from `public/images` by
  the static host, so they cost nothing; only uploads count against it.

### Sessions and third-party cookies

Appwrite authenticates with a cookie set on its own domain. Because the site is
served from `roadmastertyreservices.co.za` and the API lives on
`fra.cloud.appwrite.io`, that is a third-party cookie, and Safari blocks those
outright. The web SDK handles it: when the cookie cannot be set, Appwrite returns
an `X-Fallback-Cookies` header and the SDK keeps the session in `localStorage`
instead, sending it back on each request. Sign-in therefore works everywhere,
including iOS.

The trade-off is that the fallback session sits in `localStorage` rather than in
an httpOnly cookie, so it is reachable from JavaScript. For one staff account on
a page nobody else visits this is a small risk, and the SDK logs a console
warning when it happens. The proper fix, if it ever matters, is to point a
subdomain such as `api.roadmastertyreservices.co.za` at Appwrite as a custom
domain — the cookie then becomes first-party and the fallback is never used. Only
`NEXT_PUBLIC_APPWRITE_ENDPOINT` would need changing.

### If the gallery ever fails to load

The grid falls back to `src/data/gallery.json`, baked in at build time — the same
twenty photos, in the same order, as the seeded rows. An Appwrite outage, a
deleted project, or missing config shows the original gallery rather than an empty
page. That file is also what search engines and no-JavaScript visitors see.

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
- **Gallery aspect ratios.** The hand-set `tall` flag is gone. Every item now
  carries its real pixel dimensions, so the masonry columns use true aspect ratios
  and nothing is cropped. Uploads are measured in the browser; the original twenty
  were measured from the files.
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
