import Image from "next/image";
import { ExactActionButton, ExactGlyph, ExactScene } from "@/components/zl-podologia/exact/ZlExactAtoms";
import { ZlExactCasePair } from "@/components/zl-podologia/exact/ZlExactCasePair";
import {
  zlExactCareSteps,
  zlExactPricingCards,
  zlExactServiceCards,
} from "@/components/zl-podologia/exact/ZlExactServicesData";
import { ExactSectionHeader } from "@/components/zl-podologia/exact/ZlExactTrustPrimitives";
import { zlLinks } from "@/components/zl-podologia/zlPodologiaContent";

export function ZlExactServicesPage() {
  return (
    <ExactScene>
      <div className="px-5 py-8 sm:px-8 lg:px-14 lg:py-12 xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c69184]">
              Nossos servicos
            </p>
            <h2
              className="mt-4 max-w-[10ch] text-[clamp(2.6rem,5vw,4.7rem)] leading-[0.92] tracking-[-0.05em] text-[#32261f]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Solucoes completas para a saude dos seus pes.
            </h2>
            <p className="mt-5 max-w-[32ch] text-[1rem] leading-[1.75] text-[#6d5a4c]">
              Protocolos clinicos individualizados, tecnologia avancada e um
              olhar cuidadoso para cada detalhe da sua saude.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#eadfd8] bg-[#faf4ef] shadow-[0_22px_50px_rgba(123,98,78,0.1)]">
            <div className="relative aspect-[1.65]">
              <Image
                src="/zl-podologia/social/edited-pro/equipe/profissional-contexto-humano-pro.jpg"
                alt="Profissional da ZL Podologia em atendimento clinico com atmosfera clara e acolhedora"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover object-[50%_28%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,251,248,0.92)_0%,rgba(255,251,248,0.28)_44%,rgba(255,251,248,0.08)_100%)]" />
            </div>
          </div>
        </div>

        <div id="servicos" className="mt-12 rounded-[2rem] border border-[#eee1d9] bg-[#fdf9f6] p-5 sm:p-7">
          <ExactSectionHeader
            eyebrow="O que tratamos"
            title="Servicos organizados do jeito que a paciente entende."
            body="Cada bloco resolve uma dor clara, mostra o cuidado clinico e conduz para o proximo passo sem parecer tabela fria."
            align="center"
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {zlExactServiceCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.7rem] border border-[#ebdfd8] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(123,98,78,0.06)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f0e1d8] bg-[#fff4ef] text-[#c69184]">
                  <ExactGlyph kind={card.icon} className="h-5 w-5" />
                </span>
                <h3
                  className="mt-5 text-[1.6rem] leading-[1.02] tracking-[-0.03em] text-[#352822]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p className="mt-4 text-[0.94rem] leading-[1.7] text-[#6d5a4c]">{card.body}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[0.82rem] uppercase tracking-[0.16em] text-[#d48678]">
                  <span>Saiba mais</span>
                  <ExactGlyph kind="arrow" className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c69184]">
                Resultados que voce ve e sente
              </p>
              <h3
                className="mt-4 text-[clamp(2.3rem,4vw,3.7rem)] leading-[0.94] tracking-[-0.04em] text-[#32261f]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Casos e resultados reais
              </h3>
            </div>
            <ExactActionButton
              href={zlLinks.instagram}
              label="Ver mais casos reais"
              kind="secondary"
              icon="arrow"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <ZlExactCasePair
              title="Unha encravada"
              body="Chegada com dor e inflamacao localizada, seguida de alivio e orientacao de continuidade."
              beforeSrc="/zl-podologia/social/antes-depois/encravada-01-chegada.jpg"
              afterSrc="/zl-podologia/social/antes-depois/encravada-05-alivio-bandagem.jpg"
            />
            <ZlExactCasePair
              title="Diagnostico e protocolo"
              body="Leitura tecnica do caso, cuidado indicado e orientacao de retorno quando necessario."
              beforeSrc="/zl-podologia/social/antes-depois/encravada-02-diagnostico.jpg"
              afterSrc="/zl-podologia/social/antes-depois/encravada-04-azul-metileno.jpg"
            />
            <ZlExactCasePair
              title="Podoprofilaxia e conforto"
              body="Tratamento mais leve, completo e cuidadoso, com tecnica para prevencao e manutencao."
              beforeSrc="/zl-podologia/social/edited-pro/procedimentos/rotativo-procedimento-pro.jpg"
              afterSrc="/zl-podologia/social/edited-pro/procedimentos/pos-cuidado-curativo-pro.jpg"
            />
          </div>
        </div>

        <div className="mt-14 border-t border-[#ede2da] pt-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:items-start">
            <ExactSectionHeader
              eyebrow="Como funciona"
              title="Seu cuidado em cada etapa."
              body="Um protocolo claro, seguro e personalizado para voce ter os melhores resultados."
            />
            <div className="grid gap-4 lg:grid-cols-4">
              {zlExactCareSteps.map((step) => (
                <div key={step.title} className="rounded-[1.4rem] border border-[#eadfd8] bg-white p-5 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#eadfd8] bg-[#fff4ef] text-[#c69184]">
                    <ExactGlyph kind={step.icon} className="h-5 w-5" />
                  </span>
                  <h4
                    className="mt-4 text-[1.2rem] leading-[1.02] tracking-[-0.03em] text-[#352822]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {step.title}
                  </h4>
                  <p className="mt-3 text-[0.88rem] leading-[1.6] text-[#6d5a4c]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="tratamentos" className="mt-14 border-t border-[#ede2da] pt-12">
          <ExactSectionHeader
            eyebrow="Investimento em saude e bem-estar"
            title="Precos transparentes."
            body="Valores organizados para a paciente ter nocao do investimento antes do contato. Ajustes finos continuam acontecendo pelo diagnostico real do caso."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-6">
            {zlExactPricingCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-[1.5rem] border border-[#eadfd8] bg-[#fffdfb] p-5 shadow-[0_12px_28px_rgba(123,98,78,0.05)]"
              >
                <h4
                  className="min-h-[3.25rem] text-[1.18rem] leading-[1.05] tracking-[-0.03em] text-[#352822]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {card.title}
                </h4>
                <p className="mt-5 text-[1.95rem] leading-none tracking-[-0.04em] text-[#5f85c4]">
                  {card.price}
                </p>
                <p className="mt-4 grow text-[0.86rem] leading-[1.6] text-[#6d5a4c]">{card.note}</p>
                <div className="mt-5">
                  <ExactActionButton
                    href={zlLinks.whatsapp}
                    label="Agendar agora"
                    kind="secondary"
                    icon="calendar"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-[#eadfd8] bg-[linear-gradient(180deg,#fff8f4_0%,#fcf4ef_100%)] shadow-[0_20px_44px_rgba(123,98,78,0.08)]">
          <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="relative min-h-[22rem]">
              <Image
                src="/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg"
                alt="Ambiente interno claro e acolhedor da ZL Podologia"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c69184]">
                Pronta para cuidar de voce?
              </p>
              <h3
                className="mt-4 max-w-[12ch] text-[clamp(2.4rem,4vw,4rem)] leading-[0.92] tracking-[-0.05em] text-[#32261f]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Agende seu atendimento e de o primeiro passo para pes saudaveis e sem dor.
              </h3>
              <div className="mt-6 grid gap-3 text-[0.94rem] leading-[1.6] text-[#6d5a4c]">
                <p>Atendimento humanizado</p>
                <p>Tecnologia e tecnicas avancadas</p>
                <p>Ambiente seguro e acolhedor</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <ExactActionButton href={zlLinks.whatsappFinalCta} label="Agendar horario" />
                <ExactActionButton href={zlLinks.maps} label="Falar pelo mapa" kind="secondary" icon="pin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExactScene>
  );
}
