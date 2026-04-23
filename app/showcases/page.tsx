import type { Metadata } from "next";
import { ShowcasesHub } from "@/components/showcases/ShowcasesHub";
import { SHOWCASES } from "@/lib/showcases";

export const metadata: Metadata = {
  title: "Modelos por vertical · PageForce",
  description:
    "Identifique o modelo da sua operação e veja como a engrenagem PageForce aplica para a sua vertical.",
  alternates: { canonical: "/showcases" },
};

export default function ShowcasesPage() {
  return (
    <section className="container-x pt-[clamp(5rem,10vw,9rem)] pb-[clamp(4rem,8vw,7rem)]">
      <nav
        aria-label="Breadcrumb"
        className="mb-10 text-[13px] uppercase tracking-widest text-[color:var(--color-muted)]"
      >
        PageForce / Modelos por vertical
      </nav>
      <h1 className="sr-only">Modelos por vertical — PageForce</h1>
      <ShowcasesHub showcases={SHOWCASES} />
      <footer className="mt-[clamp(3rem,6vw,5rem)] border-t border-[color:var(--color-line)] pt-8 text-[color:var(--color-muted)]">
        Não viu a sua operação aqui? A engrenagem se adapta — fale pelo
        diagnóstico.
      </footer>
    </section>
  );
}
