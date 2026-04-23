import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form/ContactForm";
import { Reveal, RevealLines } from "@/components/reveal/Reveal";

export const metadata: Metadata = {
  title: "Falar com a operação — Pageforce",
  description:
    "Pedir diagnóstico, abrir conversa de escopo ou enviar uma observação curta para a operação Pageforce.",
};

const DIRECT_CONTACTS = [
  { label: "Operação", href: "mailto:hello@pageforce.studio", value: "hello@pageforce.studio" },
  { label: "Novos projetos", href: "mailto:newprojects@pageforce.studio", value: "newprojects@pageforce.studio" },
  { label: "Imprensa", href: "mailto:press@pageforce.studio", value: "press@pageforce.studio" },
  { label: "Carreiras", href: "mailto:careers@pageforce.studio", value: "careers@pageforce.studio" },
] as const;

export default function ContactPage() {
  return (
    <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(7rem,11vw,10rem)]">
      <div className="max-w-[48rem]">
        <Reveal
          as="p"
          className="text-[0.72rem] uppercase tracking-[0.28em] text-[rgba(0,0,0,0.58)]"
        >
          Falar com a operação
        </Reveal>

        <RevealLines
          as="h1"
          lines={["Conte o essencial.", "Devolvemos o caminho."]}
          className="mt-5 text-balance text-[clamp(2.9rem,7vw,6.2rem)] leading-[0.92] tracking-[-0.055em] text-[var(--color-ink)]"
          lineClassName="block"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        />

        <Reveal
          as="p"
          delay={180}
          className="mt-6 max-w-[44ch] text-[1rem] leading-[1.55] text-[rgba(0,0,0,0.68)]"
        >
          Para diagnóstico ou escopo principal, prefira o formulário do diagnóstico — ele já direciona o pedido. Esta página é para tudo o que cabe em uma mensagem curta.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-12 border-t border-[var(--color-line)] pt-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:gap-16 lg:pt-12">
        <Reveal as="div">
          <ContactForm />
        </Reveal>

        <Reveal as="aside" delay={120} className="lg:pt-2">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgba(247,226,212,0.18)] p-[clamp(1.5rem,3vw,2.2rem)]">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(0,0,0,0.58)]">
              E-mail direto
            </p>

            <ul className="mt-6 space-y-6">
              {DIRECT_CONTACTS.map((item) => (
                <li key={item.label}>
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(0,0,0,0.45)]">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="link-underline mt-2 inline-flex text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.2] tracking-[-0.03em] text-[var(--color-ink)]"
                    data-cursor-target
                    data-cursor-label="Escrever"
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[28ch] border-t border-[var(--color-line)] pt-6 text-[0.95rem] leading-[1.7] text-[rgba(0,0,0,0.65)]">
              A operação responde mensagens novas em até dois dias úteis.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
