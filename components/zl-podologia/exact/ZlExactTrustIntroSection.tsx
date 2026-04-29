import { ExactActionButton } from "@/components/zl-podologia/exact/ZlExactAtoms";
import {
  ExactInfoPill,
  ExactSectionHeader,
} from "@/components/zl-podologia/exact/ZlExactTrustPrimitives";
import {
  ZlExactGalleryCard,
  ZlExactProfileCard,
} from "@/components/zl-podologia/exact/ZlExactTrustBlocks";
import {
  zlLinks,
  zlProfessionals,
  zlTeamHeadline,
} from "@/components/zl-podologia/zlPodologiaContent";

export function ZlExactTrustIntroSection() {
  const teamMembers = zlProfessionals.slice(0, 2);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#0F6B46]">
            {zlTeamHeadline.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-[11ch] text-[clamp(2.8rem,5vw,4.9rem)] leading-[0.92] tracking-[-0.05em] text-[#32261f]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Profissionais que cuidam com ciencia, escuta e delicadeza.
          </h2>
          <p className="mt-5 max-w-[34ch] text-[1rem] leading-[1.75] text-[#6d5a4c]">
            Na ZL Podologia, cada tratamento comeca com atencao real. Unimos
            tecnica, experiencia e empatia para promover saude, conforto e
            bem-estar desde o primeiro passo.
          </p>
          <div className="mt-7">
            <ExactActionButton href={zlLinks.whatsapp} label="Conheca nossa equipe" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#D9DAD7] bg-[#fcf7f3] p-3 shadow-[0_20px_50px_rgba(123,98,78,0.1)]">
          <div className={`grid gap-3 ${teamMembers.length > 1 ? "md:grid-cols-2" : ""}`}>
            {teamMembers.map((member) => (
              <ZlExactProfileCard
                key={member.name}
                name={member.name}
                role={member.role}
                description={member.description}
                src={member.photo?.src ?? "/zl-podologia/avatar.jpg"}
                alt={member.photo?.alt ?? member.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-[#ede2da] pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ExactSectionHeader
            eyebrow="Experiencia ZL"
            title="Um espaco pensado para o seu conforto e bem-estar."
            body="Clinica clara, sala reservada, atendimento sem correria e uma leitura visual que transmite tecnica sem perder o acolhimento."
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <ZlExactGalleryCard
              src="/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg"
              alt="Sala institucional da ZL Podologia"
              wide
            />
            <ZlExactGalleryCard
              src="/zl-podologia/social/ambiente/zucarina-atendendo-01.jpg"
              alt="Atendimento individualizado na ZL Podologia"
            />
            <ZlExactGalleryCard
              src="/zl-podologia/social/edited-pro/marca/fachada-clinica-sem-grade-2026-04-28.jpg"
              alt="Fachada da clinica ZL Podologia em Fortaleza"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ExactInfoPill icon="heart">Ambiente acolhedor e climatizado</ExactInfoPill>
          <ExactInfoPill icon="spark">Tecnologia avancada</ExactInfoPill>
          <ExactInfoPill icon="shield">Protocolos seguros e individualizados</ExactInfoPill>
          <ExactInfoPill icon="check">Materiais esterilizados</ExactInfoPill>
          <ExactInfoPill icon="clock">Privacidade em cada detalhe</ExactInfoPill>
        </div>
      </div>
    </>
  );
}
