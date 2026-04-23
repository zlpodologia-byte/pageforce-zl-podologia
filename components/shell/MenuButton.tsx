"use client";

import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import { useAppStore } from "@/lib/store";

const BUTTON_SIZE = 56;

/**
 * MenuButton — toggles the full-screen menu overlay.
 * Burger → X morph on open. Sits inside RightEdgeCurve on desktop, top-right on mobile.
 *
 * The circular chrome is a JellyBorder that breathes at rest and bulges toward
 * the cursor — same spring-physics perimeter as JellyWindow, shape="circle".
 * The border strokeColor inverts automatically: ink on the light canvas,
 * ivory when the menu is open and the canvas has inverted to dark.
 */
export function MenuButton() {
  const { menuOpen, toggleMenu } = useAppStore();

  return (
    <JellyBorder
      width={BUTTON_SIZE}
      height={BUTTON_SIZE}
      shape="circle"
      strokeColor={
        menuOpen ? "var(--color-ink-invert)" : "var(--color-ink)"
      }
      strokeWidth={1.25}
      maxBulge={6}
      influence={110}
      driftAmp={0.9}
    >
      <button
        type="button"
        data-menu-button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="main-menu-overlay"
        onClick={toggleMenu}
        data-cursor-target
        className="relative flex h-full w-full items-center justify-center"
      >
        <span className="sr-only">Menu</span>
        <span className="relative block h-4 w-6">
          <span
            className="absolute left-0 right-0 block h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              top: menuOpen ? "50%" : "2px",
              transform: menuOpen
                ? "translateY(-50%) rotate(45deg)"
                : "rotate(0)",
              background: menuOpen
                ? "var(--color-ink-invert)"
                : "var(--color-ink)",
            }}
          />
          <span
            className="absolute left-0 right-0 block h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              bottom: menuOpen ? "50%" : "2px",
              transform: menuOpen
                ? "translateY(50%) rotate(-45deg)"
                : "rotate(0)",
              background: menuOpen
                ? "var(--color-ink-invert)"
                : "var(--color-ink)",
            }}
          />
        </span>
      </button>
    </JellyBorder>
  );
}
