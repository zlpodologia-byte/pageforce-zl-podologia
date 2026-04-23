import assert from "node:assert/strict";

const jellyMathModulePath = new URL("./jellyMath.ts", import.meta.url).href;
const {
  JELLY_DEFAULT_FREQUENCY_X,
  JELLY_DEFAULT_FREQUENCY_Y,
  JELLY_INFLUENCE_RADIUS,
  JELLY_LERP_FACTOR,
  JELLY_MAX_SCALE,
  formatBaseFrequency,
  getDistanceToBounds,
  getJellyResponse,
  hashSlugToSeed,
  lerpValue,
  smoothstep,
} = (await import(jellyMathModulePath)) as typeof import("./jellyMath");

assert.equal(hashSlugToSeed("meridian"), hashSlugToSeed("meridian"));
assert.ok(hashSlugToSeed("meridian") >= 0);
assert.ok(hashSlugToSeed("meridian") <= 100);

assert.equal(smoothstep(0, 1, -0.2), 0);
assert.equal(smoothstep(0, 1, 0.5), 0.5);
assert.equal(smoothstep(0, 1, 1.5), 1);
assert.equal(
  getDistanceToBounds(
    { x: 200, y: 150 },
    { left: 100, top: 50, width: 200, height: 200 },
  ),
  0,
);
assert.equal(
  getDistanceToBounds(
    { x: 340, y: 150 },
    { left: 100, top: 50, width: 200, height: 200 },
  ),
  40,
);

const centeredResponse = getJellyResponse(
  { x: 200, y: 150 },
  { left: 100, top: 50, width: 200, height: 200 },
  JELLY_INFLUENCE_RADIUS,
  JELLY_MAX_SCALE,
);

assert.equal(centeredResponse.proximity, 1);
assert.equal(centeredResponse.eased, 1);
assert.equal(centeredResponse.scale, JELLY_MAX_SCALE);
assert.equal(
  formatBaseFrequency(centeredResponse.baseFrequency),
  "0.0350 0.0370",
);

const nearEdgeResponse = getJellyResponse(
  { x: 320, y: 150 },
  { left: 100, top: 50, width: 200, height: 200 },
  JELLY_INFLUENCE_RADIUS,
  JELLY_MAX_SCALE,
);

assert.ok(nearEdgeResponse.distance > 0);
assert.ok(nearEdgeResponse.proximity > 0.9);
assert.ok(nearEdgeResponse.scale > JELLY_MAX_SCALE * 0.9);
assert.equal(
  formatBaseFrequency(nearEdgeResponse.baseFrequency),
  "0.0345 0.0366",
);

const distantResponse = getJellyResponse(
  { x: 1400, y: 1200 },
  { left: 100, top: 50, width: 200, height: 200 },
  JELLY_INFLUENCE_RADIUS,
  JELLY_MAX_SCALE,
);

assert.equal(distantResponse.proximity, 0);
assert.equal(distantResponse.eased, 0);
assert.equal(distantResponse.scale, 0);
assert.equal(
  formatBaseFrequency(distantResponse.baseFrequency),
  `${JELLY_DEFAULT_FREQUENCY_X.toFixed(4)} ${JELLY_DEFAULT_FREQUENCY_Y.toFixed(4)}`,
);

assert.equal(lerpValue(0, JELLY_MAX_SCALE, JELLY_LERP_FACTOR), 15.12);
