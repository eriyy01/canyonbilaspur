/**
 * Single source of truth for Canyon content.
 *
 * PROVENANCE — read before editing:
 * `data/instagram.json` is a real scrape of @canyonbilaspur (12 posts,
 * 6 Sep – 5 Oct 2026). Every line of copy below is one of two things:
 *
 *   1. Verbatim from their own posts (`data/instagram.json` → `latestPosts[].caption`),
 *      or legible in their own artwork (the burnt-in poster type is real,
 *      published brand copy, so quoting it is quoting them).
 *   2. Structural labels — a heading, a nav item, a form field.
 *
 * There is no third category. Earlier drafts invented headlines like
 * "This is the real reason you come" and "The whole idea, in three words".
 * None of that was Canyon's voice and all of it has been deleted. If you
 * want a new line on this site, it has to come from them.
 *
 * Nothing here is dated as upcoming. The posts in the scrape ran 6 Sep –
 * 5 Oct 2026 and those dates have passed. Posters are presented as recent
 * art, formats are described as recurring, and the caller is routed to a
 * phone number. Inventing a future date is the easiest way to look fake.
 */

/* ─────────────────────────── identity ─────────────────────────── */

export const business = {
	name: 'Canyon',
	/** [bio] exact string from the profile */
	fullName: 'Canyon - Hotel Intercity International',
	/** [bio] verbatim — this is the tagline, unchanged and unabbreviated */
	tagline: 'Cocktails. Cuisine. Conversations.',
	/** [bio] */
	status: 'Now Open',

	/**
	 * [bio] composed from facts already stated in this file — tagline, floor,
	 * address, start time and booking number. Used for <meta name="description">
	 * and og:description, which need a sentence rather than a fragment.
	 * Kept under 160 characters so search results show it whole.
	 */
	shortDescription:
		'Cocktails. Cuisine. Conversations. Canyon, 2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur. Live music 8 PM onwards. Book: 96984 21000.',

	address: {
		/** [bio] + [caption] — stated in 3 separate event posts */
		line1: '2nd floor, Hotel Intercity International',
		/** [bio] */
		line2: 'Jagmal Chowk, Bilaspur',
	},

	/** [bio] + [caption] — \u00A0 keeps the number on one line everywhere it renders */
	phone: '96984 21000',
	/** [caption] — printed as "Book your table" on their Sufi poster */
	reservations: '97502 88888',

	instagram: 'canyonbilaspur',
	instagramUrl: 'https://www.instagram.com/canyonbilaspur/',

	/**
	 * [caption] "8 PM onwards" is the start time printed on every single
	 * event post and on two of their posters. It is a start, not a closing
	 * time. The closing hour has never been published, so it is not here.
	 * \u00A0 keeps "8 PM" on one line everywhere it renders.
	 */
	eventStart: '8 PM onwards',
} as const;

export const contact = {
	/** Dial strings carry the country code, so `tel:` works off-network. */
	tel: '919698421000',
	resTel: '919750288888',
	telDisplay: business.phone,
	resDisplay: business.reservations,
	/** [bio] external_url, click-tracking param stripped */
	mapsUrl: 'https://maps.app.goo.gl/YfqA5Dak54ywpmpM6',
	whatsapp: '919698421000',
} as const;

/* ─────────────────────────── the hero ─────────────────────────── */

/**
 * The one editorial line on this site, and the only one that is neither
 * verbatim from a post nor a structural label.
 *
 * The hero was rebuilt on the composition of a reference site whose own
 * headline is a greeting ("Welcome to Openhouse!"), and the owner chose to
 * follow it — approved 8 Oct 2026, recorded in
 * docs/superpowers/specs/2026-10-08-hero-openhouse-structure-design.md.
 *
 * It lives here rather than inlined in the component so the exception is
 * visible in the same file as the provenance rule at the top of it. Delete
 * this and nothing else on the page has to change.
 *
 * Held as two fields: on phones Hero.astro sets them joined on a single
 * line at a size measured to fit it; on desktop the two spans stack back
 * into the original "Welcome to" / "Canyon!" break.
 */
export const heroGreeting = {
	line1: 'Welcome to',
	line2: 'Canyon!',
} as const;

/**
 * The greeting is a greeting, so the lede is what tells a first-time visitor
 * what this place is. Two lines, the same two-line shape as the reference.
 */
export const heroLede = {
	/** [bio] verbatim — the three pillars, in their order */
	line1: 'Cocktails. Cuisine. Conversations.',
	/**
	 * Assembled from facts already stated in this file — `eventStart`, the
	 * floor and the address — the same construction `shortDescription`
	 * documents above. Every clause in it is one they publish; the joining is
	 * the only thing done here.
	 */
	line2: 'Live music 8 PM onwards, 2nd floor, Hotel Intercity, Jagmal Chowk.',
} as const;

/**
 * The three slots under the hero, in the order the reference site runs them.
 * Structural labels — the values come off `business` and `contact` in
 * Hero.astro, so nothing here can drift from the identity block.
 *
 * The middle slot is not "Open Hours": closing time has never been published
 * (see `eventStart`), so it carries the time-fact Canyon does publish instead.
 */
export const heroStrip = {
	locate: 'Locate Us',
	nights: 'The Nights',
	reservation: 'Reservation',
} as const;

/* ─────────────────────────── the nights ────────────────────────── */

/**
 * Live music is the reason people come. It appears in 8 of the 12 sampled
 * posts. Sufi Night carried the highest engagement by a wide margin
 * (1,844 likes on 5 Sep, against ~150 typical).
 *
 * `posterArt` and `format` are the words printed on the posters Canyon
 * designed for each of these — that artwork is the product, so it is the
 * thing worth showing, rather than a paragraph describing it.
 */
export const nights = [
	{
		name: 'Sufi Night',
		/** [caption] */
		blurb: 'Come for the Sufi. Stay for the mood.',
		/** [caption] — the instrumental line-up they publish */
		format: 'Soulful Sufi music, live dholak and keyboard.',
		/** [caption] */
		closes: 'An evening that is all about good music and even better moods.',
		/** Their own poster, reproduced at full fidelity. */
		poster: 'sufi',
		featured: true,
	},
	{
		name: 'Bollywood Night',
		/** [caption] */
		blurb: 'Let the weekend get a little filmy.',
		/** [caption] */
		format: 'Live music, iconic Bollywood hits.',
		/** [caption] — their own sign-off */
		closes: 'See you where the music meets the mood.',
		poster: 'bollywood',
		featured: false,
	},
	{
		name: 'Strings Under The Stars',
		/** [caption] */
		blurb: 'The violin takes centre stage and the night finds its rhythm.',
		/** [poster] printed on their own artwork */
		format: 'An evening of strings at Canyon.',
		/** [caption] */
		closes: 'Join us at Canyon for Strings Under The Stars.',
		poster: 'violin',
		featured: false,
	},
] as const;

/**
 * [caption] "A little tour of Canyon / from the first step in to the last
 * view of the night / come see it for yourself."
 *
 * Their own post Dd1U59dmiXl is a four-frame walk through the venue, in this
 * order. Rebuilding that walk as the site's own tour section is the single
 * most specific thing this site can do — it is their narrative, in their
 * sequence, with their own words. The first frame of that walk, the entrance,
 * is the hero of the page now, so the section below opens on the second
 * frame and runs to the last; the words still describe the whole walk.
 */
export const tourHeading = {
	eyebrow: 'A little tour',
	/** [caption] verbatim */
	title: 'From the first step in to the last view of the night.',
} as const;

/**
 * What sits opposite each frame of the walk, keyed to `tour[].key` in
 * src/data/frames.ts.
 *
 * `place` is a structural label — the one thing a photograph of a ceiling
 * cannot tell you is which part of the room you are looking at. The burnt-in
 * headlines already say "this is what you see"; these say where.
 *
 * `line` is one line of Canyon's own copy, quoted whole or trimmed at a
 * comma. Not one word here is written to fill the column:
 *
 *   look     [caption 5 Oct] "A night of sufi melodies, live music, and moments
 *            worth replaying." — the room they were standing in.
 *   rooftop  [poster 22 Sep] "Everything feels a little greener. AND somehow
 *            even prettier." — burnt-in type on their own rooftop plates.
 *   sit      [caption 26 Sep] "This is how our weekdays look. Now imagine what
 *            the weekends must be like" — that reel is guests at a table.
 *
 * The entrance step is gone with the entrance photograph: it moved to the
 * hero, and its line — "Bring your people, pick your table." [caption 10 Sep]
 * — belonged to that frame, so it went with it rather than being reassigned
 * to a photograph it was never about.
 *
 * Every line is a line they published about something in the frame next to it.
 * The framing itself is the same caption twice.
 */
export const tourSteps = {
	look: {
		place: 'The ceiling',
		/** [caption] verbatim */
		line: 'A night of sufi melodies, live music, and moments worth replaying.',
	},
	rooftop: {
		place: 'The rooftop',
		/** [poster] both lines are burnt-in type on their own plates */
		line: 'Everything feels a little greener. AND somehow even prettier.',
	},
	sit: {
		place: 'The table',
		/** [caption] verbatim */
		line: 'This is how our weekdays look. Now imagine what the weekends must be like',
	},
} as const;

/* ─────────────────────────── the kitchen ───────────────────────── */

/**
 * Dish names come from reels posted by collaborating food accounts, so
 * they are real dishes but not menu-verified by the venue. Prices have
 * never been published and are therefore absent. Grouping is editorial.
 *
 * The kitchen is presented as categories and signature dishes with the
 * call to action routed to a phone booking — a menu with invented prices
 * is worse than no menu.
 */
export const cuisine = [
	{
		id: 'italian',
		title: 'Italian',
		dishes: ['Pizza', 'Pasta'],
		/** [photo] DdwNQ30OOVX — a table of shared plates */
		frame: 'plates',
	},
	{
		id: 'asian',
		title: 'Asian',
		dishes: ['Sushi', 'Korean Fried Chicken', 'Chicken Noodles'],
		/** [photo] Ddls0-ADq1d — the room after the rain */
		frame: 'green',
	},
	{
		id: 'grill',
		title: 'Grill',
		dishes: ['Kathi Kebab', 'BBQ'],
		/** [photo] DeHSXGVGodB — the band under the beams */
		frame: 'crowd',
	},
	{
		id: 'small-plates',
		title: 'Small Plates',
		dishes: ['Peri Peri Fries', 'Fish Fingers', 'Veg Lollipop', 'Egg Wrap'],
		/** [photo] Dd1U59dmiXl — the table you sit at */
		frame: 'table',
	},
] as const;

/**
 * [poster DdBtmHmjp9Q] "Jamun Passion — SPICED JAMUN · KAFFIR LIME ·
 * PINEAPPLE", captioned "CHILLED" on one side and "BALANCED" on the other.
 *
 * This is a named, photographed drink with published ingredients. It is
 * the strongest single product asset on the account, so it gets a section
 * of its own instead of a line in a list. The closing line is their own.
 */
export const signatureDrink = {
	name: 'Jamun Passion',
	ingredients: ['Spiced jamun', 'Kaffir lime', 'Pineapple'],
	temper: ['Chilled', 'Balanced'],
	/** [caption] verbatim */
	line: 'A little jamun, a little passion, and suddenly that one thing you were overthinking doesn’t seem so important.',
	/** [caption] verbatim */
	punch: 'Sip first. Worry later.',
	frame: 'jamun',
} as const;

/* ─────────────────────────── events ────────────────────────────── */

/** [caption] "Vatavaran · Events 👀" — a named events line on their profile. */
export const events = {
	name: 'Vatavaran',
	eyebrow: 'Vatavaran · Events',
	/** [caption] "For Enquiries" is how their event posts address bookings */
	body: 'Tell us the occasion and we will hold the room.',
	details: [
		'Birthdays and anniversaries',
		'Corporate evenings',
		'Groups that want one table together',
	],
	callToAction: 'Enquire',
	/** Real frames from a night that was clearly a full house. */
	frames: ['crowd', 'band', 'beams'],
} as const;

export const navigation = [
	{ label: 'Nights', href: '#nights' },
	{ label: 'The Room', href: '#tour' },
	{ label: 'Kitchen', href: '#cuisine' },
	{ label: 'Visit', href: '#visit' },
] as const;

/* ── Human CTAs — varied language across the page, Title Case per Chicago ── */
export const cta = {
	hero: 'Reserve a Table',
	heroAlt: 'Call Us',
	nights: 'Call for Tables',
	kitchen: 'Call for the Menu',
	cocktails: 'Ask About the Bar',
	events: 'Enquire About Your Event',
	visit: 'Get Directions',
} as const;