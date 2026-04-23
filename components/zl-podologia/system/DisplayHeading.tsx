import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./cx";
import {
  createTypographyStyle,
  zlTextTone,
  zlTypography,
} from "./tokens";

type DisplayTone = "ink" | "muted" | "contrast";
type DisplaySize = keyof typeof zlTypography.display;

export interface DisplayHeadingProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  balance?: boolean;
  children: ReactNode;
  size?: DisplaySize;
  tone?: DisplayTone;
}

export function DisplayHeading({
  as,
  balance = true,
  children,
  className,
  size = "md",
  style,
  tone = "ink",
  ...rest
}: DisplayHeadingProps) {
  const Component = as ?? "h2";
  const toneColor =
    tone === "contrast"
      ? zlTextTone.contrast
      : tone === "muted"
        ? zlTextTone.muted
        : zlTextTone.ink;

  return (
    <Component
      {...rest}
      className={cx(className)}
      style={{
        margin: 0,
        color: toneColor,
        textWrap: balance ? "balance" : "pretty",
        ...createTypographyStyle(zlTypography.display[size]),
        ...style,
      }}
      data-zl-system="display-heading"
    >
      {children}
    </Component>
  );
}
