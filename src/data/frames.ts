/**
 * Art direction for every photograph on the site.
 *
 * ── The one rule ──────────────────────────────────────────────────────────
 * The frame is sized to the plate, never the other way round.
 *
 * Every source that came down the Instagram pipeline is a designed post, and
 * Canyon's own typography is burnt into many of them: headline, sub-line,
 * sometimes a full paragraph. Under `object-fit: cover` a box whose ratio
 * differs from the plate's silently slices that type — through the middle of
 * the "Canyon" script, through the word "Dinner", through a face. An earlier
 * version of this site cropped to dodge the caption bands and left exactly
 * that: half-cropped letters and anonymous fragments.
 *
 * So the box is declared at the plate's own ratio. `cover` then has nothing
 * to remove and the frame is shown whole, typography included. The
 * celebration plates in src/data/setups.ts follow the same rule (with one
 * documented watermark crop — see that file's header).
 *
 * ── The ledger ────────────────────────────────────────────────────────────
 * Plates are spoken for by section, and nothing that a section shows is
 * shown again on the same page. Across pages, one carve-out: a home-page
 * teaser may echo up to three plates from the destination page — a teaser
 * that shows *other* photographs would be a bait-and-switch. Echoes are
 * marked with a ⏏ in the lists below.
 *
 * ── The plates ────────────────────────────────────────────────────────────
 *   4:5   1080×1350 — the standard Instagram post.
 *   9:16  720×1280 etc. — reels. Vertical type set as a column down the
 *         middle of the plate reads as deliberate design rather than damage
 *         when the whole reel is in frame.
 * Everything here was measured with a script over src/assets/images, not
 * estimated.
 */

import type { ImageMetadata } from 'astro';

import { shots } from './media';

/* ── the plate ratios, named ───────────────────────────────────────────── */

const FOUR_FIVE = 'aspect-[4/5]';
const NINE_SIXTEEN = 'aspect-[9/16]';

/* ── lookup ────────────────────────────────────────────────────────────── */

const index = new Map(shots.map((shot) => [shot.shortCode, shot]));

/** Resolve a post shortcode + frame number to its optimised image. */
function frameOf(shortCode: string, n: number): ImageMetadata {
	const shot = index.get(shortCode);
	const src = shot?.[`img${n}` as keyof typeof shot] as ImageMetadata | undefined;
	if (!src) throw new Error(`frames.ts: no image for ${shortCode} img${n}`);
	return src;
}

/* ───────────── opening a page: the fresh feed ───────────── */

/**
 * [post 13 Oct 2026, DecANvTGpYn] "A table set for good food, long
 * conversations, and moments worth staying for."
 *
 * The account's own line for the month the site relaunched, and the newest
 * photography it has. See `celebrate.heading` in site.ts, which quotes the
 * notes card on the first frame, `strip.note` in site.ts, which quotes the
 * caption, and the kitchen page, which shows both frames below the menu.
 */
export const tablesSet = {
	/** 4:5. The straight room photograph with the notes-app card. */
	notes: {
		src: frameOf('DecANvTGpYn', 0),
		alt: 'Banquette tables laid with plates and cutlery under cream ceiling drapes, carrying a notes-app card that reads “Some of life’s best moments happen around a table.”',
		ratio: FOUR_FIVE,
	},
	/** 4:5. Their designed card — cream script over a set oval table. */
	card: {
		src: frameOf('DecANvTGpYn', 1),
		alt: '“Tables Set” in cream script over an oval table laid for dinner against a lit plaster wall with glass-block sconces, “CANYON BILASPUR” standing down the side and the floor-and-address line printed below',
		ratio: FOUR_FIVE,
	},
} as const;

/** [post DZPBvRfCT0j, 6 Jun] [artwork] "Above the city." — the rooftop plate. */
export const rooftop = {
	dining: {
		src: frameOf('DZPBvRfCT0j', 0),
		alt: 'A golden sunset burning over a bridge on the water, with Canyon’s small arch-and-palms mark above the words ROOFTOP DINING',
		ratio: FOUR_FIVE,
	},
} as const;

/**
 * [post 22 Aug, DcVj6z5mpPr] "if golden hour had a favourite child 🍊"
 *
 * Spare: it held the instagram strip until the celebration set landed the
 * moon plate, and a plate the strip lets go of does not stay claimed. Its
 * home on the site, if it returns, would be the gallery's sky row.
 */
export const goldenHour = {
	sky: {
		src: frameOf('DcVj6z5mpPr', 0),
		alt: 'Palm tops against a burning orange sky, captioned “You can trust your Senses until…”',
		ratio: FOUR_FIVE,
	},
} as const;

/* ───────────── the nights ──────────────────────────────── */

/**
 * The nights lead with the artwork. Live music is the reason people come —
 * and the opening Sufi Night reel outdrew a typical post by roughly twelve
 * times. The posters are the product: Canyon designs one per night and
 * announces it on Instagram. See `firstNight` in site.ts for the reel that
 * carries the page's closing stat.
 */
export const posters = {
	/** Gold Old English on deep warm brown, with dholak drum and gramophone. */
	sufi: {
		src: frameOf('Dd-1JjDjonC', 0),
		alt: 'Poster for Sufi Night: “Sufi Night, 3rd Oct, Saturday, 8:00 PM Onwards, Book Your Tables Now”, set in gold lettering over an image of a dholak drum and a gramophone horn, with both booking numbers printed below',
		ratio: FOUR_FIVE,
	},
	/** Bright orange collage, Hindi script, 12 Sept 8 PM. */
	bollywood: {
		src: frameOf('DdG8aA1urkp', 0),
		alt: 'Poster reading “this Saturday, Canyon goes Bollywood, featuring live music, a Bollywood night at Canyon, 12 Sept 8 PM”, with a vintage Bollywood portrait in a decorated frame on an orange ground',
		ratio: FOUR_FIVE,
	},
	/** Strings Under The Stars, shot on the real ochre plaster wall. */
	strings: {
		src: frameOf('DdVpFmXDpjD', 0),
		alt: 'Poster for Strings Under The Stars, with “16 Sept, 8 PM”, “VIOLIN NIGHT” and “CLASSY. MELODIC. EFFORTLESS.” set over the venue’s own draped ceiling and backlit shelf, the Canyon script below',
		ratio: FOUR_FIVE,
	},
	/** Kraft envelope and clipped print, laid on a real table. */
	stringsAlt: {
		src: frameOf('DdVpFmXDpjD', 1),
		alt: 'A violin night announcement arranged as a kraft-paper envelope holding a clipped print of a violinist, on one of Canyon’s tables',
		ratio: FOUR_FIVE,
	},
} as const;

/** [reel 6 Sep, Dc8l4SqKBcZ] the first Sufi night, and the page's proof. */
export const firstNight = {
	src: frameOf('Dc8l4SqKBcZ', 0),
	alt: 'Cover of the reel from the first Sufi Night: “CANYON’S FIRST Sufi Night” in curled script above the band on a red-lit stage, gilded leaves in the foreground',
	ratio: NINE_SIXTEEN,
};

/*
 * The room, mid-week, mid-music.
 *
 * The Sufi archive. All 4:5, all carrying the same small footer — the Canyon
 * mark bottom left, "SUFI NIGHT ARCHIVE" bottom right — which is part of the
 * art and is now inside the frame rather than cropped off it.
 */
export const room = {
	band: {
		src: frameOf('DeHSXGVGodB', 1),
		alt: 'A three-piece band performing at Canyon during Sufi Night: a vocalist in white at the microphone, a guitarist, and a keyboard player under green and red stage lighting',
		ratio: FOUR_FIVE,
	},
	beams: {
		src: frameOf('DeHSXGVGodB', 5),
		alt: 'The Canyon floor during Sufi Night, blue light beams cutting across the room from the stage past a raised planter and rattan seating',
		ratio: FOUR_FIVE,
	},
	crowd: {
		src: frameOf('DeHSXGVGodB', 0),
		alt: 'Golden palm fronds lit from below above a full room at Canyon, with the band on stage behind the crowd',
		ratio: FOUR_FIVE,
	},
	guests: {
		src: frameOf('DeHSXGVGodB', 4),
		alt: 'Guests seated at a rattan table at Canyon during Sufi Night, blue stage beams visible behind them',
		ratio: FOUR_FIVE,
	},
	dholak: {
		src: frameOf('DeHSXGVGodB', 3),
		alt: 'A close view of a musician playing the dholak on the Canyon stage, lit red and green',
		ratio: FOUR_FIVE,
	},
} as const;

/** [sidecar, Dd-1JjDjonC] "The sufi night is almost here." — deleted post, see download-media.mjs. */
export const almost = {
	src: frameOf('Dd-1JjDjonC', 1),
	alt: 'A second Sufi Night poster: “Sufi Night, 3rd Oct, 8 PM, Book Your Tables Now” in gold lettering above a brass incense burner trailing smoke on a woven floor, both booking numbers below',
	ratio: FOUR_FIVE,
};

/**
 * [sidecar 18 Oct 2026, Deovc0yDlxE] "Some nights are made for
 * celebrating, others for simply soaking in the moment 🌙"
 *
 * Posted the week the site relaunched — the venue's own celebration
 * promo photography. One plate sells the celebrations page's formats;
 * one joins the instagram strip. See each export for where it is
 * spoken for.
 */
export const tonight = {
	/** 4:5. The candlelit table on the rooftop, their own tagline burnt in. */
	remember: {
		src: frameOf('Deovc0yDlxE', 0),
		alt: 'A round table lit with candles and red roses on the rooftop at night, under the Canyon neon and the palms, captioned “make it a night to remember.”',
		ratio: FOUR_FIVE,
		/** [artwork] their own tagline, for display under the frame. */
		line: 'make it a night to remember.',
	},
	/** 4:5. The rooftop at night: neon script, crescent moon, glowing door. */
	moon: {
		src: frameOf('Deovc0yDlxE', 1),
		alt: 'The rooftop at night, the Canyon script in neon under a crescent moon, lit seats by the glowing door glass',
		ratio: FOUR_FIVE,
	},
} as const;

/* ───────────── the tour ────────────────────────────────── */

/*
 * Their walk through the venue: look up → rooftop → sit down. Shown whole at
 * 4:5, so each frame's own headline — "this is what you see.", "this is what
 * you explore.", "this is where you sit." — is the headline. Nothing beneath
 * a frame restates it. Opposite each frame, Tour.astro prints the place and
 * one quoted line from a different Canyon post — see `tourSteps` in site.ts.
 *
 * The first frame of their post — "this is how you enter Canyon." — is the
 * hero below, so this walk starts where the visitor's eyes do, under the
 * oculus.
 */
export const tour = [
	{
		key: 'look',
		src: frameOf('Dd1U59dmiXl', 1),
		alt: "Canyon's ceiling: a circular oculus lit like a starfield and ringed with warm cove lighting, above a textured plaster ceiling",
		ratio: FOUR_FIVE,
	},
	{
		key: 'rooftop',
		src: frameOf('Dd1U59dmiXl', 2),
		alt: 'The Canyon rooftop at night, a lit script sign on a sculptural wall above a backlit bar, with palm trees lit gold against the dark sky',
		ratio: FOUR_FIVE,
	},
	{
		key: 'sit',
		src: frameOf('Dd1U59dmiXl', 3),
		alt: 'A set table at Canyon: marble top, place settings and rattan chairs against a warm plaster wall with a backlit bottle shelf',
		ratio: FOUR_FIVE,
	},
] as const;

/* ───────────── the kitchen and the bar ─────────────────── */

export const kitchen = {
	/*
		9:16 reel, and the strongest photograph they published that actually
		shows dinner. Its headline is set as a vertical column down the middle
		of the plate, which is a design decision rather than damage — but only
		while the plate is whole. Forced into 4:5 it lost the words "the best
		Dinner" entirely, which is why this frame is sized 9:16 and why it is
		not replaced: no other plate shows a served dish, and swapping in a room
		photograph would have quietly turned a menu section into an interior.
	*/
	dinner: {
		src: frameOf('DdoQX7puPgf', 0),
		alt: 'Dim sum in bamboo steamers at a Canyon table, with a guest lifting a piece with chopsticks, captioned “Money can’t buy happiness, but it can buy the best Dinner”',
		ratio: NINE_SIXTEEN,
	},
} as const;

export const bar = {
	/** 4:5. The ingredients are printed on it, so the plate is the label. */
	jamun: {
		src: frameOf('DdBtmHmjp9Q', 0),
		alt: 'Jamun Passion: a deep red drink in a rocks glass on a wooden coaster, topped with a salted rim and a garnish of orange and dried fruit, labelled “spiced jamun, kaffir lime, pineapple”',
		ratio: FOUR_FIVE,
	},
	/** 4:5. Second frame of the same post — the drink standing in the room. */
	jamunAlt: {
		src: frameOf('DdBtmHmjp9Q', 1),
		alt: 'A second frame from the Jamun Passion post, the drink and its setting at Canyon',
		ratio: FOUR_FIVE,
	},
	/** 9:16 reel, no burnt-in type — a clean plate-and-cocktails frame. */
	drinks: {
		src: frameOf('DdwNQ30OOVX', 0),
		alt: 'A guest at Canyon raising a pink cocktail to her lips, a platter of small plates and a second orange cocktail on the table in front of her',
		ratio: NINE_SIXTEEN,
	},
} as const;

/* ───────────── the tour: the walk's first step ─────────── */

/*
 * THE COVER — the entrance sign, shown whole at its own 4:5.
 *
 * It is the only plate in the set that is a photograph of an arch.
 * Hero.astro shows it inside an arch of the same shape (see that file), so
 * the frame and its treatment are one idea rather than a mask laid over any
 * rectangular photograph. The burnt-in caption — "this is how you enter
 * Canyon." / "THE FIRST GLIMPSE." — sits in the flat lower band of the
 * plate, clear of both bottom corners, so the mask removes wall, not words.
 */
export const hero = {
	src: frameOf('Dd1U59dmiXl', 0),
	alt: 'The lit Canyon script sign with two palm trees inside a rounded arch, mounted on a warm ochre plaster wall',
	/** 4:5 — the plate's own ratio, so `cover` removes nothing. */
	ratio: FOUR_FIVE,
} as const;

/* ───────────── the gallery ─────────────────────────────── */

/*
 * Everything shown elsewhere is spoken for. The gallery widens the set
 * instead of repeating it: the opening trio still carries the room, and the
 * second row carries the frames the account used to tease the opening.
 * Every gallery frame is shown exactly once across the site.
 */
export const gallery = {
	/** 9:16 reel. The singer, with warm beams crossing the frame. */
	sufiStage: {
		src: frameOf('Dd3zmVwiphv', 0),
		alt: 'A vocalist singing into a microphone under warm amber beams during Sufi Night at Canyon, a percussionist on the dholak seated behind him, the frame headlined “Sufi Night at Canyon”',
		ratio: NINE_SIXTEEN,
	},
	/** 4:5. Five friends together under red and amber light. */
	friends: {
		src: frameOf('DeHSXGVGodB', 2),
		alt: 'Five friends standing together and smiling at Canyon during Sufi Night, lit red and amber from the stage',
		ratio: FOUR_FIVE,
	},
	/** 4:5. Sunset over the palms — "Everything feels a little greener." */
	palms: {
		src: frameOf('Ddls0-ADq1d', 1),
		alt: 'A palm tree over the river and greenery below Canyon at dusk, burnt-in line “Everything feels a little greener.”',
		ratio: FOUR_FIVE,
	},
	/** 4:5. "AND somehow even prettier." */
	sky: {
		src: frameOf('Ddls0-ADq1d', 2),
		alt: 'A palm against the dusk sky beside Canyon’s glowing window wall, burnt-in line “AND somehow even prettier.”',
		ratio: FOUR_FIVE,
	},
	/**
	 * 9:16 reel. The galaxy oculus — home again after holding the hero while
	 * the entrance sign was step 01 of the walk. Its own ratio, so the
	 * burnt-in type set down the middle of the plate stays whole.
	 */
	oculus: {
		src: frameOf('DdblVqkOZ_7', 0),
		alt: 'The ceiling of Canyon at night: a circular oculus lit like a galaxy and ringed by warm cove lighting, carrying the lit Canyon script and arch mark, set into a curved ochre plaster ceiling above a warmly lit bar',
		ratio: NINE_SIXTEEN,
	},
	/** 9:16. [reel 27 Aug] "from a vision to a night we won't forget." */
	vision: {
		src: frameOf('DciWfZoivHp', 0),
		alt: 'A collage of vertical slivers of the lit dining room with the Canyon script across the centre, from the reel captioned “from a vision to a night we won’t forget.”',
		ratio: NINE_SIXTEEN,
	},
	/** 4:5. [post 16 Aug] "We know you wanna taste these 👀" */
	tasteThis: {
		src: frameOf('DcGTQDGmlPi', 0),
		alt: 'A yellow cocktail in a stemmed glass, a young mint sprout standing in the ice, on a cork coaster, captioned “you can already taste this.”',
		ratio: FOUR_FIVE,
	},
	/** 4:5. [post 14 Jun] "We like it spicy. 🌶️" — the spice-rim glass, burnt-in "THINGS ARE GETTING SPICY / STAY TUNED". */
	spicy: {
		src: frameOf('DZkVzCZuGkL', 0),
		alt: 'A hand holding a spice-rimmed old-fashioned with a dried chilli against the dark, burnt-in line “Things are getting spicy; stay tuned.”',
		ratio: FOUR_FIVE,
	},
	/** 9:16. [reel DcqJegxqDGM, 30 Aug] "Got plans? change them." — the neon sign. */
	neon: {
		src: frameOf('DcqJegxqDGM', 0),
		alt: 'The Canyon name in warm neon script glowing against the dark above the room, from the reel captioned “Got plans? change them.”',
		ratio: NINE_SIXTEEN,
	},
} as const;

/* ───────────── the instagram strip ─────────────────────── */

/*
 * Three plates the account dressed for the grid, chosen for a closing
 * strip rather than a "newest three" claim — the account posts faster
 * than the site refreshes, so recency is the feed's own business. The
 * strip repeats across pages (home + gallery) by design; everything
 * else here is shown once per page. Caption-derived alts — none of
 * these plates needs more than its own account voice.
 */
export const instagram = {
	/** [post 13 Oct] the designed "Tables Set" card — the account's own tile. */
	tablesSet: tablesSet.card,
	/** [post 18 Oct] the rooftop under the crescent moon, from the celebration set. */
	moon: tonight.moon,
	/** [post 6 Jun] the rooftop at sunset, signed with the arch mark. */
	rooftop: rooftop.dining,
} as const;
