import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";
import { zlReflexologyPage } from "@/components/zl-podologia/zlWellnessPages";

export const metadata = createZlSeoLandingMetadata(zlReflexologyPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlReflexologyPage);

export default function Page() {
  return (
    <>
      <script
        id="reflexologia-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlReflexologyPage} />
    </>
  );
}
