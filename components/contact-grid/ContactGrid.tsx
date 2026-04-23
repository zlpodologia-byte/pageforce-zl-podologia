import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";

interface ContactItem {
  eyebrow: string;
  title: string;
  href: string;
  value: string;
  cursorLabel: string;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    eyebrow: "Quer ver onde está vazando?",
    title: "Pedir diagnóstico",
    href: "/diagnostic",
    value: "Diagnosticar a operação",
    cursorLabel: "Diagnosticar",
  },
  {
    eyebrow: "Quer falar direto?",
    title: "Operação no WhatsApp",
    href: "https://wa.me/",
    value: "Chamar no WhatsApp",
    cursorLabel: "Chamar",
  },
  {
    eyebrow: "Quer ver o sistema?",
    title: "Conhecer a oferta",
    href: "/services",
    value: "Ver os quatro níveis",
    cursorLabel: "Ver",
  },
  {
    eyebrow: "Quer entender por dentro?",
    title: "Conhecer a esteira",
    href: "/about",
    value: "Ver a esteira por agentes",
    cursorLabel: "Conhecer",
  },
] as const;

function ContactTile({ eyebrow, title, href, value, cursorLabel }: ContactItem) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const sharedAnchorClass =
    "link-underline mt-6 inline-flex min-h-11 max-w-[16ch] items-end text-[clamp(1.8rem,3vw,3.15rem)] leading-[0.94] tracking-[-0.045em] text-[var(--color-ink)]";
  const sharedAnchorStyle = {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    overflowWrap: "anywhere",
  } as const;

  return (
    <div className="flex min-h-[15rem] flex-col justify-between px-[clamp(1.4rem,3vw,2.2rem)] py-[clamp(1.5rem,3vw,2rem)]">
      <div>
        <p className="text-[0.9rem] italic leading-[1.5] text-[var(--color-muted)]">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-[clamp(1.05rem,1.4vw,1.35rem)] font-semibold leading-[1.15] text-[var(--color-ink)]">
          {title}
        </h3>
      </div>

      {isExternal ? (
        <a
          href={href}
          className={sharedAnchorClass}
          data-cursor-target
          data-cursor-label={cursorLabel}
          style={sharedAnchorStyle}
        >
          {value}
        </a>
      ) : (
        <Link
          href={href}
          className={sharedAnchorClass}
          data-cursor-target
          data-cursor-label={cursorLabel}
          style={sharedAnchorStyle}
        >
          {value}
        </Link>
      )}
    </div>
  );
}

function IllustrationPanel() {
  return (
    <div className="flex min-h-[19rem] items-end justify-center overflow-hidden bg-[rgba(247,226,212,0.35)] px-[clamp(1.25rem,3vw,2rem)] pt-[clamp(1.5rem,4vw,2rem)] text-[var(--color-ink)]">
      <Reveal as="div" className="w-full max-w-[28rem]">
        <Image
          src="/illustrations/desk-person.svg"
          alt="Ilustração de pessoa em uma mesa de operação"
          width={720}
          height={520}
          className="h-auto w-full"
          sizes="(min-width: 1280px) 32vw, (min-width: 768px) 60vw, 92vw"
        />
      </Reveal>
    </div>
  );
}

export function ContactGrid() {
  const [first, second, third, fourth] = CONTACT_ITEMS;

  return (
    <section
      className="container-x pb-[clamp(5rem,8vw,8rem)]"
      aria-labelledby="contact-grid-heading"
    >
      <h2 id="contact-grid-heading" className="sr-only">
        Falar com a Pageforce
      </h2>

      <div className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] lg:hidden">
        <IllustrationPanel />

        <div className="grid border-t border-[var(--color-line)] md:grid-cols-2">
          <div className="md:border-r md:border-[var(--color-line)]">
            <Reveal as="div">
              <ContactTile {...first} />
            </Reveal>
          </div>
          <div className="border-t border-[var(--color-line)] md:border-t-0">
            <Reveal as="div" delay={90}>
              <ContactTile {...second} />
            </Reveal>
          </div>
          <div className="border-t border-[var(--color-line)] md:border-r md:border-[var(--color-line)]">
            <Reveal as="div" delay={140}>
              <ContactTile {...third} />
            </Reveal>
          </div>
          <div className="border-t border-[var(--color-line)]">
            <Reveal as="div" delay={210}>
              <ContactTile {...fourth} />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-[2rem] border border-[var(--color-line)] lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="row-span-2 border-r border-[var(--color-line)]">
          <IllustrationPanel />
        </div>

        <div className="border-r border-[var(--color-line)]">
          <Reveal as="div">
            <ContactTile {...first} />
          </Reveal>
        </div>
        <div>
          <Reveal as="div" delay={90}>
            <ContactTile {...second} />
          </Reveal>
        </div>
        <div className="border-r border-t border-[var(--color-line)]">
          <Reveal as="div" delay={140}>
            <ContactTile {...third} />
          </Reveal>
        </div>
        <div className="border-t border-[var(--color-line)]">
          <Reveal as="div" delay={210}>
            <ContactTile {...fourth} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
