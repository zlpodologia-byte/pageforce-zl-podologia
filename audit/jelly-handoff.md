# Jelly Cards — Handoff Document

**Date:** 2026-04-19
**Status:** Localized mask working; one remaining issue (base image not loading) keeps the visual from reading as "liquid image deformation".
**Project:** Pageforce 2.0 — Next.js 15 + TS + Tailwind v4 at `C:\Users\Yuri\Desktop\Empresas Paperclip\Pageforce 2.0`.

---

## 1. Goal

Reproduce the "bolhas líquidas" / gelatin-feeling card hover effect the client described. Specifically: as the cursor approaches and enters a card in the work grid, **the portion of the card image nearest the cursor deforms like liquid** (wavy silhouette, localized bulge). The rest of the card stays rigid. Not a uniform blur, not a scale, not a subtle RGB split — a **localized liquid deformation** that follows the cursor.

---

## 2. Research summary (what the reference actually does)

Two research sub-agents produced:

- `audit/technique-research.md` — public technique catalogue.
- `audit/tooling-research.md` — tooling stack for 2026.

**Hard findings via grep on the reference's public bundle (`audit/interaction/hm-main.js`, 1.74 MB):**

- Zero `feDisplacementMap`, `feTurbulence`, `metaball`, `gooey`, `vertexShader`, `fragmentShader`, `blobCanvas` strings.
- Only WebGL contexts created are 1×1 capability probes.
- Libraries present: Paper.js (19 refs), PixiJS (2 refs), no GSAP / Lenis / Three.js.
- The single WebGL canvas is `.HeroModule .animationContainer .content .blobCanvas` — scoped to the hero, **not over the grid**.
- Grid card hover in CSS is `.entry:hover { opacity + translateY }` plus a `.hitarea` 165%-wide and +320px tall. No shader.

**Interpretation:** the current reference site achieves its premium feel via generous invisible hitareas + smooth CSS transitions + a decorative hero blob canvas. It does **not** deform cards per cursor with a shader in its current build. Older versions (pre-2020) used WebGL/Pixi per card; they simplified.

**Gap with client's description:** the client visibly wants per-card liquid deformation. This is a stronger effect than the current reference ships. The technique for achieving it cleanly is **SVG `feDisplacementMap` + `feTurbulence`** applied via a mask so only the area near the cursor shows the deformed version.

---

## 3. Implementation timeline in this project

### v0 — attempted per-card OGL/WebGL shader (M5, abandoned)

- Components: `components/thumbnail-webgl/` (removed).
- RGB split + noise displacement per card on hover.
- Problem: parameters too subtle; architecture was per-card shader which turned out not to match anything useful.
- **Deleted.** Code gone from repo. `ogl` dep removed.

### v1 — uniform SVG displacement filter (first jelly attempt)

- Components: `components/jelly/JellyProvider.tsx`, `components/jelly/jellyMath.ts`.
- Each case slug gets its own `<filter id="jelly-<slug>">` containing `feTurbulence` + `feDisplacementMap`.
- A rAF loop in `JellyProvider` reads cursor from the Zustand store, computes per-card proximity, and animates the filter's `scale` attribute up to 52 for the nearest card.
- **CaseCard applied `filter: url(#jelly-<slug>)` to the whole media container.**
- Problem reported by client: "a janela TODA se movimenta uniforme, não só a parte próxima".
- Technically correct; wrong UX — the deformation was everywhere the filter was applied, not localized to the cursor.

### v2 — localized via mask-image radial-gradient (current)

- **CaseCard restructured** (`components/case-card/CaseCard.tsx`):
  - Base layer: the thumbnail `<Image>` (and video for hover) renders UNFILTERED as before.
  - **New overlay layer:** a duplicate `<Image>` wrapped in a `<div>` with:
    - `filter: url(#jelly-<slug>)` — SVG filter applies displacement.
    - `opacity: var(--jelly-opacity, 0)` — fades in with proximity.
    - `mask-image: radial-gradient(circle 140px at var(--jelly-x, 50%) var(--jelly-y, 50%), black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)` — only the 140px circle around the cursor position shows the deformed overlay; outside that the base shows through.
- **JellyProvider rAF updated** to write `--jelly-x`, `--jelly-y`, `--jelly-opacity` CSS custom properties on each registered card element per frame, based on cursor position relative to that card.
- The outer card div keeps `ref={jellyRef}` for rect measurement and CSS-var target. The overlay inherits the vars via CSS.

**Verified via Playwright** (`tests/jelly-showcase.spec.ts`):

- Card located, cursor moved to three positions (upper-left, center, lower-right).
- CSS vars read at each position:
  - upper-left → `--jelly-x: 87.5px, --jelly-y: 280.1px, --jelly-opacity: 0.922`
  - center → `--jelly-x: 174.9px, --jelly-y: 455.1px, --jelly-opacity: 0.688`
  - lower-right → `--jelly-x: 262.4px, --jelly-y: 630.2px, --jelly-opacity: 0.182`
- Cursor position drives mask position; opacity follows the proximity falloff curve (`smoothstep(0, 1, 1 - dist/520)`).
- Screenshots saved to `test-results/jelly-upper-left.png`, `jelly-center.png`, `jelly-lower-right.png`. In the screenshots a dark blob follows the cursor. **However, the base thumbnail image is empty** (see §5) so the effect currently reads as a dark blob on empty cream, not as liquid deformation of the actual image content.

---

## 4. Key files to study

- `components/jelly/JellyProvider.tsx` — full provider, rAF loop, context, SVG `<defs>` with one `<filter>` per case slug. Pre-registers filters from `CASES` at init (React-19-safe — earlier attempt to register on-demand from ref callbacks failed to trigger re-renders).
- `components/jelly/jellyMath.ts` + `jellyMath.test.ts` — deterministic `hashSlugToSeed`, proximity + scale + baseFrequency math, smoothstep.
- `components/case-card/CaseCard.tsx` — base image + video + overlay-with-filter-and-mask.
- `app/layout.tsx` — mounts `<JellyProvider>` WRAPPING `<PageTransition>{children}` so the context reaches all cards. Early bug: it was mounted as a sibling, broke context.
- `lib/cases.ts` — 12 cases. Filters are pre-registered for all of them.
- `.codex-runs/m-jelly-cards-changelog.md` — Codex's notes from the v1 run.
- `audit/interaction-observations.md` — earlier audit of the reference site.
- `audit/technique-research.md` + `audit/tooling-research.md` — research briefs.
- `playwright.config.ts` + `tests/jelly-*.spec.ts` — real browser verification (not Chrome MCP — that's throttled since the tab is always hidden).

---

## 5. Known remaining issue — **base image not loading (the visible blocker)**

The `<Image>` tags use `item.cover` URLs pointing to `images.unsplash.com`. In this environment, `curl "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?..."` returns **HTTP 404**. Unsplash photo IDs used in `lib/cases.ts` appear to be stale or not publicly accessible.

Effect: base image is empty → on a hover, the jelly overlay renders the displaced version of the SAME empty image → what you see is an animated dark blob (the `<Image>` component's fallback / border rendering under displacement) instead of a deformed version of a real photo.

**This is not a bug in the jelly effect.** The SVG filter is working. The mask is working. The CSS vars are tracking. The ONLY reason the hover doesn't look like "liquid deformation of a photo" is that there's no photo.

**Fix options** for the next agent:

1. Replace Unsplash URLs in `lib/cases.ts` with working ones (verify 200 via curl before committing).
2. Use local placeholder images in `public/cases/<slug>.jpg`. Easiest + removes external dep.
3. Swap the `<Image>` to a plain `<div style={{background: accent}}>` with colored backgrounds so at least there's content to deform.

Recommended: option 2 with 12 small JPG/WebP files. Reuse any fair-use imagery or generate abstract gradients. Once images load, the jelly effect will visibly read as "a circular region of the image is distorted like jelly at the cursor."

---

## 6. Parameters currently in code

In `components/jelly/jellyMath.ts`:

- `JELLY_MAX_SCALE = 52` (max displacement in pixels)
- `JELLY_LERP_FACTOR = 0.16` (smoothness of scale animation)
- `JELLY_INFLUENCE_RADIUS = 520` (pixel distance at which proximity hits 0)
- `JELLY_DEFAULT_FREQUENCY_X = 0.015`, `JELLY_DEFAULT_FREQUENCY_Y = 0.020`
- `JELLY_PEAK_FREQUENCY_X = 0.035`, `JELLY_PEAK_FREQUENCY_Y = 0.035`
- `numOctaves = 2`

In `components/case-card/CaseCard.tsx` overlay style (post user-tuning on 2026-04-19):

- Mask shape: `ellipse 190px 170px` (slightly oval, horizontal)
- Mask stops: `black 0% → rgba(0,0,0,0.96) 38% → rgba(0,0,0,0.62) 66% → transparent 100%` (soft gradient with two intermediate stops for a gooier feather)
- Overlay `<Image>` has `scale-[1.035]` so the deformed copy is very slightly larger than the base — hides any sub-pixel edge seam between base and overlay as the filter pushes pixels outward.

**What the next agent can tune:**

- Increase mask radius to `180-220px` for a larger jelly footprint.
- Adjust mask stop pattern for softer or sharper edge.
- Decrease `JELLY_INFLUENCE_RADIUS` so opacity peaks ONLY when cursor is very close (right now it starts responding 520px away which is too generous if desired).
- Increase `JELLY_MAX_SCALE` to 80-100 for more dramatic wobble.
- Add per-card rotation or secondary noise layer if more organic variation is wanted.

---

## 7. How to verify (what works, what doesn't)

**Works:**
- `npx tsc --noEmit` — clean
- `npx next build` — passes (once you run it outside the Codex sandbox)
- `npx playwright test tests/jelly-showcase.spec.ts` — generates per-position screenshots to `test-results/`
- `npx next dev -p 3001` + open `localhost:3001/work` in a **focused** tab and hover cards

**Doesn't work:**
- Screenshots via the Chrome MCP browser integration — that tab runs with `visibilityState: hidden`, which makes Chrome throttle rAF to ~1fps, so CSS var updates can't be observed. Use Playwright instead; it runs headed Chromium without throttle.
- Base image rendering as a photo — Unsplash URLs return 404 (see §5).

---

## 8. Architecture summary for the next agent

```
layout.tsx
  └─ JellyProvider (pre-registers <filter> per case slug; rAF loop reads cursor, writes CSS vars)
       └─ PageTransition
            └─ main / children
                 └─ /work page
                      └─ CaseGrid
                           └─ CaseCard (per case)
                                ├─ outer div (ref=jellyRef, gets --jelly-x/-y/-opacity vars)
                                │    └─ aspect div
                                │         ├─ <Image> (base, undeformed, should be full photo)
                                │         ├─ <video> (hover crossfade, optional)
                                │         └─ overlay div (filter + mask-image using vars)
                                │              └─ <Image> (duplicate of base; this is what gets deformed and masked)
                                ├─ title + meta (not deformed)
                                └─ CategoryLinks (not deformed)
```

**Key props / CSS contract:**
- `JellyProvider` must wrap everything that renders a `CaseCard`.
- `useJellyCard(slug)` returns `{ ref, filterStyle }`. Attach `ref` to the tracked element; apply `filterStyle` on the overlay.
- The overlay must also carry `opacity: var(--jelly-opacity, 0)` and a `mask-image` radial-gradient that uses `var(--jelly-x, 50%) var(--jelly-y, 50%)` as center.
- `lib/cases.ts` is the source of truth for card slugs; filters are pre-generated from it.

---

## 9. What to do next (recommended order)

1. **Replace cover URLs** with local `public/cases/*.jpg` files. Verify `curl -I /cases/<slug>.jpg` returns 200.
2. Re-run Playwright showcase — confirm blobs now render as deformed photo regions instead of dark blobs on cream.
3. Capture a **video** via Playwright's `page.screencast` of a slow cursor sweep across 3 cards; review with the client.
4. Tune parameters based on review:
   - If effect too subtle: increase `JELLY_MAX_SCALE` and mask radius.
   - If effect too jittery: decrease `baseFrequency` range and increase `numOctaves`.
   - If influence radius feels wrong: tune `JELLY_INFLUENCE_RADIUS`.
5. Optionally add a multi-circle mask (two gradients composited) so it feels "gooier" / lumpy instead of circular.
6. Test on Firefox/Safari — `mask-image` syntax should work but worth validating.
7. A11y: confirm `prefers-reduced-motion: reduce` disables the overlay entirely (already branched in CaseCard `!reducedMotion` check, but visually re-test).

---

## 10. Constraints the next agent must respect

- Original code only. No copying from hellomonday.com or any other reference site. Describing behavior = OK; lifting code = not OK.
- TypeScript strict; no `any`.
- `prefers-reduced-motion: reduce` must kill the overlay cleanly.
- Don't re-introduce WebGL here — SVG filter is the chosen path.
- Don't delete `audit/` or `.codex-runs/` — they document the decision trail.
- `components/shell/**`, `components/hero/**`, `components/hero-blob/**`, `components/reveal/**`, `components/cursor/**`, `components/menu/**`, `components/page-transition/**`, `components/footer/**`, `components/contact-grid/**`, `components/deep-dive-splash/**` are out of scope for this problem.

End of handoff.
