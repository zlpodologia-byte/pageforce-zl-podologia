import assert from "node:assert/strict";

const blobFieldModulePath = new URL("./blobField.ts", import.meta.url).href;
const { advanceBlobNode, createBlobField, getAttractionWeight } =
  (await import(blobFieldModulePath)) as typeof import("./blobField");

const fieldA = createBlobField({
  width: 480,
  height: 320,
  blobCount: 5,
  colors: ["#111111", "#5a5048", "#f5d5c4"],
});

const fieldB = createBlobField({
  width: 480,
  height: 320,
  blobCount: 5,
  colors: ["#111111", "#5a5048", "#f5d5c4"],
});

assert.deepEqual(
  fieldA.map(({ home, radius, color }) => ({
    home,
    radius,
    color,
  })),
  fieldB.map(({ home, radius, color }) => ({
    home,
    radius,
    color,
  })),
);

const nearWeight = getAttractionWeight(
  { x: 120, y: 100 },
  { x: 132, y: 112 },
  240,
);
const farWeight = getAttractionWeight(
  { x: 120, y: 100 },
  { x: 300, y: 240 },
  240,
);

assert.ok(nearWeight > farWeight);
assert.ok(nearWeight <= 1);
assert.ok(farWeight >= 0);

const [firstBlob] = fieldA;
const advanced = advanceBlobNode({
  blob: firstBlob,
  pointer: {
    x: firstBlob.home.x + 36,
    y: firstBlob.home.y + 12,
  },
  attraction: 0.15,
  driftTime: 120,
  reducedMotion: false,
  bounds: {
    width: 480,
    height: 320,
  },
});

assert.notDeepEqual(advanced.current, firstBlob.current);
assert.equal(advanced.color, firstBlob.color);
