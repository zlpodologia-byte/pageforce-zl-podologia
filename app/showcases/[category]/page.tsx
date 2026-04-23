import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShowcase, SHOWCASES } from "@/lib/showcases";
import { ShowcaseModel } from "@/components/showcase-model/ShowcaseModel";

type Params = { category: string };

export function generateStaticParams() {
  return SHOWCASES.map((s) => ({ category: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const s = getShowcase(category);
  if (!s) return { title: "Modelo não encontrado · PageForce" };
  return {
    title: `${s.label} · Modelo PageForce`,
    description: s.hookLine,
    alternates: { canonical: `/showcases/${s.slug}` },
  };
}

export default async function ShowcaseCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const showcase = getShowcase(category);
  if (!showcase) notFound();
  return <ShowcaseModel showcase={showcase} />;
}
