#!/usr/bin/env node
/**
 * Pulls the public @canyonbilaspur profile via Apify.
 *
 * Usage:  node scripts/fetch-instagram.mjs
 * Requires APIFY_API_TOKEN in .env (see .env.example)
 *
 * Written to talk to the Apify REST API directly, so it needs no CLI install.
 * Deliberately tries WITHOUT a session cookie first: it avoids handing a
 * third-party platform authenticated access to the account, and the free
 * tier is enough for a single public profile.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const HANDLE = process.env.IG_HANDLE || 'canyonbilaspur';
const ACTOR = 'apify/instagram-profile-scraper';

// --- token ---
let token = process.env.APIFY_API_TOKEN;
if (!token) {
	try {
		const env = readFileSync(resolve(ROOT, '.env'), 'utf8');
		token = env.match(/^\s*APIFY_API_TOKEN\s*=\s*(.+)$/m)?.[1]?.trim();
	} catch {
		/* no .env yet */
	}
}
if (!token) {
	console.error('APIFY_API_TOKEN not found. Create .env with:');
	console.error('  APIFY_API_TOKEN=apify_api_xxxxxxxx');
	process.exit(1);
}

const input = {
	usernames: [HANDLE],
	resultsLimit: 50,
	// sessionCookie deliberately omitted — see header comment
};

console.log(`Fetching @${HANDLE} via ${ACTOR}...`);
const started = Date.now();

const url =
	`https://api.apify.com/v2/acts/${encodeURIComponent(ACTOR)}` +
	`/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&timeout=300&format=json`;

let res;
try {
	res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input),
	});
} catch (err) {
	console.error('Network failure talking to Apify:', err.message);
	process.exit(1);
}

if (!res.ok) {
	const body = await res.text();
	console.error(`Apify responded ${res.status} ${res.statusText}`);
	console.error(body.slice(0, 800));
	if (res.status === 401) console.error('\nToken looks invalid — check APIFY_API_TOKEN.');
	if (res.status === 402) console.error('\nOut of Apify credit. Free tier is $5/month.');
	process.exit(1);
}

const items = await res.json();
if (!Array.isArray(items) || items.length === 0) {
	console.error('Apify returned no dataset items.');
	process.exit(1);
}

const profile = items[0];
const outDir = resolve(ROOT, 'data');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'instagram.json'), JSON.stringify(profile, null, 2));

const posts = profile.latestPosts ?? profile.posts ?? [];
console.log(`\nDone in ${((Date.now() - started) / 1000).toFixed(1)}s`);
console.log(`Saved  -> data/instagram.json`);
console.log(`Handle -> @${profile.username ?? HANDLE}`);
console.log(`Posts  -> ${posts.length}`);
console.log(`Followers -> ${profile.followersCount ?? 'n/a'}`);
console.log(`Bio    -> ${profile.biography ?? 'n/a'}`);

const withCaption = posts.filter((p) => p.caption || p.title).length;
console.log(`Posts carrying text -> ${withCaption} / ${posts.length}`);