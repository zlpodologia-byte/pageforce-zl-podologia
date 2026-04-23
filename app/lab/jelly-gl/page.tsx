import type { Metadata } from "next";
import { JellyWindowGL } from "@/components/jelly-window-gl/JellyWindowGL";

export const metadata: Metadata = {
  title: "Jelly lab · WebGL — Pageforce",
  robots: { index: false, follow: false },
};

// NOTE: Per-window WebGL context; low count while the approach is experimental.
// See components/jelly-window-gl/STATUS.md for the shared-canvas rework plan.
const WINDOWS = Array.from({ length: 4 }, (_, i) => ({
  id: `lab-gl-${String(i + 1).padStart(2, "0")}`,
  label: String(i + 1).padStart(2, "0"),
}));

export default function JellyGLLab() {
  return (
    <main
      className="min-h-[100dvh] w-full px-[clamp(1.5rem,4vw,4rem)] py-[clamp(3rem,6vw,5.5rem)]"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      <header className="mx-auto max-w-[78rem]">
        <p
          className="text-[0.66rem] uppercase tracking-[0.26em]"
          style={{ color: "rgba(0,0,0,0.45)" }}
        >
          Lab · jelly WebGL (OGL + Simplex)
        </p>
        <p
          className="mt-3 max-w-[52ch] text-[0.95rem] leading-[1.55]"
          style={{ color: "rgba(0,0,0,0.62)" }}
        >
          Ten windows. GPU-side vertex displacement: 3D Simplex noise drives a
          continuous organic wave along each silhouette, cursor proximity
          stacks a quartic bubble on top. Shader-driven — no CPU spring loop.
        </p>
      </header>

      <section
        className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] grid max-w-[78rem] place-items-center gap-[clamp(2rem,3vw,3rem)]"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
        }}
      >
        {WINDOWS.map((w) => (
          <JellyWindowGL key={w.id} id={w.id} label={w.label} />
        ))}
      </section>
    </main>
  );
}
