import type { CSSProperties } from "react";

type TypographyToken = Readonly<{
  fontFamily: string;
  fontSizePx: number;
  lineHeight: number;
  letterSpacingEm: number;
  fontWeight: CSSProperties["fontWeight"];
  textTransform?: CSSProperties["textTransform"];
}>;

export const zlPalette = {
  ink: "#26302B",
  inkMuted: "#6F746F",
  accent: "#0F6B46",
  accentStrong: "#174F3F",
  paper: "#F8F7F4",
  wash: "#EFEAE4",
  border: "#D9DAD7",
  borderStrong: "#C8CEC7",
  contrast: "#FFFFFF",
  contrastMuted: "rgba(255,255,255,0.82)",
  whisper: "rgba(255,255,255,0.12)",
  overlay: "rgba(23,79,63,0.72)",
  whatsapp: "#0F6B46",
  whatsappStrong: "#174F3F",
  sage: "#8EA08E",
  ivory: "#E8DED3",
  gold: "#B9A06F",
} as const;

export const zlRadius = {
  soft: "1rem",
  frame: "1.75rem",
  pill: "999px",
} as const;

export const zlSpacing = {
  xxs: "0.375rem",
  xs: "0.625rem",
  sm: "0.875rem",
  md: "1.125rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "2.75rem",
} as const;

export const zlShadow = {
  soft: "0 14px 34px rgba(23,79,63,0.08)",
  card: "0 22px 54px rgba(23,79,63,0.10)",
  floating: "0 28px 70px rgba(23,48,38,0.14)",
} as const;

export const zlLayout = {
  cardPadding: {
    sm: zlSpacing.sm,
    md: zlSpacing.lg,
    lg: zlSpacing.xl,
  },
  sectionPadding: {
    sm: zlSpacing.lg,
    md: zlSpacing.xl,
    lg: zlSpacing.xxl,
  },
  frameOffset: {
    sm: zlSpacing.xs,
    md: zlSpacing.sm,
    lg: zlSpacing.md,
  },
  iconSize: {
    sm: "2.5rem",
    md: "3rem",
  },
} as const;

export const zlTypography = {
  display: {
    sm: {
      fontFamily: "var(--font-display)",
      fontSizePx: 32,
      lineHeight: 1.04,
      letterSpacingEm: -0.03,
      fontWeight: 400,
    },
    md: {
      fontFamily: "var(--font-display)",
      fontSizePx: 44,
      lineHeight: 1.02,
      letterSpacingEm: -0.035,
      fontWeight: 400,
    },
    lg: {
      fontFamily: "var(--font-display)",
      fontSizePx: 60,
      lineHeight: 0.98,
      letterSpacingEm: -0.04,
      fontWeight: 400,
    },
  },
  body: {
    sm: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 15,
      lineHeight: 1.6,
      letterSpacingEm: -0.01,
      fontWeight: 400,
    },
    md: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 18,
      lineHeight: 1.65,
      letterSpacingEm: -0.012,
      fontWeight: 400,
    },
    lg: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 20,
      lineHeight: 1.68,
      letterSpacingEm: -0.015,
      fontWeight: 400,
    },
  },
  eyebrow: {
    sm: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 11,
      lineHeight: 1.2,
      letterSpacingEm: 0.28,
      fontWeight: 500,
      textTransform: "uppercase",
    },
    md: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 13,
      lineHeight: 1.2,
      letterSpacingEm: 0.24,
      fontWeight: 500,
      textTransform: "uppercase",
    },
  },
  button: {
    md: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 16,
      lineHeight: 1.2,
      letterSpacingEm: -0.012,
      fontWeight: 600,
    },
    lg: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 18,
      lineHeight: 1.2,
      letterSpacingEm: -0.015,
      fontWeight: 600,
    },
  },
  proof: {
    value: {
      fontFamily: "var(--font-display)",
      fontSizePx: 28,
      lineHeight: 1.05,
      letterSpacingEm: -0.025,
      fontWeight: 400,
    },
    body: {
      fontFamily: "var(--font-sans)",
      fontSizePx: 14,
      lineHeight: 1.55,
      letterSpacingEm: -0.01,
      fontWeight: 400,
    },
  },
} as const satisfies Record<string, Record<string, TypographyToken>>;

export const zlTextTone = {
  ink: zlPalette.ink,
  muted: zlPalette.inkMuted,
  accent: zlPalette.accent,
  contrast: zlPalette.contrast,
  contrastMuted: zlPalette.contrastMuted,
  whatsapp: zlPalette.whatsapp,
} as const;

export const zlSurfaceTone = {
  paper: {
    background: zlPalette.paper,
    border: zlPalette.border,
    text: zlPalette.ink,
  },
  wash: {
    background: zlPalette.wash,
    border: zlPalette.borderStrong,
    text: zlPalette.ink,
  },
  contrast: {
    background: zlPalette.contrast,
    border: zlPalette.border,
    text: zlPalette.ink,
  },
  ink: {
    background: zlPalette.ink,
    border: zlPalette.whisper,
    text: zlPalette.contrast,
  },
} as const;

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function createTypographyStyle(
  token: TypographyToken,
  overrides?: Partial<CSSProperties>,
): CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontSize: pxToRem(token.fontSizePx),
    lineHeight: token.lineHeight,
    letterSpacing: `${token.letterSpacingEm}em`,
    fontWeight: token.fontWeight,
    textTransform: token.textTransform,
    ...overrides,
  };
}
