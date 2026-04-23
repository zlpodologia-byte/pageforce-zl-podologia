import { ExactScene } from "@/components/zl-podologia/exact/ZlExactAtoms";
import { ZlExactTrustContactSection } from "@/components/zl-podologia/exact/ZlExactTrustContactSection";
import { ZlExactTrustIntroSection } from "@/components/zl-podologia/exact/ZlExactTrustIntroSection";
import { ZlExactTrustKnowledgeSection } from "@/components/zl-podologia/exact/ZlExactTrustKnowledgeSection";

export function ZlExactTrustPage() {
  return (
    <ExactScene className="bg-[linear-gradient(180deg,#fffefd_0%,#fbf6f2_100%)]">
      <div id="clinica" className="px-5 py-8 sm:px-8 lg:px-14 lg:py-12 xl:px-16">
        <ZlExactTrustIntroSection />
        <ZlExactTrustKnowledgeSection />
        <ZlExactTrustContactSection />
      </div>
    </ExactScene>
  );
}
