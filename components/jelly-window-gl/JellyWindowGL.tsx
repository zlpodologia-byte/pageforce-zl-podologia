"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Geometry, Mesh, Program, Renderer, Transform } from "ogl";

interface JellyWindowGLProps {
  id: string;
  label?: string;
  width?: number;
  height?: number;
  /** Max bulge strength in px (cursor-driven outward displacement). */
  maxBulge?: number;
  /** Distance (px) at which the cursor starts affecting perimeter vertices. */
  influence?: number;
  /** Baseline organic drift amplitude (px). 0 = frozen, 6+ = clearly alive. */
  driftAmp?: number;
  /** Fill color of the window surface (hex). */
  fillColor?: string;
}

const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 360;
const CORNER_RADIUS = 20;
const N_STRAIGHT = 22;
const N_ARC = 10;
const DRIFT_AMPLITUDE = 4.0;

function hexToRGB(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const n = parseInt(m, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * Build a rounded-rect triangle fan suitable for GPU-side perimeter deformation.
 *
 * Vertex 0 is the centroid of the rectangle (edgeness=0, never displaces).
 * Vertices 1..N are perimeter points carrying their outward normal and a
 * parametric position along the perimeter (perimT ∈ [0,1)) so the vertex
 * shader can drive a continuous noise wave around the silhouette.
 *
 * Triangles: fan from centroid to each consecutive pair of perimeter vertices.
 * The interior is triangulated but its vertices share the centroid — so any
 * deformation of the perimeter stretches the fan rather than moving interior
 * pixels. Only the silhouette wobbles; the surface stays visually flat.
 */
function buildRoundedRectFan(
  w: number,
  h: number,
  r: number,
  nStraight: number,
  nArc: number,
) {
  type P = { x: number; y: number; nx: number; ny: number; t: number };
  const perimeter: P[] = [];
  const push = (x: number, y: number, nx: number, ny: number) => {
    perimeter.push({ x, y, nx, ny, t: 0 });
  };

  // Convention: origin at centroid. +Y is up (WebGL), +X is right.
  // Top edge at y = +h/2, bottom at y = -h/2.

  // Top straight — outward normal (0, +1)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(-w / 2 + r + (w - 2 * r) * t, h / 2, 0, 1);
  }
  // Top-right arc — center (w/2 - r, h/2 - r), angle PI/2 → 0
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = Math.PI / 2 - t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(w / 2 - r + nx * r, h / 2 - r + ny * r, nx, ny);
  }
  // Right straight — outward normal (+1, 0)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(w / 2, h / 2 - r - (h - 2 * r) * t, 1, 0);
  }
  // Bottom-right arc — center (w/2 - r, -h/2 + r), angle 0 → -PI/2
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = -t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(w / 2 - r + nx * r, -h / 2 + r + ny * r, nx, ny);
  }
  // Bottom straight — outward normal (0, -1)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(w / 2 - r - (w - 2 * r) * t, -h / 2, 0, -1);
  }
  // Bottom-left arc — center (-w/2 + r, -h/2 + r), angle -PI/2 → -PI
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = -Math.PI / 2 - t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(-w / 2 + r + nx * r, -h / 2 + r + ny * r, nx, ny);
  }
  // Left straight — outward normal (-1, 0)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(-w / 2, -h / 2 + r + (h - 2 * r) * t, -1, 0);
  }
  // Top-left arc — center (-w/2 + r, h/2 - r), angle PI → PI/2
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = Math.PI - t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(-w / 2 + r + nx * r, h / 2 - r + ny * r, nx, ny);
  }

  const n = perimeter.length;
  for (let i = 0; i < n; i++) perimeter[i].t = i / n;

  const totalVerts = n + 1;
  const positions = new Float32Array(totalVerts * 2);
  const normals = new Float32Array(totalVerts * 2);
  const perimTs = new Float32Array(totalVerts);
  const edgenesses = new Float32Array(totalVerts);

  // Centroid vertex (index 0)
  positions[0] = 0;
  positions[1] = 0;
  normals[0] = 0;
  normals[1] = 0;
  perimTs[0] = 0;
  edgenesses[0] = 0;

  // Perimeter vertices (indices 1..n)
  for (let i = 0; i < n; i++) {
    const p = perimeter[i];
    const idx = i + 1;
    positions[idx * 2] = p.x;
    positions[idx * 2 + 1] = p.y;
    normals[idx * 2] = p.nx;
    normals[idx * 2 + 1] = p.ny;
    perimTs[idx] = p.t;
    edgenesses[idx] = 1;
  }

  // Triangle fan: centroid → perim[(i+1) % n] → perim[i].
  // Winding is CCW when viewed from +Z (WebGL's default front-facing
  // convention), so gl.cullFace=BACK keeps all triangles visible.
  const indices = new Uint16Array(n * 3);
  for (let i = 0; i < n; i++) {
    indices[i * 3] = 0;
    indices[i * 3 + 1] = ((i + 1) % n) + 1;
    indices[i * 3 + 2] = i + 1;
  }

  return { positions, normals, perimTs, edgenesses, indices };
}

// --- Shaders ---
// The organic wobble comes from 3D Simplex noise fed with (perimT, time) — that
// produces a smooth, non-repeating wave that circulates around the silhouette.
// Cursor proximity uses a quartic falloff (1 - d/R)² which concentrates the
// displacement into a distinct "bubble" riding the pointer instead of a diffuse
// global lift. Both contributions are gated by `edgeness` so only the
// perimeter moves; the interior stays crisp and flat.
const VERTEX = /* glsl */ `
attribute vec2 position;
attribute vec2 normal;
attribute float perimT;
attribute float edgeness;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform vec2 uCursor;
uniform float uBulge;
uniform float uInfluence;
uniform float uDriftAmp;

varying float vEdgeness;
varying float vOffset;

// --- Simplex 3D noise (Ian McEwan, Ashima Arts, 2011). MIT. ---
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vec2 pos = position;

  // Baseline organic drift — smooth 3D simplex wave circulating around the
  // perimeter. perimT * 2π wraps cleanly; time shifts the pattern so the
  // "breathing" never repeats exactly.
  float drift = snoise(vec3(perimT * 6.28318, uTime * 0.35, 0.0)) * uDriftAmp;

  // Cursor proximity — quartic (1-d/R)² falloff produces a distinct bubble
  // that trails the cursor, not a diffuse global lift.
  vec2 toVert = pos - uCursor;
  float dist = length(toVert);
  float proximity = 1.0 - clamp(dist / uInfluence, 0.0, 1.0);
  float bulge = proximity * proximity * uBulge;

  // Only perimeter vertices deform; interior (edgeness=0) stays at rest.
  float offset = (drift + bulge) * edgeness;
  pos += normal * offset;

  vEdgeness = edgeness;
  vOffset = offset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec3 uFill;

varying float vEdgeness;
varying float vOffset;

void main() {
  // Subtle edge darkening (8%) creates a soft 3D impression without a stroke.
  float edgeShade = 1.0 - vEdgeness * 0.08;
  vec3 col = uFill * edgeShade;
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * A rectangular window with rounded corners whose silhouette BULGES toward the
 * cursor. GPU-side vertex displacement via OGL + Simplex noise.
 *
 * Each instance mounts its own WebGL context. Desktop browsers allow up to
 * ~16 concurrent contexts per tab, so lab pages should keep window count
 * modest. For production grids (100+ cards) we'd migrate to a shared
 * fullscreen canvas driven by DOM bounding rects.
 */
export function JellyWindowGL({
  id,
  label,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  maxBulge = 48,
  influence = 220,
  driftAmp = DRIFT_AMPLITUDE,
  fillColor = "#fbfaf7",
}: JellyWindowGLProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const pad = Math.ceil(maxBulge + 8);
    const canvasW = width + pad * 2;
    const canvasH = height + pad * 2;

    const renderer = new Renderer({
      canvas,
      width: canvasW,
      height: canvasH,
      alpha: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      antialias: true,
      preserveDrawingBuffer: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, {
      left: -canvasW / 2,
      right: canvasW / 2,
      top: canvasH / 2,
      bottom: -canvasH / 2,
      near: 0.1,
      far: 10,
    });
    camera.position.z = 1;

    const scene = new Transform();

    const { positions, normals, perimTs, edgenesses, indices } =
      buildRoundedRectFan(width, height, CORNER_RADIUS, N_STRAIGHT, N_ARC);

    const geometry = new Geometry(gl, {
      position: { size: 2, data: positions },
      normal: { size: 2, data: normals },
      perimT: { size: 1, data: perimTs },
      edgeness: { size: 1, data: edgenesses },
      index: { data: indices },
    });

    const [cr, cg, cb] = hexToRGB(fillColor);

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      // Disable back-face culling: we render a flat plane and the deformation
      // can briefly flip a triangle's effective orientation while the silhouette
      // wobbles. Double-sided rendering is safe and cheap for a 132-triangle fan.
      cullFace: false,
      uniforms: {
        uTime: { value: 0 },
        uCursor: { value: [-99999, -99999] },
        uBulge: { value: maxBulge },
        uInfluence: { value: influence },
        uDriftAmp: { value: reducedMotion ? 0 : driftAmp },
        uFill: { value: [cr, cg, cb] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let cursorClientX = -99999;
    let cursorClientY = -99999;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      cursorClientX = e.clientX;
      cursorClientY = e.clientY;
    };
    const onLeave = () => {
      cursorClientX = -99999;
      cursorClientY = -99999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);

    let rafId = 0;
    const tick = (now: number) => {
      if (gl.isContextLost()) {
        // Schedule the next tick anyway so we resume automatically if the
        // browser restores the context.
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      const rect = container.getBoundingClientRect();
      // Convert window cursor coords → canvas-local WebGL world coords.
      // Origin is at window centroid; +Y is up (flipped from screen coords).
      const centerScreenX = rect.left + width / 2;
      const centerScreenY = rect.top + height / 2;
      const localX = cursorClientX - centerScreenX;
      const localY = centerScreenY - cursorClientY;

      program.uniforms.uTime.value = now * 0.001;
      program.uniforms.uCursor.value = [localX, localY];

      renderer.render({ scene, camera });
      rafId = window.requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      // Render resting state once and stop.
      renderer.render({ scene, camera });
    } else {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      // Intentionally DO NOT call WEBGL_lose_context here: React StrictMode
      // mounts → cleans → mounts again in dev, which would leave the canvas
      // attached to a permanently-lost context. The browser reclaims contexts
      // on canvas GC, which happens when the component unmounts for real.
    };
  }, [width, height, maxBulge, influence, driftAmp, fillColor, reducedMotion]);

  const pad = Math.ceil(maxBulge + 8);

  return (
    <div
      ref={containerRef}
      data-window-id={id}
      className="relative"
      style={{ width, height }}
      aria-label={label}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: -pad,
          top: -pad,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {label ? (
        <div
          className="pointer-events-none absolute left-4 top-4 text-[0.66rem] uppercase tracking-[0.22em]"
          style={{ color: "rgba(0,0,0,0.38)" }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
