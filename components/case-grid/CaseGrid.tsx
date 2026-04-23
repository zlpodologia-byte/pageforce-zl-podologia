"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CaseAspect, CaseItem } from "@/lib/cases";
import { useReducedMotionPreference } from "@/components/shell/motion";
import { CaseCard } from "@/components/case-card/CaseCard";
import { useGridParallax } from "./useGridParallax";

type GridColumnCount = 1 | 2 | 3;

export interface CaseGridProps {
  items: CaseItem[];
  columns?: GridColumnCount;
  parallax?: [number, number, number];
  focusMode?: "dim" | "none";
}

interface DistributedCard {
  item: CaseItem;
  index: number;
}

interface CaseGridLayoutProps {
  layoutKey: string;
  columnCount: GridColumnCount;
  columns: DistributedCard[][];
  visibilityClassName: string;
  focusedId: string | null;
  focusMode: "dim" | "none";
  reducedMotion: boolean;
  setColumnRef(index: number): (node: HTMLElement | null) => void;
  onHoverChange(id: string | null): void;
}

const DEFAULT_PARALLAX: [number, number, number] = [0.85, 1, 1.15];

const ASPECT_WEIGHT: Record<CaseAspect, number> = {
  portrait: 1.5,
  landscape: 0.95,
  square: 1.15,
};

function getColumnOffset(columnIndex: number, columnCount: GridColumnCount) {
  if (columnCount === 1) {
    return "0px";
  }

  if (columnCount === 2) {
    return columnIndex === 0 ? "0px" : "clamp(3rem, 6vw, 6rem)";
  }

  const offsets = ["0px", "clamp(3.25rem, 5vw, 5.75rem)", "clamp(7rem, 10vw, 11rem)"];
  return offsets[columnIndex] ?? "0px";
}

function distributeItems(
  items: CaseItem[],
  columnCount: GridColumnCount,
): DistributedCard[][] {
  const columns = Array.from({ length: columnCount }, () => [] as DistributedCard[]);
  const weights = Array.from({ length: columnCount }, (_, index) => index * 0.24);

  items.forEach((item, index) => {
    if (columnCount === 1) {
      columns[0].push({ item, index });
      return;
    }

    const preferredColumn =
      item.column === undefined ? null : (item.column % columnCount) as number;

    const lightestColumnIndex = weights.indexOf(Math.min(...weights));
    let targetColumn = preferredColumn ?? lightestColumnIndex;

    if (
      preferredColumn !== null &&
      weights[preferredColumn] > weights[lightestColumnIndex] + 1.1
    ) {
      targetColumn = lightestColumnIndex;
    }

    columns[targetColumn].push({ item, index });
    weights[targetColumn] += ASPECT_WEIGHT[item.aspect] + 0.9;
  });

  return columns;
}

function getVisibilityClassName(
  maxColumns: GridColumnCount,
  currentColumns: GridColumnCount,
) {
  if (maxColumns === 1) {
    return "grid";
  }

  if (maxColumns === 2) {
    return currentColumns === 2
      ? "hidden min-[960px]:grid"
      : "grid min-[960px]:hidden";
  }

  if (currentColumns === 3) {
    return "hidden min-[1280px]:grid";
  }

  if (currentColumns === 2) {
    return "hidden min-[960px]:grid min-[1280px]:hidden";
  }

  return "grid min-[960px]:hidden";
}

function CaseGridLayout({
  layoutKey,
  columnCount,
  columns,
  visibilityClassName,
  focusedId,
  focusMode,
  reducedMotion,
  setColumnRef,
  onHoverChange,
}: CaseGridLayoutProps) {
  return (
    <div
      className={`${visibilityClassName} items-start gap-x-[clamp(1.25rem,5vw,5.1875rem)]`}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((columnItems, columnIndex) => (
        <div
          key={`${layoutKey}-column-${columnIndex}`}
          ref={setColumnRef(columnIndex)}
          className="flex flex-col gap-[clamp(4.5rem,8vw,9rem)]"
          style={{
            paddingTop: getColumnOffset(columnIndex, columnCount),
            transform: "translate3d(0, var(--case-grid-translate-y, 0px), 0)",
            willChange: "transform",
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {columnItems.map(({ item, index }) => (
              <motion.div
                key={`${layoutKey}-${item.slug}`}
                layout={!reducedMotion}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: reducedMotion
                    ? undefined
                    : {
                        duration: 0.45,
                        delay: Math.min(index, 8) * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      },
                }}
                exit={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 10,
                        transition: {
                          duration: 0.2,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                }
                style={{
                  opacity:
                    focusMode === "dim" &&
                    focusedId !== null &&
                    focusedId !== item.slug
                      ? 0.18
                      : 1,
                  transition: reducedMotion
                    ? "none"
                    : "opacity 300ms var(--ease-out-expo), transform 300ms var(--ease-out-expo)",
                }}
              >
                <CaseCard item={item} index={index} onHoverChange={onHoverChange} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function CaseGrid({
  items,
  columns = 3,
  parallax = DEFAULT_PARALLAX,
  focusMode = "dim",
}: CaseGridProps) {
  const reducedMotion = useReducedMotionPreference();
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const threeColumnParallax = useGridParallax(3, parallax);
  const twoColumnParallax = useGridParallax(2, [parallax[0], parallax[1]]);

  useEffect(() => {
    if (focusMode === "none" || reducedMotion) {
      setFocusedId(null);
    }
  }, [focusMode, reducedMotion]);

  useEffect(() => {
    if (focusedId && !items.some((item) => item.slug === focusedId)) {
      setFocusedId(null);
    }
  }, [focusedId, items]);

  const resolvedFocusMode = reducedMotion ? "none" : focusMode;
  const oneColumnLayout = distributeItems(items, 1);
  const twoColumnLayout = columns >= 2 ? distributeItems(items, 2) : oneColumnLayout;
  const threeColumnLayout =
    columns === 3 ? distributeItems(items, 3) : twoColumnLayout;

  const handleHoverChange = (id: string | null) => {
    if (resolvedFocusMode === "none") {
      return;
    }

    setFocusedId((current) => (current === id ? current : id));
  };

  return (
    <div className="relative">
      {columns === 3 ? (
        <CaseGridLayout
          layoutKey="desktop"
          columnCount={3}
          columns={threeColumnLayout}
          visibilityClassName={getVisibilityClassName(columns, 3)}
          focusedId={focusedId}
          focusMode={resolvedFocusMode}
          reducedMotion={reducedMotion}
          setColumnRef={threeColumnParallax.setColumnRef}
          onHoverChange={handleHoverChange}
        />
      ) : null}

      {columns >= 2 ? (
        <CaseGridLayout
          layoutKey="tablet"
          columnCount={2}
          columns={twoColumnLayout}
          visibilityClassName={getVisibilityClassName(columns, 2)}
          focusedId={focusedId}
          focusMode={resolvedFocusMode}
          reducedMotion={reducedMotion}
          setColumnRef={twoColumnParallax.setColumnRef}
          onHoverChange={handleHoverChange}
        />
      ) : null}

      <CaseGridLayout
        layoutKey="mobile"
        columnCount={1}
        columns={oneColumnLayout}
        visibilityClassName={getVisibilityClassName(columns, 1)}
        focusedId={focusedId}
        focusMode={resolvedFocusMode}
        reducedMotion={reducedMotion}
        setColumnRef={() => () => {}}
        onHoverChange={handleHoverChange}
      />
    </div>
  );
}
