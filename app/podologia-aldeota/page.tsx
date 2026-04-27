import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import { zlAldeotaPage } from "@/components/zl-podologia/zlNeighborhoodPages";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";

export const metadata = createZlSeoLandingMetadata(zlAldeotaPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlAldeotaPage);

export default function Page() {
  return (
    <>
      <script
        id="podologia-aldeota-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlAldeotaPage} />
    </>
  );
}
