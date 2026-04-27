import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import { zlMessejanaPage } from "@/components/zl-podologia/zlNeighborhoodPages";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";

export const metadata = createZlSeoLandingMetadata(zlMessejanaPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlMessejanaPage);

export default function Page() {
  return (
    <>
      <script
        id="podologia-messejana-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlMessejanaPage} />
    </>
  );
}
