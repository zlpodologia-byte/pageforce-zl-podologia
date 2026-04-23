export interface JellyPoint {
  x: number;
  y: number;
}

export interface JellyRectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface JellyBaseFrequency {
  x: number;
  y: number;
}

export interface JellyResponse {
  distance: number;
  proximity: number;
  eased: number;
  scale: number;
  baseFrequency: JellyBaseFrequency;
}

export const JELLY_DEFAULT_FREQUENCY_X = 0.013;
export const JELLY_DEFAULT_FREQUENCY_Y = 0.018;
export const JELLY_MAX_FREQUENCY_OFFSET_X = 0.022;
export const JELLY_MAX_FREQUENCY_OFFSET_Y = 0.019;
export const JELLY_INFLUENCE_RADIUS = 220;
export const JELLY_MAX_SCALE = 84;
export const JELLY_LERP_FACTOR = 0.18;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(min: number, max: number, value: number) {
  if (min === max) {
    return value >= max ? 1 : 0;
  }

  const t = clamp((value - min) / (max - min), 0, 1);
  return t * t * (3 - 2 * t);
}

export function lerpValue(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export function hashSlugToSeed(slug: string) {
  let hash = 0;

  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) % 101;
  }

  return hash;
}

export function getDistanceToBounds(pointer: JellyPoint, bounds: JellyRectLike) {
  const dx = Math.max(
    bounds.left - pointer.x,
    0,
    pointer.x - (bounds.left + bounds.width),
  );
  const dy = Math.max(
    bounds.top - pointer.y,
    0,
    pointer.y - (bounds.top + bounds.height),
  );

  return Math.hypot(dx, dy);
}

export function getJellyBaseFrequency(eased: number): JellyBaseFrequency {
  return {
    x: JELLY_DEFAULT_FREQUENCY_X + eased * JELLY_MAX_FREQUENCY_OFFSET_X,
    y: JELLY_DEFAULT_FREQUENCY_Y + eased * JELLY_MAX_FREQUENCY_OFFSET_Y,
  };
}

export function formatBaseFrequency(baseFrequency: JellyBaseFrequency) {
  return `${baseFrequency.x.toFixed(4)} ${baseFrequency.y.toFixed(4)}`;
}

export function getJellyResponse(
  pointer: JellyPoint,
  bounds: JellyRectLike,
  influenceRadius = JELLY_INFLUENCE_RADIUS,
  maxScale = JELLY_MAX_SCALE,
): JellyResponse {
  const distance = getDistanceToBounds(pointer, bounds);
  const proximity = clamp(1 - distance / influenceRadius, 0, 1);
  const eased = smoothstep(0, 1, proximity);

  return {
    distance,
    proximity,
    eased,
    scale: eased * maxScale,
    baseFrequency: getJellyBaseFrequency(eased),
  };
}

export function isRectVisible(bounds: JellyRectLike) {
  return bounds.width > 0 && bounds.height > 0;
}
