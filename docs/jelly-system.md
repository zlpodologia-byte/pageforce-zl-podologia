# Pageforce Jelly System — knowledge map

**Last updated:** 2026-04-19
**Status:** Core primitives shipped & validated. Refinements queued.
**Maintainers:** Single source of truth — update this file whenever a new
jelly application point is added.

This document is the central map of Pageforce's "jelly" visual language —
the organic, wet-cloth, bulge-toward-cursor family of interactions that
gives the site its signature feel. It covers:

1. What the language is and where it lives
2. The primitives we've built (code locations + tuning knobs)
3. Every application point in the codebase, current and planned
4. The external references that shaped the architecture

---

## 1. Language overview

The jelly language is a **family** of related organic interactions, not a
single effect. It rhymes with hellomonday.com but does not copy code. The
deep-research audit (`C:/Users/Yuri/Downloads/deep-research-report.md`,
absorbed 2026-04-19) clarifies that the reference uses two parallel stacks:

| Subsystem | Reference stack | Our stack | Visual role |
|---|---|---|---|
| **Perimeter bulge** (windows, cards, borders, side-edge curve) | PixiJS + `DisplacementFilter` or shader | SVG path with spring-physics perimeter points + multi-sine drift + neighbor smoothing + quadratic-Bezier render smoothing | "Wet cloth / gelatine" — the surface that bulges toward the cursor |
| **Gooey overlay / transition** (menu open, page transition) | Paper.js paths with `path.smooth()` | SVG `feGaussianBlur` + `feColorMatrix` "goo" filter over a morphing SVG shape | "Oil / mercury" — the liquid curtain that covers and reveals |

Both subsystems share a common DNA: **procedurally perturbed points fed to
smoothing primitives**. That's why Hello Monday's navigation is described
as "never the same twice" — each click reseeds the perturbation.

### What qualifies as "jelly"?

Any UI element that:

- has a **closed or open perimeter** that deforms organically
- combines **at-rest breathing** (always alive) with **cursor-responsive bulge**
- recovers with **spring physics**, not linear tweens
- is rendered as a **smooth curve**, not line segments

Static borders, box-shadows, and keyframe animations don't qualify.

---

## 2. Primitives (code inventory)

### 2.1 `JellyWindow` — the validated hero primitive

**Path:** `components/jelly-window/JellyWindow.tsx`
**Lab:** `app/lab/jelly/page.tsx` → `http://localhost:3001/lab/jelly`
**Test:** `tests/jelly-lab.spec.ts` (passes, all 4 edges deform on cursor proximity)

A rounded-rectangle window whose perimeter bulges toward the cursor. 132
perimeter points (22 straight + 10 arc per side), spring physics per point
(`SPRING_K=0.12`, `DAMPING=0.86`), multi-frequency sine drift, one-pass
neighbor smoothing (`NEIGHBOR_SMOOTHING=0.22`). Renders as L-segments in
SVG `<path>`.

**Tuning knobs (props):**

| Prop | Default | Sensible range | Visual effect |
|---|---:|---|---|
| `width` | 280 | 100–600 | logical container width (px) |
| `height` | 360 | 100–600 | logical container height (px) |
| `maxBulge` | 48 | 12–80 | peak outward displacement under cursor (px) |
| `influence` | 220 | 80–400 | cursor proximity radius (px); smaller = tighter bubble |
| `driftAmp` | 3.8 | 0–8 | baseline breathing amplitude (px); 0 = frozen, 6+ = visibly alive |

**When to use:** anywhere a standalone "window" needs to feel like a living
panel — reference lab, standalone modals, hero stage slots.

### 2.2 `JellyBorder` — the reusable light primitive

**Path:** `components/jelly-border/JellyBorder.tsx`

A stroke-only sibling of JellyWindow. Wraps children and draws an animated
SVG border around them. Supports `shape="rect"` (rounded rectangle, pill by
default) and `shape="circle"` (radial-symmetric perimeter for buttons).

Two key differences from JellyWindow:

1. **Stroke-only rendering** — no fill. The element behind remains visible.
   Use `fillColor` prop only when the contents need a matching background.
2. **Quadratic-Bezier midpoint smoothing** on the rendered path. This
   matches Paper.js `path.smooth()` style — reads as a single organic curve
   rather than a polygon. (JellyWindow keeps L-segments for now because its
   visual has already been user-validated; we can align later.)

**Tuning knobs (props):**

| Prop | Default | When to adjust |
|---|---|---|
| `shape` | `"rect"` | `"circle"` for round buttons |
| `radius` | 999 (pill) | 0–∞, ignored for circles |
| `maxBulge` | 14 | smaller than JellyWindow (14 vs 48) — borders are secondary chrome |
| `influence` | 120 | smaller than JellyWindow (120 vs 220) — tighter bubble |
| `driftAmp` | 1.6 | smaller than JellyWindow — visible but not distracting |
| `strokeColor` | `currentColor` | use `var(--color-ink)` etc.; supports theme switching |
| `strokeWidth` | 1 | 1–2 typical |
| `fillColor` | `"transparent"` | only if you need to fill the bulged silhouette |

**When to use:** buttons, pills, CTAs, nav items, circular icon buttons,
any bounded UI element that should feel alive but isn't the focus.

### 2.3 `RightEdgeCurve` — the living side edge

**Path:** `components/shell/RightEdgeCurve.tsx`

The persistent decorative curve on the right edge of the viewport. Its
inner (left-facing) quadratic-Bezier curve is sampled into 30 perimeter
points with inward normals. Each point gets spring-physics drift + cursor
bulge in viewBox space — converted from screen px via
`getBoundingClientRect`. Endpoints are pinned to structural corners so the
closed path never gaps.

**Why this matters:** the curve is visible on **every** page. Upgrading it
from a static SVG to a living edge is the single most pervasive
application of the language. Fill still interpolates with scroll progress
(coral → ink → ink) and inverts when the menu is open.

Tuning lives inline as module constants (`MAX_BULGE=18`, `INFLUENCE=260`,
`DRIFT_AMP=2.4`).

### 2.4 `JellyProvider` + `useJellyCard` — the card overlay system

**Path:** `components/jelly/JellyProvider.tsx`
**Applied in:** `components/case-card/CaseCard.tsx`

This is the OLDER jelly system that predates the spring-physics primitives.
Uses SVG `feTurbulence` + `feDisplacementMap` per card, with a radial
`mask-image` revealing the filter only in a circle near the cursor. Works,
is shipped, and is currently responsible for the "liquid ripple inside
card thumbnails" look.

**Relationship to the new primitives:** complementary, not redundant.
`JellyProvider` operates on **image pixels** (displaces raster content);
the spring-physics primitives operate on **silhouettes** (deform the
bounding path). The two can compose: a `CaseCard` can have an animated
`JellyBorder` wrapper (silhouette) *and* a `useJellyCard` overlay
(pixel warp) simultaneously.

### 2.5 `HeroBlob` — the multiply-blend blob field

**Path:** `components/hero-blob/HeroBlob.tsx`
**Applied in:** `components/hero/HeroModule.tsx`

Separate concept but part of the same visual family. A 2D canvas draws 4–6
soft circles that drift and attract toward the cursor; `mix-blend-mode:
multiply` composites them over the illustration below. This is the
*blob/bubble* reading that complements the *window/edge* reading of the
path-bulge primitives.

### 2.6 `GooeyMaskLayer` — the overlay liquid curtain

**Path:** `components/shell/GooeyMaskLayer.tsx`
**Applied in:** `components/shell/MenuOverlay.tsx`, `components/shell/PageTransition.tsx`

The "Paper.js-equivalent" overlay. Uses an SVG `feGaussianBlur` +
`feColorMatrix` (alpha thresholding) filter on a morphing blob — the
classic CSS "goo" filter trick. Each open/close reseeds via
`getMenuButtonSeed` / `getRightEdgeSeed` so the opening shape is never
identical. This matches the deep-research finding that Hello Monday's nav
is "fluid, organic, different every click".

### 2.7 `JellyWindowGL` — the experimental WebGL variant

**Path:** `components/jelly-window-gl/JellyWindowGL.tsx`
**Status:** Parked. See `components/jelly-window-gl/STATUS.md` for details.

Architected but not converged due to Playwright headless context-eviction
and MCP-hidden-tab rAF throttling. The correct next step is the
shared-canvas refactor documented in that STATUS file. Not blocking
production — SVG primitives cover every current use case.

---

## 3. Application map

### 3.1 Currently applied

| Location | Primitive | File | Purpose |
|---|---|---|---|
| Home page — "Diagnosticar a operação" CTA → `/diagnostic` | `JellyBorder` (rect, pill, 232×54) | `app/page.tsx` | Living CTA button — primary conversion path |
| Global — top-right menu button | `JellyBorder` (circle, 56×56) | `components/shell/MenuButton.tsx` | Circular chrome breathes + bulges to cursor |
| Global — right-edge decorative curve | Custom spring-physics perimeter on quadratic Bezier | `components/shell/RightEdgeCurve.tsx` | Living side edge across all pages |
| Global — menu open / close | `GooeyMaskLayer` | `components/shell/MenuOverlay.tsx` | Procedural goo curtain, reseeded per open |
| Global — page transition | `GooeyMaskLayer` | `components/shell/PageTransition.tsx` | Goo cover/reveal on route change |
| Home — hero illustration | `HeroBlob` | `components/hero/HeroModule.tsx` | Multiply-blend blob field |
| Work cards — thumbnail hover ripple | `useJellyCard` (SVG displacement) | `components/case-card/CaseCard.tsx` | Pixel-space ripple under cursor |
| Work cards — directional entry mask | `useJellyCard` overlay + `entrySide` state | `components/case-card/CaseCard.tsx` | First 300 ms of hover, mask origin reads from entry side (left/right/top/bottom) before settling into cursor tracking |
| Work cards — per-card abstract marker | 8 px filled circle following `--jelly-x/y` | `components/case-card/CaseCard.tsx` | Replaces a global cursor-face follower; reads cursor-local vars cascaded from JellyProvider |
| `/services` — 4 offer-tier cards | `JellyBorder` (rect, 300×340, maxBulge 14) | `components/services/OfferTiers.tsx` | Tier cards as breathing windows |
| `/services` — escada pills (×16) | `JellyBorder` (rect-pill, 320×50, maxBulge 8, driftAmp 0.8) | `components/services/LadderTracks.tsx` | Subtler-than-CTA pill animation for ladder steps |
| `/about` — 6 agent esteira cards | `JellyBorder` (rect, 320×300, maxBulge 14) | `components/about/AgentEsteira.tsx` | One window per agent (Hunter / Scanner / Strategist / Closer / Builder / Deployer) |
| Lab — `/lab/jelly` | `JellyWindow` | `app/lab/jelly/page.tsx` | Reference lab for the primitive |
| `/showcases` hub — category thumbnails | `JellyBorder` (rect radius 20) | `components/showcases/ShowcaseThumb.tsx` | Showcase Hub orbit constellation — 240×160 per thumb, stroke swaps teal on hover, independent drift pauses on activate |
| `/showcases` hub — primary preview CTA | `JellyBorder` (pill) | `components/showcases/ShowcasePreviewStage.tsx` | Burnt stroke (#c2410c), signals the single conversion path per category |
| `/showcases/[category]` — hero "Quero essa operação" CTA | `JellyBorder` (pill) | `components/showcase-model/ShowcaseModel.tsx` | Matches hub CTA — one family of primary CTAs across the showcase surface |
| `/showcases/[category]` — "O que o visitante vê" preview frame | `JellyBorder` (rect radius 20, JellyWindow-level tuning: maxBulge 48 / influence 220 / driftAmp 3.8) | `components/showcase-model/ShowcaseModel.tsx` | Frames the model homepage image — `JellyBorder` used because `JellyWindow` does not currently accept children (see §6 refinement queue) |
| `/showcases/[category]` — "A engrenagem aplicada" 3-column cards | `JellyBorder` (rect radius 16) | `components/showcase-model/ShowcaseModel.tsx` | Light treatment — cards belong to the page rhythm, not shout |

### 3.2 Queued / planned

These are candidate application points based on the reference study. Apply
opportunistically — don't jelly-ize everything.

| Location | Primitive | Rationale |
|---|---|---|
| Footer — newsletter submit | `JellyBorder` (light, pill) | Small accent of life at the page bottom |
| Contact form — submit button | `JellyBorder` (rect, stronger bulge) | Converts a transactional moment into a branded one |
| `/diagnostic` — form container | `JellyWindow`-as-decorative behind plain form | Form has variable height; decorative window underneath would need careful sizing |
| Work index — filter bar pills | `JellyBorder` (pill) | Already a known hover target; lightweight |
| Deep-dive splash CTA | `JellyBorder` or `JellyWindow` | Hero-adjacent; warrants a richer primitive |

### 3.3 Explicitly **not** jelly-ized

Don't apply the language to these — clarity wins over decoration:

- Body copy links (already has `.link-underline`)
- Primary navigation text items inside the open menu (letters, not boxes)
- Form input fields (jelly borders would fight focus states)
- Dense data tables or lists

---

## 4. Technical anatomy (what to know to build the next primitive)

### 4.1 The common algorithm

Every new spring-physics primitive follows the same four-step pattern:

1. **Build perimeter points.** Either sample a path (Bezier, polyline) or
   generate procedurally (rounded rect, circle, ellipse). Each point
   carries a home position `(hx, hy)` and a unit-length outward normal
   `(nx, ny)`.
2. **Per-frame integration.** For each point, compute target =
   `home + normal * (drift + cursor_bulge)`, then advance current position
   via spring: `v = (v + (target - current) * K) * DAMPING; current += v`.
3. **Neighbor smoothing pass.** One iteration of averaging each point's
   position toward the mean of its two neighbors (weight
   `NEIGHBOR_SMOOTHING`). This is the "cloth relaxation" that makes the
   wave propagate around the perimeter instead of each point bouncing
   independently. Pin endpoints for open curves.
4. **Render.** Build an SVG path `d` string from the animated points. Use
   L-segments for validated primitives (JellyWindow) or quadratic-midpoint
   smoothing (JellyBorder, RightEdgeCurve) for extra organicity.

### 4.2 The cursor-to-perimeter falloff

`proximity = 1 - clamp(distance / influence, 0, 1)`
`bulge = proximity² * maxBulge`

The **quartic** falloff (squaring) is deliberate. A linear falloff reads
as a diffuse global lift; the quartic concentrates the peak into a
bubble-sized zone that **trails the cursor**. This matches the "bolha que
passa" description the user gave.

### 4.3 The drift function

```ts
function perimeterDrift(perimT: number, time: number): number {
  const t = perimT * Math.PI * 2;
  return (
    Math.sin(t * 3   + time * 0.6) * 0.5 +
    Math.sin(t * 5.3 - time * 0.4) * 0.3 +
    Math.sin(t * 2.1 + time * 0.9) * 0.2
  );
}
```

Three incommensurable sine frequencies (2.1, 3, 5.3) with different phase
speeds produce a wave that circulates around the perimeter and never
repeats visibly. Returns roughly `[-1, 1]`, multiplied by `driftAmp` at
call site.

### 4.4 Shared tuning constants (spring system)

| Constant | Value | Role | Sensible range |
|---|---:|---|---|
| `SPRING_K` | 0.12 | stiffness | 0.05 (goopy) – 0.25 (snappy) |
| `DAMPING` | 0.86 | energy loss per frame | 0.80 (bouncy) – 0.95 (molasses) |
| `NEIGHBOR_SMOOTHING` | 0.22 | cloth coupling | 0.00 (independent) – 0.45 (smeared) |

These three together define the "material". The current values read as
"wet cloth / soft gelatin" — the user-validated point. Change them only
after a visual review.

---

## 5. External reference map

### 5.1 Deep research report (2026-04-19)

`C:/Users/Yuri/Downloads/deep-research-report.md` documents the Hello
Monday stack from public sources. Key confirmations:

- **PixiJS + DisplacementFilter** for card thumbnail hover (raster warp).
- **Paper.js** for gooey navigation / overlay / page transitions (vector
  morph). `path.smooth()` is the tell.
- Typescript SPA front-end; Symfony/Contentful/Twig back-end; Heroku +
  StackPath hosting.
- **No Three.js, no WebGPU, no WASM, no Web Audio** in the original
  system. Every third-party blog claiming otherwise is retrofitting.
- Effect is **direction-sensitive** on the hover — entry side matters.
- Nav procedurally reseeds every open, which is why it feels "never the
  same twice".

### 5.2 Our own audit artifacts

- `audit/interaction-observations.md` — what the reference DOM/CSS told
  us during direct inspection (grid is plain DOM, hero has a blob canvas,
  cards have invisible hitareas 132% wide).
- `audit/jelly-options-comparison.md` — the 4-option decision matrix
  (SVG filter / Canvas 2D grid / PixiJS / R3F vertex shader).
- `audit/jelly-handoff.md` — the original handoff doc that locked in the
  "no WebGL in grid cards" decision.
- `audit/technique-research.md`, `audit/tooling-research.md` — tier-1
  and tier-2 research notes.

### 5.3 Architectural tier placement

Per the deep research: our primitives sit firmly in **tier "média"**
(Canvas2D / SVG + CPU spring). This is the pragmatic middle ground — we
get ~70% of the visual fidelity at ~20% of the engineering cost of the
high-fidelity WebGL/GLSL ping-pong simulation.

**If/when we need tier "alta"**: rebuild the primitives on top of the
shared-canvas WebGL approach described in
`components/jelly-window-gl/STATUS.md`. The current JellyWindow/JellyBorder
APIs should map cleanly to a shader-backed implementation because they
already describe the effect in terms of perimeter points + normals +
cursor + drift — which is exactly the uniform set a shader wants.

---

## 6. Next refinement queue (prioritized)

Concrete improvements the deep research surfaced. Ship opportunistically.

### A. Entry-direction sensitivity on `CaseCard` hover (medium effort)

The reference's hover-on-thumbnail animates **differently** depending on
whether the cursor entered from left, right, top, or bottom. Our current
`CaseCard` just flips a boolean `isHovered`. The fix: on `pointerEnter`,
compute the angle of approach via `event.clientX/Y` versus the card's
`getBoundingClientRect`, snap to one of 4 quadrants, and parameterize the
hover animation direction. This is the single most visible gap between
ours and theirs.

### B. Unify render smoothing across primitives (low effort)

`JellyWindow` still uses L-segments; `JellyBorder` and `RightEdgeCurve`
use quadratic-midpoint smoothing. Once we validate Q-smoothing doesn't
regress the `/lab/jelly` visual that the user already signed off on,
propagate it to JellyWindow too for consistency.

### C. Jelly divider component (low effort)

A horizontal line that wobbles + bulges near cursor. Single-row use of the
perimeter algorithm (two rows of points: top and bottom, small gap).
Good for section dividers on long-form pages.

### D. Audio-reactive extension (large effort, optional)

**Not part of the reference.** Deep research explicitly says the original
does not use audio. If we want to differentiate, map
`AnalyserNode`-derived bass/mid/treble to `maxBulge`, `driftAmp`, and
`SPRING_K` respectively. Worth exploring only as a signature moment on a
case study, not site-wide.

### E. Shared-canvas WebGL rebuild (large effort)

The canonical path forward if we grow the jelly surface to 50+
simultaneous elements (a dense grid, a data visualization, etc.). See
`components/jelly-window-gl/STATUS.md`.

### JellyWindow children API

**Context:** `components/jelly-window/JellyWindow.tsx` currently renders only
its own SVG fill/stroke — it does not accept `children`. When the
Showcase Hub milestone needed to frame a raster image inside a
JellyWindow-class primitive, the solution was to escalate `JellyBorder`
to JellyWindow-level tuning (`maxBulge=48`, `influence=220`,
`driftAmp=3.8`) and pass the `<img>` as children. See
`components/showcase-model/ShowcaseModel.tsx`.

**Proposed extension:** teach `JellyWindow` an optional `children` prop
that renders inside the fill shape (clipped to the perimeter). This
would let consumers frame arbitrary content (image, video, mini-page)
inside the fuller-fidelity primitive without duplicating physics
parameters on `JellyBorder`.

**Non-goal:** do not rewrite `JellyWindow` to replace `JellyBorder`.
The two have distinct roles — JellyBorder is stroke-only and wraps
children; JellyWindow is a self-contained "scene". The proposal is to
let JellyWindow accept optional children, not to merge the primitives.

**Priority:** low — `JellyBorder` with raised tuning is a valid
alternative and the current Showcase implementation is production-ready.
Revisit only if a third consumer of the same framing pattern appears.

---

## 7. How to add a new jelly application point

1. Decide **which primitive** fits:
   - Big standalone container → `JellyWindow`
   - Button / pill / nav item → `JellyBorder`
   - Custom open curve → copy the `RightEdgeCurve` pattern
2. Import the primitive. Pass `width`/`height` explicitly — it needs to
   own its SVG padding box.
3. Tune down `maxBulge` and `driftAmp` if the primitive is visually
   secondary (rule of thumb: halve both from the defaults).
4. Match `strokeColor` to the surrounding text color for consistency.
5. Test with `prefers-reduced-motion: reduce` — the primitives all freeze
   gracefully; confirm your container still looks right when static.
6. **Add a row to §3.1** in this doc.

That's it. No new design tokens, no new CSS, no dependency install.

---

## 8. Reproducibility checklist

If you were dropped into this codebase cold and told "rebuild the jelly
system from scratch on a new Next.js project", follow this order:

1. Copy `components/jelly-window/JellyWindow.tsx` — get the lab working.
2. Ship `app/lab/jelly/page.tsx` + `tests/jelly-lab.spec.ts` — prove the
   primitive deforms in all 4 directions.
3. Copy `components/jelly-border/JellyBorder.tsx` — get the light
   primitive with Q-smoothing.
4. Apply `JellyBorder` to one CTA and one circular button. Eyeball.
5. Copy `components/shell/RightEdgeCurve.tsx` — the side-edge treatment.
6. Decide if `HeroBlob`, `GooeyMaskLayer`, and `JellyProvider` are needed
   for your scope — each is independent of the spring-physics primitives.
7. Re-read this doc and update §3.1 with the new application points.

All the physics is in ~150 lines per primitive. The heavy lifting is the
shared algorithm described in §4.1.
