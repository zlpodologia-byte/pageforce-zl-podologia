import { ZlSeoLandingPage } from "@/components/zl-podologia/ZlSeoLandingPage";
import { zlCidadeDosFuncionariosPage } from "@/components/zl-podologia/zlNeighborhoodPages";
import {
  buildZlSeoLandingJsonLd,
  createZlSeoLandingMetadata,
} from "@/components/zl-podologia/zlSeoLandingMeta";

export const metadata = createZlSeoLandingMetadata(zlCidadeDosFuncionariosPage);
const SCHEMA_JSON_LD = buildZlSeoLandingJsonLd(zlCidadeDosFuncionariosPage);

export default function Page() {
  return (
    <>
      <script
        id="podologia-cidade-dos-funcionarios-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlSeoLandingPage page={zlCidadeDosFuncionariosPage} />
    </>
  );
}
