# JellyWindowGL — status & investigation log

**Date:** 2026-04-19
**Outcome:** Experimental. Not production-ready.

## What this component is

WebGL (OGL) implementation of the jelly window. Builds a rounded-rectangle
triangle fan (133 verts, 132 tris) and runs a custom vertex shader that
displaces only the perimeter vertices — using 3D Simplex noise for baseline
organic drift plus a quartic-falloff cursor-proximity bulge on top. This is
the architecture family described by the Hello Monday technical deep-dive
(OGL + GLSL, vertex-level deformation with noise + proximity).

The component itself is structurally complete:

- `buildRoundedRectFan` — custom geometry builder (matches the SVG perimeter
  point layout for parity)
- GLSL vertex shader with Ashima 3D Simplex noise
- GLSL fragment shader with subtle edge darkening
- Per-window WebGL context (one `Renderer` per instance)
- `prefers-reduced-motion` path
- Cursor tracking via window-level `pointermove`

## Why it isn't shipped

During verification two distinct runtime problems emerged that block trust in
the current architecture:

1. **Playwright Chromium (headless) kills contexts after ~2 frames.**
   The rAF ticks, `gl.getError()` returns `0`, `isContextLost()` returns
   `false` — then a `CONTEXT_LOST_WEBGL` warning fires for every canvas and
   the `webglcontextlost` event triggers. Reproduces with the simplest
   possible smoke test (just navigate + wait 2 s, no interaction). Confirmed
   not caused by `preserveDrawingBuffer`, `antialias`, or cleanup code.
   Suggests a Playwright-specific GPU resource policy.

2. **Real Chrome via MCP tab: rAF never fires.**
   Effect init, geometry build, program link, mesh mount all log success.
   The tick function never runs. Most likely cause: MCP tabs are
   backgrounded from the desktop window manager's perspective, and Chrome
   throttles rAF to 0 Hz on fully-hidden tabs. A foreground/visible tab
   would resolve this — but the component shouldn't rely on focused-tab
   semantics to work.

## Recommended next steps (in order of effort)

### Option A — shared fullscreen canvas (recommended)

This is what Hello Monday's production setup actually does per the
research doc. One `<canvas>` covers the viewport, positioned `fixed` with
`pointer-events: none`. A single WebGL context, a single rAF loop. The
JellyProvider-style registry maps each `data-jelly-surface` DOM element to
a mesh instance whose transform is updated each frame from
`getBoundingClientRect()`. Eliminates the per-window context cap problem,
the StrictMode double-mount cost, the Playwright context-eviction symptom,
and makes future additions (metaball bridging between cards, audio
reactivity) trivial because all meshes share one scene.

Estimated effort: ~4-6 h including a new Playwright probe.

### Option B — verify in a foreground browser tab first

Before pivoting, confirm the shader MATH is right by viewing
`/lab/jelly-gl` in a real, focused browser window (not MCP, not Playwright
headless). If the jelly renders and bulges correctly, the per-window
approach is viable for low-volume lab pages — just not for grids of 10+
cards. The grid still needs Option A.

### Option C — abandon WebGL, stay on SVG path-bulge (current `/lab/jelly`)

The SVG implementation with spring physics + neighbor smoothing already
ships. It does not need per-window canvases, works everywhere Next.js
hydrates, is trivially testable with Playwright via path `d` attribute
inspection, and is what powers the currently-verified lab. If the visual
delta between SVG and WebGL is smaller than the cost of Option A, stopping
here is defensible.

## Files involved

- `components/jelly-window-gl/JellyWindowGL.tsx` — the component
- `app/lab/jelly-gl/page.tsx` — the lab page (4 windows, reduced from 10
  while per-window context caps are a risk)
- `tests/jelly-gl-lab.spec.ts` — Playwright test (currently failing on the
  "contexts stay alive" assertion — matches the documented environment bug)
- `tests/jelly-gl-smoketest.spec.ts` — 2-second no-interaction smoke test
  that also reproduces the context-eviction symptom
- `audit/jelly-options-comparison.md` — architectural comparison (this is
  Option D in that doc)
