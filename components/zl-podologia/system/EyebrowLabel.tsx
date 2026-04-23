import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./cx";
import {
  createTypographyStyle,
  zlPalette,
  zlRadius,
  zlSpacing,
  zlTextTone,
  zlTypography,
} from "./tokens";

type EyebrowTone = "accent" | "muted" | "contrast";
type EyebrowSize = keyof typeof zlTypography.eyebrow;

export interface EyebrowLabelProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  capsule?: boolean;
  children: ReactNode;
  tone?: EyebrowTone;
  size?: EyebrowSize;
}

const toneStyle: Record<EyebrowTone, CSSProperties> = {
  accent: {
    color: zlTextTone.accent,
    borderColor: zlPalette.borderStrong,
    background: "rgba(255,255,255,0.68)",
  },
  muted: {
    color: zlTextTone.muted,
    borderColor: zlPalette.border,
    background: "transparent",
  },
  contrast: {
    color: zlTextTone.contrast,
    borderColor: zlPalette.whisper,
    background: "rgba(255,255,255,0.08)",
  },
};

export function EyebrowLabel({
  as,
  capsule = false,
  children,
  className,
  size = "md",
  style,
  tone = "accent",
  ...rest
}: EyebrowLabelProps) {
  const Component = as ?? "p";
  const capsuleStyle = capsule
    ? {
        border: `1px solid ${toneStyle[tone].borderColor}`,
        borderRadius: zlRadius.pill,
        paddingInline: zlSpacing.sm,
        paddingBlock: zlSpacing.xxs,
      }
    : undefined;

  return (
    <Component
      {...rest}
      className={cx("inline-flex items-center", className)}
      style={{
        margin: 0,
        ...createTypographyStyle(zlTypography.eyebrow[size]),
        ...toneStyle[tone],
        ...capsuleStyle,
        ...style,
      }}
      data-zl-system="eyebrow-label"
    >
      {children}
    </Component>
  );
}
