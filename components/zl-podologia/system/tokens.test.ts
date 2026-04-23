import assert from "node:assert/strict";
import test from "node:test";

import { zlRadius, zlTypography } from "./tokens";

test("zlRadius exporta exatamente tres chaves canonicas", () => {
  assert.deepEqual(Object.keys(zlRadius), ["soft", "frame", "pill"]);
});

test("display cresce de forma monotona e acima do body", () => {
  assert.ok(zlTypography.display.sm.fontSizePx < zlTypography.display.md.fontSizePx);
  assert.ok(zlTypography.display.md.fontSizePx < zlTypography.display.lg.fontSizePx);
  assert.ok(zlTypography.body.sm.fontSizePx < zlTypography.body.md.fontSizePx);
  assert.ok(zlTypography.body.md.fontSizePx < zlTypography.body.lg.fontSizePx);
  assert.ok(zlTypography.body.lg.fontSizePx < zlTypography.display.sm.fontSizePx);
});

test("line-heights do body e display permanecem coerentes", () => {
  assert.ok(zlTypography.body.sm.lineHeight >= 1.5);
  assert.ok(zlTypography.body.lg.lineHeight >= zlTypography.body.sm.lineHeight);
  assert.ok(zlTypography.display.sm.lineHeight <= 1.08);
  assert.ok(zlTypography.display.lg.lineHeight <= zlTypography.display.sm.lineHeight);
});
