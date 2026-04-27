import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";
import { zlPodoprofilaxiaPage } from "@/components/zl-podologia/zlServiceClusterPages";

export const metadata = createZlSeoLandingMetadata(zlPodoprofilaxiaPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlPodoprofilaxiaPage);

export default function Page() {
  return (
    <>
      <script
        id="podoprofilaxia-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlPodoprofilaxiaPage} />
    </>
  );
}
