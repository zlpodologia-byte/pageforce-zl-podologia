import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";
import { zlDiabeticFootPage } from "@/components/zl-podologia/zlServiceClusterPages";

export const metadata = createZlSeoLandingMetadata(zlDiabeticFootPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlDiabeticFootPage);

export default function Page() {
  return (
    <>
      <script
        id="pe-diabetico-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlDiabeticFootPage} />
    </>
  );
}
