"use client";

import { useEffect, useRef, useState } from "react";

interface JellyWindowProps {
  id: string;
  label?: string;
  width?: number;
  height?: number;
  /** Bulge strength in px (cursor-driven outward push). */
  maxBulge?: number;
  /** Distance (px) at which the cursor starts affecting perimeter points. */
  influence?: number;
  /** Baseline organic wave amplitude (px). 0 = static rectangle, 6+ = clearly alive. */
  driftAmp?: number;
}

const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 360;
const CORNER_RADIUS = 20;
const N_STRAIGHT = 22;
const N_ARC = 10;

// Spring physics — gives the "wet cloth / gelatina" elastic feel.
// Higher K = stiffer (faster return, less wobble).
// Lower DAMPING = more oscillation / bounce.
const SPRING_K = 0.12;
const DAMPING = 0.86;

// Smoothing pass strength: how much each point averages toward its neighbors
// after the spring step. Higher = smoother curve at the cost of responsiveness.
const NEIGHBOR_SMOOTHING = 0.22;

const DRIFT_AMPLITUDE = 3.8;

interface PerimPoint {
  hx: number;
  hy: number;
  nx: number;
  ny: number;
  cx: number; // animated x
  cy: number; // animated y
  vx: number; // velocity x
  vy: number; // velocity y
  perimT: number;
}

function smoothstep(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
}

/**
 * Build a set of perimeter points around a rounded rectangle.
 * Each point carries an OUTWARD normal so it knows which way to bulge.
 *
 * Order:
 *   top straight (L → R) → top-right arc → right straight (T → B) →
 *   bottom-right arc → bottom straight (R → L) → bottom-left arc →
 *   left straight (B → T) → top-left arc → close.
 */
function buildPerimeterPoints(
  w: number,
  h: number,
  r: number,
  nStraight: number,
  nArc: number,
): PerimPoint[] {
  const points: PerimPoint[] = [];
  const push = (hx: number, hy: number, nx: number, ny: number) => {
    points.push({ hx, hy, nx, ny, cx: hx, cy: hy, vx: 0, vy: 0, perimT: 0 });
  };

  // Top straight: from (r, 0) to (w - r, 0)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(r + (w - 2 * r) * t, 0, 0, -1);
  }
  // Top-right arc: center (w - r, r), from angle -PI/2 to 0
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = -Math.PI / 2 + t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(w - r + nx * r, r + ny * r, nx, ny);
  }
  // Right straight: from (w, r) to (w, h - r)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(w, r + (h - 2 * r) * t, 1, 0);
  }
  // Bottom-right arc: center (w - r, h - r), from angle 0 to PI/2
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(w - r + nx * r, h - r + ny * r, nx, ny);
  }
  // Bottom straight: from (w - r, h) to (r, h)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(w - r - (w - 2 * r) * t, h, 0, 1);
  }
  // Bottom-left arc: center (r, h - r), from angle PI/2 to PI
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = Math.PI / 2 + t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(r + nx * r, h - r + ny * r, nx, ny);
  }
  // Left straight: from (0, h - r) to (0, r)
  for (let i = 0; i <= nStraight; i++) {
    const t = i / nStraight;
    push(0, h - r - (h - 2 * r) * t, -1, 0);
  }
  // Top-left arc: center (r, r), from angle PI to 3PI/2
  for (let i = 1; i <= nArc; i++) {
    const t = i / (nArc + 1);
    const angle = Math.PI + t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(r + nx * r, r + ny * r, nx, ny);
  }

  // Assign perimeter parametric position (0..1) for continuous wave sampling
  const total = points.length;
  for (let i = 0; i < total; i++) {
    points[i].perimT = i / total;
  }

  return points;
}

/**
 * Smooth multi-frequency wave along the perimeter. Result roughly in [-1, 1].
 * Combining three sine terms of different frequencies + phase-shifts produces
 * a gelatinous, non-repeating organic contour that slowly circulates around
 * the rectangle.
 */
function perimeterDrift(perimT: number, time: number): number {
  const t = perimT * Math.PI * 2;
  return (
    Math.sin(t * 3 + time * 0.6) * 0.5 +
    Math.sin(t * 5.3 - time * 0.4) * 0.3 +
    Math.sin(t * 2.1 + time * 0.9) * 0.2
  );
}

function pointsToPath(points: PerimPoint[]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].cx.toFixed(1)} ${points[0].cy.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].cx.toFixed(1)} ${points[i].cy.toFixed(1)}`;
  }
  d += " Z";
  return d;
}

/**
 * A rectangular window whose perimeter BULGES toward the cursor.
 *
 * Technique: SVG <path> with N discrete perimeter points. Each frame we read
 * the cursor, compute proximity per point, and push that point outward along
 * its own outward normal. The fill + stroke deform together — the whole window
 * physically protrudes where the cursor is. No filter, no mask, no WebGL.
 */
export function JellyWindow({
  id,
  label,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  maxBulge = 48,
  influence = 220,
  driftAmp = DRIFT_AMPLITUDE,
}: JellyWindowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const pointsRef = useRef<PerimPoint[]>(
    buildPerimeterPoints(width, height, CORNER_RADIUS, N_STRAIGHT, N_ARC),
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // If reduced motion, draw the resting perimeter once and stop.
    if (reducedMotion) {
      if (pathRef.current) {
        pathRef.current.setAttribute("d", pointsToPath(pointsRef.current));
      }
      return;
    }

    let rafId = 0;
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

    const tick = (now: number) => {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const localX = cursorClientX - rect.left;
        const localY = cursorClientY - rect.top;
        const time = now * 0.001;

        const pts = pointsRef.current;
        const n = pts.length;

        // ---- Step 1: compute target for each point and integrate spring physics ----
        for (let i = 0; i < n; i++) {
          const p = pts[i];

          // Baseline organic wave — always active, slowly cycling around the perimeter.
          const drift = perimeterDrift(p.perimT, time) * driftAmp;

          // Cursor proximity — tighter influence creates a distinct "bubble" peak
          // that trails the cursor, rather than a diffuse global wave.
          const dx = p.hx - localX;
          const dy = p.hy - localY;
          const distance = Math.hypot(dx, dy);
          const proximity = 1 - Math.min(distance / influence, 1);
          // Quartic falloff (1-x/R)^2 concentrates the peak even more and
          // reads visually as a "bubble passing along the edge".
          const falloff = proximity * proximity;
          const bulge = falloff * maxBulge;

          const offset = drift + bulge;
          const targetX = p.hx + p.nx * offset;
          const targetY = p.hy + p.ny * offset;

          // Spring toward target, damped. This is the source of the wet-cloth
          // elasticity — the point overshoots, oscillates, and settles instead
          // of snapping.
          const fx = (targetX - p.cx) * SPRING_K;
          const fy = (targetY - p.cy) * SPRING_K;
          p.vx = (p.vx + fx) * DAMPING;
          p.vy = (p.vy + fy) * DAMPING;
          p.cx += p.vx;
          p.cy += p.vy;
        }

        // ---- Step 2: neighbor smoothing — couples adjacent points so the wave
        // propagates around the perimeter instead of each point moving alone.
        // Classic cloth-style relaxation in one pass. ----
        if (NEIGHBOR_SMOOTHING > 0) {
          const buf = pointsRef.current.map((p) => ({ x: p.cx, y: p.cy }));
          for (let i = 0; i < n; i++) {
            const p = pts[i];
            const prev = buf[(i - 1 + n) % n];
            const next = buf[(i + 1) % n];
            const avgX = (prev.x + next.x) * 0.5;
            const avgY = (prev.y + next.y) * 0.5;
            p.cx = p.cx + (avgX - p.cx) * NEIGHBOR_SMOOTHING;
            p.cy = p.cy + (avgY - p.cy) * NEIGHBOR_SMOOTHING;
          }
        }

        if (pathRef.current) {
          pathRef.current.setAttribute("d", pointsToPath(pts));
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, [reducedMotion, influence, maxBulge, driftAmp]);

  // Initial path so the window renders correctly during SSR and before rAF starts
  const initialPath = pointsToPath(pointsRef.current);

  // Viewbox padded on all sides to give room for the bulge to extend beyond
  // the nominal rectangle without clipping.
  const pad = Math.ceil(maxBulge + 4);

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        width,
        height,
      }}
      aria-label={label}
    >
      <svg
        width={width + pad * 2}
        height={height + pad * 2}
        viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
        style={{
          position: "absolute",
          left: -pad,
          top: -pad,
          overflow: "visible",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={initialPath}
          fill="var(--color-window)"
          stroke="var(--color-ink)"
          strokeWidth="1"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

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
