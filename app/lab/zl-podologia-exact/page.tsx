import type { Metadata } from "next";
import { ZlExactLanding } from "@/components/zl-podologia/exact/ZlExactLanding";

export const metadata: Metadata = {
  title: "ZL Podologia | Exact Landing",
  description:
    "Versao exata da landing da ZL Podologia baseada nos mockups gerados e nos assets reais da clinica.",
  alternates: { canonical: "/lab/zl-podologia-exact" },
};

export default function ZlPodologiaExactPage() {
  return <ZlExactLanding />;
}
