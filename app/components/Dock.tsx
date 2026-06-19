"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Zap, Mail, Terminal, GraduationCap } from "lucide-react";
import { dockApps } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  user: <User size={24} />,
  briefcase: <Briefcase size={24} />,
  zap: <Zap size={24} />,
  mail: <Mail size={24} />,
  terminal: <Terminal size={24} />,
  certificate: <GraduationCap size={24} />,
};

interface DockProps {
  onOpenApp: (id: string, name: string) => void;
  openApps: string[];
  minimizedApps: string[];
  isDark: boolean;
}

export default function Dock({ onOpenApp, openApps, minimizedApps, isDark }: DockProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998]"
    >
      <div className={`flex items-end gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-colors ${isDark ? "bg-[#1e1e2e]/60 border-white/10" : "bg-white/40 border-white/60"}`}>
        {dockApps.map((app) => {
          const isOpen = openApps.includes(app.id);
          const isMinimized = minimizedApps.includes(app.id);

          return (
            <motion.button
              key={app.id}
              whileHover={{ y: -10, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onOpenApp(app.id, app.name)}
              className="relative flex flex-col items-center group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${isOpen ? (isDark ? "bg-cyan-400/20 text-cyan-400" : "bg-folder-blue/20 text-folder-blue") : (isDark ? "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white" : "bg-white/60 text-text-light hover:bg-white hover:text-text")}`}>
                {iconMap[app.icon]}
              </div>
              {(isOpen || isMinimized) && (
                <motion.div layoutId={`indicator-${app.id}`} className={`absolute -bottom-1 w-1 h-1 rounded-full ${isDark ? "bg-cyan-400" : "bg-folder-blue"}`} />
              )}
              <span className={`absolute -top-10 px-2 py-1 rounded-lg text-xs shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium ${isDark ? "bg-[#2a2a3c] text-white/80" : "bg-white/90 text-text"}`}>
                {app.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}