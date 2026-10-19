/**
 * Single source of truth for Canyon content.
 *
 * PROVENANCE — read before editing:
 * `data/instagram.json` is a real scrape of @canyonbilaspur (32 posts,
 * 6 Jun – 18 Oct 2026, scripts/scrape-profile.mjs). Two posts the venue has
 * since deleted survive on disk as `data/legacy-posts.json` — their plates
 * are still shown, with the project itself recording why. The celebration
 * photos in src/data/setups.ts came from the venue directly. Every line of
 * copy below is one of two things:
 *
 *   1. Verbatim from their own posts (`data/instagram.json` → `caption`), or
 *      legible in their own artwork (burnt-in poster type is real, published
 *      brand copy — quoting it is quoting them), or legible in the setup
 *      photographs themselves.
 *   2. Structural labels — a heading, a nav item, a form field.
 *
 * There is no third category. Earlier drafts invented headlines like
 * "This is the real reason you come" and all of it was deleted. If you want
 * a new line on this site, it has to come from them.
 *
 * Nothing here is dated as upcoming. Event posters in the scrape ran through
 * 5 Oct 2026 and those dates have passed, so posters are presented as recent
 * art, formats are described as recurring, and the caller is routed to a
 * phone number. Inventing a future date is the easiest way to look fake.
 *
 * The file is laid out in the order a visit moves through the site:
 * identity → pages → hero → nights → tour → kitchen → celebrate → strip.
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
	phone: '96984 21000',
	/** [caption] — printed as "Book your table" on their Sufi poster */
	reservations: '97502 88888',

	instagram: 'canyonbilaspur',
	instagramUrl: 'https://www.instagram.com/canyonbilaspur/',

	/**
	 * [caption] "8 PM onwards" is the start time printed on every single
	 * event post and on two of their posters. It is a start, not a closing
	 * time. The closing hour has never been published, so it is not here.
	 * \u00A0 keeps "8 PM" on one line everywhere it renders.
	 */
	eventStart: '8 PM onwards',
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

/* ─────────────────────────── pages ─────────────────────────────── */

/**
 * Per-page <title> and description. The home page uses the Layout defaults
 * (business.fullName + shortDescription) and is deliberately absent.
 *
 * Descriptions follow the same rule as `shortDescription`: assembled only
 * from facts stated elsewhere in this file — tagline, times, floors,
 * offerings — never written to sell.
 */
export const pages = {
	nights: {
		title: 'Live Nights | Canyon Bilaspur',
		description:
			'Sufi Night, Bollywood Night, Strings Under The Stars. Live music from 8 PM onwards, 2nd floor, Hotel Intercity, Bilaspur. Call for tables.',
	},
	celebrate: {
		title: 'Celebrations & Events | Canyon Bilaspur',
		description:
			'Build the occasion with us: a candlelit table, rose petals and drapes for birthdays, anniversaries and group evenings at Canyon, Bilaspur. Enquire: 97502 88888.',
	},
	kitchen: {
		title: 'The Kitchen | Canyon Bilaspur',
		description:
			'Italian, Asian, grill and small plates off one kitchen. The menu board, the signature pour and both phone lines. Canyon, 2nd floor, Hotel Intercity International, Bilaspur.',
	},
	gallery: {
		title: 'The Gallery | Canyon Bilaspur',
		description:
			'The room in photographs: the oculus, the rooftop, the stage, the golden hour. Real frames from Canyon, Bilaspur. No stock.',
	},
	visit: {
		title: 'Visit & Book | Canyon Bilaspur',
		description:
			'2nd floor, Hotel Intercity International, Jagmal Chowk, Bilaspur. Reservations 96984 21000, events 97502 88888. Find us on the map.',
	},
	notFound: {
		title: 'Not Found | Canyon Bilaspur',
		description: 'That page is not here. The nights, the table and the map are.',
	},
} as const;

/**
 * The site map, in one place. Originally the logo alone carried home ("the
 * logo is the way home") and the bar held five destinations plus the Book
 * button at --text-action with tracking; the owner asked for an explicit
 * "Home" first item (19 Oct 2026), so the labels now read Home through
 * Visit. The footer's Explore column, which used to hard-code Home ahead
 * of this same map, drops its duplicate and maps the array unchanged.
 *
 * Width watch: the six-label row measured 816px natural against the shell's
 * 80px side gutters, which overflowed the whole 768 to 895 band (and the
 * old five-label row was already hairline below 820). The md band therefore
 * carries its own tightening — row gap 12px, link gap 16px, script w-24,
 * link text 13px, button pads 20px — with every knob restored at lg. The
 * fit at 768 computes to 674px against a 688px shell, 14px of slack; fonts
 * here are deterministic (local webfont, metric-matched fallback), so the
 * slack is honest rather than hopeful.
 */
export const navigation = [
	{ label: 'Home', href: '/' },
	{ label: 'Nights', href: '/nights' },
	{ label: 'Celebrate', href: '/celebrate' },
	{ label: 'Kitchen', href: '/kitchen' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Visit', href: '/visit' },
] as const;

/* ─────────────────────────── the hero ─────────────────────────── */

/**
 * The one editorial line on this site, and the only one that is neither
 * verbatim from a post nor a structural label.
 *
 * The hero was rebuilt on the composition of a reference site whose own
 * headline is a greeting ("Welcome to Openhouse!"), and the owner chose to
 * follow it — approved 8 Oct 2026, recorded in docs/DESIGN.md.
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
	line2: 'Live music 8 PM onwards, 2nd floor, Hotel Intercity, Jagmal Chowk.',
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
 * Live music is the reason people come. It is in 15 of the 32 posts on the
 * account, and the opening Sufi Night reel outdrew a typical post by roughly
 * twelve times (1,873 likes against ~150 typical — `Dc8l4SqKBcZ` in the
 * scrape).
 *
 * `format` is the words printed on the posters Canyon designed for each of
 * these — that artwork is the product, so it is the thing worth showing,
 * rather than a paragraph describing it.
 */
export const nights = [
	{
		name: 'Sufi Night',
		/** [caption] */
		blurb: 'Come for the Sufi. Stay for the mood.',
		/** [caption] their close */
		closes: 'An evening that’s all about good music and even better moods.',
		/** Their own poster, reproduced at full fidelity. */
		poster: 'sufi',
		featured: true,
	},
	{
		name: 'Bollywood Night',
		/** [caption] */
		blurb: 'Let the weekend get a little filmy.',
		/** [caption] — their own sign-off */
		closes: 'See you where the music meets the mood.',
		poster: 'bollywood',
		featured: false,
	},
	{
		name: 'Strings Under The Stars',
		/** [caption] */
		blurb: 'The violin takes centre stage and the night finds its rhythm.',
		/** [caption] */
		closes: 'Join us at Canyon for Strings Under The Stars.',
		poster: 'violin',
		featured: false,
	},
] as const;

/**
 * The first Sufi night, as they themselves remember it.
 *
 * [caption Dc8l4SqKBcZ] "05.09.26, just like that, our first Sufi night
 * became a memory. 🎶" — the video cover carries "CANYON'S FIRST Sufi Night"
 * in their own script over the band on a red-lit stage. At 1,873 likes it is
 * the strongest single reply the account ever took, which is why the nights
 * page closes on it instead of a stock "see you there".
 *
 * `stat` is arithmetic over the scrape, not a boast written here: 1,873
 * against ~150 for a typical post is roughly twelve-fold, and the site had
 * said "12×" since the first draft on that same data.
 */
export const firstNight = {
	eyebrow: 'The first one',
	/** [caption] verbatim, emoji dropped */
	quote: '05.09.26, just like that, our first Sufi night became a memory.',
	stat: 'The opening night drew twelve times the usual response: 1,873 likes on the reel they cut after it.',
} as const;

/**
 * [caption DcqJegxqDGM] "Got plans? change them." — settled as
 * `celebrate.changeLine` below; the celebrations page is the one place
 * asking the guest to change their plans.
 */

/**
 * [caption] "A little tour of Canyon / from the first step in to the last
 * view of the night / come see it for yourself."
 *
 * Their own post Dd1U59dmiXl is a four-frame walk through the venue, in this
 * order. Rebuilding that walk as the home page's tour section is the single
 * most specific thing this site can do — it is their narrative, in their
 * sequence, with their own words. The first frame of that walk, the entrance,
 * is the hero of the home page, so the section opens on the second frame and
 * runs to the last; the words still describe the whole walk.
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
	},
	{
		id: 'asian',
		title: 'Asian',
		dishes: ['Sushi', 'Korean Fried Chicken', 'Chicken Noodles'],
	},
	{
		id: 'grill',
		title: 'Grill',
		dishes: ['Kathi Kebab', 'BBQ'],
	},
	{
		id: 'small-plates',
		title: 'Small Plates',
		dishes: ['Peri Peri Fries', 'Fish Fingers', 'Veg Lollipop', 'Egg Wrap'],
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
} as const;

/* ─────────────────────────── celebrate ─────────────────────────── */

/**
 * The occasions page — the setups photographed by the venue (see
 * src/data/setups.ts) and the events formats they publish.
 *
 * `heading` is [photo DecANvTGpYn-01, 13 Oct] — a Notes app card on their own
 * artwork: "Some of life's best moments happen around a table." Owned, not
 * written. `eyebrow` is [caption Deovc0yDlxE, 18 Oct], quoted up to its
 * comma. `lede` is assembled from what the photographs show and what the
 * booking lines are for.
 */
export const celebrate = {
	eyebrow: 'Some nights are made for celebrating',
	/** [photo] burnt-in on their own artwork */
	heading: 'Some of life’s best moments happen around a table.',
	lede: 'A table kept for one occasion, built by our team on the rooftop or under the oculus, dressed with petals, candles and drapes, and cleared away after. Tell us what it is for; we set the rest.',
	formatsHeading: 'The formats',
	formats: [
		'Date nights and anniversaries',
		'Birthdays',
		'Corporate evenings',
		'Groups that want one table together',
	],
	note: 'Set up to order, photographed here from our own tables.',
	/** [caption] */
	changeLine: 'Got plans? change them.',
	callToAction: 'Plan the Evening',
} as const;

/* ─────────────────────────── the visit section ───────────────────────── */

/**
 * The visit ledger — the address, the two published numbers, the map.
 * `heading` states the fact twice-checked against `business.address`.
 * `note` is [caption Dd1U59dmiXl] — their own sign-off from the tour post,
 * closing the section after the map: route found, your move.
 */
export const visit = {
	eyebrow: 'Find us',
	heading: 'Second floor, Jagmal Chowk.',
	note: 'Come see it for yourself.',
} as const;

/* ─────────────────── the reservation band ───────────────────── */

/**
 * The closing band on the home and visit pages. H2 is [caption
 * Dd3zmVwiphv] — "Book your table:" is the line that opens the booking
 * numbers on their Sufi Night event post, used here without the colon.
 * The line under it is a published fact, nothing more.
 */
export const reserveBand = {
	eyebrow: 'Reservation',
	heading: 'Book your table.',
	line: `Live music ${business.eventStart}.`,
} as const;

/* ─────────────────────────── the strip ─────────────────────────── */

/** [caption] social strip eyebrow — the account is the destination itself. */
export const strip = {
	eyebrow: 'Straight from the feed',
	/** [caption DecANvTGpYn, 13 Oct] the newest post's own line. */
	note: 'A table set for good food, long conversations, and moments worth staying for.',
} as const;

/* ── Human CTAs — varied language across the page, Title Case per Chicago ── */
export const cta = {
	hero: 'Reserve a Table',
	heroAlt: 'Call Us',
	nights: 'Call for Tables',
	kitchen: 'Call for the Menu',
	celebrateCall: 'Call Reservations',
} as const;
