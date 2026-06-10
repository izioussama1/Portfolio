"use client";

import { useState, useCallback } from "react";

export interface WindowState {
  id: string;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = useCallback((id: string, title: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
        );
      }
      return [
        ...prev,
        {
          id,
          title,
          zIndex: nextZIndex,
          isMinimized: false,
          isMaximized: false,
          position: { x: 120 + prev.length * 30, y: 80 + prev.length * 30 },
          size: { width: 700, height: 500 },
        },
      ];
    });
    setNextZIndex((z) => z + 1);
  }, [nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setNextZIndex((z) => z + 1);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex + 1 } : w)));
  }, [nextZIndex]);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)));
  }, []);

  const isOpen = useCallback((id: string) => windows.some((w) => w.id === id && !w.isMinimized), [windows]);
  const isMinimized = useCallback((id: string) => windows.some((w) => w.id === id && w.isMinimized), [windows]);

  return { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, isOpen, isMinimized };
}
