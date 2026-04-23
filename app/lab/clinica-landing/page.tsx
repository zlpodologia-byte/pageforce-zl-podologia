import type { Metadata } from "next";
import { StandardLandingPage } from "@/components/landing-pages/StandardLandingPage";
import { getStandardLanding } from "@/lib/landing-pages";

const landing = getStandardLanding("clinica");

export const metadata: Metadata = {
  title: "Clinica landing · Lab · Pageforce",
  description: landing.headline,
  alternates: { canonical: "/lab/clinica-landing" },
};

export default function ClinicaLandingPage() {
  return <StandardLandingPage landing={landing} />;
}
