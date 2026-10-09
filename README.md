# Canyon Bilaspur

Rooftop multicuisine lounge and live music venue, Bilaspur.
`2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur`
`Cocktails. Cuisine. Conversations.`

Single-page Astro site. See `docs/DESIGN.md` for the design system.

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds production site to `./dist/` |
| `npm run preview` | Previews the build locally |
| `npm run check` | Type-checks with `astro check` |

## Structure

```text
/
├── data/
│   └── instagram.json      # provenance scrape (@canyonbilaspur) — copy source, not imported at build
├── docs/
│   └── DESIGN.md           # design system + content model
├── public/
│   ├── favicon.svg
│   ├── og.jpg              # stable og:image (entrance plate)
│   └── robots.txt
├── scripts/
│   ├── fetch-instagram.mjs # re-scrape profile via Apify (needs APIFY_API_TOKEN in .env)
│   └── download-media.mjs  # download scrape media -> src/assets/images + src/data/media.ts
└── src/
    ├── assets/images/      # local venue photography (Astro-optimised)
    ├── components/         # one section per file, composed in pages/index.astro
    ├── data/               # site.ts (copy) + frames.ts (art direction) + media.ts (generated)
    ├── layouts/Layout.astro
    ├── pages/index.astro
    └── styles/global.css   # Tailwind v4 CSS-first config (@theme)
```

## Notes

- Code audit only — no Playwright, no screenshots, no visual audit (see `AGENTS.md`).
- Copy rule: every line is either verbatim from their own posts/artwork or a
  structural label. Never invent claims — see the provenance header in `src/data/site.ts`.
- Hours, menu prices and geo are omitted until verified by the owner.

## Deploy

Static output. `npm run build` writes `./dist/` — host it anywhere
(Netlify, Vercel, Cloudflare Pages, plain nginx). No server, no env vars.

Launch checklist (all owner/domain-dependent, none invented in code):

1. Domain known → set `site` in `astro.config.mjs`, pass `canonicalUrl`
   to `<Layout>`, add `Sitemap:` to `public/robots.txt` and ship the sitemap.
2. Guest-photo consent — several frames show identifiable guests. Confirm
   with the business or supply blurred crops (see the note in `Gallery.astro`).
3. Refresh hours, prices and event dates with the owner before announcing.
