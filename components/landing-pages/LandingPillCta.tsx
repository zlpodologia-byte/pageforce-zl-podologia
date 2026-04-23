import Link from "next/link";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";

interface LandingPillCtaProps {
  href: string;
  label: string;
  testId?: string;
  accent?: "burnt" | "teal";
}

export function LandingPillCta({
  href,
  label,
  testId,
  accent = "burnt",
}: LandingPillCtaProps) {
  const color =
    accent === "burnt"
      ? "var(--color-accent-burnt)"
      : "var(--color-accent-teal)";

  return (
    <div style={{ display: "inline-block" }}>
      <JellyBorder
        width={284}
        height={58}
        shape="rect"
        radius={999}
        maxBulge={10}
        influence={100}
        driftAmp={1.4}
        strokeColor={color}
        strokeWidth={1.2}
        fillColor="transparent"
      >
        <Link
          href={href}
          data-testid={testId}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 22px",
            textAlign: "center",
            textDecoration: "none",
            color,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </Link>
      </JellyBorder>
    </div>
  );
}
