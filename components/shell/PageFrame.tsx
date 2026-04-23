/**
 * PageFrame — fixed coral gradient frame on all four edges of the viewport.
 * Always visible, always behind content, never interactive.
 * See docs/reference-audit.md §5.1.
 */
export function PageFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `
          radial-gradient(120% 80% at 100% 50%, rgba(245,213,196,0.55) 0%, transparent 35%),
          radial-gradient(120% 80% at 0% 50%,   rgba(245,213,196,0.45) 0%, transparent 35%),
          radial-gradient(120% 60% at 50% 0%,   rgba(255,238,228,0.40) 0%, transparent 28%),
          radial-gradient(120% 60% at 50% 100%, rgba(247,226,212,0.45) 0%, transparent 30%)
        `,
      }}
    />
  );
}
