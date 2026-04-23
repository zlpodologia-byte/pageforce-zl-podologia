# "Bolhas líquidas" — Technique Research Brief

Scope: how production sites make thumbnail cards look gelatinous / warp toward the cursor. 5 techniques with concrete references, then a call on what hellomonday.com is actually doing on its grid cards.

---

## 0. What hellomonday's bundle actually contains

Direct string search over captured `audit/interaction/hm-bundle.css` + `hm-main.js`:

| Needle | Occurrences | Note |
|---|---|---|
| `feDisplacementMap` | 0 | no SVG displacement filter anywhere |
| `feTurbulence` | 0 | no Perlin-noise SVG filter |
| `metaball` / `gooey` | 0 | no metaball/gooey keyword |
| `vertexShader` / `fragmentShader` | 0 | no raw GLSL strings in the bundle |
| `getContext("webgl"` | 2 | both on 1×1 probe canvases (capability test) |
| `PIXI` | 2 | `__PIXI_APP_INIT__` / `__PIXI_RENDERER_INIT__` hooks only — used by cycling headline particles, not cards |
| `Paper` | 6 | `PaperScope`, page-wipe mask — not cards |

The only real drawing canvas is the hero's `.blobCanvas` (2D, `mix-blend-mode: multiply`). Cards are plain DOM: `.entry:hover { opacity + translateY }` plus an oversized invisible `.hitarea` (`width: 165%; height: calc(100% + 320px)`) that triggers hover well before the cursor touches the thumbnail (`audit/interaction-observations.md` §4).

Takeaway: on the *current* hellomonday, there is **no shader / filter / canvas on the cards**. The "liquid" the client sees is either the hero blob field bleeding perceptually into the grid area or the early-trigger hitarea combined with a `cubic-bezier(.25,.46,.45,.94)` crossfade making the card feel soft. Pick one technique below deliberately — don't reverse-engineer something that isn't there.

---

## 1. Single fullscreen WebGL canvas + DOM-mirrored planes (Akella pattern)

**How.** One fixed `<canvas>` covers the viewport. For every grid `<img>`, JS creates a Three.js `PlaneBufferGeometry`, textures it with that image, positions it in world space to line up with the DOM rect, and hides the original `<img>`. Fragment+vertex shader samples texture with offset depending on cursor distance + mouse velocity. Lenis drives scroll so WebGL + HTML layout scroll on the same frame.

Codrops 2020 (Akella), [Interactive WebGL Hover Effects](https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/): "*hide original image […] add 3D object to your scene, according to its HTML brother dimensions.*" Shader "*samples the texture 3 times, each time with a different offset, depending on mouse speed*" (chromatic-aberration warp). Scroll-sync rationale, Codrops 2024 [On-Scroll Revealing WebGL Images](https://tympanus.net/codrops/2024/02/07/on-scroll-revealing-webgl-image-explorations/): "*the only way to perfectly sync WebGL objects […] with DOM elements is by animating scrolling on the main thread.*"

**Visible.** Pixels inside bulge/stretch/drag toward cursor; silhouette stays rigid. Often paired with subtle RGB split. Velocity-aware: flick → strong drag, hover still → small dome.

**Deps.** Three.js (or OGL ~8 KB) + Lenis + optional gsap. **Complexity.** 3–5 days (sync layer, resize, fallbacks, reduced-motion, SSR gating).

**References.** [akella/webgl-mouseover-effects](https://github.com/akella/webgl-mouseover-effects) (Three.js tutorial, GLSL 9.8% of repo); [14islands/r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig) (the r3f rig we'd actually use in Next.js); [Liquid Distortion Effect by Ksenia K](https://codepen.io/ksenia-k/pen/jENEMjN).

---

## 2. curtains.js / OGL — per-image textured plane, vertex-displaced

**How.** Library walks every `<img data-plane>`, converts each into a WebGL plane, auto-syncs on scroll/resize. Per-plane vertex shader reads `uMouse` and offsets `position.xy` by e.g. `cos(length(uv - uMouse) * k)` → real vertex warp at the plane. Planes share one GL context.

**Visible.** Cursor inside → pixels near cursor bulge, far away sag. Cards read as membranes. Silhouette can deform if plane vertices animate past the rect.

**Deps.** [curtains.js ~30 KB](https://www.curtainsjs.com/) or [OGL ~8 KB](https://github.com/oframe/ogl). **Complexity.** 2–3 days (sync is free; hard part is shared rAF + IntersectionObserver).

**References.** [curtains.js multiple planes hover ripple](https://codepen.io/martinlaxenaire/pen/jeZyZM) — "*distortion calculated using cosine functions based on distance from the mouse, applying it to vertex positions in real-time*"; [Plane class docs](https://www.curtainsjs.com/plane-class.html); Codrops [WebGL Video Transitions with Curtains.js](https://tympanus.net/codrops/2020/10/07/webgl-video-transitions-with-curtains-js/).

---

## 3. SVG `feTurbulence` + `feDisplacementMap` filter on a static element

**How.** Inline `<svg><filter id="warp"><feTurbulence type="fractalNoise" .../><feDisplacementMap in="SourceGraphic" scale="0"/></filter></svg>` declared once; cards get `filter: url(#warp)`. On hover/proximity, JS animates the `scale` attr `0 → ~40 → 0` (GSAP `attr`) and optionally `baseFrequency`/`seed`. Browser re-runs filter each frame → Perlin-driven warp.

**Visible.** The *silhouette itself* ripples — edges turn gelatinous, content shimmers. Closest to "bolhas líquidas" because the shape deforms, not just texels.

**Deps.** GSAP recommended (CSS can't interpolate these attrs). GPU in Chromium/Safari, CPU in Firefox — measure on 12 cards. **Complexity.** 1–2 days. Risk: Firefox perf and filter-forced stacking contexts breaking `position: sticky`.

**References.** [jonathan's GSAP feDisplacementMap pen](https://codepen.io/jonathan/pen/bavRMr); Codrops [Crosshair Cursor with Distortion Hover](https://tympanus.net/codrops/2021/05/26/how-to-code-a-crosshair-mouse-cursor-with-distortion-hover-effect/); sister technique `feGaussianBlur + feColorMatrix` from Codrops [Creative Gooey Effects](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/) — "*`feColorMatrix` boosts alpha channel contrast […] creating the blob effect by intensifying transparency differences*".

---

## 4. Canvas 2D metaball field + per-card masking (the hellomonday hero trick, scaled)

**How.** Single 2D canvas over grid with `mix-blend-mode: multiply`. Canvas draws 4–6 soft radial gradients ("blobs") lerping toward cursor. Blend-mode compositing makes the cards *read* as bulging; no geometry changes. Exactly what hellomonday's `.HeroModule .blobCanvas` does (ease ~0.08–0.15/frame, no WebGL — see `audit/interaction-observations.md` §3).

**Visible.** Gelatin pools follow the cursor; cards underneath feel "touched". Edges stay sharp; softness is painted over.

**Deps.** None (~150 LOC vanilla canvas); optional [Paper.js](http://paperjs.org/) for contour unions. **Complexity.** 1 day visual + 1 day perf/a11y.

**References.** [SVG Mouse Gooey pen](https://codepen.io/agrimsrud/pen/ebBNZP) (dots follow mouse, merged by gooey filter); internal `audit/interaction-observations.md` §3.

---

## 5. CSS/JS "jelly" spring — no shader, just physics-driven transforms

**How.** Spring-animate `scale`, `rotateX/Y`, `skew`, optionally `matrix3d(...)` recomputed per-frame from cursor offset. Squash-and-stretch: card over-/under-scales on opposing axes, then settles. Point `transform-origin` at the cursor for "pulled toward" feel. Josh Comeau, [Squash and Stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/): "*springs work particularly well for squash/stretch effects, making the element feel elastic and rubbery.*"

**Visible.** Whole card wobbles/shears toward cursor; internal pixels don't warp. Reads "jelly", not "liquid".

**Deps.** framer-motion/`motion` or gsap. **Complexity.** 0.5–1 day. Safe / cheap tier.

**References.** [Aceternity Hover Effect cards](https://www.aceternity.com/components/hover-effect); [Motion spring docs](https://motion.dev/docs/react-animation); [Framer 3D Hover Override](https://framer.university/resources/3d-hover-override).

---

## 6. Hypothesis: one fullscreen WebGL canvas masquerading as per-card meshes?

**No.** (1) Bundle grep: zero `vertexShader`/`fragmentShader`/GLSL source strings; WebGL contexts only on 1×1 probe canvases. (2) The only scene canvas, `.blobCanvas`, lives inside `.HeroModule .animationContainer` (`inset: 0` on that container only) — it does not extend over the grid. (3) `.entry:hover` = `video.opacity 0→1` + `translate3d`; that is the entire card animation. (4) The "reactive from a distance" feel comes from the 165%-wide / +320 px-tall hitarea, not geometry. The [2020 GSAP forum reply](https://gsap.com/community/forums/topic/25159-hover-effect-like-hello-monday/) ("*that effect is created with WebGL […] I think […] with the help of Pixi.js*") referenced an older version; the current site has walked that back to CSS + one 2D hero canvas.

## 7. Recommendation for Pageforce 2.0

- **Best match to "bolhas líquidas", moderate cost:** #3 SVG `feTurbulence` + `feDisplacementMap`, animated `scale` on hover — the only option that deforms the card *silhouette* like gelatin. 1–2 days, no WebGL.
- **Showstopper tier:** #1 single-fullscreen Three.js with DOM-mirrored planes + chromatic warp, 3–5 days, highest "wow".
- **Accessibility fallback:** #5 spring-transform, always on; #1/#3 opt-in behind `prefers-reduced-motion` + a perf sniff.

Avoid re-using #4 on the cards — the client already saw it on the hero and called it "too subtle". Avoid per-card WebGL without DOM↔GL sync — that was our first failed attempt.
