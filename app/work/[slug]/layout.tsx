import type { Metadata } from "next";
import { getCase } from "@/lib/cases";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);

  if (!item) {
    return {};
  }

  return {
    alternates: {
      canonical: `/work/${item.slug}`,
    },
    openGraph: {
      url: `/work/${item.slug}`,
    },
  };
}

export default function WorkCaseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
