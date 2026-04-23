# M5 Shader Reference — Thumbnail hover displacement

> Reference spec for Codex when implementing M5. Target parameters match
> `docs/reference-audit.md` §2.4 motion specs:
> - Hover in: 180-300ms ease-out
> - Hover out: 250-400ms ease-out
> - Image scale: 1.03-1.06
> - Channel drift: 5-12px displacement
> - Fallback: plain `<img>/<video>` on WebGL unavailable

## Intent

On pointer enter, the thumbnail texture is displaced with a low-amplitude organic noise
and a mild RGB channel separation. The effect must feel like a liquid-glitch overlay — not
a large ripple, not a cheap VHS split. The shader is subtle; if a user doesn't notice it
on first glance, the tuning is correct.

## GLSL pseudocode

```glsl
// fragment — runs on a full-screen triangle inside each thumbnail wrapper
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2  uRes;         // canvas size
uniform vec2  uImgRes;      // texture size
uniform vec2  uMouse;       // 0..1 in UV
uniform float uHover;       // 0..1 animated
uniform float uTime;        // seconds

// cover-fit
vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rR = res.x / res.y;
  float iR = img.x / img.y;
  vec2 s = vec2(1.0);
  if (rR < iR) s.x = rR / iR; else s.y = iR / rR;
  return (uv - 0.5) * s + 0.5;
}

// value noise 2D
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.,0.));
  float c = hash(i + vec2(0.,1.));
  float d = hash(i + vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}

void main() {
  vec2 uv = coverUV(vUv, uRes, uImgRes);

  // Subtle scale on hover: 1.0 -> 1.05 at hover=1
  vec2 scaled = (uv - 0.5) * (1.0 - 0.05 * uHover) + 0.5;

  // Radial falloff around pointer — effect concentrates where the user is
  float d = distance(vUv, uMouse);
  float falloff = smoothstep(0.55, 0.0, d);

  // Noise-driven displacement
  float n = vnoise(scaled * 5.0 + uTime * 0.12);
  float amt = 0.025 * uHover * falloff + 0.006 * uHover;    // 5-12px at 512px viewport
  vec2 disp = (scaled - 0.5) * amt + vec2(n - 0.5) * amt * 0.75;

  // Channel separation (RGB split)
  float split = 0.010 * uHover * falloff;                    // ~5-10px
  float r = texture2D(uTex, scaled + disp + vec2(split, 0.0)).r;
  float g = texture2D(uTex, scaled + disp).g;
  float b = texture2D(uTex, scaled + disp - vec2(split, 0.0)).b;
  float a = texture2D(uTex, scaled + disp).a;

  vec3 col = vec3(r, g, b);

  // Mild contrast lift on hover
  col = mix(col, col * 1.06, uHover * 0.4);

  gl_FragColor = vec4(col, a);
}
```

## Tweening strategy

```ts
// in Cursor/CaseCard hover handler
const state = { hover: 0, target: 0, mx: 0.5, my: 0.5, tmx: 0.5, tmy: 0.5 };
function tick(t: number) {
  state.hover += (state.target - state.hover) * 0.09;   // ~300ms settle
  state.mx += (state.tmx - state.mx) * 0.12;
  state.my += (state.tmy - state.my) * 0.12;
  program.uniforms.uHover.value = state.hover;
  program.uniforms.uMouse.value = [state.mx, state.my];
  program.uniforms.uTime.value = (t - start) * 0.001;
  renderer.render({ scene: mesh });
}
```

## Perf notes

- Prefer one shared WebGL context + DOM→WebGL plane sync (Awwwards pattern) for >6 simultaneously-
  visible tiles. Simpler per-card canvas is fine for ≤6 visible but leaks with many tiles.
- Pause on `IntersectionObserver` off-screen; resume on enter.
- Use `Texture({ generateMipmaps: false })` in OGL; don't pay mipmap cost on static tiles.
- Device pixel ratio capped at 2.

## Accessibility

- `prefers-reduced-motion: reduce` → `uHover` stays at 0, no displacement; plain texture render.
- WebGL unavailable → skip canvas entirely, show fallback `<img>`/`<video>` via default hover scale.
