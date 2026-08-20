# BHS Seller Report — 79th Street Apartment #20BCH

Static, self-contained build of the Brown Harris Stevens seller report.
React + Vite + Tailwind v4. No backend, no database, no API calls — `npm run build`
emits plain HTML/CSS/JS that any static host can serve.

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm run preview  # serve the built dist/
```

## Deploying to Vercel

`vercel.json` already declares the Vite preset, `dist` as the output directory,
and an `X-Robots-Tag: noindex, nofollow` header — this is a client-facing document
and should not be indexed. `index.html` carries a matching `robots` meta tag.

**First-time setup:** import this repo at [vercel.com/new](https://vercel.com/new).
Vercel detects Vite and needs no configuration. After that every push to `main`
redeploys automatically, and each branch or PR gets its own preview URL.

Because the report is a client document, turn on **Settings → Deployment
Protection → Vercel Authentication** so only your Vercel team members can open
the URL. Without it, the deployment URL is reachable by anyone who has the link.

## Fonts

⚠️ **Radikal is a commercial typeface (Nootype) and is committed to this repo.**
Keep this repository **private**, and confirm the BHS webfont licence covers
self-hosting before making the deployment publicly reachable.

`public/fonts/*.woff2` are generated from locally-installed OTFs by
`../Create Updated Seller Report/scripts/build-fonts.mjs` (`npm run fonts` there).

Headings currently use **Playfair Display** as a stand-in for FreightBig Pro,
the BHS display serif, which was not available locally. Swap it in `src/index.css`
if you obtain the webfonts.

## Maps

The three maps in Location Insights are real geography, not illustrations:

| Map | Source | Projection |
|---|---|---|
| Global | Natural Earth 110m countries | Equal Earth |
| Domestic | US Census states 10m | Albers USA |
| New York State | US Census counties 10m (FIPS 36) | Mercator |

`src/generated/maps.ts` is **build-time output** — do not edit it by hand. It holds
flat SVG path strings, so `d3-geo`, `topojson`, and the atlas datasets never reach
the browser. Regenerate with `npm run maps` in
`../Create Updated Seller Report` after changing markers or simplification levels.

## Relationship to the Figma Make project

`../Create Updated Seller Report` is the editing environment (it carries the Figma
Make Vite plugins and the `scripts/` generators). This folder is the deployable
copy. After changing the app there, re-copy:

```
src/App.tsx  src/index.css  src/assets/  src/generated/maps.ts  public/fonts/
```

## Content note

The open-house table contains fictional placeholder registrants. Replace it with
real data before sharing this as an actual client deliverable.
