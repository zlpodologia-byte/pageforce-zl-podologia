import type { ReactNode } from "react";
import type { ZlServiceId } from "@/components/zl-podologia/zlPodologiaContent";

// v7-earthy: paleta reescrita em tons terrosos warm. Os nomes originais
// (rose/blush/peach/salmon) sao mantidos pra nao quebrar refs spread pelas
// artworks SVG abaixo, mas os valores apontam para a paleta terrosa v7-
// earthy â€” caramelo/taupe/areia/bege em vez de azul/rose.
const palette = {
  ink: "#3A2E23",
  rose: "#B89B77",
  blush: "#D2C3A6",
  salmon: "#C9B89A",
  peach: "#E6DBC6",
  blue: "#9A7F5C",
  deepBlue: "#574433",
  ice: "#F2EBDE",
  mint: "#D9D6B6",
  cream: "#FAF7F2",
  line: "#D2C3A6",
  white: "#FFFFFF",
} as const;

/* ------------------------------------------------------------------ */
/* Hero artwork                                                        */
/* ------------------------------------------------------------------ */

export function ZlHeroArtwork() {
  return (
    <div className="relative aspect-[0.92] overflow-hidden rounded-[2.4rem] border border-[#D2C3A6] bg-[linear-gradient(165deg,#FAF7F2_0%,#D2C3A6_100%)] shadow-[0_40px_90px_rgba(138,108,72,0.18)]">
      {/* Soft background blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(184,155,119,0.42),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(154,127,92,0.28),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(210,195,166,0.75),transparent_40%)]" />

      {/* Main illustration */}
      <svg
        viewBox="0 0 720 780"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="zl-hero-basin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EFE6D3" />
            <stop offset="1" stopColor="#D2C3A6" />
          </linearGradient>
          <linearGradient id="zl-hero-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E6DBC6" />
            <stop offset="1" stopColor="#C9B89A" />
          </linearGradient>
          <linearGradient id="zl-hero-foot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FEE8DE" />
            <stop offset="1" stopColor="#F4CEBE" />
          </linearGradient>
          <linearGradient id="zl-hero-petal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D9B8A0" />
            <stop offset="1" stopColor="#B89B77" />
          </linearGradient>
          <radialGradient id="zl-hero-bloom" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F2E0D1" />
            <stop offset="1" stopColor="#D9C4A7" />
          </radialGradient>
        </defs>

        {/* Floor shadow */}
        <ellipse cx="360" cy="680" rx="260" ry="26" fill="#C9B89A" opacity="0.55" />

        {/* Large petal backdrop */}
        <path
          d="M98 402c-6-96 62-168 156-172 72-4 114 40 180 42 70 2 132-34 178 6 46 40 34 124-8 188-44 64-134 120-230 122-92 2-168-30-220-74-36-32-52-64-56-112z"
          fill="url(#zl-hero-bloom)"
          opacity="0.68"
        />

        {/* Escalda-pes basin */}
        <ellipse cx="360" cy="584" rx="210" ry="54" fill="url(#zl-hero-basin)" />
        <ellipse cx="360" cy="570" rx="202" ry="46" fill="url(#zl-hero-water)" />

        {/* Water ripples */}
        <ellipse cx="360" cy="562" rx="150" ry="14" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.7" />
        <ellipse cx="360" cy="556" rx="90" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />

        {/* Foot emerging from water */}
        <path
          d="M270 540c-22-52-8-108 26-144 30-32 74-48 118-40 44 8 80 40 90 90 8 42-16 80-54 100-32 16-72 18-108 12-30-6-58-10-72-18z"
          fill="url(#zl-hero-foot)"
          stroke={palette.ink}
          strokeWidth="3"
          opacity="0.92"
        />

        {/* Toe pads */}
        <circle cx="302" cy="388" r="14" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" opacity="0.9" />
        <circle cx="332" cy="372" r="12" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" opacity="0.9" />
        <circle cx="358" cy="362" r="11" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" opacity="0.9" />
        <circle cx="384" cy="364" r="10" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" opacity="0.9" />
        <circle cx="408" cy="374" r="9" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" opacity="0.9" />

        {/* Ankle curve into water */}
        <path
          d="M298 544c-10 18-6 34 4 48"
          fill="none"
          stroke={palette.ink}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Hand of professional */}
        <path
          d="M172 412c24-16 58-10 80 8 22 18 30 48 20 68-8 18-38 26-66 20-28-6-48-24-52-46-4-20 4-38 18-50z"
          fill="#FCE4D7"
          stroke={palette.ink}
          strokeWidth="2.5"
        />
        <path d="M192 418c-14 4-24 14-28 26" fill="none" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" />
        <path d="M210 412c-4 6-4 12 0 18" fill="none" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" />
        <path d="M228 414c0 10 2 18 6 24" fill="none" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" />

        {/* Cloth/napkin */}
        <path
          d="M156 456c28 12 60 18 96 14 34-4 54-18 64-36"
          fill="none"
          stroke={palette.white}
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Small petals floating */}
        <path d="M200 316c8-6 20-6 26 2 6 8 2 20-6 24-8 4-20-2-22-12-2-6 0-10 2-14z" fill="url(#zl-hero-petal)" />
        <path d="M478 244c8-6 20-6 26 2 6 8 2 20-6 24-8 4-20-2-22-12-2-6 0-10 2-14z" fill="url(#zl-hero-petal)" opacity="0.8" />
        <path d="M520 336c6-5 16-5 21 2 5 7 1 16-5 20-6 3-16-2-18-10-2-5 0-8 2-12z" fill="url(#zl-hero-petal)" opacity="0.6" />
        <circle cx="140" cy="276" r="5" fill={palette.rose} opacity="0.7" />
        <circle cx="580" cy="192" r="7" fill={palette.blue} opacity="0.45" />
        <circle cx="608" cy="440" r="5" fill={palette.rose} opacity="0.55" />

        {/* Delicate plant stem */}
        <path d="M586 120c-6 40 2 80 30 108" fill="none" stroke="#7A8459" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        <path d="M586 140c-14 0-24 10-26 24 10-2 22-6 26-24z" fill="#8EA36E" opacity="0.8" />
        <path d="M598 176c-14 6-18 18-16 30 12-6 20-16 16-30z" fill="#8EA36E" opacity="0.75" />

        {/* Tiny stars */}
        <g opacity="0.55">
          <path d="M650 88l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill={palette.rose} />
          <path d="M108 140l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={palette.blue} />
        </g>
      </svg>

      {/* Top-left glass note */}
      <GlassNote className="left-5 top-5 max-w-[12.5rem]" tone="rose">
        <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#7A6244]">
          Fortaleza / Parquelandia
        </p>
        <p className="mt-2 text-[0.95rem] leading-[1.4] text-[#3A2E23]">
          Podologia clinica com leitura do caso, alivio e continuidade.
        </p>
      </GlassNote>

      {/* Review note */}
      <GlassNote className="right-5 top-5 max-w-[12rem]" tone="blue">
        <div className="flex items-center gap-1 text-[#A08379]">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
            </svg>
          ))}
        </div>
        <p className="mt-2 text-[0.92rem] leading-[1.4] text-[#3A2E23]">
          <span className="font-medium">5,0</span> com 11 avaliações no Google.
        </p>
      </GlassNote>

      {/* Bottom glass note: quick time */}
      <GlassNote className="bottom-5 left-5 max-w-[13.5rem]" tone="rose">
        <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#7A6244]">
          Terca a sabado
        </p>
        <p className="mt-2 text-[0.95rem] leading-[1.4] text-[#3A2E23]">
          Hora marcada, agenda organizada e resposta por WhatsApp.
        </p>
      </GlassNote>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Service artworks - distinct per service                             */
/* ------------------------------------------------------------------ */

export function ZlServiceArtwork({
  kind,
  title,
  label,
}: {
  kind: ZlServiceId;
  title: string;
  label: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.9rem] border border-[#D2C3A6] bg-[linear-gradient(180deg,#FAF7F2_0%,#E6DBC6_100%)] p-6 shadow-[0_24px_60px_rgba(138,108,72,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,155,119,0.24),transparent_28%),radial-gradient(circle_at_86%_78%,rgba(154,127,92,0.18),transparent_24%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8B7862]">{label}</p>
            <h3
              className="mt-2 text-[1.55rem] leading-[1.02] tracking-[-0.03em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {title}
            </h3>
          </div>
          <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.18em] text-[#3A2E23] shadow-[0_10px_28px_rgba(87,68,51,0.08)]">
            Interativo
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[#D2C3A6] bg-white/90">
          {renderServiceSvg(kind)}
        </div>
      </div>
    </div>
  );
}

function renderServiceSvg(kind: ZlServiceId): ReactNode {
  switch (kind) {
    case "ingrown":
      return <IngrownSvg />;
    case "fungus":
      return <FungusSvg />;
    case "podoprofilaxia":
      return <PodoprofilaxiaSvg />;
    case "orthosis":
      return <OrthosisSvg />;
    case "laser":
      return <LaserSvg />;
    case "reflexology":
      return <ReflexologySvg />;
    case "diabetic":
      // Pe diabetico usa a ilustracao "sensitive" (pele sensivel /
      // cuidado extra) â€” mesmo vocabulario visual.
      return <SensitiveSvg />;
  }
}

function IngrownSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#F2EBDE" />
      <circle cx="180" cy="170" r="110" fill={palette.blush} opacity="0.7" />
      <circle cx="460" cy="170" r="110" fill={palette.ice} opacity="0.9" />
      {/* Before */}
      <text x="180" y="68" textAnchor="middle" fontSize="12" fill="#7A6244" letterSpacing="3">ANTES</text>
      <path d="M130 200c0-52 22-96 58-118 22-14 44-16 66-4" fill="#FCE0D1" stroke={palette.ink} strokeWidth="3" />
      <path d="M160 156c8-8 20-8 28 0 6 6 4 18-2 22-8 4-22 0-26-10-2-4 0-8 0-12z" fill="#9A7F5C" />
      <path d="M164 152l-4 8" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" />
      <circle cx="172" cy="150" r="3" fill={palette.ink} />
      {/* pain waves */}
      <path d="M210 110c10-6 22-4 30 4" fill="none" stroke="#9A7F5C" strokeWidth="3" strokeLinecap="round" />
      <path d="M220 96c12-4 24 0 32 8" fill="none" stroke="#9A7F5C" strokeWidth="3" strokeLinecap="round" />

      {/* After */}
      <text x="460" y="68" textAnchor="middle" fontSize="12" fill="#7A8459" letterSpacing="3">DEPOIS</text>
      <path d="M410 200c0-52 22-96 58-118 22-14 44-16 66-4" fill="#FCE0D1" stroke={palette.ink} strokeWidth="3" />
      <path d="M436 150c8-6 20-6 28 2 4 6 2 16-4 20-8 2-22-2-26-12-2-4 0-6 2-10z" fill="#E2D4B5" />
      <circle cx="452" cy="148" r="2.5" fill={palette.ink} />
      {/* calm dots */}
      <circle cx="494" cy="96" r="3" fill={palette.blue} opacity="0.6" />
      <circle cx="510" cy="112" r="2" fill={palette.blue} opacity="0.45" />
      <circle cx="480" cy="118" r="2" fill={palette.blue} opacity="0.5" />

      {/* arrow */}
      <path d="M300 170h40m0 0l-10-8m10 8l-10 8" fill="none" stroke="#8B7862" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FungusSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#FAF7F2" />
      {/* timeline */}
      <path d="M70 230h500" stroke="#D2C3A6" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 8" />
      {[80, 250, 420, 560].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="230" r="10" fill={i === 0 ? "#9A7F5C" : i === 3 ? "#7A8459" : "#D2C3A6"} />
          <text x={x} y="262" textAnchor="middle" fontSize="11" fill="#8B7862">
            {["Hoje", "30 dias", "60 dias", "90 dias"][i]}
          </text>
        </g>
      ))}
      {/* nails visualization */}
      {[80, 250, 420, 560].map((x, i) => (
        <g key={`n-${x}`}>
          <rect
            x={x - 22}
            y={140}
            width="44"
            height="60"
            rx="20"
            fill={["#C9B89A", "#D6C7AB", "#E2D8BF", "#F0E8D3"][i]}
            stroke={palette.ink}
            strokeWidth="2"
          />
          {/* marks of fungus decreasing */}
          {i === 0 && (
            <>
              <circle cx={x - 6} cy={165} r="4" fill="#8B7862" opacity="0.65" />
              <circle cx={x + 6} cy={180} r="3" fill="#8B7862" opacity="0.55" />
            </>
          )}
          {i === 1 && <circle cx={x} cy={172} r="3" fill="#8B7862" opacity="0.4" />}
        </g>
      ))}
      {/* header */}
      <text x="70" y="70" fontSize="13" fill="#7A6244" letterSpacing="3">PROTOCOLO</text>
      <text x="70" y="96" fontSize="18" fill="#3A2E23" fontFamily="var(--font-display)">Evolucao progressiva</text>
    </svg>
  );
}

function PodoprofilaxiaSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#E6DBC6" />
      {/* Foot */}
      <path
        d="M180 260c-14-52 6-104 46-132 32-22 70-28 102-18 30 10 52 36 56 70 2 22-10 40-30 50-22 12-50 14-76 12-34-2-66 0-84 10-8 4-12 6-14 8z"
        fill="#FCE0D1"
        stroke={palette.ink}
        strokeWidth="3"
      />
      <circle cx="260" cy="128" r="10" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" />
      <circle cx="286" cy="118" r="9" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" />
      <circle cx="308" cy="114" r="8" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" />
      <circle cx="330" cy="116" r="7" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" />
      <circle cx="350" cy="120" r="6" fill="#F4CEBE" stroke={palette.ink} strokeWidth="2" />

      {/* Icons of inclusions */}
      <g transform="translate(420 50)">
        {[
          { label: "Corte tecnico", y: 0 },
          { label: "Desbaste", y: 52 },
          { label: "Hidratacao", y: 104 },
          { label: "Esfoliacao", y: 156 },
          { label: "Orientacao", y: 208 },
        ].map((item) => (
          <g key={item.label} transform={`translate(0 ${item.y})`}>
            <circle cx="12" cy="12" r="11" fill="#B89B77" opacity="0.8" />
            <path d="M7 12l3 3 7-7" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="32" y="16" fontSize="13" fill="#3A2E23">{item.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function OrthosisSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#FAF7F2" />
      <text x="160" y="60" textAnchor="middle" fontSize="11" fill="#7A6244" letterSpacing="3">CURVATURA ATUAL</text>
      <text x="480" y="60" textAnchor="middle" fontSize="11" fill="#7A8459" letterSpacing="3">COM ORTESE</text>

      {/* Before - curved in */}
      <rect x="120" y="100" width="80" height="140" rx="30" fill="#C9B89A" stroke={palette.ink} strokeWidth="2" />
      <path d="M140 120c8 16 8 36 0 52" fill="none" stroke="#9A7F5C" strokeWidth="3" />
      <path d="M180 120c-8 16-8 36 0 52" fill="none" stroke="#9A7F5C" strokeWidth="3" />
      {/* arrows pushing in */}
      <path d="M100 146l16 6m0-12l-16 6" fill="none" stroke="#9A7F5C" strokeWidth="2" strokeLinecap="round" />
      <path d="M220 146l-16 6m0-12l16 6" fill="none" stroke="#9A7F5C" strokeWidth="2" strokeLinecap="round" />

      {/* arrow center */}
      <path d="M270 170h60m0 0l-12-10m12 10l-12 10" fill="none" stroke="#8B7862" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* After - straight */}
      <rect x="440" y="100" width="80" height="140" rx="30" fill="#E2D4B5" stroke={palette.ink} strokeWidth="2" />
      <path d="M460 120v52" stroke={palette.blue} strokeWidth="3" />
      <path d="M500 120v52" stroke={palette.blue} strokeWidth="3" />
      {/* orthosis piece */}
      <path d="M452 126c22-4 44-4 66 0l-4 8c-20-4-38-4-58 0z" fill="#B89B77" opacity="0.7" />
    </svg>
  );
}

function LaserSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#FAF7F2" />
      {/* laser device */}
      <rect x="60" y="140" width="110" height="40" rx="14" fill="#3A2E23" />
      <circle cx="170" cy="160" r="6" fill="#9A7F5C" />
      {/* laser beam */}
      <path d="M176 160l220 60" stroke="url(#laser-beam)" strokeWidth="6" strokeLinecap="round" />
      <defs>
        <linearGradient id="laser-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9A7F5C" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9A7F5C" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* foot target */}
      <path
        d="M380 260c-14-52 6-104 46-132 32-22 70-28 102-18 30 10 52 36 56 70 2 22-10 40-30 50-22 12-50 14-76 12-34-2-66 0-84 10-8 4-12 6-14 8z"
        fill="#FCE0D1"
        stroke={palette.ink}
        strokeWidth="3"
      />
      {/* target glow */}
      <circle cx="400" cy="222" r="24" fill="#9A7F5C" opacity="0.2" />
      <circle cx="400" cy="222" r="12" fill="#9A7F5C" opacity="0.35" />
      <circle cx="400" cy="222" r="5" fill="#9A7F5C" />

      <text x="60" y="110" fontSize="13" fill="#7A6244" letterSpacing="2">LASER DE APOIO</text>
    </svg>
  );
}

function SensitiveSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#FAF7F2" />
      {/* Large heart-like shape around foot */}
      <path
        d="M200 190c0-54 44-98 98-98 30 0 56 14 72 36 16-22 42-36 72-36 54 0 98 44 98 98 0 20-6 40-18 56-38 60-122 120-152 120s-114-60-152-120c-12-16-18-36-18-56z"
        fill="#E8D0B8"
        opacity="0.5"
      />
      {/* Foot */}
      <path
        d="M260 246c-10-38 4-78 34-100 26-18 56-22 82-14 24 8 40 28 44 54 2 16-8 30-24 38-18 10-42 12-62 10-26-2-52 0-66 8z"
        fill="#FCE0D1"
        stroke={palette.ink}
        strokeWidth="3"
      />
      {/* Checklist */}
      <g transform="translate(430 70)">
        {[
          "Leitura cuidadosa",
          "Instrumentos esterilizados",
          "Ritmo calmo",
          "Orientacao continua",
        ].map((item, i) => (
          <g key={item} transform={`translate(0 ${i * 44})`}>
            <circle cx="12" cy="12" r="11" fill="#B89B77" opacity="0.85" />
            <path d="M7 12l3 3 7-7" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="32" y="16" fontSize="13" fill="#3A2E23">{item}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function ReflexologySvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#FAF7F2" />
      {/* Foot outline (left side) */}
      <path
        d="M150 260c-14-52 6-104 46-132 32-22 70-28 102-18 30 10 52 36 56 70 2 22-10 40-30 50-22 12-50 14-76 12-34-2-66 0-84 10-8 4-12 6-14 8z"
        fill="#FCE0D1"
        stroke={palette.ink}
        strokeWidth="3"
      />
      {/* Reflexology points - stylized, connected to body zones */}
      <g opacity="0.9">
        <circle cx="230" cy="128" r="8" fill="#B89B77" />
        <circle cx="260" cy="118" r="6" fill="#B89B77" opacity="0.8" />
        <circle cx="290" cy="122" r="7" fill="#9A7F5C" opacity="0.8" />
        <circle cx="215" cy="170" r="6" fill="#8EA36E" opacity="0.85" />
        <circle cx="260" cy="180" r="8" fill="#9A7F5C" opacity="0.75" />
        <circle cx="305" cy="172" r="6" fill="#B89B77" opacity="0.85" />
        <circle cx="240" cy="220" r="7" fill="#8EA36E" opacity="0.85" />
        <circle cx="285" cy="215" r="6" fill="#B89B77" opacity="0.8" />
      </g>
      {/* Waves of relaxation on the right */}
      <g stroke="#B89B77" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55">
        <path d="M420 96c10 0 16 6 18 14" />
        <path d="M440 108c10 0 16 6 18 14" />
        <path d="M460 120c10 0 16 6 18 14" />
      </g>
      {/* Legend */}
      <g transform="translate(430 170)">
        {[
          { label: "Menos estresse", color: "#574433" },
          { label: "Menos cansaco", color: "#9A7F5C" },
          { label: "Menos ansiedade", color: "#7A8459" },
          { label: "Mais pausa", color: "#B89B77" },
        ].map((item, i) => (
          <g key={item.label} transform={`translate(0 ${i * 30})`}>
            <circle cx="8" cy="10" r="6" fill={item.color} />
            <text x="24" y="14" fontSize="13" fill="#3A2E23">{item.label}</text>
          </g>
        ))}
      </g>
      <text x="40" y="50" fontSize="12" fill="#7A6244" letterSpacing="2.5">REFLEXOLOGIA PODAL</text>
    </svg>
  );
}

function PreWeddingSvg() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" aria-hidden="true">
      <rect width="640" height="340" fill="#E6DBC6" />
      {/* Large bloom circle */}
      <circle cx="320" cy="170" r="130" fill="url(#zl-hero-bloom)" opacity="0.5" />
      {/* Candle on the left */}
      <g transform="translate(110 160)">
        <rect x="10" y="32" width="18" height="68" rx="3" fill="#F7EEE8" stroke={palette.ink} strokeWidth="2" />
        <path d="M19 32v-18" stroke={palette.ink} strokeWidth="1.6" strokeLinecap="round" />
        {/* Flame */}
        <path d="M19 14c6-6 6-14 0-20-6 6-6 14 0 20Z" fill="#D9B8A0" />
        <path d="M19 10c3-3 3-7 0-10-3 3-3 7 0 10Z" fill="#FFE7B5" />
        {/* Base */}
        <ellipse cx="19" cy="100" rx="12" ry="3" fill="#C9B89A" />
      </g>
      {/* Foot soaking in a small basin */}
      <ellipse cx="370" cy="246" rx="140" ry="30" fill="#E6DBC6" />
      <ellipse cx="370" cy="238" rx="134" ry="24" fill="#C9B89A" />
      <ellipse cx="370" cy="232" rx="80" ry="8" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
      <path
        d="M310 220c-18-44-2-92 32-118 28-22 64-26 94-18 26 8 44 32 48 60 2 18-8 34-28 42-20 8-42 10-66 8-30-2-62 2-80 26Z"
        fill="#FCE0D1"
        stroke={palette.ink}
        strokeWidth="2.5"
        opacity="0.95"
      />
      {/* Toe pads */}
      <circle cx="360" cy="118" r="8" fill="#F4CEBE" stroke={palette.ink} strokeWidth="1.8" />
      <circle cx="386" cy="110" r="7" fill="#F4CEBE" stroke={palette.ink} strokeWidth="1.8" />
      <circle cx="408" cy="110" r="6" fill="#F4CEBE" stroke={palette.ink} strokeWidth="1.8" />
      <circle cx="428" cy="114" r="5" fill="#F4CEBE" stroke={palette.ink} strokeWidth="1.8" />
      <circle cx="444" cy="122" r="5" fill="#F4CEBE" stroke={palette.ink} strokeWidth="1.8" />

      {/* Rose petals floating */}
      <path d="M220 100c8-6 20-6 26 2 6 8 2 20-6 24-8 4-20-2-22-12-2-6 0-10 2-14z" fill="url(#zl-hero-petal)" opacity="0.85" />
      <path d="M500 80c8-6 20-6 26 2 6 8 2 20-6 24-8 4-20-2-22-12-2-6 0-10 2-14z" fill="url(#zl-hero-petal)" opacity="0.75" />
      <path d="M520 200c6-4 14-4 18 2 4 6 2 14-4 18-6 2-14 0-16-8-2-4 0-8 2-12z" fill="url(#zl-hero-petal)" opacity="0.6" />
      <circle cx="540" cy="134" r="4" fill={palette.rose} opacity="0.6" />
      <circle cx="190" cy="200" r="3" fill={palette.rose} opacity="0.55" />

      {/* Hearts / time badge */}
      <g transform="translate(470 40)">
        <rect x="0" y="0" width="120" height="34" rx="17" fill="#ffffff" opacity="0.85" stroke={palette.rose} strokeWidth="1.5" />
        <path d="M18 20l-6-6c-2-2-2-6 0-8s6-2 8 0l-2 2 2-2c2-2 6-2 8 0s2 6 0 8l-10 10" fill="#B89B77" transform="translate(-2 -3)" />
        <text x="42" y="22" fontSize="12" fill="#7A6244" letterSpacing="1.5">60 MINUTOS</text>
      </g>

      <text x="40" y="64" fontSize="12" fill="#7A6244" letterSpacing="2.5">PRE-WEDDING</text>
      <text x="40" y="88" fontSize="18" fill="#3A2E23" fontFamily="var(--font-display)">Um momento so seu</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Case comparison artwork (before/after illustrated)                  */
/* ------------------------------------------------------------------ */

export function ZlCaseArtwork({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#D2C3A6] bg-white">
      <div className="grid md:grid-cols-2">
        <CaseHalf tone="before" title="Antes" body={before} />
        <CaseHalf tone="after" title="Depois" body={after} />
      </div>
    </div>
  );
}

function CaseHalf({
  tone,
  title,
  body,
}: {
  tone: "before" | "after";
  title: string;
  body: string;
}) {
  // v7-earthy: ANTES em taupe (#D2C3A6) com label marrom escuro, DEPOIS
  // em areia claro (#F2EBDE) com label verde-oliva.
  const background = tone === "before" ? "#D2C3A6" : "#F2EBDE";
  const accent = tone === "before" ? "#574433" : "#7A8459";
  const textTone = tone === "before" ? "#3A2E23" : "#574433";

  return (
    <div className="p-5" style={{ background }}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.66rem] uppercase tracking-[0.24em]" style={{ color: textTone }}>
          {title}
        </p>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <div className="mt-4 overflow-hidden rounded-[1.1rem] border border-white/70 bg-white/70 p-4">
        <svg viewBox="0 0 260 160" className="h-auto w-full" aria-hidden="true">
          <rect width="260" height="160" fill="transparent" />
          {tone === "before" ? (
            <>
              <path
                d="M60 118c0-40 14-76 44-98 22-16 48-20 76-10"
                fill="#FCE0D1"
                stroke={palette.ink}
                strokeWidth="2.5"
              />
              <circle cx="150" cy="52" r="10" fill="#9A7F5C" />
              <path d="M168 38c6-4 14-2 18 4" fill="none" stroke="#9A7F5C" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path
                d="M60 118c0-40 14-76 44-98 22-16 48-20 76-10"
                fill="#FCE0D1"
                stroke={palette.ink}
                strokeWidth="2.5"
              />
              <circle cx="150" cy="52" r="9" fill="#E2D4B5" />
              <circle cx="172" cy="36" r="3" fill={palette.blue} opacity="0.5" />
              <circle cx="188" cy="48" r="2" fill={palette.blue} opacity="0.4" />
            </>
          )}
        </svg>
      </div>
      <p className="mt-4 text-[0.92rem] leading-[1.6]" style={{ color: "#3A2E23" }}>{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Utility notes                                                       */
/* ------------------------------------------------------------------ */

function GlassNote({
  children,
  className,
  tone = "rose",
}: {
  children: ReactNode;
  className: string;
  tone?: "rose" | "blue";
}) {
  const ring =
    tone === "blue" ? "ring-[#D2C3A6]" : "ring-[#E6DBC6]";
  return (
    <div
      className={`absolute rounded-[1.3rem] bg-white/88 p-3.5 shadow-[0_18px_46px_rgba(87,68,51,0.08)] ring-1 backdrop-blur-sm ${ring} ${className}`}
    >
      {children}
    </div>
  );
}
