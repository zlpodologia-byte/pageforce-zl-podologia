import type { Metadata } from "next";
import { StandardLandingPage } from "@/components/landing-pages/StandardLandingPage";
import { getStandardLanding } from "@/lib/landing-pages";

const landing = getStandardLanding("estetica");

export const metadata: Metadata = {
  title: "Estetica landing · Lab · Pageforce",
  description: landing.headline,
  alternates: { canonical: "/lab/estetica-landing" },
};

export default function EsteticaLandingPage() {
  return <StandardLandingPage landing={landing} />;
}
