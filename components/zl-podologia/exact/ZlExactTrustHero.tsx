"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal/Reveal";
import { ZlPrimaryLink, ZlSecondaryLink, ZlWhatsappIcon, ZlPinIcon } from "@/components/zl-podologia/ZlCtaLink";
import { zlLinks, zlLocation, zlProfessionals, zlTeamHeadline } from "@/components/zl-podologia/zlPodologiaContent";

export function ZlExactTrustHero() {
  const lead = zlProfessionals[0];
  const partner = zlProfessionals[1] ?? zlProfessionals[0];

  return (
    <section className="border-b border-[#E7D7CC] bg-white/90">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pt-10">
        <Reveal as="div" className="flex flex-col justify-end">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#9A7F5C]">Cuidado que transforma</p>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(3rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
            {zlTeamHeadline.title}
          </h1>
          <p className="mt-5 max-w-[38ch] text-[1rem] leading-[1.75] text-[#6D5A4C]">{zlTeamHeadline.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ZlPrimaryLink href={zlLinks.whatsapp} label="Conheça nossa equipe" icon={<ZlWhatsappIcon />} tone="blush" />
            <ZlSecondaryLink href={zlLinks.maps} label="Ver localização" icon={<ZlPinIcon />} />
          </div>
          <p className="mt-6 text-[0.82rem] leading-[1.6] text-[#8A7668]">
            Fortaleza · {zlLocation.district} · hora marcada · uma paciente por vez
          </p>
        </Reveal>

        <Reveal as="div" delay={140} className="relative">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#E7D7CC] bg-[#F9F3EE] p-3 shadow-[0_30px_70px_rgba(123,98,78,0.1)]">
            <div className="relative aspect-[1.08] overflow-hidden rounded-[1.7rem]">
              <Image src={lead.photo?.src ?? "/zl-podologia/avatar.jpg"} alt={lead.photo?.alt ?? lead.name} fill priority sizes="(min-width: 1024px) 54vw, 92vw" className="object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(50,38,31,0.54)_100%)]" />
              <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#6D5A4C] backdrop-blur">
                Equipe ZL
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.4rem] border border-white/60 bg-white/90 p-4 backdrop-blur">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#9A7F5C]">Podóloga responsável</p>
                    <p className="mt-1 text-[1rem] font-medium text-[#32261F]">{lead.name}</p>
                  </div>
                  <div className="border-t border-[#E8D9CE] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                    <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#9A7F5C]">Reflexologista podal</p>
                    <p className="mt-1 text-[1rem] font-medium text-[#32261F]">{partner.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-2 bottom-6 hidden w-[42%] max-w-[12rem] rounded-[1.2rem] border border-[#E7D7CC] bg-white p-2 shadow-[0_22px_40px_rgba(123,98,78,0.14)] lg:block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem]">
                <Image src={partner.photo?.src ?? "/zl-podologia/avatar.jpg"} alt={partner.photo?.alt ?? partner.name} fill sizes="240px" className="object-cover" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
