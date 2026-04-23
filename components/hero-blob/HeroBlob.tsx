"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotionPreference } from "@/components/shell/motion";
import {
  advanceBlobNode,
  createBlobField,
  type BlobBounds,
  type BlobNode,
  type BlobPoint,
} from "./blobField";

const DEFAULT_COLORS = ["#1a1a1a", "#5a5048", "#f5d5c4"];

export interface HeroBlobProps {
  children?: ReactNode;
  colors?: string[];
  blobCount?: number;
  attraction?: number;
  className?: string;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function drawBlobField(
  context: CanvasRenderingContext2D,
  field: BlobNode[],
  bounds: BlobBounds,
) {
  context.clearRect(0, 0, bounds.width, bounds.height);

  for (const blob of field) {
    context.globalAlpha = blob.alpha;
    context.fillStyle = blob.color;
    context.beginPath();
    context.arc(blob.current.x, blob.current.y, blob.radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 1;
}

export function HeroBlob({
  children,
  colors,
  blobCount = 5,
  attraction = 0.15,
  className,
}: HeroBlobProps) {
  const reducedMotion = useReducedMotionPreference();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const boundsRef = useRef<BlobBounds>({ width: 0, height: 0 });
  const fieldRef = useRef<BlobNode[]>([]);
  const pointerRef = useRef<BlobPoint | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const palette = useMemo(
    () => (colors && colors.length > 0 ? colors : DEFAULT_COLORS),
    [colors],
  );

  const drawFrame = (time: number) => {
    const context = contextRef.current;
    const bounds = boundsRef.current;

    if (!context || bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    fieldRef.current = fieldRef.current.map((blob) =>
      advanceBlobNode({
        blob,
        pointer: pointerRef.current,
        attraction,
        driftTime: time,
        reducedMotion,
        bounds,
      }),
    );

    drawBlobField(context, fieldRef.current, bounds);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    contextRef.current = context;

    const syncCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.imageSmoothingEnabled = true;

      boundsRef.current = { width, height };
      fieldRef.current = createBlobField({
        width,
        height,
        blobCount,
        colors: palette,
      });
      drawFrame(performance.now());
    };

    syncCanvas();

    const resizeObserver = new ResizeObserver(() => {
      syncCanvas();
    });

    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
      contextRef.current = null;
    };
  }, [blobCount, palette]);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? true);
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    drawFrame(performance.now());

    if (!isVisible || reducedMotion) {
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const tick = (time: number) => {
      drawFrame(time);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [attraction, isVisible, reducedMotion]);

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (reducedMotion) {
      drawFrame(performance.now());
    }
  };

  const clearPointer = () => {
    pointerRef.current = null;

    if (reducedMotion) {
      drawFrame(performance.now());
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={joinClassNames("relative overflow-hidden", className)}
      onPointerEnter={updatePointer}
      onPointerLeave={clearPointer}
      onPointerMove={updatePointer}
    >
      <div className="relative z-0 h-full w-full">{children}</div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        style={{
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
