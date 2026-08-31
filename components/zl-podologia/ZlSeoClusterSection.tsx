"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import {
  zlSeoNeighborhoodLinks,
  zlSeoServiceLinks,
} from "@/components/zl-podologia/zlSeoClusterLinks";

export function ZlSeoClusterSection() {
  return (
    <section
      id="cuidados-podologicos-fortaleza"
      data-zl-home-seo-cluster
      aria-labelledby="zl-seo-cluster-title"
      className="relative bg-[#F8F7F4] px-5 py-16 sm:px-8 md:py-20 lg:px-14 xl:px-[4.5rem]"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal as="div">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[#0F6B46]">
            Guias da ZL Podologia
          </p>
          <h2
            id="zl-seo-cluster-title"
            className="mt-3 max-w-[25ch] text-[clamp(1.85rem,4vw,2.55rem)] leading-[1.05] tracking-[-0.025em] text-[#26302B]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Encontre a página mais próxima da sua dúvida.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[0.98rem] leading-[1.62] text-[#6F746F]">
            Consulte informações sobre cuidados podológicos, sinais que merecem
            atenção e como funciona o atendimento antes de falar com a clínica.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zlSeoServiceLinks.map((item, index) => (
            <Reveal key={item.href} as="div" delay={80 + index * 40}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-3 rounded-[1.25rem] border border-[#D9DAD7] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F6B46] hover:shadow-[0_14px_34px_rgba(15,107,70,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B46]"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#0F6B46]">
                  {item.shortLabel}
                </p>
                <h3
                  className="text-[1.12rem] leading-[1.22] text-[#26302B]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.55] text-[#6F746F]">
                  {item.description}
                </p>
                <p className="mt-auto text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[#0F6B46]">
                  Abrir guia <span aria-hidden="true">→</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" delay={260} className="mt-12">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[#0F6B46]">
            Pacientes de diferentes regiões
          </p>
          <h3
            className="mt-3 max-w-[31ch] text-[clamp(1.45rem,3vw,1.85rem)] leading-[1.15] tracking-[-0.02em] text-[#26302B]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            A clínica fica na Parquelândia e recebe pacientes de toda Fortaleza.
          </h3>
          <p className="mt-3 max-w-[60ch] text-[0.94rem] leading-[1.6] text-[#6F746F]">
            Consulte informações locais sem sugerir que existe uma unidade da ZL
            no bairro pesquisado.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {zlSeoNeighborhoodLinks.map((item, index) => (
              <Reveal key={item.href} as="li" delay={300 + index * 40}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-2 rounded-[0.85rem] border border-[#D9DAD7] bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F6B46] hover:shadow-[0_10px_24px_rgba(15,107,70,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B46]"
                >
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#0F6B46]">
                    Bairro pesquisado
                  </p>
                  <p className="text-[0.95rem] font-medium leading-[1.25] text-[#26302B]">
                    {item.shortLabel}
                  </p>
                  <p className="mt-auto text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#0F6B46]">
                    Ver página <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
