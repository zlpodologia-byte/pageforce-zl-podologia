import { expect, test } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import type { Result } from "axe-core";

const ROUTES = [
  "/",
  "/work",
  "/services",
  "/about",
  "/stories",
  "/product",
  "/contact",
  "/work/north-star-observatory",
] as const;

function formatViolations(violations: Result[]) {
  return violations
    .map((violation) => {
      const targets = violation.nodes
        .flatMap((node) => node.target)
        .slice(0, 3)
        .join(", ");

      return `${violation.impact ?? "unknown"} ${violation.id}: ${violation.help}${targets ? ` (${targets})` : ""}`;
    })
    .join("\n");
}

for (const route of ROUTES) {
  test(`axe ${route} has no critical/serious violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const blockingViolations = results.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );
    const warningViolations = results.violations.filter(
      (violation) =>
        violation.impact === "moderate" || violation.impact === "minor",
    );

    if (warningViolations.length > 0) {
      console.log(
        `[axe][warn][${route}] ${warningViolations.length} moderate/minor violation(s)\n${formatViolations(warningViolations)}`,
      );
    }

    expect(
      blockingViolations,
      blockingViolations.length > 0
        ? formatViolations(blockingViolations)
        : undefined,
    ).toHaveLength(0);
  });
}
