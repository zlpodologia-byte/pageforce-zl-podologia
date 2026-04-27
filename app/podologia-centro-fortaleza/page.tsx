import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import { zlCentroPage } from "@/components/zl-podologia/zlNeighborhoodPages";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";

export const metadata = createZlSeoLandingMetadata(zlCentroPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlCentroPage);

export default function Page() {
  return (
    <>
      <script
        id="podologia-centro-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlCentroPage} />
    </>
  );
}
