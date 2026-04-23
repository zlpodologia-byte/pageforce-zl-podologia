"use client";

import { create } from "zustand";

type RouteTransitionState = "idle" | "entering" | "exiting";

interface AppState {
  menuOpen: boolean;
  routeTransition: RouteTransitionState;
  focusedCardId: string | null;
  scrollProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;

  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;
  setRouteTransition: (v: RouteTransitionState) => void;
  setFocusedCardId: (id: string | null) => void;
  setScrollProgress: (p: number) => void;
  setPointer: (p: { x: number; y: number }) => void;
  setReducedMotion: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  menuOpen: false,
  routeTransition: "idle",
  focusedCardId: null,
  scrollProgress: 0,
  pointer: { x: 0, y: 0 },
  reducedMotion: false,

  setMenuOpen: (v) => set({ menuOpen: v }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  setRouteTransition: (v) => set({ routeTransition: v }),
  setFocusedCardId: (id) => set({ focusedCardId: id }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setPointer: (p) => set({ pointer: p }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
}));
