// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
	integrations: [
		compress({
			CSS: true,
			HTML: true,
			JavaScript: true,
			Image: false,
			SVG: false,
		}),
	],

	/*
		The stylesheet is inlined rather than linked.

		astro-critters was doing this before and doing it badly: it inlined 40.2 KB
		of the 46.4 KB stylesheet into <head> *and* left a second, render-blocking
		<link rel="stylesheet"> pointing at the same file, so the async trick was
		defeated and 86.7 KB of CSS shipped for a 46.4 KB source. Critters pays for
		itself on a site with several pages, where a shared sheet can be cached
		across navigations. This is one page, so there is no second navigation to
		help: `always` inlines the whole thing and there is no request left to block.
	*/
	build: {
		inlineStylesheets: 'always',
	},

	image: {
		service: {
			/*
				Astro 7 types `entrypoint` as required and defaults it to sharp at
				runtime, so omitting it worked and failed `astro check`. Stated
				explicitly, which is also what makes the next line mean something:
				these are sharp's own options.
			*/
			entrypoint: 'astro/assets/services/sharp',
			config: {
				/*
					The photography was coming out soft, and this is why.

					Sharp's own default for AVIF is quality 50 — the bottom of the
					range, chosen because AVIF looks acceptable at 50 in a thumbnail
					and nobody benchmarked it at 1080. Astro passes no quality of its
					own, so every <Image format="avif"> on the site inherited that
					number. Measured as variance of Laplacian against the source
					JPEG, the hero plate kept 135 of 170 units of detail: real
					resampling softness across the whole photograph, not an artefact
					of the hero's blurred wash layer.

					70 is the knee. It recovers 151 of 170 — within 11% of the
					source JPEG, and level with WebP q72 — at 45KB a plate against
					24KB, so the cost is about 7KB per photograph in exchange for
					photographs that are no longer soft. effort 6 is what buys the
					detail at that quality; the default 4 reaches only 146.

					This is set globally rather than per-image because the softness
					was global. The wash layer is blurred in CSS on purpose and
					wants none of this, but it is the same encode either way.

					Sharp emits AVIF at 8-bit by default. If banding is ever reported
					in the shadow side of a dark plate, `bitdepth: 10` is the lever,
					not `quality`.
				*/
				avif: {
					quality: 70,
					effort: 6,
				},
			},
		},
	},

	fonts: [
		{
			/*
				Fraunces, from disk, and this is not a preference.

				Via fontProviders.fontsource() this family resolved to
				`fraunces:vf@latest/latin-full-normal.woff2` — 118.2 KB — and that
				file was preloaded on the critical path of every page view. The
				cause is in unifont's axis picker: a variable font whose axes
				include anything outside {wght, ital, slnt, wdth, opsz} is served
				as the "full" file. Fraunces has two more — SOFT and WONK — so
				every download carried 801 weight units × 1351 optical sizes ×
				1001 softness values × 2 wonk values. It is hard-coded, so no
				config knob avoids it; naming the file does.

				`latin-wght-normal.woff2` is 36.6 KB for the same weight axis.
				Minus 81.6 KB on the critical path, with the weight range intact so
				a future `font-semibold` on a display element keeps working. (The
				static `latin-400` pair would be 39.8 KB but breaks silently the
				first time someone adds a second weight.)

				The italic variant is declared because the quotation blurbs across the page ask for it. With `styles: ['normal']` and no italic face on disk,
				the browser was synthesising an oblique by shearing the upright
				outlines, which is visibly worse than a real italic on a
				high-contrast old-style serif with asymmetric ball terminals.

				Astro downloads, preloads, and generates @font-face + a
				metric-matched fallback automatically. Don't hand-roll
				@fontsource CSS.
			*/
			provider: fontProviders.local(),
			name: 'Fraunces',
			cssVariable: '--font-canyon-display',
			weights: ['100 900'],
			styles: ['normal', 'italic'],
			fallbacks: ['serif'],
			options: {
				variants: [
					{
						weight: '100 900',
						style: 'normal',
						src: ['./src/assets/fonts/fraunces-latin-wght-normal.woff2'],
					},
					{
						weight: '100 900',
						style: 'italic',
						src: ['./src/assets/fonts/fraunces-latin-wght-italic.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Plus Jakarta Sans',
			cssVariable: '--font-canyon-body',
			styles: ['normal'],
			// Variable font: the full weight range in one file
			weights: ['200 800'],
			fallbacks: ['sans-serif'],
		},
		{
			/*
				Signature night name — Cormorant Garamond italic, gold.
				Soulful high-contrast serif for "Sufi Night" only. Distinct
				from the Fraunces display face, still readable and clean.
				Below the fold, so no preload (see Layout.astro).
			*/
			provider: fontProviders.fontsource(),
			name: 'Cormorant Garamond',
			cssVariable: '--font-canyon-sufi',
			// One weight, italic only: the Sufi Night heading sets
			// font-medium italic and nothing else uses this face.
			// 400/600 and the upright file were dead downloads.
			weights: ['500'],
			styles: ['italic'],
			fallbacks: ['serif'],
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},
});