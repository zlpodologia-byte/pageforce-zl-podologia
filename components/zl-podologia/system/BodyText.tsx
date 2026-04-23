import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./cx";
import {
  createTypographyStyle,
  zlTextTone,
  zlTypography,
} from "./tokens";

type BodyTone = "ink" | "muted" | "accent" | "contrast" | "contrastMuted";
type BodySize = keyof typeof zlTypography.body;

export interface BodyTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  size?: BodySize;
  tone?: BodyTone;
}

export function BodyText({
  as,
  children,
  className,
  size = "md",
  style,
  tone = "muted",
  ...rest
}: BodyTextProps) {
  const Component = as ?? "p";

  return (
    <Component
      {...rest}
      className={cx(className)}
      style={{
        margin: 0,
        color: zlTextTone[tone],
        ...createTypographyStyle(zlTypography.body[size]),
        ...style,
      }}
      data-zl-system="body-text"
    >
      {children}
    </Component>
  );
}
