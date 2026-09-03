import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";
import { zlFootMassagePage } from "@/components/zl-podologia/zlWellnessPages";

export const metadata = createZlSeoLandingMetadata(zlFootMassagePage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlFootMassagePage);

export default function Page() {
  return (
    <>
      <script
        id="massagem-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlFootMassagePage} />
    </>
  );
}
