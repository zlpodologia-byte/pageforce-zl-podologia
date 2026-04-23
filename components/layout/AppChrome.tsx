"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer/Footer";
import { Cursor } from "@/components/cursor/Cursor";
import { JellyProvider } from "@/components/jelly/JellyProvider";
import { MenuButton } from "@/components/shell/MenuButton";
import { MenuOverlay } from "@/components/shell/MenuOverlay";
import { Logo } from "@/components/shell/Logo";
import { PageFrame } from "@/components/shell/PageFrame";
import { PageTransition } from "@/components/shell/PageTransition";
import { RightEdgeCurve } from "@/components/shell/RightEdgeCurve";

const STANDALONE_PREFIXES = ["/lab/zl-podologia"] as const;

function isStandaloneRoute(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  return STANDALONE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isStandaloneRoute(pathname)) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <Cursor />
      <PageFrame />
      <Logo />
      <RightEdgeCurve>
        <MenuButton />
      </RightEdgeCurve>
      <MenuOverlay />
      <JellyProvider>
        <PageTransition>
          <main className="relative z-10">{children}</main>
        </PageTransition>
      </JellyProvider>
      <Footer />
    </>
  );
}
