"use client";

import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import { Reveal } from "@/components/reveal/Reveal";
import type { AgentRole } from "./aboutContent";

interface AgentEsteiraProps {
  agents: AgentRole[];
}

export function AgentEsteira({ agents }: AgentEsteiraProps) {
  return (
    <ol className="grid grid-cols-1 gap-[clamp(1.5rem,2.4vw,2.4rem)] sm:grid-cols-2 xl:grid-cols-3">
      {agents.map((agent, index) => (
        <li key={agent.name}>
          <Reveal delay={index * 80}>
            <JellyBorder
              width={320}
              height={300}
              radius={28}
              shape="rect"
              strokeColor="var(--color-line)"
              strokeWidth={1}
              maxBulge={14}
              influence={140}
              driftAmp={1.3}
            >
              <div className="flex h-full flex-col px-6 py-7">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")} · {agent.role}
                </p>
                <h3
                  className="mt-3 text-[clamp(1.55rem,2.2vw,1.95rem)] text-[var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {agent.name}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.55] text-[var(--color-ink)]">
                  {agent.description}
                </p>
              </div>
            </JellyBorder>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
