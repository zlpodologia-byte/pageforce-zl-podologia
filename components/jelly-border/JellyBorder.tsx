"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * JellyBorder — wraps children in a stroke-only rounded-rectangle (or circle)
 * whose perimeter bulges toward the cursor and slowly breathes via a multi-
 * frequency wave.
 *
 * Same spring-physics perimeter-point algorithm as JellyWindow, with three
 * differences tuned for secondary UI (buttons, pills, CTAs, nav items):
 *
 * 1. Stroke only — no fill. The element behind the border remains visible.
 * 2. Shapes — `"rect"` (rounded rectangle) and `"circle"` (perfect disc with
 *    radial bulge around the whole perimeter).
 * 3. Smaller defaults — maxBulge 14 instead of 48, influence 120 instead of
 *    220, drift 1.6 instead of 3.8. Subtle enough to read as a detail, not
 *    a feature.
 *
 * Children render inside the border. If your child has its own background,
 * pass `fillBackground` so we match the stroke path as a transparent fill
 * to avoid a hard edge.
 */
interface JellyBorderProps {
  children: ReactNode;
  /** Inner width (children's logical size). Border protrudes outside this box. */
  width: number;
  height: number;
  shape?: "rect" | "circle";
  /** Only applies to `shape="rect"`. */
  radius?: number;
  /** Max outward displacement driven by cursor proximity (px). */
  maxBulge?: number;
  /** Distance (px) within which cursor influences perimeter. */
  influence?: number;
  /** Baseline breathing amplitude (px). */
  driftAmp?: number;
  strokeColor?: string;
  strokeWidth?: number;
  /** If the wrapped child has its own solid background, set a matching fill
   *  so the jelly silhouette fills coherently behind it. Defaults to transparent. */
  fillColor?: string;
  className?: string;
  style?: CSSProperties;
  ariaHidden?: boolean;
}

const CORNER_RADIUS_DEFAULT = 999; // pill by default
const N_STRAIGHT = 16; // lighter sampling than JellyWindow (22) — border only
const N_ARC = 8;
const N_CIRCLE_POINTS = 60;

const SPRING_K = 0.12;
const DAMPING = 0.86;
const NEIGHBOR_SMOOTHING = 0.22;

interface PerimPoint {
  hx: number;
  hy: number;
  nx: number;
  ny: number;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  perimT: number;
}

function buildRoundedRectPoints(
  w: number,
  h: number,
  r: number,
): PerimPoint[] {
  const pts: PerimPoint[] = [];
  const push = (hx: number, hy: number, nx: number, ny: number) => {
    pts.push({ hx, hy, nx, ny, cx: hx, cy: hy, vx: 0, vy: 0, perimT: 0 });
  };

  const cornerR = Math.min(r, Math.min(w, h) / 2);

  for (let i = 0; i <= N_STRAIGHT; i++) {
    const t = i / N_STRAIGHT;
    push(cornerR + (w - 2 * cornerR) * t, 0, 0, -1);
  }
  for (let i = 1; i <= N_ARC; i++) {
    const t = i / (N_ARC + 1);
    const angle = -Math.PI / 2 + t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(w - cornerR + nx * cornerR, cornerR + ny * cornerR, nx, ny);
  }
  for (let i = 0; i <= N_STRAIGHT; i++) {
    const t = i / N_STRAIGHT;
    push(w, cornerR + (h - 2 * cornerR) * t, 1, 0);
  }
  for (let i = 1; i <= N_ARC; i++) {
    const t = i / (N_ARC + 1);
    const angle = t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(w - cornerR + nx * cornerR, h - cornerR + ny * cornerR, nx, ny);
  }
  for (let i = 0; i <= N_STRAIGHT; i++) {
    const t = i / N_STRAIGHT;
    push(w - cornerR - (w - 2 * cornerR) * t, h, 0, 1);
  }
  for (let i = 1; i <= N_ARC; i++) {
    const t = i / (N_ARC + 1);
    const angle = Math.PI / 2 + t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(cornerR + nx * cornerR, h - cornerR + ny * cornerR, nx, ny);
  }
  for (let i = 0; i <= N_STRAIGHT; i++) {
    const t = i / N_STRAIGHT;
    push(0, h - cornerR - (h - 2 * cornerR) * t, -1, 0);
  }
  for (let i = 1; i <= N_ARC; i++) {
    const t = i / (N_ARC + 1);
    const angle = Math.PI + t * (Math.PI / 2);
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    push(cornerR + nx * cornerR, cornerR + ny * cornerR, nx, ny);
  }

  const total = pts.length;
  for (let i = 0; i < total; i++) pts[i].perimT = i / total;
  return pts;
}

function buildCirclePoints(w: number, h: number): PerimPoint[] {
  // Treat the bounding box as a square; the circle's radius is the smaller axis.
  const r = Math.min(w, h) / 2;
  const cx = w / 2;
  const cy = h / 2;
  const pts: PerimPoint[] = [];
  for (let i = 0; i < N_CIRCLE_POINTS; i++) {
    const t = i / N_CIRCLE_POINTS;
    const angle = t * Math.PI * 2 - Math.PI / 2; // start at top
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    const hx = cx + nx * r;
    const hy = cy + ny * r;
    pts.push({ hx, hy, nx, ny, cx: hx, cy: hy, vx: 0, vy: 0, perimT: t });
  }
  return pts;
}

function perimeterDrift(perimT: number, time: number): number {
  const t = perimT * Math.PI * 2;
  return (
    Math.sin(t * 3 + time * 0.6) * 0.5 +
    Math.sin(t * 5.3 - time * 0.4) * 0.3 +
    Math.sin(t * 2.1 + time * 0.9) * 0.2
  );
}

/**
 * Render the perimeter with quadratic-Bezier midpoint smoothing (Paper.js
 * `path.smooth()` style). Each point becomes a control vertex, and the curve
 * passes through the MIDPOINT between consecutive points. This kills the
 * faceted look of straight-line segments without touching the physics —
 * strictly a rendering upgrade.
 *
 * Per the deep-research audit (2026-04-19): this is the documented tell of
 * the Hello Monday gooey navigation — procedurally perturbed points fed to
 * Paper.js smoothing before becoming the overlay mask. We match the same
 * spline shape here via native SVG `Q` commands.
 */
function pointsToPath(points: PerimPoint[]): string {
  const n = points.length;
  if (n === 0) return "";
  const mid = (a: PerimPoint, b: PerimPoint) => ({
    x: (a.cx + b.cx) * 0.5,
    y: (a.cy + b.cy) * 0.5,
  });
  const start = mid(points[n - 1], points[0]);
  let d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const cur = points[i];
    const next = points[(i + 1) % n];
    const m = mid(cur, next);
    d += ` Q ${cur.cx.toFixed(1)} ${cur.cy.toFixed(1)} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`;
  }
  d += " Z";
  return d;
}

export function JellyBorder({
  children,
  width,
  height,
  shape = "rect",
  radius = CORNER_RADIUS_DEFAULT,
  maxBulge = 14,
  influence = 120,
  driftAmp = 1.6,
  strokeColor = "currentColor",
  strokeWidth = 1,
  fillColor = "transparent",
  className,
  style,
  ariaHidden = true,
}: JellyBorderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const pointsRef = useRef<PerimPoint[]>(
    shape === "circle"
      ? buildCirclePoints(width, height)
      : buildRoundedRectPoints(width, height, radius),
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  // Rebuild on size/shape change
  useEffect(() => {
    pointsRef.current =
      shape === "circle"
        ? buildCirclePoints(width, height)
        : buildRoundedRectPoints(width, height, radius);
    if (pathRef.current) {
      pathRef.current.setAttribute("d", pointsToPath(pointsRef.current));
    }
  }, [width, height, shape, radius]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
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
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const localX = cursorClientX - rect.left;
        const localY = cursorClientY - rect.top;
        const time = now * 0.001;

        const pts = pointsRef.current;
        const n = pts.length;

        for (let i = 0; i < n; i++) {
          const p = pts[i];
          const drift = perimeterDrift(p.perimT, time) * driftAmp;
          const dx = p.hx - localX;
          const dy = p.hy - localY;
          const distance = Math.hypot(dx, dy);
          const proximity = 1 - Math.min(distance / influence, 1);
          const falloff = proximity * proximity;
          const bulge = falloff * maxBulge;
          const offset = drift + bulge;
          const targetX = p.hx + p.nx * offset;
          const targetY = p.hy + p.ny * offset;
          const fx = (targetX - p.cx) * SPRING_K;
          const fy = (targetY - p.cy) * SPRING_K;
          p.vx = (p.vx + fx) * DAMPING;
          p.vy = (p.vy + fy) * DAMPING;
          p.cx += p.vx;
          p.cy += p.vy;
        }

        if (NEIGHBOR_SMOOTHING > 0) {
          const buf = pts.map((p) => ({ x: p.cx, y: p.cy }));
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

  const initialPath = pointsToPath(pointsRef.current);
  const pad = Math.ceil(maxBulge + strokeWidth + 4);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width, height, ...style }}
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
          zIndex: 0,
        }}
        aria-hidden={ariaHidden ? "true" : undefined}
      >
        <path
          ref={pathRef}
          d={initialPath}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
