import type { Metadata } from "next";
import { JellyWindow } from "@/components/jelly-window/JellyWindow";

export const metadata: Metadata = {
  title: "Jelly lab — Pageforce",
  robots: { index: false, follow: false },
};

const WINDOWS = Array.from({ length: 10 }, (_, i) => ({
  id: `lab-${String(i + 1).padStart(2, "0")}`,
  label: String(i + 1).padStart(2, "0"),
}));

export default function JellyLab() {
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
          Lab · jelly edges
        </p>
        <p
          className="mt-3 max-w-[52ch] text-[0.95rem] leading-[1.55]"
          style={{ color: "rgba(0,0,0,0.62)" }}
        >
          Ten windows. Only the edges react to the cursor. Move around the grid — the closer the pointer,
          the more the nearby stretch of outline ripples while the rest stays crisp.
        </p>
      </header>

      <section
        className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] grid max-w-[78rem] place-items-center gap-[clamp(2rem,3vw,3rem)]"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
        }}
      >
        {WINDOWS.map((w) => (
          <JellyWindow key={w.id} id={w.id} label={w.label} />
        ))}
      </section>
    </main>
  );
}
