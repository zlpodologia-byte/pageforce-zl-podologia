import type { Metadata } from "next";
import { StandardLandingPage } from "@/components/landing-pages/StandardLandingPage";
import { getStandardLanding } from "@/lib/landing-pages";

const landing = getStandardLanding("odontologia");

export const metadata: Metadata = {
  title: "Odontologia landing · Lab · Pageforce",
  description: landing.headline,
  alternates: { canonical: "/lab/odontologia-landing" },
};

export default function OdontologiaLandingPage() {
  return <StandardLandingPage landing={landing} />;
}
