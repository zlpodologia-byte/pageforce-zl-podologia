import Link from "next/link";
import { FooterNewsletterForm } from "./FooterNewsletterForm";

interface FooterLink {
  href: string;
  label: string;
}

const NAV_LINKS: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/work", label: "Work" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIAL_LINKS: FooterLink[] = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://wa.me/", label: "WhatsApp" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-canvas)]">
      <div className="container-x pb-[clamp(2rem,4vw,3rem)] pt-[clamp(3rem,6vw,4rem)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.75fr)_minmax(0,0.75fr)]">
          <section aria-labelledby="footer-tagline-heading">
            <p
              id="footer-tagline-heading"
              className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
            >
              A engrenagem
            </p>
            <p
              className="mt-5 max-w-[36ch] text-[clamp(1.15rem,1.7vw,1.45rem)] leading-[1.4] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              A Pageforce constrói e opera a infraestrutura digital que torna negócios locais e regionais mais visíveis, mais organizados e mais preparados para captar e converter demanda com previsibilidade.
            </p>
            <p className="mt-5 max-w-[44ch] text-[0.92rem] leading-[1.55] text-[var(--color-muted)]">
              Operação enxuta, esteira por agentes, foco em sistema e não em peça. Atende em todo o Brasil — sem endereço fixo de agência.
            </p>
          </section>

          <nav aria-labelledby="footer-links-heading">
            <p
              id="footer-links-heading"
              className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
            >
              Mapa
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline inline-flex min-h-11 items-center text-[0.96rem] text-[var(--color-ink)]"
                    data-cursor-target
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-social-heading">
            <p
              id="footer-social-heading"
              className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
            >
              Canais
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex min-h-11 items-center text-[0.96rem] text-[var(--color-ink)]"
                    data-cursor-target
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--color-line)] pt-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2 text-[0.82rem] leading-[1.5] text-[var(--color-muted)] xl:flex-row xl:items-center xl:gap-4">
            <p>
              {"\u00a9"} {year} Pageforce
            </p>
            <span aria-hidden="true" className="hidden xl:block">
              |
            </span>
            <p>Não vendemos site. Vendemos engrenagem.</p>
          </div>

          <div className="w-full lg:w-auto">
            <p className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Newsletter
            </p>
            <FooterNewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
