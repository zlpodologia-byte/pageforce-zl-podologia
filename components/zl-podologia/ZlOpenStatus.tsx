"use client";

import { useEffect, useState } from "react";
import { zlOpenHours } from "@/components/zl-podologia/zlPodologiaContent";

/**
 * ZlOpenStatus — Fix 1 da reflexao E (v7-final).
 *
 * Calcula, em tempo real e client-side, se a clinica esta aberta AGORA
 * com base no horario oficial (Ter-Sex 9:00-16:00 / Sab 9:00-12:00).
 *
 * Renderiza:
 *  - Aberto: bolinha verde + "Aberto agora - fechamos as HH:MM"
 *  - Fechado: bolinha cinza + "Atendemos [proximo dia] a partir de 09:00"
 *
 * SSR: retorna o fallback passivo ("Ter-Sex 9-16h / Sab 9-12h") ate o
 * componente hidratar — evita flash de conteudo errado quando o horario
 * do servidor nao bate com o do cliente. Zero fetch, zero listener.
 */

type Computed = {
  open: boolean;
  label: string;
  secondary: string;
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function minutesToHuman(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${pad2(h)}:${pad2(m)}`;
}

function computeStatus(now: Date): Computed {
  const dayIndex = now.getDay(); // 0 Dom, 1 Seg, ..., 6 Sab
  const minutes = now.getHours() * 60 + now.getMinutes();

  const today = zlOpenHours.find((slot) => slot.dayIndex === dayIndex);

  if (today && minutes >= today.openMinutes && minutes < today.closeMinutes) {
    return {
      open: true,
      label: "Aberto agora",
      secondary: `fechamos as ${minutesToHuman(today.closeMinutes)}`,
    };
  }

  // Se for dia de atendimento mas antes da abertura — informa horario de
  // abertura do proprio dia.
  if (today && minutes < today.openMinutes) {
    return {
      open: false,
      label: "Fechado agora",
      secondary: `abrimos hoje as ${minutesToHuman(today.openMinutes)}`,
    };
  }

  // Caso contrario (fora de horario, ou dia nao atendido), calcular o
  // proximo dia de atendimento a partir de amanha.
  for (let offset = 1; offset <= 7; offset += 1) {
    const candidate = (dayIndex + offset) % 7;
    const slot = zlOpenHours.find((s) => s.dayIndex === candidate);
    if (slot) {
      const label =
        offset === 1
          ? "amanha"
          : slot.dayLabel.toLowerCase();
      return {
        open: false,
        label: "Fechado agora",
        secondary: `atendemos ${label} a partir das ${minutesToHuman(slot.openMinutes)}`,
      };
    }
  }

  // Fallback defensivo — nunca deveria chegar aqui.
  return {
    open: false,
    label: "Fechado agora",
    secondary: "atendemos Ter-Sex 9h-16h e Sab 9h-12h",
  };
}

export interface ZlOpenStatusProps {
  /**
   * Layout variant. `inline` e uma linha simples (usada na Faixa
   * Fiduciaria). `block` fica em duas linhas (Final CTA).
   */
  variant?: "inline" | "block";
  /**
   * Override manual pra QA/screenshots — quando passado, ignora a data
   * real e calcula o estado como se fosse essa data. Nao usar em producao.
   */
  dateOverride?: Date;
  /**
   * Classe extra opcional (ex: cor do texto quando sobre fundo escuro).
   */
  className?: string;
}

export function ZlOpenStatus({
  variant = "inline",
  dateOverride,
  className = "",
}: ZlOpenStatusProps) {
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<Computed | null>(null);

  useEffect(() => {
    const update = () => {
      setStatus(computeStatus(dateOverride ?? new Date()));
    };
    update();
    setHydrated(true);
    // Re-avalia a cada 5 minutos pra pegar virada de dia / fim de expediente.
    const id = window.setInterval(update, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [dateOverride]);

  // Fallback SSR/no-JS: estado neutro, so mostra o horario padrao.
  if (!hydrated || !status) {
    return (
      <span
        className={`inline-flex items-center gap-2 ${className}`}
        aria-label="Horario de atendimento"
      >
        <span
          aria-hidden="true"
          className="flex h-2 w-2 shrink-0 rounded-full bg-[#0F6B46]"
        />
        <span>Ter-Sex 9h-16h | Sab 9h-12h</span>
      </span>
    );
  }

  const dotColor = status.open ? "bg-[#0F6B46]" : "bg-[#0F6B46]";
  const dotPulse = status.open ? "animate-pulse" : "";

  if (variant === "block") {
    return (
      <div
        className={className}
        aria-live="polite"
        aria-label={`${status.label} — ${status.secondary}`}
      >
        <p className="flex items-center gap-2 text-[0.86rem] leading-[1.4] text-[#26302B]">
          <span
            aria-hidden="true"
            className={`flex h-2.5 w-2.5 shrink-0 rounded-full ${dotColor} ${dotPulse}`}
          />
          <span className="font-medium">{status.label}</span>
        </p>
        <p className="mt-1 text-[0.78rem] leading-[1.5] text-[#6F746F]">
          {status.secondary}
        </p>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-live="polite"
      aria-label={`${status.label} — ${status.secondary}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-2 w-2 shrink-0 rounded-full ${dotColor} ${dotPulse}`}
      />
      <span>
        <span className="font-medium">{status.label}</span> — {status.secondary}
      </span>
    </span>
  );
}
