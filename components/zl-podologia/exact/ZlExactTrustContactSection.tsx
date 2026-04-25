"use client";

import { useState } from "react";
import { ExactActionButton } from "@/components/zl-podologia/exact/ZlExactAtoms";
import { ZlExactClosingPoint } from "@/components/zl-podologia/exact/ZlExactTrustBlocks";
import { ExactSectionHeader } from "@/components/zl-podologia/exact/ZlExactTrustPrimitives";
import {
  zlFaq,
  zlHoursRows,
  zlLinks,
  zlLocation,
} from "@/components/zl-podologia/zlPodologiaContent";

export function ZlExactTrustContactSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <div id="contato" className="mt-14 border-t border-[#ede2da] pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <ExactSectionHeader
              eyebrow="Duvidas frequentes"
              title="Respostas para suas principais duvidas."
              body="Abaixo estao as perguntas que mais aparecem antes de agendar um atendimento."
            />
            <div className="mt-7 space-y-3">
              {zlFaq.slice(0, 5).map((item, index) => {
                const active = openFaq === index;

                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-[1.2rem] border border-[#e7d7cc] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(active ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                    >
                      <span className="text-[0.95rem] leading-[1.5] text-[#4a3a31]">{item.q}</span>
                      <span className="text-[#c39087]">{active ? "-" : "+"}</span>
                    </button>
                    {active ? (
                      <p className="border-t border-[#e7d7cc] px-4 py-4 text-[0.9rem] leading-[1.7] text-[#6d5a4c]">
                        {item.a}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border border-[#e7d7cc] bg-white shadow-[0_16px_40px_rgba(123,98,78,0.08)]">
            <div className="grid lg:grid-cols-[1fr_0.94fr]">
              <div className="p-5 sm:p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[#9a7f5c]">
                  Onde estamos
                </p>
                <h3
                  className="mt-4 text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[0.98] tracking-[-0.04em] text-[#32261f]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  Localizada em Fortaleza, com facil acesso e estacionamento.
                </h3>
                <p className="mt-4 text-[0.94rem] leading-[1.7] text-[#6d5a4c]">{zlLocation.streetAddress}</p>
                <div className="mt-4 space-y-2 text-[0.85rem] text-[#6d5a4c]">
                  {zlHoursRows.map((row) => (
                    <p key={row.day}>
                      {row.day}: {row.hours}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ExactActionButton href={zlLinks.maps} label="Ver no mapa" icon="pin" />
                  <ExactActionButton
                    href={zlLinks.whatsapp}
                    label="Falar no WhatsApp"
                    kind="secondary"
                    icon="calendar"
                  />
                </div>
              </div>
              <div className="min-h-[22rem] bg-[#f3e8df] lg:min-h-full">
                <iframe
                  title="Mapa da ZL Podologia em Fortaleza"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(zlLocation.streetAddress)}&output=embed`}
                  className="h-full w-full min-h-[22rem] border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 overflow-hidden rounded-[2rem] border border-[#e7d7cc] bg-[linear-gradient(180deg,#fcf8f4_0%,#f5ede5_100%)] shadow-[0_18px_44px_rgba(123,98,78,0.1)]">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:p-10">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[#9a7f5c]">Fechamento</p>
            <h3
              className="mt-4 max-w-[12ch] text-[clamp(2.5rem,4vw,4.2rem)] leading-[0.92] tracking-[-0.05em] text-[#32261f]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Seus pes te levam longe. A gente cuida do caminho.
            </h3>
            <p className="mt-4 max-w-[36ch] text-[0.98rem] leading-[1.75] text-[#6d5a4c]">
              Agende seu atendimento e sinta o alivio de caminhar com mais
              leveza, seguranca e orientacao de verdade.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExactActionButton href={zlLinks.whatsappFinalCta} label="Agendar horario" />
              <ExactActionButton
                href={zlLinks.whatsapp}
                label="Falar no WhatsApp"
                kind="secondary"
                icon="calendar"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[#e7d7cc] bg-white p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <ZlExactClosingPoint>Atendimento humanizado e personalizado</ZlExactClosingPoint>
                <ZlExactClosingPoint>Tecnologia, seguranca e resultados reais</ZlExactClosingPoint>
                <ZlExactClosingPoint>Especialistas em saude dos pes em Fortaleza</ZlExactClosingPoint>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[#e7d7cc] bg-white p-5 text-[0.88rem] leading-[1.7] text-[#6d5a4c]">
              Atendimento com hora marcada, leitura clinica do caso e
              acompanhamento claro do que precisa continuar.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
