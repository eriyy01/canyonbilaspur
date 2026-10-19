#!/usr/bin/env node
/**
 * Re-scrapes @canyonbilaspur with Apify and refreshes data/instagram.json.
 *
 * Uses the run-sync endpoint: the actor runs once and the dataset items come
 * back as the HTTP response body, so there is nothing to poll. The modern
 * `apify/instagram-scraper` with resultsType "posts" returns a flat array of
 * post objects — the same shape the profile object's `latestPosts` had — so
 * the output is written as an array and download-media.mjs accepts either.
 *
 * Reads APIFY_API_TOKEN from .env. Usage: node scripts/scrape-profile.mjs [limit]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT = resolve(ROOT, 'data/instagram.json');
const PROFILE = 'https://www.instagram.com/canyonbilaspur/';

const env = existsSync(resolve(ROOT, '.env'))
	? Object.fromEntries(
			readFileSync(resolve(ROOT, '.env'), 'utf8')
				.split('\n')
				.filter((l) => l.includes('='))
				.map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
		)
	: {};
const token = process.env.APIFY_API_TOKEN ?? env.APIFY_API_TOKEN;
if (!token) {
	console.error('APIFY_API_TOKEN is missing — put it in .env');
	process.exit(1);
}

const limit = Number(process.argv[2] ?? 32);
const input = {
	directUrls: [PROFILE],
	resultsType: 'posts',
	resultsLimit: limit,
};

const endpoint = new URL(
	'https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items'
);
endpoint.searchParams.set('token', token);
endpoint.searchParams.set('timeout', '240');

console.log(`Scraping ${PROFILE} (latest ${limit} posts)…`);
const res = await fetch(endpoint, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(input),
});

if (!res.ok) {
	const text = await res.text();
	console.error(`Apify returned HTTP ${res.status}:\n${text}`);
	process.exit(res.status === 402 ? 2 : 1);
}

const items = await res.json();
const posts = Array.isArray(items)
	? items.filter((item) => item.type !== 'Story')
	: items;

// Newest first is how the scraper returns them; write them that way as well.
posts.sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? ''));

writeFileSync(OUT, `${JSON.stringify(posts, null, 2)}\n`, 'utf8');

const newest = posts[0]?.timestamp ?? 'n/a';
const oldest = posts.at(-1)?.timestamp ?? 'n/a';
console.log(`Saved ${posts.length} posts to data/instagram.json (${oldest} → ${newest}).`);
console.log(
	'Post types:',
	posts.map((p) => p.type[0]).join(' ')
);
