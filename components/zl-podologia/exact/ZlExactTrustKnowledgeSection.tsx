import Image from "next/image";
import { ExactActionButton } from "@/components/zl-podologia/exact/ZlExactAtoms";
import {
  ExactBulletCard,
  ExactSectionHeader,
} from "@/components/zl-podologia/exact/ZlExactTrustPrimitives";
import { ZlExactComparePanel } from "@/components/zl-podologia/exact/ZlExactTrustBlocks";
import {
  zlExactAudienceCards,
  zlExactEducationCards,
  zlExactJourney,
  zlExactPodologyBullets,
  zlExactTriageBullets,
} from "@/components/zl-podologia/exact/ZlExactTrustData";
import { zlLinks } from "@/components/zl-podologia/zlPodologiaContent";

export function ZlExactTrustKnowledgeSection() {
  return (
    <>
      <div id="para-voce" className="mt-14 border-t border-[#ede2da] pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div>
            <ExactSectionHeader
              eyebrow="O que e podologia?"
              title="Muito alem da estetica. E saude dos pes."
              body="A podologia cuida e previne alteracoes nos pes e unhas. Alivia dores, organiza o cuidado e melhora sua qualidade de vida com seguranca."
            />
            <div className="mt-7 rounded-[2rem] border border-[#e7d7cc] bg-[#faf4ef] p-5 shadow-[0_16px_40px_rgba(123,98,78,0.08)]">
              <div className="relative aspect-[1.45] overflow-hidden rounded-[1.4rem] border border-[#e7d7cc] bg-white">
                <svg viewBox="0 0 820 540" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <rect width="820" height="540" fill="#fcf8f4" />
                  <circle cx="470" cy="270" r="150" fill="none" stroke="#e7d7cc" strokeWidth="3" />
                  <path d="M370 150c-20 58-22 118-6 176 15 57 49 108 109 138 47 23 102 25 151 12" fill="none" stroke="#cda89a" strokeWidth="4" strokeLinecap="round" />
                  <path d="M470 160c12 68 4 128-22 180" fill="none" stroke="#e2b7af" strokeWidth="4" strokeLinecap="round" />
                  <path d="M355 365c68-14 131-12 196 7" fill="none" stroke="#d7a3a0" strokeWidth="4" strokeLinecap="round" />
                  <path d="M565 200c27 33 37 71 29 118" fill="none" stroke="#9a7f5c" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="absolute bottom-5 left-5 max-w-[17rem] rounded-[1.2rem] border border-[#e7d7cc] bg-white/90 p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#9a7f5c]">Saude dos pes</p>
                  <p className="mt-2 text-[0.9rem] leading-[1.6] text-[#5f4d40]">
                    Dor ao andar, unha encravada, calos, fungos, fissuras e pes
                    sensiveis sao bons motivos para buscar atendimento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e7d7cc] bg-[#fcf8f4] p-5 shadow-[0_16px_40px_rgba(123,98,78,0.08)]">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[#9a7f5c]">
              Podologia clinica
            </p>
            <h3
              className="mt-4 text-[clamp(1.8rem,3vw,2.7rem)] leading-[0.98] tracking-[-0.04em] text-[#32261f]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Entenda como a ZL direciona o cuidado
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ZlExactComparePanel title="Podologia" items={zlExactPodologyBullets} good />
              <ZlExactComparePanel title="Antes do horario" items={zlExactTriageBullets} good />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-[#ede2da] pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
          <ExactSectionHeader
            eyebrow="Para quem e"
            title="Seus pes merecem atencao em todas as fases da vida."
            body="A referencia clinica da ZL serve quem sente dor, quem quer prevencao e quem precisa de um cuidado mais seguro e individualizado."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {zlExactAudienceCards.map((card) => (
              <ExactBulletCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                body="Atendimento pensado para o contexto real de cada paciente."
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-[#ede2da] pt-12">
        <ExactSectionHeader
          eyebrow="Jornada do paciente"
          title="Do primeiro contato ao bem-estar continuo."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-6">
          {zlExactJourney.map((item, index) => (
            <div key={item} className="rounded-[1.35rem] border border-[#e7d7cc] bg-[#fcf8f4] p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7d7cc] bg-white text-[0.8rem] font-medium text-[#9a7f5c]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[0.9rem] leading-[1.55] text-[#4a3a31]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 border-t border-[#ede2da] pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="overflow-hidden rounded-[2rem] border border-[#e7d7cc] bg-[#fcf8f4] shadow-[0_16px_40px_rgba(123,98,78,0.08)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/zl-podologia/social/edited-pro/procedimentos/closeup-clinico-sensivel-pro.jpg"
                alt="Procedimento podologico com tecnica delicada e ambiente clinico acolhedor"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <ExactSectionHeader
              eyebrow="Educacao que transforma"
              title="Informacao de qualidade para escolhas conscientes."
              body="A ZL compartilha conteudo para que voce entenda, previna e cuide melhor da saude dos pes todos os dias."
            />
            <div className="mt-6">
              <ExactActionButton href={zlLinks.instagram} label="Acesse nosso Instagram" icon="arrow" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {zlExactEducationCards.map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-[1.3rem] border border-[#e7d7cc] bg-[#fcf8f4] shadow-[0_14px_34px_rgba(123,98,78,0.08)]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={card.src}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1024px) 16vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[0.9rem] leading-[1.55] text-[#4a3a31]">{card.title}</p>
                    <p className="mt-2 text-[0.82rem] leading-[1.65] text-[#6d5a4c]">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
