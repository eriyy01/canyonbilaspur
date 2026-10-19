#!/usr/bin/env node
/**
 * Downloads the media referenced in data/instagram.json into src/assets/images/
 * and writes src/data/media.ts with a typed manifest.
 *
 * Why download rather than hotlink: the fbcdn URLs in the scrape are signed and
 * expire. Hotlinking them would break the site later, and Astro cannot optimise
 * a remote URL it did not fetch at build time.
 *
 * Videos have no frames to take, so we use their cover art only.
 *
 * LEGACY POSTS: the account sits at exactly 32 posts, and the venue deletes
 * posts as their night passes — `Dd-1JjDjonC` ("The sufi night is almost
 * here.", both booking numbers) and `DcGTQDGmlPi` ("We know you wanna taste
 * these ✨") were both taken down between scrapes, yet the first is the
 * signature plate of the nights pages and the second is the gallery's
 * wide taste-plate. Their files are already on disk, so legacy entries name
 * them directly instead of carrying expired signed URLs — `download()` skips
 * existing files, and if a file ever went missing the fake URL fails loudly
 * rather than silently building a hole.
 *
 * Timestamps are sort keys only. `likesCount: 0` means "unknown" here —
 * the likes line is manifest metadata and renders nowhere.
 *
 * Before launch, confirm the venue is happy reusing art from posts they
 * took down, or hand them these plates to replace.
 *
 * Usage: node scripts/download-media.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT = resolve(ROOT, 'src/assets/images');
mkdirSync(OUT, { recursive: true });

const profile = JSON.parse(readFileSync(resolve(ROOT, 'data/instagram.json'), 'utf8'));
// The scrape used to be a profile object with a `latestPosts` array; the
// modern scraper returns the posts flat. Both shapes still feed this script.
const live = Array.isArray(profile) ? profile : profile.latestPosts;
// Posts deleted by the venue but still shown by the site, see the header.
const LEGACY = existsSync(resolve(ROOT, 'data/legacy-posts.json'))
	? JSON.parse(readFileSync(resolve(ROOT, 'data/legacy-posts.json'), 'utf8'))
	: [];
const posts = [...live, ...LEGACY].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

/** Turn a caption into a usable alt description, first line only. */
function altFrom(caption, type) {
	const first = (caption ?? '')
		.split('\n')
		.map((l) => l.trim())
		.find((l) => l && !l.startsWith('#'));
	if (!first) return type === 'Video' ? 'Canyon' : 'Canyon restaurant and bar';
	// Strip emoji and the stray mojibake characters the scrape introduced
	const cleaned = first
		.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
		.replace(/[�~"']/g, '')
		.trim();
	return cleaned.length > 120 ? `${cleaned.slice(0, 117)}...` : cleaned;
}

async function download(url, destPath) {
	if (existsSync(destPath)) return { skipped: true, bytes: 0 };
	const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.length < 2000) throw new Error(`suspiciously small (${buf.length}B)`);
	if (!(buf[0] === 0xff && buf[1] === 0xd8)) throw new Error('not a JPEG');
	writeFileSync(destPath, buf);
	return { skipped: false, bytes: buf.length };
}

const manifest = [];
let downloaded = 0;
let skipped = 0;
const failures = [];

for (const post of posts) {
	// Legacy entries carry the file list directly; live posts come down
	// displayUrl first (cover art always counts), then carousel adds.
	let urls = [];
	if (post.files) {
		urls = post.files.map((name) => `https://archive.invalid/${name}`);
	} else {
		if (post.displayUrl) urls.push(post.displayUrl);
		for (const u of post.images ?? []) if (!urls.includes(u)) urls.push(u);
	}

	const files = [];
	for (let i = 0; i < urls.length; i++) {
		const name = `${post.shortCode}-${String(i + 1).padStart(2, '0')}.jpg`;
		const dest = resolve(OUT, name);
		try {
			const r = await download(urls[i], dest);
			r.skipped ? skipped++ : downloaded++;
			// Path is relative to the emitted module at src/data/media.ts
files.push({ file: `../assets/images/${name}`, bytes: r.bytes, slot: 0 });
		} catch (err) {
			failures.push(`${post.shortCode}[${i}]: ${err.message}`);
		}
	}

	if (files.length) {
		manifest.push({
			shortCode: post.shortCode,
			type: post.type,
			timestamp: post.timestamp,
			likes: post.likesCount ?? 0,
			caption: (post.caption ?? '').split('\n')[0].trim(),
			alt: altFrom(post.caption, post.type),
			images: files.map((f, slot) => ({
				...f,
				slot,
				// Valid, unique JS identifier derived from post code + index
				key: `m${post.shortCode.replace(/[^A-Za-z0-9]/g, '')}_${slot}`,
			})),
		});
	}
}

// Emit a TS module. Images must be statically imported for astro:assets to
// resolve them to ImageMetadata — a string filepath is rejected at build time.
const imports = manifest
	.flatMap((entry) => entry.images.map((f) => `import ${f.key} from '${f.file}';`))
	.join('\n');

const body = manifest
	.map((entry) => {
		const fields = entry.images.map((f) => `\t\timg${f.slot}: ${f.key},`).join('\n');
		return `	{
		shortCode: '${entry.shortCode}',
		type: '${entry.type}',
		likes: ${entry.likes},
		alt: ${JSON.stringify(entry.alt)},
${fields}
	},`;
	})
	.join('\n');

const ts = `/**
 * GENERATED by scripts/download-media.mjs - do not edit by hand.
 * Real media from @canyonbilaspur, downloaded locally so Astro can optimise it
 * and emit responsive srcset. Hotlinking the fbcdn URLs would break on expiry.
 *
 * Images carry burnt-in caption text from the original social posts. Crop with
 * the \`position\` prop on <Photo /> to keep that text out of frame.
 *
 * \`alt\` is derived mechanically from each post's first caption line, and a few
 * frames show identifiable guests. Confirm both before launch.
 */
import type { ImageMetadata } from 'astro';

${imports}

export type Shot = {
	shortCode: string;
	type: string;
	likes: number;
	alt: string;
	[key: \`img\${number}\`]: ImageMetadata;
};

export const shots: Shot[] = [
${body}
];
`;

writeFileSync(resolve(ROOT, 'src/data/media.ts'), ts, 'utf8');

console.log(`Downloaded ${downloaded}, already had ${skipped}`);
console.log(`Posts with usable media: ${manifest.length}`);
console.log(`Wrote src/data/media.ts (${manifest.reduce((n, m) => n + m.images.length, 0)} images)`);
if (failures.length) {
	console.log(`\nFailures (${failures.length}):`);
	failures.forEach((f) => console.log(`  ${f}`));
}