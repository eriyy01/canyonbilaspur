/**
 * The celebration setups, photographed by the venue and sent over for the
 * site (WhatsApp, 16 Oct 2026) — the only photographs here that did not come
 * through the Instagram pipeline.
 *
 * These are a product Canyon sells privately: a table built by hand for one
 * occasion — petals, candles, drapes — booked on the reservations number, and
 * never posted to the account. That also means there is no burnt-in
 * typography to quote and no caption to derive alt text from, so the alt
 * lines below are written by looking at each photograph.
 *
 * ── The echo rule ─────────────────────────────────────────────────
 * Entries marked ⏏ are also shown on the home page's celebrations teaser
 * (CelebrateTeaser.astro) — a teaser that showed other photographs would be
 * a bait-and-switch, so it may only echo plates the guest will find again on
 * /celebrate. `petalsWide` and `heart` appear nowhere else, which is what
 * gives the destination page something new in hand.
 *
 * Ratios are the photographs' own, so `cover` still removes nothing — with
 * one documented exception: `drapeDay` carries a phone watermark in its
 * bottom-left corner ("NOTHING 11.10.26"). The frame for that plate is set
 * to 4:5 rather than the source's 3:4, and rendered `object-top`, which trims
 * the bottom 15% of the source and the watermark with it. That is a crop of
 * a device artefact, not of the venue's work — see the note on `position` in
 * Photo.astro.
 */
import drapeDay from '../assets/images/setup-drape-day.jpg';
import petalHeart from '../assets/images/setup-petal-heart.jpg';
import candleDrapes from '../assets/images/setup-candle-drapes.jpg';
import petalsWide from '../assets/images/setup-petals-wide.jpg';
import candleNight from '../assets/images/setup-candle-night.jpg';

/** The two shareable ratios, named like frames.ts names its own. */
const THREE_FOUR = 'aspect-[3/4]';
const NINE_SIXTEEN = 'aspect-[899/1599]';
const FOUR_FIVE = 'aspect-[4/5]';
const NEAR_LANDSCAPE = 'aspect-[1280/940]';

export const setups = {
	/** Appears only on /celebrate. 9:16. Top-down along the long table — petals, candles, vases. */
	heart: {
		src: petalHeart,
		alt: 'Seen from above down the length of a dark green table: a heart of deep red rose petals ringed in petals, candles and vases of single red roses set along the edge',
		ratio: NINE_SIXTEEN,
	},
	/** ⏏ echoed on the home teaser. Tall portrait (807/1280). Candlelight and white drapes at night — the strongest single frame. */
	candleDrapes: {
		src: candleDrapes,
		alt: 'A round table at night, white cloth draped low over its sides and a cowl of fabric in front, lit by a ring of candles and flower arrangements; the rooftop band and bar glow behind it',
		ratio: 'aspect-[807/1280]',
	},
	/** ⏏ echoed on the home teaser. 4:5, rendered object-top to clear the phone watermark — see file header. */
	drapeDay: {
		src: drapeDay,
		alt: 'A long table built for the occasion in daylight: pink and white draped cloth, rose petals and floating candles, vases of gerberas and roses, the fabric cascading off the table onto the rooftop floor',
		ratio: FOUR_FIVE,
		position: 'top' as const,
	},
	/** Landscape, ~1.36:1. Candlelight on the dark table, moonhole in the wall. */
	petalsWide: {
		src: petalsWide,
		alt: 'A dark table set with white petals, glass candles and maroon fanned napkins, white blossoms on the table and a full moon-hole in the curved plaster wall above, against a night sky',
		ratio: NEAR_LANDSCAPE,
	},
	/** ⏏ echoed on the home teaser (owner-directed lead swap, 18 Oct 2026 — see CelebrateTeaser.astro). 3:4. The whole setup at night — table, candles, petals, the band behind. */
	candleNight: {
		src: candleNight,
		alt: 'The candlelit table seen whole at night on the rooftop: white drapes lit from within, petals and candles leading to it, rattan chairs beside, the band and lit greenery behind',
		ratio: THREE_FOUR,
	},
} as const;
