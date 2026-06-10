"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrafficLights from "./TrafficLights";
import { WindowState } from "../hooks/useWindowManager";

interface WindowProps {
  window: WindowState;
  isDark: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDrag: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export default function WindowComponent({
  window: win,
  isDark,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDrag,
  children,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-header")) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - win.position.x,
        y: e.clientY - win.position.y,
      });
      onFocus();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      onDrag({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, onDrag]);

  if (win.isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: win.isMaximized ? 0 : win.position.x,
        y: win.isMaximized ? 0 : win.position.y,
        width: win.isMaximized ? "100vw" : win.size.width,
        height: win.isMaximized ? "calc(100vh - 32px - 80px)" : win.size.height,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "absolute",
        left: win.isMaximized ? 0 : undefined,
        top: win.isMaximized ? 32 : undefined,
        zIndex: win.zIndex,
      }}
      className={`flex flex-col rounded-xl overflow-hidden shadow-2xl border backdrop-blur-xl ${isDark ? "bg-[#1e1e2e]/95 border-white/10" : "bg-white/95 border-white/60"} ${isDragging ? "cursor-grabbing" : "cursor-default"}`}
      onMouseDown={onFocus}
    >
      <div
        className={`window-header flex items-center gap-3 px-4 py-3 border-b select-none ${isDark ? "bg-gradient-to-b from-[#2a2a3c] to-[#252536] border-white/5" : "bg-gradient-to-b from-gray-50 to-gray-100/80 border-gray-200/50"}`}
        onMouseDown={handleMouseDown}
      >
        <TrafficLights onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        <span className={`flex-1 text-center text-sm font-medium pointer-events-none ${isDark ? "text-white/70" : "text-text-light"}`}>
          {win.title}
        </span>
        <div className="w-14" />
      </div>

      <div className={`flex-1 overflow-auto custom-scrollbar p-6 ${isDark ? "text-white" : "text-text"}`}>
        {children}
      </div>
    </motion.div>
  );
}