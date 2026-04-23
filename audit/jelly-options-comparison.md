# Jelly Architecture Options — Comparison

**Date:** 2026-04-19
**Context:** Three external AI sources proposed different approaches to the "bolhas líquidas / gelatina" card hover effect. This document compares them against what's currently in the project, so future decisions are informed.

---

## What's shipped now

**`components/jelly/JellyProvider.tsx` + per-card `filter: url(#jelly-<slug>)` + `mask-image: radial-gradient(...)` on duplicate overlay.**

Approach family: **SVG `feTurbulence` + `feDisplacementMap`** with a localized visibility mask driven by cursor.

- Per-card filter rendered once at mount (pre-registered from `CASES`).
- rAF loop writes `--jelly-x`, `--jelly-y`, `--jelly-opacity` CSS vars to each card's outer element.
- Overlay consumes the vars via `mask-image: radial-gradient(ellipse ... at var(--jelly-x) var(--jelly-y), ...)`.
- Scale animates 0→52 via `lerpValue(currentScale, targetScale, 0.16)`.

Strengths: works with Next `<Image>` + SSR, zero new deps, respects reduced-motion, user has already tuned mask params.
Weakness: no spring physics, no mesh. Deformation is uniform noise displacement, not a deforming mesh.

---

## Option A — PixiJS `DisplacementFilter` (external AI proposal #1)

Use PixiJS's built-in `DisplacementFilter` driven by cursor position, with a generated noise texture and spring physics on the displacement scale.

- Per-card `PIXI.Application` with a displaced sprite.
- Spring: `spring_strength`, `damping`, `velocityX/Y`.
- "Diagonal reversa" applied by inverting cursor vector + adding a small cross-diagonal component.

Strengths: real spring physics, recognized library.
Weaknesses: +~80KB bundle (PixiJS), per-card Application is heavy (abandoned in our M5 for exactly this reason), Next `<Image>` pipeline replaced by a `canvas`, SSR lost for thumbnail.

Verdict: **skip** unless we need spectacular / dramatic jelly that justifies the bundle + complexity cost.

---

## Option B — Three.js + GLSL custom shader (external AI proposal #2)

Full fragment/vertex shader controlling per-pixel displacement, noise, activation falloff, and cursor direction reversal.

- More control than Option A.
- Can inject 3D noise for organic drift.

Strengths: maximum control and visual fidelity.
Weaknesses: Three.js adds ~150KB, shader dev specialty required, SSR lost, overkill for card hover.

Verdict: **skip** for this project. Appropriate only if jelly becomes a centerpiece effect across the whole site, not just hover.

---

## Option D — React Three Fiber + vertex shader + FBM proximity (external AI proposal #4)

Real GPU-side vertex displacement via a `<shaderMaterial>` on a `<Plane args={[w, h, 64, 64]}>`. 4096 vertices per plane. Proximity force in UV space + FBM noise + spring term added to `position.z`. "Diagonal reverse" injected as a `uDiagonalBias` uniform `vec2(-1, 1)`.

Strengths:
- True mesh deformation at GPU speeds (the hellomonday pre-2020 lineage).
- Proximity-based, not just hover.
- Organic feel via FBM noise + spring.
- Composable with Lenis / GSAP.

Weaknesses:
- +~300 KB gzip dependency cost (three + @react-three/fiber + @react-three/drei).
- Per-card `<Canvas>` mounts N WebGL contexts. Browser caps + memory cost real.
- Proposed code mixes `<shaderMaterial>` and `<meshBasicMaterial>` in the same mesh — a bug we'd have to resolve.
- SSR lost for the card media; Next `<Image>` optimization also lost.
- `useThree().pointer` gives scene-space pointer, not card-relative. Would need per-card pointer capture to get correct UVs — a non-trivial rewrite.

Verdict: **highest fidelity ceiling, highest cost**. Sensible if jelly becomes a studio-wide signature applied to hero, grid, AND individual elements. Overkill if jelly is only on the work grid.

---

## Option C — Canvas 2D grid of vertices + Hooke's law + constraint relaxation (external AI proposal #3)

12×9 grid of particles per card. Each particle has mass, velocity, rest position, and a spring restoring force. Relax neighbor constraints after each step so the mesh doesn't tear.

- "Diagonal reversa" implemented as a spatial gradient that modulates spring stiffness AND wave propagation direction — top-left is stiffer, bottom-right softer, so energy absorbed in one corner propagates to the opposite corner.
- Rendered in `<canvas>` 2D. No deps.

Strengths:
- Real physical realism (mesh + constraints feels like actual gelatin absorbing and returning energy).
- Tiny (~5KB of math).
- No new deps.
- The most accurate interpretation of "bolhas que passam por outras bolhas" if read as mesh wave propagation.

Weaknesses:
- Canvas 2D replaces the Next `<Image>` pipeline inside the card thumbnail (we'd load the image into an `HTMLImageElement` and draw it to canvas each frame). SSR lost for the thumbnail.
- Per-card `<canvas>` means N canvases in view. For a grid of 12+ cards we'd want IntersectionObserver pause.
- Mesh relaxation runs per frame per visible card — modest CPU cost.

Verdict: **best upgrade path** if the current SVG-filter approach ends up feeling too pixel-noise and not enough mesh-warp after final review. Adding it would be a 4th re-architecture (OGL → SVG filter → SVG + mask → Canvas 2D grid).

---

## Decision matrix

| Criterion | Current (SVG filter + mask) | C (Canvas 2D grid) | A (PixiJS) | B (Three.js) |
|---|---|---|---|---|
| Bundle delta | 0 KB | ~5 KB | +~80 KB | +~150 KB |
| New deps | none | none | pixi.js | three.js |
| SSR image | ✅ | ❌ | ❌ | ❌ |
| Spring physics | approximate (lerp on scale) | true (Hooke + damping + constraints) | true | true |
| Mesh deformation | no | yes | no (per-pixel displacement) | yes |
| Reduced-motion path | trivial | trivial | medium | medium |
| Rebuild cost from current | — | ~3-4 h | ~2 h (but revert M5 deletion) | ~6-8 h |
| Regression risk | — | medium (new architecture) | high | high |

## Current stance

Stay on the current SVG-filter + mask for now. The effect works, user tuned it, and M10 / M11 are in-flight on top of it. Don't re-architect mid-stream.

**If** after M10 / M11 wrap and the full site is visually reviewed the client still says "the jelly doesn't feel like gelatin absorbing and releasing energy," Option C (Canvas 2D grid) is the recommended next pivot. In that case a new milestone prompt should be drafted using the mesh architecture, and the SVG filter can stay as the reduced-motion fallback.

**If** option C is pursued, integration plan:

1. Keep `lib/cases.ts` + `components/case-card/CaseCard.tsx` layout shell.
2. Replace the overlay `<div>` + `<Image>` duplicate with a `<JellyCanvas>` client component that mounts a 2D canvas sized to the aspect box.
3. Inside `<JellyCanvas>`: load `item.cover` via `Image()` object, draw to canvas, run 12×9 grid simulation each frame, read the image pixel at the deformed UV for each cell and render.
4. Pause rAF per card via IntersectionObserver when card off-screen.
5. Reuse the existing `useJellyCard` hook's cursor tracking for uniformity.
6. Keep `prefers-reduced-motion` branch: freeze simulation, render plain image.

No action now. Revisit after M10 / M11 review.
