import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

import { cx } from "./cx";
import {
  createTypographyStyle,
  zlLayout,
  zlPalette,
  zlRadius,
  zlShadow,
  zlSpacing,
  zlTypography,
} from "./tokens";

type WhatsAppButtonVariant = "solid" | "outline";
type WhatsAppButtonSize = "md" | "lg";

export interface WhatsAppButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: WhatsAppButtonVariant;
  size?: WhatsAppButtonSize;
  fullWidth?: boolean;
}

const variantStyle: Record<WhatsAppButtonVariant, CSSProperties> = {
  solid: {
    background: zlPalette.whatsapp,
    border: `1px solid ${zlPalette.whatsapp}`,
    color: zlPalette.contrast,
    boxShadow: zlShadow.soft,
  },
  outline: {
    background: "transparent",
    border: `1px solid ${zlPalette.whatsapp}`,
    color: zlPalette.whatsapp,
  },
};

const sizeStyle: Record<WhatsAppButtonSize, CSSProperties> = {
  md: {
    minHeight: "3rem",
    paddingInline: zlSpacing.md,
    paddingBlock: zlSpacing.xs,
    gap: zlSpacing.xs,
    ...createTypographyStyle(zlTypography.button.md),
  },
  lg: {
    minHeight: "3.5rem",
    paddingInline: zlSpacing.lg,
    paddingBlock: zlSpacing.sm,
    gap: zlSpacing.sm,
    ...createTypographyStyle(zlTypography.button.lg),
  },
};

export function WhatsAppButton({
  children,
  className,
  fullWidth = false,
  href,
  icon,
  rel,
  size = "md",
  style,
  target = "_blank",
  variant = "solid",
  ...rest
}: WhatsAppButtonProps) {
  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
      className={cx(
        "inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        fullWidth ? "w-full" : undefined,
        className,
      )}
      style={{
        borderRadius: zlRadius.pill,
        textDecoration: "none",
        outlineColor: zlPalette.whatsapp,
        ...variantStyle[variant],
        ...sizeStyle[size],
        ...style,
      }}
      data-zl-system="whatsapp-button"
    >
      {icon ?? <WhatsAppGlyph />}
      <span>{children}</span>
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="shrink-0"
      style={{ width: zlLayout.iconSize.sm, height: zlLayout.iconSize.sm }}
      fill="none"
    >
      <path
        d="M20 11.45c0 4.62-3.77 8.38-8.42 8.38a8.46 8.46 0 0 1-4.03-1.02L4 20l1.23-3.49A8.35 8.35 0 0 1 3.17 11.45C3.17 6.83 6.94 3.07 11.58 3.07S20 6.83 20 11.45Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.63 8.35c.2-.45.42-.46.62-.46h.53c.15 0 .4.06.58.45.18.39.62 1.51.68 1.62.06.11.09.25.02.4-.07.15-.11.25-.22.39-.11.14-.24.31-.34.42-.11.11-.22.24-.1.46.12.22.55.9 1.19 1.46.82.71 1.51.93 1.73 1.04.22.11.35.09.48-.06.13-.15.55-.63.69-.84.14-.21.29-.18.49-.11.2.07 1.28.6 1.49.71.21.11.35.17.4.27.05.1.05.58-.13 1.14-.18.56-1.03 1.07-1.42 1.14-.39.07-.89.1-1.44-.07-.33-.1-.76-.25-1.31-.49-.23-.1-.81-.39-1.39-.88-.58-.49-1.12-1.09-1.55-1.78-.43-.69-.69-1.39-.77-1.63-.08-.24-.22-.83-.03-1.29.19-.46.45-.66.61-.85.16-.19.35-.23.47-.23Z"
        fill="currentColor"
      />
    </svg>
  );
}
