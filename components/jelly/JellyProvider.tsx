"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefCallback,
} from "react";
import { useReducedMotionPreference } from "@/components/shell/motion";
import { CASES } from "@/lib/cases";
import { useAppStore } from "@/lib/store";
import {
  JELLY_DEFAULT_FREQUENCY_X,
  JELLY_DEFAULT_FREQUENCY_Y,
  JELLY_LERP_FACTOR,
  JELLY_MAX_SCALE,
  formatBaseFrequency,
  getJellyBaseFrequency,
  getJellyResponse,
  hashSlugToSeed,
  isRectVisible,
  lerpValue,
} from "./jellyMath";

interface JellyProviderProps {
  children?: ReactNode;
}

interface JellyDefinition {
  slug: string;
  seed: number;
}

interface JellyRegistryEntry extends JellyDefinition {
  currentScale: number;
  lastFrequency: string;
  turbulence: SVGFETurbulenceElement | null;
  displacement: SVGFEDisplacementMapElement | null;
  elements: Set<HTMLElement>;
}

interface JellyRegistryContextValue {
  registerCard: (slug: string, element: HTMLElement) => void;
  unregisterCard: (slug: string, element: HTMLElement) => void;
}

interface JellyFilterProps extends JellyDefinition {
  onDisplacementChange: (
    slug: string,
    node: SVGFEDisplacementMapElement | null,
  ) => void;
  onTurbulenceChange: (slug: string, node: SVGFETurbulenceElement | null) => void;
}

const OFFSCREEN_POINTER = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
const DEFAULT_FREQUENCY = formatBaseFrequency({
  x: JELLY_DEFAULT_FREQUENCY_X,
  y: JELLY_DEFAULT_FREQUENCY_Y,
});

const JellyRegistryContext = createContext<JellyRegistryContextValue | null>(null);

function createRegistryEntry(slug: string): JellyRegistryEntry {
  return {
    slug,
    seed: hashSlugToSeed(slug),
    currentScale: 0,
    lastFrequency: DEFAULT_FREQUENCY,
    turbulence: null,
    displacement: null,
    elements: new Set<HTMLElement>(),
  };
}

function syncEntryAttributes(entry: JellyRegistryEntry) {
  const clampedScale = entry.currentScale <= 0.01 ? 0 : entry.currentScale;
  const normalizedScale = Math.min(clampedScale / JELLY_MAX_SCALE, 1);
  const frequencyValue = formatBaseFrequency(getJellyBaseFrequency(normalizedScale));
  const scaleValue = clampedScale.toFixed(2);

  if (entry.displacement && entry.displacement.getAttribute("scale") !== scaleValue) {
    entry.displacement.setAttribute("scale", scaleValue);
  }

  if (entry.turbulence && entry.lastFrequency !== frequencyValue) {
    entry.turbulence.setAttribute("baseFrequency", frequencyValue);
    entry.lastFrequency = frequencyValue;
  }
}

function resetEntryAttributes(entry: JellyRegistryEntry) {
  entry.currentScale = 0;
  entry.lastFrequency = DEFAULT_FREQUENCY;

  if (entry.displacement) {
    entry.displacement.setAttribute("scale", "0");
  }

  if (entry.turbulence) {
    entry.turbulence.setAttribute("baseFrequency", DEFAULT_FREQUENCY);
  }
}

function getActiveBounds(elements: Set<HTMLElement>) {
  let fallbackBounds: DOMRect | null = null;

  for (const element of elements) {
    if (!element.isConnected) {
      elements.delete(element);
      continue;
    }

    const bounds = element.getBoundingClientRect();

    if (fallbackBounds === null) {
      fallbackBounds = bounds;
    }

    if (isRectVisible(bounds)) {
      return bounds;
    }
  }

  return fallbackBounds;
}

function JellyFilterDefinition({
  slug,
  seed,
  onDisplacementChange,
  onTurbulenceChange,
}: JellyFilterProps) {
  const handleTurbulenceRef = useCallback(
    (node: SVGFETurbulenceElement | null) => {
      onTurbulenceChange(slug, node);
    },
    [onTurbulenceChange, slug],
  );

  const handleDisplacementRef = useCallback(
    (node: SVGFEDisplacementMapElement | null) => {
      onDisplacementChange(slug, node);
    },
    [onDisplacementChange, slug],
  );

  return (
    <filter
      id={`jelly-${slug}`}
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        ref={handleTurbulenceRef}
        type="fractalNoise"
        baseFrequency={DEFAULT_FREQUENCY}
        numOctaves={2}
        seed={seed}
        result="noise"
      />
      <feDisplacementMap
        ref={handleDisplacementRef}
        in="SourceGraphic"
        in2="noise"
        scale={0}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  );
}

export function JellyProvider({ children }: JellyProviderProps) {
  const reducedMotion = useReducedMotionPreference();
  const registryRef = useRef(new Map<string, JellyRegistryEntry>());
  const [definitions, setDefinitions] = useState<JellyDefinition[]>(() =>
    CASES.map((c) => ({ slug: c.slug, seed: hashSlugToSeed(c.slug) })),
  );

  const ensureEntry = useCallback((slug: string) => {
    const existingEntry = registryRef.current.get(slug);

    if (existingEntry) {
      return existingEntry;
    }

    const nextEntry = createRegistryEntry(slug);
    registryRef.current.set(slug, nextEntry);
    setDefinitions((currentDefinitions) =>
      currentDefinitions.some((definition) => definition.slug === slug)
        ? currentDefinitions
        : [...currentDefinitions, { slug, seed: nextEntry.seed }],
    );

    return nextEntry;
  }, []);

  const registerCard = useCallback(
    (slug: string, element: HTMLElement) => {
      const entry = ensureEntry(slug);
      entry.elements.add(element);
    },
    [ensureEntry],
  );

  const unregisterCard = useCallback((slug: string, element: HTMLElement) => {
    const entry = registryRef.current.get(slug);

    if (!entry) {
      return;
    }

    entry.elements.delete(element);

    if (entry.elements.size > 0) {
      return;
    }

    registryRef.current.delete(slug);
    setDefinitions((currentDefinitions) =>
      currentDefinitions.filter((definition) => definition.slug !== slug),
    );
  }, []);

  const handleTurbulenceChange = useCallback(
    (slug: string, node: SVGFETurbulenceElement | null) => {
      const entry = node ? ensureEntry(slug) : registryRef.current.get(slug);

      if (!entry) {
        return;
      }

      entry.turbulence = node;

      if (node) {
        syncEntryAttributes(entry);
      }
    },
    [ensureEntry],
  );

  const handleDisplacementChange = useCallback(
    (slug: string, node: SVGFEDisplacementMapElement | null) => {
      const entry = node ? ensureEntry(slug) : registryRef.current.get(slug);

      if (!entry) {
        return;
      }

      entry.displacement = node;

      if (node) {
        syncEntryAttributes(entry);
      }
    },
    [ensureEntry],
  );

  useEffect(() => {
    const setPointer = useAppStore.getState().setPointer;
    setPointer(OFFSCREEN_POINTER);

    const resetPointer = () => {
      setPointer(OFFSCREEN_POINTER);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      setPointer({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        resetPointer();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("mouseout", handleMouseOut);
      resetPointer();
    };
  }, []);

  useEffect(() => {
    if (!reducedMotion) {
      return;
    }

    for (const entry of registryRef.current.values()) {
      resetEntryAttributes(entry);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    let frameId = 0;

    const tick = () => {
      const pointer = useAppStore.getState().pointer;

      for (const entry of registryRef.current.values()) {
        const bounds = getActiveBounds(entry.elements);
        const response = bounds && isRectVisible(bounds)
          ? getJellyResponse(pointer, bounds)
          : null;
        const targetScale = response ? response.scale : 0;

        entry.currentScale = lerpValue(
          entry.currentScale,
          targetScale,
          JELLY_LERP_FACTOR,
        );

        if (targetScale === 0 && entry.currentScale <= 0.01) {
          entry.currentScale = 0;
        }

        syncEntryAttributes(entry);

        // Write cursor-in-card position + opacity as CSS vars on all registered elements.
        // The CaseCard overlay uses these in its mask-image radial-gradient so only the
        // region near the cursor shows the deformed image.
        if (bounds && response) {
          const localX = pointer.x - bounds.left;
          const localY = pointer.y - bounds.top;
          const xPx = `${localX.toFixed(1)}px`;
          const yPx = `${localY.toFixed(1)}px`;
          const opacity = response.eased.toFixed(3);
          for (const el of entry.elements) {
            if (!el.isConnected) continue;
            el.style.setProperty("--jelly-x", xPx);
            el.style.setProperty("--jelly-y", yPx);
            el.style.setProperty("--jelly-opacity", opacity);
          }
        } else {
          for (const el of entry.elements) {
            if (!el.isConnected) continue;
            el.style.setProperty("--jelly-opacity", "0");
          }
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  const contextValue = useMemo<JellyRegistryContextValue>(
    () => ({
      registerCard,
      unregisterCard,
    }),
    [registerCard, unregisterCard],
  );

  return (
    <JellyRegistryContext.Provider value={contextValue}>
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <defs>
          {definitions.map((definition) => (
            <JellyFilterDefinition
              key={definition.slug}
              slug={definition.slug}
              seed={definition.seed}
              onDisplacementChange={handleDisplacementChange}
              onTurbulenceChange={handleTurbulenceChange}
            />
          ))}
        </defs>
      </svg>
      {children}
    </JellyRegistryContext.Provider>
  );
}

export function useJellyCard(slug: string) {
  const registry = useContext(JellyRegistryContext);
  const elementRef = useRef<HTMLElement | null>(null);

  const ref = useCallback<RefCallback<HTMLElement>>(
    (node) => {
      if (elementRef.current === node) {
        return;
      }

      if (registry && elementRef.current) {
        registry.unregisterCard(slug, elementRef.current);
      }

      if (registry && node) {
        registry.registerCard(slug, node);
      }

      elementRef.current = node;
    },
    [registry, slug],
  );

  useEffect(() => {
    return () => {
      if (registry && elementRef.current) {
        registry.unregisterCard(slug, elementRef.current);
        elementRef.current = null;
      }
    };
  }, [registry, slug]);

  const filterStyle = useMemo<CSSProperties>(
    () => ({
      filter: `url(#jelly-${slug})`,
    }),
    [slug],
  );

  return {
    ref,
    filterStyle,
  };
}
