import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const URLS = [
  "/showcases",
  "/showcases/clinica",
  "/showcases/agro",
  "/showcases/escritorios",
] as const;

test.describe("showcase axe audit", () => {
  for (const url of URLS) {
    test(`${url} has zero serious or critical axe violations`, async ({
      page,
    }) => {
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      const warning = results.violations.filter(
        (v) => v.impact === "moderate" || v.impact === "minor",
      );
      if (warning.length > 0) {
        console.log(
          `[axe][warn][${url}] ${warning.length} moderate/minor violation(s):\n` +
            warning
              .map(
                (v) =>
                  `  ${v.impact} ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length > 1 ? "s" : ""})`,
              )
              .join("\n"),
        );
      }
      if (blocking.length > 0) {
        console.log(
          "Blocking violations on",
          url,
          JSON.stringify(blocking, null, 2),
        );
      }
      expect(blocking).toHaveLength(0);
    });
  }
});
