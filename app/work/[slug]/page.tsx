import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseContentBlock } from "@/components/case-content/CaseContentBlock";
import { CaseHeader } from "@/components/case-header/CaseHeader";
import { NextCase } from "@/components/case-next/NextCase";
import { CASES, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);

  if (!item) {
    return { title: "Case not found - Pageforce" };
  }

  return { title: `${item.client} - Pageforce`, description: item.summary };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCase(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <CaseHeader item={item} />
      <article className="pb-[clamp(2rem,4vw,3rem)] pt-[clamp(1rem,2vw,1.5rem)]">
        {item.content.map((block, index) => (
          <CaseContentBlock block={block} key={`${item.slug}-${index}`} />
        ))}
        {item.content.length === 0 ? <EmptyCaseNote client={item.client} /> : null}
      </article>
      <NextCase current={item.slug} />
    </>
  );
}

function EmptyCaseNote({ client }: { client: string }) {
  return (
    <section className="container-x py-[clamp(4rem,8vw,6rem)]">
      <div className="mx-auto max-w-[42rem] rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-ink-invert)] px-6 py-8 text-center sm:px-10 sm:py-10">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Em construção
        </p>
        <h2
          className="mt-4 text-[clamp(2rem,4vw,3.25rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 0.96,
            letterSpacing: "-0.045em",
          }}
        >
          Estudo de caso em breve.
        </h2>
        <p className="mx-auto mt-4 max-w-[32rem] text-[1rem] leading-[1.6] text-[var(--color-muted)]">
          A rota e o hero já estão no ar para {client}. Os blocos com diagnóstico, processo e resultado entram à medida que a operação amadurece.
        </p>
      </div>
    </section>
  );
}
