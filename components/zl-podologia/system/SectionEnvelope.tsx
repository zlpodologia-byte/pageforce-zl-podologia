import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./cx";
import {
  zlLayout,
  zlRadius,
  zlShadow,
  zlSurfaceTone,
} from "./tokens";

type EnvelopeTone = keyof typeof zlSurfaceTone;
type EnvelopePadding = keyof typeof zlLayout.sectionPadding;
type EnvelopeRadius = keyof typeof zlRadius;

export interface SectionEnvelopeProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  elevated?: boolean;
  padding?: EnvelopePadding;
  radius?: EnvelopeRadius;
  tone?: EnvelopeTone;
}

export function SectionEnvelope({
  as,
  children,
  className,
  elevated = false,
  padding = "md",
  radius = "frame",
  style,
  tone = "paper",
  ...rest
}: SectionEnvelopeProps) {
  const Component = as ?? "section";
  const surface = zlSurfaceTone[tone];

  return (
    <Component
      {...rest}
      className={cx("relative isolate w-full", className)}
      style={{
        background: surface.background,
        border: `1px solid ${surface.border}`,
        borderRadius: zlRadius[radius],
        color: surface.text,
        paddingBlock: zlLayout.sectionPadding[padding],
        paddingInline: zlLayout.sectionPadding[padding],
        boxShadow: elevated ? zlShadow.card : undefined,
        ...style,
      }}
      data-zl-system="section-envelope"
    >
      {children}
    </Component>
  );
}
