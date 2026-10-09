# Canyon — Design System

> Rooftop multicuisine lounge & live music venue, Bilaspur.
> `2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur`
> `Cocktails. Cuisine. Conversations.`

---

## 0. What the business actually is

Established from a real scrape of @canyonbilaspur (`data/instagram.json`,
12 posts, 6 Sep – 5 Oct 2026, 4,427 likes).

**Canyon is a live music venue with a kitchen attached.** Live music appears in
**8 of 12 posts**. The signature is **Sufi Night** — 5 of 12 posts, with live
dholak and keyboard. Two other recurring formats: **Bollywood Night** and
**Strings Under The Stars** (violin).

The engagement confirms this is what people come for:

| Post | Likes |
| --- | --- |
| First Sufi Night (5 Sep) | **1,844** |
| Bollywood recap (18 Sep) | 673 |
| Sufi Night recap (5 Oct) | 583 |
| *typical post* | *~150* |

The opening Sufi night outdrew a typical post by ~12×. **The site therefore leads
with the nights, not the menu.** An earlier version of this document treated
Canyon as a restaurant with a bar; that was wrong.

**Verified from their own captions:** `8 PM onwards` appears as the start time in
three separate event posts. Both phone numbers appear in their own booking posts,
with `97502 88888` labelled "Book your table".

**Not verified anywhere:** closing time, menu prices, and whether any dish is
currently served — see §3.

### Voice

Their captions are the brand: warm, wry, unhurried, never shouty.

- "Come for the Sufi. Stay for the mood."
- "Sip first. Worry later."
- "After the rain, Canyon just hits different."
- "Money can't buy happiness, but it can buy a great dinner at Canyon. Close enough."

**Rule: these are real quotes from real posts.** Never complete a truncated
quote, and never invent one. An earlier draft put a fabricated
`"Bollywood hits, good vibes."` on the page — that was a forgery and is gone.

---

## 1. Content provenance

Every value in `src/data/site.ts` carries a provenance tag: `[bio]`, `[caption]`,
`[reel]`, or `[inferred]`. Adding a claim without a tag is how the slop got in
the first time. `[reel]` means the dish came from a collaborating food account,
not from Canyon's own posts. `[inferred]` means my judgement, owner must confirm.

---

## 1. Brand Positioning

Canyon is a **rooftop lounge**, not a fast-casual restaurant and not a night club. It sits
in the premium-but-approachable middle: the kind of place a group books for a birthday,
where the food has to be genuinely good and the ambience has to carry the evening.

The Instagram voice is the brand voice, and it is consistent:

| Signal | What it says |
| --- | --- |
| "Cocktails. Cuisine. Conversations." | Three pillars, in that order. Nightlife-capable, food-forward, social. |
| "Bollywood hits, good…" | Live music / DJ nights. The venue has a pulse after 8pm. |
| "You & food 🤍" | Warm, personal, hand-made. Not corporate. |
| "Vatavaran · Events 👀" | Private events and banquets. A real revenue line. |
| "Now Open" | Recently launched. Hungry, not established. |

**Voice:** confident and short. Conversational, never formal. Uses the kind of phrasing a
friend texts you. Occasional emoji in marketing copy, never in UI chrome.

**Three pillars, used as the site's spine:**
1. **Cocktails** — bar programme, mocktails, nightlife
2. **Cuisine** — multicuisine kitchen (see §3)
3. **Conversations** — ambience, events, long evenings

---

## 2. Visual Direction

**The reference image is an evening rooftop**: warm amber and gold light spilling across
a dark sky, deep shadows, glassware catching highlights, a city that is still glowing
below. Everything below is derived from that.

### Colour

Dark, warm, and low-lit. The page should feel like the inside of the venue at 9pm.

| Token | Value | Role |
| --- | --- | --- |
| `canyon-void` | `#0a0908` | Page background. Near-black with a warm cast, never pure `#000`. |
| `canyon-ember` | `#12100e` | Raised surfaces: cards, nav, footer, hero panel. |
| `canyon-coal` | `#1f1b16` | Subtle borders, dividers, inactive fills. |
| `canyon-smoke` | `#a79f94` | Secondary text. Warm grey, never `#999`. |
| `canyon-champagne` | `#f4ede2` | Body text and headings. Warm off-white, not `#FFF` — pure white is harsh on dark. |
| `canyon-amber` | `#e0a13c` | Primary accent. Signature action colour, links, highlights. |
| `canyon-gold` | `#be8a2c` | Deeper gold. Gradient partner for `canyon-amber`, hover state for amber fills. |
| `canyon-ochre` | `#c8912e` | The entrance plaster wall. Used as a surface tint only, never text. |
| `canyon-night` | `#17233c` | The galaxy ceiling. Only ever behind the oculus photography / page glow. |
| `canyon-terracotta` | `#B4553A` | Rare warm accent. Used for event/highlight states only. |

**Rules:**
- No pure black, no pure white. The venue is dim; the site matches.
- Amber is the *only* accent that carries a call to action. Gold is decoration.
- Body text is `canyon-smoke`; only headings and interactive text use `canyon-champagne`.
- Never place `canyon-amber` text on `canyon-amber` background.
- Target contrast: body text ≥ 7:1, large headings ≥ 4.5:1, accent text ≥ 4.5:1.

### Typography

A serif for display, a clean sans for UI. The contrast is what makes it read as
"premium" rather than "template". Both self-hosted via `@fontsource` — no runtime
requests to Google Fonts.

| Role | Family | Use |
| --- | --- | --- |
| Display | `Fraunces` (variable, optical size) | Hero, section headings, prices |
| Body / UI | `Plus Jakarta Sans` (variable) | Paragraphs, nav, buttons, forms |
| Sufi nights only | `UnifrakturMaguntia` | The "Sufi Night" heading, matching their own posters. Never UI or body copy. |
| Eyebrow | Body family, uppercase, `0.18em` tracking | Section labels, kickers |

- Hero display clamps `text-5xl` → `text-8xl`, tight tracking (`-0.02em`), `leading-[0.95]`.
- Body copy maxes at `max-w-prose`. Line height `1.7` for paragraphs.
- Eyebrows are `text-xs`, uppercase, `canyon-amber`, always paired with a following heading.
- Prices set in `Fraunces` with `tabular-nums` so columns align.

### Spacing & Shape

- Section padding: `py-24` mobile, `py-32` desktop.
- Cards: `rounded-2xl`. Buttons: `rounded-full`. Images: `rounded-3xl` on feature blocks.
- Borders are `1px canyon-coal`, not shadows. Depth comes from background steps.

### Imagery

- Warm, dim, high-grain photos. Shot at night, from slightly above, people mid-conversation.
- Overlay `linear-gradient(to top, canyon-void/90, transparent)` on every photo so text
  stays legible without exception.
- Never use light-background photos. They destroy the mood.
- Image aspect ratios are fixed (`4/5`, `16/9`, `1/1`) to prevent layout shift.

### Motion

- 150–400ms, `ease-out`. Nothing bounces.
- Fade + 16px rise on scroll reveal, staggered ~60ms.
- Every animation gated behind `motion-reduce:` variants.
- `prefers-reduced-motion` removes transforms entirely, keeps opacity.

---

## 3. Content Model

### Cuisine categories

Taken from actual menu signals on the account — pizza, sushi, pasta, Chinese, kebabs,
BBQ, Korean fried chicken, peri peri fries, fish fingers.

- Italian — Pizza, Pasta
- Asian — Sushi, Chinese (noodles, fried rice), Korean fried chicken
- Grill & Tandoor — Kebab, Tikka, BBQ
- Bar — Cocktails, Mocktails
- Small plates — Peri peri fries, fish fingers, veg lollipop

> Menu item pricing is **not** published on the Instagram account and could not be verified.
> The build must not invent prices. Menu is presented as categories + signature dishes,
> with the call to action routed to a phone booking.

### Business facts

Verified directly against the Instagram profile (@canyonbilaspur), confirmed by
the owner on 6 Oct 2026. Nothing else should be stated as fact.

| Field | Value |
| --- | --- |
| Name | Canyon — Hotel Intercity International |
| Tagline | Cocktails. Cuisine. Conversations. |
| Status | Now Open |
| Address | 2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur |
| Phone | +91 96984 21000 |
| Reservations | +91 97502 88888 |
| Hours | **Unverified — confirm with the owner before publishing** |
| Instagram | @canyonbilaspur — 32 posts, 2,161 followers, 22 following |
| Maps | `maps.app.goo.gl/YfqA5Dak54ywpmpM6` (tracking param stripped) |

> Follower and post counts are a snapshot. They drift; refresh or remove rather
> than letting them go stale.

---

## 4. Information Architecture

Single-page marketing site. A restaurant's reservations funnel is the whole job, and
routing a visitor through extra pages costs bookings.

```
/                       all sections, one scroll
```

**Page sections, in order:**

1. **Nav** — transparent over hero, blurs + gains a border after scroll. Mobile drawer.
2. **Hero** — natural-height panel. Display serif greeting, two-line lede, one
   "Reserve a table" CTA, entrance plate floating right with an overhang.
   Three-slot info strip (Locate Us · The Nights · Reservation) + caption ticker.
3. **Nights** — Sufi Night feature with its own poster, the other two formats as posters,
   then the room mid-song.
4. **Tour** — their own four-frame walk (minus the entrance, which is the hero),
   ceiling → rooftop → table.
5. **Kitchen** — menu board: categories + signature dishes, no invented prices.
6. **Cocktails** — the Jamun Passion feature.
7. **Gallery** — the remaining plates, each with one place-label, then their
   "After the rain" line set large + Instagram link.
8. **Events · Vatavaran** — private events and banquets promo.
9. **Visit** — address, reservations, map, phone.
10. **ReserveBand** — centred reservation close: one heading, modal trigger + call link.
11. **Footer** — contact, Instagram, nav.

### Conversion paths

Every one of these is present and reachable on mobile without scrolling back up:

- `tel:+919698421000` — primary
- A booking modal with a name/phone/party-size form
- WhatsApp deep link
- Instagram link
- A sticky mobile action bar (Call / Book) below `md`

---

## 5. Tailwind v4 Implementation

CSS-first config. No `tailwind.config.js` — v4 uses `@theme` in CSS.

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-canyon-void: #0B0A0C;
  --color-canyon-ember: #0F0E11;
  --color-canyon-coal: #1A181C;
  --color-canyon-smoke: #A8A3AD;
  --color-canyon-champagne: #F2E9DC;
  --color-canyon-amber: #E8A33D;
  --color-canyon-gold: #C9922F;
  --color-canyon-terracotta: #B4553A;

  --font-display: "Fraunces Variable", ui-serif, Georgia, serif;
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

`@theme` variables sit top-level, never nested under a selector. They generate
`bg-canyon-void`, `text-canyon-amber`, `font-display`, and friends automatically.

Astro wires Tailwind through the **Vite plugin**, not PostCSS:

```js
// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
```

### v4 constraints to respect

- Browser support is modern-only: Safari 16.4+, Chrome 111+, Firefox 128+.
- Class names must be **static and complete**. No
  `` `text-${color}-500` `` — Tailwind scans source as plain text. Map over data arrays
  with full literal class strings instead.
- Prefers a `v4` note: `space-*`/`divide-*` changed behaviour; prefer `gap` on
  flex/grid containers.
- Border and ring default colours are now `currentColor`; always set an explicit colour.
- Scoped `<style>` blocks and CSS modules need `@reference "../styles/global.css"` to
  read theme variables.

---

## 6. Accessibility Contract

Not optional. This is the baseline.

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- One `h1`; heading levels never skip.
- Every image has meaningful `alt`, or `alt=""` if purely decorative.
- Visible `:focus-visible` ring on all interactive elements — amber, 2px, offset.
- Modal: `role="dialog"`, `aria-modal`, focus trap, `Esc` to close, focus restored on close.
- Mobile drawer: `aria-expanded` on the trigger, `Esc` to close, body scroll locked.
- All animation behind `motion-reduce:` and `@media (prefers-reduced-motion: reduce)`.
- Tap targets ≥ 44×44px.
- Contrast ratios as specified in §2.
- `prefers-reduced-transparency` gets solid backgrounds, no glassmorphism.

---

## 7. Component Inventory

| Component | Notes |
| --- | --- |
| `Nav.astro` | Transparent → blurred on scroll. Mobile drawer, named `Mobile` landmark. |
| `Hero.astro` | Panel + doorway plate + info strip + ticker. Single `h1`. |
| `Nights.astro` | Sufi feature + two poster formats + room mid-song. |
| `Tour.astro` | Three-frame walk, alternating rows, step number + place + quoted line. |
| `Kitchen.astro` | Menu board on ochre tint. Categories + dishes, prices via phone. |
| `Cocktails.astro` | Jamun Passion feature + second reel frame. |
| `Gallery.astro` | Bento of remaining plates with place-labels + large quoted line + IG link. |
| `Events.astro` | Vatavaran private-events promo + full-house frames. |
| `Visit.astro` | Address / reservations / events-groups cards + map embed. Hours omitted (unverified). |
| `ReserveBand.astro` | Centred reservation close: modal trigger + call link. |
| `Footer.astro` | Contact + nav + social. |
| `BookingModal.astro` | Native dialog, focus trap, WhatsApp handoff. |
| `MobileActionBar.astro` | Sticky Call / Book, `md:hidden`, hidden while dialog open. |
| `Section.astro` | Shared section shell: eyebrow + heading + optional lede. |
| `Photo.astro` | Double-bezel frame at the plate's own ratio; optional `arch`. |
| `Ticker.astro` | Caption band, duplicated track, pauses on hover/focus, stops on reduced motion. |
| `CtaPill.astro` | The shared amber booking pill. |
| `Wordmark.astro` | Arch + palms mark. The script wordmark is never faked; it appears only in photos. |

---

## 8. Open Questions

1. **Opening hours** — not published anywhere public. Needed for the Visit section.
2. **Menu with prices** — required for a real menu section.
3. **"Vatavaran"** — is this a named events sub-brand, or a campaign? Affects whether it
   gets its own section or just a footer mention.
4. **Buffet** — a post from 23 Sep 2026 appears to show a buffet ("fork, buffet").
   If Canyon runs a weekday buffet, it deserves its own section; it is currently
   unrepresented on the site.
5. **Photography** — no licensed site imagery exists yet. Placeholder tiles must be
   replaced before launch.

### Resolved

- **Floor** — the official bio says "2nd floor, Hotel Intercity International". A single
  reel referring to "1st Floor, Intercity" was inaccurate. Site uses **2nd floor**.
- **Maps link** — the site previously used a hand-built Google Maps query URL. It now
  uses the short link from the bio, with the `g_st` click-tracking parameter removed.