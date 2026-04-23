# Interaction Observations — Reference Study

> Purpose: capture the technique-level facts I extracted from the reference site's
> public CSS (`/build/css/bundle-*.css`) and JS (`/build/js/main-*.js`) during
> a second observation pass. These drive the **interaction pivot** prompt
> (`.codex-prompts/m-interaction-pivot.md`). Only technique/parameter description —
> no code, assets, copy or marks are reused.

---

## 1. What I had wrong in the original audit

Original M5 spec assumed each case thumbnail had a per-card WebGL shader doing
displacement + RGB split. Reference DOES NOT do that. The "liquid / bubble" feeling
the user described lives elsewhere.

## 2. Canvas inventory (runtime DOM inspection)

Two canvases on the reference page at any time:

| Canvas | Size | Parent | Purpose |
|---|---|---|---|
| (unnamed) | viewport-wide × viewport-tall | `.HeroModule .animationContainer .content .blobCanvas` | **The blobs** |
| `#paper-view-0` | 0×0 until triggered | `.PageWipe` | Paper.js gooey page/menu transition mask |

The first canvas is **the only one**. No per-card canvases. Grid cards are plain DOM.

## 3. The "liquid blob" effect — how it's composed

From CSS (`.HeroModule .animationContainer .content`):

1. A `<video>` element plays a category-themed loop — set to `display: none` by
   default; shown when a category is active. **`mix-blend-mode: multiply`**.
2. A `.blobCanvas` sits on top — `position: absolute; inset: 0; mix-blend-mode: multiply`.
3. The canvas draws animated circular blobs that respond to cursor. Multiply blend
   with the video below creates the darkened "bubble" reading over the imagery.

That's it. No shader. Standard 2D canvas drawing with blend mode composition. Paper.js
is imported (19 symbol refs in bundle) — likely used to animate the blobs. PixiJS is
loaded too (2 refs) but appears to be used only by the cycling headline's particle-like
transitions, not the blob field.

**Key parameters (observable):**
- Blob count: appears to be 4–6 large circles, smooth edges
- Colors: derived from the active category theme (e.g. black/grey/teal mix)
- Cursor attraction: nearest blob eases toward cursor; others drift
- Ease/damping: visually ~0.08–0.15 per frame (standard lerp)
- Blend: `multiply` — essential for the darken-over-video look

## 4. Grid card hover — how it actually works

From CSS selectors on `.ParallaxGridComponent .entry`:

- **No WebGL.** The effect is pure CSS + DOM.
- Default state: `.imageContainer img` and `.imageContainer video` both `opacity: 0`,
  absolutely positioned inside a fixed-aspect container (e.g. `padding-top: 56.25%` for 16:9, `132%` for portrait).
- On `.entry:hover`: overall entry `opacity` transitions over `0.5s`.
- On `.entry:hover .videoContainer video`: `opacity: 1` and `transform: translate3d(0, -50%, 0)` over `0.3s` ease `cubic-bezier(.25, .46, .45, .94)`.
- `.entry` has a **sibling `.hitarea`** element that's
  `width: 165%; height: calc(100% + 320px); position: absolute; top: -160px; left: -32.65%`
  — an invisible trigger zone extending ~32% beyond the card width and 160px above and
  below. In dev the bg is `rgba(255,0,0,0.1)` (debug red).
- **Willow-columns parallax**: `.column { align-self: flex-start; will-change: transform; }`
  — each column is a separate transform. (Matches my earlier audit §4.2.)

**Why the site feels "reactive from distance":** the hitareas are huge relative to
the visible card. Cursor approaching the card's row triggers hover long before the
cursor is actually on the thumbnail.

## 5. The `.eye`

A 20px SVG placed with `position: absolute; pointer-events: none; opacity: 0;
will-change: transform;` inside `.ParallaxGridComponent`. It animates toward the
hovered card and fades in. This is the "small face" my earlier frame-extraction
screenshots caught. It's NOT a cursor-tracking overlay — it's a per-card marker that
appears inside the active card and animates.

## 6. What I got right (and keep)

- Palette — monochrome + coral frame.
- Typography — wedge serif + geometric sans.
- Right-edge curve with scroll-progress fill.
- Menu gooey overlay (Paper.js or SVG filter approximation).
- Page transition with same gooey family.
- Full-screen dark menu with large serif stacked items.

## 7. What I got wrong (and pivot)

- **Per-card WebGL displacement shader** (M5) — architectural miss. Kill it.
- **Cursor with graphic face following pointer** (M1) — near-miss. The reference has
  a per-card `.eye`, not a continuous face-cursor. Simplify ours to a small dot +
  context graphic that appears only over interactive targets, with fast lerp.
- **No hitarea expansion on cards** (M4) — missing. Add the 165%-wide / +320px tall
  invisible hitareas.
- **No `HeroBlob` layer** — missing. The whole liquid feel lives here.

## 8. Minimal interaction pivot — what to build

One focused thread:

1. **Delete** `components/thumbnail-webgl/*`. Revert `CaseCard.tsx` to CSS-only
   hover (keep the Image + video). Keep the local `isHovered` state for the video
   crossfade.
2. **Add a `.hitarea`** element inside `CaseCard` — absolute, invisible, extended
   bounds per spec above. Pointer events go through it to the card link.
3. **Refactor `Cursor.tsx`** — remove the face follower that tracks pointer always.
   Replace with a small dot + a per-target eye-style graphic that animates in
   inside the hovered card (like reference), OR a single minimal cursor dot overall.
   Simpler is better.
4. **New `components/hero-blob/HeroBlob.tsx`** — a layered block that hosts:
   - Background layer: either the existing `<IllustrationTwoFigures />` OR a video
     placeholder (use one of our Unsplash MP4s or a simple looping SVG). Apply
     `mix-blend-mode: multiply`.
   - Blob layer: a `<canvas>` drawing 4–6 soft circles that drift + attract toward
     cursor. 2D canvas API, no WebGL, no Paper.js. `mix-blend-mode: multiply`.
   - Frame loop: rAF, paused off-screen via IntersectionObserver.
   - Cursor tracked via `lib/store.ts` (already has `pointer`).
5. **Integrate `HeroBlob` into `HeroModule`** — replace or overlay the current
   illustration. Keep the cycling H1, kicker, and pagination dots.
6. **Respect `prefers-reduced-motion`**: blobs freeze in place, no attraction; card
   hover effects use instant opacity changes; hitarea stays.

## 9. Ferramentas research decision

- **SingleFile + Wakaru**: skipped. Public CSS + string grep on the minified JS
  was enough to extract the architecture. Saved install time and kept the IP line
  clean — I read PARAMETERS and CLASS NAMES, not code.
- **cv2 denser frame extraction**: not needed — CSS told me more than frames could.

## 10. Acceptance criteria for the pivot

- Home hero shows the blob field with visible multiply blend against whatever is
  below it. Cursor movement clearly deflects the nearest blob.
- Card hover effects feel more responsive than before because hitarea catches
  cursor earlier.
- No WebGL shader running in the grid (verify via `document.querySelectorAll('canvas')`
  returning only the hero's blob canvas + whatever menu/transition canvases).
- Bundle size reduces (OGL can likely be removed as a dep since no shader needs it).
- `npx next build` passes.
