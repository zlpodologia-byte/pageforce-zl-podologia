import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./cx";
import {
  zlLayout,
  zlRadius,
  zlShadow,
  zlSurfaceTone,
} from "./tokens";

type EditorialTone = keyof typeof zlSurfaceTone;
type EditorialPadding = keyof typeof zlLayout.cardPadding;
type EditorialRadius = keyof typeof zlRadius;

export interface EditorialCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  elevated?: boolean;
  padding?: EditorialPadding;
  radius?: EditorialRadius;
  tone?: EditorialTone;
}

export function EditorialCard({
  as,
  children,
  className,
  elevated = true,
  padding = "md",
  radius = "frame",
  style,
  tone = "paper",
  ...rest
}: EditorialCardProps) {
  const Component = as ?? "article";
  const surface = zlSurfaceTone[tone];

  return (
    <Component
      {...rest}
      className={cx("relative isolate overflow-hidden", className)}
      style={{
        background: surface.background,
        border: `1px solid ${surface.border}`,
        borderRadius: zlRadius[radius],
        color: surface.text,
        padding: zlLayout.cardPadding[padding],
        boxShadow: elevated ? zlShadow.card : undefined,
        ...style,
      }}
      data-zl-system="editorial-card"
    >
      {children}
    </Component>
  );
}
