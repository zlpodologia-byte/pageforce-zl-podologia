import type { Metadata } from "next";
import Link from "next/link";
import { zlContact, zlLinks } from "@/components/zl-podologia/zlPodologiaContent";

export const metadata: Metadata = {
  title: "Política de uso de imagens | ZL Podologia Fortaleza",
  description:
    "Política LGPD da ZL Podologia Fortaleza sobre uso de imagens de profissionais, pacientes e ambiente clínico. Remoção de imagens pelo WhatsApp ou e-mail.",
  alternates: { canonical: "/politica-de-imagens" },
  robots: { index: true, follow: true },
};

export default function ZlImagePolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F2] px-6 py-16 text-[#3A2E23] md:py-24">
      <div className="mx-auto max-w-[44rem]">
        <nav aria-label="breadcrumb" className="mb-10 text-[0.78rem] text-[#8B7862]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="underline-offset-4 hover:underline"
              >
                ZL Podologia
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#B89B77]">
              /
            </li>
            <li className="font-medium text-[#3A2E23]">Política de uso de imagens</li>
          </ol>
        </nav>

        <h1
          className="text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          Política de uso de imagens
        </h1>
        <p className="mt-4 text-[0.92rem] leading-[1.7] text-[#8B7862]">
          Transparência sobre as imagens publicadas na landing da ZL Podologia, em
          Fortaleza.
        </p>

        <article className="prose mt-10 text-[1rem] leading-[1.8] text-[#5C4A38]">
          <p>
            As imagens de pacientes foram obtidas com <strong>consentimento verbal ou escrito</strong>. Nenhuma
            foto de procedimento identifica a paciente por rosto — apenas pés,
            unhas e instrumental são visíveis. Os casos fotográficos publicados no
            Instagram oficial da clínica (incluindo o protocolo de unha encravada
            com azul de metileno) seguem a mesma política e foram publicados com
            autorização.
          </p>

          <p className="mt-5">
            As imagens da profissional Zucarina são publicadas com{" "}
            <strong>autorização expressa</strong>. Quando o rosto aparece em cena,
            isso é intencional e parte do compromisso de mostrar que há uma pessoa
            real por trás do atendimento. Em seções onde a autorização formal
            escrita ainda está em trâmite, a edição do enquadramento prioriza
            mãos, jaleco e placa dourada em vez do rosto.
          </p>

          <p className="mt-5">
            As avaliações citadas nos cards de depoimento são{" "}
            <strong>públicas no Google Business</strong> da ZL Podologia. Cada uma
            mantém o primeiro nome e a inicial do sobrenome conforme aparecem na
            ficha oficial, sem edição de conteúdo.
          </p>

          <h2
            className="mt-10 text-[1.35rem] leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Pedido de remoção
          </h2>
          <p className="mt-3">
            Se você reconhecer sua imagem em alguma publicação e desejar a
            remoção, basta entrar em contato. A ZL se compromete a remover a
            imagem em até 48 horas corridas após a confirmação da identidade.
          </p>
          <ul className="mt-4 grid gap-2 text-[0.95rem]">
            <li>
              E-mail:{" "}
              <a
                href={`mailto:${zlContact.email}`}
                className="text-[#7A6244] underline-offset-4 hover:underline"
              >
                {zlContact.email}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href={zlLinks.phoneTel}
                className="text-[#7A6244] underline-offset-4 hover:underline"
              >
                {zlContact.whatsappDisplay}
              </a>
            </li>
          </ul>

          <h2
            className="mt-10 text-[1.35rem] leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Base legal
          </h2>
          <p className="mt-3">
            Este tratamento de imagens segue as diretrizes da Lei Geral de
            Proteção de Dados (LGPD, Lei 13.709/2018), com base legal no
            consentimento específico e informado (Art. 7, inciso I) e no legítimo
            interesse de apresentar a clínica (Art. 7, inciso IX). Dados de
            contato não são compartilhados com terceiros.
          </p>

          <p className="mt-6 text-[0.84rem] italic text-[#8B7862]">
            Esta política foi atualizada em abril de 2026 e acompanha a landing
            v7-earthy da ZL Podologia.
          </p>
        </article>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#D2C3A6] bg-white px-5 py-2.5 text-[0.82rem] font-medium text-[#3A2E23] hover:border-[#B89B77]"
          >
            &larr; Voltar para a página da ZL
          </Link>
        </div>
      </div>
    </main>
  );
}
