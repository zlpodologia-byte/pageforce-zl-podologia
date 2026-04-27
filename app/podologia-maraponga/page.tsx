import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import { zlMarapongaPage } from "@/components/zl-podologia/zlNeighborhoodPages";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";

export const metadata = createZlSeoLandingMetadata(zlMarapongaPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlMarapongaPage);

export default function Page() {
  return (
    <>
      <script
        id="podologia-maraponga-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlMarapongaPage} />
    </>
  );
}
