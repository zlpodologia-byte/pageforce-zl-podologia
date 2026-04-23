import type { HTMLAttributes, ReactNode } from "react";

import { BodyText } from "./BodyText";
import { DisplayHeading } from "./DisplayHeading";
import { EditorialCard } from "./EditorialCard";
import { EyebrowLabel } from "./EyebrowLabel";
import { cx } from "./cx";
import {
  zlLayout,
  zlPalette,
  zlRadius,
  zlSpacing,
  zlSurfaceTone,
} from "./tokens";

type StaticProofTone = keyof typeof zlSurfaceTone;

export interface StaticProofProps extends HTMLAttributes<HTMLDivElement> {
  body?: string;
  eyebrow: string;
  icon?: ReactNode;
  tone?: StaticProofTone;
  value: string;
}

export function StaticProof({
  body,
  className,
  eyebrow,
  icon,
  style,
  tone = "paper",
  value,
  ...rest
}: StaticProofProps) {
  const isInk = tone === "ink";

  return (
    <EditorialCard
      {...rest}
      as="div"
      className={cx("flex h-full flex-col justify-between", className)}
      padding="md"
      style={style}
      tone={tone}
      data-zl-system="static-proof"
    >
      <div
        className="flex items-start justify-between"
        style={{ gap: zlSpacing.sm }}
      >
        <EyebrowLabel
          tone={isInk ? "contrast" : "accent"}
          size="sm"
          style={{ maxWidth: "70%" }}
        >
          {eyebrow}
        </EyebrowLabel>
        {icon ? (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center justify-center"
            style={{
              width: zlLayout.iconSize.md,
              height: zlLayout.iconSize.md,
              borderRadius: zlRadius.pill,
              border: `1px solid ${isInk ? zlPalette.whisper : zlPalette.border}`,
              color: isInk ? zlPalette.contrast : zlPalette.accent,
              background: isInk ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.58)",
            }}
          >
            {icon}
          </span>
        ) : null}
      </div>
      <div
        className="flex flex-col"
        style={{ gap: zlSpacing.xs, marginTop: zlSpacing.lg }}
      >
        <DisplayHeading as="h3" size="sm" tone={isInk ? "contrast" : "ink"}>
          {value}
        </DisplayHeading>
        {body ? (
          <BodyText size="sm" tone={isInk ? "contrastMuted" : "muted"}>
            {body}
          </BodyText>
        ) : null}
      </div>
    </EditorialCard>
  );
}
