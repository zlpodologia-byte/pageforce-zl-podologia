"use client";

import type { CSSProperties } from "react";
import {
  getCoverRadius,
  isSimpleMaskViewport,
  type Point,
  useViewportSize,
} from "@/components/shell/motion";

interface GooeyMaskLayerProps {
  color: string;
  duration: number;
  expanded: boolean;
  filterId: string;
  seed: Point;
}

export function GooeyMaskLayer({
  color,
  duration,
  expanded,
  filterId,
  seed,
}: GooeyMaskLayerProps) {
  const viewport = useViewportSize();
  const radius = getCoverRadius(seed, viewport);

  if (isSimpleMaskViewport(viewport.width)) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: color,
          clipPath: `circle(${expanded ? radius : 0}px at ${seed.x}px ${seed.y}px)`,
          transition: `clip-path ${duration}ms var(--ease-out-expo)`,
        }}
      />
    );
  }

  const shortAxis = Math.min(viewport.width, viewport.height);
  const maskId = `${filterId}-mask`;
  const blobStyle: CSSProperties = {
    transform: `translate(${seed.x}px, ${seed.y}px) scale(${expanded ? 1 : 0}) translate(${-seed.x}px, ${-seed.y}px)`,
    transition: `transform ${duration}ms var(--ease-out-expo)`,
  };

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id={filterId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
            result="goo"
          />
        </filter>
        <mask
          id={maskId}
          x="0"
          y="0"
          width={viewport.width}
          height={viewport.height}
          maskUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width={viewport.width}
            height={viewport.height}
            fill="black"
          />
          <g filter={`url(#${filterId})`} style={blobStyle}>
            <circle cx={seed.x} cy={seed.y} r={radius} fill="white" />
            <circle
              cx={seed.x - shortAxis * 0.24}
              cy={seed.y + shortAxis * 0.05}
              r={radius * 0.42}
              fill="white"
            />
            <circle
              cx={seed.x + shortAxis * 0.18}
              cy={seed.y - shortAxis * 0.17}
              r={radius * 0.28}
              fill="white"
            />
            <circle
              cx={seed.x + shortAxis * 0.08}
              cy={seed.y + shortAxis * 0.2}
              r={radius * 0.34}
              fill="white"
            />
          </g>
        </mask>
      </defs>

      <rect
        x="0"
        y="0"
        width={viewport.width}
        height={viewport.height}
        fill={color}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
