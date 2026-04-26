import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { EyebrowLabel } from "./EyebrowLabel";
import { cx } from "./cx";
import {
  zlLayout,
  zlPalette,
  zlRadius,
  zlShadow,
} from "./tokens";

type FrameAccent = "blush" | "sand" | "ink";
type FrameDepth = keyof typeof zlLayout.frameOffset;
type FrameRadius = keyof typeof zlRadius;

export interface FrameStackProps extends HTMLAttributes<HTMLDivElement> {
  accent?: FrameAccent;
  children: ReactNode;
  depth?: FrameDepth;
  label?: ReactNode;
  radius?: FrameRadius;
}

const accentStyle: Record<FrameAccent, { wash: string; border: string; frame: string }> = {
  blush: {
    wash: "rgba(15,107,70,0.14)",
    border: zlPalette.borderStrong,
    frame: zlPalette.paper,
  },
  sand: {
    wash: "rgba(246,236,229,0.92)",
    border: zlPalette.border,
    frame: zlPalette.contrast,
  },
  ink: {
    wash: "rgba(23,79,63,0.12)",
    border: zlPalette.whisper,
    frame: zlPalette.ink,
  },
};

export function FrameStack({
  accent = "blush",
  children,
  className,
  depth = "md",
  label,
  radius = "frame",
  style,
  ...rest
}: FrameStackProps) {
  const offset = zlLayout.frameOffset[depth];
  const palette = accentStyle[accent];
  const shellStyle: CSSProperties = {
    borderRadius: zlRadius[radius],
    transform: `translate(${offset}, ${offset})`,
  };

  return (
    <div
      {...rest}
      className={cx("relative isolate", className)}
      style={style}
      data-zl-system="frame-stack"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          ...shellStyle,
          background: palette.wash,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          borderRadius: zlRadius[radius],
          border: `1px solid ${palette.border}`,
          transform: `translate(${offset}, calc(${offset} * -0.5))`,
        }}
      />
      <div
        className="relative overflow-hidden"
        style={{
          background: palette.frame,
          border: `1px solid ${palette.border}`,
          borderRadius: zlRadius[radius],
          boxShadow: zlShadow.floating,
        }}
      >
        {label ? (
          <EyebrowLabel
            capsule
            tone={accent === "ink" ? "contrast" : "accent"}
            className="absolute left-0 top-0 z-10"
            style={{
              marginLeft: zlLayout.frameOffset.md,
              marginTop: zlLayout.frameOffset.md,
            }}
          >
            {label}
          </EyebrowLabel>
        ) : null}
        {children}
      </div>
    </div>
  );
}
