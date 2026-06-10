const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  const full = path.join(baseDir, filePath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content.trimStart(), 'utf8');
  console.log(`✓ ${filePath}`);
}

// ===== GLOBALS =====
write('app/globals.css', `
@import "tailwindcss";

@theme {
  --color-cream: #f5f0e8;
  --color-cream-dark: #e8e0d4;
  --color-folder-blue: #5ba3d9;
  
  --color-dark-bg: #0a0a0f;
  --color-dark-surface: #14141c;
  --color-dark-surface-2: #1c1c28;
  --color-dark-border: rgba(255,255,255,0.06);
  --color-dark-text: #f0f0f5;
  --color-dark-text-dim: #a0a0b0;
  --color-dark-accent: #22d3ee;
  
  --color-light-bg: #f5f0e8;
  --color-light-surface: #ffffff;
  --color-light-surface-2: #f0ebe3;
  --color-light-border: rgba(0,0,0,0.08);
  --color-light-text: #2d2420;
  --color-light-text-dim: #6b5e55;
  --color-light-accent: #5ba3d9;
  
  --font-family-sans: system-ui, -apple-system, sans-serif;
  --font-family-script: "Dancing Script", cursive;
  --font-family-serif: "Playfair Display", serif;
  --font-family-mono: "JetBrains Mono", monospace;
}

html, body, #root {
  height: 100%;
  overflow: hidden;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: rgba(34, 211, 238, 0.3);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.2);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.35);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 5s ease-in-out infinite 1s;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`);

// ===== LAYOUT =====
write('app/layout.tsx', `
import type { Metadata } from "next";
import { Inter, Dancing_Script, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-script" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Izi Oussama — Portfolio",
  description: "Interactive desktop portfolio of Izi Oussama",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${dancing.variable} \${playfair.variable} \${jetbrains.variable}\`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
`);

// ===== DATA =====
write('lib/data.ts', `
export const desktopFolders = [
  { id: "about", name: "About Me", position: { x: 80, y: 120 } },
  { id: "projects", name: "Projects", position: { x: 120, y: 280 } },
  { id: "skills", name: "Skills", position: { x: 60, y: 440 } },
  { id: "contact", name: "Contact", position: { x: 140, y: 600 } },
  { id: "terminal", name: "Terminal", position: { x: 200, y: 720 } },
];

export const rightFolders = [
  { id: "github", name: "GitHub", position: { x: 80, y: 160 } },
  { id: "linkedin", name: "LinkedIn", position: { x: 100, y: 320 } },
  { id: "resume", name: "Resume.pdf", position: { x: 60, y: 480 } },
];

export const dockApps = [
  { id: "about", name: "About Me", icon: "user" },
  { id: "projects", name: "Projects", icon: "briefcase" },
  { id: "skills", name: "Skills", icon: "zap" },
  { id: "contact", name: "Contact", icon: "mail" },
  { id: "terminal", name: "Terminal", icon: "terminal" },
];

export const projects = [
  { id: 1, title: "Nexus Commerce", desc: "Full-stack e-commerce with Stripe, real-time inventory, and admin dashboard.", tags: ["Next.js", "Prisma", "Stripe"], year: "2024", image: "/images/project-1.jpg" },
  { id: 2, title: "Aura Analytics", desc: "Real-time data visualization with WebSocket and drag-and-drop widgets.", tags: ["React", "D3.js", "Node.js"], year: "2024", image: "/images/project-2.jpg" },
  { id: 3, title: "Flux Social", desc: "Social platform with real-time messaging and AI content recommendations.", tags: ["Next.js", "Socket.io", "Redis"], year: "2023", image: "/images/project-3.jpg" },
  { id: 4, title: "Zenith AI", desc: "AI content generation suite with image synthesis and model fine-tuning.", tags: ["Python", "FastAPI", "React"], year: "2023", image: "/images/project-4.jpg" },
  { id: 5, title: "Vertex 3D", desc: "Interactive 3D product configurator with AR preview.", tags: ["Three.js", "R3F", "WebGL"], year: "2023", image: "/images/project-5.jpg" },
  { id: 6, title: "Prisma CMS", desc: "Headless CMS with visual editor and multi-tenant architecture.", tags: ["Next.js", "GraphQL", "Docker"], year: "2022", image: "/images/project-6.jpg" },
];

export const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "REST"] },
  { category: "Design", items: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Illustrator"] },
  { category: "DevOps", items: ["Git", "Docker", "AWS", "Vercel", "Linux", "CI/CD"] },
];
`);

// ===== HOOKS =====
write('app/hooks/useWindowManager.ts', `
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
`);

// ===== COMPONENTS =====

// TrafficLights
write('app/components/TrafficLights.tsx', `
"use client";

import { motion } from "framer-motion";

interface TrafficLightsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export default function TrafficLights({ onClose, onMinimize, onMaximize }: TrafficLightsProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/30 flex items-center justify-center group"
      >
        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" viewBox="0 0 8 8" fill="none">
          <path d="M2 2L6 6M6 2L2 6" stroke="#4a0000" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
        className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]/30 flex items-center justify-center group"
      >
        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" viewBox="0 0 8 8" fill="none">
          <path d="M1 4H7" stroke="#995700" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
        className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab2e]/30 flex items-center justify-center group"
      >
        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" viewBox="0 0 8 8" fill="none">
          <path d="M2 2H6V6H2V2Z" stroke="#006500" strokeWidth="0.6" />
        </svg>
      </motion.button>
    </div>
  );
}
`);

// FolderIcon
write('app/components/FolderIcon.tsx', `
"use client";

import { motion } from "framer-motion";
import { Folder, FileText } from "lucide-react";

interface FolderIconProps {
  id: string;
  name: string;
  position: { x: number; y: number };
  isFile?: boolean;
  isDark: boolean;
  onOpen: () => void;
}

export default function FolderIcon({ id, name, position, isFile, isDark, onOpen }: FolderIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: position.y / 1000, type: "spring", stiffness: 200 }}
      className="absolute flex flex-col items-center gap-2 cursor-pointer group select-none"
      style={{ left: position.x, top: position.y }}
      onClick={onOpen}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      {isFile ? (
        <div className={\`w-16 h-20 rounded-lg flex items-center justify-center shadow-md transition-all group-hover:shadow-xl \${isDark ? "bg-[#2a2a3c] text-cyan-400" : "bg-white text-folder-blue"}\`}>
          <FileText size={32} />
        </div>
      ) : (
        <div className="relative w-20 h-16 drop-shadow-md transition-shadow group-hover:drop-shadow-xl">
          <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
            <path d="M6 12C6 8.686 8.686 6 12 6H28L32 12H68C71.314 12 74 14.686 74 18V52C74 55.314 71.314 58 68 58H12C8.686 58 6 55.314 6 52V12Z" fill={isDark ? "#3a3a50" : "#4a90c6"} />
            <path d="M2 20C2 16.686 4.686 14 8 14H72C75.314 14 78 16.686 78 20V56C78 59.314 75.314 62 72 62H8C4.686 62 2 59.314 2 56V20Z" fill={isDark ? "url(#folderGradientDark)" : "url(#folderGradient)"} />
            <path d="M2 20C2 16.686 4.686 14 8 14H72C75.314 14 78 16.686 78 20V24C78 24 50 26 2 24V20Z" fill="white" fillOpacity="0.12" />
            <defs>
              <linearGradient id="folderGradient" x1="40" y1="14" x2="40" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7bbde8" />
                <stop offset="1" stopColor="#5ba3d9" />
              </linearGradient>
              <linearGradient id="folderGradientDark" x1="40" y1="14" x2="40" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5a5a7a" />
                <stop offset="1" stopColor="#4a4a68" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      <span className={\`px-2.5 py-1 rounded-md text-sm font-medium backdrop-blur-sm transition-colors shadow-sm \${isDark ? "text-white/70 bg-white/5 group-hover:bg-cyan-400/20 group-hover:text-white" : "text-text-light bg-white/60 group-hover:bg-folder-blue/20 group-hover:text-text"}\`}>
        {name}
      </span>
    </motion.div>
  );
}
`);

// MenuBar
write('app/components/MenuBar.tsx', `
"use client";

import { useState, useEffect } from "react";
import { Apple, Wifi, Battery, Search, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface MenuBarProps {
  activeApp: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function MenuBar({ activeApp, isDark, onToggleTheme }: MenuBarProps) {
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
    <div 
      className={\`h-8 flex items-center px-4 justify-between text-xs select-none z-[9999] backdrop-blur-xl border-b transition-colors \${isDark ? "bg-[#14141c]/80 border-white/5 text-white/70" : "bg-white/40 border-white/50 text-text-light"}\`}
      style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100vw" }}
    >
      <div className="flex items-center gap-4">
        <Apple size={14} className={isDark ? "text-white" : "text-text"} />
        <span className={\`font-semibold \${isDark ? "text-white" : "text-text"}\`}>{activeApp || "Finder"}</span>
        <span className="hidden sm:inline opacity-60">File</span>
        <span className="hidden sm:inline opacity-60">Edit</span>
        <span className="hidden sm:inline opacity-60">View</span>
      </div>

      <div className="flex items-center gap-4">
        <Search size={14} className="opacity-50" />
        <Wifi size={14} className="opacity-50" />
        <Battery size={14} className="opacity-50" />
        
        <motion.button
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleTheme}
          className={\`p-1 rounded-full transition-colors \${isDark ? "text-amber-400 hover:bg-white/10" : "text-amber-500 hover:bg-black/5"}\`}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </motion.button>

        <span className={\`font-medium \${isDark ? "text-white/80" : "text-text-light"}\`}>{time}</span>
      </div>
    </div>
  );
}
`);

// Dock
write('app/components/Dock.tsx', `
"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Zap, Mail, Terminal } from "lucide-react";
import { dockApps } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  user: <User size={24} />,
  briefcase: <Briefcase size={24} />,
  zap: <Zap size={24} />,
  mail: <Mail size={24} />,
  terminal: <Terminal size={24} />,
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
      style={{ position: "fixed", bottom: "16px" }}
    >
      <div className={\`flex items-end gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-colors \${isDark ? "bg-[#1e1e2e]/60 border-white/10" : "bg-white/40 border-white/60"}\`}>
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
              <div className={\`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm \${isOpen ? (isDark ? "bg-cyan-400/20 text-cyan-400" : "bg-folder-blue/20 text-folder-blue") : (isDark ? "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white" : "bg-white/60 text-text-light hover:bg-white hover:text-text")}\`}>
                {iconMap[app.icon]}
              </div>
              {(isOpen || isMinimized) && (
                <motion.div layoutId={\`indicator-\${app.id}\`} className={\`absolute -bottom-1 w-1 h-1 rounded-full \${isDark ? "bg-cyan-400" : "bg-folder-blue"}\`} />
              )}
              <span className={\`absolute -top-10 px-2 py-1 rounded-lg text-xs shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium \${isDark ? "bg-[#2a2a3c] text-white/80" : "bg-white/90 text-text"}\`}>
                {app.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
`);

// Window
write('app/components/Window.tsx', `
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
        x: win.isMaximized ? 0 : win.position.x,
        y: win.isMaximized ? 32 : win.position.y,
        width: win.isMaximized ? "100vw" : win.size.width,
        height: win.isMaximized ? "calc(100vh - 32px - 80px)" : win.size.height,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        left: win.isMaximized ? 0 : undefined,
        top: win.isMaximized ? 32 : undefined,
        zIndex: win.zIndex,
      }}
      className={\`flex flex-col rounded-xl overflow-hidden shadow-2xl border backdrop-blur-xl \${isDark ? "bg-[#1e1e2e]/95 border-white/10" : "bg-white/95 border-white/60"} \${isDragging ? "cursor-grabbing" : "cursor-default"}\`}
      onMouseDown={onFocus}
    >
      <div
        className={\`window-header flex items-center gap-3 px-4 py-3 border-b select-none \${isDark ? "bg-gradient-to-b from-[#2a2a3c] to-[#252536] border-white/5" : "bg-gradient-to-b from-gray-50 to-gray-100/80 border-gray-200/50"}\`}
        onMouseDown={handleMouseDown}
      >
        <TrafficLights onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        <span className={\`flex-1 text-center text-sm font-medium pointer-events-none \${isDark ? "text-white/70" : "text-text-light"}\`}>
          {win.title}
        </span>
        <div className="w-14" />
      </div>

      <div className={\`flex-1 overflow-auto custom-scrollbar p-6 \${isDark ? "text-white" : "text-text"}\`}>
        {children}
      </div>
    </motion.div>
  );
}
`);

// Desktop
write('app/components/Desktop.tsx', `
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { desktopFolders, rightFolders } from "@/lib/data";
import { useWindowManager } from "../hooks/useWindowManager";
import FolderIcon from "./FolderIcon";
import Window from "./Window";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import AboutApp from "./apps/AboutApp";
import ProjectsApp from "./apps/ProjectsApp";
import SkillsApp from "./apps/SkillsApp";
import ContactApp from "./apps/ContactApp";
import TerminalApp from "./apps/TerminalApp";

const appTitles: Record<string, string> = {
  about: "About Me",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
  terminal: "Terminal",
};

function getAppComponent(id: string, openWindowFn: (id: string, title: string) => void, isDark: boolean) {
  const components: Record<string, React.ReactNode> = {
    about: <AboutApp isDark={isDark} />,
    projects: <ProjectsApp isDark={isDark} />,
    skills: <SkillsApp isDark={isDark} />,
    contact: <ContactApp isDark={isDark} />,
    terminal: (
      <TerminalApp
        onOpenApp={(appId) => {
          openWindowFn(appId, appTitles[appId] || appId);
        }}
      />
    ),
  };
  return components[id];
}

export default function Desktop() {
  const [isDark, setIsDark] = useState(true);
  
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    isOpen,
    isMinimized,
  } = useWindowManager();

  const activeApp = windows.find((w) => !w.isMinimized)?.title || "Finder";

  const bgClass = isDark
    ? "bg-gradient-to-br from-[#0a0a0f] via-[#14141c] to-[#1a1a2e]"
    : "bg-gradient-to-br from-[#f5f0e8] via-[#ebe5db] to-[#e0d8cc]";

  return (
    <div className={\`relative w-full h-screen overflow-hidden transition-colors duration-500 \${bgClass}\`}>
      <div
        className={\`absolute inset-0 transition-opacity duration-500 \${isDark ? "opacity-[0.03]" : "opacity-[0.4]"}\`}
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
          color: isDark ? "rgba(255,255,255,0.3)" : "rgba(45,36,32,0.04)",
        }}
      />

      <div className="absolute left-0 top-8 z-10">
        {desktopFolders.map((folder) => (
          <FolderIcon
            key={folder.id}
            id={folder.id}
            name={folder.name}
            position={folder.position}
            isDark={isDark}
            onOpen={() => openWindow(folder.id, folder.name)}
          />
        ))}
      </div>

      <div className="absolute right-8 top-8 z-10">
        {rightFolders.map((folder) => (
          <FolderIcon
            key={folder.id}
            id={folder.id}
            name={folder.name}
            position={folder.position}
            isFile={folder.id === "resume"}
            isDark={isDark}
            onOpen={() => {
              if (folder.id === "github") window.open("https://github.com", "_blank");
              else if (folder.id === "linkedin") window.open("https://linkedin.com", "_blank");
              else openWindow(folder.id, folder.name);
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-center relative">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <motion.span
              className={\`block font-script text-5xl md:text-7xl lg:text-8xl -mb-2 md:-mb-4 ml-4 md:ml-8 transform -rotate-3 \${isDark ? "text-cyan-400/70" : "text-folder-blue/70"}\`}
              style={{ textShadow: isDark ? "0 0 40px rgba(34,211,238,0.2)" : "0 0 30px rgba(91,163,217,0.2)" }}
            >
              Izi Oussama
            </motion.span>
            <motion.span
              className={\`block font-serif text-6xl md:text-8xl lg:text-9xl font-black tracking-tight \${isDark ? "text-white" : "text-text"}\`}
              style={{ textShadow: isDark ? "0 0 60px rgba(255,255,255,0.1)" : "0 0 40px rgba(0,0,0,0.05)" }}
            >
              Portfolio
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={\`font-serif text-xl md:text-2xl mt-4 tracking-widest \${isDark ? "text-white/30" : "text-text-light/50"}\`}
          >
            (2025)
          </motion.p>

          <div className="absolute -top-20 -left-20 w-3 h-3 rounded-full bg-cyan-400/30 animate-float" />
          <div className="absolute -bottom-10 -right-16 w-2 h-2 rounded-full bg-cyan-400/20 animate-float-delayed" />
          <div className="absolute top-10 -right-24 w-4 h-4 rounded-full bg-cyan-400/10 animate-pulse-slow" />
        </div>
      </div>

      <AnimatePresence>
        {windows.map((win) => (
          <Window
            key={win.id}
            window={win}
            isDark={isDark}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onDrag={(pos) => updatePosition(win.id, pos)}
          >
            {getAppComponent(win.id, openWindow, isDark)}
          </Window>
        ))}
      </AnimatePresence>

      <MenuBar activeApp={activeApp} isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      <Dock
        onOpenApp={openWindow}
        openApps={[...desktopFolders, ...rightFolders].map((f) => f.id).filter((id) => isOpen(id))}
        minimizedApps={[...desktopFolders, ...rightFolders].map((f) => f.id).filter((id) => isMinimized(id))}
        isDark={isDark}
      />
    </div>
  );
}
`);

// PAGE
write('app/page.tsx', `
import Desktop from "./components/Desktop";

export default function Home() {
  return <Desktop />;
}
`);

console.log("\\n✅ All files created successfully!");
console.log("Next steps:");
console.log("   1. npm install framer-motion lucide-react");
console.log("   2. npm run dev");