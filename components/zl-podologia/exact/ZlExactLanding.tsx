import { ZlExactHeroPage } from "@/components/zl-podologia/exact/ZlExactHeroPage";
import { ZlExactServicesPage } from "@/components/zl-podologia/exact/ZlExactServicesPage";
import { ZlExactTrustPage } from "@/components/zl-podologia/exact/ZlExactTrustPage";

export function ZlExactLanding() {
  return (
    <main className="bg-[#f6ede5] py-3">
      <ZlExactHeroPage />
      <ZlExactServicesPage />
      <ZlExactTrustPage />
    </main>
  );
}
