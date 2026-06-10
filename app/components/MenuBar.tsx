"use client";

import { useState, useEffect } from "react";
import { Apple, Wifi, Battery, Search } from "lucide-react";

interface MenuBarProps {
  activeApp: string;
  isDark: boolean;
}

export default function MenuBar({ activeApp, isDark }: MenuBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 h-8 flex items-center px-4 justify-between text-xs select-none z-[99999] backdrop-blur-xl border-b transition-colors bg-[#14141c]/80 border-white/5 text-white/70`}>
      <div className="flex items-center gap-4">
        <Apple size={14} className="text-white" />
        <span className="font-semibold text-white">{activeApp || "Finder"}</span>
        <span className="hidden sm:inline opacity-60">File</span>
        <span className="hidden sm:inline opacity-60">Edit</span>
        <span className="hidden sm:inline opacity-60">View</span>
      </div>

      <div className="flex items-center gap-4">
        <Search size={14} className="opacity-50" />
        <Wifi size={14} className="opacity-50" />
        <Battery size={14} className="opacity-50" />
        <span className="font-medium text-white/80">{time}</span>
      </div>
    </div>
  );
}