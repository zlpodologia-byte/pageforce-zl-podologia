"use client";

import { useState, type FormEvent } from "react";
import { CHANNEL_OPTIONS } from "./diagnosticContent";

const FIELD_LABEL_CLASS =
  "text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]";

const FIELD_INPUT_CLASS =
  "mt-2 w-full rounded-[0.75rem] border border-[var(--color-line)] bg-transparent px-4 py-3 text-[0.98rem] text-[var(--color-ink)] outline-none transition-[border-color] duration-200 focus:border-[var(--color-ink)]";

export function DiagnosticForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[1.75rem] border border-[var(--color-line)] p-[clamp(1.75rem,3vw,2.5rem)]">
        <p className={FIELD_LABEL_CLASS}>Pedido recebido</p>
        <h2
          className="mt-3 max-w-[20ch] text-[clamp(1.7rem,2.6vw,2.3rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          A leitura começa em até 24h.
        </h2>
        <p className="mt-4 max-w-[44ch] text-[1rem] leading-[1.55] text-[var(--color-muted)]">
          Score, dossiê e prova visual do problema vão chegar pelo canal informado. Sem proposta antes do dado.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-[var(--color-line)] p-[clamp(1.75rem,3vw,2.5rem)]"
    >
      <p className={FIELD_LABEL_CLASS}>Pedido de diagnóstico</p>
      <h2
        className="mt-3 max-w-[22ch] text-[clamp(1.55rem,2.3vw,2.05rem)] text-[var(--color-ink)]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        Conte o essencial. Devolvemos a leitura.
      </h2>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="dx-business" className={FIELD_LABEL_CLASS}>
            Negócio
          </label>
          <input
            id="dx-business"
            name="business"
            type="text"
            required
            autoComplete="organization"
            placeholder="Nome ou tipo de operação"
            className={FIELD_INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="dx-region" className={FIELD_LABEL_CLASS}>
            Cidade / região
          </label>
          <input
            id="dx-region"
            name="region"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Onde a demanda acontece"
            className={FIELD_INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="dx-channel" className={FIELD_LABEL_CLASS}>
            Canal principal hoje
          </label>
          <select
            id="dx-channel"
            name="channel"
            required
            defaultValue=""
            className={FIELD_INPUT_CLASS}
          >
            <option value="" disabled>
              Selecione
            </option>
            {CHANNEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dx-whatsapp" className={FIELD_LABEL_CLASS}>
            WhatsApp para retorno
          </label>
          <input
            id="dx-whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="DDD + número"
            className={FIELD_INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="dx-context" className={FIELD_LABEL_CLASS}>
            Contexto curto (opcional)
          </label>
          <textarea
            id="dx-context"
            name="context"
            rows={3}
            placeholder="Onde dói, o que já tentou, qual a urgência"
            className={`${FIELD_INPUT_CLASS} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-ink)] px-7 text-[0.74rem] uppercase tracking-[0.24em] text-[var(--color-canvas-invert,white)] transition-opacity duration-200 hover:opacity-85"
        data-cursor-target
      >
        Solicitar diagnóstico
      </button>

      <p className="mt-4 text-[0.78rem] leading-[1.5] text-[var(--color-muted)]">
        Resposta em até 24h. Sem proposta antes do dado.
      </p>
    </form>
  );
}
