import assert from "node:assert/strict";
import test from "node:test";
import { splitTitle } from "./splitTitle";

test("returns short titles as a single line", () => {
  assert.deepEqual(splitTitle("Meridian Coffee"), ["Meridian Coffee"]);
});

test("splits long titles on word boundaries", () => {
  const lines = splitTitle("A living atlas of the night sky");

  assert.equal(lines.length, 2);
  assert.deepEqual(lines, ["A living atlas of the", "night sky"]);
  assert.equal(lines.join(" "), "A living atlas of the night sky");
});

test("caps long titles at three lines", () => {
  const lines = splitTitle(
    "An editorial system built for a notably longer life span",
  );

  assert.equal(lines.length, 3);
  assert.equal(lines.join(" "), "An editorial system built for a notably longer life span");
  assert.ok(lines.every((line) => line.length <= 22));
});
