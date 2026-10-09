/**
 * Art direction for every photograph on the site.
 *
 * ── The one rule ──────────────────────────────────────────────────────────
 * The frame is sized to the plate, never the other way round.
 *
 * Every source is a designed Instagram post, and Canyon's own typography is
 * burnt into all of them: headline, sub-line, sometimes a full paragraph. Under
 * `object-fit: cover` a box whose ratio differs from the plate's silently
 * slices that type — through the middle of the "Canyon" script, through the
 * word "Dinner", through a face. An earlier version of this site cropped to
 * dodge the caption bands and left exactly that: half-cropped letters and
 * anonymous fragments.
 *
 * So the box is declared at the plate's own ratio. `cover` then has nothing to
 * remove and the frame is shown whole, typography included.
 *
 * ── The plates ─────────────────────────────────────────────────────────────
 * Measured with a script over src/assets/images, not estimated:
 *
 *   4:5   1080×1350 — the standard Instagram post. The hero, three tour
 *                    frames, the three night posters, the Sufi archive, the
 *                    drinks, the Ddls0-ADq1d set.
 *   9:16  720×1280, 936×1664, 941×1672, 1080×1920 — reels. Vertical type set
 *                    as a column down the middle of the plate, which reads as
 *                    deliberate design rather than damage when the whole reel
 *                    is in frame. Sized to their own ratio for the same reason
 *                    the 4:5 plates are: no crop, no sliced column.
 *
 * The hero used to be the one exception — a full-bleed background at 100svh,
 * cropped, with the crop art-directed in Hero.astro and measured (see
 * .measure-mark.mjs / .verify-crop.mjs) to keep the lit mark whole at every
 * viewport shape. There is no full-bleed background any more: the hero plate
 * floats in a panel at its own ratio like every other frame here, so the
 * rule above holds without an exception to remember.
 */

import type { ImageMetadata } from 'astro';

import { shots } from './media';

/* ── the two plate ratios, named ───────────────────────────────────────── */

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

/* ── the tour: their own post Dd1U59dmiXl, in its own order ─────────── */

/*
	Their walk through the venue: look up → rooftop → sit down. Shown whole at
	4:5, so each frame's own headline — "this is what you see.", "this is what
	you explore.", "this is where you sit." — is the headline. Nothing beneath
	a frame restates it. Opposite each frame, Tour.astro prints the place and
	one quoted line from a different Canyon post — see `tourSteps` in site.ts.
	That line is about something in the frame, not a caption for it, and it
	is theirs: copy printed here because the place label alone left the column
	empty, which is a layout problem, not a licence to write.

	The first frame of their post — "this is how you enter Canyon." — is not
	in this list: that photograph is the hero now (see `hero` below), and
	showing it twice on one page is the thing this file exists to prevent. The
	walk therefore starts where the visitor's eyes do, under the oculus.
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

/* ── the nights: the posters they designed, shown whole ─────────────── */
/*
	All 4:5. Shown at native ratio with the burnt-in typography intact. These
	are the product — Canyon designs a poster per night and announces it on
	Instagram. Reproducing that art on the site is more honest and more
	arresting than any paragraph describing it.
*/

export const posters = {
	/** Gold Old English on deep warm brown, with dholak and a gramophone. */
	sufi: {
		src: frameOf('Dd-1JjDjonC', 0),
		alt: 'Poster for Sufi Night: "Sufi Night, 3rd Oct, Saturday, 8:00 PM Onwards, Book Your Tables Now", set in gold Old English lettering over an image of a dholak and a gramophone horn, with both booking numbers printed below',
		ratio: FOUR_FIVE,
	},
	/** Bright orange collage, Hindi script, 12 Sept 8 PM. */
	bollywood: {
		src: frameOf('DdG8aA1urkp', 0),
		alt: 'Poster reading "this Saturday, Canyon goes Bollywood, featuring live music, a Bollywood night at Canyon, 12 Sept 8 PM", with a vintage Bollywood portrait in a decorated frame on an orange ground',
		ratio: FOUR_FIVE,
	},
	/** Strings Under The Stars, shot on the real ochre plaster wall. */
	strings: {
		src: frameOf('DdVpFmXDpjD', 0),
		alt: 'Poster for Strings Under The Stars, 16 Sept 8 PM, "classy, melodic, effortless", set against the venue’s own ochre plaster wall with draped fabric overhead and a backlit bottle shelf',
		ratio: FOUR_FIVE,
	},
	/** Kraft envelope and clipped print, laid on a real table. */
	stringsAlt: {
		src: frameOf('DdVpFmXDpjD', 1),
		alt: 'A violin night announcement arranged as a kraft-paper envelope holding a clipped print of a violinist, on one of Canyon’s tables',
		ratio: FOUR_FIVE,
	},
} as const;

/* ── the room, mid-week, mid-music ──────────────────────────────────── */
/*
	The Sufi archive. All 4:5, all carrying the same small footer — the Canyon
	mark bottom left, "SUFI NIGHT ARCHIVE" bottom right — which is part of the
	art and is now inside the frame rather than cropped off it.
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

/* ── the gallery: frames not already carrying a section ────────────────── */

/*
	Everything shown above is spoken for. These are the remaining plates, so the
	gallery widens the set instead of showing the same photographs twice under
	a second caption.

	The galaxy oculus used to sit here, moved to the hero, and has now come
	back: the hero belongs to the entrance sign (see `hero` below), and the
	plate that lost the cover is the plate this section was built to hold. In
	its place, the "After the rain" rooftop plate steps out — the tour already
	walks the rooftop, and a phone-held shot of it was the weakest of the six.
	Every frame on the page is still shown once.
*/

export const gallery = {
	/** 9:16 reel. The singer, with warm beams crossing the frame. */
	sufiStage: {
		src: frameOf('Dd3zmVwiphv', 0),
		alt: 'A vocalist singing into a microphone on the Canyon stage during Sufi Night, a guitarist behind him and warm amber beams of light crossing the room',
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
		alt: 'Palm trees at golden hour seen over the greenery below Canyon, captioned "Everything feels a little greener."',
		ratio: FOUR_FIVE,
	},
	/** 4:5. "AND somehow even prettier." */
	sky: {
		src: frameOf('Ddls0-ADq1d', 2),
		alt: 'Two palms against a dusk sky above Canyon, with the venue window glowing warm below, captioned "AND somehow even prettier."',
		ratio: FOUR_FIVE,
	},
	/**
	 * 9:16 reel. The galaxy oculus — home again after holding the hero while
	 * the entrance sign was step 01 of the walk. Its own ratio, so the burnt-in
	 * type set down the middle of the plate stays whole.
	 */
	oculus: {
		src: frameOf('DdblVqkOZ_7', 0),
		alt: 'The ceiling of Canyon at night: a circular oculus lit like a galaxy and ringed by warm cove lighting, carrying the lit Canyon script and arch mark, set into a curved ochre plaster ceiling above a warmly lit bar',
		ratio: NINE_SIXTEEN,
	},
} as const;

/* ── the bar and the kitchen ────────────────────────────────────────── */

export const bar = {
	/** 4:5. The ingredients are printed on it, so the plate is the label. */
	jamun: {
		src: frameOf('DdBtmHmjp9Q', 0),
		alt: 'Jamun Passion: a deep red drink in a rocks glass on a wooden coaster, topped with a salted rim and a garnish of orange and dried fruit, labelled "spiced jamun, kaffir lime, pineapple"',
		ratio: FOUR_FIVE,
	},
	/** 9:16 reel, no burnt-in type — a clean plate-and-cocktails frame. */
	drinks: {
		src: frameOf('DdwNQ30OOVX', 0),
		alt: 'A guest at Canyon raising a pink cocktail to her lips, a platter of small plates and a second orange cocktail on the table in front of her',
		ratio: NINE_SIXTEEN,
	},
} as const;

export const kitchen = {
	/*
		9:16 reel, and the only photograph they published that actually shows
		dinner. Its headline is set as a vertical column down the middle of the
		plate, which is a design decision rather than damage — but only while
		the plate is whole. Forced into 4:5 it lost the words "the best Dinner"
		entirely, which is why this frame is sized 9:16 and why it is not
		replaced: no other plate shows a served dish, and swapping in a room
		photograph would have quietly turned a menu section into an interior.
	*/
	dinner: {
		src: frameOf('DdoQX7puPgf', 0),
		alt: 'Dim sum in bamboo steamers at a Canyon table, with a guest lifting a piece with chopsticks, captioned "Money can’t buy happiness, but it can buy the best Dinner"',
		ratio: NINE_SIXTEEN,
	},
} as const;

/* ── the hero ───────────────────────────────────────────────────────── */

/*
	THE COVER — the entrance sign, shown whole at its own 4:5.

	How it got here: this plate used to be a full-bleed background, cropped to
	16:9, and the entrance sign was disqualified from it because `cover` on a
	16:9 window sliced the arch and the descender of the script off a 4:5 post.
	When the background came down, the plate was shown whole — but it was
	`tour[0]`, and the same photograph as the hero and as step 01 of the walk
	is the repetition this file has always avoided, so the galaxy oculus held
	the cover instead.

	The entrance sign has the cover back for one reason: it is the only plate
	in the set that is a photograph of an arch. Hero.astro now shows it inside
	an arch of the same shape (see that file), so the frame and its treatment
	are one idea rather than a mask laid over any rectangular photograph. The
	burnt-in caption — "this is how you enter Canyon." / "THE FIRST GLIMPSE."
	— sits in the flat lower band of the plate, clear of both bottom corners,
	so the mask removes wall, not words.

	The walk it left is renumbered below: three frames, ceiling → rooftop →
	table. The oculus moved the other way — out of the hero and into the
	gallery, which is where it sat before all of this — so every plate on the
	page is still shown exactly once.
*/

export const hero = {
	src: frameOf('Dd1U59dmiXl', 0),
	alt: 'The lit Canyon script sign with two palm trees inside a rounded arch, mounted on a warm ochre plaster wall',
	/** 4:5 — the plate's own ratio, so `cover` removes nothing. */
	ratio: FOUR_FIVE,
} as const;

/* ── the instagram strip: the last three unspoken-for plates ────────── */

/*
	Every other export above is spoken for by its section. These three are
	what is left, so the strip widens the set instead of repeating it —
	the same rule the gallery follows, and every plate on the page is
	still shown exactly once.

	Alts are caption-derived (see media.ts) —
	none of these plates was inspected visually, so none claims detail
	beyond what its own caption states.

	Measured over src/assets/images, like everything else: the three posts
	are 4:5 (Ddls0-ADq1d img0 is 1080×1344, six
	pixels short of true 4:5 — three pixels a side under cover, invisible).
*/

export const instagram = {
	/** 4:5. Second frame of the Sufi Night announcement. */
	almost: {
		src: frameOf('Dd-1JjDjonC', 1),
		alt: 'A second frame from the “The sufi night is almost here” announcement post at Canyon',
		ratio: FOUR_FIVE,
	},
	/** 4:5. Second frame of the Jamun Passion post. */
	jamunAlt: {
		src: frameOf('DdBtmHmjp9Q', 1),
		alt: 'A second frame from the Jamun Passion post — the drink and its setting at Canyon',
		ratio: FOUR_FIVE,
	},
	/** 4:5. First frame of the “After the rain” set. */
	rain: {
		src: frameOf('Ddls0-ADq1d', 0),
		alt: 'Canyon after the rain — the greenery below the venue, from their “hits different” set',
		ratio: FOUR_FIVE,
	},
} as const;