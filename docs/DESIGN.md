# Canyon — Design System

> Rooftop multicuisine lounge & live music venue, Bilaspur.
> `2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur`
> `Cocktails. Cuisine. Conversations.`

---

## 0. What the business actually is

Established from a real scrape of @canyonbilaspur (`data/instagram.json`,
32 posts, 6 Jun – 18 Oct 2026, `scripts/scrape-profile.mjs`). Two posts that
were deleted from the account survive on disk via `data/legacy-posts.json`
(see §9).

**Canyon is a live music venue with a kitchen attached.** Live music is the
recurring spine of the account: **Sufi Night**, **Bollywood Night** and
**Strings Under The Stars (violin)** return as three named formats. The
engagement confirms the ranking:

| Plate | Code | Likes |
| --- | --- | --- |
| First Sufi Night reel (6 Sep) | `Dc8l4SqKBcZ` | **1,873** |
| "Got plans? change them." neon reel (30 Aug) | `DcqJegxqDGM` | 1,613 |
| Vision reel (27 Aug) | `DciWfZoivHp` | 1,222 |
| Sufi Night 3 Oct invite (29 Sep) | `Dd3zmVwiphv` | 959 |
| Bollywood recap (18 Sep) | `DdblVqkOZ_7` | 706 |
| *typical post* | | *~150* |

The opening Sufi night outdrew a typical post by ~12×. **The site therefore
leads with the nights, not the menu.** An earlier version of this document
treated Canyon as a restaurant with a bar; that was wrong.

Like counts drift upward as the account ages; re-run the scrape rather than
trusting a month-old table.

**Verified from their own captions:** `8 PM onwards` appears as the start
time on three separate event posts and two posters. Both phone numbers
appear in their own booking posts, with `97502 88888` labelled
"Book your table:" on the 3 Oct Sufi post.

**Not verified anywhere:** closing time, menu prices. See §8.

### Voice

Their captions are the brand: warm, wry, unhurried, never shouty.

- "Come for the Sufi. Stay for the mood."
- "Sip first. Worry later."
- "After the rain, Canyon just hits different."
- "Money can't buy happiness, but it can buy a great dinner at Canyon.
  And honestly, close enough ✨" (caption) / "…it can buy the best Dinner"
  (burnt-in on the same post's artwork)

**Rule: these are real quotes from real posts.** Never complete a truncated
quote, and never invent one. An earlier draft put a fabricated
`"Bollywood hits, good vibes."` on the page — that was a forgery and is gone.

---

## 1. Content provenance

Every copy value in `src/data/site.ts`, `src/data/frames.ts` and
`src/data/setups.ts` carries a provenance tag. Adding a claim without a tag
is how the slop got in the first time. Tags in use:

- `[bio]` — verbatim from the profile biography (captured in the committed
  scrape under `git show HEAD:data/instagram.json`).
- `[caption]` — verbatim from a post caption (`data/instagram.json`,
  quoted whole or trimmed at a comma).
- `[post …]` / `[photo …]` — a specific date's post legible in text or art.
- `[artwork]` — burnt-in type legible on their own designed plates (the
  poster is published brand copy; quoting it is quoting them).
- `[sidecar …]` — plates from `data/legacy-posts.json` (posts since deleted).
- `[poster]` — the three night-format posters reproduced at full fidelity.

Structural labels (nav items, headings, form fields, section eyebrows) are
the only exception — they describe the interface, not the business.

Deleted posts are not gone: `data/legacy-posts.json` keeps their captions and
the download script keeps their media. Any new copy line from a deleted post
must say so via `[sidecar]`.

---

## 2. Brand Positioning

Canyon is a **rooftop lounge**, not a fast-casual restaurant and not a night
club. It sits in the premium-but-approachable middle: the kind of place a
group books for a birthday, where the food has to be genuinely good and the
ambience has to carry the evening.

The Instagram voice is the brand voice, and it is consistent:

| Signal | What it says |
| --- | --- |
| "Cocktails. Cuisine. Conversations." | Three pillars, in that order. Nightlife-capable, food-forward, social. |
| "Bollywood hits, good…" | Live music nights. The venue has a pulse after 8pm. |
| "Now Open" | Recently launched. Hungry, not established. |

**Voice:** confident and short. Conversational, never formal. Uses the kind
of phrasing a friend texts you. Occasional emoji in captions, never in UI
chrome.

**Three pillars, used as the site's spine:**
1. **Cocktails** — bar programme, mocktails, nightlife
2. **Cuisine** — multicuisine kitchen (see §4)
3. **Conversations** — ambience, live nights, long evenings

> Historical note: an interim version of this table claimed a
> "Vatavaran · Events 👀" signal and a "You & food 🤍" signal. **Neither
> string exists in the bio or in any of the 32 scraped captions.** They were
> fabrication, and every trace of "Vatavaran" on the site is gone; the
> occasions page opens on a caption line instead
> (`celebrate.eyebrow` ← [caption Deovc0yDlxE]).

---

## 3. Visual Direction

The reference is an evening rooftop and the on-site photograph set itself:
warm amber and gold light over deep shadow. Everything below is derived from
that. The reference site for structure and restraint is
`https://openhousecafe.in/` — typographic panel hero, info strip, feature
cards, rooms walked as sections, one clean reservation close.

### Colour

Dark, warm, and low-lit. The page should feel like the inside of the venue at
9pm. Current tokens (`src/styles/global.css` `@theme`):

| Token | Value | Role |
| --- | --- | --- |
| `canyon-void` | `#0a0908` | Page background. Near-black with a warm cast, never pure `#000`. |
| `canyon-ember` | `#12100e` | Raised surfaces: cards, nav, footer, hero panel, page openers. |
| `canyon-coal` | `#1f1b16` | Subtle borders, dividers, inactive fills. |
| `canyon-smoke` | `#a79f94` | Secondary text. Warm grey, never `#999`. |
| `canyon-champagne` | `#f4ede2` | Body text and headings. Warm off-white, not `#FFF`. |
| `canyon-amber` | `#e0a13c` | Primary accent. Signature action colour. |
| `canyon-gold` | `#be8a2c` | Deeper gold. Gradient partner for `canyon-amber`. |
| `canyon-ochre` | `#c8912e` | The entrance plaster wall. Surface tint only, never text. |
| `canyon-night` | `#17233c` | The galaxy ceiling. Only behind the oculus photography / page glow. |
| `canyon-terracotta` | `#b4553a` | Rare warm accent. Reserved. |

**Rules:**
- No pure black, no pure white. The venue is dim; the site matches.
- Amber is the *only* accent that carries a call to action. Gold is decoration.
- Body text is `canyon-smoke`/champagne mixtures; only headings and
  interactive text use full `canyon-champagne`.
- Never place `canyon-amber` text on `canyon-amber` background.
- Target contrast: body text ≥ 7:1, large headings ≥ 4.5:1, accent ≥ 4.5:1.

### Typography

A serif for display, a clean sans for UI. The contrast is what makes it read
as "premium" rather than "template". Three families, self-hosted woff2 via
Astro's `fonts` config with metric-matched fallbacks — no runtime requests:

| Role | Family | Wire-up |
| --- | --- | --- |
| Display | `Fraunces` (variable wght, local files) | `--font-canyon-display` → `--font-display`; preloaded |
| Body / UI | `Plus Jakarta Sans` (variable) | `--font-canyon-body` → `--font-sans`; preloaded |
| Sufi heading | `Cormorant Garamond` italic 500 | `--font-canyon-sufi` → `--font-sufi`; **no preload** (renders once, below the fold) |

- Hero greeting sets `--text-hero: clamp(3rem, min(8vw, 10svh), 6rem)` —
  capped against svh so a short viewport wins over the width axis.
- Section headings use the shared tokens (`--text-title`, `--text-heading`,
  `--text-support`); page openers use `.page-title`
  (`clamp(2.4rem, min(7vw, 9svh), 4.25rem)`).
- Body copy maxes at `max-w-md`/`max-w-xl` in component context.
  Line-height `1.65` site-wide.
- Eyebrows are the `.eyebrow` component: `--text-micro`, uppercase,
  `canyon-amber`, always paired with a following heading.
- No prices anywhere, so no tabular price columns; phone numerals set
  `tabular-nums`.

### Spacing & Shape

- `.shell` — one shared gutter (`max-width: 78rem`, `1.5rem`/`2.5rem`
  padding) for the whole site, so vertical rhythm survives.
- Sections: `py-20` mobile, `py-24/28` desktop via the Section shell or
  explicit tokens.
- Frames: `rounded-shell` (1.5rem) with the inset bezel `rounded-core`
  (`calc(--radius-shell - 0.3125rem)`), never `rounded-3xl` per-page.
- Buttons: `rounded-md` (hero, flat) / `rounded-lg` (pill CTAs, ledger
  links). Borders are `1px canyon-coal`, not shadows.

### Imagery

- The plate is the frame at its **own** ratio — 4:5 posts, 9:16 reels — so
  `object-cover` has nothing to remove and the burnt-in typography survives
  whole (see `src/data/frames.ts`). There is no text-over-photo scrim
  anywhere: type never sits on a photograph.
- The one exception is `setups.drapeDay`'s watermark crop, documented in
  `src/data/setups.ts`.
- The entrance sign is boxed as an arch (Photo's `arch` treatment) because
  the photograph itself is an arch.
- Warm, dim, high-grain photos; the global body `::after` grain (SVG
  turbulence, 3% opacity, `z-40`) sits over everything else.

### Motion

- Reveal: 16px rise + opacity, 480ms `--ease-out-soft`, staggered
  `--reveal-delay` per item; one IntersectionObserver in Layout.
- Hero: one-time CSS entrance (`hero-rise` sequence with inline
  `--hero-delay`; `hero-glow` breathing at 9s). Runs once on load —
  arrival is the greeting, not a scroll reveal.
- Booking dialog: `booking-in` / `booking-backdrop-in` keyframes, 40ms
  staged delay, `both` fill; exit is instant (display:none on close).
- `prefers-reduced-motion: reduce` zeroes reveals to the finished state,
  kills smooth scroll, and a global killer sets every animation to 0.01ms /
  one iteration / zero delay, so all keyframes resolve instantly to their
  final frame.

---

## 4. Content Model

### Cuisine categories (as served — the board in `Kitchen.astro`)

- **Italian** — Pizza, Pasta
- **Asian** — Sushi, Korean Fried Chicken, Chicken Noodles
- **Grill** — Kathi Kebab, BBQ
- **Small Plates** — Peri Peri Fries, Fish Fingers, Veg Lollipop, Egg Wrap

> Prices are **not** published anywhere on the account and are not invented.
> The board is categories + signature dishes, with the price list routed to
> a phone number. It says so, plainly, under the board.

### The celebrations product

Five photographs the venue shot themselves (WhatsApp, 16 Oct 2026) — the
petal heart, drape tables, candlelit setups — plus the occasion formats they
promote (birthdays, anniversaries, group evenings). `/celebrate` leads with
those setups; the home page teases three of the five plates
(⏏ echo rule in `src/data/setups.ts`).

### Business facts

Verified directly against the Instagram profile and their own posts; the
identity block in `src/data/site.ts` carries the per-field tags:

| Field | Value |
| --- | --- |
| Name | Canyon — Hotel Intercity International |
| Tagline | Cocktails. Cuisine. Conversations. |
| Status | Now Open |
| Address | 2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur |
| Phone | +91 96984 21000 |
| Reservations | +91 97502 88888 |
| Live music | 8 PM onwards (start, on every event post) |
| Closing time | **Never published — not on the site** |
| WhatsApp | business line, used by the booking modal's handoff |
| Instagram | @canyonbilaspur — 32 posts (deletion-prone; see §9) |

---

## 5. Information Architecture

Six pages and a 404. The reservation funnel spans all of them: sticky bar
with Book a Table everywhere, `tel:` links, and the native-dialog booking
form on every page.

```
/            the pitch: hero + info strip → nights → features → tour →
             setups teaser → kitchen board → reserve band → strip → footer
/nights      the three formats at poster fidelity; first-night story;
             six-tile room grid
/celebrate   the setups (owner's 5 photos) → the occasion formats →
             "night to remember" plate
/kitchen     the menu board → Jamun Passion spotlight → Tables Set pair →
             reserve band
/gallery     ten widened plates + quarter quote, strip close
/visit       the ledger (address, both lines) + map → reserve band
404          same ember panel, Go Home + Book a Table
```

**Conversion paths** — reachable on mobile without scrolling back up:
- Sticky top bar: Book a Table (modal) on every route
- `tel:+919698421000` and `tel:+919750288888` links (strip, ledger, nights,
  formats, reserve band)
- WhatsApp deep link via the booking modal (blocked-popup fallback says so)
- Instagram strip → the account

---

## 6. Tailwind v4 Implementation

CSS-first config. No `tailwind.config.js` — v4 uses `@theme` in
`src/styles/global.css`. The live tokens (excerpt; the file is the truth):

```css
@import 'tailwindcss';

@theme {
  --color-canyon-void: #0a0908;
  --color-canyon-ember: #12100e;
  --color-canyon-coal: #1f1b16;
  --color-canyon-smoke: #a79f94;
  --color-canyon-champagne: #f4ede2;
  --color-canyon-amber: #e0a13c;
  --color-canyon-gold: #be8a2c;
  --color-canyon-ochre: #c8912e;
  --color-canyon-night: #17233c;
  --color-canyon-terracotta: #b4553a;

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);

  --radius-shell: 1.5rem;
  --radius-core: calc(1.5rem - 0.3125rem);

  --text-hero: clamp(3rem, min(8vw, 10svh), 6rem);
  --text-title: clamp(2rem, 4.5vw, 3rem);
  --text-heading: clamp(1.75rem, 4vw, 2.625rem);
  --text-action: 0.8125rem;
}

@theme inline {
  /* Astro's <Font> defines these at runtime; `inline` embeds the
     variable instead of letting Tailwind shadow it */
  --font-display: var(--font-canyon-display), ui-serif, Georgia, serif;
  --font-sans: var(--font-canyon-body), ui-sans-serif, system-ui, sans-serif;
  --font-sufi: var(--font-canyon-sufi), var(--font-canyon-display), serif;
}
```

Astro wires Tailwind through the **Vite plugin**, not PostCSS:

```js
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ vite: { plugins: [tailwindcss()] } });
```

### v4 constraints to respect

- Browser support is modern-only: Safari 16.4+, Chrome 111+, Firefox 128+;
  the stylesheet uses `color-mix()`, `svh`, `@layer` freely per that stance.
- Class names must be **static and complete** — Tailwind scans source as
  plain text. Ratios and sizes arrive as data (`ratio: 'aspect-[4/5]'`)
  precisely because literal strings are needed at the call site.
- Prefer `gap` over `space-*` on flex/grid containers.
- Border and ring default colours are `currentColor`; always set one.
- `dialog:not([open]) { display: none }` sits **unlayered** at the bottom of
  global.css — an element's Tailwind `flex` utility would otherwise beat the
  UA default and render the closed booking form inline. Do not move it
  into `@layer`.

---

## 7. Accessibility Contract

Not optional. This is the baseline.

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`; one
  landmark `<h1>` per page (PageHead on subpages, the hero greeting on home).
- Every image has meaningful `alt` (caps or artwork text included when the
  plate is typography); decorative marks are `aria-hidden`.
- Visible `:focus-visible` ring — amber, 2px, offset 3px — on everything
  interactive; never suppressed (modal fields use `focus:` border, not
  `focus-visible` suppression).
- Nav: `aria-current="page"` on the active route; drawer button carries
  `aria-expanded`; Esc closes; focus is trapped at document level and the
  drawer is height-capped and contained (`overscroll-contain`).
- Booking modal: native `<dialog>` + `showModal()` (top layer, inert
  background), labelled by its heading, Esc closes, focus returns to the
  trigger, first field focused on fine pointers only (coarse pointers skip
  it, so the on-screen keyboard doesn't pop the moment the dialog opens).
- Tap targets ≥ 44px (`strip-number` earns padding with a negative margin;
  nav links `py-2`, drawer rows `py-3.5`).
- Contrast per §3.
- `prefers-reduced-motion: reduce` — reveals resolve instantly, smooth
  scroll off, and the global killer animates everything to its final frame.

---

## 8. Open Questions

1. **Closing / opening hours** — never published. The site states the start
   time only ("Live music 8 PM onwards") and says nothing about closing.
   Needed before the Visit ledger can become a timing table.
2. **Menu with prices** — required for a real menu page. Until then the
   board has no prices and routes them to the phone, honestly.

### Resolved

- **Floor** — the official bio says "2nd floor, Hotel Intercity
  International". A single reel's "1st Floor, Intercity" was inaccurate.
  The site uses **2nd floor**.
- **Maps link** — site uses the short link from the bio, tracking parameter
  stripped.
- **"Vatavaran"** — never real. Absent from the bio and all 32 captions;
  an interim draft used it as the occasions eyebrow and it is fully excised.
  Anyone adding it back should be asked to find one source first.
- **Buffet** — rumoured from a misread post (23 Sep); no caption or frame
  evidence exists. Not represented on the site.
- **Imagery licensing** — resolved: every plate is the venue's own
  photography (the account, two deleted posts preserved as `legacy-posts`,
  and five setup photographs supplied by the venue for the site).
- **Deleted posts** — the account prunes continuously (32-post ceiling; two
  posts vanished across two same-day scrapes). Shown plates from deleted
  posts live in `data/legacy-posts.json`; see §9.
- **Faces of guests** — several frames show identifiable guests; owner
  confirmation (or blurred crops) is still owed before commercial use.

---

## 9. Data Layer & Pipeline

```
src/data/site.ts      every copy line + pages meta; provenance tags inline
src/data/frames.ts    the plate ledger; every frame placement, tagged
src/data/setups.ts    the five owner-shot celebration photos (+ echo ⏏ rule)
src/data/media.ts     GENERATED by scripts/download-media.mjs — never edit
data/instagram.json   the live scrape (scripts/scrape-profile.mjs <limit>)
data/legacy-posts.json captions of posts the account has since deleted
public/og.jpg         the social card (entrance sign)
```

- **IG pipeline:** scrape → `download-media.mjs` → `src/data/media.ts`
  (`Shot = { shortCode, type, likes, alt, img0.. }`; `frameOf(code, n)` is
  img0-based). Posts deleted between scrapes must be appended to
  `legacy-posts.json` **before** re-running the media script, which keeps
  their files on disk and fails loudly on any `archive.invalid/*` URL.
- **Once-per-page rule:** a plate may appear on any number of distinct
  pages, but no plate repeats within a page (the strip/handoffs included),
  except the three ⏏ echo plates that the home teaser borrows from
  /celebrate by design.
- **Frame discipline:** the frame is declared at the plate's own ratio;
  `position: top` is reserved for the one documented watermark crop.

---

## 10. Component Inventory

| Component | Notes |
| --- | --- |
| `Nav.astro` | Sticky on all pages, glass after 8px scroll, active-route ink, mobile drawer (document-level trap, containment). |
| `Hero.astro` | Ember panel + arch doorway plate + three-slot info strip; one-time entrance; single `h1`. |
| `PageHead.astro` | Subpage opener (eyebrow / `page-title` h1 / lede) on the shared ember light; decorative arch mark ≤6% behind, hidden <lg. |
| `Nights.astro` | Poster-first sections; `full` prop (home vs /nights); first-night story on full. |
| `Features.astro` | Four cards off the reference's slot: live music, kitchen, drinks, rooftop — every line traced to its data. |
| `Tour.astro` | Their walk minus its first frame; frames' own headlines are the copy (step number + place + quoted line). |
| `CelebrateTeaser.astro` | Three ⏏ echo plates + hand-off to /celebrate; resTel route. |
| `Setups.astro` | The five owner photos with occasion labels; per-plate spans. |
| `Kitchen.astro` | Menu board on ochre tint; categories + dishes routed to a phone call for prices. |
| `Gallery.astro` | Ten widened plates, one place-label each, `intro` prop; quarter quote after the rain. |
| `InstagramStrip.astro` | Closing social strip (moon / tablesSet / rooftop), shared across pages. |
| `Visit.astro` | The ruled ledger (address, two numbers) + map embed; `intro` prop. |
| `ReserveBand.astro` | Centred reservation close: modal trigger + call link. |
| `Footer.astro` | Routes, contact, timing, maps + IG, credit line. |
| `BookingModal.astro` | Native dialog, top-layer animations, Indian-mobile pattern, IST-safe date window, WhatsApp handoff with blocked-popup fallback. |
| `Section.astro` | Shared section shell: eyebrow + heading + optional lede. |
| `Photo.astro` | Double-bezel frame at the plate's own ratio; `position` named-edge exception only; `sizes` per placement. |
| `CtaPill.astro` | The shared amber booking button, two variants, one hook. |
| `CanyonMark.astro` | Contour-traced arch-and-palms mark, token ink, sizing in global.css so `set:html` nodes size correctly. |
