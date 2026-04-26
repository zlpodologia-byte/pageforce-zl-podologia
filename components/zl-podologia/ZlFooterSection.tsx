"use client";

import Image from "next/image";
import Link from "next/link";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import {
  ZlInstagramIcon,
  ZlPinIcon,
  ZlStarIcon,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import {
  zlContact,
  zlLinks,
  zlLocation,
} from "@/components/zl-podologia/zlPodologiaContent";

export function ZlFooterSection() {
  const footerMapPreviewSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${zlLocation.streetAddress}, ${zlLocation.district}, ${zlLocation.city}`
  )}&hl=pt-BR&z=17&output=embed`;
  const footerPillClassName =
    "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.84rem] text-white ring-1 ring-white/18 backdrop-blur-sm transition-colors hover:bg-white/15";

  return (
    <footer className="relative border-t border-[#8EA08E]/35 bg-[#174F3F] text-white/86">
      <div className="container-x mx-auto max-w-[1440px] py-9 lg:py-11">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-stretch">
          <div className="flex h-full flex-col gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/zl-podologia/brand/zl-logo-green-seal-2026-04-26.png"
                    alt="Marca da ZL Podologia"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p
                    className="text-[1.75rem] leading-[0.9] tracking-[0.08em] text-white"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    ZL
                  </p>
                  <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/74">
                    Podologia
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/LocalBusiness">
                <meta itemProp="name" content="ZL Podologia" />
                <p
                  className="max-w-[28ch] text-[0.96rem] leading-[1.6] text-white/78"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">{zlLocation.address}</span>
                  {" - "}
                  <span itemProp="addressLocality">{zlLocation.district}</span>
                  {" - "}
                  <span itemProp="addressRegion">{zlLocation.city}</span>
                </p>
                <p className="mt-1 text-[0.86rem] leading-[1.55] text-white/58">
                  {zlLocation.landmark}
                </p>
                <p className="mt-2 text-[0.86rem] leading-[1.55] text-white/58">
                  Ter-Sex 09:00-16:00 | Sab 09:00-12:00
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={zlLinks.whatsappFooter}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackZlEvent("wa_click", { source: "footer_wa" })}
                className={footerPillClassName}
              >
                <ZlWhatsappIcon />
                <span>{zlContact.whatsappDisplay}</span>
              </a>
              <a
                href={zlLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className={footerPillClassName}
              >
                <ZlInstagramIcon />
                <span>{zlContact.handle}</span>
              </a>
              <a
                href={zlLinks.maps}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackZlEvent("maps_click", { source: "footer" })}
                className={footerPillClassName}
              >
                <ZlPinIcon />
                <span>Google Maps</span>
              </a>
              <a href={`mailto:${zlContact.email}`} className={footerPillClassName}>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
                  <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Zm2.4.1L12 11l5.6-4.4H6.4Zm12.1 10.9v-9.3L12 13.3 6.5 8.2v9.3h12Z" />
                </svg>
                <span>{zlContact.email}</span>
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.035)_100%)] shadow-[0_22px_54px_rgba(8,32,25,0.2)]">
            <iframe
              title="Previa do mapa da ZL Podologia em Fortaleza"
              src={footerMapPreviewSrc}
              className="pointer-events-none absolute inset-0 h-full min-h-[17rem] w-full border-0 opacity-90 saturate-[0.82]"
              loading="lazy"
              tabIndex={-1}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(23,79,63,0.12)_0%,rgba(23,79,63,0.56)_100%)]" />

            <a
              href={zlLinks.maps}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackZlEvent("maps_click", { source: "footer_preview" })
              }
              aria-label="Abrir localizacao da ZL Podologia no Google Maps"
              className="relative flex h-full min-h-[18rem] flex-col justify-between p-5 text-white transition-colors hover:bg-white/[0.03] sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-white/88 backdrop-blur-sm">
                  Mapa oficial
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0F6B46] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(15,107,70,0.24)]">
                  <ZlPinIcon />
                  <span>Abrir no Google Maps</span>
                </span>
              </div>

              <div className="max-w-[26rem]">
                <p className="text-[0.64rem] uppercase tracking-[0.24em] text-white/70">
                  {zlLocation.landmark}
                </p>
                <h3
                  className="mt-3 max-w-[12ch] text-[clamp(1.7rem,2.7vw,2.4rem)] leading-[0.96] tracking-[-0.035em] text-white"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  Veja a rota antes de sair.
                </h3>
                <p className="mt-3 max-w-[30ch] text-[0.86rem] leading-[1.55] text-white/78">
                  {zlLocation.streetAddress}. Um clique abre a localizacao
                  oficial da ZL no Google Maps.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-[0.78rem] text-white/55">
          <p className="inline-flex items-center gap-2">
            <ZlStarIcon />
            <span>5,0 com 11 avaliações no Google</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={zlLinks.imagePolicy}
              className="text-white/70 underline-offset-4 hover:underline"
            >
              Política de uso de imagens
            </Link>
            <p
              className="italic text-white/70"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Pés bem cuidados fazem toda a diferença.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
