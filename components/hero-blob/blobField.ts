export interface BlobPoint {
  x: number;
  y: number;
}

export interface BlobBounds {
  width: number;
  height: number;
}

export interface BlobNode {
  id: number;
  color: string;
  alpha: number;
  radius: number;
  home: BlobPoint;
  current: BlobPoint;
  driftAmplitude: number;
  driftPhase: number;
  driftSpeed: number;
}

export interface CreateBlobFieldOptions extends BlobBounds {
  blobCount: number;
  colors: string[];
}

export interface AdvanceBlobNodeOptions {
  blob: BlobNode;
  pointer: BlobPoint | null;
  attraction: number;
  driftTime: number;
  reducedMotion: boolean;
  bounds: BlobBounds;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function driftOffset(blob: BlobNode, driftTime: number) {
  const phase = blob.driftPhase + driftTime * blob.driftSpeed;

  return {
    x: Math.cos(phase) * blob.driftAmplitude,
    y: Math.sin(phase * 0.87) * blob.driftAmplitude * 0.92,
  };
}

export function getAttractionWeight(
  home: BlobPoint,
  pointer: BlobPoint,
  maxDistance: number,
) {
  const distance = Math.hypot(pointer.x - home.x, pointer.y - home.y);
  const cappedDistance = Math.max(distance, maxDistance * 0.12);
  const normalized =
    (maxDistance / cappedDistance - 1) / ((maxDistance / (maxDistance * 0.12)) - 1);

  return clamp(normalized, 0, 1);
}

export function createBlobField({
  width,
  height,
  blobCount,
  colors,
}: CreateBlobFieldOptions) {
  const safeColors = colors.length > 0 ? colors : ["#1a1a1a", "#5a5048", "#f5d5c4"];
  const minDimension = Math.min(width, height);

  return Array.from({ length: blobCount }, (_, index): BlobNode => {
    const seed = index + 1;

    return {
      id: index,
      color: safeColors[index % safeColors.length],
      alpha: 0.52 + pseudoRandom(seed + 17) * 0.16,
      radius: minDimension * (0.16 + pseudoRandom(seed + 23) * 0.12),
      home: {
        x: width * (0.18 + pseudoRandom(seed + 5) * 0.64),
        y: height * (0.18 + pseudoRandom(seed + 11) * 0.64),
      },
      current: {
        x: width * (0.18 + pseudoRandom(seed + 5) * 0.64),
        y: height * (0.18 + pseudoRandom(seed + 11) * 0.64),
      },
      driftAmplitude: minDimension * (0.012 + pseudoRandom(seed + 29) * 0.022),
      driftPhase: pseudoRandom(seed + 31) * Math.PI * 2,
      driftSpeed: 0.0012 + pseudoRandom(seed + 37) * 0.0016,
    };
  });
}

export function advanceBlobNode({
  blob,
  pointer,
  attraction,
  driftTime,
  reducedMotion,
  bounds,
}: AdvanceBlobNodeOptions): BlobNode {
  if (reducedMotion) {
    return {
      ...blob,
      current: blob.home,
    };
  }

  const drift = driftOffset(blob, driftTime);
  const driftHome = {
    x: blob.home.x + drift.x,
    y: blob.home.y + drift.y,
  };

  const attractionWeight =
    pointer === null
      ? 0
      : getAttractionWeight(blob.home, pointer, Math.max(bounds.width, bounds.height) * 0.75);

  const weightedAttraction = attractionWeight * attractionWeight;
  const target =
    pointer === null
      ? driftHome
      : {
          x:
            driftHome.x +
            (pointer.x - blob.home.x) * attraction * weightedAttraction,
          y:
            driftHome.y +
            (pointer.y - blob.home.y) * attraction * weightedAttraction,
        };

  const ease = 0.08 + weightedAttraction * 0.08;
  const nextCurrent = {
    x: clamp(
      blob.current.x + (target.x - blob.current.x) * ease,
      -blob.radius,
      bounds.width + blob.radius,
    ),
    y: clamp(
      blob.current.y + (target.y - blob.current.y) * ease,
      -blob.radius,
      bounds.height + blob.radius,
    ),
  };

  return {
    ...blob,
    current: nextCurrent,
  };
}
