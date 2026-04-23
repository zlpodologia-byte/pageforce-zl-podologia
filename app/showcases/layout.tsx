import type { ReactNode } from "react";

export default function ShowcasesLayout({ children }: { children: ReactNode }) {
  return <div data-palette="operational">{children}</div>;
}
