import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";

export const metadata: Metadata = {
  title: "Produto — Pageforce",
  description:
    "Frente de produto interno da Pageforce. Em construção — a página principal da oferta vive em /services.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Produto — Pageforce",
    description:
      "Frente de produto interno da Pageforce. Em construção.",
    url: "/product",
  },
};

export default function ProductPage() {
  return (
    <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <div className="max-w-[48rem]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          Frente de produto
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="mt-4 max-w-[18ch] text-[clamp(2.6rem,7vw,5.4rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          Em construção.
        </Reveal>
        <Reveal
          as="p"
          delay={180}
          className="mt-8 max-w-[44ch] text-[clamp(1.05rem,1.5vw,1.32rem)] leading-[1.52] text-[var(--color-ink)]"
        >
          A frente de produto interno da Pageforce ainda está sendo desenhada. Para conhecer a oferta principal — diagnóstico, engrenagem comercial, recorrência —, vá direto para os serviços ou peça o diagnóstico.
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-[0.72rem] uppercase tracking-[0.24em]">
          <Link
            href="/services"
            data-cursor-target
            className="link-underline text-[var(--color-ink)]"
          >
            Ver os quatro níveis
          </Link>
          <span aria-hidden="true" className="text-[var(--color-muted)]">
            ·
          </span>
          <Link
            href="/diagnostic"
            data-cursor-target
            className="link-underline text-[var(--color-ink)]"
          >
            Pedir diagnóstico
          </Link>
        </div>
      </div>
    </section>
  );
}
