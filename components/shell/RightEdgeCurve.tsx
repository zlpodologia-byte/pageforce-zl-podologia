"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";

/**
 * RightEdgeCurve — persistent decorative curve on the right edge of the viewport.
 * Fill interpolates with scroll progress: coral (top) → ink (bottom).
 * When the menu overlay is open, fill inverts to ivory against dark canvas.
 *
 * LIVING EDGE: the left-bulging quadratic of the curve is sampled into 30
 * perimeter points running the full viewport height. Each point has an
 * inward normal (pointing left, into the page content). Spring physics +
 * multi-sine drift same as JellyWindow / JellyBorder — the curve breathes
 * at rest and reaches toward the cursor when the pointer approaches.
 *
 * Contains the MenuButton as its mount point.
 * See docs/reference-audit.md §5.1 and §5.3, and docs/jelly-system.md for
 * the perimeter-physics family.
 */

const VIEWBOX_W = 72;
const VIEWBOX_H = 1000;
const CURVE_START = { x: 28, y: 1000 };
const CURVE_END = { x: 28, y: 0 };
const CURVE_CONTROL = { x: 2, y: 500 };
const N_CURVE = 30;

const MAX_BULGE = 18; // in viewBox-X units (~18px at 72-wide viewBox)
const INFLUENCE = 260; // in screen px (cursor proximity radius)
const DRIFT_AMP = 2.4;
const SPRING_K = 0.12;
const DAMPING = 0.86;
const NEIGHBOR_SMOOTHING = 0.22;

interface CurvePoint {
  hx: number; // home X in viewBox space (static curve position)
  hy: number;
  nx: number; // inward normal (points left into content area)
  ny: number;
  cx: number; // animated X in viewBox space
  cy: number;
  vx: number;
  vy: number;
  perimT: number;
}

/**
 * Sample the quadratic Bezier from CURVE_START → CURVE_END (via CURVE_CONTROL)
 * into N points. Each point carries a unit-length normal perpendicular to the
 * tangent, pointing LEFT (into the content area). Going START(bottom) → END(top)
 * means the outward direction (toward cursor) is the -X side.
 */
function buildCurvePoints(): CurvePoint[] {
  const pts: CurvePoint[] = [];
  for (let i = 0; i <= N_CURVE; i++) {
    const t = i / N_CURVE;
    const oneMinusT = 1 - t;
    // B(t) = (1-t)²P0 + 2(1-t)t P1 + t² P2
    const hx =
      oneMinusT * oneMinusT * CURVE_START.x +
      2 * oneMinusT * t * CURVE_CONTROL.x +
      t * t * CURVE_END.x;
    const hy =
      oneMinusT * oneMinusT * CURVE_START.y +
      2 * oneMinusT * t * CURVE_CONTROL.y +
      t * t * CURVE_END.y;
    // B'(t) = 2(1-t)(P1-P0) + 2t(P2-P1)
    const tx =
      2 * oneMinusT * (CURVE_CONTROL.x - CURVE_START.x) +
      2 * t * (CURVE_END.x - CURVE_CONTROL.x);
    const ty =
      2 * oneMinusT * (CURVE_CONTROL.y - CURVE_START.y) +
      2 * t * (CURVE_END.y - CURVE_CONTROL.y);
    // Left-pointing normal: rotate tangent -90° (for START→END traversal that is
    // going UP on the left, rotating -90° gives a vector pointing LEFT).
    const mag = Math.hypot(tx, ty) || 1;
    const nx = -ty / mag;
    const ny = tx / mag;
    pts.push({
      hx,
      hy,
      nx,
      ny,
      cx: hx,
      cy: hy,
      vx: 0,
      vy: 0,
      perimT: t,
    });
  }
  return pts;
}

function perimeterDrift(perimT: number, time: number): number {
  const t = perimT * Math.PI * 2;
  return (
    Math.sin(t * 2.2 + time * 0.5) * 0.55 +
    Math.sin(t * 4.7 - time * 0.35) * 0.3 +
    Math.sin(t * 1.3 + time * 0.8) * 0.2
  );
}

function pointsToPath(points: CurvePoint[]): string {
  // Compose the full shape: right vertical, bottom stub, animated curve (reversed
  // because our sample goes bottom→top and we need to traverse from bottom to top
  // to close cleanly with the top stub).
  let d = `M ${VIEWBOX_W} 0 L ${VIEWBOX_W} ${VIEWBOX_H} L ${points[0].cx.toFixed(2)} ${points[0].cy.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].cx.toFixed(2)} ${points[i].cy.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

export function RightEdgeCurve({ children }: { children?: React.ReactNode }) {
  const menuOpen = useAppStore((state) => state.menuOpen);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const pointsRef = useRef<CurvePoint[]>(buildCurvePoints());

  useEffect(() => {
    const onScroll = () => {
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        scrollRange > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
          : 0,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      const el = wrapperRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        // Map screen cursor → viewBox space (0..72 in X, 0..1000 in Y).
        const scaleX = rect.width > 0 ? VIEWBOX_W / rect.width : 1;
        const scaleY = rect.height > 0 ? VIEWBOX_H / rect.height : 1;
        const localVbX = (cursorClientX - rect.left) * scaleX;
        const localVbY = (cursorClientY - rect.top) * scaleY;
        // Influence radius also converted to viewBox X units (curve lives in X).
        const influenceVb = INFLUENCE * scaleX;
        const time = now * 0.001;

        const pts = pointsRef.current;
        const n = pts.length;

        for (let i = 0; i < n; i++) {
          const p = pts[i];
          const drift = perimeterDrift(p.perimT, time) * DRIFT_AMP;

          const dx = p.hx - localVbX;
          const dy = p.hy - localVbY;
          const distance = Math.hypot(dx, dy);
          const proximity = 1 - Math.min(distance / influenceVb, 1);
          const falloff = proximity * proximity;
          const bulge = falloff * MAX_BULGE;

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

        // Neighbor smoothing along the curve (1D topology — each curve point has
        // exactly two neighbors, except the endpoints which we anchor to their
        // home position so the curve stays attached to the structural lines).
        if (NEIGHBOR_SMOOTHING > 0) {
          const buf = pts.map((p) => ({ x: p.cx, y: p.cy }));
          for (let i = 1; i < n - 1; i++) {
            const p = pts[i];
            const prev = buf[i - 1];
            const next = buf[i + 1];
            const avgX = (prev.x + next.x) * 0.5;
            const avgY = (prev.y + next.y) * 0.5;
            p.cx = p.cx + (avgX - p.cx) * NEIGHBOR_SMOOTHING;
            p.cy = p.cy + (avgY - p.cy) * NEIGHBOR_SMOOTHING;
          }
          // Keep endpoints pinned to structural corners so the closed path
          // doesn't gap at the top and bottom.
          pts[0].cx = pts[0].hx;
          pts[0].cy = pts[0].hy;
          pts[n - 1].cx = pts[n - 1].hx;
          pts[n - 1].cy = pts[n - 1].hy;
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
  }, [reducedMotion]);

  const fill = menuOpen
    ? "var(--color-ink-invert)"
    : progress < 0.15
      ? "var(--color-frame-a)"
      : progress < 0.5
        ? "rgba(30, 20, 15, 0.92)"
        : "var(--color-ink)";

  const initialPath = pointsToPath(pointsRef.current);

  return (
    <>
      <div
        ref={wrapperRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 z-[30] hidden w-[clamp(56px,4.8vw,72px)] min-[481px]:block"
      >
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          className="h-full w-full transition-[color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ color: fill, overflow: "visible" }}
        >
          <path ref={pathRef} d={initialPath} fill="currentColor" />
        </svg>
      </div>

      {children ? (
        <div className="pointer-events-none fixed right-0 top-0 z-[50] w-[clamp(56px,4.8vw,72px)] max-[480px]:w-auto">
          <div className="pointer-events-auto absolute right-0 top-5 max-[480px]:right-3 max-[480px]:top-3 max-[480px]:rounded-full max-[480px]:bg-[var(--color-ink)] max-[480px]:p-1">
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
