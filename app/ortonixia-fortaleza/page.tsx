import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";
import { zlOrthonyxiaPage } from "@/components/zl-podologia/zlServiceClusterPages";

export const metadata = createZlSeoLandingMetadata(zlOrthonyxiaPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlOrthonyxiaPage);

export default function Page() {
  return (
    <>
      <script
        id="ortonixia-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlOrthonyxiaPage} />
    </>
  );
}
