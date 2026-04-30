import { Ibarra_Real_Nova, Inter_Tight, Lora, Outfit } from "next/font/google";

/**
 * Display serif — open-licensed substitute for the reference's wedge-serif display face.
 * Kept available for legacy Pageforce routes that still style via --font-display-family.
 * See docs/reference-audit.md §2.2.
 */
export const displayLegacy = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-legacy-family",
  display: "swap",
});

/**
 * Sans — open-licensed substitute for the reference's neo-grotesque sans.
 * Kept for legacy Pageforce routes.
 */
export const sansLegacy = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-sans-legacy-family",
  display: "swap",
});

/**
 * Primary display face — Lora keeps the editorial serif tone without the
 * exaggerated f/J swashes that hurt readability in the ZL review.
 */
export const display = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-family",
  display: "swap",
});

/**
 * Primary body face — Outfit, grotesk with a soft geometric tone that
 * matches the clinic aesthetic without the "Inter everywhere" smell.
 */
export const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-sans-family",
  display: "swap",
});
